export const meta = {
  name: 'bk-canon-opus',
  description: 'Opus re-authoring: motion canon from the salvaged exemplars + adversarial critique/judge of the reduction + cross-fold',
  phases: [
    { title: 'Canon+Critics', detail: 'motion canon, ios27 archive, two adversarial critics on the reduction' },
    { title: 'Judge+Fold', detail: 'reduction judge, then the cross-fold' },
  ],
}

const REPO = '/Users/mkbabb/Programming/glass-ui'
const SP = '/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad'

const EDICTS = `
STANDING OWNER EDICTS (law):
- BREATH OF LIFE: every interactive component always displays engagement.
- MOVEMENT OF MOMENTUM / liquid weight: inertia, weight, bounce appropriate to the job. SMOOTH, not sharp.
- GOAL OF GLASS: blurred and FROSTED. The owner: our tabs and slider glass are "far too trite, shiny, and
  bright - not like blurred and frosted glass."
- NO chrome-special behaviour for any glass item. No masking fallbacks: primary works in paint or fails loud.
- NO legacy code: no aliases, shims, dual paths.
- Extreme parsimony, KISS-forward. Aristotelian proportion.
- We do NOT want a trite recreation of iOS. Our own design language wins on SKIN (warm cream paper, deft
  rounding, our palettes, our glass); the exemplar wins on GRAMMAR and PROPORTION only.
- Safari/WebKit is a first-class target. Mobile is first-class.
`

const LEAD_FACTS = `
LEAD-VERIFIED FACTS (trust these):
- 86,899 src lines; 58,549 are components; 34.4% of src is comment.
- Five giants are 50% of component code: aurora 9205, dock 8046, blob 6028, constellation 2993, fourier-field 2950.
- deck: 277 LOC, exported, ZERO usage sites anywhere. Zero-src-usage: paper-backdrop, animated-digit,
  header-ribbon, scroll-progress-rim.
- S0: the published package hard-requires a peer it declares optional; the type surface is empty under
  moduleResolution node16/nodenext.
- S0: aurora-mediums.wgsl.ts:399-401 collapses oil/vangogh/oil-pastel/kuwahara into one mediumKuwahara()
  call on the live WebGPU primary. The WebGL2 fallback is RICHER than the primary.
- S0: the demo crashes Playwright-WebKit deterministically (5/5) on every route, dev and bundled, Chromium
  fine, zero page errors. Not canvas/WebGL/WebGPU/rAF. Blocking CSS prevents it. The bundle ships a single
  318KB stylesheet plus 74 chunks. (Playwright WebKit is the engine build, not the Safari app.)
- Four of eight springs ship MONOTONE (smooth, press, dock, orb-drop: overshoot +0.0%) while their register
  text promises weight and rebound. src/styles/tokens/scheme-spring.css, generated from
  src/composables/motion/spring/springPresets.ts.
- SectionPreviewCard has NO preview: its thumbnail div contains only the section's own name; 77 of 87 story
  routes land on it, and the title renders twice.
- npm test is RED at HEAD; the governed gate battery exists only in the working tree.
- 1,095 it() cases across 217 files against a mandated 40-60 invariant gates.
`

phase('Canon+Critics')

