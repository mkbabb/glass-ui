export const meta = {
  name: 'ay-fdr2-then-batch4',
  description: 'Phase 1: the FD-R2 design audit on FABLE (the user C1-C3 asks: all UI panes both repos, design hierarchy, the design-language suffusion — glass/grid/math/audacious type/colorful pops, the glass-ui idiom gaps) over the SETTLED post-rebuild tree. Phase 2: Batch 4 STRUCTURE on OPUS — W-GOD1 carve (re-graded at dispatch) + W-COLOCATE + W-CSS1 + W-LEG1 + W-DELTA0 + W-CONSUMER + W-CARRY + W-LIVE1 + W-TRIAGE + W-NDA, then W-COHERE LAST (the set-cohesion binding). Batches of 4. No git.',
  phases: [
    { title: 'FDR2', detail: '4 fable design lanes over the settled tree' },
    { title: 'Structure', detail: 'the carve + the structure waves, opus, batches of 4' },
    { title: 'Cohere', detail: 'W-COHERE last — the four substrates as ONE set' },
  ],
}

const GU = '/Users/mkbabb/Programming/glass-ui'
const SL = '/Users/mkbabb/Programming/slides'
const W = GU + '/docs/tranches/AY/waves'
const OUT = GU + '/docs/tranches/AY/audit/design-r2'

