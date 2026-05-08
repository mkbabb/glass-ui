# K — Progress Log

## 2026-05-06 — Tranche open

K opens against J close `5bcf1ce` (FINAL.md present; precept submodule pinned at `6b8437a` — strengthened 6-agent close pattern; bundle-budget gate regressed during v0.8.0 consolidation per Rβ A13).

The tranche opens on three load-bearing inputs:

1. **Rα J retrospective** — surfaced 2 SILENT-MISSES (`hoverOpenDelay` named-but-not-landed; CartoonCard adoption sweep flagged-but-not-residual'd) + 7 EXECUTED-WITH-WORKAROUND items the W7 strengthened audit's α-lane scored as MET.
2. **Rβ chronic-deferrals ledger** — 36 deferral rows across C→J; 15 active K-absorption candidates; A13 (bundle-budget gate) is critical-path P0.
3. **Rδ dispatch-friction audit** — 6 J incidents catalogued; HYBRID worktree-isolation policy + hardened agent git clause + `git -C` idiom proposed.

K reads the 6 research deliverables under `docs/tranches/K/research/R{α,β,γ,δ,ε,ζ}-*.md` as the load-bearing input. There is no open design space, no new research wave, no challenge wave. The work is convergence sweep + dispatch precept hardening + audacious primary-CTA gestalt extraction.

K thesis: J converged the substrate but the long-tail residuals + dispatch process need closeout. Substrate-without-consumer becomes binary at close (no preemptive carry-over); doc-drift becomes binary; bundle-budget gate is restored; vocab convergence becomes gestalt sweep (not leaf migration); the audacious primary-CTA extraction is the K headline architectural transposition.

Wrote initial `K.md`, `findings.md`, `waves/W{0..8}.md`, `dispatch/AGENT.md`, this `PROGRESS.md`. 6 research deliverables (`research/R{α,β,γ,δ,ε,ζ}-*.md`) committed in the same open commit `0666be6`.

## 2026-05-08 — Reconciliation + Lighthouse audit + speedtest W coordination

K was opened on 2026-05-06 but never dispatched. Sixty-seven commits landed on master between `0666be6` and HEAD `23ce73c` (v0.9.0), including v0.8.3 / v0.8.4 / v0.8.5 / v0.8.6 / v0.9.0 releases. These commits constitute an unwritten **V-tranche** (V.W2 foundation polish + V.W3 structural unions + V.W4 storybook + composables expansion) that landed without a `docs/tranches/V/` folder structure.

User directive at `2026-05-08`:

> Update the plan pursuant to the various changes found in the last several commits, since plan authorship. Include a lighthouse optimization audit, done now, and folded herein.

Followed by:

> Further, read over the following and modify your plan accordingly — the speedtest wave shall be executed in a bit. What glass-ui items are already addressed? `/Users/mkbabb/Programming/speedtest/docs/tranches/W`

Three audits were dispatched:

1. **Reconciliation audit** (`audit/K-reconciliation-2026-05-08.md`): walked all 9 K wave specs against the 67 post-open commits + HEAD. Result: 5/38 hard-gate items ABSORBED (V-tranche-attributed), 4 PARTIAL, 27 OPEN, 2 OBSOLETE. Recommendation: revise K in place rather than supersede with L.

2. **Lighthouse audit** (`audit/K-lighthouse-2026-05-08.md` + 6 raw reports under `audit/lighthouse-2026-05-08/`): ran in Vite dev mode (no production demo build script exists at HEAD; deferred to L). Found 1 P0 (Configurator reactive recursion on `/motion/metaballs`) + 5 P1 (a11y trio + non-composited skeleton-shimmer + render-blocking Google Fonts + missing font-display: swap on Computer Modern) + 4 P2 (3 of which defer to L per consumer-deploy / upstream Vue / prod-hosting).

3. **Speedtest W tranche coordination**: read `/Users/mkbabb/Programming/speedtest/docs/tranches/W/W.md` (post-V tranche on speedtest). Speedtest W.W2 dispatches glass-ui v0.9.1 release (ScrollingText lift, Section storybook entry, dist-freshness gates, ~226-site StorySection sweep, v0.9.1 tag); speedtest W.W3.perf.B.T5 ships glass-ui v0.9.2 (cn() tailwind-merge replacement). Surveyed glass-ui state — zero of these items addressed at HEAD; one PARTIAL (39 of ~226 StorySection adoptions in demo). K acknowledges as INBOUND from speedtest W; K does not duplicate.

K plan was revised in place:

- **K.md** rewritten with updated thesis, 16 binding invariants (added: no-shadow-execution, mandatory reconciliation at stale-baseline open, HEADLINE invariant, Lighthouse cohort absorption, speedtest cross-repo coordination), revised wave schedule (W2 RETIRED; W1 reduced to `hoverOpenDelay` decision only; W5 step 1 STRUCK; W7 absorbs P0; new WV V-tranche post-hoc write-up; new WP Lighthouse perf+a11y cohort), Cross-repo coordination section for speedtest W inbound dispatches.
- **W1.md / W2.md / W3.md / W4.md / W5.md / W7.md** annotated with REVISION 2026-05-08 sections.
- **W-V.md** (NEW) authored — `docs/tranches/V/` post-hoc write-up wave.
- **W-P.md** (NEW) authored — Lighthouse perf + a11y cohort wave.
- **PROGRESS.md** (this file) updated.
- **findings.md** updated with 2026-05-08 user directives.

## Status

| Wave | Status | Notes |
|---|---|---|
| W0 | open (ready to dispatch) | Lane I reconciliation pre-completed by `audit/K-reconciliation-2026-05-08.md` |
| W1 | pending W0 | reduced scope: `hoverOpenDelay` decision only |
| W2 | RETIRED | 4/5 absorbed by V-tranche; residuals (`cssVar()`, `.overlay-scrim` @utility) absorb into W3 |
| W3 | pending W1 | counts updated; 13 demo triplet survivors EXCLUDED (speedtest W2.T10 owns) |
| W4 | pending W0 (parallel with W1) | doc-drift LARGER now; budget gate must land before speedtest W3.perf.B.T5 (v0.9.2) |
| W5 | pending W1 | step 1 STRUCK (CarouselPager bug premise wrong) |
| W6 | pending W0 (parallel with W1) | K HEADLINE — entirely OPEN |
| W7 | pending W1 | absorbs Lighthouse P0-1 Configurator recursion fix |
| WV | pending W0 (parallel with W1) | NEW — V-tranche post-hoc plan-folder write-up |
| WP | pending W1 | NEW — Lighthouse perf + a11y cohort (5 P1s) |
| WS | pending W1 (parallel with W6) | NEW (2026-05-08 post-speedtest-W) — vueuse SCC trap fix; v0.9.3 candidate; absorbs speedtest W3.b.1 DEFERRED |
| W8 | pending W3 + W4 + W5 + W6 + W7 + WV + WP + WS | close ceremony with 7-agent strengthened audit (ι integrity-sweep) |

## Inbound from speedtest W tranche

The speedtest W tranche will dispatch the following work into glass-ui (NOT K-attributed):

- **glass-ui v0.9.1** (speedtest W2): ScrollingText lift (`src/components/custom/scrolling-text/`), Section storybook entry (`demo/stories/primitives/section.vue`), dist-freshness gate (`scripts/freshness-gate.mjs` + `package.json` `prepare`/`prebuild` + exported `assertDistFresh()`), ~226-site StorySection migration sweep across `demo/stories/`, tag.
- **glass-ui v0.9.2** (speedtest W3.perf.B.T5): `src/utils/cn.ts` refactor — replace `tailwind-merge` with `clsx` + hand-rolled deduplicator; expected ~10-18 KB gz savings on speedtest's eager bundle.

K W4 bundle-budget gate must land BEFORE speedtest W3.perf.B.T5 to baseline cleanly. K W3 demo lane EXCLUDES the 13 raw triplet sweep (speedtest W2.T10 owns).

## 2026-05-08 (post-W close at speedtest tag `w-close`) — speedtest-W feedback absorbed

Speedtest tranche W closed at speedtest commit `5703521b` / tag `w-close`. The 47-commit cohort landed v0.9.1 + v0.9.2 inbound work as planned, plus a single follow-up finding routed back to glass-ui:

- **W3.b.1 vueuse manualChunk DEFERRED** (speedtest commit `aade571`, disposition at `/Users/mkbabb/Programming/speedtest/docs/tranches/W/artefacts/W3/b1/disposition.md`). Speedtest agent verified that adding a `vueuse` manualChunk to `vite.config.ts` regresses the V.W1.T7 SCC class — Rollup hoists Vue runtime + `@vue/shared` + `@vue/reactivity` + `@vue/runtime-core` into the new vueuse leaf chunk to satisfy both consumers, and Vite emits `<link rel="modulepreload">` for the eager critical path. The eager-bundle target (≤ 140 KB gz on speedtest's `/`) cannot be hit without addressing this trap upstream; speedtest landed at 222.9 KB gz (W3.c bundle-post-W3.html).

K absorbs this finding as **K.WS** (NEW wave) per `docs/tranches/K/waves/W-S.md`. The wave delivers v0.9.3 — additive subpath exports for vueuse-bearing components (Input/Textarea/Combobox*) + composables (useGlobalDark, useKeyboardShortcuts) — so consumers like speedtest's worker can import lightweight composables (`useInterval`, `useTimer`) from the root barrel without dragging vueuse + Vue runtime into the eager critical path. Phase 1 is additive only; root-barrel REMOVALS (breaking change) defer to L tranche / v1.0.

Cross-repo precept: K is now responsible for an **outbound** dispatch (v0.9.3 → speedtest re-link), distinct from K's prior **inbound** dispatches from speedtest W (v0.9.1 + v0.9.2). The cross-tranche-debt matrix in K.md "Cross-repo coordination" §7 documents the routing.

Other speedtest W close-state items routed elsewhere:

- Operator-tier rows (R1-R5, R7) DOC-STAGED on credential boundaries (npm token, CF dashboard, host SSH, IAM) — operator-side, NOT K-attributed.
- Live deploy DOC-STAGED on `CLOUDFLARE_API_TOKEN` — operator-side, NOT K-attributed.
- Speedtest `.metric-display` --digit-count CLS residual — speedtest-side (`SpeedtestResults.vue`), NOT a glass-ui concern.
- Glass-ui v0.9.1 + v0.9.2 origin tag push: ALREADY DONE (`git ls-remote --tags origin | grep v0.9.[12]` returns both refs at 32ae156 + cc30e74). The W FINAL.md note about "DOC-STAGED on npm token" was inaccurate; the git tag push needs no npm token. **No outstanding tag-push work.**
