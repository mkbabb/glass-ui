# Hover shift audit: glass-ui v11.0.2

The owner's order: hovering a card or a dashboard item must not shift the main cards or vizzes. For the library: no hover, focus or pressed state may change its own layout box or a neighbour's. A lift or grow is a transform. Border width, padding, margin, font weight, font size, line height and content stay put on a state change.

Tree: `git archive v11.0.2` (docs excluded) at `tree/`, built with `tools/build-tree-hs.sh`, served by vite preview on 127.0.0.1:5441. Chromium is Playwright 1.61.1's headless shell, build 1228. WebKit is Playwright 1.60.0's build 2287 (`tools/pw160`), because Playwright 1.61.1 ships WebKit 2311.

## Counts

| | Chromium 1440x900 mouse | Chromium 390x844 touch | WebKit 2287 (failing cells and controls) |
|---|---|---|---|
| Routes | 92 of 92 | 92 of 92 | 14 (mouse) and 14 (touch) |
| Candidates found (interactive or state-styled) | 2,562 | 2,640 | 475 / 472 |
| Elements exercised | 718 | 737 | 324 / 324 (no signature cap) |
| ...of which took keyboard focus | 285 | 285 | 246 / 249 |
| Shell chrome through `shift-gate` (sidebar rail, bottom dock) | 26 | 13 (the rail is hidden at 390) | not run |
| SHIFT rows (below) | 5 | 5 | 5 (rows 1 to 4 in both cells; row 5 in touch only) |

Elements exercised per route: at most 30, interactive elements first, then cards, then anything a `:hover`, `:focus-visible`, `:active` or `[data-state]` rule targets. Each signature (tag, role, slot, classes) ran at most 3 times across the sweep, so a Button variant that sat still on three routes was not re-run on the other forty. Each element went through: hover, pointer away, keyboard focus, blur, press and hold, release, pointer away. The touch cell has no hover: press is a held touch, release is the tap.

The measured set per element: every glass, card, slotted or interactive element of the story region, its siblings and parents up to `#demo-main`, and the element's whole subtree. Measured per element: `offsetLeft/Top/Width/Height` summed up the offset-parent chain, `getBoundingClientRect`, the four border widths, padding and margin, `font-weight`, `font-size`, `line-height`, `display`, and client size for scroll containers. Elements that moved by themselves at rest (two snapshots 120 ms apart) were left out of that element's comparison.

Detector proof: `tools/probe-selftest.mjs` on a fixture with one known cause each. Chromium: padding, border width and font weight on hover, a hidden icon shown on hover, margin on `:focus-visible` and padding on `:active` all flagged; a `translateY(-6px) scale(1.2)` lift reported as transform only; the clean control silent. WebKit: the same eight verdicts as Chromium.

Bottom line: Card (every tier, `role=option` included), Button (every variant and size), Chip, Switch, Checkbox, Radio, Select trigger, Tabs and SegmentedTabs, table rows, interactive data-table rows and sort headers, Accordion and Collapsible triggers, Slider thumb, Command and menu rows, Number field, Surface, Metric, Alert, Timeline marks, and the demo's section-landing preview cards all hold their layout box on hover and focus in both cells. Five rows below move: three are one dock cause, two are a font-weight state.

## SHIFT rows

`dO` is the change in the layout box, as x/y/width/height in px. "Inside" means the element's own content; "neighbour" means an element outside it.

