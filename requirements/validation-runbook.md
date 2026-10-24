# Planner Interaction and Receiver Data Validation Runbook

**Updated:** 2026-10-24  
**Application:** `http://localhost:5173`  
**Linked Test Manager project:** `oct24 hackathon` (`01M5QDEHX56962192A93SMH9GX`)

This runbook extends the existing requirements in [current-product.md](current-product.md) and the product identity/field checks in [receiver-product-comparison.md](receiver-product-comparison.md). It also records the latest official Spektrum source review. Kane CLI must generate the runnable `_test.md` files from these approved requirements; do not hand-write or edit those test cases.

## Existing smoke check

The project now contains `.testmuai/tests/planner-smoke_test.md`, with a passing one-step result in `.testmuai/tests/output-planner-smoke/Result.md`. That is a useful navigation smoke check, but it does not establish detailed interaction or receiver-data coverage.

Replay that check from the repository root:

```bash
KANE_CLI_USER_AGENT=codex kane-cli testrun run .testmuai/tests/planner-smoke_test.md --agent < /dev/null
```

## Expanded interaction evaluation

Have Kane CLI derive cases from the requirement files to cover these observable journeys:

1. **Build selection and feedback:** choose each component role; confirm the selected part, specification summary, compatibility result, compared values/units, and missing-input explanations update. Exercise the passing, incompatible, and needs-check fixtures and the named rule fixtures in `current-product.md`.
2. **Build-to-preview round trip:** load a build, open the separate preview, change wind, return to the planner, and reopen the preview. Confirm the build selections and wind condition are preserved.
3. **Wind interaction:** choose Calm (0 mph, N), Light breeze (8 mph, NW), Moderate breeze (16 mph, W), Strong breeze (25 mph, SW), and Very strong breeze (35 mph, E). Check the selected label and readout each time, plus the visual straight path, slight-crosswind bend, and strong-wind departure behaviors. Treat these strictly as scripted illustrations.
4. **Preset interaction:** load Low thrust, Balanced trainer, High thrust, No matching thrust reference, and Weak receiver range from both the planner controls and preview. Confirm the build facts and compatibility refresh; compare visible pace for supported thrust-to-weight values; confirm neutral motion and its explanation when the estimate is unavailable.
5. **Receiver-range interaction:** on Weak receiver range, observe the synthetic range and increasing distance, confirm the announced “Signal lost” state after the threshold is exceeded, then reload the profile and confirm the distance/error reset.
6. **Receiver picker and source links:** open the receiver picker by keyboard and pointer, inspect AR410, AR620, and AR631 identities and details, select each, and verify the selected receiver and manufacturer link update. Source-page checks must confirm exact item number before comparing specs.
7. **Current manufacturer data:** compare catalog and official page fields for model identity, channels, mass, band, modulation, input voltage, antenna, range label, telemetry, stabilization, and serial output where the field is published. Classify each field as matching, differing, unavailable on the source, unavailable in the catalog, or ambiguous. Report page conflicts as ambiguous; do not guess or overwrite catalog values.
8. **Responsive and fallback behavior:** check keyboard operation and readable controls at desktop and narrow viewport widths. With WebGL unavailable, confirm a readable fallback while build facts and wind controls remain available.
9. **Disclosure checks:** confirm synthetic demo data, illustrative wind/flight behavior, synthetic receiver-range behavior, and the no-flight-safety/no-real-radio-range disclaimers remain visible in the relevant views.

### Receiver source findings to use in the evaluation

The AR410 and AR620 pages still identify SPMAR410 and SPMAR620, with channel count, mass, 2.4 GHz band, 3.5–9 V input, internal antenna, and full-range status consistent with the catalog. The AR410 page's overview says DSMX/DSM2 compatible while its spec row says DSMX; classify that page-level modulation detail as ambiguous/incomplete. Both pages describe integrated flight-log / fly-by telemetry in narrative text while their product-spec row says `Flight Log Compatible: No`; preserve this as ambiguous until it is clear whether that spec field refers to external flight-log modules.

