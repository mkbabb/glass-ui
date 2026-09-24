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
| audit round 4 (stability pass 2: R4-01 interruption/re-entry, R4-02 direction/zoom/text; registry + the inbound map of O-53..O-62, 290 O-59 rows) | `wf_8b48212e-151` (registry seat resumed from its run id after the 18:53 network outage) | DONE `6e33cbdd` (79 families; F-78, F-79 minted, so not stable; inbound map 346 rows, NEW 0) | `audit/round-4/`, `audit/INBOUND-MAP.md` |
| audit round 5 (stability pass 3: R5-01 page lifecycle with state live, R5-02 consumer integration and assistive technology; registry + O-64 mapped). Rounds 5+ exceed the 32-seat budget, a deliberate overrun for the stability law | `wf_f0e2ae4f-95c` | RUNNING | `audit/round-5/` |
| audit round 6+ (until two consecutive passes mint nothing) | — | conditional | — |
| inbound sibling asks | — | O-53..O-64 and C-2 registered (O-64 `5804d8cc`) | `audit/INBOUND.md`, `audit/INBOUND-MAP.md` |
| design loop D1: structure (colocation edict), ≥3 passes | round 0 `wf_94c5606f-690`; pass-1 research `wf_5dfeff05-16f` + `wf_6415b733-e6d`; pass-1 rest `wf_956cc613-66d`; pass 2 `wf_5e169fa4-dce` (died in the 18:53 outage; G-research banked `4321b021`), relaunched fresh as `wf_42ea24e0-bc2` (fence fixed, G-research reused, retry-once + null guards) | pass 1 DONE `d8c95204` (B ADVANCE 40%, D-prime ADVANCE 45%, A BLOCK, C/E/F BANK, G minted); rulings R-1..R-10 `e06f07e6`; pass 2 RUNNING (floor + research B/D-prime/G → spec v2 → prototypes → battery-first critiques → agglomerate) | `design/structure/{PORTFOLIO,REGISTRY,RULINGS}.md`, `pass-1/`, `pass-2/`, `floor/` |
| design loop D2: the dock (plate shape, run/paint separation, extent morph, state inputs incl. compact-on-scroll, the progress rim; F-16, F-18; O-55/O-56 G-1/O-60/O-63, C-2 row 2; the veil is its own ruling) | round 0 `wf_1aea4d41-f6e`; pass 1 `wf_806a4640-d3a` | round 0 DONE `8417a40f` (six families D2-A..F, 13 HEAD witnesses; DesignSync is a sync channel and makes no designs, Fable withheld by the owner); pass 1 RUNNING (harness floor promoted from round 0's scratch harness + prior art W + constellation X → six family researchers → specs → prototype and critique per family → agglomerate; pools of 2) | `design/dock/PORTFOLIO.md`, `harness/`, `pass-1/`, `REGISTRY.md` |
| design loop: other design-shaped families the audit surfaces | — | pending | `design/<family>/` |
| formation: PLAN, waves, gates, LEDGER, dispositions | — | pending | `PLAN.md`, `waves/`, `LEDGER.md` |
| formation audit to two consecutive clean passes | — | pending | `audit/formation/` |

Resume rule: on restart, read this table; for a RUNNING row, read its journal (`<transcript>/subagents/workflows/<run id>/journal.jsonl`),
and if the run died, hand-author a continuation that feeds the finished lens results in as literals and re-runs only the missing seats.

Carried obligations (promised to a peer or the owner; each closes in the named step):

- D2 pass 2: a dedicated confirm-or-refute probe for O-64 R-6 (the 6 px ring beside the Scene glyph on keyframes' gh build, attributed to the plate re-sampling). Promised to value-js-30 on 2026-09-23.
- Formation: the reply letter answering O-53..O-64 and C-2 with each row's disposition and the landing version (working answer 11.0.0), sent to value-js-30 and lot-assay-e0.
