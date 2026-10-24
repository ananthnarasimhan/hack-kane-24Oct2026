# Compare catalog products with source websites

Create requirement-linked Kane CLI browser suites for comparing a product shown in the planner's catalog with its approved source product page. The suites are intended for catalog entries with manufacturer source mappings. Most planner entries remain synthetic demo parts and must not be reported as source-verified. The receiver comparison suite and its initial Spektrum source mappings are tracked in [receiver-product-comparison.md](receiver-product-comparison.md).

## Comparison requirements

- Start from a product entry that has an approved source URL and an exact manufacturer model or SKU mapping. Confirm the source page identifies the same product and variant before comparing specifications. A family-level page or visually similar product is not sufficient evidence of an exact match.
- Compare only fields that exist on both the planner catalog entry and its approved source page. Preserve units and normalize units only when the conversion is unambiguous.
- Check role-specific specifications used by the planner: motor maximum input voltage, maximum current, mount pattern, and motor reference data; propeller diameter; ESC maximum input voltage and continuous current; battery nominal and full-charge voltage, capacity, and continuous discharge rating; servo count; receiver channel count; and airframe mass, maximum mass, wingspan, wing area, propeller clearance, motor mount, and required control counts.
- Report each compared field as matching, differing, unavailable on the source, unavailable in the catalog, or ambiguous. Include the exact source page and the source label/value/unit needed to review the discrepancy.
- Treat a different model, SKU, revision, or product variant as a product identity mismatch. Do not use a different variant's specifications as a match.
- Do not infer missing specifications from images, marketing descriptions, or similar products. Do not turn an unavailable or ambiguous value into a pass.
- Flag every confirmed difference for human review. Never automatically overwrite planner catalog data from a page observation. Keep source evidence and the proposed correction reviewable before any data change.
- If a source page cannot be reached, is blocked, or does not expose the needed value, report that field as unverified rather than passing it.

## Required inputs before generation or execution

For each real product to compare, provide the catalog product ID, catalog role and values, manufacturer, exact model/SKU/variant, approved source URL, and the fields to validate. The receiver suite has its initial mappings and field expectations recorded in `receiver-product-comparison.md`. The source set should prefer manufacturer product pages or manufacturer manuals. A retailer page may be used only when explicitly approved and must be labeled as a retailer source.

The broader Catalog remains mixed: synthetic entries are demonstration fixtures, while individual entries with a manufacturer, exact model number, source URL, and source verification date may be checked against that source. Do not treat absence of a mapping as permission to guess a source.

## Kane CLI authoring boundary

Use this file and the receiver-specific requirement as inputs when a source comparison suite is created or maintained. Kane CLI should generate or update requirement-linked runnable `_test.md` tests; do not hand-author runnable cases. Keep source mappings and suite status in Markdown. A discovered mismatch should be reported for human review; it must not automatically overwrite the catalog.
