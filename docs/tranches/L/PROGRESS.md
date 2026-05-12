# L — Progress Log

## 2026-05-11 — Tranche open

L opens against K close `35cae2c` (FINAL.md present; tag `v0.9.3` pushed to origin; precept submodule at `d4ada55` with 4 K W0 + 2 K W8 lessons-learned).

The tranche opens on six load-bearing research inputs (`docs/tranches/L/research/R{α,β,γ,δ,ε,ζ}-*.md`):

1. **Rα K retrospective** — surfaced 2 P0 SILENT MISSES K close missed (WS subpath typing publication broken; WS Phase 1 ACCEPT-DEGRADED was the wrong disposition call) + 6 P1 EXECUTED-WITH-WORKAROUND items + 6 P2 scope-drift/precept gaps. Net: K closed canonically at strict-binary 14-gate reading but 2 of 16 invariants fail outright under harsher precept-stream reading.

2. **Rβ chronic-deferrals ledger** — 56 rows extending the C→K ledger. 23 L-bound rows; top 5 P0: WS Phase 2 (HEADLINE), subpath typing-publication gap, StoryPager inner-tab overflow, unused composables wire-or-retire, P-tranche + DockShowcaseFrame second-consumer fidelity. 10 permanent-defer; 8 chronic-threshold trips.

3. **Rγ residuals-to-waves** — proposed 9-wave structure (W0..W8). HEADLINE = L.W1 (Phase 2 + curated barrel + api/ + subpath flatten). Critical-path 5 sequential edges; peak parallelism 6 agents at W1.

4. **Rδ dispatch friction** — 3 K incidents (W3.A stash + W3.B revert + W6 worktree anomaly) recapped; 7 precept-update proposals; cross-repo coordination protocol for speedtest Y.A3 parallel-with-L; 4-phase modularization dispatch model.

5. **Rε architectural transpositions + modularization audit** — 9 transposition candidates + 33 modularization findings + 18-item v1.0 cohort proposal (10 strict-essential). HEADLINE recommended: L.W1 combining 4 transpositions (Phase 2 + curated barrel + api/ + dts publication fix).

6. **Rζ prompt recap** — 47 directives across C→L tranches. 5 verbatim-recurring + 7 cross-cutting + 27 tranche-specific + 8 L-new. All 8 L-new directives mapped to research deliverables.

Open commit lands: `L.md`, `findings.md`, `waves/W{0..8}.md`, `dispatch/AGENT.md`, this `PROGRESS.md`, 6 research deliverables, scaffold `audit/` + `coordination/` dirs.

## Status

| Wave | Status | Notes |
|---|---|---|
| W0 | CLOSED (TBD commit) | Lane I `audit/W0-reconciliation.md` (~115 entries, 49 L-bound) + Lane II precept submodule (5 lessons + 3 SPEC + 1 dispatch field + 1 ORCHESTRATION clause) + Lane III subpath dts publication gap fixed (flat-entry rebinding + impl-lift) + Lane IV `coordination/speedtest-Y.md` + v0.9.4 tagged + pushed |
| W1 (HEADLINE) | CLOSED (TBD commit) | Phase 2 root-barrel + `src/api/` + flat `/dark` `/keyboard` `/carousel` subpaths; v1.0 tag |
| W2 | pending W1 | modularization sweep — composables/ restructure + cohesion + import shape |
| W3 | pending W1 (parallel with W4) | composable + primitive second-consumer fidelity audit |
| W4 | pending W1 (parallel with W3) | mobile-viewport finishing + π residuals from K |
| W5 | pending W2 + W3 | doc cohort + production-demo-build + MIGRATION.md |
| W6 | pending W1 (parallel with W3+W4) | Lighthouse cohort completion (P2 carry-forwards) |
| W7 | pending W3 + W4 + W5 + W6 | keyframes lift + aurora chrome Option-A unification |
| W8 | pending W7 | close ceremony — 7-agent strengthened audit + ι integrity-sweep + FINAL.md |

