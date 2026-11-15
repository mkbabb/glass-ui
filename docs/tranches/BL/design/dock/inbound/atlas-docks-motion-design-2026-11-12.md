# Docks, scrollbars and motion: design, 2026-11-12

Designer seat "docks-motion". No code was edited. Lines read: glass `u/sp-integ-glass` 155db871d, atlas
`u/sp-integ-atlas` 8b7c322, sci `u/sp-integ-sci` e326e431, built as `/Users/mkbabb/Programming/.u-build/out/sp/dist-0`.
Probes, JSON and captures: `/Users/mkbabb/Programming/.u-build/out/sp/look/design-docks-motion/`
(`recon.json` every plate's controls and docks at 1440 and 390 on nine routes; `*-motion.json` and the
`*-tools-open/close.png` strips for the plate dock; `rail-dark.json` and `rail-open/close-dark.png` for the rail;
`look2.json` production comparison and every table view at 390; `look3.json` page height during scroll).

Headless Chromium hides scrollbars, so every scrollbar statement here is read from styles and sizes. Real Safari
and an iPhone still need the owner's eye.

## 1. What these lines already answer

| Owner's words | State on these lines | Evidence |
|---|---|---|
| "the dock … is not rounded" (plate dock) | Answered. Every plate dock is glass's capsule, at rest and on every frame of its morph. Production set a fixed `26px` corner. | `recon.json`: all 78 plate docks report the stadium radius; `sci-1440-dark-motion.json` `toolsOpen`: corner is `h/2` compensated per frame (54 → 26 px on the scaled axis). `look2.json` `prod.sci`: `br 26px`. |
| "The main dock on the home screen is not rounded either" | Answered. Production: a card, 280×532, corner 18 px (`shape-card`). Here: 312×557, corner 30.75 px (the pill rows' corner plus the pad, so rows sit concentric), pill rows, phone bar a 176×56 capsule, hero pager a capsule. | `home-1440-dark.png`, `home-390-dark.png`, `prod-home-top.png`, `rail-dark.json`. |
| "the dock does not animate smoothly" (rail) | Answered for the travel. The rail grows 44×44 → 72×531 through 34 distinct sizes in 250 ms, folds in 260 ms, and reverses mid-flight from the live size. | `rail-open-dark.png`, `rail-close-dark.png`, `rail-dark.json` `interrupt`. |
| shot-05, the browser's own tooltip | Answered. No `title` attribute in any plate; every dock control wears glass Tooltip. | `sci-1440-dark-tools-tip.png` ("Enlarge"); `nativeTitle: []` in all four motion runs. |
| shot-06, "what do some of these dock buttons even do?" (the Collapse button) | Answered. The Collapse control is cut; every rail control has a hint to its right. | `DockFoot.vue` head; `rail-open-dark.png` ("Home" hint). |
| Page jumping when a control changes | Answered. Plate height is constant through table, dial, period and tray changes. | `plateHeights` holds one value in every sample (867.7, 1045.3, 1051.2, 755.5). |

## 2. What is still wrong, with the cause

### 2.1 Plate docks

1. **Two docks, two behaviours, three layouts.** A plate carries `PlateControls` (dials and period: a capsule from
   60rem, a grid on bare paper below, one column under 40rem) and `PlateDock` (Table plus a More handle). Neither
   has a collapse state the owner asked for: the dial capsule never collapses (`:collapse="false"`,
   `PlateControls.vue:120`); the tools tray opens only on a press (`expand-on="press"`, `PlateDock.vue:149`), so
   hover and focus do nothing (`toolsHover`: no change in 950 ms) and it stays open until Close.
2. **The phone spends 246 px on controls.** `/sci` trend at 390: name, strip, name, strip, stepper row, then the
   tools dock alone on its own row (`sci-390-dark-row-rest.png`; `rowBox.height: 246.5`).
3. **The tray opening is rough.** Table (a persistent seat at the start) slides 83 px left through the cells that
   fade in at their final places; at about 100 ms Table and Download overlap (`sci-1440-dark-tools-open.png`,
   `usf-1440-light-tools-open.png`). Cause: the tray grows from its end edge, so everything already on screen moves.
4. **Closing the tray shakes the dial dock.** The dial capsule re-measures 928 → 910 → 928 px over 300 ms each time
   the tray closes (`toolsClose.docks.ctl`). Cause: the tray flips between in-flow and `position: absolute` on
   `[data-expanded]` (`ChartFrame.css:345`), the row re-lays, and glass's resize morph runs on the neighbour.
5. **Loose controls remain.** `/speedtest` distribution and survey use bare `ToggleGroup`
   (`BenchmarkDistribution.vue:231`, `SurveyChapter.vue:81`); `/vft-germination` conditions uses a bare
   `SegmentedTabs` (`03-the-conditions/Point.vue:98`). `/usf` scale shows the paper grid at 1440 while its
   neighbours show the capsule (`recon.json`: `usf-scale ctl=grid 277x76`).
6. **The rail folds on a fixed 150 ms grace** (`Dock.vue:146`), whatever the dwell. The fold starts 167 ms after
   the pointer leaves (`rail-dark.json` `close`). The owner asked for a linger that grows with dwell.
7. **Filters is two steps away at 768 and up.** The disc shows the crest only; Filters appears after the rail blooms.

### 2.2 Scrollbars

Nothing in a resting chart view shows a bar on these lines (census: 0 showing, 0 spurious). What can flash:

1. **Every table view** (`div.relative.w-full.overflow-auto`, glass's table wrapper, native bars, both axes).
   With overlay scrollbars the bar flashes when the table mounts and whenever its rows change. At 390 the table is
   wider than the plate on 12 plates: `sci-bandcake` +889 px, `usf-state-disbursements` +663, `bead-provider-strip`
   +469, `bead-service-mix` +375, `usf-scale` +91, `bead-builder-class` +48, `sci-utilization` +45,
   `usf-breakeven` +31, `ecf-item-mix` +16. Two are spurious: `demand-ridge` +2 px and `usf-integrity-biplot` +1 px
   (a bar with nothing to scroll). The table stays mounted at opacity 0 after the reader returns to the chart
   (`VizPlate.vue:376`, `v-if="tableAsked"`), so it keeps re-rendering on every dial and period change.
2. **Every collapsed plate dock holds a hidden scroller**: `.dock-layer--full.dock-run`, `overflow-x: auto`,
   36 to 100 px of overflow, 144 instances. Its bars are suppressed (`scrollbar-width: none` and
   `::-webkit-scrollbar { display: none }`, `run.css:268`), so none shows; glass names this dock shape as the
   cause of the flash on 11.0.1. A figure dock has no reason to be a scroll container at all.
3. **Other scrollers inside a figure with native bars**, each appearing on a reader act: the stage's source
   overlay (`ChapterStage.vue:363`), the appendix pane (`VizAppendixDock.vue:296`), the source data browser
   (`SourceDataBrowser.vue:552`), the lollipop list (`ecf/.../Lollipop.vue:157`), the class drill panel
   (`bead/.../BuilderClassPlate.vue:758`).
4. **The page's own scrollbar. This is the likeliest "scroll bars on each viz flash".** The document's height
   changes by hundreds of pixels while the reader scrolls, on every route measured, each time a chapter mounts or
   is released near the viewport. Each change flashes the page's overlay scrollbar and moves its thumb. Measured
   top to bottom (`look3.json`): `/sci` 1440: -694, +704, +996, -629 px; `/sci` 390: +277, +694, -769;
   `/usf` 1440: six changes, the largest -1211; `/usf` 390: six, the largest -1412; `/ecf` 390: eight, with
   -862, +898, -862, +862 at one scroll position (the page oscillates); `/demand` 1440: four, the largest -1054.
   Cause: a beat reserves one height for the whole route (`--beat-cis`, 720 px by default,
   `DashboardEssay.vue:452` and `:465`; `useVirtualSectionWindow.ts`), not the height its plate will have, so
   every mount and every release resizes the page.

### 2.3 Motion

The SNAP census lists 296 one-frame changes. The causes that matter for a rule:

- Presence is a `v-if` with no transition everywhere outside glass surfaces (115 rows).
- Reduced motion is a cut: `design/foundations/base.css:91` sets every duration to 0.001 ms.
- Charts cut when a change cannot tween (`useEChart.ts:365`, `:252`), and 13 sci option files set
  `animation: false` outright (all of `/usf-integrity`, the `/bead` strips, `/usf` retention and break-even).
- Hand-built bar and area charts bind size to data with no transition (`/speedtest` histogram, `/demand` ridge,
  cliff, product mix and bands, `/ecf` window arc, item mix and lollipop).
- Enlarge is a scale-and-fade birth with a cut on close (`ChartFrame.vue:527`).
- Entrances run while the page is scrolling and cost frames (PERF F3: up to 47.5 % dropped on the phone profile).

## 3. The standard figure dock

One dock per figure, on every viz, replacing `PlateControls` and `PlateDock`. Working name `FigureDock`
(`atlas/src/charts/frame/FigureDock.vue`), built from glass pieces that exist on this line: `GlassDock`,
`DockControl`, `DockTrigger`, `DockSeparator`, `DockCrossfade`, `SegmentedTabs`, `Select`, `Tooltip`, `Popover`,
and glass's resize morph (GS-03). When glass 11.2.0 ships its declared dock states, the state logic below moves
into glass as a preset and atlas deletes its copy.

### 3.1 Principle

At rest the dock states the figure's current view in the fewest marks. A seat the reader points at, focuses or
taps unfolds into its full control. Nothing on screen before the reader arrived moves under the pointer.

### 3.2 Anatomy

```
REST   ( Total   School year   2025–26  |  ▦  ⤢  ⋯ )            52 px tall, capsule, inline start of the row

OPEN   ( Measure [Total|Per student]   Time step [School year|Month]   ‹ 2025–26 ▾ › ▶  |  ▦  ⤢  ⚙  ⇩ )
        each group opens as the pointer or focus reaches it; opened groups stay until the dock folds

PHONE  ( 2025–26   Total  |  ⤢  ⋯ )                              rest, 332 px plate
       ( Measure [ Total | Per student ]            ✓ )           one group open; lower seats yield
       ┌ Time step  [ School year |   Month    ] ┐                More open: the dock grows down into rows
       │ ▦ Table    ⚙ Options    ⇩ Download      │                (corner stays 26 px)
       └──────────────────────────────────────────┘
```

Seats, in order from the inline start:

| Seat | Rest face | Open face |
|---|---|---|
| Dial (one per `dial: true` option) | A chip showing the current choice ("Total"). Tooltip: the dial's name and "change". | The dial's name (caption, muted) and its `SegmentedTabs` strip; a dial of four or more choices that does not fit is a glass `Select`. |
| Period | A chip showing the current period ("2025–26", tabular figures). | Previous, the period `Select`, next, Play. |
| Separator | `DockSeparator` | same |
| Table | Icon. One press swaps the figure for its rows and back. Never folds. | same |
| Enlarge | Icon. Opens the expanded view. Never folds. | same |
| More | "⋯" icon, with the dot when an option is off its default. Present only when the plate has Options, Download or Raw data, or a seat that did not fit. | Options, then Download or Raw data, as icon cells; each opens its popover as today. |

There is no Close cell and no second dock.

### 3.3 Sizes (glass scale)

- Dock height 52 px: a 44 px seat and 4 px pad top and bottom. Corner: glass's capsule (26 px), kept when the
  dock grows down into rows.
- Seat gap 8 px (`--dock-run-gap`). Chip and strip text `--type-small`, weight 500; selection is the indicator
  plate, never bold. Dial names `--type-caption`, weight 500, `--muted-foreground`.
- Chip: 44 px hit height, 36 px pill face, 12 px inline pad. Icon cells 44×44, icon 18 px.
- The row that seats the dock reserves 52 px and never changes height. The dock is laid at the row's inline start
  and grows over the row (and, for rows, over what is below it); it never pushes the page.
- The dock's run does not scroll: `overflow: clip`.

### 3.4 What fits at each width

The dock measures its plate (`ResizeObserver` on `[data-chart-frame]`, as `PlateControls` does today) and seats by
priority; nothing is decided by a viewport breakpoint.

- **Rest.** Priority: More, Enlarge, period chip, dial chips in declared order, Table. Seats are added in that
  order while the row fits the plate's inner width; a seat that does not fit lives in More's open face.
  At 1134 px (1440 and 1920) and 617 px (768) every seat fits on every plate today. At 332 px (390) the trend
  plate rests as period, "Total", Enlarge, More; "Time step" and Table move into More.
- **A dial or the period opening.** The group unfolds in the row. If the row would pass the plate's inner width,
  rest seats yield in reverse priority (they fade and give up their width) until it fits, and return when the
  dock folds. More then shows as a check ("Done").
- **More opening.** If its cells fit the row they unfold in the row (every plate at 617 px and up). If not, or if
  it holds a folded dial, the dock grows down: one 52 px row per folded dial (name above a full-width strip),
  then one row of tools with text labels ("Table", "Options", "Download"). Width and height travel together.

### 3.5 States

| State | What shows | Entered by | Left by |
|---|---|---|---|
| Rest | Rest faces | default | — |
| Open | Rest faces, with every group the pointer or focus has reached unfolded | Pointer: 120 ms inside a seat after the pointer has moved inside the dock (a dock that scrolls under a still pointer does not open). Keyboard: focus on a seat, at once. | Pointer and focus both outside: the linger, then fold. Re-entry cancels the linger. Escape or a press outside: fold at once (still eased). |
| Pinned | As Open; the pressed group unfolded and holding focus | A press or tap on a chip or More; Enter or Space on one | A press outside, Escape, Done, or a second press on More. Never by the pointer leaving. A popover or select open from the dock holds it. |

Linger: `clamp(0.5 × dwell, 400 ms, 2400 ms)`, where dwell is the time from the first group opening to the
pointer leaving. A glance folds in 0.4 s; ten seconds of use lingers 2.4 s. The same function drives the rail.

### 3.6 Motion

- **The plate** (the dock's box) travels on glass's `dock` spring (response 0.3, ζ 0.88; settles in about
  300 ms), width and height on one scalar, from the inline-start, block-start corner. A new target mid-flight
  continues from the live size and velocity (glass's morph already does this; `rail-dark.json` `interrupt`).
- **A group** swaps faces with `DockCrossfade` on the same scalar: the chip's text fades out over the first 40 %,
  the strip fades in over the last 60 %. The chip's left edge is the strip's left edge, so the group's start does
  not move. Seats after it shift right with the plate; none is under the pointer, because groups open in the
  order the pointer reaches them and stay open until the fold.
- **The fold** closes every group together on the same spring, after the linger.
- **The indicator** inside a strip glides on `dock`. A press squishes on `press` (response 0.2, ζ 0.8).
- **Play** swaps its glyph by a 120 ms crossfade and, while playing, draws the step's progress as a ring on its
  cell (one ring per step; the step length is the figure's tween plus a 400 ms hold, section 5).
- **Tooltips**: the shell's provider (500 ms first, 300 ms skip), born from the control on `present`.
- **Reduced motion**: the two faces crossfade in 120 ms and the plate takes its new size under that fade. No travel.

### 3.7 Touch and keyboard

- Touch has no hover: a tap on a chip pins the dock open on that group; a tap on an option sets it and the dock
  stays; a tap outside or on Done folds it. Table and Enlarge act on the first tap. Every target is 44 px.
- Keyboard: the dock is one toolbar (glass's roving run). Tab enters at the first seat and opens the dock; arrows
  move between seats, opening each group reached; Enter on a chip pins it and moves focus to the selected option;
  Escape closes an open popover first, then folds the dock and returns focus to the seat that opened it.
- Names: each seat's `aria-label` carries the figure's title, as today ("Table of …").

### 3.8 The rail and the home dock

- Keep the capsule, the morph and the 30.75 px home corner as built.
- Replace the fixed 150 ms grace with the linger above.
- On a dashboard with a filter body, the collapsed rail rests as two seats, the crest and Filters (with its
  applied count), a 44×96 capsule; one press opens the drawer at every width.

## 4. Scrollbars: one rule

A scroller inside a figure never shows a native bar and never overflows by less than a row.

- Glass's table wrapper hides its native bars and wears `FadingScroll` (a soft edge where more rows wait).
- A table fits its plate's width: no horizontal scroller at 390. Columns wrap their headers, numbers use the
  compact format already used on axes, and a table of more than four columns shows the first column and the
  active measure with the rest behind a column `Select`.
- The table unmounts when the reader returns to the chart (after its 150 ms fade).
- The figure dock's run is `overflow: clip`.
- The five other in-figure scrollers take one shared class with the same treatment.

## 5. One motion rule

Every change is carried by one of five glass rows, chosen by what moves. Colour and opacity ride a bezier.

| What moves | Row | Notes |
|---|---|---|
| A control answering a press (chip, cell, indicator squish) | `press` | |
| Something born from an anchor (tooltip, hover card, popover, a legend's tier list, a note) | `present` | Enters with opacity and a 0.96 → 1 scale from the anchor; leaves by opacity alone in 120 ms. |
| Members travelling (dock plate, indicator glide, re-rank, row reorder) | `dock` | |
| A figure's own data changing (bars, lines, areas, map fills, dots, the count in a stat), and Enlarge | `bloom` | Clamped: nothing passes its true value. Entering marks fade in over the last 40 %, leaving marks fade out over the first 40 %. |
| An axis changing quantity, a chart changing kind, a camera, a route | `world` | A change of kind that cannot morph is a crossfade on this clock inside a box of fixed height. |
| Colour, opacity | `--ease-out`, 200 ms in, 120 ms out | |

`panel` is not used on a figure.

Five clauses complete the rule:

1. **One entrance per figure per visit**, on the first view (the existing law: 130 ms in view, after a deep link
   lands), and only once scrolling has been still for 100 ms. Marks draw in reading order on `bloom` within
   700 ms in total: bars and columns rise from the baseline, lines and areas draw from the left, map shapes and
   dots fade in by value, stats count up with their figure. The title, dek, dock, legend and axes are painted at
   rest. Only transform, opacity and clip are animated. One figure enters at a time; the next waits.
2. **Scrolling only scrolls.** No section fades or lifts in, and no number is scrubbed by scroll position.
3. **Every reader act is answered by a tween** through keyframes.js (`usePhaseTween`), never a repaint.
4. **Nothing appears or leaves in one frame.** One presence wrapper and one measured size tween carry every
   `v-if`, `v-show` and `[hidden]` in a figure.
5. **Reduced motion is a 120 ms crossfade** between the two states, never a cut and never travel.

Play steps at the tween's length plus a 400 ms hold (about 900 ms on `bloom`), so each step lands before the next.

### 5.1 Every viz and scroll item

"Tween" means clause 3 on `bloom` unless a row is named. "Entrance" means clause 1.

| Route | Item | Stays | Changes | Goes |
|---|---|---|---|---|
| / | Hero carousel | Strip snap, pager dock | Reduced motion: crossfade | |
| / | Seven headline tiles | | Number counts up once on first view; link press on `press` | |
| /sci | Hero stats (45 %, 302, 50 Gbps) | First count-up | Later values tween | |
| /sci | Bandwidth by school year (`sci-bandcake`) | Column rise entrance; measure flip tween | Reduced: crossfade | |
| /sci | Map by school unit (`sci-schoolmap`) | Shape entrance, fill colour transition | Entrance by opacity only, 600 ms cap; district and charter swap is a `world` crossfade; Play ring | |
| /sci | Trend (`sci-utilization`) | Phase tween across both dials and the period | Empty swap and year facts use presence and the size tween | |
| /sci | Scatter stage (`sci-scatter-stage`) | Scene tween through keyframes.js | Legend swap crossfades; the hand-off opacity eases | Scroll-scrubbed chase number (`.sci-chase-beat`): counts up once |
| /usf | Fund ledger ribbon | Trunk draw on load | Ribbon paths tween | |
| /usf | State disbursements | Stacked rows | "Show all 51" grows by the size tween, rows fade in within 300 ms | |
| /usf | Net retention map | Entrance, rule draw | Reduced: crossfade | |
| /usf | Retention strip | | Tween (`animation: false` removed) | |
| /usf | Per student and per square mile (`usf-normflip`) | The per-capita and per-area morph | Reduced: crossfade | |
| /usf | Scale scatter | Phase tween | Lens legends crossfade | |
| /usf | Break-even scatter | | Tween outside the phase path | |
| /usf | Decade (`usf-decade`) | Period tween | Columns and line swap is a `world` crossfade | Scroll-scrubbed crown number (`.decade-beat`): counts up once |
| /ecf | Window arc | | Columns rise on entrance and tween (the rise named in the comment has no CSS) | |
| /ecf | Item mix | | Bands tween by transform | |
| /ecf | Vendors ranked bar | Re-rank motion | | |
| /ecf | District map | Entrance | Readout card uses presence | |
| /ecf | Charters (treemap and packed bars) | Treemap re-tile | View swap is a `world` crossfade | |
| /ecf | Consultants (bar and lollipop) | | View swap crossfade; stems and dots tween | |
| /demand | Ridge | | Areas rise on entrance; paths tween | |
| /demand | Category 1 vs 2 | Line draw entrance | | |
| /demand | Product mix | | Bars tween by transform (`transition: none` removed); re-rank on `dock` | |
| /demand | Discount bands | | Segments tween | |
| /demand | Contract cliff | | Bars rise on entrance and tween | |
| /bead | Award map | Camera flight on `world` | Reduced: crossfade between views; breadcrumb uses presence | |
| /bead | Largest recipients | | Tween | |
| /bead | Technology | | Row raise eases in 200 ms | |
| /bead | Recipient type | | Tween; drill panel opens by the size tween | |
| /speedtest | Hero | Count-up | Support rows use presence | |
| /speedtest | Download speed histogram | | Bars, box plot and benchmark rule tween between Download and Upload; the toggle becomes a dial | |
| /speedtest | Hex map | | Hexes fade in by value on entrance; table swap crossfades | |
| /speedtest | County survey | | Rows re-rank on `dock`, bars tween; the toggle becomes a dial | |
| /usf-integrity | Cap, wires, chord, beeswarm, ratio scatter, biplot, Benford, reform | | Entrance and tween on all eight (`animation: false` removed); chart and list swaps crossfade at fixed height | |
| /usf-integrity | Concentration map | Entrance | | |
| /vft-germination | Germination curves | Skeleton breath | Skeleton to curves crossfades; overlay and small multiples crossfade on `world` | The breath's dead stop |
| /vft-germination | Conditions (curves and heatmap) | | Crossfade on `world`; the tabs become a dial | |
| /vft-germination | Census brush, taxonomy fold | Fades | Height by the size tween, both ways | |
| /vft-germination | Herbarium cells; specimen, design, through-line and propaedeutic cards | Cell hover transitions; cards painted at rest | Reduced: crossfade | |
| every route | About and source cards, hero title | Painted at rest | "Sources and methods" opens by the size tween | |

## 6. The page must not change height while scrolling

Each beat reserves its own settled height, per width class, from the first paint: the plate's stage height is
already fixed by its contract, so the beat's reserve is head plus stage plus foot, recorded once per beat per
width (390, 768, 1440, 1920) at build time by the census and shipped as `--beat-cis` on the beat itself. A beat
that is released by the virtual window keeps the height it last measured. (The probe scrolls in half-viewport
jumps, which mounts chapters later than a hand scroll does; the size of each change is the same either way.)
Acceptance: `look3.mjs` reports 0
height changes after first paint on every route at 390 and 1440.

Two entrances were watched (`entrance-sci-schoolmap.png`, `entrance-demand-cliff.png`): the `/sci` map fades its
districts in over about 350 ms after the charter dots (kept); the `/demand` cliff arrives with its bars already at
rest (no entrance; section 5.1 gives it one).

## 7. For glass

1. A dock option that makes the run a plain row (`overflow: clip`), for docks that change form instead of scrolling.
2. The linger as `clamp(0.5 × dwell, 400 ms, 2400 ms)`; a deliberate dismissal skips it and still eases.
3. Hover intent that needs pointer movement inside the dock, with the delay settable (120 ms for figures).
4. Answer to glass's question: figure docks open on hover, with the 120 ms intent and the linger; a press pins.
5. The figure preset for 11.2.0: rest face of several seats, each opening its own group; opened groups persist
   until the fold; seats yield by priority when the row is full; the dock grows down when More holds rows.
6. The table wrapper: native bars hidden, `FadingScroll` edge.
7. Enlarge: `ExpandableContainer` opens from the plate's own rectangle on `bloom` and closes by the same path.

## 8. Rows

| Id | Repo | Change | Material |
|---|---|---|---|
| DM-01 | atlas | `FigureDock.vue` replaces `PlateControls.vue` and `PlateDock.vue` (section 3) | yes |
| DM-02 | atlas | The control row reserves 52 px and seats the one dock at its start; the tray's absolute flip goes | yes |
| DM-03 | atlas | `useLinger` (intent, dwell, linger) for the figure dock and the rail; the 150 ms grace goes | yes |
| DM-04 | atlas | Filters as a second resting seat on the collapsed rail | yes |
| DM-05 | atlas | Table: fits the plate, bars hidden, soft edge, unmounts on return | yes |
| DM-06 | atlas | Each beat reserves its own settled height; the page's height holds while scrolling | yes |
| DM-07 | atlas | One class for the five other in-figure scrollers | no |
| DM-08 | atlas | The motion rule as code: row map, presence wrapper, size tween | yes |
| DM-09 | atlas | Reduced motion is a 120 ms crossfade (`base.css:91`, `useEChart.ts:279`) | yes |
| DM-10 | atlas | `useEChart`: entrance waits for still scroll, one at a time; a change that cannot tween crossfades | yes |
| DM-11 | atlas | Scroll-scrubbed crown numbers go; they count up once | no |
| DM-12 | atlas | Play: glyph crossfade, step ring, step length tied to the tween | no |
| DM-13 | atlas | Theme change and the pager label ease | no |
| DM-14 | sci | `/speedtest` toggles and the `/vft-germination` tabs become dials in the figure dock | yes |
| DM-15 | sci | 13 option files drop `animation: false` and take the tween and one entrance | yes |
| DM-16 | sci | Hand-built bars and areas tween by transform; entrances added | yes |
| DM-17 | sci | View swaps crossfade at fixed height | yes |
| DM-18 | glass | A non-scrolling run option for docks | yes |
| DM-19 | glass | The linger and pointer-movement intent in `useDockState` | yes |
| DM-20 | glass | The figure preset for 11.2.0 (spec in section 3) | no |
| DM-21 | glass | Table wrapper: bars hidden, `FadingScroll` edge | yes |
| DM-22 | glass | `ExpandableContainer` opens from the plate's rectangle and closes by the same path | yes |
