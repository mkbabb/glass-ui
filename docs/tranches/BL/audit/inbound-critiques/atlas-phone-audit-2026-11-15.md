# Phone defects in glass-ui facilities, found by touch

To the glass-ui maintainers.

We walked every glass-ui facility the Connectivity Atlas dashboards use on a phone-sized screen, by
touch only, and these are the faults whose cure belongs in glass. Each one comes with the steps to
reproduce it, the component and file we believe is responsible, what we think causes it, and what we
would expect instead. We tested in headless Chromium with phone emulation (390 × 844 and 360 × 740,
device scale factor 3, touch enabled, mobile mode, an iPhone user agent), driving taps through
Playwright's touchscreen and swipes and long presses through raw touch events, never a mouse. In that
emulation `(pointer: coarse)` matches and `(hover: hover)` does not, so the coarse-pointer styles were
live. The captures and raw measurements named below are kept with the audit and we are glad to share
any of them. Rows are ordered by how much a reader would notice.

## 1. The phone select sheet jumps up to sit on any dock in the lower half of the screen

Steps: on a page with a fixed dock bar at the foot and ordinary in-flow docks inside the page content
(our plate tool docks are `GlassDock` too), open a `Select` from the fixed bar at a width below 30rem.
The listbox opens in its sheet form and sits correctly on the bar. Now swipe up inside the sheet, or
otherwise let the page scroll so that one of the in-flow docks enters the lower half of the viewport.

What happens: the sheet re-anchors onto the in-flow dock. In our case it rose from y 578 to y 397 (and
from 411 to 238 for an eight-row list), leaving a gap of about 180 px between the sheet and the control
that opened it, and covering the content above that dock.

Component and file: `SelectContent.vue`, through `sheetFootRect` in
`components/_shared/overlay/sheet-width.ts`. The reference rectangle is recomputed from every element
matching `.glass-dock` whose top lies in the lower half of the viewport, so a dock that scrolls with
the page is treated as if it were the page foot.

What we would expect: the sheet stays seated on the fixed foot dock that opened it. Counting only docks
that are fixed or sticky to the bottom edge, or only the dock that owns the trigger, would do it.

## 2. A swipe on a short select sheet scrolls the page behind it

Steps: open a `Select` in its phone sheet form with few enough options that the list does not overflow
(we saw it with four and with eight options). Swipe up inside the list.

What happens: the page behind the open sheet scrolls by about 300 px. This is also what sets off the
first fault above. We saw it on one dashboard at 390 px in the light theme and could not reproduce it on
another at 360 px in the dark theme, where the same swipe left the page still, so the conditions may be
narrower than the cause below suggests.

Component and file: `SelectContent.vue`. Body locking is turned off on purpose (`bodyLock: false`, with a
comment explaining why), and the viewport relies on `overscroll-behavior: contain`. That property only
acts on an element that actually scrolls, so when the list fits, the gesture chains straight to the
document.

What we would expect: a gesture that begins on an open sheet never moves the page. A touch-move guard
on the sheet plate while the list does not overflow, or making the viewport always a scroll container,
would keep the free body scroll you wanted without the leak.

## 3. Icon-only controls have no label by touch, and a long press simply fires them

Steps: on a phone, press and hold an icon-only `DockControl` or `DockTrigger` for 800 ms (we used a
filter button with a sliders glyph and an enlarge button with a corner-arrows glyph).

What happens: no tooltip or label appears at any point, and when the finger lifts the control fires as
if tapped: the hold opened our filter drawer and our enlarged figure view. There is no way for a reader
on a phone to learn what an icon does before pressing it.

Component and file: the `tooltip` family (`Tooltip.vue`, `TooltipTrigger.vue`, `TooltipContent.vue`)
has no touch path at all, and the dock controls depend on it for their names.

What we would expect: a press and hold on a coarse pointer shows the control's label from its anchor
and does not fire the control when released, or the dock offers a labelled form on touch. Either way,
every dock control should be able to say what it does on a phone.

## 4. The select sheet does not say which field it belongs to

Steps: inside a tall form (our filter drawer), tap a `Select` trigger near the top, for example one at
y 174 on an 844-px screen.

What happens: the list opens as a sheet at the foot of the screen, about 400 px away from the field,
with only the options showing. Once several selects sit in the same form, the reader has to remember
which one they tapped.

Component and file: `SelectContent.vue`, the sheet form (`data-form="sheet"`).

What we would expect: the sheet carries the field's label as its heading (it could come from the
trigger's accessible name), or the listbox stays anchored to its trigger whenever there is room below.

## 5. The theme changes in a single frame

Steps: tap a `DarkModeToggle` and sample the page and dock background colours on every animation frame.

What happens: the colours switch between two consecutive frames. In our build that frame came 166 ms
after the tap because of a long style recalculation, so the page also feels stuck before it cuts.

Component and file: `DarkModeToggle.vue` and the shared `useGlobalDark` it flips.

What we would expect: a short crossfade between the two themes (a view transition would do), with
reduced motion keeping the fade, since our owner's standing rule is that nothing on screen changes
without a transition.

## 6. A bottom sheet without detents cannot be dragged closed

Steps: open a `SheetContent` with `side="bottom"` and no `detents`, then drag downward from its top
edge by 400 px.

What happens: nothing moves. A bottom sheet with detents on the same page does follow the finger and
closes, so two sheets answer the same gesture differently.

Component and file: `SheetContent.vue`; dragging appears to be wired only through the detent ladder.

What we would expect: every bottom sheet follows a downward drag and closes past a threshold, with a
grip shown when that gesture is available.

## 7. A tall sheet's opening spring carries its top edge off the screen

Steps: at 360 × 740, open a bottom sheet whose content makes it 720 px tall, and sample its
`translate` on each frame.

What happens: the spring overshoots by about 4.2 % of its travel, which is the panel preset's
expected overshoot, but on a sheet this tall it lifts the top edge to y −10 for roughly 100 ms before it
settles at y 20. The rounded top corners briefly leave the screen.

Component and file: `components/sheet/motion.ts` (`sheetSlideTransform` leaves `p` unclamped on
purpose so the overshoot is the settle).

What we would expect: the overshoot is limited by the room above the sheet, so a sheet never passes the
top of the viewport.

## 8. The round dock button shows a square focus ring

Steps: open a drawer from an icon `DockControl` and close it with the Escape key, so focus returns to
the button with keyboard modality.

What happens: a square black outline is drawn around the round capsule button.

Component and file: the dock control focus style, `components/dock/styles/controls.css`.

What we would expect: the focus ring follows the control's radius.

## What we checked and found sound

The coarse-pointer hit slop on `SegmentedTabs`, `ToggleGroup` items and `Slider` thumbs is in place in
the stylesheets (`::after` extended to `--touch-target`). Dock bar controls measure 44 × 44 px. The
plate tool dock grows from 140 to 184 px over about 230 ms on a spring, and collapses again on an
outside tap. Sheet and select entries animate (translate, scale and opacity from the first frame).
Selects close on an outside tap, on Escape and on a second tap of the trigger, and leave no layer
behind.

## What we could not test

Real iOS Safari behaviour is outside what headless Chromium emulates: rubber-band overscroll at the
page and sheet edges, momentum scrolling and whether a fling inside a sheet leaks to the page, the visual
viewport when the on-screen keyboard is up (where a search field's suggestion list and the sheet form
of `Select` sit), the safe-area insets around the home indicator, and the timing of a long press against
Safari's own text-selection and link-preview gestures. We will repeat rows 1, 2, 3 and 6 on a phone and
report back if the behaviour differs.
