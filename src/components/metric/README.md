# Metric

One static numeric-readout atom, plus two layout composers, at
`@mkbabb/glass-ui/metric`.

```vue
<Metric value="94.2" unit="Mbps" label="Download" />
<Metric posture="cell" :value="18" unit="ms" label="Latency" :delta="-3" />
<Metric :value="12400" compact label="Requests" />

<MetricStack density="compact">
    <MetricRow><Metric posture="row" label="Download" value="94.2" unit="Mbps" /></MetricRow>
    <MetricRow><Metric posture="row" label="Upload" value="11.8" unit="Mbps" /></MetricRow>
</MetricStack>
```

`Metric` is the only thing here that paints. Its four parts are **value · unit ·
label · delta**, and `posture` — `inline` (default) · `stacked` · `cell` · `row` —
is how it arranges them. A cell is a posture of one readout, not a second
component; so is a row.

`MetricRow` and `MetricStack` are pure layout composers: subgrid placement and one
density axis, zero visual authority of their own.

Finite numbers including `0` and `-0`, plus nonblank strings, are readings. Blank
strings, non-finite numbers, `null`, and `undefined` use the placeholder. `loading`
takes precedence, masks the value with a stable ellipsis, and marks the readout
`aria-busy`. `compact` renders a number in its locale's compact form (`12400` →
`12.4K`) through the family's one data-shaping seam, `coalesceMetric`.

A numeric `delta` carries its own polarity — positive is `up`, negative is `down`,
zero is `flat` — and paints as status **ink** on the neutral material, never as a
coloured plate. State it yourself with `polarity` for a string delta, or for a
metric where down is the good direction.

Everything here is noninteractive; at rest it reports its state and runs no idle
animation. Wrap it in a real named control when the owner needs an action.
