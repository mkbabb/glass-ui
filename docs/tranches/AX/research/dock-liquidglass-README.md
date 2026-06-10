# `@mkbabb/glass-ui/dock` + the Liquid Morph facility — research-backed README

The dock is glass-ui's headline Liquid-Glass surface, and `useLiquidMorph` (AX.W42 — SPEC ONLY, un-landed:
`AX/PROGRESS.md:88` holds W42 at `planned`; no such composable exists in `src/` — see AY.W-LIQUID §3.0 for
the name-resolution fold) is the substrate the dock WOULD be the first consumer of. This README is the research-grounded reference for both — the iOS-26
fidelity bar, the spring vocabulary, the morph axes, the recipes, and the scar list. It is sourced from the
32-facet liquid-glass corpus (`docs/tranches/AX/research/liquidglass-research-corpus.json`) and the
synthesis (`liquidglass-synthesis.md`); facet citations are inline as `(facet N)`.

---

## 1. What this is — the iOS-26 fidelity bar

**Liquid Glass is a MATERIAL, not a blur.** Apple's defining distinction (WWDC25 §219, facet 0/4): a
traditional blur SCATTERS light into a soft diffuse frost; Liquid Glass LENSES it — bending and
concentrating rays in real time the way a curved glass body physically does — giving the surface optical
definition against the backdrop. The material is a multi-layer meta-material:

1. a **LENSING / refraction** layer that bends the backdrop at the rim (content is optically displaced, not
   just blurred);
2. a real-time **SPECULAR** catch-light that reacts to motion and "defines the silhouette" (a moving rim
   highlight);
3. a **SHADOW / under-shadow** layer that lifts the glass off content (the 0.5px dark bottom-edge reads as
   literal glass THICKNESS);
4. an adaptive **TINT** layer that shifts hue/brightness to keep foreground legible over any backdrop.

The bar, stated plainly:

