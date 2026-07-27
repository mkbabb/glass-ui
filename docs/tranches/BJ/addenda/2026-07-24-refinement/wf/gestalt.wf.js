export const meta = {
  name: 'gestalt-contrivance-audit',
  description: 'Root contrivance out of the addenda AND the library: shadcn abrogation, suffusion matrix, perf, design-canon — tri-fold gestalt verdict',
  phases: [
    { title: 'Sweep', detail: 'six Opus lenses — static, no browser (Chrome is owned by tier-3)', model: 'opus' },
    { title: 'Verdict', detail: 'Fable ∥ Opus gestalt arms', model: 'fable' },
    { title: 'Apotheosis', detail: 'Fable adjudicator → GESTALT.md body', model: 'fable' },
  ],
}

const REF = 'docs/tranches/BJ/addenda/2026-07-24-refinement'
const CANON = `Repo /Users/mkbabb/Programming/glass-ui, HEAD 26a41fe3, tranche BJ, TRANCHE DEVELOPMENT —
author no repo byte; your text is the deliverable. State your modelId. NO BROWSER — the Chrome seat is
owned by a concurrent run; use static reads, banked π artefacts (screenshots/paired-π under docs/tranches/
BJ/**), and computed reasoning; mark anything that truly needs paint as OWED-LIVE. Consume FIRST:
\`${REF}/EXEC-STATE.md\` (standing rulings), \`${REF}/PROPORTION.md\`, \`${REF}/MOTION-CANON.md\`.
Sibling repos READ-ONLY. Edicts: distillation into an apotheosis · full shadcn abrogation (components AND
style) · consolidate or prune unused/overfit/contrived · KISS, colocation, modularization · clean breaks,
no legacy, no masking fallbacks · GOLDEN GLASS (the aesthetic) · BREATH OF LIFE (every component always
displays engagement) · MOVEMENT OF MOMENTUM (all motion carries inertia/weight/bounce/liquid quality).
Dense rows, file:line, em dashes without spaces.`

const SWEEPS = [
  { key: 'shadcn', p: `SWEEP — SHADCN ABROGATION CENSUS. The edict: full abrogation of shadcn idiom in components AND style. Hunt the residue at HEAD: variant/cva-style class-map APIs, slot-forwarding wrapper shells that exist only to mirror a reka primitive 1:1, tailwind-preset default palettes/radii that fight the token system, prop names and component boundaries inherited from the shadcn catalogue rather than derived from this library's own physics, "ui/" catalogue shapes, copy-paste story structures. Per find: file:line | the shadcn ancestor | what the glass-native replacement IS (one line — derived from golden glass/breath/momentum, not renamed). End with the ABROGATION ROSTER ranked by how load-bearing the residue is.` },
  { key: 'contrive-addenda', p: `SWEEP — CONTRIVANCE IN THE WAVE ADDENDA. Target: the BJ corpus — \`${REF}/\` (all terminal specs, WAVES.md, RECONCILIATION.md, DAG-RULINGS.md) + docs/tranches/BJ/waves/ + addenda/. Hunt: waves that exist for process not the library, gates that cannot fail or gate nothing a user sees, specs solving problems no owner row ever raised, duplicated derived data that critics re-litigate, over-specified minutiae that violate KISS, deferred-forever rows. Per find: file§ | the contrivance | STRIKE or SIMPLIFY-TO (one line). Do NOT strike anything an owner verbatim demands — check docs/tranches/BJ/FEEDBACK-LEDGER.md before each verdict.` },
  { key: 'contrive-library', p: `SWEEP — CONTRIVANCE + OVERFIT IN THE LIBRARY. Target: src/ + demo at HEAD. Hunt: components/composables/utilities with <2 real call sites that are not exported public surface (run the census yourself), components overfit to one demo page, prop surfaces wider than any consumer uses, dead exports, parallel implementations of one idea, config knobs nothing sets. For every DELETE/CONSOLIDATE candidate run the FRESH CROSS-REPO consumer grep (~/Programming/{slides,value.js,keyframes.js,sci-report,fourier-analysis} READ-ONLY — the src-only census is wrong in kind; report per-repo hit counts). Per find: file | sites (src/demo/cross-repo) | verdict DELETE / CONSOLIDATE-INTO / KEEP (why). End with the PRUNE ROSTER.` },
  { key: 'design-canon', p: `SWEEP — THE DESIGN CANON. Census every design-law document at HEAD (MOTION-CANON, PROPORTION, ECOUTE, any DESIGN*.md, docs/ aesthetic material, token-layer comments that legislate). Questions: do the docs express GOLDEN GLASS / BREATH OF LIFE / MOVEMENT OF MOMENTUM as first-class laws, or do those live only in tranche folklore? Are there contradictions between documents (cite pairs)? Is there ONE canonical design MD a new contributor could read, or fragments? VERDICT: does the design MD need re-authoring — if yes, emit the outline (sections, sources to fold, contradictions to resolve) as a wave-ready brief; if no, prove coverage.` },
  { key: 'suffusion', p: `SWEEP — THE SUFFUSION MATRIX. For EVERY component in src/ (all ~62) and every procedural substrate: does it carry BREATH OF LIFE (an always-on engagement affordance — idle motion, hover life, focus glow — cite the file:line of the mechanism) and MOVEMENT OF MOMENTUM (spring/inertia-carried transitions — named spring preset, not a bare CSS ease; cite)? Matrix: component | breath: LIVE/INERT (mechanism or "none") | momentum: LIVE (preset name) / EASE-ONLY (the offending transition) / NONE | already-owned-by (which terminal spec, if any — check ${REF}/COMPONENT-WAVES-TERMINAL*.md). The deliverable is the INERT LIST ranked: which components are dead objects, and which of those have NO terminal spec claiming them.` },
  { key: 'perf', p: `SWEEP — PERFORMANCE. Static + banked only. (a) Bundle: build the library (npm run build is allowed — it writes dist/, not src/) and report per-entry sizes vs 7.0.0 published; the heaviest modules. (b) Runtime hazards by read: unthrottled listeners, per-frame allocation in the procedural substrates, watchers on deep objects, backdrop-filter over-stacking (the 188/305 none-census row), layout-thrash patterns (read/write interleave). (c) Banked live evidence: any FPS/trace/paired-π artefacts under docs/tranches/ — cite what exists, note staleness. (d) The OWED-LIVE cell list: exactly which measurements need a browser (name the page + metric) for the later live pass. Per find: file:line | hazard | cost class | fix shape.` },
]

