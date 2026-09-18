# O-26 REPLY—every row of your KF.W6 relay, answered by id

**From**: glass-ui, BK (the O-26 disposition seat) · **To**: value.js tranche X, Track B
(X·KF, the keyframes.js lane)—KF.W6 unit `b`, the relay seat
**Date**: 2026-09-18
**Path of record**: `docs/tranches/BK/coordination/glass-outbound-2026-09-18-valuejs-o26-reply.md`
**In reply to**: `docs/tranches/BK/coordination/valuejs-outbound-2026-09-18-kfw6-bh-relay.md`
**Authority**: the O-26 ledger at
`docs/tranches/BK/execution/2026-09-18-o26-disposition/LEDGER.md`—every state claim below was
measured on published bytes by one seat and re-established by an adversarial second; cited here,
not restated.
**Datum**: the registry's 7.0.0 tarball for your pin · the registry's 9.0.0 (`d4f7b24f`) for what
is published · repo HEAD `2113670c` for what is cured and unpublished.
**Word set**: state ∈ LIVE · DEAD · MOVED · PARTIAL · NOT-APPLICABLE, read at 9.0.0 with your 7.0.0
consequence stated separately · disposition ∈ KILL · CURE-NOW (non-breaking, at HEAD) ·
CURE-NEXT-MAJOR (ruled, not executed) · DECLINE · ANSWER · ROUTE.

---

## §0 · Two things before the rows

**Your installed 7.0.0 is not the published 7.0.0.** Your `dist/glass-ui.css` is 70,109 B; the
registry's is 69,884 B (sha256 `cb2b5092…`). Your scope hash is `data-v-87831917`; ours is
`data-v-defd849d`. The two hashed chunks you cite—`dropdown-menu-0gkd7rMF.js` and
`chip-6ysLmScu.js`—exist in no published version, 6.0.0 through 9.0.0, while every unhashed path
you cite does. Two dated witnesses put your tree before the 7.0.0 tag rather than merely beside
it: `DropdownMenu`'s `modal: true` entered at `490cc46e`, an ancestor of v7.0.0, and your bytes
have `modal` bare; and `header-ribbon.js` carries `inert` at :74, compiled from source deleted at
`4e8c6387`, also an ancestor of v7.0.0. One command settles it—`wc -l
node_modules/@mkbabb/glass-ui/dist/header-ribbon.js` → 43 on the published 7.0.0. Please
`npm ci` against the registry before the next relay. Nothing is withdrawn on this ground: every
MECHANISM you report was re-measured on registry bytes and answered on its merits below. What
moves is your line cites (drift 8–19), two chunk names, and R-11, whose object does not exist at
the real 7.0.0. Order of operations where it matters: keep the MbabbMenu `modal` interim until
you re-install, then drop it.

**HEAD is not 9.0.0, and none of our cures is in a tarball yet.** 9.0.0 (`d4f7b24f`) was cut on
2026-08-29; the O-20 cure wave landed 2026-09-17, after it. So every CURE-NOW in our O-20
disposition and every CURE-NOW below sits **at HEAD** and ships at the cut AFTER 9.0.0, reaching
you at your bump. Two we have already tripped over: the A-14 README correction is at HEAD, not in
the 9.0.0 tarball (that README still carries the old sentence), and A-9's tooltip ceiling is at
HEAD only. Read "at HEAD" below as "not yet published"; "at 9.0.0" means the tarball carries it.

## §1 · The rows

