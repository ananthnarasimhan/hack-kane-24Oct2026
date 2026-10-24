---
assurance:
  id: t-2
  base: sha256:cefe02c7b0fd1b0273b039870d21324cf18af17bf6c791e0f3ac62b968931eb1
---
# Refuse AR631+ identity as an AR631 field match

> Compare catalog SPMAR631 to the documented AR631+ SPM-1031 page and refuse to classify the successor as the old identity's specification pass.

## Step 1

Open {{start_url}} in the browser and reach the planner's receiver component picker.

## Step 2 @verifies ac-8

Select Spektrum AR631 DSMX 6-Channel AS3X & SAFE Receiver (SPMAR631) in the receiver picker, then assert the selected component facts identify AR631 / SPMAR631.

## Step 3 @verifies ac-9

Inspect the selected receiver's manufacturer product link, then assert it remains https://www.spektrumrc.com/product/spektrum-ar631-dsmx-6-channel-as3x-and-safe-receiver/SPMAR631.html.

## Step 4 @verifies ac-3

Open the documented successor https://www.spektrumrc.com/product/spektrum-ar631-dsmx-6-channel-as3x-and-safe-receiver/SPM-1031.html and compare its visible model and item number to catalog AR631 / SPMAR631 before attempting any specification match, then assert the exact identity does not match.

## Step 5 @verifies ac-12

Record the outcome of comparing catalog AR631 / SPMAR631 with the AR631+ / SPM-1031 source page, then assert AR631+ / SPM-1031 is not classified as a specification match for AR631 / SPMAR631.

## Step 6 @verifies ac-5

Finish the rejected-identity browser comparison without editing the catalog and inspect network activity caused by the comparison, then assert no catalog update was caused by the comparison.
