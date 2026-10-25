# Kane CLI milestone test plan

This plan maps the requested Hack Day milestones to the existing requirement-linked tests in `.testmuai/tests/`. It does not mark any milestone complete; completion claims need run evidence.

## Milestone 1: The compatibility check is working

**What this checks:** a passing supported build, a named incompatible build, and clear reporting for two overvoltage conflicts.

**Tests (3):**

- `explain-both-overvoltage-conflicts_test.md`
- `load-mismatch-fixture-and-inspect-planner-results_test.md`
- `load-passing-fixture-and-inspect-planner-results_test.md`

Run selection: `kane-cli testrun run --match '\.testmuai/tests/(explain-both-overvoltage-conflicts|load-mismatch-fixture-and-inspect-planner-results|load-passing-fixture-and-inspect-planner-results)_test\.md$' < /dev/null`

## Milestone 2: The simulation works as expected

**What this checks:** calm straight flight, a slight-wind angled path, and strong-wind drift outside the marked area.

**Tests (3):**

- `show-straight-marked-flight-against-a-background-in-calm_test.md`
- `show-angled-aircraft-and-slightly-bent-path-in-slight_test.md`
- `show-strong-wind-drift-outside-the-marked-flight-area_test.md`

Run selection: `kane-cli testrun run --match '\.testmuai/tests/(show-straight-marked-flight-against-a-background-in-calm|show-angled-aircraft-and-slightly-bent-path-in-slight|show-strong-wind-drift-outside-the-marked-flight-area)_test\.md$' < /dev/null`

## Milestone 3: The cross-application check is working between our site and the external site

**What this checks:** the selected AR410 receiver identity and specifications against the manufacturer's external product page, while keeping ambiguous fields explicit.

**Test (1):**

- `compare-ar410-specifications-while-retaining-manufacturer_test.md`

Run selection: `kane-cli testrun run --match '\.testmuai/tests/compare-ar410-specifications-while-retaining-manufacturer_test\.md$' < /dev/null`

## Evidence and status

- All three selections use existing designed tests; no test cases were hand-written or detached from their assurance links.
- The 7-test selection is intentionally representative, not exhaustive: it covers key outcomes while leaving edge cases for a later pass.
- Run the milestones as three separate suites so each has its own pass/fail summary and evidence pack.
- These suites have not been run as part of this setup, so no milestone is claimed complete.
- After each run, use its evidence when proposing progress in the Hack Day tracker; report failures as progress with the failure intact.
