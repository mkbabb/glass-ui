# AW.W25 - Primitives perfection (the cross-atom affordance/state/motion/a11y sweep)

## State

**Name**: W25 - Primitives perfection (the cross-atom affordance/state/motion/a11y sweep)
**Opens after**: W13 (the at-rest affordance point-fixes: gold-audacious foreground, input/select border floor, standard-slider track-fill) + W18 (the `[aria-invalid]` ring widening)
**Agents**: 1 serial
**Hard gate** (`proof:primitive-affordance`): every named interactive atom carries the four-state contract (hover ∧ active-press ∧ focus-ring ∧ disabled) AND the consistent iOS-26 press-spring token (`.tap-squish`/`--scale-press*` on a `--spring-*` channel, PRM-reset reachable); every named form atom + CTA resolves an AA contrast floor at rest (the gold-audacious foreground clears 4.5:1, the input/select resting border clears the 8%α affordance floor, the standard slider paints a perceptible filled range left of the thumb) and these floors hold uniformly across the atom set, not just at W13's point-fix sites; the Checkbox renders the dash (`<Minus>`) — not a check — at `data-state="indeterminate"`; no multi-line/stepper form atom resolves a `9999px` radius; the overlay-band surfaces (Toast, Command) carry a `glass-*` tier; Alert + Toast resolve the `success`/`warning`/`info` tone variants from the existing tokens.
**Status**: planned

## 2a. Goal criterion

This wave succeeds if EVERY interactive primitive speaks ONE design+interaction language: the four-state contract (hover, active-press, focus-ring, disabled) is present on each, the iOS-26 press-spring fires consistently from one token, the AA contrast + affordance floors (the gold-audacious foreground, the input/select border, the slider track-fill — W13's point-fixes) hold UNIFORMLY across the atom set, the form atoms stop speaking three radius dialects, Switch/Checkbox join the glass material vocabulary, the Checkbox indeterminate bug is fixed, the off-contract overlay surfaces join the floating-glass tier, and Alert/Toast carry the semantic tones the demo currently fakes. It is ONE comprehensive KISS wave routing every atom onto recipes that ALREADY exist (`.tap-squish`, `.focus-ring`, `transition-control`, `--scale-press*`, the 5-rung glass ladder, the `--{success,warning,info}` tokens, the spectrum slider's proven track-fill) — token/CSS/CVA-class-only where possible, NO new primitive, NO forked control, NO new global token unless an existing rung genuinely cannot carry the floor.

## 3. Scope

The scope is the cross-atom CONSISTENCY sweep. Each bullet routes ≥2 atoms onto one existing recipe; none invents a primitive.