- **Lensing, not blur** is the iOS-26 thesis. Blur is the FALLBACK; displacement-refraction is the TARGET.
- **Glass lives ONLY in the navigation/overlay band** — never on content (lists, tables, media), and
  **never glass-on-glass** (a glass surface nested in glass stacks blur, doubles the rim, collapses the read
  — Apple's hard rule, facet 0/20/30).
- **One spring, one clock, one scalar.** Every morphable axis reads `calc()` off ONE normalized
  `SpringProgress` scalar written once per frame. No per-axis `transition`, no per-engine personality fork.
- **Interruptible physics.** A re-toggle mid-flight re-seats the live spring from `(value, velocity)` — the
  motion never jump-cuts. This is the single load-bearing iOS-feel piece (facet 14/15/17).
- **Every axis is a token.** No magic numbers; a consumer retunes by overriding a CSS custom property on the
  cascade, never by editing library source.

glass-ui is already ~70% of this vocabulary. The corpus's genuine additions are three material atoms
(lensing, shape-fusion, squash) and one net-new substrate (`useLiquidMorph`); everything else is
convergence onto what the tree already ships.

---

## 2. Use cases

- Dock collapse ↔ expand (the headline morph)
- Multi-layer pane swap (`DockLayerGroup` + `DockLayer`)
- Vertical / horizontal orientation (the `orientation` prop)
- Slider-in-dock keep-open (the `keepDockOpen` hold contract)
- Scroll-reactive shrink/expand (the future `animation-timeline: scroll()` morph, facet 2)
- The generalized facility on dialog / drawer / card→detail / sheet / popover / tab-indicator /
  segmented-toggle — every element morphs as ONE idiom (`useLiquidMorph`).

---

## 3. The two morph concerns (the decision boundary — front and center)

The corpus splits the morph problem into two SEPARABLE concerns the dock charter learned to disentangle.
Reach for the right one per the use case:

| Concern | Correct primitive | Wrong primitive | Why |
|---|---|---|---|
| An element's OWN continuous reshape (dock collapse, pill↔card, press-squish, card→detail) | **One analytic spring → one `--morph-t` scalar → every axis via `calc()` (`useLiquidMorph`)** | View Transitions | VT crossfades RASTERIZED snapshots → taffy-stretch, text-blur, box-leads-content desync, uninterruptible (facet 1/6/12/14/16/17/26/28/30) |
| Element-to-element / cross-ROUTE morph (card→detail across a route, fourier viz↔workspace) | **View Transitions named element (`view-transition-name`, the `morphId` seam)** | A live spring | VT IS the web `glassEffectID`/matchedGeometry for genuinely-different DOM; cheap and browser-owned |
| Surface fusion (two adjacent glass pills merging into one body) | **gooey SVG filter / `MorphGroup spacing`, `@supports`-gated Chromium-only** | — | the Apple metaball-fuse; renders as plain blur off-Chromium, so a progressive garnish, never the structural silhouette (facet 1/2/4) |

**The load-bearing caveat:** VT is the WRONG primitive for a same-element layout morph (it crossfades
rasterized pixels; an animating ancestor desyncs; two co-mounted docks minting `glass-dock-1` DROP the
snapshot and red ~13 e2e) and the RIGHT one for a route morph. `useLiquidMorph` offers BOTH — spring+FLIP
for self-reshape, an opt-in `morphId` for the route case — and documents which to reach for. Conflating
them is the regression the whole AX dock band corrects.

---

## 4. The spring vocabulary

iOS ships literally THREE system springs (facet 14); glass-ui's governed register is five, each pinned to a
surface-class with a named consumer (AX.W05). Keyed `(perceptualDuration, bounce)` — the iOS-17+ canon —
where `duration` is PERCEPTUAL (time-to-the-meaningful-part, held constant as bounce changes) and `bounce`
is the overshoot dial (`bounce = 1 − ζ`):

| Register | `(duration, bounce)` ≈ | ζ / overshoot | Surface class |
|---|---|---|---|
| **smooth** | `(0.5, 0.0)` | ζ≈1, no overshoot | patient settles |
| **snappy** (control) | `(0.5, 0.15)` | ζ≈0.85, ~+6.8% | crisp position morphs (tab underline, progress) |
| **bouncy** (playful) | `(0.5, 0.3)` | ζ≈0.7, ~+20.5% | celebratory ONE-SHOTS only (dialog entrance, success) |
| **gentle** | critically-damped | ζ=1.0 | — (alias-only reach; census-justified) |
| **dock** | `(0.32, 0.7-resp)` | ζ≈0.7, ~+4.6% | the dock + EVERYTHING inside it (the morph + the in-dock slider thumb) |

The closed-form physics map (facet 14): `mass=1`; `stiffness=(2π/duration)²`; `damping=(1-bounce)·4π/duration`.

**The two-track CPU/GPU model** (facet 14/17): a live JS `SpringProgress` integrator for the
interruptible/gesture path (it carries velocity across a mid-flight re-target — the one thing CSS springs
CANNOT do); build-time `linear()` tokens (sampled from the SAME ODE) for fire-and-forget declarative
transitions (entrances, `@starting-style` pops). The rule: `linear()` for non-interruptible one-shots, the
live spring for anything a user can interrupt.

**`duration` is PERCEPTUAL, never settle-time** (facet 14): a bouncy spring rings past `duration`; gate on
the spring's `settleThreshold`, never on `duration`.

**The restraint rules** (facet 5/14/16/18/30):

- Structural morphs (dock, layout) ride the CONTROL register (snappy/dock); **bouncy is reserved for
  deliberate emphatic one-shots.** Bounce >0.4 reads "too exaggerated for a UI element." iOS controls sit at
  bounce ~0.15. The AW.W2 retune already walked the dock spring DOWN from +18.5% to ~+4.6% (over-bounce read
  as "alive in a bad way"). Apple's own iOS 26.2 tweaks were about DIALING DOWN.
- **Never animate keyboard-initiated or high-frequency actions.** Press-squish is POINTER-only; the same
  animation on the 100th invocation is cognitive burden and feels slow.
- Asymmetric/frequency-aware motion is SOTA: collapse (frequent dismiss) → snappier/non-overshoot; expand
  (the reveal) → softer overshoot — two spring configs keyed on direction.

**PRM degrade** (facet 14/17/19): under `prefers-reduced-motion` the spring SNAPS to the target state
(`respectReducedMotion`) — no spring, no stagger, no rAF — and the state change still resolves. A CSS-only
PRM reset cannot reach a JS-written custom property, so the JS fast-path is load-bearing.

---

## 5. `useLiquidMorph` API

The substrate is a TWO-PART seam mirroring SwiftUI's `GlassEffectContainer` + `glassEffectID` and Motion's
`LayoutGroup` + `layoutId` (facet 1/3/26):

```ts
// (1) Per-element driver — owns ONE SpringProgress, writes ONE @property-registered
//     scalar --morph-t to elRef once/frame; exposes progress, state, retarget().
const { progress, state, retarget } = useLiquidMorph(elRef, {
  state: 'collapsed' | 'expanded',         // the discrete model state
  axes: ['inlineSize', 'radius', 'specular'], // CSS calc()s off --morph-t; JS owns only the
                                              // scalar + the one FLIP-measured size axis
  spring: 'dock',                          // the governed W05 register (default), or
                                           // settle/control/playful
  morphId: undefined,                      // OPT-IN view-transition-name for the route/shared-element
                                           // case (the bifurcated seam) — NOT set for a self-reshape
})

// (2) Shared orchestrator — the GlassEffectContainer / LayoutGroup analog.
//     Nested elements INJECT this; they NEVER spin up their own engine.
provideMorphGroup({ spacing })             // spacing = the gel-merge threshold
const group = useMorphGroup()              // a nested element defers to the one clock
```

**The morph state machine** (facet 28): `data-morph-state=idle|morphing|settled` (promoted from the boolean
`data-morphing`) — three distinct CSS hooks for the clip-reveal aperture, the will-change promotion, and the
at-rest `overflow:visible`. The seam: `begin()` at gesture start (co-temporal with the first `--morph-t`
write — same element, same frame-origin), `settle()` on `spring.settled` AFTER the final paint, with a
rAF-deferred return to `idle` for the cleanup pulse (clear will-change, lift the clip).

**The three opt-in tiers** (cheapest first):

- **CSS-only** — an element joins a `.glass-material`/morph-aware class and reads `--morph-t` from an
  ancestor `MorphGroup`, zero JS (child stagger, color, radius).
- **Composable** — `useLiquidMorph(elRef)` for an element owning its own reshape (dock root, panel); one
  call, the substrate owns spring + FLIP + will-change + PRM + clip-aperture lifecycle.
- **Group** — wrap children in `MorphGroup` for coordinated/nested morphs (dock + DockLayerGroup; a toolbar
  of fusing controls).

**The reuse ledger** (~70% already built, facet 26): `keyframes.js SpringProgress` · `useSpring` ·
`useLayerTransition` (FLIP + velocity-continuity + clip-aperture lifecycle → promoted from dock-private) ·
`createStrictContext`/`createOptionalContext` · `useViewTransition` (route seam) · `useSpecularTracking`
(W09 light seam). NET-NEW: the unifying API + the `MorphGroup` orchestrator + the `axes`-declaration + the
3-state lifecycle enum.

---

## 6. The morph axes — what `--morph-t` drives

Every animated axis is a `calc()` read off the ONE scalar so the box and its contents land in the SAME paint
(facet 2/7/16/17):

- **Geometry** — `inline-size`/`block-size`, `padding`, `border-radius` (concentric: `inner = calc(outer −
  padding)`, facet 0/26), `scale`.
- **Material thickness** — the corpus's iOS behaviour "the material thickens when it flexes larger" (facet
  2/17): the shadow-tier (`--shadow-dock-wrap`), the lens (`--glass-refract-scale`), and the specular
  intensity (`--glass-specular-intensity-*`) all read `calc(… * var(--morph-t))` so the surface reads
  THICKER as it expands — deeper shadow, more pronounced lensing, brighter rim.
