# CAROUSEL · DECK · PAGER-DOTS — the GOLDEN reference

> The de-dup + glassier-transition + dot-worm reform, resolved to ONE coherent design from
> the three brainstorm lenses (`brainstorm/lens-{a,b,c}.md`). North star: `design.md`
> (§L1 six-layer glass · §L2 spring · §L4 cartoon weight · §L7 cross-engine) +
> `IOS27-REFERENCE.md` (T5 bloom · T10 liquid-entrance · T13 carousel cadence) + the
> goo-morph `WAVE-AMENDMENT.md` (the barbell) + the `feedback-liquid-weight-universal` edict.
> KISS · DRY · NO LEGACY · a UNION with the shipped ecosystem, never a fork.

---

## 0. THE SYNTHESIS — what each lens contributed, and the one ground-truth correction

The three lenses agree on the **load-bearing architecture** and diverge on three tensions.
This GOLDEN takes the strongest move from each and resolves the tensions to ONE design.

| from | the move kept | why it is the fittest |
|---|---|---|
| **lens-a** | the **THREE-LAYER de-dup frame** (input/state · shell/transition · substrate) + the precise C2 verdict (the de-dup gap is **Layer 2, the shell**, not the engine) + the driver-vs-observer inertia carve | the cleanest articulation of *what* is duplicated; names the half-done de-dup exactly |
| **lens-b** | the **compositor-drive** insight (the morph must not be hostage to the page frame budget) — but **DE-RISKED to a bounded form** (see §2.5) + the **mount-only-during-travel** perf carve + the **bounded filter region** | the only lens that measured the real defect (7-fps page) instead of the forced-peak pin; the perf truth is binding |
| **lens-c** | the **DISTORTION built as transform-only squash-refraction** (the universal floor, Safari-native) + the **deck §3 warm FIELD** fix + the **cartoon-cast moving shadow** + the **pager accent-flood** punctuation | the boldest *and* the most Safari-honest distortion answer — no `backdrop-filter:url`, no fragile displacement as the primary |

**The GROUND-TRUTH CORRECTION (live-read of `src/styles/tokens/scheme-motion.css:289`):**
all three lenses assert `--carousel-goo-flow` is **EMPTY / falls through to the dot curve**.
**This is STALE.** Both `--carousel-goo-flow` (0.95s, +1.5% overshoot) and `--deck-goo-flow`
(1.1s, no overshoot, vestibular) **ship today** as authored dwell `linear()`s. So the GOLDEN
inertia work is a **calibration of existing curves + the cartoon-punch anticipation pre-dip**,
NOT an author-the-missing-curve. Every lens's "the carousel runs the dot's clamped curve"
born-RED is **retired** — the real born-RED is the *shape* (single convex slab) and the
*dwell-gate* (timer not neck), per the barbell amendment. The flow tokens are FIT — keep them.

