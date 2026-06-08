I have everything I need. The mandate is confirmed: §18.3 explicitly tests whether `useLiquidMorph` should be net-new (no such file exists yet), names the dock single-scalar `--dock-morph-t` (W01) as its first consumer, and asks for a research-backed README. The notes are accurate to HEAD. I'll now write the synthesis.

I have analyzed all 32 facets in full and grounded the load-bearing claims against HEAD. Producing the synthesis now.

---

# AX Liquid-Glass Morph Synthesis — Path-Forward + Research-Backed README

**Synthesizer verdict in one line:** glass-ui is already ~70% of the iOS-26 vocabulary; the SOTA corpus is **mostly convergence, three genuine material additions (lensing, shape-fusion, squash), and one net-new substrate (`useLiquidMorph`)** — and the corpus **unanimously ratifies the AX.W01 single-scalar/single-clock thesis and the retire-VT-for-the-collapse decision** while preserving the per-instance `view-transition-name` route seam. Every facet that touches the dock independently re-derives the same architecture, which is the strongest signal in the corpus.

Grounded against HEAD (`at-dock-convergence @ eaba94f`): `useLayerTransition.ts` (479 lines) STILL forks `NATIVE_VT`/`startViewTransition` (L108/L275) and writes only `--dock-morph-progress` for the child stagger — not a unified box scalar; `interpolate-size`/`calc-size` already retired (AV.W9.0); no `useMorph`/`useLiquidMorph` exists; REQUIREMENTS §18.3 mandates testing exactly that net-new substrate.

---

## PART 1 — THE PATH FORWARD

### 1.0 The decision spine (the one rule the whole corpus converges on)

**ONE driver per concern, per axis, per clock.** Every catastrophic finding in the corpus and in glass-ui's own scar-history is a violation of this: the AV.W9.0 dock-freeze (`interpolate-size` second-driving width against the JS spring), the box-leads-content ~16ms desync (root chrome on CSS transitions vs inner width on the spring deferred a frame), the fourier two-dock `glass-dock-1` name collision (dropped VT snapshot, ~13 red e2e). The unified morph facility must make single-authorship **structural**, not a discipline (facets: single-scalar morph kernel ×8; dual-driver-race pitfall ×11).

The corpus splits the morph problem into **two separable concerns the AX charter already disentangles** — and the path forward keeps them separate:

| Concern | Correct primitive | Wrong primitive | Why |
|---|---|---|---|
| An element's OWN continuous reshape (dock collapse↔expand, pill↔card, press-squish) | **One analytic spring → one normalized scalar → every axis via `calc()`** | View Transitions | VT crossfades *rasterized* snapshots → taffy-stretch, text-blur, box-leads-content desync, uninterruptible (facets: VT-wrong-primitive ×9) |
| Element-to-element / cross-ROUTE morph (card→detail, fourier viz↔workspace) | **View Transitions named-element (`view-transition-name`)** | A live spring | VT *is* the web `glassEffectID`/matchedGeometry for genuinely-different DOM; cheap and browser-owned |

This is the AX.W01 CONVERGE fold verbatim: **retire the VT collapse fork, preserve the per-instance `glass-dock-${useId()}` route seam.** The corpus corroborates it from every angle (facets on matched-geometry, view-transitions-for-morphing, the keyframes.js runtime, compositor-perf, and the morph-state-machine all independently reach this verdict).

### 1.1 Deepening the DOCK waves (W01–W06)

**W01 — single-scalar one-clock morph** (the headline; SOTA-blessed). The corpus upgrades the existing plan in three concrete ways beyond "retire the VT fork":

1. **`--dock-morph-t` MUST be `@property`-registered** `{ syntax:'<number>'; inherits:false; initial-value:0 }`. An unregistered custom property animates *discretely* (jumps, no tween) and runs on the main thread; a registered `<number>` interpolates composited (facets: single-scalar kernel, FLIP+scalar, compositor-perf). `inherits:false` is also the inheritance-bomb guard.
2. **Drive the MATERIAL off the same scalar, not just geometry.** Apple's "material thickens when it flexes larger" (deeper shadow, more pronounced lensing, softer light scatter — WWDC25 §219) becomes a free fold: `--shadow-dock-wrap` (W04), `--glass-refract-scale` (the lens), and `--glass-specular-intensity-*` (W09) all read `calc(… * var(--dock-morph-t))`. This is the single highest-value *new* iOS-26 behavior achievable cheaply, and it's why W01 and W09/W20 are coupled, not sequential.
3. **Preserve the velocity-continuity retarget (AV.W9.2) as the one load-bearing iOS-feel piece** through the 479→~130 line rewrite. A re-toggle mid-flight re-seats the live `SpringProgress` from `(value, velocity)` — the thing CSS `linear()` springs and VT fundamentally cannot do (facets: interruptible-spring ×6; iOS-spring-physics).

