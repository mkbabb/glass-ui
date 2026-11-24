# BM-2: the plate's strengths

| field | value |
|---|---|
| release | the dock-redesign minor (BL's W-I.8, with W-B.17's plate) |
| status | planned |
| rests on | choice 5, C: recommended by the study's final pass, and it ships under the owner's ratification (IN O-426) unless he sends another letter (D§6.2; D§14.1 item 1; A10-4, B10-13) |
| DESIGN | §6.2; with §5.1 (the press), §7.3 (the seat's plate) and §10.6 |
| starts from | W-B.17's `src/styles/glass/plate.css` on `bl/intent/proto`, and its two tokens, `src/styles/tokens/color-radius.css:156-157` there (`--fill-hover: 0.05`, `--fill-selected: 0.12`) |
| page | P10-plate, letter C (repaired by the pages seat: strengths by `opacity` over one fill, the glyph still, a still of each letter) |
| gates | G-2, G-3, G-5; G-4 on the dock-redesign minor's candidate |
| depends on | W-B.17's plate in the same minor; BL's row for the on-mark attribute (BM.md §8) |

## What it builds

The plate is W-B.17's: one flat fill on the control's own `::before`, at one strength, with `opacity` carrying every lighter state, so no colour ever transitions (W-B.17 R-1). BM-2 sets its two strengths and the tone it carries.

- **Two rungs.** The light strength (hover) is 6.5 % of the control's tone in light and 5 % in dark. The full strength (on: current, open, pressed) is 10 %. They are `--fill-hover` with a dark value and `--fill-selected`. There is no third rung: a press on a control already on is answered by choice 9's shrink, or in a dock by the dock's own 2 % layer.
- **The tone.** A tinted seat's plate takes its own tone (`--plate-tone`), and its glyph keeps its colour. A hover then runs two legs, the plate's fade and its growth (W-B.17 R-3), and a hovered glyph never outshines the current seat (law 10).
- **No drawn shape.** No outline or ring answers a hover (restraint, Shading).
- **The on-mark attribute.** The plate reads one attribute, BL's row, with which a control whose glyph is its on-mark keeps only its hover and focus answers: no on fill from `aria-pressed`, no press tone and no shrink. Without it W-B.17's on-list (`plate.css`, "On, held", which takes `[aria-pressed="true"]`) would rest such a control at the full strength in dark mode. Its first reader is BM-1's toggle. fourier's own toggle (`web/src/components/layout/DarkModeToggle.vue:31-34` on fourier `origin/master`, a `DockControl` with `aria-pressed`) is a second, and its message asks it to set the attribute.
- **The six other readers.** `--fill-hover` and `--fill-selected` are also read by Button, Card, the Configurator, SortableList, Timeline and the control bit (`git grep` on `bl/intent/proto`: `components/button/styles.css`, `components/card/styles.css`, `components/configurator/styles.css`, `components/sortable-list/styles.css`, `components/timeline/Timeline.vue`, `styles/glass/control-bit.css`). They move with the ladder, and the strip shows each one before and after.

## Inputs folded

- **The specular rest light** (S112, the pointer-light section; IN O-431). 11.1.2 takes the pointer-following light off every surface and keeps a state's rest light "until the dock redesign shows selection by fill steps". BM-2's full rung is that fill step. BM writes no specular rule: the rest light's removal is the redesign's, and BM-2's strip (the current seat and an on Switch at 10 % with the rest light off) is what that removal reads.
- **The one-level colour rule** (IN O-436 (1)). The tone is the seat's own token at one `opacity`; no plate token is a `color-mix()` of mixed tokens.

## Bytes

Two token values and one dark value, with no new rule (`study/pass-10/ledger/ledger.json`, "the plate at the recommended ladder": 0 B). It reaches every dock site.

## Proof

In headless Chromium and Playwright WebKit, through `guarded`, on P10-plate's C and on glass's demo dock (Home current, then three tinted seats):

- each strength drawn by `opacity` over one fill: one computed `background-color` on the plate across rest, hover, on and press, and only `opacity` changing;
- a hover runs two legs at most, and a tinted seat's glyph keeps its computed `color` on hover;
- the hovered seat against the dock ground at 1.1 or more in every cell of BL's `design/dock/wi8/MEASURE-9.md` S4 grid, read once on the build (a proof reading, not a gate);
- the toggle and fourier's toggle in dark: no on fill;
- the six other readers' strip, light and dark, 390 and 1440;
- under forced colours the plate draws nothing of its own; under Reduce Motion the hover is the fade alone;
- G-2, G-3 and G-5.

## Sites it serves

Every dock site: atlas, value.js, daraksha, fourier, keyframes, gaggle and Home Assistant, and slides once it moves to 11. None changes anything; fourier sets the on-mark attribute on its own toggle.

## Not this wave's

The plate itself (W-B.17); the rest light's removal (the dock redesign's); the seat beside the dock (W-I.8's R-12); the toggle's face (BM-1).
