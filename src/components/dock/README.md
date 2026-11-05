# Dock

`GlassDock` is a glass navigation and tool surface with one layout axis, one collapse
state machine, and one motion spine. Import the family from `@mkbabb/glass-ui/dock`.

```vue
<GlassDock orientation="horizontal" always-expanded>
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

`collapse: false` never collapses. `expandOn="press"` opens only on a press or
Enter/Space on the collapsed summary, pinned; hover, focus and the idle timer are inert,
and Escape, a press outside or focus leaving the dock closes it. Use it where a page
carries many docks (one per figure). `anchor="end"` pins the dock to the inline end of a flex or
grid container (the block end on a vertical dock; `dir="rtl"` mirrors it), and the box
grows toward the start. The morph always grows from the edge the dock is laid at: its
origin is measured when it starts, so a dock pinned by its own CSS needs no `anchor`.
`collapsedLabel` names the collapsed summary, e.g. "Tools for Fund balance by year".
`backdropMode="static"` avoids backdrop sampling and filtering (a `"live"` dock samples
the painted backdrop by default).

## Slots

- `persistent`: leading controls present in collapsed and expanded states.
- `default`: expanded controls.
- `collapsed`: compact-state content.
- `search`: search-field content when `search` is enabled.
- `persistent-end`: trailing controls present in both states.

## Interaction contracts

- The consumer owns selection state. `DockControl.active` supplies pressed/selected
  paint; richer radio or tab semantics should use `useSelectionGroup`.
- Portaled dropdowns, selects, and popovers keep the dock open through the typed dock
  context and retain their own focus and dismissal semantics.
- Collapse, resize, and layer transitions share the dock spring. Reduced motion seats
  transitions immediately.
- Interactive controls preserve a 44px coarse-pointer target floor and a complete
  focus-visible ring.
