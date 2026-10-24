---
title: RC Airplane Build Planner
status: final
created: 2026-10-24
updated: 2026-10-24
---

# PRD: RC Airplane Build Planner

## 0. Document Purpose

This PRD guides UX and implementation for a hobby/hackathon browser planner. The user asked for component selection, compatibility checks, and overall specs, and authorized assumptions for the remaining details. Competitive context and synthetic validation fixture data are in `addendum.md`; assumptions are tagged and indexed in §10.

## 1. Vision

The RC Airplane Build Planner lets a hobby builder assemble a virtual fixed-wing airplane from a small Catalog of Components. **[ASSUMPTION]** The prototype targets fixed-wing airplanes. As the builder selects Components, the planner checks supported compatibility constraints, explains any issue, and updates the Build’s Specification summary. A separate illustrative 3D preview page shows the configured trainer airplane with selectable wind-condition visuals and live build facts.

The prototype helps builders catch obvious mismatches and understand the consequences of Component choices before buying or assembling hardware. Results are advisory and limited to available Catalog data.

## 2. Target User

### 2.1 Jobs To Be Done

- Explore a fixed-wing RC airplane build from a finite set of available components.
- Understand why a selected combination works, conflicts, or needs further checking.
- Compare the assembled airplane’s key dimensions, mass, and estimated power performance.

### 2.2 Key User Journey

- **UJ-1. Alex assembles and checks a first airplane Build.** **[ASSUMPTION]** Alex is a hobby builder using a desktop browser. Alex selects an Airframe, fills the required Component roles, and changes Components while reviewing Compatibility results. Alex reviews the Specification summary on the same build page, then may open the separate 3D preview page to inspect the current configuration and illustrative wind visuals.

## 3. Glossary

- **Airframe** — The fixed-wing structure selected as the base of a Build, with required Component roles and published limits.
- **Component** — A selectable motor, propeller, electronic speed controller (ESC), battery, servo, or receiver used to complete an Airframe.
- **ESC** — Electronic speed controller; regulates power from the battery to the motor.
- **Build** — One Airframe and its selected Components.
- **Catalog** — The prototype’s curated set of Airframes, Components, and their specifications.
- **Compatibility rule** — A documented comparison between Component specifications or an Airframe limit.
- **Compatibility result** — One rule’s outcome: compatible, incompatible, or needs-check.
- **Specification summary** — Dimensions, mass, electrical values, and Supported estimates for a Build.
- **Supported estimate** — A calculated value with all required Catalog inputs and reference data.
- **Validation fixture** — A fixed sample Build used to verify expected outcomes. Synthetic fixture values are not real hardware recommendations.

## 4. Features

### 4.1 Component Catalog and Build

**Description:** A builder starts with an Airframe and fills its required component roles from a compact Catalog. Each Component shows its relevant specifications and the Build’s selections remain editable as feedback is displayed. Realizes UJ-1. **[ASSUMPTION]** The first release uses a curated sample Catalog with one or more examples per role; it does not require vendor integrations or user-contributed parts.

**Functional Requirements:**

#### FR-1: Select components for a build

A builder can select and replace a Component in each required role for the chosen Airframe. The Catalog presents the values needed to evaluate supported Compatibility rules and calculate the Specification summary. Realizes UJ-1.

**Consequences (testable):**
- Each Catalog entry identifies its role and displays the specifications used in a rule or calculation.
- The Build identifies empty required roles and updates its feedback when a selection changes.

### 4.2 Compatibility Checks

**Description:** The planner evaluates documented rules for electrical ratings, motor/propeller combinations, physical fit, Airframe limits, and required control Components. **[ASSUMPTION]** A known limit violation is incompatible; missing or unvalidated data yields needs-check. The MVP does not use borderline warnings because no warning threshold has been established.

**Functional Requirements:**

#### FR-2: Check supported component relationships

The planner can evaluate the electrical, motor/propeller, Airframe-mass, physical-fit, and control requirements listed below. **[ASSUMPTION]** Physical fit is checked only when the required mounting or clearance dimensions are present. Realizes UJ-1.

**Consequences (testable):**
- Voltage check: battery full-charge voltage must not exceed the motor or ESC maximum input voltage.
- Current check: a motor/propeller reference point must exist at the selected battery’s nominal voltage. The reference current must not exceed the motor’s maximum current or the ESC’s continuous-current rating. The battery’s continuous discharge current (`capacity in Ah × continuous C rating`) must be at least the reference current. Without a matching point, return needs-check.
- Airframe check: estimated Build mass—the Airframe’s mass plus the mass of every selected Component—must not exceed the Airframe’s published maximum mass. If any required mass value is missing, the result is needs-check.
- Physical-fit check: motor mount patterns must match and propeller diameter must not exceed the Airframe’s published clearance limit.
- Control check: selected servo count and receiver channel count must meet the Airframe’s stated requirements.
- Missing rule inputs yield needs-check. A Component relationship is compatible only when all supported checks pass.

