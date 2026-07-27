export const meta = {
  name: 'greenfield-terminal-all-lanes',
  description: 'Design every greenfield lane to terminal IN TRANCHE-DEVELOPMENT: timeline (new mint) + dock/aurora/blob/handmark pass-4',
  phases: [
    { title: 'Diverge', detail: 'independent design proposals per lane', model: 'opus' },
    { title: 'Golden', detail: 'synthesize the decided design', model: 'opus' },
    { title: 'Challenge', detail: 'two benches assuming the design is wrong', model: 'opus' },
    { title: 'Terminal', detail: 'foreman re-authors the terminal greenfield spec', model: 'opus' },
    { title: 'Fold', detail: 'cross-lane reconciliation', model: 'opus' },
  ],
}

const REPO = '/Users/mkbabb/Programming/glass-ui'
const REF = 'docs/tranches/BJ/addenda/2026-07-24-refinement'

const CANON = `
## STANDING LAW — binds every seat

**PHASE: TRANCHE DEVELOPMENT ONLY.** Read the repo, run the browser, measure. **Author no source, test,
gate, package or lock byte.** Your deliverable is a SPEC. Do not edit, stage, commit, revert or clean
anything, here or in any sibling repo. Never move or park a sibling repository.

**OWNER RULING 2026-07-25:** greenfielding is tranche-development work, done NOW, not deferred to
execution. Execution consumes a finished design; it does not author one. Design to TERMINAL.

**MODEL LAW:** every seat is Opus 5. State your exact modelId in your output.

### The edicts, non-negotiable
- **BREATH OF LIFE.** Every component always displays engagement. At rest it is not dead.
- **MOVEMENT OF MOMENTUM / LIQUID WEIGHT UNIVERSAL.** All motion, transitions and scrolling carry
  inertia, weight, bounce, liquid-glass quality. Nothing moves linearly. Nothing snaps without a settle.
- **BEST iOS 27** — derive novel affordances in our own aristotelian proportion, in the abstract. Do not
  transcribe Apple; out-design it.
- **CARTOON-TECHNICOLOR** where the identity calls for it — expressive, saturated, alive; never flat.
- **NO LEGACY. CLEAN BREAKS.** No aliases, no migration shims, no dual paths, no masking fallbacks. A
  primary either works in paint or fails loudly. Breaking changes are allowed and expected.
- **DELETION IS GRANTED on vacuity or superfluity. Consumer count is NOT sufficient grounds either way** —
  a thing with consumers may still be superfluous; a thing with none may still be load-bearing.
- **KISS-FORWARD PARSIMONY.** More code is not better. Be pithy, laconic, fastidious. A design that needs
  a paragraph to justify a knob does not need the knob.
- **ARISTOTELIAN PROPORTION, BOTH DIRECTIONS.** Mark what is superfluous, duplicative or distracting for
  removal — AND mark where MORE affordance is owed.

### Inputs you MUST consume before designing (they are settled; do not re-derive)
1. \`${REF}/PROPORTION.md\` — **the canonical series.** Space \`4·8·12·20·32·52\`; the pairing law
   \`pad(role) = r(role) − 4\`; dividers = one warm ink, 1px, α \`0.08 / 0.16 / 0.48\` at ratio 1:2:6;
   the gap law (≥32 → never draw a line; 20 → seam; ≤12 → edge); fill \`0.05 / 0.12 / 0.16\` with a
   sole-carrier state needing ≥3:1; type on \`φ^(1/4) = 1.127838\`; mobile = every space rung steps down
   exactly one. **Minting a value outside this series is authoring a defect.** If your design needs one,
   you must derive it as the arithmetic product of a stated law and say which.
2. \`${REF}/COMPONENT-WAVES-TERMINAL.md\` — the thrice-challenged terminal component specs. Your lane's
   entry is binding on scope, disposition and LOC.
3. Your lane's \`docs/tranches/BJ/formation/greenfields/GF-*-PASS3.md\` where one exists — the prior
   decided design. You are pass 4. Amend it in named places; do not restate it wholesale.
4. \`docs/tranches/BJ/FEEDBACK-LEDGER.md\` — the owner's own words. Your lane's rows are the brief.

### Live measurement
The demo is at \`localhost:4188\` (built) / \`localhost:5199\` (dev). Chrome DevTools MCP for telemetry.
**Safari is LIVE** — drive the real app via \`scripts/safari-probe.mjs\` (W3C WebDriver over plain HTTP;
\`pkill -f safaridriver\` first). **Playwright's \`webkit\` is the ENGINE BUILD, not Safari — they give
OPPOSITE results here. Never write "Safari" from Playwright-WebKit.** Never call \`getContext()\` on a
live WebGPU canvas — it steals the context and fakes a black fallback; observe by screenshot only.

### Two live defects that constrain any design touching glass
- **THE PREFIX TRAP (S0, shipping in published 7.0.0).** The build DROPS the unprefixed
  \`backdrop-filter\` declaration and keeps only the \`-webkit-\` alias, which Chromium does not implement.
  Verified on disk in the published \`dist/glass-ui.css\`. **Never author \`backdrop-filter\` followed by
  \`-webkit-backdrop-filter\`.** If your design needs to disable frost, do not write a reset — do not
  apply the glass class at all.
- **188 of 305 declared glass surfaces (61.6%) compute \`backdrop-filter: none\`.** A surface declared
  glassy is not glassy. If your design says "frosted", specify the receiver and prove it resolves.
`

