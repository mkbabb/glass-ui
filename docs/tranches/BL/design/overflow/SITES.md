# Sideways overflow: notes for atlas and value.js

Two notes, ready to send. Each says what glass 11.1.2 changes, how to run the check on your own pages, and the page patterns that made boxes run sideways in our readings. The check is `check-overflow.mjs`, next to this file.

---

## To atlas

Hello atlas,

I saw your Filters view scroll sideways on my phone, so we went looking for every place a glass part can do that. Here is what we found for your drawer, what glass 11.1.2 changes, and what we would like you to check on your side.

**Your drawer.** The body (`.cp-drawer__body` in `FilterPanel.vue`) is `overflow-y: auto`, and a box that scrolls on one axis scrolls on the other too: any row wider than the body lets the whole drawer pan sideways. We built your drawer from your source on `glass-10.1` (069708a): the right-hand non-modal sheet, your body and options-band CSS as written, and the three kinds of row in `VizOptionsBand.vue`, a ToggleGroup, a Select and a Switch, with your classes on them. In Chromium at 390×844 with touch, and at 1440×900:

- Three options of about 30 characters each fit the 235 px field on the phone width, and nothing panned.
- One option of 50 characters did not: the toggle item kept its label on one line at 307 px, and a sideways swipe moved the body 56 px (32 px at 1440).
- The cause is in glass: a toggle item had no cap on its width. 11.1.2 caps it at its row, so a long option wraps between words and the body stays put. With that build the same 50-character option sat on two lines and the body did not move.

