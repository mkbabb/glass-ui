# RESEARCH-3 — the FIX MECHANISM (glass-ui internals; no re-fork, no-dual-path)

The EXACT tokens/recipes to retune to fix the two defect classes — GRAY-GLASS (surfaces read flat
gray, not warm-cream luminous liquid glass) + MOTION (the field/cursor dynamics lack inertia/weight/
bounce). Grounded in the three live captures in this dir (`live-paper-grid.png`, `live-concentric*.png`).
Every change COMPOSES an existing primitive — no second recipe, no shader edit where the GL fence is
binding, compositor-only, PRM-carved, Safari-compatible.

---

## §0 — What the captures actually show (the defect, measured against the source)

| capture | what reads | root cause (mechanism) |
|---|---|---|
| `live-paper-grid.png` | the grid field is **INVISIBLE** over the cream page; the dock is a flat gray-cream pill | the warm ink at `minorAlpha 0.04`/`fieldAlpha 1` is the `--foreground`-derived `WARM_IDENTITY_INK` (L0.62 C0.05) composited at ~4% over the L98 near-white page → ΔL≈0 → no contrast. The "I don't see any paper grid" defect. |
| `live-concentric.png` | hero/body page; rings absent above the fold; dock flat | the field paints below the visible band; the dock plate reads gray-cream |
| `live-concentric-2.png` | rings DO paint warm-amber over cream (correct hue) **but** the right configurator panel is a flat **GRAY slab**, and the rings are thin/faint | (a) the configurator glass plate (`glass-floating`, opacity 0.80) composites over the light page and the W55 adaptive darken ramps `--glass-tint-strength` toward the 20% AA ink → the cream plate grays toward `oklab(0.785)` (the exact slides gray-slab class W-DARK-MATERIAL scope-7 was meant to gate, recurring on the FLOATING band which keeps the UNCONDITIONAL darken). (b) `lineWidth 1.4` + the warm palette at low amplitude = thin faint rings. |

So there are THREE sub-mechanisms, all token-first:

- **M-A — the over-light FLOATING/dock plate grays.** The W55 self-engage darken on `:where(.glass-floating, .glass-overlay)` + the dock ramps the plate toward `--glass-tint-ink` (= `--foreground`). Over a LIGHT page with no warm chroma behind to transmit, the oklab mix toward a near-neutral dark ink desaturates the cream plate → gray. The base `--card` is warm (`hsl(30 85% 96%)`, OKLab C 0.0062) but the darken pulls it toward the low-chroma ink.
- **M-B — the viz field ink is invisible/faint over the light page.** Paper-grid `fieldAlpha`/`minorAlpha` and concentric `lineWidth`/amplitude are calibrated for a DEMO over a dark/busy backdrop; over the cream content page the warm ink at 4% has no contrast.
- **M-C — the motion lacks weight.** `usePointerVelocityField` lerps + the per-viz push constants are linear/critically-damped (no overshoot/bounce); the field reads as drag-follow, not inertial liquid weight per [[feedback-liquid-weight-universal]].

---

## §1 — GRAY-GLASS fix (M-A): warm the composited plate, abrogate the gray cast

### The single mechanism: lift the FLOOR of the warm-ink darken so the plate STAYS warm-cream

The W55 darken is correct in PRINCIPLE (legibility over bright backdrops) but over-pulls the cream
plate toward neutral on the FLOATING/dock band where it darkens UNCONDITIONALLY. The fix is NOT to
disable the darken (that breaks AA) — it is to make the warm-ink TARGET carry chroma so the mix stays
warm, AND to bound the floating-band darken so a calm-light surface does not gray.

#### A-1. Mint a WARM darken-ink distinct from the neutral `--foreground` (the load-bearing change)

`--glass-tint-ink` currently resolves `var(--foreground)` (= `hsl(24 10% 10%)`, OKLab C≈0.012 — low
chroma). Mixing a warm-cream plate TOWARD a low-chroma dark ink desaturates it. Mint a **warm-chroma
darken ink** the bright bucket re-points to instead:

