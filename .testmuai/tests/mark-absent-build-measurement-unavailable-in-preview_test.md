---
assurance:
  id: t-6
  base: sha256:a6521510e5477e433da624bba57a568cb0943d683f4f66f9e0f13cfdde79ca7a
---
# Mark absent build measurement unavailable in preview

> Choose a build lacking a supported measurement; its preview states unavailable instead of showing a made-up measurement.

## Step 1

Open {{start_url}} and reach the build planner, then navigate to the separate aircraft simulator page.

## Step 2 @verifies ac-19, ac-15, ac-16, ac-17

In the aircraft simulator, select the documented synthetic propulsion preset with no matching motor reference, then assert its unsupported propulsion measurement is marked unavailable, other available supported build facts carry units, the current compatibility status reflects this selection, and displayed mock catalog products remain identified as synthetic.
