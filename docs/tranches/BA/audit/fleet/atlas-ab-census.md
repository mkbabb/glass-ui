# BA fleet lane — the A+B FORK-GAP CENSUS (atlas d6-lineage reconciliation)

Per-item: the fork's implementation (file:line, API shape, LOC) vs master HEAD's
state vs the NEED restated vs the recommended fold shape. Read against
`docs/tranches/BA/coordination/ATLAS-LETTER-2026-06-12.md`.

**Refs.** Fork = `feat/d6-library-3.10` tip `2755ebbd` (the letter's tip; the
chronology in the letter is loose — `3b10db81` pencil-boil-dep-swap is an EARLIER
commit at `91b8c2f2`'s child, NOT the tip). Merge-base `87c2d384`. Master HEAD =
`fca660e2` (the BA-authoring tree, NOT a literal `v3.13.0` — the published 3.13.0 is
its lineage base). Fork chain off merge-base:
`91b8c2f2`(3.10 ./handmark mint) → `3b10db81`(pencil-boil ^0.4.0) → `9467bd16`(E-arc
3.11.0) → `52ea40ae`(3.11.0 release) → `749d45ad`(measure anchors) → `6eebf846`(3.11.1)
→ `fee5e3cd`(reflow deletion) → `336a9e00`(3.11.2) → `2755ebbd`(icon-morph carve, 3.12.0).

Master grep confirms ZERO files carry `onFlipSettled` / `PAPER_WASH_GROUND` /
`useRouteTransition` / `HandMark` / `InkMark` / `BRUSHES` in `src/` (only a `/handmark`
DEC-8 *mention* in `underline/README.md:109-121`).

---

## A-1 — the post-flip SETTLE seam [S1]

**Fork.** `src/composables/dark/useGlobalDark.ts` — `onFlipSettled(cb): () => void`
added to `UseGlobalDarkReturn` (+ exported `type DarkFlipSettledCallback =
(isDark: boolean) => void`). Mechanism: ONE shared `Set<DarkFlipSettledCallback>`,
a non-immediate `watch(isDark, …)` calls `scheduleFlipSettle(next)` which coalesces a
burst (double-toggle) to the LAST value and drains ALL subscribers in ONE
`requestAnimationFrame` (SSR/no-rAF → `setTimeout(…,0)`). Snapshot-iterates so a
callback (un)subscribing mid-drain can't mutate the live loop. **NO View Transition
anywhere** (PRM-safe by construction). Idempotent re-registration; returns unsubscribe.
~+90 LOC over master's `useGlobalDark`. Born-RED gate `proof:dark-flip-settle` (5/5,
9467bd16 §2g).

**Master HEAD.** ABSENT. `useGlobalDark.ts` (master) carries `isDark`/`toggleDark`/
`disableTransitions`/`setDisableTransitions` only — no settle hook, no batched
post-flip beat. The Safari `colorScheme` watch + the seed-throw machinery are
identical; the `onFlipSettled` set + the FLIP watch are net-new.

**NEED.** ONE post-flip post-paint moment the atlas's color architecture (palette
memo, atomic chart retint, aurora re-derivation) subscribes to, so N expensive
re-theme ops BATCH into a single beat instead of N watcher storms on the critical
frame. "Any natural shape works."

**Fold.** ADOPT the fork's `onFlipSettled` verbatim — it is the canonical shape and
the cleanest. It is NOT subsumable by master's `useViewTransition`/`startViewTransition`:
those run a snapshot-capturing transition the letter explicitly does not want on a
theme flip (PRM-fragile, and a flip is a CSS-class swap not a DOM mutation). A
promise-off-`toggleDark` is the inferior alternative — it would fire per-toggle, not
COALESCE a burst, and could not batch N subscribers into ONE rAF. **Recommend the
single `onFlipSettled` shape** on `useGlobalDark` (the `/dark` subpath); it composes
with B-2's reflow deletion in the same file (land together).

---

## A-2 — the /handmark family [S1 · the largest fold]

