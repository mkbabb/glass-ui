# L · Rζ — Prompt Recap + Ensure-Addressed Audit (all user directives, C → L)

**Date**: 2026-05-11
**Baseline commit**: `35cae2c` (K W8 close, 2026-05-09; v0.9.3 tagged + pushed)
**Predecessor**: `docs/tranches/K/research/Rζ-prompt-recap.md` (12-row C → J catalogue authored at K open)
**Lane**: ζ — conversational integrity check
**Scope**: every user-issued directive captured across tranches C → L; classification + HEAD verification + L-new attribution
**Method**: read-only walk of `docs/tranches/{C,D,D-II,E,F,H,I,J,K,L,V}/` (G absent; D-II = sub-tranche of D); cross-reference `K/research/Rζ-prompt-recap.md` (predecessor) + `K/research/Rβ-chronic-deferrals.md` (deferral cross-walk) + `L/findings.md` (L open) + every `*/findings.md` + every `*/FINAL.md`.

This lane walks every binding directive the user has issued across the conversation,
verifies adherence at HEAD `35cae2c`, surfaces any orphaned / partial directives,
attributes each L-new directive to its addressing research lane (Rα–Rζ), and recommends
L wave attribution for anything still unhonored.

---

## §A — Verbatim-recurring directive cluster ("the indefatigability core")

Five directives are quoted verbatim by the user at multiple tranche opens. Together they form the binding-constraint surface for every tranche from C onward.

| # | Verbatim text | First quoted | Re-quoted at | Status at HEAD `35cae2c` | Evidence |
|---|---|---|---|---|---|
| V1 | "Continue through this indefatigably: do not relinquish control back to me until you have completed the plan IN TOTALITY." | pre-C planning (re-quoted at every tranche open) | C, D, D-II, E, F, H, I, J, K, L | MET | K closed 12 active waves W0→WS sequentially without yield; J closed W0→W7 sequentially; orchestrator never released control mid-tranche from C onward. |
| V2 | "NO quick solutions, NO workarounds: idiomatic, gestalt approaches." | C planning | C, D, D-II, E, F, H, I, J, K, L | MET | K HEADLINE (audacious primary-CTA) extracted as canonical primitive (not patched); K W3 Lane A cssVar() retired (not aliased); K W7 Configurator P0 fixed at canonical root (not workaround); WS Phase 2 deferred CLEANLY as v1.0 breaking change (no shim). |
| V3 | "NO legacy code." | C planning | C, D, D-II, E, F, H, I, J, K, L | MET-AT-HEAD WITH PHASE-2-PENDING | DockPopover (256 LOC) retired in J.W3.B (no alias); `--cartoon-shadow*` aliases retired in I.W1; `--accent-pink` retired; cssVar() retired in K.W3.A; `.overlay-scrim` @utility retired in K.W3.A. **PHASE-2-PENDING**: vueuse root-barrel removal (WS Phase 2) is the canonical "NO legacy code" act for v1.0 — L MUST execute. |
| V4 | "Architectural transpositions in service of elegance, simplicity, and performance above all are both necessary and desirable." | C planning | every tranche | MET | C: TooltipProvider host transposition; D: sidebar composable hoist; F: dock-family collapse; H: DockPopover keep-open API; I: cartoon recipe → `@utility cartoon-surface` + dock keep-open sink unification + 8 named tension resolutions; J: 3 transpositions (DockPopover → HoverPopover, Configurator primitive, FuzzySearch 600→158 LOC); K: 6 transpositions (audacious-CTA extraction, hoverOpenDelay rename, Configurator P0 absorb, cssVar() retirement, .overlay-scrim retire, vueuse subpath split Phase 1). |
| V5 | "This is a development product." | C planning | C, D, D-II, E, F, H, I, J, K, L | MET | F: runtime + profile + benchmark evidence ladder; H: post-close audit before FINAL; I: 6-agent close pattern canonical; J: strengthened 6-agent with π visual-runtime + animation-timing samples + WCAG contrast probes; K: 7-agent strengthened with ι integrity-sweep + Lighthouse audit + bundle-budget gate re-land. |

