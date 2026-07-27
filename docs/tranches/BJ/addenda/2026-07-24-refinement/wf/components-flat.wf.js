export const meta = {
  name: 'bk-components-flat',
  description: 'Per-component triumvirate, flattened: 3 hostile challengers -> 3 jurors -> foreman wave spec, pipelined per component',
  phases: [
    { title: 'Challenge', detail: '3 challengers per component: design / structure / implementation' },
    { title: 'Jury', detail: '3 jurors adjudicate per component' },
    { title: 'Foreman', detail: 'terminal wave spec per component' },
    { title: 'Band fold', detail: 'cross-component reconciliation' },
  ],
}

// Model routing per the owner's standing split, re-asserted 2026-07-24:
// design / audit / critique / reason / brainstorm / DAG -> Fable.  synthesis + fanout mechanics -> Opus.
const M_CRITIC = 'fable'   // the three challenger benches
const M_JUROR = 'fable'    // the triumvirate
const M_FOREMAN = 'opus'   // terminal spec authoring
const M_FOLD = 'opus'      // cross-component reconciliation

const REPO = '/Users/mkbabb/Programming/glass-ui'
const AUDIT = '/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/audit'
// args may arrive as an object OR as a JSON-encoded string; tolerate both.
const RAW = typeof args === 'string' ? JSON.parse(args) : args
const TIER = (RAW && RAW.tier) || []
if (!TIER.length) throw new Error('TIER is empty — args did not carry a component list; nothing to audit.')
log(`fleet: ${TIER.length} components x (3 challengers + 3 jurors + foreman) = ${TIER.length * 7 + 1} seats`)

const CHALLENGE = {
  type: 'object',
  required: ['modelId', 'bench', 'verdict', 'defects', 'whatIsGood'],
  properties: {
    modelId: { type: 'string' },
    bench: { type: 'string' },
    verdict: { type: 'string', enum: ['SOUND', 'FLAWED', 'REPLACE'] },
    whatIsGood: { type: 'string' },
    defects: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'claim', 'evidence', 'severity', 'remedy'],
        properties: {
          id: { type: 'string' }, claim: { type: 'string' },
          evidence: { type: 'string', description: 'file:line, computed style, screenshot path + what is visible, or a command and its output' },
          severity: { type: 'string', enum: ['S0', 'S1', 'S2', 'S3'] },
          remedy: { type: 'string' },
        },
      },
    },
  },
}

