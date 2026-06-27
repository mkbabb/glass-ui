# BG-WS6 · Siri capabilities — CONVERGED SPEC (pass 1)

> Verified against HEAD `tranche/BG` (glass-ui 4.2.x line, 2026-06-26). Every disputed HEAD fact the
> four critiques raised was RE-CHECKED live in this pass (`useDockSpring` absence, the `useLiquidReveal`
> preset type, the `procedural-color.glsl.ts` export set + the Lab-rectangular-vs-shorter-hue
> reality, the webkit `testMatch` array, the `--glass-capsule-fill` indirection, the
> `usePointerVelocityField` push-API shape). The four prototype mechanisms are ADOPTED with their
> critique mustFix folded; the spec/comment language is RECONCILED to what the code actually does.
> This spec consumes WS2 (dock) + WS3 (glass) + WS5 (viz) settled outputs and is HARD-GATED behind
> WS2's `useDockSpring` landing.

---

## CONVERGENCE STATE (pass 1)

| Prototype | proto verdict | critique verdict | converged disposition |
|---|---|---|---|
| P1 multi-content island morph (clip-aperture + crossfade) | est 90% WORKED | **68% refine** | mechanism ADOPTED; 7 mustFix folded into S-clauses below |
| P2 descend deepening read-through (own-pixels blur) | est 88% WORKED | **72% refine** | mechanism ADOPTED; 7 mustFix folded into BLUR-ENGAGE clauses |
| P3 warm prismatic waveform (WebGL2 GLSL) | est 88% built | **62% refine** | shader ADOPTED; 6 mustFix folded (capture, warm-window, language reconcile, cyan-as-preset, substrate-wire) |
| P4 obsidian listen-droplet (`--glass-capsule-fill` re-point) | est 88% (spec) | **58% refine** | indirection thesis ADOPTED; gamut + the truncated mustFix re-derived below |

**The four prototypes are all `refine`, not `converged`.** The CENTRAL mechanisms are PROVEN
(content-as-non-scaled-sibling reads legibly; own-pixels `filter:blur` ramps smooth on BOTH engines;
the shader splices the color chunk cleanly + builds; the `--glass-capsule-fill` override needs zero
new rung). The refine verdicts are about the BINDING-π bar, the spec/code language drift, and the
WS2-ordering risk — all foldable here, none falsifying the spec. The OVERALL gate is therefore
**below 100** (pass-1 ceiling): the spec is now trustworthy + buildable, but the binding real-paint π
(the handoff-interior frames, the cross-engine waveform capture, the obsidian-droplet gestalt) is
unproduced until execution, and WS2's `useDockSpring` is not on HEAD.

---

## THE CARDINAL RECONCILES (re-verified + corrected this pass)

### R1 · The morph substrate is a UNION — but the descend FLIP runs on `--spring-dock`, NOT a `useLiquidReveal` preset (CORRECTED)

The two halves stand, but the critique's R1↔R2 contradiction is REAL and is resolved by **option (b)**:

- `LiquidRevealPreset` is `Extract<SpringPresetName, "snappy" | "bouncy">` ONLY
  (`useLiquidReveal.ts:86`, verified). `useLiquidReveal(islandRef, { preset: 'dock' })` is a **TYPE
  ERROR** — the pass-1 spec's literal was wrong.
- **RESOLUTION (b):** the descend/dismiss FLIP runs on the SAME `useDockSpring` scalar the inter-form
  morph uses (ONE spring, `--spring-dock`). `useLiquidReveal` is used ONLY for its `ElementMorph`
  source-rect GEOMETRY (the FLIP-inversion from the top-anchor rect), driven by the dock spring curve
  — NOT for a `preset` selection. The island composes `useLiquidReveal`'s `ElementMorph` +
  `springTimingFunction` substrate the SAME way `useDockCtaReceive` does (it calls the shared kf
  primitives, not the preset-gated wrapper path). We do NOT widen `LiquidRevealPreset` to add `'dock'`
  (option (a)) — that would mint a heavier public-surface change for a single internal consumer; the
  one-spring path is the KISS resolution and keeps the "`--spring-dock` descend" claim type-true.
- The inter-form morph (pill↔droplet↔stadium↔panel) = the fission one-scalar/one-rAF loop SHAPE
  harvested into `useSiriIsland`, writing ONE `--siri-island-t`. The four forms are DATA
  (`SIRI_FORMS` descriptors), not four code paths.

### R2 · NO new spring — compose `useDockSpring` (HARD-GATED behind WS2; the ordering risk is LIVE)

**Re-verified at HEAD:** `useDockSpring.ts` DOES NOT EXIST. There are **5 raw `new SpringProgress`** in
`src/components/custom/dock/composables/` (`dockMorphContext.ts:176`, `useDockItemDrag.ts:106`,
`useLayerTransition.ts:259`, `useDockOrientationMorph.ts:204`, `useDockFission.ts:484`). The pass-1
spec's claim "`useDockFission` itself now COMPOSES it" is a WS2 FUTURE state, not HEAD — `useDockFission`
imports `SpringProgress` directly (`useDockFission.ts:44`).

