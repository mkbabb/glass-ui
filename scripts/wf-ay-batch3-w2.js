export const meta = {
  name: 'ay-batch3-wave2',
  description: 'AY Batch-3 wave 2 (4 lanes on OPUS, serial within): LANE-SB (W-SB1 front-door/voice/typewriter -> W-SB-STAGE substrate staging -> W-EGG the six eggs), LANE-MOTION (W-MOTION2 pin-bump+suite+curves -> W-ANIM1 matrix + the functional-broken fixes: dead toast dismissal + dead drawer trigger -> W-UNDERLINE the GlassUnderline build), LANE-SYS (W-SCALE1 -> W-SCALE2 -> W-A11Y-PERF), LANE-DOCS-CAP (W-DOC1 README reconciles + W-IC1 + W-CONVERGE + the W-DOCK2 RG1/RG2 + W-GLASS capture debts). Shared files orchestrator-integrated; captures vs :5199; no git.',
  phases: [{ title: 'Build', detail: '4 serial-lane chains, opus' }],
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
        progressRow: { type: 'string', description: 'the FULL replacement PROGRESS row text per wave (no pipes inside cells — use /)' },
        visualAllowlistAdd: { type: 'array', items: { type: 'string' } },
      },
    },
    summary: { type: 'string' },
    blocker: { type: ['string', 'null'] },
  },
}

const PRE = `You are a glass-ui AY BUILD agent at ${GU}, branch tranche/AY @ b8c6b34 (clean, typecheck GREEN, ledger 12 live-verified/0 violations). Demo at http://localhost:5199 (reuse; :5173 is a FOREIGN app — pass GLASS_UI_DEMO_URL/PORT where a config defaults to 5173; restart the demo on :5199 if down: npm run dev -- --port 5199).

EXECUTE your wave chain SERIALLY to each HARD GATE: (1) READ each spec at ${W}/<wave>.md IN FULL (every §0/RG/DEC block; re-grep stale cites). (2) IMPLEMENT idiomatically. (3) CAPTURE own-surface DELTAs (real dimensions — 390-width mobile; the IHDR class is now audited) into ${GU}/docs/tranches/AY/audit/visual/ + the <WAVE>-DELTA.md with paired-π numbers AND LITERAL png filenames (no brace-shorthand — the ledger gate matches literal W-X-*.png strings). (4) VERIFY each wave: its gate green via node scripts/proof-<x>.mjs, vue-tsc exit 0, adjacent fleets green — BEFORE moving to the next wave in your chain.

ABSOLUTE RULES: NO git. Do NOT edit the 4 SHARED files (package.json / scripts/gates.mjs / docs/tranches/AY/PROGRESS.md / VISUAL-ALLOWLIST.json) — REPORT deltas in sharedFileDeltas (one progressRow per wave, concatenated). Clean /tmp scratch. Return one structured result per your PRIMARY wave; fold chain-sibling reports into summary + sharedFileDeltas.`

function ag(wave, scope) {
  return () => agent(`${PRE}\n\n=== YOUR LANE: ${wave} ===\n${scope}\n\nExecute the chain now; return the structured result.`,
    { label: wave, phase: 'Build', schema: SCHEMA, model: 'opus' })
}

