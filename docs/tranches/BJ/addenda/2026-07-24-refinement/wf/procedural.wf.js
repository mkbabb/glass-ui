export const meta = {
  name: 'procedural-ecoute-trifold',
  description: 'Boon/bane ledger for every procedural substrate + configurator refinement + blob physics charter + GF-FOURIER mint — tri-fold',
  phases: [
    { title: 'Ledger', detail: 'one browser seat (serialized) + five static seats: boons/banes per substrate + configurator', model: 'opus' },
    { title: 'Design', detail: 'blob physics · GF-FOURIER · configurator express — Fable ∥ Opus arms each', model: 'opus' },
    { title: 'Adjudicate', detail: 'Fable adjudicators agglomerate each pair into the apotheosis', model: 'fable' },
    { title: 'Fold', detail: 'Fable fold: the ledger + three designs reconciled, collisions ruled', model: 'fable' },
  ],
}

const REF = 'docs/tranches/BJ/addenda/2026-07-24-refinement'
const SCRATCH = '/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad'

const CANON = `You are working in glass-ui at /Users/mkbabb/Programming/glass-ui (HEAD 9c5a7451, tranche BJ,
phase = TRANCHE DEVELOPMENT — read, measure, prototype in the scratchpad, design; author NO repo byte;
commit nothing; never touch a sibling repo).

## THE OWNER RULING (Ecoute-moi 2026-07-25, third of the day — quoted, binding)
"With all of our procedural animations, substrates, mark their boons and banes, effects and defects —
within their configurators, too (this should be standardized, made larger, have proper expand buttons,
made expressive and configurable — deft changes here as the extant is rather alright).
The blob has no notion of proper meatballing and fission: the satellites never properly separate and
orbit the core blob; each satellite blob should be an instance of its own blob with a potential for
recursive sub-satellites, mimicking a natural, chaotic, elliptical orbit. Fully coordinated and
orchestrated, elegantly, with the blobs up the blob tree — though it's possible via simulation that
these need not be fully coordinated, in that the blob physics form a cohesion that's emergent.
Experiment. Similarly for our other animations, which shall greenfield. Like fourier-field (a complete
mess), parts of aurora, etc."

## SETTLED INPUTS — consume, never re-derive
- \`${REF}/EXEC-STATE.md\` — the standing constraints, incl. BLOB = WebGPU ONLY (the 1,040-LOC WebGL2 arm
  is CUT, ruled earlier today) and the blob's measured state (body C=0.0845, Δh 10.6° from its own
  wallpaper — same hue family as the room; NO satellites/fission/merge in the default state).
- \`${REF}/COMPONENT-WAVES-TERMINAL-2.md\` § FOURIER-FIELD — tier-2's KEEP-THIN is OVERRULED by the owner
  ("a complete mess… shall greenfield") but its CONTENT survives as constraints: WGPU-only, its 8
  corrections, and the LIVE SLIDES CONSUMER (verified 3×; deletion denied; greenfield ≠ delete; a relay
  addendum is owed to slides' tranche when the public surface changes).
- \`${REF}/PROPORTION.md\` — the canonical series; configurator geometry must sit on it.
- \`${REF}/MOTION-CANON.md\` — springs; \`springPreset("dock")\` read from disk, never a remembered literal.
- \`docs/tranches/BJ/formation/greenfields/GF-BLOB-PASS3.md\` — the prior decided blob design (technicolor
  creature, two topology poles, sparkle nucleus, one cast-shadow stamp). The physics charter AMENDS it.
- \`src/components/PROCEDURAL-SUITE.md\` — the suite's own map.
- W-CONFIGURATOR-STD landed at \`34681df9\` (one configurator anatomy across every studio) — the extant is
  "rather alright"; changes are DEFT, not a rework.

## HARD RULES
- **Browser singleton:** only the seat named as browser owner drives Chrome, serially. All other seats
  are static unless explicitly told otherwise.
- Never \`getContext()\` on a live WebGPU canvas — screenshot-only observation.
- Never author \`backdrop-filter\` + \`-webkit-backdrop-filter\` (the prefix trap).
- Values outside the canonical series must derive from a stated law, named.
- **Experimentation is authorized IN THE SCRATCHPAD ONLY** (\`${SCRATCH}/proc/\`): write prototypes there,
  run them with node or serve them locally, measure. No repo bytes, ever.
- State your exact modelId. Dense tables, file:line, measured numbers. Em dashes without spaces.
- Demo: localhost:4188 (built) · localhost:5199 (dev).`

