# SortableList

A semantic drag-and-keyboard reorder list (`@mkbabb/glass-ui/sortable-list`) with stable item
identity, native button handles, focus retention, and polite transaction announcements.

```vue
<SortableList
    :items="items"
    :get-id="item => item.id"
    :get-label="item => item.label"
    @reorder="items = $event"
>
    <SortableItem v-for="item in items" :key="item.id" :id="item.id">
        <SortableHandle />
        {{ item.label }}
    </SortableItem>
</SortableList>
```

## Exports

- **`SortableList`** — a native `ul` container that emits `reorder` only when a transaction commits.
- **`SortableItem`** — a native `li` keyed by a stable `id`; `disabled` excludes it from reordering.
- **`SortableHandle`** — a native `button` drag affordance: 32px on a fine pointer, 44px on a coarse
  one (the `[data-control-target]` floor).

Space or Enter lifts and drops; Arrow keys, Home, and End propose a position; Escape cancels.
Pointer and touch gestures use the same proposal/commit/cancel transaction.

## The gesture

A press becomes a drag only once it has **earned** it — 8px of travel, or a hold that outlasts the
library's slowest named spring. Below that the gesture is a click: nothing is announced and nothing
is emitted.

There is no insertion line. **The vacancy is the indicator**: the rows between the lift and the
proposed position translate by one row, which opens a gap exactly where the row will land, and the
lifted row's own slot travels into it. An empty list receiving a row grows to the size of what it is
about to accept, so it is a visible target rather than an invisible one that silently succeeds.

The lifted row promotes from a flush cell to a floating glass plate and follows the finger 1:1 —
no spring between a pointer and the thing it is holding. Springs belong to the lift, the release
and the reversal, and every one of them is bound by NAME to the shipped register.
