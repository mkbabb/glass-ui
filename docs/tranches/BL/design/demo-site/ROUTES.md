# glass.babb.dev: every route's fate

Design ruling, 2026-11-15. The 92 routes are the ones `../../audit/demo-site/TABLE.md` measured:
`/`, 11 section pages, 80 component pages. The form each kept page is rebuilt to is `FORM.md`.

## Counts

| Fate | Routes |
|---|---|
| KEEP, rebuilt to the form | **67** (`/`, 11 section pages, 55 component pages) |
| MERGE into another route | **19** |
| CUT | **6** |
| Total | 92 |
| New routes | **11** (10 dock compositions, `/forms/select`) |
| The site afterwards | **78** routes: `/`, 11 section pages, 66 component pages |

A merged or cut path is removed from the route table and answers with the site's 404 page, as
retired paths already do (`router.ts:89-95`). No redirect is kept.

A merge moves the one thing worth keeping (a variant, a preset, a row) into the target page inside
that page's word budget. It never moves prose.

## The rules that decided

1. One component, one page. A page whose subject is another page's variant is merged into it.
2. A page about the demo's or the library's machinery, with no component a consumer would mount,
   is cut.
3. A subject appears on one route. Every duplicate in TABLE.md's point 4 is resolved below.
4. The dock section shows the dock the way the apps build it: one live dock per composition in
   `../../audit/dock-usage/COMPOSITIONS.md`. Pages that demonstrate a mechanism (layers, sections,
   controls, overflow) are merged into the composition that uses it, or cut.

## Section pages and the front door (12, all KEEP)

Form: `FORM.md` section 3, "The front door and the section pages". Words: a lede of at most 12,
plus the card titles.

| Route | Fate | Cards after the rebuild | Reason |
|---|---|---|---|
| `/` | KEEP | 11 sections | the one front door; absorbs `/foundations/intro` |
| `/foundations` | KEEP | 6 | |
| `/substrates` | KEEP | 4 | each card the real substrate, parked |
| `/display` | KEEP | 6 | |
| `/forms` | KEEP | 9 | |
| `/containers` | KEEP | 9 | 202 words of card prose today, 0 afterwards |
| `/navigation` | KEEP | 4 | |
| `/dock` | KEEP | 10 | each card a live dock; this page replaces the old overview |
| `/data` | KEEP | 6 | |
| `/feedback` | KEEP | 4 | |
| `/motion` | KEEP | 5 | |
| `/compositions` | KEEP | 3 | |

## Foundations (12: 6 keep, 5 merge, 1 cut)

| Route | Fate | Component shown | Stage | Variants | Words | Reason |
|---|---|---|---|---|---|---|
| `/foundations/intro` | MERGE → `/` | | | | | the same eleven cards through the same resolver; one front door |
| `/foundations/colors` | KEEP | the colour tokens as swatches | fit | switch: Palette · Tints · Chart | 50 | absorbs the tint scale and the chart palette |
| `/foundations/typography` | KEEP | the type scale, set in real text | tall | switch: Display · Text · Mono | 50 | no component in the fold today |
| `/foundations/radii` | KEEP | the radius rungs on real surfaces | fit | none | 30 | |
| `/foundations/shadows` | KEEP | the three elevations on real cards | fit | none | 30 | |
| `/foundations/motion` | MERGE → `/motion/springs` | | | | | springs and easings shown on three routes; its curves become presets of the one editor |
| `/foundations/paper-glass` | KEEP | the five glass tiers as five plates across one field | tall | switch: Over paper · Over colour; switch: Grain; row: Bare plate | 50 | the owner's "unreadable"; the one home of the tier ladder; the bare plate (composition 11) is shown here, not as a dock page |
| `/foundations/icons` | KEEP | the icon set at its sizes | fit | row: Sizes | 40 | |
| `/foundations/surface-tints` | MERGE → `/foundations/colors` | | | | | tints are colour tokens; 126 words before any specimen |
| `/foundations/overlays-scrims` | MERGE → `/containers/dialog` | | | | | a scrim is seen only behind a dialog; it becomes the dialog's scrim switch |
| `/foundations/chart-palette` | MERGE → `/foundations/colors` | | | | | the same tokens under second names |
| `/foundations/css-utilities` | CUT | | | | | one hover utility and its override cascade: machinery, no component |