- **Color** — `background`/`border-color` via `color-mix` (route per-frame COLOR shifts through a DISCRETE
  class swap, never a per-frame interpolation of an INHERITED var — the inheritance bomb, facet 26/27/30).
- **Child stagger** — `--stagger-step × index` keyed off the morph's normalized PROGRESS (a fraction-of-morph
  onset), never a wall-clock timer; 30-60ms between items, never >100ms (slideshow), facet 16.

`--morph-t` MUST be `@property`-registered `{ syntax:"<number>"; inherits:false; initial-value:0 }` and
written LOCALLY on the morphing element, never `:root` (facet 27/30): registered so it interpolates
composited (unregistered animates discretely), `inherits:false` as the inheritance-bomb guard (a `:root`
write forces a whole-subtree style recalc every frame — a cited case hit 8ms/frame over 1300 elements).

---

## 7. The recipes

### Lensing (the genuine material atom — opt-in, Chromium-only)

The web port of Apple's lensing is an SVG `feImage` (displacement map) + `feDisplacementMap` filter applied
as `backdrop-filter` (facet 0/4/20/21). The map encodes per-pixel offset in R(=x)/G(=y) channels (128 =
neutral), computed from the convex SQUIRCLE surface profile `y = ⁴√(1 − (1−x)⁴)` (Apple's preferred corner
curve) refracted via Snell's law (n₁=1 air → n₂=1.5 glass) — strong bend at the rim, flat clear core (the
convex meniscus). glass-ui's `#glass-refract` already cites this exact profile.

