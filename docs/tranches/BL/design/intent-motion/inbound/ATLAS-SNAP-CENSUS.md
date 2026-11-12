# Snap census, 2026-11-12

Every place in the atlas library and the sci dashboards where something changes size, position, shape, colour or presence in one frame. The law is motion-canon.md "P0" and the owner law at the end of precepts/README.md: nothing changes instantly, every change eases in and out, an exit is an animation too, and reduced motion is a short fade, never a cut.

Read from source only, at these worktrees: atlas `/Users/mkbabb/Programming/.u-build/sp-integ-atlas/src` (atlas paths below are relative to it) and sci `/Users/mkbabb/Programming/.u-build/sp-integ-sci` (sci paths are relative to it). Nothing was built, served or opened in a browser. "Confirmed" means the component's own styles and the CSS it imports were checked and carry no transition for that property. Rows marked "unconfirmed" need a look in the browser. Installed glass-ui is 10.1.2.

## Summary

Counts are rows in the tables below. Each row has one main kind.

| Kind | Rows |
|---|---|
| Presence (appears or vanishes in one frame) | 115 |
| Size (height or width jumps) | 42 |
| Position (moves in one frame) | 15 |
| Shape (corner, stroke, glyph or path changes in one frame) | 8 |
| Colour or opacity | 35 |
| Data (chart or numbers replaced without a tween) | 32 |
| Reduced-motion cut (reduced motion makes a cut, not a fade) | 49 |
| **Total** | **296** (two rows are notes, not cuts: `SiteShell.vue:139` and `spot-graphics.css:74`) |

| Owner | Rows |
|---|---|
| glass-ui | 13 |
| atlas | 162 |
| sci | 121 |

Two findings matter more than any single row:

- **Nothing fades out when it leaves.** Not one file in atlas `charts/`, `editorial/`, `platform/provenance/`, `story/`, or in the sci app, uses `<Transition>`. The only `<TransitionGroup>` in atlas is the filter drawer's dial list. Every live `v-if` is therefore a cut both ways, unless the element is a glass surface with its own motion.
- **Reduced motion is a cut everywhere.** `design/foundations/base.css:91` ships in `@mkbabb/atlas/styles`. It sets every transition and animation on the site to 0.001 ms under reduced motion. That one rule turns every fade into a cut, including the fades the law keeps. Forty-eight more rows repeat the cut locally.

### The ten most visible

1. **The enlarged plate (glass-ui).** Enlarge does not morph from the plate. Glass's ExpandableContainer plays a scale-and-fade birth on open, but closing is a cut. Atlas `charts/frame/ChartFrame.vue:527` records "the plate↔fullscreen swap is a cut". Glass `expandable-container.css` has an enter keyframe and no exit.
2. **The hover card (atlas).** `interaction/HoverCard.vue:386` mounts and unmounts the card with `v-if`, so it pops in and vanishes; the `transition-opacity` class on it never runs. Moving from one mark to the next swaps its content and height in one frame (`charts/readout/ReadoutFacts.vue:40`, `:54`, `:60`).
3. **Every ECharts plate on a filter or dial change (atlas, then sci).** When a change cannot tween (categories added, removed or reordered, a series added or removed), `charts/composables/useEChart.ts:365` pushes the option with `animation: false`, and `:252` replaces it outright. Under reduced motion `:279` turns animation off altogether. Separately, sci's option files set `animation: false` outright: all the usf-integrity plates, the bead strips, and the usf retention strip.
4. **Loading to figure (atlas).** The plate's grey skeleton is swapped for the figure, the empty state or the error in one frame (`charts/frame/VizPlate.vue:314`–`347`, and the beat-level `editorial/DashboardEssay.vue:381`). The skeleton itself is static (`PlateSkeleton.vue` has no animation), so the loading state has no breath either.
5. **The section pager label (atlas).** On every section change while scrolling, the dock's section name swaps by `visibility: hidden` (`platform/chrome/dock/components/DockSectionSelect.vue:241`). The phone Sections cell does the same.
6. **Light and dark (atlas, glass-ui).** The dock passes `disableTransitions: true` to glass's theme toggle (`platform/chrome/dock/Dock.vue:89`), so the whole page recolours in one frame. The chart retint does the same (`charts/composables/useEChart.ts:571`).
7. **Route changes (atlas, sci).** Only the dock roster, the dashboard Select and the homepage rows navigate inside a view transition. Every `RouterLink` (home tiles, the hero, previews, the detail sheet, error and 404 pages, the ledger link) and the browser's back and forward buttons swap the page in one frame (`platform/chrome/shell/SiteShell.vue:108`). Under reduced motion even the transitioned paths cut (`platform/chrome/dock/site-transition.ts:15`, sci `dashboards/home/navigate.ts:11`).
8. **The filter drawer (atlas).** The drawer is content-sized, so it jumps in height whenever one of these appears or leaves: "Clear N" (`filter/ui/FilterPanel.vue:463`), the lazily armed route body (`:489`), the foot (`filter/ui/components/FilterDrawerFoot.vue:68`), or the save form (`:75`). The dial list fades its items, but its own height still jumps (`filter/ui/UnifiedFilterPanel.vue:136`).
9. **Legends (atlas).** `charts/legend/ChartLegend.vue` has no transition. Dimming a chip, pressing a chip, recolouring the ramp, moving the hinge marker, thinning a tick and opening the tier list all happen in one frame.
10. **Selection panels and the source data browser (atlas).** The comparison card appears and leaves in one frame (`interaction/SelectionDrilldownPanel.vue:341`), and each row's drill card does too (`:505`). The source data browser grows the plate by a whole table in one frame (`charts/frame/VizPlate.vue:426`; `charts/scene/ChapterStage.vue:334`). The detail sheet unmounts with `v-if="item"`, so glass's sheet exit cannot play (`interaction/EntityDetail.vue:237`).

Next after these: maps and data marks. Map shapes swap with the grain, magnitude rings resize and jump, and the label rail pops (`charts/geo/GeoChoropleth.vue:432`, `:494`, `:566`). Plain bar charts snap their bars (the speedtest histogram, the demand cliff and ridge, the ECF window arc).

## The full table

Columns: where · the element · what changes · kind · instant on enter, exit or both · visibility (5 = every reader, a whole plate or chart; 1 = small and rare) · status.

### glass-ui (13)

