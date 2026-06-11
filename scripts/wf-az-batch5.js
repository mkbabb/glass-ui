// AZ Batch 5 dispatch — W-CARVE ‖ W-PRUNE2 ‖ W-KF-CONSUMER (3 lanes, disjoint:
// style file-boundaries / prune verdicts / cross-repo consumer fixes).
export const meta = {
  name: 'az-batch5',
  description: 'AZ Batch 5: W-CARVE (the central-CSS @import-root carve, ratchet drain) ‖ W-PRUNE2 (the E4 verdicts + books, H6/H7 answered) ‖ W-KF-CONSUMER (keyframes/fourier-analysis/bbnf consumer fixes). Opus. No git.',
  phases: [{ title: 'Batch5', detail: 'carve ‖ prune2 ‖ kf-consumer' }],
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

const PRE = `You are a glass-ui BUILD agent at ${GU}, branch tranche/AY @ HEAD (AZ Batches 0-4 + the R4/R5 corrective landed — RE-GREP every cite; the register/dock/blob/motion/metric surfaces all moved). Demo at http://localhost:5199 (restart if down: npm run dev -- --port 5199 --strictPort; NEVER :5173; the user audits :5210 — leave it). IMPLEMENT idiomatically; CAPTURE DELTAs where pixels change (surface-paths + surface-hash headers); VERIFY (gates + npm run typecheck + adjacent fleets). NO git (read-only git allowed). Do NOT edit package.json/gates.mjs/PROGRESS/VISUAL-ALLOWLIST/MIGRATION.md in THIS repo — report in sharedFileDeltas. SIBLING repos: W-KF-CONSUMER edits sibling SOURCE files per its spec (still NO git there). Clean /tmp.`

function lane(wave, extra) {
  return () => agent(`${PRE}\n\n=== LANE: AZ.${wave} ===${extra ?? ''}\nExecute ${GU}/docs/tranches/AZ/waves/AZ.${wave}.md IN FULL (§0 RE-GROUND first). Return (lane="${wave}").`,
    { label: wave, phase: 'Batch5', schema: SCHEMA, model: 'opus' })
}

phase('Batch5')
const out = (await parallel([
  lane('W-CARVE', `\nNOTE: W-REGISTER-IOS (Batch 1) landed its dock-controls.css edits — carve against the CURRENT bytes. The theme.css four-construct divisibility was VERIFIED by the hand-challenge (the leading plain @theme + @theme inline + the trailing plain @theme + @variant dark — carve at those seams, cascade order preserved). The §0 reader-set enumeration is the binding list — re-grep BOTH composed-read sets at HEAD. The rendered dist CSS must be byte-isomorphic (diff the built css before/after).`),
  lane('W-PRUNE2', `\nTHE HINGE ANSWERS (binding, orchestrator defaults): H6 = arm (a) — the /underline KEEP becomes TRUE by naming the slides re-point as a REAL deliverable: update docs/consumer-evidence/underline.md with the W-ADOPT-fold trigger (the slides SlideIntro/SlideCloser hand-underline → @mkbabb/glass-ui/underline swap rides the W-ADOPT lane at the cut) + the re-audit date; H7 = arm (a) — the useGlassRenderer/createGlassFilter cluster BARREL-RETIRES + its demo story drops in the SAME change (MIGRATION row staged; the useGlassBackdropLuminance observer's barrel reach is PRESERVED per the cross-batch coordination note — re-grep its export path FIRST). THE HEADER-RIBBON/GLASS-PANEL RESTORE RULING (orchestrator, binding — the W-KF-CONSUMER scope-reveal): the AY prune census was WRONG on these two — keyframes.js consumed BOTH subpaths at prune time (the consumer-roots set missed keyframes), and the registry's stale-lineage 3.11.x/3.12.0 re-published them so keyframes now resolves them live. RESTORE both as published surfaces: recover the component dirs + flat subpaths + api seats + demo stories from git history (the pre-prune shape — git log finds the deletion commit), wire consumer-evidence docs naming keyframes as the binary consumer, REVERSE the MIGRATION retire claims honestly (the v3.10.0 callout's four-subpath claim narrows to deck-progress + instrument-rail; the no-retired-survivor RETIRED_CLAIMS subpaths/dirs lists drop header-ribbon + glass-panel — report the exact edits in sharedFileDeltas since MIGRATION + the gate are orchestrator-owned), and verify build + verify-export-types green with the restored entries.`),
  lane('W-KF-CONSUMER', `\nThe per-repo edit lists per the spec: (1) keyframes.js (~/Programming/keyframes.js) — the phantom /header-ribbon + /glass-panel imports re-pointed to the surviving primitives + the glass-ui re-pin groundwork (package.json range only; NO npm install needed beyond what resolves); (2) fourier-analysis (~/Programming/fourier-analysis) — apply its pending phantom-classes migration patch; (3) bbnf-lang (~/Programming/bbnf-lang) — remove the playground's hard dist alias for @mkbabb/keyframes.js (the contract-v2 §2.4 consumer fix). These close the two documented-expected glass-ui local CI reds (proof:resolution + proof:phantom-classes) — re-run BOTH in glass-ui at close and report their exits. NO git in any repo.`),
])).filter(Boolean)
log('batch 5: ' + out.length + '/3')
return out