**Cluster status**: 5/5 honored at HEAD. V3 carries a NAMED-PENDING Phase 2 obligation (WS root-barrel removal, v1.0 breaking change cohort) → L WS Phase 2 wave fulfills.

---

## §B — Cross-cutting directive cluster (issued once, binding-forward)

Directives issued once but binding all subsequent tranches:

| # | Verbatim text | Originating tranche | Status at HEAD | Carried-forward as |
|---|---|---|---|---|
| X1 | "normalize this all back to master, merge them both. no specialized branches, but keep a backup." | J pre-open (branch-state question) | MET | Consolidation commit `5baceb5`; 4 `backup/*` tags preserve pre-state; K + L stay on master; backup-via-tags-only convention canonical. |
| X2 | "Begin and continue the current tranche" + read-the-precepts framing | J open | MET | Precept submodule advanced K open `6b8437a → fdc020c → d4ada55` across K W0 + K W8 lessons. |
| X3 | J 18-finding inventory (J/findings.md — full enumeration) | J open | MET | 18/18 user findings VERIFIED at HEAD per `K/research/Rζ-prompt-recap.md` §C independent re-verification; transitively binding through I.W7 6-agent close pattern. |
| X4 | "DEEPLY audit with 6 agents in parallel our original plan and waves thereof, alongside all changes made herein." | K open | MET | K dispatched 6 research lanes Rα-Rζ at open; canonical close pattern. Re-issued at L open with same 6-lane shape (Rα-Rζ here). |
| X5 | "What happened earlier in the tranche, with the worktree ref errors? Do worktrees not work with this volume?" | K open | MET | K W0 codified hybrid worktree-isolation policy + Hardened agent git clause; precept submodule `fdc020c`. |
| X6 | "Update the plan pursuant to the various changes found in the last several commits, since plan authorship. Include a lighthouse optimization audit, done now, and folded herein." | K mid-tranche (2026-05-08) | MET | K plan revised in place; `audit/K-reconciliation-2026-05-08.md` + `audit/K-lighthouse-2026-05-08.md` + 6 raw Lighthouse reports; W2 retired, W1/W3/W4/W5/W7 revised, WV + WP added. |
| X7 | "Further, read over the following and modify your plan accordingly — the speedtest wave shall be executed in a bit. What glass-ui items are already addressed? `/Users/mkbabb/Programming/speedtest/docs/tranches/W`" | K mid-tranche (2026-05-08) | MET | Speedtest W.W2 + W.W3.perf.B.T5 surveyed; K.md "Cross-repo coordination" section added; K W3 demo bounds reduced; K W4 ordering constraint (bundle-budget before perf.B.T5). |

**Cluster status**: 7/7 honored at HEAD. Forward-binding: X1 (master-only + backup-tags) + X4 (6-agent close pattern) both binding through L.

---

## §C — Tranche-by-tranche directive table (chronological, C → L)

Each row captures user-issued directives at that tranche's open or mid-tranche. Tranche-specific directives are folded into the originating tranche's plan + close; cross-cutting items routed to §B.

