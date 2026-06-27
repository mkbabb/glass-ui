# BG-WS6 · Siri capabilities — SPEC (pass 1)

> Verified against HEAD `tranche/BG @d58076a8` (glass-ui 4.2.x line). Substrate inventory + the two
> PROVEN risks (Safari `backdrop-filter` snap, the box-scale text-crush) were re-checked live; the
> reference frames (`scratchpad/evidence/frames-2144`, `frames-2207`, `crops/{waveform-f006,
> island-descend-f008,answer-f012}.png`) were read pixel-by-pixel, not from prose. WS2 (dock) +
> WS3 (glass) + WS5 (viz) are CONVERGED; this spec consumes their settled outputs and is bound by
> WS5's just-landed substrate doctrine.

---

## GESTALT GOAL

Recreate the iOS-26/27 Siri **glass dock-ISLAND** + the warm amplitude-reactive **WAVEFORM**, deftly
augmenting the `GlassDock` system — as a pure COMPOSITION of shipped substrates, never a fork.

**The island** is ONE morphing glass surface, anchored to a Dynamic-Island origin (top-center), that
**descends** over content, **morphs** through four seated forms (pill → droplet → stadium → panel) on
a single continuous radius+size scalar, **answers** (the app reads through a deepening backdrop dim),
and **dismisses** (contracts up). It carries a warm asymmetric under-glow + a bright specular silhouette
rim, and over a focal "Search or Ask" state the WHOLE backdrop dims+blurs.

**The waveform** is a warm prismatic lens-flare light-bar that pulses INSIDE the island — a bright
cyan/white hot core fanning amber → orange → pink, a thin horizontal streak with a soft vertical
bloom (light bending THROUGH glass, a caustic — never discrete bars), amplitude-reactive (brightens +
saturates on voice), degrading to a calm warm rim light-bar in the rich results form.

**The wire** binds both into the dock's voice/search entry: the "Search or Ask" pill IS the dock's
search affordance (the existing `useDockSearch` pipeline, ONE matcher), box-inviolate beside the dock
engine — the island feeds ZERO size into the dock's intrinsic box.

The reference reads (pixel-verified):
- `waveform-f006.png` — an obsidian-black reflective droplet hanging from the top; a warm prismatic
  streak (cyan/white core → amber/orange/pink) across its upper third; the chart behind reads THROUGH
  the droplet (refracted/magnified).
- `island-descend-f008.png` — a dark island mid-descend; a luminous warm-white SPECULAR RIM traces the
  bottom corner-radius (lit DURING travel); a warm asymmetric under-glow (amber bleed) below the rim;
  the backdrop is dimmed + blurred.
- `answer-f012.png` — a dark-translucent results panel (the YouTube play/cast/CC glyphs read THROUGH at
  low alpha); a large outer radius with NESTED rows at a tighter INNER radius (concentric); "Here's
  what I found." white text.

---

## THE CARDINAL RECONCILES (the two audits + the WS5 doctrine, resolved)

The research fleet surfaced four genuine forks-in-the-road. Each is resolved here so the wave specs are
trustworthy.

### R1 · The morph substrate is a UNION (both audits saw one half)
- `useLiquidReveal` (the `ElementMorph` source-rect FLIP, spring 1→0 from a trigger rect, 3 coupled
  channels transform/opacity/`filter:blur→0`) = the **DESCEND / dismiss** FLIP from the top-anchor
  (Dynamic-Island origin). It is the entrance, not the inter-form morph.
- The fission one-scalar/one-rAF loop SHAPE (harvested into a sibling `useSiriIsland`) = the
  **pill↔droplet↔stadium↔panel** morph on ONE `--siri-island-t` scalar. The four forms are DATA
  (`SiriIslandForm` descriptors `{ radiusFrac, w, h }`), not four code paths — the
  `DockSplitSignature` "signature is data" floor.

### R2 · NO new spring — compose `useDockSpring` (WS2's HARD invariant)
WS2 (CONVERGED) minted `useDockSpring` with a binding grep bar: **exactly ONE `new SpringProgress` in
the dock dir** (`useDockSpring.ts`). `useDockFission` itself now COMPOSES it. The Siri island therefore
composes `useDockSpring` (= the `DOCK_SPRING` / `--spring-dock` register, response 0.68 → the ~7%
weighty overshoot, the `--spring-dock-duration` ≈0.66s descend clock) — **never a 6th raw
`new SpringProgress`**. A self-test bite asserts `useSiriIsland` constructs no `SpringProgress` and
imports `useDockSpring` + `useLiquidReveal` (not the dead `useLiquidMorph`).