**Audit-feasibility caveat the corpus surfaces (load-bearing):** the W01 box morph drives D-tier (`inline-size`, `padding`) and C-tier (`border-radius`, `background`, `border-color`) properties per frame — the *expensive* corner of the 16.67ms budget. This is acceptable ONLY because the clip-reveal aperture makes it paint-bounded (content laid out once, box-as-window) not reflow-per-frame. The path forward must audit which axes can move to S-tier `transform`/`clip-path` and keep the morphing subtree small. And the W01 gate cannot be `getBoundingClientRect` polling — keyframes device-proved 181 rAF rect samples captured NO morph (VT runs off the DOM clock); the gate must deterministically drive the readable spring arm and assert box-geometry vs a child's opacity onset on ONE rAF timeline (facets: compositor-perf, morph-state-machine).

**W02 — one orchestrator per dock = the web `GlassEffectContainer`.** Fold the inner `DockLayerGroup` onto the outer driver via DI (the existing `dockContext`/`createStrictContext` seam) so a dock is ONE morph orchestrator whose state = `expandedState × activePane`. Two independent springs writing inline-size = double-animation + desync (the W02 born-RED). This is *exactly* Apple's "one shared sampling region, glass cannot sample glass" rule expressed as motion. Replace the hand-typed `0.08/0.16/0.24` nth-child stagger ladder with one `--dock-stagger-step × index` token, keyed off the morph scalar (facets: GlassEffectContainer ×7; morph-choreography).

**W03 — held as a first-class morph-state input.** `useDockHold(rootRef)` attaches *native* `pointerdown`/`touchstart` on the **resolved host element** — the reka-ui forwarding-drop fix (`@pointerdown` on a `SliderRoot` Slot/forwardRef is silently dropped; vue-tsc + units pass, only e2e catches; the `keepDockOpen` hold has *never* fired through a real drag). `held`/drag-velocity feed the spring target synchronously. The corpus flags this binding-verification class as a recurring footgun to sweep on every reka version bump (facets: morph-state-machine, useLiquidMorph-design, interruptible-spring).

**W04 — concentric radius + content-driven wrap.** Inner radius = `calc(outer − padding)` off the same scalar (pill stadium → finite card glides with width); `corner-shape: superellipse()` interpolating on the morph clock gives the literal iOS continuous-corner curve (Chrome 139+, `@supports`-gated over `border-radius` round). The 40-button @800px = 1861px nowrap overflow is fixed by content-driven intrinsic `flex-wrap`, NOT a magic-640 `@media` toggle. **Do NOT reintroduce `interpolate-size`/`calc-size` on the morph axis** — it is viable only as a one-time *measurement* primitive (`width: calc-size(max-content, size)` read once), never a co-driver (facets: shape-interpolation, interpolate-size ×4).

**W05 — one iOS-spring vocabulary** (the corpus adds a re-parameterization the existing plan should adopt). Excise the legacy `--ease-apple-spring` cubic-bezier (+27.5% bezier-approx overshoot — a *second* spring vocabulary); re-point its 5 internal + 4 speedtest consumers (silent clean-break: a deleted token leaves `var()` resolving empty → instant transitions, no error — sweep consumers before excising). **New from the corpus:** the iOS-17+ canon is `(perceptualDuration, bounce)`, not `(response, dampingFraction)`. Adopt `(duration, bounce)` as the *authoring* surface in `regen-spring-tokens.mjs` (`bounce = 1 − ζ`; stiffness `=(2π/duration)²`; damping `=(1−bounce)·4π/duration`), so settle/control/playful map cleanly to Apple's `smooth(0.0)/snappy(0.15)/bouncy(0.3)`. Keep the governed set SMALL — Apple ships literally three; glass-ui's smooth/snappy/bouncy/gentle/dock is already at the edge, justify each against ≥1 consumer (overfitting census). **`duration` is PERCEPTUAL** (time-to-meaningful-part), NOT settle time — gate on the spring's `settleThreshold`, never `duration` (facets: iOS-spring-physics, keyframes-runtime, every-element-morphs).

