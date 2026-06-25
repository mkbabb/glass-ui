# CAROUSEL · DECK · PAGER-DOTS — greenfield brainstorm, LENS-C (audacious cartoon-technicolor punch)

> The C2 (de-dup) / C3 (glassier · distortion · inertia) / dot-worm reform, designed from
> first principles through the 1940s-technicolor FLOW-&-PUNCH lens — then deftly UNIONED
> with the shipped surfaces and the goo-morph **barbell** amendment (no re-fork, no legacy).
> The bar is the iOS-27 reference BETTERED, and the user's "remember this always" liquid-weight.

---

## 0. LIVE-VERIFIED status quo (real painted readback, NOT getComputedStyle-over-a-field)

Captured on the running dev server (`localhost:5173`), real Next-click + real page-advance,
rAF frame-series over the live goo layer (artefacts in `.scratch-lens-c/`):

- **Three consumers DO share ONE `useGooMorph`** — the live DOM carries `.carousel-goo-layer`,
  `.deck-goo-layer`, `.pager-goo-layer` simultaneously; the engine de-dup (C2's first half) is
  REAL and FIT. The carousel hosts 12 static plates + 1 worm; the deck hosts **1 plate + 1 worm**;
  the pager hosts N goo-dots + 1 worm. KEEP the engine, retire the topology.
- **The transition is a single convex SLAB, not a meatball.** Carousel Next-click peaks
  `scaleX 1.227 @ 586ms` with a UNIFORM `scaleY 0.903` (one body pinching uniformly — no waist);
  deck advance peaks `scaleX 1.702 @ 676ms`, uniform `scaleY 0.85`. `hasLocalMinimum = false` on
  both — there is no second body to neck INTO, so no blob↔meatball is geometrically possible. This
  is the born-RED the barbell amendment already named, now RE-CONFIRMED at both scales.
- **The bridge is a DEAD SLAB.** Layer opacity is pinned FLAT — carousel `0.55`, deck `0.62` —
  across the WHOLE 1.4–1.6s window while motion settles by ~600ms. The glass holds visible long
  after the morph is gone (the timer-driven `markTraveling`, not neck-driven). This reads as a
  lazy fade, NOT a punchy liquid merge.
- **§3 field-asymmetry (a NEW finding the prior docs missed).** The carousel card is warm-cream
  (`oklab(0.976 0.005 0.013)` — no-gray HOLDS). The **deck slide panel is near-GRAY**:
  `oklab(0.793 0.005 0.012 / 0.84)` — L 0.79 but chroma ≈ 0.013, a flat translucent taupe with
  NO colorful field behind it. The deck FAILS the §3 "colorful field behind glass + a defined
  edge" bar that the carousel passes. C3's "glassier" is not only a filter tune — the deck needs a
  FIELD to transmit, or the glass has nothing warm to bleed.
- **Distortion is ABSENT.** Neither surface bends its content. The worm is an OPAQUE warm plate
  riding OVER the slides (`z-index: 2`, content `z-index: 1`) — it OCCLUDES, it does not REFRACT.
  The user's "more DISTORTION" (the goo/lens bending the content) is genuinely unbuilt: there is no
  displacement, no chromatic split, no lens. C3's distortion ask is a real gap, not a calibration.

So: **the ENGINE de-dup is fit; the SHELLS are two distinct surfaces (correct — see §1); the
SILHOUETTE is broken (barbell fixes it); the BRIDGE-DWELL is wrong; the DECK FIELD is gray; the
DISTORTION is unbuilt.** This lens designs the bold, alive resolution of all five.

---

## 1. C2 — DE-DUP INTEGRITY: are carousel and deck ONE substrate or two? (the verdict)

**They are TWO distinct SURFACES sharing THREE shared substrates. The prior answer holds —
refined and made precise. Do NOT unify the shells further; that would be a regression.**

A carousel is **not** a deck and a deck is **not** a carousel. The difference is the DRIVER (§L2
driver-vs-observer):

| axis | CAROUSEL (`/navigation/carousel`) | DECK (`/motion/deck`) |
|---|---|---|
| input | **continuous drag** (embla momentum, fling, sub-slide scrub) | **discrete page** (keyboard/click, one slide commits) |
| viewport | item-scroller — **±neighbour peek always visible** (T13) | full-bleed — **one slide owns the frame** |
| count model | many small cards, scrollProgress is fractional | few large slides, index is integral |
| a11y register | `role="tablist"` / `aria-selected` (panel nav) | `role="group"` / `aria-current` + `aria-live` "Slide N of M" |
| motion driver | **observer** — calm overdamped snap, NO content-bounce (T13) | **driver** — the page-change CAN carry weight, but VESTIBULAR-floored (no full-viewport bounce) |

Forcing a carousel to "be a deck" (or vice-versa) collapses the driver distinction the whole
motion canon rests on — it would either put bounce on a content-scroller (cheap) or strip the
drag-scrub from the item-scroller (broken). **The de-dup is CORRECT as a SUBSTRATE de-dup, not a
shell merge.** The three genuinely-shared substrates — already shipped, KEEP:

1. **`useGooMorph`** — the ONE transition engine (the barbell after this wave). carousel=`drive()`
   on drag + `travel()` on snap; deck=`travel()` on page; pager=`travel()` on active. Per-consumer
   `tokenPrefix` + `--goo-weight`. ✅ shipped, fit.
2. **`<PagerDots>` / `pagerWindow`** — the ONE dot oracle. carousel binds it directly (`pattern="tabs"`);
   `<DeckPager>` is a thin `pattern="group"` wrapper. ✅ shipped, fit — `DeckPager.vue` is a 47-line
   wrapper, zero re-implementation. This IS the de-dup done right.
3. **`<GlassGooFilter>`** — the ONE static SVG metaball filter (Safari-safe sRGB). ✅ shipped, fit.

**LENS-C REFINEMENT (the bold de-dup TIGHTENING, net-negative LOC):** the three consumers each
re-declare the same `data-traveling` bridge-fade + the same N-plate/worm boilerplate. There is a
**fourth** de-dup the prior set missed: **the goo SHELL itself.** Extract a headless
**`useGooTransition({ host, layer, bodies, neck, driver })`** composition wrapper (NOT a new
engine — a thin orchestration over `useGooMorph` + the bridge-dwell + the `@supports`/PRM gate)
that the carousel, deck, AND pager all mount. Today each consumer hand-writes `markTraveling`, the
dwell timer, the plate placement, the `@supports`/PRM CSS. That is **three copies of the same
shell logic** — a DRY violation hiding behind a shared engine. One `useGooTransition` + a
`<GooBridgeLayer>` presentational SFC (the `bodyA`/`neck`/`bodyB` + the filter mount + the no-gray
dark arm, ONE place) makes the barbell migration land in ONE file, not three. **This is the boldest
de-dup move: de-dup the SHELL, not just the ENGINE — carousel/deck/pager become 3 thin `<GooBridgeLayer>`
mounts.** (See §6 disposition: this SUPERSEDES the per-consumer goo CSS blocks.)

---

## 2. C3 + the barbell — the TRANSITION: GLASSY · DISTORTION · INERTIA (the technicolor build)

The transition is where the lens earns its name. Four moves, each a precise mechanism, each a
UNION with shipped primitives.

### 2.1 GLASSY — warm transmissive, never gray, §3 field-aware (the two root causes fixed)

**Root cause A — the deck has no field to transmit (NEW).** The carousel transmits a warm-cream
card; the deck transmits a near-gray taupe. Fix: the deck demo slide surface adopts a **living
warm field** behind the glass — NOT a new engine, but the shipped `auroraFallbackGround` static
mesh (or a `<Aurora>` calm preset where the route budget allows). The §3 bar is "a COLORFUL FIELD
behind glass + a defined edge"; the deck slide gets a warm-cream → saffron radial field (the
carousel's exact `radial-gradient(120% 90% at 50% 18%, …white 18%…)` droplet recipe, generalized
to the slide bg) so the goo bridge has warm chroma to bleed. **This is a DEMO-surface fix (deck.vue),
not a library change** — presets-in-consumers.

