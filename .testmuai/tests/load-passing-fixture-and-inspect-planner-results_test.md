---
assurance:
  id: t-27
  base: sha256:79de9820d1711df3823b997537408945f6e04010bb850da30f783e80b3fa8658
---
# Load passing fixture and inspect planner results

> Select a named passing configuration and inspect its compatible supported checks and same-build specification summary.

## Step 1

Open {{start_url}} and reach the synthetic RC aircraft build workspace with its named validation configurations.

## Step 2 @verifies ac-72, ac-73, ac-74, ac-75, ac-62

In the build workspace, select the named validation configuration described as compatible; inspect its populated catalog roles, supported compatibility checks, and build specification summary, then assert its displayed compatibility outcome is the compatible outcome described by that configuration, all supported checks correspond to the populated build, all roles supported by this configuration are populated from it, the available specifications refer to that same build, and no synthetic catalog product is represented as manufacturer-verified.