**W06 — dock polish + the press-squish atom.** Hoist tap-squish onto the dock controls. The corpus adds **volume-preserving squash** as a thin derivation already buildable from `useSpringPress` (which exposes a `velocity` ref that is currently *unused* for deform): `scale: var(--squash) calc(1/var(--stretch))` with `stretch = 1 + clamp(|v|·k, 0, maxStretch)`. **Cap `maxStretch` LOW** (~1.06–1.10 — iOS Liquid Glass is restrained; `--spring-dock` is only +4.6%; iOS 26.2 *dialed down*). The reciprocal pairing is non-negotiable or volume reads wrong (facets: liquid-squish-physics, interaction-feedback).

### 1.2 Deepening the ANIMATION-language wave (W05)

W05 is the governance wave; the corpus reframes it as **the spring-vocabulary half of the unified facility**. Beyond the excision, three structural points:

- **The two-track CPU/GPU model is correct and already shipped.** Live JS `SpringProgress` integrator for the interruptible/gesture path; build-time `linear()` tokens (sampled from the SAME ODE via `regen-spring-tokens.mjs`) for fire-and-forget declarative transitions. Keep both; the rule is `linear()` for non-interruptible one-shots (entrances, `@starting-style` pops), the live spring for anything a user can interrupt mid-flight (facets: keyframes-runtime, iOS-spring-physics, every-element-morphs).
- **`linear()` sample-count fidelity is a live gate input.** 24 samples clips the bouncy peak (ζ=0.45 analytic peak ≈1.2054 reads ~1.1833); 48 lands it. The proof must render overshoot at runtime from the imported constant, not a hand-typed literal — and a retune MUST touch BOTH the JS const and the regen PRESETS row or the curves drift.
- **Asymmetric/frequency-aware motion is SOTA, not decoration.** Collapse (frequent dismiss) → snappier/non-overshoot register; expand (the reveal) → softer overshoot. This is already encoded in the typed-VT directions; it survives the VT-collapse-fork retirement by moving onto **two spring configs keyed on direction**. And the corpus is firm: **never animate keyboard-initiated or high-frequency actions** (press-squish is pointer-only) (facets: morph-choreography, reduced-motion, cost-budget).

### 1.3 Deepening the GLASS waves (W09 specular, W20 primitives)

**W09 — specular tune-to-subtle** (the lowest-risk, highest-signal concrete fix in the corpus). HEAD `glass.css` paints `hsl(40 30% 100% / 0.55)` — pure white, contradicting its own "warm-cream" comment; rest floor 0.35 not 0; made worse by the AW.W22 blast-radius promotion onto *every* band surface. The fix:
- Warm-cream low-alpha core (~`hsl(40 40% 96%)`), tokenized `--glass-specular-intensity-{rest≈0, hover≈0.22, active≈0.32}` + dark arm; rest floor → ~0 so static unwired plates are genuinely clean.
- **Retire the dock's SECOND specular** — the `--glass-highlight` hover box-shadow stacking on the moving `::before` on the most-hovered surface in the app (the worst blowout).
- Lift the duplicated `trackSpecular` pointer-write (verbatim in `Card.vue` + `DockIconButton.vue`) into `useSpecularTracking()`.
- **Critical gate coupling:** `proof-glass-material-unified.mjs` hardcodes 0.6/0.85 — re-point it to assert the *tokens exist*, or the tune lands RED.
- Tie specular intensity to the press spring (lockstep) — Apple's `.glassEffect(.interactive())`: light and squish on one clock (facets: specular ×3, material ×4).

