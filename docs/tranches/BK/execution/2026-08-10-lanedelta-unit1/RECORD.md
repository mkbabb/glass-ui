# LANE δ — COMMIT-UNIT 1 (δ0 + δ1) · 2026-08-10

**modelId: `claude-opus-5[1m]`** — asserted at step 0; the assertion gates this chain.
Base HEAD `074a3d0e`. SHARED tree, four lanes concurrent; this seat wrote bytes and
never staged, committed, stashed or checked out.

---

## §0 · CENSUS — step-0 baseline, banked before any byte

| datum | value |
|---|---|
| baseline diff | `/tmp/bk-lanedelta-baseline-1786380269.diff` (67 lines, `git diff -U0`) |
| porcelain count | **5** |
| tracked-dirty at open | `demo/stories/foundations/typography.vue` · `demo/stories/substrates/aurora.vue` · `src/composables/dark/darkModeSyncScript.ts` · `src/styles/glass/material.css` |
| untracked at open | `tests/styles/material-css-syntax.test.ts` (1 file, enumerated) |
| HEAD | `074a3d0e4a22885b098be6986f404dee19e49279` |

**FENCED OUT and never opened for writing:** `src/styles/glass/material.css` ·
`tests/styles/material-css-syntax.test.ts` (unknown-owner surfaces; attribution is
the driver's) · `demo/stories/substrates/aurora.vue` (γ) ·
`src/composables/dark/darkModeSyncScript.ts` + its test (foreign) ·
`demo/shell/**` (β's #21 M03 surface) · `MIGRATION.md` (appeared mid-run, foreign).

The porcelain count at close is **18**, of which **8 are this lane's**; the other ten
arrived from the three concurrent lanes DURING this run and are not this seat's.

---

## §1 · PRECONDITION — #35 LANDED, verified on disk

| claim | verdict | detector |
|---|---|---|
| #35 W-SLIDER landed | **TRUE** | `9b4c15d8` on disk, `git show --stat` — `slider/styles.css` born 481 ln, `Slider.vue` 767 changed |
| its completion rider landed | **TRUE** | `39e8d5e7` (⊕⁷¹) — the seven paths the cut left behind |
| the C12 limb EXPRESS depends on | **TRUE** | `Slider.vue:369` `:aria-valuetext="props.valueText?.(value as number, key) ?? undefined"`; `types.ts:35` `valueText?: (value: number, index: number) => string` — o19 **A-10** discharged at its own seat |

EXPRESS's felt-response claim therefore has its named precondition. **A11 (the handle
ungate) is #31's, LANDED at `72105fc4`** — recorded, not re-derived; the a11y cure
below is cross-gated by it and adds no second authority.

---

## §2 · δ0 — the typography.vue PARK ruling

**RULED: COMMIT both `span="full"` adds.** The ruling is measured, not preferred, and
each measure is #59's own landed text.

`span` is #59's ONE minted StorySection API (`80f3455f`; `StorySection.vue:23-33`),
and its docstring already names the case: *"`full` takes the whole row, which is what
a table, a stage or a **lead specimen** wants."* Four detectors, none of them a
restatement of another:

| # | detector | figure | site |
|---|---|---|---|
| 1 | `--measure-cel` | **21rem = 336px** | `demo/chassis/layout.css:44` (its derivation on the line: 852×393 landscape, c ≤ 340px) |
| 2 | `--type-display-audacious` clamp CEILING | **22rem = 352px** | `src/styles/typography/scale.css:151-155`, commented "φ^(11/2) — peak 352px (fast.com peg)" |
| 3 | `--type-display-5` clamp CEILING | **6.854rem = 109.7px** | `scale.css:136` |
| 4 | `<p>` count inside the two `full` sections | **0** | so `.story-article :where(p) { max-inline-size: 66ch }` (`layout.css:95-98`) is neither engaged nor lost by the span change |

**Audacious peaks** — detector 2 against detector 1: the specimen's own font-size
exceeds the cel track by **16px** *before* `ShowcaseFrame pad="lg"` adds 2 × `--sp-5`.
A lead specimen that cannot fit its own glyph is not a specimen. `full` is correct.

**The graded ladder** — detector 3 against detector 1: "Golden" at the display-5
ceiling is wider than a 336px cel, and the top four rungs each re-wrap at a different
point. The ladder's CONTENT is the interval between rungs; rungs that re-wrap
independently stop expressing an interval. `full` is correct.

**No mint, checked:** `--measure-wide` (34rem, φ·cel) would have covered the peaks but
not the ladder, and `span` accepts `cel | full` only — a `wide` span value was NOT
added. The available correct answer was taken; a new one was not invented.

**FOUND BESIDE THE ORDER, cured in the same act and disclosed:** the focal specimen
(`typography.vue:55`) is a PLAIN `<section>`, i.e. a cel-field grid item with no
`data-span`, carrying `text-display-audacious` — the identical 352-into-336 defect the
two adds cure, one element above them. The cel-field rule is the attribute selector
`.story-article [data-span="full"]` (`layout.css:121-124`), which reads any grid item,
so the cure is `data-span="full"` on the section — one attribute, the same law, the
same file, no new mechanism. Ruling on two siblings while shipping the third would
have been a knowing omission.

---

## §3 · δ1 — #52 W-CONFIG-EXPRESS, this unit's three build acts

Citations honoured as ordered: PROCEDURAL §2.3 / §3.4 · RATIFICATION §4 (E31) ·
APOTHEOSES §CONFIG-EXPRESS · MOTION-CANON A01 (`:208`) · o19 A-6 · GM-L5.

### 3.1 · ACT A — the expand button BUILDS

RATIFICATION §4 E31: *"BUILD within W-CONFIG-EXPRESS — deft; the owner's own softening
('extant is rather alright') bounds the scope."* PROCEDURAL §3.4 fixes what that bound
means: **STD's anatomy is untouched** — VizStudio shell, Configurator /
ConfiguratorLayer / ConfiguratorRow grammar, `useConfiguratorState`, the preset-row
idea all keep their shape. What lands is an affordance, not an architecture.

`<Configurator expandable>` mounts the studio inside the shipped-but-unconsumed
`<ExpandableContainer>` (X1: built, zero consumers). Focus trap, Esc, body-overflow
lock and focus restore were already shipped; this act adds **none** of them.

- **`expandable` · `expandLabel` · `collapseLabel` · `v-model:expanded`** on
  `Configurator.vue`. The host is `<component :is>`, not a `v-if`/`v-else` pair:
  the alternative is two copies of the studio markup and the copies drift.
  Un-expandable the host is a `display: contents` div — present in the tree, absent
  from layout, so the shell's box is byte-identical whether the affordance is on.
- **Expanded forces `galleryPlacement: "top"`** (APOTHEOSES MOVE 2b expanded reflow).
  The consumer's own placement is untouched and returns on collapse. A room that
  spends its width on a 400px gutter is a room for nothing.
- **The subtree is TELEPORTED, never duplicated** — one mount, moved — which is what
  lets a live GPU stage survive the promotion instead of being rebuilt behind a
  second canvas.
- **VizStudio passes `expandable`**, so the build has a real site on day one rather
  than a prop nobody reaches.

**Z1 CURE, executed as adjudicated** (APOTHEOSES §0.3). `glass-overlay` is STRUCK from
`ExpandableContainer.vue`'s root. That class carries
`backdrop-filter: var(--glass-blur-overlay)` (`glass/ladder.css:157`), and the root
CONTAINS `[data-part="panel"]` — adopting it verbatim puts every expanded subtree,
live WGPU stages included, inside a filtered compositing group. It violates the
configurator's own written discipline (`configurator/styles.css` §0: *"the stage
remains outside every filtered ancestor"*), MOTION-CANON §3(d) (**the world scrim has
NO rung**) and K9. The expanded root now paints `--overlay-scrim` **background-only**
with `backdrop-filter: none`. Emitted, verbatim from the built sheet:

