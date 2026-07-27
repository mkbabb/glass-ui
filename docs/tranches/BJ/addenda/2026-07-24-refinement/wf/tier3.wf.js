export const meta = {
  name: 'component-terminal-specs-tier3',
  description: 'Tier-3: ten warm-start lanes covering ~17 components, tri-fold, one serialized live seat',
  phases: [
    { title: 'Live', detail: 'the one browser seat captures all lanes serially', model: 'opus' },
    { title: 'Bench', detail: 'two static benches per lane', model: 'opus' },
    { title: 'Terminal', detail: 'Fable ∥ Opus foremen → Fable adjudicator per lane', model: 'fable' },
    { title: 'Fold', detail: 'cross-lane reconciliation', model: 'fable' },
  ],
}

const REF = 'docs/tranches/BJ/addenda/2026-07-24-refinement'
const CANON = `Repo /Users/mkbabb/Programming/glass-ui, HEAD 26a41fe3, tranche BJ, TRANCHE DEVELOPMENT —
author no repo byte; specs are the deliverable. State your modelId. Consume FIRST: \`${REF}/EXEC-STATE.md\`
(all rulings; **dev port 5400**, 4188 requires a fresh build check before trust), \`${REF}/DAG-RULINGS.md\`
(your lane's per-node rows — the warm prior, overturnable on evidence), \`${REF}/PROPORTION.md\` (the
canonical series — minting outside it is a defect unless derived from a named law), \`${REF}/LAYOUT.md\`
(the chassis doctrine — do not re-solve layout), \`${REF}/RECONCILIATION.md\` §3a (your lane's warm audit
material — inherit DIAGNOSES, re-derive every line number: ~29% of BD paths are rotted),
\`docs/tranches/BJ/FEEDBACK-LEDGER.md\` (owner rows). Edicts: breath of life · liquid weight · clean
breaks, no masking fallbacks · deletion needs a FRESH CROSS-REPO grep (slides/value.js/atlas/sci/
keyframes — the src-only census is wrong in kind) · tests never in src/ · module-name stripping · KISS.
Match the spec shape of COMPONENT-WAVES-TERMINAL-2.md (9 sections, born-RED gates that bite, π rows for
Chromium AND safari-app). Never author backdrop-filter + -webkit-backdrop-filter. Em dashes without
spaces.`

const LANES = [
  { key: 'card', brief: 'card — the material half is UNOWNED (W-REDUCE-CARD is a prop diet only). Warm: BD/greenfield/cards/{GOLDEN,DELTA-ASSAY,WAVE-AMENDMENT}.md (904 lines, measured: plate composites grey over flat page, 4%-α border vanishes cream-on-cream, resting box-shadow computes none). Give it field, edge, material floor per the diagnosis — re-derived at HEAD.' },
  { key: 'button', brief: 'button — warm: BD/greenfield/buttons/ (962 lines, 9-row ranked defects) + BI/audit/W-SHADOW-GRAMMAR-census.md (landed 809b6ff5, consumer×radius×verdict). The capsule-shadow grammar and press physics (liquid press) are the core.' },
  { key: 'select-combobox', brief: 'select + combobox jointly — warm: BD/viz/page-deep/forms-select-* (7-row change table; GAP-1 fixed at SelectTrigger.vue:92, GAP-3 size two-write portal OPEN). Reka-binding hazards apply (stale bindings silently no-op — sweep the bindings).' },
  { key: 'forms-seam', brief: 'input + textarea + number-field as ONE lane — warm: BD quartets ×3 + forms-GESTALT §1 (the one-seam collapse). The field register (_shared/field) is the structural question: one field chassis, three semantic shells?' },
  { key: 'binary-triad', brief: 'checkbox + switch + radio-group as ONE lane — ECOUTE §4.2 already rules: ONE IMPLEMENTATION, THREE SEMANTIC SHELLS → extract useBinaryControl + one .control-bit register. Warm: BD forms-checks quartet + AW/audit/W25-primitive-affordance.md per-atom four-state press-spring matrix. Spec the extraction.' },
  { key: 'toggle-group', brief: 'toggle-group — warm: BD forms-toggle quartet (109-line synthesis; swatch P0 dead post-codemod; UF-A1 landed 92e00ff7). Its relationship to tabs/segmented (selection register) is the structural question.' },
  { key: 'easing', brief: 'easing / curve-gallery — F31 (why all the bottom padding; redesign; properly modularize the easing-curve component). Warm: BD motion-curve-gallery Pass-E synthesis (125 lines, the largest single one, cited nowhere else). The module split was REJECTED on LOC alone (RECONCILIATION rejections) — the modularization case must stand on ownership/behavior.' },
  { key: 'surface-material', brief: 'surface / glass-material — warm: BI/design/glass/PASS-1.md (298 lines) + BD greenfields {glass-material,glass-atoms}. Token side is OWNED by W-GLASS-DEDUP/W-BLUR-LADDER; Surface.vue own tier API is NOT — spec it. The 188/305 backdrop-filter:none census row is the live indictment.' },
  { key: 'display-atoms', brief: 'badge + separator + label + avatar + skeleton + status-dot as ONE batched lane (the trivial four + two riders — RECONCILIATION prices them as one pass). Warm: BD display quartets (badge UF-A6 landed 5a6187f7; label peer-disabled residual grep-0 at HEAD; separator ruled KEEP correct-as-is — verify and close cheap). Skeleton rides F24 (animation too slow).' },
  { key: 'progress', brief: 'progress — F21/F22 largely landed (19ea4ce1 rim replace, 1844bf2c loop driver) — verify at HEAD, then the remainder: the track seam shared with slider (typed track seam abb1eba2), the indeterminate state vs GF-TIMELINE’s new indeterminate law (COMPONENT-WAVES-TERMINAL GF-TIMELINE §C — reconcile the two), W4 consumer edges.' },
]

