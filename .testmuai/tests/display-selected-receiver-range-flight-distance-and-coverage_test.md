---
assurance:
  id: t-23
  base: sha256:644a300a3d9ee8d9db5625c12d9cccedadebb7245698bacdf08b0995c2632276
---
# Display selected receiver range, flight distance and coverage disclosure

> Show a selected receiver's synthetic range and accumulated illustrative flight distance with disclosure of synthetic, non-predictive response.

## Step 1

At {{start_url}}, open the aircraft build planner and reach its separate aircraft preview page.

## Step 2 @verifies ac-54, ac-55

In the aircraft preview with a receiver selected, observe the receiver-range response alongside the running illustrative flight, then assert the selected receiver's synthetic range is displayed in meters and accumulated illustrative flight distance is visible.

## Step 3 @verifies ac-56, ac-57

Review the receiver-range response in that preview, then assert it is identified as synthetic and not a prediction of actual radio coverage.
