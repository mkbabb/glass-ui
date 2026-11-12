# Census: every state change, hover and large-element state in glass-ui

O-278, the census seat. Read from source on master at `4b130555c` (`src/components`, `src/styles`). No browser was launched. Every verdict below is a reading of the source, not a frame measurement; where a row says "snaps" the code has no transition, animation or tween on that change. The record seat's frames confirm or overturn each one. File paths are relative to `src/`.

The terms are:

- **tweened**: a transition, keyframe or spring moves the change from start to end.
- **snaps**: the change lands between two frames.
- **cut**: an exit with no frames (the node is removed or hidden at once).
- **fades in place**: an opacity or colour tween with no size, shape or travel. This passes P0 but not "a plate that grows from the control".

The procedural viz (aurora, blob, constellation, fourier-field, music-staff) are left out. Their motion is ambient identity and is out of this study's scope.

## What holds across the library

These cross-cutting facts explain most of the rows below.

1. **Top-layer surfaces enter and leave well.** Dialog, popover, tooltip, dropdown, select and toast all ride `.glass-reveal` (`styles/glass/reveal.css:136-200`). The enter uses `@starting-style`; the exit is a keyframe that reka waits for. The sheet uses its own spring and keyframe. None of these surfaces cuts.
2. **Nothing inside a surface tweens its size.** Once a dialog, popover, menu, card, toast or table is open, any content change resizes it in one frame. The only measured size tweens are the dock collapse and expand (`components/dock/composables/useDockMorph.ts:79-104`), the accordion and collapsible (`components/_shared/disclosure/disclosure.css:100-122`), the configurator section (`components/configurator/ConfiguratorLayer.vue:236-238`) and the tab indicator (`components/tabs/styles/segmented.css:159-166`).
3. **`v-if` swaps are bare.** One component uses `<Transition>`: InfiniteScroll (`components/infinite-scroll/InfiniteScroll.vue:66`). The recipes `pane-swap`, `metric-swap`, `fade` and `tab-fade` in `styles/transitions.css` have no component consumer in `src/components`. Every icon swap, state swap, error line and loading swap is a `v-if` with no transition.
4. **Reduced motion is a cut, not a fade.** The universal carve sets `transition-duration: 0s` and `animation-duration: 0.01ms` on every element (`styles/utilities/a11y-overrides.css:46-53`). P0 and P6 say reduced motion keeps a shortened fade; the code keeps nothing. Local rows do the same: `transition: none` on the switch, tab indicator, pager, sheet grip, slider, expandable trigger and scroll rim. The dock spring and the dock crossfade jump to the end under reduced motion (`components/dock/composables/useDockSpring.ts:15-16,103`, `components/dock/DockCrossfade.vue:218-221`). P6 itself also disagrees with the code: it describes a carve that keeps opacity and colour, and that carve was replaced.
5. **Hover plates fade, they do not grow.** Almost every hover with a plate fades a fill in place: the dock controls, menu rows, quiet buttons, accordion and configurator triggers. Only two controls grow a plate or mark: the dialog and sheet close button (`components/dialog/styles.css:115-133`) and the pager dot (`components/pager-dots/PagerDots.vue:577-580`). The pager dot is the nearest thing in the library to the Google Chat pentagon plate.
6. **Several glass hovers are gleam-only.** The glass Button, SelectTrigger, Chip and the dock controls carry `.glass-capsule-hover`, whose whole hover is the specular rung (`styles/glass/glass-capsule.css:93-116`). Restraint retires specular (C-2). Once it goes, those controls lose their hover unless a fill replaces it.

## Dock

