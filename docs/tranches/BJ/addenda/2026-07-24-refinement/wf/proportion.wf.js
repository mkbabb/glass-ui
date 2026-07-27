export const meta = {
  name: 'proportion-and-visual-state',
  description: 'Aristotelian proportion + full visual state matrix: cards, margins, paddings, dividers, small UI; superfluous elements to strike and insufficient affordance to add',
  phases: [
    { title: 'Measure', detail: 'computed geometry across the surface' },
    { title: 'Challenge', detail: 'three benches per category' },
    { title: 'Adjudicate', detail: 'jury per category' },
    { title: 'Fold', detail: 'the terminal proportion ruling' },
  ],
}

const M = 'opus'   // owner ruling: all agents Opus 5
const REPO = '/Users/mkbabb/Programming/glass-ui'
const REF = `${REPO}/docs/tranches/BJ/addenda/2026-07-24-refinement`
const AUDIT = '/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/audit'
const PREVIEW = 'http://localhost:4188'

const CATEGORIES = [
  { id: 'display', why: 'cards, surfaces, atoms, badges — the plate vocabulary everything else sits on',
    routes: ['/display/card', '/display/surface', '/display/atoms', '/display/badge', '/display/buttons'] },
  { id: 'forms', why: 'the control surfaces the owner named for glass, and the densest proportion problem',
    routes: ['/forms/inputs', '/forms/slider', '/forms/checks', '/forms/toggle', '/forms/chip', '/forms/labeled-field', '/forms/number-field'] },
  { id: 'containers', why: 'overlays and disclosure — where padding, radius and divider decisions compound',
    routes: ['/containers/dialog', '/containers/popover', '/containers/accordion', '/containers/sheet', '/containers/drawer', '/containers/tooltip', '/containers/command'] },
  { id: 'data-feedback', why: 'tables, metrics, alerts, toasts — the readout vocabulary',
    routes: ['/data/table', '/data/data-table', '/data/metric', '/data/timeline', '/feedback/alert', '/feedback/toast', '/feedback/progress', '/feedback/skeleton'] },
  { id: 'navigation-dock', why: 'tabs, pager, carousel and the dock — selection and travel chrome',
    routes: ['/navigation/tabs', '/navigation/pager-dots', '/navigation/carousel', '/dock/overview', '/dock/rail', '/dock/controls'] },
  { id: 'foundations', why: 'the token specimens themselves — if proportion is wrong here it is wrong everywhere',
    routes: ['/foundations/typography', '/foundations/radii', '/foundations/shadows', '/foundations/colors', '/foundations/paper-glass', '/foundations/surface-tints'] },
]