const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['lane', 'status', 'gatesGreen', 'typecheckGreen', 'findings', 'capturedPngs', 'sharedFileDeltas', 'summary', 'blocker'],
  properties: {
    lane: { type: 'string' },
    status: { type: 'string', enum: ['DONE', 'DONE_WITH_MISSES', 'PARTIAL', 'BLOCKED'] },
    gatesGreen: { type: 'boolean' },
    typecheckGreen: { type: 'boolean' },
    findings: { type: 'array', items: { type: 'string' } },
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

const LENS = `THE DESIGN LENS: distinctiveness (a clear aesthetic point-of-view vs generic sameness) · typography (characterful, hierarchical) · color (committed; dominant + sharp accents) · motion (one language; high-impact moments) · spatial composition (intentional; negative space) · backgrounds/depth (atmosphere vs flat) · affordance/hierarchy (glanceable) · delight (discoverable, proportionate). THE USER'S SUFFUSION BRIEF (verbatim): "better suffuse our design language of glass, grid, math, large and audacious typography, with colorful audacious pops, like those found in our icons (how might we increase this, too? within a sense of proportion)".`

const FD_PRE = `You are an FD-R2 DESIGN auditor (fable — the user's directive) over the SETTLED post-rebuild tree. glass-ui demo http://localhost:5199 · slides http://127.0.0.1:5273 (restart if down: glass-ui \`npm run dev -- --port 5199\`; slides \`npm run dev -- --host 127.0.0.1 --port 5273 --strictPort\`). Findings + captures ONLY into ${OUT}/ (dir nests) — NO source edits, NO git. Judge calibrated: name the exceptional AND the defective; every claim carries a capture or a measured number. ${LENS}`

function fd(lane, scope) {
  return () => agent(`${FD_PRE}\n\n=== LANE: ${lane} ===\n${scope}\n\nDrive, capture, judge; write ${OUT}/${lane}.md; return (lane="${lane}").`,
    { label: lane, phase: 'FDR2', schema: SCHEMA })
}

const OPUS_PRE = `You are a glass-ui BUILD agent at ${GU}, branch tranche/AY (the settled post-rebuild tree; typecheck green). Demo at :5199. READ your wave spec(s) at ${W}/<wave>.md IN FULL (every §0/RG block; re-grep stale cites — the tree moved a LOT). IMPLEMENT idiomatically; CAPTURE own-surface DELTAs where pixels change (real dims; LITERAL filenames in the <WAVE>-DELTA.md); VERIFY (gates + vue-tsc + adjacent fleets). NO git. Do NOT edit package.json/gates.mjs/PROGRESS/VISUAL-ALLOWLIST — report in sharedFileDeltas. Clean /tmp.`

function op(lane, phase, scope) {
  return () => agent(`${OPUS_PRE}\n\n=== YOUR LANE: ${lane} ===\n${scope}\n\nExecute; return (lane="${lane}").`,
    { label: lane, phase, schema: SCHEMA, model: 'opus' })
}

// ── Phase 1: FD-R2 on fable ──
phase('FDR2')
const fdr2 = (await parallel([
  fd('FDR2-glassui-panes', `ALL glass-ui demo panes post-rebuild: walk every category (foundations/primitives/substrates/compositions/forms/display/containers/navigation/dock/data/feedback/motion/composables) — per page: hierarchy, incongruences, the suffusion read (where would glass/grid/math/type/pops LIFT the page — concrete moves, file-cited). The rebuilt surfaces get fresh verdicts (the blob page, the vangogh medium, the studio, the fourier field, the dock band, the staged pages). The increase-the-pops question answered with proportion (where icons/color pops belong + where restraint wins).`),
  fd('FDR2-slides-panes', `The 13-slide deck post-fixes (the glass cards, the real label, the WOPR terminal, the de-voided S2): per slide light+dark — the poster register holding? the suffusion read? incongruences? + the deck chrome (gate modal, settings, home tiles incl. the fixed locked-blur). The forwardable pptx also judged (export + open the 13 frames).`),
  fd('FDR2-idiom-gaps', `The glass-ui IDIOM analysis (the user C3): what idioms do the two repos NOW share vs fork (the deck's frost ladder vs the library's glass ladder — should the frost/no-luminance-headroom move TRANSPOSE UP into glass-ui as a cream-ground variant?); what slides-local patterns deserve abstraction (the faux-window chrome? the CRT bezel? the PresenterCard?); what library idioms the slides under-use. Each: a keep/transpose/adopt verdict with the ≥2-consumer math.`),
  fd('FDR2-synthesis', `READ the three sibling lanes' findings (${OUT}/FDR2-*.md — wait for them via re-reads if needed; you run in the same batch so prefer your OWN walk of both surfaces + the five audit corpora indexes under ${GU}/docs/tranches/AY/audit/) and produce ${OUT}/FDR2-SYNTHESIS.md: the ranked design work-list (each item: surface, the move, the owning wave or NEW), the suffusion scorecard per surface, the incongruence list. This feeds W-COHERE + the close.`),
])).filter(Boolean)
log(`FDR2: ${fdr2.length}/4`)

// ── Phase 2: Batch 4 structure, opus ──
phase('Structure')
const s1 = (await parallel([
  op('W-GOD1-CARVE', 'Structure', `Execute ${W}/AY.W-GOD1.md (re-graded; RE-COUNT every target at HEAD first — the tree moved: constellationField.ts/Constellation.vue/useMetaballRenderer.ts/SegmentedTabs.vue/GlassDock.vue + ANY new >500 file the band edits created — \`wc -l\` the candidates + sweep src/). Carve each >500 into cohesive colocated sub-modules: PUBLIC SURFACE + RETURN SHAPES BYTE-IDENTICAL (consumers + tests unchanged); the dock FLIP-engine fold + the booked items the spec carries (the W-DOCK2 HG4 BOOK). proof:no-god-module GREEN at close + the RATCHET landed (CI-promote with per-violator baselines, RED-on-growth). Every component gate fleet still green (constellation/blob/dock/tabs). This is the BIG one — take it serially, one file at a time, gates between each.`),
  op('W-COLOCATE-CSS1', 'Structure', `Chain: (1) ${W}/AY.W-COLOCATE.md — the sub-component-dir colocation restructure (components+composables+constants colocated where befitting; KISS, no contrivance); (2) ${W}/AY.W-CSS1.md — the CSS monolith carves cascade-order-safe + the .css-aware gate + the var-in-arbitrary rule; the bundle byte-equivalent check.`),
  op('W-LEG1-DELTA0', 'Structure', `Chain: (1) ${W}/AY.W-LEG1.md — the legacy gates (the ~690 survivors; no-retired-survivor + tag-parity + var-in-arbitrary); (2) ${W}/AY.W-DELTA0.md — the owed-DELTA sweep (the W56 squircle + the 6 AX complete-exempt rows; each owed row gets its own-surface DELTA; the AX ledger arm goes green).`),
  op('W-CARRY-LIVE1', 'Structure', `Chain: (1) ${W}/AY.W-CARRY.md — the deferral register EXECUTED as written (the manifest JSON + the completeness clause + the G-4/5/6 forks per the USER-DECISIONS routing; register-row-count = ledger-BOOK-count born-RED witness); (2) ${W}/AY.W-LIVE1.md — the local-only live-gate CI decision + the cardinal complete-coverage hardening + the R1 IHDR-dimension assert + R6 GREEN-on-real-surface clause INTO proof-live-verified-ledger.mjs (the trends mechanisms — they are specced, land them); (3) ${W}/AY.W-CONSUMER.md — the consumer-staleness ledger; (4) ${W}/AY.W-TRIAGE.md + ${W}/AY.W-NDA.md — the residual dispositions (doc waves).`),
])).filter(Boolean)
log(`Structure: ${s1.length}/4`)

// ── Phase 3: W-COHERE last ──
phase('Cohere')
const cohere = await agent(`${OPUS_PRE}\n\n=== YOUR LANE: W-COHERE (the LAST substrate-band wave) ===\nExecute ${W}/AY.W-COHERE.md on the carved, rebuilt, settled tree (re-grep EVERY cite — the blob/constellation/aurora/fourier surfaces were all rebuilt since the spec): (E1) the blob mood/seed chroma register into the warm-red band the constellation focal + FF comet speak (the clamp on deriveBlobPalette C; the demo mood seed into register — RECONCILE with the W-BLOB-REBUILD resting state, do not regress the restored bead); (E2) the blob ambient contact shadow (ALL THREE sites incl. the !important PRM block — the tokenised --blob-shadow on the --shadow-color re-resolution; the Memphis stamp stays on Card only); (E3) the constellation opacityCeiling recession prop (default 1 byte-identical; threaded through StoryHero like aurora/FF — the 4th of the shared recession contract); (E4) mint proof:substrate-cohesion (G-ACCENT the blob mood chroma in the siblings' band / G-RECESSION all four expose the envelope + the constellation prop BITES / G-SHADOW no hard-offset near-black on the bead, both modes); (E5) the four-substrate both-mode SET DELTA (the contact sheet — every substrate legible light AND dark; the FF light floor landed at W-FF3, the dock captured at wave 2 — the dependencies are MET). proof:substrate-cohesion born-RED→GREEN + the per-substrate fleets unregressed.\n\nExecute; return (lane="W-COHERE").`,
  { label: 'W-COHERE', phase: 'Cohere', schema: SCHEMA, model: 'opus' })

return { fdr2, structure: s1, cohere }
