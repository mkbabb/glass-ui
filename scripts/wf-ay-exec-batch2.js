export const meta = {
  name: 'ay-exec-batch-2-disjoint',
  description: 'AY execution Batch 2 (the DISJOINT component-perfection waves — different components, no shared write-scope): W-CON1 (constellation refitField transpose-UP), W-BLOB2 (blob light OKLCh default), W-DOCK2 (dock entering-child lockstep gate), W-FF2 (fourier W43 intensity model). Agents implement to the HARDENED spec + run the gate; orchestrator owns commits + DELTA capture.',
  phases: [{ title: 'Batch 2', detail: 'implement disjoint component waves; each closes on its proof gate; visual waves flag deltaNeeded' }],
}
const GU = '/Users/mkbabb/Programming/glass-ui'
const W = GU + '/docs/tranches/AY/waves'
const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['wave', 'status', 'filesChanged', 'gateRun', 'gateResult', 'deltaNeeded', 'summary'],
  properties: {
    wave: { type: 'string' }, status: { type: 'string', enum: ['DONE', 'PARTIAL', 'BLOCKED', 'GATE-RED'] },
    filesChanged: { type: 'array', items: { type: 'string' } },
    gateRun: { type: 'string' }, gateResult: { type: 'string' },
    deltaNeeded: { type: 'boolean' }, summary: { type: 'string' },
  },
}
const PRE = `You are an AY EXECUTION agent for glass-ui at ${GU}. Implement ONE wave to its HARDENED spec (the gates are now pinned to real machinery — read the spec carefully). READ: ${W}/<wave>.md + ${GU}/CLAUDE.md + the precepts. RULES: edit ONLY your wave's files (disjoint by design — different components). Do NOT run git (orchestrator owns the index, K.W0 clause). After implementing, RUN: \`npx vue-tsc --noEmit\` + the wave's named proof gate (author it per the spec if it is born-RED-by-design — the spec tells you). A wave closes only when its HARD GATE is green (or born-RED-by-design where specified). If a visual DELTA is owed, set deltaNeeded=true (orchestrator captures). Return the structured result.`
function mk(wave, scope) {
  return () => agent(`${PRE}\n\n=== YOUR WAVE: ${wave} ===\nSpec: ${W}/${wave}.md\nFocus: ${scope}\n\nImplement, verify the gate, return the result (wave="${wave}").`,
    { label: wave, phase: 'Batch 2', schema: SCHEMA })
}
const waves = [
  mk('AY.W-CON1', `Transpose the resize re-fit UP into the glass-ui engine (constellationField.ts) — it lives ONLY in the slides bespoke copy today, so adopting the lib REGRESSES it. Add refitField (proportional node rescale on RO resize + anomaly re-anchor) + the auto-drift target-source the README asserts; tune --constellation-alpha both modes. Author the born-RED π gate per the spec (proof:constellation-refit-live — bbox-coverage readback). deltaNeeded=true.`),
  mk('AY.W-BLOB2', `The blob DEFAULT renders a dark coffee-bean (color=var(--primary)+rimColor=var(--foreground), both near-black) — NOT the warm-cream bead every doc claims. Re-author the default to a light OKLCh base; simplify to atoms. Gate: the default-warmth π born-RED→GREEN per the spec. deltaNeeded=true (goo-blob/blob-mood DELTA).`),
  mk('AY.W-DOCK2', `The dock lockstep gate is TAUTOLOGICAL (box vs its own scalar; samples the LEAVING child only). Author the REAL entering-child onset gate (the user's lag = the entering child staggering ~150ms after the shell). Assert the LAST entering child's onset ≤ budget; retire the tautology; ONE DOCK_SPRING. Gate per the spec. deltaNeeded=true (lockstep DELTA).`),
  mk('AY.W-FF2', `Land the AX.W43 fourier-field intensity model (NEVER landed — OUTLINE_PEAK_ALPHA=0.24 survives, quadratic decay, the 'final' preset is a corner stub = visibly broken). Add the intensity prop + the 3-substrate parity; delete the dead evalFourier export. Gate: the final preset READS (not a corner stub) + 3-substrate parity per the spec. deltaNeeded=true.`),
]
const out = []
for (let i = 0; i < waves.length; i += 4) {
  const batch = waves.slice(i, i + 4)
  log(`AY Batch 2 — ${batch.length} disjoint component waves`)
  out.push(...(await parallel(batch)).filter(Boolean))
}
return out
