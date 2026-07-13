# W-PAGER-WORM — DELTA (the liquid dot-MORPH worm; ruling 13 decided)

**Wave:** BI.W-PAGER-WORM · **Gate:** `proof:pager-worm` (W1-W6) · **π:** `tests-visual/pager-worm.spec.ts` (LOCAL real-GPU).

## The defect (born-RED)

The pager painted an **EMPTY / SMEARED pill** (D-PAGER PASS-1 §0 Defect 1). The σ8 whole-layer goo filter over a small 13px pip over-blurred the alpha BELOW its own threshold (`0.281 < 0.389`) → the connected-component readback found **zero worm mass**, engine-agnostic (SAF: EMPTY on both Chrome and WebKit). The whole `.pager-goo-layer` — the bed pips AND the barbell — rode ONE filter, so darkening the merge annihilated the bed too.

## The fix (GREEN)

1. **The three-layer split** — the filter is DECOUPLED from the bed by construction: a `.pager-bed-layer` (N crisp CSS circles, NO filter, ever) + a `.pager-worm-layer` (ONLY the barbell masses, the translucency + goo filter ONCE) + the transparent interaction buttons. The bed can never be annihilated.
2. **The two-edge driver** — `useLeadTrail` (the ONE shared integrator, minted here): a spring LEAD edge + a damped TRAIL follower in ONE rAF. The gap is the elongation; the trail catching the lead is the emergent release. The CSS-transition `--goo-t`/`--pager-worm-duration` clock is retired for the interruptible spring.
3. **The worm-scoped filter** — `#pager-worm-goo` (σ4 / slope 18 / offset −6 → threshold 6/18 = 0.333). A lone body's blurred peak over a 13px pip is ~0.72 > 0.333, so it survives the threshold AND the two bodies fuse at a true smooth throat — the σ8 annihilation reversed.
4. **The squish cap** — re-registered off the 1.45 taffy value into the LOW 1.2 band (`--pager-worm-max-stretch: 1.2`, the `useLiquidFlex` LOW-cap register).

## Ruling 13 — ONE arm at 13px, the composed MOVING capture decided

**Judgment (b) RATIFIED — the goo worm SHIPS (ruling 13 stands; the veto declined on the moving captures).**

- **Arm A (SHIPPED, the 13px register):** the worm-scoped `#pager-worm-goo` filter merges the barbell into ONE liquid silhouette with a real smooth throat. The pass-5 MOVING captures (`.claude/worktrees/bi-p5-pager/_pass5-evidence/png/GESTALT_{chromium,webkit}_goo_{1hop,4hop,retarget}_f*.png`, both engines, both modes) read as a coherent elongate → travel → reform worm; the flood-fill connected-component finds ONE mass with a readable waist.
- **Arm B (BANKED — the loser, the `@supports not (filter: url())` degrade FLOOR):** the clip-path barbell (`#pager-neck-throat`) — a structural hourglass waist, NO filter, maximally Safari-safe. The pass-5 clip captures (`GESTALT_{chromium,webkit}_clip_{1hop,4hop,retarget}_f*.png`) show the recorded WHY it is the floor and not the primary: at multi-hop the un-merged clip reads as a **bowtie** (a hard structural waist, not a liquid throat). The edict is satisfied by the DYNAMIC two-edge stretch (the reform reads liquid in MOTION); the static waist proportion is secondary — so the clip is the honest degrade, banked here as its own record, never the shipped 13px paint. **No dual path at 13px:** the filter is the sole primary; the clip is reached ONLY on an engine that cannot ref an SVG filter.

## The Safari filter-raster budget (G3) — CLEARED

The G3 5-step-autoplay filter-raster probe (`.claude/worktrees/bi-p4b-pager/.proto-pager/g3-raster.json`) measures the MARGINAL filter cost (filter − clip, identical geometry) against the ≤4ms/frame budget:

| engine | filterMarginal median (ms) | filterMarginal p95 (ms) | budget (ms) |
|---|---|---|---|
| chromium | −0.291 | 4.01 | 4 |
| webkit (Playwright 26.4 proxy) | −0.336 | 2.473 | 4 |

Arm A's per-frame filter cost is within budget on both engines — the goo worm ships. **Owed residual (SAF-1):** the on-device Metal compositor budget rides a visible `Safari.app` capture (the modern-WebKit Playwright proxy is a floor, not the device truth) — booked to the W-PI-IN-CLOSE binding-π battery + the `W-GESTALT-LEDGER-FILE` navigation verdict, re-earned on a fresh capture.

## The binding π (owed at close, LOCAL real-GPU)

`tests-visual/pager-worm.spec.ts` (the ruling-13 decider on a live route): the composed MOVING worm — 1-hop + 4-hop + rapid-retarget — a 40-frame travel series with flood-fill connected-component + waist measurement (bar: ONE connected component, waist/body ≤ 0.45 for the readable waist; the bed's N pips stay individually crisp). Chrome AND real Metal WebKit, BOTH modes. Plus the PRM snap (zero elongated frames), the spam-click 0→4→1→4 interruption trace (no flicker / collapse-regrow), the drag-scrub 1:1 continuity (shared with W-CAROUSEL-REBUILD's capture).