## Substrates (6: 4 keep, 2 merge)

All four kept pages use the editor form (`FORM.md` section 2): one canvas of the subject, words
outside the studio at most 30.

| Route | Fate | Component shown | Stage | Variants | Words | Reason |
|---|---|---|---|---|---|---|
| `/substrates/aurora` | KEEP | one Aurora | fill | presets as chips in the editor | 30 | the owner's "way too small"; ribbon, hints and the second heading go |
| `/substrates/blob` | KEEP | one Blob | fill | presets; "Plain" is a preset, pause is one stage control | 30 | "why tf do we have TWO or more blobs" |
| `/substrates/constellation` | KEEP | one Constellation | fill | presets: Drift · Warp · Wander · Gravity well · Pinned; ceiling is a slider | 30 | six fields under four columns of prose become one field and an editor |
| `/substrates/fourier-field` | KEEP | one Fourier field | fill | presets: the traced shapes | 30 | 115 words before the field today |
| `/substrates/glass-material` | MERGE → `/foundations/paper-glass` | | | | | the same tier ladder a third time; 565 words, body text at 1.0:1 over the field |
| `/substrates/glass-panel` | MERGE → `/foundations/paper-glass` | | | | | the same ladder a fourth time; the renderer cascade is internals |

## Forms (8: 8 keep; 1 new)

The family tabs are removed: Select and Label were reachable only inside `/forms/inputs`, and
Textarea was both a route and a tab of another route.

| Route | Fate | Component shown | Stage | Variants | Words | Reason |
|---|---|---|---|---|---|---|
| `/forms/inputs` | KEEP | Input | fit | row: Types; row: States | 40 | absorbs the validation scene as its invalid state |
| `/forms/textarea` | KEEP | Textarea | fit | row: Sizing; row: States | 40 | its own route only; no longer a tab of Inputs |
| `/forms/checks` | KEEP | Checkbox, Radio, Switch (one family, shown together) | fit | row: States | 40 | |
| `/forms/slider` | KEEP | Slider | fit | row: Standard · Spectrum | 40 | 16 low-contrast runs in light are the library's muted ink |
| `/forms/number-field` | KEEP | NumberField | fit | row: States | 30 | |
| `/forms/toggle` | KEEP | ToggleGroup | fit | row: Single · Multiple | 30 | |
| `/forms/chip` | KEEP | Chip | fit | row: Kinds; row: Shapes | 40 | |
| `/forms/labeled-field` | KEEP | LabeledField | fit | row: Input · Slider · Switch | 40 | absorbs Label |
| `/forms/select` | **NEW** | Select | fit | row: States; switch: Short list · Long list | 40 | a main component with no route of its own |

## Display (6: 6 keep)

| Route | Fate | Component shown | Stage | Variants | Words | Reason |
|---|---|---|---|---|---|---|
| `/display/buttons` | KEEP | Button: the emphasis-by-tone grid in the stage | fit | row: Sizes; row: States | 40 | the owner's "unreadable"; three sections of commentary go |
| `/display/surface` | KEEP | one Surface | tall | switch: Prominence (5); switch: Glass · Veil · Opaque | 40 | the component home of the tiers; the token home is Paper & Glass |
| `/display/card` | KEEP | Card | tall | switch: Density; switch: Selected | 40 | |
| `/display/badge` | KEEP | Badge | fit | row: Tones; row: Data tones | 40 | 214 words today |
| `/display/atoms` | KEEP | Separator, StatusDot, Avatar, DarkModeToggle (four atoms, shown together, no switcher) | fit | none | 40 | four parts too small for a page each; the tab switcher goes |
| `/display/music-staff` | KEEP | MusicStaff | tall | switch: Still · Streaming | 40 | 303 words, 109 before the staff |

## Containers (13: 9 keep, 4 merge)

An overlay's stage holds its trigger, centred, and the real overlay opens over the stage. Popover,
menu and tooltip are open on load where the component allows it without taking focus; Dialog and
Sheet open on a press.

