# K — Convergence Closeout + Reconciliation + Audacious Extraction

K is the **convergence-closeout** tranche. The plan was authored at `0666be6` against J close `5bcf1ce`. Sixty-seven commits later (peaking with v0.8.4 / v0.8.5 / v0.8.6 / v0.9.0), an entire **unwritten V-tranche** landed ad-hoc — V.W2 foundation polish + V.W3 structural unions + V.W4 storybook + composables expansion. The 2026-05-08 reconciliation finds 5/38 K hard-gate items absorbed by V, 2 obsoleted, 4 partial, 27 still open. K continues against `23ce73c` with revised waves: the absorbed work is marked done, the obsolete gates struck, the unattributed V-tranche is given a post-hoc plan-folder write-up, the K HEADLINE (audacious primary-CTA) remains the architectural transposition, and a Lighthouse cohort folds in the 2026-05-08 perf + a11y findings.

## Prelude

K opens against J close `5bcf1ce`; reconciles against HEAD `23ce73c` (v0.9.0). 6 K-research deliverables under `docs/tranches/K/research/R{α,β,γ,δ,ε,ζ}-*.md` are load-bearing input. The 2026-05-08 reconciliation deliverables are:

- `audit/K-reconciliation-2026-05-08.md` — plan-vs-actual against the 67 post-open commits.
- `audit/K-lighthouse-2026-05-08.md` — perf + a11y findings (1 P0 + 5 P1 + 4 P2).
- `audit/lighthouse-2026-05-08/` — 6 raw Lighthouse reports (HTML + JSON) per route.

## Thesis

J's W7 strengthened audit returned "12/12 invariants satisfied" but Rα's harsher retrospective found 2 SILENT-MISSES the close ceremony failed to flag (`hoverOpenDelay` prop named in J.md but never landed; CartoonCard adoption sweep flagged in W5.D survey but absent from FINAL named-destinations) and 7 EXECUTED-WITH-WORKAROUND items. K hardens the audit pattern further (adds an **ι integrity-sweep** lane that walks named prescriptions against shipped artefacts), absorbs all chronic + named residuals, and ships its own headline architectural transposition: the audacious primary-CTA extraction (J explicitly K-deferred).

The 2026-05-08 reconciliation surfaces a **second silent-execution anti-pattern** beyond J's plan-vs-actual misses — V landed 67 commits worth of substrate, structural unions, chassis primitives, and composable promotions through commit messages and release notes only, with no `docs/tranches/V/` folder structure. The K-bound dispatch precept update (W0) is reframed: it now redresses two failure modes — J's parallel-agent file races + git-stash violations + index pollution + shell-pwd drift, AND V's tranche-letter shadow execution (work shipped without a plan folder).

**Dispatch friction redressed**: J's incidents catalogued in Rδ. K W0 codifies hybrid worktree-isolation, hardened agent git clause (agents NEVER stage/commit/stash/checkout/reset/restore), `git -C <dir>` over `cd && git`, the planning-branch == integration-target gate, AND the no-shadow-execution clause (every cohort of work ≥ 1 release ships under a plan-folder structure).

## Binding invariants

1. **C-J precepts still bind** — KISS, no quick fixes, no workarounds, no legacy, no silent deferrals, consumed substrate, evidence > claims, no destructive git, post-close audit BEFORE FINAL, idiomatic gestalt > artefact preservation, per-wave commits, README documentation.

2. **No silent misses** — close ceremony adds an **ι integrity-sweep** lane that walks the tranche plan + invariants + named primitives against shipped artefacts. Fires P0 on any "named but not landed" item.

3. **No tranche-letter shadow execution** — work cohorts that span ≥ 1 release ship under a `docs/tranches/<LETTER>/` plan folder (plan + waves + FINAL). The V-tranche commit-message-only existence is a precept violation, redressed by the `WV` post-hoc write-up.

4. **Mandatory reconciliation at stale-baseline open** — when a tranche opens against a baseline ≥ 1 release stale, the reconciliation lane (analog of K W0 Lane I) is mandatory, not one of two parallel lanes. The ad-hoc 2026-05-08 reconciliation is K's retrospective version of this gate.

