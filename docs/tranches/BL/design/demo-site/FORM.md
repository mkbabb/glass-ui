# glass.babb.dev: the page form, the editor form, the shell

Design ruling, 2026-11-15. It answers the owner's review of that day
(`../../audit/demo-site/OWNER-ORDER.md`) against the measurements in
`../../audit/demo-site/TABLE.md`, which was taken on glass-ui 11.0.2 (master, `e1aebc2d0`).
Nothing here was built or loaded: every number is a target for the implementing seats and a check
for the reviewing ones. Routes are in `ROUTES.md`, library faults in `LIBRARY-FAULTS.md`, the build
order in `PACKETS.md`.

Two viewports are named throughout: **1440** is 1440×900, **390** is 390×844 with touch. "Viewport
area" is the whole viewport (1,296,000 px² and 329,160 px²).

The rule under all three sections: a page exists to show one working component, large. Anything
that is not that component, its variants, or one sentence naming it is cut, not moved.

---

## 1. The page form

Every component page (every route under a section) has the same four parts in the same order, and
nothing else.

| Part | What it is | Marker the checks read |
|---|---|---|
| Header | the return link, the title, one sentence | `[data-story-header]` |
| Stage | the live component, alone, on a plain ground | `[data-story-stage]` |
| Variants | at most three rows that change or restate the same component | `[data-story-variants]` |
| Code | one usage snippet, closed by default | `[data-story-code]` |

### Header

- Return link (`← Section`), then the title as the page's one `h1`, then the lede.
- The lede is one sentence of at most **16 words**. It says what the component is for. It names no
  token, prop, file, engine, ticket or release.
- Title and lede are set in `--foreground`. The header uses no muted ink, so its contrast does not
  depend on the library's muted token (`LIBRARY-FAULTS.md` F3).
- The title is the chrome rung every ordinary page already uses (`--chrome-title-rung`). The
  full-viewport hero title is cut from component pages: it took 20 to 30 % of the fold and its
  descender crossed the lede on every page that had it (`story-hero.css:106-181`). The large title
  survives only on `/` and the eleven section pages, where it is bounded (section 3).
- Height: at most **132 px** at 1440 and **148 px** at 390, return link to the lede's last line.
- The header scrolls away with the page. It does not stick (section 3, "The scroll header").

### Stage

One box, full article width, directly under the header. It holds the page's component and nothing
the page authored: no heading, no paragraph, no caption, no status chip, no read-out of internal
state. Text inside the stage is the component's own content (a button's label, a table's cells).

Three sizes, set per route in `ROUTES.md`:

| Size | Used by | 1440 | 390 |
|---|---|---|---|
| `tall` | surfaces, containers, docks, data, compositions, scenes | 1285×504 (`min(56svh, 40rem)`), **≥ 45 %** of the viewport | 358×473, **≥ 45 %** |
| `fit` | small controls shown as their working set (buttons, badges, inputs, tokens) | content height, at least 16rem: 1285×256 or more, **≥ 24 %** | at least 14rem: 358×224 or more, **≥ 22 %** |
| `fill` | pages with a configurator | the editor form, section 2 | section 2 |

- The stage's top edge is at most **184 px** from the top of the viewport at 1440 and **200 px**
  at 390. Nothing sits between the header and the stage.
- The component is shown at its real size. It is never scaled up to fill the box and never drawn
  as a picture. A `fit` stage holds the whole working set (for Buttons: the emphasis-by-tone grid,
  the sizes, the states) laid out at natural size with `auto` tracks, so the stage is the page.
- Grids inside a stage are keyed to the stage's own width (container queries), never to the
  viewport. This is the cause of both pages the owner called unreadable: a four-column grid keyed
  to a 1440 viewport inside a 410 px column (`paper-glass.vue:135`, `buttons.vue:28`).
