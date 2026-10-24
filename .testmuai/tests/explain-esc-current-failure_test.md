---
assurance:
  id: t-35
  base: sha256:99b98c465c144743a7da031e66d7c1ee0a51147328338778c75e95f2ecfe8dc8
---
# Explain ESC current failure

> Load ESC current failure case and inspect reference current above ESC continuous rating.

## Step 1

At {{start_url}}, open the RC Airplane Build Planner's Build planner and its Try a demo compatibility configurations.

## Step 2 @verifies ac-93

Load the ESC current failure synthetic configuration and inspect the ESC current compatibility result, then assert it reports incompatible because the matching reference current exceeds the ESC continuous-current rating.
