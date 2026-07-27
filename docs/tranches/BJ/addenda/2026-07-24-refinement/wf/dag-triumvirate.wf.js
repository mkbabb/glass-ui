export const meta = {
  name: 'dag-triumvirate',
  description: 'Every graph cluster viewed thrice: two benches assuming the graph structure is WRONG, one adjudicator proving or disproving them',
  phases: [
    { title: 'Wrong-A', detail: 'bench 1: the graph structure is wrong' },
    { title: 'Wrong-B', detail: 'bench 2: the graph structure is wrong, independently' },
    { title: 'Adjudicate', detail: 'prove or disprove each finding' },
    { title: 'Fold', detail: 'terminal graph ruling' },
  ],
}

// OWNER RULING 2026-07-24, standing: ALL agents use Opus 5. No Fable seats anywhere.
const M = 'opus'
const M_FOLD = 'opus'
const REPO = '/Users/mkbabb/Programming/glass-ui'
const REF = `${REPO}/docs/tranches/BJ/addenda/2026-07-24-refinement`
const SCRATCH = '/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad'

// Batch size is bespoke per cluster: the one real cluster goes alone; singletons are grouped by
// size band so a batch is a comparable unit of judgement rather than an arbitrary slice.
const BATCHES = [
  { id: 'cluster-dock', why: 'the only multi-node cluster of consequence, and it contains the graph\'s only cycle',
    members: ['dock', 'slider', 'select', 'popover', 'dropdown-menu'] },
  { id: 'cluster-pairs', why: 'the two remaining real edges',
    members: ['card', 'surface', 'command', 'dialog'] },
  { id: 'giants', why: 'isolated singletons over 2,000 LOC — the mass of the tree, all edgeless',
    members: ['aurora', 'blob', 'fourier-field', 'constellation', 'timeline', 'handmark'] },
  { id: 'mid', why: 'isolated singletons 500-2,000 LOC',
    members: ['typewriter', 'sortable-list', 'easing', 'pager-dots', 'data-table', 'drawer', 'configurator', 'tabs', 'search', 'completion-seal', 'toast', 'watercolor-dot'] },
  { id: 'small', why: 'isolated singletons under 500 LOC — where sand accumulates',
    members: ['carousel', 'labeled-field', 'metric', 'toggle-group', 'tags-input', 'progress', 'chip', 'button', 'accordion', 'fading-scroll', 'expandable-container', 'status-dot', 'scroll-progress-rim', 'number-field', 'avatar', 'radio-group', 'instrument-chassis', 'deck', 'tooltip', 'infinite-scroll', 'table', 'collapsible', 'switch', 'dark-mode-toggle', 'separator', 'checkbox', 'header-ribbon', 'alert', 'skeleton', 'animated-digit', 'label', 'badge', 'input', 'textarea', 'paper-backdrop'] },
]

