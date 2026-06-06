# AV.W14 — DI + service-boundaries + pipeline-orchestration + hygiene

## 2. State

**Name**: W14 — DI + service-boundaries + pipeline-orchestration + hygiene (KISS, public API unchanged)
**Opens after**: AV.W5 (the hygiene transpositions — its `createDockContext<T>()` factory is the seed this wave generalizes) AND AV.W2/W13 (the blob+aurora convergence — the shared GLSL chunk + the `ColorResolver` seam this wave ratifies as the service-boundary exemplar). Non-publish-blocking; AT-disjoint; opens before the 3.3.0 publish.
**Agents**: 5 parallel — five file-disjoint lanes (§4a): (A) the canonical DI factory generalization (the `createStrictContext<T>()`/`createOptionalContext<T>()` pair over ALL contexts, not just dock), (B) the nested-import hoist ledger + the befitting-lazy-boundary allowlist, (C) the test-in-src relocation to a top-level `tests/` tree, (D) the pipeline-orchestration formalization (the render-loop seam + the build-pipeline gate), (E) the residual D1-D8 DRY de-dup not already folded by W3/W5. No two lanes share a `modify` path EXCEPT `scripts/gates.mjs` + `package.json` (scripts) + `CLAUDE.md` (orchestrator-merged at close).
**Hard gate**: three NEW born-RED gates green (`proof:no-nested-import` + `proof:no-test-in-src` + `proof:di-consistency`); the PUBLIC API surface is BYTE-UNCHANGED (`proof:package` + `proof:resolution` + `verify-export-types` all green with the SAME entry set); the existing gate matrix + `typecheck` + `build` stay green; the LOC delta is recorded.
**Status**: planned

**Type:** REFACTOR (DI/orchestration/hygiene; KISS; zero public-API delta — this wave moves SOURCE and tightens SEAMS, never the published surface). Non-publish-blocking.
**Scope source:** `docs/tranches/AV/audit/reinvent/legacy-architecture-digest.md` (the W3 DI+service-boundaries+pipeline-orchestration units 3a-3g + the W4 hygiene units 4a-4c: test-in-src relocation, PRNG de-dup, shared low-level primitives) + `docs/tranches/AV/UNION-COORDINATION.md` §2 (the D1-D8 de-dup routing). This file is the FULLY-formed, execute-without-re-deriving spec for W14.

**Precepts in force.** No legacy / no back-compat aliases (clean breaks — moved tests leave NO shim at the old path; hoisted imports leave no nested copy; the DI factory leaves no hand-rolled triplet). KISS — collapse boilerplate onto ONE DI factory pair; do NOT add an abstraction beyond the call sites already justify. The one BEFITTING dynamic boundary (keyframes `loadAnimationEngine()` HEAVY-tier `await import()`) is KEPT and ALLOWLISTED — it is a deliberate value.js-free lazy split, not a workaround. Gestalt transposition, not patch. Public-API-unchanged — the published `package.json` exports + the `dist/<subpath>.js` inventory are BYTE-IDENTICAL before/after. Overfitting (J inv 10) — the DI factory has ≥4 context call sites (dock, dock-layer-group, toggle-group, sortable); the de-dup folds clear the ≥2-consumer bar.

## 2a. Goal criterion

This wave succeeds if (1) every `InjectionKey<T>` context in `src/` is produced by ONE canonical DI factory pair (`createStrictContext<T>()` strict-throw + `createOptionalContext<T>()` befitting-silent) — the dock, dock-layer-group, toggle-group, and sortable-list provide/inject triplets all collapse onto it, generalizing W5's dock-only `createDockContext<T>()`; (2) NO nested `import(`/`require(` survives inside a function body in `src/` EXCEPT the one allowlisted befitting boundary (the keyframes `loadAnimationEngine()` HEAVY-tier await-import), and the `import("vue").ComputedRef` inline TYPE position is normalized to a top-level `import type`; (3) ZERO `*.{test,spec,test-d}.ts` files and ZERO `__tests__/` dirs remain under `src/` — all 60 relocate to a top-level `tests/` tree mirroring `src/`, the `metaball-color.glsl-port.ts` test fixture rides with its tests, and `vitest.config.ts` re-globs onto `tests/**`; (4) the render-loop service boundary (the `ColorResolver` seam as exemplar) is documented as the canonical injected-DI pattern and the build pipeline (`vite.library` → `regen-spring-tokens` → `emit-types`) is orchestrated by a synced gate; (5) the residual D1-D8 DRY duplications not already folded by W3/W5 (the PRNG, the `visibilitychange` listener, the WebGL compile/link) are single-sourced. The reader's test: `git diff` shows ONE DI factory pair + a `tests/` tree + hoisted imports + de-dup leaves + ZERO change to `package.json` exports / `dist/` inventory / public type surface; the three new gates are born-RED then green.

## 3. Scope

