---
assurance:
  id: t-10
  base: sha256:6e9505f73b0cfea07d54160bce41ae6eabfce6295989a78cf701dd8e6233c4cf
---
# Return to planner and continue changing aircraft build

> Navigate to the preview and return to the planner; continue changing build selection and seeing compatibility as before.

## Step 1

Open {{start_url}} and reach the build planner.

## Step 2 @verifies ac-15, ac-16, ac-17

From the build planner, visit the separate aircraft simulator page and inspect the currently selected build, then assert its available supported facts with units, current compatibility status and synthetic identification of displayed mock catalog products are shown.

## Step 3 @verifies ac-27, ac-28

Return to the build planner and change an existing airframe or component selection to a different listed option, then assert the planner's selected build changes and its compatibility state reflects the new selection.
