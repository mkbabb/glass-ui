export const meta = {
  name: 'ecoute-moi-and-dag-inference',
  description: 'Exact inventory of every screenshot + exhortation with per-item redress, twice-critiqued and judged; plus the DAG inference triumvirate over the deterministic graph',
  phases: [
    { title: 'Inventory', detail: 'enumerate every screenshot and exhortation in the prompt corpus' },
    { title: 'Redress', detail: 'per-item: correlate to component, post-mortem, amelioration plan' },
    { title: 'Critique', detail: 'twice-critique each redress plan' },
    { title: 'Judge', detail: 'adjudicate each' },
    { title: 'DAG inference', detail: 'triumvirate over the deterministic graph + SOTA process' },
    { title: 'Fold', detail: 'terminal reconciliation' },
  ],
}

const M_THINK = 'fable'
const M_SYNTH = 'opus'
const REPO = '/Users/mkbabb/Programming/glass-ui'
const REF = `${REPO}/docs/tranches/BJ/addenda/2026-07-24-refinement`
const SCRATCH = '/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad'
const SHOTS = '/Users/mkbabb/Downloads/New Folder With Items 4'

const COMMON = `
Repository: ${REPO} — Vue 3.5 + Tailwind v4 "liquid glass" component library, 7.0.0 live on npm.
PHASE: tranche development only. You MUST NOT edit, create or delete any file in the repo. Read-only.

THE REFINEMENT CORPUS ALREADY AUTHORED — read what you need, do not duplicate it:
  ${REF}/REGISTRY.md          finding families A..N,X,Y,Z with dispositions
  ${REF}/ROUND-1-FINDINGS.md  the 136 audited findings (30 blocker) — SINGLE SOURCE OF RECORD, cite by id
  ${REF}/WAVES.md             the wave set with born-RED gates
  ${REF}/REDUCTION.md         the re-authored reduction + §1 WHAT THE CRITICS KILLED
  ${REF}/MOTION-CANON.md      the measured motion law
  ${REF}/IOS27-ARCHIVE.md     the photometric iOS-27 re-analysis
  ${REF}/DAG.md               the deterministic graph, its method, and its refuted predecessors
  ${REPO}/docs/tranches/BJ/FEEDBACK-LEDGER.md   F01-F50, A01-A17, CFR-01 — the owner's own words

MEASURED FACTS AT HEAD (lead-verified — trust these over anything you infer):
- 62 components, 56,676 LOC (34,018 code / 17,620 comment). src overall is 39.4% comment;
  src/components 34.0%; dock 51.7%; src/styles/tokens 72.8%.
- 42 of 62 components (38,204 LOC, 67% of the tree) have ZERO src consumers.
- npm test is RED at HEAD; release.yml:48 runs it immediately before npm publish at :50.
- The demo crashes WebKit 5/5 on every route (CSS-blocked, one 318KB sheet). No Safari claim is admissible.
- src/composables/glass/ is a 4,740-LOC SHARED substrate; all four procedural fields already compose it.

EVIDENCE BAR: every claim names a file:line, a computed value, a screenshot and what is visible in it, or a
command and its output. Assertions about documents are NOT findings. If you cannot demonstrate it, say so.
`

// ---------------- PHASE 1 — inventory ----------------
phase('Inventory')

const INV_SCHEMA = {
  type: 'object',
  required: ['modelId', 'items'],
  properties: {
    modelId: { type: 'string' },
    items: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'kind', 'source', 'verbatim', 'subject'],
        properties: {
          id: { type: 'string' },
          kind: { type: 'string', enum: ['screenshot', 'exhortation', 'recording'] },
          source: { type: 'string', description: 'file path or ledger row id' },
          verbatim: { type: 'string', description: "the owner's exact words, quoted" },
          subject: { type: 'string', description: 'what it is about, in one line' },
          components: { type: 'array', items: { type: 'string' } },
          routes: { type: 'array', items: { type: 'string' } },
        },
      },
    },
  },
}

