# atlas's 11.1.2 rows: root, cure, witness

atlas's rows of 2026-11-23 (INBOUND O-429) and its second note of 2026-11-24, as placed in
`driver/glass-11.1.1-scope.md` (the 2026-11-24 section): GL-6, GL-7, GL-8, GL-11, GL-12,
GL-13, GL-14, GL-17, GL-18, GL-5 (e) and the DataTable sort buttons. GL-16 joins the
overflow cure and is not here.

Read on `release/11.1.1` at `14506233e`. Its `src` and `tests` are unchanged since
`48ab5d94e` (`tools/BASE-SHA.txt`), where this seat began before the reboot of 2026-11-24.

**`cure.patch`** is one patch: 16 files, +303 −37 (14 in `src`, two unit tests). It applies
with `patch -p1` to a `git archive` of `release/11.1.1`, and that tree equals the cured
tree the witness read (`trees/green`), file for file. Read with phone-scroll's three
patches (`audit/phone-scroll/cure.patch`, `scrim.patch`, `detents.patch`): all four
apply with no offset and no fuzz with this patch first or last, and the four together
typecheck (`vue-tsc --noEmit -p tsconfig.src.json`). Nothing is committed anywhere.

| File | Row |
|---|---|
| `src/styles/print.css` (new), `src/styles/index.css` | GL-6 |
| `src/components/dark-mode-toggle/DarkModeToggle.vue`, `tests/components/dark-mode-toggle.contract.test.ts` | GL-7 |
| `src/components/popover/PopoverTrigger.vue` | GL-8 |
| `src/components/dialog/styles.css` | GL-11 |
| `src/components/_shared/overlay/modal-layers.ts` (new), `dialog/DialogContent.vue`, `dialog/ModalOverlay.vue`, `sheet/SheetContent.vue`, `expandable-container/ExpandableContainer.vue`, `tests/components/dialog/dialog-focus-return.test.ts` | GL-12 |
| `src/components/sheet/styles.css` | GL-13 |
| `src/components/select/SelectContent.vue` | GL-17 |
| `src/composables/motion/morph/useSelectionGroup.ts` | GL-18 |
| `src/components/data-table/styles.css` | the sort buttons |

GL-14 and GL-5 (e) held on 11.1.1 and change nothing. Of GL-11, the gutter and the scroll
position held. Of GL-12, the drawer's paint order, Escape and lock held; its focus did
not.

## 1. The rows

### GL-6, print

**Cause.** glass's only print rules hide the paper grain (`styles/paper.css:137`, `:175`).
Under print every surface keeps its glass. Read on 11.1.1 in both engines: the dock, a
popover, a tooltip and a toast all print; the card's background has alpha 0.14; eight
elements keep a backdrop filter and eight a shadow. An open Dialog or Sheet prints its
plate at alpha 0.18 over a scrim at alpha 0.5.

**Cure.** `styles/print.css`, imported last in `styles/index.css`, in a new last layer
`print` (the layer statement gains it). Under `@media print`:

- `--glass-level: 0`, the solid-card escape that reduced transparency already rides, so
  every surface resolves to its solid card; the grain's opacity 0; `--overlay-scrim`
  transparent.
- No element or pseudo-element keeps a `backdrop-filter`, a `box-shadow` or a
  `transition`. The transition goes because the overlay plates carry a discrete `display`
  transition, and a running transition outranks an important declaration.
- Hidden: `.glass-dock`, popover and hover-card content, tooltip content, toasts, menu and
  sub-menu content, the Select list, the Sheet's frost sampler (`glass-graded-halo`) and
  the focus veil.
- Dialog and Sheet plates are not hidden. They print flat where they stand.

The declarations are important and sit in the last layer, so they beat every normal rule
(unlayered and inline ones included) and lose only to an important rule a site writes in
an earlier layer or in a style attribute.

**Witness.** `print`, `print-dialog`, `print-sheet`: 1280×800, every surface open, read on
screen and again under `page.emulateMedia({ media: "print" })`.

### GL-7, the toggle's name

