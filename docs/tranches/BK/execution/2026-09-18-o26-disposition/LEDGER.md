# O-26 DISPOSITION LEDGER—the KF.W6 (Glass Suffusion) relay, row by row

**Date** 2026-09-18 · **driver** Fable (adjudicator) · **seats** 16 Opus (`claude-opus-5` /
`claude-opus-5[1m]`, each id read from its own subagent transcript and gating its chain),
read-only throughout (probes written outside the repo, disclosed) · **datum** repo HEAD
`2113670c`, tree clean; the published 9.0.0 tarball (tag resolves to `d4f7b24f`) for what
ships; the registry `npm pack @mkbabb/glass-ui@7.0.0` tarball for the consumer's pin ·
**inbound** `coordination/valuejs-outbound-2026-09-18-kfw6-bh-relay.md` (R-1..R-16 + §2
negative space + §3 interims + §4 asks) · **reply**
`coordination/glass-outbound-2026-09-18-valuejs-o26-reply.md`.

Method: eight clusters (layering-label · boolean-cast · aurora-a11y · touch-target ·
keyboard-registry · chip-group-material · ribbon-font-focus · disposed-notices), one Opus
investigator per cluster then one ASSUME-WRONG Opus verifier re-establishing every state claim with
its own commands, then the driver's rulings over both. This ledger applies each verifier's
corrections over its investigator's finding and rules; where the ruling departs from both seats it
says so and gives grounds. Pass history: pass 1 (`wf_a3d6f5e8-d29`) banked seven seats (layering-label,
boolean-cast and touch-target investigate+verify, aurora-a11y investigate); pass 2 died to a
load-starved 180 s watchdog with zero results; pass 3 (`wf_80c4f4a2-1e9`) completed the remaining
nine—sixteen seat results in all. The seat JSONs were session scratch and were lost at a session
restart; each row's figures re-measure from the registry tarballs and HEAD by the commands the row
gives. The driver's rulings this ledger was written from are banked beside it as `RULINGS.md`
(replayed from the driver transcript; its bracket says how). Word set: state ∈ {LIVE, DEAD, MOVED, PARTIAL, NOT-APPLICABLE} at 9.0.0,
with the 7.0.0 consequence stated separately; disposition ∈ {KILL, CURE-NOW, CURE-NEXT-MAJOR,
DECLINE, ANSWER, ROUTE}. CURE-NOW = non-breaking, lands in the cure wave below. CURE-NEXT-MAJOR = a
published name or paint contract moves; recorded as a ruling, NOT executed. No sibling tree was
written.

## §0—two facts that change how every row reads

