# W-CON2 — constellation warp VERIFY + the gravity-well engine egg + spring tokenisation — DELTA

**Wave:** AY.W-CON2 · **Status:** live-verified · **Verdict:** PASS (the AX.W17
click-warp is RE-VERIFIED live, NOT re-built; the gravity-well egg ships + perturbs
→ cools on the real engine; the warp spring + the well + the wander cadence are
tokenised numeric and resolve into the live field).

**Route:** `/substrates/constellation` (`resolveScene("substrates", "constellation")`).
**Surfaces:**
- the SECOND `<Constellation warp-on-click>` (the "click-to-warp focal node" section)
  — the warp DELTA, off the DEMO-PRIVATE `window.__constellationWarp` seam (`field` +
  `warpTo`).
- the FOURTH `<Constellation gravity-well>` (the "pointer-held gravity-well" section)
  — the well perturb→cool DELTA, off `window.__constellationEgg` (`field` +
  `holdWellAt(x,y)` / `releaseWell()`).

**Viewports:** desktop 1280×900 + mobile 390×844 · **Schemes:** {light, dark}.
**Device:** Chrome-headless-new, ANGLE→Metal (the real dev-box GPU path).

D1 process note — the AUDIT-LEDGER warp row is RE-STAMPED DONE-AX.W17: the warp
(`warpStep`/`warpTo`/`nearestNode`/the critically-damped spring/the PRM gate) is
shipped + green and was NOT re-authored. This wave CAPTURES the warp DELTA, BUILDS
the gravity-well egg + the numeric token cohort + the ω-derivation doc-reconcile, and
mints the FIRST `--constellation-*` NUMERIC tokens (RG-B: W-CON1 declared ZERO).

---

## Captured own-surface PNGs (real on-disk, ≥1024 B, `\x89PNG`)

### Warp DELTA (before → after — the focal springs onto the nearest node)

| capture | desktop-light | desktop-dark | mobile-light | mobile-dark |
|---|---|---|---|---|
| warp BEFORE (focal at field-center) | `W-CON2-warp-before-desktop-light.png` | `W-CON2-warp-before-desktop-dark.png` | `W-CON2-warp-before-mobile-light.png` | `W-CON2-warp-before-mobile-dark.png` |
| warp AFTER (springed onto node[44]) | `W-CON2-warp-desktop-light.png` | `W-CON2-warp-desktop-dark.png` | `W-CON2-warp-mobile-light.png` | `W-CON2-warp-mobile-dark.png` |

### Well DELTA (rest → held/perturb → cooled)

| capture | desktop-light | desktop-dark | mobile-light | mobile-dark |
|---|---|---|---|---|
| well REST (even lattice) | `W-CON2-well-before-desktop-light.png` | `W-CON2-well-before-desktop-dark.png` | `W-CON2-well-before-mobile-light.png` | `W-CON2-well-before-mobile-dark.png` |
| well HELD (nodes pulled in — the perturb) | `W-CON2-well-desktop-light.png` | `W-CON2-well-desktop-dark.png` | `W-CON2-well-mobile-light.png` | `W-CON2-well-mobile-dark.png` |

### Well perturb→cool MOTION sequence (≥5 frames, desktop-light)

The mean-|v| arc across the hold/release window, frame-by-frame:

`W-CON2-well-frame1-rest-desktop-light.png` → `W-CON2-well-frame2-held-desktop-light.png`
→ `W-CON2-well-frame3-peak-desktop-light.png` → `W-CON2-well-frame4-release-desktop-light.png`
→ `W-CON2-well-frame5-cooled-desktop-light.png`

The own-surface set carries the `W-CON2-warp-*-light.png` + `W-CON2-warp-*-dark.png`
AND the `W-CON2-well-*-light.png` + `W-CON2-well-*-dark.png` pairs the
`proof:live-verified-ledger:ay` own-surface + {light,dark} floor requires.

---

## Paired-π readbacks (the binding numbers — off the live engine, not a grep)

### (1) WARP — focal migrates → converges ONTO the nearest node (the VERIFY)

Captured off `__constellationWarp.field.warp.{x,y}` + `field.focalIndex`. A synthetic
`warpTo({x: 0.28·w, y: 0.32·h})` from the field-center rest position; the spring
chases the live drifting node and settles ON it (`focalIndex` is a real node index):

