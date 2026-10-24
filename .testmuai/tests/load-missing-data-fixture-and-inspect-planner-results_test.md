---
assurance:
  id: t-25
  base: sha256:9dbf2afce4dd74be281b01c9dd612bc3cd3bf9c7d57918754c06c7d4a32eb68a
---
# Load missing-data fixture and inspect planner results

> Select a named missing-data configuration and inspect incomplete supported checks and same-build specification summary.

## Step 1

Open {{start_url}} and reach the synthetic RC aircraft build workspace with its named validation configurations.

## Step 2 @verifies ac-67, ac-68, ac-69, ac-70, ac-62

In the build workspace, select the named validation configuration described as an incomplete check; inspect its populated catalog roles, supported compatibility checks, and build specification summary, then assert its displayed compatibility outcome is the incomplete-check outcome described by that configuration, all supported checks correspond to the populated build, all roles supported by this configuration are populated from it, the available specifications refer to that same build, and no synthetic catalog product is represented as manufacturer-verified.