const LANES = [
  {
    key: 'timeline',
    label: 'GF-TIMELINE',
    mode: 'mint',
    brief: `LANE: **GF-TIMELINE — a new greenfield, minted 2026-07-25. NO PRIOR SPEC EXISTS.**

The apotheosis pass flipped W-TIMELINE from KEEP to GREENFIELD on charter grounds: the wave owns
registry row C-5 ("still ships all five variants… against F16") and \`ECOUTE.md:279\` books a
**GREENFIELD 5→1**. Owner row **F16**: */data/timeline* — *"Very poorly defined, buggy, likely many
facilities overfit. **Redesign from the ground up.**"* ASK-7 recommends COLLAPSE 5→1, redesign in-library;
silence advances the recommendation, so the collapse is authorized.

Read \`${REF}/COMPONENT-WAVES-TERMINAL.md\` § TIMELINE in full — it carries nine measured defects
(TL-1…TL-9) and the LOC budget (2,254 family → ≈1,100-1,250 total / ≈550-620 code). The largest is
**TL-1: the bar does not read** — every hue resolves from a *surface* token, not the chroma register;
measured filled-vs-empty at t=0.5 is **ΔRGB 19.10 light, 5.83 dark**. Also TL-3 (a CSS var cycle makes
the cel paint nothing), TL-4 (the boundary marker clipped on three sides), TL-5 (an advertised 44px
WCAG halo that is inert — \`pointer-events: none\` inherits; real target 15.25px).

Design the ONE timeline that survives the collapse. What is a timeline FOR in this library — and which
of the five current roles (continuous rail, segmented cells, scrubber transport, event axis, marker
strip) are genuinely distinct jobs versus one job wearing five costumes? The sole external consumer
mounts \`variant="continuous"\`; the only in-repo scrubber site is a media transport that is literally a
\`<Slider :min="0" :max="1" :step="0.01">\`. The demo's hand-rolled event ticks are
\`:style="{ left: \\\`\${e.at * 100}%\\\` }"\` — a positional \`at\` on the marker register absorbs them.

Give it BREATH OF LIFE and LIQUID WEIGHT: a timeline is a thing that MOVES, and this one currently does
not move like liquid glass. Live routes: \`/data/timeline\`, and \`/substrates/fourier-field\` for the one
real consumer.`,
  },
  {
    key: 'dock',
    label: 'GF-DOCK',
    mode: 'pass4',
    brief: `LANE: **GF-DOCK pass 4.** Spec of record: \`docs/tranches/BJ/formation/greenfields/GF-DOCK-PASS3.md\`
(488 lines — one dock, a state machine of glass bodies over a detented strip, under a lens). Its
predecessors \`GF-DOCK-PASS1.md\` and \`GF-DOCK-CRIT2.md\` are history; read PASS3 in full and CRIT2 for
what it had to fix (CRIT2 scored the pass-1 design **42%** and found the codex-anointment INVERTED).

**Pass-4 is what P-EX4 called "paint owed" — plus reconciliation with the terminal spec.**
\`${REF}/COMPONENT-WAVES-TERMINAL.md\` § DOCK rules **GREENFIELD — a real API replacement**, 8,046 LOC →
**≤5,800**, and records that the prior spec was "\`W-DOCK-OVERFLOW\` wearing \`W-DOCK\`'s name" — it closed
H-4/H-5 and **zero** of H-1/H-3/K-7. It refuses the \`shape="rounded"\` collapse (three live render sites)
and refuses widening \`DockContext.seat\` (public surface). The registry row itself is stale: it says
7,974 LOC · 20 partials · 19 props against a measured 8,046 · 19 · 14.

Owner rows: **F47** — *"Dock UX increased dramatically: scrolling dock must show there's more left/right
with subtlety; clicking an edge-occluded item auto-scrolls the dock. The dock likely needs to be
greenfielded, again."* **F27** — *"Why can I vertically scroll in the dock."* **F06** — dock page
transitions broken, slow, flashing.

Take it to paint. Live routes \`/dock/overview\`, \`/dock/rail\`, \`/dock/layers\`. Measure the detent
engine, the lens, the collapse FSM and the posture choreography as they actually render, desktop AND
mobile, Chromium AND real Safari. Then say what PASS3 got wrong.`,
  },
  {
    key: 'aurora',
    label: 'GF-AURORA',
    mode: 'pass4',
    brief: `LANE: **GF-AURORA pass 4.** Spec of record: \`docs/tranches/BJ/formation/greenfields/GF-AURORA-PASS3.md\`
(462 lines — dedicated bodies per mode, an honest register, the solar family designed). Read
\`GF-AURORA-CRIT2.md\` for the load-bearing cost correction (F1: the "cheap derivative-free van-Gogh
pilot" is mis-costed; F2: the W4 relabel arm IS the masking fallback it claims to kill).

\`${REF}/COMPONENT-WAVES-TERMINAL.md\` § AURORA **folds W-AURORA into \`W-AURORA-MEDIUM\`** and carves out
two: **\`W-AURORA-FIELD\`** (new, cheap, high-reach — A13's positive ask on the ambient field) and
**\`R-AURORA-REGISTER\`** (the 17→N preset cut, sequenced AFTER the gate is green). It also found that at
\`SETTING_SUN\` (\`strokeAmount: 0\`) the collapsed body is the **identity function**, so four mediums paint
the raw smooth field — they are not different modes at all.

Owner rows: **A13** — *"Aurora modes expressly defined — likely greenfield. Extant exemplars (sky, dawn,
dusk) good — how can they be BETTER; a PROPER van-Gogh mode, a proper oil-pastel brush mode (extant is
awful), a proper crayon/hand-drawn mode."* **F08** — presets duplicative, reduce dramatically.
**F05** — *"why does this section not have a background aurora."*

Design the modes so each is a genuinely distinct painterly body, and design the ambient field
(\`W-AURORA-FIELD\`) that F05 asks for. Live route \`/substrates/aurora\`. **WebGPU canvas: observe by
screenshot only — never \`getContext()\`.** Measure per-medium, and say which of the 17 presets are the
same picture twice.`,
  },
  {
    key: 'blob',
    label: 'GF-BLOB',
    mode: 'pass4',
    brief: `LANE: **GF-BLOB pass 4.** Spec of record: \`docs/tranches/BJ/formation/greenfields/GF-BLOB-PASS3.md\`
(426 lines — the technicolor creature wearing the iOS light grammar; shared spring / separate field; one
cast shadow stamp; emotional states that READ; two topology poles with a sparkle nucleus; two-layer
reactivity; proper meatballing; WebGPU-first). Read \`GF-BLOB-CRIT2.md\` — F1 found the "restore the bold
envelope" mood claim is largely a NON-deficit and \`G-MOOD-AMPLITUDE\` is born-GREEN for orbit/wobble/pulse,
and F3 found \`W-ALIVE\`'s "never park while satelliteCount>0" collides with the public \`settled\` seam.

Owner row **A12**: *"Blob greenfield: look to the OLD value.js implementation (several months back) —
cartoon-like shadow, better lighting, more expressive, proper metaballing, better emotional states, high
+ dynamic interactivity."*

Pass-4 owes paint. Take the emotional states, the metaballing and the shadow to measured pixels: does a
mood READ at a glance, or only in a diff? Is the meatball visibly liquid, or a circle near a circle?
Live route \`/substrates/blob\` (check the route table). **Screenshot-only observation on the canvas.**
This is the lane where CARTOON-TECHNICOLOR is most load-bearing — the creature should have personality,
not physics homework. Say what PASS3 over-engineered and what it under-delivered.`,
  },
  {
    key: 'handmark',
    label: 'GF-HANDMARK',
    mode: 'pass4',
    brief: `LANE: **GF-HANDMARK pass 4.** Spec of record:
\`docs/tranches/BJ/formation/greenfields/GF-HANDMARK-PASS3.md\` (265 lines — measured pixel space, the
measured baseline, four gestures, one body/one draw mechanism, the layering law, exactly five props).
\`GF-HANDMARK-CRIT2.md\` FINDING 3 named the missing axis: **WEIGHT/thinness**, with no gate.

\`${REF}/COMPONENT-WAVES-TERMINAL.md\` § HANDMARK executes AGAINST PASS3 and **amends it in five named
places**, carrying four findings the greenfield does not name. Two facts it established that change the
brief: (1) **the external-consumer census is FALSE** — atlas imports \`/handmark\` in four files and
\`shape="path"\` is a live call site there, on a pinned 6.0.0 whose \`dist\` carries the identical throw, so
this is a cross-repo hold, not a free delete; (2) the π prediction inverted from none to total, and the
gates were re-authored to measure **painted extent** instead of non-empty strings. LOC 2,306 → ~425
across 3 files; ≥500 of 934 test lines are pinned to the dead contract.

Owner rows F34-F40, the harshest in the ledger: *"looks awful"* · *"should be more pen-like, more
natural"* · *"doesn't even work"* · *"broken and disjointed"* · *"each one generally awful — should be
greenfielded"* · *"wrong layering, awful smoothing, awful encapsulation"* · *"remove ALL reference to
meta text (what is 'SE') — awful, grand redesign."*

Pass-4 owes paint on the four gestures and the weight axis. Live route \`/motion/handmark\`. Does a stroke
read as a HAND, or as a spline? Measure painted extent, not string non-emptiness. Reconcile the five
terminal amendments into one spec and state the atlas hold explicitly.`,
  },
]