`tokens/glass-fx.css` (beside `--glass-tint-ink`):
```css
/* BD — the WARM darken target. The over-light plate darkens toward a CHROMATIC warm ink
   (the BA.W-NO-GRAY warm identity hue), NOT the near-neutral --foreground — so the
   darkened plate STAYS warm-cream, never grays. Derived from --foreground via relative
   color so a consumer re-anchoring --foreground re-resolves it warm (the lockstep). */
--glass-tint-ink: oklch(from var(--foreground) l max(c, 0.045) clamp(40, h, 75));
```
- `max(c, 0.045)` floors the chroma off the gray floor (STRONG_FLOOR 0.020 × ~2 for the mix dilution).
- `clamp(40, h, 75)` pins the hue into the warm-amber band (`WARM_HUE_LO/HI` the gate already defines).
- `oklch(from …)` is the `css-relative-color` idiom already LIVE in the dark arm (`BB.W-DARK-INK-WARM`),
  Safari 16.4+/Chrome 119+. The fence note in glass-fx.css §`AW.W23` warns against an `oklch(from …)`
  LIGHTNESS shift in the glass-tint mix — this is a CHROMA/HUE floor at the SAME L, not a lightness
  shift, so the fence holds (recorded: "the relative color is the INK SOURCE, not the mix space" — the
  exact `BB.W-DARK-INK-WARM` precedent).

#### A-2. Lower the FLOATING/dock band's unconditional darken floor on a calm light page

The content tiers already floor at `--glass-tint-strength-floor: 4%` (sub-perceptual silhouette). The
FLOATING/overlay band keeps the UNCONDITIONAL clamp toward 20% even on a calm page (that is the gray
in `live-concentric-2.png`). Re-point the floating band to the SAME continuous observer-driven clamp
the content tiers use (it already references `--glass-backdrop-luma` — `ladder.css:224`), so a CALM
light page (no measured bright backdrop) floors at 4% warm-cream, and the 20% AA darken engages only
under a MEASURED bright backdrop. **This is already the shape at `ladder.css:212-243`** — the floating
band reads the continuous clamp. The remaining gray is purely M-A-1 (the neutral ink target); A-1
fixes it. NO floating-band recipe change needed beyond A-1 — verify the clamp floors correctly.

#### A-3. Lift the dock plate's own warm floor (`--glass-bg-dock` reads the warm ink in lockstep)

`--glass-bg-dock` (glass.css:268) already composes `color-mix(in oklab, …, var(--glass-tint-source)
var(--glass-tint-strength))`. With A-1 re-pointing `--glass-tint-ink` (which `--glass-tint-source`
re-points to under the bucket) to the warm ink, the dock inherits the warm darken automatically — no
dock recipe edit. The dock's `--glass-saturate-dock: 1.4` (glass.css:124) already lifts chroma THROUGH
the plate; verify it survives the darken (it composes on the backdrop-filter, orthogonal to the bg mix).

#### A-4. (optional reinforcement) lift `--card`'s chroma a hair so the warm survives a deeper mix

`--card: hsl(30 85% 96%)` → OKLab C 0.0062. The mix toward ink dilutes it. If A-1 alone does not clear
the gate's `WARM_PLATE_FLOOR` (0.01) on the floating composite, lift `--card` toward `hsl(32 90% 96%)`
(C≈0.0075, L held within `L_TOLERANCE` 0.02). This is a chroma-only move at constant L — the
`proof:no-gray` W2 `card-carries-warm-bias` + the contrast contract both hold. **Prefer A-1; use A-4
only if the composite witness is still below floor.**

### Token summary (GRAY-GLASS)

| token | file | from | to | rationale |
|---|---|---|---|---|
| `--glass-tint-ink` | `tokens/glass-fx.css:162` | `var(--foreground)` | `oklch(from var(--foreground) l max(c,0.045) clamp(40,h,75))` | the warm-chroma darken target — the plate stays warm-cream under the darken |
| `--card` (light) | `tokens/color-radius.css:72` | `hsl(30 85% 96%)` | `hsl(32 90% 96%)` *(only if needed)* | a hair more chroma to survive deeper mixes |
| *(no change)* | `ladder.css:212-243` | — | — | the floating-band continuous clamp is already correct; A-1 supplies the warm target it mixes toward |

---

## §2 — VIZ-FIELD VISIBILITY fix (M-B): the warm ink must READ over the light page

The paper-grid field is invisible because the warm ink composites at ~4% over the L98 page. Two
token-first levers (NO shader edit — the color comes from uniforms the JS supplies):

#### B-1. Paper-grid — lift the field contrast over a light backdrop (constants, not shader)

`DEFAULT_PAPER_GRID_CONFIG` (constants.ts):
- `minorAlpha: 0.04 → 0.07`, `majorAlpha: 0.11 → 0.16` — the kf graph-grid reference is 3%/11% over a
  WHITE sheet where the ink is near-black; here the ink is warm-mid (L0.62), so it needs more alpha to
  read. Still SUBTLE ("felt, not loud").
