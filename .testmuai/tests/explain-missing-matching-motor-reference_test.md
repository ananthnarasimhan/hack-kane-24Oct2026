---
assurance:
  id: t-43
  base: sha256:c20c58df9bf45cd9aba418a8ed231ab5e2854afadf5621a030a4995f418f7002
---
# Explain missing matching motor reference

> Use the named missing-reference propulsion profile and inspect needs-check for current evaluation.

## Step 1

At {{start_url}}, open the RC Airplane Build Planner's Build planner and its Try a demo profiles.

## Step 2 @verifies ac-91

Load the named missing-thrust-reference propulsion profile with no matching motor/propeller reference point at the selected battery nominal voltage and inspect the current compatibility result, then assert it reads needs-check.

## Step 3 @verifies ac-86

Inspect the overall Build compatibility state for this filled configuration without a known conflict, then assert it reads needs-check.
