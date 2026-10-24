---
assurance:
  id: t-36
  base: sha256:d6cacfdad5ccbff6e704acd9f09bbe8bf4a649b8d0054f4aad76a29f6539968a
---
# Explain propeller clearance conflict

> Load propeller clearance failure and inspect limit, selections, incompatible overall status, and explanation.

## Step 1

At {{start_url}}, open the RC Airplane Build Planner's Build planner and its Try a demo compatibility configurations.

## Step 2 @verifies ac-99

Load the propeller clearance failure synthetic configuration and inspect the physical-fit result, then assert it reports incompatible because propeller diameter exceeds the selected Airframe's published clearance limit.

## Step 3 @verifies ac-103, ac-104, ac-105, ac-106, ac-107

Inspect the displayed compatibility outcomes for this Build, then assert each result names its rule, relevant selected values and applicable limit or missing input, every status has a textual label, and the clearance conflict identifies at least one Component selection the builder can change.
