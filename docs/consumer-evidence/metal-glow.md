# `--metal-glow-blur` / `--metal-glow-opacity` (the gold catch-light)

## Artefact path

`src/styles/utilities/metal.css` — the brand-metal catch-light register
(`--metal-glow-blur` / `--metal-glow-opacity`), an additive glow layer on the
`BB.W-METAL-SHIMMER` `.metal-{gold,silver,bronze}` family. Minted in
`BC.W-AX-METAL-GLOW`; the `:root` defaults home in `src/styles/tokens/glass-fx.css`.

## Verdict

`keep-current` — a SHARED catch-light register (ONE glow recipe, two consumers),
so the ≥2-consumer bar is MET at birth and GATE-ASSERTED by `proof:metal-shimmer`
M7e (the `consumerProbe` reads both surfaces + this doc resolves on disk). The glow
is a `filter: drop-shadow` halo of the metal's OWN base hue (`--metal-stop-base`)
at the blur radius + opacity strength, painted BEHIND the gradient text-clip so the
gold reads as LIT metal. PRM-STATIC: the halo paints at rest (the lit metal reads
for PRM users); only the sweep motion is gated.

## Consumer proof (re-runnable)

**Two binary consumers — ONE catch-light register, never two glow recipes.**

### Consumer #1 — the loop sweep (LIVE)

The shared `.metal-gold, .metal-silver, .metal-bronze` selector reads the glow
`drop-shadow` at rest (the lit metal under the sweeping sheen — the glow is static,
the sheen sweeps over it).

```bash
grep -n 'drop-shadow(' src/styles/utilities/metal.css   # → the shared metal recipe's filter, reading --metal-glow-blur + --metal-glow-opacity
```

`src/styles/utilities/metal.css` — the shared metal selector group carries
`filter: drop-shadow(0 0 var(--metal-glow-blur) color-mix(in srgb, var(--metal-stop-base) calc(var(--metal-glow-opacity) * 100%), transparent))`
outside the `@media (prefers-reduced-motion: no-preference)` bracket (PRM-static).

### Consumer #2 — the one-shot headline / seal glint (BOOKED-LIVE on the seal wave's land)

`BC.W-AX-COMPLETION-SEAL`'s `--seal-glint` (the one-shot gold headline that lights
up once on reveal) reads the SAME `--metal-glow-blur` / `--metal-glow-opacity`
tokens — the seal's gold wordmark lights with the same catch-light register, never
a second glow recipe.

```bash
grep -n 'seal-glint\|metal-glow' src/styles/completion-seal.css   # → the seal glint reading --metal-glow-blur / --metal-glow-opacity (LIVE on the BC.W-AX-COMPLETION-SEAL land)
```

At THIS wave's land, consumer #1 is LIVE in `metal.css` and consumer #2 is
BOOKED-LIVE: the `BC.W-AX-COMPLETION-SEAL` wave lands `src/styles/completion-seal.css`
and flips the seal glint from booked to a live `--metal-glow-*` reader. The
`proof:metal-shimmer` M7e `consumerProbe` reads "1 live + 1 booked-with-resolving-
evidence" pre-seal and "2 live" post-seal; the gate asserts this doc names both
consumers either way (the anti-evasion floor — a bare prose claim with no resolving
evidence reds).

## The named ≥2-consumer TRIGGER

The bar is MET at birth (the loop sweep LIVE + the seal glint booked-live + this doc
resolving). The trigger that flips consumer #2 from booked to live is the
`BC.W-AX-COMPLETION-SEAL` wave landing `src/styles/completion-seal.css` with the
`--seal-glint` reading the glow tokens. When that lands, M7e reads "2 live".

## Re-audit proof

`proof:metal-shimmer` M7e gate-asserts this register: the loop sweep reads the glow
at rest, the seal glint is live-or-booked, and this evidence doc resolves on disk
naming both consumers with the `--metal-glow-blur` / `--metal-glow-opacity` tokens.
A stubbed evidence doc or a fake non-reading consumer reds the M7e self-test bite.

## Cross-references

- `src/styles/utilities/metal.css` (consumer #1 — the loop sweep, LIVE).
- `src/styles/completion-seal.css` (consumer #2 — the seal glint, `BC.W-AX-COMPLETION-SEAL`).
- `src/styles/tokens/glass-fx.css` (the `--metal-glow-blur-default` / `--metal-glow-opacity-default` `:root` retune seam).
- `scripts/proof-metal-shimmer.mjs` M7 (the gate-locked source arm).
- `tests-visual/metal-shimmer.spec.ts` (the glow π readback).
