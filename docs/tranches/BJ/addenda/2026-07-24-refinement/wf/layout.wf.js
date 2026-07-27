export const meta = {
  name: 'layout-ecoute-trifold',
  description: 'Mobile+desktop layout audit and design: one layout where befitting, optimized variants otherwise, modern facilities only — tri-fold',
  phases: [
    { title: 'Measure', detail: 'live viewport census (serialized browser) + static mechanism census', model: 'opus' },
    { title: 'Design', detail: 'Fable arm ∥ Opus arm design the layout doctrine', model: 'opus' },
    { title: 'Adjudicate', detail: 'Fable agglomerates into the apotheosis', model: 'fable' },
    { title: 'Challenge', detail: 'taste bench (Fable) + build bench (Opus)', model: 'opus' },
    { title: 'Terminal', detail: 'Fable foreman authors the terminal LAYOUT spec', model: 'fable' },
  ],
}

const REF = 'docs/tranches/BJ/addenda/2026-07-24-refinement'

const CANON = `You are working in glass-ui at /Users/mkbabb/Programming/glass-ui (HEAD bce78c3e, tranche BJ,
phase = TRANCHE DEVELOPMENT ONLY — read, measure, design; author NO source/test/config byte; commit
nothing; never touch a sibling repo).

## THE OWNER RULING THIS WORKFLOW EXISTS TO SERVE (Ecoute-moi 2026-07-25)
"On all pages, the mobile variants must better take up space, the full width (handling pathologically
wide screens) and height; bespoke and optimized for mobile. Without contrivance or extra complexity:
audit for, and design, an elegant mobile AND desktop solution: use ONE layout where befitting, and a
perfectly optimized desktop AND mobile variant when otherwise. Use only the most modern layout
facilities within web design."

Read that as law: (1) mobile is not shrunken desktop — it earns its own use of width and height;
(2) "pathologically wide" cuts BOTH ways — ultra-wide desktop (2560+) must not become a prose ribbon in
a desert, and wide/landscape phones (~932×430) must not get the portrait layout; (3) the DEFAULT answer
is ONE fluid layout (container-driven, intrinsically responsive) — a forked mobile/desktop variant must
JUSTIFY itself per page-class, never per page; (4) modern facilities only: container queries,
\`dvh/svh/lvh\`, grid \`auto-fit/auto-fill + minmax()\`, \`subgrid\`, \`clamp()\`, logical properties,
\`:has()\`, \`text-wrap: balance/pretty\` — no JS resize listeners, no breakpoint soup, no duplicated DOM
trees; (5) NO CONTRIVANCE — if the cure adds more machinery than the disease, it is wrong; deleting
bespoke per-page layout in favour of chassis-level doctrine is the preferred move.

## SETTLED INPUTS — consume, never re-derive
- \`${REF}/PROPORTION.md\` — the canonical series (space 4·8·12·20·32·52) and THE MOBILE LAW: ≤768px every
  space rung steps down exactly one; \`--ui-scale\` moves the control box only; type keeps its own clamp.
  Its measured indictment: 21 distinct paddings / 18 gaps shipped; SEVEN transposition factors on one
  page; mobile hierarchy collapsing section into family (24:24:12). Any value you mint outside the
  series must be derived from a stated law, named.
- \`${REF}/DIRECTORY-SHAPE.md\` — the demo shell lives at \`demo/shell/\` (9 files) + \`demo/chassis/\` (9
  subdirs); stories under \`demo/stories/<category>/\`. The shell scroller is \`main.demo-main-scroller\`.
- Known live layout defects: the blob story's mood-chip rail clips mid-word AT DESKTOP 1440
  (\`button.tap-squish\` right edge 1618px in a 1440 viewport) and its Interaction panel occludes the
  stage canvas; the mobile fixed dock occludes content on at least three stories (Tabs vertical section,
  Search size fields, TagsInput validation region — the steer-12 finding); real Safari 26.4 shows NO
  horizontal overflow at 402px across 8 sampled routes (the baseline to preserve).
- \`W-RESPONSIVE-AUDIT\` already landed (\`1be91765\`, F14 + a sortable-list 2-up cure) — read its diff
  first; this ruling SUPERSEDES its scope, do not re-do what it did.
- The story meta-framework ask (FEEDBACK-LEDGER A06): page variants per story TYPE (category landing,
  component story, configurator studio, substrate/canvas page…) — the page-CLASS, not the page, is the
  unit at which "one layout vs two variants" is decided.

## HARD RULES
- **Browser singleton:** chrome-devtools MCP page state is global. Only the seat explicitly designated
  the browser owner may drive Chrome, and it works SERIALLY. Every other seat is static/read-only.
- Never \`getContext()\` on a live WebGPU canvas — screenshot-only observation.
- Playwright-webkit is NOT Safari; real Safari via \`scripts/safari-probe.mjs\` if needed.
- Never author \`backdrop-filter\` followed by \`-webkit-backdrop-filter\` (the prefix trap).
- State your exact modelId in your output. Be pithy: dense tables, file:line, measured numbers, em
  dashes without spaces. Demo servers: localhost:4188 (built) · localhost:5199 (dev).`

