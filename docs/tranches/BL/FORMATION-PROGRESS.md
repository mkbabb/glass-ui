# BL — formation progress (the resume cursor)

Tranche-development only; no source edits. Every seat is Opus 5.5, declared `model: 'opus'` (owner, 2026-09-23); no Fable seat until the owner lifts it.
Audit budget: 32 = round 1 (19) + round 2 (9) + rounds 3-4 (2 + 2); registry seats are outside it.
Concurrency: pools of 5. Reports land under `docs/tranches/BL/` so they survive a scratchpad wipe.

| step | run id | state | outputs |
|---|---|---|---|
| charter + recap seed | — | DONE `04c61cf1` | `CHARTER.md`, `audit/PROMPT-RECAP-SEED.md` |
| audit round 1 (19 lenses + registry) | `wf_cf8ab607-7c9` | DONE `1c1f1f67` + `85730eef` (377 findings, 72 families, 4 rejects) | `audit/round-1/L*.md`, `audit/REGISTRY.md` |
| audit round 2 (9 directed lenses + registry merge) | `wf_e5a1ce80-a24` | DONE `9831f0e4` (75 families, F-73..F-75 new, 14 refuted; docket at HEAD; R-5 working answer 11.0.0) | `audit/round-2/R2-*.md`, `audit/REGISTRY.md` |
| audit round 3 (stability pass 1: R3-02, R3-01; registry) | `wf_a6b2c4a0-8e0` | DONE `ec0579ba` (77 families; F-76, F-77 minted, so not stable) | `audit/round-3/` |
| audit round 4 (stability pass 2: R4-01 interruption/re-entry, R4-02 direction/zoom/text; registry + the inbound map of O-53..O-62, 290 O-59 rows) | `wf_8b48212e-151` | RUNNING | `audit/round-4/`, `audit/INBOUND-MAP.md` |
| audit rounds 5+ (only if round 4 mints a family; beyond the 32-seat budget, recorded as a deliberate overrun for the stability law) | — | conditional | — |
| inbound sibling asks | — | O-53..O-58, O-60 registered | `audit/INBOUND.md` |
| design loop D1: structure (colocation edict), ≥3 passes | round 0 `wf_94c5606f-690`; pass-1 research `wf_5dfeff05-16f` + `wf_6415b733-e6d`; pass-1 rest `wf_956cc613-66d`; pass 2 `wf_5e169fa4-dce` | pass 1 DONE `d8c95204` (B ADVANCE 40%, D-prime ADVANCE 45%, A BLOCK, C/E/F BANK, G minted); rulings R-1..R-10 `e06f07e6`; pass 2 RUNNING (floor + research B/D-prime/G → spec v2 → prototypes → battery-first critiques → agglomerate) | `design/structure/{PORTFOLIO,REGISTRY,RULINGS}.md`, `pass-1/`, `pass-2/`, `floor/` |
| design loop D2: the dock (morph, compact-on-scroll, rim seat; O-55/O-56/O-60) | — | pending | `design/dock/` |
| design loop: other design-shaped families the audit surfaces | — | pending | `design/<family>/` |
| formation: PLAN, waves, gates, LEDGER, dispositions | — | pending | `PLAN.md`, `waves/`, `LEDGER.md` |
| formation audit to two consecutive clean passes | — | pending | `audit/formation/` |

Resume rule: on restart, read this table; for a RUNNING row, read its journal (`<transcript>/subagents/workflows/<run id>/journal.jsonl`),
and if the run died, hand-author a continuation that feeds the finished lens results in as literals and re-runs only the missing seats.
