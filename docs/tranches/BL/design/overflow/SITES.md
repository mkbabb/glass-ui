# Sideways overflow: notes for atlas and value.js

Two notes, ready to send. Each says what glass 11.1.2 changes, how to run the check on your own pages, and the page patterns that made boxes run sideways in our readings. The check is `check-overflow.mjs`, next to this file.

---

## To atlas

Hello atlas,

The owner saw your Filters view scroll sideways on his phone and asked us to find every place a glass part can do that. Here is what we found for your drawer, what glass 11.1.2 changes, and what we would like you to check on your side.

**Your drawer.** The body (`.cp-drawer__body` in `FilterPanel.vue`) is `overflow-y: auto`, and a box that scrolls on one axis scrolls on the other too: any row wider than the body lets the whole drawer pan sideways. We built your drawer from your source on `glass-10.1` (069708a): the right-hand non-modal sheet, your body and options-band CSS as written, and the three kinds of row in `VizOptionsBand.vue`, a ToggleGroup, a Select and a Switch, with your classes on them. In Chromium at 390×844 with touch, and at 1440×900:

- Three options of about 30 characters each fit the 235 px field on the phone width, and nothing panned.
- One option of 50 characters did not: the toggle item kept its label on one line at 307 px, and a sideways swipe moved the body 56 px (32 px at 1440).
- The cause is in glass: a toggle item had no cap on its width. 11.1.2 caps it at its row, so a long option wraps between words and the body stays put. With that build the same 50-character option sat on two lines and the body did not move.

**What 11.1.2 changes for you.**

- A toggle item is never wider than its row; a long label wraps between words.
- A word longer than its line (a file name, an id, a long measure code) breaks where the line ends in menus, Select options and the Select trigger, Command rows, Accordion triggers, Popovers, Tooltips, Dialogs, Sheets and Toasts, and in a Label. A Select trigger's value that is too long ends in an ellipsis.
- A Sheet's rows, a Dialog's rows and a Toast's text lay out at the plate's width instead of at their widest child's.
- A tooltip is never wider than a menu.
- A segmented tab strip with more tabs than room pans its own tabs sideways, the way a dock run does; the page around it no longer moves.
- A Timeline's end marks stay inside the Timeline.

Nothing in 11.1.2 hides an overflow with `overflow-x: hidden` or `clip`.

**What we could not see.** Your real option labels come from each view's data, so we cannot say which views had one long enough. We did not load your pages, the drawer's other bands (the selection-set pane, the year scrubber, the foot), dark mode on your site, Safari or an iPhone.

**What we would like you to do.**

1. After you take 11.1.2, run the check on the routes that have the Filters drawer, with the drawer open, at phone width in dark and at desktop width in dark (the command is below).
2. Send us any reading that names a glass part (a `data-slot`, or a class starting `glass-`, `segmented-`, `toggle-group`, `dock-`), with the page and the cell it came from.
3. Please do not add `overflow-x: hidden` to the drawer body. It would hide a row that is too wide instead of fitting it, and the next too-wide row would be cut off without anyone seeing it.

**The check, on your drawer.** Start your dev server, then from atlas's root (it needs your installed Playwright):

```sh
~/.claude/guard/guarded --timeout 30 -- node /Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/overflow/check-overflow.mjs \
    --url http://127.0.0.1:5173/<a route with the drawer> \
    --click '[data-testid=dock-filter-pullout]' \
    --cells 390t-dark,1440-dark
```

It prints one line per fault with the boxes that run past their edge, and exits 1 if it finds any. Add `--engine webkit` (and run it under `guarded --exclusive webkit`) for Playwright's WebKit, which is close to Safari but not Safari; swipes run in Chromium only.

**Page patterns to avoid.** These made boxes run sideways in our readings; each has a fix that keeps the box right rather than hiding it.

- A grid with one implicit column (`display: grid` and no `grid-template-columns`) around text or a control. Its column grows to its widest child. Give it `grid-template-columns: minmax(0, 1fr)` (Tailwind `grid-cols-1`); for several columns, `repeat(n, minmax(0, 1fr))` rather than `repeat(n, auto)`.
- A flex item holding a long name, with no `min-inline-size: 0`. It will not shrink below its longest word. Add `min-inline-size: 0` (`min-w-0`) and let the text break.
- A fixed width that can be wider than its parent (a 288 px box in a 240 px column). Use `inline-size: min(100%, 288px)`.
- `flex: none` or `shrink-0` on a wrapper whose content sizes itself. Let it shrink, or give it `max-inline-size: 100%`.
- One long unbroken value (a file name, an id, a URL) as the label of a Button, Chip or toggle item. These keep every word whole, so a value wider than its container runs out of them. Put such a value in a field, a Select, a menu row, a Popover or plain text, where 11.1.2 breaks it.
- A vertical scroller with no side padding around full-width selectable Chips. A selected Chip is drawn slightly larger than its box, and an unpadded scroller pans by the difference (11 px in a 300 px box). Your drawer's 1rem of padding already absorbs it.
- `overflow-x: hidden`, `overflow: hidden` or `clip` on a box to stop a child that is too wide. Find the child and fix its bound instead.

Thank you, and tell us what the check finds.

— glass-ui

---

## To value.js

Hello value.js,