**Fork.** Full custom feature-dir `src/components/custom/handmark/` (colocation idiom):
`HandMark.vue`, `brush.ts`(`BRUSHES`/`resolveBrush`/`lerpBrush`), `geometry.ts`
(`shapeGeom`/`serialize`/`boilLines`/`VB_W`/`VB_H`), `ink.ts`(`ink`/`grainFilter`),
`texture.ts`, `freehand.ts`(vendored `getStroke`/`getStrokePoints`), `useHandMark.ts`
(`useHandMark`/`normalizeProps`/`HandMarkCore`/`BoilClock`), `types.ts`
(`HandMarkProps`/`HandShape`/`HandAnimation`/`MarkBox`), `index.ts`. Subpath
`src/subpaths/handmark.ts` → `package.json` `"./handmark"` export. Public surface:
`HandMark` + `InkMark` (the prose alias — ONE impl, zero divergence). `api/index.ts`
exports nothing handmark beyond what rides the barrel. 6 test files
(`tests/components/custom/handmark/{HandMark,baseline,brush,geometry,no-boil,texture}.test.ts`)
+ `scripts/proof-handmark-export.mjs` + `proof:handmark-tests`. Default brush `pen`
(grain:0, zero extra dep); `@mkbabb/pencil-boil ^0.4.1` + `perfect-freehand ^1.2.3` are
OPTIONAL PEERS (only `ribbon:"hull"` touches pf; treeshaken otherwise). **The fork has
NO `underline/` dir** — `/handmark` REPLACED `GlassUnderline` on this lineage.

**Master HEAD.** ABSENT as a family — BUT master ships the canonical `GlassUnderline`
(`src/components/custom/underline/` — `GlassUnderline.vue`/`types.ts`/`index.ts`/
`README.md`, `/underline` subpath, `api/index.ts:108-116` exports
`GlassUnderlineClock`/`Variant`/`Paths`/`Props`/`Expose`). **`underline/README.md:109-121`
carries the BINDING DEC-8 ruling**: a richer `/handmark` family is anticipated; when it
lands it picks ONE of two sanctioned outcomes — (1) `GlassUnderline` FOLDS INTO the
family as its pen-underline render + `/underline` RETIRES in the same publish (clean
break, one-rename re-point, no alias), OR (2) the family lands as a sibling `/handmark`
consuming `GlassUnderline`'s pen render (only if BOTH clear the ≥2-consumer bar).
**FORBIDDEN either way: a second parallel underline impl under `/handmark`.**

**NEED.** The platform's hand voice — "where does it live now?" The ≥2-consumer truth =
the atlas's measured 7-surface/~30-call-site migration (G2b, ahead of underline/
highlighter/silver).

