---
assurance:
  id: t-21
  base: sha256:a62789d6276b28171cdacc48c6be2cfeedb3a7ae3bfc1df8e8b288711bc9921c
---
# Show receiver-range signal loss beyond the weak profile limit

> Load the weak-range receiver profile; when accumulated illustrative distance exceeds its synthetic range, observe the signal-loss announcement and departure from the marked path.

## Step 1

At {{start_url}}, open the aircraft build planner and reach its separate aircraft preview page.

## Step 2 @verifies ac-54, ac-56, ac-57

From the available demo configurations, load the weak-range receiver profile and return to the preview; inspect its receiver-range response, then assert the selected receiver's synthetic range is displayed in meters and the response is identified as synthetic and not a prediction of actual radio coverage.

## Step 3 @verifies ac-55, ac-58

Let the illustrative flight run in the preview until its accumulated distance exceeds the displayed weak receiver range, then assert the accumulated illustrative distance is visible and a “Signal lost” error is announced after the crossing.

## Step 4 @verifies ac-59

Continue observing the aircraft in the receiver-range failure state beyond the displayed range, then assert it departs the marked path.
