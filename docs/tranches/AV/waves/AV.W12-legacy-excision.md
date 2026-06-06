# AV.W12 — legacy-excision + fail-explicit

## 2. State

**Name**: W12 — legacy-excision + fail-explicit
**Opens after**: the AV core arc (W0–W8) and the publish hinge; W12 is the first of the three reinvent waves (W12 excision → W13 god-module decomposition → W14 hygiene). It depends on the W3-motion capability-flag work (the `isNative`/`transitioned` surfaces) but touches no god-module body (that is W13) and no test-relocation/DRY sweep (that is W14).
**Agents**: 1 serial (the excision is one coherent dispositioning pass over scattered call sites — every unit threads the SAME `proof:fail-explicit` + `proof:no-legacy-commentary` gates and several share `src/api/index.ts` / `src/index.ts`, so one agent owns the index and avoids a write race).
**Hard gate**: `proof:fail-explicit` green (no silent error-swallow in `src/` — every `catch` re-throws, surfaces a flag, or carries a `// fail-explicit: <reason>` sentinel with an accompanying surface) AND `proof:no-legacy-commentary` green (no `\b[A-Z]{1,2}\.W\d` tranche-letter ref, no `tranche` / `vN.N.N` archaeology string in `src/api/index.ts` or `src/index.ts` bodies) AND the `mediumOil_crayon` special-case is excised from `mediumOil()` (dispatched as a peer at `main()` level) AND the four shader ID `Record`s are sealed typed dispatch. Born-RED — every gate node fails at the wave open against HEAD.
**Status**: planned

**Type:** DEV (legacy-excision + fail-explicit). Writes `src/` runtime + shader source + the two index barrels; AT-disjoint, non-publish-blocking (no published-surface contract changes — the moved historical commentary lands in `CHANGELOG.md` / `docs/`, the surfaced flags are additive, the crayon peer is behavior-preserving).

**Precepts in force.** No legacy / no back-compat aliases (clean breaks — a moved symbol gets a one-line consumer rename, never a shim). Fail-explicit (the user mandate verbatim): "excise the code entirely, or fail explicitly: no silent or graceful handling unless befitting." KISS — replace the magic-numeric dispatch with sealed types, do NOT re-architect the runtime (that is W13). Gestalt-over-patch — the crayon special-case becomes a peer medium, not a guarded branch. NEVER touch `docs/precepts/`.

## 2a. Goal criterion

This wave succeeds if every SILENT path in `src/` has been dispositioned to exactly one of three buckets — **EXCISE** (deleted outright), **FAIL-EXPLICIT** (a thrown error or a surfaced `degraded`/`isNative`/`reason` flag), or **KEEP+BEFITTING** (a feature-detected progressive-enhancement fallback, retained AND documented as befitting) — so no swallow survives unannotated; the production-code legacy ledger (the `src/api/index.ts` 100+ lines of per-version tranche archaeology, the `src/index.ts` cherry-pick version-history) is moved to `CHANGELOG.md` / `docs/`; the `mediumOil_crayon` `strokeMode == 2` special-case is hoisted out of `mediumOil()` into a peer `mediumCrayon()` dispatched at `main()` level; and the string-keyed `MEDIUM_ID` / `FLOW_ID` / `WARP_ID` / `STROKE_MODE_ID` record dispatch becomes a sealed `as const` typed boundary (enum↔shader, no bare `Record` gap). The reader's test: `proof:fail-explicit` and `proof:no-legacy-commentary` are both green; the aurora shader has no `mode == 2` branch inside a medium function; and `git grep -nE '\b[A-Z]{1,2}\.W[0-9]' src/api/index.ts src/index.ts` returns zero hits.

## 3. The befitting-vs-excise distinction (the spine)

This wave's whole correctness rests on ONE distinction, carried precisely at every site:

