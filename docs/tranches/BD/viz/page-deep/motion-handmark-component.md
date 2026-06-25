# Pass-E COMPONENT deep audit — motion/handmark (`@mkbabb/glass-ui/handmark`)

**Component under audit (the REAL src, not the demo):** `src/components/custom/handmark/` —
`HandMark.vue` (L5 SFC) · `composables/useHandMark.ts` (L2/L4 headless core) · `geometry.ts`
(L1 shape→centerline) · `brush.ts` (the 12-scalar Brush continuum) · `ink.ts` (L2 body) ·
`texture.ts` (L3 grain filter) · `freehand.ts` (vendored perfect-freehand) · `constants.ts` ·
`types.ts`. Optional peers: `@mkbabb/pencil-boil ^0.4.1` (wobble + `ellipsePoints` +
`useLineBoil`), `perfect-freehand` (vendored).

**Lens:** my OWN full opus read of the entire corpus + the existing Pass-D page-audit
(`viz/page-audit/handmark.md`) + the existing wave `union/waves/BD.W-HANDMARK-AUDIT.md` + the
two on-disk captures (`handmark-full.png` / `handmark-mid.png`). Server `:5199` down at audit
time; the Pass-D live-verification (real Chrome, isolated context) + the captures are the binding
paint evidence. North star: DESIGN.md six-layer glass composite · GLASS+PAPER morphism ·
motion-canon · PROCEDURAL-SUITE (N/A — handmark is NOT a GPU viz) · the dock APIs · audacious √φ
type · Safari-compat · NO-legacy/idiomatic.

> **Bottom line: the existing `BD.W-HANDMARK-AUDIT` wave is CORRECT and SUFFICIENT for the two
> COMPONENT-level defects (boil sinusoid + under-demo). I CONFIRM it, ENRICH it with three
> additional component-level findings the Pass-D audit did not surface (a Safari raster-flicker
> risk, the boil-clock missing offscreen-park, and an `appear="visible"` IntersectionObserver
> threshold trap), and map the user's REDESIGN asks (aurora background · sub-section glass cards ·
> bigger main card · label→heading · paper grit · import-label) to the SYSTEMIC Band-16 chassis
> waves that already own them — NONE are bespoke handmark work.** No rebuild. The Brush continuum
> is sound, KISS, architecturally elegant; over-build concern ALLAYED.

---

## 0. The architecture in one read — it is RIGHT