## Inbound from speedtest Y tranche

Speedtest opens tranche Y in parallel with L. 6 active Y-prefixed worktrees including `y-a3-glass-ui` (speedtest's glass-ui-side audit lane).

**Coordination protocol** (L W0 published `docs/tranches/L/coordination/speedtest-Y.md`):
- speedtest Y.A3 is reader-only + recommender-only during L flight.
- L absorbs any Y.A3 recommendations at L W0 OR formally re-defers to M with named destination.
- No cross-repo source commits except L W0 v0.9.4 patch (subpath typing-gap fix) + L W1 close v1.0 release + speedtest re-link cycle.

## 2026-05-11 — W0 close (TBD orchestrator commit)

3 parallel lanes returned green:
- **Lane I** (reconciliation): authored `audit/W0-reconciliation.md` cataloguing ~115 entries across the 6 research deliverables + K residuals + K cross-tranche debt + Rζ 47 directives. 49 L-bound dispositions distributed across W0..W8; peak parallelism 6 agents. 2 P0 silent misses confirmed at HEAD (Rα P0-1 typing gap → L.W0 Lane III; Rα P0-2 SCC trap → L.W1 HEADLINE). 7 orchestrator-blocking open questions surfaced; defaults absorbed per L research recommendations (W3 NumberField ship-with-doc; W2 useStoryDemo demo-private move; src/<flat> subpath barrels ACCEPT-AS-IS; demo-build retire; surface-tint rungs Option A; Configurator fixture DEFER-TO-M; Y.A3 protocol locked).
- **Lane II** (precept submodule): 4 files modified in `docs/precepts/instructions/` — 5 new 2026-05-11 LESSONS-LEARNED entries (harness-level revert; subpath typing probe; cross-repo annotation push asymmetry; DEGRADED-restoration binding; coordination/ artefact class); 3 new SPEC clauses (ι reflog scan in close; coordination/ artefact class; DEGRADED-runtime-outcome binding); 1 new dispatch field (`worktree_diff_verification`); 1 new ORCHESTRATION clause (Cross-repo commit policy).
- **Lane III** (subpath dts publication gap P0): diagnosed root cause as `vite-plugin-dts` `rollupTypes` nested-entry stub-emission. Fix: flat-entry rebinding (`composables/dark` → `dark-subpath` + `composables/keyboard` → `keyboard-subpath` in `vite.library.ts`; `package.json` `exports` + `typesVersions` map public subpath `@mkbabb/glass-ui/composables/{dark,keyboard}` to flat dist files) PLUS implementation lift (`src/composables/dark.ts` + `keyboard.ts` now hold canonical implementations; legacy `useGlobalDark.ts` + `useKeyboardShortcuts.ts` are 1-line re-export shims preserving 18 importers). v0.9.4 release: `package.json` bumped; `CHANGELOG.md` v0.9.4 entry; `scripts/release.sh` new subpath-resolve probe block (10 subpaths probed before tag). VERIFIED: dist self-contained; typecheck green; build green at 8GB heap (~33s); synthetic-consumer `tsc --noEmit` probe clean.
- **Lane IV** (orchestrator-authored): `docs/tranches/L/coordination/speedtest-Y.md` ships with 7 sections covering wave-timeline touchpoints + writer-vs-reader boundary + push-or-handoff disposition table + conflict-resolution path + shared telemetry indicators.

## 2026-05-11 — W1 HEADLINE close (TBD orchestrator commit)

3 worktree-isolated lanes returned green; orchestrator integrated additive package.json + vite.library.ts diffs; absorbed 13 expected v1.0 test breaks via subpath import migration:

- **Lane A** (root-barrel curation): `src/index.ts` strips vueuse-bearing re-exports. Strategy was to replace the single `export * from "./components/ui"` wildcard with 40 explicit per-package re-exports, omitting the 4 vueuse-bearing packages (`input/`, `textarea/`, `combobox/`, `carousel/`) PLUS removing the `useGlobalDark`, `useKeyboardShortcuts`, `useCarousel` family re-exports from the root barrel. Total ~30 runtime/type exports removed from root. SCC trap closure verified glass-ui-side: `grep "from '@vueuse'" dist/glass-ui.js` returns empty. Proof: `audit/W1-A-root-barrel-curation-proof.md`.
- **Lane B** (`src/api/` discovery layer): single-file `src/api/index.ts` re-exports 32 canonical public symbols (24 types + 8 constants/runtime values) across 5 domain groupings (Aurora, Configurator, Metaballs, Surface enums, CVA variants). `dist/api.js` 220 B (runtime constants; types erase); `dist/api.d.ts` 12,513 B / 32 export declarations / zero broken `'../src/...'` refs. Proof: `audit/W1-B-api-discovery-layer-proof.md`.
- **Lane C** (subpath flatten + `/carousel`): 3 NEW top-level barrels — `src/dark.ts`, `src/keyboard.ts`, `src/carousel.ts`. Retires v0.9.x transitional shapes `dark-subpath` + `keyboard-subpath` from `vite.library.ts`; removes `./composables/{dark,keyboard}` from `package.json` exports + typesVersions. Adds canonical `./dark`, `./keyboard`, `./carousel`. v1.0 CHANGELOG entry covers all breakers. Proof: `audit/W1-C-subpath-flatten-proof.md`.

**Test absorptions** (orchestrator close-pass):
- `tests/public-surface.spec.ts`: removed Input/Textarea/Combobox/Carousel/useCarousel/useGlobalDark/isMac/formatCombo/formatComboParts/registerShortcut/useRegisteredShortcuts from `uiRuntimeExports` + `composableRuntimeExports`. Added them to `subpathRuntimeExports` (forms/carousel/dark/keyboard surfaces) AND to `nonCoreRootRetirements` (asserts the symbols are NO LONGER on root). Added Api surface with constants probe.
- `tests/components.smoke.spec.ts`: Input + Textarea imports retargeted from `../src/index` to `../src/forms`.
- `tests/composables.smoke.spec.ts`: registerShortcut import retargeted from `../src/index` to `../src/keyboard`.

**Verification**:
- `npm run typecheck` clean.
- `NODE_OPTIONS=--max-old-space-size=8192 npm run build` succeeds (~31s).
- `npm test`: 357/357 PASS.
- `npm run profile:budget` PASS: glass-ui.js raw 124.8K / 33.7K gz budget (66.6% headroom; -13.6K raw / -3.0K gz vs W0 close).
- `dist/{dark,keyboard,carousel,api}.{js,d.ts}` self-contained.
- `bash scripts/release.sh v1.0.0` — typecheck + test + build + 7-subpath probe (forms/api/dark/keyboard/carousel/tokens/dock) + tag (orchestrator runs at close).

**Bundle-budget glass-ui-side baseline post-L W1**: ~65K raw / ~11K gz cumulative drop from K close (189K raw / 33.6K gz). The wave hard-gate's ≥ 15 KB speedtest-side entry-chunk drop is the canonical SCC-trap closure proof — owned by post-tag speedtest re-link cycle.

## Brittleness window

**W1 will declare** `breaking_changes_during_wave: yes` (v1.0 breaks v0.9.x root-barrel imports for vueuse-bearing symbols). `restoration_wave: N/A` — v1.0 IS the restoration; the migration guide is the user-facing path.

**W7 may declare** if aurora Option-A unification reshapes `<AuroraConfigDock>` template API.

## Provisional carry-forward to M

To be enumerated at L close in `docs/tranches/L/audit/L-residuals.md`. Provisional candidates:

- Substrates formally retired with named L-FINAL rationale (no further M revisit).
- Rε §B findings (33 candidates) that exceed L W2 scope.
- `src/styles/` cascade-order documentation gap.
- Speedtest Y.A3 final-disposition (after speedtest re-link at v1.0).
