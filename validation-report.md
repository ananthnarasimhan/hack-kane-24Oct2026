# Validation Report — Interactive 3D Aircraft and Wind Preview

**Date:** 2026-10-24  
**Target:** Local planner at `http://localhost:5173` (Vite also reports port 5174)  
**Requirement source:** `requirements/threejs-wind-preview.spec.md`  
**Validation status:** **Partial — smoke check passed; interaction suite remains pending**

## Summary

The local `planner-smoke_test.md` has one passing browser step: it opens the Build planner, navigates to the 3D preview, and verifies the preview controls and facts. The latest replay completed 1/1 tests successfully (7 seconds for the test; 12.983 seconds for the full run). Kane reported **0% coverage for this run** because the smoke test is not linked to designed acceptance criteria: it ran no designed tests, and the two project use cases currently have no criteria. That coverage number does not mean the browser test failed. This is still a smoke check only; it does not establish full interaction coverage. The detailed interaction tests still need to be designed/reviewed and run. As of this report, **1 smoke check passed; the detailed acceptance criteria remain unverified**.

The repository is linked to the Test Manager project **oct24 hackathon**. The local CLI profile URL defaults to the KaneAI playground; browser tests for this planner must explicitly use `http://localhost:5173`. The one-step smoke test is saved locally; no requirement-linked interaction or receiver comparison suite has been generated yet.

## Acceptance coverage

Every acceptance criterion below remains **Not run**. These are grouped from the approved specification, not test results.

| Area | Requirement to validate | Status |
|---|---|---|
| Navigation and rendering | Navigate from the build workspace to the simulator page; confirm the Three.js trainer, wind controls, build facts, compatibility state, and default calm condition appear. | Smoke check passed; detailed assertions not run |
| Wind controls | Change wind speed and direction; confirm the indicator, scene response, and selected condition label update. | Not run |
| Calm wind | Confirm the aircraft follows a straight marked path against the visible background. | Not run |
| Slight crosswind | Confirm the aircraft visibly angles and its path bends slightly. | Not run |
| Strong wind | Confirm the aircraft drifts from the marked path and leaves the visible flight area. | Not run |
| Build-dependent pace | With a supported static thrust-to-weight estimate, change motor, propeller, battery, or mass; confirm the estimate and illustrative travel pace update. | Not run |
| Missing propulsion estimate | With no supported estimate, confirm neutral travel pace and an unavailable-estimate explanation. | Not run |
| Simulation disclosure | Confirm all wind responses are identified as scripted illustration and not calculated real-aircraft physics. | Not run |
| Propulsion presets | Select each preset in the preview; confirm synthetic component selections, compatibility checks, build facts, and available estimate update in place. | Not run |
| Distinguishable pace | Confirm low-thrust, balanced, and high-thrust presets produce visibly different illustrative paces when their supported estimates differ. | Not run |
| Missing motor reference | Select the preset without a matching motor reference; confirm unavailable estimates, neutral motion, and an explanation. | Not run |
| Receiver range | Confirm the selected receiver's synthetic range in meters and accumulated illustrative flight distance are visible. | Not run |
| Signal loss | Load the weak-range profile, exceed its range, and confirm a “Signal lost” alert and departure from the marked path. | Not run |
| Repeatable range demo | Reload a demo profile after signal loss; confirm distance resets and the demonstration can be repeated. | Not run |
| Range disclosure | Confirm receiver-range behavior is labeled synthetic and not a prediction of actual radio coverage. | Not run |
| Live build facts | Change selections; confirm compatibility and supported facts reflect the current build, with absent values shown as unavailable. | Not run |
| WebGL fallback | With WebGL unavailable, confirm a legible fallback appears and build facts remain available. | Not run |
| General illustration disclosure | Confirm every wind setting clearly states the visualization is illustrative and does not predict actual flight behavior. | Not run |
| Validation scenarios | Select every named scenario; confirm compatibility matches its stated outcome and the specification summary reflects that build. | Not run |

## Receiver source review

Current official manufacturer pages and the local catalog were compared on 2026-10-24. This is a source/catalog review, not a Kane browser assertion of the picker UI.

- **AR410 / SPMAR410:** Product identity, 4 channels, 7 g, 2.4 GHz, 3.5–9 V, internal antenna, and full-range designation match the catalog. The page's overview mentions DSMX/DSM2 compatibility while its specification table says DSMX; the catalog says DSMX only. The page's narrative describes flight-log telemetry while its spec row says `Flight Log Compatible: No`. Treat modulation and that telemetry distinction as ambiguous/incomplete.
- **AR620 / SPMAR620:** Product identity, 6 channels, 8 g, 2.4 GHz, 3.5–9 V, internal antenna, and full-range designation match. The catalog records DSM2 compatibility, consistent with the page overview. The page's narrative describes flight-log telemetry while its spec row says `Flight Log Compatible: No`; treat the exact meaning as ambiguous.
- **AR631 / SPMAR631:** The catalog still points to the original AR631 page, which now marks that model discontinued and points to AR631+ / SPM-1031. The original model and successor are distinct identities. The local entry also describes AS3X / SAFE, while the successor page lists AS3X+ / SAFE. This is an availability/mapping update for human review; no catalog values were changed.
- Manufacturer pages do not give a receiver range in meters. The app's meter values are synthetic demo data and cannot be validated as manufacturer range.

Sources: [AR410](https://www.spektrumrc.com/product/spektrum-ar410-dsmx-4-channel-sport-receiver/SPMAR410.html), [AR620](https://www.spektrumrc.com/product/spektrum-ar620-dsmx-6-channel-sport-receiver/SPMAR620.html), [discontinued AR631](https://www.spektrumrc.com/product/spektrum-ar631-dsmx-6-channel-as3x-and-safe-receiver/SPMAR631.html), [AR631+ successor](https://www.spektrumrc.com/product/spektrum-ar631-dsmx-6-channel-as3x-and-safe-receiver/SPM-1031.html).

## Blocker and next action

Latest preflight findings: Kane CLI `0.10.0-rc.3`; authenticated OAuth profile; 101,195.5799 credits; Chrome found; app ports 5173 and 5174 found; shared project `oct24 hackathon`. With network access, `context list` succeeded and showed proposed current-product and source-comparison use cases. The latest replay execution ID is `1ff1946e-4232-43c6-b88c-0cde5a3177bb`; its evidence pack was ingested successfully. The passing smoke result is also saved in `.testmuai/tests/output-planner-smoke/Result.md`.

Use [validation-runbook.md](requirements/validation-runbook.md) to ingest the refreshed receiver comparison requirement, review the proposed use cases and generated designs, run the interaction suite against `http://localhost:5173`, and calculate shared-project coverage. The smoke replay itself needs no fix; nonzero requirement coverage requires designed tests linked to acceptance criteria. Append observed results and evidence-derived coverage after that run.
