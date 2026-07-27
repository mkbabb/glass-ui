# BJ REFINEMENT — the reduced owner ask

> **RESOLVED 2026-07-27 — see `RATIFICATION.md`.** The owner delegated the sitting ("Ratify the owner
> decisions with your best judgement"); R-1…R-6 are RULED at their recommendations, the §D blockers and
> the ruling batch are ruled there too. This file stays as the record of the questions as asked.

Date: 2026-07-24. **Six rows.** BJ's `ASK.md` carried thirty-three.

## Why it reduced from 33 to 6

Twenty-seven of BJ's rows were not open questions. They were **re-asks of things the owner had already
ruled**, in their own words, in `FEEDBACK-LEDGER.md` — or things a standing edict already decides. The
ruling surface became a blocker not because the questions were hard but because answered questions were
re-asked, and a pending row parks its wave.

Where a row is closed below, the closing authority is quoted. Nothing is closed by inference.

**The standing edicts doing most of the work:**

- *Consumer-updates ruling* — "consumer dependence never preserves an obsolete API; delete/shift on merit,
  the consumer updates via a marked addendum in ITS tranche." **One consumer never saves a component.**
- *Overfitting bar* — every `src/` artefact has ≥2 sites, or is exported and earned, or is a named private
  demo helper.
- *No backwards compat* — clean breaks; no aliases, shims, dual paths, masking fallbacks.
- *Presets in consumers* — the library's own default tokens evolve as its identity changes.
- *F03 parsimony* — extreme parsimony, KISS-forward, fewer lines.

---

## The six rows

### R-1 · `metric` — the owner contradicted the owner

**F18 (2026-07-17):** "`/data/metric` is to be removed — what of our grand pruning of overfit and
superfluous components?"
**CFR-01 (2026-07-23):** prescribes `MetricCell appearance="dashboard"` as the correct member for a
four-up summary grid — **an API that does not exist at HEAD.**

One says delete the family; the other says fix its shape for a live consumer. Both are yours, six days
apart. This is the only row in BJ where the ledger contradicts itself, and no edict breaks the tie.

- **Recommendation: DELETE the family, and give `sci-report` the one thing it actually needed** — a
  card-shaped numeric readout — as a `Card` composition in *its* tranche, per the consumer-updates ruling.
  CFR-01's real complaint was "a pill in a grid reads wrong", which is a *usage* error against a component
  F18 already condemned. Building `appearance="dashboard"` would add public surface to a family you have
  ordered removed.
- Cost if you overrule: `metric` stays, gains one variant, and the reduction loses 408 LOC of its target.

### R-2 · `WatercolorDot` — earn the seat, or go home to value.js

509 LOC. **One** external consumer (`value.js`). Fails the ≥2 bar on its own terms.

You asked on 2026-07-24 why it has no procedural, random hover states "like in value-js". The answer is
that on the landing page it isn't mounted as a component at all — it's a decorative `<span>` inside a
hand-authored hero ornament (`optical-bench-dot watercolor-swatch`, a flat `oklch(0.53 0.124 69.6)` fill
plus `filter: url(#watercolor-filter-v-13)`). No component, no hover contract.

- **Recommendation: RELOCATE to value.js.** It has one consumer, that consumer is where the good
  implementation already lives, and the edict is explicit that one consumer does not save a component.
- **The alternative you may prefer:** keep it public *and* give it the procedural/random treatment you
  admired — which makes it a real member of the procedural suite beside Aurora and Blob. That is a
  genuine design call, not an arithmetic one, which is why it is here rather than decided.
- Either way the hero ornament dies: a library's landing page should be built from its own primitives.

### R-3 · Alert — status-tinted glass, or neutral glass with status ink

The redesigned Alert (F19: "not properly glassy, rounded, or idiomatic and Apple-like") needs one identity
decision before it can be built, and the A11Y contrast-gate table is data-driven on your answer.

At HEAD, Alert already ships tone-tinted wash arms (`alert/index.ts:9-19`, `feedback-tone-*` on
`--feedback-tone-rung`). So the question is what the new idiom **keeps**, not whether tinting is admissible.

- **Recommendation: neutral glass + status ink.** It is consistent with the subtler-blur canon you ordered
  in F48 and with the frosted-not-shiny direction; colour then comes from the icon and the ink, which is
  also the more accessible arrangement. A status-tinted plate is available if you want louder semantics.

### R-4 · Idle engagement — rank the two canons

This is the one genuinely unresolved question in BJ, and it governs three bands.

- **Breath of life** (your standing edict): "every component always displays engagement" — read at rest,
  this licenses always-on idle motion on inert atoms (buttons, the collapsed dock pill, a slider at rest).
- **The suffusion-matrix idle law** (our canon): "idle — material only… no light event on a static
  surface", with exactly one idle-light licence, the selection-lens sweep.

Both are canon. Only you can rank them.

- **Recommendation: material-only at rest; engagement on interaction.** Rest is where glass should be
  *still* and legible; motion at rest is an attention tax and, at 62 components, a compositor tax. Breath
  of life is then satisfied by the **engagement ladder** (rest → hover → press → engaged → modal) being
  genuinely alive on every component — which is the part that is currently missing, since neither slider
  engagement variant exists in the type surface at all.
- Note this does **not** touch ambient substrate motion (Aurora drift, Blob), which is a separate axis and
  keeps its >5s pause/stop/hide obligation regardless.

### R-5 · Blob default identity

Does default `<Blob>` become the technicolor watercolor creature, or stay warm-cream with technicolor opt-in?

A12 asks for "cartoon-like shadow, better lighting, more expressive, proper metaballing, better emotional
states, high and dynamic interactivity" — that is a *quality* mandate and it is decided. This row is only
about the **default identity**, which is a taste call that inherits to every consumer.

- **Recommendation: technicolor default, warm-cream as a named calm preset.** Your standing edict is that
  the library's own defaults evolve as its identity changes, and the landing page currently shows a dead
  ochre squircle — the default is doing no work for you today.

### R-6 · The eight unfalsifiable rows — one sentence each

F03, F04, F10, F14, F28, F31, F33, F50 have no definition of done that two readers would agree on, so they
have been "worked" repeatedly and never closed. Below is a proposed *done* for each. **A nod converts all
eight; strike or amend any line.**

| row | your words | proposed "done" |
|---|---|---|
| F03 | "most of this is worthless" | The named section is deleted, and the page it sat on loses ≥40% of its vertical extent without losing a fact. |
| F04 | "this shape is to be abrogated… simplify to better, more opinionated defaults" | The shape is gone from the default render; expressing it requires an explicit prop, and the prop has ≥2 sites or it does not exist. |
| F10 | "each section should have better and slightly clearer design hierarchy" | Every story section resolves to exactly one eyebrow, one heading, one lede — and the page name appears **once**, not three times. |
| F14 | "optimized horizontal usage on desktop + proper mobile-first affordances" | At 1440×900 no story content column is narrower than 60% of the frame; at 390×844 no element overflows horizontally and nothing is occluded by the dock. Both are machine-checked by the capture harness. |
| F28 | "these blurs are inconsistent — ensure this is intentional" | Every glass surface resolves to one of the five ladder rungs; a one-off blur literal anywhere in `src/` fails a gate. |
| F31 | "why all this bottom padding; redesign the page; modularize the easing curve component" | The curve component is a standalone module with ≥2 consumers, and the page's trailing whitespace is ≤ one section gap. |
| F33 | "what is deck vs carousel — likely collapse; dot animations need dramatic refinement" | One paging register survives; `deck` is deleted (it has **zero** usage sites); the dots goo-morph between states per the liquid-weight edict. |
| F50 | "gradient blurring behind the element… experiment, judge effectiveness" | The primitive exists, is applied to popovers/modals/the slider, and you have seen a paired before/after capture and said yes or no. |

---

## Closed by your own words — no answer owed

| BJ row | closed by | disposition |
|---|---|---|
| ASK-1 (chassis) | F18 "is to be removed" | DELETE `instrument-chassis` |
| ASK-2 | F26 "greatly overfit; likely belongs only in speedtest" + consumer-updates ruling | DELETE-with-relay |
| ASK-3 | F25 "how is this any different from a normal dialog" | FOLD the story into `/containers/dialog` |
| ASK-4 | F32 + F42 "what is this vs our other scrolling components" | ONE scroll register; the two pages fold |
| ASK-5 | F30 "what even is" it | FOLD the page into the springs configurator |
| ASK-6 | F33 + `deck` has **zero** usage sites in `src/` or `demo/` | DELETE `deck`; `carousel` below the ≥2 bar → delete-with-relay |
| ASK-7 | F16 "redesign from the ground up" | COLLAPSE 5→1, redesign in-library |
| ASK-8 | your 2026-07-24 ruling | KEEP and THIN DataTable |
| ASK-9 | ≥2 bar — 3 self-instances, 0 external | DEMOTE `FourierField` to demo |
| ASK-10 | ≥2 bar — own story + demo hero only | DEMOTE `Constellation` to the demo substrate cluster |
| ASK-11 | ≥2 bar — single-consumer demo devices | DEMOTE `./easing` to demo-private |
| ASK-13 | F43/F44/F45 "this entire compositions section is likely to be pruned" | PRUNE all 6 pages; retire the category |
| ASK-14/15/16/32 | your 2026-07-24 ruling that the dock API is contrived and should be replaced | Subsumed by `W-DOCK`; **fission is built, not gated** — you named it as the headline capability |
| ASK-17 | comment truth-up | Fix the comment |
| ASK-18/19 | your 2026-07-17 ruling | Greenfield HandMark with full first-principles authority |
| ASK-20 | A13 "a PROPER van-Gogh mode, a proper oil-pastel brush mode, a proper crayon/hand-drawn mode" | Build all three as distinct media. Re-rooted: they are currently *identical* because the WebGPU primary collapses four mediums into one function (`aurora-mediums.wgsl.ts:399-401`) — a renderer defect, not a preset surplus |
| ASK-21/22 | stale / discharged | Superseded by R-5 and by the R-1 routing |
| ASK-23 | your "STAY-RETIRED" offer stands | No rebuild |
| ASK-24 | conditional | Fires only if the SwiftShader probe fails |
| ASK-26 | MATERIAL W3's own recorded DECLINE | EXECUTE the DECLINE branch — it was recorded but never run; the `--glass-halo-*` cohort and its test strip |
| ASK-28 | evidence-gated, re-trigger named | Harden-not-delete; re-judge DUSK/DAWN **after** the medium fix lands, against a paired π capture. The current confusability may be the same renderer defect |
| ASK-30 | additive, low risk | ADOPT `thinking` as a sixth named mood |
| ASK-31 | opt-in, with obligation | SHIP grab-and-fling opt-in on the mascot register; `pointercancel`/lost-capture/outside-release restore a settled state, and it carries a keyboard-operable equivalent or is ruled decorative |
| ASK-33 | no-backwards-compat edict | NARROW `DrawerDirection` to `top \| bottom`; side placements use `DialogContent` |

---

## How to answer

Mark R-1 … R-6. Anything unmarked stays at its recommendation and its wave proceeds — **silence advances
the recommendation**, which is the opposite of BJ's rule and is deliberate. BJ parked waves on silence and
that is how twenty-seven answered questions became blockers.

If you disagree with a "closed by your own words" row, say so and it re-opens; none of them are locked
against you. They are closed against *re-asking*, not against *you*.