```
.expandable-container[data-state=expanded]{z-index:var(--z-modal);background:var(--overlay-scrim);-webkit-backdrop-filter:none;backdrop-filter:none;flex-direction:column;display:flex;position:fixed;inset:0}
```

**A01 — the motion** (MOTION-CANON:208; the register the order names). Birth scale
**0.78 → 1.0**, transform + opacity ONLY, never an animated box, on the house's own
`--spring-dock` `linear()` easing at `--spring-dock-duration`. Zero new JS: the spring
already ships as a CSS timing function (`tokens/scheme-spring.css:61,110`), so the
WAAPI/`element.animate` limb of the apotheosis buys nothing and is not built. Reduced
motion drops the spatial leg to a **0.12s** opacity arrival — not `animation: none`,
which would have the room appear with no event at all.

> **A01 DEVIATION, STATED NOT PAPERED.** The clause *"the origin is never hidden"* is
> NOT satisfied. The panel is teleported — one mount, moved — and a subtree that moves
> cannot also stay. The alternative is duplicating the live stage for the length of
> the flight, which trades a correct pixel for a wasted GPU context and is the very
> thing the wave's own OWED cell warns about. The scrim covers the origin rect on the
> same frame, so nothing is seen to vanish. The geometry of A01 ships; the
> origin-persistence clause does not, and this is where it is recorded.

