export const meta = {
  name: 'ay-batch2-remainder',
  description: 'AY Batch-2 remainder: the 4 file-disjoint component lanes (constellation / aurora / slider / blob) as serial chains. Each agent implements its wave spec to the gate + captures the live DELTA against the persistent :5173 server, and REPORTS the 4 shared-file deltas (package.json / gates.mjs / PROGRESS / VISUAL-ALLOWLIST) for the orchestrator to integrate (no shared-file races, no git). Parallel across lanes, serial within.',
  phases: [
    { title: 'Constellation', detail: 'W-CON2 (warp verify + eggs) then W-CON3 (?freeze seam)' },
    { title: 'Aurora', detail: 'W-AUR2 (doc+prop) then W-AUR-WEBGPU-DECIDE (retire) then W-AUR-PAINTERLY (arresting metric)' },
    { title: 'Slider', detail: 'W-SLD1 (rounded-knob decision b) then W-SLD2 (consumer-boundary) then W-DOCK3 (dock+slider story)' },
    { title: 'Blob', detail: 'W-BLOB3 (DI strip + interaction DELTA)' },
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
    gatesGreen: { type: 'boolean', description: 'the waves own gate(s) run green via node scripts/proof-X.mjs' },
    typecheckGreen: { type: 'boolean' },
    deltaCaptured: { type: 'boolean', description: 'real on-disk own-surface PNGs captured for the visual DELTA' },
    capturedPngs: { type: 'array', items: { type: 'string' }, description: 'absolute paths of the captured DELTA PNGs' },
    sharedFileDeltas: {
      type: 'object', additionalProperties: false,
      required: ['packageJsonScripts', 'gatesMjsRows', 'progressRow', 'visualAllowlistAdd'],
      properties: {
        packageJsonScripts: { type: 'array', items: { type: 'string' }, description: 'exact JSON lines to add to package.json scripts (proof:X entries)' },
        gatesMjsRows: { type: 'array', items: { type: 'string' }, description: 'exact GATES-array object literals to append in scripts/gates.mjs' },
        progressRow: { type: 'string', description: 'the full PROGRESS.md table row for this wave (status + DELTA link)' },
        visualAllowlistAdd: { type: 'array', items: { type: 'string' }, description: 'wave-ids to add to VISUAL-ALLOWLIST.json (empty if the row closes live-verified, not complete)' },
      },
    },
    summary: { type: 'string' },
    blocker: { type: ['string', 'null'] },
  },
}

const PRE = `You are a glass-ui AY build agent at ${GU}, branch tranche/AY. Typecheck is GREEN at HEAD; a demo dev server is ALREADY RUNNING at http://127.0.0.1:5173 (reuse it for all live captures — Playwright reuseExistingServer is true; do NOT start your own server, do NOT kill 5173).

EXECUTE your assigned wave to its HARD GATE. Procedure:
1. READ IN FULL: your wave spec at ${W}/<wave>.md (INCLUDING its top "§0 — RE-GROUND" block — that block re-bases every stale file:line cite; do the mandated step-0 re-grep of every cite against real HEAD before editing). Also read ${GU}/CLAUDE.md + the precepts it names.
2. IMPLEMENT the spec edit-sites idiomatically (no workarounds, gestalt, DRY/KISS). Touch ONLY your wave-owned files (your component source + your OWN new proof script + your OWN new spec + your OWN unit tests + your OWN <wave>-DELTA.md).
3. CAPTURE the live DELTA: run your visual gate (node scripts/proof-<x>-live.mjs OR the playwright spec) against :5173, save real on-disk PNGs of YOUR own surface ({light,dark} x >=2 viewports, +>=5 hover/motion frames where the spec demands) into ${GU}/docs/tranches/AY/audit/visual/ named <WAVE>-<route>-<viewport>-<scheme>.png. The capture must DEMONSTRATE the wave claim (the cardinal lesson — a screenshot that shows the opposite of the claim, or a mislabeled viewport, is a FAIL; if you capture mobile, use a real 375/390-wide viewport, not a 1280 page). Write the paired-pi numeric readback into the DELTA doc.
4. VERIFY: your gate runs green via \`node scripts/proof-<x>.mjs\` (direct invoke; it does not need package.json wiring to run); \`npx vue-tsc --noEmit\` exits 0; your component gates still pass.

ABSOLUTE RULES:
- Do NOT run ANY git command (no add/commit/stash/checkout/reset/restore). The orchestrator owns the index.
- Do NOT edit these 4 SHARED files (the orchestrator integrates them to avoid races): package.json, scripts/gates.mjs, docs/tranches/AY/PROGRESS.md, docs/tranches/AY/audit/visual/VISUAL-ALLOWLIST.json. Instead REPORT the exact deltas in sharedFileDeltas (the package.json proof:X line(s), the gates.mjs GATES row(s), the full PROGRESS row, the VISUAL-ALLOWLIST add). You MAY edit tests-visual/pi-manifest.ts ONLY if you add a NEW PI_TARGETS getter AND no sibling lane needs it — prefer resolveScene(category,story) inline in your spec (the manifest is dynamic; existing scenes: substrates/aurora, substrates/blob, dock/overview, feedback/alert, plus any demo story via resolveScene).
- If a sibling wave in your lane runs BEFORE yours (serial chain), its edits are already on disk — re-grep before you edit.
Return the structured result (set wave to your wave-id). If blocked, set status BLOCKED + the blocker string; capture/partial-complete what you can.`

