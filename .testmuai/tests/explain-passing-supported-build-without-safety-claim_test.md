---
assurance:
  id: t-44
  base: sha256:e6ca6564872404c0d910a185a4230ab87c866154e124e6a907e3bdfc2add070c
---
# Explain passing supported build without safety claim

> Load passing setup and inspect overall supported-check status and rule explanations without flight-safety claims.

## Step 1

At {{start_url}}, open the RC Airplane Build Planner's Build planner and its Try a demo compatibility configurations.

## Step 2 @verifies ac-87

Load the passing setup synthetic configuration and review its overall status with all required roles filled, then assert it reads compatible because the supported checks pass.

## Step 3 @verifies ac-88

Inspect the description of the compatible status on the Build planner, then assert it does not claim the Build is safe or certified to fly.
