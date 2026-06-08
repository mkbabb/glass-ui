# AX.W02 — One morph orchestrator per dock: fold the inner layer-group onto the outer driver

**Band** A · DOCK · **Severity** blocker · **dependsOn** AX.W01 · **Plan basis** AX.md §3 (the
`### AX.W02` block, lines 344-374) + §2b band-A row + §4 notes 11/23 + deep-audit slice 1
(`dock-layering-firstprinciples`) F2/F7 + the converge-digest bbnf-buddy demand-side proof.

> *Gloss.* A **wave** is one dispatchable unit of the tranche (research → implement → adversarial-verify
> → gate); a **gate** is a `proof:*` script whose RED/GREEN flip is the falsifiable close-criterion; the
> **π lane** (AX.W00) is the fail-CLOSED visual-runtime workspace every visual wave closes on; the
> **triumvirate** is the implement / adversarially-verify / gate-author split. A **morph orchestrator**
> here is the single per-dock owner of the normalized morph scalar (`--dock-morph-t`) — W01 establishes
> ONE per `<GlassDock>`; W02 makes a nested `<DockLayerGroup>` *defer* to it rather than spin up a second.

---

## State

**Born-RED.** At HEAD (`eaba94f`, branch `at-dock-convergence`) there are **TWO `useLayerTransition`
instances per nested dock**: the outer collapse↔expand pair on `.dock-layers`
(`GlassDock.vue:253`) and the inner pane pair on `.dock-layer-stack` (`DockLayerGroup.vue:57`). Each
forks VT-vs-FLIP independently; when a `<DockLayerGroup>` is mounted inside a collapsible `<GlassDock>`,
**both** `.dock-layers` and `.dock-layer-stack` mint a `view-transition-name`
(`GlassDock.vue:277-284` + `DockLayerGroup.vue:82-89`) and on the FLIP path two independent springs
write inline size onto parent+child with **zero coordination** (slice 1 F2).

**Falsifiable RED witness.** A π-lane fixture mounting a collapsible `<GlassDock>` wrapping a
`<DockLayerGroup>` with ≥2 panes, then firing a **simultaneous collapse + pane-swap** in one tick,
samples TWO distinct morph timelines (a `.dock-layers` width spring AND a `.dock-layer-stack` width
spring) settling on **separate clocks** — the same pixels double-animate. The born-RED gate
(`proof:dock-orchestrator-single`) asserts exactly ONE morph timeline drives the box during a
collapse-while-switching gesture and counts the live `useLayerTransition` morph engines per dock
instance; at HEAD it reports **2** (RED). A second RED arm: the doubled state vocabulary
(`.dock-layer` outer / `.dock-layer-item-host` inner) is enumerated TWICE in `dock.css` (the
`.layer-active`/`.is-active`/`.is-leaving` comma-groups at `dock.css:655-683`) and kept in sync by a
**load-bearing greppable comment** (`dock.css:610-619`, "a later refactor greps for this marker"),
with the stagger onset a hand-typed nth-child ladder (`dock.css:776-795`: 0.08/0.16/0.24/0.32/0.4) —
`proof:dock-vocabulary` (extended) counts >1 active-state vocabulary and a magic onset ladder (RED).

