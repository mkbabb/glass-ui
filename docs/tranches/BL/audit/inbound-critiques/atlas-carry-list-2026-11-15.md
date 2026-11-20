# Atlas's glass-ui line against 11.1.0: what we would carry

To the glass-ui maintainers, 15 November 2026.

The Connectivity Atlas builds from its own glass-ui branch, `u/sp-integ-glass` (tip `8b4d8f82b`, 2026-11-13;
`git describe` reports `v10.1.2-145-g8b4d8f82b`, and `package.json` still says 10.1.2). You advised us to move
to 11.1.0 once it is tagged, carry only the commits you have not taken, and send you that list. This is the
list. Please mark each absent or partial row as already in 11.x, booked for 11.2.0, or not yet seen.

Everything here was read from git objects only (`git log`, `git show`, `git diff`, `git cherry`,
`git merge-tree` into a scratch object store). Nothing was built or run, and no branch was checked out.

## The refs used

- **Target:** `release/11.1.0` at `06da3bb9c` (2026-11-15 02:19, "chore(release): .bundle-ratchet 3030858 -> 3030963").
  It is a local branch in the glass repository; `origin` carries only `release/11.0.0` and `release/11.0.1`.
  Its `package.json` reads 11.0.1 and its CHANGELOG heads "11.1.0 — unreleased".
- **Merge base:** `373ed8aba` (2026-11-04, the merge of our earlier line into our integration branch;
  `git describe` = `v10.1.2-70`). `release/11.0.0` merged exactly this commit (`2800d386b`), so everything up
  to it is already in 11.x.
- **Since the base:** our line has 75 commits (12 merges, 63 non-merge). `release/11.1.0` has 944.
- **11.0.2:** `release/11.0.2` at `b11a018e5` is **not** an ancestor of `release/11.1.0` today. One of our
  commits (`f9c58b03f`) is in 11.0.2 only; it drops from our carry only if 11.0.2 is merged forward before
  11.1.0 is tagged.

Of the 63 non-merge commits, 24 touch nothing under `src/`: 15 bundle-ratchet rebinds, 2 CHANGELOG-only
commits, 2 keyframes.js peer-range commits (later reverted by `bb09d74c4`), 4 commits that only add
visual specs under `tests-visual/`, and `d8db44fe3` (the `.published-roster` row for `--radius-stadium`,
which `git cherry` shows is patch-identical to a commit already on 11.1.0). None of these would be carried;
the ratchet would be rebound once after the rebase. The other **39 commits touch `src/`** and are listed
below.

## How each row was judged

For every source commit I did three things. (1) `git cherry -v release/11.1.0 u/sp-integ-glass 373ed8aba`
and `git log --grep=<hash>` on 11.1.0 and 11.0.2, to find patch-identical or acknowledged copies. Only
`d8db44fe3` matched by patch-id; `f9c58b03f` is named by hash in three 11.0.2 commits. (2) A per-file test:
does the commit's patch apply forward to the 11.1.0 tree (the change is absent there) or in reverse (it is
already there), and what share of its added lines exist verbatim in the 11.1.0 file. (3) Where a commit
could plausibly be covered by different code on 11.1.0, I read both sides: the 11.1.0 file at the hunk,
and the 11.1.0 CHANGELOG entry. I write "equivalent" only where I read both.

Paths below are under `src/` unless they start with another top-level folder. Subjects are the commit
subjects with our internal labels removed.

## Already in 11.x: drop (5 commits)

