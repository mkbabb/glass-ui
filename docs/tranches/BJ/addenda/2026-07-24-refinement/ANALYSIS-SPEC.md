# THE ANALYSIS SPEC — the dimensions every subject is examined on

The audit dimensions, brainstormed to a fixed spec so that every component, page, module and graph node is
examined the same way and nothing is examined twice. **Every workflow in this refinement consumes this
file.** A seat that invents its own dimensions is producing incomparable output.

**Method, universal:** each subject is challenged **thrice** — three benches that each *assume a different
thing is wrong* — then adjudicated by a **triumvirate jury**, then re-authored terminally by a foreman.
The benches must genuinely disagree; a fleet where all three agree on first pass has not been challenged.

---

## THE THREE STANDING BENCHES

| bench | assumes | asks |
|---|---|---|
| **DESIGN IS FLAWED** | the thing is ugly, lifeless, or disproportionate | is the visual weight where the meaning is? |
| **LIBRARY IS IMPROPERLY STRUCTURED** | it is in the wrong place, or should not exist | does this belong here, at this granularity, under this name? |
| **IMPLEMENTATION IS WRONG** | it is buggy, inaccessible, or slow | does it work, for everyone, every time? |

Adjudicated by three jurors — **design**, **architecture**, **evidence** — where the evidence juror
overrules anything without a file:line, computed value, screenshot observation or command output,
**including claims in the spec under review**.

---

## D1 · HISTORICAL ASSAY

Wave history, tranche history, the current addenda set. For any subject: was it chartered before? Did the
wave land? Was it marked closed against the owner's own artefact (**Law 6**) or against a neighbour?

- Prior-closure verdict ∈ NEVER-ADDRESSED · PROSE-ONLY · GATE-ONLY · WRONG-REFERENT · BYTE-UNCHANGED ·
  RULED-NO-CHANGE · MISDIAGNOSED · FALSELY-OPEN · REGRESSED · FIXED.
- Measure against the **pre-complaint commit**, not against the last commit that touched the file.
- A row riding ≥2 closes is a **disease row**: deciding it is a wave of its own, and re-booking it is
  forbidden.

## D2 · CURRENT VISUALS

Every page, component and **state** — rest, hover, press, engaged, disabled, focus-visible, empty, loading,
error, overflow — in light and dark, desktop and mobile, Chromium and WebKit.

- Paired π/DELTA captures for every visual claim: route, engine, viewport, before/after.
- A capture whose DOM node count is far from the working baseline is **VOID, not passing**.
- Fine-grained telemetry via chrome-devtools MCP; **Safari via `safaridriver`, which requires
  Safari → Settings → Developer → Allow Remote Automation.** Until that is on, no Safari result is
  admissible and the cell is recorded as owed.

## D3 · MODULE STRUCTURE — the colocation and directory edicts

The settlement of the file/directory explosion, in **both** library and demo. Rules, applied literally:

- **Colocation.** A component owns its sub-components, composables, constants and styles. Only genuinely
  module-level things live in shared `composables/` or `styles/`.
- **Goldilocks granularity.** Too macro → god-modules. Too micro → sand. A long-running directory is
  either **pruned**, or **agglomerated at the function/class level**, or **grouped into logical
  sub-modules**.
- **Module-name stripping — a general de-duplication mechanism.** A file inside a module strips the
  module's name: `animation/compile/easing/{easing-option,easing-config}` → `easing/{option,config}`.
  The path already says `easing`; repeating it is noise.
- **Tests are NEVER colocated.** They live in a tree **isomorphic to source** — `src/a/b/c.ts` →
  `tests/a/b/c.test.ts`. No test file inside `src/`.
- Follow the glass-ui flattening and component-structuring idioms; do not invent a second convention.

## D4 · GREATER LIBRARY IMPACT

What does this subject cost or give the library as a whole? Export-map surface (**72 subpaths**), root
barrel membership, peer-dependency reach, bundle contribution, whether it forces a heavy peer onto a light
path.

## D5 · STORY PLACEMENT AND DEMONSTRATION

Does the demo show the thing, in the right category, at the right altitude? Is the story a specimen, a
tutorial, or a dumping ground? Does the landing tile resolve to real content? Is a story earning a route,
or should it fold into a neighbour?

