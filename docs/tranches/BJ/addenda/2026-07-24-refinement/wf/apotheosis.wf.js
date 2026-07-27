export const meta = {
  name: 'apotheosis',
  description: 'Thrice-challenge each authored component spec, jury it, re-author into the terminal spec; plus the Ecoute inventory and DAG inference reruns on Opus',
  phases: [
    { title: 'Challenge', detail: '3 hostile benches per spec' },
    { title: 'Jury', detail: '3 jurors adjudicate per spec' },
    { title: 'Apotheosis', detail: 're-author each spec terminally' },
    { title: 'Recovered', detail: 'Ecoute inventory + DAG inference, rerun on Opus' },
    { title: 'Fold', detail: 'cross-spec reconciliation' },
  ],
}

// EMPIRICAL RULING 2026-07-24: Fable 5 quota cannot sustain a fleet of this size — it died twice,
// taking 48/57 and 5/6 seats. Every seat here is Opus.
const M = 'opus'
const REPO = '/Users/mkbabb/Programming/glass-ui'
const REF = `${REPO}/docs/tranches/BJ/addenda/2026-07-24-refinement`
const SCRATCH = '/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad'
const SHOTS = '/Users/mkbabb/Downloads/New Folder With Items 4'

// The eight authored specs are large (96KB total), so they are not passed as args — each seat is told
// which file to read. COMPONENT-WAVES.md carries all eight with the provenance note.
const SPECS = [
  { component: 'timeline', file: `${SCRATCH}/survived/fcfb62ad-0.md` },
  { component: 'handmark', file: `${SCRATCH}/survived/fcfb62ad-1.md` },
  { component: 'aurora', file: `${SCRATCH}/survived/fcfb62ad-2.md` },
  { component: 'tabs', file: `${SCRATCH}/survived/fcfb62ad-3.md` },
  { component: 'alert', file: `${SCRATCH}/survived/fcfb62ad-4.md` },
  { component: 'dock', file: `${SCRATCH}/survived/fcfb62ad-5.md` },
  { component: 'toast', file: `${SCRATCH}/survived/fcfb62ad-6.md` },
  { component: 'slider', file: `${SCRATCH}/survived/fcfb62ad-7.md` },
].map(s => ({ ...s, spec: `**READ THE SPEC FROM DISK FIRST — it is the subject of your bench:**\n  ${s.file}\n(It is also reproduced, with all eight, at ${REF}/COMPONENT-WAVES.md.)` }))
log(`apotheosis: ${SPECS.length} specs x (3 challengers + 3 jurors + foreman) + 3 recovered + fold = ${SPECS.length * 7 + 4} seats`)

