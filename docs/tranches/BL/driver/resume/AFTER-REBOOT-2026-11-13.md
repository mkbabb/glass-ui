# After the reboot (zone stop, 2026-11-13 04:09)

The guard refuses every heavy and browser run: `data.kalloc.1024` at 8.05M (stop at 8M). Only a reboot releases it. Nothing was tagged in the stop.

Resume each run from its journal with `Workflow({scriptPath, resumeFromRunId, args})`; add a RESUME note for the seat that was live, saying: the refusal was the zone stop, not a fault; start with git status and git log in the worktree; keep what is committed or recorded; finish what the record lists as not run.

| Run | Script | Run id | Args | Seat live at the stop |
| --- | --- | --- | --- | --- |
| 11.1.0 | `glass-11.1.0.js` | `wf_4cf2d226-a00` | `resume/glass-11.1.0-after-reboot.json` | critic 7 (`critic-1110-7`) |
| 11.0.2 | `glass-11.0.2.js` | `wf_fc090cc6-e88` | `resume/glass-11.0.2-after-netdrop.json` | critic 2 (`critic-1102-2`) |
| dock design | `bl-design-dock-wi8.js` | `wf_512d6887-e62` | none | challenge (`dock-challenge`); the prototype's WebKit half, the dock unit and release specs, and the overlay-close cell never ran (PROTOTYPE.md "not done") |

Binding notes already in the worktrees: `release-11.0.2/docs/release-11.0.2/orchestrator-note-*.md` (after-build-C, after-critique-1, dock-fold-content, slider-geometry, ci-browser-free, dock-hover-shift), `release-11.1.0/docs/release-11.1.0/orchestrator-note-*.md` (after-fix-7, ci-browser-free, mark-box, merge-master).

Done and committed: 10.1.6 published; the motion study (W-B.17), the Slider loop (W-B.18), the animation audit (AUDIT.md, O-311 to O-335); CI browser-free with sparse checkout on master (2 min 20 s). Owed next: 11.1.1's driver (scope in `glass-11.1.1-scope.md`) once 11.1.0 closes.
