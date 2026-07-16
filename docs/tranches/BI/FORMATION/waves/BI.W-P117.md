# BI.W-P117 — Metric consolidation — one numeric readout family

**Status:** DONE — PRODUCT COMPLETE
**Topological stratum:** BI.S15
**Formation family:** component-data
**Core centers:** C1_LIQUID_GLASS, C5_AUDACIOUS_TYPOGRAPHY, C6_COMPONENT_APOTHEOSIS
**Terminal owner:** glass-ui orchestrator

## Intent

Replace the parallel `metric-badge`, `metric-cell`, and `metric-stack` packages with one
public `/metric` family. Preserve the general readout, cell, row, and stack concepts while
removing Speedtest-specific state, animation, aliases, and token vocabulary.

This is a clean break. `MetricPill` was already deleted after a zero-consumer audit and
`MetricsGrid` has no implementation, history, or consumer; neither is recreated.

## Live evidence and owner ruling

| current surface | live external source sites | disposition |
| --- | ---: | --- |
| `MetricBadge` | 22 across Speedtest, Muster, Keyframes, SCI, and Fourier | Rename/fold into the base `Metric`; the static readout has broad library value. |
| `MetricCell` | 8 across Speedtest and Muster | Retain as `MetricCell`; it is a general icon/label/value composition. |
| `MetricStack` / `MetricRow` | 4 stack and 4 row sites across Speedtest and Muster | Retain the ledger layout, not the Speedtest presentation knobs. |
| `MetricPill` | 0; source and export already removed | Delete its residual CSS and comments. Do not add an alias. |
| `MetricsGrid` | 0; no source, export, or history found | Do not create it. Consumers use ordinary layout around metric parts. |

The private `src/components/metric/coalesce-metric.ts` is the single value-normalization
authority: finite numbers including `0` and `-0` are real; nullish, blank/whitespace, `NaN`,
and infinite input resolves to the configured placeholder. Loading masks any present value
behind one stable ellipsis and marks the owning readout `aria-busy`.

## Public contract

`@mkbabb/glass-ui/metric` is the only public entry and exports:

- `Metric` and `MetricProps` for a static value/unit/label/context readout;
- `MetricCell` and `MetricCellProps` for a bounded readout cell;
- `MetricRow` and `MetricRowProps` for one semantic ledger row;
- `MetricStack` and `MetricStackProps` for aligned rows; and
- the concise shared `MetricValue`, `MetricValueProps`, and `MetricDensity` types, plus the
  component-owned `MetricSize` and `MetricOrientation` axes.

The family owns truthful value fallback, numeric typography, value/unit alignment, readable
label/context hierarchy, and responsive ledger geometry. It exposes no status, trend, formatter,
locale, or precision matrix.

The family does not own:

- hover lift, press scale, focus rings, or celebration on a non-interactive metric;
- `data-just-resolved`, aura hosts, phase tint buses, protagonist state, or result animation;
- `dpi`, `audacious|result`, fixed four-row reserves, arbitrary consumer variants, or
  `result-*` compatibility classes; or
- consumer animation wrappers. A consumer can animate a stable metric subtree itself.

`Metric` owns `size` and inline/stacked `orientation`; `MetricCell` and `MetricStack` share the
compact/comfortable density axis. `MetricRow` adds no presentation state. The family reuses the
existing typography scale rather than minting a second one.

## Implementation scope

1. Create the flat family at `src/components/metric/` with `Metric.vue`, `MetricCell.vue`,
   `MetricRow.vue`, `MetricStack.vue`, `index.ts`, `styles.css`, and a concise `README.md`.
2. Reuse the private coalescing helper. Move only CSS and tokens that support the public metric
   contract; remove Speedtest-derived props, selectors, aliases, reserve math, and narration.
3. Render MetricCell's optional icon directly. Do not retain the `IconChip bare` composition as a
   glyph wrapper.