1. **Press-spring universalization (the iOS-26 motion canon — the SCALE-TRANSFORM axis).** Compose the existing PRM-bracketed `.tap-squish` (`utilities.css:201-216`, `scale: var(--scale-press)` returned by `--spring-snappy`) onto every interactive atom that has zero press feedback at HEAD: Checkbox (`Checkbox.vue`), RadioGroupItem (`RadioGroupItem.vue`), Switch thumb (`Switch.vue`), SelectTrigger (`SelectTrigger.vue`), TabsTrigger (`TabsTrigger.vue`), AccordionTrigger (`AccordionTrigger.vue`), the NumberField steppers (`NumberFieldInput.vue`/`NumberFieldIncrement`/`Decrement`). Button keeps its `active:scale-[var(--scale-press-btn)]` (`button/index.ts:9`) but moves it onto the canonical spring channel so it springs like the slider rather than on `--ease-standard`. One source — no per-atom transform re-derivation. (Born-RED: 5 of these atoms have no press transform; grep `active:scale|scale-press` hits only button/toggle/slider/progress at HEAD.) **Two press-feedback axes, one owner each:** W25 owns the SCALE-TRANSFORM axis (the `.tap-squish` geometric squish above); the press SPECULAR-INTENSITY axis (the `.glass-material` `::before` catch-light intensity lifting on `:active`/`:hover` in lockstep with the press) is W22-OWNED (W22 §3 item 5 — the specular rides the press/hover state machine uniformly across every glass surface). W25 does NOT re-derive a parallel material-light state machine; the squish + the specular-lift fire on the SAME press rung but are sourced from their distinct owning waves (W25 the transform, W22 the material-light), so no double-write and no forked press machinery.
2. **Four-state contract + focus-ring completion.** Add the canonical `.focus-ring` to the two atoms that carry NO focus paint — AccordionTrigger (`AccordionTrigger.vue:26`, UA-outline + `hover:underline` only at HEAD) and CollapsibleTrigger — so every interactive atom carries the full hover/active/focus/disabled contract. Audit Button/Badge/Input/Switch/Tabs/Dialog/Tooltip to confirm the four states are each present (hover state, the §1 press, the `.focus-ring`, the `disabled:opacity-disabled`/`pointer-events-none` rung) and add the missing rung where one is absent. The focus-ring stays the token-first CSS utility (`utilities.css:140`, keyed off `--focus-ring-shadow`) — the deliberate divergence from inline `focus-visible:ring` is preserved, not swapped.
3. **Transition-discipline uniformity.** Migrate the bare `transition-colors` atoms — Switch (`Switch.vue:29`), Toggle, Badge, AccordionTrigger (`AccordionTrigger.vue:26`), ToastAction — to the canonical `transition-control` so border/shadow/focus/transform animate uniformly across the set (not just color). One recipe, ~5 sites.
4. **Form-radius unification (the geometry fix).** Mint one non-pill field rung `--radius-field` (≈ `var(--radius-2xl)`/1rem) and carve `.input-pill` radius by line-count: single-line controls (Input, SelectTrigger) keep the `9999px` pill; Textarea (`Textarea.vue:65`, currently inherits the full pill → grotesque stadium ends on a multi-line box) + NumberFieldInput adopt `--radius-field`; NumberFieldInput also migrates off solid `bg-background`/`border-input` onto the `.input-pill` glass recipe (at the `--radius-field` rung) so it reads as an Input sibling, not a different design system; Checkbox/Tabs move off raw `rounded-sm` (4px) to a semantic `--radius-control`. Token + class only; no new primitive. (Born-RED: Textarea resolves `9999px` at HEAD.)
5. **Switch + Checkbox onto the glass material vocabulary.** Switch (`Switch.vue:28-35`) — the thumb composes a `--glass-highlight` + the spring on travel (replace the default-eased `transition-transform` + the hardcoded `h-6 w-11`/`h-5 w-5` literals with token geometry on a `--spring-*` channel); the track adopts a subtle glass-tint rung instead of flat `bg-input`. Checkbox (`Checkbox.vue`) — a glass-tint checked fill instead of flat `border-primary`. These two atoms are the furthest from the `--glass-*`/`--spring-*` language the slider + dock already speak; bring them onto it with EXISTING tokens (no new highlight literal).
6. **Checkbox indeterminate `<Minus>` branch (the bug).** `Checkbox.vue:29` renders `<Check>` unconditionally; reka 2.9's `CheckboxIndicator` force-mounts on `data-state="indeterminate"` too, so an indeterminate box shows a checkmark. Branch the indicator on `data-[state=indeterminate]` to render `<Minus>` (the canonical shadcn-vue dash). (Born-RED: no `Minus`/`indeterminate` handling at HEAD — grep confirms.)
7. **Overlay-band material consistency.** Bring the two off-contract overlay surfaces onto `glass-floating` (the shared overlay substrate every sibling — Dialog/Sheet/Popover/DropdownMenu/Combobox — already uses): Toast (`Toast.vue:38`, flat `bg-background`/`shadow-modal` at HEAD) and Command (`Command.vue:26`, flat `bg-popover` at HEAD). One material-consistency pass across the overlay band. Alert + Badge correctly STAY flat (content-band) — leave them.
8. **Semantic-tone parity.** Add `success`/`warning`/`info` to `alertVariants` (`alert/index.ts`, only `default`/`destructive` at HEAD) and to the Toast `variant` (`Toast.vue:15`, same two at HEAD), reusing the existing `--{success,warning,info}` + `-foreground` tokens (Badge already ships them — `badge/index.ts:21-26`). Retire the demo's faked alert variants (`feedback/alert.vue`) onto the real CVA tones.
9. **Tabs base indicator wiring.** Wire the existing `TabsIndicator` spring pill into the base default `<Tabs>` so the reka atom matches its own indicator primitive (`TabsIndicator.vue` `bg-secondary/80` + `ease-spring-snappy`), instead of the bare text-color-only active state (`TabsTrigger.vue:22` at HEAD). The polished pill currently lives only in custom BouncyTabs; the base under-delivers vs its own primitive.
10. **Affordance-floor re-assertion (composes over W13, does NOT re-own).** W13 owns the three at-rest point-fixes (gold-audacious foreground → AA, the input/select border → above the 8%α floor, the standard slider → track-fill). W25 does NOT re-fix them; its gate (§6) RE-ASSERTS the floors hold UNIFORMLY across the four-state contract — i.e. the AA contrast floor + the affordance floor + the track-fill are verified as part of the cross-atom contract, sequenced after W13's fixes land. If the §1-§9 sweep introduces an atom that newly falls below a floor, W25 lifts it onto the SAME W13 token (no new token, no fork).