| Where | Element | What changes | Kind | Instant | Vis | Status |
|---|---|---|---|---|---|---|
| atlas `charts/frame/ChartFrame.vue:527` (glass ExpandableContainer) | Enlarged plate | Open plays a birth fade, but nothing morphs from the plate; close is a cut | presence | exit | 5 | confirmed (glass `expandable-container.css`) |
| atlas `platform/chrome/dock/Dock.vue:89` → glass DarkModeToggle | Whole page on light/dark | `disableTransitions` fast path recolours everything in one frame. Glass owns the toggle; atlas chose the flag | colour | both | 5 | confirmed |
| atlas `platform/chrome/dock/Dock.vue:440` (glass GlassDock rail) | Rail fold after the pointer leaves | Fold starts after a fixed 150 ms grace (`Dock.vue:146`), not one that grows with dwell. The owner asked glass for a dwell-based linger. Whether the morph close is fully eased is glass's | position | exit | 5 | unconfirmed, needs a look in the browser |
| glass Collapsible (`collapsible.css`) used by atlas `filter/ui/SelectionSetPane.vue`, `interaction/SelectionDrilldownPanel.vue` | Disclosure chevron | `rotate: 180deg` with no transition (the body has open and close keyframes) | shape | both | 3 | unconfirmed, needs a look in the browser |
| glass Tooltip via atlas `interaction/ControlTip.vue:35`, `platform/chrome/dock/components/DockHint.vue:25` | Every control hint | In and out motion is glass's; its CSS could not be found in the dist | presence | both | 4 | unconfirmed, needs a look in the browser |
| glass SheetContent via atlas `filter/ui/FilterPanel.vue:444` | Filter drawer sheet | Size changes while open are not tweened by the sheet (block-size auto) | size | both | 5 | confirmed for atlas; glass may own a size tween |
| glass Popover via atlas `charts/frame/PlateDock.vue:179`, `:216` | Options and Download panels | Open and close are glass's | presence | both | 3 | unconfirmed, needs a look in the browser |
| glass GlassDock via atlas `charts/frame/PlateDock.vue:144` | Plate tools tray | Press-only expand; the owner asked for hover expand and motion | size | both | 4 | unconfirmed, needs a look in the browser |
| glass DataTable via atlas `platform/provenance/DataViewerRoute.vue:330` | Data viewer rows on search or sort | Rows re-render, reorder and drop in one frame | data | both | 4 | unconfirmed, needs a look in the browser |
| glass DataTable via atlas `filter/ui/SourceDataBrowser.vue` | Source data browser rows on page or sort | Rows swap in one frame | data | both | 3 | unconfirmed, needs a look in the browser |
| glass Surface via atlas `platform/chrome/background/AuroraVeilStage.vue:76` | Metal rim class on the focused member | Rim class added and removed in one frame | colour | both | 3 | unconfirmed, needs a look in the browser |
| glass Carousel via sci `dashboards/home/hero/HeroStage.vue:7` | Hero carousel strip | Cut under reduced motion, per the code's own note | reduced-motion cut | both | 5 | unconfirmed, needs a look in the browser |
| glass ExpandableContainer (`expandable-container.css`) | Expand trigger | `transition: none` under reduced motion | reduced-motion cut | both | 1 | confirmed |

### atlas (162)

#### Global and route

| Where | Element | What changes | Kind | Instant | Vis | Status |
|---|---|---|---|---|---|---|
| `design/foundations/base.css:91` | Every transition and animation on the site | Durations set to 0.001 ms under reduced motion | reduced-motion cut | both | 5 | confirmed (shipped in `styles/index.css:39`) |
| `platform/chrome/shell/SiteShell.vue:108` | Page content on any RouterLink, back or forward | Outlet re-keys with no transition; only the roster, Select and homepage rows use a view transition | presence | both | 5 | confirmed |
| `platform/chrome/dock/site-transition.ts:15` | Page on a dock navigation under reduced motion | View transition skipped | reduced-motion cut | both | 4 | confirmed |
| `platform/chrome/shell/SiteShell.vue:139` | Dock during a route hand-off | Held still on purpose (`animation: none` on the `site-dock` group); not a cut | position | — | 1 | confirmed, note only |
| `design/recipes/affordance.css:27` | Focus ring on every control | Outline appears and leaves in one frame | colour | both | 3 | confirmed |
| `design/overlays/chrome-overlays.css:83` | Active-plate gilt rim | `transition: none` under reduced motion | reduced-motion cut | both | 2 | confirmed |
| `design/overlays/spot-graphics.css:74` | Spot-graphic marks | Fence only; the marks are static, so nothing is actually cut | reduced-motion cut | — | 1 | confirmed, harmless |

#### The dock, rail, bar and pager

| Where | Element | What changes | Kind | Instant | Vis | Status |
|---|---|---|---|---|---|---|
| `platform/chrome/dock/components/DockSectionSelect.vue:241` | Pager's section name | Label swaps by `visibility: hidden` on each section change | presence | both | 5 | confirmed |
| `platform/chrome/dock/components/DockSectionCell.vue:31` | Phone bar's Sections cell label | Text swaps on each section change | data | both | 4 | confirmed |
| `platform/chrome/dock/Dock.vue:307` | Rail content on a route change under reduced motion | The fade swap is skipped | reduced-motion cut | both | 4 | confirmed |
| `platform/chrome/dock/Dock.vue:487` | Saved views control in the open rail | Appears on the first save; the rail grows by a row | presence | enter | 3 | confirmed |
| `platform/chrome/dock/Dock.vue:441` / `:519` | Rail and bar swap at 768 px | One unmounts, the other mounts | presence | both | 2 | confirmed |
| `platform/chrome/dock/Dock.vue:581` | Phone bar Filters cell | Appears when the dashboard's context loads | presence | enter | 3 | confirmed |
| `platform/chrome/dock/Dock.css:345` | Phone bar's shadow when it slides out | `box-shadow: none` with only `translate` transitioned | colour | both | 3 | confirmed |
| `platform/chrome/dock/Dock.css:390` | Phone bar slide-out under reduced motion | `transition: none` | reduced-motion cut | both | 4 | confirmed |
| `platform/chrome/dock/Dock.css:121` | Disc ring hand-over to the pager | `transition: none` under reduced motion | reduced-motion cut | both | 3 | confirmed |
| `platform/chrome/dock/Dock.css:224` | Spine year dip | `animation: none` under reduced motion | reduced-motion cut | both | 2 | confirmed |
| `platform/chrome/dock/MembraneTitleLozenge.vue:112` | Section pager open and close | `transition: none` under reduced motion, so the pager pops | reduced-motion cut | both | 5 | confirmed |
| `platform/chrome/dock/components/DockFilterTrigger.vue:71` | Applied-count badge on Filters | Pops in and out (and hides while the drawer is open); the number changes in one frame | presence | both | 4 | confirmed |
| `platform/chrome/dock/components/DockSectionSelect.vue:215` | Pager ‹ › buttons | Hover colour and disabled opacity in one frame | colour | both | 3 | confirmed |
| `platform/chrome/dock/components/DockFoot.vue:47` | Foot's route controls and separators | Appear per route (inside the swap fade, except under reduced motion) | presence | both | 2 | confirmed |
| `platform/chrome/dock/components/DockProgressRim.vue:31` | Progress rim | `transition: none` under reduced motion | reduced-motion cut | both | 3 | confirmed |
| `platform/chrome/dock/components/DockSearch.vue:159` | Search field hover tint | `transition: none` under reduced motion | reduced-motion cut | both | 2 | confirmed |
| `platform/chrome/dock/components/DockRoster.vue:123` | Roster row hover | `transition: none` under reduced motion | reduced-motion cut | both | 3 | confirmed |
| `platform/chrome/dock/components/DockNavItem.vue:145` | Rung rise | `animation: none` under reduced motion | reduced-motion cut | enter | 2 | confirmed |

#### Plates: VizPlate, ChartFrame, PlateDock

