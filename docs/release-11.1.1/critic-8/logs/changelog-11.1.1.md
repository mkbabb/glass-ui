## 11.1.1 — unreleased

A patch on 11.1.0 about how surfaces leave. Nothing is removed or renamed.

- **A popup closes in the form it opened in.** On a narrow screen a `Select` opens as a
  sheet at the foot of the screen. As it closed it turned back into the small anchored
  list in the same frame and jumped to its trigger, often hundreds of pixels up, before
  it faded. It now keeps its sheet form, its width and its material until it is gone,
  and leaves by sliding down past the edge of the screen as it fades. A `DropdownMenu`
  seated in a `GlassDock` keeps its material through its exit the same way.

- **On a narrow screen a `Select` and a dock's `DropdownMenu` are glass.** Below 30rem
  they were a solid plate. They now wear the overlay glass, firmed toward the card so
  every row, the highlighted one included, reads at 4.5:1 over a busy page in light and
  dark. With reduced transparency turned on they are solid, as before. The plate's
  attribute changes with it: the narrow form carries `data-plate="firm"` where it
  carried `data-surface="opaque"`, so a stylesheet that targeted the old attribute on
  these two surfaces should target the new one.

- **Surfaces leave on one curve you can see.** A menu or a select held its full light
  for about 105 ms while its edge drew in, then vanished in a single frame at about
  130 ms; a popover was gone in about 135 ms; a tooltip lost a third of its light in
  its first frame and was gone in about 70 ms. Every floating surface now fades across
  its whole exit on one even curve, and no single frame takes more than a fifth of it.
  Menus and selects take about 220 ms to leave, popovers 250 ms and tooltips 120 ms,
  each shorter than its entrance. `Dialog` and `Sheet` close on the same curve, faster
  than they open (a dialog in about 180 ms, a sheet in 250 ms), where a dialog used to
  take as long to close as to open and a sheet front-loaded its slide. The
  `--exit-curve` token carries the new curve: it was `var(--ease-out)`, that is
  `cubic-bezier(0, 0, 0.2, 1)`, and is now `cubic-bezier(0.3, 0.2, 0.7, 0.8)`.

- **A popover moves by fading and a short slide.** A `Popover` and a hover card grew,
  unsquashed and sharpened from a blur as they arrived, and shrank, squashed and blurred
  again as they left. They now enter and leave on opacity and their few pixels of slide
  alone. A `Toast` arrives the same way, since it shares the popover's register, and so
  does an element of your own that wears `.glass-reveal` with no `data-reveal` value or
  with `data-reveal="overlay"`. `--enter-overlay-scale` and `--enter-overlay-blur` are
  still defined, but they no longer shape these entrances; a site that tuned them for a
  popover or a toast should know they no longer apply there. A tooltip no longer
  shrinks as it leaves; it still grows slightly as it arrives.

- **A closing surface leaves the same way however you close it.** A `Sheet` with detents
  stopped shrinking at its smallest honest height and then vanished with half of it
  still on screen; it now slides the rest of the way past the edge before it is removed,
  however it is closed. Dragged down and let go, it jumped back up to its rung before it
  closed; it now carries on down from where the finger left it. Dragged toward another
  rung once it had settled on one, it jumped back to the rung it had left in the frame
  after the finger lifted, then sprang to the new one; it now springs on from where the
  finger left it, up or down, at the finger's speed. It also opens at its rung's size: it
  grew from a short strip at the foot of the screen to its rung, laying out its contents
  again on every frame, and now rises into place whole from past the edge. A `CommandDialog`
  dropped its list in the first frame of its close, so the plate fell to its search
  field before it faded; the list now stays until the dialog is gone. Menus no longer
  run keyframes to open or close: `glass-menu-grow` and `glass-menu-grow-up` gave way to
  a transition, so an opening menu can turn back, and `glass-menu-recede` and
  `glass-menu-recede-up` gave way to one for the close. All four are still defined for
  stylesheets that name them, but the two recede keyframes no longer hold full opacity
  until the last tenth of their clock; they now fade across all of it.

- **A surface turned back mid-way turns from where it is.** Closing a `Popover`,
  `DropdownMenu`, `Select` or `Toast` while it was still opening made it jump to fully
  open before it moved again, as did reopening a `Popover` or a tooltip while it was
  leaving. Each now carries on from the light it had. The popups' exits are transitions
  now, held for reka's presence by a keyframe that paints nothing (`glass-reveal-hold`),
  so they no longer run `glass-reveal-out`, nor `glass-reveal-out-reduced` under reduced
  motion or with `data-motion="off"`. Both are still defined, but `glass-reveal-out` has
  a new shape: its opacity reaches 0 at the end of its clock, where it used to reach it
  at 60%, so a stylesheet that names it now fades across the whole clock. A press on the
  trigger of a `Dialog`, `Sheet` or `Select` that is still leaving reopens it from where
  it stands, where the press used to be swallowed, and a press on the page behind a
  leaving `Dialog` or `Sheet` now reaches the page.

- **Tooltips fade in.** A tooltip appeared whole in one frame, and moving the pointer to
  a neighbouring trigger swapped one hint for the other at once. A tooltip now fades in
  and out on one even curve, and on a hand-off the outgoing hint fades as the incoming
  one arrives.

