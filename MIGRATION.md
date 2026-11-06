# MIGRATION

The per-version migration guide for `@mkbabb/glass-ui`. Each `## <version>` section
records the breaking changes that landed in that cut, newest first. Clean breaks only
— no legacy aliases, no back-compat shims; every break is a one-line
rename or import re-point per call site.

## 11.0.0

The CHANGELOG's 11.0.0 entry lists every breaking change with its migration step. The
sections below give the detail.

### The dock's hover and its closed corner

- **No dock control grows on hover any more.** `.dock-icon-button` and `.dock-tab-button`
  used to answer a hover with `scale: 1.1`, so a small control such as a figure dock's
  view toggle swelled under the pointer. A hover now changes the fill and the highlight
  only, and a press keeps its spring. We deleted the `--scale-hover-dock` token along
  with its last readers, so a stylesheet that sets or reads it should delete that
  declaration. Nothing replaces it.
- **A closed dock with a persistent control keeps a rounded-rectangle corner.** A closed
  horizontal dock always took `--radius-circle` (50%). When a `#persistent` control sits
  beside the summary, the box is two cells wide, so 50% drew an oval. That dock now takes
  `--radius-dock` (16 px), the same corner it wears when open. A dock of one cell is
  still a circle.

### Backdrops, the still aurora and the dock trigger

- **`DockBackdropMode` is removed, and the type is now `BackdropMode` in `./axes`.** The
  same `"live" | "static"` union also types the new `backdropMode` prop on `Surface` and
  `Card`. If you imported the type by name, import `BackdropMode` from
  `@mkbabb/glass-ui/axes` instead. There is no alias.
- **`Surface` and `Card` take `backdropMode`.** With `"static"`, the plate keeps its
  fill, edge and rim but skips the backdrop filter, and it carries
  `data-backdrop-mode="static"`. Use it for plates that sit in the page flow over a
  field that does not move. The default, `"live"`, behaves as before.
- **`./aurora` exports `STILL_FIELD`.** It is a partial config that zeroes the four drift
  axes and the animated film grain (`paperGrain`), while the canvas texture stays. Spread
  it last over a field config, and the render loop parks after the first frame. This is
  additive.
- **`DockTrigger` moves from `./dock` to `./dock-trigger`.** Import it with
  `import { DockTrigger } from "@mkbabb/glass-ui/dock-trigger"`. Since `dist/dock.js` no
  longer imports reka's `SelectTrigger`, `SelectIcon` or `PopoverTrigger`, or the
  `DropdownMenuTrigger` chunk, a page that shows a `GlassDock` at first paint and opens
  menus only later keeps that code out of its entry bundle. There is no alias.

### Menus and modals

- **`<DropdownMenu trigger="context">` becomes `<ContextMenu>`.** The right-click menu is
  its own root now, so a page that renders only `DropdownMenu` no longer bundles reka's
  context-menu code. The parts (`DropdownMenuTrigger`, `DropdownMenuContent`,
  `DropdownMenuItem` and the rest) are unchanged and work under both roots.
  `DropdownMenu` loses its `trigger` prop, `DropdownMenuProps` now describes the click
  menu alone, and `ContextMenuProps` has only `dir` and `modal`. We removed the public
  `MenuTrigger` type, so code that imported it should drop that import.

  ```diff
  - <DropdownMenu trigger="context">
  + <ContextMenu>
      <DropdownMenuTrigger as-child>…</DropdownMenuTrigger>
      <DropdownMenuContent>…</DropdownMenuContent>
  - </DropdownMenu>
  + </ContextMenu>
  ```
- **A modal `Dialog`, `SheetContent` or `CommandDialog` no longer locks `body`.** While
  its scrim is showing, the root element (`html`) carries `overflow: hidden`, and `body`
  keeps its own overflow and padding. reka's `--scrollbar-width` property on the root and
  its `padding-right` compensation on `body` are gone, because the root's
  `scrollbar-gutter: stable` already keeps the layout still. If your code read
  `--scrollbar-width`, or checked `body.style.overflow` to detect an open modal, read
  `document.documentElement.style.overflow` instead. reka's `ConfigProvider`
  `scrollBody` option no longer affects glass modals. The `pointer-events: none` guard
  that reka puts on `body` while a modal is open is unchanged, and when the modal closes,
  `body` gets back whatever inline `pointer-events` you had set.
- **A dock samples its live backdrop when the field draws.** The dock reads the
  backdrop each time the field canvas announces a frame, which every glass canvas
  (Aurora, Blob, and any field built on `useWebGLCanvas`, `useWebGPUCanvas` or
  `useCanvas2D`) does on each draw. A `backgroundCanvas` you draw yourself, outside
  those helpers, is sampled on mount, resize, scroll, theme change and at the end of a
  transition on it, but not on each of its own frames.

### Shape, glide and the dropdown system

Each change below is a clean break with no alias.

- **SegmentedTabs glides, and the eyeglass, the press squish and the capsule hover are
  gone.** The indicator moves by `translate`, `width` and `height` on `--spring-dock` and
  keeps its size, so neither material deforms. These are removed with no replacement:
  the `--eyeglass-span-max` token, the `data-eyeglass-wake` and `data-eyeglass-clamped`
  attributes, the `--stretch` channel on the tabs indicator, the label
  `transition-delay`, the press animation, and `.glass-capsule-hover` on inactive tabs.
  If you declared `--eyeglass-span-max`, delete the declaration. A drag (`motion="full"`)
  still follows the pointer and snaps, but it no longer squishes.
- **There is a new token, `--hover-ink-mix: 45%`.** It sets how far an inactive label's
  colour moves from `--muted-foreground` toward `--foreground` on hover. This is
  additive.
- **The selection engine no longer deforms.** With SegmentedTabs gliding, the dock's
  layer switcher was the last indicator that stretched, and it now glides the same way.
  We removed these from `@mkbabb/glass-ui/motion-core` with no replacement: the `deform`
  parameter and the `SelectionDeform` type, `squishOnTravel` (from both
  `useSelectionIndicator` and `useSelectionGroup`), the `activeValues` parameter of
  `useSelectionIndicator`, the `onSelect` parameter of `useSelectionGroup`, and the
  constants `DEFAULT_INDICATOR_MAX_STRETCH` and `INDICATOR_RELEASE_AT_ARRIVAL`. The
  `--tab-indicator-max-stretch` token is deleted too. If you pass any of these, delete
  the argument.
- **`.glass-capsule-hover` no longer moves, and `ToggleGroupItem` no longer squishes.** A
  hover no longer scales a capsule (it used to grow by 1.015 on
  `--ease-cartoon-punch`), and the capsule's `:active` press snap is gone, while the
  catch-light stays. `ToggleGroupItem` drops `.tap-squish` and its `--scale-press`
  adjustment. This changes paint and motion only, not the API. `.tap-squish` and
  `useLiquidPress` on Button, Switch, Checkbox, Radio and the dock controls are
  unchanged.
- **`--radius-pill` is now `1rem`, and there is a new `--radius-circle: 50%`.** A box up
  to 32 px tall still shows a full pill, since the browser clamps a radius to half the
  shorter side, but a taller box shows 16 px corners. Glass's own circles now use
  `--radius-circle`: the avatar, status dot, dot ring, pager dot, switch thumb, radio dot,
  dark-mode toggle, dock icon button, dialog close button, icon chip and chip remove
  button, menu radio dot, expandable trigger and the collapsed dock at rest.
  `--mark-stadium` is set for `.badge-atom` only. The dock's cut cap rests on
  `--radius-dock` and cuts to `--radius-xs`. This is a visual break. A box of yours taller
  than 32 px that read `--radius-pill`, `--radius-control`, `--radius-tab`,
  `--radius-badge` or `--radius-dock` now shows corners, and a circle of yours that used
  the pill radius on a box taller than 32 px should switch to `--radius-circle`.
- **`GlassDock` gains `expandOn`, `anchor` and `collapsedLabel`.** These are additive, and
  each one defaults to the old behaviour (`"hover"`, `"center"` and `"Expand dock"`).
  The new types `DockExpandOn` and `DockAnchor` are exported. With
  `anchor="start"` or `anchor="end"` the root carries `data-anchor`, which your own CSS
  can key on, and that is all `anchor` does. It does not move the dock or change its
  morph. The morph grows from whichever edge your layout places the dock at, because its
  origin is measured when the morph starts, so the dock, its `#persistent` group and its
  panes all hold that edge. A dock your layout centres grows on both sides whatever
  `anchor` says, so to hold an edge, place the dock in a wrapper sized to its content.
- **There is one dropdown system.**
  - `DropdownMenu` now defaults to `modal: false`. Pass `modal` for a menu that must
    make the rest of the page inert, and a modal menu still takes reka's body scroll
    lock.
  - `SelectContent` passes `bodyLock: false`, and its 4 px gap to the trigger is now
    `sideOffset: 4`. The old default was `0` plus a `translate-*-1` nudge, which is gone.
  - `ExpandableContainer` locks scrolling on `<html>` instead of `<body>`.
  - The root element carries `scrollbar-gutter: stable` (through `:where(html)`, so it
    has no specificity).
  - `DropdownMenuContent`, `PopoverContent` and `SelectContent` pass
    `collisionPadding: 16`.
  - The menu, panel and listbox plates take
    `max-inline-size: min(22rem, 100vw - 2rem)`. Their `max-block-size` is the available
    height reka measures, with no `--overlay-max-block` clamp, and the element that
    scrolls has `overflow-y: auto` and `overscroll-behavior: contain`. The command list
    and the hint still use `--overlay-max-block`. The select viewport loses
    `max-h-[inherit]`.
  - Below 30rem, `SelectContent` opens as a bottom sheet and carries
    `data-form="sheet"`.

  If you relied on a dropdown making the page inert, pass `modal`. If you styled
  `[data-slot="select-content"]` by its `data-side` translate, drop that rule.
- **There is a new `--radius-bar` token and a `data-shape="bar"` attribute.**
  `--radius-bar` is `var(--radius-panel)` (12 px). `Button`, `ToggleGroupItem` and
  `SegmentedTabs` carry `data-shape="bar"` and take `--radius-bar` when the label wraps,
  when the box is taller than its rung (`min-block-size`), or when it is wider than
  20rem. A single-line control on its rung keeps the pill, and `ToggleGroupItem` now
  caps its pill radius at half its rung, as `Button` does. If your own CSS keyed on the
  round corner of a wide or wrapping button, select `[data-shape="bar"]` instead.

### Styles, the aurora and the dock's hit box

- **Per-component sheets are no longer part of `@mkbabb/glass-ui/styles`.** The rules for
  the Configurator, MusicStaff, Metric, Deck (stage, turn, capture and reveal), Carousel
  and SortableList now load with their component's module. If you import the component
  from its subpath or from the root, nothing changes for you. If you write these class
  names on your own markup without importing the component, those rules no longer
  reach it. The sheets are not package exports, so render the component or copy the
  rules you need. The sheets still sit in `@layer components`, so they rank against the
  entry exactly as before.
- **The aurora's static ground no longer follows nucleus positions.** If you moved nuclei
  to shift the static ground (on the `"css"` substrate, or before the canvas starts),
  you now see the ground the preset mounted with, while the live canvas still moves. To
  change the ground, change the palette or the field shape. `.aurora-placeholder` is now
  two elements, so a selector that assumed one element should select
  `[data-aurora-ground-active]`.
- **A dock its owner opens takes taps while it morphs.** If you delayed your own scrim or
  row handlers to wait out the dock's click-integrity window, you can arm them as soon
  as the dock opens. The delay still applies when the dock opens from a hover.
- **A wheel over an expanded dock run that has reached its end no longer scrolls the
  page** in Firefox, which now matches Chromium.
- **There are two new exports**, `auroraGroundKey(config)` and
  `GpuSubstrateOptions.prepare`.

### Package layout, the shadow and a lighter entry

- **`dist/glass-ui.css` is removed, and `@mkbabb/glass-ui/styles` no longer carries any
  component's own rules.** Each component chunk imports its own sheet
  (`dist/<chunk>.css`), so a bundler consumer needs no change, since the sheet loads with
  the component. A test suite that runs in Node and imports a glass component now meets
  a `.css` import in many more chunks. Let the test runner's bundler transform
  glass-ui, for example with vitest's `server.deps.inline: [/@mkbabb\/glass-ui/]`. If you
  styled glass markup through those rules without rendering the component (copied
  markup or server-rendered HTML), the rules no longer reach it, so render the component
  or import its chunk.
- **A component subpath, and the root entry, can no longer be imported in plain Node
  without a CSS loader**, because their chunks import stylesheets. This now holds for
  every subpath whose components carry styles (`/aurora`, `/status-dot`,
  `/toggle-group`, `/timeline` and others), as it already did for the root entry,
  `/carousel`, `/configurator`, `/deck`, `/metric`, `/music-staff` and
  `/sortable-list`. Composable and utility subpaths are unchanged. A Node script or test
  that imports them should register a loader that maps `.css` to an empty module, or run
  through a bundler (vitest with glass-ui inlined).
- **Component rules now load after the `/styles` entry, not inside it.** They stay in
  `@layer components`, so your `utilities` layer still wins. Within `components`, a
  component's rule now follows `components.css` and `accessibility.css` in document
  order. We checked every element that carries one of the accessibility classes and
  found none that also gets a component rule setting the same property.
- **`./styles.css` (`dist/component-styles.css`) now holds only the three shared
  registers** (`track-well`, `track-flow` and `value-marks`). The component rules it used
  to pull in through `glass-ui.css` now load with their chunks.
- **`dist/components/_shared/field/control.css` is no longer published.** Nothing ever
  loaded it, because its rules ship through the field components' own styles, which are
  now in `dist/control.css`.

## 10.1.2

Two behaviour changes, no type change. **A custom dock seat must now carry
`data-glass-dock-seat` to rove.**

- **A morph reserves the size it settles at.** The dock no longer reserves an
  old width on an expand or for the rest of a morph when its full pane changes (a
  breakpoint that swaps its controls) or its host changes (a viewport or container that
  resizes) while it is collapsed or morphing. So the page no longer scrolls sideways
  for the length of the morph, and the box no longer snaps at settle. Both endpoints are
  the root laid out at rest in their posture, read from the live layout on every
  capture, under whatever constrains the dock, including while it morphs. A consumer
  that clipped the page or the dock band, or overrode `--dock-expanded-px`, to hide that
  overflow can delete the workaround. A dock whose pane and host are stable morphs as
  before.

- The dock run roves a direct child only when it carries `data-glass-dock-seat`.
  `DockControl`, `DockTrigger` and `DockBackgroundToggle` set it. A consumer's own seat
  that should share the run's one tab stop and answer its arrow keys (a `RouterLink`, a
  bespoke button, a `[role=button]` element) adds the attribute itself:
  `<RouterLink data-glass-dock-seat to="/a">`. A `DockControl as-child` already sets it
  on the child.
- A declared seat must stay focusable. A custom seat that is disabled carries
  `aria-disabled="true"` and blocks its own activation, never the native `disabled`
  attribute: `<button data-glass-dock-seat aria-disabled="true">`. A native-disabled seat
  that holds the run's stop takes every seat out of the Tab order. A disabled
  `DockTrigger` now renders `aria-disabled`, like `DockControl`, so it stays in the Tab
  and arrow order as a disabled stop where 10.1.1 skipped it, and paints disabled from
  `.dock-trigger[aria-disabled="true"]`. A rule of yours that dims or suppresses a dock
  trigger on `:disabled` keys on `[aria-disabled="true"]` instead.
- An undeclared child is left alone. It keeps its natural tab stop and its own keys, so a
  filter trigger, a settings button, a handle, an input pair, a dark toggle or a composite
  stays in the Tab order. A consumer that pulled such a control out of its dock run, or
  restored its `tabindex`, to get it back into the Tab order can undo that.
- `.dock-run` carries `role="toolbar"` and `aria-orientation` only when every child is a
  declared seat, glass's `<DockSeparator>` and the native
  `<select aria-hidden="true" tabindex="-1">` a named `Select` renders inside a `<form>`
  aside. A consumer's own `role="separator"` splitter, or an `aria-hidden` wrapper around a
  control that still takes Tab, is an undeclared child and voids the claim. A dock whose run mixes declared seats
  with other controls no longer announces as a toolbar. To keep the role, declare every
  seat, or move the undeclared controls to `#persistent` / `#persistent-end`.
- A test or probe that read `role="toolbar"` off an empty run, or off a run of plain
  buttons, now finds no role. Seat the run with declared controls.
- Atlas and value.js: the contract and the build path are in `CHANGELOG.md` §10.1.2.

## 10.1.1

One type-level change, below; no runtime break. Behaviour a consumer may notice:

- **`DockContext` gains a required `expanded: ComputedRef<boolean>`.** The dock's posture,
  whose falling edge closes the overlays its seats opened. A consumer that calls the
  exported `provideDockContext` itself (none of the sibling repos does) passes it. A
  `GlassDock` provides it; nothing changes for a consumer that only reads the context.
- **A dock collapse closes the menus, popovers and selects its seats opened, and focus
  that stood in them moves to the dock's summary.** The seats are the default slot's; an
  overlay opened from `#persistent` or `#persistent-end` stays open, since its trigger is
  still there. A consumer that closed them by hand on collapse can delete that code. To keep the dock open while an overlay is up, use the
  existing `keepDockOpen` (Popover) or `keepOpen`/`release`.
- **The dock run no longer roves a seat that holds controls.** A container seat (a `div`
  holding a ToggleGroup, a slider, a band of buttons) and a composite root seated directly
  (a RadioGroup) keep their own tab order and their own arrow keys. Arrows travel only the
  seats that are controls. Nothing to change unless a consumer relied on the run focusing
  a container's first control.
- **Overlay content takes its z rung from its role.** `DropdownMenuContent` and
  `DropdownMenuSubContent` now paint at `--z-popover`. A consumer that added `z-popover` (or
  any z class) through `class` keeps its class: the consumer class merges last.
- **`SheetContent` carries the `fixed` utility.** Sheets that rendered in page flow now
  open at their edge. A consumer override that positioned the sheet itself can be deleted.
- **New:** `<Skeleton shimmer>`.

## 10.0.0

The breaking changes are the cascade layer, the three
published names that leave, the `AuroraAtoms` narrowing and `text-caption`'s upright
paint, so the release is a major, and the rest rides it. Two blocks written after 9.0.0
also ship in this release: _Amended after 9.0.0_ under §9.0.0 (the keyboard
registry) and _Amended after 9.0.0_ under §8.1.0 (`darkModeSyncScript`'s `defaultDark`
object form and write order). They are not repeated here. The non-breaking paint and
default changes are listed under `CHANGELOG.md` 10.0.0; the one paint row below is the
one that needs a decision from you.

Four more breaks are marked below: `cm-serif` leaves for `font-serif-math`, `useSidebarFollow` exempts by attribute,
`parentId` names the direct parent, and `SegmentedTabs` goes generic (type-level:
`InstanceType<typeof SegmentedTabs>` no longer compiles; runtime unchanged). Those
rows run from _The token-root contract_ to the end of this section, and three of them are
paint or rendered-text rows (_`Metric`'s delta paints the one ink_, _Paint: three label
sites clear 4.5:1_, _The tooltip chip pairs its size with the caption leading_) beside the
paint row above.

_This file ships in the package_

`package.json` declares `files: ["dist", "MIGRATION.md"]`, so from 10.0.0 the guide for
the version you pinned is at `node_modules/@mkbabb/glass-ui/MIGRATION.md`. Additive:
nothing to do.

_Every library style rule moves into `@layer components`_

Every top-level style rule the package ships, through both CSS entries (`./styles` and
`./styles.css`), now sits in `@layer components` — `.css` files and SFC `<style>` blocks
alike. `./styles.css` now opens with `@layer theme, base, components, utilities;`, the
order `./styles` already declared, so a consumer importing only that entry gets the same
order.

**What moves for you: your overrides win whatever their specificity.** Any rule of
yours, unlayered or in `@layer utilities`, now beats a library rule whatever the two
selectors weigh. A utility class on a library component that used to lose to the
component's own rule now paints: `class="absolute inset-0"` on `<Constellation>` or
`<Blob>`, `max-h-80` on `<CommandList>` (384 → 320px), a `gap-*` on content slotted into
`<Configurator>`'s presets, `rounded-dialog` on `<DialogContent>` (the corner goes 24 →
16px, because your class now beats `:where([data-slot="dialog-content"])`'s
`--radius-3xl`), and your own `forced-colors` edges on library surfaces. A disabled
`SortableList` handle shows `cursor: not-allowed` (was `grab`). If you were relying on
the library rule to win, remove the class that fights it.

**`!important` runs the other way.** Important declarations rank earlier layers first,
so a library `!important` now beats a consumer `!important` in `@layer utilities` or in
unlayered CSS. 47 moved into `components` in six files — `deck/styles/capture.css` 27,
`accessibility.css` 12, `utilities/a11y-overrides.css` 4, `blob/Blob.vue` 2,
`handmark/HandMark.vue` 1, `view-transition.css` 1 — and one moved into `utilities` with
`paper.css`'s fold. To win against one, declare yours `!important` in a layer ordered
before `components`; a declaration without `!important` never beats an important one, in
any layer. Under reduced motion, for example, an element of yours carrying `animation:
none !important` now computes the library's PRM `animation-duration: 0.01ms` instead of
`0s`; its `animation-name` stays `none`, so nothing animates.

**The library's own paint moves in four places**, measured on the demo under
`forced-colors` and reduced motion: `.glass-resting.ghost-slot` draws its forced-colors
edge `dashed` (was `solid`; the colour stays `CanvasText`); `.card.cartoon-surface`
draws it `2px` (was `1px`); `.glass-reveal` at rest under PRM computes `scale: 1` and
`translate: 0px -1px` (was `none`; no motion returns); `.glass-menu-row` under PRM gains
`translate, scale` in `transition-property` (every duration is still zeroed). And the
coarse-pointer hit expansion in `glass/dissolve.css` is layered now, so a consumer layer
ordered after `components` can re-order that floor.

**What stays outside the layer.** The token roots — rules whose selector is `:root`
and/or `.dark` and whose every declaration is a custom property, with `color-scheme` and
`accent-color` admitted on that pair (the scheme switch has to share the tokens' rank);
the `@utility`, `@theme`, `@property`, `@font-face` and `@keyframes` at-rules; and one
named exception, `components/slider/styles.css` (47 rules), unlayered on purpose so the
slider's sizing and state legs beat the layered groove and fill it composes without an
`!important` (its own header says so). `paper.css`'s five rules did not move into
`components`: they folded into the `@utility paper-underpaint` and `@utility
paper-grain-overlay` definitions they overrode, so they rank in `utilities` beside them.

**The layered set, by file and selector** — 466 rules in 48 files, every one unlayered
at `695d4925` (the tree this cut layered) and every one layered now. Paths are under
`src/`; a selector list repeats where a file has several rules for it (a base rule and a
`@media` arm, say).

| file | rules | top-level selectors, in source order |
| --- | --- | --- |
| `components/_shared/disclosure/disclosure.css` | 4 | `.disclosure-content` · `.disclosure-icon` · `.disclosure-item` · `.disclosure-trigger:focus-visible` |
| `components/_shared/menu/menu.css` | 1 | `.glass-menu-row` |
| `components/aurora/Aurora.vue` | 10 | `.aurora-root` · `.aurora-root > .aurora-placeholder, .aurora-root > .aurora-canvas-layer` · `.aurora-root > .aurora-placeholder` · `.aurora-placeholder` · `.aurora-canvas-layer` · `.aurora-canvas-layer--armed` · `.aurora-canvas-layer` · `.aurora-root` · `.aurora-root > .aurora-canvas-layer` · `.aurora-placeholder` |
| `components/avatar/styles.css` | 11 | `.avatar` · `.avatar[data-size="md"]` · `.avatar[data-size="lg"]` · `.avatar__identity, .avatar__image, .avatar__fallback` · `.avatar__identity` · `.avatar__image, .avatar__fallback` · `.avatar__image` · `.avatar__fallback` · `.avatar[data-size="md"] .avatar__fallback` · `.avatar[data-size="lg"] .avatar__fallback` · `.avatar__status` |
| `components/blob/Blob.vue` | 7 | `.goo-blob-wrapper` · `.goo-blob-wrapper:hover` · `.goo-blob-canvas` · `.goo-blob-hit` · `.goo-blob-hit:focus-visible` · `.goo-blob-hit:disabled` · `.goo-blob-wrapper` |
| `components/command/styles.css` | 16 | `.command` · `.command-dialog__content` · `.command__input-wrapper` · `.command__input-icon` · `.command-dialog__content .command__input-icon, .command-dialog__content .command__item > svg` · `.command__input` · `.command-dialog__content .command__input` · `.command__input::placeholder` · `.command__input:disabled` · `.command__list` · `.command__group` · `.command__group-label` · `.command__item[data-disabled]` · `.command__empty` · `.command__separator` · `.command__shortcut` |
| `components/configurator/ConfiguratorLayer.vue` | 2 | `.configurator-layer-region` · `.configurator-layer-region` |
| `components/configurator/ConfiguratorRow.vue` | 6 | `.configurator-row[data-size="sm"]` · `.configurator-row[data-size="md"]` · `.configurator-row[data-size="lg"]` · `.configurator-row` · `.configurator-row` · `.configurator-row` |
| `components/configurator/styles.css` | 42 | `.configurator-shell` · `.configurator > .configurator-presets, .configurator > .configurator-aside` · `.configurator-section-label` · `.configurator-presets` · `.configurator-presets .configurator-gallery-track, .configurator-presets [role="group"]` · `.configurator-layer` · `.configurator-layer:has(+ .configurator-layer)` · `.configurator-layer + .configurator-layer` · `.configurator-layer-trigger` · `.configurator-layer-body` · `[data-slot="configurator-reset"]:hover` · `.configurator-layer-trigger:hover` · `.configurator-layer-body[data-dividers] > * + *` · `.configurator-aside, .configurator-presets, .configurator-footer` · `[data-slot="configurator"] > [data-gallery-dock]` · `[data-slot="configurator"] > .configurator-stage` · `[data-slot="configurator"] > .configurator-aside` · `[data-slot="configurator"]` · `[data-slot="configurator"][data-gallery="aside"] > [data-gallery-dock]` · `[data-slot="configurator"][data-gallery="aside"] > .configurator-stage` · `[data-slot="configurator"][data-gallery="aside"] > .configurator-aside` · `[data-slot="configurator"][data-gallery="top"] > [data-gallery-dock]` · `[data-slot="configurator"][data-gallery="top"] > .configurator-stage` · `[data-slot="configurator"][data-gallery="top"] > .configurator-aside` · `[data-slot="configurator"] > .configurator-aside` · `[data-slot="configurator"][data-aside-side="left"] > .configurator-aside` · `[data-slot="configurator"] > [data-gallery-dock]` · `[data-slot="configurator"][data-gallery="aside"] > [data-gallery-dock]` · `[data-slot="configurator"][data-gallery="top"] > [data-gallery-dock]` · `.configurator-preset-tile` · `[data-slot="configurator"][data-gallery="top"] .configurator-preset-tile` · `.configurator-preset-well` · `.configurator-preset-well.is-loading` · `.configurator-preset-well.is-loading` · `.configurator-preset-tile.is-active` · `.configurator-preset-chip` · `.configurator-preset-chip.is-active` · `[data-slot="configurator"][data-aside-side="left"] > .configurator-stage` · `[data-slot="configurator"][data-aside-side="left"] > .configurator-aside` · `[data-slot="configurator"][data-aside-side="left"][data-gallery="aside"] > [data-gallery-dock]` · `.configurator-expand-host[data-state="expanded"] > [data-part="panel"]` · `.configurator-expand-host[data-state="expanded"] .configurator-shell` |
| `components/constellation/Constellation.vue` | 4 | `.constellation` · `.constellation[role="button"]:focus-visible` · `:where(.constellation)` · `.constellation-canvas` |
| `components/dark-mode-toggle/dark-mode-toggle.css` | 1 | `.dark-mode-toggle-button, .dark-mode-toggle-button .toggle-sun, .dark-mode-toggle-button .toggle-circle` |
| `components/data-table/styles.css` | 19 | `.data-table` · `.data-table-cards` · `.data-table-card, .data-table-state` · `.data-table-state` · `.data-table-card-skeleton-title` · `.data-table-cell-skeleton` · `.data-table-action-skeleton` · `.data-table-card-header` · `.data-table-card-title, .data-table-card-value` · `.data-table-card-title` · `.data-table-card-fields` · `.data-table-card-label, .data-table-header-row` · `.data-table-actions, .data-table-actions-cell` · `.data-table-sort` · `.data-table [data-align="center"]` · `.data-table [data-align="right"]` · `.data-table-row-interactive` · `.data-table-row-interactive:hover, .data-table-row-interactive[data-state="selected"]` · `.data-table-card.data-table-row-interactive[data-state="selected"]` |
| `components/deck/styles/capture.css` | 10 | `@page` · `html, body` · `html, body, #app` · `.deck-stage` · `.deck-strip` · `.deck-ground` · `.deck-slide` · `.deck-slide::before, .deck-slide::after` · `.deck-slide:not(:last-child)` · `.deck-stage .sr-only` |
| `components/dialog/styles.css` | 15 | `:where([data-slot="dialog-content"])` · `:where([data-slot="dialog-header"])` · `:where([data-slot="dialog-content"]:has([data-slot="dialog-close"])) :where([data-slot="dialog-header"])` · `:where([data-slot="dialog-title"])` · `:where([data-slot="dialog-description"])` · `:where([data-slot="dialog-footer"])` · `:where([data-slot="dialog-close"])` · `:where([data-slot="dialog-close"])::before` · `:where([data-slot="dialog-close"]):hover::before` · `:where([data-slot="dialog-close"]):active::before` · `:where([data-slot="dialog-close"]):focus-visible` · `:where([data-slot="dialog-content"][data-rebuff])` · `:where([data-slot="dialog-content"][data-rebuff="a"])` · `:where([data-slot="dialog-content"][data-rebuff="b"])` · `:where([data-slot="dialog-content"][data-rebuff])` |
| `components/expandable-container/styles.css` | 14 | `.expandable-container` · `.expandable-container[data-state="expanded"]` · `.expandable-container[data-state="expanded"] > [data-part="panel"]` · `.expandable-container__chrome` · `.expandable-container__chrome[hidden]` · `.expandable-container [data-part="trigger"]` · `.expandable-container [data-part="trigger"][data-position="left"]` · `.expandable-container [data-part="trigger"][data-position="right"]` · `.expandable-container [data-part="trigger"]:hover` · `.expandable-container [data-part="trigger"]:focus-visible` · `.expandable-container[data-state="expanded"] [data-part="panel"]` · `.expandable-container__icon` · `.expandable-container [data-part="trigger"]` · `.expandable-container[data-state="expanded"] > [data-part="panel"]` |
| `components/fourier-field/FourierField.vue` | 3 | `.fourier-field` · `.fourier-field--interactive` · `.fourier-field-canvas` |
| `components/handmark/HandMark.vue` | 10 | `.hm` · `.hm del` · `.hm mark` · `.hm-mark` · `.hm[data-shape="highlight"] .hm-mark` · `.hm-mark--settling` · `.hm-ink` · `.hm-mark` · `.hm-mark--settling` · `.hm-ink` |
| `components/label/Label.vue` | 3 | `.label` · `.label[data-disabled]` · `.label-requirement` |
| `components/labeled-field/LabeledField.vue` | 8 | `.labeled-field, .labeled-field-copy, .labeled-field-control` · `.labeled-field` · `.labeled-field-copy, .labeled-field-control` · `.labeled-field-description, .labeled-field-error` · `.labeled-field-description` · `.labeled-field-error` · `.labeled-field[data-layout="horizontal"]` · `.labeled-field[data-layout="horizontal"]` |
| `components/pager-dots/PagerDots.vue` | 20 | `.pager-dots` · `.pager-bed-layer` · `.pager-dots[data-orientation="vertical"] .pager-bed-layer` · `.goo-dot` · `.pager-dots[data-orientation="vertical"] .goo-dot` · `.goo-dot[data-flip]` · `.goo-dot::before` · `.goo-dot[data-edge]::before` · `.pager-worm-layer` · `.goo-body, .goo-neck` · `.pager-dots[data-orientation="vertical"] .goo-body, .pager-dots[data-orientation="vertical"] .goo-neck` · `.goo-body` · `.pager-dots[data-orientation="vertical"] .goo-body` · `.goo-neck` · `.pager-dot` · `.goo-dot[data-hover]::before` · `.goo-dot[data-press]::before` · `.pager-dots` · `.goo-body, .goo-neck` · `.goo-dot` |
| `components/progress/Progress.vue` | 15 | `.progress-rail` · `.progress-rail[data-size="sm"]` · `.progress-rail[data-size="md"]` · `.progress-rail[data-size="lg"]` · `.progress-rail[data-size="md"]` · `.progress-rail[data-size="lg"]` · `.progress-rail[data-orientation="vertical"]` · `.progress-rail[data-status="error"]` · `.progress-value-fill` · `.progress-rail:dir(rtl) .progress-value-fill` · `.progress-rail[data-orientation="vertical"] .progress-value-fill` · `.progress-liquid-fill` · `.progress-rail[data-state="complete"] .progress-value-fill` · `.progress-value-fill` · `.progress-rail[data-state="complete"] .progress-value-fill` |
| `components/scroll-progress-rim/styles.css` | 9 | `.scroll-progress-rim` · `.scroll-progress-rim__track` · `.scroll-progress-rim[data-orientation="horizontal"] .scroll-progress-rim__track` · `.scroll-progress-rim[data-orientation="vertical"] .scroll-progress-rim__track` · `.scroll-progress-rim__fill` · `.scroll-progress-rim[data-orientation="horizontal"] .scroll-progress-rim__fill` · `.scroll-progress-rim[data-orientation="horizontal"]:dir(rtl) .scroll-progress-rim__fill` · `.scroll-progress-rim[data-orientation="vertical"] .scroll-progress-rim__fill` · `.scroll-progress-rim__fill` |
| `components/separator/Separator.vue` | 10 | `.separator, .separator-segment` · `.separator[data-orientation="horizontal"]` · `.separator[data-orientation="vertical"]` · `.separator-labelled` · `.separator-labelled[data-orientation="horizontal"]` · `.separator-labelled[data-orientation="vertical"]` · `.separator-segment` · `[data-orientation="horizontal"] > .separator-segment` · `[data-orientation="vertical"] > .separator-segment` · `.separator-label` |
| `components/sheet/styles.css` | 46 | `:where([data-slot="sheet-content"])` · `:where([data-slot="sheet-content"][data-detents])` · `:where([data-slot="sheet-content"][data-modal="false"])` · `:where( [data-slot="sheet-content"][data-detents] > [data-slot="sheet-detent-handle"], [data-slot="sheet-content"][data-detents] [data-slot="dialog-header"] )` · `:where([data-slot="sheet-content"][data-dragging])` · `:where([data-slot="sheet-content"] > [data-slot="sheet-content-region"])` · `:where([data-slot="sheet-content"][data-scroll] > [data-slot="sheet-content-region"])` · `:where( [data-slot="sheet-content"][data-side="left"]:not([data-detents]) > [data-slot="sheet-content-region"], [data-slot="sheet-content"][data-side="right"]:not([data-detents]) > [data-slot="sheet-content-region"] )` · `:where( [data-slot="sheet-content"][data-side="left"] > [data-slot="sheet-content-region"] > :only-child, [data-slot="sheet-content"][data-side="right"] > [data-slot="sheet-content-region"] > :only-child )` · `:where([data-slot="sheet-content"][data-detents] > [data-slot="sheet-content-region"])` · `:where( [data-slot="sheet-content"][data-detents] > [data-slot="sheet-content-region"] > :not([data-slot="dialog-header"]):not([data-slot="dialog-footer"]) )` · `:where( [data-slot="sheet-content"][data-detents] > [data-slot="sheet-content-region"] > [data-slot="dialog-header"] )` · `:where( [data-slot="sheet-content"][data-detents] > [data-slot="sheet-content-region"] > [data-slot="dialog-footer"] )` · `:where([data-slot="sheet-content"]:not([data-detents]):has([data-slot="dialog-close"])) :where([data-slot="dialog-header"])` · `:where([data-slot="sheet-content"][data-detents] > [data-slot="sheet-detent-handle"])` · `:where([data-slot="sheet-detent-handle"] > [data-slot="sheet-detent-grip"])` · `:where([data-slot="sheet-detent-handle"]:hover > [data-slot="sheet-detent-grip"])` · `:where([data-slot="sheet-detent-handle"]:focus-visible)` · `:where( [data-slot="sheet-detent-handle"]:focus-visible > [data-slot="sheet-detent-grip"], [data-slot="sheet-content"][data-dragging] [data-slot="sheet-detent-grip"] )` · `:where( [data-slot="sheet-detent-handle"]:focus-visible > [data-slot="sheet-detent-grip"] )` · `:where([data-slot="sheet-detent-grip"])` · `:where([data-slot="sheet-content"])` · `:where([data-slot="sheet-content"][data-surface="glass"])` · `:where([data-slot="glass-graded-halo"])` · `:where([data-slot="glass-graded-halo"][data-modal="false"])` · `:where([data-slot="glass-graded-halo"][data-side="top"])` · `:where([data-slot="glass-graded-halo"][data-side="bottom"])` · `:where([data-slot="glass-graded-halo"][data-side="left"])` · `:where([data-slot="glass-graded-halo"][data-side="right"])` · `:where([data-slot="glass-graded-halo"][data-detents][data-side="bottom"])` · `:where([data-slot="glass-graded-halo"][data-detents][data-side="top"])` · `:where([data-slot="glass-graded-halo"][data-detents][data-side="left"])` · `:where([data-slot="glass-graded-halo"][data-detents][data-side="right"])` · `:where([data-slot="glass-graded-halo"])` · `:where([data-slot="sheet-content"][data-side="top"])` · `:where([data-slot="sheet-content"][data-side="bottom"])` · `:where([data-slot="sheet-content"][data-side="left"])` · `:where([data-slot="sheet-content"][data-side="right"])` · `:where([data-slot="sheet-content"][data-side="left"]), :where([data-slot="sheet-content"][data-side="right"])` · `:where( [data-slot="sheet-content"][data-detents][data-side="bottom"], [data-slot="sheet-content"][data-detents][data-side="top"] )` · `:where( [data-slot="sheet-content"][data-detents][data-side="left"], [data-slot="sheet-content"][data-detents][data-side="right"] )` · `:where([data-slot="sheet-content"])` · `:where([data-slot="sheet-content"][data-side="top"])` · `:where([data-slot="sheet-content"][data-side="bottom"])` · `:where([data-slot="sheet-content"][data-side="left"])` · `:where([data-slot="sheet-content"][data-side="right"])` |
| `components/skeleton/Skeleton.vue` | 3 | `.skeleton` · `.skeleton` · `.skeleton` |
| `components/status-dot/StatusDot.vue` | 32 | `.status-dot` · `.status-dot[data-size="md"]` · `.status-dot[data-size="lg"]` · `.feedback-mark` · `.feedback-mark::before, .feedback-mark::after` · `.feedback-mark::before` · `.feedback-mark::after` · `.feedback-mark[data-state="unknown"]` · `.feedback-mark[data-state="idle"]` · `.feedback-mark[data-state="idle"]::before` · `.feedback-mark[data-state="idle"]::after` · `.feedback-mark[data-state="success"]` · `.feedback-mark[data-state="success"]::before` · `.feedback-mark[data-state="success"]::after` · `.feedback-mark[data-state="warning"]` · `.feedback-mark[data-state="warning"]::before` · `.feedback-mark[data-state="warning"]::after` · `.feedback-mark[data-state="error"]` · `.feedback-mark[data-state="error"]::before` · `.feedback-mark[data-state="error"]::after` · `.feedback-mark[data-state="online"]` · `.feedback-mark[data-state="online"]::before` · `.feedback-mark[data-state="online"]::after` · `.feedback-mark[data-state="active"]` · `.feedback-mark[data-state="active"]::before` · `.feedback-mark[data-state="active"]::after` · `.feedback-mark[data-state="active"][data-motion]::after` · `.feedback-mark[data-state="active"][data-motion]::after` · `.feedback-mark` · `.feedback-mark::before` · `.feedback-mark[data-state="unknown"]::after` · `.feedback-mark[data-state="active"]::after, .feedback-mark[data-state="online"]::after` |
| `components/tabs/styles/drag.css` | 4 | `.glass-drag-grabbable` · `.glass-drag-lift` · `.segmented-tabs:has(.segmented-indicator.glass-drag-grabbable) .segmented-tab[data-active]` · `.segmented-indicator.glass-drag-lift` |
| `components/tabs/styles/segmented.css` | 23 | `.segmented-tabs` · `.segmented-tabs--vertical` · `.segmented-tabs--vertical .segmented-indicator` · `.segmented-tabs` · `.segmented-indicator` · `.segmented-tabs--vertical .segmented-indicator` · `.segmented-tabs--underline .segmented-indicator` · `.segmented-tabs--underline.segmented-tabs--vertical .segmented-indicator` · `.segmented-tabs:not(.segmented-tabs--underline)` · `.segmented-tabs:not(.segmented-tabs--underline) .segmented-indicator` · `.segmented-tabs[data-eyeglass-wake]:not(.segmented-tabs--underline)` · `.segmented-tabs[data-eyeglass-wake]:not(.segmented-tabs--underline) .segmented-indicator` · `.segmented-indicator[data-eyeglass-clamped]` · `.segmented-indicator--js` · `.segmented-tab` · `.segmented-tab` · `.segmented-tab[data-active]` · `.segmented-tab.is-disabled` · `.segmented-tabs--underline` · `.segmented-tabs--underline.segmented-tabs--vertical` · `.segmented-tabs--underline .segmented-tab` · `.segmented-tabs--underline.segmented-tabs--vertical .segmented-tab` · `.segmented-tabs--underline .segmented-tab:hover` |
| `components/timeline/Timeline.vue` | 28 | `.tl` · `.tl__track, .tl__marks` · `.tl__track` · `.tl__marks` · `.tl__mark-seat` · `.tl__mark-seat > *` · `.tl__span` · `.tl__fill` · `.tl__track[data-advancing] .tl__fill` · `.tl__cap` · `.tl .track-flow` · `.tl__mark` · `.tl__marks` · `.tl__mark` · `.tl__mark:focus-visible` · `.tl__disc` · `.tl__mark[data-crossing] .tl__disc` · `.tl__mark[data-state="active"] .tl__disc` · `.tl__mark[data-state="completed"] .tl__disc` · `.tl__mark[aria-current="step"] .tl__disc` · `.tl__check` · `.tl__check path` · `.tl__mark:hover .tl__disc` · `.tl__mark[data-state="completed"]:hover .tl__disc` · `.tl__detail` · `.tl__check path` · `.tl__detail` · `.tl__mark:hover .tl__disc` |
| `components/typewriter/TypewriterText.vue` | 7 | `.tw-root` · `.tw-reserve` · `.tw-visual` · `.tw-tail` · `.tw-cursor` · `.tw-cursor--blink` · `.tw-cursor--blink` |
| `styles/accessibility.css` | 4 | `:is( [aria-current]:not([aria-current="false"]), [aria-selected="true"], [aria-pressed="true"], [aria-checked="true"], [data-state="checked"], [data-state="on"] )` · `:is([aria-invalid="true"], :user-invalid)` · `:is( [aria-current]:not([aria-current="false"]), [aria-selected="true"], [aria-pressed="true"], [aria-checked="true"], [data-state="checked"], [data-state="on"] )` · `:is([aria-invalid="true"], :user-invalid)` |
| `styles/animations.css` | 5 | `.glass-top-layer[popover], dialog.glass-top-layer` · `.glass-top-layer[popover]:popover-open, dialog.glass-top-layer[open]` · `dialog.glass-top-layer::backdrop` · `dialog.glass-top-layer[open]::backdrop` · `.glass-top-layer[popover], dialog.glass-top-layer` |
| `styles/glass-specular-track.css` | 2 | `.glass-wash::before, .glass-quiet::before, .glass-resting::before, .glass-floating::before, .glass-overlay::before, .glass-card::before, .dock-icon-button::before, .dock-tab-button::before, .dock-select-trigger::before, .dock-dropdown-trigger::before, .glass-specular-track::before` · `.glass-wash::before, .glass-quiet::before, .glass-resting::before, .glass-floating::before, .glass-overlay::before, .glass-card::before, .dock-icon-button::before, .dock-tab-button::before, .dock-select-trigger::before, .dock-dropdown-trigger::before, .glass-specular-track::before` |
| `styles/glass/a11y-fallback.css` | 3 | `.glass-wash, .glass-quiet, .glass-resting, .glass-floating, .glass-overlay, .glass-card` · `.glass-floating, .glass-overlay` · `.glass-wash::before, .glass-quiet::before, .glass-resting::before, .glass-floating::before, .glass-overlay::before, .glass-card::before` |
| `styles/glass/dissolve.css` | 1 | `.glass-corner-affordance::after` |
| `styles/glass/focus-veil.css` | 1 | `.glass-focus-veil` |
| `styles/glass/reveal.css` | 2 | `.glass-reveal` · `.glass-reveal[data-state="closed"]` |
| `styles/paper.css` | 5 | `:where(.dark) .paper-underpaint, .dark .paper-underpaint` · `:where(.dark) .paper-grain-overlay::after, .dark .paper-grain-overlay::after` · `.paper-underpaint, .paper-grain-overlay::after` · `.paper-underpaint` · `.paper-underpaint, .paper-grain-overlay::after` |
| `styles/scroll-choreography.css` | 5 | `.scroll-cascade > *` · `.scroll-cascade.scroll-cascade--inline > *` · `.scroll-cascade.scroll-cascade--columns > *` · `.scroll-cascade.scroll-cascade--columns > *:nth-child(even)` · `.smooth-scroll` |
| `styles/scroll-chrome.css` | 3 | `.scroll-chrome` · `.scroll-chrome` · `.scroll-chrome--native` |
| `styles/scroll-driven.css` | 4 | `.scroll-progress` · `.scroll-progress` · `[data-scroll-reveal] > *` · `[data-scroll-reveal].scroll-reveal--inline > *` |
| `styles/tokens/dark-arm-glass.css` | 1 | `.dark .glass-deep` |
| `styles/tokens/scheme-motion.css` | 4 | `.liquid-stage` · `:where([data-reorder], [data-autoplay])` · `:where(.liquid-stage)` · `.motion-calm` |
| `styles/typography/semantic.css` | 1 | `body` |
| `styles/utilities/a11y-overrides.css` | 4 | `*, *::before, *::after` · `html.no-transition, html.no-transition *:not([data-allow-motion]), html.no-transition *:not([data-allow-motion])::before, html.no-transition *:not([data-allow-motion])::after` · `.focus-ring:focus-visible, .interactive-item:focus-visible, .dock-icon-button:focus-visible, .dock-tab-button:focus-visible, .dock-select-trigger:focus-visible, .dock-dropdown-trigger:focus-visible, .menu__trigger:focus-visible, .dark-mode-toggle-button:focus-visible, .field-control:focus-visible, .input-pill:focus, .input-pill:focus-visible` · `.hairline-accent, .glass-dock` |
| `styles/utilities/responsive.css` | 1 | `[data-control-target]` |
| `styles/view-transition.css` | 36 | `::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*)` · `::view-transition-group(.gl-list-item)` · `::view-transition-old(root), ::view-transition-new(root)` · `html:active-view-transition-type(route, zoom, lateral, collapse)::view-transition-old(root), html:active-view-transition-type(route, zoom, lateral, collapse)::view-transition-new(root)` · `html:active-view-transition-type(route, zoom, lateral, collapse)::view-transition-old(root)` · `html:active-view-transition-type(route, zoom, lateral, collapse)::view-transition-new(root)` · `html:active-view-transition-type(route)::view-transition-old(root), html:active-view-transition-type(route)::view-transition-new(root)` · `html:active-view-transition-type(zoom, lateral)::view-transition-old(root), html:active-view-transition-type(zoom, lateral)::view-transition-new(root)` · `html:active-view-transition-type(collapse)::view-transition-old(root), html:active-view-transition-type(collapse)::view-transition-new(root)` · `html:active-view-transition-type(zoom)::view-transition-old(root)` · `html:active-view-transition-type(collapse)::view-transition-new(root)` · `html:active-view-transition-type(lateral)::view-transition-old(root)` · `html:active-view-transition-type(lateral)::view-transition-new(root)` · `::view-transition-group(gl-route-window)` · `html:active-view-transition-type(zoom)::view-transition-group(gl-route-window)` · `html:active-view-transition-type(lateral)::view-transition-group(gl-route-window)` · `html:active-view-transition-type(collapse)::view-transition-group(gl-route-window)` · `html:active-view-transition-type(zoom, lateral)::view-transition-old(gl-route-window), html:active-view-transition-type(zoom, lateral)::view-transition-new(gl-route-window)` · `html:active-view-transition-type(zoom)::view-transition-old(gl-route-window), html:active-view-transition-type(zoom)::view-transition-new(gl-route-window)` · `html:active-view-transition-type(lateral)::view-transition-old(gl-route-window), html:active-view-transition-type(lateral)::view-transition-new(gl-route-window)` · `html:active-view-transition-type(zoom)::view-transition-new(gl-route-window)` · `html:active-view-transition-type(lateral)::view-transition-new(gl-route-window)` · `html:active-view-transition-type(zoom)::view-transition-old(gl-route-window)` · `html:active-view-transition-type(lateral)::view-transition-old(gl-route-window)` · `html:active-view-transition-type(collapse)::view-transition-old(gl-route-window)` · `html:active-view-transition-type(collapse)::view-transition-new(gl-route-window)` · `html:active-view-transition-type(zoom, lateral)::view-transition-old(gl-route-window):only-child` · `html:active-view-transition-type(zoom, lateral)::view-transition-new(gl-route-window):only-child` · `html:active-view-transition-type(collapse)::view-transition-old(gl-route-window):only-child` · `html:active-view-transition-type(collapse)::view-transition-new(gl-route-window):only-child` · `::view-transition-group(.gl-route-chrome), ::view-transition-old(.gl-route-chrome), ::view-transition-new(.gl-route-chrome)` · `html:active-view-transition-type(zoom, lateral, collapse)::view-transition-old(gl-route-label)` · `html:active-view-transition-type(zoom, lateral, collapse)::view-transition-new(gl-route-label)` · `::view-transition-new(.gl-list-item):only-child` · `::view-transition-old(.gl-list-item):only-child` · `::view-transition` |
| `styles/viz-reveal.css` | 1 | `canvas[data-substrate-reveal]` |

_Two names leave `./color`_

| removed | migration |
| --- | --- |
| `ColorResolver` | Nothing replaces the type. It annotated `defaultBlobColorResolver` and nothing else; no shipped component takes a resolver (the `<FourierField colorResolver>` prop went at 9.0.0 — see _The `<FourierField>` `colorResolver` prop is removed_ under 9.0.0). Write `(css: string) => [number, number, number]` if you still need the shape. |
| `defaultBlobColorResolver` | Call `oklchToGammaRgb(cssToOklch(css))` — both still on `@mkbabb/glass-ui/color`; that composition was the whole body. If you imported it only to bind `<FourierField :color-resolver>`, delete the import and the binding and keep the `color` you pass. |

Neither name was on the root barrel. `./color` goes from 16 published names to 14.

_`ringsAt` leaves `./fourier-field`_

| removed | migration |
| --- | --- |
| `ringsAt` | Nothing replaces it on a public entry. It was a CPU copy of the renderer's ring rule (a ring is drawn iff twice the term's amplitude reaches the mark stroke, both in device px) with no readers anywhere; the function stays internal. If you need the count, compute it from `mintSpectrum(...)` with that same rule. |