const inventories = await parallel([
  () => agent(`${COMMON}
YOUR TASK: **inventory every EXHORTATION in the owner's feedback corpus.**

Read ${REPO}/docs/tranches/BJ/FEEDBACK-LEDGER.md in full — F01..F50, A01..A17, CFR-01 — and any sibling
ledger or ASK file under ${REPO}/docs/tranches/BJ/. For EVERY row emit one item carrying the owner's
VERBATIM words, the component(s) it names or implies, and the demo route(s) where it is observable.

Do not summarise, do not merge rows, do not skip a row because it looks discharged. A row that a prior
tranche marked closed is still inventoried here — closure is exactly what is under audit. If a row's
subject is ambiguous, say so in \`subject\` rather than guessing.`,
    { model: M_THINK, label: 'inv:exhortations', phase: 'Inventory', schema: INV_SCHEMA }),

  () => agent(`${COMMON}
YOUR TASK: **inventory every SCREENSHOT and RECORDING in the owner's evidence corpus.**

The corpus is \`${SHOTS}\` (31 files: 7 iOS screen recordings, 1 desktop recording duplicated, iOS stills
IMG_1874/1881/1882/2287/2288, ~14 dated Screenshots, 2 texture references, and several stills that are
OUR OWN artefacts — dock playground, sci-report, mini-player). Also check \`~/Downloads\` for dated
Screenshot PNGs from 2026-07-16 onward, which are glass-ui captures the owner marked during this tranche.

For EVERY file emit one item: what is visibly in it, whether it is an iOS-27 exemplar or one of OUR
surfaces, and which glass-ui component(s) it bears on. **Read the images** — do not infer from filenames.

Distinguish carefully, because the two classes get opposite treatment: an iOS still is a TARGET to learn
from; one of our own screenshots is a DEFECT REPORT. Say which each is.

Note ${REF}/IOS27-ARCHIVE.md already covers the iOS-27 subset photometrically — do not redo that analysis,
but DO inventory those files and cross-reference what the archive concluded, flagging any file the archive
did not reach.`,
    { model: M_THINK, label: 'inv:screenshots', phase: 'Inventory', schema: INV_SCHEMA }),
])

const items = inventories.filter(Boolean).flatMap(r => r.items || [])
log(`inventory: ${items.length} items (${items.filter(i => i.kind === 'exhortation').length} exhortations, ${items.filter(i => i.kind !== 'exhortation').length} visual)`)

// batch items so each redress seat handles a coherent group
const BATCH = 6
const batches = []
for (let i = 0; i < items.length; i += BATCH) batches.push({ n: batches.length + 1, rows: items.slice(i, i + BATCH) })
log(`redress: ${batches.length} batches of <=${BATCH}, each redressed -> twice-critiqued -> judged`)

// ---------------- PHASES 2-4 — redress, twice critique, judge ----------------
phase('Redress')

