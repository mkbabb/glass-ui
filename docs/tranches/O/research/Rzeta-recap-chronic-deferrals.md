# O · Rζ—Longitudinal recap + chronic deferrals + precept LL trajectory

**Date**: 2026-05-14
**Baseline commit**: `37288e0` (N.W4 close; v1.1.4 tagged + pushed)
**Predecessors**: K/L/M/N Rζ + Rβ (`docs/tranches/{K,L,M,N}/research/R{β,ζ}-*.md`)
**Lane**: ζ—recap + plan-vs-actual + chronic deferrals (the longitudinal-recap angle per O13/O14/O15)
**Method**: read-only walk of every `docs/tranches/{K,L,M,N}/{FINAL,findings,research/R{β,ζ}-*}.md` + `docs/precepts/instructions/LESSONS-LEARNED.md` @ `b8af314` + `git log --oneline 54a8acb..37288e0` for AB-shadow window + every cross-tranche debt row.

## §1—Angle summary

Walk the K → L → M → N flight chronologically. Surface (a) every verbatim user directive and its HEAD disposition; (b) every cross-tranche debt row and its current state; (c) every PERMANENT-DEFER / DEFER-RETIRE / ACCEPT-DEGRADED marker and whether rationale still holds; (d) the precept LESSONS-LEARNED trajectory with re-recurrence flags; (e) wave-spec ↔ actual-close alignment per tranche. Output is a unified O-debt ledger + precept-hardening candidates + proposed O.W* absorption attribution.

## §2—Evidence

### §2.1—Verbatim user directive corpus (K → N open + revisions)

Five "indefatigability core" V-invariants are re-quoted verbatim at every tranche open from C onward (L Rζ §A canonical). Each tranche layer adds a TRANCHE-NEW directive class beyond the core. The catalogue below cites the directive's source file path + verbatim status at HEAD `37288e0`.

