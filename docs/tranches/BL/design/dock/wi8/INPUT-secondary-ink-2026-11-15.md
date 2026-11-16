# Clarification of RU-44 (orchestrator, 2026-11-15, on atlas's question): a secondary word inside a dock

RU-44 removes dimmed ink inside a dock. Atlas asked what a secondary word then is (a label beside a value such as "View" before "Contracted bandwidth", a hint under a row).

Ruling: every word in a dock is the dock's full ink. Hierarchy comes from weight and size (the label a step lighter in weight or a step smaller, the value at the seat's normal weight), never from opacity or the muted colour. A state is not ink: "not current" is the absence of the mark, and "disabled" is the one dimmed case, held at 3:1 or above against the plate over a busy field. G-15 reads secondary words at 4.5:1 like any other word.

Also from hassio (O-377, LF-1): a dock's geometry must not shrink with the host's root font size (Home Assistant's root is 14px, so rem sizes draw at 87.5 %). Input to the pass after the sixth: the dock's sizes multiply one base-size token that a host can set in px.

## Added 2026-11-16 (hassio LF-3, LF-11, LF-12; asks read-only at `~/Programming/hassio-config-worktrees/apx-ui-r11/docs/restart/apotheosis/tranches/T6/r12/asks/`)

- LF-11: a `DockTrigger` in a run is not the run's seat: it takes its own geometry (148 x 31 beside 44 px tab seats) and the selected plate follows the trigger's box. A trigger in a run takes the run's seat height and padding.
- LF-12: a run that scrolls shows no cue at its cut: the seat past the cut is hard-cut at the clip. The README promises end caps that show which way more seats lie. Rule the cue (a fade at the cut end, never a hard slice through a glyph) with the many-seats rule.
- LF-3: with RU-45.
