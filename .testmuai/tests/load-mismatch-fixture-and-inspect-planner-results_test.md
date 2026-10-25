---
assurance:
  id: t-24
  base: sha256:24aeaa2c978f6457d9ef59fdf481c5b08605b368dd1aaab544252541f21d58c9
variables:
  start_url:
    value: https://ananthnarasimhan.github.io/hack-kane-24Oct2026/
    secret: false
---
# Load mismatch fixture and inspect planner results

> Select a named mismatch configuration and inspect its incompatible supported checks and same-build specification summary.

## Step 1

Open {{start_url}} and reach the synthetic RC aircraft build workspace with its named validation configurations.

## Step 2 @verifies ac-63, ac-64, ac-65, ac-66, ac-62

In the build workspace, select the named validation configuration described as incompatible; inspect its populated catalog roles, supported compatibility checks, and build specification summary, then assert its displayed compatibility outcome is the incompatible outcome described by that configuration, all supported checks correspond to the populated build, all roles supported by this configuration are populated from it, the available specifications refer to that same build, and no synthetic catalog product is represented as manufacturer-verified.
