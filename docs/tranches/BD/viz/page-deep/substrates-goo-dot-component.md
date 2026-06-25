# Pass-E COMPONENT deep-audit — `substrates/goo-dot` (`<GooDotMatrix>`, the goo+dot HYBRID)

**Page:** `demo/stories/substrates/goo-dot.vue` (117 LOC) → bare `StoryPage`/`StorySection` + raw `<Switch>` toggles + one `ShowcaseFrame`.
**Component(s) audited (the `src/` layer, NOT the demo):**
- `src/components/custom/goo-dot-matrix/GooDotMatrix.vue` (the thin host)
- `composables/useGooDotMatrix.ts` (the renderer — substrate + shared field-sim + pointer field)
- `composables/{gooDotSetup,uniformBridgeWGPU,gooDotLattice}.ts`
- `shaders/goo-dot.{wgsl,frag}.ts` (the WGSL primary + WebGL2 dot-stamp twin)
- `constants.ts` (`GooDotConfig` + `DEFAULT_GOO_DOT_CONFIG`)

**Import label (standardize to):** `@mkbabb/glass-ui/goo-dot-matrix` (subpath-only, off the root barrel — correct per the procedural-viz precedent).
**Spec:** `PROCEDURAL-SUITE.md` row "goo-dot-matrix" (register **b** = the goo+dot HYBRID; `target="sdf"` in the dot-suite vocabulary).

---

## Verdict in one breath

The HYBRID IDEA is exemplary and the SHARED-SUBSTRATE discipline is the cleanest in the suite — it imports `sceneDistG` (field) AND `fibonacciDot` (sphere lattice) from its siblings, packs the field via the goo-blob SoT, runs ONE `createGpuSubstrate` over the ONE lifecycle leaf (offscreen-pause / live-PRM / `device.lost` self-heal inherited), feeds the shared `usePointerVelocityField` from the renderer frame (no own rAF), and is the suite's tidiest WGSL↔GLSL twin. The dot-stamp shader **slices `void main()` off the field** and writes its own cheap fragment, so it does NOT pay the goo-blob's 24-step `softShadow2D` raymarch (the W-BLOB-MULTICORE perf cliff does not bite this register — a genuine win). **BUT** the component carries ONE real defect that is no-legacy-FORBIDDEN: **two of its four advertised render registers (`dot-lattice` / `dot-sphere`) are DEAD CODE** — the `gooDotLattice.ts` math is exported but imported by zero renderer/shader code, the `cols`/`flowAmt` config atoms are never read, and the demo `VARIANTS` array OFFERS both variants while they silently fall through to `dot-field`. Everything else is small-refinement-or-demo-scope. The component is FOLD/PRUNE territory, dominated by the live `W-DOT-UNIFY` decision.

---

## 1. ANIMATION — four-state contract + spring physics + motion-canon

A procedural field is NOT a four-state interactive atom, so it owes no hover/press/focus contract — its "animation affordance" is the live field + the pointer reaction + the route-enter. Against THAT bar:

- **Field motion: HIGH.** The shared field-sim (mood transition + satellite orbit/merge/absorb + pointer-lean spring) is rich and reads as the gooey form flowing in dots. `shouldContinue()` correctly keeps the loop alive while ANY of {mood unsettled, pointer not at rest, satellites not quiescent, dot-push active/bloom decaying} holds — a proper demand loop, not a free-running rAF. **[SOUND]**
- **Pointer reaction: HIGH + idiomatic.** Three coupled legs done right: the FIELD-lean (goo-blob `uPointer` deformation — body+satellites+trail lean as one, KEEP), the LOCAL dot-cursor swell/brighten/shift (§T7 Metal dotted-bg idiom on the dot lanes), and the accel/flick BURST via the shared `usePointerVelocityField` (`tick(delta)` fed from the frame — the second-derivative made visible). PRM freezes via `tick(0)` + the substrate one-static-frame park. **[SOUND]**
- **MISSING — the route-enter bloom (AUGMENT).** The field HARD-CUTS in at full opacity on its first armed frame; there is no entrance bloom (an opacity/scale settle on `--spring-smooth` per motion-canon P3 fade-coupled-to-transform). Identical to the dot-flow-field component finding #7. Small, compositor-only, PRM→static-terminal. **→ AUGMENT** on the suite-wide viz-entrance fold (the `.scroll-build`/route-enter envelope the GESTALT names; ride the BD `W-VIZ-ENTRANCE`/redevelopment band — NOT a component-local one-off).
- **DEMO-SCOPE (not the component) — hard-cut preset switch.** The demo's `applyPreset` is an instant `Object.assign` (no cross-dissolve warm-cream↔mono-on-black on `--spring-smooth`). The COMPONENT supports a live cross-dissolve for free (its color watchers `wake()` the loop); the demo just doesn't drive it. **→ demo concern**, folds with the studio-chassis migration.

