# RESEARCH-3 — the FIX MECHANISM (glass-ui internals): the iOS-27 anim re-tune + the gray-glass close

**Role:** map the EXACT glass-ui tokens/recipes to retune. NO re-fork, no-dual-path — COMPOSE
the shipped primitives, extend the gates in place. North star: design.md + the iOS-27 six-layer
Liquid-Glass optical composite + glass+PAPER morphism + BA.W-NO-GRAY warm-chroma floor (glass is
warm MATERIAL, never gray) + `feedback_liquid_weight_universal` (inertia/weight/bounce/squish on
ALL motion). Compositor-only, PRM-carved, Safari-compatible. NO quick workarounds.

---

## TL;DR — the two halves

| Half | State at the BD working tree | The actionable mechanism |
|---|---|---|
| **GRAY-GLASS** | **LARGELY LANDED** by `BD.W-GLASS-ABROGATE-GRAY` + `BD.W-NAV-DOCK-FIX` + `BD.W-DOCK-CORE`. `proof:no-gray` is FULLY GREEN. The light `--card` is `hsl(30 85% 96%)` (composites C 0.0064→0.0142 warm H 67-73°), dark `--card` `hsl(26 22% 17%)` (C 0.0127→0.0186 warm H 59°), the dock carries `saturate(1.4)`, the dark arm carries the W-DARK-MATERIAL `saturate/brightness` light-glow companions. | NO further token edit owed for the floor. The OPTIONAL refinement (if the gestalt lens still reads a hair cool over a busy/very-light backdrop) is a sub-perceptual `--glass-saturate-*` lift on the light content rungs — recorded below as a bounded, gate-safe knob. |
| **MOTION** | **IN-FLIGHT.** The `dock` spring is re-tuned `{0.32,0.7}→{0.56,0.58}` (the weighty gooey morph, +10.7% overshoot) in `springPresets.ts` — but (1) the regen has NOT been run so `scheme-motion.css` still emits the OLD `--spring-dock`/`-duration`, and (2) `proof:spring-ease` S2/S4 still pin the OLD dock → it is **RED**. | Run `node scripts/regen-spring-tokens.mjs`; extend `proof:spring-ease` `OVERSHOOT_MAX.dock` 0.06→0.12 + re-anchor the S4 byte-frozen KEEP to (0.56,0.58). The squish caps are already lifted (tab 1.15). Optional: lift `--scale-press-*` magnitude for more press-squish. |

---

## PART A — THE MOTION RE-TUNE (the headline)

### A.0 The shipped spine (READ — never re-forked)

ONE source of truth: `src/composables/motion/springPresets.ts` `SPRING_PRESETS` — the
`(response, dampingFraction)` table. BOTH the CSS `--spring-*` `linear()` tokens
(`scripts/regen-spring-tokens.mjs` → `src/styles/tokens/scheme-motion.css`) AND the JS
`MOTION_CURVES` twins derive from it. Edit the table, run regen, both halves re-emit — drift-proof
by construction. The squish is `useLiquidFlex.ts` (ONE engine; reciprocal `--stretch`, `tanh`/
`linear` laws, the LOW `maxStretch` cap). The press is `useSpringPress`/`useLiquidPress`; the bloom
`useLiquidReveal`; the pull `useDragMorph`. The canon is `docs/precepts/motion-canon.md` P1-P7.

### A.1 The current register table (analytic, verified)

```
preset   response  ζ      settle   overshoot   register
smooth   0.50      0.86   0.36s    +0.5%       SETTLE — entrances/fades/scale-ins, no overshoot
snappy   0.42      0.78   0.34s    +2.0%       CONTROL — tab underline / progress fill / reveal bloom
bouncy   0.50      0.55   0.57s    +12.6%      PLAYFUL — dialog/success/VT/toggle, the Apple 12-18% band
gentle   0.70      1.00   0.44s    +0.0%       GENTLE — patient critically-damped, --ease-convergence alias
dock     0.56      0.58   0.60s    +10.7%      DOCK — the WEIGHTY gooey morph (collapse/expand/V↔H/fission)
press    0.15      0.86   0.11s    +0.5%       PRESS — Apple interactiveSpring, sub-100ms tap
```

The `feedback_liquid_weight_universal` law (P7) wants inertia + weight + bounce + squish on ALL
motion. The two registers that the law most directly governs:

- **`dock` (the WEIGHTY morph)** — already eased to `{0.56,0.58}` (+10.7%, settle 0.6s, the slow
  inertial gooey settle). This IS the liquid-weight re-tune. It is byte-applied to the table but
  needs the regen + the gate update (A.3).