- A stage may carry a field of its own (an aurora behind a dock, colour behind glass tiers) when
  the component is glass and needs something to frost. The field lives inside the stage box. No
  page text ever sits on a field.
- One stage per page. One instance of the subject per page, with the exceptions written in
  `ROUTES.md` (a figure's tools dock, whose point is several on one page).

### Variants

Variants come in one of two forms, and a page uses at most **three rows** in total.

1. **A switch on the stage.** For anything large (a dialog, a sheet, a dock, a substrate, a table):
   a segmented control directly under the stage changes the one instance. The stage content
   cross-fades and any size change is tweened (motion-canon P0). No second instance is mounted.
2. **A row of real instances.** For small controls only: one row of the component in each value of
   one axis (sizes, tones, states). At most 12 instances in a row.

Each row has a label of at most **three words** and no description. A row never repeats what the
stage already shows.

### Code and props

- Props tables, slot lists, token names and API prose leave the site. They belong to the
  component's README under `src/components/<name>/README.md` (19 exist today; the rest are the
  library's to write, and no demo packet waits for them).
- A page may end with one snippet of at most **15 lines**: the smallest working use. It sits in a
  closed disclosure labelled "Code" whose opening is tweened. Its words do not count against the
  page's budget. A page with nothing worth copying has none.

### Words

Counted as every visible word in the page's `article`, outside the stage and outside the code
block. The title and the return link count.

| Budget | Limit |
|---|---|
| words before the stage (TABLE.md's "words before first component") | **≤ 24** |
| lede | ≤ 16, one sentence |
| a variant row's label | ≤ 3 |
| the whole page | the route's budget in `ROUTES.md`: **30 to 60**, never more than 60 |

For scale: the site's median page today carries about 100 words, the dock overview 706.

### What a page may never contain

- Build history: wave and ticket ids, dates, "shipped", "retired", "struck", "ported", version
  numbers, the name of another app.
- Stages of construction: "stage 1", "stage 2", "from first principles", "the floor".
- Internals: shader and algorithm terms, token and custom-property names in prose, engine names,
  a renderer badge, a click counter, a "settled" badge, any read-out added for a test.
- A second instance of the same stage, or a second canvas of the same substrate.
- A picture standing in for a component: no raster, no screenshot, no drawn silhouette.
- A switcher that swaps whole components into one page (the family tabs). A page is one component.
- A heading that repeats the page title. Section headings inside a page: none; the three variant
  labels are the only labels.
- Prose over a chromatic field, and any text below 4.5:1 that the page authored.
- Emphasis by capitals, and more than two emphasised runs per 100 words (`restraint.md`).
- A standing caption under a control whose purpose is evident.
- An instant change: every switch, disclosure and state change the page authors is tweened.

### The reviewer's checklist

Run per page, in three cells (1440 dark, 1440 light, 390 dark touch). Every line is pass or fail.

1. Words before the stage ≤ 24; lede ≤ 16 words and one sentence.
2. Page words (outside stage and code) ≤ the route's budget, and ≤ 60.
3. Stage top ≤ 184 px (1440), ≤ 200 px (390).
4. Stage area ≥ its size's share: `tall` ≥ 45 % at both; `fit` ≥ 24 % at 1440 and ≥ 22 % at 390;
   `fill` per section 2.
5. In the first screen, live component area ≥ 4× prose area, and prose ≤ 8 % of the viewport.
6. Exactly one `[data-story-stage]`; no two canvases of one substrate; no heading text equal to
   the title; no paragraph text repeated on the page.
7. Zero `img`, zero `canvas` drawn by the demo as a stand-in, inside any stage or card.
8. Variant rows ≤ 3; each label ≤ 3 words; no `p` inside `[data-story-variants]`.
9. Every text run the page authored (header, variant labels) ≥ 4.5:1 in dark and in light.
   Runs inside library components are reported against the library, not failed against the page.
10. None of the banned words: a grep of the rendered text for ticket ids (`[A-Z]{1,3}-?\d+`,
    `#\d+`), "stage 1", "stage 2", "shipped", "retired", "struck", `--[a-z]`, "WebGPU", "WebGL",
    "Canvas2D", "SDF", "shader".
11. Every dock on the page is a full pill: each corner radius ≥ half the dock's cross size, less
    1 px, at rest and open.
12. No console error or warning on load or on using each variant.
13. At 390 the page does not overflow sideways: `main.scrollWidth ≤ main.clientWidth`.
14. Page length ≤ 2 screens at 1440 and ≤ 3 at 390, except the pages whose subject is scrolling
    (named in `ROUTES.md`).
15. Each variant switch and the code disclosure: sampled frames show a start and a stop, no leg
    landing more than two fifths of its travel in one frame (motion-canon P0a).

---

## 2. The editor form

For pages whose component is tuned through a configurator: Aurora, Blob, Constellation, Fourier
Field, Springs, and the Configurator's own page. The owner: "editor and main area are way too
small--as with many of the editor pages". Measured: an 830×242 stage and a 400×242 editor at 1440,
a 308×1 editor at 390, under 101 words of prose.

The form: the studio is the page. The header shrinks to the return link, the title and a lede of
at most 12 words; below it there is the studio and nothing after it. No hint paragraph, no second
stage, no notes.

### At 1440

| Piece | Size | Scrolls? |
|---|---|---|
| Header | ≤ 96 px | no |
| Studio (stage and editor together) | fills from the header to the pager dock's clearance: `100dvh − 32 − header − 16 − 92` ≈ **664 px** tall, full article width (1285 px). **≥ 65 %** of the viewport | never |
| Stage | the left column: about **884×664**, **≥ 44 %** of the viewport. Floor: 860×640 | never; it does not move |
| Editor | the right column: **400×664** (the library's 300 to 400 px aside band). Floor: 380×640 | its own column scrolls, and only it |
| Presets | one row of chips at the top of the editor column, **≤ 64 px** tall, scrolling sideways. Never a ribbon across the top | sideways only |

- The page itself does not scroll: `main.scrollHeight = main.clientHeight`.
- The preset ribbon across the top is cut (`aurora.vue:140`, `gallery-placement="top"`). It took
  314 of the studio's 558 px. Presets ride the editor column (`gallery-placement="aside"`, the
  library default).
- Editor rows are one line each: label left, control right, **≤ 48 px** tall. The description line
  under every control is cut (Blob carries 17 of them). A row whose label cannot say what it does
  gets a better label, or a tooltip on the label.
- Layers are an accordion with one layer open, opening and closing by tween, so the open layer
  usually fits the column. At 664 px the editor shows at least **10 rows** without scrolling.
- A layer's heading carries no property-name suffix (`--interaction-*`).
- The stage holds the component and at most one small pause control in a corner. No renderer
  badge, no state read-out, no "Reset clicks", no "Poke".

### At 390

The same structure stacked: presets, stage, editor. The studio keeps a fixed envelope, so the stage
stays on screen while a slider moves.

| Piece | Size | Scrolls? |
|---|---|---|
| Header | ≤ 64 px (the lede drops to one line or is omitted) | no |
| Studio | `max(100dvh − 16 − header − 12 − 92, 40rem)` = **660 px** at 844 tall, 358 px wide | never at 844 tall; on a shorter phone the page scrolls by the difference |
| Presets | one chip row, **52 px** | sideways only |
| Stage | **358×300** (`--configurator-stage-min: 18.75rem`). Floor: 350×296 | never |
| Editor | the remainder: **358×308** at 844 tall. Floor: 350×288 (18rem), at every height | its own box scrolls |

The editor may never be shorter than 18rem at any viewport. That floor is what failed: the stacked
arm gave the gallery and the stage the whole envelope and the editor the remainder, which was 1 px.

### What is the demo's and what is the library's

Demo (packet P1 builds it, the section packets use it):

- One editor frame for all six pages, moved out of `stories/substrates/_frame/VizStudio.vue` into
  the page scaffolding. It has no heading, label or blurb props: the page header is the only name.
- The envelope above replaces `--stage-block: min(62svh, 44rem)` (`layout.css:59`, `:138-140`).
- `gallery-placement="aside"` on every editor page; the chip row replaces Aurora's thumbnail
  ribbon; the hint `aside` (`aurora.vue:184-186`) and Blob's two trailing sections
  (`blob.vue:731-767`) are deleted.
- The demo sets `--configurator-stage-min`, a documented knob, and an envelope tall enough that
  the editor's 18rem holds without any library change.

Library (not a demo packet; `LIBRARY-FAULTS.md` F5):

- `src/components/configurator/styles.css:317-322`: the stacked arm's rows are
  `auto / minmax(stage-min, auto) / minmax(0, 1fr)`. The aside's `minmax(0, 1fr)` has no floor, so
  inside any consumer's fixed height the editor can reach 0. It needs a floor
  (`minmax(min(var(--configurator-aside-min-block, 18rem), 100%), 1fr)`), and the shell needs a
  matching minimum block size so a short envelope grows instead of crushing a row.
- The same file, `:355-362`: the wide arm puts the gallery row inside the same envelope with no
  cap. A gallery row needs a maximum block size (`--configurator-gallery-max-block`, 6rem by
  default) with sideways scroll.

The demo must pass its checks on the library as it stands on master. The library floor protects
the other consumers of the Configurator.

### The editor checklist

1. Stage ≥ 860×640 at 1440 and ≥ 350×296 at 390; ≥ 44 % of the viewport at 1440.
2. Editor ≥ 380×640 at 1440 and ≥ 350×288 at 390.
3. The page does not scroll at 1440 or at 390×844; the stage's rect is unchanged while the editor
   column scrolls end to end.
4. Presets ≤ 64 px tall at 1440, ≤ 52 px at 390.
5. No description line in any row; row height ≤ 48 px; ≥ 10 rows visible at 1440.
6. One canvas of the subject on the page (plus the shell's field, if the shell's is live).
7. Words outside the studio ≤ 30. Lines 9 to 15 of the page checklist apply unchanged.

---

## 3. The shell

### The two navigation docks

The owner: "both docks do not have collapse states nor do they animate". Both are pinned today
(`SidebarDock.vue:110-115`, `BottomDock.vue:97-103`, each `:collapse="false"`). The site's own
chrome is the first dock a visitor meets, so it must fold and move. Both use only the dock's
documented props and slots as they stand on master.

**The category rail** (wide landscape viewports, the left column):

- `orientation="vertical"`, `collapse="open"`, `expand-on="hover"`.
- It starts open, so every category is clickable from the first frame. This answers the reason the
  collapse was retired (`SidebarDock.vue:58-65`: a rail that starts closed parks its buttons until a
  hover dwell). It folds on the first press in the page and opens again on hover or focus.
- Folded face (`#collapsed`): the current section's icon in one 64×64 disc at the rail's top.
- Seats: the eleven categories, a separator, then a foot of two seats: the theme toggle
  (`DarkModeToggle size="dock"`) and the gear.
- The facet menu (the stack icon, `DockFacetMenu.vue`, `dock-layer-contexts.ts`,
  `useContextualDockLayers.ts`, `useShellNavDock.ts`) is cut from both docks. It is a second way to
  reach the same pages the pager lists, and pages no longer have sections for it to point at.
- The rail's column keeps its width whether the dock is folded or open. Content never shifts.
- Inside the phone's Sheet the rail stays `:collapse="false"`: a sheet's contents do not fold.

**The pager dock** (bottom centre):

- `orientation="horizontal"`, `fit-content`, `collapse="closed"`; `expand-on="hover"` where the
  pointer is fine, `expand-on="press"` where it is coarse.
- Folded face (`#collapsed`): the current page's title in words. The dock then names the page at
  all times, which is why the sticky header can go.
- `#persistent-end`: Previous and Next. They stay live while the dock is folded, so paging never
  needs the dock opened.
- `#persistent`: the categories seat, only where there is no rail (portrait and narrow).
- Open face (the default slot): the section's page tabs in their sideways-scrolling strip, a
  separator, previous and next section.
- `collapsed-label="Pages in this section"`.

Both docks are full pills folded and open (rail: radius 32 on a 64 px width; pager: radius 30 on a
60 px height). Their fold and open ride the library's dock spring; the demo adds no motion of its
own. No `shape` other than the default is passed anywhere in the demo.

Checks: each dock has two measured states with different rects and class sets; 24 samples at 60 ms
across a fold show a monotone change with a start and a stop; Previous and Next respond while the
pager is folded; every category responds on the first frame after load.

### The scroll header

The owner: "scroll header not rounded". Measured: a square box carrying the library's shadow, over
a gradient wash with only its bottom corners rounded, with the page's content readable through it.

Ruling: **it goes.** The page header is not sticky. It scrolls away with the page.

- The pager dock's folded face already shows the page title at all times. A second sticky name at
  the top is the same information twice.
- With the header at 132 px and the stage first, most pages are one or two screens: there is little
  to scroll past.
- Removing it deletes a gradient, a shadow and a plate from every page (`restraint.md`: zero
  gradients on chrome, one shadow per surface) and returns about 110 px of the first screen.
- `StoryPage.vue` stops calling `useScrollChrome` and drops `.scroll-chrome`;
  `story-hero.css:183-268` (the sticky seat, the plate, the weight) is deleted.

The library's recipe keeps its own fault for other consumers (`LIBRARY-FAULTS.md` F2). If the owner
wants a sticky name kept, the only acceptable form is a small glass capsule holding the return
arrow and the title (full pill, one blur, one shadow, fit to its content); that is his question 2
in `OWNER-READ.md`, default "gone".

Check: after a 600 px wheel scroll on any page, no element of the header is inside the viewport,
and nothing but the docks is stuck to an edge.

### Where the page's scroll ends

The owner: "why does this clip so earlier, why is this dock so transparent". Measured: the scroller
ends at a hard line 12 px above the dock because the dock is its own grid row
(`dock-nav.css:44-52`), and the dock's plate is 10 to 14 % alpha with nothing ever behind it.

Ruling: **content passes under the dock, and the dock gets a firmer plate.**

- The grid becomes `"rail main"` only. `main` runs the full height of the viewport. The pager dock
  is laid over it at the bottom centre (same grid cell, aligned to the end), not in a row of its
  own.
- `main` gets `padding-block-end` and `scroll-padding-block-end` of **92 px** (the dock's 60, its
  12 px inset, 20 px of air), so the last line of every page can be scrolled clear of the dock.
- No fade, mask or gradient at the bottom edge. Content slides under frosted glass and that is the
  whole effect.
- The pager dock's plate is raised to the floating tier: the demo sets the dock's plate tier
  variables on this one dock (`--dock-plate-collapsed-tier` and `--dock-plate-expanded-tier` to
  `--glass-veil-floating`). This is the one place the demo touches a dock variable; it is recorded
  as a library fault (F6) and is removed when the library's default plate is firm enough.
- The rail keeps its own column. Content does not pass under it.

Checks: with the longest page scrolled to its middle, content pixels are present under the dock's
rect; the dock's icons and words measure ≥ 4.5:1 (icons ≥ 3:1) against what is behind them, in dark
and light, over the darkest and lightest content on the site; scrolled to the end, the last element
of the page is fully above the dock.

### The first paint in dark

The owner: "why does the aurora take so long too load and flash black". Measured: every dark cold
load shows near-black frames until 187 to 373 ms, because the only thing painted before JavaScript
is the dark page floor (L4), and the warm ground is computed in script. Two routes stay black.

What the head must do (the demo's stamp plugin, `vite.dark-stamp.ts`, both configs):

- Beside the theme script it injects one inline `<style>`, first in `<head>`:
  `html{background-color:<light ground>}` and `html.dark{background-color:<dark ground>}`. The two
  colours are the settled shell field's mean ground: light `rgb(252 241 230)`, dark
  `rgb(43 34 27)` (the values banked in `story-hero.css:41-43`), re-measured by the packet.
- Nothing else. No gradient in the head; the live field supplies the colour variation.

What the shell must do:

- The warm ground is always painted, on every route, from the first frame: `body` stays
  transparent over the `html` colour, and the shell's static ground plane mounts on every route.
- Only the live canvas is conditional. Where a page's stage runs its own field or substrate, the
  shell keeps its static ground and does not start a second live canvas. No route is ever left on
  the bare floor (`/dock/controls` and `/dock/overflow` today).
- Per-page backgrounds are cut: the grid, the paper wash, the page-wide constellation and the
  page-wide aurora behind a story's text (`StoryHero.vue:111-140`, the per-category map in
  `manifest.ts:218-230`). The site has one ground. A field appears only inside a stage.
- The canvas fades in over the ground on the library's slow duration, as now.

Checks, cold load in dark at 1440 with every compositor frame captured: zero frames in which half
the pixels are under 22/255; the frame-to-frame change in mean luma never exceeds 12/255 from
navigation start until the field settles; the first coloured frame is the first frame; the same on
`/`, `/substrates/aurora`, `/dock/nav` and one page from each other section.

### The front door and the section pages

`/` is the one front door. `/foundations/intro` rendered the same eleven cards and is merged into
it. `/` and the eleven section pages share one form:

- A header with the large title, bounded: the title's block is at most **22 %** of the viewport
  height, and the title's box ends at least 8 px above the lede's box (today they overlap on all
  eleven). The lede is at most 12 words.
- Below it, a grid of cards and nothing else.

**The cards.** The owner: "subtrates should be a true component, not a screenshot--these card items
should be more rounded"; "too much text, and not proper dock demos on the cards".

- Every card shows a live component. There is no picture and no card without a preview. The
  132×82 raster (`vizPreviewStill.ts`, 403 lines) and the "none" case are deleted.
- The preview is the page's own stage, mounted small and inert. Each story keeps its stage in a
  file of its own (`<id>.stage.vue`) that the page mounts large and the card mounts small, so a
  card can never drift from its page and nobody authors a second vignette. A story supplies a
  separate `<id>.tile.vue` only where its stage cannot run small and inert: an overlay that needs
  opening, a full-viewport scene, an editor (whose card shows the bare substrate).
- A section's card on `/` shows its first page's stage.
- A substrate card mounts the real component (the real Aurora, Blob, Constellation, Fourier
  field). It draws, then parks; it resumes while the card is hovered or focused. A page of cards
  runs at most four live canvases, and the shell's own field stays static on a page that has any.
- A card is the preview, then the title. **No blurb.** The card's words are its title.
- Radius: **24 px** (`--radius-3xl`), up from 16. The preview runs edge to edge across the card's
  top and is clipped by the card's own corner: one radius, no inner well, no inset highlight
  (`SectionPreviewCard.vue:106-110` is deleted). Whether the library's `--radius-card` should rise
  with it is the owner's (question 4).
- Preview shape 16:10. Grid: four across at 1440 (each card at least 290 px wide), one across at
  390.
- Hover: one fade and one movement at most, 200 ms or less, the same both ways.

Checks: every card contains a live component and zero `img`; no card has a paragraph; each card's
four corners measure 24 px; every dock inside a card is a full pill; live canvases on the page ≤ 4;
the first row of cards is inside the first screen at 1440.
