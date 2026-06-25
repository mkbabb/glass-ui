# Carousel · Deck · Pager-dots — GREENFIELD lens-b (CROSS-ENGINE / PERF-FIRST)

> The SHELLS + transitions + the dot indicator. Unions with the shipped
> `useGooMorph` engine and the goo-morph BARBELL-NECK greenfield
> (`../../goo-morph/WAVE-AMENDMENT.md`) — this lens does NOT re-fork the goo engine;
> it covers the SUBSTRATE de-dup question, the carousel/deck transition feel, the
> pager-dot worm, and (the headline of THIS lens) the **cadence-independence +
> perf** the barbell greenfield assumes but never guarantees.

---

## 0. WHAT I LIVE-VERIFIED (real painted pixels, NOT a hardcoded field)

Real `.click()` Next on `/navigation/carousel` + a deck page change on `/motion/deck`,
both with a tight rAF frame-series reading the LIVE computed transform off the painted
worm — Chromium, light + dark. Reproduced, not asserted.

| probe | reading | verdict |
|---|---|---|
| **carousel steady fps (idle)** | **7 fps** — ONE 1728×1872 aurora canvas + 14 backdrop-filtered layers + 12 goo-plate slides | **the real defect** — the page chassis starves rAF |
| carousel Next worm peak | **scaleX 1.155**, scaleY 0.931, over **8 rAF frames / 1.4 s** | a near-translate; NO neck (the plate is already a full slide wide) |
| carousel `restSize()` | **352.6 px** (= `slideStep·0.82`) | the worm rests AS WIDE AS A SLIDE → necking one gap barely changes `len/W` → the "warm tray", not a barbell |
| carousel dark fill (rest) | `oklch(0.68 0.05 59°)` + `saturate(1.3) brightness(1.3)` companion | **fix2 landed** — the gray-halo blocker is GONE at rest; warm-cream both modes |
| `--carousel-goo-flow` | **EMPTY** — falls through to the `--pager-worm-flow` default | the carousel never got its OWN flow token; it runs the dot's 1.8 s curve clamped to a 0.95 s clock |
| deck steady fps | **136 fps** | the deck route is healthy; the goo is fine there |
| deck/pager worm peak | **scaleX 5.318**, scaleY 0.72, real neck, `--goo-t` glides | the SINGLE-worm goo-morph **works beautifully at DOT scale** (rest ≈ 13 px, so a multi-dot travel necks 5×) |

**The two load-bearing truths the prior judges MISSED** (they sampled forced-peak
pins and `data-traveling` toggles, never the cadence):

1. **The carousel goo doesn't read as a morph because the PAGE runs at 7 fps**, not
   because the engine is wrong. The barbell greenfield fixes the SHAPE; it does
   nothing for the CADENCE. A barbell sampled at 7 fps is still a chuggy slideshow.
   `useGooMorph`'s rAF *projects* the two-edge geometry every frame — at 7 fps it
   projects ~7 keyframes across a 0.95 s morph. The neck never reads.
2. **The single worm's `len/W` ratio is scale-relative.** At dot scale (W≈13 px) one
   3-dot travel is `len/W ≈ 5` — a dramatic neck. At slide scale (W≈353 px) one
   1-slide travel is `len/W ≈ 1.15` — no neck. The carousel's worm is geometrically
   incapable of a waist BECAUSE its rest footprint is a whole slide. (This is the
   barbell greenfield's diagnosis, independently re-confirmed here from the cadence
   axis — the fix is two SMALL bodies, `D = restSize/φ`, not one slide-wide plate.)

---

## 1. THE DE-DUP — are carousel + deck ONE substrate? (user ask C2)

**Verdict: the prior answer is RIGHT in topology, but UNDER-factored in the shell.**
Carousel and deck are **distinct SURFACES** that should share **TWO** substrates, not one:

- **Surface layer (KEEP distinct — they are genuinely different):**
  - **Carousel** = `embla` drag-peek item-scroller. Continuous scrollProgress, momentum
    fling, ±neighbour peek, N items visible. Its cadence is the FINGER.
  - **Deck** = `useDeck` keyboard-paged one-slide-at-a-time presentation. Discrete index,
    aria-live "Slide N of M", full-viewport. Its cadence is a KEYPRESS.
  - They are NOT the same thing and must NOT unify into one component (a carousel is not
    a deck — embla's drag physics vs the deck's discrete paging are different interaction
    grammars). **The §T13 constraint binds:** the carousel CONTENT-snap stays
    calm-overdamped (no bounce — an over-springy content carousel reads cheap; iOS
    reserves the bounce for open/morph). The deck slide-settle may carry a touch more
    give. Distinct cadence tokens, not a forced merge.