| Commit | Date | Subject | Files | What it changes for a user | Where 11.x has it |
|---|---|---|---|---|---|
| `e214a586e` | 11-06 | feat(dock): border progress on the dock's own border, edge to edge | `components/dock/GlassDock.vue`, `components/dock/composables/useDockShellProps.ts`, `components/scroll-progress-rim/{ScrollProgressRim.vue,styles.css,types.ts}` | The page's scroll progress draws on the dock's own border instead of a track inside it. | Equivalent: 11.1.0's `ScrollProgressRim edge="border"`. Our own line already replaced this commit's `perimeter` form and GlassDock `borderProgress` with your rim in `c017bc61c`; the four rim files at our tip are byte-identical to `release/11.1.0`. Atlas uses `edge="border"` (`platform/chrome/dock/components/DockProgressRim.vue:20`). |
| `c017bc61c` | 11-11 | feat: bring over glass 11.1.0's dock (capsule corner, `--radius-stadium`) and ScrollProgressRim whole | 27 files under `components/dock/`, `components/scroll-progress-rim/`, `styles/theme/radius.css`, `styles/tokens/manifest.ts` | None of its own: it is a copy of your dock and rim at `5a27994f3`. | It *is* 11.1.0 as of 11-11. 40 commits on `release/11.1.0` have touched the dock since `5a27994f3` (19 files, +1228/−393), so the rebase takes 11.1.0's dock as it is and carries only our deltas (`ef2aa629a` and later). |
| `f9c58b03f` | 11-12 | fix: the pager worm's dot size in px, the start-anchored rail morph, the run's wheel on its own axis | `components/pager-dots/worm.ts`, `components/dock/composables/dockMorphMeasure.ts`, `components/dock/styles/run.css` | Pager dots move one dot per step instead of painting a 300 px bar; a rail anchored at one edge grows and shrinks from that edge; a vertical wheel over a horizontal dock scrolls the page. | In **11.0.2 only**: `065ae4240` (worm), `5afae24e9` (morph origins, rebased onto 11.0.1's one-axis measure), `b512568d4` (overscroll axis). I read all three against ours: the worm and overscroll cures are the same; the morph cure keeps all three of our rules on one axis. Not on `release/11.1.0` yet. |
| `3e60e5314` | 11-11 | fix: the pager prose in the run comments | `components/dock/composables/useDockRun.ts`, `components/dock/styles/run.css` | Nothing: comment wording only. | Nothing to carry on its own; it travels with `4fbb690c8` if that is carried. |
| `668cd3fac` | 11-05 | glass: the cut cap snaps under reduced motion, a collapsed dock carries one radius, HandMark's ink settle on a bezier | `components/dock/styles/run.css`, `components/handmark/HandMark.vue` | Under reduced motion the dock's corner lands without a tween; a collapsed dock is one clean circle; the mark's ink settles on an ease. | Equivalent by other code: 11.1.0's "With reduced motion turned on, the dock changes in one step … the corner that tightens … holds still too" and its capsule rest corner (`styles/theme/radius.css`, `--radius-stadium`). The HandMark half is moot: 11.1.0 rewrote HandMark, and our own `a44ef3598` deletes the ink settle. Nothing remains. |

## Partly in 11.x: carry only the remainder (9 commits)

| Commit | Date | Subject | Files | What it changes for a user | In 11.1.0 | What remains |
|---|---|---|---|---|---|---|
| `fa0094ad8` | 11-06 | fix(dock): the horizontal pill dock is a stadium; the cut cap needs a scroll timeline; the indicator takes the short rung | `components/dock/styles/{morph,run,shape}.css`, `styles/tokens/scale-paper.css` | The pill dock has fully round ends; Firefox no longer paints 4 px leading corners; the tab indicator moves on a shorter clock. | The stadium, through `--radius-stadium` (our own `ef2aa629a` already deleted our rule in favour of yours). | Fix: the cap animations under `@supports (animation-timeline: …)` (Firefox runs them on the document clock otherwise). Design: `--tab-indicator-duration` on `--spring-dock-exit-duration`. |
| `fbd582ebd` | 11-05 | fix(tabs): the indicator lands on first placement and corrects size by scale; tab slop | `components/dock/styles/layer-group.css`, `components/tabs/styles/segmented.css`, `composables/motion/morph/useSelectionIndicator.ts` | The selected-tab pill appears in place on load instead of gliding in from the corner, and resizes without a width tween. | The touch target: 11.1.0's SegmentedTabs are 44 px tall on a coarse pointer (a real height where we used a hit-slop). | Fix: the indicator's first placement without a glide, the zero-box skip, and the compositor scale correction. `useSelectionIndicator.ts` is untouched on 11.1.0 since the base. |
| `dd74bf23a` | 11-06 | fix(glass): one chrome plate register, a paper filter sheet, calm grasp and deep registers | `components/dock/styles/{dock,shell}.css`, `components/select/SelectContent.vue`, `components/sheet/{SheetContent.vue,styles.css}`, `styles/glass/{grasp,ladder,overlay-plate}.css`, `styles/tokens/{dark-arm,glass-deep,glass}.css` | Menus, popovers, the dock and side sheets read as one solid paper plate with one rim and one shadow. | A Select list is never narrower than its trigger: equivalent to 11.1.0's "A `Select` with a wide trigger fits its list". | Design: the chrome plate register, the paper sheet, the grasp and deep registers. You booked the low-blur register as the library default for 12.0.0 (your INBOUND O-260). |
| `d3d525806` | 11-09 | fix(glass): opaque chrome register, crisp dock seat, quiet border progress | `components/command/styles.css`, `components/scroll-progress-rim/*`, `components/slider/Slider.vue`, `styles/tokens/{dark-arm,glass-fx,glass,motion-registers,shadow}.css` | Menus and dialogs are fully opaque; the dock's shadow is a crisp 1 px drop with no halo. | The quiet border progress: superseded by your rim (identical at our tip). | Design: the opaque register tokens (`--glass-chrome-paper` 100 %, floating and overlay blur 0), the dock and capsule shadows, the command and slider touches. Same 12.0.0 booking as above. |
| `6b65b361b` | 11-11 | fix: dock rim, rim stroke, checked menu row, palette seat, finder pick, pager worm | `components/_shared/menu/menu.css`, `components/command/styles.css`, `components/dialog/{DialogContent.vue,styles.css}`, `components/dock/styles/adaptive-legibility.css`, `components/pager-dots/PagerDots.vue`, `components/scroll-progress-rim/*`, `components/sheet/detents/use.ts` | A static dock keeps a visible rim; a checked menu row reads as selected; the palette hangs from the upper screen; a tap on an option inside a sheet picks it; the last pager pip is whole. | The rim stroke (superseded by your rim). | Fix: the sheet drag no longer captures the pointer on `[role=option]` (`detents/use.ts`), and the worm layer contains layout only. Design: the 18 % static dock rim, the checked-row fill, the palette at 18dvh, the finder field height. |
| `4fbb690c8` | 11-11 | fix: the pager is never the dock's open seat; dock fill clip and finder height held at the root | `components/command/styles.css`, `components/dock/composables/useDockRun.ts`, `components/dock/styles/run.css`, `components/pager-dots/PagerDots.vue`, `styles/glass/glass-capsule.css` | A PagerDots inside a dock is never treated as the current destination, so the dock does not scroll to it or plate it. | The open-seat CSS: equivalent through your `402c3eed9` (the `:has()` arm reads only a declared seat, `components/dock/styles/run.css:532–552` on 11.1.0). | Fix: 11.1.0's run mark still takes the first `aria-current` anywhere in the run (`components/dock/composables/useDockRunMark.ts:80–84`), so a pager dot can draw the gliding plate; our `ef2aa629a` skips `[data-slot="pager-dots"]`. Also PagerDots `flex: none` with whole pips, the capsule fill clip scoped to `.dock-icon-button`, the finder field `flex: none`. |
| `591d2d989` | 11-11 | fix: no overshoot past panel, a rounded DataTable, a legible selected chip, the underline below the feet | `components/configurator/ConfiguratorLayer.vue`, `components/data-table/styles.css`, `components/handmark/stroke.ts`, `components/select/SelectTrigger.vue`, `components/toggle-group/styles.css`, `styles/glass/liquid-enter.css`, `styles/tokens/scheme-motion.css`, `styles/utilities/btn.css` | Chips and thumbs no longer bounce past the panel spring; data tables have rounded corners; a selected chip is legible. | Rounded tables: 11.1.0 rounds `Table` itself ("Tables have rounded corners", `table-container`). Our rounding sits on `data-table` and would double it, so that hunk goes. | Design: `--ease-cartoon-punch` re-aliased to the panel spring, the disclosure chevron on the press spring, the selected chip's ink. The HandMark underline drop is moot if the rule (`a44ef3598`) is carried. |
| `2e7ecedf8` | 11-05 | fix(disclosure): animate only on a change after mount; opacity on the effects bezier | `components/_shared/disclosure/disclosure.css`, `components/accordion/AccordionContent.vue`, `components/collapsible/CollapsibleContent.vue` | A disclosure mounted closed (force-mounted) no longer plays its close animation on page load. | The fade half is **opposed** by 11.1.0, which removed the fade on purpose ("`Collapsible` and `Accordion` no longer fade"). Drop it. | Fix: the mount gate (`data-armed` on the first reader toggle). 11.1.0's `disclosure.css:134–139` still keys the animation on `data-state` alone. |
| `a44ef3598` | 11-11 | feat: IBM Plex Sans from 11.1.0, the mark as a rule and a band, a tooltip width cap, named pager dots | `components/handmark/{HandMark.vue,index.ts,stroke.ts}`, `components/pager-dots/{PagerDots.vue,README.md}`, `fonts/**`, `styles/{font-files,fonts}.css`, `styles/glass/overlay-plate.css` | Text is set in IBM Plex Sans; underlines are a square rule broken around descenders; tooltips wrap at 16rem; each pager dot names its slide in a tooltip. | IBM Plex Sans: the font files, `font-files.css`, `fonts.css` and the README are byte-identical to 11.1.0. | Design: the HandMark rule and band (your marks redesign, with this as an inbound proposal; TextMark in 11.2.0). Fix: the tooltip plate `max-inline-size: min(16rem, 100vw − 2rem)`. Feature: PagerDots `slideLabel` dot names in a Tooltip. |

## Absent from 11.1.0 (25 commits)

The kind column says where each belongs: **fix** (a glass patch), **design** (your planned dock, slider
or chrome redesigns), **feature** (an additive minor), or **atlas** (should move into atlas instead).

| Commit | Date | Subject | Files | What it changes for a user | Kind |
|---|---|---|---|---|---|
| `af72d79a3` | 11-05 | glass: subtle blur register for chrome over data | `components/_shared/field/control.css`, `components/dock/styles/{dock,shell}.css`, `components/sheet/styles.css`, `styles/animations.css`, `styles/glass/{glass-atom,glass-capsule}.css`, `styles/tokens/{dark-arm,glass-deep,glass,scroll-tokens,shadow}.css` | Glass chrome over charts and maps blurs far less (4–12 px) and controls sample no backdrop. | design (12.0.0 default per your O-260; until then atlas can set it as tokens on its own `:root`, see the block in `GLASS-11.2-REPIN-NOTES.md`) |
| `0f9dddaa7` | 11-05 | glass: range handles, trigger-scoped chevron, coarse hit-slops | `components/dock/styles/controls/touch-floor.css`, `components/select/SelectTrigger.vue`, `components/slider/{Slider.vue,styles.css}`, `components/toggle-group/styles.css` | A closed Select inside an open Sheet keeps its chevron pointing down; toggle chips and compact dock buttons get a 44 px touch target; range sliders show their two ends. | fix (chevron: 11.1.0 still has `in-data-[state=open]:rotate-180` on `SelectTrigger.vue`; slops) + design (range handles, with your slider loop) |
| `bb09d74c4` | 11-05 | revert(deps): keyframes.js back to ^6.0.0; the range focus ring | `components/slider/styles.css` | A focused range slider shows the ring on the focused end as well as the track. | design (slider); a fixup of `0f9dddaa7` |
| `d46646127` | 11-05 | fix(glass): the subtle register: saturate 1.05, chrome kernels 6/8 px, paper readouts, paper sheet, lighter light dock shadow | `components/dock/styles/shell.css`, `styles/glass/ladder.css`, `styles/tokens/{dark-arm,glass,shadow}.css` | Hover cards and popovers over a map are paper, not frost; the side sheet is nearly opaque. | design (same register) |
| `f060c188c` | 11-05 | fix(dock): the cut cap rides the dock box, so rim, shadow and plate share one radius | `components/dock/styles/run.css` | When the dock's corner cuts to show more content, its rim and shadow follow the cut instead of keeping the round corner. | design (dock); 11.1.0 still runs the cap on the plate (`run.css` around line 656) |
| `2700ee9dd` | 11-05 | fix(slider): visible range handles, coarse hit-slop, a drawn groove, no fill sampler | `components/slider/styles.css` | Range handles are visible paper knobs with a 44 px touch slop; the unselected track is a groove. | design (slider loop, your O-280/O-283) |
| `3c703c282` | 11-05 | fix(sheet): a slider inside a detented sheet keeps its drag; grabber on block-edge sheets only | `components/sheet/SheetContent.vue`, `components/sheet/detents/use.ts` | Dragging a slider inside a detented sheet moves the slider, not the sheet; side sheets lose the grabber. | fix (11.1.0's `detents/use.ts:60` interactive set still lacks `[role=slider]`) + design (gripless side sheet). Your O-216/O-217 book it for 11.2.0. |
| `ad2288006` | 11-05 | fix(select, command): the coarse-pointer 44 px floor on SelectTrigger and CommandInput | `components/command/CommandInput.vue`, `components/select/SelectTrigger.vue` | Select triggers and the command field are at least 44 px tall on a phone. | fix |
| `f5d9c8843` | 11-05 | test: restate the cap, tabs, ladder and blur-order specs | `components/slider/styles.css` (one token) | None (the slider slop reads `--touch-target`). | fixup of `2700ee9dd` |
| `822e35e20` | 11-06 | fix(tabs): the indicator measures layout pixels and lands off screen; the dark pill reads | `components/tabs/styles/segmented.css`, `composables/motion/morph/useSelectionIndicator.ts`, `styles/tokens/dark-arm.css` | A tab strip that enters inside a scaling reveal gets a full-size pill; in dark mode the selected pill has 3:1 contrast. | fix (layout-pixel measure) + design (dark pill tokens) |
| `86045591c` | 11-06 | fix(slider): name each end of a range after its group | `components/slider/Slider.vue` | A screen reader hears "Funding years, from" and "to" instead of "Minimum" twice. | fix (accessibility) |
| `a577384f4` | 11-06 | fix(slider): a range at its bounds is a quiet 5 px rail; full ink once narrowed; circle handles | `components/slider/{Slider.vue,styles.css}` | An untouched range filter no longer looks active. | design (slider loop) |
| `7455f389d` | 11-06 | fix(sheet): a detented side sheet's header reserves the close gutter | `components/sheet/styles.css` | The close button no longer sits over the side sheet's title. | fix, but only needed with `3c703c282`'s gripless side sheet; travels with it |
| `9235d026c` | 11-09 | feat(carousel, constellation): one-pass carousel autoplay with a pause control, and a still constellation of real points | `components/carousel/{Carousel.vue,CarouselPlayToggle.vue,index.ts,types.ts,useCarousel.ts,useCarouselAutoplay.ts}`, `components/constellation/{StillConstellation.vue,constellationField.ts,index.ts,stillField.ts}` | A carousel can play once through with a pause button; a static SVG constellation can sit behind a page with no canvas or frame loop. | feature (11.2.0 per O-217). Note: no atlas or dashboard file uses `autoplay` or `CarouselPlayToggle`; `StillConstellation` is used (see the API section). The autoplay half can be dropped from our carry. |
| `64f5f2483` | 11-09 | fix(glass): one field style, a crisp dock rim and seated chrome | `components/_shared/menu/menu.css`, `components/_shared/overlay/{index.ts,sheet-width.ts}`, `components/command/{Command.vue,CommandDialog.vue,CommandInput.vue,register.ts,styles.css}`, `components/dock/styles/{run,shell}.css`, `components/select/SelectContent.vue`, `styles/glass/{focus-veil,ladder,overlay-plate}.css`, `styles/tokens/{glass-fx,glass}.css` | The finder keeps what you typed after a pick; a phone listbox keeps a 16 px gutter and stands on a foot dock; menu rows lift on hover. | fix (Command keeps its term) + design (field and menu styles, dock rim). `sheetFootRect` should **not** be carried as written: it counts every `.glass-dock` in the lower half of the screen, and our phone audit shows the sheet leaping onto an in-page dock (see the fault re-read). Rework it to count only a fixed or sticky foot dock, or the dock that owns the trigger. |
| `f373de108` | 11-09 | fix(deck, constellation): a page turn lands on its snap on the dock spring; a still field caps each point's hairlines | `components/deck/composables/useDeckSnap.ts`, `components/constellation/{StillConstellation.vue,stillField.ts}` | After autoplay or a chevron the slide rests exactly on its snap (it rested 14–84 px left before). | fix (deck snap; related to your animation audit row 33) + feature (`degree` on StillConstellation) |
| `2c2a942b0` | 11-09 | fix(glass): Command also leaves the term alone on the close a pick causes | `components/command/Command.vue` | The inline finder no longer prints the choice twice. | fix (with `64f5f2483`) |
| `b1250cadb` | 11-09 | fix(deck): suspend the strip's snap while a page turn travels, and land on the exact offset | `components/deck/composables/useDeckSnap.ts` | A one-page turn turns one page, not two. | fix |
| `e8618e283` | 11-10 | fix(sheet): the region takes the remainder row when a side ladder renders no grip | `components/sheet/styles.css` | A gripless side sheet scrolls in Firefox. | fix, travels with `3c703c282` (your O-216) |
| `ef2aa629a` | 11-11 | fix: keep our dock deltas on glass 11.1.0's dock | `components/dock/composables/{useDockRun,useDockRunMark}.ts`, `components/dock/styles/{adaptive-legibility,dock,layer-group,run,shell}.css`, `components/dock/styles/controls/touch-floor.css` | Re-applies, on your dock: the pager is never the destination (run mark skip), the compact icon button's 44 px slop, the chrome plate on the dock, the layer switcher's scale correction, the cap only where a scroll timeline exists. | fix (run mark skip, slop, cap gate) + design (plate) |
| `89f1df7c1` | 11-11 | feat: every dock state change grows the plate in width and height on one scalar | `components/dock/composables/{dockMorphMeasure,useDockClickIntegrity,useDockMorph}.ts`, `components/dock/styles/{index,layers,morph,run,shape,shell}.css` | Opening, closing and resizing the dock tween both axes, with per-axis origins, and the content cross-fades. | design (your booked growing rule, W-I.8 in 11.2.0, O-248). Largest single conflict with 11.1.0's `dockMorphMeasure.ts`. |
| `360f6d7d2` | 11-11 | feat: the sheet's slide travel is the CSS length `--sheet-travel`; the close button takes its whole face | `components/sheet/{motion.ts,styles.css}` | An inset floating sheet starts wholly off screen; the close button is fully tappable. | feature (additive; unset keeps today's slide) + fix (close button). Atlas sets `--sheet-travel`. |
| `2b6d1b1ea` | 11-11 | feat: the dock is the track: a pill strip in a dock draws none; selection never bolds | `components/dock/styles/controls/{tab-button,triggers}.css`, `components/dock/styles/layer-group.css`, `components/tabs/styles/segmented.css`, `components/toggle-group/styles.css` | Tabs inside a dock sit on the dock itself with a capsule indicator; selected labels keep their weight. | design (dock redesign) |
| `1275da8ac` | 11-11 | fix: delete `fillPolygon`, unreached after the rule rewrite | `components/handmark/stroke.ts` | None. | fixup of `a44ef3598` |
| `bd82a5425` | 11-13 | feat: plain dock run, dwell linger, Enlarge closes by the same path, table without native bars, Metric 2xl/align/fit, hover note, still grounds | 35 files: `components/dock/{DockCrossfade.vue,GlassDock.vue,constants.ts,composables/*,styles/run.css}`, `components/expandable-container/*`, `components/fading-scroll/*`, `components/metric/*`, `components/popover/*`, `components/table/*`, `components/aurora/composables/auroraFallbackGround.ts`, `components/constellation/*`, `styles/{animations,paper}.css`, `styles/glass/reveal.css`, `styles/utilities/{base,base-misc}.css` | A dock can be `run="plain"` (no scroll container, no flashing bar); the dock lingers after the pointer leaves in proportion to the dwell; Enlarge grows from the card and closes back into it; tables scroll on both axes with feathered edges and no native bars; a hover popover gets a note motion and Escape no longer reopens it. | design (plain run, dwell linger: W-I.8, your O-275/O-276) + fix (ExpandableContainer travel and same-path close, your animation audit row 27; the hover-note Escape; `auroraFallbackGround` raster:false ellipse radii) + feature (FadingScroll `axis="both"`, `focusable`). Two parts should **not** be carried: the Table wrapper (`components/table/*`) collides with 11.1.0's own `table-container` and should be re-judged against it, and Metric 2xl/align/fit has no consumer in atlas or the dashboards. |

### What should move into atlas instead of glass

Nothing in this line is atlas-only code, but four pieces should not ride into glass as they stand:

1. The blur and chrome register values (`af72d79a3`, `d46646127`, `dd74bf23a`, `d3d525806`, the token half of
   `64f5f2483`). You booked them as the 12.0.0 default. Until then atlas can set them on its own `:root` and
   drop them from the glass carry; the block is in `GLASS-11.2-REPIN-NOTES.md`.
2. `sheetFootRect` (`64f5f2483`): written for a site with one fixed foot bar, and wrong on a page with
   in-flow docks. Rework before glass takes it, or keep the seating rule in atlas.
3. Metric `2xl`, `align`, `fit` (`bd82a5425`): no consumer in our trees. Offer it as a proposal or drop it.
4. Carousel `autoplay` and `CarouselPlayToggle` (`9235d026c`): no consumer in our trees.

## The size of the rebase

- **Commits to carry:** 34 (the 9 partial and 25 absent rows). Four of them are fixups that fold into
  their parent (`bb09d74c4`, `f5d9c8843`, `1275da8ac` and the comment-only `3e60e5314`), and the four
  "move into atlas" pieces above leave glass. That leaves about 30 changes, which we would regroup by theme
  (sheet, slider, select and command, tabs indicator, deck snap, still constellation, dock deltas, dock
  growing rule, marks, plain run and linger, ExpandableContainer, hover note) rather than replay in order.
- **Conflicts, by simulation:** replaying our 63 commits onto `release/11.1.0` with `git merge-tree`
  conflicts on 15 of the 34 carried source commits, plus every CHANGELOG and bundle-ratchet commit (those
  are dropped and rebound once). A single three-way merge of the two tips conflicts in 40 paths, 28 of
  them under `src/`.
- **Where:** the dock, as expected. 17 of the 28 conflicting source files are dock files:
  `components/dock/GlassDock.vue`, `README.md`, `composables/{dockMorphMeasure,useDockMorph,useDockRunMark,useDockShellProps,useDockState}.ts`,
  `styles/{adaptive-legibility,dock,index,layers,morph,run,shape,shell-regions,shell}.css`,
  `styles/controls/icon-button.css`. The hottest are `components/dock/styles/run.css` (six of our
  commits conflict there; our tip differs from 11.1.0 by +156/−512 lines), `components/dock/styles/shell.css`
  (four), and `components/dock/composables/dockMorphMeasure.ts` (+303/−314; two commits, chiefly the
  two-axis growing rule `89f1df7c1` against 11.0.1's one-axis measure). Outside the dock:
  `components/slider/{Slider.vue,styles.css}` (three commits), `components/_shared/disclosure/disclosure.css`,
  `components/select/SelectContent.vue`, `components/table/{Table.vue,styles.css}`,
  `components/data-table/styles.css`, `components/handmark/HandMark.vue`,
  `styles/glass/{glass-capsule,overlay-plate}.css`, `styles/tokens/motion-registers.css`.

### APIs that atlas or the dashboards use and 11.1.0 does not have

No 11.0.0 or 11.1.0 removal reaches us. 11.0.0 was cut from our merge base, so our line already carries
its breaks (`DockBackdropMode`, the `MenuTrigger` type, `DockTrigger` at `./dock-trigger`, the selection
engine's deform parameters, and the rest): the package export maps of `u/sp-integ-glass` and
`release/11.1.0` are identical, and a census of every named import from `@mkbabb/glass-ui*` in
`.u-build/sp-integ-atlas/src` and `.u-build/sp-integ-sci/dashboards` (81 symbols) finds every one in
11.1.0 except the two below. 11.1.0's only removals, `--route-slide` and `--route-world-slide`, are used
nowhere in either tree. (`sp-integ-sci` has no top-level `src/`; its dashboards live in `dashboards/`.)

The breaks run the other way: these are APIs that exist only on our line, so they vanish at the repin
unless carried.

| API (our commit) | Kind | Used at |
|---|---|---|
| `StillConstellation` from `@mkbabb/glass-ui/constellation` (`9235d026c`, `f373de108`, `bd82a5425`) | export | `sp-integ-atlas/src/editorial/StoryGround.vue:21` (rendered at `:97` with `nodes`, `aspect`, `degree`, `fit`); `sp-integ-atlas/src/platform/chrome/background/still-field.ts:4` (re-export, loaded async at `Atmosphere.vue:67`, rendered at `:196` with `fit="meet"` at `:201`) |
| `StillPoint` type (`9235d026c`) | type | `sp-integ-atlas/src/editorial/story-card.ts:2` |
| GlassDock `run="plain"` (`bd82a5425`) | prop | `sp-integ-atlas/src/charts/frame/PlateDock.vue:286`. On 11.1.0 it falls through as an attribute and the run is a scroll container again. |
| GlassDock `hoverIntent` (`bd82a5425`) | prop | `sp-integ-atlas/src/charts/frame/PlateDock.vue:285` (`HOVER_INTENT_MS = 120` at `:89`). 11.1.0 has only the fixed `HOVER_INTENT_MS = 60`. |
| ExpandableContainer `origin` and `settle` (`bd82a5425`) | prop, event | `sp-integ-atlas/src/charts/frame/ChartFrame.vue:574` (`:origin`) and `:576` (`@settle`) |
| `--sheet-travel` (`360f6d7d2`) | CSS property | `sp-integ-atlas/src/filter/ui/FilterPanel.vue:531` |
| PagerDots `slideLabel` naming the dots (`a44ef3598`) | behaviour | `sp-integ-sci/dashboards/home/hero/HeroStage.vue:123`. The prop exists on 11.1.0, but there it only names the step announcement; the dot names and tooltips go. |
| Popover `trigger="hover"` note motion and Escape cure (`bd82a5425`) | behaviour | `sp-integ-atlas/src/interaction/FigureNote.vue:115`, `sp-integ-atlas/src/editorial/EasterEgg.vue:101`. The prop exists on 11.1.0. |

Not breaks, but checked: `HandMark color="var(--ncsu-red)"` (`sp-integ-sci/dashboards/home/HomeView.vue:43`)
is accepted by 11.1.0's `color?: string`; atlas's `handLine`, `handRing`, `strokeRibbon` and `Point`
(`sp-integ-atlas/src/charts/glyph/InkStroke.vue:12`) are all exported by 11.1.0 (you plan to remove them in
12.0.0). `--dock-control-radius` (`sp-integ-atlas/src/platform/chrome/dock/Dock.css:48`) is read by
11.1.0's `components/dock/styles/controls/icon-button.css:52–55`.

11.1.0 also changes defaults that will show on the site without an API change, and we will check each at
the repin: the gliding `aria-current` plate in navigation docks, `--radius-dock` as the stadium, the
`.dark` class alone deciding the theme, menus growing from their trigger, Collapsible and Accordion
without a fade, 44 px SegmentedTabs on touch, and `Table` drawing its own rounded container (atlas's
`DataTable` callers: `sp-integ-atlas/src/charts/frame/PlateTable.vue:21`,
`sp-integ-atlas/src/filter/ui/SourceDataBrowser.vue:11`,
`sp-integ-atlas/src/platform/provenance/DataViewerRoute.vue:15`,
`sp-integ-sci/dashboards/speedtest/features/hex-map/HexMapPlate.vue:21`,
`sp-integ-sci/dashboards/usf-integrity/features/rules/RulesTable.vue:16`).

### What your ledger already shows

From `docs/tranches/BL/audit/INBOUND.md` on `release/11.1.0`, for your convenience when marking: our line
through `7758575ef` (commits `af72d79a3` to `e8618e283` above) is booked as one intake for 11.2.0 (O-217,
with the reconciliation in O-226); the register is the 12.0.0 default (O-260); `f9c58b03f` is in 11.0.2
(O-261 to O-263); the Sheet overshoot is 11.1.1 (O-264); the dwell linger and the dock's three states are
W-I.8 (O-275, O-276); the growing rule is W-I.8 (O-248); the marks are the redesign loop (O-251, O-265).
I found no booking for `591d2d989`, `6b65b361b`, `4fbb690c8`, `ef2aa629a`, `360f6d7d2`, `2b6d1b1ea` or the
non-dock parts of `bd82a5425` (ExpandableContainer, Table, FadingScroll, Metric, the hover note, the still
grounds).
