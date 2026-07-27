export const meta = {
  name: 'component-terminal-specs-tier2',
  description: 'Tier-2 components thrice-challenged and juried into terminal specs, seeded warm off the DAG per-node verdicts',
  phases: [
    { title: 'Challenge', detail: 'three benches per component, each assuming a different thing is wrong', model: 'opus' },
    { title: 'Jury', detail: 'two adjudicators break the splits', model: 'opus' },
    { title: 'Terminal', detail: 'foreman re-authors the terminal spec', model: 'opus' },
    { title: 'Fold', detail: 'cross-component reconciliation', model: 'opus' },
  ],
}

const REF = 'docs/tranches/BJ/addenda/2026-07-24-refinement'

const CANON = `You are working in glass-ui at /Users/mkbabb/Programming/glass-ui, HEAD 0371836d.

**PHASE: TRANCHE DEVELOPMENT ONLY.** Read, measure, run the browser. **Author no source/test/gate/package
byte.** Your deliverable is a SPEC. Do not edit, stage, commit, revert or clean anything, here or in any
sibling repo. Never move or park a sibling repository.

**MODEL LAW:** every seat is Opus 5. State your exact modelId in your output.

**OWNERSHIP:** Sol and Luna are dissolved as of 2026-07-25 — Claude owns BI and BJ. Anything in
\`docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/\` is ARCHIVE: mine it for findings, never cite
it for authority or gating. "model-law RED" and "route to Luna" are void statuses.

## Inputs you MUST consume (settled — do not re-derive)
1. \`${REF}/DAG-RULINGS.md\` — the per-node verdict for all 62 components: LOC, consumers, verdict
   (KEEP · KEEP-THIN · SPLIT · MERGE-INTO · MOVE-TO · DEMOTE · DELETE), the ground, the new home. **Your
   component's row is the warm start.** It is a prior, not a conclusion — you may overturn it with evidence.
2. \`${REF}/PROPORTION.md\` — **the canonical series.** Space \`4·8·12·20·32·52\`; \`pad(role) = r(role) − 4\`;
   dividers one warm ink 1px at α \`0.08/0.16/0.48\`; the gap law (≥32 → never draw a line; 20 → seam;
   ≤12 → edge); fill \`0.05/0.12/0.16\` with a sole-carrier state needing ≥3:1; type on \`φ^(1/4)=1.127838\`;
   mobile steps every rung down exactly one. **Minting a value outside it is authoring a defect** unless
   you derive it from a stated law and name the law.
3. \`${REF}/COMPONENT-WAVES-TERMINAL.md\` — the 8 tier-1 terminal specs. Match their shape and rigour, and
   respect their file ownership (one owning wave per file per cut).
4. \`${REF}/ROUND-1-FINDINGS.md\` — cite findings by id, never restate them.
5. \`docs/tranches/BJ/FEEDBACK-LEDGER.md\` — the owner's own words. Your component's rows are the brief.

## The edicts
- **BREATH OF LIFE** — every component always displays engagement; at rest it is not dead.
- **MOVEMENT OF MOMENTUM / LIQUID WEIGHT UNIVERSAL** — all motion, transitions and scrolling carry
  inertia, weight, bounce, liquid-glass quality. Nothing linear. Nothing snaps without a settle.
- **BEST iOS 27**, derived in our own aristotelian proportion, in the abstract — do not transcribe Apple.
- **NO LEGACY. CLEAN BREAKS.** No aliases, shims, dual paths, or masking fallbacks. A primary works in
  paint or fails loudly. Breaking changes are expected.
- **DELETION IS GRANTED on vacuity or superfluity. Consumer count is NOT sufficient either way.**
- **KISS-FORWARD PARSIMONY.** More code is not better. A knob needing a paragraph of justification is not
  a knob. Comment stock is 39.4% of \`src\` — a reduction that is only a comment cull must SAY SO.
- **ARISTOTELIAN PROPORTION, BOTH DIRECTIONS** — mark the superfluous/duplicative/distracting for removal
  AND mark where MORE affordance is owed.
- **TESTS ARE NEVER COLOCATED IN \`src/\`** — they live in a tree isomorphic to source.
- **MODULE-NAME STRIPPING** — grouped files drop the module name (\`easing/{option,config}\`, never
  \`easing/{easing-option,easing-config}\`).

## Live measurement
Demo at \`localhost:4188\` (built) and \`localhost:5199\` (dev). Chrome DevTools MCP for telemetry.
**Safari is LIVE** — \`scripts/safari-probe.mjs\` (W3C WebDriver over plain HTTP; \`pkill -f safaridriver\`
first). **Playwright \`webkit\` is the ENGINE BUILD, not Safari — they give OPPOSITE results here; never
write "Safari" from Playwright-WebKit.** Never \`getContext()\` on a live WebGPU canvas — it steals the
context and fakes a black fallback; observe by screenshot only.

## Two live defects that constrain any design touching glass
- **THE PREFIX TRAP (S0, shipping in published 7.0.0).** The build DROPS the unprefixed \`backdrop-filter\`
  and keeps only the \`-webkit-\` alias, which Chromium does not implement. **Never author
  \`backdrop-filter\` followed by \`-webkit-backdrop-filter\`.** To disable frost, do not write a reset — do
  not apply the glass class.
- **188 of 305 declared glass surfaces (61.6%) compute \`backdrop-filter: none\`.** Declared glassy is not
  glassy. If your spec says "frosted", name the receiver and prove it resolves.

**BE PITHY.** Dense tables over prose. Cite file:line and numbers you personally pulled. Em dashes without
spaces. No exhortation, no padding.`