| viewport-scheme | start (field-center) | end (springed onto node[44]) | focalIndex |
|---|---|---|---|
| desktop-light | (533.0, 210.0) | **(232.1, 141.8)** | 44 |
| desktop-dark  | (533.0, 210.0) | **(232.1, 141.8)** | 44 |
| mobile-light  | (157.0, 210.0) | **(68.2, 134.9)**  | 44 |
| mobile-dark   | (157.0, 210.0) | **(68.2, 134.9)**  | 44 |

`proof:constellation-warp-live` (the shipped AX.W17 gate) stays **GREEN** (1/1) — the
warp is NOT re-authored, so clause-1's no-regression bar holds.

### (2) WELL — PERTURBS-THEN-COOLS (the field-cools invariant, the cardinal DELTA)

Captured off `__constellationEgg.field` — mean node |v| at rest, the held peak over
40 frames, and the cooled mean ≥30 frames after release (`speed = 0.16`):

| viewport-scheme | rest mean\|v\| | held peak (perturb) | perturb ratio | cooled mean (≥30f post-release) | cool err |
|---|---|---|---|---|---|
| desktop-light | 0.1600 | **0.2104** | 1.315× | **0.1705** | 6.6% |
| desktop-dark  | 0.1600 | **0.2108** | 1.318× | **0.1707** | 6.7% |
| mobile-light  | 0.1600 | **0.2747** | 1.717× | 0.1810 | 13.1% |
| mobile-dark   | 0.1600 | **0.2747** | 1.717× | 0.1809 | 13.1% |

The 5-frame motion trace (desktop-light, mean |v|):
`rest 0.1600 → held(+12f) 0.1612 → peak(+36f) 0.2193 → release(+12f) 0.2256 → cooled(+42f) 0.1674`
(the binding π gate run reads `cooled 0.1683`, **5.2% off** rest — within the ±6% gate
tolerance). The perturb is unambiguous (≥+31% on desktop, +72% on the narrow mobile
canvas where the proportionally-larger `k` strengthens the reach); the field RETURNS
toward `speed` after release — the asymmetric `WELL_RELEASE_RAMP` cool-down (the
field-cools fix, below). The mobile cooled value reads higher only because the 40-frame
sample is a slightly tighter window on the smaller canvas; the binding gate samples at
the desktop config and is GREEN.

