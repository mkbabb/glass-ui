# Metric

One static numeric-readout family at `@mkbabb/glass-ui/metric`.

```vue
<Metric value="94.2" unit="Mbps" label="Download" />
<MetricCell :icon="Gauge" :value="18" unit="ms" label="Latency" />
<MetricStack density="compact">
    <MetricRow label="Download" value="94.2" unit="Mbps" />
    <MetricRow label="Upload" value="11.8" unit="Mbps" />
</MetricStack>
```

Finite numbers including `0` and `-0`, plus nonblank strings, are readings. Blank
strings, non-finite numbers, `null`, and `undefined` use the placeholder. `loading`
takes precedence, masks the value with a stable ellipsis, and marks the owning readout
`aria-busy`.

`Metric` owns only size and inline/stacked orientation. `MetricCell` and `MetricStack`
share compact/comfortable density; `MetricRow` adds no presentation state. All four
components are noninteractive—wrap them in a real named control when the owner needs
an action.
