# KS-HANDMARK — corpus grounding (disk-true state + the gap to "perfect")

**Lane:** KS-B HANDMARK researcher · **HEAD:** tranche/BG 29f280c8 · **Waves:** 14.3
`BG.W-HANDMARK-PERFECT` (absorbs 14.4 `PENCIL-BOIL-DEEPEN` as a boil-park clause).
Fence: research only; no src edits. All citations file:line, disk-verified.

---

## 1. What HandMark IS (the hallmark, as-shipped)

The platform's ONE hand voice — a hand-drawn mark (underline · strikethrough · highlight
band · circle · box · bracket · arbitrary path) in any medium, any CSS color, deterministic
per `seed`, optionally animated. The slotted word stays REAL selectable text; the mark is an
`aria-hidden` SVG overlay (`HandMark.vue:236-273`). `InkMark` is the prose alias (one impl,
`index.ts:20`).

A **four-layer hybrid** over a **flat-data Brush continuum** (the keystone architecture):
- **L1 GEOMETRY** — `@mkbabb/pencil-boil` (optional peer 0.4.1): `wobbleLinePoints`,
  `ellipsePoints`, `perturbPoints[Closed]`, `catmullRomToBezier` (`geometry.ts:24-32`).
- **L2 BODY** — `ink.ts`: field-gated union, ZERO instrument-name `if` (`ink.ts:130-217`).
  `ribbon:'stroke'` (plain path — pen/pencil/ring) vs `'hull'` (vendored perfect-freehand
  variable-width body via `freehand.ts` — boil/crayon/marker/highlighter).
- **L3 GRAIN** — `texture.ts`: ONE parameterized static+seeded feTurbulence `<filter>`;
  `grain<=0 && grainScale<=0 ⇒ '' ⇒ no filter` (the PEN-is-free law, `texture.ts:38-39`).
- **L4 ANIMATION** — `composables/useHandMark.ts`: draw-on (dashoffset for clean ink |
  clip-path WIPE for grained ink — never dashoffset under a filter, the Δ4 gate) + boil.
- **L5 SURFACE** — `HandMark.vue`: anchor/measure baseline, mount namespaced filter, a11y.

The **Brush** is pure JSON data — 20 scalar/enum fields + one optional `stamp` escape
(`brush.ts:33-80`). Every medium is a frozen literal POINT in one continuous space
(`BRUSHES`, `brush.ts:108-280`); `lerpBrush` proves the continuum (`brush.ts:302-328`). The
renderer branches on FIELDS only (`ribbon`/`passes`/`grain`/`blend`/`cap`), never on name.

**The three-underline-register fence** (binding, both directions — `README.md:46-59`,
CLAUDE.md): (1) `.paper-ink-mark` — the STRAIGHT structural 2px `--foreground` hairline
(tab indicator + math-paper rail), NEVER wobbled, NOT this family; (2) `HandMark
shape="underline"` — the hand-voice wobble. `GlassUnderline`/`/underline` RETIRED onto it
(DEC-8, clean break, no alias — `proof:handmark` W2 enforces the delete + import-survivor
scan, `proof-handmark.mjs:105-141`).

**Seed discipline** (AV.W14 single-source): the family seeds via the HOUSE `mulberry32`
(`utils/prng.ts`) and FEEDS pencil-boil a house-derived int; glass-ui imports ZERO
`mulberry32` FROM pencil-boil (`geometry.ts:33`, `ink.ts:26`; gate W4 scans for a bad
pencil-boil seed import, `proof-handmark.mjs:227-228`).

---

## 2. The BA five field-deltas — LIVE vs dormant (all five LIVE)

BA.W-HANDMARK C-1 shipped the highlighter's five deltas; disk-verified all engaged:
- **(a) LOW-SEAT band** — LIVE. `highlight` seats at `baselineFrac − HIGHLIGHT_RISE`
  (0.22), not box-middle `cy` (`geometry.ts:209-219`, `constants.ts:30`).
