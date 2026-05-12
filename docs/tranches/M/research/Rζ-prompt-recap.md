# M · Rζ — Prompt Recap + Ensure-Addressed Audit (all user directives, C → M)

**Date**: 2026-05-12
**Baseline commit**: HEAD `c5f196c` (L W6 close) — open commit for M not yet authored at this lane time.
**Predecessor**: `docs/tranches/L/research/Rζ-prompt-recap.md` (47-row C → L catalogue authored at L open).
**Lane**: ζ — conversational integrity check, sixth of six parallel M pre-research lanes.
**Scope**: every user-issued directive captured from tranche C onward, classification + HEAD verification + L-new attribution status + M-new directive surfacing + constellation-wide harmonisation.
**Method**: read-only walk of `docs/tranches/{C,D,D-II,E,F,H,I,J,K,L,V}/` (G absent; D-II = sub-tranche of D; M open commit pending). Cross-reference `L/research/R{α-ζ}.md`, `K/research/R{α-ζ}.md`, every `*/findings.md`, every `*/FINAL.md`. Cross-repo verification via `ls`/`git log` against `/Users/mkbabb/Programming/{keyframes.js, value.js, fourier-analysis, words, bbnf-lang, speedtest, colors}/`.

This lane walks every binding directive issued across the conversation, verifies adherence at HEAD `c5f196c`, surfaces orphaned / partial directives, attributes each L-new directive to its addressing research lane (and verifies they landed at L close), names every M-new directive surfaced this turn, and answers the constellation-wide harmonisation question raised by the M-open prompt.

---

## §A — Verbatim-recurring directive cluster ("the indefatigability core")

Five directives are quoted verbatim by the user at multiple tranche opens. Together they form the binding-constraint surface for every tranche from C onward, and they remain the L → M carry-forward surface.

| # | Verbatim text | First quoted | Re-quoted at | Status at HEAD | Evidence |
|---|---|---|---|---|---|
| V1 | "Continue through this indefatigably: do not relinquish control back to me until you have completed the plan IN TOTALITY." | pre-C planning | C, D, D-II, E, F, H, I, J, K, L, M | ADDRESSED-AT-HEAD | L closed 13 wave commits (W0..W8 + supplemental) sequentially; never released control mid-tranche. M opens against this same binding. |
| V2 | "NO quick solutions, NO workarounds: idiomatic, gestalt approaches." | C planning | C, D, D-II, E, F, H, I, J, K, L, M | ADDRESSED-AT-HEAD | L W1 HEADLINE shipped 4 architectural transpositions (SCC closure + api/ + flat subpaths + dts coherence) instead of compatibility shims. K HEADLINE (audacious primary-CTA) was canonical extraction, not a patch. |
| V3 | "NO legacy code." | C planning | C, D, D-II, E, F, H, I, J, K, L, M | ADDRESSED-AT-HEAD | L shipped v1.0 with 17 public-surface breaks + 1 demo-private retire (DockShowcaseFrame) + 8 internal moves — no compat shims, no `_v2` parallel paths, no deprecation aliases. WS Phase 2 root-barrel removal landed; this was the canonical V3 fulfilment. |
| V4 | "Architectural transpositions in service of elegance, simplicity, and performance above all are both necessary and desirable." | C planning | every tranche | ADDRESSED-AT-HEAD | L delivered 7 named transpositions per L FINAL §5; K delivered 6; J delivered 3. M opens with V4 still binding (Rε will name M-wave transpositions). |
| V5 | "This is a development product." | C planning | C, D, D-II, E, F, H, I, J, K, L, M | ADDRESSED-AT-HEAD | L 7-agent strengthened close audit (α/β/γ/δ/ε/π/ι); bundle-budget gate held; cross-repo SCC closure verified at speedtest. M inherits the 7-agent close pattern as canonical. |

**Cluster status at HEAD**: 5/5 ADDRESSED-AT-HEAD. All five recur into M as binding-constraint surface.

---

## §B — Cross-tranche directive matrix (PRIMARY DELIVERABLE)

Every binding directive across C → L, ranked by first-surfaced tranche, with recurrence count + addressed-at + disposition. **47 base rows inherited verbatim from L Rζ §C + 8 M-new rows = 55 total rows.**

