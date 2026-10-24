---
assurance:
  id: t-26
  base: sha256:4e74ba01af47311acda71af379aa5915a03fd79d6a6dcc1f23bbbc19090b3715
---
# Preserve selected build after unknown validation selection

> Try an unrecognized scenario identifier and compare the selected catalog roles before and after the attempt.

## Step 1

Open {{start_url}} and reach the synthetic RC aircraft build workspace with its named validation configurations.

## Step 2

In the build workspace, select a named validation configuration to establish a populated synthetic build.

## Step 3

capture baseline: selected build's catalog roles in the build workspace

## Step 4 @verifies ac-71, ac-62

In the build workspace's validation-scenario selection, attempt an identifier not present among the named configurations; inspect the selected build, then assert its catalog roles equal the selected build recorded before the unknown attempt and no synthetic catalog product is represented as manufacturer-verified.
