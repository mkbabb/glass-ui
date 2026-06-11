// AZ Batch 3 dispatch — two stages: A = BLOB-PAGE ‖ MOTION-SUITE ‖ SHELL-IDENTITY,
// B = BLOB-STUDIO ‖ SHELL-CONFIG. The stage split enforces the shared-write
// sequences (blob.vue/types.ts: page→studio; demo/layout/*: identity→config)
// and keeps the parallel width at 3 (the rate-limit lesson).
export const meta = {
  name: 'az-batch3',
  description: 'AZ Batch 3: stage A (W-BLOB-PAGE ‖ W-MOTION-SUITE ‖ W-SHELL-IDENTITY) → stage B (W-BLOB-STUDIO ‖ W-SHELL-CONFIG). Opus. No git.',
  phases: [
    { title: 'StageA', detail: 'blob-page ‖ motion-suite ‖ shell-identity' },
    { title: 'StageB', detail: 'blob-studio ‖ shell-config' },
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
        migrationRows: { type: 'array', items: { type: 'string' } },
      },
    },
    summary: { type: 'string' },
    blocker: { type: ['string', 'null'] },
  },
}

const PRE = `You are a glass-ui BUILD agent at ${GU}, branch tranche/AY @ HEAD (AZ Batches 0-2 landed: the gate-manifest repair, the S1 quartet, the dock taxonomy/rail-extend/normalize/context — RE-GREP every cite, the dock band moved a lot). Demo at http://localhost:5199 (restart if down: npm run dev -- --port 5199 --strictPort; NEVER :5173; a SECOND user-audit instance runs on :5210 — leave it alone). IMPLEMENT idiomatically per your wave spec; CAPTURE own-surface DELTAs (real dims, literal filenames, surface-paths + surface-hash headers via the ledger's exported surfaceHash); VERIFY (your gates + npm run typecheck + the adjacent fleets). NO git. Do NOT edit package.json/gates.mjs/PROGRESS/VISUAL-ALLOWLIST/MIGRATION.md — report in sharedFileDeltas. Clean /tmp.`

function lane(wave, phase, extra) {
  return () => agent(`${PRE}\n\n=== LANE: AZ.${wave} ===${extra ?? ''}\nExecute ${GU}/docs/tranches/AZ/waves/AZ.${wave}.md IN FULL (§0 RE-GROUND first). Return (lane="${wave}").`,
    { label: wave, phase, schema: SCHEMA, model: 'opus' })
}

phase('StageA')
const a = (await parallel([
  lane('W-BLOB-PAGE', 'StageA', '\nBINDING re-attribution: the GL renderer is NOT re-opened (refuted-crisp); the defect surface is the watercolor-dot swatches + the satellites demo-config + the page staging. The GL-fence split (proof:blob-page-fence, ci) is MANDATORY per the orchestrator ruling §X.'),
  lane('W-MOTION-SUITE', 'StageA', '\nBINDING: the springs.vue local spring FORK dies onto SPRING_PRESETS; the curve canon is the FULL enumerated inventory (value.js eases + keyframes curves + steps + editable bezier); ppmycota purple is DEMO-LOCAL only (never a library token); the keyframes demo chassis transposes tailwind-first.'),
  lane('W-SHELL-IDENTITY', 'StageA', '\nBINDING: the optical-centering acceptance is the MEASURED BAND (re-run the C8 livescan, abs(dx)<=0.5 AND abs(dy)<=0.5), never a hardcoded transform value alone. W-REGISTER-IOS landed — consume its hover register.'),
])).filter(Boolean)
log('stage A: ' + a.length + '/3')

phase('StageB')
const b = (await parallel([
  lane('W-BLOB-STUDIO', 'StageB', '\nSEQUENCED after W-BLOB-PAGE (same-batch shared-write on blob.vue/types.ts — re-grep its landed edits first). The G-PERF numbers are MACHINE-CLASS-PINNED (the M5-Max dev box; no CI arm enforces them) per the orchestrator ruling §X; W-BLOB-GLASS folds in under its ORIGINAL G-PERF + G-BROWSER gates — the uBackdrop refraction ships ONLY if both hold (the user conditional).'),
  lane('W-SHELL-CONFIG', 'StageB', '\nSEQUENCED after W-SHELL-IDENTITY (shared demo/layout/*). The R3-4 deletions are binding: the composables view REMOVED, the floating PresetEditor FAB REMOVED, the dark-mode toggle FOLDED into the gear configurator (density/ui-scale/glass-level/theme/motion). W-DOCK-CONTEXT landed route-driven shell DockLayerGroups — coordinate, do not regress them.'),
])).filter(Boolean)
log('stage B: ' + b.length + '/2')
return { a, b }