const batch1 = await parallel([
  () => agent(`You are the Opus seat authoring THE MOTION CANON for the glass-ui library at ${REPO}.

${EDICTS}
${LEAD_FACTS}

Five frame-by-frame exemplar analyses were completed against iOS 26/27 captures (Apple Music, ChatGPT,
Gemini/Siri pull-down, Siri invocation, and the Photos long-press context menu). Read them in full:

${SP}/exemplars.json

Read that file with the Read tool. It contains, per exemplar: observations with frame evidence and derived
millisecond timings, quantified motionSpecs (durations, curve-shape estimates with the frame arithmetic
that produced them, lead/lag offsets), and an ourGap statement naming our source files.

Also read our current motion surface directly:
- ${REPO}/src/composables/motion/spring/springPresets.ts (the generating table)
- ${REPO}/src/styles/tokens/scheme-spring.css (the generated tokens + the register prose)
- ${REPO}/src/styles/glass/reveal.css and ${REPO}/src/styles/transitions.css (the entry/exit grammar)
- ${REPO}/src/styles/glass/ladder.css (the five-rung material ladder)

Produce THE MOTION CANON. It must be implementable without a follow-up question:

1. THE CORRECTED SPRING TABLE. For each preset: (response, dampingFraction), the ONE job it owns, and the
   exemplar measurement that sets it. Four rows currently ship monotone against register text promising
   rebound — fix them or delete them. REDUCE the count if two presets own the same job. State for each
   whether it changed and why.
2. THE LEAD/LAG LAW. In a compound transition, what leads and by how many ms. The popover exemplar gives
   this precisely: pressed object leads at t0, environment lags ~33ms, presented plate lags ~50ms, and on
   EXIT the order reverses with the world recovering last. Generalise it to a rule our components follow.
3. THE MATERIAL SPLIT LAW. The exemplar is strict: content is never frosted, chrome is never solid; the
   world is DIMMED, never blurred; all frost is plate-local. State this as a rule and name which of our
   five ladder rungs each role maps to. Note the direct consequence for our scrim/backdrop work.
4. THE ENGAGEMENT LADDER. rest -> hover -> press -> engaged -> modal. For each rung: what changes, by how
   much, on what curve. This is what turns BREATH OF LIFE from a slogan into something a gate can check.
5. THE GRADIENT-BLUR FOCUS primitive (the ChatGPT slider + the owner's F49/F50 OpenAI reference). Exact
   mechanism, the tokens it needs, its consumers.
6. THE DOCK PRIMITIVE SET. The Music exemplar's double-dock -> collapse -> fission choreography. We retired
   useDockFission and useDockOrientationMorph claiming "the platform cannot continuously interpolate a
   flex-column->row topology change". The exemplar analysis concludes that claim is TRUE BUT IRRELEVANT
   because iOS never interpolates layout topology either - it measures two end states and bridges them with
   transform + crossfade. Rule on the retirements and enumerate the minimum primitive set.
7. EXIT ASYMMETRY. Exits are faster than entrances, fade-led, and never spring or overshoot. State the rule.
8. SAFARI VERDICT per primitive: paints / needs a different mechanism / forbidden. Given the WebKit crash
   above, be conservative and say what must be proven.
9. WHAT WE MUST NOT COPY. Where the exemplar's choice conflicts with warm cream + deft rounding + frosted
   glass, name our alternative.

Return thorough markdown. Include your exact modelId at the top.`,
    { model: 'opus', label: 'CANON:motion', phase: 'Canon+Critics' }),

  () => agent(`You are the Opus seat performing the iOS 27 ARCHIVE analysis for glass-ui at ${REPO}.

${EDICTS}

The owner: "All of our previous tranches that performed in depth analysis of '/Users/mkbabb/Downloads/New
Folder With Items 4' should be re-done in a similar manner, with our breath of life edict, and full
component set, too."

SOURCE: /Users/mkbabb/Downloads/New Folder With Items 4 — 8 screen recordings and ~17 stills.
Two stills the owner cited explicitly: /Users/mkbabb/Downloads/IMG_2287.PNG and IMG_2288.PNG — the OpenAI
popup whose SUBTLE blurring and gradient-blur-behind-the-element they want us to study (rows F49/F50).
An earlier frame extraction exists at /Users/mkbabb/Downloads/ios27-micro-frames-2026-07-17/ (844 items).
You may run ffmpeg to extract frames into ${SP}/frames/archive/ (create it). Write NOWHERE else.

The prior tranche's conclusions are at ${REPO}/docs/tranches/IOS27-MICRO/ and
${REPO}/docs/tranches/BJ/formation/ios27/. Read enough to CHALLENGE them rather than repeat them.

Deliver:
1. A component-by-component mapping: each iOS 27 element visible in the archive -> its glass-ui counterpart
   -> the delta, with the file path.
2. THE GRADIENT BLUR BEHIND AN ELEMENT (IMG_2287/2288), characterised exactly: is the blur RADIUS graded
   with distance, or is a uniform blur masked by a gradient? Where is it strongest? Does the dim co-grade?
   Getting this mechanism right is the whole of F50 — be precise and say how you can tell from the pixels.
3. THE NOTIFICATION AFFORDANCE: "mark how the notification x on this image is in the top left corner, and
   outside of the element partially, sitting on the corner border." Find it; give exact offset, size, and
   how it composites over the corner.
4. THE VAPORIZE/DISSOLVE dismissal the owner wants redeployed: mask erosion, per-particle scatter,
   blur-and-fade, or displacement? Give the timing and the implementable mechanism.
5. Where the PRIOR tranche was wrong or thin, say so with the document cite.
6. Which glass-ui components should receive each effect, by file path.

Return thorough markdown. Include your exact modelId.`,
    { model: 'opus', label: 'CANON:ios27', phase: 'Canon+Critics' }),

  () => agent(`You are an ADVERSARIAL Opus critic. Repository: ${REPO}.

A component-reduction proposal was produced from a deterministic 62-node component graph plus an
isomorphism-inference pass. Read BOTH here:

${SP}/dag-text.json   (a JSON array of two long markdown strings: [0] = the isomorphism inference,
                        [1] = the reduction proposal)
${SP}/dag-nodes.json  (the 62 extracted component nodes: props, slots, emits, deps, tokens, css classes,
                        animation, affordances, purpose, loc, exported)

${LEAD_FACTS}

Your default assumption: THE PROPOSAL IS WRONG. Attack it on CORRECTNESS OF FACT and go to the source:
- Does each component it deletes actually have the usage profile claimed? Run ripgrep across src/ and demo/
  separately. Check package.json exports.
- Does each proposed FOLD actually work? For every "fold A into B", read A and B and find the capability of
  A that B cannot express. If you find one, the fold is wrong as stated.
- Are the claimed isomorphisms real, or do they collapse genuinely distinct state machines? A Slider and a
  Progress look alike and are not: one is an input with a pointer contract and keyboard semantics, the other
  is a readout. Test EVERY claimed class that way.
- Does any deletion break a documented public API with no stated migration?
- Does the arithmetic add up — do the claimed LOC deltas match the files?
Report each defect with file:line or command output. No style opinions. Return markdown with your modelId.`,
    { model: 'opus', label: 'CRIT:fact', phase: 'Canon+Critics' }),

  () => agent(`You are an ADVERSARIAL Opus critic. Repository: ${REPO}.

Read the isomorphism inference and reduction proposal at ${SP}/dag-text.json (array of two markdown
strings) and the 62 component nodes at ${SP}/dag-nodes.json.

${EDICTS}
${LEAD_FACTS}

Your default assumption: THE PROPOSAL IS WRONG. Attack it on DESIGN AND STRATEGY:
- Does the reduction make the library BETTER, or merely smaller? Name every fold that saves lines while
  making the API harder to use or the design language weaker.
- Does it preserve what makes this library distinctive? The owner's core is "glass, animation, procedural
  animation... into a perfected union", under BREATH OF LIFE and MOVEMENT OF MOMENTUM. A reduction that
  deletes the substrates that make it distinctive has failed even if the arithmetic is right.
- Conversely: does it protect anything from sentiment? The five giants are 50% of component code and
  several have almost no consumers. Apply the owner's own >=2-consumer bar to them, hard.
- Is the ORDER right? Does any fold land before the primitive it needs?
- Is anything deferred that "no deferrals" forbids?
- The owner has ruled the DOCK API "fully contrived and should be replaced". Does the proposal reckon with
  that, or thin around the edges of an 8046-LOC component that needs replacing?
- Does it address that 34.4% of src is comment and that the token files are up to 80% comment?
Return markdown with your modelId.`,
    { model: 'opus', label: 'CRIT:design', phase: 'Canon+Critics' }),
])