// Tier 2 — chosen by owner-feedback weight x structural consequence. Tier 1 (done) was
// timeline handmark aurora tabs alert dock toast slider.
const COMPONENTS = [
  { key: 'drawer', brief: `**drawer** — the DAG ruling is **MERGE-INTO sheet**, called "the graph's loudest superfluity edge, RULED": \`drawer.reka ⊂ dialog.reka\` (8 of 8, Jaccard 0.800), four leaf SFCs byte-identical to dialog's modulo the name; it is dialog's edge placement plus detents. 1,625 LOC, zero src consumers. Test that merge hard — if it survives, prove the residue that justifies a separate family; if it does not, spec the fold precisely (what moves, what dies, what the public surface becomes). Live: \`/containers/drawer\`, \`/containers/dialog\`.` },
  { key: 'dialog', brief: `**dialog** — the absorber. Owner **F25**: *"/feedback/confirm-dialog — how is this any different from a normal dialog."* Owner **F45**: *"/compositions/gate-pattern improper rounding — the entire compositions section is likely to be pruned."* The C66 owner-final decisions already rule **Confirm and Gate FOLD INTO Dialog**. Spec the absorbed dialog: confirm, gate, and (pending the drawer lane) edge placement. Owner **F48** wants dialog rounding consistent with cards. Live: \`/containers/dialog\`, \`/feedback/confirm-dialog\`, \`/compositions/gate-pattern\`.` },
  { key: 'carousel-deck', brief: `**carousel + deck, jointly** — Owner **F33**: *"what is deck vs carousel — likely collapse. The dot animations need dramatic refinement."* Deck is a zero-Vue owner in the DAG census. \`W-REDUCE-GOO-ENGINE\` (\`85089b3b\`) already retired DeckPager and deleted the deck-story goo clone, and \`W-PAGER-DOT-MORPH\` (\`01310c9c\`) pinned the goo-morph signature — check what actually remains before proposing. The pager dots must goo-morph between states (the Google-deck worm) per standing edict. Decide the collapse and spec the survivor. Live: \`/motion/deck\`, and the carousel story.` },
  { key: 'sortable-list', brief: `**sortable-list** — Owner **F13**: *"needs better design and better horizontal use of space."* This row appears in only ONE file of the live corpus — it is a suspected silent drop, so treat the owner's words as the primary brief rather than looking for prior disposition. \`1be91765\` landed a "sortable-list 2-up cure" under \`W-RESPONSIVE-AUDIT\` — verify what that actually did and whether F13 is discharged by it. Drag affordance must carry liquid weight: inertia on lift, a settle on drop. Live: \`/data/sortable-list\`.` },
  { key: 'search', brief: `**search** — Owner **F17**: *"/data/search — input boxes are not rounded."* W1 RADIUS (\`d7588514\`) ruled \`floating: ""\` keeps the component plate, \`bare\` is the sole chromeless variant, and repointed \`.input-bar\` from \`--radius-2xl\` to semantic \`--radius-control\` — verify that landed and paints. Sol's steer 12 found the Search floating/bare arm was proved only by CLONING an existing input and adding source-derived classes, never by mounting the real variants — so the variant proof is OWED. Spec the variants and their real receivers. Live: \`/data/search\`, \`/forms/inputs\`.` },
  { key: 'tags-input', brief: `**tags-input** — Owner **F12**: *"/data/tags-input — these containers aren't rounded."* This is the component that exposed the \`--radius-field\` tree-shake: its only consumers load via SFC \`<style src>\`, outside the Tailwind-scanned cascade, so Tailwind v4 dropped the alias and the container computed \`border-radius: 0px\` while the test passed on \`abs(9999-0) > 100\`. Cured by \`@theme\` → \`@theme static\` in \`b0f2818a\` — **verify it still holds at HEAD**. Sol's W1 critics also left OWED: real remove/wrap/focus-within/disabled/long-content states. The DAG puts tags-input in a 2-cluster with chip (623 LOC). Live: \`/data/tags-input\`.` },
  { key: 'fourier-field', brief: `**fourier-field** — 2,897 LOC (1,921 code / 762 comment), **zero consumers**. The DAG ruling is KEEP-THIN with a named D11 gap: *"zero \`role\`/\`aria-label\`/\`keydown\` under an \`interactive\` prop its sibling serves"* — it advertises interactivity it does not expose to keyboard or AT. A procedural substrate with no consumers is squarely in scope for the deletion edict (vacuity/superfluity, consumer count not decisive either way) — argue it honestly in both directions. Live: \`/substrates/fourier-field\`. **Screenshot-only observation on any WebGPU canvas.**` },
  { key: 'constellation', brief: `**constellation** — 2,452 LOC, zero consumers. DAG ruling KEEP-THIN with **wrong-grain inside**: five files carry the module-name prefix (violating the module-name-stripping edict), \`constellationWell.ts\` is 139 lines with one export and one caller, there are five re-export hops, and DPR is inlined. The project record notes constellation "stays local" in a prior tranche — check whether that still holds. Spec the internal regrouping (goldilocks granularity, name-stripped) and rule on the component itself. Live: \`/substrates/constellation\`.` },
]