const adjudicated = await pipeline(
  batches,

  // stage 1 — the redress plan
  (b) => agent(`${COMMON}
YOUR TASK: **redress plan for these ${b.rows.length} owner items.**

${JSON.stringify(b.rows, null, 1)}

For EACH item, independently, produce:
1. **TARGET** — the exact component/file/token/selector it bears on, verified on disk at HEAD. If the item
   names something that does not exist, say so; that is itself the finding.
2. **STATE AT HEAD** — what the code actually does now, with a file:line or computed value. Run commands.
3. **POST-MORTEM** — was this addressed by a prior tranche? Find the commit (\`git log -S\`). If it was
   marked closed but the defect is live, say exactly how the closure was wrong: byte-unchanged, prose-only,
   gate-only, wrong-referent, or genuinely fixed and since regressed.
4. **REDRESS** — the concrete change, at the grain an implementer executes without asking a question.
5. **WHERE IT LANDS** — the owning wave in ${REF}/WAVES.md, or NEW-WAVE with a proposed id if none fits.
6. **RECONCILIATION** — does this contradict anything already authored in the refinement corpus? The corpus
   has at least one KNOWN OPEN CONTRADICTION (motion canon says saturate DOWN on cream; the iOS photometry
   measures transmission saturation +62% and argues UP). If your item touches a contested axis, say which
   way YOUR evidence points and why — do not paper over it.

Be specific and short per item. No process narrative.`,
    { model: M_THINK, label: `redress:b${b.n}`, phase: 'Redress' })
      .then(plan => ({ b, plan })),

  // stage 2 — twice critique
  ({ b, plan }) => parallel([
    () => agent(`${COMMON}
A redress plan was authored for these owner items:

${JSON.stringify(b.rows, null, 1)}

THE PLAN:
${plan}

YOUR BENCH — **CRITIQUE I: IS IT TRUE?** Verify every factual claim against the repo yourself. Find claims
that are wrong, stale, unverifiable, or that cite a path/symbol that does not exist. Find post-mortems that
credit a fix that did not happen, and post-mortems that call something unfixed which actually landed. You
are the defence against a plan that reads well and is false. Quote the failing check.`,
      { model: M_THINK, label: `critique-I:b${b.n}`, phase: 'Critique' }),

    () => agent(`${COMMON}
A redress plan was authored for these owner items:

${JSON.stringify(b.rows, null, 1)}

THE PLAN:
${plan}

YOUR BENCH — **CRITIQUE II: DOES IT ACTUALLY SATISFY THE OWNER?** Re-read each item's verbatim words. Ask
whether the proposed redress would make the owner say "yes, that is what I meant" — or whether it is a
technically-defensible reading that misses the point. Named failure modes to hunt: discharging an aesthetic
complaint with a token rename; satisfying the letter via a gate while the surface still looks wrong;
redressing a symptom on one route when the complaint was about the whole library; and declaring an item
UNFALSIFIABLE to avoid doing it. Where the redress is too small, say what the honest scope is.`,
      { model: M_THINK, label: `critique-II:b${b.n}`, phase: 'Critique' }),
  ]).then(crits => ({ b, plan, crits: crits.filter(Boolean) })),

  // stage 3 — judge
  ({ b, plan, crits }) => agent(`${COMMON}
You are the JUDGE for these ${b.rows.length} owner items.

ITEMS:
${JSON.stringify(b.rows, null, 1)}

THE REDRESS PLAN:
${plan}

CRITIQUE I — IS IT TRUE:
${crits[0] || '(failed)'}

CRITIQUE II — DOES IT SATISFY THE OWNER:
${crits[1] || '(failed)'}

Rule on each item and emit the TERMINAL ROW. Markdown table plus per-item notes where a note is needed:

| item | owner's words (short) | target (file:line) | state at HEAD | prior-closure verdict | redress | owning wave | confidence |

\`prior-closure verdict\` is one of: NEVER-ADDRESSED · PROSE-ONLY · GATE-ONLY · WRONG-REFERENT ·
BYTE-UNCHANGED · GENUINELY-FIXED · REGRESSED. \`confidence\` is HIGH only where you personally verified the
file:line.

Where the critiques disagree, break it and say how. Where Critique I refuted a factual claim, the row is
corrected — never merely footnoted. Where Critique II showed the redress misses the owner's point, the
redress is REWRITTEN, not annotated. Be decisive; no deferrals.`,
    { model: M_SYNTH, label: `judge:b${b.n}`, phase: 'Judge' })
      .then(verdict => ({ batch: b.n, verdict })),
)

// ---------------- PHASE 5 — DAG inference triumvirate ----------------
phase('DAG inference')

