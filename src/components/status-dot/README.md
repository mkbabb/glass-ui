# StatusDot

`StatusDot` is the static compact status identity. Every state has a distinct silhouette as well as
a semantic tone, so the signal survives monochrome and forced-color modes.

```vue
<StatusDot state="online" />
<StatusDot state="error" label="Connection failed" />
```

Omit `label` when adjacent text names the status; the dot is then explicitly decorative. A labelled
dot emits `role="img"`. It never owns a live region.

## API

- `state`: `online | warning | error | unknown` (default `online`)
- `size`: `sm | md` (default `sm`)
- `label`: optional accessible identity
- `StatusDotState`, `StatusDotSize`: exported types