4. Delete `src/components/metric-badge`, `src/components/metric-cell`, and
   `src/components/metric-stack` after their general implementation has moved.
5. Delete the `/metric-badge`, `/metric-cell`, and `/metric-stack` exports, declaration mappings,
   and subpath-policy rows. Add `/metric`; do not publish compatibility barrels or aliases.
6. Remove dead `.metric-pill` rules from `src/styles/utilities/components.css`. Consolidate owned
   metric CSS under the family and prune obsolete badge/row tokens from
   `src/styles/tokens/sizing-config.css` and `src/styles/tokens/scale-paper.css`.
7. Replace the three separate stories with `demo/stories/data/metric.vue`; repair the manifest,
   the InstrumentChassis story import, public docs, migration table, style entry, and build entry.
8. Replace the old zero-value and MetricStack tests with one focused family contract suite. Keep
   zero/empty behavior, semantic structure, long-label behavior, and responsive geometry covered.

No product source outside this repository is edited by this wave.

## External clean-break handoff

| consumer | current use | migration after the `/metric` artifact exists |
| --- | --- | --- |
| Speedtest | badge 2, cell 7, stack 2, row 2 | Import the four retained parts from `/metric`; keep phase, active aura, and result transitions in Speedtest. |
| Muster | badge 5, cell 1, stack 2, row 2 | Import from `/metric`; replace its old `amount` badge prop directly rather than adding a compatibility prop in Glass. |
| Keyframes | badge 1 | Replace `MetricBadge` with `Metric` in its next coordinated Glass bump. |
| SCI | badge 2 | Replace `MetricBadge` with `Metric` in its next coordinated Glass bump. |
| Fourier | badge 12 | Replace `MetricBadge` with `Metric` in its next coordinated Glass bump. |

Land the producer family and its local contracts atomically, publish it only at the planned major
boundary, then migrate the five consumer repositories. The wide badge edge is a release
coordination concern, not a reason to preserve old subpaths.

## Product acceptance

- `/metric` is the sole public entry and its declarations match its runtime exports.
- No old metric subpath, alias, `MetricBadge`, `MetricPill`, `MetricsGrid`, or `result-*` selector
  survives in source or built output.
- `0`, fractional values, strings, empty values, units, long labels, and narrow containers render
  truthfully without clipping or invented completion/status.
- Metric, cell, row, and stack share one value/typography contract and do not duplicate token
  writers.
- Static metrics have no hover/press/focus affordance. If a consumer needs an action, it composes
  the metric inside a real control with its own accessible name and interaction states.
- Row and stack preserve stable semantic order and alignment without Speedtest-only phase,
  protagonist, aura, variant, or fixed-row assumptions.

## Native visual validation

Use the in-app browser only; do not use Playwright. The consolidated story now shows:

- base value, zero, empty placeholder, loading placeholder, unit, and context;
- cell with and without icon;
- row and multi-row stack with mixed digit counts;
- long labels and narrow wrapping/truncation behavior; and
- light/dark contrast with no false interactive motion or affordance.

Native visual validation was unavailable in this execution because the required in-app-browser
control capability was not present. No Playwright or other browser substitute was used. Focused
unit contracts remain the source of truth for value normalization, semantics, responsive source
geometry, and export shape.

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P017 | Functional glass uses one anatomy/state grammar; content surfaces do not opt into aesthetic variants. |
| BI.W-P059 | Story controls have typed live effects and applicable states are reachable. |
| BI.W-P062 | Accessibility and input modes are exercised when the family lands. |
| BI.W-P091 | MetricCell renders its optional glyph directly rather than restoring a decorative IconChip wrapper. |

## Archaeology folded

- Current homes at the audited branch: `src/components/metric-badge`,
  `src/components/metric-cell`, and `src/components/metric-stack`; decision: fold into one family.
- `MetricPill` deletion commit: `0338d068`; decision: preserve deletion and remove residual CSS.