| Where | Element | What changes | Kind | Instant | Vis | Status |
|---|---|---|---|---|---|---|
| `charts/frame/VizPlate.vue:314` | Loading skeleton → figure, empty or error | `v-if` ladder with no crossfade | presence | both | 5 | confirmed |
| `charts/frame/PlateSkeleton.vue:44` | Loading skeleton | No idle motion at all (no shimmer or breath) | presence | — | 4 | confirmed |
| `charts/frame/VizPlate.vue:426` | Source data browser under the plate | Appears and leaves; the plate grows by a table | size | both | 5 | confirmed |
| `charts/frame/VizPlate.vue:396` | Focused key-stat band | Appears when a place is focused; the plate grows | presence | both | 4 | confirmed |
| `charts/frame/VizPlate.vue:376` | Table view on first press | The table mounts in the same tick its view flips, so the first fade-in may not run | presence | enter | 4 | unconfirmed, needs a look in the browser |
| `charts/frame/VizPlate.vue:368` | Keyboard focus rim | Appears and leaves in one frame (it travels with a spring) | presence | both | 2 | confirmed |
| `charts/frame/VizPlate.css:75` | Focus rim travel | `transition: none` under reduced motion | reduced-motion cut | both | 2 | confirmed |
| `charts/frame/VizPlate.vue:280` | Enlarged head and source line | Mount with the fullscreen layer | presence | both | 3 | confirmed |
| `charts/frame/ChartFrame.vue:586` | Legend side rail | Present per dock posture | presence | both | 2 | confirmed |
| `charts/frame/PlateDock.vue:175` | Dirty dot on More | Pops in and out | presence | both | 2 | confirmed |
| `charts/frame/PlateDock.vue:335` | Download and Options rows | Hover background has no transition | colour | both | 2 | confirmed |
| `charts/frame/PlateControls.vue:118` | Dial row vs stacked grid | Swaps at a width breakpoint | presence | both | 2 | confirmed |
| `charts/frame/PlateBoundary.vue:30` | Error swap and "Try again" | `v-if`/`v-else` | presence | both | 3 | confirmed |
| `charts/frame/PlateVoid.vue:67` | Empty plate | No enter or leave styling | presence | both | 4 | confirmed |

#### Legends and stat rows

| Where | Element | What changes | Kind | Instant | Vis | Status |
|---|---|---|---|---|---|---|
| `charts/legend/ChartLegend.vue:453` | Chip dim when another chip is pressed | Swatch opacity and label ink | colour | both | 4 | confirmed |
| `charts/legend/ChartLegend.vue:463` | Pressed chip | Label ink | colour | both | 4 | confirmed |
| `charts/legend/ChartLegend.vue:303` | Continuous ramp | Background swaps on a dial or year change | colour | both | 4 | confirmed |
| `charts/legend/ChartLegend.vue:305` | Hinge marker and label | Position jumps and presence flips | position | both | 3 | confirmed |
| `charts/legend/ChartLegend.vue:364` | Stepped ticks and labels | Thinned by `visibility: hidden` | presence | both | 3 | confirmed |
| `charts/legend/ChartLegend.vue:391` | Tier list | Native `<details>`; height jumps open and shut | size | both | 3 | confirmed |
| `charts/legend/ChartLegend.vue:484` | Clamp line and area key | Appear with the data | presence | both | 2 | confirmed |
| `charts/legend/VizAggregateStats.vue:34` | Plate stat row numbers | Values swap on a year or filter change; no count-up | data | both | 5 | confirmed |
| `charts/legend/VizKeyStats.vue:41` | Plate foot key stats | Values swap; the row appears and leaves | data | both | 4 | confirmed |
| `charts/legend/VizAnnotation.vue:23` | Annotation note | Pops in and out | presence | both | 2 | confirmed |

#### Hover, selection and detail

| Where | Element | What changes | Kind | Instant | Vis | Status |
|---|---|---|---|---|---|---|
| `interaction/HoverCard.vue:386` | Hover card | `v-if` mount and teardown | presence | both | 5 | confirmed |
| `interaction/HoverCard.vue:261` | Hover card position and size between marks | Seat jumps; content and height swap | position | both | 5 | confirmed |
| `charts/readout/ReadoutFacts.vue:40` | Readout fact rows and dots | Re-render per hovered place | data | both | 5 | confirmed |
| `charts/readout/ReadoutFacts.vue:54` | Readout breakdown block | Appears; the card height jumps | presence | both | 5 | confirmed |
| `charts/readout/ReadoutFacts.vue:60` | Breakdown bar fill | Width and colour per hover | size | both | 4 | confirmed |
| `interaction/SelectionDrilldownPanel.vue:341` | Comparison card (two or more selected) | Appears and leaves; it also swaps for the detail sheet | presence | both | 5 | confirmed |
| `interaction/SelectionDrilldownPanel.vue:505` | Row drill card | Opens in one frame; the chevron text swaps | size | both | 4 | confirmed |
| `interaction/SelectionDrilldownPanel.vue:539` | Promote and un-filter buttons | Pop in and out | presence | both | 3 | confirmed |
| `interaction/EntityDetail.vue:237` | Detail sheet | `v-if="item"` unmounts the sheet, so its exit cannot play; a new place swaps the content | presence | exit | 5 | confirmed |
| `interaction/EntityDetail.vue:312` | Sparkline ↔ table | `v-if`/`v-else` | presence | both | 3 | confirmed |
| `filter/ui/SelectionSetPane.vue:193` | Selection band in the drawer | Appears on the first select | presence | both | 4 | confirmed |
| `filter/ui/SelectionSetPane.vue:312` | Member stat vs empty note | Swap | presence | both | 2 | confirmed |

#### The filter drawer and its controls

| Where | Element | What changes | Kind | Instant | Vis | Status |
|---|---|---|---|---|---|---|
| `filter/ui/FilterPanel.vue:463` | "Clear N" in the drawer head | Pops in and out | presence | both | 4 | confirmed |
| `filter/ui/FilterPanel.vue:489` | Route filter body | Armed late; the drawer grows | size | enter | 4 | confirmed |
| `filter/ui/components/FilterDrawerFoot.vue:68` | Drawer foot | `v-show`; the drawer height jumps | size | both | 4 | confirmed |
| `filter/ui/components/FilterDrawerFoot.vue:75` | Save view ↔ name form | Swap, and the foot wraps to two rows | size | both | 3 | confirmed |
| `filter/ui/components/FilterDrawerFoot.vue:104` | "Saved" tick | Pops | presence | both | 2 | confirmed |
| `filter/ui/UnifiedFilterPanel.vue:136` | Dial list height | Leaving dials are taken out of flow, so the list shrinks in one frame | size | both | 3 | confirmed |
| `filter/ui/UnifiedFilterPanel.vue:62` | Context and view bands | Appear and leave on scroll context | presence | both | 3 | confirmed |
| `filter/ui/UnifiedFilterPanel.vue:147` | Dial FLIP | `transition: none` under reduced motion | reduced-motion cut | both | 3 | confirmed |
| `filter/ui/components/YearScrubber.vue:306` | Active year | No thumb travels; the fill jumps pip to pip | position | both | 4 | confirmed |
| `filter/ui/components/YearScrubber.vue:383` | Year label opacity, and dim pips (`:462`) | Opacity flips with no transition | colour | both | 3 | confirmed |
| `filter/ui/components/YearScrubber.vue:223` | Single ↔ compare From/To selects | Swap | presence | both | 3 | confirmed |
| `filter/ui/components/YearScrubber.vue:471` | Pip dot | `transition: none` under reduced motion | reduced-motion cut | both | 2 | confirmed |
| `filter/ui/DimDial.vue:125` | Dial value vs "Any", and the clear button (`:128`) | Swap and pop; the active class has no transition | presence | both | 3 | confirmed |
| `filter/ui/VizOptionsBand.vue:117` | "Reset to defaults" | Pops in and out | presence | both | 3 | confirmed |
| `filter/ui/AlgebraReadout.vue:77` | Filter scope line and band count | Appear when a filter applies | presence | both | 3 | confirmed |
| `filter/ui/PercentileRangeSlider.vue:69` | Range readout's second value | Pops | presence | both | 1 | confirmed |

