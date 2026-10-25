---
assurance:
  id: t-3
  base: sha256:50a10dce1585455c7e8adc7662d3f6edc535dfa5adea676a4f3d8d38a1b61b9f
variables:
  start_url:
    value: https://ananthnarasimhan.github.io/hack-kane-24Oct2026/
    secret: false
---
# Compare AR410 specifications while retaining manufacturer ambiguity

> Select AR410, confirm SPMAR410, compare published receiver details, and leave conflicting manufacturer modulation and telemetry wording ambiguous.

## Step 1

Open {{start_url}} in the browser and reach the planner's receiver component picker.

## Step 2 @verifies ac-8

Select Spektrum AR410 DSMX 4-Channel Sport Receiver (SPMAR410) in the receiver picker, then assert its selected component facts identify AR410 / SPMAR410.

## Step 3 @verifies ac-9

Inspect the selected receiver's manufacturer product link, then assert it points to https://www.spektrumrc.com/product/spektrum-ar410-dsmx-4-channel-sport-receiver/SPMAR410.html.

## Step 4 @verifies ac-3

Open https://www.spektrumrc.com/product/spektrum-ar410-dsmx-4-channel-sport-receiver/SPMAR410.html and compare the visible model title and item number to the selected planner entry before comparing specifications, then assert exact AR410 / SPMAR410 identity was confirmed.

## Step 5 @verifies ac-6

Compare the AR410 page and planner entry for model, 4 channels, 7 g weight, 2.4 GHz band, DSMX modulation, 3.5–9 V input, integrated fly-by telemetry, internal antenna and full-range description, recording a supported classification for each field, then assert every compared field is classified as matching, differing, unavailable on source, unavailable in catalog, or ambiguous.

## Step 6 @verifies ac-13

Compare the manufacturer's AR410 DSMX/DSM2 overview wording with its DSMX-only product-spec row and the planner's DSMX value, then assert modulation is classified as ambiguous rather than a pass or failure.

## Step 7 @verifies ac-10

Examine the manufacturer's radio-range information without using any demo receiver's synthetic range as source data, then assert a synthetic range in meters is not presented as manufacturer radio range.

## Step 8 @verifies ac-5

Complete the AR410 browser comparison without catalog edits and inspect browser network activity caused by this comparison, then assert no catalog update was caused by the comparison.
