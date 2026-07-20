# Timeline

The timeline family (`@mkbabb/glass-ui/timeline`). A glass timeline + a continuous-rail family +
a scrubber + a segmented variant — the "events along an axis" register, split out of a former
a monolithic orchestrator into cohesive parts.

```vue
<GlassTimeline :items="events" />
```

## Exports

- **`GlassTimeline`** — the glass timeline surface (+ its exported item/phase types).

`index.ts` exports `GlassTimeline` and its types ONLY. The timeline dot/marker reads the
`--surface-tint-*` register (re-resolved in lockstep across modes).