- **`snappy` (the CONTROL register)** — read by `glass/reveal.css` (the bloom of EVERY top-layer
  surface), the tab indicator, the progress fill, the `.scroll-build`/`.scroll-cascade` entrances.
  At ζ=0.78 / +2.0% it is QUICK with a whisper of life. The liquid-weight law tolerates this AS-IS
  (it is the CONTROL register, not the PLAYFUL one — a tab pill that rings reads broken). **DO NOT
  push snappy lower than ζ 0.78** — the gate `OVERSHOOT_MAX.snappy = 0.08` and the S1 clock-fill
  band `[0.55, 0.70]` bound it; ζ 0.78 lands t₉₀/clock ≈ 0.57 (in-band). Entrances that WANT the
  bounce ride `--spring-bouncy` (P7b enter-bouncy), not a re-tuned snappy.

### A.2 THE REGEN STEP (the missing emit — REQUIRED)

The working tree has `springPresets.ts` `dock = {0.56, 0.58}` but `scheme-motion.css` STILL emits
the OLD `--spring-dock` curve + `--spring-dock-duration: 0.6s` (verified: `git diff --stat
scheme-motion.css` shows a 3-line pending rewrite; the regen dry-run rewrites it). **Mechanism:**

```
node scripts/regen-spring-tokens.mjs
```

This rewrites the 6 `--spring-*` `linear()` tokens + the 6 `--spring-*-duration` clocks in
`src/styles/tokens/scheme-motion.css` from the table. It is idempotent (a no-op when synced). After
the regen the emitted `--spring-dock-duration` re-derives to the analytic 2%-band settle (≈0.6s at
0.56/0.58; W-DOCK-CORE's prose "≈0.78s" is the OLDER target — the generator emits the analytic
value, which is the binding number `proof:spring-ease` S5 asserts). `proof:spring-tokens-synced`
already passes (const==preset); the regen closes the CSS-emit half.

> **Gate fact:** `proof:spring-ease` S5 asserts each `--spring-*-duration` is the EXACT analytic
> `t_s = -ln(0.02)/(ζ·ωₙ)`, ωₙ=2π/response, rounded to 10ms — never a hand value. The regen is the
> only sanctioned writer. A hand-truncated clock re-introduces the W-GLASS-CAL tail-jank (REDS).

### A.3 THE GATE EXTENSION (the dock overshoot cap — REQUIRED, born-RED → GREEN)

`proof:spring-ease` is RED on the working tree (verified):

```
✗ S2: dock overshoot 0.1068 exceeds its register cap 0.06 (ζ 0.58)
✗ S4: the kept `dock` row drifted to (0.56, 0.58) — it must stay byte-frozen (0.32, 0.7)
```

The weighty re-tune is DELIBERATE (the liquid-weight law); the gate's OLD cap + KEEP are stale.
**Mechanism — extend `scripts/proof-spring-ease.mjs` IN PLACE (no new gate, no new KEY):**

1. **S2 cap.** `const OVERSHOOT_MAX = { snappy: 0.08, press: 0.08, smooth: 0.02, dock: 0.06 }`
   → bump `dock: 0.06` to **`dock: 0.12`** (the audacious weighty overshoot; +10.7% is the gooey
   morph the user wants, BELOW the 12.6% bouncy ring — dock is weighty-not-ringy). Keep
   `snappy`/`press`/`smooth` byte-frozen (the control/press/settle registers must NOT ring).
2. **S4 byte-frozen KEEP.** The `KEEP` anchor that pins dock to `{0.32, 0.7}` (the
   `proof:spring-ease.mjs:608` keep-table + the S4 self-test) must re-anchor to **`{0.56, 0.58}`**.
   Re-point the keep-table row AND the S4 drift self-test seed (the self-test plants a DIFFERENT
   drifted value and asserts it reds — re-seed it off the NEW frozen pair).
3. **The comment.** Record the re-tune rationale (the BD weighty gooey morph / liquid-weight law)
   beside the cap — the gate's own header names "the eased curves"; dock joins the eased set.

This is the disposition `W-DOCK-CORE` owns (MOVE I). It is recorded here because the **`proof:
spring-ease` arm is the gap not yet closed in the working tree** — the fix agent must run the regen
AND extend this gate, or the close reds.

### A.4 THE SQUISH CAPS (more morph-on-move — P7c)

ONE engine: `useLiquidFlex.ts`. The `maxStretch` LOW cap is the volume-preserving gel ceiling
(`raw > cap ? cap : raw` — never taffy). Current consumer caps:

