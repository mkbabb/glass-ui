# ExpandableContainer

The expand-to-fullscreen container (`@mkbabb/glass-ui/expandable-container`, OFF the root
barrel). A panel that expands from its in-flow rect to a fullscreen overlay and collapses back
— the `v-model:open` teleport-to-fullscreen register.

```vue
<ExpandableContainer v-model:open="open">
    …panel content…
</ExpandableContainer>
```

## Export

- **`ExpandableContainer`** — the container. The behaviour is byte-fixed: the body-overflow
  lock + `<Teleport :disabled>` + Escape exit + the un-walled `glass-overlay` tier
  (`surface="opaque"` restores the solid wall).

## The chrome is a CONTRACTED hook (BC.W-EXPANDABLE-PART)

The expand/fullscreen CHROME is a re-skin/replace hook — `data-part="trigger|overlay|panel"`
(+ `data-mode="expand|collapse"`) reached via a PLAIN descendant selector (a light-DOM
`::part()`-analogue, NO `:deep()`) + the `#expand-trigger`/`#fullscreen-chrome` named-slot
REPLACEMENT hooks (each defaults byte-identical). The consumer changes the CHROME; the library
keeps the BEHAVIOUR. Machine-locked by `proof:expandable-part`.