**1. The consumer's installed "7.0.0" is no published version.** `dist/glass-ui.css` is
70,109 B on their disk against the registry 7.0.0's 69,884 B (sha256 `cb2b5092…`); the
scope hash is `data-v-87831917` against the published `data-v-defd849d`; the two hashed
chunks they cite (`dropdown-menu-0gkd7rMF.js`, `chip-6ysLmScu.js`) exist in no version
6.0.0–9.0.0 while every unhashed path they cite does; `header-ribbon.js` is 43 lines in
the published 7.0.0 and carries `inert` at :74 on theirs, compiled from source deleted at
`4e8c6387`, an ancestor of the v7.0.0 tag; DropdownMenu's `modal: true` entered at
`490cc46e`, also an ancestor of v7.0.0, and their bytes have it bare. Their tree is built
from PRE-7.0.0 source. Every MECHANISM they report was re-measured on registry bytes and
nothing is withdrawn on this ground; line cites drift 8–19. The finding is stated once, in
the reply's §0, with the one-command check (`wc -l node_modules/@mkbabb/glass-ui/dist/
header-ribbon.js` → 43 on the published 7.0.0), never as a per-row accusation.

**2. HEAD is not 9.0.0.** 9.0.0 = `d4f7b24f`, cut 2026-08-29, is the latest published
version; the whole O-20 cure wave (`a314533a`..`2113670c`, 2026-09-17) is post-9.0.0
(`git merge-base --is-ancestor a314533a v9.0.0` → NO). Every CURE-NOW in the O-20
disposition and every CURE-NOW below is **at HEAD** and in no published tarball: it reaches
this consumer at the cut after 9.0.0, then at their bump. Two consequences already caught:
the A-14 README cure is at HEAD, not in the 9.0.0 tarball (that README still carries the
old sentence), and A-9's tooltip ceiling is at HEAD only (see R-S2). This ledger and the
reply say "at HEAD" for cure-wave work and "at 9.0.0" only for what the tarball carries.

## §A—rows, in letter order

### R-1 · `.glass-label`'s layer membership—PARTIAL → ANSWER

**7.0.0 consequence.** The KF-KC-10 interim is required and must be authored above
(0,2,0): the producer rule is `.glass-label[data-v-defd849d]`, one class plus the scope
attribute, so an unlayered `.glass-label{}` at (0,1,0) loses despite being unlayered and a
(0,2,0) override only ties on sheet order. The menu half needs no interim past their
re-install, and the menu rule is (0,1,0) unscoped, so (0,2,0) wins outright.

**Grounds.** Verifier's own brace-depth parser over the registry tarballs: at 7.0.0 the
file's only `@layer components` spans braces 2520–19139 and `.glass-label` sits at byte
21363, outside it; `dist/styles/index.css:1` imports `../glass-ui.css` with no `layer()`
(the next import does carry one), so the emission is unlayered on `./styles` and
`./styles.css` alike. At 9.0.0 the successor is `.label[data-v-4f17b386]` at byte 16968,
past a layer closing at 14838, and `src/components/label/Label.vue:75` is still a plain
`<style scoped>` at HEAD. The menu half is DEAD at 8.0.0, not 9.0.0: `dropdown-menu__` = 0
across the whole 8.0.0 dist and `.menu__item` is already inside `@layer components` in
8.0.0's `styles/glass/overlay-plate.css` (24 layered rules, 0 unlayered). The rename
`.glass-label` → `.label` is published in MIGRATION.md under `_This cut (8.0.0)_`, the
`.glass-avatar`/`.glass-label` bullet.

**Answer.** Membership: yes, unlayered, at both cuts. The label is therefore a member of
A-3-CLASS (O-20 LEDGER §A-3-CLASS, CURE-NEXT-MAJOR at 10.0.0) and no piecemeal cure is
taken. Grounds in order: (1) the ledger's own definition—a cascade-rank change to a shipped
selector is a published paint-contract move; (2) it buys this consumer nothing at a 7.0.0
EXACT pin; (3) the class wave carries the born-RED set gate, and curing one member ahead of
it corrupts that datum. The "incoherence" argument is DROPPED: `Skeleton.vue:62` already
authors `@layer components` inside an SFC block, so the tree is mixed by precedent, not by
accident. `[data-slot="label"]` (the same element at 7.0.0 and 9.0.0, one emitter in each
dist) is offered as an OBSERVATION WITH NO WARRANTY—not a supported hook, nothing minted,
said to them in those words. The A-3-CLASS figure sent is "the set, not a number": two
in-house seats agree only on the depth-0 354 and disagree on all-depths (471 vs 604); 351
is never carried again. One wording fix rides with it—"any consumer rule outranks the
layered `.menu__item`" is false as written; an UNLAYERED consumer rule, or one in a layer
ordered after `components`, outranks it, and we declare `@layer theme, base, components,
utilities;` at `styles/index.css:1`. Their §0.4 LIFO/FIFO constraint is mis-attached to
this row (their bank id KSM R-1 is this letter's R-8); said in one clause.

**Seats.** Investigate: membership answered, state MOVED. Verify: AMENDED—state PARTIAL
(the menu half DEAD at 8.0.0, the label half LIVE under a moved identifier), specificity
and the `[data-slot]` survival added, the 351 superseded. Driver: ANSWER as above, with the
observation-no-warranty framing and the A-3-CLASS routing.

**Open items.** Two riders attach to the A-3-CLASS scope note, not to this row: the cure
design must cover the SFC scoped-block half explicitly (authored `@layer components {}`
inside the block, the `Skeleton.vue:62` precedent), and the wave publishes its measured
unlayered set as a consumer-readable manifest beside the cascade gate. Lane M carries the
scope note.

### R-2 · `components.css` defeats its own `@theme` radius scale—DEAD → ANSWER

**7.0.0 consequence.** Live at their pin exactly as filed: `components.css` declares
`--radius: 0.25rem`, `--radius-lg: 0.5rem`, `--radius-sm: 0.25rem` in one `:root` (29,171 B
file), while `theme/radius.css` declares `--radius: 0.625rem` and `--radius-lg:
var(--radius)`. The 4px they measured for `--radius-input` is that 0.25rem.

**Grounds.** Byte proof re-run on the registry tarballs, not their tree: at 8.0.0 (25,095 B) and
9.0.0 (24,207 B) `components.css` has no `:root` and declares no `--radius*` (26 `var(--radius…)`
reads remain at both); HEAD has the single site `src/styles/theme/radius.css:107`. O-20's A-4 KILL
holds unchanged.

**Answer.** One mechanism correction, because their §4 invites the mis-read: the winner is
not decided by import order. `dist/styles/index.css:1` declares `@layer theme, base,
components, utilities;` and `components.css` is imported `layer(components)`, so on the path
where Tailwind processes `@theme` into the `theme` layer the winner is picked by LAYER
ORDER, `components` being last; the theme side never becomes a plain rule (`theme/radius.css`
has zero `:root`). Re-importing the theme sheet later therefore fixes nothing. What does fix
it at 7.0.0, with no producer byte and no copied selector, is a plain UNLAYERED `:root` in
their own `design-idioms.css` restating the three names—unlayered outranks `@layer
components` by the cascade itself, on both resolver paths. That is the documented override
surface (README, "Design Tokens"), the same one A-13 turns on, so it is not an SS-6
workaround. Sent labelled as cascade-reasoned, not painted; no browser seat is owed for a
consumer-side line. The file carries 38 imports, not 39.

**Seats.** Investigate: DEAD → ANSWER, mechanism "dropped or hoisted". Verify: AMENDED—the
`@layer` declaration at `index.css:1` settles it by layer order; figures clean. Driver:
ANSWER, cure unchanged (it is correct on both paths), the mechanism restated.

**Open items.** None.

### R-3 · the Boolean cast pins a reka controlled prop shut—PARTIAL → CURE-NOW

**7.0.0 consequence.** The LabeledSelect half bites at their pin and nowhere else: a
`<LabeledSelect>` that never receives `open` is controlled-shut. The DropdownMenu half does
not exist on published bytes—registry 7.0.0 has `open: default undefined` and `modal:
default true`—so the MbabbMenu `modal` interim guards nothing against the registry and may
be load-bearing against the tree on their disk. Order of operations, ratified: keep the
interim UNTIL they re-install, then drop it.

**Grounds.** Registry 7.0.0 tarball (sha1 `37131f3a…`, matching `npm view`):
`dist/labeled-field.js:149` `open: { type: Boolean }`, bound unconditionally onto `<Select>`
at :174; an SSR probe of that dist opens on `:default-open` when `open` is absent and goes
`data-state="closed"` the instant `open: false` is handed in. KF-CO-1 confirmed. Roster
measured across the published 9.0.0 dist: `checked` and `pressed` do not exist as glass
props in runtime or `.d.ts` (glass publishes `modelValue`; O-20 A-11b removed Button's
`pressed`); the `useForwardProps` set (Dialog, Select, Toast, Switch, Checkbox…) is INERT by
reka's own forwarding law, since an absent prop never reaches the reka root; DropdownMenu,
Popover, Tooltip and CommandDialog already carry `default: undefined`. Exactly four bare
Booleans are bound explicitly into a controlled prop—Collapsible `open`, Chip `modelValue`,
Chip `defaultValue`, LabeledSwitch `modelValue`. CommandDialog was the one true "non-modal
by accident" site and was cured at 8.0.0 (`CommandDialog.vue:10-36`). LabeledSelect itself
is removed at 8.0 (MIGRATION.md, the "removed at 8.0" row), so it takes an ANSWER at their
pin and no cure.

**Cure (at HEAD, the `CommandDialog.vue:27-33` form, one key per component).**
`Collapsible.vue` withDefaults `open: undefined`; `Chip.vue` withDefaults `modelValue:
undefined` ONLY; `LabeledSwitch.vue` withDefaults `modelValue: undefined` plus `types.ts`
`modelValue?: boolean`. `Chip.defaultValue: undefined` is a REGRESSION, not a cure—measured
twice on a patched 9.0.0 dist, it strips `aria-pressed` from a plain `<Chip
mode="selectable">` (reka `Toggle.vue:66-86` plus Vue's undefined-attribute omission), while
`modelValue: undefined` alone fixes `:default-value="true"` and keeps `aria-pressed="false"`
on the unpressed chip. The LabeledSwitch type widening is ratified as non-breaking: the
runtime never enforced required (`.required === undefined`, omission warns zero times), so
the type moves to the runtime truth and matches `<Switch>`. Witnesses: one mount assertion
per cure in the three EXISTING contract tests (`:default-open` / `:default-value` seeds
paint ON), an `aria-pressed` guard on Chip, and an assertion that the emitted chunk reads
`modelValue: { type: [Boolean, null], default: void 0 }`. Gates stay 60. A-11b argues FOR
this: it re-homes consumers onto the controlled Chip spelling, and the uncontrolled one must
not be dead in that landing zone.

**Seats.** Investigate: PARTIAL → CURE-NOW, `default: undefined` on both Chip keys. Verify:
AMENDED—`defaultValue` is a regression (measured), the count is four not three, provenance
dated to `490cc46e`, and the consumer advice flips from "drop the interim" to "keep it until
you re-install". Driver: CURE-NOW on the verifier's shape.

**Open items.** None. The roster answer is §4's and is sent by name.

### R-4 · aurora placeholder never hidden on arm—LIVE → CURE-NOW (doc) + ANSWER + DECLINE

**7.0.0 consequence.** Identical at 7/8/9: nothing hides or fades `.aurora-placeholder` on arm. But
the presence envelope they want is already at their pin—`opacityCeiling` (prop, `default: 1`,
clamped, applied once to the shared root) is documented in the registry 7.0.0's
`dist/components/aurora/Aurora.vue.d.ts:65-82` as the maximum compositing opacity the surface may
reach.

**Grounds.** What arms is the canvas LAYER (`.aurora-canvas-layer{opacity:0}` →
`--armed{opacity:1}`); the ground is mounted unconditionally with no opacity, visibility or
armed-keyed rule in any of the three dists. The correction that changes their number:
`config.alpha` is canvas-only (`canvas.style.opacity`, `runtime.ts:234-237`) and the ground
beneath is a full-opacity, alpha-blind raster of the SAME field, so `alpha` cannot reduce
delivered presence by any factor—the envelope is `opacityCeiling`, not `alpha`. Verifier's
addendum: at DEFAULT config (`alpha: 1.0`, live presentation opaque) the armed canvas fully
occludes the ground, so their 2× cannot arise at default at all. `DEFAULT_AURORA_CONFIG.
impasto = 0` is `presets.ts:483` (:492 is `alpha`). Their cite `:2699` is 19 lines and one
class short of the registry's 7.0.0 (:2718, `h-full min-h-0 w-full`).

**DECLINE** hide-on-arm: the ground is the surface a failed runtime, a lost context and the
`"css"` substrate all fall back to (`Aurora.vue:32-35`, :57-70); a hide-on-arm rule puts a
hole exactly there—the masking-fallback shape inverted.

**Cure (at HEAD, docs only).** JSDoc on `AuroraConfig.alpha`
(`src/components/aurora/constants/presets.ts:284`) carrying the three measured facts: it is
the pigment alpha of the painted image; it composites over an alpha-blind ground, so it
re-weights a dissolve rather than presence; the presence envelope is `opacityCeiling`. Ships
via `dist/aurora.d.ts`. No code, no prop, no gate. Their §3 halved-ceiling interim is not an
interim—it IS the API, and nothing retires it.

**Seats.** Investigate: LIVE → CURE-NOW (doc) + DECLINE, mechanism measured. Verify: UPHELD,
amended by addition (default-config occlusion; the composite doc already at their pin).
Driver: as above.

**Open items.** Internal, no lane: `aurora-canvas--armed` (template-bound, 0 CSS rules 7→9)
and `data-aurora-settled` (9.0.0, 0 rules) are hooks with no paint—noted for the STRUCTURE
sweep, not this letter.

### R-5 · aurora omitted from both a11y sweeps—LIVE → CURE-NOW

**7.0.0 consequence.** Their census reproduces to the block at their pin: 7 `forced-colors`
blocks, 3 `prefers-reduced-transparency` blocks, 0 aurora inside either, and their
`a11y-overrides.css` roster is verbatim correct. A forced-colors reader gets system-colour
text over an unforced full-chroma animation.

**Grounds.** At 9.0.0 the counts are 4 and 0 in `glass-ui.css` because the switch/checkbox/
radio arms MOVED into `styles/glass/control-bit.css` and `styles/glass/focus-veil.css`, both
NEW files at 9.0.0 (say "moved", never "gained"); aurora is in neither sweep anywhere in the
styles tree at any cut. Structural cause: every a11y arm we ship is CSS, `forced-colors`
leaves canvas pixels alone, and `a11y-fallback.css`'s `--glass-level: 0` drives the CSS
plates, not the GPU field. Housekeeping measured with it: `glass-ui.css` is 69,884 B
(sha256 `cb2b5092…`), not 70,109, and `aurora` occurs 10 times, not 12.

**Cure (at HEAD, in `Aurora.vue`'s own scoped block; no new file, no module, no JS media
read).** The verifier's measured shape, not the investigator's—patched and rendered in
headless Chromium, an inline `background-image` and an inline CUSTOM PROPERTY both outrank an
author media arm, so `background-image: none` and a `--aurora-ceiling` indirection were
no-ops. (1) The three inline paint values move to custom properties: root `:style="{
'--aurora-ceiling': clamped }"`, placeholder `:style="{ '--aurora-ground-image': …,
'--aurora-ground-color': … }"`. (2) Scoped rules read them: `.aurora-root { opacity:
var(--aurora-ceiling-a11y, var(--aurora-ceiling, 1)) }` and `.aurora-placeholder {
background-image: var(--aurora-ground-image, none); background-color:
var(--aurora-ground-color, transparent) }`. (3) `@media (prefers-reduced-transparency:
reduce) { .aurora-root { --aurora-ceiling-a11y: 1 } }`—the a11y arm writes a property no
inline style occupies, no `!important`. (4) `@media (forced-colors: active) { .aurora-root >
.aurora-canvas-layer { display: none } .aurora-placeholder { background-image: none;
background-color: Canvas } }`; Chromium forced-colors forces `background-color` but keeps
`background-image`, so the image half is the load-bearing one. Measured green on all three
arms. Ratified as CURE-NOW: `opacityCeiling`'s semantics are unchanged and the paint
authority moves from inline values to custom properties on the same elements—not a break.
Honest scoping stated to them: a default aurora presents opaque, so the
reduced-transparency arm bites only where a consumer set `opacityCeiling < 1`. The witness
rides an EXISTING a11y test (`tests/components/a11y/focus-visible.test.ts` already asserts
forced-colors selectors) or the aurora contract test; the implement seat names the file. No
seat is promised in the letter and none is minted. Gates stay 60.

**Answer half.** Their two-line consumer stopgap does not breach their own §0.3—it lands on
their wrapper and copies no producer selector—and it retires at their bump.

**Seats.** Investigate: LIVE → CURE-NOW with a media-arm shape. Verify: AMENDED—two of three
arms were measured no-ops; the custom-property routing replaces them; the 9.0.0 files are new,
not newly-armed. Driver: CURE-NOW on the verifier's shape.

**Open items.** Seat ownership for the a11y arm is the implement seat's to name from the
existing tests; nothing new is created.

### R-6 · `wake()` ungated under PRM; the throwing token bridge—LIVE → CURE-NOW + DECLINE

**7.0.0 consequence.** Identical at 7/8/9: four unguarded `wake()` sites on the pointer and
visibility paths, one guarded (scroll). Under PRM the pointer path cannot change a pixel and
the wake is pure waste inside the input task.

**Grounds.** Registry 7.0.0: `:2391` setCursor · `:2394` clearCursor · `:2397`
setCursorRadius · `:2401` setScrollProgress (guarded) · `:2413` update; their cites are a
uniform 17 lines low. Shader time is pinned at `REDUCED_MOTION_TIME` 3.7 under PRM and
`setPointer` early-outs, so `setCursor`/`clearCursor` redraw the frame already on screen.
Verifier's correction, carried honestly: `setCursorRadius` is NOT bit-identical—`cursorRadius`
is uploaded unconditionally and `reset()` holds a raised envelope—so its guard stands on
preference-suppression grounds, not bit-identity. One correction in their favour: their
fourth site is `update()`, the config-change path, which MUST keep its wake (a preset swap
under PRM repaints the one static frame).

**Cure (at HEAD).** `runtime.ts` `setCursor` (:427), `clearCursor` (:433) and
`setCursorRadius` (:439) gate the wake with `if (!canvasHandle.reducedMotion)`, the
`setScrollProgress` idiom at :445; every state write stays so an un-reduce resumes truthfully;
`update()` keeps its unconditional wake with a one-line comment naming the exception. Three
lines. Rides the MOTION seat's PRM arm.

**Rider 1—the `resolveAtoms` throw.** DECLINE the non-throwing bridge: catch-to-stock-palette
is a masking fallback, and `cssToOklch` already declares the posture in the bytes they hold.
CURE-NOW the missing half: JSDoc on `AuroraAtomsBase.seed` (`atoms.ts:130`)—a string seed is
parsed by `cssToOklch`; a contextual (`var(--x)`, `currentColor`) or non-opaque value throws
`GlassColorError`; resolve the token yourself and pass the `OklchStop` form. Ships via
`dist/aurora.d.ts`.

**Seats.** Investigate: LIVE → CURE-NOW, four guards, bit-identity grounds. Verify: AMENDED—
`update()` exempted, `setCursorRadius` re-grounded, both riders upheld. Driver: CURE-NOW as
above; the `light` rider split out as R-6-LIGHT.

**Open items.** A scope-hash note for their stopgap, sent in the reply: `.aurora-root` carries
`data-v-aebed9bd` at 7.0.0/8.0.0 and `data-v-f054ede9` at 9.0.0, so a consumer stopgap must
never hard-code a scope attribute. Their §3 pointer-policy interim is not a workaround on the
record—pointer policy is the consumer's by contract (Aurora's docblock).

### R-6-LIGHT · `interactivity.light` on a medium with no impasto—LIVE → CURE-NOW (a, b) + CURE-NEXT-MAJOR (c)

**7.0.0 consequence.** At their pin `light` paints nothing on crayon, which is why their
shipped-vs-cured delta measured exactly zero. Their consumer decision—stroke medium or delete
the atom—stays theirs; this is the fact to decide it on.

**Grounds.** `light` steers `uLightDir`, consumed only by `relightImpasto`, every term of
which is multiplied by `uImpasto`; the config default is `impasto: 0` (`presets.ts:483`). The
TS2345 they hit is not `AuroraInteractivity` (which has carried `light?: boolean` since 7.0.0)
but the atoms door's discriminated union, whose smooth arm declares `light?: never`.

**Cure.** (a) CURE-NOW, docs: JSDoc stating that `light` steers relighting only where
`impasto > 0`; today's note says only "smooth has no impasto to relight", which is true and
insufficient—other non-smooth media have none either. (b) CURE-NOW, internal:
`isAuroraPointerEnabled` (`runtime.ts:204-209`) gates on the medium test, so crayon + light +
`swirl: false` arms a pointer path that provably cannot paint; re-key the predicate on the
impasto amount, and the implement seat MEASURES which media carry `impasto > 0` first
(born-RED). (c) CURE-NEXT-MAJOR: narrowing the atoms-door union (`light?: never` on the smooth
arm; the honest type is "light only where impasto > 0") is a type change on a published door.

**Seats.** Investigate: rider folded into R-6. Verify: the three dispositions separated and
the inertness proved through the shader term. Driver: split to its own id with (a)/(b) in
Lane A and (c) to the register.

**Open items.** (c) sits in the CURE-NEXT-MAJOR register; nothing is promised to them beyond
the doc line and the fact.

### R-7 · `@utility touch-hit-area` cannot expand a tap target—DEAD → ANSWER

**7.0.0 consequence.** Their exposure at the pin is nil: the name occurs exactly once in the
7.0.0 package, its own definition, so no glass-ui component composes it. Their annotation of
KF-CO-24 and MISS-3 is right on the mechanism.

**Grounds.** (a) The utility left the published CSS at 8.0.0, in `bd93c22b`; measured from the
tarballs before the history (1 occurrence at 7.0.0, 0 at 8.0.0, 0 at 9.0.0), and the history
agrees. Its MIGRATION row is banked under §8.0.0 because rows sit under the major that actually
shipped without the name; it never reaches them (`files: ["dist"]` at every version), which is
why the answer travels in this letter. (b) Conceded without reservation: it never expanded a
target at any version—`pointer-events: none` was a deliberate swallow-fix for broken radio taps,
and the 44px box was a geometry for a computed-style readback. No 7.x doc republish: 7.0.0 is
immutable and its README says nothing of it. The atoms it once named carry real geometry:
`.checkbox__seat` is a real 44×44 child with `pointer-events` left at auto inside CheckboxRoot;
Switch's host is `min-inline-size`/`min-block-size: var(--touch-target)` ungated; the radio seat
is 44px; `.tags-input__delete` is a real 44×44 box under coarse. The Slider thumb is the
DELIBERATE exception (`width: 0; opacity: 0`; the track is the target, settled at o19/TR ⊕⁷ on
their own measurement)—said plainly; we never claim "every atom". (c) Button wears
`data-control-target` UNCONDITIONALLY from 8.0.0, not 9.0.0: the 8.0.0 and 9.0.0 chunks
(`button-yvGPb0Bx.js`) are byte-identical and the commit is `70dc0f06`; at 7.0.0 it is
icon-only, and the block axis was already floored at 7.0.0 through `--button-size` →
`--control-h-*` → `--control-floor`. Input gets no arm and none is owed on the block axis
(`.field-control` rides `--control-h-md` into the coarse `:root` lift). The framing correction
they will want: a SHARED, attribute-driven floor ships in their own 7.0.0—`@media (pointer:
coarse){[data-control-target]{min-block-size: var(--touch-target,2.75rem); min-inline-size:
var(--touch-target,2.75rem)}}` in `styles/utilities/responsive.css`. Never write "one shared
rule": 8 of 9 coarse blocks at 9.0.0 are component-owned. B-1's parenthetical was an accurate
quote used to frame the ask—confirmed as fact, no charge.

**Seats.** Investigate: DEAD → ANSWER on all three limbs. Verify: AMENDED on six counts, the
load-bearing ones being the Button arm's date (8.0.0) and the shared `[data-control-target]`
rule already present at their pin. Driver: ANSWER as above.

**Open items.** A second coarse block inside a component, or a hit-slop pseudo, is refused here
by the standing ruling `tests/components/a11y/coarse-target.test.ts`.

### R-7-RIDER · the docs that still prescribe the convicted halo—LIVE → CURE-NOW (docs)

**7.0.0 consequence.** None for them; this is ours. It mints nothing.

**Grounds and cure (at HEAD).** (1) The MIGRATION.md `touch-hit-area` removal-table cell as
written prescribes the halo they convict; rewrite it to name the keep-the-paint-small door (a
real child seat inside the host, the `.checkbox__seat` form) and the attribute floor. (2)
`docs/design/design-idioms.md:91` still uses the removed utility as the example content for
`a11y-overrides.css`. (3) README's "Target size" paragraph—the README is the only prose that
installs—names `[data-control-target]`, `--control-floor`/`--control-h-*` and `.control-bit`'s
unconditional seat. (4) DESIGN.md carries the same three mechanisms beside the tier table;
today `[data-control-target]` has one prose line, inside the Timeline section. The Button arm
is stated as 8.0.0 everywhere.

**Seats.** Raised by the verify seat as the doc half of R-7. Driver: CURE-NOW, Lane M.

**Open items.** None.

### R-8 (KSM R-1 + R-8 + R-16 + R-17) · the keyboard registry has no suspend, scope or priority—LIVE → CURE-NOW

**7.0.0 consequence.** The whole 19-binding registry stays live behind an open modal at their
pin—and there is a complete remedy they can take today with no producer byte: our listener is
on `window` in the BUBBLE phase (`dist/keyboard.js:76-79`, no options), so ONE `stopPropagation`
keydown listener on the modal root blanks all nineteen bindings without owning any registration.
Executed on a real DOM; complete rather than partial because reka's Dialog traps focus
(`DialogContentImpl.js:71`), so every keydown inside an open modal crosses that root. "Register
your guard first" is strictly weaker (first match swallows) and is dropped.

**Grounds.** Every figure reproduces with zero drift: `dist/keyboard.js` is byte-identical at
7.0.0, 8.0.0 and 9.0.0 (sha256 `982f6e28…`, 104 lines / 3706 B); `defaultPrevented`, `suspend`
and `priority` are 0 occurrences in all three; the `.d.ts` cites `:30`/`:32` land exact. No O-20
ruling touches this surface (the ledger has zero keyboard hits; A-7 was `useTabRovingFocus`).
THE CORRECTION, load-bearing and in their favour: the LIFO-for-Escape / FIFO-for-destructive law
is not a constraint the future API must be designed against—it IS the shipped dispatcher
(`dist/keyboard.js:63-73`: Escape walks the registry reversed, every other key returns on the
first match), landed at `f24577c7` (BI.W-ESC-STACK) and live from v5.0.0, therefore in their
pinned tree.

**Cure (at HEAD, additive, in `src/composables/keyboard/useKeyboardShortcuts.ts`).**
(a) `suspendShortcuts(): () => void`—a monotonic registration `seq` plus a barrier stack; while
suspended, non-Escape keys reach only shortcuts registered AFTER the suspension; Escape ignores
the barrier and keeps its LIFO walk; within any layer the first registrant still wins, so no
later registrant can shadow a destructive binding. Tested on patched published bytes (+13 lines
minified; byte-equivalent before suspension; the app layer silent during; a late registrant
cannot shadow the modal's Delete; `resume()` restores). (b) `formatComboLabel(raw): string`—the
spoken-word form beside `formatComboParts`, reading the registry's own alias table, which cures
R-17 by the same function ('delete' → "Delete or Backspace", canonical token first, single
letters upper-cased, 'mod+shift+z' → "Control Shift Z"); our own `demo/shell/AppShell.vue:355`
(a glyph-built accessible name) is its first consumer, so the defect is ours too. (c)
`LabeledShortcut extends RegisteredShortcut { label: string }` as the element type of
`useRegisteredShortcuts()`, closing R-16—type-only narrowing, non-breaking, the runtime already
filters on label. (d) The one-line `if (e.defaultPrevented) return;` guard lands in the SAME cut
with a MIGRATION bracket (a behaviour change, not an API break): the gate it was held behind,
`proof:esc-stack`, was deleted at BI.W-P000 (PACKAGE-SCRIPT-ABROGATION.md:113; package.json has
zero `proof:*`), and the hazard was false—reka's `DismissableLayer.js:77-83` READS
`defaultPrevented` and never sets it, and nothing in our tree preventDefaults a keydown
(`ExpandableContainer.vue:201` is a mount-autofocus Event). [2026-09-18 · re-ruled at lane K:
that clause was false—useFuzzySearch.ts:104-122 (composed at useDockSearch.ts:181),
useTabRovingFocus.ts:183-201 and sortable-list/drag.ts:589-617 all preventDefault keydowns. The
cure (d) stands on the invariant "one press, one handler": a consumed key was already handled by
the layer that consumed it; Escape is NOT exempt from the guard (a consumed Escape was a
dismissal) and IS exempt from the barrier. The grounds were wrong, the cure was not.] Tested
clean. The surviving scenario
is the nested esc-stack story (`demo/stories/containers/expandable-container.vue:126,134`), which
the witness exercises. IN-HOUSE ENROLMENT ships with the API (A-7/A-8 govern: an export with 0
importers is the shape A-7 declined, and what earns a door is a NAMED consumer need): the modal
overlays—Dialog, Sheet, CommandDialog, and Menu/Popover only when `modal`—call
`suspendShortcuts()` on open and the returned resume on close, the implement seat MEASURING which
components are modal by reka contract before wiring. Two docblock contracts ride with it:
ORDERING—call `suspendShortcuts()` before the modal registers its own bindings (the barrier is
`seq > topBarrier`, and the in-house wrappers do it in that order); and
`useRegisteredShortcuts()` is NOT barrier-filtered, by design and stated—it is the reference
list, not a live capability probe, because a help overlay is itself a modal and filtering would
empty it. The only door is the `./keyboard` subpath: the reply names
`@mkbabb/glass-ui/keyboard` or it is unactionable. Witnesses in the existing keyboard unit tests
(barrier, LIFO/FIFO preserved, label form, esc-stack story). Gates 60.

**Seats.** Investigate: LIVE → CURE-NOW with `defaultPrevented` held to CURE-NEXT-MAJOR and a
"register your guard first" 7.0.0 answer. Verify: AMENDED on five counts—the guard released into
this cut, the `stopPropagation` barrier proved as the real 7.0.0 answer, the enrolment made a
condition of the exports, the subpath named, the two docblock contracts added. Driver: one row,
not two; CURE-NOW on the verifier's shape.

**Open items.** Cadence note for the owner's register: five consecutive majors v5→v9 mean
CURE-NOW and CURE-NEXT-MAJOR name the same cut here; the words still mark break vs non-break, so
they stay. Their SS-13 escalation clause (a destruction path behind a modal with no live undo) is
a consumer-side observation, acknowledged in one line; the barrier is the producer half of it.
Their cite `useToolbarKeyboard.ts:80-101` is a consumer file with no producer counterpart, and
their bank id "KSM R-1" collides with this letter's R-1, so we answer as R-8/KSM R-1.

### R-9 · a first-class selectable chip-group—LIVE → ANSWER + DECLINE

**7.0.0 consequence.** The group already ships at their pin: `<ToggleGroup type="single"
v-model>` with `<ToggleGroupItem :class="chipVariants({ interactive: true, size: 'sm', shape:
'pill' })">`—real `<button>`s (their S-2 constraint, met by the producer), consumer class merged
at 7.0.0, `chipVariants` public on `./chip` at both cuts. One control with roving focus and the
single-select invariant, and the 28 hand-rolled invariants deleted.