const COMMON = `
Repository: ${REPO} — Vue 3.5 + Tailwind v4 liquid-glass component library, 7.0.0 live on npm.
PHASE: tranche development only. READ-ONLY. You MUST NOT edit, create or delete any repo file.

**READ FIRST — these are law for this seat:**
  ${REF}/ANALYSIS-SPEC.md   the audit dimensions D1-D12, the three benches, the rules of judgement
  ${REF}/EXEC-STATE.md      what is already done and measured — DO NOT RE-MEASURE IT
  ${REF}/DAG.md             the deterministic graph, its method, and its two REFUTED predecessors

DATA:
  ${SCRATCH}/dag-deterministic.json   62 nodes, full feature vectors (props, emits, reka, classes,
                                      tokens, springs, composables, anim, a11y, consumers)
  ${SCRATCH}/dag-clusters.json        56 connected clusters + the directed cycles
  ${SCRATCH}/dag3.mjs                 the generator

THE DETERMINISTIC RESULT (verify, then build on it):
- 62 components, 56,676 LOC (34,018 code / 17,620 comment — the tree is 34% prose).
- **The component graph is nearly EDGELESS: 56 clusters, 53 isolated singletons totalling 43,929 LOC (78%
  of the tree).** Only three clusters have any edge at all.
- The one cluster of consequence: dock, slider, select, popover, dropdown-menu (10,655 LOC) — and the
  edges are LEAKS INWARD: 5 components import ../dock/composables/dockContext, slider also imports
  useDockHold. **The graph's only directed cycle is dock -> dropdown-menu -> dock.**
- **42 of 62 components have ZERO src consumers** (38,204 LOC, 67%).
- Duplication is largely REFUTED: exactly ONE pair of 1,891 clears the >=2-independent-spaces similarity
  bar (checkbox ~ radio-group); ZERO pairs share CSS-class vocabulary at >=0.34.
- Below the bar, the real signals: checkbox~switch 0.75 / radio-group~switch 0.636 on props (the binary-
  control triad); input~textarea 0.591; **dialog~drawer 0.80 on reka primitives — the loudest edge in the
  graph and still UNRULED**; blob~fourier-field 0.45 on composables; command~dropdown-menu 0.60 on tokens.

TWO PRIOR SIMILARITY ANALYSES WERE REFUTED BY THEIR OWN OUTPUT — do not repeat either:
- v1 collapsed everything to one CSS-class Jaccard. It scored alert~toast ~1.0 (they legitimately SHARE
  _shared/feedback — correct sharing, not duplication) and scored the four procedural fields LOW (they
  share composables and a substrate, not classes). Its strongest verdict drove a proposed 6,000-line
  restructure that turned out to be fiction: src/composables/glass/webgpu/ already existed at 1,228 LOC
  and all four fields already composed it.
- v2 scored aurora~search at 1.0 because both had a single class token harvested from a COMMENT, and its
  props/reka extractors returned zero for EVERY component, so four of six spaces were silently dead.

RULES: consumer count is NOT sufficient grounds for deletion — deletion is granted on VACUITY or
SUPERFLUITY. Conversely one consumer never SAVES a component. No legacy code, no shims, no dual paths.
Breaking changes are allowed. Be pithy and laconic: more code is not better.

EVIDENCE BAR: file:line, computed value, or a command and its output. Claims about documents are not
findings.
`

const FINDINGS = {
  type: 'object',
  required: ['modelId', 'verdict', 'findings'],
  properties: {
    modelId: { type: 'string' },
    verdict: { type: 'string', enum: ['GRAPH-SOUND', 'GRAPH-FLAWED', 'GRAPH-WRONG'] },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'claim', 'evidence', 'remedy', 'severity'],
        properties: {
          id: { type: 'string' }, claim: { type: 'string' },
          evidence: { type: 'string' }, remedy: { type: 'string' },
          severity: { type: 'string', enum: ['S0', 'S1', 'S2', 'S3'] },
          nodesAffected: { type: 'array', items: { type: 'string' } },
        },
      },
    },
  },
}

phase('Wrong-A')

