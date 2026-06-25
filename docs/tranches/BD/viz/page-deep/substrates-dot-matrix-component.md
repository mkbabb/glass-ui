# Pass-E COMPONENT deep audit — substrates/dot-matrix

**Page:** `substrates/dot-matrix` · **import:** `@mkbabb/glass-ui/dot-matrix`
**Component(s) audited (real src):**
- `src/components/custom/dot-matrix/DotMatrix.vue` (the SFC — 130L)
- `src/components/custom/dot-matrix/constants.ts` (the author schema + WARM_IDENTITY default)
- `src/components/custom/dot-matrix/composables/dotMatrixField.ts` (the cited-SOTA math — pure, node-testable)
- `src/components/custom/dot-matrix/composables/useDotMatrix.ts` (the public composable + lifecycle wiring + pointer field)
- `src/components/custom/dot-matrix/composables/useDotSphere.ts` (the WGPU + GL `setup` builders)
- `src/components/custom/dot-matrix/composables/uniformBridgeWGPU.ts` (the typed-struct uniform layout SoT)
- `src/components/custom/dot-matrix/shaders/dot-matrix.wgsl.ts` (WebGPU primary)
- `src/components/custom/dot-matrix/shaders/dot-matrix.glsl.ts` (WebGL2 fallback)

This is a **PROCEDURAL-VIZ** component (not a four-state interactive control). Born BC.W-VIZ-DOTMATRIX; the binding spec is `PROCEDURAL-SUITE.md` (member 6, rank 6) + `DESIGN.md` (the glass system the card hosts it in) + `motion-canon.md`.

---

## (0) Verdict-at-a-glance

The dot-matrix component is **architecturally exemplary** — the cleanest member of the procedural suite. ONE pure cited-SOTA math source (`dotMatrixField.ts`), a std140-trap-proof typed-struct uniform bridge, byte-parity WGSL/GLSL transcription off ONE buffer, born-GPU (no Canvas2D), the shared color chunk, the shared pointer field fed (no own rAF), live-PRM + offscreen-park inherited from the ONE lifecycle leaf. Findings are **minor + tail-shaped** — one dead const, a Safari-only offscreen-park gap, a demo-vs-suite-spec drift (Configurator absent), and the page-level UX asks. No legacy/dual-path/workaround in the component itself.

---

## (1) ANIMATION — affordance, spring physics, entrance/exit

The viz is NOT a four-state-contract control, so the motion-canon binding is the **procedural register** (slow dignified spin + depth-shell read + pointer interaction), not enter/press/hover.

**STRONG (present + correct):**
- **The shape is painted by BRIGHTNESS + DEPTH, not motion** (`facingFade`, §T2): stop the spin and it STILL reads as a translucent dot-shell. This is the reference behaviour, faithfully implemented (soft facing falloff, NOT a binary back-face cull) — `dotMatrixField.ts:facingFade` + the `out.tone = 1 - facing` tonal-depth read that works on BOTH dark AND light grounds (a genuine refinement over an opacity-only shell).
- **Slow tilted Y-spin** via `spinMatrix` (Rodrigues about a tilted axis) on a `renderAt(t)`-deterministic clock — dignified, hero-grade. `rotationSpeed: 0.07 rad/s` default.
- **Sub-perceptual breathing** (`breathRadius`, default OFF) — the calmest non-dead register, correctly gated to a demo opt-in.
- **Pointer interaction (the §T7 axis):** parallax screen-center track + velocity-scaled repel/attract Gaussian dimple + flick-accel brightness bloom — all fed off the SHARED `usePointerVelocityField` (B4), `tick(delta)` from inside the renderer frame (NO own rAF). PRM freezes the field (`tick(0)`). The interactive arm decays residual push back to calm. This is HIGH animation affordance for a procedural surface.

**FINDING A1 (MINOR — no dead/janky animation; one absent affordance).** The component has **no entrance** — the globe pops in at full opacity on mount (the demo wraps it in a static `ShowcaseFrame`, no `vReveal`/`.scroll-cascade` mount build). For a hero procedural surface this is acceptable (the spin IS the life), but a coupled fade-in-on-arm would match the suite's "audacious-type-arrives-with-gravity" gestalt. → **AUGMENT** (page-level, not component) on **BD.W-BC-COMPONENT-CANON** (the demo composition wave) — wire the card's mount entrance, not a component-internal change.