phase('Live')
const live = await agent(`${CANON}

You are the ONE live seat — sole browser owner, serial. Dev server: check http://localhost:5400 first
(the CORRECT dev port); fall back to a build-freshness-verified 4188. For each lane below, capture at
1440×900: the component story at rest + one interaction + its configurator; note computed styles that a
static bench cannot infer (resolved backdrop-filter, painted shadows, actual radii, animation timing).
Also cross-repo consumer grep ONCE for all lanes: for each component name, rg the sibling repos
(~/Programming/{slides,value.js,keyframes.js,sci-report,atlas,fourier-analysis} — READ-ONLY, skip absent
ones, say which) and report consumer counts. Lanes: ${LANES.map(l => l.key).join(' · ')}.
Return per-lane observations + the consumer table. Facts only.`,
  { label: 'live:capture', phase: 'Live', model: 'opus', effort: 'high' })

phase('Bench')
const results = await pipeline(
  LANES,
  (l) => parallel([
    () => agent(`${CANON}\n\nLANE: ${l.brief}\n\nBENCH — ASSUME THE DESIGN IS FLAWED (static + the live seat's observations below). Attack against the owner rows, the edicts, iOS-27, and what SHOULD exist. One line for what survives.\n\nLIVE OBSERVATIONS:\n${live || '(live seat died — static only, say so)'}`,
      { label: `${l.key}:design`, phase: 'Bench', model: 'opus', effort: 'high' }),
    () => agent(`${CANON}\n\nLANE: ${l.brief}\n\nBENCH — ASSUME THE IMPLEMENTATION+STRUCTURE ARE WRONG (static). Read every line of the component; dead props, false comments, values off the series, colocation/name-stripping violations, register forks, a11y gaps. Warm material: inherit diagnoses, re-derive line numbers.\n\nLIVE OBSERVATIONS:\n${live || '(live seat died)'}`,
      { label: `${l.key}:impl`, phase: 'Bench', model: 'opus', effort: 'high' }),
  ]).then(bs => ({ l, benches: bs.filter(Boolean) })),
  ({ l, benches }) => {
    if (!benches.length) return null
    const foreman = `${CANON}\n\nLANE: ${l.brief}\n\nFOREMAN — author the TERMINAL SPEC (9 sections, COMPONENT-WAVES-TERMINAL-2 shape). Adjudicate every bench finding: ADOPT / REFUTE (evidence) / ROUTE (named wave). No silent drops. Disposition may overturn the DAG row — on evidence.\n\nBENCHES:\n${benches.map((b, i) => `\n=== BENCH ${i + 1} ===\n${b}`).join('')}\n\nLIVE:\n${live || '(died)'}`
    return parallel([
      () => agent(foreman, { label: `${l.key}:terminal`, phase: 'Terminal', model: 'opus', effort: 'xhigh' }),
      () => agent(foreman, { label: `${l.key}:terminal-fable`, phase: 'Terminal', model: 'fable', effort: 'xhigh' }),
    ]).then(([o, f]) => {
      const a = [f, o].filter(Boolean)
      if (!a.length) return null
      if (a.length === 1) return { key: l.key, spec: a[0] }
      return agent(`${CANON}\n\nLANE: ${l.brief}\n\nTRI-FOLD ADJUDICATOR — two foremen (Fable, Opus) authored terminal specs from the same record. Agglomerate with sagacity and INCREDULITY: spot-check shared claims on disk, reproduce and RULE disagreements (disposition splits are the headline), never average; losers to §REJECTED with falsifiers.\n\n===== FABLE =====\n${f}\n\n===== OPUS =====\n${o}`,
        { label: `${l.key}:apotheosis`, phase: 'Terminal', model: 'fable', effort: 'xhigh' })
        .then(s => ({ key: l.key, spec: s }))
    })
  }
)

const specs = results.filter(Boolean)
log(`${specs.length}/${LANES.length} tier-3 lanes terminal`)

phase('Fold')
const fold = await agent(`${CANON}

TIER-3 FOLD — reconcile the ten lanes: what changed vs the DAG rows · collisions (one owner per file per
cut — the field register, the binary-control extraction, the selection register, and the track seam are
the likely contested primitives; check disk) · canonical-series compliance · deletion ledger (each with
its fresh cross-repo grep result from the live seat) · gate requests vs budget · owner rows discharged ·
which components STILL lack a terminal spec after this batch (the residual list, ranked).

${specs.map(s => `\n\n===== ${s.key} =====\n${s.spec}`).join('')}`,
  { label: 'fold:tier3', phase: 'Fold', model: 'fable', effort: 'xhigh' })

return { specs, fold }
