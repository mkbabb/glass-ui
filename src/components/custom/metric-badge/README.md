# MetricBadge

The metric-badge primitive (`@mkbabb/glass-ui/metric-badge`). A compact pill carrying a metric
value + optional label/tone — the atom `MetricPill`, `MetricCell`, and `MetricStack` compose
for a single number-at-a-glance chip.

```vue
<MetricBadge value="98" label="perf" />
```

## Export

- **`MetricBadge`** — the badge. It exposes its badge prop/type surface; the value reads the
  metric ink register and the tone (when set) rides the on-glass foreground rung so the badge
  stays legible over a translucent plate (BB.W-DARK-READABILITY-REPAIR — `.metric-badge`
  composites brighter than the calm quiet plate, so it re-points to the `-strong` on-glass rung).

The badge is the smallest metric primitive; reach for `MetricCell` for a labelled metric card,
`MetricStack`/`MetricRow` for a vertical metric grouping.