**Fold.** RE-LAND the fork's `/handmark` as a `custom/handmark/` feature-dir + subpath
(adopt the fork code — it's clean, colocation-compliant, born-tested) BUT this is NOT a
naive re-home: it MUST execute the DEC-8 reconcile. The fork already chose outcome (1)
on its lineage (no `underline/` dir). **Recommend outcome (1) at HEAD too**: fold
`GlassUnderline`'s pen-underline render INTO `HandMark` (`shape:"underline"`, `brush:"pen"`)
and RETIRE `/underline` in the same cut — house rule is no parallel impls, no alias, and
the atlas's 7-surface migration is the consumer truth that finally clears the bar DEC-8
gated on. This breaks the public `/underline` + `GlassUnderline*` api/index exports
(major-grade — feeds register D semver honesty). Add the two optional peers. The W-TABS
`.paper-ink-mark` material is UNRELATED (a CSS material for the tabs indicator, not the
component) — no collision. Inherits B-1's measure-anchor fix (see B-1).

---

## A-3 — the flip suppression + toggle exemption [S1]

**Fork.** Commit `2755ebbd` (3.12.0). (1) `src/styles/utilities.css` — the `.no-transition`
theme-flip kill re-keyed `html.no-transition *:not([data-allow-motion])`
(+`::before`/`::after`) so an element may declare `data-allow-motion` to keep its OWN
authored transition through the flip storm; the PRM block GENERALIZED so
`[data-allow-motion]` ALSO snaps under `prefers-reduced-motion` (PRM is absolute — the
two carves compose, motion never leaks past PRM). (2) `DarkModeToggle.vue` — the
`.toggle-sun`/`.toggle-circle` `<g>` declare `data-allow-motion`, and the transitions
re-authored as LONGHANDS (`transition-property`/`-duration`/`-timing-function`, off the
`transition:` shorthand) so the suppression carve + the gate read an explicit
`transition-duration`. (3) `tests/components/custom/controls/DarkModeToggle.icon-morph.test.ts`
— **251 LOC, 6 born-RED assertions** (RED 5/6 on 3.11.2, GREEN 6/6 at this commit);
reads the VERBATIM authored CSS from `src/components/custom/controls/DarkModeToggle.vue`
+ `src/styles/utilities.css`, injects it, drives the REAL `useGlobalDark().toggleDark()`,
asserts the cascaded `transition-duration` on a real `.toggle-sun` (full-motion: ~750ms;
PRM: snaps).

**Master HEAD.** DEFECT IS LIVE. Master's `.no-transition` block
(`src/styles/utilities/a11y-overrides.css:20-24` — utilities.css was SPLIT into
`utilities/` partials at AY) is the BLANKET `html.no-transition *` / `*::before` /
`*::after` → `transition-duration: 0s !important` with NO `data-allow-motion` carve.
Master's `data-allow-motion` appears ONLY in the PRM block (`a11y-overrides.css:7,13`).
Master's `DarkModeToggle.vue:152,157` `<g>` carry NO `data-allow-motion`, and
`:165-172` use the `transition:` SHORTHAND. So on a flip with `disableTransitions=true`
the toggle's 750ms sun↔moon spring is GAGGED (the user's "dark mode still does not
animate the icon").

**NEED.** Both arms: the transition storm dies AND the DarkModeToggle's icon morph runs.
Adopt the d6 carve OR solve structurally better — **but port the test.**

**Fold.** RE-LAND the carve on the master idiom: re-key the `.no-transition` rule in
`src/styles/utilities/a11y-overrides.css` (NOT the retired monolithic `utilities.css`)
to `:not([data-allow-motion])`, and generalize the PRM `[data-allow-motion]` snap there
(it already lives in that file — minimal). Add `data-allow-motion` + longhand
transitions to `DarkModeToggle.vue`. **PORT the 251-LOC test**, re-anchoring its
`UTILITIES` path from `src/styles/utilities.css` → `src/styles/utilities/a11y-overrides.css`
(the split moved the bytes — a verbatim port would read the wrong file and the no-anchor
gate would silently pass). The `data-allow-motion` attribute is already a GENERAL
capability on master (PRM block) — the carve generalizes it to the suppression path with
zero new vocabulary. Land with A-1 (same dark/ band).

---

## A-4 — PAPER_WASH_GROUND + useRouteTransition

### A-4a PAPER_WASH_GROUND [S2]
**Fork.** `src/components/custom/aurora/constants/presets.ts:330` —
`export const PAPER_WASH_GROUND = {…} as const satisfies Partial<AuroraConfig>`: a pure
PRESET PARTIAL (no palette/nuclei/motion) pinning the recessive crayon-ground deposition
dials — `medium:"crayon"`, `strokeOrient:"tensor"`, `granulation:0.3`, `canvasGrain:0.5`,
`strokeAmount:0.35`, `strokeAnisotropy:0.5`, `strokeLayers:1`, `impasto:0`,
`brokenColor:0`, `wetEdge:0`, `saturation:0.92`, `paperGrain:0.008`. Consumer spreads it:
`{...consumerBase, ...PAPER_WASH_GROUND}`. Exported from `aurora/index.ts:16` +
`api/index.ts:64`. Gate `proof:aurora-paper-ground` (born-RED vs smooth default, 5/5,
9467bd16 §2i).

**Master HEAD.** ABSENT as a named const — BUT every config KEY it sets already exists in
master's `AuroraConfig` (the `crayon` medium is first-class at HEAD — `aurora/DESIGN.md:183`
`mediumCrayon`/`uMedium==4`; `strokeOrient`/`granulation`/`canvasGrain`/`strokeAmount`/
`strokeAnisotropy`/`impasto`/`brokenColor`/`wetEdge`/`saturation`/`paperGrain`/`strokeLayers`
all live in master's `presets.ts`). So this is a PURE PRESET re-land — ZERO shader work,
zero new config keys.

**NEED.** A named aurora ground profile (the recessive pigment-on-paper-tooth calibration
pinned once at the library so a data-ground aurora doesn't read as a dead tint).

**Fold.** ADOPT verbatim — add the `PAPER_WASH_GROUND` const to master's
`aurora/constants/presets.ts` + the `aurora/index.ts` + `api/index.ts` exports + the
`proof:aurora-paper-ground` gate. House-rule clean (presets-in-consumers: this is the
LIBRARY's own recessive-ground identity, not a consumer theme — admissible at the root).
Cheapest fold on the A-list.

### A-4b useRouteTransition [S2]
**Fork.** `src/composables/motion/useRouteTransition.ts` (174 LOC) — `useRouteTransition():
{ navigate, supported }` + `supportsRouteTransitions()`, on `/motion-core` + root barrel.
`navigate(nav, {types?})` wraps a possibly-ASYNC navigation callback in
`document.startViewTransition` (awaits it inside `update` so the new DOM is in place
before snapshot), carries explicit PRM + unsupported FALLBACKS (runs nav directly,
unanimated — info parity absolute), returns `{ finished, transitioned }`. Router-agnostic
(no `vue-router` import). Dependency-free.

**Master HEAD.** PARTIALLY adjacent, NEED DISTINCT. Master's
`src/composables/motion/useViewTransition.ts` `startViewTransition(mutate, {types?})`
takes a SYNC `mutate: () => void` only — no async await, no `navigate`, and **no
PRM-fence in the JS** (master pushes PRM to `view-transition.css` `animation:none`; it
does NOT take the instant path under PRM, so a snapshot is still captured). The fork's
async-callback await + JS-level PRM/unsupported instant-path + `transitioned` flag are
net-new and navigation-specific.

**NEED.** The route-transition idiom (the gallery-card-title ↔ dashboard-masthead-title
morph across a `router.push`).

**Fold.** RE-LAND need-shaped — DO NOT clone `startViewTransition` into a near-duplicate.
Recommend EXTENDING master's `useViewTransition` to accept an async `update` + JS-level
PRM/unsupported instant-path (the two genuinely-new capabilities), then expose a thin
`useRouteTransition`/`navigate` convenience over it (the router-case ergonomics + the
directional `types`). This avoids two parallel VT wrappers (the same anti-pattern DEC-8
forbids for underline). The `finished`-resolves-cleanly + `transitioned` contract folds in.

---

## A-5 — MetricBadge amount→value — NO WORK (migration row only)

**Master HEAD.** Already done at AZ.W-METRIC-UNIFY. `MetricBadge.vue:11` primary prop is
`value: MetricValue`; `:49` routes through `coalesceMetric(props.value, …)` (the
zero-value-renders-0 fix). `amount`/`metric-badge__amount`/`amountClass` survive only as
INTERNAL class/var names (`:51,133`), not the public prop. `MIGRATION.md:52` carries the
BREAKING `amount→value` row. **Confirmed — no fold work; the atlas migrates the call site.**

---

## B-1 — HandMark measure anchors (749d45ad) — rides A-2

**Fork.** `749d45ad` (3.11.1) — `HandMark.vue` (+13/-10): the text-mode underline
y-anchor derives `baselineFrac` from a `document.createRange()` measure over the SLOTTED
content (Vue's empty-slot anchors zeroed the Range → `baselineFrac` stayed null → the
legacy `y=32` constant strike survived 3.11.0 at the consumer). **Confirmed PRESENT in
the fork tip `2755ebbd`**: `HandMark.vue:60` `baselineFrac=ref<number|null>(null)`,
`:118 textRangeRect`, `:131 createRange`, `:150 baselineFrac.value=…`, `:160
fonts.ready.then(measure)`, `:162 ResizeObserver`. So the A-2 fold INHERITS this fix
automatically (it's baked into the tip's `HandMark.vue`).

**Fold.** No separate fold — name it in the cut notes as folded-via-A-2 (the
measure-anchor render is IN the adopted `HandMark.vue`).

---

## B-2 — toggleDark forced-reflow deletion (fee5e3cd) [S1 · INDEPENDENT of the merge]

**Fork.** `fee5e3cd` (3.11.2) — `useGlobalDark.ts`: DELETED
`void document.documentElement.offsetHeight` (the forced reflow after adding
`.no-transition`). Rationale (in the fork comment): the `.no-transition` class + the
scheme toggle land in the SAME style recalc, so the after-change computed style already
carries `transition:none` and no transition can start (CSS Transitions §starting fires
off the after-change style) — the ~40ms whole-document synchronous style+layout flush
(atlas E9b.1 profile) was pure cost.

**Master HEAD.** STILL CARRIES THE REFLOW — `src/composables/dark/useGlobalDark.ts:74-75`:
`// Force reflow so the class takes effect before the toggle` / `void
document.documentElement.offsetHeight`. So this is a LIVE ~40ms/flip perf cost on master,
INDEPENDENT of whether the fork merges.

**Fold.** [S1] surgical re-land on master's `dark/` — delete the two lines + replace the
comment. Lands NATURALLY WITH A-1 (same function `toggleDark`, same file) — author A-1's
`onFlipSettled` and B-2's reflow-deletion as ONE `useGlobalDark.ts` edit. Name in the cut
notes per register B.

---

## B-3 — the icon-morph carve (2755ebbd) — rides A-3

Identical to A-3 (the 3.12.0 carve IS the icon-morph fix). Folds via A-3. Name in cut
notes as folded-via-A-3.

---

## The OTHER 9467bd16 E-arc items (letter does NOT claim) — lineage map

The fold decision for each unclaimed item: NOT folded unless a BA wave independently
needs it. One line each (for the 636adeae→here lineage map):

- **2a handmark MEASURED BASELINE** (y=32 dies; Range measure; word-hug 112%→104%;
  `proof:handmark-baseline-unit`) — **rides A-2** (it's IN the adopted `HandMark.vue`/
  `geometry.ts`/`useHandMark.ts`). Not a standalone fold; folds-with-family.
- **2b NO BOIL FOR STATIC MARKS** (`useLineBoil` only for boil|draw-then-boil; `NOOP_BOIL`
  stub; pencil-boil 0.4.1 frameCount guard) — **rides A-2** (handmark-internal). Folds-with-family.
- **2c RING brush** (`BRUSHES.ring`, weight 5, opacity 0.55; `vector-effect:
  non-scaling-stroke`) — **rides A-2** (it's in the adopted `brush.ts`). Folds-with-family.
- **2d GOLD ROUND-TRIP** (`gold-shimmer-pulse` resolves to resting ink over `--duration-seal`
  1.5s; `.text-gilt` drops permanent transparent; `setTimeout` class-yank dies;
  `proof:gold-seal-roundtrip`) — **fork-only-unclaimed; ABSENT on master**
  (`gold-shimmer-pulse`/`text-gilt`/`--duration-seal` grep = 0 in master `src/`). A latent
  gold-seal defect on master, NOT letter-claimed → NOT folded unless register C's gold/silver
  cargo independently needs it (likely adjacent to C's silver-structure-quad — flag for that wave).
- **2e ExpandableContainer SINGLE-SURFACE** (one slot render; `Teleport :disabled`
  re-parents the SAME DOM; settle emit per re-parent; the blank teleported canvas dies;
  `proof:expand-reparent-determinism`) — **fork-only-unclaimed; master DIVERGENT**
  (`ExpandableContainer.vue:17` master uses `<Teleport to="body">` always-teleport — the
  "blank teleported canvas" the fork fixed). A latent defect on master, NOT claimed → NOT
  folded unless a BA wave needs the determinism.
- **2f RAIL COLLAPSE OPT-IN** (vertical no longer hard-forces `alwaysExpanded`) —
  **SUBSUMED on master** by AZ.W-DOCK-TAXONOMY (`useDockShellProps.ts:34,240` — the
  `orientation==="vertical"` force-pin removed; vertical is collapsible at HEAD by a
  different/better idiom; `alwaysExpanded` default false at `GlassDock.vue:44`). No fold.
- **2g useGlobalDark SETTLE** = **A-1** (claimed).
- **2h CONTROL-GLASS carves** (ToggleGroup register=glass wash-rest/quiet-on-select +
  frosted slider track; `proof:control-glass-register`) — **fork-only-unclaimed; absent on
  master** (no glass register on `toggle-group/ToggleGroup.vue`). NOT claimed → NOT folded
  unless a BA glass-register wave (cf. the `dark-register` fleet lane R8 cluster) independently
  needs it; flag for that lane.
- **2i paperWash GROUND** = **A-4a** (claimed).
- **2i-bis POPOVER SPRING** (`popover-animate` enter `--spring-snappy` 200ms / exit
  `--ease-out` 100ms; four `--popover-*` props; `proof:` per easing doctrine) — **PARTIALLY
  present on master** (`hover-popover.css:24` `--popover-foreground`, `:38 .popover-animate`
  canonicalised) but the spring-clock timing fold needs HEAD verification against W-GLASS-CAL.3
  (the spring-clock vocabulary amendment) — likely SUBSUMED-or-adjacent. NOT folded standalone;
  flag for W-GLASS-CAL.3.

---

## Digest (per-item verdict)

| Item | Fork artefact | Master HEAD | Fold |
|---|---|---|---|
| A-1 settle | `useGlobalDark.ts` `onFlipSettled`+`DarkFlipSettledCallback` (~+90 LOC, rAF-coalesced) | ABSENT | ADOPT verbatim (not VT-subsumable); land w/ B-2 |
| A-2 /handmark | `custom/handmark/` 9 files + `/handmark` subpath + 6 tests; `HandMark`/`InkMark`/`BRUSHES`; peers pencil-boil^0.4.1+perfect-freehand^1.2.3 | ABSENT family; `GlassUnderline` canonical + DEC-8 ruling forbids parallel impl | RE-LAND + execute DEC-8 outcome(1): fold GlassUnderline→HandMark, RETIRE /underline (major-grade) |
| A-3 carve | `2755ebbd` `data-allow-motion` carve + longhand + 251-LOC 6-assert test | DEFECT LIVE (`a11y-overrides.css:20-24` blanket, no carve; toggle shorthand) | RE-LAND on `a11y-overrides.css`; PORT test re-anchoring UTILITIES path |
| A-4a PAPER_WASH | `presets.ts:330` const-partial (11 dials) | ABSENT const; all keys+crayon medium EXIST | ADOPT verbatim — cheapest fold, zero shader work |
| A-4b useRouteTransition | `useRouteTransition.ts` 174 LOC async-nav VT wrapper + PRM/fallback | `startViewTransition` SYNC-only, no async/PRM-JS — DISTINCT | RE-LAND need-shaped: extend `useViewTransition` async+PRM, thin `navigate` over it (no parallel wrapper) |
| A-5 amount→value | (consumer migration) | DONE at AZ (`MetricBadge.vue:11` value); MIGRATION.md:52 | NO WORK — atlas migrates call site |
| B-1 measure anchors | `749d45ad` IN tip `HandMark.vue:60-163` | ABSENT | folds-via-A-2 (inherited); name in notes |
| B-2 reflow deletion | `fee5e3cd` removed `offsetHeight` flush | STILL CARRIES `useGlobalDark.ts:74-75` (~40ms/flip) | [S1] INDEPENDENT surgical re-land; land w/ A-1 |
| B-3 icon-morph | = A-3 | = A-3 | folds-via-A-3 |
| E-arc 2d gold/2e expand/2h control-glass | fork-only-unclaimed | absent/divergent | NOT folded unless a BA wave needs (flag C-silver / R8 glass-register) |
| E-arc 2f rail-collapse | fork item | SUBSUMED (AZ.W-DOCK-TAXONOMY) | no fold |
| E-arc 2i-bis popover-spring | fork item | partial on master | flag W-GLASS-CAL.3 (no standalone fold) |