**Validation fixture [ASSUMPTION]:** Synthetic demo data in `addendum.md` produces a compatible Build with a mass of 1,068 g, wing loading of 44.5 g/dm², electrical input power of 222 W, and static thrust-to-weight estimate of 0.80:1. With a 279 mm propeller, the compatibility result is incompatible. Without the battery’s continuous-discharge rating, the result is needs-check. These values are not real hardware recommendations or flight advice.

#### FR-3: Review and explain compatibility outcomes

The builder can review the overall Build state and each Compatibility result, identify affected Components, and change selections. Each result names the rule and selected values, and shows the applicable limit or identifies the missing input. Realizes UJ-1.

**Consequences (testable):**
- **[ASSUMPTION]** The overall state takes the first applicable outcome in this order: incomplete when a required role is empty; incompatible when any rule reports a known conflict; needs-check when any required result lacks validation data; compatible when all required roles are filled and all supported rules pass.
- Status is communicated in text and is not conveyed by color alone. Unknown Catalog values are never treated as proof of compatibility.
- A known incompatibility identifies at least one Component selection the builder can change.
- The planner describes a compatible Build as passing the supported checks, not as safe or certified to fly.

### 4.3 Specification Summary

**Description:** The planner summarizes values derived from the selected Airframe and Components. It separates catalog specifications from calculations and Supported estimates so the builder can see what is measured, calculated, or unavailable. Realizes UJ-1.

**Functional Requirements:**

#### FR-4: Calculate and display build specifications

A builder can view a Specification summary for a Build that includes total estimated mass, wingspan, wing loading when wing area is available, battery voltage and capacity, electrical input power from supported inputs, and static thrust-to-weight estimate when thrust reference data exists. Realizes UJ-1.

**Consequences (testable):**
- Each calculated value identifies its inputs and units.
- An estimate is labeled as such; a value missing required inputs is shown as unavailable, not fabricated.
- Total estimated mass is Airframe mass plus the mass of every selected Component; it is unavailable if any required mass value is missing. Wing loading is total estimated mass in g divided by wing area in dm²; electrical input power is the supported reference voltage in V multiplied by current in A; static thrust-to-weight is supported static thrust in gf divided by total estimated mass in g.
- The summary updates when a relevant Component changes.

### 4.4 Illustrative 3D Preview

**Description:** A separate in-app page displays a Three.js model of the synthetic trainer Airframe, visual wind-condition controls, and current Build facts. The preview complements component selection; it is not a flight simulator.

#### FR-5: Explore illustrative wind effects on an aircraft path

A builder can open a separate preview page from the Build planner and choose a named wind condition with readable speed and direction. Against a visible sky-and-land background with a marked reference path, the trainer moves through the scene so the effect is easy to see: calm wind keeps a straight path, a slight crosswind angles the aircraft and bends its path, and strong wind carries it away from the reference path and out of view. When available, the selected Build’s estimated static thrust-to-weight changes the illustrative travel pace; when unavailable, the scene uses a neutral pace and says the estimate is unavailable. Current Build specifications and Compatibility status remain visible.

**Consequences (testable):**
- Wind presets are labeled in mph and compass direction: calm (0 mph, N), light breeze (8 mph, NW), moderate breeze (16 mph, W), strong breeze (25 mph, SW), and very strong breeze (35 mph, E).
- The scene shows a moving aircraft against a visible background and reference path; wind changes its heading and ground track.
- Calm wind produces a straight path; the light-breeze crosswind produces a visible angled flight; strong and very strong breeze carry the aircraft away from the marked path and out of view.
- Wind responses are a simplified visual demonstration of wind-relative heading and ground-track drift, not calculated aerodynamic behavior or a prediction for a real aircraft.
- When a supported static thrust-to-weight estimate exists for the selected Build, changing a motor, propeller, battery, or component mass updates the displayed estimate and illustrative travel pace. If the estimate is unavailable, show that status and use neutral demo motion.
- The preview does not infer airspeed, climb performance, or flight safety from electrical input watts or static thrust-to-weight.
- The page shows current Airframe, selected Components, available build mass/wingspan/wing-loading/input-power/thrust-to-weight facts, and individual Compatibility outcomes. Unavailable estimates remain explicitly unavailable.
- The page states that the scene is illustrative, does not model validated aerodynamics, and makes no claim about safe flying conditions.
- If WebGL is unavailable, a readable fallback appears while build facts remain available.

### 4.5 Synthetic Validation Scenarios

#### FR-6: Load repeatable catalog fixtures

