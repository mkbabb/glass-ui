# Timeline

`@mkbabb/glass-ui/timeline` — ONE normalized reporting axis.

N ordered spans on the unit interval. Each carries a lifecycle state, a fill fraction and
an ordinal jewel hue; each span's end boundary is an addressable mark. The whole is one
number, published three ways.

```vue
<Timeline :segments="phases" current="download" label="Release timeline" @select="onSelect">
    <template #detail="{ segment, source }">…</template>
</Timeline>
```

## Surface

- **`Timeline`** — `role="progressbar"`, never `role="slider"`. A timeline REPORTS; the
  commanding playhead-with-ticks surface is `<Slider :marks>`.
- Props: `segments`, `current`, `label`. Emits `select` and `hover`.
- `label` is the bar's accessible name (`aria-label` on the track). It must be a prop —
  the track carries no text and a fallthrough `aria-label` names the root group instead.
  Omit it and the bar stays nameless; no name is invented for you.
- Slot `#detail` receives `{ segment, source, current, hovered, value, progress }`.
- `defineExpose({ value })` — the span-weighted aggregate as a `ComputedRef<number>`,
  mirrored onto `--timeline-value` and into the `#detail` scope.

## Rules worth knowing

- `at` is a span's **end** boundary, cumulative, clamped monotone non-decreasing —
  never sorted. Omitted `at` takes an equal share of the remainder.
- `active` with `progress` omitted is **indeterminate**: no fill, no cap, and the
  specular flow is the state's sole carrier.
- A trailing remainder (`Σwidth < 1`) is an open axis: the groove paints it, nothing
  owns it.
- One consumer knob: `--timeline-track-h`. Set it to `0` for a bare marker strip.
