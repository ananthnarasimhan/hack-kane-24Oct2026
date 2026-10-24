---
assurance:
  id: t-42
  base: sha256:7d939c595ed044ae370c7056ae27b69db8b3f398f89800bf85d57b2040b1f1e9
---
# Explain incomplete build with an empty role

> On a selected Airframe leave a required role unfilled and inspect incomplete overall state.

## Step 1

At {{start_url}}, open the RC Airplane Build Planner's Build planner.

## Step 2 @verifies ac-84

Select an Airframe and keep one of its required Component roles empty while reviewing the overall Build compatibility status, then assert the status is incomplete.
