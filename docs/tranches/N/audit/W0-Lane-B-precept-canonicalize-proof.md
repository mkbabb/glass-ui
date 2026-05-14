# N.W0 Lane B — Precept submodule canonicalize (invariants 21-23) — proof

## Disposition

Precept submodule advanced `46d6cfb → b8af314` (commit `b8af314 feat(spec+style): canonicalize bidirectional audit + spot-verification gate + wire-before-retire`); pushed to `origin/main`.

Invariants 21-23 are codified in the precept tree across four files. The wave's audit-failure ledger is the same commit's LESSONS-LEARNED entry (Lane C below is the local annotation; Lane B owns the cross-repo codification).

## File changes summary

| File | Change |
|---|---|
| `instructions/tranche/RESEARCH.md` | §"Canonical Angles" extends from 6 → 8 angles. Angle 7 = bidirectional style audit; angle 8 = overfitting audit. Notes canonical-at-every-substrate-tranche binding + library-only-or-doc-only waiver clause. |
| `instructions/tranche/SPEC.md` | §"Close" gains a new sub-section "Audit-verdict spot-verification gate" between Close-Honesty Checklist and end-of-file. The gate enumerates the three spot-verification checks (item exists; rg count accurate; zero-consumer claim resolves through alias paths) + the recording requirement (verdict cited inline in prune ledger + wave-spec references spot-verification commit before retirement is authorized). |
| `instructions/README.md` | §"Edicts" gains a new bullet "Wire before retire." between "No overfitting" and "Every wave is named". Branches (a) wire-≥-2 / (b) retire-with-rationale / (c) defer-with-named-destination. Default is (a). |
| `instructions/LESSONS-LEARNED.md` | New entry `## 2026-05-13 - Audit Verdicts Require Spot-Verification`. Full ledger: source (glass-ui N KISS-revision under user wiring correction), failure (3 audit errors in one ledger), rule (spot-verification protocol), check (SPEC.md + README.md + ι lane). |

## Canonical pattern citation

The three precepts close around one failure class catalogued at LESSONS-LEARNED 2026-05-13. Prior precedent for cross-file precept codification: `2026-05-11 - DEGRADED Close Requires Bound Restoration` simultaneously updated SPEC.md §"Hard Gates" + LESSONS-LEARNED.md; `2026-05-06 - Worktree Isolation For Multi-Agent Shared-File Waves` simultaneously updated ORCHESTRATION.md + LESSONS-LEARNED.md. The N codification follows the same shape: a rule lands in the appropriate authority doc (SPEC for close-time gates; README for edict-level posture; RESEARCH for tranche-open canonical angles) + a single LL entry catalogues the failure that motivated it.

## Verification

`git -C docs/precepts log --oneline -3` ⇒

```
b8af314 feat(spec+style): canonicalize bidirectional audit + spot-verification gate + wire-before-retire (glass-ui N.W0 Lane B)
46d6cfb lessons: git stash anti-pattern 4th recurrence (state-isolation loophole)
08a2e9c feat(precepts): reconcile glass-ui tranche-stream G→L onto REAUDIT-stream main (M.W0 Lane II)
```

`git -C docs/precepts push origin main` ⇒ `46d6cfb..b8af314  main -> main`.

Glass-ui submodule pointer advance lands in the W0 close commit (next).

## Open questions for orchestrator

None. The codification is direct + minimal; the wave-close commit advances the glass-ui submodule pointer to `b8af314`.

## Worktree diff verification output

This lane was orchestrator-solo per M.W0 Lane II precedent (precept submodule writes never agent-dispatched). No agent worktree.
