# BH CROSS-WAVE / CROSS-BAND COHERENCE AUDIT — seed context

**Date:** 2026-06-30 · **Branch:** `tranche/BG` (BH shares the branch — it interleaves with BG, no separate branch).
**HEAD:** `e550f1b0` (the BG coherence audit fully folded; BH is the second monolithic pass per the user's mandate).

## The mandate (verbatim intent, same as BG's)

The SAME 5-step convergent loop (8 researchers → synth → prototype → critique → agglomerate, batch-3, iterate to
100%) now scoped to BH: **re-audit BH's implementation/plan hitherto with close attention to friction history, and
ensure/augment cross-wave (cross-band) coherence — every wave spec aligned against the CURRENT state of BOTH
tranches** (BG just finished its own coherence pass; BH must now be checked AGAINST the amended BG, not the
pre-coherence-audit BG). Run to 100% convergence, then develop the exact amended BH wave plan and fold it in.

## The CORRECTED state to audit FROM (build on it, do not re-derive)

- `docs/tranches/BH/PLAN.md` — the master plan, 91/100 converged over 3 prior pass-loops (research→prototype→
  critique→synthesize), `authorable: true`. Band structure: B0 (hygiene) · B1 (legacy excision, 2-3 waves) · B2
  (export-surface restructure, ~9-10 waves, the largest band) · B3 (demo restructure, ~6 waves, all after BG-WS4) ·
  B4 (CLAUDE.md delete + redistribution, ~7 waves) · B5 (backbone/build/gate consolidation, ~4 waves) · B6 (3 reusable
  prompts, 1 wave) · B7 (consumer-migration asks, 1-2 waves).
- `docs/tranches/BH/research/SYNTHESIS-PASS{1,2,3}.md` + the 8 lane reports (`lane-{alpha,beta,gamma,delta,epsilon,
  zeta,eta,theta}-*.md`) + `docs/tranches/BH/research/proto/` (20 runnable prototypes) — the EXISTING 91%-converged
  corpus. USE it, do not re-derive the 5 convergent facts it already established (the export-surface 3-layer
  redundancy, the 16 god-modules, CLAUDE.md's live-contract-map fusion, the lucide payload bug, BG-is-the-gating-
  reality).
- `docs/tranches/BH/audit/` — prior audit material.
- **BG's just-completed coherence audit** (`docs/tranches/BG/audit/RESPEC/` + `docs/tranches/BG/audit/
  RESPEC-COHERENCE/`, folded at `e550f1b0`): the 7 BG gap-waves from the FIRST audit + the 7 BG cluster-amendments
  from the SECOND audit changed BG's wave IDs, sequencing, and gate set. BH's §3 interleave protocol (the "sequence
  after the named BG wave" table) was written against the PRE-coherence-audit BG plan — it MUST be re-verified
  against the amended BG (e.g. G4's kf-peer fix was re-homed onto BH-B2.1-swap — does B2.1-swap's spec actually
  carry that obligation now? G1 re-sequenced BG.W-CLOSEFIX-9SITE from row 12.0 to 0.7 — does that shift WHEN any
  BH-[C] band can safely start, given BH dodges BG's write-set?).
- BH's own commits already landed at HEAD: `0d6b9f8a`/`ba23c086` (B1-W2/B1-W3, the kf-peer bump that BG's coherence
  audit found created a LIVE broken-gesture defect — `useDragMorph.ts:26` owns no retarget re-roll for kf-5.0.0's
  native-snap binding). **This is the first concrete cross-tranche coherence test: was this BH-landed wave properly
  reconciled by BG's fold, or does BH's OWN plan still need an amendment (e.g. a follow-up BH wave that lands the
  retarget re-roll, since BH made the bump)?**

## Known friction history (seed list — mine BOTH the BG audit's taxonomy AND BH-specific incidents)

Everything in `docs/tranches/BG/audit/RESPEC-COHERENCE/COHERENCE.md`'s friction taxonomy applies (rate wall,
session-limit crash, permission friction, the foreign-tree catastrophe, paint-claim inflation, gate vacuity /
hand-authored-map drift, wrong-uniform/wrong-anchor mistakes, submodule mistakes, dependency-floor miscalculation,
the no-god-module ratchet re-growing, headless-green/visually-broken, C-SAFARI). PLUS BH-specific:
- **The CLAUDE.md ENOENT-crasher class** — BH's own Pass-1 research found "2 ENOENT-crashers" in the gate set that
  would break on a naive CLAUDE.md delete. Were these actually fixed, or just named? Re-verify against current gates.
- **The kf-peer bump landed WITHOUT its dependent fix** (the live finding above) — the exact shape of "a wave lands
  the surface change but not the consumer-side adaptation," which is the SAME class as G2's near-miss (WS8-M7 would
  have stripped a live grounding) and G5's (the WS5 parallax protector didn't exist on disk). CHECK: does BH have
  OTHER landed-or-planned waves with this same incomplete-pairing shape?
- **The "16 god-modules, BG owns 8, BH owns 3" split** — does this split still hold given BG's coherence audit
  ALSO touched carve ownership (G7's "post-WS9 re-carve owner" for ladder.css/shell.css, G6's canon-home carve)?
  Any double-claimed or now-orphaned carve target?
- **The export-surface clean-break correctness** — BH's plan claims "exactly ONE dropped key (./api) + 3 orphan
  re-homes; 200 of 203 /api symbols are pure import-path swaps." Re-verify this count is STILL accurate (BG's WS5
  viz-subpath work + WS8's glass-refract retirement may have changed the exported symbol set since this was computed).

## Design language (unchanged)

Liquid-glass / iOS-26-27 transmissive material; warm-everywhere / no-gray; W-DARK-MATERIAL luminous-dark;
compositor-only + PRM-carved; spring-iff-spatial/bezier-iff-effect; token-first; clean breaks, no legacy aliases;
≥2-consumer bar; presets-in-consumers. (BH is mostly INFRASTRUCTURE — export surface, docs, gates — so this matters
less directly than for BG, but any BH wave touching a visual file must still honor it.)

## FENCE (ABSOLUTE)

Operate ONLY under `/Users/mkbabb/Programming/glass-ui`. NEVER mv/rm/move/touch any path outside it — ESPECIALLY no
sibling repo under `~/Programming`. Worktrees ONLY at `.claude/worktrees/`. Run
`node scripts/verify-siblings-intact.mjs --quiet` (exit 0) when in doubt. Audit agents are READ-MOSTLY — write ONLY
under `docs/tranches/BH/audit/RESPEC-COHERENCE/`. Prototype agents (worktree-isolated) may edit src/demo/docs/scripts
WITHIN their own worktree only — never merged, feasibility-only. The `docs/precepts` submodule is NEVER written to
directly (BH's own §2 decision 5: repo-local draft + cross-repo ask).

## Process

Batch-3 ALWAYS. Every `agent()` call whose result is dereferenced MUST be null-guarded. ONE workflow at a time.
**Pass numbers are hardcoded as LITERAL constants in each workflow script body** (NOT threaded via `args`) — the
BG Pass 2 lesson: `args.pass` did not reliably propagate into `${PASS}`-templated file paths, which clobbered
already-committed Pass 1 files; the fix (verified working in BG Pass 3) is a literal `const PASS = N` per script.
At 100% convergence (or develop-ready per the same bar as `AMENDED-WAVE-PLAN.md`/`AMENDED-COHERENCE-PLAN.md`),
develop the exact amended BH wave plan and fold it into `docs/tranches/BH/PLAN.md` + cross-references in BG's
`bh-interleave-map.md` (BOTH sides of the interleave must agree post-fold).
