# P14, the verify

Seat: claude-opus-5-5 (asserted from the seat's own identity; Fable is out of quota until 2026-11-21, so this verify runs on Opus by the orchestrator's standing ruling). 2026-11-17. Read only: no browser was run and nothing was changed except this file.

Read: `P14-RULING.md`, `P14.md` with its Close, the eleven commits `e7c0be688..8fb5b65a5` on `bl/demo` and their diffs, every contact sheet under `shots/P14/contact/`, the tip crops for each changed route (dock, containers with `-arrival`, Fourier with `-nogpu` and `-webkit`, table, metric, radii, buttons), `shots/P14/shift/`, `shots/P14/webkit/`, `tip/containers.txt`, the close run's `.p14/out/close/check-m390.txt`, and the P13 contact sheets and open-surface crops beside them. Judged against `OWNER-ORDER.md` and `FORM.md`.

## Verdict

**Merge.** No page is broken, empty or worse than P13 in a way the ruling did not accept. The dock section, the owner's sharpest complaint, now reads as docks acting on something. The one first-screen regression (light-mode Dialog and Sheet showing the library's faint ink on arrival) is the one the ruling chose to expose, and it is the library's row to take first.

## `src/`

Untouched. `git diff e7c0be688..8fb5b65a5 -- src/` is empty; all 28 changed files are under `demo/stories/`. `e7c0be688` is an ancestor of master and master carries no `src/` or `demo/` commit after it, so the merge brings only these demo files.

## Item by item