const slug = r => (r === '/' ? 'root' : r.replace(/^\//, '').replace(/\//g, '__'))

const COMMON = `
Repository: ${REPO} — Vue 3.5 + Tailwind v4 liquid-glass component library, 7.0.0 live on npm.
PHASE: tranche development only. READ-ONLY on the repo. You MUST NOT edit, create or delete any repo file.

**READ FIRST — law for this seat:**
  ${REF}/ANALYSIS-SPEC.md   dimensions D1-D12; **D12 (proportion) and D2 (visuals) are yours**
  ${REF}/EXEC-STATE.md      what is already measured — DO NOT RE-MEASURE IT
  ${REF}/IOS27-ARCHIVE.md   the photometric target and the two dismiss grammars
  ${REF}/MOTION-CANON.md    the engagement ladder and the material split law

A BUILT DEMO IS SERVING AT ${PREVIEW} — drive it. Static captures (Chromium desktop 1440x900 and
iPhone 15 Pro) are at ${AUDIT}/chromium-desktop/<slug>.jpeg and ${AUDIT}/chromium-mobile/<slug>.jpeg
where <slug> is the route with leading slash dropped and '/' replaced by '__'.

**SAFARI IS NOT AVAILABLE.** safaridriver reports "You must enable 'Allow remote automation' in the
Developer section of Safari Settings", verified this session. **No Safari/WebKit result is admissible.**
Record the cell as OWED. Do not infer a WebKit result from Chromium. (Separately: the demo crashes
Playwright-WebKit 5/5 on mount, a threshold effect on the color-mix() custom-property population — that is
already diagnosed and is not your subject.)

THE STANDING AESTHETIC LAW:
- **Aristotelian proportion.** Proportion is a RATIO question, not a token question: is this divider
  carrying its weight against the gap beside it; is this padding in the same series as its siblings; does
  the radius express the ROLE (card / field / pill / control) rather than a literal.
- **Warm cream, deft rounding, frosted glass.** Ours, not iOS's, not shadcn's.
- **Frost, measured:** mean luminance -2%, sigma 80% KEPT, high-frequency detail 10% kept, saturation +62%.
  Near-zero veil + heavy blur + strong saturate. LEAD-MEASURED DEFECT: \`.segmented-tabs\` and
  \`.glass-track-well\` compute \`backdrop-filter: none\` — ~50% cream veils with NO blur, and tabs carries
  white inset specular at 0.30 alpha. That is the mechanism of "trite, shiny, and bright".
- **BREATH OF LIFE is a FLOOR, not a loop.** Engagement at rest = material response to the pointer field,
  truthful state reporting, a <=1-frame answer to state change. NO decorative idle animation on a control.
- **De-shadcn-ification:** where does this still read as a shadcn/reka port rather than as ours?

**BOTH DIRECTIONS ARE MANDATORY. An audit that only subtracts is half an audit.**
- **SUPERFLUOUS** — duplicative, distracting, or decorative without carrying meaning. Mark for removal.
- **INSUFFICIENT** — a state with no signal, an action with no invitation, a boundary with no edge. Mark
  for ADDITION.

EVIDENCE BAR: a computed value read from the live page, or a screenshot and what is visible in it. "Feels
cramped" is not a finding; "the divider is 1px at 0.08 alpha against a 24px gap, while its sibling group
uses 16px" is.
`

phase('Measure')

const measured = await pipeline(
  CATEGORIES,

  (c) => agent(`${COMMON}
YOUR CATEGORY: **${c.id}** — ${c.why}
ROUTES: ${c.routes.join(', ')}
Captures: ${c.routes.map(r => `${AUDIT}/chromium-desktop/${slug(r)}.jpeg`).join('  ')}

YOUR TASK: **measure the geometry.** This is a measurement seat — collect, do not judge.

Drive ${PREVIEW} with the browser tools. For each route, harvest computed values for the plate and its
parts: \`padding\`, \`gap\`, \`margin\`, \`border-radius\`, \`border-width\`/\`border-color\`,
\`backdrop-filter\`, \`background-color\`, \`box-shadow\`, \`font-size\`, \`line-height\`, and the rendered
box size. Include dividers/separators/rules explicitly, and every small UI element (icon buttons, chips,
dots, badges, close affordances).

Then report:
- **THE SERIES.** What padding values actually occur, sorted with counts. Same for gap, radius, and border
  alpha. A design system should show a short series; a long tail is the finding.
- **OFF-SERIES VALUES** — every value that is not in the dominant series, with its selector.
- **RATIOS** — for each plate: padding : gap : radius, and divider weight : adjacent gap.
- **STATE COVERAGE** — for each interactive element, which of rest/hover/press/focus-visible/disabled
  actually produce a computed difference. An element with no hover delta is a finding for a later bench.
- Read the desktop and mobile captures and note what is visibly different between them.

Terse tables of numbers. No verdicts.`,
    { model: M, label: `${c.id}:measure`, phase: 'Measure' })
      .then(m => ({ c, m })),

  ({ c, m }) => parallel([
    () => agent(`${COMMON}
CATEGORY **${c.id}**. MEASURED GEOMETRY:
${m}

YOUR BENCH: **THE PROPORTIONS ARE WRONG.** Assume the ratios are arbitrary.

Interrogate the numbers above. Is the padding series a series, or a scatter? Does radius express role, or
is it a literal that drifted? Is the divider carrying weight proportional to the separation it asserts, or
is it a hairline pretending to structure? Do siblings share a series? Is the mobile frame a proportional
transposition of the desktop one, or a squeeze?

Name the CORRECTED RATIO for each defect — the actual number, not "tighten this". Aristotelian proportion
means the parts stand in a stated relation to the whole; state the relation.`,
      { model: M, label: `${c.id}:proportion`, phase: 'Challenge' }),

    () => agent(`${COMMON}
CATEGORY **${c.id}**. MEASURED GEOMETRY:
${m}

YOUR BENCH: **THERE IS TOO MUCH HERE.** Assume elements are superfluous, duplicative, or distracting.

Hunt: decorative elements carrying no meaning; a divider where a gap already separates; a border AND a
shadow AND a tint all asserting the same edge; icon+label where the label suffices; a badge restating what
the heading says; nested cards; a specular rim on a surface that is not glass; hover states on
non-interactive elements; two affordances for one action.

For each: what is removed, and what carries the meaning afterwards. **Removal must not orphan a signal** —
if the element is the only carrier of a state, it is not superfluous, it is misdesigned, and that belongs
to the other bench.`,
      { model: M, label: `${c.id}:superfluous`, phase: 'Challenge' }),

    () => agent(`${COMMON}
CATEGORY **${c.id}**. MEASURED GEOMETRY:
${m}

YOUR BENCH: **THERE IS TOO LITTLE HERE.** Assume affordance is MISSING. This bench exists because an audit
that only subtracts is half an audit, and it is the one most often skipped.

Hunt: a state with no visual signal (check the state-coverage table — any element with no hover, press, or
focus-visible delta); an action with no invitation; a boundary with no edge; a scrollable region with no
overflow evidence; a disabled control indistinguishable from an enabled one; an empty state that is merely
blank; a destructive action with the same weight as a benign one; a glass surface with
\`backdrop-filter: none\` (there are known instances); a control whose engagement floor is dead — BREATH
OF LIFE requires a non-zero material response at rest, and a control with none has failed.

For each: what is ADDED, on which channel, at what magnitude, and on what curve. Be specific and be
parsimonious — the cure for missing affordance is rarely another element; it is usually a state on an
element already present.`,
      { model: M, label: `${c.id}:insufficient`, phase: 'Challenge' }),
  ]).then(ch => ({ c, m, ch: ch.filter(Boolean) })),

  ({ c, m, ch }) => agent(`${COMMON}
CATEGORY **${c.id}**. You are the ADJUDICATOR.

MEASURED GEOMETRY:
${m}

--- BENCH: PROPORTIONS ARE WRONG ---
${ch[0] || '(failed)'}
--- BENCH: TOO MUCH ---
${ch[1] || '(failed)'}
--- BENCH: TOO LITTLE ---
${ch[2] || '(failed)'}

The subtract and add benches will collide. Resolve with evidence, never by splitting the difference.

Emit the TERMINAL RULING for this category:

1. **THE SERIES** this category should use — padding, gap, radius, divider weight — as explicit values,
   with the role each expresses.
2. **STRIKE TABLE** — element · route · why superfluous · what carries the meaning afterwards.
3. **ADD TABLE** — element/state · route · what is missing · the channel, magnitude and curve.
4. **RE-PROPORTION TABLE** — selector · current value · target value · the ratio it now satisfies.
5. **GLASS DEFECTS** — any surface with \`backdrop-filter: none\`, any white specular above 0.12 alpha,
   any engine-conditional arm.
6. **DE-SHADCN NOTES** — where this category still reads as a port.
7. **pi/DELTA obligations** — route, engine, viewport per visual claim. WebKit cells: OWED, Safari
   unavailable.

Be laconic. Every row carries a number.`,
    { model: M, label: `${c.id}:ADJUDICATE`, phase: 'Adjudicate' })
      .then(r => ({ category: c.id, ruling: r })),
)

phase('Fold')

const ok = measured.filter(Boolean)
const fold = await agent(`${COMMON}

Category rulings (${ok.length}):
${ok.map(r => `\n===== ${r.category} =====\n${r.ruling}`).join('\n')}

Emit **THE PROPORTION SETTLEMENT** for the whole surface:

1. **THE CANONICAL SERIES** — one padding series, one gap series, one radius-by-role table, one divider
   weight, for the entire library. Where categories disagreed, rule and say why. This is the deliverable:
   a designer should be able to lay out a new component from this table alone.
2. **THE CONSOLIDATED STRIKE LIST** — everything superfluous, deduplicated across categories, with the
   total element count removed.
3. **THE CONSOLIDATED ADD LIST** — everything insufficient. **If this list is much shorter than the strike
   list, say so explicitly and defend it** — a library that is only ever over-decorated and never
   under-afforded is an unlikely finding and suggests the add bench was under-weighted.
4. **RADIUS BY ROLE** — the terminal table, since radius-as-literal is a standing defect (Alert rounds at
   10px against a 16px card canon).
5. **GLASS DEFECT ROLL-UP** — every surface computing \`backdrop-filter: none\`, every white specular.
6. **WHAT THIS COSTS** — tokens added, tokens deleted, components touched. Net token count must not grow
   without justification.
7. **OWED** — every WebKit/Safari cell, listed, so the obligation is explicit rather than forgotten.

Declare your exact modelId. Exhaustive on coverage, terse in prose. Every row carries a number.`,
  { model: M, label: 'PROPORTION:fold', phase: 'Fold' })

return { categories: ok.length, fold }