## D6 · ANIMATION AND DESIGN AFFORDANCE

Against `MOTION-CANON.md`: the corrected six-row spring table, the lead/lag **rank** system, the material
split law, exit asymmetry (`EXIT = 0.6 × ENTRY`, never a spring, never overshoot past gone).

- What moves, on what curve, at what rank, and does it carry weight or tick mechanically?
- Is the affordance discoverable **before** interaction?

## D7 · GLASS PRINCIPLES

Against the measured frost target — mean luminance −2%, σ **80% kept**, high-frequency detail 10% kept,
saturation **+62%**. Near-zero veil + heavy blur + strong saturate.

- **Every glass surface must resolve a non-`none` `backdrop-filter`.** Two named surfaces currently do not.
- Frosted, not shiny: alpha and blur carry the material; the specular rim is a hairline and stays one.
- **No chrome-special behaviour.** No engine-conditional glass arm. No masking fallback — the primary
  works in paint or fails loud, and a primary that paints worse than its own fallback is a defect.

## D8 · DE-SHADCN-IFICATION

Where does the code still read as a shadcn/reka port rather than as ours? Vestigial variant maps, class
strings that encode someone else's design language, `cn()` pileups, prop names that describe a foreign
idiom, wrappers that add nothing. Ours is warm cream, deft rounding, frosted glass — say where it isn't.

## D9 · PERFORMANCE

Boot to first paint; chunk count and median size; rAF that never stops; observers without teardown; layout
thrash; GL/GPU context count per route; eager imports of heavy substrates; **whether the route ever reaches
a quiescent frame**.

## D10 · BREATH OF LIFE / MOVEMENT OF MOMENTUM

- **Breath is a floor, not a loop.** A control at rest shows engagement by a non-zero material response to
  the pointer field, truthful state reporting, and a ≤1-frame answer to any state change. It carries **no
  decorative idle animation**. Only an ambient substrate may idle, at period ≥1 s with a clamped amplitude
  floor.
- **Liquid weight is universal.** All motion carries inertia, weight and bounce appropriate to the job —
  smooth, never sharp.

## D11 · STATE AFFORDANCE

Is every state *reachable*, *visible*, and *announced*? Keyboard path for every mouse affordance; focus
trap and restore; ARIA that tells the truth; live regions; reduced-motion arm; 44px coarse targets.

## D12 · DESIGN HIERARCHY AND ARISTOTELIAN PROPORTION

The proportionality audit, applied to cards, components, margins, paddings, dividing lines and small UI
elements. **Two directions, both mandatory** — an audit that only subtracts is half an audit:

- **SUPERFLUOUS** — elements that are duplicative, distracting, or decorative without carrying meaning.
  Mark for removal.
- **INSUFFICIENT** — places where *more* affordance is needed: a state with no signal, an action with no
  invitation, a boundary with no edge.

Proportion is a **ratio question**, not a token question: is this divider carrying its weight against the
gap beside it; is this padding in the same series as its siblings; does the radius express the role.

---

## THE RULES OF JUDGEMENT

1. **Evidence bar.** file:line, computed value, screenshot + what is visible, or a command and its output.
   Claims about documents are not findings.
2. **Consumer count is NOT sufficient grounds for deletion.** Deletion is granted on **vacuity or
   superfluity** — that the thing does nothing, or that something else already does it. Conversely, a
   single consumer never *saves* a component. 42 of 62 components have zero `src` consumers; that is a
   prompt to ask the question, not an answer to it.
3. **No quick solutions, no workarounds.** Idiomatic, gestalt approaches. Architectural transposition for
   elegance, simplicity and performance is desirable. **Breaking changes are allowed.**
4. **No legacy code.** Clean breaks: no aliases, no migration shims, no dual paths, no masking fallbacks.
5. **Pithy, laconic, fastidious.** More code and more complexity are not better. A finding that proposes
   net additional machinery must justify it against deletion first.
6. **Localising a defect and knowing its remedy are two different results.** Do not prescribe a cure you
   have not tested. This has already cost this refinement one wrong prescription.
7. **Born-RED or it is not a gate.** A gate that would pass at HEAD certifies itself on arrival. Budget:
   40–60 for the whole library.