const SPEC_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['modelId', 'component', 'disposition', 'spec'],
  properties: {
    modelId: { type: 'string' },
    component: { type: 'string' },
    disposition: { type: 'string', description: 'KEEP · KEEP-THIN · SPLIT · MERGE-INTO <x> · GREENFIELD · DEMOTE · DELETE — with the one-line ground.' },
    spec: { type: 'string', description: 'The full terminal spec, markdown, dense.' },
    loc: { type: 'string', description: 'now → expected, comment-normalised, with the arithmetic.' },
    collisions: { type: 'array', maxItems: 12, items: { type: 'string' }, description: 'Files/tokens/primitives another component may also claim.' },
  },
}

phase('Challenge')

const results = await pipeline(
  COMPONENTS,
  // Stage 1 — three benches, each assuming a different thing is wrong
  (c) => {
    const benches = [
      { k: 'design', p: 'BENCH 1 — ASSUME THE DESIGN IS FLAWED. Not the code: the design. Is this the right affordance for the job at all? Does it earn its place in a liquid-glass library, or is it a shadcn part wearing our tokens? Does it have breath of life, or is it inert at rest? Does its motion carry weight, or does it snap? Judge it against the owner rows and against iOS 27 — and against what we should have instead. Go look at it live.' },
      { k: 'library', p: 'BENCH 2 — ASSUME THE LIBRARY IS IMPROPERLY STRUCTURED AROUND IT. Where does it live, what does it import, who imports it, what does it duplicate? Check colocation, module-name stripping, test displacement out of src/, barrel hygiene, dead exports, re-export hops, god-files and sand-files. Is its CSS delivered by one lane or four? Does it fork a register that already exists in styles/? Read the DAG row and test it.' },
      { k: 'impl', p: 'BENCH 3 — ASSUME THE COMPONENT IS IMPROPERLY IMPLEMENTED. Read every line. Find dead props, no-op facilities, false comments, unreachable branches, silent failures, a11y gaps, hit-target lies, values off the canonical series, cascade losers, and anything the story claims that the source does not do. MEASURE in the live browser — computed styles, painted extent, hit envelopes. A source grep earns no paint credit.' },
    ]
    return parallel(benches.map(b => () =>
      agent(`${CANON}\n\n---\n\n## COMPONENT\n${c.brief}\n\n---\n\n${b.p}\n\nDEFAULT TO REFUTATION. Every finding needs evidence you personally pulled — file:line, a computed value, a measured pixel, a git SHA. Rank by consequence. If something is genuinely fine, one line and move on.`,
        { label: `${c.key}:${b.k}`, phase: 'Challenge', model: 'opus', effort: 'high' })
    )).then(bs => ({ c, benches: bs.filter(Boolean) }))
  },
  // Stage 2 — two jurors break the splits
  ({ c, benches }) => {
    if (!benches.length) return null
    const text = benches.map((b, i) => `\n=== BENCH ${i + 1} ===\n${b}`).join('\n')
    return parallel([
      { k: 'juror-evidence', p: 'JUROR — EVIDENCE. Your question is only: which of these findings are TRUE? Reproduce them. A bench that asserts without measuring loses. Report each finding as SUSTAINED (with your reproduction) or STRUCK (with what you found instead). Correct every citation error — wrong line numbers, wrong file, wrong count, stale claim about deleted code.' },
      { k: 'juror-consequence', p: 'JUROR — CONSEQUENCE. Assume the findings are true. Which MATTER? Rank by what a user would notice and what would break a consumer. Kill the trivia explicitly. Then rule the disposition: does this component KEEP, KEEP-THIN, SPLIT, MERGE, GREENFIELD, DEMOTE or DIE — and is the DAG row right? Where the benches conflict, RULE and say why the loser lost.' },
    ].map(j => () =>
      agent(`${CANON}\n\n---\n\n## COMPONENT\n${c.brief}\n\n---\n\n${j.p}\n\nBe decisive. A juror who defers everything to the foreman has done nothing.\n${text}`,
        { label: `${c.key}:${j.k}`, phase: 'Jury', model: 'opus', effort: 'high' })
    )).then(js => ({ c, benches, jury: js.filter(Boolean) }))
  },
  // Stage 3 — TRI-FOLD terminal (owner Ecoute-moi 2026-07-25): Fable arm + Opus arm independently,
  // then a Fable adjudicator agglomerates the pair into the apotheosis.
  ({ c, benches, jury }) => {
    if (!jury || !jury.length) return null
    const foremanPrompt = `${CANON}

---

## COMPONENT
${c.brief}

---

You are the FOREMAN. Author the TERMINAL SPEC from the adjudicated record: three benches that each assumed
something different was wrong, and two jurors who tested evidence and consequence.

Adjudicate EVERY bench finding: ADOPT (and spec the cure), REFUTE (with the evidence that kills it), or
ROUTE (real, but another wave owns it — name it). A finding neither adopted nor refuted is a silent drop
and is forbidden. Where the jurors disagree, rule and say why.

The spec, in this order:
1. **Disposition** + one-paragraph thesis. Say plainly if you overturn the DAG row.
2. **§DEFECTS** — a table: id · defect · evidence (file:line / measured value) · severity.
3. **§THE DESIGN** — DOM, tokens from the canonical series, motion with real spring numbers, states,
   public surface, on-disk layout, what is deleted.
4. **§STRIKE** and **§ADD** — the aristotelian pass, both directions, each with its ground.
5. **§GATES** — born-RED, each with the mutation that must bite. No gate that cannot fail. If a proposed
   gate would pass on a broken tree, strike it and say so.
6. **§PAINT** — π/DELTA obligations: route · selector · property · viewport · engine. Chromium AND real
   \`safari-app\` (never Playwright-WebKit under a Safari label).
7. **§REJECTED** — every killed idea with its falsifier, so it cannot be re-raised.
8. **§LOC** — now → expected, comment-normalised, with arithmetic. If the reduction is mostly a comment
   cull, SAY SO.
9. **§ROUTED** — what another wave owns, named.

BENCHES:
${benches.map((b, i) => `\n=== BENCH ${i + 1} ===\n${b}`).join('\n')}

JURY:
${jury.map((j, i) => `\n=== JUROR ${i + 1} ===\n${j}`).join('\n')}`
    return parallel([
      () => agent(foremanPrompt, { label: `${c.key}:terminal`, phase: 'Terminal', model: 'opus', effort: 'high', schema: SPEC_SCHEMA }),
      () => agent(foremanPrompt, { label: `${c.key}:terminal-fable`, phase: 'Terminal', model: 'fable', effort: 'high', schema: SPEC_SCHEMA }),
    ]).then(([opusT, fableT]) => {
      const arms = [opusT, fableT].filter(Boolean)
      if (!arms.length) return null
      if (arms.length === 1) return arms[0]
      const show = (t, name) => `\n===== ${name} ARM — ${t.disposition} =====\nLOC: ${t.loc || '?'}\nCOLLISIONS: ${(t.collisions || []).join(' · ')}\n\n${t.spec}`
      return agent(`${CANON}\n\n---\n\n## COMPONENT\n${c.brief}\n\n---\n\nYou are the TRI-FOLD ADJUDICATOR (owner law 2026-07-25). Two foremen — one Fable, one Opus 5 — each
authored a terminal spec for this component from the same benches and jury. Agglomerate them, with
serious sagacity and INCREDULITY, into the apotheosis.

Incredulity means: shared claims get spot-checked against disk or the live page before adoption —
agreement between two models is not evidence. Disagreement is signal: reproduce the point and RULE it;
never average. If the arms rule different DISPOSITIONS, that is the headline — settle it on evidence and
record the loser in §REJECTED with its falsifier. The result must satisfy the same 9-section structure
the foremen were given and be strictly better than either arm; if one arm is simply superior wholesale,
adopt it and say why.

${show(fableT, 'FABLE')}
${show(opusT, 'OPUS')}`,
        { label: `${c.key}:apotheosis`, phase: 'Terminal', model: 'fable', effort: 'high', schema: SPEC_SCHEMA })
    })
  }
)

