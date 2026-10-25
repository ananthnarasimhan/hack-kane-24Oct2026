---
assurance:
  id: t-14
  base: sha256:6e19ad9df8b9738bc2a165cb54d1fb4d4a9d702a5cb1cdf7594113e65c7495ef
variables:
  start_url:
    value: https://ananthnarasimhan.github.io/hack-kane-24Oct2026/
    secret: false
---
# Show straight marked flight against a background in calm wind

> Selecting Calm (0 mph, N) illustrates straight travel on a marked path against a visible background.

## Step 1

At {{start_url}}, open the build planner's separate aircraft simulator page with a selected build and locate the wind controls.

## Step 2

In the simulator, first select a non-calm wind condition.

## Step 3 @verifies ac-40, ac-41, ac-29, ac-30, ac-31, ac-32, ac-33, ac-34

In the simulator wind controls, select Calm (0 mph, N) and observe the moving aircraft, then assert it follows a straight marked path against a visible background, Calm (0 mph, N) is the labeled condition reflected in the wind indicator and scene, selected build facts stay visible, and the response is identified as scripted illustration rather than calculated physics or a prediction of actual flight behavior.