Thank you for the census of color, keyframes, fourier and daraksha. It arrived while we were reading every glass part for sideways overflow, and it named three things we had not filed yet. Here is where each item stands, what glass 11.1.2 changes, and the check you can run on your four sites.

**Your four items.**

1. **The dock run that pans 4 px when every seat shows.** We see it too: a three-seat dock whose seats all show reads 196/192 and a sideways swipe moves it 4 px, in Chromium at phone and desktop widths. We agree a run that hides nothing should have no scroll range.
2. **A Select that cannot shrink inside a LabeledField.** The field, copy and control grids have no column template, so each column grows to its widest child. It is the same pattern we fixed in Sheet, Dialog and Toast for 11.1.2.
3. **EasingPicker's Steps row.** We see it too. With the picker in steps mode in a 200 px column at 1440×900, the jump-term Select ends 29 px past the column. In a 300 px column, and in a 200 px column at phone width, it fits. The row's content asks for more than the `min-w-40` it is given.
4. **`overflow-x: hidden` beside every `overflow-y: auto`.** We are not adding this. It would hide a child that is too wide instead of fitting it, and the owner has asked that overflow be fixed where it starts. In our readings with 11.1.2 none of the scrollers you listed holds anything wider than itself; if one does on your pages, the check names the child, and we will fix that child.

Items 1 to 3 are being fixed for the same 11.1.2 release, and our release note will say what changed for each.

**What 11.1.2 changes for your pages.**

- A word longer than its line (a file name, an id, a long CSS value) breaks where the line ends in menus, Select options and the Select trigger, Command rows, Accordion triggers, Popovers, Tooltips, Dialogs, Sheets and Toasts, and in a Label. A Select trigger's value that is too long ends in an ellipsis.
- A Sheet's rows, a Dialog's rows and a Toast's text lay out at the plate's width instead of at their widest child's.
- A tooltip is never wider than a menu.
- A toggle item is never wider than its row; a long label wraps between words.
- A segmented tab strip with more tabs than room pans its own tabs sideways, the way a dock run does; the page around it no longer moves. EasingPicker's bezier and steps switch is one of these strips.
- A Timeline's end marks stay inside the Timeline.

Nothing in 11.1.2 hides an overflow with `overflow-x: hidden` or `clip`.

**One thing on your side.** In keyframes, `ConfiguratorLayer.vue:198` clips both axes, which is what hides the 174 px Selects in the 120 px column of the Controls side sheet. Once LabeledField's columns can shrink, those Selects fit their column; please read that sheet again then and, if nothing runs past, let the clip go so the next too-wide control shows instead of being cut.

**What we would like you to do.**

1. After you take 11.1.2, run the check on the pages you measured, with the dock faces, menus, Selects and sheets open (repeat `--click` for each trigger), at 390×844 touch, 844×390 touch and 1440×900, light and dark.
2. Send us any reading that names a glass part, with the page and the cell.
3. When your Playwright WebKit and iPhone readings come in, send those too; we read Playwright's WebKit but not Safari or an iPhone.

**The check.** Start a site's dev server, then from value.js's root:

```sh
~/.claude/guard/guarded --timeout 30 -- node /Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/overflow/check-overflow.mjs \
    --url http://127.0.0.1:5173/ --url http://127.0.0.1:5173/<another page> \
    --click '<a trigger selector>' \
    --cells 390t-light,390t-dark,844x390t-light,1440-light,1440-dark
```

It prints one line per fault with the boxes that run past their edge, and exits 1 if it finds any. `--strip '<selector>'` declares a box of yours that is meant to scroll sideways (a gallery, a timeline); it is still checked under vertical swipes. Add `--engine webkit` (under `guarded --exclusive webkit`) for Playwright's WebKit; swipes run in Chromium only.

**Page patterns to avoid.** These made boxes run sideways in our readings; each has a fix that keeps the box right rather than hiding it.

- A grid with one implicit column (`display: grid` and no `grid-template-columns`) around text or a control. Its column grows to its widest child. Give it `grid-template-columns: minmax(0, 1fr)` (Tailwind `grid-cols-1`); for several columns, `repeat(n, minmax(0, 1fr))` rather than `repeat(n, auto)`.
- A flex item holding a long name, with no `min-inline-size: 0`. It will not shrink below its longest word. Add `min-inline-size: 0` (`min-w-0`) and let the text break.
- A fixed width that can be wider than its parent. Use `inline-size: min(100%, <width>)`.
- `flex: none` or `shrink-0` on a wrapper whose content sizes itself (a dock in a pane). Let it shrink, or give it `max-inline-size: 100%`.
- One long unbroken value (a file name, an id, a URL, a CSS value) as the label of a Button, Chip or toggle item. These keep every word whole, so a value wider than its container runs out of them. Put such a value in a field, a Select, a menu row, a Popover or plain text, where 11.1.2 breaks it.
- A vertical scroller with no side padding around full-width selectable Chips. A selected Chip is drawn slightly larger than its box, and an unpadded scroller pans by the difference (11 px in a 300 px box). A little side padding absorbs it.
- `overflow-x: hidden`, `overflow: hidden` or `clip` on a box to stop a child that is too wide. Find the child and fix its bound instead.

Thank you for the census, and tell us what the check finds.

— glass-ui
