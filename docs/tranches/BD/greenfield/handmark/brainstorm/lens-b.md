# HANDMARK — greenfield lens-b (CROSS-ENGINE / PERF-FIRST)

> Lens: design for FLAWLESS Chrome AND Safari + performance. Simplest mechanism that hits the
> bar (KISS); GPU-only where a viz; offscreen-pause; compositor-only motion; static SVG filters,
> sRGB color-interp, no `backdrop-filter:url`, `@supports`/PRM floors. The meatball/liquid quality
> must be perfect on WebKit.

## 0. Verdict in one line

**KEEP the facility — it is fit, coherent, and NOT over-engineered. REFINE exactly one render (the
`boil` natural morphology, which is BROKEN) and one render-stage gap (zero pressure/width across the
whole stroke family). RE-INVENT nothing. The ℱ-redraw egg + completion-seal are sound and stay.**

Survival of the fittest, scored from live `/motion/handmark` (both modes) + source:

| Mark | Live verdict | Disposition |
|---|---|---|
| `pen` underline | confident wobbled hand line, warm, clean (no filter) | **KEEP** |
| `crayon` | waxy red, real broken edges, 2-pass overdraw, grain — beautiful | **KEEP** |
| `marker` | juicy solid green slab, square cap, edge-fray only | **KEEP** |
| `pencil` | pale graphite tooth, dry, fine grain — correct (gray-as-graphite is intentional, not a no-gray violation: it is ink color, reads warm against the cream/brown card) | **KEEP** |
| `highlighter` | low-seat hull ribbon, multiply over page text, square cap — all 5 C-1 deltas live | **KEEP** |
| `ring` (circle) | hand-circle overshoot, thin red whisper | **KEEP** |
| **`boil` underline** | **reads as a regular spell-check squiggle, indistinguishable from `pen`; shallow uniform wobble; ZERO pressure** | **REFINE (BROKEN)** |
| ℱ-redraw egg | real Fourier-epicycle reconstruction of the ℱ glyph on the shipped `dftFromPoints`/`positionsAt`; arms+tip; PRM single-paint | **KEEP** |
| completion-seal | gold one-shot draw, `role=status`, ring/check/wordmark | **KEEP** |

The architecture is genuinely good and must NOT be re-forked: a flat 12-scalar + 4-enum `Brush`
**continuum** (`brush.ts`) where the renderer (`ink.ts`) reads FIELDS, never an instrument name;
shapes are pure `switch` arms in `shapeGeom` (`geometry.ts`); grain is ONE static seeded
`feTurbulence` filter (`texture.ts`) that rasters once and is sRGB-correct; the headless core
(`useHandMark.ts`) owns the draw-on/boil state machine; the SFC (`HandMark.vue`) measures the real
text baseline. This is the right shape. The greenfield move is to make the headline `boil` voice
actually hand-made and to give the family the pressure/weight that liquid-weight-universal demands —
**by extending the EXISTING `ribbon:'hull'` path the highlighter already proves, not a new engine.**

## 1. What the facility actually IS (mapped from source, live-verified)

Three things under one roof, all built on the shipped `@mkbabb/pencil-boil` geometry + the vendored
`perfect-freehand` core (`freehand.ts`):

1. **`<HandMark>`** — a hand-drawn editorial mark over real selectable text (`HandMark.vue`). 7
   shapes (`underline`/`strikethrough`/`highlight`/`circle`/`box`/`bracket`/`path` — `HandShape`),
   any of 7 brushes (`pen`/`boil`/`pencil`/`crayon`/`marker`/`highlighter`/`ring`), any CSS color
   (defaults `currentColor`, so both modes flip for free — verified live in dark), deterministic per
   `seed`, 4 animations (`none`/`draw-on`/`boil`/`draw-then-boil` — `HandAnimation`). The word stays
   real text; the mark is an `aria-hidden` SVG overlay. **Not** a pointer/freehand drawing surface —
   no pointer capture (the vendored pf ships geometry only, by design, SPEC §11).
