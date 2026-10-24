---
assurance:
  id: t-45
  base: sha256:6a78048a4fe019dbf957c79922b7024f8c7f28f6e65acbbb4a982c745f29566f
---
# Refresh compatibility after replacing conflict propeller

> From the incompatible clearance configuration, change to a supported propeller and inspect refreshed compatibility feedback.

## Step 1

At {{start_url}}, open the RC Airplane Build Planner's Build planner and its Try a demo compatibility configurations.

## Step 2

Load the propeller clearance failure synthetic configuration on the Build planner.

## Step 3

In the Build's propeller selection, identify {{alternate_supported_propeller}} as the supported replacement for the conflicting propeller.

## Step 4 @verifies ac-108

Replace the selected propeller with {{alternate_supported_propeller}} on the current Build and inspect its compatibility feedback, then assert that feedback reflects the replacement rather than the prior propeller selection.
