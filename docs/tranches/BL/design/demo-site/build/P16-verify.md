# P16, the verify

Seat: claude-opus-5-5 (asserted from the seat's own identity; Fable is out of quota until 2026-11-21, so this verify runs on Opus by the owner's standing ruling). 2026-11-17. Read only: no browser was run and nothing in the repo was changed except this file. `shots/P16/contact/` is empty (the power hold stopped the build's chain before its contact step), so the P16 sheets were rebuilt here from the banked tip crops with the build's own script (`.p15/contact.py`, Pillow, under `guarded --light`) into the session scratchpad, with four zoomed or diffed comparisons. None of them is banked; the command is `python3 -I .p15/contact.py shots/P16/tip <out> .p14/out/routes.txt`.

Read: `P15-verify.md` (released holds 1 and 2), `P16.md`, the two demo commits on `bl/demo` after the fast-forward to master `3a9fbbed3` (`b9cf75f7a`, `86e4e6fc1`) and their diffs, the checker commit `8a0ff5679` (scope only), every file under `shots/P16/` (`look-p15/`, `look-tip/`, `lift/` with `unclip/` and the ring pair, `bite/`, the tip crops of the changed routes and of the StageSwap routes the lift names, `tip/check-*.txt`, the sweep texts, `tip-run.log`), and the rebuilt sheets beside `shots/P15/contact/`. Judged against `OWNER-ORDER.md`.

## Verdict

**Merge.** No page is broken, empty or worse than P15. The Section Rail page carries three figures over a line that fills its card, where P15 left three quarters of the card blank. Dialog's trigger draws its whole focus ring after Escape, and the shadows the clip cut flat (Empty States, Command, Music Staff, Surface, Dialog's Delete) draw whole. The one regression found is small and sits on the `/dock` index: the Section Rail card's specimen is about 4 % smaller than at P15, which contradicts P16.md's "the index card is as P15 left it". It does not hold the merge.

## `src/`

Untouched. `git diff --name-only master...bl/demo` lists three files, all under `demo/`: `chassis/variants/StageSwap.vue`, `stories/data/timeline.stage.vue` (its comment only) and `stories/dock/rail.stage.vue`. Master has moved nine docs-only commits past `3a9fbbed3`, and `git merge-tree --write-tree master bl/demo` is clean. The checker commit touches only `driver/demo-site/check.mjs`.

No test reads the changed files: `rg` over `tests/` finds no StageSwap or `rail.stage` reference, and the gates that walk the tree (`trap-gates`, `token-hygiene`) walk `src/` only. That bounds what the unrun vitest and export gate could find.

## Item 1, the Section Rail

**As built** (the diff): `.rail-board` is a flex column with the P15 figures grid, then `.rail-trend` (`flex: 1 1 0`, a size container) holding one SVG polyline in `--foreground`, 2 px, non-scaling, on a 70×28 board scaled to its own range. The line cross-fades on the library's `fade`, keyed by the section, and hides under 4rem of its own height. Each section's line ends at its headline: Regions 115 (31 + 58 + 26), Schools 2,612 (1,480 + 560 + 572), Overview 1.5 (Students 1.5M), Growth 1.2 (Enrolment's delta), Notes 24 (Open). The line agrees with the figures above it.

**As the owner sees it:**

- **1440** (`tip/dock_rail-{d1440,l1440}.png`, `look-tip/`): the title, three figures, then a line climbing across 678×271 of the card. It reads as a section's dashboard, headline figures over their trend, and it reads as part of an app. Against `look-p15/dock_rail-d1440.png` (three numbers over a blank plate) it is the change P15-verify asked for. The context still answers the dock: a press swaps the figures and cross-fades the title and the line.
- **390** (`look-tip/dock_rail-m390.png`): the stacked figures, then a 226×187 line to the card's foot. P15 left the lower half blank.
- **Would a visitor miss it?** Yes. The line is one element and paints no word; without it the card is P15's blank plate. It is the barest chart possible: no axis, no year, no end value, and its own-range scale draws Overview's 1.44 to 1.50 as a full-height dip. Nobody reads values at demo scale, and it reads as a trend. Not a defect, and not something to add words to.
- **Siblings:** Section Rail and Figure Tools now both draw lines on their pages. They stay distinct: one large line under three figures beside a vertical rail, against three small labelled line cards under a horizontal tool row. On the index the Rail's line is hidden, so the ten cards keep ten forms (D5b: one bar figure, Dial Bar).
- The right third of the 1440 stage beside the column Card stays blank, as at P15 (the Card caps at 44rem). Not P16's change.

**The `/dock` card, the one regression.** Tile against tile, the rebuilt `/dock` sheets match P15's within noise except inside the Section Rail card (367 pixels over 40/255 at 1440 dark, 287 at 1440 light, in the 0.625-scale tile; the change's bounding box lies inside that card in both themes). Both tiles zoomed 4× at the same scale (scratchpad `tilezoom.png`) show the whole specimen smaller: the rail's pill measures 235 → 227 px in the zoom (0.966) and the figures' digits are shorter. The three figures also sit higher and closer together, and the blank under "26" grows from about 17 to 23 px at 1440.

