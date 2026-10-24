---
assurance:
  id: t-12
  base: sha256:ecdf2a5a73dff0594225c8c00896693b8f699144031e1235ce942aa42198eb60
---
# Keep build controls usable after unsupported rendering change

> When an illustrative rendering change is unsupported, existing build controls remain usable.

## Step 1

At {{start_url}}, open the aircraft simulator from the build planner in a browser context that can reproduce an unsupported rendering change.

## Step 2 @verifies ac-37

In the simulator, attempt a wind rendering change that this browser context cannot support, then use the build controls to change the selected build and assert the build controls remain usable after that unsupported rendering change.
