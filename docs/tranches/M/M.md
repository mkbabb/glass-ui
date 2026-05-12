# M — Constellation cohesion + carve-out (post-v1.0)

**Tranche letter**: M.
**Successor to**: L (closed `3e4d472`; v1.0.0 published; precept submodule local `b51047d`, push deferred per L coordination/speedtest-Y.md §8).
**Cohort identity**: constellation cohesion — the first post-v1.0 tranche, expanding scope from glass-ui-only to the full `@mkbabb/*` ecosystem (per user M-open directive M6: "consumer repos, too — list them ALL").
**Mode**: planning-only at this open (per user M-open directive M7). Implementation dispatch awaits explicit user authorization.
**Open**: 2026-05-12.

## §1 — Thesis

M is the **constellation cohesion + carve-out tranche**. The HEADLINE (W1) carves the canonical `@mkbabb/dev-kit` cross-cutting build/lint/test/release tooling package out of glass-ui's accreted scripts, retires duplicated impls across the constellation, and ratifies the `coordination/CONSTELLATION.md` artefact class as canonical at M.

The supporting waves: cross-repo retired-subpath drift fix (W0, must-fix — 5 consumer sites BROKEN against v1.0); precept-submodule REAUDIT-stream reconciliation (W0, deferred since K); constellation cohesion + namespace canon (W2); L substrate residuals absorb including F-ε-3 (W3); per-consumer standardization sweep (W4); stale-repo retire-or-refresh decisions (W5); doc cohort (W6); substrate cohesion finishing (W7); 7-agent strengthened close ceremony with cross-constellation reflog scan (W8).

## §2 — Binding invariants

Inherits L's 18 invariants (verified per L FINAL §2) and extends:

