---
assurance:
  id: t-22
  base: sha256:687bc484eef139a96d9788c9581ad72a04e6264b9e2e6f04f100b5877680977c
---
# Reset and repeat receiver-range signal loss after demo reload

> After a receiver-range error, load a demo profile again and observe reset accumulated distance, allowing the same range demonstration to be repeated.

## Step 1

At {{start_url}}, open the aircraft build planner and reach the separate aircraft preview page.

## Step 2 @verifies ac-54, ac-56, ac-57

Load the weak-range receiver demo profile from the available demo configurations; review the preview before crossing its range, then assert its receiver range is displayed in meters and the receiver-range response is identified as synthetic and not a prediction of actual radio coverage.

## Step 3

capture baseline: initial accumulated illustrative flight distance for the weak-range receiver demo profile immediately after loading it

## Step 4 @verifies ac-55

Let the illustrative flight run until its accumulated distance exceeds the displayed weak receiver range and the receiver-range error has occurred, then assert accumulated illustrative flight distance remains visible.

## Step 5

capture baseline: post-error accumulated illustrative flight distance before reloading the demo profile

## Step 6 @verifies ac-60

Reload that same weak-range receiver demo profile after the error and inspect the preview's accumulated distance, then assert it has reset to the observed initial accumulated illustrative distance for that profile.

## Step 7 @verifies ac-61

Let the reloaded weak-range receiver demo run beyond its displayed range again, then assert the receiver-range signal-loss demonstration repeats.
