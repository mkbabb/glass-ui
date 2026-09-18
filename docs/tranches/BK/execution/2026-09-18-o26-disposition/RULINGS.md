# O-26 driver rulings (Fable, adjudicating the pass-1/pass-3 investigate+verify pairs)

[2026-09-18 · banked beside the ledger: the seat JSONs and this file were session scratch and were lost at a session restart; this copy was replayed byte-for-byte from the driver transcript (1 Write + 10 Edits, 0 misses) by the author-quartet adjudicator, then amended once—the README anchor "Token overrides" struck (no such heading; the override prose sits under "Design Tokens"). The LEDGER is the record; this is the adjudication it was written from.]

Datum: repo HEAD `2113670c`; letter `docs/tranches/BK/coordination/valuejs-outbound-2026-09-18-kfw6-bh-relay.md`;
findings `$SP/o26/{investigate,verify}__<cluster>.json`. Word sets as in the O-20 LEDGER. Rows R-8..R-16 and the
DISPOSED/NOTICE rows are ruled in §B once their clusters land.

## §0 · Provenance (ONE paragraph, top of the reply, never per row)

The consumer's installed "7.0.0" matches no published version: `dist/glass-ui.css` 70,109 B vs the registry 7.0.0's
69,884 B (sha256 cb2b5092…); scope hash `data-v-87831917` vs `data-v-defd849d`; the hashed chunks they cite
(`dropdown-menu-0gkd7rMF.js`, `chip-6ysLmScu.js`) exist in no published version 6.0.0–9.0.0 while every unhashed path
they cite does; DropdownMenu's `modal: true` entered at `490cc46e`, an ancestor of v7.0.0, and their bytes have it
bare → their tree is built from PRE-7.0.0 source. Every MECHANISM they report reproduced on registry bytes, so nothing
is withdrawn on this ground; line cites drift 8–19. Ask: `npm ci` against the registry before the next relay.
ORDER OF OPERATIONS (verifier's, ratified): keep the MbabbMenu `modal` interim UNTIL re-installed, then drop it
(against registry 7.0.0 it guards nothing; against the tree on their disk it may be load-bearing). The one-command
check leads: `wc -l node_modules/@mkbabb/glass-ui/dist/header-ribbon.js` → 43 on the published 7.0.0 (their copy
carries `inert` at :74, compiled from source deleted at `4e8c6387`, an ancestor of v7.0.0).

SECOND PREAMBLE FACT (systemic, stated ONCE, never per row): 9.0.0 = `d4f7b24f`, cut 2026-08-29, is the latest
PUBLISHED version; the whole O-20 cure wave (`a314533a`..`2113670c`, 2026-09-17) is post-9.0.0 —
`git merge-base --is-ancestor a314533a v9.0.0` → NO. Every CURE-NOW in I-32 and every CURE-NOW in this reply is at
HEAD and in NO published version; it reaches them at the cut after 9.0.0, then at their bump. Consequences already
caught: the A-14 README cure is at HEAD, not in the 9.0.0 tarball (README:156 there still carries the old sentence);
A-9's tooltip ceiling is at HEAD only (see R-S2). Reply lines say "at HEAD" for cure-wave work and "at 9.0.0" only
for what the tarball carries.

## §A · Rows ruled from banked pairs

### R-1 · state9 PARTIAL · ANSWER
- Membership: YES, unlayered at 7.0.0—`.glass-label[data-v-defd849d]` at byte 21363 of `dist/glass-ui.css`, outside
  the sole `@layer components` (braces 2520–19139), and `dist/styles/index.css:1` imports `../glass-ui.css` with no
  `layer()` (the next import carries one) → unlayered on `./styles` and `./styles.css` alike. KF-KC-10 interim REQUIRED.
- The two halves part company at 8.0.0 (NAME the major): the MENU interim retires at 8.0.0 (`dropdown-menu__` = 0
  across the 8.0.0 dist; `.menu__item` inside `@layer components` in `styles/glass/overlay-plate.css`, 0 unlayered
  rules); the LABEL interim RENAMES—`.glass-label` → `.label` at 8.0.0 (MIGRATION.md, `_This cut (8.0.0)_`, the
  `.glass-avatar`/`.glass-label` bullet; cite by heading) and `.label[data-v-4f17b386]` at 9.0.0 byte 16968 is STILL
  unlayered (layer closes 14838; `src/components/label/Label.vue:75` plain `<style scoped>`).
- Therefore A-3-CLASS (LEDGER.md §A-3-CLASS, CURE-NEXT-MAJOR 10.0.0) and NO piecemeal cure. Grounds, in this order:
  (1) the ledger's own definition—a cascade-rank change to a shipped selector is a published paint-contract move;
  (2) it buys this consumer nothing at a 7.0.0 EXACT pin; (3) the class wave carries the born-RED set gate. DROP the
  "incoherence" argument (Skeleton.vue:62 already authors `@layer components` in an SFC block—the tree is mixed).
- Specificity (load-bearing for their interim): producer rule is (0,2,0); an unlayered (0,1,0) override LOSES, (0,2,0)
  only TIES (sheet order) → write (0,3,0)+. Menu rule is (0,1,0) unscoped → (0,2,0) wins outright.
- `[data-slot="label"]` (same element at 7.0.0 and 9.0.0, one emitter each) is offered as an OBSERVATION WITH NO
  WARRANTY—not a supported hook, nothing minted, said in those words.
- A-3-CLASS figure: send "the set, not a number" (LEDGER.md:99-102). Two in-house seats agree only on the depth-0
  354; all-depths disagree (471 vs 604). Never carry 351.
- Wording fix: "any consumer rule outranks the layered `.menu__item`" is false as worded—an UNLAYERED consumer rule,
  or one in a layer ordered after `components`, outranks it; we declare the order at `styles/index.css:1`.
- 10.0.0 riders → LEDGER A-3-CLASS scope note (not a new ruling): (i) the cure design covers the SFC scoped-block half
  explicitly (authored `@layer components {}` inside the SFC block, Skeleton.vue:62 precedent), not only the `.css`
  closure; (ii) the wave publishes its measured unlayered set as a consumer-readable manifest beside the cascade gate.
- Their §0.4 LIFO/FIFO constraint is mis-attached to R-1 (bank id KSM R-1 = letter row R-8); say so in one clause.

### R-3 · state9 PARTIAL · CURE-NOW
- LabeledSelect half CONFIRMED on registry bytes (`dist/labeled-field.js:149`, bound :174; SSR probe: `:default-open`
  opens when `open` absent, `data-state="closed"` the instant `open:false` is handed in). KF-CO-1 stands. LabeledSelect
  is DEAD at 8.0 (MIGRATION "removed at 8.0" row) → ANSWER at their pin, no cure owed.
- DropdownMenu half does NOT reproduce: registry 7.0.0 has `open: default undefined`, `modal: default true` → §0.
- Roster (their ask), measured at 9.0.0—bare Booleans bound EXPLICITLY into a reka controlled prop: Collapsible
  `open`, Chip `modelValue`, Chip `defaultValue` (LEAVE ALONE—see below), LabeledSwitch `modelValue`. `checked` /
  `pressed` do not exist as glass props in runtime or `.d.ts` (glass publishes `modelValue`; LEDGER A-11b). The
  `useForwardProps` set (Dialog, Select, Toast, Switch, Checkbox…) is INERT by reka's own forwarding law—untouched.
  CommandDialog (`open`+`defaultOpen`+`modal`+`unmountOnHide`) was the one true "non-modal by accident" site and was
  cured at 8.0.0 (CommandDialog.vue:10-36 form)—stated in the reply; no doc edit owed.
- CURE (HEAD, the CommandDialog.vue:27-33 form, ONE key per component): `Collapsible.vue` withDefaults `open:
  undefined`; `Chip.vue` withDefaults `modelValue: undefined` ONLY—`defaultValue: undefined` is a REGRESSION
  (measured twice on a patched 9.0.0 dist: strips `aria-pressed` from `<Chip mode="selectable">`, reka Toggle.vue:66-86
  + Vue's undefined-attribute omission); `LabeledSwitch.vue` withDefaults `modelValue: undefined` + `types.ts`
  `modelValue?: boolean` (WIDEN, ratified: the runtime never enforced required—`.required === undefined`, omission
  warns zero times—so the type moves to the runtime truth and matches `<Switch>`; not a break).
- Witnesses: one mount assertion per cure in the three EXISTING contract tests (`:default-open` / `:default-value`
  seeds paint ON), plus an `aria-pressed` guard on Chip; assert the emitted chunk reads `modelValue: { type:
  [Boolean, null], default: void 0 }`. Gates stay 60. A-11b is an argument FOR (it re-homes consumers onto the
  controlled Chip spelling; the uncontrolled one must not be dead in that landing zone).

### R-4 · state9 LIVE · CURE-NOW (doc) + ANSWER
- Mechanism reproduces at 7/8/9: the placeholder is mounted unconditionally; what arms is the CANVAS LAYER
  (`.aurora-canvas-layer{opacity:0}` → `--armed{opacity:1}`); no opacity/visibility/armed rule on the ground.
- DECLINE hide-on-arm: the ground is the surface a failed runtime, a lost context and the `"css"` substrate fall back
  to (Aurora.vue:32-35, :57-70); a hide-on-arm rule puts a hole exactly there—the masking-fallback shape inverted.
- The correction that changes their number: `config.alpha` is canvas-only (`canvas.style.opacity`, runtime.ts:234-237)
  and the ground is a full-opacity alpha-blind raster of the SAME field → `alpha` cannot reduce delivered presence by
  ANY factor; the envelope is `opacityCeiling` (prop, `default: 1`, clamped, applied ONCE to the shared root; documented
  in their installed `Aurora.vue.d.ts:65-79`). Their §3 halved-ceiling interim IS the API; nothing retires it.
- CURE: JSDoc on `AuroraConfig.alpha` (`src/components/aurora/constants/presets.ts:284`) with the three measured facts
  (pigment alpha of the painted image; composites over the alpha-blind ground so it re-weights a dissolve, not
  presence; the presence envelope is `opacityCeiling`). Ships via `dist/aurora.d.ts`. No code, no prop, no gate.
- Internal observation (no lane): `aurora-canvas--armed` (template-bound, 0 CSS rules 7→9) and `data-aurora-settled`
  (9.0.0, 0 rules)—hooks with no paint; note for the STRUCTURE sweep, not this letter.

### R-5 · state9 LIVE · CURE-NOW
- Reproduces to the block: 7.0.0 = 7 forced-colors / 3 reduced-transparency blocks, 0 aurora inside either; 9.0.0 =
  4 / 0 in `glass-ui.css` (the switch/checkbox/radio arms MOVED to `styles/glass/control-bit.css` + `focus-veil.css`),
  aurora still in neither sweep anywhere in the styles tree. Structural cause: every a11y arm is CSS; `forced-colors`
  leaves canvas pixels alone; `a11y-fallback.css`'s `--glass-level: 0` drives CSS plates, not the GPU field.
- CURE in `Aurora.vue`'s own scoped block (no new file/module/JS media read)—the VERIFIER'S measured shape, not
  the investigator's (patched + rendered in headless Chromium: an inline `background-image` and an inline CUSTOM
  PROPERTY both outrank an author media arm, so `background-image: none` and a `--aurora-ceiling` indirection were
  no-ops): (1) the three inline paint values move to custom properties—root `:style="{ '--aurora-ceiling':
  clamped }"`, placeholder `:style="{ '--aurora-ground-image': …, '--aurora-ground-color': … }"`; (2) scoped rules
  `.aurora-root { opacity: var(--aurora-ceiling-a11y, var(--aurora-ceiling, 1)) }` and `.aurora-placeholder {
  background-image: var(--aurora-ground-image, none); background-color: var(--aurora-ground-color, transparent) }`;
  (3) `@media (prefers-reduced-transparency: reduce) { .aurora-root { --aurora-ceiling-a11y: 1 } }`—the a11y arm
  writes a property no inline style occupies, no `!important`; (4) `@media (forced-colors: active) { .aurora-root >
  .aurora-canvas-layer { display: none } .aurora-placeholder { background-image: none; background-color: Canvas } }`
  (Chromium forced-colors forces `background-color` but keeps `background-image`, so the image half is the
  load-bearing one). RATIFIED as CURE-NOW: `opacityCeiling`'s semantics are unchanged, the paint authority moves from
  inline values to custom properties on the same elements—not a break. Honest scoping: a default aurora presents
  opaque, so reduced-transparency bites only when a consumer set `opacityCeiling < 1`. The 9.0.0 arms in
  `control-bit.css`/`focus-veil.css` are NEW files at 9.0.0 (say "moved", never "gained").
- Witness rides an EXISTING a11y test (the implement seat names the file—`tests/components/a11y/focus-visible.test.ts`
  already asserts forced-colors selectors—or the aurora contract test); no seat promised in the letter, none minted.
- Their two-line consumer stopgap does NOT breach their §0.3 (lands on their own wrapper, copies no producer
  selector); retires at their bump.

### R-6 · state9 LIVE · CURE-NOW (+ two riders, split)
- Reproduces at 7/8/9: four unguarded `wake()` sites, one guarded (scroll). Under PRM the pointer path cannot change a
  pixel (time pinned at REDUCED_MOTION_TIME 3.7; `setPointer` early-outs) and `wake()` under PRM is a SYNCHRONOUS
  `tick()` in the input task → pure waste. One correction: their fourth site (`update()`, config-change) MUST keep its
  wake (a preset swap under PRM repaints the one static frame).
- CURE: `runtime.ts` `setCursor` (:427) / `clearCursor` (:433) / `setCursorRadius` (:439) gate the wake with
  `if (!canvasHandle.reducedMotion)` (the `setScrollProgress` idiom, :445); state writes stay; `update()` keeps its
  unconditional wake with a one-line comment naming the exception. Rides the MOTION seat's PRM arm. GROUNDS, stated
  honestly (verifier): `setCursor`/`clearCursor` are bit-identical under PRM; `setCursorRadius` is NOT
  (`cursorRadius` is uploaded unconditionally and `reset()` holds a raised envelope)—its guard stands on
  preference-suppression grounds: a radius change with the dynamics frozen is exactly the motion PRM asks us to
  suppress. Three lines, ratified. Cite: `DEFAULT_AURORA_CONFIG.impasto = 0` is presets.ts:483 (:492 is `alpha`).
- R-4 addendum (verifier): at DEFAULT config (`alpha: 1.0`, live presentation opaque) the armed canvas fully occludes
  the ground—their 2× cannot arise at default at all; and `opacityCeiling`'s composite doc ALREADY ships in their
  installed `Aurora.vue.d.ts:65-83`, so the answer is at their pin today.
- INTERNAL, ours, not in the letter—O-26-INT-1 · CURE-NOW (rides the R-6 lane): a mid-session PRM turn-on with the
  cursor engaged leaves the engagement envelope frozen NON-ZERO (`reset()` holds it by design,
  usePointerVelocityField.ts:273-276; `tick()` early-returns under PRM before advancing it, :322-324/:365-369)—the
  cursor glow stays on screen instead of decaying to rest. Cure: on the reducedMotion transition, zero the envelope
  (the one static PRM frame must be the rest frame); born-RED witness in the existing pointer-velocity-field test.
- Scope-hash note for the reply: `.aurora-root` carries `data-v-aebed9bd` at 7.0.0/8.0.0 and `data-v-f054ede9` at
  9.0.0—a consumer stopgap must never hard-code a scope attribute.
- Their §3 interim is not a workaround, on the record: pointer policy is the consumer's by contract (Aurora's docblock).
- RIDER 1 (`resolveAtoms` throw): DECLINE the non-throwing bridge (catch-to-stock-palette = masking fallback).
  CURE-NOW the missing half: JSDoc on `AuroraAtomsBase.seed` (atoms.ts:130)—a string seed is parsed by `cssToOklch`;
  a contextual (`var(--x)`, `currentColor`) or non-opaque value throws `GlassColorError`; resolve the token yourself
  and pass the `OklchStop` form. Ships (`dist/aurora.d.ts` re-exports the atoms types).
