---
assurance:
  id: t-5
  base: sha256:f0a0c14d083807fbc78e297e789e8649f83b3d81d54f689886f338104de3bee9
---
# Show fallback while preserving aircraft build facts without WebGL

> Open the preview in a browser unable to render WebGL; show a clear legible fallback while keeping selected build facts available.

## Step 1

Open {{start_url}} in a browser session configured so WebGL rendering is unavailable; reach the build planner.

## Step 2 @verifies ac-18, ac-15, ac-16, ac-17

From the build planner, open the separate aircraft simulator page without WebGL rendering, then assert a legible fallback message explains the unavailable preview and the selected build's available supported facts with units, current compatibility status, and synthetic identification of displayed mock catalog products remain visible.
