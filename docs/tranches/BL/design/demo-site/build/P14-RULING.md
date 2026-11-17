# P14, the ruling

Seat: claude-fable-5-2, 2026-11-16. Read against master `b0e430b9c` (the demo merged as `b4d29361a`). Nothing was built and no browser was run: every number below is a target for the building seat and a check for the reviewing one.

P14 changes `demo/` and the demo's checker (`docs/tranches/BL/driver/demo-site/`). Nothing under `src/` changes; the library's rows are listed at the end.

Sources: `OWNER-ORDER.md`, `FORM.md`, `P13.md`, `P13-webkit.md`, INBOUND O-390, the contact sheets under `shots/P13/contact/`, the crops under `shots/P13/sweep/` and the WebKit frames under `shots/P13/webkit/`.

## 1. The dock stages

**What is wrong.** `ScenePane.vue` is an empty block at 8 % ink (`demo/stories/dock/_parts/ScenePane.vue:13-20`). Six stages mount it: nav, chrome, rail, transport, pager and corner-controls. Their six cards on `/dock` and the Dock card on `/` mount the same stage files, so they show the same empty block (`contact-dock-d1440.png`, `contact-home-1440.png`). The four pages that read as an app already hold real content: Figure Tools, Dial Bar, Action Row (a library Card with content) and Canvas Tools (the field is its canvas). They do not change.

**The rule.** A context is the thing the dock acts on, and it answers the dock. It is a library `Card` (the one `action-row.stage.vue:16` and `figure-tools.stage.vue:25` already use) holding a title, a figure, or both. It holds no sentence: titles and row labels are names of at most two words, taken from the dock's own seats where the dock has them. Every change the dock causes in it is tweened.

`ScenePane.vue` is deleted. `ScenePage.vue` replaces it: a `Card` with an optional `CardTitle` and a body slot, in the same two shapes (column, 16:9 figure).

| Stage | Context | What the dock does to it |
|---|---|---|
| `/dock/nav` | column: a title and a bar figure (`MiniBars`) | the title is the current tab's label (Home, Reports, People, Settings) and cross-fades; each page has its own values, so the bars tween |
| `/dock/rail` | column: a title and a bar figure | the same, keyed to the current section (Overview, Regions, Schools, Growth, Notes) |
| `/dock/chrome` | column: a document, titled "Trip plan", with three rows: "Flights", "Lodging", "Budget" | the Page face's zoom sets the document's type size, tweened; the App face leaves it alone |
| `/dock/transport` | figure: a bar figure with a playhead | bars past the current time sit at reduced opacity; Play advances the playhead, Reset returns it |
| `/dock/pager` | figure: one slide | Dots: the slide shows its page number in the display face. Steps: it shows the step's name (Account, Plan, Payment, Review). Both cross-fade on a change |
| `/dock/corner-controls` | figure: a bar figure | Shuffle reorders the bars; with several actions, Undo restores the last order |

`MiniBars.vue` gains one prop, `played` (0 to 1), for the transport's playhead. Nothing else is added to it.

**Independence from the dock's geometry.** The 11.2.0 redesign will change the dock's size, fold and faces, so a context may read the dock's state (which tab, which page, the time) and never its box.

- `DockScene.vue` keeps `place` and one clearance per edge, written as a scene token (`--scene-clear`, 5rem; 6rem at the start edge). The comment at `DockScene.vue:58` that ties it to a 56 px run is cut. A dock that outgrows the clearance overlaps the Card, as a floating dock overlaps a page.
- No context is sized, aligned or shaped to the dock. The dock and the context stay in one grid area, so a fold never moves the context.

**Also in this file set.** `nav.stage.vue:80-87` holds a second `<style scoped>` block inside the template, a paste of the block at `:95-102`. Delete it.

**Files.** `demo/stories/dock/_parts/ScenePane.vue` (deleted), `_parts/ScenePage.vue` (new), `_parts/DockScene.vue`, `_parts/MiniBars.vue`, and the six stage files: `nav`, `chrome`, `rail`, `transport`, `pager`, `corner-controls` (`.stage.vue`). No page file, route row or lede changes.

**Witness.**