- RIDER 2 (`interactivity.light`), three dispositions, its own id R-6-LIGHT: (a) doc CURE-NOW—JSDoc that `light`
  steers relighting only where impasto > 0 (every `relightImpasto` term × `uImpasto`); (b) internal CURE-NOW —
  `isAuroraPointerEnabled` (runtime.ts:204-209) gates on the medium test, so crayon+light+`swirl:false` arms a pointer
  path that provably cannot paint; re-key the predicate on the impasto amount—the implement seat MEASURES which
  media carry impasto > 0 first (born-RED); (c) the atoms-door union narrowing (`light?: never` on the smooth arm;
  the honest type is "light only where impasto > 0") is a type change on a published door → CURE-NEXT-MAJOR.
  Their consumer decision (stroke medium or delete the atom) stays theirs; the fact for it: at 7.0.0 `light` paints
  nothing on crayon.

### R-7 · state9 DEAD · ANSWER · + R-7-RIDER CURE-NOW (docs)
- (a) `touch-hit-area` left the published CSS at 8.0.0 (`bd93c22b`; dists 1/0/0). The MIGRATION row is banked under
  §8.0.0 (rows sit under the major that actually shipped without the name); it never reaches them (`files: ["dist"]`).
- (b) Conceded without reservation: it never expanded a target at any version (`pointer-events: none` by design—the
  swallow-fix for the radio taps; the box was a geometry for a computed-style readback). NO 7.x doc republish (7.0.0
  is immutable; its README says nothing of it). Exposure at their pin is NIL: the name occurs once in the 7.0.0
  package (its own definition); the atoms carry real geometry (`.checkbox__seat` 44×44 child, pointer-events auto,
  inside CheckboxRoot; Switch host `min-inline/block-size: var(--touch-target)`; radio seat; coarse
  `.tags-input__delete`). [2026-09-18 · re-ruled after lane M: the mechanism is named wrong and is
  stale by a cut—`.checkbox__seat` is the RETIRED absolutely-positioned span (`Checkbox.vue:28-33`),
  `.tags-input__delete` has zero occurrences (TagsInput deleted at 8.0.0). What ships is HOST-IS-SEAT:
  the host wears `.control-bit`, sized to `max(--touch-target, face)` IN FLOW
  (`styles/glass/control-bit.css:142-155`), paint on the `.control-bit__face` child. Exposure is still
  NIL—the host IS the ≥44 seat.] The Slider thumb is the DELIBERATE exception (`width:0;opacity:0`; the track is the target,
  TR ⊕⁷ on their own measurement)—say so; never claim "every atom".
