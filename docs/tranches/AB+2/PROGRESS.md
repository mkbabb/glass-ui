# AB+2 — PROGRESS (reverse-engineered execution log)

**Reconstruction method**: read-only `git log --format='%H|%an|%ad|%s' --date=iso <range>` + `git show --stat <hash>` walk of the 7-commit window between P close `9f774b4` (2026-05-16 ~12:xx) and HEAD `d244dd5` (2026-05-18 02:03). Authored retroactively at Q.W0 Lane A (2026-05-18).

**Window**: 2026-05-16 17:57:21 → 2026-05-18 02:03:34 (-0400); ~32 hours wall clock; 3 calendar days.

## Timeline

```
2026-05-16 (Saturday)

17:57  W1 open + close   AD.W4.T2 cross-repo landing
       949474a  refactor(freshness): retire assertDistFresh + freshness-walk + freshness-gate apparatus (AD.W4.T2)
                          — src/freshness.ts DELETED (77 LOC)
                          — scripts/freshness-gate.mjs DELETED (107 LOC)
                          — scripts/freshness-walk.mjs DELETED (56 LOC)
                          — scripts/freshness-walk.d.mts DELETED (15 LOC)
                          — scripts/__tests__/freshness-gate.test.ts DELETED (66 LOC)
                          — package.json: ./freshness subpath + prebuild script + vite.library.ts entry removed
                          — src/index.ts: retired-subpath NOTE-block removed
                          — net: −342 LOC, −1 subpath; build clean (26.69s per commit body)

(~30-hour gap; P close ceremony + unrelated work)

2026-05-17 (Sunday)

23:46  W2 open            dock edge-fade retire
       099d51e  fix(dock): retire purposeless edge-fade mask that shadowed the last dock item
                          — src/styles/dock.css: mask-image linear-gradient removed from
                            .dock-layers (horizontal) and .glass-dock.vertical (vertical)
                          — --mask-fade-width token retained (utilities.css consumer)
                          — +21 / −36 in dock.css (net −15)

23:51  W2 cont.           timeline stitched-gradient rewrite
       3cb70db  feat(timeline): stitched continuous gradient + rounded ends + glassy dots
                          — 3 files: ContinuousTimeline.vue, GlassTimeline.vue, related CSS
                          — REMOVED: continuousRegionBackground() computed (per-region gradient; dead code)
                          — ADDED: single rail-spanning stitched gradient (weight-centre stops;
                            background-size + background-position-x per region)
                          — CHANGED: terminus border-radius anchored to first/last region only
                          — ADDED: glass-dot primitive (--timeline-dot-fill, --timeline-dot-blur,
                            --timeline-dot-ring, --timeline-dot-tint-{active,complete,pending})
                          — +317 / −41

(~1h 44min interval; staging dual-scope toggle/dock commit)

2026-05-18 (Monday)

01:35  W2 close + W3 open  dual-scope toggle+dock fix
       beec35e  fix(toggle,dock): card variant sizes to content + inactive dock layers leave the hit-test tree
                          — src/components/ui/toggle/index.ts: compoundVariants h-auto for card×size (W3)
                          — src/styles/dock.css: visibility:hidden + delayed transition for
                            .dock-layer-item-host + .dock-layer inactive state (W2)
                          — package.json: /toggle subpath export + typesVersions wiring (NOT a version bump)
                          — +47 / −4 (3 files)

01:36  W3 cont.           MetricStack result register
       9ba68ca  feat(metric-stack): compact result register + tokenised value-clamp cqi arm
                          — src/components/custom/metric-stack/MetricStack.vue: register prop
                            ("audacious" | "result"), provide(metricRegisterKey), token scoping
                          — src/components/custom/metric-stack/MetricRow.vue: register inject,
                            --metric-row-value-clamp-cqi token consumption
                          — __tests__/MetricStack.test.ts: +18 specs
                          — +77 / −2 (3 files)

01:52  W3 cont.           DataTable responsive layout
       1c6c3e5  feat(data-table): responsive card-per-row projection at narrow widths
                          — src/components/ui/data-table/DataTable.vue: responsive prop,
                            cardBreakpoint prop, useElementSize integration, card-layout template branch
                          — src/components/ui/data-table/types.ts: DataTableColumn.cardLabel? field
                          — +157 / −6 (2 files)

02:03  W3 close           MetricStack label-clamp tighten
       d244dd5  fix(metric-stack): tame the result register — label-clamp tokens + tighter value ceiling
                          — src/components/custom/metric-stack/MetricRow.vue: --metric-row-label-clamp-{min,cqi,max}
                            token family; label clamp parameterised (4 tokens)
                          — src/components/custom/metric-stack/MetricStack.vue: result register label-clamp
                            overrides; value ceiling tightened (3rem, 9cqi)
                          — +22 / −6 (2 files)
                          — HEAD at Q open
```

## Per-wave summary

| Wave | Commits | Duration | Tag | Tag status |
|---|---|---|---|---|
| W1 | 1 | single commit (2026-05-16 17:57) | (none) | N/A — shrinkage-only retire |
| W2 | 3 | ~1h 50min (23:46 → 01:35 next day) | (none) | N/A — bug-fix / rewrite; no release bump |
| W3 | 4 | ~28min (01:35 → 02:03) | (none) | N/A — feature additions; no release bump |

## Gap analysis

The ~30-hour gap between W1 (2026-05-16 17:57) and W2 (2026-05-17 23:46) spans the Saturday evening → Sunday night interval. The W2–W3 cluster (5 commits) landed in a ~1h 47min burst (23:46 → 02:03) crossing midnight into Monday. This pattern — a long quiet period followed by a dense multi-topic burst — is consistent with unplanned inter-tranche shadow work: no wave discipline, no tranche-folder check, no release tag.

## Process observations

AB+2 shipped 7 commits over ~32 hours without:

- a `docs/tranches/AB+2/` plan-folder structure (NO AB+2.md, NO waves/, NO FINAL.md at execution time);
- a formal dispatch wave (every commit landed direct-to-master without orchestrator-side wave gating);
- a close ceremony (no strengthened audit; no plan-vs-actual; no substrate-without-consumer audit);
- a release tag (package.json stays v1.8.4; `beec35e`'s package.json hunk is a /toggle subpath export entry, not a version bump).

This is the fourth recurrence of the K-invariant-3 shadow-execution anti-pattern, and the first after invariant 29 was codified.

## Reconstruction citations

- `git log --format='%H|%an|%ad|%s' --date=iso 9f774b4..d244dd5` — 7-row commit window.
- `git show --stat <hash>` — file-level delta per commit (7 reads).
- `git tag --list 'v1.8.*' | sort -V` — confirms v1.8.4 is the last tag; no v1.8.5+ present within the cohort window.
- Commit bodies — LOC counts, verification snippets (`npm run build: ✓`), empirical re-challenge note (`d244dd5`).