1. `rg -c "ScenePane" demo/` returns nothing. The checker gains a line, D1: on each of the six routes, `.scene-context` holds a `[data-slot="card"]` with at least one visible text run or one `[role="img"]`, in all three cells.
2. D2, the dock answers: after a press on a second tab (nav, rail), Next (pager), Play for two seconds (transport) and Shuffle (corner-controls), the context's text or its bar heights differ from the reading before the press, and the sampled frames show a start and a stop (FORM line 15).
3. D3, independence: the context's rect is equal, to the pixel, with the dock open, with it folded (chrome, rail), and with the dock's element set to `display: none`.
4. Context ink, by pixel reading over the field: each title at 4.5:1 or better in dark and in light. A fail is reported against the library's Card over a field; the demo paints no plate of its own to pass it.
5. Crops: the six routes in three cells, plus `contact-dock-1440.png`, `contact-dock-m390.png` and `contact-home-1440.png` retaken. Zero empty rectangles in any card.
6. The sweep's hover-shift read on the six routes shows no new moving box inside `.scene-context`.

## 2. Dialog, Sheet and Menu

**What is wrong.** Each gives a 504 px stage to one trigger (`contact-containers-d1440.png`). The component is the surface, and the first screen does not show it. Two switches change only the closed surface (Scrim, Edge, Detents: P13 section 4), so a press on them shows nothing.

**The library's limit.** A dialog's plate is fixed to the viewport and portalled to the body (`src/components/dialog/DialogContent.vue:182`), so on master it cannot sit inside the stage. The demo does not fake one with a look-alike plate.

**The rule.**

