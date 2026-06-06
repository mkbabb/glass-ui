# AV.W5 — the L-Rε hygiene transpositions

## 2. State

**Name**: W5 — the L-Rε hygiene transpositions (KISS, public API unchanged)
**Opens after**: AV.W0 (the formalize + doc-currency wave). AT-disjoint with AV.W1–W4; opens before the 3.3.0 publish. Should land AFTER AV.W4 so the (conditional) `drawer-native` subpath barrel is already in the `vite.library.ts` map before the barrel-batch transposition rewrites that map.
**Agents**: 5 parallel — five file-disjoint lanes (§4a): (A) subpath-barrel collapse + vite batch-resolve, (B) composable restructure (reactive/platform sub-trees) + the optional `useReducedMotionToggle()` hoist note, (C) `createDockContext<T>()` factory, (D) types-ownership hoist (sidebar + infinite-scroll), (E) the goo-blob easing-module fold (D7 — `goo-blob/easing.ts`, component-scoped). No two lanes share a `modify` path EXCEPT `vite.library.ts` (Lane A sole owner) and the composables barrel (Lane B sole owner).
**Hard gate**: two NEW born-RED gates green (`proof:subpath-enumeration` + `proof:no-orphan-composable`); the PUBLIC API surface is BYTE-UNCHANGED (`proof:package` + `proof:resolution` + `verify-export-types` + the per-subpath dist inventory all green with the SAME entry set); the existing gate matrix + `typecheck` + `build` stay green; the LOC delta is recorded.
**Status**: planned

**Type:** REFACTOR (hygiene; KISS; zero public-API delta — this wave moves SOURCE, never the published surface). Non-publish-blocking.
**Scope source:** `docs/tranches/AV/audit/AUDIT-DIGEST.md` Stream A transpose targets (the one-line subpath barrels → `src/subpaths/`; orphaned composables → domain sub-trees; the dock provide/inject boilerplate → `createDockContext<T>()`; sidebar + infinite-scroll types → composable-of-record ownership). This file is the FULLY-formed, execute-without-re-deriving spec for W5.

**Precepts in force.** No legacy / no back-compat aliases (clean breaks — the moved barrels leave NO re-export shim at the old path). KISS — collapse boilerplate, do NOT add abstraction beyond the one `createDockContext<T>()` factory the two call sites already justify. Gestalt transposition, not patch. Public-API-unchanged — the published `package.json` exports + the `dist/<subpath>.js` inventory are BYTE-IDENTICAL before/after (the move is internal source layout only). Overfitting (J inv 10) — the `createDockContext<T>()` factory has EXACTLY 2 call sites (`dockContext.ts` + `dockLayerContext.ts`); that meets the ≥2 bar.

## 2a. Goal criterion

This wave succeeds if (1) the 60 trivial one-line subpath barrels at `src/` top level are collapsed into a `src/subpaths/` metadir and BATCH-RESOLVED in `vite.library.ts` (zero runtime delta — the same `dist/<subpath>.js` chunk set emits); (2) the two orphaned top-level composables (`useInterval`/`useTimer` already in `reactive/`; the platform-detection leaf) sit in domain sub-trees (`reactive/`, `platform/`); (3) the dock provide/inject boilerplate (two near-identical `provideX`/`useX`/`useOptionalX` triplets) is unified via a `createDockContext<T>()` factory (−30-40 LOC); (4) the sidebar + infinite-scroll types are owned by their composable-of-record; (5) the three goo-blob hand-rolled easing helpers (`easeInOut`/`easeIn`/`easeOut`) are de-duplicated into a component-scoped `goo-blob/easing.ts` module (D7; private to `/goo-blob`, no public surface). The reader's test: `git diff` shows MOVED source + ONE factory + ONE goo-blob easing module + ZERO change to `package.json` exports / `dist/` inventory / public type surface; `proof:package` + `proof:resolution` + `verify-export-types` are byte-stable.

## 3. Scope