- (c) Button: `data-control-target` UNCONDITIONAL at 8.0.0 (`button-yvGPb0Bx.js` byte-identical 8↔9; `70dc0f06`),
  icon-only at 7.0.0, block axis already floored at 7.0.0 via `--button-size` → `--control-h-*` → `--control-floor`.
  Input: no arm and none owed on the block axis (`.field-control` rides `--control-h-md` → the coarse `:root` lift).
  The SHARED floor `@media (pointer: coarse){[data-control-target]{…}}` (`styles/utilities/responsive.css`) ships in
  THEIR OWN 7.0.0 alongside the per-component arms they counted (8 of 9 coarse blocks at 9.0.0 are component-owned —
  never write "one shared rule"). B-1's parenthetical was an accurate quote used to frame the ask—confirm the fact,
  no charge.
- R-7-RIDER (docs, CURE-NOW, mints nothing): (1) the MIGRATION `touch-hit-area` removal-table cell—as written it
  prescribes the convicted halo; rewrite to name the keep-the-paint-small door (a real child seat inside the host, the
  `.checkbox__seat` form) and the attribute floor [2026-09-18 · re-ruled after lane M: the door to
  name is HOST-IS-SEAT—the host wears `.control-bit` and IS the seat
  (`styles/glass/control-bit.css:142-155`), paint small on `.control-bit__face`; the `.checkbox__seat`
  child-seat form is retired. Cured on that reading at `7c3d5fa3`]; (2) `docs/design/design-idioms.md:91`—the removed utility is
  still the example content for `a11y-overrides.css`; (3) README "Target size" paragraph (README is the only prose
  that installs) naming `[data-control-target]`, `--control-floor`/`--control-h-*`, `.control-bit`'s unconditional
  seat; (4) DESIGN.md: the same three mechanisms beside the tier table (today `[data-control-target]` has one prose
  line, inside the Timeline section). State the Button arm as 8.0.0 everywhere.

