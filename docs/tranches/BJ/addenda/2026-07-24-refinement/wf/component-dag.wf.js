export const meta = {
  name: 'bk-component-dag',
  description: 'Deterministic component graph extraction + Fable isomorphism inference + ruthless reduction, twice critiqued',
  phases: [
    { title: 'Extract', detail: 'deterministic node/edge extraction (Opus)' },
    { title: 'Infer', detail: 'Fable isomorphism + duplication inference' },
    { title: 'Reduce', detail: 'Fable reduction proposal' },
    { title: 'Critique', detail: 'two adversarial Fable critics + judge' },
  ],
}

const REPO = '/Users/mkbabb/Programming/glass-ui'
const SP = '/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad'

const GRAPH = {
  type: 'object',
  required: ['modelId', 'method', 'nodes', 'notes'],
  properties: {
    modelId: { type: 'string' },
    method: { type: 'string', description: 'exactly how you extracted this, including the scripts you ran' },
    notes: { type: 'string' },
    nodes: {
      type: 'array',
      items: {
        type: 'object',
        required: ['name', 'loc', 'exported', 'props', 'slots', 'emits', 'dependsOn', 'tokensRead', 'cssClasses', 'animation', 'affordances', 'purpose'],
        properties: {
          name: { type: 'string' },
          loc: { type: 'number' },
          exported: { type: 'boolean' },
          props: { type: 'array', items: { type: 'string' } },
          slots: { type: 'array', items: { type: 'string' } },
          emits: { type: 'array', items: { type: 'string' } },
          dependsOn: { type: 'array', items: { type: 'string' }, description: 'other components/composables it imports' },
          tokensRead: { type: 'array', items: { type: 'string' }, description: 'CSS custom properties it reads' },
          cssClasses: { type: 'array', items: { type: 'string' }, description: 'glass/utility classes it applies' },
          animation: { type: 'string', description: 'what moves, driven by what (spring token / keyframe / rAF / none)' },
          affordances: { type: 'array', items: { type: 'string' }, description: 'interaction affordances: hover, press, drag, keyboard, focus-visible, engaged, modal' },
          purpose: { type: 'string', description: 'one sentence: the job this component owns' },
        },
      },
    },
  },
}

phase('Extract')

// Deterministic extraction — mechanical, so Opus. Split by alphabetical thirds to bound each seat.
const thirds = [
  ['accordion','alert','animated-digit','aurora','avatar','badge','blob','button','card','carousel','checkbox','chip','collapsible','command','completion-seal','configurator','constellation','dark-mode-toggle','data-table','deck','dialog'],
  ['dock','drawer','dropdown-menu','easing','expandable-container','fading-scroll','fourier-field','handmark','header-ribbon','infinite-scroll','input','instrument-chassis','label','labeled-field','metric','number-field','pager-dots','paper-backdrop','popover','progress','radio-group'],
  ['scroll-progress-rim','search','select','separator','skeleton','slider','sortable-list','status-dot','surface','switch','table','tabs','tags-input','textarea','timeline','toast','toggle-group','tooltip','typewriter','watercolor-dot'],
]

const extracted = await parallel(thirds.map((group, i) => () => agent(
  `You are a mechanical extraction seat. Repository: ${REPO} (Vue 3 + Tailwind v4 component library).

Extract a precise structural record for EACH of these components under src/components/:
${group.join(', ')}

For each, read every file in its directory and produce the node record:
- loc: total lines across the component directory
- exported: is there a matching key in package.json "exports" (e.g. "./button")
- props: every prop name from defineProps / the Props interface (read types.ts if separate)
- slots: every named slot used in the templates
- emits: every emit
- dependsOn: components and composables it imports (module specifiers, resolved to names)
- tokensRead: CSS custom properties (--foo) it reads in its template, script, or CSS
- cssClasses: glass-* / utility classes it applies (glass-wash/quiet/resting/floating/overlay, glass-card,
  rounded-*, focus-ring, etc.)
- animation: what animates and what drives it — name the spring token (--spring-*), @keyframes,
  requestAnimationFrame loop, CSS transition, or "none". Be specific: "scale on press via --spring-press".
- affordances: which of hover / press / drag / keyboard / focus-visible / engaged-state / modal-variant /
  reduced-motion-arm the component actually implements. Only list what is IMPLEMENTED, verified in source.
- purpose: one sentence naming the job it owns.

Be exhaustive and accurate — this graph is the basis of a ruthless reduction, so a wrong edge costs a wrong
deletion. Where a component has NO animation or NO keyboard support, say so plainly; absence is the signal.

DO NOT EDIT ANY FILE. Return through StructuredOutput with your exact modelId.`,
  { model: 'opus', label: `dag:extract-${i + 1}`, phase: 'Extract', schema: GRAPH })))

