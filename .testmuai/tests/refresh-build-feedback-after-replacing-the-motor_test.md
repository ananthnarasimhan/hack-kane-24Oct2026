---
assurance:
  id: t-30
  base: sha256:46e90eeac82f794c35c34a1fb86411af5af82f0fa05f46c4b6e8c6443d4690bf
---
# Refresh build feedback after replacing the motor

> On a filled current Build, replace the selected motor with another catalog choice and inspect refreshed feedback without starting a second Build.

## Step 1

At {{start_url}}, on the RC Airplane Build Planner's build page, load the named Passing setup from the Try a demo controls to establish a filled current Build.

## Step 2 @verifies ac-78

On the same build page, replace its motor with {{alternate_supported_motor}} from the curated catalog, then assert the current Build's feedback reflects the newly selected motor.

## Step 3 @verifies ac-79

On the current Build, inspect the motor selection and the other required role selections after the replacement, then assert the motor role remains editable within the same Build.