`brush.ts` is a genuine continuum: a `Brush` is 12 scalars + 4 enums + an optional `stamp`, every
medium a frozen POINT (`pen`/`boil`/`pencil`/`crayon`/`ring`/`marker`/`highlighter`), and
`lerpBrush` proves the in-between. `ink.ts` reads FIELDS only — zero instrument-name `if`
(`ribbon` picks stroke-vs-hull, `passes`/`passOpacity` the overdraw, `grain>0` the filter,
`blend` the multiply, `cap` the linecap). `geometry.ts` is a pure `shape→centerline` mapper; the
renderer never knows what it drew. `texture.ts` returns ONE seeded static `<filter>` or `''` (the
pen-is-free law). The four-layer hybrid (L1 geometry · L2 body · L3 grain · L4 animation · L5 SFC)
is cleanly separated, headless-core-extractable, SSR-safe. This is architectural-transposition-
for-elegance done RIGHT — adding a medium is one row, adding a shape is one switch-arm. **Nothing
to prune; the over-build concern is allayed (echoes Pass-D + the wave's #1 fence).**

---

## 1. ANIMATION — high affordance, ONE weak mark, two missing safeguards

The family carries a real animation register: `none` (static seeded) · `draw-on` · `boil`
(continuous living-line) · `draw-then-boil`. The four-state contract is N/A (HandMark is a passive
decoration overlay, not an interactive control — it has no hover/press/focus), so the relevant
motion-canon clauses are entrance (P2/P3) + compositor-only (P5) + PRM (P6).

- **GOOD — draw-on is idiomatic + compositor-only.** Clean ink reveals via `stroke-dashoffset`
  `1→0` on `pathLength="1"`; grained ink reveals via a `clip-path: inset()` WIPE — the mechanism
  is picked by a FIELD (`drawKind = grained ? "clip" : "dashoffset"`, `useHandMark.ts:172`),
  NEVER dashoffset-under-a-filter (which would re-raster the graph per frame — the Δ4 gate).
  Both are compositor-eligible. The easing `cubic-bezier(.16,1,.3,1)` IS the house `--ease-out-expo`
  arrival curve (the bold-decelerating SOTA arrival, motion-canon-named). PRM collapses every mode
  to the finished static state (`@media (prefers-reduced-motion: reduce)` block,
  `HandMark.vue:337`). **This is correct + idiomatic.** (Nit: the easing literal is HARD-CODED
  `cubic-bezier(.16,1,.3,1)` at `HandMark.vue:87` instead of reading `var(--ease-out-expo)` — a
  token-first DIVERGENCE; the value is byte-identical but a `--ease-out-expo` re-tune would not
  reach it. Minor — fold note, not a wave.)

- **THE SOTA DEFECT (confirmed, already owned).** `naturalUnderlinePoints` (`geometry.ts:68-101`)
  — the `boil` brush's "natural morphology", the family's *advertised masthead voice* — is
  `w1·sin(phase + t·2π·periods) + w2·sin(…)` over a UNIFORM `t·2π·periods` phase grid with a single
  symmetric `sin(π·t)` amplitude envelope. The period SPACING is metronomic by construction (only
  the period COUNT 2..4 is seeded); the jitter (`±0.2·amp ≈ ±0.0044·span`) is sub-perceptual. It
  reads as a SPELL-CHECK SQUIGGLE — mechanically periodic — the weakest of 7 marks. The plain `pen`
  underline (pencil-boil's irregular `wobbleLinePoints`) reads MORE hand-made. **CONFIRMED in
  `handmark-full.png`: the "pays in" pen underline is convincingly irregular/hand-made; the Pass-D
  live read of "future"/"here"/"boil" found the periodic tell.** → **already owned by
  `BD.W-HANDMARK-AUDIT` §1/A1–A3.** I affirm the wave's fix (irregular waypoint spacing + irregular
  amplitude + perfect-freehand pressure ribbon, NO new dep) and its MEASURING gate (the W4
  presence-regex `/naturalUnderlinePoints/.test()` at `proof-handmark.mjs:192-196` is a verified
  false-green the current sinusoid sails past — confirmed on disk; `naturalUnderlinePoints` is
  `function`, NOT exported, so the export-for-measurement requirement is real).

- **NEW FINDING — the continuous-boil clock has NO offscreen-park (compositor-perf gap).**
  `useLineBoil` (pencil-boil `vue.ts`) ticks on a shared-singleton RAF with a PRM gate + a
  `frameCount <= 1` static gate (verified) — disciplined. BUT it has NO IntersectionObserver /
  `content-visibility` / `document.hidden` park. HandMark's OWN IntersectionObserver
  (`HandMark.vue:189`) gates only the draw-on `play()` then `disconnect()`s — it does NOT gate the
  boil loop. So a continuous-`boil` mark scrolled OFF-screen keeps re-perturbing its centerline +
  re-serializing the path on every shared-RAF tick (`useHandMark.ts:198` `pathD` recomputes
  `boilLines` + `serialize` per frame). The WebGL substrate parks offscreen
  (`useWebGLCanvas`/`useIntersectionPause` — the proof:offscreen-pause discipline); the boil
  clock does NOT. It's CHEAP (a handful of points, not a GPU pass) so it's a MINOR perf gap, NOT a
  blocker — but the W-HANDMARK-AUDIT demo wave is about to make `boil`-continuous VISIBLE on the
  page for the first time, so the gap goes from latent to live. → **AUGMENT `BD.W-HANDMARK-AUDIT`:
  the boil-continuous demo arm should ride an `useIntersectionPause`-style stop()/start() on the
  HandMark side (the `boil.stop()` already exists in `onBeforeUnmount` — wire it to an IO
  visibility toggle), OR book the pencil-boil offscreen-park as a by-name cross-repo ask (the
  foreign-tree fence: glass-ui composes the clock, the park belongs in pencil-boil's scheduler).**

- **NEW FINDING — `appear="visible"` IntersectionObserver `threshold:0.35` trap on a thin mark.**
  `HandMark.vue:197` observes at `threshold: 0.35`. A 1-line underline overlay (`.hm__svg` is the
  word's bounding box) is short; on a tall viewport a brief scroll-by may never cross 35% intersect
  → the draw-on never fires → the mark renders un-drawn (dashoffset stuck at 1, invisible) until
  unmount. The mid-capture `appear="manual"` demo dodges this, but the masthead default
  (`appear="visible"`) is exposed. → **AUGMENT `BD.W-HANDMARK-AUDIT` (or fold-note):** lower the
  threshold to a near-0 "any-intersect" trigger (the entrance only needs the mark to have been
  seen once), the idiomatic IO entrance pattern. Minor robustness, not a blocker.

---

## 2. PROCEDURAL VIZ — N/A (correctly)

HandMark is NOT a GPU procedural viz (no aurora/blob/fourier; no PROCEDURAL-SUITE membership, no
WebGL/WebGPU substrate, no `useGpuSubstrate`). Its "procedural" surface is the SEEDED CPU geometry
(`mulberry32` from the HOUSE prng leaf `utils/prng` — the [S2] reconcile, verified: glass-ui imports
ZERO `mulberry32` from pencil-boil) + the static SVG `feTurbulence` grain filter. The GPU-only/
Safari bar does not apply. The grain filter is the one raster surface — see §3/§4. **No
PROCEDURAL-SUITE finding.**

---

## 3. PERFORMANCE — compositor-clean at rest, one raster caveat

- **GOOD — grain filter rasters ONCE + caches** (`texture.ts` is STATIC + SEEDED; the Δ4 gate
  forbids dashoffset-under-filter, enforced by the field-picked `drawKind`). The pen default emits
  `''` (NO filter) — the pen-is-free law. A static `none` mark builds `NOOP_BOIL` (a frozen `0`
  ref, never even constructs `useLineBoil` — `useHandMark.ts:42`) so it never enrols the shared
  scheduler. **Zero-cost-at-rest by construction.** This is excellent.
- **GOOD — `draws.value` short-circuits + measure is RO-throttled** (`ResizeObserver` re-measure,
  not a scroll listener; `document.fonts.ready` re-measure once). No layout-thrash in the steady
  state: the baseline measure is a `Range.getBoundingClientRect` + a host `getBoundingClientRect`
  on resize only — bounded, not per-frame.
- **CAVEAT — the boil loop re-serializes per frame** (§1 finding): `pathD`/`liveLines`/`fragment`
  recompute `boilLines` + `serialize` (Catmull-Rom→bezier) every shared-RAF tick while armed. CPU,
  cheap, but offscreen-unparked. → §1 AUGMENT.

---

## 4. SAFARI — one real raster-flicker risk + two confirmed-OK

- **GOOD — `mix-blend-mode: multiply` (highlighter) is Safari-stable** + the `isolation: isolate`
  is deliberately ABSENT so the band composites against the PAGE backdrop (C-1(e), verified live in
  Pass-D: page text reads THROUGH the yellow band; CONFIRMED in `handmark-mid.png`). `clip-path:
  inset()` + `stroke-dashoffset` are baseline-Safari. `vector-effect: non-scaling-stroke` +
  `preserveAspectRatio="none"` are baseline. **No concern.**
- **NEW FINDING — Safari re-rasters `<filter>` graphs on transform/scroll/DPR-change** (a known
  WebKit behavior: `feTurbulence`/`feDisplacementMap` filters are re-evaluated on compositing
  changes, and `color-interpolation-filters="sRGB"` graphs can FLICKER or shift seed on scroll in
  Safari). The grained brushes (pencil/crayon/marker/highlighter/ring all carry `grain>0`) mount a
  5-stage `feTurbulence`→`feDisplacementMap`→`feColorMatrix`→`feComposite`→`feDisplacementMap`
  graph (`texture.ts:45-54`). On Safari this graph is the most expensive + most flicker-prone
  surface in the component, and the `.hm__svg` is `overflow: visible` (the wobble spills) so the
  filter region is large (`x="-40%" y="-60%" width="180%" height="220%"`). This is NOT live-broken
  (the Pass-D run was Chrome), but it is the ONE un-verified Safari risk. → **AUGMENT
  `BD.W-HANDMARK-AUDIT` (or W-VIZ-PARITY-METAL's Safari arm): add a Safari/WebKit capture of a
  grained mark (crayon/highlighter) during scroll to the π, confirming no raster-flicker / seed-
  shift.** The π `tests-visual/handmark.spec.ts` exists but the Pass-D run was Chromium only.
- **GOOD — SSR/jsdom degrade paths present**: `textRangeRect` guards `typeof Range`,
  `IntersectionObserver`/`ResizeObserver`/`document.fonts` all `typeof`-guarded, `appear="visible"`
  without IO falls to immediate static-drawn. Robust.

---

## 5. IDIOMATIC / NO-LEGACY — clean, two micro-divergences

- **GOOD — the GlassUnderline/`/underline` retirement is a clean break, no alias** (DEC-8;
  verified in `index.ts:14-18` + README). The three-underline-register fence (`.paper-ink-mark`
  structural ≠ `HandMark` hand-voice ≠ viz contourInk) is documented + load-bearing. The seed
  reconcile is single-source. No dual-path, no dead code, no shim.
- **MICRO — the `cubic-bezier(.16,1,.3,1)` draw-easing literal** (§1) should read
  `var(--ease-out-expo)` (token-first). Fold-note.
- **MICRO — `b.stamp` escape-hatch is defined + plumbed but has ZERO consumer** (`brush.ts:79`
  StampFn, `ink.ts:79` branch). It's ONE optional field (not a framework), cheap, the SPEC §5
  documented door — borderline substrate-without-consumer but defensible as the arbitrary-brush
  extensibility seam. KEEP-evidenced; do NOT prune (a future canvas/D3 consumer is the named
  trigger). Note only.

---

## 6. The GLASS SIX-LAYER COMPOSITE — N/A for the MARK, OWNED-elsewhere for the PAGE

The HandMark mark itself is an INK overlay (an SVG path over real text) — it is correctly NOT a
glass surface (a hand-drawn pen line is not frosted glass; forcing the six-layer composite onto it
would be a category error — it belongs to the PAPER morphism register, not glass). **So the
six-layer composite does not apply to the component.**

The USER'S REDESIGN ASKS, however, target the PAGE (the demo surface), and the page is the FLAT-
CREAM-CARD defect — verified directly in both captures:

| User ask | Verified state (captures + Pass-D) | Owner (already on the BD tranche) |
|---|---|---|
| glass demos over COLORFUL aurora bg | `motion → constellation` default but the handmark route renders FLAT cream paper; cards are opaque `bg-card` slabs, NO live field behind | **`BD.W-PAGE-BACKGROUND`** (the per-category map + `tier="field"` staging seam — propagates to all glass-band pages) |
| each sub-section in its OWN glassy card | each `<StorySection>` IS a card but they are flat opaque `bg-card` (no glass composite, no inner sub-section nesting) | **`BD.W-PAGE-CHASSIS`** + `BD.W-PAPER-MORPHISM` (the paper-register-where-the-gestalt-calls; handmark is THE paper home) |
| the main card area BIGGER (more screen space) | the main "Who pays in" card is wide but the page is content-column-narrow | **`BD.W-PAGE-CHASSIS`** / `W-HEADER-SCALE` (the chassis width + heroScale rungs) |
| standardize the import-path label | **ALREADY PRESENT** — `@mkbabb/glass-ui/handmark` chip renders top-left (`handmark-full.png`) | the chassis import-label chip (shipped) — **no work owed for THIS page** |
| tighten superfluous language | the demo blurbs are dense already; the `label→heading` re-key is the bigger systemic fix (6/7 sections use `label=` only → 0 `<h2>`) | **`BD.W-PAGE-CHASSIS`** (the systemic `label→heading` arm — explicitly NOT W-HANDMARK-AUDIT's, per the wave's fence) |
| paper grit visible | grain sub-perceptual (`--glass-grain-opacity:0.025`) under opaque cards; marks billed "over the paper-grain" but grain barely reads | **`BD.W-PAPER-MORPHISM`** (the demo-local readable paper rung — handmark is THE paper-home specimen) |

**None of these are bespoke handmark waves** — they are the ONE-chassis-and-propagate Band-16
cluster, and handmark INHERITS them. The handmark-specific note: handmark is a PAPER page, so its
share of `W-PAGE-BACKGROUND` is the PAPER arm (a readable paper-grit field, not an aurora — forcing
aurora behind a paper-ink demo would fight the register; the marks read MORE hand-made over visibly-
grittier paper, Pass-D §4). The "colorful aurora" ask is satisfied for handmark by a RICH PAPER
field, per the paper-morphism fence — record this so W-PAGE-BACKGROUND does not aurora-wash the
paper home.

---

## FOLD / MODIFY / AUGMENT / PRUNE ledger (vs the existing BD tranche)

| Finding | Verdict | Wave |
|---|---|---|
| boil sinusoid → irregular hand-line + pressure ribbon; MEASURING gate (not presence-regex); export `naturalUnderlinePoints` | **CONFIRM (already owned)** | `BD.W-HANDMARK-AUDIT` §1/A1–A3 |
| demo under-demo (3/7 shapes, 2/4 anims, living-line clock invisible) | **CONFIRM (already owned)** | `BD.W-HANDMARK-AUDIT` §2/A5–A6 |
| Brush continuum sound, KISS, NOT over-built; `stamp` keep-evidenced; `box`/`bracket` not pruned | **CONFIRM no-prune (A7 byte-fence)** | `BD.W-HANDMARK-AUDIT` fence #1 |
| boil-continuous clock NO offscreen-park (re-serialize per RAF tick offscreen) | **AUGMENT** — wire `boil.stop()` to an IO-visibility toggle on the demo's continuous arm, OR by-name pencil-boil offscreen-park ask | `BD.W-HANDMARK-AUDIT` (new clause A8) |
| `appear="visible"` IO `threshold:0.35` trap on a thin mark (draw-on may never fire) | **AUGMENT/FOLD** — lower to near-0 any-intersect entrance trigger | `BD.W-HANDMARK-AUDIT` (or fold-note) |
| Safari `feTurbulence`/`feDisplacementMap` grain raster-flicker on scroll — UN-VERIFIED (Pass-D was Chrome) | **AUGMENT** — add a WebKit scroll-capture to the π | `BD.W-HANDMARK-AUDIT` π / `W-VIZ-PARITY-METAL` Safari arm |
| draw-easing hard-coded `cubic-bezier(.16,1,.3,1)` → should read `var(--ease-out-expo)` | **FOLD-NOTE** (token-first divergence; byte-identical now) | minor / `W-PAGE-OFFTOKEN-SWEEP` if it sweeps SFC literals |
| aurora bg · sub-section glass cards · bigger card · paper grit · label→heading | **MAP to systemic chassis (NOT handmark)** — handmark inherits; its `W-PAGE-BACKGROUND` share is the PAPER arm (no aurora-wash on the paper home) | `BD.W-PAGE-BACKGROUND` · `BD.W-PAGE-CHASSIS` · `BD.W-PAPER-MORPHISM` |
| import-path label `@mkbabb/glass-ui/handmark` | **ALREADY SATISFIED** (chip present) | — |

**Net:** ZERO new waves. The component's two real defects are already correctly owned by
`BD.W-HANDMARK-AUDIT`; I add THREE component-level enrichments to that ONE wave (offscreen-park,
IO-threshold, Safari raster π) + ONE fold-note (easing token). The redesign asks are systemic
Band-16 chassis work handmark inherits, with the ONE handmark-specific caveat that its field is
PAPER, not aurora.

---

## 5-LINE VERDICT

1. The HandMark COMPONENT is architecturally SOUND, KISS, and NOT over-built — a genuine 12-scalar
   Brush continuum (zero instrument-`if`), a pure shape mapper, headless-extractable, SSR-safe,
   zero-cost-at-rest, idiomatic, no legacy/dual-path; the over-build concern is allayed.
2. The ONE real RENDER defect (the `boil` "natural morphology" is a mechanical periodic sinusoid —
   the family's weakest mark on its most-advertised register) + the under-demo (3/7 shapes, 2/4
   animations, the living-line clock invisible) are CONFIRMED and already correctly owned by
   `BD.W-HANDMARK-AUDIT` (re-author one pure function + expand the demo + a MEASURING gate, NOT a
   rebuild — the W4 presence-regex false-green verified on disk).
3. THREE component-level enrichments to fold into that one wave: the continuous-boil clock has NO
   offscreen-park (re-serializes per RAF tick offscreen — wire `boil.stop()` to IO-visibility), the
   `appear="visible"` IntersectionObserver `threshold:0.35` can starve a thin mark's draw-on, and
   the grained `feTurbulence` grain filter is the one UN-verified Safari raster-flicker risk (add a
   WebKit scroll-capture to the π).
4. The MARK is correctly NOT a glass six-layer surface (it is INK/PAPER morphism, not glass) — the
   user's redesign asks (aurora bg · sub-section glass cards · bigger card · paper grit ·
   label→heading) all target the PAGE and are owned by the systemic Band-16 chassis cluster
   (`W-PAGE-BACKGROUND`/`W-PAGE-CHASSIS`/`W-PAPER-MORPHISM`) that handmark inherits — with the
   binding caveat that handmark's field is a RICH PAPER register, NOT aurora (don't wash the paper
   home).
5. The `@mkbabb/glass-ui/handmark` import-label is ALREADY present; NET = zero new waves, three
   enrichments + one easing-token fold-note onto the existing, correct `BD.W-HANDMARK-AUDIT`.