### R-8 (KSM R-1 + R-8 + R-16 + R-17) · state9 LIVE · ONE ledger row · CURE-NOW (verifier's amendments folded)
- VERIFIER AMENDMENTS, ratified: (1) the `defaultPrevented` half is RELEASED from CURE-NEXT-MAJOR—`proof:esc-stack`
  was deleted at BI.W-P000 (PACKAGE-SCRIPT-ABROGATION.md:113; package.json has zero `proof:*`), and the hazard was
  false: reka's `DismissableLayer.js:77-83` READS `defaultPrevented` and never sets it; nothing in our tree
  preventDefaults a keydown (ExpandableContainer.vue:201 is a mount-autofocus Event). The one-line guard
  `if (e.defaultPrevented) return;` (tested clean, kbtest/kb-patched.js) lands in the SAME cut with a MIGRATION
  bracket (behaviour change, not an API break; the surviving scenario is the nested esc-stack story,
  `demo/stories/containers/expandable-container.vue:126,134`, which the witness exercises). One row, not two.
  (2) THE 7.0.0 ANSWER is the verifier's, not the investigator's: the registry listens on `window` in the BUBBLE
  phase (`dist/keyboard.js:76-79`, no options), so ONE `stopPropagation` keydown listener on the modal root blanks
  all nineteen bindings with no producer change and no ownership of the registrations (executed on a real DOM);
  complete because reka's Dialog traps focus (DialogContentImpl.js:71). "Register your guard first" is strictly
  weaker (first match swallows)—drop it. (3) A-7/A-8 govern (LEDGER:185—an export with 0 importers is the shape
  A-7 DECLINED; "what earns a door is a NAMED consumer need"): the in-house enrolment is a CONDITION of the exports.
  (4) The only door is the `./keyboard` subpath—the reply names `@mkbabb/glass-ui/keyboard` or it is unactionable.
  (5) Two docblock contracts: ORDERING—`suspendShortcuts()` before the modal registers its own bindings (barrier is
  `seq > topBarrier`; the in-house wrappers do it in that order); `useRegisteredShortcuts()` is NOT barrier-filtered,
  BY DESIGN and stated—it is the reference list, not a live capability probe (a help overlay is itself a modal;
  filtering would empty it).
- Cadence note (verifier): five consecutive majors v5→v9, so CURE-NOW and CURE-NEXT-MAJOR name the same cut here;
  the words still mark break vs non-break for the owner's register, so they stay.
- Every figure reproduces with ZERO drift: `dist/keyboard.js` byte-identical 7.0.0/8.0.0/9.0.0 (sha256 982f6e28…,
  104 lines / 3706 B); `defaultPrevented`/`suspend`/`priority` = 0 in both; the `.d.ts` cites `:30`/`:32` exact.
  No O-20 ruling touches this surface (LEDGER has zero keyboard hits; A-7 was `useTabRovingFocus`).
- THE CORRECTION (load-bearing): the LIFO-for-Escape / FIFO-for-destructive law is not a constraint the future API
  must be designed against—it IS the shipped dispatcher (`dist/keyboard.js:63-73`: Escape walks the registry
  reversed, every other key returns on the first match), landed at `f24577c7` (BI.W-ESC-STACK), in v5.0.0 onward →
  live in their pinned tree. At 7.0.0 they can lean on it: a guard registered BEFORE the 19 globals pre-empts them
  permanently (caveat: first match swallows, so the guard performs both behaviours); an overlay registering Escape
  on open / unregistering on close already gets dismiss-topmost.
- R-8 · CURE-NOW, additive, in `src/composables/keyboard/useKeyboardShortcuts.ts`: (a) `suspendShortcuts(): () =>
  void`—a monotonic registration `seq` + a barrier stack; while suspended, non-Escape keys reach only shortcuts
  registered AFTER the suspension; Escape ignores the barrier and keeps its LIFO walk; within any layer first-
  registered still wins (no later registrant can shadow a destructive binding). TESTED on patched published bytes
  (kbtest/kb-suspend.js, +13 lines minified; byte-equivalent before suspension; app layer silent during; late
  registrant cannot shadow the modal's Delete; resume() restores). (b) `formatComboLabel(raw): string`—spoken-word
  form beside `formatComboParts`, reading the registry's own alias table `l` (R-17 cured by the same function:
  'delete' → "Delete or Backspace", canonical token FIRST, single letters upper-cased, e.g. 'mod+shift+z' →
  "Control Shift Z"); our own `demo/shell/AppShell.vue:355` (glyph-built accessible name) is its first consumer.
  (c) `LabeledShortcut extends RegisteredShortcut { label: string }` as the element type of
  `useRegisteredShortcuts()` (R-16)—type-only narrowing, non-breaking (the runtime already filters on label).
  IN-HOUSE ENROLMENT ships WITH the API (ratified: the barrier is worth little if only consumers call it): the MODAL
  overlays—Dialog, Sheet, CommandDialog, and Menu/Popover only when `modal`—call `suspendShortcuts()` on open
  and the returned resume on close; the implement seat MEASURES which components are modal by reka contract before
  wiring. Witnesses in the existing keyboard unit tests (barrier, LIFO/FIFO preservation, label form). Gates 60.
- R-8-DP · CURE-NEXT-MAJOR (10.0.0): honour `defaultPrevented` (`if (e.defaultPrevented) return;`—tested clean on
  kbtest/kb-patched.js)—a behaviour change to the shipped dispatcher and the direct cure for their ACG M-1 tablist
  collision; MUST run `proof:esc-stack` first (reka's DismissableLayer may preventDefault on Escape and silence the
  ExpandableContainer arm f24577c7 built)—a browser seat, serialized.
- Their escalation clause (SS-13 destruction path behind a modal with no undo) is a consumer-side observation:
  acknowledge in one line; the barrier is the producer half of it. Their cite `useToolbarKeyboard.ts:80-101` is a
  consumer file (no producer counterpart). Their bank id "KSM R-1" collides with this letter's R-1—answer as
  R-8/KSM R-1.