phase('Judge+Fold')

const judge = await agent(`You are the Opus JUDGE ruling on the component reduction for ${REPO}.

THE PROPOSAL (read the file; it is an array of two markdown strings, [0] inference and [1] reduction):
${SP}/dag-text.json
THE NODES: ${SP}/dag-nodes.json

CRITIQUE A — FACT:
${batch1[2] || '(failed — note this as a coverage gap)'}

CRITIQUE B — DESIGN/STRATEGY:
${batch1[3] || '(failed — note this as a coverage gap)'}

${EDICTS}
${LEAD_FACTS}

Rule on every finding: SUSTAINED (the proposal changes) / OVERRULED (with the reason) / PARTIAL (state the
amendment). Then emit THE TERMINAL REDUCTION TABLE — one row per component, ALL 62 accounted for, no silent
drops. Columns: component · LOC · verdict (KEEP / KEEP-THIN / FOLD-INTO-x / DEMOTE-TO-DEMO / DELETE /
GREENFIELD) · rationale in one sentence · what breaks and who updates · expected LOC delta.

Owner rulings already made — treat as decided, do not re-litigate:
- instrument-chassis, metric: REMOVED (F18). completion-seal: overfit, belongs in speedtest (F26).
- deck: zero usage sites. carousel: below the >=2 bar. timeline: redesign from the ground up (F16).
- compositions section: prune (F43/F44/F45). tempo/reveal/scroll pages: fold (F30/F32/F42).
- DataTable: keep and thin. HandMark: keep but greenfield from first principles.
- Dock: the API is contrived and should be replaced.

Then state:
- Total LOC removed and the resulting component count.
- The SHARED PRIMITIVES the folds create: name, 3-line API, consumer list.
- The strict order the folds must happen in, with the reason for each edge.
- Convergence as an honest percentage with the exact enumerated open gaps. Do not round up. For each gap
  name the fact that would decide it and who produces it.

Return thorough markdown with your modelId.`,
  { model: 'opus', label: 'JUDGE:reduction', phase: 'Judge+Fold' })

