# HeaderRibbon

`HeaderRibbon` is a persistent glass command band exported from
`@mkbabb/glass-ui/header-ribbon`. It keeps a caller's action row available on the first
render, pinned to a viewport corner inside a quiet functional-glass `Surface`.

```vue
<HeaderRibbon placement="right" aria-label="Editor actions">
    <template #items>…named actions…</template>
</HeaderRibbon>
```

Props are flat: `placement?: "left" | "right"` (default `"left"`), `ariaLabel?: string`, and
`class`. The single public slot is `items`. There is no disclosure mode, anchor button, or
reveal gesture — the band is expanded and operable from first paint.

`placement` changes visual order only; DOM and action order remain stable, and the action row
flows in RTL while the band keeps its physical corner.