const COMMON = `
Repository: ${REPO} — Vue 3.5 + Tailwind v4 liquid-glass component library, 7.0.0 live on npm.
PHASE: tranche development only. Read-only. You MUST NOT edit, create or delete any repo file.

CORPUS (read what you need; never restate what another file owns):
  ${REF}/ROUND-1-FINDINGS.md  136 audited findings — SOURCE OF RECORD, cite by id
  ${REF}/REGISTRY.md · WAVES.md · REDUCTION.md · MOTION-CANON.md · IOS27-ARCHIVE.md · DAG.md · ECOUTE.md
  ${SCRATCH}/dag-deterministic.json   62 component nodes, full feature vectors

MEASURED AT HEAD (lead-verified — trust over anything you infer):
- 62 components, 56,676 LOC (34,018 code / 17,620 comment). src 39.4% comment; components 34.0%;
  dock 51.7%; styles/tokens 72.8%. Any LOC argument MUST normalise for comment share.
- 42 of 62 components (38,204 LOC, 67%) have ZERO src consumers.
- npm test RED at HEAD; release.yml:48 runs it immediately before npm publish at :50.
- THE WEBKIT CRASH IS SOLVED AND LOCALISED (lead, this session): WebKit crashes 5/5 whenever the demo
  mounts. Bisected on the BUILT demo with mount as precondition (Chromium baseline 302 nodes; any trial
  under 60 nodes is VOID). Dropping all 249 "@supports (color:color-mix(in lab, red, red))" blocks =>
  full 302-node mount, no crash. Flattening every color-mix => same. Neutralising the single nested
  --glass-bg-dock declaration => STILL CRASHES. Retention bisect: keep 38 OK, keep 46 CRASH. So it is a
  THRESHOLD EFFECT on the COUNT of those @supports blocks (~38-46 against 249 shipped), not one bad rule.
  The guards are a legacy feature-detect for color-mix(), which is Baseline on every target engine — the
  cure is to DELETE the guards, per the no-masking-fallback edict.
- The published package: @mkbabb/keyframes.js is declared OPTIONAL yet statically reachable from the root
  entry via glass-ui.js -> button -> useLiquidPress -> useSpring. value.js is NOT reachable — its
  quarantine works and the audit misattributed it. Types resolve empty under node16/nodenext because
  dist/index.d.ts re-exports with EXTENSIONLESS relative specifiers in a "type":"module" package.

MEASURED FROST TARGET (photometric, iOS Maps sheet over live map) — the operational definition of
"blurred and frosted" vs "trite, shiny, bright": mean luminance -2%, standard deviation 80% KEPT,
high-frequency detail 10% kept, saturation +62%. Near-zero veil + heavy blur + strong saturate. Ours is a
milky veil. Our blur RADIUS is NOT the defect (7px sits inside the iOS band); the veil opacity and the
absent saturate arm are. OPEN CONTRADICTION: the motion canon argues saturate DOWN on warm cream; this
photometry argues UP. If your subject touches it, say which way YOUR evidence points. Do not paper over it.

EVIDENCE BAR: file:line, computed value, screenshot + what is visible, or a command and its output.
Claims about documents are not findings.
`

phase('Challenge')

