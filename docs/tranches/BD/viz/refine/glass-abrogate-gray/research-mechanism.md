# RESEARCH-3 — the FIX MECHANISM (glass-ui internals): abrogate the gray glass

**Role.** Map the EXACT tokens/recipes to retune so the glass reads as warm-cream
luminous Liquid Glass (the iOS-27 six-layer optical composite), never gray —
WITHOUT re-forking any primitive and WITHOUT breaking `proof:no-gray` (extend it).

**Binding north star.** `design.md` §"The six-layer composite" + the iOS-27 Liquid
Glass language (backdrop blur+saturate · warm tint · edge rim · inner catch-light ·
drop shadow · grain) + glass+PAPER morphism + the `BA.W-NO-GRAY` warm-chroma floor
(glass is warm MATERIAL, never gray) + `[[feedback-liquid-weight-universal]]`.

---

## 0. THE DEFECT — what the capture shows

`before-select-light.png` (the `/forms/select` route, light mode) shows the
`<Select>` open: the dropdown panel (a `.glass-floating` overlay) AND the trigger
plate (`.control-surface`, the `quiet` rung) AND the whole page read as a **flat
cold beige-gray slab** — no warm-cream luminosity, no edge rim catching light, no
sense of a transmissive pane lifted off a backdrop. It reads iOS-7-flat, not
iOS-26-liquid. This is the `R10-5 "No gray"` defect resurfaced at the GLASS-PLATE
composite (the token ladder is *specified* warm but the *painted plate* is gray).

## 1. ROOT CAUSE — the chroma collapses at the COMPOSITE, the gate's PLATE_FLOOR is too forgiving

The diagnostic (modelled with the same hsl→OKLab plumbing `proof:no-gray` uses;
`/tmp/composite-check.mjs`):

| Surface | recipe | painted OKLab |
|---|---|---|
| `--card` token alone | `hsl(36 48% 97%)` | L 0.980 · **C 0.0062** · H 75.4° |
| page `--neutral-0` | `hsl(40 30% 98%)` | L 0.985 · **C 0.0029** · H 84.6° |
| `.glass-floating` plate (card@0.80 over page) | dropdown panel | L 0.981 · **C 0.0051** · H 67.8° |
| `.control-surface` (quiet, card@0.50 over page) | trigger | L 0.983 · **C 0.0045** · H 78.3° |
| `.glass-floating` + 20% AA darken (bright bucket) | the "fix" makes it worse | L **0.844** · C 0.0043 · H 56.4° |

The OKLab perceptual "is-it-gray" floor is **~0.020**. Every painted plate lands at
**C 0.0045–0.0051** — a quarter of the floor. The HUE is correct (warm 67–78°); the
problem is **chroma magnitude**: the plate has almost no color, so it reads as
warm-tinted gray.

Three compounding mechanisms:

1. **`--card` is itself near-achromatic** (C 0.0062). It is the SOLE fill source for
   every glass rung (`color-mix(in srgb, var(--card) <α>, transparent)`), so the
   plate can carry no more chroma than `--card` does — and translucency dilutes it
   further toward the near-gray page (C 0.0029).
