# L — v1.0 Cohort: SCC Trap Closure + Modularization + Public-surface Discovery

L is the **v1.0 cohort** tranche. K shipped v0.9.3's additive subpath surface (Phase 1) but Phase 1 alone does NOT close the vueuse SCC trap — speedtest's X.W3.c re-probe confirmed PERSISTENT at v0.9.3 (+1.92 KB regression byte-for-byte matching glass-ui's own audit). L delivers **Phase 2** (root-barrel removal of vueuse-bearing symbols; breaking change) in a single curated wave that also lands the public-surface discovery layer (`src/api/`), fixes the K.WS subpath typing-publication gap (vue-tsc resolves `dist/composables/{dark,keyboard}.d.ts` via a broken `'../src/...'` re-export), and converges the modularization audit surfaced by the user's L-open directive.

L is the **modularization tranche**. The user's new directive — "Check for likely needs to be better modularized into sub-modules, and ensure cohesion with our other modules, potentially having an api dir, etc" — drives a thorough sub-module audit across `src/components/`, `src/composables/`, `src/styles/`, `src/utils/`. Rε surfaced 33 findings (6 sub-module-boundary + 8 cohesion + 8 import-shape + B.4 `api/` hypothesis + 10 misc); L W2 absorbs them.

L is the **second-consumer fidelity** tranche. v1.0 freezes the public API surface. Composables and primitives carrying single-consumer or zero-consumer baggage either wire ≥ 2 consumers OR formally retire. The 12 cross-tranche-debt items K declared are dispositioned here: absorbed, wired-or-retired, or formally re-deferred with named external destination.

## Prelude

L opens against K close `35cae2c` (FINAL.md present; tag `v0.9.3` pushed to origin). Precept submodule at `d4ada55` (4 K W0 + 2 K W8 lessons-learned). 6 research deliverables under `docs/tranches/L/research/R{α,β,γ,δ,ε,ζ}-*.md` are load-bearing input. The 2026-05-11 cross-repo state:

- **glass-ui master** `35cae2c` (K W8 close); clean tree.
- **speedtest master** `5dcc2505` (X tranche closed); X.W3.c confirmed PERSISTENT SCC trap at v0.9.3.
- **Speedtest opens Y tranche in parallel** with L — 6 active Y-prefixed worktrees including `y-a3-glass-ui` (speedtest's glass-ui-side research lane).
- **K.WS subpath typing-publication gap** surfaced post-K-close — vue-tsc cannot resolve `dist/composables/{dark,keyboard}.d.ts` via the broken `'../src/...'` re-export. Blocks all subpath consumers; speedtest's 5 candidate consumer files reverted to root-barrel imports.

## Thesis

K closed canonically (14/14 hard gates) but **2 P0 silent misses** surfaced retrospectively: (1) the WS subpath typing-publication gap (no K audit lane ran a synthetic-consumer typecheck); (2) WS Phase 1 ACCEPT-DEGRADED was the wrong disposition call given v0.9.3 ships a public surface that advertises a fix but is non-adoptable at the documented shape. L absorbs both as P0.

L's mission is threefold:

1. **Close the SCC trap canonically** (Phase 2 root-barrel removal + curated public barrel + `api/` discovery layer + dts publication fix). This is the L HEADLINE.
2. **Modularize for cohesion** (sub-module boundaries + import shape + `api/` extraction + composables restructure). This is L's centerpiece per the user's new directive.
3. **Freeze v1.0** (second-consumer fidelity audit; substrate retire-or-wire; migration guide; v1.0 tag).

L is opinionated about breaking changes. v1.0 SHOULD break v0.9.x consumer shapes where the break delivers gestalt closure — root-barrel curation, subpath flatness (`/dark` + `/keyboard` over `/composables/dark` + `/composables/keyboard`), aurora chrome unification under `useConfiguratorState<T>` with clone-mode. The migration guide is binding deliverable.

## Cross-repo coordination — speedtest Y tranche parallel-with-L

Speedtest tranche Y opens at speedtest master `5dcc2505` with 6 research worktrees (`y.a1` retrospective; `y.a2` live-probe; `y.a3` glass-ui; `y.a4` backend; `y.a5` perf; `y.a6` modularization). The `y-a3-glass-ui` worktree is speedtest's glass-ui-side audit lane.

**Coordination protocol** (per Rδ §B.2 + W0 deliverable):

- **L commits a `docs/tranches/L/coordination/speedtest-Y.md` artefact** at W0 close, declaring L's wave timeline + the v1.0 breaking-change boundary, so speedtest Y.A3 can read it without ambiguity.
- **Speedtest Y.A3 is a likely-reader and possibly-recommender, but ideally-NOT-writer of glass-ui surfaces during L flight**. Race-prevention: any speedtest-Y agent proposing a glass-ui change submits the proposal via cross-tranche-debt PR ack, not a direct commit. L orchestrator integrates Y.A3 recommendations at L W0 OR formally re-defers to M.
- **No cross-repo dispatch during L flight** except (a) the L W0 optional v0.9.4 patch that unblocks Y.A3 typing resolution and (b) the L W1 close v1.0 release + speedtest re-link cycle.
- **K W8 LESSONS-LEARNED #1 (worktree relative paths) + #2 (no stash even for state-probe) bind speedtest Y agents** dispatching into glass-ui worktrees. The precept-submodule pin (`d4ada55`) is the canonical reference.

## Binding invariants

1. **C-K precepts still bind** — KISS, no quick fixes, no workarounds, no legacy, no silent deferrals, consumed substrate, evidence > claims, no destructive git, post-close audit BEFORE FINAL, idiomatic gestalt > artefact preservation, per-wave commits, README documentation.

2. **No silent misses** — K W8 ι integrity-sweep canonical pattern continues; L absorbs K's 2 retrospectively-surfaced silent misses (subpath typing-gap; WS Phase 1 mis-disposition) as P0 at W0/W1. ι integrity-sweep lane re-runs at L W8 close.

3. **No tranche-letter shadow execution** — L ships under this plan folder; any L work landing without traceback to a wave spec is a precept violation.

4. **Mandatory reconciliation at stale-baseline open** — N/A for L (opens immediately after K close at v0.9.3; no stale baseline).

5. **HEADLINE invariant** — L HEADLINE = **L.W1: Root-barrel Phase 2 + tight-curated public surface + `api/` discovery layer + dts publication fix**. Per Rε's combined recommendation (4 transpositions in 1 wave). Closes the SCC trap canonically; aligns with v1.0 cohort identity. L W8 verifies HEADLINE landed at HEAD before close.

6. **Worktree isolation REQUIRED for parallel multi-agent shared-file waves** AND **agent prompts MUST use relative paths** when isolation declared (per K W8 LESSONS-LEARNED 2026-05-09 #1). L W2 modularization wave is the canonical test of this clause.

7. **Agents NEVER stage, commit, stash, checkout, reset, restore — INCLUDING for state-probe** (per K W8 LESSONS-LEARNED 2026-05-09 #2). Read-only git only.

8. **Substrate-without-consumer is binary at L close** — every L-shipped substrate has ≥ 2 consumers OR is formally retired with rationale. v1.0 freezes the API surface; substrate carrying single-consumer baggage at L close is a precept violation.

9. **Architectural transposition default** — at least one named gestalt collapse per substantive wave. L W1 alone delivers 4 transpositions (Phase 2 retire; barrel curation; `api/` extraction; subpath flatten + carousel subpath). L W2 delivers the modularization gestalt sweep. L W7 delivers keyframes lift + aurora chrome unification.

10. **Vocab convergence is "gestalt sweep", not "leaf migration"** — K W3 closed src/+demo/ vocabulary residue; L W2 confirms post-modularization vocabulary still canonical.

11. **Doc-drift is binary at close** — CLAUDE.md + README.md + DESIGN.md + CHANGELOG.md + MIGRATION-v1.md align with HEAD at L close. L W5 doc cohort is the canonical sweep; v1.0 ships with a migration guide.

12. **Bundle-budget gate enforced** — `npm run profile:budget` PASSES at L close; BUDGETS table re-baselined post-Phase-2 (the curated barrel may shrink dist/glass-ui.js significantly).

13. **Mobile-viewport fitness binding** — every component renders without clip/overflow at 375×667. L W4 closes K R1 (StoryPager inner-tab overflow) + any new findings.

14. **Demo-private chrome is canonical-aware** — `useStoryDemo` and the 5 storybook chassis primitives remain demo-private; L W2 modularization audit verifies + documents.

15. **Close ceremony is 7-agent strengthened pattern** — α/β/γ/δ/ε/π/**ι** integrity-sweep. Binding for L close.

16. **v1.0 cohort identity** — L is opinionated about breaking changes where they deliver gestalt closure. The migration guide (`docs/MIGRATION-v1.md` OR `MIGRATION.md`) ships as binding deliverable.

17. **Cross-repo coordination with speedtest Y** — L W0 publishes `docs/tranches/L/coordination/speedtest-Y.md`; no cross-repo source commits during L flight except the v0.9.4 patch and v1.0 release cycle.

18. **Subpath publication gates expanded** — L W0 absorbs the typing-publication-gap fix; release-script tooling must include a `node -e 'import("@mkbabb/glass-ui/<subpath>")'` synthetic-consumer typecheck for every published subpath BEFORE tag.

## Sub-tranches

L has no sub-tranches in the formal sense. The HEADLINE (W1) is the largest architectural pass; W2 (modularization sweep) is the second-largest; the rest is substrate convergence + doc cohort + close ceremony.

## Critical files

| Concern | Path |
|---|---|
| Tranche plan | `docs/tranches/L/L.md` (this file) |
| User directives (load-bearing) | `docs/tranches/L/findings.md` |
| Wave specs | `docs/tranches/L/waves/W{0..8}.md` |
| Research deliverables (load-bearing) | `docs/tranches/L/research/R{α,β,γ,δ,ε,ζ}-*.md` |
| Cross-repo coordination | `docs/tranches/L/coordination/speedtest-Y.md` (created at W0 close) |
| Audit reports per wave | `docs/tranches/L/audit/W{N}-*.md` (created per wave) |
| Precept update target (W0) | `docs/precepts/instructions/{ORCHESTRATION.md, tranche/AGENT_DISPATCH_TEMPLATE.md, LESSONS-LEARNED.md, tranche/SPEC.md}` |
| WS Phase 2 target (W1) | `src/index.ts` (root barrel curation) + `src/api/` (NEW) + dist/ publication pipeline |
| Modularization target (W2) | `src/composables/` restructure + sibling re-org + `src/api/` consolidation |
| Migration guide (v1.0) | `MIGRATION.md` OR `docs/MIGRATION-v1.md` |
| Dispatch template | `docs/tranches/L/dispatch/AGENT.md` |

## Wave Schedule

| Wave | Title | Agents | Mode | Hard Gate | Status |
|---|---|---:|---|---|---|
| W0 | Recon + dispatch precept update + WS subpath typing-gap P0 (v0.9.4 patch) + coordination/speedtest-Y.md | 3 | parallel: Lane I W0-reconciliation + Lane II precept-submodule update + Lane III subpath typing-gap fix + v0.9.4 release | reconciliation ledger absorbs K residuals; 5+ new LESSONS-LEARNED entries; precept SPEC + ORCHESTRATION amended; subpath dts re-emission verified via `node -e 'import("@mkbabb/glass-ui/<subpath>")' + tsc-consumer-probe`; v0.9.4 tag pushed; `coordination/speedtest-Y.md` artefact committed | open |
| W1 (HEADLINE) | Root-barrel Phase 2 + tight-curated public surface + `src/api/` discovery layer + subpath flatten | 3 | parallel: Lane A barrel curation + Lane B `src/api/` authoring + Lane C subpath flatten (`/dark` + `/keyboard` + new `/carousel`) | speedtest's `dist/index.html` modulepreload-free WITH vueuse manualChunk applied; speedtest entry-chunk gz net drop ≥ 15 KB; 0 substantive PNG diff in speedtest 9-cell visual-regression matrix; `src/api/index.ts` exports the canonical types + constants; subpath flatness verified (`@mkbabb/glass-ui/dark` resolves; `@mkbabb/glass-ui/composables/dark` retired with rationale OR retained as alias gated by KISS); v1.0 tagged + pushed; speedtest re-link commit lands | pending W0 |
| W2 | Modularization sweep — composables/ restructure + cohesion + import shape | 2 | parallel: Lane A `src/composables/` restructure + Lane B sibling-module cohesion + import-shape verification | Rε §B.1+B.2+B.3 findings absorbed (33 items); composables/ restructured into coherent sub-trees (motion/reactive/dark/keyboard/platform per Rε proposal); root barrel cherry-pick rationale documented or absorbed into `src/api/` import-graph; barrel surface tree-shake-friendly | pending W1 |
| W3 | Second-consumer fidelity audit — composables + primitives | 2 | parallel: Lane A composables wire-or-retire + Lane B primitives wire-or-retire | 3 unused public composables (useRAFLoop / useIntersectionPause / useDarkModeSync) dispositioned; 3 pagination/virtual composables (useOffsetPagination / useVirtualSection* / useWindowedStore) dispositioned; P-tranche second-consumer (DiscoGlyph / DockGroup / InstrumentChassis) dispositioned; DockShowcaseFrame second-consumer dispositioned. Each substrate either ≥ 2 consumers at HEAD OR formally retired with rationale | pending W1 (parallel with W4) |
| W4 | Mobile-viewport finishing + π residuals from K | 1 | sequential viewport-fitness sweep | StoryPager inner-tab overflow fixed at 375 (K R1); any new π regressions surfaced by W1+W2 re-checked at 3 viewports | pending W1 (parallel with W3) |
| W5 | Doc cohort + production-demo-build decision + migration guide | 2 | parallel: Lane A doc walk (CLAUDE/README/DESIGN/CHANGELOG) + Lane B production-demo-build decision + MIGRATION.md | CLAUDE/README/DESIGN aligned with v1.0 HEAD; MIGRATION.md ships canonical v0.9.x → v1.0 path; K R2 (subpath enumeration) + K R3 (wave-spec status lines) absorbed; production-demo-build decision binary (deploy target OR formally retire demo as deploy concern) | pending W2 + W3 |
| W6 | Lighthouse cohort completion (P2 carry-forwards) | 1 | sequential | viz-basis contrast verified; robots.txt decision binary; Vue runtime upstream item formally retired-as-not-our-scope; cache-ttl item retired-as-not-our-scope | pending W1 (parallel with W3+W4) |
| W7 | Substrate cohesion — keyframes lift + aurora chrome Option-A unification | 2 | parallel: Lane A keyframes lift (Pulse + Typewriter → animations.css) + Lane B aurora `useAuroraStudio` → `useConfiguratorState<T>` with cloneMode='per-preset' | Pulse + Typewriter keyframes consolidated to animations.css; aurora chrome consumes `useConfiguratorState<T>` (Option A); `<AuroraConfigDock>` refactored to consume `<ConfiguratorLayer>` per axis; `useAuroraStudio` either absorbed or thinly wraps `useConfiguratorState` | pending W3 + W4 + W5 + W6 |
| W8 | Close ceremony + 7-agent strengthened post-close audit (ι integrity-sweep canonical) | 1 (orchestrator) + 7 audit lanes | implementation: `audit/L-pre-close.md` + 7 audit deliverables + FINAL.md | strengthened pattern (α/β/γ/δ/ε/π/**ι** integrity-sweep) returns; HEADLINE verified at HEAD; v1.0 tag pushed; MIGRATION.md verified; FINAL.md authored after findings absorbed | pending W7 |

Total active wave count: 9 (W0 + W1 + W2 + W3 + W4 + W5 + W6 + W7 + W8). **Wave concurrency**:

- W0 (3 parallel lanes; 1 batch).
- W0 → W1 (3 parallel lanes; HEADLINE; 1 batch).
- W1 → W2 + W3 + W4 + W6 in parallel (W2 is 2 lanes; W3 is 2 lanes; W4 is 1 lane; W6 is 1 lane = 6 agents max in parallel).
- W2 + W3 → W5 (2 lanes; doc + migration cohort).
- W2 + W3 + W4 + W5 + W6 → W7 (2 lanes).
- W7 → W8 close.

Peak parallelism: 6 agents (W1 → batch). Within the K-precept ceiling.

## Hard gates

A wave closes only when:

1. typecheck + build + test green
2. wave proof doc records every accepted finding's resolution + cites evidence
3. orchestrator commits the wave's diff under `feat(tranche-l/wN): summary` (or `chore(...)` / `fix(...)` / `docs(...)`)
4. PROGRESS.md status table reflects the close
5. (when applicable) Playwright probe at ≥ 3 viewports confirms no regression
6. (when applicable) per-story consumption sweep confirms canonical-vocabulary adoption
7. ι-precondition: every "named but not landed" item from prior waves either lands or migrates to formal-residual with named destination
8. (NEW for L) for any wave touching `src/index.ts` or `package.json` exports: synthetic-consumer typecheck probe (`node -e 'import("...")' + tsc --traceResolution`) PASSES for every published subpath.

Tranche L closes only when:

1. every wave closed per above
2. **WS Phase 2 SCC trap closed**: speedtest dist/index.html modulepreload-free with vueuse manualChunk applied; net entry-chunk gz drop ≥ 15 KB
3. **`src/api/` discovery layer ships** with canonical types + constants
4. **Subpath publication coherent**: `@mkbabb/glass-ui/dark` + `/keyboard` + `/carousel` + `/forms` + `/api` all typecheck-resolve from a synthetic consumer
5. **v1.0 tag pushed to origin**
6. **`MIGRATION.md` ships** canonical v0.9.x → v1.0 migration guide
7. **CLAUDE.md / README.md / DESIGN.md zero drift vs v1.0 HEAD**
8. **Substrate-without-consumer binary**: every v1.0 substrate ≥ 2 consumers OR formally retired with rationale
9. **Bundle-budget gate PASSES** at v1.0 baseline (BUDGETS table re-baselined post-curation)
10. **`scripts/release.sh` updated** to include subpath typecheck probe per K invariant 18
11. **7-agent post-close audit returns clean** before FINAL.md is final
12. **Lighthouse re-run at close** confirms K P0 + P1s persist resolved
13. **Speedtest cross-repo coordination closed**: speedtest Y.A3 disposition annotated LANDED at L W1 close + speedtest re-link commit at v1.0
14. **K residuals R1-R4 dispositioned** (absorbed in waves OR re-deferred with named L destination)

## Cross-tranche debt + explicit deferrals

L's cross-tranche-debt list (post-W3 wire-or-retire) will be enumerated in `docs/tranches/L/audit/L-residuals.md` at close. Provisional carry-forward candidates if W3 disposition is RETIRE:

- Substrates formally retired with named L-FINAL rationale (no L-bound residual; M does NOT revisit).
- Speedtest-side migration of moved subpaths (Y.A3 disposition).

Provisional carry-forward candidates if W2 modularization sweep exceeds scope:

- Some Rε §B findings (33 candidates) may defer to M with named L-FINAL destination + rationale.
- `src/styles/` cascade-order documentation gap may absorb in W5 doc lane OR defer to M.

## Brittleness window

**W1 declares `breaking_changes_during_wave: yes`** with `suspended_gates: backward-compat-root-barrel-imports` and `restoration_wave: N/A (v1.0 is the restoration; v0.9.x consumer-shape break is intentional)`. The MIGRATION.md guide is the user-facing restoration.

**W7 declares `breaking_changes_during_wave: maybe`** if aurora chrome Option-A unification reshapes `<AuroraConfigDock>`'s template API. If yes, MIGRATION.md absorbs.

## Out of scope (explicit)

- New design-language axes — L converges + freezes, doesn't extend.
- New public components — L freezes the API; no new primitives in L scope.
- Consumer-repo edits — L does not touch speedtest beyond reading `y-a3-glass-ui` research + the speedtest re-link cycle at W1 close.
- Tranche-letter M planning — L closes, then a future session opens M if needed.
- Vue runtime upstream `uses-passive-event-listeners` — not glass-ui scope; formal retire at L W6.
- Production hosting cache-ttl — formal retire at L W6 (consumer-deploy concern).
- The 6 speedtest Y-tranche worktrees beyond `y-a3-glass-ui` (y.a1, y.a2, y.a4, y.a5, y.a6) — out of L's scope; speedtest owns.
