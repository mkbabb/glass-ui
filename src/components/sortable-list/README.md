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
- **`SortableHandle`** — a native `button` drag affordance with a 44px minimum target.

Space or Enter lifts and drops; Arrow keys, Home, and End propose a position; Escape cancels.
Pointer and touch gestures use the same proposal/commit/cancel transaction.
