---
assurance:
  id: t-39
  base: sha256:2e78128080473a869adda29f2b384799be28da1bc13d9aeb78adebcbd64812fa
---
# Explain insufficient servo count

> Load insufficient servo count case and inspect control count versus Airframe requirement.

## Step 1

At {{start_url}}, open the RC Airplane Build Planner's Build planner and its Try a demo compatibility configurations.

## Step 2 @verifies ac-101

Load the insufficient servo count synthetic configuration and inspect its control compatibility result, then assert selected servo count is below the Airframe requirement and the result reports incompatible.