1. **Token-first** (J invariant; held).
2. **Component over CSS class** (J invariant; held).
3. **Visual-load-bearing-ness binary** (J invariant 10; held at v1.0 freeze + extended cross-repo at M).
4. **No tranche-letter shadow execution** (K invariant 3; held).
5. **Hardened agent git clause** (K W0; held; extended at M to enumerate `git checkout <path>` explicitly per M.Rδ P1).
6. **Worktree isolation requires repo-relative paths** (K W8 LESSONS-LEARNED #1; held).
7. **No git stash even for state-probe** (K W8 LESSONS-LEARNED #2; held).
8. **Strengthened 7-agent post-close audit + ι integrity-sweep + reflog scan canonical** (J → K → L → M; canonical for the fourth tranche).
9. **DEGRADED-runtime-outcome binding requires named restoration** (L W0 SPEC; held).
10. **coordination/ artefact class for cross-repo** (L W0 SPEC; M extends to `coordination/CONSTELLATION.md` per M.Rδ P2).
11. **`worktree_diff_verification` orchestrator step at wave close** (L W0 dispatch field; held).
12. **Cross-repo commit policy** (L W0 ORCHESTRATION; M extends to multi-peer per M.Rδ P3).
13. **NO backwards-compat hacks, NO legacy aliases** (recurring V3; held).
14. **NO quick solutions, NO workarounds** (recurring V2; held).
15. **Idiomatic gestalt over incremental patches** (recurring V2.d; held).
16. **Architectural transpositions desired** for elegance/simplicity/performance (recurring V4; held).
17. **Bundle-budget gate non-negotiable** (held at L close baseline 124.8K raw / 22.4K gz).
18. **MIGRATION.md as binding deliverable when breaking** (L W5; M extends per-consumer + namespace-wide per Rε G.4).
19. **NEW @ M — Constellation cohesion binary**: any `@mkbabb/*` published package OR any consumer repo under user control is in tranche scope at every tranche close; substrate-without-cross-repo-consideration audit is binary.
20. **NEW @ M — Single-human-multi-orchestrator pattern formalized** (per M.Rδ P7): the user-as-multiple-tranche-orchestrators pattern is canonical; each tranche's orchestrator role is precept-documented; coordination via CONSTELLATION.md.

## §3 — Wave schedule (9 waves; mirrors L pattern + cross-repo lanes)

| Wave | Opens after | Lanes | Hard gate (TL;DR) | Brittleness |
|---|---|---|---|---|
| W0 | open | 5 parallel (I recon + II precept reconcile + III words+bbnf-buddy retired-subpath fix + IV fourier-analysis retired-subpath fix + V CONSTELLATION manifest+glass-ui v1.0.1 patch) | retired-subpath drift CLOSED; precept submodule reconciled+pushed; glass-ui v1.0.1 tagged; CONSTELLATION.md baseline shipped | no |
| **W1 HEADLINE** | W0 close | 5 worktree-isolated parallel (A scaffold @mkbabb/dev-kit + B vite/tsconfig/eslint preset + C release/budget/freshness gate + D vitest setup + E cn ELEVATE decision) | `@mkbabb/dev-kit@0.1.0` published; canonical preset surface verified; glass-ui consumes dev-kit (or documents narrowing); 1+ consumer adopts | yes (new package; opt-in adoption) |
| W2 | W1 close | 3 parallel (A constellation cohesion canon + B namespace versioning policy + C CHANGELOG/MIGRATION convention) | CONSTELLATION.md upgraded to binding; namespace canon documented; conventions in precept submodule | no |
| W3 | W1 close (parallel with W4) | 3 parallel (A F-ε-3 methodical repro + fix; B GlassPanelVariant + api/ extensions; C 4 P2 + 12+ P3 cosmetic absorb) | F-ε-3 Lighthouse CLOSED OR formal-retired-with-rationale; src/api/ extensions landed; cosmetic residuals zero or named-deferred to N | no |
| W4 | W1 close (parallel with W3) | 7 per-consumer parallel lanes (speedtest post-Y + keyframes.js + value.js + words + fourier-analysis + bbnf-buddy + mkb-utils + bbnf-lang precept-only) | every consumer at v1.0.x + adopting dev-kit (or named-deferred); zero retired-symbol imports in any consumer | yes per-consumer |
| W5 | W1 close | 1 sequential (per-repo decisions) | vite-plugin-shebang + mathanim + fourier-animate retire-or-refresh dispositioned; CONSTELLATION.md §1 updated | no |
| W6 | W2 + W3 + W4 close | 2 parallel (A glass-ui doc walk + B constellation-wide MIGRATION/CHANGELOG/README cohort) | every doc aligned with M HEAD across constellation | no |
| W7 | W3 + W4 + W5 + W6 close | 1-2 lanes (TBD residuals; reserve for substrate cohesion finishing) | wave residuals empty OR named-deferred | maybe |
| W8 | W7 close | 1 orch + 7 audit (α/β/γ/δ/ε/π/ι) | 7 lanes return clean; FINAL.md authored; reflog scans across constellation clean; v1.x.y tagged + pushed | no |

## §4 — Cross-repo coordination summary

Per `docs/tranches/M/coordination/CONSTELLATION.md`:

- speedtest's Y tranche is in flight; M.W4 coordinates handoff (no concurrent writes during Y flight beyond M.W0 cross-repo lanes).
- bbnf-lang owns its own tranche-stream (AA-BD); M reads-only on bbnf-lang source; coordinates precept-submodule reconciliation jointly with bbnf-lang orchestrator.
- All other consumer repos (keyframes.js, value.js, words, fourier-analysis, bbnf-buddy, mkb-utils) are M-write-authorized per M-open user directive.
- Stale repos (vite-plugin-shebang, mathanim, fourier-animate) get retire-or-refresh decisions at M.W5.

## §5 — Critical-path analysis

Critical path: W0 → W1 → (W2 || W4) → W6 → W7 → W8. 6 sequential edges.

Peak parallelism:
- W0: 5 simultaneous lanes
- W1: 5 worktree-isolated lanes
- W4: 7 per-consumer parallel lanes (highest; warrants explicit dispatch ceiling discussion per M.Rδ P6 dual-ceiling proposal)
- W8: 1 orch + 7 audit = 8 (canonical ι sweep canon)

Per the dual-ceiling proposal (implementation 6 / read-only audit 7), W4's 7 parallel implementation lanes exceeds the proposed implementation ceiling. Disposition: dispatch in two batches of 4 + 3, OR sequence higher-risk consumers; document at M.W4 dispatch time.

## §6 — Risk register (high-level)

1. **REAUDIT-stream precept reconciliation conflict** (M.W0 Lane II): 15-commit divergence; full re-baseline strategy per M.Rδ recommendation; if conflict-resolution fails, escalate or defer.
2. **`@mkbabb/dev-kit` carve-out** (M.W1 HEADLINE): if too ambitious, ship narrower scope (e.g., just vite + tsconfig presets) at v0.1.0 and accrete.
3. **Per-consumer migration risk** (M.W4): each consumer migration may surface its own consumer-side issues; reserve M.W7 for residual absorb.
4. **Y tranche overlap** (speedtest mid-flight): coordinate timing; M.W4 speedtest-lane may be a thin re-coordination commit rather than substantive migration.
5. **bbnf-lang precept stream** (BD branch): if bbnf-lang ships precept changes during M flight, M.W0 reconciliation may stale; build in re-verification step.

## §7 — Provisional v1.x release plan

- M.W0 close → glass-ui v1.0.1 (retired-subpath drift artifact + minor substrate; OR v1.1.0 if substrate is non-trivial).
- M.W1 close → `@mkbabb/dev-kit@0.1.0` first publish.
- M.W3 close → glass-ui v1.1.x or v1.2.0 (F-ε-3 fix; src/api/ extensions).
- M.W4 close → per-consumer minor/patch versions per-repo as appropriate.
- M.W8 close → final release bump if substrate delta warrants.

## §8 — Constellation residuals provisional (M-bound to N tranche IF M can't absorb)

(Empty at M open — populates at M.W8 close.)

## §9 — Authority

This plan is the binding contract for M flight. Per L precedent (K + L both opened with planning + awaited explicit user dispatch authorization), M now awaits the user's "begin and continue" directive analogous to L's. Until then, planning artefacts land at this open commit and implementation does not begin.

The plan substrate at M open:
- This file (`M.md`)
- `findings.md` (verbatim user M-open directive)
- `dispatch/AGENT.md` (dispatch template extending L)
- `PROGRESS.md` (initial state)
- `waves/W{0..8}.md` (9 wave specs)
- `coordination/CONSTELLATION.md` (the NEW canonical artefact class)
- `research/R{α-ζ}*.md` (6 research deliverables; 27,000+ words combined)
