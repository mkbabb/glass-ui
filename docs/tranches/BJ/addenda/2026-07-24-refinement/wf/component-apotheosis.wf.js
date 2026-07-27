export const meta = {
  name: 'bk-component-apotheosis',
  description: 'Per-component: 3 hostile challengers -> 3-juror triumvirate -> foreman re-authors the wave spec',
  phases: [
    { title: 'Challenge', detail: '3 challengers assume design/structure/implementation are flawed', model: 'opus' },
    { title: 'Jury', detail: '3 jurors adjudicate independently', model: 'opus' },
    { title: 'Foreman', detail: 'terminal wave spec', model: 'opus' },
  ],
}

const REPO = '/Users/mkbabb/Programming/glass-ui'
const AUDIT = '/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/audit'

const comp = (args && args.component) || 'button'
const routes = (args && args.routes) || []
const facts = (args && args.facts) || ''

const slug = r => (r === '/' ? 'root' : r.replace(/^\//, '').replace(/\//g, '__'))
const shots = routes.flatMap(r => [
  `${AUDIT}/chromium-desktop/${slug(r)}.jpeg`,
  `${AUDIT}/chromium-mobile/${slug(r)}.jpeg`,
  `${AUDIT}/webkit-desktop/${slug(r)}.jpeg`,
  `${AUDIT}/webkit-mobile/${slug(r)}.jpeg`,
])

const CHALLENGE = {
  type: 'object',
  required: ['modelId', 'bench', 'verdict', 'defects', 'whatIsGood'],
  properties: {
    modelId: { type: 'string' },
    bench: { type: 'string' },
    verdict: { type: 'string', enum: ['SOUND', 'FLAWED', 'REPLACE'] },
    whatIsGood: { type: 'string', description: 'what actually works — state it honestly, a hostile critic is not a dishonest one' },
    defects: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'claim', 'evidence', 'severity', 'remedy'],
        properties: {
          id: { type: 'string' },
          claim: { type: 'string' },
          evidence: { type: 'string', description: 'file:line, computed style, screenshot path + what is visible in it, or a command and its output' },
          severity: { type: 'string', enum: ['S0', 'S1', 'S2', 'S3'] },
          remedy: { type: 'string', description: 'the concrete change, at the grain an implementer could execute' },
        },
      },
    },
  },
}

const BASE = `
Repository: ${REPO} — a Vue 3.5 + Tailwind v4 "liquid glass" component library, version 7.0.0 live on npm.
SUBJECT COMPONENT: ${comp}  (source at src/components/${comp}/)
ITS DEMO ROUTES: ${routes.join(', ') || '(none)'}

PHASE: tranche development only. You MUST NOT edit, create, or delete any file. Read and run read-only
commands. Screenshots you may read are listed below.

VISUAL EVIDENCE (Chromium + WebKit, desktop 1440x900 + iPhone 15 Pro), read these with the Read tool:
${shots.join('\n') || '(no routes)'}
A capture index with per-route console errors, canvas state, horizontal-overflow flags and blank-tile
detection is at ${AUDIT}/index.json — grep it for this component's routes.

STANDING OWNER EDICTS (these are law, not preference):
- BREATH OF LIFE: every interactive component always displays engagement; affordances read as alive.
- MOVEMENT OF MOMENTUM / liquid weight: all motion carries inertia, weight, bounce; no mechanical ticks,
  no fade-only defaults. SMOOTH, not sharp.
- GOAL OF GLASS: blurred and FROSTED, never trite, shiny or bright. The owner has explicitly said our tabs
  and slider glass are "far too trite, shiny, and bright — not like blurred and frosted glass."
- NO chrome-special behaviour for any glass item. No masking fallbacks: the primary works in paint or fails
  loud. Modern CSS on target engines, not legacy ladders.
- NO legacy code: no aliases, no migration shims, no dual paths.
- Extreme parsimony, KISS-forward, fewer lines. Aristotelian proportion in margins, padding, dividers,
  hierarchy, and small UI.
- Consumer dependence never preserves an obsolete API; one consumer is not enough to save a component.
- Safari/WebKit is a first-class target. Mobile is first-class, not an afterthought.

MEASURED FACTS ABOUT THIS REPOSITORY (verified by the lead — trust these):
- 86,899 src lines; 58,549 of them are components. 34.4% of src is comment.
- 1,095 test cases across 217 files against a mandate of 40-60 invariant gates.
- npm test is RED at HEAD.
- The published package hard-requires a peer it declares optional, and its type surface is empty under
  moduleResolution node16/nodenext.
${facts}

Your evidence bar: every defect names a file:line, a computed style, a screenshot and what is visible in it,
or a command and its output. No vague claims, no "consider adding tests", no style preferences dressed as
defects. A hostile critic is still an honest one: say plainly what is good.

Return through StructuredOutput with your exact modelId.
`