2. **The backdrop `saturate()` does nothing over a flat page.** The six-layer model's
   "concentrated light" reading comes from `backdrop-filter: saturate(1.05..1.18)`,
   but `backdrop-filter` saturates the **pixels BEHIND** the plate. Over an empty/flat
   light page there is nothing chromatic behind to saturate, so the saturate channel
   is inert and the plate reads as its own near-gray fill. (This is design.md's own
   §N7 note: "the dock is purely a translucent plate admitting backdrop pixels
   through" — over a flat page, no pixels, no glass read.)
3. **The W55 adaptive AA-darken makes it GRAYER, not warmer.** The overlay band
   self-engages a darken toward `--glass-tint-ink` (`--foreground`); at 20% the
   floating plate drops to L 0.844 / C 0.0043 — a *darker* gray. Darkening a
   low-chroma plate toward ink moves it through gray, never through warm material.

**Why `proof:no-gray` passes anyway (the gate hole to close).** The gate's
`PLATE_FLOOR = 0.0035` (declared "≥ 2× HEAD 0.0017"). It certifies "less gray than
the absolute-worst HEAD plate" — NOT "reads as warm-cream material." The painted
plate at C 0.0045–0.0051 clears 0.0035 and greens, while the eye still reads gray.
This is the exact `source-green / visually-broken` close-class the gate's own header
warns about — the SOURCE arm certifies a floor the PAINT does not meet.

---

## 2. THE FIX — three coordinated token retunes (compositor-only, no re-fork, no new recipe)

All three are **token-value** edits on the EXISTING compose seams. ZERO new
compositing path, ZERO primitive edit, ZERO new class. Each rides a recipe already
in the cascade.

### FIX-A (PRIMARY) — warm the `--card` plate-fill source so the COMPOSITE clears the warm-material floor

`--card` is the single fill source for every glass rung. Lift its chroma onto the
warm-amber identity so the *composited translucent plate* clears a real warm-material
floor while L stays luminous and the hue stays inside the `proof:no-gray` warm gate
(H ∈ [45,85]°).

**The hue-drift trap (load-bearing, recorded).** Naively raising hsl saturation
rotates the OKLab hue UP toward 84–90° (yellow-green) — the EXACT cast
`proof:no-gray`'s `WARM_HUE_HI: 85` forbids. The escape is to LOWER the hsl hue
(toward 30) as saturation rises, keeping OKLab H ≤ 78°. Sweep (`/tmp/warm-sweet.mjs`):

| candidate `--card` | card OKLab | `.glass-floating` plate (card@0.80/page) | AA fg/plate |
|---|---|---|---|
| HEAD `hsl(36 48% 97%)` | C 0.0062 H 75.4° | **C 0.0051** H 67.8° (GRAY) | 16.2 |
| `hsl(30 75% 96%)` | C 0.0130 H 71.3° | C 0.0113 H 71.9° | 16.30 |
| **`hsl(30 85% 96%)` ← PICK** | C 0.0147 H 70.9° | **C 0.0130 H 71.3°** | 16.32 |
| `hsl(34 85% 96%)` | C 0.0152 H 77.1° | C 0.0135 H 78.3° | 16.42 |

**Change (light arm, TWO lockstep sites — the §2c discipline):**

- `src/styles/tokens/color-radius.css` `--card`: `hsl(36 48% 97%)` → **`hsl(30 85% 96%)`**
- `src/styles/tokens/light-dark.css` `--card` light arg: `light-dark(hsl(36 48% 97%), …)` → **`light-dark(hsl(30 85% 96%), …)`** (the dark arg `hsl(24 8% 16%)` is W-DARK-MATERIAL's — UNTOUCHED)

Result: the dropdown panel composites at **C 0.013** (≈2.5× HEAD's 0.0051, into the
`CHIP_FLOOR`-class warm-material band), L 0.976 (still luminous warm-cream, not a
darkened slab), warm hue 71.3°, AA 16.3:1. The trigger `quiet` plate lifts to C
0.0113. The `--card`-derived family (Card/Button/Toast/Popover/Dialog/Sheet/Select-
content) ALL inherit the warm lift in ONE edit — the token-first single-family fix,
no per-surface hardcode.

**Optional sibling (keep proportion): the page `--neutral-0`.** The page itself is
C 0.0029 (the grayest surface). It is a `KEEP-NEUTRAL` surface in spirit (the warm-
cream page), but a small lift `hsl(40 30% 98%)` → `hsl(34 40% 98%)` (target OKLab
H ≤ 80°, C ≈ 0.004) keeps the page warm-cream behind the now-warmer plates so the
backdrop-through read does not contrast cold-page-vs-warm-plate. **Decision: HOLD
`--neutral-0` unless the live π shows a cold-page seam** — the page is the
`KEEP-NEUTRAL` luminance register, and `--card` decoupling from it (already the
design) is the sanctioned lever. FIX-A on `--card` alone clears the defect; touch
the page only if the seam reads.

### FIX-B — the AA-darken must NOT engage on the CALM Select/dropdown (it grays the plate)

The capture is a CALM light page (no busy/bright backdrop). The overlay band
(`:where(.glass-floating,.glass-overlay)`, `glass/ladder.css:212`) self-engages an
UNCONDITIONAL darken whose floor (in light) is `--glass-tint-strength-floor: 4%` and
whose continuous clamp ramps to `--glass-tint-strength-aa: 20%` as
`--glass-backdrop-luma` passes the knee. On a calm page the luma is the default 0
(no observer wired on a plain dropdown), so the clamp resolves the **4% floor** —
which is a SUB-PERCEPTUAL warm-ink whisper (drops the plate L 0.981→0.954, the
diagnostic confirms it stays warm). **The 4% calm floor is CORRECT and KEPT** — it is
not the grayness source (FIX-A is). The grayness source is purely the low fill chroma.

**No change to the AA seam values.** The W55/W-DARK-MATERIAL tint clamp,
`--glass-tint-strength-aa` (20%), `--glass-tint-strength-floor` (4% light / 12%
dark), and the continuous `--glass-backdrop-luma` clamp are **frozen bounds**
(W-DARK-MATERIAL's). FIX-A warms the FILL the darken composites over, so the darkened
plate now darkens through warm-cream (not through gray). The verification: with the
warmer `--card`, re-run the composite — the 4% floor plate stays C ≥ 0.011 warm.

**The one mechanism note:** confirm `--glass-tint-ink` stays `var(--foreground)`
(warm near-black) — it does (glass-fx.css). A darken toward warm ink over a warm-cream
fill is warm material; the defect was never the ink, only the fill chroma.

### FIX-C — make the SIX-LAYER composite actually READ (the edge rim + catch-light + saturate carry "glass" when there's no busy backdrop)

The capture's plate reads flat partly because over a calm page the only "glass"
signal is the fill (now warmed by FIX-A). The other five layers must carry the read:

1. **Edge rim — VERIFY it paints.** `--glass-rim-top` (`inset 0 1px 0 hsl(0 0% 100%
   / 0.30)`) + `--glass-rim-bottom` (warm under-shadow) compose into
   `--glass-material-rim` (glass/rim.css). On the dropdown panel this is the bright
   top catch-light + warm bottom ground that lifts the pane off the page. The
   per-rung `--glass-border-*` is ≤5% α (the BC.W-BLACK-BAR retirement — correct).
   **No change needed** — but the live π must confirm the rim PAINTS (the capture
   suggests it may be washing out against the near-white page; if so the fix is a
   per-rung rim α bump on the floating/overlay tier ONLY, NOT the perimeter border).

2. **Backdrop saturate — already at the design.md targets.** `--glass-saturate-
   floating: 1.18` / `--glass-saturate-overlay: 1.2` (glass.css). These carry the
   "concentrated light" read **only when there is a chromatic backdrop**. Over a flat
   page they are inert (§1.2). **No change** — the dropdown over a calm page relies on
   FIX-A's fill chroma + FIX-C's rim, not the saturate (which earns its keep over the
   aurora/page-substrate routes).

3. **Inner catch-light (`::before` specular)** — dormant at rest (intensity 0,
   material.css). Correct: an unwired static dropdown reads clean; the gleam tracks
   the pointer when armed. **No change.**

4. **Drop shadow** — `--glass-shadow-floating` (glass-fx.css) + the under-shadow
   ladder. Lifts the pane. **No change.**

5. **Grain** — `--glass-grain-opacity: 0.025` (glass-fx.css). The PAPER-morphism
   sibling `--paper-grain-opacity: 0.08` is the tactile register. **No change** to the
   glass grain (it is the calm perceptual floor by design).

**FIX-C verdict: the six layers are STRUCTURALLY present; the defect is FIX-A's fill
chroma starving the composite.** The only conditional FIX-C edit is a floating/overlay
rim-α bump IF the live π shows the rim washing against the near-white page (a 2-token
edit on `--glass-rim-top` α for the bright-page case — booked, not applied blind).

---

## 3. THE GATE EXTENSION — close the PLATE_FLOOR hole in `proof:no-gray`

The gate's `PLATE_FLOOR = 0.0035` is too forgiving — it greened a C 0.0045–0.0051
plate the eye reads as gray. **Extend `proof:no-gray` in place (no new gate, no new
KEY family):**

1. **Raise the composited-plate floor onto the warm-material band.** Add a new
   `WARM_PLATE_FLOOR = 0.010` constant (the `CHIP_FLOOR`-class warm-material
   threshold, ~2× the old `PLATE_FLOOR`, calibrated against the FIX-A composite C
   0.013 with headroom). Keep the existing `PLATE_FLOOR = 0.0035` as the *Button
   wash-plate* floor (the 0.30-α plate is genuinely thinner — FIX-A lifts it to ~0.008,
   so its assert uses `WARM_PLATE_FLOOR * 0.6 ≈ 0.006`). Re-point the existing
   `card-plate-warm-light` assert to `cardPlateC >= WARM_PLATE_FLOOR`. Born-RED on
   HEAD (0.0051 < 0.010), GREEN after FIX-A (0.013).

2. **Add a `.glass-floating` overlay-plate witness.** The current gate composites only
   the resting (0.65) + wash (0.30) rungs. Add the FLOATING (0.80) rung composite (the
   dropdown panel — the literal defect surface) and assert C ≥ `WARM_PLATE_FLOOR` at
   the warm hue. This is the witness that maps 1:1 to `before-select-light.png`.

3. **Add a HUE-on-the-PLATE assert.** The existing plate asserts check chroma but the
   `card-carries-warm-bias` row checks hue only on `--card`, not the composite. Add a
   `plate-warm-hue-light` assert: the floating composite OKLab H ∈ [WARM_HUE_LO,
   WARM_HUE_HI]. (FIX-A lands it at 71.3° — clean.)

4. **The π arm is the binding truth.** `tests-visual/no-gray.spec.ts` already exists
   (the gate references it). Extend its roster to include the `/forms/select` open
   dropdown plate (getComputedStyle → OKLab readback of the COMPOSITED panel
   background over the real page) and assert C ≥ 0.010 warm in both modes — the
   binding paint that the source-arm floor can never substitute for. The captured
   DELTA (a before/after of `before-select-light.png`) is the close artifact.

**Gate-impact summary:** `proof:no-gray` is EXTENDED in place (no new gate, no new
KEY) — one new constant (`WARM_PLATE_FLOOR`), one re-pointed assert
(`card-plate-warm-light`), two new asserts (`floating-plate-warm-light`,
`plate-warm-hue-light`). Born-RED on HEAD (the C 0.0051 plate fails the 0.010 floor),
GREEN after FIX-A. The existing `WARM_HUE_LO/HI` (45/85), `STRONG_FLOOR`,
`CHIP_FLOOR`, the KEEP-NEUTRAL byte-asserts, and the AA re-ratification arms are
UNTOUCHED — FIX-A is a chroma-only `--card` move at near-constant L, so every AA pair
re-ratifies (16.3:1 fg/plate) and the L-tolerance anti-evasion holds.

---

## 4. MOTION (the [[feedback-liquid-weight-universal]] law) — the tokens, no re-fork

The dropdown OPEN must bloom with liquid weight (the iOS-27 bloom-from-source), not a
flat bezier zoom. The mechanism already exists — VERIFY the Select content composes it:

- **`.glass-reveal`** (`src/styles/glass/reveal.css`, the zero-JS top-layer DEFAULT,
  `BB.W-LIQUID-REVEAL`): scale + fade + `filter: blur(4px)→0` decongest from the
  anchor on the snappy/bouncy spring with iOS overshoot. The reka-portaled
  Select/Dropdown overlays COMPOSE it (they cannot ride `@starting-style`). SPATIAL
  legs (scale/translate) ride `--spring-snappy` + `--spring-snappy-duration` (the
  per-spring clock, NOT a generic `--duration-*`); EFFECTS legs (opacity/blur-settle)
  ride `--ease-out`. `transform-origin: var(--reka-popper-transform-origin, center)`
  blooms from the trigger edge. **Tokens (read-only — the W-GLASS-CAL spring fence):**
  `--spring-snappy`, `--spring-snappy-duration`, `--ease-out`. No new spring, no clock
  truncation (re-introduces W-GLASS-CAL tail-jank).

- **Press squish** on the trigger/items: the CSS `:active` `--scale-press`
  (0.96, the canonical iOS rung) is the no-JS floor; the interruptible
  `useSpringPress` + `useLiquidFlex` reciprocal squish is the JS register
  (`BB.W-PRESS-UNIFY`). Menu rows lift `--menu-row-lift: -1px` on `--spring-smooth`
  (menu.css). **All compositor-only** (transform/opacity/filter — `proof:no-layout-
  animation` floor), **PRM-carved** (the reveal PRM block zeroes scale/translate/blur,
  keeps the fade; the menu PRM block zeroes the lift).

**Motion verdict: NO token retune.** The motion mechanism is shipped, idiomatic,
compositor-only, PRM-carved. The only action is to VERIFY the `<Select>`/`<Dropdown>`
content composes `.glass-reveal` (it should per the W-LIQUID-REVEAL 11-overlay
enrollment) — if the capture shows a flat zoom, the fix is wiring the class on the
content, NOT minting a spring. Safari-compat: the spring `linear()` curves + the
`filter` blur-settle + `transform` are all Safari-supported; the reveal blur rides
`filter` (the surface's own pixels) NOT `backdrop-filter` (which would clobber the
resting plate blur).

---

## 5. THE EXACT EDIT LIST (for the implementer — compose existing primitives, never re-fork)

| # | file | token / recipe | HEAD | NEW | seam it rides |
|---|---|---|---|---|---|
| A1 | `src/styles/tokens/color-radius.css` | `--card` | `hsl(36 48% 97%)` | `hsl(30 85% 96%)` | the SOLE glass-rung fill source (`color-mix(in srgb, var(--card) …)`) |
| A2 | `src/styles/tokens/light-dark.css` | `--card` light arg | `light-dark(hsl(36 48% 97%), hsl(24 8% 16%))` | `light-dark(hsl(30 85% 96%), hsl(24 8% 16%))` | §2c lockstep with A1 (dark arg UNTOUCHED) |
| G1 | `scripts/proof-no-gray.mjs` | `WARM_PLATE_FLOOR` const | — | `0.010` | new warm-material plate floor |
| G2 | `scripts/proof-no-gray.mjs` | `card-plate-warm-light` assert | `>= PLATE_FLOOR (0.0035)` | `>= WARM_PLATE_FLOOR (0.010)` | re-point |
| G3 | `scripts/proof-no-gray.mjs` | `floating-plate-warm-light` assert | — | floating rung (0.80) composite C ≥ `WARM_PLATE_FLOOR`, H ∈ [45,85] | new witness — the literal Select-panel surface |
| G4 | `tests-visual/no-gray.spec.ts` | roster | — | add `/forms/select` open-dropdown composited-panel OKLab readback, both modes | the BINDING paint |

**HELD (conditional, only if live π shows it):**
- `--neutral-0` page warm lift (§2 FIX-A sibling) — HOLD, KEEP-NEUTRAL register.
- `--glass-rim-top` α bump on floating/overlay over a near-white page (§2 FIX-C.1) — HOLD.

**FROZEN (do NOT touch — W-DARK-MATERIAL / W-GLASS-CAL bounds):**
- `--glass-tint-strength-aa` (20%), `--glass-tint-strength-floor` (4%/12%), the
  continuous `--glass-backdrop-luma` clamp, `--glass-tint-ink`.
- The per-rung `--glass-opacity-*` / `--glass-blur-*-radius` / `--glass-saturate-*`
  ladder (the alpha + radius + saturate registers).
- The spring/clock/scale motion tokens (`--spring-*`, `--scale-press*`).
- The `--surface-tint-*` in-srgb family (the AW.W26 fence).
- The dark `--card` (`hsl(24 8% 16%)`), the dark `--foreground` warm
  (`hsl(30 14% 90%)`), the dark `--surface-tint-*` `oklch(from …)` derivation.

---

## 6. WHY THIS IS THE GESTALT FIX, NOT A WORKAROUND

- **Single token, whole family.** `--card` is the one fill source; warming it lifts
  every glass surface (Card/Button/dropdown/dialog/sheet/toast/popover) onto warm-cream
  in ONE edit — the token-first single-family discipline the no-gray defect demands.
- **No re-fork, no new recipe, no new class.** Every change is a token VALUE on an
  existing compose seam (`color-mix(in srgb, var(--card) …)` and the gate constants).
- **Chroma-only, AA-preserving.** The `--card` move is near-constant-L (0.980→0.974),
  so every AA pair re-ratifies and the contrast contract holds (16.3:1 fg/plate).
- **The gate that lied is fixed.** `proof:no-gray`'s `PLATE_FLOOR` certified a gray
  plate; raising it to the warm-material `WARM_PLATE_FLOOR` + the floating-plate
  witness + the π readback closes the source-green/visually-broken hole — the SAME
  close-class the gate's own header was written to kill.
- **Six-layer composite honored.** FIX-A restores the warm-tint layer (layer 2); the
  rim/saturate/catch-light/shadow/grain layers (1,3,4,5,6) are structurally present
  and verified, carrying the "glass" read over a calm page that the backdrop-saturate
  cannot.
- **Motion untouched + idiomatic.** The bloom-from-source + squish-press are shipped,
  compositor-only, PRM-carved, Safari-compatible — verify the wiring, mint nothing.

---

## APPENDIX — diagnostic scripts (reproducible)

- `/tmp/composite-check.mjs` — the painted-plate OKLab of the Select panel + trigger
  over the page (the §1 table).
- `/tmp/warm-experiment.mjs` — the hue-drift trap (raising hsl-sat rotates OKLab hue
  up toward yellow-green).
- `/tmp/warm-sweet.mjs` — the warm-amber sweet-spot sweep (lower hue + higher sat →
  C ≥ 0.013 at H ≤ 78°), yielding the `hsl(30 85% 96%)` pick.

Both use the same hsl→sRGB→OKLab plumbing `proof:no-gray.mjs` carries, so the gate's
new asserts read the SAME numbers the implementer computes.
