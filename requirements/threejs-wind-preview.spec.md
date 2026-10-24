---
title: 'Interactive 3D Aircraft and Wind Preview'
type: 'feature'
created: '2026-10-24'
status: 'in-review'
baseline_commit: 'a7c2f79e46bfa7639446bb024c7de98a71863d38'
context:
  - '{project-root}/_bmad-output/planning-artifacts/prds/prd-kane-cli-hackathon-2026-10-24/prd.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Builders can configure a synthetic RC aircraft build, but cannot see the assembled aircraft as an interactive 3D model or explore wind-condition scenarios. The demo also needs more repeatable synthetic configurations that exercise the planner’s pass, mismatch, and missing-data outcomes.

**Approach:** Add an interactive Three.js preview on its own in-app page with clear navigation from the build planner. Keep the build and specification summary together on their current page. Show a 3D trainer aircraft, let users choose clearly labeled illustrative wind conditions, keep current specifications and compatibility visible, and expand the mock catalog and scenario presets to cover supported compatibility outcomes.

## Boundaries & Constraints

**Always:** Reflect the current selected build in the preview where supported; show units and current compatibility status; make wind direction and strength readable; label wind response as illustrative rather than validated flight simulation; keep mock products identified as synthetic; preserve existing build selection and compatibility flows; keep the section usable on desktop and narrow screens.

**Ask First:** Adding external aircraft models or other assets that require licensing; presenting calculated aerodynamic or safety claims; collecting or persisting user build data.

**Never:** Claim aerodynamic accuracy, recommend that a build is safe to fly, imply synthetic catalog values are manufacturer-verified, or invent performance measurements as factual outputs.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Open simulator page | User navigates from the build planner to the simulator page | Render the trainer aircraft and show available build facts, compatibility state, and a default calm-wind condition | If WebGL is unavailable, show a clear fallback message and preserve the facts panel |
| Change wind | User selects a listed wind speed or direction | Update the wind indicator and illustrative scene response; keep selected build facts visible | Unsupported rendering changes must not break build controls |
| Change build | User changes airframe or a component | Refresh applicable build facts and status in the preview without resetting the wind selector | Missing measurements display as unavailable |
| Narrow viewport | Viewport is mobile-width | Stack visualization and facts panel; retain accessible controls and readable labels | Avoid horizontal overflow |
| Load a validation scenario | User selects a named demo configuration | Populate the catalog roles and update every supported compatibility result and available specification | Unknown scenario leaves current build unchanged |

</frozen-after-approval>

## Code Map

- `src/components/BuildWorkspace.tsx` -- current build view and quick access to representative mock scenarios.
- `src/components/AircraftSimulation.tsx` -- Three.js scene, wind controls, build facts, and scenario outcome view.
- `src/data/catalog.ts` -- synthetic catalog and named validation configurations.
- `src/App.tsx` -- owns current selected airframe, components, and derived specification/compatibility state.
- `src/domain/specifications.ts` -- computes currently supported build facts.
- `src/domain/compatibility.ts` -- computes the status and explanations to surface.
- `src/styles.css` -- shared page layout and responsive styling.
- `package.json` -- dependency declarations for the rendering library.

## Tasks & Acceptance

**Execution:**
- [x] `package.json` -- add the Three.js runtime and types -- enable a real interactive 3D scene.
- [x] `src/components/AircraftSimulation.tsx` -- create the preview scene, wind controls, and build facts panel -- make the requested experience available.
- [x] `src/App.tsx` -- add a separate simulator page and pass current build state into it -- keep the preview synchronized and navigable.
- [x] `src/data/catalog.ts` -- add named fixtures for compatible, incompatible, and incomplete-check outcomes across supported rules -- make the demo repeatable.
- [x] `src/components/BuildWorkspace.tsx` -- make representative fixture scenarios selectable -- let a walkthrough exercise common catalog cases.
- [x] `src/styles.css` -- style the scene, controls, facts, fallbacks, and responsive layout -- fit the existing interface.

**Acceptance Criteria:**
- Given the build workspace is open, when the user navigates to the simulator page, then a Three.js aircraft preview and wind controls appear on that page.
- Given the user changes wind speed or direction, when the control changes, then wind indicators and the illustrative scene response update and the selected condition is labeled.
- Given calm wind is selected, when the aircraft moves through the scene, then it follows a straight marked path against a visible background.
- Given the slight crosswind setting is selected, when the aircraft moves through the scene, then it visibly flies at an angle and its path bends slightly.
- Given a strong-wind setting is selected, when the aircraft moves through the scene, then it visibly drifts away from the marked path and leaves the visible flight area.
- Given the selected Build has a supported static thrust-to-weight estimate, when its motor, propeller, battery, or mass changes, then the displayed estimate and illustrative travel pace update to reflect that Build.
- Given the selected Build has no supported static thrust-to-weight estimate, when the preview runs, then it uses a neutral travel pace and explains that the propulsion estimate is unavailable.
- Given any wind response, when it is shown, then the interface identifies it as scripted illustration rather than calculated real-aircraft physics.
- Given the preview is open, when the user selects any propulsion preset, then the synthetic component set, compatibility checks, build facts, and available static thrust-to-weight estimate update without leaving the page.
- Given low-thrust, balanced, or high-thrust presets are selected, when their supported static thrust-to-weight estimates differ, then their illustrative travel paces are visibly distinguishable.
- Given a propulsion preset has no matching motor reference, when it is selected, then the preview shows unavailable propulsion estimates, uses neutral motion, and explains why.
- Given a receiver is selected, when the preview is shown, then its synthetic range in meters and the accumulated illustrative flight distance are visible.
- Given a weak-range receiver profile is loaded, when accumulated flight distance exceeds its range, then the preview announces a “Signal lost” error and shows the aircraft departing the marked path.
- Given a receiver-range demo has triggered an error, when a demo profile is loaded again, then the distance resets and the range demonstration can be repeated.
- Given any receiver-range response is shown, when the user reviews it, then it is labeled as synthetic and not a prediction of actual radio coverage.
- Given build selections change, when the preview updates, then current compatibility status and available supported build facts reflect those selections, and absent values are shown as unavailable.
- Given the browser cannot render WebGL, when the section loads, then it presents a legible fallback with the build facts still available.
- Given any wind setting, when the preview is shown, then it clearly discloses that the visualization is illustrative and does not predict actual flight behavior.
- Given each named validation scenario is selected, when the planner updates, then its resulting compatibility state matches the scenario description and the specification summary reflects the same build.

## Spec Change Log

- 2026-10-24 — Product owner requested three distinct demo outcomes: straight path in calm air, angled flight under slight crosswind, and strong-wind drift away. Updated the preview scope to add visible landscape/path context and scripted illustrative responses; this supersedes the prior wind-only scene response.
- 2026-10-24 — Product owner asked whether flight power reflects the selected Build. Added the supported static thrust-to-weight estimate as a visual travel-pace proxy, with neutral motion when unavailable; explicitly excluded real speed/climb prediction.
- 2026-10-24 — Added four synthetic propulsion presets (low, balanced, high, and no matching reference) so the demo can compare build-dependent travel pace and missing-data fallback.
- 2026-10-24 — Added synthetic receiver range values and a weak-range profile that announces signal loss after the illustrative flight distance passes the receiver's range.

## Verification

**Commands:**
- `npm run build` -- expected: TypeScript compilation and Vite production build succeed.