**BEFITTING (KEEP + document).** A genuine `@supports` / feature-detected PROGRESSIVE-ENHANCEMENT fallback — where the platform genuinely lacks the API, both arms are correct, and the fallback degrades function gracefully — is NOT legacy and is NOT a workaround. The motion composables are the reference exemplars and stay UNCHANGED in behavior:
- `useYieldToMain.ts` — native `scheduler.yield()` → `MessageChannel` macrotask → `setTimeout(0)` floor. Baseline-gated, INP-correct in every arm, already surfaces `hasNativeYield`. BEFITTING.
- `useScrollProgress.ts` — native scroll-timeline → JS listener+`ResizeObserver` fallback, single-writer (the native path attaches nothing). Already gated on `NATIVE_SCROLL_TIMELINE`. BEFITTING.
- `useViewTransition.ts` — native `startViewTransition` → instant synchronous swap, already surfaces `transitioned: boolean`. The lone in-body `vt.ready?.catch(() => {})` is befitting (it swallows the documented `'Transition was skipped'` rejection so a rapid re-trigger does not leak an unhandled `pageerror`) but must carry the sentinel.

These are NOT excised. They get a `// fail-explicit: befitting — <reason>` sentinel where a catch exists, and (where W3-motion has not already) a surfaced capability flag, so the native-vs-fallback choice is visible, not invisible.

**EXCISE / FAIL-EXPLICIT (the target).** The SILENT path:
- SILENT error-swallowing — a `try/catch` whose empty body hides a REAL failure with no surface and no rethrow.
- MASKING `??` defaults — a `?? <default>` that papers over a genuine ABSENCE of a required dependency (synthesizing a stand-in instead of failing).
- Optional-chaining that HIDES a contract violation — `inject(KEY)?.x` where a missing parent is a programming error, not a valid standalone-render case.

For each such site the disposition is one of: EXCISE (delete dead code), THROW (fail explicitly + loudly), or KEEP+document-why-befitting (only when re-audit shows it IS progressive enhancement after all).

## 3. Scope

