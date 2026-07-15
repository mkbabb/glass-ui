# StatusDot

A status indicator dot (`@mkbabb/glass-ui/status-dot`). A small colored dot signalling a
status (online / warning / error / idle) — the tiny state glyph beside a label.

```vue
<StatusDot tone="success" />
<StatusDot tone="error" aria-label="Connection lost" />
```

## Export

- **`StatusDot`** — the dot. `tone` reads the status color register (the house
  `--success`/`--warning`/`--info`/`--destructive` tokens).

## The role contract (AN.W4)

`StatusDot` is a `<span>`-rooted primitive; a bare `<span aria-label>` with no role trips axe's
`aria-prohibited-attr` rule. So the dot emits `role="img"` ONLY when the consumer binds
`aria-label` (the decorative case stays role-free), and reaches the consumer's `:aria-label` via
native single-root attr fall-through.
