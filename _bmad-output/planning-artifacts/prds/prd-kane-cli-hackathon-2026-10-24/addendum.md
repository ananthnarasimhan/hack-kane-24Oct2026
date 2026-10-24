# Addendum — Product Landscape and Validation Fixture

This note records background research checked on 2026-10-24. It is context for positioning and does not add features to the MVP.

- **Integrated build planning:** [EricRobbRC My Builds](https://www.ericrobbrc.com/build) combines an airplane designer, electronics checklist, parts matcher, wiring designer, calculators, and a spec sheet in a browser workspace. Its tools cover motor, ESC, propeller, battery, servo, and radio selection, and the site distinguishes estimates from manufacturer specifications and tested values. It focuses on beginner scratch-built foam-board aircraft, making it a close comparable for the proposed build/configure/check/spec flow.
- **Powertrain calculations:** [eCalc setupFinder](https://www.ecalc.ch/calcinclude/help/setupfinderhelp.htm) and [propCalc](https://www.ecalc.ch/calcinclude/help/propcalchelp.htm) help find and analyze electric drive combinations. Their documentation describes performance values such as thrust, current, RPM, efficiency, and runtime, and cautions users to verify physical component fit.
- **Browser flight simulation:** [RCForge](https://rcforge.adithyask.com/docs/next) lets users edit aircraft and components, inspect mass and center of gravity, then fly the model in a browser. Its documentation describes the project as experimental and notes limits in model validation and automatic physical-fit checks.

**Implication:** The proposed workflow has existing precedents. The PRD therefore does not claim market novelty. If the project is presented as a public product, the product owner should identify a differentiator before making positioning claims. No market-positioning goal was supplied for this hackathon prototype.

## Synthetic validation fixture

These values make the MVP’s first rule set and summary calculations reproducible. They are synthetic, are not real hardware specifications, and must not be shown as a flight recommendation. Real Catalog entries require manufacturer-backed values.

- **Trainer demo Airframe:** mass 750 g; maximum takeoff mass 1,200 g; wingspan 1,200 mm; wing area 24 dm²; maximum propeller diameter 254 mm; motor-mount pattern 16 mm; requires four servos and four receiver channels.
- **Drive demo motor:** mass 55 g; maximum input voltage 12.6 V; maximum current 25 A; 16 mm mount. With the selected propeller at 11.1 V, the reference point is 20 A and 850 gf static thrust.
- **Drive demo propeller:** mass 10 g; diameter 254 mm.
- **Power demo ESC:** mass 25 g; maximum input voltage 12.6 V; continuous current rating 30 A.
- **Power demo battery:** nominal voltage 11.1 V; full-charge voltage 12.6 V; capacity 2.2 Ah; continuous discharge rating 25C; mass 180 g.
- **Control Components:** four servos at 9 g each and a 12 g receiver with four channels.

Estimated Build mass is 750 g Airframe + 55 g motor + 10 g propeller + 25 g ESC + 180 g battery + (4 × 9 g) servos + 12 g receiver = 1,068 g, below the Airframe’s 1,200 g maximum takeoff mass. Wing loading is 1,068 g ÷ 24 dm² = 44.5 g/dm². Electrical input power is 11.1 V × 20 A = 222 W. Static thrust-to-weight is 850 gf ÷ 1,068 g = 0.80:1. The 20 A reference is within motor, ESC, and battery continuous-current limits; the mount pattern, propeller clearance, servo count, receiver channel count, and voltage checks pass.

Changing the propeller diameter to 279 mm returns **incompatible** because it exceeds the Airframe’s 254 mm maximum propeller diameter. Removing the battery’s continuous-discharge rating returns **needs-check** for battery discharge capability.