**Grounds.** Both attribute filters live at 7/8/9 and are WIDER than quoted—`name` and
`required` are stripped too, already at their pin—and they are deliberate: `mode="selectable"`
is reka's `Toggle` (which owns `aria-pressed`/`data-state`), and the static arms are `<span>`s
that must not receive `role`/`tabindex` by fall-through. "Structurally unspellable" stands as
filed. A-11b answered the ITEM and never claimed the GROUP, so this is not a re-ask. Chunk name
drift: 7.0.0 ships `chip-DFZQr6rV.js`, 9.0.0 inlines into `chip.js` with byte-identical filters;
`chip-6ysLmScu.js` is in no published version.

**DECLINE.** No `ChipGroup` will be minted: there is ONE selection engine
(`useSelectionGroup`, faces = dock run, SegmentedTabs, ToggleGroup) and a fourth face differing
only in paint is the duplication BI/BK removes. The optional Chip-in-ToggleGroup-context arm is
declined too—a second reka-boundary removal for a shape the composition already spells.

**Verifier's caveats, measured and carried into the reply.** (1) ARIA at 7.0.0 is reka 2.10.1's:
`role="group"` plus per-item `aria-pressed`/`data-state`, NOT `radiogroup`/`radio`/`aria-checked`;
the radio roles are the 9.0.0 NATIVE rewrite (`useSelectionGroup`), inherited free at their bump
with no markup change—reka's contract, not a defect we cure at their pin. (2) Paint collision:
`.toggle-group__item[data-state=on]{background: var(--accent)}` wins over the chip's ON flood, which
is keyed `[data-mode="selectable"][data-state="on"]`, an attribute ToggleGroupItem never sets;
mitigation without a producer change is to forward `data-mode="selectable"` as a fallthrough attr on
the item (only the CHIP filters attrs). (3) `.toggle-group__item{background: 0 0}` lands after the
glass sheets, so re-assert the fill. (4) `dist/styles/glass/glass-chip.css` ships but nothing
imports it at 7.0.0—import the published file; 9.0.0 imports it. (5) `type="single"` paints its own
track at 7.0.0; at 9.0.0 `.toggle-group` is layout only. (6) The CSS-ENTRY CONDITION for every
material claim: `dist/glass-ui.css` carries no rung class
(`.glass-wash`/`-quiet`/`-resting`/`-floating`/`-overlay`/`-card`/`-chip`) and no `[data-surface]`
rule at 7.0.0, 8.0.0 or 9.0.0; the seven `.glass-*` names in the 7.0.0 bundle (`.glass-avatar`,
`.glass-fill`, `.glass-label`, `.glass-slider`, `.glass-thumb`, `.glass-thumb-seat`, `.glass-track`;
0 at 8.0.0 and 9.0.0) are component-scoped SFC blocks, R-1's label among them, not the material. The
material reaches a consumer only via `@mkbabb/glass-ui/styles` (`dist/styles/index.css`). The reply
states that condition once. Vocabulary: `listbox` is in no cut; the register is
`radiogroup|tablist|group` and `SelectionRole` is not widened.

