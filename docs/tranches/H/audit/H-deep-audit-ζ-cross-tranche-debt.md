# H — Deep Audit Lane ζ: Cross-Tranche Debt + Chronic-Deferral Synthesis

**Date**: 2026-05-05.
**Owner**: read-only deep-audit Lane ζ (sixth parallel lane after H W6's α/β/γ/δ post-close pass).
**Scope**: every tranche A→H plan, FINAL.md, retro, residual ledger, audit deliverable; LESSONS-LEARNED.md; consumer-evidence corpus; design-language drift across tranches.
**Boundaries**: read-only; no source files modified; no destructive git commands run; no commits made.
**Method**: walked 8 tranches (C present; A/B retired pre-glass-ui; D/D-II/E/F/G/H all closed) plus G's 4-agent post-close audit + H's 5-agent (α/β/γ/δ+playwright) post-close audit. Every chronic-deferral row cites the originating residual file + the tranche(s) that deferred or absorbed it.

## 1. Preamble

H closed clean at `c5f196c` with 0 library-orphans, 77 G-artefact retirements, 4 binding-precept promotions from G's lessons, and 3 named-destination residuals (R-NEW-1/2/3). G closed honestly only after a 4-agent post-close pass surfaced an undeclared brittleness window + 11 idiomatic-gestalt violations. The five tranches between (D, D-II, E, F) closed cleanly but each leaked deferred items into the next — three have now bounced through 3+ tranches without resolution. This ledger names every residual since C, its current destination, and which are chronic.

Trajectory matters most for I planning: G expanded the design language (17 packages / 49 utilities / 44 tokens / 25 stories), H trimmed it back (77 retires, 10 export lines, 4 dirs); meanwhile parallel speedtest-tranche P shipped 4 *new* dirs (`instrument-chassis`, `glyph-face`, `disco-glyph`, `dock-group`) without H scope. Net package count is steady (40↔40), but the substrate is churning faster than it is converging.

## 2. Master Chronic-Deferral Inventory

The table below is the load-bearing deliverable. Bold items are chronically deferred (named in 2+ tranches without closure or with closure repudiated by a later audit).

| # | Item | First-named tranche | Subsequent tranches that re-deferred or accreted | Current named destination | Age | Why chronic? |
|---|---|---|---|---|---:|---|
| 1 | **`<HarmonicLevelGrid>` / Filmstrip primitive (`R4`)** | G FINAL §Misses (`G/audit/W6-residuals.md:30-34`) | G→H FINAL `R4` "consumer territory" (`H/H.md:88-92`, `H/FINAL.md:62`) | "out of scope" — no destination | 2 | Single-consumer (fourier-analysis only); fails ≥2 bar. Cited as deferred, never resolved — canonical "what happens when no consumer crosses the bar?". |
| 2 | **Blob Web Worker for state machine (`R5`)** | G/blob/SPEC.md §11.4 + `G/audit/W6-residuals.md:36-40` | G→H `R5` (`H/H.md:91`); H FINAL `R5` (`H/FINAL.md:63`) | locked deferred until 8+ multi-instance triggers | 2 | Trigger encoded but never fired. Wβ3 stress story exercises 8 instances; H W5 captured FPS 119.62 / 0 KB on M4 Max — trigger may already be unfindable. |
| 3 | **`--cartoon-shadow*` round-trip token aliases (`R-NEW-2` / G δ §4.4)** | G δ §4.4 (`G/audit/G-audit-δ-idiomatic-gestalt.md`) | H δ §13 ("CRITICAL-3"); H W6 deferred (`H/FINAL.md:70`) | "future docs-only or Tailwind-4-@theme cleanup pass" | 2+ | 8 tokens (`--cartoon-shadow{,-hover,-sm,-md,-lg}`, `--soft-shadow`, `--elevated-shadow`, `--modal-shadow`, `--card-shadow`, `--dock-shadow{,-collapsed}`) round-trip through `theme.css` with **zero non-self consumers**. Pre-G rename scaffolding; violates `feedback_no_backwards_compat`. |
| 4 | **Orphan `--accent-pink` token (G δ §4.2)** | G δ §4.2 ("retained against invariant 2") | H δ "still orphan at HEAD" (`H/audit/H-audit-δ-idiomatic-gestalt.md:33`); not in H FINAL named-residuals | unnamed | 2 | 3 def sites (`tokens.css:205,587` + `theme.css:113`); 0 consumers. Rescinded from G's W1 retirement list per "live consumer" claim, but H δ confirms 0 non-self hits. Falls between residual cracks. |
| 5 | **Tabs `provide`/`inject` refactor not delivered** | G δ §1.3 | H invariant 5 named target (`H/H.md:28`); H δ "CRITICAL-2: H committed; H did not ship" (`H/audit/H-audit-δ-idiomatic-gestalt.md:121-127`); H FINAL "δ audit was incorrect. Verified at HEAD: Tabs.vue:13 provides `glassTabs`" (`H/FINAL.md:110`) | **disputed** | 2 | H FINAL says delivered in G pass-2; H δ says not. Re-verify in I.W0 — if FINAL is right, closed; if δ is right, H's invariant 5 was violated. |
| 6 | **Cartoon recipe duplicated 4× across CVAs (G δ §1.2)** | G δ §1.2 | H δ "Still duplicated 4×; no shared `@utility cartoon-surface`" (`H/audit/H-audit-δ-idiomatic-gestalt.md:158`) | unnamed | 2 | Button / Select / Input / NumberField each re-assert `bg-[var(--cream-warm)] text-[var(--cream-foreground)] border-2 ... shadow-[var(--shadow-cartoon-accent)] hover:-translate-y-px`. 6+ token exprs × 4 CVAs. |
| 7 | **NumberField cartoon descendant-attr-selector outlier (G δ §1.4)** | G δ §1.4 | H δ "Still pushes via `[&_[data-slot=input]]:`" (`:31`) | unnamed | 2 | Only cartoon variant using descendant selectors; others restyle host. Move recipe onto NumberFieldInput, or amend convention. |
| 8 | **Card variant=cream + variant=paper duplicate with `<CreamSurface>` + `.paper-N`** | G δ §10.1, §10.2 (P1) | H δ "Not addressed; still three paths" (`:173`) | unnamed | 2 | Three paths to paper substrate: `<Card variant="paper">`, `.paper-N`, `<PaperBackdrop>`. Same shape for cream. |
| 9 | **R-NEW-1 — 41 pre-G stories need aesthetic uplift** | H W4 design-fidelity rerun | H W6 deferred per invariant 9 (`H/FINAL.md:69`) | "future tranche workstream — ~30 lines `<template>` per story" | 1 | ≈1230 lines across 41 files. Largest single docs-substrate uplift the library has ever named. |
| 10 | **R-NEW-3 — Stale D-tranche consumer-evidence Source paths** | H β §10 (`H/audit/H-audit-β-substrate-without-consumer.md:269,284,285`) | H W6 deferred (`H/FINAL.md:71`) | unnamed | 1 | 3 docs cite removed speedtest paths (`MetricPillCluster.vue`, `SpeedtestResults.vue`). Artefacts alive via alternates (`MetricGaugeCards.vue` + `Readout.vue`). |
| 11 | **Plugin extraction (Tailwind plugin)** | A/B aspiration; explicit defer in E (`E/E.md:170-173`) and F (`F/F.md:91`) | G/H out-of-scope (G/G.md:88; H/H.md:113) | "later tranche unspecified" | 4 | Most chronic *aspiration* in corpus. E retired F escape ledger; F said "after token correctness etc." (its own scope); G/H elected not to revisit. |
| 12 | **Bundle/CSS size floors as hard gates** | F invariant 12 (measurements only) | F/G/H all kept measurement-only (G/G.md:91, H/H.md:111) | unnamed (measurement-only) | 3 | Numbers in every FINAL (F: 392754 bytes; H: build 25.77s vs G's 4m+); never promoted to gate. |
| 13 | **Reduced-motion + a11y deeper sweep** | C FINAL §Future-tranche seeds "E — Reduced-motion + a11y" (`C/FINAL.md:142`) | E retired F escape ledger including a11y (`E/E.md:171-173`); F/G/H never picked up | unnamed | 5 | Five tranches dormant. Real gap if library aspires to consumer-grade a11y posture. |
| 14 | **101 library-orphan candidates from C.W0** | C W0 audit (`C/FINAL.md:121-134`) | D W0 triage; D W2 deleted/wired; G W0 reconciliation; H W1 retired residue | resolved (77 retires cumulative C/D/G/H) | 5 | Original substrate-without-consumer thesis. Converged via repeated audits — model for items 1-3. |
| 15 | **Storybook story-coverage residuals (`R6`)** | G FINAL `R6` (7 storyless artefacts) | H W1 retired all 7 (`H/FINAL.md:64`) | resolved | 1 | Clean closure via retire-on-no-adopter. |
| 16 | **DESIGN.md drift (R1, R7)** | G W0.β 47 drift rows; G W3 stash regression reverted W1.docs (1081→916) | G pass-2 partial (→1073); H W2 closed 57/57 (`H/FINAL.md:65`) | resolved | 2 | Closed honestly in H W2 after process-failure-induced regression in G. Now docs-only per invariant 7. |
| 17 | **Wβ stress runtime profile capture (R2)** | G FINAL `R2` | H W5 closed (`H/FINAL.md:60`) | resolved (FPS 119.62 / 0 KB/instance) | 2 | Pure consumer-CI deferral that H rolled back into library via `scripts/stress/` + CI workflow. |
| 18 | **`<Slider variant="glass-track">` + dock-keep-open round-trip (R3)** | G FINAL `R3` | H W3 closed (`H/FINAL.md:61`, `f3caa9f`) | resolved | 2 | Closed cleanly. See item 19 for the dual-authority side effect. |
| 19 | **Dual-authority on dock keep-open (DockPopover function-keys vs Slider sink)** | H δ CRITICAL-1 (`H/audit/H-audit-δ-idiomatic-gestalt.md:86-118`) | H FINAL "layered API, not a violation" (`H/FINAL.md:108-109`) | resolved-by-redefinition | 1 | δ recommended P0 absorb ("pick one authority"); H FINAL kept both. Clearest current "absorb-by-redefinition" debt. |
| 20 | **Stale wave-tag + recovery-diary leaks (`H.W*`, `G.W*`, `O.W*`, `R3` markers)** | G δ (8 wave-tag comments + diary leaks) | H δ §2 enumerated 23 leaks (`H/audit/H-audit-δ-idiomatic-gestalt.md:38-78`); H FINAL "scrubbed in W6" — only 4 of 23 actually scrubbed (`H/FINAL.md:112`) | partial — 4/23 actually scrubbed | 2 | 8 grouping comments in `src/index.ts`, 3 R3 markers in Slider.vue, version-history annotations, GLSL provenance — all still present. Cosmetic but contradicts H's "closed clean" claim. |
| 21 | **`scripts/ay-close.sh` cross-tranche script** | F W6 + E close used it (`F/F.md:67`, `E/FINAL.md:30`) | G/H did not invoke | possibly orphaned | 3 | F/E used as single-command close gate. G/H replaced with per-wave proof docs. Either retire script or revive. |

**Total chronic-deferral count**: 21 items tracked across A→H. **Chronically deferred (2+ tranches without closure)**: 11 (items 1–8, 11, 12, 13). **Resolved**: 6 (items 14–18; #20 partial). **Hot disputes**: 1 (item 5 — Tabs refactor; H FINAL vs H δ audit disagree).

### Top 5 oldest unresolved deferrals (the "what should fold into I" shortlist)

1. **Plugin extraction** — 4 tranches (E/F/G/H), aspirational; never picked up.
2. **Reduced-motion + a11y deeper sweep** — 5 tranches dormant since C.
3. **Bundle/CSS size floors as hard gates** — 3 tranches measurement-only.
4. **`<HarmonicLevelGrid>` / Filmstrip primitive** — 2 tranches; consumer-territory verdict; quietly chronic.
5. **`--cartoon-shadow*` round-trip aliases** — 2 tranches; flagged by both G δ and H δ; trivial to resolve (≈10-line edit).

## 3. Plan-invariant Trajectory by Tranche

Each tranche introduces invariants binding subsequent tranches. The table tracks what **first appeared** vs what **softened or got dropped**.

| Tranche | New binding invariants | Invariants softened/dropped from prior | Net direction |
|---|---|---|---|
| C | KISS; `@theme` references primitives; storybook chrome is library composition; no silent overfitting (audit at every close); workspace green at every wave boundary | (none — first glass-ui tranche post-A/B) | foundational |
| D | re-grounded audit; deletes propagate to `src/index.ts`; wires are Playwright-walked; consumer evidence names current code; agent budgets calibrated; zero façade components; routine cycle <10s wall | (none) | tightening |
| D-II | one dock surface (`GlassDock variant="rail"`); dock blur via `--glass-blur-dock`; W4 closes on actual `npm run iter` | retired duplicate `<Rail>` package; retired `useDockTransition`/`usePopupMutex`/dock-action-bar exports | **convergence** |
| E | one public import path per public symbol; root export = core allowlist; no permanent deprecation barrel; explicit subpaths for non-core; consumer builds are hard gates | retired `./styles/*` wildcard; retired `useInterval`; retired Tailwind plugin from E scope; retired byte-floor close gates; retired F escape ledger | **convergence** |
| F | no root compatibility shims; no unsafe HTML API unless tested; dock is one component family; default dock blur is reduced-tier; Tailwind v4 theme namespaces valid; one style authority per family; large components split only with consumer; Aurora config maps to live shader | reframed bundle/CSS as measurement-only | **convergence** |
| G | every new src/ artefact has ≥2 call-site bar (in-repo + cited consumer); Tailwind-first via `@theme` + `@utility`; one style authority per family; cream-as-public-noun; no new skeuomorphic shadow vocabulary; Storybook-as-oracle (no story = no API); DESIGN.md drift docs-only; W5 = proof-by-ledger no consumer-repo edits; runtime tokens stay under existing `/tokens` subpath; watercolor/blob/metaballs lift from value.js | (none retired; G ADDED 14 invariants — most-additive tranche) | **expansion** |
| H | wire-or-retire is binary (≥2 in-repo, OR consumer-evidence doc, OR retire); no destructive git as agent recovery; post-close audit BEFORE FINAL.md is final; idiomatic gestalt > artefact preservation; consumer-evidence docs are first-class; DESIGN.md is documentation-of-source not specification; stress profile is hard gate not deferral; **no new public components or composables**; per-wave commits at wave close | (G's 14 invariants all preserved; H added 10 process invariants on top) | **convergence + process hardening** |

**Trajectory reading**: every tranche from C through F was strictly tightening (each retired more than it added in invariant count). G is the single inflection point — 14 invariants added, 0 retired, the only *expansion* tranche. H corrected by adding 10 *process* invariants (not vocabulary) and retiring 77 G artefacts. Net: G expanded language; H tightened process; design language stabilized.

**Softening watch-list**:
- G invariant 11's "five silently-broken consumer references" was framed as "resolved by W2 or named in W5 ledger" — most resolved, but `gold-shimmer` text class was renamed to `text-shimmer-gold` (a clean break) and `active-scale`/`disabled-base` was explicitly NOT re-added (consumer-side ledger). Future tranche may need to reaffirm.
- C invariant 5 ("no silent overfitting; audit runs at every tranche close") is the most-cited durable invariant. G's δ audit + H's β audit + this ζ audit all derive from it.
- E invariant 9 ("Bundle and CSS deltas are recorded as measurements") softened across F→G→H without ever promoting to gates (item 12).

## 4. Brittleness-Window Register

Every declared or de-facto window across A→H closes:

| Tranche | Declared? | What was suspended | Restored? | Status today |
|---|---|---|---|---|
| C | none declared | n/a | n/a | clean |
| D | none declared (W4 spec exceeded bounds → triggered D-II split, not a window) | n/a | n/a | resolved via D-II |
| D-II | none declared | n/a | n/a | clean |
| E | YES — W1→W2 (consumer imports during package-export cutover) | `scripts/validate-consumers.sh` may fail; consumer source may transiently reference retired paths | YES at W2 close | clean |
| F | YES — within active wave only | local story routes during refactor; consumer static policy during migration; style compile probes during W4 | YES at each wave close | clean |
| G | **DECLARED LATE** (de facto window during W3) | W3 stash regression silently reverted W1+W2 orchestrator-direct edits to 10 files | YES across two passes (G pass-1 partial; G pass-2 honest at G-FINAL-II) | **closed-but-required-second-FINAL** |
| H | none declared (none opened) | n/a | n/a | clean |

**Open brittleness windows count**: 0. **Closed-but-required-restoration**: 1 (G's de facto window). **Silent-undeclared windows**: 0 currently — but G's incident is the precept origin for "an undeclared brittleness window is a hard-gate violation" (the new SPEC.md §Brittleness clause). H γ audit explicitly verified none for H.

## 5. Substrate Growth Trajectory by Family

Counts derived from FINAL.md ledgers + audit deliverables.

| Family | C close | D close | E close | F close | G close | H close | I trajectory? |
|---|---:|---:|---:|---:|---:|---:|---|
| Custom packages (`src/components/custom/`) | ≈26 | ≈30 | 30 | 30 | 44 (+14 net G) | **40** (-4: retired svg-filters/keyboard-shortcuts-modal/tier-badge/like-button) | steady |
| UI packages (`src/components/ui/`) | 39 | 39 | 39 | 39 | 39 | 39 | steady |
| Composables (top-level + grouped) | 9 groups | 8 groups | 8 groups | 8 groups | 9 groups (+blob) | **8 groups** (-color, -monaco; +retained blob) | steady |
| CVA branches | baseline | +0 | +0 | +0 | **+14** (cartoon, rainbow, pill, paper, cream, glass-track planned, etc.) | -5 retired + 1 added (Slider glass-track) | net **+10** since C |
| Tokens (G additions specifically) | n/a | n/a | n/a | n/a | +44 (G W1) | -23 (H W1) → +21 net | **net +21** |
| Utility classes (G additions) | baseline | -8 (D W2 deletes) | -1 (golden-shimmer kf) | -1 (cartoon-hover) | **+49** (G W2) | -31 (H W1) → +18 net | **net +17** since C |
| Stories | 25→30 | +6 | +1 | +0 | **+25** (G W4) | +1 (slider-glass-track) | net 60+ |
| Public exports in `src/index.ts` | wide | narrowed | **core allowlist** | trimmed (dock subpath) | +5 runtime tokens, +14 packages | -10 (4 packages, 2 composable groups, 4 runtime helpers) | trimming |

**Net substrate trajectory**: **convergence is real but slow**.
- Custom packages: +14 (G) − 4 (H) = **+10 net** since F.
- CVAs: +14 (G) − 5 (H) − 1 net (H W3 added 1) = **+8 net**.
- Tokens: +44 (G) − 23 (H) = **+21 net**.
- Utilities: +49 (G) − 31 (H) = **+18 net**.

The library is **bigger than F** by every count, but **smaller than G** on every count. H delivered exactly what G's δ audit demanded: retire what doesn't have ≥2 consumers. The *direction* of change is now clearly inward.

**However**: the `o-w2_7-instrument-chassis` branch (current HEAD) shows 4 *new* dirs (`instrument-chassis`, `glyph-face`, `disco-glyph`, `dock-group`) added during P-tranche speedtest work parallel to H. The `e2ad404 docs(DESIGN): reconcile post-P glass-ui surface` interlude commit confirmed they exist as documented surface. This is **silent expansion outside any glass-ui tranche** — they came in via cross-repo work without owning a glass-ui-side tranche scope. Tranche I should explicitly own these (wire-or-retire each per H invariant 2's bar) or own the precept gap that allows external-tranche surface to land mid-window.

## 6. Lessons-Learned Promotion Analysis

`docs/precepts/instructions/LESSONS-LEARNED.md` carries 11 entries (verified at HEAD `cc57c91`):

| # | Date | Lesson | Source repo | Cross-repo applicability | Promoted to binding precept? |
|---|---|---|---|---|---|
| 1 | 2026-04-29 | Substrate Without Consumer Is Not Progress | bbnf-lang AZ-I/AZ-II + speedtest + glass-ui | universal | YES (every tranche cites it) |
| 2 | 2026-04-29 | Ceremonial Waves Hide Shared Activation Paths | bbnf-lang AZ-I | universal | YES (D/E/F all reference) |
| 3 | 2026-04-29 | Research Needs Challenge Before Synthesis | bbnf-lang + speedtest | universal | YES |
| 4 | 2026-04-29 | Docs Are Part Of Wave Close | shared SPEC.md | universal | YES (every wave updates docs) |
| 5 | 2026-04-29 | Watchdogs Must Be Independent | config repo | universal | implicitly held |
| 6 | 2026-04-29 | One Writer Per Side Effect | config repo | universal | implicitly held |
| 7 | 2026-04-29 | Contracts Need Producer And Consumer Gates | config repo | universal | YES (E.W2 enforces both sides) |
| 8 | 2026-04-29 | Runtime Truth Beats Source Claims | config repo | universal | YES (Playwright walks, not greps) |
| 9 | 2026-04-29 | Parallel Agent Budget Is A Resource | config repo | universal | YES (max 10 agents) |
| **10** | **2026-05-04** | **Never Use Git Stash As Agent Recovery** | **glass-ui G W3** | **universal** | **YES** (H added clause to AGENT_DISPATCH_TEMPLATE.md) |
| **11** | **2026-05-04** | **Run Typecheck Earlier In Agent Workflows** | **glass-ui G W3 + Wβ1** | **universal** | **YES** |
| **12** | **2026-05-04** | **Orchestrator Commits At Wave Close** | **glass-ui G** | **universal** | **YES** (H invariant 10) |
| **13** | **2026-05-04** | **Post-Close Audit Catches Close-Ceremony Falsehoods** | **glass-ui G post-close** | **universal** | **YES** (H invariant 4 + 4-agent canonical) |

**Tally**: 13 entries. **9 cross-repo** (config + bbnf-lang sources). **4 glass-ui-specific incidents promoted to cross-repo** (entries 10–13, all from G). All 4 glass-ui lessons describe orchestration failure modes that **can recur in any agent-driven tranche regardless of repo** — and the 2026-05-04 batch is the most recent + most binding tranche-process update in the corpus.

The promotion ratio is healthy: glass-ui contributed 31% (4 of 13) of the lessons-learned; given glass-ui has been the most agent-heavy tranche workstream, this is the expected rate.

## 7. Cross-Tranche Scope Creep Findings

Examining each tranche for "scope grew uncontrollably and got bandaged with out-of-scope flags":

| Tranche | Scope creep events | How handled? | Verdict |
|---|---|---|---|
| C | C.W1.C utility migration (60 sites instead of 1); C.W3.D aurora WIP (14 files vs "5") | Bundled into wave commits per scope-reveal protocol; user WIP attributed to the appropriate sub-phase | **clean** |
| D | W4 exceeded its declared tooling bounds — triggered D-II split | Named D-II honestly; closed it; opened E only after D-II close | **clean (model behavior)** |
| D-II | (resolution lane only) | n/a | **clean** |
| E | W3 measurement scope re-included tooling residuals | Routed to W4 + a final sweep | **clean** |
| F | W6 audit lanes surfaced 11 fixes (allowlist self-reference, dock internal exports, Aurora `strokeAmount`, `uRes` shader, profiler cleanup, etc.) | All folded into close commit before FINAL | **clean** |
| G | **multiple W1/W2/W3 silent narrowings** — DESIGN.md drift, dead `useRafLoop`, paper-grain inlining, Tabs refactor, ResizeObserver | G FINAL.md (v1) declared clean close while audit lanes surfaced 17 violations; G-FINAL-II.md was forced as a second honest close | **G shipped a falsely-clean close; honest re-close required** |
| H | W1 surfaced 5 scope reveals (SvgFilters absorb, Badge color KEEP, keepOpenWhile retire→W3 amendment, confetti-fall keyframe, flourishes.vue dangling refs); W4 surfaced 41 NEEDS-REPAIR stories; W5 stress-baseline numbers required reframing | All routed via scope-reveal protocol; R-NEW-1, R-NEW-2, R-NEW-3 opened with named destinations; per-wave commits prevented compounded regression | **clean** |

**Single bad-creep instance**: G. The G-FINAL-II remediation pass (which became the lessons-learned source for the 4 process precepts) is the canonical case study of "out-of-scope flag becomes a falsehood that the next tranche has to unwind". H's invariant 4 ("post-close audit BEFORE FINAL is final") is the prophylactic.

## 8. Architectural Tensions Still Unresolved

Three live tensions where the design language has not converged:

### Tension 1 — Substrate-tier hierarchy: glass vs paper vs cream

**Glass tier** (G invariant 5 "Paper tier and glass tier are siblings, not overlap"): default-visible substrate; uses `--glass-blur-*`, `backdrop-filter`, opacity tokens.
**Paper tier** (G invariant 5): print-feel substrate; SVG turbulence noise; no blur; uses `--paper-grain-texture`, `--shadow-cartoon-*`.
**Cream substrate** (G invariant 6 "Cream is the existing identity made nameable"): warm-cream identity for type contrast.

But:
- `<Card variant="cream">` AND `<Card variant="paper">` both exist (G W3) → 2 paths.
- `.cream-surface` utility AND `<CreamSurface>` component → 2 paths.
- `.paper-{1..4}` utilities AND `<Card variant="paper">` AND `<PaperBackdrop>` → 3 paths.

**Resolution candidate**: pick the wrapper-component path as canonical; deprecate Card variants and inline `.paper-N` utilities into the wrapper. Or pick the utility-class path; deprecate the wrappers. Either eliminates one duplicated authority.

### Tension 2 — "Bold-maximalist" vs "Refined-minimalist" stories

H W4's design-fidelity rerun returned 41 NEEDS-REPAIR for pre-G stories. This is a **commitment tension**: G shipped 25 new stories at "bold-maximalist" level; the pre-G stories sit at "specimen-sheet quiet". The library shipped two visual languages side-by-side in the same demo.

R-NEW-1 names the destination but defers the work. **Without resolution**, `npm run dev` shows newer-story routes as polished hero-pages while older-story routes look like primitive specimen sheets — the library's frontend-fidelity gate (G invariant 9) doesn't apply to grandfathered stories.

**Resolution candidate**: tranche I either commits to the uplift (≈1230 LoC), or formally retires the design-fidelity gate from older stories with a documented exception, or splits demos into "specimens" vs "showcases" buckets where different fidelity bars apply.

### Tension 3 — F's "instrument-cluster" axis vs G's "design-language vocabulary expansion"

F set up `<MetricBadge>`, `<StatusDot>`, dock as one component family. G expanded with `<MathSurface>`, `<DisplayHero>`, `<FlourishDivider>`, etc. — semantically different primitives.

Then **outside any tranche**, the speedtest P-tranche shipped `<InstrumentChassis>`, `<GlyphFace>`, `<DiscoGlyph>`, `<DockGroup>` directly into glass-ui via cross-repo work. The `e2ad404` interlude commit synced DESIGN.md to acknowledge them. These four packages collectively reintroduce an "instrument-cluster" axis (chassis + bezel + glyph + dock-group pill row) that F started but G didn't extend.

So glass-ui now ships:
- F's instrument-cluster axis (MetricBadge / StatusDot / Pulse + new InstrumentChassis / DockGroup / GlyphFace / DiscoGlyph)
- G's design-language axis (CreamSurface / DisplayHero / FlourishDivider / MathSurface / Blob / IconStamp)

These are **conceptually distinct** but **co-resident** in `custom/`. There's no documented axis ownership; the CLAUDE.md custom-package list mixes them alphabetically.

**Resolution candidate**: tranche I either documents the two axes explicitly in DESIGN.md + CLAUDE.md (two named families, each with its own design POV section), or merges them under a single broader rubric. Without resolution, future agents will struggle to answer "which axis does my new primitive belong to?"

## 9. Trajectory Verdict

After C → D → D-II → E → F → G → H, the trajectory is:

> **Convergence-resumed-after-G-expansion-pulse-with-process-hardened-discipline**

The shape:
1. **C-D-D-II-E-F**: 5 tranches of monotonic tightening — every closure narrowed the public surface, retired more than it added, hardened a contract.
2. **G**: single expansion pulse — 14 invariants added, 17 packages, 49 utilities, 44 tokens, 25 stories. Required a forced second-close (G-FINAL-II) when post-close audit surfaced 11 violations.
3. **H**: convergence resumed — 77 retires, 4 process precepts, 0 library-orphans, audit pattern canonized.

The library is **not in steady-state**. P-tranche cross-repo additions (4 dirs, 21 DESIGN.md lines) landed silently *during* H. Three architectural tensions remain unresolved (paper/glass/cream hierarchy; story-fidelity bifurcation; instrument-cluster vs design-language axes). Eight chronic deferrals are visible in the inventory.

The library is **also not still expanding**. G was the single expansion event; H proved the library can retract without breaking. CVA branches went from 14 to 13. Tokens net +21 since C, but H showed +44 → -23 retire works. The substrate is *settling*.

**Best-fit verdict**: **converging design system in the second-half of expansion-then-trim cycle, with one open expansion source (cross-repo P-tranche surface) needing tranche-I governance**.

If tranche I closes the chronic deferrals + resolves the 3 architectural tensions + adopts an explicit "P-style cross-repo additions need glass-ui-side wire-or-retire pass" precept, the library reaches **mature** by tranche I close.

If tranche I instead opens a new expansion (e.g., aurora visual expansion, plugin extraction, mathematical-engine primitives), the cycle restarts. Given user's explicit direction ("new tranche with all items audited and chronically deferred items folded in"), I should be a **convergence-and-housekeeping** tranche.

## 10. Recommendations for Tranche I

### Top 5 chronic deferrals to fold in (priority order)

1. **`--cartoon-shadow*` round-trip aliases (item 3)** — trivial 10-line edit, named in 2 audits. P0 — clears the easiest invariant violation.
2. **Orphan `--accent-pink` token (item 4)** — 3 sites, 0 consumers, against G invariant 2. P0 — paired with #1.
3. **Tabs `provide`/`inject` refactor verification (item 5)** — H FINAL says delivered, H δ says not. P0 — re-verify once; either close or open as named residual.
4. **Cartoon recipe duplicated 4× across CVAs (item 6)** — `@utility cartoon-surface` collapses 4 CVAs to 1 source-of-truth. P1 — clears 4× duplicate authority in one wave.
5. **R-NEW-1 41 stories aesthetic uplift (item 9)** — largest single docs-substrate uplift in the corpus; no architecture decisions, only `<template>` additions. P1 — book-end of H's design-fidelity gate. Either commit to it or formally retire the gate scope. Best as a tranche-I "stories wave" with single-agent-per-N-files dispatch.

Plus: **address the 4 P-tranche silent additions** (`instrument-chassis`, `glyph-face`, `disco-glyph`, `dock-group`) by running H's wire-or-retire bar against each and documenting the axis they belong to in DESIGN.md.

### Top 3 architectural tensions to resolve

1. **Substrate-tier hierarchy (Tension 1)** — pick a single canonical path for paper/cream/glass. Either wrapper-component-as-canonical (retire `<Card variant="paper">` + inline utilities) or utility-as-canonical (retire `<CreamSurface>` + `<PaperBackdrop>`). Single-wave decision.
2. **Story-fidelity bifurcation (Tension 2)** — either commit to R-NEW-1 (1230 LoC docs-substrate uplift across 41 files) OR formally split demos into "specimens" / "showcases" with different fidelity bars. The current ambiguity is itself the problem.
3. **F instrument-cluster axis vs G design-language axis (Tension 3)** — explicit DESIGN.md section naming the two families and which primitives belong to which. Trivial doc edit, large clarity gain. This is the lowest-cost / highest-value tension to resolve.

### Process recommendations

- Open tranche I W0 with **explicit governance for cross-repo silent additions**: any non-glass-ui tranche that adds a package to `src/components/custom/` triggers a glass-ui-side W0 entry that wire-or-retires it. The 4 P-tranche packages set the precedent; without governance, more will land silently.
- Run the 6-lane post-close audit (α/β/γ/δ + this ζ + the playwright-MCP audit pattern) at tranche I close. Six lanes is the new canonical post-close pattern.
- Formally retire `scripts/ay-close.sh` (item 21) or revive it as the I-close gate. Three tranches without invocation is enough.

## 11. Authority

Read-only deep audit. No source files modified. No commits made. No destructive git commands (`git stash`, `git stash pop`, `git checkout HEAD --`, `git reset`, `git push --force`) run during this lane. Every chronic-deferral row cites its origin tranche/file/path; every count cites the deliverable that produced it. Disagreements between docs (e.g., H FINAL vs H δ on Tabs refactor) are flagged for tranche-I W0 to re-verify rather than papered over.
