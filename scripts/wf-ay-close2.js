export const meta = {
  name: 'ay-close2',
  description: 'The close round 2 (serial): LANE 1 = the user 13:27 dock-chrome audit (the container-height mutation during the dock animation; the dark-mode toggle too large + belongs at the BOTTOM with a divider; the background play/pause broken with no shrunken icon) + the refit-live demo regression (the flex parent defeats resizeTo). LANE 2 = W-CLOSE1 re-run (overfitting audit + FINAL + proof:ay-final + the budget rebaseline + the FULL release battery). Opus. No git.',
  phases: [
    { title: 'DockChrome', detail: 'the 3 user items + the refit-live demo fix' },
    { title: 'Close', detail: 'W-CLOSE1 on the fixed board' },
  ],
}

const GU = '/Users/mkbabb/Programming/glass-ui'
const W = GU + '/docs/tranches/AY/waves'

const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['lane', 'status', 'gatesGreen', 'typecheckGreen', 'sharedFileDeltas', 'summary', 'blocker'],
  properties: {
    lane: { type: 'string' },
    status: { type: 'string', enum: ['DONE', 'DONE_WITH_MISSES', 'PARTIAL', 'BLOCKED'] },
    gatesGreen: { type: 'boolean' },
    typecheckGreen: { type: 'boolean' },
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

const PRE = `You are a glass-ui BUILD agent at ${GU}, branch tranche/AY @ 85fcbd02 (strict-freshness 0/0/0; 31 live-verified; typecheck green). Demo at http://localhost:5199 (restart if down: npm run dev -- --port 5199; NEVER :5173; the live-Aurora ReadPixels park trick: report document.hidden=true + visibilitychange before long evaluates on aurora-bearing routes). NO git. Do NOT edit package.json/gates.mjs/PROGRESS/VISUAL-ALLOWLIST — report in sharedFileDeltas. Clean /tmp.`

phase('DockChrome')
const chrome = await agent(`${PRE}\n\n=== LANE: DOCK-CHROME (the user's 13:27 live audit — BINDING) ===\nFour items:\n(1) THE CONTAINER-HEIGHT MUTATION: the dock expand/collapse animation MUST NOT change the height of its surrounding container (the user's screenshot shows the page content jumping as the dock animates). Root-cause: does the dock's box participate in normal flow such that its animated width/height reflows siblings? The dock is a floating chrome element — its morph must be layout-isolated (the reserved-box/absolute/contain pattern — pick the gestalt fix befitting the shipped morph architecture; the dock-with-slider + overview + shell docks all verified). π-verify: sample the CONTAINER height across the full expand/collapse cycle — delta 0px.\n(2) THE DARK-MODE TOGGLE in the dock rail: TOO LARGE + at the TOP — move it to the BOTTOM of the rail with a DockSeparator dividing line above it; size it to the standard dock-icon-button register (the user's screenshot shows it oversized at the top). Sweep every dock that mounts DarkModeToggle (the shell rail + the demo docks) — the nav-pattern: home-left/top, the utility controls at the trailing END behind a divider.\n(3) THE BACKGROUND PLAY/PAUSE (DockBackgroundToggle): BROKEN with NO shrunken icon — root-cause (the icon swap dead? the collapsed-state icon missing? a stale binding?) + fix; verify the pause ACTUALLY parks the background (the WCAG seam) and the icon reads in both dock states (expanded + the collapsed circle).\n(4) THE REFIT-LIVE DEMO REGRESSION (the sweep's side-finding): the demo's flex parent stretches the constellation host so the __constellationRefit.resizeTo seam cannot shrink the box (proof:constellation-refit-live genuinely RED — drift-out baseline 76%>60%, autodrift 0). Fix IN THE DEMO (force/restore the host width on the resizeTo seam or flex:none the host — the sweep's W-CON1 capture script already proved the working pattern); the gate goes GREEN honestly.\nCapture the before/after for items 1-3 (the container-height trace, the rail layout, the toggle states). All dock gates + proof:constellation-refit-live green at close. Return (lane="DOCK-CHROME").`,
  { label: 'dock-chrome', phase: 'DockChrome', schema: SCHEMA, model: 'opus' })

phase('Close')
const close = await agent(`${PRE}\n\n=== LANE: W-CLOSE1 (the terminal close, on the fixed board) ===\nExecute ${W}/AY.W-CLOSE1.md: (1) THE OVERFITTING AUDIT per docs/audits/overfitting-audit.md — every src/ artefact ≥2 sites / exported-with-consumers / demo-private; the PRUNE-LEDGER + evidence docs are the census; the orphan scan; the verdict table recorded. (2) FINAL.md — the tranche close (the final wave table; the chronic-defer telemetry CLOSED by the register — zero silent carries; the user-audit closure; greenfield voice). (3) AUTHOR + RUN proof:ay-final (the close gate per the spec; born-RED-able — a synthetic violation REDs). (4) the budget rebaseline (profile:budget; numbers recorded). (5) THE RELEASE BATTERY: npm run typecheck + build + verify-export-types + proof:gen-ci-fresh + the FULL local suite (scripts/gates.mjs --run local) — enumerate EVERY gate's exit in your summary; fix the honest reds; report any irreducible one as the blocker. Return (lane="W-CLOSE1").`,
  { label: 'W-CLOSE1', phase: 'Close', schema: SCHEMA, model: 'opus' })

return { chrome, close }
