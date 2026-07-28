export const meta = {
  name: 'novelties-brainstorm-union-thrice',
  description: 'Fable brainstorm/prototyping → union with extant novelties → thrice critical pass → adjudicated NOVELTIES.md',
  phases: [
    { title: 'Census', detail: 'Opus — the extant novelty roster', model: 'opus' },
    { title: 'Brainstorm', detail: 'Fable — two prototyping seats via the frontend design plugin', model: 'fable' },
    { title: 'Union', detail: 'Fable — new ∪ extant, one roster', model: 'fable' },
    { title: 'Thrice', detail: 'three diverse-lens critical passes', model: 'opus' },
    { title: 'Apotheosis', detail: 'Fable — the adjudicated NOVELTIES.md', model: 'fable' },
  ],
}

const REF = 'docs/tranches/BJ/addenda/2026-07-24-refinement'
const IOS = '/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/ios27'
const CANON = `Repo /Users/mkbabb/Programming/glass-ui, tranche BJ→BK, 2026-07-28. State your modelId.
Author no repo byte — text is the deliverable. Em dashes without spaces. THE LAWS, always: BREATH OF
LIFE (every component always displays engagement) · GOAL OF GLASS (frosted, transmissive, warm cream —
never shiny/trite; the FROST-TABS-REAUDIT diagnosis is canon) · MOVEMENT OF MOMENTUM (all motion carries
inertia/weight/liquid quality) · SURVEY SAFARI and MODERN WEB DESIGN with PERFORMANT PENCHANT only
(safari-app is the common denominator; no chrome-special glass; no filter:url() in motion) · our own
design language (warm cream, deft rounding, our palettes, our springs) — we best iOS27, never copy it ·
KISS, no contrivance. EXEMPLAR SOURCE: read ${REF}/EXEMPLARS-CODEX.md if it exists on disk (the
adjudicated codex); else the two interim arms at ${IOS}/codex-arm-fable.md + ${IOS}/codex-arm-opus.md
(adjudication pending — treat contested cells with incredulity).`

phase('Census')
const census = await agent(`${CANON}

CENSUS — the EXTANT novelty roster, banausic and exact. Enumerate every novelty the library or its
terminal corpus already carries — shipped OR spec'd OR ruled-BUILD. Known members to verify and price
(then find what I missed): the goo worm (pager-dots lead/trail) · handmark (greenfield) · blob moods +
the physics charter (fission/satellites) · aurora mediums (van-Gogh/oil-pastel/crayon) + interactivity ·
the vaporize/dissolve row · the eyeglass/loupe tabs default · the siri-orb mark · squircle corner-shape ·
liquid-fill/press physics · specular tracking · drawer snap physics · dock morph/fission · gradient-blur
focus (F50) · scroll-to-shrink · the rainbow hairline · view-transition usage · dot-matrix color mark.
Per row: name · state (LIVE at HEAD file:line / SPEC'D at file§ / RULED-BUILD citation) · the breath/
momentum mechanism it carries · one-line health verdict. Facts only.`,
  { label: 'census', phase: 'Census', model: 'opus', effort: 'high' })

phase('Brainstorm')
const BS = (angle) => `${CANON}

BRAINSTORM + PROTOTYPE SEAT (Fable) — angle: ${angle}. The owner's order: a brainstorming and
prototyping session FIRST; novelty derived "in our aristotelian proportion in the abstract" — novel
affordances that BEST iOS27. Ground in the exemplar codex (the marks are your raw material — the
double-dock choreography, continuous-timeline expansions, the loupe, vaporize, the SMOOTH-not-sharp
popover, dot-matrix transitions, the siri drawer momentum) and the census below. DESIGN AUTHORING LAW:
load the frontend design plugin via ToolSearch (query "select:DesignSync" or "+design") and use it for
prototyping if available in this seat; if absent, say so plainly and author as structured design text —
never fake tool output. Emit 6-10 candidate novelties: name · thesis (one sentence) · the choreography/
mechanism (which channel leads, the spring, the stagger) · GOAL-OF-GLASS fit · Safari feasibility
(named CSS/API, no chrome-special) · perf price (compositor-only? layout cost?) · target component ·
a concrete prototype sketch (the CSS/composable shape, not full code). Reject your own weak ideas
before emitting.

CENSUS:
${census || '(census died — proceed from the codex alone, say so)'}`