**W20 — primitive material fixes + GlassPanel retire.** Two concrete defects the corpus surfaces:
- The native-`<dialog>` backdrop uses `hsl(var(--background) / α)` — `--background` is *already* a complete `hsl()` color, so the double-wrap NEVER paints; the scrim dim is **dead**. Fix to `color-mix(in srgb, var(--background) N%, transparent)`. (`proof:no-nested-hsl` polices this class.)
- Retire the JS `createGlassFilter`/`useGlassRenderer` SVG-displacement path onto CSS-native `.glass-material` — it hard-stomps `el.style.backdropFilter/border/boxShadow` with hardcoded non-dark-adaptive white and async-loads a dataURL (blank first paint). Any new refraction must be **CSS-cascade-additive, dark-adaptive, `@supports`-gated**, never an imperative inline-style write.

**The genuinely-missing material atom — LENSING (opt-in, Chromium-only).** glass-ui's `#glass-refract` already bakes the Apple squircle profile `y=⁴√(1−(1−x)⁴)` but with a crude radial-gradient map and a single pass. The SOTA upgrade: (a) a Snell-derived squircle normal map, (b) **three-pass RGB chromatic aberration** (the single biggest visual tell of "thick glass" vs "glassmorphism"). Keep `@supports (backdrop-filter: url(#…))`-gated over the blur base (WebKit bug 245510 open, Firefox not shipping). **Only `scale` animates cheaply** — any shape/size change forces a full displacement-map rebuild, so wire `scale` to `--dock-morph-t` and NEVER regenerate the map mid-morph. Register `--glass-refract-scale` as a typed `@property` so the lens can spring (facets: refraction ×2, material, CSS-baseline).

### 1.4 THE UNIFIED MORPH SUBSTRATE — `useLiquidMorph` (IS it net-new wave-worthy?)

**Verdict: YES — net-new and wave-worthy, but ~70% assembly, not greenfield.** REQUIREMENTS §18.3 explicitly mandates testing this, and the corpus answers decisively (facets: useLiquidMorph-design, every-element-morphs, morph-state-machine, dock-layering, cost-budget). The justification:

- It is the **direct web transposition of SwiftUI's `GlassEffectContainer` + `glassEffectID` + Motion's `LayoutGroup` + `layoutId`** — a proven, named API shape, not a speculative one.
- It makes "every element morphs" ONE idiom instead of per-component bespoke (the §18.1 directive). The dock `--dock-morph-t` (W01) becomes its **first consumer**, not a dock-local trick — which satisfies the substrate-with-consumer invariant *by construction* (dock + ≥1 glass primitive at landing).
- It is the natural home for the perf/a11y invariants the corpus repeats — on-demand `will-change`, inheritance-bomb guard, PRM fast-path, one-driver-per-axis — so every consumer inherits them rather than re-hand-rolling.

**Proposed API surface (two-part seam, mirroring `GlassEffectContainer`+`glassEffectID` / `LayoutGroup`+`layoutId`):**

```ts
// (1) Per-element driver — owns ONE SpringProgress, writes ONE @property-registered
//     scalar --morph-t to elRef once/frame; exposes progress, isMorphing, retarget().
const { progress, state, retarget } = useLiquidMorph(elRef, {
  state: 'collapsed' | 'expanded',      // the discrete model state
  axes: ['inlineSize', 'radius', 'specular'], // CSS calc()s off --morph-t; JS owns only the scalar + the one FLIP-measured size axis
  spring: 'dock',                       // the governed W05 register (default), or settle/control/playful
})

// (2) Shared orchestrator — the GlassEffectContainer / LayoutGroup analog.
//     Nested elements INJECT this; they NEVER spin up their own engine (W02).
provideMorphGroup({ spacing })          // spacing = the gel-merge threshold
```

**Three opt-in tiers (cheapest first):**
- **CSS-only:** an element joins a `.glass-material`/morph-aware class and reads `--morph-t` from an ancestor `MorphGroup` — zero JS (child stagger, color, radius).
- **Composable:** `useLiquidMorph(elRef)` for an element owning its own reshape (dock root, panel). One call; substrate owns spring + FLIP + will-change + PRM + clip-aperture lifecycle.
- **Group:** wrap children in `MorphGroup` for coordinated/nested morphs (dock + DockLayerGroup; a toolbar of fusing glass controls).

**The matched-geometry seam stays bifurcated:** `useLiquidMorph` drives self-reshape via spring+FLIP (no VT); it ALSO exposes an opt-in `morphId` that sets a `view-transition-name` for the shared-element/route case (preserving the fourier seam). The substrate offers both and documents which to reach for; conflating them is the AW regression.

