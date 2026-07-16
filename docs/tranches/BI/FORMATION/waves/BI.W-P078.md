# BI.W-P078 — AnimatedDigit

**Status:** DONE
**Disposition:** retained public smoothed numeric display

AnimatedDigit remains the small numeric presentation wrapper over `useAnimatedNumber`.
Its product contract is the current implemented surface:

- `value`, `format`, `placeholder`, `digitCount`, `mode`, and `damping` remain public;
- the consumer formatter owns locale-specific output, while document direction continues
  to inherit normally;
- tabular and lining numeral features plus `--digit-count` provide stable consumer-facing
  numeric geometry;
- rapid target changes, lifecycle disposal, and reduced-motion snapping remain owned by
  the shared `useAnimatedNumber`/keyframes engine;
- AnimatedDigit adds no live region or per-frame announcement policy.

Evidence remains in `src/components/animated-digit/AnimatedDigit.vue`,
`src/composables/motion/useAnimatedNumber.ts`, and
`tests/components/custom/animated-digit/AnimatedDigit.test.ts`.

Typewriter's textual accessibility/layout contract is separate and recorded by
BI.W-P080.
