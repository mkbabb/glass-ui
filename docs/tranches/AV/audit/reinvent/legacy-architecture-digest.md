# Legacy-excision + architecture synthesis (28-agent)

KEY DISTINCTION: genuine @supports progressive-enhancement fallbacks are BEFITTING (kept, Baseline-gated); silent error-swallowing gets FAIL-EXPLICIT. God-modules: aurora.frag 819, useSortable 659, Progress 649, runtime 530, metaball 282.

All major claims verified. I have enough ground truth to produce the wave specs. The audit is accurate on every point I checked: PRNG is genuinely duplicated (only the comment and watercolor-dot's extra `randomRadii`/`radiiToCSS` helpers differ), the ID maps and Y-flip dups are real, the root barrel still exports the 4 slated packages, the `setPointerCapture` silent catch exists, Progress re-checks `variant` in 6+ computeds, and `getSchedulerPostTask` is a function-level accessor over a top-level guard.

---

# AV REFACTOR WAVE SPECS — Legacy Excision + Architecture Refactor

Synthesized from the 16-lane audit, ground-truthed against HEAD. Four waves under `docs/tranches/AV/`. House precepts: no-legacy, no-backwards-compat, KISS, gestalt-over-patch, fail-explicit. Every gate is a fail-closed node added to `scripts/gates.mjs` (local + CI + release aggregates).

A cross-cutting distinction governs the whole tranche: **feature-detected progressive enhancement is NOT legacy.** A native-vs-fallback split where both arms are correct and the platform genuinely lacks the API (View Transitions, `scheduler.postTask`, `scheduler.yield`, scroll-driven CSS, `:has()`, `backdrop-filter`, `position-anchor`) stays — but it must become a **surfaced** capability, not a silent one. The legacy-excision target is the *silent* path: empty catches, `??`-into-default DI, `as any`, `-webkit-` live+dead pairs, and historical commentary in production code. The two are separated in W1 so we don't excise load-bearing platform guards.

---

## Wave AV.W1 — LEGACY EXCISION (excise-or-fail-explicit)

**Scope.** Every `legacy` / `workaround` / `special-case` / silent `fallback-or-fallthrough` finding across all 16 lanes. Each is dispositioned to exactly one of three buckets: **EXCISE** (delete dead code outright), **FAIL-EXPLICIT** (replace silent swallow with a thrown error or a surfaced `degraded`/`isNative` flag), or **KEEP+SURFACE** (load-bearing platform guard — retain the fallback but expose the capability and document the contract). No silent path survives.

### Units

**1a — Root-barrel excision (lane: legacy-sweep-custom-2).** Remove `instrument-chassis`, `instrument-rail`, `glyph-face`, `disco-glyph` from `src/index.ts` (lines 133–136) and `header-ribbon` if still reachable. These fail the cherry-pick acceptance bar (don't compose with `ui/` primitives) yet sit in the vueuse-free root barrel. **No deprecation grace, no alias** (per no-backwards-compat). They keep their dedicated subpaths (`/glyph-face`, etc.) — that's the canonical reach. Strip their re-exports from `src/api/index.ts` (`InstrumentChassisPhase`, `HeaderRibbonProps`, …). Migration: one-line import rename per consumer, documented in CHANGELOG.md.

**1b — Sortable `setPointerCapture` silent catch → KEEP+SURFACE (lanes: sortable-godmodule, fail-explicit-policy).** The empty catch at `useSortable.ts:404–408` is befitting (capture is an optimization; document listeners are the real path) but invisible. Make document listeners the **primary, unconditional** path; attempt `setPointerCapture` as a pure optimization; on failure set a returned `pointerCaptureActive: Ref<boolean>` to `false` (no console noise in prod, dev-warn once). The catch stops being a swallow and becomes a surfaced state. Land this *with* the W2 DragController extraction.

**1c — `useClipboard` silent `false` → FAIL-EXPLICIT (lane: fail-explicit-policy).** `copy()` returns bare `false` on both API and `execCommand` failure with no reason. Thread `onCopyError(reason: 'clipboard-api' | 'exec-command' | 'no-api')` through options and return `{ ok, reason }`. `execCommand` itself stays (KEEP — it's the legacy-browser arm) but is now a *named, reported* fallback, not a silent one.

**1d — `useGlobalDark` one-shot silent seed → FAIL-EXPLICIT (lanes: effusive-dynamism, fail-explicit-policy).** First call locks `initialValue`; later conflicting calls are silently ignored in prod (dev-warn only). Replace with a hard `throw` on a *conflicting* second seed (matching seeds are no-ops). A misconfigured consumer learns immediately. Aligns with the createGlobalState singleton constraint without hiding it.

**1e — Aurora `surfaceInitError` contract → FAIL-EXPLICIT (lanes: aurora-runtime, fail-explicit-policy).** Deferred init re-throws on the microtask queue when no `onInitError` is supplied. Keep the behavior but make the contract loud: JSDoc states the three required consumer paths (`onInitError` | Vue `errorHandler` | accept unhandled rejection), and `useAurora` dev-warns once if armed deferred with no handler. WebGL2-unavailable still throws hard (O-invariant 24 preserved).

**1f — `-webkit-` live+dead CSS pairs → EXCISE (lane: legacy-sweep-styles).** Delete `-webkit-scrollbar` rules (`utilities.css:125–137`, `dock.css:622,639`) in favor of standard `scrollbar-color`/`scrollbar-width`; delete `-webkit-mask-image` pairs (`utilities.css:263–280`) in favor of `mask-image`. Let Lightning CSS handle any prefixing the browserslist still demands — the hand-written prefix duplicates are dead. Migrate `glyph-face.css:77` `rgba()` and `tokens.css:553–554` `rgb(0 0 0 / N)` to the house `color-mix()`/`hsl(… / α)` idiom.

**1g — `@supports`-gated fallback formalization → KEEP+SURFACE (lanes: legacy-sweep-styles, di-service-boundaries).** `backdrop-filter`, `:has()`, `light-dark()`, `animation-timeline`, View-Transitions, `@starting-style` fallbacks are load-bearing. They stay, but the form-validity `.user-invalid-fallback` / `.has-error` / `.is-focus-within` JS-fallback classes get gated behind `@supports not selector(:has(*))` / `@supports not (... :user-invalid)` so they only paint on pre-Baseline engines (today they fire unconditionally). Net: zero behavior change on Baseline engines, dead rules excised on modern ones.

**1h — `api/index.ts` historical commentary → EXCISE-to-CHANGELOG (lane: aurora-frag-godmodule).** 42 lines reference tranche history (`P.W1`, `O.W4`, `AU.W9`, version notes) inside a production re-export file. Move the audit trail to CHANGELOG.md / `docs/TRANCHE_HISTORY.md`; keep only the live IN-scope / NOT-in-scope criteria. Same sweep removes per-line tranche-letter commentary from `src/index.ts` cherry-pick rationale (keep the rationale, drop the version archaeology).

**1i — `GooBlob` DI `??`-default → already FAIL-EXPLICIT, verify (lanes: legacy-sweep-custom-1, di-service-boundaries, pipeline).** Audit lane-1 flagged `GooBlob.vue:36-37` as a silent `?? reactive(defaults)`; the DI lane confirmed the `ColorResolver` seam already throws loudly (DEC-AT-2). Reconcile: the *color* resolver is loud (keep); the *config* inject still `??`-defaults. Make config DI loud too — throw if `BLOB_CONFIG_KEY` is absent **and** no explicit `config` prop is passed. No silent reactive-defaults synthesis.

**1j — `dismissOpenOverlays` synthetic pointerdown → KEEP, document (lane: di-service-boundaries).** `useDockState` dispatching a synthetic `pointerdown` on `document.body` to close overlays is a deliberate decoupling from reka-ui portal internals, not a workaround. Keep; promote to a named `dismissOpenPortals()` internal with a doc-block stating why (avoids portal-selector coupling). No code-path change.

### Gate
- `proof:no-silent-catch` — AST/regex scan: no `catch {}` or `catch (_) {}` with an empty body in `src/` **unless** annotated with a `// fail-explicit: <reason>` sentinel AND accompanied by a surfaced flag or thrown re-raise. The 5 befitting catches (clipboard, capture, cursor-release, VT-skip, finally-cleanup) carry the sentinel + surface; bare swallows fail the gate.
- `proof:no-legacy-css` — no `-webkit-scrollbar`, no `-webkit-mask-image` live+dead pair, no inline `rgba(`/`rgb(0 0 0 /` in `src/styles/` (the `color-mix`/`hsl` idiom is mandatory).
- `proof:no-tranche-commentary-in-src` — no `\b[A-Z]{1,2}\.W\d`, no `tranche`, no `v1\.0\.\d` strings in `src/api/index.ts` or `src/index.ts` body (header license excepted).
- `proof:fail-explicit` — meta-gate asserting each DI inject either throws or ships a documented `useOptional*` variant; no `?? reactive(`/`?? new` default-synthesis on a required dependency.

---

## Wave AV.W2 — GOD-MODULE DECOMPOSITION

**Scope.** The four files >500 lines, decomposed into cohesive sub-modules each <300 lines (hard ceiling 500 enforced by gate). Decomposition is by **responsibility seam**, not by line-count slicing — each extracted module owns one concern with an explicit input/output contract. Behavior-preserving: every existing test passes unchanged; new modules get their own unit coverage.

### Units

**2a — `aurora.frag.ts` (819) → GLSL module set (lanes: aurora-frag-godmodule, test-in-src-sweep).** The shader is a TS template literal today. Externalize to `.glsl.ts` partials composed at build time via string concatenation (no runtime `#include` machinery — KISS):
- `noise.glsl` — `hash21`/`hash22`/`vnoise`/`fbm`/`cellular` (the primitives currently dup'd into metaball).
- `composition.glsl` — nuclei softmax-Gaussian field + palette LUT + palette drift. In: warped UV + time. Out: `(paletteId, valueMod)`.
- `flow.glsl` — pattern dispatch (radial/swirl/diagonal/multi) + curl + cursor influence. In: UV + knobs. Out: flow vector.
- `watercolor.glsl`, `pastel.glsl`, `oil.glsl` (brush engine: `curvedStroke`/`paintOver`/`bestOil`), `crayon.glsl` — **one medium per file.** Crayon stops being a `strokeMode==2` branch inside `mediumOil()` and becomes a peer `mediumCrayon()` dispatched at `main()` level (eliminates the special-case, lane finding W-aurora-frag-decompose-medium-crayon).
- `tonemap.glsl` — ACES + film grain. In: linear color + frag coord + time. Out: final.
- `main.glsl` — pure composition pipeline: `domainWarp → nucleiField → samplePalette → mediumDispatch → saturate → tonemap → output`. Each stage is a call, no inline bodies.

**2b — `metaball.frag.ts` (282) shares the noise leaf (lane: aurora-frag-godmodule, duplication-dry).** Metaball imports the **same** `noise.glsl` partial as aurora — kills the `hash21/hash22/vnoise/fbm` duplication (aurora 98–148 vs metaball 70–100). Its OKLCh conversions already mirror the canonical `value.js` math verified by `color-equivalence.test.ts` (keep — that's the one-source gate working). Optionally split `sdf-body.glsl` / `watercolor-edges.glsl` but only if it doesn't fragment the SDF cohesion; the noise-share is the load-bearing win.

**2c — `runtime.ts` (530) → orchestrator + 3 services (lanes: aurora-runtime, aurora-frag).** Extract from the inline `setup` closure:
- `glSetup.ts` — shader compile/link, VAO/buffer creation, uniform-location cache. Returns `{ program, uniforms, geometry }`. Typed so adding a `UNIFORM_NAMES` entry *requires* a cache slot (const-assertion builder, kills the stale-`Record` gap).
- `uniformBridge.ts` — `uploadConfig` + the `MEDIUM_ID`/`FLOW_ID`/`WARP_ID`/`STROKE_MODE_ID` maps, replaced by sealed `as const` discriminated dispatch (bidirectional type safety enum↔shader; kills `mode === 1` bare-numeric comparisons). Pre-allocated uniform buffers live here.
- `frameLoop.ts` — `advanceCursor` / `drawFrame` / `needsAnimation` as a pure `FrameLoopState` taking `{ cursor, config, reducedMotion }`.
- `cursorModel.ts` (shared) — `CURSOR_POS_LERP`/`STRENGTH_LERP`/`DECAY_PER_FRAME`/`REST_EPSILON` exported once so CPU mirrors import instead of re-declaring.
- `flipY(y) => 1 - y` in a tiny geo util, replacing the 5 `AUTHOR_Y_ORIGIN_IS_TOP` inline flips. `runtime.ts` becomes a thin lifecycle orchestrator composing these. Also: split `color.ts` into `color-discovery.ts` (re-exports) + `color-composers.ts` (`deriveAurora` etc.), and excise the belt-and-suspenders double-rAF resize (437–444) **only after** verifying the substrate ResizeObserver covers first-paint — if the race persists, fix it in the substrate, don't paper over it.

**2d — `useSortable.ts` (659) → 5 services (lanes: sortable-godmodule, legacy-sweep-composables).**
- `DragController` — `_dragId`/`_pos`/`_dropIndex`, `beginDrag`/`onPointerMove`/`onPointerUp`/`endDrag`. Pure lifecycle + cross-list routing (~150 LOC).
- `DropResolver` — `resolveDropIndex`/`resolveDropIndexIn`/`findForeignTarget`. Pure math over elements-map + items, no DOM mutation. Unifies the local-drop and foreign-drop index duplication (~100 LOC).
- `GhostRenderer` — `createGhost`/`updateGhost`/`destroyGhost` + `resolveVisibleRadius` DOM-walk (~120 LOC).
- `DropHintRenderer` — `flagsFor` + drop-class computation, decoupled from per-item binding (~60 LOC).
- `dragEventManager` — `register`/`unregister` document listeners (~40 LOC).
- Replace the module-level `instances` Set with an injected `DropTargetCoordinator` (DI, not service-locator). Add `getExternalDropIndex` to the `InstanceHandle` interface (kills the `as unknown as {…}` property injection). Fold in the W1 `pointerCaptureActive` surface. `isNonZeroRadius` → standalone util (already independently tested).

**2e — `Progress.vue` (649) → 3 variant components + geometry service (lanes: progress-godmodule, legacy-sweep-ui).** The cascading `variant ===` re-check across 6 computeds (lines 143–265) is the tell — three orthogonal designs in one SFC.
- `ProgressDefault.vue` — plain rail + `translateX(-%)`, intake-pulse only.
- `ProgressGradient.vue` — owns the three motion layers (intake-pulse / crescendo / discharge) + indeterminate sweep + its ~314 lines of scoped CSS.
- `ProgressSectioned.vue` — per-cell rendering, seams, spring physics, `SectionedCell` + `cells` + `sectionedAggregateValue`, + its ~162 lines of CSS.
- `useProgressGeometry.ts` service — derives per-cell width/start/end/state from the `segments` array.
- Root `Progress.vue` becomes a thin dispatcher with an **explicit prop-boundary contract**: throw (dev) / `console.error` on incompatible combos — `modelValue` + `sectioned`, `segments` on default/gradient, `indeterminate` + `sectioned`. The silent `sectionedAggregateValue` override of `modelValue` becomes a hard error. **This fixes the carousel progress-bar breakage**: the carousel wires `gradient`/`default` (never `sectioned`), and the contract surfaces the misuse instead of silently computing an aggregate from an empty `segments` array. Retire the `disableCrescendo` opt-out prop in favor of distinct variant composition (no post-hoc override).

### Gate
- `proof:no-god-module` — no file in `src/` (excluding `__tests__/` and concatenated `.glsl` build output) exceeds **500 lines**; warn at 300. The four targets must drop under ceiling; new modules must too.
- `proof:shader-noise-single-source` — `hash21`/`hash22`/`vnoise`/`fbm` defined exactly once across all `.glsl` partials; aurora and metaball both import the leaf (extends the existing `proof:single-color-core` pattern to noise primitives).
- `proof:no-special-case-dispatch` — no `strokeMode == 2` / bare-numeric medium branch inside a medium function; mediums dispatch at `main()` level. No `mode === 1` magic comparisons in `uniformBridge` (sealed dispatch only).
- `proof:progress-variant-isolation` — the three Progress variants live in separate SFCs; root dispatcher carries the prop-boundary throw. Asserts no `variant ===` re-check repeated >1× in a single computed chain.

---

## Wave AV.W3 — DI + SERVICE BOUNDARIES + PIPELINE ORCHESTRATION

**Scope.** Formalize the DI contract, consolidate the duplicated context factories, surface feature-detection capability, and close the pipeline-orchestration gaps (the external mutation point, the silent CSS-emit miss, the parallelizable gate manifest).

### Units

**3a — Canonical context factory (lanes: di-service-boundaries, legacy-sweep-custom-2).** Four contexts (`DOCK_CONTEXT_KEY`, `TOGGLE_GROUP_KEY`, `SORTABLE_CONTEXT`, `DOCK_LAYER_GROUP_KEY`) hand-roll the same typed-key + provide/use/useOptional triple. Extract `createStrictContext<T>()` and `createOptionalContext<T>()` factories generating the triple. Strict throws on missing parent; optional returns the befitting silent default **only where the primitive genuinely renders standalone** (audited per-context, matrix documented). `SortableItem` is meaningless without a parent → strict-only, no `useOptional` shipped (invariant 25 preserved).

**3b — Feature-detection capability surfacing (lanes: di-service-boundaries, legacy-sweep-composables, fail-explicit).** The W1 KEEP+SURFACE mandate, applied uniformly: `useScrollProgress`, `useStaggerReveal`, `usePrioritizedTask`, `useYieldToMain`, `useViewTransition`, `useWebGLCanvas` return an explicit capability flag (`isNative` / `isDegraded` / `transitioned: boolean`). Consumers can instrument and adapt UX; the native-vs-fallback choice stops being invisible. No fallback is *removed* (they're load-bearing platform guards) — they're *reported*. Export the `NATIVE_SCROLL_TIMELINE` / `NATIVE_VIEW_TIMELINE` flags so a CSS-only consumer can opt out of the JS listeners entirely.

**3c — Platform-feature guard consolidation (lane: pipeline-orchestration, nested-imports-sweep).** `supportsPostTask` / `getSchedulerPostTask` / `getRequestAnimationFrame` / `getSchedulerYield` scatter across motion composables; `getSchedulerPostTask` is a function-level accessor over a top-level guard. Consolidate into `src/utils/platformFeatures.ts` exporting all guards at module level. Call sites import directly — kills the micro-orchestration accessor boundary. (Lane nested-imports-sweep reports zero true dynamic `import()` nesting, so this is the only "nested" finding to clear; the gate below proves the rest stays clean.)

**3d — `ColorResolver` seam (KEEP — exemplar) (lanes: di-service-boundaries, pipeline).** `GooBlob` injecting `ColorResolver` via required prop with a loud throw (DEC-AT-2) is the *reference* explicit-DI pattern. No change — it's the model 3a/3b align to. Document it in the DI ADR.

**3e — Pipeline: external mutation point → build gate (lane: pipeline-orchestration).** `regen-spring-tokens.mjs` mutates `src/styles/tokens.css` in place but isn't wired into the build — a dev can forget to re-run it. Add `proof:spring-tokens-synced`: run the generator to a temp buffer, diff against the committed token block, fail with a "run `node scripts/regen-spring-tokens.mjs` and commit" message. Closes the silent-drift gap.

**3f — Pipeline: silent CSS-emit miss → presence gate (lane: pipeline-orchestration).** `emitComponentUtilities` in the Vite `closeBundle` hook scans built `dist/*.js` for class tokens and rewrites `dist/styles/index.css`. A *synthesized* class name (not literal in source at build time) silently goes missing. Add `proof:component-utilities-present`: assert the emitted CSS contains every utility the dist templates reference (inverse of the silent-miss). This is the binding companion to the consumer `@source` directive.

**3g — Gate manifest parallelization (lane: pipeline-orchestration).** `gates.mjs` is the single orchestration canon but purely sequential. Tag each gate node `cpu` / `io` / `async` and add a `--run-parallel` mode running independent gates concurrently. The new W1–W4 gates register here; `--verify-ci` drift-check stays fail-closed.

### Gate
- `proof:context-factory-canonical` — every `*_KEY` context in `src/` is produced by `createStrictContext`/`createOptionalContext`; no hand-rolled `inject(KEY, null)` triple. Matrix of context→strictness validated.
- `proof:no-nested-import` — no `import(` / `require(` inside any function body in `src/` (top-level imports only); no function-level guard accessor over a module-level support flag.
- `proof:platform-features-single-source` — all platform guards (`supportsPostTask`, `getRequestAnimationFrame`, `getSchedulerYield`, …) defined once in `utils/platformFeatures.ts`.
- `proof:spring-tokens-synced` + `proof:component-utilities-present` — the two pipeline-drift gates above.

---

## Wave AV.W4 — HYGIENE

**Scope.** Test-in-src relocation, the remaining DRY de-dup, effusive-dynamism simplification. Low-risk mechanical sweeps gated to stay closed.

### Units

**4a — Test relocation (lanes: every lane that touched it).** Move all 60 test files from 27 in-src `__tests__/` dirs to a root-parallel `tests/` tree mirroring `src/` structure (`tests/composables/`, `tests/components/custom/aurora/`, …). Update `vitest.config.ts` glob from `src/**/*.{test,spec}.ts` to `tests/**`. Relocate the shader-validation utility `metaball-color.glsl-port.ts` and the `*.test-d.ts` type tests too. (Note: several lanes call the current placement "exemplary Vue idiom" — the user mandate is the dedicated `tests/` tree, so we relocate; this is a clean source/test boundary, not a correctness fix.)

**4b — PRNG de-dup (lanes: legacy-sweep-custom-1, duplication-dry).** `mulberry32` + `hashString` are byte-identical (verified) in `watercolor-dot/prng.ts` and `goo-blob/composables/prng.ts` — only the comment and watercolor's extra `randomRadii`/`radiiToCSS` differ. Extract the core to a shared leaf (`composables/prng/` or `utils/prng.ts`); both import it. Watercolor keeps its border-radius helpers locally. One PRNG source.

**4c — Shared low-level primitives (lane: duplication-dry).** Extract — **only where it doesn't fragment cohesion**:
- `useDocumentVisibility()` leaf — unifies the `visibilitychange → document.hidden` pattern dup'd across `useRAFLoop`, `useIntersectionPause`, `useWebGLCanvas`, `runtime.ts`. One listener per app.
- `createMacrotaskFallback()` in `/motion-core` — the identical native→MessageChannel→setTimeout dispatch in `yieldToMain` and `postTaskSafe` (zero-dep constraint honored).
- WebGL `compile(gl, type, src)` / `link(gl, vs, fs)` → shared `glass/webgl/compile.ts`; aurora runtime + future blob refactors inherit one error-checked path.
- The ResizeObserver consolidation is **deferred/optional** — per-consumer overrides (rafBatch, box, DPR policy) make a shared primitive non-trivial; only extract if it reads cleaner, not for line-count.

**4d — Effusive-dynamism simplification (lane: effusive-dynamism).**
- `useSidebarFollow` — fold three `watch()` calls into a single array-watch; unify cleanup into one `onScopeDispose`.
- `useSidebarState` — expose `activeId`/`activeRootId` as plain refs, not computed re-wraps (callers `toValue()` if needed); stop hiding ref identity.
- `useAnimatedNumberMap` — memoize per-key composable instances; rebuild only when the key set changes, not every render.
- Eliminate `as unknown` / `as any` casts (`useSidebarState`, `useGlassRenderer` window.chrome probe, `useSortable`) via tightened type boundaries / branded types — except the genuinely-irreducible `window.chrome` browser-tier probe, which gets a narrow typed shim, not a blanket `any`.
- `useMetaballRenderer` colorCache (256-entry self-evicting) → extract `memoizeWithLimit<K,V>(fn, limit)` util; eviction policy becomes explicit + reusable.

### Gate
- `proof:no-test-in-src` — zero `*.{test,spec,test-d}.ts` files and zero `__tests__/` dirs under `src/`; all tests resolve under `tests/`.
- `proof:no-dup-prng` — `mulberry32`/`hashString` defined exactly once in `src/`.
- `proof:no-unsafe-cast` — no `as any` and no bare `as unknown as` in `src/` outside an allowlist of irreducible platform probes (each allowlist entry carries a `// platform-shim:` sentinel).
- `proof:visibility-single-listener` — `visibilitychange` bound through `useDocumentVisibility` only; no ad-hoc per-composable binding.

---

## Execution order & invariants

W1 (excision) → W2 (decomposition) → W3 (DI/pipeline) → W4 (hygiene), with two couplings: **W1.1b lands inside W2.2d** (sortable capture-surface is part of the DragController extraction), and **W1.1f/1g/1h** can land independently (pure CSS/commentary). Each wave is a hard gate — `npm run proof:all` (now carrying the new nodes via `gates.mjs`) must be green before the next wave opens. No file regresses past 500 lines; no silent path is re-introduced; no backwards-compat alias is shipped for any moved/removed symbol (one-line consumer rename, CHANGELOG-documented). Feature-detected platform guards are **kept and surfaced**, never excised — the line between "legacy to delete" and "progressive enhancement to report" is the spine of the whole tranche.

---

## HEADLINE

**AV excises every silent path and shatters the four god-modules into cohesive, contract-bearing seams — turning invisible fallbacks into surfaced capabilities, magic-numeric dispatch into sealed types, and tribal-knowledge ordering into four fail-closed gates (`no-god-module`, `no-test-in-src`, `no-nested-import`, `fail-explicit`); the carousel progress bar gets fixed not by a patch but by a prop-boundary contract that refuses the misuse out loud.**
