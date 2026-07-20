# StatusDot

`StatusDot` is the one compact status-and-liveness mark. Every state has a distinct silhouette as
well as a semantic tone, so the signal survives monochrome and forced-color modes. It absorbs the
former `Pulse` states — liveness is the `motion` axis, not a second component.

```vue
<StatusDot state="online" />
<StatusDot state="error" label="Connection failed" />
<StatusDot state="active" size="lg" />           <!-- breathing (motion default) -->
<StatusDot state="active" size="lg" motion="off" /> <!-- static opt-down -->
```

Omit `label` when adjacent text names the status; the dot is then explicitly decorative. A labelled
dot emits `role="img"`. It never owns a live region — announcements belong to the enclosing
`role="status"` line so a changing state never spawns a second live region.

Only the live `active` state breathes (the pulse ring); every settled state is still. `motion`
defaults to `"full"` (liquid-weight universal); opt down with `motion="off"`, and reduced motion
always wins regardless.

## API

- `state`: `active | idle | online | success | warning | error | unknown` (default `online`)
- `size`: `sm | md | lg` (default `sm`; `lg` = 0.875rem)
- `motion`: `full | off` (default `full`; only the `active` state animates)
- `label`: optional accessible identity
- `StatusDotState`, `StatusDotSize`: exported types
