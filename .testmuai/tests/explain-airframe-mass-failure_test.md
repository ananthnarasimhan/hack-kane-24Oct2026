---
assurance:
  id: t-38
  base: sha256:a013f618cfd66b855257d7f1a4487f9c2574267ad31dfcbcca1d4735314cff84
---
# Explain Airframe mass failure

> Load Airframe mass limit failure and inspect estimated mass against maximum.

## Step 1

At {{start_url}}, open the RC Airplane Build Planner's Build planner and its Try a demo compatibility configurations.

## Step 2 @verifies ac-96

Load the Airframe mass limit failure synthetic configuration and inspect its mass compatibility result, then assert the Airframe mass plus all selected Component masses exceeds the Airframe's published maximum and the result reports incompatible.