phase('Challenge')

const challenges = await parallel([
  () => agent(`${BASE}

YOUR BENCH: **THE DESIGN IS FLAWED.** Assume it. Your job is to prove it, and only to concede if the
evidence defeats you.

Interrogate: proportion and hierarchy (is the visual weight where the meaning is?); margins, padding,
dividers, and whether any of them are arbitrary; the glass material — is it frosted or is it shiny;
rounding — does its radius express its role (card-like, field-like, pill) or is it a raw literal; the
engagement ladder — what does rest, hover, press, and engaged actually look like, and is any rung
missing or lifeless; motion — what moves, on what curve, and does it carry weight or tick mechanically;
colour and contrast in both light and dark; the mobile frame specifically — reach, clipping, dock
occlusion, target size.

Compare the Chromium and WebKit captures against each other. A component that looks different across
engines is a defect unless the difference is a deliberate, documented, owner-sanctioned choice.

Name what a genuinely better version would look like, concretely.`,
    { model: 'opus', label: `${comp}:design`, phase: 'Challenge', schema: CHALLENGE }),

  () => agent(`${BASE}

YOUR BENCH: **THE LIBRARY IS IMPROPERLY STRUCTURED AROUND THIS COMPONENT.** Assume it.

Interrogate: does this component belong in the library at all — count its real consumers with ripgrep
across src/ and demo/, and check package.json exports; is its public API earned, or is it a pile of props
(count them, and find the ones with no demo and no consumer); is it a duplicate or a partial duplicate of
another component — test it against the isomorphism classes (track-and-thumb, disclosure,
overlay-with-anchor, dismissible-layer, paged-sequence, scroll-observer, procedural-substrate, readout);
is it colocated per the standing edict (sub-components, composables, constants, styles beside it, not
scattered into global composables/ or styles/); does it re-implement something a shared primitive already
owns; does it leak internals through its barrel; are there re-export shims, aliases, or dead exports on
its subpath; is its CSS reachable — remember reachability has TWO mechanisms, the @import closure from
src/styles/index.css AND SFC <style src="./styles.css">, and a claim that models only one is wrong.

State whether the component should be KEPT, KEPT-AND-THINNED, FOLDED into a named sibling, DEMOTED to a
demo-private helper, DELETED, or GREENFIELDED — and what breaks if so.`,
    { model: 'opus', label: `${comp}:structure`, phase: 'Challenge', schema: CHALLENGE }),

  () => agent(`${BASE}

YOUR BENCH: **THE IMPLEMENTATION IS WRONG.** Assume it.

Interrogate: correctness — read every line and find the bugs, the unhandled states, the races, the stale
closures, the listeners without teardown, the module-global state that breaks in a second Document;
accessibility — keyboard operability for every mouse affordance, focus trap and restore, :focus-visible,
ARIA that tells the truth, live regions, reduced-motion arm, coarse-pointer target size (44px);
performance — rAF loops and whether they stop when hidden, ResizeObserver/IntersectionObserver teardown,
layout thrash (getBoundingClientRect inside a write loop), work in setup() that belongs in onMounted,
eager imports of heavy substrates; engine parity — does anything branch on the engine, and does the
WebKit path paint the same picture as the Chromium path (a primary that degrades below its own fallback
is a defect, not a graceful one); tests — read this component's tests and say which assertions could
never fail, and which real invariants have no gate at all.

Run what you can: npx vitest run on this component's test files, and report the actual output.
Read the capture index for this component's routes and report any console errors.`,
    { model: 'opus', label: `${comp}:impl`, phase: 'Challenge', schema: CHALLENGE }),
])

phase('Jury')

const cj = JSON.stringify(challenges.filter(Boolean), null, 1)

