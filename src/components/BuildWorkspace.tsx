import { airframes, componentById, demoScenarioInfo, demoProfileInfo } from '../data/catalog';
import type { DemoScenario, DemoProfile } from '../data/catalog';
import type { Airframe, ComponentRole, ComponentSelections, CompatibilityEvaluation } from '../domain/types';
import { componentRoles, roleLabels } from '../domain/types';
import CompatibilityPanel from './CompatibilityPanel';

interface BuildWorkspaceProps {
  airframe?: Airframe;
  selections: ComponentSelections;
  evaluation: CompatibilityEvaluation;
  onAirframeChange: (airframe: Airframe) => void;
  onPickRole: (role: ComponentRole) => void;
  onLoadDemoScenario: (scenario: DemoScenario) => void;
  onLoadDemoProfile: (profile: DemoProfile) => void;
  onReset: () => void;
}

function selectedDetails(role: ComponentRole, id: string | undefined): string[] {
  const item = componentById(id);
  if (!item) return [];
  const details: string[] = [];
  if (role === 'motor') {
    if (item.maxInputVoltageV !== undefined) details.push(`${item.maxInputVoltageV.toFixed(1)} V max`);
    if (item.maxCurrentA !== undefined) details.push(`${item.maxCurrentA} A max`);
    if (item.mountMm !== undefined) details.push(`${item.mountMm} mm mount`);
  }
  if (role === 'propeller' && item.diameterMm !== undefined) details.push(`${item.diameterMm} mm diameter`);
  if (role === 'esc') {
    if (item.continuousCurrentA !== undefined) details.push(`${item.continuousCurrentA} A continuous`);
    if (item.maxInputVoltageV !== undefined) details.push(`${item.maxInputVoltageV.toFixed(1)} V max`);
  }
  if (role === 'battery') {
    if (item.nominalVoltageV !== undefined) details.push(`${item.nominalVoltageV.toFixed(1)} V nominal`);
    if (item.capacityAh !== undefined) details.push(`${item.capacityAh.toFixed(1)} Ah`);
    if (item.continuousCRating !== undefined) details.push(`${item.continuousCRating}C`);
    else details.push('C rating unavailable');
  }
  if (role === 'servos') details.push(`${item.quantity ?? '—'} selected · ${item.massG ?? '—'} g each`);
  if (role === 'receiver' && item.receiverChannels !== undefined) details.push(`${item.receiverChannels} channels`);
  if (role === 'receiver' && item.modulation) details.push(item.modulation);
  if (role === 'receiver' && item.minInputVoltageV !== undefined && item.maxReceiverInputVoltageV !== undefined) {
    details.push(`${item.minInputVoltageV}–${item.maxReceiverInputVoltageV} V input`);
  }
  if (role === 'receiver' && item.rangeM !== undefined) details.push(`${item.rangeM} m synthetic range`);
  if (item.massG !== undefined && role !== 'servos') details.push(`${item.massG} g`);
  return details;
}

