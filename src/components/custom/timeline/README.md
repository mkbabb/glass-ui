# Timeline

The timeline family (`@mkbabb/glass-ui/timeline`). A glass timeline + a continuous-rail family +
a scrubber + a segmented variant — the "events along an axis" register, split out of a former
901-line orchestrator (AU.W10) into cohesive parts.

```vue
<GlassTimeline :items="events" />
```

## Exports

- **`GlassTimeline`** — the glass timeline surface (+ its exported item/phase types).
- **`ContinuousTimeline`** / **`ContinuousRail`** / **`ContinuousMarkers`** — the continuous-rail
  parts (the rail line, the markers, the composed continuous timeline).
- **`ScrubberTimeline`** — the draggable-scrubber variant.
- **`SegmentedTimeline`** — the segmented variant.

The timeline dot/marker reads the `--surface-tint-*` register (re-resolved in lockstep across
modes). Reach for `GlassTimeline` for the default glass register; the Continuous/Scrubber/
Segmented parts are the specialised rails for a scrub-head or a phased-segment axis.
