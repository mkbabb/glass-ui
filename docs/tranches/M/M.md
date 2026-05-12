# M — Constellation v1.0 standardization (post-v1.0)

**Tranche letter**: M.
**Successor to**: L (closed `3e4d472`; v1.0.0 published; precept submodule local `b51047d`, push deferred per L coordination/speedtest-Y.md §8).
**Cohort identity**: post-v1.0 constellation standardization — first tranche to expand scope from glass-ui-only to the `@mkbabb/*` ecosystem (per user M-open directive M6).
**Mode**: planning-only at this open (per user M-open directive M7). Implementation dispatch awaits explicit user authorization.
**Open**: 2026-05-12.

## §1 — Thesis

M is the **post-v1.0 constellation standardization tranche**. The HEADLINE (W1) is the consumer-migration sweep itself: every Vue consumer in the `@mkbabb/*` ecosystem migrates to glass-ui v1.0's subpath surface, retired-symbol imports are cleared constellation-wide, and per-consumer state is documented in the canonical `coordination/CONSTELLATION.md` manifest.

No new packages are invented. Per V2 (NO workarounds) + V3 (NO legacy code) + V4 (architectural transpositions for elegance/simplicity/performance), the gestalt move at M is *finishing the v1.0 migration across the constellation*, not abstracting glass-ui's tooling into a new published surface. Cross-cutting duplication (parallel `cn()`, parallel dark-mode wiring, etc.) is audited per-consumer at W1; most stay AS-IS (trivial helpers); only where ELEVATE-via-existing-glass-ui-subpath is a clear simplicity win does anything move.

Supporting waves absorb residuals: cross-repo retired-subpath drift (W0, must-fix — 5 consumer sites BROKEN against v1.0); precept-submodule REAUDIT-stream reconciliation (W0, deferred since K); glass-ui substrate residuals including F-ε-3 (W2); stale-repo retire-or-refresh + doc cohort (W3); strengthened close ceremony with cross-constellation reflog scan (W4).

## §2 — Binding invariants

Inherits L's 18 invariants (verified per L FINAL §2) and extends:

