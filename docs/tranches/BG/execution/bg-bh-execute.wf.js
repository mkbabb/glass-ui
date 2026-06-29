// bg-bh-execute.wf.js — the JOINT BG+BH 5.0.0 EXECUTION engine.
// Mirrors converge/bg-converge.wf.js transposed convergence→EXECUTION: a wave-frontier sweep over the
// embedded BG+BH DAG, batches-of-3 worktree BUILD agents → orchestrator-agent INTEGRATE (apply+gate+commit
// +cursor) → NON-AUTHORING dual-engine PAINT JUDGE → commit-per-wave. WAVE-DONE = device-free proof GREEN
// THEN (paint-gated only) a real Chrome.app+Safari.app both-modes on-disk PASS. The full spec is
// docs/tranches/BG/execution/engine-design.md; the DAG source-of-truth is bg-build-map.md +
// bh-interleave-map.md; the durable cursor is EXECUTION-PROGRESS.md.
//
// RUNTIME NOTE: the workflow script has NO filesystem/git access — every file/git op runs THROUGH an agent
// (LOADER reads the maps→DAG; INTEGRATOR applies patches+commits+writes the cursor; JUDGE captures paint).
// The engine is pure control-flow: readiness, batch composition, dispatch, the user-gated CUT halt.

export const meta = {
  name: 'bg-bh-execute',
  description: 'Execute the joint BG+BH 5.0.0 build — wave-frontier sweep, worktree build → integrate → non-authoring dual-engine paint judge → commit-per-wave, to the user-gated cut',
  phases: [
    { title: 'Load', detail: 'boot the wave DAG from the maps + hydrate the cursor' },
    { title: 'Build', detail: 'the wave-frontier sweep: build → integrate → paint-judge → close/fix (batches of 3)' },
    { title: 'Cut', detail: 'halt at the user-gated BG.W-CUT (no auto tag-push)' },
  ],
}

const REPO = '/Users/mkbabb/Programming/glass-ui'
const EXEC = `${REPO}/docs/tranches/BG/execution`
const MAX_FIX = (typeof args === 'object' && args?.maxFix) || 2
const RESUME = (typeof args === 'object' && args?.resumeFromRunId) || null
const HOT = ['scripts/gates.mjs', 'package.json', 'src/index.ts', 'CLAUDE.md']

const FENCE = `CONSTRAINTS (ABSOLUTE): foreign-tree fence — edit ONLY files under ${REPO}. Read siblings under ~/Programming IN PLACE, read-only. NEVER mv/rm/move/touch anything outside glass-ui; NEVER place anything in /tmp; worktrees live ONLY at ${REPO}/.claude/worktrees/. Run \`node scripts/verify-siblings-intact.mjs --quiet\` if anything looks moved. Batches of 3. The CUT is user-gated — NEVER \`git push --tags\`.`
const LAWS = `LAWS: KISS · DRY · DEFT · gestalt-not-patch · NO legacy/workaround/fallback (excise or fail-explicit) · NO god-modules (>500L carves) · compositor-only motion · the warm/weighty/liquid iOS-27 identity. Author/extend the wave's proof:* gate born-RED on HEAD → GREEN on your edit + a self-test bite. You do NOT judge your own paint (the non-authoring fence).`

// ---------- schemas ----------

const DAG_SCHEMA = { type: 'object', additionalProperties: false, required: ['waves', 'fresh'],
  properties: {
    fresh: { type: 'boolean', description: 'true if EXECUTION-PROGRESS.md had no DONE rows (a fresh build — Stage-0 seeds first)' },
    waves: { type: 'array', items: { type: 'object', additionalProperties: false,
      required: ['id', 'tranche', 'ws', 'seq', 'paintClass', 'preconds', 'interleaveClass', 'mutatesSrc', 'status'],
      properties: {
        id: { type: 'string' }, tranche: { type: 'string', enum: ['BG', 'BH'] }, ws: { type: 'string' },
        seq: { type: 'number' }, intent: { type: 'string' },
        files: { type: 'array', items: { type: 'string' } },
        deviceFreeGate: { type: 'string' },
        paintClass: { type: 'string', enum: ['H', 'P'] },
        preconds: { type: 'array', items: { type: 'string' } },
        interleaveClass: { type: 'string', description: "BG: '-' ; BH: 'C'|'WS1'..'WS12'|'WS12-LAST'" },
        mutatesSrc: { type: 'boolean' },
        status: { type: 'string', enum: ['PENDING', 'BUILDING', 'PAINT-PENDING', 'DONE', 'BLOCKED', 'FAIL'] },
      } } } } }

