import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { Airframe, ComponentSelections, CompatibilityEvaluation, SpecificationValue } from '../domain/types';
import { componentById } from '../data/catalog';

interface Props {
  airframe?: Airframe;
  selections: ComponentSelections;
  evaluation: CompatibilityEvaluation;
  specifications: SpecificationValue[];
  windIndex: number;
  onWindIndexChange: (index: number) => void;
  flightResetToken: number;
}

const conditions = [
  { speed: 0, label: 'Calm', direction: 'N', angle: 0, response: 'Straight flight path' },
  { speed: 8, label: 'Light breeze', direction: 'NW', angle: -45, response: 'Angled flight in a slight crosswind' },
  { speed: 16, label: 'Moderate breeze', direction: 'W', angle: -90, response: 'Increasing crosswind drift' },
  { speed: 25, label: 'Strong breeze', direction: 'SW', angle: -135, response: 'Blown off course' },
  { speed: 35, label: 'Very strong breeze', direction: 'E', angle: 90, response: 'Blown away from the flight path' },
];

const statusText = (status: CompatibilityEvaluation['status']) => ({
  compatible: 'Passes supported checks', incompatible: 'Incompatible', 'needs-check': 'Needs check', incomplete: 'Incomplete build',
}[status]);

export default function AircraftSimulation({ airframe, selections, evaluation, specifications, windIndex, onWindIndexChange, flightResetToken }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglAvailable, setWebglAvailable] = useState(true);
  const [flightDistanceM, setFlightDistanceM] = useState(0);
  const [signalLost, setSignalLost] = useState(false);
  const condition = conditions[windIndex];
  const thrustToWeightText = specifications.find((item) => item.id === 'thrust-weight')?.value;
  const thrustToWeight = thrustToWeightText ? Number.parseFloat(thrustToWeightText) : undefined;
  const receiverRangeM = componentById(selections.receiver)?.rangeM;
  const selectedParts = Object.entries(selections).map(([role, id]) => ({ role, item: componentById(id) })).filter((x) => x.item);
  const visibleFactIds = [
    'mass', 'wingspan', 'wing-loading', 'max-takeoff-mass',
    'battery-nominal', 'battery-full', 'battery-capacity', 'battery-discharge',
    'input-power', 'thrust-weight',
  ];
  const missingFacts = specifications.filter((item) => visibleFactIds.includes(item.id));

  useEffect(() => {
    const host = mountRef.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    let animation = 0;
    let contextIsAvailable = true;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    } catch {
      setWebglAvailable(false);
      return;
    }
    setWebglAvailable(true);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.setClearColor('#c9e0e8', 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.replaceChildren(renderer.domElement);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      window.cancelAnimationFrame(animation);
      animation = 0;
      contextIsAvailable = false;
      setWebglAvailable(false);
    };

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#c9e0e8');
    const camera = new THREE.PerspectiveCamera(38, host.clientWidth / host.clientHeight, 0.1, 100);
    camera.position.set(0, 4.5, 10.5);
    camera.lookAt(0, 0, 0);
    scene.add(new THREE.HemisphereLight('#ffffff', '#77816f', 2.1));
    const key = new THREE.DirectionalLight('#fff5df', 2.5);
    key.position.set(-4, 7, 5);
    scene.add(key);

    const sky = new THREE.Mesh(new THREE.PlaneGeometry(100, 28), new THREE.MeshBasicMaterial({ color: '#c9e0e8' }));
    sky.position.set(0, 10, -24);
    scene.add(sky);

    const plane = new THREE.Group();
    const ivory = new THREE.MeshStandardMaterial({ color: '#f7f4e9', roughness: 0.72 });
    const green = new THREE.MeshStandardMaterial({ color: '#70856b', roughness: 0.64 });
    const dark = new THREE.MeshStandardMaterial({ color: '#424d42', roughness: 0.55 });
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.19, 2.5, 5, 12), ivory);
    body.rotation.z = Math.PI / 2;
    plane.add(body);
    const wing = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.09, 4.25), green);
    plane.add(wing);
    const tailWing = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.07, 1.5), ivory);
    tailWing.position.x = -1.25;
    plane.add(tailWing);
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.52, 0.08), green);
    fin.position.set(-1.24, 0.24, 0);
    plane.add(fin);
    const canopy = new THREE.Mesh(new THREE.SphereGeometry(0.27, 16, 10), dark);
    canopy.scale.set(1.25, 0.68, 0.85);
    canopy.position.set(0.35, 0.17, 0);
    plane.add(canopy);
    const propRadius = Math.max(0.5, Math.min(1.0, (componentById(selections.propeller)?.diameterMm ?? 254) / 300));
    const prop = new THREE.Mesh(new THREE.BoxGeometry(0.08, propRadius * 2, 0.07), dark);
    prop.position.x = 1.47;
    plane.add(prop);
    scene.add(plane);

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshStandardMaterial({ color: '#aabd98', roughness: 1 }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.5;
    scene.add(floor);

    // A simple horizon and runway make the aircraft's movement and path easy to read.
    const hillMaterial = new THREE.MeshStandardMaterial({ color: '#91aa89', roughness: 1 });
    for (let i = 0; i < 7; i++) {
      const hill = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 12), hillMaterial);
      hill.scale.set(2.8, 0.8 + (i % 3) * 0.22, 0.35);
      hill.position.set(-11 + i * 3.6, -0.9, -13);
      scene.add(hill);
    }
    const runwayMaterial = new THREE.MeshStandardMaterial({ color: '#6e7d70', roughness: 1 });
    const runway = new THREE.Mesh(new THREE.PlaneGeometry(14, 2.4), runwayMaterial);
    runway.rotation.x = -Math.PI / 2;
    runway.position.set(0, -1.48, 0);
    scene.add(runway);
    const runwayMarkMaterial = new THREE.MeshBasicMaterial({ color: '#e8e6d6' });
    for (let i = -5; i <= 5; i++) {
      const mark = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.08), runwayMarkMaterial);
      mark.rotation.x = -Math.PI / 2;
      mark.position.set(i * 1.15, -1.455, 0);
      scene.add(mark);
    }
    const pathPoints = [new THREE.Vector3(-4.5, -1.43, 0), new THREE.Vector3(4.5, -1.43, 0)];
    const path = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pathPoints), new THREE.LineDashedMaterial({ color: '#4e7651', dashSize: 0.25, gapSize: 0.16 }));
    path.computeLineDistances();
    scene.add(path);

    const wind = new THREE.Group();
    const windMaterial = new THREE.LineBasicMaterial({ color: '#859b83', transparent: true, opacity: 0.58 });
    for (let i = 0; i < 7; i++) {
      const points = [new THREE.Vector3(-4, -0.65 + i * 0.22, -2.1 + i * 0.55), new THREE.Vector3(-2.7, -0.65 + i * 0.22, -2.1 + i * 0.55)];
      wind.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), windMaterial));
    }
    wind.visible = condition.speed > 0;
    wind.rotation.y = THREE.MathUtils.degToRad(condition.angle);
    scene.add(wind);

    let frame = 0;
    let tick = 0;
    let didSignalLoss = false;
    setFlightDistanceM(0);
    setSignalLost(false);
    const motionPreference = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = motionPreference?.matches ?? false;
    const render = () => {
      animation = 0;
      if (!contextIsAvailable) return;
      frame += 0.012;
      const strength = condition.speed / 35;
      // Static thrust-to-weight is the synthetic build's only supported propulsion proxy.
      // It changes illustrative travel pace; it does not predict real airspeed.
      const buildPace = thrustToWeight === undefined ? 0.16 : THREE.MathUtils.clamp(0.12 + thrustToWeight * 0.05, 0.12, 0.25);
      const progress = (frame * (buildPace + strength * 0.09)) % 1;
      const estimatedFlightDistanceM = frame * (buildPace + strength * 0.09) * 100;
      const beyondReceiverRange = receiverRangeM !== undefined && estimatedFlightDistanceM > receiverRangeM;
      tick += 1;
      if (tick % 20 === 0) setFlightDistanceM(Math.floor(estimatedFlightDistanceM));
      if (beyondReceiverRange && !didSignalLoss) {
        didSignalLoss = true;
        setSignalLost(true);
      }
      const crosswind = windIndex === 1 ? 0.6 : windIndex === 2 ? 1.2 : windIndex >= 3 ? 9 : 0;
      const drift = Math.sin(progress * Math.PI) * crosswind;
      const outOfControlDrift = beyondReceiverRange ? -2 - Math.min((estimatedFlightDistanceM - receiverRangeM!) / 20, 5) : 0;
      plane.position.set(-4 + progress * 8 + (beyondReceiverRange ? 3 : 0), 0.08 + Math.sin(frame * 2) * 0.025 + (beyondReceiverRange ? 1.5 : 0), drift + outOfControlDrift);
      // Light wind shows a crab angle into the wind; strong wind visibly carries the aircraft off-screen.
      plane.rotation.x = Math.sin(frame * 0.65) * strength * 0.035;
      plane.rotation.z = windIndex === 1 ? -0.14 : windIndex === 2 ? -0.22 : windIndex >= 3 ? -0.3 : 0;
      plane.rotation.y = THREE.MathUtils.degToRad(windIndex === 1 ? -12 : windIndex === 2 ? -20 : windIndex >= 3 ? -28 : 0);
      wind.children.forEach((line, index) => { line.position.x = ((frame * (0.3 + strength) + index * 0.43) % 1.7) - 0.7; });
      try {
        renderer.render(scene, camera);
      } catch {
        window.cancelAnimationFrame(animation);
        setWebglAvailable(false);
        return;
      }
      if (!prefersReducedMotion) animation = window.requestAnimationFrame(render);
    };
    const handleContextRestored = () => {
      contextIsAvailable = true;
      setWebglAvailable(true);
      if (prefersReducedMotion) render();
      else animation = window.requestAnimationFrame(render);
    };
    const handleMotionChange = (event: MediaQueryListEvent) => {
      prefersReducedMotion = event.matches;
      if (prefersReducedMotion) {
        window.cancelAnimationFrame(animation);
        animation = 0;
      } else if (contextIsAvailable && animation === 0) {
        animation = window.requestAnimationFrame(render);
      }
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored);
    motionPreference?.addEventListener('change', handleMotionChange);
    render();
    const resize = () => {
      if (!mountRef.current) return;
      const width = Math.max(mountRef.current.clientWidth, 1);
      const height = Math.max(mountRef.current.clientHeight, 1);
      renderer.setSize(width, height);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };
    const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(resize);
    observer?.observe(host);
    if (!observer) window.addEventListener('resize', resize);
    return () => {
      window.cancelAnimationFrame(animation);
      observer?.disconnect();
      if (!observer) window.removeEventListener('resize', resize);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
      motionPreference?.removeEventListener('change', handleMotionChange);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      host.replaceChildren();
    };
  }, [condition.speed, flightResetToken, receiverRangeM, selections.propeller, thrustToWeight]);

  return (
    <section className="simulation-section" aria-labelledby="simulation-heading">
      <div className="simulation-heading">
        <div><p className="eyebrow">Illustrative preview</p><h2 id="simulation-heading">Aircraft &amp; wind demo</h2><p>Explore a synthetic trainer model and wind indicators alongside the current build facts.</p></div>
        <span className={`simulation-status status-${evaluation.status.replace('-', '_')}`} role="status" aria-live="polite"><span className="status-dot" />{statusText(evaluation.status)}</span>
      </div>
      <div className="simulation-layout">
        <div className="simulation-visual-column">
          <div className="simulation-canvas" ref={mountRef} role={webglAvailable ? 'img' : undefined} aria-label={webglAvailable ? `Illustrative 3D trainer airplane flying against a landscape, ${condition.label.toLowerCase()} from ${condition.direction}: ${condition.response}` : undefined}>
            {!webglAvailable && <div className="simulation-fallback">3D preview is unavailable in this browser. Build facts and wind controls remain available.</div>}
          </div>
          <div className="wind-controls">
            <label htmlFor="wind-select">Wind condition</label>
            <select id="wind-select" value={windIndex} onChange={(event) => onWindIndexChange(Number(event.target.value))}>
              {conditions.map((item, index) => <option value={index} key={item.speed}>{item.label} · {item.speed} mph · {item.direction}</option>)}
            </select>
            <span className="wind-readout"><span className="wind-arrow" title="Arrow points toward the wind source" style={{ transform: `rotate(${({ N: 0, NW: -45, W: -90, SW: -135, E: 90 } as Record<string, number>)[condition.direction]}deg)` }} aria-hidden="true">↑</span><strong>{condition.speed} mph</strong> from {condition.direction}</span>
          </div>
          <p className="flight-response" role="status" aria-live="polite"><strong>Flight path:</strong> {condition.response}</p>
          <p className="flight-response" aria-live="polite"><strong>Propulsion response:</strong> {thrustToWeight === undefined ? 'Build thrust estimate unavailable; using neutral demo motion.' : `Pace reflects this build’s estimated static thrust-to-weight (${thrustToWeightText}).`}</p>
          <p className="flight-response"><strong>Flight distance:</strong> {flightDistanceM} m · receiver range {receiverRangeM === undefined ? 'unavailable' : `${receiverRangeM} m (synthetic)`}</p>
          <p className={`receiver-signal ${signalLost ? 'receiver-signal-lost' : ''}`} role={signalLost ? 'alert' : 'status'} aria-live="assertive"><strong>{signalLost ? 'Signal lost' : 'Control link'}</strong>{' · '}{receiverRangeM === undefined ? 'Receiver range unavailable; select a receiver with range data.' : signalLost ? `The aircraft exceeded this demo receiver’s ${receiverRangeM} m range and is drifting away.` : `Signal available within the demo receiver’s ${receiverRangeM} m range.`}</p>
          <p className="simulation-disclaimer">Illustrative scene response only. This is not a validated aerodynamic or flight simulation and does not predict safe flying conditions.</p>
        </div>
        <aside className="simulation-facts" aria-label="Current build facts">
          <div className="simulation-facts-heading"><div><p className="eyebrow">Current selection</p><h3>{airframe?.name ?? 'Airframe unavailable'}</h3></div><span className="synthetic-badge">Synthetic data</span></div>
          <div className="simulation-fact-grid" aria-live="polite">
            {missingFacts.map((fact) => <div className="simulation-fact" key={fact.id}><span>{fact.label}</span><strong>{fact.value ?? 'Unavailable'}</strong></div>)}
            <div className="simulation-fact"><span>Wind setting</span><strong>{condition.speed} mph · {condition.direction}</strong></div>
            <div className="simulation-fact"><span>Receiver range</span><strong>{receiverRangeM === undefined ? 'Unavailable' : `${receiverRangeM} m · synthetic`}</strong></div>
            <div className="simulation-fact"><span>Flight distance</span><strong>{flightDistanceM} m</strong></div>
            <div className="simulation-fact"><span>Supported checks</span><strong>{evaluation.results.filter((item) => item.status === 'compatible').length} pass · {evaluation.results.filter((item) => item.status === 'incompatible').length} fail · {evaluation.results.filter((item) => item.status === 'needs-check').length} need check</strong></div>
          </div>
          <div className="simulation-selected"><h4>Selected components</h4>{selectedParts.length ? <ul>{selectedParts.map(({ role, item }) => <li key={role}><span>{role}</span><strong>{item!.name}</strong></li>)}</ul> : <p>No components selected yet.</p>}</div>
          <div className="simulation-checks" aria-live="polite"><h4>Compatibility checks</h4><ul>{evaluation.results.map((item) => <li key={item.id} className={`check-${item.status}`}><span>{item.label}</span><strong>{item.status === 'compatible' ? 'Pass' : item.status === 'incompatible' ? 'Fail' : 'Needs check'}</strong></li>)}</ul></div>
          <p className="simulation-source-note">Synthetic catalog values only; no manufacturer verification or flight-performance claims.</p>
        </aside>
      </div>
    </section>
  );
}