**Root cause B — the bridge is opaque occlusion, not transmission.** Today the worm sits at
`z-index: 2` OVER the content as an opaque warm plate. Lens-C makes the bridge **transmissive**:
the goo bodies carry the six-layer warm composite at the LAYER opacity (the opaque-shape /
translucent-layer technique already used), and — the bold part — the bridge layer gets a
**`mix-blend-mode: plus-lighter`** warm wash arm in light mode (a LUMINOUS membrane the field reads
through, the iOS-27 "lit glass" read) gated behind `@supports`. The dark arm already does
`saturate(1.3) brightness(1.3)` (fit, KEEP); light mode gets the symmetric plus-lighter lift so the
warm-cream membrane GLOWS rather than greys. **Never gray: C ≥ 0.010, H ∈ [45,85], both modes**
(the FIX2 floor, inherited verbatim).

### 2.2 DISTORTION — the goo/lens genuinely BENDS the content (the unbuilt ask, built)

This is C3's most-missed word and the lens's biggest swing. The worm must not just travel OVER the
slides — it must **REFRACT them**. Two compositor-safe distortion channels, Safari-fenced:

- **The displacement neck (Chrome-rich, Safari-floored).** At the neck-waist, the bridge applies a
  bounded `filter: url(#goo-lens-displace)` — a STATIC `feDisplacementMap` (a baked radial
  gradient `feImage`, ZERO per-frame re-raster — the displacement *strength* is a static literal,
  the apparent motion comes from the bodies translating UNDER the static map, never an animated
  `scale` attr → the §L7 / WebKit #184601 fence). The slide content beneath reads BENT through the
  welling waist — a real liquid lens. **Safari fence:** `feDisplacementMap` over `SourceGraphic`
  is WebKit-fragile; `@supports` + a π-paired check gate it. The floor (no displacement support) is
  the §2.3 **squash-refraction** below (a transform-only fake-refraction that needs no filter).
- **Squash-refraction (the universal floor, transform-only, the cartoon read).** The slide PAIR
  (outgoing + incoming) gets a vol-preserving `useLiquidFlex` squish COUPLED to the neck-waist: as
  the waist thins, the two slides squash toward the seam and the entering slide stretches out of it
  — the content itself deforms with the morph (`scaleX·scaleY ≈ 1`, the §L4 squash-&-stretch). This
  is pure `transform`, Safari-native, the PRM-carved floor, and it reads as the slide being SQUEEZED
  THROUGH the neck — the technicolor "object pushed through a gap" gag. **This is the distortion the
  user feels even on the floor engine.**

### 2.3 INERTIA — Band-0 liquid-weight, cartoon-punch, morph-more-on-move

The current `--carousel-goo-flow` is a hand-tuned dwell curve (fit for the dwell, but it has NO
anticipation, NO punch). Lens-C wires the FULL cartoon register (§L4):

- **Anticipation (§L4 #2).** The entering body **buds out of** the leaving body — before the slide
  travels, the bridge dips back via `--ease-cartoon-punch` (the real ~4% sub-origin pre-dip no
  damped spring can express). On the carousel (observer) this is a SUBTLE bud; on the deck (driver)
  it is a fuller pull-back. PRM → no dip.
- **Overshoot land (§L4 #10).** The body settles on the target with a √φ overshoot (~1.05–1.08,
  bounded — the carousel stays BELOW the deck's punch per T13: an over-springy CONTENT carousel
  reads cheap). `--goo-weight`: **carousel 0.50** (observer, calm-overdamped snap — the T13 floor),
  **deck 0.62** (`= 1/φ`, the driver rest), **pager 0.7** (the loud little worm).
- **Morph-MORE-on-move (the liquid-weight universal).** Velocity-couple the neck swell to drag
  speed via the shipped `usePointerVelocityField`: a fast fling wells a FATTER, longer neck (the
  swell scales with |v|); a slow scrub barely necks. The `useLiquidFlex` `--stretch` already reads a
  travel-fraction; lens-C feeds the LIVE velocity into `maxStretch` so the bridge "morphs more on
  fast move" (the user's literal canon). PRM → static.
- **The moving cartoon-cast (§Shadows).** The bridge `::after` casts a `--shadow-cartoon` that
  travels OPPOSITE the morph direction (the cel light-source-fixed read), scaled by `--goo-weight`.
  Bold layered-offset shadow that PUNCHES as the slide commits, snaps back on settle. PRM → static cast.
- **The dwell follows the NECK, not a timer.** The bridge opacity gate fades IN as `neckGirth`
  crosses ~0 and OUT as it returns — the glass is visible EXACTLY while the goo deforms, gone ~80ms
  after settle. This KILLS the live-captured dead-slab dwell (0.55/0.62 held flat). `markTraveling`
  is re-pointed to the neck-girth signal (the barbell amendment §mechanism-6, adopted verbatim).

**Net C3 read:** the slide change ANTICIPATES (buds back), STRETCHES into a thinning concave waist
that BENDS the content through it, MERGES blob↔meatball, then PINCHES + OVERSHOOTS onto the target
with a cartoon-cast punch — weighty warm liquid glass, distorting the content, morphing more the
faster you fling. Both modes warm-cream, both engines.

---

## 3. The PAGER-DOTS WORM — does the dot indicator goo-morph? (the Google-deck feel)

**Today: YES the worm exists, but it is the SAME condemned single-worm-into-static-dots** (live:
N opaque goo-dots + 1 traveling worm capsule, `girthFloor 0.72`). It STRETCHES and the goo filter
bridges it into each dot it passes — that IS a Google-deck-style morph and it reads better than the
carousel (small scale, fat fringe, the merge holds). But it is the same topology defect at dot
scale: the worm is ONE convex capsule fattening, not two beads necking.

**Lens-C: migrate the worm to the BARBELL too — and make it the LOUDEST consumer.** The dot worm
is the register where the technicolor flow can be most exuberant without vestibular risk (a 13px
dot has no full-viewport motion-sickness floor). The pager worm becomes a true **two-bead barbell**:
the leaving-dot bead and the entering-dot bead, necking into a thin concave waist, dwelling open,
then pinching — the literal Google-Slides dot-worm. `--goo-weight: 0.7` (the loud little worm),
`--neck-gap: 0.7`, `--pager-worm-max-stretch: 1.45` (KEEP — the visible squish). Multi-gap travel
(jumping 3 dots) necks across the WHOLE span on the slow flow (already correct in `paint()`'s
gap-invariant `p`).

**Safari-safe (static SVG goo, §L7):** the `#pager-goo` filter is byte-static literals
(`stdDeviation 8`, `feColorMatrix 16 -5`, `sRGB`), `@supports not (filter:url())` drops to the plain
transform worm, PRM `display:none`s the goo layer + snaps the worm. ✅ already correct — KEEP the
filter graph, swap only the topology (1 worm → 2 beads + neck) via the shared `<GooBridgeLayer>`.

**The dot worm BLEEDS the section color (the technicolor bonus).** `--pager-dot-active` is a consumer
token (`var(--foreground)` default; slides sets `--ncsu-red`). Lens-C adds an OPT-IN one-shot
**accent-flood** on commit (the T4 fission-ripple precedent): the landing dot momentarily floods its
`--glass-accent` then clears (plus-lighter, PRM-static) — the worm SNAPS home with a tiny color punch,
the 1940s "ta-da" beat. Off by default (presets-in-consumers), loud when a consumer opts in.

---

## 4. Cross-engine + a11y (the §L7 + §L5 carve)

- **Chrome + Safari (§L7).** The `#glass-goo` / `#pager-goo` graphs are byte-static sRGB literals
  (no `var()` in the SVG, no `backdrop-filter:url()`, no animated filter attrs — the WebKit
  #184601 fence). Bodies move on `transform`; the neck deforms on `clip-path`/`scale`; the bridge
  opacity on `opacity`; the distortion displacement map is a STATIC `feImage`. The
  `@supports not (filter: url(#x))` floor cross-fades the bodies (no merge) and the squash-refraction
  carries the distortion read with zero filter. **The acceptance proof is PAIRED-engine** (Chromium
  AND real Safari-26-on-Metal) — the waist-ratio + the warm-cream chroma + the displacement read,
  `|webkit − chromium| ≤ 0.05` (the barbell amendment π, adopted).
- **PRM (§L5).** `--motion-weight → 0` zeroes the anticipation dip, the overshoot, the velocity
  swell, the arc, the cartoon-cast travel, the displacement, and the squash in ONE cascade
  assignment; the goo layer is `display:none`; the worm/bodies SNAP to the target; only the embla
  translate (carousel) / the slide opacity cross-fade (deck) survive. The pager worm snaps; the dot
  bed is the static indicator. **No goo frames under reduce.**
- **`prefers-reduced-transparency`.** The bridge drops to an OPAQUE warm-cream body cross-fade (the
  six-layer composite collapses to the solid `--card` endpoint); the cartoon-cast (opaque ink)
  SURVIVES as a legibility anchor (§Shadows: reduced-transparency does not touch the ink cast).
- **`prefers-contrast: more`.** The neck-edge + the dot-edge floor UP (the inked silhouette is a
  legibility asset, not decoration).
- **A11y registers UNTOUCHED.** carousel `tablist`/`aria-selected`, deck `group`/`aria-current` +
  `aria-live` "Slide N of M", pager 24px WCAG-2.5.8 hit-targets + focus-survival-across-window — all
  ride the interaction layer ABOVE the presentational goo (byte-kept). The goo is `aria-hidden` +
  `pointer-events:none` everywhere.

---

## 5. The precise mechanism summary (tokens · recipes · composables — DEFT, no new engine)

| concern | mechanism | disposition |
|---|---|---|
| transition engine | `useGooMorph` — barbell projection (`bodyA`/`neck`/`bodyB`) | KEEP engine, re-invent projection (barbell amendment) |
| **shell de-dup** | NEW `useGooTransition` + `<GooBridgeLayer>` SFC — ONE shell, 3 thin mounts | **LENS-C net-new (DRY win, net-neg LOC)** |
| concave waist | `--neck-waist` smooth `path()` cubic-Bézier throat (√φ control pts) | barbell amendment (net-new), shared via `<GooBridgeLayer>` |
| glassy / no-gray | layer-opacity translucency + dark `saturate/brightness` + **NEW light `plus-lighter` lift** | FIX2 dark arm KEEP + lens-C light arm |
| **deck §3 field** | deck slide bg → warm-cream radial / `auroraFallbackGround` mesh | **lens-C demo fix (deck.vue, presets-in-consumers)** |
| distortion | STATIC `feDisplacementMap` lens at the waist + `useLiquidFlex` squash-refraction floor | **lens-C net-new (Safari-fenced)** |
| inertia / punch | `--ease-cartoon-punch` pre-dip + √φ overshoot + `--goo-weight` per consumer | DEPENDS `BD.W-CARTOON-PUNCH` / `BD.W-MOTION-WEIGHT` |
| morph-more-on-move | `usePointerVelocityField` → `useLiquidFlex.maxStretch` | reuse shipped primitive |
| cartoon-cast | `::after` `--shadow-cartoon`, travels opposite, `× --goo-weight` | §Shadows register (shipped) |
| dwell | neck-girth-gated opacity (not timer) | barbell amendment §6 |
| pager worm | 2-bead barbell, `--goo-weight 0.7`, opt-in accent-flood | barbell amendment + lens-C flood |
| Safari | static sRGB `#glass-goo`/`#pager-goo`, `@supports`/PRM floors, paired-π | §L7 (shipped contract) |

New tokens (declared once): `--{prefix}-neck-gap` (pager 0.7 / carousel 0.78 / deck 0.85),
`--neck-waist`, `--goo-weight` (carousel 0.50 / deck 0.62 / pager 0.7; `= --motion-weight`),
`--{prefix}-displace-strength` (the bounded static lens depth), `--{prefix}-accent-flood-t`
(pager opt-in). Sibling deps (real, not phantom): `BD.W-CARTOON-PUNCH` (`--ease-cartoon-punch`),
`BD.W-MOTION-WEIGHT` (`--motion-weight`).

---

## 6. DELTA-ASSAY → wave reconciliation (union, no dup vs the 116-wave set + barbell)

| disposition | wave / file | action |
|---|---|---|
| **DEPEND (foundation)** | `BD.W-GOO-BARBELL-NECK` | this lens RIDES the barbell amendment — the silhouette re-invent, the concave throat, the dwell-follows-neck, the 3-consumer migration are ITS deltas; lens-C ADDS the shell-de-dup + distortion + field + flood ON TOP. No conflict, pure superset. |
| **NEW (single lens wave)** | `BD.W-CAROUSEL-DECK-GLASS` | the C3 glassy/distortion/inertia + the deck §3 field + the `<GooBridgeLayer>`/`useGooTransition` shell-de-dup + the pager accent-flood. ONE wave; everything else folds in. |
| **SUPERSEDE** | `W-GOO-CAROUSEL-DECK`, `W-GOO-MORPH-REFINE`, `W-PAGER-GOO-MORPH` | already superseded by the barbell amendment for topology; lens-C ALSO supersedes their per-consumer goo CSS blocks (→ the ONE `<GooBridgeLayer>`). Clean break, no alias. |
| **INHERIT (depend)** | `W-GOO-CAROUSEL-DECK-FIX2` | dark warm-ink arm + travel-gate inherited verbatim; lens-C adds the symmetric light plus-lighter arm. |
| **DEPEND (sibling)** | `BD.W-CARTOON-PUNCH`, `BD.W-MOTION-WEIGHT` | `--ease-cartoon-punch` / `--motion-weight` honest lineage (NOT yet in `src/styles/` — confirmed plan-stage). |
| **UNTOUCHED (orthogonal)** | `BD.W-DOCK-GOO-SPACING`, `BD.W-GOO-SPLIT-PERF`, `BD.W-FISSION-*`, `BD.W-BLOB-*` | dock-fission goo + WebGL viz are separate scales/engines. ONE optional DRY: the `feDisplacementMap` lens MAY be shared with the dock fission neck (flagged, not mandated). |
| **NO-OP confirm** | `W-CAROUSEL-CADENCE` (T13 audit) | the carousel snap is calm-overdamped (`--goo-weight 0.50`, no content-bounce) — lens-C HONORS T13; the punch lives on the deck/pager drivers, never the carousel observer. |

**The gate — `proof:carousel-deck-glass`** (rides `proof:goo-barbell`): C1 the bridge waist is a REAL
rendered local-minimum (not arithmetic — the barbell π); C2 the distortion reads (the content column
shifts ≥N px through the waist, born-RED on the occlusion-only worm); C3 the deck slide bg chroma
C ≥ 0.010 H ∈ [45,85] (born-RED on the live `oklab(0.79 0.005 0.012)` gray); C4 ONE `<GooBridgeLayer>`,
3 mounts, no per-consumer goo CSS (born-RED on the 3 hand-written blocks); C5 the dwell is
neck-gated, gone ≤ 80ms post-settle (born-RED on the live flat 0.55/0.62 slab); C6 PRM snap +
`@supports` floor + paired Chromium/Safari-Metal. Every born-RED is a REAL rendered readback, never
`neckGirth·const`.

---

## 7. The gestalt bar

A real Next-click reads: the entering card BUDS out of the leaver (anticipation dip), the two warm-cream
bodies STRETCH into a thin CONCAVE waist that the content visibly BENDS through (the liquid lens), the
neck DWELLS open ~250–400ms then PINCHES + the card OVERSHOOTS home with a cartoon-cast PUNCH — fling
faster and the neck wells FATTER. The deck transmits a warm saffron field (no more gray). The pager dots
goo-WORM as a true two-bead barbell, flooding a tiny accent on land. Warm-cream both modes, both engines,
the carousel calm-overdamped (T13 honored) while the deck + pager carry the technicolor punch. ONE
`useGooMorph`, ONE `<GooBridgeLayer>`, three thin mounts — net-negative LOC, no fork, no legacy.