phase('Measure')

const [census, mechanism] = await parallel([
  // The ONE browser-owning seat — serialized inside itself.
  () => agent(`${CANON}

---

You are the LIVE CENSUS seat — the ONLY seat driving Chrome. Work serially, one viewport at a time.

ROUTE SAMPLE (~24): "/" + the 11 category landings + these flagged stories:
/substrates/blob, /substrates/aurora, /navigation/tabs, /data/search, /data/tags-input,
/data/sortable-list, /motion/curve-gallery, /forms/slider, /containers/dialog, /dock/overview,
/feedback/alert, /data/timeline. (Pull the exact route list from the demo router source first; correct
any path that does not exist rather than skipping it.)

VIEWPORTS, in this order: 390×844 · 402×874 · 430×932 · 932×430 (landscape phone — the pathological
mobile width) · 768×1024 · 1440×900 · 1920×1080 · 2560×1200 (pathological desktop).

Per route × viewport, via ONE evaluate_script batch (cheap numbers, not screenshots): document
scrollWidth vs clientWidth (overflow px); the main content column's used width vs viewport (gutter waste
%, i.e. how much width the page LEAVES EMPTY); first-viewport height utilisation (how much of the first
dvh is content vs chrome vs dead space); whether the fixed dock overlaps any focusable/content element
(elementFromPoint along the dock band); the widest element that exceeds the viewport (selector + px);
count of horizontal scrollers inside the page. Screenshot ONLY the 10 worst cells you find, named
\`layout-<route>-<w>.png\` in the scratchpad.

Also run scripts/safari-probe.mjs once at 402 and 932 widths for the Safari overflow cell
(pkill -f safaridriver first).

RETURN: the full numeric matrix (route × viewport → {overflowPx, gutterWaste%, heightUse%,
dockOcclusion, worstSelector}), the 10 worst cells ranked, and per-CATEGORY patterns (which page-CLASS
wastes width, which wastes height, which forks layouts already). Numbers, not adjectives.`,
    { label: 'measure:census', phase: 'Measure', model: 'opus', effort: 'high' }),

  // Static — no browser.
  () => agent(`${CANON}

---

You are the MECHANISM CENSUS seat — STATIC ONLY, no browser.

Map how layout is actually built today, so the design seats know what they are replacing:
1. **The chassis:** read demo/shell/* and demo/chassis/* in full. What layout mechanism does each layer
   use (grid? flex? fixed max-w? absolute?)? Where are the width clamps, the gutters, the scroller, the
   dock seat? Which values are on the canonical series and which are minted?
2. **The breakpoint census:** grep the entire demo/ + src/ for responsive machinery — \`@media\` queries
   (count, distinct breakpoints, what each forks), \`@container\` queries (any?), \`dvh/svh/vh\` usage,
   \`clamp()\` usage, grid auto-fit/minmax, subgrid, \`:has()\`, JS resize/matchMedia listeners, duplicated
   mobile/desktop DOM trees (v-if on width). Produce the counts and the distinct-breakpoint list.
3. **Per page-class:** classify every demo/stories/<category> page into the A06 page classes (category
   landing / component story / configurator studio / substrate canvas / data grid / composition) and
   state which class already shares a chassis layout vs hand-rolls its own. Name the hand-rollers.
4. **The transposition audit:** against PROPORTION.md's mobile law, list where the code disobeys —
   values that scale by ad-hoc factors instead of stepping the series down one rung.

RETURN: the mechanism map, the breakpoint census with counts, the page-class table, the disobedience
list. This is the demolition survey — precise about what exists, silent about what should.`,
    { label: 'measure:mechanism', phase: 'Measure', model: 'opus', effort: 'high' }),
])