**Seats.** Investigate: LIVE → ANSWER, composition "already spellable". Verify: AMENDED—the ARIA
claim was never measured against reka, the paint collision was missed, and the filter widening is
present at 7.0.0 not 8.0.0. Driver: ANSWER + DECLINE with all six caveats.

**Open items.** None.

### R-10 · a consumer-reachable material opt-out—PARTIAL → ANSWER

**7.0.0 consequence.** Their premise is false at their own pin, in their favour: `glass/
material.css` ships `:where(.glass-wash, .glass-quiet, .glass-resting, .glass-floating,
.glass-overlay, .glass-card, .glass-dock) > * { --glass-cell-backdrop-filter: none }`, so a
nested `.glass-wash` is UNBLURRED at 7.0.0 (render-proved: nested wash `none` at 7.0.0 →
`blur(10px)` at 9.0.0; the wash rung itself moved with it—`--glass-blur-wash-radius` is `1px` in the
7.0.0 dist and `10px` in the 9.0.0 dist, which is the reply's host `blur(1px)` and its "10px over
10px"). Their "host floats, contents do not" decision is already the producer's
automatic law there—for the blur. What stacks at 7.0.0 is the translucent BACKGROUND plate.

**Grounds.** The combobox rule is byte-exact at 7/8/9. The depth rule they quote is
polarity-inverted: `:not(.glass-wash)` occurs 0 times in any dist; the shipped form is
`:where(.glass-card,.glass-resting,.glass-quiet,.glass-wash){--glass-depth:
var(--glass-depth-content)}` (`styles/glass/deep.css`), so depth is granted BY the rung class—
their inference from it is right, their cite is inverted. Verifier's render runs (two playwright
passes) OVERTURNED the investigator's reasoning and the ruling follows the verifier: (1) the
doubling they predict is an 8.0.0+ behaviour, introduced when BK.W-FROST (`4b1a9733`) struck the
blanket token and the `> *` content-tier rule by banked intent—restoring it is a DECLINE; (2)
`--glass-level: 0` is NOT a consumer lever—inline on the element it changes nothing at either cut
(substitution happens where the rung blur is defined) and bites only at `:root`, as a global
material kill-switch, so it is never advised per subtree; (3) `glass-quiet` is a lower rung that
still blurs, not an opt-out.