- **(b) `ribbon:'hull'`** — LIVE. Highlighter is hull, pf variable-width slab (`brush.ts:262`).
- **(c) non-zero taper** — LIVE. `taper:{start:6,end:10}` (`brush.ts:265`).
- **(d) `cap:'square'` reaches the DOM** — LIVE. `brush.ts:278` → plumbed onto `InkPath.cap`
  (`ink.ts:196,205`) → bound `:stroke-linecap="p.cap ?? 'round'"` (`HandMark.vue:266`); no
  hardcoded round in CSS (`HandMark.vue:313-316`).
- **(e) multiply un-walled** — LIVE. `.hm` carries NO `isolation: isolate`
  (`HandMark.vue:277-286`); `[data-behind]` wires `mix-blend-mode: multiply` (`:309-312`).

**C-2 natural morphology** — LIVE + hardened past the BA spec. The `boil` voice routes
through `naturalUnderlinePoints` — a **φ-incommensurate fractal value-noise** displacement
(`geometry.ts:93-155`), NOT the BA-era seeded sinusoid. Octaves at φ-stepped frequencies
(`NOISE_PHI 1.618`, `NOISE_F0 2.5`, `NOISE_OCTAVES 4`, `constants.ts:55-63`) → the sum never
closes into a period; scale-relative amplitude (`NOISE_AMP_FRAC 0.05`); endpoint-only cosine
taper so ends settle (no draw-on pop). `normalizeProps` auto-engages `natural` for `boil`
(`useHandMark.ts:101`). Measured spacing-CV ~0.41 at paint count vs sinusoid ~0.14
(`constants.ts:44-46`). Curvature-coupled pressure (`ink.ts:addPressure:102-119`) makes it a
pen LINE not a wiggly line — presses harder on straights, thins through wobbles.

---

## 3. The engine as-built — notable state

- **Baseline measurement** (E1 anchor) — LIVE + hardened. `textRangeRect` anchors the Range
  on the FIRST content node and extends over the LAST (the 3.11.0 zero-rect regression fix —
  a per-child loop ended on a trailing empty anchor, `HandMark.vue:133-152`). Re-measures on
  `document.fonts.ready` + ResizeObserver (`:170-181`). `baselineFrac` null ⇒ legacy
  `VB_H−8` fallback for one pre-measure frame (`geometry.ts:186-190`).
- **Zero-cost boil** — a NON-boiling mark constructs a `NOOP_BOIL` stub, never instantiates
  `useLineBoil`, never subscribes to the singleton RAF (`useHandMark.ts:42-46,184-196`).
  Static-by-construction, not merely scheduled-away.
- **pencil-boil `useLineBoil`** (sibling READ-ONLY, `~/Programming/pencil-boil/src/vue.ts`):
  singleton RAF scheduler, PRM early-return, `frameCount<=1` never-subscribe guard
  (`vue.ts:127-136`), and **`visibilitychange` tab-hidden park** (`vue.ts:79-98`). Note:
  it parks on `document.hidden` but has **NO element-offscreen park** — see §5 boil gap.
- **PRM** — every draw-on collapses to finished-static; boil no-ops via `useLineBoil`'s
  guard + the SFC `@media(prefers-reduced-motion:reduce)` snap (`HandMark.vue:337-347`).
- **Gate:** `proof:handmark` (W1-W6, `proof-handmark.mjs`, 271L) + `tests-visual/handmark.spec.ts`
  (131L). Demo: `demo/stories/motion/handmark.vue` shows pen/boil/pencil/crayon/marker/
  highlighter/ring + draw-on + tinted.

---

## 4. SOTA grounding (2026 hand-drawn / rough-notation state of the art)

- **rough.js / roughjs** (Preet Shihn) — the canonical hachure/sketchy primitive; HandMark
  steals its *seeded-determinism + roughness/bowing vocabulary*, not its code (`types.ts:2-6`
  notes the rough-notation vocabulary theft). SOTA move HandMark exceeds: rough.js wobble is a
  single-octave random bow; HandMark's φ-incommensurate multi-octave value-noise is a strictly
  richer non-periodic hand line (the spacing-CV discriminator, §2).
