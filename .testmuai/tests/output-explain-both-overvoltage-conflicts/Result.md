---
test: ../explain-both-overvoltage-conflicts_test.md
status: passed
started: 2026-10-24T21:33:38.215Z
duration_s: 92
session_id: ba93fd32-7a60-4104-aa20-85892d08043e
---

# Explain both overvoltage conflicts — Result

## Step 1 ✓ passed (22.9s)
md5: 5ebc90819a72356647f668d2244f9029
At {{start_url}}, open the RC Airplane Build Planner's Build planner and its Try a demo compatibility configurations.

## Step 2 ✓ passed (44.7s)
md5: b27934d1c091b1b771b547485a28c5e3
Load the high battery voltage synthetic configuration and inspect its motor voltage compatibility result, then assert it reports incompatible because battery full-charge voltage exceeds the selected motor's maximum input voltage.

## Step 3 ✓ passed (21.1s)
md5: fc7fd6ade310aeae5cbe40972e220288
In that Build's compatibility results inspect the ESC voltage comparison, then assert it reports incompatible because battery full-charge voltage exceeds the selected ESC's maximum input voltage.