**No janky animation found.** The spin/breath/pointer are compositor-only GPU writes; no layout property animates.

---

## (2) PROCEDURAL VIZ — adherence to PROCEDURAL-SUITE spec + GPU/Safari bar

**FULLY ADHERENT.** Checked against `PROCEDURAL-SUITE.md` member-6 row:
- ✅ **Fibonacci phyllotaxis dot-sphere** — `fibonacciDot` is the area-centered golden-angle lattice (no pole-pinching), cited (Martin Roberts / extremelearning, arXiv 0912.4540). REAL math, not arbitrary noise.
- ✅ **BORN WebGPU-first** — `useGpuSubstrate` picker; instanced billboard quads (`draw(6, N)`) + crisp `fwidth` SDF circle fragment. WebGL2 instanced-billboard fallback (`drawArraysInstanced`) draws the SAME dots → parity `verified`.
- ✅ **ONE math source** — the WGSL/GLSL read the STATIC JS-computed phyllotaxis buffer (`buildDotsBuffer`); they do NOT re-derive on GPU (the round-trip parity anchor; `proof:dot-matrix` clause 3).
- ✅ **Shared color chunk** — both backends splice `procedural-color.{wgsl,glsl}.ts` (the ONE OKLCh ramp source → no cross-backend drift).
- ✅ **`fwidth` lives in `fs_main` ONLY** (never vs-reachable — the dual-module WGSL-validation trap avoided, explicitly noted).
- ✅ **Warm-identity default + presets-in-consumers** — `WARM_IDENTITY_PALETTE` is the library default; the mono-on-near-black two-globe reference is a DEMO preset. Teal-on-navy GONE (BC.W-TEAL-NAVY-PURGE). No consumer literal in `src/`.
- ✅ **std140-vs-WGSL alignment trap closed** by construction — `uniformBridgeWGPU.ts` is ONE layout table (vec4 lanes + mat3 as 3 columns + vec4 palette stride); the WGSL struct and JS offsets are ONE declaration.

**FINDING V1 (TAIL — the suite-wide owed item, already a BD wave).** Parity at HEAD is a **device-free structural proxy** (CPU-evaluator-vs-itself, ΔE 0.0) — NOT proof the WGSL primary matches WebGL2 on real Metal. → already owned by **BD.W-VIZ-PARITY-METAL** (the binding real-GPU swap-chain-readback-vs-readPixels capture). dot-matrix is `verified`-proxy and rides that wave's enrollment. **No new action** — confirm dot-matrix's row is in the `viz-parity-metal.spec.ts` enrolled set. → **MODIFY** BD.W-VIZ-PARITY-METAL only if dot-matrix is missing from its capture roster (it should be present — it is a born-WebGPU viz).

---

## (3) PERFORMANCE — compositor-only · offscreen-pause · layout-thrash

- ✅ **Compositor-only** — pure GPU render pass; no per-frame layout read. The `resize` reads `clientWidth`/`clientHeight` once per resize (DPR via `resolveBudgetDpr`), not per frame.
- ✅ **Demand-loop + live-PRM freeze** — inherited from `createCanvasLifecycle` (the ONE leaf): `prefers-reduced-motion` paints ONE static frame then parks, re-arms on un-reduce (`reducedMotion` matchMedia change). A parked rAF attaches ZERO frames.
- ✅ **Static instance buffer** — phyllotaxis built ONCE (time-invariant); only the spin/breath/pointer uniforms write per frame. No per-frame buffer rebuild.
- ✅ **DPR budget-capped** via `resolveBudgetDpr` (the aurora budget leaf reused).
- ✅ **No layout-thrash** — the `dot-matrix-wrapper` carries `contain: content` (layout/paint isolation root).