| Consumer | Token / default | Value | Verdict |
|---|---|---|---|
| `useLiquidFlex` default | `params.maxStretch ?? 1.08` | 1.08 | KEEP — the conservative floor |
| Tab indicator | `--tab-indicator-max-stretch` | **1.15** | ALREADY LIFTED (the liquid tab squishes ~+15% — strong) |
| `useDragMorph` | `params.maxStretch ?? (() => 1.08)` | 1.08 (reads the live tab cap) | KEEP — reads `--tab-indicator-max-stretch` |
| `useLiquidPress` | `options.maxStretch ?? 1.04` | 1.04 | KEEP — a press is a SMALL squish |
| `useLiquidMorph` (fission) | `maxStretch: 1.08 / 1.1` | 1.08-1.1 | KEEP — the bud-off swell |

**The squish is already tuned for liquid-weight** — the tab indicator at 1.15 is the strongest,
the press at 1.04 the gentlest (correct — a press is a subtle gel, an indicator a lively swell). NO
cap change is owed for the floor. The OPTIONAL refinement (if a surface still reads "snappy not
gooey"): a consumer raises `--tab-indicator-max-stretch` per-scope (it is an inheriting cascade
token a host overrides — no primitive edit). The cap stays ≤ ~1.18 (the iOS anti-taffy bar).

> **Fence (P7c / proof:liquid-weight-law L3):** the squish is the ONE `useLiquidFlex` engine. A
> hand-rolled `1+tanh(...)` or `1+frac·(cap−1)` second write REDS. To get more squish, raise the
> CAP (a token), never fork a second curve.

### A.5 THE PRESS-SQUISH magnitude (optional — more tactile press)

`--scale-press: 0.96`, `--scale-press-sm: 0.97` (`scale-paper.css`). `--scale-press-btn` reads
`-sm` (0.97), `--scale-press-dock` reads `--scale-press` (0.96). These are the CSS no-JS floor; the
JS press (`useSpringPress`/`useLiquidPress`) drives the spring-coupled scale + the `--*-press-t`
brightness/specular leg (P3). If the press reads too subtle, the gate-safe knob is to deepen the
press scale (`--scale-press: 0.96 → 0.95`, `-sm: 0.97 → 0.96`) — a single token re-point that
re-resolves every `:active` press in lockstep. NOT a primitive edit; bounded (a press deeper than
~0.94 reads as a collapse). This is OPTIONAL polish, not a floor fix.

### A.6 The dock morph chrome blur (W-DOCK-CORE MOVE I — recorded, owned elsewhere)

The weighty morph also dials the self-blur `3px → 1.25px` + front-loads its decay (`morph.css:
79-80`) and re-keys the child stagger symmetric-about-center with a center-coupled `scale` (off the
`translateY` rise — `layers.css:337-375`). This is the COMPOSITOR-only morph chrome that reads as
the gooey center-out grow. It is W-DOCK-CORE's surface arm; recorded here so the motion picture is
complete (the spring is the CLOCK, this is the per-frame transform it drives).

---

## PART B — THE GRAY-GLASS CLOSE (largely LANDED; the floor is solid)

### B.0 The state — `proof:no-gray` is GREEN (verified)

The BD branch already closed the gray-glass class. The key landed token moves:

| Token | HEAD (gray) | BD (warm) | File |
|---|---|---|---|
| `--card` light | `var(--neutral-0)` (C 0.0017) | **`hsl(30 85% 96%)`** (C 0.0148 raw, H 67.7°) | `color-radius.css:72` |
| `--card` dark | `hsl(24 8% 16%)` (C 0.0066) | **`hsl(26 22% 17%)`** (C 0.0186@0.80, H 59.8°) | `dark-arm.css:74`, `light-dark.css:101` |
| `--glass-saturate-{wash,quiet,resting}` light | (baked 1.05) | **1.4** | `glass.css:113-115` |
| `--glass-saturate-{floating,overlay}` light | (baked 1.18/1.2) | **1.6** | `glass.css:116-117` |
| `--glass-saturate-dock` light | (none — the flat-slab root) | **1.4** | `glass.css:124` |
| `--glass-blur-dock` | `blur()` only | `blur() saturate(1.4) brightness(1.02)` | `glass.css:155-158` |
| `--glass-tint-ink-dock` | (gray near-black) | **`oklch(from var(--foreground) 0.42 0.05 h)`** (warm-chromatic) | `glass-fx.css` |
| dark `--glass-saturate-*` + `brightness(1.16-1.18)` | (flat) | the W-DARK-MATERIAL light-glow companions | `dark-arm.css:249-255` |