| Tranche | Directive class | Source (verbatim) | Disposition at HEAD |
|---|---|---|---|
| K open | Indefatigability core (V1-V5) | `K/findings.md` ll. 7-13 | MET |
| K open | DEEP 6-agent audit | `K/findings.md` l. 28 | MET (K.W0 6-lane research; extended to 7-agent strengthened at K.W8) |
| K open | "What happened with worktree ref errors?" | `K/findings.md` ll. 32 | MET (K.W0 hybrid worktree-isolation precept; LL 2026-05-06 sibling-worktrees) |
| K open | Chronic-deferrals fold | `K/findings.md` ll. 34-38 | MET (K absorbed J's chronic surfaces; K Rβ canonical) |
| K revision (2026-05-08) | Lighthouse audit fold + speedtest W inbound | `K/findings.md` ll. 40-48 | MET (K.WP + K W3 demo-bounds reduce; speedtest W2.T10 ownership preserved) |
| L open | Indefatigability core re-issued | `L/findings.md` ll. 7-13 | MET |
| L open | DEEP 6-agent audit | `L/findings.md` l. 17 | MET (L Rα-Rζ 6-lane; 7-agent strengthened at L.W8) |
| L open | Modularization audit + `api/` dir | `L/findings.md` l. 29 | MET (L.W1 Lane B `src/api/` 32-symbol discovery layer; L.W2 8 coherent composable sub-trees) |
| L open | Chronic-deferrals fold | `L/findings.md` ll. 23-27 | MET (L absorbed 56 L Rβ rows; 4 K residuals R1-R4 disposed) |
| M open | Indefatigability core re-issued | `M/findings.md` ll. 7-12 | MET |
| M open | DEEP 6-agent audit | `M/findings.md` l. 6 | MET (M.Rα-Rζ; M.W4 7-lane strengthened) |
| M open | Constellation scope ("consumer repos too—keyframes, fourier, value.js, speedtest, words—list them ALL") | `M/findings.md` l. 18 | MET (M.W1 HEADLINE: 5 consumers migrated; CONSTELLATION.md canonical artefact) |
| M open | Planning-only mode | `M/findings.md` l. 18 | MET (M held planning posture; implementation dispatched on user re-issue) |
| N open | Indefatigability core re-issued | `N/findings.md` ll. 5-31 | MET |
| N open | DEEP 6-agent audit | `N/findings.md` l. 6 | MET (N.Rα-Rζ 6-lane; 7-strengthened + 6 N11 consumer at N.W4 = 13 audit lanes) |
| N open | Chronic-deferrals fold (V repeat) | `N/findings.md` l. 12 | MET (N Rβ disposes 34 open residuals: 26 closed-already + 5 absorb-in-N + 2 retire + 2 permanent-defer) |
| N open | Recap ALL prompts (V repeat) | `N/findings.md` l. 16 | MET (N Rζ recap → ADDRESSED-AT-HEAD for all C-M directives) |
| N open | Planning-only mode (NEW-emphatic) | `N/findings.md` l. 18 | MET (N stayed planning; impl dispatched after KISS + wiring revisions) |
| N open · N6 | Storybook mobile + configurators + spacing/padding | `N/findings.md` l. 20 | DEFERRED-TO-O (N.W2 partially addressed via Configurator density CVA; mobile probe + aurora + metaballs configurators deep-analyzed but configurator-substrate work NOT shipped at N close) |
| N open · N7 | Dock blur reduction | `N/findings.md` l. 22 | NO-OP-DOCUMENTED (N.W2 audit confirmed already at compositor floor; user-perception traces to page-composition stacking) |
| N open · N8 | Dock collapse facilities (icon + mobile arrows; springy/squish/blob) | `N/findings.md` l. 24 | DEFERRED-TO-O (wiring revision did NOT authorize NEW primitive; carry-forward at FINAL §5 row O-8) |
| N open · N9 | Glass panels translucent + frosted default + typography audit | `N/findings.md` l. 26 | MET (N.W1 GlassPanel verify-only—already canonical; typography sweep 9-site `text-micro` absorbed at N.W1 Lane C) |
| N open · N10 | Bidirectional 7-axis style audit | `N/findings.md` l. 28 | MET (Rγ self + Rδ consumer at N open; codified as invariant 21 + binding precept) |
| N open · N11 | 6-agent consumer post-migration audit | `N/findings.md` l. 30 | MET (N.W4 dispatched 6 consumer re-audit lanes; 4 CLEAN + 2 MINOR; β/γ findings absorbed inline) |
| N KISS revision | KISS + 6-agent parallel consumer-audit + overfitting audit + explicate every item + conservative additions AND removals | `N/findings.md` ll. 59-69 | MET (7-audit fan-out at KISS pivot; N-prune-ledger.md authored; A-batch retirement RETRACTED under wiring revision) |
| N wiring revision | "useTouchGate is used, or it should be ... Metaballs, paper-backdrop, typewriter should be used elsewhere too" | implicit from `78974c0` commit + `audit/W0-Lane-C-audit-failure-LL-proof.md` | MET (5 strategic wires landed at N.W0; precept hardened with audit-verdict spot-verification gate) |

**Verbatim core**: K + L + M + N each re-issue the "indefatigability core" (5 directives × 4 tranches = 20 re-issues at HEAD). All HELD; zero violations. The "recap ALL prompts" directive is the canonical recursion that birthed every Rζ lane.

### §2.2—Per-tranche carry-forward ledger consolidation

#### K close → L (K-residuals.md, 4 rows + 12 K.md cross-tranche-debt items)

| ID | Item | L disposition |
|---|---|---|
| K-R1 | StoryPager inner-tab overflow @ 375 | CLOSED L.W4 |
| K-R2 | CLAUDE/README subpath enumeration polish | CLOSED L.W5 doc cohort |
| K-R3 | 12 wave-spec status lines stale | CLOSED L.W5 (19 status-line bumps) |
| K-R4 | 4 `--surface-tint-{35,40,70}` rung gaps | CLOSED L.W5 Lane A Option A |
| K.md WS Phase 2 SCC-trap closure | v1.0 breaking cohort | CLOSED L.W1 HEADLINE |
| K.md aurora chrome Option-A unification | useConfiguratorState extension | CLOSED L.W7 Lane B |
| K.md demo-build deploy decision | Lighthouse cross-tranche | CLOSED L.W5 Option B (formal retire) |
| K.md 3 unused composables audit | retire-or-wire bar | CLOSED L.W3 (3 retired + 3 wire-retained via cross-repo grep) |
| K.md P-tranche second-consumer fidelity | I/J inherited | CLOSED at L.W3 wire-or-retire (1 retire—DockShowcaseFrame; 3 wires—DiscoGlyph + DockGroup + InstrumentChassis) |

#### L close → M (L-residuals.md; 4 P2 + 12+ P3 + 2 process + 1 substrate + 2 permanent-defer)

| ID | Item | M disposition |
|---|---|---|
| L-F-π-1 / L-F-π-2 | chart-chassis-palette + dashboard 375 overflow | CLOSED M.W2 Lane C |
| L-G4 / L-G14 | motion/index.ts barrel + ModalOverlay comment | CLOSED M.W2 Lane C |
| L-P3-1 (Textarea duplicate) | api/ cosmetic | CLOSED M γ verified no-issue |
| L-P3-2 (GlassPanelVariant) | api/ promotion | CLOSED M.W2 Lane B |
| L-P3-3 (Aurora -inset-6 bloom) | cosmetic | OPEN-DEFER-COSMETIC |
| L-F-ε-3 (Configurator recursion) | Lighthouse-load-timing | CLOSED M.W2 Lane A (3-layer source fix; vitest 6/6) |
| L-story P3 cohort (G1-G3,G5-G13,G15-G19) | per-story consumption cosmetic | PARTIALLY-CLOSED at M.W2 Lane C; rest carry as L-story cohort |
| L-W1-Lane-B git-checkout loophole | precept extension | CLOSED M.W0 Lane II |
| L-precept-submodule-push divergence | REAUDIT-stream reconcile | CLOSED M.W0 Lane II (`b51047d → 08a2e9c → 46d6cfb`) |
| L-vue-passive-listeners | upstream | **PERMANENT-DEFER** (Vue upstream; out-of-scope) |
| L-cache-ttl | hosting layer | **PERMANENT-DEFER** (hosting; out-of-scope) |

#### M close → N (M-residuals.md; 8 named-deferred items per M FINAL §7)

| ID | Item | N disposition |
|---|---|---|
| N-1 | `/freshness` subpath retire-or-wire | CLOSED N.W0 A5 (wired to speedtest/vite.config.ts as cross-repo MULTI-WRITER) |
| N-2 | DiscoGlyph production-consumer audit | CLOSED N audit (confirmed wired post-L; no retirement) |
| N-3 | useGlassAlpha internal-usage check | CLOSED at N KISS-revision via audit-failure spot-verify—**was HALLUCINATION**; actual composable is `useGlassRenderer`, used by GlassPanel |
| N-4 | 26 pre-existing AA timeline-story typecheck errors | CLOSED N.W1 Lane C (extracted `legendBackground()` helper) |
| N-5 | NEW dock-layer substrate regression | CLOSED N (verified at audit; no regression at HEAD) |
| N-6 | Demo carousel/metaballs import-path harmonisation | DEFERRED-COSMETIC |
| N-7 | Per-consumer CHANGELOG/MIGRATION proposals (keyframes/value.js) | DEFERRED (cross-repo; user WIP branches) |
| N-8 | `_shared` package naming clarity | DEFERRED-COSMETIC |

#### N close → O (N FINAL §5; 8 named O-deferred items + inherited residuals)

| ID | Item | Source | Disposition guidance |
|---|---|---|---|
| O-1 | Playwright/Chrome-MCP runtime visual probe | N.W4 π TOOLING-DEFERRED | Re-run when tooling reconnects (this O lane has the tools now per dispatch context—but per HARD CAP scope, runtime probes are not this lane) |
| O-2 | 23 broader wire-targets per `audit/N-wiring-targets.md` (28 − 5 wired at N) | N.W0 wiring pivot | Per-consumer / per-primitive tranches in O |
| O-3 | 3 MINOR γ doc-drift items (CLAUDE.md `<Slider>` pointer-anchored→touch-anchored; Structure `section/` + `configurator/` blurbs; CHANGELOG line-count cosmetic) | N.W4 γ audit | Doc cohort absorb in O |
| O-4 | 3 MINOR δ notes (no `data-backdrop` attr; MetaballCanvas position:fixed consumer-scope; SectionBackdrop type not on `/api`) | N.W4 δ audit | Either absorb or defensible-document at O |
| O-5 | N11/b union candidate `<GlassScrubber>` or `Slider variant="timeline-glass"` (3 sites in fourier-analysis/web ~80% recipe overlap) | N.W4 N11 Lane b | NEW substrate candidate at O—wire-or-defer per spot-verification gate |
| O-6 | Keyframes.js 84% UI-scaffolding overfitting + 3 zero-consumer custom components | N.W4 N11 Lane d | Consumer-side cleanup wave |
| O-7 | Words/frontend `--scale-press-{xs..lg}` ladder discussion (9 sites at 4 distinct arbitrary-scale values) | N.W4 N11 Lane a | Token ladder discussion at O |
| O-8 | N8 `<DockMobileToggle>` new primitive—re-evaluate per user signal | N open · N8 | NEW primitive candidate at O—wire-or-defer per user authorization |
| Inherited (L) | vue-passive-listeners | L → M → N | **PERMANENT-DEFER** documentation hardening at O |
| Inherited (L) | cache-ttl | L → M → N | **PERMANENT-DEFER** documentation hardening at O |
| Inherited (M) | keyframes.js + value.js WIP-branch commits remain on user master | M.W1 → N ι | Cross-repo coordination—user-owned |
| Inherited (N) | Aurora -inset-6 bloom (L-P3-3) | L → M → N | DEFER-COSMETIC continues |
| Inherited (N) | L-story P3 cohort residuals | L → M → N | DEFER-COSMETIC continues |

### §2.3—PERMANENT-DEFER / ACCEPT-DEGRADED markers (cross-tranche)

| Marker | Item | First marked | Re-verified | Still load-bearing? |
|---|---|---|---|---|
| PERMANENT-DEFER | C-A1 `<HarmonicLevelGrid>` Filmstrip | C (consumer-territory) | L M N | YES—consumer-territory |
| PERMANENT-DEFER | C-A2 Blob Web Worker | C (encoded-but-unreachable) | L M N | YES—`composables/blob/SPEC.md §11.4` destination |
| PERMANENT-DEFER | C-A3 Tailwind plugin extraction | C (consumer-territory) | L M N | YES |
| PERMANENT-DEFER | C-A4 Reduced-motion + a11y deeper sweep | C (DESIGN.md `## Accessibility Posture` canonical) | L M N | YES |
| PERMANENT-DEFER | C-A5 C-8 Blob double-rAF | C (`_internal/` boundary) | L M N | YES |
| PERMANENT-DEFER | A19 API Extractor dts caching | (non-blocking) | L M N | YES (build ~18s acceptable) |
| PERMANENT-DEFER | L-vue-passive-listeners | L (Vue upstream) | M N | YES—out-of-scope |
| PERMANENT-DEFER | L-cache-ttl | L (hosting) | M N | YES—out-of-scope |
| FORMAL-RETIRE (soft) | vite-plugin-shebang | M.W3 | N | YES—1 dormant consumer; npm tombstone |
| FORMAL-RETIRE | mathanim | M.W3 | N | YES—dormant 5y, 0 consumers, demo-only |
| MOVE-OUT-OF-CONSTELLATION | fourier-animate | M.W3 (Python; outside @mkbabb/* Node) | N | YES |
| ACCEPT-DEGRADED → RESTORED | K.WS Phase 1 SCC trap | K.WS (v0.9.3) → L.W1 HEADLINE (v1.0.0) | RESTORED | n/a—closed |
| ACCEPT-DEGRADED → RESTORED | F-ε-3 Configurator recursion | L.W7 Playwright-clean / Lighthouse-OPEN | M.W2 Lane A 3-layer fix | RESTORED |
| TOOLING-DEFERRED | N.W4 π Playwright/Chrome-MCP runtime probe | N.W4 | OPEN → O | YES—re-run when tooling reconnects |
| NO-OP-AT-SUBSTRATE | N7 dock-blur reduction | N.W2 (already at compositor floor; perception = page-composition stacking) | N | YES—documented in DESIGN.md `## Dock Blur Source-of-Truth Comparison` |

### §2.4—Precept LESSONS-LEARNED chronology + re-recurrence

24 LL entries from 2026-04-29 through 2026-05-13 inclusive (precept submodule `b8af314`):

| Date | Entry | Source tranche | Re-recurrence? |
|---|---|---|---|
| 2026-04-29 | Substrate Without Consumer Is Not Progress | bbnf-lang AZ-I/AZ-II | Reaffirmed every tranche (β audit canon) |
| 2026-04-29 | Ceremonial Waves Hide Shared Activation Paths | bbnf-lang AZ-I | n/a |
| 2026-04-29 | Research Needs Challenge Before Synthesis | bbnf-lang | n/a |
| 2026-04-29 | Docs Are Part Of Wave Close | tranche specs | Reaffirmed every close (γ audit canon) |
| 2026-04-29 | Watchdogs Must Be Independent | config docs | n/a |
| 2026-04-29 | One Writer Per Side Effect | config docs | n/a |
| 2026-04-29 | Contracts Need Producer And Consumer Gates | config docs | n/a |
| 2026-04-29 | Runtime Truth Beats Source Claims | config docs | Reaffirmed at K visual-runtime π; N.W4 π TOOLING-DEFERRED |
| 2026-04-29 | Parallel Agent Budget Is A Resource | config docs | Hardened at M.Rδ P6 (dual ceiling 6 impl / 7 audit) |
| 2026-04-30 | Bodyless Large Commits Erase Gate Evidence | bbnf-lang AZ-II | n/a |
| 2026-04-30 | Sibling Worktrees Prevent Agent Races | bbnf-lang | Codified at K.W0; held through L/M/N |
| 2026-04-30 | Empty Returns Are Failed Dispatches | bbnf-lang | n/a |
| 2026-04-30 | Triumvirate Auto-Triggers | bbnf-lang | n/a |
| 2026-04-30 | HARD CAPs On Every Dispatch | bbnf-lang | Held; this dispatch carries 25 min cap |
| 2026-04-30 | No Polling, Use Background + Monitor | bbnf-lang | n/a |
| 2026-04-30 | Single Cargo Per CARGO_TARGET_DIR | bbnf-lang | n/a (Rust scope) |
| 2026-04-30 | Read-Size Preflight Before Large Reads | bbnf-lang | Held this dispatch (wc -l before Read) |
| 2026-04-30 | Templated Commit Bodies Are Bodyless In Spirit | bbnf-lang | n/a |
| 2026-04-30 | Scope Pivots Open A New Letter | bbnf-lang | Codified K invariant 3 (no tranche-letter shadow execution) |
| 2026-04-30 | Six-Agent Wave Ceiling | bbnf-lang | Hardened at M.Rδ P6 dual ceiling |
| 2026-04-30 | Cherry-Pick Preserves Wave Provenance | bbnf-lang | n/a |
| 2026-04-30 | Close-Honesty Checklist Before Terminal Close | bbnf-lang | Codified `tranche/SPEC.md §Close-Honesty` |
| 2026-04-30 | Hardening Pass Compounds Wave Value | bbnf-lang | Codified ORCHESTRATION.md `## Hardening Pass` |
| 2026-04-30 | Generated Code Has A Size Budget | bbnf-lang | n/a (no generator in glass-ui) |
| 2026-05-01 | Style Precept Absorbed | bbnf-lang AZ-III | Held forward |
| 2026-05-03 | Same-Setup Provide/Inject Is A No-Op | speedtest L.W5 | Held |
| **2026-05-04** | **Never Use Git Stash As Agent Recovery** | glass-ui G W3 Lane 4 | **STASH ANTI-PATTERN—1st CODIFICATION** |
| 2026-05-04 | Run Typecheck Earlier In Agent Workflows | glass-ui G | Held |
| 2026-05-04 | Orchestrator Commits At Wave Close | glass-ui G | Held |
| 2026-05-04 | Post-Close Audit Catches Close-Ceremony Falsehoods | glass-ui G | Extended K (7-agent) and M (dual-ceiling) |
| 2026-05-05 | Read-Only Audits Miss Runtime + tailwind-merge Interactions | glass-ui H | Extended at K (π lane) and N (TOOLING-DEFERRED) |
| 2026-05-05 | Cross-Tranche Silent Surface Additions Need Owning Tranche | glass-ui H | **RE-RECURRED at AB** (Pulse aura + Progress sectioned + Timeline split + chassis-max-block-size landed pre-N WITHOUT plan folder; see §3.3) |
| 2026-05-05 | Recovery-Diary Scrub Is Binary | glass-ui H | Held |
| 2026-05-06 | Visual-Runtime Probe Coverage Stop-Rule | glass-ui J.R6 | Held; tooling-deferred at N |
| 2026-05-06 | Per-Story Consumption Sweep | glass-ui J.R6 | Held—δ companion |
| 2026-05-06 | Visual Load-Bearing-ness Bar | glass-ui J.R6 | Held |
| 2026-05-06 | Worktree Isolation For Multi-Agent Shared-File Waves | glass-ui J | Codified K.W0 |
| **2026-05-06** | **Agents Never Stage Or Commit** | glass-ui J W1 + W4.A | **STASH ANTI-PATTERN—2nd CODIFICATION (recovery-mechanism loophole closed)** |
| 2026-05-06 | Use `git -C <dir>` Not `cd <dir> && git` | glass-ui J.W0 | Held |
| 2026-05-06 | No Tranche-Letter Shadow Execution | glass-ui V | Codified K invariant 3—**see AB recurrence §3.3** |
| 2026-05-09 | Worktree Isolation Requires Relative Paths | glass-ui K.W6 | Held |
| **2026-05-09** | **`git stash` Forbidden Even For State-Probe** | glass-ui K.W3 Lane A (3rd recurrence) | **STASH ANTI-PATTERN—3rd CODIFICATION (state-probe loophole closed)** |
| 2026-05-11 | Harness-Level Revert Between Agent Tool Calls | glass-ui K.W3 Lane B | Held |
| 2026-05-11 | Subpath Typing Publication Requires Consumer-Side `tsc` Probe | glass-ui K.WS | Codified L.W0 release-script clause + L invariant 7 |
| 2026-05-11 | Cross-Repo Annotation Push Asymmetry | glass-ui K.WS → speedtest | Held; N.W0 A5 documented (2 piggybacked AC commits flagged at N ι) |
| 2026-05-11 | DEGRADED Close Requires Bound Restoration | glass-ui K.WS | Held—L.W1 was the named restoration |
| 2026-05-11 | Cross-Repo Parallel-Tranche Coordination Artefact | glass-ui L ↔ speedtest Y | Codified at L.W0 → M.W0 (CONSTELLATION.md canonical) |
| **2026-05-12** | **`git stash` Anti-Pattern—Fourth Recurrence** | glass-ui M.W2 Lane B + 2× M.W2 Lane C (3 instances across 2 worktree-isolated dispatches) | **STASH ANTI-PATTERN—4th CODIFICATION (transient state-isolation loophole closed; two enforcement vectors codified)** |
| 2026-05-13 | Audit Verdicts Require Spot-Verification | glass-ui N KISS-revision overfitting audit | Codified at N invariant 22; `tranche/SPEC.md §Audit-verdict spot-verification gate`; `instructions/README.md §Edicts §wire-before-retire` |

**Stash anti-pattern trajectory** (5 codifications across 4 tranches):
- 2026-05-04 (G W3 Lane 4): recovery-mechanism loophole closed
- 2026-05-06 (J W1 + W4.A): expanded to "agents never stage or commit"
- 2026-05-09 (K W3 Lane A): state-probe loophole closed
- 2026-05-12 (M.W2 Lane B + 2× M.W2 Lane C): transient state-isolation loophole closed + 2 enforcement vectors (orchestrator-side `git stash list` walk + agent-side `git diff > /tmp/patch` alternative)
- 2026-05-13 (N.W1 Lane C self-disclosed 5th recurrence—**NO new LL entry codified**; FINAL §2 ll. 38: "existing 4-entry ladder already exhaustive; operative check is orchestrator-side `git stash list` walk")

The N orchestrator's choice not to codify a 5th LL entry is defensible (the 4 existing entries are closed-form exhaustive), but the AGENT.md hardening note from this dispatch explicitly raises **tooling-side enforcement candidates** for O.

## §3—Findings

### §3.1—Unified O-debt ledger (consolidating N FINAL §5 + N findings carry-forward + still-open from prior tranches)

| Item | Source-tranche | Source-commit | Current-state | O disposition |
|---|---|---|---|---|
| **O-1** Playwright/Chrome-MCP runtime visual probe | N.W4 π | `37288e0` | TOOLING-DEFERRED at N close; tooling reconnected at O dispatch | **ABSORB-O.W*** (visual-runtime lane at close ceremony) |
| **O-2** 23 broader wire-targets per `audit/N-wiring-targets.md` | N.W0 wiring revision | `b6c1eed` | 5/28 wired at N; 23 OPEN | **TRIAGE-AT-O.W0** (assess per-consumer fanout vs per-primitive batch) |
| **O-3** 3 MINOR γ doc-drift (`<Slider>` contract; section/configurator blurbs; CHANGELOG cosmetic) | N.W4 γ | `37288e0` | OPEN | **ABSORB-O-DOC-COHORT** (single doc-sweep lane) |
| **O-4** 3 MINOR δ notes (data-backdrop; MetaballCanvas position; SectionBackdrop type not on /api) | N.W4 δ | `37288e0` | OPEN | **ABSORB-O.W***(api/ promotion + small substrate clarifications) |
| **O-5** `<GlassScrubber>` or `Slider variant="timeline-glass"` union candidate (3 sites in fourier-analysis/web, ~80% recipe overlap) | N.W4 N11/b | `37288e0` | NEW substrate candidate | **WIRE-OR-DEFER-AT-O** per spot-verification gate (verify 3 sites at the cited consumer state) |
| **O-6** Keyframes.js 84% UI-scaffolding overfitting + 3 zero-consumer custom components | N.W4 N11/d | `37288e0` | OPEN | **CONSUMER-SIDE-WAVE-AT-O** (per-consumer cleanup; analogous to N.W1 keyframes/value.js work) |
| **O-7** Words/frontend `--scale-press-{xs..lg}` ladder discussion (9 sites @ 4 arbitrary scale values) | N.W4 N11/a | `37288e0` | OPEN—token-ladder design candidate | **DESIGN-AT-O** (token discussion lane; possibly NEW tokens) |
| **O-8** N8 `<DockMobileToggle>` new primitive | N open · N8 → N wiring revision deferred | n/a | DEFERRED-AT-N (wiring revision did NOT authorize NEW primitive) | **USER-AUTHORIZE-AT-O** OR defer-with-rationale |
| **O-9** AB tranche post-hoc plan-folder write-up (analog of K.WV for V tranche) | AB (pre-N undocumented; 5 commits between M close + N open: `14631b7` chassis-max-block-size, `2796b28` Pulse aura, `a36cae8` Progress sectioned, `6263330` Timeline split, `215ad06` HoverPopover v-model:open, `46d0891` CHANGELOG canon, `a04f05f` dock-label register, `a28560f` v1.1.0 bump) | `54a8acb..b6c1eed` window (8 commits) | **SHADOW-EXECUTION RECURRENCE** of LL 2026-05-06 "No Tranche-Letter Shadow Execution" precept | **ABSORB-O.W*—author `docs/tranches/AB/` post-hoc plan folder** (K.WV is the canonical pattern) |
| **O-10** AB CSS bundle-budget rebaseline reveal-absorb | AB.W3 (no plan) | absorbed at N.W0 (`b6c1eed` `scripts/profile-bundle.mjs` 29K→36K raw / 5_750→6_700 gz) | RESOLVED at N.W0 transparently | **DOCUMENT-AT-O AB-FINAL.md** (post-hoc; close the audit-gap loop) |
| **O-11** AB substrate-without-consumer follow-on (Pulse aura demo consumer + Progress sectioned demo consumer absent at N) | AB.W3 → N β | absorbed inline at N.W4 close (~30 lines added to pulse.vue + progress.vue stories) | RESOLVED | **VERIFY-AT-O** (close-ceremony β re-walk) |
| **O-12** Inherited L permanent-defers (vue-passive-listeners + cache-ttl) | L | L M N | PERMANENT-DEFER | **DOCUMENT-AT-O FINAL §"chronic permanent defers"** (formal closure; stop carrying as residuals) |
| **O-13** Inherited M cross-repo user-WIP branch commits (keyframes.js + value.js) | M.W1 Lanes A + B | `b788205` + value.js commit | OPEN—user-WIP branches | **USER-OWNED**; carry as cross-repo coordination row in CONSTELLATION.md (not a glass-ui debt) |
| **O-14** Demo carousel/metaballs import-path harmonisation (N-6) | M → N | OPEN cosmetic | **ABSORB-O-DOC-COHORT** |
| **O-15** Per-consumer CHANGELOG/MIGRATION proposals (N-7) | M → N | OPEN cross-repo | **USER-OWNED** (defer to per-consumer tranches) |
| **O-16** `_shared` package naming clarity (N-8) | M → N | OPEN cosmetic | **ABSORB-O.W* (rename or document)** |
| **O-17** Aurora -inset-6 bloom cosmetic (L-P3-3) | L → M → N | OPEN cosmetic | **ABSORB-O-DOC-COHORT or DEFER** |
| **O-18** L-story P3 cohort residuals (partially absorbed at M.W2 Lane C) | L → M → N | OPEN cosmetic | **ABSORB-O-DOC-COHORT** |

**Ledger statistics**:
- Total open at O entry: 18 rows
- O-absorbable (single-tranche): 14 (substrate-or-doc-cohort)
- User-owned / out-of-glass-ui-scope: 2 (O-13 cross-repo WIP; O-15 cross-repo consumer CHANGELOG)
- PERMANENT-DEFER documentation rounds: 1 (O-12 chronic permanent defers)
- NEW substrate candidates requiring user authorization: 2 (O-5 GlassScrubber; O-8 DockMobileToggle)

### §3.2—Precept-hardening candidates for O

| Candidate | Rationale | Source |
|---|---|---|
| **Stash anti-pattern—tooling-side enforcement** | 5 recurrences across 4 tranches (G, J, K, M, N); 4 LL codifications; N orchestrator chose not to codify a 5th entry because prose-only coverage is exhaustive; the operative check is orchestrator-side `git stash list` walk; prior LL 2026-05-12 entry already names this as "two enforcement vectors close the prose-only gap"; AGENT.md note from this dispatch escalates to "tooling-side enforcement candidates" | This dispatch + N.W1 FINAL §2 ll. 38 + LL 2026-05-12 |
| **No tranche-letter shadow execution—re-recurrence at AB** | LL 2026-05-06 codified the V → K post-hoc plan-folder pattern; AB tranche (5+ commits between M close and N open) shipped without a `docs/tranches/AB/` plan folder; N FINAL §3 cites AB's substrate as causing the β P1 findings; pre-N audit did not catch the shadow execution; AB.W3 commit subjects cite the wave numbering (`AB.W3.T2` etc.) confirming tranche-awareness without plan folder | This dispatch §3.3 + commit `46d0891` body |
| **Audit-verdict spot-verification gate operationalisation** | Codified at N invariant 22 + LL 2026-05-13; N N-prune-ledger.md had 3 audit failures pre-spot-verify (1 hallucination + 2 false positives + 1 missed consumer); the gate prevented 3 wrongful retirements; future audit-generated ledgers MUST include the "spot-verified by orchestrator" column | N invariant 22 + LL 2026-05-13 |
| **Wave-spec scope ≠ as-shipped scope ledger** | N.W0 absorb-at-close rebaselined CSS bundle 29K→36K raw transparently because AB tranche shipped ~10 KB without re-running `profile:budget` at AB close; this is the same shadow-execution class as O-9; one mitigation = AB FINAL.md fold-back; another = wave-spec close gate carries a "delta-since-prior-close-rebaseline" column for bundle / token / dist-size budgets | This dispatch + N.W0 FINAL §2 ll. 30 |

### §3.3—Wave-spec ↔ as-shipped scope alignment per tranche

| Tranche | Wave-spec close shape | Actual close shape | Drift? |
|---|---|---|---|
| K | 11 active + WV + W2-retired + WP + WS | All landed per K FINAL §"Wave-by-wave close" + 7-agent strengthened audit | ZERO DRIFT |
| L | 9 waves W0-W8 | All landed per L FINAL §2 + 7-agent strengthened | ZERO DRIFT |
| M | W0-W4 (5 waves) | All landed per M FINAL §2 + 7-agent | ZERO DRIFT |
| **AB** (shadow) | **NO plan folder** | 8 commits → v1.1.0 | **SHADOW EXECUTION**—analog of V tranche pre-K reconciliation |
| N initial (cbe2d13) | 5-wave plan: mobile substrate + dock subsystem + style-discipline HEADLINE | KISS-revised to 4-wave pruning + 7-agent audit (5bdc981) → wiring-pivot to strategic wires (78974c0) | 3 revisions of scope; ALL captured in `N.md §10 revision history` with absorb-at-close—clean per `tranche/SPEC.md §Scope Pivots Open A New Letter` (revisions in place are valid when thesis stays stable) |
| N (final shape) | W0 + W1 + W2 + W4 (W3 absorbed at W2) | Per N FINAL §2 + 13-audit fan-out (7 strengthened + 6 N11) | ZERO DRIFT vs revised plan |

**AB-shadow extent** (`git log --oneline 54a8acb..b6c1eed` window):
- `69c59fa` feat(tokens): add --chassis-max-block-size for consumer cards (AB.W1.T1)
- `13f4f87` docs(CHANGELOG + DESIGN): note --chassis-max-block-size
- `a04f05f` feat(typography): add .dock-label canonical register (AB.W1.T5)
- `cbe2d13` docs(tranche-n/open): mobile-aware substrate (N open)
- `215ad06` feat(hover-popover): add v-model:open + update:open emit (AB.W2)
- `6263330` feat(timeline/continuous): Option C structural split + opaque dot + popover slot + currentSegmentKey + hoverEnd (AB.W2.T1+T2+T3+T4)
- `14631b7` docs(CHANGELOG + DESIGN): timeline AB.W2 canon refinements
- `2796b28` feat(pulse): add variant="aura"—radial halo + breathing animation (AB.W3.T1)
- `a36cae8` feat(progress): add variant="sectioned"—per-segment color cells + transition gradients (AB.W3.T2)
- `46d0891` docs(CHANGELOG): Living UI canon—aura pulse + sectioned progress (AB.W3)
- `a28560f` chore(package): bump 1.0.5 → 1.1.0 + finalize CHANGELOG (AB Living-UI canon close)
- `2b3727f` fix(dock/shadow): retire directional drop + 1px outer ring

**8 substrate additions + 1 fix + 1 bump = 10 commits across AB.W1/W2/W3 with no plan folder**. This is the exact analog of V → K.WV post-hoc write-up. Per K invariant 3 + LL 2026-05-06, this MUST be folded back as `docs/tranches/AB/` post-hoc plan folder at O reconciliation. The N pre-open audit (Rα retrospective) did not surface the AB shadow execution because Rα retrospective is M-on-N; AB landed between M close and N open without an attribution lane.

## §4—Proposed plan implications

### §4.1—O.W* wave attribution per debt entry

Suggested coherent absorb shape (subject to user-authorized O wave plan):

- **O.W0—recon + AB fold-back + permanent-defer formalisation + tooling-side enforcement candidates**
  - O-9: author `docs/tranches/AB/{AB.md, waves/W{1,2,3}.md, FINAL.md, PROGRESS.md}` post-hoc (K.WV pattern). Cite the 8 AB commits + the CHANGELOG canon + the chassis-max-block-size + dock.css fix. AB FINAL.md should attribute the substrate landings and document the wave-spec ↔ shipped delta absorbed at N.W0 (CSS bundle rebaseline).
  - O-10: AB FINAL.md cross-references N.W0 budget rebaseline (`scripts/profile-bundle.mjs` 29K→36K raw / 5_750→6_700 gz) as the post-hoc accounting.
  - O-12: PERMANENT-DEFER chronic ledger formalised at O FINAL §"chronic permanent defers"—stop carrying L-vue-passive-listeners + L-cache-ttl as cross-tranche debt; they get a permanent-defer documentation page.
  - Precept hardening: tooling-side enforcement candidates for the stash anti-pattern (5 recurrences → consider a pre-commit hook on the precept submodule that rejects agent-attributed `git stash` entries, OR a wave-close ι sweep that auto-fails the close if any stash is attributed to an agent worktree).
  - O-11 verify (β re-walk on AB substrate consumers).

- **O.W* HEADLINE candidate—TBD per user signal** (planning-only mode applies; awaits explicit authorization). Likely shape:
  - O-5 `<GlassScrubber>` substrate decision (wire-or-defer at spot-verification gate).
  - O-7 `--scale-press-{xs..lg}` token ladder design.
  - O-8 `<DockMobileToggle>` new primitive (USER-AUTHORIZE).
  - O-2 the 23 broader wire-targets triage.

- **O.W-doc—doc cohort + cosmetic absorbs**
  - O-3: CLAUDE.md drift (3 items)
  - O-4: 3 δ notes (data-backdrop, MetaballCanvas, SectionBackdrop)
  - O-14: N-6 demo carousel/metaballs import-path harmonisation
  - O-16: N-8 `_shared` package naming
  - O-17: L-P3-3 Aurora bloom cosmetic
  - O-18: L-story P3 residuals cleanup

- **O.W-close** (canonical strengthened 7-agent + N11 consumer re-audit pattern):
  - O-1: Playwright/Chrome-MCP runtime probe re-run.
  - Consumer re-audits per O substrate work.

### §4.2—Candidate precept-tier codification at O

1. **Tooling-side stash enforcement**—graduate from prose to tooling. Either (a) precept-submodule `tranche/SPEC.md §Close` mandates wave-close `git stash list` walk + automated rejection of agent-attributed stashes (close-gate); OR (b) a CI-side guard on the integration commit that fails if any `refs/stash` exists at integration window AND was created since open.

2. **Shadow-execution prevention gate (AB-recurrence response)**—`tranche/SPEC.md` requires that any commit subject containing a tranche-letter reference (`(tranche-X/wN)` or `(X.WN.TN)`) where `X` lacks a `docs/tranches/X/` plan folder is auto-flagged at the ι integrity-sweep lane. The check is a one-liner: `git log --oneline <prior-close>..HEAD | grep -E '\((tranche-)?[A-Z]{1,2}[.W]' | <verify plan folder>`.

3. **Wave-spec close-delta ledger**—every wave-close commit body carries a bundle-budget delta row (raw + gz, against the prior wave's close). Rebaselines require explicit `BUDGET-REBASELINE: <reason>` trailer. Mitigates AB.W3 absorb-at-N.W0 pattern.

## §5—Risks (debts that compound if not absorbed)

1. **Stash anti-pattern → 6th recurrence**—5 recurrences across 4 tranches under successive prose-only loopholes; the canonical mitigation is tooling-side enforcement OR an exhaustive forbidden-subset enumeration in the AGENT_DISPATCH_TEMPLATE that explicitly enumerates every state-isolation use case (recovery, state-probe, comparison, isolation, hypothesis-testing, transient-state-isolation, build-verification-isolation). Risk if not absorbed at O: 6th recurrence under a new loophole class (e.g., "I want to confirm whether the failure persists outside my edits, transiently").

2. **AB-style shadow execution recurrence**—V tranche (67 commits, v0.8.0 → v0.9.0) preceded the no-shadow-execution precept; K.WV folded it back post-hoc. AB tranche (8-10 commits, v1.0.5 → v1.1.0) recurred the pattern between M close and N open; N.W0 absorbed the CSS budget rebaseline transparently but the AB plan folder was never authored. If O does not fold AB back as `docs/tranches/AB/`, the constellation has TWO unattributed tranches (V at v0.8-v0.9 historical; AB at v1.1) which compounds the reconciliation cost for future agents reading `git log` history with tranche-aware commit subjects but no plan-folder anchors.

3. **Audit-verdict spot-verification gate not yet operationalised tooling-side**—codified at N invariant 22 + LL 2026-05-13 but the gate runs orchestrator-side as a manual spot-verify against rg invocations. Risk: a future overfitting audit at scale (e.g., 30+ retire candidates) overwhelms manual spot-verification; orchestrator absorbs the load-bearing audit verdicts without re-verification; a retire happens. Mitigation: codify a `npm run audit:verify-prune-ledger` script that takes a prune-ledger.md + re-runs every cited rg invocation against HEAD + reports diffs.

4. **Permanent-defer ledger amorphous**—vue-passive-listeners + cache-ttl have been carried forward L → M → N. They are correctly named PERMANENT-DEFER but they still appear in residual ledgers. Without a formal "permanent-defer ledger" page (separate from the carry-forward ledger), every future tranche's β audit re-discovers them. Mitigation: O FINAL §"Chronic permanent-defers" lists them once with the rationale + the formal "do not re-flag" notation.

5. **Consumer-side cross-repo state drift**—keyframes.js + value.js commits on user WIP branches (M.W1 Lanes A + B) have not been merged to master across 3 tranches (M → N → O entry). Risk: cross-repo coordination drift where the constellation's CONSTELLATION.md state diverges from origin reality. Mitigation: O FINAL.md cites the WIP-branch state explicitly + carries the user-owned coordination row.

6. **Tooling-deferred runtime visual probe (O-1)**—Playwright/Chrome-MCP reconnected at this dispatch window. If O does not run the deferred N.W4 π probe at close, it carries indefinitely. The probe is fast (per N.W4 π audit doc); risk = orchestrator forgets; mitigation = O.W-close ceremony binds the runtime probe as a hard-gate.

---

**O Rζ READS** (verbatim citations to source):
- `docs/tranches/K/FINAL.md`—124 lines
- `docs/tranches/L/FINAL.md`—98 lines
- `docs/tranches/M/FINAL.md`—147 lines
- `docs/tranches/N/FINAL.md`—145 lines
- `docs/tranches/N/findings.md`—77 lines (verbatim N-open + KISS revision + wiring revision)
- `docs/tranches/K/findings.md` + `L/findings.md` + `M/findings.md`—verbatim K/L/M opens
- `docs/precepts/instructions/LESSONS-LEARNED.md` @ `b8af314`—530 lines / 48 entries
- `docs/tranches/{K,L,M,N}/research/R{β,ζ}-*.md`—predecessor recap + chronic-deferral ledgers (avoid re-deriving; chain into the O ledger)
- `git log --oneline 54a8acb..b6c1eed`—AB-shadow 8-commit window

**Author**: O Rζ lane (read-only audit; HARD CAP 25 min observed)
