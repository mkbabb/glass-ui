# BM-4: the one selection mark

| field | value |
|---|---|
| release | BM's parts minor. The two exports it stops calling leave in 12.0.0 (BM-9) |
| status | planned |
| rests on | choices 15 A, 16 A, 17 A, 18 C, 19 B, 20 A and 21 A (Q3, Q4, Q5, Q8, Q15, Q16, Q21), ratified under IN O-426; O-4 ("one object moves, at its own size") |
| DESIGN | §8.1, §7.2; with §5.3, §10.1, §10.3, §10.4 |
| starts from | `study/pass-6/fold/sketch/selectionMark.next.ts`, `mark.next.css` and `playSpring.ts`; the readings `pass-6/fold/fold.json` and `forced-colors.json` |
| page | P5-mark (Glass Selection Mark), P6-hosts (Glass Mark Hosts) |
| gates | G-2, G-3, G-5; the tabs-seam gate's arm (e), amended in the same commit |
| depends on | BM-0; the dock redesign's run (this wave replaces the run mark the redesign ships); BM-3's player for the settle with speed (until it lands, a tap's glide rides rule 1's token) |

## What it builds

One writer serves SegmentedTabs, a dock run that fits, DockLayerGroup's switcher and the Switch's thumb. The mark is one inert, `aria-hidden` capsule per group, at its option's size, moved by `translate` alone (law 2). The selection itself is `aria-selected` or `aria-current` on the option.

- **States**, as D§8.1's table sets them. Rest: the chosen option on a soft fill, its word at full ink and the others muted. Hover: the option's own fill at the plate's light strength (BM-2), over 150 ms. Press: the pressed option's fill takes the press tone; nothing shrinks and the mark waits. Tap: the model and `aria-selected` change at once, and the mark glides through the options between and settles on the tapped one while the two words trade ink (rule 2: 225 ms on a 38 px hop to 383 ms on 300 px, to half a pixel, passing its rest by 0.30 % at most). A second tap mid-glide turns the mark from where it is at its own speed.
- **Drag**, only where the host opts in (`:draggable`; no site sets it today): the mark follows the finger after 6 px of slack, taken where the slack runs out so it never jumps; options passed are never chosen; release chooses the option under the finger at once and settles with the finger's speed (keyframes.js's estimator over 80 ms, capped); a scroll that takes the touch returns the mark and chooses nothing.
- **Keys** fade the mark across (18 C), and so does Reduce Motion, over 150 ms. Focus enters on the chosen option under a roving tabindex.
- **No lift and no stretch** (15 A, 16 A). **Equal options** in every pill strip (17 A): no box moves when the choice moves, and a strip without room scrolls with the mark in the scrolled box. **No more edges** (20 A): the edge shows only under more contrast.
- **The hosts.** SegmentedTabs' underline is a hairline moved by `scale` on its inline axis. A dock run that fits carries the mark and takes the drag where the host opts in, with `touch-action: pan-y`. A run that scrolls keeps its native scroll, and the mark lives in the scrolled box with no drag (21 A). The Switch's thumb is the mark of a two-seat group, not dragged (S2). PagerDots keep today's worm. A stepped slider shows occupied length and travels a step at each boundary crossed (22 B; BM-5 owns the slider).
- **Forced colours and more contrast.** The sign is drawn on the mark. Both arms of `src/styles/accessibility.css:9-51` (master and `release/11.1.1` alike: `[aria-current]`, `[aria-selected="true"]`, `[aria-pressed="true"]`, `[aria-checked="true"]` at `:12-15` and `:33-36`) narrow to `:not(.selection-option)`, because their 2 px layered `!important` border moves a three-tab strip's boxes by 8 px when the choice moves to the widest tab, in both modes, and an unlayered override cannot undo it (`pass-6/fold/forced-colors.json`).
- **Deleted in this wave:** `useDockRunMark` (`src/components/dock/composables/useDockRunMark.ts`, with its calls in `GlassDock.vue`, `useDockRun.ts` and `dockMorphMeasure.ts`) and the run mark's rules in `dock/styles/run.css`. SegmentedTabs stops reaching `useSelectionIndicator`: it is imported by `useSelectionGroup.ts:2`, which SegmentedTabs and ToggleGroup both call, so the wave either moves both onto the new writer or keeps the credit out of the sums.
- **The tabs-seam arm (e)** (`tests/gates/tabs-seam.test.ts:222-234`) asserts today that the indicator's transition list is `translate`, `width`, `height`, `opacity` (`src/components/tabs/styles/segmented.css:165-169`). It is amended in this wave's commit to `translate` alone, with the crossfade as its reduced form (BM-0's "not applied" item).

## Inputs folded

11.1.2's run cures stand and the mark keeps them: `useSelectionGroup` scrolls only its own run (GL-18; the `scrollIntoView` call at `useSelectionGroup.ts:200`), a run whose seats fit is no scroller (IN O-430 item 7), and a run lets a vertical swipe through (GL-16; `dock/styles/run.css:276` is `pan-x` on master and 11.1.1, and 11.1.2 widens it). 11.1.1's reduced-motion run mark already crossfades (its exits scope, row 13 (a)); the new mark does the same.

## Bytes

CSS +585 B (the mark's sheet) and −494 B (the run mark's rules); JS +914 B (the writer, eager) and −1,349 B (`useDockRunMark`). `useSelectionIndicator`'s −534 B is credited only when this wave shows it leaving each entry's import graph (`study/pass-10/ledger/ledger.json`; B10-11).

## Proof

In headless Chromium and Playwright WebKit, through `guarded`, on P5-mark, P6-hosts and glass's demo (a three-tab strip with a wide third tab, a dock run that fits, a run that scrolls, a Switch):

- no option's box moves when the choice moves, to 0 px, in plain mode, forced colours (light-text and dark-text themes), more contrast, under the keyboard and under Reduce Motion;
- a tap's glide ends within half a pixel and passes its rest by 0.30 % of its travel or less; a second tap mid-glide turns without a jump;
- a drag commits only at release, a cancelled drag chooses nothing, and passing options never fires one;
- arrow keys and Reduce Motion fade the mark across;
- the strip of each host in light and dark, 390 and 1440;
- G-2 (`translate` alone, the colour legs as effects), G-3 (two at most), G-5, and arm (e).

## Sites it serves

Read on each site's newest branch on 2026-11-24 (the census in `study/pass-8/fold/hosts.json` is re-run at the wave):

| Site | Hosts |
|---|---|
| atlas | SegmentedTabs in `src/charts/frame/PlateDial.vue`, `src/filter/ui/VizOptionsBand.vue`, `YearScrubber.vue` and five sci dashboard filters; Switch in `DataAside.vue` and `VizOptionsBand.vue`; its dock runs |
| value.js | SegmentedTabs in `demo/workbenches/mix/MixSourceSelector.vue` and `AdminNamesPanel.vue`; DockLayerGroup in `demo/shell/dock/Dock.vue` |
| fourier | SegmentedTabs in `web/src/components/equation/EquationModeToggle.vue:59` and `gallery/GalleryView.vue:473`; its dock runs |
| keyframes | SegmentedTabs in `EasingCatalogue.vue`; a Switch in `LayerConfigPanel.vue`; its dock runs |
| gaggle, daraksha, Home Assistant | their dock runs; daraksha's DockLayerGroup; Home Assistant's five Switches |

No site changes anything. atlas is asked whether a suite reads a strip's boxes under forced colours.

## Not this wave's

The dock redesign's run (W-I.8); the run's caps in 12.0.0 (BL's); the exports' removal (BM-9); the slider's occupied length (BM-5).
