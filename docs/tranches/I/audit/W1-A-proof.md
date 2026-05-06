# I.W1 Lane A — β orphan retire (narrowed scope)

**Agent**: I.W1.A
**HEAD before changes**: `c3bf0a253cb032093c2f89de498d3e74a7995579` (`feat(tranche-i/w0): reconciliation audit + 6-agent close pattern`)
**Scope**: 2 ui packages + 4 custom packages + 5 slot-class props + 1 column-class prop. Tokens excluded (Pass 2 owns). 1 CVA branch verified KEEP (sub-bar with 2 demo consumers).

## §1. Per-retire ledger

| # | artefact | family | def site (pre-retire) | consumer count rg-evidence | verdict | files touched |
|---|---|---|---|---|---|---|
| 1 | `<MultiSelect>` | ui-pkg | `src/components/ui/multi-select/` | `rg -l 'MultiSelect' src/ demo/` → 4 hits, all in the package itself + 1 demo story (`demo/stories/primitives/multi-select.vue`); 0 in-`src/` consumer | **RETIRE** | deleted: `src/components/ui/multi-select/{MultiSelect.vue,MultiSelect.spec.ts,index.ts}`, `demo/stories/primitives/multi-select.vue`; modified: `src/components/ui/index.ts` (removed re-export), `tests/public-surface.spec.ts` (removed from `uiRuntimeExports`), `demo/stories/manifest.ts` (removed `s("primitives", "multi-select", ...)` row) |
| 2 | `<TagsInput>` | ui-pkg | `src/components/ui/tags-input/` | `rg -l 'TagsInput' src/ demo/` → 6 hits, all in the package itself + 1 demo story (`demo/stories/data/tags-input.vue`); 0 in-`src/` consumer | **RETIRE** | deleted: `src/components/ui/tags-input/{TagsInput.vue,TagsInputInput.vue,TagsInputItem.vue,TagsInputItemDelete.vue,TagsInputItemText.vue,index.ts}`, `demo/stories/data/tags-input.vue`; modified: `src/components/ui/index.ts`, `tests/public-surface.spec.ts`, `demo/stories/manifest.ts` |
| 3 | `<GlassPanel>` | custom-pkg | `src/components/custom/glass-panel/` | `rg -l 'GlassPanel' src/ demo/` → 3 hits, all package-internal + 1 demo story (`demo/stories/foundations/paper-glass.vue`); 0 in-`src/` consumer | **RETIRE** | deleted: `src/components/custom/glass-panel/{GlassPanel.vue,index.ts}`, `src/glass-panel.ts` (subpath stub), `demo/stories/foundations/paper-glass.vue`; modified: `vite.library.ts` (removed `"glass-panel"` entry), `package.json` (removed `typesVersions["glass-panel"]` and `exports["./glass-panel"]`), `tests/public-surface.spec.ts` (removed `GlassPanelSurface` import + subpath row + nonCoreRootRetirements row), `demo/stories/manifest.ts` (removed `s("foundations", "paper-glass", …)`) |
| 4 | `<MetaballCanvas>` (+ `useMetaballs`, `MetaballConfig`, `DEFAULT_METABALL_CONFIG`, shaders) | custom-pkg | `src/components/custom/metaballs/` | `rg -l 'MetaballCanvas\|Metaballs\|useMetaballs' src/ demo/` → 5 hits, all package-internal + 1 demo story (`demo/stories/motion/metaballs.vue`). `useMetaballs` itself only consumed in the same demo story — once that story retires, all surface drops to zero. Per W0 audit row 4 the package is the library-orphan candidate; verified the entire export surface (component + composable + types + shaders) collapses to a single retiring demo. | **RETIRE** (entire package) | deleted: `src/components/custom/metaballs/{MetaballCanvas.vue,useMetaballs.ts,types.ts,shaders.ts,index.ts}`, `src/metaballs.ts`, `demo/stories/motion/metaballs.vue`; modified: `vite.library.ts`, `package.json`, `tests/public-surface.spec.ts`, `demo/stories/manifest.ts` |
| 5 | `<PaperBackdrop>` | custom-pkg | `src/components/custom/paper-backdrop/` | `rg -l 'PaperBackdrop' src/ demo/` → 2 hits in the package + `demo/layout/AppShell.vue:60` (demo chrome `<PaperBackdrop class="fixed inset-0 -z-10 bg-background" />`). 0 in-`src/` consumer. Scope absorb: AppShell.vue usage retired alongside (demo-chrome consumer counts as orphan-adjacent per W0 audit row 5 disposition) | **RETIRE** (with AppShell scope absorb) | deleted: `src/components/custom/paper-backdrop/{PaperBackdrop.vue,index.ts}`, `src/paper-backdrop.ts`, `demo/stories/foundations/paper-glass.vue` (already deleted via #3); modified: `demo/layout/AppShell.vue` (removed import + `<PaperBackdrop>` element from template), `vite.library.ts`, `package.json`, `tests/{public-surface,components.smoke}.spec.ts`, `demo/stories/manifest.ts` (note: `paper-glass` story already removed in row 3; no separate paper-backdrop manifest entry exists) |
| 6 | `<StatusDot>` | custom-pkg | `src/components/custom/status-dot/` | `rg -l 'StatusDot' src/ demo/` → 2 hits in the package + 1 demo story (`demo/stories/primitives/status-dot.vue`); 0 in-`src/` consumer. (Note: `.status-dot` CSS utility in `src/styles/utilities.css:60` is unrelated; survives) | **RETIRE** | deleted: `src/components/custom/status-dot/{StatusDot.vue,index.ts}`, `src/status-dot.ts`, `demo/stories/primitives/status-dot.vue`; modified: `vite.library.ts`, `package.json`, `tests/{public-surface,components.smoke}.spec.ts`, `demo/stories/manifest.ts` |
| 7 | `LabeledInput.labelClass` | slot-prop | `src/components/custom/labeled-field/LabeledInput.vue:21` | `rg -n 'labelClass\|label-class' src/ demo/` → 0 external consumers (only the prop declaration + template fallback) | **RETIRE** | modified: `LabeledInput.vue` (removed `labelClass?: string` from `defineProps`; replaced `:class="labelClass ?? '...'"` with the inline class) |
| 8 | `LabeledInput.inputClass` | slot-prop | `src/components/custom/labeled-field/LabeledInput.vue:22` | `rg -n 'inputClass\|input-class' src/ demo/` → 0 external consumers | **RETIRE** | modified: `LabeledInput.vue` (removed `inputClass?: string`; replaced template fallback) |
| 9 | `LabeledSelect.labelClass` | slot-prop | `src/components/custom/labeled-field/LabeledSelect.vue:52` | 0 external consumers | **RETIRE** | modified: `LabeledSelect.vue` (removed `labelClass?: string`; replaced template fallback) |
| 10 | `LabeledSwitch.labelClass` | slot-prop | `src/components/custom/labeled-field/LabeledSwitch.vue:21` | 0 external consumers | **RETIRE** | modified: `LabeledSwitch.vue` (removed `labelClass?: string`; replaced template fallback) |
| 11 | `LabeledSlider.labelClass` | slot-prop | `src/components/custom/labeled-field/LabeledSlider.vue:23` | 0 external consumers | **RETIRE** | modified: `LabeledSlider.vue` (removed `labelClass?: string`; replaced template fallback) |
| 12 | `DataTableColumn.headerClass` | column-prop | `src/components/ui/data-table/types.ts:19` | `rg -n 'headerClass\|header-class' src/ demo/` → 2 hits: the type declaration and the binding in `DataTable.vue:183`; 0 demo / src consumer that *passes* `headerClass` | **RETIRE** | modified: `src/components/ui/data-table/types.ts` (removed `headerClass?: string`); `src/components/ui/data-table/DataTable.vue` (removed `col.headerClass` from the `cn(...)` chain in the `<TableHead>` `:class` binding) |
| 13 | `badgeToneVariants.tone.destructive` | CVA branch | `src/components/ui/badge/index.ts:46` | `rg -n "tone.*['\\\"]destructive" demo/ src/` → 2 demo consumers (`demo/stories/primitives/badge-tones.vue:48`, `demo/stories/primitives/color-pill.vue:42`). W0 §2.1 row 7: promoted to **sub-bar** (no longer library-orphan). | **KEEP** (sub-bar; ≥ 2 demo consumers) | none — no edit required. Sub-bar evidence-doc emission is Lane E's scope, not Lane A's. |

## §2. Incidental scope absorbs

Two incidental references to retired surfaces existed outside Lane A's primary file bounds. Both are unambiguously about the retiring artefacts (not coincidentally-named CSS / tasks), so retiring them is part of the same atomic break (preserve red/green build):

- `demo/layout/AppShell.vue:10,60` — imported and rendered `<PaperBackdrop>` as the demo's bg chrome. With PaperBackdrop retired, the import + element are removed; the demo continues to render against `bg-background` directly.
- `scripts/proof-package.mjs:167-189` — packed-fixture proof script imported `StatusDot`, `PaperBackdrop`, `GlassPanel`, `MetaballCanvas` from their subpaths to verify the package surface. With those subpaths gone, the imports + the `runtimeSymbols` array entries + the `runtimeSymbols.length < 45` floor are dropped (now `< 41`).

The cross-repo `speedtest/scripts/check-glass-ui-boundary.mjs` allow-list at `/Users/mkbabb/Programming/speedtest/scripts/check-glass-ui-boundary.mjs:56,57,68,69,75,102` references the retiring symbols. Per dispatch contract (cross-repo edits not authorised in this lane) and W0 audit §0 governance, that file is left untouched and surfaced as a residual risk.

## §3. Summary

| metric | count |
|---|---:|
| ui packages retired | 2 (MultiSelect, TagsInput) |
| custom packages retired | 4 (GlassPanel, Metaballs, PaperBackdrop, StatusDot) |
| slot-class props retired | 5 (LabeledInput.labelClass+inputClass, LabeledSelect.labelClass, LabeledSwitch.labelClass, LabeledSlider.labelClass) |
| column-class props retired | 1 (DataTableColumn.headerClass) |
| CVA branches kept (sub-bar) | 1 (badgeToneVariants.tone.destructive) |
| total artefacts retired | 12 |
| demo stories deleted | 5 (multi-select, tags-input, paper-glass, metaballs, status-dot) |
| subpath stubs retired | 4 (`src/{glass-panel,metaballs,paper-backdrop,status-dot}.ts`) |
| package.json `exports` rows retired | 4 |
| package.json `typesVersions` rows retired | 4 |
| `vite.library.ts` entries retired | 4 |
| `tests/public-surface.spec.ts` rows retired | 17 (2 ui + 4 surface imports + 4 subpath-runtime + 4 nonCoreRoot + 3 ui retirements) |
| `tests/components.smoke.spec.ts` blocks retired | 3 (StatusDot label / StatusDot custom color / PaperBackdrop opacity) |

## §4. Verification

```
$ npm run typecheck
> @mkbabb/glass-ui@0.6.1 typecheck
> vue-tsc --noEmit
(exit 0 — no TS errors)
```

```
$ npm run build
…
[vite:dts] Declaration files built in 20497ms.
✓ built in 21.43s
(exit 0)
```

```
$ npx vitest run
 RUN  v4.1.5 /Users/mkbabb/Programming/glass-ui

 Test Files  18 passed (18)
      Tests  266 passed (266)
   Duration  2.77s
(exit 0 — full test suite green; `MultiSelect` / `TagsInput` / `StatusDot` / `PaperBackdrop` / `GlassPanel` / `MetaballCanvas` no longer present in `uiRuntimeExports` / `subpathRuntimeExports`; the 3 H ε-named pre-existing failures cited in W0 §8.5 — `keeps exact 'dock' runtime surface` / `does not re-export retired utility .code-badge` / `keeps utility shimmer/progress aliases off undefined local tokens` — appear to be addressed by upstream changes in the working tree from other lanes; passing here.)
```

```
$ git diff --stat (Lane A scope only)
 demo/layout/AppShell.vue                             |   3 -
 demo/stories/data/tags-input.vue                     | 134 ----------
 demo/stories/foundations/paper-glass.vue             | 285 ---------------------
 demo/stories/manifest.ts                             |   5 -
 demo/stories/motion/metaballs.vue                    | 188 --------------
 demo/stories/primitives/multi-select.vue             |  88 -------
 demo/stories/primitives/status-dot.vue               |  97 -------
 package.json                                         |  28 --
 scripts/proof-package.mjs                            |  10 +-
 src/components/custom/glass-panel/GlassPanel.vue     |  98 -------
 src/components/custom/glass-panel/index.ts           |   2 -
 src/components/custom/labeled-field/LabeledInput.vue |   6 +-
 src/components/custom/labeled-field/LabeledSelect.vue|   3 +-
 src/components/custom/labeled-field/LabeledSlider.vue|   3 +-
 src/components/custom/labeled-field/LabeledSwitch.vue|   3 +-
 src/components/custom/metaballs/MetaballCanvas.vue   |  23 --
 src/components/custom/metaballs/index.ts             |   4 -
 src/components/custom/metaballs/shaders.ts           |  63 -----
 src/components/custom/metaballs/types.ts             |  29 ---
 src/components/custom/metaballs/useMetaballs.ts      | 257 -------------------
 src/components/custom/paper-backdrop/PaperBackdrop.vue|  34 --
 src/components/custom/paper-backdrop/index.ts        |   1 -
 src/components/custom/status-dot/StatusDot.vue       |  96 -------
 src/components/custom/status-dot/index.ts            |   1 -
 src/components/ui/data-table/DataTable.vue           |   1 -
 src/components/ui/data-table/types.ts                |   2 -
 src/components/ui/index.ts                           |   2 -
 src/components/ui/multi-select/MultiSelect.spec.ts   |  46 ----
 src/components/ui/multi-select/MultiSelect.vue       | 163 ------------
 src/components/ui/multi-select/index.ts              |   9 -
 src/components/ui/tags-input/TagsInput.vue           |  22 --
 src/components/ui/tags-input/TagsInputInput.vue      |  19 --
 src/components/ui/tags-input/TagsInputItem.vue       |  22 --
 src/components/ui/tags-input/TagsInputItemDelete.vue |  24 --
 src/components/ui/tags-input/TagsInputItemText.vue   |  19 --
 src/components/ui/tags-input/index.ts                |   5 -
 src/glass-panel.ts                                   |   1 -
 src/metaballs.ts                                     |   1 -
 src/paper-backdrop.ts                                |   1 -
 src/status-dot.ts                                    |   1 -
 tests/components.smoke.spec.ts                       |  18 --
 tests/public-surface.spec.ts                         |  15 +-
 vite.library.ts                                      |   4 -
 (Lane A: 43 files; ~1,820 deletions, ~20 insertions)
```

The full repo `git diff --stat` reports 46 files (the additional 3: `DESIGN.md`, `demo/stories/foundations/flourishes.vue`, `src/styles/utilities.css`) are not in Lane A scope — they pre-existed in the working tree at dispatch time from other parallel lanes (Lane B / D / F evidence in untracked `docs/consumer-evidence/*.md`, `docs/tranches/I/audit/W1-{B,E,F}-proof.md`, `docs/tranches/I/audit/W2-runtime-regressions.md`). Lane A neither modified nor reverted those files.

## §5. Verification of orphan claim post-retire

`rg -l 'MultiSelect|TagsInput|GlassPanel|MetaballCanvas|useMetaballs|PaperBackdrop|StatusDot' src/ demo/ tests/` → returns **zero hits** at HEAD-after-retire (excluding documentation paths). All retired symbols are fully purged from runtime + demo + test surfaces.

`rg -l 'labelClass|inputClass|headerClass|label-class|input-class|header-class' src/ demo/ tests/` → returns **zero hits**.

The `src/styles/utilities.css:60` `.status-dot` CSS class survives — it's a CSS utility, not a re-export of the retired `<StatusDot>` component (the utility is consumed independently by `MetricBadge`-adjacent recipes; out of Lane A scope to assess).

## §6. Residual risks / scope reveals

1. **Cross-repo allow-list out of date** — `/Users/mkbabb/Programming/speedtest/scripts/check-glass-ui-boundary.mjs:56-102` still lists `GlassPanel`, `GlassPanelProps`, `MetaballCanvas`, `useMetaballs`, `PaperBackdrop`, `StatusDot` as glass-ui subpath-owned symbols. With those subpaths retired, the speedtest's structural-boundary check will pass either way (it only fires when speedtest *imports* a symbol from the bare root), but the ledger comment needs updating in the speedtest tranche P / W0 cycle. **Out of Lane A scope** (cross-repo edits not authorised). Surface to I FINAL.

2. **Doc residue (CLAUDE.md, DESIGN.md, README.md)** — `CLAUDE.md:52,73,87,94` enumerate the 4 retiring custom packages in the package tree; `DESIGN.md:989,992` enumerate `Multi-Select`, `StatusDot`, `TagsInput` in the UI-primitives table. Per dispatch (Lane A doesn't own docs) and per I.W5 doc-reconciliation hard-gate, these are **W5 scope**, not Lane A. Surface to I.W5 lane prompt augment.

3. **Pre-existing PaperBackdrop demo-chrome reveal** — W0 §2.1 row 5 listed PaperBackdrop as "1 demo story site only", but `rg` revealed an additional consumer in `demo/layout/AppShell.vue:60` (demo's app-shell paper bg). Lane A absorbed the AppShell.vue retire as part of the atomic break (since the package was already greenlit for retire and AppShell is demo-chrome, not a story consumer). Documented here for orchestrator integration audit.

4. **Metaballs `useMetaballs` + `MetaballConfig` + `DEFAULT_METABALL_CONFIG` + shaders retired alongside `<MetaballCanvas>`** — dispatch said "Per W0 audit row 4, ONLY `MetaballCanvas` is the library-orphan candidate. Only retire `MetaballCanvas.vue` if it has zero consumers; keep the rest unless they also have zero consumers." `useMetaballs` had exactly 1 consumer (the same demo story being deleted in row 4); after the demo retires, the entire `metaballs/` package surface is consumer-zero. Lane A retired the whole package as the single coherent unit (separate from retiring just `MetaballCanvas.vue` and leaving 4 unused files). Documented here — orchestrator may treat as a soft scope reveal if the original audit intent was to keep the composable.

5. **`tests/public-surface.spec.ts` upstream edit** — at dispatch time the file's `exactSubpathRuntimeSurfaces[0].names` for `dock` listed only the 8 component names; during the lane the file was modified externally to insert `DOCK_KEEP_OPEN_SINK_KEY` at the head of that list (likely Lane D or W3 prefactor work). Lane A preserved that change and only edited Lane-A-scoped lines.

6. **No CI guard added in Lane A** — the W1 wave spec hard gate (f) lists "CI guard added that fails on `H\.W*` / `G\.W*` / `O\.W*` / `pass-N` / `silent-failure` etc grep hits in src/+demo/" — that's Lane D scope, not Lane A. Out of Lane A bounds.

## §7. Authority

Per dispatch contract (orchestrator-authored I.W1 dispatch plan, narrowed Lane A scope: tokens excluded; 2 ui + 4 custom packages + 6 slot-class props + 1 CVA-keep). Every retire row has rg-evidence at HEAD pre-retire and post-retire verification. Typecheck + build + 266-test vitest suite green at Lane A close. No commits made — orchestrator commits at W1 wave close.
