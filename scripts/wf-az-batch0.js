// AZ Batch 0 dispatch — PRE-STAGED at authoring close (2026-06-10). DO NOT RUN
// before the user's greenlight + the H-hinge answers (AZ.md §USER HINGES).
// ONE lane: AZ.W-GATES (the manifest repair runs alone — every later wave's
// gates land on the sound runner it produces).
export const meta = {
  name: 'az-batch0',
  description: 'AZ Batch 0: W-GATES — the gate-manifest repair (the malformed row, the :5173 sweep, the dead routes, the shader-split re-points, the content-hash freshness model, the :az ledger arm + AZ VISUAL-ALLOWLIST, the W-DELTA0 re-captures). Opus. No git.',
  phases: [{ title: 'Batch0', detail: 'W-GATES solo' }],
}

const GU = '/Users/mkbabb/Programming/glass-ui'
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

const PRE = `You are a glass-ui BUILD agent at ${GU}, branch tranche/AY @ HEAD (AZ greenlit; v3.10.1 published; master ci GREEN). Demo at http://localhost:5199 (restart if down: npm run dev -- --port 5199 --strictPort; NEVER :5173 — a foreign app). NO git. Do NOT edit package.json/gates.mjs/PROGRESS/VISUAL-ALLOWLIST — report in sharedFileDeltas. Clean /tmp.`

phase('Batch0')
const gates = await agent(`${PRE}\n\n=== LANE: AZ.W-GATES ===\nExecute ${GU}/docs/tranches/AZ/waves/AZ.W-GATES.md IN FULL (§0 RE-GROUND first — re-grep every cite). Return (lane="W-GATES").`,
  { label: 'W-GATES', phase: 'Batch0', schema: SCHEMA, model: 'opus' })
return gates