**Answer.** The opt-out is the `surface` axis on the CHILD:
`[data-surface="opaque"]{--glass-level:0; backdrop-filter:none; opaque --card plate}`
(`surface-axis.css`, verbatim at 7/9, imported after `ladder.css` so it beats the rung by source
order—verified), reachable as `<Chip surface="opaque">` (a public prop at 7.0.0, `data-surface`
emitted on all four branches, render-proved at both cuts), as `<Surface tier="floating"
surface="opaque">`, and as the bare attribute on any element they own (`<div class="glass-wash"
data-surface="opaque">` for the tab strip); `veil` is the half rung. They should write the
explicit opt-out even where 7.0.0's automatic half already covers them, because the automatic
half is gone from 8.0.0 on and the explicit spelling survives the bump. One 7.0.0-only caveat:
`surface="opaque"` cannot reach the `type="single"` ToggleGroup track ((0,2,0) beats (0,1,0)),
but at 7.0.0 the direct-child rule already unblurs it and 9.0.0 deleted the track. Same
CSS-entry condition as R-9. Nothing lands at HEAD for the row itself.

**Seats.** Investigate: PARTIAL → ANSWER with `--glass-level: 0` listed as a route and the
token's death dated to 9.0.0. Verify: OVERTURNED in substance, word retained—the automatic law
at 7.0.0, the inert inline `--glass-level`, the 8.0.0 strike date. Driver: follows the verifier.