The [AR631 source page](https://www.spektrumrc.com/product/spektrum-ar631-dsmx-6-channel-as3x-and-safe-receiver/SPMAR631.html) marks SPMAR631 **Discontinued** and points to the [AR631+ successor](https://www.spektrumrc.com/product/spektrum-ar631-dsmx-6-channel-as3x-and-safe-receiver/SPM-1031.html), item number **SPM-1031**. The app still lists SPMAR631 and describes AS3X / SAFE. Treat this as an outdated availability/mapping finding. AR631+ is a different identity and must not be silently substituted into the current catalog entry.

The manufacturer pages do not state receiver range in meters. Only the app's demo receivers have synthetic meter values; do not represent them as manufacturer data.

## Kane CLI workflow and commands

Run commands from the repository root so the linked project and generated test files stay together. Every Kane CLI command is tagged with the `codex` runtime below. Commands that run browser tests end in `< /dev/null` so Kane CLI emits its machine-readable result stream and exits normally.

### 1. Check the shared project and current test inventory

```bash
KANE_CLI_USER_AGENT=codex kane-cli context list --mode agent
KANE_CLI_USER_AGENT=codex kane-cli context sessions --mode agent
```

The existing project has proposed use cases for current-product validation and product source comparison. Review their titles/scope and select only the ones intended for this work.

### 2. Add the updated receiver requirement to the shared project

The receiver-specific requirement is not yet in the shared project's source list. Ingest it once, then save the session ID reported by Kane CLI:

```bash
KANE_CLI_USER_AGENT=codex kane-cli context ingest requirements/receiver-product-comparison.md --mode agent
KANE_CLI_USER_AGENT=codex kane-cli context sessions save SESSION_ID --yes --mode agent
KANE_CLI_USER_AGENT=codex kane-cli context list --mode agent
```

Replace `SESSION_ID` with the returned value. Review the proposed use cases before designing any tests. Use the exact fresh use-case ID reported by `context list` in the next command.

### 3. Design requirement-linked interaction tests

After approving the relevant use cases and selecting the desired scope, design the current-product and receiver-source cases separately. Replace `USE_CASE_ID` with each selected ID; design does not execute browser tests.

```bash
KANE_CLI_USER_AGENT=codex kane-cli design tests --use-case USE_CASE_ID --mode agent --allow-unreviewed
KANE_CLI_USER_AGENT=codex kane-cli context sessions save SESSION_ID --yes --mode agent
```

Review each design session before saving. The save response names the generated test files and any missing variables/start pages. Keep the generated tests directly in `.testmuai/tests/` so runs remain attached to the shared project and count toward coverage.

### 4. Run the generated tests and calculate coverage

Once Kane CLI has generated and saved the interaction and receiver tests directly in `.testmuai/tests/`, run every saved test in one suite and then calculate shared-project coverage:

```bash
KANE_CLI_USER_AGENT=codex kane-cli testrun run .testmuai/tests/*_test.md --agent < /dev/null
KANE_CLI_USER_AGENT=codex kane-cli cover --mode agent
```

The wildcard includes every root-level saved `_test.md` file, including the smoke check. At the moment, only `planner-smoke_test.md` exists, so this command alone will not cover all the interaction scenarios; generate and save the requirement-linked tests in steps 2–3 first. Review the evidence and update [validation-report.md](../validation-report.md) with the run totals, failed steps, coverage, receiver field discrepancies, and source URLs.

## Cost and safety notes

- Ingesting a document is approximately 5 Kane credits; designing one use case is approximately 10–15 credits.
- The first browser run of each generated test is approximately 30–85 credits per test; later unchanged replays are usually a few credits.
- A receiver with no published meter range stays “unavailable” on the source side. The synthetic receiver-range demo must remain labeled synthetic.
- Do not overwrite source-linked catalog values automatically. Any AR631-to-AR631+ catalog change needs a human product-identity decision.