const BUILD_SCHEMA = { type: 'object', additionalProperties: false,
  required: ['wave', 'buildPassed', 'patch', 'deviceFreeProof', 'convergenceNote'],
  properties: {
    wave: { type: 'string' }, buildPassed: { type: 'boolean' },
    patch: { type: 'string', description: 'the worktree unified diff incl. untracked (orchestrator applies); empty if doc-only' },
    deviceFreeProof: { type: 'object', additionalProperties: false, required: ['gate', 'bornRed', 'green', 'selfTest'],
      properties: { gate: { type: 'string' }, bornRed: { type: 'boolean' }, green: { type: 'boolean' }, selfTest: { type: 'string' } } },
    gatesRegistration: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['script', 'tags'],
      properties: { script: { type: 'string' }, tags: { type: 'array', items: { type: 'string', enum: ['local', 'ci', 'release'] } } } } },
    sharedFileRequests: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['file', 'edit'],
      properties: { file: { type: 'string' }, edit: { type: 'string' } } } },
    paintTargets: { type: 'array', items: { type: 'string' } },
    convergenceNote: { type: 'string' } } }

const INTEGRATE_SCHEMA = { type: 'object', additionalProperties: false, required: ['results'],
  properties: { results: { type: 'array', items: { type: 'object', additionalProperties: false,
    required: ['wave', 'integrated', 'gateGreen', 'nextStatus'],
    properties: { wave: { type: 'string' }, integrated: { type: 'boolean' }, gateGreen: { type: 'boolean' },
      commit: { type: 'string', description: 'SHA if committed (H-wave DONE), else empty' },
      nextStatus: { type: 'string', enum: ['PAINT-PENDING', 'DONE', 'FAIL'] }, note: { type: 'string' } } } } } }

const PAINT_SCHEMA = { type: 'object', additionalProperties: false,
  required: ['wave', 'verdict', 'capturePathsResolve', 'captures', 'gestaltCritique'],
  properties: {
    wave: { type: 'string' }, verdict: { type: 'string', enum: ['PASS', 'FAIL'] },
    capturePathsResolve: { type: 'boolean' },
    captures: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['engine', 'mode', 'path'],
      properties: { engine: { type: 'string', enum: ['chrome', 'safari'] }, mode: { type: 'string', enum: ['light', 'dark'] }, path: { type: 'string' } } } },
    gestaltCritique: { type: 'string' },
    defectLocalization: { type: 'array', items: { type: 'string' } },
    mustFix: { type: 'array', items: { type: 'string' } } } }

// ---------- helpers (pure — engine-local) ----------

const batched3 = (a) => { const o = []; for (let i = 0; i < a.length; i += 3) o.push(a.slice(i, i + 3)); return o }
const byId = (waves) => { const m = {}; for (const w of waves) m[w.id] = w; return m }
const allDone = (waves, ws) => waves.filter(w => w.tranche === 'BG' && w.ws === ws).every(w => w.status === 'DONE')

function interleaveReady(w, waves) {
  if (w.tranche === 'BG') return true                       // BG order is the precond DAG
  const c = w.interleaveClass
  if (c === 'C') return true
  if (c === 'WS12-LAST') return false                       // B4f — released only by the explicit precond gate below
  if (/^WS\d+$/.test(c)) return allDone(waves, c)
  return true
}

function ready(w, waves, map) {
  if (w.status !== 'PENDING') return false
  if (!w.preconds.every(p => map[p] && map[p].status === 'DONE')) return false
  return interleaveReady(w, waves)
}