phase('Infer')

const nodes = extracted.filter(Boolean).flatMap(r => r.nodes || [])

const inference = await agent(`You are a Fable seat performing GRAPH INFERENCE over a component library.

The owner's ask, verbatim:
"the begotten DAG is for our components (what synonyms or isomorphisms, redundancies of structure shared
between whole components, share OF whole components (are there duplicative components outright) — a
generalized component and library graph analysis should be performed both deterministically and with your
Fable workflow's inference after delineation and demarcation — these graph nodes should include metadata,
styling, purpose, animation, affordances, etc — research and dispatch a triumvirate to properly handle this
detailed task — brainstorm for the SOTA, or codify a process that's bespoke for our usecase and potentially
in a generalized manner for component and library level analysis via a constructed graph."

Here is the deterministically extracted node set (${nodes.length} components):

${JSON.stringify(nodes, null, 2)}

Supplementary measured facts from the lead (trust these, they are verified):
- Total component LOC 58,549 of 86,899 src lines.
- Five giants are 50% of component code: aurora 9205, dock 8046, blob 6028, constellation 2993, fourier-field 2950.
- \`deck\` (277 LOC, exported) has ZERO usage sites in src/ or demo/.
- Zero src-usage: paper-backdrop, animated-digit, header-ribbon, scroll-progress-rim.
- 34.4% of src is comment; the token files are up to 80% comment.

Your job — produce the INFERRED GRAPH LAYER. Specifically:

1. ISOMORPHISM CLASSES. Group components that are structurally the same machine wearing different names.
   Judge on: the state machine they run, the geometry they interpolate, the affordance they expose — NOT on
   their label. Candidate classes to test (confirm or refute each with node evidence):
   - track-and-thumb: slider / progress / scroll-progress-rim / timeline-scrubber / pager
   - disclosure: accordion / collapsible / expandable-container / drawer(detent)
   - overlay-with-anchor: popover / tooltip / dropdown-menu / select / command
   - dismissible-layer: dialog / drawer / toast / alert
   - paged-sequence: carousel / deck / pager-dots / tabs
   - scroll-observer: fading-scroll / infinite-scroll / scroll-progress-rim / reveal composables
   - procedural-substrate: aurora / blob / constellation / fourier-field / watercolor-dot / handmark
   - readout: metric / animated-digit / badge / status-dot / chip
   For each class: the shared machine, the members, what genuinely differs, and whether the difference
   justifies a separate component or is a prop/variant.

2. PARTIAL SHARE. Where one component contains a chunk of another (not the whole), name the chunk and
   propose the shared primitive that should own it.

3. OUTRIGHT DUPLICATES. Components that should not both exist. Be decisive.

4. THE REDUCTION FRONTIER. Rank every component by (value it earns) / (LOC + surface it costs). The owner's
   bar, verbatim: "Just because one library leverages a component is not enough: this is a ruthless purging
   to our core of glass, animation, procedural animations... into a perfected union."

5. THE METHOD ITSELF. The owner asked for SOTA research or a bespoke codified process. Propose the process:
   what node metadata, what edge types, what inference passes, what makes it re-runnable as a gate. Name it,
   and state how it generalises beyond this repo. Keep it small enough to actually run — one script and one
   inference pass, not a framework.

Be ruthless and specific. Every claim cites a node. Return thorough markdown with your exact modelId.`,
  { model: 'fable', label: 'dag:infer', phase: 'Infer' })

phase('Reduce')

const reduction = await agent(`You are a Fable seat producing the REDUCTION PROPOSAL for the glass-ui
component library at ${REPO}.

The inferred graph analysis:

${inference}

Standing owner edicts that BIND this proposal:
- NO legacy code. Clean breaks: no aliases, no migration shims, no dual paths, no masking fallbacks.
- "Consumer dependence never preserves an obsolete API; delete/shift on merit, the consumer updates via a
  marked addendum in ITS tranche." A single external consumer does NOT save a component.
- Extreme parsimony, KISS-forward, fewer lines of code.
- The library's OWN default tokens evolve as its identity changes; named themed presets live in consumers.
- Every src/ artefact must have >= 2 sites OR be exported-and-earned OR be a named private demo helper.

The owner has ALREADY ruled on several of these in their own feedback (treat as decided, do not re-ask):
- instrument-chassis and metric: "to be REMOVED — what of our grand pruning of overfit and superfluous components?"
- completion-seal: "seems greatly overfit and likely belongs only in speedtest"
- deck vs carousel: "likely should be collapsed"
- timeline: "very poorly defined, buggy, and likely many facilities overfit? Redesign from the ground up."
- confirm-dialog: "how is this any different from a normal dialog"
- the whole compositions section: "likely to be pruned"
- /motion/tempo: "what even is" it
- /motion/reveal and /motion/scroll: "what is this vs our other scrolling components"
- DataTable: keep and thin as the distinct interactive grid owner (later owner ruling).
- HandMark: keep, but greenfield and perfect from first principles.

Produce THE REDUCTION TABLE. One row per component, every one of the ~62 accounted for, no silent drops.
Columns: component · LOC · verdict (KEEP / KEEP-THIN / FOLD-INTO-X / DEMOTE-TO-DEMO / DELETE / GREENFIELD) ·
the rationale in one sentence · what breaks and who must update · the LOC delta you expect.

Then state:
- The total LOC the reduction removes, and the resulting component count.
- The SHARED PRIMITIVES the folds create (name each, state its API in 3 lines, name its consumers).
- The order the folds must happen in, and why — which folds unblock which.
- Anything you could NOT decide, and the exact fact that would decide it. Keep this list as close to empty
  as the evidence permits; the owner's standing order is "no deferrals".

Return thorough markdown with your exact modelId.`,
  { model: 'fable', label: 'dag:reduce', phase: 'Reduce' })