### R-9 (KF-ET-10 + D-M5 + D-M-3) · state9 LIVE · ANSWER (pending the verifier)
- Reproduces: both attribute filters live at 7/8/9 and WIDER than quoted (`name|required` also stripped, since
  8.0.0 at least); the chunk they cite exists in no build (7.0.0's is `chip-DFZQr6rV.js`; 9.0.0 inlines into
  `chip.js`, filters byte-identical). The filters are deliberate: `mode="selectable"` is reka's `Toggle` (owns
  `aria-pressed`/`data-state`); static arms are `<span>`s that must not receive `role`/`tabindex` by fall-through.
  "Structurally unspellable" stands as filed. A-11b answered the ITEM and never claimed the GROUP—not a re-ask.
- NO `ChipGroup` will be minted: ONE selection engine (`useSelectionGroup`; faces: dock run, SegmentedTabs,
  ToggleGroup); a fourth face differing only in paint is the duplication BI/BK removes. DECLINE the optional
  Chip-in-ToggleGroup-context arm too (a second reka-boundary removal for a shape the composition already spells).
- The GROUP already ships at their pin: `<ToggleGroup type="single" v-model>` + `<ToggleGroupItem :class=
  "chipVariants({ interactive: true, size: 'sm', shape: 'pill' })">`—real `<button>`s (S-2, met by the producer),
  consumer class merged at 7.0.0, `chipVariants` public on `./chip` at both cuts; one control with roving focus and
  the single-select invariant, the 28 hand-rolled invariants deleted. VERIFIER'S CAVEATS (measured, ratified):
  (1) ARIA at 7.0.0 is reka 2.10.1's—`role="group"` + per-item `aria-pressed`/`data-state`, NOT
  `radiogroup`/`radio`/`aria-checked`; the radio roles are the 9.0.0 NATIVE rewrite (`useSelectionGroup`), inherited
  free at their bump with no markup change—say so plainly; it is reka's contract, not a defect we cure at their
  pin. (2) PAINT COLLISION: `.toggle-group__item[data-state=on]{background: var(--accent)}` wins over the chip's ON
  flood (keyed `[data-mode="selectable"][data-state="on"]`, an attribute ToggleGroupItem never sets)—mitigation
  without a producer change: forward `data-mode="selectable"` as a fallthrough attr on the item (only the CHIP
  filters attrs). (3) `.toggle-group__item{background:0 0}` lands after the glass sheets → re-assert the fill;
  (4) `dist/styles/glass/glass-chip.css` ships but NOTHING imports it at 7.0.0 (import the published file; 9.0.0
  imports it); (5) `type="single"` paints its own track at 7.0.0 (9.0.0: `.toggle-group` is layout only).
  (6) CSS-ENTRY CONDITION for every `.glass-*`/`[data-surface]` claim: `dist/glass-ui.css` carries none of them at
  either cut—the glass layer reaches a consumer only via `@mkbabb/glass-ui/styles` (`dist/styles/index.css`);
  the reply states the condition once. The `name|required` filter widening is present at 7.0.0 (their pin).
  Vocabulary: `listbox` is in no cut—the register is `radiogroup|tablist|group`; do not widen `SelectionRole`.

### R-10 (CC-D-9 + KF-ET-21/KF-ES-21) · state9 PARTIAL · ANSWER + R-10-RIDER CURE-NOW (manifest)
- Half reproduces: nested `.glass-wash` doubles (it carries its own `backdrop-filter` at both cuts) and the
  `[role="combobox"]` rule is byte-exact; the depth rule they quote is polarity-inverted—`:not(.glass-wash)`
  occurs 0 times in any dist; the shipped form is `:where(.glass-card,.glass-resting,.glass-quiet,.glass-wash)
  {--glass-depth: var(--glass-depth-content)}` (`styles/glass/deep.css`); their inference from it is right.
- VERIFIER OVERTURNED THE INVESTIGATOR'S REASONING (render-proved in two playwright runs, o26/r10_test*.mjs), and
  the ruling follows the verifier: (1) at 7.0.0 the consumer's ask is ALREADY the producer's automatic law —
  `glass/material.css` `:where(.glass-wash, .glass-quiet, .glass-resting, .glass-floating, .glass-overlay,
  .glass-card, .glass-dock) > * { --glass-cell-backdrop-filter: none }`—so a nested wash is UNBLURRED at their
  pin (nested wash `none` at 7.0.0 → `blur(10px)` at 9.0.0); what stacks at 7.0.0 is the translucent BACKGROUND
  plate, not the blur. The doubling they predict is an 8.0.0+ behaviour (BK.W-FROST, `4b1a9733`, which struck the
  blanket token and the `> *` content-tier rule by banked intent—restoring it is a DECLINE). (2) `--glass-level: 0`
  is NOT a consumer lever: inline on the element it changes NOTHING at either cut (substitution happens where the
  rung blur is defined); it bites only at `:root`, as a global material kill-switch—never advise it per subtree.
  (3) `glass-quiet` is a lower rung that still blurs, not an opt-out.
- The premise "no consumer-reachable material opt-out" is FALSE at their pin—the `surface` axis on the CHILD:
  `[data-surface="opaque"]{--glass-level:0; backdrop-filter:none; opaque --card plate}` (`surface-axis.css`,
  verbatim at 7/9, imported after `ladder.css` so it beats the rung by source order—verified), reachable as
  `<Chip surface="opaque">` (public prop at 7.0.0, `data-surface` emitted on all four branches; render-proved at both
  cuts), `<Surface tier="floating" surface="opaque">`, and as the bare attribute on any element they own (`<div
  class="glass-wash" data-surface="opaque">` for the tab strip); `veil` the half rung. Write the explicit opt-out
  even where 7.0.0's automatic half already covers them, because the automatic half is gone from 8.0.0 on and the
  explicit spelling survives their bump. 7.0.0-only caveat: `surface="opaque"` cannot reach the `type="single"`
  ToggleGroup track ((0,2,0) beats (0,1,0)); at 7.0.0 the direct-child rule already unblurs it; 9.0.0 deleted the
  track. Same CSS-entry condition as R-9. Nothing lands at HEAD for the row itself.
- R-10-RIDER · CURE-NOW (docs): a MIGRATION.md entry under `## 8.0.0` recording the BK.W-FROST strike—the blanket
  `--glass-cell-backdrop-filter` (39 hits at 7.0.0; 0 at 8.0.0/9.0.0/HEAD; 0 MIGRATION hits) AND the
  `:where(<rungs>) > *` content-tier rule—as a removal-table row (first cell the backticked bare name; no roster
  impact, it departed before the 9.0.0 datum) plus one sentence naming `surface="opaque"` / `data-surface="opaque"`
  as the explicit replacement. The A-4-RIDER class; rides B-3's manifest. Tell them: build on the surface axis,
  never on the token.

