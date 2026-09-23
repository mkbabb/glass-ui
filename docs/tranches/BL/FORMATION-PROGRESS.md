# BL — formation progress (the resume cursor)

Tranche-development only; no source edits. Every seat is Opus 5.5, declared `model: 'opus'` (owner, 2026-09-23).
Concurrency: pools of 5. Reports land under `docs/tranches/BL/` so they survive a scratchpad wipe.

| step | run id | state | outputs |
|---|---|---|---|
| charter + recap seed | — | DONE `04c61cf1` | `CHARTER.md`, `audit/PROMPT-RECAP-SEED.md` |
| audit round 1 (19 lenses + registry) | `wf_cf8ab607-7c9` | RUNNING | `audit/round-1/L*.md`, `audit/REGISTRY.md` |
| audit round 2 (steered by the registry) | — | pending | `audit/round-2/` |
| audit round 3+ (until two consecutive passes add nothing) | — | pending | `audit/round-3/` |
| design loop: structure (colocation edict), ≥3 passes | — | pending | `design/structure/` |
| design loop: other design-shaped families the audit surfaces | — | pending | `design/<family>/` |
| formation: PLAN, waves, gates, LEDGER, dispositions | — | pending | `PLAN.md`, `waves/`, `LEDGER.md` |
| formation audit to two consecutive clean passes | — | pending | `audit/formation/` |

Resume rule: on restart, read this table; for a RUNNING row, read its journal (`<transcript>/subagents/workflows/<run id>/journal.jsonl`),
and if the run died, hand-author a continuation that feeds the finished lens results in as literals and re-runs only the missing seats.