The SOTA upgrades glass-ui currently LACKS (facet 4/21):

- a Snell-derived squircle NORMAL map (the profile is cited in the comment but only a crude radial gradient
  is baked);
- THREE-pass RGB chromatic aberration (R=scale, G=scale+10, B=scale+20; isolate each channel with
  `feColorMatrix`; recombine with `feBlend mode=screen`) — the prismatic edge fringe is the single biggest
  "thick-glass" tell.

**The discipline (non-negotiable):**

- `@supports (backdrop-filter: url('#…'))`-gated, Chromium-ONLY (WebKit bug 245510 open, Firefox not
  shipping). On a non-Chromium engine the lens degrades to the plain blur base — **explicitly, never a
  broken `url()` ref, never a JS-stomped inline filter** (the AX.W20-retired `createGlassFilter`
  anti-pattern: it hard-overwrote `el.style.backdropFilter/border/boxShadow` with hardcoded non-dark-adaptive
  white, collapsing the five rungs to one). Any new refraction is CSS-cascade-ADDITIVE over `.glass-material`.
- **Only `scale` animates cheaply** — a shape/size change forces a full displacement-map REBUILD. Wire
  `scale` to `--morph-t` (register `--glass-refract-scale` as a typed `@property` so the lens springs) and
  NEVER regenerate the map mid-morph.
- `contain: strict` on the filtered node, small viewport dimensions, never promoted to the card/primitive
  substrate broadly (resize-expensive, tanks INP).
- Zero out under `prefers-reduced-transparency` and `forced-colors`.

### Merge (the gel-fuse — opt-in, Chromium-only)

Apple's `GlassEffectContainer` groups N glass shapes in one shared sampling region (glass cannot sample
glass) and FUSES shapes within a `spacing` threshold into one liquid body (metaball/smooth-min union, facet
1/2/4). The web analog is the SVG `feGaussianBlur → feColorMatrix` alpha-contrast trick (`0 0 0 18 -7` on the
alpha row snaps the blur into a sharp merged silhouette) — but it renders as PLAIN BLUR in Safari/Firefox, so
it is a progressive garnish over a shape that already reads correctly, NEVER the structural silhouette.
`MorphGroup`'s `spacing` option is the merge threshold.

