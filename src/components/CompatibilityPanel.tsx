import type { CompatibilityEvaluation, ComponentRole } from '../domain/types';
import { roleLabels } from '../domain/types';

interface CompatibilityPanelProps {
  evaluation: CompatibilityEvaluation;
  onChangeRole: (role: ComponentRole) => void;
}

const statusLabels = {
  incomplete: 'Incomplete',
  incompatible: 'Incompatible',
  'needs-check': 'Needs check',
  compatible: 'Passes supported checks',
} as const;

const resultLabels = {
  compatible: 'Pass',
  incompatible: 'Mismatch',
  'needs-check': 'Needs check',
} as const;

function prettyRole(role: string) {
  return role === 'airframe' ? 'Airframe' : roleLabels[role as ComponentRole].toLowerCase();
}

export default function CompatibilityPanel({ evaluation, onChangeRole }: CompatibilityPanelProps) {
  const statusClass = evaluation.status.replace('-', '_');
  return (
    <section className="panel compatibility-panel" aria-labelledby="compatibility-heading">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Live assessment</p>
          <h2 id="compatibility-heading">Compatibility</h2>
        </div>
        <span className={`status-pill status-${statusClass}`} role="status" aria-live="polite">
          <span className="status-dot" aria-hidden="true" />{statusLabels[evaluation.status]}
        </span>
      </div>
      {evaluation.status === 'incomplete' && (
        <p className="overall-note">Choose the remaining required parts to run all supported checks.</p>
      )}
      {evaluation.status === 'incompatible' && (
        <p className="overall-note overall-note-error">One or more selected parts exceeds a supported limit. Review the comparisons below and change the flagged selection.</p>
      )}
      {evaluation.status === 'needs-check' && (
        <p className="overall-note">A required input is unavailable, so at least one supported check needs confirmation.</p>
      )}
      {evaluation.status === 'compatible' && (
        <p className="overall-note">Every supported rule passes for the selected synthetic demo parts.</p>
      )}
      <div className="rule-list" aria-label="Compatibility rule results">
        {evaluation.results.map((item) => {
          const affectedRole = item.affectedRole;
          return (
            <article className="rule-row" key={item.id}>
              <span className={`rule-status status-text-${item.status}`}>
                <span className="status-dot" aria-hidden="true" />{resultLabels[item.status]}
              </span>
              <div className="rule-copy">
                <h3>{item.label}</h3>
                {item.comparison && <p className="comparison">{item.comparison}</p>}
                <p>{item.detail}</p>
                {affectedRole && affectedRole !== 'airframe' && item.status !== 'compatible' && (
                  <button className="text-action" type="button" onClick={() => onChangeRole(affectedRole)}>
                    Change {prettyRole(affectedRole)} <span aria-hidden="true">↗</span>
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