### R3 · The waveform is WebGL2-ONLY (the WS5 doctrine — DROP the WGSL twin + the ΔE-parity bar)
WS5 (CONVERGED) settled the suite's substrate rule: **WebGPU is kept IFF it earns a capability the
WebGL2 path cannot express.** It DELETED the WGSL/GLSL dual-path for every single-uniform
fullscreen-fragment viz (concentric, paper-grid) as the KISS smell — *"the 'two languages, two paths,
gated by a ΔE-0.0 tautology' carrying cost is DELETED, not factored."* The Siri waveform is EXACTLY
that shape: a single fullscreen-fragment light-bar, no compute, no painterly register, no flagship
status. So:
- **DROP** `siri-waveform.wgsl.ts` (the S-siri-frames spec's Approach A) entirely.
- **DROP** the `proof:gpu-substrate-single` ΔE-parity row for the waveform — there is no second path to
  parity-against, and the bar is unproducible anyway (RISK proof: WebKit's `navigator.gpu` is
  `undefined`, so a cross-engine WGSL-vs-WGSL parity can never run).
- The waveform is born on **`useWebGLCanvas` directly** (the WebGL2 leaf over `createCanvasLifecycle` —
  the post-delete pattern WS5 chose for concentric/paper-grid: *"Re-bind to `useWebGLCanvas` directly…
  one substrate, no dead picker arm; no-legacy law"*). It inherits offscreen-pause + live-PRM
  one-static-frame + consumer-DPR + WCAG-2.2.2 pause for free. ONE shader (`siri-waveform.glsl.ts`),
  one `mode` uniform (`streak` | `rim`), no second loop.

### R4 · The content-morph is CLIP-APERTURE + per-form CROSSFADE (the box-scale text-crush is PROVEN)
The naive "scale the whole island from the pill footprint" approach (the dock collapse pattern) was
build-proven BROKEN: `scratchpad/scale-t0.png` shows "2 plus 2 is 4" vertically CRUSHED to ~11% height
+ corners squashed to an ellipse (`scaleX≠scaleY`). The dock pattern works only because the dock
collapsed state hosts NO legible content (it's a circle/icon behind an overflow-clip aperture). The
island hosts DIFFERENT legible content per form (pill="Search", stadium="2+2 is 4", panel=result rows),
so:
- The GLASS BOX morphs its reserved size + corner-radius off `--siri-island-t` (the forms-are-DATA
  geometry survives — `border-radius` is paint-only, NOT in the reflow set, compositor-safe).
- Each form's CONTENT lives in its OWN non-scaled layer, cross-faded (opacity + a small translate) on
  the same scalar behind an `overflow: clip` aperture. Content NEVER inherits the box scale.
- The size morph is `transform: scale()` over a RESERVED `to` footprint (one layout solve;
  `proof:no-layout-animation` reds an `inline-size`/`width`/`padding` lerp).

### R5 · The descend blur is ENGINE-HONEST (the Safari `backdrop-filter` snap is PROVEN)
Live probe (`scratchpad/siri-probe2.mjs`): a transitioned `backdrop-filter` blur SNAPS in WebKit
(byte-identical 5012/5012/5012 across the timeline while computed blur jumped) — WebKit does not
re-rasterize the backdrop progressively. The library has avoided this 100% of the time (grep
`transition.*backdrop-filter src/styles` is EMPTY). The descend's "app reads through a deepening blur"
is therefore split, both arms shipped:
- The deepening read-through is a `filter: blur()` on a **scrim layer's OWN pixels** (the `reveal.css`
  / `liquid-enter.css` idiom the library already trusts — *"the surface's OWN pixels (`filter`), NOT
  `backdrop-filter`"*), ramped off `--siri-island-t` (smooth on BOTH engines).
- The whole-backdrop DIM rides the modal-scrim seam (`dialog.glass-top-layer::backdrop`): animate
  `background-color` dim (`color-mix(in srgb, var(--background) Npct, transparent)` — NEVER
  `hsl(var(--background)/α)`, the A5-1 double-wrap-paints-nothing trap) while the `backdrop-filter`
  blur stays STATIC (the seam's existing discipline).
- The π asserts the read-through deepens on BOTH engines (a Chrome-only π that asserts a smooth
  `backdrop-filter` ramp IS the headless-green/visually-broken trap, 4th occurrence).

### R6 · The obsidian listen-droplet is a NAMED per-instance fill re-point (the material gap)
`.glass-capsule` is warm-cream (grep `obsidian|black-glass|reflective src/styles/glass` is EMPTY; even
dark-mode `--card` is warm-dark, NOT near-black). The reference listen-droplet (`waveform-f006`) is
near-BLACK highly-reflective glass. The fill is INDIRECTED through `--glass-capsule-fill` (the
documented retune seam), so the island re-points it to a near-black source + lifts the specular rim for
the `listening` state — a documented retune, NOT a second glass recipe. The exact Siri black is a
PRESET in the consumer; the library ships the dark-register HOOK as a `--siri-island-listen-fill` token
defaulting to a warm-deep value (the warm-cream/brand-warm identity floor). The spec/gate names this
explicitly — "composes `.glass-capsule`" plainly would ship warm-cream where the reference is obsidian
(a gestalt FAIL).

### R7 · The color source is the in-shader `procedural-color.glsl.ts` arc (DRY)
A GPU shader cannot call the CPU `spectrum-walk.ts` per-fragment. The DRY path: CPU computes the warm
amber→orange→pink ANCHOR stops via the `/color` leaf (`cssToOklch`), the shader does the shorter-hue
OKLCh arc in-fragment by splicing the EXISTING `procedural-color.glsl.ts` chunk (`interpolateHueTurns`
+ the palette ramp — already aurora-spliced, mirrors value.js, passes `proof:single-color-core`). A
redundant CPU LUT upload via `spectrum-walk` is the non-DRY path. The library default ramp is
warm-cream/brand-warm; the exact Siri prism (cyan→white→amber→orange→pink) is a consumer PRESET. NO
re-rolled color math; the CPU anchor-stop derivation rides `spectrum-walk` ONLY where a consumer passes
concrete `#hex` anchors (the BC.W-AX-BP-LAZY value.js-lazy boundary — the default warm anchors are a
static value.js-free constant).

### R8 · The `--siri-island-t` namespace is MANDATORY (live collision)
`--island-t` / `--island-dx` / `--island-dy` / `--neck-t` are OWNED registered `@property` scalars in
`fission-bridge.css` (the dock fission island plate reads them). The Siri island MUST namespace
`--siri-island-*` (the de-overloaded-noun precedent) and register `--siri-island-t` in
`property-regs.css §18` (a bare unregistered `var()` SNAPS instead of interpolating — the explicit
`--specular-*` lesson).

### R9 · Both engines verified — WIDEN the webkit `testMatch` (structural gap)
The webkit Playwright project's `testMatch` is a literal allowlist array
(`["safari-webgl.spec.ts","aurora-swraster.spec.ts", …]`), so `siri-island.spec.ts` +
`siri-waveform.spec.ts` would NOT run on WebKit unless explicitly enrolled. The wave ADDS both to the
array — else "verify both engines" is unenforced. Accept that the WGSL primary can never run on WebKit
(no `navigator.gpu`); Safari verifies the WebGL2 GLSL path; the island is compositor-only +
Safari-native by construction (the §7 floor — no SVG goo, no WebGL on the ISLAND itself; the waveform
is the GPU layer it HOSTS).

---

## MECHANISM (the idiomatic approach, concrete)

### The island surface (`<SiriIsland>` + `useSiriIsland`)

```
useSiriIsland(islandRef, {
  state,          // 'idle' | 'listening' | 'responding' | 'dismissing'
  form,           // 'pill' | 'droplet' | 'stadium' | 'panel'  (DATA index into SIRI_FORMS)
  anchorRect,     // the Dynamic-Island top-anchor rect (the descend origin)
}) => { t, descend(), dismiss(), seatSync() }
```

- **The morph loop** clones the fission shape but composes `useDockSpring` (R2): one spring on
  `--spring-dock`, interruptible re-base from velocity, bidirectional, writing ONE `--siri-island-t`
  (registered `@property <number>`, R8) once/frame to the island root. The four forms are a
  `SIRI_FORMS: Record<SiriForm, SiriIslandForm>` map (R1) — `{ radiusFrac, w, h }` derived on a **√φ
  ladder** (the aristotelian-proportion law: each form's size steps by `√φ ≈ 1.272` from the pill base,
  so `pill → droplet → stadium → panel` is a proportioned geometric progression, not four magic
  numbers). The box reserves the active form's `to` footprint (one layout solve) and `transform:
  scale()` over it drives the visible size; `border-radius` interpolates `f(--siri-island-t)` between
  the from/to `radiusFrac × min(w,h)`.
- **The descend** is `useLiquidReveal(islandRef, { trigger: anchorRect, preset: 'dock', blur: 4 })` —
  the source-rect FLIP from the top-anchor, transform-origin at the DI, the 3 coupled channels. The
  warm specular rim is lit during travel (`island-descend-f008`) — it composes `glass/rim.css`
  (`--glass-material-rim`) keyed to engage from `--siri-island-t > 0`.
- **The content morph** (R4): each form's content is a non-scaled layer under an `overflow: clip`
  aperture, cross-faded on `--siri-island-t`. `useLiquidFlex` provides the counter-scale where a single
  laid-out layer must un-distort (the reciprocal `scale: s, 1/s`, the existing shape) — but the primary
  content-swap is the per-form crossfade.
- **The material** composes `.glass-capsule` (the warm "Search" pill rest) + `glass/deep.css` (the
  `--glass-depth` thick refractive answer/panel tier) + `glass/rim.css` (the specular silhouette rim).
  The `listening` state re-points `--glass-capsule-fill → var(--siri-island-listen-fill)` (R6, the
  obsidian hook). The warm asymmetric under-glow is a `--glass-accent` rim tint (the per-instance
  W-GLASS-ACCENT chromatic axis, one-line) toward a warm amber + a `filter: drop-shadow` warm cast
  (the `utilities/metal.css` gold catch-light idiom) — in-gamut warm-brown (folds C-CAST-CLIP), keyed
  to `--siri-island-t` intensity, ASYMMETRIC (one edge).
- **A11y**: the answer panel is `role="status"` + `aria-live="polite"` (announces "Here's what I
  found."); the mic/voice affordance is the focusable interactive control (`aria-label`). The island is
  a SIBLING surface (it owns its own role; the dock root stays presentational). PRM → `seatSync()`
  (synchronous nextTick-bounded seat at `to`, no rAF window — the fission PRM precedent) = a calm static
  island + instant descend.

### The backdrop dim + deepening read-through (`--siri-island-t`-coupled, R5)

- A fixed full-viewport scrim layer whose `filter: blur(calc(var(--siri-island-t) * Npx))` (OWN pixels,
  smooth on both engines) + `background-color: color-mix(in srgb, var(--background)
  calc(var(--siri-island-t) * Dim%), transparent)` (the A5-1 house alpha-derivative) DEEPEN as the
  island pulls down. TWO modes: GLOBAL (the "Search or Ask" focal case — a `showModal()` dialog so the
  modal-scrim `::backdrop` seam owns the whole-backdrop dim + native focus-trap) and LOCAL (the
  over-content results case — a non-modal scrim darkening only behind the panel). This is the
  triumvirate's one genuinely net-new CSS; everything else is composition. The discrete-tier
  `--glass-depth` is reused for the panel's static thick refraction (a static substitution, NOT the
  animated ramp).

### The waveform (`<SiriWaveform>` + `useSiriWaveform`, WebGL2-only — R3)

- Born on `useWebGLCanvas` (`createCanvasLifecycle`). ONE GLSL fullscreen-fragment pass
  (`siri-waveform.glsl.ts`): a horizontal Gaussian-cored light-bar + a chromatic spread along X (the
  warm prismatic fan, in-shader OKLCh shorter-hue arc splicing `procedural-color.glsl.ts`, R7) + a
  vertical bloom (the lens-flare/caustic). One `uMode` uniform = `streak` (island-internal) | `rim`
  (the rich-form degrade) — ONE shader, a DATA axis.
- **Amplitude** is a push-API `level(0..1)` the host feeds per-frame via `tick(deltaMs)` from INSIDE
  the renderer's frame loop (the `usePointerVelocityField` shape — NO own rAF, NO `AudioContext`/
  `getUserMedia` dep; grep-confirmed clean at HEAD). Brighten + saturate + chromatic-spread scale off
  `level`. The library default is a synthetic idle drift; the consumer wires its own audio level
  (presets-in-consumers). PRM → `tick(0)` freeze (a single cached `matchMedia` listener) = one calm
  static frame.
- HOSTED inside the island (the island provides the rect + the listen/respond state; the waveform
  paints the glow). The two waves compose: ISLAND = the glass surface + morph, WAVEFORM = the GPU glow
  it hosts. WCAG-2.2.2 pause is reachable by all users (the `DockBackgroundToggle` `v-model:paused`
  precedent on the substrate's `pause()`/`resume()`).
- **One-GL-context-per-route budget** (R, binding): the island itself takes ZERO GL; the waveform is the
  route's one context. On a route already running a viz, the waveform IS the only live context (the wire
  must not stack two).

### The dock wire (`BG.W-SIRI-DOCK-INTEGRATION`)

- The "Search or Ask" pill IS the island's REST form + the dock's voice/search affordance. It composes
  the EXISTING `useDockSearch` (which already composes `useFuzzySearch` + `useVirtualSectionWindow` +
  the pluggable `onSearch(query, signal)`) — ONE search pipeline, no second matcher. The island mounts
  off the `GlassDock` `#rail` / `.glass-dock-frame` non-clipping sibling escape (`position: absolute`),
  box-inviolate (`deltaW = deltaH = 0` — the island feeds ZERO size into the dock's intrinsic box, the
  fission discipline). It shares `--spring-dock` + `.glass-capsule`, never editing
  `dockMorphContext`/`dockMorphMeasure`/`useDockSpring` internals (the `useDockSearch:16-20`
  consuming-seam fence). The island IS the grown dock-search pill (identity relation), not a new
  component bolted on. Replaces the demo's cloned "Dynamic Island Call" fission demo (folds P-audit F5).

---

## FILES TOUCHED

**NEW — `src/components/custom/siri-island/`** (colocation dir, OFF the root barrel — the
focal-overlay/BorderProgress posture):
- `SiriIsland.vue`
- `composables/useSiriIsland.ts` (the morph loop — composes `useDockSpring` + `useLiquidReveal`, ≤500L)
- `constants.ts` (`SIRI_FORMS` √φ-ladder descriptors, `SiriIslandForm`/`SiriIslandState`/`SiriForm`,
  `WARM_IDENTITY_*` defaults)
- `index.ts` (named exports)
- `README.md`

**NEW — `src/components/custom/siri-waveform/`**:
- `SiriWaveform.vue`
- `composables/useSiriWaveform.ts` (composes `useWebGLCanvas`; the push-API `level(0..1)` feed)
- `shaders/siri-waveform.glsl.ts` (ONE shader, splices `procedural-color.glsl.ts`; **no `.wgsl.ts`** —
  R3)
- `constants.ts` (the warm anchor-stop set, `SiriWaveformMode`)
- `index.ts`, `README.md`

**NEW — styles / tokens:**
- `src/styles/siri-island.css` (the form/dim/under-glow recipe over the glass ladder; the descend
  scrim + the two dim modes)
- `src/styles/tokens/property-regs.css §18` — register `@property --siri-island-t <number>` (R8)
- `src/styles/tokens.css §SIRI` — the `--siri-island-*` warm-luminous token family
  (`--siri-island-listen-fill` obsidian hook default warm-deep; the under-glow + dim knobs;
  library default = warm-cream/brand-warm; exact Siri spectrum = preset-in-consumer)

**NEW — publication / gates / π:**
- `src/subpaths/siri-island.ts`, `src/subpaths/siri-waveform.ts` (glob-resolved by `vite.library.ts`)
- `package.json` exports entries (`proof:subpath-enumeration` enrollment) + `profile:budget` BUDGETS
  rows (size like `fourier-field.js` gzip ≈14k — WebGL2-only is lighter than `goo-blob.js`)
- `src/api/index.ts` — type publication (`SiriIslandProps`/`SiriIslandForm`/`SiriIslandState`/
  `SiriWaveformProps`/`SiriWaveformMode`)
- `scripts/proof-siri-island.mjs`, `scripts/proof-siri-waveform.mjs`,
  `scripts/proof-siri-dock-integration.mjs` + rows in `scripts/gates.mjs` (`tags:["local","ci"]`,
  born-RED→GREEN, self-test bites)
- `tests-visual/siri-island.spec.ts`, `tests-visual/siri-waveform.spec.ts` (enrolled by the
  `pi-runner-manifest` AND added to the webkit project `testMatch` array — R9)
- `docs/tranches/BG/audit/bg-gestalt-roster.md` — island + waveform rows (the binding fresh-capture
  verdict, both engines, both modes)

**NEW — demo:**
- `demo/stories/.../siri-island.vue` (the real-primitive demo replacing the cloned "Dynamic Island
  Call"; over a `<DockStage>` live backdrop) — the demo exerciser, no demo-local re-fork.

**CONSUMED (never edited):** `useDockSpring` (WS2), `useDockFission` loop shape, `useLiquidReveal`,
`useLiquidFlex`, `useDockSearch`/`useFuzzySearch`, `.glass-capsule`, `glass/{deep,rim,material,
adaptive-legibility}.css`, the `dialog.glass-top-layer::backdrop` modal-scrim seam, `useWebGLCanvas`,
`procedural-color.glsl.ts`, `spectrum-walk.ts`/`/color` (CPU anchor stops only), the
`usePointerVelocityField` push-API model, `GlassDock` `#rail`/`.glass-dock-frame` escape,
`DockBackgroundToggle` (the WCAG-2.2.2 pause precedent).

---

## THE WAVE BREAKDOWN

The four candidate waves are FIXED in the convergence config. The KISS-DRY agent argued to FOLD
`W-GLASS-BLUR-ENGAGE` into the island. The reconcile: it stays its OWN wave but is SCOPED to the
genuinely-net-new bit (the descend-coupled scrim + the two dim modes) and lands FIRST — it is the
descend's prerequisite, AND its `--siri-island-t`-coupled blur-engage scrim is the ≥2-consumer
primitive the drawer detent-glass (T6) also needs.

### BG.W-GLASS-BLUR-ENGAGE (lands FIRST within WS6)
The genuinely-unbuilt scalar: a `--siri-island-t`-coupled descend scrim — `filter: blur()` on the
scrim's OWN pixels (Safari-safe, R5) + the two dim modes (GLOBAL via the modal-scrim `::backdrop`,
LOCAL via a non-modal panel scrim). Engine-honest by construction (NO animated `backdrop-filter` via a
custom property). CLS-safe (a fixed full-viewport layer, never an animated layout property). Folds
firstprinciples F4-T9. Born-RED. `proof:glass-blur-engage` (the OWN-pixels-not-backdrop-filter clause +
the A5-1 color-mix dim clause + the two-mode clause + a self-test bite). Its π is folded into the island
descend π (the read-through deepens on BOTH engines).

### BG.W-SIRI-ISLAND
The morph surface (the four-forms-on-one-scalar morph composing `useDockSpring` + `useLiquidReveal`;
the clip-aperture + per-form content crossfade; the `.glass-capsule`/deep/rim material + the obsidian
listen hook + the warm under-glow; the √φ form ladder; `role=status` aria-live; PRM-sync-seat). Box
INVIOLATE beside the dock. `proof:siri-island`:
- S1 the morph rides ONE `--siri-island-t` on `--spring-dock` / NO `new SpringProgress` (composes
  `useDockSpring`); the descend composes `useLiquidReveal` (not the dead `useLiquidMorph`).
- S2 the four forms are DATA (`SIRI_FORMS` descriptors), not four code paths; the √φ ladder.
- S3 the content morph is clip-aperture + crossfade (NO box-scale on content); `proof:no-layout-animation`
  holds (radius/transform only, no reflow-set lerp).
- S4 composes `.glass-capsule`/`deep`/`rim`, no re-author; the obsidian listen-fill is a NAMED
  `--glass-capsule-fill` re-point (not warm-cream); the warm under-glow is `--glass-accent` +
  drop-shadow, asymmetric + in-gamut.
- S5 `--siri-island-t` registered in §18 (not a bare var); the `--siri-island-*` namespace (no
  `--island-t` collision).
- S6 PRM-sync-seat + compositor-only + Safari-native (no SVG goo / no WebGL / no `backdrop-filter:url`
  on the island).
- + a self-test bite per clause.

`tests-visual/siri-island.spec.ts` (the descend FLIP / deepening read-through-on-BOTH-engines /
four-form morph on the ONE scalar / aria-live answer / PRM static+instant; LOCAL, BOTH engines, both
modes) + the `proof:ba/bg-gestalt` island verdict (fresh capture).

### BG.W-SIRI-WAVEFORM (WebGL2-only — R3)
ONE GLSL fullscreen pass on `useWebGLCanvas`; the warm prismatic lens-flare; the in-shader
`procedural-color.glsl.ts` arc; the push-API `level(0..1)`; the `streak`/`rim` mode axis; PRM-freeze.
`proof:siri-waveform`:
- W1 colocation + composes `useWebGLCanvas` (not `navigator.gpu` direct); **NO `.wgsl.ts`** (the WS5
  WebGL2-only doctrine — a `siri-waveform.wgsl.ts` file REDs); NOT enrolled in
  `proof:gpu-substrate-single`.
- W2 the color source is the in-shader `procedural-color.glsl.ts` arc; the CPU anchor-stops ride
  `/color` (no re-rolled color math, `proof:single-color-core` holds).
- W3 the push-API `level(0..1)` / NO own rAF / NO `AudioContext`/`getUserMedia` dep (grep-clean).
- W4 the warm-identity default + presets-in-consumers fence (no cool-blue library literal —
  `proof:teal-navy-purge` aligned).
- W5 PRM tick(0)-freeze (single cached matchMedia); the `streak`/`rim` axis is ONE shader; WCAG-2.2.2
  pause reachable.
- + a self-test bite per clause.

`tests-visual/siri-waveform.spec.ts` (the prismatic streak + warm bloom + amplitude pulse + PRM-freeze
+ rim-mode degrade; LOCAL, BOTH engines, both modes) + the `proof:ba/bg-gestalt` waveform verdict. The
falsifiable bar is arm-A real-GPU `meanLum > floor` (BC.W-PAINT-GATE req#8 — a structural-proxy ΔE-0.0
is enrollment-only and is moot here, there is no second path). The wave closes
`complete_with_misses` if the waveform does not read as the reference warm prismatic lens-flare on a
fresh capture.

### BG.W-SIRI-DOCK-INTEGRATION (lands LAST — after the two capability waves paint-verify independently)
Wires both into the dock: the "Search or Ask" pill = the dock's voice/search affordance composing the
EXISTING `useDockSearch` (ONE pipeline); the island mounts off the `#rail`/`.glass-dock-frame` escape,
box-inviolate (`deltaW=deltaH=0`); shares `--spring-dock` + `.glass-capsule`; replaces the cloned
"Dynamic Island Call" demo. `proof:siri-dock-integration`:
- D1 the search wire composes `useDockSearch` (NO second matcher/pipeline/spring).
- D2 box-inviolate (`deltaW=deltaH=0` across the descend; does NOT import-for-edit
  `dockMorphContext`/`dockMorphMeasure`/`useDockSpring`).
- D3 the webkit `testMatch` array carries both Siri specs (R9 — "both engines" enforced).
- D4 the cloned "Dynamic Island Call" demo is RETIRED onto the real primitive (no two surfaces).
- + a self-test bite per clause.

The binding π is the end-to-end frame-series over the live shell (`proof:ba/bg-gestalt` dock+island
verdict, both engines).

---

## ACCEPTANCE / REAL-PAINT π BAR (the convergence contract)

A FRESH-capture gestalt judgement the building agent did NOT author (the C-PAINT structural root —
live-π is `[local]` and never blocks the tag; source-green is FORBIDDEN, it shipped broken 3×). Both
`chromium-headless-new` (real-GPU ANGLE/Metal on the dev box) AND `webkit` projects, both modes:

**Island** — the island DESCENDS (source-rect FLIP from the top-anchor); the app reads through a
DEEPENING backdrop blur as it pulls down (**verified to deepen in BOTH engines** — the own-pixels
`filter` ramp, not the snapping `backdrop-filter`); the four forms MORPH on the ONE `--siri-island-t`
scalar on `--spring-dock` (forms are DATA, never snap; legible content at every frame — the clip-aperture
crossfade, not the box-scale crush); the answer is `aria-live`-announced; PRM → calm static + instant
descend; the listen-droplet reads as obsidian, the answer as dark-translucent with a warm specular rim +
warm asymmetric under-glow.

**Waveform** — reads as the reference warm prismatic lens-flare (prismatic streak + warm bloom +
amplitude pulse); the rim-mode degrade in the rich form; ONE shader; the ramp CONSUMES the in-shader
OKLCh arc (no re-rolled color math, no AudioContext); PRM-freeze; both modes. On WebKit it verifies the
WebGL2 GLSL path (no `navigator.gpu`); arm-A real-GPU `meanLum > floor` is the falsifiable paint bar.

**Wire** — ONE search pipeline (the island's panel surfaces `useDockSearch`); the island shares the
dock's `--spring-dock` clock + `.glass-capsule` material; box-inviolate (`deltaW=deltaH=0` beside the
dock engine).

iOS-27 halation + dark-mode: the warm under-glow + bloom read MOST prominently in dark mode (the HIG
halation aesthetic) — verified explicitly on a dark-mode capture.

---

## FOLDED DEFERRED ITEMS (the no-silent-drop ledger)

- **firstprinciples F4-T9** (the backdrop-blur-engage transition gap) → `BG.W-GLASS-BLUR-ENGAGE`
  (engine-honest own-pixels ramp; the ≥2-consumer bar met by the drawer detent-glass T6).
- **P-audit F5** (the demo's cloned "Dynamic Island Call" fission demo) → RETIRED onto the real
  `<SiriIsland>` primitive demo (`BG.W-SIRI-DOCK-INTEGRATION` D4).
- **C-CAST-CLIP** (the warm asymmetric under-glow must land in-gamut warm-brown, not the old maroon
  halo) → the island under-glow clause (S4).
- **C-SAFARI / WS7-02** (zero Safari verification at HEAD) → the webkit `testMatch` widen (R9 / D3) +
  the both-engines π bar; the standing tranche risk is discharged for the Siri surfaces at birth.
- **S-siri-frames Approach A** (the `siri-waveform.wgsl.ts` + `proof:gpu-substrate-single` ΔE-parity)
  → DROPPED per the WS5 doctrine (R3) — not silently; the rationale is recorded (KISS smell +
  unproducible cross-engine parity).
- **The S-siri-frames stale CONSUMES path** (`procedural-color.wgsl.ts` at `aurora/constants/shaders/`,
  not `glass/webgpu/`) → moot for the waveform (WebGL2-only splices `procedural-color.glsl.ts`); the
  KISS-DRY hoist of the shared color chunks to a single home is NOT WS6's scope (booked elsewhere).
- **P-audit's other proposed waves** (W-GLASS-DYNAMICS / W-CHART-FAMILY / W-DATE-CALENDAR /
  W-DS-COMPLETE / W-LIQUID-ENTRANCE-GENERAL / W-SAFARI-PARITY-GATE) → NOT WS6 (scoped to WS4/WS7).

---

## OPEN RISKS (carried into the prototypes — failure falsifies the spec)

1. **The clip-aperture + per-form content crossfade actually reads legibly at every morph frame** (R4
   — the box-scale crush is PROVEN; the replacement is unproven for a 4-content multi-form morph). The
   load-bearing unknown. → PROTOTYPE P1 (implement).
2. **The descend read-through deepens acceptably in WebKit** via the own-pixels `filter:blur` scrim (R5
   — the `backdrop-filter` snap is PROVEN; whether the own-pixels approach reads as "the app blurs"
   rather than "a foggy overlay" is the open question). → PROTOTYPE P2 (implement, both engines).
3. **The warm prismatic lens-flare reads as the f006/f033 reference on a real GPU** (the WebGL2 GLSL
   shader, both engines; the in-shader OKLCh arc produces the cyan→amber→pink fan, not a muddy
   gradient). → PROTOTYPE P3 (implement, Metal-ANGLE chromium + WebKit-WebGL2).
4. **The obsidian listen-droplet reads as near-black reflective glass via the `--glass-capsule-fill`
   re-point** without forking a new glass rung, AND the warm under-glow lands in-gamut (R6 +
   C-CAST-CLIP). → PROTOTYPE P4 (spec — a concrete CSS sketch + the resolved oklch values).
5. **The `useDockSpring` compose ordering** — WS2 is CONVERGED but the EXECUTION lands `useDockSpring`
   before WS6 builds; if WS6 build-lands first it bakes a 6th `new SpringProgress` the dock-spring
   invariant forbids. The spec mandates the ordering; the gate self-test bite locks it. (Design risk,
   not a prototype — recorded.)
6. **One-GL-context-per-route** — the waveform is a context; a route already running a viz must not
   stack two. The wire must verify the live-context count. (Integration-wave risk, recorded.)
