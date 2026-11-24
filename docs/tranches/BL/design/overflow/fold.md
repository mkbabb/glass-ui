# Horizontal bounding: the fold

Folded 2026-11-23 by claude-opus-5-5. Each objection in `critique.md` was re-read against `release/11.1.1` (4f1fa667e) and measured again on builds from one tree (`git archive` of the release, its own git root): the base on port 5391, v3 (the patch the critique read) on 5394, and v4 (the patch after this fold, now `cure.patch`) on 5395. The critique's compositions are on the stress page under `/ovf.html?fold` (`tools/app/Stress.vue`).

Engines: **Chromium** is Playwright's Chromium headless shell 149.0.7827.55. **WebKit** is Playwright's WebKit 26.5, which is not Safari; it read the base, v2 and v3, not v4. **Safari** was not run. A number with no engine named is Chromium's.

## Rulings

| | ruling | reason |
|---|---|---|
| B1 | accept | v3 on the fold's cells: a Table of Chip and Button cells stops scrolling (327/300 → 300/300) and stacks "Download" on 3 lines and each Chip on 2; four Buttons in a 240 px row go from 1, 3, 1, 1 lines to 8, 10, 6, 6 at 390 touch and 6, 5, 5, 5 at 1440. v4 keeps `anywhere` for the rows a plate gives its width to and both cells read as the base. |
| B2 | accept in part | The tab has no inline floor and no `data-control-target` (source), and v3 cut all eight tabs to 32.6 px with every label clipped. v4 does not add the floor the critique proposes: the strip takes the dock run's form, bounded by its box and panning its own tabs, each tab whole. |
| M1 | accept in part | Atlas's filter UI imports no SegmentedTabs, dock or Chip, and its option rows are ToggleGroup, Select and Switch, so the owner's case is the ToggleGroup item. The 263 px item did not reproduce: at atlas's own caption size the three labels are 189 to 207 px in the 235 px field and nothing pans. A 50-character label does pan the body (56 px at 390 touch, 32 at 1440), and v4 wraps it. |
| M2 | accept | 311/300 and an 11 px pan in a 300 px unpadded scroller, base and v4, both cells; 300/300 with 16 px of inline padding. Filed as a fault (F7) at `glass-chip.css:27-28`; its cure changes the selected Chip's look, so it goes to the owner with two options. |
| M3 | accept | A three-seat run with `data-run-fits` reads 196/192 (213/209 at 1440) and pans 4 px, base and v4. A run that hides nothing is not a long strip, so it is a fault (F8), value.js's first item; its cure goes with value.js's items, as placed. |
| M4 | accept | EasingPicker, CarouselPager and DockLayerGroup had no mount. The fold page mounts all three in a 300 px and a 200 px column; they were read in the witness and in all four probe passes, and §0 says how coverage was counted. |
| m1 | accept | The track shrinks 300 → 256 px at 390 touch and 936 → 912 at 1440. §1.4 states it and the rule behind it: a hit target past the part's own outer box is the fault, wherever it is. |
| m2 | accept | The Sheet comments now say that a row that can shrink lays out at the rung's width and that a row with a fixed minimum wider than the rung is still cut by the plate's paint containment. |
| m3 | accept | §1.7 and §4 say what was measured, not how the engine decides. Re-reading the probe for this found its vertical swipes began 120 px below a box's centre, outside any box shorter than 240 px; the v4 runs start each one on the box. |
| m4 | accept | Moot under v4: the tab no longer clips, so a slotted icon, label or count shows whole. |

## What the fold changed

**`cure.patch` (v4).** Against v3:

- `tabs/styles/segmented.css`: the columns go back to `1fr` and the tab loses `overflow: hidden` and `text-overflow: ellipsis`. The strip takes `max-inline-size: 100%`, `overflow-x: auto`, `overscroll-behavior-x: contain` and `scrollbar-width: none`, the dock run's form. The selection engine already scrolls a selected tab into view (`useSelectionGroup`) and the indicator already measures through a scroll (`useSelectionIndicator`).
- `typography/semantic.css`: `anywhere` reaches only `.glass-menu-row` (menu and Command rows), `.disclosure-group-trigger` (the Accordion trigger) and the Select trigger. `.label` joins the `break-word` surfaces. Buttons, Chips and toggle items keep their words, and the comment says why.
- `sheet/styles.css`: both comments reworded (m2).
- `toggle-group/styles.css`: the comment says the label wraps between words.

**Re-witnessed** (Chromium, base against v4, 390 touch and 1440 light, and 390 touch dark for the Filters drawer): every F1, F2, F2b, F2c, F3 and F4 case, and the fold's cells B1, B2, M1, M2, M3, M4. v3 was read again on B1 and B2. WebKit did not read v4: the run waited 22 minutes for the machine-wide WebKit lock, behind other sessions' WebKit runs, and was stopped. WebKit's readings of v2 and v3 stand for the rules v4 kept from them (the Sheet, Dialog and Toast columns, the tooltip cap and the Timeline reserve); the v4 strip, the narrowed line law and the fold page were read in Chromium only. The v4 sweep ran on the 22 cure routes at 390 touch and 1440 in Chromium only, with the probe's vertical swipes starting on each box.

What v4 gives up against v3: a Button, Chip or toggle item whose label is one word wider than its container (the stress page's 55-character file name) runs past it again, as in the base. The stress drawer still pans for that reason: its fourth Chip holds the file name (292/267, 25 px at 390 touch; 415/342, 73 px at 1440). STUDY.md and SITES.md say where such a value belongs, and STUDY.md gives the cure that would keep both: the label in its own box with no minimum, the control capped at its container. That changes the parts' markup and is not built.

**SWEEP.md**: the coverage line (M4), F1's cure and readings (B2), the line law (B1), the owner's case named as the ToggleGroup item (M1), F7 (M2) and F8 (M3) moved out of the designed readings, the Timeline's cost (m1), §1.7 and §4 (m3), the v4 sweep table, and the notes to atlas and value.js.

**Tools**: `measure.js` names an overfull SegmentedTabs strip a declared strip; `probe.mjs` and `inspect.mjs` start a vertical swipe on the box; `families.mjs` reads v4 and files the Chip's scale as F7; `plans/witness.mjs` holds the fold's cases; `probe-group.sh` groups G, W and P are the fold's runs; H, the WebKit run of v4, was stopped while it waited for the lock. `check-overflow.mjs` is new: the check the sites run, tested on the base and v4 stress pages (`tools/check-selftest.sh`, `record/check/`).
