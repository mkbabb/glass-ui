# Orchestrator ruling (2026-11-12 09:50 EST, Fable) — the gliding mark's box, and how the master merge gets done. BINDING.

Fix 6 was right to stop: on the merged tree the horizontal run's `::before` is claimed twice (11.0.1's leading reserve box, and this branch's gliding mark).

## Ruling

1. **11.0.1's reserve boxes are published and keep `::before` and `::after` of the run.** They do not go back to padding and nothing else rides them.
2. **The mark gets its own box: one library element.** The run renders a single `<span class="dock-run-mark" aria-hidden="true">` (inert: `pointer-events: none`, no tab stop, out of flow, `position: absolute`), only while the run is marked. It takes exactly the rules the `[data-run-mark]::before` has today (the same custom properties from `useDockRunMark`, the same glide, the same `@property` registrations); nothing about the mark's paint or motion changes. Not the current seat painting itself with a FLIP translate: that adds a second mechanism per seat and collides with two existing `::before` users.
3. **A mark is not a seat, said in ONE place per language.** CSS: the seat selector is `.dock-run > :not(.dock-run-mark)` wherever a rule today says `.dock-run > *` (run.css has a handful; change each, and the `:has(> *)` gate of the reserve boxes becomes `:has(> :not(.dock-run-mark))`). Script: one exported predicate (`isRunSeat(el)`) used by every enumeration of `run.children` (`dockMorphMeasure.ts`, `useDockRun.ts`, the roving count, snap targets). No other exclusion list.
4. **Witnesses for the move** (both engines): the mark's lane and fix witnesses unchanged and GREEN (it paints and glides as before); a marked horizontal run keeps both reserve boxes in flow (their computed inline sizes equal an unmarked run's); the mark is not a snap target, not in the roving order, not counted by `data-run-fits`; scrollWidth equals clientWidth on a marked run that fits.

## How the merge gets done

- **A critic that reads this while the branch does not contain v11.0.1 (`git merge-base --is-ancestor v11.0.1 HEAD` fails) files ONE defect, titled "MERGE: master (v11.0.1) is not merged", severity blocking,** in addition to anything else it finds, so the driver runs a fix seat. It still judges the rest of its list on the branch as it stands.
- **The next fix seat does the merge FIRST,** by `orchestrator-note-merge-master.md` and fix 6's conflict readings (fix-6.md, "Read on both sides"), with the mark moved to its element as ruled above as part of the same merge record, then the battery that note lists, then its other defects. Budget the WebKit lock: 11.0.2 shares it.
- Rounds before the merge do not count toward the two clean rounds.