1. **Subpath-barrel collapse (Lane A).** 60 one-line `src/<name>.ts` barrels (each `export * from "./components/<…>"` or `export * from "./composables/<…>"` — verified against HEAD; the digest's "33" is STALE, HEAD has 60 single-line barrels + 10 multi-line curated ones) → move the 60 trivial ones into `src/subpaths/<name>.ts`. BATCH-RESOLVE them in `vite.library.ts` by mapping `src/subpaths/*.ts` programmatically instead of hand-listing each `resolve(rootDir, "src/<name>.ts")`. The 10 MULTI-LINE barrels (`index.ts`, `api/index.ts`, `forms.ts`, `dark.ts`, `keyboard.ts`, `carousel.ts`, `motion.ts`, `motion-core.ts`, `tokens.ts`, `sidebar.ts`, `infinite-scroll.ts` — the curated/SCC-aware ones) STAY at `src/` top level (they carry real curation logic, not a single mirror line). Zero runtime delta: the same `dist/<subpath>.js` set emits; `package.json` exports are byte-unchanged.
2. **Composable restructure (Lane B).** Verify the `reactive/` sub-tree (`useInterval`/`useTimer` — ALREADY there at HEAD) and restructure any genuinely-orphaned top-level composable into a domain sub-tree. The digest names `platform/` as a candidate (the `isMac` platform-detection leaf currently lives inside `composables/keyboard/useKeyboardShortcuts.ts`); IFF `isMac`/platform-detection is a ≥2-consumer leaf, extract it to `composables/platform/`. If it is single-consumer (keyboard-only), KEEP it in keyboard and record (no orphan extraction for a single consumer — J inv 10).
3. **`createDockContext<T>()` factory (Lane C).** Unify the two near-identical dock DI boilerplate triplets — `dockContext.ts` (`provideDockContext`/`useDockContext`/`useOptionalDockContext` over `DOCK_CONTEXT_KEY`) + `dockLayerContext.ts` (`provideDockLayerGroupContext`/`useDockLayerGroupContext`/`useOptionalDockLayerGroupContext` over `DOCK_LAYER_GROUP_KEY`) — via a generic `createDockContext<T>(name, errorMessage)` factory returning the `{ KEY, provide, useStrict, useOptional }` quadruple (−30-40 LOC). The two call sites keep their distinct `interface` (DockContext / DockLayerGroupContext) + error messages; only the provide/inject/throw boilerplate collapses.
4. **Types-ownership hoist (Lane D).** Confirm the sidebar types (ALREADY at `composables/sidebar/types.ts` per AI.W5-δ) and the infinite-scroll types (`components/custom/infinite-scroll/composables/types.ts`) are owned by their composable-of-record — verify-and-record mostly; hoist only a genuinely-misplaced type to its composable-of-record. No public-surface change.
5. **Goo-blob easing-module fold (Lane E — D7, `audit/union-digest.md` D7 + `audit/conjoint-perfection-digest.md` §2 D1-D8 routing).** The goo-blob hand-rolls three quadratic easing helpers — `easeInOut` (`useBlobMood.ts:97`) + `easeIn`/`easeOut` (`useBlobSatellites.ts:18-24`) — confirmed against HEAD. The use is SINGLE-COMPONENT (the goo-blob alone), so the correct fold is a COMPONENT-SCOPED module, NOT a keyframes consumption nor a glass-ui-public composable: extract the three helpers to a new `src/components/custom/goo-blob/composables/easing.ts` (or `goo-blob/easing.ts`) and re-import them in `useBlobMood.ts` + `useBlobSatellites.ts`. This is a hygiene de-dup INTERNAL to the goo-blob family — the helpers stay private to `/goo-blob`; no new public surface, no `/api` entry. The `useBlobSatellites.ts:278` inline `smoothstep` (`bt * bt * (3 - 2 * bt)`) is a distinct local form — fold it into the module only IFF it is byte-identical to one of the three; else leave it inline (KISS, no forced consolidation). The slides `constellation.ts:181` `easeInOutQuad` is the SLIDES arm of D7 (editorial, document in-place, rides G's constellation lift) — OUT under inv-16; W5 owns ONLY the goo-blob arm.

**Note — the optional `useReducedMotionToggle()` hoist (Lane B; cross-ref AV.W7 G1).** `audit/conjoint-perfection-digest.md` §3 ("A11y motion") records an OPTIONAL hoist: the prefers-reduced-motion freeze/wake pattern (`setReducedMotion` + the matchMedia change listener + `wake()`) could lift into a `useReducedMotionToggle()` motion-core composable that both aurora + blob compose. This is NON-BREAKING hygiene, but it is the SAME pattern AV.W7 G1 lifts into the `useWebGLCanvas` SUBSTRATE (so goo-blob + every future AV surface inherit the freeze as a platform guarantee). The two folds are alternatives, not both: W7 G1's substrate-level lift is the PRIMARY (it makes the freeze a substrate guarantee, the canonical home); the `useReducedMotionToggle()` motion-core composable is the SECONDARY shape and lands in W5 ONLY IF W7 G1's substrate lift does NOT subsume it (i.e. a NON-substrate consumer wants the toggle pattern). W5 RECORDS the note + defers the decision to W7 G1's substrate lift; W5 does NOT speculatively hoist a composable W7 G1 would make redundant (KISS, no duplicate freeze home).

## 3a. Triumvirate Dispatch

A triumvirate (research + plan augment + redress) is mandatory — the orchestrator may NOT redispatch the failing unit alone — when:

- **The batch-resolve changes the emitted `dist/` chunk set.** If `vite.library.ts`'s glob/map of `src/subpaths/*.ts` emits a DIFFERENT entry set than the hand-listed map (a dropped or added chunk), the public surface is NOT byte-unchanged — halt and triumvirate (the batch-resolve must be PROVABLY equivalent to the hand-list, name-for-name).
- **A moved barrel's relative `export * from "./components/…"` path breaks.** Moving `src/<name>.ts` → `src/subpaths/<name>.ts` deepens the relative path by one segment (`./components/` → `../components/`). If a barrel's re-export target does not resolve from the new location, `typecheck`/`build` redden — the redress is a path-depth audit, which if it cascades into the `tsconfig` paths or the `@/*` alias crosses out of DOCS bounds.
- **The `createDockContext<T>()` factory cannot preserve BOTH error messages + interfaces without `any`.** If the generic factory forces a loss of the per-context error message or the typed `InjectionKey<T>` precision (a `unknown`/`any` leak), the factory is a regression — BOOK the factory (keep the two triplets) rather than force a lossy abstraction.
- **`proof:package` / `proof:resolution` / `verify-export-types` reddens after the move** — the public surface drifted. This is a plan defect (the move was supposed to be surface-invariant), not a local fix; halt and triumvirate.
- **Any diagnostic loop reaches its third iteration** on the dist-inventory equivalence check — halt, do not iterate a fourth time.

## 4. File Bounds

| File | Access | Lane |
|---|---|---|
| `src/subpaths/<name>.ts` ×60 | create (moved from `src/<name>.ts`) | A |
| `src/<name>.ts` ×60 | delete (moved into `src/subpaths/`) | A |
| `vite.library.ts` | modify (batch-resolve the `src/subpaths/*.ts` map) | A |
| `package.json` | audit (exports byte-UNCHANGED — the `import` targets `dist/<name>.js`, not `src/`; likely no-op) | A |
| `src/composables/platform/index.ts` | create — CONDITIONAL (IFF `isMac` ≥2-consumer) | B |
| `src/composables/platform/isMac.ts` | create — CONDITIONAL | B |
| `src/composables/keyboard/useKeyboardShortcuts.ts` | modify — CONDITIONAL (import `isMac` from `platform/`) | B |
| `src/composables/index.ts` | modify — CONDITIONAL (re-export `platform/`) | B |
| `src/components/custom/dock/composables/createDockContext.ts` | create (the factory) | C |
| `src/components/custom/dock/composables/dockContext.ts` | modify (consume the factory) | C |
| `src/components/custom/dock/composables/dockLayerContext.ts` | modify (consume the factory) | C |
| `src/components/custom/dock/composables/index.ts` | modify (re-export the factory IF public) | C |
| `src/components/custom/dock/composables/__tests__/createDockContext.test-d.ts` | create (the factory type fixture) | C |
| `src/composables/sidebar/types.ts` | audit (already canonical; likely no-op) | D |
| `src/components/custom/infinite-scroll/composables/types.ts` | audit (already canonical; likely no-op) | D |
| `src/components/custom/goo-blob/composables/easing.ts` | create (the D7 component-scoped easing module) | E |
| `src/components/custom/goo-blob/composables/useBlobMood.ts` | modify (import `easeInOut` from `easing.ts`; delete the local hand-roll) | E |
| `src/components/custom/goo-blob/composables/useBlobSatellites.ts` | modify (import `easeIn`/`easeOut` from `easing.ts`; delete the local hand-rolls) | E |
| `scripts/proof-subpath-enumeration.mjs` | create | A |
| `scripts/proof-no-orphan-composable.mjs` | create | B |
| `scripts/gates.mjs` | modify (register, orchestrator-merged) | A/B |
| `package.json` | modify (scripts only) | A/B |
| `CLAUDE.md` | modify (Structure block — `src/subpaths/` line + the composables sub-tree note) | A/B |
| `docs/tranches/AV/PROGRESS.md` | modify (the LOC delta record) | all |
| `docs/tranches/AV/audit/W5-loc-delta.json` | create (the −LOC tally) | all |

Do NOT touch: `src/index.ts` / `src/api/index.ts` / `src/forms.ts` / `src/dark.ts` / `src/keyboard.ts` / `src/carousel.ts` / `src/motion.ts` / `src/motion-core.ts` / `src/tokens.ts` / `src/sidebar.ts` / `src/infinite-scroll.ts` (the 10 MULTI-LINE curated barrels STAY at `src/` top level — they carry SCC-aware curation, not a single mirror line; moving them would obscure the curation) · the runtime composable IMPLEMENTATIONS in `reactive/`/`dom/`/`motion/` (Lane B moves only a genuinely-orphaned leaf, not the established sub-trees) · `package.json` exports VALUES (the `import` keys point at `dist/<name>.js` — the dist filename is unchanged by the SOURCE move, so exports stay byte-identical).

## 4a. Disjointness

No two agent units share a `modify`/`create`/`delete` path:

- **Lane A (subpath-barrel collapse)** owns the 60 `src/<name>.ts` → `src/subpaths/<name>.ts` moves + `vite.library.ts` + `proof-subpath-enumeration.mjs`. It is the SOLE writer of `vite.library.ts`. Disjoint.
- **Lane B (composable restructure)** owns the CONDITIONAL `composables/platform/` extraction + `composables/keyboard/useKeyboardShortcuts.ts` + `composables/index.ts` + `proof-no-orphan-composable.mjs`. It does NOT touch the 60 moved barrels (those are component/composable MIRRORS at `src/` top level; the platform leaf is a composable IMPL at `src/composables/`). Disjoint from Lane A.
- **Lane C (`createDockContext<T>()`)** owns the new `createDockContext.ts` factory + the two dock context files + the dock composables barrel + the type fixture. Entirely within `src/components/custom/dock/composables/`. Disjoint.
- **Lane D (types-ownership)** owns the AUDIT of `composables/sidebar/types.ts` + `infinite-scroll/composables/types.ts` — verify-and-record mostly; if it hoists a misplaced type it edits the composable-of-record, which Lane B/C do not touch. Disjoint.
- **Lane E (goo-blob easing module — D7)** owns the new `goo-blob/composables/easing.ts` + the two consuming composables (`useBlobMood.ts`/`useBlobSatellites.ts`). Entirely within `src/components/custom/goo-blob/composables/`; no other lane touches the goo-blob family. Disjoint. (Lane E touches a goo-blob composable IMPL, not a subpath barrel — so it does NOT collide with Lane A's barrel moves nor Lane B's `composables/` restructure, which is the LIBRARY `src/composables/` tree, not the component-local `goo-blob/composables/`.)
- `scripts/gates.mjs` + `package.json` (scripts) are touched by Lane A + Lane B for gate registration — append-only to disjoint regions. `CLAUDE.md` is Lane-A-owned (the `src/subpaths/` Structure line) + Lane-B-conditional (the `platform/` sub-tree note) — orchestrator-merged. The orchestrator integrates at close.

Net: five parallel lanes — **(A) subpath-collapse**, **(B) composable-restructure**, **(C) dock-factory**, **(D) types-ownership**, **(E) goo-blob easing module (D7)**. `gates.mjs`/`package.json`/`CLAUDE.md` registration is orchestrator-integrated. Five lanes is within the six-agent implementation ceiling.

## 4b. Worktree Plan

| Agent unit lane | Sibling worktree absolute path | notes |
|---|---|---|
| Lane A — subpath-collapse | `/Users/mkbabb/Programming/glass-ui-w5-a` | sole owner of `vite.library.ts`; 60 moves |
| Lane B — composable-restructure | `/Users/mkbabb/Programming/glass-ui-w5-b` | CONDITIONAL `platform/` extraction; sole owner of `composables/index.ts` |
| Lane C — dock-factory | `/Users/mkbabb/Programming/glass-ui-w5-c` | entirely within `dock/composables/` |
| Lane D — types-ownership | `/Users/mkbabb/Programming/glass-ui-w5-d` | audit-mostly; the two `types.ts` files |
| Lane E — goo-blob easing (D7) | `/Users/mkbabb/Programming/glass-ui-w5-e` | entirely within `goo-blob/composables/`; the easing-module de-dup |

No `CARGO_TARGET_DIR` (Node/Vite repo). Each lane runs `npm run typecheck`/`npm run build`/its gates against its own worktree checkout. The orchestrator runs `git worktree add` for the siblings before dispatch and owns the `gates.mjs`/`package.json`/`CLAUDE.md` integration at close. All four lanes branch from the same clean main with AV.W0 (and ideally AV.W4) committed. **Sequencing caveat:** if AV.W4 Lane B lands the conditional `drawer-native` subpath, Lane A MUST start from a checkout that already has the `src/drawer-native.ts` barrel + its `vite.library.ts` entry, so the batch-resolve captures it.

## 5. Agent Units

### AV.W5.A Subpath-barrel collapse + vite batch-resolve

- Goal: the 60 trivial one-line subpath barrels live in `src/subpaths/`, batch-resolved in `vite.library.ts`, with ZERO public-surface delta (same `dist/<subpath>.js` set, byte-unchanged `package.json` exports).
- Mechanism:
  - **Identify the 60 trivial barrels** — every `src/<name>.ts` whose non-blank content is a SINGLE `export * from "./components/<…>"` or `export * from "./composables/<…>"` line (verified against HEAD: 60 such files; the 10 multi-line curated barrels are EXCLUDED — see §4 Do-NOT-touch).
  - **Move each to `src/subpaths/<name>.ts`** — and FIX the relative path depth (`./components/` → `../components/`, `./composables/` → `../composables/`) since the file deepens by one dir. Leave NO re-export shim at the old `src/<name>.ts` path (clean break).
  - **`vite.library.ts`** — replace the 60 hand-listed `resolve(rootDir, "src/<name>.ts")` entries in `libraryEntries()` with a programmatic map over `src/subpaths/*.ts` (read the dir, build `{ [name]: resolve(rootDir, "src/subpaths/<name>.ts") }`), MERGED with the 10 hand-listed multi-line entries (`index`, `tokens`, `api`, `forms`, `dark`, `keyboard`, `carousel`, `motion`, `motion-core`, `sidebar`, `infinite-scroll` — these stay explicit). The merged map MUST equal the HEAD entry set name-for-name (the gate proves this).
  - **`package.json` exports** — AUDIT only: each `import` key points at `dist/<name>.js` (the BUILT chunk), not `src/`. The dist filename is `libraryFileName(format, entryName)` = `<entryName>.js`, keyed by the entry NAME — unchanged by the source move. Exports are byte-identical. Record the no-op.
  - **`CLAUDE.md` Structure block** — add the `src/subpaths/` line (the 60 flat per-package mirror barrels) under `src/`.
- Files: 60× `src/subpaths/<name>.ts` (create) + 60× `src/<name>.ts` (delete), `vite.library.ts` (modify), `package.json` (audit), `CLAUDE.md` (modify), `scripts/proof-subpath-enumeration.mjs` (create), `scripts/gates.mjs` + `package.json` (register).
- Sub-gate: `proof:subpath-enumeration` (NEW, born-RED until the move + batch-resolve land) green + bite-verified. Author on the house template (`scripts/proof-package.mjs` / `scripts/proof-dock-opacity-lockstep.mjs`). Assertions: (1) ENUM-COMPLETE — every `package.json` `exports` subpath entry maps to a `dist/<subpath>.js` that EXISTS after `npm run build` (no dangling export → no chunk); (2) NO-ORPHAN-CHUNK — every `dist/<subpath>.js` chunk has a corresponding `exports` entry (no chunk without a publication); (3) BATCH-EQUIV — the `libraryEntries()` map (after the batch-resolve) has the SAME key set as the HEAD hand-list (name-for-name). Bite: drop a `src/subpaths/<name>.ts` (so its chunk vanishes) while leaving the `exports` entry → RED (dangling export). Register `["local","ci","release"]`.

### AV.W5.B Composable restructure (reactive/platform sub-trees)

- Goal: every composable sits in a domain sub-tree; no genuinely-orphaned top-level composable; a single-consumer leaf is NOT speculatively extracted.
- Mechanism:
  - **Verify `reactive/`** — `useInterval`/`useTimer` are ALREADY at `src/composables/reactive/` at HEAD. Record (no move).
  - **`platform/` (CONDITIONAL)** — the `isMac` platform-detection helper currently lives inside `composables/keyboard/useKeyboardShortcuts.ts`. Audit its consumer count: IFF `isMac` (or another platform-detection leaf) has ≥2 DISTINCT consumers, extract it to `src/composables/platform/isMac.ts` + `src/composables/platform/index.ts`, re-import it in `useKeyboardShortcuts.ts`, and re-export `platform/` from `composables/index.ts`. IFF it is keyboard-only (single consumer), KEEP it inline and record "platform/ NOT extracted — `isMac` is single-consumer (keyboard); J inv 10 forbids a single-consumer sub-tree." Do NOT create an empty `platform/` for one consumer.
  - **`composables/index.ts`** — re-export `platform/` ONLY if the extraction lands.
- Files (CONDITIONAL): `src/composables/platform/isMac.ts`, `src/composables/platform/index.ts`, `src/composables/keyboard/useKeyboardShortcuts.ts`, `src/composables/index.ts`, `scripts/proof-no-orphan-composable.mjs` (create).
- Sub-gate: `proof:no-orphan-composable` (NEW, born-RED) green + bite-verified. Author on the house template. Assertions: every composable `.ts` under `src/composables/` lives in a NAMED sub-tree dir (one of `color/`, `dark/`, `keyboard/`, `reactive/`, `dom/`, `motion/`, `glass/`, `sortable/`, `sidebar/`, `platform/`) — NO loose `.ts` at `src/composables/` top level EXCEPT `index.ts`. Bite: drop a loose `useFoo.ts` at `src/composables/` top level → RED. Register `["local","ci"]`. (At HEAD this is GREEN — only `index.ts` is loose — so the gate is a structure-LOCK; if `platform/` extracts, it stays green.)

### AV.W5.C createDockContext<T>() factory

- Goal: the two dock DI boilerplate triplets collapse onto one generic `createDockContext<T>()` factory (−30-40 LOC), with the per-context interface + error message + typed key preserved exactly, proven by a `.test-d.ts` fixture.
- Mechanism:
  - **`src/components/custom/dock/composables/createDockContext.ts`** (create) — a generic factory:
    ```ts
    export function createDockContext<T>(label: string, outsideError: string) {
        const KEY: InjectionKey<T> = Symbol(label);
        return {
            KEY,
            provide: (ctx: T) => provide(KEY, ctx),
            useStrict: (): T => { const c = inject(KEY); if (!c) throw new Error(outsideError); return c; },
            useOptional: (): T | null => inject(KEY, null),
        };
    }
    ```
  - **`dockContext.ts`** — replace `DOCK_CONTEXT_KEY` + `provideDockContext` + `useDockContext` + `useOptionalDockContext` with `const dock = createDockContext<DockContext>("glass-ui:dock-context", "[glass-ui:dock] useDockContext() called outside <GlassDock>; …")` and re-export the named functions as thin re-binds (`export const provideDockContext = dock.provide; export const useDockContext = dock.useStrict; export const useOptionalDockContext = dock.useOptional;`) so the PUBLIC named surface is byte-identical. Keep the `DockContext` interface + `DockOrientation` type unchanged.
  - **`dockLayerContext.ts`** — same pattern over `DockLayerGroupContext` + the layer-group error message. Keep the `Readonly<Ref<…>>` typed `currentLayerId`/`leavingLayerId` (AU.W8b.6) intact.
  - **`dock/composables/index.ts`** — re-export `createDockContext` IF it should be on the dock-composables public surface (it is dock-internal; likely NOT re-exported — confirm).
  - **`__tests__/createDockContext.test-d.ts`** — type fixture: assert `useStrict()` returns `T` (not `T | undefined`), `useOptional()` returns `T | null`, and the factory preserves the typed `InjectionKey<T>` (no `any` leak).
- Files: `src/components/custom/dock/composables/createDockContext.ts` (create), `dockContext.ts` (modify), `dockLayerContext.ts` (modify), `dock/composables/index.ts` (modify IF re-export), `__tests__/createDockContext.test-d.ts` (create).
- Sub-gate: no new public gate. `npm run typecheck` GREEN (the named surface `provideDockContext`/`useDockContext`/`useOptionalDockContext` + layer equivalents type-identical); the `.test-d.ts` fixture green; the LOC delta (−30-40) recorded in `W5-loc-delta.json`. The existing dock tests + `proof:strict-templates` stay green (the named exports are byte-identical so no consumer binding shifts).

### AV.W5.D Types-ownership hoist (sidebar + infinite-scroll)

- Goal: the sidebar + infinite-scroll types are owned by their composable-of-record; no public-surface change.
- Mechanism:
  - **`src/composables/sidebar/types.ts`** — AUDIT: the sidebar types relocated here at AI.W5-δ (the `custom/sidebar/` dir was retired). Confirm they are the canonical home + the `/sidebar` subpath barrel (`src/sidebar.ts`) re-exports from the composables barrel. Likely no-op; record.
  - **`src/components/custom/infinite-scroll/composables/types.ts`** — AUDIT: confirm the infinite-scroll types are owned by the `useInfiniteScroll` composable-of-record (co-located in `composables/`). Likely no-op; record. Hoist ONLY a genuinely-misplaced type to its composable-of-record.
- Files: `src/composables/sidebar/types.ts` (audit), `src/components/custom/infinite-scroll/composables/types.ts` (audit), `docs/tranches/AV/PROGRESS.md` (record the audit verdicts).
- Sub-gate: no new gate. `npm run typecheck` + `proof:package` + `proof:resolution` GREEN (types byte-unchanged on the public surface). The audit verdicts recorded in `PROGRESS.md`.

### AV.W5.E Goo-blob easing-module fold (D7)

- Goal: the three goo-blob hand-rolled easing helpers are de-duplicated into a component-scoped `goo-blob/easing.ts` module, private to the `/goo-blob` family, with no public-surface change and the blob runtime byte-identical.
- Mechanism:
  - **`src/components/custom/goo-blob/composables/easing.ts`** (create) — extract `easeInOut` (the `useBlobMood.ts:97` quadratic form), `easeIn`, and `easeOut` (the `useBlobSatellites.ts:18-24` quadratic forms) VERBATIM into one module, exported as named functions. No semantic change — the curves stay byte-identical (the bite is runtime-equivalence, not a re-derivation).
  - **`useBlobMood.ts`** (modify) — delete the local `easeInOut` (`:97`) and import it from `./easing`.
  - **`useBlobSatellites.ts`** (modify) — delete the local `easeIn`/`easeOut` (`:18-24`) and import them from `./easing`. The inline `smoothstep` at `:278` (`bt * bt * (3 - 2 * bt)`) is a DISTINCT cubic form — fold it into `easing.ts` ONLY IFF byte-identical to one of the three (it is not — it is a smoothstep, not the quadratic ease); else leave it inline (KISS).
  - **Scope discipline** — the helpers stay PRIVATE to `/goo-blob` (not re-exported from `goo-blob/index.ts`, not added to `/api`). The use is single-component, so the local module is the correct fold per D7 — NOT a keyframes consumption (the helpers are not in keyframes' LIGHT tier) nor a glass-ui-public composable.
- Files: `src/components/custom/goo-blob/composables/easing.ts` (create), `src/components/custom/goo-blob/composables/useBlobMood.ts` (modify), `src/components/custom/goo-blob/composables/useBlobSatellites.ts` (modify).
- Sub-gate: no new public gate. `npm run typecheck` GREEN; the goo-blob unit suite (`goo-blob/__tests__/`) GREEN (the easing helpers are exercised through the blob composables — the de-dup is runtime-byte-identical); the public surface is unchanged (`proof:package` + `proof:resolution` byte-stable; the helpers are not exported). The LOC delta (a small net-neutral move — the three helpers leave their two call sites and gain one module) recorded in `W5-loc-delta.json` alongside the dock-factory delta.

## 6. Hard Gate

W5 closes when every condition below is evidence-backed:

1. **AV.W5.A** — `proof:subpath-enumeration` GREEN + bite-verified (drop a `src/subpaths/<name>.ts` chunk while leaving its export → RED); the 60 trivial barrels live in `src/subpaths/` (relative paths fixed); `vite.library.ts` batch-resolves them merged with the 10 explicit multi-line entries; the emitted `dist/` chunk set + `package.json` exports are BYTE-IDENTICAL to HEAD (name-for-name); `CLAUDE.md` Structure block names `src/subpaths/`. Registered `["local","ci","release"]`.
2. **AV.W5.B** — `proof:no-orphan-composable` GREEN + bite-verified (a loose `useFoo.ts` at `src/composables/` top level → RED); every composable sits in a named sub-tree; `platform/` extracted IFF `isMac` ≥2-consumer, else KEEP-recorded. Registered `["local","ci"]`.
3. **AV.W5.C** — the `createDockContext<T>()` factory lands; both dock context files consume it; the named export surface (`provideDockContext`/`useDockContext`/`useOptionalDockContext` + layer equivalents) is byte-identical; the `.test-d.ts` fixture green; `npm run typecheck` GREEN; the −30-40 LOC delta recorded in `W5-loc-delta.json`.
4. **AV.W5.D** — the sidebar + infinite-scroll types-ownership audit verdicts recorded in `PROGRESS.md`; `proof:package` + `proof:resolution` GREEN (no public-surface drift).
5. **AV.W5.E** — the three goo-blob easing helpers (`easeInOut`/`easeIn`/`easeOut`) live in `goo-blob/composables/easing.ts`; `useBlobMood.ts` + `useBlobSatellites.ts` import them (no surviving local hand-roll); the helpers stay PRIVATE to `/goo-blob` (not re-exported, not on `/api`); `npm run typecheck` + the goo-blob unit suite GREEN; the blob runtime is byte-identical (the curves unchanged). The `useReducedMotionToggle()` hoist is RECORDED as deferred-to-W7-G1 in `PROGRESS.md` (no speculative composable W7 G1 would subsume).
6. **PUBLIC API BYTE-UNCHANGED.** `proof:package` + `proof:resolution` + `npm run verify-export-types` + the per-subpath dist inventory are byte-stable before/after (the same `exports` set, the same `dist/<subpath>.js` files). This is the wave's CARDINAL invariant — a refactor that drifts the published surface is a defect. (The goo-blob easing module is internal to the `/goo-blob` chunk — the `dist/goo-blob.js` chunk's CONTENT changes by the de-dup, but the export SURFACE is unchanged.)
7. **No regression.** The existing gate matrix stays GREEN through W5: `proof:vueuse-free-root`, `proof:strict-templates`, `proof:doc-consistency`, `proof:components-css`, `proof:blob-value-free` (the goo-blob easing module imports no value.js), `npm run typecheck`, `npm run build`, the unit suites. `PROGRESS.md` records the wave with a green run id + the LOC delta.

**Born-RED gate registration (manifest==ci invariant):**

| gate | script | tags | bite-check |
|---|---|---|---|
| `proof:subpath-enumeration` | `scripts/proof-subpath-enumeration.mjs` | `["local","ci","release"]` | drop a `src/subpaths/<name>.ts` while leaving its export → RED (dangling export) |
| `proof:no-orphan-composable` | `scripts/proof-no-orphan-composable.mjs` | `["local","ci"]` | drop a loose `useFoo.ts` at `src/composables/` top level → RED |

Both follow the house gate template (`scripts/proof-package.mjs` for the dist-inventory form; `scripts/proof-dock-opacity-lockstep.mjs` for the comment-strip detector shape): a pure exported detector, a byte-stable JSON artefact via `scripts/gate-output.mjs`, a human summary, `process.exit(1)` on any violation. Register in `package.json` + `gates.mjs` ONLY after their fold is complete (`verifyCi()` enforces manifest==ci).

## 7. Format And Lint Cadence

- `npm run typecheck` (`vue-tsc --noEmit`) — after AV.W5.A (the moved-barrel path-depth fix), AV.W5.C (the factory), AV.W5.E (the goo-blob easing module + the two import rewrites), and at close.
- The goo-blob unit suite (`src/components/custom/goo-blob/__tests__/`) — after AV.W5.E (confirm the easing de-dup is runtime byte-identical).
- `npm run build` — after AV.W5.A (CRITICAL — confirm the batch-resolve emits the SAME `dist/<subpath>.js` set; diff the dist file list before/after) and at close.
- `npm run verify-export-types` + `npm run proof:resolution` + `npm run proof:package` — after AV.W5.A and at close (the public-surface byte-stability evidence).
- The two NEW gates + the no-regression existing-gate matrix run after their fold completes and at close.
- `git diff --check` (whitespace/conflict-marker) on the DOCS-edited files (`CLAUDE.md`, `PROGRESS.md`) at close.

No formatter is intentionally skipped; the gate fleet + the dist-inventory diff are the binding evidence.

## 8. Verification Artefacts

- `proof:subpath-enumeration` JSON artefact — the exports↔dist enumeration tally (byte-stable via `scripts/gate-output.mjs`).
- `proof:no-orphan-composable` JSON artefact — the composable sub-tree inventory.
- The `dist/` file-list diff (before/after the batch-resolve) proving the SAME chunk set — recorded/linked in `PROGRESS.md`.
- `W5-loc-delta.json` — the −30-40 LOC factory delta + the 60-barrel move count.
- The sidebar + infinite-scroll types-ownership audit verdicts — `PROGRESS.md`.
- The green CI run id for the wave — `PROGRESS.md`.
- The integration commit hashes (per §9).

## 9. Commit Plan

- **Lane A (subpath-collapse) commit** — `refactor(tranche-AV): W5 — collapse 60 subpath barrels into src/subpaths/ + vite batch-resolve (zero surface delta)`. (Body required — names the 60-vs-10 split, the path-depth fix, the byte-identical dist/exports invariant.)
- **Lane B (composable-restructure) commit** — `refactor(tranche-AV): W5 — composable sub-tree structure-lock + proof:no-orphan-composable` (+ `platform/` extraction IF it lands). (Body required — names the verdict + the platform/ land-or-keep disposition.)
- **Lane C (dock-factory) commit** — `refactor(tranche-AV): W5 — createDockContext<T>() factory (−30-40 LOC, named surface byte-identical)`. (Body required — names the two collapsed triplets + the −LOC + the preserved named exports.)
- **Lane D (types-ownership) commit** — folded into the close commit's PROGRESS record (audit-mostly; no standalone src change expected).
- **Lane E (goo-blob easing — D7) commit** — `refactor(tranche-AV): W5 — goo-blob easing helpers → component-scoped goo-blob/easing.ts (D7; private, runtime byte-identical)`. (Body required — names the three hand-rolls de-duplicated, the single-component scope, the no-public-surface invariant, and the `useReducedMotionToggle()` defer-to-W7-G1 note.)
- **Orchestrator gate-registration commit** — `chore(tranche-AV): W5 — register proof:subpath-enumeration + proof:no-orphan-composable (manifest==ci)`. (Body required — names the manifest rows + tags.)
- **Orchestrator integration + docs commit** — `docs(tranche-AV): W5 close — PROGRESS green run id + LOC delta + CLAUDE.md src/subpaths/ line + types-ownership verdicts`. (Body required — status/close + the LOC delta.)

## 10. Dependencies

- **Depends on**: AV.W0 (the doc-currency wave). SHOULD land after AV.W4 — if AV.W4 Lane B ships the conditional `drawer-native` subpath, Lane A must capture its `src/drawer-native.ts` barrel in the batch-resolve. The dock context files (`dockContext.ts`/`dockLayerContext.ts`) at HEAD (Lane C's collapse targets — both carry the AU.W8b.6 `Readonly<Ref<…>>` typing Lane C must preserve).
- **Blocks**: nothing publish-blocking (W5 is non-publish-blocking REFACTOR). The AV tranche FINAL/close (AV.W6) depends on W5's gate matrix being green AND the public-surface byte-stability (the close's `proof:av-final` ZERO-ORPHANS + MATRIX-COHERENT lean on W5's clean transposition).

## 11. Archaeology

Not a re-attempt of a prior failed wave. Two HEAD-grounding corrections fold into the units (NOT prior-failure archaeology — they correct STALE digest claims against HEAD):

1. **"33 one-line subpath barrels" is STALE — HEAD has 60.** The grep against HEAD (`grep -vc '^\s*$' src/*.ts | sort`) shows 60 files with exactly 1 non-blank line + 10 multi-line curated barrels (`index`, `api/index`, `forms`, `dark`, `keyboard`, `carousel`, `motion`, `motion-core`, `tokens`, `sidebar`, `infinite-scroll`). The fold moves the 60 trivial ones and EXCLUDES the 10 curated ones (they carry SCC-aware curation, not a mirror line). The digest's "33" predates the AK.W3/AL.W4/AQ.W7 sub-barrel-publishing waves that grew the count.
2. **The composables are ALREADY sub-tree'd.** The digest's "orphaned top-level composables → domain sub-trees" reads as if loose `.ts` files sit at `src/composables/` top level; at HEAD ONLY `index.ts` is loose (all leaves are in named sub-trees per L.W2 Lane A). The `reactive/` sub-tree already holds `useInterval`/`useTimer`. The fold is a structure-LOCK (the gate) + a CONDITIONAL `platform/` extraction (IFF `isMac` ≥2-consumer; currently keyboard-internal). No speculative orphan extraction for a single consumer.