if (!census && !mechanism) throw new Error('both measure seats died — nothing to design from')
const EVIDENCE = `## LIVE CENSUS (browser seat)\n${census || 'SEAT DIED — design from mechanism census + settled inputs only; say so.'}\n\n## MECHANISM CENSUS (static seat)\n${mechanism || 'SEAT DIED — design from live census + settled inputs only; say so.'}`

phase('Design')

const DESIGN_BRIEF = `${CANON}

---

You are a DESIGN ARM. From the evidence below, design THE LAYOUT DOCTRINE for the whole demo (and any
library-side primitives it needs):

1. **The one layout.** The chassis-level system that makes MOST pages correct with zero per-page code:
   the shell grid (named areas/levels), the content-measure law (full-bleed vs clamped prose vs card
   field — when each, driven by what), the height law (dvh usage, first-viewport content guarantee, the
   dock seat), the gutter law (from the canonical series), and the container-query contract each story
   section gets for free.
2. **The fork rubric.** The explicit test a page-CLASS must pass to earn a separate mobile variant.
   Apply it: which of the six page classes fork, and what exactly differs (it should be a handful of
   container-query blocks, never a second DOM tree).
3. **Pathological widths, both ends.** 2560+: what fills the space that is worth filling (multi-column
   card fields? wider canvases? never longer prose lines). 932×430 landscape phone: what the layout does
   with abundant width and starved height.
4. **The transposition.** How PROPORTION.md's one-rung-down law is IMPLEMENTED (one mechanism — e.g.
   container-query-driven custom-property re-binding at the chassis — not per-page overrides).
5. **The kill list.** Every existing breakpoint/media-query/hand-rolled layout the doctrine deletes,
   from the mechanism census. Net LOC direction must be NEGATIVE — this ruling forbids added complexity.
6. **Facilities ledger.** Each modern facility used, where, and its Safari 26.4 + Chromium 149 status.

Be concrete enough to implement from your text alone. Cite the census numbers you are curing.

${EVIDENCE}`

const [dOpus, dFable] = await parallel([
  () => agent(DESIGN_BRIEF, { label: 'design:opus', phase: 'Design', model: 'opus', effort: 'xhigh' }),
  () => agent(DESIGN_BRIEF, { label: 'design:fable', phase: 'Design', model: 'fable', effort: 'xhigh' }),
])

phase('Adjudicate')

const arms = [dFable, dOpus].filter(Boolean)
if (!arms.length) throw new Error('both design arms died')
const apotheosis = arms.length === 1 ? arms[0] : await agent(`${CANON}

---

You are the TRI-FOLD ADJUDICATOR (owner law 2026-07-25). Two design arms — one Fable, one Opus 5 —
designed the layout doctrine from the same evidence. Agglomerate them, with serious sagacity and
INCREDULITY, into the apotheosis.

Incredulity: shared claims get spot-checked against the evidence (and against disk — you may read files)
before adoption; agreement is not truth. Disagreement is signal: reproduce the point and RULE it, never
average. Take the stronger spine, graft the better organs, and record every losing choice in a §REJECTED
section with its falsifier. The result must satisfy all six sections of the design brief, keep the net
LOC direction negative, and be strictly better than either arm — if one is superior wholesale, adopt it
and say why.

===== FABLE ARM =====
${dFable || '(died)'}

===== OPUS ARM =====
${dOpus || '(died)'}

${EVIDENCE}`,
  { label: 'adjudicate:apotheosis', phase: 'Adjudicate', model: 'fable', effort: 'xhigh' })

