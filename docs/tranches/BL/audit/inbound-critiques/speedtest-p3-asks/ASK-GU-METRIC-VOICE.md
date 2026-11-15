# ASK-GU-METRIC-VOICE: one restrained voice for Metric's label, value and unit

**From**: speedtest AX pass 3, audit round 1 repair seat (2026-11-12). **To**: glass-ui. **Law**: GLASS-RULING items 4 and 5 (no mono caps, no bold); precepts `restraint.md` (12.0: no caps eyebrows or tracking, no bold); OI-1 C4. **Folds in**: O-218 / ASK-GU-METRIC-LABEL-CASE, p2 ask 1 and ask 10, seat-c ASK-GU-METRIC-CAPTION-RUNG.

**What I see on 11.0.1.** `dist/components/metric/styles.css` sets:
- `.metric__label`: `font-weight: 550; letter-spacing: var(--type-tracking-wide); text-transform: uppercase`. Every speedtest surface with numbers shows "DOWNLOAD", "LATENCY", "JITTER", "UPLOAD", "TESTS", "AVERAGE DOWNLOAD" (owner-eye r1 H-C4a, all 44 stills).
- `.metric__value`: `font-family: var(--font-mono); font-weight: 650`. The ledger and summaries read as bold Fira Code: "23", "2", "0.987", "1,728", "211" (H-C4b).
- `.metric__unit`: mono at the caption rung, set after a `0.3em` gap but inside a reading whose value keeps `min-inline-size: 3ch`, so a short value ("2", "18") leaves a wide ragged gap before "ms".

**Why it is glass's.** The stage hero already re-voices `.metric__value` locally (sans, 400) and the audit (glass-canon r1, item 3) rules that a split voice: one pane shows two numeral voices. Extending that override to every Metric would be a local fork of glass's Metric.

**What I ask.**
1. The label in sentence case at regular weight with no tracking (O-218, ahead of 12.0).
2. The value in the display sans at regular weight with tabular lining figures; mono stays available as an explicit opt-in for code-like values.
3. The unit in the same family as the value, set at the reading gap from the digits whatever the value's length (the `3ch` minimum belongs on a reserve the consumer asks for, not on every value).

**What I will delete when it ships.** `.stage-numeral` / `.stage-unit` font overrides in `SpeedtestResults.vue` and `.record-hero-value` / `.record-hero-unit` weight overrides in `RecordReadout.vue`.

**What I will not do locally.** I will not restyle `.metric__label`, `.metric__value` or `.metric__unit` from speedtest.

## Round 2 addendum (2026-11-13, audit r2 repair seat)

- **Done locally, as composition.** The stage ledger's values are speedtest's own `#value` slot content, so they now read in the readout's brand sans at weight 400 with their own ink, exactly as the hero numeral already did. The running and complete panes have one numeral voice. No glass class is overridden.
- **Still glass's.** The caps label (`.metric__label` uppercase, 550, tracking) on every surface with numbers, including the dashboard and admin summaries; the bold mono value wherever a consumer passes `value` without a slot (dashboard "1,728", "211"); and the `min-inline-size: 3ch` value box that leaves "18   ms" ragged. The r2 walks (owner-eye H-C4a, H-C4b; glass-canon; contrast-a11y) re-measured all three on 089e9301.
