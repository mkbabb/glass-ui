# P15, the ruling

Seat: claude-opus-5-5, in the seat written for Fable (Fable is out of quota until 2026-11-21; the owner's standing ruling puts design seats on Opus until then), 2026-11-17. Read against master `dc5b131fc` (P14 merged as `0a42c54f7`; the checker and sweep carry P14's lines from `fd5223a1f`). Nothing was built and no browser was run: every number below is a target for the building seat and a check for the reviewing one.

P15 changes `demo/` and the demo's driver (`docs/tranches/BL/driver/demo-site/`). Nothing under `src/` changes; the library's rows are listed at the end.

Sources: `OWNER-ORDER.md` (points 11 to 13: "poor demo of the dock", "not proper dock demos on the cards"), `FORM.md`, `P14-RULING.md`, `P14.md`, `P14-verify.md` (lines 40, 41, 57 and 59), the contact sheets under `shots/P14/contact/` (`contact-dock-{d1440,l1440,1440,m390}.png`, `contact-dock-pages-m390.png`, `contact-containers-d1440.png`, `contact-arrival.png`), and the stage files as they stand on master.

`/dock` has ten pages and its index. Seven pages place their dock with `DockScene` (nav, chrome, rail, canvas tools, transport, pager, corner controls); three hold it inline (figure tools and action row in a Card's header, dial bar above its figure).

## 1. Canvas Tools

**What is wrong.** `canvas-tools.stage.vue:28` mounts `DockScene` with no `#context`, so the stage is the field and a folded dock in its top-end corner. Its card on `/dock` mounts the same file and shows a near-empty tile (`contact-dock-1440.png`, the sixth card).

**The rule.** The canvas tools act on an artboard. The stage gains a `#context`: a `ScenePage` in the figure shape, no title, holding one inline SVG (`role="img"`, `aria-label="Artboard"`, a 16:9 viewBox) with three parts:

- the grid: hairlines every tenth of the width and height, in `--foreground` at the seam alpha (`--ink-seam`, as Trip plan's rules);
- one cubic curve across the board, stroked in `--foreground`, 2 px, `vector-effect: non-scaling-stroke`;
- the curve's three anchor squares and two handle lines with their end dots, in `--foreground`.

The dock's existing state drives it. Grid (`grid`, on at load) fades the grid in and out; Draw (`drawing`, on at load) fades the anchors and handles in and out, so the pen tool shows the path it edits. Both fade on the library's normal duration; reduced motion keeps the end states. No colour is added: ink on the Card. Layers, Export and Full screen stay as they are. The dock stays at `top-end`; the context takes the top clearance like every other `DockScene` context.

**Files.** `demo/stories/dock/canvas-tools.stage.vue`; `_parts/DockScene.vue` (the `inert` attribute, item 2). `canvas-tools.vue` and its snippet do not change.

**Witness.**

1. D1 runs on `/dock/canvas-tools` (it reads any `.scene-context`): the context holds a Card with a `[role="img"]`, three cells.
2. D2, kind `draw`: a press on Draw (it sits in `#persistent-end`, live while the dock is folded) changes the anchors' opacity, and every sampled leg has a start and a stop (step ≤ 0.4 of its travel).
3. D3: the context's rect is equal to the pixel at rest, with the dock opened by hover, folded by a press outside, and with the dock at `display: none`.
4. D5(a) passes on the Canvas Tools card (section 2).
5. Crops `dock_canvas-tools-{d1440,l1440,m390}.png`; the sixth card of `contact-dock-1440.png` and `contact-dock-m390.png` shows the artboard.

## 2. One context per dock page

**What is wrong.** Six pages answer their dock with the same coral `MiniBars` figure: nav and rail (titled bars), figure tools (three bar cards), dial bar, transport (bars with a playhead) and corner controls (bars that shuffle). On `/dock` six of ten cards are bar charts (`contact-dock-1440.png`).

**The rule.** Each context is the thing its dock is for, and no two pages share a form. It is built from library display components (`Card` through `ScenePage`, `Avatar`, `Badge`, `StatusDot`, `Metric`, `MusicStaff`) and demo markup inside the Card; it holds no control (no `Switch`, no `Button`), carries no sentence, and its names are at most two words. Every change the dock causes in it is tweened.

| Page | Context: what the dock acts on | What the dock does to it | Change |
|---|---|---|---|
| nav | the tab's page: a column Card titled by the tab. People (the default tab, from Reports): four rows, an `Avatar` (initial fallback) and a first name. Home: three rows, a name and a `Badge` count. Reports: three rows, a quarter and its figure in tabular numerals. Settings: three rows, a name and a `StatusDot` (`online` or `offline`, both still). Rows sit on a gap, with no rules between them | a tab press cross-fades the whole page, title and rows together (`fade`, `out-in`, keyed by the tab) | bars cut |
| rail | the section's dashboard: a column Card titled by the section, holding three `Metric`s (`posture="stacked"`), three across, one column under 30rem of context width | a section press cross-fades the title, and each Metric swaps through the library's `metric-swap` transition | bars cut |
| figure tools | three figure Cards, each a line: an inline SVG polyline of its eight quarters, scaled to its largest value, stroked in `--foreground`, `role="img"` with the label it has now. Inline in `figure-tools.stage.vue`: it has one consumer, so no new part | Table view cross-fades the line to the last four quarters' rows, as now | bars become lines |
| dial bar | the figure the dials filter: the bar figure, kept. `.dials-figure` becomes a library `Card` with the same box (full width, 14rem; 9rem under 30rem) and loses its hand-made border, radius and two background rules (`dials.stage.vue:123-135`) | unchanged: range, scale and year reshape the bars, tweened | plate only; the one bar figure on `/dock` |
| canvas tools | the artboard (item 1) | Grid and Draw | new |
| transport | a score that plays: one `MusicStaff` in score mode, `material="bare"`, in a figure Card, with a phrase of its own of about eight notes over two bars. `progress` is the run's time over its length. `--music-staff-space` is set on the Card's body by container query, so the engraving fits the body's width without scrolling in every cell (0.75rem from 30rem of context width, 0.45rem under) | Play advances the playhead and the inked wipe on the library's own transition (`src/components/music-staff/styles.css:152-155`); Reset returns it; the speed sets the rate; the folded dock's Progress is unchanged | bars become a score |
| corner controls | a letter puzzle: seven square tiles in a figure Card spelling PLANETS at rest, each tile a fill mixed from `--foreground` (as Radii's tiles), its letter in the display face. Tiles are keyed by letter in a `TransitionGroup` with a move transition | Shuffle slides each tile to its new place; Undo slides them back; reduced motion moves them without the slide | bars become tiles |
| app chrome, pager, action row | unchanged (Trip plan, the slide, the stylesheet pane) | as now | none |

**Shared changes.**

- `DockScene.vue:22`: `.scene-context` gains `inert` beside `aria-hidden="true"`, the pair the card preview already uses (`SectionPreviewCard.vue:52-53`). Nothing in a context takes focus or a press: a score that overflowed, or any later component, can never become a focusable stop inside a hidden subtree.
- `MiniBars.vue` loses `played`, the dimmed state and the playhead (`:8`, `:26`, `:30-34`, `:58-70`, and `.mini-playhead` in the reduced-motion rule at `:72-77`): the transport no longer uses them. Dial bar is its one consumer.
- `nav.stage.vue`: the `VALUES` table and the `MiniBars` import go; the default `page` is `people`.

**Independence from the dock's geometry.** A context reads the dock's state (which tab, which section, the time, the order, the tools that are on) and never its box. No context carries a length taken from today's dock. The `DockScene` contexts stay in the dock's grid area behind one clearance (`--scene-clear`, unchanged), which is a constant of the scene, not the dock's size: a dock that outgrows it overlaps the Card. The three inline docks (figure tools, action row, dial bar) sit in their context's flow, so their context adapts to whatever size the 11.2.0 dock has; none is sized or aligned to today's.

**Files.** `demo/stories/dock/nav.stage.vue`, `rail.stage.vue`, `figure-tools.stage.vue`, `dials.stage.vue`, `transport.stage.vue`, `corner-controls.stage.vue`; `_parts/DockScene.vue`, `_parts/MiniBars.vue`. No page file, route row, lede or snippet changes. `docs/tranches/BL/driver/demo-site/check.mjs` (below).

**Witness.** The checker's lines, in `check.mjs`:

1. **D1** gains one condition on every `DockScene` route: no element inside `.scene-context` scrolls sideways (`scrollWidth ≤ clientWidth + 1`). This is the score's fit at 390.
2. **D2** (`DOCK_ROUTES`, `:467-474`): `/dock/canvas-tools` joins as `draw`; nav's press moves from People to Settings (the default is now People), in the menu form too. The recorder (`CONTEXT_REC`, `:688-711`) reads `.music-staff__playhead` in place of `.mini-playhead`, the left edge of each `.scene-tile` and the opacity of each `.artboard-layer`; `changed` compares all three. Six presses pass in three cells, 18 of 18: Settings, Schools, Next (pager, unchanged), Play for two seconds, Shuffle, Draw.
3. **D3** runs on canvas tools (it follows `DOCK_ROUTES`): 21 of 21 across the seven `DockScene` routes and three cells.
4. **D4** is unchanged: the titled contexts are nav and rail, each title at 4.5:1 or better by pixels in both themes. Metric's own ink is the library's; a fail there is reported against it, as P14 reported the Card's.
5. **D5**, new, on `/dock` in three cells: (a) every card's `[data-card-specimen]` holds at least one visible text run or `[role="img"]` outside its `.glass-dock`; (b) exactly one card's specimen holds a `.mini-bars` (Dial Bar). The building seat runs D5 once on the P14 build before changing anything: (a) fails on Canvas Tools and (b) reads 6. That is the line seen to bite.
6. Crops: the seven changed routes in three cells; `contact-dock-{d1440,l1440}.png`, `contact-dock-pages-m390.png`, `contact-dock-1440.png`, `contact-dock-m390.png` and `contact-home-1440.png` retaken. On the `/dock` sheets the ten cards show ten different things.
7. The sweep's hover-shift read on the seven `DockScene` routes and figure tools: no moving box inside `.scene-context` beyond P14's counts, except a playhead the gate's own earlier Play started.

## 3. Menu opens without focus on every switch

**What is wrong.** `dropdown-menu.stage.vue:19-24` holds the no-focus flag in one `let arrival` that the first open clears. The `StageSwap` remounts the Dropdown pane on each return from Context, and that mount opens the menu again (`:30`, `default-open`), now with the flag spent, so focus moves into the list. Popover keeps focus out on every open (`popover.stage.vue:19`).

**The rule.** The flag is armed per mount: a `watch` on `mode` sets `arrival = props.openOnLoad` whenever the mode becomes `dropdown`, before the pane mounts (the default pre-flush). The open that comes with a mount, on arrival and on every return to Dropdown, leaves focus where it is; an open from a press or a key still takes focus into the list, so the arrow keys move through the items (Menu differs from Popover there on purpose). The comments at `:1-5` and `:17-18` say so.

**Files.** `demo/stories/containers/dropdown-menu.stage.vue`; `driver/demo-site/check.mjs`.

**Witness.** **A3**, new, on `/containers/dropdown-menu` in three cells, after the page lines (as D2 and D3 run): press Context, then Dropdown, twice. After each return: exactly one `[role="menu"]`, inside the stage's rect, with `document.activeElement` the pressed Dropdown option. Then Escape, a press on Options, and focus is inside the menu. Run once on the P14 build first, where the return reads focus inside the menu.

## 4. Menu's stage after Escape: it stays

**What is wrong, if anything.** After Escape the Options trigger sits near the top of a 504 px stage with the space below it empty (`P14-verify.md:59`).

**The rule.** The stage stays `tall` and the trigger stays where it is. The component on this page is the open list, and the list arrives open and opens again on every switch (item 3), so the first screen and every switch show it large and first. The space under the trigger is the list's own room: the next press draws it in the same place, inside the stage, which A1 reads. Each alternative is worse:

- a `fit` stage puts the 395 px list past the stage's bottom and over the Opens by switch, so Context cannot be reached without closing it first;
- re-centring the trigger while closed moves the button on every open and close, under the pointer that pressed it;
- tweening the stage between the two heights moves the variants and the code on every open and close of a menu that does not trap the page.

No demo file changes. The group is already centred in the stage: at 1440 the trigger's top is 32 px under the stage's top (`--sp-5`, `dropdown-menu.stage.vue:68-71`) and the list ends 32 px above its bottom (`P14.md`, witness 1 of item 2: the list 230 to 625 in a stage 153 to 657).

**Witness.** A2's row on Menu gains one condition: the trigger's top is the same, within 1 px, at arrival and after Escape. The `-closed` crop of Menu in three cells (item 5's run) shows the page as a visitor who closed the list sees it.

## 5. The closed crops

**What is wrong.** `sweep.mjs:203` takes the plain crop on arrival, before the arrival block (`:206-214`) closes the surface, so on Dialog, Sheet and Menu the plain crop and the `-arrival` crop show the same open surface. The closed page at `fit` was witnessed only by numbers (`P14-verify.md:57`).

**The rule.** On the three arrival routes the sweep takes no plain crop. After `closeOverlays` (and Menu's Escape) it waits 900 ms for the scrim's exit, counts the open surfaces (the `closeOverlays` predicate plus any visible `[role="menu"]`), records the count as `row.closed`, and writes `<slug>-<cell>-closed.png`. The containers section sheets (`contact-containers-{d1440,l1440}.png`, `contact-containers-pages-m390.png`) take the `-closed` crop for these three routes; `contact-arrival.png` keeps the open ones. Focus sits on the trigger after Escape, so its focus ring shows in the crop: that is the keyboard close working, not a fault.

**Files.** `docs/tranches/BL/driver/demo-site/sweep.mjs`; the contact script the build seat uses (`.p14/` in the worktree).

**Witness.** Nine crops, `containers_{dialog,sheet,dropdown-menu}-{d1440,l1440,m390}-closed.png`, each from a sweep row reading `closed: 0`. Dialog and Sheet show the header, a 16rem stage (14rem at 390) holding one trigger, and the switches; A2's numbers (stage top, share at `fit`) stand beside them.

## The library's rows

None of the five items is the library's; P15 changes nothing under `src/`. The rows these items touch stay as booked:

| Row | What | Booked |
|---|---|---|
| O-390 e | Light Dialog and Sheet ink (the quiet Cancel 1.25 to 1.53:1, plate text about 3.2:1) and the Dialog focus veil's dark pool in light. The closed crops do not show it; the arrival crops still do | 11.1.2 |
| F8, O-386, O-387 | The dock's growth on hover and the redesign. The contexts read the dock's state and never its box, so none waits for it | 11.2.0 |

## Not ruled here

- App Chrome's Trip plan is column height with three rows, so its lower half is empty (`P14-verify.md:42`). It is a document, not a repeat, and nobody asked.
- Canvas Tools' Layers, Export and Full screen act on nothing, as at P14.
- `ROUTES.md:115-116` still says Dialog and Sheet open on a press; the orchestrator owns that file.
- The sweep's one standing fail, Command's switch height snapping 363 to 43 px in one frame, is P13's and was not in this list.

## Copy added, and the lint

Every string P15 puts on the site, all inside a stage:

- "Artboard" (the artboard's label), "Phrase" (the score's label)
- nav: "Inbox", "Tasks", "Mentions", "Q2", "Q3", "Q4", "41.2k", "48.0k", "55.6k", "Ada", "Grace", "Emmy", "Katherine", "Sync", "Backups", "Alerts", "On", "Off"
- rail, three Metric labels per section: Overview "Districts" 115, "Schools" 2,612, "Students" 1.5M; Regions "Coast" 31, "Piedmont" 58, "Mountains" 26; Schools "Elementary" 1,480, "Middle" 560, "High" 572; Growth "Enrolment" 1.52M (+1.2), "Teachers" 98.4k (+0.8), "Graduates" 112k (+2.1); Notes "Open" 24, "Drafts" 3, "Shared" 9
- corner controls: the letters P, L, A, N, E, T, S

`rg -P -i -f docs/tranches/BL/driver/register-lint.pattern` over these lines and over this file: no hits. No string names a token, a file, an engine or a release. The building seat runs the same lint over its copy diff before the merge.

## Order

1. Item 3, and item 5 (driver only): small and independent.
2. D5 and A3 into the checker, run once on the P14 build (the worktree fast-forwarded to master, before any demo change), where each fails as written above.
3. `DockScene`'s `inert`, then item 1.
4. Item 2, page by page: transport, corner controls, figure tools, nav, rail, dial bar; then `MiniBars`' `played` comes out.
5. Item 4 has no code; its witness rides the runs of items 3 and 5.

Then the whole-site checker and sweep in three cells, as P14 ran them, with D1 to D5, A1 to A3 and T1.