**K4 executed; A6 REFUSED WITH GROUNDS.** The trigger's `--radius-button` → **`--radius-pill`**
(K4: a single glyph target on a floating plate is the pill's case, and
`--radius-button` is the one-consumer seam PROPORTION already flagged). The
apotheosis's second limb — *"box ≥44 via the inset-`::before` hit idiom"* — is
**refused**: the trigger already carries `data-control-target`, and
`utilities/responsive.css:3-8` floors every such face at `var(--touch-target, 2.75rem)`
= **44px** under a coarse pointer. A second mechanism asserting the same floor is a
second authority free to disagree with the first, which is the exact class #31 ruled
on. The cited idiom is also not present at `expandable-container/styles.css:20-33` —
the apotheosis cites where the cure would land, not an idiom on disk.

**The room's proportion — one deviation on merit, disclosed.** The apotheosis
specifies expanded padding *"32 (page-gutter rung, stated as a literal — no token,
R5), mobile 20"*. What ships is `padding: var(--space-section)`, which **is 32px and
steps to 20px** under the one width query at `tokens/sizing.css:610-616`. The literal
would have required a SECOND width-conditional block inside a library component, which
`sizing.css:601-607` forbids by name and which is how nine ad-hoc transposition factors
were minted the last time. R5 struck a ONE-CONSUMER token; `--space-section` is an
existing shared rank, not a mint. Same two numbers, no new breakpoint.

### 3.2 · ACT B — LAYOUT's surviving fork re-keys viewport → container

**The defect, stated as a measurement.** `configurator/styles.css` carried the studio's
whole responsive geometry behind `@media (min-width: 1024px)` ×3 — a question about the
WINDOW. #59 landed the cel field, and `VizStudio`'s `StorySection` joined the cel run at
`--measure-cel` = **336px**. At a 1440px window the fork therefore answered *yes* and
placed a `minmax(300px, 400px)` inspector into a 336px track: the inspector alone is
wider than the track it was placed in. `StorySection.vue:85-105` states the contract the
component was breaking — *"re-keys its own internals against THAT, never against the
viewport."*

**Why a new box exists.** An element cannot container-query ITSELF, so the container and
the grid cannot be the same box. The **shell** is that second box, and it is the OUTER
one deliberately: the plate, the corner clip and any consumer `class` (height envelope,
cast) belong to the thing that owns the studio's rect, and — load-bearing —
`[data-slot="configurator"]` keeps its three region children unchanged, so
`Configurator.material.test.ts:20-26`'s children assertion holds with no test edit.

The container is declared **on a box this component owns**, never inherited from a
consumer's ancestry. A query with no container resolves to the small arm forever, which
is a dead primary wearing a fallback's face.

- `.configurator-shell { container-type: inline-size }` + the sliver floor
  `min-inline-size: min(20rem, 100%)` — same hazard, same cure, same reasoning as
  `StorySection.vue:104` (`contain: inline-size` zeroes the min-content contribution;
  as a flex item that collapses the studio to 0px with its controls intact and
  unpaintable).
- **`@media (min-width: 1024px)` ×3 → `@container (inline-size >= 64rem)` ×3.** The
  NUMBER DOES NOT MOVE — 64rem IS 1024px. Only its subject moves, from the window to
  the studio. Changing the threshold would have been a taste decision this unit was
  not ordered to make.