5. **HEADLINE invariant** — every tranche's named architectural transposition closes at HEAD before the tranche closes. K's audacious primary-CTA was not just a wave — it was the tranche identity. Tranches that miss their headline are mis-scoped and re-promote the headline at their successor's open.

6. **Worktree isolation is BINDING for parallel multi-agent shared-file waves** — `Agent isolation: "worktree"` per the dispatch tool. Required when ≥ 2 parallel agents may write `src/styles/*` or any shared territory; recommended for ≥ 3 parallel agents; never for single-agent or read-only audit waves. Dispatch template names the policy.

7. **Agents NEVER stage, commit, stash, checkout, reset, or restore** — only orchestrator owns the index. Read-only git only inside agent prompts (`git status` / `git log` / `git diff` / `git ls-tree` permitted; mutating subcommands forbidden). The 2 J `git stash` violations recurred under the prior precept's "as recovery mechanism" loophole; K closes the loophole.

8. **Substrate-without-consumer is binary at K close** — every K-shipped substrate has ≥ 2 consumers OR is formally retired with rationale. Most of J's preemptive cohort (`--{success,warning,info}-foreground`, `<Tooltip>` rounded-tooltip, paper.css hsl literals, `.overlay-scrim` shadow-by-`<ModalOverlay>`) was absorbed by V; the remaining `cssVar()` retire-or-wire decision lands in W3.

9. **Architectural transposition default** — at least one named gestalt collapse per substantive wave. K headline: **audacious primary-CTA extraction** (the disco-grain + sparkle-sweep + specular-highlight composite at `dock.css` lifts to a canonical `Button variant="primary-audacious"` with story). W7 secondary: cross-substrate Slider-in-Dock contract demonstration with a P0 Configurator-recursion fix bundled in.

10. **Vocab convergence is "gestalt sweep", not "leaf migration"** — K W3 walks every J-shipped token/utility through `demo/` + `src/` to confirm canonical consumption. 19 surface-tint bypasses + 5 focus-visible bypasses + 4 transition-all survivors (`stagger.vue:59` + 3 V-introduced composable stories + `CarouselDots.vue:62`) all migrate.

11. **Doc-drift is binary at close** — CLAUDE.md + README.md + DESIGN.md align with HEAD at K close. Drift is **larger** at HEAD than at K open: 11 V-tranche primitives + 23 promoted composables + 5 chassis demo primitives need acknowledgement. No "doc-only follow-up" residuals into L.

12. **Bundle-budget gate restored** as binding I invariant — `npm run profile:budget` script + GitHub workflow job + BUDGETS table re-land in W4. Would PASS at HEAD with ~30% headroom per ε measurement.

13. **Mobile-viewport fitness binding** — every component renders without clip/overflow at 375×667. Verified by π lane at close. The original Rε B3 CarouselPager `ComputedRef` orientation bug premise was wrong (verified by 2026-05-08 reconciliation: orientation is destructured as a plain string in `useCarousel.ts:6-11`); only story-pager dock + GlassCarouselPager mobile-wrap remain.

14. **Demo-private chrome is canonical-aware** — when canonical primitives ship (e.g., `<ShowcaseFrame>`, `<DockShowcaseFrame>`, `<StorySection>`, `<TokenLadder>`), demo stories migrate. No raw-recipe survival in `demo/stories/` that bypasses canonical primitives.

15. **Close ceremony is 7-agent strengthened pattern** — α plan-vs-actual / β substrate + visual-load-bearing-ness / γ doc-drift / δ idiomatic gestalt + per-story consumption / ε performance / π visual-runtime multi-viewport / **ι integrity-sweep** (NEW). Binding for K close + future tranches.

16. **Lighthouse perf + a11y findings absorbed** — the 2026-05-08 audit's 1 P0 (Configurator reactive recursion on `/motion/metaballs`) absorbs into W7; the 5 P1s (color-contrast viz-basis demo; 2 label-content-name-mismatch on aurora preset chips + dock dropdown; non-composited skeleton-shimmer keyframe; render-blocking Google Fonts CSS; missing `font-display: swap` on Computer Modern) absorb into the new `WP` cohort. P2-1 (`meta-description`) absorbs into W4 doc cohort. P2-2/P2-3/P2-4 defer to L (consumer-deploy / upstream Vue / prod-hosting).

