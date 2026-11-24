# The page scrolling under glass's phone surfaces: the root, the cure, the witnesses

O-419 (the owner, 2026-11-23: "the dropdowns scroll the entire screen when using them" and
"the filter drawer scrolls the entire screen, too, on mobile"), O-348 (2), O-347 (1). Read on
`release/11.1.1` at `108fd6051` (the tip on 2026-11-23 11:20; both trees below are that
commit's `src`). This record is the first row of 11.1.2: the build takes `cure.patch`.

## The answer

Every surface that leaks is a non-modal one, and nothing holds the page under a non-modal
surface. The modal ones (Dialog, a modal Sheet, the Command palette, a detented Sheet) hold
it through glass's one root lock, `overflow: hidden` on `<html>`, taken by the modal scrim.
The non-modal ones were left without any hold when reka's body lock was switched off (U/B7
D-2: a lock on `body` under a root whose overflow is not `visible` makes `body` the scroller
and drops every sticky element): `SelectContent` passes `bodyLock: false`, `DropdownMenu`
and `Popover` default to `modal: false`, and a `modal={false}` Sheet renders no scrim. In its
place the plates rely on `overscroll-behavior: contain` on their scroller, and that property
does nothing in WebKit on a box whose content fits (webkit.org/b/243452, open since 2022;
Chromium acted the same way until 144). So on an iPhone a swipe on a short Select sheet, a
short menu or popover, or any part of a filter drawer goes straight to the page. A plate
that has no contained scroller at all (the non-modal drawer's title, foot and body) leaks in
every engine.

The root lock that cured D-2's sticky fault already exists (`_shared/overlay/root-scroll-lock.ts`)
but was given only to the modal scrim and ExpandableContainer. The cure gives it to every
surface that covers the page: below 30rem (glass's sheet width, `useSheetWidth`) an open
overlay holds the page through the root lock, unless it is modal and so already holds it.
One module changes (`sheet-width.ts`, five lines of code); Popover, Sheet and Dialog call it,
as Select and DropdownMenu already do. It is CSS doing the holding (`overflow: hidden` on the
root, which the CSS Overflow spec says the UA must not let the user scroll), the page keeps
its position, the root's `scrollbar-gutter: stable` keeps the layout still, and the hold ends
at the close so the page is live while the surface leaves.

## How it was read

Two plain directories under `.claude/worktrees/` (`git archive`, not worktrees), node_modules
linked from the main checkout: `phone-scroll` (the tip as it is) and `phone-scroll-cure` (the
same with `cure.patch`). Each built its demo with the phone-scroll page added under
`demo/__phone/` (`harness/build-tree.sh`), served by `vite preview` under the guard on 5361
and 5362. The page (`harness/app/Page.vue`) is one surface per load over a page 5,000 px tall,
parked at scrollY 996 so the page can move either way. Every cell: 390x844, device scale 3,
`hasTouch`, an iPhone user agent (Playwright's iPhone 13 string), one browser per run and a
new context per cell.

Per cell (`harness/probe.mjs`): the page's scrollY and scrolling element before the open, the
open by `touchscreen.tap` on the trigger, the reading after it, then swipes of 220 px (finger
down from the upper quarter of the box, then finger up from its lower quarter) on the plate
where nothing scrolls (where the surface has such a part) and on its list, each read at 60%
of the finger's travel ("during") and 800 ms after the lift ("after"), with the list's own
scrollTop, then the close by touch (a row, the ✕, or a tap outside) and the reading after it.
Rows: Select 4 and 40, the same Select in a `GlassDock` at the foot, `CommandDialog` 4 and 40,
a bottom modal `SheetContent` with `scroll` (3 and 40 filters), atlas's filter drawer exactly
as atlas mounts it (`FilterPanel.vue`: right side, `:modal="false"`, its own `overflow-y: auto`
body), a detented bottom Sheet (40 rows), a `DialogContent scroll` (2 and 40 paragraphs), a
Popover (2 and 30 lines) and a DropdownMenu (4 and 40). Two controls: the bare page (the touch
drives a real scroll) and a fixed box that is a scroll container with no overflow and
`overscroll-behavior: contain` (the engine's rule).

The lanes, and what each can and cannot show:

- **Chromium** (Playwright Chromium 149.0.7827.55, headless shell, `isMobile`): swipes are CDP
  `Input.dispatchTouchEvent` sequences, real touch input the compositor scrolls with. The bare
  page moves about 300 px per swipe. Chromium 149 honours `overscroll-behavior` on a box that
  fits (since 144), so this lane shows only the leaks that are not about that rule.
- **WebKit, wheel** (Playwright WebKit 26.5, `isMobile: false`, because mobile WebKit refuses
  `mouse.wheel`): the swipe is five wheel steps over the same point. Not touch: WebKit's own
  scrolling tree deciding where a scroll lands, which is where the fitting-box rule lives.
  The engine control proves the lane: the fixed `contain` box that fits passes the scroll to
  the page (-155 / +220).
- **WebKit, touch** (Playwright WebKit 26.5, `isMobile`): Playwright WebKit has no touch-move
  input (its protocol has `Input.dispatchTapEvent` only, and a script-made `Touch` is an
  illegal constructor), so this lane drives no swipe. It reads the page and the root through
  open and close by tap: whether the page jumps, and whether the page is held while open.

Not one reading here is iOS Safari. Playwright WebKit is not Safari; what iOS does is cited
from WebKit's source and bug tracker below, and the owner's iPhone reads the cure.

## Readings on the plain tree

Page scroll change, "during / after", for each swipe; `v` finger down, `^` finger up;
`[list +n]` is the list's own scroll. For every surface, every open and every close left the
page where it was (0 px) in every lane.

| Surface | Chromium 149, touch | WebKit 26.5, wheel | WebKit 26.5, touch: page held while open? |
|---|---|---|---|
| bare page (control) | v -126/-292, ^ +127/+311 | v -220, ^ +220 | n/a |
| fixed `contain` box that fits (control) | 0 / 0 | **v -155, ^ +220** | n/a |
| Select, 4 (fits) | list 0 / 0 | **list v -120, ^ +220** | no |
| Select, 40 | list 0 / 0, list scrolls +289 | list 0, list scrolls +220 | no |
| Select in a GlassDock, 4 | list 0 / 0 | **list v -120, ^ +220** | no |
| Select in a GlassDock, 40 | list 0 / 0, list scrolls +305 | list 0, list scrolls +220 | no |
| CommandDialog, 4 and 40 | plate 0, list 0; list scrolls +304 | plate 0, list 0 | yes (root lock) |
| bottom modal Sheet, 3 and 40 | plate 0, list 0; list scrolls +270 | plate 0, list 0 | yes (root lock) |
| non-modal right drawer (atlas), 3 | **plate v -2/-15, ^ +109/+321; list v -111/-277, ^ +111/+311** | **plate v -30, ^ +220; list v -220, ^ +220** | no |
| non-modal right drawer (atlas), 40 | **plate v -2/-18, ^ +126/+298; list v -110/-279**, ^ 0 (list +292) | **plate v -30, ^ +220; list v -220**, ^ 0 (list +220) | no |
| detented Sheet, 40 | plate 0, list 0; list scrolls +205 | plate 0, list 0 | yes (root lock) |
| Dialog, 2 and 40 | 0; list scrolls +205 | 0 | yes (root lock) |
| Popover, 2 (fits) | 0 / 0 | **v -220, ^ +220** | no |
| Popover, 30 | 0; list scrolls +268 | 0; list scrolls +220 | no |
| DropdownMenu, 4 (fits) | 0 / 0 | **v -220, ^ +220** | no |
| DropdownMenu, 40 | 0; list scrolls +323 | 0; list scrolls +220 | no |

The scrolling element is `<html>` in every cell. The full tables are `harness/data/*.json`;
`python3 harness/summarize.py` prints them.

What the plain tree says: in Chromium 149 only the non-modal drawer moves the page, by every
route (its plate and its list, both directions, about 300 px a swipe). In WebKit every
non-modal surface whose content fits moves the page as well: the Select sheet alone and in a
dock, the Popover and the DropdownMenu, by the full swipe. A long list scrolls itself and
holds the page at its ends in both engines, because there the box overflows and `contain`
acts. The modal surfaces hold the page in both engines through the root lock.

## The cause, per surface (file and line on `108fd6051`)

### What the engines do

- **`overscroll-behavior` on a box with no scrollable overflow.** The spec and MDN say a
  scroll container that has no scrollable overflow is always at its boundary, so `contain`
  on it stops scroll chaining ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior)).
  Browser-compat-data records the engines: Chrome 63 to 143 and Firefox 59 to 149 "partial:
  the property has no effect on scroll containers that have no scrollable overflow"; Chrome
  144 and Firefox 150 fixed it; **Safari 16 onward, including iOS, is still partial**
  ([webkit.org/b/243452](https://bugs.webkit.org/show_bug.cgi?id=243452), NEW, last touched
  2026-11-04; Simon Fraser, 2024: a fix needs non-scrollable boxes with `contain` in the
  scrolling tree, "a fair amount of work"). The WebKit wheel lane's control reproduces it.
  On iOS a box that does not overflow gets no scroll view, so the swipe goes to the page's.
- **`touch-action` on a plate cannot reach its list.** WebKit computes the used touch action
  as the intersection from the touched element up to the nearest box with a default touch
  behaviour, and resets it at any element whose overflow is `auto` or `scroll`, whether or
  not it overflows (`Source/WebCore/style/StyleAdjuster.cpp`, `computeUsedTouchAction`:
  `hasDefaultTouchBehavior = isUserScrollableOverflow(overflowX) || isUserScrollableOverflow(overflowY)`).
  Chromium's `StyleAdjuster::AdjustEffectiveTouchAction` gives panning back to a scroll
  container the same way (from its source comment; not re-read for this record). So `touch-action: none` on a plate stops a swipe begun on its chrome, but a
  swipe on a list that fits still pans, and with nothing to scroll it goes to the page.
- **`overflow: hidden` on the root and touch on iOS.** The CSS Overflow spec says the UA must
  not allow the user to scroll a `hidden` box "by direct intervention of the user, such as
  dragging on a touch screen". iOS Safari long ignored it on the root
  ([b/153852](https://bugs.webkit.org/show_bug.cgi?id=153852)), and until Safari 26.4 it still
  let the page scroll once Safari's toolbar had collapsed
  ([b/240859](https://bugs.webkit.org/show_bug.cgi?id=240859), resolved by a switch in Safari,
  not WebKit). The Safari 26.4 release notes, Browser, Resolved Issues: "Fixed Safari gesture
  support to prevent pages that should not be able to scroll, such as with explicit
  `overflow: hidden`, from unexpectedly scrolling. (163660111)". One case is still open
  ([b/317941](https://bugs.webkit.org/show_bug.cgi?id=317941), 2026-06-26): a swipe begun
  within about 100 to 200 ms of the overlay opening, the finger never lifted, can still
  move the page. Chromium honours the root's `hidden` for touch.
- **reka's own lock on iOS.** `useBodyScrollLock` writes `overflow: hidden` on `body` and, on
  a user agent that names an iPhone or iPad, also cancels every `touchmove` on the document
  that is not inside an element that overflows
  (`node_modules/reka-ui/dist/shared/useBodyScrollLock.js:51`). Glass took neither half for
  its modals: `ModalScrim` is reka's overlay "less one line" and holds the page through the
  root lock instead (`src/components/dialog/ModalScrim.vue:6-20`).

### The Select's phone sheet, alone and in a dock

`src/components/select/SelectContent.vue:74-82`: `bodyLock: false`, with the comment that the
viewport "holds its own scroll and contains overscroll, so the page behind it does not move".
The page has no hold. The plate (`[data-slot="select-content"]`) is `overflow: hidden` with
`overscroll-behavior: auto` (`src/styles/glass/overlay-plate.css:356`); the viewport inside is
reka's `overflow: hidden auto` (`reka-ui/dist/Select/SelectViewport.js:73`) with
`overscroll-behavior: contain` (`overlay-plate.css:371`). A list that fits has no scrollable
overflow, so in WebKit (and on iOS, and in Chromium before 144) `contain` does nothing and the
swipe scrolls the page: WebKit wheel -120 / +220 at 4 rows, alone and in the dock. At 40 rows
the viewport overflows, scrolls, and holds the page at its ends. This is O-348 (2) exactly,
and why atlas saw it in its Chromium and our Chromium 149 does not.

### The Command palette

`CommandDialog` is a modal `Dialog` (`src/components/command/CommandDialog.vue:67`), so
`ModalOverlay` renders (`src/components/dialog/ModalOverlay.vue:70`, `v-if="root.modal.value"`)
and `ModalScrim` takes the root lock (`ModalScrim.vue:20`). The page holds in both engines. Its
list (`.command__list`, `src/components/command/styles.css:79-90`) has no `overscroll-behavior`
of its own, which does not matter while the root is held. On iOS the hold rests on Safari
honouring the root's `hidden`: 26.4 on, not before once the toolbar has collapsed.

### A bottom Sheet with a list (modal)

`SheetContent` renders the same `ModalOverlay` (`src/components/sheet/SheetContent.vue:363`),
so the root lock holds. The `scroll` region is `overflow-y: auto` with no `overscroll-behavior`
(`src/components/sheet/styles.css:129-133`); held by the root. Same iOS note as the palette.

### The filter drawer (a non-modal Sheet)

atlas mounts its filter drawer as `<Dialog :modal="false"><SheetContent side="right">` with its
own `overflow-y: auto` body (`~/Programming/atlas/src/filter/ui/FilterPanel.vue:219`, `:314-319`). At 390 the drawer is
292 px wide, from x 98 to the right edge.
`ModalOverlay` renders only for a modal root (`ModalOverlay.vue:70`), so a non-modal sheet
takes no lock at all. The plate is `overflow: visible` (not a scroll container), and the
consumer's body has `overscroll-behavior: auto`. Every swipe moves the page, in both engines:
on the title or foot because nothing on the way is a scroll container, on the body at its
ends because nothing contains it, and on a short body because it cannot scroll. This is the
owner's "the filter drawer scrolls the entire screen".

### A Sheet with detents

Modal by default, so the root lock holds. The detented body is `overflow-y: auto;
overscroll-behavior: contain` (`sheet/styles.css:196-198`), and the grip and header are
`touch-action: none` (`sheet/styles.css:107-112`) because they carry the drag. Held in both
engines.

### A Dialog with a long body

Modal, root lock (`ModalScrim.vue:20`); `scroll` makes the plate itself the scroller
(`src/components/dialog/DialogContent.vue:218`). Held in both engines.

### The Popover

`Popover` is non-modal by default (`src/components/popover/Popover.vue:62`), so reka's lock
(`PopoverContentModal`) never runs. The panel is `.glass-overlay-plate[data-reveal="overlay"]`:
`overflow-y: auto; overscroll-behavior: contain` (`overlay-plate.css:93-99`). Held in Chromium
149; in WebKit a panel that fits moves the page by the whole swipe (-220 / +220).

### The DropdownMenu

Non-modal by default for the D-2 reason (`src/components/menu/DropdownMenu.vue:30-36`), so
reka's menu lock (`MenuContentImpl` takes `useBodyScrollLock` only when modal) never runs. Same
plate as the popover; same reading: held in Chromium 149, -220 / +220 in WebKit when it fits.
A dock's menu at sheet width wears the firm plate (`DropdownMenuContent.vue:86-89`) on the same
plate rules, so it should leak the same way; it was not read separately.

## The cure

**Rule:** below 30rem an open glass overlay holds the page through the one root lock, unless
it is modal and already holds it.

`cure.patch` (applies with `patch -p1` to `release/11.1.1` at `108fd6051`, and so at
`4f1fa667e`, the tip when this record closed, whose two later commits touch no `src`; not
committed anywhere):

- `src/components/_shared/overlay/sheet-width.ts`: `useSheetWidth(open, modal = () => false)`
  takes `useRootScrollLock(() => open() && sheet.value && !modal())`. The module already
  reads the sheet width for every overlay that has a sheet form; its comment now says why a
  surface that covers the page holds the page and why `contain` cannot.
- `PopoverContent.vue`, `SheetContent.vue`, `DialogContent.vue`: one call each, passing the
  surface's open state and its `modal`. `DropdownMenuContent.vue` passes its root's `modal`
  to the call it already makes. `SelectContent.vue` already calls it (no modal); its comment
  and `DropdownMenu.vue`'s are corrected, since both said the page stays put without a hold.

Why this and not the others:

- **`overscroll-behavior: contain` on every plate** would hold in Chromium 144+ and Firefox
  150+ and nowhere in Safari for a box that fits (b/243452). It fails the owner's phone.
- **`touch-action: none` on the plate** stops a swipe on the chrome only; WebKit and Chromium
  give panning back inside any `overflow: auto` box, so a list that fits still leaks, and it
  would take the pan from sliders and scrollers inside the plate with it.
- **A `touchmove` trap** (reka's iOS half, or atlas's suggestion of a guard on the plate)
  holds on every iOS version, but it is script where CSS holds, and a non-passive document
  listener makes every touch scroll on the page wait on the main thread while it is attached.
- **`position: fixed` on `body`** loses the scroll position and jumps the page; not used.
- **A `:root:has(open plate)` rule** would be one CSS rule with no call sites, but as a layered
  rule it loses to a consumer's unlayered `html { overflow-y: … }`, it would need a layered
  `!important` that the reduced-motion ruling (O-350) has just retired, and it would be a
  second authority beside the counted root lock that the modals already take.
- **The root lock** is the lock glass already wrote for exactly this (D-2's sticky fault does
  not apply to it: the root's value propagates to the viewport, which stays the one scroller),
  counted so surfaces that close out of order restore the right value, with the root's
  `scrollbar-gutter: stable` (`src/styles/utilities/base-misc.css:206-208`) keeping the layout
  still.

What changes for a consumer: at sheet width the page behind an open non-modal surface does
not scroll, by a swipe on the surface or on the page, until the surface closes. That includes
atlas's live-behind filter drawer on a phone (at 30rem and up it stays live, as atlas built
it). The hold ends at the logical close, so a press or swipe on the page during a surface's
exit reaches the page, as 11.1.1 made it for presses.

What it rests on in Safari: iOS 26.4 or later (the Safari switch above). On iOS 16.4 to 26.3,
glass's floor (`vite.targets.ts`), the root's `hidden` does not stop a swipe once the toolbar
has collapsed, so this cure, like today's modal lock, does not hold there; reka's `touchmove`
half is the only thing that would. That is a support-floor question for the owner, not part
of this cure. And b/317941's window (a swipe begun within about 200 ms of the open without
lifting) is Safari's.

## The witnesses: plain (RED) against cured (GREEN)

| Surface | Chromium 149, touch: plain → cured | WebKit 26.5, wheel: plain → cured | WebKit 26.5, touch: held while open, plain → cured |
|---|---|---|---|
| Select, 4 | 0 → 0 (Chromium 149's `contain` acts on a box that fits) | **RED -120/+220** → 0 | no → **yes** |
| Select, 40 | 0 → 0; list scrolls +289 → +304 | 0 → 0; list +220 → +220 | no → **yes** |
| Select in a dock, 4 | 0 → 0 | **RED -120/+220** → 0 | no → **yes** |
| Select in a dock, 40 | 0 → 0; list scrolls | 0 → 0; list scrolls | no → **yes** |
| CommandDialog, 4 and 40 | 0 → 0 | 0 → 0 | yes → yes |
| bottom modal Sheet, 3 and 40 | 0 → 0 | 0 → 0 | yes → yes |
| non-modal drawer, 3 | **RED ~±300 on plate and list** → 0 | **RED -30/+220, -220/+220** → 0 | no → **yes** |
| non-modal drawer, 40 | **RED** → 0; list scrolls +292 → +302 | **RED** → 0; list +220 → +220 | no → **yes** |
| detented Sheet, 40 | 0 → 0 | 0 → 0 | yes → yes |
| Dialog, 2 and 40 | 0 → 0 | 0 → 0 | yes → yes |
| Popover, 2 | 0 → 0 | **RED -220/+220** → 0 | no → **yes** |
| Popover, 30 | 0 → 0; list scrolls | 0 → 0; list scrolls | no → **yes** |
| DropdownMenu, 4 | 0 → 0 | **RED -220/+220** → 0 | no → **yes** |
| DropdownMenu, 40 | 0 → 0; list scrolls | 0 → 0; list scrolls | no → **yes** |

In the cured tree every list that overflows still scrolls by the swipe, the page never moves
during or after a swipe, no open or close moves the page in any lane, and the root is back to
`visible` after every close that closed. The two cured cells whose root stays `hidden` after
the close are the Popover's in WebKit, where the closing tap (on the page beside it) did not
close it (For INBOUND): the hold lasted exactly as long as the surface stayed open.

The engine controls are unchanged by the cure, as they must be: the bare page scrolls about
300 px a swipe in Chromium and 220 in WebKit wheel, and the fitting `contain` box passes the
scroll in WebKit and holds it in Chromium 149.

`vue-tsc --noEmit -p tsconfig.src.json` is clean on the cured tree. The overlay unit tests on
the cured tree (`tests/components/{dialog,menu,command,select,sheet,expandable-container}` and
the Select, Popover and Command contracts; vitest, 2 workers): 27 of 28 files and 181 of 182
tests pass. The one failure is the harness, not the patch: `dialog-dismiss.test.ts` forbids a
dismiss intent anywhere under `demo/`, and the phone-scroll page mounts atlas's drawer with
atlas's own `@interact-outside.prevent` (`harness/logs/vitest-cure.log`).

## Cuts at 390 by touch (11.1.1's own scope)

Read on the plain tree (`harness/cuts.mjs`): for each surface and each way of closing it, a
new context, the open by tap and the close by the route, with every animation frame from the
tap to 1.3 s after the close recording the plate's presence, its effective opacity (its own
and every ancestor's computed opacity multiplied), its box, its share on screen, its
`clip-path` and the scrim's opacity. The entrance cuts if the first frame that shows the plate
already equals the settled frame (opacity at least 0.6, the same box within 4 px, the same
share on screen, the same clip); the exit cuts if a frame that shows the plate at 0.3 or more
and 20% or more on screen is followed within 40 ms by one that does not show it; a move of
more than 120 px in one frame while showing is a jump. Routes: a row (Select, dock Select,
Command, DropdownMenu), a tap outside (Select, dock Select, Popover, DropdownMenu), a tap on
the scrim (Command, Sheet, detented Sheet, Dialog), the ✕ (Sheet, drawer, detented Sheet,
Dialog), a second tap on the trigger (Select, Popover), Escape (every surface), and a drag
down on the grip (detented Sheet, Chromium only).

**Chromium 149: no cut by any route.** 28 cells, 0 cuts, 0 jumps, at most 1 dropped frame in
a close. Every entrance tweens (the Select and menus grow by their clip from a strip, the
Popover and Dialog fade in from 0, the Sheet slides), and every exit ends with the plate
under 0.06 opacity or within 2.5% of the screen before it goes: the Select sheet (alone and in
the dock) slides down and fades over 210 to 225 ms, the DropdownMenu fades over 210 to 225 ms,
the Command palette and the Dialog over 210 to 240 ms, the Popover over 250 to 260 ms, the
bottom Sheet slides past the foot in 255 to 265 ms, the drawer past the side in 270 to 300 ms,
the detented Sheet in about 360 ms (930 ms when dragged down, carrying on from the finger).

An earlier pass on `a5452a1a3`, under a load of 35 to 48, read three "jumps" on the detented
Sheet's close (126 to 200 px in one frame); each spanned a dropped frame (25 to 50 ms between
frames), so they are the spring losing frames on a busy machine (O-349 (1), O-350 (2)), not a
frame with no tween, and the rerun on `108fd6051` at a lower load has none.

**Playwright WebKit 26.5 (`isMobile`, taps): no cut by any route that closed the surface.**
27 cells (the drag needs a touch move WebKit cannot drive), 0 cuts, 0 jumps, 0 dropped
frames, about 60 frames a second. Entrances tween as in Chromium (the menus' clip opens from
a strip, the Popover and Dialog start at 0.08 to 0.17 opacity, the sheets slide in), and every
exit that ran ends under 0.08 opacity or within 7% of the screen: the Select sheet 207 to 217
ms, the DropdownMenu about 225 ms, the Command palette and the Dialog 190 to 200 ms, the
Popover about 245 ms, the bottom Sheet 258 to 270 ms, the drawer 255 to 271 ms, the detented
Sheet 357 to 368 ms.

**But in WebKit a tap on the page or on the scrim closes nothing.** Every route that is a tap
on an element that is not itself a control left the surface open for the whole 1.3 s:
the tap outside a Select, a dock Select, a DropdownMenu and a Popover, the tap on the scrim
of the Command palette, a Sheet, a detented Sheet and a Dialog, and a second tap on an open
Select's trigger. Taps on a row, the ✕ and a Popover's trigger, and Escape, all close. In
Chromium every one of these routes closes. This is not a cut, but it is the other half of
"buggy on mobile", and it meets the cure (below, For INBOUND).

So the list of cuts for 11.1.1 is empty on `108fd6051`: no surface cuts in or out by any
route that closes it, in either engine, at 390 by touch.

## For INBOUND (outside this record's question)

- **In WebKit a tap outside a surface, or on its scrim, does not close it.** Playwright WebKit
  26.5, by tap at 390, both trees: the Select (alone and in a dock), the DropdownMenu and the
  Popover stay open after a tap on the page beside them, and the Command palette, the Sheet,
  the detented Sheet and the Dialog stay open after a tap on their scrim; a second tap on an
  open Select's trigger does not close it either. Chromium closes on every one. reka's
  outside-press handler, for a touch pointer, does not act on the `pointerdown`: it waits for
  a `click` on the document (`reka-ui/dist/DismissableLayer/utils.js:40-56`), and WebKit's tap
  sends no `click` to a target that is not clickable, which is iOS's rule (see
  [b/267688](https://bugs.webkit.org/show_bug.cgi?id=267688), "No close of popover with
  click/touch on backdrop in Safari iOS and iPadOS"). If the iPhone agrees, a phone reader
  cannot close any glass overlay by tapping away from it, and with this cure a Popover (which
  has no ✕ and no row) holds the page until its trigger is tapped again. The 11.1.2 build reads
  it on the iPhone first, with the cure, and cures it in the same release if it holds there.
- **A modal DropdownMenu or Popover still runs reka's body lock**, the D-2 fault (`body`
  becomes the scroller under a root whose overflow is not `visible`). Modal is opt-in for
  both, so the cure leaves it; the same root lock would serve them.

## What was not run

- **No iPhone and no Safari.** Every reading is Playwright Chromium 149 or Playwright WebKit
  26.5 on macOS. What iOS Safari does is cited (b/243452, b/153852, b/240859, b/317941, the
  Safari 26.4 release note, `StyleAdjuster.cpp`), not measured. The owner's iPhone reads the
  cure, per O-419: open each surface, swipe on it and beside it, close it.
- **No touch swipe in WebKit.** Playwright WebKit can tap but cannot move a finger, and a
  script-made `Touch` is refused, so the WebKit swipes are wheel scrolls (WebKit's own
  scrolling tree, `isMobile: false`) and the WebKit touch lane reads only the hold and the
  page through open and close. iOS's touch path (UIScrollView chaining, rubber-banding,
  momentum after a fling, the toolbar collapsing) is not reproduced by either.
- **No Chromium with the pre-144 rule.** A lane launched with
  `--disable-features=OverscrollBehaviorRespectedOnAllScrollContainers` (and the same name
  under `--disable-blink-features`) still contained the fitting box, so the switch did not
  take and the lane was dropped (`harness/data/try-oldrule.json`). The WebKit wheel lane reads
  the same rule in WebKit itself.
- **iOS 16.4 to 26.3 with the toolbar collapsed**, where the root's `hidden` does not stop a
  swipe (b/240859): neither this cure nor today's modal lock holds there. Only a `touchmove`
  cancel would, and it is not in the patch (see the owner's question below).
- **Wider than 30rem.** An anchored, non-modal plate that fits (a Popover, a DropdownMenu, a
  Select's anchored form) still hands a wheel or a swipe to the page in WebKit at 30rem and
  up, on an iPad included; it moves with its anchor there. Out of this record's phone scope.
- **The on-screen keyboard** (the visual viewport smaller than the layout viewport, b/240860)
  and a consumer whose page scrolls inside its own element rather than the root: not read.
  A portalled `position: fixed` plate chains only to the root scroller, so an inner page
  scroller is not reached by a swipe on a plate; not measured.
- **The release battery** was not run on the patched tree, only `vue-tsc` over
  `tsconfig.src.json` and the overlay unit tests (above); the patch adds no test of its own
  (the 11.1.2 build writes its witness from these cells).
- **Light theme only, no reduced motion, no dark**, one viewport (390x844); 360 not read.

## The owner's question

On iOS 16.4 to 26.3 (glass's stated floor), Safari lets a swipe scroll a page whose root is
`overflow: hidden` once its toolbar has collapsed. Today's modal lock and this cure both rest
on the root's `hidden`, so neither holds there; reka's lock held it with a `touchmove` cancel
on the document, which glass removed when it moved the lock to the root. Default: the cure
ships as CSS alone and holds on Safari 26.4 and later (and every Chromium); the older Safaris
keep today's behaviour. The alternative is a `touchmove` cancel, attached only while the root
lock is held and only on a user agent that needs it.

## Running it again

`harness/` holds everything: `build-tree.sh <tree>` adds the page under `demo/__phone/` and
builds the demo; `serve.sh <tree> <port>` serves it (under the guard, `--light`, an explicit
`--timeout`, stopped by the guard's PID); `run-lane.sh <lane>` probes 5361 (plain) then 5362
(cured) into `data/`; `cuts.mjs <chromium|webkit> <port> <out>` reads the cuts;
`summarize.py` prints the tables. Lanes that start WebKit run under
`guarded --exclusive webkit`. The two trees are rebuilt with `git archive` of the base commit
(`harness/BASE-SHA.txt`) and `patch -p1 < cure.patch`. They were to be deleted when this
record closed, but the permission system refused the delete, so
`.claude/worktrees/phone-scroll` and `.claude/worktrees/phone-scroll-cure` (plain directories,
not git worktrees; `node_modules` in each is a link to the main checkout's) are still there for
whoever holds the permission to remove. Both servers are stopped.