const SUBSTRATES = [
  { key: 'blob', route: '/substrates/blob', src: 'src/components/blob' },
  { key: 'aurora', route: '/substrates/aurora', src: 'src/components/aurora' },
  { key: 'fourier-field', route: '/substrates/fourier-field', src: 'src/components/fourier-field' },
  { key: 'constellation', route: '/substrates/constellation', src: 'src/components/constellation' },
  { key: 'watercolor-dot', route: '/substrates/glass-material', src: 'src/components/watercolor-dot' },
]

phase('Ledger')

const [live, ...statics] = await parallel([
  // The one browser-owning seat — all five substrates, serially.
  () => agent(`${CANON}

---

You are the LIVE LEDGER seat — the ONLY browser owner. Visit each substrate story serially at 1440×900:
${SUBSTRATES.map(s => s.route).join(' · ')} (correct any route against the demo router first).

Per substrate: screenshot the hero at rest AND after interaction (hover/click/poke where offered);
screenshot its CONFIGURATOR panel; measure via evaluate_script — canvas CSS vs backing size (DPR
honesty), configurator panel width/height vs viewport (the "too cramped" F09 axis), whether the
configurator occludes the stage, control count vs visible-without-scroll count, and whether any control
change produces a visible stage delta within 1s (screenshot-diff two controls per substrate — a control
that changes nothing visible is a DEFECT row). For the blob specifically: fire the Poke/click impulse and
screenshot the response sequence (3 frames) — does ANY satellite separate?

RETURN per substrate: EFFECTS observed (what it actually does on screen, with numbers), DEFECTS observed
(what fails/clips/occludes/does nothing), and the configurator's measured geometry. Facts only — the
boon/bane judgment belongs to the static seats and the fold.`,
    { label: 'ledger:live', phase: 'Ledger', model: 'opus', effort: 'high' }),

  // Five static seats — source-side boons/banes. NO browser.
  ...SUBSTRATES.map(s => () =>
    agent(`${CANON}

---

You are the STATIC LEDGER seat for **${s.key}** (\`${s.src}\`). NO browser — source, git, and the banked
corpus only.

Produce the two-sided ledger the owner asked for:
- **BOONS** — what this substrate genuinely has that is worth keeping: real capabilities, good
  architecture, prior investment that still pays (cite file:line; cite the banked specs where they
  already ruled).
- **BANES** — what it costs: complexity, dead facilities, comment stock, dual paths, perf hazards,
  overfit knobs, false promises in its README/story copy (cite; check claims against the code).
- **EFFECTS** — the intended observable behaviours, as designed (from source + shaders).
- **DEFECTS** — known + newly found: cross-check ROUND-1-FINDINGS ids, the terminal specs, EXEC-STATE's
  measured rows; then read the shaders/composables yourself for defects nobody has banked yet.
- **CONFIGURATOR** — its story's configurator: which controls map to real uniform/prop changes, which
  are decorative, what is MISSING that the substrate could express (the expressiveness gap).

Rank every row by consequence. Cite by id where a banked finding exists — never restate.`,
      { label: `ledger:${s.key}`, phase: 'Ledger', model: 'opus', effort: 'high' })),
])

const LEDGER = `## LIVE OBSERVATIONS (browser seat)\n${live || '(seat died — static only)'}\n\n${SUBSTRATES.map((s, i) => `## STATIC LEDGER — ${s.key}\n${statics[i] || '(seat died)'}`).join('\n\n')}`

phase('Design')