A builder can choose named synthetic configurations that exercise the planner’s supported Compatibility rules. Each fixture has a stated expected outcome that can be compared with the live results.

**Validation scenarios [ASSUMPTION]:** The synthetic fixture set covers eleven outcomes: passing setup (compatible); propeller clearance failure (incompatible); missing battery discharge rating (needs-check); high battery voltage (motor and ESC voltage incompatible); motor current failure (incompatible); ESC current failure (incompatible); battery discharge failure (incompatible); motor mount mismatch (incompatible); Airframe mass limit failure (incompatible); insufficient servo count (incompatible); and insufficient receiver channels (incompatible). Fixture data is synthetic and is not manufacturer-verified. Expected states are requirements for later test generation; they are not claims that a Kane CLI suite has already executed.

#### FR-7: Compare synthetic flight demonstration profiles

A builder can load named synthetic builds from the Build planner’s “Try a demo” controls or the preview to compare low-thrust, baseline trainer, high-thrust, missing-thrust-reference, and weak-receiver-range behavior. Each preset updates selected Components, compatibility results, build facts, and applicable scene responses. Missing propulsion data uses neutral motion and is disclosed. Weak receiver range triggers a visible signal-loss error after the scene's accumulated illustrative flight distance passes the selected receiver's synthetic range. These presets demonstrate only synthetic component values; they do not predict real speed, climb, radio coverage, or safety.

**Consequences (testable):**
- Low-thrust, balanced-trainer, and high-thrust presets load distinct synthetic motor/build selections and display their corresponding static thrust-to-weight estimates and electrical input-power estimates when supported.
- The scene uses each available static thrust-to-weight estimate to set a visibly distinct illustrative travel pace. A preset without a matching motor reference displays unavailable propulsion estimates and uses a neutral pace.
- Receiver entries expose a synthetic range in meters. A standard receiver demonstrates longer range; the weak-range profile uses a shorter range with adequate control channels so the range outcome can be isolated.
- The simulator displays selected receiver range and accumulated illustrative flight distance. If distance exceeds the selected receiver's range, it announces “Signal lost,” marks the warning as an error, and shows the aircraft departing the reference path.
- Preset controls and all affected values are labeled synthetic. Loading a preset refreshes compatibility and facts without navigating away from the preview.
- The Build planner’s “Try a demo” controls include the four propulsion profiles and weak receiver range alongside Passing setup, Propeller clearance, and Missing battery rating for quick iteration.

### 4.6 Validation Suite Scope

The project will maintain two Kane CLI suite inputs derived from this PRD. Kane CLI, when authorized, will generate requirement-linked runnable cases from the approved inputs; runnable cases must not be hand-authored.

- **Current-product suite:** Cover the build and specification flow, text compatibility states, unavailable inputs, all eleven compatibility fixture outcomes, all five demo profiles including weak-range signal-loss behavior, the separate 3D preview navigation, wind preset labels, current build facts, preservation of build/wind selections across navigation, responsive behavior, keyboard use, WebGL fallback, and the synthetic/illustrative disclosures. Assertions must be limited to observable behavior and catalog-supported values.
- **Source-comparison suite:** Compare a real catalog entry only with an approved source page for the exact manufacturer, model, and variant. Compare available role-relevant values and units; classify differences, missing values, ambiguity, and product identity mismatch for human review. Do not infer values or automatically update the catalog.

The source-comparison suite is not runnable against the current synthetic catalog: there are no approved source URLs or exact product mappings. Product source mapping remains an open question in §9. No external test system is part of the prototype’s runtime behavior.

## 5. Non-Goals (Explicit)

- **[ASSUMPTION]** Validated real-time flight, calculated aerodynamic behavior, flight controls, weather prediction, or crashes are outside this prototype. The 3D preview uses scripted visual responses only.
- **[ASSUMPTION]** Keeping named Build variants or comparing multiple Builds side by side is outside this prototype; builders can change the current Build’s Components and see updated results.
- Certifying airworthiness, guaranteeing flight performance, or replacing manufacturer guidance and pre-flight checks.
- **[ASSUMPTION]** Purchasing, inventory, pricing, vendor integrations, user accounts, collaborative Builds, local/cloud saving, and sharing are outside this prototype.

## 6. MVP Scope

### 6.1 In Scope

- Browser-based assembly of one fixed-wing Build from a curated Catalog. **[ASSUMPTION]** Initial roles are Airframe, motor, propeller, ESC, battery, servo, and receiver.
- Electrical, physical-fit, Airframe-mass, and control-count checks with explained outcomes and a Specification summary showing units, inputs, and unavailable values.
- A separate Three.js visual preview with a visible landscape and flight-path reference, labeled synthetic wind presets, scripted calm/crosswind/strong-wind motion, live current-build facts, a WebGL fallback, and clear illustrative-only disclosure.
- Named synthetic validation fixtures for the supported compatibility outcomes.
- Named synthetic flight profiles for low, baseline, and high thrust, unavailable thrust reference, and weak receiver range.

