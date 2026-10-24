---
assurance:
  id: t-16
  base: sha256:e4aa15a601feae76ca10dfa06afbe74e1e2bf4cb0ad08623e0e4d371f50c0804
---
# Show neutral motion for unmatched motor reference

> Select the named unmatched-reference synthetic preset and observe unavailable propulsion estimates, explained cause, and neutral motion while build details update in place.

## Step 1

Open {{start_url}} in the browser and from the build workspace navigate to the separate aircraft preview page.

## Step 2 @verifies ac-42, ac-43, ac-44, ac-47

On the aircraft preview page, select the synthetic propulsion preset with no matching motor reference and inspect the selected components, compatibility checks and supported build facts, then assert they reflect the selected synthetic build without leaving the preview and the mock components are identified as synthetic.

## Step 3 @verifies ac-49, ac-50

On that preview's propulsion facts panel, inspect the result for the unmatched motor reference, then assert propulsion estimates are unavailable and the explanation identifies the absence of a matching motor reference.

## Step 4 @verifies ac-51, ac-48

Run the aircraft preview with the unmatched-reference build and observe its illustrative movement, then assert it uses neutral travel pace and does not claim to predict real speed or climb.
