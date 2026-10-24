import type { Airframe, SpecificationValue } from '../domain/types';

interface SpecificationSummaryProps {
  airframe?: Airframe;
  values: SpecificationValue[];
}

const kindLabel: Record<SpecificationValue['kind'], string> = {
  catalog: 'Catalog value',
  calculated: 'Calculated',
  estimate: 'Estimate',
};

function SpecCard({ item }: { item: SpecificationValue }) {
  return (
    <article className={`spec-card${item.value === null ? ' spec-unavailable' : ''}`}>
      <div className="spec-card-top">
        <span className={`kind-label kind-${item.kind}`}>{kindLabel[item.kind]}</span>
        {item.kind === 'estimate' && <span className="estimate-marker" aria-label="Estimate">≈</span>}
      </div>
      <h3>{item.label}</h3>
      {item.value !== null ? <p className="spec-value">{item.value}</p> : <p className="unavailable-value">Unavailable</p>}
      {item.value === null && item.unavailableReason && <p className="unavailable-reason">{item.unavailableReason}</p>}
      {item.inputs.length > 0 && (
        <details className="input-details">
          <summary>How this is derived <span aria-hidden="true">⌄</span></summary>
          <ul>{item.inputs.map((input) => <li key={input}>{input}</li>)}</ul>
        </details>
      )}
      {item.value !== null && item.inputs.length === 0 && <p className="source-hint">From selected Catalog data</p>}
    </article>
  );
}

export default function SpecificationSummary({ airframe, values }: SpecificationSummaryProps) {
  const featuredIds = ['mass', 'wingspan', 'wing-loading', 'max-takeoff-mass'];
  const featured = values.filter((item) => featuredIds.includes(item.id));
  const remainder = values.filter((item) => !featuredIds.includes(item.id));
  const groups = [
    { title: 'Build overview', items: featured },
    { title: 'Power system', items: remainder.filter((item) => item.id.startsWith('battery') || item.id === 'input-power' || item.id === 'thrust-weight') },
    { title: 'Flight performance', items: remainder.filter((item) => ['range', 'max-speed', 'liftoff-speed'].includes(item.id)) },
  ];

  return (
    <section className="specification-summary" aria-labelledby="specification-summary-heading">
      <div className="summary-title-block">
        <div>
          <p className="eyebrow">{airframe?.name ?? 'No Airframe selected'} · Current configuration</p>
          <h2 id="specification-summary-heading">Build specifications</h2>
          <p className="page-description">Catalog values and supported calculations for your current build.</p>
        </div>
        <span className="provenance provenance-large"><span aria-hidden="true">✳</span> Synthetic demo data</span>
      </div>

      {groups.map((group) => (
        <section className="summary-section" key={group.title} aria-labelledby={`summary-${group.title.replace(/ /g, '-').toLowerCase()}`}>
          <div className="summary-section-heading">
            <div>
              <p className="eyebrow">{group.title === 'Build overview' ? '01 / Airframe' : group.title === 'Power system' ? '02 / Electrical' : '03 / Performance'}</p>
              <h2 id={`summary-${group.title.replace(/ /g, '-').toLowerCase()}`}>{group.title}</h2>
            </div>
            <span className="summary-section-note">Updated from current selections</span>
          </div>
          <div className={`spec-grid${group.title === 'Build overview' ? ' featured-grid' : ''}`}>
            {group.items.map((item) => <SpecCard key={item.id} item={item} />)}
          </div>
        </section>
      ))}

      <section className="source-note" aria-labelledby="source-note-heading">
        <div className="source-note-icon" aria-hidden="true">✳</div>
        <div>
          <h2 id="source-note-heading">About these values</h2>
          <p>All parts and images in this prototype are synthetic demo fixtures, not manufacturer specifications or product photos. Estimates are planning aids derived only from the inputs shown above; missing data is marked unavailable.</p>
        </div>
      </section>
    </section>
  );
}
