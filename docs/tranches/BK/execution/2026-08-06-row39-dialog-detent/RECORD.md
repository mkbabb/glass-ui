# BK row #39 · W-DIALOG-DETENT (cut 2) — RECORD

**seat modelId: `claude-opus-5[1m]`** (scout + implement) · authored **2026-08-06** · base
`51cfdfaf` (⊕⁴⁷). The directory carries the real date; the driver's prompt template named
`2026-08-05-row<N>-…` and that prefix is one day stale, so it is corrected here rather
than reproduced.

Spec of record: **TR#39** (`docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:189`)
→ **CWT-2 `:26-161`** (`COMPONENT-WAVES-TERMINAL-2.md`, §DRAWER + §W-DIALOG-DETENT).
Receives **RT-30C**, **RT-30D** and **RT-30G**.

> **CURE ROUND — 2026-08-06.** The first cut was adjudicated **CURE-REQUIRED**: A3's living
> grip was DEAD IN PAINT and the gate locked the defect in. All ten residues are discharged
> and every one is marked in place with a dated bracket. **The ledger is §9**; the paint the
> cure produced is banked at §2.3, §2.4, §2.5, §2.7, §2.10 and §5. Read those brackets as
> superseding the unbracketed prose around them.

---

## §0 · SELECTION — the row, and why it is this one

