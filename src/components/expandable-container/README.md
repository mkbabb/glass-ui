# ExpandableContainer

The expand-to-fullscreen container (`@mkbabb/glass-ui/expandable-container`, off the root
barrel). One content subtree moves between its in-flow position and a fullscreen
overlay through a disabled/enabled Teleport.

```vue
<ExpandableContainer v-model:open="open">
    …panel content…
</ExpandableContainer>
```

## Export

- **`ExpandableContainer`** — owns body locking, Escape exit, direct Reka focus
  containment/restoration, and the fullscreen `glass-overlay` tier
  (`surface="opaque"` opts into a solid wall).

## Chrome hooks

Use `data-part="trigger|panel"`, `data-mode="expand|collapse"`, and the
`#expand-trigger`/`#fullscreen-chrome` slots to repaint or replace chrome. These hooks
share the same `v-model:open`; Teleport, locking, Escape, and focus remain component-owned.