const out = await pipeline(
  SPECS,

  (s) => parallel([
    () => agent(`${COMMON}
THE AUTHORED SPEC FOR **${s.component}** (single foreman seat; its challenger and jury benches DIED on a
model quota, so this spec has never been challenged — that is your job):

${s.spec}

YOUR BENCH — **THE SPEC IS WRONG ABOUT THE CODE.** Verify every file:line, every quoted value, every
"UNCHANGED"/"EMPTY"/"absent" claim, every LOC figure, every gate's RED-at-HEAD condition. Run the commands.
A born-RED gate that would actually PASS at HEAD is a critical defect — it means the wave certifies itself
on arrival. Report each verified claim as CONFIRMED or REFUTED with the command output.`,
      { model: M, label: `${s.component}:chal-truth`, phase: 'Challenge' }),

    () => agent(`${COMMON}
THE AUTHORED SPEC FOR **${s.component}**:

${s.spec}

YOUR BENCH — **THE SPEC IS TOO TIMID.** The owner's standing rulings are severe: the dock API is "fully
contrived and should be replaced"; tabs and slider glass are "far too trite, shiny, and bright"; timeline
should be "redesigned from the ground up"; handmark "greenfielded". A prior reduction proposal was rejected
by two critics for exactly this — **every explicit owner aesthetic ruling landed in a KEEP row.**

Ask: does this spec discharge the owner's actual complaint, or does it discharge a tractable neighbour of
it? Does a KEEP-THIN disposition survive when 42 of 62 components have zero src consumers? Is a "close the
four residual defects" framing hiding that the component was condemned outright? Name what the honest,
larger scope is, and what it costs.`,
      { model: M, label: `${s.component}:chal-timid`, phase: 'Challenge' }),

    () => agent(`${COMMON}
THE AUTHORED SPEC FOR **${s.component}**:

${s.spec}

YOUR BENCH — **THE SPEC IS TOO GREEDY, OR IT BREAKS THINGS.** The opposite risk, and it is equally real.

Ask: does it rebuild what already exists? (A prior proposal invented a "shared WebGPU chassis" that had
been shipped for months at src/composables/glass/webgpu/, 1,228 LOC, already composed by all four fields.)
Does it delete a capability the replacement cannot express? Does it break a consumer — check
package.json's 72 export subpaths, the root barrel, and demo usage. Does it mint a gate that restates a
token value rather than guarding a product invariant, against a 40-60 budget with 1,095 cases today? Does
it add net LOC to a tree already 34% comment? Does it collide with another tier-1 spec over the same file?`,
      { model: M, label: `${s.component}:chal-greedy`, phase: 'Challenge' }),
  ]).then(c => ({ s, chal: c.filter(Boolean) })),

  ({ s, chal }) => {
    const J = `${COMMON}
You are a juror adjudicating the wave spec for **${s.component}**.

THE SPEC:
${s.spec}

CHALLENGE — IS IT TRUE:
${chal[0] || '(failed)'}

CHALLENGE — TOO TIMID:
${chal[1] || '(failed)'}

CHALLENGE — TOO GREEDY / BREAKS THINGS:
${chal[2] || '(failed)'}

Rule on every contested point: SUSTAINED / OVERRULED / PARTIAL, with the reason. Verify independently —
do not take a challenger's word. The timid and greedy benches will often contradict each other; that is
the design, and resolving that tension with evidence is the work.`
    return parallel([
      () => agent(`${J}\n\nYOUR SEAT: **DESIGN.** You weigh whether the result is beautiful, proportionate,
alive, and unmistakably ours — warm cream, deft rounding, frosted glass, breath of life. A component that
is technically correct and visually dead has failed. You are the owner's aesthetic proxy.`,
        { model: M, label: `${s.component}:jur-design`, phase: 'Jury' }),
      () => agent(`${J}\n\nYOUR SEAT: **ARCHITECTURE.** You weigh whether the library is smaller, clearer
and more coherent afterwards. Say "this should not exist" when true and "this fold destroys a real
capability" when true. Guard the export map and the consumer contract.`,
        { model: M, label: `${s.component}:jur-arch`, phase: 'Jury' }),
      () => agent(`${J}\n\nYOUR SEAT: **EVIDENCE.** Overrule anything asserted without a file:line, a
computed value, a screenshot observation or command output — however plausible, and including claims in
the SPEC itself. You are the defence against a fleet converging on a satisfying story. This corpus has
already had a reduction proposal, two similarity analyses and a CSS crash attribution refuted by
measurement; assume more remain.`,
        { model: M, label: `${s.component}:jur-evidence`, phase: 'Jury' }),
    ]).then(j => ({ s, chal, jur: j.filter(Boolean) }))
  },

  ({ s, chal, jur }) => agent(`${COMMON}
You are the FOREMAN re-authoring the TERMINAL wave spec for **${s.component}**. This is the apotheosis
pass: the spec below was authored by a single unchallenged seat, then challenged three ways and juried.

THE PRIOR SPEC:
${s.spec}

CHALLENGES:
--- IS IT TRUE ---
${chal[0] || '(failed)'}
--- TOO TIMID ---
${chal[1] || '(failed)'}
--- TOO GREEDY ---
${chal[2] || '(failed)'}

JURY:
--- DESIGN ---
${jur[0] || '(failed)'}
--- ARCHITECTURE ---
${jur[1] || '(failed)'}
--- EVIDENCE ---
${jur[2] || '(failed)'}

Emit the TERMINAL spec, same shape as before, incorporating every sustained ruling:

## W-${String(s.component).toUpperCase()} — <one-line title>

**Disposition:** KEEP | KEEP-THIN | FOLD-INTO-<x> | DEMOTE-TO-DEMO | DELETE | GREENFIELD
**Jury:** where the benches agreed; where they split, and how you broke it.
**Changed from the prior spec:** what the challenge/jury pass actually altered. If nothing, say so — but
"nothing changed" after three hostile benches is itself a claim requiring defence.
**LOC now → expected:** <n> → <n>

### Defects this wave closes
Table: id · defect · evidence (file:line / computed value / screenshot) · severity. SUSTAINED only.

### Overruled
Struck claims with the refuting evidence, so no later round re-raises them.

### The change
Tight prose at implementer grain. Exact files, props, tokens, selectors.

### Born-RED gates
Each: id, assertion, the exact RED-at-HEAD condition with file:line or computed value, and the mutation
proving it can fail. A gate that would PASS at HEAD is struck. At most one or two per component against a
40-60 library budget.

### π / DELTA obligations
Route, engine, viewport per visual claim. WebKit cells are owed; note that the crash is now localised to
the ~249 @supports color-mix guards, so the WebKit arm unblocks as soon as those are deleted.

### Breakage
Consumer impact + migration line, including any of the 72 export subpaths.

### Open
Only what the evidence genuinely does not decide, with the exact fact that would decide it.

Be concrete and short. No process narrative.`,
    { model: M, label: `${s.component}:APOTHEOSIS`, phase: 'Apotheosis' })
      .then(spec => ({ component: s.component, spec })),
)