| Tranche | Directive (paraphrased; "" = verbatim) | Type | Where landed | Status |
|---|---|---|---|---|
| **C** | Phase 3 — Operational Truth: close TooltipProvider crash; resolve undefined Tailwind utilities (`font-mono-code`, `text-2xs`); fix theme.css radius self-refs; dashboard responsive; StoryPager as real GlassDock; Rail robust small viewports; math-paper glyph; aurora preset overflow; configurator preset binding; favicon; aurora WIP commit; **overfitting audit canned prompt** | tranche-specific | C W1-W5 | C FINAL §"Wave-by-wave landing" — all closed |
| **C** | "Every CSS class, component, composable, type interface in src/ has ≥ 2 import sites, OR is exported in src/index.ts for consumer use, OR is documented as a private demo-only helper." (Invariant 5: No silent overfitting) | cross-cutting precept | `docs/audits/overfitting-audit.md` canned prompt | MET-FORWARD — overfitting audit runs at every tranche close (binding canon) |
| **D** | Substrate-with-Consumer: re-grounded audit; deletes propagate to `src/index.ts`; wires are Playwright-walked; consumer evidence names current code; sidebar hoist (Option (i) — user chose); Vitest harness; iter < 10 s wall; agent budgets calibrated | tranche-specific | D W0-W4 + D-II W1-W3 | D FINAL + D-II FINAL — all closed |
| **D** | "Option (i)" — sidebar hoist: composables move to `src/composables/sidebar/`; types stay co-located with the component | direct user choice | D.W0.D | MET — current `src/composables/sidebar/` houses 4 composables; types co-located in component package |
| **D-II** | "There is one dock surface." — vertical app rail is GlassDock variant="rail", not separate `Rail` package | tranche-specific | D-II W1 | MET — `src/components/custom/rail/` deleted; `GlassDock variant="rail"` canonical (later evolved with H DockLayerGroup) |
| **E** | Publication Contract Cutover: root narrowed to core allowlist; non-core via explicit subpaths; one CSS entry; verify-export-types covers every form; consumers migrate (3 known consumers) | tranche-specific | E W0-W4 | E FINAL — all closed; v0.5.0 release |
| **F** | "Interaction, Style, and Rendering Contract Hardening" — eight-lane audit; proof substrate first; dock single family; Tailwind v4 theme compile-proof; Aurora live/capture/runtime measured; Aurora `strokeAmount` + dead `uRes`; carousel callback invalidation | tranche-specific | F W0-W6 | F FINAL — all closed (5 P3 residuals named) |
| **G** | (no `G/findings.md`; G shipped 11-axis design language across 17 packages + 14 CVA branches + 4 composables + 7 blob composables + 49 utilities + 11 token namespaces + 25 stories + 6 consumer ledgers — user-facing scope is implicit in H's reaction) | implicit | G (unseen) | SUPERSEDED by H trim |
| **H** | "Wire-or-retire is binary." — every G-shipped artefact wires (≥ 2 in-repo sites) or retires (clean break) | tranche-specific | H W1 | MET — 77 G-shipped artefacts retired cleanly per H FINAL §"Substrate convergence stats" |
| **H** | "No destructive git as agent recovery." | cross-cutting precept | H W0 → precept submodule `cc57c91` | MET-FORWARD — codified in LESSONS-LEARNED 2026-05-04 + AGENT_DISPATCH_TEMPLATE non-negotiable |
| **H** | "Post-close audit runs BEFORE FINAL.md is final." (4-agent canonical) | cross-cutting precept | H W0 → SPEC.md ## Close | MET-FORWARD — extended to 6-agent at I; 7-agent at K (added ι) |
| **H** | "Idiomatic gestalt > artefact preservation." | cross-cutting precept | H invariant 5 | MET-FORWARD — binding canon through K; J FuzzySearch 600→158 LOC is the canonical exemplar |
| **H** | "DESIGN.md is documentation-of-source, not specification." | cross-cutting precept | H invariant 7 | MET-FORWARD — γ doc-drift audit lane runs every close |
| **H** | "Per-wave commits at wave close." | cross-cutting precept | H invariant 10 | MET-FORWARD — orchestrator commits each wave's diff under tranche-letter-tagged commit |
| **I** | "Chronic deferrals (≥ 2 tranches without closure) MUST resolve in I." | tranche-specific binding | I W1-W3 | MET — 21/21 chronic-deferral rows disposed per I FINAL §"Chronic-deferral closure" |
| **I** | "Cross-tranche silent surface additions are owned in I.W1." (4 P-tranche packages: `instrument-chassis`, `glyph-face`, `disco-glyph`, `dock-group`) | tranche-specific | I W1.B | MET — 5 packages WIRE with evidence docs (the 4 + Q-tranche `hover-popover`) |
| **I** | "Visual audit is a binding close-ceremony lane." (4 → 6 agents: α + β + γ + δ + ε performance + π visual-runtime) | cross-cutting precept | I W0 → SPEC.md ## Close | MET-FORWARD — codified at I; K extended to 7-agent with ι integrity-sweep |
| **I** | "Token alias chains retire single-direction." | cross-cutting precept | I W1 alias-retire lane | MET — 9 round-trip alias families retired (cartoon-shadow / soft-shadow / elevated-shadow / etc.) |
| **I** | "Architectural tensions resolve or document a named hierarchy." | tranche-specific | I W3 | MET — 8 tensions resolved (DESIGN.md ## Substrate Hierarchy + ## Story Fidelity Policy + ## Accessibility Posture; CLAUDE.md ## Design Axes) |
| **I** | "Recovery-diary scrub is binary at close" | cross-cutting precept | I W1 + CI guard | MET-FORWARD — `recovery-diary-scrub` lint job + canonical grep |
| **I** | "Bundle / CSS size floors promote to soft-fail gates." | cross-cutting precept | I W6 → `lint.yml bundle-budget` job | MET-WITH-REGRESSION-CYCLE — regressed in v0.8.0 (J Rβ A13); re-landed in K W4 Lane B |
| **J** | 18 user findings (`J/findings.md`) | tranche-specific | J W3-W6 | 18/18 ADDRESSED — independently re-verified per K Rζ §C |
| **J** | "NO legacy code." (re-issued) | cross-cutting precept | J binding constraint | MET — DockPopover retired (no alias); danger-subtle retired (no alias); demo Configurator → PresetEditor (clean break) |
| **K** | "DEEPLY audit with 6 agents in parallel our original plan and waves thereof" → see X4 | cross-cutting precept | K Rα-Rζ | MET — extended to 7-agent at K close (added ι integrity-sweep) |
| **K** | "What happened earlier in the tranche, with the worktree ref errors?" → see X5 | cross-cutting precept | K W0 | MET — Hardened agent git clause + Worktree Isolation section |
| **K** | "Delineate any chronically deferred items and fold them into this new tranche." | recurring directive (re-issued at L) | K Rβ → 36-row ledger; K folded ≥ 2-deferral items | MET-IN-K — see L Rβ for L re-execution |
| **K** | "Delineate any deferred items and fold them into this new tranche." | recurring directive (re-issued at L) | K Rβ + Rγ; K residuals R1-R4 | MET-IN-K — see L Rβ |
| **K** | "Recap ALL of our prompts and requests hitherto and ensure they've been addressed." | recurring directive (re-issued at L) | K Rζ — 12-row catalogue | MET-IN-K — extended at L via THIS document |
| **K** | Lighthouse audit folded in (2026-05-08) → see X6 | tranche-specific | K WP | MET — `audit/K-lighthouse-2026-05-08.md` + 6 raw Lighthouse reports + WP wave (5 P1 fixes) |
| **K** | Speedtest W-tranche cross-walk (2026-05-08) → see X7 | tranche-specific | K.md ## Cross-repo coordination | MET — survey done; K W3 bounds reduced; K W4 ordering constraint added |
| **L** | "DEEPLY audit with 6 agents in parallel our original plan and waves thereof, alongside all changes made herein." | recurring (carried from K) | L Rα-Rζ | IN-PROGRESS (this lane is one of 6) |
| **L** | "Devise a path forward: audit the hitherto made changes and the remaining plan; recapitulate our original prompts, plans, and precepts." | tranche-specific | L plan synthesis from Rα-Rζ | PENDING (synthesis post-research) |
| **L** | "NO quick solutions, NO workarounds: idiomatic, gestalt approaches. This is a development product, architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable." | verbatim recurring (V2 + V4 + V5) | L binding constraint surface | BINDING — L MUST honor |
| **L** | "NO legacy code." | verbatim recurring (V3) | L binding constraint surface | BINDING — L MUST honor (WS Phase 2 root-barrel removal is the canonical fulfilment for v1.0) |
| **L** | "Delineate any chronically deferred items and fold them into this new tranche." | recurring (carried from K) | L Rβ | DELIVERED (`L/research/Rβ-chronic-deferrals.md` exists at 287 LOC) |
| **L** | "Delineate any deferred items and fold them into this new tranche." | recurring (carried from K) | L Rβ + Rγ | Rβ DELIVERED; Rγ residuals → waves attribution pending |
| **L** | "Recap ALL of our prompts and requests hitherto and ensure they've been addressed." | recurring (carried from K) | L Rζ (this document) | DELIVERED HERE |
| **L** | "Check for likely needs to be better modularized into sub-modules, and ensure cohesion with our other modules, potentially having an api dir, etc" | **L-NEW** | L Rε (modularization audit) | PENDING — Rε deliverable |

**Total directive rows**: 47.

---

## §D — L-NEW directives table (the 8 items captured in `L/findings.md`)

Each L-new directive maps to its addressing research lane.

| # | L-new directive (verbatim or close paraphrase) | Verification anchor | Status |
|---|---|---|---|
| L1 | "DEEPLY audit with 6 agents in parallel our original plan and waves thereof, alongside all changes made herein." | Rα (J/K retrospective) + Rβ (deferrals) + Rγ (residuals→waves) + Rδ (dispatch friction) + Rε (transpositions / modularization) + Rζ (prompt recap) — this dispatch IS the 6-agent fan-out | IN-PROGRESS (this lane = Rζ; siblings concurrent) |
| L2 | "Devise a path forward: audit the hitherto made changes and the remaining plan; recapitulate our original prompts, plans, and precepts." | Plan synthesis from Rα-Rζ deliverables (L.md authoring after research close) | PENDING |
| L3 | "NO quick solutions, NO workarounds, idiomatic gestalt, architectural transpositions." | Verbatim V2 + V4; binding-constraint surface (L `findings.md` §"Distillation" items 2, 3, 5) | BINDING — Rε must name ≥ 1 architectural transposition per substantive wave |
| L4 | "NO legacy code." | Verbatim V3; binding-constraint surface (L `findings.md` §"Distillation" item 4) | BINDING — WS Phase 2 root-barrel removal is the canonical L fulfilment (L is the v1.0 cohort) |
| L5 | "Delineate any chronically deferred items and fold them into this new tranche." | Rβ (`L/research/Rβ-chronic-deferrals.md` — 287 LOC, extends K Rβ's 36-row ledger to C → K + post-K) | DELIVERED |
| L6 | "Delineate any deferred items and fold them into this new tranche." | Rβ (chronic) + Rγ (residuals → waves) | Rβ DELIVERED; Rγ pending |
| L7 | "Recap ALL of our prompts and requests hitherto and ensure they've been addressed." | Rζ (this document — extends K Rζ 12-row C → J catalogue to 47-row C → L catalogue with L-NEW attribution) | DELIVERED HERE |
| L8 | "Check for likely needs to be better modularized into sub-modules, and ensure cohesion with our other modules, potentially having an api dir, etc" | Rε (modularization audit + sub-module + cohesion + `api/` dir consideration) | PENDING — Rε deliverable |

**L-NEW directive count**: 8.

---

## §E — Address-verification table (every C → L directive → addressed where → carried into L?)

This table verifies that no directive was lost between tranches. Each row: directive → addressed-at-tranche → carried-into-L (Y/N + why).

| Directive cluster | Originated | Addressed-at-tranche | Carried into L? | Why |
|---|---|---|---|---|
| **V1 — Indefatigability** | pre-C | every close from C onward | **YES** | L binding constraint #1; orchestrator MUST close W1-WN sequentially without yield |
| **V2 — NO quick solutions / NO workarounds / gestalt** | C | every tranche | **YES** | L binding constraint #2 + #3; carried verbatim into L `findings.md` |
| **V3 — NO legacy code** | C | C-K (each retired ≥ 1 legacy substrate) | **YES** | L binding constraint #4; **WS Phase 2 root-barrel removal is the canonical L act** |
| **V4 — Architectural transpositions** | C | every substantive wave from C onward | **YES** | L binding constraint #5; Rε MUST name ≥ 1 transposition per substantive wave |
| **V5 — Development product** | C | F (proof substrate), H (post-close audit), I (6-agent), J (strengthened 6-agent), K (7-agent + Lighthouse + bundle-budget) | **YES** | L binding constraint #6; L close MUST honor 7-agent canonical |
| **X1 — Master-only / backup-tags** | J | K (stayed on master) | **YES** | L stays on master; backups via tags only (per K W0 Hardened agent git clause) |
| **X2 — Read-the-precepts + begin** | J | K W0 precept submodule advance | implicit | L W0 should read precept submodule `d4ada55` at open |
| **X3 — J 18-finding inventory** | J | J W3-W6; verified at K Rζ §C | already-closed | Not re-litigated; finding-resolution stands |
| **X4 — 6-agent parallel audit** | K | K Rα-Rζ; L Rα-Rζ | **YES** | L re-issued this directive verbatim; the 6 research lanes ARE the dispatch |
| **X5 — Worktree friction redressed** | K | K W0 Hardened agent git clause | **YES** (forward-binding) | L MUST honor — Rδ surfaces dispatch-friction at L |
| **X6 — Lighthouse audit (2026-05-08)** | K (mid-tranche) | K WP (5 P1 fixes) | **N** | Already-closed; L can run a delta Lighthouse if scope warrants |
| **X7 — Speedtest W-tranche cross-walk** | K (mid-tranche) | K.md ## Cross-repo coordination | **YES (CROSS-REPO ACTIVE)** | Speedtest Y-tranche opens parallel with L; L Rδ must coordinate (per L `findings.md` §"Cross-repo state at L open" — 6 active Y-prefixed worktrees including `y-a3-glass-ui`) |
| **C invariants** (overfitting audit, Tailwind-first, @theme references primitives) | C | C-K | **YES** (binding canon) | All carry forward; overfitting audit runs at every tranche close |
| **D-II invariant** (one dock surface) | D-II | D-II onward | **YES** (binding canon) | Dock substrate is single-family forever |
| **E invariant** (one public import path per public symbol; subpath publication) | E | E onward | **YES + EVOLVING** | **WS Phase 1 split additive subpaths at K; Phase 2 root-barrel removal is the L canonical act** |
| **F invariants** (Aurora live config = live shader; bundle measurements; runtime evidence) | F | F onward | **YES** | F-G regression of bundle-budget gate; re-landed in K W4 Lane B |
| **H invariants** (wire-or-retire binary; no destructive git; post-close-before-FINAL; gestalt > preservation; per-wave commits) | H | H onward via precept submodule | **YES** (binding canon) | All carry forward; AGENT_DISPATCH_TEMPLATE.md non-negotiables |
| **I invariants** (chronic deferrals MUST resolve; 6-agent canonical; alias single-direction; tensions resolve or document; recovery-diary binary scrub; bundle soft-fail) | I | I onward via precept submodule + lint.yml | **YES** (binding canon) | All carry forward through K; lint.yml `recovery-diary-scrub` hard-fail + `bundle-budget` soft-fail |
| **K invariants** (K invariants 1-16) | K | K close | **YES** (binding canon) | All 16 honored at K close per K FINAL §"K close coherence"; ι integrity-sweep added |
| **L-new L1-L8** | L | L Rα-Rζ + L plan synthesis | IN-PROGRESS | Rζ delivered (this doc); Rβ delivered; Rα/Rγ/Rδ/Rε pending or concurrent |

---

## §F — Orphaned / partial directives at HEAD `35cae2c` requiring L wave attribution

**Truly orphaned (P0 — user directive not landed at HEAD)**: 0.

**Partial-addresses (P1 — landed but residual remains, named destination L)**:

1. **V3 — NO legacy code: WS Phase 2 (vueuse root-barrel removal)** — DEFERRED FROM K with "v1.0 breaking change cohort" rationale per K FINAL. Phase 1 only at HEAD; SCC trap PERSISTS per speedtest X.W3.c re-probe (matches glass-ui's audit byte-for-byte: +1.92 KB vs +2 KB; 1 modulepreload reappears). **L wave attribution**: WS Phase 2 wave — root-barrel removal of vueuse-bearing symbols (forms/composables/dark/composables/keyboard). **This is the canonical L-NEW directive 4 fulfilment.**

2. **Typing-publication gap (X.W3.c)** — vue-tsc resolves `dist/composables/{dark,keyboard}.d.ts` via a broken `'../src/...'` re-export. K.WS subpath adoption blocked at consumer side; speedtest's 5 consumer files could not migrate to subpaths via tsc. **L wave attribution**: WS Phase 2 wave must close this typing gap as prerequisite OR document as residual with consumer-side workaround pinned. (See L `findings.md` §"Cross-repo state at L open" 5th bullet.)

3. **K residuals R1-R4** (from K FINAL §"K residuals → L"):
   - R1 P1: StoryPager inner-tab overflow at 375 viewport (NEW layout finding, not W5's outer-container concern).
   - R2 P2: CLAUDE.md/README.md subpath enumeration polish.
   - R3 P2: 12 wave-spec status lines stale.
   - R4 P2: 4 `--surface-tint-{35,40,70}` rung gaps.
   - **L wave attribution**: R1 → L mobile-viewport polish wave; R2-R4 → L doc-drift + vocab-residue wave (paired with V3 cleanup).

4. **K cross-tranche debt** (12 entries declared in K.md):
   - Aurora chrome Option-A unification (deferred from K).
   - Demo-build deploy decision (Lighthouse cross-tranche).
   - 3 unused public composables audit.
   - P-tranche second-consumer fidelity (cross-repo).
   - DockShowcaseFrame 1-consumer (pre-existing K cross-tranche debt; deferred per substrate-without-consumer guard).
   - …(8 others — see K.md §Cross-tranche debt for full list).
   - **L wave attribution**: each cross-tranche debt entry must reach Rγ disposition → L wave OR formal RE-DEFER with named destination.

5. **L-NEW L8 — Modularization audit** (sub-modules + cohesion + `api/` dir consideration). **PENDING** at Rε deliverable; not yet started. **L wave attribution**: L Rε output drives a modularization wave (or absorption into WS Phase 2 if the modularization is co-resident with the root-barrel removal).

---

## §G — Recommendations for L wave attribution

| Item | Origin | Recommended L attribution |
|---|---|---|
| WS Phase 2 (root-barrel removal) | K WS Phase 1 deferral | L Headline Wave — v1.0 breaking change; canonical V3 / L4 fulfilment |
| Typing-publication gap (X.W3.c) | K WS DEGRADED | Prerequisite for WS Phase 2; absorb in WS Phase 2 wave |
| K R1 — StoryPager inner-tab 375vp overflow | K π audit | L mobile-viewport polish wave |
| K R2 — CLAUDE.md/README.md subpath enumeration | K γ audit | L doc-drift wave (pair with V3 cleanup wave) |
| K R3 — 12 wave-spec status lines stale | K γ audit | L doc-drift wave |
| K R4 — 4 `--surface-tint-{35,40,70}` rung gaps | K W3.A | L vocab-residue wave |
| K cross-tranche debt (12 entries) | K.md ## Cross-tranche debt | Rγ disposition → wave-attributes or formal RE-DEFER with named destination |
| L-NEW L8 — Modularization audit (sub-modules / api/ dir) | L `findings.md` | L Rε output → modularization wave (or co-resident with WS Phase 2 if Rε surfaces co-located decisions) |
| Continued "no destructive git" reinforcement | K LESSONS-LEARNED 2026-05-09 (#1 + #2) | L W0 — re-read precept submodule `d4ada55` at open; non-negotiable in every L agent dispatch |

---

## Authority

L opens against K close `35cae2c` (v0.9.3 tagged + pushed) with:

- **0 truly-orphaned** user directives (all directives addressed or named-deferred).
- **5 partial-addresses** carried into L (WS Phase 2 + typing-publication gap + 4 K residuals + 12 K cross-tranche debt entries + L-NEW L8 modularization) — each with named L wave attribution above.
- **47 total directive rows** catalogued (5 verbatim-recurring + 7 cross-cutting + 27 tranche-specific + 8 L-new).
- **8 L-NEW directives** (L `findings.md` 2026-05-11 cohort) — 2 DELIVERED (L5 Rβ + L7 Rζ); 1 IN-PROGRESS (L1 Rζ — this doc); 5 PENDING (L2 plan synthesis + L3/L4 binding constraints + L6 Rγ + L8 Rε).

The conversational integrity check returns **CLEAN with NAMED-PENDING items** carried forward to L planning. L plan synthesis (L.md authoring post-research) MUST fold the 5 partial-addresses into named waves AND honor the binding-constraint surface (V1-V5 verbatim + X1 / X4 / X5 / X7 cross-cutting).

**No mutating git operations** were performed by this lane — read-only walk of `docs/tranches/` only. No commits, no stashes, no merges, no resets, no branch operations.

**Deliverable path**: `/Users/mkbabb/Programming/glass-ui/docs/tranches/L/research/Rζ-prompt-recap.md`.