**Cause.** `dark-mode-toggle/DarkModeToggle.vue:29-30` sets a name that names the action
("Switch to dark mode", "Switch to light mode") and `aria-pressed` as well, so a reader
hears "Switch to light mode, pressed".

**Cure.** A fixed name, "Dark mode", and `aria-pressed`. The contract test reads the new
name.

**Witness.** `toggle`: the name and the pressed state before and after a click.

### GL-8, PopoverTrigger's `aria-controls`

**Cause.** reka's PopoverTrigger writes `aria-controls` from its root's `contentId` on
every render (`node_modules/reka-ui/dist/Popover/PopoverTrigger.js:38`): an empty value
before the first open, and after a close the id of a panel that is no longer in the page.
glass's trigger passes it through (`popover/PopoverTrigger.vue:43-51`).

**Cure.** The click arm renders reka's trigger `as-child` over glass's own `<button>`, or,
under `asChild`, over a `Slot` around the consumer's element, and that element states
`aria-controls` itself: the content's id while the popover is open, and nothing
otherwise. reka's merge lets the child's own props win. The attribute goes at the logical
close, while the panel may still be leaving, so the trigger never names a panel that is
not mounted. The hover arm (reka's HoverCardTrigger) is unchanged.

**Witness.** `popover` (glass's button) and `popover-child` (`as-child` over a glass
Button): the attribute closed, open and closed again, and whether its id resolves.

### GL-11, the Dialog body

**Cause.** The Dialog plate (`dialog/styles.css:21`) has no `overscroll-behavior`. Under a
modal Dialog the root lock holds the page (`dialog/ModalScrim.vue:20`), but a
`:modal="false"` Dialog takes no lock on 11.1.1, so wheel turns that reach the end of its
scrolled body scroll the page: 1200 px over four turns, in both engines.

The other two parts held on 11.1.1. The root's `scrollbar-gutter: stable`
(`styles/utilities/base-misc.css:201`, `:207`) keeps the layout still when the lock hides
the bar: with a 15 px classic bar in both engines, the content does not move (x 36 before
and while open). The page's scroll position stays at 1000 after a close by Escape, by the
close button and by a press on the scrim.

**Cure.** `overscroll-behavior: contain` on the Dialog plate. The Sheet half belongs to
phone-scroll's cure and is not duplicated. With that cure, a `:modal="false"` Dialog below
30rem also takes the root lock (`useOverlayOutside`); this rule is what holds the page
above that width, and on 11.1.1 alone at every width.

**Witness.** `dlg-scroll` (a 60-line body, both `modal` arms, the page at 1000, four wheel
turns of 300 over the plate) and `dlg-pos`. Chromium runs with its classic scrollbars
shown (the launch drops `--hide-scrollbars`); in WebKit the page styles the root's
`::-webkit-scrollbar`, which makes it a classic 15 px bar.

### GL-12, a Dialog over another surface

**Cause.** Three faults.

1. **Paint order.** Every modal plate stands on one rung, `--z-modal` 140
   (`dialog/DialogContent.vue:216`, `sheet/styles.css:34`,
   `expandable-container/styles.css:9`), and every scrim on `--z-overlay` 50
   (`dialog/ModalOverlay.vue:80`). So the top Dialog's scrim paints under the lower plate,
   and the lower surface stays undimmed beside the top Dialog. The plates order by their
   place in `body`, and a portal keeps the place its component mounted in: in atlas's
   pairing, where the top Dialog is declared before the Dialog that opens it, the top
   plate paints under the lower one.
2. **Escape.** ExpandableContainer registers a global Escape shortcut that collapses it
   whatever else is open (`expandable-container/ExpandableContainer.vue:228`). One Escape
   closed the top Dialog and the enlarged figure together, and the page lock went with
   them.
3. **Focus.** The close's focus handoff (`dialog/DialogContent.vue:132-150`,
   `sheet/SheetContent.vue:289-306`) runs at `flush: "sync"`, while reka's focus trap still
   holds the closing plate: the trap pulls the focus back in, the plate goes inert, and
   focus falls to `body`. It rests there through the top's exit in every cell but one
   (WebKit's enlarged figure), in both engines. Where it goes after the exit is not
   steady: in the reads below reka's close autofocus puts it back in the lower surface,
   but an earlier Chromium read on 11.1.1 (17:36, since overwritten by the current
   witness) left it on `body` in the Dialog and Sheet cells.

The drawer (a `:modal="false"` Sheet) stands below the dock (`sheet/styles.css:103`), so
the top Dialog's scrim already covered it; it takes no lock, and Escape already closed only
the top. Its focus rested on `body` through the exit, as above.

**Cure.**

- `_shared/overlay/modal-layers.ts`: the open modal layers in the order they opened. A
  modal Dialog and a modal Sheet take a place while their scrim is present (through the
  spring exit), and an ExpandableContainer while it is placed. The top layer keeps its
  rungs. Each layer's scrim stands two steps per layer above `--z-overlay`, and a covered
  layer's plate one step above its own scrim, so the top scrim dims every earlier layer
  and the order follows opening, not declaration. With one layer open nothing moves. A
  layer leaves when its scrim has gone, so the layer below takes its rung back only once
  nothing dims it. A covered Sheet's frost sampler stands with its scrim.
- `ModalOverlay` takes the layer's place as a prop. It is internal (not exported).
- ExpandableContainer's Escape yields when a later layer covers it, or when the key was
  pressed in a surface it does not contain. A popover or menu opened from the enlarged
  figure now takes Escape alone too. So does any element outside the figure that holds
  focus while it is enlarged (a dock seat beside it, say): Escape there no longer
  collapses the figure. Not read.
- The focus handoff runs at `flush: "post"`, after the render that lifts the trap, and
  also takes focus from `body`. The unit test's comment says so.

**Witness.** `stack-dialog`, `stack-sheet`, `stack-drawer` (the top Dialog declared inside
the lower surface), `stack-expand` (inside an enlarged ExpandableContainer) and
`stack-sibling` (atlas's pairing: the two Dialogs side by side, the top one first). Each
reads the paint order of the plates and of the top scrim over the lower plate, the root
lock, and focus 120 ms into the top's exit and after it has gone. Focus has to be in the
lower surface at both reads.

### GL-13, the full-height Sheet

**Cause.** A detented bottom Sheet's block size is its detent's fraction of `100dvh`,
capped at `100dvh` (`sheet/styles.css:550-571`). At detent [1] it fills the viewport, under
the status bar or the notch on a `viewport-fit=cover` page: top 0 with a 47 px top inset
(Chromium).

Phone-scroll's patches do not carry it (read: `ROOT.md`, `cure.patch`, `detents.patch`,
and `scrim.patch`). `detents.patch` is the drag hand-off (`sheet/detents/use.ts` and one
`onTouchmove` line in `SheetContent.vue`), `scrim.patch` the detented scrim's ramp
(`sheet/motion.ts`), and `cure.patch` changes `sheet/styles.css` only in a comment on the
non-modal band. None reads the safe area. So it is built here.

**Cure.** `max-block-size: calc(100dvh - env(safe-area-inset-top, 0px))` on the bottom
detented Sheet. With no inset it is the viewport's height, as before.

**Witness.** `sheet-full`: 390×844, touch, `detents="[1]"`. Chromium sets the insets
through CDP (`Emulation.setSafeAreaInsetsOverride`, top 47, bottom 34). WebKit has no
override, so its inset is 0: there the reading is the full height kept and the rule
present in the page's sheets, not the inset.

### GL-14, the small Button

Held on 11.1.1. `--control-h-sm` is `max(2.25rem × --ui-scale, --control-floor)`
(`tokens/sizing.css:27`) and the floor lifts to `--touch-target` under `(pointer: coarse)`
(`tokens/light-dark.css:17-20`). A `size="sm"` Button reads 36 px in a 1280 mouse context
and 44 px at 390 with touch, in both engines. No change.

**Witness.** `button`.

### GL-17, the Select's close

**Cause.** reka's SelectContent focuses the list itself when the pointer leaves a row
(`node_modules/reka-ui/dist/Select/SelectContentImpl.js:239-241`, `content.focus()`, no
`preventScroll`). After a pick the list leaves under a resting pointer or finger, so the
leaving list took focus without `preventScroll`: once per pointer pick in both engines,
and once per touch pick in Chromium. In this page the list was in view, so the page did
not move; on a list partly out of view the call scrolls it in.

**Cure.** The list is inert while it leaves, so neither it nor a row takes focus, and in
the next frame focus goes back to the trigger with `preventScroll` if it is still in the
list. The frame lets the key that picked the row finish first: a trigger focused under
that key would take its click.

**Witness.** `select`, the page at 1000. Three arms: keys open the list and pick (the
control, which held on 11.1.1); keys open it and a pointer picks a row and moves away;
and in Chromium only, a tap opens it and a tap picks. It counts the focus calls that moved
focus without `preventScroll` after the pick, and reads the page's scroll on every frame.
In WebKit a tap on the trigger hovers it, and a pointer resting on the Select trigger
aborts the Playwright WebKit page on 11.1.1 (the colour-mix crash, its own lane), so the
pointer jumps onto the row and then to a far corner, never crossing the trigger.

### GL-18, the selection group's reach

**Cause.** `composables/motion/morph/useSelectionGroup.ts:200` calls
`scrollIntoView({ inline: "nearest", block: "nearest" })`, which scrolls every scrolling
ancestor on both axes. Picking Option 7 in a strip inside its own horizontal run, inside
an outer vertical scroller half below the fold, moved the page 87 px and the outer
scroller 20 px, in both engines.

**Cure.** `revealInRun` scrolls only the item's nearest ancestor that scrolls along the
strip's axis, never the page's scroller or `body`, by the least distance that brings the
item into view, and keeps that run's `scroll-padding`.

**Witness.** `selgroup`: the page, the outer scroller and the run before and after the
pick.

### GL-5 (e) and the sort buttons

**Cause.** The header text held: 16 px at 1280, 14 px at 320 and at 390 with touch, in
both engines. The sort button (`.data-table-sort`, `data-table/styles.css:72-86`) has no
block size, so its target is its line of text: 22.4 px at 1280 and 19.6 px at 320 and at
390 with touch. Its focus ring is drawn 2 px outside it, where a sticky head that clips its
cells would cut it.

**Cure.** `min-block-size: max(2.25rem, var(--control-floor))`, 36 px on a fine pointer and
44 px on a coarse one, and under `:focus-visible` an `outline-offset` of
`-1 × --focus-ring-width`, which draws the ring inside the button.

**Witness.** `table`: a sortable three-column DataTable at 1280, at 320 and at 390 with
touch; the ring read at 1280 after keyboard focus (Tab in Chromium, Option-Tab in WebKit).

## 2. Readings

Playwright Chromium 149.0.7827.55 (headless shell) and Playwright WebKit 26.5, one browser
per run and a new context per cell, every context and the browser closed in `finally`.
Desktop cells 1280×800 at scale 1; phone cells 390×844 at scale 3 with `isMobile` and
`hasTouch`. The witness page (`tools/harness`) is built against each tree's own `src` with
the library's CSS targets (`tools/build.sh`) and served by the witness itself
(`tools/witness.mjs`). Every run went through the guard, the WebKit runs under
`--exclusive webkit`. `tools/judge.mjs` judges each cell by its row and wrote the two
tables below (`record/verdicts-*.md`); the readings are `record/{red,green}-{chromium,webkit}.json`.

Of 18 cells, 16 are RED on 11.1.1 and GREEN on the cure in each engine; `dlg-pos` and
`button` are GREEN on both, as the rows above say.

### Chromium 149.0.7827.55

| Cell | 11.1.1 | Reading | Cure | Reading |
|---|---|---|---|---|
| print | RED | printed: dock, popover, tooltip, toast; card alpha 0.14; frost 8, shadow 8 | GREEN | printed: none of the chrome; card alpha 1; frost 0, shadow 0 |
| print-dialog | RED | plate shown true, alpha 0.18; scrim alpha 0.5; frost 2, shadow 1 | GREEN | plate shown true, alpha 1; scrim alpha 0; frost 0, shadow 0 |
| print-sheet | RED | plate shown true, alpha 0.18; scrim alpha 0.5; frost 2, shadow 1 | GREEN | plate shown true, alpha 1; scrim alpha 0; frost 0, shadow 0 |
| toggle | RED | "Switch to dark mode" pressed false, then "Switch to light mode" pressed true | GREEN | "Dark mode" pressed false, then "Dark mode" pressed true |
| popover | RED | closed ""; open "reka-popover-content-v-2" (mounted); closed again "reka-popover-content-v-2" (gone) | GREEN | closed none; open "reka-popover-content-v-2" (mounted); closed again none |
| popover-child | RED | closed ""; open "reka-popover-content-v-2" (mounted); closed again "reka-popover-content-v-2" (gone) | GREEN | closed none; open "reka-popover-content-v-2" (mounted); closed again none |
| dlg-scroll | RED | page moved 1200 px (modal={false}) and 0 px (modal); overscroll auto; page bar 15 px, content shift 0 px | GREEN | page moved 0 px (modal={false}) and 0 px (modal); overscroll contain; page bar 15 px, content shift 0 px |
| dlg-pos | GREEN | scrollY 1000 before; 1000, 1000, 1000, 1000 (open, Escape, close button, scrim) | GREEN | scrollY 1000 before; 1000, 1000, 1000, 1000 (open, Escape, close button, scrim) |
| stack-dialog | RED | top plate over lower true, top scrim over lower false; after Escape top closed, lower open, lock hidden→hidden; focus in the lower, body during the exit | GREEN | top plate over lower true, top scrim over lower true; after Escape top closed, lower open, lock hidden→hidden; focus in the lower, in the lower during the exit |
| stack-sheet | RED | top plate over lower true, top scrim over lower false; after Escape top closed, lower open, lock hidden→hidden; focus in the lower, body during the exit | GREEN | top plate over lower true, top scrim over lower true; after Escape top closed, lower open, lock hidden→hidden; focus in the lower, in the lower during the exit |
| stack-drawer | RED | top plate over lower true, top scrim over lower true; after Escape top closed, lower open, lock visible→visible; focus in the lower, body during the exit | GREEN | top plate over lower true, top scrim over lower true; after Escape top closed, lower open, lock visible→visible; focus in the lower, in the lower during the exit |
| stack-expand | RED | top plate over lower true, top scrim over lower false; after Escape top closed, lower closed, lock hidden→visible; focus in the lower, body during the exit | GREEN | top plate over lower true, top scrim over lower true; after Escape top closed, lower open, lock hidden→hidden; focus in the lower, in the lower during the exit |
| stack-sibling | RED | top plate over lower false, top scrim over lower false; after Escape top closed, lower open, lock hidden→hidden; focus in the lower, body during the exit | GREEN | top plate over lower true, top scrim over lower true; after Escape top closed, lower open, lock hidden→hidden; focus in the lower, in the lower during the exit |
| button | GREEN | sm 36 px fine, 44 px coarse | GREEN | sm 36 px fine, 44 px coarse |
| select | RED | keys: 0 focus moves without preventScroll; pointer: 1 focus move without preventScroll; touch: 1 focus move without preventScroll | GREEN | keys: 0 focus moves without preventScroll; pointer: 0 focus moves without preventScroll; touch: 0 focus moves without preventScroll |
| selgroup | RED | page 0→87, outer 0→20, run 0→444 | GREEN | page 0→0, outer 0→0, run 0→444 |
| table | RED | header 16/14/14 px; sort 22.4/19.6/19.6 px (fine/narrow/coarse); ring offset 2, width 2 | GREEN | header 16/14/14 px; sort 36/36/44 px (fine/narrow/coarse); ring offset -2, width 2 |
| sheet-full | RED | inset 47 px; sheet top 0 px, bottom 844 of 844; rule reads the inset: false | GREEN | inset 47 px; sheet top 47 px, bottom 844 of 844; rule reads the inset: true |

Both Chromium reads are tonight's, with the current witness. The pre-reboot cured read
stopped at `stack-dialog` when the Mac slept (the browser closed under it), and the
11.1.1 read of 17:36 had no focus reading during the exit.

### Playwright WebKit 26.5

| Cell | 11.1.1 | Reading | Cure | Reading |
|---|---|---|---|---|
| print | RED | printed: dock, popover, tooltip, toast; card alpha 0.14; frost 8, shadow 8 | GREEN | printed: none of the chrome; card alpha 1; frost 0, shadow 0 |
| print-dialog | RED | plate shown true, alpha 0.18; scrim alpha 0.5; frost 2, shadow 1 | GREEN | plate shown true, alpha 1; scrim alpha 0; frost 0, shadow 0 |
| print-sheet | RED | plate shown true, alpha 0.18; scrim alpha 0.5; frost 2, shadow 1 | GREEN | plate shown true, alpha 1; scrim alpha 0; frost 0, shadow 0 |
| toggle | RED | "Switch to dark mode" pressed false, then "Switch to light mode" pressed true | GREEN | "Dark mode" pressed false, then "Dark mode" pressed true |
| popover | RED | closed ""; open "reka-popover-content-v-2" (mounted); closed again "reka-popover-content-v-2" (gone) | GREEN | closed none; open "reka-popover-content-v-2" (mounted); closed again none |
| popover-child | RED | closed ""; open "reka-popover-content-v-2" (mounted); closed again "reka-popover-content-v-2" (gone) | GREEN | closed none; open "reka-popover-content-v-2" (mounted); closed again none |
| dlg-scroll | RED | page moved 1200 px (modal={false}) and 0 px (modal); overscroll auto; page bar 15 px, content shift 0 px | GREEN | page moved 0 px (modal={false}) and 0 px (modal); overscroll contain; page bar 15 px, content shift 0 px |
| dlg-pos | GREEN | scrollY 1000 before; 1000, 1000, 1000, 1000 (open, Escape, close button, scrim) | GREEN | scrollY 1000 before; 1000, 1000, 1000, 1000 (open, Escape, close button, scrim) |
| stack-dialog | RED | top plate over lower true, top scrim over lower false; after Escape top closed, lower open, lock hidden→hidden; focus in the lower, body during the exit | GREEN | top plate over lower true, top scrim over lower true; after Escape top closed, lower open, lock hidden→hidden; focus in the lower, in the lower during the exit |
| stack-sheet | RED | top plate over lower true, top scrim over lower false; after Escape top closed, lower open, lock hidden→hidden; focus in the lower, body during the exit | GREEN | top plate over lower true, top scrim over lower true; after Escape top closed, lower open, lock hidden→hidden; focus in the lower, in the lower during the exit |
| stack-drawer | RED | top plate over lower true, top scrim over lower true; after Escape top closed, lower open, lock visible→visible; focus in the lower, body during the exit | GREEN | top plate over lower true, top scrim over lower true; after Escape top closed, lower open, lock visible→visible; focus in the lower, in the lower during the exit |
| stack-expand | RED | top plate over lower true, top scrim over lower false; after Escape top closed, lower closed, lock hidden→visible; focus in the lower, in the lower during the exit | GREEN | top plate over lower true, top scrim over lower true; after Escape top closed, lower open, lock hidden→hidden; focus in the lower, in the lower during the exit |
| stack-sibling | RED | top plate over lower false, top scrim over lower false; after Escape top closed, lower open, lock hidden→hidden; focus in the lower, body during the exit | GREEN | top plate over lower true, top scrim over lower true; after Escape top closed, lower open, lock hidden→hidden; focus in the lower, in the lower during the exit |
| button | GREEN | sm 36 px fine, 44 px coarse | GREEN | sm 36 px fine, 44 px coarse |
| select | RED | keys: 0 focus moves without preventScroll; pointer: 1 focus move without preventScroll | GREEN | keys: 0 focus moves without preventScroll; pointer: 0 focus moves without preventScroll |
| selgroup | RED | page 0→87, outer 0→20, run 0→444 | GREEN | page 0→0, outer 0→0, run 0→444 |
| table | RED | header 16/14/14 px; sort 22.4/19.6/19.6 px (fine/narrow/coarse); ring offset 2, width 2 | GREEN | header 16/14/14 px; sort 36/36/44 px (fine/narrow/coarse); ring offset -2, width 2 |
| sheet-full | RED | inset 0 px; sheet top 0 px, bottom 844 of 844; rule reads the inset: false | GREEN | inset 0 px; sheet top 0 px, bottom 844 of 844; rule reads the inset: true |

In the full WebKit run on the cure, `dlg-scroll` timed out loading its page (15 s, with the
machine's load near 40). It was read again alone, twice, and both reads agree; the first
is the cell above, and the timed-out read and the second are kept under `reruns` in
`record/green-webkit.json`. The 11.1.1 WebKit read was taken again tonight with the current
witness: the read of 13:42 had no `popover-child` or `stack-sibling` cell and no classic
bar.

The `select` keys arm picks Section B in some reads and Section C in others, on both trees
(two of four repeated Chromium reads on 11.1.1 picked B). The arm is the control for the
focus count, which reads 0 in every read.

### The library, the types and the unit tests

- **Library build.** `vite build` on the cured tree passes. `dist/styles/index.css` declares
  `@layer …, reduced-motion, print` and imports `print.css` last; `dist/styles/print.css`
  carries the print rules (553 B). The Sheet's inset cap, the Dialog's `contain` and the
  sort button's rules ship in their sheets.
- **Types.** `vue-tsc --noEmit -p tsconfig.src.json` passes on the cured tree, and on the
  tree with phone-scroll's three patches as well.
- **Unit and gate tests**, `vitest run --maxWorkers=2` over `tests/components/dialog`,
  `sheet`, `select`, the Select, Popover, ExpandableContainer, DarkModeToggle and Table
  contracts, `tests/components/ui/data-table`, `tests/composables/motion`, `tests/gates`,
  `tests/styles`, `public-surface.spec.ts` and `lifecycle-cleanup.spec.ts`, on both trees.
  No test fails on the cure that passes on 11.1.1. Every test that fails on either tree
  reads a file a sparse archive does not hold (`docs/`, `README.md`, a built demo) or a
  `dist/` that only the cured tree had built; `gate-register.test.ts`, which ran only in
  the cured tree's batch, fails the same 22 tests on 11.1.1 when run alone, on a missing
  `docs/` file.

## 3. What was not run

- **Real print.** The witness emulates print media and reads computed styles. Nothing was
  paginated or sent to a printer or a PDF. Chromium repeats a `position: fixed` box on each
  printed page, so a Dialog that prints flat where it stands may repeat on a long page;
  not read.
- **Menus and Select lists under print.** The rule hides them; no cell opens one.
- **Safe areas on a device.** WebKit has no inset override, so GL-13 in WebKit reads the
  rule and the height kept, not the inset. No iPhone was used.
- **More of GL-12.** A Sheet over a Dialog, three layers, a popover opened from a covered
  layer, and Escape pressed during the top layer's exit (the lower layer yields until the
  top's scrim has gone) were not read.
- **GL-17 where the page would move.** The witness reads the focus call and its
  `preventScroll`; its page did not move on 11.1.1 either. The touch arm runs in Chromium
  only.
- **GL-8's hover arm.** Unchanged and not read.
- **The combined 11.1.2 tree.** With phone-scroll's patches it applies and typechecks; no
  browser read it.
- **Firefox**, the full unit suite, and the comment-ratio gate (its census needs the git
  index, so it reads 0 lines in an archive on both trees).
- **The final comment.** After the readings, one CSS comment in `dialog/styles.css` was
  reworded; the cured tree the witness read differs from `cure.patch` in nothing else.

## 4. Files

- `cure.patch`: the patch against `release/11.1.1`.
- `NOTE-atlas.md`: the note for atlas.
- `tools/`: the witness page (`harness/`), `build.sh`, `witness.mjs`, `judge.mjs`, and
  `dbg.mjs`, `dbg-print.mjs`, `dbg-stack.mjs` (the debug reads the first attempt used to
  find the print and focus causes).
- `record/`: the readings, the verdict tables, the run logs and the unit test comparison
  (`unit-tests.txt`).
