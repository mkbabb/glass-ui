# BD.W-FLIP-SPINE — the ONE FLIP-inversion bloom runner (`useElementBloom`), fold the 5-way rAF re-fork onto it

**Band 1 (CONSOLIDATE) · depends: NONE inbound within T1 (the spine head; the FLIP-SPINE→SPIKE-DELETE→VH-COMPOSE chain starts here)** — folds the BE pool rows `BE.W-BLOOM-UP` (the bloom runner folds onto the ONE FLIP spine) + `BE.W-BACKDROP-SETTLE` (the per-channel color-bloom rides the spine), per `UNIFIED-ROSTER.md:28`. Sequenced T1 so the spine is FOLDED before the dock waves (T2+) wire it; `W-CARD-SHEET-EXPAND` (VT14) + `W-DOCK-INTEGRATE` (T2) declare it a dep (`EXECUTION-DAG.md:164,218`).

> **STATUS: IMPLEMENTATION-gated.** This is the tranche-DEV PLAN doc. The build edits `src/composables/motion/` (mints `useElementBloom.ts`, re-points 4 bloom leaves) + `package.json` (the gate) and is user-gated. The spec is in scope now.

## The defect / the ask (Pass-D code-grounded — `PASSD-FOLD §HONEST CLEAN`, `PASSD-CONVERGENCE §the hardening`)

PASSD-FOLD's "HONEST CLEAN" list certifies this as a REAL DRY violation (not an over-read): **"the bloom-spine is a REAL 5-way DRY violation — 4 bloom impls each own an independent rAF loop"**, with the explicit CAVEAT that **"`useElementBloom` the ONE-runner is NET-NEW, not a compose-3-liner."** I re-traced the four impls at HEAD; the count is exact:

| bloom impl | file | lines | rAF call-sites | the duplicated core |
|---|---|---|---|---|
| `useLiquidReveal` | `src/composables/motion/useLiquidReveal.ts` | 259 | **4** | `cancelRaf()` + a `startTs`/`step(ts)` rAF loop driving `easing.fn(t)` (from `springTimingFunction`) → `morph.apply(el, inv)` (an `ElementMorph`) + opacity + `filter: blur` (`:151-230`) |
| `useDockCtaReceive` | `src/composables/motion/useDockCtaReceive.ts` | 322 | **4** | the SAME `ElementMorph` + `springTimingFunction` substrate, driven FORWARD 0→1 (`:53-54,:164,:170`) |
| `useCelebrationBurst` | `src/composables/motion/useCelebrationBurst.ts` | 261 | **3** | its own `cancelRaf` + `step` rAF loop |
| `useBloomUp` | `src/composables/motion/useBloomUp.ts` | 507 | **4** | its own `cancelRaf()` (`:353`) + a `step` rAF loop (`:450,:463`) over the same spring-curve channels |

That is **FOUR independent `requestAnimationFrame` driver loops** — each hand-rolling the identical shape: `let raf = 0` → `cancelRaf()` → `startTs = 0` → `const step = (ts) => { const t = min(1, (ts-startTs)/durMs); const eased = easing.fn(t); /* write 3 channels */; if (t<1) raf = requestAnimationFrame(step) }`. The CHANNELS differ (reveal blooms a surface 1→0, cta-receive flies a CTA 0→1, celebration bursts particles, bloom-up colors a field), but the **rAF DRIVER + the spring-sample-to-progress mapping is byte-isomorphic across all four**. This is the exact dead-MECHANISM-companion class `W-PRUNE-CONSOLIDATE` already polices for press/specular: N copies of one driver where ONE should survive.

`useLiquidMorph.ts` has **0 rAF call-sites** (it composes `useLiquidReveal` + a `SpringProgress.play()`, not a hand-rolled loop) — it is NOT a 5th rAF fork; it is the BE SPIKE that `W-SPIKE-DELETE` (the next T1 wave) removes wholesale. So the live re-fork count is exactly **4**, and the spine fold is **4 → 1**.

