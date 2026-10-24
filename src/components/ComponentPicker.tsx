import { useEffect, useRef } from 'react';
import { components } from '../data/catalog';
import type { Component, ComponentRole } from '../domain/types';
import { roleLabels } from '../domain/types';

interface ComponentPickerProps {
  role: ComponentRole;
  selectedId?: string;
  onSelect: (component: Component) => void;
  onClose: () => void;
}

function componentDetails(component: Component): string[] {
  const details: string[] = [];
  if (component.role === 'motor') {
    if (component.maxInputVoltageV !== undefined) details.push(`Max input ${component.maxInputVoltageV.toFixed(1)} V`);
    if (component.maxCurrentA !== undefined) details.push(`Max current ${component.maxCurrentA} A`);
    if (component.mountMm !== undefined) details.push(`${component.mountMm} mm mount`);
  }
  if (component.role === 'propeller' && component.diameterMm !== undefined) details.push(`${component.diameterMm} mm diameter`);
  if (component.role === 'esc') {
    if (component.maxInputVoltageV !== undefined) details.push(`Max input ${component.maxInputVoltageV.toFixed(1)} V`);
    if (component.continuousCurrentA !== undefined) details.push(`${component.continuousCurrentA} A continuous`);
  }
  if (component.role === 'battery') {
    if (component.nominalVoltageV !== undefined) details.push(`${component.nominalVoltageV.toFixed(1)} V nominal`);
    if (component.fullChargeVoltageV !== undefined) details.push(`${component.fullChargeVoltageV.toFixed(1)} V full charge`);
    if (component.capacityAh !== undefined) details.push(`${component.capacityAh.toFixed(1)} Ah`);
    details.push(component.continuousCRating === undefined ? 'Continuous C rating unavailable' : `${component.continuousCRating}C continuous`);
  }
  if (component.role === 'servos' && component.quantity !== undefined) details.push(`${component.quantity} servos · ${component.massG} g each`);
  if (component.role === 'receiver') {
    if (component.receiverChannels !== undefined) details.push(`${component.receiverChannels} channels`);
    if (component.modulation) details.push(component.modulation);
    if (component.band) details.push(component.band);
    if (component.minInputVoltageV !== undefined && component.maxReceiverInputVoltageV !== undefined) {
      details.push(`${component.minInputVoltageV}–${component.maxReceiverInputVoltageV} V input`);
    }
    if (component.telemetry) details.push(`${component.telemetry} telemetry`);
    if (component.stabilization) details.push(`${component.stabilization} stabilization`);
    if (component.antenna) details.push(`${component.antenna} antenna`);
    if (component.rangeType) details.push(`${component.rangeType} range`);
    if (component.serialOutput) details.push(`${component.serialOutput} serial output`);
    if (component.failsafe) details.push(`Failsafe: ${component.failsafe}`);
  }
  if (component.massG !== undefined && component.role !== 'servos') details.push(`${component.massG} g`);
  return details;
}

export default function ComponentPicker({ role, selectedId, onSelect, onClose }: ComponentPickerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const available = components.filter((component) => component.role === role);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => {
      if (dialog?.open) dialog.close();
    };
  }, [role]);

  return (
    <dialog
      className="picker-dialog"
      ref={dialogRef}
      aria-labelledby="picker-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === dialogRef.current) onClose(); }}
    >
      <div className="picker-heading">
        <div>
          <p className="eyebrow">Component catalog</p>
          <h2 id="picker-title">Choose a {roleLabels[role].toLowerCase()}</h2>
        </div>
        <button className="icon-button" type="button" onClick={onClose} aria-label="Close component picker">×</button>
      </div>
      <div className="picker-list">
        {available.map((component) => {
          const isSelected = component.id === selectedId;
          return (
            <article className={`picker-option${isSelected ? ' is-selected' : ''}`} key={component.id}>
              {component.imageUrl && <img className="picker-option-image" src={component.imageUrl} alt="" />}
              <div className="picker-option-copy">
                <div className="option-title-row">
                  <h3>{component.name}</h3>
                  {isSelected && <span className="selected-chip">Selected</span>}
                </div>
                <p className="spec-line">{componentDetails(component).join(' · ')}</p>
                {component.description && <p className="component-description">{component.description}</p>}
                {component.modelNumber && <p className="spec-line">Manufacturer item number: {component.modelNumber}</p>}
                {component.dataStatus === 'manufacturer-source' && component.sourceUrl ? (
                  <>
                    <span className="provenance"><span aria-hidden="true">✓</span> Manufacturer specifications · checked {component.sourceLastVerified}</span>
                    <a className="source-link" href={component.sourceUrl} target="_blank" rel="noreferrer">Product details and purchase at {component.manufacturer} ↗</a>
                  </>
                ) : (
                  <span className="provenance"><span aria-hidden="true">✳</span> Synthetic demo data</span>
                )}
              </div>
              <button className={isSelected ? 'button button-secondary' : 'button button-primary'} type="button" onClick={() => onSelect(component)}>
                {isSelected ? 'Keep selected' : `Select ${roleLabels[role].toLowerCase()}`}
              </button>
            </article>
          );
        })}
      </div>
      <p className="picker-footnote">Manufacturer-sourced entries link to their product page. Other catalog values and images are synthetic demo fixtures, not hardware recommendations or product photos.</p>
    </dialog>
  );
}
