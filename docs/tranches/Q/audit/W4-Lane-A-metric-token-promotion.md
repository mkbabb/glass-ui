# Q.W4 Lane A — metric-stack private token dialect → tokens.css (Q-sty-1)

## Charter

Per Qγ T1. The post-P commits `9ba68ca` + `d244dd5` introduced an 8-token
`--metric-row-*-clamp-*` family as a private SFC dialect — never declared in
`tokens.css`, defaults buried as scoped `var(…, fallback)` literals scattered
across `MetricRow.vue` and `MetricStack.vue`. Promote all 8 to `tokens.css`
under a `§<feature>` block per the DESIGN.md feature-token-home rule (W3 Lane D);
the SFCs consume them via bare `var(--token)`. This consolidates the whole
clamp family — including the P.W5 Lane A.1 MetricRow clamp tokens (same dialect).

## What changed

**`src/styles/tokens.css`** — new `§17 METRIC` block declares the full 8-token
family with the audacious-poster register as the canonical default:

- `--metric-row-value-clamp-min: 4.5rem`
- `--metric-row-value-clamp-cqi: 34cqi`
- `--metric-row-value-clamp-max: var(--type-display-hero)`
- `--metric-row-unit-clamp-min: 1.5rem`
- `--metric-row-unit-clamp-max: 3.25rem`
- `--metric-row-label-clamp-min: 1.125rem`
- `--metric-row-label-clamp-cqi: 5cqi`
- `--metric-row-label-clamp-max: 2.75rem`

The declared values reproduce the prior SFC fallbacks bit-for-bit, so the
poster register is unchanged for every consumer.

**`src/components/custom/metric-stack/MetricRow.vue`** — the three `clamp()`
recipes (`.metric-row__label`, `.metric-row__value`, `.metric-row__unit`) now
consume each token bare (`var(--metric-row-value-clamp-min)`), with no inline
`, fallback` arm. Recipe comments updated to point at tokens.css §17 METRIC.

**`src/components/custom/metric-stack/MetricStack.vue`** — unchanged in
behaviour. Its `[data-register="result"]` scoped selector still overrides the
clamp arms register-locally (the compact ledger register); that override now
retunes a *globally declared* default rather than minting a fallback. This is a
legitimate component-local register selector, not a token home — it stays.

`--metric-stack-rows` (set per-instance via JS `:style`) and
`--metric-row-value-unit-gap` are outside the 8-token clamp dialect and were
left as-is — `--metric-stack-rows` is dynamic per-instance, not a static
overridable knob.

## Verification

- `npm run typecheck` — GREEN.
- `npx vitest run` — 379/379 GREEN.
- Audacious-register defaults are byte-identical to the retired fallbacks;
  zero visual change.

## Verdict

**CLOSED.** The 8-token metric-stack clamp dialect is co-located in
`tokens.css §17 METRIC`; the SFCs consume bare. Consumers gain `:root`
overridability + single-place discoverability. The private-dialect defect
(Qγ T1, the headline finding) is resolved.