const SPEC_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['modelId', 'lane', 'thesis', 'body'],
  properties: {
    modelId: { type: 'string' },
    lane: { type: 'string' },
    thesis: { type: 'string', description: 'The design in one paragraph. What it IS, not what it fixes.' },
    body: { type: 'string', description: 'The full design. Markdown. Dense.' },
    strike: { type: 'array', maxItems: 24, items: { type: 'string' }, description: 'Superfluous/duplicative/distracting — remove, with the ground.' },
    add: { type: 'array', maxItems: 24, items: { type: 'string' }, description: 'Where MORE affordance is owed, with the ground.' },
    risks: { type: 'array', maxItems: 12, items: { type: 'string' } },
  },
}

phase('Diverge')

const results = await pipeline(
  LANES,
  // Stage 1 — divergent proposals (3 for the new mint, 2 for a pass-4)
  (lane) => {
    const angles = lane.mode === 'mint'
      ? [
          { k: 'reductive', p: 'ANGLE: RADICAL REDUCTION. The right answer is probably far less than exists. Find the ONE job and design only that. Argue for what dies.' },
          { k: 'expressive', p: 'ANGLE: MAXIMUM EXPRESSION. Breath of life and liquid weight first. Design the most alive version that is still parsimonious — motion, engagement, personality. What would make someone smile at it?' },
          { k: 'structural', p: 'ANGLE: STRUCTURE AND CONTRACT. Design the API, the DOM, the token seams, the colocation shape. What is the smallest public surface that serves every real consumer? Where does it live on disk?' },
        ]
      : [
          { k: 'paint', p: 'ANGLE: PAINT. Run the live demo and MEASURE. Chromium + real Safari, desktop + mobile. The prior spec was written mostly from source. Your job is to find where it is wrong ON SCREEN — geometry, motion, colour, hit targets, what does not read at a glance. Bring numbers and named captures.' },
          { k: 'first-principles', p: 'ANGLE: FIRST PRINCIPLES. Ignore how it is built. What SHOULD this be, derived from the edicts and the owner rows? Then diff that against the PASS3 spec and name every place PASS3 settled for the achievable over the right.' },
        ]
    return parallel(angles.map(a => () =>
      agent(`${CANON}\n\n---\n\n${lane.brief}\n\n---\n\n${a.p}\n\nProduce a design proposal. Be concrete and measured — no adjectives standing in for decisions. Cite files, routes, and numbers you personally pulled.`,
        { label: `${lane.label}:${a.k}`, phase: 'Diverge', model: 'opus', effort: 'high', schema: SPEC_SCHEMA })
    )).then(rs => ({ lane, proposals: rs.filter(Boolean) }))
  },
  // Stage 2 — the golden synthesis
  ({ lane, proposals }) => {
    if (!proposals.length) return null
    const text = proposals.map((p, i) => `\n## PROPOSAL ${i + 1} (${p.modelId})\nTHESIS: ${p.thesis}\n\n${p.body}\n\nSTRIKE: ${(p.strike || []).join(' · ')}\nADD: ${(p.add || []).join(' · ')}\nRISKS: ${(p.risks || []).join(' · ')}`).join('\n')
    return agent(`${CANON}\n\n---\n\n${lane.brief}\n\n---\n\nYou are the GOLDEN seat. ${proposals.length} independent proposals follow. Synthesize ONE decided design.

Do not average them. Pick the strongest spine and graft the best organs from the others, saying which
came from where and why the losers lost. Where two proposals genuinely conflict, RULE — and record the
loser in a \`§REJECTED\` section with the falsifier, so it cannot be re-raised.

The decided design must be buildable from your text alone: DOM, tokens (from the canonical series),
motion (springs with real numbers), states, the public surface, the file layout on disk, what is deleted.

${text}`,
      { label: `${lane.label}:golden`, phase: 'Golden', model: 'opus', effort: 'high', schema: SPEC_SCHEMA })
      .then(g => ({ lane, golden: g }))
  },
  // Stage 3 — two benches that assume the design is wrong
  ({ lane, golden }) => {
    if (!golden) return null
    const benches = [
      { k: 'wrong-design', p: 'BENCH: ASSUME THE DESIGN IS WRONG. It is over-built, or it is timid, or it does not actually answer the owner row. Attack the thesis. Would a person notice the difference? Is any part of this ceremony? Does it obey the canonical series or quietly mint values? Does it have breath of life, or does it just claim to?' },
      { k: 'wrong-build', p: 'BENCH: ASSUME IT CANNOT BE BUILT AS SPECIFIED. Check every mechanism against the actual codebase and the actual engines. Does the token exist? Does that CSS feature resolve in Safari 26.4 AND Chromium? Does it trip the prefix trap? Is the motion physically achievable with our spring system? Is the LOC budget arithmetic real? Find the mechanism that does not work.' },
    ]
    return parallel(benches.map(b => () =>
      agent(`${CANON}\n\n---\n\n${lane.brief}\n\n---\n\n${b.p}\n\nDEFAULT TO REFUTATION. Verify on disk and in the live browser. Rank findings by consequence; give each a falsifier the foreman can check. If a part genuinely survives, say so in one line — spend your effort on what fails.\n\nTHE DESIGN:\nTHESIS: ${golden.thesis}\n\n${golden.body}\n\nSTRIKE: ${(golden.strike || []).join(' · ')}\nADD: ${(golden.add || []).join(' · ')}`,
        { label: `${lane.label}:${b.k}`, phase: 'Challenge', model: 'opus', effort: 'high' })
    )).then(cs => ({ lane, golden, critiques: cs.filter(Boolean) }))
  },
  // Stage 4 — TRI-FOLD terminal (owner Ecoute-moi 2026-07-25): one Fable arm + one Opus arm author the
  // terminal spec independently; a Fable adjudicator agglomerates them into the apotheosis.
  ({ lane, golden, critiques }) => {
    if (!golden) return null
    const foremanPrompt = `${CANON}\n\n---\n\n${lane.brief}\n\n---\n\nYou are the FOREMAN. Re-author the TERMINAL greenfield spec for this lane from the adjudicated record.

You have the golden design and two benches that assumed it was wrong. Adjudicate every finding: ADOPT
(and change the design), REFUTE (with the evidence that kills it), or ROUTE (real, but another wave owns
it — name the wave). A bench finding you neither adopt nor refute is a silent drop and is forbidden.

Then write the terminal spec. It must contain, in this order:
1. **Disposition** and the one-paragraph thesis.
2. **§CHANGED FROM PASS3** (or §MINTED for a new lane) — exactly what moved and why. Name it.
3. **The design** — DOM, tokens from the canonical series, motion with real spring numbers, states,
   public surface, on-disk layout, what is deleted.
4. **§STRIKE** and **§ADD** — the aristotelian pass, both directions, each with its ground.
5. **§GATES** — born-RED, each with the mutation that must bite. No gate that cannot fail.
6. **§PAINT** — the π/DELTA obligations: route, selector, property, viewport, engine. Chromium AND
   real \`safari-app\` (never Playwright-WebKit under a Safari label).
7. **§REJECTED** — every killed idea with its falsifier.
8. **§LOC** — now → expected, comment-normalised, with the arithmetic.
9. **§ROUTED** — what another wave owns, named.

Be pithy. Dense tables over prose. Em dashes without spaces.

THE GOLDEN DESIGN:
THESIS: ${golden.thesis}

${golden.body}

STRIKE: ${(golden.strike || []).join(' · ')}
ADD: ${(golden.add || []).join(' · ')}
RISKS: ${(golden.risks || []).join(' · ')}

${critiques.map((c, i) => `\n=== BENCH ${i + 1} ===\n${c}`).join('\n')}`
    return parallel([
      () => agent(foremanPrompt, { label: `${lane.label}:terminal`, phase: 'Terminal', model: 'opus', effort: 'high', schema: SPEC_SCHEMA }),
      () => agent(foremanPrompt, { label: `${lane.label}:terminal-fable`, phase: 'Terminal', model: 'fable', effort: 'high', schema: SPEC_SCHEMA }),
    ]).then(([opusT, fableT]) => {
      const arms = [opusT, fableT].filter(Boolean)
      if (!arms.length) return null
      if (arms.length === 1) return { lane: lane.key, label: lane.label, terminal: arms[0] }
      const show = (t, name) => `\n===== ${name} ARM =====\nDISPOSITION: ${t.disposition || '?'}\nTHESIS: ${t.thesis}\n\n${t.body}\n\nSTRIKE: ${(t.strike || []).join(' · ')}\nADD: ${(t.add || []).join(' · ')}\nRISKS: ${(t.risks || []).join(' · ')}`
      return agent(`${CANON}\n\n---\n\n${lane.brief}\n\n---\n\nYou are the TRI-FOLD ADJUDICATOR (owner law 2026-07-25). Two foremen — one Fable, one Opus 5 — each
authored a terminal greenfield spec for this lane from the same adjudicated record. Agglomerate them,
with serious sagacity and INCREDULITY, into the apotheosis.

Incredulity means: where the arms agree, do not assume agreement is truth — spot-check the shared claim
against disk or the live page before adopting it. Where they disagree, the disagreement is signal:
reproduce the point yourself and rule it; never split the difference. Take the stronger spine; graft the
better organs; record every losing choice in §REJECTED with its falsifier. The output must satisfy the
same 9-section terminal structure the foremen were given, be buildable from your text alone, and be
STRICTLY better than either arm — if one arm is simply superior wholesale, say so and say why.

${show(fableT, 'FABLE')}
${show(opusT, 'OPUS')}`,
        { label: `${lane.label}:apotheosis`, phase: 'Terminal', model: 'fable', effort: 'high', schema: SPEC_SCHEMA })
        .then(t => ({ lane: lane.key, label: lane.label, terminal: t }))
    })
  }
)