1. **Canonical DI factory pair (Lane A).** Generalize W5's dock-only `createDockContext<T>()` into a domain-neutral pair in `src/composables/` (or `src/utils/`): `createStrictContext<T>(label, outsideError)` (provide + strict-throw `use` + the typed `InjectionKey<T>`) and `createOptionalContext<T>(label)` (provide + befitting-silent `inject(KEY, null)` `use`). Migrate ALL four hand-rolled context triplets onto it — `DOCK_CONTEXT_KEY` (`dockContext.ts`), `DOCK_LAYER_GROUP_KEY` (`dockLayerContext.ts`), `TOGGLE_GROUP_KEY` (`toggle-group/toggleGroupContext.ts`), `SORTABLE_CONTEXT` (`sortable-list/context.ts`). Each call site keeps its distinct `interface` + error message; only the provide/inject/throw boilerplate collapses. The strict-vs-optional choice is AUDITED per-context and the matrix recorded: a primitive that genuinely renders standalone (the dock, where `<Slider>` may sit outside) ships `useOptional`; one meaningless without a parent (`SortableItem`) is strict-only, no `useOptional` shipped (invariant 25 preserved). The `BLOB_CONFIG_KEY` + `GLYPH_FACE_SILHOUETTE_KEY` + `CONFIGURATOR_DENSITY_KEY` simple `InjectionKey`-with-default keys are AUDITED — migrate only the ones that hand-roll the strict-or-optional triple; a bare `inject(KEY, default)` single-line is NOT a triplet and stays (KISS, no forced ceremony).
2. **The `ColorResolver` service-boundary exemplar (Lane A — KEEP + document).** The `/color` leaf's injected `ColorResolver` seam (`src/composables/color/index.ts`: `defaultBlobColorResolver`, the goo-blob's required-prop loud-throw per DEC-AT-2) is the REFERENCE explicit-DI pattern — the color boundary the substrate (`useWebGLCanvas`) and motion boundaries align to. No code change; document it as the canonical injected-DI model in the wave's service-boundary note so Lane A's factory pair and the substrate boundary are described against ONE exemplar.
3. **Nested-import hoist ledger (Lane B).** Sweep every `import(`/`require(` inside a function body in `src/` and disposition each to HOIST or KEEP-ALLOWLIST:
   - **KEEP-ALLOWLIST (the one befitting boundary):** the keyframes `loadAnimationEngine()` HEAVY-tier `await import()` — a deliberate value.js-free lazy split that keeps the HEAVY animation engine off the LIGHT static graph (it is the heavy-surface lazy boundary, NOT a workaround). It is referenced from `useLayerTransition.ts` (the dock layer driver) and is the canonical lazy seam. Allowlist it in the gate with a `// lazy-boundary:` sentinel + reason.
   - **HOIST (the type-position normalization):** `useSidebarState.ts:46` `activeRootId: import("vue").ComputedRef<string | null>` is an inline TYPE-position dynamic import — not a runtime nested import, but it duplicates a type the file should pull from a top-level `import type { ComputedRef } from "vue"`. Normalize it to the top-level `import type`.
   - The sweep RECORDS the verdict per finding (the hoist ledger). At HEAD the runtime-nested-import count is effectively ZERO (the digest's nested-imports lane reported zero true dynamic-`import()` nesting); the gate is therefore a STRUCTURE-LOCK that keeps it zero, with the one allowlisted lazy boundary named.
4. **Test-in-src relocation (Lane C).** Move all 60 test files from the 27 in-src `__tests__/` dirs to a top-level `tests/` tree mirroring `src/` (`tests/composables/`, `tests/components/custom/aurora/`, `tests/components/ui/progress/`, …). The single `*.test-d.ts` (`dock/__tests__/dockLayerContext.readonly.test-d.ts`) relocates too. The shader-validation fixture `metaball-color.glsl-port.ts` (`goo-blob/__tests__/`) is a TEST FIXTURE — it rides WITH its tests to `tests/components/custom/goo-blob/` (reconciles the AU-finalization placement: a fixture stays with the tests; when tests move out of src, it moves too). Update `vitest.config.ts` `include` from `src/**/*.{test,spec}.{ts,tsx}` (+ `.vue`) to `tests/**`. Fix the relative import depth in each moved test (`../index` → the correct depth into `src/` from `tests/`, or via the `@/*` alias which already maps to `src/` — prefer the `@/*` alias so the depth is path-stable). NO test logic changes — pure relocation. The Vue co-location idiom IS common, but the user directive is explicit (NO test files in src); the relocation is the policy, recorded as a deliberate source/test boundary, not a correctness fix.
5. **Pipeline-orchestration formalization (Lane D).** Two gaps:
   - **The build pipeline.** `regen-spring-tokens.mjs` mutates `src/styles/tokens.css` in place but is NOT wired into `npm run build` (`vite build && npm run emit-types`) — a dev can forget to re-run it and ship drifted `--spring-*` tokens. Add `proof:spring-tokens-synced`: run the generator to a temp buffer, diff against the committed token block, fail with a "run `node scripts/regen-spring-tokens.mjs` and commit" message. This closes the silent-drift gap WITHOUT forcing the generator into `build` (the build stays the two-arm `vite build` + `vue-tsc` emit-types per CLAUDE.md; the gate is the orchestration guarantee).
   - **The render-loop service boundary.** Document the WebGL substrate render loop (`useWebGLCanvas` → the aurora/blob `runtime.ts` frame loop) as a consistent orchestration seam: the substrate owns the RAF lifecycle + the `armed`/`shouldContinue` seam; the shader runtime composes it; the `ColorResolver` is the injected color boundary. This is a NOTE (no code change) that names the three boundaries — substrate, color, motion — so the orchestration pattern is consistent and described. (The W7 offscreen-pause + reduced-motion lifts are the BEHAVIORAL changes; W14 only documents the seam shape, no overlap.)
6. **Residual D1-D8 DRY de-dup (Lane E).** The cross-repo de-dup routing (`UNION-COORDINATION.md` §2) folds D1-D6 in W3 (motion tier) and D7 (goo-blob easing) in W5. W14 owns the LIBRARY-INTERNAL DRY the digest's W4 named that those waves do NOT cover:
   - **PRNG de-dup.** `mulberry32` + `hashString` are byte-identical in `watercolor-dot/prng.ts` and `goo-blob/composables/prng.ts` (verified). Extract the core to a shared leaf (`src/utils/prng.ts` or a `composables/prng/` leaf); both import it. Watercolor KEEPS its extra `randomRadii`/`radiiToCSS` border-radius helpers locally (single-component). One PRNG source.
   - **The `visibilitychange` listener.** The `visibilitychange → document.hidden` pattern is hand-rolled across `useRAFLoop`, `useIntersectionPause`, `useWebGLCanvas`, and aurora `runtime.ts`. Extract a `useDocumentVisibility()` leaf so there is ONE listener per app. CONDITIONAL — fold ONLY if it reads cleaner and does not fragment a consumer's own visibility policy; if W7 G1's substrate reduced-motion lift already subsumes the substrate's binding, scope this to the motion composables and record. (Coordinate with AV.W7 — W14 owns the leaf extraction, W7 owns the offscreen-pause behavior; the leaf is the substrate W7 binds.)
   - **WebGL compile/link.** The `compile(gl, type, src)` / `link(gl, vs, fs)` shader-build pair is hand-rolled in the aurora runtime. Extract a shared `src/composables/glass/webgl/compile.ts` (the `glass/webgl/` dir already exists with a `__tests__/`); the aurora runtime imports the one error-checked path. CONDITIONAL on a 2nd consumer at HEAD (the future blob refactor is the 2nd) — if blob does not yet compile its own program, this is a single-consumer extract; fold IFF ≥2, else record the trigger (KISS, no speculative leaf).

## 3a. Triumvirate Dispatch

A triumvirate (research + plan augment + redress) is mandatory — the orchestrator may NOT redispatch the failing unit alone — when:

- **The `createStrictContext<T>()` factory cannot preserve a per-context error message or the typed `InjectionKey<T>` without an `any`/`unknown` leak.** If the generic pair forces a loss of type precision at any of the four call sites, the factory is a regression — BOOK the lossy site (keep its hand-rolled triplet) rather than force the abstraction. This invalidates the wave's DI-consistency premise → halt and triumvirate.
- **The test relocation breaks a relative import the `@/*` alias does not cover.** If a moved test imports a NON-`@`-aliased relative path (a fixture, a sibling spec helper) that does not resolve from `tests/`, and the depth fix cascades into `tsconfig` paths or `vitest.config.ts` alias config beyond a mechanical rewrite — halt and triumvirate (the relocation was supposed to be alias-stable).
- **`proof:package` / `proof:resolution` / `verify-export-types` reddens after any lane** — the public surface drifted. A refactor that drifts the published surface is a plan defect, not a local fix.
- **`proof:spring-tokens-synced` reveals the committed `--spring-*` block is ALREADY drifted from the generator output at HEAD.** That is a pre-existing defect, not a W14 regression — the redress is a token re-bake (touches `src/styles/tokens.css`), which crosses into a CSS-token decision; halt and triumvirate before re-baking.
- **Any diagnostic loop reaches its third iteration** on the public-surface byte-stability check or the DI-factory type-precision check — halt, do not iterate a fourth time.

## 4. File Bounds

| File | Access | Lane |
|---|---|---|
| `src/composables/context/createContext.ts` (the strict/optional factory pair) | create | A |
| `src/composables/context/index.ts` | create | A |
| `src/composables/index.ts` | modify (re-export the factory IF public; likely internal) | A |
| `src/components/custom/dock/composables/dockContext.ts` | modify (consume the canonical factory) | A |
| `src/components/custom/dock/composables/dockLayerContext.ts` | modify (consume the canonical factory) | A |
| `src/components/ui/toggle-group/toggleGroupContext.ts` | modify (consume the factory) | A |
| `src/components/custom/sortable-list/context.ts` | modify (consume the factory; strict-only per inv 25) | A |
| `src/composables/sidebar/useSidebarState.ts` | modify (hoist the inline `import("vue").ComputedRef` → top-level `import type`) | B |
| `tests/**` (60 relocated test files + 1 `.test-d.ts` + the glsl-port fixture) | create (moved from `src/**/__tests__/`) | C |
| `src/**/__tests__/**` (60 files + 27 dirs) | delete (moved into `tests/`) | C |
| `vitest.config.ts` | modify (`include` glob `src/**` → `tests/**`) | C |
| `src/utils/prng.ts` | create (the shared PRNG leaf) | E |
| `src/components/custom/watercolor-dot/prng.ts` | modify (import the shared core; keep `randomRadii`/`radiiToCSS` local) | E |
| `src/components/custom/goo-blob/composables/prng.ts` | modify (import the shared core) | E |
| `src/composables/dom/useDocumentVisibility.ts` | create — CONDITIONAL (the visibility leaf) | E |
| `src/composables/glass/webgl/compile.ts` | create — CONDITIONAL (IFF ≥2 consumer) | E |
| `scripts/proof-no-nested-import.mjs` | create | B |
| `scripts/proof-no-test-in-src.mjs` | create | C |
| `scripts/proof-di-consistency.mjs` | create | A |
| `scripts/proof-spring-tokens-synced.mjs` | create | D |
| `scripts/gates.mjs` | modify (register the new gates, orchestrator-merged) | A/B/C/D |
| `package.json` | modify (scripts only) | A/B/C/D |
| `CLAUDE.md` | modify (Structure block — `tests/` tree + the `composables/context/` note) | C |
| `docs/tranches/AV/PROGRESS.md` | modify (the hoist ledger + DI matrix + LOC delta) | all |
| `docs/tranches/AV/audit/W14-loc-delta.json` | create (the −LOC tally + the test-relocation count) | all |

Do NOT touch: `docs/precepts/**` (USER-DOMAIN submodule) · `src/index.ts` / `src/api/index.ts` / the curated barrels (the public surface — DI/test/de-dup moves are internal) · `package.json` exports VALUES (the `import` keys point at `dist/<name>.js`; the source/test/DI moves do not change the dist filenames) · the keyframes `loadAnimationEngine()` lazy boundary (KEEP + allowlist, never hoist) · the bare `inject(KEY, default)` single-line keys that are NOT strict-or-optional triplets (`BLOB_CONFIG_KEY` config-default, `GLYPH_FACE_SILHOUETTE_KEY`, `CONFIGURATOR_DENSITY_KEY` — migrate only if they hand-roll the triplet) · `src/styles/tokens.css` (W14 adds the sync GATE, it does NOT re-bake the tokens — a drift finding triggers triumvirate, not an in-flight re-bake).

## 4a. Disjointness

No two agent units share a `modify`/`create`/`delete` path:

- **Lane A (DI factory)** owns the new `composables/context/` factory + the four context files (`dockContext.ts`/`dockLayerContext.ts`/`toggleGroupContext.ts`/`sortable-list/context.ts`) + `proof-di-consistency.mjs`. Disjoint — Lane C does NOT touch these (it moves their `__tests__/` siblings, a different path); the `dockLayerContext.readonly.test-d.ts` it relocates is a TEST, not the context source. Coordinate-note: this GENERALIZES W5's `createDockContext<T>()` — if W5 already landed the dock-only factory, Lane A folds it INTO the canonical pair (the dock factory becomes a thin re-bind of `createStrictContext`/`createOptionalContext`); if W5 has not landed, Lane A authors the canonical pair directly and W5's dock factory is subsumed.
- **Lane B (nested-import hoist)** owns the one type-position normalization in `useSidebarState.ts` + `proof-no-nested-import.mjs`. Disjoint.
- **Lane C (test relocation)** owns the `tests/` tree creation + the `src/**/__tests__/**` deletion + `vitest.config.ts` + `proof-no-test-in-src.mjs` + the `CLAUDE.md` Structure block. It is the SOLE writer of `vitest.config.ts`. Disjoint — it touches ONLY test files + the test config, never a `src/` runtime impl.
- **Lane D (pipeline)** owns `proof-spring-tokens-synced.mjs` + the render-loop service-boundary NOTE in `PROGRESS.md`. Disjoint — no `src/` source change (the build pipeline is the GATE; the boundary is a doc note).
- **Lane E (DRY de-dup)** owns the new `src/utils/prng.ts` + the two consuming `prng.ts` files + the CONDITIONAL `useDocumentVisibility.ts` + the CONDITIONAL `glass/webgl/compile.ts`. The two consumed `prng.ts` files are in distinct component dirs (watercolor-dot, goo-blob); no other lane touches them. Disjoint.
- `scripts/gates.mjs` + `package.json` (scripts) are touched by Lanes A/B/C/D for gate registration — append-only to disjoint regions, orchestrator-merged at close. `CLAUDE.md` is Lane-C-owned (the `tests/` Structure line + the `composables/context/` note). The orchestrator integrates at close.

Net: five parallel lanes — **(A) DI factory**, **(B) nested-import hoist**, **(C) test relocation**, **(D) pipeline**, **(E) DRY de-dup**. Five lanes is within the six-agent implementation ceiling.

## 4b. Worktree Plan

| Agent unit lane | Sibling worktree absolute path | notes |
|---|---|---|
| Lane A — DI factory | `/Users/mkbabb/Programming/glass-ui-w14-a` | the canonical context pair; subsumes W5's dock factory; four call sites |
| Lane B — nested-import hoist | `/Users/mkbabb/Programming/glass-ui-w14-b` | one type-position normalization + the allowlist gate |
| Lane C — test relocation | `/Users/mkbabb/Programming/glass-ui-w14-c` | sole owner of `vitest.config.ts`; 60-file move + the glsl-port fixture |
| Lane D — pipeline | `/Users/mkbabb/Programming/glass-ui-w14-d` | the spring-tokens-synced gate + the render-loop boundary note |
| Lane E — DRY de-dup | `/Users/mkbabb/Programming/glass-ui-w14-e` | the shared PRNG leaf + the conditional visibility/compile leaves |

No `CARGO_TARGET_DIR` (Node/Vite repo). Each lane runs `npm run typecheck` / `npm run build` / its gates against its own worktree checkout. The orchestrator runs `git worktree add` for the siblings before dispatch and owns the `gates.mjs` / `package.json` / `CLAUDE.md` integration at close. All five lanes branch from the same clean main with AV.W2/W5/W13 committed. **Sequencing caveat:** Lane A MUST start from a checkout that has W5's `createDockContext<T>()` (if landed) so the generalization is a fold, not a parallel second factory.

## 5. Agent Units

### AV.W14.A Canonical DI factory pair + service-boundary exemplar

- Goal: every `InjectionKey<T>` context that hand-rolls a strict-or-optional triplet collapses onto ONE `createStrictContext<T>()`/`createOptionalContext<T>()` pair, with the per-context interface + error message + typed key preserved, and the strict-vs-optional matrix audited and recorded; the `ColorResolver` seam is documented as the injected-DI exemplar.
- Mechanism:
  - **`src/composables/context/createContext.ts`** (create) — the domain-neutral pair:
    ```ts
    export function createStrictContext<T>(label: string, outsideError: string) {
        const KEY: InjectionKey<T> = Symbol(label);
        return {
            KEY,
            provide: (ctx: T) => provide(KEY, ctx),
            use: (): T => { const c = inject(KEY); if (!c) throw new Error(outsideError); return c; },
        };
    }
    export function createOptionalContext<T>(label: string) {
        const KEY: InjectionKey<T> = Symbol(label);
        return { KEY, provide: (ctx: T) => provide(KEY, ctx), use: (): T | null => inject(KEY, null) };
    }
    ```
    A context needing BOTH strict + optional (the dock) composes one `KEY` shared across the two `use` shapes — the factory exposes a `withOptional` variant or the dock keeps both `use` shapes over the single `createStrictContext` KEY (whichever reads cleaner without an `any` leak; record the choice).
  - **`dockContext.ts` / `dockLayerContext.ts`** — fold W5's `createDockContext<T>()` (if landed) into the canonical pair, OR migrate the two triplets directly; re-export the named functions (`provideDockContext`/`useDockContext`/`useOptionalDockContext` + layer equivalents) as thin re-binds so the named surface is byte-identical. Preserve the `Readonly<Ref<…>>` typing (AU.W8b.6).
  - **`toggleGroupContext.ts`** — migrate `TOGGLE_GROUP_KEY` + its provide/inject onto the canonical strict factory (toggle-group items are meaningless without the group → strict; audit whether an optional shape exists today).
  - **`sortable-list/context.ts`** — migrate `SORTABLE_CONTEXT` onto `createStrictContext` ONLY (strict-only per invariant 25; no `useOptional` shipped — `SortableItem` outside a list is meaningless).
  - **The strict-vs-optional MATRIX** — record per-context (dock = strict + optional; dock-layer-group = strict + optional reserved; toggle-group = strict; sortable = strict-only) in `PROGRESS.md`.
  - **The `ColorResolver` exemplar** — document the `/color` injected seam (`defaultBlobColorResolver` + the goo-blob loud-throw, DEC-AT-2) as the reference injected-DI pattern in the service-boundary note; NO code change.
- Files: `src/composables/context/createContext.ts` + `index.ts` (create), the four context files (modify), `src/composables/index.ts` (modify IF re-export), `scripts/proof-di-consistency.mjs` (create).
- Sub-gate: `proof:di-consistency` (NEW, born-RED) green + bite-verified. Assertions: (1) every `*_KEY: InjectionKey<T>` declaration in `src/` is produced by `createStrictContext`/`createOptionalContext` (no hand-rolled `inject(KEY)` + `if (!ctx) throw` triplet outside the factory) — EXCEPT the allowlisted bare `inject(KEY, default)` single-line keys carrying a `// di-default:` sentinel; (2) the strict-vs-optional matrix matches the recorded table. Bite: re-inline a hand-rolled strict triplet at one call site → RED. `npm run typecheck` green (named surface byte-identical); the −LOC delta recorded.

### AV.W14.B Nested-import hoist ledger + befitting-lazy allowlist

- Goal: NO runtime nested `import(`/`require(` survives in `src/` except the one allowlisted befitting boundary; the inline type-position dynamic import is normalized to a top-level `import type`; the hoist ledger is recorded.
- Mechanism:
  - **Sweep** every `import(`/`require(` inside a function body in `src/`. At HEAD: the runtime-nested count is zero (the digest's nested-imports lane confirmed zero true dynamic-`import()` nesting); the one true lazy boundary is the keyframes `loadAnimationEngine()` HEAVY-tier `await import()` (referenced via `useLayerTransition.ts`), and the one type-position finding is `useSidebarState.ts:46`.
  - **HOIST** `useSidebarState.ts:46` — `import("vue").ComputedRef<string | null>` → add `import type { ComputedRef } from "vue"` at top and use the bare `ComputedRef` in the type position.
  - **ALLOWLIST** the keyframes `loadAnimationEngine()` lazy boundary with a `// lazy-boundary:` sentinel + reason (the value.js-free HEAVY-tier split — it is the heavy-surface lazy seam, befitting, not a workaround). The gate exempts ONLY sentinel-annotated lazy boundaries.
  - **The hoist ledger** — record every finding + its HOIST/KEEP-ALLOWLIST verdict in `PROGRESS.md`.
- Files: `src/composables/sidebar/useSidebarState.ts` (modify), `scripts/proof-no-nested-import.mjs` (create), `PROGRESS.md` (the ledger).
- Sub-gate: `proof:no-nested-import` (NEW, born-RED) green + bite-verified. Assertions: no `import(`/`require(` inside any function body in `src/` (runtime position) UNLESS the line carries a `// lazy-boundary:` sentinel; inline `import("…")` TYPE positions are flagged (the type-import normalization). Bite: add a nested `await import("./foo")` without the sentinel → RED; add it WITH the sentinel → green (the allowlist works). The keyframes lazy boundary stays green via the sentinel.

### AV.W14.C Test-in-src relocation to a top-level tests/ tree

- Goal: ZERO `*.{test,spec,test-d}.ts` files and ZERO `__tests__/` dirs under `src/`; all 60 tests + the glsl-port fixture live in a `tests/` tree mirroring `src/`; `vitest.config.ts` globs onto `tests/**`; the test logic is byte-unchanged.
- Mechanism:
  - **Move** all 60 test files from the 27 in-src `__tests__/` dirs to `tests/<mirrored-path>/` (e.g. `src/composables/sortable/__tests__/foo.test.ts` → `tests/composables/sortable/foo.test.ts`). The `dockLayerContext.readonly.test-d.ts` relocates too.
  - **The glsl-port fixture** — `goo-blob/__tests__/metaball-color.glsl-port.ts` is a TEST FIXTURE (the shader-port the equivalence test compares against). It rides WITH its tests to `tests/components/custom/goo-blob/metaball-color.glsl-port.ts` (a fixture stays with the tests).
  - **Fix import depth** — prefer the `@/*` alias (already mapping to `src/`) for any test that imports a `src/` impl (`../index` → `@/components/ui/card`), so the depth is path-stable from `tests/`. A fixture-relative import (a test importing its sibling `.glsl-port.ts`) stays relative within `tests/`.
  - **`vitest.config.ts`** — change `include` from `src/**/*.{test,spec}.{ts,tsx}` + `src/**/*.{test,spec}.vue` to `tests/**/*.{test,spec}.{ts,tsx}` + `tests/**/*.{test,spec}.vue`. Confirm the `@/*` alias + the `development` keyframes condition are preserved.
  - **`CLAUDE.md` Structure block** — add the `tests/` tree line (mirrors `src/`).
  - NO test logic changes — pure relocation + import-path fix.
- Files: `tests/**` (create, 60 files + 1 test-d + the fixture), `src/**/__tests__/**` (delete), `vitest.config.ts` (modify), `CLAUDE.md` (modify), `scripts/proof-no-test-in-src.mjs` (create).
- Sub-gate: `proof:no-test-in-src` (NEW, born-RED until the move lands) green + bite-verified. Assertions: ZERO `*.{test,spec,test-d}.{ts,tsx,vue}` files under `src/`; ZERO `__tests__/` dirs under `src/`; every relocated test resolves + runs from `tests/` (the suite passes). Bite: drop a `useFoo.test.ts` back under `src/` → RED. The full vitest suite GREEN from `tests/` (the relocation is behavior-preserving). Register `["local","ci"]`.

### AV.W14.D Pipeline-orchestration formalization

- Goal: the build pipeline's external mutation point (`regen-spring-tokens`) is guarded by a sync gate; the render-loop + color + motion service boundaries are documented as one consistent orchestration pattern.
- Mechanism:
  - **`scripts/proof-spring-tokens-synced.mjs`** (create) — run `regen-spring-tokens.mjs`'s generator logic to a temp buffer, diff against the committed `--spring-*` block in `src/styles/tokens.css`, `process.exit(1)` with a "run `node scripts/regen-spring-tokens.mjs` and commit" message on drift. Author on the house gate template (`scripts/proof-doc-consistency.mjs` / `scripts/proof-theme-style.mjs`). If the generator is not import-factorable, shell out to it with a `--check`/`--stdout` mode (add the mode to the generator IFF it does not already write to stdout — minimal, the generator stays the source of truth).
  - **The render-loop service-boundary NOTE** (in `PROGRESS.md` + the wave's §8 artefact) — name the three boundaries: SUBSTRATE (`useWebGLCanvas` owns the RAF lifecycle + the `armed`/`shouldContinue` seam), COLOR (the injected `ColorResolver`, the Lane A exemplar), MOTION (the keyframes LIGHT driver seam, `SpringProgress`). The shader `runtime.ts` COMPOSES the substrate; the orchestration is consistent because each boundary is an injected/composed seam, not an inline coupling. NO code change — this documents the pattern W2/W7 implement.
- Files: `scripts/proof-spring-tokens-synced.mjs` (create), `PROGRESS.md` (the boundary note).
- Sub-gate: `proof:spring-tokens-synced` (NEW, born-RED if the committed tokens drift) green + bite-verified. Bite: hand-edit one `--spring-*` value in `tokens.css` (so it diverges from the generator) → RED; re-run the generator + commit → green. Register `["local","ci","release"]`. **Caveat:** if HEAD's committed block is ALREADY drifted, that is a pre-existing defect → triumvirate (§3a), NOT an in-flight re-bake.

### AV.W14.E Residual D1-D8 DRY de-dup (library-internal)

- Goal: the library-internal duplications the cross-repo D1-D8 routing leaves to W14 (PRNG, the visibility listener, WebGL compile/link) are single-sourced where it does not fragment cohesion.
- Mechanism:
  - **PRNG** — extract the byte-identical `mulberry32` + `hashString` to `src/utils/prng.ts`; `watercolor-dot/prng.ts` + `goo-blob/composables/prng.ts` import it. Watercolor KEEPS `randomRadii`/`radiiToCSS` (single-component border-radius helpers) locally. One PRNG source.
  - **`useDocumentVisibility()` (CONDITIONAL)** — extract the `visibilitychange → document.hidden` leaf to `src/composables/dom/useDocumentVisibility.ts`; the motion composables (`useRAFLoop`/`useIntersectionPause`) + the substrate import it. Coordinate with AV.W7 G1 — if W7's substrate reduced-motion lift already binds the substrate's visibility, scope this leaf to the motion composables; the leaf is the substrate W7 binds. Fold IFF it reads cleaner (≥2 genuine consumers at HEAD: `useRAFLoop` + `useIntersectionPause` clear it).
  - **WebGL compile/link (CONDITIONAL)** — extract `compile(gl, type, src)` / `link(gl, vs, fs)` to `src/composables/glass/webgl/compile.ts` IFF ≥2 consumers at HEAD; the aurora runtime is consumer #1, the blob refactor consumer #2. If blob does not compile its own program yet, RECORD the trigger (the blob WebGL refactor) and KEEP-BOOK (single-consumer → no speculative leaf, J inv 10).
  - Each fold proves runtime byte-equivalence (the de-dup is a MOVE, not a re-derivation).
- Files: `src/utils/prng.ts` (create), `watercolor-dot/prng.ts` + `goo-blob/composables/prng.ts` (modify), `src/composables/dom/useDocumentVisibility.ts` (create — CONDITIONAL), `src/composables/glass/webgl/compile.ts` (create — CONDITIONAL).
- Sub-gate: no new public gate (the de-dup is internal). `proof:di-consistency` + `proof:no-test-in-src` + the existing matrix stay green. A `proof:no-dup-prng` assertion (folded into `proof-di-consistency.mjs` OR a tiny standalone) — `mulberry32`/`hashString` defined exactly once in `src/`. `npm run typecheck` + the watercolor-dot/goo-blob unit suites GREEN (the PRNG output is byte-identical). The LOC delta recorded.

## 6. Hard Gate

W14 closes when every condition below is evidence-backed:

1. **AV.W14.A** — `proof:di-consistency` GREEN + bite-verified (re-inline a hand-rolled strict triplet → RED); all four contexts consume the canonical `createStrictContext`/`createOptionalContext` pair; the named export surface is byte-identical; the strict-vs-optional matrix recorded; W5's `createDockContext<T>()` is subsumed (one factory pair, no parallel second factory); `npm run typecheck` GREEN; the −LOC delta recorded.
2. **AV.W14.B** — `proof:no-nested-import` GREEN + bite-verified (nested `await import` without the sentinel → RED; with it → green); the `useSidebarState.ts:46` type-position import is hoisted to a top-level `import type`; the keyframes `loadAnimationEngine()` lazy boundary is allowlisted via the `// lazy-boundary:` sentinel; the hoist ledger recorded in `PROGRESS.md`.
3. **AV.W14.C** — `proof:no-test-in-src` GREEN + bite-verified (a test back under `src/` → RED); ZERO `*.{test,spec,test-d}` files + ZERO `__tests__/` dirs under `src/`; all 60 tests + the `metaball-color.glsl-port.ts` fixture live in `tests/` mirroring `src/`; `vitest.config.ts` globs `tests/**`; the full vitest suite GREEN from `tests/`; `CLAUDE.md` Structure block names the `tests/` tree.
4. **AV.W14.D** — `proof:spring-tokens-synced` GREEN + bite-verified (drift one `--spring-*` value → RED); the render-loop + color + motion service-boundary note recorded (substrate/color/motion named as injected/composed seams).
5. **AV.W14.E** — `mulberry32`/`hashString` defined exactly once (`src/utils/prng.ts`); both consumers import it; watercolor keeps its border-radius helpers local; the conditional `useDocumentVisibility()` + `glass/webgl/compile.ts` leaves land IFF ≥2 consumer (else KEEP-BOOK with the trigger named); `npm run typecheck` + the affected unit suites GREEN (runtime byte-identical).
6. **PUBLIC API BYTE-UNCHANGED.** `proof:package` + `proof:resolution` + `npm run verify-export-types` + the per-subpath dist inventory are byte-stable before/after (the DI factory, test relocation, hoist, and de-dup are all internal — the published `exports` set + the `dist/<subpath>.js` files are unchanged). This is the wave's CARDINAL invariant.
7. **No regression.** The existing gate matrix stays GREEN through W14: `proof:vueuse-free-root`, `proof:strict-templates`, `proof:doc-consistency`, `proof:components-css`, `proof:blob-value-free`, `proof:single-color-core`, `npm run typecheck`, `npm run build`, the unit suites (now from `tests/`). `PROGRESS.md` records the wave with a green run id + the LOC delta + the DI matrix + the hoist ledger.

**Born-RED gate registration (manifest==ci invariant):**

| gate | script | tags | bite-check |
|---|---|---|---|
| `proof:di-consistency` | `scripts/proof-di-consistency.mjs` | `["local","ci"]` | re-inline a hand-rolled strict triplet at one call site → RED |
| `proof:no-nested-import` | `scripts/proof-no-nested-import.mjs` | `["local","ci"]` | add a nested `await import` without the `// lazy-boundary:` sentinel → RED |
| `proof:no-test-in-src` | `scripts/proof-no-test-in-src.mjs` | `["local","ci"]` | drop a `*.test.ts` back under `src/` → RED |
| `proof:spring-tokens-synced` | `scripts/proof-spring-tokens-synced.mjs` | `["local","ci","release"]` | hand-edit one `--spring-*` value in `tokens.css` → RED |

All four follow the house gate template (`scripts/proof-doc-consistency.mjs` for the AST/regex-scan form; `scripts/proof-package.mjs` for the inventory form): a pure exported detector, a byte-stable JSON artefact via `scripts/gate-output.mjs`, a human summary, `process.exit(1)` on any violation. Register in `package.json` + `gates.mjs` ONLY after each fold is complete (`verifyCi()` enforces manifest==ci).

## 7. Format And Lint Cadence

- `npm run typecheck` (`vue-tsc --noEmit`) — after AV.W14.A (the factory + four migrations), AV.W14.B (the type-import hoist), AV.W14.E (the de-dup leaves), and at close.
- The full vitest suite — after AV.W14.C (CRITICAL — confirm every relocated test runs + passes from `tests/`) and at close.
- `npm run build` — after AV.W14.C (confirm the `vitest`/`src` split did not perturb the build's `src/` scan) and at close; the `dist/` file-list diff before/after proves the SAME chunk set.
- `npm run verify-export-types` + `npm run proof:resolution` + `npm run proof:package` — after each lane and at close (the public-surface byte-stability evidence).
- The four NEW gates + the no-regression existing-gate matrix run after their fold completes and at close.
- `git diff --check` (whitespace/conflict-marker) on the DOCS-edited files (`CLAUDE.md`, `PROGRESS.md`) at close.

No formatter is intentionally skipped; the gate fleet + the dist-inventory diff + the full-suite-from-`tests/` run are the binding evidence.

## 8. Verification Artefacts

- `proof:di-consistency` JSON artefact — the context→factory inventory + the strict-vs-optional matrix.
- `proof:no-nested-import` JSON artefact — the hoist ledger (HOIST/KEEP-ALLOWLIST verdicts + the one allowlisted lazy boundary).
- `proof:no-test-in-src` JSON artefact — the `src/`-test-count = 0 assertion + the `tests/` mirror inventory.
- `proof:spring-tokens-synced` JSON artefact — the generator-vs-committed `--spring-*` diff (empty = synced).
- The `dist/` file-list diff (before/after) proving the SAME chunk set — recorded/linked in `PROGRESS.md`.
- `W14-loc-delta.json` — the DI-factory −LOC + the de-dup −LOC + the test-relocation file count.
- The DI strict-vs-optional matrix + the render-loop service-boundary note + the hoist ledger — `PROGRESS.md`.
- The green CI run id for the wave — `PROGRESS.md`.
- The integration commit hashes (per §9).

## 9. Commit Plan

- **Lane A (DI factory) commit** — `refactor(tranche-AV): W14 — canonical createStrictContext/createOptionalContext pair over 4 contexts (subsumes W5 dock factory)`. (Body required — names the four collapsed triplets, the strict-vs-optional matrix, the −LOC, the byte-identical named surface.)
- **Lane B (nested-import hoist) commit** — `refactor(tranche-AV): W14 — hoist sidebar type-position import + proof:no-nested-import with lazy-boundary allowlist`. (Body required — names the one hoist + the keyframes lazy-boundary allowlist rationale.)
- **Lane C (test relocation) commit** — `refactor(tranche-AV): W14 — relocate 60 tests + glsl-port fixture to top-level tests/ tree + proof:no-test-in-src`. (Body required — names the `src/__tests__/` → `tests/` move, the fixture-rides-with-tests reconcile, the `vitest.config.ts` re-glob, the behavior-preserving invariant.)
- **Lane D (pipeline) commit** — `chore(tranche-AV): W14 — proof:spring-tokens-synced build-pipeline gate + render-loop service-boundary note`. (Body required — names the external-mutation-point gate + the three documented boundaries.)
- **Lane E (DRY de-dup) commit** — `refactor(tranche-AV): W14 — shared src/utils/prng.ts + conditional visibility/compile leaves (D-internal de-dup)`. (Body required — names the PRNG single-source, the conditional leaves' land-or-book disposition, the runtime-byte-identical invariant.)
- **Orchestrator gate-registration commit** — `chore(tranche-AV): W14 — register proof:di-consistency + proof:no-nested-import + proof:no-test-in-src + proof:spring-tokens-synced (manifest==ci)`. (Body required — names the four manifest rows + tags.)
- **Orchestrator integration + docs commit** — `docs(tranche-AV): W14 close — PROGRESS green run id + LOC delta + DI matrix + hoist ledger + CLAUDE.md tests/ line`. (Body required — status/close + the LOC delta.)

## 10. Dependencies

- **Depends on**: AV.W5 (its `createDockContext<T>()` factory is the seed Lane A generalizes — Lane A SUBSUMES it into the canonical pair) AND AV.W2/W13 (the shared GLSL chunk + the `/color` `ColorResolver` seam — Lane A documents that seam as the injected-DI exemplar; Lane D names it as the color boundary). Coordinate with AV.W7 (G1's substrate reduced-motion lift — Lane E's `useDocumentVisibility()` leaf is the substrate seam W7 binds; W14 owns the leaf, W7 owns the offscreen-pause behavior).
- **Blocks**: nothing publish-blocking (W14 is non-publish-blocking REFACTOR). The AV tranche close (AV.W6) depends on W14's four gates being green AND the public-surface byte-stability (`proof:av-final`'s ZERO-ORPHANS + MATRIX-COHERENT lean on W14's clean DI/test/de-dup transposition + the new gates registered in `gates.mjs`).

## 11. Archaeology

Not a re-attempt of a prior failed wave. Two HEAD-grounding facts fold into the units (they CORRECT the digest's W3/W4 draft labels against the live AV wave table, NOT prior-failure archaeology):

1. **The digest's "W3/W4" are DRAFT labels — the live AV table runs W0-W8.** The `legacy-architecture-digest.md` authored a four-wave (W1-W4) draft before the AV charter formed its W0-W8 + W13 numbering. W14 carries the digest's W3 (DI + service-boundaries + pipeline) + W4 (hygiene: test-in-src, DRY) units MINUS what AV.W5 (dock factory, goo-blob easing) and AV.W3 (the D1-D6 motion-tier folds) already own. W14 is the DI/orchestration/hygiene wave the AV charter did not yet name.
2. **The runtime-nested-import count is ZERO at HEAD.** The digest's nested-imports lane reported zero true dynamic-`import()` nesting; the only function-body `import(` is the `useSidebarState.ts:46` TYPE-position form (a type, not a runtime import) and the keyframes `loadAnimationEngine()` HEAVY-tier lazy boundary (befitting, allowlisted). So `proof:no-nested-import` is a STRUCTURE-LOCK that keeps the count zero, with the one befitting lazy boundary named — NOT a mass hoist.
