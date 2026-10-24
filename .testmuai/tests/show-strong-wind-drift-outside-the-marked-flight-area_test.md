---
assurance:
  id: t-11
  base: sha256:a2f1d6ba260193f58c611f0237122d8bf935d6ce4487176cd49cf70b77a716fd
---
# Show strong-wind drift outside the marked flight area

> A strong-wind setting visibly drifts the aircraft from the marked path and out of the visible flight area, without implying actual flight behavior.

## Step 1

At {{start_url}}, open the build planner's separate aircraft simulator page with a selected build and locate its wind choices.

## Step 2 @verifies ac-35, ac-36, ac-29, ac-30, ac-31, ac-32, ac-33, ac-34

In the simulator wind controls, select a strong-wind setting and watch the aircraft's illustrated travel against the marked path, then assert the aircraft visibly drifts from the marked path and leaves the visible flight area while the selected condition is labeled, its wind indicator reflects the chosen speed and direction, the scene responds to the selection, the selected build facts remain visible, and disclosures identify the motion as scripted illustration rather than calculated physics or prediction of actual flight behavior.
