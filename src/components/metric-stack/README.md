# MetricStack

A vertical metric grouping (`@mkbabb/glass-ui/metric-stack`). A stack of metric rows — a label
+ value pair per row — the "several KPIs in a column" register (a speedtest consumer).

```vue
<MetricStack>
    <MetricRow label="Download" value="94.2 Mbps" :phase-color="'var(--viz-download)'" />
    <MetricRow label="Upload" value="11.8 Mbps" />
</MetricStack>
```

## Exports

- **`MetricStack`** — the column container.
- **`MetricRow`** — one label/value row. It exposes the `--metric-row-label-align` (default
  `left`) + `--metric-row-icon-color` (default `inherit`) CONSUMER tokens — read
  `var(--token, fallback)` so a consumer `:root`/per-row override cascades into the internal
  WITHOUT a `:deep()` reach (the component-over-class bar). The per-row `phaseColor` prop seeds
  `--metric-row-icon-color` inline for byte-identical back-compat (BB.W-CONTROL-TOKENS).

The stack is the vertical-grouping register; reach for `MetricCell` when one metric wants its
own card, `MetricStack`/`MetricRow` for a labelled column.