## Sub-tranches

K has no sub-tranches in the formal sense. The audacious primary-CTA extraction (W6) is the largest architectural pass; W7 silent-miss closeout + Configurator-recursion P0 is the second; the rest is convergence sweep + reconciliation closeout.

## Cross-repo coordination — speedtest W tranche inbound

The speedtest tranche W (`/Users/mkbabb/Programming/speedtest/docs/tranches/W/W.md`) opens against speedtest's master at `8e3d70b` (post-V close, glass-ui peer at v0.9.0). The speedtest plan dispatches glass-ui-side work in two waves:

**Speedtest W.W2 — glass-ui v0.9.1 release** (1 day, 1 agent in glass-ui worktree):

| Speedtest task | Glass-ui artefact | K disposition |
|---|---|---|
| W2.T1 | `src/components/custom/scrolling-text/ScrollingText.vue` (NEW) + subpath entry | **INBOUND** — speedtest dispatches |
| W2.T2 | `demo/stories/data/scrolling-text.vue` (NEW) + manifest | **INBOUND** |
| W2.T3 | ScrollingText unit test | **INBOUND** |
| W2.T4 | `demo/stories/primitives/section.vue` (NEW) + manifest | **INBOUND** (Section primitive exists at HEAD per V.W3 `d2247c8`; only story missing) |
| W2.T5 | `scripts/freshness-gate.mjs` (NEW) + `package.json` `prebuild` | **INBOUND** |
| W2.T6 | `package.json` `prepare: "npm run build"` | **INBOUND** |
| W2.T7 | `src/utils/assertDistFresh.ts` (NEW) + barrel export | **INBOUND** |
| W2.T10 | ~226-site StorySection-migration sweep across `demo/stories/` (39 adopted at HEAD; 13 raw `rounded-card border bg-card shadow-cartoon` triplets remain) | **INBOUND** — absorbs the 7-of-8 raw triplet sites K W1.A.2 originally targeted (now obsolete via ShowcaseFrame per W1 REVISION) |
| W2.T11 | Tag `v0.9.1` | **INBOUND** |

**Speedtest W.W3.perf.B.T5 — glass-ui v0.9.2 release** (within speedtest perf.B sub-wave, glass-ui worktree):

| Speedtest task | Glass-ui artefact | K disposition |
|---|---|---|
| W3.perf.B.T5 | `src/utils/cn.ts` — replace `tailwind-merge` with `clsx` + hand-rolled deduplicator for the ~30 conflict pairs glass-ui consumes; bump to v0.9.2 | **INBOUND** — speedtest dispatches; expected savings ~10-18 KB gz on speedtest's eager bundle. **HARD GATE: 0 PNG-diff visual regression.** |

**K does NOT dispatch duplicate work for any inbound item.** The speedtest agent is the executor; K acknowledges + sequences:

1. **K W3 (vocab.γ second-pass)** — must NOT include the 13 raw triplet sweep in its `demo/` lane (Lane B). Those 13 sites are absorbed by speedtest W2.T10. K W3 Lane B's bounds reduce to: 5 demo `focus-visible:shadow-[var(--focus-ring-shadow)]` + 3 demo `--surface-tint` bypasses + 3 V-introduced demo `transition-all` survivors + carousel-dots story canonicalization. Add a coordination check to W3 hard gate: speedtest W2.T10 sweep complete (sweep returns ≤ 0 raw triplet survivors at K close) before K W3 closes.

2. **K W4 (bundle-budget gate restoration)** — must land BEFORE speedtest W3.perf.B.T5 (v0.9.2 cn refactor). Otherwise the BUDGETS table baselines against post-tailwind-merge dist, which is meaningless against the pre-W3 historical state. Sequence: K W4 lands; speedtest W2 ships v0.9.1 (no bundle delta of substance — ScrollingText is small); K W4 BUDGETS table absorbs the v0.9.1 baseline; speedtest W3.perf.B.T5 ships v0.9.2; K W4 budgets table is updated AT W8 close to absorb the v0.9.2 delta (or W8 documents the brittleness window for the budget gate during the v0.9.2 ship).

