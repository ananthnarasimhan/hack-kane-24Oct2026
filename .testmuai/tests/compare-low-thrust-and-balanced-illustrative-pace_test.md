---
assurance:
  id: t-17
  base: sha256:d1633df3153fe746aecf4725fade6a28c737f5a2d7915f484b5b3e18ed77d21e
---
# Compare low-thrust and balanced illustrative pace

> Select balanced then low-thrust with differing supported estimates, observing low-thrust build details and visibly distinguishable illustrative pace.

## Step 1

Open {{start_url}} in the browser and from the build workspace navigate to the separate aircraft preview page.

## Step 2

On the aircraft preview page, select the balanced synthetic propulsion preset and observe its displayed supported static thrust-to-weight estimate and its illustrative travel pace.

## Step 3

capture baseline: illustrative travel pace of the balanced synthetic propulsion preset while its supported static thrust-to-weight estimate is displayed

## Step 4 @verifies ac-42, ac-43, ac-44, ac-47

On the same preview page, select the low-thrust synthetic propulsion preset and inspect its component set, compatibility checks and build facts, then assert these reflect the newly selected build without leaving the page and the mock components are identified as synthetic.

## Step 5 @verifies ac-45, ac-46, ac-52

In the low-thrust preview, inspect its supported static thrust-to-weight estimate and observe the aircraft move, then assert the displayed estimate reflects the selected supported build, its illustrative pace reflects that estimate and, when the supported estimates differ, its pace is visibly distinguishable from the captured balanced pace.

## Step 6 @verifies ac-48

Review the low-thrust preview's propulsion presentation, then assert it does not claim its illustrative pace predicts real speed or climb.
