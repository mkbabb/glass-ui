# 10.1.6 critique, round 1: nothing broken, ready to tag

Seat: fresh critic, claude-fable-5-2, 2026-11-12, `release/10.1.6` at `f171d99e5` against the
`v10.1.5` tag. Every build and browser run went through `guarded`, one at a time, and every WebKit
run under `--exclusive webkit`. **None was refused.** No tag, push or publish.

The probe is this seat's own: `critic-1/` holds a harness with seven Sliders (scrubber, invalid
and spectrum on both axes, and a two-thumb range) and eight other keyboard controls, a spec that
focuses each with a real Tab from a sentinel and diffs the row's pixels with and without focus, and
the drivers. It ran on three trees: the branch, `git archive v10.1.5` and `git archive v10.1.4`,
with the probe files copied into the two archives. Records are in `critic-1/out/`
(`summary-ch.txt`, `summary-wk.txt`, `summary-wk-controls.txt`, `runs.txt`).

## Verdict by gate

| gate | result |
|---|---|
| (a) `src` diff holds only the cure | **pass** |
| (b) a focused Slider paints a mark under forced colors; plain styles equal v10.1.5 | **pass**, with two readings of "RED on v10.1.5" below |
| (c) no other control lost its forced-colors mark since v10.1.4 | **pass** for the eight measured; the dock is read, not measured |
| (d) `release-10-1-5` spec | Chromium **107 passed**; WebKit **107 titles pass as two processes** (106 in the whole pass, the 90th alone) |
| (e) version, typecheck, build, `verify:package` on the committed tree | **pass** |
| (f) CHANGELOG | **true and outward**, one wording note |

## (a) The source diff

`git diff v10.1.5..HEAD -- src` is one file, eight added lines: a rule inside the Slider
stylesheet's existing `@media (forced-colors: active)` block. `git patch-id` of `c496246f5` equals
that of `3aa871c28`, so the cherry-pick is the cure unchanged. Outside `src` the branch touches
`package.json`, the lockfile, `CHANGELOG.md`, `.bundle-ratchet`, and four new files under
`tests-visual/`. The spectrum arm of the new rule has the same specificity as the `outline: none`
rule above it and wins by source order.

## (b) The focused Slider

**Chromium, forced colors on** (changed pixels between the unfocused and focused row; "outside" is
outside the track's box, or the thumb's for the spectrum):

| row | v10.1.5 | branch |
|---|---|---|
| scrubber, horizontal | 0 changed | 1440 changed, 1396 outside, outline solid 2px at 2px |
| invalid, horizontal | 0 | 1440, 1396 outside |
| scrubber, vertical | 0 | 784, 740 outside |
| invalid, vertical | 0 | 784, 740 outside |
| range (two thumbs) | 0 | 1448, 1396 outside |
| spectrum, horizontal | 160 changed, 116 outside | 343, 299 outside |
| spectrum, vertical | 163, 117 outside | 345, 299 outside |

The branch's ring paints `rgb(55,51,109)` on `rgb(255,255,255)`, 11.3:1. On v10.1.5 the track
arms change no pixel at all: the defect, in paint, on both axes.

**The spectrum arm on v10.1.5 is not blank in paint.** Its thumb sets
`forced-color-adjust: none`, so forced colors do not drop its shadow ring, and it paints at about
2.2:1 (`rgb(176,175,174)` on `rgb(253,253,253)`). It is RED on v10.1.5 by computed outline
(`outline-style: none`, which is where the committed witness fails) and the branch replaces a faint
ring with a solid one. That is an improvement, not a cure of a blank.

**WebKit (Playwright 2287).** `forcedColors: "active"` makes the media query match and nothing
more: shadows are kept and nothing is recoloured (`box-shadow` stays set on the track in every
tree). So every arm already paints its shadow ring on v10.1.5 there, and the branch adds the
outline on top (scrubber horizontal 8016 changed pixels to 12316, vertical 3492 to 5856, spectrum
548 to 1193). RED on v10.1.5 in WebKit is the computed outline only. The outline's colour there is
`rgba(128,188,254,0.6)`, about 1.5:1 on the page, which matters little: Safari has no forced-colors
mode, so the cell proves the rule parses and applies in the engine, not that a user sees it.

**The committed witness, reproduced:** branch 3 passed in Chromium and 3 passed in WebKit; v10.1.5
3 failed in each, all on `outlineStyle` expected `"solid"`, received `"none"`.

**Plain (forced colors off), v10.1.5 against the branch, keyboard-focused:** every computed
property of the root, track, range and thumbs is equal, and the focused row's PNG is byte-equal, in
both engines.

| engine | rows | properties compared per row | differing | pixels |
|---|---|---|---|---|
| Chromium | 7 | 5036 to 6308 | 0 | equal |
| WebKit | 7 | 4824 to 6043 | 0 | equal |

