# HoverPopover

A hover-triggered popover (`@mkbabb/glass-ui/hover-popover` + the root barrel). A popover that
opens on hover (with an intent delay) rather than click — the tooltip's richer sibling, hosting
arbitrary content instead of a text string.

```vue
<HoverPopover :hover-open-delay="200">
    <template #trigger><button>Details</button></template>
    …rich popover content…
</HoverPopover>
```

## Export

- **`HoverPopover`** — the popover. `hoverOpenDelay` (renamed from `openDelay` at K.W1) is the
  intent dwell before open. The surface composes the glass top-layer `.glass-reveal` bloom
  entrance + the popover-animation grammar (`hover-popover.css`).

Reach for `IconTooltip` / the `Tooltip` family for a short text label; reach for `HoverPopover`
when the hover surface hosts controls or a rich body. It is cherry-picked onto the root barrel
(vueuse-free).