### Squish (the press feedback — volume-preserving)

Apple's `.glassEffect(.interactive())` press: scale toward ~0.96 on the `scale:` LONGHAND (never `transform:
scale()` — the longhand avoids minting a new stacking context mid-press) keyed off the dock spring, the
specular brightening in LOCKSTEP (facet 0/5/18). Instant on touch-down (under ~100ms it reads as instant),
spring on RELEASE.

Volume-preserving squash-and-stretch: `scale: var(--squash) calc(1 / var(--stretch))` — the RECIPROCAL
pairing is the whole trick (a 1.25× stretch pairs with a 1/1.25=0.8× squash). The SOTA upgrade (facet 18):
derive the ratio LIVE from the spring's instantaneous velocity — `stretch = 1 + clamp(|v|·k, 0, maxStretch)`,
`squash = 1/stretch` — so fast flicks deform hard and the deform decays exactly as the spring settles (no
separate timer). `useSpring` already exposes a `velocity` ref (currently unused for deform).

**Cap `maxStretch` LOW (~1.06-1.10)** — iOS Liquid Glass is RESTRAINED (`--spring-dock` is only +4.6%, press
scale only 0.96). A high `k`/`maxStretch` turns elegant into Saturday-morning-cartoon. PRM MUST strip the
deform (short-circuit to `{squash:1, stretch:1}`) — volume-deform is vestibular-trigger motion.

---

## 8. Best practices / pitfalls (the scar list)

Every entry is a real glass-ui scar or a corpus-confirmed footgun:

- **One driver per axis.** The cardinal hazard (facet 0/7/14/16/17/24/30). The AV.W9.0 dock-freeze:
  `interpolate-size`/`calc-size` second-drove width against the JS spring → the two cancelled, the dock
  froze (born-RED). `interpolate-size` is Chromium-129+-only, NOT Baseline, and a known-but-rejected
  technique (one-time measurement only, never a co-driver). Size = spring; opacity = CSS crossfade; color =
  discrete class swap.
- **VT is the wrong primitive for a layout morph** (facet 1/6/12/14/16/17/26/28/30). It crossfades
  rasterized snapshots (taffy-stretch on non-uniform resize), desyncs an animating ancestor, and is NOT
  reliably live-measurable (keyframes device-proved 181 rAF `getBoundingClientRect` samples captured NO
  morph). Use the live single-scalar spring for self-reshape; reserve VT for the route/shared-element morph.
- **Per-instance `view-transition-name` via `useId()`** (facet 1/14/16). Two co-mounted docks both minting
  `glass-dock-1` DROP the morph snapshot and red ~13 e2e (the fourier collision). Any morphId seam needs a
  `useId()`-scoped unique name — a binding-verification-class footgun.
- **`@property`-register or it jumps** (facet 0/27). An unregistered custom property animates DISCRETELY (no
  tween, main-thread). And a registered `@property` var nested inside `hsl()` alpha computes to 0 in
  Chromium (glass-ui hit this) — drive layer `opacity`, not per-stop alpha.
- **Never tween an INHERITED custom property** (facet 26/27/30). Tweening `--phase-color`/`--shadow-color`
  per frame forces a whole-subtree style recalc (the inheritance bomb, measured 8ms/frame over 1300
  elements). Write `--morph-t` LOCAL + `inherits:false`; route color shifts through a discrete class swap.
- **On-demand `will-change` only** (facet 13/26/27/28/30). Promote for the gesture duration, clear to `auto`
  on settle AFTER the final paint (clearing early flashes the last frame); a standing hint holds a
  compositor layer + VRAM for an idle surface — on a ubiquitous morph facility this is layer explosion.
- **The reka forwarding-drop** (facet 17/26). `@pointerdown`/`@touchstart` on a reka `<SliderRoot>`
  forwarding component are DROPPED across the Slot/forwardRef boundary — vue-tsc + units PASS, only e2e
  catches (the keepDockOpen hold never fired through a real drag). Attach native `addEventListener` on the
  RESOLVED host element; sweep this class on every reka version bump.
- **Clip-aperture keyed to `data-morph-state`, not the expanded class** (facet 16/29). Lifting
  `overflow:clip` to `visible` at frame 0 (bound to the synchronous expanded state) leaves NO aperture to
  reveal through — gate the clip on the `morphing` state so it holds for the WHOLE gesture and lifts only on
  the final paint (the AW.W2 fix).
- **The morph-state write and the `--morph-t` write must be CO-TEMPORAL** (facet 28). Writing the lifecycle
  attribute on a different element/frame than the geometry re-introduces the box-leads-content desync (the
  HEAD defect: root chrome on a CSS clock + inner width on a JS spring deferred ~16ms via
  nextTick→rAF→reflow). One scalar, one element, one frame-origin.
- **The live-audit gate, not `getBoundingClientRect` polling** (facet 17/24/26/28). The spring clock has no
  naive handle; drive the morph DETERMINISTICALLY (test-flag/PRM, real `page.hover`, expose the spring as a
  test seam + parse the token peak), never a rAF box poll.
- **Spring-token drift** (facet 17/20/27). The build-time `--spring-dock` token and the runtime
  `SpringProgress` driver sample the SAME ODE; a retune must touch BOTH the JS const and the regen PRESETS
  row, or the curves diverge. Gate on the runtime-rendered overshoot from the imported constant, not a
  hand-typed number.
- **No glass-on-glass; navigation-layer only** (facet 0/1/20/30). Apple's hard rule — glass floats only in
  the navigation/overlay band, never on content, never nested in glass. Inside a glass panel compose FLAT
  tiers. A `MorphGroup` merge fuses two glass surfaces into ONE plate, never paints two. A dock-launched
  dropdown TELEPORTS OUT (`data-glass-dock-portal` + the `keepOpen` contract) to its own sampling region —
  the keyframes D9 mis-wire (a menu dropped OUTSIDE that contract) is the canonical break.
- **Over-morphing is a taste failure** (facet 1/16/28/30). The practitioner consensus (Family.co, Rauno,
  Emil): morph SELECTIVELY on meaningful state change; a facility that morphs every element on every change
  reads as noise. The rest state must be GENUINELY static (no ambient idle motion — that violates the
  rest-quiet contract + the reduced-motion floor). The facility makes morph cheap; the design grammar
  rations it.
- **The four a11y guards are non-optional and SEPARATE** (facet 0/4/19/20): `prefers-reduced-motion` (snap
  the spring, drop lensing animation, flush the stagger — substrate-owned via a live `matchMedia` change
  listener, since CSS can't reach a JS rAF); `prefers-reduced-transparency` (flatten blur/specular/lens to
  opaque); `prefers-contrast` (raise the opacity floor); `forced-colors` (W36 structure-survival skin:
  `1px solid CanvasText`).
- **Specular blowout** (facet 0/4/22). A screen-blended pure-white catch-light over glass-ui's flat
  warm-cream substrate reads as a hot flash (it looked fine over the busy aurora it was tuned on). Warm-cream
  low-alpha core (L<100%, rest≈0/hover≈0.22/active≈0.32), rest-floor-0, ONE specular owner per surface;
  `screen` of even low-alpha white still lifts toward white over LIGHT — keep `screen` on dark, soften over
  light.

---

## 9. Examples

```vue
<!-- Minimal collapse: the dock IS the first useLiquidMorph consumer -->
<GlassDock :collapse-delay="600">
  <DockIconButton :icon="Home" />
  <DockIconButton :icon="Search" />
