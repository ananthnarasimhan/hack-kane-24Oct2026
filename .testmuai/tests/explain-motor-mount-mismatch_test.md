---
assurance:
  id: t-37
  base: sha256:f773e5dbfa8d56e607ad89149c6a07a8a2f16cd2a7dd89c2505d026d60aa83db
---
# Explain motor mount mismatch

> Load motor mount mismatch fixture and inspect physical-fit conflict.

## Step 1

At {{start_url}}, open the RC Airplane Build Planner's Build planner and its Try a demo compatibility configurations.

## Step 2 @verifies ac-98

Load the motor mount mismatch synthetic configuration and inspect its physical-fit result with the selected mount patterns, then assert the available patterns do not match and the result reports incompatible.
