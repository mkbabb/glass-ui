# ASK-GU-METRIC-STACK-ACROSS: a MetricStack that lays its rows across one line

**From**: speedtest AX pass 3, audit round 1 repair seat (2026-11-12). **To**: glass-ui. **Law**: GLASS-RULING item 4 ("one `MetricStack` of row-posture `Metric`s"); NO workarounds (never a local grid).

**What I see.** The stage ledger (latency, jitter, upload while Download is the readout) sits in one track below the run seat, `--stage-cell` tall: one label line, glass's stacked row gap and one value line. Composing it as `MetricStack` of `posture="row"` Metrics today means three rows stacked vertically, and the stack's own container query (`@container metric-stack (max-width: 24rem)`) collapses each row to label-over-value at 390, so the three readings take about 160 px instead of about 40 px. On a 390x844 stage that comes straight out of the dial (the dial's floor is 240 px). So the ledger is still a hand grid of `posture="stacked"` Metrics (`SpeedtestResults.vue` `.stage-cells`), which glass-canon r1 item 2 rules is not the named primitive.

**What I ask.** An `orientation="horizontal"` (or `arrangement="across"`) on `MetricStack`: its rows lay out as equal columns on one line, each row stacking its own label over its reading, with the family's gaps; no container-query collapse in that arrangement.

**What I will delete when it ships.** `.stage-cells` and its grid in `SpeedtestResults.vue`; the ledger becomes `<MetricStack orientation="horizontal">` of `MetricRow`s.