const DAG_BRIEF = `${COMMON}
THE DETERMINISTIC GRAPH IS BUILT. Read ${REF}/DAG.md for the method and the headline, and
${SCRATCH}/dag-deterministic.json for all 62 node feature vectors. Generator: ${SCRATCH}/dag3.mjs.

WHAT IT ESTABLISHED (verify before building on it):
- Duplication is largely REFUTED: exactly ONE pair in 1,891 clears the >=2-independent-spaces bar
  (checkbox ~ radio-group). ZERO pairs share CSS-class vocabulary at >=0.34 anywhere in the library.
- Superfluity is CONFIRMED: 42 of 62 components (38,204 LOC, 67%) have zero src consumers.
- The loudest single edge in the graph is dialog ~ drawer at 0.80 on reka primitives — UNRULED.
- The binary-control triad: checkbox~switch 0.75, radio-group~switch 0.636, checkbox~radio-group 0.60 on props.
- Two PRIOR similarity analyses were refuted by their own output — v1 collapsed everything to one
  CSS-class Jaccard (scored alert~toast ~1.0, which is correct SHARING not duplication, and scored the four
  procedural fields low); v2 scored aurora~search at 1.0 because both had a single class token harvested
  from a COMMENT. Do not repeat either failure.
`

const dagSeats = await parallel([
  () => agent(`${DAG_BRIEF}

YOUR SEAT — **THE ISOMORPHISM JUDGE.** The deterministic pass can measure feature overlap; it cannot see
PURPOSE. That is your job.

Rule explicitly on:
1. **dialog ~ drawer (reka 0.80)** — the graph's loudest unexplained edge. An earlier critic defended the
   split with real capability evidence (drawer owns detent physics + drag-dismiss; dialog owns the
   concentric-radius relay + side placements; left/right drawers get NO detent ladder while the in-repo
   dialog side placements ARE left/right). Fold, keep-split, or re-cut the boundary — decide on capability,
   not on the score.
2. **The binary-control triad.** Roles (checkbox/radio/switch) must stay semantically distinct. Is there a
   shared control primitive underneath — sizing, focus ring, engagement ladder, disabled arm — and what
   exactly does it own? Sketch its API in <=10 lines.
3. **Whether any TRUE outright duplicate exists** that the feature spaces missed because the two
   implementations are textually different but behaviourally identical. Name it or state that none exists.

Cite node features. A verdict with no feature citation is inadmissible.`,
    { model: M_THINK, label: 'dag:isomorphism', phase: 'DAG inference' }),

  () => agent(`${DAG_BRIEF}

YOUR SEAT — **THE SUPERFLUITY JUDGE.** 42 of 62 components have zero src consumers. Adjudicate them.

The consumer bar is necessary but NOT sufficient, and saying so precisely is the work:
- \`labeled-field\` has 14 DEMO consumers and 0 src consumers. That is a library fact, not a demo fact — a
  component the demo leans on 14 times is load-bearing even with no internal import.
- \`aurora\` has 23 demo consumers and 0 src. It is not overfit; it is the substrate.
- \`constellation\` has 25 props, 2,452 LOC, 2 stories, 0 src consumers, and no GPU stack of its own.
- \`handmark\` has 19 props, 2,242 LOC, 1 story.
- \`typewriter\` has 1,418 LOC, 1 story, and was never examined by ANY prior tranche.

Produce a terminal table for all 42: component · LOC · props · demo consumers · verdict · one-line reason.
Verdict ∈ KEEP · KEEP-THIN · DEMOTE-TO-DEMO · DELETE · GREENFIELD. Be decisive — the immortal
"min-consumers watched-conditions" book has ridden 10-11 tranches without a decision and this seat exists
to end it. Every delete/demote names the package.json subpath it removes (there are 72).`,
    { model: M_THINK, label: 'dag:superfluity', phase: 'DAG inference' }),

  () => agent(`${DAG_BRIEF}

YOUR SEAT — **THE METHOD JUDGE.** Codify the process, for us and generally.

The ask was to "brainstorm for the SOTA, or codify a process that's bespoke for our usecase and potentially
in a generalized manner for component and library level analysis via a constructed graph."

1. **Survey what the state of the art actually is** for component-library graph analysis — dependency-cruiser
   / madge style import graphs, AST-level clone detection (Type-1/2/3/4 clones), design-token graph analysis,
   CSS-in-JS dedup research, and what commercial design systems do. Be concrete about which techniques
   transfer to a Vue SFC + Tailwind v4 + CSS-custom-property library and which do NOT, and why.
2. **Judge our v3 method honestly.** Multi-space Jaccard with degenerate-set guards and comment-stripping.
   Where is it still weak? Candidly: Jaccard over prop NAMES misses semantic equivalence under renaming;
   nothing measures BEHAVIOUR; nothing measures rendered output. What would a Type-4 (semantic) clone
   detector add here, and is it worth it at 62 components?
3. **Specify the terminal method** — the one we should actually run at every tranche close, as a script
   with a defined output and a defined failure mode. It must be cheap enough to run every close and must
   not mint an append-only ledger of derived pair data (a known convergence-failure mode in this repo:
   critics minting derived data that the gate then cannot converge over).
4. **State what a graph can never decide**, so no future round asks it to.`,
    { model: M_THINK, label: 'dag:method', phase: 'DAG inference' }),
])

