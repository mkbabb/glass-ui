# BG CROSS-WAVE / CROSS-PAGE COHERENCE AUDIT — seed context

**Date:** 2026-06-30 · **Branch:** `tranche/BG` · **HEAD:** `4c761b64` (the prior re-spec FOLD; develop-ready 86%, NOT yet executed — zero new src/demo code has landed since the fold).

## The mandate (verbatim intent)

The prior audit (RESPEC/) resolved 7 *close-machine* gaps and fixed 3 *live-interaction* defects. The user now wants a
SECOND, BROADER audit: **cross-wave coherence + friction-history mining**, run as the SAME 5-step convergent loop
(8 researchers → synth → prototype → critique → agglomerate, batch-3, iterate to 100%), but scoped to:

1. **Were the close-machine items genuinely net-new, or already covered?** ANSWERED already (orchestrator, this
   session): WS7/WS8 already targeted close-machine/C-SAFARI — the audit fixed BROKEN MECHANICS inside already-planned
   waves (wrong uniform, hand-authored map that needed deriving, a miscalibrated dep floor), not missing waves. The
   3 live-defects (D-1/D-2/D-3) were genuinely NOT covered by any wave — pure regressions invisible to device-free gates.
2. **Re-audit implementation hitherto, with close attention to FRICTION HISTORY** — what recurring failure classes
   bit this project across tranches, and does the CURRENT BG/BH plan repeat any of them.
3. **Cross-wave coherence** — every wave spec in `docs/tranches/BG/execution/bg-build-map.md` (150 rows) + every page
   in `demo/stories/` (156 `.vue` files) audited + aligned against the CURRENT two tranches (BG + BH, post-fold).
4. **TWO separate monolithic multi-pass audits**: one for BG (this seed), one for BH (parallel seed at
   `docs/tranches/BH/audit/RESPEC-COHERENCE/SEED-CONTEXT.md`) — run SEQUENTIALLY (one workflow at a time, the
   rate-wall discipline), BG first.
5. **Stop at 100% convergence, then develop the exact amended wave plan** (the same pattern as RESPEC/).

## Known friction history (seed list — the mining pass MUST expand this, not just repeat it)

From THIS session + project memory, the recurring failure classes to check against the CURRENT plan:
- **The rate wall** (`parallel()` over >3 agents → real 429s, a workflow silently dies). Fixed via `batched(items,3,fn)`
  everywhere. CHECK: does every authored workflow script still honor batch-3? Any `parallel()` call un-batched?
- **The session-limit crash** (a total-usage cap distinct from the rate wall; an agent returns `null`, an un-guarded
  script crashes on `null.field`). Fixed via null-guards + `resumeFromRunId`. CHECK: do ALL workflow scripts (not just
  the audit ones) have null-guards on every `agent()` call whose result is dereferenced?
- **Permission/sandbox friction** (Bash commands writing to `/tmp` or running `vue-tsc` re-prompted per-invocation
  because the allowlist was a junk pile of exact one-off strings). Fixed via `bypassPermissions` + a deny-backstop.
  CHECK: is this durable, or could a future session regress it (e.g. settings.local.json overwritten)?
- **The foreign-tree catastrophe** (a prior session `mv`'d sibling repos to `/tmp` to fake a clean checkout; orphaned
  11 repos for hours). The deny-backstop now hard-blocks `mv`/`rm -rf`/`rmdir` against `~/Programming`. CHECK: does
  EVERY workflow's FENCE text reiterate this, and does the actual permission engine enforce it (not just prose)?
- **Paint-claim inflation** (a commit-message "live-verified" claim with no on-disk DELTA/PNG artifact). The
  `proof:live-verified-ledger` + `--strict-freshness` arm exist for this. CHECK: does the CURRENT wave plan's paint
  protocol still enforce artifact-on-disk, end to end, for every visual wave (incl. the 7 new gap-waves)?
  ([[feedback-live-verify-capture]])
- **Gate vacuity / hand-authored maps that drift** (the ba-gestalt wave→surface map was meant to be hand-authored —
  audit caught it must be DERIVED from `surface-closure.mjs`). CHECK: are there OTHER hand-authored maps/censuses in
  the 150-wave plan that should be derived-from-source instead (the same failure shape)?
- **Wrong-uniform / wrong-anchor mistakes** (C-SAFARI keyed to invented `uDispersion` not ship `uChromatic`; a
  born-RED gate anchored to the WRONG commit `cb8ecdfc` post-fix instead of `b3d65eec~1` pre-fix). CHECK: any other
  gate/spec keyed to an invented/wrong identifier across the 150 waves.