2. **The ℱ-redraw egg** (`demo/eggs/FRedrawOverlay.vue`) — a fullscreen Canvas2D overlay that takes
   the hand-traced ℱ outline (`fGlyphPoints`, a 13-vertex closed loop), runs the FORWARD DFT
   (`dftFromPoints`), then walks the epicycle chain (`positionsAt`) to redraw the glyph phasor-by-
   phasor with live arms + tip, then fades. Fired by a global `glass-ui-demo:f-redraw` CustomEvent
   from `SidebarDock.vue`; `AppShell.vue` mounts the overlay. PRM → paint completed curve once.
3. **The completion-seal cousin** (`CompletionSeal.vue`) — a gold one-shot `pathLength`-draw of a
   `check`/`ring`/`wordmark` glyph, `role="status"`/`aria-live`, draws on mount or on a `play` flip.

All three share the SAME idea: **a stroke is drawn ON over time** (draw-on dashoffset / clip wipe /
epicycle trace / pathLength). That coherence is the family's spine and is worth keeping.

## 2. The single defect (source + pixel grounded)

**The `boil` natural-underline morphology renders as a periodic sinusoid (`naturalUnderlinePoints`,
`geometry.ts:68-101`).** Live measurement of the rendered `future` path (Chrome, 80 samples along
`getTotalLength`): max detrended displacement **1.28** units in a 40-unit viewBox (≈3% — far too
shallow), and visually the humps read as an evenly-spaced spell-check squiggle. The body is literally
two clean sines on a uniform `t·2π·periods` phase grid + a `Math.sin(π·t)` envelope + sub-perceptual
jitter, with `stroke-width` **constant (6/5)** — zero pressure. Side-by-side live, `pen` (pencil-
boil's irregular `wobbleLinePoints`) reads MORE hand-made than the `boil` voice the demo bills as
"the masthead default" — the family's headline register is its weakest mark. This matches the
existing `BD.W-HANDMARK-AUDIT` verdict exactly; the open question that wave left is the *render*
target, which this lens pins.

Nothing else is broken. `proof:handmark` W1-W6 hold; grain filters are sRGB; dark mode is warm-brown
(not gray) and `currentColor` flips automatically; the 5 highlighter deltas are live; box/bracket/
strikethrough/path exist but are simply under-demoed (a coverage gap, not a render defect).

## 3. The greenfield design — ONE pressure-bearing hull path, unified under the continuum

### 3.1 Core idea: retire the bespoke sinusoid; make `natural` mean "irregular waypoints + seeded pressure through the EXISTING hull"

The library already owns the right machinery and proves it on the highlighter: `ribbon:'hull'` routes
a centerline + a per-vertex pressure array through the vendored `getStroke`/`getSvgPathFromStroke`
(`freehand.ts`) to produce a TRUE variable-width filled body. The greenfield move is to **stop hand-
rolling a sine** and instead express the boil voice as a `Brush` point that already engages the hull,
fed by an **irregular-waypoint centerline** + a **seeded pressure profile** — i.e. the exact two
levers the family already has, composed, with the bespoke `naturalUnderlinePoints` sine retired
(NO LEGACY: delete it and its `PERIODS_MIN/MAX`/`NATURAL_AMP_FRAC` constants, no alias).

Two surgical edits, both inside existing files, zero new modules:

**(a) `geometry.ts` — replace `naturalUnderlinePoints`'s body with an irregular-waypoint centerline.**
Drop the uniform `t·2π·periods` phase. Instead, partition `[x1,x2]` into a SEEDED-IRREGULAR set of
waypoints (each interval `t_{k+1}−t_k` drawn from the house `mulberry32(seed)` — a lazy stretch then
a tight cluster), assign each waypoint an INDEPENDENTLY-seeded signed amplitude (a hard-press hump
beside a light skip), anchor the two endpoints to the baseline (no draw-on pop), and let the existing
`catmullRomToBezier` (already imported from pencil-boil in `ink.ts`/`geometry.ts`) smooth the line.
Amplitude floor lifts from ~3% to a hand-real ~6-9% of span. Result: irregular SPACING + irregular
AMPLITUDE by construction — the periodic gestalt is gone, deterministic per seed (house prng, the
[S2] reconcile held — zero `mulberry32` from pencil-boil).

**(b) `brush.ts` — flip the `boil` preset to `ribbon:'hull'` + a real pressure profile.** Today
`boil` is `ribbon:'stroke'` (constant width). Flip it to `'hull'` so it consumes `addPressure`
(`ink.ts:47`) — which ALREADY emits a seeded low-freq swell × jitter pressure array — and tune
`thinning`/`taper`/`weightJitter` so the line swells and thins like a real pen pressing harder here,
lighter there. This is the highlighter's proven path; the pf body already ships whenever the
highlighter does, so it drags ZERO new bytes (SPEC §11 treeshake note). `addPressure`'s `Math.sin(π·t)`
swell should also pick up the per-waypoint amplitude so width tracks the irregular geometry (one
small refinement to `addPressure`, shared by every hull brush — DRY).

**Why this is the KISS/cross-engine win:** the hull body is a plain filled `<path>` (no filter for
clean `boil`, grain:0), so it costs the same as the current stroke, paints identically in Chrome and
Safari (geometry, not a filter; `vector-effect:non-scaling-stroke` already handles the x-stretch),
and the draw-on is the existing `clip`-vs-`dashoffset` field read (hull is filled → it should use the
clip wipe, which is the cheaper compositor path anyway). No re-raster, no rAF for the static mark.

### 3.2 Liquid-weight on the draw-on (the §L4 cartoon register, opt-in)

The draw-on today is a single `cubic-bezier(.16,1,.3,1)` sweep — clean but calm. To honor liquid-
weight-universal WITHOUT making every mark manic, add **one opt-in lever** on the DRIVER (the draw-on
is a driver event, not an observer snap, so the bounce is sanctioned per design.md §L4):

- a `weight?: number` prop (rest `0`, the calm default) that, when `>0`, swaps the draw-on easing to
  the design.md **Cartoon-punch register** (`--ease-cartoon-punch` — a shaped `linear()` with real
  anticipation + ~22% overshoot; design.md §Easing). The stroke draws on, the tip overshoots the end
  by a hair and settles — a real pen flicking off the page. The completion-seal's gold draw is the
  natural first consumer (a celebratory mark SHOULD punch). PRM → `--ease-standard` (the design.md
  collapse), exactly like the existing PRM carve that already zeroes the draw to the static state.
- **This is the only motion addition, and it is opt-in + compositor-only** (`stroke-dashoffset`/`clip-
  path` transition, no layout). `--ease-cartoon-punch` is a design.md-proposed token (NOT yet in
  `src/styles`); if it is not yet shipped at build time the wave depends on the cartoon-shadow/easing
  wave, else falls back to the existing bezier — no smuggled constant.

### 3.3 The ℱ-redraw egg — KEEP, with two perf/quality nits (not a rebuild)

The egg is real and good (forward DFT → epicycle walk on the shipped fourier-field math — the logo IS
the transform). Two cross-engine/perf refinements, no re-architecture:

- **Offscreen-pause / lifecycle:** it already self-terminates on `done` and cancels rAF on unmount
  (verified). Keep. The only nit: `inkColor()` creates+removes a probe span every `draw()` frame
  (220 frames) — hoist the `getComputedStyle` read to ONCE at mount (it cannot change mid-animation).
  Pure perf, no visual change.
- **Glyph fidelity:** `fGlyphPoints` is a 13-vertex hand trace that reads as a script-F but is coarse;
  the DFT smooths it. Acceptable. Optional polish: bump the trace to ~18 vertices for a cleaner middle
  bar. Cosmetic only — the egg already reads as an ℱ.

The egg stays Canvas2D (a transient fullscreen one-shot, not a steady-state viz — Canvas2D is the
KISS choice; no GL context for a 2.9s overlay). It is sRGB by nature (Canvas2D 2D context). No Safari
fence needed (no SVG filter, no backdrop-filter).

### 3.4 Cross-engine floor (§L7) — already met, re-asserted

- Grain filters: all 6 live filters declare `color-interpolation-filters="sRGB"` (verified) — the
  WebKit forced-sRGB threshold matches Chrome. The new hull `boil` is grain:0 → **no filter at all**,
  so it is trivially identical cross-engine.
- The wobble + pressure live in CONTROL POINTS + hull width, NEVER a `feTurbulence` (the C-2 filter-
  free fence held) — so the `boil` mark has nothing WebKit can diverge on.
- `currentColor` ink: both modes for free (verified dark = warm-brown card, cream ink, no gray).
- PRM: every draw-on collapses to the static finished state; the boil frame-cycle (`useLineBoil`)
  early-returns; the cartoon-punch easing collapses to standard. All inherited, none new.
- No `backdrop-filter:url`, no meatball goo in this facility (a hand mark is not a metaball surface —
  correctly out of scope; the §L7 goo arm does not apply here, which the spec must state explicitly).

## 4. Composition / fences (DEFT union, no fork)

- **Touches exactly THREE files:** `geometry.ts` (`naturalUnderlinePoints` body → irregular
  waypoints, retire the sine + its constants), `brush.ts` (`boil` preset → `ribbon:'hull'` + pressure
  tuning), `ink.ts` (`addPressure` tracks the per-waypoint amplitude — shared by all hull brushes).
  Plus the egg perf nit in `FRedrawOverlay.vue` and the demo coverage expansion.
- **BYTE-UNTOUCHED:** the `Brush` continuum shape + `lerpBrush`, `texture.ts`, the highlighter's 5
  deltas, `pen`/`pencil`/`crayon`/`marker`/`ring` presets, the other 6 shapes, the seed reconcile,
  the SFC measurement, completion-seal. This is the `BD.W-HANDMARK-AUDIT` A7 no-rebuild fence,
  re-affirmed.
- **Reconcile with `BD.W-HANDMARK-AUDIT`:** that wave already specs the irregular-morphology fix +
  the demo expansion + the measuring gate (`proof:handmark-audit` A1-A7). This lens does NOT
  duplicate it — it AMENDS it with the concrete cross-engine mechanism the wave left open: **the fix
  is `ribbon:'hull'` + irregular waypoints (not a richer sine), the pressure rides the EXISTING
  `addPressure`/pf path, and the opt-in cartoon-punch draw-on + the egg `inkColor` hoist are the two
  additions this lens contributes.** The delta-assay folds into that wave's §1 mechanism + adds an
  A8 (cartoon-punch draw-on opt-in, PRM-carved) and an egg-perf nit; it does NOT create a new wave.

## 5. Source-verified symbols (grep-confirmed, no phantoms)

`naturalUnderlinePoints`/`shapeGeom`/`boilLines`/`serialize` (`geometry.ts`); `PERIODS_MIN/MAX`,
`NATURAL_AMP_FRAC`, `UNDERLINE_GAP`, `HIGHLIGHT_RISE`, `VB_W/VB_H` (`constants.ts`); `BRUSHES`,
`resolveBrush`, `lerpBrush`, `Brush`, `ribbon:'hull'`, `TaperSpec` (`brush.ts`); `ink`, `addPressure`,
`getStroke`, `getSvgPathFromStroke` (`ink.ts`/`freehand.ts`); `grainFilter`/`hasGrain` +
`color-interpolation-filters="sRGB"` (`texture.ts`, live-confirmed ×6); `useHandMark`/`useLineBoil`/
`NOOP_BOIL`/`drawKind`/`boilArmed` (`useHandMark.ts`); `mulberry32` from `../../../utils/prng` (the
house [S2] leaf, NOT pencil-boil); `dftFromPoints`/`positionsAt`/`BasisComponent` (`fourier-field/
math.ts:113/41/14`); `fGlyphPoints` (`demo/eggs/fGlyphPoints.ts`); `glass-ui-demo:f-redraw`
(`SidebarDock.vue:178` → `AppShell.vue:241`); `useLiquidFlex` (`src/composables/motion/useLiquidFlex.ts:135`);
`COMPLETION_SEAL_PATHS`/`CompletionSealShape` (`completion-seal/constants.ts:21/38`). `--ease-cartoon-
punch`/`--motion-weight` are design.md-PROPOSED tokens (NOT yet in `src/styles` — grep empty) and are
cited as a register dependency, not a shipped lever this lens smuggles.