// ---- recovered seats: the Ecoute inventory + DAG inference that died on Fable ----
phase('Recovered')

const recovered = await parallel([
  () => agent(`${COMMON}
YOUR TASK — **the visual-evidence inventory that was never completed** (its seat died on a model quota).

Corpus: \`${SHOTS}\` — 31 files: 7 iOS screen recordings, iOS stills IMG_1874/1881/1882/2287/2288,
~14 dated Screenshots, 2 texture references, and several stills that are OUR OWN artefacts (dock
playground, sci-report, mini-player). Also \`~/Downloads/Screenshot 2026-07-*.png\` — glass-ui captures the
owner marked during this tranche.

**READ THE IMAGES.** Do not infer from filenames. For each file: what is visibly in it; whether it is an
iOS-27 TARGET or one of OUR surfaces (a DEFECT REPORT) — these get opposite treatment; and which glass-ui
component(s) it bears on, with the demo route.

${REF}/IOS27-ARCHIVE.md already covers the iOS-27 subset photometrically — do NOT redo that analysis, but
DO flag any file it never reached, and any of OUR OWN screenshots, which it did not cover at all. Those
are unexamined owner defect reports and they are the point of this seat.

Emit a markdown table plus, for every one of OUR surfaces, a short defect note naming the component,
what is wrong in the image, and the owning wave.`,
    { model: M, label: 'recovered:visual-inventory', phase: 'Recovered' }),

  () => agent(`${COMMON}
YOUR TASK — **the DAG isomorphism + superfluity ruling** (its seats died on a model quota).

Read ${REF}/DAG.md and ${SCRATCH}/dag-deterministic.json.

ESTABLISHED: duplication is largely REFUTED — exactly ONE pair of 1,891 clears the >=2-independent-spaces
bar (checkbox ~ radio-group), and ZERO pairs share CSS-class vocabulary at >=0.34. Superfluity is
CONFIRMED — 42 of 62 components, 38,204 LOC, 67% of the tree, zero src consumers.

Rule on:
1. **dialog ~ drawer, 0.80 on reka primitives** — the graph's loudest unexplained edge, UNRULED. An
   earlier critic defended the split on capability: drawer owns detent physics + drag-dismiss, dialog owns
   the concentric-radius relay + side placements, and left/right drawers get NO detent ladder while the
   in-repo dialog side placements ARE left/right. Fold, keep-split, or re-cut — on capability, not score.
2. **The binary-control triad** — checkbox~switch 0.75, radio-group~switch 0.636, checkbox~radio-group
   0.60 on props. Roles must stay semantically distinct. Is there a shared control primitive underneath?
   Sketch its API in <=10 lines.
3. **The 42 zero-consumer components.** Terminal table: component · LOC · props · demo consumers ·
   verdict · one-line reason. Verdict in KEEP / KEEP-THIN / DEMOTE-TO-DEMO / DELETE / GREENFIELD. The
   consumer bar is necessary but NOT sufficient: labeled-field has 14 demo consumers and 0 src (a library
   fact); aurora has 23 demo consumers and is the substrate, not overfit; constellation has 25 props,
   2,452 LOC, 2 stories, 0 src consumers and no GPU stack of its own; typewriter has 1,418 LOC, 1 story,
   and was never examined by ANY prior tranche. Be decisive — the "min-consumers" book has ridden 10-11
   tranches undecided and this seat exists to end it. Every delete/demote names the package.json subpath.`,
    { model: M, label: 'recovered:dag-ruling', phase: 'Recovered' }),

  () => agent(`${COMMON}
YOUR TASK — **codify the terminal method** (its seat died on a model quota).

The ask: "brainstorm for the SOTA, or codify a process that's bespoke for our usecase and potentially in a
generalized manner for component and library level analysis via a constructed graph."

1. **Survey the actual state of the art** — dependency-cruiser/madge import graphs, AST clone detection
   (Type-1/2/3/4), design-token graph analysis, CSS dedup research, what commercial design systems do.
   Be concrete about which techniques transfer to Vue SFC + Tailwind v4 + CSS custom properties and which
   do not, and why.
2. **Judge our v3 method honestly.** Read ${SCRATCH}/dag3.mjs. Multi-space Jaccard, comment-stripped,
   degenerate-set-guarded. Two predecessors were refuted by their own output: v1 collapsed to one
   CSS-class Jaccard (scored alert~toast ~1.0 — correct SHARING, not duplication — and scored the four
   procedural fields low); v2 scored aurora~search 1.0 because both had a single class token harvested
   from a COMMENT, and its props/reka extractors returned zero for every component. Where is v3 still
   weak? Jaccard over prop NAMES misses semantic equivalence under renaming; nothing measures BEHAVIOUR
   or RENDERED OUTPUT. Is a Type-4 semantic clone detector worth it at 62 components?
3. **Specify the terminal method** as a script with a defined output and a defined failure mode, cheap
   enough to run at every tranche close. It must NOT mint an append-only ledger of derived pair data — a
   known convergence-failure mode here (critics minting derived data the gate then cannot converge over).
4. **State what a graph can never decide**, so no future round asks it to.`,
    { model: M, label: 'recovered:method', phase: 'Recovered' }),
])