- `WARM_IDENTITY_INK: { L: 0.62, C: 0.05, h: 62 } → { L: 0.46, C: 0.06, h: 58 }` — DARKEN the ink so it
  reads over the L98 cream page (a mid-L ink at 4% over near-white is invisible; a darker warm ink
  carries the line). L0.46 is still warm material (not near-black `--foreground`), keeps C off the gray
  floor. **The SFC resolves the live `--foreground` at mount** (constants note line ~"the SFC resolves
  the live --foreground token at mount") — so the more durable fix is in the SFC's token-resolution: it
  should resolve `--foreground` (L0.216 warm) and composite at the lifted alpha. Verify the SFC reads
  the warm token, not the SSR fallback stop. If the SFC already uses `--foreground`, only the alpha
  lift (above) is needed; the stop is the SSR fallback.

#### B-2. Concentric — thicken + brighten the rings so they read as distinct waves

`DEFAULT_CONCENTRIC_CONFIG` (constants.ts:111+):
- `lineWidth: 1.4 → 2.0` — thicker strokes read as distinct waves over the cream page (the `uLine.x`
  lineHalfWidth uniform; no shader edit).
- `WARM_IDENTITY_PALETTE` crest `{ L: 0.66, C: 0.105, h: 44 } → { L: 0.56, C: 0.13, h: 40 }` — a deeper,
  more saturated ember crest so the dense-pack rings carry contrast; the trough/mid stay light so the
  ramp still reads warm-light interference.

These are CONSTANTS edits (the WARM-IDENTITY fence in each file forbids teal/navy `h∈[180,280]` — both
edits stay warm `h∈[40,80]`, so `proof:viz-papergrid` P5 / `proof:concentric` clause 5 stay GREEN).

#### B-3. (the shared-field opportunity, RESEARCH note — NOT required for the fix)

paper-grid uses `curlFBM` (flow.glsl level-set/topology basis); concentric uses `sampleRingField`
(radial-Fourier sum + IQ isoline distance). They do NOT share a chunk today. A SHARED level-set/gradient
chunk (`isolineDE(field, gradMag)` — the IQ gradient-normalized distance-to-isoline both already inline)
COULD be factored into a new `src/composables/glass/webgl/shaders/topology.glsl.ts` (the
`procedural-color.glsl.ts` / `flow.glsl.ts` precedent: a basis-agnostic `/* glsl */` string the host
splices, the host owns the field). This is the ≥3-consumer shared-chunk discipline (paper-grid +
concentric + a booked successor). **This is a refactor, NOT a defect fix — it changes ZERO paint
(byte-isomorphic splice). Book it; do NOT block the gray-glass/visibility fix on it.** If pursued, the
WGSL twins (`topology.wgsl.ts`) ride the same splice; `proof:gpu-substrate-single` parity holds.

---

## §3 — MOTION fix (M-C): inertia/weight/bounce on the field + cursor gravity

[[feedback-liquid-weight-universal]]: ALL motion carries inertia/weight/bounce/squish. The pointer
field today is a critically-damped lerp (no overshoot). Two levers — the shared field constants + the
per-viz push mapping — both compositor-only + PRM-carved (the `tick(0)` freeze is already wired).

#### C-1. `usePointerVelocityField` — give the smoothed position INERTIAL overshoot

The field smooths position via `posK = 1 - (1-positionLerp)^(dt·60)` (line 235) — a pure exponential
ease, no momentum. To carry WEIGHT, the position should OVERSHOOT slightly on a fast flick then settle
(the iOS rubber-band). The minimal change preserving the no-rAF/PRM discipline:

- Add an optional `inertia?: number` (default 0, the byte-identical no-op) that blends a velocity-led
  TARGET into the eased position: `target' = position + velocity * inertia * dt`. At `inertia > 0` the
  smoothed position LEADS the cursor on fast motion + trails on stop (the momentum tail) — the
  directional lead paper-grid's note already wants ("a transient cursor from BOTH position AND
  velocity"). This is a derived-chain refinement, NOT a second engine, NOT a spring import (stays
  vue-only → root-barrel safe per the precedent).
- Lower `velocityLerp 0.3 → 0.22` and `burstDecay 0.96 → 0.97` for a LONGER momentum tail (the flick
  bloom lingers — weight). The accel term (the second derivative) already drives the burst; keeping its
  lerp at 0.3 keeps the push impulse crisp.

These are DEFAULTS on the shared field, so all three vizzes inherit the weight in one edit. PRM still
freezes via `tick(0)` (the inertia term multiplies `velocity` which is zeroed under reduce).

#### C-2. per-viz push mapping — squish/bounce on the response