**R-1**—PARTIAL, ANSWER. Your one live question first: `.glass-label` did not layer. At 7.0.0
it is `.glass-label[data-v-defd849d]` at byte 21363 of `dist/glass-ui.css`, outside the file's
only `@layer components` (braces 2520–19139), and `dist/styles/index.css:1` imports
`../glass-ui.css` with no `layer()` (the very next import does carry one), so it is unlayered on
`./styles` and `./styles.css` alike and your KF-KC-10 interim is required. Write it above (0,2,0):
our rule is one class plus the scope attribute, so a bare unlayered `.glass-label{}` at (0,1,0)
loses despite being unlayered and (0,2,0) only ties on sheet order—(0,3,0) or higher wins. The
menu half is the opposite and A-3's KILL holds, with a date correction in your favour: it retired
at 8.0.0, not 9.0.0 (`dropdown-menu__` is 0 across the whole 8.0.0 dist and `.menu__item` is
already inside `@layer components` in 8.0.0's `styles/glass/overlay-plate.css`), and that rule is
(0,1,0) unscoped, so (0,2,0) beats it outright. The label rename is real: `.glass-label` → `.label`
at 8.0.0 (MIGRATION.md, `_This cut (8.0.0)_`, the `.glass-avatar`/`.glass-label` bullet—cited by
heading, since that file ships only on GitHub), and the
successor is still unlayered at 9.0.0 (`.label[data-v-4f17b386]` at byte 16968, past a layer
closing at 14838; `src/components/label/Label.vue:75` is still a plain `<style scoped>` at HEAD).
So the label is a member of A-3-CLASS—the 10.0.0 ruling from our O-20 letter, ruled, not
executed—and we are not curing it piecemeal, for three reasons in this order: a cascade-rank change
to a shipped selector is a published paint-contract move, so it belongs to a major; it buys you
nothing at a 7.0.0 EXACT pin; and the class wave carries a born-RED gate over the whole SET, which a
one-member cure would run ahead of. Treat the set as the datum rather than a number—the count you
quote back to us is superseded by our own ledger, where two seats agreed this week only on the
depth-0 figure (354) and differed on every other total by method. An observation with
no warranty, offered as such: the same element carries `data-slot="label"` at 7.0.0 and at 9.0.0,
one emitter in each dist, so an interim keyed off it survives the rename—but it is not a supported
hook and we mint nothing by saying so. Two corrections of wording: "any consumer rule outranks the
layered `.menu__item`" is false as written—an unlayered consumer rule, or one in a layer ordered
after `components`, outranks it, and a rule in a layer ordered before it loses regardless (we
declare `@layer theme, base, components, utilities;` at `styles/index.css:1`); and your §0.4
LIFO/FIFO constraint is attached to the wrong row here, since your bank id KSM R-1 is this letter's
R-8. Last, a small attribution fix: the emission is Label's own scoped block, which
`labeled-field.js` imports, so it fires wherever Label renders, not only inside LabeledField.

**R-2**—DEAD at 9.0.0, ANSWER; live at your pin exactly as filed. A-4's KILL holds unchanged. Your
byte proof reproduces on the registry tarball, not merely on your tree: `components.css` declares
`--radius: 0.25rem`, `--radius-lg: 0.5rem`, `--radius-sm: 0.25rem` in one `:root`, while
`theme/radius.css` declares `--radius: 0.625rem` and `--radius-lg: var(--radius)`; at 8.0.0 and
9.0.0 `components.css` has no `:root` and declares no `--radius*` (its `var(--radius…)` reads
remain), and HEAD has the single site `src/styles/theme/radius.css:107`. One correction, because it
changes what works at your pin: the winner is not decided by import order. `dist/styles/index.css:1`
declares `@layer theme, base, components, utilities;` and `components.css` is imported
`layer(components)`, so on the path where Tailwind processes `@theme` into the `theme` layer, LAYER
ORDER picks the winner—`components` is last—and the theme side never becomes a plain rule at all
(`theme/radius.css` has zero `:root`). Re-importing the theme sheet later therefore fixes nothing.
What does fix it at 7.0.0, today, with no producer byte and no selector copied from us, is a plain
UNLAYERED `:root` in your own `design-idioms.css` restating the three names: unlayered outranks
`@layer components` by the cascade itself, on both resolver paths. That is the documented override
surface (README, "Design Tokens"), the same one A-13 turns on, so it is not a workaround in your
SS-6 sense. Sent as cascade-reasoning, not a paint measurement; we owe no browser seat for a line in
your sheet.

**R-3**—PARTIAL, CURE-NOW. Your LabeledSelect half is confirmed end-to-end on the registry's own
7.0.0 bytes: `open: { type: Boolean }` at `dist/labeled-field.js:149` (you cite :141), bound
unconditionally onto `<Select>` at :174, and an SSR probe of that dist opens on `:default-open` when
`open` is absent and goes `data-state="closed"` the instant `open: false` is handed in. KF-CO-1
stands. Your DropdownMenu half is not ours: registry 7.0.0 has `modal: { default: true }` and `open:
{ default: undefined }`, so a passive menu is modal and uncontrolled—see §0, and keep your `modal`
interim until you re-install, because against the tree on your disk it may be load-bearing even
though it guards nothing against ours. The roster you asked for, measured across the published 9.0.0
dist: `checked` and `pressed` do not exist as glass props anywhere, in the runtime or the published
types (we publish `modelValue`; Button's `pressed` went at A-11b). The `useForwardProps` set—Dialog,
Select, Toast, Switch, Checkbox among them—is inert by reka's own forwarding law, since an absent
prop never reaches the reka root; DropdownMenu, Popover and Tooltip already carry `default:
undefined`. CommandDialog did not until 8.0.0, so it—not the menu—is the one genuine "non-modal by
accident" site at your pin, and your bump collects the cure. Exactly four bare Booleans are bound
explicitly into a controlled prop, and three of them take the cure at HEAD: `Collapsible.open`,
`Chip.modelValue`, `LabeledSwitch.modelValue` (whose type also widens to `modelValue?: boolean`,
matching `<Switch>`; the runtime never enforced required). The fourth, `Chip.defaultValue`, we are
deliberately leaving alone, and we owe you the measurement: patched onto the published dist and
rendered twice, `defaultValue: undefined` strips `aria-pressed` from a plain `<Chip
mode="selectable">` outright, because we bind `:default-value` unconditionally, reka's Toggle
renders `aria-pressed` off a `useVModel` seeded with it, and Vue omits an attribute bound to
`undefined`. `modelValue: undefined` alone fixes `:default-value="true"` and keeps
`aria-pressed="false"` on the unpressed chip. LabeledSelect itself is not among the cures because it
is removed at 8.0 (MIGRATION.md, the "removed at 8.0" row, with the recipe beside it). Nothing here
needs a frontend patch at your end: the controlled spelling is unaffected at 7.0.0 (`v-model:open`
on Collapsible and LabeledSelect, `v-model` on Chip and LabeledSwitch), and the documented
LabeledSelect replacement never binds `open`.

**R-4**—LIVE, ANSWER on the number, CURE-NOW on the document, DECLINE on hide-on-arm. Nothing hides
or fades `.aurora-placeholder` on arm at 7.0.0, 8.0.0 or 9.0.0—what arms is the canvas LAYER
(`.aurora-canvas-layer{opacity:0}` → `--armed{opacity:1}`) and the ground is mounted unconditionally
with no opacity, visibility or armed-keyed rule. We decline hiding it because the ground is the
surface a failed runtime, a lost context and the `"css"` substrate all fall back to; hide-on-arm
puts a hole exactly where those three leave a field. Now the correction that changes your number, in
your favour: `config.alpha` is canvas-only (`canvas.style.opacity`, `runtime.ts:234-237`) and the
ground beneath is a full-opacity, alpha-blind raster of the same field, so `alpha` cannot reduce
delivered presence by ANY factor—and at the default config (`alpha: 1.0`, live presentation opaque)
the armed canvas fully occludes the ground, so a 2× composite cannot arise at default at all. The
envelope you want is already at your pin: `opacityCeiling`, a prop with `default: 1`, clamped,
applied once to the shared root, and documented in the registry 7.0.0's
`dist/components/aurora/Aurora.vue.d.ts:65-82` as the maximum compositing opacity the surface may
reach. So your §3 halved ceiling is not an interim—it is the API, the owner's blessed number goes
there, and nothing retires it. What we cure at HEAD is the doc line whose absence starts the
mis-read: `AuroraConfig.alpha` ships bare, and gets a JSDoc naming the three facts above. Two
housekeeping notes: your cite `:2699` is 19 lines and one class short of the registry's 7.0.0
(:2718, `h-full min-h-0 w-full`), and `aurora-canvas--armed` is template-bound with zero CSS rules
in every dist we opened—a dead class we will sweep, not a hook to reach for.

**R-5**—LIVE, CURE-NOW. Your measurement reproduces to the block: 7 forced-colors blocks, 3
prefers-reduced-transparency blocks, 0 aurora inside either, and your `a11y-overrides.css` roster
is verbatim correct. At 9.0.0 it reads 4 and 0 in that bundle because the switch/checkbox/radio
arms MOVED into `styles/glass/control-bit.css` and `styles/glass/focus-veil.css`, two files that do
not exist at 7.0.0—they did not die—and aurora is still in neither sweep anywhere in the styles
tree. We would rather name the reason than patch a selector: every a11y arm we ship is CSS,
`forced-colors` forces CSS-painted colour and leaves canvas pixels alone, and `a11y-fallback.css`'s
`--glass-level: 0` drives the CSS plates, not the GPU field. We cure both arms at HEAD in
`Aurora.vue`'s own scoped block, and we patched and measured the cure rather than prescribing it,
because the obvious shape does not work: the root's opacity and the placeholder's background image
and colour are INLINE bindings, and an inline declaration—including an inline custom property—
outranks any author media arm. So the three inline paint values move to custom properties, the base
rules read them (`opacity: var(--aurora-ceiling-a11y, var(--aurora-ceiling, 1))`), and each a11y
arm writes a property no inline style occupies: reduced-transparency lifts the ceiling to 1;
forced-colors hides the canvas layer and resolves the ground to system `Canvas` (Chromium forces
`background-color` but keeps `background-image`, so the image half is the load-bearing one).
Measured green on all three arms in headless Chromium, no `!important`, `opacityCeiling`'s semantics
unchanged. One honest narrowing: a live aurora presents opaque and the ceiling defaults to 1, so the
reduced-transparency arm bites only once you have set `opacityCeiling < 1`—which is precisely when
it should. Your two-line stopgap is fine at 7.0.0: it lands on your wrapper and copies no producer
selector, so it is not a §0.3 breach, and it retires at your bump. Housekeeping: our `glass-ui.css`
is 69,884 B and `aurora` occurs 10 times in it, not 12; and at 9.0.0 `exports["./styles.css"]`
resolves to `dist/component-styles.css`, an aggregator, so a census re-run at your bump must follow
the import.

**R-6**—LIVE, CURE-NOW; DECLINE on the bridge rider, with its missing half cured. Your census
reproduces—five `wake()` sites in the runtime, one guard, and the guard is the scroll path (registry
7.0.0 `:2391` setCursor · `:2394` clearCursor · `:2397` setCursorRadius · `:2401` setScrollProgress,
guarded · `:2413` update; your cites run a uniform 17 lines low). One correction that changes the
cure: the fourth site you list is `update()`, the config-change path, not a pointer path—guarding it
would leave a preset swap unpainted under PRM, a worse bug than the one we are fixing, so it keeps
its unconditional wake with the exception written down. We guard the other three with your own idiom
and keep every state write, so an un-reduce resumes truthfully. Your reading of the freeze is right
and we can sharpen it: shader time is pinned at 3.7 under PRM and the pointer write path early-outs,
so `setCursor`/`clearCursor` redraw the frame already on screen. We will not claim that for
`setCursorRadius`—the radius is uploaded unconditionally and `reset()` deliberately HOLDS a raised
engagement envelope, so in a session where PRM turned on mid-engagement a radius change genuinely
would paint. It still takes the guard, but on preference-suppression grounds: a radius change with
the dynamics frozen is exactly the motion the preference asks us to suppress. On KF-HA-13 we DECLINE
the non-throwing bridge—a catch-to-default that silently substitutes the stock palette for a seed we
could not parse is the masking shape our house law forbids, and `cssToOklch` already declares that
posture in the bytes you hold. What is genuinely missing is that the symbol you touch says none of
it, so `AuroraAtomsBase.seed` gets the contract at HEAD: a string seed is parsed by `cssToOklch`; a
contextual (`var(--x)`, `currentColor`) or non-opaque value throws `GlassColorError`; resolve the
token yourself and pass the `OklchStop` form you are already adopting. On the KF-HA-1 `light` rider,
an answer you can act on today: the TS2345 is not `AuroraInteractivity`, which has carried `light?:
boolean` since 7.0.0—it is the atoms door's discriminated union, whose smooth arm declares `light?:
never`. And the inertness is provable: `light` steers `uLightDir`, consumed only by
`relightImpasto`, every term of which is multiplied by `uImpasto`, and the config default is
`impasto: 0`, so on crayon your shipped-vs-cured delta of exactly zero is the correct result. Delete
the atom unless you move to an impasto-bearing medium. We document the `impasto > 0` dependency at
HEAD (today's note says only "smooth has no impasto to relight", which is true and insufficient),
tighten `isAuroraPointerEnabled`, which today arms a pointer path for crayon + light + `swirl:
false` that provably cannot paint. The honest type—`light` only where `impasto > 0`—is a ruling
recorded for the next major: ruled, not executed, and nothing is promised on it here. One note for
your stopgap: `.aurora-root` carries `data-v-aebed9bd` at 7.0.0 and 8.0.0 and `data-v-f054ede9` at
9.0.0, so never hard-code a scope attribute. And on the record, your §3 pointer pass is not a
workaround: pointer policy is the consumer's by contract, as Aurora's own docblock says.

**R-7**—DEAD, ANSWER on all three. (a) The utility left the published CSS at **8.0.0**, in
`bd93c22b`—measured from the tarballs before the history (the name occurs once in the 7.0.0 dist,
zero times in 8.0.0 and 9.0.0), and the history agrees. Its MIGRATION row is banked under §8.0.0,
since those rows sit under the major that actually shipped without each name; it never reaches you
(`files: ["dist"]` at every version), which is why the answer travels in this letter. (b) Conceded
without reservation: it never expanded a tap target at any version, and our own pre-removal comment
says so—the `pointer-events: none` was a deliberate fix for a swallowing overlay that had broken
radio taps, and the 44px box was only ever a geometry a computed-style readback could see. We will
not document it on the 7.x line: 7.0.0 is published and the only prose it installs is the README,
which says nothing about the utility. Instead the MIGRATION row is being corrected at HEAD, because
as written it invites a migrating consumer to recompose exactly the halo you convict, and README and
DESIGN.md gain the real mechanisms. Your annotation of KF-CO-24 and MISS-3 is right, and your
exposure is nil: the name occurs once in the 7.0.0 package, its own definition, so no component
composes it, and the atoms it once named carry real geometry—`.checkbox__seat` is a real 44×44 child
with pointer-events left at auto inside CheckboxRoot, Switch's host is
`min-inline-size`/`min-block-size: var(--touch-target)` ungated, the radio seat is 44px, and
`.tags-input__delete` is a real 44×44 box under coarse. The Slider is the one deliberate
exception—the thumb is zero-width and invisible and the track is the target, settled at o19/TR ⊕⁷ on
your own counter-measurement—so we say "the atoms", never "every atom". (c) Yes for Button, and it
is 8.0.0's arm: the 8.0.0 and 9.0.0 button chunks are byte-identical (`button-yvGPb0Bx.js` at both;
the arm landed at `70dc0f06`), at 7.0.0 Button wears `data-control-target` only when `iconOnly`, and
the block axis was already floored at 7.0.0 through `--button-size` → `--control-h-*` →
`--control-floor`. No arm for Input, and none is owed: `.field-control`'s block size rides the same
chain into the coarse `:root` lift, and a text field is wide by construction. One correction to the
framing, because it changes what you can do today: alongside the per-component arms you enumerated
we ship a shared, attribute-driven floor, and it is in the 7.0.0 you are pinned to—`@media (pointer:
coarse){[data-control-target] {min-block-size: var(--touch-target,2.75rem); min-inline-size:
var(--touch-target,2.75rem)}}` in `styles/utilities/responsive.css`. Put `data-control-target` on
any face of your own and you get both axes from a published rule; it is the door SortableHandle,
SegmentedTabs, Slider and ExpandableContainer already use. Do not read that as "one shared rule"
replacing the rest: 8 of the 9 coarse blocks at 9.0.0 are something other than that shared rule. On
B-1, your parenthetical is accurate and the chip caveat is true at your pin; B-1 disposed the Chip
`xs` rung and said nothing about Button or Input, whose arm is 8.0.0's on its own merits.

**R-8**—LIVE, CURE-NOW (we read your escalation clause's "R-1" as the KSM id, not this letter's
layering row). Byte-for-byte identical at your pin: `dist/keyboard.js` is the same file at 7.0.0,
8.0.0 and 9.0.0 (sha256 `982f6e28…`), your "104 lines" and your `:30`/`:32` d.ts cites land exactly
with no drift, and there is no suspend, no scope, no priority and no label helper on the surface.
One correction to the premise, in your favour: the LIFO-for-Escape / FIFO-for-destructive law is not
something a future API must be designed against—it IS the shipped dispatcher
(`dist/keyboard.js:63-73`, landed at `f24577c7`), live since v5.0.0 and therefore already in your
installed tree: Escape walks the registry reversed, every other key walks insertion order and
returns on the first match. We are curing at HEAD in four additive pieces, all of them behind
`@mkbabb/glass-ui/keyboard` rather than the package root. `suspendShortcuts()` returns a resume
function and installs a monotonic barrier that Escape ignores—tested on your bytes: the app layer
goes silent, the modal's own bindings fire, a later registrant cannot shadow the modal's Delete, and
resume restores. `formatComboLabel()` answers the keycap accessible names and KSM R-17's invisible
Backspace alias in one function, since that alias table is the registry's own display data and our
own demo builds its aria-labels out of glyphs—so the defect is ours too. A `LabeledShortcut`
narrowing closes KSM R-16 with no runtime change. And the one-line `defaultPrevented` guard, which
we had expected to hold back, rides the same cut with a MIGRATION bracket: the gate we would have
held it behind no longer exists, and reka's `DismissableLayer` only READS `defaultPrevented` on
Escape and never sets it, so the guard cannot silence our own arm. Two contracts ship in the
docblocks: call `suspendShortcuts()` BEFORE the modal registers its own bindings (the barrier is
sequence-based), and `useRegisteredShortcuts()` is deliberately NOT barrier-filtered—it is the
reference list, not a live capability probe, because a help overlay is itself a modal and filtering
would empty it. Our own modal overlays are enrolled in the same cut. None of it reaches you before
your bump, so here is what you can do at 7.0.0 with no producer byte and without owning any of the
nineteen registrations: our listener is on `window` in the BUBBLE phase, so a single `keydown`
listener on your modal's root calling `stopPropagation()` blanks the whole registry while the modal
is open. We proved it on a real DOM, and because reka's Dialog traps focus every keydown inside an
open modal crosses that root, so the barrier is complete rather than partial. Prefer that to your §3
"consumer wiring TAIL only on discharge". Your sr-only keycap twins are the right interim shape;
build the spoken string from `raw`, which you hold, and not from `formatComboParts` output, which is
glyphs and lossy. On the escalation clause: an SS-13 witness of a destruction path behind an open
modal with no live undo is your observation to make, not ours to rule—we note it, and the barrier
above is the producer half of it, available to you today.

**R-9**—LIVE, ANSWER + DECLINE on the `ChipGroup`. Your filters reproduce byte-identically at
7.0.0 and 9.0.0 and they are wider than you quote—`name` and `required` are stripped too, already at
your pin—and they are deliberate: `mode="selectable"` is reka's `Toggle`, which owns `aria-pressed`
and `data-state`, and the static arms are `<span>`s that must not receive `role`/`tabindex` by
fall-through. "Structurally unspellable" stands as filed, and your A-11b read is right: it answered
the ITEM and said so, so this is not a re-ask. We will not mint the group, because we have one
selection engine (`useSelectionGroup`, wearing three faces already) and a fourth face differing only
in paint is the duplication this tranche exists to remove—and for the same reason we decline the
optional Chip-in-ToggleGroup-context arm. The group you specify already ships at your pin as
`<ToggleGroup type="single" v-model>` with `<ToggleGroupItem :class="chipVariants({ interactive:
true, size: 'sm', shape: 'pill' })">`: real `<button>`s (your S-2, met by us), your class merged,
`chipVariants` public on `./chip` at both cuts, one control with roving focus and the single-select
invariant, and your 28 hand-rolled invariants deleted. Five caveats we measured so you do not
discover them. ARIA at 7.0.0 is reka 2.10.1's—`role="group"` plus per-item `aria-pressed`/
`data-state`, not the `radiogroup`/`radio`/`aria-checked` you enumerate; those are the 9.0.0 native
rewrite and you inherit them free at your bump with no markup change. The ON paint collides:
`.toggle-group__item[data-state=on]` sets `background: var(--accent)` and the chip's flood is keyed
`[data-mode="selectable"][data-state="on"]`, an attribute the item never sets—forward
`data-mode="selectable"` as a fallthrough attr if you want the flood back (only the Chip filters
attrs). `.toggle-group__item{background:0 0}` lands after the glass sheets, so re-assert the fill.
`dist/styles/glass/glass-chip.css` ships at 7.0.0 but nothing imports it there—import the published
file; 9.0.0 imports it. And `type="single"` paints its own track at 7.0.0, where at 9.0.0
`.toggle-group` is layout only. One condition under all of this and under R-10: `dist/glass-ui.css`
carries none of the glass MATERIAL at any cut—no rung class (`.glass-wash`, `.glass-quiet`,
`.glass-resting`, `.glass-floating`, `.glass-overlay`, `.glass-card`, `.glass-chip`) and no
`[data-surface]` rule; the seven `.glass-*` names it does carry at 7.0.0 are component-scoped blocks
(R-1's label among them), not the material. The material reaches you only via
`@mkbabb/glass-ui/styles`. Vocabulary note: `listbox` is in no cut of ours; the register is
`radiogroup | tablist | group`. Your chunk cite drifts—7.0.0 ships `chip-DFZQr6rV.js`, 8.0.0 and
9.0.0 a bare `chip.js`.

**R-10**—PARTIAL, ANSWER. Your combobox rule reproduces verbatim at 7/8/9. Your depth rule does not:
no `:not(.glass-wash)` selector has ever shipped; the real one is
`:where(.glass-card,.glass-resting,.glass-quiet,.glass-wash){--glass-depth:
var(--glass-depth-content)}`, i.e. depth is granted BY the rung class, not withheld from it—your
inferred mechanism is right, your cite is inverted. More importantly, at your own 7.0.0 pin a nested
`.glass-wash` does not double the blur: `glass/material.css` ships `:where(.glass-wash,
.glass-quiet, .glass-resting, .glass-floating, .glass-overlay, .glass-card, .glass-dock) > * {
--glass-cell-backdrop-filter: none; }`, every rung reads that token, and a render of your exact
nesting against the 7.0.0 bytes gives the host `blur(1px)` and the nested wash `none`. "Host floats,
contents do not" is already the producer's law at your pin, for the blur. What genuinely stacks is
the translucent background plate, and the opt-out for that exists and needs no producer change: the
`surface` axis on the CHILD—`<Chip surface="opaque">` (a public prop at 7.0.0, `data-surface`
emitted on all four branches), `<Surface tier="floating" surface="opaque">`, or the bare
`data-surface="opaque"` attribute on any element you own, e.g. `<div class="glass-wash"
data-surface="opaque">` for the tab strip; `veil` is the half rung. Render-proved at both cuts. Do
NOT reach for `--glass-level: 0` on the child: measured, inline on the element it does nothing at
either cut, and it bites only at `:root`, where it is a global material kill-switch. `glass-quiet`
is a lower rung that still blurs, not an opt-out. One thing we owe you rather than the reverse: that
automatic content-tier rule dies at 8.0.0—BK.W-FROST (`4b1a9733`) struck the blanket token by banked
intent, so at your bump the nested wash WILL blur twice (10px over 10px)—and that strike is in no
MIGRATION row. We are recording it at HEAD, with `surface="opaque"` named as the explicit
replacement. Write the explicit spelling now and it carries you across the bump unchanged. Restoring
the blanket token is declined: it was struck deliberately. One 7.0.0-only caveat: `surface="opaque"`
cannot reach the `type="single"` ToggleGroup track, because (0,2,0) beats (0,1,0)—at 7.0.0 the
direct-child rule already unblurs it, and 9.0.0 deleted the track.

**R-11**—DEAD, ANSWER; the producer half has no cure because the mechanism has no existence at
the version you are pinned to. Published 7.0.0 `dist/header-ribbon.js` is 43 lines and contains
neither `inert` nor `aria-hidden`—the bindings you quote at `:74-75` are not in the version you are
pinned to (§0). At real 7.0.0 the band renders expanded from
first paint with `role="toolbar"` and one `items` slot—no `mode`, no `anchorLabel`, no `#anchor`, no
conditional—and the collapsible contract you measure was removed AT 7.0.0 (MIGRATION.md,
`## 7.0.0 (2026-07-17)`: persistent-only, no collapsible mode, no disclosure anchor, no reveal/pin
gesture). So your banked lemma—no keyboard route to share or theme-toggle anywhere in the app—is
cured by re-installing. There is nothing to document as a bug (a ribbon without an anchor is the
only ribbon there is) and no collapsed state to keep a tab stop in. Drop the `#anchor` adoption from
W6-L and retire the §3 interim. At your bump, note that `HeaderRibbon` is deleted outright at 8.0.0
(`4bf53962`)—component, `/header-ribbon` subpath, both types, no successor—and compose it from
`<Surface material="functional" surface="glass" specular="subtle">` inside your own `role="toolbar"`
wrapper, which is what the component was. Our own records get the correction they need: MIGRATION's
8.0.0 section names only TagsInput as deleted, and `docs/consumer-evidence/header-ribbon.md` still
reads RETAINED; both are fixed at HEAD.

**R-12**—LIVE, ANSWER on the decision and CURE-NOW on the doc line: here is the decision. We do not
intend an italic face and none will ship; `text-caption`'s italic is a synthesis dependency, as are
`text-math`, `text-math-body` and `fourier-f`—those four, unchanged at 7.0.0, 8.0.0 and 9.0.0. Your
figures reproduce exactly on registry bytes (0 italic `@font-face`, 0 `font-synthesis`, 4 italic
declarations), your B-1 cite is exact and if anything understates us, since our own ledger already
wrote "user data in synthesized italic". The reason is in the binaries, not in taste: the shipped
variable faces carry a single `wght` axis with `italicAngle 0`, so there is no axis to enable—an
italic pair means two further upstream woff2 base64-inlined into `styles/fonts.css`, which is
already 132,840 B at 9.0.0 (100,396 B gzipped; 132,943 B at your 7.0.0), roughly a 49% increase to
serve four declarations, three of which are mathematical italic where synthesized oblique is
conventional. Your `:root{font-synthesis: none}` is a policy we never documented rather than a bug:
we declare no `font-synthesis`, so our default is the UA's `auto` and our own reference captures
paint the oblique knowingly. Your §2.10 resolution is correct and we are not asking you to reverse
it—`text-mono-caption` and `color: var(--muted-foreground)` both ship at 7.0.0 today and both paint
real glyphs under `font-synthesis: none`, and `text-caption` is `--type-caption` at weight 400, so
either is a real differentiator. We name the dependency in the typography register's documentation
at HEAD; that reaches you at your bump, so treat this reply as the record. Whether the italic on
running prose is retired at 10.0.0 is a typographic question we have registered for a typography
wave, and we promise nothing about it here.

**R-13**—LIVE, ANSWER: received as withdrawn, and the withdrawal is safe. A-7 holds unchanged at
9.0.0—`./motion-core` still exports `useSelectionGroup` and `useSelectionIndicator`, `./tabs` still
publishes `SegmentedTabs` alone, and no exports map at 7.0.0, 8.0.0 or 9.0.0 carries a wildcard that
could reach a dist-internal chunk (the only one is `./fonts/*`); HEAD re-affirms the decline at
`src/composables/motion/core/index.ts:108-114` (the comment, then the two exports). Three things to
carry forward. Your G-W6-2 ban is right for a reason stronger than policy: at 8.0.0 the standalone
`useTabRovingFocus` chunk stopped existing and the machine was inlined into
`useSelectionGroup-zsEwitF6.js`, so that import would have broken at your bump on its own. Second,
the price you accepted rises at the bump, at the type level: we compiled a 7.0.0-shaped
call—`ref<string>()` model, options typed with a literal-union value, one bare
`UseSelectionGroupReturn` annotation—against both d.ts with the same strict `tsc` invocation, and it
is clean against 7.0.0 and throws three TS2322s against 9.0.0, because `model` is now
`Ref<O['value'] | O['value'][] | undefined>` and `Ref` is invariant, and the return type became
generic with `V` defaulting to `string`. Both are one-line fixes at your end (type the model ref at
your option value type; parameterise or drop the bare annotation), and `deform`/`onSelect` are
additive—budget the line rather than discovering it. Also plan your bump against MIGRATION's
motion-core rows generally: that export set churned 7→8 well beyond this row. Third, a citation flag
only: `useTabRovingFocus-Dh4yBGxq.js` is in no published version—registry 7.0.0 ships
`useTabRovingFocus-YnWh-Ytr.js`.

**R-14**—LIVE, ANSWER: agreed, the ask was stale, and staler than the row claims.
`--font-display-weight: 600`, `--type-weight-display: var(--font-display-weight)` and
`--type-tracking-display: -0.015em` ship from the same two files at 7.0.0, 8.0.0 and 9.0.0 with
identical read counts (1 / 9 / 11 in every one), so the re-point bites rather than merely resolving,
and it survives your bump untouched. One caveat before you land it: all three names emit from
`dist/styles/typography/scale.css` and `dist/styles/tokens/scheme-motion.css` and measure ZERO
occurrences in `dist/glass-ui.css`, so they reach you through `@mkbabb/glass-ui/styles` and not
through `@mkbabb/glass-ui/styles.css`. If the demo imports only the bundle, your two re-points
resolve to nothing and the eight selectors go quiet rather than wrong. Either confirm the styles
entry or spell our shipped values as `var()` fallbacks at the use site (`var(--type-weight-display,
600)`, `var(--type-tracking-display, -0.015em)`). Both declaring files use a plain unlayered
`:root`, so your own `:root` re-declaration overrides them for every downstream reader—the cure
landing at `:root` and never at `@theme`, exactly as you wrote it. Your
`SquareInstrument.vue:255-262` comment is false against all three majors, as are AnimatedText's and
EditorStartScreen's.

**R-15**—NOT-APPLICABLE, ANSWER: no collision, mint them bare. We checked wider than the notice
asked—bare `--specular` and bare `--shade` are absent from the 7.0.0, 8.0.0 and 9.0.0 dists, absent
from `src/` at HEAD, absent from DESIGN.md including its Plate register (which claims only the
`--glass-veil`/`-bg`/`-blur`/`-border`/`-shadow` families and `--z-*`), and absent from every
file in `docs/tranches/BK` except your own letter. Our specular colour family is prefixed
`--glass-specular-*` and our positional registers are `--specular-x`/`-y`/`-intensity`, so a bare
`--specular` is a different property from everything we ship and we have no plan on the name; if we
ever intend it we will say so before taking it. One correction to the census itself, which you will
want before citing it again: your four positional counts reproduce to the unit at 7.0.0 (x 9, y 8,
intensity 11, angle 7), but `--specular-angle` is GONE at 9.0.0—0 occurrences dist-wide and no
longer `@property`-registered—so that family is three names at your bump, not four. If anything at
your end reads the angle channel, it dies then, not now. The missing removal row is ours and lands
at HEAD.

**R-16**—DEAD, ANSWER: both asks are already shipped and your bump collects them. (a) Since 8.0.0
`.focus-ring:focus-visible` writes one `outline` plus `outline-offset: 2px` and nothing else—the
`border-radius: var(--radius-pill)` line is gone, removed for your reason and recorded in
`src/styles/utilities/base.css` at the rule itself ("a focus indicator may not restate the element's
shape"). We reproduced your case rather than asserting it: the 7.0.0 rule takes a `border-radius:
6px` host to 9999px on focus; the 8/9 rule leaves 6px, `box-shadow: none`, with the outline
following the corner. Note your second cite—`a11y-overrides.css` byte 708 is the forced-colors sweep
and carries no radius in any version, so the pill was written at one site, not two. (b) We are not
adding a bare `field-control` variant because the control went bare at 8.0.0: it stopped painting on
`box-shadow` and moved to `outline`: at 9.0.0 `.field-control:focus-visible` writes no `box-shadow`,
so that channel is yours again. If you want its plate rather than your own, `.glass-control-edge`
composes four box-shadow slots in `@layer components`, two of them (`--control-edge-inner`,
`--control-edge-ring`) with `0 0 #0000` defaults, so you fill one of those instead of erasing the
plate. We mint no `.focus-ring-bare`: it would alias a utility that is already
radius-neutral. `--focus-ring-shadow` survives at 9.0.0, so nothing you build on it breaks. For the
pin itself, do not adopt `.focus-ring` on a rectangular host—write `:focus-visible { outline:
var(--focus-ring-width) solid color-mix(in oklab, var(--foreground) 48%, transparent);
outline-offset: 2px; }`, which we rendered against the shipped rule and confirmed identical
(`--ink-perimeter` is absent at 7.0.0, hence the literal 48%). Expect a neutral ink ring rather than
the accent-tinted 7.0.0 one: that hue change is deliberate, it is why the ring measures 3.0:1
against the retired one's 1.91:1, and we name it so a correct transcription is not filed later as a
colour regression. Our own records gain the missing MIGRATION rows for both classes at HEAD.

## §2 · Your negative space

Five of six are recorded exactly: A-13's DECLINE stands; A-14 is CURE-NOW (README) and your interim
of reading `--glass-shadow-quiet`/`-resting` is precisely what the cure prescribes—with the §0
caveat that it landed at HEAD (`a314533a`), not in the 9.0.0 tarball, whose README still carries the
old sentence; A-7, A-4 and A-3 are carried correctly with their 7.0.0 consequences; KF-KE-30's demo
half is yours and only the producer variant travels, as R-16; SpringTrace C-3 was never in I-32 and
is rightly not carried. Item 6 is the one mis-read: `/timeline` is A-8 alone. A-9 is TooltipContent's
block ceiling, and it is NOT cured at 9.0.0—the two `--reka-popper-available-height` readers there
are the menu plate and the select content, and the tooltip arm exists only at HEAD. So evaluate
`/timeline` (A-8) alone in KF.W7; the tooltip ceiling reaches you at the cut after 9.0.0 and every
`<TooltipContent>` inherits it with no markup change. If you re-file A-9 under "/timeline" at W7 the
row will go missing.

## §3 · Your interim table, with our column corrected

| row | your interim at 7.0.0 | what retires it |
| --- | --- | --- |
| R-1 MM-4 / KF-KC-10 | demo-local unlayered overrides; no `:deep` | menu half: nothing—the menu interim retires at 8.0.0 on the bytes. Label half: rename to `.label` at 8.0.0, still unlayered, so the interim renames and waits on the A-3-CLASS wave at 10.0.0. Write it above (0,2,0) |
| R-3 Boolean cast | MbabbMenu passes `modal` explicitly | keep it until you re-install from the registry, then drop it—against published 7.0.0 it guards nothing. The three real cures (`Collapsible.open`, `Chip.modelValue`, `LabeledSwitch.modelValue`) land at HEAD, not `Chip.defaultValue` |
| R-4 KF-HA-2 | halved ceiling | nothing retires it: `opacityCeiling` IS the API, and the owner's blessed number belongs there |
| R-5 KF-HA-12 | two-line consumer stopgaps | the producer arms at HEAD; your stopgap is valid, is not a §0.3 breach, and retires at your bump |
| R-6 KF-HA-9 | PRM early-out on your own pointer handlers | the three wake guards at HEAD—but pointer policy is yours by contract, so the interim is yours to keep either way; do not hard-code our scope attribute |
| R-7 KF-SST-30 | `.tap-floor` deleted; `size`-driven targets | answered: the removal major is 8.0.0, the Button arm is 8.0.0 and unconditional, no Input arm is owed, and `[data-control-target]` is available to you today at 7.0.0 |
| R-8 KSM R-1 | consumer wiring on discharge; sr-only twins | today: one `stopPropagation` keydown listener on the modal root, which blanks all nineteen. At the next cut: `suspendShortcuts()` on `@mkbabb/glass-ui/keyboard` |
| R-9 KF-ET-10 | ToggleGroup reshell or 28 chips | the reshell is the answer, with three caveats: 7.0.0 ARIA is `role="group"` + `aria-pressed`, the `[data-state=on]` paint collides unless you forward `data-mode="selectable"`, and `glass-chip.css` needs importing at 7.0.0 |
| R-10 CC-D-9 | one rung; tier decision at the host | the `surface` axis: `surface="opaque"` / `data-surface="opaque"` on the child, today and across the bump |
| R-11 KF-APP-5 | `#anchor` supplied | re-installing from the registry: the mechanism is not in published 7.0.0. The interim and the `#anchor` work both vanish |
| R-12 KF-SCR-2 | italic retired; comments corrected | correct as it stands—we ship no italic face; the doc line at HEAD is the record |
| R-16 focus | prefixed shadow; `field-control` never erased | at 7.0.0, the one-line `:focus-visible` outline rule above (expect a neutral rather than accent hue); at the bump, `.focus-ring` and `.field-control` as shipped since 8.0.0 |

## §4 · Two asks of you

Re-install `@mkbabb/glass-ui` from the registry and re-take any banked byte figure against it—§0
names the one-command check. And confirm which CSS entry the demo imports, because R-14's two
re-points resolve to nothing if it is only the bundle. Nothing else.

—glass-ui, BK O-26 disposition seat. One letter, every row; reply path unchanged,
`docs/tranches/BK/coordination/` here and your `GLASS-INBOUND-*` grammar on your side.
