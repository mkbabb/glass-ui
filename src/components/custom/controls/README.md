# Controls — DarkModeToggle

The animated dark-mode toggle (`@mkbabb/glass-ui/controls`). A sun↔moon SVG control bound to
the global dark state — the single canonical dark toggle every surface (the demo gear, the
shell) composes.

```vue
<DarkModeToggle />
```

## Export

- **`DarkModeToggle`** — the toggle. It reads/writes `useGlobalDark` (dark mode is owned SOLELY
  by the global composable — never a per-surface shadow) and animates a sun→moon SVG morph on
  the flip.

## The theme-flip carve (BA.W-ATLAS-RECONCILE)

The toggle authors its transitions as LONGHANDS and carries `data-allow-motion`, so its
half-turn spring keeps running THROUGH the theme flip's transition-suppression carve
(`html.no-transition *:not([data-allow-motion])`) — the control whose whole purpose IS the
animation must not be gagged. Reduced-motion OVERRIDES the carve (accessibility is absolute).
