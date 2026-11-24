# The page scrolling under glass's phone surfaces: the root, the cure, the witnesses

O-419 (the owner, 2026-11-23: "the dropdowns scroll the entire screen when using them" and
"the filter drawer scrolls the entire screen, too, on mobile"), O-348 (2), O-347 (1). Read on
`release/11.1.1` at `108fd6051` (the tip on 2026-11-23 11:20; both trees below are that
commit's `src`). This record is the first row of 11.1.2: the build takes `cure.patch`, and
`scrim.patch` unless 11.1.1 takes it first.

## Second round

The second round replaced round 1's patch (`cure-round1.patch`) and answered VERIFY.md's B1
to B4 and the parts of atlas's O-423 placed here. A third round answered the second round's
two verifiers ("What the third round changed", below), and a fourth answered the third
round's two ("What the fourth round changed", below). `cure-round2.patch` is the second
round's patch, superseded by `cure.patch`; no build takes it. The change is now three
patches. Each applies alone with `patch -p1` to `release/11.1.1` at `ca61ce5b6`, whose `src`
is unchanged since `108fd6051`, and they apply together in any order (read in the fourth
round: every order of the three, each alone, and each pair; all three give the cured tree
file for file):

- `scrim.patch` (3 files): the detented Sheet's scrim law, which 11.1.1 can take alone;
- `cure.patch` (13 files): the hold, the outside layer and the modal scrim's press, the
  owner's report;
- `detents.patch` (2 files: `sheet/detents/use.ts` and the one `onTouchmove` line in
  `SheetContent.vue`): the detents hand-off, atlas (d), cut out in the fourth round.

The 11.1.2 build takes `cure.patch`, and `scrim.patch` unless 11.1.1 has taken it. It takes
`detents.patch` only with atlas's condition placed (atlas (d), below): on atlas's drawer as
mounted, the hand-off spends the first finger-up of every open on a rise that moves nothing
on screen, until atlas drops the 0.9 rung or the `90dvh` cap. Without `detents.patch` a
detented sheet behaves as on 11.1.1 (one swipe up both raises the sheet and scrolls the
list) under the hold. None is committed anywhere. Round 1's text below is kept, corrected
where VERIFY.md found it wrong, and the second round's is corrected where the third and
fourth rounds changed it.

### What the fourth round changed

The third round's two verifiers found three blocking items. The fourth round read them on
two fresh trees of `release/11.1.1` at `ca61ce5b6` (`git archive`, plain directories under
`.claude/worktrees/`): `ps4-plain` as it is and `ps4-cure` with the three patches. Readings
are in `harness/data/r4/`: Playwright Chromium 149.0.7827.55 (headless shell) and Playwright
WebKit 26.5, 390x844, device scale 3, `isMobile`, `hasTouch`, by `touchscreen.tap`, one
browser per run and a new context per cell; the mouse cells use a desktop context 390 and
1280 wide. `nested.mjs` gained a paint read and two parts (`scrim`, `nopan`),
`tapclick.mjs` four cases, and the page one cell (`dlg-field`, a modal Dialog with a text
field and `dismiss` from the URL). Against the third round, `cure.patch` changes in three
files (`ModalScrim.vue`; the comment in `outside.ts`; the `modal` doc in `Popover.vue`) and
loses the detents hand-off to `detents.patch`; `scrim.patch` is unchanged.

**1. A tap on a modal scrim moved focus out of the dialog.** The third round's scrim let a
touch's `pointerdown` through so that WebKit would send the tap's click, and with it the
tap's compatibility `mousedown`, which moved focus to `body`. The scrim now prevents its own
`mousedown` (`@mousedown.left.self.prevent`) and no `pointerdown`. A prevented `mousedown`
stops the focus move and leaves the click, which reka waits for after a touch; a mouse's or
a pen's `pointerdown` still reaches reka unprevented, as before. Static page
(`tapclick.mjs`), a text field focused by script, one tap on a box that listens for click:

| The box | Chromium 149: click, focus after | Playwright WebKit 26.5: click, focus after |
|---|---|---|
| nothing prevented (the third round's scrim, for a touch) | click, `body` | click, `body` |
| its `pointerdown` prevented (11.1.1's scrim) | click, field | **no click**, field |
| its `mousedown` prevented (this round's scrim) | click, field | click, field |

The scrim in the harness (`dlg-field`): the field focused by a tap, one tap on the scrim at
(30, 120), read 1 s later; then the same with a mouse click at 390 and 1280 wide:

| Tree, `dismiss`, input | Chromium 149 | Playwright WebKit 26.5 |
|---|---|---|
| plain, locked, tap | open, rebuff `a`, focus in the field | open, no rebuff (the tap makes no click), focus in the field |
| the third round's cure, locked, tap (the verifiers' reading) | open, rebuff `a`, focus on `body` | not read |
| cure, locked, tap | open, rebuff `a`, focus in the field | open, rebuff `a`, focus in the field |
| plain and cure, locked, mouse at 390 and 1280 | open, rebuff `a`, focus in the field | the same |
| plain and cure, free, tap | closed, focus on the trigger | plain: open, the tap closes nothing; cure: closed, focus on the trigger |
| plain and cure, free, mouse at 390 and 1280 | closed, focus on the trigger, except the plain tree at 1280: still leaving at 1 s, focus on `body` (load about 140) | closed, focus on the trigger |

The cuts of the four surfaces with a scrim (Command palette, Sheet, detented Sheet,
Dialog), every route, cured tree (`data/r4/cuts-*-cure.json`): Chromium 149, 13 cells, a tap
on each scrim closes it, no scrim cut, no plate cut; the three detented closes read
"jumps" of 129 to 183 px, each across a frame gap of 42 to 59 ms at a load of about 140
(the patch does not change that motion; the third round's cured run at a lower load read
none). Playwright WebKit 26.5, 12 cells (the drag needs a finger): a tap on each scrim
closes it, and no close cuts. Two detented opens read "scrim appears" (0.014 to 0.116 and
to 0.205) and one of them a "jump" of 168 px, each in the frame after a gap of 36 and 56 ms,
in which the plate rose 99 and 168 px and the scrim rose with it on the same rung scalar;
the third round read the same shape in three opens. The scrim law is `scrim.patch`'s,
unchanged this round.

**2. On iOS a swipe begun on a Select may pick or open it.** Accepted from WebKit's source;
not read on a device. In `WKWebViewIOS.mm`, `_updateScrollViewForTransaction:` gives the
page's pan no touch types while the main frame cannot scroll, and a root at `overflow:
hidden` makes it unable to (the chain is under "What the engines do", below). A list that
fits gets no scroll view either. So on an iPhone at 390, with the hold, a swipe begun on a
control in a box that fits pans nothing and ends in `pointerup` on the control it began on
(a touch's pointer is captured to its first target). reka 2.10.1 picks an option on any
`pointerup` (`Select/SelectItem.js:53-60`, which returns only on `defaultPrevented`) and
opens a Select on a touch `pointerup` at its trigger (`Select/SelectTrigger.js:100-101`,
with no such test). Chromium reads reka's half (`nopan`, cured tree, CDP touch, a 150 px
swipe; "no pan" is a document `touchmove` listener that cancels every move):

| Swipe | Chromium pans it | no pan |
|---|---|---|
| up from option 2 of an open 4-option Select | stays open, nothing picked | option 2 picked, the Select closes |
| down from the Select's trigger in the phone drawer's 3-row body | stays closed | the Select opens |

The same holds already on 11.1.1 for a Select opened in a modal Dialog or Sheet, whose
scrim takes the root lock: predicted from the same source, not read. With the keyboard up
(a docked input view) or the page zoomed, WebKit keeps the pan on. Changes: the comment in
`outside.ts` names Chromium for the `pointercancel` and states the iOS path; shape two's
first reason is restated (it holds in Chromium only); the two swipes are steps 1 and 5 of
the iPhone gate (below), and they gate the ship. If either acts on the owner's iPhone, the
11.1.2 build cures it in the same change: a touch that travelled past a slop does not pick
or open. For an option, a `pointerup` prevented before reka's handler reads it is enough;
reka's trigger does not read `defaultPrevented`, so there the travelled `pointerup` has to be
kept from reka's listener. That cure is not written here: the Chromium half shows reka's
step, and only the iPhone shows whether iOS takes this path.

**3. A tap beside a menu or a popover opened in a modal Dialog presses the Dialog.** Taken
as the verifiers' fix (a); their fix (b), the layer at its own plate's z, is not taken. The
paint read (`nested.mjs`, the element at the centre of the open child plate): in `dlg-menu`
and `dlg-pop` it is the Dialog's own line (`p#far2`, `p#far1`; the child's z 130, the
Dialog's 140), on both trees in Chromium 149 and Playwright WebKit 26.5. So by the z tokens
the child paints under its modal parent where they overlap, as the verifiers read from the
tokens, and its layer stands under the parent with it. In `fsheet-menu`, `pop-menu` and
`pop-pop` the child is on top. A layer at its plate's z would stand where this one stands
in every default stack, and would differ only for a child a consumer raises above its
parent; no consumer does (atlas, fourier-analysis, keyframes.js and slides: no `z-modal` or
arbitrary z class on a menu, popover or Select content). The other way round is also
unused: a consumer class that lowers a plate below 130 would put the plate's own layer over
it, since `overlayContentAttrs` merges consumer classes last. The cause is the ladder: a
surface opened in a modal surface stands at `--z-popover` (130), under `--z-modal` (140).
Listed for 11.1.2 as its own row: a menu, a popover or a Select opened in a modal Dialog or
Sheet paints over it, and its outside layer stands with its plate; fix (b) belongs to that
row. This round states the exception in the rule (below), in `outside.ts` and in the third
round's nested table (the hit column). A Select in a modal Dialog is not hit below 30rem
(its outside-pointer lock turns the Dialog's pointer events off, and its sheet form sits at
the foot); its anchored form above 30rem stands under the Dialog by the same tokens, not
read.

**Notes taken.** The engines are named where a reading stood as general behaviour (the
third round's nested paragraph; the ModalScrim comment now says Playwright WebKit 26.5; the
B2 table notes that a listener on an ancestor below `body` was not read). The third round's
re-run paragraph is corrected for the phone drawer's 3-row list. `cure-round2.patch` is
named as superseded. Apple's text: the two HIG Popovers sentences and why the layer takes
UIKit's default (The rule), HIG Sheets for atlas (d), and `Popover.vue`'s doc now says that
an iPhone shows a popover at compact width as a sheet. WebKit's source is cited for the
Safari 26.4 switch (`automaticallyForceEnableScrollingIfNeededToRevealUI`) and for "a box
that does not overflow gets no scroll view". The atlas table gains the entity detail and
dictionary sheets. The detents hand-off is its own patch. The iPhone gate is written out
(below).

**Placement, for the orchestrator.** As of `ca61ce5b6`, `scrim.patch` is named in neither
`driver/glass-11.1.1-exits-scope.md` nor `docs/release-11.1.1/`; 11.1.1 takes it, or the
owner waives it to 11.1.2. The modal scrim's press change has the same standing: in
Playwright WebKit on the tip a tap on any scrim closes nothing, whatever the hold; if the
iPhone shows the same, it can go to 11.1.1 with `answerTap` (`ModalScrim.vue` and the
`answerTap` export). If the build takes `detents.patch`, atlas's condition needs an
outbound row.

**Not taken.** The tie rule of the hand-off (a first move with `|along| <= |across|` goes
to the page) stays, unread on the iPhone (gate step 6). The verifiers' other notes are
recorded as they gave them and need no change: focus after a tap on a layer (a menu and a
popover leave it on `body`, a Select returns it to its trigger; not a regression for a tap
on a non-focusable spot); `SheetContent` spreading `onTouchmove` after `$attrs` (no
consumer binds one; it moves to `detents.patch`); a swipe on a layer leaving reka's
one-shot click listener armed (reka's, unchanged); `PopoverContent` with `portal=false`
(no consumer); a consumer `body { overflow-x: hidden }` and Home Assistant's shadow roots
(no checked consumer; unread); keyframes.js's always-open peek sheet (its `html` and `body`
already hold); 30rem and up on an iPad (unchanged, nothing holds there).

### The iPhone gate

On the 11.1.2 candidate in Safari on the owner's iPhone. The candidate's URL is the build's
to name: the harness page here is served only locally. Note the iOS version first
(Settings > General > About). Steps 1 and 5 gate the ship (item 2 above).

1. Scroll the page a little, open a 4-option Select, and swipe up and down on the options:
   the page stays still, the Select stays open, nothing is picked.
2. Open a long Select and swipe on its list: the list scrolls and the page does not.
3. Open a Select, a menu and a popover in turn, and tap the page beside each: each closes
   and nothing under the finger is pressed.
4. Open the filter drawer and swipe on its list, its header, and the strip of page above
   it: the page does not move and the drawer stays open.
5. In the drawer, start a swipe on a Select's field: the Select does not open.
6. With the drawer's list at its top, pull down: the drawer follows the finger. At the top
   rung, swipe up: the list scrolls. Swipe sideways on a row of chips: the chips scroll.
   (With `detents.patch` only.)
7. Tap the dim area of a Dialog, a Sheet and the Command palette: each closes. In a Dialog
   with a text field, type in the field, then tap the dim area of a Dialog that refuses to
   close: the caret stays in the field and the keyboard stays up.
8. Open and close a sheet with detents: the dim fades in and out with it and never appears
   or vanishes at once.
9. In a Dialog with a menu, open the menu and tap a button on the Dialog beside it: note
   whether the button acts (item 3: on Chromium and Playwright WebKit it does, and the menu
   paints under the Dialog where they overlap).
10. At every open and close, watch the address bar and the page: neither jumps.
11. Scroll until the toolbar shrinks, then repeat steps 1 and 4.
12. Open a surface and start a swipe at once, without lifting (b/317941).

### What the third round changed

The second round's two verifiers found seven blocking items. The third round read them on
two fresh trees of `release/11.1.1` at `ca61ce5b6` (`git archive`, plain directories under
`.claude/worktrees/`): `ps3-plain` as it is and `ps3-cure` with both patches. Readings are
in `harness/data/r3/`: Playwright Chromium 149.0.7827.55 (headless shell) and Playwright
WebKit 26.5, 390x844, device scale 3, by tap, one browser per run and a new context per
cell. `harness/nested.mjs` reads the new cells; the page (`harness/app/Page.vue`) takes the
verifiers' cells and adds `pop-pop`, a Popover opened inside a Popover. "Round 2" below is
the verifiers' reading of the second round's cured tree.

**1 and 6. A tap on a parent beside a child closed both.** The child's outside layer sat in
no `[data-dismissable-layer]`, so reka's `isLayerExist` (`DismissableLayer/utils.js:8-15`)
counted a press on it as outside every open surface, the parent included. The layer now
carries reka's marker, `data-dismissable-layer` (`outsideAttrs`). reka counts a press as
inside a surface when the pressed element's layer is that surface's or comes after it in
the document. The child is authored after its own layer, so a press on the layer is outside
the child, which closes. The parent comes before the layer, so the same press is inside
the parent, which stays open. A Select child disables outside pointer events and was not
affected. The cells, by tap:

| Cell | (a) tap on the parent's plate beside the child: plain / round 2 / round 3 | (a) what the tap landed on: plain / round 3 | (b) tap on the press target with the child open: plain → round 3 |
|---|---|---|---|
| `dlg-menu`: DropdownMenu in a modal Dialog | child closes, parent stays / the same / the same | the Dialog's line / **the Dialog's line** | both close, 0 → child closes, parent stays, 0 |
| `dlg-pop`: Popover in a modal Dialog | child closes, parent stays / the same / the same | the Dialog's line / **the Dialog's line** | both close, 0 → child closes, parent stays, 0 |
| `fsheet-menu`: DropdownMenu in a `modal={false}` bottom Sheet | child closes, parent stays / **both close** / child closes, parent stays | the Sheet's row / the child's layer | both close, **1** → child closes, parent stays, 0 |
| `pop-menu`: DropdownMenu in a Popover | child closes, parent stays / **both close** / child closes, parent stays | the Popover's line / the child's layer | both close, **1** → child closes, parent stays, 0 |
| `pop-pop`: Popover in a Popover | not read / not read / child closes, parent stays | the Popover's line / the child's layer | both close, **1** → child closes, parent stays, 0 |

The count is the press target's clicks. Chromium 149 reads every cell as the table says.
Playwright WebKit 26.5 reads the same, except that on the plain tree (b) leaves both
Dialog cells open: the tap lands on the modal scrim, which sends no click there (B2,
below). In round 3 a second tap on the press target closes the parent: with nothing
pressed under a Dialog's scrim or a Popover's layer, and with the target pressed under the
non-modal Sheet, which lays no layer (item 5). So in Chromium 149 and Playwright WebKit 26.5,
by tap at 390, one tap beside a stack of surfaces closes the top one, and a tap on the page
beside a menu opened from a Popover no longer closes both at once. The iPhone was not read.

The fourth round added the "landed on" column from the same files (`data/r3/nested-*.json`,
`hitBefore`; the same in both engines). In `dlg-menu` and `dlg-pop` the tap lands on the
Dialog's own line (`p#far4`, `p#far2`) on both trees, so a control there is pressed as the
child closes: the exception in the rule (fourth round, item 3).

Consumers whose own outside-press code names their surfaces by selector see the layer as
outside them. atlas's arbiter is one (the last row of the atlas table, below). fourier's
FullscreenViewer keeps presses inside `[role="menu"]`, which the layer does not carry
(read by the verifiers in source). Either can take `[data-dismissable-layer]`.

**2. A non-modal Dialog's layer covered the Select opened in it.** Answered by item 5: a
`modal={false}` Dialog lays no layer. `ndlg-sel`, a tap on the last of six options: plain
picks `w6`; round 2 hit `div[overlay-outside]` and picked nothing; round 3 picks `w6`, the
option itself under the finger, in Chromium 149 and Playwright WebKit 26.5. The modal
control `dlg-sel` picks `w6` on every tree. A Select, menu or Popover child's own layer
stands at `--z-popover` (130), under a Dialog plate at `--z-modal` (140).

**3. The detents hand-off took a horizontal pan.** `sheetTakes(along, across)` now gives the
press to the sheet only when the move along the axis is larger than the move across it, and
the first move with a direction decides for the rest of the press, so a touchmove the sheet
does not take is never cancelled. Chromium 149, CDP touch, `det-chips` and
`pdrawer-chips`, a chip row (`overflow-x: auto`, 24 chips) at the top of the body, a 240 px
swipe to the left; the row's `scrollLeft`, plain / round 2 / round 3:

| Sheet, rung, vertical drift | plain | round 2 | round 3 |
|---|---|---|---|
| modal, rungs 0.4, 0.7, 1, at 0.7: none | 365 | 345 | 336 |
| the same, 8 px down | 318 | **0** | 337 |
| the same, 8 px up | 328 | **0** | 334 |
| the same at the top rung, 8 px down | 359 | **0** | 338 |
| the same at the top rung, 8 px up | 348 | 225 | 345 |
| atlas's drawer shape (non-modal, 0.9 and 1) at 0.9, 8 px down | 350 | **0** | 369 |
| the same, 8 px up | 299 | **0** | 376 |

The plain and round-3 columns are this round's runs; round 2's are the verifiers' (their
plain run read 297 to 392). The sheet's rung did not move in any round-3 cell. The swipes
that decide for the sheet are unchanged (atlas (d), below: the same steps on both trees as
in the second round).

**4. A mouse press lifted outside the sheet stayed armed.** The pending press is now
followed on the document (`pointermove`, `pointerup`, `pointercancel`, capture phase), so a
lift anywhere ends it. Chromium 149, mouse, `det-chips` at 390 and at 1280 wide: a press on
a body row, one move to 60 px above the sheet, a lift there, then a hover down across the
body with no button. Round 2: the hover dragged the sheet from 0.7 to 0.21 with
`data-dragging` set. Round 3: the press decides for the sheet on its one move and starts
the drag where the pointer is, the lift ends it at 0.7, and the hover moves nothing
(`dragging` false). A body press dragged down 150 px then follows (0.54 before the lift)
and settles at 0.4. The plain tree starts the drag at the press, so there the one move
raises the sheet to its top rung. The verifiers' other fix shapes were not needed: pointer
capture at the press would retarget the click of a row, and `buttons` is not read.

**5. B1: the rule was wrong for non-modal Sheets and Dialogs.** Taken as the verifiers
proposed: a `modal={false}` Sheet or Dialog keeps the root lock and lays no layer. The rule
(below) is rewritten with Apple's text, and so is shape two's third reason. A tap beside
such a sheet does what it does on 11.1.1: it presses what is under the finger, and reka's
non-modal arm closes the sheet unless the consumer prevents it. The phone drawer by tap,
plain → round 3: with atlas's prevent, a tap on the press target leaves the drawer open and
presses the target (1 → 1; round 2 pressed nothing), in Chromium 149 and Playwright WebKit
26.5. Without the prevent, a tap on the press target closes it and presses (1 → 1), and a
tap on a plain block of the page closes it in Chromium; in WebKit it closes only when the
tapped element answers a click (B2's table), as on 11.1.1. A non-modal Sheet keeps its ✕,
its Escape and, with detents, its drag. A swipe beside it is still held, because WebKit has
no CSS hold scoped to the plate: the beside swipe moved the page 0 in round 3 (-302 and
-319 on the plain tree, Chromium by touch).

**7. B3: the detented scrim cuts on 11.1.1.** Listed for 11.1.1 (B3, below) and cut out as
`scrim.patch`. The law also changed: it ramps to the ladder's lowest rung above 0, where
the second round's kept the 0.28 floor for a ladder whose first rung is 0.

**Notes.** The citations are corrected (B2 below; Apple's text under The rule). "From 30rem
up nothing changes" now names what changes at every width. The owner's question says that
the hold is CSS alone, not the patch. The dock row of the atlas table says what "leaves the
dock" meant. atlas's "Every tier" pop-up is a glass Popover and has the View dial's answer.
The pen note is answered with a reading of reka (B2 below), with no change. atlas (d) on
atlas as mounted is now a condition for atlas's upgrade (atlas (d), below). The detented
cells were re-read in WebKit, but not at a lower load (Witnesses, below). `audit/INBOUND.md`
now holds one O-423 row (line 413); this round did not edit it.

### The rule

Below 30rem (`useSheetWidth`):

- a swipe begun on an open glass surface or beside it never moves the page;
- a tap beside an open menu, popover or Select closes it and presses nothing under it, as
  on an iPhone, with one exception: beside a menu or a popover opened in a modal Dialog or
  Sheet, the tap that closes it lands on the modal plate and presses what is under it
  there (the fourth round's item 3);
- a tap beside an open `modal={false}` Sheet or Dialog reaches the page, as beside an
  iPhone's nonmodal sheet.

A modal surface did this already through its scrim, and its scrim now answers a tap in
WebKit. Every non-modal surface now holds the page through the root lock while it is open
at this width: the Select, the DropdownMenu, the ContextMenu (it renders through
`DropdownMenuContent`), a Popover opened by a press, and a `modal={false}` Sheet or Dialog.
The first four also lay a clear layer under their plate that takes every touch beside it.
One tap on that layer closes its own surface only, so a surface opened from another closes
first and the parent stays open. The Sheet and the Dialog lay no layer. The root lock
still holds a swipe begun beside them, because WebKit has no CSS hold scoped to a plate
(a plate-scoped hold would be a script cancel, shape two below). A Popover's hover arm
holds nothing: a fine pointer opened it, and on a coarse pointer the Popover uses its
press arm.

What Apple documents, read on developer.apple.com on 2026-11-23:

- UIKit, `UIPopoverPresentationController.passthroughViews`: "When a popover is active,
  interactions with other views are normally disabled until the popover is dismissed."
- HIG, Popovers: "a popover generally closes when people click or tap outside its bounds
  or select an item in the popover."
- HIG, Context menus: the system animates the preview, "dimming the screen behind the
  preview and the menu."
- UIKit, `UISheetPresentationController.largestUndimmedDetentIdentifier`: "Without a
  dimming view, the undimmed area around the sheet responds to user interaction, allowing
  for a nonmodal experience."
- HIG, Sheets: "When a nonmodal sheet is onscreen, people use its functionality to affect
  the parent view without dismissing the sheet."
- HIG, Popovers: "Avoid displaying popovers in compact views." and "Reserve popovers for
  wide views; for compact views, use all available screen space by presenting information
  in a full-screen modal view like a sheet instead." (read 2026-11-24, as the next two.)
- HIG, Popovers: "When possible, let people close one popover and open another with a
  single click or tap." and "Avoid displaying a popover that emerges from another."

Beside Apple's nonmodal sheet the page also scrolls. Glass holds that scroll below 30rem,
because in WebKit the root's hold is the only CSS hold for a swipe begun on the sheet.

At compact width an iPhone shows a popover as a sheet, and UIKit's popover takes the tap
beside it by default (`passthroughViews`), so below 30rem the layer takes the tap and a
second tap opens the next surface. The single-tap switch the HIG asks for "when possible"
is kept where it is asked for, in wide views: from 30rem up glass lays no layer, and one
tap on another trigger closes the open surface and opens the other, as on 11.1.1 (from
reka's source; not read here).

From 30rem up the hold and the layer do not apply. The scrim's press change, the scrim law
and the detents hand-off apply at every width.

### Shape one against shape two (VERIFY B1)

VERIFY offered two fixes: narrow the hold to the surfaces that cover the page (shape two),
or keep it for every non-modal surface and restate the rule (shape one). The patch takes
shape one, with the outside layer added. Shape two lost on three counts; the first holds in
Chromium only (fourth round, item 2):

- **In Chromium, a plate-scoped hold turns a swipe into a press and the root lock does
  not.** Holding only a plate that fits needs a script `touchmove` cancel, because WebKit
  gives CSS no hold on a box with no overflow (b/243452). A touch whose moves are cancelled
  is not taken by the browser's pan, so it ends in `pointerup` where a pan would have sent
  `pointercancel`. reka opens a Select on a touch `pointerup` and picks a Select option on
  any `pointerup`, so a swipe that starts on a control acts on it. Read in Chromium
  (`follow.mjs`, the "try" cells): a 150 px swipe begun on a Select's trigger inside the
  phone drawer leaves the Select closed without the cancel and opens it with the cancel.
  Under the root lock Chromium still pans, so the same swipe ends in `pointercancel`. On
  iOS the root lock turns the page's pan off (WebKit's `_updateScrollViewForTransaction:`,
  fourth round, item 2), so a swipe begun on a control in a box that fits ends in
  `pointerup` under either shape, and this count does not separate them there.
- **It would be two mechanisms for one rule.** The surfaces that cover the page need the
  root lock anyway, for the swipe beside the plate.
- **It leaves live what iOS holds, for menus and popovers.** UIKit disables other views
  while a popover is active (`passthroughViews`), and the system dims the screen behind a
  context menu (both quoted under The rule). This reason does not hold for a nonmodal
  sheet, which Apple leaves live beside it; the third round lays no layer for one.

VERIFY's three false prop docs are rewritten: `modal` on `DropdownMenu.vue`,
`ContextMenu.vue` and `Popover.vue` now says that below 30rem an open non-modal surface
holds the page and that a tap beside it closes it without pressing the page. The comments
in `SelectContent.vue`, `DropdownMenuContent.vue` and `root-scroll-lock.ts` say the same.
The LIVE-BEHIND contract in `sheet/styles.css` says that the page behind a non-modal sheet
keeps focus and pointer events, and that below 30rem its scroll holds still.

atlas's live-behind uses under the rule (atlas production read in its source at `62405c0`,
not run; the fourth round added the entity detail and dictionary rows):

| atlas surface | below 30rem with the patch |
|---|---|
| chart options Popover (`charts/legend/VizOptions.vue`, "page stays live behind") | holds the page; a tap beside it closes it and presses nothing |
| "Every tier" (`charts/legend/LegendTierSeat.vue`, a glass Popover) | the same: it opens on pointer intent only for a mouse or a pen, and a touch opens it by a press, on the press arm |
| `EasterEgg` (`editorial/EasterEgg.vue`, hover arm) | with a fine pointer holds nothing; with a coarse pointer it is the press arm and holds |
| dock settings menu (a DropdownMenu) | holds; a tap beside the menu closes it and presses nothing. The layer carries the dock's portal stamp, so the dock counts the tap as its own and does not collapse |
| filter drawer (`filter/ui/FilterPanel.vue`, non-modal, detents 0.9 and 1) | holds the page's scroll; a tap beside it reaches the page, as on 11.1.1. atlas's `@interact-outside` prevent keeps it open, and atlas's own `useDismissArbiter` closes it on an outside pointer |
| entity detail (`interaction/EntityDetail.vue`, non-modal; below 768 px a bottom sheet with detents at its first rung, 0.5 or lower, and 1; kept open while marks are tapped) | below 30rem the page above the sheet's lower rung no longer scrolls while the sheet is open; a tap on a mark beside it still reaches the page (no layer), and atlas's `@pointer-down-outside` decides whether it closes. A finger-up on its body at the top of the list below the top rung raises the sheet first (atlas (d), below) |
| data viewer's dictionary sheet (`platform/provenance/DataViewerRoute.vue`, non-modal, bottom below 768 px) | below 30rem the page holds while it is open; a tap beside it reaches the page, and with no prevent bound, reka's non-modal arm closes it, as on 11.1.1 |
| a dock menu opened while the drawer is open | a tap on the drawer beside the menu lands on the menu's layer. Glass closes the menu and leaves the drawer open. atlas's arbiter closes the drawer as well, because its `within` (the panel, the dock's Filters trigger, the lists the drawer owns) does not take the layer; on 11.1.1 the tap lands on the drawer and atlas keeps it. Read in atlas source at `62405c0`, not run. atlas's `guards` can take `[data-dismissable-layer]`, as they take its own open lists |

atlas shows its bottom drawer up to 767 px. From 480 px to 767 px glass does not hold it.

### The changes

`cure.patch`:

- `_shared/overlay/outside.ts` (new): `useOverlayOutside(open, modal)` takes the root lock
  while the surface is open below 30rem and not modal. `outsideAttrs(zIndex, portal)` is
  the clear layer: `fixed inset-0`, `aria-hidden`, reka's layer marker
  `data-dismissable-layer`, authored before the plate in the same portal, with an empty
  click listener (`answerTap`).
- `SelectContent.vue`, `DropdownMenuContent.vue`, `PopoverContent.vue` (press arm only):
  the call and the layer at `--z-popover`, carrying the dock's portal stamp when a dock
  opened the surface. `DialogContent.vue` and `SheetContent.vue`: the call and no layer.
- `ModalScrim.vue`: it prevents its own `mousedown`, not its `pointerdown` (reka's
  overlay, which it copies, prevents every `pointerdown`), and listens for click
  (`answerTap`), so a tap on a modal scrim closes in WebKit and focus stays in the dialog
  (fourth round, item 1).
- Prop docs and comments, as listed above.

`detents.patch`:

- `sheet/detents/use.ts`: a press in the body at its leading edge is pending, and its first
  move with a direction decides. A move mostly across the axis is let go, and the browser
  pans what is under the finger (a row of chips). Along the axis, toward dismissal or
  toward expansion below the top rung, the press is the sheet's, and the sheet follows once
  it has travelled 6 px (`DRAG_SLOP`); toward expansion at the top rung it is let go, and
  the list scrolls. The pending press is followed on the document, so a mouse press lifted
  outside the sheet ends. A new non-passive `onTouchmove` on the sheet cancels every
  touchmove of a press the sheet has taken. The grip and header drag at once, as before.
- `SheetContent.vue`: the one line that binds `onTouchmove` on a detented sheet.

`scrim.patch`:

- `sheet/motion.ts`: `scrimDetentOpacity(t, ladder)` is 0 at dismissal and rises with t to
  the old law (0.28 + 0.44 t) at the ladder's lowest rung above 0; at and above that rung
  the law is unchanged. `SheetContent.vue` passes its ladder. The function is exported from
  `sheet`, so its new second argument is a clean break for a consumer that calls it; a
  call with one argument throws at `ladder.filter`, so it fails loud. atlas and
  fourier-analysis do not call it (the third round's verifiers).
- `tests/components/sheet/sheet-motion.test.ts`: three tests for the new scrim law.

### B2 and atlas (e): dismissal by touch

reka's outside press, for a touch, does not act on the `pointerdown`: it waits for a
`click` on the document (`DismissableLayer/utils.js:40-56`). Which taps make a click was
read with `harness/tapclick.mjs`: one static page per case, a box tapped once at 390 with
`isMobile` and `hasTouch`, and only the document listening (in the capture phase, as reka
listens):

| Case | Chromium 149 | Playwright WebKit 26.5 |
|---|---|---|
| a div, nothing but the document listens | click | **no click** |
| a div with its own click listener | click | click |
| the same, its `pointerdown` prevented (reka's overlay, glass's `ModalScrim`) | click | **no click** |
| the same, its `pointerdown` prevented only for a mouse | click | click |
| `body` at `pointer-events: none` (an open Select), the tap on the page | click (on `html`) | **no click** |
| the same with a clear layer over the page that listens for click | click (layer) | click (layer) |
| the same layer with no listener | click (layer) | **no click** |

So in WebKit a tap closes a surface only when the tapped element itself listens for click
and its `pointerdown` was not prevented. (A listener on an ancestor below `body` was not
read; the second round's first page put one on `body` itself.) Preventing the element's
`mousedown` instead leaves the click (the fourth round's `own-md` and `field-own-md` rows).
Apple's Safari Web Content Guide (Handling Events, One-Finger Events) states the rule: "If
the user taps a nonclickable element, no events are generated. If the user taps a clickable
element, events arrive in this order: mouseover, mousemove, mousedown, mouseup, and click."
The guide does not say what makes an element clickable; on this page an element's own click
listener did, and a prevented `pointerdown` undid it. Playwright WebKit reproduces it; the
iPhone was not read. (The second round cited b/267688 here. That bug is "[popover] Light
dismiss doesn't work on iOS/iPadOS", about the HTML `popover` attribute, resolved in Safari
18.3, and does not state this rule.)

On the plain tree every tap beside a surface lands on something that fails it: the page
(no listener), `html` (under a Select's `pointer-events: none`), or a modal scrim
(`pointerdown` prevented). The patch gives the outside layer an empty click listener
(`answerTap`), and the modal scrim the same listener with its `mousedown` prevented in
place of its `pointerdown` (the third round prevented a `pointerdown` that was not a
touch; the fourth changed it, item 1). reka acts on a mouse's or a pen's own `pointerdown`
and waits for a click only after a touch (`utils.js:51-54`), so a pen tap on the scrim
closes the dialog without a click. reka's `dist` is not edited. A first form of this
page (`data/r2/tapclick-v1-*.json`) let `body` listen for click under every box, so it
showed only the prevented `pointerdown`.

The layer also ends the press-through (atlas (e)): it lies over the page, so the closing tap
lands on it and not on the page under the finger. The cut cells, plain → cured, `closed`
and the press target's count (`.ps-press`, a button at the top right):

| Route | Chromium 149, plain → cured | WebKit 26.5, plain → cured |
|---|---|---|
| Select: tap beside it | closed → closed | **open** → closed |
| Select: tap on the press target | closed, 0 → closed, 0 | **open** → closed, 0 |
| Select: second tap on its trigger | closed → closed | **open** → closed |
| Select with a 134 px trigger: tap beside it | closed → closed | **open** → closed |
| Select in a dock: tap beside it | closed → closed | **open** → closed |
| Select inside the phone drawer: tap beside it | closed → closed | **open** → closed |
| DropdownMenu: tap beside it | closed → closed | **open** → closed |
| DropdownMenu: tap on the press target | closed, **1** → closed, 0 | closed, **1** → closed, 0 |
| Popover: tap beside it | closed → closed | **open** → closed |
| Popover: tap on the press target | closed, **1** → closed, 0 | closed, **1** → closed, 0 |
| phone drawer, atlas's prevent: tap beside it | open → open | open → open |
| phone drawer, atlas's prevent: tap on the press target | open, 1 → open, 1 | open, 1 → open, 1 |
| phone drawer without the prevent: tap beside it | closed → closed | open → open |
| phone drawer without the prevent: tap on the press target | closed, 1 → closed, 1 | closed, 1 → closed, 1 |
| Command palette, Sheet, detented Sheet, Dialog: tap on the scrim | closed → closed | **open** → closed (with the scrim listening for click but still preventing the touch's `pointerdown`: **open**) |

The four phone drawer rows are the third round's (`data/r3/cuts-*.json`; the plain column
for atlas's prevent is the second round's, on the same `src`): the drawer lays no layer now,
and a tap beside it does what it does on 11.1.1. The second round's layer read `open, 0` and
`closed, 0` on the two press rows, and closed the free drawer on a tap beside it in WebKit.

### B3: the detented Sheet's scrim

**For 11.1.1.** The cut is on the 11.1.1 tip, and it breaks 11.1.1's own gate (no exit
completes in under two frames). Re-read on `ca61ce5b6` (`data/r3/cuts-*-plain.json`), by
tap at 390: in Chromium 149 the scrim appears at 0.28 in one frame 10 to 15 ms after the
tap on every route, and vanishes from 0.28 in one frame at 744 to 757 ms (1,060 ms after a
drag); in Playwright WebKit 26.5 the first frame that has a scrim shows 0.28 at 44 to 49
ms with the plate still below the screen, and the scrim vanishes from 0.28 in one frame at
770 ms (Escape) and 795 ms (the ✕). A tap on the scrim does not close it there. The cure
does not depend on the hold, so the third round cut it out as `scrim.patch`
(`sheet/motion.ts`, the one call in `SheetContent.vue`, three tests), which applies alone
to the tip. 11.1.1 takes it, or the owner waives it to 11.1.2, where the build takes it
with `cure.patch`.

`cuts.mjs` now judges the scrim as it judges the plate: a scrim cut is a frame under 0.02
followed by one at 0.1 or more (it appears), or the reverse (it vanishes). It also records
each frame's scale and filter.

On the plain tree every detented route cuts twice in Chromium: the scrim appears at 0.28 10
to 16 ms after the tap and vanishes from 0.28 at 744 to 756 ms (1,044 and 1,444 ms after a
drag, in two runs).
In Playwright WebKit 26.5 by tap the first frame that has a scrim shows 0.28 while the
plate is still below the screen, and the scrim vanishes from 0.28 at 757 to 767 ms. On the
cured tree the scrim rises with the sheet from 0 (Chromium 0, 0.014, 0.046, 0.104, 0.138
over 11 to 61 ms; WebKit 0, 0.014, 0.054, 0.082, 0.124 over 21 to 63 ms) and falls with it
to under 0.001 by 382 to 399 ms after the close, in both engines.

Two Chromium runs of the detented cells alone, at a load of 36 to 60, dropped frames on
both trees. On the cured tree one open read "scrim appears" (0.014 → 0.105) across a 34 ms
gap in which the plate also moved 90 px, and three closes read "jumps" of 128 to 160 px,
each across a dropped frame. The close follows the same curve on both trees (it crosses
y 600 at 127 to 182 ms and the foot, 840, at 352 to 376 ms), and the spring is not changed.
The last Chromium run on the cured tree dropped no frame and reads no cut and no jump in
any of its 48 cells (`data/r2/cuts-chromium-cure.json`). In WebKit the cured run before the
scrim's press change (`cuts-webkit-cure-pd.json`, 46 cells, no dropped frame) reads no cut
and no jump. The run after it (`cuts-webkit-cure.json`) dropped frames in four cells, the
detented Sheet's three and one drawer close, and those four read "scrim appears" or
"jumps" at or just after a frame gap of 22 to 69 ms. The press change touches neither the
sheet's motion nor its scrim's opacity, and the other 42 cells read nothing.

### Atlas (d): which way a press on the detented list goes

`follow.mjs`, Chromium 149 by CDP touch, a swipe of 220 px on the list, read 900 ms after
the lift (the sheet's rung scalar `t` and the list's `scrollTop`):

| Step | phone drawer (rungs 0.9, 1), plain → cured | detented Sheet (0.4, 0.7, 1), plain → cured |
|---|---|---|
| open | t 0.9 | t 0.7 |
| finger up, list at its top, below the top rung | t 1 and list 272 → t 1, list 0 | t 1 and list 311 → t 1, list 0 |
| finger up, list at its top, at the top rung | list 304 → list 303 | list 316 → list 301 |
| finger down on the scrolled list | list 0 → list 0 | list 3 → list 15 |
| finger down, list at its top | t 0.9 → t 0.9 | t 0.7 → t 0.7 |

atlas's (d), "the list does not follow a finger", does not reproduce on 11.1.1 in Chromium
(atlas read glass 10.1.2). What 11.1.1 does is mix the two: one swipe up both raises the
sheet and scrolls the list. With the patch the first move decides, and the rest of the
swipe belongs to the sheet or to the list. Apple's HIG, Sheets (read 2026-11-24): "A
resizable sheet expands when people scroll its contents or drag the grabber", so the first
finger-up on a list at its top raises the sheet below its top rung, and the list scrolls
once the sheet is at its top rung.

The hand-over. The body keeps `touch-action: auto`, so the browser may pan it.

- The first move with a direction decides, and the decision holds for the rest of the
  press. A move mostly across the axis is not the sheet's (third round, item 3).
- Once the press is the sheet's, `onTouchmove` cancels every touchmove, so the browser
  starts no pan, and the sheet follows once the finger has travelled 6 px along the axis.
- A press that is not the sheet's is let go: no touchmove of it is cancelled, the browser
  pans the list or the row, and its `pointercancel` ends the press.
- Chromium waits for its own touch slop before it pans, and every `touchmove` before that
  is cancellable; the readings above are this path.
- WebKit was not read: Playwright WebKit cannot move a finger. The engine decides on the
  first `touchmove` so that the cancel comes before WebKit can start a pan. A first move of
  a pixel or two decides as well; whether that matches an iPhone finger is unread. An
  iPhone reading is owed.

In the probe's sequence the cured phone drawer's 40-row list did not scroll on the first
finger-up: the sheet rose from 0.9 to 1 instead (third round: list 273 on the plain tree,
0 on the cured one, `data/r3/follow-*.json`). atlas caps the plate at `90dvh`, so on atlas
that rise moves nothing on screen and the first swipe is lost; atlas seats the drawer at
0.9 on every open, so every open loses one. On 11.1.1 the same swipe raises the sheet and
scrolls the list at once. So atlas should not take the hand-off until it drops the 0.9 rung
or the cap; with either gone the swipe scrolls the list at the top rung. The fourth round
cut the hand-off out as `detents.patch`, so the hold can ship to atlas without it; the
condition needs an outbound row to atlas if the build takes `detents.patch`.

### Atlas (f): a swipe on the page beside the drawer

Held, and the drawer stays open. The beside swipe (finger down from (40, 20), finger up
from (40, 76), the strip above the phone drawer) moved the page −284 to −312 px on the plain
tree and 0 on the cured one, in Chromium by touch. Glass does not close a surface on a
swipe: reka closes on the click that ends a tap, and a swipe sends none. After the beside
swipes every surface in the probe was still open, on both trees. atlas's arbiter closes its
drawer on any outside `pointerdown`, a swipe included; that is atlas's to keep or drop. The
third round lays no outside layer for the drawer and keeps its hold: the beside swipe still
moves the page 0 (`data/r3/cure-chromium.json`, -302 and -319 on the plain tree).

### Atlas (b) and (c), re-read on the base tree

Read on the base tree (`108fd6051`'s `src`, the same as `4f1fa667e`'s) by `cuts.mjs`, by
tap, every frame; the drawer is atlas's as atlas mounts it (`s=pdrawer`):

- **(b), the drawer.** Chromium: it opens at its full 760 px and rises by translate (no
  203 px first frame); it closes by shrinking to a 171 px floor by about 180 ms while it
  slides, and is below the screen by about 370 ms. No held stub, no cut. Playwright WebKit
  26.5: the same, at 171 px by about 200 ms and below the screen by about 390 ms.
- **(c), the selects.** The Select alone, with a 134 px trigger (atlas's year select), in a
  dock and inside the phone drawer closes by a slide and a fade at a constant 390 px width
  in both engines, with no step over 9 px between frames in Chromium and none over 19 px in
  WebKit (about 16 ms a frame there); the box never narrows.
- **(c), the Popover.** It closes by a fade of about 250 ms at scale 1 and `blur(0px)`
  throughout, with its box still, in both engines; no snap back to its opening shape. It
  also opens at scale 1 and `blur(0px)`, so 11.1.1 has no blurred opening shape to return
  to.

Neither (b) nor (c) reproduces on 11.1.1 in either engine, so nothing from them goes to
the 11.1.1 list. atlas measured glass 10.1.2 in production.

### Witnesses

`harness/data/r2/` (`plain-*.json` and `cure-*.json` per lane, `cuts-*.json`), one browser
per run, a new context per cell. Page scroll after each swipe, plain → cured; "beside" is
the swipe on the page next to the surface. The probe lanes ran on the cured tree before the
scrim's press change, which touches no hold; the cuts were read again after it.

| Surface | Chromium 149, touch | WebKit 26.5, wheel |
|---|---|---|
| Select, 4 rows | beside **-303/+70** → 0 | list **-120/+220**, beside **-220/+65** → 0 |
| Select, 40 rows | beside **-291** → 0; list scrolls +301 → +301 | beside **-220/+65** → 0; list scrolls +220 → +220 |
| Select, 134 px trigger, 4 rows | beside **-299/+70** → 0 | list **-120/+220**, beside **-220/+65** → 0 |
| Select in a dock, 4 | beside **-303/+71** → 0 | list **-120/+220**, beside **-220/+65** → 0 |
| Select in a dock, 40 | beside **-296** → 0; list scrolls +300 → +307 | beside **-220/+65** → 0; list scrolls |
| CommandDialog, 4 and 40 | 0 → 0 | 0 → 0 |
| bottom modal Sheet, 3 and 40 | 0 → 0 | 0 → 0 |
| right drawer (atlas's earlier mount), 3 | plate **-19/+257**, list **-297/+271**, beside **-271/+70** → 0 | plate **-30/+220**, list **-220/+220**, beside **-220/+65** → 0 |
| right drawer, 40 | plate **-18/+306**, list **-296**, beside **-277/+68** → 0; list scrolls +309 → +302 | plate **-30/+220**, list **-220**, beside **-220/+65** → 0 |
| phone drawer (atlas production: bottom, detents 0.9 and 1), 3 | list **-267**, beside **-312** → 0 | list **-220/+220**, beside **-220/+65** → 0 |
| phone drawer, 40 | beside **-284** → 0; list scrolls +295 → the sheet rises to 1 | beside **-220/+65** → 0; list scrolls +220 → +220 |
| detented Sheet, 40 | 0 → 0; list scrolls +303 → the sheet rises to 1 | 0 → 0 |
| Dialog, 2 and 40 | 0 → 0 | 0 → 0 |
| Popover, 2 lines | beside **-299/+71** → 0 | list **-220/+220**, beside **-220/+65** → 0 |
| Popover, 30 | beside **-299** → 0 | beside **-88** → 0 |
| DropdownMenu, 4 | beside **-315/+65** → 0 | list **-220/+220**, beside **-220/+65** → 0 |
| DropdownMenu, 40 | beside **-280** → 0 | beside **-88** → 0 |

Bold is the page moving (finger down / finger up, px, 800 ms after the lift); a cell with
no swipe named moved the page 0. Every list that overflows still scrolls on the cured tree,
except where the first finger-up on a detented list now raises the sheet to its top rung
(atlas (d) above); the next finger-up scrolls the list. No open or close moved the page in
any lane. The WebKit tap lane (a state read: the root's `overflow-y` while open) reads
`visible` on the plain tree and `hidden` on the cured one for every non-modal surface, and
`visible` again after every close. The controls are unchanged: the bare page scrolls about
300 px a swipe in Chromium and 220 by wheel in WebKit, and the fitting `contain` box passes
the wheel to the page in WebKit (-155 / +220) on both trees.

**The third round's re-run** (`data/r3/`, `summarize.py --dir data/r3`). Every probe lane
ran again on both new trees. In Chromium 149 by touch every cell reads as the table above,
with one exception: each RED cell of the plain tree is RED again (beside -295 to -321; the
right drawer's plate -19 and +297 to +305, its list -287 to -299 and +301) and 0 on the
cured tree, except the phone drawer's 3-row list, which read -111/-267 in round 2 and 0/0
in round 3 on the plain tree (the fourth round found this). In round 3 the plain detents
engine took the press at y 226; in round 2 the swipe began at y 413 while the sheet was
still rising. So the table's `list -267` for atlas's production shape rests on one round-2
cell; in Chromium, atlas (a) on the tip rests on the beside swipe and the right drawer, and
in Playwright WebKit by wheel on the list as well. Every list that overflows still scrolls
(+291 to +324), except the first finger-up on the two detented lists, which raises the
sheet. Playwright WebKit 26.5 by wheel, the cells the
change touches (the Select alone and in a dock, the right and phone drawers, the detented
Sheet, the Popover, the DropdownMenu) and the two controls: every cell as the table above,
on both trees. The tap lane (a state read): the root's `overflow-y` reads `visible` on the
plain tree and `hidden` on the cured one while each non-modal surface is open, and
`visible` after every close.

The cuts on the cured tree. Chromium 149: 48 cells, no cut, no jump, one dropped frame (the
right drawer's open by Escape). Playwright WebKit 26.5: 46 cells (the two drags need a
finger), no plate cut. The run sampled about 60 frames a second at a load of 50 and dropped
28 frames across 20 cells. Five cells read a move of 123 to 185 px within one frame of 11
to 29 ms: the phone drawer's close by its ✕, two detented opens and one close, the plain
bottom Sheet's open and the free drawer's open, none of whose motion the patch changes; the
plain tree's detented cells in the same batch read 123 to 223 px. Three detented opens read
"scrim appears" (0.014 → 0.112 to 0.154): in that frame the plate rose 96 to 130 px, and
the scrim, on the same rung scalar, crossed the 0.1 line with it. The lower-load WebKit
re-read the verifiers asked for was not had: the WebKit lock queue held this batch for 50
minutes, and the one-minute load was 49 to 54 while it ran.

`vue-tsc --noEmit -p tsconfig.src.json` on the third round's cured tree: clean
(`harness/logs/r3/vue-tsc-cure.log`). The scrim tests (`sheet-motion.test.ts`, 15 tests):
all pass on the cured tree, and on the 11.1.1 tip the two that read 0 at dismissal fail
("expected 0.28 to be +0", `logs/r3/vitest-motion-*.log`). vitest with 2 workers on the
cured tree (`harness/vitest-r3.sh`, the second round's set): 34 of 35 files and 265 of 267
tests pass, 1 skipped. The one failure is the harness, as in the second round:
`dialog-dismiss.test.ts` names `demo/__phone/Page.vue` (`harness/logs/r3/vitest-cure.log`).

The second round's vitest with 2 workers on the cured tree
(`harness/vitest-r2.sh`: `tests/components/{dialog,menu,command,select,sheet}`,
`tests/components/_shared/menu`, the Select, Popover, Command and ExpandableContainer
contracts, five dock tests that cover portals, posture and collapse, and
`useKeyboardShortcuts`): 34 of 35 files and 264 of 265 tests pass, 1 skipped. The one
failure is the harness again: `dialog-dismiss.test.ts` forbids a dismiss intent under
`demo/`, and the phone-scroll page binds atlas's `@interact-outside` prevent
(`harness/logs/r2/vitest-cure.log`).

### Not run in the second, third and fourth rounds

- No iPhone and no Safari. Every reading is Playwright Chromium 149 or Playwright WebKit 26.5
  on macOS.
- No finger move in WebKit, so atlas (d)'s hand-over in WebKit is not read, and every WebKit
  swipe, the beside swipe included, is a wheel scroll. The 11.1.2 scope's witness, "by
  touch ... in Playwright WebKit", cannot be met for a swipe: Playwright WebKit has no finger
  move, and the record uses the wheel instead. The scope text or the owner should say
  whether that is accepted.
- The swipe that becomes a pick or an open on iOS (fourth round, item 2): WebKit's source
  and reka's half in Chromium, not a device.
- The press-through inside a modal parent (fourth round, item 3) on an iPhone, and the
  paint of a child surface in a modal parent anywhere but the two nested cells.
- The lower-load WebKit cuts re-read the third round's verifiers asked for. The fourth
  round re-read only the four scrim surfaces, at a one-minute load of about 31 to 46.
- Toast and Tooltip plates: the rule's "any glass plate" is read here as the overlay
  surfaces, and neither is in the patch's set.
- iOS 16.4 to 26.3 with the toolbar collapsed (the owner's question below still stands).
- 30rem and wider, an iPad included, where nothing changes.
- A mouse below 30rem, beyond the pending press (third round, item 4): a desktop window
  narrower than 30rem gets the layer and the hold too, so the wheel and the hover over the
  page stop while a menu, popover or Select is open. Not read.
- A first touchmove with no direction is neither cancelled nor judged. Whether iOS commits
  to a pan on it is unread.
- atlas between 480 and 767 px, where atlas shows its bottom drawer and glass does not hold.

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
Chromium acted the same way until 144). What the readings show: the filter drawer moves the
page by touch in Chromium (CDP touch) and by wheel in Playwright WebKit; the short Select
sheet, menu and popover move it only by wheel in Playwright WebKit (`isMobile: false`, a
mouse input), and Chromium 149 holds them by touch. No reading here is a touch swipe in
WebKit. That those three move the page on an iPhone is the owner's report and the WebKit
rule, not a reading. A plate that has no contained scroller at all (the non-modal drawer's
foot and body) leaks in both engines read (Chromium by touch, WebKit by wheel).

The root lock that cured D-2's sticky fault already exists (`_shared/overlay/root-scroll-lock.ts`)
but was given only to the modal scrim and ExpandableContainer. Round 1's cure
(`cure-round1.patch`, superseded by the second round's `cure.patch`) gave it to every
surface that covers the page: below 30rem (glass's sheet width, `useSheetWidth`) an open
overlay holds the page through the root lock, unless it is modal and so already holds it.
One module changes (`sheet-width.ts`, five lines of code); Popover, Sheet and Dialog call it,
as Select and DropdownMenu already do. It is CSS doing the holding (`overflow: hidden` on the
root, which the CSS Overflow spec says the UA must not let the user scroll), the page keeps
its position, the root's `scrollbar-gutter: stable` keeps the layout still, and the hold ends
at the close so the page is live while the surface leaves.

## How it was read

(Round 1 and the second round. The third round's trees and readings are under "What the
third round changed", above.)

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
- **WebKit, tap** (Playwright WebKit 26.5, `isMobile`): Playwright WebKit has no touch-move
  input (its protocol has `Input.dispatchTapEvent` only, and a script-made `Touch` is an
  illegal constructor), so this lane drives no swipe. It reads the page and the root through
  open and close by tap: whether the page jumps, and the root's computed `overflow-y` while
  open. That is a state read, not a held swipe.

Not one reading here is iOS Safari. Playwright WebKit is not Safari; what iOS does is cited
from WebKit's source and bug tracker below, and the owner's iPhone reads the cure.

## Readings on the plain tree

Page scroll change, "during / after", for each swipe; `v` finger down, `^` finger up;
`[list +n]` is the list's own scroll. For every surface, every open and every close left the
page where it was (0 px) in every lane.

| Surface | Chromium 149, touch | WebKit 26.5, wheel | WebKit 26.5, tap: root `overflow-y` while open (a state read) |
|---|---|---|---|
| bare page (control) | v -126/-292, ^ +127/+311 | v -220, ^ +220 | n/a |
| fixed `contain` box that fits (control) | 0 / 0 | **v -155, ^ +220** | n/a |
| Select, 4 (fits) | list 0 / 0 | **list v -120, ^ +220** | visible |
| Select, 40 | list 0 / 0, list scrolls +289 | list 0, list scrolls +220 | visible |
| Select in a GlassDock, 4 | list 0 / 0 | **list v -120, ^ +220** | visible |
| Select in a GlassDock, 40 | list 0 / 0, list scrolls +305 | list 0, list scrolls +220 | visible |
| CommandDialog, 4 and 40 | plate 0, list 0; list scrolls +304 | plate 0, list 0 | hidden (root lock) |
| bottom modal Sheet, 3 and 40 | plate 0, list 0; list scrolls +270 | plate 0, list 0 | hidden (root lock) |
| non-modal right drawer (atlas), 3 | **plate v -2/-15, ^ +109/+321; list v -111/-277, ^ +111/+311** | **plate v -30, ^ +220; list v -220, ^ +220** | visible |
| non-modal right drawer (atlas), 40 | **plate v -2/-18, ^ +126/+298; list v -110/-279**, ^ 0 (list +292) | **plate v -30, ^ +220; list v -220**, ^ 0 (list +220) | visible |
| detented Sheet, 40 | plate 0, list 0; list scrolls +205 | plate 0, list 0 | hidden (root lock) |
| Dialog, 2 and 40 | 0; list scrolls +205 | 0 | hidden (root lock) |
| Popover, 2 (fits) | 0 / 0 | **v -220, ^ +220** | visible |
| Popover, 30 | 0; list scrolls +268 | 0; list scrolls +220 | visible |
| DropdownMenu, 4 (fits) | 0 / 0 | **v -220, ^ +220** | visible |
| DropdownMenu, 40 | 0; list scrolls +323 | 0; list scrolls +220 | visible |

The drawer's "plate" swipe is on its foot, the only plate point swiped (its title was not).
The finger-down swipe there starts at y 806 and is clamped at 836, so it travels 30 px, not
220, and `plate v -2/-15` (Chromium) and `-30` (WebKit) understate it.

The scrolling element is `<html>` in every cell. The full tables are `harness/data/*.json`;
`python3 harness/summarize.py` prints them.

What the plain tree says: in Chromium 149 by touch only the non-modal drawer moves the page,
by every route (its plate and its list, both directions, about 300 px a swipe). In WebKit by
wheel every non-modal surface whose content fits moves the page as well: the Select sheet
alone and in a dock, the Popover and the DropdownMenu, by the full wheel travel. A long list scrolls itself and
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
  2026-11-04; Simon Fraser, 2024, proposes putting non-scrollable boxes with `contain` in the
  scrolling tree). The WebKit wheel lane's control reproduces it.
  On iOS a box that does not overflow gets no scroll view, so the swipe goes to the page's:
  WebKit composites an overflow box for scrolling only when it has scrollable overflow
  (`RenderLayerScrollableArea::computeHasCompositedScrollableOverflow`,
  `canUseCompositedScrolling() && (hasScrollableHorizontalOverflow() ||
  hasScrollableVerticalOverflow())`, read by
  `RenderLayerCompositor::requiresCompositingForOverflowScrolling`; WebKit `main` at
  `717884ab0`, 2026-11-24). Source, not a device reading.
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
  `overflow: hidden`, from unexpectedly scrolling. (163660111)". The switch is a WebKit
  preference: in `WKWebViewIOS.mm`, `_updateScrollViewForTransaction:` keeps the page's
  pan on for a collapsed toolbar (`scrollingNeededToRevealUI`) only when
  `automaticallyForceEnableScrollingIfNeededToRevealUI` is set (WebKit `main` at
  `717884ab0`). The same function turns the pan off whenever the main frame cannot scroll:
  `allowedTouchTypes = scrollingEnabled ? … : @[ ]`, with `scrollingEnabled` =
  `hasScrollableOrZoomedMainFrame() || hasDockedInputView || isZoomed ||
  scrollingNeededToRevealUI`, and a root at `overflow: hidden` gives the main frame no
  scrollbars (`LocalFrameView`'s scrollbar modes are `AlwaysOff` unless the page is scaled
  or has a header or footer), so `canHaveScrollbars()` is false. With the keyboard up (a
  docked input view) or the page zoomed, the pan stays on. Two cases are still open:
  [b/317941](https://bugs.webkit.org/show_bug.cgi?id=317941) (2026-06-26), a swipe begun
  within about 100 to 200 ms of the overlay opening, the finger never lifted, can still move
  the page; and [b/299084](https://bugs.webkit.org/show_bug.cgi?id=299084) ("REGRESSION
  (Safari 26): Overflow hidden on body/html no longer works", iOS 26, NEW, last changed
  2025-11-24), which Simon Fraser kept open after 26.1 ("there are still plenty of bugs
  here"). Chromium honours the root's `hidden` for touch.
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
the viewport overflows, scrolls, and holds the page at its ends. This is O-348 (2), and why
atlas saw it in its Chromium on 2026-11-15 and our Chromium 149 does not by touch.

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
consumer's body has `overscroll-behavior: auto`. Every swipe read moved the page, in Chromium
by touch and in WebKit by wheel: on the foot (the one plate point swiped) because nothing on
the way is a scroll container, on the body at its ends because nothing contains it, and on a
short body because it cannot scroll. This is the owner's "the filter drawer scrolls the
entire screen".

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
149 by touch; in WebKit by wheel a panel that fits moves the page by the whole wheel travel
(-220 / +220).

### The DropdownMenu

Non-modal by default for the D-2 reason (`src/components/menu/DropdownMenu.vue:30-36`), so
reka's menu lock (`MenuContentImpl` takes `useBodyScrollLock` only when modal) never runs. Same
plate as the popover; same reading: held in Chromium 149 by touch, -220 / +220 in WebKit by
wheel when it fits.
A dock's menu at sheet width wears the firm plate (`DropdownMenuContent.vue:86-89`) on the same
plate rules, so it should leak the same way; it was not read separately.

## The cure (round 1, superseded)

The second round's rule and patch (top of this record) replace this section's. What follows
is round 1's, kept as read; VERIFY.md judged it.

**Rule:** below 30rem an open glass overlay holds the page through the one root lock, unless
it is modal and already holds it.

`cure-round1.patch` (applies with `patch -p1` to `release/11.1.1` at `108fd6051`, and so at
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
has collapsed (b/240859), so this cure, like today's modal lock, does not hold there; reka's
`touchmove` half is the only thing that would. That is a support-floor question for the
owner, not part of this cure. And b/317941's window (a swipe begun within about 200 ms of the
open without lifting) and b/299084 (iOS 26's root `hidden` regressions, still open) are
Safari's.

## The witnesses of round 1: plain (RED) against round 1's cure (GREEN)

| Surface | Chromium 149, touch: plain → cured | WebKit 26.5, wheel: plain → cured | WebKit 26.5, tap: root `overflow-y` while open is `hidden`, plain → cured (a state read) |
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
`visible` after every close that closed. The four cured cells whose root stays `hidden` after
the close are the Popover's in WebKit (2 and 30 lines, in the wheel lane and the tap lane),
where the closing tap (on the page beside it) did not close it (For INBOUND, cured in the
second round): the hold lasted exactly as long as the surface stayed open.

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

**Chromium 149: no plate cut by any route.** 28 cells, 0 plate cuts, 0 jumps, at most 1
dropped frame in a close. The rule above judged the plate only; the detented Sheet's scrim
cuts (below, and VERIFY B3). Every entrance tweens (the Select and menus grow by their clip from a strip, the
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

**Playwright WebKit 26.5 (`isMobile`, taps): no plate cut by any route that closed the
surface.**
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

Round 1 said the list of cuts for 11.1.1 was empty on `108fd6051`. It was not: its own frames
show the detented Sheet's scrim going from absent to 0.28 in one frame on the open (Chromium
`(8, none) → (16, 0.28)`; WebKit's first scrim frame 0.28) and holding 0.28 until it leaves
in one frame on the close (to 696 ms in Chromium, 686 ms in WebKit), from
`scrimDetentOpacity`'s 0.28 floor (VERIFY B3). The second round cures it and re-reads every
cut with the scrim judged.

## For INBOUND (outside this record's question)

- **In WebKit a tap outside a surface, or on its scrim, does not close it.** (Cured in the
  second round, above: the outside layer and the scrim listen for click, and the scrim no
  longer prevents a touch's `pointerdown`.) Playwright WebKit
  26.5, by tap at 390, both trees: the Select (alone and in a dock), the DropdownMenu and the
  Popover stay open after a tap on the page beside them, and the Command palette, the Sheet,
  the detented Sheet and the Dialog stay open after a tap on their scrim; a second tap on an
  open Select's trigger does not close it either. Chromium closes on every one. reka's
  outside-press handler, for a touch pointer, does not act on the `pointerdown`: it waits for
  a `click` on the document (`reka-ui/dist/DismissableLayer/utils.js:40-56`), and WebKit's tap
  sends no `click` to a target that is not clickable or whose `pointerdown` was prevented
  (the second round's table above), which is the rule Apple's Safari Web Content Guide
  states for a nonclickable element. If the iPhone agrees, a phone reader
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
`overflow: hidden` once its toolbar has collapsed (b/240859; on iOS 26, b/299084 is still
open). Today's modal lock and this cure both rest
on the root's `hidden`, so neither holds there; reka's lock held it with a `touchmove` cancel
on the document, which glass removed when it moved the lock to the root. Default: the hold
stays CSS alone and holds on Safari 26.4 and later (and every Chromium); the older Safaris
keep today's behaviour. The alternative is a `touchmove` cancel, attached only while the root
lock is held and only on a user agent that needs it. (The patches are not CSS alone: the
detented Sheet's hand-off in `detents.patch` adds a non-passive `touchmove` listener on the
sheet, and in `cure.patch` the outside layer and the scrim listen for click and the scrim
prevents its `mousedown`. The hold is CSS alone.)

## Running it again

The fourth round: two trees as the third round's, `ps4-plain` and `ps4-cure` (the latter
with all three patches), built by `build-tree.sh`. `batch-r4-chromium.sh` and
`batch-r4-webkit.sh` (under `guarded --exclusive webkit`) start both `vite preview` servers
inside the batch on 5361 and 5362 (`serve-pair.sh`), stop them by PID on exit, and write
`data/r4/`; `vitest-r4.sh` runs the unit suites; `make-patches.sh <plain> <cure> <dir>` now
cuts three patches. `nested.mjs` takes two more parts, `scrim` and `nopan`, and reads paint
in the nested cells. Both servers ran inside each batch and were stopped by PID when it
exited. The permission system refused the removal of both trees when the fourth round
closed, so `.claude/worktrees/ps4-plain` and `ps4-cure` are still there: plain directories
that git ignores, each with a link to the main checkout's `node_modules`, which `rm -rf`
removes without following. The third round's verifiers' trees (`vr3code-plain`,
`vr3code-cure`, `vr3code-app`) were left as they were.

The third round: `build-tree.sh` builds `.claude/worktrees/ps3-plain` (a `git archive` of
`release/11.1.1` at `ca61ce5b6`, less `docs/`, `tests/docs/` and `tests-visual/`) and
`ps3-cure` (the same with `scrim.patch` and `cure.patch`); `serve.sh` serves them on 5361
and 5362; `batch-r3-chromium.sh` and `batch-r3-webkit.sh` (under `guarded --exclusive
webkit`) write `data/r3/`; `vitest-r3.sh` runs the unit suites; `make-patches.sh <plain>
<cure> <dir>` cuts the two patches from the trees. `nested.mjs <engine> <port> <out>
[parts]` reads the nested, Select-in-Dialog, chip-row and mouse cells. The two trees were
deleted when the third round closed, and both servers were stopped by PID. The verifiers'
trees (`psv-plain`, `psv-cure`, `psv-logs`) were left as they were.

The rounds before: `harness/` holds everything. `build-tree.sh <tree>` adds the page under
`demo/__phone/` and builds the demo; `serve.sh <tree> <port>` serves it (under the guard,
`--light`, an explicit `--timeout`, stopped by the guard's PID); `run-lane.sh <lane>`
probes 5361 (plain) then 5362 (cured) into `data/r2/`; `cuts.mjs <chromium|webkit> <port>
<out> [surfaces]` reads the cuts; `follow.mjs <port> <out>` reads the detented list
(Chromium only); `tapclick.mjs <engine> <out>` reads which tapped elements get a click;
`summarize.py --dir data/r2` prints the tables and `framesof.py` the frames of one cut
cell. `batch-chromium.sh`, `chromium-r2b.sh`, `batch-webkit.sh` and `vitest-r2.sh` are the
second round's runs, one at a time (they share the lock directory `logs/r2/.seat`); lanes
that start WebKit run under `guarded --exclusive webkit`. Round 1's data stays in
`data/*.json`.

The two trees are rebuilt with `git archive` into `.claude/worktrees/phone-scroll` (of
`108fd6051`, `harness/BASE-SHA.txt`) and `.claude/worktrees/phone-scroll-cure` (of
`release/11.1.1` at `4f1fa667e`, then `patch -p1 < cure.patch`); the two commits' `src` are
the same. Each takes a link to the main checkout's `node_modules`. The permission system
refused `rm -rf` of both trees when the second round closed, as it did in round 1, so both
are still there (plain directories, not git worktrees; the link is removed with them, not
followed) for whoever holds the permission. Every server is stopped.