1. **Token-first** (J invariant; held).
2. **Component over CSS class** (J invariant; held).
3. **Visual-load-bearing-ness binary** (J invariant 10; held + extended cross-repo at M).
4. **No tranche-letter shadow execution** (K invariant 3; held).
5. **Hardened agent git clause** (K W0; extended at M to enumerate `git checkout <path>` explicitly per M.Rδ P1).
6. **Worktree isolation requires repo-relative paths** (K W8 LESSONS-LEARNED #1; held).
7. **No git stash even for state-probe** (K W8 LESSONS-LEARNED #2; held).
8. **Strengthened 7-agent post-close audit + ι integrity-sweep + reflog scan canonical** (J → K → L → M).
9. **DEGRADED-runtime-outcome binding requires named restoration** (L W0 SPEC; held).
10. **`coordination/` artefact class for cross-repo** (L W0 SPEC; M extends to `coordination/CONSTELLATION.md` per M.Rδ P2).
11. **`worktree_diff_verification` orchestrator step at wave close** (L W0 dispatch field; held).
12. **Cross-repo commit policy** (L W0 ORCHESTRATION; M extends to multi-peer per M.Rδ P3).
13. **NO backwards-compat hacks, NO legacy aliases** (recurring V3; held).
14. **NO quick solutions, NO workarounds** (recurring V2; held).
15. **Idiomatic gestalt over incremental patches** (recurring V2.d; held — with KISS corollary: don't invent packages to abstract trivial duplication).
16. **Architectural transpositions desired** for elegance/simplicity/performance, but **NOT for their own sake** — KISS first; transpose only where it removes load, not where it merely re-shuffles it.
17. **Bundle-budget gate non-negotiable** (held at L close baseline 124.8K raw / 22.4K gz).
18. **MIGRATION.md as binding deliverable when breaking** (L W5; held).
19. **NEW @ M — Constellation cohesion binary**: any `@mkbabb/*` published package OR any consumer repo under user control is in tranche scope at every tranche close; the audit is binary; remediation can be deferred but never silent.
20. **NEW @ M — Single-human-multi-orchestrator pattern formalized** (per M.Rδ P7).

## §3 — Wave schedule (5 waves)

| Wave | Opens after | Lanes | Hard gate (TL;DR) | Brittleness |
|---|---|---|---|---|
| W0 | open | 4 parallel (I recon + II precept reconcile + III words+bbnf-buddy retired-subpath fix + IV fourier-analysis retired-subpath fix) + orchestrator-authored v1.0.1 if substrate warrants | retired-subpath drift CLOSED; precept submodule reconciled+pushed; CONSTELLATION.md baseline ratified; optional v1.0.1 tag | no |
| **W1 HEADLINE** | W0 close | 6 per-consumer parallel lanes in 2 batches (4+2) — keyframes.js / value.js / fourier-analysis / words / bbnf-buddy / speedtest-post-Y | every consumer at v1.0 subpath surface; per-consumer cross-cutting duplication audit + disposition; zero retired-symbol imports anywhere | yes per-consumer |
| W2 | W1 close (parallel with W3) | 3 lanes (A F-ε-3 repro+fix; B api/ extensions; C L cosmetic absorb) | F-ε-3 CLOSED or named-deferred; src/api/ extensions landed; L P2+P3 residuals absorbed or named-deferred | no |
| W3 | W1 close (parallel with W2) | 2 lanes (A stale-repo retire-or-refresh; B doc cohort across constellation) | vite-plugin-shebang + mathanim + fourier-animate dispositioned; glass-ui + per-consumer docs aligned with M HEAD; CONSTELLATION.md final-state | no |
| W4 | W2 + W3 close | 1 orchestrator + 7 audit lanes (α/β/γ/δ/ε/π/ι) | 7 lanes return clean; FINAL.md authored; cross-constellation reflog scan clean; final release tag if substrate delta | no |

## §4 — Cross-repo coordination summary

Per `docs/tranches/M/coordination/CONSTELLATION.md`:

- **speedtest** Y tranche in flight; reader-only on speedtest during M except cross-repo coordination + post-Y handoff at M.W1 Lane F.
- **bbnf-lang** owns its own tranche-stream (AA-BD); shared precept submodule; coordinate jointly on M.W0 reconciliation.
- **words/frontend** BROKEN against v1.0.0 (3 retired-subpath imports + broken symlink) — M.W0 Lane III must-fix.
- **fourier-analysis/web** BROKEN against v1.0.0 (2 retired-subpath imports) — M.W0 Lane IV must-fix.
- **bbnf-buddy** + **keyframes.js** + **value.js**: M.W1 per-consumer migration.
- **mkb-utils**: no glass-ui dep; documented out-of-scope unless lane-audit surfaces relevance.
- **vite-plugin-shebang** + **mathanim** + **fourier-animate**: M.W3 retire-or-refresh.

## §5 — Critical-path analysis

Critical path: W0 → W1 → (W2 || W3) → W4. 4 sequential edges.

Peak parallelism:
- W0: 4 simultaneous lanes
- W1: 6 per-consumer lanes (split 4+2 to respect 6-implementation-agent ceiling per M.Rδ P6 dual-ceiling proposal)
- W2 + W3 parallel: up to 5 simultaneous (3+2)
- W4: 1 orch + 7 audit = 8 (canonical ι sweep canon)

## §6 — Risk register

1. **REAUDIT-stream precept reconciliation** (M.W0 Lane II): 15-commit divergence; full re-baseline strategy per M.Rδ recommendation. If conflict-resolution fails, defer with named restoration.
2. **Y tranche overlap** (speedtest mid-flight): coordinate via CONSTELLATION.md §5; M.W1 speedtest-lane is thin re-coordination commit OR named-deferred if Y still in flight.
3. **Consumer-side stack drift** (e.g., a consumer behind on Vue 3.5 / Tailwind v4): M.W1 per-lane absorbs OR named-defers stack-bump.
4. **bbnf-lang precept stream** (BD branch): if bbnf-lang ships precept changes during M flight, M.W0 reconciliation may stale; build in re-verification step.

## §7 — Provisional v1.x release plan

- M.W0 close → glass-ui v1.0.1 (retired-subpath drift artifact + minor substrate) IF substrate delta warrants; else skip.
- M.W2 close → glass-ui v1.1.x or v1.2.0 if F-ε-3 fix / api/ extensions warrant.
- M.W4 close → final M release bump if substrate delta accumulated.

## §8 — Constellation residuals provisional (M-bound to N tranche IF M can't absorb)

(Empty at M open — populates at M.W4 close.)

## §9 — Authority

This plan is the binding contract for M flight. Per L precedent, M now awaits the user's explicit dispatch directive ("begin and continue" analogous to K + L pattern). Until then, planning artefacts land at the M-open commits and implementation does not begin.

The plan substrate at M open:
- This file (`M.md`)
- `findings.md` (verbatim user M-open directive)
- `dispatch/AGENT.md` (dispatch template extending L)
- `PROGRESS.md` (initial state)
- `waves/W{0..4}.md` (5 wave specs)
- `coordination/CONSTELLATION.md` (the canonical multi-peer artefact)
- `research/R{α-ζ}*.md` (6 research deliverables; 27,000+ words combined)

## §10 — Revision history

- 2026-05-12 open commit `64105c6`: initial 9-wave plan with `@mkbabb/dev-kit` HEADLINE.
- 2026-05-12 revision (this file): dropped dev-kit; restructured to 5 waves; per-consumer migration becomes the HEADLINE; KISS. Rationale: dev-kit was premature abstraction (violating Rε §H.4 anti-pattern + V3 NO-legacy-code spirit); duplication across constellation is mostly trivial helpers + config that don't warrant a new published package; the user's actual directive was constellation audit + migrate, not package invention.