| # | Component | Route | State | What moved | By how much | Engine, viewport | Cause | Cure |
|---|---|---|---|---|---|---|---|---|
| 1 | GlassDock, vertical, collapsible | /dock/vertical ("Starts compact", "Starts open") | hover, focus (and the press that follows) | The dock's own box, and every ancestor up to the story section: neighbours below move down | dock height +215 (touch: +232); ancestors +215 and +120; seats inside move 64 down, 12 across; `padding-block` 8 -> 12 | Chromium 1440 mouse; Chromium 390 touch (focus, press) | Expansion is a reflow of the in-flow box: `useDockState.ts:385-406` (mouseenter -> `hover` after `HOVER_INTENT_MS` = 60 ms, `constants.ts:45`) and `:440` (focusin -> `hover` at once); `styles/layers.css:130-132` (`.glass-dock[data-morphing].vertical { block-size: var(--dock-expanded-px) }`, the reserved expanded footprint); `styles/morph.css:150-154` (`padding-block` morphs 8 -> 12) | Seat a collapsible dock in a box sized to its expanded footprint, or lift the plate out of flow inside a fixed seat, so expansion overlays and never resizes the in-flow box |
| 2 | GlassDock + DockLayerGroup, horizontal, `fit-content` | /dock/layers ("Collapse while switching layers") | hover, focus, press | The dock's own box grows on both axes; the next story section moves down | dock +204 wide, +52 tall; ancestor +52 tall; the next section's tabs and dock move 52 down | Chromium 1440 mouse (hover, focus); Chromium 390 touch (press: 48) | Same expansion as row 1; the horizontal arm pins only `padding-block` (`styles/morph.css:117-122`), but the layer group's vertical switcher makes the expanded dock taller than the collapsed circle, so the cross axis grows too; `styles/layers.css:127-129` reserves the expanded inline size | As row 1; and size the collapsed seat's block axis to the expanded layer group's height |
| 3 | GlassDock, horizontal, collapsible | /dock/overview (three demo docks), /dock/controls ("Docked") | hover, focus, press | The dock's own box widens around its centre; every seat inside moves | width +104 to +445 (touch: +112 to +184); seats move 69 to 242 left; `padding-inline` 8 -> 12. No neighbour outside moved, because each demo dock sits alone in a centred tile; a dock that shares a line with other content would push it | Chromium 1440 mouse; Chromium 390 touch (focus, press) | `styles/layers.css:127-129` (`.glass-dock[data-morphing]:not(.vertical) { inline-size: var(--dock-expanded-px) }`); `styles/morph.css:119-123` (`padding-inline` morph); triggers as row 1 | As row 1 |
| 4 | ToggleGroupItem | /forms/toggle, /substrates/glass-panel | the release that selects or deselects (and after) | The item's own `font-weight` | 500 -> 600 on select, 600 -> 500 on deselect; box 0 px at the demo's fixed-width items (B / I / U and icon toggles). A content-width item with a word label widens by the bolder advance and pushes the next item | Chromium 1440 mouse; Chromium 390 touch | `src/components/toggle-group/styles.css:120` (`.toggle-group__item[data-state="on"] { font-weight: 600 }`) | Keep one weight in both states; mark selection with fill and colour only (already present on lines 118-119), or reserve the bold width with a hidden bold copy of the label |
| 5 | Demo TOC item (not a library component) | /navigation/toc-tracking | the release that makes a section current | The item's own `font-weight` | 400 -> 500; box 0 px (the button is `w-full`), the label's glyphs reflow | Chromium 1440 mouse; Chromium 390 touch | `demo/stories/navigation/toc-tracking.vue:137` (`'bg-primary/10 text-primary font-medium'` on the current item) | Drop `font-medium` from the current state; colour and fill already mark it |

Rows 1 to 3 are one cause: the collapsible GlassDock expands on hover or focus by resizing its in-flow box. Its after-hover and after-focus boxes did not return within the 1.2 s settle, because the dock folds only after `DOCK_COLLAPSE_DELAY_MS` (6 s, `constants.ts:53`): the dock holds the reflowed size for 6 s after the pointer leaves, then reflows back.

WebKit 2287, the same routes again (the five above plus /dock/controls and the controls /display/card, /display/buttons, /navigation/tabs, /forms/chip, /data/table, /forms/checks, /containers/accordion):

