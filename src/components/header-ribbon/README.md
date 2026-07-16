# HeaderRibbon

`HeaderRibbon` is a persistent glass command band exported from
`@mkbabb/glass-ui/header-ribbon`. Its default `persistent` mode keeps the action row
available on the first render without a disclosure anchor.

```vue
<HeaderRibbon placement="right" aria-label="Editor actions">
    <template #items>…named actions…</template>
</HeaderRibbon>
```

Opt into disclosure behavior explicitly. In `collapsible` mode, `anchorLabel` names the
native button owned by `HeaderRibbon`; the `anchor` slot supplies only decorative content.
The button exposes `aria-expanded` and `aria-controls` for the action region.
An omitted or blank runtime label falls back to persistent behavior instead of rendering an
unnamed disclosure control.

```vue
<HeaderRibbon
    mode="collapsible"
    anchor-label="Toggle editor actions"
    aria-label="Editor actions"
>
    <template #anchor><MenuIcon aria-hidden="true" /></template>
    <template #items>…named actions…</template>
</HeaderRibbon>
```

Pointer hover or keyboard focus reveals a collapsible row, while click or touch activation
pins it. `Escape` unpins the row and returns focus to the ribbon-owned button; focus presence
keeps the row revealed until focus leaves. Placement changes visual order only; DOM and
action order remain stable. Slot content is never inspected to choose behavior.
