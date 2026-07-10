# SortableList

A drag-to-reorder list (`@mkbabb/glass-ui/sortable-list`). A list whose items reorder on drag,
with an explicit drag handle — the "reorder these rows" register over the `useSortable`
composable.

```vue
<SortableList v-model="items">
    <SortableItem v-for="item in items" :key="item.id">
        <SortableHandle />
        {{ item.label }}
    </SortableItem>
</SortableList>
```

## Exports

- **`SortableList`** — the list container (`v-model` the ordered array).
- **`SortableItem`** — one reorderable row.
- **`SortableHandle`** — the drag affordance. On its default `as="span"` grip it emits
  `role="button"` + `tabindex="0"` (the drag-affordance role, AN.W4); overriding `as="button"`
  drops both since the host tag carries them natively.

The list composes the `useSortable` composable (`@mkbabb/glass-ui/sortable`); reach for the
composable directly when you own the item markup and only need the reorder engine.