### R-2 (KF-SKEL-4) · state9 DEAD · ANSWER (DISPOSED row; pending the verifier)
- Byte proof reproduces exactly on registry 7.0.0 (`components.css` `:root` ×1: `--radius 0.25rem`, `--radius-lg
  0.5rem`, `--radius-sm 0.25rem`; `theme/radius.css` `--radius 0.625rem`, `--radius-lg var(--radius)`; 8.0.0/9.0.0
  only `theme/radius.css`; HEAD single site `src/styles/theme/radius.css:107`). A-4 KILL holds (LEDGER A-4).
- ONE mis-read to name (§4 invites it): "the later `:root` in components.css wins on order"—order does not decide
  it; `components.css` is imported `layer(components)` and the theme values sit in a bare `@theme{}` at-rule, so
  re-importing the theme sheet later fixes nothing. The 7.0.0 answer: a plain UNLAYERED `:root` in their
  design-idioms.css restating `--radius`/`--radius-lg`/`--radius-sm`—unlayered outranks `@layer components` by
  the cascade, not by position; it is the documented override surface (README:156, the one A-13 turns on), not an
  SS-6 workaround. Cascade-reasoned, not painted—the verifier decides whether a paint datum is owed.

### R-13 (W6-AUTH-1) · state9 LIVE · ANSWER (withdrawal received, safe)
- A-7 holds unchanged at 9.0.0: `./motion-core` exports `useSelectionGroup` + `useSelectionIndicator`; `./tabs`
  publishes `SegmentedTabs` alone; no wildcard export key (a private chunk cannot resolve); HEAD
  `src/composables/motion/core/index.ts:114` re-exports `useSelectionGroup` and names `useTabRovingFocus` only in a
  comment. Two forward facts: at 8.0.0 the standalone `useTabRovingFocus` chunk stopped existing (inlined into
  `useSelectionGroup-zsEwitF6.js`)—their G-W6-2 ban is vindicated by bytes; the 7→9 signature delta is a
  derivational widening (`model: Ref<O["value"] | O["value"][] | undefined>`), so a 7.0.0-authored call typechecks
  unchanged at the bump. Their chunk hash `Dh4yBGxq` exists in no published version (registry 7.0.0: `YnWh-Ytr`) → §0.

### R-14 (BG-6 re-derived) · state9 LIVE · ANSWER
- `--font-display-weight: 600`, `--type-weight-display`, `--type-tracking-display: -0.015em` ship byte-identically
  at 7/8/9 (`styles/typography/scale.css` + `styles/tokens/scheme-motion.css`, plain `:root`); the withdrawal is
  correct and staler than they claim. The caveat we owe: all three are ABSENT from `dist/glass-ui.css`—they reach
  a consumer only via `@mkbabb/glass-ui/styles` (index.css → typography.css → typography/scale.css), not via
  `styles.css`; a bundle-only import makes the two re-points resolve to nothing SILENTLY. Ask them to confirm the
  entry, or spell our own shipped values as `var()` fallbacks at the use site (`var(--type-weight-display, 600)`,
  `var(--type-tracking-display, -0.015em)`). The three stale comments are false against every published major.

### R-15 (SequencePlayhead C-3) · state9 NOT-APPLICABLE · ANSWER + R-15-RIDER CURE-NOW (manifest)
- No collision: bare `--specular`/`--shade` = 0 across the 7/8/9 dists, 0 in `src/` at HEAD, 0 in DESIGN.md, 0 in
  docs/tranches/BK outside their letter. Our specular COLOUR register is `--glass-*` prefixed (`--glass-specular`,
  `-core`, `-disc`, `-size`, `-intensity-{rest,hover,active}`); DESIGN.md's Plate register (:519) claims only the
  `--glass-veil/bg/blur/border/shadow` families + `--z-*`. Mint unprefixed; the demo's mint stands. Their four
  positional counts reproduce to the unit over the whole dist (9/8/11/7).
- UNASKED FLAG for them + R-15-RIDER for us: `--specular-angle` is `@property`-registered at 7.0.0
  (`styles/tokens/property-regs.css`) and GONE at 9.0.0 (0 dist-wide, 0 at HEAD) with no MIGRATION row; `-x`/`-y`/
  `-intensity` survive and stay registered. Tell them to drop any reader now. R-15-RIDER · CURE-NOW (docs): a
  MIGRATION removal-table row under the major that shipped without it (the lane MEASURES 8.0.0 vs 9.0.0 from the
  dists first)—registered `@property` names are published names and ride B-3's manifest as a second class; no
  roster impact (the roster pins `@theme` + `@utility`).

### §2 negative space (R-S2) · ANSWER
- Five of six exact against the ledger (A-13 DECLINE LEDGER:341-363; A-14 CURE-NOW landed a314533a, README.md:165
  "Override the `tokens/` spelling instead"; A-7/A-4/A-3 carried correctly; KF-KE-30 demo half theirs; SpringTrace
  C-3 never in I-32). ITEM 6 IS A MIS-READ: `/timeline` is A-8 alone; A-9 is TooltipContent's block ceiling and is
  already CURED at 9.0.0 (`overlay-plate.css`: one `--reka-popper-available-height` reader at 7.0.0 → two at 9.0.0,
  the tooltip arm)—KF.W7 should evaluate `/timeline` alone; every `<TooltipContent>` inherits the ceiling at the
  bump. A-13 rider: NOT restated—their RETAINED-BY-POLICY with the policy written at design-idioms.css:9-11 IS
  the "own the gradient" arm of the ruling; the file is closed on both sides (ledger note only).