- **`ExpandableContainer` leaves the way it came.** Collapsing it swapped the fullscreen
  overlay for the in-page box in one frame, and its dim arrived the same way. The panel
  now shrinks and fades back out as the dim fades, and the content returns to its place
  only when that has finished. Closing it during its entrance, or reopening it during
  its exit, turns it from where it is, and a leaving overlay lets presses through to the
  page. While it leaves, the root keeps `data-state="expanded"` and the default slot's
  `fullscreen` prop stays `true`, since the content is still in the overlay; the root
  also carries a new `data-leaving` attribute for that stretch, so a style keyed on the
  state follows the content out. To turn back mid-way it runs on transitions now, so it
  no longer runs the `expandable-container-birth` and `expandable-container-arrive`
  keyframes; both are still defined for stylesheets that name them.

- **Reduced motion is a fade.** With reduced motion turned on, popovers, menus, selects,
  tooltips, dialogs, sheets and an `ExpandableContainer`'s overlay appeared and vanished
  in a single frame, a toast appeared in one (it already faded as it left), an
  `Accordion` or `Collapsible` region snapped open and shut, and the dock's fold jumped
  from one face to the other. Each now fades in and out over at most 200 ms on
  `--exit-curve`, an `ExpandableContainer` over 120 ms, and a toast's fade out keeps to
  200 ms as well. Nothing travels: a surface is in its place and at its size from the
  first frame, and a folding dock takes its new size at once while its two faces
  cross-fade. A pressed control shows its press by colour, not by size: a `Button`, a
  dock's seats, a menu or select row, a command palette's `CommandItem`, a pressable
  `Card`, a `SortableList` handle, the plate behind a `Dialog`'s close button and the
  `Select`, menu and popover triggers seated in a dock no longer shrink or stretch on a
  press, so what a trigger opens is placed against it at rest. A pressed glass `Button`
  (the primary and secondary emphases) darkens its plate a little. A pressed menu or
  select row or `CommandItem` takes a fill a step deeper than its highlight, under a
  finger as under a pointer. A pressed `Card` deepens its fill a step past its hover, a
  pressed `SortableList` handle fills behind its glyph, and the close button's plate
  keeps its size on hover as well as on a press. The `.interactive-item` utility class
  no longer shrinks what wears it to 97% on a press, so an element of your own that
  composes it keeps its size too, and anything pressed through `useLiquidPress` writes
  no `scale` unless it is given `respectReducedMotion: false`. The rule
  that stills motion under reduced motion now sits in its own cascade layer,
  `reduced-motion`, declared after `utilities`, as a plain declaration. Your own
  stylesheet's rule, such as `transition: opacity 144ms`, or a style set inline, now
  keeps its clock under reduced motion without `!important`, where glass's rule used to
  win even over `!important`. That works both ways: glass no longer stills your own
  unlayered or inline animations and transitions under reduced motion, movement
  included, so a site that relied on it to stop them needs a `prefers-reduced-motion`
  rule of its own. Utility classes are still stilled.

- **Surfaces say when they have finished leaving.** `Dialog`, `Sheet`, `Popover` (and
  its hover card), `DropdownMenu` (and `ContextMenu`), `Select`, `Tooltip` and `Toast`
  content now emit `leave-finished` once per close, after the last frame of the exit,
  and dispatch a DOM event of the same name from the content element that bubbles and
  is composed, so a listener on a shadow host hears it too, with the surface's kind in
  `detail.kind`. A close reversed by a reopen sends nothing; a surface unmounted before
  its exit ends sends it at the unmount. Clear whatever the surface shows on this event
  rather than on the close, and it stays on screen until it is gone.

### Fixed

- **A wide `SegmentedTabs` keeps round ends on a touch screen.** 11.1.0 raised a tab to
  the 44 px touch target, which makes the strip 50 px with its trim, but a strip wider
  than 20rem kept the bar's 12 px corners, so it lost the round ends the release
  promised. Under a coarse pointer the strip, its tabs and the selected plate are now
  round-ended at every width. The 50 px is intended: the target is the tab, and the
  strip carries its 3 px trim round it.

- **Selecting a `ToggleGroupItem` no longer moves its neighbours.** A selected item
  turned bold, which widened an item sized to its word and pushed the items after it.
  An item now keeps one weight; selection is its fill and its colour.

- **`scale-on-hover` no longer sticks after a tap.** On a touch screen a tap left the
  element lifted until the next tap elsewhere. The lift now applies only where the
  pointer can hover.

- **A dock run's selected plate no longer jumps under reduced motion.** Moving
  `aria-current` to another control in a dock moved the selected plate across the dock
  in one frame, about 167 px on a wide one. With reduced motion turned on, the plate now
  fades out of the old control and into the new one where they stand.

### Sizes

- The dock entry (`@mkbabb/glass-ui/dock` with every chunk it imports), gzipped: 38,673
  bytes in 11.0.2, 40,541 in 11.1.0 and 40,533 in this release. This patch adds nothing
  to it.
- The surfaces a dock opens grew with the leave event and the exits that turn back,
  gzipped, from 11.1.0: `dialog` 12,508 to 14,529 bytes, `select` 8,453 to 9,517,
  `popover` 8,663 to 9,385, `tooltip` 5,897 to 6,607 and `menu` 11,865 to 12,555.
- These entries also grew by more than half a kilobyte, measured the same way, from
  11.1.0: the root entry (`@mkbabb/glass-ui`) 104,776 to 108,642 bytes, `command`
  16,804 to 18,898, `sheet` 14,306 to 16,695, `tabs` 19,091 to 20,154, `easing` 36,889
  to 37,983, `motion` 12,599 to 13,544 and `toast` 5,093 to 5,879.