The dock pill sits outside `.rail-board`, so only the card's fit scale can have shrunk it. `SectionPreviewCard` scales each specimen to fit (`fit = min(1, box.clientWidth / w, box.clientHeight / h)`, `SectionPreviewCard.vue:31`), so the specimen's natural size grew. The likely cause, from the code: the new `gap: var(--sp-5)` and the `.rail-trend` slot, which keeps its flex share when its line is hidden and is the blank under the figures. At 390 the card's visible part is unchanged (9 pixels differ in the whole `/dock` crop, `look-tip/dock-m390.png` against P15's sheet), because its lower half sits below the fold.

**Witnesses.** D6 on P15 reads 0.735 / 0.735 / 0.475 and on the tip 0.023 / 0.023 / 0.015, against a bound of 0.15. The polyline spans 1/28 to 27/28 of its box, so D6 passes whenever the line shows. It witnesses that the line shows and fills, nothing more. D1, D3 (the Card's rect in all four dock states), D4 and D5 pass in each cell. The line's fade is unmeasured (`railfade`, owed); it is the transition the title uses, whose legs D2 grades.

## Item 2, the focus ring

**The code.** `travelling` is set when the height animation starts and cleared on the finish or cancel of the current run only; the style is `.stage-swap[data-travel] { overflow: clip }`. Read against the four ways it could fail:

- The flag is set synchronously after `el.animate()`. Vue patches the attribute in the next microtask, before the first animated frame paints, so a travel never paints unclipped.
- A newer travel cancels the older. The older's cancel handler finds `travel !== run` and leaves the flag set.
- The animation has no fill, so when the flag clears the box is at its auto height, which is its content's height. At that moment only rings and shadows reach past it.
- Out-in mode: the leaving pane fades out alone in an auto-height box and never shares the stage with the entering one. No leaving pane can show. `overflow: clip` makes no scroll container, so lifting it adds no scrollbar; checker line 13 (no sideways overflow on `main`) passes on all 78 routes in all three cells.

**The crops.** Dialog's closed crop, P15 against the tip in three cells: the only pixels that differ by more than 24/255 lie in the ring's box (`[707,257,813,305]` at 1440, `[133,202,257,254]` at 390). Sheet and Menu closed show no such pixel. In `tip/containers_dialog-{d1440,l1440,m390}-closed.png` the ring draws whole in each cell, and in light the button's own shadow now shows under it. `lift/dialog-ring-p15-p16.png` agrees.

**What the clip hid** (`lift/lift-p15.jsonl`, 84 rows): 258 reads, 23 changes outside a swap. They are the rings on Dialog's and Popover's triggers, and shadows: Empty States, Command, Music Staff, Surface at Overlay and Opaque, Dialog's Delete under Deliberate, and three section cards at 1440 light. Two one-pixel rows above Colors' swap at 390 (6 and 4 px) complete the count. The `unclip/` pairs show whole shadows where P15 cut them flat. The box survey finds one box past a swap, Timeline's touch seat at 390, which paints nothing (`timeline-m390-pair.png` matches). Its 14 px past the swap now take pointer input. That is the mark's own seat, and `main` does not scroll sideways.

**"Every stage control."** A4 reads only the three triggers after Escape. The cure is structural: at rest no StageSwap clips, so no control a swap holds can lose its ring to the swap. Two clippers stand as before, neither P16's: the stage plate (`[data-story-stage] { overflow: clip }`, `layout.css:143`) and Data Table's narrow-width clip (`data-table.stage.vue:102`). No control sat at either edge in the crops read.

**Not measured, from the code.** At a variant switch the clip holds for the whole height travel and drops on its finish, so a Card's shadow tail past the swap's edge (Empty States, Command, Surface) appears in one frame at the end of each travel. At P15 that tail was cut at all times. The easing ends slowly (`cubic-bezier(0.2, 0, 0, 1)`) and the tail is soft, so it should be faint. It is still the one place where this change can make something appear without a tween. A frame read of one switch on Empty States at 1440 light would settle it.

## Anything worse than P15

- **`/dock`**: the Section Rail card, above. Every other card is within noise.
- **The dock pages**, 1440 both themes: every tile within noise (mean difference 0.0 to 0.09 of 255, no pixel over 40) except `/dock/rail`. The 390 dock pages were never reached by the sweep, so there are no tip crops to compare; `look-tip/dock_rail-m390.png` is the 390 Rail.
- **Containers**, 1440 both themes and 390: every tile within noise except Dialog's ring box.
- **The arrival sheet and `/`**: within noise.
- **The untouched sections**: P15's crops outside its closed ones are no longer on disk (only the dock, containers, home and arrival sheets are), so data, display, foundations and substrates were not diffed against P15 here. The lift reads them more closely than such a diff would: it compared each StageSwap page with the clip and without it on one build, and the only changes outside a swap are the rings and shadows above.
- **Checker**: 1,517 / 0 / 22 (1440 dark), 1,517 / 0 / 22 (light), 1,504 / 0 / 35 (390), against P15's 1,513, 1,513, 1,500 passes. The four added passes per cell are D6 and A4 on three routes. **Sweep**: Command's standing fail only, at 1440 in both themes and in the 20 routes of the 390 cell that ran. No console error.

## Blocking candidates, each judged twice

None holds.

1. **The Section Rail card on `/dock` is about 4 % smaller, with more blank under its figures.**
   - First, against the hold rule: not broken (D5a, D5b pass), not empty (a rail, a title, three figures). A few pixels on one card of ten.
   - Second, as the owner at 1440: the ten cards read as at P15, and this one still shows a rail beside three figures. The change shows only beside P15's tile under zoom. Not a hold. The record is wrong, though, and the hidden line's slot stays behind on the card; owed to the next pass.
2. **The Rail's line names nothing it plots.**
   - First: it replaces a blank three quarters, so the page is better than P15, not worse.
   - Second: the owner asked for less text and the component first. A bare trend under labelled figures fits that. Not a hold.
3. **The shadow tail at the end of a height travel** (unmeasured).
   - First: P15 cut those shadows at rest and in travel; P16 cuts them in travel only. Not worse.
   - Second, against "nothing changes instantly": it is a one-frame change, but of a soft tail at the end of a slowing travel, where P15 showed a hard cut edge at all times. Not a hold; measure it.
4. **The power hold left the measure incomplete**: the WebKit sweep and checker, the put-back lift, the 390 sweep past route 20, vitest and the export gate, the contact sheets, the line's fade.
   - First: the hold rule names pages, not runs. vitest and the gates do not read the three files (above), and the 1440 sweep and the 78-route checker in three cells are complete.
   - Second, on WebKit, the engine most likely to differ: StageSwap only loses a clip at rest. If WebKit failed to resolve the SVG's 100 % height, the SVG would take its ratio height (271 px at 1440, the box's own height; 90 px at 390, inside a 187 px box) or the 150 px replaced-element default, inside the box either way. The worst case is a shorter line, not an overflow, and the Card clips its content regardless. Not a hold; run them when the hold releases, WebKit first.

