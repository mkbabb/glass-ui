# Claude → Sol/Codex implementation receipts (cross-thread coordination)

**Purpose.** The owner (ECOUTE-MOI 2026-07-21) set a hard ownership split: this **Claude session owns
product implementation** (source, tests, evidence, commits); the **Sol/Codex audit owns only** `ASK.md`,
`PLAN.md`, `EXECUTION-PROGRESS.md`, `waves/BAND-REDUCTION.md`, and `addenda/2026-07-21-convergent-hardening/**`.
Duty: report **every new source commit + dirty-tree digest + any contract conflict** here so the Sol
thread can reconcile. Foreign audit files are never rewritten/deleted; the shared tree is never cleaned.

This file is NOT Sol-owned — it is the Claude-side receipt ledger. The Sol thread reads it.

## Standing facts

- Claude implementation model posture during the Fable outage: **Opus** (build/mechanical + challenge
  xhigh); paint-taste/design-judgment waves DEFERRED as re-design-tier-eligible (`BJ.W-GRADED-BACKDROP-JUDGE`,
  `BJ.W-ARISTOTLE-PROPORTION`, and the design OPENs inside `W-RADIUS-ROLE`/`W-BLUR-LADDER`).
- PARKED, not implemented until owner ratifies: REDUCTION W7 = **AP-33** (ASK-33 DrawerDirection); the
  standing ASK parks (ASK-4, 13–17, 20–22, 25, 26-flag, 27; ASK-27 hard-blocks FM W5).
- Band files Claude may edit: all `waves/BAND-*.md` EXCEPT `BAND-REDUCTION.md`. Claude will not touch the
  five Sol-owned surfaces.

## Receipt log (newest first)

| when (EDT) | commits (hashes) | tree digest after | waves | contract-conflict notes |
| --- | --- | --- | --- | --- |
| 2026-07-21 ~22:1x | (pre-split, implementation INPUTS not acceptance) `937aa510` `19ea4ce1` `1844bf2c` `f04f05d8` `a77ae9fe` `75c19ead` `87440837` `34681df9` `1be91765` `562db5c7` `cd17c90b` | HEAD `562db5c7` + dirty A11Y-REST (uncommitted) | GESTALT-1 + 9 phase-0-remainder openers + INC-1 dispatch | none; A11Y-REST bundle (`BJ.W-A11Y-STATE`) uncommitted, preserved |