const good = results.filter(g => g && g.terminal)
log(`${good.length}/${LANES.length} greenfield lanes designed to terminal`)

phase('Fold')

const fold = await agent(`${CANON}

---

You are the CROSS-LANE FOLD. Five greenfield lanes were designed to terminal in parallel, each
thrice-challenged. Reconcile them.

Produce:
**1 · COLLISIONS** — one owning wave per file per cut. Two lanes touching the same partial, token,
primitive or register is a defect: rule the owner and say what the others consume instead.
**2 · SHARED PRIMITIVES** — what more than one lane needs. Does it exist on disk? Check, do not assume.
If two lanes independently designed the same thing, that is one primitive, not two.
**3 · CANONICAL-SERIES COMPLIANCE** — every value any lane minted outside \`PROPORTION.md\`. Each is
either a derived law (name it) or a defect (strike it).
**4 · MOTION COHERENCE** — do the five lanes move like one library? Reconcile the spring registers.
**5 · DEPENDENCY ORDER** — what must land before what, and why.
**6 · LOC LEDGER** — per lane, comment-normalised, summed.
**7 · GATE BUDGET** — total gates requested against the seats available. Strike any gate that cannot fail.
**8 · WHAT NO LANE OWNS** — every owner row and finding in scope, assigned. Nothing dropped.

Dense tables. No filler.

One late owner ruling binds this fold (issued after launch, applied here at the boundary): **the blob is
WebGPU ONLY — the 1,040-LOC WebGL2 arm is CUT as a masking fallback; no capability shim; absent WebGPU it
fails loudly.** Reconcile GF-BLOB's spec against that ruling explicitly: strike anything resting on the
dual-backend premise and say what changes.

${good.map(g => `\n\n========== LANE ${g.label} ==========\nDISPOSITION/THESIS: ${g.terminal.thesis}\n\n${g.terminal.body}\n\nSTRIKE: ${(g.terminal.strike || []).join(' · ')}\nADD: ${(g.terminal.add || []).join(' · ')}`).join('')}`,
  { label: 'fold:greenfield', phase: 'Fold', model: 'fable', effort: 'high' })

return { lanes: good, fold }