3. **K W7 (Configurator-recursion P0)** — independent of speedtest W; can dispatch in parallel.

4. **WV (V-tranche post-hoc write-up)** — scopes to v0.9.0 (V close). v0.9.1 + v0.9.2 are inbound from speedtest W; they are NOT V-attributed work. WV's `docs/tranches/V/FINAL.md` ends at `23ce73c`. Subsequent v0.9.x patches attribute to speedtest W's WV.W2 / W3 lanes (cross-repo) — document this in WV's FINAL.md as the cross-tranche-debt context.

5. **WP (Lighthouse perf + a11y)** — independent of speedtest W; can dispatch in parallel.

6. **K W6 (audacious primary-CTA, K HEADLINE)** — independent of speedtest W; can dispatch in parallel.

7. **K WS (vueuse SCC trap fix — v0.9.3)** — absorbed from speedtest W's W3.b.1 DEFERRED disposition (post-W close at speedtest tag `w-close`). The wave inventories glass-ui's vueuse-importing surface, splits the root barrel into a vueuse-FREE zone + additive subpath exports for vueuse-bearing components (Input/Textarea/Combobox*) + composables (useGlobalDark, useKeyboardShortcuts), bumps to v0.9.3, and verifies speedtest's `dist/index.html` stays modulepreload-free WITH a vueuse manualChunk applied. **Phase 1 only — additive subpaths**; root-barrel removals (breaking change) defer to L tranche / v1.0. See `docs/tranches/K/waves/W-S.md`.

**K close (W8) prerequisites updated**: K cannot close until speedtest W has landed v0.9.1 + v0.9.2 OR K W8 documents the inbound-from-speedtest dependency as a cross-tranche-debt deferral with named destination. Per K invariant 8 (substrate-without-consumer binary at K close): if v0.9.1's ScrollingText lift hasn't landed at K close, the V-attributed `<ScrollingText>`-in-speedtest is still single-consumer — but that's speedtest's responsibility to land the lift, not K's. **K WS is a NEW outbound dispatch from K** (not inbound from speedtest); v0.9.3 ships from K and the speedtest re-link commit closes the loop.

**Cross-repo precept**: K W0's hardened agent git clause + worktree-isolation policy applies to speedtest's glass-ui-worktree dispatches. The speedtest agent treats glass-ui as an isolated worktree per `Agent isolation: "worktree"`; commits land via speedtest's orchestrator-side integration (per K invariant 7: agents NEVER stage/commit; orchestrator owns the index). The dispatch precept update at K W0 binds speedtest's behavior here.

## Critical files

| Concern | Path |
|---|---|
| Tranche plan | `docs/tranches/K/K.md` (this file) |
| User directives (load-bearing) | `docs/tranches/K/findings.md` |
| Wave specs | `docs/tranches/K/waves/W{0..8}.md` + `waves/W-V.md` + `waves/W-P.md` |
| Research deliverables (load-bearing) | `docs/tranches/K/research/R{α,β,γ,δ,ε,ζ}-*.md` |
| 2026-05-08 reconciliation | `docs/tranches/K/audit/K-reconciliation-2026-05-08.md` |
| 2026-05-08 Lighthouse audit | `docs/tranches/K/audit/K-lighthouse-2026-05-08.md` (+ 6 raw reports) |
| Audit reports per wave | `docs/tranches/K/audit/W{N}-*.md` (created per wave) |
| Precept update target (W0) | `docs/precepts/instructions/{ORCHESTRATION.md, tranche/AGENT_DISPATCH_TEMPLATE.md, LESSONS-LEARNED.md}` |
| V post-hoc plan target (WV) | `docs/tranches/V/{V.md, waves/V.W{2,3,4}.md, FINAL.md}` |
| Dispatch template | `docs/tranches/K/dispatch/AGENT.md` |
| Bundle-budget restoration target (W4) | `package.json`, `scripts/profile-bundle.mjs`, `.github/workflows/lint.yml` |

## Wave Schedule

