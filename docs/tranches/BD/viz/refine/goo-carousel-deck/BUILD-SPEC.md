# BUILD-SPEC — BD.W-GOO-CAROUSEL-DECK

The goo-carousel-deck refine. Synthesized from `research-root-cause.md` (live diagnosis),
`research-target.md` (the design target + Gemini/metaball SOTA), and `research-mechanism.md`
(the in-repo token/recipe map). North star: `design.md` six-layer optical composite + the
iOS-27 Liquid Glass language + `BA.W-NO-GRAY` warm-chroma floor + `W-DARK-MATERIAL` +
`[[feedback-liquid-weight-universal]]`. NO legacy, idiomatic, gestalt, **compositor-only,
PRM-carved, Safari-first.**

---

## 0. THE VERDICT (what we build, what we DON'T)

The user's verbatim feedback decomposes into FOUR work-items. The synthesis resolves each:

| Ask | Verdict | Mechanism |
|---|---|---|
| **(1) goo MORPHs blob↔meatball, FAST, on SAFARI** | BUILD the morph + DPR-cap + verify Safari | `uMorphT` shading-lerp scalar over the SHARED `smin` field (NOT a geometry rebuild) + a sub-2×-DPR backing-store cap on the blob (the aurora `proof:perf-producer` cap applied to goo-blob) |
| **(2) carousel ≡ deck? de-dup to ONE substrate?** | NO engine merge — de-dup the TRANSITION ENGINE | carousel(embla) + deck(useDeck) are correctly distinct ROLE surfaces; generalize `useWormMorph` → **`useGooMorph`** (the ONE goo-morph engine: worm + carousel-plate + deck-plate consume it); the pager oracle + spring vocab stay the ONE shared source (already de-duped) |
| **(3) carousel transitions GLASSY + DISTORTION + INERTIA** | BUILD the liquid-glass slide-transition register | the `useGooMorph` slide bridge (static SVG goo filter + compositor transforms) + the `glass-refract` lensing distortion + the `--spring-*` inertia + the `useLiquidFlex` squish, driven off embla `scrollProgress()` |
| **(GRAY HOLE) `.glass-pager-ring` reads raw `--glass-bg-floating`** | FIX the substitution-trap | re-point onto the element-level `color-mix(in oklab, …)` tint seam (the dock `--glass-bg-dock` precedent) |