phase('Critique')

const critiques = await parallel([
  () => agent(`You are an ADVERSARIAL Fable critic. Default assumption: the proposal below is WRONG, and it is
its author's job to have convinced you. Repository: ${REPO}.

THE REDUCTION PROPOSAL:
${reduction}

Attack it on CORRECTNESS OF FACT. Go to the source and verify:
- Does each component the proposal deletes actually have the usage profile claimed? Run ripgrep. Check
  package.json exports. Check demo/ and src/ separately.
- Does each proposed FOLD actually work? For each "fold A into B", read A and B and find the capability of A
  that B cannot express. If you find one, the fold is wrong as stated.
- Are the claimed isomorphisms real, or do they collapse distinct state machines? A slider and a progress bar
  look alike and are not: one is an input with a pointer contract and keyboard semantics, the other is a
  readout. Test every class this way.
- Does any deletion break a documented public API without a stated migration?
Report each defect with file:line or command output. Do not report style opinions. Return markdown with
your exact modelId.`, { model: 'fable', label: 'crit:fact', phase: 'Critique' }),

  () => agent(`You are an ADVERSARIAL Fable critic. Default assumption: the proposal below is WRONG.
Repository: ${REPO}.

THE REDUCTION PROPOSAL:
${reduction}

Attack it on DESIGN AND STRATEGY, not facts:
- Does the reduction make the library BETTER, or merely smaller? Name any fold that saves lines while making
  the API harder to use or the design language weaker.
- Does it preserve what makes this library distinctive? The owner's core is "glass, animation, procedural
  animation... into a perfected union" and a standing BREATH OF LIFE edict (every component always displays
  engagement) plus MOVEMENT OF MOMENTUM (inertia, weight, liquid quality in all motion). A reduction that
  deletes the very substrates that make it distinctive has failed even if the arithmetic is right.
- Conversely: does it protect anything out of sentiment? The five procedural giants are 50% of component
  code (aurora 9205, dock 8046, blob 6028, constellation 2993, fourier-field 2950) and several have almost
  no consumers. Apply the owner's own bar to them, hard.
- Is the ORDER right? Does any fold land before the primitive it needs?
- Is anything deferred that the owner's standing "no deferrals" order forbids?
- The owner has just ruled the DOCK API "likely fully contrived and should be replaced" — does the proposal
  reckon with that, or does it thin around the edges of an 8046-LOC component that needs replacing?
Return markdown with your exact modelId.`, { model: 'fable', label: 'crit:design', phase: 'Critique' }),
])

const judge = await agent(`You are the Fable JUDGE. Rule on the reduction proposal against two adversarial
critiques, and emit the TERMINAL reduction table.

PROPOSAL:
${reduction}

CRITIQUE A (fact):
${critiques[0]}

CRITIQUE B (design/strategy):
${critiques[1]}

Rule on every finding: SUSTAINED (the proposal changes) / OVERRULED (with the reason) / PARTIAL (state the
amendment). Then emit the corrected terminal table: one row per component, all ~62, with verdict, rationale,
breakage, LOC delta.

Then state the CONVERGENCE HONESTLY as a percentage with the exact enumerated open gaps. Do not round up.
An open gap is a row where the evidence does not yet decide the verdict; name the fact that would decide it
and who can produce it. The owner's standing order is "no deferrals", so an open gap must be small and
justified, not a parking lot.

Return thorough markdown with your exact modelId.`,
  { model: 'fable', label: 'dag:judge', phase: 'Critique' })

return { nodes: nodes.length, inference, reduction, critiques, judge }