- **rough-notation** (Preet Shihn) — annotate-style underline/circle/highlight/box/bracket +
  draw-on animation. HandMark's `HandShape` union + `animation` + `appear` is the same surface,
  re-implemented as pure data (the vocabulary, not the lib).
- **perfect-freehand** (Steve Ruiz / tldraw, MIT) — the pressure→variable-width outline. VENDORED
  into `freehand.ts` (`README.md:73-75`); the `ribbon:'hull'` body is the consumer. This is the
  SOTA variable-width-stroke technique; HandMark's `addPressure` curvature-coupling
  (`ink.ts:99-119`) is the novel layer ON TOP (pf takes pressure as input; HandMark DERIVES
  pressure from centerline curvature).
- **Value-noise / fractal-sum non-periodicity** — the φ-incommensurate octave sum is the
  standard procedural-noise anti-tiling trick (Perlin/value-noise + irrational lacunarity);
  applied here to a 1-D displacement (`geometry.ts:93-155`) rather than a 2-D texture.
- The **feTurbulence grain graph** (`texture.ts:45-54`) is the classic SVG pencil/paper-tooth
  filter recipe; STATIC+SEEDED (rasters once) is the perf-correct application (the Δ4 gate).

---

## 5. THE GAP — shipped vs "perfect" (what 14.3 must ADD/SHARPEN)

The build-map names five deltas (`bg-build-map.md:1193-1199`); disk state of each:

1. **Aspect-correct viewBox** — GAP. `VB_W=100 × VB_H=40` = aspect **2.5**
   (`constants.ts:9-11`); `preserveAspectRatio="none"` (`HandMark.vue:241`) x-stretches the
   marking space to the inline `.hm` word box (a word is ~3:1–5:1). So Y-amplitude
   (wobble hump heights, in vb units) is COMPRESSED while X stretches — the hand line
   distorts non-uniformly with word aspect. `vector-effect:non-scaling-stroke`
   (`HandMark.vue:256`) fixes the STROKE BAND width but NOT the path geometry. **π:**
   `px-aspect ≈ vb-aspect` (`bg-build-map.md:1196`) — either derive VB from the measured box
   aspect, or express wobble amplitude in a stretch-invariant unit.

2. **Hull self-intersection guard ("hull se-guard")** — GAP. `ink.ts:184-198` calls
   `getStroke` unconditionally; a degenerate/short centerline or a tight-wobble hull can
   yield a self-intersecting or empty pf outline (visual artifact). No guard for point-count
   or degenerate outline today. **The wave adds the guard** (`bg-build-map.md:1193,1195`
   `+hull-guard`).

3. **Amplitude knob** — GAP. `NOISE_AMP_FRAC` is a HARDCODED 0.05 constant (`constants.ts:61`);
   `HandMarkProps` (`types.ts:33-84`) has roughness/segments/jagged/natural but NO public
   amplitude prop/token. The wave mints the tunable knob (token-first; presets-in-consumers).

4. **Draw-easing token** — GAP. `drawTransition` HARDCODES `cubic-bezier(.16,1,.3,1)` inline
   (`HandMark.vue:87`) — this IS `--ease-out-expo` but as a string literal, not a token read.
   The wave tokenizes it (a `--handmark-draw-ease` reading the house expo — token-first,
   one-edit retune). NOTE motion-canon P1: draw-on is stroke-dashoffset/clip-path = an EFFECTS
   channel ⇒ bezier is correct (not a spring); the token must resolve a bezier `--ease-*`.

