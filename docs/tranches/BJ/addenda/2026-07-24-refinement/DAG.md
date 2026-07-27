# THE COMPONENT AND LIBRARY GRAPH — deterministic half

The ask was a component/library graph built **both deterministically and by inference**, with nodes
carrying metadata, styling, purpose, animation and affordances, to answer one question: *are there
duplicative components outright, and where is structure shared between whole components?*

This is the **deterministic half**, computed at HEAD. It is the delineation the inference pass consumes,
and it is authoritative for every count in the refinement corpus. Generator:
`scratchpad/dag3.mjs` → `scratchpad/dag-deterministic.json` (62 nodes, full feature vectors).

---

## 0. THE METHOD, AND WHY THE FIRST TWO ATTEMPTS WERE WRONG

Recorded because both failures are instructive and both are easy to repeat.

**v1 (the prior tranche's isomorphism inference)** scored similarity as a single Jaccard over CSS classes.
Its two loudest signals were both wrong in opposite directions: it scored **alert ≈ toast at ~1.0** (they
legitimately share `_shared/feedback/feedback-tone.css` — correct sharing, not duplication) and scored the
**four procedural fields low** (they share composables and a substrate, not classes). A single feature space
cannot carry this question.

**v2 (this lead's first pass)** was refuted by its own output. It reported `aurora ~ search` at css = 1.0.
Investigating: both components had exactly **one** extracted class token — `glass-ui`, harvested out of a
*comment* — so the Jaccard of two singleton sets was 1.0 by artifact. Props and reka-primitive extraction
returned **zero for every component**, so four of six feature spaces were silently dead and the "≥2 spaces
agree" bar was being met by noise.

**v3, the method that survives:**

1. **Strip comments before extracting anything.** Prose is 34% of the component tree; an extractor that
   reads it produces the v2 artifact.
2. **Parse, don't grep, for structure.** `defineProps<{…}>`, `withDefaults`, `interface *Props`,
   `defineEmits`, and `import {…} from "reka-ui"` are parsed as balanced constructs.
3. **Seven independent feature spaces**, never collapsed into one number: CSS classes · props · reka
   primitives · shared composables · ARIA/roles · design tokens · springs.
4. **Degenerate sets return `null`, not a score.** A space with fewer than 4 members on either side cannot
   support a similarity claim. This alone killed every one of v2's 30 "candidate pairs".
5. **A pair is a candidate only when ≥2 independent spaces agree at ≥0.5.** One space agreeing is a known
   false-positive mode in both directions.

> The generalisable lesson, which is the transferable part of this exercise: **a structural-similarity
> metric over a component library must be multi-space, comment-blind, and degenerate-set-guarded.** All
> three failures above are single-line bugs that produce confident, plausible, entirely false verdicts —
> and in v1's case one drove a proposed 6,000-line restructure.

---

## 1. THE HEADLINE — the duplication hypothesis is largely REFUTED

The original ask named "several instances of near exact component duplication, or superfluity thereof."
The graph separates those two claims and they do not fare alike.

**Duplication: one candidate pair in 1,891.** Applying the ≥2-space bar across all 62 components:

| pair | agreeing spaces | props | tokens |
|---|---|---|---|
| `checkbox ~ radio-group` | 2 | 0.60 | 0.50 |

**CSS classes: zero pairs score ≥0.34 anywhere in the library.** No two components share material
vocabulary to any meaningful degree. Whatever else is wrong here, components are *not* duplicating each
other's glass.

**Superfluity: overwhelmingly confirmed.** 42 of 62 components — **38,204 LOC, 67% of the component
tree** — have zero `src/` consumers. That is the real finding, and it is a different defect from
duplication: not *two components doing one job*, but *a component no one uses*.

> **The claim to carry forward is superfluity, not duplication.** A reduction plan that hunts for
> duplicate components will find one pair. A reduction plan that applies the consumer bar will find 42.

---

## 2. WHAT THE SINGLE-SPACE SIGNALS ACTUALLY SAY

Below the ≥2-space bar, individual spaces still carry real information — they simply cannot convict alone.
These are the leads the inference pass must adjudicate, each with its own reading.

### The binary-control triad — the strongest structural signal in the library

| pair | props Jaccard |
|---|---|
| `checkbox ~ switch` | **0.75** |
| `radio-group ~ switch` | 0.636 |
| `checkbox ~ radio-group` | 0.60 |

Three components, mutually similar on prop surface, all expressing *one bit of state with a label and a
disabled arm*. This is the closest thing to genuine duplication in the tree. It is **not** a delete
candidate — the three have different ARIA semantics (`checkbox` / `radio` / `switch` are distinct roles and
must stay distinct) — but their **prop surface, sizing, focus ring and engagement ladder should be one
shared control primitive**, with three thin semantic shells over it. That is a fold of *implementation*,
never of *role*.

### `input ~ textarea` — 0.591 on props

Already known to share `field-control.css` with number-field and tags-input. Confirms the field register is
real and correctly factored; no action beyond keeping them on it.

### `dialog ~ drawer` — 0.80 on reka primitives, the highest single score in the graph

The two overlays compose nearly the same reka surface. An earlier critic defended the split as a recorded
division of labour (drawer owns detent physics and drag-dismiss; dialog owns the concentric-radius relay and
side placements), and that defence cited real, verifiable capability. **This score does not overturn it —
but it is the graph's loudest unexplained edge and the inference pass must rule on it explicitly** rather
than inheriting either verdict.

### `blob ~ fourier-field` — 0.45 on shared composables

The procedural pair, sharing the WebGPU substrate. Consistent with the finding that
`src/composables/glass/` is already the shared chassis. Not a fold candidate.

### `command ~ dropdown-menu` — 0.60 on tokens

Shared overlay token vocabulary. Expected; both are presented chrome on the same ladder rung.

### The ARIA-space matches are mostly noise

`infinite-scroll ~ toast` (0.60), `sortable-list ~ toast` (0.60), `drawer ~ easing` (0.538) — these reflect
a shared *live-region and label* vocabulary, not shared structure. Recorded here so a later round does not
mistake them for findings. The one worth a look is `pager-dots ~ tabs` (0.571), which is consistent with the
selection-engine question already open.

---

## 3. API SURFACE — where the props actually are

Prop count is the honest measure of API surface, and it does not track LOC.

| component | props | src consumers | demo | note |
|---|---|---|---|---|
| **dock** | **35**† | 0‡ | 18 | †union across the family's 8 SFCs; `DockProps` itself is **14, of which 5 are object bags** (`overflow`, `interaction`, `layout`, `backgroundCanvas`, `search`). ‡the 7 src hits are leaks *inward*. |
| **constellation** | **25** | **0** | 2 | 25 props, 2,452 LOC, two demo stories, no consumer. The clearest overfit in the tree. |
| configurator | 19 | 1 | 9 | slated for demotion |
| **handmark** | **19** | **0** | 1 | 19 props for a single story |
| input | 18 | 1 | 9 | |
| **select** | 18 | **0** | 7 | |
| dialog | 17 | 2 | 10 | earned |
| **labeled-field** | 17 | **0** | 14 | 14 demo consumers — real use, but a 17-prop API |
| **tags-input** | 17 | **0** | 1 | |
| **slider** | 16 | **0** | 6 | owner-named for glass; API also unexamined |

Two object-bag props (`interaction`, `layout`) plus three more (`overflow`, `backgroundCanvas`, `search`)
mean **five of the dock's fourteen props are bags** — a bag is an unversioned, untyped-at-the-edge API that
defeats every prop-level gate. This is the concrete form of "the dock API is fully contrived."

---

## 4. WHAT THE INFERENCE PASS MUST DO

The deterministic half cannot answer questions of *purpose*, and it should not pretend to. Handed forward,
with the standing rule that an inference must cite a node feature or it is not admissible:

1. **Rule on `dialog ~ drawer` (reka 0.80).** The graph's loudest edge. Fold, keep-split, or re-cut the
   boundary — with the capability list, not the score, as the deciding evidence.
2. **Design the shared binary-control primitive** under checkbox / switch / radio-group. Roles stay
   distinct; implementation converges.
3. **Adjudicate the 42 zero-consumer components** against purpose, not size. The consumer bar is necessary
   but not sufficient — `labeled-field` has 14 demo consumers and no src consumer, which is a *library*
   fact, not a *demo* fact.
4. **Answer the affordance question the graph cannot see:** which components display engagement at rest,
   which are lifeless, and which idle decoratively (the graph counts `raf` and `transition` occurrences but
   cannot tell breath from waste).
5. **Rule on `constellation`** — 25 props, 0 consumers, 2 stories, 2,452 LOC, and no GPU stack of its own.

---

## 5. NODE SCHEMA

Each of the 62 nodes in `dag-deterministic.json` carries:

```
component · files · loc · code · comment · commentPct · sfcs · cssFiles
props[] · propCount · emits[] · reka[] · composables[] · importsComponents[]
cssClasses[] · classCount · tokens[] · springs[]
anim { transition · keyframes · raf · prm }
a11y { aria[] · roles[] · focusVisible · keydown · tabindex }
srcConsumers[] · srcConsumerCount · demoConsumers
```

Regenerate with `node scratchpad/dag3.mjs`. The generator is deterministic and takes ~40 s; it is the
source of record for component counts, LOC, comment share, prop surface and consumer census throughout
this refinement.