| Wave | Title | Agents | Mode | Hard Gate | Status |
|---|---|---:|---|---|---|
| W0 | Reconciliation + dispatch precept hardening | 2 | parallel: HEAD reconciliation (Lane I — pre-completed by `audit/K-reconciliation-2026-05-08.md`) + precept-submodule update (Lane II) | reconciliation ledger present at `audit/K-reconciliation-2026-05-08.md`; ORCHESTRATION.md adds worktree-isolation clause; AGENT_DISPATCH_TEMPLATE.md adds hardened-agent-git clause + no-shadow-execution clause; 4 new LESSONS-LEARNED entries (3 J-derived + 1 V-derived); orchestrator commits W0 close | open |
| W1 | Silent-miss closeout (`hoverOpenDelay` decision only) | 1 | sequential decision wave | `<HoverPopover hoverOpenDelay>` lands with ≥ 1 consumer story exercising a non-default delay OR retroactively reconciled to existing `openDelay` prop with rename + J FINAL amendment | pending W0 |
| ~~W2~~ | ~~Substrate retire-or-wire~~ | — | RETIRED at 2026-05-08 reconciliation | 4/5 gates absorbed by V (`221d783`, `5dfe6fb`, `43bee82`, paper.css cleanup, tooltip rounded-tooltip); residuals (`.overlay-scrim` @utility formal-delete, `cssVar()` retire-or-wire) absorb into W3 + W8 | retired |
| W3 | Vocab.γ second-pass migration + W2 residuals | 2 | parallel: src/ vocabulary residue + W2 residuals (Lane A) + demo/ vocabulary residue (Lane B) | 19 raw `color-mix(--foreground)` sites → `--surface-tint-N`; 5 demo `focus-visible:shadow-[var(--focus-ring-shadow)]` → `.focus-ring`; 4 `transition-all` survivors decomposed (`stagger.vue:59` + 3 composable stories + `CarouselDots.vue:62`); carousel-dots story canonicalized; `.overlay-scrim` @utility formally deleted from `utilities.css`; `cssVar()` retire-or-wire decision recorded with rationale (`useTokenColor` may supersede); rg confirms 0 raw repeats post-wave | pending W1 |
| W4 | Doc + tooling cohort restoration | 2 | parallel: doc refresh (Lane A) + bundle-budget + tooling re-land (Lane B) | CLAUDE.md / README.md / DESIGN.md align with HEAD INCLUDING 11 V-tranche primitives + 23 v0.9.0 composables + 5 chassis demo primitives; `npm run profile:budget` script restored + BUDGETS table + GitHub workflow job (`.github/workflows/` directory created); stress harness retire-or-restore decision binary; `ay-close` retire if regressed; `meta-description` added to `index.html` (Lighthouse P2-1) | pending W0 |
| W5 | Mobile-viewport fitness | 1 | sequential viewport-fitness sweep | story-pager dock 4px overflow at 375 fixed; `<GlassCarouselPager>` chevrons reachable on mobile (wrap-or-stack); ~~`<CarouselPager>` orientation bug fixed~~ (premise wrong per 2026-05-08 reconciliation; struck); Playwright probes confirm at 375×667, 1024×768, 1440×900 | pending W1 |
| W6 | Audacious primary-CTA gestalt extraction (K HEADLINE) | 2 | parallel: variant authoring (Lane A) + consumer migration (Lane B) | `Button variant="primary-audacious"` ships with story; disco-grain + sparkle-sweep + specular-highlight recipe lifted from `dock.css`; phase-color decoupling decision documented; 1 dock + ≥ 1 demo story consumer | pending W0 |
| W7 | Drag-keep-open story-fidelity + Configurator-recursion P0 + NumberField consumer | 1 | sequential contract WIRE + P0 absorb | demo story demonstrates `<Slider>` inside `<GlassDock>` with visible thumb-halo + dock substrate response; `useConfiguratorState.ts:85-87` `activeKey` made reactive (`ref` not plain `let`); metaballs `colorDraft ↔ cfg.colors` watch-write loop broken; `<NumberField keep-dock-open>` consumer added OR contract documented Slider-only | pending W1 |
| WV | V-tranche post-hoc plan-folder write-up | 1 | sequential historical write-up | `docs/tranches/V/V.md` authored against `0666be6..23ce73c` commit cohort; `waves/V.W{2,3,4}.md` per release; `FINAL.md` with absorbed-by-V ledger + V's own architectural transpositions catalogued (Section, ModalOverlay, LabeledField, menuItemVariants, density-rail, popover-animation grammar, story-chassis primitives, useStoryDemo, 23 composables); precept invariant 3 satisfied retroactively | pending W0 |
| WP | Lighthouse perf + a11y cohort | 1 | sequential demo-side fixes | viz-basis button contrast fix (`demo/stories/primitives/buttons.vue`); aria-label/visible-text reconciliation on aurora preset chips + dock dropdown trigger; `Skeleton.vue` shimmer keyframe migrated to transform-only (compositor-friendly); Google Fonts stylesheet async-loaded in `index.html`; `font-display: swap` on Computer Modern in `demo/demo.css` | pending W1 |
| WS | Speedtest-W feedback: vueuse SCC trap fix (v0.9.3 candidate) | 1 | sequential — surface inventory → barrel split (additive subpath) → consumer re-validation → v0.9.3 release | speedtest `dist/index.html` modulepreload-free WITH vueuse manualChunk applied; speedtest entry-chunk gz net drop ≥ 15 KB; 0 substantive PNG diff in speedtest 9-cell visual-regression; v0.9.3 tagged + pushed; speedtest re-link commit lands; speedtest disposition document (`W3/b1/disposition.md`) annotated LANDED | pending W1 (parallelisable with W6 — file bounds disjoint) |
| W8 | Close ceremony + 7-agent strengthened post-close audit | 1 (orchestrator) + 7 audit lanes | implementation: `audit/K-pre-close.md` + 7 audit deliverables + FINAL.md | strengthened pattern (α/β/γ/δ/ε/π/**ι** integrity-sweep) returns; named-but-not-landed sweep clean; Lighthouse re-run confirms P0 absorbed and P1s addressed; FINAL.md authored after findings absorbed | pending W3 + W4 + W5 + W6 + W7 + WV + WP + WS |

Total active wave count: 12 (W0 + W1 + W3 + W4 + W5 + W6 + W7 + WV + WP + WS + W8); W2 retired with absorbed-by-V citation. **Wave concurrency**:
- W0 → W1, W4, W6, WV in parallel (file bounds disjoint; W0 closes first to bind precept)
- W1 → W3, W5, W7, WP in parallel
- W3 → W8 close
- W4 → W8 close
- W5 → W8 close
- W6 → W8 close (largest scope; longest critical path)
- W7 → W8 close
- WV → W8 close (docs-only; can land last)
- WP → W8 close (demo-only; small scope)

## Hard gates

A wave closes only when:

1. typecheck + build + test green
2. wave proof doc records every accepted finding's resolution + cites evidence
3. orchestrator commits the wave's diff under `feat(tranche-k/wN): summary` (or `chore(...)` / `fix(...)` / `docs(...)`)
4. PROGRESS.md status table reflects the close
5. (when applicable) Playwright probe at ≥ 3 viewports confirms no regression
6. (when applicable) per-story consumption sweep confirms canonical-vocabulary adoption
7. **(NEW for K)** ι-precondition: every "named but not landed" item from prior waves either lands or migrates to formal-residual with named destination

Tranche K closes only when:

1. every wave closed per above
2. zero raw `color-mix(--foreground) [N]%` bypasses remain in `src/` + `demo/` (verified)
3. zero raw `focus-visible:shadow-[var(--focus-ring-shadow)]` bypasses remain in `demo/`
4. zero raw `transition-all` survivors (single-component exceptions documented)
5. `npm run profile:budget` PASS with bundle-budget gate enforced (CI workflow active)
6. `<HoverPopover hoverOpenDelay>` lands with consumer OR rename-reconciled with J FINAL amendment
7. `<Configurator>` reactive-recursion P0 fix landed (`useConfiguratorState.ts` `activeKey` reactive; metaballs watch-write loop broken)
8. `Button variant="primary-audacious"` lands with story + ≥ 1 dock consumer
9. CLAUDE.md / README.md / DESIGN.md zero drift vs HEAD (γ lane verifies)
10. **7-agent post-close audit (strengthened pattern with ι) returns clean** before FINAL.md is final
11. binding precept updates landed in `docs/precepts/`
12. `docs/tranches/V/` post-hoc write-up complete (V.md + V.W{2,3,4}.md + FINAL.md)
13. Lighthouse re-run at close ceremony confirms P0 absorbed and 5 P1s addressed
14. cssVar() retire-or-wire decision recorded; `.overlay-scrim` @utility formally deleted from `utilities.css`

## Cross-tranche debt + explicit deferrals

- **Speedtest W cross-repo dispatches into glass-ui** — v0.9.1 (ScrollingText lift, Section storybook entry, dist-freshness gates, ~226-site StorySection sweep) + v0.9.2 (cn() tailwind-merge replacement) inbound from speedtest W tranche. K does not duplicate; sequencing per "Cross-repo coordination — speedtest W tranche inbound" section above.
- **`<plugin>` extraction** — formally retired in I as permanent consumer-territory deferral; K does not revisit.
- **3 unused public composables** (Rε B5: `useRAFLoop`, `useIntersectionPause`, `useDarkModeSync`) — flagged for L cross-repo audit; K does not absorb (would require speedtest co-coordination). v0.9.0 promotion of 23 composables + new storybook entries does not change this attribution; second-consumer fidelity audit is L territory.
- **`useOffsetPagination` / `useVirtualSection*` / `useWindowedStore`** (Rε B6) — same pattern; L cross-repo audit.
- **P-tranche second-consumer fidelity** (Rε B9: `<DiscoGlyph>` / `<DockGroup>` / `<InstrumentChassis>` each 1-consumer at HEAD) — flagged for L; would require speedtest consumer wiring.
- **Pulse + Typewriter keyframes lift to `animations.css`** (Rε B1) — cohesion gain; defer.
- **Aurora chrome `useAuroraStudio` parallel implementation** — `<ConfiguratorLayer>` / `<ConfiguratorRow>` / `useConfiguratorState` reached ≥ 2 consumers via the V-tranche primitive story (`fb38034`); aurora retains parallel chrome with per-preset clone semantics. Deferred to L if Option-A unification is ever desired.
- **Production demo build** — Lighthouse audit surfaced `npm run build` is library-mode; no `vite.demo.config.ts` for static demo build. Defer to L (decide: ship static demo deploy target OR formally retire demo as a deploy target).
- **`robots.txt` for public deploy** — Lighthouse P2-2; defer to L (publicly-deployed-demo prerequisite).
- **Vue runtime upstream `uses-passive-event-listeners`** — Lighthouse P2-3; not glass-ui scope.
- **Aurora-chrome `<DockShowcaseFrame>` second-consumer audit** — V-tranche `60fd745` shipped DockShowcaseFrame with 13 dock sites; second-consumer fidelity audit deferred to L.

## Brittleness window

**None planned at K open.** K opens against a green tree; every wave closes green.

If W6 audacious primary-CTA extraction breaks the design-fidelity gate momentarily (likely — phase-color decoupling is a substantive substrate change), declare a `breaking_changes_during_wave: yes` window in W6 with restoration in W8 close ceremony per `tranche/SPEC.md` Brittleness Window protocol.

## Out of scope (explicit)

- New design-language axes — K converges, doesn't extend.
- New public components beyond `Button variant="primary-audacious"` (the variant extension; not a new component).
- Consumer-repo edits — K does not touch speedtest beyond reading aurora preset config.
- Tranche-letter L planning — K closes, then a future session opens L if needed.
- Cross-repo P-tranche second-consumer fidelity (deferred to L per cross-tranche debt).
- The 3 unused public composables (deferred to L cross-repo audit).
- Production demo build configuration (deferred to L per Lighthouse cross-tranche debt).
- Aurora chrome `useAuroraStudio` unification under `useConfiguratorState` (deferred per cross-tranche debt; ≥ 2-consumer bar already met).
