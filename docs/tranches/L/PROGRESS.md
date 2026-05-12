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
| W0 | CLOSED `b75ebb2` | Lane I `audit/W0-reconciliation.md` (~115 entries, 49 L-bound) + Lane II precept submodule `b51047d` (5 lessons + 3 SPEC + 1 dispatch field + 1 ORCHESTRATION clause; push deferred) + Lane III subpath dts publication gap fixed (flat-entry rebinding + impl-lift) + Lane IV `coordination/speedtest-Y.md` + v0.9.4 tagged + pushed |
| W1 (HEADLINE) | CLOSED `d1de94b` + `fa6e6c7` | Phase 2 root-barrel + `src/api/` + flat `/dark` `/keyboard` `/carousel` subpaths; v1.0.0 tagged + pushed; speedtest re-link `98f88325` |
| W2 | CLOSED `aace84e` | modularization sweep — composables/ restructured into 8 coherent sub-trees (dark/keyboard/reactive/dom/motion/glass/sortable/sidebar); cherry-pick rationale + cascade docs landed |
| W3 | CLOSED `f481ba2` | composable + primitive second-consumer fidelity audit; 3 retired composables + DockShowcaseFrame retired; 3 primitives wired (DiscoGlyph + DockGroup + InstrumentChassis) |
| W4 | CLOSED `1c1788f` | mobile-viewport finishing + π residuals; dock-group 375 overflow fixed; 26/27 viewport probe cells PASS |
| W5 | CLOSED `efb802a` | doc cohort (CLAUDE/README/DESIGN/CHANGELOG aligned); MIGRATION.md 430 LOC / 17 breaks; K R3 19 status-line bumps; K R4 Option A (surface-tint rungs); production-demo-build Option B (formal retire) |
| W6 | CLOSED `ae4cad5` | Lighthouse cohort completion; 4 K-absorbed re-verified; robots.txt deferred to W5; Vue runtime + cache-ttl formal-retired |
| W7 | CLOSED `59b7b56` | 3 keyframes lifted to animations.css; useConfiguratorState<T> gained cloneMode='per-preset' + toRaw clone hardening; useAuroraStudio retired; F-ε-3 Playwright-clean; Lighthouse-OPEN routed to M-tranche |
| W8 | CLOSED (this commit) | 7-agent strengthened audit (α/β/γ/δ/ε/π/ι); γ FAIL-WITH-FIXES absorbed (2 P0 + 7 P1 doc-only fixes); FINAL.md authored; L-residuals.md catalogues 4 P2 + 12+ P3 + 2 permanent-defer + 1 process M-bound; ι reflog scan canonical CLEAN |

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

**Cross-repo SCC-trap closure verified** (canonical W1 hard gate (f) — see `coordination/speedtest-Y.md` §6.5):
- Speedtest re-link commit `98f88325` (`feat(deps): adopt glass-ui v1.0`). 15 speedtest src/ files migrated to v1.0 subpath surface.
- speedtest `dist/index.html` modulepreload directives: 0 (was 1 at K close X.W3.c re-probe).
- Speedtest entry-chunk gz: 171.5 KB (was 204 KB at speedtest X close pre-Phase-1; -32.5 KB drop exceeds ≥ 15 KB hard-gate target).
- Speedtest build: PASS in 9.83s.
- Y.A3 typing-publication unblocked at glass-ui v0.9.4 (W0 Lane III); v1.0 transposes the consumer-facing subpath surface to its canonical shape.

## 2026-05-11 — W3 + W4 + W6 close (TBD orchestrator commit; 4 parallel agents)

**W3 — second-consumer fidelity** (Lane A composables + Lane B primitives; coordinated via MIGRATION.md + CHANGELOG.md append):

Lane A composable dispositions (after cross-repo speedtest grep at wave open):

| Composable | Decision | Consumer evidence |
|---|---|---|
| useRAFLoop | WIRE-RETAIN | speedtest useMeterRenderer.ts canvas render loop + demo + test |
| useIntersectionPause | WIRE-RETAIN | speedtest useAuroraPolicy.ts aurora reduced-motion gating + demo + test |
| useDarkModeSync | WIRE-RETAIN | speedtest SpeedtestMeter.vue + useEChartsTheme.ts (2 sites) + demo |
| useOffsetPagination | RETIRE | 0 speedtest consumers; demo-only |
| useVirtualSectionWindow | RETIRE | 0 speedtest consumers; demo-only |
| useWindowedStore | RETIRE | 0 speedtest consumers; demo-only |
| virtualSectionLayout helpers | RETIRE | support substrate for retired parents |

Cross-repo grep INVALIDATED the Rε A5 "0 prod consumers → WIRE into Pulse/Typewriter" hypothesis; the 3 motion composables already satisfy ≥ 2 consumers naturally.

