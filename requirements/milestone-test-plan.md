# Kane CLI milestone test plan

This plan maps the requested Hack Day milestones to the existing requirement-linked tests in `.testmuai/tests/`. It does not mark any milestone complete; completion claims need run evidence.

## Milestone 1: The compatibility check is working

**What this proves:** the planner handles compatible, incompatible, incomplete, and needs-check builds; explains failures; and refreshes compatibility after build changes.

**Tests (5):**

- `explain-both-overvoltage-conflicts_test.md`
- `load-mismatch-fixture-and-inspect-planner-results_test.md`
- `load-missing-data-fixture-and-inspect-planner-results_test.md`
- `load-passing-fixture-and-inspect-planner-results_test.md`
- `show-missing-roles-without-a-flight-safe-claim_test.md`

Run selection: `kane-cli testrun run --match '\.testmuai/tests/(explain-both-overvoltage-conflicts|load-(mismatch|missing-data|passing)-fixture-and-inspect-planner-results|show-missing-roles-without-a-flight-safe-claim)_test\.md$' < /dev/null`

## Milestone 2: The simulation works as expected

**What this proves:** the preview reflects selected build facts, wind and propulsion presets, range behavior, navigation, responsive layout, fallback behavior, and the illustrative-only disclosures.

**Tests (5):**

- `show-straight-marked-flight-against-a-background-in-calm_test.md`
- `show-angled-aircraft-and-slightly-bent-path-in-slight_test.md`
- `show-strong-wind-drift-outside-the-marked-flight-area_test.md`
- `display-supported-balanced-propulsion-in-the-preview_test.md`
- `show-receiver-range-signal-loss-beyond-the-weak-profile_test.md`

Run selection: `kane-cli testrun run --match '\.testmuai/tests/(show-straight-marked-flight-against-a-background-in-calm|show-angled-aircraft-and-slightly-bent-path-in-slight|show-strong-wind-drift-outside-the-marked-flight-area|display-supported-balanced-propulsion-in-the-preview|show-receiver-range-signal-loss-beyond-the-weak-profile)_test\.md$' < /dev/null`

## Milestone 3: The cross-application check is working between our site and the external site

**What this proves:** the planner's mapped receiver identity and comparable fields agree with the exact manufacturer source, and ambiguous or discontinued mappings remain explicit rather than being treated as matches.

**Test (1):**

- `compare-ar410-specifications-while-retaining-manufacturer_test.md`

Run selection: `kane-cli testrun run --match '\.testmuai/tests/compare-ar410-specifications-while-retaining-manufacturer_test\.md$' < /dev/null`

## Evidence and status

- All three selections use existing designed tests; no test cases were hand-written or detached from their assurance links.
- The 11-test smoke selection is intentionally representative, not exhaustive: it covers key outcomes while leaving edge cases for a later pass.
- Run the milestones as three separate suites so each has its own pass/fail summary and evidence pack.
- Submit each milestone to the Hack Day tracker only after its suite has run and the run evidence is available. A passing suite supports a completion proposal; a failing suite should be reported as progress with the failure intact.
- Current shared-project coverage is 21.6%. The compatibility use-case (`uc-9`) and source-comparison use-case (`uc-2`) are currently failing; simulation use-cases (`uc-3`–`uc-6`) have not been run. No milestone is proven complete yet.
