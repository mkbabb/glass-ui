# Dock

`GlassDock` is a glass navigation and tool surface with one layout axis, one collapse
state machine, and one motion spine. Import the family from `@mkbabb/glass-ui/dock`.

```vue
<GlassDock orientation="horizontal" :collapse="false">
  <DockControl aria-label="Home"><Home /></DockControl>
  <DockSeparator />
  <div class="contents" role="group" aria-label="View controls">
    <DockControl v-for="view in views" :key="view.id" :active="view.id === active">
      <component :is="view.icon" />
    </DockControl>
  </div>
</GlassDock>
```

## Public anatomy

- `GlassDock` owns the plate, orientation, collapse state, overflow, and backdrop mode.
- `DockControl` is the button face. Use `shape="icon"` or `shape="tab"`.
- `DockTrigger` (from `@mkbabb/glass-ui/dock-trigger`) applies the same face to select, dropdown, or popover triggers.
- `DockSeparator` follows the dock's orientation and layout.
- `DockLayerGroup` and `DockLayer` compose consumer-owned selectable panes.
- `DockCrossfade` is the thin controlled face-swap primitive.
- An animated background's pause control is any button wired to its `pause()` and
  `resume()`: in a dock, a `DockControl` with `aria-pressed` (the old
  `DockBackgroundToggle` is deleted; no app used it).

Group related controls with ordinary DOM (`role="group"` and an accessible name) and
place `DockSeparator` between groups. Menus and other transient surfaces should compose
the existing Reka-backed menu, select, or popover families.

## GlassDock props

| Prop | Values | Default |
| --- | --- | --- |
| `orientation` | `horizontal`, `vertical` | `horizontal` |
| `shape` | `pill`, `rounded`, `card` | `pill` |
| `collapse` | `"closed"`, `"open"`, `false` | `"closed"` |
| `expandOn` | `hover`, `press` | `hover` |
| `anchor` | `center`, `start`, `end` | `center` |
| `collapsedLabel` | string | `"Expand dock"` |
| `backdropMode` | `live`, `static` | `live` |
| `fitContent` | boolean | `false` |
| `backgroundCanvas` | canvas, getter, selector, or `null` | `null` |

`collapse` is the one collapse member, on both orientations:

- `"closed"` mounts collapsed and expands on pointer, focus or a tap on the folded face.
- `"open"` mounts expanded.
- `false` never collapses: hover, focus, the idle window and outside clicks leave it
  open.

`ControlsDock` is the corner preset for a few action seats: with one control it is that
control and never folds; with two or more it folds at every width. A row of controls
that must never fold stays a `GlassDock` with `:collapse="false"`.

A collapsible dock folds after one idle window, `DOCK_COLLAPSE_DELAY_MS` (6000 ms),
once the pointer and focus have left it. A dock mounted `"open"` arms that window at
mount. The exposed `expand()`, `collapse()`, `keepOpen()` and `release()` drive the
posture from outside.

`expandOn="press"` opens only on a press or Enter/Space on the collapsed summary, pinned;
hover, focus and the idle timer are inert, and Escape, a press outside or focus leaving
the dock closes it. Use it where a page carries many docks (one per figure). `anchor` is
a hook for your own CSS: a value other than `center` is written to the root as
`data-anchor`, and that is all it does. It does not move the dock or change its morph.
The morph grows from the edge your layout lays the dock at, because its origin is
measured when it starts, so a dock your layout centres grows on both sides whatever
`anchor` says. The dock centres itself in its own box with auto inline margins, so to
hold it at an edge, put it in a wrapper sized to its content (a `display: flex` box at
the end of a row, say). `collapsedLabel` names the collapsed summary, e.g. "Tools for
Fund balance by year". A dock whose collapsed face is its persistent seats (below) has
no summary to name.

A run that exceeds its size cap scrolls natively, and the plate's end caps show which
way more seats lie. `backdropMode="static"` paints an opaque plate from the dock's
veil ink with no backdrop sampling or filtering (a `"live"` dock samples the painted
backdrop by default).

A plate outside a dock that should read as the dock's, such as a neck between two docks
or a bare plate, applies the `glass-plate` utility with
`--glass-veil-tier: var(--glass-veil-dock)` and `--glass-level: var(--glass-level-dock)`.
The dock's level is 1 in light and 0.7 in dark, and it falls to 0 under reduced
transparency and 0.3 under more contrast, so the plate follows the dock in each.

## Slots

- `default`: the expanded controls (the run).
- `collapsed`: the folded face's content. One glyph collapses to a circle; a glyph with
  a short reading ("⌁ 12") collapses to a capsule sized to fit it. With no `collapsed`
  slot, the persistent seats are the whole collapsed face (leading, then trailing), with
  no summary disclosure beside them.
- `persistent`: leading controls present in collapsed and expanded states.
- `persistent-end`: trailing controls present in both states.
- `search`: a search field inside the dock's morph; authoring the slot enables it.

The dock rests as a capsule: its corner is half its cross extent in every posture, open,
collapsed and vertical, and through the morph, bounded by `--radius-dock` (the stadium).
A host sets `--radius-dock: 1rem` for the bar corner. Each persistent
region keeps `--dock-layer-gap` toward the run, in both orientations.

## Interaction contracts

- The consumer owns selection state. `DockControl.active` supplies pressed/selected
  paint; richer radio or tab semantics should use `useSelectionGroup`.
- A navigation run marks its destination with `aria-current` (a `RouterLink` sets it).
  The dock then draws one selected plate for the run and glides it between controls on
  the dock spring; a control inside its own scrolling strip keeps its own selected fill.
- A `ScrollProgressRim edge="border"` in the `persistent` slot draws progress on the
  dock's own border, at the plate's border width and corner.
- A press on a persistent seat is the seat's own act: it never expands the dock, by any
  pointer. A hover-opened dock the pointer leaves after a seat press collapses at once.
  On a coarse pointer a long press (500 ms, held still) on a
  collapsed seat pins the dock open, and its release presses nothing; Tab onto a seat
  expands it from the keyboard.
- Portaled dropdowns, selects, and popovers keep the dock open through the typed dock
  context and retain their own focus and dismissal semantics.
- Collapse, resize, and layer transitions share the dock spring. Reduced motion seats
  transitions immediately.
- Interactive controls preserve a 44px coarse-pointer target floor and a complete
  focus-visible ring.

## Controls contributed from outside the dock's tree

The dock reaches its overlays through a context it provides to the components rendered
in its own slots. That context follows the component tree, not the DOM, so it does not
cross a `Teleport` from another component. A control that a page or a route renders and
teleports into an element inside the dock sits in the dock on screen but outside it in
the component tree: a `Popover keep-dock-open` there does not hold the dock, and the
dock does not close it when it folds.

Until such controls have an outlet of their own, drive the dock from the component that
renders them. Take a template ref to the `GlassDock`, call its exposed `keepOpen()`
while your overlay is open and `release()` when it closes, and watch its exposed
`expanded` to close the overlay when the dock folds:

```vue
<script setup lang="ts">
const dock = ref<InstanceType<typeof GlassDock>>();
const open = ref(false);
watch(open, (o) => (o ? dock.value?.keepOpen() : dock.value?.release()));
watch(() => dock.value?.expanded, (e) => { if (!e) open.value = false; });
</script>
```