| Route | Fate | Component shown | Stage | Variants | Words | Reason |
|---|---|---|---|---|---|---|
| `/containers/dialog` | KEEP | Dialog | tall | switch: Free · Deliberate · Locked; switch: Scrim (3) | 50 | absorbs Overlays & Scrims |
| `/containers/sheet` | KEEP | Sheet | tall | switch: Edge (4); switch: Detents | 50 | 190 words today |
| `/containers/popover` | KEEP | Popover | tall | switch: Press · Hover · Hover card | 40 | the four floating-panel pages become this and Tooltip |
| `/containers/dropdown-menu` | KEEP, titled "Menu" | Menu | tall | switch: Dropdown · Context | 40 | one menu, two ways to open it |
| `/containers/context-menu` | MERGE → `/containers/dropdown-menu` | | | | | the same menu opened by a right press |
| `/containers/hover-card` | MERGE → `/containers/popover` | | | | | a popover opened by hover; 0 % component in the fold |
| `/containers/tooltip` | KEEP | Tooltip | fit | row: Sides | 30 | |
| `/containers/accordion` | KEEP | one Accordion | tall | switch: Single · Multiple · One panel | 40 | the same three questions were mounted twice |
| `/containers/collapsible` | MERGE → `/containers/accordion` | | | | | a one-panel accordion |
| `/containers/hover-popover` | MERGE → `/containers/popover` | | | | | a popover opened by hover |
| `/containers/expandable-container` | KEEP | ExpandableContainer | tall | switch: In place · Full screen | 40 | 253 words today |
| `/containers/command` | KEEP | Command | tall | switch: Inline · In a dialog | 40 | the one search page; absorbs Fuzzy Search |
| `/containers/configurator` | KEEP | one Configurator on a neutral specimen | fill | its presets; Attached · Detached is an editor control | 30 | editor 9 px tall today; the second "Preset state" example goes |

## Navigation (4: 4 keep)

| Route | Fate | Component shown | Stage | Variants | Words | Reason |
|---|---|---|---|---|---|---|
| `/navigation/tabs` | KEEP | SegmentedTabs | fit | row: Pill · Underline; switch: Horizontal · Vertical | 50 | 340 words, 48 low-contrast runs in light |
| `/navigation/carousel` | KEEP | Carousel | tall | none | 40 | slide labels at 1.03:1 under quiet glass are removed, not recoloured |
| `/navigation/pager-dots` | KEEP | PagerDots | fit | row: Counts (3, 7, 20) | 30 | |
| `/navigation/toc-tracking` | KEEP | the tracking table of contents beside a scrolling column | tall | none | 40 | the scrolling column is Skeleton blocks, not one paragraph printed 18 times; may run past two screens |

## Dock (8 old: 5 merge, 3 cut; 10 new)

The owner: "poor demo of the dock. Dock seems like a mess with all of this complexity"; "too much
text, and not proper dock demos on the cards". The section becomes one page per composition the
apps actually build. Each page: one live dock, placed where the composition places it, inside a
`tall` stage that stands in for the app's viewport, over one field that lives inside the stage.
Budget 30 words each.

Every dock page uses the dock's documented surface as it stands on master: the props `collapse`,
`expand-on`, `orientation`, `fit-content`, `collapsed-label`, the slots `default`, `persistent`,
`persistent-end`, `collapsed`, and the exposed `keepOpen` and `release`. No `shape` prop, no
`.dock-*` selector, no `--dock-*` property, no `$el`. When 11.2.0 lands, each page switches to the
named preset and the checks stay the same.

Old pages:

| Route | Fate | Reason |
|---|---|---|
| `/dock/overview` | MERGE → `/dock/chrome` | 706 words and ten docks on one page; the section page with its ten live cards is the overview now; its collapsing dock is the chrome page, its transport the transport page; the card shell, the static-backdrop and the pause-toggle sections go |
| `/dock/layers` | MERGE → `/dock/chrome` | the layer switcher is used by no app; the face swap that two apps do use is one variant of the chrome page |
| `/dock/vertical` | MERGE → `/dock/rail` | the rail is the vertical dock; `shape="rounded"` goes |
| `/dock/sections` | MERGE → `/dock/nav` | separators and groups appear in every composition; the nav page shows them in use |
| `/dock/controls` | MERGE → `/dock/nav` | the icon and tab seats in use; four aurora fields and the engine commentary go |
| `/dock/overflow` | CUT | a mechanism, and the page that stays black; the shell's own pager dock shows a run that overflows |
| `/dock/cta-receive` | CUT | `useDockCtaReceive` is used by no app and is on the 11.2.0 delete list |
| `/dock/dock-search` | CUT | `useDockSearch` and the search slot are used by no app and are on the delete list; the page throws on load and its dock never folds |

