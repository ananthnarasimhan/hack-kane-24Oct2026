---
assurance:
  id: t-4
  base: sha256:b0dc5be23cd118d13c6633970ea330031372be37d59abaf0a8c7fd660e7519b5
---
# Compare AR620 specifications while retaining telemetry ambiguity

> Select AR620, confirm SPMAR620, compare published receiver details, and leave conflicting manufacturer telemetry wording ambiguous.

## Step 1

Open {{start_url}} in the browser and reach the planner's receiver component picker.

## Step 2 @verifies ac-8

Select Spektrum AR620 DSMX 6-Channel Sport Receiver (SPMAR620) in the receiver picker, then assert its selected component facts identify AR620 / SPMAR620.

## Step 3 @verifies ac-9

Inspect the selected receiver's manufacturer product link, then assert it points to https://www.spektrumrc.com/product/spektrum-ar620-dsmx-6-channel-sport-receiver/SPMAR620.html.

## Step 4 @verifies ac-3

Open https://www.spektrumrc.com/product/spektrum-ar620-dsmx-6-channel-sport-receiver/SPMAR620.html and compare the visible model title and item number with the selected planner entry before comparing specifications, then assert exact AR620 / SPMAR620 identity was confirmed.

## Step 5 @verifies ac-6

Compare the AR620 page and planner entry for model, 6 channels, 8 g weight, 2.4 GHz band, DSMX modulation with DSM2 compatibility, 3.5–9 V input, integrated fly-by telemetry, internal antenna and full-range description, recording a supported classification for each field, then assert every compared field is classified as matching, differing, unavailable on source, unavailable in catalog, or ambiguous.

## Step 6 @verifies ac-14

Compare the AR620 page's integrated flight-log / fly-by telemetry narrative with its 'Flight Log Compatible: No' specification row, then assert telemetry is classified as ambiguous rather than a pass or failure.

## Step 7 @verifies ac-10

Examine the manufacturer's radio-range information without using any demo receiver's synthetic range as source data, then assert a synthetic range in meters is not presented as manufacturer radio range.

## Step 8 @verifies ac-5

Complete the AR620 browser comparison without catalog edits and inspect browser network activity caused by this comparison, then assert no catalog update was caused by the comparison.