- Row 1: reproduced, mouse and touch. Hovering a seat of the collapsed vertical dock expands it: dock +215 tall, its ancestor +215, seats 64 down (touch focus: the same, +232 in Chromium touch).
- Row 2: reproduced, mouse hover: the dock +207 wide and +52 tall, the next section's tabs 52 down. Touch: focus on a layer tab moves the tabs by the same 52 px as the dock folds and opens.
- Row 3: reproduced, mouse hover and focus on /dock/overview and /dock/controls (+129 to +445 wide); touch focus.
- Row 4: reproduced, mouse and touch: `font-weight` 500 -> 600, matched rule `.toggle-group__item[data-state="on"]`.
- Row 5: reproduced in touch (400 -> 500); in mouse the click did not make a new section current, so nothing changed.
- Controls: Card, Button, Tabs, Chip, table rows and Checkbox/Radio/Switch held their boxes in both cells, as in Chromium.


Crops, one rest and one during per cited row, in `crops-cited/`:

| Row | Rest | During |
|---|---|---|
| 1 (hover) | `S2-dock-vertical-hover-rest.png` | `S2-dock-vertical-hover-hover.png` |
| 1 (focus) | `S5-dock-vertical-focus-rest.png` | `S5-dock-vertical-focus-focus.png` |
| 2 | `S3-dock-fitcontent-hover-rest.png` | `S3-dock-fitcontent-hover-hover.png` (the next section is 52 px lower) |
| 3 | `S4-dock-horizontal-hover-rest.png` | `S4-dock-horizontal-hover-hover.png` |
| 4 | `S1-toggle-group-selected-rest.png` | `S1-toggle-group-selected-click.png` |
| 5 | `S6-toc-current-weight-rest.png` | `S6-toc-current-weight-click.png` |

## Changes that are not shifts by design, listed apart

- Accordion and Collapsible: the click that opens a panel (`display: none -> block`) grows the item by 23 to 104 px and pushes the items below. That is the disclosure itself, not a hover effect. Hover and focus on their triggers moved nothing.
- Slider: a press on the track sets the value there, so the thumb and range move (forms/slider, display/music-staff, data/timeline playhead). The thumb's own hover and press moved nothing.
- Timeline (/data/timeline): hovering or focusing a mark swaps the detail panel's text (adds "· hover"); the panel keeps its 588 x 85 box (300 x 78 at 390). No box moved. Worth knowing because the text under the pointer changes.
- Curve gallery (/motion/curve-gallery): hovering the reveal panel shows a 16 px replay icon; no box moved.
- CTA receive (/dock/cta-receive): "Reveal seat" adds two captions and a Replay button after the pointer leaves; no measured box moved.
- Constellation (/substrates/constellation): pressing the field changes the status pill's text ("settled"), which resizes it by 6 to 7 px; the pill is absolutely positioned, so nothing moves around it.
- Story code block (/display/card, WebKit only): the copy-status caption shrank by 121 px while the next element was hovered or focused. That was the previous target's press on the copy button clearing its message on a timer, not a hover effect; its `margin-inline-start: auto` absorbed the change, so nothing beside it moved.
- Dock auto margins: on many dock routes the resolved value of the dock's `margin: 0 auto` (`styles/shell.css:130`) flips, for example 410 px -> 0 px, while its box stays put. Not a shift; `shift-gate.mjs` ignores a margin-only change on an element whose box did not move.

## Moves by transform

Largest per element and state; px are the change in the transformed rect (dx/dy/dw/dh). Hover lifts are small. The only overlap over 2 px is the CTA fly.

