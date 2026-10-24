---
assurance:
  id: t-33
  base: sha256:79b7bd8188f62553e8414fa0ad52ddc58728050989f4c03bc01d6b7b6d1f2a2a
---
# Explain insufficient battery discharge

> Load battery discharge failure case and inspect battery capacity × C rating versus reference current.

## Step 1

At {{start_url}}, open the RC Airplane Build Planner's Build planner and its Try a demo compatibility configurations.

## Step 2 @verifies ac-94

Load the battery discharge failure synthetic configuration and inspect its current compatibility result, then assert it reports incompatible because battery capacity in Ah multiplied by continuous C rating is below the motor/propeller reference current.