## Copy

P16 paints no word. The line's `aria-label` ("Regions by year" and the rest) sits in a context that is `aria-hidden` and `inert`, so assistive technology never reaches it either: inert, harmless, and the same as Figure Tools. `rg -P -i -f driver/register-lint.pattern` over the 106 added demo lines, the checker's added lines, both demo commit messages and `P16.md`: no hits (rerun here). FORM's banned-word pattern meets no new painted text.

## Record corrections

- `P16.md`, item 1: "the index card is as P15 left it". It is not, at 1440 (above).
- `P16.md`: "`8a0ff5679` is on master locally, not pushed". It is on `origin/master` now (master and `origin/master` both at `fc0f1aa9b`).
- `lift/lift-p15.txt` lacks the 1440-dark lines for its first seven routes (Empty States, Settings, Accordion, Command, Dialog, Menu, Popover), Dialog's and Popover's ring changes among them. `lift-p15.jsonl` holds all 84 rows and gives the 258 / 23 that P16.md states.

## Owed, not holding the merge

- The Rail card's fit on `/dock`: when the line is hidden, its slot and the gap above it should go too, so the specimen returns to P15's scale. A container cannot hide itself by its own size, so the query has to move to an ancestor.
- The steps under P16.md's "Not run, and owed", with `wkcheck` (A4 and D6 in WebKit) and `sweep390` first.
- A frame read of one height travel on a card that casts a shadow (Empty States, 1440 light) for the end-of-travel tail.
- Standing from P15-verify: Navigation's blank lower quarter at 1440; Pager's bare "2"; Safari.app not run.
- The library's rows as booked (O-390 e and O-395 for 11.1.2; F8, O-386, O-387 for 11.2.0). P16 adds none.
