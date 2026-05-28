# AN.W5 — Interruptible MetricStack reorder recipe — ARCHIVED (2-consumer gate)

**Disposition**: ARCHIVED on the substrate-without-consumer binary (J inv 10 / L inv 8).

## Decision

The interruptible per-row-`useSpring` Y-offset reorder recipe (F.W10 item 3 / H1-HIGH→prototype) does NOT land at AN close. The substrate-without-consumer gate requires ≥ 2 realised consumers before a primitive or recipe ships; this recipe has zero.

- **Consumer 1 (would-be)**: muster's F redesign. Its v1 contract is **settle-on-pointerup** (F.md decision 2) — the verdict re-ranks on drag release, not mid-drag. muster does NOT consume a mid-drag interruptible reorder.
- **Consumer 2**: none materialised in glass-ui or any `@mkbabb/*` project during AN's open window.

With zero realised consumers, landing the recipe would be speculative substrate — exactly what the binary gate forbids.

## Named realisation condition

The recipe LANDS at `demo/stories/compositions/metric-stack-reorder-interruptible.vue` (per-row `useSpring` Y-offset + the canonical `.metric-stack-move` class + the `prefers-reduced-motion` `transition: none` carve) when **≥ 2 consumers declare a mid-drag-reorder pattern** — i.e. a consumer that re-aims the spring target while the pointer is still down, not settle-on-pointerup. Until then muster's F-side stays settle-on-pointerup and the recipe is unbuilt.

## Evidence

- muster F.md decision 2 (settle-on-pointerup) — the v1 reorder contract.
- No second consumer in the `@mkbabb/*` perimeter at AN close (2026-05-28).

`npm run typecheck` + `npm run build` unaffected (ARCHIVE writes no source).