| Change | Where | In | Out | Reading |
|---|---|---|---|---|
| Collapse and expand of the outer face | `components/dock/composables/useDockMorph.ts:79-104`, `styles/layers.css:184-196` | tweened (dock spring, scale over a reserved box, clip aperture) | tweened (leaving pane fades on `1 - --dock-morph-t`) | Holds. The entering pane is never faded; it is uncovered by the clip (`styles/layers.css:157-168`). |
| Corner at arm and settle | `components/dock/styles/morph.css:176-191` | snaps (likely) | snaps (likely) | The rest corner rules apply only under `:not([data-morphing])`, so the corner swaps rules on the arm frame and again on the settle frame. The inbound reading on 11.0.0 saw [30,4,4,30] flip to round in one frame (`../dock/inbound/daraksha-dock-jumps-2026-11-11.md` §2a). Needs a frame reading on master. |
| Cross-axis height when a page's seat set differs (56 to 60 px) | inbound §2c; no source owner found | snaps | snaps | Measured on 11.0.0 in one frame both ways. The morph reserves only the morph axis (`styles/layers.css:114-131`). |
| A live layer's content changes at rest (route, section label, seat count) | `components/dock/composables/dockMorphMeasure.ts:186-230, 422-470` | snaps | snaps | The capture re-measures the endpoints but nothing tweens the root, which is laid out at its natural size. This is G-4; the daraksha and atlas cases (e), (f), (g) and (h) on atlas's side were cured by atlas, not glass. |
| `#persistent`, `#persistent-end` and `#search` regions mount or unmount | `components/dock/GlassDock.vue:483, 576, 592` | snaps | cut | `v-if="$slots…"`. A slot that appears at runtime (Motion's persistent-end seat, row 7) resizes the dock at once. |
| Controlled face swap (DockLayerGroup, DockCrossfade) | `components/dock/DockCrossfade.vue:164-235` | tweened (opacity on the dock spring) | tweened | Opacity only, no coupled transform (P3 says a bare fade reads flat). Under reduced motion `settle()` runs at once: cut. |
| Crossfade reserve grows to a taller face | `components/dock/DockCrossfade.vue:89-105` | snaps | none | A running max written as `min-block-size`. It grows in one frame and never shrinks, so a short face sits in a tall box. |
| Switcher indicator travel | `components/dock/DockLayerGroup.vue:268-277`, `styles/layer-group.css:343-360` | tweened | tweened | One travelling plate; the switcher is the one place the dock has travel. |
| Active seat paint (icon button) | `components/dock/DockControl.vue:96-97`, `styles/controls/icon-button.css:188-232` | fades in place, partly snaps | same | The background, colour and shadow fade. `border: var(--dock-active-border)` is not in the transition list (`:192`), and `.glass-capsule` adds its backdrop-filter at once when `active` turns on. |
| Active seat paint (tab button, trigger) | `styles/controls/tab-button.css:96-99`, `styles/controls/triggers.css:115-140` | fades in place | fades in place | The highlight does not travel between seats; it fades out on one and in on the next. This is daraksha's "highlight that jumps". |
| Select trigger chevron on open | `styles/controls/triggers.css:152-157` | tweened | tweened | |
| Press darken and squish | `styles/controls/icon-button.css:67-102, 135-137` | tweened | tweened | Restraint retires the press indent (C-39); the tween itself is fine. |
| Grasp carriers on hold | `components/dock/GlassDock.vue:443-450` | tweened (`glass/grasp.css`) | tweened, unmount on `transitionend` | |
| CTA seat reveal | `components/dock/styles/cta-seat.css:43-86` | tweened (opacity) | tweened | Opacity only; the seat's footprint is reserved, so no resize. |
| Background toggle icon (Play, Pause) | `components/dock/DockBackgroundToggle.vue:72-73` | snaps | cut | `v-if` and `v-else`. |

## Sheet and dialog

| Change | Where | In | Out | Reading |
|---|---|---|---|---|
| Dialog open and close | `components/dialog/DialogContent.vue:117-122, 195-220`, `styles/glass/reveal.css:136-200` | tweened (spring scale, blur, fade) | tweened (exit keyframe) | Holds. `filter: blur()` on a glass surface is animated per frame, a cost the performance pass should read. |
| Scrim | `components/dialog/ModalOverlay.vue:70-90` | tweened (follows the spring scalar) | tweened | |
| Dialog content changes size while open (wizard step, filtered list) | `components/dialog/styles.css:21-30` | snaps | snaps | Height is auto; nothing measures or tweens it. CommandDialog is the frequent case (see the menu table). |
| Close button `v-if` (dismiss rung) | `components/dialog/DialogContent.vue:221` | snaps | cut | Only on a prop change, so rare. |
| Close button hover and press | `components/dialog/styles.css:115-140` | tweened (plate grows to `--scale-hover`) | tweened | The one hover plate in the library that grows from the control. |
| Sheet open, close and detent snap | `components/sheet/SheetContent.vue:159-200`, `motion.ts` | tweened (spring) | tweened | Holds. O-264 (overshoot) is a tuning question, not a snap. |
| Detent grip width and opacity | `components/sheet/styles.css:275-288` | tweened | tweened | Animates `inline-size`, a layout property, on a 4 px mark. Reduced motion: `transition: none` (`:313-317`), a snap. |
| Graded halo mount | `components/sheet/SheetContent.vue:180-183, 404-411` | follows the surface (anchor positioning) | follows the surface | It has no opacity of its own; it rides the surface box. `position-anchor` needs Safari 26. |
| ExpandableContainer to fullscreen | `components/expandable-container/styles.css:6-16, 41-46` | panel tweened (spring scale); scrim snaps in | cut | The scrim `background` has no transition. On collapse the panel returns with no animation. The in-flow box leaves the page when it becomes `position: fixed`, so the content below reflows up at once, and back down on exit. |
| ExpandableContainer icon (Maximize, Minimize) | `components/expandable-container/ExpandableContainer.vue` template, `styles.css:51-53` | snaps | cut | Two chrome blocks swapped by `hidden`. |

## Menu and select

| Change | Where | In | Out | Reading |
|---|---|---|---|---|
| Dropdown, context and select content open and close | `components/_shared/overlay/content.ts:30-80`, `components/select/SelectContent.vue:124` | tweened (menu register) | tweened | Holds. ContextMenu shares the family content. |
| Row highlight (pointer, keyboard) | `components/_shared/menu/menu.css` (`.glass-menu-row`, hover and `[data-highlighted]` rules) | fades in place, 1 px lift on pointer | fades on the release clock | The highlight does not travel between rows. |
| Checkbox and radio item marks | `components/menu/DropdownMenuCheckboxItem.vue:50-53`, `DropdownMenuRadioItem.vue:46-49`, `styles/glass/overlay-plate.css:233-253` | snaps | cut | reka's ItemIndicator mounts and unmounts with the state and nothing animates it. |
| Select item mark | `components/select/SelectItem.vue:76-84` | snaps | cut | Same: `SelectItemIndicator` with no motion. |
| Sub-trigger chevron on open | `components/menu/DropdownMenuSubTrigger.vue:42`, `styles/glass/overlay-plate.css:274-278` | none | none | It does not move when the submenu opens. |
| Select trigger chevron | `components/select/SelectTrigger.vue` template (`transition-disclosure in-data-[state=open]:rotate-180`) | tweened | tweened | |
| Select value text on change | `components/select/SelectValue.vue:35` | snaps | snaps | The label swaps in one frame. An auto-width trigger (dock select, the SegmentedTabs phone select at `components/tabs/SegmentedTabs.vue:162-170`) also changes width in that frame. |
| Command list height while filtering | `components/command/CommandList.vue` template, `command/styles.css:81-100` | snaps | snaps | Every keystroke that changes the row count resizes the list and the dialog around it. |
| Command empty state | `components/command/CommandEmpty.vue` | snaps | cut | |
| Popper side flip or reposition | `components/popover/PopoverContent.vue:61`, `components/tooltip/TooltipContent.vue:40` | snaps | snaps | `avoidCollisions` moves the surface to the other side in one frame. |

## Popover and tooltip

| Change | Where | In | Out | Reading |
|---|---|---|---|---|
| Open and close | `styles/glass/reveal.css:97-130, 225-260` | tweened (slides from its anchor edge) | tweened | Holds. |
| Content change while open (tooltip text, popover body) | `components/popover/PopoverContent.vue`, `components/tooltip/TooltipContent.vue` | snaps | snaps | No size tween inside the surface. |
| Hover-root versus click-root switch | `components/popover/Popover.vue:107-122`, `PopoverTrigger.vue:34-44` | n/a | n/a | A mode prop, not a user-facing change. |

## Tabs

| Change | Where | In | Out | Reading |
|---|---|---|---|---|
| Indicator travel | `components/tabs/styles/segmented.css:159-166` | tweened (dock spring) | tweened | Animates `width` and `height` beside `translate`, both layout properties (against P5). Under reduced motion there is no rule at all: snap. |
| Indicator first paint | `components/tabs/styles/segmented.css:246-260` | tweened (opacity from 0) | n/a | |
| Label colour on select | `components/tabs/styles/segmented.css:203, 216-218` | tweened (colour) | tweened | |
| Phone select versus strip at the breakpoint | `components/tabs/SegmentedTabs.vue:157, 189` | snaps | cut | Rare; it fires on resize. |

## Accordion and collapsible

| Change | Where | In | Out | Reading |
|---|---|---|---|---|
| Content open and close | `components/_shared/disclosure/disclosure.css:100-122` | tweened (`block-size` keyframe, allow-listed) | tweened | Rides `--spring-present`; check its peak, since an overshooting height on a reading surface breaks P2. Reduced motion: 0.01 ms, a cut (`:132-134`). |
| Content changes height while open | same | snaps | snaps | The keyframe runs only on open and close; a growing body jumps. |
| Chevron rotate | `components/_shared/disclosure/disclosure.css:96-98`, `transition-disclosure` (`styles/utilities/btn.css`) | tweened | tweened | Reduced motion: 0.01 ms. |
| Configurator section reveal | `components/configurator/ConfiguratorLayer.vue:236-247` | tweened (`grid-template-rows`) | tweened | Reduced motion: `transition: none`. |
| Configurator layer actions and sub-label | `components/configurator/ConfiguratorLayer.vue:155, 173` | snaps | cut | |

## Card

| Change | Where | In | Out | Reading |
|---|---|---|---|---|
| Selectable card hover, selected and focus | `components/card/styles.css:142-195` | fades in place | fades in place | The fill is a registered `--card-fill`, so it tweens. |
| Keyboard focus-within lift | `components/card/styles.css:126-129` | tweened (box-shadow) | tweened | |
| Header condense on scroll | `components/card/scroll.css:100-160` | box snaps, title glides | same | `font-size` changes at once, so the header's height jumps; only the glyph scale is animated. The description fades out with `allow-discrete`. |
| End-of-scroll fade | `components/card/scroll.css:50-55, 83` | tweened (scroll-driven) | tweened | |
| Content changes size | `components/card/Card.vue` | snaps | snaps | A card has no size tween. |

## Table and data-table

| Change | Where | In | Out | Reading |
|---|---|---|---|---|
| Loading to rows, empty or error | `components/data-table/DataTable.vue:285-370, 410-480` | snaps | cut | A `v-if` chain. The skeleton rows vanish and the real rows appear in one frame, and the table height jumps. |
| Rows added, removed or re-sorted | `components/data-table/DataTable.vue:438-470` | snaps | cut | `v-for` with no move transition. |
| Sort glyph (↕ ↑ ↓) | `components/data-table/DataTable.vue:170-174, 401` | snaps | snaps | A text glyph swap. |
| Interactive row hover and selected | `components/data-table/styles.css:103-111` | fades in place | fades in place | |
| Card-projection selected rim | `components/data-table/styles.css:113-116` | snaps | snaps | `border-color` and `box-shadow` are not in the row's transition list (`:105`). |
| Table to cards at the narrow breakpoint | `components/data-table/DataTable.vue:285, 375` | snaps | cut | Fires on resize. |

## Slider and fields

| Change | Where | In | Out | Reading |
|---|---|---|---|---|
| Fill and thumb follow the value | `components/slider/styles.css:227-234, 274-305` | tweened (press spring on transform) | tweened | |
| Approach densify on hover | `components/slider/styles.css:254-256` | tweened (liquid-fill strength) | tweened | |
| Loupe on grasp | `components/slider/Slider.vue:129-135, 333-346`, `styles.css:477-537` | snaps (likely) | at risk of a cut | The loupe mounts already `[data-engaged]` (`grasping` and `isHeld` flip in one flush) and has no `@starting-style`, so its scale-from-0.13 has no before-change style to start from. It unmounts when the grasp carrier's opacity transition ends, which may come before the loupe's own exit clock (`--spring-present-exit-duration`). |
| Focus veil | `components/slider/Slider.vue:316-323`, `styles/glass/focus-veil.css:35-51` | tweened (`@starting-style`) | tweened | |
| Value marks | `components/slider/Slider.vue:349-361` | snaps | cut | Only when the marks prop changes. |
| Switch thumb | `components/switch/styles.css:49-60` | tweened (dock spring) | tweened | Reduced motion: `transition: none` (`:62-64`). |
| Checkbox and radio mark | `styles/glass/control-bit.css:343-372` | tweened (scale and opacity, force-mounted) | tweened | |
| Checkbox mark glyph, indeterminate to checked | `components/checkbox/Checkbox.vue:48-49` | snaps | snaps | Minus and Check swap by `v-if` inside the mark. |
| Field control hover, focus, invalid | `components/_shared/field/control.css:127-142, 210-255` | tweened | tweened | Reduced motion: 0.01 ms (`:323-327`), a cut by the code's own comment. |
| Field description and error line | `components/labeled-field/LabeledField.vue:50, 64-71` | snaps | cut | The error line mounts by `v-if` under the control and pushes everything below it down in one frame. |
| Focus ring on any `.focus-ring` control | `styles/utilities/base.css:144-151` | snaps | cut | The outline has no transition. Restraint says "no motion on keyboard-triggered actions"; P0 says nothing appears between two frames. This needs a ruling, not a guess. |

## Toast and alert

| Change | Where | In | Out | Reading |
|---|---|---|---|---|
| Toast enter and exit | `components/toast/Toast.vue:80-133`, `Toaster.vue:40-70` | tweened (overlay register) | tweened (vaporize keyframe) | Holds. |
| Swipe move, cancel, end | `components/toast/Toast.vue:131` | follows the finger | tweened | |
| Other toasts when one arrives or leaves | `components/toast/Toaster.vue:107-122` | snaps | snaps | The stack reflows with no move transition. |
| Title, description or action mount | `components/toast/Toaster.vue:114-121` | snaps | cut | Only on an in-place update. |
| Alert | `components/alert/Alert.vue` | n/a | n/a | Static; a consumer `v-if` cuts it. |

## Pager dots

| Change | Where | In | Out | Reading |
|---|---|---|---|---|
| Active worm travel | `components/pager-dots/PagerDots.vue:510-555`, `worm.ts` | tweened (spring, scale stretch) | tweened | Holds (O-250, O-261). Reduced motion: the worm seats with no frames (`:597-605`). |
| Window slide | `components/pager-dots/PagerDots.vue:155-190, 470-487` | tweened (FLIP on `translate`) | tweened | |
| A pip that leaves the window | `components/pager-dots/PagerDots.vue:353-370` | slides in | cut | The departing key is removed with no frames. |
| Edge pip shrink | `components/pager-dots/PagerDots.vue:500-504` | snaps | snaps | `width`, `height` and `opacity` change with no transition. |
| Hover and press | `components/pager-dots/PagerDots.vue:577-584` | tweened (colour and grow to 1.14) | tweened | |

## Progress and skeleton

| Change | Where | In | Out | Reading |
|---|---|---|---|---|
| Fill travel | `components/progress/Progress.vue:174-189` | tweened (dock spring on transform) | tweened | Reduced motion: `transition: none` (`:227-229`). |
| Error status | `components/progress/Progress.vue:165-168` | snaps | snaps | The fill colour and the rim shadow change in one frame. |
| Indeterminate band on and off | `components/progress/Progress.vue:69-72`, `styles/glass/track-flow.css:39-54` | snaps (the band appears mid-sweep at 0.3 opacity) | cut | The `::after` leaves with the class. It animates `background-position`, a paint per frame, and is a gradient gleam that restraint asks about. |
| Complete | `components/progress/Progress.vue:208-222` | tweened (one discharge glow) | n/a | |
| Skeleton breathe and shimmer | `components/skeleton/Skeleton.vue:139-160, 215-243` | tweened (idle) | n/a | The skeleton itself is fine; the swap to content is what cuts (DataTable, Metric). |
| Button loading ring | `components/button/Button.vue:192-198`, `components/_shared/feedback/dot-ring.css:98-148` | ring tweened in; button width snaps | cut | `v-if` with no `<Transition>` (the comment says so by intent). The ring takes a flex slot, so the label shifts and the button widens at once, and narrows at once when the work ends. |
| DotRing under InfiniteScroll | `components/infinite-scroll/InfiniteScroll.vue:66-72` | tweened | tweened | The one `<Transition>` consumer. |
| Infinite scroll end-of-list | `components/infinite-scroll/InfiniteScroll.vue:78-83` | snaps | cut | |
| Metric loading to value | `components/metric/Metric.vue:64-65`, `styles.css:121-134` | snaps | cut | The plate vanishes and the value appears in one frame; a value change does not tween its digits or its width. `metric-swap` exists and is unused. |
| StatusDot state | `components/status-dot/StatusDot.vue:126-236` | snaps | snaps | Seven silhouettes swap border, size and fill with no transition. The pulse is an idle loop. |
| Scroll progress rim | `components/scroll-progress-rim/styles.css`, `ScrollProgressRim.vue:94` | tweened | tweened | Reduced motion: `transition: none`. |

## The rest

| Change | Where | In | Out | Reading |
|---|---|---|---|---|
| Theme flip (light to dark) | `composables/dark/useGlobalDark.ts:92-111`, `components/dark-mode-toggle/DarkModeToggle.vue` | page snaps | page snaps | The toggle's icon turns on a spring (`dark-mode-toggle.css:77-83`), but the page re-tints in one frame: surfaces carry no colour transition and the flip is not wrapped in a view transition. With `disableTransitions` set, every element is forced to snap (`styles/utilities/a11y-overrides.css:67-73`). |
| Avatar image arrives over its fallback | `components/avatar/AvatarImage.vue`, `styles.css:82-90` | snaps | cut | reka swaps fallback and image with no fade. |
| Timeline mark state (pending, active, completed) | `components/timeline/Timeline.vue:578-627` | snaps | snaps | `.tl__disc` has no transition on `background`. |
| Timeline mark hover | `components/timeline/Timeline.vue:663-676` | snaps | snaps | It sets `scale` and `background` with no transition, so the grow is a jump. |
| Timeline check | `components/timeline/Timeline.vue:360-367, 629-640` | tweened (draws on) | cut | `v-if`. |
| Timeline detail swap | `components/timeline/Timeline.vue:373, 682-697` | tweened (slides in on the spring) | cut | Keyed remount: the old detail is gone at once and the box takes the new height at once. |
| Timeline active cap and flow band | `components/timeline/Timeline.vue:313-321` | snaps | cut | |
| Carousel member fade | `components/carousel/styles.css:44-48` | tweened | tweened | Reduced motion: `transition: none`. |
| Carousel counter | `components/carousel/CarouselPager.vue:63` | snaps | cut | |
| EasingPicker copy icon (ring, check, copy) | `components/easing/EasingPicker.vue:577-579` | snaps | cut | |
| EasingPicker transport icon and label | `components/easing/EasingPicker.vue:582-588` | snaps | snaps | The label changes with the icon, so the button's width jumps. |
| EasingPicker bezier and spring modes, copy failure line | `components/easing/EasingPicker.vue:446, 517-540, 616-626` | snaps | cut | |
| Chip selected | `styles/glass/glass-chip.css:26-57` | tweened | tweened | Grows to 1.07 on `--ease-cartoon-punch` (overshoot on a control, against P2) and lights a `plus-lighter` radial glow (against restraint's shading rule). |
| Sortable drag, drop, settle | `components/sortable-list/styles.css:44-73, 142-233` | tweened | tweened | |
| Deck turn and build reveals | `components/deck/styles/turn.css:97-200`, `reveal.css:20-60` | tweened | tweened | |
| Typewriter cursor | `components/typewriter/TypewriterText.vue:19-40` | snaps | cut | Blinks by class; it moves between two `v-if` seats as the tail changes. |
| Separator label, Label annotation, Badge | `components/separator/Separator.vue:74-85`, `label/Label.vue:67`, `badge/Badge.vue` | snaps | cut | Prop-driven, rare. |
| HandMark shape | `components/handmark/HandMark.vue:395-397` | prop swap | prop swap | The draw-on is animated; the shape swap is not. Rare. |

## Hover statements of intent

Pass: a plate, fill or shape enters and leaves by a tween. Weak: it passes P0 but rests on the retired specular gleam or on a border alone. Fail: text colour or opacity alone, or no hover at all.

| Control | Where | Hover | Verdict |
|---|---|---|---|
| Dialog and sheet close | `components/dialog/styles.css:115-133` | plate grows to `--scale-hover` and fills | pass, and the model to copy |
| Pager dot | `components/pager-dots/PagerDots.vue:577-580` | colour and grow to 1.14 | pass |
| Dock icon button | `components/dock/styles/controls/icon-button.css:126-131` | fill fades in place, plus gleam | pass |
| Dock tab button | `components/dock/styles/controls/tab-button.css:67-72` | fill fades in place, plus gleam | pass |
| Dock triggers (select, dropdown) | `components/dock/styles/controls/triggers.css:72-77` | fill fades in place | pass |
| Dock switcher tab | `components/dock/styles/layer-group.css:275-283` | fill fades in place | pass |
| Menu, select and command rows | `components/_shared/menu/menu.css` (`.glass-menu-row:hover`) | fill and a 1 px lift | pass |
| Button, quiet emphasis | `components/button/styles.css:196-203` | fill | pass |
| Button, glass emphasis (primary, secondary) | `styles/glass/glass-capsule.css:93-116` | specular gleam only | weak; nothing left once C-2 lands |
| Button, text emphasis | `components/button/styles.css:205-207` | underline, untweened | fail |
| Select trigger | `components/select/SelectTrigger.vue` template, `styles/glass/control-surfaces.css:85-87` | fill and gleam | pass |
| Field controls | `components/_shared/field/control.css:210-222` | edge rung | weak (border only) |
| Switch, checkbox, radio | `styles/glass/control-bit.css:296-300` | face fill | pass |
| Toggle group item | `components/toggle-group/styles.css:105-125`, `control-surfaces.css:85` | fill | pass |
| Chip, interactive | `components/chip/chipVariants.ts:6` | specular gleam only | weak |
| Slider | `components/slider/styles.css:254-256` | fill densifies | pass; the thumb has none |
| Accordion trigger | `components/_shared/disclosure/disclosure.css:85-87` | fill | pass |
| Collapsible trigger | `components/_shared/disclosure/disclosure.css` (`.disclosure-trigger` has no hover rule) | none | fail, unless the consumer passes a Button with `as-child` |
| Configurator layer trigger and reset | `components/configurator/styles.css:245-260` | fill | pass |
| SegmentedTabs, pill | `components/tabs/styles/segmented.css:222-224` | text colour only | fail |
| SegmentedTabs, underline | `components/tabs/styles/segmented.css:308-310` | text colour only | fail |
| DarkModeToggle | `components/dark-mode-toggle/dark-mode-toggle.css:16-28` | opacity 0.8 to 1 only | fail |
| ExpandableContainer trigger | `components/expandable-container/styles.css:85-87` | text colour only | fail |
| Data-table sort header | `components/data-table/styles.css:76-90` | none | fail (the affordance map says it is a composed Button; it is a raw `<button>`) |
| Data-table interactive row | `components/data-table/styles.css:103-111` | fill | pass |
| Sortable item | `components/sortable-list/styles.css:129-133` | fill | pass |
| Sortable handle | `components/sortable-list/styles.css:180-184` | text colour only | fail |
| Timeline mark | `components/timeline/Timeline.vue:663-676` | grow and fill, but untweened | fail (it snaps) |
| Toast action | `components/toast/ToastAction.vue:22` | fill | pass |
| Toast close (corner affordance) | `components/toast/ToastClose.vue`, `styles/glass/dissolve.css:191-220` | none found | fail |
| Sheet detent handle | `components/sheet/styles.css:290-295` | grip opacity | weak |
| Carousel next and previous, NumberField steppers, EasingPicker buttons | compose `<Button>` | as Button | as the emphasis used |

Of the 31 graded rows (the composed-Button row is not graded), 17 pass, 4 are weak and 10 fail. None of the passing fills grows or changes shape; they fade in place.

## Large and focused elements: idle, interactive, progress, done

| Element | Idle | Interactive | Progress | Done |
|---|---|---|---|---|
| Dock (`components/dock/GlassDock.vue`) | none | yes: hover, grasp, collapse and expand morph | none | none |
| Dialog (`components/dialog/DialogContent.vue`) | none | yes: rebuff on outside press (`data-rebuff`) | none; a busy dialog has no state | none |
| Sheet (`components/sheet/SheetContent.vue`) | none | yes: drag and detents | none | none |
| Card (`components/card/Card.vue`) | none | selectable cards only | none; no loading prop | none |
| DataTable (`components/data-table/DataTable.vue`) | none | row hover and selection | skeleton rows, left by a cut | rows arrive by a cut |
| Command palette (`components/command/`) | none | row highlight | none | none |
| Configurator (`components/configurator/Configurator.vue`) | none | sections open and close | none | reset only |
| Button (`components/button/Button.vue`) | none | hover and press | DotRing, entered by a tween, left by a cut | none; no success state |
| Progress (`components/progress/Progress.vue`) | indeterminate band | none | fill travel | one discharge glow |
| Slider (`components/slider/Slider.vue`) | none | approach, grasp, loupe, veil | n/a | n/a |
| Timeline (`components/timeline/Timeline.vue`) | flow band on the active segment | mark hover (snaps) | active segment | check draws on |
| Metric (`components/metric/Metric.vue`) | none | none | loading plate, left by a cut | value arrives by a cut |
| Toast (`components/toast/Toast.vue`) | none | swipe | none | none |
| Field control (`components/_shared/field/control.css`) | none | hover, focus, invalid | none | none |
| ExpandableContainer | none | expand birth | none | none |

Restraint allows idle motion only for ambient identity, so a missing idle loop is not a defect by itself; "idle" here means a large element that shows it is alive at rest. The real gaps are progress and done: only Progress, Timeline and Button carry a progress state, and only Progress and Timeline mark done.

## The twenty worst snaps, by how often a user meets them

1. **The dock re-fits at once when a live layer's content changes**: a section label, a route, a seat count. `components/dock/composables/dockMorphMeasure.ts:186-230`. Every navigation in a docked app (G-4).
2. **The focus ring appears and leaves between two frames** on every `.focus-ring` control. `styles/utilities/base.css:144-151`. Every Tab press. Restraint and P0 disagree here; this one needs the owner's ruling rather than a cure.
3. **A form's error or description line mounts by `v-if`** and pushes the form down in one frame. `components/labeled-field/LabeledField.vue:50, 64`. Every invalid submit and every blur that validates.
4. **The command list and its dialog resize on each keystroke** as the filtered row count changes. `components/command/CommandList.vue`, `components/dialog/styles.css:21-30`.
5. **The Button's loading ring widens the button at once and leaves by a cut**. `components/button/Button.vue:197`. Every async action.
6. **An auto-width select trigger jumps to the new value's width**, and the value text swaps in one frame. `components/select/SelectValue.vue:35`, `components/tabs/SegmentedTabs.vue:162-170`, the dock select trigger.
7. **The dock's active seat**: the highlight does not travel between seats, and on an icon seat the border and the capsule's backdrop switch on at once. `components/dock/DockControl.vue:97`, `styles/controls/icon-button.css:192`, `styles/controls/tab-button.css:96-99`. Every dock navigation.
8. **Menu and select check and radio marks pop.** `components/menu/DropdownMenuCheckboxItem.vue:50-53`, `DropdownMenuRadioItem.vue:46-49`, `components/select/SelectItem.vue:76-84`. Every multi-choice menu pick.
9. **The other toasts jump** when one arrives or leaves. `components/toast/Toaster.vue:107-122`.
10. **DataTable state and row changes cut**: skeleton to rows, rows to empty, re-sort, filter. `components/data-table/DataTable.vue:285-480`.
11. **Reduced motion cuts everything**, contrary to P0 and P6. `styles/utilities/a11y-overrides.css:46-53`, plus the local `transition: none` rows and the dock spring's jump (`components/dock/composables/useDockSpring.ts:103`, `DockCrossfade.vue:218`). For a reduced-motion user this is every interaction.
12. **Icon swaps by `v-if`**: Play and Pause, copy and check, the transport icon and label (which also resizes its button), the checkbox Minus and Check, the sort glyph. `components/dock/DockBackgroundToggle.vue:72`, `components/easing/EasingPicker.vue:577-588`, `components/checkbox/Checkbox.vue:48`, `components/data-table/DataTable.vue:401`. The study's icon-morph piece lands here.
13. **The dock's `#persistent`, `#persistent-end` and `#search` regions mount and unmount with no size tween.** `components/dock/GlassDock.vue:483, 576, 592` (daraksha row 7).
14. **The slider's loupe pops in** with no `@starting-style`, and may be cut on release. `components/slider/Slider.vue:335`, `styles.css:526-537`. Every scrub.
15. **Popovers and tooltips flip sides and resize in one frame** when their content or room changes. `components/popover/PopoverContent.vue:61`, `components/tooltip/TooltipContent.vue:40`.
16. **The theme flip re-tints the page in one frame.** `composables/dark/useGlobalDark.ts:92-111`.
17. **Avatar images and Metric values arrive by a cut** over their fallback or loading plate. `components/avatar/AvatarImage.vue`, `components/metric/Metric.vue:64`.
18. **Timeline marks snap on hover and on state**, and the detail pane's old content is cut. `components/timeline/Timeline.vue:373, 578-676`.
19. **Pager dots: the pip leaving the window is cut and the edge pip shrinks at once.** `components/pager-dots/PagerDots.vue:353-370, 500-504` (O-250, O-261 remainder).
20. **ExpandableContainer and the card condense**: the fullscreen exit cuts and the page reflows under it (`components/expandable-container/styles.css:6-16`); the condensing card header jumps in height (`components/card/scroll.css:100-106`).

Next after these: the Progress error recolour and indeterminate band (`components/progress/Progress.vue:165`, `styles/glass/track-flow.css:53`), the StatusDot state swap (`components/status-dot/StatusDot.vue:126-236`), the DockCrossfade reserve growth (`components/dock/DockCrossfade.vue:96`), and the corner swap at the dock's arm and settle (`components/dock/styles/morph.css:176`, which needs a frame reading on master).

## For the propose seat

- Most rows cure with three pieces, not twenty: a size tween for a box whose content changes (measure, then a transform over the settled box, per P5); a `<Transition>` (or `@starting-style` plus an exit keyframe) for every `v-if` swap of a mark, icon or line; and a reduced-motion carve that keeps a short opacity fade instead of zeroing every clock. Each piece removes the bespoke rules it replaces.
- The dialog close button is the in-house model for a hover plate that grows. The pager dot is the in-house model for a mark that grows and changes colour.
- Doc drift to fix alongside: P6 in `docs/precepts/motion-canon.md` describes a carve that no longer exists. `affordance-map.md` lists the DataTable sort control as a composed Button, which it is not. The map's HOVER-LIFT column claims `scale-hover` on Button and dock controls, which were both removed (U/B8r I-2).
