export default function AdvisoryNotice() {
  return (
    <aside className="advisory" aria-label="Important build guidance">
      <span className="advisory-icon" aria-hidden="true">i</span>
      <p><strong>Planning feedback only.</strong> A compatible result means only that this Build passes supported checks; it is not flight advice or a safety certification. Verify manufacturer limits and inspect and test the physical aircraft before flight.</p>
    </aside>
  );
}
