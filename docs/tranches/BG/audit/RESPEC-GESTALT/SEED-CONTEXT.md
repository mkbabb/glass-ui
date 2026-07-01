# RESPEC-GESTALT — the first-principles quality audit (audit #3 of the BG+BH series)

**Date:** 2026-07-01 · **Branch:** `tranche/BG` · **HEAD:** `976dc890` (both prior audits folded) · **Base:** v4.2.0.

## The mandate (verbatim user critique)

> "The last several tranches have been disastrous insofar as feature development (missing obvious issues,
> mis-consideration of gestalt cohesion, over contrivance, poor encapsulation, lacking of elegance)."
>
> "DEEPLY audit with 32 agents in parallel our original plan and waves thereof, alongside all changes made herein.
> Recap our latest tranche, and then the last several — what's been done hitherto, what remains, and what has been
> deferred. Devise a path forward: audit the hitherto made changes and the remaining plan; recapitulate our original
> prompts, plans, and precepts: NO quick solutions, NO workarounds: idiomatic, gestalt approaches. This is a
> development product, architectural transpositions in the sake of elegance, simplicity, and performance above all
> are both necessary and desirable. NO legacy code. Delineate any chronically deferred items and fold them into this
> new tranche. Delineate any deferred items and fold them into this tranche. Recap ALL of our prompts and requests
> hitherto and ensure they've been addressed. This is NOT an implementation phase. Tranche development only.
> From first principles. This is a long horizon multi-tranche refinement. Prune, augment, and add to the waves
> hereof, pursuant to precepts/."