#### Charts and data

| Where | Element | What changes | Kind | Instant | Vis | Status |
|---|---|---|---|---|---|---|
| `charts/composables/useEChart.ts:365` | Any ECharts plate when a change cannot tween | Pushed with `animation: false` | data | both | 5 | confirmed |
| `charts/composables/useEChart.ts:252` | Any plate whose option shape changed | `notMerge` full replace | data | both | 5 | confirmed |
| `charts/composables/useEChart.ts:279` | Every ECharts plate under reduced motion | `animation: false` | reduced-motion cut | both | 5 | confirmed |
| `charts/composables/useEChart.ts:571` | Series colours on a light/dark switch | Retint with `animation: false` | colour | both | 4 | confirmed |
| `charts/composables/echart-tween.ts:230` | Series joining or leaving during a value tween | Pops whole | presence | both | 4 | confirmed |
| `charts/composables/useEChart.ts:432` | Colours, mark areas and labels during a tween | Only values tween; the rest jump | colour | both | 4 | unconfirmed, needs a look in the browser |
| `charts/scene/stage-morph.ts:143` | ChapterStage chart that is not phase-driven, on a scene pick | Pushed at rest | data | both | 4 | confirmed |
| `charts/scene/stage-morph.ts:86` | Stage crossfade without `Element.animate` | Falls back to a cut | data | both | 1 | confirmed |
| `charts/marks/RankedBar.vue:263` | Ranked bar re-rank | Cut under reduced motion | reduced-motion cut | both | 4 | confirmed |
| `charts/marks/RankedBar.vue:428` | Ranked bar host height | Jumps with the row count | size | both | 4 | confirmed |
| `charts/marks/Treemap.vue:360` | Treemap re-tile | Cut under reduced motion | reduced-motion cut | both | 4 | confirmed |
| `charts/marks/StackedBar.vue:178` | Stacked bars when the category set changes | Re-stack in one frame | data | both | 4 | confirmed |
| `charts/marks/scatter-compare.ts:70` | Compare rings and join lines (`:86`) | `animation: false` | presence | both | 3 | unconfirmed, needs a look in the browser |
| `charts/marks/scatter-phase.ts:212` | Key-point ring and label | Jump | position | both | 3 | unconfirmed, needs a look in the browser |
| `charts/marks/ScatterPlate.vue:184` | Scatter with no phase | Dots jump | data | both | 4 | unconfirmed, needs a look in the browser |
| `charts/marks/MultiYearFigure.vue:166` | WindowArc ↔ Trajectory plate (`:205`) | Whole plate remounts | presence | both | 5 | unconfirmed, needs a look in the browser |
| `charts/marks/TrajectoryPlate.vue:327` | Columns ↔ line body (`:335`) | Swap | shape | both | 5 | confirmed |
| `charts/marks/TimeSeries.vue:509` | Legend strip | Pops; the canvas shifts | presence | both | 3 | confirmed |
| `charts/marks/UnitChart.vue:109` | Unit chart when the count changes | `snap()` to the new layout | data | both | 4 | confirmed |
| `charts/marks/UnitChart.vue:113` | Unit chart on resize | Snap; canvas size jumps (`:187`) | size | both | 2 | confirmed |
| `charts/marks/UnitChart.vue:123` | Unit chart palette | Repaints in one frame | colour | both | 3 | confirmed |
| `charts/marks/unit-engine.ts:289` | Unit morphs and dims | Cut under reduced motion | reduced-motion cut | both | 3 | confirmed |
| `charts/marks/BarRows.vue:161` | Bar rows enter and reorder | Pop and jump under reduced motion (`:170`) | reduced-motion cut | both | 4 | confirmed |
| `charts/marks/BarRows.vue:330` | Key-point row name | Colour and weight flip | colour | both | 3 | confirmed |
| `charts/marks/BarRows.vue:262` | PlaceMark outline in a row | Colour swap | colour | both | 2 | confirmed |
| `charts/marks/BarRows.vue:277` | Key-point note | Pops | presence | both | 3 | confirmed |
| `charts/marks/BarRows.vue:273` | Reference rule and label (`:274`) | Presence, and the position jumps | position | both | 3 | confirmed |
| `charts/marks/BarRows.vue:244` | Value column width | Jumps | size | both | 2 | confirmed |
| `charts/geo/GeoChoropleth.vue:432` | Map shapes on a grain or geography swap | Paths unmount and mount; the entrance plays once per page | presence | both | 5 | unconfirmed, needs a look in the browser |
| `charts/geo/GeoChoropleth.vue:461` | Dim hatch | Fades in; leaves with a cut | presence | exit | 4 | confirmed |
| `charts/geo/GeoChoropleth.vue:494` | Magnitude rings | Radius and position bound to data | size | both | 4 | confirmed |
| `charts/geo/GeoChoropleth.vue:515` | Value labels | Layer mounts; labels jump | presence | both | 4 | confirmed |
| `charts/geo/GeoChoropleth.vue:555` | Place-label ink flip | Fill flips | colour | both | 3 | confirmed |
| `charts/geo/GeoChoropleth.vue:566` | Label rail | Pops and re-lays out | presence | both | 4 | confirmed |
| `charts/geo/GeoChoropleth.css:322` | Rail thread lift | Stroke opacity flips | colour | both | 3 | confirmed |
| `charts/geo/GeoChoropleth.vue:137` | Map viewBox when a rail is laid | Map scales and shifts | size | both | 3 | confirmed |
| `charts/geo/GeoChoropleth.vue:442` | Raised shape stroke-width attribute | May not pick up the CSS transition | shape | both | 3 | unconfirmed, needs a look in the browser |
| `charts/geo/GeoChoropleth.css:76` | Every map recolour | `transition: none` under reduced motion | reduced-motion cut | both | 5 | confirmed |
| `charts/geo/GeoChoropleth.css:79` | Dim hatch | `animation: none` under reduced motion | reduced-motion cut | enter | 3 | confirmed |
| `charts/geo/GeoChoropleth.css:83` | Hover outline trace | `animation: none` under reduced motion | reduced-motion cut | enter | 3 | confirmed |
| `charts/glyph/Glyph.vue:459` | Dimmed glyph | Host opacity snaps | colour | both | 3 | confirmed |
| `charts/glyph/Glyph.vue:274` | Glyph dim hatch | Pops | presence | both | 3 | confirmed |
| `charts/glyph/Glyph.vue:267` | Glyph fill | Colour jumps | colour | both | 3 | confirmed |
| `charts/glyph/Glyph.vue:212` | Silhouette ↔ placeholder (`:298`) | Swap | shape | both | 2 | confirmed |
| `charts/glyph/Glyph.vue:247` | Accent glow | Pops | presence | both | 2 | confirmed |
| `charts/glyph/Glyph.vue:469` | Raise stroke | `transition: none` under reduced motion | reduced-motion cut | both | 2 | confirmed |
| `charts/glyph/EntityIcon.vue:411` | Dimmed icon | Opacity snaps | colour | both | 3 | confirmed |
| `charts/glyph/EntityIcon.vue:205` | Icon fills (`:166`, `:236`, `:247`) | Swap | colour | both | 3 | confirmed |
| `charts/glyph/EntityIcon.vue:428` | Raise stroke | `transition: none` under reduced motion | reduced-motion cut | both | 2 | confirmed |
| `charts/glyph/EChartOrnament.vue:25` | Scatter anchor ring | Blinks out on every paint and pops back | presence | both | 3 | confirmed |
| `charts/scene/ChapterStage.vue:334` | Source data overlay on the stage | Pops | presence | both | 4 | confirmed |
| `charts/scene/StickyScene.vue:128` | Scene graphic swap | No crossfade | presence | both | 4 | unconfirmed, needs a look in the browser |
| `charts/scene/StickyScene.vue:113` | Scene head control row | Pops | presence | both | 2 | confirmed |
| `charts/scene/PaperCallout.vue:146` | Callout chip and leader (`:133`) | Jump | position | both | 3 | confirmed |
| `charts/scene/PeriodControl.vue:180` | Play ↔ pause icon | Glyph swap | shape | both | 2 | confirmed |
| `charts/scene/ScrollTimeline.vue:249` | Rail readout (not mounted today) | Pops | presence | both | 1 | confirmed |
| `charts/scene/ScrollTimeline.vue:381` | Thumb scale | Cut under reduced motion | reduced-motion cut | both | 1 | confirmed |

