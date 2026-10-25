---
test: ../load-mismatch-fixture-and-inspect-planner-results_test.md
status: passed
started: 2026-10-24T21:52:29.271Z
duration_s: 67
session_id: e991b62e-2ca1-449c-ae75-07b19050d79e
---

# Load mismatch fixture and inspect planner results — Result

## Step 1 ✓ passed (19.1s)
md5: 054bc3e022f58051624b9ca32def972b
Open {{start_url}} and reach the synthetic RC aircraft build workspace with its named validation configurations.

## Step 2 ✓ passed (44.2s)
md5: e2d10e3bc5229bbaf6e1ed7e833cca62
In the build workspace, select the named validation configuration described as incompatible; inspect its populated catalog roles, supported compatibility checks, and build specification summary, then assert its displayed compatibility outcome is the incompatible outcome described by that configuration, all supported checks correspond to the populated build, all roles supported by this configuration are populated from it, the available specifications refer to that same build, and no synthetic catalog product is represented as manufacturer-verified.