No dead/janky animation in the COMPONENT. (The dead `cols`/`flowAmt` config is a DEAD-CODE defect, §5, not an animation one.)

---

## 2. PROCEDURAL VIZ — PROCEDURAL-SUITE adherence + GPU-only/Safari bar

- **The hybrid idea matches the spec exactly.** `v = thickness(sceneDistG(cellCenter))` drives the dot grid (tixy.land applied to an SDF); field SPLICED byte-untouched from `metaball.{wgsl,frag}.ts` (the `MAIN_MARKER`/`FIELD_MARKER` slice); ONE color source (`samplePaletteOklch`), ONE dot AA canon (`fwidth`-feathered SDF circle). **[SOUND — spec-faithful]**
- **GPU-only / born-GPU: PASS.** WebGPU-first `setupWGPU` dot-stamp + WebGL2 `setupGL` dot-stamp fallback — both GPU, NO Canvas2D/CSS tier. Parity `verified` in the roster. Clean under the BD GPU-ONLY-SPINE mandate (no `useCanvas2D`/swraster to purge here). **[SOUND]**
- **Safari: PASS by construction.** The WebGL2 `.frag` twin IS the Safari path (Safari 26+ has WebGPU but the WebGL2 arm is the universal floor). The `fwidth` AA lives in `fs_main` ONLY (the dual-module WGSL-validation trap avoided, gpuweb#1795 precedent). The dot-stamp's per-cell single `sceneDistG` sample is the most rasterizer-stable shape in the suite (no per-frame derivative accumulation). **[SOUND]**
- **[DEAD] Register-B (`dot-lattice` / `dot-sphere`) is UNIMPLEMENTED.** The spec + README + `GooDotVariant` union + the demo all advertise four registers; the shaders + renderer implement TWO (`dot-field` via mode 0, `dot-dither` via mode 1). `dot-lattice`/`dot-sphere` map to NO `uDotMode`, read NO `cols`/`flowAmt`, import NONE of `gooDotLattice.ts` — they silently render as `dot-field`. **→ PRUNE or BUILD**, see §5/§FOLD.

---

## 3. PERFORMANCE — compositor-only / offscreen-pause / layout-thrash

- **Offscreen-pause: inherited clean.** `useIntersectionPause` (`rootMargin:200px`, `off-screen-io` key) + the SFC wrapper's `content-visibility:auto` + `contain:content` + the substrate's own content-visibility/visibility/PRM park. No own rAF. **[SOUND]**
- **No layout thrash.** The `resize()` closures read `clientWidth/clientHeight` and set `canvas.width/height` ONLY when changed (guarded); no per-frame layout reads, no CSS-driven reflow. `pointer-events:none` on the canvas. **[SOUND]**
- **The 24-step softShadow raymarch is NOT paid.** The goo-blob `metaball.frag` `main()` runs a 24-step `softShadow2D` (re-eval `sceneDistG` per step) — but the dot-stamp **slices `main()` off** and samples `sceneDistG` exactly ONCE per fragment at the cell center. So the W-BLOB-MULTICORE mobile-cliff (≈825 evals/frag with shadow+M-core) does NOT apply to goo-dot's default register. The field is still the full smin-over-satellites SDF (the FBM-warped membrane + N satellites + trail loop), one eval — cheap. **[SOUND — better than the blob it borrows from].** WATCH: if `W-BLOB-MULTICORE` raises the satellite/core cap, the per-fragment field eval scales linearly here too — fold goo-dot into the same DPR/cap budget (`W-VIZ-PERF-BUDGET`).
- **MINOR (MODIFY) — `resolveBudgetDpr()` called 2× per WGPU frame** (once in `packGooDotUniforms`, once in the dot-buffer write path) and the GL path recomputes it inside `frame()`. Cheap, but idiomatically a single per-frame DPR read. **→ MODIFY** (micro).

---

## 4. SAFARI compatibility

Covered in §2 — **PASS**. The WebGL2 dot-stamp twin is the binding Safari path; `fwidth` is `fs_main`-scoped; the field splice keeps the OETF/OKLCh matrices that already ship cross-engine in the goo-blob. No `backdrop-filter`/`mask-composite` in the canvas path (the glass card around it is the consumer's, not the viz's). The only Safari-relevant risk is shared with the whole suite (premultiplied-alpha + `clearValue a:0` over a glass card — the additive `srcFactor:"one"` blend is correct for premultiplied output here).

---

## 5. IDIOMATIC / no-legacy — workarounds, dead code, dual-path

- **[DEAD-CODE — the load-bearing finding] `dot-lattice` / `dot-sphere` + `gooDotLattice.ts` + `cols`/`flowAmt`.** `gridOrigin`/`latticeInstanceCount`/`fibonacciDot` are exported from `index.ts` and `gooDotLattice.ts` is a clean leaf — but grep confirms ZERO renderer/setup/shader import of any of them. The Register-B "instanced lattice/sphere" path the README §Registers + the spec describe was never wired. This is the exact dual-path/shelf-ware the W-PRUNE-CONSOLIDATE `proof:no-dual-path` floor forbids (a primitive minted without a live consumer). The `GooDotVariant` union, the demo `VARIANTS` array, and the constants `cols`/`flowAmt` are all promises the renderer doesn't keep. **DECIDE: PRUNE** (collapse `GooDotVariant` to `"dot-field" | "dot-dither"`, delete `gooDotLattice.ts` + `cols`/`flowAmt` + the dead exports + the demo's two dead `VARIANTS` entries) **OR BUILD** (wire the instanced Register-B). Given `W-DOT-UNIFY` (below), PRUNE is correct — the instanced lattice/sphere is the UNIFIED `<DotMatrix projection>` axis's job, not a re-fork here.
- **[DEAD-PARAM] `pointerModeSign(config.pointerMode)` is `void`-called in `resolveFrame`** "to keep the type-graph honest" — a code smell papering over the fact the WGPU path packs pointer-mode in `packGooDotUniforms` while the GL path passes it through `dU.pm`. Reconcile to one read. **→ MODIFY** (folds into unify).
- **IDIOMATIC elsewhere.** No `@/` alias (relative imports — correct), named exports only, the carve to `gooDotSetup.ts` (the 500-line no-god-module drain) is byte-faithful, the SoT extend (dot lanes on binding1) keeps the field struct byte-identical. The component is otherwise a model of the compose-don't-fork discipline.