- **The aside seam joins its own fork.** `lg:border-l` / `lg:border-r` (viewport
  utilities dividing container-decided columns) are struck from the SFC; the seam now
  lives in the same `@container` block that places the columns, so a horizontal rule
  can never be left painting across a vertical split.
- **`22vw` / `20vw` → `22cqi` / `20cqi`** on the preset tiles. The middle term of a
  tile clamp is a share of the ribbon the tile sits in; a `vw` term sized tiles off the
  window, so the same studio at the same width grew different tiles depending on how
  much of the page it had been given. Floor and ceiling unmoved.
- **The shell's own one-row grid ships as precompiled CSS**, not an arbitrary utility —
  the discipline §4 of that file already states for the two-column geometry.
- **VizStudio's `StorySection` takes `span="full"`** — the consumer half of the same
  correction, and required, not optional: without it the re-key would leave every
  studio permanently stacked, which is a regression wearing a fix's face. A studio is
  the `span` docstring's own "stage" case.

Emitted, verbatim from the built demo sheet:

```
@container (inline-size>=64rem)   ×3
.configurator-shell{-webkit-backdrop-filter:none;backdrop-filter:none;grid-template-rows:minmax(0,1fr);min-block-size:0;min-inline-size:min(20rem,100%);display:grid;container-type:inline-size}
.configurator-expand-host[data-state=expanded]>[data-part=panel]{padding:var(--space-section)}
20cqi · 22cqi
```

### 3.3 · ACT C — o19 A-6: ConfiguratorRow mints `useId()`, forwards `aria-labelledby`

o19 receipt row A-6, verbatim: *"TR#52 ⊕⁷ — ConfiguratorRow mints a `useId()` label id,
forwards `aria-labelledby` to the control slot."*

The row's label was a floating `<Label>` with no id — visually attached to its control,
unattached in the accessibility tree — and the component's own docstring said so
(*"No a11y for/id wiring"*) as though it were a design. That sentence is struck; the
wiring exists.

`for`/`id` is **not** the available mechanism and the refusal is on merit: the row does
not own its control and cannot know which descendant is labelable — a `<Slider>`
renders its thumb several levels down, and one of the 16 in-repo mounts slots a swatch
group with no single control at all. `aria-labelledby` works without that knowledge, so
the row mints the id, puts it on the `<Label>`, and HANDS IT OUT as a slot prop:
`<ConfiguratorRow #default="{ labelledBy }">`. Same name, same shape, same slot-prop
vocabulary as `LabeledField.vue:57` — **one idiom** for "the label is up here, the
control is yours", not a second.

