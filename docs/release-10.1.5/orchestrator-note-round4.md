# Orchestrator note for critic round 4 and later (2026-11-05)

Fix round 3 (`3062a3a61..c67955100`) cured the WebKit coarse-390 e3 ring clip with TWO mechanisms:
1. `--dock-run-step-inline: 1px` added into `--dock-run-reserve-inline` (`run.css`), justified as WebKit's whole-pixel scroll offset;
2. a scrollable `::after` spacer for the trailing reserve on the horizontal run (`1ed0a4607`, `082359cd1`), justified as WebKit counting a flex scroller's end padding as overflow only once the seats pass the padding box.

Read both adversarially (repo law: KISS, one mechanism per fact, no masking constant):
- With the spacer in place, is the 1px step still needed? Remove it in a scratch build and re-run e3 and e4 in WebKit 2287 and Chromium. If the spacer alone holds, the step is a second mechanism for one fact and is a defect: report it.
- If both are needed, the record must say why, with the reading.
- Source comments: the run.css comment carries a process id ("[10.1.5 fix round 3, the fix-2 WebKit e3 cell]") and struck-through prose ("~~the bare ink~~"). Source comments state what the code does, never its history or a tranche id. Report each such line as a defect (low).
- The branch history has an attempt, a revert, a revert of the revert, and a reapply (3062a3a61, b95cd0540, 759ffcbe8, d2b14b41f, 072aebf73). That is not a defect in itself: the release tag is what ships. Note it, and judge only the tree.
