---
assurance:
  id: t-40
  base: sha256:be12374af57ea1628cf7677e9b39e27ac016eda4ab1eb8c260c94038e9134816
---
# Explain insufficient receiver channels

> Load insufficient receiver channels case and inspect channel count versus Airframe requirement.

## Step 1

At {{start_url}}, open the RC Airplane Build Planner's Build planner and its Try a demo compatibility configurations.

## Step 2 @verifies ac-102

Load the insufficient receiver channels synthetic configuration and inspect its control compatibility result, then assert selected receiver channel count is below the Airframe requirement and the result reports incompatible.
