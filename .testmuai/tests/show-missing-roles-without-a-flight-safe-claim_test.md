---
assurance:
  id: t-28
  base: sha256:d52c8b2e6ef8bc06cecf73685a74bf6cd2e73f3130cceb662993c884a31b0817
---
# Show missing roles without a flight-safe claim

> After choosing an Airframe but before filling all roles, identify the empty required roles without implying that the aircraft is safe to fly.

## Step 1 @verifies ac-76

At {{start_url}}, on the RC Airplane Build Planner's build page, choose a curated Airframe while leaving its required component roles unfilled, then assert the Build identifies the empty required roles.

## Step 2 @verifies ac-77

On that incomplete Build, review the displayed build feedback and safety wording, then assert no safe-to-fly label is applied to the incomplete Build.