const fold = await agent(`You are the Opus cross-fold seat for ${REPO}.

=== A. THE MOTION CANON ===
${batch1[0] || '(failed)'}

=== B. THE iOS 27 ARCHIVE ANALYSIS ===
${batch1[1] || '(failed)'}

=== C. THE TERMINAL COMPONENT REDUCTION ===
${judge}

${EDICTS}
${LEAD_FACTS}

Produce THE CROSS-FOLD — what none of the three could see alone:

1. COLLISION CHECK. The canon demands primitives (dock fission, gradient-blur focus, the engagement ladder,
   the dissolve, source-rect expansion). The reduction deletes and folds components. Find every place where
   the reduction removes something the canon needs, or the canon specifies motion for a component the
   reduction retires. Rule each collision.

2. THE SURVIVING SET, MOTION-COMPLETE. The post-reduction roster, and for each survivor: which rung of the
   engagement ladder it must implement and which motion spec governs it. A survivor with no engagement rung
   violates BREATH OF LIFE — give it one or delete it, and say which.

3. THE PRIMITIVE LAYER. Unify the reduction's shared primitives and the canon's motion primitives into ONE
   list. Per primitive: name, 3-line API, consumers, the tokens it owns, its WebKit verdict. This list is
   the real deliverable — it is what gets built first.

4. THE DOCK REPLACEMENT. Owner: "The dock API likely is fully contrived and should be replaced." Specify it:
   the primitive decomposition, the FULL public API, what it deletes, and how the Music choreography
   (double dock -> scroll collapse -> fission with controls left / search right / now-playing centre) is
   expressed without animating layout. This is a greenfield with a measured reference.

5. SEQUENCING. What must be built first for everything else to be cheap. Strict dependency order.

6. THE GATE BUDGET. The mandate is 40-60 invariant gates for the whole library; there are currently 1,095
   test cases. Propose the actual keep-list at the band grain — what each gate asserts and why it is an
   invariant rather than a restated token value.

Return thorough markdown with your modelId. Be decisive; the standing order is no deferrals.`,
  { model: 'opus', label: 'FOLD:cross', phase: 'Judge+Fold' })

return { canon: batch1[0], ios27: batch1[1], critFact: batch1[2], critDesign: batch1[3], judge, fold }
