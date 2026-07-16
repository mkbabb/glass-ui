# DarkModeToggle

One native pressed command for the shared application theme, exported from
`@mkbabb/glass-ui/dark-mode-toggle`.

```vue
<DarkModeToggle />
```

The control owns no theme state. It reads and flips `useGlobalDark`, uses the shared
interruptible press response, and removes spatial motion under reduced motion.
