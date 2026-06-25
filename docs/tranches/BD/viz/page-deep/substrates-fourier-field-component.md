# Pass-E COMPONENT deep audit — substrates/fourier-field (`@mkbabb/glass-ui/fourier-field`)

**Page:** `demo/stories/substrates/fourier-field.vue` · **Import label:** `@mkbabb/glass-ui/fourier-field`
**Real src under audit (the COMPONENT, not the demo):**
- `src/components/custom/fourier-field/FourierField.vue` (the thin SFC — props → palette/spectrum resolve → `useFourierField`)
- `src/components/custom/fourier-field/composables/useFourierField.ts` (the public handle + the ONE `head_t` clock + the pointer wiring)
- `composables/fourierFieldWGPUSetup.ts` (WebGPU primary — compute → fullscreen-fragment two-pass)
- `composables/fourierFieldGLSetup.ts` (WebGL2 GLSL fallback — same SDF over the same evaluator)
- `composables/uniformBridgeWGPU.ts` (typed-struct uniform source-of-truth)
- `shaders/fourier-field.{compute,render}.wgsl.ts` + `shaders/fourier-field.glsl.ts`
- `math.ts` (pure DFT/epicycle evaluator — `partialSumAt`/`positionsAt`/`dftFromPoints`/`makeEllipticSpectrum`)
- `constants.ts` (the `FourierFieldConfig` schema + the WARM-IDENTITY default)

This component is **NOT Canvas2D**. It was MIGRATED to the WebGPU-first dual-substrate at BC.W-VIZ-FOURIER (`cb1e09fd`/`4bfc530b` "the procedural suite on WebGPU, all WARM-CREAM"). It composes `createGpuSubstrate` (the picker over the ONE `createCanvasLifecycle` leaf) — WGSL compute+fragment primary, WebGL2 SDF fallback. The Canvas2D renderer is RETIRED (no `useCanvas2D` import, no `getContext("2d")` anywhere in the dir).

---

## 1. ANIMATION affordance — STRONG, with ONE genuine gap

