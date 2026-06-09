# AX live-verify CAPTURE protocol (the cardinal-lesson artefact discipline)

The inventory's S-cardinal lane caught the recurring miss: waves were marked
`live-verified (DEVELOPED)` from commit-message claims of "playwright MCP" with **no captured
artefact**. A commit message is not a captured live audit. The cardinal lesson demands a
BINDING, FALSIFIABLE live close — so every wave that closes `live-verified` MUST leave a
captured DELTA here.

## The artefact per live-verified wave

`docs/tranches/AX/audit/visual/W<NN>-DELTA.md` carrying:
- the route(s) audited + the viewports (≥2: a desktop ≥1280 and a mobile 375×667) × {light, dark}
- the BEFORE/AFTER paired-π getComputedStyle readbacks (the exact numbers the wave changed)
- ≥1 screenshot reference (saved beside it as `W<NN>-<route>-<viewport>-<scheme>.png`)
- for motion waves: ≥5 rAF-sampled timing frames (the live animation gate output)
- for contrast/legibility waves: the measured WCAG ratio
- the verdict (PASS / a tuned-magnitude correction)

A wave's PROGRESS status is `live-verified` ONLY when its DELTA.md exists. The
`proof:live-verified-ledger` close gate (W33) asserts: every `live-verified`/`complete` row
in PROGRESS has a DELTA.md here. Born-RED today (the convergence waves lack them).

## Retroactive backfill owed

W45, W52, W53, W56, W57, W59 are marked `live-verified` but lack a DELTA.md — the orchestrator
backfills them in the cardinal re-verify sweep (capturing the owed paired-π + screenshots),
OR they revert to `live-pending` until captured. This is the soundness debt the inventory
surfaced (round 2 of the aggregation inflation).

## The discipline going forward

Every develop→harvest cycle ends with the orchestrator running the chrome-devtools-mcp (or
playwright-mcp) live sweep AND writing the DELTA.md + screenshot BEFORE flipping PROGRESS to
`live-verified`. No exceptions — the capture IS the close criterion.