- **dot-matrix** (`useDotMatrix.ts:112`): `targetPush = modeSign * min(0.35, 0.08 + speed*0.6)` is a
  linear clamp. For BOUNCE, the push should not snap to the target — it should be driven through a
  spring-like response. The push is a closed-over scalar the renderer reads each frame; ease it toward
  `targetPush` with an overshooting blend (`push += (target - push) * 0.18` with the burst adding a
  transient over-push) so a fast flick visibly over-pushes then settles. The `push.bloom` already eases
  (`max(bloom*0.9, burst)`) — extend the same to the position push.
- **paper-grid** (`usePaperGrid.ts`): the cursor bulge in GRID space reads position + velocity; widen
  the velocity LEAD so the bulge over-leads on fast motion (the liquid drag-and-release).
- **concentric** (`useConcentric.ts`): the transient cursor ring-center — let its WEIGHT (the `cj.z`
  center weight) bloom with `burst` so a flick injects a momentary ripple swell (the accel→ripple the
  note names).

These per-viz mappings read the SHARED field's `velocity`/`acceleration`/`burst` (no new field state)
— the field owns the physics, the viz owns the visual mapping.

#### C-3. CSS-side weight (the dock/chrome that responds to the field)

The dock plate + any chrome morph already ride `--spring-dock`/`--spring-snappy` (the calibrated
overshooting `linear()` curves in `scheme-motion.css:236-264`, each paired with its `-duration` settle
clock). NO new spring token — the weight is already in the spring family. Verify any new motion legs
compose `--spring-snappy` + `--spring-snappy-duration` (P4 mandate), SPATIAL-only (transform/scale),
and carry the `useLiquidFlex` reciprocal squish where a plate deforms (the volume-preserving X/Y squish
the tabs-indicator + dock-morph already share). No re-fork: `useLiquidFlex` is the ONE squish primitive.

### Token/constant summary (MOTION)

| lever | file | from | to |
|---|---|---|---|
| `inertia` (new opt) | `usePointerVelocityField.ts` | — | default 0, viz pass ~0.06 |
| `velocityLerp` default | `usePointerVelocityField.ts:155` | 0.3 | 0.22 (longer tail) |
| `burstDecay` default | `usePointerVelocityField.ts:157` | 0.96 | 0.97 |
| push easing | `useDotMatrix.ts:112` | linear clamp | eased over-push blend |
| *(no new spring token)* | `scheme-motion.css` | — | compose `--spring-snappy` + squish via `useLiquidFlex` |

---

## §4 — GATE IMPACT (extend, never break)

### `proof:no-gray` (the warm-chroma SOURCE + composite gate) — EXTEND IN PLACE

The gate ALREADY computes composited-plate chroma witnesses (`card-plate-warm-light`,
`floating-plate-warm-light`, `plate-warm-hue-light` — proof-no-gray.mjs:358-377) against
`WARM_PLATE_FLOOR 0.01` + `WARM_HUE_LO/HI`. The A-1/A-4 changes are GREEN under these (they LIFT the
composited chroma). Extend with NEW witnesses (born-RED on HEAD, GREEN after fix):

1. **`tint-ink-is-warm-chroma`** — assert `--glass-tint-ink` resolves OKLab C ≥ 0.040 at warm hue (the
   A-1 warm darken target; HEAD `var(--foreground)` resolves C≈0.012 — born-RED).
2. **`darkened-floating-plate-stays-warm`** — composite `--card` over the page THEN mix toward the new
   `--glass-tint-ink` at `--glass-tint-strength-aa` (20%) and assert the result OKLab C ≥
   `WARM_PLATE_FLOOR` AND H ∈ [40,75] (the EXACT gray-slab the capture shows — born-RED on the neutral
   `--foreground` target, GREEN on the warm ink).
3. **the `oklch(from …)` ink-source fence note** (positive) — record that the relative color is the INK
   SOURCE not the mix space (the `BB.W-DARK-INK-WARM` precedent), so the AW.W23 fence holds.
4. **self-test bite** — a synthetic `--glass-tint-ink: var(--foreground)` (the HEAD neutral form) MUST
   red witness #2.

The OKLab plumbing + `composite()` + `oklchOf()` helpers ALREADY EXIST in the gate (lines 62-194) —
the new witnesses reuse them. NO new gate file.

### `proof:viz-papergrid` / `proof:concentric` — STAY GREEN by construction

The B-1/B-2 constant edits keep `h ∈ [40,80]` (warm), so the `P5`/`clause-5` teal/navy bites
(`h ∈ [180,280]`) stay GREEN. If the gates assert specific default VALUES (alpha/lineWidth literals),
re-pin those literals in the gate (the no-backwards-compat clean break — update the assert to the new
values; the gate is the source of truth on the default).

