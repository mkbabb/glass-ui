// AZ Batch 2 dispatch — TAXONOMY (H2 arm-a) runs SOLO first (it renames what
// the fan touches), then RAIL-EXTEND ‖ NORMALIZE ‖ CONTEXT-seam in parallel.
export const meta = {
  name: 'az-batch2',
  description: 'AZ Batch 2: W-DOCK-TAXONOMY [H2-a] solo → W-RAIL-EXTEND ‖ W-DOCK-NORMALIZE ‖ W-DOCK-CONTEXT. Opus. No git.',
  phases: [
    { title: 'Taxonomy', detail: 'W-DOCK-TAXONOMY solo (the rename root)' },
    { title: 'Fan', detail: 'RAIL-EXTEND ‖ NORMALIZE ‖ CONTEXT (3 lanes)' },
  ],
}

const GU = '/Users/mkbabb/Programming/glass-ui'
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
      required: ['packageJsonScripts', 'gatesMjsRows', 'progressRow', 'visualAllowlistAdd', 'migrationRows'],
      properties: {
        packageJsonScripts: { type: 'array', items: { type: 'string' } },
        gatesMjsRows: { type: 'array', items: { type: 'string' } },
        progressRow: { type: 'string' },
        visualAllowlistAdd: { type: 'array', items: { type: 'string' } },
        migrationRows: { type: 'array', items: { type: 'string' }, description: 'MIGRATION.md rename/retire rows this wave owes (the taxonomy clean break)' },
      },
    },
    summary: { type: 'string' },
    blocker: { type: ['string', 'null'] },
  },
}

const PRE = `You are a glass-ui BUILD agent at ${GU}, branch tranche/AY @ HEAD (AZ Batches 0-1 landed: the hairline rail, the flicker kill, the adaptive self-engage + observer, the de-red register — RE-GREP every cite, Batch 1 moved dock surfaces). Demo at http://localhost:5199 (restart if down: npm run dev -- --port 5199 --strictPort; NEVER :5173). IMPLEMENT idiomatically per your wave spec; CAPTURE own-surface DELTAs (real dims, literal filenames, the surface-paths + surface-hash freshness headers via the ledger gate's exported surfaceHash); VERIFY (your gates + npm run typecheck + the adjacent dock fleet). NO git. Do NOT edit package.json/gates.mjs/PROGRESS/VISUAL-ALLOWLIST/MIGRATION.md — report in sharedFileDeltas. Clean /tmp.`

phase('Taxonomy')
const tax = await agent(`${PRE}\n\n=== LANE: AZ.W-DOCK-TAXONOMY ===\nExecute ${GU}/docs/tranches/AZ/waves/AZ.W-DOCK-TAXONOMY.md IN FULL on the H2 ARM (a) fork (the user-ratified default): ONE GlassDock, ONE orientation axis — the variant discriminant removed, rail-ness folds into orientation+density, the "rail" noun de-overloaded per the spec §6 (the .dock-layer-rail switcher keeps its name; the W-RAIL-EXTEND name stays RESERVED), the collapse/morph machinery on BOTH orientations, clean break + the MIGRATION rename table (report rows in sharedFileDeltas.migrationRows). Return (lane="W-DOCK-TAXONOMY").`,
  { label: 'W-DOCK-TAXONOMY', phase: 'Taxonomy', schema: SCHEMA, model: 'opus' })
log('taxonomy: ' + (tax?.status ?? 'NULL'))

phase('Fan')
function lane(wave, extra) {
  return () => agent(`${PRE}\n\n=== LANE: AZ.${wave} ===\nNOTE: W-DOCK-TAXONOMY just landed in this batch (the orientation-axis collapse + renames) — your spec's §0 RE-GROUND is MANDATORY against the post-taxonomy tree.${extra ?? ''}\nExecute ${GU}/docs/tranches/AZ/waves/AZ.${wave}.md IN FULL. Return (lane="${wave}").`,
    { label: wave, phase: 'Fan', schema: SCHEMA, model: 'opus' })
}
const out = (await parallel([
  lane('W-RAIL-EXTEND'),
  lane('W-DOCK-NORMALIZE', '\nTHE ORCHESTRATOR RULING (binding): the premise re-census is step 0 — if zero divergent nav docks exist, execute the gate-extension scope alone (census-closure W5 + the feature-exempt contract + the pendingW40 promotion) and record the no-op honestly.'),
  lane('W-DOCK-CONTEXT', '\nTHE ORCHESTRATOR RULING (binding): mint the SEAM + the route→layer map this batch; the SHELL render (the DockLayerGroup addition to SidebarDock/BottomDock) is Batch-3 coordinated with W-SHELL-CONFIG — your gate may assert the seam + a STORY-route consumer pair now, with the shell-render clause marked Batch-3-owed in your DELTA.'),
])).filter(Boolean)
log('fan: ' + out.length + '/3')
return { tax, fan: out }
