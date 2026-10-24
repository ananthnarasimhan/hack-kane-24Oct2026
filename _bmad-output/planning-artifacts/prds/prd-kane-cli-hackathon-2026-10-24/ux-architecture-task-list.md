---
title: 'RC Airplane Build Planner MVP'
type: 'feature'
created: '2026-10-24'
status: 'in-progress'
baseline_commit: 'a7c2f79e46bfa7639446bb024c7de98a71863d38'
context:
  - '_bmad-output/planning-artifacts/prds/prd-kane-cli-hackathon-2026-10-24/addendum.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Builders need a clear way to assemble a fixed-wing RC airplane from a small Catalog and understand mismatches and derived specifications. The project has planning documents but no application scaffold.

**Approach:** Create a desktop browser planner for one editable Build, with a curated synthetic Catalog, explained compatibility results, and a Specification Summary. Keep selection state in memory and calculations in pure client-side functions.

## Boundaries & Constraints

**Always:** Keep the prototype frontend-only and session-only; label every fixture as synthetic demo data; preserve units and missing values; explain rule inputs, limits, and outcomes; describe compatible as “passes supported checks”; keep manufacturer verification and physical inspection guidance visible.

**Ask First:** Before adding real manufacturer-backed Catalog data, persistence, accounts, remote services, or compatibility rules outside the PRD.

**Never:** Add a backend, database, API, localStorage, or user-authored Catalog entries. Do not describe results as flight advice, certification, or proof of safety. Mobile polish and flight simulation are out of scope.

</frozen-after-approval>

## Code Map

- `README.md` — project notes and KaneCLI conventions; no application scaffold exists.
- `_bmad-output/planning-artifacts/prds/prd-kane-cli-hackathon-2026-10-24/prd.md` — authoritative product requirements.
- `_bmad-output/planning-artifacts/prds/prd-kane-cli-hackathon-2026-10-24/addendum.md` — synthetic fixture values and expected calculations.
- `package.json`, `index.html`, `src/main.tsx` — create the client-side app foundation.
- `src/data/catalog.ts`, `src/domain/types.ts` — typed demo records and domain shapes.
- `src/domain/compatibility.ts`, `src/domain/specifications.ts` — pure evaluation and calculation functions.
- `src/App.tsx`, `src/components/` — workspace, picker, compatibility results, and summary UI.
- `src/styles.css` — neutral desktop layout, focus, and status styling.

## Tasks & Acceptance

**Execution:**
- [x] `package.json`, `index.html`, `src/main.tsx`, `src/App.tsx` — establish a lightweight Vite, React, and TypeScript app with Build and Summary views; keep state in memory.
- [x] `src/domain/types.ts`, `src/data/catalog.ts` — define Airframe, Component, role, units, and synthetic provenance; add the Trainer, compatible parts, 279 mm propeller, and battery with missing C rating.
- [x] `src/domain/compatibility.ts` — compare full-charge voltage to motor/ESC limits; reference current to motor, ESC, and battery capacity × continuous C; total mass to Airframe limit; plus mount, prop clearance, servo, and receiver requirements. Return states in specified precedence.
- [x] `src/domain/specifications.ts` — calculate mass, wing loading, battery values, input power, and thrust-to-weight with inputs, units, and unavailable reasons.
- [x] `src/components/BuildWorkspace.tsx`, `src/components/ComponentPicker.tsx` — provide Airframe and role selection, role-scoped choices, replace actions, and recalculation after changes.
- [x] `src/components/CompatibilityPanel.tsx`, `src/components/SpecificationSummary.tsx`, `src/components/AdvisoryNotice.tsx` — explain outcomes and values, expose summary navigation, and keep advisory guidance visible.
- [x] `src/styles.css` — finish the 1280 × 800 desktop layout with keyboard focus, readable headings, and text status labels.

**Acceptance Criteria:**
- Given a new Build, when the workspace opens, then empty required roles are identified and the overall state is Incomplete.
- Given a role picker, when the builder selects or replaces an item, then only that role’s Catalog entries appear, the selection updates in memory, and feedback recalculates.
- Given the compatible synthetic fixture, when all required roles are selected, then the result says it passes supported checks and displays synthetic provenance.
- Given known rule inputs, when compatibility is evaluated, then all voltage, current, mass, fit, and control checks compare against their documented limits and show the affected values; a known mismatch identifies a selection the builder can change.
- Given the 279 mm propeller, when compatibility is evaluated, then the result identifies 279 mm versus the Airframe’s 254 mm clearance as incompatible.
- Given a battery without a continuous C rating, when compatibility is evaluated, then it reports needs-check for the missing discharge input and never reports compatible.
- Given any required rule input is missing, when compatibility is evaluated, then the result names the unavailable input; overall state precedence is incomplete, incompatible, needs-check, then compatible.
- Given the compatible fixture, when the Summary is opened, then it shows 1,068 g mass, 44.5 g/dm² wing loading, 222 W input power, and 0.80:1 thrust-to-weight, with inputs and units; missing inputs show Unavailable and a reason.
- Given any Build state, when the builder uses the app by keyboard or reads its status, then actions have visible focus, statuses use text, and the advisory says to verify manufacturer limits and inspect/test the aircraft before flight.

## Design Notes

No existing framework or brand system is present. Use Vite, React, and TypeScript for a small client-side app; keep Catalog values out of rendered components and calculations independent of UI. Use neutral styling. Fixture values come from the linked addendum: Airframe 750 g, 1,200 g maximum, 1,200 mm wingspan, 24 dm² wing area, 254 mm prop clearance, 16 mm mount, four servos, and four receiver channels; motor 55 g, 12.6 V maximum, 25 A maximum, with a 20 A / 850 gf reference at 11.1 V; propeller 10 g / 254 mm; ESC 25 g, 12.6 V / 30 A; battery 180 g, 11.1 V nominal / 12.6 V full / 2.2 Ah / 25C; four 9 g servos and a 12 g, four-channel receiver. The summary formulas are total mass = Airframe plus selected Components; wing loading = mass ÷ wing area; input power = reference voltage × reference current; thrust-to-weight = static thrust ÷ mass.

## Verification

**Commands:**
- `npm run build` — expected: production build completes successfully.

**Manual checks:**
- At 1280 × 800, assemble the compatible fixture, open Summary, and confirm the expected values above.
- Replace the propeller with the 279 mm variant and confirm the clearance explanation; select the battery missing C rating and confirm needs-check.
- Confirm no compatible state is presented as flight safety or certification.