We also ran the check on your live page, `atlas.friday.institute/usf`, which carries atlas 7.0.0 on glass 7.0.0. In Chromium at phone width in dark, the dock's Filters button opened the drawer, and a sideways swipe moved its body 12 px. A range Slider in the body read 360 px of content in a 348 px box: each of its thumbs, 18 px wide, held 31 px, and at the end of the range that ran 12 px past the Slider. Glass 11's Slider holds its thumbs inside its box (reka's `contain` alignment); in our readings of 11.1.1's Sliders with a thumb at either end, nothing ran past the box. Please read that row again once you are on 11.1.2.

**What 11.1.2 changes for you.**

- A toggle item is never wider than its row; a long label wraps between words.
- A LabeledField's label and control take the field's width. A Select in it is as wide as the field and ends a long value in an ellipsis, and a label word longer than the field breaks.
- A word longer than its line (a file name, an id, a long measure code) breaks where the line ends in menus, Select options and the Select trigger, Command rows, Accordion triggers, Popovers, Tooltips, Dialogs, Sheets and Toasts, and in a Label. A Button or a Chip you set inside one of those rows keeps its words whole.
- A Sheet's rows, a Dialog's rows and a Toast's text lay out at the plate's width instead of at their widest child's.
- A tooltip is never wider than a menu.
- A segmented tab strip whose tabs don't fit its box pans its own tabs sideways, the way a dock run does, and the page around it no longer moves. It scrolls only then: a strip whose tabs fit behaves under a finger as it does in 11.1.1, so a swipe that starts on it goes where it went before, and a drag that starts on a tab in a detented Sheet's header still moves the sheet. In a detented Sheet's header a strip that does scroll takes only sideways swipes: in a top or bottom sheet a vertical drag from it still moves the sheet, and in a side sheet you drag the sheet from beside the strip. A selected tab glides into view, and an underline tab draws its focus ring inside itself. In Chromium a focused tab's ring shows whole; in Playwright's WebKit at phone width, on a strip that scrolls, the strip's rounded edge trims the faint outer edge of the ring.
- A strip never gets squeezed below its tabs in a flex row or column. In a row with no room for it, it takes the row's width and the items beside it give way.
- A dock whose seats all show has no sideways scroll, and its end seats' focus rings show without the dock moving. A vertical swipe that starts on such a dock now scrolls the page, as you asked; a dock whose seats run past it still pans them only under a sideways swipe. In Playwright's WebKit a dock squeezed 1 to 4 px narrower than it asks has no range at all, so its end seat's focus ring is cut by up to 4 px. That is worse than 11.1.1 there, which kept a range of 8 px and scrolled the ring into view. I haven't decided yet whether 11.1.2 changes it.
- A Timeline's end marks stay inside the Timeline.

11.1.2 adds no clip to hide a box that is too wide, so a row that is too wide still shows up in the check, and still pans the drawer until it is fixed.

**What we could not see.** Your real option labels come from each view's data, so we cannot say which views had one long enough. We loaded one live page (above), not your source with 11.1.2. We did not read the drawer's other bands (the selection-set pane, the year scrubber, the foot), Safari or an iPhone.

**What we would like you to do.**

1. After you take 11.1.2, run the check on the routes that have the Filters drawer, with the drawer open, at phone width in dark and at desktop width in dark (the command is below).
2. Send us any reading that names a glass part (a `data-slot`, or a class starting `glass-`, `segmented-`, `toggle-group`, `labeled-field`, `dock-`), with the page and the cell it came from.
3. If the check finds a row that is too wide, please fix that row rather than hide it. `overflow-x: hidden` on the body would stop the pan, and it would also cut off the end of that row where no one can reach it.

**The check, on your drawer.** Start your dev server, then from atlas's root (it needs your installed Playwright). In your source on `glass-10.1` and `master`, the Filters toggle on each chart sits behind the chart's gear, so the check taps the gear and then the toggle:

```sh
~/.claude/guard/guarded --timeout 30 -- node /Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/overflow/check-overflow.mjs \
    --url http://127.0.0.1:5173/<a route with the drawer> \
    --click '.viz-gear-dock__gear' --then '[data-viz-dock-filter-toggle]' \
    --cells 390t-dark,1440-dark
```

We took those two selectors from your source and could not run them, as the live site carries atlas 7.0.0. On the live site the dock's own Filters button opens the drawer at phone width, `--click '[data-testid=dock-filter-trigger]'`, and we ran that one. The `dock-filter-pullout` id that `FilterPanel.vue` mentions is in a comment only; no element carries it. A `--click` or `--then` that finds nothing to click is named in the output and the run exits 2, so a page is never read with the drawer shut and called clean.

It prints one line per fault with the boxes that run past their edge, and exits 1 if it finds any. It also reports a strip that shows all its content and still scrolls. A box that hands its padding back with negative margins (a full-bleed row, `-mx-4 px-4`) is measured by its margin box, and a line clamp that ends in an ellipsis counts as a cut that means to be there. For Playwright's WebKit, which is close to Safari but not Safari, add `--engine webkit` and run it under the WebKit lock: `~/.claude/guard/guarded --exclusive webkit --timeout 30 -- node …/check-overflow.mjs --engine webkit …`. Swipes run in Chromium only.

**Page patterns to avoid.** These made boxes run sideways in our readings; each has a fix that keeps the box right rather than hiding it.

- A grid with one implicit column (`display: grid` and no `grid-template-columns`) around text or a control. Its column grows to its widest child. Give it `grid-template-columns: minmax(0, 1fr)` (Tailwind `grid-cols-1`); for several columns, `repeat(n, minmax(0, 1fr))` rather than `repeat(n, auto)`.
- A flex item holding a long name, with no `min-inline-size: 0`. It will not shrink below its longest word. Add `min-inline-size: 0` (`min-w-0`) and let the text break.
- A fixed width that can be wider than its parent (a 288 px box in a 240 px column). Use `inline-size: min(100%, 288px)`.
- `flex: none` or `shrink-0` on a wrapper whose content sizes itself. Let it shrink, or give it `max-inline-size: 100%`.
- One long unbroken value (a file name, an id, a URL) as the label of a Button, Chip or toggle item. These keep every word whole, so a value wider than its container runs out of them. Put such a value in a field, a Select, a menu row, a Popover or plain text, where 11.1.2 breaks it.
- A vertical scroller with no side padding around full-width selectable Chips. A selected Chip is drawn slightly larger than its box, and an unpadded scroller pans by the difference (11 px in a 300 px box). Your drawer's 1rem of padding already absorbs it.
- A plain-text count beside the label in a menu row, a Command row, an Accordion trigger or a Select trigger. These rows let a long label break anywhere, and text you add beside it inherits that: squeezed, "1,204" stood on five lines in our reading. Put a count in a Badge, which keeps one line.
- `overflow-x: hidden`, `overflow: hidden` or `clip` on a box to stop a child that is too wide. Find the child and fix its bound instead.

Thank you, and tell us what the check finds.

Thanks,
Mike

---

## To value.js

Hello value.js,

Thank you for the census of color, keyframes, fourier and daraksha. It arrived while we were reading every glass part for sideways overflow, and it named four things, three of which we built into glass 11.1.2. Here is where each one landed, what else 11.1.2 changes, and the check you can run on your four sites.

**Your four items.**

1. **The dock run that pans 4 px when every seat shows.** Fixed. The cause sat one step from where you found it: the reserve boxes were right, but the run had dropped its end padding while its width still counted on it, so its edge stopped short of the room the boxes hold. In our readings a three-seat dock went from 196/192 with a 4 px pan to 196/196 with none (390×844 with touch), and from 213/209 to 213/213 at 1440×900, and its last seat's focus ring now shows without the run moving. A dock squeezed into a host a few pixels narrower than it asks still keeps a range of those few pixels in Chromium, so a focused end seat can scroll its ring into view. Playwright's WebKit differs when the squeeze is 4 px or less: the run has no range there, and the end seat's focus ring is cut by up to 4 px. In that band WebKit reads worse than 11.1.1, whose run kept 8 px of range and scrolled the ring into view. I haven't decided yet whether 11.1.2 changes it.
2. **A Select that cannot shrink inside a LabeledField.** Fixed as you asked: the field, label and control grids take `minmax(0, 1fr)`. Your Gradient band's three 73 px fields held triggers of 89, 97 and 97 px; in 11.1.2 each trigger is 73 px and its value ends in an ellipsis. Keyframes' 120 px column went from 177 px to 120. A label word longer than its field now breaks too.
3. **EasingPicker's Steps row.** Fixed by letting the jump-term Select shrink, still no wider than 9rem, once the step slider is at its floor. The row stays on one line, so the picker keeps its height when you switch between bezier and steps. At your keyframes width (a 202 px row) the Select is 130 px and shows "jump-end" whole; in a column under about 210 px at desktop size its value ends in an ellipsis. We also read the row wrapping instead: it keeps the value whole in narrow columns, but at your width on a desktop it already takes two lines, so we kept it to one. One more thing we saw there: on a touch screen a horizontal Slider keeps a 24 px floor that replaces any `min-w-*` you give it, so in a narrow Steps row on a phone the step slider can be 24 px wide. That floor is glass's, and I haven't decided yet whether 11.1.2 changes it.
4. **`overflow-x: hidden` beside every `overflow-y: auto`.** Not in 11.1.2 for now; I'm still deciding. We built it on every vertical scroller in glass that is not meant to pan sideways, the ones you listed and the vertical Carousel and Deck strips, and then took it out. Glass keeps a Button's words whole, so a file name wider than a scrolling Dialog runs past the Button's edge. Without the clip a 7 px sideways pan shows the end of the name; with it the end is cut off and nothing can bring it into view. Our own rule is that a clip may hide paint, never a box that is too wide, and that case is a box. I may take it alone, or with a change that lets a long word break inside a Button. `clip` turns into `hidden` next to a scrolling axis, so `hidden` would be the form.

**What else 11.1.2 changes for your pages.**

- A word longer than its line (a file name, an id, a long CSS value) breaks where the line ends in menus, Select options and the Select trigger, Command rows, Accordion triggers, Popovers, Tooltips, Dialogs, Sheets and Toasts, and in a Label. A Button or a Chip you set inside one of those rows keeps its words whole.
- A Sheet's rows, a Dialog's rows and a Toast's text lay out at the plate's width instead of at their widest child's.
- A tooltip is never wider than a menu.
- A toggle item is never wider than its row; a long label wraps between words.
- A segmented tab strip whose tabs don't fit its box pans its own tabs sideways, the way a dock run does, and the page around it no longer moves. It scrolls only then, so a strip whose tabs fit behaves under a finger as it does in 11.1.1: inside a box of yours that sets `touch-action` (keyframes' controls pane sets `pan-y`), a swipe that starts on the strip still obeys the box. In a detented Sheet's header a strip that does scroll takes only sideways swipes: in a top or bottom sheet a vertical drag from it still moves the sheet, and in a side sheet you drag the sheet from beside the strip. A selected tab glides into view, and an underline tab draws its focus ring inside itself, so the strip's edge never cuts it. EasingPicker's bezier and steps switch is one of these strips, and fourier's WorkspaceTabs and GalleryView and keyframes' EasingCatalogue filter are underline strips.
- A strip never gets squeezed below its tabs in a flex row or column. In a row with no room for it, it takes the row's width and the items beside it give way.
- A Configurator layer clips only its height while it opens and closes. A control wider than the layer now shows past its edge, and the scroller around it pans to reach it, where 11.1.1 cut it off at the layer's edge. In keyframes' Controls side sheet, the 174 px Selects in the 120 px column were cut that way; in 11.1.2 they fit their column (the LabeledField change above), so nothing should show there. Please read that sheet once you're on 11.1.2 and send us anything the check finds.
- A dock whose seats all show no longer holds a vertical swipe: one that starts on the dock scrolls the page. A dock whose seats run past it still pans them only under a sideways swipe.
- A Timeline's end marks stay inside the Timeline.

