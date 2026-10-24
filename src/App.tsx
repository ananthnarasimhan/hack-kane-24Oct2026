import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import AdvisoryNotice from './components/AdvisoryNotice';
import BuildWorkspace from './components/BuildWorkspace';
import ComponentPicker from './components/ComponentPicker';
import SpecificationSummary from './components/SpecificationSummary';
import { airframeById, demoScenarios, demoScenarioInfo, demoProfiles, demoProfileInfo, trainerAirframe } from './data/catalog';
import { evaluateCompatibility } from './domain/compatibility';
import { calculateSpecifications } from './domain/specifications';
import type { Component, ComponentRole, ComponentSelections } from './domain/types';
import type { DemoScenario, DemoProfile } from './data/catalog';

const AircraftSimulation = lazy(() => import('./components/AircraftSimulation'));

export default function App() {
  const [airframeId, setAirframeId] = useState<string>(trainerAirframe.id);
  const [selections, setSelections] = useState<ComponentSelections>({});
  const [pickerRole, setPickerRole] = useState<ComponentRole | null>(null);
  const [windIndex, setWindIndex] = useState(0);
  const [flightResetToken, setFlightResetToken] = useState(0);
  const [activePage, setActivePage] = useState(window.location.hash === '#simulator' ? 'simulator' : 'build');
  useEffect(() => {
    const onHashChange = () => setActivePage(window.location.hash === '#simulator' ? 'simulator' : 'build');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  const airframe = airframeById(airframeId);
  const compatibility = useMemo(() => evaluateCompatibility(airframe, selections), [airframe, selections]);
  const specifications = useMemo(() => calculateSpecifications(airframe, selections), [airframe, selections]);

  const selectComponent = (component: Component) => {
    setSelections((current) => ({ ...current, [component.role]: component.id }));
    setPickerRole(null);
  };

  const startNewBuild = () => {
    setSelections({});
    setAirframeId(trainerAirframe.id);
    setFlightResetToken((current) => current + 1);
  };

  const loadDemoScenario = (scenario: DemoScenario) => {
    setSelections({ ...demoScenarios[scenario] });
    setAirframeId(trainerAirframe.id);
    setFlightResetToken((current) => current + 1);
  };

  const loadDemoProfile = (profile: DemoProfile) => {
    setSelections({ ...demoProfiles[profile] });
    setAirframeId(trainerAirframe.id);
    setFlightResetToken((current) => current + 1);
  };

  return (
    <div className="app-frame">
      <header className="topbar">
        <a className="brand" href="#build" aria-label="Airframe planner home">
          <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
          <span className="brand-copy"><strong>airframe</strong><small>BUILD PLANNER</small></span>
        </a>
        <div className="topbar-right">
          <nav className="topbar-nav" aria-label="Main navigation">
            <a href="#build" aria-current={activePage === 'build' ? 'page' : undefined}>Build planner</a>
            <a href="#simulator" aria-current={activePage === 'simulator' ? 'page' : undefined}>3D preview</a>
          </nav>
          <div className="topbar-project"><span className="project-dot" aria-hidden="true" /> Current build <span className="topbar-divider">/</span> {airframe?.name ?? 'Untitled'}</div>
          <span className={`status-pill top-status status-${compatibility.status.replace('-', '_')}`} role="status" aria-live="polite">
            <span className="status-dot" aria-hidden="true" />
            {compatibility.status === 'compatible' ? 'Passes supported checks' : compatibility.status === 'needs-check' ? 'Needs check' : compatibility.status === 'incompatible' ? 'Incompatible' : 'Incomplete'}
          </span>
        </div>
      </header>

      <main className="main-content" id={activePage === 'simulator' ? 'simulator' : 'build'}>
        {activePage === 'build' ? <>
          <BuildWorkspace
          airframe={airframe}
          selections={selections}
          evaluation={compatibility}
          onAirframeChange={(item) => setAirframeId(item.id)}
          onPickRole={setPickerRole}
          onLoadDemoScenario={loadDemoScenario}
          onLoadDemoProfile={loadDemoProfile}
          onReset={startNewBuild}
          />
          <SpecificationSummary airframe={airframe} values={specifications} />
          <AdvisoryNotice />
        </> : <>
          <div className="page-title-row simulator-page-title">
            <div><p className="eyebrow">Airframe planner · interactive demo</p><h1>Wind &amp; aircraft preview</h1><p className="page-description">The scene responds visually to the selected illustrative wind setting. Current build facts stay in view.</p></div>
            <a className="button button-secondary" href="#build">← Back to build planner</a>
          </div>
          <Suspense fallback={<div className="simulation-loading" role="status">Loading 3D preview…</div>}>
            <AircraftSimulation airframe={airframe} selections={selections} evaluation={compatibility} specifications={specifications} windIndex={windIndex} onWindIndexChange={setWindIndex} flightResetToken={flightResetToken} />
          </Suspense>
          <div className="simulation-scenario-links"><p className="eyebrow">Try a demo profile</p><div>{Object.entries(demoProfileInfo).map(([id, info]) => <button className="scenario-button scenario-fixture-button" key={id} type="button" onClick={() => loadDemoProfile(id as DemoProfile)}><strong>{info.label}</strong><small>{info.detail}</small></button>)}</div><p>Each profile loads a synthetic build and updates receiver-range or propulsion behavior when supported.</p></div>
          <div className="simulation-scenario-links"><p className="eyebrow">Try a validation fixture</p><div>{Object.entries(demoScenarioInfo).map(([id, info]) => <button className="scenario-button scenario-fixture-button" key={id} type="button" onClick={() => loadDemoScenario(id as DemoScenario)}><strong>{info.label}</strong><small>{info.expected}</small></button>)}</div><p>Each fixture loads synthetic values to demonstrate a specific supported check. Compare its expected outcome with the live compatibility checks above.</p></div>
        </>}
      </main>

      <footer className="app-footer">
        <span>RC airplane build planner <span aria-hidden="true">·</span> Prototype</span>
        <span>Builds are session-only and reset when this page is refreshed.</span>
      </footer>

      {pickerRole && activePage === 'build' && (
        <ComponentPicker
          role={pickerRole}
          selectedId={selections[pickerRole]}
          onSelect={selectComponent}
          onClose={() => setPickerRole(null)}
        />
      )}
    </div>
  );
}