const DESIGNS = [
  {
    key: 'blob-physics',
    brief: `DESIGN LANE: **THE BLOB PHYSICS — the charter made real.** GF-BLOB-PASS3 is the prior; the
charter AMENDS it. WebGPU only (ruled).

Design the satellite system: (1) **fission** — when and how a satellite separates from the core (the
click impulse is the natural trigger; binding energy vs impulse); (2) **orbit** — natural, chaotic,
elliptical; NOT a rigid Kepler animation — perturbed orbits that never repeat exactly; (3) **recursion**
— each satellite is a Blob instance with potential sub-satellites; decide the depth bound and the LOD
law; (4) **meatballing** — separated bodies still merge fields when near: the architecture question is
ONE shared field evaluated from many sim bodies (satellites contribute to the parent's field texture)
versus per-instance fields composited — decide it, with the WGSL cost arithmetic (metaball.wgsl already
ships sceneDistG/sminG/softShadow2D — build on them); (5) **coordination vs emergence** — the owner
explicitly authorizes the EXPERIMENT: prescribed orbit choreography up the tree, versus local forces
only (parent attraction + near-repulsion + field cohesion) letting orbital behaviour EMERGE.
**Run the experiment.** Write a small 2D sim prototype in ${SCRATCH}/proc/blob-sim/ (plain JS/canvas or
node, no repo bytes), implement BOTH regimes, measure: orbit stability over 60s, separation-event
naturalness, ellipse eccentricity distribution, chaos (sensitivity to seed), and CPU cost per body.
Report the numbers and pick a winner — or a hybrid (coordinated skeleton + emergent detail).
Also: mood coupling (how valence/arousal modulate orbit energy and fission rate) and the settled-seam
question GF-BLOB-CRIT2 F3 raised (never-park vs the public \`settled\` seam).`,
  },
  {
    key: 'gf-fourier',
    brief: `DESIGN LANE: **GF-FOURIER — the greenfield mint.** The owner: "fourier-field — a complete
mess… shall greenfield." Tier-2's KEEP-THIN is overruled; its CONTENT binds: WGPU-only, its 8
corrections (read them in COMPONENT-WAVES-TERMINAL-2.md § FOURIER-FIELD), and the LIVE slides consumer —
the greenfield must state the public surface slides keeps or the exact relay addendum its tranche gets.

First principles: what IS this substrate FOR? A Fourier field can be the most beautiful thing in the
library — epicycles, wave synthesis, harmonic decomposition drawn live — or a noise wallpaper. Decide
its identity (the D11 gap matters: it advertises \`interactive\` but exposes nothing to keyboard/AT).
Design: the visual identity (cartoon-technicolor applies — no more same-hue-as-the-wallpaper), the
interaction model (what does touching it MEAN), the recursion into the motion canon (springs, liquid
weight), the WGSL architecture, the configurator that makes its parameters EXPRESSIVE, and the story.
2,897 LOC today (1,921 code) — state the target with arithmetic.`,
  },
  {
    key: 'config-express',
    brief: `DESIGN LANE: **CONFIGURATOR EXPRESS — deft.** The extant anatomy (\`34681df9\`, one
configurator across every studio) is "rather alright" — this is a REFINEMENT, not a rework. The owner
asks exactly: **larger** (the F09 "too cramped" lineage — use the live ledger's measured geometry),
**proper expand buttons** (the A01 modal-expansion precedent: expand a configurator — or a single
control — into a modal/overlay working surface; decide the mechanism on the canonical series and the
overlay register), **expressive** (controls should SHOW what they do — value previews, live micro-
thumbnails, felt response; a control whose change is invisible is a defect), **configurable** (per-story
control curation instead of dumping every prop). Derive the geometry from PROPORTION.md (panel widths,
paddings, the expand target sizes). Name every touched file and keep the diff DEFT — if the design
exceeds ~a dozen file touches, it has become the rework the owner forbade.`,
  },
]

