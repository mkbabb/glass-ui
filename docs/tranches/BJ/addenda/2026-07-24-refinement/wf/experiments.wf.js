export const meta = {
  name: 'novelty-experiments-now',
  description: 'Seventh-Ecoute stage-2: prototype the two buildable EXPERIMENT rows (38 dilating grasp · 40 honest loupe) NOW; grain (31) ruled acceptance-arithmetic',
  phases: [
    { title: 'Build', detail: 'Opus — working prototypes in the scratchpad', model: 'opus' },
    { title: 'Measure', detail: 'one serialized browser seat over both prototypes', model: 'opus' },
    { title: 'Verdict', detail: 'Fable — results vs falsifiers → EXPERIMENTS.md', model: 'fable' },
  ],
}

const REF = 'docs/tranches/BJ/addenda/2026-07-24-refinement'
const X = '/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/experiments'
const CANON = `Repo /Users/mkbabb/Programming/glass-ui, 2026-07-28, Seventh-Ecoute stage-2. State your
modelId. Repo bytes: NONE — prototypes live under ${X}/<lane>/ only. Consume FIRST:
${REF}/NOVELTIES.md rows 38 + 40 + §0 X-A/X-B/X-C/X-G (the ruled bounded forms — build EXACTLY those,
no re-design: the design phase is CLOSED) · ${REF}/EXEMPLARS-CODEX.md LAW 9/13/14 + A6 ·
${REF}/MOTION-CANON.md (named springs; the anchored-materialization row) · FROST-TABS-REAUDIT §2 (the
frost recipe the prototypes must fake forward: frost-led, ink-veiled, dims-not-lifts). Em dashes
without spaces.`

phase('Build')
const [grasp, loupe] = await parallel([
  () => agent(`${CANON}

BUILD — ROW 38, THE DILATING GRASP. A standalone prototype at ${X}/grasp/index.html (self-contained:
inline CSS/JS, a busy structured backdrop — gradient+noise canvas, σ≈50 class — under ONE glass
surface). The ruled mechanism exactly: at grasp-begin a DISCRETE rung step — veil DOWN + blur UP +
gain UP (more transparent, more blurred, maximum transmission) — implemented as an opacity-crossfade
between two static backdrop-filter rungs (X-G: never animate a filter value); release on a ~180ms
envelope; one surface at a time; PRM seats instantly. Also author the measurement harness INTO the
page: a button-driven scripted grasp cycle + an on-page readout (computed styles both states,
crossfade timing, rAF frame-time histogram during the cycle). Return: file list + the exact
verification steps a browser seat runs.`,
    { label: 'build:grasp', phase: 'Build', model: 'opus', effort: 'high' }),
  () => agent(`${CANON}

BUILD — ROW 40, THE HONEST LOUPE (the magnification arm of the lens-organ family, precision-scrub
consumer only). A standalone prototype at ${X}/loupe/index.html (self-contained): a slider/scrub track
with fine tick content; on drag, a promoted composited CLONE of the track content magnifies under a
lens rim (housing carries the material per LAW 14; the clone carries NO rung — content is never
frosted); magnification k through a ~100ms smoothing envelope, INVERSE with drag |v| via tanh; raise on
the anchored-materialization spring (0.22, ζ1.00), zero bounce; exit ≈0.5× entry; composited transform
only, never layout re-scale; clip layer outside any glass stack. Harness in-page: scripted drag
sweeps at 3 speeds + readouts (point-under-finger centering error px, content blur→sharp resolve time,
rAF histogram). Return: file list + verification steps.`,
    { label: 'build:loupe', phase: 'Build', model: 'opus', effort: 'high' }),
])

phase('Measure')
const measured = await agent(`${CANON}

MEASURE — you are a browser-owning seat and the singleton law binds: a concurrent design-now blob seat
MAY hold the Chrome MCP. Load chrome-devtools MCP via ToolSearch; FIRST call list_pages — if you see
pages you did not open that look actively driven (blob prototypes, dev-server tabs changing), DO NOT
proceed: return exactly "BROWSER-HELD — measurement OWED-SERIALIZED" plus a dry-run review of both
prototypes' code (read the files; verify mechanism fidelity to the ruled forms statically). Otherwise:
open file://${X}/grasp/index.html then file://${X}/loupe/index.html, run each harness, and bank per
prototype: screenshots (rest/engaged; the loupe at 3 drag speeds), the on-page readouts verbatim, the
frame-time histograms, and the verdict inputs the falsifiers name (grasp: monotone-dilution read +
crossfade honesty + fps; loupe: centering error, blur→sharp ≈120ms, ≤1 dropped frame per 100).

GRASP BUILD:\n${grasp || '(builder died)'}
\nLOUPE BUILD:\n${loupe || '(builder died)'}`,
  { label: 'measure', phase: 'Measure', model: 'opus', effort: 'high' })

phase('Verdict')
const verdict = await agent(`${CANON}

VERDICT — EXPERIMENTS.md body. Per experiment: the ruled falsifier from NOVELTIES.md quoted · the
measured result · the ruling: SPEC-CONFIRMED (the constants measured here enter the owning wave's spec
— name them: the grasp rung pair, the loupe k-band and tanh constant) / RE-SCOPED (what changes) /
DIES (the falsifier fired — LAW 9's dilution stays confined to the album-morph timeline for 38; the
lens-organ family loses the magnification arm for 40). Row 31 (grain) is recorded as
ACCEPTANCE-ARITHMETIC, legal per the Seventh Ecoute (d) — construction pre-constrained, decided at
#22's first two-mode paired capture, NOT prototypable against today's dead frost (the ruling, stated).
If the measure seat returned OWED-SERIALIZED: the prototypes + static fidelity review are banked, the
capture cell is SEQUENCED (owner: the lead; trigger: design-now close frees the browser) — named
exactly so, per the no-incomplete-work protocol. The device-cell (Safari-app fps) rows stay OWED to
#67's device matrix either way — say so.

MEASURE:\n${measured || '(measure seat died — verdict from builds alone, captures SEQUENCED)'}`,
  { label: 'verdict', phase: 'Verdict', model: 'fable', effort: 'xhigh' })

return { verdict }