## The mechanism

Mint `useElementBloom` — the ONE FLIP-inversion rAF runner — and re-point all four bloom impls onto it so exactly ONE `requestAnimationFrame` driver loop survives across the bloom family. This is a NET-NEW abstraction (the honest accounting — NOT a "compose-3-liner"), so the wave OWNS the runner's design, not merely a re-import.

### 1. `useElementBloom(opts)` — the shared FLIP-inversion driver

`src/composables/motion/useElementBloom.ts` (`@mkbabb/glass-ui/motion`, keyframes-bearing → NEVER the root barrel — the `useLiquidReveal`/`useDragMorph` SCC-trap precedent). It owns:

- **ONE rAF driver.** A single `start(durationMs, onFrame: (eased: number) => void, onSettle: () => void)` that runs the `startTs`/`step(ts)`/`cancelRaf()` loop ONCE. `onFrame(eased)` receives the spring-eased progress (the curve interior, overshoot-bearing); the consumer writes its OWN channels in the callback. `onSettle()` clears the inline transform/opacity/filter at `t≥1`.
- **ONE spring-curve source.** The `easing: Easing = springTimingFunction({ response, dampingFraction })` sampled from the SAME `SPRING_PRESETS` row the `--spring-*` CSS tokens generate from (never a hand value — the W-GLASS-CAL spring fence). The matching `--spring-<name>-duration` per-spring clock is the `durationMs` default (the W-MOTION-CANON P4 per-spring clock).
- **ONE PRM policy.** `prefersReducedMotion()` snaps to the endpoint (opacity 1, zero transform/blur frames, the fade survives via the CSS recipe leg) in ONE step — the four impls' identical PRM branch factored once (`useLiquidReveal.ts:97,:186`; `useBloomUp.ts:178`; the same `prefersReducedMotion()` private in each, deduped here).
- **The `ElementMorph` FLIP helper is COMPOSED, not re-imported per consumer.** `useElementBloom` exposes `flipFrom(settledRect, sourceRect, transformOrigin)` returning the `ElementMorph` the reveal/cta consumers drive via `morph.apply(el, inv)` — the FLIP inversion lives ONCE.

The runner writes ONLY compositor channels (`transform`/`opacity`/`filter` + the inheriting `--*` customs) — never a layout property (the `proof:no-layout-animation` floor, library-wide).

### 2. The four re-points (the channels stay; the rAF driver evaporates ×3)