// ≤3, file-disjoint AND ≤1 per hot file; prefer lower seq
function composeBatch(readyNow) {
  const sorted = [...readyNow].sort((x, y) => x.seq - y.seq)
  const batch = [], usedFiles = new Set(), usedHot = new Set()
  for (const w of sorted) {
    const files = w.files || []
    const hot = files.filter(f => HOT.includes(f))
    if (files.some(f => usedFiles.has(f))) continue
    if (hot.some(f => usedHot.has(f))) continue
    batch.push(w)
    files.forEach(f => usedFiles.add(f)); hot.forEach(f => usedHot.add(f))
    if (batch.length === 3) break   // batch-3 (limit reset; user directive — max parallelism, the integrate applies 3 file-disjoint waves serially)
  }
  return batch
}

const ctxHdr = (w) => `WAVE ${w.id} — ${w.intent || ''}   [${w.tranche}/${w.ws}, paint-class ${w.paintClass}]
FILES: ${(w.files || []).join(', ')}
DEVICE-FREE GATE: ${w.deviceFreeGate || '(author one)'}
PRECONDS (all DONE): ${(w.preconds || []).join(', ') || 'none'}
BRANCH: tranche/BG (the integrated frontier — prior DONE waves are landed). WARNING: your worktree may be STALE-SEEDED at the 4.2.0/BD base (998136bb) — it does NOT auto-fork the frontier. STEP 0 below is mandatory.
Read your full wave row from ${EXEC}/${w.tranche === 'BG' ? 'bg-build-map.md' : 'bh-interleave-map.md'} + its converged spec.
${LAWS}
${FENCE}`

// ============================ BOOT — load the DAG + hydrate the cursor ============================

phase('Load')
log(RESUME ? 'Resuming — re-hydrating cursor + agent cache' : 'Fresh boot — loading the wave DAG')

const loaded = await agent(`You are the DAG LOADER for the BG+BH execution engine. Read these and return the full wave DAG.
READ: ${EXEC}/bg-build-map.md (the ~110 BG waves — id·intent·files·gate·paint-class[H/P]·preconds), ${EXEC}/bh-interleave-map.md (the ~30 BH waves + their interleave class C/WSn/WS12-LAST + hard-collision files), and ${EXEC}/EXECUTION-PROGRESS.md (the durable cursor — the live status per wave).
RETURN the DAG_SCHEMA: one node per wave (BG + BH) with id, tranche, ws, seq (build-order ordinal — Stage-0=0, WS12 last, B4f=BH.B4f highest), intent, files (the write-set — the file-disjoint key), deviceFreeGate (proof:*), paintClass (H headless-only | P paint-gated), preconds (the wave ids that must be DONE first — cross-WS + intra-band order; for BH encode the named intra-WS12 edges B5c→B4f, {B2.6,B4e,B4b-content}→B4f, B2.1-mech→B2.1-swap, B2.2→B7, B5b→B5c as preconds), interleaveClass ('-' for BG; 'C'|'WS1'..'WS12'|'WS12-LAST' for BH; B4f='WS12-LAST'), mutatesSrc (true if it edits src/demo/styles/scripts — gets a worktree), and status (READ from EXECUTION-PROGRESS.md; default PENDING; a PAINT-PENDING row STAYS PAINT-PENDING — paint is DECOUPLED to a dedicated paint workflow, so a [P]-wave committed [paint-pending] is DONE-building and MUST NOT re-enter the build frontier). Set fresh=true iff no row is DONE.
The B4f node's preconds MUST include every WS12 wave id + B5c + B2.6 + B4e + B4b-content (the absolute-last sentinel). Be COMPLETE — every wave in both maps appears exactly once.
${FENCE}`, { schema: DAG_SCHEMA, model: 'opus', label: 'dag-loader', phase: 'Load' }).catch(() => null)

if (!loaded || !loaded.waves || !loaded.waves.length) { log('DAG load failed — abort (no cursor mutation).'); return { ok: false, reason: 'dag-load-failed' } }

let waves = loaded.waves
log(`DAG loaded: ${waves.length} waves · ${waves.filter(w => w.status === 'DONE').length} already DONE · fresh=${loaded.fresh}`)

// ============================ THE WAVE-FRONTIER SWEEP ============================

phase('Build')
let guard = 0
const SWEEP_CAP = 600   // runaway backstop (well above ~140 waves × fix-retries)