- **Dialog and Sheet open on arrival.** The page passes `default-open` (the stage gains `openOnLoad`, the prop Popover's stage already has; a card passes nothing and stays closed). The surface opens as it does from its trigger: modal, with its scrim, taking focus. Escape, the scrim (where the dismissal allows it) and the footer close it, and focus returns to the trigger.
- **A switch press reopens it.** Changing Dismissal, Scrim, Edge or Detents opens the surface in the new value, so every option shows its effect.
- **The stage is `fit`, not `tall`.** Closed, the page is the header, a 16rem stage (14rem at 390) with the trigger, and the switches. `ROUTES.md:120-121` change to `fit`.
- **Menu follows Popover.** The dropdown opens on arrival without taking focus (`popover.stage.vue:25` is the model), below its trigger, inside the space the stage already reserves (`dropdown-menu.stage.vue:53`). The stage stays `tall`. The Context option stays closed: it opens where the pointer is.

**Files.** `demo/stories/containers/dialog.stage.vue`, `dialog.vue`, `sheet.stage.vue`, `sheet.vue`, `dropdown-menu.stage.vue`, `dropdown-menu.vue`; `docs/tranches/BL/design/demo-site/ROUTES.md` (two size cells); `driver/demo-site/check.mjs` and `sweep.mjs` (an arrival step: read the open surface, close it, then run the page lines).

**Witness.**

1. On arrival, in three cells: `/containers/dialog` and `/containers/sheet` each show exactly one `[role="dialog"]` with `data-state="open"`; `/containers/dropdown-menu` shows one `[role="menu"]` whose rect is inside the stage's rect and `document.activeElement` is not inside it.
2. After Escape: zero open surfaces, focus on the trigger, and FORM lines 3 and 4 pass at `fit` (stage 25 % of the viewport at 1440, 24 % at 390).
3. Each switch option, pressed with the surface closed, leaves exactly one open surface carrying the new value (the scrim's computed colour, the sheet's edge, the detent rung).
4. The cards on `/containers` mount zero open surfaces.
5. Crops with `-arrival` for the three routes in three cells.

**What this exposes.** In light, the Dialog and Sheet footer's quiet Cancel reads 1.25:1 and the plate's text 3.2 to 3.5:1 (O-390 e). Opening on arrival puts that in the first screen. The demo does not swap the button's emphasis to hide it; the release row is listed below as the one to take first.

## 3. The Fourier field where the renderer is missing

**The rule.** The field already reports its renderer (`FourierField.vue:24`, `rendererStatus`). When the status reaches `phase: "error"`, `fourier-field.stage.vue` shows one sentence, centred in the stage, in `--foreground` on the stage's own plate, fading in on the library's normal duration:

> This browser cannot draw the Fourier field.

- It is text with `role="status"`: no icon, no plate, no drawing, no link.
- It lives in the stage file, so the page and both cards (`/substrates`, `/`) show it from one place.
- The page hides its pause control while the notice shows; nothing is running to pause.
- The sentence does not name the renderer: FORM line 10 bans those words on the site.
- The demo does not test for the renderer itself. If the error phase does not arrive on master where the renderer is absent, the notice waits for the library's row (O-390 c) and P14 records the phase it saw.

**Files.** `demo/stories/substrates/fourier-field.stage.vue`, `fourier-field.vue` (the pause control).

**Witness.**

1. Chromium with `navigator.gpu` removed by an init script, and Playwright WebKit (one cell, 1440 light, through `guarded --exclusive webkit`): the stage on `/substrates/fourier-field` and the Fourier card on `/substrates` each hold one `[role="status"]` whose text is the sentence, at 4.5:1 or better, and zero pause controls.
2. Chromium on the GPU lane: zero `[role="status"]` in the stage, the field drawing as in `contact-substrates-d1440.png`.
3. C1 (one live canvas) and FORM line 10 still pass on both routes.

## 4. The Fourier Field lede at 390

**The rule.** The lede becomes "Draws a curve by summing rotating circles." (seven words, 42 characters against the 52 that needed 398 px). The editor form keeps its one-line lede.

The checker gains a line, T1: on every route, `p.story-header-lede` has `scrollWidth ≤ clientWidth`. P13's checker had no such line, which is why the cut passed.

**Files.** `demo/stories/substrates/routes.ts:13`; `driver/demo-site/check.mjs`.

**Witness.** T1 passes on 78 routes in three cells, and fails on a planted 60-character lede on `/substrates/aurora` at 390.

## 5. The small defects

| # | Defect | Ruling | Files | Witness |
|---|---|---|---|---|
| a | Metric's Layouts row stacks a cell over two ledger rows (`data_metric-d1440.png`) | The cell and the ledger sit side by side, top edges aligned, wrapping only when the row is narrower than both. The ledger takes a fixed 14rem width in place of a minimum | `demo/stories/data/metric.vue` | at 1440 the row's two children share one top (within 1 px) and the row is one line tall; crop |
| b | Jitter shows a dash | Jitter gets a value (`3.2` ms). The stage shows four numbers; the empty state is not this page's subject | `demo/stories/data/metric.stage.vue` | the stage's text holds no "—" |
| c | Paper & Glass's Bare plate row | The row is deleted, with its two docks and their imports. The page keeps Ground and Grain | `demo/stories/foundations/paper-glass.vue:44-52` | two variant rows; the checker's dock line counts zero docks inside the article; the page's word count falls by seven |
| d | Radii tiles nearly invisible in dark (`foundations_radii-d1440.png`) | The tile is a filled shape, not a floating Surface on a plate of the same tone: one fill mixed from `--foreground`, no border. The fill reads 3:1 or better against the stage plate in dark and in light | `demo/stories/foundations/radii.stage.vue` | pixel reading, tile centre against the plate beside it, both themes, 1440 and 390: ≥ 3:1; crop |
| e | Editor layer headings about 26 px beside 13 px rows | **Library.** The size is the library's default (`src/styles/tokens/sizing-config.css:40`). The demo sets no override: the Configurator's own page would then show a size the library does not ship | none in `demo/` | listed below |
| f | Table's lede promises a caption and totals | Two changes. The stage becomes `fit`, so the total row and the caption are no longer cut by the 504 px box (`data_table-m390.png` shows neither). The lede becomes "Lays data out in rows and columns." | `demo/stories/data/table.vue:27`, `routes.ts:10`, `ROUTES.md:193` | the caption's and the total row's rects are inside the stage's rect in three cells; FORM line 4 passes at `fit` |
| g | A dark mark on the left edge of each preset chip (`substrates_aurora-d1440.png`) | **Library.** The demo passes `presets` and nothing else (`StoryEditor.vue:33`); the chips are the Configurator's own | none in `demo/` | listed below |
| h | Buttons' States row ends in a bare "…" | The icon-only button leaves States: it is a form, not a state. A third row, "Icon only", shows one glyph at primary, secondary and quiet emphasis, so the plates make them read as buttons | `demo/stories/display/buttons.vue` | States holds three buttons; "Icon only" holds three, each with an `aria-label`; three variant rows; the route's word budget still passes |

## 6. P13.md's record

Two places in `build/P13.md` no longer say what is true.

- **The verdict.** It reads "NOT READY to merge". Replace its first paragraph with: "**Merged.** The close returned not ready on one gate, export reach. `e7c0be688` cured it on `bl/demo` (the unused stroke rungs deleted, the shell-field selector kept module-local; gate 15 of 15), and the branch merged to master as `b4d29361a`." The list under it stands.
- **Point 2.** The row says the navigation dock is pinned open. Both docks fold: the rail is `collapse="open"` with `expand-on="hover"` (`demo/shell/SidebarDock.vue:59`) and the pager is `collapse="closed"`, opening on hover or on a press (`demo/shell/BottomDock.vue:74`); only the rail inside the phone's sheet is pinned (`BottomDock.vue:115`). The fold was measured in P0 (`build/readings/shell.log`: the rail 653 to 58 px over 31 moving frames, largest step 0.113 of the travel). The row's verdict becomes "**cured in the demo; library fault remains (release)**: the dock grows on hover (F8, 11.2.0)". The closing paragraph's "points 2, 8 and 13 stay not cured" becomes "points 8 and 13".

`FORMATION-PROGRESS.md`'s 15:25 line repeats the old count (2, 8, 13 waiting). The orchestrator owns that file; its next cursor line should carry the correction.

**Files.** `docs/tranches/BL/design/demo-site/build/P13.md`.

**Witness.** `rg -n "NOT READY|pinned open because" build/P13.md` returns nothing; the point-2 row cites both file lines.

## The library's rows

None of these is built in P14.

| Row | What | Where | Booked |
|---|---|---|---|
| L-P14-1 | The preset chips in the Configurator's preset row carry a dark mark on their left edge in dark (item 5g) | `src/components/configurator/` (the preset row) | **new**; for the release scope |
| L-P13-1 | The layer heading's default size, 25.9 px over 13 to 14 px rows (item 5e). The token's own note names the next rung down, 20.4 px | `src/styles/tokens/sizing-config.css:40` | listed in P13; the size is the owner's to confirm |
| O-390 e | Light Dialog and Sheet ink: the quiet Cancel 1.25:1, plate text 3.2 to 3.5:1. Item 2 puts it in the first screen, so it is the row to take first | Dialog, Sheet, Button | booked, 11.1.2 |
| O-390 c | The Fourier field says so when its renderer is missing. Item 3 rides the event that exists; the attribute is still the library's | `src/components/fourier-field/` | booked, 11.1.2 |
| L-P14-2 | A dialog or sheet cannot be shown inside a container: the plate is fixed to the viewport and portalled to the body. With a contained form, a page could show the surface in its stage without a modal on arrival | `src/components/dialog/DialogContent.vue:182`, `sheet/SheetContent.vue` | **new**; a question for 11.2.0, not a fault |
| F8, O-386, O-387 | The dock's growth on hover and the redesign | dock | booked, 11.2.0; item 1 does not wait for it |
| O-390 a, b | The Blob's shadow token (the WebKit crash in dark) | `tokens/shadow.css:108-109` | booked, 11.1.2; outside P14 |

## Not ruled here

- The Dialog, Sheet, Popover and Menu cards on `/containers` show a lone trigger. FORM allows an overlay its own tile; nobody asked, and item 2 leaves the cards closed.
- Canvas Tools shows a dock over a bare field. Its field is its canvas (P13 section 5); it was not in the residue.

## Copy added, and the lint

Every string P14 puts on the site:

- "This browser cannot draw the Fourier field."
- "Draws a curve by summing rotating circles."
- "Lays data out in rows and columns."
- "Icon only"
- "Trip plan", "Flights", "Lodging", "Budget", "Account", "Plan", "Payment", "Review"

`rg -P -i -f docs/tranches/BL/driver/register-lint.pattern` over these lines: no hits. The building seat runs the same lint over its copy diff before the merge.

## Order

1. Items 4, 5 (a, b, c, d, f, h) and 6: small, independent.
2. Item 3.
3. Item 1: the shared part first, then the six stages.
4. Item 2 last: it changes the checker's and the sweep's arrival step for three routes.

Then the whole-site checker and sweep in three cells, as P13 ran them, with D1 to D3 and T1 added.
