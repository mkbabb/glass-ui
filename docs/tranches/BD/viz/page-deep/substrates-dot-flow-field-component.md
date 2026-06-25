# Pass-E COMPONENT deep audit — substrates/dot-flow-field

**Page:** `substrates/dot-flow-field` · **import:** `@mkbabb/glass-ui/dot-flow-field`
**Component(s) audited (the REAL src, not the demo):**
- `src/components/custom/dot-flow-field/DotFlowField.vue` (thin SFC)
- `composables/useDotFlowField.ts` (the public composable — substrate + pointer wiring)
- `composables/flowField.ts` (the ONE cited-SOTA math source)
- `composables/useFlowParticles.ts` (the WGPU compute+render setup + the WebGL2 fragment setup)
- `composables/uniformBridgeWGPU.ts` (the typed-struct layout source-of-truth)
- `shaders/flow-field.compute.wgsl.ts` · `flow-field.render.wgsl.ts` · `flow-field.glsl.ts`
- `constants.ts` · `README.md`

The component was RETOPOLOGIZED at BC.W-VIZ-DOTFLOW off the BB free-advecting particle cloud
("mess of noise") into a CALM ANCHORED DOT-MATRIX a slow LARGE wave sweeps through. Most of
this audit confirms that retopology is sound; the findings are refinements, not a redo.

---

## (1) ANIMATION — high-affordance? dead/janky/missing?

- **Spring physics: PRESENT + idiomatic.** The compute kernel eases each dot to its
  sub-cell target with a framerate-independent critically-damped pull
  `p ← mix(p, target, 1 - exp(-springK·dt))` (compute.wgsl `cs_main`) — the GPGPU
  influence-pull pattern, `dt` clamped `[0,0.05]` so a tab-restore frame can't blow the
  step. This is correct spring behaviour, not a lerp-to-target with a magic constant.
- **Entrance/exit: MISSING (the one real animation gap).** This is a procedural BACKDROP
  viz, not a control — it has no four-state contract, and per BD inv (a dead-mechanism/
  backdrop viz changes no paint where the successor paints) it owes no press/hover/enter
  register OF ITS OWN. BUT the SFC mounts the canvas with ZERO entrance choreography: the
  field simply appears at full opacity on the first armed frame. motion-canon P2/P3
  (enter = coupled transform+opacity fade-rise) would have the field BLOOM in (an opacity
  0→1 + a hair of scale on the wrapper, the `.scroll-build`/`useLiquidReveal` register the
  rest of the library speaks). A backdrop that hard-cuts in on route-enter reads abrupt
  against the page-build cascade. → **AUGMENT** (see W-VIZ-ENTRANCE proposal in §Mapping).
