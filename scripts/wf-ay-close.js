export const meta = {
  name: 'ay-batch5-close',
  description: 'AY Batch 5 — the terminal close: ONE focused lane for the NOTE-clearing sweep (the 2 R6 re-runs-on-real + the 4 freshness re-captures under W-DELTA0) + ONE for W-CLOSE1 (the overfitting audit + FINAL.md + proof:ay-final authored born-RED-able + the budget rebaseline + the full release battery). Serial (the close reads the cleared board). Opus. No git.',
  phases: [
    { title: 'Sweep', detail: 'the 6 graced NOTEs cleared (R6 re-runs + freshness re-captures)' },
    { title: 'Close', detail: 'W-CLOSE1: overfitting audit + FINAL + proof:ay-final + the release battery' },
  ],
}

const GU = '/Users/mkbabb/Programming/glass-ui'
const W = GU + '/docs/tranches/AY/waves'

const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['lane', 'status', 'gatesGreen', 'typecheckGreen', 'sharedFileDeltas', 'summary', 'blocker'],
  properties: {
    lane: { type: 'string' },
    status: { type: 'string', enum: ['DONE', 'DONE_WITH_MISSES', 'PARTIAL', 'BLOCKED'] },
    gatesGreen: { type: 'boolean' },
    typecheckGreen: { type: 'boolean' },
    sharedFileDeltas: {
      type: 'object', additionalProperties: false,
      required: ['packageJsonScripts', 'gatesMjsRows', 'progressRow', 'visualAllowlistAdd'],
      properties: {
        packageJsonScripts: { type: 'array', items: { type: 'string' } },
        gatesMjsRows: { type: 'array', items: { type: 'string' } },
        progressRow: { type: 'string' },
        visualAllowlistAdd: { type: 'array', items: { type: 'string' } },
      },
    },
    summary: { type: 'string' },
    blocker: { type: ['string', 'null'] },
  },
}

const PRE = `You are a glass-ui BUILD agent at ${GU}, branch tranche/AY @ 83e1e3b2 (Batch 4 closed; 31 live-verified / 0 violations; typecheck green). Demo at http://localhost:5199 (restart if down: npm run dev -- --port 5199; NEVER :5173). NO git. Do NOT edit package.json/gates.mjs/PROGRESS/VISUAL-ALLOWLIST — report in sharedFileDeltas. Clean /tmp.`

phase('Sweep')
const sweep = await agent(`${PRE}\n\n=== LANE: NOTE-SWEEP (the 6 graced NOTEs cleared) ===\nThe cardinal gate (npm run proof:live-verified-ledger:ay) prints 4 freshness NOTEs + 2 R6 gate-status NOTEs — clear ALL SIX honestly:\n(1) THE 2 R6 RE-RUNS-ON-REAL: .cache/gates/AY-dock-items-lag-capture.json + AX-dock-animation-live.json persist status:fail while the DELTAs claim GREEN. Re-run BOTH gates against the REAL /dock/overview dock on :5199 (GLASS_UI_DEMO_URL/PORT env; the route fix landed long ago) and persist the PASS artefacts. If a gate genuinely FAILS on the real surface, that is a REAL regression — root-cause + fix it (the dock band rebuilt the morph; the gate thresholds may need the carve/band-aware re-points with rationale, the same class as the prior re-points).\n(2) THE 4 FRESHNESS RE-CAPTURES (the W-DELTA0 owed sweep): W-DOCK1 / W-CON1 / W-BLOB2 / W-DOCK2 — each DELTA's captures predate the surface's last change. Each is ALREADY superseded-by a fresh sibling capture (W-DOCK-NAV / W-SB-REVERIFY / W-BLOB-REBUILD) — per the gate's own protocol, do the OWN-WAVE-ID re-capture: re-shoot each wave's own named frames on the CURRENT tree (the same scenes; real dims) + add the AY.W-LIVE1 freshness headers (capture-commit + surface-paths) to the 4 DELTAs (and to any other DELTA lacking headers IF quick). The gate's freshness NOTEs must read 0 after (run it to confirm; the bare-mode grace no longer needed on these rows).\nReturn (lane="NOTE-SWEEP").`,
  { label: 'note-sweep', phase: 'Sweep', schema: SCHEMA, model: 'opus' })

phase('Close')
const close = await agent(`${PRE}\n\n=== LANE: W-CLOSE1 (the terminal close) ===\nExecute ${W}/AY.W-CLOSE1.md on the cleared board: (1) THE OVERFITTING AUDIT per docs/audits/overfitting-audit.md — every src/ artefact has ≥2 sites or is exported-with-consumers or is demo-private; the prune's PRUNE-LEDGER + the evidence docs are the census; the orphan-scan (any new evalFourier-class orphans); record the verdict table. (2) FINAL.md — the tranche close document (the wave table with final statuses; the chronic-defer telemetry CLOSED — zero silent carries, the register is the proof; the user-audit closure; the convergence story; the greenfield voice, no migration meta). (3) AUTHOR + RUN proof:ay-final (the close gate: its clauses per the spec — the cardinal gate green + the register completeness + the carve ratchet + the suite battery; born-RED-able: a synthetic violation REDs it). (4) The budget rebaseline (npm run profile:budget — re-baseline post-prune/carve with the numbers recorded). (5) THE RELEASE BATTERY: npm run typecheck + npm run build + npm run verify-export-types + npm run proof:gen-ci-fresh + the FULL local gate suite via scripts/gates.mjs --run local (report every gate's exit; ANY red is a blocker — fix the honest ones, report the rest). Return (lane="W-CLOSE1") with the battery results enumerated in summary.`,
  { label: 'W-CLOSE1', phase: 'Close', schema: SCHEMA, model: 'opus' })

return { sweep, close }