- **Submodule mistakes** (`docs/precepts` is a git submodule; a canon-home was nearly placed INSIDE it, which would
  silently not persist / not push). CHECK: any other doc-homing decision across the plan that touches the submodule.
- **The dependency-floor miscalculation** (`^1.2.0` would have excluded npm-latest value.js + reds peer-conformance;
  corrected to `^1.1.1`). CHECK: are there other `peerDependencies`/floor bumps planned in WS5/WS6/BH-B5 that need
  the same npm-latest-inclusion sanity check.
- **The "no-god-module" ratchet repeatedly re-grows** (BB.W-CARVE4/W-CARVE5 had to re-drain it twice). CHECK: does
  the CURRENT plan's WS4/WS10 carve work account for files that will grow PAST 500 lines again post-carve.
- **Headless-green / visually-broken** (the cardinal disease — a gate passes device-free while the real paint is
  broken; this is WHY paint is decoupled + dual-engine-verified as a SEPARATE non-authoring judge). CHECK: every
  wave's locking gate — does it assert something VISUALLY load-bearing, or could it green on a proxy?
- **The C-SAFARI chronic** (missed 4 tranches running: BE/BF/BD/[this]). De-risked this session via the C18 harness
  (proven: real Chrome CDP Metal + off-screen WKWebView). CHECK: is the de-risking durable into WS8's actual build,
  or could the harness itself bit-rot/regress before WS8 runs.

## The CORRECTED state to audit FROM (do not re-litigate; build on it)

- `docs/tranches/BG/audit/RESPEC/AMENDED-WAVE-PLAN.md` — the executable plan (86% develop-ready).
- `docs/tranches/BG/execution/EXECUTION-PROGRESS.md` (150 wave rows) + `bg-build-map.md` (the specs) — POST-FOLD,
  carrying the 7 gap-waves + all 6 corrections (value.js `^1.1.1`, G4 9-site, G3 submodule-out, G2 PARITY-B deleted,
  G5 16-readers, G7 W5, C-SAFARI `uChromatic`).
- `FINAL.md` §10 — the re-spec reconciliation record.
- Live-fixes landed: `07c6e6ec`/`e40e5095`/`8947288a` (D-1/D-2/D-3, Phase-LX rows DONE).
- `docs/tranches/BD/viz/page-deep/PASS-E.md` + `docs/tranches/BD/viz/page-audit/` — the EXISTING 118-page deep audit
  corpus. The page-coverage lens UPDATES/VERIFIES this against BG's current wave set (does every page still have a
  wave owner post-fold; has the page corpus grown to 156 since BD; any new orphans) — it does NOT re-derive 156 pages
  from scratch (the audit's own "don't re-derive settled findings" discipline + [[feedback_analyze_in_full]] means
  USE the existing complete corpus, verify deltas).

## Design language (unchanged, the non-negotiable identity)

Liquid-glass / iOS-26-27 transmissive material; warm-everywhere / no-gray (warm-amber, chroma floor); W-DARK-MATERIAL
luminous-dark (never charcoal); compositor-only motion + PRM-carved; spring-iff-spatial / bezier-iff-effect; Tailwind
v4 token-first; clean breaks, no legacy aliases; ≥2-consumer bar; presets-in-consumers.

## FENCE (ABSOLUTE)

Operate ONLY under `/Users/mkbabb/Programming/glass-ui`. NEVER mv/rm/move/touch any path outside it — ESPECIALLY no
sibling repo under `~/Programming` (the catastrophe). Worktrees ONLY at `.claude/worktrees/`. Run
`node scripts/verify-siblings-intact.mjs --quiet` (exit 0) when in doubt. Audit agents are READ-MOSTLY — write ONLY
under `docs/tranches/BG/audit/RESPEC-COHERENCE/`. Prototype agents (worktree-isolated) may edit src/demo WITHIN
their own worktree only — never merged, feasibility-only.

## Process

Batch-3 ALWAYS (the rate-wall lesson). Every `agent()` call whose result is dereferenced MUST be null-guarded (the
session-limit lesson). ONE workflow at a time. This pass (BG) runs to 100% convergence FIRST; THEN the BH pass
(separate seed, `docs/tranches/BH/audit/RESPEC-COHERENCE/SEED-CONTEXT.md`) runs. At 100%, develop the exact amended
wave plan (the same shape as `AMENDED-WAVE-PLAN.md`) and fold it into the tranche set before any code execution resumes.