_`AuroraAtoms` admits `interactivity.light` only on the impasto media_

| was | now |
| --- | --- |
| `AuroraAtoms` with `medium.kind` other than `"oil"`/`"vangogh"` and `interactivity.light` | `light?: never` there (type error). It never painted: `light` steers `uLightDir`, whose only reader multiplies every term by `uImpasto`, and only the oil/vangogh texture amount writes `impasto`. Delete `light`, or switch the medium to `oil`/`vangogh` with an `amount` above 0. `configToAtoms` no longer projects `light` for a non-impasto medium. |

_`text-caption` is upright_

| was | now |
| --- | --- |
| `text-caption` — size, leading, weight 400, `font-style: italic` | The same without `font-style`. The slant was a synthesized oblique of a roman face on running prose; the size, leading and weight already read as a caption. Want the old paint? Write `class="text-caption italic"` — `cn()` sorts the two into different buckets, so the pair survives merging. |

`text-math`, `text-math-body` and `fourier-f` keep their italic: mathematical italic is
notation, and those three stay synthesis-dependent (see the README). In the library,
`Chip`'s `sm` rung reads `text-caption` and now paints upright.

_`darkModeSyncScript()` hardens its read, and every CSP hash moves_

A `localStorage` accessor or `getItem` that throws (privacy mode, a sandboxed origin) no
longer leaves `<html>` unstamped: the script treats an unreadable store as ABSENT, so a
scalar `defaultDark` falls to its one arm (by default, `prefers-color-scheme`) and the
object form to its `absent` arm. Every emission grows 13 bytes, so every hash moves. The
old column is the source as amended after 9.0.0 (the table under _Amended after 9.0.0_
under §8.1.0); the published 9.0.0 `{ normalize: true }` hash,
`sha256-Xtel8uEYWeIEsJMO4TZWEump78fncLVrH4/fe166vIw=`, moves to the same new value.

```
darkModeSyncScript()                            300 B  sha256-VTba/T+6rX/y5+Gk2oyLaaYBdLf4xSZtXnc7kMYziI8=  →  313 B  sha256-MOGEZdbxrYiPCsQApEdoFKYoqnbmCxzBPrGPG/EbfJk=
{ defaultDark: false }                          229 B  sha256-qhpAfju9UAwqj2RfWpOZO9EulLGgZ5V71iPcTGTY3zw=  →  242 B  sha256-+kr3+orhvPzjRqodC05PBmZEjiRUYqTQ3bROP1Ul1lc=
{ defaultDark: true }                           228 B  sha256-manehYcswRzcI9LxUb8B/PXRoWvHIJReiR2pNGvOG54=  →  241 B  sha256-oSg/cCpR7IiOWBMlFDCxzciD09O78RkZ8+FUJxgabrM=
{ queryOverride: true }                         402 B  sha256-T/HYS7zqh/wi4E0o0R4IStRZF6TYhOjMFduJeli2HpI=  →  415 B  sha256-mQa+YqSIVa3dLg5wzyMtdTGHV27xgeXomarl+4ud3P8=
{ normalize: true }                             361 B  sha256-BxbpMykpiKP/WPfTsYpbpPpSCTecT50SMXFVFNrMGrw=  →  374 B  sha256-ELJDzNkFORSX8nVSvmrv/vdF/vXsUNcR28MZd/Fz3cA=
{ defaultDark: { absent: false, auto: "os" } }  309 B  sha256-viDl5kPSBmJC9frsYXBK0PtoTtTWq4SnpZnkpC5cv4k=  →  322 B  sha256-k6c4jJN+Xl68gT4/Up6BGWBY5CCxk0mpavrCzlEkLxY=
```

If you pin any form under `script-src 'sha256-…'`, re-pin it at the bump or first paint
is blocked. Better: hash the emitted string at build time (see _Wire it with a build
plugin; do not transcribe the bytes_ under §8.1.0).

_`--success` and `--warning` darken in the light arm_

Not breaking; a paint change. `StatusDot`'s text-free marks carry a state by colour
alone, which makes them a required graphical object under WCAG 1.4.11, and both tokens
measured under 3:1 on `--card` in light mode. They drop L, hue and chroma kept; the dark
arm is untouched.

| token (light arm) | was | now | on `--card` |
| --- | --- | --- | --- |
| `--success` | `oklch(0.720 0.192 149.5)` | `oklch(0.600 0.192 149.5)` | 2.13 → 3.30 |
| `--warning` | `oklch(0.770 0.165 70.6)` | `oklch(0.635 0.165 70.6)` | 1.98 → 3.27 |

Everything that reads them goes darker in light mode: `Badge`'s success/warning plates,
`StatusDot` and its inner marks, the `Toast` and `Alert` tone wash, rim and glyph,
the `.input-pill:user-valid` border, and every
`text-success`/`text-warning`. As text ink, `--success` is 3.30 on the card, under
1.4.3's 4.5:1 — keep it off body copy. `Metric`'s delta paints `--foreground` from
10.0.0 and reads neither token; see _`Metric`'s delta paints the one ink_ below.

_The token-root contract_

glass-ui's token `:root` is unlayered, and it beats every layered consumer `:root` —
one inside `@theme`, one inside `@layer glass-overrides`, any layer at all. `:root`
token overrides must be unlayered, or set on an element below `:root` in any layer.

Font registers are consumer-settable in the theme layer: re-declare `--font-serif-math`
in your own `@theme`, or set it on an element in any layer (the utility reads the
variable). `--font-text` / `--font-display` are `@theme inline` bridges (`.font-text`
compiles to `var(--font-stack-text)` unless your own `@theme` re-declares
`--font-text`), so rebrand them in your own `@theme`, or set `--font-stack-text` /
`--font-stack-display` on an unlayered `:root` or on an element. Every other
consumer-settable seam is a plain token in the unlayered `:root` (the slider rungs below
are the shape), never a `var()` default that nothing declares.

_`cm-serif` leaves the published CSS; `font-serif-math` replaces it_

Breaking.

| removed | migration |
| --- | --- |
| `cm-serif` | Write `font-serif-math`. The old utility read `var(--font-serif-math, serif)`, a name the package never declared, so it painted `serif` unless you declared the name yourself. `--font-serif-math` is now declared in the package's plain `@theme` (`src/styles/theme/literals.css`, default `serif`), and Tailwind mints `font-serif-math` from it, reading `var(--font-serif-math)` with no fallback. No alias: rename the class at each site. |

A consumer that already declares `--font-serif-math` in its own `@theme` keeps winning
unchanged: a consumer `@theme` re-declaration replaces the package value in the one root
Tailwind emits (Chromium-probed: `.font-serif-math` computes `"CMX", Georgia, serif`
under `@theme { --font-serif-math: "CMX", Georgia, serif }`). Do not declare it in an
unlayered `:root` to rebrand it; declare it in `@theme` or on an element. The published
CSS name set goes from 242 `@theme` tokens and 47 `@utility` classes to 243 and 46.

_`useSidebarFollow` exempts by attribute, not by class_

Breaking.

| was | now |
| --- | --- |
| A pointerdown inside `[data-toc-id]` or `.sidebar-top-btn` left following live | A pointerdown inside `[data-toc-id]` or `[data-sidebar-follow-exempt]` leaves following live; any other pointerdown in the nav suspends it. No class name is matched, so a `.sidebar-top-btn` press now suspends following. Mark a back-to-top or similar nav control `data-sidebar-follow-exempt`. |

_`SectionHierarchy.parentId` is the direct parent_

Breaking.

| was | now |
| --- | --- |
| `buildTreeIndex` / `useTreeIndex` entries carried `parentId` = the root's id at every depth, and a root's own id at depth 0 | `parentId` is the direct parent's id, and `null` for root nodes. `rootId` is unchanged. Where you read `parentId` as "the root", read `rootId`. `useScrollTracker`'s `activeRootId` now reads `rootId` itself. |

The type was already `parentId: string | null`, so nothing fails to compile; what moves
is the value at depth 0 (now `null`) and at depth ≥ 2 (now the direct parent). A fixture
that authored `parentId: id` for a root authors `null`.

_`SegmentedTabs` is generic over its option values_

Breaking (type-level; runtime unchanged).

`SegmentedTabs` declares `generic="T extends string = string"`, and `T` is inferred from
`options` and `v-model`. `SegmentedTabOption`, `SegmentedTabsResponsive` and
`SegmentedTabsProps` take a defaulted `<V extends string = string>`; the names under
`./tabs` are unchanged. A literal-union model no longer needs `$event as …`, and a
plain-string callsite types exactly as before.

Two type-level uses move, in tests and in application code, because a generic SFC's
default export is a function type, not a constructor:

- `wrapper.findComponent(SegmentedTabs)` now types as a DOM wrapper. Use
  `findComponent({ name: "SegmentedTabs" })` for `.vm`.
- In application code, a template ref typed `InstanceType<typeof SegmentedTabs>` no
  longer compiles (`TS2344: … does not satisfy the constraint 'abstract new (...args:
  any) => any'`, probed with `vue-tsc` against the 10.0.0 source). `SegmentedTabs`
  exposes nothing, so type a template ref to it as `ComponentPublicInstance` from `vue`.

_`cn()` buckets every published `text-*` and `shadow-*` name by the property it writes_

The font-size names `text-display-1`, `text-dropdown`, `text-dropdown-secondary`,
`text-proportional-headline` and `text-proportional-kicker` no longer evict a text
colour; the `text-shadow-*` sizes are their own bucket; a shadow or text-shadow colour
(`shadow-primary`, `text-shadow-primary`, `shadow-(color:--x)`) no longer evicts a shadow
size. A type-hinted arbitrary value keeps its hint's family: `text-[length:…]` is a font
size, `bg-[image:…]` / `bg-[url(…)]` an image, `bg-[length:…]` a size, `bg-[position:…]`
a position, and a `color:` hint is a colour. Output changes only where a class was
wrongly dropped, or where two colour-hinted arbitrary values (`text-[color:…]`,
`shadow-(color:--x)`) were both kept. Families that still fall through to stylesheet
order: `font-text` / `font-display` / `font-serif-math`, `tracking-*`, `leading-*`, the
semantic `border-*` / `ring-*` colours.

_The Slider's size rungs read six tokens_

Additive. The rungs read `--slider-track-height-{sm,md,lg}` (0.75 / 1.25 / 1.75rem) and
`--slider-thumb-size-{sm,md,lg}` (0.5 / 1 / 1.5rem), declared in the token `:root`. Set
them on a wrapper or on the slider, in any layer; a `:root` override must be unlayered
(_The token-root contract_ above). The thumb is `min(thumb, track)`, so it never
exceeds the track. Defaults paint unchanged.

_`<InfiniteScroll>` observes against the viewport_

Not breaking. `<InfiniteScroll>` observes its sentinel against the viewport instead of
its own root element, with the `threshold` applied as both `rootMargin` and
`scrollMargin`. A list inside an ancestor scroll port no longer loads every page on
mount; a list whose own root is the scroll port behaves as before. Engines without
`IntersectionObserver` `scrollMargin` load when the sentinel becomes visible inside a
nested port — later, never a drain. `useInfiniteScroll`'s `scrollContainer` option is
unchanged.

_The dock's reveal stagger counts controls only, from both ends_