const slug = r => (r === '/' ? 'root' : r.replace(/^\//, '').replace(/\//g, '__'))

function base(c) {
  const shots = (c.routes || []).flatMap(r => [
    `${AUDIT}/chromium-desktop/${slug(r)}.jpeg`,
    `${AUDIT}/chromium-mobile/${slug(r)}.jpeg`,
  ])
  return `
Repository: ${REPO} — Vue 3.5 + Tailwind v4 "liquid glass" component library, 7.0.0 live on npm.
SUBJECT COMPONENT: ${c.component}   (source: src/components/${c.component}/)
ITS DEMO ROUTES: ${(c.routes || []).join(', ') || '(none)'}

PHASE: tranche development only. You MUST NOT edit, create, or delete any file. Read-only investigation
plus read-only commands.

VISUAL EVIDENCE — read these with the Read tool (Chromium desktop 1440x900 and iPhone 15 Pro):
${shots.join('\n') || '(no routes)'}
Capture index with per-route console errors, canvas state and overflow flags: ${AUDIT}/index.json
NOTE: the WebKit cells of the matrix are ABSENT because the demo crashes WebKit deterministically on every
route (a separate S0). Do not claim any WebKit/Safari result; where an engine difference matters, say so
and mark it owed.

STANDING OWNER EDICTS (law, not preference):
- BREATH OF LIFE: every interactive component always displays engagement.
- MOVEMENT OF MOMENTUM / liquid weight: inertia, weight, bounce appropriate to the job. SMOOTH, not sharp.
- GOAL OF GLASS: blurred and FROSTED. The owner: our tabs and slider glass are "far too trite, shiny, and
  bright - not like blurred and frosted glass."
- NO chrome-special behaviour for any glass item. No masking fallbacks: the primary works in paint or fails
  loud. A primary that paints worse than its own fallback is a defect.
- NO legacy code: no aliases, no shims, no dual paths.
- Extreme parsimony, KISS-forward. Aristotelian proportion in margins, padding, dividers, hierarchy.
- Consumer dependence never preserves an obsolete API; ONE consumer never saves a component.
- Safari/WebKit and mobile are first-class.

MEASURED FACTS (lead-verified at HEAD; trust these over any figure you may infer):
- src 80,117 non-blank lines, of which 31,539 are COMMENT (39.4%). components 52,932 non-blank / 18,018
  comment (34.0%). dock 51.7% comment. src/styles/tokens 72.8% comment. Any LOC-based argument MUST
  normalise for comment share - ranking by raw LOC is a known defect of the prior analysis.
- 61 components, 56,217 LOC. 33 of them (35,328 LOC, 63% of the tree) have ZERO src consumers.
- npm test is RED at HEAD, and release.yml:48 runs it immediately before npm publish at :50.
- The published package hard-requires a peer it declares optional; its type surface is empty under node16.
- The governed gate battery exists only in the working tree; HEAD has none.
- The demo crashes WebKit 5/5 on every route, dev and bundled, blocked by disabling CSS, in one 318KB sheet.
- src/composables/glass/ is a 4,740-LOC SHARED substrate (webgpu/ alone is 1,228) and all four procedural
  fields already compose it. Do not propose building what is built.

MEASURED FROST TARGET (photometric, from the iOS Maps detent sheet over a live map) - the operational
definition of "blurred and frosted" vs "trite, shiny, bright": mean luminance -2%, standard deviation 80%
KEPT, high-frequency detail 10% kept, saturation +62%. i.e. near-zero veil + heavy blur + strong saturate.
Ours is a milky veil (color-mix(--card, transparent) at high opacity). NOTE our blur RADIUS is not the
defect - --glass-blur-quiet-radius: 7px sits inside the measured iOS band. The veil opacity and the absent
saturate arm are the defect. There is an OPEN CONTRADICTION on saturate direction (the motion canon argues
saturate DOWN on cream; this measurement argues UP); if your component is implicated, report which way the
evidence points rather than assuming.
${c.facts || ''}

EVIDENCE BAR: every defect names a file:line, a computed style, a screenshot and what is visible in it, or
a command and its output. No vague claims, no "consider adding tests", no style preference dressed as a
defect. A hostile critic is still an honest one: say plainly what is good.

Return through StructuredOutput with your exact modelId.
`
}

phase('Challenge')

const results = await pipeline(
  TIER,

  // stage 1 — three hostile challengers
  (c) => parallel([
    () => agent(`${base(c)}

YOUR BENCH: **THE DESIGN IS FLAWED.** Assume it; concede only if the evidence defeats you.

Interrogate: proportion and hierarchy — is the visual weight where the meaning is? Margins, padding and
dividers — is any of it arbitrary? The glass material — frosted, or shiny? Rounding — does the radius
express the role (card / field / pill / control) or is it a raw literal? The engagement ladder — what do
rest, hover, press and engaged actually look like, and which rung is missing or lifeless? Motion — what
moves, on what curve, and does it carry weight or tick mechanically? Colour and contrast in light and dark.
The mobile frame specifically — reach, clipping, dock occlusion, target size.

Read the desktop and mobile captures and say what is actually visible in each. Name what a genuinely
better version looks like, concretely.`, { model: M_CRITIC, label: `${c.component}:design`, phase: 'Challenge', schema: CHALLENGE }),

    () => agent(`${base(c)}

YOUR BENCH: **THE LIBRARY IS IMPROPERLY STRUCTURED AROUND THIS COMPONENT.** Assume it.

Interrogate: does it belong in the library at all — count real consumers with ripgrep across src/ and
demo/ separately, and check package.json exports. Is its public API earned, or a pile of props (count them;
find the ones with no demo and no consumer)? Is it a duplicate or partial duplicate — test it against the
isomorphism classes: track-and-thumb, disclosure, overlay-with-anchor, dismissible-layer, paged-sequence,
scroll-observer, procedural-substrate, readout. Is it colocated per the standing edict (sub-components,
composables, constants, styles beside it)? Does it re-implement what a shared primitive already owns? Does
it leak internals through its barrel? Re-export shims, aliases, dead exports on its subpath? Is its CSS
reachable — reachability has TWO mechanisms, the @import closure from src/styles/index.css AND SFC
<style src="./styles.css">; a claim modelling only one is wrong.

State: KEEP / KEEP-THIN / FOLD-INTO-<x> / DEMOTE-TO-DEMO / DELETE / GREENFIELD, and what breaks.`,
      { model: M_CRITIC, label: `${c.component}:structure`, phase: 'Challenge', schema: CHALLENGE }),

    () => agent(`${base(c)}

YOUR BENCH: **THE IMPLEMENTATION IS WRONG.** Assume it.

Interrogate: correctness — read every line; find bugs, unhandled states, races, stale closures, listeners
without teardown, module-global state that breaks in a second Document. Accessibility — keyboard
operability for every mouse affordance, focus trap and restore, :focus-visible, ARIA that tells the truth,
live regions, reduced-motion arm, 44px coarse target size. Performance — rAF loops and whether they stop
when hidden, observer teardown, layout thrash (getBoundingClientRect inside a write loop), work in setup()
that belongs in onMounted, eager imports of heavy substrates. Tests — read this component's tests and say
which assertions could never fail and which real invariants have no gate.

RUN what you can: npx vitest run on this component's test files, and report the ACTUAL output. Grep the
capture index for this component's routes and report console errors.`,
      { model: M_CRITIC, label: `${c.component}:impl`, phase: 'Challenge', schema: CHALLENGE }),
  ]).then(challenges => ({ c, challenges: challenges.filter(Boolean) })),

  // stage 2 — three jurors
  ({ c, challenges }) => {
    const cj = JSON.stringify(challenges, null, 1)
    const JURY = `You are a juror on the triumvirate adjudicating **${c.component}** in ${REPO}.

Three hostile challengers were told to assume the component is flawed. Their findings:

${cj}

Your duty is NOT to agree with them. Rule on each defect: SUSTAINED / OVERRULED / PARTIAL, with the reason,
and where you sustain, the corrected remedy. Verify independently — go to the source and the screenshots
yourself. A challenger who overreached is overruled explicitly; one who found a real defect but prescribed
the wrong cure is corrected, not merely sustained.

Then give the component's TERMINAL DISPOSITION (KEEP / KEEP-THIN / FOLD-INTO-<x> / DEMOTE-TO-DEMO /
DELETE / GREENFIELD) and the single most important change it needs. Be decisive: no deferrals.`
    return parallel([
      () => agent(`${JURY}\n\nYOUR SEAT: the DESIGN bench. You weigh most heavily whether the result is
beautiful, proportionate, alive, and unmistakably ours — warm cream, deft rounding, frosted glass. A
component that is technically correct and visually dead has failed.`,
        { model: M_JUROR, label: `${c.component}:juror-design`, phase: 'Jury' }),
      () => agent(`${JURY}\n\nYOUR SEAT: the ARCHITECTURE bench. You weigh most heavily whether the library
is smaller, clearer and more coherent afterwards. You say "this should not exist" when that is true, and
"this fold destroys a real capability" when that is true.`,
        { model: M_JUROR, label: `${c.component}:juror-arch`, phase: 'Jury' }),
      () => agent(`${JURY}\n\nYOUR SEAT: the EVIDENCE bench. You weigh most heavily whether each claim is
proven. Overrule anything asserted without a file:line, a computed value, a screenshot observation or a
command output — however plausible. You are the defence against a fleet converging on a satisfying story.`,
        { model: M_JUROR, label: `${c.component}:juror-evidence`, phase: 'Jury' }),
    ]).then(jurors => ({ c, challenges, jurors: jurors.filter(Boolean) }))
  },

  // stage 3 — foreman
  ({ c, challenges, jurors }) => agent(`You are the FOREMAN of the triumvirate for **${c.component}** in ${REPO}.

CHALLENGES:
${JSON.stringify(challenges, null, 1)}

JURORS:
--- DESIGN BENCH ---
${jurors[0] || '(failed)'}
--- ARCHITECTURE BENCH ---
${jurors[1] || '(failed)'}
--- EVIDENCE BENCH ---
${jurors[2] || '(failed)'}

Emit the TERMINAL WAVE SPEC. Exactly this shape, in markdown, nothing else:

## W-${String(c.component).toUpperCase()} — <one-line title>

**Disposition:** KEEP | KEEP-THIN | FOLD-INTO-<x> | DEMOTE-TO-DEMO | DELETE | GREENFIELD
**Jury:** <where the benches agreed; where they split, and how you broke it>
**LOC now → expected:** <n> → <n>

### Defects this wave closes
Table: id · defect · evidence (file:line / computed value / screenshot) · severity. SUSTAINED only.
Overruled ones go in a short §Overruled list with the reason, so a later round cannot re-raise them.

### The change
Tight prose at the grain an implementer executes without asking a question. Exact files, exact props added
or removed, exact tokens, exact selectors.

### Born-RED gates
Each: id, assertion, the **exact RED-at-HEAD condition with a file:line or computed value**, and the
mutation proving it can fail. A gate that would PASS at HEAD is not born-RED — rewrite or drop it. The
whole library's budget is 40-60 gates, so this component gets AT MOST one or two, and only for a real
product invariant.

### π / DELTA obligations
Every visual claim names a paired before/after capture: route, engine, viewport. WebKit cells are owed but
currently blocked — say so rather than claiming them.

### Breakage
What breaks for consumers, and the migration line for each.

### Open
What the evidence does not decide, and the exact fact that would decide it. As close to empty as honesty permits.

Be concrete and short. Do not restate the challenges. No process narrative.`,
    { model: M_FOREMAN, label: `${c.component}:FOREMAN`, phase: 'Foreman' })
      .then(spec => ({ component: c.component, spec })),
)

phase('Band fold')

const ok = results.filter(r => r && r.spec)
const failed = TIER.map(t => t.component).filter(n => !ok.find(o => o.component === n))
if (failed.length) log(`COVERAGE GAP: no spec for ${failed.join(', ')}`)

const fold = await agent(`You are the band-fold seat for the glass-ui refinement at ${REPO}.

${ok.length} per-component triumvirates emitted terminal wave specs:

${ok.map(s => `\n===== ${s.component} =====\n${s.spec}`).join('\n')}

${failed.length ? `\nCOVERAGE GAP — no spec produced for: ${failed.join(', ')}. Report this, do not paper over it.` : ''}

Produce the BAND RECONCILIATION — the cross-cutting truth no single jury could see:

1. **COLLISIONS.** Where two specs claim the same file, token, selector or shared primitive and would
   conflict if executed independently. Rule each: which wave owns the file, what the other consumes instead.
   One owning wave per file per cut.
2. **DUPLICATED REMEDIES.** Where N specs independently invent the same fix. Promote it once as a named
   SHARED PRIMITIVE with a 3-line API and a consumer list; strike the N copies. Check FIRST whether the
   primitive already exists on disk — re-inventing something already landed is the more likely error.
3. **CONTRADICTIONS.** Incompatible dispositions (A folds into B while B folds into A; A deleted while B
   depends on it). Rule each.
4. **DEPENDENCY ORDER.** Strict topological order with the reason for each edge.
5. **GATE BUDGET.** Sum every proposed born-RED gate. The mandate is 40-60 for the WHOLE library and there
   are currently 1,095 test cases. Cut to the invariants that guard real product behaviour; say what you cut.
6. **LOC LEDGER.** Sum the expected deltas against the 57,657-line component tree. If the band grows the
   tree, justify it or re-cut.
7. **WHAT NO JURY OWNED.** Anything in the evidence no spec claimed. Silent drops are forbidden — assign an owner.
8. **FALSE PREMISES.** Any claim you can show is wrong at HEAD, including ones inherited from the briefing
   you were given. Verify against source; a jury that inherited a wrong fact propagated it.

Return thorough markdown with your exact modelId. Be decisive; no deferrals.`,
  { model: M_FOLD, label: 'BAND:fold', phase: 'Band fold' })

return { specs: ok, fold, coverage: { requested: TIER.length, returned: ok.length, failed } }
