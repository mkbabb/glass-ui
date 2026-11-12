# Orchestrator note for every seat on 11.0.1: the owner's date, and the v11.0.0 baseline

**The date.** The owner shows daraksha.babb.dev to his family at 09:00 on 2026-11-12. 11.0.1 is wanted on npm by about 06:00 that morning. Work in the order that gets a correct release out soonest: no optional reading, no extra probes, no re-running a green cell. Correctness still wins: a real defect in the owner's named cells (the wide label seat's plate is a capsule, never an ellipse; the dock's end is round at rest, collapsed, open with a narrow active layer and on every morph frame) is reported, never waved through.

**The v11.0.0 baseline is being computed for you.** A separate seat is running the visual suite on a v11.0.0 tree and writing the failing-title sets per project to `docs/release-11.0.1/baseline-v11.0.0/` (with a README saying exactly what ran). CLOSE SEAT: use those title sets as the v11.0.0 side of your comparison and do NOT recompute them, unless the README says a project could not be run; then run only that project. Commit that directory with your records.

**The WebKit lock** is machine-wide and other sessions share it. The other glass runs (11.1.0, the marks design loop) are paused until this release publishes, so you should get it sooner than earlier seats did. Keep each WebKit call to what it needs.