// ---------------- PHASE 6 — fold ----------------
phase('Fold')

const verdicts = adjudicated.filter(Boolean)
const fold = await agent(`${COMMON}
You are the FOLD seat. Produce the terminal reconciliation document.

=== ADJUDICATED OWNER ITEMS (${verdicts.length} batches) ===
${verdicts.map(v => `\n----- batch ${v.batch} -----\n${v.verdict}`).join('\n')}

=== DAG INFERENCE — ISOMORPHISM ===
${dagSeats[0] || '(failed)'}

=== DAG INFERENCE — SUPERFLUITY ===
${dagSeats[1] || '(failed)'}

=== DAG INFERENCE — METHOD ===
${dagSeats[2] || '(failed)'}

Emit ONE markdown document, "ECOUTE — the owner-item reconciliation", with:

1. **THE MASTER TABLE.** Every owner item, one row, sorted by prior-closure verdict with NEVER-ADDRESSED
   first. Columns: item · owner's words · target · state at HEAD · prior-closure verdict · redress ·
   owning wave. **No item may be dropped.** If an item appears in no batch, say so under COVERAGE GAP.
2. **THE POST-MORTEM ROLL-UP.** Count by prior-closure verdict. Then the mechanism: what KIND of closure
   failure dominates, and which of the five refinement laws (${REF}/REFINEMENT.md §2) would have caught it.
   If none would have, say so — that is a gap in the laws and it must be named.
3. **NEW WAVES REQUIRED.** Items landing in no existing wave, grouped into the smallest number of coherent
   new waves, each with a born-RED gate and its RED-at-HEAD condition.
4. **THE DAG RULINGS**, consolidated: the dialog~drawer verdict, the binary-control primitive, the 42-row
   superfluity table, and the terminal method.
5. **CONTRADICTIONS** — every place two seats disagreed, or a seat disagreed with the already-authored
   corpus. Do NOT resolve by preference: state each side, name the instrument that would settle it, and
   where the instrument is a measurement, say what to measure. The known open one is the saturate direction.
6. **FALSE PREMISES KILLED** — anything you can show is wrong at HEAD, including claims inherited from the
   briefing you were given. Two prior similarity analyses and one reduction proposal have already been
   refuted this way; assume more remain.

Be exhaustive on coverage and terse in prose. Cite ROUND-1-FINDINGS ids rather than restating evidence.
Declare your exact modelId.`,
  { model: M_SYNTH, label: 'ECOUTE:fold', phase: 'Fold' })

return {
  inventoryCount: items.length,
  batches: batches.length,
  adjudicated: verdicts.length,
  dagSeats: dagSeats.filter(Boolean).length,
  fold,
}
