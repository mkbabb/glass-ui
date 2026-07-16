# Pulse

`Pulse` is the compact liveness mark. It shares the feedback state grammar and animates only the
`active` state; idle and terminal states are static. Reduced-motion mode keeps a visible static
orbit.

```vue
<span role="status" aria-live="polite">
  <Pulse state="active" />
  Saving changes
</span>
```

The parent owns announcements. `Pulse` is decorative by default; pass `label` only when no nearby
text names the state.

## API

- `state`: `active | idle | success | warning` (default `active`)
- `label`: optional accessible identity; emits `role="img"` instead of a live region
- `PulseState`: exported state type

Use `Progress` for determinate work and `Skeleton` for content-shaped loading.
