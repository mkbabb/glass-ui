# BM-4: the one selection mark

| field | value |
|---|---|
| release | BM's parts minor, with BM-3's settle player; if keyframes.js's sampler has not shipped when that minor cuts, the next minor, named by its work. `:draggable` keeps today's drag on today's indicator through this minor, and it, the two exports the drag path calls and DockLayerGroup's switcher leave in 12.0.0 (BM-9) |
| status | planned; lands with BM-3's step 2 |
| rests on | choices 15 A, 16 A, 17 A, 18 C, 19 B, 20 A and 21 A (Q3, Q4, Q5, Q8, Q15, Q16, Q21), ratified under IN O-426; O-4 ("one object moves, at its own size") |
| DESIGN | §8.1, §7.2; with §5.3, §10.1, §10.3, §10.4 |
| starts from | `study/pass-6/fold/sketch/selectionMark.next.ts`, `mark.next.css` and `playSpring.ts`; the readings `pass-6/fold/fold.json` and `forced-colors.json` |
| page | P5-mark (Glass Selection Mark), P6-hosts (Glass Mark Hosts) |
| gates | G-2, G-3, G-5; the tabs-seam gate's arm (e), amended in the same commit |
| depends on | BM-0; the dock redesign's run (this wave replaces the run mark the redesign ships); BM-3's step 2, since a mark retargeted mid-glide is a body that carries a speed and turns round on the settle player (P0a rule 6), not on a transition that would restart it from still |

## What it builds

One writer serves SegmentedTabs, a dock run that fits and the Switch's thumb. The mark is one inert, `aria-hidden` capsule per group, at its option's size, moved by `translate` alone (law 2). The selection itself is `aria-selected` or `aria-current` on the option.

