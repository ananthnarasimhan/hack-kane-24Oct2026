# Spektrum receiver product comparison suite

## Suite purpose

Track a Kane CLI browser suite that compares receiver details shown in the planner's receiver picker with the corresponding official Spektrum product page. The test should use the exact product model and manufacturer item number shown below, then compare values exposed on both pages. Report differences and unavailable fields for human review; do not update the catalog from browser observations.

This Markdown file records the suite requirement and source baseline. Runnable Kane CLI tests are managed through Kane CLI and should not be edited by hand.

## Products and source baselines

The source pages were rechecked on 2026-10-24. Descriptions are concise summaries of the manufacturer's overview. Availability and model identity are tracked separately from field-level specification matches.

### AR410 — `four-channel-receiver`

- Product: Spektrum AR410 DSMX 4-Channel Sport Receiver
- Manufacturer item number: `SPMAR410`
- Source: [Spektrum AR410 product page](https://www.spektrumrc.com/product/spektrum-ar410-dsmx-4-channel-sport-receiver/SPMAR410.html)
- Summary: Full-range sport air receiver with an internal antenna, integrated fly-by telemetry, and a bind button.
- Compare: 4 channels; 7 g; 2.4 GHz band; DSMX modulation; input voltage 3.5–9 V; integrated fly-by telemetry; internal antenna; full range.

### AR620 — `spektrum-ar620`

- Product: Spektrum AR620 DSMX 6-Channel Sport Receiver
- Manufacturer item number: `SPMAR620`
- Source: [Spektrum AR620 product page](https://www.spektrumrc.com/product/spektrum-ar620-dsmx-6-channel-sport-receiver/SPMAR620.html)
- Summary: Full-range sport air receiver with an internal antenna and integrated receiver-voltage and flight-log telemetry.
- Compare: 6 channels; 8 g; 2.4 GHz band; DSMX modulation with DSM2 compatibility; input voltage 3.5–9 V; integrated fly-by telemetry; internal antenna; full range.

### AR631 — `spektrum-ar631`

- Product: Spektrum AR631 DSMX 6-Channel AS3X & SAFE Receiver
- Manufacturer item number: `SPMAR631`
- Source: [Spektrum AR631 product page](https://www.spektrumrc.com/product/spektrum-ar631-dsmx-6-channel-as3x-and-safe-receiver/SPMAR631.html)
- Summary: Full-range airplane and sailplane receiver with AS3X and SAFE stabilization, Smart telemetry support, and SRXL2 serial output.
- Compare: 6 channels; 8 g; 2.4 GHz band; DSMX modulation; input voltage 3.5–9 V; Smart / fly-by telemetry; AS3X / SAFE stabilization; SRXL2 serial output; full range.

## Current source changes found on 2026-10-24

- The AR410 and AR620 official pages still identify their listed products as SPMAR410 and SPMAR620. Their channel counts, weights, 2.4 GHz band, 3.5–9 V input range, internal antenna, and full-range status match the catalog values. The AR410 page's overview says DSMX/DSM2 compatible while its product-spec row says DSMX; the catalog currently shows DSMX only. Both pages describe integrated flight-log / fly-by telemetry in narrative text while the product-spec row says `Flight Log Compatible: No`; do not interpret that ambiguous wording as a data pass or failure without clarifying whether the field refers to external flight-log modules. Record these page-level conflicts as ambiguous/incomplete.
- The AR631 page identifies SPMAR631 as **Discontinued** and points to the current **AR631+** product, item number **SPM-1031**: [Spektrum AR631+ product page](https://www.spektrumrc.com/product/spektrum-ar631-dsmx-6-channel-as3x-and-safe-receiver/SPM-1031.html). The AR631+ page lists 6 channels, 8 g, 2.4 GHz, 3.5–9 V input, DSMX with DSM2 backwards compatibility, a 229 mm antenna, full range, fly-by telemetry, SRXL2, and AS3X+ / SAFE. The catalog's existing AR631 row is still mapped to the discontinued SPMAR631 page and describes AS3X / SAFE rather than AS3X+ / SAFE.
- Treat AR631 and AR631+ as different product identities. The current catalog's AR631 row must be reported as a stale/discontinued mapping. Do not rewrite it as AR631+ or copy successor values into it; a successor catalog entry requires its own human-reviewed identity, item number, source URL, and verification date.
- None of these product pages publishes an actual receiver range in meters. The planner's synthetic range values belong only to demo receivers; never compare them to, or imply them as, manufacturer radio-range measurements.

## Browser comparison behavior

1. Open the official source page and confirm the page title and item number match the expected model above. A different model or item number is an identity mismatch, not a specification pass.
2. Open the planner's component picker and inspect each mapped receiver entry, including its product-page purchase link. The selected receiver card also exposes that link.
3. Compare the product name/model number, channel count, weight, band, modulation, input-voltage range, and any listed model-specific features against the manufacturer page.
4. For every field, report matching, differing, missing from source, missing from catalog, or ambiguous. Include both displayed values and units for differences.
5. Treat a blocked or incomplete source page as unverified. Do not infer values from images or from another receiver model.

## Interaction checks for the receiver suite

The generated browser suite should open the receiver picker, inspect all three mapped manufacturer entries, select each entry, and confirm the selected component facts and manufacturer source link update. For each entry it should verify exact model title and item number before comparing fields. It should classify fields as matching, differing, unavailable on source, unavailable in catalog, or ambiguous. The AR631 check should explicitly report discontinued status and identify AR631+ / SPM-1031 as a separate successor, not as a match for the old catalog identity. A blocked page or ambiguous manufacturer wording remains unverified.

## Suite tracking

- Scope: three Spektrum receiver entries listed above.
- Source type: manufacturer product pages.
- Requirement status: updated with 2026-10-24 source availability and successor findings; ready for Kane CLI ingestion/design.
- Runnable test status: not generated or changed in this update.
- Last source review: 2026-10-24.
- Future additions: add a catalog ID, exact model/item number, approved manufacturer URL, and source baselines here before adding a receiver to the comparison suite.
