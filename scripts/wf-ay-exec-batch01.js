export const meta = {
  name: 'ay-exec-batch-0-1',
  description: 'AY execution Batch 0 infra + Batch 1: W-CARDINAL-INFRA (gate infra), the cohesion BLOCKERS W-GLASS (opaque Drawer + Slider-off-level) + W-MOTION (RED animation-coherence gate), and the research-consume lanes W-AUR1/W-BLOB1/W-FF1/W-DOCK1. Agents implement + run lint/typecheck/the wave gate; the orchestrator owns commits + DELTA capture.',
  phases: [{ title: 'Batch 0-1', detail: 'implement waves in batches of 4; each closes on its hard gate (no git — orchestrator commits)' }],
}
const GU = '/Users/mkbabb/Programming/glass-ui'
const WAVES = GU + '/docs/tranches/AY/waves'
const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['wave', 'status', 'filesChanged', 'gateRun', 'gateResult', 'deltaNeeded', 'summary'],
  properties: {
    wave: { type: 'string' },
    status: { type: 'string', enum: ['DONE', 'PARTIAL', 'BLOCKED', 'GATE-RED'] },
    filesChanged: { type: 'array', items: { type: 'string' } },
    gateRun: { type: 'string', description: 'the exact command(s) run to verify (lint/typecheck/proof gate)' },
    gateResult: { type: 'string', description: 'the gate output verdict (green/red + key lines)' },
    deltaNeeded: { type: 'boolean', description: 'true if a visual DELTA capture is owed (orchestrator captures it)' },
    summary: { type: 'string', description: 'what was implemented, the edit-sites, any decision recorded' },
  },
}
const PRE = `You are an AY EXECUTION (implementation) agent for glass-ui at ${GU}. Implement ONE wave to its authored spec. READ FIRST: your spec at ${WAVES}/<wave>.md (the defect→objective→edit-sites→HARD GATE) + ${GU}/CLAUDE.md (the canon + house keeps) + the precepts (gestalt, NO quick-fix/workaround/legacy/fallback, root-not-consumer, token-first, idiomatic Tailwind v4, the cardinal lesson).

RULES: edit ONLY your wave's files (disjoint by design). Do NOT run git (no add/commit/stash/checkout — the orchestrator owns the index, the K.W0 clause). After implementing, RUN the verification: \`npx vue-tsc --noEmit\` (typecheck) + the wave's named proof gate (\`npm run <gate>\`) if it exists, or author the gate per the spec if the spec says to build it. A wave is NOT done until its HARD GATE is green (or born-RED-by-design where the spec says so). If a visual DELTA is owed, set deltaNeeded=true (the orchestrator captures it). Return the structured result — your final message IS the data.`
function mk(wave, scope) {
  return () => agent(`${PRE}\n\n=== YOUR WAVE: ${wave} ===\nSpec: ${WAVES}/${wave}.md\nFocus: ${scope}\n\nImplement, verify the gate, return the structured result (wave="${wave}").`,
    { label: wave, phase: 'Batch 0-1', schema: SCHEMA })
}
const waves = [
  mk('AY.W-CARDINAL-INFRA', `Mint ${GU}/docs/tranches/AY/PROGRESS.md + ${GU}/docs/tranches/AY/audit/visual/ (a .gitkeep). Tranche-parameterize scripts/proof-live-verified-ledger.mjs to read BOTH the AX and AY tranche paths (cover the 'complete' status, match-filename, depth-header) and PORT a copy to slides/scripts/. Gate: born-RED against the 6 AX complete-exempt rows; reads both tranche paths; the slides port runs.`),
  mk('AY.W-GLASS', `The cohesion BLOCKER. Re-author .glass-drawer (src/styles/drawer.css — the opaque 'background-color: var(--background)') onto the glass-floating tier so it flattens with --glass-level; route Slider onto --glass-level; make the always-wired specular opt-in. Author scripts/proof-glass-cohesion.mjs (the inventory-complete π/source readback: every glass surface incl. Drawer+Slider flattens at level:0) and register it. Gate: proof:glass-cohesion green.`),
  mk('AY.W-MOTION', `Re-point the off-doctrine motion survivors (--dock-press-spring root=bouncy; cartoon-surface; any hardcoded ms/bezier) onto the easing doctrine. Widen scripts/proof-animation-coherence.mjs to a register-assignment assertion + CI-promote it (add to the ci tag set in gates.mjs + re-emit ci.yml). Gate: proof:animation-coherence GREEN + CI-tagged.`),
  mk('AY.W-DOCK1', `VERIFY-OR-FALSIFY the dock items-lag (the user's recurring complaint). Per the spec, capture the live dock collapse (the entering-child onset timing) and record whether the lag is real or the existing one-scalar morph already prevents it. Write the finding to the spec/PROGRESS. Gate: the lag captured or falsified with evidence (this is an analysis wave — deltaNeeded=true for the capture).`),
  mk('AY.W-AUR1', `Consume H-research-aurora's falsifiable bar; produce ${GU}/src/components/custom/aurora/RESEARCH.md + the NUMERIC arresting metric (colorfulness/structure-tensor/-5/3 spectrum — a concrete N-bound, not a ≥N placeholder). Gate: RESEARCH.md written + the metric is numeric.`),
  mk('AY.W-BLOB1', `TARGETED audit of the OPEN blob items (the dark-default identity defect — NOT a settled-question re-sweep); consume H-research-blob; produce ${GU}/src/components/custom/blob/RESEARCH.md + the ranked path + the default-identity decision recorded. Gate: RESEARCH.md + the decision recorded.`),
  mk('AY.W-FF1', `Rebase the born-RED AX.W43 fourier-field spec to HEAD (read docs/tranches/AX/audit/inventory/W43-fourier-field-SOTA.md); record the cross-repo math-duplication decision (fourier-analysis carries a byte-equivalent copy). Gate: the rebased spec written + the decision recorded.`),
]
const BATCH = 4
const out = []
for (let i = 0; i < waves.length; i += BATCH) {
  const batch = waves.slice(i, i + BATCH)
  log(`AY exec batch ${Math.floor(i / BATCH) + 1}/${Math.ceil(waves.length / BATCH)} — ${batch.length} waves`)
  out.push(...(await parallel(batch)).filter(Boolean))
}
return out
