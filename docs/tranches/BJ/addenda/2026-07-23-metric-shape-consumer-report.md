# BJ ADDENDUM — metric family shape: a consumer field report (2026-07-23)

**Register.** Consumer field report, post-corpus. The 2026-07-17 FEEDBACK-LEDGER F-rows are a closed
transcription; this lands as **CFR-01**, appended below the A-table of `FEEDBACK-LEDGER.md`, same
disposition rule (owning wave, fold, or retire — no silent drop).

**Consumer.** `sci-report` bid-review artifact — an atlas-adjacent, real-content report built on glass-ui
components (`Surface`, `MetricCell`, `Badge`) and the token cascade, compiled single-file.
**glass-ui at the consumer:** `6.0.0` (the node_modules pin).
**Evidence.** `docs/tranches/BJ/feedback/F19-metric-badge-overround-grid.png`.
**Proposed owning wave.** `BAND-REDUCTION`.
**Corroborates / asks.** F09 (over-round → card), F15 (grand rounding audit), F18 (`/data/metric` prune),
A05 (ruthless reduction; one consumer is not enough), A10 (aristotelian padding/proportion).

---

## The finding

A consumer laid four summary stats in a four-up grid and reached for `<MetricBadge>` (the v6
`./metric-badge` export, `rounded-full`). In a grid cell the pill reads wrong: stadium end-caps
(effective radius `9999px` on a ~180px tile), the label+value pinned to the left with dead space filling
the right half of every tile, and the vertical padding cramped under the pill's rounded top. The user's
verdict, verbatim:

> "padding here is gross and far too rounded."

This is **F09 re-observed on the metric family** — "container should not be so rounded (not 100%; more
like a card)" — reported independently by a live consumer rather than found on a demo page.

## Root cause — not a consumer error to paper over

`MetricBadge` is a **pill primitive**: an inline chip (`rounded-full`, one-baseline label+value) that is
correct beside prose or in a toolbar. It is the wrong member for a **gridded summary stat**. The family's
grid stat-card is `MetricCell appearance="dashboard"` — glass-wash tier, `rounded-lg`, `p-3`, stacked
label-over-value. Swapping `MetricBadge → MetricCell` at the consumer fixed the symptom with no other
change (radius `9999px → 8px`, content stacked and padded, dead right-space gone).

The defect is in the family's **shape ergonomics**, not the consumer: on v6 the pill and the card ship as
undifferentiated peers with no chooser, and the more discoverable name (`MetricBadge`, `rounded-full`) is
the wrong one for the most common job (a grid of stats). Nothing in the shape or the docs steers the
consumer to the card.

The v7 consolidation has already begun — `src/components/metric/` now carries `Metric` +
`MetricCell/MetricStack/MetricRow`, and **`MetricBadge` is no longer in the v7 `src` tree** — so this
report is a live datapoint for how that consolidation should resolve shape, not a request to patch v6.

## Latest wave — BAND-REDUCTION — recommended action

Bake shape as an **opinionated default**, not a peer the consumer picks wrong:

1. **Keep the grid stat-card** (`MetricCell` `dashboard`) as the canonical member for gridded/summary
   metrics. It survives the F18 prune — one real consumer needs it (this one). Do not fold it away with
   the pill.
2. **Reserve the pill for inline/among-prose use.** If the consolidated `<Metric>` retains a pill shape,
   gate it behind an explicit `shape="pill"` or an inline context; never the grid default.
3. **Radius discipline.** A stat surface reads as a **card** (`--radius-card` / `--radius-lg`), never
   `--radius-pill`. Add "metric family" as a named row in F15's grand rounding audit.
4. **Chooser doc.** One line at the family root — *badge = inline pill · cell = grid card · stack =
   aligned rows* — so the next consumer cannot reach for the pill in a grid.

## Forthcoming tranche — carry-forward (addendum-seed, per A09)

For the next tranche's metric consolidation:

- **Shape as a context-keyed default.** A metric dropped into a grid / `MetricStack` resolves to the card
  register; a metric inline resolves to the pill. Shape stops being a footgun. This is A05's
  "opinionated defaults" and A10's "aristotelian proportion" applied to one family.
- **Validate against ≥2 consumers (A05).** This bid-review grid is consumer datapoint #1 for the card
  register; find a second before finalizing the `<Metric>` shape API.
- **Regression.** Add F19 to the reduction's visual set: a four-up metric grid renders as cards (`p-3`,
  card radius), never stadiums, at every breakpoint.

## Disposition

**CFR-01 → BAND-REDUCTION** (metric-family shape default + chooser doc + rounding-audit row) with a
carry-forward seed to the forthcoming tranche's metric consolidation. The consumer is already remediated
(`MetricCell`); this report is evidence + steer, not a code ask against the in-flight BJ tree.