- **States**, as D§8.1's table sets them. Rest: the chosen option on a soft fill, its word at full ink and the others muted. Hover: the option's own fill at the plate's light strength (BM-2), over 150 ms. Press: the pressed option's fill takes the press tone, by the plate's `opacity` on the press row's clock (`motion-canon.md` P0a: about 100 ms each way); nothing shrinks and the mark waits. Tap: the model and `aria-selected` change at once, and the mark glides through the options between and settles on the tapped one (rule 2: 225 ms on a 38 px hop to 383 ms on 300 px, to half a pixel). The dock row's closed form passes its rest by 0.30 % (ζ 0.88), so the mark's keyframes are clamped at the rest and no frame passes it (P0a: "overshoot: none on a control"); the clamp moves the last frames by under a pixel. The two words trade ink over 200 ms on `--ease-standard`, a colour on the page's thread (167 to 200 ms), not over the glide. A second tap mid-glide turns the mark from where it is at its own speed, on the settle player.
- **No drag on the new mark.** No site sets `:draggable` (the census in `study/pass-8/fold/hosts.json`, and `git grep` at every site's ref on 2026-11-27), so the mark is built without one. The prop does work today: it wires the pill's drag-to-morph (`R111` `SegmentedTabs.vue:134-140`, `useTabDragMorph`; `tabs/README.md:136`). A prop that a minor stopped reading would change a public name's meaning, which goes in a major (BM.md §2), so a strip that sets `:draggable` keeps today's indicator and its drag through this minor, untouched, with no new code written for it. BM-9 removes the prop, that path and `useTabDragMorph` in 12.0.0 with a MIGRATION row.
- **Keys** fade the mark across (18 C), and so does Reduce Motion, over 150 ms. Focus enters on the chosen option under a roving tabindex.
- **No lift and no stretch** (15 A, 16 A). **Equal options** in every pill strip (17 A): no box moves when the choice moves, and a strip without room scrolls with the mark in the scrolled box. **No more edges** (20 A): the edge shows only under more contrast.
- **The hosts.** SegmentedTabs' underline is a hairline moved by `scale` on its inline axis. A dock run that fits carries the mark, with `touch-action: pan-y`. A run that scrolls keeps its native scroll, and the mark lives in the scrolled box (21 A). The Switch's thumb is the mark of a two-seat group, not dragged (S2). PagerDots keep today's worm. A stepped slider shows occupied length and travels a step at each boundary crossed (22 B; BM-5 owns the slider). DockLayerGroup's switcher keeps today's look: the two sites that mount the group hide it (daraksha `src/shell/SiteDock.vue:244`, value.js `demo/shell/dock/Dock.vue:305`, both `:show-switcher="false"`), so by the overfitting rule (D§8.1) it takes no new mark and leaves in 12.0.0 (BM-9).
- **Forced colours and more contrast.** The sign is drawn on the mark. Both arms of `src/styles/accessibility.css:9-51` (master and `release/11.1.1` alike: `[aria-current]`, `[aria-selected="true"]`, `[aria-pressed="true"]`, `[aria-checked="true"]` at `:12-15` and `:33-36`) narrow to `:not(.selection-option)`, because their 2 px layered `!important` border moves a three-tab strip's boxes by 8 px when the choice moves to the widest tab, in both modes, and an unlayered override cannot undo it (`pass-6/fold/forced-colors.json`).
- **The stylesheet paths.** The mark's sheet is imported by each host's own stylesheet: the tabs' sheet, the dock's run sheet and the Switch's own stylesheet. Home Assistant imports the Switch's as `dist/switch.css` (`frontend/src/core/sheet.css:51`) and the dock's as `dist/components/dock/styles/index.css` (`:30`), so its five Switches and its dock runs take the mark through the paths it already imports (BM.md §1).
- **Deleted in this wave:** `useDockRunMark` (`src/components/dock/composables/useDockRunMark.ts`, with its calls in `GlassDock.vue`, `useDockRun.ts` and `dockMorphMeasure.ts`) and the run mark's rules in `dock/styles/run.css`. SegmentedTabs without `:draggable` stops reaching `useSelectionIndicator`: it is imported by `useSelectionGroup.ts:2`, which SegmentedTabs and ToggleGroup both call, and the `:draggable` path keeps it until 12.0.0, so its credit is BM-9's.
- **The tabs-seam arm (e)** (`tests/gates/tabs-seam.test.ts:222-234`) asserts today that the indicator's transition list is `translate`, `width`, `height`, `opacity` (`src/components/tabs/styles/segmented.css:165-169`). It is amended in this wave's commit to `translate` alone, with the crossfade as its reduced form (BM-0's "not applied" item).

## Inputs folded

11.1.2's run cures stand and the mark keeps them: `useSelectionGroup` scrolls only its own run (GL-18; the `scrollIntoView` call at `src/composables/motion/morph/useSelectionGroup.ts:200`), a run whose seats fit is no scroller (IN O-430 item 7), and a run lets a vertical swipe through (GL-16; `dock/styles/run.css:276` is `pan-x` on master and 11.1.1, and 11.1.2 widens it). 11.1.1's reduced-motion run mark already crossfades (its exits scope, row 13 (a)); the new mark does the same.

The tab's touch target is 11.1.2's too (atlas's film G-3, IN O-434; S112, "atlas's dropdown films"). Under a coarse pointer a tab grows to `--control-floor`, 44 px (`src/components/tabs/styles/segmented.css:184-187`), and 11.1.2 keeps that target from adding to any ancestor's scrollable overflow. The mark sits inside the option's box, so it adds nothing there either, and the proof re-reads G-3's witness.

## Bytes

CSS +585 B (the mark's sheet) and −494 B (the run mark's rules); JS +914 B (the writer, eager, priced with a drag it no longer builds, so re-priced at the wave) and −1,349 B (`useDockRunMark`). `useSelectionIndicator`'s −534 B is BM-9's, since the `:draggable` path keeps it until 12.0.0 (`study/pass-10/ledger/ledger.json`; B10-11).

## Proof

In headless Chromium and Playwright WebKit, through `guarded`, on P5-mark, P6-hosts and glass's demo (a three-tab strip with a wide third tab, a dock run that fits, a run that scrolls, a Switch):

- no option's box moves when the choice moves, to 0 px, in plain mode, forced colours (light-text and dark-text themes), more contrast, under the keyboard and under Reduce Motion;
- at 390 on a coarse pointer, a strip at the inline edge of an `overflow: auto` scroller leaves its `scrollWidth` at its `clientWidth` (G-3's witness, kept);
- a tap's glide ends within half a pixel and no frame passes its rest; a second tap mid-glide turns without a jump; the two words' ink trade runs 167 to 200 ms;
- a cold page's first tap and a second tap mid-glide: the turn keeps its speed, the player having loaded on the first `pointerdown`;
- with `:draggable` set, the strip keeps today's indicator and its drag, as on 11.1.x;
- arrow keys and Reduce Motion fade the mark across;
- the strip of each host in light and dark, 390 and 1440;
- G-2 (`translate` alone, the colour legs as effects), G-3 (two at most), G-5 in both modes, and arm (e). The keyed and reduced crossfade is an `!important` carve in the mark's sheet.

## Sites it serves

Read on each site's newest branch on 2026-11-24 (the census in `study/pass-8/fold/hosts.json` is re-run at the wave):

| Site | Hosts |
|---|---|
| atlas | SegmentedTabs in `src/filter/ui/components/YearScrubber.vue:213` (`u/s24-atlas`; VizOptionsBand's pick-one rows became Selects there) and in five sci dashboard filters (`dashboards/ecf/features/filter/EcfFilter.vue:218`, `:298`, `usf-integrity/features/filter/ConsultantFilter.vue:64`, `:79`, `usf/features/filter/UsfFilter.vue:79`, on `u/s24-sci`); Switch in `src/editorial/DataAside.vue:150` and `src/filter/ui/VizOptionsBand.vue:103`; its dock runs |
| value.js | SegmentedTabs in `demo/workbenches/mix/MixSourceSelector.vue:147` and `demo/palettes/admin/panels/AdminNamesPanel.vue:28`. Its DockLayerGroup hides the switcher (`:show-switcher="false"`, `demo/shell/dock/Dock.vue:305`), so the mark does not reach it there |
| fourier | SegmentedTabs in `web/src/components/equation/EquationModeToggle.vue:59` and `gallery/GalleryView.vue:479`; its dock runs |
| keyframes | SegmentedTabs in `demo/components/EasingCatalogue/EasingCatalogue.vue:42`; a Switch in `LayerConfigPanel.vue:193`; its dock runs |
| gaggle, daraksha, Home Assistant | their dock runs; Home Assistant's five Switches. daraksha's DockLayerGroup hides its switcher (`SiteDock.vue:244`), so the mark does not reach it |

No site changes anything. atlas is asked whether a suite reads a strip's boxes under forced colours.

## Not this wave's

The dock redesign's run (W-I.8); the run's caps in 12.0.0 (BL's); the exports', `:draggable`'s and the switcher's removal (BM-9); the slider's occupied length (BM-5); the reduced-motion rule for the rest of glass (BM-3).