**Binding consequences (the OPEN-RISK #5 confirmation):**

1. `BG.W-SIRI-ISLAND` is **ORDERING-GATED behind WS2's `BG.W-DOCK-MORPH-UNIFY`** landing `useDockSpring`
   (the grep bar: exactly one `new SpringProgress` in the dock dir). The wave-dependency is recorded in
   the wave-set + the tranche dependency-order-book.
2. `proof:siri-island` carries a **born-RED self-test bite** that asserts (a) `useSiriIsland.ts`
   constructs ZERO `SpringProgress` (`grep -c "new SpringProgress" === 0`) AND (b) it imports
   `useDockSpring` from the dock composables. This bite STAYS RED until WS2 lands `useDockSpring` AND
   WS6 composes it — so a WS6-before-WS2 build CANNOT green the gate (it would bake a 6th raw
   `SpringProgress` the dock-spring invariant forbids).
3. `useSiriIsland` composes `useDockSpring` = the `DOCK_SPRING` / `--spring-dock` register (the
   ~7%-overshoot weighty register, the `--spring-dock-duration` settle clock). Interruptible re-base
   from velocity, bidirectional (descend 0→1 / dismiss 1→0), PRM-sync-seat — all inherited from the
   `useDockSpring` factory, no second integrator.

### R3 · The waveform is WebGL2-ONLY (UNCHANGED — the WS5 doctrine confirmed)

WS5 (CONVERGED) DELETED the WGSL/GLSL dual-path for every single-uniform fullscreen-fragment viz as the
KISS smell. The Siri waveform is exactly that shape. So:
- **DROP** `siri-waveform.wgsl.ts` entirely (the prototype ALREADY did this — there is no `.wgsl.ts` in
  the proto worktree; only `siri-waveform.glsl.ts`).
- **DROP** the `proof:gpu-substrate-single` ΔE-parity row — there is no second path, and WebKit's
  `navigator.gpu` is `undefined` so a cross-engine WGSL parity can never run.
- Born on **`useWebGLCanvas` directly** (`src/composables/glass/webgl/useWebGLCanvas.ts`, verified) —
  inherits offscreen-pause + live-PRM one-static-frame + consumer-DPR + WCAG-2.2.2 pause for free. ONE
  shader, one `uMode` uniform (`0=streak` | `1=rim`).

### R4 · The content-morph is CLIP-APERTURE + per-form CROSSFADE — with OVERLAPPING crossfade windows (CORRECTED)

The box-scale text-crush is PROVEN (the critique independently reproduced 5.31× chromium / 5.35× webkit
painted-glyph-height variance under non-uniform box scale). The clip-aperture replacement is PROVEN
(content as a non-scaled sibling under `overflow:clip`, only the text-less plate carries
`transform:scale()`, keeps painted glyph-box height CONSTANT 28/28/21px across the whole morph including
the 1.073 overshoot frame, in BOTH engines).

**THE CRITIQUE'S #1 MUSTFIX (load-bearing):** the pass-1 sketched crossfade windows
(`0/0.25` · `abs(t-0.5)/0.25` · `(t-0.65)/0.35`) leave **BLANK frames** — measured live, max
form-opacity = 0.0 at t≈0.25 and dips to 0.2–0.43 across t=0.65–0.80 (the island EMPTIES then refills at
each handoff). The converged windows must **CROSS-DISSOLVE** (adjacent forms OVERLAP, max-opacity ≥ ~0.9
at EVERY t including the 1.073 overshoot frame). The window math is re-specified as a clamp of two
linear ramps (NO CSS `abs()` — Safari-17.2-only Baseline-2024, a load-bearing opacity path must not
depend on it):

```
/* per-form opacity = clamp of a rising ramp (in) × a falling ramp (out),
   with the cross-over centered on each form's --siri-island-t seat so adjacent
   forms overlap at ≥0.9. NO abs(); NO blank frame. */
--form-pill-o:    clamp(0, calc((SEAT_droplet - t) / FADE), 1);          /* leading form fades out */
--form-droplet-o: min(clamp(0, (t - A)/FADE, 1), clamp(0, (B - t)/FADE, 1)); /* two ramps, no abs */
…
```
The π asserts max-opacity ≥ 0.9 at the four in-between seats (see the π bar below).

- The GLASS BOX morphs reserved size + corner-radius off `--siri-island-t` (`border-radius` is
  paint-only, NOT in the reflow set — compositor-safe).
- Each form's content lives in its OWN non-scaled layer, cross-faded behind `overflow: clip`.
- The size morph is `transform: scale()` over a RESERVED `to` footprint (one layout solve;
  `proof:no-layout-animation` reds an `inline-size`/`width`/`padding` lerp).
- **PLATE-RADIUS vs CONTENT-CLIP-RADIUS (proto SURPRISE #3 mustFix):** the proto's plate
  `border-radius` pre-divide-by-`sy` goes ELLIPTICAL and is a cosmetic approximation. The CONVERGED
  rule: the **content-clip layer owns the VISIBLE corner** (an equal-axis `border-radius` on the
  `overflow:clip` aperture, the true silhouette), and the plate's own radius is DROPPED from the
  animation (the plate sits behind the clip and never shows past it). The π asserts the plate edge is
  never visible past the content clip at any frame, both engines.
- **DRY/KISS:** read `--siri-island-t` DIRECTLY in the form rules — DROP the
  `.island { --t: var(--siri-island-t) }` alias indirection (one registered scalar, no second name).

### R5 · The descend blur is ENGINE-HONEST — own-pixels `filter:blur`, OVERSIZED, OUTCOME-asserted (CORRECTED + HARDENED)

The Safari `backdrop-filter` snap is PROVEN (the critique re-confirmed it on playwright-core webkit;
own-pixels `filter:blur` ramps smooth on BOTH engines: webkit distinct=8/10 longest-frozen-run=2,
chromium 9/10). The deepening read-through is therefore a `filter:blur()` on a scrim layer's OWN pixels,
NOT `backdrop-filter`. The four mustFix fold in:

1. **The mechanism is UNAMBIGUOUS (critique #2):** the read-through blurs a wrapper of the **REAL
   content** (`filter: blur(calc(var(--siri-island-t) * Npx))` on a `.siri-app-blur-wrap` that wraps the
   route's live content subtree) — the proto's empty `.siri-app-scrim {filter:blur}` overlay blurs
   NOTHING (no painted pixels). The dock, island, and dim-scrim siblings sit OUTSIDE the blurred
   subtree (z-stacked above it). NO clone-snapshot (the proto's passing harness used a clone, but
   blur-the-real-wrapper is the fittest form and is what ships).
2. **OVERSIZE the wrapper/scrim past the viewport (critique #1):** `inset: -24px` (or a backing fill /
   `transform: scale`) so the `filter:blur` transparent bleed lands OFF-screen — the `inset:0` recipe
   ships a dark inset-frame artifact iOS does not have (proto-verified clean at -24px). A π edge-vs-center
   luma assert at t=1 locks it.
3. **The scalar-transition is a CODING RULE, not an engine-fact (critique #3):** transition `filter`
   (and the dim `background-color`) DIRECTLY; NEVER list `--siri-island-t` in the `transition` property.
   The "both-in-list also snaps" claim is flaky; the gate asserts the OUTCOME
   (`longest-frozen-run ≤ 2` on BOTH engines — the sub-1px floor pair is legitimate, a run-of-2), not
   the mechanism.
4. **The whole-backdrop DIM** rides the modal-scrim seam (`dialog.glass-top-layer::backdrop`): animate
   `background-color` dim via `color-mix(in srgb, var(--background) Npct, transparent)` (NEVER
   `hsl(var(--background)/α)` — the A5-1 double-wrap-paints-nothing trap) while the `::backdrop`
   `backdrop-filter` stays STATIC.
5. **PRM carve (critique #4):** under `prefers-reduced-motion: reduce` the descend scrim `filter:blur`
   snaps to its endpoint with ZERO in-between frames (mirroring `reveal.css`'s vestibular floor), the
   descend is the instant `seatSync`; the dim MAY keep a short fade.
6. **own + dim STACKED is the verified default (critique #7):** the two layers composite cleanly in
   WebKit; the π runs them TOGETHER (not in isolation behind a `data-arm`).
7. **The π asserts the read-through deepens on BOTH engines** (a Chrome-only smooth-`backdrop-filter`
   assert IS the headless-green/visually-broken trap, 4th occurrence).
8. **REAL-ROUTE PERF (critique #6):** a full-viewport `filter:blur(12px)` over the app subtree per
   descend frame is a compositor re-raster proven only on a 440×520 toy. The wave captures/budgets it on
   a CONTENT-DENSE route at 2dppx (a `will-change: filter` / layer hint may be needed) before the
   descend is claimed performant.

### R6 · The obsidian listen-droplet is a NAMED `--glass-capsule-fill` re-point (CONFIRMED + gamut-anchored)

`.glass-capsule` is warm-cream; the listen-droplet reference (`waveform-f006`/`f027`) is near-BLACK
highly-reflective glass. The `--glass-capsule-fill` indirection IS a full `var()` override of the
`background:` shorthand's first arg (`glass-capsule.css:56-57`, verified) — a near-black obsidian read
needs ZERO new rung. So:
- The `listening` state re-points `--glass-capsule-fill → var(--siri-island-listen-fill)` on the island
  scope + LIFTS the specular rim (`glass/rim.css`).
- The library ships `--siri-island-listen-fill` defaulting to a **warm-deep** value (the
  warm-cream/brand-warm identity floor — NOT cool-black). The exact Siri obsidian is a PRESET in the
  consumer.
- The warm asymmetric under-glow is a `--glass-accent` rim tint (the per-instance W-GLASS-ACCENT axis)
  toward a warm amber + a `filter: drop-shadow` warm cast (the `utilities/metal.css` gold-catch-light
  idiom) — **in-gamut warm-brown** (folds C-CAST-CLIP; no maroon halo clip), keyed to `--siri-island-t`
  intensity, ASYMMETRIC (one edge). The resolved oklch values are computed at build (the proto's gamut
  math is sound); a π asserts the under-glow stays in sRGB gamut (no channel clip).

### R7 · The color source is the in-shader `procedural-color.glsl.ts` ramp — the LANGUAGE is CORRECTED to OKLab-RECTANGULAR (CORRECTED)

**Re-verified:** `procedural-color.glsl.ts` exports `OETF_GLSL`, `OKLCH_MATRICES_GLSL`,
`PALETTE_RAMP_GLSL` with `samplePaletteRamp(a, b, tRaw, huePath)`, `mixPaletteOklab(linA, linB, t)`
(Lab-RECTANGULAR), `interpolateHueTurns(h0, h1, t, method)`, `linearToSrgb`. The prototype shader calls
`samplePaletteRamp(…, 0)` — `huePath 0` → `mixPaletteOklab` (Lab-rectangular, chroma-holding straight
line). It NEVER calls `interpolateHueTurns` (the shorter-hue arc).

**The CORRECTION (critique P3 #3):** the wave spec + the shader header + the gate clause say
**"OKLab-RECTANGULAR chroma-holding mix"** (huePath 0), NOT "OKLCh shorter-hue arc". The proto header's
"the arc … walks OKLCh shorter-hue (huePath 0)" line is internally contradictory and is rewritten. The
DRY claim STANDS: the shader splices the EXISTING chunk (no re-rolled Ottosson math,
`proof:single-color-core` holds). `proof:siri-waveform` W2 asserts what is TRUE: the chunk is spliced +
`samplePaletteRamp` is consumed — NOT "the hue arc walks shorter-hue".

- CPU computes the warm amber→orange→pink ANCHOR stops via the `/color` leaf (`cssToOklch`); the shader
  does the rectangular ramp in-fragment. The CPU anchor-stop derivation rides `spectrum-walk` ONLY where
  a consumer passes concrete `#hex` anchors (the BC.W-AX-BP-LAZY value.js-lazy boundary — the default
  warm anchors are a static value.js-free constant).

### R7b · The cyan core is a CONSUMER PRESET; the library default is warm-white (NEW — critique P3 #4)

The reference hot core reads cyan→white (`f027`/`f033`). The library default core is **warm-white**
(rgb ≈ 250,248,244, ZERO cyan) by the warm-cream-identity floor + the `proof:teal-navy-purge` fence.
The exact reference cyan→white core is a CONSUMER PRESET (the `uStopCore` uniform — the consumer passes
a cyan-leaning core anchor). The `bg-gestalt-roster` waveform row MUST STATE the library default does
NOT read cyan, so a fresh-capture judge measuring against `f033` accepts a warm-white core. The
cyan-as-preset path is sanctioned; the gate's `proof:teal-navy-purge` alignment is made REAL by adding
`siri-waveform/constants.ts` to the gate's `VIZ_CONSTANTS` array (the pass-1 "teal-navy-purge aligned"
was vacuous — the file is not yet in the array). The warm-window asymmetry is corrected (R7c).

### R7c · The warm half must be the DOMINANT/lit half (NEW — critique P3 #2)

The proto's `along = cos(x*PI - coreX*PI)` window zeroes the amber edge and keeps the pink edge lit —
BACKWARDS vs the reference (`f027`/`f033`: the warm amber/orange band is WIDER + brighter, the pink
fringe tighter). The CONVERGED shader re-centers/widens the window on the WARM side (a `coreX`-anchored
window with a LONGER warm-side falloff), then re-captures to confirm amber/orange read wider + brighter
than the pink fringe. This is the cause of the "brownish muted warm tail", not stop chroma.

### R8 · The `--siri-island-t` namespace is MANDATORY (CONFIRMED — live collision)

**Re-verified:** `--island-t`/`--island-dx`/`--island-dy`/`--neck-t` live in `dock.css`,
`motion/morph-field.css`, `glass/liquid-morph.css`, `dock/fission-bridge.css`. The Siri island MUST
namespace `--siri-island-*` and register `@property --siri-island-t <number>` in `property-regs.css §18`
(verified: §18 already hosts `--border-progress-fill`, `--dock-morph-t`, the seal motion tokens; a bare
unregistered `var()` SNAPS instead of interpolating). The §18 block carries the registration beside the
existing morph scalars.

### R9 · Both engines verified — WIDEN the webkit `testMatch` (CONFIRMED — structural gap)

**Re-verified:** `tests-visual/playwright.config.ts:118` — the webkit project's `testMatch` is a literal
allowlist array, so `siri-island.spec.ts` + `siri-waveform.spec.ts` would NOT run on WebKit unless
explicitly enrolled. The wave ADDS both to the array (`proof:siri-dock-integration` D3 asserts it). The
WGSL primary can never run on WebKit (no `navigator.gpu`) — moot, the waveform is WebGL2-only; the
island is compositor-only + Safari-native (no SVG goo, no WebGL, no `backdrop-filter:url` on the ISLAND
itself; the waveform is the GPU layer it HOSTS).

### R10 · PRESERVE the reference frames (NEW — critique P1 #5, the gestalt-bar prerequisite)

The reference frames (`scratchpad/evidence/frames-2144`, `frames-2207`, the crops
`waveform-f006`/`island-descend-f008`/`answer-f012`/`f027`/`f033`) are GONE from disk (re-verified — only
`docs/tranches/BG/audit/S-siri-frames.md` survives, the prose log). The gestalt-on-fresh-capture bar
has no version-controlled reference. **`BG.W-SIRI-ISLAND` (lands first of the two capability waves)
re-archives the binding crops** under the gitignore visual-evidence protocol
(`docs/tranches/BG/audit/visual/siri-reference/`) so both the builder AND the gate compare to the actual
reference frames, not `S-siri-frames.md` prose alone. The frame-log in `S-siri-frames.md` is the
authoritative SOURCE for re-capture (the recordings' frame indices are named there).

---

## MECHANISM (the idiomatic approach, concrete — corrections folded)

### The island surface (`<SiriIsland>` + `useSiriIsland`)

```
useSiriIsland(islandRef, {
  state,          // 'idle' | 'listening' | 'responding' | 'dismissing'
  form,           // 'pill' | 'droplet' | 'stadium' | 'panel'  (DATA index into SIRI_FORMS)
  anchorRect,     // the Dynamic-Island top-anchor rect (the descend origin)
}) => { t, descend(), dismiss(), seatSync() }
```

- **The morph loop** clones the fission shape but composes **`useDockSpring`** (R2 — NOT a raw
  `SpringProgress`): one spring on `--spring-dock`, interruptible re-base from velocity, bidirectional,
  writing ONE `--siri-island-t` (registered `@property <number>`, R8) once/frame. The four forms are a
  `SIRI_FORMS: Record<SiriForm, SiriIslandForm>` map (R1) — `{ radiusFrac, w, h }` on a **√φ ladder**
  (each form steps by `√φ ≈ 1.272` from the pill base — proportioned, not four magic numbers). The box
  reserves the active form's `to` footprint (one layout solve); `transform: scale()` over it drives the
  visible size; `border-radius` interpolates `f(--siri-island-t)` on the **content-clip layer** (R4 —
  the visible-corner owner).
- **The descend** is `useLiquidReveal`'s `ElementMorph` source-rect GEOMETRY driven by the
  `useDockSpring` curve (R1 option b — NOT a `preset:'dock'` arg; that is a type error). `transform-origin`
  at the DI top-anchor, the 3 coupled channels (transform/opacity/`filter:blur→0`). The warm specular
  rim is lit during travel (`island-descend-f008`) — composes `glass/rim.css` (`--glass-material-rim`)
  keyed to engage from `--siri-island-t > 0`.
- **The content morph** (R4): each form's content is a non-scaled layer under an `overflow: clip`
  aperture, cross-faded on `--siri-island-t` with OVERLAPPING windows (max-opacity ≥ 0.9 at every seat,
  NO `abs()`, NO blank frame). `useLiquidFlex` provides the counter-scale where a single laid-out layer
  must un-distort; the primary content-swap is the per-form crossfade. Read `--siri-island-t` DIRECTLY
  (no `--t` alias).
- **The material** composes `.glass-capsule` (warm "Search" pill rest) + `glass/deep.css`
  (`--glass-depth` thick refractive answer/panel tier) + `glass/rim.css` (the specular silhouette rim).
  The `listening` state re-points `--glass-capsule-fill → var(--siri-island-listen-fill)` (R6). The warm
  asymmetric under-glow is a `--glass-accent` rim tint toward warm amber + a `filter: drop-shadow` warm
  cast (in-gamut warm-brown, C-CAST-CLIP), keyed to `--siri-island-t`, ASYMMETRIC.
- **A11y**: the answer panel is `role="status"` + `aria-live="polite"` (announces "Here's what I
  found."); the mic/voice affordance is the focusable interactive control (`aria-label`). The island is
  a SIBLING surface (owns its own role; the dock root stays presentational). PRM → `seatSync()`
  (synchronous nextTick-bounded seat at `to`, the fission PRM precedent) = a calm static island +
  instant descend.

### The backdrop dim + deepening read-through (`--siri-island-t`-coupled, R5)

A fixed full-viewport **content-wrapper** whose `filter: blur(calc(var(--siri-island-t) * Npx))` blurs
the REAL route content (own pixels, smooth on both engines), OVERSIZED `inset:-24px` (the off-screen
bleed), + a separate dim scrim `background-color: color-mix(in srgb, var(--background) calc(var(--siri-island-t)
* Dim%), transparent)`. TWO modes: GLOBAL (the "Search or Ask" focal case — a `showModal()` dialog so
the modal-scrim `::backdrop` seam owns the whole-backdrop dim + native focus-trap) and LOCAL (the
over-content results case — a non-modal scrim darkening only behind the panel). Transition `filter` +
`background-color` DIRECTLY (never `--siri-island-t` in the transition list). This is the triumvirate's
one genuinely net-new CSS. The discrete-tier `--glass-depth` is reused for the panel's static thick
refraction (a static substitution, NOT the animated ramp).

### The waveform (`<SiriWaveform>` + `useSiriWaveform`, WebGL2-only — R3)

- Born on **`useWebGLCanvas`** (`createCanvasLifecycle`) — the substrate is WIRED (critique P3 #5: the
  bare-context harness proves only the shader; the wave wires the lifecycle leaf, the push-API, the
  PRM-freeze, the WCAG pause). ONE GLSL fullscreen-fragment pass (`siri-waveform.glsl.ts`): a horizontal
  Gaussian-cored light-bar + a chromatic spread along X (the WARM-DOMINANT prismatic fan, R7c) + a
  vertical bloom (the lens-flare caustic). In-shader OKLab-RECTANGULAR ramp splicing
  `procedural-color.glsl.ts` (R7). One `uMode` = `0=streak` (island-internal) | `1=rim` (rich-form
  degrade) — ONE shader, a DATA axis.
- **Amplitude** is a push-API `level(0..1)` fed per-frame via `tick(deltaMs)` from INSIDE the renderer's
  frame loop (the `usePointerVelocityField` shape — NO own rAF, NO `AudioContext`/`getUserMedia` dep;
  grep-confirmed clean). Brighten + saturate + chromatic-spread scale off `level`. Library default is a
  synthetic idle drift; the consumer wires its own audio level. PRM → `tick(0)` freeze (a single cached
  `matchMedia` listener) = one calm static frame.
- The warm anchor stops live in `constants.ts` as a value.js-FREE static constant (NOT inline shader
  comments — critique P3 #6); the library default core is warm-white (R7b), the cyan core a consumer
  preset.
- HOSTED inside the island. WCAG-2.2.2 pause reachable by all users (`DockBackgroundToggle`
  `v-model:paused` precedent on the substrate's `pause()`/`resume()`).
- **One-GL-context-per-route budget:** the island takes ZERO GL; the waveform is the route's one
  context. On a route already running a viz, the waveform IS the only live context (the wire must not
  stack two).

### The dock wire (`BG.W-SIRI-DOCK-INTEGRATION`)

- The "Search or Ask" pill IS the island's REST form + the dock's voice/search affordance. It composes
  the EXISTING `useDockSearch` (verified at `useDockSearch.ts` — already composes `useFuzzySearch` +
  `useVirtualSectionWindow` + the pluggable `onSearch(query, signal)`) — ONE search pipeline, no second
  matcher. The island mounts off the `GlassDock` `#rail` / `.glass-dock-frame` non-clipping sibling
  escape (`position: absolute`), box-inviolate (`deltaW = deltaH = 0`). Shares `--spring-dock` +
  `.glass-capsule`, never editing `dockMorphContext`/`dockMorphMeasure`/`useDockSpring` internals. The
  island IS the grown dock-search pill (identity relation), not a new component bolted on. Replaces the
  demo's cloned "Dynamic Island Call" fission demo (folds P-audit F5).

---

## FILES TOUCHED

**NEW — `src/components/custom/siri-island/`** (colocation dir, OFF the root barrel):
- `SiriIsland.vue`
- `composables/useSiriIsland.ts` (the morph loop — composes `useDockSpring` + `useLiquidReveal`'s
  `ElementMorph`, ≤500L; ZERO `new SpringProgress`)
- `constants.ts` (`SIRI_FORMS` √φ-ladder descriptors, `SiriIslandForm`/`SiriIslandState`/`SiriForm`,
  `WARM_IDENTITY_*` defaults)
- `index.ts`, `README.md`

**NEW — `src/components/custom/siri-waveform/`**:
- `SiriWaveform.vue`
- `composables/useSiriWaveform.ts` (composes `useWebGLCanvas`; the push-API `level(0..1)` feed)
- `shaders/siri-waveform.glsl.ts` (ONE shader, splices `procedural-color.glsl.ts`; **NO `.wgsl.ts`** —
  R3; header language CORRECTED to OKLab-rectangular — R7)
- `constants.ts` (the warm anchor-stop set as a value.js-free static constant, `SiriWaveformMode`)
- `index.ts`, `README.md`

**NEW — styles / tokens:**
- `src/styles/siri-island.css` (the form/dim/under-glow recipe over the glass ladder; the descend
  own-pixels-blur scrim + the two dim modes; OVERSIZED scrim; no-`abs()` crossfade windows)
- `src/styles/tokens/property-regs.css §18` — register `@property --siri-island-t <number>` (R8)
- `src/styles/tokens.css §SIRI` — the `--siri-island-*` warm-luminous token family
  (`--siri-island-listen-fill` obsidian hook default warm-deep; under-glow + dim knobs; library default
  = warm-cream/brand-warm; exact Siri spectrum + cyan core = preset-in-consumer)

**NEW — publication / gates / π:**
- `src/subpaths/siri-island.ts`, `src/subpaths/siri-waveform.ts` (glob-resolved by `vite.library.ts`)
- `package.json` exports entries (`proof:subpath-enumeration` enrollment) + `profile:budget` BUDGETS rows
- `src/api/index.ts` — type publication (`SiriIslandProps`/`SiriIslandForm`/`SiriIslandState`/
  `SiriWaveformProps`/`SiriWaveformMode`)
- `scripts/proof-siri-island.mjs`, `scripts/proof-siri-waveform.mjs`,
  `scripts/proof-glass-blur-engage.mjs`, `scripts/proof-siri-dock-integration.mjs` + rows in
  `scripts/gates.mjs` (`tags:["local","ci"]`, born-RED→GREEN, self-test bites)
- `scripts/proof-teal-navy-purge.mjs` — ADD `siri-waveform/constants.ts` to `VIZ_CONSTANTS` (R7b — make
  the warm-identity alignment REAL, not vacuous)
- `tests-visual/playwright.config.ts:118` — ADD `siri-island.spec.ts` + `siri-waveform.spec.ts` to the
  webkit `testMatch` array (R9)
- `tests-visual/siri-island.spec.ts`, `tests-visual/siri-waveform.spec.ts` (enrolled by the
  `pi-runner-manifest`)
- `docs/tranches/BG/audit/visual/siri-reference/` — the re-archived reference crops (R10)
- `docs/tranches/BG/audit/bg-gestalt-roster.md` — island + waveform rows (the binding fresh-capture
  verdict, both engines, both modes; the waveform row STATES the library default is warm-white-core)

**NEW — demo:**
- `demo/stories/.../siri-island.vue` (the real-primitive demo replacing the cloned "Dynamic Island
  Call"; over a `<DockStage>` live backdrop)

**CONSUMED (never edited):** `useDockSpring` (WS2 — HARD dependency), `useDockFission` loop shape,
`useLiquidReveal` (`ElementMorph` geometry), `useLiquidFlex`, `useDockSearch`/`useFuzzySearch`,
`.glass-capsule`, `glass/{deep,rim,material,adaptive-legibility}.css`, the
`dialog.glass-top-layer::backdrop` modal-scrim seam, `useWebGLCanvas`, `procedural-color.glsl.ts`,
`spectrum-walk.ts`/`/color` (CPU anchor stops only), the `usePointerVelocityField` push-API model,
`GlassDock` `#rail`/`.glass-dock-frame` escape, `DockBackgroundToggle`.

---

## THE WAVE BREAKDOWN

The four candidate waves are FIXED. Order within WS6: `W-GLASS-BLUR-ENGAGE` FIRST (the descend
prerequisite), then `W-SIRI-ISLAND` (gated behind WS2's `useDockSpring`), then `W-SIRI-WAVEFORM` (the
two capability waves paint-verify independently), then `W-SIRI-DOCK-INTEGRATION` LAST.

### BG.W-GLASS-BLUR-ENGAGE (lands FIRST within WS6)

The genuinely-unbuilt scalar: a `--siri-island-t`-coupled descend scrim — `filter: blur()` on a wrapper
of the REAL content's OWN pixels (Safari-safe, R5), OVERSIZED `inset:-24px` (off-screen bleed) + the two
dim modes (GLOBAL via the modal-scrim `::backdrop`, LOCAL via a non-modal panel scrim). Engine-honest by
construction (NO animated `backdrop-filter`; NO `--siri-island-t` in the transition list — transition
`filter`/`background-color` directly). CLS-safe (a fixed full-viewport layer). PRM carve (snap to
endpoint, zero in-between frames). Folds firstprinciples F4-T9. The ≥2-consumer bar is met by the drawer
detent-glass (T6). Born-RED.

`proof:glass-blur-engage`:
- E1 the read-through is `filter:blur` on a real-content wrapper's OWN pixels — NOT `backdrop-filter`,
  NOT an empty overlay (the no-painted-pixels self-test bite).
- E2 the scrim is OVERSIZED past the viewport (`inset` negative / backing fill) — the inset-frame
  artifact self-test bite.
- E3 the dim reads the A5-1 `color-mix(in srgb …)` form — the `hsl(var()/α)` double-wrap self-test bite.
- E4 two modes (GLOBAL `::backdrop` + LOCAL panel scrim).
- E5 the PRM carve (snap-to-endpoint) + the transition-property excludes `--siri-island-t`.
- + a self-test bite per clause.

π folded into the island descend π (the read-through deepens on BOTH engines — `longest-frozen-run ≤ 2`
chromium AND webkit; the t=1 edge-vs-center luma; own+dim STACKED; the content-dense-route 2dppx perf
capture).

### BG.W-SIRI-ISLAND (ORDERING-GATED behind WS2's `useDockSpring`)

The morph surface (the four-forms-on-one-scalar morph composing `useDockSpring` + `useLiquidReveal`'s
`ElementMorph`; the clip-aperture + per-form OVERLAPPING content crossfade; the `.glass-capsule`/deep/rim
material + the obsidian listen hook + the warm under-glow; the √φ form ladder; `role=status` aria-live;
PRM-sync-seat). Box INVIOLATE beside the dock. Re-archives the reference crops (R10).

`proof:siri-island`:
- S1 the morph rides ONE `--siri-island-t` on `--spring-dock` / **ZERO `new SpringProgress` in
  `useSiriIsland.ts` AND it imports `useDockSpring`** (the born-RED WS2-ordering bite — stays RED until
  WS2 lands `useDockSpring` AND WS6 composes it); the descend composes `useLiquidReveal`'s `ElementMorph`
  geometry (NOT a `preset:'dock'` arg — type-true; NOT the dead `useLiquidMorph`).
- S2 the four forms are DATA (`SIRI_FORMS` descriptors), not four code paths; the √φ ladder.
- S3 the content morph is clip-aperture + OVERLAPPING crossfade (NO box-scale on content; NO blank
  frame — max-opacity ≥ 0.9 at every seat; NO CSS `abs()`); the content-clip layer owns the visible
  corner (no elliptical plate radius); `proof:no-layout-animation` holds (radius/transform only).
- S4 composes `.glass-capsule`/`deep`/`rim`, no re-author; the obsidian listen-fill is a NAMED
  `--glass-capsule-fill` re-point (default warm-deep, not cool-black); the warm under-glow is
  `--glass-accent` + drop-shadow, asymmetric + in-gamut (no clip).
- S5 `--siri-island-t` registered in §18 (not a bare var); the `--siri-island-*` namespace (no
  `--island-t` collision); read directly (no `--t` alias).
- S6 PRM-sync-seat + compositor-only + Safari-native (no SVG goo / no WebGL / no `backdrop-filter:url`
  on the island).
- S7 the reference crops re-archived on disk under `docs/tranches/BG/audit/visual/siri-reference/` (the
  gestalt-bar prerequisite, R10).
- + a self-test bite per clause.

`tests-visual/siri-island.spec.ts` (the descend FLIP / deepening read-through-on-BOTH-engines /
four-form morph on the ONE scalar / **the morph-INTERIOR frames at t=0.25/0.5/0.65/0.75 read a single
legible form with NO blank flash, PAINTED-PIXEL not getBoundingClientRect** / aria-live answer / PRM
static+instant; LOCAL, BOTH engines [webkit testMatch-enrolled], both modes) + the `proof:bg-gestalt`
island verdict (fresh capture vs the re-archived reference).

### BG.W-SIRI-WAVEFORM (WebGL2-only — R3)

ONE GLSL fullscreen pass on `useWebGLCanvas`; the WARM-DOMINANT prismatic lens-flare; the in-shader
OKLab-rectangular `procedural-color.glsl.ts` ramp; the push-API `level(0..1)`; the `streak`/`rim` mode
axis; PRM-freeze.

`proof:siri-waveform`:
- W1 colocation + composes `useWebGLCanvas` (the WIRED substrate, not `navigator.gpu` direct, not a
  bare-context); **NO `.wgsl.ts`** (a `siri-waveform.wgsl.ts` REDs); NOT enrolled in
  `proof:gpu-substrate-single`.
- W2 the color source is the in-shader `procedural-color.glsl.ts` ramp — the chunk is SPLICED +
  `samplePaletteRamp` consumed (the language is OKLab-RECTANGULAR huePath-0, NOT "shorter-hue arc"); the
  CPU anchor-stops ride `/color` (no re-rolled color math, `proof:single-color-core` holds).
- W3 the push-API `level(0..1)` / NO own rAF / NO `AudioContext`/`getUserMedia` dep (grep-clean).
- W4 the warm-identity default (warm-white core, R7b) + presets-in-consumers fence — `siri-waveform/
  constants.ts` is IN the `proof:teal-navy-purge` `VIZ_CONSTANTS` array (R7b — the alignment made real);
  the warm half is the dominant/lit half (R7c).
- W5 PRM tick(0)-freeze (single cached matchMedia); the `streak`/`rim` axis is ONE shader; WCAG-2.2.2
  pause reachable.
- + a self-test bite per clause.

`tests-visual/siri-waveform.spec.ts` (the WARM-DOMINANT prismatic streak + warm bloom + amplitude pulse
+ PRM-freeze + **the rim-mode `uMode==1` degrade as an ACTUAL data flip in a capture, not a source
assert**; LOCAL, BOTH engines [webkit testMatch-enrolled], both modes) + the `proof:bg-gestalt` waveform
verdict (the row STATES the library default is warm-white-core, so a judge measuring vs `f033` accepts
it). The falsifiable bar is **arm-A real-GPU `meanLum > floor`** + the **committed cross-engine capture
artifact** (chromium ANGLE/Metal + webkit WebGL2 at ≥2 amplitude levels, BOTH `uMode` values, with the
pngjs maxΔ/meanΔ + per-case meanLum recorded in the wave DELTA doc under
`docs/tranches/BG/audit/visual/` — critique P3 #1, the no-prose-byte-identity bar). The wave closes
`complete_with_misses` if the waveform does not read as the reference warm prismatic lens-flare on a
fresh capture.

### BG.W-SIRI-DOCK-INTEGRATION (lands LAST)

Wires both into the dock: the "Search or Ask" pill = the dock's voice/search affordance composing the
EXISTING `useDockSearch` (ONE pipeline); the island mounts off the `#rail`/`.glass-dock-frame` escape,
box-inviolate (`deltaW=deltaH=0`); shares `--spring-dock` + `.glass-capsule`; replaces the cloned
"Dynamic Island Call" demo.

`proof:siri-dock-integration`:
- D1 the search wire composes `useDockSearch` (NO second matcher/pipeline/spring).
- D2 box-inviolate (`deltaW=deltaH=0` across the descend; does NOT import-for-edit
  `dockMorphContext`/`dockMorphMeasure`/`useDockSpring`).
- D3 the webkit `testMatch` array carries both Siri specs (R9 — "both engines" enforced).
- D4 the cloned "Dynamic Island Call" demo is RETIRED onto the real primitive (no two surfaces).
- D5 one-GL-context-per-route — the wire verifies the live-context count (the waveform is the route's
  only live context).
- + a self-test bite per clause.

The binding π is the end-to-end frame-series over the live shell (`proof:bg-gestalt` dock+island
verdict, both engines).

---

## ACCEPTANCE / REAL-PAINT π BAR (the convergence contract)

A FRESH-capture gestalt judgement the building agent did NOT author (the C-PAINT structural root —
live-π is `[local]` and never blocks the tag; source-green is FORBIDDEN, it shipped broken 3×). Both
`chromium-headless-new` (real-GPU ANGLE/Metal on the dev box) AND `webkit` projects (testMatch-enrolled),
both modes:

**Island** — DESCENDS (source-rect FLIP from the top-anchor on `--spring-dock`); the app reads through a
DEEPENING own-pixels blur as it pulls down (**verified to deepen in BOTH engines** — `longest-frozen-run
≤ 2`, NOT the snapping `backdrop-filter`; OVERSIZED scrim, no inset-frame); the four forms MORPH on the
ONE `--siri-island-t` scalar (forms are DATA, never snap; **legible single-form content at every
in-between frame t=0.25/0.5/0.65/0.75 — PAINTED-PIXEL measured, max-opacity ≥ 0.9, NO blank flash**); the
answer is `aria-live`-announced; PRM → calm static + instant descend; the listen-droplet reads as
near-obsidian (warm-deep default), the answer as dark-translucent with a warm specular rim + warm
asymmetric in-gamut under-glow.

**Waveform** — reads as the reference WARM-DOMINANT prismatic lens-flare (prismatic streak with the warm
amber/orange band WIDER+brighter than the pink fringe + warm bloom + amplitude pulse); the rim-mode
`uMode==1` degrade as a CAPTURED data flip; ONE shader; the ramp CONSUMES the in-shader OKLab-rectangular
ramp (no re-rolled color math, no AudioContext); PRM-freeze; both modes. On WebKit it verifies the
WebGL2 GLSL path (no `navigator.gpu`); **arm-A real-GPU `meanLum > floor` + the committed cross-engine
capture pair (≥2 amplitude × both uMode, pngjs diff + meanLum in the DELTA doc)** is the falsifiable
paint bar. The library default core is warm-white (the roster row states it; cyan core = preset).

**Wire** — ONE search pipeline (the island's panel surfaces `useDockSearch`); the island shares the
dock's `--spring-dock` clock + `.glass-capsule` material; box-inviolate (`deltaW=deltaH=0` beside the
dock engine); one GL context per route.

iOS-27 halation + dark-mode: the warm under-glow + bloom read MOST prominently in dark mode (the HIG
halation aesthetic) — verified explicitly on a dark-mode capture.

---

## FOLDED DEFERRED ITEMS (the no-silent-drop ledger)

- **firstprinciples F4-T9** (the backdrop-blur-engage transition gap) → `BG.W-GLASS-BLUR-ENGAGE`
  (engine-honest own-pixels ramp; ≥2-consumer bar met by the drawer detent-glass T6).
- **P-audit F5** (the demo's cloned "Dynamic Island Call" fission demo) → RETIRED onto the real
  `<SiriIsland>` primitive demo (`BG.W-SIRI-DOCK-INTEGRATION` D4).
- **C-CAST-CLIP** (the warm asymmetric under-glow must land in-gamut warm-brown) → S4.
- **C-SAFARI / WS7-02** (zero Safari verification at HEAD) → the webkit `testMatch` widen (R9 / D3) +
  the both-engines π bar; discharged for the Siri surfaces at birth.
- **S-siri-frames Approach A** (`siri-waveform.wgsl.ts` + the ΔE-parity row) → DROPPED per the WS5
  doctrine (R3); the proto already shipped no `.wgsl.ts`. Rationale recorded (KISS smell + unproducible
  cross-engine parity).
- **The reference crops** → RE-ARCHIVED (R10 / S7) under `docs/tranches/BG/audit/visual/siri-reference/`
  (the prose log `S-siri-frames.md` is the re-capture SOURCE).
- **The crossfade BLANK-frame defect** (critique P1 #1) → R4 OVERLAPPING windows + the morph-interior
  PAINTED-PIXEL π (S3).
- **The plate-radius ellipse** (proto SURPRISE #3) → R4 content-clip owns the visible corner.
- **The CSS `abs()` Baseline-2024 dependency** (critique P1 #6) → R4 two-linear-ramp clamp, no `abs()`.
- **The `--t` alias indirection** (critique P1 #6) → R4 read `--siri-island-t` directly.
- **The shader header language drift** (critique P3 #3) → R7 OKLab-rectangular, not shorter-hue arc.
- **The cyan-core identity decision** (critique P3 #4) → R7b warm-white default + cyan-as-preset +
  `VIZ_CONSTANTS` enrollment.
- **The warm-window asymmetry** (critique P3 #2) → R7c warm-dominant window.
- **The committed cross-engine capture** (critique P3 #1) → the W-SIRI-WAVEFORM DELTA-doc bar.
- **The substrate wire** (critique P3 #5) → W1 (`useWebGLCanvas` WIRED, not bare context).
- **The real-route perf capture** (critique P2 #6) → R5.8 / E5 content-dense 2dppx budget.
- **P-audit's other proposed waves** (W-GLASS-DYNAMICS / W-CHART-FAMILY / W-DATE-CALENDAR /
  W-DS-COMPLETE / W-LIQUID-ENTRANCE-GENERAL / W-SAFARI-PARITY-GATE) → NOT WS6 (scoped to WS4/WS7).
- **The P4 truncated mustFix** (the critique's mustFix was cut off in the result) → the obsidian
  gamut-anchor + the `--siri-island-listen-fill` warm-deep default + the in-gamut under-glow are folded
  into R6/S4; if the truncated item named a further constraint, it is captured by the in-gamut /
  no-channel-clip π assert (S4) and the warm-identity floor.

---

## OPEN RISKS (carried into execution — failure falsifies the wave, not the spec)

1. **The morph-INTERIOR frames read legibly with the OVERLAPPING windows** (R4 — the endpoints are
   proven; the cross-dissolve interior + the ≥0.9 max-opacity is the load-bearing unverified bit). The
   binding π reads the interior with PAINTED-PIXEL, not getBoundingClientRect.
2. **The own-pixels blur reads as "the app blurs" not "a foggy overlay" on a content-dense route at
   2dppx** + the perf budget clears (R5.8 — proven on a toy only).
3. **The warm-dominant prismatic fan reads as f027/f033 on a real GPU** with the warm half wider+brighter
   + warm-white core (not muddy, not pink-dominant) — the committed cross-engine capture is the bar.
4. **The obsidian listen-droplet reads as near-black reflective glass via `--glass-capsule-fill`** at the
   warm-deep default (the library does not ship cool-black; the gestalt judge must accept warm-deep as
   "obsidian-enough" or the consumer-preset path is the answer).
5. **The `useDockSpring` compose ordering** — `BG.W-SIRI-ISLAND` is HARD-GATED behind WS2; the born-RED
   self-test bite (S1) locks it. (Confirmed LIVE: `useDockSpring` absent, 5 raw `SpringProgress` in the
   dock dir.)
6. **One-GL-context-per-route** — the waveform is a context; the wire (D5) verifies the live-context
   count.