### `proof:no-layout-animation` — the MOTION changes are compositor-only

The C-1/C-2 changes write to `transform`/`scale`/uniform pushes + custom-property drives — NO layout
property. The field freeze under PRM (`tick(0)`) is preserved. `proof:no-layout-animation` stays GREEN.
No new `@keyframes` minted (the spring weight is already in `--spring-*`).

### `proof:pointer-velocity` (V1-V5) — EXTEND for the inertia term

The gate asserts the accel term is "derived not a stub" (V4) + the PRM `tick(0)` freeze (V3). Add a
witness that the new `inertia` opt is a no-op at default 0 (byte-identical) AND zeroes under PRM (the
velocity it multiplies is zeroed). Reuse the existing math unit test.

### `proof:ba-gestalt` (the visual close oracle)

The substrates band (paper-grid, concentric, dot-matrix) verdicts re-earn on a FRESH capture at the
reflect wave — the binding paint truth that the field READS + the plate is warm-cream + the motion
carries weight. This is the gestalt verdict, not a per-mechanism π.

---

## §5 — The composition discipline (no re-fork, no-dual-path) — verified

- **GRAY-GLASS**: re-points ONE existing token (`--glass-tint-ink`) the W55 seam already reads + the
  existing oklab tint mix. NO new compositing seam, NO second darken recipe, NO `@supports` fork. The
  `--card` lift (if needed) is a chroma-only constant move. The `oklch(from …)` idiom is already live.
- **VISIBILITY**: CONSTANTS edits only (the uniforms the JS supplies); NO shader edit (the GL/WGSL fence
  is binding — the color comes from uniforms). The optional shared-topology chunk is byte-isomorphic +
  booked, not blocking.
- **MOTION**: the inertia term is an additive default-0 opt on the ONE shared `usePointerVelocityField`
  (NO second field, NO spring import — stays vue-only/root-barrel-safe). The per-viz push easing reads
  the SHARED field state. The spring weight is the EXISTING `--spring-*` family + `useLiquidFlex` (the
  ONE squish primitive); NO new spring token, NO new squish recipe.
- **iOS-27 Liquid Glass six-layer composite** is honored: A-1 keeps the WARM TINT layer warm-cream (not
  gray); the rim (`--glass-rim-top`/`-bottom`), inner catch-light (`.glass-material::before` specular),
  drop shadow (`--glass-shadow-*`), grain (`--glass-grain-opacity`), backdrop blur+saturate
  (`--glass-blur-*` + `--glass-saturate-*`) are ALL untouched + already correct. The defect was ONLY the
  tint layer graying — A-1 fixes the one broken layer.
- **PAPER-morphism**: B-1 makes the paper grid READ (the `--paper-grain-opacity 0.08` register
  BD.W-PAPER-MORPHISM already lifted the paper grit; this lifts the GRID ink to match).
- **PRM-carved + Safari-compatible**: `oklch(from …)` Safari 16.4+; the spring `linear()` curves + the
  `tick(0)` freeze + the SPATIAL/EFFECTS split all PRM-carved by construction.

---

## §6 — Ordered change list (the FIX, minimal)

1. **`tokens/glass-fx.css:162`** — `--glass-tint-ink` → warm-chroma `oklch(from …)` form (A-1). *[the
   load-bearing gray-glass fix]*
2. **`scripts/proof-no-gray.mjs`** — add witnesses #1-#4 (§4), born-RED→GREEN.
3. **`paper-grid/constants.ts`** — `minorAlpha 0.07` / `majorAlpha 0.16` + verify the SFC resolves the
   warm `--foreground` (B-1).
4. **`concentric/constants.ts`** — `lineWidth 2.0` + deepen the crest stop (B-2).
5. **`usePointerVelocityField.ts`** — add `inertia` opt (default 0) + `velocityLerp 0.22`/`burstDecay
   0.97` (C-1); extend `proof:pointer-velocity`.
6. **per-viz push easing** (`useDotMatrix.ts` et al.) — eased over-push + burst bloom (C-2).
7. *(optional, booked, NON-blocking)* — `topology.glsl.ts` shared level-set chunk (B-3).
8. *(only if the composite witness is still below floor)* — `--card` chroma lift (A-4).

Files touched: `tokens/glass-fx.css` (1 line), `tokens/color-radius.css` (1 line, conditional),
2 viz `constants.ts`, `usePointerVelocityField.ts` + 1-3 viz composables, `proof-no-gray.mjs` +
`proof-pointer-velocity.mjs`. ZERO shader edits. ZERO new files (the optional chunk is booked).
