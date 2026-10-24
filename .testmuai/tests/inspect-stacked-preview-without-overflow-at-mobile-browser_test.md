---
assurance:
  id: t-9
  base: sha256:994d4c9141bedf2b5e92693c0a2fd66dfa4dc33dfdc1ef6b0c9acb043bc92b64
---
# Inspect stacked preview without overflow at mobile browser width

> Use a narrow browser viewport; inspect stacked visualization and facts, accessible controls, readable labels and absence of horizontal overflow.

## Step 1

Open {{start_url}} at a mobile-width browser viewport and navigate from the build planner to the separate aircraft simulator page.

## Step 2 @verifies ac-23, ac-24, ac-25, ac-26, ac-15, ac-16, ac-17

On the mobile-width simulator page, inspect and operate its preview controls using their accessible names and inspect the visualization and facts panel, then assert the visualization and facts are stacked, controls remain accessible, labels are readable, no horizontal overflow occurs, and available supported build facts with units, current compatibility status, and synthetic identification of displayed mock catalog products remain visible.