#### Editorial, provenance, background, story

| Where | Element | What changes | Kind | Instant | Vis | Status |
|---|---|---|---|---|---|---|
| `editorial/DashboardEssay.vue:381` | Beat skeleton → plate (`PlateBoundary` `:372`) | Swap | presence | both | 5 | confirmed |
| `editorial/DashboardEssay.vue:297` | Beat height reserve released | Page below jumps | size | both | 3 | unconfirmed, needs a look in the browser |
| `editorial/DashboardHero.vue:337` | Hero figure values on a filter (after the first count-up) | Text swaps | data | both | 5 | unconfirmed, needs a look in the browser |
| `editorial/DashboardHero.vue:359` | Hero scope caption | Pops | presence | both | 3 | unconfirmed, needs a look in the browser |
| `editorial/CrownFigure.vue:107` | Crown value and record pill (`:116`) | Swap | data | both | 3 | unconfirmed, needs a look in the browser |
| `editorial/StoryCardStats.vue:17` | Story-card stat row | Pops; the card height jumps | presence | both | 4 | confirmed |
| `editorial/RecordSeam.vue:128` | Record seam tag (`:139`) | Jumps | position | both | 2 | confirmed |
| `editorial/AnimatedRule.vue:190` | Rule draw | `transition: none` under reduced motion (rarely bites) | reduced-motion cut | enter | 1 | confirmed |
| `platform/provenance/ProvenanceBar.vue:149` | "Source and method" record | `[hidden]`; height jumps | size | both | 4 | confirmed |
| `platform/provenance/ProvenanceBar.vue:184` | Filter rung | Pops | presence | both | 3 | confirmed |
| `platform/provenance/ProvenanceBar.vue:255` | Handle hover colour (`:318`) | Flips | colour | both | 1 | unconfirmed, needs a look in the browser |
| `platform/provenance/VizAppendixDock.vue:142` | Appendix pane in the plate foot | `[hidden]`; the foot grows | size | both | 4 | confirmed |
| `platform/provenance/VizAppendixDock.vue:127` | Peek row | Pops | presence | both | 3 | confirmed |
| `platform/provenance/VizAppendixDock.vue:122` | Close ↔ "Source and method" label, and underline (`:223`) | Text swaps; the underline pops | shape | both | 2 | confirmed |
| `platform/provenance/ProvenanceChip.vue:55` | Provenance chip on the active plate | Pops on and off while scrolling | presence | both | 4 | confirmed |
| `platform/provenance/ProvenanceAppendix.vue:94` | Appendix Filter rung and section (`:49`) | Pops | presence | both | 2 | confirmed |
| `platform/provenance/DataViewerRoute.vue:285` | Data viewer error, loading and content (`:290`, `:292`, `:303`) | Swap | presence | both | 4 | confirmed |
| `platform/provenance/DataViewerRoute.vue:329` | "No rows match" ↔ table | Swap while typing | presence | both | 4 | confirmed |
| `platform/provenance/DataViewerRoute.vue:421` | Current dataset in the nav (`:263`) | Background and weight flip | colour | both | 2 | confirmed |
| `platform/provenance/DataViewerRoute.vue:324` | "Showing N of M rows" (`:278`) | Appears and changes | presence | both | 2 | confirmed |
| `platform/chrome/background/Atmosphere.vue:245` | Field arrival | Cut under reduced motion | reduced-motion cut | enter | 2 | confirmed |
| `platform/chrome/background/Atmosphere.vue:213` | Paper grain on a theme flip | Opacity steps | colour | both | 1 | confirmed |
| `platform/chrome/background/AuroraVeilStage.vue:177` | Selection card rim colour | `transition: none` under reduced motion | reduced-motion cut | both | 3 | confirmed |
| `platform/chrome/background/AuroraVeilStage.vue:180` | Catch-light sweep | Removed under reduced motion, with no fade in its place | reduced-motion cut | enter | 2 | confirmed |
| `platform/chrome/background/AuroraVeilStage.vue:150` | Sweep band when the select clears | Opacity drops | colour | exit | 2 | unconfirmed, needs a look in the browser |
| `platform/chrome/masthead/BrandMark.vue:184` | Crest hover lift and draw | Held under reduced motion, with no fade either | reduced-motion cut | both | 2 | confirmed |
| `platform/chrome/masthead/SiteColophon.vue` (also `platform/provenance/SourceLink.vue:44`, `charts/frame/PlateVoid.vue:105`) | Link hover underline colour | Flips | colour | both | 1 | confirmed |
| `story/useStoryDirector.ts:146` | Shared-element beat edges | Under reduced motion, t snaps to 0 or 1 | reduced-motion cut | both | 2 | unconfirmed, needs a look in the browser |

### sci (121)

#### Home and route frame