while (guard++ < SWEEP_CAP) {
  const map = byId(waves)
  const pendingLeft = waves.some(w => ['PENDING', 'PAINT-PENDING', 'FAIL'].includes(w.status))
  if (!pendingLeft) { log('All waves DONE — frontier reached the cut.'); break }

  const readyNow = waves.filter(w => ready(w, waves, map))
  const batch = composeBatch(readyNow)

  if (!batch.length) {
    const stuck = waves.filter(w => ['PENDING', 'FAIL', 'BLOCKED'].includes(w.status))
    log(`No ready waves — ${stuck.length} stuck (precond/interleave/blocked). Escalating frontier.`)
    break   // human gate — do not spin
  }

  // ----- BUILD (batches of 3, worktree-isolated where the wave mutates src) -----
  log(`Build batch [${batch.map(w => w.id).join(' · ')}]`)
  const builds = await parallel(batch.map(w => () =>
    agent(`${ctxHdr(w)}

STEP 0 — SYNC YOUR WORKTREE TO THE LIVE FRONTIER (MANDATORY; the stale-worktree trap). Your worktree is likely seeded at the STALE 4.2.0/BD base (998136bb), missing EVERY prior landed wave. FIRST, inside your worktree, run: \`git reset --hard "$(git rev-parse tranche/BG)"\` (linked worktrees share refs — this moves you to the CURRENT tranche/BG HEAD carrying all prior landed waves). Verify with \`git log --oneline -3\` that HEAD is a recent "BG …" commit, NOT 998136bb / the 4.2.0 base. If you skip this, your patch is built against the wrong base and WILL NOT integrate (it conflicts with already-landed waves). Keep the returned \`patch\` to ONLY your wave's own files (exclude any harness scratch like _scratch_*.json / pre_reg).

STEP 0.5 — ALREADY-DONE GUARD (breaks the resume re-processing spin). After STEP 0's sync, check if THIS wave is ALREADY COMMITTED on tranche/BG: run \`git log --oneline | grep -iF "${w.id}"\`. If a commit references this wave id AND that commit does NOT contain "[paint-pending]" (the wave is FULLY landed — an H-wave, or a [P]-wave whose paint judge already PASSED), DO NOT re-build — return IMMEDIATELY with buildPassed:true, an EMPTY \`patch\` (the empty string ""), deviceFreeProof {gate:"<this wave's gate>", bornRed:false, green:true, selfTest:"already-landed no-op"}, and convergenceNote "already landed on tranche/BG — no-op to break the re-processing loop". This is robust for born-RED-by-design waves too (git log is the durable done-record, NOT the gate color). BUILD normally if the wave id is ABSENT from the log, OR if the only matching commit contains "[paint-pending]" (a [P]-wave committed but still owed its paint verdict — it MUST reach the judge, so do NOT no-op it; after STEP-0 sync the src is already present, so you'll naturally return an empty patch and the orchestrator routes it to the paint judge).

BUILD this wave from first principles. Implement its Files per its Gate + π row. Author/extend the proof:* gate born-RED on HEAD → GREEN on your edit + a self-test bite. Run \`npx vue-tsc --noEmit\` (+ \`npm run build\` if build-relevant) IN YOUR WORKTREE to prove it compiles. Do NOT touch the hot files (${HOT.join(', ')}) — emit those as gatesRegistration/sharedFileRequests. Do NOT commit/stage/stash (read-only git — the orchestrator owns the index). Return BUILD_SCHEMA: the worktree unified diff as \`patch\` (\`git add -A && git diff --cached\` text), the deviceFreeProof, any gatesRegistration/sharedFileRequests, the expected paintTargets, and a convergenceNote.`,
      { schema: BUILD_SCHEMA, model: 'opus', label: `${w.id}/build`, phase: 'Build',
        ...(w.mutatesSrc ? { isolation: 'worktree' } : {}) })
      .then(r => ({ w, r })).catch(() => ({ w, r: null, error: true }))))

  // ----- INTEGRATE (one orchestrator-agent applies the batch onto tranche/BG, re-runs gates, commits, writes cursor) -----
  // STEP-0.5 ALREADY-LANDED NO-OPS: a build whose convergenceNote says "already landed" is the engine re-picking
  // a DONE wave (in-memory status drift). Mark it _noop → DONE directly + exclude from integrate; breaks the loop.
  for (const b of builds) if (b.r && /already[\s-]*landed/i.test(b.r.convergenceNote || '')) b.w._noop = true
  const ok = builds.filter(b => b.r && b.r.buildPassed && !b.error && !b.w._noop)
  let integ = null
  if (ok.length) {
    integ = await agent(`You are the INTEGRATOR. Apply this build batch onto the main \`tranche/BG\` working tree at ${REPO}, in seq order, and commit ONE per wave. You OWN the index + the four hot files (${HOT.join(', ')}).
For EACH build below: (1) \`git apply\` its \`patch\` to the main tree (the batch is file-disjoint — no conflict; a conflict means STOP and report integrated:false for that wave); (2) apply its gatesRegistration rows into scripts/gates.mjs + sharedFileRequests into the named hot file (serially); (3) RE-RUN its deviceFreeProof.gate (\`node scripts/gates.mjs --run <tag>\` or the proof script) on the INTEGRATED tree — do NOT trust the worktree self-report; (4) if green AND paintClass==='H' → \`git commit\` the wave (message \`<tranche> <ws> (<wave>): <intent> — gate <proof:*> GREEN\`) and set nextStatus DONE with the SHA; if green AND paintClass==='P' → COMMIT the src+gate (same message + ' [paint-pending]') and set nextStatus PAINT-PENDING; if the gate REDs → revert that wave's apply and set nextStatus FAIL.
Then UPDATE ${EXEC}/EXECUTION-PROGRESS.md — flip each wave's row to its nextStatus with the commit SHA. Run \`node scripts/verify-siblings-intact.mjs --quiet\` first (the tripwire). Return INTEGRATE_SCHEMA.
BUILDS: ${JSON.stringify(ok.map(b => ({ wave: b.w.id, intent: b.w.intent, ws: b.w.ws, paintClass: b.w.paintClass, gate: b.r.deviceFreeProof.gate, patch: b.r.patch, gatesRegistration: b.r.gatesRegistration || [], sharedFileRequests: b.r.sharedFileRequests || [] })))}
${FENCE}`, { schema: INTEGRATE_SCHEMA, model: 'opus', label: `integrate/${batch[0].id}`, phase: 'Build' }).catch(() => null)
  }

  // apply integrate results to in-memory status
  const res = (integ && integ.results) || []
  for (const b of builds) {
    if (b.w._noop) { b.w.status = 'DONE'; continue }   // STEP-0.5 already-landed no-op → DONE (break the drift loop)
    const r = res.find(x => x.wave === b.w.id)
    if (!b.r || !b.r.buildPassed || b.error) { b.w.status = 'FAIL'; continue }
    if (!r || !r.integrated || !r.gateGreen) { b.w.status = 'FAIL'; continue }
    b.w.status = r.nextStatus === 'DONE' ? 'DONE' : 'PAINT-PENDING'
  }

  // ----- PAINT JUDGE (NON-AUTHORING — fresh agents, fed only route+harness, never the builder's claim) -----
  const paintWaves = []  // PAINT DECOUPLED: the build lands [P] waves [paint-pending] device-free; a dedicated paint workflow runs the dual-engine/C-SAFARI capture + flips them DONE (the in-cycle judge is retired here to keep build cycles fast + unblocked by the heavy capture)
  if (paintWaves.length) {
    log(`Paint-judge [${paintWaves.map(w => w.id).join(' · ')}] — dual-engine, non-authoring`)
    const verdicts = await parallel(paintWaves.map(w => () =>
      agent(`You are a NON-AUTHORING PAINT JUDGE. You did NOT build this wave; you receive ONLY its route + harness, never the builder's claim.
WAVE ${w.id} (${w.tranche}/${w.ws}). Read its π targets from ${EXEC}/bg-build-map.md + the bar in ${EXEC}/real-paint-protocol.md.
Serve the BUILT demo dist: FIRST \`npm run demo:dist:build\` (builds the demo SPA to dist-demo/, ~1.2s, exit 0) THEN \`npm run demo:dist:serve\` in the background (serves the BUILT bytes on http://localhost:5200/ — NOT the :5199 dev server, which renders bare-shell route content in WebKit). Navigate the wave's paint targets on :5200. Capture REAL Chrome.app AND REAL Safari.app/WebKit 26, BOTH modes (light+dark), on a REAL GPU (not headless SwiftShader) — use the ?capture= harness + \`screencapture\` window-mode. Save the PNGs under ${REPO}/docs/tranches/BG/audit/visual/${w.id}-DELTA.md + the per-mode captures on disk. READ the pixels against the proof:ba-gestalt per-surface criteria. Return PAINT_SCHEMA: verdict PASS only when every surface in BOTH engines + BOTH modes reads correct AND every declared capture path RESOLVES ON DISK (the anti-evasion floor). If FAIL, give defectLocalization (region→defect) + mustFix[]. C-SAFARI (the Metal-Safari.app capture) is the ★★★ chronic — non-skippable; it is the single likeliest miss.
${FENCE}`, { schema: PAINT_SCHEMA, model: 'opus', label: `${w.id}/judge`, phase: 'Build' })
        .then(v => ({ w, v })).catch(() => ({ w, v: { verdict: 'FAIL', capturePathsResolve: false }, error: true }))))

    // ----- CLOSE (PASS) or FIX (FAIL) — a CLOSER agent writes the cursor + capture deltas -----
    for (const { w, v } of verdicts) {
      if (v && v.verdict === 'PASS' && v.capturePathsResolve) {
        w.status = 'DONE'
      } else {
        // fix loop — a FIX agent (NOT the builder) re-implements at root, then re-integrate+re-judge next sweep
        w._fix = (w._fix || 0) + 1
        if (w._fix > MAX_FIX) { w.status = 'BLOCKED'; log(`${w.id} BLOCKED — ${MAX_FIX} fixes exhausted; escalate.`) }
        else {
          w.status = 'PENDING'   // re-enters the frontier; the build prompt will carry the mustFix on retry
          w._mustFix = (v && v.mustFix) || []
          w._defect = (v && v.defectLocalization) || []
          log(`${w.id} paint FAIL → fix ${w._fix}/${MAX_FIX} (re-queued)`)
        }
      }
    }
    // persist the verdict statuses to the cursor via a short closer
    await agent(`Update ${EXEC}/EXECUTION-PROGRESS.md: set these wave rows to their status + (for DONE) the capture-delta path. Commit the capture DELTA.md files for the PASS waves. ${JSON.stringify(verdicts.map(x => ({ wave: x.w.id, status: x.w.status, verdict: x.v && x.v.verdict })))}
${FENCE}`, { model: 'opus', label: `close/${paintWaves[0].id}`, phase: 'Build' }).catch(() => null)
  }

  log(`Sweep ${guard}: DONE ${waves.filter(w => w.status === 'DONE').length}/${waves.length} · PAINT-PENDING ${waves.filter(w => w.status === 'PAINT-PENDING').length} · FAIL/BLOCKED ${waves.filter(w => ['FAIL', 'BLOCKED'].includes(w.status)).length}`)
}

// ============================ CUT — user-gated halt ============================

phase('Cut')
const done = waves.filter(w => w.status === 'DONE').length
const blocked = waves.filter(w => w.status === 'BLOCKED').map(w => w.id)
const cutReady = waves.filter(w => w.tranche === 'BG').every(w => w.status === 'DONE') && waves.filter(w => w.interleaveClass === 'WS12-LAST').every(w => w.status === 'DONE')

log(cutReady
  ? 'ALL waves DONE. Run the joint 5.0.0 close-battery (--run full siblings-absent, in-repo worktree) per publish-and-cut.md, then HALT — the tag-push is USER-GATED (4.3.0→4.4.0→5.0.0). Do NOT git push --tags.'
  : `Frontier halted: ${done}/${waves.length} DONE${blocked.length ? ' · BLOCKED: ' + blocked.join(', ') : ''}. Resume via resumeFromRunId after clearing the blockers.`)

return { ok: true, done, total: waves.length, blocked, cutReady, frontier: waves.find(w => w.status !== 'DONE')?.id || 'CUT' }