A reading the release does not depend on: on v10.1.4 the scrubber's thumb has a computed
`outline-style: auto` under keyboard focus, and paints nothing. In Chromium the focused row
changes 0 pixels under forced colors, and in WebKit it changes exactly v10.1.5's count. A check
that passes v10.1.4 reads the computed outline. In Chromium's paint 10.1.6 is the first 10.1.x
where the default Slider shows a forced-colors focus mark.

## (c) The other controls

`git diff v10.1.4..v10.1.5 -- src` adds one `outline: none` (the scrubber thumb, the defect) and
removes one (the disclosure trigger, whose ring moved from a shadow to an outline). No
`outline: 0`, `outline-style` or `outline-width` suppression was added. Forced colors on, changed
pixels with keyboard focus:

| control | Chromium v10.1.4 / v10.1.5 / branch | WebKit v10.1.4 / v10.1.5 / branch |
|---|---|---|
| accordion trigger (disclosure) | 1644 / 1644 / 1644 | 5958 / 5958 / 5958 |
| segmented tabs, pill | 240 / 240 / 240 | 2818 / 2818 / 2818 |
| segmented tabs, underline | 327 / 327 / 327 | 3048 / 3048 / 3048 |
| dark-mode toggle | 704 / 704 / 704 | 3310 / 3310 / 3310 |
| input | 2345 / 2345 / 2345 | 11432 / 11432 / 11432 |
| button | 878 / 878 / 878 | 2034 / 2034 / 2034 |
| switch | 352 / 352 / 352 | 1156 / 1156 / 1156 |
| checkbox | 216 / 216 / 216 | 748 / 748 / 748 |

None lost its mark. (WebKit's plain Tab skips buttons, so its control rows were focused with
Option+Tab in a second run, `controls-*-wk`. WebKit renders at 2x.)

## (d) The release-10-1-5 spec on the branch

| run | result |
|---|---|
| Chromium, one process | **107 passed** (13.0 min) |
| WebKit 2287, one process, first | 106 passed, 1 timed out: "q2 O-187 at 1440", `page.goto` 60 s |
| "q2 O-187" alone, WebKit, 3 repeats of both widths | **6/6 passed** |
| WebKit 2287, one process, second | 106 passed, the same title timed out the same way |

The timeout is the navigation hang the 10.1.5 close recorded for the 90th test of a one-process
WebKit pass (`docs/release-10.1.5/critique-close-2.md`): a `page.goto` that never loads, before a
dock exists. It is older than this branch, and an eight-line rule inside a forced-colors media
block cannot reach it. The build seat's one-process pass at 16:07 got 107. Mine did not, twice.
WebKit's 107 titles pass as two processes, the form the 10.1.5 close accepted.

## (e) The gates on `git archive HEAD`

`dist` removed first, then release.yml's order: version = 10.1.6 exit 0, the `prepare` build
exit 0, `npm run typecheck` exit 0, `npm run build` exit 0, `npm run verify:package` exit 0
(terminal CLEAN, version 10.1.6, unpacked 2955683 = datum 2955683). My first pass ran typecheck
before any build and got exit 2: the test tsconfig resolves `@mkbabb/glass-ui/fourier-math` from
`dist`. CI's `npm ci` builds first, so that was my order, not the tree
(`out/gates-order1/`).

## (f) The CHANGELOG entry

Outward: no internal ids, one em dash in the heading and none in the prose, dated today. True:
the ring was a shadow on the track, 10.1.5 removed the thumb's outline, a focused default Slider
painted nothing under forced colors, and the branch draws a `Highlight` outline 2px out.

One wording note, not a break: "a focused Slider showed nothing there" holds for the default
Slider and its invalid arm. The spectrum Slider kept a faint shadow ring, because its thumb opts
out of forced colors.

## Outside the list

- The committed witness has no vertical cell and no range cell. This seat's probe measured both
  green.
- The dock's folded-face ring and its seats were read (10.1.5 gave the folded face an outline,
  which forced colors keep) and not measured under forced colors.
- Every forced-colors cell is Playwright's emulation. Chromium's drops shadows and recolours;
  WebKit's only flips the media query. A real Windows High Contrast session was not measured.
- "q2 O-187 at 1440" still hangs as the 90th test of a one-process WebKit pass.
- The dist-tag on npm reads `latest` 11.0.1, `release-10` 10.1.5, as the close says.

## How it ran

- `critic-1/tree.sh` (the archive trees, under `.cache/r1016c/`, deleted after), `cell.sh` (one
  Playwright process), `probe.sh` (the probe and the committed witness over three trees in one
  engine), `gates.sh`, `queue.sh`, `controls-wk.sh`, `r5-wk2.sh`, `summarize.py`.
- Ports 5361 (v10.1.4), 5362 (v10.1.5), 5363 (branch), 5364 (WebKit release spec). None is left
  listening.
- The first Chromium probe pass waited on a visible thumb and timed out on v10.1.4, where
  Playwright reads the scrubber thumb as hidden. The wait became "attached" and the pass was run again. One queue stop
  at 17:58 was a false match on the guard's warning text, marked in `runs.txt`.
