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
const PAINT_DRAIN_THRESHOLD = 3   // STAGE-0 (DEV-B §3.2): fire the paint edge when the PAINT-PENDING backlog reaches this, or when the build frontier drains
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
        status: { type: 'string', enum: ['PENDING', 'BUILDING', 'PAINT-PENDING', 'DONE', 'BLOCKED', 'FAIL', 'FAIL-PAINT'] },
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
// LENIENT wave-identity matcher — a wave has 2-3 name forms (cursor short id '3.5' · 'BG.W-GLASS-REGISTER-UNIFY' ·
// bare 'W-…' token). Exact string equality across agents bit twice (wf_fb17de53 + wf_111cba22); match on the
// W-token when both carry one, else exact-or-containment.
const wTok = (s) => (String(s || '').match(/W-[A-Z0-9][A-Z0-9-]+/) || [null])[0]
const sameWave = (a, b) => {
  if (!a || !b) return false
  if (a === b) return true
  const ta = wTok(a), tb = wTok(b)
  if (ta && tb) return ta === tb
  return a.includes(b) || b.includes(a)
}

// PER-SWEEP DISK HYDRATION — the cursor (EXECUTION-PROGRESS.md) is the ONLY durable state; in-memory status
// accumulation proved lossy across the paint-edge/child-workflow boundary (wf_111cba22 spin: DONE waves
// re-picked). Every sweep re-reads disk truth. MONOTONIC rules: disk DONE always wins; disk PAINT-PENDING
// applies unless the wave is a queued fix (in-memory PENDING with _fix>0) or mid-BUILD; NOTHING ever
// downgrades to PENDING from hydration (FAIL/BLOCKED are run-local).
const HYDRATE_SCHEMA = { type: 'object', additionalProperties: false, required: ['rows'],
  properties: { rows: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['names', 'status'],
    properties: { names: { type: 'array', items: { type: 'string' }, description: 'ALL name forms on the row: the short id cell (e.g. 3.5, F8.2, BH.B2-export-reshape) AND the wave-name cell (e.g. BG.W-GLASS-REGISTER-UNIFY)' },
      status: { type: 'string', enum: ['PENDING', 'BUILDING', 'PAINT-PENDING', 'DONE', 'BLOCKED', 'FAIL-PAINT', 'DEFERRED'] } } } } } }

async function hydrateFromCursor(waves, label) {
  const h = await agent(`Read ${EXEC}/EXECUTION-PROGRESS.md — BOTH the §1 master table AND the §2 ledger table. Return EVERY row's status with ALL its name forms (the short id cell AND the wave-name cell — e.g. names:["F8.2","BG.W-COMPOSITED-GESTALT-GATE"]). A row whose status cell carries DONE (with or without a SHA/paint note) is DONE; PAINT-PENDING likewise; PENDING/BUILDING/BLOCKED/DEFERRED as written. Report every row — completeness over brevity. READ-ONLY: edit nothing. ${FENCE}`,
    { schema: HYDRATE_SCHEMA, model: 'sonnet', label: `hydrate/${label}`, phase: 'Build' }).catch(() => null)
  if (!h || !h.rows) { log(`hydrate/${label}: FAILED (keeping in-memory statuses this sweep)`); return 0 }
  let applied = 0
  for (const w of waves) {
    const row = h.rows.find(r => (r.names || []).some(n => sameWave(n, w.id)))
    if (!row) continue
    if (row.status === 'DONE' && w.status !== 'DONE') { w.status = 'DONE'; applied++ }
    else if (row.status === 'PAINT-PENDING' && w.status !== 'PAINT-PENDING') {
      const queuedFix = w.status === 'PENDING' && (w._fix || 0) > 0
      if (!queuedFix && w.status !== 'BUILDING') { w.status = 'PAINT-PENDING'; applied++ }
    } else if (row.status === 'BLOCKED' && w.status !== 'BLOCKED') { w.status = 'BLOCKED'; applied++ }
  }
  return applied
}
// STAGE-0 (DEV-B §3.1): a [P] wave landed device-free-green + committed [paint-pending] is DONE-BUILDING for
// ORDERING purposes — its paint is decoupled, not its build. Downstream builds must not stall on its paint.
const doneBuilding = (w) => w.status === 'DONE' || w.status === 'PAINT-PENDING'
const allDone = (waves, ws) => waves.filter(w => w.tranche === 'BG' && w.ws === ws).every(doneBuilding)

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
  if (!w.preconds.every(p => map[p] && doneBuilding(map[p]))) return false
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

