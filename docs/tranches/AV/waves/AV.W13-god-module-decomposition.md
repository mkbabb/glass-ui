# AV.W13 - God-Module Decomposition

**Name**: W13 - God-Module Decomposition
**Opens after**: AV.W2 (the shared `procedural-color.glsl.ts` chunk MUST exist first — W13's GLSL medium/composition/tonemap split COMPOSES from that chunk; it does NOT re-extract the noise/OETF/matrix math W2 owns). W13 cannot open before W2's atomic commit + preset re-bake are green.
**Agents**: 5 parallel (one writer per god-module; the five target trees are file-disjoint — see §4a)
**Hard gate**: one NEW born-RED gate green (`proof:no-god-module` — no `src/` `.ts`/`.vue` file >500 lines); `npm run typecheck` + `npm run build` green; every existing test passes unchanged (behaviour-preserving refactor); the aurora preset snapshots + blob snapshots byte-stable (the GLSL split is a template-literal splice — character-equivalent emit); the carousel-progress break fixed by a surfaced prop-boundary contract (manual browser verify recorded in `PROGRESS.md`).
**Status**: planned

## Goal criterion

W13 succeeds if NO file under `src/` exceeds 500 lines when work ends — the five named god-modules (aurora.frag 819, useSortable 659, Progress.vue 649, runtime 530, metaball 282-but-conflated) are each split into cohesive sub-modules owning ONE responsibility seam apiece, with no behaviour change (snapshots + tests stable) and the carousel-progress misuse refused out loud by a prop-boundary contract rather than silently computing a zero-fill.

## Scope

1. Split `aurora.frag.ts` (819) into the cohesive GLSL fragment string-modules — composition, the four mediums as PEERS (no crayon special-case branch), the brush/stroke primitive, the tonemap/grain — each composed via template-literal splice atop W2's shared `procedural-color.glsl.ts` chunk. Character-equivalent emit.
2. Split `useSortable.ts` (659) into the five cohesive composable services — drag-state controller, collision/measure, snap physics, touch-gesture resolver, visual-transition timing — leaving a thin `useSortable` orchestrator.
3. Split `Progress.vue` (649) into the three variant sub-components (default / gradient / sectioned) + a geometry service, behind a thin dispatcher carrying the prop-boundary contract; DIAGNOSE + FIX the carousel-progress break (the silent `sectionedAggregateValue` override of `modelValue`).
4. Split `runtime.ts` (530) into the four seams — uniform bridge, cursor state, render-demand gate, GL lifecycle — atop the `useWebGLCanvas` substrate, leaving a thin lifecycle orchestrator.
5. Split `metaball.frag.ts` (282, under-500-but-conflated) into the SDF-core, the watercolor-edges, the OKLCh perturbation, the gamma — coordinated with W2's shared chunk (the shared OETF/matrices/noise come FROM the chunk; W13 splits only the blob-LOCAL SDF + edge + perturbation seams).
6. Author the born-RED `proof:no-god-module` gate (every `src/` `.ts`/`.vue` file ≤500 lines; warn at 300; bite: a file grows past 500 → RED).

## 3a. Triumvirate Dispatch

A triumvirate (research + plan augment + redress) is mandatory — the orchestrator may NOT redispatch the failing unit alone — when:

- **File-bounds expansion that invalidates the wave**: a GLSL splice produces a syntactically-broken shader whose link fails on the live WebGL2 context AND the fix requires editing W2's chunk source (not a W13-local splice-order tweak); a Progress variant extraction that needs a NEW prop on the shared dispatcher boundary beyond the diagnosed misuse set; a useSortable service split that forces a public `useSortable` return-shape change (the return shape is a consumer contract — a change escalates).
- **Hard-gate failures NOT local-edit-recoverable**: `proof:no-god-module` stays RED because a target's irreducible cohesive core genuinely exceeds 500 lines after a single honest split (the seam is wrong — re-derive the seam, do not line-slice); a snapshot diff that is NOT a re-bless candidate (the GLSL split changed the emitted field — the splice corrupted a stage, not a sanctioned reconciliation).
- **Diagnostic loops whose third iteration must halt**: a carousel-progress fix that survives three contract-shape iterations without the manual browser verify going green; a metaball seam split that survives three splice positions still re-declaring a chunk-owned symbol.

## 4. File Bounds

| File | Access |
|---|---|
| `src/components/custom/aurora/constants/shaders/aurora.frag.ts` | modify-carve |
| `src/components/custom/aurora/constants/shaders/composition.glsl.ts` | create |
| `src/components/custom/aurora/constants/shaders/flow.glsl.ts` | create |
| `src/components/custom/aurora/constants/shaders/brush.glsl.ts` | create |
| `src/components/custom/aurora/constants/shaders/mediums.glsl.ts` | create |
| `src/components/custom/aurora/constants/shaders/tonemap.glsl.ts` | create |
| `src/components/custom/aurora/constants/shaders/main.glsl.ts` | create |
| `src/composables/sortable/useSortable.ts` | modify-carve |
| `src/composables/sortable/dragController.ts` | create |
| `src/composables/sortable/dropResolver.ts` | create |
| `src/composables/sortable/ghostRenderer.ts` | create |
| `src/composables/sortable/touchGate.ts` | create |
| `src/composables/sortable/transitionTiming.ts` | create |
| `src/components/ui/progress/Progress.vue` | modify-carve |
| `src/components/ui/progress/ProgressDefault.vue` | create |
| `src/components/ui/progress/ProgressGradient.vue` | create |
| `src/components/ui/progress/ProgressSectioned.vue` | create |
| `src/components/ui/progress/useProgressGeometry.ts` | create |
| `src/components/ui/progress/index.ts` | modify |
| `src/components/custom/aurora/composables/runtime.ts` | modify-carve |
| `src/components/custom/aurora/composables/glSetup.ts` | create |
| `src/components/custom/aurora/composables/uniformBridge.ts` | create |
| `src/components/custom/aurora/composables/cursorModel.ts` | create |
| `src/components/custom/aurora/composables/frameLoop.ts` | create |
| `src/components/custom/goo-blob/shaders/metaball.frag.ts` | modify-carve |
| `src/components/custom/goo-blob/shaders/sdf-body.glsl.ts` | create |
| `src/components/custom/goo-blob/shaders/watercolor-edges.glsl.ts` | create |
| `src/components/custom/goo-blob/shaders/oklch-perturb.glsl.ts` | create |
| `scripts/gates.mjs` | modify |
| `package.json` | modify |
| `docs/tranches/AV/PROGRESS.md` | modify |

Do NOT touch: `docs/precepts/`, `src/composables/glass/webgl/shaders/procedural-color.glsl.ts` (W2 owns the shared chunk — W13 imports + splices it, never edits it), the aurora/blob snapshot fixtures except as a sanctioned re-bless, any file outside the five target trees.

## 4a. Disjointness

The five agent units write five disjoint trees: `aurora/constants/shaders/` (W13.a), `composables/sortable/` (W13.b), `ui/progress/` (W13.c), `aurora/composables/` (W13.d), `goo-blob/shaders/` (W13.e). No two units share a `modify` or `modify-carve` path. The shared `scripts/gates.mjs` + `package.json` registration is APPEND-ONLY to disjoint rows — the orchestrator integrates the gate registration at close (the five units do NOT each edit `gates.mjs`; the gate-author unit, folded into W13.a, owns it; the other four merely satisfy it). W13.a (aurora-frag GLSL) and W13.e (metaball GLSL) both COMPOSE from W2's chunk but each writes only its own tree — no shared write. No two parallel waves write any W13 path.

## 4b. Worktree Plan

| Agent unit | Sibling worktree absolute path | CARGO_TARGET_DIR |
|---|---|---|
| AV.W13.a | `/Users/mkbabb/Programming/glass-ui-w13a` | n/a (Node repo, no Cargo) |
| AV.W13.b | `/Users/mkbabb/Programming/glass-ui-w13b` | n/a |
| AV.W13.c | `/Users/mkbabb/Programming/glass-ui-w13c` | n/a |
| AV.W13.d | `/Users/mkbabb/Programming/glass-ui-w13d` | n/a |
| AV.W13.e | `/Users/mkbabb/Programming/glass-ui-w13e` | n/a |

The orchestrator runs `git worktree list` + `git worktree add` before dispatch; all five branch from a clean W2-green main.

## 5. Agent Units

### AV.W13.a Aurora-frag GLSL fragment set + the gate

- Goal: `aurora.frag.ts` drops under 500 lines by externalizing its GLSL into cohesive `.glsl.ts` partials composed by template-literal splice, with crayon a PEER medium not a special-case branch, and the emitted shader string character-equivalent.
- Mechanism: carve the 819-line literal into `composition.glsl.ts` (`nucleiField` softmax-Gaussian + `samplePalette` LUT + palette drift — IN: warped UV + time, OUT: `(paletteId, valueMod)`), `flow.glsl.ts` (`flowField` pattern dispatch radial/swirl/diagonal/multi + curl + cursor influence), `brush.glsl.ts` (the `curvedStroke`/`paintOver` swept-brushstroke primitive), `mediums.glsl.ts` (`mediumWatercolor`/`mediumPastel`/`mediumOil`/`mediumCrayon` as PEERS — crayon stops being `strokeMode==2` inside `mediumOil` and becomes a `mediumCrayon()` dispatched at `main()` level), `tonemap.glsl.ts` (`aces` + film grain — IN: linear color + frag coord + time, OUT: final), and `main.glsl.ts` (the pure pipeline `domainWarp → nucleiField → samplePalette → mediumDispatch → saturate → tonemap → output`, each stage a call). `aurora.frag.ts` becomes the assembler: it imports W2's `procedural-color.glsl.ts` chunk (the noise/FBM-rot/OETF half) + the new partials + the uniform block, and template-splices them into one source string. The `hash21`/`vnoise`/`fbm`/`domainWarp` already-shared math comes FROM W2's chunk — W13.a does NOT redefine it. Also author `proof:no-god-module` in `gates.mjs` + register it in `package.json`.
- Files: `aurora.frag.ts` (modify-carve), the six new `*.glsl.ts` partials (create), `scripts/gates.mjs` (modify), `package.json` (modify).
- Sub-gate: `aurora.frag.ts` + every new partial ≤500 lines; `proof:no-god-module` born-RED→green; the 11 aurora preset snapshots byte-stable (emit character-equivalent); `npm run build` emits the shader with all partials inlined; both shaders compile + link on a live WebGL2 context.

### AV.W13.b Sortable cohesive services

- Goal: `useSortable.ts` drops under 500 lines as a thin orchestrator composing five single-concern services, with the public `useSortable` return shape unchanged.
- Mechanism: extract `dragController.ts` (the `_dragId`/`_pos`/`_dropIndex` lifecycle + `beginDrag`/`onPointerMove`/`onPointerUp`/`endDrag` + cross-list routing — the drag-state controller), `dropResolver.ts` (`resolveDropIndex`/`resolveDropIndexIn`/`findForeignTarget` — pure collision/measure math over the elements-map, no DOM mutation; unifies the local-drop vs foreign-drop index duplication), `ghostRenderer.ts` (`createGhost`/`updateGhost`/`destroyGhost` + `resolveVisibleRadius` DOM-walk — the snap-physics + ghost visual), `touchGate.ts` (the touch-gesture resolver + `targetIsHandle` + the `setPointerCapture` optimization, surfacing `pointerCaptureActive` per AV.W1.1b — capture is the optimization, document listeners the unconditional primary path), `transitionTiming.ts` (`flagsFor` + drop-class/visual-transition timing). `useSortable` retains `registerItem` + composes the five. `isNonZeroRadius` stays a standalone exported util.
- Files: `useSortable.ts` (modify-carve), the five new service modules (create).
- Sub-gate: `useSortable.ts` + every new service ≤500 lines; the sortable test suite passes unchanged; the public `useSortable` / `InstanceHandle` return shape is byte-identical (no consumer rename); `npm run typecheck` green.

### AV.W13.c Progress variant components + carousel-progress fix

- Goal: `Progress.vue` becomes a thin dispatcher under 500 lines over three variant SFCs + a geometry service, AND the carousel-progress break is fixed by a prop-boundary contract that refuses the misuse out loud.
- Mechanism: carve the three orthogonal designs (the tell is the `variant ===` re-check across six computeds, lines 143–265) into `ProgressDefault.vue` (plain rail + `translateX(-%)` intake-pulse), `ProgressGradient.vue` (the three motion layers intake-pulse/crescendo/discharge + indeterminate sweep + its scoped CSS), `ProgressSectioned.vue` (per-cell rendering, seams, spring, `SectionedCell`/`cells`/`sectionedAggregateValue` + its scoped CSS), and `useProgressGeometry.ts` (derives per-cell width/start/end/state from the `segments` array). Root `Progress.vue` becomes a dispatcher with an EXPLICIT prop-boundary contract: throw (dev) / `console.error` on the incompatible combos — `segments` on a default/gradient variant, `modelValue`-as-truth on a sectioned variant, `indeterminate` + `sectioned`. The silent `sectionedAggregateValue` override of `modelValue` becomes a hard error. Retire the `disableCrescendo` opt-out prop (it is a post-hoc override of the gradient variant — distinct variant composition replaces it). Update `index.ts` exports.
- Files: `Progress.vue` (modify-carve), the three variant SFCs + `useProgressGeometry.ts` (create), `index.ts` (modify).
- Sub-gate: `Progress.vue` + every variant SFC + the geometry service ≤500 lines; the Progress story + tests pass; the carousel-progress misuse throws/logs in dev (manual browser verify recorded); no `variant ===` re-check repeated >1× in a single computed chain.

### AV.W13.d Aurora runtime seams

- Goal: `runtime.ts` drops under 500 lines as a thin lifecycle orchestrator composing the four seams atop `useWebGLCanvas`.
- Mechanism: extract from the inline `createAurora` closure — `glSetup.ts` (`compile`/`link`, VAO/buffer creation, the `UNIFORM_NAMES` location cache → `{ program, uniforms, geometry }`; const-assertion builder so a new `UNIFORM_NAMES` entry REQUIRES a cache slot), `uniformBridge.ts` (`uploadConfig` + the `MEDIUM_ID`/`FLOW_ID`/`WARP_ID`/`STROKE_MODE_ID` maps replaced by sealed `as const` discriminated dispatch — kills the bare-numeric `mode === 1` comparisons; pre-allocated uniform buffers live here — the uniform bridge), `cursorModel.ts` (the `CURSOR_POS_LERP`/`CURSOR_STRENGTH_LERP`/`CURSOR_DECAY_PER_FRAME`/`CURSOR_REST_EPSILON` constants + `advanceCursor` — the cursor state, exported once so CPU mirrors import rather than re-declare), `frameLoop.ts` (`drawFrame`/`needsAnimation` as a pure `FrameLoopState` over `{ cursor, config, reducedMotion }` — the render-demand gate). `runtime.ts` becomes the GL-lifecycle orchestrator composing these atop the `useWebGLCanvas` substrate. The Y-flip (`flipY(y) => 1 - y`) replaces the inline `AUTHOR_Y_ORIGIN_IS_TOP` flips.
- Files: `runtime.ts` (modify-carve), the four new seam modules (create).
- Sub-gate: `runtime.ts` + every new seam ≤500 lines; the aurora runtime tests pass; the aurora renders identically on a live WebGL2 context (manual verify); `npm run typecheck` green.

### AV.W13.e Metaball seam split

- Goal: `metaball.frag.ts` drops its conflated SDF + edge + perturbation + gamma into cohesive partials, sharing W2's chunk for the OETF/matrices/noise.
- Mechanism: the shared `srgbToLinear`/`linearToSrgb`, the four Ottosson OKLCh matrices, `FBM_ROT`, and `valueNoise` come FROM W2's `procedural-color.glsl.ts` chunk (W2 already deletes them locally). W13.e splits the blob-LOCAL conflation into `sdf-body.glsl.ts` (`sdCircle`/`smin` metaball field — the SDF-core), `watercolor-edges.glsl.ts` (the FBM-displaced organic edge), and `oklch-perturb.glsl.ts` (the per-pixel OKLCh perturbation + `gamutClampOklch`). The gamma close-the-seam stays sourced from the W2 chunk. `metaball.frag.ts` becomes the assembler splicing the W2 chunk + the three local partials.
- Files: `metaball.frag.ts` (modify-carve), the three new `*.glsl.ts` partials (create).
- Sub-gate: `metaball.frag.ts` + every new partial ≤500 lines; the `metaball-color.glsl-port` + `blob-color-equivalence` tests pass unchanged; the blob snapshots byte-stable; the blob compiles + links on a live WebGL2 context.

## 6. Hard Gate

1. `proof:no-god-module` (born-RED — aurora.frag is 819 at open) green: an AST/line-count scan asserts no `src/` `.ts`/`.vue` file (excluding `__tests__/` and any concatenated build output) exceeds 500 lines; warns at 300. Bite: a file grows past 500 → RED. Verified by `npm run proof:no-god-module`.
2. `npm run typecheck` green (`vue-tsc --noEmit`).
3. `npm run build` green — emits both shaders with all partials inlined; the dts + per-subpath chunks unchanged.
4. Every existing test passes unchanged — the sortable suite, the Progress story/tests, the aurora runtime tests, the `metaball-color.glsl-port` + `blob-color-equivalence` equivalence ports (behaviour-preserving refactor; no re-bless unless §3a-sanctioned, which the GLSL split is NOT — it is character-equivalent emit).
5. The 11 aurora preset snapshots + the blob snapshots are byte-stable (the GLSL split is a template-literal splice — the emitted shader string is character-equivalent to the hand-inlined original modulo the splice boundary).
6. The carousel-progress break is fixed: the carousel wires `gradient`/`default` (never `sectioned`); the prop-boundary contract refuses a `segments`-on-non-sectioned / `modelValue`-as-truth-on-sectioned misuse out loud, so the silent `sectionedAggregateValue` zero-fill can no longer paint. Manual browser verify recorded in `PROGRESS.md`.
7. Both shaders compile + link on a live WebGL2 context (the splice cannot leave a re-declared symbol or a scope collision). Manual verify recorded.

## 7. Format And Lint Cadence

`npm run typecheck` + `npm run build` after each unit's integration batch and before wave close. `npm run proof:no-god-module` after each split lands. `git diff --check` on the doc/status commits. Prettier (the repo formatter) runs on every touched `.ts`/`.vue`/`.mjs` before close.

## 8. Verification Artefacts

- `npm run proof:no-god-module` green-run output (the line-count table per target, all ≤500) saved to `docs/tranches/AV/PROGRESS.md`.
- `npm run typecheck` + `npm run build` green-run ids in `PROGRESS.md`.
- The aurora + blob snapshot byte-stability diff (empty) recorded.
- The carousel-progress before/after manual-browser screenshots + the contract-throw console capture in `PROGRESS.md`.
- The WebGL2 compile+link manual-verify note (both shaders) in `PROGRESS.md`.

## 9. Commit Plan

- Five agent-owned implementation commits (one per worktree): `refactor(tranche-AV): W13 (aurora-frag) — GLSL fragment set + crayon peer medium`, `refactor(tranche-AV): W13 (sortable) — five cohesive services`, `refactor(tranche-AV): W13 (progress) — variant SFCs + carousel-progress contract fix`, `refactor(tranche-AV): W13 (runtime) — four GL seams`, `refactor(tranche-AV): W13 (metaball) — SDF/edge/perturb seams`. Each carries a body naming the seams + the line-count drop.
- One orchestrator integration commit folding the `gates.mjs` + `package.json` `proof:no-god-module` registration + the five trees: `chore(tranche-AV): W13 — integrate god-module decomposition + no-god-module gate`.
- One status commit: `docs(tranche-AV): W13 close — god-module decomposition + carousel-progress fix`.

## 10. Dependencies

- **Depends on**: AV.W2 (the shared `procedural-color.glsl.ts` chunk — W13.a + W13.e SPLICE it; W13 must not re-extract the noise/OETF/matrix math). AV.W1 (the aurora OETF lands first, then W2 de-dups it into the chunk — W13's aurora-frag split assumes the chunk-sourced OETF).
- **Blocks**: AV.W6 (gates-close — `proof:no-god-module` joins the `npm run proof:all` aggregate; the gates-close wave cannot certify the full gate set until W13's gate is registered + green).

## 11. Archaeology

Not a revisit. First god-module-decomposition pass. (The legacy-architecture-digest's W2 GOD-MODULE DECOMPOSITION sketch is the seam source; W13 is the executable, file-bounded form of that sketch, split into five disjoint parallel writers and coordinated with the AV.W2 shared-chunk dependency.)
