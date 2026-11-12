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
- `DockBackgroundToggle` is the pause/resume control for animated backgrounds.

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

A collapsible dock folds after one idle window, `DOCK_COLLAPSE_DELAY_MS` (3600 ms),
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
Fund balance by year".

A run that exceeds its size cap scrolls natively, and the plate's end caps show which
way more seats lie. `backdropMode="static"` paints an opaque plate from the dock's
veil ink with no backdrop sampling or filtering (a `"live"` dock samples the painted
backdrop by default).

## Slots

- `default`: the expanded controls (the run).
- `collapsed`: the folded face's content.
- `persistent`: leading controls present in collapsed and expanded states.
- `persistent-end`: trailing controls present in both states.
- `search`: a search field inside the dock's morph; authoring the slot enables it.

## Interaction contracts

- The consumer owns selection state. `DockControl.active` supplies pressed/selected
  paint; richer radio or tab semantics should use `useSelectionGroup`.
- Portaled dropdowns, selects, and popovers keep the dock open through the typed dock
  context and retain their own focus and dismissal semantics.
- Collapse, resize, and layer transitions share the dock spring. Reduced motion seats
  transitions immediately.
- Interactive controls preserve a 44px coarse-pointer target floor and a complete
  focus-visible ring.
