---
assurance:
  id: t-13
  base: sha256:f6626e3034813ee9859648c876e66dd9f43972a3bfac679b423ea472bd5faa8a
---
# Show angled aircraft and slightly bent path in slight crosswind

> A slight crosswind visibly angles the aircraft and bends its path slightly.

## Step 1

At {{start_url}}, open the build planner's separate aircraft simulator page with a selected build and find the wind controls.

## Step 2 @verifies ac-38, ac-39, ac-29, ac-30, ac-31, ac-32, ac-33, ac-34

In the simulator, select the slight-crosswind setting and observe the illustrative aircraft travel, then assert it flies at an angle and its path bends slightly, the selected condition is labeled, the wind indicator and scene respond to that condition, selected build facts remain visible, and the response is disclosed as scripted illustration rather than calculated physics or prediction of actual flight behavior.
