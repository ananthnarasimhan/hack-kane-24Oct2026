---
assurance:
  id: t-20
  base: sha256:20ce5a1d06910cf4a47fded00a06db4e406b946c177edfae382c78c8c7dd6de9
---
# Display supported balanced propulsion in the preview

> Select the named balanced synthetic propulsion preset and observe updated components, compatibility, build facts, and its supported estimate and illustrative motion.

## Step 1

Open {{start_url}} in the browser and from the build workspace navigate to the separate aircraft preview page.

## Step 2 @verifies ac-42, ac-43, ac-44, ac-47

On the preview page, select the balanced synthetic propulsion preset and inspect its selected components, compatibility checks and build facts, then assert those reflect the selected build without leaving the page and mock components are identified as synthetic.

## Step 3 @verifies ac-45, ac-46

Run the balanced-build preview and inspect its supported static thrust-to-weight estimate and illustrative movement, then assert the displayed estimate reflects this build and the illustrative pace reflects the supported estimate.

## Step 4 @verifies ac-48

Review the balanced preview's propulsion description, then assert it does not claim that the illustrative pace predicts real speed or climb.