const specs = results.filter(Boolean)
log(`${specs.length}/${COMPONENTS.length} tier-2 terminal specs`)

phase('Fold')

const fold = await agent(`${CANON}

---

You are the TIER-2 FOLD. Eight components were each thrice-challenged, juried, and re-authored. Reconcile.

**1 · WHAT THE CHALLENGE CHANGED** — per component: did the pass change disposition, cure, gate or
arithmetic versus the DAG row it started from? A component whose spec merely ratified its prior is a
finding in itself — say which, and whether that survival is credible (independent reproduction) or lazy.
**2 · COLLISIONS** — one owning wave per file per cut. Name the owner; say what the others consume.
Check especially drawer/dialog (a merge), carousel/deck (a collapse), search/tags-input (shared field
registers), fourier-field/constellation (shared procedural substrate).
**3 · CANONICAL-SERIES COMPLIANCE** — every value any spec minted outside \`PROPORTION.md\`. Each is a
derived law (name it) or a defect (strike it).
**4 · DELETION LEDGER** — everything marked for death across the eight, with LOC and the ground. Sum it.
**5 · GATE BUDGET** — total gates requested; strike every gate that cannot fail.
**6 · OWNER ROWS DISCHARGED** — which F/A rows these eight actually close, and which they only touch.
**7 · WHAT REMAINS** — of the 62 components, which still have no terminal spec after this batch, ranked
for the next tier.

Dense tables. No filler.

${specs.map(s => `\n\n===== ${s.component} — ${s.disposition} =====\nLOC: ${s.loc || '?'}\nCOLLISIONS: ${(s.collisions || []).join(' · ')}\n\n${s.spec}`).join('')}`,
  { label: 'fold:tier2', phase: 'Fold', model: 'fable', effort: 'high' })

return { specs, fold }