const [bMotion, bMaterial] = await parallel([
  () => agent(BS('MOTION & CHOREOGRAPHY — dock composition (double-dock, fission/fusion), continuous-timeline expansion, windowing transitions, vaporize, the popover spring family, drawer momentum'), { label: 'brainstorm:motion', phase: 'Brainstorm', model: 'fable', effort: 'xhigh' }),
  () => agent(BS('MATERIAL & OPTICS — the loupe distortion, gradient-blur focus, frost-led glass novelty, dot-matrix color transitions, specular/ink choreography, notification corner-affordances'), { label: 'brainstorm:material', phase: 'Brainstorm', model: 'fable', effort: 'xhigh' }),
])

phase('Union')
const union = await agent(`${CANON}

UNION SEAT (Fable) — merge the brainstormed candidates with the extant census into ONE novelty roster.
Dedupe (a new idea that is an extant row's refinement AMENDS that row, never duplicates); every row:
name · NEW/EXTANT/EXTANT-AMENDED · thesis · mechanism · laws-fit (breath/glass/momentum, one line each) ·
Safari+perf verdict · target component/wave (cite ${REF}/TERMINAL-ROSTER.md ids where owned; NEW-ROW
where not). No row dropped from either source without a stated reason.

CENSUS:\n${census || '(died)'}
\nBRAINSTORM MOTION:\n${bMotion || '(died)'}
\nBRAINSTORM MATERIAL:\n${bMaterial || '(died)'}`,
  { label: 'union', phase: 'Union', model: 'fable', effort: 'xhigh' })
if (!union) throw new Error('union died — inputs are in the journal')

phase('Thrice')
const LENSES = [
  { key: 'laws', p: 'LENS 1 — LAWS FIDELITY: attack every row against BREATH OF LIFE, GOAL OF GLASS, MOVEMENT OF MOMENTUM as MEASURED laws (the suffusion matrix, the frost diagnosis, the motion canon). A novelty that decorates without engaging, shines without frosting, or moves without weight is refuted. Cite the law row each verdict rests on.' },
  { key: 'feasibility', p: 'LENS 2 — SAFARI + PERFORMANCE: attack every row on safari-app feasibility (named API support, no chrome-special glass, the SIGABRT/color-mix and filter:url() records) and performance (compositor-only or priced; the aurora demand-gate lesson: an always-on cost is a defect). A novelty that cannot ship on Safari at 60fps is refuted or re-scoped.' },
  { key: 'contrivance', p: 'LENS 3 — KISS + CONTRIVANCE: attack every row as the overfitting auditor — does it earn ≥2 sites or a public seat, does it duplicate an extant mechanism under a new name, is it novelty for novelty’s sake, does it survive the prune edicts? The archaeology’s lesson: five dock rebuilds each on a fresh premise — a novelty without an acceptance instrument is refuted.' },
]
const critiques = await parallel(LENSES.map(l => () =>
  agent(`${CANON}\n\nCRITICAL PASS — ${l.p}\n\nTHE ROSTER:\n${union}`, { label: `critique:${l.key}`, phase: 'Thrice', model: 'opus', effort: 'xhigh' })
    .then(out => (out ? { key: l.key, out } : null))))

phase('Apotheosis')
const good = critiques.filter(Boolean)
const final = await agent(`${CANON}

APOTHEOSIS (Fable) — adjudicate the thrice-critiqued roster with sagacity and INCREDULITY: reproduce
contested claims (a critic citing a law row or a Safari support fact gets spot-checked; a critic minting
a fact gets refuted); RULE per row — BUILD (with target wave + born-RED acceptance instrument, the
paint-lesson honored: every novelty closes on a picture) / EXPERIMENT (the blob-charter class: a bounded
experiment with its falsifier stated) / AMEND-EXTANT (the delta at the owning spec) / REJECT (to
§REJECTED with the killing critique). Never average. Emit the final NOVELTIES.md body: §1 the ruled
roster · §2 routed deltas (per roster wave) · §3 §REJECTED with falsifiers.

ROSTER:\n${union}
${good.map(c => `\n===== CRITIQUE ${c.key} =====\n${c.out}`).join('')}`,
  { label: 'apotheosis', phase: 'Apotheosis', model: 'fable', effort: 'xhigh' })

return { final }