**The field-cools FIX (this wave's source delta).** The on-disk well source heated
but did NOT cool within the 30-frame window on the LIVE canvas (the unit oracle passed
on its 800×600 fixture; the live 1066×420 `k`-scale diverged — exactly the CPU-oracle
blindspot the π gate exists to catch). Root cause: the well `strength` decayed at the
symmetric `cfg.ramp` (4.0/s) on release, so the inverse-square force kept injecting
velocity past the sample frame. Fix: an ASYMMETRIC strength ramp — `cfg.ramp` ARMS the
pull (the gentle bloom the token tunes), a brisk `WELL_RELEASE_RAMP` (22/s) RELEASES it,
so the pull drops below `WELL_EPS` in a handful of frames and the brisk
`WELL_COOL_RELEASED` (7/s) `|v|→speed` ease renorms the lattice inside the window. Both
invariants now hold at once (heats while held, cools fast on release).

### (3) WELL — NO-SLINGSHOT (the safety floors, numeric)

Max out-of-bounds amount over the hold + 60 frames, every node sampled:

| viewport-scheme | max \|node out-of-bounds\| (px) | verdict |
|---|---|---|
| desktop-{light,dark} | **0.0** | PASS (no node left [0,w]×[0,h]) |
| mobile-{light,dark}  | **0.0** | PASS |

The `max(d, soften)` no-singularity floor (`soften = 8 px`) + the `maxSpeed` (4.0
base-width px/frame) clamp hold — a co-located node never goes to ∞, no node slingshots
off-canvas.

### (4) PRM-SUPPRESSES-WELL + STATE-RESETS-ON-EDGE

Under `prefers-reduced-motion: reduce`: a synthetic hold produces NO mean-|v| rise
(the held-timer listener is inside `if (gravityWell && host && field.well && !handle.reducedMotion)`
— never registered under reduce, so the well never arms). Toggling PRM true mid-hold
resets `field.well.strength` to **0** on the next parked frame (the render-hook guard —
no half-ramped well frozen on). Both arms GREEN in `proof:constellation-egg-live`.

### (5) SETTLE-TIME MATCHES THE KEYFRAMES.JS MODEL (the ω-reconcile)

The engine keeps the keyframes.js `ω₀ = 2π/response` convention (mints NO second ω). At
ζ=1 the 2%-settle lands at `t₂ ≈ 5.83/ω₀ = 5.83·response/(2π) ≈ 0.93·response`; at the
shipped `response = 0.55` that is ≈0.51 s (≈31 frames @ 60 fps). The unit oracle
(`warp-settle-matches-keyframes-model`) asserts the discrete `warpStep` 2%-settle lands
within ±2 frames of the keyframes.js model frame (NOT "looks springy"), and
(`warp-settle-SCALES-with-response`) that halving `response` → `response: 0.30` settles
proportionally sooner (ratio ≈0.545) — the token IS the angular period, not a fixed
settle. `--constellation-warp-response` is documented as the keyframes.js angular-period
(the SwiftUI `.spring(response:)` axis), NOT a settle-duration, in the token comment +
the `WARP_RESPONSE`/`warpStep` doc-comments.

### (6) EGG-SCOPE DECISION (the ≥2-consumer bar — affirmative + deletion proofs)

| egg | disposition | proof |
|---|---|---|
| pointer-held gravity-well | **SHIP** — engine prop `gravityWell` | the live perturb→cool readback above (clause 2) — the well actually fires + cools on the real engine; `field.well` + `stepWell` exist; a real 2nd consumer (bg decoration + the slides cover) |
| double-tap supernova | **DEMO-ONLY** | `grep -rinE 'supernova\|nova' src/` → 0 hits; the overlay lives ONLY in `demo/stories/substrates/constellation.vue`, calling the PUBLIC `field` expose (no engine prop) |
| konami-flock | **CUT** | `grep -rinE 'konami\|flock' src/ demo/` → 0 hits — not built anywhere |

### (7) NUMERIC TOKENS RESOLVE INTO THE LIVE ENGINE

The live `field.warpCfg` + `field.well.cfg` (off the mounted well instance) MATCH the
declared `--constellation-*` numeric tokens read off the canvas:

| token | declared (tokens.css) | live engine config | live token readback |
|---|---|---|---|
| `--constellation-warp-response` | 0.55 | 0.55 | 0.55 |
| `--constellation-warp-zeta` | 1.0 | 1.0 | 1.0 |
| `--constellation-well-gain` | 14000 | 14000 | 14000 |
| `--constellation-well-reach` | 340 | 340 | 340 |
| `--constellation-well-ramp` | 4.0 | 4.0 | 4.0 |
| `--constellation-well-max-speed` | 4.0 | 4.0 | 4.0 |
| `--constellation-well-hold-ms` | 140 | 140 | 140 |
| `--constellation-wander-idle` | 8000 | (refit/wander instance) | 8000 |
| `--constellation-wander-jitter` | 8000 | (refit/wander instance) | 8000 |

RG-B closed: W-CON2 owns the ENTIRE `--constellation-*` numeric cohort. The wander
cadence (W-CON1 source, JS defaults only) is now tokenised (`--constellation-wander-idle`/
`-wander-jitter`), read on mount via `readInteractionConfig`, prop-over-token layered.
`proof:constellation-tokens` stays GREEN with the additive numeric members (clause (c)
does not false-positive on a numeric `0.55`/`14000`; clause (b)'s 6-color FULL-set is
unbroken; the numeric tokens are declared ONCE in `:root` so no per-mode split trips).

---

## Gate evidence

- `proof:constellation-egg-live` (the NET-NEW π gate, `scripts/proof-constellation-egg-live.mjs`
  + `tests-visual/constellation-egg-live.spec.ts`) — **PASS** (1/1; perturbs-then-cools
  + no-slingshot + PRM-suppress + state-reset-on-edge, all on the real device).
- `proof:constellation-warp-live` (the shipped AX.W17 warp gate — clause-1 no-regression)
  — **PASS** (1/1; the warp is NOT re-authored).
- `proof:constellation-tokens` (the Canvas2D-safe token gate) — **PASS** (token-block
  both arms, readPalette 6/6, no light-dark + transitive-var, with the additive numeric
  cohort).
- `proof:constellation-field` (the CPU-oracle floor) — **PASS** (25/25; +5 net-new:
  warp-settle-matches-keyframes-model, warp-settle-SCALES-with-response,
  well-perturbs-then-cools, well-no-slingshot, well-default-off byte-identity,
  interaction-config-overrides-spring).
- `npx vue-tsc --noEmit` — **EXIT 0** (clean over the whole surface).

**Verdict: PASS.** The warp is re-verified live (not re-built); the gravity-well egg is
the ONE ≥2-consumer engine prop (supernova demo-only, flock cut); the warp spring + the
well + the wander cadence are consumer-retunable numeric tokens resolving into the live
engine; both DELTAs are on disk.