const out = await pipeline(
  BATCHES,

  (b) => parallel([
    () => agent(`${COMMON}
YOUR BATCH: **${b.id}** — ${b.why}
NODES: ${b.members.join(', ')}

YOUR BENCH: **ASSUME THE GRAPH STRUCTURE IS WRONG.** Not that a node is wrong — that the *structure* is.

Interrogate, for these nodes and the edges among them:
- **Edges that should exist and do not.** A 53-singleton graph either means the components are genuinely
  independent, or it means shared structure is being COPIED instead of imported. Which is it, here? Find
  duplicated logic that ought to be one edge. Cite both copies.
- **Edges that exist and should not.** A component reaching into another component's internals is a
  layering fault, not a dependency. The dock cluster is entirely this.
- **Cycles.** dock -> dropdown-menu -> dock. What does each direction carry, and which one is wrong?
- **Wrong granularity.** Is a node actually two things? Are two nodes actually one? A god-module and a
  grain of sand are both structure faults.
- **Wrong home.** Should this be a component at all, or a composable, a style register, or a demo helper?

State GRAPH-SOUND / GRAPH-FLAWED / GRAPH-WRONG for the batch and every finding with its evidence.`,
      { model: M, label: `${b.id}:wrong-A`, phase: 'Wrong-A', schema: FINDINGS }),

    () => agent(`${COMMON}
YOUR BATCH: **${b.id}** — ${b.why}
NODES: ${b.members.join(', ')}

YOUR BENCH: **ASSUME THE GRAPH STRUCTURE IS WRONG — and you are the SECOND, INDEPENDENT bench.** Do not
converge on the obvious reading. Where bench A will look at edges, you look at what the graph CANNOT see.

Interrogate:
- **Structure the import graph cannot express.** Shared CSS registers, shared tokens, shared reka
  primitives, shared behavioural contracts. Two components with no import edge can still be structurally
  fused through a stylesheet or a token ramp. Find those. The deterministic pass measures class/token/reka
  overlap — use it, but read the SOURCE to decide whether an overlap is correct sharing or duplication.
- **The directory shape vs the graph shape.** Does the file tree agree with the dependency tree? A
  directory that groups things the graph says are unrelated is a false module; a module split across
  directories is a real one going unnamed.
- **Naming as structure.** Per the module-name-stripping edict, a file inside a module repeating the
  module's name is noise ("easing/easing-config" -> "easing/config"). Find every instance in these nodes.
- **Tests inside src/.** Tests must live in a tree isomorphic to source, never colocated. Find violations.
- **Vacuity.** Does a node do anything? A component that only forwards props to reka, or only applies two
  classes, is a wrapper — name it. Vacuity, not consumer count, is the deletion ground.

State your verdict and every finding with evidence.`,
      { model: M, label: `${b.id}:wrong-B`, phase: 'Wrong-B', schema: FINDINGS }),
  ]).then(w => ({ b, wrong: w.filter(Boolean) })),

  ({ b, wrong }) => agent(`${COMMON}
YOUR BATCH: **${b.id}** — ${b.why}
NODES: ${b.members.join(', ')}

YOU ARE THE **ADJUDICATOR**. Two benches were each told to assume the graph structure is wrong. Your duty
is to **prove or disprove each finding**, not to agree with either.

BENCH A:
${JSON.stringify(wrong[0] || {}, null, 1)}

BENCH B:
${JSON.stringify(wrong[1] || {}, null, 1)}

For EVERY finding: **PROVEN** (with the command or file:line that establishes it) or **DISPROVEN** (with
the evidence that refutes it) or **PARTIAL** (what survives, exactly). Go to the source yourself. A bench
that overreached is disproven explicitly and in writing, so the claim cannot return.

This corpus has already had a reduction proposal, two similarity analyses, a CSS crash attribution and a
package-defect attribution refuted by measurement. **Assume some of what you were handed is wrong.**

Then emit the batch's TERMINAL GRAPH RULING:
- per node: KEEP · KEEP-THIN · MERGE-INTO-<x> · SPLIT-INTO-<x,y> · MOVE-TO-<path> · DEMOTE-TO-DEMO ·
  DELETE, with the one-line ground (vacuity / superfluity / correct-as-is / wrong-home / wrong-grain)
- per edge: KEEP · INVERT · SEVER-VIA-<primitive>, with what breaks
- the cycle, if this batch contains it: which direction is severed and how
- the directory shape these nodes should have afterwards, including module-name stripping and test
  displacement

Be decisive and laconic. No deferrals.`,
    { model: M, label: `${b.id}:ADJUDICATE`, phase: 'Adjudicate' })
      .then(ruling => ({ batch: b.id, ruling })),
)

phase('Fold')

const ok = out.filter(Boolean)
const fold = await agent(`${COMMON}
You are the terminal FOLD over the graph triumvirate. ${ok.length} batch rulings:

${ok.map(r => `\n===== ${r.batch} =====\n${r.ruling}`).join('\n')}

Emit **THE TERMINAL GRAPH RULING** for the whole library:

1. **THE SHAPE THE LIBRARY SHOULD HAVE.** Not a list of edits — the target structure, stated so an
   implementer can see it. Which modules exist, what each owns, where the boundaries are.
2. **PER-NODE VERDICT TABLE.** All 62. component · LOC · code-vs-comment · verdict · ground · new home.
3. **EDGE RULINGS**, including the severing of the dock leak set and the dock->dropdown-menu cycle.
4. **THE MERGE / SPLIT SET.** Where nodes fuse or divide, with the resulting API in <=5 lines each.
5. **DIRECTORY SETTLEMENT.** Long-running directories pruned or agglomerated; goldilocks grouping;
   module-name stripping applied; tests displaced out of src/ into an isomorphic tree.
6. **WHAT THE GRAPH CANNOT DECIDE** — and the instrument that would.
7. **DISPROVEN CLAIMS**, consolidated, so no later round re-raises them.
8. **LOC LEDGER** against the 56,676-line tree, comment-normalised. If the plan grows the tree, justify it.

Declare your exact modelId. Exhaustive on coverage, terse in prose.`,
  { model: M_FOLD, label: 'GRAPH:fold', phase: 'Fold' })

return { batches: ok.length, fold }
