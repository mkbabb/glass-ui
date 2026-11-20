# ASK-GU-MEASURED-BLOCK-TWEEN: one glass primitive for a content-driven size that tweens

**From**: speedtest AX pass 3, audit round 1 repair seat (2026-11-12). **To**: glass-ui. **Law**: MOTION LAW P0 ("a content-driven height is measured and tweened"); the library-gaps rule (a consumer that hand-rolls a measure-and-tween means the library needs fixing). **Folds in**: seat-a ASK-GU-BUTTON-VERB-MORPH and ASK-GU-DOCK-SEAT-RESIZE-TWEEN.

**Three consumers wait on the same mechanism.**
1. **The run seat's verb width** (Start, Stop, Run again differ by up to 49 px). `SpeedtestResults.vue` `holdSeat` / `tweenSeat` measure the Button and run a WAAPI tween, resolving glass's spring by writing `transitionDuration = var(--spring-present-duration)` and reading it back (no-legacy r1 H6). I removed its masking fallbacks; the round-trip stays until glass owns the morph.
2. **The dock's width on a face change** (owner-eye r1 H-M1: survey 210.9 to 234.9 to 258.9, thank-you 258.9 to 302.5, each in one frame; geometry-motion r1 H1).
3. **The survey card's block size.** The card holds a constant budget per step (DDR-AW-SURVEY-STAGE), so a two-field step leaves about 500 px of empty card (owner-eye r1 H-C1b). Hugging the step's content would change the card's height per step, which P0 allows only as a tween.

**What I ask.** A glass size primitive (a `useMeasuredSize` composable plus the CSS it drives, or a `Morph` wrapper) that measures a box's natural inline or block size when its content changes and tweens from the old size to the new one on a named glass spring, with its exit as an animation too, and with reduced motion as a fade. `Button` uses it for its label, the dock run for its seats, and `Card` exposes it for content-driven height.

**What I will delete when it ships.** `holdSeat` / `tweenSeat`; and DDR-AW-SURVEY-STAGE's constant budget goes back to the owner for a ruling with the tween available (BLOCKED-OWNER today).
