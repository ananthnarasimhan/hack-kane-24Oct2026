---
assurance:
  id: t-29
  base: sha256:35ee16e295fd455bcf7c6dc73d5a1d76bd88c002cd28bf8c03a3fa877fe1fc74
---
# Fill required roles from role-identified catalog entries

> Choose an Airframe and fill the six component roles while inspecting catalog identity, specifications and current build selections.

## Step 1 @verifies ac-82

At {{start_url}}, on the RC Airplane Build Planner's build page, inspect the curated catalog's component choices, then assert it includes examples for Airframe, motor, propeller, ESC, battery, servo, and receiver.

## Step 2 @verifies ac-76

On the build page, select an Airframe and review the still-unfilled required roles, then assert each empty required role is identified.

## Step 3 @verifies ac-80

Using the curated catalog on the build page, select components for the motor, propeller, ESC, battery, servo, and receiver roles, then assert every catalog entry inspected identifies its role.

## Step 4 @verifies ac-81

In the build page's catalog, inspect the specifications for the selected Airframe and components used by supported compatibility rules or build calculations, then assert every inspected entry displays its rule- or calculation-relevant specifications.