Lane B primitive dispositions:

| Primitive | Decision | Wire-site / Rationale |
|---|---|---|
| DiscoGlyph | WIRE | live facet-swatch row in foundations/chart-chassis-palette.vue (8-stop gradient bind) |
| DockGroup | WIRE | KPI pill-row shelf in compositions/dashboard.vue (4 MetricBadge cells) |
| InstrumentChassis | WIRE | live mini-chassis in foundations/chart-chassis-palette.vue (4 chassis-token compose) |
| DockShowcaseFrame | RETIRE | 0 consumers at HEAD (orphaned since V.W4); demo-private file deleted |

W3 file count: 17 (10 deletions including 2 src/composables sub-tree removals + 2 subpath barrels + 3 demo stories; 7 edits to barrels/manifests/tests/scripts; MIGRATION.md created with both lanes' sections; W3-A + W3-B proof docs).

`@mkbabb/glass-ui/pagination` and `@mkbabb/glass-ui/virtual` subpaths fully removed from `package.json` exports + typesVersions + `vite.library.ts` libraryEntries (cleaner v1.0 surface).

**W4 — mobile-viewport finishing**: K R1 residual analyzed — the StoryPager inner-tab-row fix had already landed at K W5 commit `12abb09` (`.story-pager-row` overflow-x auto + scrollbar-width none). The actual K W8 π-1 residual was a `MetricBadge size="lg"` `0.8ms` chip overflow in the audacious DockGroup row at `/primitives/dock-group` (sw=399 at 375 viewport). Fix: `demo/stories/primitives/dock-group.vue` wraps the audacious DockGroup in a `<div class="dock-group-audacious-scroll">` with scoped `overflow-x: auto; scrollbar-width: none` (mirrors StoryPager idiom). DockGroup substrate untouched (its inline-flex sizing is correct for chassis-strip consumers). Post-fix at 375: body.scrollWidth = 375 exactly.

Multi-viewport probe: 9 surfaces × 3 viewports = 27 cells; 26 PASS, 1 pre-documented K-residual (Aurora -inset-6 blur-2xl decorative bloom = sw=383 at 375; K W8 π-2 P3 cosmetic non-blocker; no new W8 ι entry needed). 0 console errors across all surfaces. L W1 root-barrel curation introduced 0 visual regressions.

**W6 — Lighthouse cohort completion**: 4 K-absorbed P1 fixes re-verified clean at HEAD (viz-basis contrast text-zinc-900; aurora chip aria-label; dock dropdown aria-label; Skeleton compositor + fonts async + font-display). P2-1 meta-description CLEARED. robots.txt: Option B (defer to W5 Lane B atomic decision; W5 owns production-demo-build binary). P2-3 + P2-4 formal-retire-as-not-our-scope (Vue upstream; production hosting cache headers). Lighthouse re-run at HEAD: Perf 54 / A11y 100 / BP 100 (96 metaballs) / SEO 91 across 4 routes. A11y +6 net (buttons 94 → 100). 0 L W1 regressions.

**Open question routed to W7 / W8** (W6 surfaced; W6 file bounds disallow src/demo touches): F-ε-3 Configurator recursion error re-reproduced at /motion/metaballs Lighthouse re-run. K W8 had marked this as "false-positive" (stale dev-server cache). L W6 re-reproduction suggests K W8's disposition was PARTIAL. Route: L W7 (which touches Configurator with `cloneMode: 'per-preset'` extension) absorbs OR L W8 ι integrity-sweep documents as M-tranche carry-forward.

**Verification post-W3+W4+W6**:
- `npm run typecheck` clean.
- `npm test` 330/330 PASS (was 357 pre-retires; -27 tests retired with pagination + virtual).
- `npm run profile:budget` PASS: 124.8K raw / 22.4K gz (66.6% headroom; unchanged vs W1 close — retirements are demo + small composables).
- `npm run build` succeeds (~32s).

## Brittleness window

**W1 will declare** `breaking_changes_during_wave: yes` (v1.0 breaks v0.9.x root-barrel imports for vueuse-bearing symbols). `restoration_wave: N/A` — v1.0 IS the restoration; the migration guide is the user-facing path.

**W7 may declare** if aurora Option-A unification reshapes `<AuroraConfigDock>` template API.

## Provisional carry-forward to M

To be enumerated at L close in `docs/tranches/L/audit/L-residuals.md`. Provisional candidates:

- Substrates formally retired with named L-FINAL rationale (no further M revisit).
- Rε §B findings (33 candidates) that exceed L W2 scope.
- `src/styles/` cascade-order documentation gap.
- Speedtest Y.A3 final-disposition (after speedtest re-link at v1.0).