| Where | Element | What changes | Kind | Instant | Vis | Status |
|---|---|---|---|---|---|---|
| `dashboards/home/dashboard/DashboardView.vue:219` | Route body | Mounts with no transition when reached by a plain link | presence | both | 5 | unconfirmed, needs a look in the browser |
| `dashboards/home/dashboard/DashboardView.vue:218` | Route error card | Swaps in | presence | both | 3 | confirmed |
| `dashboards/home/dashboard/DashboardView.vue:227` | Filter panel slot | Appears when the idle latch fires | presence | enter | 4 | unconfirmed, needs a look in the browser |
| `dashboards/home/dashboard/DashboardView.vue:246` | Hover card host | Mounts on the first hover | presence | enter | 4 | unconfirmed, needs a look in the browser |
| `dashboards/home/dashboard/DashboardView.vue:251` | Drilldown dock | `v-if` with no transition (the component is atlas's) | presence | both | 5 | confirmed |
| `dashboards/home/navigate.ts:11` | Homepage row hand-off | Cut under reduced motion | reduced-motion cut | both | 4 | confirmed |
| `dashboards/home/hero/HeroStage.vue:304` | Hero caption words | `transition: none` under reduced motion | reduced-motion cut | both | 4 | confirmed |
| `dashboards/home/hero/HeadlineTile.vue:21`, `dashboards/home/CategoryHomeView.vue:22`, `dashboards/home/NotFoundView.vue:13`, `dashboards/home/dashboard/RouteError.vue:46`, `dashboards/usf/features/flow/FundLedgerFlow.vue:182` | Plain RouterLinks | Page swaps in one frame (the tile wraps its click; the others do not) | presence | both | 4 | confirmed |
| `dashboards/home/dashboard/RouteReference.vue:52` | "Sources and methods" | `v-show`; height jumps | size | both | 3 | confirmed |
| `dashboards/home/dashboard/RouteReference.vue:96` | Sources underline | Hover colour | colour | both | 1 | confirmed |

#### /sci

| Where | Element | What changes | Kind | Instant | Vis | Status |
|---|---|---|---|---|---|---|
| `dashboards/sci/features/map/SchoolMap.vue:692` | District fills on a year or filter change | Colour inside atlas GeoChoropleth | colour | both | 5 | unconfirmed, needs a look in the browser |
| `dashboards/sci/features/map/SchoolMap.vue:724` | Charter catchments ↔ point glyphs | Swap | presence | both | 4 | confirmed |
| `dashboards/sci/features/map/SchoolMap.vue:736` | Charter shape fill | Only fill-opacity is transitioned | colour | both | 3 | confirmed |
| `dashboards/sci/features/map/SchoolMap.vue:888` | Charter hover and select stroke | Snaps | shape | both | 2 | confirmed |
| `dashboards/sci/features/map/SchoolMap.vue:896` | Charter shapes | `transition: none` under reduced motion | reduced-motion cut | both | 2 | confirmed |
| `dashboards/sci/features/map/SchoolMap.vue:925` | Charter points | `transition: none` under reduced motion | reduced-motion cut | both | 2 | confirmed |
| `dashboards/sci/features/scatter/SciScatter.vue:1135` | Scatter empty overlay | Pops | presence | both | 4 | confirmed |
| `dashboards/sci/features/scatter/SciScatter.vue:1146` | Scatter legend | Swaps with the view dial | presence | both | 3 | confirmed |
| `dashboards/sci/features/scatter/SciScatter.vue:515` | Marks hidden for the morph hand-off | Opacity drops in one push | colour | both | 2 | unconfirmed, needs a look in the browser |
| `dashboards/sci/features/rainbow/RainbowStack.vue:261` | Band rise | Snaps under reduced motion (also `:325` measure flip, `:340` filter) | reduced-motion cut | both | 4 | confirmed |
| `dashboards/sci/story/points/03-trend/Point.vue:268` | Trend plate ↔ empty | Whole plate swaps | presence | both | 5 | confirmed |
| `dashboards/sci/story/points/03-trend/Point.vue:295` | Active-year facts | Appear and change; height jumps | size | both | 3 | confirmed |
| `dashboards/sci/story/points/02-map/MapYearLine.vue:28` | Withdrawn-claim line | Pops | presence | both | 2 | confirmed |
| `dashboards/sci/story/points/04-scatter/Readout.vue:30` | "N selected." | Pops | presence | both | 2 | confirmed |
| `dashboards/sci/features/filter/SciFilter.vue:135` | School finder results | Appear and leave | size | both | 3 | confirmed |
| `dashboards/sci/edition/EditionLine.vue:66` | Period notice | Pops; layout shifts | presence | both | 3 | confirmed |
| `dashboards/sci/edition/EditionLine.vue:83` | Edition lead sentence | Text swaps | data | both | 3 | confirmed |
| `dashboards/sci/edition/EditionLine.vue:101` | "How this edition counts years" body | Height jumps | size | both | 3 | unconfirmed, needs a look in the browser |
| `dashboards/sci/edition/EditionLine.vue:116` | Mark key line | Pops on load | presence | enter | 2 | confirmed |
| `dashboards/sci/edition/EditionRecord.vue:17` | Edition record | Mounts on load | presence | enter | 2 | confirmed |

#### /speedtest

| Where | Element | What changes | Kind | Instant | Vis | Status |
|---|---|---|---|---|---|---|
| `dashboards/speedtest/features/distribution/BenchmarkDistribution.vue:273` | Histogram bars on Download ↔ Upload | Height, position and fill snap | data | both | 5 | confirmed |
| `dashboards/speedtest/features/distribution/BenchmarkDistribution.vue:254` | Box plot | Snaps | position | both | 4 | confirmed |
| `dashboards/speedtest/features/distribution/BenchmarkDistribution.vue:296` | FCC benchmark rule | Jumps | position | both | 3 | confirmed |
| `dashboards/speedtest/features/distribution/BenchmarkDistribution.vue:230` | Figure ↔ "binds when connected" note | Swap | presence | both | 4 | confirmed |
| `dashboards/speedtest/features/hero/SpeedtestHero.vue:115` | Hero crown figure | Pops in on load | presence | enter | 5 | unconfirmed, needs a look in the browser |
| `dashboards/speedtest/features/hero/SpeedtestHero.vue:129` | Support pair | Pops in | presence | enter | 4 | confirmed |
| `dashboards/speedtest/features/hero/SpeedtestHero.vue:144` | Upload row | Pops in and pushes the page | size | enter | 4 | confirmed |
| `dashboards/speedtest/features/hex-map/HexMapPlate.vue:303` | Hex field ↔ empty | Swap on load | presence | both | 5 | confirmed |
| `dashboards/speedtest/features/hex-map/HexMapPlate.vue:266` | Thin-coverage table ↔ map | Swap | size | both | 4 | confirmed |
| `dashboards/speedtest/features/hex-map/HexMapPlate.vue:230` | Hex legend | Pops in | presence | enter | 3 | confirmed |
| `dashboards/speedtest/features/hex-map/HexMapPlate.vue:341` | Footer sentence | Pops in | presence | enter | 2 | confirmed |
| `dashboards/speedtest/features/survey/SurveyChapter.vue:92` | Ranked county rows | Reorder in one frame | position | both | 4 | confirmed |
| `dashboards/speedtest/features/survey/SurveyChapter.vue:102` | Rank bars | Width snaps | size | both | 4 | confirmed |
| `dashboards/speedtest/features/survey/SurveyChapter.vue:139` | County service-mix bars | Width snaps | size | both | 3 | confirmed |
| `dashboards/speedtest/features/survey/SurveyChapter.vue:110` | County focus block | Mounts | presence | enter | 2 | confirmed |

#### /demand

| Where | Element | What changes | Kind | Instant | Vis | Status |
|---|---|---|---|---|---|---|
| `dashboards/demand/features/trajectory/DemandRidge.vue:362` | Stacked ridge paths | `:d` bound to data, no tween | data | both | 5 | confirmed |
| `dashboards/demand/features/trajectory/DemandRidge.vue:303` | Ridge ↔ per-year table | Whole figure swaps | presence | both | 4 | confirmed |
| `dashboards/demand/features/trajectory/DemandRidge.vue:337` | Funding-cap rule and tag | Jumps and pops | position | both | 3 | confirmed |
| `dashboards/demand/features/trajectory/DemandRidge.vue:322` | Ticks and band labels | Jump | position | both | 3 | confirmed |
| `dashboards/demand/features/cliff/ContractCliff.vue:315` | Cliff bars | Height snaps | size | both | 4 | confirmed |
| `dashboards/demand/features/cliff/ContractCliff.vue:271` | Cliff ↔ empty | Swap | presence | both | 4 | confirmed |
| `dashboards/demand/features/cliff/ContractCliff.vue:328` | Consequence line | Pops | presence | both | 2 | confirmed |
| `dashboards/demand/features/product-mix/ProductMixPlate.vue:445` | Product-mix bars | `transition: none` in every mode; width and colour snap | size | both | 4 | confirmed |
| `dashboards/demand/features/product-mix/ProductMixPlate.vue:254` | Mix rows re-rank | Reorder in one frame | position | both | 3 | confirmed |
| `dashboards/demand/features/product-mix/ProductMixPlate.vue:286` | In-bar ↔ past-end label | Swap | presence | both | 2 | confirmed |
| `dashboards/demand/features/product-mix/ProductMixPlate.vue:404` | Row name hover | Colour and underline | colour | both | 2 | confirmed |
| `dashboards/demand/features/product-mix/ProductMixPlate.vue:333` | Mix-over-time segments | Width snaps | size | both | 3 | unconfirmed, needs a look in the browser |
| `dashboards/demand/features/bands/DiscountBandStrip.vue:118` | Discount band segments | Width snaps; labels pop | size | both | 3 | unconfirmed, needs a look in the browser |
| `dashboards/demand/features/filter/DemandFilter.vue:59` | Funding-year slider | Pops in | presence | enter | 2 | confirmed |

#### /ecf

| Where | Element | What changes | Kind | Instant | Vis | Status |
|---|---|---|---|---|---|---|
| `dashboards/ecf/story/points/01-window-arc/Point.vue:191` | Cliff columns and status bands | Height snaps; the rise the comment names has no CSS | size | both | 5 | confirmed |
| `dashboards/ecf/story/points/01-window-arc/Point.vue:156` | Window-arc ↔ empty | Swap | presence | both | 4 | confirmed |
| `dashboards/ecf/story/points/01-window-arc/Point.vue:217` | Status key item | Pops | presence | both | 2 | confirmed |
| `dashboards/ecf/story/points/02-item-mix/Point.vue:234` | Item-mix bands | Width and colour snap; labels pop | size | both | 4 | confirmed |
| `dashboards/ecf/story/points/02-item-mix/Point.vue:265` | Items table ↔ "Loading line items." | Swap | presence | both | 3 | confirmed |
| `dashboards/ecf/story/points/03-vendors/Point.vue:104` | Vendors bar ↔ loading line | Swap | presence | both | 3 | confirmed |
| `dashboards/ecf/features/consultants/ConsultantsRankedBar.vue:372` | Ranked bar ↔ lollipop | View swap, not a morph | presence | both | 4 | unconfirmed, needs a look in the browser |
| `dashboards/ecf/features/consultants/Lollipop.vue:124` | Stems and dots | Width and position snap | size | both | 3 | confirmed |
| `dashboards/ecf/features/charters/ChartersTreemap.vue:540` | Treemap ↔ packed bars | View swap | presence | both | 4 | unconfirmed, needs a look in the browser |
| `dashboards/ecf/features/charters/PackedBars.vue:209` | Packed bars scale | `transition: none` under reduced motion | reduced-motion cut | both | 3 | confirmed |
| `dashboards/ecf/features/districts/DistrictChoropleth.vue:832` | District readout card | Mounts; content swaps on select | presence | both | 4 | confirmed |
| `dashboards/ecf/features/districts/DistrictChoropleth.vue:889` | Never-filed sentence | Pops | presence | both | 1 | confirmed |
| `dashboards/ecf/features/filter/EcfSearchSelect.vue:48` | Search results and clear chip | Pop; the list grows | size | both | 3 | confirmed |

#### /usf

| Where | Element | What changes | Kind | Instant | Vis | Status |
|---|---|---|---|---|---|---|
| `dashboards/usf/features/retention/useRankedStripOption.ts:59` | Retention strip | `animation: false` | data | both | 4 | confirmed |
| `dashboards/usf/features/flow/components/FundRibbon.vue:110` | Fund ribbon paths | `:d` bound to data | data | both | 4 | unconfirmed, needs a look in the browser |
| `dashboards/usf/features/flow/StateDisbursementBars.vue:235` | Phone "Show all 51" | 10 ↔ 51 rows in one frame | size | both | 3 | confirmed |
| `dashboards/usf/features/flow/StateDisbursementBars.vue:213` | Program key ↔ density key | Swap | presence | both | 2 | confirmed |
| `dashboards/usf/features/scale/ScaleScatter.vue:523` | Lens legends | Visibility toggle | presence | both | 3 | confirmed |
| `dashboards/usf/features/scale/ScaleScatter.vue:488` | Outline ↔ disc mark | Shape swap mid-tween | shape | both | 2 | unconfirmed, needs a look in the browser |
| `dashboards/usf/features/scale/ScaleScatter.vue:504` | State code labels | Pop with space | presence | both | 2 | unconfirmed, needs a look in the browser |
| `dashboards/usf/features/normalization/NormalizationSlope.vue:219` | Hover labels and outline | Pop | presence | both | 3 | confirmed |
| `dashboards/usf/features/normalization/NormalizationSlope.vue:336` | Dimmed labels | Fill snaps | colour | both | 2 | confirmed |
| `dashboards/usf/features/normalization/NormalizationSlope.vue:342` | Slope lines and dots | `transition: none` under reduced motion | reduced-motion cut | both | 2 | confirmed |
| `dashboards/usf/features/normalization/NormalizationFlip.vue:209` | Per-capita ↔ per-area morph | t jumps under reduced motion | reduced-motion cut | both | 4 | confirmed |
| `dashboards/usf/features/normalization/NormalizationFlip.vue:521` | Face cross-fade | `transition: none` under reduced motion | reduced-motion cut | both | 3 | confirmed |
| `dashboards/usf/features/balance/useBreakEvenOption.ts:211` | Break-even scatter outside the phase tween | `animation: false` | data | both | 2 | unconfirmed, needs a look in the browser |
| `dashboards/usf/story/points/06-decade/Point.vue:328` | Decade band areas and ticks | Bound to data | data | both | 3 | unconfirmed, needs a look in the browser |
| `dashboards/usf/story/points/06-decade/Point.vue:212` | Decade crown stat | Pops in | presence | enter | 3 | confirmed |

#### /usf-integrity

| Where | Element | What changes | Kind | Instant | Vis | Status |
|---|---|---|---|---|---|---|
| `dashboards/usf-integrity/story/points/04-outliers-scale/Point.vue:54` | Two plates ↔ one sentence | Swap on a filter | presence | both | 5 | confirmed |
| `dashboards/usf-integrity/features/beeswarm/composables/useBeeswarmOption.ts:124` | Beeswarm | `animation: false` | data | both | 4 | confirmed |
| `dashboards/usf-integrity/features/beeswarm/WfaBeeswarm.vue:386` | Chart ↔ list ↔ single entry | Swap; height 200 px ↔ medium | size | both | 4 | confirmed |
| `dashboards/usf-integrity/features/scatter/useScatterOption.ts:189` | Ratio scatter | `animation: false` | data | both | 4 | confirmed |
| `dashboards/usf-integrity/features/scatter/components/WfaScatter.vue:315` | Scatter ↔ list | Swap; height snaps | size | both | 4 | confirmed |
| `dashboards/usf-integrity/features/chord/useChordOption.ts:181` | Vendor chord | `animation: false` | data | both | 4 | confirmed |
| `dashboards/usf-integrity/features/chord/VendorChord.vue:375` | Vendor-share block | Pops; bar widths snap | size | both | 3 | confirmed |
| `dashboards/usf-integrity/features/chord/VendorChord.vue:331` | Chord ↔ single entry | Swap | presence | both | 3 | confirmed |
| `dashboards/usf-integrity/features/benford/composables/useBenfordOption.ts:158` | Benford bars | `animation: false` | data | both | 4 | confirmed |
| `dashboards/usf-integrity/features/benford/BenfordOverlay.vue:213` | Combined ↔ small multiples | Swap | presence | both | 4 | confirmed |
| `dashboards/usf-integrity/features/biplot/composables/useBiplotOption.ts:273` | PCA biplot | `animation: false` | data | both | 3 | confirmed |
| `dashboards/usf-integrity/features/cap/composables/useCapOption.ts:154` | Cap bars | `animation: false` | data | both | 3 | confirmed |
| `dashboards/usf-integrity/features/wires/useWiresOption.ts:57` | Wires bars | `animation: false` | data | both | 3 | confirmed |
| `dashboards/usf-integrity/features/reform/useReformOption.ts:59` | Reform bars | `animation: false` | data | both | 3 | confirmed |
| `dashboards/usf-integrity/features/filter/ConsultantFilter.vue:60` | Filter groups | Pop in | presence | enter | 2 | confirmed |

#### /bead

| Where | Element | What changes | Kind | Instant | Vis | Status |
|---|---|---|---|---|---|---|
| `dashboards/bead/features/map/useCameraFlight.ts:221` | Map camera flight | Jumps to the end view under reduced motion | reduced-motion cut | both | 5 | confirmed |
| `dashboards/bead/features/providers/composables/useBuilderClassOption.ts:175` | Builder-class bars | `animation: false` | data | both | 4 | confirmed |
| `dashboards/bead/features/providers/composables/useProviderStripOption.ts:258` | Provider strip | `animation: false` | data | both | 4 | confirmed |
| `dashboards/bead/features/providers/BuilderClassPlate.vue:634` | Class drill panel | Opens and closes in one frame | size | both | 4 | confirmed |
| `dashboards/bead/features/providers/BuilderClassPlate.vue:775` | Selected member outline | Snaps | colour | both | 1 | confirmed |
| `dashboards/bead/features/map/BeadAwardMap.vue:555` | Camera breadcrumb rail | Pops | presence | both | 3 | confirmed |
| `dashboards/bead/features/map/BeadAwardMap.vue:521` | Territory strip ↔ one-rung button | Swap | size | both | 3 | confirmed |
| `dashboards/bead/features/map/BeadAwardMap.vue:675` | Rung hover | Colour | colour | both | 1 | confirmed |
| `dashboards/bead/features/technology/ServiceMixPlate.vue:447` | Row raise and outline | Snaps | colour | both | 2 | unconfirmed, needs a look in the browser |

#### /vft-germination

| Where | Element | What changes | Kind | Instant | Vis | Status |
|---|---|---|---|---|---|---|
| `dashboards/vft-germination/features/germination/GerminationCurvesPlate.vue:133` | Skeleton ↔ curves | Swap | presence | both | 4 | confirmed |
| `dashboards/vft-germination/features/germination/GerminationCurvesPlate.vue:267` | Settled skeleton | Breath stops dead (`animation: none`) | reduced-motion cut | enter | 2 | confirmed (not reduced-motion only: a timeout stop) |
| `dashboards/vft-germination/features/germination/GerminationCurvesPlate.vue:178` | Overlay ↔ small multiples | Swap | presence | both | 4 | confirmed |
| `dashboards/vft-germination/story/points/03-the-conditions/Point.vue:111` | Curves ↔ heatmap | Swap | presence | both | 4 | confirmed |
| `dashboards/vft-germination/features/germination/CensusBrush.vue:167` | "Fooled" note | Fades, but its height pushes the track in one frame | size | both | 3 | confirmed |
| `dashboards/vft-germination/features/germination/CensusBrush.vue:290` | "Fooled" note | `transition: none` under reduced motion | reduced-motion cut | both | 3 | confirmed |
| `dashboards/vft-germination/features/germination/CensusBrush.vue:135` | Reset button | Pops | presence | both | 2 | confirmed |
| `dashboards/vft-germination/features/taxonomy/TaxonomyApparatus.vue:158` | Synonymy fold | Fades in but closes with a cut; height jumps both ways | size | exit | 3 | confirmed |
| `dashboards/vft-germination/features/taxonomy/TaxonomyApparatus.vue:527` | Fold chevron and body | Cut under reduced motion | reduced-motion cut | both | 2 | confirmed |
| `dashboards/vft-germination/story/points/02-the-design/Point.vue:582` | Herbarium cells | `transition: none` under reduced motion | reduced-motion cut | both | 3 | confirmed |

## What stays open

- **Glass internals.** The motion of glass's tooltip, sheet, popover, carousel and the dock's morph close could not be read from the 10.1.2 dist CSS. Those rows need a browser look or a word from the glass session.
- **Which filters feed which charts.** Some data rows matter only if a route's filter actually feeds that figure: StackedBar categories, the map grain swap, MultiYearFigure, FundRibbon, the decade band, DiscountBandStrip. Not every store path was traced.
- **Two CSS questions.** Whether the `.tap-squish` and `.hit-slop` utilities carry colour transitions (which would clear several hover rows). Whether a changed SVG presentation attribute, such as the map's raised stroke-width, starts a CSS transition.
- **Whether the counts are complete.** The counts are of rows, not of distinct cures. One cure at the root covers many rows: an exit-aware presence wrapper, a measured size tween, the reduced-motion fade in `base.css`, and a tween for every chart push in `useEChart.ts`.