New pages (composition numbers from COMPOSITIONS.md):

| Route | Composition | The one live dock | Where it sits in the stage | Variants |
|---|---|---|---|---|
| `/dock/nav` | 1. Site navigation tabs | `:collapse="false" fit-content`; four tab seats, one active; a separator; `#persistent-end`: the theme toggle and Find | bottom centre | switch: Words · Icons and words; under 30rem of stage width the tabs become one menu |
| `/dock/chrome` | 2. App chrome with a collapsed seal | `collapse="closed" fit-content`; `#collapsed`: a seal glyph; a select trigger, two menu triggers, a popover trigger, the theme toggle; menus hold the dock with `keepOpen` and `release` | top centre | switch: Starts closed · Starts open; switch: Second face |
| `/dock/rail` | 3. Vertical section rail | `orientation="vertical" collapse="closed"`; `#persistent`: a crest; section rows; `#persistent-end`: settings and theme | left edge, full height | switch: Folds · Pinned open |
| `/dock/figure-tools` | 4. A figure's tools dock | `collapse="closed" expand-on="press"`; the view seat in `#persistent-end`; `#collapsed`: a More handle; options, download, enlarge | at the end of the header of each of three Cards | switch: Handle · Words. Three docks on one page is the composition: a pointer sweep must open none |
| `/dock/dials` | 5. A figure's dial bar | `:collapse="false"`; two captioned segmented groups parted by a separator; a period stepper | above one Card | none |
| `/dock/canvas-tools` | 6. Canvas tool dock | `fit-content`, default collapse; `#collapsed`: a glyph and a status dot; four seats in tooltips; one primary tool in `#persistent-end` | floating at the top right, over the stage's field | none |
| `/dock/transport` | 7. Transport | `collapse="closed" fit-content`; Play in `#persistent`; speed, reset, a read-out; `#collapsed`: a progress bar | bottom centre | none |
| `/dock/pager` | 8. Pager and step controls | `:collapse="false"`; previous, PagerDots, next | bottom centre | switch: Dots · Step with a primary action |
| `/dock/corner-controls` | 9. A page's controls seat | one action: `:collapse="false" fit-content`; several: `collapse="closed" expand-on="press"`, vertical under 30rem | bottom right corner | switch: One action · Several |
| `/dock/action-row` | 10. An inline action row | `:collapse="false" fit-content`; Apply, Copy, Format | in a Card's header | none |

Each dock page's extra checks: the dock is a full pill at rest, open and at 390; exactly one
aurora field on the page; no text on the field; dock words and icons at 4.5:1 and 3:1 against the
field.

## Data (8: 6 keep, 1 merge, 1 cut)

| Route | Fate | Component shown | Stage | Variants | Words | Reason |
|---|---|---|---|---|---|---|
| `/data/table` | KEEP | Table | tall | none | 30 | |
| `/data/data-table` | KEEP | DataTable | tall | switch: Loaded · Loading · Empty · Error | 40 | |
| `/data/sortable-list` | KEEP | SortableList | tall | none | 30 | 2 % component in the fold today |
| `/data/infinite-scroll` | KEEP | InfiniteScroll, scrolling inside the stage | tall | none | 30 | 1 % component in the fold today |
| `/data/timeline` | KEEP | Timeline | tall | switch: Running · Indeterminate | 40 | |
| `/data/search` | MERGE → `/containers/command` | | | | | search shown on three routes; the ranking and highlight are seen in the Command list |
| `/data/virtual-section` | CUT | | | | | the demo's own windowing helper, not a library component; 428 words; overflows sideways at 390 |
| `/data/metric` | KEEP | Metric | fit | row: Readout · Cell · Ledger row | 40 | |

## Feedback (4: 4 keep)