### R-11 (KF-APP-5) · state9 DEAD · ANSWER + R-11-RIDER CURE-NOW (docs; pending the verifier)
- The mechanism does not exist on registry bytes: published 7.0.0 `dist/header-ribbon.js` is 43 lines, zero `inert`,
  zero `aria-hidden`; surface = `placement`/`ariaLabel`/`class`, one `items` slot, `role="toolbar"` band rendered
  expanded from first paint. The collapsible contract they measure (`mode`, `anchorLabel`, `anchor` slot,
  `hideTimeoutMs`) was removed AT 7.0.0—MIGRATION.md `## 7.0.0 (2026-07-17)` ("persistent-only … no collapsible
  mode, disclosure anchor, or reveal/pin gesture"). The strongest provenance witness in the letter; the reply's §0
  paragraph LEADS with "verify your install" and R-11 cites `wc -l node_modules/@mkbabb/glass-ui/dist/
  header-ribbon.js` → 43 as the one-command check. Neither producer ask has an object (no anchor to omit; no
  collapsed state); their banked lemma holds against their bytes and fails against ours; W6-L's `#anchor` work
  vanishes on re-install. At the bump: HeaderRibbon is DELETED at 8.0.0 (`4bf53962`, 2026-08-04; component,
  `/header-ribbon` subpath, both types, no successor)—compose `<Surface material="functional" surface="glass"
  specular="subtle">` under their own `role="toolbar"`, which is all the 43-line component was.
  [2026-09-18 · re-ruled after lane M: the recipe is `<Surface tier="floating" surface="glass">`.
  `SurfaceProps` at 8.0.0/9.0.0/HEAD is `tier | surface | deep | class`; `material` and `specular`
  were DELETED at 8.0.0—the major this answer documents—so the string above cannot compile at the cut
  it prescribes. `functional` was the `floating` tier under a second name in 7.0.0's `MATERIAL_TIERS`
  bijection; `specular` is gone outright.]
- R-11-RIDER · CURE-NOW (docs, ours): (1) MIGRATION.md `## 8.0.0` is WRONG—"one component is deleted" names only
  TagsInput; add the `_Deleted — HeaderRibbon_` entry (component + subpath + `HeaderRibbonProps`/
  `HeaderRibbonPlacement`, successor recipe as above) and correct the count sentence, following the file's own
  dated-bracket convention for a late row [2026-09-18 · re-ruled after lane M on two limbs: (a) the
  successor recipe is `<Surface tier="floating" surface="glass">`, per the bracket above; (b) the count
  sentence was SCOPED, not corrected—"one component is deleted" is batch arithmetic for the one export
  re-cut it sits in (`exports` 66 → 70, two keys retire), `./header-ribbon` is not one of the two, and
  `4bf53962` is outside the batch, so "two" would have been false. The sentence stands and its bracket
  is now a scope note pointing at the HeaderRibbon entry (`7c3d5fa3`). The wider defect the
  measurement exposed—seven retired subpaths with no record at all—is the new LEDGER row
  R-11-RIDER-2]; (2) `docs/consumer-evidence/header-ribbon.md` still reads RETAINED—a
  record, so it takes a dated deletion bracket at its head (deleted at 8.0.0, `4bf53962`; historical), not a delete.

### R-12 (KF-SCR-2 ≡ KF-EST-2) · state9 LIVE · ANSWER (the font decision, RATIFIED) + doc arm CURE-NOW
- Every figure reproduces with zero drift (0 italic `@font-face`; 0 `font-synthesis`; 4 `font-style: italic` at
  7/8/9: `text-caption`, `text-math`, `text-math-body`, `fourier-f`—three mathematical italic, one running prose).
  Their B-1 cite is exact and understates us: LEDGER B-1 already wrote "user data in synthesized italic".
- THE DECISION: glass-ui does NOT intend an italic face and none will ship; `text-caption`'s italic IS a synthesis
  dependency (as are the other three). Grounds: the register is deliberately four roman woff2 files (one variable
  roman per family + Capsize fallback, "ONE coherent brand voice"); we declare no `font-synthesis`, so our default
  is the UA's `auto` and our reference captures paint the oblique knowingly; their `:root{font-synthesis:none}` is a
  policy we never documented, not a bug. Their §2.10 retirement is correct at their end. Concrete alternative:
  `text-caption` is `--type-caption` at weight 400—differentiate on `color: var(--muted-foreground)` or the mono
  face (`text-mono-caption` ships), both real glyphs under `font-synthesis: none`.
- R-12 doc arm · CURE-NOW: one sentence in the typography register's documentation (the lane finds the register's
  home—DESIGN.md typography section and/or README fonts paragraph, wherever `text-caption` is documented) naming
  the four utilities as synthesis-dependent and stating that the library declares no `font-synthesis`.
- OPEN DESIGN ITEM (register in the ledger, not a ruling here): whether `text-caption`'s italic on running prose is
  retired at 10.0.0—a typographic decision on a shipped semantic utility; belongs to a typography wave.

### R-16 (KF-KC-4/-13, KC-5, KF-KE-30 producer half) · state9 DEAD · ANSWER + R-16-RIDER CURE-NOW (docs)
- Both asks landed at 8.0.0, unchanged at 9.0.0: (a) `.focus-ring:focus-visible` is one `outline` + `outline-offset:
  2px`—no `outline: none`, no `box-shadow`, NO `border-radius` (base.css byte 960/961, 3104 B; the `--radius-pill`
  write removed for exactly their reason, src/styles/utilities/base.css:130-135 "a focus indicator may not restate
  the element's shape"); (b) no bare `field-control` variant because the control went bare—`.field-control:
  focus-visible` moved from `box-shadow: var(--focus-ring-shadow); outline: none` to `outline: var(--focus-ring-
  width) solid var(--field-control-ink); outline-offset: 2px` + `--control-edge-ring` (glass-ui.css byte 6045,
  byte-identical 8↔9)—the box-shadow channel is theirs again. NO `.focus-ring-bare` (an alias for a utility
  already radius-neutral; the no-shims law). Contrast improved by our own measurement (0.30 shadow ring 1.91:1 →
  the perimeter rung). Measurement correction: their a11y-overrides byte 708 is the forced-colors sweep and carries
  no `border-radius` in any version—`--radius-pill` was bound at ONE site, not two. The 7.0.0 answer: do not
  adopt `.focus-ring` on a rectangular host; write the 8.0.0 rule with 7.0.0's tokens: `:focus-visible { outline:
  var(--focus-ring-width) solid color-mix(in oklab, var(--foreground) 48%, transparent); outline-offset: 2px; }`
  (literal 48%: `--ink-perimeter` does not exist until 8.0.0, where it is 0.48).
- R-16-RIDER · CURE-NOW (docs): MIGRATION.md `## 8.0.0` has no row for the focus reshape—add rows for the
  `.focus-ring` `--radius-pill` removal and `.field-control`'s focus moving from box-shadow to outline (visible
  breaks for a consumer that relied on the pill geometry or read `--focus-ring-shadow` as the control's paint),
  in the section's own table form with the dated-bracket convention for a late row.

## §B · Final amendments from the last two verifiers (ratified; they override the §A text where they touch it)

- R-2: mechanism corrected again—`dist/styles/index.css:1` declares `@layer theme, base, components, utilities;`,
  so on the path where Tailwind processes `@theme` into the `theme` layer the winner is picked by LAYER ORDER
  (`components` last), not by import order and not by "dropped/hoisted"; 38 imports, not 39. The cure (an unlayered
  consumer `:root`) is correct on both resolver paths. Cascade-reasoned, not painted—send it so labelled; no
  browser seat is owed for a consumer-side line.
- R-13: "typechecks unchanged" is OVERTURNED by `tsc --strict` (clean vs 7.0.0 d.ts; 3× TS2322 vs 9.0.0 d.ts —
  `Ref<T>` invariance on the model arg now keyed to `O['value']`, and `UseSelectionGroupReturn` became generic
  `<V = string>`; two new optional params `deform`/`onSelect` are additive). Tell them the bump is not free at the
  type level and the two one-line fixes: type the model ref at the option value type (`ref<Opt['value']>()`), and
  drop or parameterise a bare `UseSelectionGroupReturn` annotation—derivation working as intended. Four files
  name `useTabRovingFocus` at 8/9, not "the chunk plus two .d.ts". motion-core's export SET churned 7→8 beyond this
  row (useLeadTrail/useStaggerReveal/useTextHighlight/… absent at 8/9; ROUTE_*/VAPORIZE_*/dissolve* arrive)—one
  sentence in R-13 pointing them at MIGRATION's motion-core rows for their bump plan.
- R-12: the shipped binaries have ONE axis (`wght`), `post.italicAngle 0.0`, no `ital`/`slnt`—"enable the italic
  axis" is measurably unavailable; an italic pair is two upstream binaries, +49,076 B woff2 (≈ +65 KB base64, ~+49%
  on `fonts.css` at 132,840 B / 100,396 B gz) for four declarations; `text-mono-caption` and `--muted-foreground`
  both exist at the 7.0.0 pin (checked). 7.0.0's raw `@font-face` count of 12 = 9 rules + 3 README code fences.
  THE WORD IS RATIFIED: no italic face; the four utilities are synthesis dependencies.