**Composited verification (the binding numbers the gate asserts):**
- Light `--card` over the warm-cream page: resting (0.65) → **C 0.0106 H 69.3°**, floating (0.80) →
  **C 0.0124 H 68.5°**, wash (0.30) → C 0.0064 H 73.0°. All ≥ `WARM_PLATE_FLOOR (0.01)` at resting+
  in the warm register [45,85]°. (Wash sits below 0.01 but clears its own `PLATE_FLOOR*0.6` arm —
  a near-white 0.30-α plate is gamut-bound; the gate's G8 arm covers it.)
- Dark `--card` over the dark page: 0.50 → C 0.0127, 0.65 → C 0.0155, 0.80 → **C 0.0186** H 59.2°.
  All ≥ `WARM_PLATE_FLOOR` at the warm hue — the charcoal-gray gone.

**Conclusion: NO further token edit is owed to lift the floor off gray.** The recipes are the
six-layer iOS composite: `backdrop-filter: blur() saturate()` (the light-concentration), the warm
`--card` tint, the `--glass-border-*` warm-ink rim (4-8%), the `::before` catch-light core, the
per-tier under-shadow, the grain `::after`. All carry warm chroma.

### B.1 The recipe map (where the warmth lives — for the fix agent's reference)

- **The plate fill** — `--glass-bg-{tier}` (`glass.css:261-297`): the `--glass-level` compose
  recipe `color-mix(in srgb, var(--card) <effective-α%>, transparent)`. The warmth enters via
  `--card`. The dock/dialog/sheet/clear rungs ALSO wrap an `in oklab` `--glass-tint-source` mix (the
  W55 adaptive seam) — ZERO-delta at `--glass-tint-strength: 0%`.
- **The light-concentration** — `--glass-saturate-{tier}` (`glass.css:113-124` light /
  `dark-arm.css:249-255` dark): the LOAD-BEARING knob (apple-glass §4 — the saturate, not the blur,
  carries the "glass" read). The light arm at 1.4/1.6 lifts the warm-cream chroma THROUGH the plate.
- **The adaptive darken** — `glass/ladder.css`: the `:where(.glass-card,…)` content-tier floor
  (`--glass-tint-strength-floor: 4%`) + the `@container style(--glass-backdrop: light)` bright
  bucket (`--glass-tint-strength-aa: 20%` light / 12% dark) re-points `--glass-tint-source` →
  `--glass-tint-ink` (warm `--foreground`). Over a VERY-LIGHT backdrop the plate darkens toward the
  warm ink — never gray (the ink is warm H 56°/75°).
- **The rim/catch-light** — `glass-fx.css` (`--glass-rim-top`/`-bottom`, `--glass-specular-core`)
  + `glass/material.css` (the `::before` warm-cream catch-light). The directional rim carves the
  silhouette (the perimeter hairline retired to ≤5% — BC.W-BLACK-BAR).

### B.2 THE OPTIONAL light-content saturate refinement (gate-safe, IF the gestalt reads cool)

IF the W-GESTALT-WIRE lens still reads a hair cool/gray on a light content card over a busy/bright
backdrop, the bounded refinement is a sub-perceptual lift of the LIGHT content-rung saturate
(`glass.css:113-115`): `--glass-saturate-{wash,quiet,resting}: 1.4 → 1.45` (the dark arm already
sits at 1.30-1.35 — the light arm has headroom toward the apple.com 1.8 ceiling). **Gate impact:**

- `proof:glass-cal` (B1-B3) asserts the blur RADIUS only — saturate is OUTSIDE its frozen set
  (the comment names "the radius axis ONLY: saturate companions UNTOUCHED"). A saturate change is
  GREEN by construction there.
- `proof:no-gray` reads the COMPOSITED `--card`-over-page chroma, NOT the saturate token — a
  saturate lift only RAISES the painted chroma (the gate floors are minimums). GREEN.
- `proof:glass-legibility` L7 asserts `--glass-saturate-*` is a NAMED `:root`-overridable token
  (it is) — a value change is within its contract. GREEN.

This is a CONSUMER-tunable token (`:root { --glass-saturate-resting: … }`) — presets-in-consumers
applies, so the LIBRARY default lift is its identity evolving, not a consumer preset. Bounded ≤ 1.6
(the floating ceiling) so a content rung never out-saturates a floating panel.

> **Fences (BA.W-NO-GRAY / W-DARK-MATERIAL — binding):** the `--surface-tint-*` family stays `in
> srgb` (AW.W26 — never touch it); the dark `--glass-tint-strength-aa` 12% is FROZEN (the §2c
> per-mode lockstep); the warm lift is CHROMA-ONLY at constant L (the AA contrast contract — every
> AA pair re-ratified). A saturate lift moves chroma, not L — the contract holds.

---

## PART C — THE GATE-IMPACT SUMMARY (what each touch reds/greens)

| Touch | Gate | Impact |
|---|---|---|
| Run `regen-spring-tokens.mjs` | `proof:spring-tokens-synced` | already PASS; closes the CSS-emit half (the pending 3-line `scheme-motion.css` rewrite) |
| `OVERSHOOT_MAX.dock 0.06→0.12` | `proof:spring-ease` S2 | **RED→GREEN** (the dock weighty +10.7% now in-band) |
| S4 KEEP re-anchor `(0.32,0.7)→(0.56,0.58)` + re-seed self-test | `proof:spring-ease` S4 | **RED→GREEN** (the byte-frozen dock keep tracks the re-tune) |
| (no squish-cap change) | `proof:liquid-weight-law` L3 | GREEN — ONE engine, caps are tokens |
| (optional) `--scale-press` deepen | none frozen | GREEN — a token re-point |
| (optional) `--glass-saturate-resting 1.4→1.45` | `proof:glass-cal`/`no-gray`/`glass-legibility` | GREEN — saturate is outside the radius-frozen set; composited chroma only rises |
| (no `--card`/`--neutral-*` change) | `proof:no-gray` | already GREEN |

**The binding PAINT** (never the source gate alone): the per-instance π
(`tests-visual/{dock-core,no-gray,liquid-reveal,press-unify}.spec.ts`) + the
`proof:ba-gestalt` dock + glass-band + `liquid-weight` lens verdicts (both modes, Chromium +
WebKit, fresh `:5199` captures). The dock morph must read as a WEIGHTY gooey center-out grow
(not a snap); the glass must read warm-cream luminous (not gray).

---

## PART D — THE NORTH-STAR CHECK (the no-fork discipline)

- **NO re-fork / no-dual-path** — every change is a TABLE value (`SPRING_PRESETS`), a TOKEN
  (`--glass-saturate-*`, `--scale-press`, `--tab-indicator-max-stretch`), or a GATE-CONSTANT
  (`OVERSHOOT_MAX.dock`). ZERO new primitive, ZERO second spring family, ZERO second squish engine,
  ZERO second compose recipe. The regen re-emits from the ONE table.
- **Compositor-only** — the dock morph drives `transform: scale()` over a RESERVED footprint
  (`dockMorphContext` — byte-untouched); the squish is `--stretch` reciprocal scale; the press is
  `scale` + `filter`. `proof:no-layout-animation` holds.
- **PRM-carved** — the springs ride `respectReducedMotion` (snap to endpoint, zero transform
  frames, fade survives); the squish drops to 1 under reduce; the `--scale-press` `:active` carve is
  the no-JS floor. P6 holds.
- **Safari-compatible** — the `linear()` spring curves are Baseline 17.2+; the reveal blur rides
  `filter` (the surface's own pixels), not `backdrop-filter`; `color-mix(in oklab/srgb)` is
  Baseline. The whole re-tune is Safari-green.
- **Glass is warm MATERIAL** — every glass composite carries warm chroma (H 56-75°) off the warm
  `--card` + the saturate light-concentration; the adaptive darken re-points to the warm
  `--foreground` ink, never a gray. The BA.W-NO-GRAY floor is the binding bar; it is GREEN.

## Files the fix agent touches

- `src/composables/motion/springPresets.ts` — already `dock = {0.56,0.58}` (NO further edit).
- `src/styles/tokens/scheme-motion.css` — REGEN target (run `regen-spring-tokens.mjs`).
- `scripts/proof-spring-ease.mjs` — `OVERSHOOT_MAX.dock` + the S4 keep + self-test re-seed.
- (optional) `src/styles/tokens/scale-paper.css` — `--scale-press`/`-sm` deepen; `--tab-indicator-max-stretch` lift.
- (optional) `src/styles/tokens/glass.css` — `--glass-saturate-{wash,quiet,resting}` 1.4→1.45.
- NONE: `src/styles/tokens/color-radius.css`, `dark-arm.css`, `light-dark.css` (the no-gray floor
  is landed — DO NOT re-edit `--card`/`--neutral-*`).