## 3a. Triumvirate Dispatch

Trigger a triumvirate when:

- the form-radius carve (`--radius-field`/`--radius-control`) requires re-tuning the `.input-pill` BORDER (W13's owned surface) rather than only its RADIUS declaration — the file bounds collide with W13's border carve in `glass.css` and the disjoint-lines assumption breaks;
- composing `.tap-squish` onto an atom regresses its existing `transition`/`data-state` machinery (e.g. the Switch thumb's `data-[state=checked]:translate-x-5` fights the press scale) such that a third iteration cannot reconcile the spring with the state-translate — escalate to re-derive the thumb's transform composition rather than stack a third transform;
- the indeterminate `<Minus>` branch does not render because reka 2.9's `CheckboxIndicator` force-mount semantics differ from the assumed `data-state` contract (the bug is in the indicator mount, not the glyph branch) — a non-local-recoverable reka-binding failure, escalate per the binding-verification memory note (only e2e catches it);
- bringing Toast onto `glass-floating` collides with W26's Toast refactor (`useForwardPropsEmits` + single-`Toaster` provider hoist, if the reconciler keeps a W26 idiom wave) on the same `Toast.vue` lines — sequence or fold rather than double-write;
- the affordance-floor re-assertion (§10) finds a floor that W13 did NOT actually lift (W13 closed but a floor regressed) — that is a W13 reopen, not a W25 local edit; escalate to the orchestrator.

## 4. File Bounds

| File | Access |
|---|---|
| `src/styles/tokens.css` | modify-carve (mint `--radius-field` + `--radius-control` rungs ONLY — no other token edit; if a press/glass token must be added the §3a trigger fires) |
| `src/styles/theme.css` | modify-carve (the `@theme` bridge for `--radius-field`/`--radius-control` only) |
| `src/styles/glass.css` | modify-carve (the `.input-pill` RADIUS carve by line-count ONLY — W13 owns the border-color/alpha; W25 touches only the radius declaration) |
| `src/styles/utilities.css` | modify-carve (only if `.tap-squish`/`transition-control` composition needs a shared selector hook — prefer composing the existing classes at the SFC; no recipe edit) |
| `src/components/ui/checkbox/Checkbox.vue` | modify |
| `src/components/ui/switch/Switch.vue` | modify |
| `src/components/ui/radio-group/RadioGroupItem.vue` | modify |
| `src/components/ui/select/SelectTrigger.vue` | modify |
| `src/components/ui/tabs/TabsTrigger.vue` | modify |
| `src/components/ui/tabs/Tabs.vue` | modify (wire TabsIndicator into the base default) |
| `src/components/ui/accordion/AccordionTrigger.vue` | modify |
| `src/components/ui/collapsible/CollapsibleTrigger.vue` | modify |
| `src/components/ui/number-field/NumberFieldInput.vue` | modify |
| `src/components/ui/textarea/Textarea.vue` | modify-carve (the `input-pill` → `--radius-field` adoption only) |
| `src/components/ui/button/index.ts` | modify-carve (the base `active:scale` → canonical spring channel ONLY — W13 owns the `gold-audacious`/`primary-audacious` variant FOREGROUND strings; disjoint lines, sequence after W13) |
| `src/components/ui/toggle/index.ts` | modify-carve (`transition-colors` → `transition-control` only) |
| `src/components/ui/badge/index.ts` | modify-carve (`transition-colors` → `transition-control` only) |
| `src/components/ui/toast/Toast.vue` | modify-carve (the flat `bg-background`/`shadow-modal` → `glass-floating` + the `success`/`warning`/`info` variant rows only) |
| `src/components/ui/command/Command.vue` | modify-carve (the flat `bg-popover` → `glass-floating` only) |
| `src/components/ui/alert/index.ts` | modify (add the three tone variants) |
| `demo/stories/primitives/*.vue` + `demo/stories/feedback/alert.vue` | modify (retire the faked alert tones; exercise the new press/indeterminate/radius/tone affordances) |

Do NOT touch: `src/components/ui/button/index.ts` variant-foreground strings (W13's gold-audacious/primary-audacious — W25 touches ONLY the base `active:scale` channel), `src/styles/glass.css .input-pill` border-color/alpha (W13's), the spectrum slider rules (W13 + the slider's own spectrum block — W25 does NOT touch the slider; the track-fill is W13-owned and re-asserted only by W25's gate), `src/components/ui/card/` (W24's), `src/components/custom/` (the custom atoms are not in the ui-primitive sweep), reka internals.

## 4a. Disjointness

Single agent unit; no intra-wave path contention. Cross-wave: W25 shares `button/index.ts` with W13 — DISJOINT LINES (W13 owns the `gold-audacious`/`primary-audacious` variant foreground strings; W25 owns the base `active:scale` spring channel) — sequence W25 AFTER W13 and flag the same file for the same agent or a clean rebase. W25 shares `glass.css` with W13 — DISJOINT LINES (W13 owns the `.input-pill` border-color/alpha; W25 owns the `.input-pill` radius carve) — same sequencing. W25 shares NO path with W24 (W24 owns `card/` + the card rungs of `cards.css`; W25's atom set excludes the card). If the reconciler keeps a W26 idiom wave touching `Toast.vue` (`useForwardPropsEmits` hoist), sequence W25's Toast material carve BEFORE or fold it — flagged in §3a.

## 4b. Worktree Plan

Single agent unit — no sibling worktree required; the unit writes on clean main AFTER W13/W18 land (the shared-file disjoint-line sequencing in §4a).

## 5. Agent Units

### AW.W25.a The cross-atom affordance/state/motion/a11y sweep

- Goal: every interactive primitive carries the four-state contract + the consistent press-spring, the affordance floors hold uniformly, the form atoms speak one radius language, Switch/Checkbox join the glass vocabulary, the indeterminate bug is fixed, the overlay band is consistent, and Alert/Toast carry the semantic tones.
- Mechanism: compose the existing `.tap-squish` onto the ~7 press-less atoms + Button's spring channel; add `.focus-ring` to Accordion/Collapsible triggers; migrate the `transition-colors` atoms to `transition-control`; mint `--radius-field`/`--radius-control` and carve `.input-pill` radius by line-count (Textarea + NumberFieldInput → field rung, NumberFieldInput onto the glass recipe); bring Switch/Checkbox onto `--glass-*`/`--spring-*`; branch the Checkbox indicator to `<Minus>` on indeterminate; bring Toast + Command onto `glass-floating`; add `success`/`warning`/`info` to Alert + Toast from the existing tokens; wire TabsIndicator into base Tabs; exercise it all in the primitives/feedback stories.
- Files: the §4 table (all `modify`/`modify-carve` paths).
- Sub-gate: a grep + computed-style probe asserts each named atom composes a press-rung (`.tap-squish`/`--scale-press*` on `--spring-*`) ∨ a documented exemption, AND `.focus-ring`, AND a semantic-radius token, AND `transition-control`, with the PRM reset reachable; a mounted Checkbox at `indeterminate` renders `<Minus>` not `<Check>`; no multi-line/stepper atom resolves `9999px`; Toast + Command resolve a `glass-*` tier; Alert + Toast resolve the three new tones; the W13 floors (gold-audacious AA, input border, slider fill) re-pass uniformly; `vue-tsc --noEmit` green.

## 6. Hard Gate

Gate id: `proof:primitive-affordance`. Each condition is born-RED on HEAD (the verified HEAD state is cited).

1. **Consistent press-spring.** A grep + computed-style probe over each named interactive atom (Checkbox, Radio, Switch-thumb, SelectTrigger, TabsTrigger, AccordionTrigger, NumberField steppers, Button) asserts it composes the press-spring — `.tap-squish` or `--scale-press*`/`--scale-press-btn` on a `--spring-*` channel — and that the `prefers-reduced-motion: reduce` reset is reachable on each. Pre-fix 5+ atoms have no press transform (grep `active:scale|scale-press` hits only button/toggle/slider/progress). (Born-RED.)
2. **Four-state contract present.** A per-atom probe asserts each named interactive atom carries all four states: a hover rung, the §1 active-press, the `.focus-ring` focus paint, and the `disabled:opacity-disabled`/`pointer-events-none` disabled rung. AccordionTrigger + CollapsibleTrigger newly carry `.focus-ring` (pre-fix UA-outline + `hover:underline` only — `AccordionTrigger.vue:26`). (Born-RED.)
3. **AA contrast + affordance floors (re-asserting W13, uniform).** A computed-contrast probe asserts the `gold-audacious` rest text clears 4.5:1 (AA) over its rest substrate in light mode; a computed-alpha probe asserts the resting `.input-pill` + Select-trigger border clears the 8%α affordance floor; a computed-style differential asserts the standard slider's `.slider-range` ≠ `.slider-track` by a perceptible margin (the filled range reads). These compose over W13's fixes — the gate fails RED if any floor regressed after the §1-§9 sweep. (Born-RED on raw HEAD pre-W13; re-asserted post-W13 across the atom set.)
4. **Checkbox indeterminate dash.** A mount-and-assert probe sets a Checkbox to `indeterminate` and asserts the rendered glyph is `<Minus>` (the dash), NOT `<Check>`. Pre-fix `Checkbox.vue:29` always renders `<Check>`. (Born-RED.)
5. **Form-radius canon.** A computed-radius probe asserts NO multi-line/stepper form atom resolves `9999px`: Textarea + NumberFieldInput resolve the shared `--radius-field`; single-line Input + SelectTrigger keep the pill. Pre-fix Textarea resolves `9999px` (`Textarea.vue:65` inherits the full `.input-pill` pill). (Born-RED.)
6. **Overlay-band material.** A computed-style probe asserts Toast and Command resolve a `glass-*` tier (the floating-band backdrop-filter + glass tokens), not the flat `bg-background`/`bg-popover` at HEAD (`Toast.vue:38`, `Command.vue:26`). (Born-RED.)
7. **Semantic-tone parity.** A CVA-resolution probe asserts `alertVariants` and the Toast `variant` each resolve `success`/`warning`/`info` to the `--{success,warning,info}` + `-foreground` tokens, and the demo's faked alert tones are retired onto the real variants. Pre-fix both carry only `default`/`destructive` (`alert/index.ts:12-14`). (Born-RED.)
8. **Switch material + Tabs indicator.** A computed-style probe asserts the Switch thumb transition reads a `--spring-*` channel (not default-eased `transition-transform`) and the track resolves a glass-tint rung; the base `<Tabs>` active trigger resolves the `TabsIndicator` pill (not the bare text-color change). (Born-RED: `Switch.vue:34` is default-eased; base Tabs is text-color-only.)
9. **Typecheck green.** `npm run typecheck` (`vue-tsc --noEmit`) passes with the new tone variants + the `--radius-field`/`--radius-control` tokens + the indeterminate branch.

## 7. Format And Lint Cadence

Docs-only wave authoring (this file). At wave EXECUTION: `npm run typecheck` after each integration batch (the press-spring batch, the radius batch, the overlay/tone batch) and before close; `git diff --check` on the staged hunks. The `proof:primitive-affordance` runtime gate + the typecheck are the binding checks (no separate prettier/eslint proof in the matrix). The binding-verification memory note applies — the Checkbox-indeterminate + Switch material changes touch reka bindings, so the execution pass runs the rendered-effect probe (gate 4 + gate 8), not just `vue-tsc` (vue-tsc misses stale reka bindings). For THIS docs-authoring pass: `git diff --check` on the wave file.

## 8. Verification Artefacts

- `docs/tranches/AW/audit/W25-primitive-affordance.md` — the per-atom four-state + press-spring matrix (which recipe each atom now composes), the AA-contrast + border-alpha + slider-differential re-assertion table (post-W13), the Checkbox-indeterminate rendered-glyph proof, the form-radius computed-radius table (Textarea/NumberField → `--radius-field`; Input/SelectTrigger → pill), the Toast/Command `glass-*` tier proof, and the Alert/Toast tone-resolution table.
- Playwright screenshots at 1440×900 under `docs/tranches/AW/audit/screens/`: each named atom mid-press (the squish), the Checkbox indeterminate dash, the Textarea with `--radius-field` corners, the Toast/Command on `glass-floating`, the Alert/Toast in all five tones, the base Tabs with the indicator pill.
- The green `proof:primitive-affordance` run-id cited in the wave Status at close.

## 9. Commit Plan

- `feat(primitives): universal iOS-26 press-spring (.tap-squish) + four-state + focus-ring` — the press/focus/transition sweep across the ~7 atoms + Button's spring channel; body lists the atoms routed onto the canonical recipe.
- `feat(forms): --radius-field/--radius-control geometry unification` — the `.input-pill` radius carve + Textarea/NumberFieldInput onto the field rung + NumberFieldInput onto the glass recipe; body cites the Textarea `9999px` stadium defect.
- `feat(switch,checkbox): glass material vocabulary + indeterminate <Minus> fix` — the Switch/Checkbox glass-tint + spring + the indeterminate-bug branch; body cites the `Checkbox.vue:29` always-`<Check>` bug (born-RED gate 4).
- `feat(overlay): Toast + Command onto glass-floating` — the overlay-band material carve.
- `feat(feedback): success/warning/info tones on Alert + Toast` — the CVA tone extension + retiring the demo fakes; body cites the existing `--{success,warning,info}` tokens.
- `feat(tabs): wire TabsIndicator into the base default` — the base-Tabs indicator pill.
- `test(gate): proof:primitive-affordance` — the runtime gate + the audit doc + screenshots.
- `docs(aw): W25 status → complete with the green run-id` — the wave-close status commit.

## 10. Dependencies

- **Depends on**: W13 (the at-rest affordance point-fixes W25's gate re-asserts uniformly; W25 shares `button/index.ts` + `glass.css` with W13 on disjoint lines — sequence after) + W18 (the `[aria-invalid]` ring widening; the focus/invalid rungs must already be wide before the four-state audit asserts them).
- **Blocks**: nothing — the primitives are leaf surfaces. If the reconciler keeps a W26 idiom wave touching `Toast.vue`, that wave sequences relative to W25's Toast carve (§3a). The W27 close registers `proof:primitive-affordance` in the gate matrix.

## 11. Archaeology

Not a revisit. The canonical interaction recipes (`.tap-squish`, `.focus-ring`, `transition-control`, the `--scale-press*` ladder, the 5-rung glass material, the `--{success,warning,info}` tokens, the spectrum slider's track-fill) all pre-exist and are correct; the defect is UNEVEN application across the atom set — the press-squish lives on 4 of ~11 interactive atoms, the focus-ring is absent on 2 triggers, three radius dialects fracture the form family, Switch/Checkbox sit furthest from the glass vocabulary, and the Checkbox indeterminate always-`<Check>` is a confirmed live bug. W25 is the DRY consolidation that routes every atom onto the existing canon in ONE comprehensive KISS wave (the research band's W24+W25 collapsed), not a rewrite and not a new-primitive proliferation. The named at-rest affordance bugs (gold-audacious, input border, slider fill) are W13-owned; W25 composes over them and re-asserts the floors uniformly, it does not re-own them.
