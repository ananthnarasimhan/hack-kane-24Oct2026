# Test the current product

Create a requirement-linked Kane CLI browser suite for the current RC Airplane Build Planner. Derive runnable tests from the approved PRD and its acceptance criteria; do not assume behavior that the PRD does not specify.

## Product behavior in scope

- The build planner is a single-page application with a Build planner view and a separate in-app 3D preview view. Navigation between them preserves the current build selections and selected wind condition.
- The planner lets a user select the synthetic trainer airframe and components for motor, propeller, ESC, battery, servos, and receiver. It displays the selected parts, compatibility results, and specification summary on the build page. The receiver picker includes three manufacturer-sourced Spektrum products with exact model numbers, source links, specifications, descriptions, and verification dates; remaining demo components stay synthetic.
- Compatibility feedback uses text states: incomplete, compatible, incompatible, and needs-check. It identifies the relevant rule, displays compared values and units when available, and explains missing inputs when a rule cannot be checked. Passing the supported checks is not described as flight safety or certification.
- The specification summary updates with the selected build. It distinguishes catalog values, calculated values, and estimates; shows units and inputs; and displays unavailable values with a reason instead of inventing a value.
- The separate Three.js preview offers calm (0 mph, N), light breeze (8 mph, NW), moderate breeze (16 mph, W), strong breeze (25 mph, SW), and very strong breeze (35 mph, E). It shows the moving aircraft against a visible sky-and-land background and marked reference path, with available current-build facts and individual compatibility outcomes. Its scene is clearly labeled illustrative and not a validated aerodynamic or flight-safety simulation.
- Wind response: at calm (0 mph), the aircraft follows a straight path; at slight crosswind (8 mph), its heading visibly angles and its ground path bends slightly; at strong/very strong wind (25/35 mph), it drifts far from the marked path and exits the visible flight area. These are scripted visual responses, not calculated real-aircraft flight predictions.
- Build response: when the selected build has a supported static thrust-to-weight estimate, its value changes the aircraft's illustrative travel pace. Changing relevant build parts refreshes this pace along with the displayed build facts. If the estimate is unavailable, use neutral demo pace and disclose the missing estimate. Do not derive predicted airspeed, climb performance, or safety from input watts or static thrust-to-weight.
- The preview offers five named synthetic demo profiles: low thrust, balanced trainer, high thrust, no matching thrust reference, and weak receiver range. The first four load complete synthetic builds and update facts and compatibility in place; available thrust-to-weight visibly changes pace. The weak-range profile loads a receiver with a shorter synthetic range while retaining enough control channels to pass the channel-count check.
- The selected receiver's synthetic range in meters and the accumulated illustrative flight distance are visible in the simulator. When distance exceeds receiver range, show an announced “Signal lost” error and move the aircraft away from its marked path. Resetting/changing the demo profile restarts the demonstration. This is an illustrative threshold, not a prediction of actual radio coverage.
- The Build planner's “Try a demo” controls include the existing Passing setup, Propeller clearance, and Missing battery rating fixtures plus all five demo profiles, so users can load and compare these setups directly from the planner.
- If WebGL is unavailable, the preview shows a readable fallback and keeps its build facts available. The preview and controls remain usable at desktop and narrow viewport sizes and by keyboard.
- The trainer airframe and demonstration fixtures are synthetic demo data, not manufacturer-verified products or recommendations. The Spektrum AR410, AR620, and AR631 receiver entries use the manufacturer-linked values tracked in `receiver-product-comparison.md`; that provenance does not make them recommendations or a guarantee of compatibility with every transmitter.

## Fixture coverage required

Use the named fixtures exposed by the planner to cover the supported outcome classes and rules. These are expected behaviors for suite generation, not hand-authored Kane runnable tests:

- Passing setup: every supported rule passes; overall state is compatible.
- Propeller clearance: oversized propeller exceeds airframe clearance; overall state is incompatible.
- Missing battery rating: battery discharge result needs-check because continuous C rating is unavailable; overall state is needs-check.
- Voltage limit: high-voltage battery exceeds motor and ESC maximum input limits; overall state is incompatible.
- Motor current: reference current exceeds the motor maximum; overall state is incompatible.
- ESC current: reference current exceeds ESC continuous-current rating; overall state is incompatible.
- Battery discharge: reference current exceeds battery continuous discharge capability; overall state is incompatible.
- Motor mount: motor mount pattern differs from airframe pattern; overall state is incompatible.
- Build mass: estimated build mass exceeds airframe maximum; overall state is incompatible.
- Servo capacity: selected servo count is below airframe requirement; overall state is incompatible.
- Receiver channels: receiver channel count is below airframe requirement; overall state is incompatible.

The generated suite should cover all five demo profiles from the Build planner's “Try a demo” controls and the preview's preset area, and their build/fact/pace/range changes; navigation to and from the preview; persistence of the selected build and wind preset; updates to displayed facts and illustrative travel pace after a build change; missing-value presentation and neutral motion when the thrust estimate is unavailable; the weak-range profile's visible receiver range, flight-distance progression, and “Signal lost” error after the threshold is passed; a visible background/reference path; all three wind response cases (straight calm path, angled slight-crosswind flight, and strong-wind drift out of view); and clear synthetic-data / illustrative-preview disclosures. Validate only observable behavior and values supported by the PRD and demo catalog. The wind, build-power, and receiver-range cases must be checked visually in the browser; do not assert real-world aerodynamic or radio range accuracy.

## Kane CLI authoring boundary

Use this file and the PRD as requirement inputs when suite generation is authorized. Kane CLI should produce the requirement-linked runnable `_test.md` files. Do not hand-author `_test.md` cases. Receiver product source comparisons are tracked separately in `receiver-product-comparison.md`.