phase('Fold')

const ok = out.filter(Boolean)
const missing = SPECS.map(s => s.component).filter(c => !ok.find(o => o.component === c))
if (missing.length) log(`COVERAGE GAP: ${missing.join(', ')}`)

const fold = await agent(`${COMMON}
You are the terminal FOLD over the apotheosis pass.

=== RE-AUTHORED SPECS (${ok.length}) ===
${ok.map(o => `\n===== ${o.component} =====\n${o.spec}`).join('\n')}
${missing.length ? `\nCOVERAGE GAP — no terminal spec for: ${missing.join(', ')}. Report it, do not paper over it.` : ''}

=== RECOVERED: VISUAL INVENTORY ===
${recovered[0] || '(failed)'}

=== RECOVERED: DAG RULING ===
${recovered[1] || '(failed)'}

=== RECOVERED: METHOD ===
${recovered[2] || '(failed)'}

Emit the terminal reconciliation:

1. **WHAT THE APOTHEOSIS CHANGED.** Per component, one line: what the three benches actually altered
   versus the unchallenged spec. Where a spec survived untouched, say why that is credible.
2. **COLLISIONS.** Two specs claiming the same file, token, selector or primitive. One owning wave per
   file per cut; name the owner and what the other consumes instead.
3. **SHARED PRIMITIVES.** Remedies independently invented by N specs — promote once with a 3-line API and
   a consumer list, strike the copies. CHECK FIRST whether it already exists on disk; re-inventing
   something already shipped is the more likely error and has happened twice in this tranche.
4. **DEPENDENCY ORDER**, with the reason for each edge.
5. **GATE BUDGET.** Sum every proposed born-RED gate against the 40-60 library mandate (1,095 cases
   today). Cut to real product invariants and say what you cut.
6. **LOC LEDGER.** Sum expected deltas against the 56,676-line component tree, comment-normalised.
7. **THE DAG + SUPERFLUITY RULINGS**, consolidated.
8. **WHAT NO WAVE OWNS.** Silent drops are forbidden — assign an owner.
9. **FALSE PREMISES KILLED**, including any inherited from this briefing.

Declare your exact modelId. Be exhaustive on coverage, terse in prose.`,
  { model: M, label: 'APOTHEOSIS:fold', phase: 'Fold' })

return { specs: ok, coverage: { requested: SPECS.length, returned: ok.length, missing }, recovered: recovered.filter(Boolean).length, fold }