### 6.2 Out of Scope for MVP

The non-goals in §5 also apply to the MVP. Additional deferrals are:

- **[ASSUMPTION]** User-authored Components or arbitrary Catalog import; revisit after the supported data model is established.
- Aircraft design from scratch, validated aerodynamic simulation, or flight-safety prediction; the preview only visualizes a known synthetic Airframe.
- Flight-time predictions; they require a validated usage model not defined for this prototype.

## 7. Cross-Cutting NFRs

- **Trust and safety:** Compatibility feedback is a planning aid. The interface must state that builders need to verify manufacturer limits and inspect/test the physical aircraft before flight. The planner must not label an incomplete Build or a Build with incomplete Catalog data as safe.
- **Data clarity:** Catalog values, units, missing data, rule thresholds, and estimate inputs must be visible enough for a builder to understand the result.
- **Usability:** The core flow works by keyboard and gives text labels for status. **[ASSUMPTION]** The prototype supports a 1280 × 800 desktop viewport; a polished mobile layout is not a hackathon acceptance requirement.

## 8. Success Metrics

- **SM-1:** In a five-minute prototype walkthrough at 1280 × 800, a first-time target builder can assemble the sample Build, locate its Specification summary, and correctly explain one displayed incompatibility without facilitator help. Validates FR-1 through FR-4.
- **SM-2:** All supported Compatibility rules return the expected outcome for the validation fixtures used in the demo. Validates FR-2, FR-3, and FR-6.
- **SM-3:** The simulator preview shows the selected labeled wind preset and current Build facts, and clearly identifies the scene as illustrative. Validates FR-5.
- **SM-4:** A walkthrough visibly distinguishes straight calm flight, an angled slight-crosswind flight path, and a strong-wind path that drifts away and exits the scene, with travel pace reflecting the selected Build’s supported static thrust-to-weight estimate when available. Validates FR-5.
- **SM-5:** A walkthrough can load low, baseline, high, and unavailable-reference propulsion presets; their current synthetic facts and illustrative travel pace update accordingly, and unavailable estimates are disclosed. Validates FR-7.
- **SM-6:** The weak-range receiver profile displays its selected synthetic range and produces a visible signal-loss warning after simulated distance exceeds that range. Validates FR-7.
- **SM-C1:** The prototype marks no known-invalid or data-incomplete fixture as compatible. This guards against making the demo appear more capable than its Catalog supports. Validates FR-2 and FR-3.

### 8.1 Test Suite Readiness

- The local current-product requirement input defines observable coverage for the planner, all eleven synthetic compatibility fixtures, five synthetic flight profiles, and the three wind-response conditions. A Kane CLI-generated suite and run evidence are pending explicit authorization; no tests are represented as executed or verified by Kane CLI yet.
- The local source-comparison requirement input defines identity, field, unit, discrepancy, and evidence expectations. Suite generation and execution require approved source URLs and exact real-product mappings first.

## 9. Open Questions

- Which real Airframes and Components should populate the user-facing Catalog, and what manufacturer sources support their values? **Owner:** Product owner. **Revisit:** Before replacing the clearly labeled validation fixtures with real Catalog entries.

## 10. Assumptions Index

- §1 — The prototype targets fixed-wing airplanes.
- §2.2 — Alex is a desktop-browser hobby builder; the journey is inferred because no session narrative was provided.
- §4.1 and §6.1 — A curated Catalog is sufficient; initial roles are Airframe, motor, propeller, ESC, battery, servo, and receiver. Vendor integrations and user-authored Components are not required.
- §4.2 — Known limit violations are incompatible; missing data yields needs-check; physical fit runs only with dimensions; no borderline warning threshold is assumed; synthetic fixtures are demo-only.
- §4.2 — Overall Build state follows the precedence defined in FR-3.
- §4.4 and §4.5 — 3D trainer preview uses scripted visuals to demonstrate straight calm flight, angled crosswind flight, strong-wind drift, and differences among synthetic propulsion presets; it does not represent calculated aerodynamic behavior or safe flight conditions.
- §4.5 — Validation scenarios use synthetic values to exercise supported rules and are not manufacturer-verified.
- §5 and §6.2 — Validated flight simulation, flight-safety prediction, side-by-side comparison, aircraft design from scratch, flight-time prediction, inventory, pricing, purchasing, vendor integrations, accounts, collaboration, local/cloud saving, sharing, user-authored Components, and arbitrary Catalog import are outside this prototype.
- §7 — A 1280 × 800 desktop viewport and basic keyboard/status accessibility are assumed; a polished mobile layout is not required.
