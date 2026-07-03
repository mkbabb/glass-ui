// bg-paint.wf.js — the decoupled dual-engine PAINT workflow for the BG 5.0.0 build.
// Verifies the [paint-pending] waves with REAL Chrome.app + REAL Safari.app/WebKit26 (C-SAFARI ★★★),
// both modes, non-authoring, against each wave's "Awaiting NON-AUTHORING dual-engine paint (...)" criteria,
// then flips passing rows DONE. Generic: reads the live [paint-pending] set from the cursor, so it runs for
// any accrued set (WS1's 5 now; WS3+ later). VALIDATES the capture pipeline end-to-end BEFORE the fan-out and
// HARD-STOPS if the real-Safari path is blocked (never a faked PASS). Launch:
//   Workflow({ scriptPath: "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/execution/bg-paint.wf.js" })

export const meta = {
  name: 'bg-paint',
  description: 'Dual-engine paint-verify the [paint-pending] waves: validate the real Chrome.app + real Safari.app/WebKit26 (C-SAFARI) capture pipeline end-to-end, then per-wave non-authoring verdict against each wave criteria over BUILT demo:dist bytes (:5200, both modes) -> flip DONE; the heavy capture decoupled from the device-free build',
  phases: [
    { title: 'Inventory' },
    { title: 'PipelineValidate' },
    { title: 'Verify' },
    { title: 'Synthesize' },
  ],
}

const REPO = '/Users/mkbabb/Programming/glass-ui'
const EXEC = REPO + '/docs/tranches/BG/execution'
const FENCE = `FENCES (ABSOLUTE): operate ONLY under ${REPO}; NEVER /tmp; NEVER mv/rm/touch any sibling under ~/Programming. You MAY edit ONLY docs/tranches/BG/execution/EXECUTION-PROGRESS.md (the cursor flips) + write PNGs/DELTAs under docs/tranches/BG/audit/visual/ — do NOT edit src/demo/styles/scripts to "fix" a defect (that is a build-fix-agent's job; you record the defect). Confirm \`node scripts/verify-siblings-intact.mjs --quiet\` exits 0. Kill any demo:dist:serve you start when done.`

const PP_SCHEMA = { type: 'object', additionalProperties: false, required: ['waves'], properties: { waves: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['id', 'routes', 'criteria'], properties: { id: { type: 'string' }, routes: { type: 'array', items: { type: 'string' } }, criteria: { type: 'string' } } } } } }
const PIPE_SCHEMA = { type: 'object', additionalProperties: false, required: ['chromeOk', 'safariOk', 'method', 'detail'], properties: { chromeOk: { type: 'boolean' }, safariOk: { type: 'boolean' }, blocker: { type: 'string' }, method: { type: 'string' }, detail: { type: 'string' } } }
const VERIFY_SCHEMA = { type: 'object', additionalProperties: false, required: ['id', 'pass', 'detail'], properties: { id: { type: 'string' }, pass: { type: 'boolean' }, defects: { type: 'array', items: { type: 'string' } }, capturePaths: { type: 'array', items: { type: 'string' } }, detail: { type: 'string' } } }
const REPORT_SCHEMA = { type: 'object', additionalProperties: false, required: ['allPass', 'summary', 'passed', 'failed'], properties: { allPass: { type: 'boolean' }, summary: { type: 'string' }, passed: { type: 'array', items: { type: 'string' } }, failed: { type: 'array', items: { type: 'string' } } } }

// browser-heavy → cap concurrency at 2 (each agent drives a real Chrome.app + Safari.app capture)
async function batched(items, n, fn) {
  const out = []
  for (let i = 0; i < items.length; i += n) {
    const res = await parallel(items.slice(i, i + n).map(it => () => fn(it)))
    out.push(...res)
  }
  return out
}

phase('Inventory')
const pp = await agent(`You are the PAINT INVENTORY agent. cd ${REPO}. Read docs/tranches/BG/execution/EXECUTION-PROGRESS.md and extract EVERY row whose status is PAINT-PENDING. For each: id (e.g. BG.W-ROUTE-TRANSITION), routes (the demo routes/surfaces it paints — infer from the row note + the wave intent; e.g. a route-transition wave = a nav burst across several routes, a field-aurora wave = the substrate routes, a hero-fit wave = the hero pages at 375/768/1440/1920), and criteria (the verbatim "Awaiting NON-AUTHORING dual-engine paint (...)" text from the row — the exact pass conditions). Return PP_SCHEMA. ${FENCE}`, { schema: PP_SCHEMA, model: 'opus', label: 'paint-inventory', phase: 'Inventory' })
if (!pp || !pp.waves || !pp.waves.length) { log('paint-inventory unavailable (quota/death) — nothing to judge this run'); return { allPass: false, summary: 'inventory unavailable', passed: [], failed: [] } }