// STAGE-0 (DEV-B §3.4): the worktree-GC tripwire runs at boot (WARN on RED; the pre-cut battery RED aborts the tag).
await agent(`Run \`node scripts/worktree-gc.mjs --report\` at ${REPO} and report its one-line census verbatim. If it prints RED, ALSO run \`node scripts/worktree-gc.mjs --prune\` (scope-fenced to .claude/worktrees; it runs verify-siblings-intact first) and report the freed bytes. ${FENCE}`,
  { model: 'sonnet', label: 'worktree-gc', phase: 'Load' }).then(r => r && log(String(r).slice(0, 300))).catch(() => log('worktree-gc boot step failed (non-blocking WARN)'))

const loaded = await agent(`You are the DAG LOADER for the BG+BH execution engine. Read these and return the full wave DAG.
READ: ${EXEC}/bg-build-map.md (the ~110 BG waves — id·intent·files·gate·paint-class[H/P]·preconds), ${EXEC}/bh-interleave-map.md (the ~30 BH waves + their interleave class C/WSn/WS12-LAST + hard-collision files), and ${EXEC}/EXECUTION-PROGRESS.md (the durable cursor — the live status per wave).
RETURN the DAG_SCHEMA: one node per wave (BG + BH) with id, tranche, ws, seq (build-order ordinal — Stage-0=0, WS12 last, B4f=BH.B4f highest), intent, files (the write-set — the file-disjoint key), deviceFreeGate (proof:*), paintClass (H headless-only | P paint-gated), preconds (the wave ids that must be DONE first — cross-WS + intra-band order; for BH encode the named intra-WS12 edges B5c→B4f, {B2.6,B4e,B4b-content}→B4f, B2.1-mech→B2.1-swap, B2.2→B7, B5b→B5c as preconds), interleaveClass ('-' for BG; 'C'|'WS1'..'WS12'|'WS12-LAST' for BH; B4f='WS12-LAST'), mutatesSrc (true if it edits src/demo/styles/scripts — gets a worktree), and status (READ from EXECUTION-PROGRESS.md; default PENDING; a PAINT-PENDING row stays PAINT-PENDING and does NOT re-enter the BUILD frontier, but it IS doneBuilding for interleave/precond ORDERING, and the PAINT EDGE (workflow(bg-paint.wf.js)) drains it to DONE or FAIL-PAINT). Set fresh=true iff no row is DONE.
The B4f node's preconds MUST include every WS12 wave id + B5c + B2.6 + B4e + B4b-content (the absolute-last sentinel). Be COMPLETE — every wave in both maps appears exactly once.
${FENCE}`, { schema: DAG_SCHEMA, model: 'opus', label: 'dag-loader', phase: 'Load' }).catch(() => null)

if (!loaded || !loaded.waves || !loaded.waves.length) { log('DAG load failed — abort (no cursor mutation).'); return { ok: false, reason: 'dag-load-failed' } }

// CLONE the schema-validated nodes into plain mutable objects — the runtime's result objects do NOT
// reliably accept in-place mutation (the 2026-07-01 wf_fb17de53 spin: every `w.status = …` write silently
// no-opped, so each sweep re-picked the identical landed batch forever). The clone is the root fix.
let waves = loaded.waves.map(w => ({ ...w, preconds: [...(w.preconds || [])], files: [...(w.files || [])] }))
log(`DAG loaded: ${waves.length} waves · ${waves.filter(w => w.status === 'DONE').length} already DONE · fresh=${loaded.fresh}`)
// mutation witness — if this write does not stick, no status flip will either; abort before burning agents.
waves[0].status = waves[0].status; waves[0]._probe = 1
if (waves[0]._probe !== 1) { log('DAG nodes are IMMUTABLE — the status machine cannot run. Abort.'); return { ok: false, reason: 'immutable-dag-nodes' } }
delete waves[0]._probe