**FINDING P1 (MINOR — Safari/Firefox offscreen-park gap).** The component wires offscreen-park **ONLY via `content-visibility: auto` + the substrate's `contentvisibilityautostatechange` listener** (the BC-born discipline, shared with dot-flow-field). It does **NOT** compose `useIntersectionPause` the way the older aurora/goo-blob do (the `"off-screen-io"` rootMargin path). `contentvisibilityautostatechange` is **Chromium-only** — on Safari/Firefox the event never fires, so a scrolled-offscreen dot-matrix **keeps rendering at full rate** (the tab-hidden `document.hidden` park still works; the offscreen-but-tab-visible case does not). Aurora/goo-blob close this with the IntersectionObserver fallback; the two BC-born viz (dot-matrix, dot-flow-field) silently dropped it. → **AUGMENT** — wire `useIntersectionPause` (writing `"off-screen-io"`, the leaf already declares the reason key) as the cross-engine offscreen-park, matching aurora/goo-blob. This is a **viz-suite-wide** fix (dot-matrix + dot-flow-field both), not dot-matrix-only. Best home: a new BD scope on **BD.W-VIZ-PARITY-METAL**'s band (Band 3) OR fold into **BD.W-VIZ-COMPUTE-DENSITY**'s sibling-sweep — recommend a NEW short wave `BD.W-VIZ-OFFSCREEN-IO` (the cross-engine offscreen-park parity for the two BC-born viz) since neither existing wave covers it.

---

## (4) SAFARI compatibility

- ✅ **WebGPU on Safari 26+** — `useGpuSubstrate` is WebGPU-first WHERE the platform allows; Safari 26+ is in the June-2026 Baseline. Pre-26 Safari falls to the WebGL2 instanced-billboard path (Baseline-universal). `gl_VertexID`/`gl_InstanceID` + `drawArraysInstanced` + `vertexAttribDivisor` are all WebGL2-core (Safari-safe).
- ✅ **`fwidth`** is WebGL2-core (no `OES_standard_derivatives` extension dance needed in `#version 300 es`).
- ✅ **OKLCh color** runs in-shader (the value.js Ottosson matrices), not via CSS `oklch()` — no Safari color-function gap.
- ⚠️ **The P1 offscreen-park gap is a Safari/Firefox issue** (see above) — the only real Safari concern, and it is a perf/battery issue, not a render-correctness one.
- ✅ **Premultiplied-alpha blend** (`one`/`one-minus-src-alpha`) is standard across both backends — the translucent dot-shell composites correctly over the glass card on Safari.

---

## (5) IDIOMATIC / no-legacy — workarounds, dead code, dual-path

**FINDING I1 (MINOR — dead code).** `dot-matrix.glsl.ts:117` declares `const mat2 FBM_ROT = mat2(0.8, 0.6, -0.6, 0.8);` in the **fragment shader** — it is **never referenced** (the dot fragment is a pure SDF circle; no FBM). This is a copy-paste residue from the shared color-chunk splice pattern (aurora/concentric use FBM_ROT; dot-matrix does not). → **PRUNE** — delete the unused const. Tiny, clean break. Best home: **BD.W-MISSED-SLAB-CENSUS** (the dead-code/missed-artefact sweep) OR fold into any dot-matrix-touching wave (e.g. the P1 offscreen-io wave). No gate guards an unused GLSL const, so this is a free deletion.

**No dual-path / no workaround in the component:**
- The WGSL-primary / GLSL-fallback split is the SANCTIONED dual-substrate (not a dual-path shelf-ware — `proof:gpu-substrate-single` enforces the no-second-fork + no-deleted-fallback discipline). NOT a W-PRUNE-CONSOLIDATE target.
- The two `setup` builders (`createDotWGPUSetup`/`createDotGLSetup`) share `DotSetupDeps` + the ONE `buildDotsBuffer` + the ONE `breathRadius`/`spinMatrix` math — genuine composition, not duplication.
- `restingPointer` is re-exported from `useDotSphere` (a thin pass-through of the bridge export) — harmless, idiomatic barrel hygiene.