| Route | Fate | Component shown | Stage | Variants | Words | Reason |
|---|---|---|---|---|---|---|
| `/feedback/alert` | KEEP | Alert | fit | row: Tones | 30 | |
| `/feedback/toast` | KEEP | Toast, raised by real buttons in the stage | fit | row: Tones; row: With an action | 40 | the Toaster tab goes |
| `/feedback/progress` | KEEP | Progress | fit | row: Sizes; row: Indeterminate; row: Vertical · Liquid | 50 | 178 words today |
| `/feedback/skeleton` | KEEP | Skeleton | fit | row: Text · Avatar · Card | 30 | |

## Motion (6: 5 keep, 1 merge)

| Route | Fate | Component shown | Stage | Variants | Words | Reason |
|---|---|---|---|---|---|---|
| `/motion/springs` | KEEP | the spring response, tuned live | fill | presets: the shared spring characters and the easing tokens | 30 | the one motion editor; absorbs Motion Lab and Foundations' Motion |
| `/motion/curve-gallery` | MERGE → `/motion/springs` | | | | | a second editor of the same curves |
| `/motion/scroll` | KEEP | ScrollProgressRim on a scrolling column inside the stage | tall | switch: Bar · Rim · Reveal | 40 | 0 % component in the fold; three "writers" of commentary go |
| `/motion/deck` | KEEP | Deck | tall | none | 40 | the strip that overflows sideways at 390 is fixed in the stage |
| `/motion/handmark` | KEEP | HandMark: the four gestures on real text | fit | none | 40 | 224 words before the first mark today |
| `/motion/text-motion` | KEEP | Typewriter and Countup (one pair, shown together, with one replay control) | fit | none | 40 | the tab switcher goes |

## Compositions (5: 3 keep, 1 merge, 1 cut)

A composition's stage is the scene. Budget 20 to 30 words.

| Route | Fate | Component shown | Stage | Variants | Words | Reason |
|---|---|---|---|---|---|---|
| `/compositions/auth-shell` | KEEP | the sign-in scene | tall | none | 20 | 7 low runs in dark over its brand field: text moves off the field |
| `/compositions/settings` | KEEP | the settings scene | tall | none | 20 | |
| `/compositions/empty-states` | KEEP | the empty state | tall | switch: Empty · Loading · Error · No results | 30 | |
| `/compositions/form-validation` | MERGE → `/forms/inputs` | | | | | validation is the Input's invalid state |
| `/compositions/chassis` | CUT | | | | | a page about how this site's pages are built |

## Every duplicate in TABLE.md, resolved

| Duplicate | Where | Resolution |
|---|---|---|
| Two Blob stages and a third control surface | `blob.vue:528`, `:742`, `:752-767` | one Blob; the plain blob is the "Plain" preset; pause is one control on the stage |
| Eight constellation canvases | `constellation.vue:300, 331, 372, 395, 423, 441`, the pinned one, and the page-wide field | one field in the editor form; each behaviour is a preset or a switch; the page-wide field goes with all page backgrounds |
| Four aurora fields | `dock/controls.vue:100, 122, 153, 170` | the page is merged; every dock page has one field, inside its stage |
| "Aurora" printed twice | `aurora.vue:136` | the editor frame has no heading of its own |
| One description printed five times | Aurora's per-nucleus rows | editor rows carry no description line |
| The same three questions twice | `accordion.vue:45`, `:69` | one Accordion; the second mode is a switch |
| One paragraph printed 18 times | `toc-tracking.vue` | the column is Skeleton blocks |
| `/` and `/foundations/intro` | same cards, same resolver | `/` only |
| The glass-tier ladder on five routes | paper-glass, surface-tints, glass-panel, glass-material, display/surface | tokens on `/foundations/paper-glass`, the component on `/display/surface`; the other three merged |
| Floating panels on four routes | popover, hover-card, hover-popover, tooltip | `/containers/popover` and `/containers/tooltip` |
| Search on three routes | data/search, dock/dock-search, containers/command | `/containers/command` |
| Springs and easing on three routes | foundations/motion, motion/springs, motion/curve-gallery | `/motion/springs` |
| Studios on four routes | configurator and three substrates | kept: the Configurator's page shows the component on a neutral specimen, the substrates use it; all share one editor frame, and the Configurator page's second example goes |
| Textarea as a route and as a tab | `/forms/textarea`, `inputs.vue:14` | the route only; family tabs are removed everywhere |
| Fields stacked behind one page | the shell's aurora, the page background, the dock stage | one ground for the site; a field only inside a stage |
