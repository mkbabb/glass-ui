# BL — formation progress (the resume cursor)

Tranche-development only; no source edits. Every seat is Opus 5.5, declared `model: 'opus'` (owner, 2026-09-23); no Fable seat until the owner lifts it.
Audit budget: 32 = round 1 (19) + round 2 (9) + rounds 3-4 (2 + 2); registry seats are outside it.
Concurrency: pools of 5. Reports land under `docs/tranches/BL/` so they survive a scratchpad wipe.

| step | run id | state | outputs |
|---|---|---|---|
| charter + recap seed | — | DONE `04c61cf1` | `CHARTER.md`, `audit/PROMPT-RECAP-SEED.md` |
| audit round 1 (19 lenses + registry) | `wf_cf8ab607-7c9` | DONE `1c1f1f67` + `85730eef` (377 findings, 72 families, 4 rejects) | `audit/round-1/L*.md`, `audit/REGISTRY.md` |
| audit round 2 (9 directed lenses + registry merge) | `wf_e5a1ce80-a24` | 9/9 lenses returned (R2-05 written by the driver from its return: the harness refused the seat's file write); registry merge RUNNING | `audit/round-2/R2-*.md`, `audit/REGISTRY.md` |
| audit rounds 3-4 (2 fresh lenses each; stable when both add no new family) | — | pending | `audit/round-3/`, `audit/round-4/` |
| inbound sibling asks | — | O-53..O-58, O-60 registered | `audit/INBOUND.md` |
| design loop D1: structure (colocation edict), ≥3 passes | round 0 `wf_94c5606f-690`; research A `wf_5dfeff05-16f`; research B `wf_6415b733-e6d`; pass-1 synth/prototype/critique/agglomerate `wf_956cc613-66d` | round 0 DONE `9a435606`; research A DONE `b7099ea6`; research B DONE `2b188e72` (A 72%, B 60%, C 62%, D 70%, E 62%, F 62%); pass-1 remainder RUNNING (pool 5) | `design/structure/PORTFOLIO.md`, `design/structure/pass-1/`, `design/structure/REGISTRY.md` |
| design loop D2: the dock (morph, compact-on-scroll, rim seat; O-55/O-56/O-60) | — | pending | `design/dock/` |
| design loop: other design-shaped families the audit surfaces | — | pending | `design/<family>/` |
| formation: PLAN, waves, gates, LEDGER, dispositions | — | pending | `PLAN.md`, `waves/`, `LEDGER.md` |
| formation audit to two consecutive clean passes | — | pending | `audit/formation/` |

Resume rule: on restart, read this table; for a RUNNING row, read its journal (`<transcript>/subagents/workflows/<run id>/journal.jsonl`),
and if the run died, hand-author a continuation that feeds the finished lens results in as literals and re-runs only the missing seats.