**The other correction (a tension lens-a/c over-built):** the §2b **`backdrop-filter:url`
lens-refraction** (lens-a's headline DISTORTION mechanism) is **REJECTED as the primary** —
it is the exact §L7-fenced fragility (`backdrop-filter:url` is WebKit-unsupported; the gated
Chromium-only arm is a parallel-path that violates "perfect in BOTH"). lens-c's
**transform-only squash-refraction** is the GOLDEN distortion: it is Safari-native, needs no
filter, reads on EVERY engine, and is the literal §L4 squash-&-stretch. The static
`feDisplacementMap` (lens-c's *rich* arm) is **deferred to a flagged enhancement**, never the
mechanism the acceptance bar rests on.

---

## 1. THE DE-DUP VERDICT (C2) — are carousel + deck ONE substrate or two?

**TWO distinct SURFACES, sharing ONE shell that hosts ONE engine. They must NOT merge into
one component.** All three lenses converge here; the GOLDEN states it as the canonical
three-layer model:

```
┌─ LAYER 3 · INPUT/STATE   ── embla (drag-scroll · momentum · ±peek)  │  useDeck (index · keyboard · aria-live)
│                              ▲ GENUINELY DISTINCT — never unify       │  ▲ a content scroller ≠ a presentation pager
├─ LAYER 2 · SHELL/BRIDGE  ── ◄══ THE DE-DUP TARGET ══►  <GooBridge> (ONE presentational SFC + useGooTransition)
│                              the carousel · deck · pager ALL mount it; today it is hand-rolled 3×
├─ LAYER 1 · SUBSTRATE     ── useGooMorph (ONE engine · barbell) · GlassGooFilter (ONE sRGB filter) · pagerWindow
└─                            ▲ already de-duped + FIT — REUSE verbatim (the barbell amendment)
```

- **Layer 3 stays distinct** (the brief's "should a carousel use a DECK?" → **NO**): a carousel
  is a content scroller whose cadence is the FINGER (embla momentum, ±neighbour peek, fractional
  scrollProgress); a deck is a presentation pager whose cadence is a KEYPRESS (discrete index,
  `role="group"`, `aria-live` "Slide N of M"). Forcing a merge puts bounce on a content-scroller
  (cheap, T13-violating) or strips drag from the item-scroller (broken). **Distinct — correct.**

- **Layer 1 is already de-duped + fit** — `useGooMorph` is ONE engine with three consumers; the
  barbell amendment re-invents its *projection* (see §2.1). The GOLDEN does **not** re-fork it.

- **Layer 2 is the genuine de-dup the current code MISSED** (lens-a names it; lens-b/c build it).
  Today the goo *shell wiring* is hand-rolled **three times**: `CarouselContent.vue`
  (`placePlates`/`plateIndices`/`markTraveling`/the `data-traveling` gate/`GlassGooFilter` mount/
  the goo CSS), `deck.vue` (its own plate + `data-traveling` timer + its own dark arm + CSS), and
  `PagerDots.vue` (N pips + an inline `<svg>` filter + its own CSS). Three copies that **drift**
  (the deck uses a different opacity-gate selector; the pager inlines the SVG while the carousel
  imports `GlassGooFilter`). **The de-dup that is actually missing is the SHELL.**

### THE BOLD MOVE (the union of lens-b §2.4 + lens-c §1) — `<GooBridge>` + `useGooTransition`

ONE presentational SFC `<GooBridge>` + ONE thin headless `useGooTransition` composition. The
three consumers shrink to *measure slot centres, hand `<GooBridge>` an index/fraction.* This is
where the barbell migration lands in **ONE file, not three** — and it is **net-negative LOC**.

```ts
// src/composables/motion/useGooTransition.ts — the Layer-2 de-dup orchestration.
// NOT a new engine — a thin composition over useGooMorph (barbell) + the neck-gated dwell
// + the squash-refraction coupling + the @supports/PRM carve. ONE driver contract, three callers.
export function useGooTransition(opts: {
  tokenPrefix: "carousel-goo" | "deck-goo" | "pager-worm"; // each reads its OWN flow/weight tokens
  vertical: Ref<boolean>;
  centerOf: (i: number) => number | null;   // the per-consumer geometry oracle (kept)
  restSize: () => number;                    // barbell bead = step/φ (the amendment value)
  gooWeight: number;                         // carousel 1.0 (Next) / deck 0.4 / pager 0.7
  refs: { bodyARef; bodyBRef; neckRef; layerRef };  // the barbell 3-ref + the gated layer
}): {
  travel(from: number, to: number): void;    // discrete page / Next / dot-commit
  drive(fractionalIndex: number): void;       // the live drag (carousel scroll only)
  snap(index: number): void;
};
```

```vue
<!-- src/components/custom/goo-bridge/GooBridge.vue — the ONE shell, aria-hidden, pointer-events:none -->
<GooBridge
  :centers="centerOf" :rest-size="restSize" :index="activeIndex"
  :fraction="dragFraction"        <!-- optional live drag scalar (carousel only) -->
  :vertical="vertical" token-prefix="carousel-goo" :goo-weight="1.0"
  :blur="11" :threshold-slope="15" />
```

`<GooBridge>` owns: the `GlassGooFilter` mount, the `bodyA`/`neck`/`bodyB` barbell DOM, the
**neck-gated** `data-traveling` opacity (gone ≤80ms after settle — kills the dead-slab dwell),
the `.dark` warm-ink arm + the `.light` plus-lighter lift, the `@supports`/PRM CSS, and the
`useGooTransition` binding. `CarouselContent.vue` loses ~150 LOC (`placePlates`/`plateEls`/
`plateIndices`/`markTraveling`/the goo CSS); `deck.vue` loses its goo `<div>`+CSS+timer;
`PagerDots.vue` loses its inline `<svg>` + goo layer (keeps ONLY the interaction buttons +
windowing). **ONE shell, three thin consumers, ONE engine. The DRY the prior waves left on
the table.** The pager's `pattern="tabs"` (carousel) vs `pattern="group"` (deck via the 47-line
`DeckPager.vue` wrapper) interaction registers are **byte-untouched** — the de-dup is the
presentational bridge, never the input grammar.

---

## 2. THE TRANSITION — GLASSY · DISTORTION · INERTIA (C3)

The user's three words map to three precise mechanisms. The current transition fails all three
(a flat ~1.2× convex slab, dead-slab dwell, no content bend); the canonical iOS-27 read demands
them together.

### 2.1 THE SILHOUETTE — the barbell (INHERITED verbatim, not re-designed)

The silhouette is the goo-morph `WAVE-AMENDMENT.md` **barbell-neck**: TWO warm-cream bodies
(`D = restSize/φ`) + a SEPARATE neck whose `clip-path` carves a smooth concave `path()` waist
(cubic-Bézier sides, √φ-proportioned control points — NOT a faceted polygon), welded by the
static `#glass-goo` filter. The GOLDEN binds it AS-IS:

- carousel `restSize()` → the BEAD diameter `slideStep/φ` (NOT `step·0.82`); the N-plate bed is
  **DELETED**; render `bodyA`/`neck`/`bodyB` (the barbell C1/C2/C3 gates).
- the `useGooMorph.paint()` ref contract changes `morphRef` → `{ bodyARef, bodyBRef, neckRef }`
  (the amendment's engine re-invent); the `girthFloor` pinch is **GONE** (two real bodies moot it).
- deck adopts the barbell at viewport scale; pager migrates its single worm to the two-bead barbell.

**This GOLDEN adds nothing to the barbell shape — it COMPOSES it through `<GooBridge>`.**

### 2.2 GLASSY — warm transmissive, never gray, §3 field-aware (lens-a/b/c converge; lens-c's field fix)

Two root causes, both fixed:

1. **The carousel is fit** — `oklch(0.68 0.05 59°)` warm-cream (fix2, dark arm
   `saturate(1.3) brightness(1.3)`) — INHERIT verbatim. Add the symmetric **light-mode
   `plus-lighter` lift** (lens-c §2.1) so the warm-cream membrane GLOWS rather than greys, gated
   behind `@supports`. Never gray: **C ≥ 0.010, H ∈ [45,85], BOTH modes** (the fix2 floor).

2. **The deck slide panel resolves near-GRAY** (lens-c's NEW live finding:
   `oklab(0.793 0.005 0.012)` — a flat translucent taupe with NO colorful field behind it). The
   deck **fails the §3 "colorful field behind glass + a defined edge" bar the carousel passes.**
   FIX (lens-c §2.1, a **DEMO-surface change** in `deck.vue` — presets-in-consumers, NOT a library
   change): the deck slide bg adopts the carousel's warm-cream → saffron radial field (the
   `auroraFallbackGround` static mesh, or the droplet `radial-gradient` recipe generalized) so the
   goo bridge has warm chroma to bleed. The §3 read: the goo bodies stay substantial (opaque
   warm-cream domed droplets) but the **NECK region carries a lower fill alpha** so the colourful
   field reads through the thinnest part of the waist (the amendment's R5 transmission probe —
   "field through the neck + edge", the honest achievable read). **Transmitted, never a halo** —
   the goo is a sibling layer, NEVER an ancestor of the glass (the §L7 ancestor-filter trap).

### 2.3 DISTORTION — the content genuinely BENDS (lens-c's transform-only squash-refraction is THE mechanism)

This is C3's most-missed word. The worm must not just travel OVER the slides — the content must
**deform with the morph**. The GOLDEN distortion is **transform-only, Safari-native, on every
engine** (the resolution of lens-a's fragile `backdrop-filter:url` tension):

- **Squash-refraction (THE universal mechanism, lens-c §2.2).** The slide PAIR (outgoing +
  incoming) gets a volume-preserving `useLiquidFlex` squish **COUPLED to the neck-waist**: as the
  waist thins (`--goo-neck` crosses its minimum), the two slides squash toward the seam and the
  entering slide stretches OUT of it — the content itself deforms with the morph
  (`scaleX·scaleY ≈ 1`, the §L4 squash-&-stretch). Pure `transform`, no filter, PRM-carved. It
  reads as the slide being **SQUEEZED THROUGH the neck** — the 1940s "object pushed through a gap"
  gag. **This is the distortion the user feels even on the floor engine, identically in Chrome and
  Safari.** It reuses the shipped `useLiquidFlex` (no new primitive).

- **The static-displacement lens (FLAGGED enhancement, NOT the bar).** A `filter:url(#goo-lens)`
  with a STATIC `feDisplacementMap` (a baked radial `feImage`, ZERO per-frame re-raster — apparent
  motion from the bodies translating UNDER the static map, never an animated attr) MAY ride the
  Chrome-rich case to bend the slide pixels through the welling waist. It is **`@supports`-gated,
  paired-π-checked, and the acceptance bar does NOT depend on it** — the squash-refraction is the
  floor and the proof. WebKit fragility is fenced by construction (the floor IS the universal read).
  **No `backdrop-filter:url` anywhere** (the §L7 fence; lens-a's gated arm REJECTED).

### 2.4 INERTIA — Band-0 liquid-weight, the driver-vs-observer carve (lens-a's carve + lens-c's full register)

The flow curves SHIP (the §0 correction). The GOLDEN adds the cartoon register ON TOP, with the
**load-bearing driver-vs-observer carve** (lens-a §2c, lens-c §1, T13):

- **Anticipation (§L4 #2).** The entering body **buds out of** the leaving body — before travel,
  the bridge dips back via `--ease-cartoon-punch` (the ~4% sub-origin pre-dip no damped spring can
  express). carousel-Next = a SUBTLE bud; deck = a fuller pull-back. PRM → no dip.
- **`--goo-weight` per consumer (the amendment values, reconciled).** carousel **1.0** on the
  **Next-arrow** (a DRIVER — the user touched a pixel — full cartoon weight), but the carousel
  **DRAG (`drive`) stays calm-overdamped** (T13 — an over-springy content-snap reads cheap);
  deck **0.4** (the vestibular floor — a full-viewport page-flip with overshoot is nauseating);
  pager **0.7** (the loud little worm, no vestibular risk at 13px). **THE CRITICAL NUANCE:** the
  "liquid-weight universal" edict is READ on DRIVERS — the finger-drag content-snap is an
  observer (calm), the explicit Next/page/dot-commit is a driver (punchy). This is the one place
  the edict must not push bounce onto the content-carousel snap.
- **Overshoot land (§L4 #10).** √φ overshoot (~1.05–1.08, bounded; carousel below deck per T13).
- **Morph-MORE-on-move (the liquid-weight literal).** Velocity-couple the neck swell to drag speed
  via the shipped `usePointerVelocityField` → `useLiquidFlex.maxStretch`: a fast fling wells a
  FATTER, longer neck; a slow scrub barely necks. The inertia is **in the curve**, not a longer
  duration. PRM → static.
- **The cartoon-cast (lens-c §2.3).** The bridge `::after` casts a `--shadow-cartoon` that travels
  OPPOSITE the morph direction (the cel light-source-fixed read), scaled by `--goo-weight` — a bold
  layered-offset shadow that PUNCHES as the slide commits, snaps back on settle. PRM → static cast;
  survives `prefers-reduced-transparency` (the ink cast is a legibility anchor).
- **The dwell follows the NECK, not a timer (the amendment §6, all three lenses).** The bridge
  opacity gate fades IN as `neckGirth` crosses ~0 and OUT as it returns — visible EXACTLY while the
  goo deforms, gone ≤80ms after settle. `markTraveling` re-pointed to the neck-girth signal. **This
  kills the live-captured dead-slab dwell** (the flat 0.55/0.62 held across the whole window).

### 2.5 THE PERF FENCE — bounded compositor-drive, mount-only-during-travel (lens-b, DE-RISKED)

lens-b's measured truth is binding: the carousel route runs at **7 fps** (one 1728×1872 aurora +
14 backdrop-filtered layers), so an rAF-driven morph paints ~7 keyframes and reads as a slideshow.
lens-b's full **compositor-`calc()`-drive** (register `--goo-sep`/`--goo-neck`/`--goo-tri`
`@property` scalars, delete the rAF loop) is the *ideal* but is a **bigger engine surgery than the
barbell amendment contemplates** and risks a parallel drive path. The GOLDEN takes the **bounded
form**:

1. **Mount-only-during-travel (lens-b — the highest-value, lowest-risk perf carve).** At rest the
   `<GooBridge>` filter layer is **`display:none`** (not `opacity:0`) — a static `filter:url` over
   a `will-change` layer is a standing GPU cost. Mount on travel-start, unmount ≤80ms after settle
   (the neck-gated dwell already gives this seam). Kills the idle cost on the 7-fps route.
2. **Bounded filter region.** The barbell's two SMALL beads box the filter region to the two-bead
   span (~10× smaller blur raster than the slide-wide plate). Inherited from the barbell.
3. **The flow does the smoothing, not the rAF.** `--goo-t` is ALREADY a registered `@property`
   transitioned on the flow `linear()` — the COMPOSITOR interpolates it regardless of main-thread
   fps. The rAF only *reads* it and writes the barbell transform. The GOLDEN keeps the rAF (the
   barbell amendment's mechanism) but **flags the compositor-`calc()` drive as a future
   optimization** (`BD.W-GOO-COMPOSITOR-DRIVE`, lens-b) — NOT in the acceptance bar, because the
   barbell + mount-gate + bounded region already lift the read, and the `calc()` triangle-wave is a
   real risk surface that must not block the de-dup.
4. **Route chassis (FLAGGED, owned by Band-C demo-chassis).** The 7-fps debt is the route's
   aurora + canvas + backdrop-filters needing `useIntersectionPause`/offscreen-park. Named honestly
   as the REAL reason the morph reads chuggy; not owned by this wave.

---

## 3. THE PAGER-DOTS WORM (C4) — does the dot indicator goo-morph?

**Live-verified: YES it does today** — `.pager-goo-layer` carries N opaque pips + ONE `.goo-worm`
capsule under the static `#pager-goo` filter; the worm necks scaleX ~5.3 / scaleY 0.72 (a decisive
Google-deck worm at dot scale — the rest body is small, so a multi-dot travel necks 5×). **This is
the FIT register the carousel/deck emulate, not replace.** All three lenses agree.

**The refinement (rides the barbell amendment's pager migration):** the single worm → a true
**two-bead BARBELL** (leaving-pip + entering-pip necking into a concave waist) — ONE topology
across all three consumers, byte-consistent. The BIG/SLOW magnitude (1.8s dwell,
`--pager-worm-max-stretch 1.45`) is tuned — KEEP it. The pager is the **LOUDEST consumer**
(`--goo-weight 0.7`, no vestibular risk at 13px — the register where the technicolor flow is most
exuberant). It rides `<GooBridge>` with `token-prefix="pager-worm"`.

**The gestalt addition (lens-a + lens-c converge):** on commit, an OPT-IN one-shot
`--pager-accent-flood` plus-lighter wash off the landing dot's `--glass-accent` (the T4
accent-flood precedent), trailing the worm settle — a momentary technicolor "ta-da" punctuation
that clears (EFFECTS trails SPATIAL). Off by default (presets-in-consumers), loud when opted in.
PRM-static.

**Safari-safe:** the `#pager-goo` graph is byte-unchanged (static sRGB literals, no
`backdrop-filter:url`, `@supports`/PRM floors). The inline `<svg>` migrates into the shared
`GlassGooFilter` via `<GooBridge>` (ONE filter definition, the de-dup). §L7 HOLDS.

---

## 4. CROSS-ENGINE + A11Y (§L7 + §L5)

- **Goo (all three consumers):** static inline-SVG `filter:url()` over a frozen `<GooBridge>` layer
  whose children move on `transform`/`clip-path`; `color-interpolation-filters="sRGB"`;
  `stdDeviation`/`feColorMatrix` are STATIC LITERALS (no `var()` in the graph — the WebKit
  var-driven-blur trap); NO `backdrop-filter:url` anywhere; `@supports not (filter:url(#x))` →
  plain cross-fade floor; PRM → `display:none` goo + instant snap.
- **Distortion:** transform-only squash-refraction (Safari-native, the universal read). The
  static-`feDisplacementMap` lens is `@supports`-gated, paired-π-checked, and OUT of the bar.
- **A11y:** `<GooBridge>` is `aria-hidden` + `pointer-events:none` ALWAYS (purely presentational —
  it cannot regress a11y because it has none). The carousel's embla focus / `tablist` /
  `aria-selected`, the deck's `role="group"`/`aria-current` + `aria-live` "Slide N of M", the
  pager's `tablist`/24px WCAG-2.5.8 hit-targets + focus-survival-across-window — ALL byte-untouched
  on the interaction layer ABOVE the goo.
- **PRM (§L5):** `--motion-weight → 0` zeroes the anticipation dip, overshoot, velocity swell, arc,
  cartoon-cast travel, and the squash in ONE cascade; the goo layer `display:none`; the barbell
  coalesces to ONE resting body; only the embla translate (carousel) / slide cross-fade (deck) /
  dot snap (pager) survive.
- **`prefers-reduced-transparency`:** the bridge drops to an OPAQUE warm-cream body cross-fade (the
  six-layer composite collapses to the solid `--card` endpoint); the cartoon-cast ink SURVIVES.
- **Perf:** `<GooBridge>` mounts only during travel (`display:none` at rest), `contain: layout
  paint`, bounded filter region, the displacement map computed once (static SVG).

---

## 5. THE ACCEPTANCE BAR — `proof:carousel-deck-glass` (rides `proof:goo-barbell`)

INHERIT the barbell `proof:goo-barbell` rendered-alpha gate (two bodies + concave waist,
`waistRatio ≤ 0.45`, `hasLocalMinimum = true`, paired Chromium + Safari-Metal). ADD the GOLDEN's
arms, **every born-RED a REAL rendered/measured readback, NEVER `neckGirth·const` arithmetic**
(the cardinal anti-pattern):

- **C1 · de-dup (SHELL).** ONE `<GooBridge>` + ONE `useGooTransition`; the carousel, deck, AND
  pager ALL mount it; NO per-consumer hand-rolled goo `<div>`+filter+`data-traveling` CSS;
  `placePlates`/`plateIndices`/the inline `#pager-goo` `<svg>` are GONE. **RED on HEAD** (the deck
  goo lives in `demo/stories/motion/deck.vue`, the pager inlines its `<svg>`, the carousel has
  `placePlates` at `CarouselContent.vue:119`).
- **C2 · barbell.** Both shells render `bodyA`/`neck`/`bodyB`; `hasLocalMinimum = true` +
  `waistRatio ≤ 0.45` on a RENDERED cross-axis alpha readback at the neck peak AND the widest gap,
  BOTH shells, BOTH modes (rasterize → `getImageData`, NEVER arithmetic). **RED on HEAD** (the
  ~1.2× convex slab, `hasLocalMinimum = false`).
- **C3 · distortion.** The slide content measurably deforms through the waist — the outgoing/
  incoming slide pair's `scaleX·scaleY ≈ 1` squash COUPLED to `--goo-neck` (a measured transform
  delta at the throat midpoint), reading IDENTICALLY in Chromium AND WebKit (the transform-only
  floor; `|webkit − chromium| ≤ 0.05`). **RED on HEAD** (the worm OCCLUDES at `z-index:2`, no
  content deform).
- **C4 · §3 deck field + no-gray.** The deck slide bg chroma **C ≥ 0.010, H ∈ [45,85]** both modes
  (warm field, the goo has chroma to bleed); the goo warm-cream both shells both modes. **RED on
  HEAD** (the live `oklab(0.793 0.005 0.012)` near-gray taupe).
- **C5 · inertia.** The Next `--goo-weight = 1.0`, the drag stays calm (T13 — content-snap
  overshoot ≤ the smooth floor); the deck 0.4; the neck DWELLS ≥250ms then pinches; the bridge is
  GONE ≤80ms after settle (neck-gated, not timer). **RED on HEAD** (the flat 0.55/0.62 dead-slab
  dwell across the whole window).
- **C6 · §L7 + perf.** Static `#glass-goo` (sRGB, no `var(` in the graph, no `backdrop-filter:url`
  anywhere); `@supports`/PRM floors present; `<GooBridge>` is `display:none` at rest (mount-gate);
  PAIRED-engine π, `|webkit.waist − chromium.waist| ≤ 0.05`.

### The binding π — `tests-visual/carousel-deck-glass.spec.ts`

A PAIRED-engine rAF frame-series on a REAL Next-click `/navigation/carousel` AND a REAL
page-advance `/motion/deck` AND a REAL dot-travel `<PagerDots>`, BOTH modes, Chromium AND real
Safari-26-on-Metal (`@webkit`), LIVE MOTION (NEVER `reducedMotion` for the morph arm). Rasterize
the `<GooBridge>` output → walk the post-threshold cross-axis alpha (the waist), the slide-pair
squash transform under the throat (the distortion), the neck-gated opacity (the dwell), the
warm-cream + deck-field chroma. Born-RED CAPTURED LIVE (the §0 + barbell-amendment live readings:
the 1.2× convex slab, `hasLocalMinimum=false`, flat 0.55/0.62 dwell, deck near-gray, occlusion-
only worm, three hand-rolled shells).

### Gestalt row — `carousel-deck-glass`

A real Next-click reads: the entering card BUDS out of the leaver (anticipation dip), TWO
warm-cream bodies STRETCH into a thin CONCAVE waist that the content visibly SQUASHES through (the
liquid lens, transform-only, Chrome=Safari), the neck DWELLS ~250–400ms then PINCHES + the card
OVERSHOOTS home with a cartoon-cast PUNCH — fling faster → the neck wells FATTER. The deck
transmits a warm saffron field (no more gray). The pager dots goo-WORM as a true two-bead barbell,
flooding a tiny accent on land. Warm-cream both modes, both engines, the carousel calm-overdamped
on the drag (T13) while the Next/deck/pager carry the punch. ONE `useGooMorph`, ONE `<GooBridge>`,
three thin mounts — net-negative LOC, no fork, no legacy. Born-FAIL on HEAD; GREEN at close;
W-REFLECT re-confirms on fresh pixels.

---

## 6. DELTA-ASSAY — wave reconciliation (union, no dup vs the goo-morph amendment + the 116-wave set)

| disposition | wave / artefact | action |
|---|---|---|
| **DEPEND (foundation)** | `BD.W-GOO-BARBELL-NECK` | the silhouette re-invent + the concave throat + the engine 3-ref projection + the dwell-follows-neck + the 3-consumer migration. This GOLDEN RIDES it; does NOT re-author the barbell. |
| **NEW (shell de-dup)** | `BD.W-GOO-BRIDGE-SHELL` | factor `<GooBridge>` + `useGooTransition` — the Layer-2 de-dup across carousel/deck/pager. Net-negative LOC; the three consumers shrink to measure-centres-hand-index. The barbell migration lands HERE in ONE file. |
| **NEW (transition feel)** | `BD.W-CAROUSEL-DECK-GLASS` | the C3 glassy/distortion/inertia: the squash-refraction distortion + the deck §3 warm field (deck.vue, presets-in-consumers) + the light plus-lighter arm + the cartoon-cast + the driver-vs-observer carve + the mount-gate perf. |
| **INHERIT verbatim** | `W-GOO-CAROUSEL-DECK-FIX2` | the dark warm-ink arm + the travel-gate. KEEP; the light arm is added symmetric. |
| **DEPEND (sibling)** | `BD.W-MOTION-WEIGHT` / `BD.W-CARTOON-PUNCH` | `--goo-weight = --motion-weight`; the anticipation uses `--ease-cartoon-punch`. Source-verified ABSENT from `src/styles/` today — honest sibling deps, not phantom reuse. |
| **NO-OP confirm** | `W-CAROUSEL-CADENCE` (T13) | the carousel content-snap is calm-overdamped (`drive` stays smooth, no content-bounce); the punch lives on the Next/deck/pager drivers. HONORED. |
| **SUPERSEDE** | `W-GOO-CAROUSEL-DECK`, `W-GOO-MORPH-REFINE`, `W-PAGER-GOO-MORPH` | the N-plate bed + the per-consumer hand-rolled shells + the single-worm topology → superseded by the barbell (bed delete) + `<GooBridge>` (shell de-dup). Clean break, no alias. |
| **FLAG (future optimization)** | `BD.W-GOO-COMPOSITOR-DRIVE` (lens-b) | the `@property` `--goo-sep`/`--goo-neck` `calc()` compositor-drive — a real fps-independence win, but OUT of this bar (the mount-gate + barbell + bounded region lift the read; the triangle-wave `calc()` is a risk surface that must not block the de-dup). |
| **FLAG (Chrome-rich enhancement)** | static-`feDisplacementMap` lens | the `@supports`-gated, paired-π-checked Chrome content-bend; OUT of the bar (the squash-refraction floor is the proof). NO `backdrop-filter:url`. |
| **FLAG (demo-chassis, Band C)** | the carousel route 7-fps debt | `useIntersectionPause`/offscreen-park the aurora + canvas — the REAL reason the morph reads chuggy. Named, owned by the demo-chassis band. |
| **UNTOUCHED** | embla `useCarousel`, `useDeck`, `pagerWindow`, `DeckPager` 47-line wrapper; `BD.W-DOCK-*`, `BD.W-BLOB-*` | the SURFACE engines (Layer 3) are correct + distinct; dock-fission goo + WebGL viz are separate scales. ONE optional DRY: the concave throat MAY be shared with the fission neck (flagged, not mandated). |

---

## 7. FENCES (the non-negotiables)

- **The de-dup is at Layer 2 (the shell `<GooBridge>`), NOT Layer 3 (input/state)** — the carousel
  (embla, drag) and the deck (`useDeck`, keyboard/aria) stay DISTINCT components that COMPOSE one
  bridge. Never merge them into one component (the bolt-on trap).
- **The goo ENGINE is already de-duped + fit — REUSE it (the barbell amendment), never re-fork.**
  `useGooTransition`/`<GooBridge>` is a COMPOSITION, not a second engine.
- **The distortion is TRANSFORM-ONLY (squash-refraction) — Safari-native, the bar.** NO
  `backdrop-filter:url` anywhere (lens-a's gated arm REJECTED); the `feDisplacementMap` lens is a
  flagged Chrome-rich enhancement OUT of the bar.
- **The driver-vs-observer carve is LOAD-BEARING:** the carousel DRAG stays calm-overdamped (T13);
  the Next-arrow/deck/pager carry the punch. "Liquid-weight universal" is read on DRIVERS.
- **The flow curves SHIP** (`--carousel-goo-flow` / `--deck-goo-flow`) — the inertia work is
  calibration + the anticipation pre-dip, NOT author-the-missing-curve. The lenses' "empty flow"
  born-RED is STALE; the real born-RED is the SHAPE + the dwell-GATE.
- **The born-RED is a REAL rendered readback, NEVER arithmetic** (the cardinal bar).
- **Static `#glass-goo`, sRGB literals, `@supports`/PRM floors, the graph byte-unchanged** (§L7).
- **NO LEGACY** — the N-plate bed, the demo-hand-rolled deck goo, the inline pager `<svg>`, the
  single-worm topology, the timer-driven dwell, the deck near-gray slide are DELETED in the same
  amendment, not aliased.
