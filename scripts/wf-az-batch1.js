// AZ Batch 1 dispatch — PRE-STAGED at authoring close (2026-06-10). DO NOT RUN
// before Batch 0 lands + the user answers H1 (de-red scope) + H3 (luma-observer
// default). The orchestrator INJECTS the hinge answers into the lane prompts at
// dispatch (the ANSWERS const below) — a lane never guesses a hinge.
export const meta = {
  name: 'az-batch1',
  description: 'AZ Batch 1 — the S1 quartet: W-DOCK-RAIL ‖ W-DOCK-FLICKER ‖ W-ADAPTIVE-AUTO [H3] ‖ W-REGISTER-IOS [H1]. Four opus lanes. No git.',
  phases: [{ title: 'Batch1', detail: 'the S1 quartet (4 lanes)' }],
}

const GU = '/Users/mkbabb/Programming/glass-ui'
// FILLED BY THE ORCHESTRATOR AT DISPATCH from the user's hinge answers:
const ANSWERS = {
  H1: 'UNANSWERED — do not dispatch W-REGISTER-IOS without it',
  H3: 'UNANSWERED — do not dispatch W-ADAPTIVE-AUTO without it',
}

const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['lane', 'status', 'gatesGreen', 'typecheckGreen', 'capturedPngs', 'sharedFileDeltas', 'summary', 'blocker'],
  properties: {
    lane: { type: 'string' },
    status: { type: 'string', enum: ['DONE', 'DONE_WITH_MISSES', 'PARTIAL', 'BLOCKED'] },
    gatesGreen: { type: 'boolean' },
    typecheckGreen: { type: 'boolean' },
    capturedPngs: { type: 'array', items: { type: 'string' } },
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

const PRE = `You are a glass-ui BUILD agent at ${GU}, branch tranche/AY @ HEAD (AZ Batch 0 landed: the gate manifest is sound, the :az ledger arm + AZ VISUAL-ALLOWLIST exist, the content-hash freshness model is live). Demo at http://localhost:5199 (NEVER :5173). IMPLEMENT idiomatically per your wave spec; CAPTURE own-surface DELTAs (real dims, literal filenames, the freshness header per the content-hash model); VERIFY (your gates + npm run typecheck + the adjacent fleets). NO git. Do NOT edit package.json/gates.mjs/PROGRESS/VISUAL-ALLOWLIST — report in sharedFileDeltas. Clean /tmp.`

function lane(wave, extra) {
  return () => agent(`${PRE}\n\n=== LANE: AZ.${wave} ===\nExecute ${GU}/docs/tranches/AZ/waves/AZ.${wave}.md IN FULL (§0 RE-GROUND first).${extra ?? ''}\nReturn (lane="${wave}").`,
    { label: wave, phase: 'Batch1', schema: SCHEMA, model: 'opus' })
}

phase('Batch1')
const out = (await parallel([
  lane('W-DOCK-RAIL'),
  lane('W-DOCK-FLICKER'),
  lane('W-ADAPTIVE-AUTO', `\nTHE H3 HINGE ANSWER (binding): ${ANSWERS.H3}`),
  lane('W-REGISTER-IOS', `\nTHE H1 HINGE ANSWER (binding): ${ANSWERS.H1}`),
])).filter(Boolean)
log('batch 1: ' + out.length + '/4')
return out