**Consumer of record, named:** value.js, which asked for exactly this shape in O-19 and
is booked to bind it at the 8.0.0+ relay. **In-repo bindings are NOT taken here and the
ground is the fence, not an oversight:** the 16 mounts live in `demo/shell/configurator/PresetEditor.vue`
(10 — β's #21 surface), `blob.vue` (1 — C1 rules physics-row authorship to GF-BLOB),
`aurora.vue` (1 — γ's lane, dirty) and `VizStudio.vue` (comment only). No lane's rows
were authored from this seat.

**Cross-gate noted, as ordered:** #31 W-A11Y (`72105fc4`) owns the a11y band and landed
the slider ungate; this act adds an association #31's census did not cover and
**introduces no competing contrast, focus or target rule**. RT-31C was routed to #58,
which this unit does not open.

### 3.4 · GM-L5 — CITED, NOT EXECUTED, with grounds

TR#52's citation line reads `PROCEDURAL §2.3/§3.4 + GM-L5`. PROCEDURAL §4 assigns
GM-L5 (*"no configurator, 0 controls on a 3,792 px page"*) to the **Glass-material
lane**, not to EXPRESS; §3.4's "EXPRESS touches" list is the 14-file chassis census and
GM-L5's page is not in it. Two independent grounds hold it out of this unit:
`src/styles/glass/material.css` is a FENCED unknown-owner dirty surface, and
`demo/stories/substrates/glass-material.vue` is story AUTHORSHIP, which is #58's
chassis work — explicitly gated to δ3 behind Lane β's #21 M03 acts. GM-L5 is read as
the input it is: the chassis this unit built is what a glass-material configurator
would later mount into.

---

## §4 · WHAT THIS UNIT DID **NOT** BUILD — #52 is LANDED-IN-PART, by order

The run's scope names three build acts. The rest of EXPRESS's census is untouched and
is disclosed here rather than left to be inferred from a green gate: MOVE 1's per-story
height-override deletion + the L1 φ split + the L2 368px aside floor + the X6/X7 doc and
anchor corrections · MOVE 2a's row detail region · MOVE 2c's show-all · MOVE 3's six
`LabeledField` props (`value`/`aria-valuetext`/`note`/`live`/`inertReason`/felt
response) · MOVE 4's `tier` axis · the gallery split ruling and `PresetPickerRow`'s
deletion · the radius ladder and token retune · the `#transport` slot. **G-CFG-EXPRESS
is NOT claimed.** Zero gate seats were minted; the register is byte-unmoved.

---

## §5 · VERIFY — real exit codes, never a piped tail's

| check | command | exit | figure |
|---|---|---|---|
| typecheck | `npm run typecheck` (`vue-tsc --noEmit && vue-tsc --noEmit -p tsconfig.test.json`) | **0** | no output |
| battery | `npx vitest run` | **0** | `Test Files 223 passed (223)` · `Tests 1957 passed \| 5 expected fail (1962)` |
| gate receipt | `node scripts/gate-register.mjs` | **0** | `seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0` |
| library build | `npm run build` | **0** | 65 public declaration entries |
| demo dist build | `npm run demo:dist:build` | **0** | built in 8.57s |
| export regen | `node scripts/regen-exports.mjs` | **0** | `EXACT REPRODUCTION: YES` |

**Gates exactly 60, `violations:0`, `drift:0`, nothing minted.** The receipt line is
unmoved by this unit.

**The battery figure moves from the standing `1538 passed | 5 xf`, and the act is not
mine.** This unit adds **zero** test cases. The working tree runs **223 files / 1962
cases**; pristine `git archive HEAD` runs **222 files / 1946 cases (+3 skipped, the
dist-absent suites)**, and the extra file is the FENCED foreign untracked
`tests/styles/material-css-syntax.test.ts` (2 cases). The invariant the order asks for —
**zero failures** — is HELD: 0 failed, 5 expected-fail, exit 0.

### 5.1 · Two RED cases run down to FOREIGN, four ways — never assumed

An intermediate battery showed `tests/demo/router-field-ownership.test.ts` ×2 and
`tests/styles/glass-subtlety.test.ts` ×2 as `Error: Test timed out in 5000ms`. Method,
per the #31 born-RED law — **scratch mirrors via `git archive HEAD`, never a
`git checkout` in a shared tree**:

1. pristine HEAD mirror → **38/38 pass**;
2. HEAD mirror **+ only this lane's 8 files** → **38/38 pass** (the acts are exonerated);
3. + the two foreign dirty candidates (`aurora.vue`, `material.css`) → **38/38 pass**;
4. real working tree, re-run once the machine quieted → **38/38 pass**, and the full
   battery green twice after.

Verdict: **load-induced 5s timeouts under four concurrent lane batteries, not defects
and not this lane's.** Recorded so the next seat meets the finding rather than the flake.

### 5.2 · One RED case that WAS mine, and its lesson

`expandable-container.contract.test.ts` went 2-RED on the first run: a template comment
I added above `<div class="expandable-container">` became a **second vnode under
`<FocusScope as-child>`**, which merges exactly one — costing the component its focus
trap AND its unmount (`TypeError: Cannot read properties of null (reading 'nextSibling')`).
Cured by moving the prose into `<script setup>`, where it now also carries the warning.
Measured, not theorised; the template is comment-free on purpose.

---

## §6 · FENCE — what this seat wrote

Eight files, **+335 / −48**, all inside the lane:

| file | +/− |
|---|---|
| `demo/stories/foundations/typography.vue` | +28 / −5 |
| `demo/stories/substrates/_frame/VizStudio.vue` | +8 / −1 |
| `src/components/configurator/Configurator.vue` | +103 / −22 |
| `src/components/configurator/ConfiguratorRow.vue` | +25 / −4 |
| `src/components/configurator/styles.css` | +95 / −12 |
| `src/components/expandable-container/ExpandableContainer.vue` | +16 / −1 |
| `src/components/expandable-container/README.md` | +7 / −2 |
| `src/components/expandable-container/styles.css` | +53 / −1 |

Untouched, as fenced: `src/styles/glass/material.css` ·
`tests/styles/material-css-syntax.test.ts` · `demo/stories/substrates/aurora.vue` ·
`src/composables/dark/**` · `demo/shell/**` · `demo/stories/substrates/blob.vue` ·
`demo/stories/substrates/fourier-*`. No `git add`/`commit`/`stash`/`checkout` was run.
No export key moved (`regen-exports` EXACT). No gate seat minted.

One committed-text strike, dated in place per house law:
`expandable-container/README.md` — the `glass-overlay` tier claim, struck
`[struck 2026-08-10, BK #52]` with its ground, not deleted.

---

## §7 · π — ENQUEUED to the singleton browser seat, NOT claimed

No browser was opened by this seat. Four cells, each with the delta it must witness:

| cell | route | assertion |
|---|---|---|
| δ-π-1 | `/substrates/blob` @1440 | `[data-slot=configurator]` `gridTemplateColumns` reports TWO tracks and the shell's `clientWidth` ≥ 1024 — the re-key's whole point, measured on the box it now measures |
| δ-π-2 | `/substrates/blob` @1440 | expand trigger click → `.expandable-container[data-state=expanded]`; `getComputedStyle(root).backdropFilter === "none"` and the WGPU stage still paints (screenshot; **never** `getContext()` — the context-steal trap) |
| δ-π-3 | `/foundations/typography` @1440 | the three `[data-span=full]` sections each report `gridColumn` spanning the field; the audacious glyph's rendered width ≤ its section's `clientWidth` |
| δ-π-4 | `/substrates/blob` @390 | container < 64rem ⇒ ONE track, aside `borderBlockStartWidth` non-zero and `borderInlineStartWidth` 0 — the seam and the split agreeing at the stacked arm |

---

## §8 · ROUTED — found, not silently fixed

- **`ExpandableContainer`'s `surface` prop is DEAD SURFACE.** `:data-surface` is bound
  on the root and **no rule in `expandable-container/styles.css` reads
  `[data-surface]`** — it was inert before this unit and is inert after. A public prop
  is a clean break with a relay, which this unit is not ordered to cut. → **#52's own
  later commit-unit**, or the next EC-owning row.
- **`--configurator-aside-{min,max}` doc-vs-CSS disagreement (X6) survives**: the
  `asideWidth` docstring says `280px`/`360px`, `styles.css` says `300px`/`400px`. Named
  here so the next EXPRESS unit corrects it with L1/L2 rather than re-discovering it.
- **#59's WRAP ARM is now buildable.** `demo/chassis/layout.css:126-134` records the arm
  as omitted because *"neither rail has an inline-size container ANYWHERE in its
  ancestry… Its container is the studio fork's."* That container now exists
  (`.configurator-shell`). The arm itself belongs to the rails' own lanes and is **not**
  minted here — a rule with no consumer would be exactly the dead primary that note
  refuses.

---

## §9 · CLOSE

⊕ⁿ **LANE δ COMMIT-UNIT 1 — δ0 RULED + δ1 LANDED-IN-PART** at `<SHA>`. δ0 commits the
two `span="full"` adds on four measured detectors and cures the third instance of the
same defect found beside them. δ1 lands #52's three ordered acts — the expand button
with the Z1 cure and A01's geometry, the viewport→container re-key with the number
unmoved and its subject corrected, and o19 A-6's label anchor — with three refusals
carrying grounds (A6's second hit-area mechanism, the WAAPI limb, in-repo A-6 bindings
that are other lanes' rows) and one deviation on merit (`--space-section` for the 32/20
literal). #52 is **not** complete and G-CFG-EXPRESS is **not** claimed. δ2/δ3/δ4 remain
unopened; δ3 still waits on Lane β's #21 M03 acts.