const designArms = await pipeline(
  DESIGNS,
  (d) => parallel([
    () => agent(`${CANON}\n\n---\n\nYou are a DESIGN ARM (one of two, independent).\n\n${d.brief}\n\n---\n\nTHE LEDGER (evidence):\n${LEDGER}\n\nBe concrete enough to implement from your text alone. Cite the ledger rows you are curing.`,
      { label: `${d.key}:opus`, phase: 'Design', model: 'opus', effort: 'xhigh' }),
    () => agent(`${CANON}\n\n---\n\nYou are a DESIGN ARM (one of two, independent).\n\n${d.brief}\n\n---\n\nTHE LEDGER (evidence):\n${LEDGER}\n\nBe concrete enough to implement from your text alone. Cite the ledger rows you are curing.`,
      { label: `${d.key}:fable`, phase: 'Design', model: 'fable', effort: 'xhigh' }),
  ]).then(([o, f]) => ({ d, opus: o, fable: f })),
  ({ d, opus, fable }) => {
    const arms = [fable, opus].filter(Boolean)
    if (!arms.length) return null
    if (arms.length === 1) return { key: d.key, apotheosis: arms[0] }
    return agent(`${CANON}

---

You are the TRI-FOLD ADJUDICATOR for the **${d.key}** lane (owner law 2026-07-25). Two arms — one Fable,
one Opus 5 — designed from the same brief and ledger. Agglomerate them, with serious sagacity and
INCREDULITY, into the apotheosis.

Incredulity: shared claims get spot-checked against disk (you may read files and, for ${d.key === 'blob-physics' ? 'the sim: re-run the prototypes in the scratchpad and check the reported numbers' : 'the ledger: re-pull the cited rows'}) before adoption; agreement is not truth. Disagreement is signal — reproduce and RULE, never
average. Stronger spine, better organs, every loser in §REJECTED with its falsifier. If one arm is
superior wholesale, adopt it and say why. The result must be buildable from your text alone.

===== FABLE ARM =====
${fable || '(died)'}

===== OPUS ARM =====
${opus || '(died)'}`,
      { label: `${d.key}:apotheosis`, phase: 'Adjudicate', model: 'fable', effort: 'xhigh' })
      .then(a => ({ key: d.key, apotheosis: a }))
  }
)

const done = designArms.filter(Boolean)
log(`${done.length}/3 design lanes adjudicated`)

phase('Fold')

const fold = await agent(`${CANON}

---

You are the PROCEDURAL FOLD (Fable). Inputs: the five-substrate two-sided ledger and three adjudicated
designs. Produce the terminal artefact body for \`PROCEDURAL-LEDGER.md\`:

**1 · THE LEDGER, UNIFIED** — per substrate (blob, aurora, fourier-field, constellation,
watercolor-dot): boons · banes · effects · defects · configurator verdict, each row ranked, live and
static merged, banked ids cited never restated.
**2 · THE THREE DESIGNS** — blob-physics (with the experiment's measured verdict: coordinated vs
emergent vs hybrid), GF-FOURIER, configurator-express — each as its adjudicated apotheosis, plus your
cross-lane reconciliation: collisions (files/tokens/registers claimed twice — rule ONE owner),
canonical-series compliance, gate budget (born-RED only, no gate that cannot fail).
**3 · ROUTING** — what folds into the in-flight GF-BLOB and GF-AURORA lanes AT THEIR BOUNDARY (they have
frozen prompts and may not claim these rulings themselves); what the slides relay addendum must say for
GF-FOURIER; what W-CONFIG-EXPRESS touches vs what W-CONFIGURATOR-STD already owns.
**4 · WHAT NO LANE OWNS** — every ledger defect assigned to a named wave or explicitly retired with
rationale. Silent drops forbidden.

Dense tables. Em dashes without spaces.

THE LEDGER:
${LEDGER}

THE DESIGNS:
${done.map(x => `\n\n===== ${x.key} — APOTHEOSIS =====\n${x.apotheosis}`).join('')}`,
  { label: 'fold:procedural', phase: 'Fold', model: 'fable', effort: 'xhigh' })

return { fold, lanes: done.map(x => x.key), hadLive: !!live }
