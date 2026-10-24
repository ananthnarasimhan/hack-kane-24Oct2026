---
assurance:
  id: t-32
  base: sha256:a8e206b1b19be860bc2cd082dbdb52b8f7cf895b7ef1422f5a201d94e41800dc
---
# Explain both overvoltage conflicts

> Load the high battery voltage synthetic case and inspect the motor and ESC voltage conflicts and overall result.

## Step 1

At {{start_url}}, open the RC Airplane Build Planner's Build planner and its Try a demo compatibility configurations.

## Step 2 @verifies ac-89

Load the high battery voltage synthetic configuration and inspect its motor voltage compatibility result, then assert it reports incompatible because battery full-charge voltage exceeds the selected motor's maximum input voltage.

## Step 3 @verifies ac-90

In that Build's compatibility results inspect the ESC voltage comparison, then assert it reports incompatible because battery full-charge voltage exceeds the selected ESC's maximum input voltage.