**Open items.** The undocumented strike is R-10-RIDER.

### R-10-RIDER · the BK.W-FROST strike is in no MIGRATION row—LIVE → CURE-NOW (docs)

**7.0.0 consequence.** None at their pin; it is what bites them at the bump.

**Grounds.** `--glass-cell-backdrop-filter`: 39 hits at 7.0.0, 0 at 8.0.0, 0 at 9.0.0, 0 at HEAD;
`grep -n 'glass-cell-backdrop-filter' MIGRATION.md` → 0 hits at HEAD. The `:where(<rungs>) > *`
content-tier rule went with it.

**Cure (at HEAD, docs).** A MIGRATION.md entry under `## 8.0.0` recording the strike—both the
blanket token and the content-tier rule—as a removal-table row (first cell the backticked bare
name; no roster impact, it departed before the 9.0.0 datum), plus one sentence naming
`surface="opaque"` / `data-surface="opaque"` as the explicit replacement. The A-4-RIDER class;
rides B-3's manifest. Told to them plainly: build on the surface axis, never on the token.

**Seats.** Raised as an open question by the verify seat. Driver: CURE-NOW, Lane M.

**Open items.** None.

### R-11 · the collapsed-at-rest header ribbon—DEAD → ANSWER

**7.0.0 consequence.** The mechanism does not exist at their pin. Published 7.0.0
`dist/header-ribbon.js` is 43 lines with zero `inert` and zero `aria-hidden`; the surface is
`placement`/`ariaLabel`/`class` with one `items` slot, and the `role="toolbar"` band renders
expanded from first paint. The two bindings they quote at `:74-75` compile from source deleted
at `4e8c6387`, an ancestor of the v7.0.0 tag. Their banked lemma—no keyboard route to share or
theme-toggle anywhere in the app—holds against their bytes and fails against ours; W6-L's
`#anchor` work vanishes on re-install, and the §3 interim retires with it.

**Grounds.** The collapsible contract they measure (`mode`, `anchorLabel`, `anchor` slot,
`hideTimeoutMs`) was removed AT 7.0.0—MIGRATION.md, `## 7.0.0 (2026-07-17)`: persistent-only, no
collapsible mode, no disclosure anchor, no reveal/pin gesture. This is the strongest provenance
witness in the letter, which is why the reply's §0 leads with "verify your install" and carries the
one-command check; this row cites its result (43 lines). Neither producer ask has an object: there
is no anchor to omit and no collapsed state to keep a tab stop in.

**Answer.** At the bump, HeaderRibbon is DELETED at 8.0.0 (`4bf53962`, 2026-08-04): the component,
the `/header-ribbon` subpath and both types, with no successor. Compose `<Surface
material="functional" surface="glass" specular="subtle">` under their own `role="toolbar"`
wrapper, which is all the 43-line component was.

**Seats.** Investigate: DEAD → ANSWER on the published bytes. Verify: UPHELD. Driver: ANSWER.

**Open items.** The doc half is R-11-RIDER.

### R-11-RIDER · MIGRATION's 8.0.0 deletion count and the retained consumer-evidence page—LIVE → CURE-NOW (docs)

**7.0.0 consequence.** None; ours.

**Grounds.** MIGRATION.md `## 8.0.0` says one component is deleted and names only TagsInput, while
`4bf53962` deleted HeaderRibbon in the same major. `docs/consumer-evidence/header-ribbon.md`
still reads RETAINED.

**Cure (at HEAD, docs).** (1) Add the `_Deleted — HeaderRibbon_` entry (component, subpath,
`HeaderRibbonProps`/`HeaderRibbonPlacement`, the successor recipe above) and correct the count
sentence, following the file's own dated-bracket convention for a late row. (2)
`docs/consumer-evidence/header-ribbon.md` is a record, so it takes a dated deletion bracket at its
head (deleted at 8.0.0, `4bf53962`; historical), not a delete.

**Seats.** Raised by the investigate seat, confirmed by the verifier. Driver: CURE-NOW, Lane M.

**Open items.** None.

### R-12 · `text-caption` is italic while no italic face ships—LIVE → ANSWER (+ doc arm CURE-NOW)

**7.0.0 consequence.** Their §2.10 resolution is correct at their end and we do not ask them to
reverse it. The two replacements they need both ship at 7.0.0 today and both paint real glyphs
under `font-synthesis: none`: `text-mono-caption`, and `color: var(--muted-foreground)` on
`text-caption` (which is `--type-caption` at weight 400).

**THE DECISION (ratified).** glass-ui does not intend an italic face and none will ship;
`text-caption`'s italic IS a synthesis dependency, as are `text-math`, `text-math-body` and
`fourier-f`. Grounds: the register is deliberately four roman woff2 files (one variable roman per
family plus the Capsize fallback—one coherent brand voice); we declare no `font-synthesis`, so our
default is the UA's `auto` and our reference captures paint the oblique knowingly; their
`:root{font-synthesis:none}` is a policy we never documented, not a bug. And the obvious counter is
measurably unavailable: the shipped binaries have ONE axis (`wght`) with `post.italicAngle 0.0` and
no `ital`/`slnt`, so there is no axis to enable—an italic pair is two further upstream binaries,
+49,076 B woff2 (≈ +65 KB base64, about +49% on `fonts.css`, 132,840 B / 100,396 B gzipped at 9.0.0;
132,943 B at 7.0.0) to serve four declarations, three of them mathematical italic where synthesized
oblique is conventional.

**Grounds.** Every figure reproduces with zero drift at 7/8/9: 0 italic `@font-face`, 0
`font-synthesis`, 4 `font-style: italic` (the four utilities above). Their B-1 cite is exact and
understates us—O-20 LEDGER B-1 already wrote "user data in synthesized italic". Their raw
`@font-face` count of 12 at 7.0.0 is 9 rules plus 3 README code fences.

**Doc arm (at HEAD, CURE-NOW).** One sentence in the typography register's documentation—the lane
finds the register's home, DESIGN.md's typography section and/or the README fonts paragraph,
wherever `text-caption` is documented—naming the four utilities as synthesis-dependent and stating
that the library declares no `font-synthesis`.

**Seats.** Investigate: LIVE → ANSWER, the decision proposed. Verify: AMENDED—the binaries opened
(one axis, italicAngle 0), the size price measured, the two 7.0.0 replacements confirmed present.
Driver: the word is ratified.

**Open items.** OPEN DESIGN ITEM, registered not ruled: whether `text-caption`'s italic on running
prose is retired at 10.0.0. That is a typographic decision on a shipped semantic utility and
belongs to a typography wave. Nothing is promised to them about it.

### R-13 · the `useTabRovingFocus` export ask, withdrawn—LIVE → ANSWER

**7.0.0 consequence.** The withdrawal is safe and the door was open at their pin: `./motion-core`
exports `useSelectionGroup` and `useSelectionIndicator`, `./tabs` publishes `SegmentedTabs` alone,
and no exports map at 7.0.0, 8.0.0 or 9.0.0 carries a wildcard that could reach a dist-internal
chunk (the only one is `./fonts/*`). HEAD re-affirms the decline at
`src/composables/motion/core/index.ts:114`, which re-exports `useSelectionGroup` and names
`useTabRovingFocus` only in a comment. A-7 holds unchanged at 9.0.0.

**Grounds and the two forward facts.** At 8.0.0 the standalone `useTabRovingFocus` chunk stopped
existing (inlined into `useSelectionGroup-zsEwitF6.js`), so their G-W6-2 ban is vindicated by
bytes—that import would have broken at their bump on its own. And the price they accepted rises at
the type level: `tsc --strict` on a 7.0.0-shaped call (a `ref<string>()` model, options typed with
a literal-union value, one bare `UseSelectionGroupReturn` annotation) is clean against the 7.0.0
d.ts and throws three TS2322s against the 9.0.0 d.ts—`model` is now
`Ref<O['value'] | O['value'][] | undefined>` and `Ref` is invariant, and the return type became
generic (`<V = string>`). Two one-line fixes at their end: type the model ref at the option value
type (`ref<Opt['value']>()`), and parameterise or drop the bare annotation; `deform`/`onSelect` are
additive. Derivation working as intended, but budget the line. Four files name `useTabRovingFocus`
at 8/9, not "the chunk plus two .d.ts". One sentence points them at MIGRATION's motion-core rows
for their bump plan, because the export SET churned 7→8 beyond this row
(`useLeadTrail`/`useStaggerReveal`/`useTextHighlight` and others absent at 8/9; `ROUTE_*`/
`VAPORIZE_*`/`dissolve*` arrive). Citation flag with no substance behind it: their chunk hash
`Dh4yBGxq` is in no published version—registry 7.0.0 ships `useTabRovingFocus-YnWh-Ytr.js`.

