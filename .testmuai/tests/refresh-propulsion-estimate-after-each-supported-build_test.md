---
assurance:
  id: t-19
  base: sha256:2713d859adee083add4331bec8fcb4011f3e7e9ea6f887fb4670a81248df1cdd
---
# Refresh propulsion estimate after each supported build-factor change

> With a supported build, change each of motor, propeller, battery and mass as equivalent input variations, checking the supported estimate and illustrative pace reflect the resulting build.

## Step 1

Open {{start_url}} in the browser and from the build workspace navigate to the separate aircraft preview page with a supported synthetic propulsion build.

## Step 2 @verifies ac-43, ac-44, ac-45, ac-46

From the build controls for the selected supported build, change the motor to {{alternate_supported_motor}} and inspect its preview, then assert the compatibility checks and supported build facts reflect that build, the displayed static thrust-to-weight estimate reflects the change and the illustrative pace reflects the resulting supported estimate.

## Step 3 @verifies ac-45, ac-46

From the build controls, change the propeller to {{alternate_supported_propeller}} while retaining a supported estimate and observe its preview, then assert the displayed static thrust-to-weight estimate and illustrative pace reflect the resulting build.

## Step 4 @verifies ac-45, ac-46

From the build controls, change the battery to {{alternate_supported_battery}} while retaining a supported estimate and observe its preview, then assert the displayed static thrust-to-weight estimate and illustrative pace reflect the resulting build.

## Step 5 @verifies ac-45, ac-46

From the build controls, change mass to {{alternate_supported_mass}} while retaining a supported estimate and observe its preview, then assert the displayed static thrust-to-weight estimate and illustrative pace reflect the resulting build.

## Step 6 @verifies ac-47, ac-48

On the resulting preview, inspect how its mock components and illustrative motion are characterized, then assert the components are identified as synthetic and the motion is not presented as a real speed or climb prediction.