const JURY = `You are a juror on the triumvirate adjudicating the component **${comp}** in ${REPO}.

Three hostile challengers were instructed to assume the component is flawed. Their findings:

${cj}

Your duty is NOT to agree with them. Rule on each defect: SUSTAINED / OVERRULED / PARTIAL, each with the
reason and, where you sustain, the corrected remedy. Verify independently — go to the source and to the
screenshots yourself. A challenger who overreached must be overruled explicitly; a challenger who found a
real defect but prescribed the wrong cure must be corrected, not merely sustained.

Then state, in your own judgement: the component's TERMINAL DISPOSITION
(KEEP / KEEP-THIN / FOLD-INTO-<x> / DEMOTE-TO-DEMO / DELETE / GREENFIELD) and the single most important
change it needs.

Be decisive. The owner's standing order is no deferrals.`

const jurors = await parallel([
  () => agent(`${JURY}\n\nYOUR SEAT: the DESIGN bench. You weigh most heavily whether the result is
beautiful, proportionate, alive, and unmistakably ours — warm cream, deft rounding, frosted glass. A
component that is technically correct and visually dead has failed.`,
    { model: 'opus', label: `${comp}:juror-design`, phase: 'Jury' }),
  () => agent(`${JURY}\n\nYOUR SEAT: the ARCHITECTURE bench. You weigh most heavily whether the library is
smaller, clearer, and more coherent afterwards. You are the one who says "this should not exist" when that
is true, and "this fold destroys a real capability" when that is true.`,
    { model: 'opus', label: `${comp}:juror-arch`, phase: 'Jury' }),
  () => agent(`${JURY}\n\nYOUR SEAT: the EVIDENCE bench. You weigh most heavily whether each claim is
actually proven. You overrule anything asserted without a file:line, a computed value, a screenshot
observation, or a command output — however plausible it sounds. You are the defence against a fleet that
converges on a satisfying story.`,
    { model: 'opus', label: `${comp}:juror-evidence`, phase: 'Jury' }),
])

phase('Foreman')

const spec = await agent(`You are the FOREMAN of the triumvirate for the component **${comp}** in ${REPO}.

THE CHALLENGES:
${cj}

THE THREE JURORS' RULINGS:
--- DESIGN BENCH ---
${jurors[0] || '(failed)'}
--- ARCHITECTURE BENCH ---
${jurors[1] || '(failed)'}
--- EVIDENCE BENCH ---
${jurors[2] || '(failed)'}

Emit the TERMINAL WAVE SPEC for ${comp}. Exactly this shape, in markdown, and nothing else:

## W-${comp.toUpperCase()} — <one-line title>

**Disposition:** KEEP | KEEP-THIN | FOLD-INTO-<x> | DEMOTE-TO-DEMO | DELETE | GREENFIELD
**Jury:** <where the three benches agreed, and where they split — name the split and how you broke it>
**LOC now → expected:** <n> → <n>

### Defects this wave closes
A table: id · defect · evidence (file:line / computed value / screenshot) · severity.
Only SUSTAINED defects. Overruled ones go in a short §Overruled list with the reason, so they cannot
be re-raised by a later round.

### The change
Prose, tight, at the grain an Opus implementation seat executes without asking a question. Name the exact
files, the exact props added or removed, the exact tokens, the exact selectors.

### Born-RED gates
Each gate: its id, the assertion, the **exact RED-at-HEAD condition with a file:line or a computed value**,
and the mutation that proves the gate can fail. A gate that would pass at HEAD is not born-RED and must be
rewritten or dropped. Do not invent gates for the sake of coverage — the owner has mandated 40-60 invariant
gates total across the whole library, so this component gets at most one or two, and only if it guards a
real product invariant.

### π / DELTA obligations
Every visual claim names a paired before/after capture: route, engine, viewport. Chromium AND WebKit,
desktop AND mobile where the claim is visual.

### Breakage
What this breaks for consumers, and the migration line for each.

### Open
Anything the evidence does not decide, and the exact fact that would decide it. Keep this as close to
empty as honesty permits.

Be concrete and short. Do not restate the challenges. Do not write process narrative.`,
  { model: 'opus', label: `${comp}:FOREMAN`, phase: 'Foreman' })

return { component: comp, challenges, jurors, spec }