**FINDING I2 (MINOR — demo drifts from the SUITE spec; component is fine).** `PROCEDURAL-SUITE.md` mandates "the tunable surface is a `useConfiguratorState<Config>` studio inheriting the AZ.W-HIERARCHY configurator vocabulary." The dot-matrix demo (`demo/stories/substrates/dot-matrix.vue`) uses **raw `reactive` + three `<Switch>`es**, NOT a `<Configurator>`. The `DotMatrixConfig` schema is rich (dotCount/radius/dotSize/depthFade/rotationSpeed/axisTilt/parallax/…) but the demo exposes only preset-toggle + interactive + paused. This is a **demo-completeness** gap, not a component gap (the component correctly accepts the full `config` prop). → **AUGMENT** on **BD.W-BC-COMPONENT-CANON** — bring the dot-matrix studio onto `<Configurator>` like aurora/blob (the SUITE-spec studio discipline), exposing the full schema sliders. Satisfies the user's "each page deftly uses a series of glass-ui components (docks/cards/tabs/buttons)" ask AND the suite's configurator mandate.

---

## (6) The glass SIX-LAYER composite — present?

The dot-matrix is a **procedural BACKGROUND viz**, NOT a glass surface — it does NOT itself paint the six-layer optical composite (backdrop blur+saturate · surface tint · edge rim · inner catch-light · drop shadow · grain). That is **CORRECT by design**: per DESIGN.md "glass-cannot-sample-glass," the viz is the COLORFUL backdrop the glass card samples THROUGH. The component's job is to be the live aurora-class field BEHIND the glass; the card chrome owns the six layers.

**FINDING G1 (page-level — the user's core ask).** The demo hosts the globe in `<ShowcaseFrame tier="field">` over a transparent ground — so the dot-sphere reads over the page substrate, but the page asks (per the prompt) for: **glass demos over COLORFUL aurora backgrounds**, **each sub-section in its OWN glassy card**, **the main card area BIGGER**, **leverage dock APIs for contextual switching/animating**. The current demo is ONE big `460px` frame with raw switches — it does NOT yet (a) stage the globe over a colorful `<Aurora>`/colored backdrop (it is warm-cream-on-transparent), (b) split sub-sections into discrete glassy cards, (c) use a `<GlassDock>`/`<DockStage>` for the preset/interactive/pause controls (it uses inline `<Switch>`es). → **AUGMENT** on **BD.W-BC-COMPONENT-CANON** (or a dedicated page-redesign wave): re-stage as glassy-card-per-section + dock-driven controls + a colorful backdrop, bigger canvas. The component needs ZERO change to support this (it already accepts a colorful `background` config + `paused` v-model for `<DockBackgroundToggle>`). **Import-label ask is ALREADY satisfied** — the demo prints `Shipped @mkbabb/glass-ui/dot-matrix` (line 89), the standardized label.

---

## Fold-map summary (each finding → action → wave)

| # | Finding | Severity | Action | Wave |
|---|---|---|---|---|
| A1 | No mount entrance (globe pops in) | MINOR | AUGMENT (page) | BD.W-BC-COMPONENT-CANON |
| V1 | Parity is device-free proxy | TAIL (owned) | MODIFY (confirm enrollment) | BD.W-VIZ-PARITY-METAL |
| P1 | Offscreen-park is CV-only (Safari/FF gap) | MINOR | AUGMENT (cross-engine IO park) | **NEW BD.W-VIZ-OFFSCREEN-IO** (dot-matrix + dot-flow-field) |
| I1 | Dead `FBM_ROT` const in GLSL frag | MINOR | PRUNE | BD.W-MISSED-SLAB-CENSUS |
| I2 | Demo uses raw Switches, not `<Configurator>` (suite-spec drift) | MINOR | AUGMENT | BD.W-BC-COMPONENT-CANON |
| G1 | Page asks (glassy cards / dock controls / colorful backdrop / bigger canvas) | PAGE | AUGMENT | BD.W-BC-COMPONENT-CANON |

**Component-internal src changes owed:** only **I1** (delete one dead GLSL const) + **P1** (wire `useIntersectionPause` for cross-engine offscreen-park). Everything else is demo/page-composition (the component is sound).