phase('Challenge')

const [taste, build] = await parallel([
  () => agent(`${CANON}

---

BENCH — ASSUME THE DOCTRINE IS WRONG. It is contrived, or timid, or it does not actually give mobile the
width and height the owner demanded, or its "one layout" secretly forks everywhere, or its fork rubric
lets every page claim an exemption. Attack the thesis, the fork rubric, and the pathological-width
answers hardest. Check it against the owner's exact words and against the canonical series. Would a
person on a phone FEEL the difference? Rank findings by consequence, each with a falsifier.

THE DOCTRINE:
${apotheosis}`,
    { label: 'bench:taste', phase: 'Challenge', model: 'fable', effort: 'xhigh' }),
  () => agent(`${CANON}

---

BENCH — ASSUME IT CANNOT BE BUILT AS SPECIFIED. Verify every mechanism against the actual codebase and
the actual engines: does each named facility resolve in Safari 26.4 AND Chromium 149 (test live where
cheap — you may drive the browser AFTER the census seat is done; you are the only browser user in this
phase... verify with a quick tab check first)? Does the container-query contract survive the shell's
actual DOM (read demo/shell)? Does the dvh law survive iOS toolbar collapse? Does the kill list actually
cover the breakpoints the mechanism census found, or does machinery survive? Is the net-LOC claim
arithmetic real? Find the mechanism that does not work.

THE DOCTRINE:
${apotheosis}`,
    { label: 'bench:build', phase: 'Challenge', model: 'opus', effort: 'xhigh' }),
])

phase('Terminal')

const terminal = await agent(`${CANON}

---

You are the FOREMAN. Author the TERMINAL LAYOUT SPEC from the adjudicated record. Adjudicate every bench
finding: ADOPT (change the doctrine), REFUTE (evidence that kills it), or ROUTE (another wave owns it —
name it). Silent drops forbidden.

Structure:
1. **Thesis** — the doctrine in one paragraph.
2. **§THE ONE LAYOUT** — chassis grid, measure law, height law, gutter law, container-query contract.
3. **§THE FORK RUBRIC** + the per-page-class application table (six classes: fork or no).
4. **§PATHOLOGICAL WIDTHS** — 2560+ and 932×430, decided.
5. **§TRANSPOSITION** — the one mechanism implementing PROPORTION.md's one-rung-down law.
6. **§KILL LIST** — every breakpoint/hand-rolled layout deleted, with file refs; the net-LOC arithmetic.
7. **§FACILITIES LEDGER** — facility · where · Safari 26.4 status · Chromium status.
8. **§GATES** — born-RED, each with the mutation that bites; include a no-horizontal-overflow gate at
   402 AND 2560, a dock-occlusion gate, and a gutter-waste ceiling. No gate that cannot fail.
9. **§PAINT** — π/DELTA obligations: route · viewport · property · engine (Chromium AND safari-app).
10. **§REJECTED** — every killed idea with its falsifier.
11. **§ROUTED** — what other waves own (name them: GF-DOCK for dock occlusion mechanics, W-STORY-* for
    copy, etc.).

THE DOCTRINE:
${apotheosis}

BENCH — TASTE (Fable):
${taste || '(died)'}

BENCH — BUILD (Opus):
${build || '(died)'}`,
  { label: 'terminal:layout', phase: 'Terminal', model: 'fable', effort: 'xhigh' })

return { terminal, hadCensus: !!census, hadMechanism: !!mechanism, benches: [!!taste, !!build] }