| Size | Element | Route | State | Rect change | Note |
|---|---|---|---|---|---|
| 262 px | CTA button flying into the dock | /dock/cta-receive | release (tap), 390 touch | 137.9/262/-120/3.8 | Overlaps a neighbour by 42.7 x 47.8 px while it flies; the CTA-receive animation by design |
| 150 px | same | /dock/cta-receive | release, 1440 | 127.1/150.3/-110/3.5 | Overlaps a neighbour by 38.9 x 43.5 px |
| 35 px | dock layer tab button | /dock/layers | after a tap, 390 | 35/0/0/0 | The tab slides with its layer switch |
| 20 px | Switch thumb | /substrates/constellation | release | 20/0/0/0 | The thumb's travel |
| 13 px | Demo TOC item | /navigation/toc-tracking | release, 390 | 0/13/0/0 | Follows the list's scroll to the current section |
| 8.3 px | Button (large, tap-squish) | /compositions/auth-shell | press | -8.2/2/16.5/-3.9 | The press squish: wider and shorter about its centre |
| 6.3 px | Card `role=option` | /display/card | press | 6.2/2/-12.6/-4.1 | Press scale-down |
| 6.3 px | infinite-scroll row | /data/infinite-scroll | press | 6.2/1.1/-12.5/-2.1 | Press scale-down |
| 5.8 px | Command item | /containers/command | press | 5.8/-0.4/-11.6/-1.3 | Press scale-down |
| 5.5 px | Collapsible trigger Button | /containers/collapsible | press, 390 | -5.4/1.9/10.9/-3.9 | Press squish |
| 4.0 px | Chip, selected | /forms/chip | release | -4/-1.3/8/2.6 | Selected chip scales up 4 px a side; no overlap measured |
| 3.6 px | `scale-on-hover` tile | /foundations/css-utilities | hover; also after a tap on touch | -3.6/-3.6/7.2/7.2 | The hover is not bracketed in `@media (hover: hover)` (`src/styles/utilities/btn.css:24`), so on touch it sticks after a tap |
| 1.8 px | Button (every variant, default size) | /display/buttons and others | press | -0.9/1.8/1.8/-3.6 | Press squish |
| 1.0 px | `glass-card` demo tile, colour tile | /foundations/shadows, /foundations/colors | hover | -1/-1/0/0 | The 1 px lift |
| 1.0 px | Command item | /containers/command | hover | 0/-1/0/0 | 1 px lift |

No hover transform made its element overlap a neighbour by more than 2 px.

## What did not run

- WebKit ran only the 14 routes above, not all 92. The exclusive WebKit lock was free within 6 minutes; the 92-route sweep was left to Chromium to keep the shared lock short.
- The 3-per-signature cap: the other 1,844 Chromium mouse candidates and 1,903 touch candidates were the same component signature already exercised 3 times, or past the 30-per-route cap. No route hit its 150 s time limit.
- 79 elements per cell were covered by another element at their centre; the pointer went to the centre anyway and the state may have landed on the cover.
- Hover on touch: there is none to test; the touch cell ran focus, held touch and tap.
- The dock's 6 s fold-back was not awaited, so "returns to rest" is unproven for the dock beyond the source's `DOCK_COLLAPSE_DELAY_MS`.
- Dark scheme, reduced motion and other viewports were not run.
- Badge was not exercised: it is not interactive and no state rule targets it, so it cannot shift on a state change.
- Overlays (dialog, sheet, popover, menu contents) were measured only as far as they sit inside `#demo-main`; portalled content was not measured.

## Files

- `tools/shift-gate.mjs`: the release gate. One URL per run; exit 1 on any layout shift, listed with the matched state rule. `~/.claude/guard/guarded --timeout 10 -- node tools/shift-gate.mjs http://127.0.0.1:5441/<route> --engine chromium [--cell touch390] [--root <css>] [--json out.json]`.
- `tools/inpage.js`, `tools/lib.mjs`: the measuring kit and the state driver both scripts share.
- `tools/probe-shift.mjs`: the sweep; `tools/batch-chromium.sh`, `tools/batch-webkit.sh`, `tools/batch-shell.sh`: the runs as made.
- `tools/probe-selftest.mjs`: the detector proof. `tools/probe-crops.mjs` with `tools/cases-fine.json`: the cited crops.
- `tools/report.mjs`, `tools/magnitudes.mjs`: fold the rows into this table.
- `tools/build-tree-hs.sh`, `tools/serve.sh`, `tools/probe-routes.mjs` (route table in `tools/routes.json`).
- `tools/pw160/`: Playwright 1.60.0 for WebKit 2287; its `node_modules` was deleted after the run (`npm i playwright@1.60.0` there restores it; `HS_PW=160` selects it).
- `tree/`: the v11.0.2 source as archived; `node_modules`, `dist` and `dist-demo` were deleted after the run.
- `rows/*.json.gz`: one JSON row per route per cell, every exercised element with its states.
- `logs/`: run logs and the folded reports.
