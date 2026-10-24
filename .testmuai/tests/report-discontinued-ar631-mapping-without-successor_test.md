---
assurance:
  id: t-1
  base: sha256:a842f867f5d6a2d9de607bcb31f6d7619c37a9356cf27578ce96ed61775d1b83
---
# Report discontinued AR631 mapping without successor substitution

> Select catalog AR631, check SPMAR631 and its source page, report the mapping as discontinued without substituting successor AR631+.

## Step 1

Open {{start_url}} in the browser and reach the planner's receiver component picker.

## Step 2 @verifies ac-8

In the planner receiver picker, select Spektrum AR631 DSMX 6-Channel AS3X & SAFE Receiver (SPMAR631), then assert the selected receiver facts identify that model and item number.

## Step 3 @verifies ac-9

Inspect the selected receiver's manufacturer product link, then assert it points to https://www.spektrumrc.com/product/spektrum-ar631-dsmx-6-channel-as3x-and-safe-receiver/SPMAR631.html.

## Step 4 @verifies ac-3

Open https://www.spektrumrc.com/product/spektrum-ar631-dsmx-6-channel-as3x-and-safe-receiver/SPMAR631.html and compare its visible product title and item number with the selected planner entry before comparing fields, then assert the SPMAR631 model and item number were confirmed as the same identity.

## Step 5 @verifies ac-6

On the SPMAR631 manufacturer page and the planner's AR631 receiver entry, compare model, 6 channels, 8 g weight, 2.4 GHz band, DSMX modulation, 3.5–9 V input, Smart / fly-by telemetry, AS3X / SAFE, SRXL2 and full-range descriptions; record each field as matching, differing, unavailable on source, unavailable in catalog, or ambiguous from its displayed evidence, then assert every compared field has one of those classifications.

## Step 6 @verifies ac-11

Review the SPMAR631 page's discontinued status and its AR631+ successor reference, and record the catalog mapping's outcome, then assert the existing SPMAR631 mapping is reported as stale/discontinued rather than replaced by SPM-1031.

## Step 7 @verifies ac-10

Review the manufacturer's AR631 range evidence separately from any planner demo-receiver range, then assert no demo synthetic range in meters is presented as a manufacturer radio-range measurement.

## Step 8 @verifies ac-5

Complete this browser-only comparison without changing catalog data and inspect browser network activity generated during the comparison, then assert no catalog update was caused by the comparison.