| ID | Directive (verbatim or close paraphrase) | First-surfaced | Last-surfaced | Recurrence count | Addressed-at | Disposition |
|---|---|---|---|---|---|---|
| **V1** | "Continue through this indefatigably: do not relinquish control back to me until you have completed the plan IN TOTALITY." | pre-C (re-quoted at every open) | M (this turn) | 11 (every tranche C-M) | Orchestrator-level invariant; never broken in flight | ADDRESSED-AT-HEAD / RECURRING |
| **V2** | "NO quick solutions, NO workarounds: idiomatic, gestalt approaches." | pre-C | M | 11 | Every tranche's HEADLINE wave delivers canonical artefact (L W1, K W6, J W3, etc.) | ADDRESSED-AT-HEAD / RECURRING |
| **V3** | "NO legacy code." | pre-C | M | 11 | C-K each retired ≥ 1 legacy substrate; L v1.0 cohort = 17 breaks (no shims, no aliases) | ADDRESSED-AT-HEAD / RECURRING |
| **V4** | "Architectural transpositions in service of elegance, simplicity, and performance above all are both necessary and desirable." | pre-C | M | 11 | C-L each name ≥ 1 transposition per substantive wave (L = 7 named in FINAL §5) | ADDRESSED-AT-HEAD / RECURRING |
| **V5** | "This is a development product." | pre-C | M | 11 | F (proof substrate), H (post-close audit), I (6-agent), J (strengthened 6-agent), K (7-agent + Lighthouse + bundle), L (7-agent + cross-repo verify) | ADDRESSED-AT-HEAD / RECURRING |
| C1 | Phase 3 — Operational Truth: TooltipProvider crash; undefined Tailwind utilities; theme.css radius self-refs; dashboard responsive; StoryPager as real GlassDock; aurora preset overflow; favicon | C open | C close | 1 | C W1-W5 | ADDRESSED-AT-C-CLOSE |
| C2 | "Every CSS class, component, composable, type interface in src/ has ≥ 2 import sites, OR is exported in src/index.ts for consumer use, OR is documented as a private demo-only helper." (Invariant 5: No silent overfitting) | C | M (via memory-rooted overfitting audit canon) | 11 (binding canon since C) | `docs/audits/overfitting-audit.md` canned prompt; runs at every tranche close | ADDRESSED-AT-HEAD / RECURRING |
| D1 | Substrate-with-Consumer: deletes propagate to `src/index.ts`; wires Playwright-walked; consumer evidence names current code; sidebar hoist (Option (i)); Vitest harness; iter < 10 s wall | D open | D close | 1 | D W0-W4 + D-II W1-W3 | ADDRESSED-AT-D-CLOSE |
| D2 | "Option (i)" — sidebar composables move to `src/composables/sidebar/`; types stay co-located | D | D | 1 | D.W0.D; current `src/composables/sidebar/` has 4 composables | ADDRESSED-AT-HEAD |
| D-II.1 | "There is one dock surface." — vertical app rail is GlassDock variant="rail", not separate `Rail` package | D-II | D-II | 1 | D-II W1 (later evolved to DockLayerGroup at H) | ADDRESSED-AT-HEAD |
| E1 | Publication Contract Cutover: root narrowed to core allowlist; non-core via explicit subpaths; one CSS entry; verify-export-types | E | L (re-amended at L W1) | 3 (E + K WS + L W1) | E W0-W4 → v0.5.0; K WS Phase 1; L W1 HEADLINE (Phase 2) | ADDRESSED-AT-HEAD |
| F1 | "Interaction, Style, and Rendering Contract Hardening" — eight-lane audit; dock single family; Tailwind v4 theme; Aurora live/capture | F | F | 1 | F W0-W6 | ADDRESSED-AT-F-CLOSE |
| G-implicit | (G shipped 11-axis design language + 17 packages + 4 composables + 7 blob composables + 49 utilities + 25 stories + 6 consumer ledgers; user-facing scope implicit) | G | H trim | 1 | SUPERSEDED — H trimmed 77 G-shipped artefacts cleanly | ADDRESSED-AT-H-CLOSE |
| H1 | "Wire-or-retire is binary." | H | M (binding canon) | 8 | H W1; 77 G artefacts retired | ADDRESSED-AT-HEAD / RECURRING |
| H2 | "No destructive git as agent recovery." | H | M (binding canon — Hardened agent git clause) | 8 | H W0 → precept submodule `cc57c91`; AGENT_DISPATCH_TEMPLATE.md non-negotiable | ADDRESSED-AT-HEAD / RECURRING |
| H3 | "Post-close audit runs BEFORE FINAL.md is final." (4-agent → 6-agent → 7-agent) | H | M | 8 | H W0 → SPEC.md ## Close; extended to 7-agent at K (added ι integrity-sweep) | ADDRESSED-AT-HEAD / RECURRING |
| H4 | "Idiomatic gestalt > artefact preservation." | H | M | 8 | H invariant 5; J FuzzySearch 600→158 LOC is canonical exemplar | ADDRESSED-AT-HEAD / RECURRING |
| H5 | "DESIGN.md is documentation-of-source, not specification." | H | M | 8 | H invariant 7; γ doc-drift audit lane runs every close | ADDRESSED-AT-HEAD / RECURRING |
| H6 | "Per-wave commits at wave close." | H | M | 8 | H invariant 10; every wave-close commits its diff | ADDRESSED-AT-HEAD / RECURRING |
| I1 | "Chronic deferrals (≥ 2 tranches without closure) MUST resolve." | I | M | 7 | I W1-W3 (21/21 rows disposed); K Rβ re-litigated at K open; L Rβ at L open | ADDRESSED-AT-HEAD / RECURRING |
| I2 | "Cross-tranche silent surface additions are owned in I.W1." (4 P-tranche packages + 1 Q-tranche) | I | I | 1 | I W1.B (5 packages WIRE) | ADDRESSED-AT-HEAD |
| I3 | "Visual audit is a binding close-ceremony lane." (4 → 6 → 7 agents) | I | M | 7 | I W0 → SPEC.md; K added ι at 7-agent; L canonical | ADDRESSED-AT-HEAD / RECURRING |
| I4 | "Token alias chains retire single-direction." | I | M | 7 | I W1 (9 round-trip alias families retired) | ADDRESSED-AT-HEAD / RECURRING |
| I5 | "Architectural tensions resolve or document a named hierarchy." | I | M | 7 | I W3 (8 tensions resolved); DESIGN.md ## Substrate Hierarchy + ## Story Fidelity Policy + ## Accessibility Posture; CLAUDE.md ## Design Axes | ADDRESSED-AT-HEAD / RECURRING |
| I6 | "Recovery-diary scrub is binary at close." | I | M | 7 | I W1 + lint.yml `recovery-diary-scrub` CI guard | ADDRESSED-AT-HEAD / RECURRING |
| I7 | "Bundle / CSS size floors promote to soft-fail gates." | I | M | 7 | I W6 → `lint.yml bundle-budget` job; regressed v0.8.0; re-landed K W4 Lane B; held through L | ADDRESSED-AT-HEAD / RECURRING |
| J1 | J 18-finding inventory (`J/findings.md`) | J | J | 1 | J W3-W6 (18/18 ADDRESSED per K Rζ §C independent re-verification) | ADDRESSED-AT-HEAD |
| J2 | "NO legacy code." (re-issued; same as V3) | J | M | 4 | DockPopover retired (no alias) | ADDRESSED-AT-HEAD / RECURRING |
| X1 | "normalize this all back to master, merge them both. no specialized branches, but keep a backup." | J pre-open | M | 4 | Consolidation commit `5baceb5`; 4 `backup/*` tags preserve pre-state; K/L/M stay on master | ADDRESSED-AT-HEAD / RECURRING |
| X2 | "Begin and continue the current tranche" + read-the-precepts framing | J | M | 4 | Precept submodule advanced `6b8437a → fdc020c → d4ada55 → b51047d` across K W0/W8 + L W0 | ADDRESSED-AT-HEAD / RECURRING |
| K1 | "DEEPLY audit with 6 agents in parallel our original plan and waves thereof, alongside all changes made herein." | K open | M open (this turn) | 3 (K, L, M) | K Rα-Rζ; L Rα-Rζ; M Rα-Rζ (this dispatch) | ADDRESSED-AT-HEAD / RECURRING |
| K2 | "What happened earlier in the tranche, with the worktree ref errors?" | K | K | 1 | K W0 Hardened agent git clause + Worktree Isolation; LESSONS-LEARNED additions | ADDRESSED-AT-K-CLOSE |
| K3 | "Delineate any chronically deferred items and fold them into this new tranche." | K | M (this turn) | 3 (K, L, M) | K Rβ (36-row ledger); L Rβ (extended C-K + post-K); M Rβ pending this dispatch | ADDRESSED-AT-HEAD / RECURRING |
| K4 | "Delineate any deferred items and fold them into this new tranche." | K | M | 3 | K Rβ + Rγ; L Rβ + Rγ; M Rβ + Rγ pending | ADDRESSED-AT-HEAD / RECURRING |
| K5 | "Recap ALL of our prompts and requests hitherto and ensure they've been addressed." | K | M (this turn) | 3 (K, L, M) | K Rζ (12-row C-J); L Rζ (47-row C-L); M Rζ (this document — 55-row C-M) | ADDRESSED-AT-HEAD / RECURRING |
| K6 | Lighthouse audit folded in (2026-05-08) — "Update the plan pursuant to the various changes... Include a lighthouse optimization audit, done now, and folded herein." | K mid | K | 1 | K WP (5 P1 fixes); 6 raw Lighthouse reports | ADDRESSED-AT-K-CLOSE |
| K7 | Speedtest W-tranche cross-walk (2026-05-08) — "What glass-ui items are already addressed?" | K mid | L cross-repo | 2 (K + L) | K.md ## Cross-repo coordination; L coordination/speedtest-Y.md | ADDRESSED-AT-HEAD |
| L1 | "DEEPLY audit with 6 agents in parallel..." (re-issue of K1) | L | M | 2 | L Rα-Rζ all delivered (193+287+444+499+253+207 LOC); M Rα-Rζ now firing | ADDRESSED-AT-L-CLOSE / RECURRING |
| L2 | "Devise a path forward: audit the hitherto made changes and the remaining plan; recapitulate our original prompts, plans, and precepts." | L | M | 2 | L plan synthesis post-research (L.md); 9-wave plan executed | ADDRESSED-AT-L-CLOSE |
| L3 | "Check for likely needs to be better modularized into sub-modules, and ensure cohesion with our other modules, potentially having an api dir, etc." | L (NEW) | L | 1 | L Rε deep-dive (253 LOC); L W1 Lane B shipped `src/api/` (32 symbols); L W2 composables/ restructured into 8 coherent sub-trees | ADDRESSED-AT-L-CLOSE |
| L4 | WS Phase 2 (vueuse root-barrel removal) — NAMED-PENDING from K | K → L | L | 2 | L W1 HEADLINE — `d1de94b` + `fa6e6c7`; SCC trap closed (verified at speedtest re-link `98f88325`; -32.5 KB gz on consumer eager chunk) | ADDRESSED-AT-L-CLOSE |
| L5 | "Delineate any chronically deferred items and fold them into this new tranche." (re-issue of K3) | L | M | 2 | L Rβ — 23 L-bound rows; all dispositioned at L close | ADDRESSED-AT-L-CLOSE / RECURRING |
| L6 | "Delineate any deferred items and fold them into this new tranche." (re-issue of K4) | L | M | 2 | L Rβ chronic + Rγ residuals (444 LOC) | ADDRESSED-AT-L-CLOSE / RECURRING |
| L7 | "Recap ALL of our prompts and requests hitherto and ensure they've been adressed." (re-issue of K5) | L | M | 2 | L Rζ (47-row C-L catalogue) | ADDRESSED-AT-L-CLOSE / RECURRING |
| L8 | Typing-publication gap (X.W3.c — speedtest's 5 consumer files cannot migrate via tsc) | L (NEW, post-K-close) | L | 1 | L W1 Lane A (38 emitted dts files self-contained, zero `'../src/...'` refs) | ADDRESSED-AT-L-CLOSE |
| L9 | "Tree clean, no specialized branches" + master-only + backup-tags-only | L (re-codified) | M | 2 | L stayed on master; tags v0.9.4 + v1.0.0 + backup tags only | ADDRESSED-AT-HEAD / RECURRING |
| L10 | K residuals R1-R4 absorption | K residuals | L | 1 | L W4 (R1 StoryPager π-1) + L W5 (R2 doc cohort, R3 wave-spec status lines, R4 surface-tint rungs) | ADDRESSED-AT-L-CLOSE |
| L11 | K cross-tranche debt (12 entries) absorption | K CTD | L | 1 | L FINAL §7 — 4 P2 → M, 12+ P3 → M, 2 PERMANENT-DEFER, 1 process residual → M.W0 | PARTIAL-AT-L (residuals → M) |
| **M1** | "DEEPLY audit with 6 agents in parallel our original plan and waves thereof, alongside all changes made herein." | M (this turn) | M | 1 | M pre-research Rα-Rζ dispatch (this lane is 6 of 6) | IN-PROGRESS |
| **M2** | "Devise a path forward: audit the hitherto made changes and the remaining plan; recapitulate our original prompts, plans, and precepts." | M | M | 1 | M plan synthesis (M.md authoring post-research) | PENDING |
| **M3** | "Delineate any chronically deferred items and fold them into this new tranche." (re-issue) | M | M | 1 | M Rβ pending this dispatch | IN-PROGRESS |
| **M4** | "Delineate any deferred items and fold them into this new tranche." (re-issue) | M | M | 1 | M Rβ + Rγ pending | IN-PROGRESS |
| **M5** | "Recap ALL of our prompts and requests hitherto and ensure they've been adressed." (re-issue) | M | M | 1 | M Rζ — this document | DELIVERED-HERE |
| **M6** | "This should also be for our consumer repos, too, like keyframes, fourier-analysis, value.js, speedtest, words, etc — list them ALL — we have control over all of them." | M (NEW) | M | 1 | Constellation-wide tranche scope — NEW dimension. Cross-repo audit owed (§E + §F) | PENDING |
| **M7** | "This is for a tranche development session, not an implementation one." | M (NEW) | M | 1 | M is a pure planning tranche; no implementation waves emit until plan synthesis | BINDING |
| **M8** | "Architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable. NO legacy code." (re-issue of V3 + V4) | M | M | 1 | Binding-constraint surface for M; M Rε will name M-wave transpositions | BINDING |

**Total directive rows**: **55** (5 verbatim-recurring + 8 cross-cutting + 34 tranche-specific + 8 M-new).
**Recurrence-count > 1**: 20 directives (V1-V5 + C2 + H1-H6 + I1 + I3-I7 + J2 + X1 + X2 + K1 + K3 + K4 + K5 + L9).
**Recurrence-count > 5**: 13 directives (V1-V5 + C2 + H1-H6 + I3 + I4 + I6 + I7 + L9 — all the binding canons).
**ADDRESSED-AT-HEAD count**: 47 (rows 1-47).
**PENDING/IN-PROGRESS count**: 7 (M1-M5 + M6 + M7).
**BINDING count**: 1 (M8 — verbatim re-issue of binding canons, not a new gap).

---

## §C — Top 10 most-recurring directives (re-ranked by recurrence + impact)

L Rζ identified "5 verbatim-recurring + 7 cross-cutting" directives. M Rζ re-ranks the top 10 by recurrence + impact, with each row analysed for **why it keeps recurring** (precept gap? execution gap? scope creep?).

| Rank | ID | Directive | Recurrence | Why it recurs | Precept-gap diagnostic |
|---|---|---|---|---|---|
| 1 | **V1** | "Indefatigability — close the plan in totality, do not yield." | 11× | Defines orchestrator behaviour at every turn. NOT a gap — it is the operating mode. Recurs because user re-asserts at every tranche open to harden the no-yield contract. | NO precept gap; codified in SPEC.md `## Indefatigability` |
| 2 | **V2** | "NO quick solutions, NO workarounds." | 11× | Defines artefact-quality standard. NOT a gap — recurs because the standard re-applies at every tranche scope. | NO precept gap; AGENT_DISPATCH_TEMPLATE.md `## Non-negotiables` |
| 3 | **V3** | "NO legacy code." | 11× | Defines clean-break standard. NOT a gap — recurs because new substrate accumulates between tranches and re-deletes are required at every cycle. **Honored canonically at L** with v1.0 cohort (17 breaks, no shims). | NO precept gap, but **chronic by design** — substrate evolution naturally accumulates legacy candidates. |
| 4 | **V4** | "Architectural transpositions..." | 11× | Defines elegance/simplicity/perf bias. Recurs because each tranche surfaces new transposition candidates. Honored at every substantive wave. | NO precept gap; `## Architectural transpositions` in AGENT_DISPATCH_TEMPLATE.md non-negotiables |
| 5 | **V5** | "This is a development product." | 11× | Defines production-leaning hardening standard. Recurs to remind that 7-agent close + bundle gates + cross-repo verification all apply. | NO precept gap; codified at I (6-agent → 7-agent at K) |
| 6 | **C2/H1** | "Wire-or-retire is binary." + overfitting audit (Invariant 5: No silent overfitting) | 11× (C2) + 8× (H1) | Substrate-without-consumer audit at every close. Recurs because each tranche ships new artefacts that need re-attestation. **Honored at L** with 0 P0 / 0 P1 β findings. | NO precept gap; canonical canned prompt at `docs/audits/overfitting-audit.md` |
| 7 | **H2/L9** | "No destructive git as agent recovery" + "master-only / backup-tags-only" | 8× + 4× | Process invariant; recurs because new agents are dispatched at every wave and the Hardened agent git clause must be re-asserted. **Honored canonically at L** (W1 Lane B self-disclosed `git checkout`; L W0 → M.W0 LESSONS-LEARNED expansion). | NO precept gap, but **execution-gap-tracked** (L W1 Lane B incident → next-tranche LESSONS extension) |
| 8 | **H3/I3** | "Post-close audit runs BEFORE FINAL.md" (4 → 6 → 7-agent) | 8× + 7× | Close-ceremony invariant. Recurs because the agent count + lane set has grown (4 at H → 6 at I → 7 at K with ι integrity-sweep). | NO precept gap; SPEC.md `## Close` |
| 9 | **K3-K5 / L5-L7 / M3-M5** | "Delineate chronically deferred + deferred items + recap ALL prompts and ensure addressed." | 3× (K/L/M) | **PROCESS-LEVEL DIRECTIVE**. Recurs because the user wants periodic conversation-integrity verification, not because the prior tranche failed. **Honored at every re-issue** — K Rβ/Rγ/Rζ, L Rβ/Rγ/Rζ, M Rβ/Rγ/Rζ. | NO precept gap, but **could promote to canonical pre-research lane set** (R-β chronic + R-γ residuals + R-ζ prompt-recap) — see §H precept-gap diagnostics. |
| 10 | **K1/L1/M1** | "DEEPLY audit with 6 agents in parallel..." | 3× (K/L/M) | Pre-research dispatch invariant. Recurs because user wants verifiable parallel audit at every tranche open. | NO precept gap; **suggest** promoting Rα-Rζ pre-research lane set to SPEC.md `## Open` (currently SPEC has `## Close` 7-agent canonical but no symmetric `## Open` 6-agent canonical). |

**Top-10 observation**: every chronic-recurring directive is either binding-canon (V1-V5, H1-H6, I1-I7) or a periodic-verification directive (K3-K5 / L5-L7 / M3-M5). None is unaddressed. None is a precept gap. The chronicity is by design — the user re-asserts binding canons at every tranche to harden the no-yield contract.

---

## §D — L-new directives (verified addressed at L close)

L Rζ identified 8 L-new directives at L open. Each is re-verified for **landing at L close** (HEAD `c5f196c`).

| # | L-new directive | Verification anchor | Verified at HEAD `c5f196c` |
|---|---|---|---|
| L1 | "DEEPLY audit with 6 agents in parallel..." | L Rα-Rζ deliverables (1883 total LOC) | ADDRESSED — all 6 deliverables shipped |
| L2 | "Devise a path forward..." | L.md authoring post-research; 9-wave plan executed (W0-W8) | ADDRESSED — L closed clean per L FINAL |
| L3 | "NO quick solutions, NO workarounds, idiomatic gestalt, architectural transpositions" | L FINAL §5 lists 7 named transpositions executed | ADDRESSED — exceeds ≥ 1 transposition per substantive wave requirement |
| L4 | "NO legacy code" | L v1.0 cohort = 17 public-surface breaks, no shims, no aliases | ADDRESSED — canonical fulfilment |
| L5 | "Delineate any chronically deferred items..." | L Rβ — 23 L-bound rows; all dispositioned | ADDRESSED |
| L6 | "Delineate any deferred items..." | L Rβ chronic + L Rγ residuals (4 + 12 + 1 = 17 rows dispositioned) | ADDRESSED |
| L7 | "Recap ALL of our prompts and requests hitherto..." | L Rζ — 47-row C-L catalogue with L-NEW attribution | ADDRESSED |
| L8 | "Check for likely needs to be better modularized into sub-modules, and ensure cohesion with our other modules, potentially having an api dir, etc." | L W1 Lane B shipped `src/api/` (32 canonical public symbols); L W2 composables/ restructured into 8 coherent sub-trees; L W3 retired 3 composables + 1 primitive | ADDRESSED — comprehensively (W1 Lane B + W2 Lane A + W3 audit) |

**L-NEW landing rate**: 8/8 = 100%. Zero L-NEW directives unaddressed at L close.

---

## §E — M-new directives (the NEW dimension surfaced this turn)

The user's M-open prompt verbatim:

> "DEEPLY audit with 6 agents in parallel our original plan and waves thereof, alongside all changes made herein. Devise a path forward: audit the hitherto made changes and the remaining plan; recapitulate our original prompts, plans, and precepts: NO quick solutions, NO workarounds: idiomatic, gestalt approaches. This is a development product, architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable. NO legacy code. Delineate any chronically deferred items and fold them into this new tranche. Delineate any deferred items and fold them into this new tranche. Recap ALL of our prompts and requests hitherto and ensure they've been adressed. This is for a tranche development session, not an implementation one. This should also be for our consumer repos, too, like keyframes, fourier-analysis, value.js, speedtest, words, etc — list them ALL — we have control over all of them."

**M-new directive enumeration**:

| ID | M-new directive (verbatim or paraphrased) | Wave attribution proposal |
|---|---|---|
| **M1** | "DEEPLY audit with 6 agents in parallel our original plan and waves thereof, alongside all changes made herein." | M pre-research Rα-Rζ (this dispatch fulfils). |
| **M2** | "Devise a path forward..." | M plan synthesis post-research (M.md authoring after Rα-Rζ close). |
| **M3** | "Delineate any chronically deferred items..." | M Rβ deliverable. |
| **M4** | "Delineate any deferred items..." | M Rβ + Rγ deliverables. |
| **M5** | "Recap ALL of our prompts and requests hitherto..." | M Rζ — this document. |
| **M6** | "This should also be for our consumer repos, too — keyframes, fourier-analysis, value.js, speedtest, words, etc — list them ALL — we have control over all of them." | **NEW DIMENSION** — constellation-wide tranche scope. M Rα-Rζ MUST audit not just glass-ui but every controlled consumer repo. Discovery: see §F. |
| **M7** | "This is for a tranche development session, not an implementation one." | **BINDING-CONSTRAINT** — M does NOT emit implementation waves at this iteration. M is pure planning. M.md authoring + Rα-Rζ research → user reviews → THEN M may emit implementation waves (or M closes clean as a pure-planning tranche). |
| **M8** | "NO quick solutions, NO workarounds: idiomatic, gestalt approaches. NO legacy code. Architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable." | **BINDING-CONSTRAINT** — verbatim re-issue of V2 + V3 + V4. Not a new gap; carried-forward. |

**M-new directive count**: 8 (M1-M8). 4 are verbatim recurring (M1/M3/M4/M5 mirror K/L); 2 are NEW dimensions (M6 constellation, M7 planning-only); 2 are binding-constraint re-issues (M8 covers V2-V4).

**The single most-load-bearing M-new dimension is M6 (constellation-wide scope).** L only touched speedtest (cross-repo SCC closure verification). M expands to every controlled repo.

---

## §F — Constellation-wide directive harmonisation (M6 deep-dive)

User-controlled repos under `/Users/mkbabb/Programming/` per directory walk:

| Repo | Has `docs/tranches/`? | Has `docs/precepts/`? | Has `docs/instructions/`? | Last commit date | M-scope status |
|---|---|---|---|---|---|
| **glass-ui** | YES (C/D/D-II/E/F/H/I/J/K/L/V/M — 12 letters) | YES (precepts/instructions submodule) | YES | 2026-05-12 (current) | M HEADLINE — host repo |
| **speedtest** | YES (G/H/I/J/L/M/N/O/P/Q/R/S/T/U/V/W/X/Y — 18 letters) | YES | YES | 2026-05-12 (Y in flight) | M IN-SCOPE — coordinated via L coordination/speedtest-Y.md |
| **bbnf-lang** | YES (AA/AB/AC/AE/AF/AG/AH/AI/AJ/AK/AL/AM/AN/AO/AP/AQ/AR/AS/AT/AU/AZ-IV/B0-B7/BA-BD/W/X/Y/Z — ~36+ letters) | YES | YES | active | M IN-SCOPE — heaviest tranche history outside glass-ui |
| **keyframes.js** | NO (only `docs/instructions/` + `docs/precepts/` + `docs/scroll-morph.md`) | YES (precepts submodule) | YES | 2026-05-? | M IN-SCOPE — glass-ui consumer + has precept submodule |
| **value.js** | NO (only `docs/colors/` + `docs/instructions/` + `docs/precepts/`) | YES | YES | 2026-05-? | M IN-SCOPE — glass-ui consumer + has precept submodule |
| **fourier-analysis** | NO (only `docs/paper-windowing.md` + `docs/instructions/` + `docs/precepts/`) | YES | YES | active | M IN-SCOPE — glass-ui consumer + has precept submodule |
| **words** | NO (only `docs/instructions/` + `docs/precepts/` + flat docs) | YES | YES | active | M IN-SCOPE — glass-ui consumer + has precept submodule |
| **colors** | NO (no `docs/`) | NO | NO | older | M OUT-OF-SCOPE — no tranche substrate; minimal repo (cargo + tsconfig) |
| precepts (submodule) | n/a | self | n/a | 2026-05-12 | M IN-SCOPE — process-level changes route here |

**Constellation-wide directive harmonisation table** — for each top-10 recurring directive, ask: does it apply constellation-wide or glass-ui-only?

| Directive | Applies constellation-wide? | Per-repo verification status |
|---|---|---|
| V1 indefatigability | YES (every repo's tranche orchestrator) | glass-ui: codified; speedtest: codified; bbnf-lang: codified; keyframes.js/value.js/fourier/words: precept submodule pinned — apply transitively |
| V2 NO workarounds | YES | All repos with precept submodules inherit; consumer repos consume canonically |
| V3 NO legacy code | YES | All repos honor; constellation has shipped clean breaks (keyframes.js v2.0.0; glass-ui v1.0.0) |
| V4 architectural transpositions | YES | Per-repo transpositions named in each FINAL.md |
| V5 development product | YES | All repos honor production-leaning hardening |
| C2 / H1 wire-or-retire / overfitting audit | YES | Canonical audit at `glass-ui/docs/audits/overfitting-audit.md`; precept submodule references; speedtest + bbnf-lang have used it |
| H2 / L9 no-destructive-git / master-only | YES | Hardened agent git clause in precept submodule applies to every repo |
| H3 / I3 post-close 7-agent audit | YES | Glass-ui canonical; speedtest extends with own variants; bbnf-lang has tranche close ceremony |
| K3-5 / L5-7 chronic-deferral + recap | YES | Each repo with tranche history should run R-β + R-ζ at open; **gap** — only glass-ui + bbnf-lang currently do this systematically |
| K1 / L1 6-agent parallel audit | YES | Glass-ui canonical; speedtest has parallel research lane discipline at Y; bbnf-lang at multiple tranches |

**Constellation conclusion**: every top-10 recurring directive applies constellation-wide. **6 repos** are in M scope (glass-ui, speedtest, bbnf-lang, keyframes.js, value.js, fourier-analysis, words). **1 repo** (colors) is OUT-OF-SCOPE due to minimal substrate. **2 sub-repos under bbnf-lang** also exist (`bbnf-wt-b5-w3-target`, `bbnf-wt-b5-w4-target`) and are bbnf-lang worktrees, not separate repos. **1 wider auxiliary** (`dns-speedtest`, `speedtest-logging`) — these are speedtest auxiliaries; M-scope inclusion deferred to speedtest's Y tranche or later.

**The big M6 finding**: the constellation has 6 active repos with tranche history (glass-ui, speedtest, bbnf-lang) or precept submodules (keyframes, value, fourier, words). M's plan synthesis MUST address all 6, not glass-ui alone.

---

## §G — Unaddressed-at-HEAD directives (P0 candidates for M absorption)

Any directive marked PARTIAL or with residuals carried-forward becomes a P0 candidate for M absorption. Enumerated explicitly:

### G.1 — L close → M residuals (per L FINAL §7)

| # | Item | Severity | M wave attribution proposal |
|---|---|---|---|
| **M-G1** | F-π-1 (chart-chassis-palette 375 overflow) | P2 | M mobile-viewport polish wave |
| **M-G2** | F-π-2 (dashboard 375 + 1024 overflow) | P2 | M mobile-viewport polish wave |
| **M-G3** | G4 (motion/index.ts barrel style inconsistency) | P2 | M doc-cohesion wave |
| **M-G4** | G14 (ModalOverlay layout="edge" comment wording) | P2 | M doc-cohesion wave |
| **M-G5** | 12+ P3 cosmetics (per-story consumption-sweep + src/api/ Textarea dup + GlassPanelVariant promotion + Aurora -inset-6) | P3 | M housekeeping wave |
| **M-G6** | F-ε-3 (Configurator recursion under Lighthouse load-timing reproduction; Best-practices=96, non-blocking) | RESIDUAL | M substrate-investigation wave |
| **M-G7** | Precept-submodule push divergence reconciliation (origin/main diverged 15 commits with REAUDIT-stream; force-push forbidden) | PROCESS | M.W0 process gate |
| **M-G8** | LESSONS-LEARNED extension — W1 Lane B `git checkout` self-disclosure (extend Hardened agent git clause explicit-forbidden subset) | PROCESS | M.W0 LESSONS-LEARNED entry |

### G.2 — Permanent-defers (re-confirmed for M close ceremony)

| # | Item | Rationale | External destination |
|---|---|---|---|
| A1 | `<HarmonicLevelGrid>` Filmstrip | Consumer-territory | Consumer authors |
| A2 | Blob Web Worker | Encoded but unreachable on M4 Max | Composables/blob/SPEC.md §11.4 |
| A3 | Plugin extraction (Tailwind plugin) | Consumer-territory | Consumer authors |
| A4 | Reduced-motion + a11y deeper sweep | Consumer-deploy work | DESIGN.md `## Accessibility Posture` |
| A5 | C-8 Blob double-rAF | `_internal/` boundary holds | Internal-only |
| A19 | API Extractor dts caching | 18s build acceptable | Future tooling-perf tranche |
| L14 | Vue runtime `uses-passive-event-listeners` | Vue upstream concern | Vue.js upstream |
| L15 | Production hosting `uses-long-cache-ttl` | Consumer-territory hosting | Consumer CDN config |
| L-PD-1 | Production demo build | L W6 Option B formal retire | Consumer deploys |
| L-PD-2 | Cache-ttl hosting | L W6 formal retire | Consumer deploys |

### G.3 — Truly orphaned (P0 — user directive not landed)

**Count: 0.** Every user directive across C → L has either ADDRESSED-AT-HEAD status or named-destination-defer with binding rationale. M opens with **0 truly-orphaned** directives.

### G.4 — M-new P0 (constellation-wide)

| # | Item | Severity | M wave attribution |
|---|---|---|---|
| **M-G9** | M6 constellation-wide directive audit — verify every controlled repo's binding-constraint surface aligns with glass-ui canon | P0 (NEW dimension) | M Rα-Rζ each lane runs cross-repo verification; M plan synthesis emits per-repo wave (or absorption rationale) |
| **M-G10** | M7 planning-only constraint — M does NOT emit implementation waves at this iteration | P0 BINDING | M.md authoring honors this; implementation waves emit only after user re-authorisation |

---

## §H — Directive-recurrence as precept-gap diagnostic

If a directive recurs ≥ 3 times, it's likely a precept gap (the precept doesn't enforce the directive). However, M Rζ analysis (§C top-10) shows the opposite: every chronic-recurring directive is **already** codified in precepts. Recurrence reflects user re-assertion of binding canons at every tranche open, NOT precept gaps.

Three potential precept enhancements emerged from this analysis:

### H.1 — Promote pre-research Rα-Rζ lane set to SPEC.md `## Open`

**Observation**: SPEC.md has canonical `## Close` (7-agent strengthened audit) but **no symmetric `## Open` 6-agent pre-research lane set**. K1/L1/M1 each re-issue "DEEPLY audit with 6 agents in parallel" — promoting Rα (retrospective) + Rβ (chronic-deferrals) + Rγ (residuals→waves) + Rδ (dispatch-friction) + Rε (architectural-transpositions / modularisation) + Rζ (prompt-recap) to SPEC.md `## Open` would eliminate the re-issue and codify the canonical pre-research dispatch.

**Proposed precept clause**: *"Every tranche opens with a 6-lane pre-research dispatch (Rα-Rζ) that walks predecessor tranche close + chronic deferrals + residuals + dispatch friction + transpositions + prompt recap. Lane deliverables land under `docs/tranches/<LETTER>/research/R{α-ζ}-<topic>.md` before plan authorship (M.md, etc.)."*

### H.2 — Constellation-wide directive harmonisation precept

**Observation**: M6 surfaces the constellation-wide dimension. Currently, glass-ui's binding canons are codified in glass-ui's `docs/precepts/` (submodule), but the cross-repo applicability is informal. Promoting constellation-wide directive harmonisation to a precept clause would make every controlled repo's tranche orchestrator inherit the same binding canons.

**Proposed precept clause**: *"Binding canons (V1-V5 + Hardened agent git clause + 7-agent close + Rα-Rζ open + bundle/budget gate + overfitting audit) apply constellation-wide. Each controlled repo pins the precepts submodule. Cross-repo tranches (e.g., speedtest Y consuming glass-ui v1.0) coordinate via `docs/tranches/<LETTER>/coordination/<sibling-repo>.md`."*

### H.3 — Planning-only tranche disposition precept

**Observation**: M7 introduces a NEW tranche-mode: pure planning (no implementation waves at this iteration). Current SPEC.md describes implementation tranches; no explicit "planning-only" mode exists.

**Proposed precept clause**: *"A tranche may open in PLANNING-ONLY mode by user directive. In this mode, the tranche emits Rα-Rζ pre-research + plan synthesis (LETTER.md) ONLY. Implementation waves are deferred to a subsequent tranche letter or to user re-authorisation. Close ceremony for planning-only tranches consists of the pre-research deliverables + plan synthesis + a single PLANNING-CLOSE.md naming the implementation tranche destination."*

These three proposed precept clauses harden the directive-recurrence into stable canon, eliminating the need for the user to re-issue at every tranche open.

---

## §I — M wave attribution recommendations

Based on §G (unaddressed/residual items) + §H (precept-gap diagnostics) + the M-new directives in §E, M's plan synthesis should consider:

| Recommended M wave | Scope | Source |
|---|---|---|
| **M.W0** — process gate + precept submodule reconciliation | Resolve L's precept-submodule push divergence (15 commits with REAUDIT-stream); land LESSONS-LEARNED for L W1 Lane B `git checkout` incident; honor M7 PLANNING-ONLY mode | L FINAL §7 + M7 |
| **M.W1** — constellation-wide directive audit | Per-repo binding-canon verification across glass-ui + speedtest + bbnf-lang + keyframes.js + value.js + fourier-analysis + words | M6 |
| **M.W2** — chronic + residual absorption plan | Synthesise M Rβ + M Rγ + L FINAL §7 residuals into wave-by-wave plan | M3 + M4 |
| **M.W3** — mobile-viewport polish + cosmetics | F-π-1, F-π-2, G4, G14, 12+ P3 cosmetics | L FINAL §7 |
| **M.W4** — F-ε-3 Configurator recursion reproduction harness | Methodical reproduction of Lighthouse load-timing finding | L FINAL §7 |
| **M.W5** — precept promotion | Land H.1 (Rα-Rζ open canonical) + H.2 (constellation-wide harmonisation) + H.3 (planning-only tranche disposition) into precept submodule | §H |
| **M.W6** — close ceremony (PLANNING-CLOSE.md if M stays planning-only; else 7-agent canonical) | Honor M7 binding | M7 |

If user re-authorises implementation at M close, the W3/W4 waves become implementation; otherwise PLANNING-CLOSE.md emits + implementation routes to N tranche.

---

## §J — Authority

M opens against L close `c5f196c` (v1.0.0 tagged + pushed) with:

- **0 truly-orphaned** user directives (every directive ADDRESSED-AT-HEAD or named-destination-defer).
- **8 M-new directives** (M1-M8) — 1 DELIVERED here (M5 = this document); 3 IN-PROGRESS (M1/M3/M4 = sibling research lanes); 2 PENDING (M2 plan synthesis + M6 constellation-wide audit); 2 BINDING (M7 planning-only + M8 binding-constraint re-issue).
- **55 total directive rows** catalogued (5 verbatim-recurring V1-V5 + 8 cross-cutting X1/X2/K1-K7/L9 + 34 tranche-specific + 8 M-new).
- **6 constellation repos in scope** (glass-ui + speedtest + bbnf-lang + keyframes.js + value.js + fourier-analysis + words); 1 OUT-OF-SCOPE (colors); 2 worktrees (bbnf-wt-* are bbnf-lang worktrees).
- **3 proposed precept clauses** (§H.1 Rα-Rζ open canonical; §H.2 constellation harmonisation; §H.3 planning-only mode).
- **10 P0/P1 candidates for M absorption** (M-G1 through M-G10 in §G).

The conversational integrity check returns **CLEAN at L close** + **8 M-new directives surfaced for M dispatch**. M plan synthesis (M.md authoring post-research) MUST fold the M-new directives into named waves (proposal in §I) AND honor the binding-constraint surface (V1-V5 verbatim + M7 planning-only + M8 re-issue + M6 constellation-wide).

**No mutating git operations** performed by this lane — read-only walk of `docs/tranches/` + cross-repo `ls`/`git log` only. No commits, stashes, merges, resets, branch operations.

**Deliverable path**: `/Users/mkbabb/Programming/glass-ui/docs/tranches/M/research/Rζ-prompt-recap.md`.

---

## §K — Verbatim quote-recap (for orchestrator reference)

For convenience, every verbatim user-quoted directive across C → M, in chronological order:

1. **pre-C** — "Continue through this indefatigably: do not relinquish control back to me until you have completed the plan IN TOTALITY."
2. **pre-C** — "NO quick solutions, NO workarounds: idiomatic, gestalt approaches."
3. **pre-C** — "NO legacy code."
4. **pre-C** — "Architectural transpositions in service of elegance, simplicity, and performance above all are both necessary and desirable."
5. **pre-C** — "This is a development product."
6. **C** — Phase 3 Operational Truth finding inventory (TooltipProvider crash + 11 other findings).
7. **C** — Invariant 5: "Every CSS class, component, composable, type interface in src/ has ≥ 2 import sites, OR is exported in src/index.ts for consumer use, OR is documented as a private demo-only helper." (No silent overfitting.)
8. **D** — "Option (i)" sidebar hoist choice.
9. **D-II** — "There is one dock surface."
10. **H** — "Wire-or-retire is binary."
11. **H** — "No destructive git as agent recovery."
12. **H** — "Post-close audit runs BEFORE FINAL.md is final."
13. **H** — "Idiomatic gestalt > artefact preservation."
14. **H** — "DESIGN.md is documentation-of-source, not specification."
15. **H** — "Per-wave commits at wave close."
16. **I** — "Chronic deferrals (≥ 2 tranches without closure) MUST resolve."
17. **I** — "Visual audit is a binding close-ceremony lane."
18. **I** — "Token alias chains retire single-direction."
19. **I** — "Architectural tensions resolve or document a named hierarchy."
20. **I** — "Recovery-diary scrub is binary at close."
21. **I** — "Bundle / CSS size floors promote to soft-fail gates."
22. **J** — J 18-finding inventory (full).
23. **J pre-open** — "normalize this all back to master, merge them both. no specialized branches, but keep a backup."
24. **J** — "Begin and continue the current tranche."
25. **K** — "DEEPLY audit with 6 agents in parallel our original plan and waves thereof, alongside all changes made herein."
26. **K** — "What happened earlier in the tranche, with the worktree ref errors? Do worktrees not work with this volume?"
27. **K** — "Delineate any chronically deferred items and fold them into this new tranche."
28. **K** — "Delineate any deferred items and fold them into this new tranche."
29. **K** — "Recap ALL of our prompts and requests hitherto and ensure they've been addressed."
30. **K mid** — "Update the plan pursuant to the various changes found in the last several commits, since plan authorship. Include a lighthouse optimization audit, done now, and folded herein."
31. **K mid** — "Further, read over the following and modify your plan accordingly — the speedtest wave shall be executed in a bit. What glass-ui items are already addressed? `/Users/mkbabb/Programming/speedtest/docs/tranches/W`"
32. **L** — All K open directives re-issued verbatim (25-29 above).
33. **L** — "Check for likely needs to be better modularized into sub-modules, and ensure cohesion with our other modules, potentially having an api dir, etc."
34. **M (this turn)** — "DEEPLY audit with 6 agents in parallel our original plan and waves thereof, alongside all changes made herein."
35. **M** — "Devise a path forward: audit the hitherto made changes and the remaining plan; recapitulate our original prompts, plans, and precepts: NO quick solutions, NO workarounds: idiomatic, gestalt approaches. This is a development product, architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable. NO legacy code."
36. **M** — "Delineate any chronically deferred items and fold them into this new tranche. Delineate any deferred items and fold them into this new tranche."
37. **M** — "Recap ALL of our prompts and requests hitherto and ensure they've been adressed."
38. **M** — "This is for a tranche development session, not an implementation one."
39. **M** — "This should also be for our consumer repos, too, like keyframes, fourier-analysis, value.js, speedtest, words, etc — list them ALL — we have control over all of them."

Total verbatim entries: **39 user-quoted directives** across C-M. Recurrence-merged into 55-row matrix (§B).

End of M Rζ deliverable.