- R-16: paint-measured now (7.0.0 rule takes a 6px host to 9999px; the 8/9 rule leaves 6px, outline tracking the
  corner); the prescribed 7.0.0 line computes the same oklab as the shipped 8/9 declaration—BUT it changes the
  ring's HUE (accent at 30% → neutral `--foreground` at 48%): the reply names that so a correct transcription is
  not filed as a colour regression. The compose-not-erase affordance is `styles/glass/control-edge.css`:
  `.glass-control-edge{box-shadow: var(--glass-rim-top), var(--glass-rim-bottom), var(--control-edge-inner, 0 0
  #0000), var(--control-edge-ring, 0 0 #0000)}` in `@layer components`—fill a slot. Bytes: both files 3104 B,
  selector at byte 960 at 8.0.0 AND 9.0.0; `--focus-ring-shadow` survives at 9.0.0 (15 references). At 9.0.0 the
  forced-colors sweep gained `.menu__trigger:focus-visible` (absent at 7.0.0)—a ledger note, not a reply line.
  R-16-RIDER takes the verifier's shape: ONE `_Focus_` block under `## 8.0.0` covering both classes (`.focus-ring`
  radius-pill/box-shadow → outline at 8.0.0; `.field-control` off box-shadow, `70dc0f06`).
- R-S2 (§2 item 6): the investigator's correction is OVERTURNED—the two 9.0.0 ceiling sites are `[data-reveal=
  "menu"]` and `[data-slot="select-content"]`; `.glass-overlay-plate[data-reveal="tooltip"]` has NO ceiling at 9.0.0;
  the tooltip arm exists only at HEAD (`src/styles/glass/overlay-plate.css:111/:118`). The correct correction to
  send: A-9 is not a `/timeline` item; it is TooltipContent's block ceiling, cured at HEAD (post-9.0.0), reaching
  them at the next cut—evaluate `/timeline` (A-8) alone in KF.W7. A-13 rider: STRUCK from the reply (their
  RETAINED-BY-POLICY is the "own the gradient" arm; closed both sides—ledger note only). A-14: "landed at HEAD
  (a314533a), not in the 9.0.0 tarball". README anchors: cite by section ("Design Tokens"), not
  :156.
- R-14: read counts added (9 / 11 / 1 readers, identical 7↔9)—the re-point bites, not merely resolves; both
  declaring files are plain unlayered `:root`, so the consumer's own `:root` wins by order. Keep the reply ASKING
  them to confirm the styles entry (a fact in their tree).
- R-15: the `--specular-angle` removal goes INTO the reply line (their four positional names become three at the
  bump), not only into our queue. Their BK count is nine occurrences over three lines; conclusion unchanged.

## §D · The cure wave that follows (lanes for the ledger's lane table; quartet form, ≤3 concurrent)

- Lane K · keyboard (R-8): `suspendShortcuts()` + `formatComboLabel()` + `LabeledShortcut` narrowing + the
  `defaultPrevented` guard + in-house enrolment of the modal overlays (measured by reka contract) + docblock
  contracts (ordering; unfiltered help list) + MIGRATION bracket (behaviour change) + witnesses in the existing
  keyboard tests (barrier, FIFO held, label form, esc-stack story exercised).
- Lane A · aurora (R-4, R-5, R-6, R-6-LIGHT a+b, O-26-INT-1): `AuroraConfig.alpha` JSDoc; the custom-property
  routing + two media arms in Aurora.vue's scoped block (verifier's measured shape); three wake guards +
  `update()` comment; `AuroraAtomsBase.seed` JSDoc; `light` JSDoc + `isAuroraPointerEnabled` impasto term (measure
  the impasto media first); envelope reset on the PRM transition; witnesses in the existing aurora/a11y/pointer-
  field tests (the implement seat names the files).
- Lane B · boolean cast (R-3): Collapsible `open: undefined`; Chip `modelValue: undefined` ONLY; LabeledSwitch
  `modelValue: undefined` + `modelValue?: boolean`; witnesses incl. the Chip `aria-pressed` guard; emitted-chunk
  assertion.
- Lane M · manifest + docs (R-7-RIDER, R-10-RIDER, R-11-RIDER, R-12 doc arm, R-15-RIDER, R-16-RIDER, A-3-CLASS
  scope note): every MIGRATION addition follows the file's own dated-bracket convention for late rows and sits
  under the major that shipped it (the lane MEASURES 8.0.0 vs 9.0.0 from the dists where the ruling says so);
  README/DESIGN/design-idioms edits as ruled; `docs/consumer-evidence/header-ribbon.md` dated deletion bracket;
  LEDGER (O-20) A-3-CLASS scope note (SFC half + consumer-readable manifest).
- Register (no lane): CURE-NEXT-MAJOR—R-6-LIGHT (c) union narrowing; A-3-CLASS (standing). Open design item —
  `text-caption` italic on running prose (typography wave). Owner—§C.
- Every lane: born-RED witnesses on bytes, gates exactly 60, nothing minted, `.published-roster` untouched (no
  @theme/@utility departs), `.bundle-ratchet` rebind only if dist bytes move (Lanes A/B/K move dist → one deliberate
  rebind at the close, committed-tree datum), shared-tree discipline (no seat commits; driver commits by pathspec).

## §C · Cross-cutting, owner-reserved (register only; not taken here)
- MIGRATION.md joining `files`—every "we documented it" answer is unreachable at any consumer's pin by construction.
- A-3-CLASS 10.0.0 cut; the four CURE-NEXT-MAJOR rulings; any publish.