function ag(wave, extra) {
  const scope = extra ? `\n\n=== WAVE: ${wave} ===\n${extra}` : `\n\n=== WAVE: ${wave} ===`
  return agent(`${PRE}${scope}\n\nExecute ${wave} now; return the structured result.`,
    { label: wave, schema: SCHEMA })
}

// LANE-CON (serial: W-CON2 -> W-CON3) — owns constellation source + tokens.css constellation cohort + the demo constellation story
async function laneCon() {
  const r2 = await ag('W-CON2', 'phase=Constellation. Warp VERIFY (capture, do NOT re-build the AX.W17 spring) + the decided-scope eggs (gravity-well = engine prop; supernova = demo-only; flock/konami = CUT) + the omega-derivation reconcile. PER THE §0 RE-GROUND: you own the ENTIRE numeric --constellation-* token cohort (W-CON1 declared ZERO numeric tokens — declare warp-response/zeta/well-*/wander-idle/wander-jitter all). All constellationField.ts cites are +143 stale (file is 653) — re-grep. Gates: proof:constellation-egg-live (new) + proof:constellation-tokens + the warp DELTA.')
  const r3 = await ag('W-CON3', 'phase=Constellation. Runs AFTER W-CON2 on disk. The ?freeze deterministic-capture seam (location.search export|print|freeze + :freeze prop override) + the anomaly drawOverlay recipe in the README (no domain props) + the export VERIFY (/constellation dts carries freeze). Add __constellationFreeze demo handle alongside __constellationWarp/__constellationRefit. Gate: proof:constellation-freeze-live (new, two back-to-back mounts hash-identical).')
  return [r2, r3]
}

// LANE-AUR (serial: W-AUR2 -> W-AUR-WEBGPU-DECIDE -> W-AUR-PAINTERLY) — owns aurora/*
async function laneAur() {
  const r2 = await ag('W-AUR2', 'phase=Aurora. The no-op strike: the OKLAB/atoms migration is DONE — strike the stale doc claims + add ONLY the derive-color PROP sliver (<=1 prop on Aurora.vue, no behaviour delta). G4 reads proof:ay-w0-reground (Batch 0 landed it — verify it exists). package.json cites are +9 stale — re-grep.')
  const rw = await ag('W-AUR-WEBGPU-DECIDE', 'phase=Aurora. Runs AFTER W-AUR2. The RETIRE branch (default, no consumer for the Kuwahara finish at HEAD): delete the medium-less WGSL twin (aurora.wgsl.ts 235 + gpuRuntime.ts 181 + createGPUCanvas.ts 140) — a clean deletion proof; carve the procedural-color WGSL exports out of procedural-color.glsl.ts; retire the 5 webgpu proof scripts. Confirm WEBGPU_PARITY=false. Mark the RESURRECT branch N/A with rationale. proof:webgpu-substrate-single + verify-export-types green without the twin.')
  const rp = await ag('W-AUR-PAINTERLY', 'phase=Aurora. Runs AFTER the WEBGPU retire. The artistic-convergence wave: tune the painterly mediums (van-Gogh/oil-pastel/oil) in brush.glsl.ts + mediums.glsl.ts + tonemap.glsl.ts + atoms.ts so the live-GPU aurora field lands the THREE reference-anchored bands from scripts/aurora-arresting-metric.mjs: colorfulness C in [55.67,95.67], anisotropy A in-band, spectrum-slope beta in [-1.85,-1.45], on REAL Metal-GPU (NOT SwiftShader), per medium, captured DELTA {light,dark}. This is HIGH-VARIANCE: if after a genuine tuning effort you cannot land all 3 bands x 3 mediums, close DONE_WITH_MISSES at your best state, record which bands/mediums miss + the residual in the DELTA, and note the named-successor route (iter-2 tune OR the W-AUR-WEBGPU-DECIDE Kuwahara resurrect). Do NOT lower the bands to pass; do NOT fake the GPU. Budget real iteration before declaring a miss.')
  return [r2, rw, rp]
}