**Seats.** Investigate: LIVE → ANSWER, "typechecks unchanged". Verify: AMENDED—that clause is
OVERTURNED by compilation. Driver: ANSWER with the type delta stated.

**Open items.** None.

### R-14 · the BG-6 display-token ask, withdrawn as stale—LIVE → ANSWER

**7.0.0 consequence.** The re-point is available at their pin and survives their bump untouched:
`--font-display-weight: 600`, `--type-weight-display: var(--font-display-weight)` and
`--type-tracking-display: -0.015em` ship byte-identically at 7/8/9 from
`styles/typography/scale.css` and `styles/tokens/scheme-motion.css`, both plain unlayered `:root`,
with identical read counts (1 / 9 / 11, in the order named, at all three cuts)—so the re-point bites
rather than merely resolving, and their own `:root` wins by order.

**Grounds.** The withdrawal is correct and staler than they claim. The caveat we owe: all three
names measure ZERO occurrences in `dist/glass-ui.css`, so they reach a consumer through
`@mkbabb/glass-ui/styles` (index.css → typography.css → typography/scale.css) and not through
`styles.css`; a bundle-only import makes the two re-points resolve to nothing SILENTLY—the eight
selectors go quiet rather than wrong. The reply ASKS them to confirm the entry (a fact in their
tree), or to spell our shipped values as `var()` fallbacks at the use site
(`var(--type-weight-display, 600)`, `var(--type-tracking-display, -0.015em)`). Their three stale
comments (`SquareInstrument.vue:255-262`, AnimatedText's, EditorStartScreen's) are false against
every published major.

**Seats.** Investigate: LIVE → ANSWER, the `./styles` entry condition found. Verify: UPHELD, with
the read counts added. Driver: ANSWER.

**Open items.** One of the two §4 asks of them is this confirmation.

### R-15 · the demo mints `--specular`/`--shade`—NOT-APPLICABLE → ANSWER

**7.0.0 consequence.** No collision at their pin or anywhere else; the mint stands.

**Grounds.** Bare `--specular` and bare `--shade` are 0 across the 7.0.0, 8.0.0 and 9.0.0 dists,
0 in `src/` at HEAD, 0 in DESIGN.md (including the Plate register at :519, which claims only the
`--glass-veil`/`-bg`/`-blur`/`-border`/`-shadow` families plus `--z-*`), and 0 in
`docs/tranches/BK` outside their own letter. Our specular COLOUR register is `--glass-*` prefixed
(`--glass-specular`, `-core`, `-disc`, `-size`, `-intensity-{rest,hover,active}`); the positional
registers are `--specular-x`/`-y`/`-intensity`. Their four positional counts reproduce to the unit
over the whole 7.0.0 dist (9 / 8 / 11 / 7).

**Answer, plus one unasked flag they need.** `--specular-angle` is `@property`-registered at 7.0.0
(`styles/tokens/property-regs.css`) and GONE at 9.0.0—0 occurrences dist-wide, 0 at HEAD, no
MIGRATION row—while `-x`/`-y`/`-intensity` survive and stay registered. Their positional family is
three names at the bump, not four; any reader of the angle channel dies then, not now. If we ever
intend the bare names we say so before taking them.

**Seats.** Investigate: NOT-APPLICABLE → ANSWER. Verify: UPHELD, with a methodological correction
to the BK count (nine occurrences over three lines). Driver: ANSWER, and the removal goes INTO the
reply line rather than only into our queue.

**Open items.** Ours is R-15-RIDER.

### R-15-RIDER · a registered `@property` name removed with no MIGRATION row—LIVE → CURE-NOW (docs)

**7.0.0 consequence.** None at their pin.

**Grounds.** `--specular-angle` is registered at 7.0.0 and absent at 9.0.0 with no removal row.
Registered `@property` names are published names.

**Cure (at HEAD, docs).** A MIGRATION removal-table row under the major that shipped without it—
the lane MEASURES 8.0.0 against 9.0.0 from the dists first—riding B-3's manifest as a second
class. No roster impact: the roster pins `@theme` and `@utility` names.

**Seats.** Raised by the investigate seat, upheld on the verifier's re-count. Driver: CURE-NOW,
Lane M.

**Open items.** None.

### R-16 · the bare focus-plate variant and a radius-neutral `.focus-ring`—DEAD → ANSWER

**7.0.0 consequence.** Both asks are already shipped and their bump collects them; at the pin
itself they should NOT adopt `.focus-ring` on a rectangular host. The 7.0.0 line to write instead
is `:focus-visible { outline: var(--focus-ring-width) solid color-mix(in oklab, var(--foreground)
48%, transparent); outline-offset: 2px; }`—the literal 48% because `--ink-perimeter` does not
exist until 8.0.0, where it is 0.48. It computes the same oklab as the shipped 8/9 declaration,
but it changes the ring's HUE (accent at 30% → neutral `--foreground` at 48%), which the reply
names so that a correct transcription is not filed later as a colour regression; it is also why it
measures 3.0:1 against the retired ring's 1.91:1.

