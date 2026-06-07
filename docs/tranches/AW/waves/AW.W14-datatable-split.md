# AW.W14 - DataTable composable split

## State

**Name**: W14 - DataTable composable split
**Opens after**: AW tranche open (independent of W12/W13/W15; disjoint file bounds)
**Agents**: 1 serial
**Hard gate**: `DataTable.vue ≤ 380 lines`; two colocated composables (`useDataTableRowIdentity`, `useDataTableResponsive`) own the row-identity and card-vs-table-projection concerns; `vue-tsc --noEmit` green; the existing data-table units pass with zero public-API change.
**Status**: planned

## 2a. Goal criterion

This wave succeeds if `DataTable.vue` (442 lines) drops below 380 by extracting its two orthogonal concerns — row-identity generation/validation and the responsive card-vs-table projection — into colocated, internal composables, with the orchestrator, template, and column helpers staying in the SFC. The split is the only god-module the code-quality assay flagged over threshold; the assay graded glass-ui's split discipline strong, so this is a single targeted extraction, not a structural campaign. No exported surface changes.

## 3. Scope

1. Create `src/components/ui/data-table/composables/useDataTableRowIdentity.ts` — extract `rowEntries` and the row-id generation/validation (`DataTable.vue:102-175`, ~70 lines: `getRowId`, `getExplicitRowId`, `getGeneratedRowId`, and the identity validation). Pure utility; takes the rows + the id-resolution props, returns the keyed `rowEntries`. Internal (not exported from the package barrel).
2. Create `src/components/ui/data-table/composables/useDataTableResponsive.ts` — extract `isCard`, `headerColumn`, `bodyColumns` (the card-vs-table projection state, `DataTable.vue:85-87` + the projection computeds). Takes the columns + the responsive breakpoint signal, returns the projection refs. Internal.
3. `DataTable.vue` — consume both composables; the orchestrator, the template, and the column helpers (`getCellValue`, `getAlignClass`, `toggleSort`, `sortIndicator`) STAY in the SFC. The `RowEntry` type stays co-exported from `types.ts` (no relocation).
4. Mirror the two composables' tests into `tests/components/ui/data-table/` per the `tests/`-mirror discipline (no test under `src/`). A unit per composable: row-identity over an explicit-id row + a generated-id row; responsive projection across the card and table breakpoints.

## 3a. Triumvirate Dispatch

Trigger a triumvirate when:

- extracting `rowEntries` reveals a hidden coupling to the template's sort or pagination state such that the composable cannot be pure (the concern is not as orthogonal as the assay claimed) — file bounds expand into `DataTablePagination.vue` or `types.ts` beyond a type co-export;
- `DataTable.vue` does not fall below 380 lines after both extractions (the residual orchestrator is itself over threshold) — a non-local-recoverable miss against the size gate, escalate to re-scope the split boundary;
- a third iteration on the data-table units fails after the extraction (a reactivity seam broke across the composable boundary).

## 4. File Bounds

| File | Access |
|---|---|
| `src/components/ui/data-table/composables/useDataTableRowIdentity.ts` | create |
| `src/components/ui/data-table/composables/useDataTableResponsive.ts` | create |
| `src/components/ui/data-table/DataTable.vue` | modify |
| `tests/components/ui/data-table/useDataTableRowIdentity.test.ts` | create |
| `tests/components/ui/data-table/useDataTableResponsive.test.ts` | create |

Do NOT touch: `src/components/ui/data-table/index.ts` (the barrel — no new export; the composables are internal), `src/components/ui/data-table/types.ts` (the `RowEntry` type stays put), `src/components/ui/data-table/DataTablePagination.vue`, `src/api/index.ts` (no public-API delta).

## 4a. Disjointness

Single agent unit; no intra-wave path contention. W14 owns only the `data-table/` tree + its `tests/` mirror. It shares NO `modify` path with W12, W13, or W15. W15 (hygiene) explicitly excludes the data-table split from its scope (the split is W14's).

## 5. Agent Units

### AW.W14.a DataTable row-identity + responsive composables

- Goal: `DataTable.vue` drops below 380 lines via two colocated internal composables owning row-identity and responsive projection, with no public-API change.
- Mechanism: extract `rowEntries` + row-id logic (`:102-175`) into `useDataTableRowIdentity`; extract `isCard`/`headerColumn`/`bodyColumns` into `useDataTableResponsive`; consume both from the SFC; mirror two units into `tests/`.
- Files: the two new composables, `DataTable.vue`, the two new test files.
- Sub-gate: `wc -l DataTable.vue ≤ 380`; `vitest run tests/components/ui/data-table/` green; `proof:no-test-in-src` clean; `vue-tsc --noEmit` green; `git diff src/components/ui/data-table/index.ts` empty.

## 6. Hard Gate

1. **Line ceiling.** `wc -l src/components/ui/data-table/DataTable.vue` returns ≤ 380.
2. **Concerns extracted.** Both `useDataTableRowIdentity.ts` and `useDataTableResponsive.ts` exist under `data-table/composables/`; `DataTable.vue` imports and consumes both; `grep` confirms the row-id functions and the projection computeds no longer reside in the SFC.
3. **No public-API change.** `git diff src/components/ui/data-table/index.ts` is empty; `npm run verify-export-types` (the subpath dts probe) shows no new/removed symbol.
4. **Tests pass, none under src.** `vitest run tests/components/ui/data-table/` green; `npm run proof:no-test-in-src` clean.
5. **Build + types green.** `npm run build` and `npm run typecheck` pass.

## 7. Format And Lint Cadence

- `npm run typecheck` after each extraction and before close.
- `npm run proof:no-test-in-src` after the test mirror lands.
- `npm run build` before close.
- `git diff --check` for whitespace.
- No formatter is skipped.

## 8. Verification Artefacts

- `docs/tranches/AW/audit/W14-datatable-split.md` — the pre/post `wc -l` for `DataTable.vue`, the two composable signatures, the unit-run output.
- The integration commit hash.

## 9. Commit Plan

- `refactor(data-table): extract useDataTableRowIdentity + useDataTableResponsive` — the two composables + the SFC consumption; body cites the 442→≤380 reduction and the orthogonal concerns (row identity ≠ responsive layout).
- `test(data-table): row-identity + responsive-projection units (tests/ mirror)` — the two mirrored units.
- `docs(AW): W14 close — split line-count + signatures` — the artefact + status commit.

## 10. Dependencies

- **Depends on**: AW tranche open. No dependency on other AW waves; may run in parallel with W12/W13 once main is clean.
- **Blocks**: nothing. The split is internal; no downstream consumer waits on it.

## 11. Archaeology

`DataTable.vue` is the single component the code-quality assay flagged clearly over the god-module threshold (442 lines); the assay's DO-NOT-SPLIT ledger cleared `BouncyToggle.vue` (475), `GlassDock.vue` (421), and `ContinuousMarkers.vue` (432) as cohesive-at-boundary — those are NOT touched here. The aurora/configurator/timeline/dock composable subdirs are the exemplar pattern this split follows; the guardrail against re-splitting the cleared files is the assay's recorded DO-NOT-SPLIT ledger (W15 records it as a one-line rationale comment, not a structural change).