- **`useLiquidReveal`** drops its `cancelRaf`/`startTs`/`step` loop (`:151-230`); its `reveal()` composes `useElementBloom.start(durMs, (eased) => { const inv = 1-eased; morph.apply(el, inv); el.style.opacity = …; el.style.filter = blur(blurStart*inv) }, onSettle)`. The settled-rect/trigger-rect/transform-origin geometry + the no-trigger self-scale fallback STAY (the consumer's own channel math).
- **`useDockCtaReceive`** drops its rAF loop; its CTA-into-dock-control FORWARD play composes `useElementBloom.start(…, (eased) => { morph.apply(cta, eased); cta.style.opacity = 1-eased; cta.style.filter = blur(4*eased) }, onReceived)`. The `setPending()`/`clearPending()` seat + `[data-cta-pending]` data-attr seam (BC.W-AX-DOCK-CTA-SEAT) are byte-untouched (not rAF-driven — a plain `transition: opacity` swap).
- **`useCelebrationBurst`** drops its rAF loop; its particle-burst channels ride `useElementBloom.start`.
- **`useBloomUp`** drops its `cancelRaf`/`step` loop (`:353,:450,:463`); its color-field bloom (`writeFieldHue`/`writeFieldStrength`) rides `useElementBloom.start`. (This is the `BE.W-BLOOM-UP` fold; the `BE.W-BACKDROP-SETTLE` per-channel color-bloom rides the SAME spine as a `useBloomUp` channel-callback, never a 5th runner.)

Each re-point is byte-behaviour-identical on the channels (the same `easing.fn(t)`, the same per-spring clock, the same PRM snap) — the only delta is that the rAF DRIVER is now ONE source.

## The gate — `proof:flip-spine` (born-RED → GREEN; a REAL rAF-driver COUNT, never presence-regex)

`scripts/proof-flip-spine.mjs`, `tags: ["local","ci"]`. The detector is a COUNT over a parsed source census, comment-stripped first (a `requestAnimationFrame` inside a `//`/`/* */` comment does NOT count — the false-positive fix), with the live detector exported for the self-test bites.

- **S1 — exactly ONE rAF driver loop survives in the bloom family (the load-bearing numeric clause).** The detector enumerates the bloom-family files (`useElementBloom.ts` + `useLiquidReveal.ts` + `useDockCtaReceive.ts` + `useCelebrationBurst.ts` + `useBloomUp.ts`) and counts LIVE `requestAnimationFrame(` call-expressions (comment-stripped). It asserts the COUNT is concentrated in `useElementBloom.ts` (the ONE driver) and the four consumer files each carry **ZERO** live `requestAnimationFrame(` (they compose `useElementBloom`, never re-roll the loop). `facts.rafByFile` records the per-file count. A consumer file with ≥1 live `requestAnimationFrame(` REDs (the re-fork survived); a `useElementBloom.ts` with 0 `requestAnimationFrame(` REDs (the driver is hollow). **What reds on the pre-fix tree:** all four consumer files carry 3-4 live rAF call-sites → S1 RED by construction (born-RED).
- **S2 — every consumer COMPOSES `useElementBloom` (the runner is wired, not orphaned).** The detector asserts each of the four files carries a live `useElementBloom(`/`.start(` call-expression AND imports it from `./useElementBloom`. A bloom impl that dropped its rAF loop but does NOT compose the runner (a half-cut) REDs. `useElementBloom` with ZERO consumers REDs (a NET-NEW orphan — the ≥2-consumer bar; here ≥4).
- **S3 — the spring-curve source is SINGLE (no hand-rolled spring).** The detector asserts `useElementBloom.ts` carries `springTimingFunction(` reading a `SPRING_PRESETS` row name AND the consumer files carry NO independent `springTimingFunction(`/`new ElementMorph`-driving rAF (the curve + the FLIP live in the runner). A consumer re-sampling its own spring curve in a re-added rAF loop REDs (the W-GLASS-CAL spring-fence companion).
- **S4 — compositor-only + PRM-snap, factored ONCE.** The detector asserts `useElementBloom.ts` carries the `prefersReducedMotion()` snap branch AND the four consumer files carry NO independent `prefersReducedMotion()`-gated rAF loop (the PRM branch is the runner's). It asserts the runner writes only `transform`/`opacity`/`filter`/`style.setProperty("--…")` (no `style.width`/`.height`/`.padding`/`.top`/`.left` write — the no-layout floor, scoped to the runner).

**Self-test bites (each planted defect MUST red — sized to clear its own clause):**
- (a) a synthetic 5th `requestAnimationFrame(` loop re-added to `useLiquidReveal.ts` → S1 RED.
- (a2) a comment-string `// drives a requestAnimationFrame loop` planted in a consumer → S1 must NOT red (the comment-aware false-positive bite).
- (b) a consumer file that drops its rAF but does NOT compose `useElementBloom` → S2 RED (the half-cut bite).
- (b2) `useElementBloom` with all four `useElementBloom(` call-sites deleted (0 consumers) → S2 RED (the orphan-runner bite).
- (c) a consumer re-sampling `springTimingFunction(` inside a re-added rAF → S3 RED.
- (d) a `style.height =` layout-write planted in the runner → S4 RED (the no-layout bite).

## The binding π — rides `W-PI-AUTHOR` / `W-REFLECT3`

A bloom DRIVER consolidation changes ZERO pixels at the channel level (the re-points are byte-behaviour-identical — the same eased curve, the same per-spring clock, the same PRM snap). So this wave carries **NO new `proof:ba-gestalt` verdict of its own** (BB inv-4 — a dead-MECHANISM fold paints no new surface; the bloom CONSUMERS that paint — the dialog/cta/celebration/album surfaces — carry their own gestalt verdicts in their owning waves). The binding π is a NON-REGRESSION readback enrolled in the union π layer (`W-PI-AUTHOR`): `tests-visual/element-bloom.spec.ts` asserts the four bloom surfaces (a Dialog open via `useLiquidReveal`, a CTA→dock receive, a celebration burst, an album bloom-up) read FRAME-IDENTICAL to their HEAD captures (the re-point is paint-equivalent) + the PRM single-paint snap holds, both modes — LOCAL-ONLY, rides W-REFLECT3.

## Fences

- **`useElementBloom` is NET-NEW, not a compose-3-liner (the honest accounting).** PASSD-FOLD's HONEST-CLEAN caveat is recorded: the ONE-runner is a genuine new abstraction the wave designs + tests, not a thin re-export. The S2 ≥4-consumer bar + the S1 single-driver count are the load-bearing proof it is REAL.
- **The CHANNELS stay; only the DRIVER folds.** Each consumer keeps its own channel math (reveal's FLIP-inversion 1→0, cta's FORWARD 0→1, celebration's particles, bloom-up's color-field). The fold is the rAF loop + the spring-sample + the PRM branch — NEVER the consumer's pixel logic.
- **`useLiquidMorph` is NOT a 5th rAF fork.** It has 0 rAF call-sites (it composes `useLiquidReveal` + a `SpringProgress.play()`). It is the BE SPIKE that `W-SPIKE-DELETE` removes — out of scope here (the re-fork count is exactly 4).
- **The gate is a numeric rAF-driver COUNT, never presence-regex.** S1 counts live `requestAnimationFrame(` call-expressions per file (comment-stripped) and asserts the distribution (one driver, four zero-rAF consumers) — a presence check (`/useElementBloom/.test()`) would green a half-cut where the old loop survives BESIDE the new compose. The count is the bite.
- **No new spring family.** `useElementBloom` samples an EXISTING `SPRING_PRESETS` row; the `--spring-<name>-duration` clock is read, never minted (the W-GLASS-CAL fence, S3).

## Disposition links

- **`PASSD-FOLD §HONEST CLEAN`** ("the bloom-spine is a REAL 5-way DRY violation — 4 bloom impls each own an independent rAF loop; `useElementBloom` the ONE-runner is NET-NEW") → BUILT (the spec mints `useElementBloom` + folds 4→1; S1 the numeric driver-count). CLOSED at the spec level (the build user-gated).
- **`UNIFIED-ROSTER.md:28` folds** (`BE.W-BLOOM-UP` the bloom runner folds onto the ONE FLIP spine · `BE.W-BACKDROP-SETTLE` the per-channel color-bloom rides the spine) → BUILT (§2 the `useBloomUp` re-point + the channel-callback). CLOSED.
- **PREREQUISITE FOR** `W-SPIKE-DELETE` (T1 next — the spike delete lands after the spine is folded, so the spike's `useLiquidReveal` compose-target is the consolidated runner) · `W-CARD-SHEET-EXPAND` (VT14, `EXECUTION-DAG.md:164` — composes the union bloom runner, NOT the spiked `useLiquidMorph`) · `W-DOCK-INTEGRATE` (T2, the dock-from-pill bloom rides the spine). Forward.
- **T1 spine head (`EXECUTION-DAG.md:19`)** — fold the spine before wiring it; the no-legacy clean break (`EXECUTION-DAG.md:196`).
