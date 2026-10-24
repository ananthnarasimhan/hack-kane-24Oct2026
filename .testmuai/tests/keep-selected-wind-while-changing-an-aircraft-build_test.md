---
assurance:
  id: t-7
  base: sha256:eed56e6c6420741ad0125ccfa2577c5c6d9d56c03b6d68b28fd1e86e4c6ac01b
---
# Keep selected wind while changing an aircraft build

> Choose a listed non-calm wind condition, change the selected airframe or component, and observe refreshed supported facts and status with wind selection retained.

## Step 1

Open {{start_url}} and reach the build planner, then open the separate aircraft simulator page.

## Step 2

On the simulator page, choose a listed non-calm wind speed or direction and retain its displayed selection as the condition to compare after changing the build.

## Step 3 @verifies ac-20, ac-15, ac-16, ac-17

From the simulator's build-selection controls or the linked build planner, change the selected airframe or one component to a different listed option and return to the preview if necessary, then assert the selected wind condition remains the one chosen before the build change, available supported facts with units and current compatibility status reflect the newly selected build, and displayed mock catalog products remain identified as synthetic.