Not breaking; a timing change. `DockSeparator` takes no step, and a control's onset is
`--dock-stagger-step × min(distance from the nearer edge, 3)`, edges first, at every row
length. Every rung is bounded from both ends, so a row of 2, 3 or 4 controls is edge-in
as well (9.0.0's 3-control row painted `2 1 2`, the edges two beats late).

_Dialog and Sheet stamp `aria-modal`_

Additive. `DialogContent` and `SheetContent` (and `CommandDialog`, which composes
`DialogContent`) stamp `aria-modal="true"` on the `role="dialog"` node while the root is
modal, and omit it for `:modal="false"`. Drop a consumer-passed `aria-modal`.

_`GlassDock` passes a same-control press inside `#persistent` mid-morph_

Not breaking. The click-integrity guard passes a press inside `#persistent` /
`#persistent-end` that begins mid-morph when press and click land on the same control;
those regions never swap layers. A press on the arriving layer still defers until the
morph settles, so the remedy there is unchanged: wait for settle. Known bound: a press
within 4 px of a persistent control's inline edge during the hover morph activates the
control it visibly hovers.

_`Metric`'s delta paints the one ink_

Not breaking; rendered text and paint. `<Metric>`'s delta no longer paints its text in a
status tone. `up` was `--success` (3.30:1 on `--card`, under 1.4.3's 4.5:1), `down` was
`--destructive`, and `flat` was `--muted-foreground`. Every polarity now paints
`--foreground`. A numeric rise is signed: `:delta="3"` renders `+3`, compact `+12.4K`.
A string delta passes through as written; `-3` and `0` are unchanged. Text assertions
on a rendered `<Metric>` delta may need the `+`.

`data-polarity` stays on `.metric__delta`: to show the tone, compose a mark beside the
number and key it on `[data-polarity]`. Do not recolour the text. Recipe, in your own
layer: `.metric__delta[data-polarity="up"]::before { content: ""; … background:
var(--success) }`. `coalesceMetric` gains `signed?: boolean`, the option `<Metric>` uses
for its delta: a positive number takes a leading `+` on both the plain and the compact
path.

_Paint: three label sites clear 4.5:1_

Not breaking; paint only. `SegmentedTabs` pill: the inactive label on the
`.glass-capsule-track` reads `--on-glass-muted-strong` (`.glass-capsule-track` joins the
ladder's -strong `:where()`), 3.48 → 5.34:1 light on the quiet track over `--card`.
`SegmentedTabs variant="underline"`: the inactive label paints plain
`--muted-foreground` without the capsule's 12% warm, 4.36 / 4.20 → 5.22 / 5.02:1 light on
`--background` / `--card`; the active and hover inks are unchanged. `ConfiguratorRow`'s
name and description and `ConfiguratorLayer`'s sub drop their alpha (`/70`, `/80`):
2.82 / 3.38 → 5.01:1 on `--card`. No token moves: `--card` (`hsl(30 85% 96%)`) and
`--background` (`--neutral-0`, `hsl(40 30% 98%)`) sit at nearly one lightness on purpose,
split by warmth; a plate is set off by its edge and cast (DESIGN.md _Default Color
Palette_).

_The tooltip chip pairs its size with the caption leading_

Paint only. The tooltip chip reads `--tooltip-text` with `--type-leading-caption` (1.3);
it inherited body's 1.5 before, so a one-line hint is about 2.4 px shorter at the 12 px
caption floor.

## 9.0.0

This section exists because a breaking change
landed after the `8.1.0` section below was written, and a removal cannot ride a minor,
so the release became a major and `8.1.0`'s purely additive content rides it. 8.1.0 was
never published; its section keeps its heading so the notes stay where they were written.

_The `./canvas` subpath is removed_

| removed | migration |
| --- | --- |
| `@mkbabb/glass-ui/canvas` | Import the same six names from the package root: `useCanvas2D`, `resolveCanvasColor`, and the types `Canvas2DFrame`, `Canvas2DHandle`, `Canvas2DOptions`, `Canvas2DSuspendReason`. |

The subpath published six names and the root barrel already published all six, so this
removes a door and no room. `canvas2d` remains the internal substrate it always was; no
file moved, no symbol was renamed, and nothing was deprecated first — a clean break, per
this document's own rule.

_The `./search` subpath is removed, and this one takes the room with the door_

| removed | migration |
| --- | --- |
| `@mkbabb/glass-ui/search` | The subpath is gone and nothing republishes its names. The fuzzy engine is internal (`src/composables/search/`): it serves the library's own dock search and is not a public surface. |
| `SearchBar` | Deleted with its `searchFieldVariants` CVA. No replacement component ships: the `.input-bar` recipe (on `./styles`, which SURVIVES untouched) composes with your own input element — that recipe was always the paint; the chrome was 79 lines over it. |
| `FuzzySearchState` · `SearchableItem` · `SearchIndex` · `SearchResult` · `SearchVariant` · `SearchVariants` · `UseFuzzySearchOptions` and every other `/search` type | Die with the door. Type your own items; the engine's shapes are internal. |

The root barrel never carried `SearchBar` or any fuzzy name, so `./search` was the only
door, so the removal is total, not a narrowing. A file that imports from it needs one
import statement deleted per component it used. Selectors that read `.input-bar` read the
recipe, not the component, and are unaffected.

_The `<FourierField>` `colorResolver` prop is removed_

| removed | migration |
| --- | --- |
| `<FourierField :color-resolver>` | Drop the binding and keep the `color` you already pass — the component resolves that value itself. Drop the `import { defaultBlobColorResolver } from "@mkbabb/glass-ui/color"` above it too, unless the file uses it for something else; at 10.0.0 the name leaves `./color`, so drop it then in any case (see _Two names leave `./color`_ under 10.0.0). |

9.0.0 is the first release without it. The published
`FourierField.vue.d.ts` at 9.0.0 declares seven props — `config?`, `spectrum?`,
`getPalette?`, `color?`, `seed?`, `freeze?`, `interactive?` — no
`colorResolver`, and `colorResolver` survives in the package only as two sentences of
prose in `dist/composables/color/index.d.ts`, corrected in 10.0.0.

At 3.13.0 `colorResolver: ColorResolver` was **required**, not optional. It relaxed to
optional at 7.0.0 and 8.0.0 and is gone at 9.0.0; the repair is one deleted attribute per
site. A `variant="hero"` or `variant="final"` on the same element has been inert since
**4.1.0**; delete it in the same edit.

`ColorResolver` and `defaultBlobColorResolver` both still ship on `./color` and are
**unchanged by this release**, so a consumer may keep importing `defaultBlobColorResolver`
for its own use at 9.0.0; what no longer exists is the prop that consumed it. Both names
leave `./color` at 10.0.0; see _Two names leave `./color`_ under 10.0.0 for the one-line
replacement.

_The `<FourierField>` instance API loses `renderAt` and gains `headT` + `flick`_

| removed | migration |
| --- | --- |
| `fieldRef.value.renderAt(timeSec)` | Nothing replaces it. There is no successor method and no emit: `renderAt` is gone from the component's handle type as well as from its expose, so a template ref has no way to draw one out-of-loop frame at 9.0.0. If you called it to PLACE the figure, call `setHeadT(t)` with `t ∈ [0,1)` instead — it scrubs the clock and wakes the loop. If you called it to hold a still, pass `:freeze="true"`, which holds the clock with the field live. |

Measured on the published type declarations rather than on source. 8.0.0's
`dist/components/fourier-field/FourierField.vue.d.ts` declares seven exposed members —
`backend`, `pause`, `resume`, `wake`, `renderAt`, `setHeadT`, `rendererStatus`. 9.0.0's
declares eight — `backend`, `pause`, `resume`, `wake`, `setHeadT`, `headT`, `flick`,
`rendererStatus`. One out, two in; the other six are unchanged in name and signature.

At 8.0.0 `renderAt` was documented `Draw one frame out-of-loop (capture, thumbnail)` and
forwarded straight to the substrate. At 9.0.0 the handle type `FourierFieldHandle` carries
no `renderAt` member at all, so the removal is from the component's whole API and not only
from its expose — the substrate below still has the capability, and the component no
longer surfaces it.

The two additions are the transport seam. `headT` is the live loop parameter, unwrapped on
the exposed proxy so a transport can bind it as a plain number; `flick(turnsPerSec)`
injects one impulse into the clock, capped and floored like any other. Neither replaces
`renderAt`: both move the one clock, which is what 9.0.0's field has instead of a frame
API.

_Two earlier majors' removals get their rows here_

These rows are written under the major that actually shipped without each name. Thirteen `@theme` tokens and three `@utility` classes left the published CSS at
**8.0.0** and one class left at **7.0.0**, none with a MIGRATION row. The rows are now
in §8.0.0 (_Theme tokens removed_ · _Classes and utilities removed_) and §7.0.0
(_`.paper-texture` is removed_). **9.0.0 removed no token and no utility**: the
`@theme` name set and the `@utility` name set of the published `./styles` closure are
byte-identical between 8.0.0 and 9.0.0 (242 and 47 on both).

_`GlassDock`'s props fold onto `collapse`_

| removed | migration |
| --- | --- |
| `startCollapsed` | `collapse="closed"` (the default) mounts collapsed; `collapse="open"` mounts expanded. |
| `alwaysExpanded` | `:collapse="false"`: the dock never collapses, and every environmental writer (hover, focus, idle timer, outside click, collapsed tap, touch) is quiet. |
| `interaction` · `DockInteraction` | Drop both. The `manual` pole turned the dock's own state machine off; `expand()` / `collapse()` stay exposed, so a consumer that owns posture still drives it. |
| `layout` · `DockLayout` | Drop both. The `grid` tile panel was always-expanded by contract; a 2D tile panel is not a dock. |
| `overflow` | Drop it. A horizontal dock's run scrolls natively when it outgrows its stage; the `wrap` reflow and its `.dock-overflow-wrap` recipe are gone. |
| `collapseDelay` | Drop it. Every dock idles for one window, 3600 ms. |
| `search` | Drop it. The `#search` slot is the opt-in; `useDockSearch` stays exported. |
| `position` | Drop it and position the dock with your own classes; `.dock-inline`'s centring folded onto `.glass-dock`. |
| `size` | Drop it. One density (the former `md` rung) is the base; `[data-preset]` is the geometry override. |

`DockProps` went from fourteen members to six: `fitContent`, `backdropMode`, `shape`,
`orientation`, `backgroundCanvas`, `collapse`. `./dock` gains the types `DockCollapse`
(`false | "closed" | "open"`) and `DockProps`.

_`--dock-max-inline-size` is removed_

Its reader left at 9.0.0 and its declaration at 10.0.0, so the row sits under the release
that stopped reading it. It is an unlayered `:root` token, outside the `@theme` and
`@utility` name sets counted above.

| removed | migration |
| --- | --- |
| `--dock-max-inline-size` | Nothing reads it. 9.0.0 deleted its last reader with the per-instance inline cap, so setting it did nothing at 9.0.0. The declaration in `tokens/offsets.css` is deleted at 10.0.0. To bound a dock's inline size, write `max-inline-size` on the dock's class. |

_Eight `./handmark` types leave with the barrel's reshape_

| removed | migration |
| --- | --- |
| `Brush` · `BrushName` · `BlendMode` · `TaperSpec` · `InkPath` | No successor. The brush continuum is gone: `<HandMark>` inks one pen and takes no `brush` prop. |
| `HandMarkProps` · `HandAnimation` · `MarkBox` | No successor type. `<HandMark>` declares five props at 9.0.0 (`shape` · `color` · `weight` · `seed` · `draw`); `draw` is the draw-on switch. `HandShape` stays. |

The same change took 25 more names off the barrel: `BRUSHES`, `resolveBrush`,
`lerpBrush`, `StampFn`, `shapeGeom`, `ShapeGeom`, `boilLines`, `naturalUnderlinePoints`,
`VB_W`, `VB_H`, `UNDERLINE_GAP`, `ink`, `SVGFragment`, `grainFilter`, `hasGrain`,
`getStroke`, `getStrokePoints`, `getSvgPathFromStroke`, `StrokeOptions`, `InputPoint`,
`useHandMark`, `normalizeProps`, `UseHandMarkInput`, `HandMarkCore`, `BoilClock`. None
has a successor. It added nine: `SHAPES`, `handBand`, `handLine`, `handRing`,
`markDuration`, `minJerk`, `strokeRibbon`, `Frame`, `Point` (`strokeRibbon` inks any
polyline with the component's own pen). `HandMark`, `HandShape` and `serialize` are
unchanged.

_Amended after 9.0.0_

Everything from here to the end of this section shipped in 10.0.0, not in 9.0.0. Both
changes are behavioural, not renames.

**The keyboard registry honours `defaultPrevented`, and modal overlays quiet the app's
bindings.** Nothing is renamed and nothing is removed. Two behaviours change, and a
consumer who relied on either one relied on a defect.

**A keydown another layer already consumed no longer reaches a shortcut.** The
dispatcher returns early on `e.defaultPrevented`, so one press fires at most one handler
across the whole page. reka's `DismissableLayer` reads the same flag and never sets it,
but three in-house keydown paths DO set it — dock search (`useFuzzySearch`: the arrows,
Enter, Escape), tab roving focus (the arrows, Home, End, Enter, Space) and the
sortable-list keyboard drag — so a registry binding on one of those keys no longer fires
behind them. What also changes is an app that calls `preventDefault()` in its own
listener and then saw a registry binding fire anyway. Escape is exempt from the modal
barrier below but NOT from this guard: an Escape a layer consumed was that layer's
dismissal, and the registry does not dismiss a second thing on the same press.

**A modal overlay barriers the bindings registered before it opened.** `Dialog`, `Sheet`,
`CommandDialog` and — only when `modal` is true — `DropdownMenu` and `Popover` raise a
barrier while reka is enforcing modality, which is the same flag that traps focus and
makes the page behind inert. App-level accelerators stay registered and stay in
`useRegisteredShortcuts()`; they simply do not fire while a modal is open. Escape is
exempt and keeps its reversed LIFO walk, so the top-most overlay is always dismissable,
and within a layer the forward first-registered-wins order is untouched, so a late
registrant still cannot shadow a destructive binding. A `modal={false}` overlay leaves
the page operable and keeps its keyboard with it.

**`@mkbabb/glass-ui/keyboard` gains `suspendShortcuts` · `formatComboLabel` ·
`LabeledShortcut`.**

| export | what it is |
| --- | --- |
| `suspendShortcuts(): () => void` | Raise the barrier above, by hand, for an overlay this library does not own. Call it BEFORE the overlay registers its own bindings — the barrier admits registrations made after it, so an overlay whose content stays mounted across a close registers its bindings on open, not on mount — and call the returned release on close; the release is idempotent and order-free. |
| `formatComboLabel(raw: string): string` | The spoken form of a combo, for an `aria-label` beside the `<kbd>` glyphs `formatComboParts` produces. `"mod+shift+z"` → "Control Shift Z" (or "Command Shift Z" on a Mac); `"delete"` → "Delete or Backspace", because the matcher's alias table says a `delete` binding also answers to Backspace. |
| `LabeledShortcut` | The element type of `useRegisteredShortcuts()`, narrowing `options.label` to `string`. Type-only and non-breaking — the runtime has always filtered on that label. |

`useRegisteredShortcuts()` is deliberately NOT barrier-filtered: it is the reference list
of what the app answers to, not a live capability probe, and a help overlay is itself a
modal that filtering would hand an empty list.

## 8.1.0

8.1.0 was never published: everything below shipped inside 9.0.0. Nothing below is
breaking; a caller who does not opt in has nothing to do.

_`darkModeSyncScript()` gains three options — `defaultDark` · `queryOverride` · `normalize`_

`DarkModeSyncScriptOptions` gains three optional fields beside `storageKey`. **No export
name is added or moved** — the interface widens, the surface does not (detector:
`git diff --stat src/composables/dark/index.ts` → unchanged; the root barrel and `/dark`
still publish `darkModeSyncScript` · `DARK_MODE_STORAGE_KEY` · `DarkModeSyncScriptOptions`
and nothing else from this module).

| option | default | what it does |
| --- | --- | --- |
| `defaultDark?: boolean \| "os"` | `"os"` | What an ABSENT or `"auto"` stored mode resolves to. `"os"` follows `prefers-color-scheme` — right for an app. A boolean resolves deterministically — right for a document that must not flip with the projector's OS theme: a briefing, a print target, a capture. Under a boolean the emitted script asks the platform nothing (it carries no `matchMedia` call at all). |
| `queryOverride?: boolean` | `false` | Honour `?light` / `?dark` above storage and above the default. The capture-forcing seam: a screenshot pipeline asks for a mode in the URL rather than driving a toggle and hoping. |
| `normalize?: boolean` | `false` | Write the RESOLVED mode back to storage, so an absent or `"auto"` value becomes a concrete `"dark"`/`"light"` at first paint and the runtime composable cannot disagree with the stamp about what `auto` meant. |

Precedence is **query > storage > default**, in that order and no other.

_The default emission is BYTE-IDENTICAL — deliberately, and it nearly was not_

This holds through 9.0.0. At 10.0.0 every emission moves, the default to 313 bytes; see
_`darkModeSyncScript()` hardens its read, and every CSP hash moves_ under 10.0.0.

The emitted `<head>` script is exactly what a `script-src 'sha256-…'` CSP pins, and a
re-hashed default would be **blocked at first paint, silently** — no type error, no
runtime error, just the flash the module exists to remove. So the default emission is
unchanged to the byte:

```
darkModeSyncScript()   → 300 bytes, sha256-VTba/T+6rX/y5+Gk2oyLaaYBdLf4xSZtXnc7kMYziI8=
```

That is the same string 8.0.0 emitted. **It was not free**: the first draft of this
addition wrapped the `"os"` fallback in parentheses that are inert inside the `&&` chain
they substitute into, and that alone moved the default to **302 bytes /
`sha256-Ww9UmE068him9LdkxjP90V0vytb88DNBMippYt5AHHk=`**. The parens are gone and a gate
arm now pins both figures. Only an **opt-in** arm moves the emitted bytes, and a consumer
opting in is editing its head script anyway — re-hash then, once.

_Two behaviours are RATIFIED rather than left to be discovered_

1. **`normalize` runs AFTER `queryOverride`, so a `?dark` visit PERSISTS into that
   browser's storage.** This is the order that makes a forced mode survive hydration —
   the runtime composable re-reads storage, and under the other order it would find
   `"auto"` and flip the page back, which is the flash again one frame later. The
   consequence is that the pair is for **capture profiles, never for a shared
   user-facing origin**: if you expose `?dark`/`?light` to end users and also set
   `normalize`, a single link permanently changes their stored preference. Enable one or
   the other there, not both.
2. **The query flags are PRESENCE flags, so `?dark=false` resolves DARK.** The check is
   `q.has("dark")` — value-blind by construction. `?dark=0`, `?dark=light` and
   `?dark=false` all read dark, and `?light&dark` reads dark (the dark arm is read
   first). A value grammar would be a second, weaker way to say what `?light` already
   says. If you build these URLs from a boolean, emit the flag or omit it; do not emit
   it with a value.

Both are held by named tests in
`tests/composables/dark/darkModeSyncScript.test.ts`, so a silent reorder or a swap to a
value grammar turns the suite RED rather than surprising a consumer.

_Amended after 9.0.0_

Everything from here to the end of this section shipped in 10.0.0, not in 9.0.0. The
three rows above are what 9.0.0 shipped.

**`defaultDark` widens to answer the absent case and the `"auto"` case separately.**

| option | default | what it does |
| --- | --- | --- |
| `defaultDark?: boolean \| "os" \| { absent: boolean \| "os"; auto: boolean \| "os" }` | `"os"` | What an ABSENT or `"auto"` stored mode resolves to. A scalar answers both cases at once: `"os"` follows `prefers-color-scheme` — right for an app; a boolean resolves deterministically — right for a document that must not flip with the projector's OS theme. Under a boolean the emitted script asks the platform nothing (no `matchMedia` call at all). The OBJECT form answers the two cases SEPARATELY, which is the only way to say "a first visit is a deliberate light document, but a reader who chose `auto` gets their platform" — `{ absent: false, auto: "os" }`. No scalar reproduces that pair. |

Additive: every existing call keeps its bytes and its meaning, and a scalar still emits
the single welded arm it emitted at 9.0.0.

**`normalize` writes AFTER the stamp.** The write-back is emitted last, after the
`classList` and `color-scheme` writes, so a storage that throws on write (quota, private
browsing, a sandboxed origin) costs the write-back and nothing else — the page is
already themed when it fails. 9.0.0 shipped the other order, in which the throw came
first and cost the WHOLE stamp: a consumer who set `normalize` and saw an unthemed first
paint in private browsing now knows what that was.

**One CSP hash moves, and only one.** The four opt-in byte counts are unmoved and three
of the four hashes are unmoved; `{normalize: true}` reorders its bytes, so its hash
moves. Every figure below is derived from the function, and the 9.0.0 row is read out of
the published `dist/dark.js`:

```
darkModeSyncScript()                     300 B  sha256-VTba/T+6rX/y5+Gk2oyLaaYBdLf4xSZtXnc7kMYziI8=   unmoved
{ defaultDark: false }                   229 B  sha256-qhpAfju9UAwqj2RfWpOZO9EulLGgZ5V71iPcTGTY3zw=   unmoved
{ defaultDark: true }                    228 B  sha256-manehYcswRzcI9LxUb8B/PXRoWvHIJReiR2pNGvOG54=   unmoved
{ queryOverride: true }                  402 B  sha256-T/HYS7zqh/wi4E0o0R4IStRZF6TYhOjMFduJeli2HpI=   unmoved
{ normalize: true }                      361 B  sha256-Xtel8uEYWeIEsJMO4TZWEump78fncLVrH4/fe166vIw=   9.0.0
{ normalize: true }                      361 B  sha256-BxbpMykpiKP/WPfTsYpbpPpSCTecT50SMXFVFNrMGrw=   cured
{ defaultDark: { absent: false, auto: "os" } }
                                         309 B  sha256-viDl5kPSBmJC9frsYXBK0PtoTtTWq4SnpZnkpC5cv4k=   new
```

If you pin the normalize emission under `script-src 'sha256-…'`, re-pin it at the bump
or first paint is blocked. Through this amendment the default emission is
byte-identical and needs nothing; the 10.0.0 read hardening moves the default too, and
every form re-pins at that bump.

_Wire it with a build plugin; do not transcribe the bytes_

`darkModeSyncScript()` returns a STRING, and a `<head>` script cannot import a module —
so the delivery step is a build-time injection, not a copy-paste. Four repos hand-rolled
the whole block for want of this paragraph, one of them a byte-for-byte transcription of
the emitted default that goes stale the moment the emission changes.

In Vite, that is a ~10-line `transformIndexHtml` plugin:

```ts
import { darkModeSyncScript } from "@mkbabb/glass-ui/dark";
import type { Plugin } from "vite";

function darkModeStamp(): Plugin {
    return {
        name: "app:dark-mode-stamp",
        transformIndexHtml: () => [
            {
                tag: "script",
                children: darkModeSyncScript(/* { defaultDark: { absent: false, auto: "os" } } */),
                injectTo: "head-prepend",
            },
        ],
    };
}
```

`head-prepend` is the point: the stamp lands ahead of every stylesheet and every module,
so the first paint is already correct. The options object is where a policy goes — a
briefing that must not follow the projector passes `defaultDark: false`; a capture
pipeline adds `queryOverride: true`.

**Put it in every config that builds an HTML shell, not just the one.** glass-ui is
wired exactly this way and got this wrong first: the plugin lived inside `vite.config.ts`
and the standalone config that builds the demo replaces that file wholesale, so the dev
server was stamped and the BUILT demo — the bytes a viewer actually loads — was not. The
plugin now lives in its own module (`vite.dark-stamp.ts`) and both configs import it.

Under a `script-src 'sha256-…'` CSP, hash the emitted string once at build time rather
than pinning a literal you maintain by hand — it is the same string on both sides.

## 8.0.0

**The export surface is re-cut: one batched change and six subpath movements.**
`exports` goes **66 → 70 keys**. Clean breaks throughout: no aliases, no deprecation
window. Two keys retire, six are added, and one component is deleted in that batch. The
major deletes more than that: `HeaderRibbon` and several other components left in the
same release, each with its own entry below TagsInput's.

_Package subpaths_

| Was | Now | What to do |
| --- | --- | --- |
| `@mkbabb/glass-ui/dropdown-menu` | `@mkbabb/glass-ui/menu` | Re-point the specifier. **The fourteen `DropdownMenu*` SFC names are UNCHANGED** — the family's directory and door moved, not its symbols, so a one-line import edit is the whole migration. The old name was wrong in both directions: the same 28 reka imports serve both the click and the context arm, and `./context-menu` was never exported at all. |
| `@mkbabb/glass-ui/forms` | `@mkbabb/glass-ui/input` · `/textarea` · `/checkbox` · `/radio-group` | Split the import by component. `./forms` was a hand-curated union of four components — a second door onto the same source — and the rule is now stateable: **one subpath per public component, no exceptions in either direction.** |
| `@mkbabb/glass-ui/drawer` | `@mkbabb/glass-ui/sheet` | `Drawer` folded whole into `Sheet` (the detent is a size), so `./drawer` retired with the fold; this is a fold, not a deletion. `<Drawer>` + `<DrawerContent>` → `<Dialog>` + `<SheetContent side="bottom" :detents="[…]">` — a detent is a size, so `left`/`right` ladders are as legal as `bottom`/`top`. `mode="live-behind"` → `<Dialog :modal="false">`. `DrawerHeader` · `DrawerTitle` · `DrawerDescription` · `DrawerFooter` → the `Dialog*` parts on `./dialog`. `direction` (`DrawerDirection`) → `side`; `snapPoints` → `detents`, ascending fractions of the anchored axis (a string snap point converts to its fraction); `activeSnapPoint` → `v-model:detent`. Two defaults flip: `direction` defaulted to `bottom`, `side` defaults to `right`, so write `side="bottom"` for a bottom sheet; the live-behind ladder `[0.12, 0.5, 1]` was implicit, so write `:detents="[0.12, 0.5, 1]"` to keep it. `DrawerStage` has no successor: the stage was deleted in this major (see **The immersive stage scrim is a private stage-effect role, reconnected to `--glass-level`** under §8.0.0). |
| `ControlSize` (from `/forms`) | `@mkbabb/glass-ui/input` | The shared `sm \| md \| lg` union the control register threads as `size?`. Input is the canonical member, so `./input` is its one published door. |
| `useUserInvalidAria` (from `/forms`) | `@mkbabb/glass-ui` (root) | No move — it was **already** on the root barrel, which is now its only door. |

_Deleted — `TagsInput`_

`TagsInput`, `TagsInputInput`, `TagsInputItem`, `TagsInputItemDelete`,
`TagsInputItemText` and their five prop types are **deleted from the root barrel**, with
the component directory, its story and its contract test. It was never published on a
subpath. There is no replacement: compose `<Chip>` inside a `<LabeledField>` if you need the shape.

_Deleted — `HeaderRibbon`_

`HeaderRibbon` is deleted with the `@mkbabb/glass-ui/header-ribbon` subpath and both of its
types, `HeaderRibbonProps` and `HeaderRibbonPlacement`. Delete the import and the specifier
together; there is no successor component. What the component was is a `role="toolbar"` band
on a glass surface, and you compose that yourself under your own wrapper:

```vue
<div role="toolbar" aria-label="…">
  <Surface tier="floating" surface="glass">
    <!-- your items -->
  </Surface>
</div>
```

On 7.0.0 the same plate was `material="functional"`; that prop is deleted in this release and
`functional` was the `floating` tier under a second name — see the Surface row below.

The `role` and the label belong to the consumer's wrapper because the landmark is the
consumer's, not the surface's. If you are on 7.0.0 and reading a collapsible contract into
this component — `mode`, `anchorLabel`, an `anchor` slot, `hideTimeoutMs` — that contract was
already removed AT 7.0.0; see `## 7.0.0` below. The published 7.0.0 component is 43 lines,
persistent-only, and renders expanded from first paint.

_Deleted — `AnimatedDigit`_

`AnimatedDigit` is deleted with the `@mkbabb/glass-ui/animated-digit` subpath and its two
types, `AnimatedDigitProps` and `AnimatedDigitMode`. There is no successor: nothing in the
library rolls a digit, and a counter that animates its own glyphs is the caller's, not a
surface's. Delete the import and the specifier together.

_Deleted — `CompletionSeal`_

`CompletionSeal` is deleted with the `@mkbabb/glass-ui/completion-seal` subpath, its types
`CompletionSealProps` and `CompletionSealShape`, and the composable door beside it —
`useCompletionSeal` with `UseCompletionSeal` and `UseCompletionSealOptions`. There is no
successor, composable included: the whole seal went at once.

_Deleted — `InstrumentChassis`_

`InstrumentChassis` is deleted with the `@mkbabb/glass-ui/instrument-chassis` subpath and
all five of its types: `InstrumentChassisProps`, `InstrumentChassisBoundary`,
`InstrumentChassisProportion`, `InstrumentChassisReserve` and `InstrumentChassisState`.
There is no successor component. The proportion and reserve it framed are layout the
caller now owns outright.

_Deleted — `LiquidGrid`_

`LiquidGrid` is deleted with the `@mkbabb/glass-ui/liquid-grid` subpath and everything that
door published: the `useLiquidGrid` composable with `LiquidGridHandle` and
`UseLiquidGridOptions`; the configuration surface `LiquidGridConfig`,
`DEFAULT_LIQUID_GRID_CONFIG`, `WARM_IDENTITY_INK`, `FACE_WARM_LO`, `FACE_WARM_MID`,
`FACE_WARM_HI` and `LIQUID_GRID_MAX_MAJOR_EVERY`; and the sampler set `potentialFBM`,
`curlFBM`, `gridCoverage`, `sampleLiquidGrid`, `gridScaleFor`, `CURL_EPS` with `Vec2`,
`LiquidGridSampleParams` and `LiquidGridFace`. The `OklchStop` re-export went with it;
that type has its own door on `@mkbabb/glass-ui/color`. There is no successor.

_Deleted — `PaperBackdrop`_

`PaperBackdrop` is deleted with the `@mkbabb/glass-ui/paper-backdrop` subpath and its type
`PaperBackdropProps`. There is no successor component; a page-level ground is a background
you own.

_Deleted — `Pulse`_

The `StatusDot` prop table below retires the `pulse` prop; this entry is the `Pulse`
component itself.

`Pulse` is deleted with the `@mkbabb/glass-ui/pulse` subpath and its exported `PulseState`.
This one is a merge rather than a drop, so it has a successor: liveness is an axis of
`StatusDot`, never a second component. `PulseState`'s four members — `active`, `idle`,
`success`, `warning` — are absorbed whole into `StatusDotState`'s seven, so no call site
loses a state:

```vue
<!-- was -->
<Pulse state="active" label="Live" />
<!-- now -->
<StatusDot state="active" motion="full" label="Live" />
```

`state`, `label` and `class` keep their names and meanings, and `motion="full"` is the
default — but **the default STATE moves, silently**: `Pulse` defaulted to `active`,
`StatusDot` defaults to `online`, and the breathing is gated to `active` alone
(`:data-motion="motion === 'full' && state === 'active'"`). So a bare `<Pulse label="Live"/>`
ports to a STATIC online mark unless you now pass `state="active"` — no type error catches
it. Any call site that leant on Pulse's default must name the state. Import from
`@mkbabb/glass-ui` or `@mkbabb/glass-ui/status-dot`, and read the `StatusDot` prop table
below for the rest.

_Deleted — `WatercolorDot`_

`WatercolorDot` is deleted with the `@mkbabb/glass-ui/watercolor-dot` subpath and every
symbol that door published: `useWatercolorBlob` with `UseWatercolorBlobOptions` and
`WatercolorBlob`, and the seeded-blob helpers `mulberry32`, `hashString`, `randomRadii` and
`radiiToCSS`. There is no successor in this library — the ornament itself RELOCATED to
value.js, and the landing ramp it once served is now `<HandMark brush="highlighter"
shape="highlight">`. Of the four helpers, `mulberry32` and `hashString` live on inside the
library (`src/composables/glass/procedural/prng.ts`) behind no published door, and
`randomRadii`/`radiiToCSS` are gone outright: copy whichever you were calling out of your
pinned 7.0.0 package and into your own tree.

_Six composables leave `./motion`, `./motion-core` and the root barrel_

| removed | migration |
| --- | --- |
| `useBloomUp` · `BloomUpPreset` · `UseBloomUpOptions` · `UseBloomUpReturn` (`./motion`) | No successor. |
| `useNumericTransition` · `SpringSnapshot` · `UseNumericTransitionOptions` · `UseNumericTransitionReturn` (`./motion`) | No successor. |
| `useCountup` · `UseCountupOptions` · `UseCountupReturn` (`./motion`) | The number tween is `useAnimatedNumber` (`./motion`). |
| `useStaggerReveal` (`./motion-core`) | No successor. |
| `useTextHighlight` · `HighlightMatcher` · `UseTextHighlightControls` (`./motion-core`) | No successor. |
| `useSpecularPointer` · `UseSpecularPointerOptions` · `UseSpecularPointer` (the root barrel, via `composables/glass`) | No successor. |

_Class + attribute namespace — `.dropdown-menu__*` → `.menu__*`_

If you style the menu family from outside, the selectors renamed with the family:
`.dropdown-menu__trigger` → `.menu__trigger`, and likewise `__item`, `__sub-trigger`,
`__indicator`, `__radio-dot`, `__label`, `__shortcut`, `__sub-chevron`. The
`data-slot` values renamed the same way (`data-slot="dropdown-menu-content"` →
`"menu-content"`, and so on for all eleven parts). No behaviour changed; only the
namespace.

_Theme tokens removed — thirteen `@theme` names_

If you read one of these by name, it resolves to nothing today. Each row names what
carries the value now, or says there is nothing.

One distinction runs through the table and decides how much any given row costs you.
Four of the thirteen (`--radius-input`, `--radius-tooltip`, `--corner-k-soft`,
`--corner-k-sharp`) were plain `@theme` declarations in `theme/radius.css`: they
emitted a real custom property, so a `var()` read of them worked and now does not.
The other nine lived in `theme/bridges.css`'s `@theme inline` block — a bridge name
mints a Tailwind utility spelling and never emits a custom property at all — so for
those, the UTILITY is what you lose; `var(--name)` resolved to nothing before the
removal too. `--ease-spring` is the one that sits on both sides; its row says so.

| removed | landed | what carries it now |
| --- | --- | --- |
| `--radius-input` | `31c01d2a` (2026-07-22) | `--radius-media`, byte-for-byte the same value (`var(--radius)`). The radius canon re-cut every rung as a ROLE, and an input is media-shaped, not its own role. |
| `--radius-tooltip` | `bca22bd9` (2026-08-08) | Removed, no successor. It aliased `--radius-lg` → `--radius`, which gave the overlay family THREE corners (menu/panel 16, plate 12, hint 10). A hint is a small plate: its corner is `--radius-panel`, declared once by the overlay register. Its only reader was the `rounded-tooltip` utility on `TooltipContent`, which the register replaced. |
| `--ease-spring` | `d27ec5dc` (2026-08-05) | Removed — see the note under this table. |
| `--ease-spring-bouncy` | `d27ec5dc` | Removed — see the note under this table. |
| `--ease-spring-gentle` | `d27ec5dc` | Removed — see the note under this table. |
| `--ease-spring-press` | `d27ec5dc` | Removed — see the note under this table. |
| `--ease-spring-smooth` | `d27ec5dc` | Removed — see the note under this table. |
| `--ease-spring-snappy` | `d27ec5dc` | Removed — see the note under this table. |
| `--corner-k-soft` | `31c01d2a` (2026-07-22) | `--corner-k-squircle` (`2`). The soft/sharp rungs (1.7 / 2.4) had zero `var()` readers; the squircle vocabulary is one k. |
| `--corner-k-sharp` | `31c01d2a` | `--corner-k-squircle`, as above. |
| `--color-surface-tint-35` | `35a30fbb` (2026-07-22) | Removed, no successor rung. The bridge and the `:root` rung it bridged (`--surface-tint-35`, `color-radius.css` + `dark-arm.css`) went together, and the ladder keeps 4 · 6 · 8 · 10 · 12 · 15 · 18 · 22 · 25 · 40 · 70. The rung's one reader was `.input-pill::placeholder`, repointed to `--muted-foreground` by the a11y placeholder-contrast cure. If you used it as placeholder ink, that is the replacement. |
| `--text-admin-label` | `6b450f22` (2026-08-04) | `--text-micro`, the bridge over `--type-micro`. The size moves: `--type-admin-label` (`typography/scale.css`, also gone) was `0.625rem` (10px, fixed); `--type-micro` is `0.6875rem` (11px). The utility of the same name went in the same cut — see the next table. |
| `--z-index-hovercard` | `bca22bd9` (2026-08-08) | `--z-index-popover`. The `:root` rung it bridged, `--z-hovercard` (120, `tokens/scheme-motion.css`), went too; `--z-popover` (130) is the surviving rung. The hover arm of the popover union has always painted `z-popover`, because a hover preview IS a popover here — one sealed component, two reka roots. |

**The `--ease-spring-*` family went whole, and its replacement is the token, not a
utility.** What the removal costs you depends on which spelling you wrote, and the two
answers are different. Five of the six — `-bouncy`, `-gentle`, `-press`, `-smooth`,
`-snappy` — were declared ONLY in `theme/bridges.css`'s `@theme inline` block, and a
bridge name mints a utility spelling without ever emitting a custom property. So
`ease-spring-smooth` (the utility) was real and is gone; `var(--ease-spring-smooth)`
resolved to nothing at 7.0.0 and at every version before it, and still resolves to
nothing — nothing changed for that reader except that it is now honestly named.
`--ease-spring` is the exception: it was declared TWICE, once as a bridge and once as
a plain `:root` custom property in `tokens/scheme-spring.css`, so `var(--ease-spring)`
DID resolve on the `./styles` surface and now does not. The springs themselves
are very much alive: the register re-cut onto SIX role rungs — `--spring-dock` ·
`--spring-present` · `--spring-press` · `--spring-panel` · `--spring-world` ·
`--spring-bloom`, each with its own `-duration`, `-exit-duration` and `-settle` clock. A
recipe that wants one by utility name reaches the token directly:
`ease-(--spring-press)`. A consumer that wants the utilities back declares them in its
own CSS. The old spellings map by intent, not by name: `--ease-spring` and
`--ease-spring-snappy` were `--spring-snappy`, which is now `--spring-present` (or
`--spring-dock` for dock motion); `--ease-spring-smooth` and `--ease-spring-bouncy` also
land on `--spring-present`; `--ease-spring-gentle` was `--spring-gentle`, now
`--spring-world`; `--ease-spring-press` is the one that kept its name, `--spring-press`.

_Classes and utilities removed_

| removed | what to write instead |
| --- | --- |
| `glass-fill` | `glass-plate`, which landed in the very commit that removed this one (`4b1a9733`): `.glass-card` moved from `@apply glass-fill` to `@apply glass-plate` there. It paints `background: var(--glass-veil)`, and you pick the rung by declaring `--glass-veil-tier: var(--glass-veil-quiet)` — or `--glass-veil-wash`, `--glass-veil-resting`, `--glass-veil-floating`, `--glass-veil-overlay` — in the place `--glass-fill-rung` used to go. The old TINT mix has no hand-composed equivalent: `--glass-bg-resting`, `--glass-tint-source` and `--glass-tint-strength` all have 0 declarations at 9.0.0. `--glass-fill-tinted` is **not** the successor — it has shipped beside `glass-fill` since 5.0.0 (`216e1d54`), and still beside it in the 7.0.0 package, as a tint OVERLAY. It is itself an ordinary custom property, a `color-mix` that READS the two registered knobs: `@property --glass-fill-tint` (`<color>`, initial `transparent`) and `@property --glass-fill-strength` (`<percentage>`, initial `0%`), both registered at the foot of `styles/tokens/glass.css`. With both at their initials the mix resolves to a fully transparent stop, so reading `--glass-fill-tinted` as a `background` paints nothing until you set both knobs yourself. |
| `text-admin-label` | `text-mono-micro`, plus `uppercase font-medium` wherever the caps or the 500 weight carried meaning — the successor does not include them. The old recipe was `font-mono` · `--type-admin-label` (10px) · `line-height: 1` · `uppercase` · `tracking-caps` · `font-weight: 500`; the new one is `font-mono` · `--type-micro` (11px) · `line-height: 1.25` · `letter-spacing: 0.025em`. Landed `6b450f22`. |
| `touch-hit-area` | Removed, no drop-in utility. Do not rebuild it from its old body (a centred `::before` with `pointer-events: none`): that halo is inert and never expanded a tap target. `--touch-target` (`2.75rem`) still ships and is still what the components read, and there are two ways to reach it. **The host as the seat, the paint on a child** — the host wears `.control-bit`, which sizes it to `max(var(--touch-target), face)` on both axes, in flow, margin box == border box, while the smaller `.control-bit__face` child carries the paint; checkbox and the radio item ship this way (`styles/glass/control-bit.css`). The absolutely-positioned `.checkbox__seat` span it replaced bled past the box and made the hit rect lie — do not reach for that form. **Or the attribute floor** — `[data-control-target]` on the host, read by the shared rule in `styles/utilities/responsive.css`: `@media (pointer: coarse){[data-control-target]{min-block-size: var(--touch-target, 2.75rem); min-inline-size: var(--touch-target, 2.75rem)}}`. That rule ships from 7.0.0; what changes in this release is that Button wears the attribute unconditionally rather than icon-only. It is a floor, not a halo: it grows the host's own box, and the paint stays small by sitting on a child — the Timeline marks are `<button data-control-target>` whose disc does not inflate. Either door; never the inert `::before`. |

The roster also GAINED one utility at this cut: the `@utility` diff 7.0.0 → 8.0.0 is
three out, one in, and that gain is the successor named above.

_The blanket blur opt-out is gone — `--glass-cell-backdrop-filter`_

It was a plain custom property, never a `@theme` or `@utility` name, which is why it is
its own block and not a fourteenth row in the table above.

| removed | what to write instead |
| --- | --- |
| `--glass-cell-backdrop-filter` | `surface="opaque"` on the component, or `data-surface="opaque"` on a plain element. The token was the blur channel's blanket override: every glass rung read `backdrop-filter: var(--glass-cell-backdrop-filter, var(--glass-blur-<rung>))`, so declaring it anywhere in the tree replaced the blur of every rung under it. Sixteen read-arms collapsed in the same commit, and the rule that set it went with them — `:where(.glass-wash, .glass-quiet, .glass-resting, .glass-floating, .glass-overlay, .glass-card, .glass-dock) > * { --glass-cell-backdrop-filter: none; }`, the content-tier suppression that kept a glass child from blurring inside a glass parent. Both halves are gone together. Build on the SURFACE axis instead, never on the token: a surface declares what it is, and the blur follows from it. Landed `4b1a9733`. |

_A registered `@property` name is gone — `--specular-angle`_

| removed | what to write instead |
| --- | --- |
| `--specular-angle` | Removed, no successor. It was the angular channel of the specular register, `@property`-registered in `styles/tokens/property-regs.css` and read by the conic-gradient leg of the `::before` sweep. The positional family is THREE names from this cut, not four: `--specular-x`, `--specular-y` and `--specular-intensity` all survive and stay registered. A stylesheet that writes the angle declares an unregistered custom property that nothing reads. |

_Focus moves off `box-shadow` and stops restating the shape_

Both are visible breaks for a consumer that relied on the pill geometry or read
`--focus-ring-shadow` as the control's paint.

| was | now | what to do |
| --- | --- | --- |
| `.focus-ring:focus-visible` wrote `--radius-pill` on the host, plus `outline: none` and a `box-shadow` ring | one `outline` and `outline-offset: 2px`, nothing else | Nothing, if you wanted a ring. The `--radius-pill` write was the bug: a focus indicator may not restate the element's shape, and it did — a 6px host went to 9999px on focus and snapped back on blur. The outline tracks the corner instead. If you were LEANING on that shape change, it is gone; declare the radius yourself. |
| `.field-control:focus-visible` painted `box-shadow: var(--focus-ring-shadow)` with `outline: none` | `outline: var(--focus-ring-width) solid var(--field-control-ink)`, `outline-offset: 2px`, plus a `--control-edge-ring` fill | The `box-shadow` channel on a focused field control is YOURS again — nothing of ours writes it. The ring's hue also moves, from the accent at 30% to neutral `--foreground` at `--ink-perimeter` (`0.48`), which measures 3.0:1 where the retired ring measured 1.91:1. If you need to add to the ring rather than replace it, compose instead of erasing: `.glass-control-edge` in `@layer components` reads `--control-edge-inner` and `--control-edge-ring` as slots, so fill a slot. |

`--focus-ring-shadow` itself SURVIVES — fifteen references in the published package — and
what changed is that `.field-control` is no longer one of them.

_Alert loses its tone wash_

All five Alert tones now ride ONE `.glass-quiet` rung. There is no per-tone tinted
plate, and there is no per-tone ink rung (`--success-ink` and its siblings are not
coming). The ink is `text-card-foreground` = `--foreground` on every arm, which measures
**16.19:1** light and **11.17:1** dark on `--card` — the whole point of the recompose is
that a tone can no longer cost legibility.

What to do: adopt the component and delete any local fork. A `class="bg-success/10
text-success"` wrapper reproduces exactly the thing this cut removed; drop it whole. Set
`announce` explicitly if you want the live region — it defaults to `off`.

**The toned glyph channel was dead from 8.0.0 through 9.0.0, and paints from 10.0.0
on, so at 9.0.0 the glyph is still neutral.** The TONED arms carry `[&>svg]:text-(--tone)`, but BASE ended
`[&>svg]:text-current`; `cn()` is a bucketed deduper rather than twMerge, so both
survived the join, and Tailwind emits the `--tone` rule BEFORE the `currentcolor` rule
at equal specificity — currentcolor won, and a toned Alert was pixel-identical to a
neutral one. Chrome measured the toned glyph at `rgb(28, 25, 23)`, the plate ink. The
fix deletes `text-current` from BASE, and the glyph then reads the tone. If
you relied on the neutral-looking glyph, note that your toned Alerts will now paint
their tone.

_Peer dependencies — `vue-component-type-helpers` is now declared, and the reason is upstream_

| Was | Now | What to do |
| --- | --- | --- |
| (undeclared) | `"vue-component-type-helpers": "^3.0.3"` in `peerDependencies` | Usually nothing — if you already have `vue-tsc`, or any toolchain that vendors it, it is on disk and your package manager is satisfied. If you type-check with `skipLibCheck: false` and did NOT have it, this is the peer that was missing. |

**This is a workaround for someone else's packaging defect, stated plainly so it can be
retired when the defect is.** `reka-ui@2.10.1`'s `dist/index3.d.ts` line 7 does
`import { ComponentProps } from "vue-component-type-helpers"`, but reka-ui declares that
package in **neither** `dependencies` **nor** `peerDependencies` — only in its own
devDependencies, at `^3.0.3`. Detector, verbatim:

```
node -p "JSON.stringify(require('reka-ui/package.json').dependencies)"                       # → absent
node -p "require('reka-ui/package.json').devDependencies['vue-component-type-helpers']"      # → ^3.0.3
```

A dev-only declaration does not travel with an install, so **no consumer of reka-ui
receives it**, and any consumer typechecking glass-ui's published `.d.ts` closure with
`skipLibCheck: false` hit `TS2307: Cannot find module 'vue-component-type-helpers'`.
glass-ui declares it as a peer so the type closure is part of the published contract
rather than an accident of hoisting. The range matches reka-ui's own usage. When reka-ui
ships the dependency correctly, this peer can be dropped in one line.

**`StatusDot`'s 7.0.0 cut is written down — two majors late.** The 7.0.0 rewrite
replaced this component's entire API and shipped no migration rows at all, while
`v-bind="$attrs"` made every retired prop a silent no-op: the call sites kept
type-checking, kept rendering, and quietly lost their meaning. The rows are owed to
anyone still on the old shape, so they are written here now rather than left
unrecorded.

_Props — `<StatusDot>` (retired in 7.0.0, recorded here)_

| Retired | Replacement |
| --- | --- |
| `variant`, `color` | `state` — one axis of seven: `active \| idle \| online \| success \| warning \| error \| unknown`. Each paints its own silhouette AND its own tone, so the signal survives monochrome. Retint one instance by overriding `--feedback-state-color` on the mark. |
| `pulse` | `motion` — `"full"` (default) breathes the live `active` state; `"off"` opts down. Liveness is an axis of this component, never a second component. Reduced motion always wins. |
| `size="xs"` | `size="sm"` — the ladder is `sm \| md \| lg`. |
| `label` as VISIBLE TEXT | `label` is the accessible name only (`aria-label`); it renders nothing. **This is a silent visual regression no type error catches** — a dot that used to print its word beside itself now prints nothing. Put the word in your own markup and keep `label` for the accessible identity, or omit `label` when that adjacent text already names the state. |
| `.status-dot__dot`, `.status-dot__pulse`, `.status-dot__fill` | Deleted. The mark is one element, `.feedback-mark`, with its silhouette on `::before`/`::after`. |

_This cut (8.0.0)_

- `StatusDot` now also exports from the **root** barrel (`@mkbabb/glass-ui`). The
  `./status-dot` subpath is unchanged; nothing needs re-pointing.
- The size rungs are `em`, not `rem` — byte-identical at a root font-size of 16, and
  now tracking the line the mark sits in. A caller who set an explicit
  `--feedback-mark-size` is unaffected.
- An unhandled state paints the `unknown` mark rather than the live one.
- `FeedbackSize` is `StatusDotSize` at its source (`states.ts`, formerly
  `feedback.ts`). The exported name is unchanged.

**The inert-mark register lands: badge · separator · label · avatar · skeleton ·
status-dot.** Six components, one law — a mark samples nothing
(`backdrop-filter: none`), never authors a hover affordance, paints one divider ink
off the `--ink-{seam,edge,perimeter}` ladder, and spells one stadium radius.

- **`<Badge surface="glass">` is deleted**, with `--badge-glass-strength` and the
  `.badge-atom--glass` tint map. A badge is an inert mark; the quiet register
  composed `.glass-capsule`, which paints a real `backdrop-filter`. It also shipped
  broken — the tint map keyed `[data-variant]`, an attribute the default never
  wrote. Use the `tone` axis for semantic colour.
- **Badge type and pad rungs moved.** Type is now by role on the canonical series
  (`--type-caption` / `--control-label` / `--control-text`) and the pad is on the
  spacing series, off the `--ui-scale` scalar. `wrap-anywhere` is gone (a badge does
  not wrap); glyphs are `1em`; a one-character badge floors circular.
- **`.glass-avatar` → `.avatar`, `.glass-label` → `.label`** (and the BEM children:
  `.glass-avatar__identity` → `.avatar__identity`, and so on). Neither component has
  ever carried glass. Clean break — re-point any selector that targeted them.
- **The avatar size ladder is φ-derived**: `sm` is the control rung
  (`--control-h-md`), `md` is φ of it, `lg` is φ². Only `lg` moves — `8rem`/128px →
  ~104.7px.
- **`AvatarImage` drops `data-image-state`, the `loadingStatusChange` emit and the
  `AvatarImageStatus` type** — a four-state machine with zero readers and zero
  listeners across six repos. `<AvatarFallback :delay-ms>` now works; it was
  silently swallowed.
- **`--separator-ink` is deleted.** Separators paint `--ink-seam` (0.08). Retint
  from the ladder, not from a per-component token.
- **The skeleton's travelling shimmer is replaced by an opacity breathe.** The band
  eased a one-way loop (71% of every cycle parked off-box) and travelled 220% of its
  own width in a fixed clock, so its speed varied 5.8× with the box. No API change;
  a consumer that overrode `skeleton-scan` should drop the override.

_Metric — one atom, two composers_

- **`MetricCell` is deleted; it is `<Metric posture="cell">`.** A cell is a posture
  of one readout, not a second component. Its `icon` / `iconSize` /
  `iconStrokeWidth` props are gone with it — put the glyph in your own heading.
- **`MetricRow` is now a pure layout composer.** It takes a slot, not metric props:
  `<MetricRow><Metric posture="row" label="…" :value="…" /></MetricRow>`.
- **`<Metric orientation>` is `<Metric posture>`** — `inline | stacked | cell | row`.
- **New**: `delta` + `polarity` (status ink on the neutral material, never a coloured
  plate), `compact` (locale-aware compact numbers through `coalesceMetric`), and
  `coalesceMetric` / `metricPolarity` are exported from `./metric`. The status ink ends
  at 10.0.0: the delta paints `--foreground` and its number and sign carry the polarity;
  see _`Metric`'s delta paints the one ink_ under 10.0.0.

**The dock's "rail" vocabulary is struck; the layer-switcher renames and the
hairline is built.** `rail` meant a VERTICALLY-ORIENTED DOCK in the dock band's own
identifiers (`--dock-rail-padding` was the vertical dock's padding, `--dock-rail-extend-length`
its reach, `--dock-rail-accent-*` its selected bar), but a rail is a *hairline inside* a
horizontal or vertical dock. Three
things now carry three names: a vertical dock is `<GlassDock orientation="vertical">`,
the in-dock tab strip is the **layer switcher**, and the line across the dock is the
**hairline**. Clean break, no aliases.

_Props — `<DockLayerGroup>`_

| removed at 8.0 | replacement |
| --- | --- |
| `show-rail` / `showRail` | `show-switcher` / `showSwitcher` — same boolean, same `true` default |
| `rail-position` / `railPosition` | `switcher-position` / `switcherPosition` — same `"start" \| "end"`, same `"start"` default |

_Classes and attributes_

| removed at 8.0 | replacement |
| --- | --- |
| `.dock-layer-rail` | `.dock-layer-switcher` |
| `.dock-layer-group.rail-start` / `.rail-end` | `.switcher-start` / `.switcher-end` (emitted by the component; a consumer never writes them) |
| `.dock-separator--anchor` | `.dock-hairline` — and it now PAINTS; the old modifier was declared in no stylesheet |
| `data-rail-anchor` | `data-dock-hairline` — likewise; the old attribute was read by nothing |

_CSS custom properties_

| Classification | Property |
| --- | --- |
| removed at 8.0 | `--dock-layer-rail-bg`, `--dock-layer-rail-divider`, `--dock-layer-rail-hover`, `--dock-layer-rail-active`, `--dock-layer-rail-gap`, `--dock-layer-rail-padding`, `--dock-layer-rail-glyph`, `--dock-rail-active-accent`, `--dock-rail-padding`, `--dock-rail-extend-length`, `--dock-rail-accent-width`, `--dock-rail-accent-gap`, `--dock-rail-accent-inset` |
| added at 8.0, declared with a library default (`tokens/sizing.css`) | `--dock-layer-switcher-{bg,hover,active}`, `--dock-hairline` |
| added at 8.0 as a CONSUMER HANDLE — the name is read with an inline fallback and declared nowhere in `src/`, exactly as its predecessor was | `--dock-layer-switcher-{gap,padding,glyph,glyph-active}`, `--dock-vertical-{padding,extend-length}`, `--dock-vertical-accent-{width,gap,inset}` |

`--dock-layer-rail-divider` does **not** rename one-to-one: it folds into
`--dock-hairline`, which is now the ONE hairline colour for the whole dock band —
`.dock-separator`, `.dock-hairline`, and the layer switcher's divider edge all read it.
A consumer that retinted the switcher divider retints every dock hairline with the one
token. The value moved with the fold, and this is the cut's only paint delta:
`color-mix(in srgb, var(--border) 40%, transparent)` →
`color-mix(in srgb, var(--foreground) 15%, transparent)` (`--surface-tint-15`, which
`tokens/dark-arm.css` re-resolves warm in dark). `.dock-separator`'s own paint is
byte-unchanged; only its source became a name.

_Internal renames a deep-importer would feel_

`composables/dockRailContext.ts` → `composables/dockSwitcherContext.ts`;
`DockRailContext` → `DockSwitcherContext`; `provideDockRailContext` /
`useDockRailContext` → `provideDockSwitcherContext` / `useDockSwitcherContext`;
`DOCK_RAIL_KEY` → `DOCK_SWITCHER_KEY` (injection key string
`"glass-ui:dock-rail-tablist"` → `"glass-ui:dock-switcher-tablist"`). None of these were
on a published export map; a consumer reaching them was deep-importing.

_New behaviour_

`<DockSeparator anchor>` was a prop with no effect — it stamped markers for a slot that
existed in no file. It now promotes the separator to the dock hairline: one 1px rule
spanning the dock's cross extent (`align-self: stretch` + the cross-axis size), inside a
horizontal OR a vertical dock. The plain `<DockSeparator>` is unchanged.

**The Slider/Progress track seam is typed and split; the generic `--track-bg`
knob and `.value-mark(s)` selectors are removed.** The Slider `.slider-track` and
the Progress `.progress-rail` now COMPOSE two shared registers — the recessed
`.track-well` groove and the `.glass-value-marks`/`.glass-value-mark`
checkpoint-dot layer (the groove carries no `glass-` prefix because it declares no
material) — and each drives its OWN typed public property. There is no
shared inheriting background axis (a Slider `background` and a Progress `<color>`
are different grammars and must not collide on one knob).

_CSS custom properties_

| Classification | Property |
| --- | --- |
| removed at 8.0 | `--slider-track-bg`, `--progress-track` |
| never published (candidate-only) | `--track-bg` |
| added at 8.0 | `--glass-slider-track-background` (CSS `background` grammar; falls back `--muted-medium`, spectrum `--secondary`), `--glass-progress-track-background` (CSS `background` grammar; falls back to the host-relative groove ground `--track-well-recess`) |
| retained | `--value-mark-position`, `--value-mark-size`, `--value-mark-color` |

`--progress-track-on-glass` is removed at 8.0. The groove ground is the one
host-relative derivation `--track-well-recess`, declared on `.track-well` /
`.track-ground`.

Old Slider writers (`--slider-track-bg: <background>`) move to
`--glass-slider-track-background`. Old Progress writers (`--progress-track:
<color>`) move to `--glass-progress-track-background`; any `background` value is
valid there, gradients included, like its Slider sibling. Both properties inherit, so an ancestor
may style a component population; Progress reads the property (it is never
assigned on `.progress-rail`), so an inherited override reaches the rail.

_DOM classes (unsupported implementation hooks, listed for completeness)_

| Classification | DOM surface |
| --- | --- |
| removed | `.slider-marks`, `.slider-mark`, `.progress-value-marks`, `.progress-value-mark` |
| never emitted (candidate-only) | `.value-marks`, `.value-mark` |
| added | `.track-well`, `.track-flow`, `.glass-value-marks`, `.glass-value-mark` |

`.track-flow` is the one indeterminate flow band, composed by Progress and Timeline.

_Package export_

`@mkbabb/glass-ui/styles.css` (the component-only entry) now targets the
generated `dist/component-styles.css` manifest, which folds the shared
`track-well.css` + `track-flow.css` + `value-marks.css` structure before the raw
SFC bundle so the emitted `.track-well`/`.track-flow`/`.glass-value-mark(s)`
classes have their rules on this entry. The canonical `@mkbabb/glass-ui/styles` (`dist/styles/index.css`) is
unchanged and reaches the same partials through its own cascade — import exactly
ONE style entry, never both.


**The device-DPR overlay-blur arm is removed.** The `overlay` glass role is now
`11px` at EVERY device pixel ratio. The `@media (min-resolution: 2dppx)` writer that
lifted `--glass-blur-overlay-radius` to `17px` on retina displays (shipped in 7.0.0)
is deleted — it broke the uniform-subtlety direction, inverted the hierarchy (a calm
overlay outgrew the `16px` deep ceiling), and a CSS blur radius already maps over more
device pixels at higher DPR, so the claimed amortization was physically incomplete. A
consumer that relied on the richer retina overlay wash re-verifies legibility; there is
no token-name change, only the removal of the device-conditional value.

**The immersive stage scrim is a private stage-effect role, reconnected to
`--glass-level`.** `stage="immersive"` ~~on `Dialog`/`Drawer`~~ paints one fixed `14px`
backdrop sample (the last published value) **multiplied by `--glass-level`**, so it
flattens in lockstep with every other glass surface: `14px` at level 1, `4.2px` at level
0.3 (`prefers-contrast: more`), `0px` at level 0 (`prefers-reduced-transparency` /
`forced-colors`). Within this major `Drawer` folded whole into `Sheet` and the stage
itself was deleted, so no component accepts `stage` at 8.0.0; this paragraph and the next
describe a scrim 8.0.0 does not ship. The radius never reads
the per-frame `--stage-t`, and it carries no saturation term — it is a scene-separation
effect, not a glass surface recipe, and not the deep endpoint. (Interim development had
repointed it onto the `16px` deep radius, bypassing the clarity axis; this restores the
`14px × level` behavior.)

**`CommandDialog` is not an immersive receiver.** It forwards `DialogProps`, never
`DialogContentProps`, so it cannot request the stage. Neither `Dialog` nor
`SheetContent` accepts `stage` at 8.0.0 (see the `./sheet` row under _Package
subpaths_ under §8.0.0).

**Blur ontology, restated.** The glass material is three separate concepts: FIVE calm
role recipes (`wash`/`quiet`/`resting`/`floating`/`overlay`) across THREE distinct
standard magnitudes (`1`/`7`/`11px`); one opt-in `deep` continuum (`11→16px`, saturate
`1.6→1.8`) above the calm set; and one private immersive stage scrim beside it. Equal
radii (`quiet`==`resting`==7px, `floating`==`overlay`==11px) are shared radius legs that
still differ by brightness / dark-arm recipe / role — not merged materials. The per-role
saturate values (`1.4`/`1.6`) are provisional current values pending a structured paint
comparison, not ratified identity. No token-name or API change from this restatement.

**The `.glass-lens` refraction is DELETED — the class, the filter asset, and both
root exports.** `armGlassRefract()` and `supportsBackdropRefract()` are removed from
`@mkbabb/glass-ui` with NO replacement, and `src/styles/glass-refract.css` (the baked
`#glass-refract` `feDisplacementMap` data-URI) no longer ships in the `/styles`
cascade. The composite only ever rasterized on Chromium, WebKit lied to the `@supports`
probe, and the runtime latch that worked around the lie carried a per-app bootstrap
cost for a garnish half the web never painted. Delete the `armGlassRefract()` call at
your app root and drop `.glass-lens` from any element that carries it; the surviving
`.glass-{rung}` blur+tint base is what those surfaces already painted everywhere
except Chromium, so the lived read is unchanged off-Chromium.

| Removed at 8.0 | Replacement |
| --- | --- |
| `armGlassRefract` (root barrel) | none — delete the call |
| `supportsBackdropRefract` (root barrel) | none — no capability branch remains |
| `.glass-lens` class + `src/styles/glass-refract.css` | the `.glass-{wash,quiet,resting,floating,overlay}` base |

**The timeline family collapses five SFCs into one: `GlassTimeline` → `Timeline`.**
The `./timeline` subpath survives; everything inside it is new. `GlassTimeline` was a
dispatcher over three structurally-distinct variants (`scrubber` / `segmented` /
`continuous`) that forked one job — report progress along an axis — into three
coordinate systems, three a11y stories and three paint recipes. `<Timeline>` is ONE
normalized reporting axis: N ordered spans on the unit interval, `role="progressbar"`
and never `role="slider"`. The commanding playhead-with-ticks surface a `scrubber`
consumer wants is `<Slider :marks>`, which already exists and already speaks the
keyboard contract; there is no drop-in replacement for `variant="scrubber"` and none is
offered, because a timeline reports and a slider commands.

`ScrubberTimeline`, `SegmentedTimeline`, `ContinuousTimeline`, `ContinuousRail` and
`ContinuousMarkers` were never exported — only the dispatcher was public — so the
export delta is the one rename plus the type delta below.

_Runtime + type exports on `./timeline`_

| Classification | Symbol |
| --- | --- |
| renamed at 8.0 | `GlassTimeline` → `Timeline` |
| removed at 8.0 | `TimelineSegmentGradient` (the per-segment gradient dialect died with the segmented variant) |
| added at 8.0 | `TimelineProps` (a consumer typing a wrapper needs it) |
| retained | `TimelineSegment`, `TimelineSegmentState` |

_Props_

| Classification | Prop |
| --- | --- |
| removed at 8.0 | `variant`, `modelValue`, `currentSegmentKey`, `ariaLabel`, `disablePopover` |
| repurposed at 8.0 | `label` — was the scrubber's tooltip caret text; it is now the accessible NAME of the bar (`aria-label` on the `role="progressbar"` track). Same spelling, different job: re-read every site that passed it |
| added at 8.0 | `current` (the key of the current span, replacing `currentSegmentKey`) |
| retained | `segments` |

`ariaLabel`'s old comma-joined-segment-labels fallback is gone with it: an invented name
is a lie, so an unnamed bar stays unnamed and `label` is how you name it.

_Emits and slots_

| Classification | Surface |
| --- | --- |
| removed at 8.0 | `update:modelValue`, `scrubStart`, `scrubEnd` (scrubber-only — move to `<Slider>`), `hoverEnd`, `#popoverContent` |
| renamed at 8.0 | `click` → `select` |
| changed at 8.0 | `hover` emits `{ key, segment }` on enter and `null` on leave (one event, not a pair); `#detail` survives with a new scope — `{ segment, source, current, hovered, value, progress }` |

_`TimelineSegment` shape_

| Classification | Field |
| --- | --- |
| removed at 8.0 | `gradient` (a span's paint is one colour, not a ramp), `weight` |
| added at 8.0 | `at` — the span's END boundary on the unit axis, CUMULATIVE, clamped monotone non-decreasing and never sorted; omitted spans take an equal share of the remainder between pinned neighbours. It replaces `weight`'s relative distribution. `accent` — a CSS `<color>` overriding the span's ordinal hue |
| changed at 8.0 | `state` is now OPTIONAL (defaults `"pending"`). `progress` omitted on an `active` span is INDETERMINATE — it paints no fill and no cap and surfaces as prose in `aria-valuetext`, where the old primitive fabricated `0.5` |

_CSS custom properties (`tokens/scale-paper.css` §16)_

| Classification | Property |
| --- | --- |
| removed at 8.0 | `--timeline-continuous-height`, `--timeline-dot-size`, `--timeline-dot-size-touch`, `--timeline-touch-target`, `--timeline-segment-flex`, `--timeline-dot-fill`, `--timeline-dot-blur`, `--timeline-dot-ring`, `--timeline-dot-tint-current`, `--timeline-dot-tint-completed`, `--timeline-dot-check-color`, `--timeline-continuous-seam-opacity`, `--timeline-continuous-seam-color`, `--timeline-segment-default-gradient` |
| added at 8.0 | `--timeline-track-h` (the ONE knob; `var(--space-body)`, so 12px at fine and 8px at ≤768px, and `0` is the bare marker-strip case) |

`--timeline-continuous-height` → `--timeline-track-h` is a rename, not a re-point: the
old name encoded a variant taxonomy that no longer exists. The value is unchanged at
fine. Every dot/seam/gradient knob is deleted outright — the mark is a `--card` disc
with a one-ink perimeter and the span is its accent, so there is nothing left for them
to tune.


**`LabeledSelect` is REMOVED from `@mkbabb/glass-ui/labeled-field` — it was a preset,
and it was the one import that made this subpath drag the whole overlay chain.** The
field family ships the anatomy (`LabeledField`) and the three adapters that add no
taxonomy of their own; a select adapter cannot be written without an `items` array, and
an `items` array is a caller's data shape, not a composition primitive. Importing
`./labeled-field` no longer pulls `./select` and everything behind it (popover, portal,
dismissable layer) into the graph.

| Classification | Symbol |
| --- | --- |
| removed at 8.0 | `LabeledSelect` (component), `LabeledSelectProps` (type) |
| retained | `LabeledField`, `LabeledInput`, `LabeledSlider`, `LabeledSwitch`, `LabeledFieldProps`, `LabeledFieldCommonProps`, `LabeledFieldSlotProps`, `LabeledFieldLayout`, `LabeledFieldErrorLive`, `LabeledInputProps`, `LabeledSliderProps`, `LabeledSwitchProps` |

The subpath itself is unchanged. There is no drop-in replacement by design; the
replacement is the composition the anatomy already exposes, and it is the whole diff:

```vue
<LabeledField label="Curve hue" description="…" v-slot="{ controlId, labelledBy, describedBy }">
    <Select :model-value="value" @update:model-value="value = String($event)">
        <SelectTrigger :id="controlId" :aria-labelledby="labelledBy" :aria-describedby="describedBy">
            <SelectValue />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectItem v-for="o in options" :key="o.value" :value="o.value">{{ o.label }}</SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
</LabeledField>
```

A caller who wants the wrapper back owns thirty lines of it — and gains what the removed
one never had: options that carry `{ value, label }` pairs, so the value stays the
contract and the label is what the reader sees, with no second lookup table kept alive
to name the options a second time.


**`Card` sheds six props, three types and one component; `selected` replaces the
selection trio, and the decorations become the classes they always were.** Card owns
proportion, anatomy and — when `selected` is present — engagement; every material axis
is Surface's. `cartoon` / `grid` / `metal` wrote a class a caller can write; `variant` /
`dataHue` / `dataHueStrength` / `selected` were one state wearing four props; `material`
is severed because the card IS the elevated role, which is Surface's own default. Clean
break, no aliases.

_Props — `<Card>`_

| removed at 8.0 | replacement |
| --- | --- |
| `cartoon` | `class="cartoon-surface"` — the public utility the prop wrapped, unchanged. It is the plate's WHOLE cast (it wins the cascade wholesale from the `utilities` layer); do not compose it with a surface that also wants the soft cast |
| `grid` | `class="paper-grid"` — the utility re-homed beside the paper tooth (`styles/paper.css`); it reads the same `--paper-grid-*` cohort |
| `metal` (`"gold" \| "silver" \| "bronze"`) | `class="metal-gold-border"` / `metal-silver-border` / `metal-bronze-border` — the three `metal-*-border` utilities (`styles/utilities/metal.css`) survive unchanged, class-borne |
| `variant` (`"default" \| "selection" \| "interactive"`) | `selected` — PRESENCE is the signal. `selected` present makes the card an option (`role="option"`, a tab stop, `aria-selected`, pointer, hover/selected fill, press, focus ring); absent, the card is inert prose. `selected="false"` is an UNSELECTED option, not an inert card |
| `dataHue` / `dataHueStrength` | `--glass-accent` written on the element by the caller — a per-instance rim hue is a CSS custom property, not a prop pair |
| `material` | none — severed. `<Card>` is the elevated role; pass `tier` / `surface` / `deep` for the plate axes, or reach for `<Surface>` directly when you want a different role |
| `grain` | none — REMOVED from the whole library. Declared on `SurfaceProps` at 7.0.0 (defaulted `true` on Card, `false` on Surface) and gone at 8.0: it armed a `data-grain` attribute for a decoration the glass ladder now paints from its own tokens. Under `vueCompilerOptions.checkUnknownProps` a retained `<Card grain>` is a **hard typecheck error**, not a silent no-op — delete the attribute |
| `specular` (`SurfaceSpecular` = `"off" \| "subtle" \| "full"`) | none — REMOVED from the whole library, with the `SurfaceSpecular` type (see the `./surface` table below). It set three `--glass-specular-intensity-*` overrides behind a `surface === "glass"` gate; write those custom properties on the element if you want the `"full"` register. `<Card specular="full">` is a hard typecheck error at 8.0 |
| `shadow`, `tier`, `surface`, `deep`, `size`, `as` | retained. `size` and `shadow` are CARD's own at 8.0 — `shadow` moved off Surface and Card stamps its own `data-shadow`; `tier` / `surface` / `deep` are Surface's, forwarded |

_Runtime + type exports on `./card`_

| Classification | Symbol |
| --- | --- |
| removed at 8.0 | `CardTier` (type), `CardVariant` (type), `CardMetal` (type), `CardAction` (component) |
| retained | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `CardProps`, `CardSize` |

`CardTier` was already folded onto the shared `surface` axis at 5.0.0 (_`CardTier` folds onto the `surface` axis_
below) and survives as `SurfaceProps["tier"]` / `SurfaceTier` (`@mkbabb/glass-ui/axes`) — the
`/card` re-export is what 8.0 drops. `CardVariant` dies with the `variant` prop: the trio it
enumerated is the one `selected` boolean. `CardMetal` dies with `metal`: the three
`metal-*-border` utilities are the surviving surface and a class name needs no union. `CardAction`
is deleted outright — a positioned slot wrapper with no external importer, and the
`.card-header:has(> [data-slot="card-action"])` grid fork goes with it; put the control in
`<CardFooter>`, or place it yourself inside `<CardHeader>`.

_`<CardHeader shrink>` — the scroll host is INSIDE the plate_

`.card-scroll-host` now carries `overflow-y` and a trailing feather mask, and a mask clips
the element's whole rendering. Put it on an element INSIDE the `<Card>` — the viewport that
holds the header and the content — never on the `<Card>` itself, where it dissolves the
plate's own bottom edge and clips its cast away with it:

```vue
<Card>
    <div class="card-scroll-host" tabindex="0" style="max-block-size: 20rem">
        <CardHeader shrink>…</CardHeader>
        <CardContent>…</CardContent>
    </div>
</Card>
```

_CSS custom properties_

| Classification | Property |
| --- | --- |
| removed at 8.0 | `--card-pad-inline`, `--card-pad-block`, `--card-pad-section-gap`, `--card-pad-footer`, `--card-pad-title-gap` — the six-declaration √φ generator that multiplied one seed by 1.272 / 1.618 / 2.618 and landed on no rung of the space series |
| added at 8.0 (`--card-pad` is the published `space`-domain member, `tokens/manifest.ts`) | `--card-pad` — ONE pad, inline == block: `--space-body` (12), `--space-atom` (8) at `size="sm"`. Two gaps and only two: `--card-gap` (intra-group, 8/4) and `--card-group-gap` (group ↔ group, 12/8) |

`--card-pad` is declared on `.card` and nowhere else. A node that is not a card never
inherits it, so a `var(--card-pad, …)` written on a non-card reads as a relay and is a
literal — write the series token you mean (`--space-body` / `--space-family` /
`--space-section`).

_Paint deltas a consumer will see without changing a line_

The default elevated card gains its full rung stack (the role shadow no longer REPLACES the
ladder's box-shadow, it composes with it), the plate edge gains elevation discrimination
(`--ink-seam` 0.08 flush / `--ink-edge` 0.16 elevated, where both arms painted 4%), a card
lifts one rung while a descendant holds keyboard focus, the grain overlay is gone with its
prop, and every padding/gap/type rung is re-derived on the canonical series (title
`--type-body × 1.272`, description `÷ 1.127838`, content rung 0).

_`<Surface>` — the plate primitive goes THREE-PROP_

`SurfaceProps` at 8.0 is `tier` / `surface` / `deep` / `class` (plus `as` from
`PrimitiveProps`). Four props and one type are REMOVED, and every one of them is a
breaking removal a consumer must delete at the call site: under
`vueCompilerOptions.checkUnknownProps` (this library's own keystone) a retained attribute
is a hard error, so nothing here fails silently.

| removed at 8.0 | replacement |
| --- | --- |
| `material` (`SurfaceMaterial` = `"content" \| "elevated" \| "functional" \| "overlay"`) | `tier` — the four members were a bijection onto four of the five tiers under a second name, `wash` was unreachable through it, and `tier` beat it anyway. The `MATERIAL_TIERS` map is deleted with it |
| `shadow` | `<Card shadow>` — the flag survives only where it has a grammar. Surface no longer stamps `data-shadow`; a plate that wants a cast is a `<Card>`, or writes the shadow itself |
| `grain` | none — the decoration and its `data-grain` attribute are gone from the whole library |
| `specular` | none — it wrote `--glass-specular-intensity-rest` / `-hover` / `-active` (0.04 / 0.18 / 0.26) behind a `surface === "glass"` gate. Write those three custom properties on the element to get the `"full"` register back; the `v-specular` arming goes with the prop |

_Runtime + type exports on `./surface`_

| Classification | Symbol |
| --- | --- |
| removed at 8.0 | `SurfaceMaterial` (type), `SurfaceSpecular` (type) — both declared at 7.0.0, both dead with their props |
| retained | `Surface`, `SurfaceProps`, `SurfaceDecoration`, `SurfaceTier` |

## 7.0.0 (2026-07-17)

The packed public map changes from 82 to 74 export keys. It removes
`./color-swatch`, `./controls`, `./focus-scope`, `./icon-chip`, `./icon-tooltip`,
`./metric-badge`, `./metric-cell`, `./metric-stack`, `./motion-curves`,
`./notification`, and `./spa-view`, and adds `./dark-mode-toggle`, `./metric`, and
the Tailwind registration bridge `./styles/theme`. These are clean removals or
replacements, without aliases or compatibility shims.

`InstrumentChassis` is now one landmark-neutral physical sleeve on the explicit
`/instrument-chassis` subpath. It is no longer exported from the root.

_`.paper-texture` is removed_

6.0.0 is its last shipping version.

There is no successor class: the two surviving `@utility paper-*` recipes are not
drop-ins (`paper-grain-overlay` and `paper-underpaint` paint relief and tooth on an
`::after` or a fixed layer with `mix-blend-mode`, where `.paper-texture` painted in the
element's own box). Compose the four declarations yourself — every token they read still
ships:

```css
.paper-texture {
    background-image: var(--paper-grain-tooth);
    background-repeat: repeat;
    background-size: var(--paper-grain-tile);
    background-blend-mode: multiply;
}
:where(.dark) .paper-texture {
    background-blend-mode: screen;
}
```

That is the recipe as it last shipped, at 6.0.0. Through 4.0.0 the same class read
`var(--paper-clean-texture)` and `var(--paper-texture-size)` instead — the 200px
neutral glass whisper rather than the warm 140px paper tooth — and **both pairs of
tokens still ship at 9.0.0**, so either spelling reproduces itself. Pick by which one
your page actually looked like: the grain pair is the warm paper material, the clean
pair is the glass whisper.

| 6.x surface | 7.0 migration |
|---|---|
| `phase="ping|download|upload|jitter|complete"` | Map product phases locally to `state="ready|active|complete|loading"` and pass the consumer color through `tone`. |
| `variant="glass|spine|structure"` | Remove the variant. The component has one housing material. |
| `strip`, `dial`, `control` slots | Use `stage`, `inspector`, and `action` in that document order. |
| `ChassisDivider` | Use explicit `boundaries` on the sleeve for region grooves, or ordinary `Separator` outside it. |
| Fixed meter/dock reserve tokens | Own product viewport and content sizing locally; use the explicit `reserve` axis only for a present stage or inspector. |
| `FocusScope` / `@mkbabb/glass-ui/focus-scope` | Import `FocusScope` from `reka-ui` when building a custom focus boundary. Existing Glass overlays keep focus behavior internally. |
| `SpaView` / `SpaViewProps` / `@mkbabb/glass-ui/spa-view` | Compose Vue's `KeepAlive` and `Transition` in the concrete product shell that owns view identity and cache policy. |
| `Notification` / `@mkbabb/glass-ui/notification` | Use the retained `Toast` queue and presentation family. |
| `SplitChars` / `useCharStagger` | Render ordinary accessible text. Own product-specific grapheme treatment at that product boundary. |
| `ColorSwatch` / `@mkbabb/glass-ui/color-swatch` | Use a native color input in the owning form; Aurora's proportioned swatch is now demo-private. |
| `IconChip` / `@mkbabb/glass-ui/icon-chip` | Use `<Chip shape="icon">` with a slotted glyph for a meaningful static plate, or render the glyph directly when no plate is needed. The old icon, section, glyph-size, stroke, bare, duotone, bloom, saturated, glass, and reveal axes are deleted. |
| `IconTooltip` / `@mkbabb/glass-ui/icon-tooltip` | Compose the canonical Tooltip family (`@mkbabb/glass-ui/tooltip`): one `TooltipProvider` around the nearest real control group, a named native trigger, and a terse noninteractive `TooltipContent`. There is no icon-only tooltip wrapper (the §5.0.0 `icon-tooltip` block below carries the composition example). |
| standalone `Toggle`, `toggleVariants`, `ToggleVariants` | Use `ToggleGroupItem` inside `ToggleGroup`, or a native `<button aria-pressed>` for a standalone pressed command. The styling recipe is private to ToggleGroup. |
| `DockSection`, `DockSectionDescriptor`, `DockSectionKind` | Use ordinary named groups and `DockSeparator` inside `GlassDock`. |
| `DockStack`, `DockStackItem` | Compose the existing dropdown family with `DockControl` for a compact facet or layer menu. |
| `pagerWindow`, `PagerWindow` | Use `PagerDots` or `DeckPager`; their windowing math is an implementation detail. (These ship through v6.0.0 on `/pager-dots` and `/deck`; the branch internalizes them — a 7.0.0 member removal, not 6.0.0.) |
| `useGooMorph`, `MORPH_SIGNATURES`, `GooFilter`, `useMetaballRenderer` | Removed; no public successor. These goo/metaball facilities were showcase-only (private to the Deck story) — keep application motion at its owning presentation boundary and let `Blob` own its metaball paint internally. Covers `useGooMorph` (+ `GooBarbellRefs` / `UseGooMorphParams` / `UseGooMorphReturn`) and `MORPH_SIGNATURES` (+ `MorphSignature` / `MorphSignatureName` / `MorphVector`) off the root barrel and `/motion-core`, `GooFilter` off `/dock`, and `useMetaballRenderer` / `UseMetaballRendererOptions` off `/blob`. (All ship through v6.0.0 on those surfaces; the branch removes them — a 7.0.0 member removal, not 6.0.0.) |
| Implicit per-instance Dock `view-transition-name` | Pass a stable `viewTransitionName` only when the consumer owns a Dock shared-element route morph. Leave it unset for ordinary route transitions. |
| `Label required` | Use `requirement="required"`; use `requirement="optional"` for the optional annotation. Keep the native control’s `required` attribute as the semantic owner. |
| `avatarVariants`, `AvatarVariants` | Use `Avatar`’s typed `size` and `shape` props plus `AvatarSize` / `AvatarShape`. Identity is required through `label`, `labelledBy`, or `decorative`. |
| `menuItemVariants`, `MenuItemVariants` | Removed; no public replacement. `MenuItemVariants` was a `/command` re-export carried over from the 5.0.0 `/api` fold (present and importable at 5.0.0 and 6.0.0); the menu-row four-state treatment is now applied internally by the menu components (command / dropdown-menu / select / combobox) and is no longer an importable CVA. |
| `AvatarImage alt` | Name the identity once on `Avatar`; `AvatarImage` and fallback content are hidden from AT. |
| `Skeleton variant` / `surface` | Use the single decorative reserved-shape recipe. Put `aria-busy` and the loading name on the owning region. |
| `@mkbabb/glass-ui/controls` | Import `DarkModeToggle` from `@mkbabb/glass-ui/dark-mode-toggle`. The collective alias is removed. |
| `DarkModeToggle eclipse` | Remove the long-press mode. The component is one native pressed theme command. |
| `PaperBackdrop opacity` / `frequency` | Scope the shared paper variables at the owning route. `PaperBackdrop` only mounts the global content-field recipe. |
| `HeaderRibbon hideTimeoutMs` | Remove the prop. The band is persistent; there is no timed reveal. |
| `HeaderRibbon mode` / `anchorLabel` / `anchor` slot | Removed. `HeaderRibbon` is persistent-only: action rows render expanded from first paint. There is no `collapsible` mode, disclosure anchor, or reveal/pin gesture. |
| `HeaderRibbonMode` / `HeaderRibbonAnchorSlotProps` types | Removed with the collapsible contract. `HeaderRibbon` takes only `placement`, `ariaLabel`, and `class` (`HeaderRibbonProps` / `HeaderRibbonPlacement`). |
| `HeaderRibbon` `left` slot | Compose that content beside `HeaderRibbon`; its one public slot is `items`. |
| `CopyFailureReason` including `"exec-command"` | Remove legacy `execCommand` handling. Clipboard failures are now `"no-api"` or `"clipboard-api"`; use `useClipboard().status` and `invalidate()` for scoped feedback. |
| `useClipboard().copied` | Removed. Derive it as `status.value === "success"`; the composable now returns `{ status, copy, invalidate }`. |
| `copyToClipboard(text, { onCopyError })` | Removed. The stateless door is `writeClipboard(text): Promise<CopyResult>` — it returns `{ ok: true } \| { ok: false; reason }` instead of a `boolean`: read `ok`, and `reason` on failure. The old boolean+`onCopyError` signature is a consumer preset — keep a one-line adapter in your own util if you want it. |

Member-level removals from keys that otherwise survive at 7.0.0. An `exports` keyset diff
never surfaces these because the KEY still ships — only its member set shrinks. Grouped by
subpath, with a successor or `none`:

- `/motion-core` (these five also rode the root barrel): `usePrioritizedTask` / `postTaskSafe`
  → `useYieldToMain` / `yieldToMain`; `vScrollRevealOnce` → `vReveal`; `NavigateOptions` →
  `ViewTransitionOptions`; `navigate` → `startViewTransition`; `supportsRouteTransitions` →
  `supportsViewTransitions`. The `usePrioritizedTask` companion types go with it:
  `UsePrioritizedTaskReturn` → `UseYieldToMainReturn`; `PostTaskOptions` / `TaskPriority` → none
  (`yieldToMain` / `useYieldToMain` take no options and expose no priority enum).
- `/surface`: `surfaceClass` / `decorationClass` → none (the resolver is now the private
  `resolveSurfaceClass`; compose `<Surface>` and let it own the class).
- `/card`: `CardSurface` → `CardVariant` + the shared `Surface` axis (`/axes`).
  `CardVariant` is itself removed at 8.0 with the `variant` prop it enumerated (§8.0.0
  `./card` table), so coming from 6.x, go straight to the `surface` axis and `selected`.
  `CardSpecular` has no successor (`SurfaceSpecular` and the `specular` prop are both
  removed at 8.0): write `--glass-specular-intensity-rest` / `-hover` / `-active` on the
  element;
  `ScrollCardProps` / `ScrollCardHeaderProps` (+ the `ScrollCard` / `ScrollCardHeader`
  components) → the `ScrollCard` family is retired; compose `Card` inside a scroll container.
- `/command`: `MenuItemVariants` → none (the menu-row treatment is applied internally).
- `/button`: `ButtonVariants` → the typed `ButtonProps` / `ButtonEmphasis` / `ButtonSize`.
- `/toast`: `ToastType` → the `Toast` row types `ToastProps` / `ToastOptions`.
- `/drawer`: `DrawerClose` / `DrawerTrigger` → import `DialogClose` / `DialogTrigger` from
  `/dialog` (Drawer builds on the reka Dialog primitives; the aliases are gone).
- `/instrument-chassis`: `InstrumentChassisVariant` → none (one housing material; see the
  `variant=` row above).
- `/blob`: `BlobVariant` → none (the `"blob" | "meatball"` enum is retired; `BlobMerge`
  carries the smin-merge choice and the dressed-meatball look is a continuous config scalar).
- `/carousel`: `CarouselNext` / `CarouselPrevious` → build owner-local buttons from
  `useCarousel().scrollNext` / `scrollPrev` + `canScrollNext` / `canScrollPrev`.
- root `@mkbabb/glass-ui`: `METRIC_PLACEHOLDER` / `coalesceMetric` → none (metric coalescing is
  internal now; pass the `placeholder` prop on the `/metric` components). `MetricValue` /
  `MetricValueProps` are re-homed, not removed → import from `@mkbabb/glass-ui/metric`.

Method + completeness: the list above is the v6.0.0→branch member diff of every surviving
export key (each entry verified exported by that key's barrel at the `v6.0.0` tag and absent
from it on the branch). It is complete once you also count (a) the members that already carry a
dedicated per-prop row in the §7.0.0 table above — `avatarVariants` / `AvatarVariants`,
`toggleVariants` / `ToggleVariants`, `sliderVariants` / `SliderVariants`, `ChassisDivider`,
`InstrumentChassisPhase` → `InstrumentChassisState`, `PaperBackdropFrequency`, `DockSection*` /
`DockStack*`, `pagerWindow` / `PagerWindow`, `SplitChars` / `useCharStagger`, and the
goo/metaball facilities (`useGooMorph`, `GooBarbellRefs`, `UseGooMorphParams`, `UseGooMorphReturn`,
`MORPH_SIGNATURES`, `MorphSignature`, `MorphSignatureName`, `MorphVector`, `GooFilter`,
`useMetaballRenderer`, `UseMetaballRendererOptions` — all shipping through v6.0.0, removed at 7.0.0);
(b) the `## 5.0.0` `/api` per-symbol table, which marks each `/api` member with its removal version;
and (c) one family excluded here because its own mechanism section documents it — the ~67
`/motion` keyframes re-exports (`Easing`, `TimingFunction`, …; see the Motion-ownership paragraph
above). Whole-key drops are the export-map delta, not member removals.

The Dock fisheye enhancement and its deep `useDockFisheye` import are removed. Capped
control runs retain the measured native-scroll path and `scrollIntoView` recentering.

`GlassDock` gains an additive `interaction` axis (`DockInteraction = "auto" | "manual"`,
default `"auto"`). `"auto"` is today's behaviour byte-identical — the built-in FSM owns
posture. `"manual"` hands posture to the consumer: every internal environmental writer
(hover, focus, idle timer, outside-click, collapsed-tap, touch) is suppressed at both
poles and only `expand()`/`collapse()` write. In manual the consumer authors a focusable
disclosure in a never-inert slot (`#persistent`/`#collapsed`); glass does not auto-expand
on focus and provides no fallback. Resolved to `"auto"` on an always-expanded dock (that
pole is force-pinned). Additive — not a break; no alias, no shim. `alwaysExpanded` and
`startCollapsed` are unchanged.

`HeaderRibbon` retains the `/header-ribbon` subpath and the `placement="left|right"`
contract introduced in 5.0. It is persistent-only: the action row renders expanded and operable
from first paint, with no disclosure mode, anchor button, or reveal gesture. DOM/action order is
stable across placements; only visual direction changes, and the action row flows in RTL while
the band keeps its physical corner.

Wide stage/inspector composition uses `proportion="golden|preview-dominant"`; an
absent inspector leaves stage at 100%. Boundaries and reserve default to none.

`Slider` now owns its two visual recipes directly. Replace imports of
`sliderVariants` or `SliderVariants` with the typed `variant`/`size` props and the
`SliderVariant`, `SliderSize`, or `SliderProps` types from `/slider`; no styling
function remains. `invalid` adds the error boundary and `aria-invalid` to each thumb.

`Progress` adds typed `status="default|error"` and
`orientation="horizontal|vertical"` axes. Error preserves the current numeric value
and marks it invalid; it never reports completion. Both Progress and Slider keep their
paint and geometry in the owning component stylesheet. The unused
`.glass-progress-rail` utility is removed; set `--progress-size`, `--progress-track`,
and `--progress-fill` on `Progress` when a consumer needs a local rail treatment.

Motion ownership is now explicit. Replace keyframes primitives imported from
`@mkbabb/glass-ui/motion` with the same named imports from
`@mkbabb/keyframes.js`; `/motion` retains Glass-owned Vue composables and
`SPRING_PRESETS`. The `@mkbabb/glass-ui/motion-curves` entry and its `CurveFn`,
`MotionCurve`, `MotionCurveKind`, `MOTION_CURVES`, `MOTION_CURVES_CANONICAL`, and
`motionCurve` exports are removed. Import callable easing math directly from
`@mkbabb/value.js/easing`; CSS easing aliases intentionally have no JavaScript mirror.
`useSpringPress` is also removed from `/motion`; use `useLiquidPress`, whose
`squish: false` option supplies the same uniform press register while retaining the complete
pointer, keyboard, disabled, and re-entry lifecycle.

The 7.0 package line declares `@mkbabb/value.js@^4.0.0` as an OPTIONAL peer — required
for the `/color` and `/css` consumers, absent otherwise — alongside optional
`@mkbabb/pencil-boil@^0.9.2`; its Keyframes range is finalized from the immutable
packed compatibility check. That describes 7.0 only: from 9.0.0 `@mkbabb/pencil-boil` is
not a peer of any kind, and HandMark needs no install. Glass imports only Value's `/color`, `/css`, and
`/easing` capabilities; the removed Value root has no compatibility external.
`perfect-freehand` is no longer a peer; from 9.0.0 HandMark inks its own ribbon and
carries no copy of it either. The
obsolete shadcn generator metadata is removed.

`EasingPicker` now uses the canonical CSS jump terms `jump-start`, `jump-end`,
`jump-none`, and `jump-both`. Replace the former `start`, `end`, `none`, and `both`
values; the default is `jump-end`, and no spelling aliases remain.

Import `@mkbabb/glass-ui/styles/fonts` when the packaged Plus Jakarta Sans and Fira
Code faces are desired. That stylesheet embeds its WOFF2 payload; raw built faces
remain addressable through `@mkbabb/glass-ui/fonts/*`.

Import `@mkbabb/glass-ui/styles/theme` to register the package's Tailwind v4
`@theme` aliases and class-based dark variant without the component cascade. This
entry is a registration bridge over the owning token variables, not a standalone
resolved base-token stylesheet.

The glass blur ladder is recalibrated ~15% subtler on every rung:
quiet/resting `8→7`, floating/overlay `13→11`, the high-DPI (2dppx) overlay
restore `20→17`, the native `::backdrop` scrim `8→7`, the immersive stage scrim
`16→14`, and the side-sheet graded field `40→34`. No API or token-name change —
primitive values only; every composed `--glass-blur-*` and the dark arm re-bake
off the recalibrated primitives. The sub-perceptual wash floor (1px) and the
opt-in deep ceiling (16px) are held. A consumer with a preset that compensated
for the heavier blur (a raised `--glass-opacity-*` to fight bleed-through, or a
panel remapped onto the overlay rung) should re-verify legibility on adopting 7.0.

`--radius-dialog` now binds `var(--radius-card)` (was `var(--radius-2xl)`) — one
source, so the dialog corner cannot drift from the card. This is value-invariant
in every shipped config and repaints nothing; a consumer that re-pins
`--radius-card` now moves the dialog corner with it.

## 6.0.0

6.0.0 removes public wrappers and aliases whose lifecycle belongs to their parent,
and adds explicit interaction and renderer-status seams. `CompletionSeal`, `Deck`, `Dock`,
and `HandMark` remain public. The package export-map delta is exactly the removal of
`./stacked-icons`; all other 5.0.0 export keys, including `./scroll-progress-rim`, remain.

### Clean breaks

| 5.x consumer surface | 6.0 migration |
|---|---|
| Root `<Section>` | Render a semantic `<section>` and compose `Card`, `PaperBackdrop`, or `InstrumentChassis` only when that surface is needed. |
| `GlassCarouselPager` | Compose the retained carousel controls/pager primitives at the carousel owner. |
| `DialogScrollContent` | Use `DialogContent`; it owns scrolling. |
| `ComboboxCancel`, `ComboboxSeparator`, `ComboboxViewport` | Compose the retained Combobox root/input/content/item surface; these members are internal. |
| `DataTablePagination` | Use `DataTable`'s controlled `page`, `pageSize`, `total`, and `pagination` surface. |
| `DrawerOverlay`, `DrawerPortal` | Use `DrawerContent`; it owns one overlay and portal boundary. |
| `DropdownMenuPortal` | Use `DropdownMenuContent`; it owns the portal boundary. |
| `ProgressDefault`, `ProgressGradient`, `ProgressLiquid` | Use `<Progress variant="default\|liquid">`. The `gradient` variant is deleted at 8.0 with its three `--motion-duration-progress-*` tokens and its `@property --progress-crescendo`. |
| `ProgressSectioned`, `useProgressGeometry`, `ProgressSegment`, `SectionedCell`, or `<Progress variant="sectioned">` | Use numeric `marks` on continuous Progress for reference checkpoints; own colored lifecycle phases in the product composition. |
| `SelectScrollUpButton`, `SelectScrollDownButton` | Use `SelectContent`; overflow controls are internal. |
| `ConstellationExpose.backend()` | Read the exposed `rendererStatus` ref or `@renderer-status`; Constellation now reports `engine: "canvas2d"`. |
| `parseColorRGBA` from `/constellation` | Resolve paint in the consumer or use the component's palette input; the renderer-local parser is no longer public. |
| `<Blob @click>` relying on the implicit hit layer | Add `press-label="…"` to opt into the SDF-shaped native button. Omit it for a decorative, listener-free Blob; use `disabled` to disable the button. |
| `installDeckSpring`, `deckEase`, `DECK_SPRING` | Keep `useDeck` for deck state/navigation and own presentation motion at the presentation boundary. |
| `useGooMorph`, `MORPH_SIGNATURES`, `GooFilter` | At 6.0.0 these goo/metaball facilities still ship and still work — no change is required at this cut. They fold out of the public surface at 7.0.0; keep application motion at its owning presentation boundary and migrate then, see `## 7.0.0`. |
| `<TypewriterText interactive>` / `backspaceToPosition()` | Remove the hidden per-glyph action; render a named native button for an editing command. |
| `IconChip` / `@mkbabb/glass-ui/icon-chip` | At 6.0.0 `./icon-chip` still ships and still works — no change is required at this cut. `IconChip` folds onto `<Chip shape="icon">` (or a bare glyph) at 7.0.0 — migrate then, see `## 7.0.0`. |
| `MetricBadge`, `/metric-badge`, `/metric-cell`, `/metric-stack` | At 6.0.0 these three subpaths still ship and still work — no change is required at this cut. The consolidation into one `/metric` subpath (`Metric`, `MetricCell`, `MetricRow`, `MetricStack`; keep phase, aura, protagonist, result animation, and fixed-row layout in the product composition) happens at 7.0.0 — migrate then, see `## 7.0.0`. |
| `InkMark` | Rename to `HandMark` from `@mkbabb/glass-ui/handmark`. |
| `StackedIconGroup` / `@mkbabb/glass-ui/stacked-icons` | Render ordinary owner-local DOM with explicit names, overflow, and detail controls. |

### Additive and corrected surfaces

- `Progress` and `Slider` accept decorative numeric `marks` in their existing value
  domains. Marks never snap or alter the model. Continuous Progress now derives paint and
  lifecycle from `modelValue / max`, so arbitrary maxima such as `0.5 / 1` paint truthfully.
- `SegmentedTabs` accepts `semantics?: "toggle" | "tabs"` independently of visual
  `variant`. `ariaLabel` reaches both the desktop strip and responsive Select; tab
  semantics publish `aria-orientation` and retain roving tabindex. Consumers can remove
  local orientation/role workarounds.
- `ScrollProgressRim` remains the focused public successor on
  `@mkbabb/glass-ui/scroll-progress-rim`. It accepts aggregate `value`/`max`, optional
  `segments`, and `coverage`; the broad `BorderProgress` API remains retired.
- Aurora, Blob, Constellation, FourierField, and LiquidGrid expose and emit
  `rendererStatus` with `{ phase, engine, adapter, error? }`. Capability fallback may
  change `engine`; shader/pipeline failures remain attributed to the backend that failed.
- FuzzySearch now emits ordinary escaped `<mark>` elements. Remove assumptions about
  bundled `::highlight(glass-search-mark)` / `::highlight(glass-mark)` paint. Code using
  `useTextHighlight` must continue to provide its own Custom Highlight CSS. The empty
  `styles/utilities/animate.css` file/import is removed.
- Windowed `DataTable` consumers can put `role="grid"`, `ariaLabel`, and `ariaColCount`
  on the native table and pass `ariaRowCount`, `getRowAttrs`, `rowRef`, and
  `tabbableRowId`; `DataTableRowAttrs` and `DataTableRowRef` are exported from the same
  subpath. `aria-rowcount` and caller-supplied `aria-rowindex` remain table-only, while
  responsive cards retain generic attributes, mounted-row refs, and the sole tab stop.
  Grid headers use `aria-rowindex="1"`; the empty placeholder is presentational.
- ~~Install `@mkbabb/pencil-boil@^0.9.2` when using HandMark. Glass development and the
  release build pin `0.9.2`; `catmullRomToBezier`, `ellipsePoints`, `perturbPoints`,
  `perturbPointsClosed`, `pointsToLinear`, `wobbleLinePoints`, and `useLineBoil` are the
  exercised producer surface. Pencil 0.9.2 declares Node 24/npm 11; the optional peer may
  be omitted by Glass consumers that do not use HandMark.~~ From 9.0.0
  `@mkbabb/pencil-boil` is no longer a peer of any kind. **HandMark needs no install**:
  `/handmark` is self-contained.

## 5.0.0

5.0.0 joins a visual redesign (the warm, weighty, liquid look) with a structural
reshape of the package. **5.0.0 dropped 20 export keys** — the `./api` discovery-subpath fold plus 19 component and
style subpaths. The authoritative enumeration is the 20-key removed-key table in
`CHANGELOG.md` `## 5.0.0` (`### Breaking`); the per-key migration for each dropped subpath
lives in this section's own subsections below. The `./api` fold is the largest single piece:
its 203 canonical symbols re-home onto their owning published subpath or retire with their
subpath (the per-symbol table below is complete).
Beyond the dropped keys, the remaining rows are a token rename (`--ring` →
`--focus-ring-color`), one component/subpath rename (`goo-blob` → `blob`), and the
source-only `src/subpaths/` deletion + curated flat-barrel relocations (no export break).
The visual redesign is a paint upgrade — no public-prop break beyond the rows below.

### The `/api` discovery-subpath fold — all 203 symbols

`@mkbabb/glass-ui/api` (the pure types + constants discovery layer) is FOLD-DELETED — one
of the 20 keys 5.0.0 dropped (the removed-key table in `CHANGELOG.md` `## 5.0.0`). Its 203 canonical symbols (the v4.2.0 `/api` export set) resolve as
follows: 141 re-home onto their OWNING published subpath and were still exported there at
7.0.0 — a consumer swaps the import PATH with zero symbol loss; the other 62 were
retired or renamed across 5.0.0, 6.0.0, and 7.0.0 and have no surviving import under their
old name (the table below gives each one's home or removal version):

```ts
// 5.0.0 — the /api discovery layer is gone; import each symbol from its owning subpath
- import type { AuroraConfig, BadgeVariants } from "@mkbabb/glass-ui/api";
+ import type { AuroraConfig } from "@mkbabb/glass-ui/aurora";
+ import type { BadgeVariants } from "@mkbabb/glass-ui/badge";
```

Of the 203 symbols, 141 remained exported on a public subpath at 7.0.0 (the fold is a
pure import-path swap — the owning subpath needs no new export for a surviving symbol) and 62
were retired or renamed since: 31 at 5.0.0 (the deleted viz types, the `/virtual` and
`/border-progress` types with no owning subpath, the `glass-panel` / `sheet` / `toggle-chip`
retirements, the dead-composable sweep of `Haptic*` / `CelebrationBurst*`,
and the `PaperGrid*` → `LiquidGrid*` / `SelectableChipVariants` → `ChipVariants` /
`HeaderRibbonPosition` → `HeaderRibbonPlacement` renames), 2 at 6.0.0 (`StackedIconGroupProps`
and the `Countup` return-alias), and 29 at 7.0.0 (the metric-badge / icon-chip /
spa-view / motion-curves consolidations, `PagerWindow`, plus the member-level CVA removals —
`AvatarVariants`, `ToggleVariants`, `SliderVariants`, `ButtonVariants`, and `MenuItemVariants`;
see `## 7.0.0`).
The retired viz, `/virtual`, and `/border-progress` families are detailed in their own
subsections below.

The surface-axis grammar types (`Surface` / `SurfaceTier`) publish via the dedicated `/axes`
grammar subpath (the `/api` successor for those types), and both are still exported
there. The `components/_shared` `ControlSize` convenience union re-homed to `/forms` at
5.0.0; `./forms` split at 8.0.0, and `ControlSize` is exported from `/input`.
Of the three root-barrel `*Variants` types, only
`AlertVariants` still resolves off the root `@mkbabb/glass-ui` barrel — `AvatarVariants` and
`ToggleVariants` were removed at 7.0.0 (the table marks each). value.js's consumed specifiers
ride the per-family subpaths named in the table below, so the compound-import unbuildable class
cannot recur.

The full 203-symbol `/api` table (grouped alphabetically by symbol; `kind` is the TS export
kind; the last column is the symbol's home at 7.0.0, or its removal version). Rows whose
name or named successor has left since carry that removal too:

| symbol | kind | home — or removal version |
|---|---|---|
| `AlertVariants` | type | `@mkbabb/glass-ui` (root) |
| `AnimatedDigitMode` | type | ~~`/animated-digit`~~ removed 8.0.0 — `./animated-digit` retired; no successor (see _Deleted — `AnimatedDigit`_ under 8.0.0) |
| `AnimatedDigitProps` | type | ~~`/animated-digit`~~ removed 8.0.0 — `./animated-digit` retired; no successor (see _Deleted — `AnimatedDigit`_ under 8.0.0) |
| `AuroraAtoms` | type | `/aurora` |
| `AuroraConfig` | type | `/aurora` |
| `AuroraCursorApi` | type | `/aurora` |
| `AuroraFlow` | type | `/aurora` |
| `AuroraHarmony` | type | `/aurora` |
| `AuroraHuePath` | type | `/aurora` |
| `AuroraInstance` | type | `/aurora` |
| `AuroraInteractivity` | type | `/aurora` |
| `AuroraInteractivityAtom` | type | `/aurora` |
| `AuroraMedium` | type | `/aurora` |
| `AuroraMediumAtom` | type | `/aurora` |
| `AuroraMotionAtom` | type | `/aurora` |
| `AuroraNucleus` | type | `/aurora` |
| `AuroraRuntimeMode` | type | `/aurora` |
| `AuroraRuntimeOptions` | type | `/aurora` |
| `AuroraZoneArrangement` | type | `/aurora` |
| `AuroraZones` | type | `/aurora` |
| `AvatarVariants` | type | removed 7.0.0 — use `Avatar` typed `size`/`shape` props + `AvatarSize`/`AvatarShape` (root) |
| `BadgeVariants` | type | `/badge` |
| `BezierPoints` | type | `/easing` |
| `BlendMode` | type | ~~`/handmark`~~ removed 9.0.0 — no successor (see _Eight `./handmark` types leave with the barrel's reshape_ under 9.0.0) |
| `BloomUpPreset` | type | ~~`/motion`~~ removed 8.0.0 — `useBloomUp` deleted; no successor |
| `BorderProgressCoverage` | type | removed 5.0.0 — /border-progress retired; the masked band is `ScrollProgressRim` (/scroll-progress-rim) |
| `BorderProgressMilestone` | type | removed 5.0.0 — /border-progress retired; see `ScrollProgressRim` (/scroll-progress-rim) |
| `BorderProgressMilestoneEvent` | type | removed 5.0.0 — /border-progress retired; see `ScrollProgressRim` (/scroll-progress-rim) |
| `BorderProgressProps` | type | removed 5.0.0 — /border-progress retired; see `ScrollProgressRim` (/scroll-progress-rim) |
| `Brush` | type | ~~`/handmark`~~ removed 9.0.0 — no successor (see _Eight `./handmark` types leave with the barrel's reshape_ under 9.0.0) |
| `BrushName` | type | ~~`/handmark`~~ removed 9.0.0 — no successor (see _Eight `./handmark` types leave with the barrel's reshape_ under 9.0.0) |
| `ButtonVariants` | type | removed 7.0.0 — use `ButtonProps` / `ButtonEmphasis` / `ButtonSize` (/button) |
| `Canvas2DFrame` | type | ~~`/canvas`~~ root barrel (`./canvas` removed at 9.0.0; the name never moved) |
| `Canvas2DHandle` | type | ~~`/canvas`~~ root barrel |
| `Canvas2DOptions` | type | ~~`/canvas`~~ root barrel |
| `Canvas2DSuspendReason` | type | ~~`/canvas`~~ root barrel |
| `CardMetal` | type | removed 8.0.0 — the `metal` prop dies; the three `metal-{gold,silver,bronze}-border` utilities survive class-borne and a class name needs no union |
| `CardSurface` | type | removed 7.0.0 — Card decoration folds onto `CardVariant` (/card) + the `Surface` axis (/axes) (`CardVariant` itself left at 8.0.0 (see _Props — `<Card>`_ under 8.0.0); the `Surface` axis (/axes) stands) |
| `CardTier` | type | removed 8.0.0 from `/card` — already folded onto the shared `surface` axis at 5.0.0; use `SurfaceProps["tier"]` / `SurfaceTier` (/axes) |
| `CardVariant` | type | removed 8.0.0 — the `variant` trio is the one `selected` boolean (presence, not truth) |
| `CelebrationBurstPreset` | type | removed 5.0.0 — dead-composable sweep; `useCelebrationBurst` retired (0 consumers) |
| `ClickDelegateOptions` | type | `/sidebar` |
| `ColorHarmony` | type | `/color` (`deriveHue`'s second argument, and `DeriveBlobPaletteOptions.harmony`) |
| `ColorResolver` | type | ~~`/color`~~ removed 10.0.0 with `defaultBlobColorResolver` (see _Two names leave `./color`_ under 10.0.0) |
| `CompletionSealProps` | type | ~~`/completion-seal`~~ removed 8.0.0 — `./completion-seal` retired; no successor (see _Deleted — `CompletionSeal`_ under 8.0.0) |
| `CompletionSealShape` | type | ~~`/completion-seal`~~ removed 8.0.0 — `./completion-seal` retired; no successor (see _Deleted — `CompletionSeal`_ under 8.0.0) |
| `ConcentricConfig` | type | removed 5.0.0 — /concentric viz DELETED (viz-family prune) |
| `ConcentricHandle` | type | removed 5.0.0 — /concentric viz DELETED |
| `ConfiguratorCloneMode` | type | `/configurator` |
| `ConfiguratorPreset` | type | `/configurator` |
| `ConfiguratorScrollMode` | type | `/configurator` |
| `ConfiguratorState` | type | `/configurator` |
| `ConfiguratorStateOptions` | type | `/configurator` |
| `ConstellationField` | type | `/constellation` |
| `ConstellationProps` | type | `/constellation` |
| `ConstellationWarp` | type | `/constellation` |
| `ControlSize` | type | ~~`/forms`~~ `/input` (`./forms` split at 8.0.0; see _Package subpaths_ under 8.0.0) |
| `Countup` | type | removed 6.0.0 — the return-type alias dropped; use `UseCountupReturn` (/motion) (`UseCountupReturn` itself left at 8.0.0 (see _Six composables leave `./motion`, `./motion-core` and the root barrel_ under 8.0.0); the number tween is `useAnimatedNumber` (/motion)) |
| `CurveFn` | type | removed 7.0.0 — /motion-curves retired; import easing math from `@mkbabb/value.js/easing` |
| `DarkFlipSettledCallback` | type | `/dark` |
| `DarkModeSyncScriptOptions` | type | `/dark` |
| `DeckCore` | type | `/deck` |
| `DeckMoves` | type | `/deck` |
| `DEFAULT_AURORA_CONFIG` | const | `/aurora` |
| `DeriveAuroraOptions` | type | `/aurora` |
| `DeriveBlobPaletteOptions` | type | `/color` (the options bag of `deriveBlobPalette`) |
| `DeriveEasing` | type | `/aurora` |
| `DockCtaReceivePreset` | type | `/motion` |
| `DotFlowFieldHandle` | type | removed 5.0.0 — /dot-flow-field viz DELETED |
| `DragMorphAxis` | type | `/motion` |
| `DragMorphSnapTarget` | type | `/motion` |
| `Easing` | type | removed 7.0.0 — import from `@mkbabb/keyframes.js`; /motion no longer re-exports kf primitives |
| `EasingFn` | type | `/easing` |
| `EasingPickerMode` | type | `/easing` |
| `EasingPickerValue` | type | `/easing` |
| `FlatSection` | type | removed 5.0.0 — /virtual subpath retired; no owning subpath |
| `FlowFieldConfig` | type | removed 5.0.0 — /dot-flow-field viz DELETED |
| `FlowPattern` | type | `/aurora` |
| `ForcedSectionWindowRange` | type | removed 5.0.0 — /virtual subpath retired; no owning subpath |
| `FourierFieldConfig` | type | `/fourier-field` |
| `FourierFieldProps` | type | ~~`/fourier-field`~~ never exported from anywhere; this row was wrong when it was written |
| `FuzzySearchState` | type | ~~`/search`~~ removed 9.0.0 (the whole `./search` subpath left; nothing replaced it) |
| `GlassPanelProps` | type | removed 5.0.0 — /glass-panel retired; compose `Card` / `Surface` / `.glass-resting` |
| `GlassPanelVariant` | type | removed 5.0.0 — /glass-panel retired; the tier-homonym; use `CardTier` (/card) or `SurfaceTier` (/axes) (`CardTier` itself left at 8.0.0 (see _Props — `<Card>`_ under 8.0.0); `SurfaceTier` (/axes) stands) |
| `HandAnimation` | type | ~~`/handmark`~~ removed 9.0.0 — no successor (see _Eight `./handmark` types leave with the barrel's reshape_ under 9.0.0) |
| `HandMarkProps` | type | ~~`/handmark`~~ removed 9.0.0 — no successor (see _Eight `./handmark` types leave with the barrel's reshape_ under 9.0.0) |
| `HandShape` | type | `/handmark` |
| `HapticPattern` | type | removed 5.0.0 — dead-composable sweep; `useHaptic` retired |
| `HeaderRibbonPosition` | type | removed 5.0.0 — renamed → `HeaderRibbonPlacement` (/header-ribbon) (`HeaderRibbonPlacement` left with `./header-ribbon` at 8.0.0 (see _Deleted — `HeaderRibbon`_ under 8.0.0); no successor) |
| `HeaderRibbonProps` | type | ~~`/header-ribbon`~~ removed 8.0.0 — `./header-ribbon` retired; no successor (see _Deleted — `HeaderRibbon`_ under 8.0.0) |
| `HighlightMatcher` | type | ~~`/motion-core`~~ removed 8.0.0 — `useTextHighlight` deleted; no successor |
| `IconChipIcon` | type | removed 7.0.0 — /icon-chip retired; use `<Chip shape="icon">` (/chip) |
| `IconChipProps` | type | removed 7.0.0 — /icon-chip retired; use `<Chip shape="icon">` (/chip) |
| `IconChipSection` | type | removed 7.0.0 — /icon-chip retired; use `<Chip shape="icon">` (/chip) |
| `IconChipTone` | type | removed 7.0.0 — /icon-chip retired; use `<Chip shape="icon">` (/chip) |
| `InkPath` | type | ~~`/handmark`~~ removed 9.0.0 — no successor (see _Eight `./handmark` types leave with the barrel's reshape_ under 9.0.0) |
| `InstrumentChassisPhase` | type | removed 7.0.0 — phase → state; use `InstrumentChassisState` (/instrument-chassis) (`InstrumentChassisState` left with `./instrument-chassis` at 8.0.0 (see _Deleted — `InstrumentChassis`_ under 8.0.0); no successor) |
| `JumpTerm` | type | `/easing` |
| `LazyLoaderOptions` | type | `/sidebar` |
| `LiquidRevealPreset` | type | `/motion` |
| `MarkBox` | type | ~~`/handmark`~~ removed 9.0.0 — no successor (see _Eight `./handmark` types leave with the barrel's reshape_ under 9.0.0) |
| `MAX_NUCLEI` | const | `/aurora` |
| `MAX_STOPS` | const | `/aurora` |
| `MenuItemVariants` | type | removed 7.0.0 — no public replacement; the menu-row treatment is applied internally by the menu components (was /command) |
| `MetricBadgeLabelPosition` | type | removed 7.0.0 — /metric-badge folded into /metric |
| `MetricBadgeProps` | type | removed 7.0.0 — /metric-badge folded into /metric; compose `Metric` in `./badge` |
| `MetricBadgeSize` | type | removed 7.0.0 — /metric-badge folded into /metric; use `MetricSize` (/metric) |
| `MetricCellAppearance` | type | removed 7.0.0 — /metric-cell consolidated into /metric; `MetricCell` itself is removed at 8.0.0, so the destination is `Metric` (/metric) |
| `MetricCellProps` | type | removed 8.0.0 — `MetricCell` folds into the one `Metric` atom; use `MetricProps` (/metric) and set `posture="cell"` |
| `MetricRowProps` | type | `/metric` |
| `MetricStackProps` | type | `/metric` |
| `MotionCurve` | type | removed 7.0.0 — /motion-curves retired; import easing math from `@mkbabb/value.js/easing` |
| `MotionCurveKind` | type | removed 7.0.0 — /motion-curves retired; import easing math from `@mkbabb/value.js/easing` |
| `NavigateOptions` | type | removed 7.0.0 — use `ViewTransitionOptions` (/motion-core) |
| `OklchStop` | type | `/aurora` |
| `PagerDotsProps` | type | `/pager-dots` |
| `PagerWindow` | type | removed 7.0.0 — windowing math internalized; use `PagerDots` / `DeckPager` (`DeckPager` itself left at 8.0.0; `PagerDots` (/pager-dots) stands) |
| `PAPER_WASH_GROUND` | const | `/aurora` |
| `PaperBackdropFrequency` | type | removed 7.0.0 — scope the shared paper variables at the owning route |
| `PaperBackdropProps` | type | ~~`/paper-backdrop`~~ removed 8.0.0 — `./paper-backdrop` retired; no successor (see _Deleted — `PaperBackdrop`_ under 8.0.0) |
| `PaperGridConfig` | type | removed 5.0.0 — renamed → `LiquidGridConfig` (/liquid-grid) (`LiquidGridConfig` left with `./liquid-grid` at 8.0.0 (see _Deleted — `LiquidGrid`_ under 8.0.0); no successor) |
| `PaperGridHandle` | type | removed 5.0.0 — renamed → `LiquidGridHandle` (/liquid-grid) (`LiquidGridHandle` left with `./liquid-grid` at 8.0.0 (see _Deleted — `LiquidGrid`_ under 8.0.0); no successor) |
| `PointerVec2` | type | `/motion-core` |
| `ScrollCardHeaderProps` | type | removed 7.0.0 — ScrollCard family retired; compose `Card` within a scroll container |
| `ScrollCardProps` | type | removed 7.0.0 — ScrollCard family retired; compose `Card` within a scroll container |
| `ScrollToOptions` | type | `/sidebar` |
| `ScrollTrackerOptions` | type | `/sidebar` |
| `SearchableItem` | type | ~~`/search`~~ removed 9.0.0 (the whole `./search` subpath left; nothing replaced it) |
| `SearchIndex` | type | ~~`/search`~~ removed 9.0.0 (the whole `./search` subpath left; nothing replaced it) |
| `SearchResult` | type | ~~`/search`~~ removed 9.0.0 (the whole `./search` subpath left; nothing replaced it) |
| `SearchVariant` | type | ~~`/search`~~ removed 9.0.0 (the whole `./search` subpath left; nothing replaced it) |
| `SearchVariants` | type | ~~`/search`~~ removed 9.0.0 (the whole `./search` subpath left; nothing replaced it) |
| `SectionLayout` | type | removed 5.0.0 — /virtual subpath retired; no owning subpath |
| `SectionWindowRange` | type | removed 5.0.0 — /virtual subpath retired; no owning subpath |
| `SegmentedTabOption` | type | `/tabs` |
| `SegmentedTabsOrientation` | type | `/tabs` |
| `SegmentedTabsProps` | type | `/tabs` |
| `SegmentedTabsVariant` | type | `/tabs` |
| `SelectableChipVariants` | type | removed 5.0.0 — renamed → `ChipVariants` (/chip) |
| `SheetVariants` | type | removed 5.0.0 — /sheet folded onto `<DialogContent placement>` (/dialog) |
| `SidebarIndexEntry` | type | `/sidebar` |
| `SidebarSection` | type | `/sidebar` |
| `SidebarState` | type | `/sidebar` |
| `SliderVariants` | type | removed 7.0.0 — use `Slider` `variant`/`size` props + `SliderVariant`/`SliderSize` (/slider) |
| `SpaViewProps` | type | removed 7.0.0 — /spa-view retired; compose Vue `KeepAlive` + `Transition` |
| `SpringPresetName` | type | `/motion` |
| `SpringPresetRow` | type | `/motion` |
| `StackedIconGroupProps` | type | removed 6.0.0 — /stacked-icons retired; render owner-local DOM |
| `StrokeMode` | type | `/aurora` |
| `StrokeOrient` | type | `/aurora` |
| `Surface` | type | `/axes` |
| `TaperSpec` | type | ~~`/handmark`~~ removed 9.0.0 — no successor (see _Eight `./handmark` types leave with the barrel's reshape_ under 9.0.0) |
| `TimelineSegment` | type | `/timeline` |
| `TimelineSegmentGradient` | type | removed 8.0.0 — the per-segment gradient dialect died with the segmented variant; a span's paint is its `accent` (/timeline) |
| `TimelineSegmentState` | type | `/timeline` |
| `TimingFunction` | type | removed 7.0.0 — import from `@mkbabb/keyframes.js`; /motion no longer re-exports kf primitives |
| `ToastType` | type | removed 7.0.0 — use the `Toast` row types on /toast (`ToastProps` / `ToastOptions`) |
| `ToastVariant` | type | removed 5.0.0 — the tone vocabulary replaces `variant`; use `Tone` (/axes) |
| `ToggleChipVariants` | type | removed 5.0.0 — /toggle-chip folded onto `<Chip>` (/chip) |
| `ToggleVariants` | type | removed 7.0.0 — use `ToggleGroupItem` inside `ToggleGroup`; the recipe is private (/toggle-group) |
| `TreeIndexEntry` | type | `/sidebar` |
| `TreeNode` | type | `/sidebar` |
| `TriggerPoint` | type | `/motion-core` |
| `UseAccentToneOptions` | type | `/color` |
| `UseAccentToneReturn` | type | `/color` |
| `UseBloomUpOptions` | type | ~~`/motion`~~ removed 8.0.0 — `useBloomUp` deleted; no successor |
| `UseBloomUpReturn` | type | ~~`/motion`~~ removed 8.0.0 — `useBloomUp` deleted; no successor |
| `UseCelebrationBurstOptions` | type | removed 5.0.0 — dead-composable sweep; `useCelebrationBurst` retired |
| `UseCelebrationBurstReturn` | type | removed 5.0.0 — dead-composable sweep; `useCelebrationBurst` retired |
| `UseCharStaggerOptions` | type | removed 7.0.0 — `useCharStagger` / `SplitChars` retired; render ordinary accessible text |
| `UseCharStaggerReturn` | type | removed 7.0.0 — `useCharStagger` / `SplitChars` retired; render ordinary accessible text |
| `UseClipboardOptions` | type | `/dom` |
| `UseClipboardReturn` | type | `/dom` |
| `UseConcentricOptions` | type | removed 5.0.0 — /concentric viz DELETED |
| `UseCountupOptions` | type | ~~`/motion`~~ removed 8.0.0 — `useCountup` deleted; the number tween is `useAnimatedNumber` (/motion) |
| `UseDockCtaReceiveOptions` | type | `/motion` |
| `UseDockCtaReceiveReturn` | type | `/motion` |
| `UseDockSearchOptions` | type | `/dock` |
| `UseDockSearchReturn` | type | `/dock` |
| `UseDockStateReturn` | type | `/dock` |
| `UseDotFlowFieldOptions` | type | removed 5.0.0 — /dot-flow-field viz DELETED |
| `UseDragMorphParams` | type | `/motion` |
| `UseDragMorphReturn` | type | `/motion` |
| `UseEasingPickerOptions` | type | `/easing` |
| `UseEasingPickerReturn` | type | `/easing` |
| `UseFuzzySearchOptions` | type | ~~`/search`~~ removed 9.0.0 (the whole `./search` subpath left; nothing replaced it) |
| `UseGlobalDarkOptions` | type | `/dark` |
| `UseGlobalDarkReturn` | type | `/dark` |
| `UseHapticOptions` | type | removed 5.0.0 — dead-composable sweep; `useHaptic` retired |
| `UseHapticReturn` | type | removed 5.0.0 — dead-composable sweep; `useHaptic` retired |
| `UseLiquidRevealOptions` | type | `/motion` |
| `UseLiquidRevealReturn` | type | `/motion` |
| `UsePaperGridOptions` | type | removed 5.0.0 — renamed → `UseLiquidGridOptions` (/liquid-grid) (`UseLiquidGridOptions` left with `./liquid-grid` at 8.0.0 (see _Deleted — `LiquidGrid`_ under 8.0.0); no successor) |
| `UsePointerVelocityField` | type | `/motion-core` |
| `UsePointerVelocityFieldOptions` | type | `/motion-core` |
| `UseScrollChromeOptions` | type | `/motion-core` |
| `UseScrollChromeReturn` | type | `/motion-core` |
| `UseScrollTriggerOptions` | type | `/motion-core` |
| `UseScrollTriggerReturn` | type | `/motion-core` |
| `UseTextHighlightControls` | type | ~~`/motion-core`~~ removed 8.0.0 — `useTextHighlight` deleted; no successor |
| `UseUserInvalidAriaOptions` | type | `/dom` |
| `UseUserInvalidAriaReturn` | type | `/dom` |
| `ViewTransitionOptions` | type | `/motion-core` |
| `ViewTransitionResult` | type | `/motion-core` |
| `WarpMode` | type | `/aurora` |
| `WaveComponent` | type | removed 5.0.0 — /dot-flow-field viz DELETED |

### `--ring` → `--focus-ring-color` (focus-ring token rename)

The focus-ring color token `--ring` is renamed `--focus-ring-color` (clean break, no
alias). It reads the focus register the `--focus-ring-shadow` utility composes (the
token-first focus axis). MIGRATE: rename every `--ring` reference to `--focus-ring-color`
at each declaration/read site. A consumer that cannot re-point in one pass reads it
fallback-first for the transition window — `var(--focus-ring-color, var(--ring))` — then
drops the `var(--ring)` fallback once its own tree is renamed (the fallback is a consumer
convenience, NOT a library alias: glass-ui ships only `--focus-ring-color`).

### `goo-blob` → `blob` (component + subpath rename)

`<GooBlob>` renames to `<Blob>` and the `@mkbabb/glass-ui/goo-blob` subpath renames to
`@mkbabb/glass-ui/blob` (clean break, no alias; a full rename). The
types + scoped CSS seams rename in lockstep; the config registry keys
`BLOB_CONFIG_KEY` / `BLOB_CONFIG_DEFAULTS` already carried the `BLOB` prefix (stable, no
change). MIGRATE (one-line rename per call site):

```ts
- import { GooBlob } from "@mkbabb/glass-ui/goo-blob";
+ import { Blob } from "@mkbabb/glass-ui/blob";
```

`<GooBlob …>` → `<Blob …>`; the prop schema is otherwise unchanged. The internal
`useMetaballRenderer` composable and its options are no longer public `/blob` API; use
`<Blob>` and its exposed controls instead. `BlobSettledFrame` remains public from the
simulation owner. The merged-metaball FIELD look is identical.

### Semantic entries replace source mirrors (key-preserving)

The tracked `src/subpaths/*.ts` mirror barrels are DELETED. One semantic entry graph
now points the build, declarations, and package exports directly at the owning
component/composable barrels. The root pass-through files for `axes`, `carousel`,
`dark`, `infinite-scroll`, `keyboard`, `motion`, `motion-core`, and `sidebar` are also
deleted; `src/tokens.ts` moves to `src/styles/tokens.ts`, while `src/index.ts` and
`src/forms.ts` remain. These are SOURCE-ONLY, KEY-PRESERVING changes: published
subpaths and chunk names are unchanged, so consumers take no action.

### The 5.0.0 visual and structural retirements

**`GooDotMatrix` and the `/goo-dot-matrix` subpath are removed. Clean break, no alias.**
The goo-and-dot hybrid viz (`<GooDotMatrix>`, `GooDotConfig`, `useGooDotMatrix`,
`DEFAULT_GOO_DOT_CONFIG`) and its `@mkbabb/glass-ui/goo-dot-matrix` subpath are gone at
5.0.0. It was a demonstration hybrid with no external consumer. If you used it, move to
`<Blob>` from `@mkbabb/glass-ui/blob`, which paints the same merged-metaball field.

**`DotFlowField`, `Concentric` and `DotMatrix` and their subpaths are deleted. Clean
break, no alias.** The three procedural vizzes are gone at 5.0.0, with no successor:

| dropped subpath | dropped exports (component + composable + config/handle types) |
|---|---|
| `@mkbabb/glass-ui/dot-flow-field` | `<DotFlowField>`, `useDotFlowField`, `FlowFieldConfig`, `DotFlowFieldHandle`, `UseDotFlowFieldOptions`, `DEFAULT_FLOW_CONFIG`, `sampleStreamField`/`curlFBM`/… |
| `@mkbabb/glass-ui/concentric` | `<Concentric>`, `useConcentric`, `ConcentricConfig`, `ConcentricHandle`, `UseConcentricOptions`, `DEFAULT_CONCENTRIC_CONFIG`, `sampleHeight`/`toneFromHeight`/… |
| `@mkbabb/glass-ui/dot-matrix` | `<DotMatrix>`, `useDotMatrix`, `DotMatrixConfig`, `DotMatrixHandle`, `UseDotMatrixOptions`, `DEFAULT_DOT_MATRIX_CONFIG`, `fibonacciDot`/`facingFade`/… |

The procedural vizzes that remain are aurora, blob, fourier-field, constellation and
liquid-grid.

#### The `/virtual` subpath retirement

**The `/virtual` subpath is removed. Clean break, no alias.** The section-windowing engine
had no production consumer inside the library and no external importer of the published
subpath, so the subpath goes:

| dropped surface | disposition |
|---|---|
| `@mkbabb/glass-ui/virtual` subpath export + `typesVersions` | removed |
| `src/subpaths/virtual.ts` mirror | deleted |
| `/api` re-export of `FlatSection` / `ForcedSectionWindowRange` / `SectionLayout` / `SectionWindowRange` | removed — the 4 types have no owning subpath (see the `/api` fold note above) |
| `demo/composables/virtual/` facility (`useVirtualSectionWindow` / `virtualSectionLayout` / narrow index) | kept as a demo-only facility, imported only by the two windowed stories |

If you imported `@mkbabb/glass-ui/virtual`, keep a local copy of the windower in your own
tree.

#### The `/border-progress` subpath retirement

**`/border-progress` and the broad `BorderProgress` component are deleted. Clean break,
no alias.** The old surface mixed a content wrapper, three coverage modes, milestone
events, spectrum expansion, and progress paint. Its one lasting mechanism, the
radius-following masked band, now belongs to the smaller public `ScrollProgressRim`.

| surface | disposition |
|---|---|
| `@mkbabb/glass-ui/border-progress` subpath export + `typesVersions` | removed |
| `BorderProgress`, milestone APIs, content-wrapper behavior, and old CSS properties | deleted |
| `@mkbabb/glass-ui/scroll-progress-rim` | added — exports `ScrollProgressRim` |

`ScrollProgressRim` accepts aggregate `value` / `max`, optional per-item `segments` whose values
are clamped to `[0,1]`, an edge `coverage`, and optional rainbow `stops`. It paints one 4px masked
band that follows the host radius and exposes native progressbar semantics. `completion-seal`
remains published and unchanged at 5.0.0.

#### The `/scrolling-text` subpath removal

**The `/scrolling-text` subpath and the `ScrollingText` component are removed. Clean
break, no alias.** `ScrollingText` was an overflow-detection marquee with a single
consuming app, so it moved into that app rather than staying in the library:

| dropped surface | disposition |
|---|---|
| `@mkbabb/glass-ui/scrolling-text` subpath export + `typesVersions` | removed |
| `src/components/scrolling-text/` component (`ScrollingText.vue` + barrel + README) | deleted |
| root barrel re-export | dropped — no `ScrollingText` off the root barrel |

If you imported it, copy the component into your own tree (or use your own overflow
primitive) and drop the `/scrolling-text` import.

#### The `icon-tooltip` clean break (a 7.0.0 removal)

`IconTooltip` and the `@mkbabb/glass-ui/icon-tooltip` subpath are deleted at 7.0.0 (the
`v6.0.0` `exports` still carries `./icon-tooltip`; see the `IconTooltip` row in the
§7.0.0 table). This subsection sits under `## 5.0.0` only for proximity to the other
Tooltip-composition guidance. Compose the canonical Tooltip family directly, placing one
provider around the nearest real control group:
```vue
<TooltipProvider :delay-duration="250">
  <Tooltip>
    <TooltipTrigger as-child>
      <Button type="button" aria-label="Surface details">…</Button>
    </TooltipTrigger>
    <TooltipContent>Surface details</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

The trigger remains a named native control; Tooltip content is a terse, noninteractive description.
Required instructions must remain visible because touch does not synthesize hover. `LabeledField` keeps
its real `<label for>` and renders supporting copy beside the control, linked through the slotted
`describedBy` value. It does not add a help trigger or conceal required field guidance.

**`PaperGrid` (the viz) is renamed `LiquidGrid`, and `/paper-grid` becomes
`/liquid-grid`. Clean break, no alias.** The rename separates the WebGPU liquid grid viz
from the static `.paper-grid` / `--paper-grid-texture` paper card register
(`cards.css` / `scale-paper.css`), which is unchanged. Migrate with one rename per call
site:
- `import { PaperGrid, DEFAULT_PAPER_GRID_CONFIG } from "@mkbabb/glass-ui/paper-grid"`
  → `import { LiquidGrid, DEFAULT_LIQUID_GRID_CONFIG } from "@mkbabb/glass-ui/liquid-grid"`.
- `<PaperGrid …>` → `<LiquidGrid …>`; `PaperGridConfig` → `LiquidGridConfig` (the `/api`
  discovery type); `usePaperGrid` → `useLiquidGrid`; `samplePaperGrid` → `sampleLiquidGrid`.
- The `.paper-grid-wrapper`/`.paper-grid-canvas` scoped SFC classes → `.liquid-grid-*`
  (internal — no consumer surface). The prop schema is otherwise unchanged, except the
  per-cell `shearMax` config field, which is gone (the sheet warp is shear-free, so a
  `shearMax` on a config object is a dead field; drop it).
- **The paint changed too, not the API:** the ripple is now one smooth continuous sheet
  warp, so major gridlines bow as one coherent curve, instead of each cell kinking about
  its own centre. No consumer action.

**The four motion booleans collapse onto one `motion` axis. Clean break, no alias.** The
`draggable` / `pressable` / `spring` / `liquidDrag` booleans (on `Card`, `Slider`,
`DialogContent`, `SheetContent`, `SegmentedTabs` and `DockLayerGroup`) become a single
`motion?: "full" | "reduced" | "off"` axis. The default is `full`, so physics is on unless
you opt down. `motion="reduced"` degrades the gesture physics to their CSS floor (the same
state `prefers-reduced-motion` produces); `motion="off"` unbinds the enrichment and writes
`--motion-weight: 0`, while click, keyboard and drag-handle interaction stay.
`prefers-reduced-motion` always turns `full` into `reduced`.
- **`<SegmentedTabs draggable>` / `<DockLayerGroup draggable>` → the `motion="full"`
  default.** The drag is now on by default, and a click-only strip opts down with
  `motion="reduced"`. DockLayerGroup's drag was off by default before.
- **`<Card pressable>` → explicit command composition.** Card no longer infers
  interaction or mounts a press engine. Put a `Button` or `Link` inside the Card so
  native focus, keyboard, disabled, naming, and activation semantics stay together.
- **`<Slider liquidDrag>` → `motion`.** `liquidDrag="false"` → `motion="reduced"` (or
  `"off"`); the default `full` behaves as `liquidDrag: true` did.
- **`<DialogContent spring>` / `<SheetContent spring>` → `springPreset` + `motion`.** The
  `spring` boolean carried both the on/off and the preset, so it splits: `springPreset?:
  "smooth" | "snappy" | "bouncy" | "gentle"` picks the curve, and `motion` gates the
  engine. `spring={true}` → `springPreset="smooth"`; `spring="bouncy"` →
  `springPreset="bouncy"`; unset `spring` → unset `springPreset` (the centred dialog keeps
  its CSS reveal; a side sheet always rides the interruptible spring). Sheet's
  `dragDismiss` now engages the spring engine on its own and no longer requires `spring`.
- **`keepDockOpen`, `dragDismiss` and `responsive` are unchanged**, since they describe a
  behaviour, not motion intensity.

**`pill` remains the `SegmentedTabs` default, and the two-rest-state eyeglass path is
removed. Clean break, no alias.** A bare `<SegmentedTabs>` paints one measured indicator
inside the pill track; `underline` remains the only other material.

- **`<SegmentedTabs eyeglass>` remains deleted.** Drop the old attribute; there is no
  named eyeglass variant.
- **The old proud/settled sizing and release controls are deleted.** Remove
  `--eyeglass-proud`, `--eyeglass-settled`, and `--eyeglass-live-t` overrides. The active
  fill matches the selected control instead of reserving or magnifying a second rest state.
- **The dedicated eyeglass spring is deleted.** Remove `--spring-eyeglass`,
  `--spring-eyeglass-settle`, and `--spring-eyeglass-duration` overrides. Selection uses
  the shared `snappy` register; no replacement preset or compatibility token exists.

**The `selectableChipVariants` alias and the `--corner-shape-card` / `-pill` tokens are
removed. Clean break, no alias.**
- **`selectableChipVariants` → `chipVariants`, `SelectableChipVariants` → `ChipVariants`.**
  The alias over the one `chipVariants` recipe is deleted. The recipe publishes from
  `@mkbabb/glass-ui/chip` — `chipVariants` (value) + `ChipVariants` (type) — because 5.0.0
  also removed the `./selectable-chip` subpath (folded onto the one `<Chip>` family) and
  the `./api` subpath. Migrate by renaming both names and re-pointing the import to
  `@mkbabb/glass-ui/chip`; the recipe body is unchanged. The old `<SelectableChip>`
  component folds onto `<Chip>` in the same release.
- **`--corner-shape-card` / `--corner-shape-pill` are deleted.** They were dead `round`
  knobs with no reader, and the CSS `corner-shape` initial value is already `round`, so
  cards and pills stay round with no declaration. The squircle members
  `--corner-shape-{bigdock,dialog,sheet,panel,hero}` are live and untouched. If you
  re-pointed either token, declare it yourself and add your surface to your own
  `@supports (corner-shape: …)` block.

**The `<GlassDock overflow="scroll">` opt-in is removed. Clean break, no alias.** The
`overflow` prop became `"grow" | "wrap"`. From 5.0.0 through 8.0.0 a capped dock axis
scrolled by construction: a horizontal dock scrolled its over-cap inline content past
`--dock-max-inline-size`, a vertical rail scrolled past `--dock-max-block-size`, and the
over-cap edge feathered through the `<FadingScroll>` `--fade-scroll-width` mask. Drop any
`overflow="scroll"` prop. 9.0.0 removed the inline cap and the edge mask: a horizontal
dock's run scrolls natively when it outgrows its stage, with no edge fade, and
`--dock-max-inline-size` does nothing (10.0.0 deletes it; see _`--dock-max-inline-size`
is removed_ under 9.0.0). `--dock-max-block-size` remains the vertical cap.

### The dock control and trigger fold, and the reka `ui/tabs` retirement

The five dock control and trigger components collapse onto two: `<DockControl>` with a
`shape` axis and `<DockTrigger>` with a `for` axis. The internal reka `ui/tabs`
substrate retires (`<DockLayerGroup>` now runs on the headless `useSelectionGroup`
engine), and the dock-item drag-reorder axis goes. Clean break, no alias; every call site
re-points by name.

| Retired (5.0.0) | Survivor | Rename |
|---|---|---|
| `DockIconButton` | `DockControl` | `<DockIconButton …>` → `<DockControl …>` (props identical; `shape="icon"` is the default) |
| `DockTabButton` | `DockControl` | `<DockTabButton …>` → `<DockControl shape="tab" …>` |
| `DockSelectTrigger` | `DockTrigger` | `<DockSelectTrigger …>` → `<DockTrigger for="select" …>` |
| `DockDropdownTrigger` | `DockTrigger` | `<DockDropdownTrigger …>` → `<DockTrigger for="dropdown" …>` |
| `DockPopoverTrigger` | `DockTrigger` | `<DockPopoverTrigger …>` → `<DockTrigger for="popover" …>` |

**`<GlassDock draggable-items>` and the `update:order` emit are removed.** A dock reorder
is the consumer's concern: compose `useSortable` (`@mkbabb/glass-ui/sortable`). Drop
`draggable-items`, `@update:order` and any `data-dock-draggable` markers.

**The reka `ui/tabs` substrate is gone.** It was never on a public barrel, so there is no
import to migrate. Tab UIs use `<SegmentedTabs>` (`@mkbabb/glass-ui/tabs`).
`useDockCtaReceive` and `cta-seat.css` stay.

### HoverPopover and HoverCard fold onto one `<Popover>`

The three overlays that share the positioned-glass mechanism collapse onto one
`<Popover>` with a `trigger` axis (`click` default, or `hover`). It switches the reka
root internally (a fine-pointer hover uses `HoverCardRoot`; a click or a coarse-pointer
hover uses `PopoverRoot`), so it owns the content semantics: hover previews are named
non-modal groups, and click surfaces are non-modal dialogs. `<PopoverContent>` keeps the
shared `surface` axis, and `keepDockOpen` serves both roots. On a coarse pointer a hover
popover becomes tap-to-toggle. **Tooltip stays its own component**, since its naming
(`aria-describedby`, `role="tooltip"`, non-focusable content) is a different mechanism.
Clean break, no alias.

| Retired (5.0.0) | Survivor | Rename |
|---|---|---|
| `HoverPopover` (`@mkbabb/glass-ui/hover-popover`) | `Popover` (`@mkbabb/glass-ui/popover`) | `<HoverPopover content side align>…</HoverPopover>` → `<Popover trigger="hover"><PopoverTrigger as-child>…</PopoverTrigger><PopoverContent :side>…</PopoverContent></Popover>` |
| `HoverCard` / `HoverCardTrigger` / `HoverCardContent` (`@mkbabb/glass-ui/hover-card`) | `Popover` / `PopoverTrigger` / `PopoverContent` | `<HoverCard>…</HoverCard>` → `<Popover trigger="hover">…</Popover>`; `<HoverCardContent>` → `<PopoverContent aria-label="…">` |
| `hoverOpenDelay` prop | `openDelay` prop | `:hover-open-delay="80"` → `:open-delay="80"` |
| `./hover-popover` subpath export | `./popover` | delete the import spec; import `Popover`/`PopoverTrigger`/`PopoverContent` from `@mkbabb/glass-ui/popover` |
| `./hover-card` subpath export | `./popover` | as above |
| `hover-popover.css` substrate sheet (`.hover-popover-panel` / `.hover-popover-label`) | none | the popover content rides the shared `glass-floating` + `glass-reveal` recipe |

The trigger chooses the role, so a caller cannot create a hover dialog or a
click-triggered group whose `aria-haspopup` promises the wrong target.

### ContextMenu folds onto the Menu family as `trigger="context"`

ContextMenu shared DropdownMenu's mechanism (the same roving focus, typeahead and rows),
so the `ContextMenu*` family collapses onto the `DropdownMenu*` family with a `trigger`
axis (`click` default, or `context`). `context` anchors the menu at the pointer through
reka's `ContextMenu*` substrate; `click` anchors it at the button. `v-model:open` works in
both modes. Select, Combobox and Command stay separate. Clean break, no alias.

| Retired (5.0.0) | Survivor | Rename |
|---|---|---|
| `ContextMenu` / `ContextMenuTrigger` / `ContextMenuContent` / …Item / …CheckboxItem / …RadioItem / …RadioGroup / …Label / …Separator / …Shortcut / …Sub* (`@mkbabb/glass-ui/context-menu`) | `DropdownMenu` / `DropdownMenuTrigger` / `DropdownMenuContent` / … (`@mkbabb/glass-ui/dropdown-menu`) | `<ContextMenu><ContextMenuTrigger>…</ContextMenuTrigger><ContextMenuContent>…</ContextMenuContent></ContextMenu>` → `<DropdownMenu trigger="context"><DropdownMenuTrigger>…</DropdownMenuTrigger><DropdownMenuContent>…</DropdownMenuContent></DropdownMenu>` (rename `ContextMenu*` → `DropdownMenu*` at every node; add `trigger="context"` on the root) |
| `./context-menu` subpath export | `./dropdown-menu` | delete the import spec; import the `DropdownMenu*` family from `@mkbabb/glass-ui/dropdown-menu` |

The `--dropdown-menu-{bg,border,shadow}` tokens join `--dropdown-menu-font` on
`.dropdown-menu-content`, so a consumer retunes the menu plate with one `:root`
override. (8.0.0 later renamed the family's subpath to `./menu`, and 11.0.0 gives the
context menu its own `ContextMenu` root again; see those sections.)

### MultiSelect is removed

`MultiSelect` and `MultiSelectOption` (root barrel only, no subpath) are removed with no
replacement component. Earlier text here named a `<Combobox multiple>` survivor, but the
library has never exported a `Combobox` component. A multi-select is a composition you
build: reka's `ComboboxRoot` is `<Command>`'s substrate, and `multiple` reaches it through
`<Command>`'s attribute forward, so `<Command multiple>` with your own chips in the
trigger is the shape. `Select` does not take `multiple`.

### One explicit `<Chip>` family

`<Chip>` is the single compact plate and control family. Its independent axes are
`mode: static | selectable | action | removable`, `shape: pill | cell | icon`, `size`,
`tone`, and `surface`. Static is the default and renders an inert `<span>` with no role,
focus, pressed state, pointer cursor, or forwarded listeners. Selectable uses toggle
semantics, action is a native button, and removable keeps an inert root with one named
remove button. Shape controls geometry only; `shape="icon"` accepts a slotted glyph rather
than owning icon rendering. `Badge` remains a distinct static label. Clean break, no
alias.

| Retired (5.0.0) | Survivor | Rename |
|---|---|---|
| `ToggleChip` (`@mkbabb/glass-ui/toggle-chip`) | `Chip` (`@mkbabb/glass-ui/chip`) | `<ToggleChip v-model="on" variant="chip">…</ToggleChip>` → `<Chip v-model="on" mode="selectable" shape="pill">…</Chip>`; `variant="cell"` → `shape="cell"`. |
| `SelectableChip` (`@mkbabb/glass-ui/selectable-chip`) | `Chip` (`@mkbabb/glass-ui/chip`) | `<SelectableChip v-model="on" :tone="t">…</SelectableChip>` → `<Chip v-model="on" mode="selectable" :tone="t">…</Chip>`. |
| `toggleChipVariants` / `ToggleChipVariants` (`/toggle-chip`) | `chipVariants` / `ChipVariants` (`/chip`) | Rename the recipe and type; the recipe axes are now `interactive × size × shape`. |
| `./toggle-chip` + `./selectable-chip` subpath exports | `./chip` | delete the import specs; import `Chip` / `chipVariants` from `@mkbabb/glass-ui/chip` (not on the root barrel) |

The `/chip` subpath stays light: concrete colours resolve through the lazy accent-tone
solver while CSS variables stay on the synchronous path.

### `CardTier` folds onto the `surface` axis

The bare tier-and-decoration glass plate is extracted as `<Surface>` (published at
`@mkbabb/glass-ui/surface`), and `Card`'s old tier spellings fold onto the same axis.
Clean break, no alias.

| Retired (5.0.0) | Replacement |
|---|---|
| `CardTier` `"opaque"` (tier prop spelling) | `surface="opaque"` on `Card`/`Surface` |
| `CardTier` `"deep"` (tier prop spelling) | `deep` on `Card`/`Surface` |

Card's former `surface="cartoon"` superset is now the explicit `cartoon` boolean;
`surface` accepts only the shared `glass | veil | opaque` material axis. The `ScrollCard`
and `ScrollCardHeader` wrappers are removed; compose `Card` with
`class="card-scroll-host"` and `CardHeader shrink` where the live timeline is needed.

### The `surface="clear"` member is removed

The `surface="clear"` member (a maximally translucent plate with a mandatory legibility
scrim) had no consumer, so it is removed. Clean break, no alias.

| Retired (5.0.0) | Replacement |
|---|---|
| `surface="clear"` (Surface union member) | none; use `surface="glass"` (the translucent default) or `surface="veil"` (the borderless text plate) |
| `--glass-bg-clear` / `--glass-opacity-clear` tokens | none (the `.glass-clear` decoration and the `[data-surface="clear"]` scrim rule go with the member) |

No surviving surface changes paint.

### Sheet folds onto `<Dialog placement>`, and ConfirmDialog becomes a Dialog preset

`Sheet` was the same reka `DialogRoot` and focus scope as Dialog, with a side slide on
top, so it folds onto `<DialogContent placement="center | top | right | bottom | left">`.
`center` is the default centred modal; the four sides are the old Sheet sides, with the
same rounding, border and slide geometry, now moved by the interruptible spring. The
positioning ships precompiled in `dialog-placement.css` (the renamed `sheet.css`).
**`ConfirmDialog` becomes a preset you compose**: a glass `<DialogContent
:show-close="false">` with a title, a description, a confirm and cancel footer, and a
loading guard on dismiss. Clean break, no alias.

At 5.0.0 `Drawer` stays: it owns the snap-detent physics and the live-behind non-modal
focus model. A side sheet with no detents is `<Dialog placement="right">`; a detented
bottom sheet over a live surface is `<Drawer>`. Sheet's `dragDismiss` does not carry into
the fold. (8.0.0 later folds `Drawer` into `Sheet`; see _Package subpaths_ under 8.0.0.)

| Retired (5.0.0) | Survivor | Rename |
|---|---|---|
| `Sheet` / `SheetTrigger` / `SheetContent` / `SheetHeader` / `SheetTitle` / `SheetDescription` / `SheetFooter` / `SheetClose` (`@mkbabb/glass-ui/sheet`) | `Dialog` / `DialogTrigger` / `DialogContent` / `DialogHeader` / `DialogTitle` / `DialogDescription` / `DialogFooter` / `DialogClose` (`@mkbabb/glass-ui/dialog`) | `<Sheet>…<SheetContent side="right">` → `<Dialog>…<DialogContent placement="right">`; every `Sheet*` sub-part → its `Dialog*` twin (same slot shape) |
| `<SheetContent side="top\|right\|bottom\|left">` | `<DialogContent placement="…">` | `side="right"` → `placement="right"` (`placement="center"` is the default centred modal) |
| `<SheetContent dragDismiss dragThreshold>` | `<Drawer>` (snap physics) | a drag-dismissable bottom sheet is a `Drawer`, not a placement Dialog |
| `SheetVariants` (type, `/sheet`) | `Placement` axis (`@mkbabb/glass-ui`) | `SheetVariants['side']` → `Placement` (`"center" \| "top" \| "right" \| "bottom" \| "left"`); no successor CVA type |
| `ConfirmDialog` (`@mkbabb/glass-ui/confirm-dialog`) | `Dialog` preset (consumer composition) | `<ConfirmDialog v-model:open title description confirm-label destructive :loading @confirm>` → a `<Dialog v-model:open><DialogContent surface="glass" :show-close="false" @escape-key-down @interact-outside>` with a `<DialogHeader>` title/description and a `<DialogFooter>` cancel/confirm `<Button>` pair (the confirm reads `tone="destructive"` when destructive, see the next section; the loading guard calls `preventDefault` on the dismiss intents while in flight) |
| `./sheet` subpath export | `./dialog` | delete the import spec; import from `@mkbabb/glass-ui/dialog` |
| `./confirm-dialog` subpath export | `./dialog` | as above; compose the confirm preset over `Dialog` |
| `sheet.css` (`[data-slot="sheet-content"][data-side]`) | `dialog-placement.css` (`[data-slot="dialog-content"][data-placement]`) | the precompiled positioning file renames; its `:where()` override specificity is unchanged |

A side dialog reads the Dialog glass rung `--glass-bg-dialog` (the old Sheet read the
floating rung), so its plate alpha shifts slightly; the slide geometry is unchanged.

### `Button` `destructive` moves off `variant` onto the `tone` axis

A destructive intent is a semantic tone, not a style, so it moves onto the `tone` axis.
`variant` is now style-only (`default`/`primary-audacious`/`gold-audacious`/`outline`/
`secondary`/`accent`/`ghost`/`glass`/`glass-wash`/`ai`/`link`). The destructive fill,
hover, active and pressed paint moves unchanged onto `tone="destructive"`, and
`tone="neutral"` is the default. Clean break, no alias.

| Retired (5.0.0) | Survivor | Rename |
|---|---|---|
| `<Button variant="destructive">` | `<Button tone="destructive">` | `tone` composes with any style, so a destructive outline or ghost button is now expressible: `<Button variant="outline" tone="destructive">` |
| `ButtonVariants['variant']` member `"destructive"` | `ButtonVariants['tone']` member `"destructive"` | the CVA `variant` map drops `destructive`; the CVA `tone` map adds it (`"neutral" \| "destructive"`, default `neutral`) |

### Synonym renames: `type`/`variant` tone, `direction`, `position` and `ToastVariant`

Each of these is a name change with no paint change, and the old name has no alias.

**The tone axis.** The status register (success, warning, info, destructive, and neutral)
moves off the `type` and `variant` maps onto the one shared `tone` axis. Each tone still
resolves the same `.feedback-tone-<name>` classes.

| Retired (5.0.0) | Survivor | Rename |
|---|---|---|
| `<Alert variant="destructive\|success\|warning\|info">` | `<Alert tone="…">` | the CVA `variant` map becomes a `tone` map; `variant:'default'` → `tone:'neutral'`. `Alert` now emits `:data-tone` |
| `<Badge variant="destructive\|success\|warning\|info">` | `<Badge tone="…">` | `variant` stays style-only (`default`/`secondary`/`outline`); a new `tone` map carries the semantics. `Badge` emits `:data-tone`, and the glass register keys off `.badge-atom--glass[data-tone='…']` |
| `Toast.variant?: ToastVariant` (`'default'\|'destructive'\|…`) | `Toast.tone?: Tone` | `ToastVariant` is removed; the toast reads the shared `Tone` axis (`default` → `neutral`), published from `@mkbabb/glass-ui/axes`. `Toast` emits `:data-tone` |
| `Notification` item `type: 'success'\|'error'\|'info'\|'warning'` | item `tone: 'success'\|'warning'\|'info'\|'destructive'` | `type` → `tone`; `error` becomes `destructive` |

**Orientation and placement.**

| Retired (5.0.0) | Survivor | Rename |
|---|---|---|
| `<StackedIconGroup direction="horizontal\|vertical">` | `<StackedIconGroup orientation="…">` | `direction` → `orientation` (`:data-direction` → `:data-orientation`) |
| `HeaderRibbon.position?: HeaderRibbonPosition` (`'left'\|'right'`) | `HeaderRibbon.placement?: HeaderRibbonPlacement` | `position` → `placement`; the type `HeaderRibbonPosition` → `HeaderRibbonPlacement` (published on `/header-ribbon`) |

These keep their names because they mean something different: `SortableList.axis` (the
drag axis), `DockStack.position` (alignment), `MetricStack.register` (display mode),
`Toaster.position` (corner anchor) and `Drawer.direction` (a forwarded reka prop).

### `GlassPanel` retires onto `Card`, `<Surface>` and `.glass-resting`

`<GlassPanel>` shared Card's tier map and the shared surface resolver, and its JS-canvas
`feDisplacementMap` was a second refraction path. A slotless glass surface needs no
component: `<Surface tier surface>`, or the bare `class="glass-resting"`, serves the plate
case. Clean break, no alias. (`.glass-lens`, which earlier text here named as the
refraction successor, is itself deleted at 8.0.0, so there is no refraction path.)

| Retired (5.0.0) | Survivor | Rename |
|---|---|---|
| `GlassPanel` (`@mkbabb/glass-ui/glass-panel`) | `Card` / `<Surface>` / `class="glass-resting"` | `<GlassPanel tier="resting">…</GlassPanel>` → `<Surface tier="resting" surface="glass">…</Surface>` (or the bare `class="glass-resting"` on the plate) |
| `GlassPanelProps` (type, `/api`) | none | `<Surface>` publishes `SurfaceProps` (the shared tier × surface axis) |
| `./glass-panel` subpath export | `./card` / root `<Surface>` | delete the import spec; import `Card`/`Surface` from `@mkbabb/glass-ui` (root) or `@mkbabb/glass-ui/card` |
| `useGlassRenderer` / `createGlassFilter` / `destroyGlassFilter` (the JS-canvas refraction builder) | none; the `.glass-{rung}` blur+tint base | there is no refraction path |
| `.glass-card` (co-selector alias) | `.glass-resting` | fold the alias onto `.glass-resting` (same paint) |

A plate that moves from `GlassPanel` to `<Surface>` or `class="glass-resting"` paints the
same at every tier.

### `--default-transition-duration` follows `--duration-fast`, and three weight tokens arrive

- The emitted `dist/styles/components.css` no longer re-declares a bare
  `:root { --default-transition-duration: 150ms }` over your own `@theme` alias. It now
  reads `--default-transition-duration: var(--duration-fast, 150ms)`. So with a bare
  `@import "@mkbabb/glass-ui/styles"`, Tailwind's `.transition-*` utilities take the house
  `--duration-fast` (0.2s) as their default, and retuning `--duration-fast` (or your own
  `--default-transition-duration` alias) now governs them. No import or class rename.
- New tokens `--type-weight-display` (600), `--type-weight-heading` (700) and
  `--type-weight-title` (700). The `text-display*` / `text-heading` / `text-title`
  utilities read them instead of fixed weights, so one override dials the letterform
  weight. Purely additive; the defaults are unchanged.

## 4.1.0

**The Canvas2D fourier renderer and the three-view split retire onto the WebGPU
`useFourierField`. No public-prop break.** The fourier surface moves off Canvas2D onto
the WGSL-first GPU substrate (`createGpuSubstrate`, `setupWGPU` + `setupGL`), and the demo
studio views fold into one view. `<FourierField>` keeps its `ConstellationProps`-shaped
contract, so a library consumer has nothing to change.

**The constellation moves onto the WebGPU substrate, and `drawOverlay` is no longer
painted.** The constellation re-homes off Canvas2D (the `ctx.arc()` discs and the 2D
`drawOverlay` skin seam) onto WebGPU instanced points and lines. `drawOverlay` stays a
public `ConstellationProps` prop, but the built-in GPU loop never calls it. Under
`prefers-reduced-motion` the field still freezes, frame for frame. No consumer change
beyond that.

**`<Button variant="solid">` is removed. Clean break, no alias.** The `solid` variant
kept the old opaque `bg-primary` fill. The default `<Button>` is the glass register; for a
loud call to action use `variant="accent"` (gold tint on glass). The
`default`/`outline`/`secondary`/`accent`/`ghost` variants are unchanged (`destructive`
moves onto the `tone` axis at 5.0.0).

**`<DockRail>` and `DockRailItem` retire onto the hover-expand `<DockStack>` and
`DockStackItem`. Clean break, no alias.** The divider-carousel rail is rebuilt as a
macOS-style stack: a core anchor item whose members fan out beside the rail on hover or
focus (three configurable, with a scrollable overflow through `<FadingScroll>`), extending
past the dock edge into its own gutter so it never covers `<main>`. `DockRail`,
`DockRailItem`, `DockRail.vue`, `src/styles/dock/rail-extend.css` and the `measureSeam` /
`--dock-rail-seam-offset` seam locator are gone from `@mkbabb/glass-ui/dock`. Migrate
`<DockRail v-model:context :items>` → `<DockStack v-model:selected :items>`, and
`DockRailItem` → `DockStackItem = { id, label, icon?, onSelect? }`.

Additive (4.1.0): `@mkbabb/glass-ui/border-progress` — `<BorderProgress>`, a masked-conic
border-ring primitive whose progress is the element's border. It is removed again at 5.0.0;
see _The `/border-progress` subpath retirement_ under 5.0.0.

Additive (4.1.0): `--instrument-dial-min-block-size-desktop`. The wide-axis chassis dial
reserve now ships in the library (`@container chassis (min-width: 45rem)` on
`.instrument-dial`, default `var(--chassis-max-block-size)`). If you wrote your own
wide-axis reserve, such as `.instrument-dial { min-block-size: var(--chassis-max-block-size) }`,
delete it; retune through the token if your meter's block size differs.

Documented (4.1.0): `--glass-opacity-{tier}`, the per-tier alpha. The values are
unchanged, so an override that re-pinned the same tier alphas can be deleted.

Additive (4.1.0): aurora `warpMode` gains `"curl"`, a curl-noise flow warp (opt-in; the
default fbm/cellular/hybrid render is unchanged). The published `WarpMode` union widens.

Additive (4.1.0): the shared `Surface = "glass" | "veil" | "opaque"` axis reaches `<Toast>`
and `<Button>`, which each gain a `surface` prop. `<Toast surface="glass">` is the default
and matches the old `glass-floating` plate; the feedback tone tint rides on the resolved
surface. `<Button surface=…>` defaults unset (the `variant` axis owns Button's default);
`surface="opaque"` and the `solid` variant reach the same `--glass-level:0` endpoint from
two axes. No break for either.

**Additive (4.1.0): the surface-aware foreground register.** glass-ui adds an on-glass
foreground family whose contrast target is the composited glass fill, not the page:
`--on-glass-muted` (+ `--on-glass-muted-strong`), `--input-on-glass`, and
`--progress-track-on-glass`. A caption, well or track over a translucent plate used to
read `--muted-foreground`, which is tuned against the page and fell to 1.15–3.29:1 on its
own surface in dark mode. The light content tiers (`.glass-card`/`.glass-resting`/
`.glass-quiet`/`.glass-wash`) now point `--muted-foreground` at `--on-glass-muted`, so
every `text-muted-foreground` caption and CardDescription picks up the on-glass rung with
no per-site edit. Input and Textarea wells read `--input-on-glass`; the Progress track
reads `--progress-track-on-glass`. The page register (`--muted-foreground:
var(--neutral-5)`) is untouched for the opaque-canvas case. If you re-declared
`--muted-foreground` over glass to fix that contrast yourself, delete the override.

**`@keyframes gold-shimmer-slide` retires onto the metal-parameterized
`@keyframes metal-shimmer-sweep`. Clean break, no alias.** The gold-only keyframe becomes
one metal-agnostic sweep (reading `--metal-shimmer-color` and the `--metal-stop-*` slots),
so gold, silver and bronze share it.

1. **`@keyframes gold-shimmer-slide` is gone** with no alias. The `.gold-shimmer` class
   stays and now runs `metal-shimmer-sweep` with `--metal-shimmer-color: gold`, painting
   exactly as before; `--animate-gold-shimmer` stays too. Migrate only if you named
   `gold-shimmer-slide` in your own `animation:` rule: write
   `animation: metal-shimmer-sweep …` instead.
2. **New, additive.** The bronze quad (`--bronze`/`-light`/`-dark`/`-deep` +
   `--color-bronze*`), the `--duration-metal: 6s` slow clock, and the
   `.metal-{gold,silver,bronze}` / `.metal-*-border` / `.metal-rainbow-rim` utilities.
   You opt in by composing a `.metal-*` class; `.metal-rainbow-rim` uses the
   `--glass-accent` rim seam.

## 4.0.0

**The tab family standardizes on one engine with two materials. Clean break, no
alias.** `SegmentedTabs` is now one engine with two materials (`variant: "pill" |
"underline"`) and one orientation axis (`orientation: "horizontal" | "vertical"`). Four
retirements:

1. **`variant="segmented"` → `variant="pill"`, now the default.** Segmented and pill were
   one register. `pill` is the glass material: a glass-quiet track with a selected
   indicator that reads as glass (`--glass-bg-floating`). Drop `variant="segmented"` or
   rename it to `variant="pill"`; a `<SegmentedTabs>` with no `variant` now paints the
   glass pill.
2. **The `overflow="scroll" / "auto"` axis is removed.** Overflow is `<FadingScroll>`'s
   job (`@mkbabb/glass-ui/fading-scroll`). Wrap a genuinely overflowing tab row in
   `<FadingScroll>` or apply `useFadingScroll`; the usual short tab row needs neither.
3. **`:multi-select` moves to `<ToggleGroup>`.** A strip of independent toggles on one
   surface (`role="group"`) is a ToggleGroup, not a tab family member:
   `<SegmentedTabs :multi-select>` → `<ToggleGroup type="multiple">`. The tabs model is a
   single string now, not `string | string[]`.
4. **`ui/Tabs` (`Tabs`/`TabsList`/`TabsTrigger`/`TabsContent`/`TabsIndicator`) leaves the
   public surface.** The standard family is `SegmentedTabs` (`@mkbabb/glass-ui/tabs`);
   move a hand-rolled `ui/Tabs` recipe to the matching `<SegmentedTabs variant="…">`.

The `UnderlineTabs` → `<SegmentedTabs variant="underline">` and `BouncyToggle` →
`<SegmentedTabs>` swaps are drop-in: `:options` / `:model-value` / `@update:model-value`
and `variant` are unchanged.

**Never stack `.glass-btn` and `.btn-pill`.** The two button size registers exclude each
other: `.glass-btn` is the fixed-square icon primitive (`width/height:
var(--size-icon-btn)` + `contain:paint`), and `.btn-pill` is the content-width text pill.
On one element the fixed square wins and `contain:paint` clips a wrapped text label into
a ~40px blob, and a `.glass-btn` with a text child collapses the same way. For a
text-bearing control use a real `<Button>` with a leading glyph. No library recipe
changes.

**Dialog `variant` moves onto the shared `surface` axis. Clean break.**
`<DialogContent variant="glass|opaque">` becomes `<DialogContent
surface="glass|veil|opaque">`, with no alias. Migrate per call site: `variant="glass"` →
`surface="glass"` (also the default), `variant="opaque"` → `surface="opaque"`; `veil` is
new. `glass` and `opaque` paint as before.

Additive: the shared `Surface = "glass" | "veil" | "opaque"` axis reaches `GlassPanel`,
`Sheet`, `Popover`, `Command`, `Drawer`, and `ExpandableContainer`, which each gain a
`surface` prop (default `"glass"`). `<Skeleton>` gains `surface?: "glass" | "opaque"`
(default `"opaque"`, as `bg-muted` painted before); `surface="glass"` is a translucent
`--skeleton-glass-bg` block for use over a frosted plate. The `ExpandableContainer`
fullscreen overlay now opens onto the overlay glass tier by default (`surface="opaque"`
restores the solid wall). No break for any of these.

**The Select bound and the Slider size axis now paint in every consumer.** No API
rename: the structural utilities now ship as precompiled CSS instead of arbitrary
classes your content scan never saw. Three things you will see:
(1) `<SelectContent>` bounds its content to `min(24rem, 60dvh)`, tightened by
`--reka-popper-available-height`, and scrolls inside, so a tall dropdown no longer runs
off the viewport (override the cap with `--select-content-max-h` on any ancestor).
(2) `<Slider size="md">` (and `sm`/`lg`) renders its real track geometry (`md` ≈ 20px /
1.25rem); the `size` prop used to be inert in consumers, which fell back to a 6px track.
(3) glass-ui's own `@source` directive re-points `"../components"` → `"../*.js"` so it
reaches the compiled `dist/*.js` chunks. If you copied that `@source` line, make sure
yours points at the installed `dist`.

Additive: `<WatercolorDot>` gains `variant?: "solid" | "ghost"` (default `"solid"`).
`variant="ghost"` renders the same seeded blob as a stroke over a low-alpha fill, for an
empty palette slot. No break.

**`CarouselDots` retires onto `<PagerDots>`, and the counter moves off `bg-card`. Clean
break, no alias.** The carousel dots become one primitive, `<PagerDots>`
(`@mkbabb/glass-ui/pager-dots`), in a glass pager pill. Two breaks:

1. **`CarouselDots` → `<PagerDots>`.** `CarouselDots` is gone from the `/carousel`
   barrel (it wired the embla API through `useCarousel()`). `<PagerDots>` stands alone, so
   wire `:count`, `:active` (`v-model:active`) and `@select` yourself:
   `<CarouselDots />` → `<PagerDots :count="api.scrollSnapList().length"
   :active="api.selectedScrollSnap()" @select="(i) => api.scrollTo(i)" />`. The dots look
   the same; they now read a `--pager-dot-*` token set (retint the active fill with
   `--pager-dot-active`) and sit in the `.glass-pager-ring` by default (`ring="false"`
   for a flush deck). `windowFit?` windows the dots to the space available (off by
   default).
2. **The `<CarouselPager>` counter is off the opaque `bg-card` ring.** The counter now
   composes `.glass-pager-ring` instead of `rounded-pill border border-border bg-card`.
   An override of the counter's `bg-card` should target the glass ring instead.

**`GlassUnderline` and the `/underline` subpath retire onto `<HandMark shape="underline">`.
Clean break, no alias.** The hand-drawn family lands on `@mkbabb/glass-ui/handmark`, and
the editorial underline is one shape of it. Two breaks:

1. **`@mkbabb/glass-ui/underline` (`<GlassUnderline>`) is gone**, with the
   `GlassUnderline*` types. Migrate `import { GlassUnderline } from
   "@mkbabb/glass-ui/underline"` → `import { HandMark } from "@mkbabb/glass-ui/handmark"`,
   and `<GlassUnderline>word</GlassUnderline>` → `<HandMark shape="underline">word</HandMark>`.
   At 4.0.0 the draw-on underline was `<HandMark shape="underline" animation="draw-on">`
   and the pencil-boil look was `brush="boil"`. From 9.0.0 `<HandMark>` takes five props
   (`shape` · `color` · `weight` · `seed` · `draw`): `brush` and `animation` are gone, and
   `draw` is the draw-on switch.
2. **Optional peers at 4.0.0.** `<HandMark>` added two optional peers,
   `@mkbabb/pencil-boil ^0.4.1` and `perfect-freehand ^1.2.3`, both tree-shaken when
   unused. `perfect-freehand` stopped being a peer at 7.0.0 and `@mkbabb/pencil-boil` at
   9.0.0, so from 9.0.0 HandMark needs no install.

## 3.13.0

**The dock's interactive register drops the brand red for a luminance lift.** No API
rename; this is a token and default change. The dock's selected, hover, active and
pressed paint at the library root is now a glass luminance lift, not a brand-red accent.
Two new retint knobs: `--dock-selected-accent`, the one knob for the selected affordance
(default `color-mix(in oklab, var(--foreground) 14%, transparent)`, which flips with
`--foreground`, read by the rail's leading-edge accent bar), and `--dock-control-press-bg`,
the press darken (`--glass-bg-resting` mixed about 7% toward `--foreground`, read on every
dock control `:active`). The rail's active glyph and bar no longer fall back to
`var(--dock-rail-active-accent, var(--primary))`: the glyph stays `--foreground`, and the
bar paints `--dock-selected-accent`. If you tinted the selected register to a brand hue
through `--dock-rail-active-accent`, set `--dock-selected-accent` instead.

**3.13.0 is the release; there is no 3.11 or 3.12 entry.** The dock taxonomy, the metric
`amount`→`value` rename, the constellation generalization and the Card `veil` addition
all ship in 3.13.0. Registry versions 3.11.0, 3.11.1, 3.11.2 and 3.12.0 were published
from an older tree and are not part of this line, so pin **3.13.0** and read every break
below as landing there.

**v3.13.0** — the dock taxonomy clean break: `<GlassDock variant="rail">` →
`<GlassDock orientation="vertical">`. The `variant` discriminant is removed; a vertical
dock is now collapsible by default (it morphs its `height`), and a static nav column adds
`always-expanded`. `<GlassDock variant="instrument-strip">` is removed; compose
`<InstrumentChassis>` directly.

Breaking (3.13.0): `<MetricBadge>` / `<MetricPill>` — the primary prop `amount` is
renamed `value`, and a valid `0` now renders `0`, never the placeholder. Clean break, no
alias (the `/metric-cell` and `/metric-stack` surfaces are unchanged).

Additive (3.13.0): the `/constellation` subpath gains optional, default-off props and
exports (pinnedIndex/pinNode, accentEdges, the palette accent/edgeFloor/edgeAccentAlpha,
stepPinnedDrift, warpAutoRelease + warpSettled). Existing props are unchanged.

Additive (3.13.0): the Card `surface` union gains `"veil"`, a borderless, rimless wash
plate for text legibility (`--veil-*` knobs and the optional `--veil-feather` mask). No
break.

## 3.10.0

**v3.10.0** — two subpaths with no production consumer are removed outright (no aliases):
`@mkbabb/glass-ui/deck-progress` and `/instrument-rail`. Compose the equivalent from the
surviving primitives (`Progress`, `Section`, the `.glass-*` ladder, `InstrumentChassis`).
`/header-ribbon` and `/glass-panel` still ship at 3.10.0. New subpath:
`@mkbabb/glass-ui/underline` (`<GlassUnderline>`), which retires onto
`<HandMark shape="underline">` at 4.0.0 (see above).

## 2.0.0 — motion subpath surgery

**v2.0.0**—the motion composables move off the root barrel to the new
`@mkbabb/glass-ui/motion` flat subpath, so the root barrel no longer pulls in
`@mkbabb/keyframes.js`. See the **v2.0.0** section below for the full symbol list +
codemod hints. It is the same move v1.0 made for `@vueuse/core`.

---

v1.0 freezes the public API and lands four
architectural transpositions that BREAK v0.9.x consumer shapes:

1. **Root-barrel Phase 2**—vueuse-bearing symbols leave the root barrel; they
   live on explicit subpaths so bundlers can tree-shake them.
2. **`src/api/` discovery layer**—pure types + constants surface for "where
   do I import the type from?" discovery.
3. **Subpath flatten**—`composables/dark` + `composables/keyboard` collapse
   to flat `/dark` + `/keyboard`; new `/carousel` subpath added.
4. **Second-consumer fidelity**—substrate without ≥ 2 consumers either wires
   a real second consumer or retires.

v1.0 ships no legacy aliases and no backwards-compat shims.
Every break is documented below. v0.9.4 remains available indefinitely as a
patch-stream tag; v1.0 adoption is opt-in.

---

## At a glance

- Vueuse-bearing symbols (`Input`, `Textarea`, `Combobox*`, `Carousel*`,
  `useCarousel`, `useGlobalDark`, `useKeyboardShortcuts`, `registerShortcut`,
  ...) NO LONGER on the root barrel—use the named subpath.
- Nested `composables/dark` + `composables/keyboard` subpaths RETIRED—flat
  `/dark` + `/keyboard`.
- NEW `@mkbabb/glass-ui/carousel` subpath for `useCarousel` + `CarouselApi`.
- NEW `@mkbabb/glass-ui/api` subpath for canonical types + constants
  discovery (32 symbols).
- RETIRED composables: `useOffsetPagination`, `useVirtualSectionWindow`,
  `useWindowedStore`, `virtualSectionLayout` helpers. `/pagination` +
  `/virtual` subpaths gone.
- RETIRED primitive: demo-private `<DockShowcaseFrame>` (was never public
  surface).
- `src/composables/` restructured into coherent sub-trees
  (`dark/`, `keyboard/`, `reactive/`, `dom/`, `motion/`, `glass/`,
  `sidebar/`, `sortable/`)—affects deep relative imports only.
- Production demo build NOT shipped—`npm run build` is library-mode only.

Worked example: speedtest re-link commit `98f88325` migrated 15 src/ files
to the v1.0 subpath surface in ~30 minutes. Entry-chunk gz dropped 32.5 KB.

---

## Before you migrate

1. **Pin to v0.9.4 first** if you are on v0.9.0–v0.9.3. v0.9.4 patches the
   subpath-typing publication gap and lets you adopt subpath imports
   incrementally BEFORE the breaking v1.0 cut.
2. **Run your tests + typecheck** at v0.9.4. Establish a green baseline.
3. **Inventory your imports**—`rg 'from "@mkbabb/glass-ui"' src/` lists
   every root-barrel call site. Save the output; you will sweep it twice.
4. **Plan the cut as one commit per repo**—v1.0 is intentionally
   atomic. Mixing v0.9.x and v1.0 import shapes across files in the same
   commit makes review noisier than necessary.
5. **Read the Cohabitation note** below if you intend to stay on v0.9.4
   indefinitely. That path is supported.

---

## Breaking changes

### 1. Root-barrel curation (Phase 2 SCC trap closure)

The root barrel is now vueuse-free. Re-exporting these symbols from
`@mkbabb/glass-ui` forced every consumer to walk the vueuse SCC at
tree-shake time, regressing entry-chunk gzip by ~2 KB. Phase 2 carves them onto
subpaths.

#### 1.1—Form primitives → `/forms`

```ts
// Before
import { Input, Textarea, Combobox, ComboboxInput } from "@mkbabb/glass-ui";

// After
import { Input, Textarea, Combobox, ComboboxInput } from "@mkbabb/glass-ui/forms";
```

The `/forms` subpath was added at v0.9.3 and is preserved
verbatim at v1.0. Affected symbols: `Input`, `Textarea`, `Combobox`,
`ComboboxAnchor`, `ComboboxCancel`, `ComboboxEmpty`, `ComboboxGroup`,
`ComboboxInput`, `ComboboxItem`, `ComboboxItemIndicator`, `ComboboxList`,
`ComboboxSeparator`, `ComboboxTrigger`, `ComboboxViewport`.

Rationale: `Input` + `Textarea` import `useVModel` from `@vueuse/core`;
the `Combobox*` family imports `reactiveOmit`. Each is a vueuse-bearing
leaf; isolating them on `/forms` keeps the root barrel walk-free.

#### 1.2—Carousel → `/carousel`

```ts
// Before
import {
    Carousel, CarouselContent, CarouselItem,
    CarouselNext, CarouselPrevious, useCarousel,
} from "@mkbabb/glass-ui";
import type { CarouselApi } from "@mkbabb/glass-ui";

// After
import {
    Carousel, CarouselContent, CarouselItem,
    CarouselNext, CarouselPrevious, useCarousel,
} from "@mkbabb/glass-ui/carousel";
import type { CarouselApi } from "@mkbabb/glass-ui/carousel";
```

Affected symbols: `Carousel`, `CarouselContent`, `CarouselDots`,
`CarouselItem`, `CarouselNext`, `CarouselPager`, `CarouselPrevious`,
`GlassCarouselPager`, `useCarousel`, type `CarouselApi`.

Rationale: `useCarousel` imports `createInjectionState` from
`@vueuse/core`. The composable transitively taints every `Carousel*.vue`
in the package because they `inject` it. The whole family moves together.

The `/carousel` subpath is NEW at v1.0—v0.9.x consumers reached
`useCarousel` only via the root barrel.

#### 1.3—Dark-mode singleton → `/dark`

```ts
// Before
import { useGlobalDark } from "@mkbabb/glass-ui";

// After
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
```

Rationale: `useGlobalDark` composes `createGlobalState`, `useDark`,
`useToggle` from `@vueuse/core`. The `/dark` subpath is flat at v1.0
(the v0.9.4 nested form `composables/dark` is RETIRED—see §2).

#### 1.4—Keyboard registry → `/keyboard`

```ts
// Before
import {
    registerShortcut, useRegisteredShortcuts,
    formatCombo, formatComboParts, isMac, useKeyboardShortcuts,
} from "@mkbabb/glass-ui";
import type {
    ShortcutOptions, ShortcutCombo,
    RegisteredShortcut, ShortcutEventType,
} from "@mkbabb/glass-ui";

// After
import {
    registerShortcut, useRegisteredShortcuts,
    formatCombo, formatComboParts, isMac, useKeyboardShortcuts,
} from "@mkbabb/glass-ui/keyboard";
import type {
    ShortcutOptions, ShortcutCombo,
    RegisteredShortcut, ShortcutEventType,
} from "@mkbabb/glass-ui/keyboard";
```

Rationale: keyboard-shortcuts registry composes `createGlobalState` +
`useEventListener` from `@vueuse/core`. Same flatten as `/dark`.

#### 1.5—Codemod hints

Find every root-barrel call site that references a moved symbol:

```bash
# Inventory: which files import from the root barrel?
rg -l 'from "@mkbabb/glass-ui"' src/

# Of those, which import a moved symbol?
rg -l 'from "@mkbabb/glass-ui"' src/ \
  | xargs rg -l '\b(Input|Textarea|Combobox|Carousel|useCarousel|useGlobalDark|registerShortcut|useRegisteredShortcuts|formatCombo|formatComboParts|isMac|useKeyboardShortcuts)\b'
```

The mechanical rewrite is a per-symbol regex (run inside your editor or
via `sed -i`). Pattern shape:

```
# 1. Find imports that ONLY pull moved symbols → rewrite source
#    import { Input, Textarea } from "@mkbabb/glass-ui"
#    → import { Input, Textarea } from "@mkbabb/glass-ui/forms"

# 2. Find mixed imports → split the import statement
#    import { Button, Input } from "@mkbabb/glass-ui"
#    → import { Button } from "@mkbabb/glass-ui"
#      import { Input } from "@mkbabb/glass-ui/forms"
```

Speedtest's `98f88325` migration commit hand-rewrote 15 files in ~30
minutes without a scripted codemod—the breaks are mechanical enough
that an editor multi-cursor pass is the canonical workflow.

---

### 2. Subpath flatten (v0.9.4 transitional shapes retired)

v0.9.4 introduced nested `composables/dark` + `composables/keyboard`
subpaths as a transitional shape for the dts-publication-gap fix.
v1.0 flattens them to match every other public subpath
(`/forms`, `/dock`, `/configurator`, ...).

#### 2.1—`/composables/dark` → `/dark`

```ts
// Before (v0.9.4 only)
import { useGlobalDark } from "@mkbabb/glass-ui/composables/dark";

// After (v1.0)
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
```

#### 2.2—`/composables/keyboard` → `/keyboard`

```ts
// Before (v0.9.4 only)
import { registerShortcut } from "@mkbabb/glass-ui/composables/keyboard";

// After (v1.0)
import { registerShortcut } from "@mkbabb/glass-ui/keyboard";
```

Codemod:

```bash
rg -l '"@mkbabb/glass-ui/composables/(dark|keyboard)"' src/ \
  | xargs sed -i '' 's|@mkbabb/glass-ui/composables/dark|@mkbabb/glass-ui/dark|g; s|@mkbabb/glass-ui/composables/keyboard|@mkbabb/glass-ui/keyboard|g'
```

Trying the retired subpath at v1.0 fails with Node's standard package
exports gate:

```
$ node -e "import('@mkbabb/glass-ui/composables/dark')"
Error: ERR_PACKAGE_PATH_NOT_EXPORTED
```

That hard fail is intentional: no alias re-routes the nested form to the flat one.

---

### 3. Composable retirements (substrate-without-consumer binary)

v1.0 checked six composables for a real consumer. Three had one and stay; three
retired.

#### 3.1—`useOffsetPagination`—REMOVED

- **Status**: REMOVED in v1.0.
- **Reason**: 0 production consumers (no `src/` site; no speedtest site).
  Demo-only at v0.9.x.
- **Subpath retired**: `@mkbabb/glass-ui/pagination` (entry removed from
  `package.json` exports + typesVersions and from `vite.library.ts`).
- **Migration**: roll your own with `ref()` + a `fetchFn`-driven loader.
  The v0.9.3 reference at
  `src/composables/pagination/useOffsetPagination.ts` was 60 LOC and had
  no glass-ui-private substrate dependency. Copy from v0.9.3 source if
  you want the exact shape; or adopt an external library
  (`@tanstack/vue-query` if you need server-state coordination,
  `@vueuse/core`'s `useOffsetPagination` if you want a thin wrapper).

#### 3.2—`useVirtualSectionWindow`—REMOVED

- **Status**: removed in v1.0. It returned briefly in 4.1.0 and left the package
  again at 5.0.0; a reduced copy lives on as a demo-only facility.
- **Reason**: no production consumer. Demo-only at v0.9.x.
- **Subpath retired**: `@mkbabb/glass-ui/virtual` (re-added in 4.1.0, removed again
  at 5.0.0).
- **Migration**: no Glass package replacement exists. Product consumers own
  their windowing or choose a dedicated virtualizer.

#### 3.3—`useWindowedStore`—REMOVED

- **Status**: removed in v1.0; it returned briefly in 4.1.0 and was deleted again at
  5.0.0.
- **Reason**: no production consumer and no demo consumer.
- **Subpath retired**: `@mkbabb/glass-ui/virtual` (shared with
  `useVirtualSectionWindow`) remains absent.
- **Migration**: keep your own implementation; Glass provides no alias or forwarding
  coordinate.

#### 3.4—`virtualSectionLayout` helpers—REMOVED

- **Status**: removed from the package surface; the unchanged demo fixture lives
  at `demo/composables/virtual/virtualSectionLayout.ts`.
- **Affected exports**: `buildSectionLayout`, `findSectionOffset`,
  `resolveActiveSection`, `resolveSectionWindow`, plus the
  `FlatSection`, `SectionLayout`, `SectionWindowRange`, and
  `ForcedSectionWindowRange` types.
- **Reason for the v1.0 removal**: support substrate for
  `useVirtualSectionWindow`; retired with its parent. `findSectionOffset` is
  refined to a binary search over a by-id-sorted view (the words copy
  linear-scanned; the offset answer is byte-identical), and `FlatSection`
  now shares the four hierarchy fields with the sidebar's `TreeIndexEntry`
  via the `SectionHierarchy` base (no redeclared fields).
- **Migration**: no package import exists; the helpers are demo infrastructure.

#### Composables KEPT (cross-repo wired)

The substrate-without-consumer audit retained three motion composables
because speedtest consumes them in production:

| Composable | Speedtest consumer | Disposition |
|---|---|---|
| `useRAFLoop` | `src/components/speedtest/composables/useMeterRenderer.ts` (canvas render loop) | WIRED |
| `useIntersectionPause` | `src/composables/useAuroraPolicy.ts` (reduced-motion + visibility gating) | WIRED |
| `useDarkModeSync` | `src/components/speedtest/SpeedtestMeter.vue` + `src/components/dashboard/composables/useEChartsTheme.ts` | WIRED |

All three remain on `@mkbabb/glass-ui` (vueuse-free) via
`src/composables/motion/`. Each has a demo story under
`demo/stories/composables/`. No consumer-side migration required.

---

### 4. Primitive retirements

#### 4.1—`<DockShowcaseFrame>`—REMOVED

- **Status**: REMOVED in v1.0 (demo file deleted).
- **Reason**: a demo-private chassis with no consumer besides its own file.
- **Public-surface impact**: NONE. The component was never on the
  library public surface—it was a demo-private chassis primitive.
  No `src/` source / barrel / package.json export changes.
- **Migration**: dock-tier demos compose `<ShowcaseFrame>` (canonical
  demo chassis) directly, OR raw chassis recipes:

  ```vue
  <div class="rounded-[var(--radius-card)] border border-border/40 bg-card/40 shadow-cartoon">
      <!-- dock content -->
  </div>
  ```

#### Primitives KEPT (2nd consumer wired)

v1.0 wired second consumers for three primitives that had one:

- **`<DiscoGlyph>`**—2nd consumer at
  `demo/stories/foundations/chart-chassis-palette.vue` (chart-token
  facet-swatch row).
- **`<DockGroup>`**—2nd consumer at
  `demo/stories/compositions/dashboard.vue` (KPI pill-row shelf).
- **`<InstrumentChassis>`**—2nd consumer at
  `demo/stories/foundations/chart-chassis-palette.vue` (live
  mini-chassis below the chassis-tier-tokens ladder).

No consumer-side change. All three remain exported via the root barrel
(`@mkbabb/glass-ui`) AND their per-package subpaths.

---

### 5. Composables restructure (internal re-org)

v1.0 restructured `src/composables/` into coherent sub-trees.
**This affects you ONLY if you import directly from a deep relative
path** (e.g., `@mkbabb/glass-ui/src/composables/useTimer`). The public
surface (`@mkbabb/glass-ui` root barrel + named subpaths) is unchanged
for KEPT composables.

| v0.9.x relative path | v1.0 relative path |
|---|---|
| `composables/useGlobalDark` | `composables/dark` |
| `composables/useKeyboardShortcuts` | `composables/keyboard` |
| `composables/useInterval` | `composables/reactive/useInterval` |
| `composables/useTimer` | `composables/reactive/useTimer` |
| `composables/useResizeObserver` | `composables/dom/useResizeObserver` |
| `composables/useTouchGate` | `composables/dom/useTouchGate` |
| `composables/useTokenColor` | `composables/dom/useTokenColor` |
| `composables/useStagger` | `composables/motion/useStagger` |
| `composables/useStoryDemo` | (moved to `demo/composables/useStoryDemo`—demo-private) |

Resulting tree:

```
src/composables/
├── dark/         useGlobalDark
├── keyboard/     useKeyboardShortcuts + family
├── reactive/     useInterval, useTimer
├── dom/          useResizeObserver, useTouchGate, useTokenColor
├── motion/       useScrollProgress, useSpringOrchestrator, useStaggerReveal,
│                 useAnimatedNumber, useAnimatedNumberMap, useDarkModeSync,
│                 useRAFLoop, useIntersectionPause, useStagger
├── glass/        useGlassRenderer + webgl/ + webgpu/
├── sidebar/      useSidebarState, useSidebarFollow, useScrollTracker, useTreeIndex
├── sortable/     useSortable
└── index.ts      (sub-tree re-exports)
```

Recommended: stop reaching for deep relative paths; the public surface
(`@mkbabb/glass-ui` root barrel + the dedicated subpaths) is the
canonical import shape.

---

## New surfaces in v1.0

### `@mkbabb/glass-ui/api`—type + constant discovery layer

32 canonical public symbols (28 types + 4 runtime constants) re-exported
from their existing homes. Recommended for consumer-side type discovery
without coupling to a specific component's runtime entry point:

```ts
import type {
    AuroraConfig, AuroraNucleus, AuroraFlow, AuroraInstance,
    AuroraRuntimeOptions, AuroraRuntimeMode,
    FlowPattern, OklchStop, StrokeMode, WarpMode,
    ConfiguratorPreset, ConfiguratorState, ConfiguratorStateOptions,
    ConfiguratorScrollMode,
    CardTier, InstrumentChassisPhase, ToastVariant,
    AlertVariants, AvatarVariants, BadgeVariants, ButtonVariants,
    SheetVariants, SliderVariants, ToggleVariants, ToggleChipVariants,
} from "@mkbabb/glass-ui/api";

import {
    DEFAULT_AURORA_CONFIG,
    MAX_NUCLEI, MAX_STOPS,
} from "@mkbabb/glass-ui/api";
```

The `/api` subpath has zero JS payload for types-only consumers—all 28
type aliases erase at build, leaving only the 4 constants in the runtime
chunk. Use it freely for prop-forwarding wrappers, fixture typings, and
union narrowing.

### `@mkbabb/glass-ui/carousel`

New at v1.0. See §1.2 above.

### `useConfiguratorState` gained `cloneMode` option

`useConfiguratorState<T>(options)` accepts a new `cloneMode?: "commit-on-write" | "per-preset"` option (default `"commit-on-write"`—unchanged behaviour for existing consumers).

```ts
import {
    useConfiguratorState,
    type ConfiguratorCloneMode,
} from "@mkbabb/glass-ui/configurator";

// per-preset: edits persist per-slot across preset switches.
const studio = useConfiguratorState<MyConfig>({
    presets,
    initialPreset: "default",
    cloneMode: "per-preset",
});
```

Aurora's per-preset clone semantics now route through the canonical primitive; `useAuroraStudio` was demo-private and retired. `cyclePreset` also accepts an optional `direction?: 1 | -1` (default `1`) so consumers can map `ArrowLeft` / `ArrowRight` keyboard handlers cleanly. Purely additive—no consumer migration required.

---

## v2.0.0—Motion subpath surgery

The root barrel statically reached `@mkbabb/keyframes.js`
through `composables/motion`, which forced every consumer's entry chunk to
carry the ~102 KB raw / ~34 KB gz `keyframes-*.js` chunk even when the
consumer only imported `<Card>` or `<Button>`. The motion composables now
live on the `@mkbabb/glass-ui/motion` flat subpath. The root barrel is
keyframes.js-free.

The shape mirrors the v1.0 move that carved `/dark`, `/keyboard`, and `/carousel`
off the root barrel for the vueuse-bearing surface. Same precedent, different heavy
peer.

### Symbols moved—root barrel → `/motion`

```ts
// Before (≤ v1.9.x)
import {
    Card,
    DAMPING,
    SNAP_THRESHOLD,
    useAnimatedNumber,
    useAnimatedNumberMap,
    useSpringOrchestrator,
    useStagger,
    useStaggerReveal,
    useScrollProgress,
    useRAFLoop,
    useIntersectionPause,
    installDarkModeSync,
    type RAFLoopTiming,
    type PausableRuntime,
} from "@mkbabb/glass-ui";

// After (≥ v2.0.0)—split the import statement
import { Card } from "@mkbabb/glass-ui";
import {
    DAMPING,
    SNAP_THRESHOLD,
    useAnimatedNumber,
    useAnimatedNumberMap,
    useSpringOrchestrator,
    useStagger,
    useStaggerReveal,
    useScrollProgress,
    useRAFLoop,
    useIntersectionPause,
    installDarkModeSync,
    type RAFLoopTiming,
    type PausableRuntime,
} from "@mkbabb/glass-ui/motion";
```

### Symbols inventory

The following 11 runtime exports + 2 type exports move from root → `/motion`:

| Symbol | Kind |
|---|---|
| `useSpringOrchestrator` | composable (keyframes.js `NumericAnimation`) |
| `useAnimatedNumber` | composable (keyframes.js `SmoothProgress`) |
| `useAnimatedNumberMap` | composable (depends on `useAnimatedNumber`) |
| `useStagger` | composable (timer-driven; no keyframes reach but rides the same barrel) |
| `useStaggerReveal` | composable (IO-driven; same) |
| `useScrollProgress` | composable (scroll-driven; same) |
| `useRAFLoop` | composable (rAF wrapper; same) |
| `useIntersectionPause` | composable (IO + animation pause; same) |
| `installDarkModeSync` | composable (motion engine ↔ dark-mode bridge) |
| `DAMPING` | constant |
| `SNAP_THRESHOLD` | constant |
| `RAFLoopTiming` | type |
| `PausableRuntime` | type |
| `UseAnimatedNumberOptions` | type (also reachable via `/api`) |
| `SpringSnapshot` | type (also reachable via `/api`) |

### Why the entire motion barrel moves (not just the keyframes-touching subset)

Only `useSpringOrchestrator` + `useAnimatedNumber` (and `useAnimatedNumberMap`
transitively) statically reach `@mkbabb/keyframes.js`. The rest of the motion
sub-tree (`useStagger`, `useStaggerReveal`, `useScrollProgress`, `useRAFLoop`,
`useIntersectionPause`, `installDarkModeSync`) is keyframes-free. Conceptually
the keyframes-free composables could stay on the root barrel.

In practice the sub-tree's `index.ts` rolls up every leaf with `export *`, so
Rollup walks the entire sub-tree as one SCC at root-barrel build time. Either
the whole sub-tree moves or none of it does — splitting it would require a
second internal sub-barrel (`motion-keyframes/` vs `motion-pure/`), which is
the wrong shape. The motion subpath is the canonical home for every kinetic
composable; consumers reach `/motion` for any kinetic primitive regardless of
whether that specific primitive happens to touch the engine today.

### Codemod hints

```bash
# Find every site that needs migration:
rg 'from "@mkbabb/glass-ui"' src/ | rg 'useStagger|useAnimatedNumber|useSpringOrchestrator|useStaggerReveal|useScrollProgress|useRAFLoop|useIntersectionPause|installDarkModeSync|DAMPING|SNAP_THRESHOLD|RAFLoopTiming|PausableRuntime'
```

For mixed imports (e.g. `import { Card, useAnimatedNumber } from "@mkbabb/glass-ui"`),
split into two import statements: `Card` stays on root, the motion symbols
move to `/motion`. There is no auto-codemod shipped — the diffs are mechanical
1-line edits per site and easier to apply by hand than to write a robust
transform for (the import-statement-splitting case requires AST awareness).

### Verification

After the migration, `dist/glass-ui.js` must NOT contain a static import of
`@mkbabb/keyframes.js`. Verify with:

```bash
grep -c "@mkbabb/keyframes" node_modules/@mkbabb/glass-ui/dist/glass-ui.js
# Expected: 0
grep -c "@mkbabb/keyframes" node_modules/@mkbabb/glass-ui/dist/motion.js
# Expected: ≥ 1 (NumericAnimation + SmoothProgress reach)
```

Consumer bundle graphs should show the `keyframes-*.js` chunk dropping off
routes that don't use motion composables. The carry retires per route.

### No back-compat shim

v2.0.0 ships no root-barrel alias for the moved symbols. Pinning to `^1.9.3` remains supported on the v1.x patch stream if a
consumer cannot migrate immediately.

---

## v3.0.0—`/motion-core` engine-free carve

v2.0.0 moved the whole motion sub-tree onto `/motion` on the theory that "the
bundler walks the sub-tree's `export *` chain as one SCC anyway" — so splitting
keyframes-touching from keyframes-adjacent leaves "would be a fictitious
distinction" (the v2.0.0 §"Why the entire motion barrel moves" rationale above).
**That premise is overturned by consumer measurement.** A cheap path touching
ZERO keyframes (e.g. importing only `useIntersectionPause`) still dragged the
~125 KB `@mkbabb/keyframes.js` engine onto the eager graph, because the joined
barrel is what makes the SCC, not the leaves — the leaves split cleanly.

v3.0.0 breaks the barrel. The keyframes-BEARING leaves stay on `/motion`; the
keyframes-FREE leaves carve out to a new flat sibling `@mkbabb/glass-ui/motion-core`
(keyframes-free AND vueuse-free); the keyframes-free-but-vueuse-bearing
`installDarkModeSync` relocates to `@mkbabb/glass-ui/dark` (it reads
`useGlobalDark`, so it is topically a dark-mode leaf). `dist/motion-core.js`
reaches neither heavy peer; `dist/motion.js` keeps the engine.

### Rename table (no alias — inv 47)

| Symbol | Old path | New path |
|---|---|---|
| `useStaggerReveal` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/motion-core` |
| `useScrollProgress` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/motion-core` |
| `useRAFLoop`, `RAFLoopTiming` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/motion-core` |
| `useIntersectionPause`, `PausableRuntime` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/motion-core` |
| `useStagger` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/motion-core` |
| `DAMPING`, `SNAP_THRESHOLD` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/motion-core` (also still on `/motion`) |
| `installDarkModeSync` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/dark` |
| `useSpring`, `useSpringMount`, `useSpringPress`, `useNumericTransition`, `useAnimatedNumber`, `useAnimatedNumberMap` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/motion` (unchanged) |

`DAMPING` + `SNAP_THRESHOLD` resolve identically from either path (the same
pure-data `constants` module is duplicate-exported on both barrels because the
bearing leaves read them). `RAFLoopTiming` + `PausableRuntime` are type-only
relocations — no bearing leaf references them, so they move with their leaves to
`/motion-core` and drop from `/motion`'s type surface.

### Example

```ts
// Before (v2.0.0–v2.x)
import {
    useIntersectionPause,
    useScrollProgress,
    DAMPING,
    installDarkModeSync,
    type PausableRuntime,
} from "@mkbabb/glass-ui/motion";

// After (≥ v3.0.0)
import {
    useIntersectionPause,
    useScrollProgress,
    DAMPING,
    type PausableRuntime,
} from "@mkbabb/glass-ui/motion-core";
import { installDarkModeSync } from "@mkbabb/glass-ui/dark";
```

The keyframes-bearing imports (`useSpring*`, `useNumericTransition`,
`useAnimatedNumber*`) stay on `@mkbabb/glass-ui/motion` unchanged.

### Verification

```bash
grep -c "@mkbabb/keyframes\|@vueuse/core" node_modules/@mkbabb/glass-ui/dist/motion-core.js
# Expected: 0 (both heavy peers absent — engine-free + vueuse-free)
grep -c "@mkbabb/keyframes" node_modules/@mkbabb/glass-ui/dist/motion.js
# Expected: ≥ 1 (the engine still resolves on /motion)
```

### No back-compat shim

`/motion` ships no alias for the carved symbols.
Consumers rename per call site (the diffs are mechanical 1-line edits).

---

## v1.2.1—Aurora init fail-explicit

Library-internal contract violations now throw, while browser-API degradation paths
keep a silent fallback, so `<Aurora>` init failure is now **fail-explicit**.

### Before (≤ v1.2.0)

```ts
// useAurora's onMounted try/catch:
try {
    inst = createAurora(canvas, getCfg(), runtimeOptions);
} catch (err) {
    console.warn("[Aurora]", err);   // silent—surface renders nothing
    return;
}
```

A `createAurora` failure (WebGL2 unavailable, shader compile/link failure)
logged a warning to the console and rendered an empty `<canvas>`. The
consumer received no surface signal beyond the dev-console warn.

### After (≥ v1.2.1)

`createAurora` is glass-ui-internal; its failure is an internal contract
violation. The composable now rethrows by default so the failure surfaces to
the consumer's error boundary (or dev console as an uncaught exception). To
opt back into the prior silent-warn behaviour, pass `onInitError`:

```vue
<template>
    <Aurora
        :config="auroraConfig"
        :on-init-error="(err) => console.warn('[Aurora]', err)"
    />
</template>
```

The callback is invoked with the caught `Error`; the canvas stays unmounted
(matching the prior silent-fallback shape). The prop is also threadable via
`runtimeOptions.onInitError` for consumers passing a fully-composed
`AuroraRuntimeOptions` object (e.g. thumbnail-baking pipelines):

```ts
import type { AuroraRuntimeOptions } from "@mkbabb/glass-ui/api";

const runtimeOptions: AuroraRuntimeOptions = {
    mode: "capture",
    preserveDrawingBuffer: true,
    onInitError: (err) => myErrorBus.report("aurora-init", err),
};
```

The top-level prop wins when both are set.

### Why the change

The rule is:

- Library-internal contract (shader compile / factory init / WebGL2 unavailable)
  → throw.
- Browser-API degradation (pointer-capture failure / reduced-motion preference)
  → silent fallback with rationale.

Silent-warn concealed bugs in shader edits, masked WebGL2-context-cap
exhaustion (Chromium ~8/page), and left consumers debugging "why is my canvas
blank" without a signal. The throw forces the bug to the surface where the
consumer can decide how to handle it.

### Migration cost

`grep` your codebase for `<Aurora` and `useAurora(`:

- If you depend on the prior render-nothing-and-warn behaviour, add
  `onInitError={(err) => console.warn("[Aurora]", err)}` to your `<Aurora>`
  call site.
- If you have an error boundary upstream and want the failure to surface
  there, no change needed.

---

## v1.3.0—`avatarVariant` → `avatarVariants`

Renamed for consistency with the other variants constants in the library
(`buttonVariants`, `toggleVariants`, `badgeVariants`, `sliderVariants`, ...).
The singular `avatarVariant` was the only
non-pluralized CVA constant in the codebase. One-line consumer migration:

```ts
// Before
import { avatarVariant } from "@mkbabb/glass-ui";
// After
import { avatarVariants } from "@mkbabb/glass-ui";
```

The `AvatarVariants` type alias is unchanged.

---

## v1.3.0—`useDarkModeSync` → `installDarkModeSync`

Renamed because the composable doesn't follow the canonical `useFoo`
contract—it returns `void` after installing a `watch` side-effect.
The new name names the side-effect plainly (it installs a sync between
two darkness sources; it does not return a reactive handle). One-line
consumer migration:

```ts
// Before
import { useDarkModeSync } from "@mkbabb/glass-ui";
useDarkModeSync(localIsDark);
// After
import { installDarkModeSync } from "@mkbabb/glass-ui";
installDarkModeSync(localIsDark);
```

---

## Metric consolidation (7.0.0)

The three parallel metric packages are replaced by one static numeric-readout family.
`MetricBadge` becomes `Metric`; `MetricCell`, `MetricRow`, and `MetricStack` retain their
general roles without the former status, phase, animation, fixed-row, or presentation
matrix. There are no aliases or compatibility barrels.

```ts
import { Metric, MetricCell, MetricRow, MetricStack } from "@mkbabb/glass-ui/metric";
```

Consumers keep phase color, animation, result state, and layout composition locally.
Finite values including `0` and `-0` remain real; blank, absent, and non-finite values
use the placeholder. Loading masks any present value behind one stable ellipsis and marks
the owning static readout `aria-busy`.

---

## Recommended new surfaces (best-practice, not strict migration)

Even where a root-barrel import still works at v1.0, prefer per-package
subpaths for better tree-shake granularity:

```ts
// Works at v1.0, but is broad—pulls the whole glass-ui root chunk.
import { GlassDock, Configurator } from "@mkbabb/glass-ui";

// Better—pulls only what you need.
import { GlassDock } from "@mkbabb/glass-ui/dock";
import { Configurator, useConfiguratorState } from "@mkbabb/glass-ui/configurator";
```

Speedtest's re-link did NOT make this best-practice rewrite (it kept
root-barrel imports for non-vueuse-bearing symbols) and still saw the
-32.5 KB entry-chunk gz drop. Per-package subpath imports are an
incremental polish above that baseline.

### Adaptive glass over light — the self-engage default + the sampled observer

Glass surfaces (the dock + the `.glass-card`/`.glass-resting`/`.glass-quiet`/`.glass-wash`
content tiers + the overlay band) now **self-darken over light backdrops by default** —
the W54 glass-first MAXIMAL register made legible over the common bright-content case, no
consumer opt-in. The dock additionally wires the iOS-27 **sampled-luminance observer** ON
by default (`useGlassBackdropLuminance`), which dynamically tracks a live/animated backdrop
and writes `--glass-backdrop-luma` + the `--glass-backdrop` bucket on the dock root.

This is additive (no break). A **dark-substrate consumer** whose backdrop is already dark
(so the warm-ink darken is unwanted) opts out per-surface:

```css
/* The pristine un-tinted plate on a known-dark surface (the documented opt-out). */
.my-dark-surface .glass-card { --glass-tint-strength: 0%; }
```

```vue
<!-- The dock over a known-dark substrate — disable the sampled observer + the darken. -->
<GlassDock :auto-luminance="false" style="--glass-tint-strength: 0%" />
```

The observer is DEMO-PRIVATE (not on the public glass barrel) — it is wired internally for
the dock; a downstream surface that needs the same dynamic sampling triggers the public
barrel promotion (`docs/consumer-evidence/use-glass-backdrop-luminance.md`).

---

### The luminous-dark transmissive material + the calm-light recalibration

The DARK register was rebuilt as a luminous transmissive material, and the LIGHT
content-tier self-engage was recalibrated. Both are **token-identity evolutions, NOT
breaking aliases** (the lib's own default tokens evolve as the lib's identity changes —
presets-in-consumers; no clean-break migration, no codemod).

**1 — The calm-light recalibration (no more gray slab).** The content tiers
(`.glass-card`/`.glass-resting`/`.glass-quiet`/`.glass-wash`) no longer apply the full 20%
AA darken UNCONDITIONALLY — over a plain LIGHT page they self-engage only a sub-perceptual
`--glass-tint-strength-floor` (4%), so a calm-light card stays a translucent WARM cream
(was: a flat gray slab). The FULL AA darken on a content tier now engages only under the
declared/sampled BRIGHT signal (`--glass-backdrop: light` / the observer). A consumer whose
light-page card was relying on the unconditional 20% darken (rare) declares the bright
signal on an ancestor; a consumer who wants a content card flat opts out as before:

```css
/* A calm light page where the card should stay warm needs NOTHING (the new default).
   To FORCE the full darken on a content card over a known-bright surface: */
.my-bright-region { --glass-backdrop: light; }

/* The pristine un-tinted plate (unchanged opt-out). */
.my-surface .glass-card { --glass-tint-strength: 0%; }
```

**2 — Dark `--primary` is now chromatic.** The dark-mode `--primary` evolved off the
achromatic cream `hsl(48 10% 90%)` onto the brand legendre-violet `oklch(0.739 0.134 318.1)`
(a library-identity hue). Every filled/active/selected control reading `--primary` in dark
(Slider range, Badge `default`, Switch checked, Checkbox accent) now carries the brand
chroma instead of a flat pale-grey slab. The dark `--primary-foreground` is unchanged
(`hsl(24 10% 10%)`, clears 7.15:1 over the new accent). A consumer who OVERRODE the dark
`--primary` (presets-in-consumers) re-pins their own value in `:root`/`.dark` — no action
otherwise.

**3 — The `--surface-tint-*` family gained a dark arm.** In dark the family now mixes
toward a light ink (`hsl(48 12% 96%)`) so chip backplates / hairlines / the dock-rail
divider / the timeline dot read against the near-black card (was: invisible — collapsed
into the plate). The light arm + the in-srgb interpolation are UNCHANGED. Every `--surface-tint-*` consumer re-resolves automatically — no per-site edit.

### The warm-chroma floor — the neutral ladder + glass plate off gray

The `--neutral-*` ladder + the `--card` glass plate were re-saturated onto the warm
identity, off gray. This is a **token-identity evolution, NOT a breaking alias**
(the library's own default tokens evolve as its identity changes; no migration, no
codemod). The ladder was SPECIFIED warm (hue 48) but RESOLVED
achromatic — at the library's low saturation it painted a yellow-green gray (OKLab hue ~95°,
chroma below the perceptual floor). The values evolve, both modes in lockstep:

| token | was (hsl) | now (hsl) |
|---|---|---|
| `--neutral-0` (page) | `48 12% 98%` / dark `24 9% 4%` | `40 30% 98%` / dark `24 9% 4%` (KEEP) |
| `--neutral-1` | `48 10% 95%` / dark `24 6% 11%` | `38 26% 95%` / dark `28 12% 11%` |
| `--neutral-2`/`--secondary` | `48 9% 90%` / dark `24 5% 16%` | `34 28% 90%` / dark `28 14% 16%` |
| `--neutral-3`/`--accent` | `48 8% 82%` / dark `24 5% 22%` | `33 30% 82%` / dark `30 18% 22%` |
| `--neutral-4`/`--border`/`--input` | `48 7% 70%` / dark `24 5% 34%` | `32 26% 70%` / dark `30 16% 34%` |
| `--neutral-5`/`--muted-foreground` | `48 6% 40%` / dark `48 5% 62%` | `30 22% 40%` / dark `34 14% 62%` |
| `--neutral-6` (strong-muted) | `48 7% 30%` / dark `48 6% 72%` | `28 24% 30%` / dark `36 14% 72%` |
| `--card` (glass plate) | `var(--neutral-0)` / dark `24 8% 16%` | `36 48% 97%` / dark `24 8% 16%` (KEEP) |
| `--glass-border-*` rim α | wash 8% → overlay 18% | wash 11% → overlay 22% (warmer rim) |

The moves are **chroma-only at constant L** — the L (and therefore every AA contrast ratio)
is preserved to within ±0.005. **`--card` now decouples from
`--neutral-0`** (a glass plate reads warm-cream over a flat backdrop, the page stays calm
surface). A consumer who OVERRODE any `--neutral-*` rung or `--card` (presets-in-consumers)
RE-PINS their own value in `:root`/`.dark` — those overrides win as before; no action
otherwise (every semantic alias `--secondary`/`--accent`/`--border`/`--muted-foreground`
still tracks the ladder, so a consumer reading those gets the warm value automatically). The
`--surface-tint-*` in-srgb family + the KEEP-NEUTRAL registers (`--warning-foreground`,
`--overlay-scrim-ink`, the shadow ink) are UNCHANGED.

```css
/* A consumer who hand-tuned a neutral re-pins their value (it still wins): */
:root { --neutral-4: hsl(30 6% 72%); }   /* your border override, unchanged behaviour */
/* A consumer who wants the prior achromatic plate re-pins --card: */
:root { --card: var(--neutral-0); }       /* opt back to the page-tracking plate */
```

---

### The scroll-state edge fade — `.scroll-fade-*` → `<FadingScroll>` + `--mask-fade-width` → `--fade-scroll-width`

The scroll-BLIND static `.scroll-fade-mask` / `.scroll-fade-y` / `.scroll-fade-top` /
`.scroll-fade-bottom` mask utilities are SUPERSEDED by the scroll-state-driven
`<FadingScroll>` primitive (`@mkbabb/glass-ui/fading-scroll`, axis `x`|`y`). The static
masks feathered BOTH edges unconditionally with no scroll knowledge — so the first card's
chrome was half-erased at `scroll = 0`. `<FadingScroll>` feathers
the start edge ONLY past `scroll > 0` and the end edge ONLY while trailing overflow remains.
This is a **CLEAN BREAK — no alias** (the static utilities + the `--mask-fade-width` token
were removed at 4.1.0).

| was | now |
|---|---|
| `<div class="… overflow-x-auto scroll-fade-mask">` | `<FadingScroll axis="x" class="…">` (root is the scroll port) |
| `<div class="… overflow-y-auto scroll-fade-y">` | `<FadingScroll axis="y" class="…">` |
| `.scroll-fade-top` / `.scroll-fade-bottom` (one-sided V) | `<FadingScroll axis="y" :fade-start="false">` / `:fade-end="false"` |
| `--mask-fade-width: 1rem` (token) | `--fade-scroll-width: 1rem` (token — same default, inheriting) |

```vue
<!-- before -->
<div class="flex gap-2 overflow-x-auto scroll-fade-mask scrollbar-hidden">…</div>
<!-- after -->
<FadingScroll axis="x" class="flex gap-2 scrollbar-hidden">…</FadingScroll>
```

When wrapping the scroll port in a `<FadingScroll>` node would re-parent a load-bearing
anchor (e.g. a `position-anchor` indicator on the scroll container root), call the composable
form on the existing element instead — no extra DOM node:

```ts
import { useFadingScroll } from "@mkbabb/glass-ui/fading-scroll";
useFadingScroll(containerRef, { axis: "x" });   // writes --fade-start/--fade-end on the root
// + the container carries `fading-scroll fading-scroll--x` + the data-fade-* attrs
```

A consumer who overrode `--mask-fade-width` (`:root { --mask-fade-width: 0.5rem }`) re-pins
`--fade-scroll-width` instead. The native `scroll(self)` timeline is the primary path
(zero JS on a supporting engine); the `useFadingScroll` JS fallback covers older engines
automatically. The fade does NOT vanish under `prefers-reduced-motion: reduce` (it is a
legibility cue, not motion — it stops interpolating, the discrete edge presence stays).

---

### The disco CTA register retired — `btn-audacious` / `btn-audacious-gold` GONE

The user removed the "disco effect" wholesale. The `@utility btn-audacious` + `@utility btn-audacious-gold`
recipes (the sparkle `✦` glyph, the disco-grain hover, the gold-sweep shimmer, the typed press-ripple)
and their `@keyframes sparkle-sweep` / `btn-gold-bg-sweep` + the `--duration-sparkle` /
`--glass-grain-opacity-disco` / `--ripple-radius-max` / `--motion-duration-ripple` knobs are **DELETED —
clean break, no alias**. The `primary-audacious` / `gold-audacious` Button
**variant keys are KEPT and re-pointed** onto the calm glass-first register (gold survives,
calm), so a `<Button variant="primary-audacious">` / `variant="gold-audacious">` call site needs
**no change** — it inherits the new register automatically. Only a consumer that applied the `btn-audacious`
_utility class directly_ (not via the variant) must migrate.

| was | now |
|---|---|
| `class="btn-audacious"` (the disco utility, applied directly) | the calm glass register — `class="glass-wash btn-glass text-foreground"` (the `--glass-specular` edge gleam + the §6 hover/press) |
| `class="btn-audacious btn-audacious-gold"` (the gold sweep) | `<Button variant="gold-audacious">` (the calm glass + STATIC `--color-gold` tint + specular, no animated sweep) — or a hand-authored `class="glass-wash btn-glass"` + a static `bg-[linear-gradient(135deg,color-mix(in srgb,var(--color-gold) 10%,transparent),…)]` tint |
| `<Button variant="primary-audacious">` | **unchanged** — the variant key re-points to the calm glass CTA |
| `<Button variant="gold-audacious">` | **unchanged** — the variant key re-points to the calm gold-glass CTA |
| `@keyframes sparkle-sweep` / `btn-gold-bg-sweep`, `--duration-sparkle`, `--glass-grain-opacity-disco`, `--ripple-radius-max`, `--motion-duration-ripple`, `@property --ripple-radius` | RETIRED (no surviving consumer) |

The dock-tab PRIMARY tier (`<DockTabButton data-tier="primary">`) no longer auto-attaches `btn-audacious` or
paints the phase-grain hover/halo — it reads the plain de-red'd dock-control glass hover register. The
`data-tier="primary"` styling hook is **unchanged** (the taller/wider structural shell stays); only the disco
accents drop. Any direct `btn-audacious` class binding migrates to the calm glass register per the
table; the `gold-audacious` / `primary-audacious` _variant_ consumers are untouched. This is a
**breaking change for direct-utility consumers**, one reason the release is 4.0.0.

### Per-spring duration clock minted — `--spring-<name>-duration`

ADDITIVE — no migration required. `--spring-<name>-duration` (generated from the `(response, ζ)` SPRING_PRESETS
table: smooth 0.36s / snappy 0.34s / bouncy 0.69s / gentle 0.44s / dock 0.28s) is the spring's OWN settle clock.
A `transition` that pairs `--spring-<name>` with a generic `--duration-*` now re-points to the matching
`--spring-<name>-duration` so the spring plays at its physical settle (the prior generic clock dragged a dead
sub-pixel tail). A consumer reading `var(--spring-snappy)` directly gains the option of `var(--spring-snappy-duration)`
for the matched clock; the existing generic-clock pairings still work.

---

## Cohabitation note—v0.9.4 stays supported

v0.9.4 remains available indefinitely as a v0.9.x patch-stream tag.
v1.0 adoption is opt-in. If you cannot migrate immediately:

- Pin to `^0.9.4` in `package.json`.
- The subpath typing-publication gap is patched at v0.9.4—you can
  adopt subpath imports incrementally (`@mkbabb/glass-ui/forms`,
  `@mkbabb/glass-ui/composables/dark`, etc.) without breaking your
  existing root-barrel calls.
- When you DO migrate to v1.0, the v0.9.4 subpath adopters have fewer
  call sites to rewrite—only the nested `composables/{dark,keyboard}`
  → flat `/dark` + `/keyboard` shape changes.

There is no scheduled v0.9.4 EOL. The patch line is frozen but not
retired.

---

## Worked example—speedtest re-link

Speedtest re-linked from v0.9.3 (root-barrel imports) directly to v1.0
in commit `98f88325` (`feat(deps): adopt glass-ui v1.0`). The diff
touched 15 src/ files:

| Pattern | Sites | Time to rewrite |
|---|---|---|
| `Input` + `Textarea` → `/forms` | 10 sites | ~10 min (multi-cursor pass) |
| `useGlobalDark` → `/dark` | 2 sites | ~2 min |
| `registerShortcut` → `/keyboard` | 2 sites (incl. 1 test mock) | ~2 min |
| Build + typecheck + lighthouse re-probe | — | ~15 min |

Observed deltas in that app:

| Indicator | Pre-v1.0 | Post-v1.0 | Delta |
|---|---|---|---|
| `dist/index.html` modulepreload directives | 1 | 0 | canonical SCC closure |
| Entry chunk gz | ~204 KB | 171.5 KB | -32.5 KB |
| Glass-ui `dist/glass-ui.js` gz | 33.6 KB | 22.4 KB | -11.2 KB |
| Glass-ui `dist/glass-ui.js` raw | 189 KB | 124.8 KB | -65 KB |
| Subpath dts publication (`/dark`, `/keyboard`, `/api`, `/carousel`) | broken | self-contained | gap closed |

Speedtest build PASS in 9.83s. Consumer-side vue-tsc resolution clean.

---

## Production demo build—formal retire

`npm run build` is library-mode only—it produces the `dist/glass-ui.{js,css,d.ts}`
bundle plus the per-subpath dist artefacts. There is NO `vite.demo.config.ts`
that produces a static demo build artefact.

**Disposition**: the demo is retired as a production deploy target. Rationale:

- The demo storybook is dev-mode-only—the canonical workflow is `npm run dev`
  → Vite dev server.
- Lighthouse audits run against the dev server with the documented dev-mode
  caveat.
- Consumer-deploy concerns (CloudFlare Pages, Vercel, GitHub Pages hosting,
  cache-TTL, etc.) are out of glass-ui scope—they belong to consumer repos
  (speedtest is the canonical reference for demo build chains).
- Shipping a `vite.demo.config.ts` would create a second build target this
  library does not need to maintain.

If you need a static demo for offline review, the path is: clone the repo,
`npm run dev`, navigate, screenshot. The demo storybook is an internal
authoring substrate, not a published artefact.

---

## Verification checklist

After migrating to v1.0:

```bash
# 1. Build clean
npm run build

# 2. Typecheck clean (vue-tsc or vue-tsc-bundled)
npx vue-tsc --noEmit

# 3. No retired-symbol root-barrel imports remain
rg 'from "@mkbabb/glass-ui"' src/ \
  | rg '\b(Input|Textarea|Combobox|Carousel|useCarousel|useGlobalDark|registerShortcut|useRegisteredShortcuts|formatCombo|formatComboParts|isMac|useKeyboardShortcuts)\b'
# (expected: zero hits)

# 4. No retired nested subpath imports remain
rg '"@mkbabb/glass-ui/composables/(dark|keyboard)"' src/
# (expected: zero hits)

# 5. No retired composable imports remain
rg '\b(useOffsetPagination|useVirtualSectionWindow|useWindowedStore|buildSectionLayout|findSectionOffset|resolveActiveSection|resolveSectionWindow)\b' src/
# (expected: zero hits)

# 6. No retired subpath imports remain
rg '"@mkbabb/glass-ui/(pagination|virtual)"' src/
# (expected: zero hits)

# 7. Bundle re-probe (consumer-specific; speedtest observed -32.5 KB entry-chunk gz)
```

---

## reka-ui 2.x — Combobox `searchTerm` → `ComboboxInput` v-model

> Downstream-consumer note. glass-ui's own `Combobox*` wrappers are ALREADY on
> the canonical 2.x shape — this note is for consumers who hand-wired the reka
> Combobox primitive directly and still bind the pre-2.x `v-model:search-term`
> on `ComboboxRoot`.

reka-ui 2.x moved the search/filter term OFF `ComboboxRoot` and ONTO
`ComboboxInput`'s `v-model`. The pre-2.x `<ComboboxRoot v-model:search-term>`
binding **silently no-ops** on 2.x (the prop no longer exists on the root) — and
because a stale reka model binding is a no-op, neither `vue-tsc` nor a unit test
catches it; only a test that checks the rendered effect does.

```vue
<!-- BEFORE (pre-2.x) — the filter term on the root -->
<ComboboxRoot v-model:search-term="query">
  <ComboboxInput />
</ComboboxRoot>

<!-- AFTER (reka 2.x) — the filter term on the input -->
<ComboboxRoot>
  <ComboboxInput v-model="query" />
</ComboboxRoot>
```

glass-ui's `<Combobox>` / `<ComboboxInput>` already forward the 2.x shape (the
wrapper passes `ComboboxRootProps`; the search term rides `ComboboxInput`), so a
consumer on glass-ui's wrappers needs no change — this is only for hand-rolled
reka usage. Sweep on every reka major bump.

---

## Reference

- **CHANGELOG**: the v1.0 entry in `CHANGELOG.md`.

## 3.13.0 — the constellation kVis floor (additive)

The constellation gains a visual-size draw-scale FLOOR: `kVis = max(k, kFloor)` applied by
`drawNodes`/`drawEdges`/`drawPointerWeb`/`drawRipples` to SIZES (dot radii, line widths, the
cursor dot, the ripple ring) while TRUE `k` keeps positions and reach. On a 390px canvas
(k≈0.30) the dots stop crushing sub-pixel; at/above `0.72·BASE_WIDTH ≈ 922px` (including the
1280 export frame) `kVis === k` exactly — byte-identical by construction. New exports on
`/constellation`: `DEFAULT_K_FLOOR` (0.72) + `kVisOf(field)` (for `drawOverlay` skins to floor
their own marks); new optional `ConstellationField.kFloor` member, tokenable per instance via
`--constellation-k-floor` (read by `<Constellation>` from the canvas). No API changes to the
existing exports. If you floored your own marks with a local constant, read `kVisOf` instead.

## 4.0.0 — coming from the 3.11.x / 3.12.0 registry versions

The 3.11.x and 3.12.0 versions on the registry were published from a separate line. 4.0.0
brings their surfaces back to the main line with no legacy shims and no compatibility
re-exports: where an idiom was superseded, the new shape is below and you migrate to it.

### A-1 — the post-flip settle seam (ADDITIVE, no migration)

`useGlobalDark().onFlipSettled(cb)` returns unchanged —
register ONE post-flip post-paint callback (`(isDark: boolean) => void`) that batches N
expensive re-theme ops (palette memo + chart retint + aurora re-derivation) into a single
coalesced `requestAnimationFrame` beat per flip. On `/dark` + `/api`
(`DarkFlipSettledCallback`). No call-site change.

### A-4a — `PAPER_WASH_GROUND` (ADDITIVE, no migration)

The recessive-ground crayon calibration partial returns unchanged. On
the `/aurora` barrel + `/api`. Spread it over a consumer's pole-derived pigment:
`const cfg = { ...consumerBase, ...PAPER_WASH_GROUND }`.

### A-4b — route transitions use the View Transition substrate directly

The standalone route wrapper and route-named aliases are retired. Pass an asynchronous
router mutation directly to `startViewTransition`; opt into the JavaScript reduced-motion
instant path when the route should avoid snapshot work.

```ts
import { startViewTransition } from "@mkbabb/glass-ui";

await startViewTransition(() => router.push(`/${slug}`), {
    types: ["forward"],
    instantUnderReducedMotion: true,
}).finished;
```

Use `supportsViewTransitions()` only when optional View-Transition styling needs a
capability gate. The mutation itself always runs.

### C-3 — the silver structure quad + `variant="structure"` (NEW, additive)

The silver structure metal (`--silver`/`-light`/`-dark`/`-deep` + `--color-silver*` aliases,
gold's cool mirror) + the `<InstrumentChassis variant="structure">` register (the cool
milled-metal housing). A structure surface adopts `variant="structure"` (or reads the
`--color-silver*` tokens) for the precision-instrument register.

### A-5 — `MetricBadge` `amount`→`value` (one-line rename; shipped at 3.13.0)

`<MetricBadge :amount="…">` → `<MetricBadge :value="…">`; see §3.13.0.

## 4.0.0 — the rebuilt dark register (the clean breaks)

4.0.0 collects these clean breaks (no aliases, no compat shims; a clean break is a major).
Each row names the break and what to change. **The rows that touch value.js (tabs, Dialog,
menu-row, Select, Slider) are flagged `[value.js]`.**

### The disco retirement — gold survives CALM

The audacious disco-grain recipe family RETIRES (clean break, no alias): the `@utility
btn-audacious` / `btn-audacious-gold` recipes, the `@keyframes sparkle-sweep` /
`btn-gold-bg-sweep`, and the disco-grain knobs (`--duration-sparkle`,
`--glass-grain-opacity-disco`) are GONE. Gold survives in the calm register:
the static `.gold-shimmer` text gradient + the `--glass-specular` edge catch-light registers
STAY (the FENCE held — only the ANIMATED sweeps die). The dock-tab primary tier collapses onto
the plain glass hover register (no grain / `--phase-color` radial halo). **Consumer re-pin:**
drop any `<Button variant="primary-audacious">` / `gold-audacious` binding (the variant rides
the retired recipe) or accept the calm register.

### The tone-on-glass recompose

Toast and Notification tone variants (and Alert's, until 8.0.0; see §8.0.0) render TINTED-GLASS over the floating rung (ONE
`.feedback-tone` `color-mix` recipe, α < 0.92 both modes), NOT an opaque saturated slab. The
three independent tone maps collapsed onto the ONE recipe. **Consumer re-pin:** a consumer that
hardcoded a tone-slab color re-points to the house tone token; the slab look is gone.

### The static scroll-fade retirement

The static `.scroll-fade-*` utilities RETIRE (clean break). **Consumer re-pin:** migrate to the
`<FadingScroll>` primitive (`@mkbabb/glass-ui/fading-scroll`) — a native `scroll(self)`-driven
edge-fade with a JS fallback. A local FadingScroll prototype of your own can be deleted.

### PresetEditorField retires onto the Configurator chassis

The gear PresetEditor recomposes on the Configurator chassis; `PresetEditorField` is REMOVED
(clean break). **Consumer re-pin:** the migration is the `<ConfiguratorRow>` composition shape
(label + control row; `DarkModeToggle` on the live `useGlobalDark` seam). The section divider
COLOR moved off the inline `border-border/30` alpha to the dark-adaptive
`--configurator-divider` token, keyed by the `data-dividers` attribute (the `border-t` WIDTH
arm stays).

### The shared `surface` axis — incl. the Dialog break `[value.js]`

The shared `{glass · veil · opaque}` `surface` axis is adopted across
Card / GlassPanel / Dialog / Sheet / Drawer / Popover / Command / ExpandableContainer / Skeleton
(`surface-axis.css` + the private tier resolver). It is ADDITIVE where it extends a union, but two breaks
a consumer re-pins:
- **The Dialog `variant`→`surface` move `[value.js]`** — Dialog's prior `variant` discriminant
  is the `surface` axis now. A consumer setting `<Dialog variant="…">` re-points to `surface="…"`.
- **The GlassPanel↔Card axis reconciliation** — the two surfaces share the ONE `surface` axis;
  a consumer relying on the prior divergent prop shape re-pins to the unified `surface` prop.
- **`<Skeleton surface="glass">`** is the named downstream register for value.js's bespoke
  `PaletteCardSkeleton.vue` (`bg-foreground/[0.04]` over `bg-card` — the "too black" composite)
  re-author at the pin.

### The tabs taxonomy cut `[value.js]`

ONE tab engine: `<SegmentedTabs>` (`@mkbabb/glass-ui/tabs`, pill-glass + underline-paper on
`.paper-ink-mark`). The clean breaks (no alias):
- **`ui/Tabs` LEFT the public root barrel** — the reka `Tabs`/`TabsList`/`TabsTrigger`/
  `TabsContent` wrapper family is OFF `@mkbabb/glass-ui` (the reka substrate stays INTERNAL
  solely for the dock-rail consumer). Canonical panel-nav is `<SegmentedTabs variant="underline">`.
- **`segmented`→`pill` `[value.js]`** — the SegmentedTabs `segmented` variant folds onto `pill`;
  value.js's `PaneSegmentedControl.vue` (consumes `@mkbabb/glass-ui/tabs`) re-points the variant.
- **`multi-select` → `<ToggleGroup>`** — the multi-select tabs arm retires onto ToggleGroup
  (the independent-toggles surface; Tabs is panel-nav only).
- **`overflow` responsive-collapse** retired (the prior `:responsive` collapse arm).
The indicator paints ONE elastic register (the oval-blob default-ON `TabsIndicator` plate is dead).

### The menu-row glass default flip `[value.js]`

Select and Combobox use `.glass-menu-row` through one private row-class owner. The former
flat-accent alternative is removed; consumers needing product-specific flat paint own that
composition. DropdownMenu and Command keep their component-local row classes, while
`.glass-menu-section` remains the section caption/hairline register.

### The `/underline`→`/handmark` fold

The hand-drawn family re-lands on `@mkbabb/glass-ui/handmark` (`HandMark`/`InkMark`/`BRUSHES`).
The prior `GlassUnderline` + `custom/underline/` + the `/underline` subpath RETIRE (clean break,
grep-negative survivor). **Consumer re-pin:** a consumer importing `@mkbabb/glass-ui/underline` /
`GlassUnderline` re-points to `/handmark` (`<HandMark>`).

### The `CarouselDots`→`PagerDots` retirement

`CarouselDots` RETIRES onto the unified `<PagerDots>` + `.glass-pager-ring` register
(`@mkbabb/glass-ui/pager`) — the carousel counter off the dark `bg-card` slab. **Consumer re-pin:**
a `CarouselDots` consumer re-points to `<PagerDots>`.

### Dark-material token-identity NOTEs (token re-points, not API breaks)

The dark register is rebuilt on the EXISTING `--glass-tint-*` seam (no new compositing seam):
the page→card L-point split (page L6→L4, card L10→L16), the transmissive dark `saturate`/
`brightness` arm + edge α 0.22, the dark tint LIFT 12%, and the `--primary` →
legendre-violet (`oklch(0.739 0.134 318.1)`, fg 7.15:1). These are TOKEN re-resolutions on the
inheriting axis — a consumer overriding a `--glass-*` / `--primary` token re-checks its value
against the rebuilt register, but there is no API/prop break. The light content card no
longer composites a gray slab, so it un-grays at the bump with no edit.

### Warm-chroma-floor NOTEs (token re-saturation, not API breaks)

The neutral ladder + light glass plates + borders are re-saturated onto the warm identity (the
achromatic-48 ladder lifted above the C 0.020 chroma floor). TOKEN re-resolution; no API break.
A consumer overriding a neutral token re-checks its chroma.

### The `--glass-blur-*` dial-back (token re-point, not API break)

The six `--glass-blur-*-radius` primitives dialed back ~15-20% within the 8-15px band
(`10/12/16/15/11` → `8/10/13/13/9`; wash unchanged at 1px; the dock radius 11px→9px). TOKEN
re-resolution; no API break. The per-spring `--spring-<name>-duration` vocabulary is MINTED (the
analytic 2%-band settle envelope, GENERATED from `SPRING_PRESETS`) — a consumer that rode a
`--spring-*` easing on a generic `--duration-*` clock gains the matched per-spring duration.

### The `@source` re-point (consumer-wiring fix, not an API break)

The dead `@source` in `index.css` re-points to the real `dist/` surface so glass-ui's compiled
utilities reach a consumer's Tailwind content-scan again. The Select collision-bound + inner-
scroll ship as PRECOMPILED CSS; the Slider `size` axis now renders REAL track geometry in every
consumer (no rename, but the rendered behaviour changes — a consumer relying on the silently-6px
track now gets the real `size` track) `[value.js — the A-3 Slider size axis]`. The
`SelectTrigger` `size` gained a font-rung prop writing `--dropdown-text` `[value.js]`.

### `MetricBadge` `amount`→`value` (shipped at 3.13.0; repeated here)

A one-line `amount=`→`value=` rename per call site, listed here so a consumer adopting 4.0.0
sees it with the other breaks.

### `Drawer*` moves to the `/drawer` subpath (clean break, no alias)

The Drawer family is re-built on reka `DialogRoot` + the house `useDrawerSnap` engine (a
`@mkbabb/keyframes.js` `SpringProgress` consumer), abrogating vaul-vue (the lone `@vueuse/core
^10.8` dual → full `@vueuse ^14` convergence). Because the rebuilt Drawer now bears the optional
`@mkbabb/keyframes.js` peer, it CANNOT inline that peer into the vueuse-free root bundle, so it
ships via a dedicated subpath like dock/aurora:

```ts
// before (v4.0.0)
import { Drawer, DrawerContent, DrawerTrigger } from "@mkbabb/glass-ui";
// after (v4.1.0) — one-line rename per call site
import { Drawer, DrawerContent, DrawerTrigger } from "@mkbabb/glass-ui/drawer";
```

The `mode` / `surface` / `showOverlay` props + the `[data-surface]` axis are PRESERVED byte-for-byte;
the `[data-vaul-*]` state-attribute LOOK keys re-pointed to `[data-glass-drawer-*]` (a consumer that
hand-styled `[data-vaul-snap-points]` re-points to `[data-glass-drawer-snap-points]`). The
direction-aware default snap ladder is now native (`resolveDefaultSnapPoints(direction)` — no more
`:snap-points="[]"` workaround for a full-slide left/right drawer).

### `.glass-refract` → `.glass-lens` (clean break, no alias)

The refractive-glass opt-in class is renamed `.glass-refract` → `.glass-lens` (the iOS-26
edge-lensing vocabulary). The class now composes the EVOLVED squircle bevel-profile displacement
filter (the old uniform-radial map is gone) + the typed inheriting `--glass-refract`
magnitude axis (the `:active` lens-swell). The `--glass-refract*` AXIS/token names are KEPT (only the
opt-in CLASS renames). One-line rename per call site:

```html
<!-- before (v4.0.0) -->
<div class="glass-floating glass-refract">…</div>
<!-- after (v4.1.0) -->
<div class="glass-floating glass-lens">…</div>
```

`<Button :liquid>` re-points internally (no consumer change). Off-Chromium the lens still degrades to
the un-gated blur+tint base (PRESERVED — see the runtime-latch note below, which replaces the
former `@supports` gate).

### `.glass-lens` Chromium refraction now rides a runtime latch — arm it once

> **VOID at 8.0.0.** The latch, `armGlassRefract()`, `supportsBackdropRefract()`, and
> `.glass-lens` itself are DELETED — see §8.0.0. The "required consumer action" below is
> retracted: there is nothing to arm. This section is retained only as the record of what
> the 8.0 removal removes.

`.glass-lens`'s Chromium `backdrop-filter: url(#…)` composite no longer engages via
`@supports (backdrop-filter: url("#glass-refract"))` — WebKit 26.5 LIES to that condition (returns
true, retains the composite in computed style, then drops the whole value at paint, blur leg
included), so the composite is worse than the blur-only floor on Safari. It now sits behind the
runtime latch `:root[data-glass-refract="on"]`, set once per session by `armGlassRefract()`
(the root barrel `@mkbabb/glass-ui`) whose functional probe actually exercises the url()-filter raster path
(Chromium arms ON + refracts, WebKit stays OFF + degrades to the un-gated blur base — the intended
Safari floor, no broken `url()` reference).

**Required consumer action: one `armGlassRefract()` call per application root.** Kin to
`installDarkModeSync` — the module-load arm is pruned by `sideEffects: ['*.css']`, so the call is
explicit. No library component arms the latch itself (a component silently mutating the document
root would hide missing app adoption, and underline/Select-only `/tabs` consumers would load +
execute the mount-time probe path for a lens they never paint). Arm once at your app root:

```ts
import { armGlassRefract } from "@mkbabb/glass-ui";
armGlassRefract(); // idempotent, SSR-safe, DOM-ready-deferred; OFF on WebKit via the functional probe
```

That single call arms **every** `.glass-lens` surface in the document at once (the latch is
root-level) — `SegmentedTabs`' pill traveling indicator included, as well as any `.glass-lens`
surface you author yourself.

**Without the bootstrap, `.glass-lens` is an explicitly blur-only state** — NOT a silently-equivalent
contract. The lens degrades to its documented blur floor (the same floor Safari holds) until an app
root calls `armGlassRefract()`; on Chromium the refraction garnish is simply absent.

### Refraction gains a Tier-1 WebGL2 FLOOR — the SOTA degrade ladder (additive, no consumer break)

The `.glass-lens` refraction now sits on a three-rung SOTA degrade ladder, so the depth-refraction reads
on EVERY engine — not just Chromium:

- **Tier-0 (CSS box-shadow)** — the `--glass-edge-dispersion` rung, the un-gated floor.
- **Tier-1 (WebGL2)** — `src/composables/glass/webgl/shaders/glass-refract.glsl.ts` (NEW), the universal
  Safari-safe primary. The prior refraction rode the CSS-SVG `#glass-refract` `feDisplacementMap` filter,
  which is **DEAD on Safari/WebKit + Firefox 2026** (a `backdrop-filter: url()` displacement never
  rasterizes there → the refraction silently collapsed to a flat blur on half the web). The WebGL2
  fragment pass renders the SAME edge-concentrated squircle depth-refraction + the absolute-rim chromatic
  split (`ca = inward · rim · uChromatic · CHROMATIC_SCALE`, `CHROMATIC_SCALE = 0.0045`) on any WebGL2
  engine.
- **Tier-2 (WGSL)** — `glassShader.wgsl` where `navigator.gpu` is present (the highest fidelity).

**Nothing to do — the ladder is internal.** No public class/prop/token changes: `.glass-lens` and the
`--glass-refract*` axis are byte-identical. The new **`--glass-chromatic-strength`** scalar (typed
`@property <number>`, `initial-value: 0` — no fringe by default) threads the Tier-1/Tier-2 `uChromatic`
uniform; a consumer opts into the rim dispersion by raising it (e.g. `--glass-chromatic-strength: 0.25`)
and leaves it 0 for the depth-only lens. The `--glass-chromatic-strength` float scalar is a SIBLING of the
Tier-0 `--glass-edge-dispersion` box-shadow rung (they do NOT collide — one is a GL-uniform float, the
other a CSS box-shadow).

### `popover-animate` / `slide-in-from-side` → `.glass-reveal` (clean break, no alias)

The reka-overlay enter `@utility popover-animate` (the fixed-bezier `zoom-in-95` + `fade-in-0`) AND
`@utility slide-in-from-side` are RETIRED, replaced by the spring-clocked LIQUID-ENTER recipe
`.glass-reveal` (the iOS-27 bloom: scale + fade + `filter` blur-settle on `--spring-snappy` +
`--spring-snappy-duration`, exit `--ease-out` no-overshoot, PRM-snap). The ≥9 enrolled overlays
(Dialog/Popover/Sheet/Tooltip/HoverCard/DropdownMenu/ContextMenu/Combobox/Select + HoverPopover)
re-point INTERNALLY — **no public-prop break; the default enter upgrades to liquid glass.** The
Dialog `spring` opt-in (`useSpringMount` drag-dismiss) is UNCHANGED.

A consumer who hand-composed `popover-animate` / `slide-in-from-side` directly on a CUSTOM portal
surface re-points to `glass-reveal` (the directional `slide-in-from-side` folds onto `.glass-reveal`'s
`data-side` compositor `translate` leg):

```html
<!-- before (v4.0.0) -->
<div class="glass-floating popover-animate slide-in-from-side">…</div>
<!-- after (v4.1.0) -->
<div class="glass-floating glass-reveal">…</div>
```

NEW: `useLiquidReveal(surfaceRef, { trigger, preset })` (`@mkbabb/glass-ui/motion`) — the source-rect
bloom JS leaf (the dialog-from-button / dock-from-pill case), composing the kf `ElementMorph` +
`springTimingFunction`. The CSS `.glass-reveal` recipe is the zero-JS everywhere floor; the JS leaf is
the source-rect refinement.

## 5.0.0 — the glass standardization (clean breaks)

### The `--glass-blur-dock` chain RETIRES (clean break, no alias)

The dock-own blur register — `--glass-blur-dock` (light + dark composite), `--glass-saturate-dock`
(light + dark), `--glass-blur-dock-radius`, and the `--blur-dock` `@theme` bridge (→ the `blur-dock` /
`backdrop-blur-dock` Tailwind utility) — is RETIRED wholesale. The dock's backdrop now reads the ONE unified glass material via `--dock-surface-blur:
var(--glass-blur-resting)` (the 8px resting peer). The dock now paints its blur through that peer; there
is no dock-own rung.

**Consumer impact:** none for the token cascade (the chain had zero external readers — the dock reads
the resting peer, and the `blur-dock` Tailwind utility had zero consumers). A consumer who authored
`class="blur-dock"` / `class="backdrop-blur-dock"` directly re-points
to `backdrop-blur-glass-resting` (the 8px material) or overrides the `--glass-blur-resting-radius` primitive.
A consumer who overrode `:root { --glass-blur-dock-radius: … }` to retune the dock blur now overrides
`--glass-blur-resting-radius` (the substitution-vs-composite discipline — the dock shares the resting
material).

```css
/* before (v4.2.0) — retune the dock blur */
:root { --glass-blur-dock-radius: 12px; }
/* after (5.0.0) — the dock reads the unified resting material */
:root { --glass-blur-resting-radius: 12px; }
```

A consumer overriding `--glass-blur-dock`/`-radius`/`--glass-saturate-dock` drops the dead
override when it upgrades.

### `ladder.css` / `shell.css` carves (no-god-module, no consumer impact)

`glass/ladder.css`'s grain `::after` overlay tail carves into `glass/grain-overlay.css`, and `dock/shell.css`'s
`#persistent` region + vertical layer-stack tail carves into `dock/shell-regions.css` (each @import-ed
IMMEDIATELY AFTER its parent in the SAME `@layer components`, cascade-order-invariant → the `/styles`
draw is unchanged). Internal carves to hold the 500-line no-god-module bound; zero API/paint delta.

### The dead-composable cut (clean break, no alias)

Five motion composables (and their paired CSS) had at most one real consumer, so they are
removed (a clean cut; there is no replacement primitive because there
was no real consumer to serve). The dead `useMorphField()` WELD (zero callers) is GUTTED to its
motion-named SIGNATURE DATA.

| removed | prior surface | disposition |
|---|---|---|
| `useHaptic` (+ `HapticPattern`/`UseHapticOptions`/`UseHapticReturn`) | root barrel · `/motion-core` · `/api` | REMOVED — no replacement. A consumer wanting a body-confirm buzz calls `navigator.vibrate` directly behind its own feature-detect. |
| `useCelebrationBurst` (+ `CelebrationBurstPreset`/`UseCelebrationBurstOptions`/`UseCelebrationBurstReturn` + `jubilance.css` + `.glass-celebration-petal`) | `/motion` · `/api` types | REMOVED — no replacement. |
| `useVizChoreography` | internal (`composables/glass/`, never exported) | REMOVED — no consumer impact (unexported). |
| `useLiquidMorph` (+ `src/styles/glass/liquid-morph.css`) | never exported; the liquid-dock demo | REMOVED — the demo (`liquid-playground.vue`) composes the shipped `useBloomUp` source-rect bloom + the SVG-goo bridge; `liquid-morph.css` MOVED to `demo/stories/dock/` (demo-only, off the library bundle). |
| `useDockContextSilhouette` (+ `AppSwitcher`'s stale reference) | never exported (`custom/dock/composables/`) | REMOVED — no live consumer (the founding demo reads `useBloomUp`); a future dock context→silhouette need re-enters through the shipped dock-morph family. |
| `useMorphField()` (the weld function + `MorphTier`/`MorphSilhouette`/`MorphFieldRect`/`BodySpec`/`MorphFieldOptions`/`MorphFieldHandle`) | root barrel · `/motion-core` | GUTTED — the weld body had ZERO callers. Its live surface — `MORPH_SIGNATURES` + `MorphSignature`/`MorphSignatureName`/`MorphVector` — MOVES to `composables/motion/morphSignatures.ts` and STAYS on the barrel (byte-identical DATA). |

**Consumer re-pin (`MORPH_SIGNATURES`):** none — the import path is unchanged (the root barrel + `/motion-core` still re-export `MORPH_SIGNATURES` and the three signature types). Only the `useMorphField` function symbol + its function-domain types leave the surface.
