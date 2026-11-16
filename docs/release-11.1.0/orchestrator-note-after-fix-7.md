# Orchestrator note — rulings after fix 7 (2026-11-13 01:00). BINDING.

- **The seven D-1 cells in `tests-visual/release-10-1-3.spec.ts`** that assert a press on a collapsed dock's persistent seat expands it: the owner's later word governs ("A press on a persistent seat never expands the dock", orchestrator-note-daraksha.md, O-194). Restate those cells on this branch to the owner's rule (the press does not expand; every other assertion in them stays), with a comment naming O-194. This is a deliberate behaviour change of 11.1.0 and the CHANGELOG says so in consumer words.
- **A host's `--radius-dock: 1rem` hiding the cut cap**: accepted as designed; no change.
- **Lane L7's stall cell in WebKit (79/80)**: the cell asks for two frames inside the task; restate it so.
- The untracked capture outputs stay uncommitted; do not delete them.