// ============================ THE WAVE-FRONTIER SWEEP ============================

phase('Build')
// STAGE-0 WITNESS — the engine must be paint-decoupled before any build cycle opens (RESPEC-GESTALT ruling #9).
log(`Stage-0 witness: doneBuilding = {DONE, PAINT-PENDING} (allDone/ready/frontier); cutReady = buildComplete ∧ paintComplete; paint edge = workflow(bg-paint.wf.js) after each sweep (threshold ${PAINT_DRAIN_THRESHOLD}); FAIL-PAINT→FIX-AGENT recovery armed (MAX_FIX=${MAX_FIX}); worktree-GC tripwire wired at boot.`)
if (typeof doneBuilding !== 'function' || typeof PAINT_DRAIN_THRESHOLD === 'undefined') { log('STAGE-0 NOT APPLIED — engine still deadlocks. Abort — apply DEV-B §3.1-3.2 first.'); return { ok: false, reason: 'stage-0-unapplied' } }
let guard = 0
const SWEEP_CAP = 600   // runaway backstop (well above ~140 waves × fix-retries)
let lastSweepSig = ''   // SPIN-BREAKER: identical batch + zero status delta across sweeps = a wedged status machine

while (guard++ < SWEEP_CAP) {
  // Every sweep starts from DISK truth (the lossy-in-memory lesson — wf_111cba22 spin).
  const hydrated = await hydrateFromCursor(waves, `sweep-${guard}`)
  if (hydrated) log(`Sweep ${guard}: hydrated ${hydrated} status(es) from the cursor`)
  const map = byId(waves)
  // STAGE-0 (DEV-B §3.1-4): PAINT-PENDING is NOT a build-frontier blocker — the paint edge drains it.
  const buildFrontierLeft = waves.some(w => ['PENDING', 'BUILDING', 'FAIL', 'FAIL-PAINT'].includes(w.status))
  if (!buildFrontierLeft && !waves.some(w => w.status === 'PAINT-PENDING')) { log('All waves DONE — frontier reached the cut.'); break }

  const readyNow = waves.filter(w => ready(w, waves, map))
  const batch = composeBatch(readyNow)

  if (!batch.length) {
    const stuck = waves.filter(w => ['PENDING', 'FAIL', 'BLOCKED'].includes(w.status))
    log(`No ready waves — ${stuck.length} stuck (precond/interleave/blocked). Escalating frontier.`)
    break   // human gate — do not spin
  }

  // SPIN-BREAKER (defense in depth after the clone fix): the same batch with the same global status
  // vector means the last sweep changed NOTHING — abort loudly instead of burning identical agents.
  const sweepSig = batch.map(w => w.id).join('|') + '::' + waves.map(w => w.status).join(',')
  if (sweepSig === lastSweepSig) {
    log(`SPIN DETECTED — batch [${batch.map(w => w.id).join(' · ')}] repeats with zero status delta. Aborting for orchestrator diagnosis (no cursor mutation).`)
    return { ok: false, reason: 'spin-detected', batch: batch.map(w => w.id) }
  }
  lastSweepSig = sweepSig

  // ----- BUILD (batches of 3, worktree-isolated where the wave mutates src) -----
  log(`Build batch [${batch.map(w => w.id).join(' · ')}]`)
  const builds = await parallel(batch.map(w => () =>
    agent(`${ctxHdr(w)}

STEP 0 — SYNC YOUR WORKTREE TO THE LIVE FRONTIER (MANDATORY; the stale-worktree trap). Your worktree is likely seeded at the STALE 4.2.0/BD base (998136bb), missing EVERY prior landed wave. FIRST, inside your worktree, run: \`git reset --hard "$(git rev-parse tranche/BG)"\` (linked worktrees share refs — this moves you to the CURRENT tranche/BG HEAD carrying all prior landed waves). Verify with \`git log --oneline -3\` that HEAD is a recent "BG …" commit, NOT 998136bb / the 4.2.0 base. If you skip this, your patch is built against the wrong base and WILL NOT integrate (it conflicts with already-landed waves). Keep the returned \`patch\` to ONLY your wave's own files (exclude any harness scratch like _scratch_*.json / pre_reg).

STEP 0.4 — PAINT-DELTA FIX CHECK. Look for a paint-judge DELTA for THIS wave: \`ls ${REPO}/docs/tranches/BG/audit/visual/ | grep -iE "${w.id}|${(w.intent || '').match(/W-[A-Z0-9-]+/)?.[0] || w.id}"\` (a *-DELTA.md / verdict file carrying mustFix items — DELTA filenames carry the wave's W-NAME, not the short row id). If one exists with UNRESOLVED mustFix defects, you are a FIX AGENT, not a fresh builder: read the DELTA, fix EXACTLY the localized defects it names (the paint judge's defectLocalization — never a from-scratch rebuild, never a re-litigated design), and note in convergenceNote which mustFix items you closed. If no DELTA exists, build normally.

STEP 0.5 — ALREADY-DONE GUARD (breaks the resume re-processing spin). After STEP 0's sync, check if THIS wave is ALREADY COMMITTED on tranche/BG: run \`git log --oneline | grep -iF "${w.id}"\`. If a commit references this wave id AND that commit does NOT contain "[paint-pending]" (the wave is FULLY landed — an H-wave, or a [P]-wave whose paint judge already PASSED), DO NOT re-build — return IMMEDIATELY with buildPassed:true, an EMPTY \`patch\` (the empty string ""), deviceFreeProof {gate:"<this wave's gate>", bornRed:false, green:true, selfTest:"already-landed no-op"}, and convergenceNote "already landed on tranche/BG — no-op to break the re-processing loop". This is robust for born-RED-by-design waves too (git log is the durable done-record, NOT the gate color). BUILD normally if the wave id is ABSENT from the log, OR if the only matching commit contains "[paint-pending]" (a [P]-wave committed but still owed its paint verdict — it MUST reach the judge, so do NOT no-op it; after STEP-0 sync the src is already present, so you'll naturally return an empty patch and the orchestrator routes it to the paint judge).

BUILD this wave from first principles. Implement its Files per its Gate + π row. Author/extend the proof:* gate born-RED on HEAD → GREEN on your edit + a self-test bite. Run \`npx vue-tsc --noEmit\` (+ \`npm run build\` if build-relevant) IN YOUR WORKTREE to prove it compiles. Do NOT touch the hot files (${HOT.join(', ')}) — emit those as gatesRegistration/sharedFileRequests. Do NOT commit/stage/stash (read-only git — the orchestrator owns the index). Return BUILD_SCHEMA: the worktree unified diff as \`patch\` (\`git add -A && git diff --cached\` text), the deviceFreeProof, any gatesRegistration/sharedFileRequests, the expected paintTargets, and a convergenceNote.`,
      { schema: BUILD_SCHEMA, model: 'opus', label: `${w.id}/build`, phase: 'Build',
        ...(w.mutatesSrc ? { isolation: 'worktree' } : {}) })
      .then(r => ({ w, r })).catch(() => ({ w, r: null, error: true }))))

  // ----- INTEGRATE (one orchestrator-agent applies the batch onto tranche/BG, re-runs gates, commits, writes cursor) -----
  // CRITICAL: `b.w` crossed the parallel()/journal boundary and may be a DESERIALIZED COPY of the wave node
  // (the wf_111cba22 root cause — mutations through it silently vanish). ALWAYS re-resolve the LIVE node.
  const liveNode = (b) => waves.find(x => sameWave(x.id, (b.w && b.w.id) || '')) || b.w
  // STEP-0.5 ALREADY-LANDED NO-OPS: a build whose convergenceNote says "already landed" is the engine re-picking
  // a DONE wave (status drift). Mark the LIVE node _noop → DONE directly + exclude from integrate; breaks the loop.
  for (const b of builds) if (b.r && /already[\s-]*landed/i.test(b.r.convergenceNote || '')) liveNode(b)._noop = true
  const ok = builds.filter(b => b.r && b.r.buildPassed && !b.error && !liveNode(b)._noop)
  // PER-WAVE SEQUENTIAL INTEGRATORS (the zombie-agent lesson — runs 1+3 both wedged inside ONE long agent;
  // a small single-wave integrator bounds the blast radius to one wave, and folding the cursor flip into the
  // SAME commit makes each integration atomic on disk).
  const integResults = []
  for (const b of ok.sort((x, y) => x.w.seq - y.w.seq)) {
    const one = await agent(`You are the INTEGRATOR for ONE wave. Apply this build onto the main \`tranche/BG\` working tree at ${REPO} and commit it ATOMICALLY. You OWN the index + the four hot files (${HOT.join(', ')}). Run \`node scripts/verify-siblings-intact.mjs --quiet\` first (the tripwire).
(1) Save the \`patch\` text to a temp file under ${REPO}/.claude/ and \`git apply\` it (a conflict means STOP — report integrated:false; do NOT hand-resolve). (2) Apply gatesRegistration into scripts/gates.mjs + each sharedFileRequests edit into its named hot file. (3) RE-RUN the deviceFreeProof.gate on the INTEGRATED tree (npm run <gate> or node scripts/gates.mjs — do NOT trust the worktree self-report) + \`npx vue-tsc --noEmit\` if src/ changed. (4) UPDATE ${EXEC}/EXECUTION-PROGRESS.md: flip THIS wave's row to DONE (paintClass H) or PAINT-PENDING (paintClass P) — you will know the SHA only after committing, so write the row status first with the marker \`(this-commit)\`, commit, then \`git commit --amend\` is FORBIDDEN — instead leave the marker; the next hydration reads status not SHA. (5) \`git commit\` EVERYTHING in one commit — message \`<tranche> <ws> (<wave>): <intent> — gate <proof:*> GREEN\` + \` [paint-pending]\` when paintClass==='P'. (6) If the gate REDs on the integrated tree: \`git checkout -- .\` + clean the patch's new files (revert the apply), do NOT commit, report integrated:false, gateGreen:false, nextStatus FAIL.
BUILD: ${JSON.stringify({ wave: b.w.id, intent: b.w.intent, ws: b.w.ws, paintClass: b.w.paintClass, gate: b.r.deviceFreeProof.gate, patch: b.r.patch, gatesRegistration: b.r.gatesRegistration || [], sharedFileRequests: b.r.sharedFileRequests || [] })}
${FENCE} Return INTEGRATE_SCHEMA (a results array with this ONE wave).`,
      { schema: INTEGRATE_SCHEMA, model: 'opus', label: `integrate/${b.w.id}`, phase: 'Build' }).catch(() => null)
    if (one && one.results) integResults.push(...one.results)
    else { integResults.push({ wave: b.w.id, integrated: false, gateGreen: false, nextStatus: 'FAIL', note: 'integrator died/null' }); log(`integrate/${b.w.id}: agent died — wave FAIL (build journaled for recovery)`) }
  }
  const integ = { results: integResults }

  // apply integrate results to the LIVE nodes (lenient id match; never through the parallel()-copied b.w)
  const res = (integ && integ.results) || []
  for (const b of builds) {
    const w = liveNode(b)
    if (w._noop) { w.status = 'DONE'; continue }   // STEP-0.5 already-landed no-op → DONE (break the drift loop)
    const r = res.find(x => sameWave(x.wave, w.id))
    if (!b.r || !b.r.buildPassed || b.error) { w.status = 'FAIL'; continue }
    if (!r || !r.integrated || !r.gateGreen) { w.status = 'FAIL'; continue }
    w.status = r.nextStatus === 'DONE' ? 'DONE' : 'PAINT-PENDING'
  }

  // ----- PAINT EDGE (STAGE-0, DEV-B §3.2 — the decoupled dual-engine flip, wired as a scheduled edge not a human ritual) -----
  const paintPending = waves.filter(w => w.status === 'PAINT-PENDING')
  const frontierLeftNow = waves.some(w => ['PENDING', 'BUILDING', 'FAIL', 'FAIL-PAINT'].includes(w.status))
  if (paintPending.length >= PAINT_DRAIN_THRESHOLD || (!frontierLeftNow && paintPending.length)) {
    log(`Paint edge — workflow(bg-paint.wf.js) over ${paintPending.length} PAINT-PENDING wave(s)`)
    // bg-paint reads the cursor's PAINT-PENDING set, dual-engine-captures (real Chrome.app + Safari.app, both
    // modes, C-SAFARI non-skippable), flips PASS→DONE (writes the cursor) + leaves FAIL→PAINT-PENDING with a mustFix DELTA.
    await workflow({ scriptPath: `${EXEC}/bg-paint.wf.js` }).catch((e) => { log(`paint edge errored: ${e && e.message}`); return null })
    // RE-HYDRATE from the cursor the paint workflow just wrote (the ONE hydration path — the bespoke
    // paint-reload agent died with wf_111cba22: it omitted rows and its id forms mismatched).
    await hydrateFromCursor(waves, `post-paint-${guard}`)
    for (const w of paintPending) {
      if (w.status === 'DONE') continue                       // the judge flipped it — hydration picked it up
      // still PAINT-PENDING on disk after a paint run over it = a FAIL/held verdict → bounded fix recovery
      w._fix = (w._fix || 0) + 1
      if (w._fix > MAX_FIX) { w.status = 'BLOCKED'; log(`${w.id} BLOCKED — ${MAX_FIX} paint fixes exhausted; escalate.`) }
      else { w.status = 'PENDING'; log(`${w.id} paint FAIL → fix ${w._fix}/${MAX_FIX} (re-queued for a FIX agent reading the DELTA mustFix — STEP 0.4)`) }
    }
  }

  log(`Sweep ${guard}: DONE ${waves.filter(w => w.status === 'DONE').length}/${waves.length} · PAINT-PENDING ${waves.filter(w => w.status === 'PAINT-PENDING').length} · FAIL/BLOCKED ${waves.filter(w => ['FAIL', 'BLOCKED'].includes(w.status)).length}`)
}