11.1.2 adds no clip to hide a box that is too wide.

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

It prints one line per fault with the boxes that run past their edge, and exits 1 if it finds any. A `--click` that finds nothing to click is named in the output and the run exits 2, so a page is never read shut and called clean; for a control behind another (a gear, then the item it shows), follow the `--click` with `--then '<the item>'`. It also reports a strip that shows all its content and still scrolls, which is how a dock that pans a few pixels shows up. A box that hands its padding back with negative margins (a full-bleed row, `-mx-4 px-4`) is measured by its margin box, and a line clamp that ends in an ellipsis counts as a cut that means to be there. `--strip '<selector>'` declares a box of yours that is meant to scroll sideways (a gallery, a timeline); it is still checked under vertical swipes. For Playwright's WebKit add `--engine webkit` and run it under the WebKit lock: `~/.claude/guard/guarded --exclusive webkit --timeout 30 -- node …/check-overflow.mjs --engine webkit …`. Swipes run in Chromium only.

**Page patterns to avoid.** These made boxes run sideways in our readings; each has a fix that keeps the box right rather than hiding it.

- A grid with one implicit column (`display: grid` and no `grid-template-columns`) around text or a control. Its column grows to its widest child. Give it `grid-template-columns: minmax(0, 1fr)` (Tailwind `grid-cols-1`); for several columns, `repeat(n, minmax(0, 1fr))` rather than `repeat(n, auto)`.
- A flex item holding a long name, with no `min-inline-size: 0`. It will not shrink below its longest word. Add `min-inline-size: 0` (`min-w-0`) and let the text break.
- A fixed width that can be wider than its parent. Use `inline-size: min(100%, <width>)`.
- `flex: none` or `shrink-0` on a wrapper whose content sizes itself (a dock in a pane, a Select beside a slider). Let it shrink, or give it `max-inline-size: 100%`.
- One long unbroken value (a file name, an id, a URL, a CSS value) as the label of a Button, Chip or toggle item. These keep every word whole, so a value wider than its container runs out of them. Put such a value in a field, a Select, a menu row, a Popover or plain text, where 11.1.2 breaks it.
- A vertical scroller of your own with no side padding around full-width selectable Chips. A selected Chip is drawn slightly larger than its box, and an unpadded scroller pans by the difference (11 px in a 300 px box). A little side padding absorbs it.
- A plain-text count beside the label in a menu row, a Command row, an Accordion trigger or a Select trigger. These rows let a long label break anywhere, and text you add beside it inherits that: squeezed, "1,204" stood on five lines in our reading. Put a count in a Badge, which keeps one line.
- `overflow-x: hidden`, `overflow: hidden` or `clip` on a box to stop a child that is too wide. Find the child and fix its bound instead.

Thank you for the census, and tell us what the check finds.

Thanks,
Mike
