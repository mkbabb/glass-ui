# Orchestrator note (2026-11-15 23:10): row 10's evidence has landed. BINDING for the first fix seat (or seat B if it has not returned), the critics and the close.

`docs/tranches/BL/audit/hover-shift/TABLE.md` (main checkout) now exists, with the gate `tools/shift-gate.mjs` beside it. Row 10's small CSS cures are exactly two, one commit each:
1. ToggleGroupItem keeps one font weight; selection is its fill and colour only (`src/components/toggle-group/styles.css:120` changes 500 to 600 on select, which widens a word-sized item). Witness: a word-labelled group's item boxes and its neighbours move 0 px on select and deselect, both engines.
2. `scale-on-hover` applies its lift only under `(hover: hover)`, so it does not stick after a tap on touch (`src/styles/utilities/btn.css:24`). Witness: at 390 with touch, after a tap the transform returns to none.
The dock's growth on hover is NOT this release: it is the redesign's (11.2.0). Do not touch it here.