**Live re-diagnosis ritual (AX.W00 wave-open obligation).** BEFORE writing the fix, drive the live
nested dock through a collapse-while-switching gesture on the DEFAULT engine (Chrome/Safari) via the
π-lane Playwright and CONFIRM the double-animation is real at HEAD — slice 1 was audit-only ("I did not
run the live demo"), so the two-clock claim is source-grounded and MUST be empirically re-confirmed
against `eaba94f` before any edit. Record the confirmation in §Archaeology (the AW dock-misdiagnosis
analogue — §4 note 11: a from-hypothesis fix without live re-diagnosis is the cardinal AW failure).

**Status** — SPEC (this doc). DEV-only; writes no `src` from this session.

---

## Goal

A `<DockLayerGroup>` nested inside a collapsible `<GlassDock>` **defers to the dock's single morph
orchestrator** via provide/inject, so a simultaneous collapse + pane-swap settles on **one spring, one
scalar, one timeline** — and the doubled outer/inner state vocabulary collapses onto ONE
(`.is-active`/`.is-leaving`) with a single `--dock-stagger-step` token replacing the hand-typed
nth-child onset ladder.

---

## Scope

The gestalt fix (slice 1 F2 `gestaltFix` + the charter §3 block, verbatim-faithful): **model the dock as
a single morph stack whose active "layer" is `(expandedState × activePane)`.** The outer
collapsed↔expanded swap is **just another layer transition in the SAME group** as the inner pane swaps —
ONE spring, one scalar (`--dock-morph-t`, established by W01), measured once. No second clock.

Concretely:

1. **One orchestrator per dock instance, not per layer-pair.** `<GlassDock>` (post-W01) owns the single
   `useLayerTransition`-derived morph controller and **provides it** through a new typed-key DI seam —
   `createOptionalContext<DockMorphContext>(…)` colocated under `dock/composables/` alongside the
   existing `dockContext`/`dockLayerContext` pair (the SAME DI pattern, per §2b band-A "the dock
   provide/inject collapses onto `createStrictContext`"). The seam is **optional** (not strict): a
   `<DockLayerGroup>` mounted OUTSIDE a `<GlassDock>` (standalone, the demo `dock-layers.vue` case)
   reads `undefined` and **self-orchestrates** as today; a `<DockLayerGroup>` nested inside a
   collapsible dock reads the injected controller and **does NOT instantiate its own morph engine** —
   it registers its panes with the dock's orchestrator and lets the one spring drive both the
   collapse↔expand box and the pane crossfade. (`createOptionalContext` is the right factory: a missing
   provider is a BEFITTING-silent standalone-render path, not a library-internal violation — the
   strict/optional split is already canon at `dockLayerContext.ts:52`.)

2. **One state vocabulary.** Unify `.dock-layer` (outer) + `.dock-layer-item-host` (inner) onto ONE set
   (`.is-active`/`.is-leaving` everywhere), so the crossfade + stagger contract is written ONCE in
   `dock.css`. **DELETE the load-bearing greppable sync comment** (`dock.css:610-619`) — it exists only
   because the two vocabularies were never merged. The doubled comma-group
   (`dock.css:648-687`) collapses to a single selector over the unified vocabulary.

3. **One stagger-step token.** Express the per-child stagger onset as a single
   `--dock-stagger-step` token × the child index (CSS `sibling-index()` where Baseline-available, else
   a short generated nth-child set keyed off the one token) — **retire the hand-typed
   0.08/0.16/0.24/0.32/0.4 ladder** (`dock.css:776-795`). The `--dock-morph-progress`-keyed calc ramps
   (today duplicated across `.dock-layers` and `.dock-layer-stack`, `dock.css:758-771`) become ONE
   shared rule over the unified vocabulary.

No workaround, no legacy arm. The second morph engine is **excised**, not coordinated-around (§0: "no
parallel pause path" / one-path); the orchestrator deferral is the gestalt re-derivation, not a
coordination layer bolted on top.

## SOTA deepening (liquid-glass research)

W02 IS the web `GlassEffectContainer` (facets 1, 2, 16, 21, 26, 27, 30 — the iOS-26 Liquid-Glass corpus,
`docs/tranches/AX/research/liquidglass-synthesis.md`). Apple's container establishes ONE shared sampling
region + ONE morph context; child glass shapes declare a stable identity (`glassEffectID(id, in:
namespace)`) and a `spacing` threshold governs when neighbours visually FUSE; SwiftUI then computes the
morph between matched identities AUTOMATICALLY — there is NO per-component morph code, an element opts in by
joining the container + declaring an id. The deepenings:

1. **One orchestrator = one batched pass = both correctness AND cost** (facets 1, 4, 30). Apple's rule
   "glass cannot sample other glass" is BOTH a correctness mechanism (the container is the one shared
   sampling region) AND the perf ceiling: "you do not pay per-element, you pay per-CONTAINER." Two
   independent springs writing inline-size = double-animation + desync (the W02 born-RED) — the
   `GlassEffectContainer` anti-pattern inverted (N independent samplers/springs instead of one batched
   group). The `(expandedState × activePane)` single-stack model is the exact web expression of Apple's
   "singular floating plane the controls live on."

2. **The DI seam IS `provideMorphGroup` / `MorphGroup`** (facet 26). The corpus names the canonical web
   API shape as a two-part seam: a per-element driver + a `MorphGroup` provide-inject orchestrator (the
   `GlassEffectContainer` / Motion `LayoutGroup` analog). W02's `createOptionalContext<DockMorphContext>`
   IS this — and the synthesis flags W02 explicitly as "DI-fold equals MorphGroup" / "the inner
   DockLayerGroup must NOT instantiate its own engine, it injects the dock orchestrator." Mark the DI seam
   as the dock-flavored first instance of the general `MorphGroup` facility AX.W42 authors (the synthesis's
   §1.4 substrate). W02 does not block on W42; it establishes the seam W42 generalizes.

3. **The stagger is choreography, not a timer** (facets 16, 28, 30). The `--dock-stagger-step` token × child
   index must ride the morph's NORMALIZED progress (a fraction-of-morph onset), not a wall-clock
   `setTimeout`/`animation-delay` — so a fast flick and a slow hover-open both choreograph correctly and an
   interrupted morph orphans no timers. Emil Kowalski's canon: 30-60ms between staggered items, never
   >100ms (that reads as a slideshow). The corpus confirms glass-ui's progress-keyed ramp is correct;
   W02's job is to write it ONCE over the unified vocabulary, not regress it to a timer cascade. The
   canonical lead-follow depth-order is backdrop→container→content→actions (Emil) — the box LEADS, content
   FOLLOWS in-step.

4. **The gooey spacing-merge is a Chromium-only GARNISH, never the structural silhouette** (facets 1, 2,
   4, 21). Apple's metaball-fuse (shapes within `spacing` blend into one body) maps on the web to the SVG
   `feGaussianBlur → feColorMatrix` alpha-contrast trick — but that renders as PLAIN BLUR in Safari/Firefox
   (Chromium-reliable only). If a future dock fuses adjacent controls, it is an `@supports`-gated PE over a
   shape that already reads correctly — NOT a W02 deliverable (W02 unifies the orchestrator + vocabulary;
   the gel-merge is a W42-facility door, flagged not built).

**Demand-side close criterion (converge-digest, bbnf-buddy field evidence).** bbnf-buddy **ABANDONED
`DockLayerGroup` entirely** for BOTH editor docks — `BottomDock.vue:96-98` hand-rolls a raw
`<Transition name="dock-layer" mode="out-in">` over three layers; `LeftToolsDock.vue:135-160,182`
uses a plain `v-if` swap — with the comment (`LeftToolsDock.vue:137-142`) "its inner grid chain was the
source of the vertical overflow fight" and "DockLayerGroup buys nothing". This is the **live consumer
diagnosis the wave needs**: a vertical-overflow consumer dropped the primitive. Make **"a
vertical-overflow consumer can use `DockLayerGroup` without abandoning it"** a W02 close criterion —
the regression fixture (below) mounts a vertical `DockLayerGroup` with overflowing content that does
NOT fight max-height. After W02's single-clock orchestrator + the inert/FLIP `DockLayerGroup` land,
bbnf-buddy is the re-adoption consumer that deletes its consumer-local `.dock-layer-*` keyframes
(`animations.css:52-61`) + its `v-if`/`<Transition>` swaps — **that adoption leg routes to AX.W34**
(it is NOT in W02's FileBounds; W02 writes no sibling source).

---

## FileBounds

The EXACT files this wave may touch (for parallel-dispatch disjointness):

| File | Access | Why |
|---|---|---|
| `src/components/custom/dock/composables/dockMorphContext.ts` | **create** | the new `createOptionalContext<DockMorphContext>` morph-orchestrator DI seam (typed-key + paired-helper, mirroring `dockContext.ts`/`dockLayerContext.ts`) |
| `src/components/custom/dock/composables/index.ts` | modify | barrel-export the new morph context's helpers + key + type |
| `src/components/custom/dock/GlassDock.vue` | modify | provide the single morph controller through the new seam (the orchestrator already exists post-W01) |
| `src/components/custom/dock/DockLayerGroup.vue` | modify | inject the optional morph controller; defer to it when present, self-orchestrate when absent (delete the second `useLayerTransition` instance on the nested path) |
| `src/styles/dock.css` | modify | unify the outer/inner state vocabulary onto `.is-active`/`.is-leaving`; delete the greppable sync comment; replace the nth-child onset ladder with `--dock-stagger-step` |
| `scripts/proof-dock-orchestrator-single.mjs` | **create** | the born-RED π-lane gate (one morph timeline + one engine per dock instance) |
| `scripts/proof-dock-vocabulary.mjs` | modify | extend the existing vocabulary gate: one active-state vocabulary + one stagger-step token (no magic ladder) |
| `demo/stories/navigation/dock-layers.vue` | modify | add a **vertical-overflow nested-layer-group** showcase the gate samples (the bbnf-buddy regression case) |
| `tests/components/custom/dock/dock-orchestrator-single.detect.test.ts` | **create** | pure-detector vitest: a two-timeline / two-engine synthetic series flags a violation |

Do NOT touch: `useLayerTransition.ts` (W01's surface — its 479→~130 re-derivation is the predecessor;
W02 consumes the rebuilt primitive, does not re-edit it), `DockLayer.vue` (its registration contract is
unchanged), `dockContext.ts` / `dockLayerContext.ts` (the existing seams stay; the morph seam is a NEW
third context), `tokens.css` (the spring token retune is W05), `src/styles/dock/` partials (the dock.css
split is W06, LAST in band).

---

## Disjointness

W02 runs in the dock band (A · W01-W06), all SEQUENCED (no two dock waves write a shared path in
parallel). The shared surfaces + the collision-avoidance:

- **`useLayerTransition.ts`** — W01 owns its full re-derivation (479→~130, single-scalar morph,
  VT-fork retirement); W02 **must NOT edit it**, only inject/consume the rebuilt primitive's
  controller. W02 opens strictly AFTER W01 closes (`dependsOn AX.W01`), so W01's rewrite is the fixed
  substrate W02 builds the DI deferral on — never concurrent.
- **`GlassDock.vue`** — touched by W01 (the single-scalar root rewrite) and W02 (the morph-context
  provide). SEQUENCED: W02 adds the `provide(DOCK_MORPH_KEY, …)` line atop W01's settled root.
- **`dock.css`** — touched by W01 (root transitions → calc-off-scalar), W04 (wrap/radius/shadow), W02
  (the vocabulary unification + stagger-step), and finally W06 (the `src/styles/dock/` split, LAST).
  W02's dock.css edit is the **vocabulary/stagger** seam ONLY (the `.layer-active`/`.is-active`
  comma-groups at 648-687 + the nth-child ladder at 776-795); it does NOT touch the root collapse
  transition lists (W01) nor the wrap/silhouette rules (W04). Because the band is sequenced (W04 opens
  after W01; W06 follows W01+W04), these dock.css seams are written one wave at a time. W06's split must
  carve W02's FINAL unified vocabulary, not mid-churn debris — hence W06 dependsOn W01+W04 and follows
  W02.
- **`scripts/proof-dock-vocabulary.mjs`** — W02 extends it (one-vocabulary + one-stagger-token); no
  other dock wave touches it. The new `proof-dock-orchestrator-single.mjs` is W02-exclusive.
- **`demo/stories/navigation/dock-layers.vue`** — W02 adds the vertical-overflow nested showcase; the
  outer `dock.vue` story (W01/W04/W06) is a DIFFERENT file — no overlap.

**Cross-repo downstream (NOT a W02 file-write).** fourier consumes the per-instance
`view-transition-name` route-morph seam + `proof:vt-names` (digest blocker; §4 note 23). W02 does NOT
retire any VT name (that was W01's COLLAPSE-fork retirement, which PRESERVES the route-morph name) —
but the orchestrator-deferral must NOT drop the nested `<DockLayerGroup>`'s named-element seam if a
consumer route-morphs through it. The W02 gate carries a `proof:vt-names` preservation assertion as a
guard (the names survive the orchestrator fold). bbnf-buddy's re-adoption is W34, not W02.

---

## Triumvirate

Per AX.md §0 agent-ceiling (≤6 implement / ≤7 read-only-audit). W02's actual split:

- **Implement (≤2 agents, serial).** Agent-A: the DI seam + Vue wiring (`dockMorphContext.ts`,
  `GlassDock.vue` provide, `DockLayerGroup.vue` inject-and-defer, the composables barrel, the demo
  showcase). Agent-B (opens after A): the `dock.css` vocabulary unification + `--dock-stagger-step`
  token + the duplicated-ramp collapse. Serial because both touch the dock crossfade contract from two
  sides (TS state vocabulary ↔ CSS state vocabulary) and must agree on the ONE `.is-active`/`.is-leaving`
  vocabulary name.
- **Adversarially-verify (1 read-only lane).** Drive the live nested dock through collapse-while-switching
  on the DEFAULT engine via the π-lane Playwright; confirm born-RED at HEAD (two timelines) and GREEN
  after (one); independently re-mount the bbnf-buddy vertical-overflow case and confirm it does NOT
  fight max-height; confirm the standalone `<DockLayerGroup>` (no `<GlassDock>` ancestor) still
  self-orchestrates. Adversary owns the "does the optional-context fall-through actually fire the
  self-orchestrate path" probe (the binding-verification class — a silently-dropped inject reads
  `undefined` with no error).
- **Gate-author (1 agent).** Author `proof-dock-orchestrator-single.mjs` (π-lane, born-RED) + extend
  `proof-dock-vocabulary.mjs` + the pure-detector vitest. Gate-author is distinct from implementer (the
  gate must be able to FAIL the implementer's work — same-author gate is the AW false-GREEN class).

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b — mandatory):** the wave-agnostic authorization grant is AX.md §6.1 (work AROUND a roadblock with an idiomatic gestalt fix rather than stall; the §6.2 decision tree bounds halt-vs-work-around) — by reference, not restated. This wave's §3a auto-triggers (HALT the failing unit + dispatch the research→plan-augment→redress triumvirate, never stall): (a) any need to EDIT `useLayerTransition.ts` (W01's surface — W02 only injects/consumes the rebuilt controller), to touch `dockContext.ts`/`dockLayerContext.ts` (the existing seams; the morph context is a NEW third), `tokens.css` (the spring retune is W05), or the `src/styles/dock/` partials (the split is W06) — a scope-reveal → triumvirate, never absorbed in-line; (b) `proof:dock-orchestrator-single` not reliably live-measurable on the collapse-while-switching gesture (the keyframes deterministic-drive un-measurability) → non-local gate failure, escalate to the W00 deterministic-drive seam, do NOT hand-roll a probe; (c) the optional-context defer-vs-self-orchestrate fork failing to fire the standalone fall-through (the silently-dropped-inject binding-verification class), or the `proof:vt-names` route-morph seam dropping under the orchestrator fold → non-local gate failure → triumvirate; (d) the 3rd diagnostic-loop iteration on the unified `.is-active`/`.is-leaving` vocabulary not reproducing the in-step stagger choreography → triumvirate.

---

## HardGate

Born-RED → GREEN, precept-valid artefact form (runtime + build + deletion — never grep-only for runtime
behaviour, per SPEC.md §Hard Gates):

1. **`proof:dock-orchestrator-single`** (NEW, π-lane, fail-CLOSED in the W00 visual-runtime workspace).
   Mount a collapsible `<GlassDock>` wrapping a `<DockLayerGroup>` (≥2 panes); fire a simultaneous
   collapse + pane-swap in one tick; rAF-sample the dock-root box geometry AND the pane-stack on the
   SAME timeline; assert **exactly ONE morph timeline** settles the box (no second `.dock-layer-stack`
   width spring co-driving) AND count the live `useLayerTransition` morph engines per dock instance ==
   1. Born-RED at HEAD (2 engines / 2 timelines), GREEN after. The π-lane drives the morph
   deterministically per the W00 design (force the readable arm via test-flag/PRM, lower collapse-delay,
   real `page.hover` not synthetic dispatch — the morph is NOT reliably live-measurable on a naive
   `getBoundingClientRect` poll, the keyframes device-proof).
2. **`proof:dock-vocabulary`** (EXTENDED). One active-state vocabulary across the dock crossfade rules
   (the `.layer-active`/`.is-active`/`.is-leaving` triple collapses to `.is-active`/`.is-leaving`); a
   single `--dock-stagger-step` token with NO hand-typed nth-child onset ladder; the greppable sync
   comment is DELETED (a deletion-proof arm). Born-RED at HEAD (>1 vocabulary + magic ladder), GREEN
   after.
3. **`proof:vt-names`** preservation — the per-instance `view-transition-name` route-morph seam survives
   the orchestrator fold (the fourier downstream guard; stays GREEN throughout).
4. **vitest `dock-orchestrator-single.detect.test.ts`** — the pure detector flags a synthetic
   two-timeline / two-engine series as a violation and a single-timeline series as clean (so the gate's
   failure path is itself covered and cannot regress to false-GREEN).
5. **`npm run typecheck`** clean; **`proof:no-test-in-src`** GREEN (the new spec lives under `tests/`).

**VISUAL-TRUTH (MANDATORY, non-negotiable per AX.W00 — appearance/interaction axis, NOT a headless proof
alone).** The wave does NOT close on the numeric gate. The close criterion is an **executed live
Playwright + frontend-design audit** of the nested-layer-group dock through a
**collapse-while-switching gesture** on the DEFAULT engine: the box + the pane crossfade + the
per-child stagger read as **one continuous iOS spring** (no box-leads-content lag, no double-animated
pane pixels, no stagger-onset stutter), captured as a paired-π **BEFORE/AFTER + DELTA.md** compare
(the W00 muster protocol — both states + a delta, not a single fail-closed readback). The
frontend-design pass audits affordance/hierarchy/spacing on the live morph (no visual occlusion, the
leaving pane fades cleanly under the arriving one). The bbnf-buddy vertical-overflow case renders in the
audit as the demand-side re-adoption proof.

> **VISUAL-TRUTH ONE-LINER:** *A simultaneous collapse + pane-swap on the live nested dock reads as one
> continuous iOS spring — box, crossfade, and stagger on a single clock with zero double-animated pixels
> — verified by an executed π-lane Playwright + frontend-design audit with a BEFORE/AFTER/DELTA capture,
> never the headless gate alone.*

---

## Cadence

Sub-steps, ordered:

1. **Live re-diagnose (W00 ritual).** Confirm the two-clock double-animation at HEAD on the DEFAULT
   engine via π-lane Playwright; capture the born-RED two-timeline artefact. Re-confirm the bbnf-buddy
   vertical-overflow case fights max-height at HEAD.
2. **Author the born-RED gates.** `proof-dock-orchestrator-single.mjs` (RED: 2 engines) + extend
   `proof-dock-vocabulary.mjs` (RED: 2 vocabularies + magic ladder) + the pure-detector vitest (passes
   on synthetic series). Capture the RED witnesses.
3. **Implement the DI seam (Agent-A).** `dockMorphContext.ts` (`createOptionalContext`) → barrel →
   `GlassDock.vue` provide → `DockLayerGroup.vue` inject-and-defer (delete the nested second
   `useLayerTransition`). Add the vertical-overflow nested showcase to `dock-layers.vue`.
4. **Unify the vocabulary (Agent-B, after A).** Collapse `.dock-layer`/`.dock-layer-item-host` onto
   `.is-active`/`.is-leaving` in `dock.css`; delete the greppable sync comment; introduce
   `--dock-stagger-step`, retire the nth-child onset ladder; collapse the duplicated morph-progress
   ramps to one rule.
5. **Flip the gates GREEN + adversarial verify.** `proof:dock-orchestrator-single` GREEN (1 engine /
   1 timeline); `proof:dock-vocabulary` GREEN; `proof:vt-names` still GREEN; vitest GREEN; typecheck
   clean. Adversary confirms standalone `<DockLayerGroup>` self-orchestrates + nested defers.
6. **VISUAL-TRUTH close.** Executed live audit + BEFORE/AFTER/DELTA.md capture (the close criterion).
7. **Doc-update.** Flip the wave status + emit the audit json (DOC_UPDATE_WAVE protocol — docs update
   before the next wave opens).

---

## Artefacts

- `docs/tranches/AX/audit/W02-orchestrator-fold.json` — the gate artefact: the born-RED HEAD
  two-timeline / two-engine sample (the live π-lane collapse-while-switching trace) + the GREEN
  post-fold single-timeline trace, with the rAF box-geometry + pane series; the bbnf-buddy
  vertical-overflow case (born-RED max-height fight → GREEN clean reflow); the standalone-vs-nested
  `<DockLayerGroup>` orchestration-path confirmation.
- `docs/tranches/AX/audit/W02-DELTA.md` — the paired-π BEFORE/AFTER + DELTA compare-at-close (the W00
  muster protocol): the two named-region screenshots + the delta narrative (one clock vs two).
- The vitest run log for `dock-orchestrator-single.detect.test.ts`.
- The diff localizing the second-`useLayerTransition` excision in `DockLayerGroup.vue` + the
  vocabulary unification + the greppable-comment deletion in `dock.css`.

---

## CommitPlan

One conventional-commit per sub-step (no `git` executed from the spec session — the orchestrator owns
the index per the hardened agent git clause, K W0):

- `test(dock): born-RED proof:dock-orchestrator-single + extend proof:dock-vocabulary — one morph engine
  + one state vocabulary per dock` — the two gates + the pure-detector vitest, RED at HEAD (body: names
  the two-`useLayerTransition`-per-dock root, slice 1 F2, the live two-timeline witness).
- `feat(dock): fold the nested DockLayerGroup onto the dock's single morph orchestrator via optional DI`
  — `dockMorphContext.ts` + barrel + `GlassDock.vue` provide + `DockLayerGroup.vue` inject-and-defer
  (delete the nested second morph engine) + the vertical-overflow demo showcase (body: the
  `(expandedState × activePane)` single-stack model, the `createOptionalContext` standalone fall-through,
  the bbnf-buddy demand-side proof).
- `refactor(dock): unify the outer/inner crossfade vocabulary onto .is-active/.is-leaving +
  --dock-stagger-step token` — the `dock.css` vocabulary collapse, the greppable-sync-comment deletion,
  the nth-child onset ladder retirement, the duplicated-ramp collapse (body: slice 1 F7, one vocabulary
  written once).
- `docs(AX): W02 close — orchestrator-fold artefact + DELTA + status` — the audit json + DELTA.md + the
  wave status flip.

---

## Dependencies

- **dependsOn AX.W01** (charter §3). W01 establishes the ONE single-scalar morph driver per
  `<GlassDock>` (`--dock-morph-t`, the VT-collapse-fork retirement, `useLayerTransition` re-derived
  479→~130). W02 makes the nested `<DockLayerGroup>` **defer to that one driver** — there is no single
  orchestrator to defer to until W01 builds it. W02 consumes W01's rebuilt primitive; it does not
  re-edit `useLayerTransition.ts`.
- **Blocks (band-internal):** W06 (the dock.css `src/styles/dock/` split) must carve W02's FINAL
  unified vocabulary, so W06 follows W02 (W06 dependsOn W01+W04, opens LAST in band).
- **Downstream cross-repo (NOT a W02 dependency, routes to W34):** bbnf-buddy's `DockLayerGroup`
  re-adoption (delete the consumer-local `.dock-layer-*` keyframes + `v-if`/`<Transition>` swaps) is
  gated on the AX cut PUBLISHING (§4 note 12 publish-currency) and lands as a W34 consumer-adoption leg
  — W02 authors the substrate + the demand-side close criterion, the sibling session executes the
  adoption.

---

## Archaeology

The git lineage + prior-tranche accretion the audit cited:

- **The single-clock high-water.** git `e8380d7` (≈135-line single-clock `useLayerTransition`) +
  `e82633e` are the CORRECT references — one spring, one clock (slice 1 notes; §4 note 23: the
  keyframes.js dock is the SHIPPED-CORRECT baseline ORACLE the dock band measures against). The
  two-orchestrator regression is **pure accretion** across **AQ.W6 → AU.W8 → AV.W9 → AW.W2/W3**, each
  wave compensating for the prior seam instead of re-deriving (slice 1 notes). W02 (with W01) re-derives
  from first principles rather than adding a coordination layer.
- **The DI precedent W02 mirrors.** `O.W2` collapsed the dock's 6 string-keyed provides onto the single
  `DOCK_CONTEXT_KEY` typed `InjectionKey` (`dockContext.ts` header); `AV.W14` established the
  `createStrictContext`/`createOptionalContext` factory pair (`src/composables/context/`). The morph
  seam is the THIRD dock context on this exact pattern — `createOptionalContext` (the standalone
  `<DockLayerGroup>` render is a befitting-silent missing-provider path, mirroring
  `useOptionalDockContext` at `dockContext.ts:57`).
- **The AW.W3 half-wired stagger.** The spring-keyed `--dock-morph-progress` child stagger +
  clip-reveal aperture (`dock.css:731-795`) are the genuinely-correct in-step machinery — but wired
  ONLY into the FLIP fallback nobody hits on the default engine (slice 1 notes). W01 makes the live
  spring universal; W02 unifies the doubled vocabulary that AW.W3 left on two state names.
- **The greppable-sync tombstone.** `dock.css:610-619` ("a later refactor greps for this marker so the
  semantics are not collapsed") + the doubled `.layer-active`/`.is-active`/`.is-leaving` comma-group
  (`dock.css:648-687`) + the hand-typed onset ladder (`dock.css:776-795`) are the artefacts of two
  vocabularies never merged (slice 1 F7). W02 deletes the marker and merges the vocabulary.
- **The cardinal-failure ritual (§4 note 11).** The AW.W1 spec misdiagnosed the dock regression from a
  hypothesis (blamed `useLayerTransition` measurement); the live HEAD re-diagnosis falsified it (the
  real cause was `container-type: inline-size`). slice 1 was audit-only ("I did not run the live
  demo"). W02 therefore makes **live re-diagnosis BEFORE the fix** its first cadence step (recorded in
  this §Archaeology at close).
- **Demand-side witness (converge-digest).** bbnf-buddy `BottomDock.vue:96-98` (raw
  `<Transition mode="out-in">`) + `LeftToolsDock.vue:135-160,182` (plain `v-if`) ABANDONED
  `DockLayerGroup` for both editor docks, citing the inner-grid-chain vertical-overflow fight and
  "DockLayerGroup buys nothing" — the live consumer diagnosis the wave needs; the re-adoption is the
  W34 leg.

---

## PreceptAlignment

Pursuant to `docs/precepts/` (pinned `63240e6`); the band-A binding precepts (AX.md §2b) this wave
pursues + MUST NOT violate:

- **one-path / no-legacy-code** (§2b "collapse the VT-vs-FLIP fork"; precept README "Execute the plan.
  Do not route around it with stubs, shadow APIs, or temporary compatibility layers"). W02 **excises**
  the second `useLayerTransition` morph engine on the nested path — it does not add a coordination layer
  between two clocks. The doubled state vocabulary collapses to ONE; the greppable sync comment is
  deleted. One orchestrator, one vocabulary, one stagger token.
- **abrogate-before-patch** (§2b "retire the VT fork, re-derive from first principles"). The fix is the
  `(expandedState × activePane)` single-stack re-derivation (slice 1 F2 gestaltFix), not a patch atop the
  two-instance machinery. W02 inherits W01's abrogation (the VT-collapse fork already retired) and
  re-derives the nesting model rather than re-coordinating it.
- **typed-key + paired DI** (§2b "the dock provide/inject collapses onto `createStrictContext`"). The
  morph orchestrator is provided through a NEW typed-key context (`createOptionalContext<DockMorphContext>`)
  with paired provide/use helpers, mirroring the canon `dockContext`/`dockLayerContext` modules — never a
  raw string `provide`/`inject`.
- **substrate-with-consumer / wire-before-retire** (precept README "Substrate and consumer land together.
  A primitive that is not consumed is unfinished work"). The deferral seam ships WITH its consumer (the
  nested `<DockLayerGroup>` in the demo `dock-layers.vue` vertical-overflow showcase) + the demand-side
  close criterion (bbnf-buddy re-adopts at W34). The standalone `<DockLayerGroup>` self-orchestrate path
  keeps the existing consumer whole.
- **no-overfitting** (precept README "A public surface, helper, token, or component branch needs a
  current consumer and evidence. Otherwise delete it"). `--dock-stagger-step` replaces five magic
  numbers with one token consumed by every staggered child; the new morph context has TWO render paths
  (nested + standalone) as its consumers; no speculative orchestration surface is added.
- **no-god-modules** — DEFERRED to W06 (the `dock.css` 1227-line split, LAST in band). W02 does NOT
  carve dock.css for length; it only unifies the vocabulary seam. (Splitting mid-churn would guarantee a
  three-way merge across the dock band — §4 note 19 staging logic.)
- **Gates close on evidence** (precept README; SPEC.md §Hard Gates — NOT grep-only for runtime). The
  born-RED→GREEN π-lane runtime gate (one timeline) + the vitest detector + the deletion-proof
  (greppable-comment removed) + the MANDATORY executed visual-truth audit. The vocabulary gate's
  static-structure arm (one vocabulary count) is paired with the RUNTIME single-timeline proof — never a
  grep alone for the morph behaviour.
- **fail-explicit on library-internal violations vs befitting-silent browser-API degradation** (the two
  never collapsed). The optional-context MISSING-PROVIDER fall-through (standalone `<DockLayerGroup>`) is
  a **befitting-silent** standalone-render path (not a violation) — correctly modeled by
  `createOptionalContext`, not `createStrictContext`. (A `<DockLayer>` used outside ANY group stays a
  fail-explicit `createStrictContext` throw via the existing `dockLayerContext` — unchanged.)

**No RATIFY-BEFORE-IMPL decision in this wave.** The charter's open decisions (font/WEBGPU_PARITY/
glass-scrubber-rename/POS_SCALE) all belong to OTHER waves (W22/W07+W14/W23/W08+W15); W02 carries none.
The one cross-wave contract W02 must HONOR (not ratify) is the fourier `view-transition-name` route-morph
seam preservation (§4 note 23) — W02's `proof:vt-names` guard arm enforces it; the name is W01's
COLLAPSE-fork concern, not a W02 retirement.