The prompt's stated HEAD (`4917a042`, ⊕³⁷) was ten ledger entries stale; the tree is at
`51cfdfaf` (⊕⁴⁷, #38 LANDED). The frontier was re-derived from the cursor at that HEAD,
never from a procession line — the ⊕⁴⁷ entry's own §STALE-#22 lesson is that five
consecutive scouts inherited a superseded selectability claim rather than re-reading the
row.

| candidate | disposition | ground |
|---|---|---|
| #21 W-DAG-REDUCE | **SKIPPED — hard gate** | deps `#17`, itself Φ4-UNSTARTED (cursor row 21) |
| #25 W-FIELD-WELL | **SKIPPED — rides-clause** | rides `#82`'s `field-control.css` cut (C-13k) + #27's ladder + #22's rung; TR#25 forbids opening it ahead of them; the ⊕⁴¹ strike-in-place already ruled its "next = #25" line false |
| #32 W-TABS (+#71 inside it) | **SKIPPED — IN-FLIGHT** | uncommitted in the shared tree: `tabs/SegmentedTabs.vue`, `tabs/styles/{drag,segmented}.css`, `morph/useSelectionGroup.ts`, `morph/useSelectionIndicator.ts`, `useDragVelocity.ts`, **`morph/eyeglass.ts` (new)**, **`tests/gates/tabs-seam.test.ts` (new — `G-TABS-SEAM`)** |
| #33 W-ALERT | **SKIPPED — IN-FLIGHT** | uncommitted: `alert/{AlertTitle,AlertDescription,index}`, `_shared/feedback/feedback-tone.css`, **`tests/gates/feedback-tint-seam.test.ts` (new — `G-FEEDBACK-TINT-SEAM`)** |
| #34 W-TOAST | **SKIPPED — sequenced** | TR#34 is `after #33`, and #33 has not landed |
| #35 W-SLIDER | **SKIPPED — IN-FLIGHT** | uncommitted: `slider/{Slider.vue,types.ts}`, **`slider/styles.css` (new, mtime 10:27 the morning of this cut)**, `demo/stories/forms/slider.vue` |
| #36 / #37 | RETIRED | numbers held so no citation dangles |
| #38 W-DIALOG (cut 1) | SEALED | `b155ca4c` + `abe006af`, π `5c87d46d` (⊕⁴⁷) |
| **#39 W-DIALOG-DETENT** | **SELECTED** | next canonical unstarted in TR order; its only gate is `after #38`, which LANDED at ⊕⁴⁷; nothing in the working tree touches `drawer/`, `sheet/`, `dialog/` or the export surface |

**IN-FLIGHT is read off the tree, not off the ledger.** The cursor is a snapshot at
⊕⁴⁷ and marks none of #32/#33/#35 in flight; the shared working tree does, in new gate
executables that name those rows' own seats. Selecting one of them would have been a
collision, and the cursor could not have told anyone so.

---

## §1 · THE ROW, RE-DERIVED AGAINST THE LANDED TREE

CWT-2 was authored at `0371836d`, before #38. Three of its instructions have no subject
at HEAD, and each is re-derived here with its ground stated rather than followed into a
tree that no longer exists. **TR wins on divergence, and TR#39 says only "carries the
drawer MERGE-INTO"** — it names no home, so the home is derived.

**(1) The home is `sheet/`, not `dialog/detents/` (CWT-2 §3.3).** §3.3's receiver was
`<DialogContent placement>`, and #38 split that surface: `DialogContent` is centred-only
with no placement axis, and the edge-anchored surface is `<SheetContent side>`
(`src/components/sheet/`, seeded by #38 at `b155ca4c`). A detent is an extent along an
ANCHORED axis; there is no such axis on a centred plate. CWT-2 §7 REJECTED
`components/sheet/` as a home — on three retirement records that #38 then overturned by a
senior committed act with the driver's own ruling at the ⊕⁴⁷ landing. The rejection's
falsifier is gone, so the ruling goes with it.

**(2) There is no `detents/context.ts` (CWT-2 §3.3's merge).** The merge named two
sources; `dialogStageContext.ts` was deleted whole by #38, so half of it has no subject.
The other half existed to plumb ladder state from a ROOT that owned it to a CONTENT that
consumed it. Both ends are now the same component — `<SheetContent :detents v-model:detent>`
— so the seam has nothing to cross. A provide/inject pair whose two ends are one component
is a context that exists to talk to itself.

**(3) There is no `src/styles/overlay.css` (CWT-2 §3.3's F15 relocation).** F15's defect
was that a zero-consumer stylesheet owned the modal band's scrim scalar over a global
`@import` lane. That lane dies with `drawer/styles.css`, and the scrim's law already has a
single-source home #38 gave it: pure functions in `sheet/motion.ts`. Minting a new
stylesheet for one rule, when the coupling's live home is a two-line function beside the
law it is the sibling of, would re-open the lane the wave exists to close. The relocation
lands in `motion.ts` as `scrimDetentOpacity`.

**(4) §3.4's `4 / 20 / 12` chrome gaps yield to #38's landed sibling.** #38 ruled dialog's
proportion at `24 room · 20/12 family · 12/8 body · 8/4 atom` and shipped `DialogHeader`
at the ATOM rung with `--space-body` between regions. The sheet composes THE SAME LEAVES
(`Dialog*` keeps its names — CWT-2 §3.2, §7). Authoring a second ladder for the same
elements is F13 — "one box built twice" — which is the defect this wave deletes. The sheet
takes the sibling's rungs; only what is peculiar to a DETENTED sheet is authored here.

---

## §2 · THE CUT

### 2.1 · The gestalt fix — a detent is a SIZE (§3.1, A1, dissolves F1 + F2)

`sheet/styles.css` gives the detented arm its extent from the rung scalar and pins it to
its edge:

```
[data-detents][data-side=bottom|top]  block-size: calc(clamp(0, var(--detent-t), 1) * 100dvh)
[data-detents][data-side=left|right]  width:      calc(clamp(0, var(--detent-t), 1) * 100dvw)
[data-detents]                        contain: layout paint
```

Placed AFTER the resting side geometry it supersedes — the plain side sheet's `width: 75%`
/ `max-width: 24rem` sit at the same `:where()` specificity (0,0,0) and would otherwise win
on source order and pin the box while the scalar moved underneath it.

Four consequences fall out and none of them is separately built: the footer sits on the
visible edge at every rung; `0` becomes a legal rung, so a drag-to-dismiss has somewhere
to land; the frost samples a stationary box; and the drag span is the VIEWPORT — a
constant — so the gesture has **no `getBoundingClientRect` on any path**, not just off the
per-frame one.

`@property --detent-t` is registered `inherits: false`, `initial-value: 0` — the DISMISSED
state. An unwritten scalar collapses the sheet and the dead writer is visible in one
glance. A `1` initial would seat it full-open and hide exactly that failure (NO MASKING
FALLBACK).

**The honest cost is stated and unhedged:** `block-size` animates on layout, not on the
compositor. It is paid for with containment on an out-of-flow element, and P7's fps budget
is the falsifier — there is no second geometry behind this one.

**The `<Presence>` sever class is dissolved rather than carried.** The retired engine
resolved its host element fresh every frame precisely because reka forwards content
through a `<Presence>` swap and a captured `$el` goes stale — the whole model↔paint sever
lived downstream of writing to the DOM outside Vue. The scalar is a ref bound through the
render now, so there is no element to lose.

### 2.2 · Velocity INTEGRATED (§3.6, A2, dissolves F2 + F4)

`sheet/detents/projection.ts`, pure and engine-free:

> **the throw coasts for exactly as long as the spring that catches it takes to settle.**

`t_settle = −ln(b)/(ζ·ω)`, `ω = 2π/response` — the envelope horizon, closed-form from the
row's own three numbers. `resolveRelease` projects, then resolves against the ladder
**extended with `0`**.

Nothing tests a threshold. A projected rest below the first rung's half-way point is
nearer `0` than to `ladder[0]` by ordinary arithmetic, and the sheet closes because that
is where the energy pointed. `DRAWER_FLING_VELOCITY` and `steppedDetent` die with the
file; the drag clamp's floor becomes `0`.

**A figure corrected mid-cut, with its measurement.** The first authoring projected the
spring's PEAK EXCURSION (`(v/ω)·exp(−ζθ/√(1−ζ²))`, exact, continuous into the critical
case). It is the right physics for the wrong question: at `dock` it carries a 1493 px/s
fling **0.041 of a viewport**, so the spec's own acceptance pair (1493 vs 625 px/s must
land on different rungs) FAILED on it. Replaced by the settle horizon, which carries the
same fling 0.35 and separates the pair. **And the prose that replaced it was wrong too and
is corrected at the site**: the horizon does NOT reproduce the emitted `--spring-*-settle`
tokens byte-for-byte. Measured — `dock` 0.212 s against a published **0.21**, `bloom`
0.394 s against a published **0.37** — because the generator's solve also requires the
VELOCITY inside the band. Both figures are now stated in the source with the reason they
differ, and the gate asserts AGREEMENT WITHIN 10%, not identity.

### 2.3 · The living grip (§3.7, A3, dissolves F9)

`[data-slot="sheet-detent-handle"]` — `role=slider`, Home/End/arrows, `aria-valuetext`,
`aria-orientation` turning with the anchored axis. Its `inline-size` lerps
`--space-section → +--space-family` across the rung range, so **where the sheet sits is
legible without reading anything**, at rest and mid-drag alike. Both ends are named space
rungs, so `sizing.css` §1.1 transposes the mark for free and no width query is authored.

> **[2026-08-06 cure · C1 + C6] THIS PARAGRAPH WAS FALSE AS FIRST SHIPPED, and the way it
> was false is the row's own lesson.** `--detent-t` is registered `inherits: false` — which
> is CORRECT and is kept, because a nested sheet must never take its parent's rung — and the
> scalar was published on the CONTENT ROOT alone while the rule that reads it is the
> GRANDCHILD grip's. A non-inheriting registered property resolves to its `initial-value` on
> every element that does not declare it, so the grip computed `0` forever and the mark sat
> at a constant 32px at every rung, in every state. The congeal was never affected — its
> `--glass-veil-tier` is DECLARED on the writer element, so `var()` substitutes before
> inheritance is ever asked — which is exactly why the defect was invisible: one consumer of
> the scalar was a declaration on the writer, the other was a rule on a reader.
>
> **The cure is the writer, not the registration** (`SheetContent.vue` `markStyle` →
> `[data-slot="sheet-detent-grip"]`): the mark carries the scalar itself, because the two
> rules that dereference it are its own. Publishing it on the HANDLE instead — the shape the
> adjudication's parenthetical offered — moves the dead read one level closer and leaves the
> grip frozen; an inheriting mirror would work and is refused as a second name for one
> scalar.
>
> **And the α leg is now a leg.** Idle α was a constant `0.45`, moving only on
> hover/focus/drag, so CWT-2 P5 ("grip inline-size **and** α vs `--detent-t`") was
> unsatisfiable on BOTH legs, not one. It now lerps `0.45 → 0.65` — half the distance from
> the idle floor to the engaged `0.85`, spelled with the two values the rule set already
> carries, so engagement keeps its full headroom at every rung and nothing is minted. The
> mark is quiet at the peek and firm at full: the same direction the plate congeals.
>
> **PAINT, measured live** (Chromium, `:5400`, `/containers/sheet`, the demo's
> `[0.25, 0.4, 0.7, 1]` ladder, idle — handle blurred, no pointer over it):
>
> | `--detent-t` | sheet `block-size` | grip `inline-size` | grip idle α |
> |---|---|---|---|
> | 0.12 (live-behind peek) | 96.72px | **34.40px** | **0.474** |
> | 0.25 | 201.50px | **37px** | **0.50** |
> | 0.40 | 322.40px | **40px** | **0.53** |
> | 0.70 | 564.20px | **46px** | **0.59** |
> | 1.00 | 806px | **52px** | **0.65** |
>
> `32 + 20t` and `0.45 + 0.2t` exactly, on a 806px viewport. π P5 is satisfiable on both
> legs now; the π seat still owes the cell.

Proximity is answered by the HANDLE's own region under `@media (hover: hover)`. The
shipped rule was `.glass-drawer:hover` — plate-wide on a 1438×44 host, which moved the
mark from 456px away: a plate reacting to nothing.

Liquid-weight: the width and α legs ride `--spring-dock-duration var(--spring-dock)`, not
an ease. A ladder read-out that snaps linearly is the one part of a liquid surface that
would read as a switch. PRM drops the transition, keeps the read-out.

### 2.4 · The drag surfaces (A4) and a real scroll region (A5)

One `pointerdown` on the sheet root decides for itself. The grip and the header drag
unconditionally; a press inside the body drags only when every scrollable ancestor up to
the root is at its leading edge — pull a settled list and the sheet follows, pull a
scrolled one and the list scrolls. A press on a control never starts a drag.

The detented region is `grid-template-rows: auto minmax(0,1fr) auto`: header and footer
intrinsic and pinned, the body the only thing that scrolls, `overscroll-behavior: contain`
so a pull past its top reaches the sheet and not the page. What shipped was a bare
`<slot/>` at `overflow-y: visible`, which is why nothing could rescue a footer the geometry
had already pushed below the fold.

**The seam (A8), scoped and earned.** A pinned row over a scrolling one gets one hairline
of the plate's own warm ink at each join — `oklch(from var(--glass-veil-ink) l c h /
calc(var(--glass-veil-step) * 2))`, no new token — and ONLY on the detented arm. A plain
sheet pins nothing and earns no line. The rule is scoped under `[data-detents]`, so **the
dialog's own plate is byte-identical**: one owner per file per cut.

> **[2026-08-06 cure · C7] The α was HALF the spec's, silently.** CWT-2 §3.4 (`:78`) rules
> "one warm ink 1px α **0.08**"; the first authoring spent a bare `var(--glass-veil-step)`,
> which is **0.04** (`tokens/glass.css:58`). The stated ground was "no new token" — but
> `calc(var(--glass-veil-step) * 2)` mints nothing either, and the step is precisely the
> register the whole plate ladder is built from (`base ± n·step`), so the doubling is as
> token-pure as the single and stays true if the register moves. A halved figure with no
> record is a divergence, not parsimony. **Painted and read back live: `oklch(0.28 0.035 70 /
> 0.08)` at both joins.**

### 2.5 · The congeal (§3.5, cures F5), on the ONE seam

`--glass-veil-tier` — the same seam `@utility glass-plate` reads and the same one #38 uses
for the dialog rung — takes a live lerp on the detented arm:

```
calc(var(--glass-veil-crown) + (var(--glass-veil-sheet) − var(--glass-veil-crown)) * clamp(0, var(--detent-t), 1))
```

CROWN (`base + 1·step` = **0.18**) at ~~the peek~~ [2026-08-06 cure · C10] **`t = 0`** →
SHEET (`base + 2·step` = **0.22**) at full. Monotone NON-DECREASING, no terminal opaque arm,
α present at `t=1`, and the whole range is ONE step of the published ladder — so no pair of
adjacent rungs can move the plate further than the register itself moves (P2's ≤0.10 holds
by construction, at 0.04 end to end). The shipped shape was its inverse: most opaque at
peek, minimum at 0.85, then a 0.26-α slam to fully opaque.

> **[2026-08-06 cure · C10] THE ANCHOR IS `t = 0`, and that is ruled, not conceded.**
> CWT-2 §3.5 anchors the lerp at `t = ladder[0]`; `CONGEAL_TIER` anchors it at `t = 0`. The
> spec's anchor was written for a geometry in which `0` was not a rung — the shipped drawer's
> drag could not reach the dismissed position at either ladder, which is F2. **This cut makes
> `0` a legal rung** (§2.1, §2.2: the clamp floors at zero and `resolveRelease` resolves over
> `[0, ...ladder]`), so the lerp spans the whole legal range and its low end lands on the
> rung the surface actually has. Moving it to `ladder[0]` would make a CSS constant depend on
> a runtime array — a per-ladder tier string computed in JS — for a delta of 0.01 at the
> demo's peek. Refused as machinery bought with nothing.
>
> **P2's banked delta is corrected accordingly.** `0.18 → 0.22` are the LERP's endpoints;
> what a demo ladder PAINTS across its rungs is a sub-range of that: the four-rung ladder
> `[0.25, 0.4, 0.7, 1]` paints **0.19 → 0.22**, and the live-behind `[0.12, 0.5, 1]` paints
> **0.1848 → 0.22**. P2's substance is untouched — monotone, max step 0.03 ≤ 0.10, α present
> at `t=1` — and the π cell should record the ladder it sampled.

No second plate recipe, no double-named token, nothing minted.

### 2.6 · The scrim law relocated and made conditional (F12, F15)

`ModalOverlay` now holds **no law at all**: one optional `opacity` prop, painted as given.
The laws live with the geometries they describe, both in `sheet/motion.ts`:

- `scrimOpacity(p) = 1 − p` — the slide-dismissed surface (unchanged arithmetic; `DialogContent` and the plain sheet pass it).
- `scrimDetentOpacity(t) = 0.28 + 0.44·clamp01(t)` — the detented surface. **The shipped law relocated verbatim**, not a new one: it measured CORRECT in the drawer's own audit and only ever lived in a stylesheet with one consumer.

This replaces the `slideT` prop, which was one scalar carrying an opacity law that only
one of two callers could be right about. `DialogContent`'s painted result is arithmetically
identical (`scrimOpacity(position)` computed one level up), so π-38's P9 exit-sync cell
(max |Δop| 0.0000, co-terminal) is unaffected.

### 2.7 · The live-behind arm is reka's own (§3.2)

`<Dialog :modal="false">` — verified in reka's source: `DialogOverlay` renders
`createCommentVNode` when the root is non-modal, so there is no scrim at all and the page
behind keeps focus and pointer events. **No `mode` enum is re-minted.** The one thing the
library owes it is the band, and that is a z-index contract on a data attribute:
`[data-modal="false"] { z-index: calc(var(--z-dock) − 1) }` — a live-behind sheet never
covers persistent dock chrome.

> **[2026-08-06 cure · C3] The band was PROSE.** The anatomy test checked the data
> attribute; nothing checked the rule, and swapping the band for `var(--z-modal)` passed all
> 60 gates. §8's "checkable and is checked" was true of the attribute and false of the band.
> `sheet-reach.test.ts` now carries a source-read clause on the rule itself, and the
> `--z-modal` mutation kills it. **Read back live: `z-index: 39` on the live-behind sheet
> against `--z-dock: 40`, no scrim node, `data-modal="false"`.**

### 2.8 · The deletion (§1, §STRIKE), and its dead-selector sweep

`src/components/drawer/` DELETED WHOLE — **12 files, 1,640 lines** measured at HEAD (CWT-2
§8's tokenized 1,613 was taken at `0371836d`; the tree moved, the figure is restated, the
verdict does not change).

Out with it: the entire `--stage-t` apparatus (`@property`, all four couplings, the
`[data-stage-scrim]`/`[data-stage-wrapper]` rules), `DRAWER_SNAP` · `DRAWER_FLING_VELOCITY`
· `steppedDetent` · `BOTTOM_SHEET_LADDER` · `DRAWER_SNAP_KEY` · `DrawerOverlayProps` ·
`.glass-drawer-snap-rule` (0 consumers — deleted, not re-inked) · the four `×1.272 / ÷1.618
/ ÷2.618` C2 pad mints · `DrawerDirection/Mode/Stage` · seven `:root` globals · the
`@import` lane · the five false comments.

**The dead selectors it left, swept in the same cut** (G-CSS-REACH-UNION's NO-DEAD-SELECTOR
arm, and the reason the spec routed G-NO-DEAD-REGISTER out of this row in the first place):

| site | what | disposition |
|---|---|---|
| `glass/a11y-fallback.css` ×3 | `.glass-drawer` in the forced-colors edge, the `Canvas` fill, the decorative-cede list | struck; the recipe left with its file |
| `tokens/scheme-motion.css` | `:where(.glass-drawer, .liquid-stage)` fixed-tempo pin | drawer half struck; **and the sheet is deliberately NOT re-added** — its engine reads `motionTempo()` at construction, so a consumer who slows the library slows the sheet's arrival with it. The surface that used to be pinned here pinned itself against its own engine's read. |
| `tests/styles/glass-subtlety.test.ts` | the 4-clause `immersive stage scrim` describe | **DELETED, not re-pointed.** Its subject file is gone, and a test whose subject no longer exists is ABSENT, not green (⊕²⁵). It also guarded **the last `backdrop-filter` on any scrim in the library** — #38 deleted the other two on a measurement (a wash BRIGHTENED what it occluded: +5.1% core, +31.3% below-plate, +76.0% dark), and that measurement applies to a fixed 14px sample exactly as it applied to the resting ones. |

**False prose corrected at ~~eight~~ [2026-08-06 cure · C10] **ten** further sites**, each of which asserted something the
deletion made untrue: `springPresets.ts`'s per-primitive census (`DRAWER_SNAP` **discharged
by subtraction** — RT-26F loses one of its three rows, because the sheet's engine names
`bloom` and `dock` from the table rather than forking a private seventh register) ·
`useSpringMount.ts` · `useSpring.ts` · `motionTempo.ts` · `glass.css` ×2 (the `crown` rung's
doc-row now names its live consumer, the sheet's congeal floor) · `glass-fx.css` ·
`btn.css` · `dock/constants.ts` · `useKeyboardShortcuts.ts` · `dissolveGrammar.ts`.

### 2.9 · The surface, the demo, the tests

**Exports.** `./drawer` subpath deleted (`package.json` exports + `typesVersions`),
`src/components/index.ts` row deleted, `src/index.ts`'s keyframes-isolation comment deleted
with the claim it made, `subpath-policy.mjs` PUBLISH tally 21 → 20.
`node scripts/regen-exports.mjs`: **exportKeys 67/67 · drops=0 adds=0 targetMismatch=0 ·
EXACT REPRODUCTION: YES** (#38 left it at 68; `./drawer` is the one key that leaves).
`public-surface.spec.ts`: the import and its 8 rows struck.

**Demo (K22, one merged route).** `/containers/drawer` deleted (376 lines); `/containers/sheet`
absorbs it with two new sections — **Detents** (the four-rung ladder, the grip, the fling)
and **Live-behind detents** (`:modal="false"`, the page interactive behind it). Manifest row
merged, `dock-layer-contexts.ts` row struck, the demo search index re-pointed (a row that
named a route which no longer exists is a dead link, not prose).

**Tests, isomorphic.** `tests/components/custom/drawer/` (3 files, 653 lines) deleted; the
surviving claims re-pointed into `tests/components/sheet/sheet-detents.test.ts` (~~10 cases~~
[2026-08-06 cure · C10] **7 cases** — the enumeration on this line always named seven, and
`vitest run` on the file reports `7 passed (7)`:
anatomy, the grip's aria contract, the side-ladder orientation, the scalar publish, the
live-behind band, the full slider keyboard contract, the `v-model:detent` round-trip). What
did NOT survive is named in that file's header rather than silently dropped: the stage
clauses, the `mode="live-behind"` clauses, the `showOverlay` fork, and the
`--drawer-inset-block-end` reserve knob (a sheet whose size IS its rung reserves nothing).

### 2.10 · [2026-08-06 cure] The second clock, and A7's fifth affordance

**C8 — one spring mount, and now the comment is true.** `useSpringMount({open, preset:
"panel"})` was constructed unconditionally and seated a live `SpringProgress` on the open
watch, while on the DETENTED arm nothing reads it: `springStyle` publishes only the rung
scalar, `held` takes `sheetDetents.present`, `scrimAlpha` takes `scrimDetentOpacity`. A
second clock running per-frame against nothing — on the one surface whose gesture gate arms
`G-SPRING-HONEST` and whose sibling seat is `G-SPRING-ONE-JOB (+clock-fence arm — a spring
owns its own clock)`. The kernel's `open` is gated now (`slideOpen = !detented && open`), so
on a detented sheet the panel spring never leaves rest and never seats a clock. The slide
arm is byte-identical in behaviour: `slideOpen` IS `dialogRoot.open` when there is no ladder.

**C9 — the ✕ ships (CWT-2 §4, A7).** A7 names five affordances the drawer never had; the
cut addressed four (the graded halo, the `--radius-ctx` relay, `motion="off"`, Trigger/Close
as exports) and the fifth — a close CONTROL on the surface — was neither built nor refused.
It is built, and it is the **sibling's** control rather than a second one: the 44px target,
the inset capsule, the hover/press split and the focus ring are authored once in
`dialog/styles.css` on an unscoped `[data-slot="dialog-close"]`, so the sheet composes that
rule and adds only what its own host needs — the header gutter reservation, `:has()`-scoped
to the sheet and **off the detented arm**, where the ✕ shares its row with the 44px grip
handle above the region and never reaches the header at all.

Unconditional, and the ground is the plate's own inverted: `DialogContent` drops the ✕ on
two of its three `dismiss` rungs; the sheet has no `dismiss` axis at all — Esc, outside
press and a flick that resolves onto `0` all dismiss it unconditionally — so a knob here
could only hide a control on a surface that stays dismissable anyway. Minting the `dismiss`
grammar onto the sheet to gate one button would import the rebuff machinery for no consumer.

**Read back live:** ✕ at 44×44, `elementFromPoint` returns itself, one click closes the
detented sheet; the plain (ladderless) sheet's header reserves **52px** (`--touch-target` +
`--space-atom`) and the detented sheet's reserves **0**.

---

## §3 · GATES — 2 authored, **seats +0**

Both file under EXISTING seats as arms. Nothing is minted, and the register receipt is
byte-identical pre and post (§4).

| gate | seat it arms | executable | clauses |
|---|---|---|---|
| **G-SHEET-REACH** | LAYOUT — `G1 no-H-overflow (+G2 occlusion arm)` | `tests/components/sheet/sheet-reach.test.ts` | ~~6~~ **9** [2026-08-06 cure · C2/C3/C9] |
| **G-SHEET-GESTURE** | MOTION — `G-SPRING-HONEST` | `tests/components/sheet/sheet-gesture.test.ts` | 7 |

The occlusion arm already says "a declared control of an open surface is reachable";
G-SPRING-HONEST already says "a spring's claims match its paint". Each is asserted here on
the one geometry / the one engine that violated it. CWT-2 §5's third gate,
G-NO-DEAD-REGISTER, is routed to W-GATE-COLLAPSE by the spec itself and is not authored
here — though this cut's §2.8 sweep is exactly what it would have caught.

**BORN-RED, measured on a pristine `git archive HEAD` tree** (`51cfdfaf`, the two files
copied in unchanged) — **re-measured after the cure round, 2026-08-06**:

```
~~11 of 13~~  →  14 of 16 clauses RED
 2 GREEN, both standing locks, named (unchanged — the same two, and only those two):
   sheet-reach · "restores neither `height: 100%` nor `mt-auto`"   (vacuous at HEAD — the
                 subject that DID declare them is `drawer/styles.css`, not the sheet)
   sheet-reach · "keeps the footer a row of the flow"              (same class)
```

**The C1 trap, hit and cured.** The gesture gate's first authoring used a lazy
`await import()` inside each clause — and it still failed at COLLECTION on the pristine
tree, because vite's static import analysis resolves literal specifiers at TRANSFORM time.
One load error and "no tests" is ABSENT, not RED. Cured by importing the **barrel**
(`@glass/components/sheet`, which resolves at every tree) and asserting each symbol's
presence inside its own clause: a tree without the engine yields a namespace without the
symbols, and every clause reds on its own missing export. The reach gate reads source
lazily inside each clause for the same reason.

**MUTATION BITE — 4 mutations, 4 bite, restores byte-identical:**

| mutation | clause killed |
|---|---|
| M1 · `translate: "0 0"` added to the detented style branch | reach · "never translates a detented sheet" |
| M2 · `block-size: 100%` restored on the detented block arm | reach · "sizes the anchored axis off the rung scalar" + "restores neither `height: 100%` nor `mt-auto`" (2) |
| M3 · drag clamp re-floored at `ladder[0]` | gesture · "mints no velocity threshold and floors the drag clamp at ZERO" |
| M4 · a fixed `|v| >= 0.5 → ±0.15` threshold replaces the projection inside `resolveRelease` | gesture · "(b) a 2× velocity separation lands on DIFFERENT rungs" |

M4 kills exactly one clause and that is correct, not a gap: it mutates `resolveRelease`
alone, and the monotone clause exercises `projectRest`, which it does not touch.

**[2026-08-06 cure] SIX FURTHER MUTATIONS, SIX BITE.** These are the ones the first cut's
gate could not feel — including the two the adjudication's challengers ran green:

| mutation | clause killed |
|---|---|
| X1 · freeze the width lerp (`var(--space-family) * clamp(0,--detent-t,1)` → `* 0`) | reach · "binds the scalar's WRITER to its READER" |
| X2 · freeze the idle α back to the constant `0.45` | reach · "binds the scalar's WRITER to its READER" |
| X3 · the live-behind band → `var(--z-modal)` | reach · "bands a live-behind sheet UNDER the dock chrome" |
| X4 · drop the header's ✕ gutter reservation | reach · "renders the close affordance and reserves its gutter" |
| X5 · remove `:style="markStyle"` from the grip element (the ORIGINAL defect, re-applied) | reach · "binds the scalar's WRITER to its READER" |
| X6 · drop `data-slot="dialog-close"` from the rendered control | reach · "renders the close affordance and reserves its gutter" |

X1 and X3 are Challenger A's own X1/X6, which passed all 60 gates before this round. X6
bit only after the clause was tightened from a substring search to a match on the RENDERED
element: this file's comments name the shared recipe by its selector, so `toContain` passed
on a sheet that rendered nothing — the same vacuous-green class as C5, caught on itself.

All six restored from scratch copies, `shasum -a 256` byte-identical on both files.

---

## §4 · VERIFY GATE (verbatim)

```
$ npx vue-tsc --noEmit
(exit 0, no output)

$ npx vitest run tests/styles tests/components tests/gates
 Test Files  158 passed (158)
      Tests  1339 passed | 3 expected fail (1342)

$ npx vitest run          # FULL — the row deletes a demo story and touches the root
                          # barrel, which is #38's C1 standing rule
 Test Files  219 passed (219)
      Tests  1748 passed | 3 expected fail (1751)
   ... run twice, consecutive, identical

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:0
```

The register receipt is **byte-identical pre and post** — the same line was taken before
the first edit and after the last. Seats **+0**.

```
$ npm run build && npm run demo:dist:build
(exit 0, exit 0)   dist-demo modulepreloads: 60      # the hard ceiling, held
$ node scripts/regen-exports.mjs
REGEN (PUBLISH-driven): exportKeys 67/67  jsSubpaths=61  drops=0 adds=0 targetMismatch=0
  >>> EXACT REPRODUCTION: YES
EXIT 0
```

### The pre-existing RED, and the one thing this cut MASKS

The tree was **not** clean when this row opened, and the baseline was measured before
anything was touched:

- `tests/public-surface.spec.ts` "ships exactly the style closure" — RED, cured by a `npm run build` (stale `dist/`, missing another lane's untracked `slider/styles.css`).
- `tests/gates/boot-graph.test.ts` — **61 modulepreloads against a hard 60**, and it survived the rebuild. Proven **NOT this row's**: a `git archive HEAD` tree built and run in isolation is **GREEN at 60**, so the +1 belongs to the uncommitted tabs/slider/alert lane.

Post-cut the graph reads **60**. **That is arithmetic, not a repair.** This row's deletion
removes modules from the eager graph and its −1 offsets the other lane's +1. The other
lane's regression is now INVISIBLE to the ceiling and will resurface the moment this cut
lands without it, or the moment either lane's module count moves again. Routed as
**RT-39A → the tabs/slider/alert lane** (#32/#33/#35), stated here so no one later reads a
green ceiling as evidence it was fixed.

---

## §5 · π — OWED, with the reason it did not run here

CWT-2 §6 owes eight cells on `/containers/sheet` at 1440×900 and 390×844, Chromium 149 AND
real `safari-app`. **Not run at this seat, and not claimed.** The browser MCP seat is a
global singleton — two concurrent browser-owning agents hijack each other's selected page,
and distinct ports do not isolate it — and **three lanes are live in this shared tree**
(#32/#33/#35, one of them writing files twelve minutes before this cut opened). Taking the
seat would have been a collision with a lane that could not have been asked.

The cells stand exactly as CWT-2 words them, with the two figures this cut adds:

| # | cell | the delta this cut owes it |
|---|---|---|
| P1 | footer `rect.bottom` ≤ innerHeight + `elementFromPoint` identity at every rung | BEFORE 1554.66 / 1419.66 / 1149.66 vs 900 → AFTER ≤ vh at all four |
| P2 | plate α monotone ↑, max step ≤ 0.10, α present at t=1 | AFTER: the lerp spans 0.18 (`t=0`) → 0.22, one veil step end to end; a four-rung `[0.25,0.4,0.7,1]` ladder PAINTS **0.19 → 0.22**, max step 0.03 — record the ladder sampled [2026-08-06 cure · C10] |
| P3 | `[data-slot=glass-graded-halo]` resolves ≠ `none`, graded per edge, four sides | Safari's masked-backdrop path is the risk cell — bank independently |
| P4 | r24 inner corners · pad/gap ∈ series · one rung down at 390 | BEFORE r12/16, 20.352 / 6.11154 / 12.5785 |
| P5 | grip inline-size + α vs `--detent-t`; idle samples DIFFER across t; body hover at (720,500) must NOT move it | BEFORE identical at rest, 36 → 41.39 from 456px away. **[2026-08-06 cure · C1/C6] BOTH LEGS NOW MOVE — read live at `:5400`: 34.40/0.474 · 37/0.50 · 40/0.53 · 46/0.59 · 52/0.65 px/α at t = 0.12/0.25/0.40/0.70/1.00.** The π seat re-takes the cell at its own viewports and engines; this is the cure's own paint, not the cell |
| P6 | settle trace 0.4 → 1 | budget ≤465 ms, band ≤0.9%; a miss retunes the canon, never forks it |
| **P7** | **drag + settle median ≥ 55fps, no long task > 50ms** | **THE §3.1 FALSIFIER for the size-geometry. A miss escalates the wave; there is no second path.** |
| P8 | `[data-stage-wrapper]` absent, no rule targets it | **already discharged on source**: `grep -rn 'data-stage-wrapper|--stage-t|data-stage-scrim|data-stage-scale|data-stage-immersive|glass-drawer' src/ demo/ tests/` → **0** |

`safari-app` via `scripts/safari-probe.mjs` (`pkill -f safaridriver` first). Playwright-WebKit
may not be labelled Safari.

### [2026-08-06 cure] BANKED FOR THE π SEAT — two items, verbatim

**π-39 WATCH ITEM (halo ramp vs a rung-sized box).** The graded halo's gradient AND mask
stops are fixed pixels — `40px` and `120px`, "full depth 120px inward" (`styles.css`, the
`glass-graded-halo` rule). Under the retired geometry the box was always ≥ viewport-tall, so
those stops were always a small fraction of it. **A1 made the box the rung**, so at a peek
rung under 120px tall the ramp never completes and the plate reads at the near-sharp crown
end throughout — no deep-frost field anywhere on the surface. **Measured on this cure's live
pass: the live-behind peek (`t = 0.12`) paints a 94.72px halo box against a 120px stop.**
**P3 as worded cannot catch it** — it asserts only that the halo resolves `≠ none`, which is
true of a fully-crown ramp. The π seat should sample the halo's own α at the far edge at the
LOWEST rung of each ladder, not merely its resolution, and route a fix if the ramp is dead
there. It is a regression class A1 created; it is not a reason to un-make A1.

**P7 remains §3.1's falsifier** — drag + settle median ≥ 55fps, no long task > 50ms. The
size geometry animates `block-size` on layout by design and was bought with exactly this
budget; **a miss escalates the wave, and there is no second geometry behind it.** Nothing in
this cure round touched it, and nothing here may be read as evidence for it.

---

## §6 · LOC

| | before | after |
|---|---|---|
| `src/components/drawer/` | **1,640** (12 files, measured at `51cfdfaf`) | **0** |
| `src/components/sheet/` | 403 (4 files) | **1,158** (6 files: +`detents/projection.ts` 110, +`detents/use.ts` 282, SheetContent 179→320, styles.css 185→373, motion.ts 37→56, index.ts 2→17) |
| `src/components/dialog/` | 679 (9 files) | 684 (ModalOverlay's one-knob swap +2, DialogContent +3) |
| **library total** | **2,722** | **1,842** — Δ **−880** |
| `tests/components/custom/drawer/` | 653 (3 files) | 0 |
| `tests/components/sheet/` | 355 (2 files) | 824 (5 files: +detents 174, +reach 130, +gesture 165) |
| `demo/stories/containers/` | drawer 376 + sheet 157 | sheet 283 — Δ **−250**, one route |

Tracked diff over this row's paths: **47 files, +612 / −2,823**. Untracked additions: 5
files, 861 lines. Net across both: **−1,350**.

> **[2026-08-06 cure · C10] TWO OF THOSE 47 FILES ARE NOT WHOLLY THIS ROW'S, and the driver
> must scope the commit accordingly.** `src/styles/index.css` and
> `tests/styles/glass-subtlety.test.ts` are SHARED files carrying another lane's uncommitted
> bytes: ≈20 insertions in them belong to **#35 W-SLIDER** (`index.css`'s `17c.` doc row and
> its `@import "../components/slider/styles.css"` block; `glass-subtlety.test.ts`'s
> grasp-register widening and its `Slider.vue` → `styles.css` re-point). This row's own bytes
> in those two files are the drawer `@import` deletion and the 4-clause `immersive stage
> scrim` describe deletion (§2.8) and nothing else. Three more shared-tree lanes stand
> untouched by this row entirely and must not ride the commit: #32 (`tabs/*`,
> `morph/useSelection*`, `morph/eyeglass.ts`, `tests/gates/tabs-seam.test.ts`), #33
> (`alert/*`, `feedback-tone.css`, `tests/gates/feedback-tint-seam.test.ts`), #35
> (`slider/*`, `tests/components/a11y/{coarse-target,focus-visible}.test.ts`, its demo
> story).

---

## §7 · ROUTED

| id | what | owner |
|---|---|---|
| **RT-39A** | the boot-graph +1 from the uncommitted tabs/slider/alert lane, now MASKED by this cut's deletion — a green ceiling is not evidence it was fixed | #32 / #33 / #35 |
| **RT-39B** | π-39, all eight cells, both viewports, Chromium + real `safari-app` — **P7 is the size-geometry's falsifier** | a π seat, serialized against the browser singleton |
| **RT-30C** | dialect (ii) **flicked return-to-anchor** (`blur = k·\|v\|`, both directions), routed here at ⊕⁴⁵ — **[2026-08-06 cure · C4] RECEIVED AND RULED, split.** Its MOTION SHIPS: `detents/projection.ts` integrates the release velocity over the catching spring's own settle horizon, so a throw that projects short is carried back to its anchor and one that projects past the first rung resolves onto `0` and dismisses — the dialect's behaviour, built as physics rather than as a recipe. Its INK is **REFUSED**, on three grounds and none of them scheduling: **(1)** `blur = k·\|v\|` is a per-frame `filter` over the whole plate during exactly the drag-and-settle window that is this row's own falsifier — the detent is a SIZE, the box already animates on layout, and **P7's fps budget is the price that bought that geometry**; spending it twice before it has once been measured is the second cost §3.1 explicitly refused. **(2)** The surface's exit is that same spring reversed to `0`; a velocity-coupled blur composed onto it is **two exits on one clock** — the identical ground RT-30D is refused on one row below. **(3)** `k` has **no mechanism of record**: `IOS27-ARCHIVE.md` §4b measures the vaporize's three channels, not this one, and #30's own law is that an unmeasured dialect is NAMED, never authored from a guess. `dissolveGrammar.ts`'s `flicked` row is reconciled at the site: `built: false` and `owner: "#39 W-DIALOG-DETENT"` **stand** — the field means the row that owns the SURFACE, and the sheet is this row's — with the receipt, the split and all three grounds written into its `comment`, per RT-30G's law that a route is discharged, never silently dropped | ruled here; the row that revives the ink owes the measurement first |
| **RT-30D** | `.glass-vaporize` adoption at the sheet's exit — **REFUSED HERE with its ground**: the detented exit is the SAME spring reversed to `t=0`, and a dissolve grammar composed onto a surface whose extent is already collapsing would be two exits on one clock. The centred/menu/popover half of RT-30D is untouched by this row | #89 (overlay) |
| **RT-30G** | `.glass-reveal[data-motion="off"][data-state="closed"]` — **no subject on this surface**: neither `SheetContent` nor the sheet's partial composes `.glass-reveal`, at HEAD or after this cut (grep → 0). Received and discharged as not-applicable, not silently dropped | back to the cascade-contest lane |
| **RT-26F** | loses one of its three rows — `DRAWER_SNAP` is DISCHARGED BY SUBTRACTION; the two survivors (`useSpring`'s bare default, the blob pointer pair) are unchanged | #26's design seat |
| CWT-2 §9 | `radius-dialog-bind` / plate-edge α / the `axes-ext` fence mint-or-delete-claim / the public-surface hash re-pin — all four already carried by #38's RT-38A/B/D and the C-9 batched pin | #65 |
| CWT-2 §9 | `text-subheading` lh 1.00 vs §1.4 — shared with DialogTitle, untouched here | typography wave |

---

## §8 · WHAT THIS ROW REFUSED, AND WHY

- **A `Sheet*` rename.** CWT-2 §7 killed it and nothing has changed: renaming the publish primitive to a name retired one cut ago is churn for zero user-visible gain. `Dialog*` keeps its names and the sheet composes them.
- **A `mode` enum.** `:modal="false"` is reka's, it is measured-correct, and it renders no overlay at all. Re-minting `live-behind` would be a second name for a native arm.
- **A `detents` fence on `left`/`right`.** The geometry is axis-agnostic; the `[]` sentinel that ASK-33 was written against dies with the file. Side ladders are legal and the gate asserts the grip's orientation turns with the axis.
- **The `--drawer-inset-block-end` reserve knob.** A sheet whose size IS its rung reserves nothing; the live-behind band is the z-index contract, which ~~is checkable and is checked~~ **[2026-08-06 cure · C3] is now checked on the RULE, not only on the data attribute — the `--z-modal` mutation kills a clause, and the band reads `z-index: 39` in paint against `--z-dock: 40`**.
- **`.glass-vaporize` on this exit** (RT-30D) — grounds above.
- **[2026-08-06 cure · C4] The flicked dialect's INK** (RT-30C) — its motion ships, `blur = k·|v|` is refused on P7's budget, the two-exits-on-one-clock ground, and the absence of any measurement for `k`. Grounds in full at §7.
- **[2026-08-06 cure · C9] A `showClose`/`dismiss` knob on the sheet.** A7's fifth affordance SHIPS, unconditionally: the sheet has no dismissal grammar to gate it against — Esc, outside press and a flick onto `0` all dismiss it — so the knob could only hide a control on a surface that stays dismissable, and minting the plate's `dismiss` axis here would import the rebuff machinery for no consumer.

---

## §9 · THE CURE ROUND — 2026-08-06, `CURE-REQUIRED` discharged

Adjudication: **CURE-REQUIRED**, ten residues (C1–C10) plus a banked π watch item. All ten
are applied below; nothing was deferred and nothing was refused without its ground stated at
the site. **Seats +0 still holds** — the three new clauses are arms of the existing
`G-SHEET-REACH` executable, and the register receipt is byte-identical.

| # | cure | site |
|---|---|---|
| **C1** | The grip is LIVE. `--detent-t` stays `inherits: false`; the scalar is published on the grip ELEMENT, whose own rules dereference it. Handle-only publishing is refused (moves the dead read one level closer); an inheriting mirror is refused (a second name for one scalar) | `src/components/sheet/SheetContent.vue:211` (`markStyle`) → `:363` (bound on `[data-slot="sheet-detent-grip"]`) |
| **C2** | Writer bound to reader — the SFC's publish AND both read-out legs asserted together, so the freeze-the-lerp mutation bites; `:101`'s registration clause kept alongside | `tests/components/sheet/sheet-reach.test.ts:112` |
| **C3** | The live-behind band armed on the RULE, not the attribute | `tests/components/sheet/sheet-reach.test.ts:141` |
| **C4** | RT-30C ruled on the merits: motion ships, ink refused, three grounds; `dissolveGrammar`'s `flicked` row reconciled at the site | §7 above · `src/composables/motion/dissolve/dissolveGrammar.ts:62-68` |
| **C5** | The deleted `drawer/styles.css` struck from the color-mix per-file fence — a deleted subject is ABSENT, not green | `tests/styles/color-mix-endpoints.test.ts:128-133` (+ the header note at `:21-23`) |
| **C6** | The α leg AUTHORED: idle α lerps `0.45 → 0.65` with `t`, spelled from the two values already in the rule set | `src/components/sheet/styles.css:236` |
| **C7** | Seam ink at the spec's α **0.08** via `calc(var(--glass-veil-step) * 2)` | `src/components/sheet/styles.css:170`, `:180` |
| **C8** | The second clock silenced — `useSpringMount` gated off the detented arm, so "ONE spring mount" is true | `src/components/sheet/SheetContent.vue:115-116` |
| **C9** | A7's fifth affordance shipped, plus the sheet-scoped gutter reservation | `src/components/sheet/SheetContent.vue:322-336` · `src/components/sheet/styles.css:196-202` |
| **C10** | Record corrections, all strike-in-place and dated: `10 cases` → **7**; `eight further sites` → **ten**; the CROWN anchor grounded at `t = 0` with P2's painted delta restated; the §6 note that ~20 insertions in `src/styles/index.css` + `tests/styles/glass-subtlety.test.ts` are **#35's** bytes in shared files | §2.5, §2.8, §2.9, §5 P2, §6 |
| **π** | The halo's fixed 40px/120px stops in a rung-sized box (measured: a 94.72px box at the live-behind peek) + P7 the fps falsifier — both banked verbatim for the π seat | §5 |

**Live pass** (Chromium, own dev server on `:5400`, killed on exit; MCP page closed): the
grip's two legs measured at five rungs, the seam ink read back at `0.08`, the band read back
at `39`, the ✕ hit-tested and clicked shut, the plain sheet's 52px gutter and the detented
sheet's 0px both confirmed. **No fps claim is made here — P7 is the π seat's and remains
owed.**

---

## §10 · CURE II (π-39 escalation) — 2026-08-07

**seat modelId: `claude-opus-5[1m]`** (cure seat, exclusive browser owner) · discharges the
two outcome-changing REDs of `PI-39.md` — **π39-R2 (P1)** and **π39-R1 (P7)**.

**Read the P7 disposition before quoting anything from it.** P1 is CURED and re-measured
green at all four cells. **P7's baseline does NOT reproduce at this seat**, on the very bytes
π-39 measured — so its cure is applied on the named mechanism and its verdict is **still
owed**. Nothing here may be read as P7 cleared.

### 10.1 · The tree this seat opened on

`git diff` at open: `src/components/sheet/styles.css` already carried an **uncommitted P1
geometry cure** (mtime 2026-08-06 20:13, +30/−5) — the root two-row grid, the region's
`block-size: 100%` struck, `align-content: end`, the header row at `minmax(0, auto)` with its
own `overflow: hidden`, and `:not([data-detents])` on the bounded side-region rule. It was
**untested against its own gate**: `sheet-reach.test.ts` read RED on the three-row clause
(`1 failed | 34 passed`). This seat adopted those bytes, verified them in paint, and cured
the gate to the shipped grammar. Everything else in `styles.css` and the whole of
`SheetContent.vue` are unchanged from `336dacf9`.

### 10.2 · CURE-P1 — the region is the REMAINDER, and the root is two rows

**Mechanism.** The detented region sat BELOW the 44px grip handle in the root's normal flow
while claiming `block-size: 100%` — the whole content box — so the flow ended exactly one
handle past the sheet's own edge and carried the footer with it, and `contain: paint`
destroyed 24 of the footer's 53px. The root is now a **two-row grid**
(`auto minmax(0, 1fr)`): the handle's row, then the remainder, which is what the region
always meant. Inside it the three-row grammar becomes
`minmax(0, auto) minmax(0, 1fr) auto` with `align-content: end` — so a rung too short for the
sheet's intrinsic chrome loses the CROWN and never the action: the header yields first
(and clips its own overflow, which a grid item does not), the footer's end stays on the
region's end, and the footer's `rect.bottom` is the sheet's inner edge by construction.

**Files.** `src/components/sheet/styles.css` (adopted, unchanged by this seat) ·
`tests/components/sheet/sheet-reach.test.ts` (the gate).

### 10.3 · CURE-P7 — the sampler's box is CONSTANT across the rung range

**Mechanism.** The graded halo was `inset: 0` inside a box whose extent IS `--detent-t`, so a
drag re-derived a `1438 × N` `backdrop-filter: blur(34px) saturate(1.5)` region on every frame
and re-rastered its gradient and mask with it. Each side now pins the halo to the
**viewport-facing edge — the one its ramp is anchored at** — and gives it the largest extent
it can ever need (`100dvh` / `100dvw`), releasing the opposite inset; the box's geometry is
therefore invariant across the whole rung range and only the root's paint clip moves. The
surplus always runs AWAY from the viewport, off-screen behind the anchored edge, where
`contain: paint` cuts it.

**Why this shape and not the others.** A `translate`-driven reveal would put a `translate:`
declaration inside a `[data-detents]` rule, which is the one thing `G-SHEET-REACH`'s
"never translates a detented sheet" clause forbids — and the clause is right: the promise is
that nothing on this arm moves by transform. A static viewport-pinned filter with a
per-frame-moving mask keeps the filter still but re-rasters a viewport-scale mask instead,
trading one per-frame cost for another. Suppressing or shrinking the blur during a drag is a
masking fallback and is refused outright.

**Identity, proved and then measured.** The ramp's stops are absolute pixels measured from
that same edge, and the trailing `100%` stop resolves at or beyond the `120px` full-depth stop
either way — so the mask is the identical function of distance-from-edge over the visible
interval, at every rung. Measured at the live-behind peek (`t = 0.12`, the rung where the old
box's `100%` stop clamped): the halo's top edge is **793** before and after, and the painted
delta over the sheet's strip is **RMSE 0.00422** against a **noise floor of 0.00357** taken
from two consecutive frames under identical conditions (the demo's background animates) —
i.e. indistinguishable. The four sides were read at both ends of the ladder: box
`1438 × 900` (bottom/top) and `1440 × 898` (left/right), **constant**, with the pinned edge
tracking the sheet and the surplus off-screen (bottom sheet `top 676 → 1`, `bottom 1576 → 901`;
top `bottom 224 → 899`, `top −676 → −1`; left `right 359 → 1439`, `left −1081 → −1`; right
`left 1081 → 1`, `right 2521 → 1441`).

**Files.** `src/components/sheet/styles.css` (4 rules, 8 declarations, one comment block) ·
`tests/components/sheet/sheet-reach.test.ts` (the gate).

### 10.4 · VERIFY (in the standing order)

```
restores byte-exact FIRST — shasum -a 256 -c, all three scratch copies: OK

$ npx vue-tsc --noEmit
(exit 0, no output)

$ npx vitest run tests/components/sheet tests/components/dialog tests/styles
 Test Files  1 failed | 32 passed (33)
      Tests  1 failed | 425 passed | 2 expected fail (428)
   the one failure: tests/styles/stacked-url-filter.test.ts — an `it.fails` BORN-RED that
   now PASSES on PagerDots.vue. Its own header names its owner: "#40 W-PAGER owns the flip".
   FOREIGN — that lane holds uncommitted work in this tree.

$ npx vitest run tests/gates tests/components/sheet tests/components/dialog tests/styles
 Test Files  3 failed | 39 passed (42)
      Tests  5 failed | 523 passed | 2 expected fail (530)
   all 5 FOREIGN, each named:
     gate-register ×3  — `tests/components/pager-dots.contract.test.ts` missing (#40's lane)
     overfit-structure — MAX_TILT_DEG, LEAD_TRAIL_TAU_E_S, trailOffset unreachable
                         (sortable-list / useLeadTrail — #40 / the morph lane)
     stacked-url-filter — as above

$ npx vitest run tests/gates/boot-graph.test.ts
 Test Files  1 passed (1)      Tests  14 passed (14)      # modulepreload ceiling 60, held

$ npm run demo:dist:build
(exit 0)

$ npm run build
BLOCKED — FOREIGN, and it blocks at HEAD's own bytes too:
  Error: package.json/package-lock.json root metadata mismatch:
         devDependencies, peerDependencies, peerDependenciesMeta
  `package.json` is uncommitted in this shared tree with `embla-carousel` +
  `embla-carousel-vue` struck from peerDependencies / peerDependenciesMeta /
  devDependencies and no lockfile regeneration. Not this row's file and not touched here.
  The library build therefore could NOT be run this round; `demo:dist:build` (which builds
  from `src/`) was run instead and the paint re-take is on ITS bytes.
```

**The paint re-take is on the BUILT demo** — `npm run demo:dist:build` → `vite preview` on
**:5677**, a port this seat owns (never :5400/:5731/:5344), `content-type text/html` + HTTP 200
verified on the deep route, killed on exit.

### 10.5 · PAINT RE-TAKE — P1 · **GREEN at all four cells**

Chrome **150.0.0.0** via chrome-devtools MCP. 1440×900 DPR 2 and 390×844 DPR 3 by
`emulate`. Rungs reached by the shipped keyboard path on the `role=slider` grip, scalar
allowed to go quiet, then `getBoundingClientRect` + `elementFromPoint` at the action's centre.
Safari is OWED elsewhere and was skipped per this seat's dispatch.

**1440×900, ladder `[0.25, 0.4, 0.7, 1]`** — `innerHeight` **900**:

| t | sheet h | footer `bottom` | action `bottom` | action centre | action identity | header h |
|---|---|---|---|---|---|---|
| 0.25 | 225 | **879** | 879 | (1381, 859) | **true** | **62** (yields) |
| 0.40 | 360 | **879** | 879 | (1381, 859) | **true** | 84.42 |
| 0.70 | 630 | **879** | 879 | (1381, 859) | **true** | 84.42 |
| 1.00 | 900 | **879** | 879 | (1381, 859) | **true** | 84.42 |

**1440×900, live-behind ladder `[0.12, 0.5, 1]`:**

| t | sheet h | footer `bottom` | action identity | header h |
|---|---|---|---|---|
| 0.12 (peek) | 108 | **879** | **true** | **13** (yields to the seam) |
| 0.50 | 450 | **879** | **true** | 84.42 |
| 1.00 | 900 | **879** | **true** | 84.42 |

**390×844 DPR 3** — `innerHeight` **844**: sheet h 211 / 337.59 / 590.80 / 844, footer
`bottom` **831** at all four rungs, action identity **true** at all four.

**The deltas, verbatim.** 923 → **879** (1440, every rung) · **1018.42 → 879** (the
live-behind peek) · 875 → **831** (390, every rung) · action identity **false → true** at
every rung of both ladders and both viewports. The footer now clears the fold by **21px**
at 1440 and **13px** at 390, and the block-END overflow that `contain: paint` used to destroy
is gone: at both `t = 0.25` and `t = 1` the region's `bottom`, the sheet's content-box bottom
and the footer's `bottom` are all **879**, `OVERFLOW_PAST_CONTENT_BOX` **0**, and the region
scrolls **0**. What a short rung still cuts is at the region's START edge — the header,
by the rung's own law (62px at `t = 0.25`, 13px at the peek, against an intrinsic 84.42).

**A positive control on the same page, in the same session.** π-39's geometry was restored
by injecting HEAD's own declarations at a specificity that beats the shipped `:where()`
rules — and it reproduced π-39's figure to the digit: footer `bottom` **923** vs 900 at
`t = 1`. The 879 is this cut's, not the apparatus's.

**Artefacts:** `pi39cure-P1-t1.00-1440.png` (the Close button whole on the visible edge),
`pi39cure-P1-t0.25-1440.png`, `pi39cure-P1-peek-t0.12-1440.png` (the 108px peek: the crown
truncated to a 13px sliver, ~~the action and the ✕ both whole and hit-testable~~ **[2026-08-07
cure II ROUND II: STRUCK — the ✕ was; the ACTION was not. On these very bytes the action is 45%
clipped at 900 and 81% clipped at a real 780, and `rect.bottom` could not see it because
`align-content: end` pins that edge whether or not a pixel paints. §11.1]**, the dock
correctly over the live-behind sheet), `pi39cure-P1-t0.40-390.png` (against π-39's
`pi39-P1-t0.40-390.png`, where Close was a sliver and the `rung = 0.7` row was cut mid-glyph).

### 10.6 · PAINT RE-TAKE — P7 · **THE BASELINE DOES NOT REPRODUCE AT THIS SEAT**

**This is the honest headline and it is not a pass.** Every P7 cell measured green here —
including the cells measured on the **pre-cure bytes** — so the measurement carries no
information about the defect, and P7 is **not struck**.

Method as π-39 §8 Method A, verbatim: one synthetic `pointermove` per animation frame from
the grip, the same disclosed `setPointerCapture` `NotFoundError` shim, `pointerup`, then the
settle sampled until the scalar is quiet; frame deltas are rAF timestamps. Built bundle,
1440×900 DPR 2.

| cell (3 runs each, post-cure) | median | mean | % < 55 fps | > 50 ms |
|---|---|---|---|---|
| LOW band 0.25 → 0.40 | **98.04 fps** | 97.98 / 97.98 / 98.15 | **0** | 0 |
| HIGH band 0.70 → 1.00 | **98.04 fps** | 97.99 / 97.77 / 98.09 | **0** | 0 |
| headline gesture 0.25 → 0.70 → 1.00 (`dy −420`) | **98.04 fps** | 98.08 / 98.17 / 97.98 | **0** | 0 |
| REST `t = 1`, 150 frames | **98.04 fps** | 97.88 | **0** | 0 |
| REST `t = 0.25`, 150 frames | **98.04 fps** | 97.98 | **0** | 0 |

Nominally: drag+settle median **98.04 fps** on both bands against a **≥55** bar, and the
rest-`t=1` residual (π-39: 40% under 55) reads **0%**. **Do not bank that.** The controls
say why:

| control | median | what it proves |
|---|---|---|
| the same gesture on the **pre-cure bytes** (halo `inset: 0`, box = the rung) | **98.04 fps**, 0% <55 | the defect is absent here BEFORE the cure |
| halo `display: none`, same gesture | **98.04 fps**, 0% <55 | π-39's decisive differential — **30.49 vs 59.88** — collapses to **98.04 vs 98.04** |
| halo present, REST `t = 1` | **98.04 fps** | — |
| the page with **no sheet at all** | **98.04 fps** | the cadence is the ceiling, not the sheet |
| a full-viewport `backdrop-filter: blur(200px) saturate(3)` invalidated **every frame** | **98.04 fps**, 0% <55 | the cell has no headroom signal at all |
| a deliberate **25 ms main-thread block** per frame | 22.20 ms / **45.05 fps**, 100% <55 | the probe is LIVE — it resolves a stall when there is one |

**The environment delta, stated.** π-39's own controls read **59.88 fps** — a 60 Hz session.
This seat's every cell reads **98.04 fps** (10.20 ms), a ~98 Hz one, on
`ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)`, window on-screen (`screenX 0`,
`screenY 80`, `screen 1920×1080`), `document.visibilityState: "visible"`, `hasFocus: true`,
not headless. Same repository, same route, same built bundle, ~13 hours apart. The probable
cause is the house's own **browser-seat singleton** hazard: π-39 ran with three lanes live in
the tree, and a second page is open in this very browser right now (`:5439/containers/sheet`)
— a contended GPU is exactly what turns a cheap viewport-scale blur into a missed vsync.
**No claim is made either way about which session is the product's true cell.**

**Trace counters, the second instrument, since fps has no signal.** `performance_start_trace`
over an A/B/A/B of the same gesture (shipped halo vs constant-box halo), per
`BeginMainThreadFrame`, ms:

| condition | Paint | RasterTask | GPUTask | Commit | Layout | UpdateLayoutTree |
|---|---|---|---|---|---|---|
| shipped | 0.102 | 0.038 | 0.930 | 0.090 | 0.035 | 0.372 |
| **cured** | 0.097 | 0.035 | 0.874 | 0.089 | 0.035 | 0.372 |
| shipped (repeat) | 0.099 | 0.035 | 0.907 | 0.092 | 0.036 | 0.381 |
| **cured (repeat)** | 0.095 | 0.035 | 0.940 | 0.094 | 0.036 | 0.383 |

Every column's shipped↔cured difference is **inside its own repeat-to-repeat spread**. The
cure measures **no cost and no benefit** at this seat. Longest `RunTask` in the gesture
window: **4.70 ms** (π-39's was 25.73 ms), no long task > 50 ms.

**Disposition.** The cure is applied because π-39 measured the mechanism twice, independently,
at a cell where it fired, and the change is proved identity-preserving and measures no cost
here. It is **not** claimed to have cured anything. **[2026-08-07 cure II ROUND II: "the cell
has no headroom signal at all" is STRUCK — the probe was GPU-blind because the session was
unloaded. Biased to its knee the cell resolves clearly, π-39's differential REPRODUCES
(48.5 vs 34.3 fps), and this constant-box cure measures NO benefit against the rung-box arm
(33.78/33.56 vs 34.60/34.25, inside the repeat spread). It is kept for being harmless and
identity-preserving, not for helping. §11.6]** **P7's verdict is OWED to a session that
first reproduces π-39's own baseline** — the acceptance is: halo `display: none` must
separate from halo-as-shipped (π-39 measured 59.88 vs 30.49); if it does not separate, the
cell is not the cell. Routed **RT-39C**.

### 10.7 · MUTATIONS

**The battery's ten are untouched by this cure.** M1/M2 (the SFC's detented style branch, the
root's block arm), M3/M4 (`projection.ts`), X1/X2 (the grip's two lerps), X3 (the band), X4
(the header gutter), X5 (`markStyle` on the grip), X6 (`data-slot="dialog-close"`) all name
sites this seat did not edit. Three were re-run anyway, being the neighbours of the clauses
that moved — **3 re-run, 3 still bite**:

| mutation | clause killed | still bites |
|---|---|---|
| M2 · `block-size: 100%` on the detented block arm | "sizes the anchored axis off the rung scalar" + "restores neither `height: 100%` nor `mt-auto`" (2) | ✓ |
| X5 · `:style="markStyle"` dropped from the grip | "binds the scalar's WRITER to its READER" | ✓ |
| X1 · the width lerp frozen (`* 0`) | "binds the scalar's WRITER to its READER" | ✓ |

**Three NEW mutations for the two new mechanisms — 3 authored, 3 BITE:**

| mutation | clause killed |
|---|---|
| **Y1** · the root's two rows dropped **and** `block-size: 100%` restored on the region (the π39-R2 defect, re-applied whole) | reach · "gives the detented root its own two rows, so the region is the REMAINDER" |
| **Y2** · `align-content: end` → `stretch` on the region | reach · "pins the header and the footer and scrolls only the body, chaining contained" |
| **Y3** · the bottom sampler's `block-size: 100dvh` → `calc(clamp(0, var(--detent-t), 1) * 100dvh)` (the π39-R1 mechanism, re-applied) | reach · "holds the graded sampler's box CONSTANT across the rung range" |

**Battery now 13 mutations, 13 BITE.** Every restore from a scratch copy, `shasum -a 256 -c`
byte-identical on all three files after every run.

**One clause amended rather than left stale**, and the amendment is the P1 cure's own record:
`sheet-reach.test.ts`'s three-row clause asserted `grid-template-rows: auto minmax(0,1fr) auto`,
which is the geometry π-39 measured as RED. It now asserts the shipped grammar
(`minmax(0, auto) minmax(0, 1fr) auto` + `align-content: end`), and the mechanism it used to
guard vacuously is picked up by the new root clause, which Y1 kills.

### 10.8 · GATE CLAUSES — `G-SHEET-REACH` 9 → **11**, seats **+0**

Both new clauses are arms of the same existing executable; nothing is minted and no seat
moves. `gate-register.mjs` was not re-run this round because the register receipt is a
whole-tree read and three foreign lanes hold uncommitted executables (`pager-dots.contract`
is missing from the tree, which reds the register on its own) — the row adds **no seat and no
executable**, so the receipt cannot move on this row's account.

| clause | what it locks |
|---|---|
| "gives the detented root its own two rows, so the region is the REMAINDER" | CURE-P1's cause: the root's `display: grid` + `auto minmax(0,1fr)` + `contain: layout paint`, and no `block-size: 100%` anywhere on the detented region |
| "holds the graded sampler's box CONSTANT across the rung range" | CURE-P7: per side, the constant extent (`100dvh`/`100dvw`), the released inset on the anchored edge, and **no `--detent-t` in the sampler's box at all** |

### 10.9 · FILES TOUCHED

| file | this seat's change |
|---|---|
| `src/components/sheet/styles.css` | **+36 / −0** — CURE-P7's four per-side rules and their comment block. The file's diff against `336dacf9` is +66/−5; the other +30/−5 are the P1 hunks already in the tree at open (§10.1), unchanged by this seat |
| `tests/components/sheet/sheet-reach.test.ts` | the three-row clause amended to the shipped grammar; 2 clauses added (the root's remainder, the sampler's constant box) |
| `docs/…/2026-08-06-row39-dialog-detent/RECORD.md` | this section |
| `docs/…/2026-08-06-row39-dialog-detent/PI-39.md` | P1's row struck in place; P7's row annotated NOT-REPRODUCED, **not** struck |
| `docs/…/2026-08-06-row39-dialog-detent/PASTE-BLOCKS.md` | the ⊕ ledger block + the roster-cell delta, SHA written as the literal `<SHA>` |
| `docs/…/2026-08-06-row39-dialog-detent/pi39cure-*.png` | 4 paint artefacts |

**No shared file was touched.** `src/styles/index.css`, `tests/styles/glass-subtlety.test.ts`,
`package.json`, `package-lock.json` and every file of #32/#33/#35/#40's lanes are untouched by
this seat.

### 10.10 · ROUTED

| id | what | owner |
|---|---|---|
| **RT-39C** | **P7's verdict is OWED.** π-39's baseline does not reproduce at this seat (98.04 fps median on the pre-cure bytes; the halo `display:none` differential collapses from 59.88-vs-30.49 to 98.04-vs-98.04). The cure ships on mechanism only. The re-take's precondition is stated at §10.6: reproduce the differential first, or the cell is not the cell — and serialize the browser singleton, since a second page was open in this browser throughout | a π seat with an EXCLUSIVE browser |
| **RT-39D** | `npm run build` is **BLOCKED at HEAD's own bytes** by an uncommitted `package.json` (embla-carousel struck from three sections) with no lockfile regeneration. Any seat that needs the library build, and the driver at commit time, hits this | the carousel/pager lane (#40 and its neighbours) |
| **RT-39E** | Two `it.fails` / register / export-reach gates read RED in this tree from **#40 W-PAGER's** uncommitted work (`pager-dots.contract.test.ts` absent; `MAX_TILT_DEG`, `LEAD_TRAIL_TAU_E_S`, `trailOffset` unreachable; the `stacked-url-filter` BORN-RED flipped green). None is this row's; each is named at §10.4 so a later reader does not attribute them here | #40 W-PAGER |
| **π39-R3** (halo truncation) | **UNCHANGED by CURE-P7, deliberately.** The constant box does not lengthen the visible ramp: the stops are absolute pixels from the same edge, so at `t = 0.12` the far edge still reads mask α **0.9038**, exactly as π-39 measured. The true dead-ramp condition is still `t ≤ 0.047` and the half-ramp `t ≈ 0.091`, neither a resting rung. Left as π-39 bounded it | open, minor |

---

## §11 · CURE ROUND II — 2026-08-07 (`VERDICT-PI-CURE.md`, R2-1 … R2-7)

**seat modelId: `claude-opus-5[1m]`** (cure-II seat, exclusive browser owner) · discharges the
driver's `CURE-MORE` ruling. Nothing in §10's "What stands" is redone or regressed; what §10
got WRONG is struck at its site below.

**The headline is R2-5, and it is bigger than the row.** The graded material was not merely
mis-tuned — its `backdrop-filter` landed **nothing at all**, on BOTH arms, because the plate's
own recipe isolates every child from the page. The cure moves the sampler out of the surface
and the ramp is real in paint for the first time. The second headline is R2-6's: with the
session biased to its knee, **π-39's own cost attribution reproduces** — and the round-I cure
it motivated measures no benefit.

### 11.1 · R2-1 — THE FLOOR · **CURED**

**The defect.** `overflow: hidden` + `align-content: end` pins the footer's `rect.bottom` to
the region's end whether or not one pixel of the action paints, so P1's bar passed
unconditionally — including with the footer 0% visible. Measured on the round-I bytes at the
shipped 0.12 peek: the action **45% clipped** at a 900 viewport and **81% clipped** at a real
780 one. A clamp is not a fit.

**The cure.** The detented block arm takes a floor — *a resting rung can never be smaller than
the smallest honest sheet* — spelled in the tokens the chrome is built from, so it transposes
one rung down at mobile with everything else: the plate's padding and inner edge, the grip's
row, the region's two gutters, the crown's seam, the body's last line, the footer's seam, and
an action at least `--touch-target` tall. `0` stays legal as the dismissal endpoint; the exit
is the unmount, never a shrinking clipped box. The region's `overflow: hidden` is **struck** —
with the floor the tracks can no longer out-sum the region, so the clip has nothing left to
hide (and its removal is R2-3's cure as well).

**Two arithmetic findings the first attempt produced, banked because they are the whole
subtlety:**

1. **`min-content` is the WRONG floor.** Under an intrinsic constraint a `1fr` row resolves to
   its item's MAX-content contribution and an `auto` row to the header's, so `min-content`
   reads the sheet's NATURAL height — measured **447.23** on a 780 viewport, which floors
   rungs **0.25 AND 0.4 onto one box** and destroys the ladder it was meant to protect. Struck
   for the token sum.
2. **The crown is in the floor for its SEAM.** A header row yields its content to zero but
   still draws its rule and the gap above it. Without that term the floor was 13px short and
   the tracks out-summed the region by **9px** at 780, painting the crown's seam back across
   the grip — the exact overflow this arm exists to stop. Measured, then added.

**The re-take — the PROMISE, not a proxy.** Five hit-test points per action (centre + the four
quarter points, inside the control's own radius so a miss is occlusion and never a corner
curve), plus the action's visible fraction, plus every ancestor clip it must survive, plus the
region's own start-overflow. Chrome 150, built bundle, `:5822`, every figure guarded by
`location.port`.

| viewport | ladder | sheet h per rung | action `bottom` | visible | 5-pt identity | start-overflow |
|---|---|---|---|---|---|---|
| **1440×780** (real) | `[0.25,0.4,0.7,1]` | **206.9** · 312 · 546 · 780 | **759** | **1.0000** | **true** ×4 | **0** ×4 |
| **1440×780** | `[0.12,0.5,1]` | **206.9** · 390 · 780 | **759** | **1.0000** | **true** ×3 | **0** ×3 |
| **1440×768** (real) | `[0.25,0.4,0.7,1]` | **206.9** · 307.2 · 537.59 · 768 | **747** | **1.0000** | **true** ×4 | **0** ×4 |
| **1440×768** | `[0.12,0.5,1]` | **206.9** · 384 · 768 | **747** | **1.0000** | **true** ×3 | **0** ×3 |
| **1440×900** | `[0.25,0.4,0.7,1]` | 225 · 360 · 630 · 900 | **879** | **1.0000** | **true** ×4 | **0** ×4 |
| **1440×900** | `[0.12,0.5,1]` | **206.9** · 450 · 900 | **879** | **1.0000** | **true** ×3 | **0** ×3 |
| **390×844** | `[0.25,0.4,0.7,1]` | 211 · 337.59 · 590.80 · 844 | **831** | **1.0000** | **true** ×4 | **0** ×4 |
| **390×844** | `[0.12,0.5,1]` | **171** · 422 · 844 | **831** | **1.0000** | **false** ×3 — see 11.7 | 17 · 0 · 0 |

The floor measures **206.9** at desktop (`40 + 1 + 44 + 24 + 13 + 27.9 + 13 + 44`, its own
tokens to the digit) and **171** at 390. Only sub-chrome rungs move: the ladder is intact at
every viewport, and where the request already clears the chrome the rung is untouched.

**The bar now discriminates.** The same probe on the round-I bytes reports the action 45%/81%
clipped with `visible` **0.55 / 0.19** while `rect.bottom` reads green — which is why the
figure alone was never evidence.

**Artefacts:** `pi39r2-P1-t0.25-780.png` (the action whole on the visible edge, the crown
truncated at the seam), `pi39r2-P1-peek-t0.12-780.png`, `pi39r2-P1-t0.25-390.png`.

### 11.2 · R2-2 — THE YIELD ORDER · **CURED**

`minmax(0, 1fr)` gives the body a base size of ZERO, and grid hands surplus to intrinsic
tracks before it expands a flexible one — so the header grew to its full 84.42 while the body
was still **0px** and not one content row rendered at the demo's own t=0.25. The grammar said
the opposite of what it did. The body row is `minmax(1lh, 1fr)` now: one line is the least a
body can honestly be, and the crown (which can reach 0 and clips its own overflow) is what a
short rung spends.

Measured, 1440×780: **body 27.9px at t=0.25 and at the 0.12 peek** (was 0), header **16** and
**16** against an intrinsic 84.42. At 900: body **27.9** at 0.25, header **34.1**. At 390:
body **24**, header **32**. Header → 0 before body → 0, at every measured cell.

### 11.3 · R2-3 — THE `scroll` ARM · **CURED**

The round-I `overflow: hidden` sat at the same (0,0,0) specificity LATER in source than
`[data-scroll] > region { overflow-y: auto }` and beat it by order alone, so the prop was
silently dead on the detented arm. The floor makes the clip unnecessary and it is struck; the
scroll arm resolves again. No unreachable block-start overflow exists on it — measured
**start-overflow 0** at every rung of both ladders at 780/768/900 and on the 390 detented
ladder.

### 11.4 · R2-4 — SPECIFICITY AND PHYSICALITY · **CURED**

Eight sampler rules computed **(0,1,0)** — written `:where(host) > child`, with the combinator
outside the wrapper — against a file header that promises (0,0,0) everywhere so a consumer's
utility wins. Every sampler compound is now fully inside `:where()`, and a gate clause parses
the file for a combinator after a closing paren so the shape cannot come back.

The released insets were LOGICAL (`inset-block-end`, `inset-inline-start`) on a box whose side
names, ramp directions and placements are all PHYSICAL — under `direction: rtl` that anchored
the ramp ±865px off its own edge. They are `top`/`right`/`bottom`/`left` and `height`/`width`
now, and the gate asserts no logical inset survives on the sampler.

### 11.5 · R2-5 — THE MATERIAL · **CURED, AND THE CAUSE IS NAMED**

**The disease, reproduced first.** A 24px-period field behind the sheet; amplitude is the 24px
bin of each row's luminance (integer periods, so no leakage). 1440×900, dark, live-behind rung
1, x ∈ [100, 1340]:

| condition | edge → 120px | verdict |
|---|---|---|
| bare field, no sheet | **162.45** flat | the reference |
| plate, sampler suppressed | **120.41** flat | the plate alone dims 26% |
| **sampler AS SHIPPED (round I)** | **86.64 → 81.55** | **FLAT — the disease** |
| sampler with the plate made transparent | **162.45** flat | the filter lands **NOTHING** |
| the identical recipe outside the surface | **109.58 → 0.00** | the recipe is sound |

**The cause, isolated.** Not the mask, not `contain`, not `isolation`, not `z-index` — each was
released and each changed nothing (`isolation:auto` + `contain:none` together still read
162.45 against a transparent plate). It is **the plate's own material**: `.glass-floating`
carries a `plus-lighter` specular pseudo and a `soft-light` grain pseudo, and a descendant with
a blend mode **makes its parent an isolated group** — a backdrop root. Every child's backdrop
sample therefore stops at the plate it sits on. The decisive control: set those two pseudos to
`mix-blend-mode: normal` and change nothing else, and the shipped child's blur springs to life
at **0.16 → 0.14**. The 89.19 the child *did* paint is the plate's own α 0.26 applied twice
(120.41 × 0.74 = 89.1) — it was re-blurring the plate, i.e. exactly the "nested second plate"
its own comment claimed it avoided.

**The cure.** The sampler is the surface's **SIBLING** inside the portal, taking the surface's
own box by **anchor positioning** — one box law for both arms and all four sides, tracking the
plate at every rung and through the slide, with no second size law and no geometry read in JS.
Putting the filter on the ROOT also works, but a mask on the root masks the CONTENT with it and
an ungraded frost is a different material. Measured on the shipped bytes:

**79.57 (edge) → 66.26 (40px) → 0.00 (120px), monotone, flat 0.00 beyond** — the designed
crown → deep-frost ramp, in paint, reaching full depth exactly where the mask's 120px stop is.

**It was never only the detented arm.** The plain (non-detented) sheet's sampler measures
**57.97 → 44.60** — tint-only, the same disease — and takes the same cure by the same rule.

Two consequences carried honestly: the sampler now needs the content's own present-condition
(a portal sibling is outside reka's `<Presence>`, and rendered unguarded it painted one
sampler per MOUNTED sheet on the page, each anchoring to whichever surface preceded it), and
the anchor must follow the surface in DOM order, since anchor positioning only looks backward.
Paint order is z-index's — `calc(var(--z-modal) - 1)`, and `calc(var(--z-dock) - 2)` on the
live-behind arm — so DOM order costs nothing.

**Artefacts:** `pi39r2-material-shipped-flat-1440.png`, `pi39r2-material-cured-ramp-1440.png`,
`pi39r2-material-labtile-1440.png`, `pi39r2-material-cause-blendpseudos-1440.png`.

**Owed:** anchor positioning is Baseline on both target engines (Chrome 150 measured here;
Safari 26 shipped it), but this seat measures Chromium only — the `safari-app` cell rides the
visible-session re-run already owed at `PI-39.md` §10(3).

### 11.6 · R2-6 — THE P7 STANDARD · **THE CLAIM IS STRUCK, AND THE CELL NOW HAS SIGNAL**

**§10.6's "the cell has no headroom signal at all" is FALSE and is struck.** The probe was
GPU-blind because the session was unloaded. Biasing with N viewport-scale halo-equivalents
invalidated every frame finds the knee at this seat between **N=4 (91.74 fps)** and **N=8
(25.13 fps)**.

Biased at **N=5**, the shipped drag+settle gesture (π-39 Method A, same disclosed
`setPointerCapture` shim), two interleaved passes each:

| arm | median fps | what it says |
|---|---|---|
| sampler as shipped (constant box, 900px) | **34.60 / 34.25** | — |
| the π39-R1 mechanism re-applied (box = the rung, 225 → 630) | **33.78 / 33.56** | **the box law measures NOTHING** |
| sampler `display: none` | **48.54 / 48.78** | **π-39's differential REPRODUCES** |
| sampler present, `backdrop-filter: none` (tint only) | **48.54 / 49.02** | the SAMPLE is the whole cost |
| real frost vs tint-only | **45.66 / 34.36** vs 48.54 / 49.02 | what a real material costs |

**Three findings, all outcome-relevant.**

1. **π-39's attribution is CONFIRMED** once the session is loaded: suppressing the sampler
   recovers ~14 fps. RT-39C's stated precondition — *halo-off must separate from halo-on, or
   the cell is not the cell* — is **MET at a biased cell**. It is still unmet unbiased: this
   seat's idle session reads 98.04 fps everywhere, exactly as §10.6 found.
2. **CURE-P7 buys nothing measurable.** Constant box 34.60/34.25 against rung-box 33.78/33.56
   — inside the repeat spread, and if anything the constant box is marginally the larger one.
   It is kept because it is proved identity-preserving and costs nothing, **not** because it
   helps; §10.3's implied benefit is struck by this table.
3. **The pre-cure bytes paid the full price of a backdrop-filter and got nothing for it.**
   Removing the filter entirely recovers the same ~14 fps as removing the whole sampler, and
   π-39 measured that same filter costing 29 fps on its own session while landing NOTHING in
   paint. The cure buys the material at a price the library was already paying.

**§10.3's "its geometry is invariant across the whole rung range" is STRUCK in the source.**
Only the SIZE is constant; the box translates with the anchored edge across the rung range,
and the comment now says so and carries the cost rather than claiming an invariance it does
not have.

**P7's ≥55 fps verdict remains OWED** — unbiased, on a session that reproduces π-39's 60 Hz
baseline. **RT-39C stands, with its precondition now demonstrably satisfiable.**

### 11.7 · R2-7 — RECORD AND PI HONESTY

- **§10.5's "the action and the ✕ both whole and hit-testable" is STRUCK at its site.** The ✕
  was; the action was not — 45% clipped at 900 and 81% at 780 on those very bytes.
- **`PI-39.md` §0's "identity true at every rung of both ladders and both viewports" is
  STRUCK.** The 390×844 live-behind ladder was never measured. It is measured now, and it is
  **NOT green**: see below.
- **The arm divergence is named** wherever the congeal is quoted: 0.18 → 0.22 is the LIGHT
  arm; the dark arm this battery ran on is 0.22 → 0.26 (`π39-R5`).

**THE 390 LIVE-BEHIND LADDER, MEASURED FOR THE FIRST TIME — AND IT FAILS, PRE-EXISTING.** At
390×844 the action is 100% visible and unclipped at all three rungs, and **hit-testable at
none of them**. The occluder is named: `.demo-bottom-dock__shell`, spanning y **766.5 → 832**,
against an action at y **771 → 831**. This is the live-behind band working as designed — the
sheet sits at `calc(var(--z-dock) - 1)` precisely so it can never cover persistent dock chrome
— with the consequence nobody had measured: on a short viewport the dock lands ON the sheet's
primary action. The modal detented ladder is clear at the same viewport (z 140, above the
dock), which is why only this cell shows it.

**It is NOT this cure's.** The action's `rect.bottom` is the sheet's inner edge (831) under
both geometries, and the dock's band is the page's, not the sheet's — the overlap is identical
before and after. **Routed RT-39F**; no identity claim is made for this cell, and `PI-39.md`
carries the measurement without a strike.

The 390 peek also shows the floor's one honest limit: **start-overflow 17px** there, because
the demo's live-behind footer wraps to 70px at that width while the floor budgets one
`--touch-target`. The overflow is spent on the CROWN, exactly as the yield order says — the
action still measures `visible 1.0000` — so the floor's promise holds; what it guarantees is a
minimum, not a taller consumer's footer.

### 11.8 · FILES TOUCHED

| file | change |
|---|---|
| `src/components/sheet/styles.css` | the floor + its named seam · the body's `1lh` row · `overflow: hidden` struck · every sampler compound re-wrapped in `:where()` and made physical · the sampler re-authored as an anchored sibling · three false comments struck at their sites |
| `src/components/sheet/SheetContent.vue` | the sampler moves out of `RekaDialogContent` to a portal sibling after it, carrying its own `data-side`/`data-detents`/`data-modal`, gated on the content's own present-condition (`haloPresent`) |
| `tests/components/sheet/sheet-reach.test.ts` | 4 clauses added (floor-in-tokens, yield order, scroll arm, sampler specificity); the constant-box clause amended to the physical grammar; the two-rows clause relaxed to what it actually guards |
| `tests/components/sheet/sheet-graded-edge.test.ts` | 1 clause added (the sampler is OUT of the surface, with the figures in its header); 2 clauses amended off the child relationship paint disproved |
| `docs/…/RECORD.md` · `PI-39.md` · `PASTE-BLOCKS.md` | this section, the strikes, the re-drafted blocks |
| `docs/…/pi39r2-*.png` | 7 paint artefacts |

**No shared file touched.** `package.json`, `package-lock.json`, `src/styles/**` and every file
of #32/#33/#35/#40/#41's lanes are untouched by this seat.

### 11.9 · GATE CLAUSES — `G-SHEET-REACH` 11 → **15**, `SheetContent graded edge` 4 → **5**, seats **+0**

All five are arms of existing executables; nothing is minted and no seat moves.

| clause | what it locks |
|---|---|
| floors a resting rung at the smallest honest sheet, in tokens | R2-1: the floor exists, every term is a token or a line, no bare length stands in for a chrome row, the seam it counts is the seam the chrome draws, and the remainder track keeps its ZERO minimum |
| yields the crown before the body — the body keeps a line at every rung | R2-2: header row can reach 0, body row cannot drop its last line |
| leaves the `scroll` arm reachable on a detented sheet | R2-3: no clip on the region, `overflow-y: auto` survives on `[data-scroll]` |
| keeps every sampler rule at (0,0,0), the specificity its own header promises | R2-4: no combinator outside `:where()` on any sampler rule |
| keeps the sampler OUT of the surface — a child of the plate cannot sample the page | R2-5: the sampler is not contained by the plate, carries its own keys, anchors to the surface, holds the filter; the surface stays a non-sampler |

**Born-RED, verified against the round-I bytes** (scratch-copy revert, `shasum -a 256`
byte-identical on restore): **10 failed / 10 passed**, every new and amended clause among the
10. On the cured bytes: **42 passed**.

### 11.10 · ROUTED

| id | what | owner |
|---|---|---|
| **RT-39C** | **P7's verdict is still OWED, unbiased.** Its precondition is now demonstrably satisfiable: biased to the knee (N=5), halo-off separates from halo-on by ~14 fps at this seat. What no session here reproduces is π-39's *unbiased* 60 Hz baseline | a π seat with an EXCLUSIVE browser |
| **RT-39F** | **NEW.** At 390×844 the demo's bottom dock (y 766.5–832) occludes the live-behind sheet's primary action (y 771–831) at every rung — 100% painted, 0% hit-testable. The band law is correct; what is missing is any reservation for the chrome it defers to. Pre-existing, not this cure's | the sheet family's next π / the dock lane |
| **RT-39G** | **NEW, LIBRARY-WIDE.** Any `backdrop-filter` on a CHILD of a `.glass-*` plate is dead in paint — the specular and grain pseudos make every glass surface an isolated group. This row's sampler was one instance; the sweep is not this row's | a glass-material seat |
| **RT-39D** · **RT-39E** | unchanged, foreign, named at §10.4 and §10.10 | #40 W-PAGER and neighbours |