- **Transition substrate (the de-dup — `useGooMorph`, ALREADY shipped):** the
  blob↔meatball morph that rides ON both surfaces. ONE engine, three consumers (pager
  worm · carousel barbell · deck barbell), per-consumer tokens. This is correct and
  this lens does not touch the engine — it inherits the barbell re-invent verbatim.

- **THE UNDER-FACTORED THIRD THING (this lens's de-dup contribution): the GOO SHELL.**
  Today the goo *shell* is hand-rolled THREE times: `CarouselContent.vue` (N-plate bed
  + worm + `markTraveling` + `placePlates` + the `data-traveling` gate + the
  `GlassGooFilter` mount + the `@supports`/PRM CSS), `deck.vue` (single plate + worm +
  its own `data-traveling` stage gate + its own dark arm + its own CSS), and
  `PagerDots.vue` (N pips + worm + inline `<svg>` filter + its own CSS). Three copies of
  *the same shell wiring* drift apart (the carousel's flow token went missing; the deck
  uses a different opacity gate selector; the pager inlines the SVG while the carousel
  imports `GlassGooFilter`). **The de-dup that is actually missing is the SHELL, not the
  engine.** → §2.4 `<GooBridge>`.

So: **two substrates** (surface-distinct + transition-shared) plus **one shell
component** that hosts the transition substrate. The prior "they share the goo-morph
substrate" answer was right but stopped one factoring short.

---

## 2. THE DESIGN

### 2.1 The barbell — INHERITED, not re-designed (union, no fork)

The silhouette is the goo-morph greenfield's **barbell-neck**: two warm-cream bodies
(`D = restSize/φ`) + a concave-`path()` neck welded by the static `#glass-goo` filter.
This lens binds it AS-IS:

- carousel `restSize()` → the BEAD diameter `slideStep/φ` (NOT `step·0.82`); the N-plate
  bed is DELETED; render `bodyA`/`neck`/`bodyB` (the barbell C1/C2/C3 gates).
- deck adopts the barbell at viewport scale; pager migrates its single worm to the
  two-bead barbell.
- `--goo-weight` per consumer: carousel 1.0, pager 0.7, deck 0.4 (the vestibular floor —
  a full-viewport deck slide must NOT bounce a reader's inner ear).

**This lens adds nothing to the barbell shape.** Its contribution is everything BELOW.

### 2.2 THE BOLDEST MOVE — drive the morph off the COMPOSITOR, not rAF (cadence-independence)

The live 7-fps finding is fatal to the current architecture: `useGooMorph`'s rAF
*reads* the Houdini-interpolated `--goo-t` and *writes* a derived `transform` every
frame. When the main thread runs at 7 fps the rAF gets 7 samples and the neck is a
slideshow. **The morph's smoothness is hostage to the page's frame budget.** That is
not perf-first; that is perf-fragile.

**The move: make the two-edge barbell geometry a pure CSS function of the Houdini
`--goo-t`, so the COMPOSITOR interpolates the silhouette — the rAF becomes optional
polish, not the mechanism.**

`--goo-t` is already a registered `@property <number>` (`property-regs.css §18`,
source-verified) transitioned on the `--{prefix}-flow` `linear()` curve. The CSS engine
interpolates it on the compositor thread *regardless of main-thread fps*. Today JS reads
it back and does the trig. Instead, register the derived quantities as `@property` too
and let CSS `calc()` compute the transforms:

```css
/* property-regs.css — NEW typed scalars the flow drives (compositor-interpolated) */
@property --goo-t        { syntax: "<number>"; inherits: true; initial-value: 0; }  /* exists */
@property --goo-sep      { syntax: "<length>"; inherits: true; initial-value: 0px; } /* body separation = |B−A|·tri(t) */
@property --goo-neck     { syntax: "<number>"; inherits: true; initial-value: 1; }   /* neck girth 1→waist→1 */
```

The bodies' centres and the neck girth are *triangle-wave* functions of `--goo-t`
(peak at t=0.5). A triangle wave is not expressible in raw `calc()`, BUT it does not
need to be: the FLOW curve already dwells at the midpoint, so we drive a SECOND flow
scalar `--goo-neck` on a `linear()` that goes `1 → waistFloor → 1` (a V-shaped curve,
authored once, the mirror of the position flow). The body separation is
`--goo-sep: calc(var(--span) * tri)`, where `tri` is itself a `--goo-tri` `@property`
transitioned on a `0→1→0` triangle `linear()`. **Three flows, all compositor-interpolated,
zero per-frame JS.** The bodies translate by `calc()`, the neck scales by `calc()`, the
waist `clip-path` reads `--goo-neck` — all on the GPU.

- **What rAF is reduced to:** a ONE-shot `requestAnimationFrame` on travel-start that
  reads the measured slot centres `A`/`B` and writes `--span`/`--goo-dir` ONCE (CSS
  custom props the `calc()`s consume), then arms the three flow transitions in one
  synchronous write and **exits**. No per-frame loop. The compositor owns every frame.
- **Why this is the perf-first answer:** at 7 fps OR 144 fps the silhouette interpolates
  identically smooth, because the interpolation is on the compositor, not the starved
  main thread. The neck reads as a neck even while the aurora canvas hogs the CPU.
- **Safari:** WebKit supports `@property` (16.4+) and compositor-thread custom-property
  transitions. The `calc()` transforms are plain compositor transforms. NO new Safari
  surface (the SVG goo graph is byte-unchanged from the barbell greenfield). The
  `@supports (animation-timeline)` / `@property` floor: on an engine without `@property`,
  the transition SNAPS `--goo-t` (no glide) and the JS rAF path is the fallback (kept as
  the degraded arm, not the primary). Realistically every target engine has `@property`.

This is the move because it makes the user's THREE asks (glassy, distortion, inertia)
**robust to the demo's own perf debt** — which is the actual reason the morph reads poorly
today. Engine work the barbell greenfield does not contemplate; it slots under the same
`useGooMorph` public API (`travel`/`snap`/`drive`) with the loop deleted.

### 2.3 GLASSY · DISTORTION · INERTIA (user ask C3) — what each maps to

- **GLASSY (warm transmissive, never gray, §3 field-aware).** INHERIT fix2's dark arm
  (`oklch(from --card 0.68 0.05 h)` + `saturate(1.3) brightness(1.3)`) — live-verified
  resolved. ADD the §3 field-read: the goo layer's fill is currentColor; the BACKING
  aurora must glow THROUGH the welling neck. Today the neck is opaque-then-layer-dimmed
  (a flat 0.55 membrane). The greenfield read: the bodies stay substantial (opaque
  warm-cream domed droplets), but the **neck region** carries a lower fill alpha so the
  colourful field reads through the thinnest part of the waist (the barbell greenfield's
  R5 transmission probe — "field through the neck + edge", the honest achievable read).
  ONE gradient stop change on the neck element, not a new compositing seam.
- **DISTORTION (the goo/lens bending content).** The `#glass-goo` metaball filter IS the
  distortion — the blur→threshold wells + pinches the silhouette. This is present and
  correct. The barbell makes it READ (two masses to neck between). NO `backdrop-filter:url`
  (the §L7 fence); the distortion is the goo silhouette's own shape, the field reading
  through the translucent neck, not a refraction of the content layer (text never passes
  the threshold).
- **INERTIA (Band-0 liquid-weight, `--ease-cartoon-punch`, morph-more-on-move).** THE
  CALIBRATED CARVE per §T13: **the morph carries the weight, the content-snap does NOT.**
  - the embla content slide stays calm-overdamped (no bounce — DON'T touch embla's snap).
  - the goo BRIDGE carries the cartoon register: `--goo-weight` scales the neck-dwell
    depth + the `--ease-cartoon-punch` pre-dip (anticipation: the bodyB buds out of bodyA
    with a ~4% pre-dip before launch) + the √φ overshoot land + the velocity-couple
    ("morph MORE on a fast drag" — `drive()` already reads embla scrollProgress; couple
    the neck girth to |dProgress/dt| so a fast fling necks deeper).
  - `--ease-cartoon-punch` + `--motion-weight` are **sibling Band-0 deps**
    (`BD.W-CARTOON-PUNCH` / `BD.W-MOTION-WEIGHT`) — declared as DEPENDS, not phantom-reused
    (source-verified ABSENT from `src/styles/` today; honest lineage).

### 2.4 `<GooBridge>` — the de-dup SHELL (the missing factoring)

The shell wiring is copy-pasted three times and drifting. Factor it into ONE
presentational component that hosts the transition substrate:

```
<GooBridge
  :centers="centerOf"        // (i) => px on axis — the consumer's measured slot centres
  :rest-size="restSize"      // () => px — bead-diameter source (slideStep/φ or dot-size)
  :index="activeIndex"       // the committed slot (deck/pager) — drives travel()
  :fraction="dragFraction"   // optional live drag scalar (carousel) — drives drive()
  :vertical="vertical"
  token-prefix="carousel-goo" // | "deck-goo" | "pager-worm"
  :goo-weight="1.0"          // 1.0 carousel / 0.4 deck / 0.7 pager
  :blur="..." :slope="..."   // GlassGooFilter props, per consumer
/>
```

`<GooBridge>` owns: the `GlassGooFilter` mount, the `bodyA`/`neck`/`bodyB` barbell DOM,
the `data-traveling` opacity gate, the `.dark` warm-ink arm, the `@supports`/PRM CSS, and
the `useGooMorph` binding. The three consumers shrink to: *measure slot centres, hand
`<GooBridge>` an index/fraction.* `CarouselContent.vue` loses `placePlates`/`plateEls`/
`setPlate`/`plateIndices`/`markTraveling`/`setWormGeometry`/the goo CSS (~150 net-negative
LOC); `deck.vue` loses its goo `<div>`+CSS; `PagerDots.vue` loses its inline `<svg>` + goo
layer (keeps ONLY the interaction buttons + windowing). **ONE shell, three thin consumers,
ONE engine.** This is the genuine DRY the prior waves left on the table.

- **a11y:** `<GooBridge>` is `aria-hidden` + `pointer-events:none` ALWAYS (the crisp
  content + the real buttons own semantics + interaction — byte-unchanged). The dwell
  follows the neck, gone ≤80 ms after settle (no dead-slab). The carousel keeps its
  aria-roledescription slides; the deck keeps its `aria-live` "Slide N of M"; the pager
  keeps its tablist/group + 24 px hit-targets + focus-survival. The shell is PURELY
  presentational — it cannot regress a11y because it has none.

### 2.5 THE PAGER-DOTS WORM (user ask C4) — already the strongest leg

Live: the dot worm necks scaleX 5.3 / scaleY 0.72 — a decisive Google-deck worm
**today**, at dot scale. The barbell migration makes it a true two-bead (head pip + lead
pip necking) per the greenfield, a fidelity GAIN to re-verify. It rides `<GooBridge>` with
`token-prefix="pager-worm"`, `goo-weight 0.7`. **Safari-safe: static SVG goo** (the
inline `#pager-goo` graph moves into `GlassGooFilter` via `<GooBridge>` — one filter
definition, sRGB, no `backdrop-filter:url`, `@supports`/PRM floor). The worm is the proof
the substrate is right; the carousel just needs the SAME small-bead geometry (the barbell)
+ the SAME compositor cadence to read as liquid.

---

## 3. CROSS-ENGINE + PERF (the lens)

- **The §L7 floor (INHERIT):** static `#glass-goo` `filter:url()` over a frozen layer
  whose children move on transform/`calc()`; `color-interpolation-filters="sRGB"`
  (mandatory — WebKit forces sRGB; declaring it makes Chrome match the waist);
  `stdDeviation`/`feColorMatrix` stay LITERALS (no `var()` in the graph — the WebKit
  var-driven-blur trap); NO `backdrop-filter:url`; `@supports not (filter:url(#x))`
  cross-fade floor + PRM `display:none`. Byte-unchanged from the barbell greenfield.
- **PERF (the headline):** §2.2 compositor-drive makes the morph fps-independent. PLUS
  three perf carves the prior shell lacked:
  - **the goo layer mounts only DURING travel** — at rest the `<GooBridge>` filter layer
    is `display:none` (not just `opacity:0`); a static `filter:url` over a `will-change`
    layer is a standing GPU cost even at opacity 0. Mount it on travel-start, unmount
    ≤80 ms after settle (the dwell-follows-neck gate). Kills the idle cost on a route
    that already runs at 7 fps.
  - **`content-visibility`/offscreen-pause inheritance:** the carousel/deck demos should
    inherit the suite's `useIntersectionPause` so an off-screen carousel's aurora +
    goo park (the 7-fps route has 3 auroras + 1 huge canvas painting while scrolled past).
    This is a DEMO-chassis fix (Band C), flagged not owned here, but it is THE reason the
    route is slow and the morph reads chuggy — naming it honestly.
  - **the filter REGION is bounded to the two-bead span**, not `-50%/200%` of a
    slide-wide layer — a smaller goo region is a smaller blur raster (the barbell's small
    beads shrink the filtered area ~10× vs the slide-wide plate).
- **PRM (§L5):** the barbell coalesces to ONE resting body, neck zeroed, no rAF, no
  overshoot, goo layer dropped — the content slide still translates (carousel) / swaps
  (deck) / the dot snaps (pager). Compositor-drive respects PRM by NOT arming the flow
  transitions (snap `--goo-t` to target).

---

## 4. RECONCILE — vs the 116-wave set + the goo-morph greenfield (no dup)

| disposition | wave / artefact | action |
|---|---|---|
| **INHERIT verbatim** | `BD.W-GOO-BARBELL-NECK` (goo-morph greenfield) | the barbell shape + the engine `paint()` re-invent + the concave throat + the filter retune + the dark arm + the 3-consumer migration. THIS lens does NOT re-author any of it. |
| **AMEND (engine, additive)** | `useGooMorph` | replace the per-frame rAF projection with the **compositor `calc()` drive** (§2.2): register `--goo-sep`/`--goo-neck`/`--goo-tri` `@property` scalars + three flow `linear()`s; rAF reduced to a one-shot centre-measure. Public API (`travel`/`snap`/`drive`) byte-unchanged. SUPERSEDES the rAF loop (no legacy). |
| **NEW (shell de-dup)** | `BD.W-GOO-BRIDGE-SHELL` | factor `<GooBridge>` — the de-dup of the goo SHELL across carousel/deck/pager. Net-negative LOC. The three consumers shrink to measure-centres-hand-index. |
| **SUPERSEDE** | `W-GOO-CAROUSEL-DECK` + the `goo-carousel-deck` tactical fix | the N-plate bed + the hand-rolled per-surface shell → superseded by the barbell (bed delete) + `<GooBridge>` (shell de-dup). The fix2 dark-arm + travel-gate are INHERITED into `<GooBridge>`. |
| **DEPEND** | `BD.W-MOTION-WEIGHT` / `BD.W-CARTOON-PUNCH` | `--goo-weight` = `--motion-weight`; the anticipation pre-dip uses `--ease-cartoon-punch`. Source-verified ABSENT from `src/styles/` today — honest sibling deps, not phantom reuse. |
| **DEPEND (constraint)** | `W-CAROUSEL-CADENCE` (§T13) | the carousel CONTENT-snap stays calm-overdamped; the cartoon weight lives ONLY in the goo bridge, never in embla's snap. The lens's INERTIA carve respects this. |
| **FLAG (demo-chassis, Band C)** | the carousel route 7-fps debt | the route's 3 auroras + 1728×1872 canvas + 14 backdrop-filters need `useIntersectionPause`/offscreen-park — the REAL reason the morph reads chuggy. Named, owned by the demo-chassis band, not this lens. |
| **UNTOUCHED** | embla `useCarousel`, `useDeck`, `pagerWindow`, `useDeckKeyboard` | the SURFACE engines are correct and distinct — the de-dup is the transition substrate + the shell, never the surface grammar. |

No new goo ENGINE; no second worm; the barbell is inherited; the only NEW code is the
compositor-drive amendment + the `<GooBridge>` shell factoring + the perf carves.

---

## 5. THE GATE (real readback, not arithmetic — the cardinal bar)

INHERIT the barbell `proof:goo-barbell` rendered-alpha gate (two bodies + concave waist,
`waistRatio ≤ 0.45`, `hasLocalMinimum=true`, paired Chromium+WebKit). ADD this lens's two
born-RED arms, both REAL rendered/measured, never asserted:

- **C-CADENCE (the headline):** a π that throttles the main thread to ≤10 fps (CDP
  `Emulation.setCPUThrottlingRate` or a busy-loop) and frame-series-reads the **painted**
  silhouette during a real carousel Next. The neck must STILL well + pinch smoothly
  (`hasLocalMinimum=true` across the throttled capture) because the compositor owns the
  interpolation. **Born-RED on HEAD:** the current rAF-driven worm at 7 fps paints ~7
  keyframes → a stepped, non-continuous profile (the live-captured slideshow). GREEN only
  after the compositor-drive lands. This gate is the live 7-fps finding made binding.
- **C-SHELL (de-dup):** the detector asserts `<GooBridge>` exists ONCE and the carousel,
  deck, AND pager consumers bind IT (no per-surface hand-rolled goo `<div>`+filter+
  `data-traveling` CSS); `placePlates`/`plateIndices`/the inline `#pager-goo` `<svg>` are
  GONE. RED-bite: a consumer re-rolling its own goo shell.

DELTA artefact: a paired Chromium+WebKit, both-mode, **throttled-AND-unthrottled**
frame-series of a real Next-click + deck page + pager dot-travel — before (the 7-fps
stepped near-translate) / after (the compositor-smooth barbell neck at any fps). The
gestalt bar: two warm-cream bodies neck into a concave waist, the aurora glowing through
the throat, **smooth at 7 fps as at 144 fps**, calm content-snap, weighty goo bridge, both
modes, both engines.
