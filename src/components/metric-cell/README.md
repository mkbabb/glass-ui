# MetricCell

A compact metric card (`@mkbabb/glass-ui/metric-cell`). A single metric surface — a leading
glyph, a value + unit, and a label — the "one KPI" card a dashboard grid tiles (a speedtest
consumer).

```vue
<MetricCell :icon="Download" value="94.2" unit="Mbps" label="Download" />
<MetricCell :icon="Zap" value="12" unit="ms" label="Ping" icon-color="var(--viz-ping)" />
```

## Export

- **`MetricCell`** — the cell. `iconColor` tints the LEADING GLYPH only (the value + unit stay
  ink — the one-color-event proportion) — now reconciled onto `<IconChip bare :tone>`. It exposes
  its cell prop/type surface.

The cell is the labelled-metric register between `MetricBadge` (the bare pill) and
`MetricStack` (a vertical grouping of rows); reach for it when one metric wants its own card.