- **The sweeping-band gestalt is alive.** `waveBand(sampleHeight(o,t))·contrast` is a real
  low-frequency tide crossing the lattice — the animation affordance is in the FIELD, and
  it reads (the BC retopology's whole point). `windSpeed: 0.3` slow-sweep + `springK: 6`
  is calm-by-design, not dead.
- **Interactive arm (BC.W-VIZ-INTERACTION): wired but DEFAULT-OFF.** `config.interactive`
  raises local `displaceAmp` along pointer velocity + a flick-burst brightness bloom via the
  SHARED `usePointerVelocityField` (no second rAF — fed `tick(delta)` from the renderer's
  own frame). Correct composition. Default `false` (the calm register). No jank found.

## (2) PROCEDURAL-VIZ adherence (PROCEDURAL-SUITE spec + GPU-only/Safari bar)

- **Cited-SOTA math: EXEMPLARY.** Tessendorf/Gerstner sum-of-sines with the deep-water
  dispersion `ω=√(g·k)` (analytic ∇⊥h, no finite-difference) + Bridson divergence-free curl
  via the SHARED `curlFBM` operator. `flowField.ts` is pure + node-testable; the WGSL +
  GLSL transcribe it line-for-line, and `proof:viz-dotflow` F3 round-trips JS↔WGSL↔GLSL at
  a fixed sample set. This is the suite's single-math-source discipline done right.
- **WebGPU-first, no Canvas2D: ADHERES.** Compute+instanced-billboard WGSL primary;
  the Canvas2D point-cloud is GONE (clean break — the retopology made the field
  fragment-friendly), so the fallback is a pure WebGL2 fullscreen-fragment evaluating the
  SAME field → parity flips `degraded → verified`. The "no canvas anywhere" §E mandate holds.
- **Warm-identity default + presets-in-consumers: ADHERES.** `DEFAULT_FLOW_CONFIG.palette`
  is `WARM_IDENTITY_PALETTE` (warm-cream, hue 62-78); the mono-on-near-black + globeMask are
  DEMO presets (`demo/stories/substrates/presets.ts`). Teal-on-navy purged entirely.
- **Parity claim is STRUCTURAL-PROXY only (the suite-wide owed item, NOT this page's bug).**
  `gpu-parity-table.md` dot-flow-field row is `deltaE {mean:0,p99:0}` from a CPU-vs-itself
  proxy. The BINDING real-GPU Metal readback is **BD.W-VIZ-PARITY-METAL** (the sequencing
  gate). dot-flow-field is enrolled there. → no new wave owed; it rides PARITY-METAL.

## (3) PERFORMANCE — compositor-only? offscreen-pause? layout-thrash?

- **Offscreen-pause + live-PRM-freeze: INHERITED CORRECTLY.** Composes `createGpuSubstrate`
  over the ONE `createCanvasLifecycle` leaf — the 3-reason suspend Set + the
  `contentvisibilityautostatechange` park + the live `matchMedia` PRM re-monitor are NOT
  re-forked. The wrapper carries `contain: content` + `content-visibility: auto` +
  `contain-intrinsic-size: auto none` so the browser content-skips it offscreen. The
  composable re-implements ZERO scheduling (verified — `shouldContinue: () => true` defers
  the demand gate to the leaf).
- **DPR-clamped: GOOD.** Both setups `resolveBudgetDpr()` (the aurora budget cap) on resize
  — no unbounded `devicePixelRatio` raster on a Retina/4K panel.
- **No layout animation.** Every animated channel is GPU (the storage buffer + uniform
  writes + the instanced draw); zero layout property animates. `proof:no-layout-animation`
  is not even in scope (no CSS keyframe/transition). Clean.
- **WebGL2 FALLBACK per-pixel cost (MINOR — the one perf smell).** `flow-field.glsl.ts`
  re-derives the nearest lattice cell + `sampleDisplacement` (which calls `sampleVelocity` →
  `gerstnerVelocity` over up-to-8 waves + a 3-octave `curlFBM` central-difference = 4
  `potentialFBM` calls) AND `sampleHeight` PER PIXEL, every pixel, even the ~95% of pixels
  that fail the `mask < 0.002` early-out AFTER the displacement is already computed. The
  early-out fires on the dot MASK but only after `sampleDisplacement(o)` ran. On the
  ~5-10% WebGL2 tail (low-end/old) this is the heaviest path and it's doing curl-fbm work
  for every empty-cell pixel. The WGPU primary doesn't have this (compute does it once per
  dot, not per pixel). → **AUGMENT** (cheap: compute `sampleDisplacement` only after the
  coarse cell-distance test rejects, or skip curl in the fragment fallback — `curlStrength`
  is a "faint break" the tail can drop). Low priority (tail-only), recorded not silently
  dropped.

## (4) SAFARI compatibility

- **WebGPU primary: Safari 26+ baseline (June-2026 fact) — OK**, with the WebGL2 fragment
  fallback for older Safari/iOS via `useGpuSubstrate`'s feature-detect picker.
- **No Safari-hostile constructs found.** `tanh` (GLSL ES 3.00 — supported), `smoothstep`,
  premultiplied-alpha blend (`ONE, ONE_MINUS_SRC_ALPHA`) all Safari-clean. The OETF/OKLCh
  chunk is the shared `procedural-color` source already validated cross-backend.
- **The real Safari/Metal risk is the UNVERIFIED parity** (the WGSL `fwidth`-free here, so
  lower drift risk than goo-blob) — owned by W-VIZ-PARITY-METAL's live readback. No
  page-specific Safari gap.

## (5) IDIOMATIC / no-legacy — workarounds, dead code, dual-path?

- **`useDotFlowField` config-plumbing is CONVOLUTED (the one transpose-for-elegance).**
  The effective-config blend is wired three ways at once: (a) `setupDeps.config =
  getEffective()` (a CALL whose return is then overridden by) (b) `config: effective` in
  each setup's spread, and (c) each setup's `onFrame` is RE-WRAPPED `(t)=>{onFrame(t);
  getEffective()}` on top of the bare `onFrame` already in `setupDeps`. It works (the
  pointer.tick runs exactly once/frame — verified; the wrapped onFrame is the one
  `frame()` invokes), but it reads as three overlapping mechanisms for "re-read the live
  config + blend the pointer push each frame." The idiomatic shape is ONE: pass the setups a
  single `getConfig: () => FlowFieldConfig` getter (returns `effective` after blending), and
  let `frame()` call it — drop the `config:`/`onFrame:`-rewrap duplication. → **MODIFY**
  (clarity/maintainability; no behaviour change). This is the kind of "convoluted but
  correct" wiring the architectural-transposition mandate targets.
- **No dead code, no dual-path, no back-compat alias.** The Canvas2D path is fully deleted
  (not stubbed); `particleCount`/`windDirection`/`dotSizeVelocity` are clean-break dropped
  (README MIGRATION row). `proof:no-dual-path` discipline holds. Clean.
- **`coherence` config field is INERT (minor).** `FlowFieldConfig.coherence` is documented
  as "maps the octave count + persistence" but the SHIPPED `DEFAULT_WAVE_COMPONENTS` bakes
  `buildWaveLadder(35, 3, 2.5)` at module load — `coherence` is never read by any setup or
  the wave-ladder builder at runtime (a studio slider that moves it does nothing unless the
  studio re-calls `buildWaveLadder`). Either wire it (the studio recomputes the ladder from
  `coherence`) or drop it (overfit substrate, J-inv-10). → **MODIFY/PRUNE**.

## (6) Glass six-layer composite present?

- **N/A at the component — CORRECT.** dot-flow-field is a procedural BACKDROP, not a glass
  surface; it paints behind glass, it is not glass-on-glass (glass-cannot-sample-glass).
  The six-layer composite is owed by the CARDS/DOCK/CHROME the demo PAGE composes OVER this
  field — a DEMO concern (the user's "glass demos over COLORFUL aurora backgrounds", "each
  sub-section in its own glassy card", "bigger main card", "leverage dock APIs"). Those are
  the `*-demo.md`/`*-design.md` siblings' scope, NOT this component file. The component
  correctly stays a clean transmissive backdrop with `pointer-events: none`.

---

## Mapping to the BD tranche

| # | Finding | Disposition | Wave |
|---|---|---|---|
| 1 | No route-enter bloom/fade — backdrop hard-cuts in | **AUGMENT** | NEW `BD.W-VIZ-ENTRANCE` (a shared suite opacity-bloom-in on arm; ≥2 consumers — every substrates viz) OR fold into the demo-chassis StoryHero entrance if the field mount rides the card |
| 2 | Parity is structural-proxy, not live Metal | rides existing | **BD.W-VIZ-PARITY-METAL** (dot-flow-field already enrolled — the live readback spec) |
| 3 | WebGL2 fragment fallback computes curl-fbm per empty-cell pixel | **AUGMENT** (tail-only) | NEW small clause on **BD.W-VIZ-PARITY-METAL** scope OR a `BD.W-VIZ-GL-FALLBACK-COST` micro-wave — coarse-reject before `sampleDisplacement`/drop curl in fallback |
| 4 | `useDotFlowField` triple-wired effective-config/onFrame | **MODIFY** | fold into **BD.W-BC-COMPONENT-CANON** (component-canon cleanup) — collapse to ONE `getConfig` getter |
| 5 | `coherence` config field inert (no runtime reader) | **MODIFY or PRUNE** | fold into **BD.W-BC-COMPONENT-CANON** / **BD.W-DISPOSITION-RESTAMP** — wire it (studio recomputes ladder) or drop (overfit) |
| 6 | Demo import label uses deep relative `../../../src/...` not the public subpath | **MODIFY** (demo, not component) | the user's "standardize the import-path label" — fold into the *-demo.md scope (`@mkbabb/glass-ui/dot-flow-field`) |
| 7 | Six-layer glass / glassy-cards / bigger main / dock APIs / colorful aurora bg | demo-scope | the `substrates-dot-flow-field-demo.md` + `-design.md` siblings (NOT this component) |

**No CLEAN-BREAK / no PRUNE of the component itself is warranted** — the BC retopology is
sound. The component findings are: 1 AUGMENT (entrance), 2 MODIFY (config-plumbing, inert
`coherence`), 1 tail-only AUGMENT (GL fallback cost), 1 rides-existing (parity). The rest is
demo/design scope.