phase('Sweep')
const sweeps = await parallel(SWEEPS.map(s => () =>
  agent(`${CANON}\n\n${s.p}`, { label: `sweep:${s.key}`, phase: 'Sweep', model: 'opus', effort: 'high' })
    .then(out => (out ? { key: s.key, out } : null))))
const good = sweeps.filter(Boolean)
log(`${good.length}/6 sweeps returned`)

phase('Verdict')
const VERDICT = `${CANON}

THE GESTALT VERDICT — audit the library in totality, as one made thing. Inputs: the six sweeps below +
your own reads. Author: §1 WHAT THE LIBRARY IS at HEAD — its actual identity vs the intended apotheosis
(golden glass, breath of life, movement of momentum), stated plainly; where it is ALREADY excellent
(name the exemplars — the standard other components are held to). §2 THE DISTILLATION SHAPE — what the
library reduces INTO: the component set after the prune roster, the style system after shadcn abrogation,
the motion system after suffusion; a target census (N components, N substrates, N docs) with the
reduction from today's census. §3 THE CONTRIVANCE ROSTER UNIFIED — addenda strikes + library prunes +
abrogation targets, deduped, dependency-ordered, each with its one-line ground. §4 ROUTED DELTAS — what
this changes in the terminal specs / TERMINAL-ROSTER (route, don't re-author). §5 OWED-LIVE — the
consolidated list for the later browser pass. Every claim cites a sweep row or a file:line you verified.

${'${SWEEPS_BODY}'}`

const body = good.map(s => `\n===== SWEEP ${s.key} =====\n${s.out}`).join('\n')
const verdictPrompt = VERDICT.replace('${SWEEPS_BODY}', () => body)
const [vOpus, vFable] = await parallel([
  () => agent(verdictPrompt, { label: 'verdict:opus', phase: 'Verdict', model: 'opus', effort: 'xhigh' }),
  () => agent(verdictPrompt, { label: 'verdict:fable', phase: 'Verdict', model: 'fable', effort: 'xhigh' }),
])

phase('Apotheosis')
const arms = [vFable, vOpus].filter(Boolean)
if (!arms.length) throw new Error('both verdict arms died — sweeps are in the journal; salvage')
const final = arms.length === 1 ? arms[0] : await agent(`${CANON}

TRI-FOLD ADJUDICATOR — two independent gestalt verdicts from the same six sweeps. Agglomerate with
sagacity and INCREDULITY: spot-check contested census numbers and prune verdicts on disk; reproduce
disagreements and RULE, never average; a component one arm prunes and the other keeps gets a disk-read
and a ruling with the evidence. Losers to §REJECTED with falsifiers. Emit the final GESTALT.md body.

===== FABLE =====
${vFable}

===== OPUS =====
${vOpus}`, { label: 'apotheosis', phase: 'Apotheosis', model: 'fable', effort: 'xhigh' })

return { final }
