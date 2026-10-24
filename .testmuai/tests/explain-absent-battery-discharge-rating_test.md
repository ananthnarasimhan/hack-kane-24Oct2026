---
assurance:
  id: t-41
  base: sha256:fd243bef11468fcf89f36e924d07cc7b1b2f963e81d7eb094b8229bf991c700f
---
# Explain absent battery discharge rating

> Load missing battery discharge rating case and inspect needs-check and identified missing input.

## Step 1

At {{start_url}}, open the RC Airplane Build Planner's Build planner and its Try a demo compatibility configurations.

## Step 2 @verifies ac-95

Load the missing battery discharge rating synthetic configuration and inspect its current compatibility result, then assert the missing battery continuous-discharge rating produces needs-check.

## Step 3 @verifies ac-86

Review the overall status of this filled Build without a known conflict, then assert it reads needs-check rather than compatible.
