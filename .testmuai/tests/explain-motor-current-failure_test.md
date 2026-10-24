---
assurance:
  id: t-34
  base: sha256:4a47f543a9aa1c0429a9d047ed8e4cadf79ffe0f3b7aff111cdd78ca8fa99e76
---
# Explain motor current failure

> Load motor current failure case and inspect reference current above motor maximum.

## Step 1

At {{start_url}}, open the RC Airplane Build Planner's Build planner and its Try a demo compatibility configurations.

## Step 2 @verifies ac-92

Load the motor current failure synthetic configuration and inspect the motor current compatibility result, then assert it reports incompatible because the matching reference current exceeds the motor maximum current.