phase('PipelineValidate')
const pipe = await agent(`You are the CAPTURE-PIPELINE VALIDATOR. cd ${REPO}. PROVE the dual-engine capture pipeline works end-to-end BEFORE any fan-out — this is the C-SAFARI keystone (the chronic that missed four prior tranches). READ docs/tranches/BG/execution/real-paint-protocol.md §6 — the C18 \`?capture=\` harness was JUST BUILT + PROVEN (commit d4ae4577): both engines now capture full content + the in-pixel engine badge. THE WORKING METHOD (use it, do NOT re-derive): \`npm run demo:dist:build\` then \`npm run demo:dist:serve\` (BUILT bytes on :5200 — NOT :5199 dev, which bare-shells WebKit). Per route+mode capture \`?capture=<route>&mode=<light|dark>\`: (a) Chrome via CDP — launch real Chrome.app with --remote-debugging-port, connectOverCDP, navigate http://localhost:5200/?capture=<route>&mode=<m>, poll \`document.documentElement.dataset.captureReady\`, page.screenshot (GL_RENDERER proves real Metal GPU not SwiftShader); (b) Safari via the off-screen WKWebView — \`clang -framework Cocoa -framework WebKit -fobjc-arc docs/tranches/BG/audit/wkshot-live.m -o /tmp/wkshot-live\` then \`/tmp/wkshot-live "http://localhost:5200/?capture=<route>&mode=<m>" out.png <m> 15000\` (it polls data-capture-ready before snapshot). STEPS: on ONE wave's route (${(pp.waves[0] && pp.waves[0].id) || 'the first PAINT-PENDING route'}), capture BOTH engines, BOTH modes (light+dark). Confirm each PNG is real route content (not blank/bare-shell), dimension-correct, with the in-pixel engine badge proving which engine rendered. Set chromeOk / safariOk accordingly + record the working method (exact commands). If the Safari path is BLOCKED (TCC Screen-Recording permission, harness build error, Safari automation) set safariOk:false + blocker = the EXACT failure (so the orchestrator fixes the harness — NEVER fake a Safari capture). Return PIPE_SCHEMA. ${FENCE}`, { schema: PIPE_SCHEMA, model: 'opus', label: 'pipeline-validate', phase: 'PipelineValidate' })

if (!pipe.chromeOk || !pipe.safariOk) {
  log(`CAPTURE PIPELINE NOT READY — chromeOk=${pipe.chromeOk} safariOk=${pipe.safariOk} :: ${pipe.blocker || pipe.detail}. STOPPING before fan-out (no faked passes). Orchestrator must fix the harness/TCC, then relaunch.`)
  return { blocked: true, pipe, waves: pp.waves.map(w => w.id) }
}

phase('Verify')
const verdicts = (await batched(pp.waves, 2, w => agent(`You are a NON-AUTHORING PAINT JUDGE for wave ${w.id}. You did NOT build it; verify the PAINTED truth against its criteria, never the builder's claim. The capture pipeline is PROVEN (method: ${pipe.method}). Ensure demo:dist is built + served on :5200 (BUILT bytes). For EACH of the wave's routes [${(w.routes || []).join(', ')}], navigate \`?capture=<route>&mode=<light|dark>\` (the proven C18 method — poll data-capture-ready) and capture BOTH engines (Chrome via CDP + Safari via the off-screen \`/tmp/wkshot-live "http://localhost:5200/?capture=<route>&mode=<m>" out.png <m> 15000\`) in BOTH modes; decode the top-left engine badge for provenance. Verify against the criteria: "${w.criteria}" — use COMPUTED DOM checks where the criteria are computational (animationTimeline, getAnimations(), main.children.length, glContextCount) and pixel reads where visual (recessive aurora no conic/oversaturation, grain calm, hero fits its envelope). PASS only when every surface in BOTH engines + BOTH modes reads correct AND every capture PNG RESOLVES ON DISK. Save PNGs + a DELTA under docs/tranches/BG/audit/visual/${w.id}-DELTA.md. On PASS: flip the wave's cursor row in docs/tranches/BG/execution/EXECUTION-PROGRESS.md from PAINT-PENDING -> DONE with the capture paths + verdict (commit that flip: \`git add docs/tranches/BG/execution/EXECUTION-PROGRESS.md docs/tranches/BG/audit/visual/${w.id}-DELTA.md && git commit -m "BG paint (${w.id}): dual-engine PASS Chrome+Safari both modes -> DONE"\`). On FAIL: write defectLocalization + mustFix[] into the DELTA, AND flip the wave's cursor row PAINT-PENDING -> PENDING with a note (paint FAIL — fix owed per <the DELTA path>; src SHAs preserved) + commit that flip (message "BG paint (${w.id}): dual-engine FAIL -> PENDING (fix owed, DELTA on disk)") — the PENDING-with-DELTA state routes the wave to a build-FIX agent (its STEP 0.4). NEVER leave a judged-FAIL wave at PAINT-PENDING (an unjudged wave stays PAINT-PENDING — that is the discriminator). Return VERIFY_SCHEMA. ${FENCE}`, { schema: VERIFY_SCHEMA, model: 'opus', phase: 'Verify', label: `paint:${w.id}` }))).filter(Boolean)

phase('Synthesize')
const report = await agent(`You are the PAINT SYNTHESIS agent. cd ${REPO}. Given the per-wave paint verdicts below, write/append a dated section to docs/tranches/BG/audit/visual/PAINT-PASS-LOG.md (which waves PASSED -> DONE with capture paths, which FAILED with their defect + mustFix). allPass = every verdict.pass true. Confirm the cursor rows for passed waves now read DONE. Return REPORT_SCHEMA.
VERDICTS: ${JSON.stringify(verdicts)}
${FENCE} — you MAY write docs/tranches/BG/audit/visual/PAINT-PASS-LOG.md.`, { schema: REPORT_SCHEMA, model: 'opus', label: 'paint-synth', phase: 'Synthesize' })

return report