**Reuse ledger (the ~70% already built):** `keyframes.js SpringProgress` (analytic ODE, retargetable, settle-aware) · `useSpring` (Vue wrapper) · `useLayerTransition` (FLIP + velocity-continuity + will-change + clip-aperture lifecycle → *promote* from dock-private to substrate) · `createStrictContext` (typed DI) · `useViewTransition` (route seam) · `useSpecularTracking` (W09 light seam). **Net-new:** the unifying API surface + the `MorphGroup` orchestrator + the `axes`-declaration that lets CSS `calc()` off one scalar + the 3-state `data-morph-state=idle|morphing|settled` lifecycle attribute (promote the existing boolean `data-morphing` to the Radix-style enum so will-change/clip/stagger arm-disarm key off three distinct hooks).

**Where it slots:** a net-new substrate wave (the §18.3 "likely net-new" the charter flags), authored so W01 re-derives `useLayerTransition` as a thin dock-flavored wrapper over it. Guard hard against over-generalization: ship ONLY with ≥2 real consumers at landing; every API knob needs a named consumer or it is overfit substrate.

### 1.5 The 2025 web baseline — achievable now vs graceful degradation

| Capability | Status | glass-ui posture |
|---|---|---|
| `linear()` spring easing | **Baseline 2024** (all engines) | Shipped; the GPU half of the two-track model |
| `@property` typed customs | **Baseline 2024** | Shipped (specular trio); ADD `--dock-morph-t`, `--glass-refract-scale` |
| `color-mix(in oklab)`, `light-dark()` | **Baseline** | Shipped (adaptive tint; `.dark`-class kept for Canvas2D-readability) |
| Same-doc View Transitions + `view-transition-class` + typed directions | **Baseline Newly Available** (FF 144, Oct 2025) | Shipped; KEEP for route/list morphs, RETIRE for dock collapse |
| `@starting-style` + `allow-discrete` + `overlay` | **Baseline Newly Available** | Shipped (`.glass-top-layer`); the native entry/exit lobe |
| **`interpolate-size`/`calc-size()`** | **Chromium-only 129+, NOT Baseline** | RETIRED on the morph axis (correct); usable only as a one-time measurement or a standalone reveal the spring never touches |
| **`corner-shape: squircle`** | **Chrome 139+ only** | Shipped `@supports`-gated; the squircle is the *better tier*, the arc is the *contract* |
| **`backdrop-filter: url(#svg)` lensing** | **Chromium-only** (WebKit bug open, FF not shipping) | The one genuinely-missing atom; opt-in `@supports`-gated PE over blur, never the substrate |
| `anchor()`/`position-area` | **Baseline ~2026** | Future: tether dock-launched popovers, derive transform-origin so menus "grow from the control" |
| `contrast-color()` | **Baseline April 2026** | Future: auto-legible glass-control foregrounds against the live adaptive tint |