export default function BuildWorkspace({
  airframe, selections, evaluation, onAirframeChange, onPickRole, onLoadDemoScenario, onReset,
  onLoadDemoProfile,
}: BuildWorkspaceProps) {
  return (
    <>
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Your aircraft configuration</p>
          <h1>Build workspace</h1>
          <p className="page-description">Choose the parts for one fixed-wing build. Feedback updates as you make changes.</p>
        </div>
        <div className="workspace-actions">
          <div className="scenario-controls" role="group" aria-label="Load a demo scenario">
            <span>Try a demo:</span>
            {(['compatible', 'mismatch', 'missingData'] as DemoScenario[]).map((id) => {
              const info = demoScenarioInfo[id];
              return <button className="scenario-button" title={info.expected} key={id} type="button" onClick={() => onLoadDemoScenario(id)}>{info.label}</button>;
            })}
            {Object.entries(demoProfileInfo).map(([id, info]) => <button className="scenario-button" title={info.detail} key={id} type="button" onClick={() => onLoadDemoProfile(id as DemoProfile)}>{info.label}</button>)}
          </div>
          <button className="button button-quiet" type="button" onClick={onReset}><span aria-hidden="true">↻</span> New build</button>
        </div>
      </div>

      {airframe?.imageUrl && (
        <section className="aircraft-hero" aria-label="Synthetic Airframe image">
          <img src={airframe.imageUrl} alt="Synthetic demo fixed-wing trainer aircraft in flight" />
          <div className="aircraft-hero-caption">
            <span className="provenance"><span aria-hidden="true">✳</span> Synthetic demo Airframe</span>
            <strong>{airframe.name}</strong>
            <span>{airframe.wingspanMm?.toLocaleString()} mm wingspan <span aria-hidden="true">·</span> {airframe.maxMassG?.toLocaleString()} g maximum takeoff mass</span>
          </div>
        </section>
      )}

      <div className="workspace-grid">
        <section className="panel build-panel" aria-labelledby="build-heading">
          <div className="panel-heading build-panel-title">
            <div>
              <p className="eyebrow">Configuration</p>
              <h2 id="build-heading">Build</h2>
            </div>
            <span className="step-label"><span>01</span> Select parts</span>
          </div>

          <div className="airframe-block">
            <label className="field-label" htmlFor="airframe-select">Airframe <span className="required-label">Required</span></label>
            <div className="select-wrap">
              <select id="airframe-select" value={airframe?.id ?? ''} onChange={(event) => {
                const next = airframes.find((item) => item.id === event.target.value);
                if (next) onAirframeChange(next);
              }}>
                <option value="" disabled>Choose an Airframe</option>
                {airframes.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}
              </select>
              <span aria-hidden="true">⌄</span>
            </div>
            {airframe && (
              <div className="airframe-specs">
                <span>{airframe.wingspanMm?.toLocaleString()} mm wingspan</span>
                <span>{airframe.maxMassG?.toLocaleString()} g max mass</span>
                <span>{airframe.maxPropDiameterMm} mm prop clearance</span>
                <span>{airframe.requiredServoCount} servos · {airframe.requiredReceiverChannels} channels</span>
                <span className="provenance"><span aria-hidden="true">✳</span> Synthetic demo data</span>
              </div>
            )}
          </div>

          <div className="section-heading-row">
            <div>
              <h3>Required components</h3>
              <p>Choose one catalog option for each role.</p>
            </div>
            <span className="completion-count">{componentRoles.length - evaluation.missingRoles.length} / {componentRoles.length} selected</span>
          </div>

          <div className="role-grid">
            {componentRoles.map((role) => {
              const item = componentById(selections[role]);
              return (
                <article className={`role-card${item ? ' role-selected' : ''}`} key={role}>
                  <div className="role-card-top">
                    {item?.imageUrl ? (
                      <img className="role-image" src={item.imageUrl} alt="" />
                    ) : (
                      <div className="role-icon" aria-hidden="true">{role === 'motor' ? '↗' : role === 'propeller' ? '✳' : role === 'esc' ? 'ϟ' : role === 'battery' ? '▰' : role === 'servos' ? '⌘' : '⌁'}</div>
                    )}
                    <span className={item ? 'role-state is-filled' : 'role-state'}>{item ? 'Selected' : 'Required'}</span>
                  </div>
                  <h4>{roleLabels[role]}</h4>
                  {item ? (
                    <>
                      <p className="component-name">{item.name}</p>
                      <p className="component-detail">{selectedDetails(role, item.id).join(' · ')}</p>
                      {item.sourceUrl && item.manufacturer && (
                        <a className="source-link" href={item.sourceUrl} target="_blank" rel="noreferrer">
                          Product details and purchase at {item.manufacturer} ↗
                        </a>
                      )}
                    </>
                  ) : (
                    <p className="component-detail empty-hint">No {roleLabels[role].toLowerCase()} selected yet</p>
                  )}
                  <button className={item ? 'select-link has-item' : 'select-link'} type="button" onClick={() => onPickRole(role)}>
                    {item ? 'Replace selection' : `Choose ${roleLabels[role].toLowerCase()}`} <span aria-hidden="true">{item ? '↗' : '+'}</span>
                  </button>
                </article>
              );
            })}
          </div>
          <div className="build-panel-footer">
            <span className="footer-info"><span aria-hidden="true">✳</span> Catalog values are synthetic demo data</span>
          </div>
        </section>

        <CompatibilityPanel evaluation={evaluation} onChangeRole={onPickRole} />
      </div>
      <div className="simulation-promo"><div><p className="eyebrow">Interactive preview</p><h2>See this build in illustrative wind conditions</h2><p>Open the 3D preview to view current build facts beside wind controls.</p></div><a className="button button-secondary" href="#simulator">Open 3D preview <span aria-hidden="true">↗</span></a></div>
    </>
  );
}