| # | Done as ruled | Reads better than P13 | Notes |
|---|---|---|---|
| 1 dock stages | yes | yes, clearly | See below |
| 2 Dialog, Sheet, Menu | yes | yes in dark; light carries the library's ink (accepted) | See below |
| 3 Fourier notice | yes | yes | One centred sentence at 9.5 to 13.2:1 in the stage, pause control gone (`tip/substrates_fourier-field-*-nogpu.png`, `-webkit.png`). A page-authored sentence inside the stage departs from FORM's stage rule; the ruling put it there, and an empty stage would be worse |
| 4 Fourier lede | yes | yes | One line at 390 (358/358); T1 fails on the planted lede, as it should |
| 5a Metric layouts | yes | yes | Cell and ledger side by side, tops level (`contact-data-d1440.png`) |
| 5b Jitter | yes | yes | Reads 3.2 ms; four numbers |
| 5c Paper & Glass | yes | yes | Two rows, 20 words from 27 |
| 5d Radii | yes | yes | Tiles visible in both themes; in light they read grey-brown on cream (3.7:1), legible if plain |
| 5e, 5g | library | — | No demo change, as ruled |
| 5f Table | yes | yes | Caption and total row inside the stage in all cells. The table now sits at content width (about 570 px at 1440) where P13 stretched it across 1285 px; that reads better. The caption sits about 12 px above the plate's bottom edge |
| 5h Buttons | yes | yes | "Icon only" row at primary, secondary, quiet. The quiet one has no plate at rest (the library's quiet emphasis has none), so the row still ends in a bare "…" glyph, now labelled and beside two plated siblings, matching the stage's Quiet column. The Close's lede cures FORM line 5 at 390 (prose 0.083 to 0.06) |
| 6 P13.md | yes | — | In the main checkout, unstaged; `rg -n "NOT READY\|pinned open because" build/P13.md` returns nothing |

### Item 1, the dock stages

Done as ruled: `ScenePane.vue` deleted, `ScenePage.vue` is a library `Card` with an optional cross-fading `CardTitle`, `MiniBars` gains only `played`, `DockScene` carries `--scene-clear` (5rem, 6rem at the start edge) and drops the 56 px comment, and the pasted `<style scoped>` inside `nav.stage.vue`'s template is gone (the real block at `:99` keeps `.seat-face`). The context is `aria-hidden`; no context reads the dock's box.

Against P13 (`shots/P13/contact/contact-dock-d1440.png`): the six empty 8 % blocks are now a titled bar figure (nav, rail), a "Trip plan" document (chrome), a playhead figure (transport), a numbered slide (pager) and a reorderable figure (corner controls). The `/dock` index and the Dock card on `/` show a dock beside a real thing in every card but one. At 390 every context fits its stage (`contact-dock-pages-m390.png`); the WebKit width fault was found and cured on the way.

Wireframe or clutter:

- **Canvas Tools** is still a bare field with a small dock in the corner, on its page and on its `/dock` card, where it reads as an empty tile. It was not ruled ("Not ruled here"), so it is unchanged from P13, not worse. It is now the weakest card on `/dock` and the obvious next item.
- **Sameness, not clutter.** Six of the eleven dock pages now show the same coral bar figure (nav, rail, figure tools, dial bar, transport, corner controls). No stage is cluttered (one Card, one dock each), but the index reads as a page of bar charts. Worth a look in the 11.2.0 dock pass.
- **App Chrome**'s Trip plan card is column height with three rows, so its lower half is empty. It reads as a document, not a wireframe.

Hover shift: nav, pager, corner controls 0; chrome 5 and rail 8 as at P13 (the library's dock, F8); transport 24 against 21, the three new ones being the playhead moving under playback the gate started. None of them is a layout shift the demo introduced.

### Item 2, Dialog, Sheet and Menu

Done as ruled: `openOnLoad` on the three stages, page passes it and cards do not; Dialog and Sheet bind `v-model:open` and reopen on each Dismissal, Scrim, Edge or Detents change (12 of 12 options open one surface carrying the value, in every cell, `tip/containers.txt`); a detented Sheet reopens at 0.4; Dialog and Sheet stages are `fit`; Menu opens on arrival inside the stage with focus left on the body. The library's menu is non-modal by default (`DropdownMenu.vue:30-36`), so the open Menu does not lock scroll or the page.

**Do Dialog and Sheet on arrival read as broken or intrusive?** Judged twice.

- *First judgment, as a first-time visitor in dark:* the page arrives with the dialog (or the right-edge sheet) open over a dimmed page, title and input crisp, × and Save clear (`tip/containers_dialog-d1440-arrival.png`, `containers_sheet-d1440-arrival.png`). It reads as the component the page is named for, shown large and first, which is what the owner asked for. Not broken. The × carries a focus ring on arrival because focus moved in without a pointer; that is correct behaviour and reads as emphasis, not a fault.
- *Second judgment, in light:* the page arrives under the library's dark scrim (alpha 0.5 of a near-black ink in both themes), so the whole first screen turns brown. The plate's words are faint (title about 3.2:1; the quiet Cancel at 1.28 to 1.53, nearly invisible), and the Dialog sits in the library's centre-weighted focus veil, which in light paints a dark, roughly 640 px square pool around the plate (`tip/containers_dialog-l1440-arrival.png`: luma about 70 inside the pool against about 125 beside it; source `dialog/ModalOverlay.vue:20-24`, `--glass-focus-veil-dim` at `tokens/glass.css:116`). It looks muddy. It is not broken: the dialog is legible, Save and × work, Escape and an outside press close it (the Free dismissal), and focus returns to the trigger. All of it is library paint the demo does not author, and the ruling accepted showing it. **Not a hold.**

P13's open-dialog crop in light shows the veil far fainter, but its plate is also much lighter (luma 108 against P14's 66), which suggests that crop caught the fade-in; P14's settled frame is the true look. The veil's light-mode pool is not named in O-390 e as written; it belongs in that row's scope.

Evidence gap: neither crop P14 took on these two routes shows the closed page at `fit`. Both the plain crop and the `-arrival` crop show the surface open, because `sweep.mjs:208` takes the plain crop before the arrival step closes it. The closed state is witnessed only by numbers (stage top 153 and 116 px, share 0.256 and 0.244). Those numbers pass, and the page is a 16rem stage holding one trigger, so this does not hold the merge; a closed-state crop should be in the next pass's sheet.

Minor: Menu's no-focus flag is one-shot (`dropdown-menu.stage.vue:20-25`), so switching to Context and back to Dropdown reopens the menu with focus taken into it, unlike Popover, which never takes focus on its opens. After Escape, Menu's "Options" button sits at the top of a 504 px stage with the space below empty; that is the price of fitting the open list, and at arrival the list fills it.

## Anything worse than P13

One respect, ruled and accepted: in light mode the first screen of `/containers/dialog` and `/containers/sheet` now shows the library's faint plate ink and, on Dialog, the focus veil's dark pool, where P13's first screen showed a closed stage and these appeared only after a press. Nothing else reads worse. The checker reads no failure on any route in any cell once the Close is counted, and the sweep's one failure (Command's switch height snap) and WebKit's one fault (`/substrates` dark crash at 390, W1) are P13's, unchanged.

## Copy and FORM limits

Every string on the site is on the ruling's list, plus the Close's lede. `rg -P -i -f driver/register-lint.pattern` over the 408 added lines of `git diff e7c0be688..8fb5b65a5 -- demo`: no hits. Ledes are one sentence each, 7 words or fewer; "Icon only" is two words; context titles and rows are two words at most; no banned word renders (the one `webgpu` hit is an import path). One soft note: "Commands at four emphases and two tones." no longer says which tones; the stage's two rows show them directly beneath, so it passes.

## Owed, not holding the merge

- `ROUTES.md` and `build/P13.md` edits sit unstaged in the main checkout; commit them with the merge. `ROUTES.md:115-116` still says Dialog and Sheet open on a press.
- The ruling's checker lines (T1, D1 to D3, the arrival step, the Locked close) live only in the untracked `.p14/check.mjs` and `.p14/sweep.mjs`. Until they are folded into `docs/tranches/BL/driver/demo-site/`, the driver on master will mis-read the three arrival routes (its overlay step presses a trigger the open modal covers) and will not run T1.
- Book into O-390 e: the light-mode focus-veil pool around a centred Dialog.
- Next demo items, unruled: Canvas Tools' bare card; the bar-figure sameness across six dock pages; a closed-state crop of Dialog and Sheet at `fit`.

## The library's rows

As P14 listed them, plus the veil note above under O-390 e. O-390 e is the row to take first: it is now the first thing a light-mode visitor sees on two pages.
