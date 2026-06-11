// AZ Batch 4 dispatch — stage A: W-MORPH-SHOWCASE [H4-a] ‖ W-HIERARCHY ‖ W-METRIC-UNIFY;
// stage B: W-SUFFUSE (consumes HIERARCHY's vocabulary; shares demo surfaces) ‖
// W-CON-GEN (the R5-6 add-on — AUTHORS its ad-hoc spec first per the triumvirate
// pattern, then executes; the constellation consumer contract is ADDITIVE-ONLY).
export const meta = {
  name: 'az-batch4',
  description: 'AZ Batch 4: stage A (W-MORPH-SHOWCASE [H4-a] ‖ W-HIERARCHY ‖ W-METRIC-UNIFY) → stage B (W-SUFFUSE ‖ W-CON-GEN ad-hoc). Opus. No git.',
  phases: [
    { title: 'StageA', detail: 'morph-showcase ‖ hierarchy ‖ metric-unify' },
    { title: 'StageB', detail: 'suffuse ‖ con-gen (ad-hoc spec→execute)' },
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

const PRE = `You are a glass-ui BUILD agent at ${GU}, branch tranche/AY @ HEAD (AZ Batches 0-3 + the R4/R5 corrective landed — RE-GREP every cite; the dock/blob/shell/motion surfaces all moved). Demo at http://localhost:5199 (restart if down: npm run dev -- --port 5199 --strictPort; NEVER :5173; the user audits :5210 — leave it). PROTECTED consumer contracts (slides, production): the /constellation exports seedField/readPalette/BASE_WIDTH/warpTo/warpStep + GlassDock's expanded ref — ADDITIVE changes only. IMPLEMENT idiomatically at the ROOT; CAPTURE own-surface DELTAs (real dims, literal filenames, surface-paths + surface-hash headers via the ledger's exported surfaceHash); VERIFY (gates + npm run typecheck + adjacent fleets). NO git. Do NOT edit package.json/gates.mjs/PROGRESS/VISUAL-ALLOWLIST/MIGRATION.md — report in sharedFileDeltas. Clean /tmp.`

function lane(wave, phase, extra) {
  return () => agent(`${PRE}\n\n=== LANE: AZ.${wave} ===${extra ?? ''}\nExecute ${GU}/docs/tranches/AZ/waves/AZ.${wave}.md IN FULL (§0 RE-GROUND first). Return (lane="${wave}").`,
    { label: wave, phase, schema: SCHEMA, model: 'opus' })
}

phase('StageA')
const a = (await parallel([
  lane('W-MORPH-SHOWCASE', 'StageA', `\nTHE H4 HINGE ANSWER (binding, orchestrator default arm-a): the METABALL-BRIDGE — two real DOM docks (one vertical, one horizontal) driven off the ONE shared --dock-morph-t scalar; the SVG-goo/metaball teardrop bridge BEHIND them smin-merges the plates and OCCLUDES the column→row reflow at t≈0.5. DETERMINISM IS PINNED (the HC-DOCK-B M5 clause): the bridge's uTime channels reparametrize to f(--dock-morph-t) + the squish rides the scalar derivative — REDs on a free-running bridge mount. HG5: the perf number gates arm-a (p50 ≤ ~12ms / 0% over 16.7ms @4× throttle, both directions, the M5-Max machine class) — a mechanical miss fires the §7 VT-crossfade fallback, no judgement call. PRM + offscreen via the substrate. The W-LIQUID useLiquidFlex fold: born with the showcase as consumer #1 — its §7 second-consumer reconcile is honestly booked if the tabs/blob squish doesn't reconcile.`),
  lane('W-HIERARCHY', 'StageA', `\nThe D1 incongruence set + R3-8: the spec's inlined per-surface item tables are the work list (an implementer never re-derives the audit). The Configurator hierarchy VOCABULARY (section weight / label registers / control rhythm) is the deliverable the studios + W-SUFFUSE consume — define it as tokens/classes, not adjectives. The HC-DESIGN ruling holds: the display head is a SEPARATE element above the section h2 (the uniform-20.4px π stays).`),
  lane('W-METRIC-UNIFY', 'StageA', `\nE2-1: the Metric* quartet (Badge/Pill/Cell/Row) converges on ONE value-display core — kill the latent amount||placeholder zero-value bug (a valid 0 must render 0, never the em-dash). E2-3: ConfiguratorRow vs LabeledField — the shared chassis OR the documented divergence note (judge, don't force). PROTECTED: speedtest consumes /metric-cell + /metric-stack — the public surfaces stay; the core is internal. Read ${GU}/docs/tranches/AZ/audit/ground/E2-refine-extant-findings.md for the full evidence.`),
])).filter(Boolean)
log('stage A: ' + a.length + '/3')

phase('StageB')
const b = (await parallel([
  lane('W-SUFFUSE', 'StageB', `\nConsumes W-HIERARCHY's just-landed vocabulary (re-grep its output FIRST). The D2 audacious-type uplift list + the D3 color-pop map (ONE deliberate event per surface, the one-color-event rule machine-checked) + the D4 glass/grid/math thin-spots — the spec's inlined tables are the work list. EVERY suffusion item carries its restraint counter (the over-spend guard). The motion-suffusion arm (D5-1/2/10, the HC-CRITIC enrollment): the storybook-wide entrance-cascade + reveal discipline, PRM-guarded.`),
  () => agent(`${PRE}\n\n=== LANE: W-CON-GEN (the R5-6 ad-hoc wave — the TRIUMVIRATE pattern: AUTHOR the spec, THEN execute) ===\nSTEP 1 — AUTHOR ${GU}/docs/tranches/AZ/waves/AZ.W-CON-GEN.md per docs/precepts/instructions/TRANCHE-AND-WAVE-SPEC.md (§0 RE-GROUND, the defect/gap table, goal/completion, the born-RED gate spec, the scope fence) from: the R5-6 row in ${GU}/docs/tranches/AZ/audit/USER-AUDIT-2026-06-11-R5-SLIDES-CONSUMER.md + the slides-side wish-list detail (read /Users/mkbabb/Programming/slides — grep its docs/decks for the constellation deck-local extensions: the PINNED node excluded from stepField drift, the accent anomaly-EDGE skin on drawEdges, edgeFloor + anomaly-alpha on ConstellationPalette, label text in the overlay seam, the autonomous slow drift distinct from click-warp, warp auto-release + an isSettled signal).\nSTEP 2 — EXECUTE the spec: each item lands ADDITIVELY on the /constellation surface (new optional props/exports; the protected quintet seedField/readPalette/BASE_WIDTH/warpTo/warpStep stays byte-compatible) with >=2 consumers per addition (the demo story + the slides deck-local recipes re-pointing on the bump = the named consumer; where only slides would consume, the demo story gains the exerciser). The ≥2-consumer bar judges each item separately — an item that cannot muster stays SPEC'D-NOT-BUILT with the honest book.\nReturn (lane="W-CON-GEN").`,
    { label: 'W-CON-GEN', phase: 'StageB', schema: SCHEMA, model: 'opus' }),
])).filter(Boolean)
log('stage B: ' + b.length + '/2')
return { a, b }