5. **`proof:handmark-audit` (NEW gate)** — ABSENT (`scripts/proof-handmark-audit.mjs` does
   not exist). The binding spacing-CV≥0.30 discriminator lives in comments/visual-spec today
   (`constants.ts:44-46`, `proof-handmark.mjs:194-205` defers "the binding spacing-CV
   discriminator rides proof:handmark-audit"). The wave mints it — samples the REAL emitted
   `naturalUnderlinePoints` set (exported for exactly this, `index.ts:42`, no symbol regex —
   W-GATE-TRUTH discipline) and asserts spacing-CV ≥ 0.30 + px-aspect≈vb-aspect.

**14.4 boil-park arm (folded into 14.3, `bg-build-map.md:1197-1199`):**

6. **Boil LIVE offscreen-park** — GAP. The IntersectionObserver in HandMark.vue is a
   **draw-on trigger** — it fires `play()` ONCE then `io.disconnect()` (`HandMark.vue:189-199`),
   it does NOT gate the boil loop. pencil-boil's scheduler parks only on tab-hidden
   (`vue.ts:79-98`), NOT on element-offscreen. So a `boil`/`draw-then-boil` mark scrolled
   offscreen (tab still visible) keeps ticking the RAF — the invariant-8 offscreen-pause
   discipline the WebGL substrate holds is NOT held for boil. The arm wires an IO-gated
   `boil.stop()`/`start()` (or `content-visibility`) so an offscreen boiling mark parks.
   Companion asks (14.4 scope): graphite-in-tooth pencil grain + a pencil pressure profile
   (`bg-build-map.md:1197`; π "pencil-graphite-on-tooth; boil breathes hump-irregular; PRM
   static").

**Cross-repo (14.5 → F8, out of this lane):** drop the dead `perfect-freehand ^1.2.3` peer
(`package.json:1085` — it is VENDORED into `freehand.ts`, so the peer is dead weight); the
`@mkbabb/pencil-boil` by-name ask lands in F8 `W-PAPER-CROSSREPO-ASKS` (`bg-build-map.md:1200-1204`).

---

## 6. Precepts / fences the perfected spec must honor

- **Compositor-only + PRM** — draw-on rides clip-path/dashoffset (compositor), boil re-serializes
  a `d` (cheap); the offscreen-park is the invariant-8 obligation the boil arm closes. Every
  new motion keeps the `@media(prefers-reduced-motion)` snap.
- **spring-iff-spatial / bezier-iff-effect** (motion-canon P1) — draw-on is an EFFECTS reveal ⇒
  the draw-easing token resolves a bezier `--ease-*`, NOT a spring. (Confirm: no spatial channel
  animates in draw-on; the boil re-perturbs geometry per frame at ≤8fps, a living-line not a
  spring transition — outside the spring/bezier axis.)
- **Token-first / clean breaks / no legacy** — the amplitude + draw-easing knobs are tokens
  (one-edit retune); no back-compat alias for any rename (the DEC-8 clean-break precedent).
- **≥2-consumer** — HandMark is consumed by the demo (`motion/handmark.vue`) + the slides/atlas
  masthead (the `InkMark` alias consumer, `index.ts` header). Any NEW primitive the spec mints
  (e.g. a shared aspect-derivation helper) needs its ≥2 sites.
- **Warm / no-gray identity** — marks default `currentColor`; grain filters are color-agnostic;
  presets-in-consumers (a demo hue like `#ffd84a` highlighter lives in the demo, not a lib token).
- **Three-underline-register fence** — INVIOLABLE. The perfected spec must not let any new wobble/
  amplitude knob leak onto `.paper-ink-mark` (W6, `proof-handmark.mjs:236-252`).
- **Seed single-source** — every new procedural term seeds off `utils/prng.ts`, zero pencil-boil
  `mulberry32` import (W4).

## 7. Gestalt bar (the paint verdict this hallmark is judged by)

The marks must read HAND-MADE, not machine-perfect: the boil underline breathes hump-irregular
(spacing-CV≥0.30, no spell-check squiggle), the highlighter visibly MULTIPLIES against the page
backdrop behind the word, the pen line reads as a pressured pen (thick straights / thin wobbles),
and the hand line does NOT distort with word aspect (the viewBox fix). SUBTLE where subtle — a
suggestion, never a saturated slab competing with the datum (the `ring` E7a whisper, `brush.ts:203-230`).
`proof:ba-gestalt` handmark/paper-band verdict is the binding paint (rides the reflection close).