</GlassDock>
```

```vue
<!-- DockLayerGroup pane swap: one MorphGroup, one clock (W02) -->
<GlassDock orientation="vertical">
  <DockLayerGroup v-model:active="tab" orientation="vertical">
    <DockLayer id="assets" label="Assets" :icon="Package">…</DockLayer>
    <DockLayer id="layers" label="Layers" :icon="Layers">…</DockLayer>
  </DockLayerGroup>
</GlassDock>
```

```vue
<!-- Slider in dock: keepDockOpen + the shared dock spring register -->
<GlassDock>
  <Slider v-model="value" keep-dock-open />
</GlassDock>
```

```ts
// useLiquidMorph(cardRef) on a card→expanded self-reshape (the composable tier)
const cardRef = ref<HTMLElement>()
const { progress, retarget } = useLiquidMorph(cardRef, {
  state: open.value ? 'expanded' : 'collapsed',
  axes: ['blockSize', 'radius'],
  spring: 'dock',
})
watch(open, (v) => retarget(v ? 'expanded' : 'collapsed'))
```

```vue
<!-- A MorphGroup of fusing controls (the group tier; gel-merge is @supports-gated) -->
<MorphGroup :spacing="30">
  <GlassControl v-for="c in controls" :key="c.id" />
</MorphGroup>
```

```ts
// The route-morph morphId consumer pattern (the bifurcated seam — VT, not a spring)
const { progress } = useLiquidMorph(vizRef, {
  state: route.name,
  morphId: `viz-${useId()}`, // sets a per-instance view-transition-name for the cross-route morph
})
```

---

## 10. The fidelity ladder (achievable everywhere vs graceful degradation)

| Capability | Status | Posture |
|---|---|---|
| `linear()` spring easing | Baseline 2024 (all engines) | the GPU half of the two-track model |
| `@property` typed customs | Baseline 2024 | `--morph-t`, `--glass-refract-scale`, the specular trio |
| `color-mix(in oklab)`, `light-dark()` | Baseline | adaptive tint (`.dark`-class kept for Canvas2D-readability) |
| same-doc View Transitions + `view-transition-class` + typed directions | Baseline Newly (FF 144, Oct 2025) | KEEP for route/list morphs, RETIRE for the dock collapse |
| `@starting-style` + `allow-discrete` + `overlay` | Baseline Newly | `.glass-top-layer` — the native entry/exit lobe |
| **`interpolate-size`/`calc-size()`** | **Chromium-only 129+, NOT Baseline** | RETIRED on the morph axis; one-time measurement / standalone reveal only |
| **`corner-shape: squircle`** | **Chrome 139+ only** | `@supports`-gated; squircle is the BETTER tier, the arc is the CONTRACT |
| **`backdrop-filter: url(#svg)` lensing** | **Chromium-only** (WebKit bug open, FF not shipping) | the one missing material atom; opt-in `@supports`-gated PE over blur, never the substrate |
| `anchor()`/`position-area` | Baseline ~2026 | future: dock-launched popovers emanate from the control |
| `contrast-color()` | Baseline April 2026 | future: auto-legible glass-control foregrounds over the adaptive tint |

**Universal baseline (every engine):** the single-scalar spring + FLIP + clip-aperture + `linear()` tokens +
`@property` scalars + `color-mix` tint + warm-cream specular + edge rim + under-shadow + `@starting-style`
entry. **Graceful degradation (Chromium-better, never load-bearing):** squircle corners (→ round arc), SVG
lensing (→ blur), `interpolate-size` (→ FLIP measure) — each fails to the lower tier EXPLICITLY, never a
broken ref. **A11y floor (non-optional, four guards):** PRM, reduced-transparency, contrast, forced-colors.

---

*Sources: `docs/tranches/AX/research/liquidglass-synthesis.md` (the path-forward + README outline);
`docs/tranches/AX/research/liquidglass-research-corpus.json` (the 32-facet corpus); Apple HIG / WWDC25
§219/§323 "Meet Liquid Glass"; Family.co / Rauno Freiberg / Emil Kowalski / Benji Taylor practitioner
craft; kube.io / LogRocket / rizroze SVG-displacement recipes; Motion.dev / web.dev performance tier lists.*
