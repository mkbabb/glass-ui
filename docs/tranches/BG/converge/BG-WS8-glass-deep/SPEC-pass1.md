# BG-WS8 · Glass-deep — the liquid-refraction apotheosis (SPEC, pass 1)

> Workstream: **Glass-deep**. The deep-glass apotheosis BEYOND WS3's body register: real **light-bending refraction** of the field behind the glass, on Chrome **AND** Safari, suffused as ONE register component-wide. Directives: **C-SAFARI** (★★★ UNADDRESSED at HEAD — "MUST work on Safari, no fallbacks"), liquid-weight on all motion, gestalt-not-patch, NO-legacy, KISS+DRY+DEFT, real-paint-is-the-gate (headless-green/visually-broken shipped 3×), iOS-27 fidelity, METAL FLOW reference.
> Grounded against HEAD `554759ec` (`tranche/BG`, glass-ui 4.2.0). **Hard upstream dependency: WS1** (the ONE shell `<Aurora>` = the route's single known, script-readable backdrop canvas) and **WS3 M3** (`BG.W-GLASS-CLIP-DISCIPLINE` = the ONE unified `.glass-material` group host). WS8 CONSUMES both; it forks neither.

---

## 0 · THE TWO CEILINGS THAT DEFINE THIS WORKSTREAM (settled, do NOT re-litigate)

1. **Real backdrop displacement via CSS/SVG is permanently Chromium-locked.** `backdrop-filter: url(#feDisplacementMap)` is unsupported on WebKit (bug 245510, OPEN/won't-ship) and Firefox. HEAD already gates `.glass-lens` behind `@supports (backdrop-filter: url(#…))` → it is INERT on Safari by construction. **Worse, empirically it is a NO-OP on BOTH engines** (the fleet's striped-backdrop displacement test: `stdevDelta:0` — the lens region is pixel-identical to the plain blur on Chromium 148 AND WebKit 26.4; the `scale='28'` baked literal in a gradient-encoded 14%-bevel map bends sub-perceptual). Chasing cross-engine `backdrop-filter:url()` is a dead end. **Clean-break RETIRE it (no-legacy); do NOT tune the bevel.**

2. **There is no web API to read pixels painted BEHIND a `backdrop-filter` element** (`useGlassBackdropLuminance.ts:13`, verbatim). A "real backdrop-sampling lensing pass" therefore CANNOT sample arbitrary composited DOM. It can sample only a **KNOWN, script-readable canvas** — which is exactly what WS1 lands: ONE shell `<Aurora>` per route. **The apotheosis is scoped to glass-over-the-field** (the dominant backdrop on aurora-everywhere pages); glass-over-arbitrary-DOM (a menu over an article) keeps the CSS floor. That split IS the reasonable Safari-SOTA compromise — not a gap.

**The decisive reframe (the key that makes WS8 winnable): Safari is not a degrade target — it is a first-class refraction engine.** WebGL2 is Safari-baseline since 15; WebGPU ships default-on Safari 26 (Metal, no flags, June-2026 Baseline). A **GPU shader that samples the known field and displaces it** runs NATIVELY on Safari — the ONLY path that satisfies C-SAFARI. The apotheosis register is **in-shader field-refraction**, never `backdrop-filter:url()`.

---

## 1 · GESTALT GOAL

**ONE glass material, every surface, every engine — that reads as a thick refractive lens wherever it floats over the field.** The cure is an architectural transposition, not N bespoke shaders:

- The shell field (WS1) is **procedural and script-readable**. Refraction is therefore a **second, displaced sample of the SAME field, inside the SAME GL context** — no DOM rasterize, no html2canvas, no second context, no staleness. The DOM glass surface becomes a **transparent window** carrying only its CSS chrome (tint + rim + specular + border + content); the GL composite paints the lensed field beneath it.
- **"Suffuse component-wide" = the MATERIAL, not the displacement.** The cheap material register (frost + warm-cream tint + bright bevel + moving specular) rides the EXISTING `.glass-material` comma-group on every surface and every engine — that alone "reads as glass" (apple.com proves the floor). The EXPENSIVE displacement is reserved for page glass floating over the field, painted by ONE shared compositor pass keyed off a panel-rect registry — so the one-GL-context-per-route budget AND the Safari context-storm floor are honored by construction.
- **The METAL FLOW read is delivered by OPTICS, not saturate.** Light-bending = displacement magnitude + rim-concentrated squircle profile + Fresnel + a directional specular streak refracting a field that itself carries flowing structured light (the aurora breathes). WS3 reverts `saturate(1.4–1.8)→~1.2` to cure C-GRAY (saturate is the documented metallic-root); WS8 must NOT re-introduce saturate to chase the metal look.
- **Liquid-weight is finally POSSIBLE on the refraction itself.** The CSS `feDisplacementMap scale` could never be `var()`-driven (CSSWG #542 → the press-swell was retired inert at DDR-LENS-BAKE). A GL uniform IS drivable: the displacement/specular/caustic magnitude springs on press/open/morph/pointer, PRM-snaps to settled. The press-swell RETURNS in the GL tier.

Every leg is compositor/uniform-only, PRM keeps-fade/drops-displacement, and paints in Chrome AND Safari (the floor never depends on a Chromium-only filter).

---

## 2 · MECHANISM (the idiomatic approach, concrete)

### 2.1 · The three-tier SOTA ladder (each rung a CORRECT read, gated by genuine capability)

| Tier | Engines | Mechanism | "Reads as glass" because |
|---|---|---|---|
| **Tier-0 — CSS material FLOOR** | ALL (incl. Safari ≤25, Firefox, forced-colors) | `.glass-material` comma-group: blur + `saturate(~1.2)` + warm-cream `--glass-tint-*` + the **bright lower bevel** + the moving `::before` specular catch-light + the live conic edge-glint | apple.com ships exactly this (blur+translucent+specular, NO `backdrop-filter:url`) and reads as glass. This is the SUFFUSED register. |
| **Tier-1 — WebGL2 field-refraction** | Safari 15+, Chrome, FF | one shared fullscreen pass inside the shell-aurora context: re-samples the rendered field at squircle-displaced + edge-aberrated UVs, masked to registered panel rects | real light-bending of the known field — what `backdrop-filter` cannot do, on Safari natively |
| **Tier-2 — WebGPU refine** | Safari 26+, Chrome 113+ | the same pass on the WGSL pipeline: adds finer chromatic aberration + fbm caustics + light-source specular (the `glassShader.wgsl` pilot, activated) | the highest-fidelity METAL-FLOW caustic shimmer |

The tier oracle is **ONE** — `createGpuSubstrate`'s capability pick (WebGPU? → WebGL2? → else the CSS floor). The Chromium-only `useGlassRenderer.detectTier()` and the `@supports (backdrop-filter:url())` gate are **both retired** (no triple authority). Capability detection, NEVER Chrome-detection. There is no broken intermediate: a non-WebGL2 engine rests on Tier-0 and reads as glass; Tier-1/2 ADD displacement where the field is known.

### 2.2 · The refraction pass — a SECOND compositing pass in WS1's ONE context (the keystone)

The shell `<Aurora>` (WS1) already owns the route's single GL context and renders the field fullscreen. WS8 adds a second pass over the SAME context:

1. **Render-to-texture seam on the substrate.** The field pass renders into an offscreen color attachment (`createCanvasLifecycle` gains a `renderTarget` option — a framebuffer the field pass writes, the glass pass samples). On the WebGPU leaf this is a texture binding; on WebGL2 a FBO + texture. No new context, no canvas move (the WebKit canvas-move-loses-context constraint never bites).
2. **The glass pass** is `glassShader.wgsl` (WGSL refine) / its new GLSL twin (WebGL2 floor): for each pixel, if it falls inside a registered panel rect → sample the field texture at the squircle-displaced + chromatically-split UV, blend the rim Fresnel + specular; else → pass the field texel through unchanged. The displacement is **rim-concentrated** (the squircle slope profile computed in-shader from the panel-local normalized coord — `f(x)=⁴√(1-(1-x)⁴)`, Snell n=1.5 — NOT the pilot's current uniform `from_center * strength`, which reads as a flat smear; the squircle "thin interior, bent rim" is the iOS edge-lens tell and the fix the pilot needs).
3. **`glass_bounds` becomes an ARRAY** (the pilot ships a single `vec4f`): the registry uploads N panel rects (rect + radius + accent + depth) per frame; the pass iterates them. ONE pass, all panels, one context.
4. **The DOM glass becomes a transparent window.** The panel's CSS `background`/`backdrop-filter` plate is dropped where it floats over the field (it would occlude the GL paint beneath); it keeps ONLY the Tier-0 chrome (rim + specular + border) + its content, positioned over the matching GL region. The field is low-frequency, so the blur kernel is CHEAP (a small radius; the heavy 16² Gaussian in the pilot is overkill — displacement + aberration + Fresnel carry the read, not blur).

**Honest lacuna (recorded, not a gap):** the refraction covers the FIELD — the dominant backdrop on aurora pages. Glass over intervening DOM content (a menu over an article) stays on the Tier-0 CSS floor (no engine refracts live DOM). The `filter:url()`-over-a-cloned-CSS-background path (BE.W-LENS-SAFARI) is the BOOKED successor for glass-over-re-paintable-DOM — noted, not built (KISS).

### 2.3 · The panel-rect registry + the ONE backdrop reader (DRY)

`useGlassBackdropLuminance.ts` (542L, ONE consumer) already does source-locate + bbox→UV map + ≤4Hz throttle + IntersectionObserver-gate + park-on-hidden + PRM-collapse. WS8 FACTORS that into a shared `createBackdropSource(targetEl)` leaf with **two consumers**: the luminance observer (kept) AND the new `useGlassRefraction(elRef, { depth, accent })` registration composable. `useGlassRefraction` reports a surface's live DOMRect + radius + accent + `--glass-depth` into the substrate's panel registry (the `glass_bounds[]` upload), throttled + scroll/resize-tracked + PRM-frozen. ONE reader, never a third sampler.

### 2.4 · The suffused material floor (Tier-0) — the EDGE is the make-or-break

The user's own collected perception note (IMG_1881) is the floor's design law: *"Edges are still too dark to trick my brain into believing they're glass… brighter and lower edges in light mode… lighter drop-shadows INSIDE the glass buttons… flatter tops/sides."* The Tier-0 refinement on the `.glass-material` group:

- **Drop the dark top rim; ADD a bright lower bevel catch-light.** A top specular sweep + a bottom inner glow (`box-shadow: inset` bright lower + light inner), dark only at the hairline contact line — the BC `apple-glass.md` D2 "drop the dark top rim" finished with the positive bevel.
- **Wire the DEAD `useSpecularPointer`** (`/glass`, published, ZERO consumers → the conic edge-glint `material.css:156 conic-gradient(from var(--specular-angle,0deg)…)` is FROZEN at `0deg` on EVERY glass surface). FOLD its `atan2`→`--specular-angle` write INTO `createSpecularWriter` (the ONE position-write core `vSpecular` already auto-arms) so the tier-root gleam feeds BOTH the disc catch-light AND the edge-glint angle by construction — a defect-fix (the glint goes LIVE everywhere) AND a dead-symbol removal in one clean break.
- **`saturate(~1.2)`** (the WS3-reverted value, READ from WS3's token — never re-mint). The warm-cream `--card` transmissive plate (vs Apple's cool `#f5f5f7`) is KEPT (the house identity).

This is the "ONE register suffused component-wide" — the MATERIAL, via the existing comma-group, zero per-surface bespoke, zero new axis. It CONSUMES `--glass-level`/`--glass-depth` + the WS3-unified tint axis + the `surface="glass|veil|opaque"` axis; it mints no 6th axis.

### 2.5 · Liquid-weight on the refraction (W-GLASS-LIQUID-TRANSITION)

The GL displacement/specular/caustic strength are UNIFORMS driven by a spring (`useSpringPress` / the `--glass-btn-press-t` drive feeds the uniform via the registry): the lens SWELLS under press, BLOOMS on open (the `.glass-reveal`/liquid-enter mount routes its source-rect through the refraction so the surface materializes as glass coalescing), tracks pointer velocity (the shipped `usePointerVelocityField`). On the spring's own per-spring `--spring-<name>-duration` clock, never a generic `--duration-*`. PRM → snap to settled refraction, zero in-between displacement frames (the substrate's one-static-frame-then-park). Compositor/uniform-only — `proof:no-layout-animation` holds. The DDR-LENS-BAKE impossibility is MOOT in GL.

---

## 3 · FILES TOUCHED

**Retire (clean break, no-legacy):**
- `src/styles/glass-refract.css` (112L) — DELETE `.glass-lens` + the data-URI `#glass-refract` filter (proven no-op both engines).
- `src/composables/glass/useGlassRenderer.ts` (257L) — DELETE wholesale (the Chromium-only canvas+toDataURL+inline-backdrop-filter 2nd refraction fork, 1 consumer).
- `src/composables/glass/useSpecularPointer.ts` (56L) — DELETE after folding its `atan2` write into `createSpecularWriter`.

**Mint:**
- `src/composables/glass/webgl/shaders/glass-refract.glsl.ts` (NEW) — the WebGL2 GLSL twin of `glassShader.wgsl` (the Safari 15+ floor shader; splices the shared `procedural-color.glsl.ts` chunk — ONE color source).
- `src/composables/glass/createBackdropSource.ts` (NEW) — the factored source-locate + bbox→UV + throttle + PRM leaf (from `useGlassBackdropLuminance`).
- `src/composables/glass/useGlassRefraction.ts` (NEW) — the panel-rect registration composable (colocated; the `glass_bounds[]` feeder).

**Edit:**
- `src/composables/glass/webgpu/glassShader.wgsl` — `glass_bounds: vec4f` → array; the displacement → rim-concentrated squircle profile; cheaper blur kernel.
- `src/composables/glass/webgl/createCanvasLifecycle.ts` — add the `renderTarget` (FBO/texture) seam for the field→glass two-pass.
- `src/composables/glass/webgpu/useGpuSubstrate.ts` — the single tier oracle; thread the registry + render-target.
- `src/composables/glass/useGlassBackdropLuminance.ts` — re-home onto `createBackdropSource` (drops ~200L of inline machinery).
- `src/styles/glass/material.css` — the Tier-0 edge re-design (bright bevel, drop dark top rim); the live conic glint default.
- `src/components/ui/button/index.ts` + `src/components/custom/dock/GlassDock.vue` + `src/components/custom/glass-panel/GlassPanel.vue` + `src/components/ui/card/Card.vue` — `:liquid`/page-glass re-points off the dead SVG lens onto the GL refraction tier (where over-field) + the Tier-0 floor (where over-content).
- `demo/stories/substrates/glass-panel.vue` + `glass-material.vue` — the demo witnesses over the live shell field.
- WS1 `demo/layout/AppShell.vue` — the shell `<Aurora>` exposes its render-target + hosts the glass pass (the integration seam; coordinated with WS1, NOT a fork).

**Gate/π:**
- `scripts/proof-glass-field-lens.mjs` (NEW), `scripts/proof-glass-sota-ladder.mjs` (NEW), `scripts/proof-glass-suffuse.mjs` (NEW); `tests-visual/glass-field-lens.spec.ts` (NEW, enrolled in the `webkit` project). Re-green/retire: `proof-lensing.mjs`, `proof-glass-depth.mjs`, `proof-glass-cohesion.mjs`, `proof-button-glass.mjs`, `proof-liquid-reveal.mjs`.

---

## 4 · WAVE BREAKDOWN (BG.W-*)

> Sequencing: **WS1 (shell-aurora known canvas) → WS3 M3 (unified `.glass-material` group) →** W-SUFFUSE (field-independent, lands NOW) → W-REFRACT-WEBGL (shader + registry, build-independent) → W-BACKDROP-SAMPLE (wire into the WS1 context, integration) → W-SOTA-LADDER (formalize + retire) → W-LIQUID-TRANSITION (spring).

### BG.W-GLASS-SUFFUSE-UNIVERSAL — the Tier-0 material floor, suffused (field-independent)
CONSUMES the WS3-unified `.glass-material` group (does NOT fork it). The EDGE re-design (bright lower bevel + light inner shadow, drop dark top rim — IMG_1881); fold `useSpecularPointer`'s `atan2`→`--specular-angle` into `createSpecularWriter` so the conic edge-glint goes LIVE on every surface (defect-fix + dead-symbol delete); READ the WS3 `saturate(~1.2)` revert. "ONE register" = the material via the comma-group, zero per-surface bespoke, zero new axis. **Lands NOW** (no WS1 dep). π: every glass surface resolves the one register + the live glint; the floor reads as glass standalone on Safari (no GL).

### BG.W-GLASS-REFRACT-WEBGL — the dual-stack refraction shader + the registry
Mint the WebGL2 GLSL twin of `glassShader.wgsl` (the Safari-15 FLOOR — the load-bearing path; WGSL is the refine, NOT the floor); activate the WGSL pilot; `glass_bounds[]` array; rim-concentrated squircle displacement; the `useGlassRefraction` registry + the factored `createBackdropSource` leaf (ONE reader). RETIRE `useGlassRenderer.ts`. Build-independent of WS1 (a fixture field texture proves the shader). π: real light-bending over a fixture field on Chrome AND Safari (capture-mode `renderAt` readback; rim-displacement > 0 on webkit).

### BG.W-GLASS-BACKDROP-SAMPLE — wire the pass into WS1's ONE context (the keystone, WS1-gated)
The render-target seam on `createCanvasLifecycle`; the field→glass two-pass inside the shell-aurora context; the DOM-glass-as-transparent-window layering. Depends HARD on WS1. π: the field reads as refracted/displaced THROUGH each page-glass surface, NOT flat blur; **exactly one allocated GL context per route** (no second context, no Safari storm); both engines, both modes.

### BG.W-GLASS-SOTA-LADDER — formalize the 3-tier graceful degrade + the no-dual-path close
ONE tier oracle (`createGpuSubstrate` capability pick); RETIRE the dead `.glass-lens` SVG filter + `glass-refract.css` + the `@supports(backdrop-filter:url())` gate + `useGlassRenderer.detectTier()` (no-dual-path, no-legacy clean break); each tier a correct standalone read. Book BE.W-LENS-SAFARI (`filter:url()` clone, glass-over-DOM) + the in-shader squircle-corner (the Chrome-only `corner-shape` cross-engine fold) as successors. π: each tier paints a correct glass read on its engine; no broken intermediate; the retired paths are DEFINITION-ABSENT.

### BG.W-GLASS-LIQUID-TRANSITION — spring the refraction
Displacement/specular/caustic magnitude become spring-driven uniforms (press-swell RETURNS — DDR-LENS-BAKE moot in GL); the `.glass-reveal`/liquid-enter bloom routes its source-rect through the refraction (transitions light-bend the field — the METAL FLOW materialize); `usePointerVelocityField` feeds the flow; per-spring clock; PRM snaps to settled. Excise the no-legacy debt the band touches: `useLiquidMorph.ts` (462L) + the 5-way `useLiquidReveal` re-fork (`useBloomUp`/`useDockContextSilhouette`/`useCelebrationBurst`) + `liquid-morph.css` (850L, mis-filed in `glass/`). π: a frame-series shows the displacement swell on press/open, snapping under PRM, both engines.

---

## 5 · ACCEPTANCE / REAL-PAINT-π BAR (the binding gate)

The headless-green/visually-broken trap shipped 3×. C-SAFARI is UNADDRESSED at HEAD (ZERO Safari verification). The close requires a FRESH capture by a NON-AUTHORING agent on a REAL GPU, **both `chromium` AND `webkit` projects, both modes**, over the LIVE shell field:

1. **Light-bends on Safari (the whole C-SAFARI claim).** A registered page-glass surface over the field shows a **non-zero rim-displacement delta** vs a no-lens baseline — the field's flowing lines visibly distort at the rim, with a visible chromatic fringe. Asserted on **webkit specifically** (the current `stdevDelta:0` is the born-RED). Read via compositor `locator.screenshot()` or `mode:"capture"` `renderAt` (live `getImageData` is all-zero by the `preserveDrawingBuffer:false` contract — NOT a defect).
2. **Degrades correctly, never broken.** Over opaque DOM content → frost+tint+rim+specular (Tier-0) reads as glass = PASS (NOT flagged a fail). On a non-WebGL2 engine → Tier-0 floor reads as glass = PASS.
3. **One-GL-context-per-route holds.** `glContextCount(allocated) === 1` on every refracting route (the field pass + the glass pass share the route's single context); a 5-nav burst shows no monotonic leak.
4. **PRM-safe.** Under `prefers-reduced-motion: reduce` the refraction paints ONE static settled frame then parks; zero in-between displacement frames.
5. **Reads as the reference.** The fresh capture reads as the iOS-26 Control-Center convex-lens magnification (rim concentration + directional specular streak per the METAL FLOW ref), NOT flat blur. A gestalt verdict re-earned on the fresh capture (`proof:ba-gestalt` glass/CTA verdict), NOT a getComputedStyle property check (which serializes the un-applied filter and is BLIND to refraction).

Device-free backstops: `proof:safari-webgl` (S5 no un-gated `backdrop-filter:url()` — the new path is a GL canvas, NOT the banned form), `proof:offscreen-pause`, `proof:nested-backdrop-budget`, `proof:no-layout-animation`, `profile:bundle` (a recorded gzip ceiling for the new refraction chunk; the eager root-barrel graph reaches ZERO of {GL substrate, shader strings, value.js}).

---

## 6 · FOLDED DEFERRED ITEMS

- **The `--glass-refract` press-swell** (retired inert at DDR-LENS-BAKE, a CSS-ceiling artifact — CSSWG #542) RETURNS in W-GLASS-LIQUID-TRANSITION as a GL uniform.
- **`useGlassRenderer.ts` + `.glass-lens` SVG filter + `--glass-refract-*` tokens** — retired under W-GLASS-SOTA-LADDER (proven no-op, superseded by the GL floor).
- **BE.W-LENS-SAFARI** (`filter:url()` over a cloned/re-painted CSS background, gated `@supports (filter:url()) and (not (backdrop-filter:url()))`, clone as a z-below sibling) — BOOKED successor for glass-over-re-paintable-DOM; NOT the field apotheosis, NOT built this pass.
- **The Chrome-only squircle `corner-shape: superellipse(2)`** — fold the superellipse profile into the GL pass (cross-engine, in-shader) as a recorded W-BACKDROP-SAMPLE stretch.
- **`--glass-chromatic` box-shadow dispersion fringe** (`surfaces.css:407`, a CSS-ceiling fake) — RETIRE once the GL chromatic-aberration ships (do not ship both as "the apotheosis"); keep only as an explicit Tier-0 degrade if a measured Safari-CSS read needs it.
- **The metallic-aurora viz** (DIRECTIVE WS5-04, deferred) shares the curl-flow + directional-specular math with the glass refraction-field — flag the `flow.wgsl`/`.glsl` chunk reuse (DRY, no second engine).
- **`--glass-depth` lerp** (near-dead, 2 static consumers) — UNIFY with the refraction so "deep glass" means light-bending, not just more blur+saturate (W-GLASS-SUFFUSE consumes it as the depth uniform; retire only if the unified register doesn't animate it).
- **>500L colocation debt** flagged to owning bands: `liquid-morph.css` (850L, re-home out of `glass/` into dock surfaces), `createCanvasLifecycle.ts` (695L), `useWebGPUCanvas.ts` (606L), `useGlassBackdropLuminance.ts` (542L — shrinks via the `createBackdropSource` factor).

---

## 7 · OPEN RISKS

- **R1 (load-bearing) — the two-pass-in-one-context architecture on a REAL Safari.** Does a WebGL2 glass pass sampling the field's render-target inside the shell-aurora context actually bend pixels on WebKit/Metal, in ONE context, with capture-mode readback? This is PT1 and gates the whole spec. Failure (Safari needs a 2nd context, or render-target readback is all-zero, or the field-texture binding fails) falsifies the apotheosis.
- **R2 — the DOM-transparent-window layering.** Does dropping the panel's backdrop plate (so the GL paint shows through) keep content + rim chrome legible above, with the GL region staying registered under scroll/resize/morph? The registry sync is PT2.
- **R3 — perf under N panels + the field animating.** A fullscreen pass iterating N panel rects per frame while the field breathes; the blur kernel must be cheap (low-frequency field). Bounded by the recorded budget; the offscreen-park + ≤4Hz registry throttle inherit from the substrate.
- **R4 — WS1 is the precondition.** WS8 cannot paint-verify until WS1's shell aurora lands on disk (the known-canvas source). W-SUFFUSE + W-REFRACT-WEBGL are build-independent (fixture field); W-BACKDROP-SAMPLE is WS1-gated.
- **R5 — the clean-break blast radius.** Retiring `.glass-lens`/`useGlassRenderer`/`useSpecularPointer` touches `proof:lensing`/`glass-depth`/`button-glass`/`liquid-reveal`/`glass-cohesion` + `Button :liquid` + `GlassPanel`. Because the lens is a proven no-op, the retirement is a zero-pixel subtraction — but the gates must re-green or retire (PT4).
