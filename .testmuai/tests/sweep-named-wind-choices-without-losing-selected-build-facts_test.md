---
assurance:
  id: t-15
  base: sha256:535fb56b56f9abf91f76fbcdcf41a5e367acd3555aa06524e3496145ae7825fc
---
# Sweep named wind choices without losing selected build facts

> Across the five owner-named paired wind choices, changing condition updates its label and indicator while keeping selected build facts visible.

## Step 1

At {{start_url}}, open the build planner's separate aircraft simulator page with a selected build and locate its wind controls and build facts.

## Step 2 @verifies ac-29, ac-30, ac-31, ac-32, ac-33, ac-34

In the simulator, cycle through Calm (0 mph, N), Light breeze (8 mph, NW), Moderate breeze (16 mph, W), Strong breeze (25 mph, SW), and Very strong breeze (35 mph, E); after each selection, observe its indicator and illustrative response, then assert each selected choice is labeled, its indicated speed and direction match the selected choice, the illustrative scene responds to the selection, the selected build facts remain visible, and the interface identifies wind responses as scripted illustration rather than calculated physics or a prediction of actual flight behavior.
