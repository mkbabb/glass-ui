export const meta = {
  name: 'ay-batch2-finish',
  description: 'AY Batch-2 REMAINDER (low-concurrency, 3 serial lanes = 3 agents max, to avoid the burst rate-limit). W-BLOB3 + W-SLD1 already LANDED (skip). Finishes: CON lane (W-CON2 DELTA-finish then W-CON3), AUR lane (W-AUR2 finish then WEBGPU-retire then PAINTERLY), SLD lane (W-SLD2 then W-DOCK3). Re-grep the partial on-disk state first. Capture against :5173. Report shared-file deltas; no git.',
  phases: [
    { title: 'Finish', detail: '3 serial lanes (constellation / aurora / slider-dock), 3 concurrent max' },
  ],
}

const GU = '/Users/mkbabb/Programming/glass-ui'
const W = GU + '/docs/tranches/AY/waves'

const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['wave', 'status', 'gatesGreen', 'typecheckGreen', 'deltaCaptured', 'capturedPngs', 'sharedFileDeltas', 'summary', 'blocker'],
  properties: {
    wave: { type: 'string' },
    status: { type: 'string', enum: ['DONE', 'DONE_WITH_MISSES', 'PARTIAL', 'BLOCKED'] },
    gatesGreen: { type: 'boolean' },
    typecheckGreen: { type: 'boolean' },
    deltaCaptured: { type: 'boolean' },
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

const PRE = `You are a glass-ui AY build agent at ${GU}, branch tranche/AY. A demo dev server is ALREADY RUNNING at http://127.0.0.1:5173 (reuse it for captures; Playwright reuseExistingServer is true; do NOT start/kill it). Typecheck is currently GREEN.

IMPORTANT — PARTIAL ON-DISK STATE: a prior workflow pass landed SOME of this batch then died on a transient rate-limit. W-BLOB3 + W-SLD1 are DONE (do not touch). Your wave MAY be partially landed (source written, DELTA/gate not finished). So your FIRST step is to RE-GREP + READ the current on-disk state of your wave's files and figure out what is already done vs owed — then FINISH it. Do not blindly re-author from scratch over good partial work; reconcile and complete.

PROCEDURE:
1. READ your wave spec ${W}/<wave>.md IN FULL (including its top §0 RE-GROUND block — re-base every stale cite). Read ${GU}/CLAUDE.md.
2. Inspect the current on-disk state of your wave's files; complete whatever is owed (source to the gate + the captured live DELTA).
3. CAPTURE the live DELTA against :5173 — real on-disk own-surface PNGs ({light,dark} x >=2 viewports, +>=5 frames where the spec demands motion) into ${GU}/docs/tranches/AY/audit/visual/ named <WAVE>-<route>-<viewport>-<scheme>.png, and write the <WAVE>-DELTA.md with the paired-pi numeric readback. The capture must DEMONSTRATE the wave claim (cardinal lesson — a real 375/390-wide viewport for mobile, not a 1280 page; the picture must match the claim).
4. VERIFY: your gate runs green via \`node scripts/proof-<x>.mjs\`; \`npx vue-tsc --noEmit\` exits 0.

RULES:
- Do NOT run ANY git command.
- Do NOT edit these SHARED files (orchestrator integrates): package.json, scripts/gates.mjs, docs/tranches/AY/PROGRESS.md, docs/tranches/AY/audit/visual/VISUAL-ALLOWLIST.json. REPORT their deltas in sharedFileDeltas. Use resolveScene(category,story) inline for pi targets (do not edit pi-manifest PI_TARGETS).
- Clean up any tmp-probe-*.mjs / scratch files you create.
Return the structured result.`

function ag(wave, extra) {
  return agent(`${PRE}\n\n=== WAVE: ${wave} ===\n${extra}\n\nFinish ${wave}; return the structured result.`,
    { label: wave, phase: 'Finish', schema: SCHEMA })
}

async function laneCon() {
  const r2 = await ag('W-CON2', 'PARTIAL — source likely landed (constellationField.ts eggs/well + tokens + proof-constellation-egg-live.mjs + constellation-egg-live.spec.ts exist). FINISH: verify the warp VERIFY capture + the egg gravity-well π readback, CAPTURE the W-CON2 DELTA (warp before/after + the egg-live capture) into audit/visual/, write W-CON2-DELTA.md, confirm proof:constellation-egg-live + proof:constellation-tokens green. Own the ENTIRE --constellation-* numeric token cohort (W-CON1 declared none).')
  const r3 = await ag('W-CON3', 'NOT started. The ?freeze deterministic-capture seam (location.search export|print|freeze + :freeze prop override) + the anomaly drawOverlay README recipe (no domain props) + the export VERIFY (/constellation dts carries freeze). Add __constellationFreeze demo handle. Gate: proof:constellation-freeze-live (new — two back-to-back mounts hash-identical). Capture the DELTA.')
  return [r2, r3]
}

async function laneAur() {
  const r2 = await ag('W-AUR2', 'PARTIAL — the residue strike landed (aurora DESIGN.md/README + proof-aur2-residue.mjs + proof-aur2-residue-live.mjs). FINISH: reconcile the TWO proof variants (keep ONE — prefer the spec-named one; delete the redundant), verify the <=1 derive-color PROP sliver on Aurora.vue, confirm G4 reads proof:ay-w0-reground (it exists now), capture/confirm the DELTA if the wave changed pixels (it may be doc-only -> dev-complete, no DELTA owed). Report which proof script is canonical.')
  const rw = await ag('W-AUR-WEBGPU-DECIDE', 'NOT started. RETIRE branch (no Kuwahara consumer at HEAD): delete the medium-less WGSL twin (aurora.wgsl.ts ~235 + gpuRuntime.ts ~181 + createGPUCanvas.ts ~140) as a clean deletion proof; carve the procedural-color WGSL exports; retire the dead webgpu proof scripts; confirm WEBGPU_PARITY=false; mark RESURRECT N/A. proof:webgpu-substrate-single + verify-export-types green without the twin. Deletion-proof wave (no live DELTA owed).')
  const rp = await ag('W-AUR-PAINTERLY', 'NOT started. HIGH-VARIANCE artistic convergence: tune the painterly mediums (brush/mediums/tonemap.glsl.ts + atoms.ts) so the live-GPU aurora lands the 3 reference-anchored bands from scripts/aurora-arresting-metric.mjs (C in [55.67,95.67], A in-band, beta in [-1.85,-1.45]) on REAL Metal-GPU per medium, captured DELTA {light,dark}. Mint proof:aurora-arresting (the gate). If after genuine iteration you cannot land all 3x3, close DONE_WITH_MISSES at your best state + record the residual + the named-successor route. Do NOT lower the bands; do NOT fake the GPU.')
  return [r2, rw, rp]
}

async function laneSld() {
  const r2 = await ag('W-SLD2', 'NOT started. W-SLD1 LANDED (the rounded-knob resolution (b) + the inverted isCircle clause are on disk in Slider.vue + proof-slider-two-only.mjs — re-grep). Add the 5th CONSUMER-BOUNDARY clause to proof-slider-two-only.mjs (reuse constellation.mjs CONSUMERS/resolveSibling/skipSibling) + the born-RED detector-canary (export scanSliderVariants; mirror dock-wrap-content-driven.detect.test.ts). REDs on a hypothetical variant="rounded" third key. No live DELTA (source/gate wave).')
  const rd = await ag('W-DOCK3', 'NOT started (proof-dock-hold-contract.mjs may pre-exist — re-grep). Author the dock-with-slider composition story (demo/stories/compositions/dock-with-slider.vue) exercising keepDockOpen; capture the drag DELTA (slider drag holds the dock open). Re-home the progress-bar clause to L (E9) per the spec. Owns useDockHold.ts + dock/morph.css + the new story.')
  return [r2, rd]
}

phase('Finish')
const lanes = await parallel([
  () => laneCon().catch((e) => [{ wave: 'LANE-CON', status: 'BLOCKED', blocker: String(e) }]),
  () => laneAur().catch((e) => [{ wave: 'LANE-AUR', status: 'BLOCKED', blocker: String(e) }]),
  () => laneSld().catch((e) => [{ wave: 'LANE-SLD', status: 'BLOCKED', blocker: String(e) }]),
])
const flat = lanes.flat().filter(Boolean)
log(`Batch-2 finish complete: ${flat.length} wave results`)
return flat
