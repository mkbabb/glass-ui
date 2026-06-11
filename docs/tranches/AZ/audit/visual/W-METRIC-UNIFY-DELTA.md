# AZ.W-METRIC-UNIFY — the Metric* value-display core + the killed zero-value bug · DELTA

<!-- surface-paths: src/utils/coalesceMetric.ts, src/components/custom/metric-badge/MetricBadge.vue, src/components/ui/metric-pill/MetricPill.vue, src/components/custom/metric-cell/MetricCell.vue, src/components/custom/metric-stack/MetricRow.vue -->
<!-- surface-hash: e226539ce7656342f8ef8732d28f0036ec1998889b07a1761b266ee905285be4 -->
<!-- AZ.W-GATES (D6) content-hash freshness model: fresh IFF the five surface-paths'
     bytes are byte-identical to capture time (sha256 of the "\n"-joined bytes,
     computed via proof-live-verified-ledger.mjs::surfaceHash). Stamped at the
     own-surface capture against the current AZ-tree bytes — the live metric-badge
     story was rendered on :5199 with the wave's source edits (the unified
     coalesceMetric core) in place. -->

## The bug the four-way copy hid (E2-2, S2)

The Metric* family — `MetricBadge`, `MetricPill` (delegates to Badge), `MetricCell`,
`MetricRow` — painted the SAME `value + unit + placeholder` gestalt over four
distinct registers but shared NO core. Two named the field `amount`, two `value`;
the `placeholder: "—"` default was redeclared 4-5×; and the empty-check DIVERGED.
The `amount` copies (Badge + Pill) coalesced on JS truthiness:

```
{{ amount || placeholder }}                 →  0 || "—"  →  "—"
:class="{ 'text-muted-foreground/40': !amount }"  →  !0  →  true (muted)
:style="amount ? { color } : undefined"     →  0 ? … : undefined  →  undefined (no color)
```

So a VALID `0` reading (0 errors/min, 0 ms, 0 Mbps) rendered the em-dash placeholder,
muted, color-stripped — a silent data-falsification bug. `MetricCell`/`MetricRow`
used the correct explicit `=== null || === undefined || === ""` check.

## The fix — ONE value core (the `prng.ts` shared-leaf precedent)

`src/utils/coalesceMetric.ts` owns the ONE correct empty-check + the ONE `"—"`
default, returning `{ display, isEmpty }`. A `0` is NOT empty:
`coalesceMetric(0) → { display: "0", isEmpty: false }`. The four surfaces consume
it (Badge/Cell/Row import it directly; Pill via its MetricBadge delegate); the
muted/color gates read `isEmpty` (the correct empty signal), not `!value`. The
field is unified to `value` (clean break — no `amount` alias). MetricBadge exports
its prop type for parity.

## The captured DELTA (live π readback on :5199)

- `metric-badge-zero-cell-zoom.png` — the binding fix: the "ERRORS" cell renders
  **"0 /min"** in full warm-ink weight, un-muted. Pre-fix it painted "— /min",
  muted, color-stripped.
- `metric-badge-zero-value.png` — the full metric-badge showcase. The 5 em-dashes
  visible are the LEGITIMATE empty cells (the story's explicit `:value="null"` /
  `:value="undefined"` / `:value="''"` cases — those SHOULD render the placeholder);
  every real value (incl. the `0`) reads correctly.
- `metric-badge-zero-readback.json` — the π readback: the sole `0`-text cell reads
  `{ text: "0", muted: false }` (was the em-dash, muted, pre-fix). 44 amounts scanned,
  5 legitimate em-dashes (the null/undefined/"" cases).
- `metric-pill-showcase.png` + `metric-pill-readback.json` — the delegated pill
  register, unchanged surface, fixed core.

## Proof

- `proof:metric-core` (born-RED) — the structural unify (the leaf consumed by all
  four, no per-SFC `"—"` redeclaration, the `value` field, the Badge prop-type
  export). Verified RED when `amount` is reintroduced, GREEN on the fixed tree.
- `tests/components/custom/metric-badge/zero-value.test.ts` (born-RED) — the runtime
  bug proof: a `0`-valued Badge/Pill renders "0", un-muted, with its color; a `null`
  still coalesces to the placeholder, muted, colorless.
- `vue-tsc --noEmit` + `npm run build` green; the Metric* unit + smoke suite green
  (the four registers paint unchanged — the unify is value-logic only).

## The §B chassis decision — ARM (b), the recorded-divergence note

ConfiguratorRow vs LabeledField: the recorded-divergence note (NOT a forced merge).
The two genuinely diverge (token-name+reset+density vs a11y for/id+error region) and
no ≥2-consumer shared-row need surfaced. Both SFCs carry the cross-referencing
docstring; `docs/precepts/design-idioms.md §9` records the divergence alongside the
`cn`/`focus-ring` keeps. The `<LabeledRow>` shared chassis is the named successor if
a third caller appears (§7).