This differs from the two prior audits in KIND, not just scope:
- **RESPEC/** (audit #1) was a CORRECTNESS audit — was the built work done properly (verdict: ~93% yes; the
  close-machine was the broken part).
- **RESPEC-COHERENCE/** (audit #2) was a WIRING audit — do the wave specs cohere cross-wave/cross-page/cross-tranche
  (verdict: yes after 13 cluster fixes).
- **RESPEC-GESTALT/** (this, audit #3) is a QUALITY/DESIGN audit — is the work and the plan GOOD: gestalt-cohesive,
  elegantly encapsulated, un-contrived, idiomatic, performant. The five named critique axes:
  1. **Missing obvious issues** — defects a designer would see instantly that the wave/gate machine missed.
  2. **Gestalt cohesion** — does the system read as ONE designed product, or N locally-correct patches.
  3. **Over-contrivance** — speculative axes, ceremony gates (360 proof scripts at HEAD), single-consumer
     primitives, wave-granularity-as-disease (151 rows).
  4. **Poor encapsulation** — leaky component APIs, cross-boundary reaches, the 76-entry subpath sprawl.
  5. **Lacking elegance** — accreted CSS/token layering, indirection depth, inelegant mechanism where a simpler
     architectural transposition exists.

## Ground numbers (verified on disk 2026-07-01)

- Cursor `docs/tranches/BG/execution/EXECUTION-PROGRESS.md`: ~151 wave rows — 26 DONE, ~125 PENDING.
- `demo/stories/`: 156 `.vue` pages. `scripts/proof-*.mjs`: **360** gate scripts.
- Landed on `tranche/BG` since v4.2.0: Stage-0, 3 live-defect fixes (`07c6e6ec`/`e40e5095`/`8947288a`),
  the C18 capture harness (`d4a`…), BH B1-W2/W3 kf-peer `^5.0.0` bump (`0d6b9f8a`/`ba23c086`), 2 audit folds.

## Tranche lineage (the "last several")

BA→4.0.0 (gestalt-bar reset, 6 re-opened rounds) · BB (64 waves, liquid-glass band + WebGPU substrate) ·
BC→4.1.0 (96 waves, the BB-disease cure) · BD→4.2.0 (the UNION tranche: BC/BD/BE/BF + ~100 sessions unioned;
iOS-27 liquid-dock spec; Pass-E 118-page audit; greenfield edicts: 8 laws, cartoon-technicolor, aristotelian,
iOS-27 canon) · BE/BF (partially executed, folded into BD) · BG+BH (current, joint 5.0.0).

## The EXISTING corpus (build on it — do NOT re-derive)

- `docs/tranches/BG/audit/` A-lenses (component-families, gate-system, glass-token-arch, motion-arch, demo-arch,
  dock-arch, viz-census, deadcode-legacy, splits, colocation, a11y-perf), D-lenses (defects), P-lenses —
  **especially `P-chronic-deferred.md`, `P-historical-coverage.md`, `P-firstprinciples-gaps.md`,
  `P-design-adherence.md`, `P-bd-coverage.md`, `P-be-bf-fold.md`**.
- `docs/tranches/BG/audit/RESPEC/AMENDED-WAVE-PLAN.md` + `RESPEC-COHERENCE/AMENDED-COHERENCE-PLAN.md` +
  `docs/tranches/BH/audit/RESPEC-COHERENCE/AMENDED-BH-COHERENCE-PLAN.md` — the three folded plans.
- `docs/tranches/BD/viz/page-deep/PASS-E.md` + `docs/tranches/BD/viz/page-audit/` — the 118-page deep audit.
- `docs/tranches/BH/research/SYNTHESIS-PASS{1,2,3}.md` + 8 lane reports + 20 prototypes — the 91%-converged BH corpus.
- `docs/precepts/` (git SUBMODULE — read-only; never write into it).

## Deliverables (this audit's outputs, all under `docs/tranches/BG/audit/RESPEC-GESTALT/`)

1. `TRANCHE-HISTORY-RECAP.md` — the last-several-tranches recap: done / remains / deferred, per tranche.
2. `DEFERRAL-LEDGER.md` — every chronically-deferred + recently-deferred item, each with a disposition
   (BUILD-fold-into-BG/BH · RETIRE-with-rationale · KEEP-BOOKED-with-honest-trigger). Folded items become waves.
3. `PROMPT-COVERAGE.md` — ALL user prompts/mandates hitherto → where addressed → verified? → gaps (gaps become waves).
4. `AMENDED-GESTALT-PLAN.md` — the developed amendment: waves PRUNED (granularity/ceremony), waves MERGED
   (gestalt consolidation), waves AMENDED (idiomatic transposition over patch), waves ADDED (fold-ins from 1-3).
   Same develop-ready bar as the prior two audits. Folded into the live cursor + build-map + BH PLAN at the end.

## Standing directives (user, 2026-07-01 — binding on the developed plan)

- **This tranche set is the PERFECTION of the last set.** The bar for every wave is the glass-ui GESTALT — not
  local correctness. A wave that lands a mechanism without advancing the whole-product gestalt is mis-shaped.
- **Frontend-design routing:** any and all frontend DESIGN work (component/page visual authoring, gestalt
  decisions, design iteration) is done by FABLE instances — the session core model, main-loop or Fable subagents —
  via the frontend design plugin MCP (`DesignSync` + the `/design-sync` skill: glass-ui surfaces sync to a
  claude.ai/design design-system project for card-based gestalt review, incrementally, never wholesale-replace).
  Opus/sonnet fan-out remains for mechanical audit/census/build work only. The AMENDED plan must encode this
  per-wave: every VISUAL wave names its Fable design arm + its DesignSync review surface.

## Process discipline (hard-won, binding)

- **Batch-3 concurrency ALWAYS** (the rate wall is real). ONE workflow at a time.
- **Every dereferenced `agent()` result null-guarded** (session-limit deaths return null).
- **Pass numbers are literal `const PASS = N` in each script body** — never threaded via `args` (the clobber bug).
- **`git diff --stat` prior-pass files before committing a new pass.**
- **Model routing:** orchestration/design/synthesis = the session core model; workflow fan-out = `opus` (deep
  lenses) / `sonnet` (mechanical censuses). Never let fan-out inherit the session model.
- Audit agents are READ-MOSTLY: each writes ONLY its one assigned report file under `RESPEC-GESTALT/pass-N/`.
- **NOT an implementation phase** — no src/demo/scripts edits, no worktrees, no prototype builds. Spec-augmented
  design proposals only.
- Evidence discipline: verify ON DISK (read files, run read-only git/grep), cite `file:line`; distrust doc claims;
  a doc that contradicts disk is itself a finding.

## FENCE (ABSOLUTE)

Operate ONLY under `/Users/mkbabb/Programming/glass-ui`. NEVER mv/rm/move/touch any path outside it — ESPECIALLY no
sibling repo under `~/Programming` (the catastrophe). No git write commands (add/commit/checkout/reset) — the
orchestrator owns the index. `docs/precepts/` is a submodule: read-only.

## Design language (unchanged, non-negotiable)

Liquid-glass / iOS-26-27 transmissive material; warm-everywhere / no-gray (warm-amber, chroma floor);
W-DARK-MATERIAL luminous-dark (never charcoal); compositor-only motion + PRM-carved; liquid-weight UNIVERSAL
(inertia/weight/bounce on ALL motion); spring-iff-spatial / bezier-iff-effect; Tailwind v4 token-first; clean
breaks, NO legacy aliases; ≥2-consumer bar; presets-in-consumers.