// LANE-SLD (serial: W-SLD1 -> W-SLD2 -> W-DOCK3) — Slider.vue single-writer chain + dock-with-slider
async function laneSld() {
  const r1 = await ag('W-SLD1', 'phase=Slider. THE DESIGN DECISION IS MADE (user-directed, per the standing PROMPT-CORPUS:51 verbatim "a FULLY ROUNDED iOS knob continuous with the track, not pill/offset", re-stated across tranches): resolution = (b) REVERT+INVERT-GATE. Implement it: edit Slider.vue standard .slider-thumb (the rule near :224, re-grep — W-GLASS already landed --glass-level routing in this SFC; PRESERVE the glass-level legs, change ONLY the radius/width/aspect to a fully-rounded circular iOS knob: square aspect, border-radius full/50%, continuous-with-the-fill not a slim offset cap), and INVERT the proof-slider-two-only.mjs isCircle clause (near :126) so it REQUIRES the round form (not forbids it). Also fix D2 (the spectrum round-fallback fidelity: lift Slider.vue:309 off bare --radius-lg so the fallback reads squircle-adjacent, >=0.55x thumb width). Capture the engine-aware squircle-language-pattern DELTA on chromium proving the round knob + the squircle fallback. Record in the DELTA doc: "resolution (b), user-directed per PROMPT-CORPUS:51 standing preference." Correct PROMPT-CORPUS:51 + AUDIT-LEDGER row 9 OPEN->DONE + the inline JSDoc (greenfield, no history meta).')
  const r2 = await ag('W-SLD2', 'phase=Slider. Runs AFTER W-SLD1. The consumer-boundary gate clause: add the 5th clause to proof-slider-two-only.mjs (reuse the constellation.mjs CONSUMERS/resolveSibling/skipSibling machinery — the >=2-consumer walk) + the born-RED detector-canary (export scanSliderVariants, mirror dock-wrap-content-driven.detect.test.ts). It REDs on a hypothetical variant="rounded" third key. Reads Slider.vue (do not write it). No live DELTA (a source/gate wave).')
  const rd = await ag('W-DOCK3', 'phase=Slider. Runs AFTER W-SLD1/W-SLD2 (it WRITES Slider.vue usage in a story — re-grep the SLD1-resolved thumb). Author the MISSING dock-with-slider composition story (demo/stories/compositions/dock-with-slider.vue) exercising the keepDockOpen pointer contract; capture the drag DELTA (the slider drag holds the dock open). Re-home the progress-bar clause to L (E9) per the spec. Gate: proof:dock-hold-contract + the dock+slider live capture. Owns useDockHold.ts + dock/morph.css + the new story; touches deck.css/DeckView only as the spec directs.')
  return [r1, r2, rd]
}

// LANE-BLOB (W-BLOB3) — DI strip + interaction DELTA. NOTE: W-GOD1 carve + W-COHERE touch the same SFCs LATER (Batch 4) — this lane strips first (eases the carve, per the §0 RG-B).
async function laneBlob() {
  const r = await ag('W-BLOB3', 'phase=Blob. BOOK demo-only + STRIP the speculative ColorResolver DI (remove the required colorResolver prop + the loud-throw + the inject ceremony from GooBlob.vue + useMetaballRenderer.ts — a clean break, inv-4, the resolver was always defaultBlobColorResolver at the one real consumer). Per §0 RG: useMetaballRenderer is 707 (cites near-miss, re-grep); the W-GOD1 carve runs LATER so your strip eases it. Capture the hover-flick + dome-luma BAND interaction DELTA (the cream bead leaning, W-BLOB2 landed the cream default). verify-export-types green (the /goo-blob subpath surface changed) + the full proof:blob-* fleet green.')
  return [r]
}

phase('Constellation')
const lanes = await parallel([
  () => laneCon().catch((e) => [{ wave: 'LANE-CON', status: 'BLOCKED', blocker: String(e) }]),
  () => laneAur().catch((e) => [{ wave: 'LANE-AUR', status: 'BLOCKED', blocker: String(e) }]),
  () => laneSld().catch((e) => [{ wave: 'LANE-SLD', status: 'BLOCKED', blocker: String(e) }]),
  () => laneBlob().catch((e) => [{ wave: 'LANE-BLOB', status: 'BLOCKED', blocker: String(e) }]),
])

const flat = lanes.flat().filter(Boolean)
log(`Batch-2-remainder complete: ${flat.length} wave results`)
return flat