**Universal baseline (every engine):** the single-scalar spring + FLIP + clip-aperture + `linear()` tokens + `@property` scalars + `color-mix` tint + warm-cream specular + edge rim + under-shadow + `@starting-style` entry. **Graceful degradation (Chromium-better, never load-bearing):** squircle corners (→ round arc), SVG lensing (→ blur), `interpolate-size` (→ FLIP measure). **A11y floor (non-optional, four guards):** `prefers-reduced-motion` (snap the spring, drop lensing animation, flush the stagger — substrate-owned via live `matchMedia` change-listener since CSS can't reach a JS rAF); `prefers-reduced-transparency` (flatten blur/specular to opaque); `prefers-contrast` (raise opacity floor); `forced-colors` (W36 structure-survival skin: `1px solid CanvasText`).

---

## PART 2 — RESEARCH-BACKED README OUTLINE (dock + morph facility)

For `src/components/custom/dock/README.md` (extends the existing 288-line doc) and a new `useLiquidMorph` doc. Conforms to the canonical-readme-shape (§2.9).

### `@mkbabb/glass-ui/dock` + the Liquid Morph facility

**1. What this is — the iOS-26 fidelity bar.** Liquid Glass is a *material*, not a blur: it LENSES (bends light at the rim), carries a motion-tracked specular, casts an adaptive shadow, and MORPHS between states on one interruptible spring. The dock is its headline surface — a singular floating plane that reshapes/merges/splits as a liquid body. State the bar plainly: lensing-not-blur; glass lives ONLY in the navigation/overlay band (never content, never glass-on-glass); one spring, one clock, one scalar; interruptible physics; every axis a token. *(facets: Apple HIG, material model, reference-surveys.)*

**2. Use cases.** Dock collapse↔expand · multi-layer pane swap (`DockLayerGroup`) · vertical/horizontal orientation · slider-in-dock keep-open · scroll-reactive shrink/expand · the generalized facility on dialog/drawer/card/sheet/popover.

**3. The two morph concerns (the decision boundary — front and center).** A one-table rule: **self-reshape → single-scalar spring** (the dock's own collapse); **element-to-element/route → View Transitions named element** (card→detail, route morph); **surface fusion → gooey SVG filter** (two glass pills merging). With the load-bearing caveat: VT crossfades rasterized snapshots — it is the WRONG primitive for a same-element layout morph and the RIGHT one for a route morph. *(facets: matched-geometry, view-transitions-for-morphing, dock-layering.)*

**4. The spring vocabulary.** The governed register table — `smooth(bounce 0)` / `snappy(0.15)` / `bouncy(0.3)` / `gentle(critically-damped)` / `dock(0.32, ζ0.7, +4.6%)` — keyed `(perceptualDuration, bounce)`, with the PRM degrade row (snap-to-target) for each. The two-track note: `linear()` tokens for fire-and-forget, live `SpringProgress` for interruptible. The restraint rule: structural morphs ride the *control* register (snappy/dock), bouncy is reserved for celebratory one-shots; never animate keyboard/high-frequency actions; cap overshoot — iOS *dialed down*. *(facets: iOS-spring-physics, animation-runtime, cost-budget, every-element-morphs.)*

**5. `useLiquidMorph` API.** The two-part seam (per-element driver + `MorphGroup` orchestrator); the three opt-in tiers; the `morphId` route-seam escape hatch; the reuse ledger; the morph state-machine (`idle|morphing|settled`). *(facets: useLiquidMorph-design, morph-state-machine.)*

**6. Best practices / pitfalls (the scar list).** One driver per axis (the AV.W9.0 dock-freeze witness) · per-instance `view-transition-name` via `useId()` (the fourier collision witness) · `@property`-register or it jumps · never tween an inherited custom property (the inheritance bomb) · on-demand `will-change` only · the reka forwarding-drop (native listeners on the resolved host) · clip-aperture keyed to `data-morphing` not the expanded class · the live-audit gate (drive the spring deterministically, never poll `getBoundingClientRect`). *(facets: every pitfall block; ratified against HEAD.)*

**7. Examples.** Minimal `<GlassDock>` collapse · `DockLayerGroup` pane swap · slider-in-dock · `useLiquidMorph(cardRef)` on a card→expanded morph · a `MorphGroup` of fusing controls · the route-morph `morphId` consumer pattern.

**8. The fidelity ladder (achievable vs degrade).** The §1.5 table verbatim: universal baseline / Chromium-better / a11y floor — so a consumer knows exactly what paints everywhere and what is a progressive garnish.

---

**Relevant files (absolute):**
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/AX/REQUIREMENTS.md` (§18.3 `useLiquidMorph` mandate — the binding directive)
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/AX/AX.md` (W01–W06 dock band, W09 specular, W20 primitives charter)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/composables/useLayerTransition.ts` (479 lines — the VT fork at L108/L275 to retire; the FLIP+velocity-continuity to promote)
- `/Users/mkbabb/Programming/glass-ui/src/styles/dock.css` (the `--dock-morph-progress` stagger L734–768, clip-aperture L114–159 — the scalar pattern to generalize to `--dock-morph-t`)
- `/Users/mkbabb/Programming/glass-ui/src/composables/motion/useSpring.ts` (the `SpringProgress` morph clock core)
- `/Users/mkbabb/Programming/glass-ui/src/styles/glass.css` (the `hsl(40 30% 100% / 0.55)` specular blowout — W09 fix; the `.glass-material` rim/specular group)
- `/Users/mkbabb/Programming/glass-ui/scripts/regen-spring-tokens.mjs` (the `(duration, bounce)` re-parameterization site for W05)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/README.md` (288 lines — the doc to extend per Part 2)