// ============================ CUT — user-gated halt ============================

phase('Cut')
const done = waves.filter(w => w.status === 'DONE').length
const blocked = waves.filter(w => w.status === 'BLOCKED').map(w => w.id)
// STAGE-0 (DEV-B §3.1-5): the tag stays coupled to painted truth while the frontier is unblocked by pending paint.
const buildComplete = waves.filter(w => w.tranche === 'BG').every(doneBuilding)
  && waves.filter(w => w.interleaveClass === 'WS12-LAST').every(doneBuilding)
const paintComplete = !waves.some(w => ['PAINT-PENDING', 'FAIL-PAINT'].includes(w.status))
const cutReady = buildComplete && paintComplete

log(cutReady
  ? 'ALL waves DONE. Run the joint 5.0.0 close-battery (--run full siblings-absent, in-repo worktree) per publish-and-cut.md, then HALT — the tag-push is USER-GATED (4.3.0→4.4.0→5.0.0). Do NOT git push --tags.'
  : `Frontier halted: ${done}/${waves.length} DONE${blocked.length ? ' · BLOCKED: ' + blocked.join(', ') : ''}. Resume via resumeFromRunId after clearing the blockers.`)

return { ok: true, done, total: waves.length, blocked, cutReady, frontier: waves.find(w => w.status !== 'DONE')?.id || 'CUT' }
