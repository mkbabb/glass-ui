# glass.babb.dev: the build packets

Design ruling, 2026-11-15. Fourteen packets rebuild the demo to `FORM.md` and `ROUTES.md`. Each is
sized for one implementing seat and owns its directories outright, so no two packets edit the same
file. The first two land in order before anything else; the eleven section packets can then be
taken in any order or side by side; the last closes.

## Order

| # | Packet | Owns | Waits for |
|---|---|---|---|
| P0 | Shell | `demo/shell/`, `vite.dark-stamp.ts`, the `html`/`body` rules in `demo/demo.css` | nothing |
| P1 | Page scaffolding | `demo/chassis/`, `demo/stories/manifest.ts`, `demo/stories/manifest/`, `demo/router.ts`, `demo/stories/*/_frame/`, a new `routes.ts` in each section directory, the checker | P0 |
| P2 | Substrates | `demo/stories/substrates/` | P1 |
| P3 | Dock | `demo/stories/dock/` | P1 |
| P4 | Foundations | `demo/stories/foundations/` | P1 |
| P5 | Display | `demo/stories/display/`, and `demo/stories/data/avatar.vue` (moved in) | P1 |
| P6 | Containers | `demo/stories/containers/` | P1 |
| P7 | Forms | `demo/stories/forms/` | P1 |
| P8 | Navigation | `demo/stories/navigation/` | P1 |
| P9 | Data | `demo/stories/data/` except `avatar.vue` | P1 |
| P10 | Feedback | `demo/stories/feedback/` | P1 |
| P11 | Motion | `demo/stories/motion/` | P1 |
| P12 | Compositions | `demo/stories/compositions/`, `demo/examples/` | P1 |
| P13 | Close | what is left of the old scaffolding; the whole-site run | P2 to P12 |

Suggested order for one seat at a time, worst first by the owner's review: P2, P3, P4, P5, then
P6 to P12.

## Rules for every packet

1. **No file under `src/` changes.** A fault in the library is written into the packet's record
   against its row in `LIBRARY-FAULTS.md` and left. The demo must pass on the library as it stands
   on master.
2. **Only documented library surface.** No `.dock-*` or other library class selector, no private
   custom property, no `$el`, no `shape` prop on a dock. The single exception is the pager dock's
   plate tier in P0.
3. **A packet edits only what it owns.** A test that pins something the packet removes
   (`tests/demo/`, `tests/gates/` where a gate reads `demo/`, `tests-visual/`) is updated or
   deleted in the same packet, and listed in its record.
4. **Cross-section merges.** The section that loses a route removes the row from its own
   `routes.ts` and leaves the source file. The section that receives it reads the file, takes the
   one thing `ROUTES.md` names, and deletes the file. The five such files:
   `foundations/motion.vue` (to P11), `foundations/overlays-scrims.vue` (to P6),
   `substrates/glass-material.vue` and `substrates/glass-panel.vue` (to P4), `data/search.vue`
   (to P6), `compositions/form-validation.vue` (to P7).
5. **Text.** Every word a packet writes obeys the page form: no build history, no internals, no
   capitals for emphasis. This includes source comments that restate history; a rebuilt file
   carries comments that say what the code does, in a line or two, or none.
6. **Motion.** Nothing a packet authors changes instantly. A packet adds no motion of its own
   beyond the variant cross-fade and the code disclosure that P1 provides.
7. **Measuring.** Checks run against a local build (`npm run demo:dist:build`, then
   `demo:dist:serve`), through `~/.claude/guard/guarded` as a browser run: one browser per run, a
   new context per cell, contexts and browser closed in `finally`, the server stopped on exit. No
   WebKit unless the packet says so, and then under `--exclusive webkit`. Vitest runs with
   `--maxWorkers=2`. The three cells are 1440×900 dark, 1440×900 light, 390×844 dark with touch.
8. **Record.** Each packet leaves one file, `docs/tranches/BL/design/demo-site/record/P<n>.md`:
   the routes it rebuilt, the checker's table for them, the files deleted, the tests changed, and
   any library row it met. Captures go beside it. A check is not "passed" without its row.