phase('Build')
const out = (await parallel([
  ag('LANE-SB', `SERIAL CHAIN: (1) ${W}/AY.W-SB1.md — the G6 fix cohort ONLY (the front door: intro.vue dead hash-hrefs -> RouterLink real paths + manifest-derived categories + glass-register cards; the voice leakage: literal backticks + spec-speak blurbs + the pi-runbook prose; the typewriter mid-word wrap -> a nowrap unit) — the zero-paint fix ALREADY LANDED in wave 1 (verify, don't redo). NOTE W-SB1's per-route KEEP/FIX/RETIRE verdicts + orphan-retire are ALSO yours if the spec scopes them — read it; execute what is specced, report what you defer with the reason. (2) ${W}/AY.W-SB-STAGE.md — the substrate staging: the StoryHero glass-erasure fix (the lower-opacity hero rung + exposed substrate margin), the occasional-usage map made REAL (the enumerated placements: own-substrate heroes on the four substrate pages, the paper-glass + dock/overview + dock/rail in-region strips per the display-card MODEL pattern, the blob empty-state seam, the constellation whisper on motion), StoryBackgroundKind gains 'blob', G-RESTRAINT (forms/feedback/containers stay quiet). Its W-COHERE opacityCeiling dependency is NOT landed — implement the staging WITHOUT the recession prop where possible; report any clause genuinely blocked on it. (3) ${W}/AY.W-EGG.md — the six eggs (F-wordmark Fourier epicycle redraw via dftFromPoints; konami full-bleed aurora; cmd+K CommandDialog fuzzy-nav FIRST-CLASS; GooBlob empty-state mascot + constellation 404; long-press dark-toggle eclipse; the rail toggle placement), each PRM-fenced; proof:easter-eggs + the DELTA.`),
  ag('LANE-MOTION', `SERIAL CHAIN: (1) ${W}/AY.W-MOTION2.md — MOVE 0 FIRST (the keyframes.js devDependency ^2.2.0 -> ^4.1.0 bump; verify the 3 constructed classes + callable timingFunction sites survive; typecheck + the motion tests green on the bumped install) then the suite re-export through /motion (the STATIC barrel + loadAnimationEngine; the DYNAMIC engine members NOT statically flattened), the curve library + MOTION_CURVES (single-sourced spring presets lifted from regen-spring-tokens.mjs into a shared src/ module), the value.js static-edge decided by profile:bundle MEASUREMENT (record both numbers), the curve-gallery story, the SUITE-COMPLETE two-tier parity manifest gate + CURVE-TABLE-BOUND. (2) ${W}/AY.W-ANIM1.md — the conformance matrix + the gate extension AND the §5 RealityB functional-broken fixes (these are W-ANIM-FIX routes the spec carries): the DEAD toast dismissal (use-toast.ts onOpenChange -> the reka onUpdate:open key; the whole dismissal surface revives), the DEAD DrawerTrigger (the reka/vaul binding no-op — root-cause + fix), the ToastViewport fixed-inside-backdrop-filter trap (the guard + the precept line), the dialog/popover spring-enter exemption blind spot (the gate-widen). The full matrix doc + routed fix list lands at docs/tranches/AY/audit/ANIM-MATRIX.md. (3) ${W}/AY.W-UNDERLINE.md — build <GlassUnderline> per the ten DEC rulings (the /underline subpath, the --gu-* tokens, the active-prop third clock, the canonical+ghost geometry, PRM one-shot; the DRAW-ANIMATES pi gate + the filter-free witness + the consumer-fidelity canary + verify-export-types).`),
  ag('LANE-SYS', `SERIAL CHAIN: (1) ${W}/AY.W-SCALE1.md — extend --ui-scale to the form-atom hit-areas (the REAL axe target-size harness; the phantom proof:touch-target made real per the spec). (2) ${W}/AY.W-SCALE2.md — the desktop-fluid scale ladder (NOTE Slider.vue was rewritten in wave 1 by the cylinder correction — re-grep its touch-hit-area site fresh; you are the ONLY Slider.vue writer in this wave). (3) ${W}/AY.W-A11Y-PERF.md — the O-1..O-5 executions per the spec (the W55 bucket engagement default, the webkit prefix in dist, the rAF-coalesced specular with the measured before-numbers from the perf audit, contain:paint + the depth budget, the glass-aware dark contrast oracle >=4.5:1 over the ACTUAL shipping glass) + the C6 per-rung AA calibration + the C7 a11y cascade-guard. Each wave's gate green before the next.`),
  ag('LANE-DOCS-CAP', `MIXED CHAIN: (1) ${W}/AY.W-DOC1.md — the FULL README reconcile per its widened rows (aurora x6+A7, dock x5, constellation x4 incl. the wander/gravityWell/freeze prop rows + the 9-token cohort table + provenance strip, CLAUDE.md x4, blob stops literal, ff caveat, glass.css header re-scope; proof:readme-meta-clean + the cite re-grep at close). (2) ${W}/AY.W-IC1.md — the instrument-chassis scope decision (execute the decision the spec records). (3) ${W}/AY.W-CONVERGE.md — the per-major-component glass-ui<->slides FIT disposition table (read the slides repo read-only at /Users/mkbabb/Programming/slides — the 13-slide poster deck just landed; the dispositions feed L.W-ADOPT). (4) THE CAPTURE DEBTS: W-DOCK2 RG1/RG2 (the own-surface light+dark frame-series on the REAL /dock/overview dock showing the entering-child onset tracking the shell + a PERSISTED GREEN dock-animation-live artefact on the real surface — flip the W-DOCK2 row live-pending -> live-verified honestly) + the W-GLASS 8 owed PNGs (the Drawer/Slider/Notification level-0 flatten + the specular opt-in captures; fix the W-GLASS DELTA overstatement). Capture with REAL dimensions; literal filenames in the DELTAs.`),
])).filter(Boolean)
log(`Batch-3 wave 2: ${out.length}/4 lanes returned`)
return out