1. **Sortable `setPointerCapture` silent catch → KEEP+BEFITTING+SURFACE.** `useSortable.ts:404–408` swallows a `setPointerCapture` failure with an empty body. Capture IS an optimization (the document `pointermove`/`pointerup` listeners are the real drag path), so the fallback is befitting — but it is invisible. Make the document listeners the PRIMARY unconditional path (they already are), keep the capture attempt as a pure optimization, and on failure set a returned `pointerCaptureActive: Ref<boolean>` to `false` (dev-warn once, no prod console noise). Annotate the catch `// fail-explicit: befitting — capture is an optimization; document listeners are the real path; failure surfaced via pointerCaptureActive`. The swallow becomes a surfaced state.
2. **`useClipboard` silent `false` → FAIL-EXPLICIT.** `writeViaClipboardApi` (`:49–54`) and `writeViaExecCommand` (`:67–71`) both `catch { return false }` with no reason. Thread `onCopyError(reason: 'clipboard-api' | 'exec-command' | 'no-api')` through the options and return `{ ok, reason }` from the composable `copy()`. The `execCommand` arm STAYS (it is the legacy-browser fallback — befitting) but becomes a NAMED, REPORTED fallback, not a silent one; each catch carries the sentinel + reports through `reason`.
3. **`GooBlob` config DI `??`-default → FAIL-EXPLICIT.** `GooBlob.vue:37` does `injectedConfig ?? reactive({ ...BLOB_CONFIG_DEFAULTS })` — a masking default that synthesizes a stand-in config when neither the inject nor an explicit prop is present. The sibling `ColorResolver` seam already throws loudly (DEC-AT-2) — this is the reference. Reconcile: make config DI loud too — throw when `BLOB_CONFIG_KEY` is absent AND no explicit `config` prop is passed. No silent reactive-defaults synthesis. (A consumer that genuinely wants the defaults passes them explicitly as the `config` prop.)
4. **`useGlobalDark` one-shot silent seed → FAIL-EXPLICIT.** The first call locks `initialValue`; a later CONFLICTING seed is silently ignored in prod (dev-warn only) — a masking no-op that hides a misconfiguration. Replace with a hard `throw` on a conflicting second seed (a MATCHING seed stays a no-op). The `createGlobalState` singleton constraint becomes visible instead of hidden; a misconfigured consumer learns at first conflict.
5. **Aurora deferred-init `surfaceInitError` → FAIL-EXPLICIT (loud contract).** The deferred init re-throws on the microtask queue when no `onInitError` is supplied. Keep the behavior, make the contract loud: JSDoc on `useAurora` states the three required consumer paths (`onInitError` handler | Vue `errorHandler` | accept the unhandled rejection), and `useAurora` dev-warns once if armed deferred with no handler. WebGL2-unavailable still throws HARD (O-invariant 24 preserved). The two `useAurora.ts` catches (`:192`, `:224`) that `return` get the sentinel + the surfaced error path.
6. **`api/index.ts` legacy commentary → EXCISE-to-CHANGELOG.** The header carries 100+ lines of per-version tranche archaeology (`M.W2`, `O.W4`, `O.W6`, `P.W0`, `P.W1`, `AQ.W4`, `AU.W9`, running surface-count tallies, `v1.0.5`/`v1.7.0` version notes) inside a PRODUCTION re-export file — 39 `\b[A-Z]{1,2}\.W\d` refs at HEAD. Move the audit trail to `CHANGELOG.md` / `docs/TRANCHE_HISTORY.md`; keep ONLY the live IN-scope / NOT-in-scope SCOPE CRITERIA (the criteria are load-bearing doc; the version history is archaeology). Same sweep strips the per-line tranche-letter commentary from `src/index.ts` cherry-pick rationale — KEEP the rationale (why each custom package is in the root barrel), DROP the version archaeology.
7. **Aurora crayon special-case → EXCISE the branch, hoist a peer medium.** `aurora.frag.ts:700–701` — inside `mediumOil(col, p, t)`, `} else if (mode == 2) { return mediumOil_crayon(col, p, t); }` is a special-case: crayon is NOT stroke-based (the comment at `:8` admits it routes to a non-stroke path), so it does not belong as a branch inside the oil-stroke function. Excise the `mode == 2` branch from `mediumOil()`; rename `mediumOil_crayon` → `mediumCrayon` (it is a peer, not an oil sub-mode); dispatch it at `main()` level alongside the other mediums (the same level `MEDIUM_ID` already dispatches at). `mediumOil()` keeps only its genuine oil-stroke modes (0 oil, 1 knife, 3 chunky).
8. **Shader ID `Record`s → sealed typed dispatch.** `runtime.ts:33–36` declares four string-keyed `Record<…, number>` maps (`MEDIUM_ID`, `FLOW_ID`, `WARP_ID`, `STROKE_MODE_ID`) that effusively re-derive the enum↔shader-int mapping at every upload. Replace with sealed `as const` discriminated dispatch giving bidirectional type safety (a new union member REQUIRES a mapping slot at compile time; no stale-`Record` gap). The shader's bare-numeric `uMedium == N` / `uFlowPattern == N` / `uWarpMode == N` / `uStrokeMode == N` comparisons (`aurora.frag.ts:159,164,250,253,257,433,436,440,692,700,702`) stay paired against the sealed map's NAMED constants so the TS↔GLSL boundary is one-source. (The shader keeps its int uniforms — GLSL has no enums — but the TS side that WRITES them is now typed, and the `crayon` value drops out of `STROKE_MODE_ID` since it is a peer medium per scope item 7.)
9. **`useViewTransition` skip-swallow sentinel → KEEP+BEFITTING.** `useViewTransition.ts:95` `vt.ready?.catch(() => {})` is befitting (it swallows the documented `'Transition was skipped'` rejection on a rapid re-trigger to prevent an unhandled-rejection `pageerror`). KEEP; annotate `// fail-explicit: befitting — 'ready' rejects 'Transition was skipped' on re-trigger; swallow prevents an unhandled pageerror; otherwise unread`. No code-path change.

## 3a. Triumvirate Dispatch

A triumvirate (research + plan augment + redress) is mandatory — the orchestrator may NOT redispatch the failing unit alone — when:

- **The crayon hoist changes the rendered output.** If excising `mode == 2` from `mediumOil()` and dispatching `mediumCrayon()` at `main()` level produces a visually-different crayon medium (the dispatch site or the shared-state assumptions differ between the two call levels), the change is NOT behavior-preserving — halt; the redress is a shader-equivalence audit (the crayon path's pixel output before/after), not a local branch move.
- **A `??`-default removal reddens a legitimate standalone-render path.** If throwing on a missing `BLOB_CONFIG_KEY` (item 3) or a conflicting dark seed (item 4) breaks a genuine valid case where the absence IS befitting (the primitive renders standalone by design), the disposition was wrong — halt; re-audit whether the site is BEFITTING (keep+document) rather than FAIL-EXPLICIT (throw).
- **The api/index.ts commentary excision drops a load-bearing scope criterion.** If the line between "version archaeology" (excise) and "IN/NOT-in-scope criteria" (keep) is ambiguous on a given comment block, the redress is to define the keep-rule (live criteria stay; per-version tally rows move) and encode it in `proof:no-legacy-commentary`, not to hand-pick lines.
- **`proof:fail-explicit` cannot be made green without re-architecting a god-module.** If a catch cannot be surfaced without decomposing `runtime.ts` / `useSortable.ts` (W13 work), halt — the excision and the decomposition are coupled at that site; coordinate the sequencing with W13 rather than pulling decomposition into W12.
- **Any diagnostic loop reaches its third iteration** on the shader-equivalence check or the `proof:fail-explicit` sentinel-coverage scan — halt, do not iterate a fourth time.

## 4. File Bounds

| File | Access |
|---|---|
| `src/composables/sortable/useSortable.ts` | modify (the capture catch → surfaced `pointerCaptureActive` + sentinel) |
| `src/composables/dom/useClipboard.ts` | modify (the two catches → `onCopyError` + `{ ok, reason }`) |
| `src/components/custom/goo-blob/GooBlob.vue` | modify (config DI `??` → throw on absent key + no prop) |
| `src/composables/dark/useGlobalDark.ts` | modify (conflicting-seed silent ignore → throw) |
| `src/components/custom/aurora/composables/useAurora.ts` | modify (deferred-init loud contract + sentinels on `:192`/`:224`) |
| `src/api/index.ts` | modify (EXCISE the version archaeology header; keep the scope criteria) |
| `src/index.ts` | modify (strip cherry-pick version archaeology; keep the rationale) |
| `src/components/custom/aurora/constants/shaders/aurora.frag.ts` | modify (excise `mode == 2` branch; rename `mediumOil_crayon` → `mediumCrayon`; dispatch at `main()`) |
| `src/components/custom/aurora/composables/runtime.ts` | modify (the four ID `Record`s → sealed `as const` typed dispatch) |
| `src/composables/motion/useViewTransition.ts` | modify (the befitting sentinel on `:95` ONLY — no behavior change) |
| `CHANGELOG.md` | modify (receive the moved api/index.ts + index.ts version archaeology) |
| `scripts/proof-fail-explicit.mjs` | create |
| `scripts/proof-no-legacy-commentary.mjs` | create |
| `package.json` | modify (the two `proof:*` scripts + the gate rows) |
| `scripts/gates.mjs` | modify (register `proof:fail-explicit` + `proof:no-legacy-commentary`) |
| `docs/tranches/AV/audit/W12-fail-explicit.json` | create (the disposition ledger artefact: each site → EXCISE/FAIL-EXPLICIT/KEEP+BEFITTING) |

Do NOT touch: any god-module BODY decomposition (that is W13 — W12 only surfaces catches and seals dispatch in-place) · the test-relocation / PRNG-dedup / DRY sweep (that is W14) · the motion composables' FALLBACK behavior (befitting — sentinel only, never excised) · `docs/precepts/` (NEVER) · `package.json` `version` (USER-DOMAIN) · the published-surface export SET of `src/api/index.ts` and `src/index.ts` (only the COMMENTARY moves — the re-export lines stay) · the other AV wave specs.

## 4a. Disjointness

Single agent, serial — no two units run in parallel, so no shared-path write race exists. The two units that both touch `src/api/index.ts` (the commentary excise) and `src/index.ts` (the cherry-pick strip) are owned by the same agent in one pass. The aurora shader (item 7) and the runtime dispatch (item 8) are coupled (the `crayon` value drops from `STROKE_MODE_ID` because the shader hoists it to a peer) and land together in one integration batch.

## 5. Agent Units

### AV.W12.a Silent-catch surfacing + DI fail-loud

- Goal: every silent error-swallow and masking `??`-default in the composable/component layer either re-throws, surfaces a flag, or carries a befitting sentinel — no swallow hides a real failure.
- Mechanism: scope items 1–5 + 9. Surface `pointerCaptureActive` (sortable); `onCopyError` + `{ ok, reason }` (clipboard); throw on absent config DI (GooBlob); throw on conflicting seed (useGlobalDark); loud deferred-init contract + dev-warn (aurora useAurora); befitting sentinel (useViewTransition).
- Files: `src/composables/sortable/useSortable.ts`, `src/composables/dom/useClipboard.ts`, `src/components/custom/goo-blob/GooBlob.vue`, `src/composables/dark/useGlobalDark.ts`, `src/components/custom/aurora/composables/useAurora.ts`, `src/composables/motion/useViewTransition.ts`.
- Sub-gate: `proof:fail-explicit` green — every `catch` in `src/` re-throws, surfaces, or carries a `// fail-explicit:` sentinel + surface; no `?? reactive(` / `?? new` default-synthesis on a required dependency.

### AV.W12.b Legacy-commentary excision

- Goal: the production re-export barrels carry zero tranche archaeology — the version history lives in `CHANGELOG.md`, only live scope criteria remain in source.
- Mechanism: scope item 6. Move the `src/api/index.ts` per-version tally header + the `src/index.ts` cherry-pick version notes to `CHANGELOG.md`; keep the IN/NOT-in-scope criteria and the cherry-pick rationale.
- Files: `src/api/index.ts`, `src/index.ts`, `CHANGELOG.md`.
- Sub-gate: `proof:no-legacy-commentary` green — `git grep -nE '\b[A-Z]{1,2}\.W[0-9]' src/api/index.ts src/index.ts` returns zero; no `tranche` / `vN.N.N` archaeology string in either body (header license excepted).

### AV.W12.c Crayon peer + sealed shader dispatch

- Goal: the aurora medium dispatch has no special-case branch and no string-keyed re-derivation — crayon is a peer medium and the enum↔shader mapping is a sealed typed boundary.
- Mechanism: scope items 7–8. Hoist `mediumOil_crayon` → `mediumCrayon` dispatched at `main()` level (excise the `mode == 2` branch from `mediumOil()`); replace the four `Record<…, number>` maps with sealed `as const` discriminated dispatch; drop `crayon` from `STROKE_MODE_ID` (now a `MEDIUM_ID` peer).
- Files: `src/components/custom/aurora/constants/shaders/aurora.frag.ts`, `src/components/custom/aurora/composables/runtime.ts`.
- Sub-gate: no `mode == 2` / bare-numeric medium branch inside a medium function; the four ID maps are sealed `as const`; aurora unit + color-equivalence suites pass unchanged (behavior-preserving).

## 6. Hard Gate

1. **`proof:fail-explicit` green.** The new `scripts/proof-fail-explicit.mjs` AST/regex scan asserts: no `catch (…) {}` / `catch {}` empty body in `src/` UNLESS annotated with a `// fail-explicit: <reason>` sentinel AND accompanied by a surfaced flag or a thrown re-raise; no `?? reactive(` / `?? new` default-synthesis on a required dependency. The befitting catches (clipboard exec-command, sortable capture, useViewTransition skip) carry the sentinel + surface; bare swallows redden it. Born-RED — fails at HEAD (the un-annotated catches exist now).
2. **`proof:no-legacy-commentary` green.** The new `scripts/proof-no-legacy-commentary.mjs` asserts zero `\b[A-Z]{1,2}\.W\d` tranche-letter ref, zero `tranche` string, zero `vN.N.N` version-archaeology string in the BODIES of `src/api/index.ts` and `src/index.ts` (header license line excepted). Born-RED — 39 tranche refs in `src/api/index.ts` at HEAD.
3. **Crayon special-case excised.** `git grep -n 'mediumOil_crayon\|mode == 2' src/components/custom/aurora/constants/shaders/aurora.frag.ts` returns zero hits inside `mediumOil()`; `mediumCrayon` is dispatched at `main()` level; `STROKE_MODE_ID` (or its sealed successor) no longer carries `crayon`.
4. **Sealed dispatch.** The four `Record<…, number>` maps in `runtime.ts` are replaced by `as const` typed dispatch; `vue-tsc --noEmit` proves a new union member requires a mapping slot (a missing slot is a compile error, demonstrated by the artefact).
5. **Behavior-preserving.** `npm run typecheck` green; the aurora unit suite + `proof:blob-color-equivalence` (8/8) + the derive-aurora tests pass unchanged; the crayon medium renders pixel-equivalent pre/post hoist (shader-equivalence note in the artefact).
6. **Disposition ledger.** `docs/tranches/AV/audit/W12-fail-explicit.json` enumerates every dispositioned site with its bucket (EXCISE / FAIL-EXPLICIT / KEEP+BEFITTING) and the befitting rationale for each KEEP.

## 7. Format And Lint Cadence

`npm run typecheck` (`vue-tsc --noEmit`) after each integration batch (a → b → c) and before close. `npm run lint` / `prettier --write` on every touched `.ts` / `.vue` / `.mjs` after each batch. `npm run proof:fail-explicit` + `npm run proof:no-legacy-commentary` run on each batch (born-RED → green). `git diff --check` before close. The full `npm run proof:all` (carrying the two new nodes via `gates.mjs`) must be green at close. No formatter is skipped.

## 8. Verification Artefacts

- `docs/tranches/AV/audit/W12-fail-explicit.json` — the per-site disposition ledger (site → EXCISE/FAIL-EXPLICIT/KEEP+BEFITTING + rationale; the befitting set named explicitly).
- `scripts/proof-fail-explicit.mjs` + `scripts/proof-no-legacy-commentary.mjs` — the two born-RED gate scripts.
- The `CHANGELOG.md` diff receiving the moved api/index.ts + index.ts version archaeology.
- The aurora unit + color-equivalence test logs (pre/post, proving behavior-preservation).
- The integration commit hashes for batches a, b, c.

## 9. Commit Plan

- `fix(tranche-AV): W12.a — surface silent catches + fail-loud DI` (the catch-surfacing + `??`-default removals; body required — names each surfaced flag and each new throw).
- `refactor(tranche-AV): W12.b — excise legacy commentary from api+index barrels` (the archaeology move; body required — deletion + the CHANGELOG destination).
- `refactor(tranche-AV): W12.c — crayon peer medium + sealed shader dispatch` (the special-case hoist + typed dispatch; body required — names the behavior-preservation evidence).
- `chore(tranche-AV): W12 — register proof:fail-explicit + proof:no-legacy-commentary gates` (the gate scripts + `gates.mjs` + `package.json` rows; body required — gate change).
- `docs(tranche-AV): W12 close — disposition ledger + PROGRESS row` (the status commit).

## 10. Dependencies

- **Depends on**: AV.W3-motion (the capability-flag surfaces `isNative` / `transitioned` that make the motion-composable fallbacks befitting-AND-surfaced; W12 annotates rather than re-builds them). The AV core arc (W0–W8) and the publish hinge (W12 is post-publish, AT-disjoint).
- **Blocks**: AV.W13 (god-module decomposition — the W13 `DragController` extraction inherits the W12 `pointerCaptureActive` surface; the W13 `runtime.ts` split inherits the W12 sealed dispatch). AV.W14 (hygiene — runs after the legacy paths are gone so the DRY sweep does not re-extract a soon-deleted swallow).