- **The reconstruction is the animation** — the `head_t ∈ [0,1)` clock advances per-frame inside the substrate `onFrame` hook (the ONE-clock discipline; no second rAF). The comet sweeps the partial-sum curve, the epicycle chain assembles/disassembles, the head halo leads a per-fragment-aged trail. This is high, real, math-driven motion — not a token shimmer.
- **The four-state interaction contract IS present** for a viz: `interactive` → pointer X SCRUBS `head_t` (left rewinds, right fast-forwards), a flick injects a velocity-continuous **momentum impulse** (`momentum = burst·4.0`) that **decays back to ambient speed** with an iOS fling settle (`momentum *= 0.92^(dt·60)`). The accel/burst terms read the SHARED `usePointerVelocityField` (BB.B4) — fed `tick(delta)` from the frame, no own rAF. This is the motion-canon interruptible/velocity-continuous register expressed correctly.
- **PRM is honored at the JS gate** — `respectReducedMotion` + `freeze` short-circuit to the deterministic `frozenT` (0.34); under reduce the loop paints ONE static frame then parks (the leaf's live `matchMedia` re-monitor). `pointer.tick(0)` keeps the scrub position-read but drops the momentum. Correct per the suite discipline + W-MOTION-CANON P6.
- **GAP — NO MOUNT/ENTRANCE animation (dead axis).** `grep` for `vReveal`/`data-reveal`/`useSpringMount`/`@keyframes`/`scroll-build`/`scroll-cascade` over the dir returns ZERO. The field POPS in at full opacity on mount — there is no spring-mount bloom, no `.scroll-build` gravity-rise, no fade-coupled entrance. Every other animated surface gets the entrance register; the headline substrate viz does not. The component is a fixed `inset:0` decorative host, so the entrance is the demo-chassis's to thread (W-PAGE-BACKGROUND / `.scroll-build`), but the COMPONENT exposes no `renderAt`-seeded reveal seam to cooperate. **MINOR**, chassis-owned.
- No jank: the only `transform`-on-host is none; the canvas is `pointer-events:none`; the status pill in the DEMO uses `backdrop-blur-sm` (demo concern, not the component).

## 2. PROCEDURAL-VIZ spec adherence — ADHERES, but the SUITE DOC IS STALE

- **Math is cited + single-source.** `math.ts` is the inverse-DFT epicycle sum `Σ c_k·exp(2πi·k·t)` (`partialSumAt`) + the forward DFT (`dftFromPoints`) + the procedural elliptic spectrum (dominant counter-rotating pair of UNEQUAL magnitude → a tilted ellipse, `1/order` falloff). Real Fourier-series math, named, GPU-agnostic. The WGSL compute kernel transcribes the SAME `partialSumAt` (no second math law) — parity `verified`.
- **GPU-only/Safari bar MET.** WebGPU-first (`useGpuSubstrate` picker, Baseline-newly-available June 2026 incl. Safari 26+); WebGL2 SDF fallback for the ~5-10% tail. Both backends splice the SHARED color chunk (`procedural-color.{wgsl,glsl}.ts` — OETF + Ottosson OKLCh matrices) so OKLCh math can NEVER drift cross-backend. Premultiplied-alpha (`srcFactor:one, dstFactor:one-minus-src-alpha`) over the transparent clear KILLS the additive `lighter` hue-blowout the old Canvas2D path fought.
- **Warm-identity default + presets-in-consumers FENCED.** `WARM_IDENTITY_PALETTE` is the `--viz-fourier` warm-amber (`{L:.62,C:.19,h:34}`), NOT teal; the cool/violet options read shipped `--viz-*` tokens; `proof:fourier-field` U5 reds a `oklch(...195)` teal literal. The R5-11 warm-anchored chain-hue band (`base−30°` root → `base+70°` tips, warm-biased mean) is LIVE in `fourier-field.render.wgsl.ts:65-72` + the `.glsl` fallback.
- **DOC DRIFT (the load-bearing finding).** `src/components/custom/PROCEDURAL-SUITE.md:75` STILL lists fourier-field as **"Canvas2D (`useCanvas2D`; `math.ts`) · demo studio per-preset (`fourier-studio.vue`) · DO NOT MIGRATE (now)"** — every clause is FALSE at HEAD: it IS migrated to compute+fragment WGSL; `fourier-studio.vue` does not exist (the demo is the merged `fourier-field.vue`). The W-FOURIER-GPU "booked" successor already FIRED at BC. `gpu-parity-table.md:121` correctly records the migration — so the SUITE index contradicts the parity table. The "DO NOT MIGRATE" verdict-with-reason became a silent stale row.

## 3. PERFORMANCE — compositor-clean, offscreen-parked

- **Compositor-only by construction** — the only animated thing is the GPU canvas paint; the host is `contain: layout style` + `content-visibility: auto`, no layout property animates, no JS transform on the host. No layout-thrash.
- **Offscreen-pause INHERITED for free** — the shared lifecycle leaf owns the 3-reason suspend Set (`document.hidden` + content-visibility `off-screen` + IntersectionObserver `off-screen-io`); the host's `content-visibility:auto` fires `contentvisibilityautostatechange` so a scrolled-away field attaches ZERO frames. The DEMO does not explicitly pass `useIntersectionPause`, but content-visibility covers the inset:0 decorative-host case (the IO path is the leaf's belt-and-braces). `pause`/`resume` exposed for the WCAG-2.2.2 `DockBackgroundToggle` seam.
- **DPR is consumer-owned + budget-capped** — both setups call `resolveBudgetDpr()` (the aurora sub-2×-DPR budget cap), not a raw `devicePixelRatio`. Storage buffers (phasor/curve/chain) re-upload ONLY on a spectrum source-swap (identity-tracked `syncSpectrum`); the per-frame cost is the uniform writes + one compute dispatch + one fullscreen draw. Few-to-dozens of phasors — trivially small (confirmed BD.W-VIZ-COMPUTE-DENSITY: no neighbor-bin / dense-count work owed).

## 4. SAFARI compatibility — GOOD

- WebGPU primary covers Safari 26+; the WebGL2 SDF fallback covers older Safari/iOS (the `setupGL` path is the genuinely-absent-tail). No backdrop-filter on the canvas itself (the canvas paints opaque pixels over a transparent clear). `device.lost` self-heal is in the WGPU leaf. No Safari-hostile API in the component path. The shared color chunk avoids any engine-specific color drift.

## 5. IDIOMATIC / no-legacy — CLEAN, minor seam notes