**The cardinal synthesis.** research-mechanism.md took the conservative "verify-only + one token
re-point" reading; research-root-cause + research-target took the broader "build the goo-morph
transition engine" reading. The user's verbatim feedback is unambiguous that the transition is the
headline ("transitions should be more GLASSY, distortion, inertia"; "should MORPH BLOB and MEATBALL
from one to another"). **We build the broader fix.** The §2b chassis re-point is a NECESSARY rider
(the gray hole is real), but it is NOT the whole wave — the headline is the goo-morph slide
transition + the blob `uMorphT` + the de-dup engine.

**Fences (binding):**
- NO engine merge (carousel embla + deck useDeck stay distinct — the role fork is load-bearing).
- NO WebGL pass drives a UI transition (the goo-morph is the static-SVG-filter + transform class — the `useWormMorph`/`DockGooFilter` proven pattern; `<GooBlob>` the art viz is untouched as a viz).
- NO `var()`-driven `feGaussianBlur stdDeviation` / per-frame re-blur (the WebKit-broken/slow class).
- NO `backdrop-filter: url()` as the SOLE goo path (WebKit-unsupported — the regular `filter:` on an opaque silhouette layer is the floor; the displacement lens is the `@supports`-gated enhancement).
- NO new spring/clock/color token (warm-cream is the identity; `--spring-*` is the shared vocab).
- NO Lenis/GSAP/Locomotive (native-first; inertia = the `--spring-*` curve + the squish).
- Clean break — `useWormMorph` → `useGooMorph` is a rename+generalize, every call site re-points, no alias.

---

## 1. THE DE-DUP — `useWormMorph` → `useGooMorph` (the ONE goo-morph engine)

The engine is ALREADY the right shape. `src/components/custom/pager-dots/useWormMorph.ts` is a
parameterized two-edge stretch→merge→pinch→settle driver: it takes a silhouette element + a
`centerOf(i)` oracle + a `restSize()`, registers `--worm-t` as a Houdini `@property <number>`,
`transition`s it on a `linear()` flow curve, and a short rAF projects the interpolated scalar onto a
`transform: translate · scaleX · scaleY` two-edge geometry + a `useLiquidFlex` reciprocal squish.
PRM snaps. **This is exactly the carousel/deck slide bridge mechanism — at a card-plate scale instead
of a dot-pip scale.** The de-dup is a GENERALIZE-AND-RE-POINT, not a re-fork.

### 1a. The generalization (MOVE + rename, no behavior change for the worm)

**New file:** `src/composables/motion/useGooMorph.ts` (`@mkbabb/glass-ui/motion-core` — keyframes-FREE,
root-barrel-safe; it imports only `useLiquidFlex` + Vue, the worm's exact deps).

The body is `useWormMorph`'s body verbatim, with the params generalized to drop the dot-pip
assumptions:

```ts
export interface UseGooMorphParams {
    /** The morph silhouette element (the opaque goo capsule/plate). */
    morphRef: Ref<HTMLElement | null>;
    /** The geometry origin + the `--goo-t` transition host (the rail/track root). */
    hostRef: Ref<HTMLElement | null>;
    /** Travel axis. false → horizontal (translateX), true → vertical (translateY). */
    vertical: Ref<boolean>;
    /** Live center reader: on-axis center (px, relative to host content box) of slot `i`. */
    centerOf: (i: number) => number | null;
    /** The resting silhouette extent (px) on the travel axis — the worm/plate rest length W. */
    restSize: () => number;
    /**
     * The token prefix for the flow/duration/max-stretch reads. Default "pager-worm"
     * (the dot-pip register). The carousel plate passes "carousel-goo"; the deck passes
     * "deck-goo" — each reads its OWN `--{prefix}-flow`/`-duration`/`-max-stretch` so a
     * card-plate morph dwells/swells at its own scale, the dot at its own. ONE engine,
     * per-consumer tokens (the no-new-spring fence — they all resolve `--spring-*`-derived
     * `linear()` curves, no new spring family).
     */
    tokenPrefix?: string;
    /**
     * The girth floor — the cross-axis pinch cap. Default 0.72 (the fat-worm dot value).
     * A card-plate passes a HIGHER floor (≈0.85) so the wide plate necks but stays a
     * substantial mass (a thin plate-thread reads wrong at card scale).
     */
    girthFloor?: number;
}
```

The internals (`paint`, `placeStatic`, `snap`, `travel`) are byte-identical to `useWormMorph` EXCEPT:
- `--worm-t` → `--goo-t`; `--worm-len-ratio` → `--goo-len-ratio`; `--pager-worm-*` reads → `--${tokenPrefix}-*`.
- `GIRTH_FLOOR` const → the `girthFloor` param (default 0.72).
- The squish `maxStretch` reads `--${tokenPrefix}-max-stretch` (default 1.4).

**`useWormMorph.ts` is DELETED.** `PagerDots.vue` re-points its import to `useGooMorph` with
`tokenPrefix: "pager-worm"`, `girthFloor: 0.72`, `restSize` = the pip diameter — **byte-identical
behavior** (the pager worm IS the first consumer; this is the no-dual-path consolidation). The
`--worm-t` reads in `PagerDots.vue`'s `<style>` re-point to `--goo-t`; the `@property --worm-t`
registration → `@property --goo-t` (one shared registration in `tokens/property-regs.css`, NOT a
per-consumer dup — see §3c).

The `proof:pager-goo` worm gate FOLLOWS the rename (its asserts read `useGooMorph` + `--goo-t`).

### 1b. The de-dup recorded fence (the role fork STAYS)

`/carousel` (embla item-scroller, drag-momentum, multi-item peek) and `/deck` (full-viewport
keyboard-paged aria-live presentation) stay DISTINCT components. The de-dup is at the substrate
layer ONLY: ONE `useGooMorph` engine, ONE `PagerDots` oracle, ONE `--spring-*` vocab. A "merge into
one component" REDS the M6 role-fence assert (§5). The seam that stays forked is recorded in the wave
spec §De-dup.

---

## 2. THE CAROUSEL/DECK SLIDE GOO-MORPH (the headline build)

### 2a. The library goo `<filter>` — REUSE `DockGooFilter` (no new filter)

`src/components/custom/dock/DockGooFilter.vue` is ALREADY the Safari-safe library goo mount:
- regular `filter: url(#…)` (NOT `backdrop-filter: url()` — WebKit bug 245510 avoided);
- `color-interpolation-filters="sRGB"` (WebKit linearRGB-lighten bug 136418 avoided);
- explicit region `x=-50% y=-50% width=200% height=200%` (the neck never clips);
- a visually-hidden NON-ZERO (1×1) host (the WebKit zero-sized-filter no-op avoided);
- STATIC `stdDeviation`/`feColorMatrix` literals (the per-frame re-blur "slow" class avoided);
- tokenized `blur=7 / thresholdSlope=20 / thresholdOffset=-9`.

**The slide bridge reuses it.** No new `<filter>`. The carousel/deck transition references
`filter: var(--slide-goo-filter, url(#dock-goo))` — the SAME id `DockGooFilter` mounts. (If the
filter id name `dock-goo` reads dock-specific, rename `DockGooFilter` → `GlassGooFilter` with id
`glass-goo` and re-point the fission/morph consumers — a clean-break rename, no alias; the dock
bridges already consume it by `var(--…-goo-filter)` token, so the re-point is one token edit each.
**Decision: rename to `GlassGooFilter`/`#glass-goo`** — it is the library's ONE goo filter, not a dock
component. The worm's inline `#pager-goo` filter (`PagerDots.vue:245`) STAYS local to the dots — it is
the dot-scale blur (`stdDeviation=8`), distinct from the plate-scale (`stdDeviation=7`); the two are
NOT the same filter and do not de-dup. Recorded.)

### 2b. The carousel slide-plate goo-morph (`/navigation/carousel`)

The carousel keeps embla for the ITEM-SCROLL; the goo-morph rides as the TRANSITION layer ON it (the
way `PagerDots` already rides the embla `select` event). The build:

**File:** `src/components/ui/carousel/CarouselContent.vue` (the embla track host) — add the goo
silhouette layer + the `useGooMorph` drive.

1. **The goo silhouette layer** (opaque, aria-hidden, BEHIND the crisp content — the pager-worm
   discipline). A `.carousel-goo-layer` (`position:absolute; inset:0; filter: var(--slide-goo-filter,
   url(#glass-goo)); opacity: var(--carousel-goo-opacity, 0.65); will-change: transform; contain:
   layout paint`) hosting N solid warm-glass plate silhouettes (one per slide, `background:
   color-mix(in oklab, var(--card), white 8%)` — the morph-bridge domed-droplet warm-cream fill, NEVER
   gray). The plates travel along the axis driven by `useGooMorph`; their blurred fringes overlap
   mid-travel → the warm-cream metaball NECK wells up bridging outgoing→incoming → past midpoint the
   threshold pinches the neck off → the destination plate re-forms. **This is the Gemini "morph blob
   and meatball from one to the next" read.**

2. **The crisp content** rides the EXISTING embla track UNFILTERED on top (text never passes the goo
   threshold — `feColorMatrix` would mangle it). The content track tracks the same `--goo-t` for its
   own glass-tier + lensing (§2d), but is NOT inside the goo container.

3. **The drive** — `useGooMorph({ morphRef: gooPlateRef, hostRef: trackRef, vertical: false,
   centerOf: (i) => emblaSlideCenter(i), restSize: () => slideWidth(), tokenPrefix: "carousel-goo",
   girthFloor: 0.85 })`. On embla `select` → `goo.travel(prevIndex, nextIndex)`. On embla `scroll`
   (the live drag) → the morph reads embla's `scrollProgress()` to set `--goo-t` continuously (the
   drag-driven neck, the way `useWormMorph` reads `--worm-t`): the goo plate stretches with the live
   drag velocity, releases at the snap. **The inertia is the `--carousel-goo-flow` `linear()` spring
   curve + the `useLiquidFlex` squish, NOT embla's flat scroll** — the slide change carries weight.

### 2c. The deck slide-plate goo-morph (`/motion/deck`)

The deck slide (`demo/stories/motion/deck.vue` `.deck-demo-slide`, today a calm `translateX(2rem)` +
opacity on `--spring-deck`) gains the SAME goo-morph as the OUTGOING→INCOMING slide bridge — at the
deck's calmer register (full-viewport slides must not overshoot — the vestibular floor). The full-page
slide settle STAYS `--spring-deck` (= `--spring-smooth`, calm); the goo NECK between the two slides
rides `--deck-goo-flow` (a calmer flow than the carousel's drag-snappy). The deck is binary consumer
#3 of `useGooMorph` (worm #1, carousel #2, deck #3 — the ≥2-consumer bar met).

> The deck slide goo is the demo-private `.deck-demo-slide` recipe (the demo owns the deck CSS per the
> CLAUDE.md `/deck` note). The library SHIP is `useGooMorph` + `GlassGooFilter`; the deck demo CONSUMES
> them. The `useDeck`/`useDeckSpring`/`DeckPager` library surface is byte-untouched.

### 2d. GLASS + DISTORTION + INERTIA on the transition (the §L1 six-layer law)

- **Glass.** The slide-plate is a real glass tier (`resting` for the in-card carousel, `floating` for
  the full-deck) composing all six `design.md §L1` layers via `--glass-level` + the element-level
  oklab tint seam (the W55 adaptive lift/darken). **Warm-cream, NEVER gray** (`BA.W-NO-GRAY`): the
  plate + the goo neck are warm MATERIAL at OKLab hue 62-75 (the `--card` warm-cream `hsl(30 85% 96%)`
  light / `hsl(26 22% 17%)` dark register), saturation-lift over the page.
- **Distortion (lensing).** The travelling content plate carries the `.glass-lens` / `--glass-refract`
  edge-lensing axis (the `@supports (backdrop-filter: url(#…))`-gated squircle displacement; the
  un-gated blur+tint is the Safari floor). The light BENDS at the moving rim — the iOS "surfaces
  distort as they move." The lens depth couples to the `--goo-t` velocity (more bend mid-fling). **On
  WebKit (no `backdrop-filter: url()`) the goo-morph + the un-gated blur+tint is the FLOOR** — the
  morph still reads, just without the SVG-displacement lens. (The goo IS the primary distortion; the
  refract lens is the enhancement.)
- **Inertia + squish (the liquid-weight law).** The travel rides a `--spring-*` curve via the
  `--{prefix}-flow` `linear()` (NOT embla's linear scroll): drag → snappy (`--spring-snappy`-derived
  flow), keyboard/auto → smooth/deck. The plate STRETCHES along the travel axis (the volume-preserving
  `useLiquidFlex` reciprocal squish, capped LOW ≈ 1.08–1.4, `girthFloor` ≈ 0.85) and RELEASES at
  arrival (`RELEASE_AT_ARRIVAL ≈ 0.82`, the worm's exact discipline). The neck DWELLS open across the
  gap (the slow `--carousel-goo-flow` curve — the worm's `--pager-worm-flow` shape generalized), so the
  morph reads as weighty liquid, not a fast flicker.

### 2e. The motion tokens (NO new spring family — `--spring-*`-derived `linear()` flows)

Add to `src/styles/tokens/scheme-motion.css` (beside `--pager-worm-flow`), the per-consumer flow
curves the `useGooMorph` `tokenPrefix` reads. Each is a `--spring-*`-DERIVED `linear()` (the dwell
shape, generated the SAME way `--pager-worm-flow` was — a rise→mid-dwell→gentle-overshoot curve), NOT a
new spring preset:

```css
/* The carousel slide goo-morph flow — the drag-register dwell (snappy-derived, the
   plate necks across the gap then snaps). Generated by regen-spring-tokens.mjs the same
   way --pager-worm-flow was. */
--carousel-goo-flow: linear( /* … the snappy-derived rise→dwell→+7%-land curve … */ );
--carousel-goo-duration: 0.9s;      /* the card-plate clock — faster than the dot's 1.8s
                                       (a card-plate morph is bigger, reads heavy sooner) */
--carousel-goo-max-stretch: 1.18;   /* the plate swell — LOWER than the dot's 1.45 (a wide
                                       plate stretching 1.45 reads as taffy; a card necks gently) */

/* The deck slide goo-morph flow — the calmer presentation register (smooth-derived, no
   overshoot — a full-viewport slide must not bounce). */
--deck-goo-flow: linear( /* … the smooth-derived rise→dwell→no-overshoot curve … */ );
--deck-goo-duration: var(--spring-smooth-duration);
--deck-goo-max-stretch: 1.12;
```

The carousel `.carousel-goo-layer` + the deck `.deck-demo-slide` read these (the
`useGooMorph(tokenPrefix)` resolves `--{prefix}-flow`/`-duration`/`-max-stretch`). **The fence: these
are `--spring-*`-derived `linear()` flow curves (the worm-flow precedent), generated from the
SPRING_PRESETS table — NOT a new spring preset, NOT a hand-authored bezier.** `proof:spring-tokens-synced`
stays GREEN (the generator emits them from the same table); `proof:animation-coherence` EASING-TABLE-BOUND
stays GREEN (no second easing alias minted — they are flow CURVES off the existing presets).

---

## 3. THE BLOB `uMorphT` SHADING-MORPH + DPR CAP (ask #1, the "blob↔meatball morph")

### 3a. The morph is a SHADING lerp, NOT a geometry rebuild (the key fact)

`metaball.frag.ts:319` early-returns the STAGE-1 (variant=blob) flat-fill BEFORE the STAGE-2 lit/
shadow dressing; `uploadBlobUniforms.ts:315` flips `uLit`/`uShadow` 0|1 on `variant`. **The body
geometry is IDENTICAL** (the `smin` SDF field, the satellites, the AA — all computed before the stage
gate). Only the SURFACE shading (lit/shadow/iridescence/SSS) differs. So the morph the user wants is a
**`uMorphT` scalar interpolating the SHADING** between the flat blob and the lit meatball — NOT a
geometry rebuild, NOT a path interpolation.

**The fix (shader-fence-respecting — the GLSL bodies edit is the morph, the smin field is byte-
untouched):**

1. **Replace the `uStage > 0.5` HARD early-return with a `uMorphT`-gated LERP.** Add a `uMorphT`
   uniform (`<number> 0..1`, `0` = flat blob, `1` = lit meatball). The STAGE-1 flat color `rgb1` is
   computed ALWAYS; the STAGE-2 dressing (lit glint, Fresnel rim, iridescence, SSS, soft shadow) is
   computed ALWAYS; the final fragment is `mix(flatColor, dressedColor, uMorphT)` + a shadow-strength
   ramp `shadowDarken *= uMorphT`. At `uMorphT=0` it resolves byte-identical to today's blob
   early-return; at `uMorphT=1` byte-identical to today's meatball. **The morph is the CONTINUOUS
   in-between** the user asked for ("from one to another").
   - Cost note: at `uMorphT=0` the dressing math runs but is mixed out — to keep the blob CHEAP, gate
     the EXPENSIVE legs (the soft-shadow secondary march) behind `if (uMorphT > 0.0)` so a pure blob
     pays zero shadow-march cost; the cheap dressing (Fresnel/lit/irid) runs always and lerps. The
     `smin` field is untouched (the geometry is shared — that is the whole point).
2. **`uploadBlobUniforms.ts` + `uniformBridgeWGPU.ts`** write `uMorphT` from a new `config.morphT`
   (`number`, default resolved from `variant`: `blob` → 0, `meatball` → 1) so the existing `variant`
   prop is byte-back-compat (a consumer not setting `morphT` gets the variant's endpoint). A consumer
   ANIMATING `morphT` 0↔1 (via `useSpring` or a `transition` on a registered scalar) gets the live
   morph. The WGSL primary (`metaball.wgsl.ts`) gets the SAME `uMorphT` branch (the GLSL/WGSL twin —
   the soft-blend mirrors, the smin field byte-untouched).

### 3b. The DPR cap (ask #1, "far too SLOW")

`research-root-cause.md §1b` confirms the blob backing store is 1536×1536 (a 2×-DPR 768-CSS-px
canvas), and the aurora `proof:perf-producer` sub-2×-DPR cap is NOT applied to goo-blob. The fix:
apply the SAME cap the aurora wash uses. In `useMetaballRenderer.ts` (the substrate arm), clamp the
canvas backing-store DPR to `Math.min(devicePixelRatio, 2)` (the aurora cap) — and for the meatball
(shadow-march) variant, optionally clamp to `1.5` (the shadow march is the per-frame cost). This is
the substrate `resize` clamp the aurora already ships (`useWebGLCanvas`/`useGpuSubstrate` consumer
owns its DPR policy); the blob just needs to USE it. **Fence: the `smin`/shader bodies are untouched —
this is a backing-store resolution clamp, not a shader edit.**

### 3c. Safari for the blob

The blob's Safari risk is WebGL2 PERF (not a broken filter). The DPR cap (§3b) is the primary Safari
fix (a 1024² backing store instead of 1536² is the difference between smooth and a wedge on Safari's
conservative WebGL2). The software-raster guard (`proof:aurora-swraster` precedent) ALREADY forces a
CSS/2D fallback under a software rasterizer — confirm the goo-blob inherits it via `useGpuSubstrate`
(it should, per the shared-leaf substrate). **The carousel/deck transition NEVER touches the blob
renderer** (M3, §5) — that is the structural Safari fix for the transition (no WebGL pass on the
transition path at all).

---

## 4. THE GRAY HOLE — `.glass-pager-ring` element-level tint (the rider fix)

`research-mechanism.md §2b` — the precise carousel/deck-specific gray-glass mechanism. ONE edit.

**File:** `src/styles/glass/surfaces.css` (`.glass-pager-ring` rule, the `background:` declaration ~L367).

**Before:**
```css
.glass-pager-ring {
    background: var(--glass-bg-floating);   /* ← RAW pre-substituted :root token */
    /* … backdrop-filter, box-shadow, transition … */
}
```

**After:**
```css
.glass-pager-ring {
    background: color-mix(
        in oklab,
        var(--glass-bg-floating),
        var(--glass-tint-source) var(--glass-tint-strength)
    );
    /* backdrop-filter, box-shadow, rim, transition — BYTE-UNCHANGED. */
}
```

**Why correct + safe:**
- At the `:root` default (`--glass-tint-strength: 0%`) → `color-mix(in oklab, X, src 0%) ≡ X` — the
  no-op floor; pager pixels over a flat page are byte-unchanged.
- Over a declared/sampled BRIGHT backdrop (`@container style(--glass-backdrop: light)`) the pill
  darkens-toward-ink → a real silhouette over a bright carousel image (the W55 ≤24% clamp keeps it
  translucent).
- Under `.dark` the `W-DARK-MATERIAL` tint arm lifts the pill toward luminous warm-dark — never a
  charcoal slab.
- `in oklab` is the glass-tint perceptual family (the `--surface-tint-*` in-srgb brand fence — AW.W26
  — is untouched). This is the dock `--glass-bg-dock` self-re-point precedent applied to the pager
  chassis (`menu.css`/`ladder.css` already compose this exact seam).

The `.dark .glass-pager-ring` box-shadow/rim/specular + the bezier `transition` are byte-unchanged.

---

## 5. ACCEPTANCE CRITERIA (the binding bar — both modes, light + dark, **Safari AND Chromium**)

### Gestalt (the human/π verdict — the `proof:ba-gestalt` navigation verdict on a FRESH capture)
- **G1 — the meatball morph reads.** Advancing a carousel/deck slide shows ONE warm-cream metaball
  NECK well up bridging outgoing→incoming, stretch across the gap, then pinch off + re-form. Not a hard
  cut, not a flat embla scroll, not two unrelated plates. The Gemini "morph blob and meatball" read.
- **G2 — glassy + distortion + inertia.** The slide-plate is real warm-cream glass (all six §L1
  layers, NEVER gray); the rim LENSES/distorts as it travels; the travel carries spring inertia + a
  volume-preserving squish that necks-then-releases. Reads as liquid glass flowing.
- **G3 — Safari SMOOTH + FAST.** On WebKit the morph is smooth + fast (≈60fps, no jank, no wedge); the
  goo silhouette READS (static filter paints); no software-raster WebGL stall. The blob morphs
  blob↔meatball without the 1536² stall. The user's #1 defect is dead.
- **G4 — warm identity holds.** Plate + neck are warm MATERIAL at OKLab hue 62-75, saturation-lift
  over the page, NEVER a gray/charcoal blob (`BA.W-NO-GRAY`).
- **G5 — PRM carved.** Under reduce, the morph snaps (no goo, no squish, no lensing); a terminal
  opacity cross-fade survives; legibility intact. The blob `morphT` jumps 0↔1 in one frame.

### Machine / structural (the gate)
- **M1 — STATIC filter, no var()-driven blur.** The `<filter>` `stdDeviation` + `feColorMatrix` are
  LITERALS; the ONLY per-frame write is `transform`/`scale`/`opacity`/the `--goo-t` custom. A
  `var()`-driven `feGaussianBlur stdDeviation` or a per-frame `stdDeviation` re-write REDS. Filter
  region is `-50%/-50%/200%/200%`; `color-interpolation-filters="sRGB"`.
- **M2 — compositor-only.** `proof:no-layout-animation` GREEN — zero layout property animates; the
  plates reserve their footprint once.
- **M3 — no WebGL transition path.** The carousel/deck slide change references NO `useMetaballRenderer`/
  `metaball.frag`/WebGL substrate. The goo is the SVG-filter + transform class only.
- **M4 — ONE goo-morph engine.** ONE `useGooMorph` source; the worm + carousel + deck consume it.
  `useWormMorph.ts` is DELETED (no dual stretch/pinch impl). The pager oracle + spring vocab stay the
  ONE shared source.
- **M5 — spring vocab unforked.** The transition reads `--spring-*`-derived `--{prefix}-goo-flow`
  `linear()` curves (generated from SPRING_PRESETS); no new spring preset, no carousel/deck-local bezier.
- **M6 — the role fork PRESERVED.** `/carousel` (embla) + `/deck` (useDeck) stay distinct components;
  a "merge into one component" REDS. The de-dup is at the substrate layer only.
- **M7 (gray rider) — `.glass-pager-ring` reads the element-level tint.** `background` is the
  `color-mix(in oklab, var(--glass-bg-floating), var(--glass-tint-source) var(--glass-tint-strength))`
  seam, NOT raw `var(--glass-bg-floating)`. Born-RED on HEAD.
- **M8 (blob morph) — `uMorphT` is a continuous lerp.** `metaball.frag`/`metaball.wgsl` mix
  flat↔dressed on `uMorphT` (no hard `uStage > 0.5` early-return cut); `variant` resolves the endpoint
  back-compat; the `smin` field is byte-untouched.
- **M9 (blob DPR) — the backing store is sub-2×-DPR capped.** `useMetaballRenderer` clamps the canvas
  DPR `Math.min(dpr, 2)` (the aurora cap); the 1536² stall is gone.

---

## 6. THE GATE IMPACT

| Gate | Change | Born-RED on |
|---|---|---|
| `proof:goo-carousel-deck` (NEW, `local`+`ci`) | the wave's structural gate — M1/M3/M4/M5/M6 source asserts + the self-test bites | the HEAD tree (no `useGooMorph`, raw worm, no slide goo) |
| `proof:no-gray` (EXTEND-in-place, G7) | ADD `pager-ring-reads-element-tint` source witness + self-test bite | `.glass-pager-ring { background: var(--glass-bg-floating) }` raw |
| `proof:pager-goo` (RE-POINT) | the worm gate asserts FOLLOW the `useWormMorph`→`useGooMorph` rename + `--worm-t`→`--goo-t` | n/a (rename-follow, stays GREEN) |
| `proof:blob-*` family (RE-POINT) | the variant asserts FOLLOW the `uStage` early-return → `uMorphT` lerp (the `variant`-endpoint back-compat keeps them GREEN; ADD a `uMorphT`-continuity witness) | the hard-flip (a continuity assert is born-RED) |
| `proof:no-layout-animation` | GREEN by construction (the slide goo is transform/scale/opacity/filter; plates reserve once) | n/a |
| `proof:spring-tokens-synced` / `proof:animation-coherence` | GREEN (the `--*-goo-flow` are SPRING_PRESETS-generated `linear()` curves, no new preset) | n/a |
| `proof:glass-cohesion` | GREEN (the `.glass-pager-ring` re-point ADDS tint, stays glass; no allowlist change) | n/a |
| `proof:ba-gestalt` (navigation verdict) | the close OR on a FRESH capture (G1–G5) | the current flat-embla/gray-pill ground |

**The binding π — `tests-visual/goo-carousel-deck.spec.ts` (LOCAL, real GPU + Safari arm):**
1. **The morph frame-series** — capture `/navigation/carousel` (+ `/motion/deck`) advancing a slide
   over 8–12 frames; assert the goo NECK silhouette wells (a mid-travel frame where one continuous
   warm mass bridges the two plate centers), then pinches (a late frame where the bridge is severed).
   The neck mass is measured off the composited silhouette (the `proof:goo-redress`/worm π precedent).
2. **The glass-six-layer + warm OKLab-hue readback** — `getComputedStyle` the slide plate + the goo
   neck fill; assert OKLab C ≥ 0.010 at warm hue H ∈ [45,85] (NEVER gray); the six `--glass-*` legs
   present.
3. **The spring-inertia squish frame-series** — assert `--stretch` ≠ 1 mid-travel (the velocity swell)
   and `--goo-len-ratio` peaks at the midpoint (the stretch-then-contract bulge, the worm π shape).
4. **The blob `uMorphT` morph** — `/substrates/blob` with `morphT` animated 0→1: assert the rendered
   surface lerps flat→lit (a mid-`morphT` frame is between the two endpoints, not a hard cut); the
   silhouette (smin field) is byte-stable across the morph (geometry shared).
5. **The Safari smooth/fast capture** (the headline) — the WebKit project: the morph paints (goo
   silhouette present), no wedge, the blob morphs without the 1536² stall (frame time within budget).
6. **The PRM single-paint** — under `prefers-reduced-motion: reduce`: the slide snaps (no goo layer —
   `display:none`, no `--stretch` write, no rAF), a terminal opacity cross-fade survives; the blob
   `morphT` jumps in one frame.
7. **The G7 pager-ring readback** — `<PagerDots ring>` over a bright `--glass-backdrop: light` plate:
   `getComputedStyle` the composited `.glass-pager-ring` `background-color`; OKLab C ≥ 0.010 at warm H ∈
   [45,85] AND darker vs the flat-page no-op default. BOTH modes.

The π is born-RED on HEAD (no goo silhouette on the carousel/deck slide — frame 1 is a flat embla
translate; the blob is a hard variant cut; the pager-ring is raw-token gray).

---

## 7. THE A11Y / PRM / SAFARI RULES (binding, both halves)

- **PRM (motion-canon P6).** The slide goo-morph SNAPS to the target under `prefers-reduced-motion:
  reduce` — the `--goo-t` scalar jumps 0→1 in one frame, `--stretch` stays 1, no rAF, the goo
  silhouette layer is `display:none` (only a terminal opacity cross-fade survives — the worm's exact
  PRM discipline, ALREADY in `useGooMorph`). The lensing distortion is off; legibility holds. The blob
  `morphT` jumps in one frame (the `useSpring respectReducedMotion` snap).
- **Safari-first.** The goo is the REGULAR `filter: url(#glass-goo)` graph (NOT `backdrop-filter:
  url()` — WebKit 245510); `color-interpolation-filters="sRGB"` (WebKit 136418); the filter region
  `-50%/200%` (the neck never clips); the host is a NON-ZERO 1×1 SVG (WebKit zero-sized no-op); the
  `stdDeviation`/`feColorMatrix` are STATIC literals (the per-frame re-blur "slow"/broken class — WebKit
  283156 — avoided). The `@supports not (filter: url(#glass-goo))` arm is the plain cross-fade floor
  (the worm's `PagerDots.vue:432` precedent). The blob DPR cap is the Safari WebGL2 perf fix.
- **A11y.** The goo silhouette layer is `aria-hidden="true"` (it is decorative — the readable content
  rides the un-filtered crisp layer with the slide's real semantics). The carousel keeps embla's
  `aria-roledescription="carousel"`/slide semantics; the deck keeps `useDeck`'s aria-live "Slide N of
  M" announcer — the goo-morph adds ZERO aria surface (it is paint behind the announced content).
- **Compositor-only.** Every per-frame write is `transform`/`scale`/`opacity`/`filter`/the `--goo-t`
  custom — NEVER a layout property (`proof:no-layout-animation` library-wide). The plates reserve their
  settled footprint ONCE (a single layout solve); the morph is transform on it.

---

## 8. THE PRECISE CHANGE LIST

| # | File | Change | Class |
|---|---|---|---|
| 1 | `src/composables/motion/useGooMorph.ts` (NEW) | generalize `useWormMorph` → `useGooMorph` (tokenPrefix + girthFloor params; `--worm-t`→`--goo-t`) | de-dup, MOVE+rename |
| 2 | `src/components/custom/pager-dots/useWormMorph.ts` (DELETE) | clean break — the worm is now consumer #1 of `useGooMorph` | no-dual-path |
| 3 | `src/components/custom/pager-dots/PagerDots.vue` | re-point import → `useGooMorph({tokenPrefix:"pager-worm", girthFloor:0.72})`; `--worm-t`→`--goo-t` in `<style>` | rename-follow, byte-identical behavior |
| 4 | `src/styles/tokens/property-regs.css` | `@property --worm-t` → `@property --goo-t` (ONE shared registration) | rename-follow |
| 5 | `src/components/custom/dock/DockGooFilter.vue` → `GlassGooFilter.vue` (`#dock-goo`→`#glass-goo`) | rename to the library goo filter; re-point fission/morph-bridge token consumers | clean-break rename |
| 6 | `src/components/ui/carousel/CarouselContent.vue` | add `.carousel-goo-layer` (opaque warm-cream plates, `filter: url(#glass-goo)`) + `useGooMorph` drive off embla `select`/`scrollProgress` | the headline build |
| 7 | `src/styles/tokens/scheme-motion.css` | ADD `--carousel-goo-{flow,duration,max-stretch}` + `--deck-goo-{…}` (SPRING_PRESETS-generated `linear()` flows) | no-new-spring, generated |
| 8 | `scripts/regen-spring-tokens.mjs` | emit the new `--*-goo-flow` curves from the same SPRING_PRESETS table | generator-extend |
| 9 | `demo/stories/motion/deck.vue` | wire the `.deck-demo-slide` goo bridge (`useGooMorph` consumer #3, `--deck-goo-*`) | demo consume |
| 10 | `demo/stories/navigation/carousel.vue` | (HELD) set `--glass-backdrop: light` on the carousel ancestor IFF live-π shows residual gray over image content | presets-in-consumers |
| 11 | `src/components/custom/goo-blob/shaders/metaball.frag.ts` + `metaball.wgsl.ts` | `uStage > 0.5` hard early-return → `uMorphT` flat↔dressed lerp (smin field byte-untouched; expensive shadow-march gated `uMorphT>0`) | the blob morph |
| 12 | `src/components/custom/goo-blob/composables/uploadBlobUniforms.ts` + `uniformBridgeWGPU.ts` | write `uMorphT` off `config.morphT` (variant→endpoint back-compat) | uniform plumb |
| 13 | `src/components/custom/goo-blob/composables/useMetaballRenderer.ts` | clamp backing-store DPR `Math.min(dpr, 2)` (the aurora cap) | the SLOW fix |
| 14 | `src/styles/glass/surfaces.css` (`.glass-pager-ring`) | `background: var(--glass-bg-floating)` → `color-mix(in oklab, …, var(--glass-tint-source) var(--glass-tint-strength))` | the gray-hole rider |
| 15 | `scripts/proof-goo-carousel-deck.mjs` (NEW) | the wave gate (M1/M3/M4/M5/M6/M8/M9 + self-test bites) | gate |
| 16 | `scripts/proof-no-gray.mjs` | ADD G7 `pager-ring-reads-element-tint` + self-test bite | gate-extend |
| 17 | `tests-visual/goo-carousel-deck.spec.ts` (NEW) | the binding π (the 7 arms above, both modes, Chromium + WebKit) | π |
| 18 | `tests-visual/no-gray.spec.ts` | ADD the G7 pager-ring composited-plate OKLab readback | π-extend |

**VERIFY-only (shipped + correct — do NOT re-touch):** the `--card`/`--glass-saturate-*` keystone
(W-GLASS-ABROGATE-GRAY, landed); the `--pager-dot-*` warm-ink fills; the `--spring-deck` full-page
calm settle; the `pagerWindow.ts` oracle; the embla engine; `<GooBlob>` as an art viz (the
`uMorphT` ADD is back-compat — variant still resolves the endpoints).