"The page checklist" below means lines 1 to 15 in `FORM.md` section 1; "the editor checklist"
means lines 1 to 7 in section 2.

---

## P0. Shell

Why first: every page sits in it, and five of the owner's thirteen points are here (the docks,
the scroll end, the dock's plate, the black first paint; the header's removal lands in P1).

Files:

- `demo/shell/AppShell.vue`: the grid loses its dock row; the static warm ground mounts on every
  route; only the live canvas is conditional on the route.
- `demo/shell/dock-nav.css`: `"rail main"` only; the pager dock laid over the end of `main`;
  `main` gets 92 px of end padding and end scroll padding; the pager dock's plate tier.
- `demo/shell/SidebarDock.vue`: `collapse="open"`, `expand-on="hover"`, the `#collapsed` face
  (the current section's icon), the foot (theme toggle, gear).
- `demo/shell/BottomDock.vue`: `collapse="closed"`, `expand-on` by pointer, `#collapsed` (the
  page title), `#persistent-end` (Previous, Next), `#persistent` (the categories seat, no rail
  only), `collapsed-label`.
- Deleted: `demo/shell/DockFacetMenu.vue`, `dock-layer-contexts.ts`, `useContextualDockLayers.ts`,
  `useShellNavDock.ts`.
- `vite.dark-stamp.ts`: the inline ground `<style>` beside the theme script, in both configs.
- `demo/demo.css`: `html` and `body` background rules only.

Acceptance:

1. Each shell dock has a folded and an open state with different rects; 24 samples at 60 ms across
   one fold and one open show a monotone change with a start and a stop.
2. Both docks measure a full pill folded and open, at 1440 and at 390 (each corner ≥ half the
   cross size, less 1 px).
3. On the first frame after load every category in the rail answers a click. With the pager
   folded, Previous and Next answer.
4. The rail's column width is the same folded and open; `main`'s rect does not change when either
   dock folds.
5. Scrolled to the middle of the longest page, content pixels are present under the pager dock's
   rect. Scrolled to the end, the page's last element is fully above the dock.
6. The pager dock's words and icons measure ≥ 4.5:1 and ≥ 3:1 against what is behind them, dark
   and light, on `/data/table` (dense text) and `/substrates/aurora` (bright field).
7. Dark cold load at 1440, every compositor frame: zero frames with half their pixels under
   22/255; no frame-to-frame step in mean luma over 12/255 before the field settles. Run on `/`,
   `/substrates/aurora`, `/dock/overview`, `/dock/controls`, `/dock/overflow`, `/display/buttons`.
8. No route is left without the ground: the six routes above show the warm ground at the first
   frame.
9. No console error on any of the 92 routes as they stand; no sideways overflow of `main` at 390
   caused by the shell.
10. At 390 the Sheet opens from the categories seat and the rail inside it is not folded.

---

## P1. Page scaffolding

Why second: it is the form itself. Section packets only fill it.

P1 adds the new form beside the old one so that pages not yet rebuilt keep rendering. A page opts
in by filling the new slots. P13 deletes the old path.

Files (all under `demo/chassis/` unless said):

- `page/StoryPage.vue`: the header (return link, `h1`, lede, in `--foreground`), then the slots
  `#stage`, `#variants`, `#code`; writes `data-story-header`. No sticky header: the
  `useScrollChrome` call and the `.scroll-chrome` class go, with `hero/story-hero.css:183-268`.
  The hero variant for component pages goes: every component page has the one header. The default
  slot stays for unrebuilt pages until P13.
- `stage/StoryStage.vue` (new): the stage box, `size="tall" | "fit"`, an inline-size container,
  `data-story-stage`. A `field` prop mounts one Aurora inside the box for glass subjects, with the
  shared backdrop-luminance observer that `stories/dock/_frame/DockStage.vue` carries today; that
  file is deleted and its job lives here.
- `variants/StoryVariants.vue` (new): up to three rows; a row is either a switch (SegmentedTabs
  bound to the stage's state) or a row of instances; label ≤ 3 words; `data-story-variants`. It
  owns the cross-fade and the size tween when a switch changes the stage.
- `code/StoryCode.vue` (new): the closed "Code" disclosure over the existing `CodeBlock.vue`,
  tweened by the library's Collapsible; `data-story-code`.
- `editor/StoryEditor.vue` (new, replacing `stories/substrates/_frame/VizStudio.vue`): the editor
  form's envelope at 1440 and at 390, `gallery-placement="aside"`, the chip row, slots `#stage`,
  `#controls`, `#presets`. No heading, label or blurb props.
  `stories/substrates/_frame/RendererStatus.vue` is deleted.
- `landing/SectionPreviewCard.vue`: preview edge to edge, title, no blurb, 24 px radius
  (`rounded-3xl`), no inner well, no inset highlight.
- `landing/storyTile.ts`: a card's preview is the story's `<id>.stage.vue`, or its `<id>.tile.vue`
  where one exists. `landing/vizPreviewStill.ts` is deleted. A story with neither shows its title
  alone until its section packet lands; P13 asserts none is left.
- `landing/CatalogLanding.vue`, `landing/SectionLanding.vue`, `hero/StoryHero.vue`: the bounded
  large title (≤ 22 % of the viewport height, 8 px clear of the lede), lede ≤ 12 words, the card
  grid. Page-wide backgrounds are removed: `StoryHero.vue:111-140` and the background fields of
  the manifest go, and `hero/focal.ts` shrinks to "does this route's stage run its own canvas".
- `layout.css`: the stage sizes and the editor envelope replace `--stage-block`.
- `demo/stories/manifest.ts`: assembled from one `routes.ts` per section directory. P1 creates the
  eleven `routes.ts` files with the rows exactly as they are today, minus the background and hero
  options, and with ledes cut to the form (≤ 16 words, no internals). From then on each section
  packet edits only its own `routes.ts`. P1 removes `/foundations/intro`'s row (merged into `/`).
- `demo/router.ts`: reads the assembled table; no other change.
- The checker: `docs/tranches/BL/driver/demo-site/check.mjs` (new), built from the audit's
  `../../audit/demo-site/tools/probe.mjs`. For a list of routes and the three cells it prints one
  row per route per checklist line, pass or fail with the measured number, reading the
  `data-story-*` markers. Every later packet runs it.

Acceptance:

1. A reference page built in the new form passes the page checklist in all three cells. P1 builds
   two as its proof and leaves them in place: `/display/buttons` (a `fit` stage with rows) and
   `/containers/configurator` (the editor form). Both are the owner's named failures. These two
   pages (`display/buttons.vue`, `display/buttons.stage.vue`, `containers/configurator.vue` and
   its stage) are the one exception to directory ownership: P1 writes them, and P5 and P6 take
   them over as finished and do not rewrite them.
2. `/display/buttons`: no two text runs overlap; every button sits inside its track; the page's
   words are ≤ 40.
3. `/containers/configurator`: the editor checklist passes; editor ≥ 380×640 at 1440 and
   ≥ 350×288 at 390.
4. After a 600 px wheel scroll on `/navigation/tabs`, nothing but the two docks is stuck to an
   edge, and no gradient or shadow from a header is painted.
5. `/` and all eleven section pages: the title's box ends ≥ 8 px above the lede's; the title's
   block ≤ 22 % of the viewport height; no card has a paragraph; every card's corners are 24 px;
   zero `img` in any card.
6. Every one of the 91 remaining routes still renders with no console error (unrebuilt pages
   through the old path) and no sideways overflow at 390 that was not there before.
7. One ground: on any route, the only full-viewport field is the shell's.
8. The checker runs end to end on three routes and its numbers agree with a hand measurement of
   the stage rect and the word count on each.
9. `npm run typecheck` passes; `tests/demo/` passes after its three files are brought to the new
   form.

---

## P2 to P12. The section packets

The same job eleven times. For its section, a packet:

1. Edits its `routes.ts` to the fates in `ROUTES.md`: rows removed for merged and cut routes, rows
   added for new ones, each lede ≤ 16 words.
2. For every kept and new route, writes `<id>.stage.vue` (the live component and nothing else) and
   rewrites `<id>.vue` to the form: header from the row, the stage, the variants `ROUTES.md` names,
   an optional snippet. An editor page fills `StoryEditor` instead.
3. Writes `<id>.tile.vue` only where the stage cannot run small and inert, and says why in the
   record.
4. Deletes every file in its directory that no row or stage uses, including family-tab members
   that are now rows of another page.
5. Runs the checker on its routes and on its section page.

Acceptance for every section packet:

- The page checklist passes on every route in all three cells (the editor checklist on editor
  pages); each route's page words are within its budget in `ROUTES.md`.
- The section page: every card shows a live component, zero `img`, live canvases ≤ 4, every dock
  in a card a full pill.
- No file in the section directory is unreferenced.
- No console error or warning on load and on using every variant of every route.
- No sideways overflow at 390 on any route.
- Low-contrast runs inside library components are listed against `LIBRARY-FAULTS.md` rows; zero
  low runs in text the packet authored.

What is particular to each:

### P2. Substrates (4 pages, all editors)

- Aurora: presets become the chip row; the thumbnail ribbon and `usePresetThumbnails.ts` go unless
  the chips use them at chip size; the hint lines go; every row loses its description.
- Blob: one Blob. `blob.vue:731-767` goes; "Plain" becomes a preset; pause is one control on the
  stage (a Switch or a Button, not `DockBackgroundToggle`); the renderer badge, the mood and click
  read-out, "Reset clicks" and "Poke" go.
- Constellation: one field. The six mounts become presets and switches in the editor; the window
  hooks written for old probes (`constellation.vue:188-273`) go.
- Fourier Field: the same form; 115 words before the field become a lede of ≤ 12.
- Extra checks: exactly one canvas of the subject per page; stage ≥ 860×640 at 1440 and ≥ 350×296
  at 390; the subject animates within 1.5 s of load in the headless shell; the section page's four
  cards each mount the real component and park when the card is not hovered.
- Removes the rows for `glass-material` and `glass-panel`; leaves the two files for P4.

### P3. Dock (10 new pages, 8 old pages gone)

- Builds the ten pages in `ROUTES.md`, each with one live dock in a `tall` stage with the stage's
  own field, on today's documented props and slots.
- Deletes all eight old pages and `overview.tile.vue`.
- Extra checks: every dock on every page and card a full pill at rest, open, and at 390; one field
  per page and no text on it; each collapsing dock folds and opens with a start and a stop; on
  `/dock/chrome` the dock stays open while each of its menus is open; on `/dock/figure-tools` a
  pointer sweep across the three docks opens none; `/dock` is ten cards, each a live dock, and
  words on that page are the lede and ten titles.
- If a composition cannot be built on today's surface without a selector or a private property,
  the packet builds the nearest honest variant and records the gap against F8.

### P4. Foundations (6 pages)

- Paper & Glass absorbs the tier ladder from the two substrate files (then deletes them) and shows
  the bare plate as one row. Its five tiers are five plates across the full stage width, keyed to
  the stage, each caption one line.
- Colors absorbs the tint scale and the chart palette as a three-way switch.
- Removes the rows for `motion` and `overlays-scrims` (files left for P11 and P6); deletes
  `intro.vue`, `css-utilities.vue`, `paper-texture.vue`, `surface-tints.vue`,
  `chart-palette.vue`.
- Extra check on `/foundations/paper-glass`: no text run is clipped by its plate, no caption wraps
  to one word per line, at 1440 and at 390.

### P5. Display (6 pages)

- Buttons is P1's reference page; P5 checks it and finishes the section.
- Atoms shows its four parts together in one stage; `separator.vue`, `status-dot.vue`,
  `dark-mode-toggle.vue` and `data/avatar.vue` become four rows of that stage and the files go.
- Records F4a and F4b against the Buttons page rather than recolouring.

### P6. Containers (9 pages)

- Overlays: the stage holds the trigger; Popover, Menu and Tooltip are open on load where that
  takes no focus.
- Dialog takes the scrim switch from `foundations/overlays-scrims.vue`; Command takes the ranked,
  highlighted list from `data/search.vue`; both source files are then deleted.
- Deletes `context-menu.vue`, `hover-card.vue`, `hover-popover.vue`, `collapsible.vue` after
  folding each into its target's switch.
- The Configurator page is P1's reference page; P6 checks it and leaves it.
- Extra check: with each overlay open, its plate's corners and its words' contrast are measured
  and reported.

### P7. Forms (9 pages, one new)

- Adds `/forms/select`; `label.vue` folds into Labeled Field; the family tabs leave Inputs.
- Inputs takes the invalid state from `compositions/form-validation.vue`, then deletes it.

### P8. Navigation (4 pages)

- ToC Tracking's column becomes Skeleton blocks; Carousel's slide labels under quiet glass go.

### P9. Data (6 pages)

- Deletes `virtual-section.vue` and `demo/composables/virtual/` if nothing else reads it. Removes
  the row for `search` and leaves the file for P6.
- Infinite Scroll scrolls inside its stage, not the page.

### P10. Feedback (4 pages)

- Toast's stage is the buttons that raise real toasts; `toaster.vue` goes.

### P11. Motion (5 pages)

- Springs is an editor page and absorbs Motion Lab and `foundations/motion.vue` as presets; both
  files are then deleted.
- Deck's strip no longer overflows sideways at 390.

### P12. Compositions (3 pages)

- Deletes `chassis.vue`; removes the row for `form-validation` and leaves the file for P7.
- `demo/examples/` keeps only files a snippet still imports.
- Auth Shell's words move off its brand field.

---

## P13. Close

Files: the old scaffolding nothing uses any more: `demo/chassis/section/StorySection.vue`,
`showcase/ShowcaseFrame.vue`, `showcase/TokenLadder.vue`, `family/`, `body/`, `play/`,
`field/LabeledSelect.vue` if unused, the default-slot path in `StoryPage.vue`, the cel-field rules
in `layout.css`, whatever is left of `hero/story-hero.css` that no landing reads, and the
transitional title-only card in `storyTile.ts`.

Acceptance, on all 78 routes in all three cells:

1. The page checklist (or the editor checklist) passes on every component page; a table of 78 rows
   is in the record.
2. Totals against TABLE.md's counts: pages where prose leads the first screen 0 (was 50); pages
   with no live component in the first screen 0 (was 13); docks not a full pill 0 in the demo's
   own markup, any remaining listed against F1 (was 14); routes with a duplicate stage, heading or
   paragraph 0 (was 6); routes with a console error 0 (was 1); routes overflowing sideways at 390
   0 (was 2); dark cold loads with a near-black frame 0 of 78 (was 92 of 92).
3. Cards: every card on `/` and the eleven section pages shows a live component; zero `img`; zero
   title-only cards.
4. Low-contrast runs in text the demo authored: 0 in dark and in light. Runs inside library
   components: counted and filed by `LIBRARY-FAULTS.md` row.
5. The retired paths (25 routes) answer with the 404 page.
6. `grep` over `demo/` finds no `shape="rounded"`, no `shape="card"`, no `.dock-` selector, no
   `--dock-` property outside the one marked pager-dock rule, no `vizPreviewStill`, no
   `FamilyTabs`, no `StorySection`.
7. `npm run typecheck` and `npm test` pass; `tests-visual/` baselines for retired routes are
   removed and the rest re-banked in one commit of their own.
8. One WebKit pass (`guarded --exclusive webkit`) on `/`, `/substrates/aurora`, `/dock/chrome`,
   `/display/buttons`: renders, no console error, both shell docks fold. Playwright WebKit and
   Safari are recorded as separate cells; neither stands for the other.

## Not in this rebuild

The library cures in `LIBRARY-FAULTS.md` are separate work on the library's release branches: the
patch (F1 to F5) and 11.2.0 (F6 to F11). No demo packet waits for them. When each ships, the
reviewing seat re-runs the checker in light and removes the matching exceptions from the records,
and the pager dock's tier rule is deleted with F6.