- No dual-path: Canvas2D fully RETIRED, the two surviving backends share ONE evaluator + ONE color chunk + ONE uniform bridge. The `variant:"hero"|"final"` prop was retired into config presets (MIGRATION row).
- The `resolveColorString` in `FourierField.vue` (var()/light-dark() un-wrap via `resolveTokenColor` + a paint-and-read) is the SAME AW.W13 seam aurora/blob use — idiomatic, not a fork. The pre-mount-unresolved guard (keep warm default, re-resolve `onMounted`) is correct.
- **Minor seam duplication (not legacy, but a DRY note):** the demo `fourier-field.vue` re-implements `resolveCss` + the 2-stop palette derivation (`palette` computed) that the COMPONENT already does internally in `refreshPalette`. The demo passes `getPalette` so the component's own derivation is bypassed. This is the demo's choice (it themes per-`--viz-*`), but it is the "each viz re-forks its configurator/palette" DRY-miss the addendum's W-CONFIG-GALLERY-DOCK names — the demo should route through `<VizStudio>`, not the COMPONENT's concern.
- The glass SIX-LAYER composite is **N/A to this component** — it is a procedural FIELD that paints behind glass (the substrate the glass refracts), not a glass surface itself. The six-layer composite is correctly the dock/card chrome's job; the field's job is to be a COLORFUL live backdrop the glass demos read over (exactly the user's "glass over a colorful aurora" ask — here, over the Fourier field).

## 6. Glass six-layer composite — N/A (field, not surface) — but feeds the ask

The component is the live colorful backdrop; it does not itself carry the 6-layer glass composite (correct). The user ask "glass demos over COLORFUL aurora backgrounds" is served by this field being a candidate `W-PAGE-BACKGROUND` per-category live viz — the field paints, the glass chrome (configurator/cards/dock) refracts it.

---

## Findings → FOLD/MODIFY/AUGMENT/PRUNE on the existing BD tranche

| # | Finding | Disposition | Wave |
|---|---|---|---|
| F1 | **PROCEDURAL-SUITE.md fourier row is STALE** (says Canvas2D/DO-NOT-MIGRATE/fourier-studio.vue; all false post-BC) — contradicts gpu-parity-table.md | **MODIFY** — re-stamp the row to `WebGPU (compute+fragment WGSL) / WebGL2 SDF fallback / MIGRATED at BC.W-VIZ-FOURIER`, and move W-FOURIER-GPU to "FIRED at BC" | folds into **BD.W-VIZ-PARITY-METAL** (the parity-doc freshness owner) or a doc-reconcile arm of **BD.W-PAGE-AUDIT-ALL** |
| F2 | **No mount/entrance animation** on the field (dead axis — no spring-mount/`.scroll-build` reveal; component exposes no reveal-seam to cooperate) | **AUGMENT** — the entrance is chassis-owned (the field is a fixed inset:0 host); thread `.scroll-build`/page-build over the staged field | **BD.W-PAGE-BACKGROUND** (the per-category live-field facility) |
| F3 | **Demo re-forks palette/`resolveCss` + the whole configurator** (the field's `getPalette`/`refreshPalette` bypassed; each viz re-forks) | **FOLD** — route fourier-field's demo through `<VizStudio>` (DRY the 5-viz configurator) | **BD.W-CONFIG-GALLERY-DOCK** (already names "blob/concentric/fourier-field/paper-grid each RE-FORK their configurator") |
| F4 | **The user's per-page layout asks** (each sub-section its own glassy card · bigger main card · dock-API contextual switching · glass over colorful field · standardized import label · tightened copy) | **FOLD** — the demo `fourier-field.vue` is exactly the W-CONFIG-GALLERY-DOCK + W-PAGE-BACKGROUND + W-HEADER-SCALE + W-PAGE-CHASSIS target; the import label `Substrates · @mkbabb/glass-ui/fourier-field` is ALREADY standardized (`fourier-field.vue:278`) | **BD.W-CONFIG-GALLERY-DOCK** + **BD.W-PAGE-BACKGROUND** + **BD.W-PAGE-CHASSIS** + **BD.W-HEADER-SCALE** |
| F5 | Component animation/perf/Safari/idiom — **PASS, no defect** | **KEEP** — no wave | — |

**No COMPONENT-src change is owed** — the FourierField component is architecturally sound (WGSL-primary dual-substrate, shared color chunk, one-clock, offscreen-park, PRM-freeze, warm-identity fenced, math single-source). Every actionable finding is a DOC re-stamp (F1) or a DEMO-CHASSIS fold (F2/F3/F4) already on the BD roster.

---

## 5-LINE VERDICT

1. **Component is HEALTHY** — FourierField is a WebGPU-first dual-substrate viz (compute→fragment WGSL primary, WebGL2 SDF fallback), NOT Canvas2D; one shared `partialSumAt` evaluator + one shared OKLCh color chunk, parity `verified`, premultiplied-alpha killing the old `lighter` blowout.
2. **Animation affordance is STRONG** — the `head_t` reconstruction clock + pointer-SCRUB + velocity-continuous flick-momentum (shared `usePointerVelocityField`) + PRM-freeze, the one-clock/no-second-rAF discipline held; the ONE gap is no mount/entrance reveal (chassis-owned, F2).
3. **Perf/Safari are CLEAN** — compositor-only, content-visibility offscreen-park inherited from the lifecycle leaf, budget-capped DPR, storage-buffers re-upload only on source-swap; WebGPU(Safari 26+) + WebGL2 fallback covers the tail.
4. **The load-bearing finding is a DOC drift** — `PROCEDURAL-SUITE.md:75` still calls fourier-field "Canvas2D / DO NOT MIGRATE / fourier-studio.vue" (all false post-BC.W-VIZ-FOURIER), contradicting the parity table → MODIFY the row (BD.W-VIZ-PARITY-METAL / BD.W-PAGE-AUDIT-ALL).
5. **All user layout asks are DEMO-CHASSIS folds, not component work** — bigger main card · per-section glassy cards · dock contextual-switching · glass-over-colorful-field · tightened copy fold into BD.W-CONFIG-GALLERY-DOCK + W-PAGE-BACKGROUND + W-PAGE-CHASSIS + W-HEADER-SCALE; the import label is already standardized; zero COMPONENT-src change owed.
