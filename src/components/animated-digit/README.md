# AnimatedDigit

A single-glyph odometer reel (`@mkbabb/glass-ui/animated-digit`). One digit position that
rolls between values on a compositor-only transform — the atom a multi-digit animated
counter composes N of, side by side.

```vue
<AnimatedDigit :value="digit" />
```

## Export

- **`AnimatedDigit`** — the single-position reel. The rolling motion is a `translateY` over a
  stacked 0–9 strip (compositor-safe, `proof:no-layout-animation` holds); the reel settles on
  the spring register, PRM-snaps to the target with zero in-between frames.

The digit is the single-glyph partner to the `useAnimatedNumber` / `useCountup` composables
(`@mkbabb/glass-ui/motion`) that drive an editorial number roll; reach for those for a whole
value, `AnimatedDigit` when you need per-position control.