---

## 6. The glass six-layer composite

**N/A to the COMPONENT — correctly.** `<GooDotMatrix>` is a procedural BACKDROP (a transparent-ground dot field), not a glass surface; glass-cannot-sample-glass means the viz is the COLORFUL thing glass demos sit OVER. The six-layer composite is owed by the demo PAGE's CARDS, not this component (the user's "glass demos over colorful aurora backgrounds" bar is a DEMO concern — the page must wrap the field in a glassy card stack and the field must read as a colorful substrate). The component's job is to BE that substrate; it does (the warm-cream default reads, the near-dark preset is a demo preset). **[CORRECT separation]**

---

## FOLD/MODIFY/AUGMENT/PRUNE — mapped to the BD tranche

| # | Finding | Disposition | BD wave |
|---|---|---|---|
| 1 | `dot-lattice`/`dot-sphere`/`gooDotLattice.ts`/`cols`/`flowAmt` = DEAD CODE (Register-B never wired) | **PRUNE** (collapse union to field+dither; the instanced lattice/sphere is the unified primitive's axis) | **`W-DOT-UNIFY`** (D4 — goo-dot `target="sdf"` folds onto `<DotMatrix projection×target>`; the dead lattice evaporates into the real `projection="grid|sphere"` axis). The interim de-fork rides `proof:no-dual-path` |
| 2 | The whole component → ONE configurable `<DotMatrix>` (`target="sdf"`) — the suite's tidiest already-DRY consumer | **FOLD** | **`W-DOT-UNIFY`** (the hybrid is the EASIEST fold — it already imports `sceneDistG`+`fibonacciDot`; clean break onto `/dot-matrix`, MIGRATION row, retire `/goo-dot-matrix` subpath + `tests-visual/goo-dot.spec.ts`) |
| 3 | No route-enter bloom (field hard-cuts in at full opacity) | **AUGMENT** | the suite-wide viz-entrance envelope (the redevelopment band's `.scroll-build`/route-enter fold; NOT component-local) |
| 4 | `pointerModeSign` `void`-call + double-read across WGPU/GL paths; `resolveBudgetDpr` called 2×/frame | **MODIFY** | **`W-DOT-UNIFY`** (one pointer-mode read + one DPR read in the unified packer) |
| 5 | Field eval scales with satellite/core cap if blob multicore lifts it | **WATCH/FOLD** | **`W-VIZ-PERF-BUDGET`** (DPR/context/eval budget) + `W-BLOB-MULTICORE` cap coordination |
| 6 | Demo page (flat shape, no VizStudio/Configurator, no dock APIs, small card, dead `VARIANTS`, superfluous copy, import label) | **demo-scope** | the demo-redevelopment fold (same systemic Band-16/17 pattern as dot-flow-field demo #2–#9) + standardize the import label to `@mkbabb/glass-ui/goo-dot-matrix` |

**Sequencing note:** every component finding except #3 (entrance) is SUBSUMED by `W-DOT-UNIFY`. The dead Register-B (#1) should NOT be hand-pruned in isolation then re-folded — `W-DOT-UNIFY` deletes goo-dot's three-dir footprint wholesale and re-expresses `dot-field`/`dot-dither` as `target="sdf"` on the unified primitive, with `projection="grid|sphere"` becoming the REAL (not dead) lattice axis. Hand-pruning first is wasted motion. The ONLY pre-unify-eligible item is the entrance bloom (#3), which lands on the unified primitive anyway.

---

## 5-line verdict

1. The HYBRID idea + shared-substrate discipline are exemplary — imports `sceneDistG`+`fibonacciDot`, packs via the goo-blob SoT, ONE substrate/lifecycle/pointer-field/color-source, the suite's cleanest WGSL↔GLSL twin; and the dot-stamp slices `main()` off so it does NOT pay the goo-blob's 24-step softShadow raymarch (a real perf win).
2. ONE load-bearing defect: `dot-lattice`/`dot-sphere` are DEAD CODE — `gooDotLattice.ts`+`cols`+`flowAmt`+the two `GooDotVariant` members are exported/advertised/demo-offered but imported by zero renderer code (silent fall-through to `dot-field`) — the no-legacy/no-dual-path violation. → PRUNE (or BUILD), resolved by the unify.
3. ANIMATION is HIGH (rich field-sim + three-leg pointer reaction + accel-burst via the shared field + PRM freeze); the one gap is a missing route-enter bloom → AUGMENT on the suite entrance fold.
4. PERFORMANCE/SAFARI/GPU-only all PASS — offscreen-pause+content-visibility inherited, no layout thrash, born-GPU dual-backend, `fwidth` in `fs_main` only, Safari-floor WebGL2 twin; the six-layer glass composite is correctly N/A (the viz is the substrate glass sits over).
5. DISPOSITION: the whole component FOLDS onto the unified `<DotMatrix target="sdf">` (`W-DOT-UNIFY`, D4 — the easiest fold in the family, already cross-importing) which also evaporates the dead Register-B into the real `projection` axis and reconciles the pointer-mode/DPR micro-defects; only the entrance bloom (`W-VIZ-ENTRANCE`) and the demo-page redevelopment ride separately.
