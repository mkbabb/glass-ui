# ConfirmDialog

A destructive/confirm dialog (`@mkbabb/glass-ui/confirm-dialog`). A thin confirm-action shell
over the house Dialog substrate — a title, a description, and a confirm/cancel action pair —
for the "are you sure?" flow.

```vue
<ConfirmDialog
    v-model:open="open"
    title="Delete preset?"
    description="This cannot be undone."
    @confirm="remove"
/>
```

## Export

- **`ConfirmDialog`** — the confirm shell. It composes the glass top-layer Dialog surface (the
  `.glass-reveal` bloom entrance + the modal scrim) and exposes the confirm/cancel intent as
  events; the destructive action reads the `destructive` Button register.

The dialog is the confirm-flow convenience over the raw `Dialog` family; reach for `Dialog`
directly when the body is richer than a title + description + action pair.