**Grounds.** (a) Since 8.0.0 `.focus-ring:focus-visible` is one `outline` plus `outline-offset:
2px`—no `outline: none`, no `box-shadow`, no `border-radius`; the `--radius-pill` write was
removed for exactly their reason (`src/styles/utilities/base.css:130-135`, "a focus indicator may
not restate the element's shape"). Paint-measured, not asserted: the 7.0.0 rule takes a 6px host
to 9999px on focus; the 8/9 rule leaves 6px with the outline tracking the corner. Bytes: both
files 3104 B, the selector at byte 960 at 8.0.0 AND 9.0.0. Measurement correction for them: their
`a11y-overrides.css` byte 708 is the forced-colors sweep and carries no `border-radius` in any
version—`--radius-pill` was bound at ONE site, not two. (b) No bare `field-control` variant,
because the control went bare: `.field-control:focus-visible` moved from `box-shadow:
var(--focus-ring-shadow); outline: none` to `outline: var(--focus-ring-width) solid
var(--field-control-ink); outline-offset: 2px` plus `--control-edge-ring` (`glass-ui.css` byte
6045, byte-identical 8↔9), so the box-shadow channel is theirs again. No `.focus-ring-bare` is
minted—an alias for a utility that is already radius-neutral, against the no-shims law. The
compose-not-erase affordance is `styles/glass/control-edge.css`: `.glass-control-edge{box-shadow:
var(--glass-rim-top), var(--glass-rim-bottom), var(--control-edge-inner, 0 0 #0000),
var(--control-edge-ring, 0 0 #0000)}` in `@layer components`—fill a slot instead of erasing one.
`--focus-ring-shadow` survives at 9.0.0 (15 references).

**Seats.** Investigate: DEAD → ANSWER, right answer, no browser. Verify: AMENDED on four points,
the load-bearing ones being the rendered radius proof and the hue delta. Driver: ANSWER.

**Open items.** A ledger note, not a reply line: at 9.0.0 the forced-colors sweep gained
`.menu__trigger:focus-visible`, absent at 7.0.0.

### R-16-RIDER · the 8.0.0 focus reshape has no MIGRATION row—LIVE → CURE-NOW (docs)

**7.0.0 consequence.** None; ours.

**Grounds.** MIGRATION.md `## 8.0.0` records neither the `.focus-ring` `--radius-pill` removal nor
`.field-control`'s move off `box-shadow` (`70dc0f06`). Both are visible breaks for a consumer that
relied on the pill geometry or read `--focus-ring-shadow` as the control's paint.

**Cure (at HEAD, docs).** ONE `_Focus_` block under `## 8.0.0` covering both classes, in the
section's own table form, with the file's dated-bracket convention for a late row.

**Seats.** Raised by the investigate seat; the verifier fixed its shape to one block. Driver:
CURE-NOW, Lane M.

**Open items.** None.

### R-S2 · the §2 negative space—PARTIAL → ANSWER

**7.0.0 consequence.** Five of six items are recorded exactly and nothing disposed is re-opened.
Item 6 is a mis-read, and one planning fact changes at both ends.

**Grounds.** Verified as they state them: A-13 is DECLINE and it stands (O-20 LEDGER:341-363);
A-14 is CURE-NOW and landed at `a314533a`, with README (the "Design Tokens" section) now saying
bridge names are not tokens and that overriding one does nothing—so their interim of reading
`--glass-shadow-quiet`/`-resting` is precisely what the cure prescribes; A-7/A-4/A-3 are carried
correctly; KF-KE-30's demo half is theirs; SpringTrace C-3 was never in I-32. ITEM 6 IS THE
MIS-READ: `/timeline` is A-8 alone. A-9 is TooltipContent's block ceiling, and the two 9.0.0
`--reka-popper-available-height` readers are `[data-reveal="menu"]` and
`[data-slot="select-content"]`—`.glass-overlay-plate[data-reveal="tooltip"]` has NO ceiling at
9.0.0; the tooltip arm exists only at HEAD (`src/styles/glass/overlay-plate.css:111/:118`). So
KF.W7 should evaluate `/timeline` (A-8) alone, and every `<TooltipContent>` inherits the ceiling at
the cut after 9.0.0. The A-14 line likewise reads "landed at HEAD (`a314533a`), not in the 9.0.0
tarball", whose README still carries the old sentence.

**Answer.** Sent as five confirmations plus the item-6 correction, with README cited by section
("Design Tokens") and never by line number.

**Seats.** Investigate: item-by-item verification sound, with two real catches. Verify: its
correction to item 6 was itself OVERTURNED on the bytes; the corrected correction is the one sent.
Driver: ANSWER.

**Open items.** The A-13 rider is STRUCK: their RETAINED-BY-POLICY, with the policy written at
`design-idioms.css:9-11`, IS the "own the gradient" arm of the ruling; the file is closed on both
sides and this is a ledger note only, not restated in the reply.

### O-26-INT-1 · the engagement envelope survives a mid-session PRM turn-on—LIVE → CURE-NOW

**Ours, internal; not in the letter and not in the reply.**

**Grounds.** `reset()` holds a previously-raised engagement envelope by design
(`usePointerVelocityField.ts:273-276`) while `tick()` early-returns under PRM before the envelope
is advanced (:322-324, :365-369). So a mid-session PRM turn-on with the cursor engaged leaves the
envelope frozen NON-ZERO—the cursor glow stays on screen instead of decaying to rest. Surfaced by
the aurora verifier while checking R-6's bit-identity claim.

**Cure (at HEAD).** On the reducedMotion transition, zero the envelope: the one static PRM frame
must be the rest frame. Born-RED witness in the existing pointer-velocity-field test. Rides the
R-6 lane.

**Seats.** Raised in the verify seat's `missed` set. Driver: CURE-NOW, Lane A.

**Open items.** None.

## §D—the cure wave that follows

Quartet per lane (Opus implement → 2 ASSUME-WRONG challengers → Fable adjudicator), ≤3 concurrent,
disjoint file fences, driver commits by pathspec.

| lane | rows it carries | shape |
| --- | --- | --- |
| K · keyboard | R-8 (KSM R-1 + R-8 + R-16 + R-17) | `suspendShortcuts()` + `formatComboLabel()` + the `LabeledShortcut` narrowing + the `defaultPrevented` guard + in-house enrolment of the modal overlays (measured by reka contract) + the two docblock contracts (ordering; the unfiltered help list) + a MIGRATION bracket for the behaviour change + witnesses in the existing keyboard tests (barrier, FIFO held, label form, the esc-stack story exercised) |
| A · aurora | R-4, R-5, R-6, R-6-LIGHT (a)(b), O-26-INT-1 | `AuroraConfig.alpha` JSDoc; the custom-property routing plus the two media arms in `Aurora.vue`'s scoped block (the verifier's measured shape); three wake guards plus the `update()` comment; `AuroraAtomsBase.seed` JSDoc; the `light` JSDoc and the `isAuroraPointerEnabled` impasto term (measure which media carry impasto first); the envelope reset on the PRM transition; witnesses in the existing aurora/a11y/pointer-field tests, the implement seat naming the files |
| B · boolean cast | R-3 | Collapsible `open: undefined`; Chip `modelValue: undefined` ONLY; LabeledSwitch `modelValue: undefined` plus `modelValue?: boolean`; witnesses including the Chip `aria-pressed` guard and the emitted-chunk assertion |
| M · manifest + docs | R-7-RIDER, R-10-RIDER, R-11-RIDER, R-12 doc arm, R-15-RIDER, R-16-RIDER, the A-3-CLASS scope note | every MIGRATION addition follows the file's own dated-bracket convention for late rows and sits under the major that shipped it (the lane MEASURES 8.0.0 against 9.0.0 from the dists where the ruling says so); README/DESIGN/design-idioms edits as ruled; the `docs/consumer-evidence/header-ribbon.md` dated deletion bracket; the O-20 LEDGER A-3-CLASS scope note (the SFC half plus the consumer-readable manifest) |

Discipline, every lane: born-RED witnesses on bytes; gates exactly 60; nothing minted;
`.published-roster` untouched (no `@theme`/`@utility` departs); `.bundle-ratchet` rebound only if
dist bytes move (Lanes A/B/K move dist → one deliberate rebind at the close, on the committed-tree
datum); shared-tree discipline, no seat commits, driver commits by pathspec; no masking fallbacks.

## Register

- **CURE-NEXT-MAJOR (rulings, not executed).** R-6-LIGHT (c), the atoms-door union narrowing.
  A-3-CLASS, standing from O-20, which is where R-1's label half lives.
- **Open design item.** Whether `text-caption`'s italic on running prose is retired at 10.0.0—a
  typography wave's decision, registered here and promised to nobody.
- **Owner-reserved, register only.** MIGRATION.md joining `files` (every "we documented it"
  answer is unreachable at any consumer's pin by construction); the A-3-CLASS 10.0.0 cut; the
  CURE-NEXT-MAJOR rulings; any publish.

## Tally

| disposition | rows |
| --- | --- |
| CURE-NOW | R-3 · R-4 (doc) · R-5 · R-6 · R-6-LIGHT (a, b) · R-7-RIDER · R-8 · R-10-RIDER · R-11-RIDER · R-12 (doc arm) · R-15-RIDER · R-16-RIDER · O-26-INT-1 (13) |
| ANSWER | R-1 · R-2 · R-4 (answer half) · R-7 · R-9 · R-10 · R-11 · R-12 · R-13 · R-14 · R-15 · R-16 · R-S2 (13) |
| DECLINE | R-4 (hide-on-arm) · R-6 (the non-throwing atoms bridge) · R-9 (a `ChipGroup`; the Chip-in-ToggleGroup-context arm) · R-10 (restoring the blanket `--glass-cell-backdrop-filter`) (5 limbs across 4 rows) |
| CURE-NEXT-MAJOR | R-6-LIGHT (c) · A-3-CLASS (standing, carries R-1's label half) (2) |
| KILL · ROUTE | none |

| state at 9.0.0 | rows |
| --- | --- |
| LIVE | R-4 · R-5 · R-6 · R-6-LIGHT · R-7-RIDER · R-8 · R-9 · R-10-RIDER · R-11-RIDER · R-12 · R-13 · R-14 · R-15-RIDER · R-16-RIDER · O-26-INT-1 (15) |
| PARTIAL | R-1 · R-3 · R-10 · R-S2 (4) |
| DEAD | R-2 · R-7 · R-11 · R-16 (4) |
| NOT-APPLICABLE | R-15 (1) |
| MOVED | none |

Twenty-four rows, every letter row answered by id, nothing disposed re-opened. Nothing in the
CURE-NOW set removes or renames a published export, class, token or subpath. Four cures change
computed paint on purpose and each states it: R-5 (the aurora a11y arms, which bite only where
`opacityCeiling < 1`), R-6 and O-26-INT-1 (what the PRM frame holds), R-3 (an uncontrolled Chip or
Collapsible seeded by `:default-*` now paints ON), R-6-LIGHT (b) (a pointer path that could not
paint stops arming). Every CURE-NOW lands at HEAD and reaches this consumer at the cut after 9.0.0,
then at their bump.

