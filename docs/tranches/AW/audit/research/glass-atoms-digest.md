# Glass-atoms perfection research (8-agent)

## SYNTHESIS

All facts confirmed. Critical findings: W12 already books the `light-dark(light-dark())` collapse (Brief 2 flags this as stale — the double-nest doesn't exist at HEAD, so W12 §3.3 is a no-op to flag). Textarea inherits full `input-pill` pill radius (the stadium defect). Card.vue has the comment about `--mouse-x/--mouse-y` but no pointer listener. Card subcomponents hardcode `p-6`/`gap-y-1.5`. W21 is the close, opens after W0-W20 — my new waves W22+ must re-sequence it.

I have everything needed. Writing the synthesis.

---

# AW Glass-Atoms Perfection — Totality Plan

The eight research lanes converge on one verdict: **glass-ui's material spine, card surface, and glass ladder are SOTA; the defect is uneven application of that spine across the interactive atoms, plus three Baseline-2025 capabilities left unused.** This is a DRY consolidation + targeted-fold tranche, not a rewrite. Below are the four faction plans, then the minimal wave set that perfects all four without proliferation.

A boundary note first: AW already runs **W0-W21** (W21 is the close). The named affordance bugs — gold-audacious cream-on-cream text, the 8%α input/select borders, the standard slider fill — are **already owned by W13** (`proof:affordance-contrast`), and the `[aria-invalid]` ring widening by **W18**. The glass-panel tier-collapse + demo backdrop is **W12**. The new glass-atoms waves are **W22+**, sequence after W13/W18 where they share file bounds, and the **close (W21) moves to last** (renumbered or re-anchored to open after W26).

One stale claim to drop: Brief 2 and W12 §3.3 both reference a double-nested `light-dark(light-dark())` on `--glass-bg-*`. At HEAD those tokens carry a single `light-dark()` (`--card` at tokens.css:1369, glass-bg as `color-mix(--card …)` at :645-649). **The double-nest does not exist** — strike that sub-item from W12 and do not re-seed it.

---

## (1) THE GLASS-MATERIAL PERFECTION PLAN (beyond AV.W15)

The material is deep: 5-rung alpha-monotonic ladder, pointer-anchored moving specular (`@property`-typed), full-perimeter edge-light rim, content-aware under-shadow (`[data-over-content]`), `@supports`-gated refraction garnish. The gap is **isolation, not absence**: SOTA folds sit on opt-in classes/single tiers, not unified across primitives; and three Baseline-2025 capabilities (`corner-shape: squircle`, baked convex-lens refraction, content-derived tint) are unused.

The spine fix is to **unify first, then extend**. Promote the moving-specular + rim into the ladder itself (or a single `.glass-material` mixin the five rungs compose) so floating/overlay/dock/dialog/sheet/popover all carry the same catch-light + rim without per-component wiring. Once one grammar exists, the extensions ride it:

- **Convex-lens refraction as a first-class gated asset.** Ship a named `#glass-refract` SVG filter (squircle profile `y=⁴√(1−(1−x)⁴)`, Snell n=1.5, baked `feImage`→`feDisplacementMap`→`feBlend screen` specular) as a library asset so `.glass-refract` works out-of-the-box. Keep the existing `@supports (backdrop-filter: url(#…))` gate — it's Chromium-only, blur stays substrate. Do NOT promote to the card/primitive substrate (resize-expensive, correctly PE-only).
- **`corner-shape: squircle` progressive enhancement.** `@supports`-gated squircle on `.glass-card`, `.glass-pill`, `.glass-dock`, `.btn-pill` over the existing `border-radius`. The literal iOS-26 corner geometry; `backdrop-filter`/shadows follow it; degrades to round at zero cost. Live Chromium support confirmed (`CSS.supports('corner-shape','squircle')` → true).
- **Directional gradient edge-light.** Today's rim (`--glass-edge-light`) is a uniform inset stroke; the 2025 iOS-26 idiom catches light *directionally* (bright top-left → fading bottom-right). Add a `--glass-edge-gradient` token (masked `::before` or `border-image: linear-gradient`) layered over the uniform rim on the floating/card register, dark-arm via the existing `--shadow-color` flip. Composes with the rim, does not replace it.
- **Content-aware adaptive tint.** Mint `--glass-tint-source` + a `color-mix(in oklab, … ≤30%)` recipe (mwg-safe; never lightness-shift in `oklch(from …)` — browsers don't gamut-map yet) so a surface can tint toward a consumer-provided dominant backdrop color. Extends `[data-over-content]` from an under-shadow swap into a tint axis. Default = today's warm-white (zero surface delta).
- **Specular as the universal interaction-light.** Make the specular-intensity lift ride the **same** press/hover state machine as the scale-press squish, so material-light and motion-spring fire in lockstep across Button/dock/slider/switch (references the AV spring wiring, does not re-derive it).
- **Demo substrate that proves it.** The material only sings over a busy backdrop — add a glass-over-aurora/goo-blob story so every fold is screenshot-verifiable. (This is the W12 backdrop-staging concern; coordinate, don't duplicate.)

Negative findings (do NOT re-litigate): the `srgb` color-mix glass ladder is Baseline-correct; an `oklch`/`oklab` tint pass is opportunistic, not load-bearing. Scrollbar utilities, `@container-size`, stock v4.2 palettes are all rejected — the repo's existing idioms are at or above the v4.3 bar.

---

## (2) THE GLASS-CARD PERFECTION PLAN

The card material is correct (per Apple's own guidance a content-layer card at rest over a flat page *should* be a near-opaque tier that only reads as glass over a busy backdrop). Three real gaps:

- **Idiom drift off shadcn-2025.** The card has none of: a `--card-spacing` token (subcomponents hardcode `p-6` × 3 + `gap-y-1.5`), a `data-size` rung, a `CardAction` slot, an `@container/card-header` reflow grid, or `ring-1` edge. Adopt `--card-spacing` driving gap+padding from one knob; add `data-size="sm"`; add a `CardAction` slot with `has-data-[slot=card-action]:grid-cols-[1fr_auto]` header reflow (top-right control — used by demo + speedtest metric cards, ≥2 consumers). Pure structure/CVA; the glass tier system is untouched.
- **Resting glass-card has no hover-elevation.** Only `cartoon` lifts; the plain `surface="glass"` card is inert on hover (the specular glints but the plate doesn't rise). Give it a token-gated `translate: var(--lift-sm)` + one shadow rung up, reusing the `cartoon-surface` longhand-`translate`+`box-shadow` mechanism on `--spring-bouncy`/`--ease-apple` — do not fork. Opt-in via an `interactive`/`hover` prop so static cards stay flat (the `.glass-card` "no hover lift" *utility* contract at glass.css:172 is preserved; the *component* opts in).
- **The dormant specular seam.** Card.vue applies `glass-specular-track` but ships **no** `--mouse-x/--mouse-y` write (only a code comment), so the AV.W15 headline catch-light is centred-static on every card. Add the ≤6-LOC pointer listener (the same seam DockIconButton uses) behind the `hover`/`interactive` opt-in. PRM already pins it centred.
- **Directional edge-light** (shared with the material plan, applied to the card's floating register).
- **The cream-read fix is the content/navigation-layer split.** A card is a content-layer object; its separation cue on a flat page must be the under-shadow + a legible opaque ring (shadcn's `ring-foreground/10` ≈ 10% on an *opaque* edge, not the cream-matching glass border), leaning on `--glass-under-shadow-default` (already wired) as the primary lift — NOT the invisible-on-cream translucency. The tier ladder still reads over W12's busy backdrop. This is the card-specific complement to W13's input-border lift.

Demo close: extend `card.vue` to show an interactive `<Card hover>` row, a `CardAction` header, and the ladder over the W12 backdrop.

---

## (3) THE PRIMITIVES PERFECTION PLAN (affordance / state / motion / a11y sweep)

Five independent lanes (primitives-perfection-1/2, atoms-cohesion, reka-idiom, shadcn-cva) converge on the **same** defect set. The canonical recipes already exist (`.tap-squish`, `.btn-interactive`, `.focus-ring`, `transition-control`, `--scale-press`, the semantic radius tokens) — the work is **routing every atom onto them**.

**Motion — press-spring universalization.** The iOS "tap-squish" exists on only 4 atoms (Button, Toggle-card, Slider, Progress). These ~7 have zero press feedback: Checkbox, Radio, Switch-thumb, SelectTrigger, TabsTrigger, AccordionTrigger, NumberField steppers. Compose the PRM-bracketed `.tap-squish` (`utilities.css:201`) onto each. Button also swaps its ad-hoc `active:scale` (on `--ease-standard`) for the canonical spring recipe so it springs like the slider. One source, ~7 sites.

**Geometry — radius unification.** The atoms speak three corner dialects: `.input-pill` = 9999px (Input/Textarea/SelectTrigger), `rounded-input` = 10px (NumberFieldInput), `rounded-sm` = 4px (Checkbox/Tabs). Two concrete defects: **Textarea inherits the full 9999px pill** → grotesque stadium ends on a multi-line box (confirmed `Textarea.vue:65`); **NumberFieldInput** is solid `bg-background`/`border-input`, reading as a different design system from Input. Fix: mint one non-pill `--radius-field` (≈ 1rem) rung; single-line (Input, SelectTrigger) keep pill; Textarea + NumberFieldInput adopt `--radius-field` and NumberFieldInput migrates onto the `.input-pill` glass recipe so it reads as an Input sibling; Checkbox/Tabs move off raw `rounded-sm` to a semantic `--radius-control`. Token-only; no new primitive.

**Material — Switch/Checkbox onto the glass vocabulary.** These are the two atoms furthest from the `--glass-*`/`--spring-*` language. Switch: thumb composes a `--glass-highlight` + the spring on travel (currently default-eased `transition-transform`, hardcoded `h-6 w-11`/`h-5 w-5` off the token system); track adopts a subtle glass-tint rung instead of flat `bg-input`. Checkbox: a glass-tint checked fill.

**Bug — Checkbox indeterminate renders a checkmark.** `Checkbox.vue:29` always renders `<Check>`; reka 2.9's indicator force-mounts on `data-state="indeterminate"` too, so an indeterminate box shows a check. Branch on `data-[state=indeterminate]` to render `<Minus>`. Born-RED gate. (Confirmed: no `Minus`/`indeterminate` handling at HEAD.)

**Affordance — gold-audacious + 8%α borders + slider fill.** Owned by **W13** (`proof:affordance-contrast`); re-confirmed quantitatively (gold-audacious ~1.1:1 cream-on-cream; `.input-pill` resting border ~8%α). The new waves compose *over* W13's border/contrast tokens — sequence after W13.

**a11y — focus + transition discipline.** AccordionTrigger + CollapsibleTrigger carry **no** `.focus-ring` (UA outline + `hover:underline` only) — a real keyboard-a11y gap. Add `.focus-ring`. Migrate bare `transition-colors` atoms (Switch, Toggle, Badge, Accordion, ToastAction) to `transition-control` so border/shadow/focus animate uniformly. Replace `notification/Notification.vue:25` `hover:bg-white/10` (paints wrong in light mode) with a `--surface-tint-*` rung. NumberField label-binding + StatusDot/SortableHandle role contracts are already documented in CLAUDE.md — leave.

**Overlay-band material — Toast + Command off-contract.** Confirmed: Toast (`Toast.vue:38`) paints flat `bg-background`/`shadow-modal`; Command (`Command.vue:26`) flat `bg-popover` — both are overlay-band surfaces that every sibling (Dialog/Sheet/Popover/DropdownMenu/Combobox) renders as `glass-floating`. Bring both onto `glass-floating`.

**Semantic-tone parity.** `alertVariants` has only `default`/`destructive` (confirmed) — the demo *fakes* warning/info/success. Toast has only `default`/`destructive`. Badge already ships `success/warning/info` on existing tokens. Add the 3 tones to Alert + Toast reusing `--{success,warning,info}` + `-foreground`; retire the demo fakes.

**Tabs base under-delivers.** Base reka `<Tabs>` active state is a bare text-color change with no `TabsIndicator` wired; the spring pill lives only in custom BouncyTabs. Wire `TabsIndicator` into the base default so the atom matches its own indicator primitive.

**Open decisions for the orchestrator** (atoms-cohesion flagged): (a) text-input radius — the brief recommends pill for single-line, `--radius-field` for multi-line/stepper (resolves the Input-vs-NumberField disagreement); (b) Switch-thumb press — scale the thumb or document it press-exempt (the state-change *is* the feedback); (c) Toast tier — `glass-floating` (lighter, on-brand) recommended over `glass-overlay`.

---

## (4) THE reka / shadcn / Tailwind-v4.3 / mwg IDIOM PLAN (+ binding sweep)

**Binding-correctness sweep is mostly clean at HEAD** (source-verified against reka 2.9.7): `Toggle` v-model (`modelValue`, not legacy `:pressed`), `Combobox` (searchTerm moved to `ComboboxInput` v-model — glass-ui forwards `ComboboxRootProps`, clean), `TagsInputItem` `data-[state=active]` all correct. **Residual exposure is external-consumer + the absence of a test.** Seeds: a MIGRATION.md note on the Combobox `searchTerm`→`ComboboxInput v-model` move, and **one Playwright spec** mounting Toggle/Combobox/TagsInput/Switch/Checkbox asserting the *rendered effect* of each binding (only e2e catches these per the memory note; vue-tsc + units miss them).

**Toast is the one genuinely non-idiomatic primitive** (architectural, not cosmetic): it (a) manually re-emits all six events instead of `useForwardPropsEmits`, and (b) wraps each `<ToastRoot>` in its own `<ToastProvider>`+`<ToastViewport>` — provider/viewport are meant to be app-root singletons; per-toast nesting breaks swipe/stacking/region semantics with multiple toasts. Refactor to `useForwardPropsEmits` + hoist to a single `Toaster`. Also add `origin-(--reka-select-content-transform-origin)` to `SelectContent` for popover-family scale-in parity with `ComboboxList`.

**`data-slot` is the headline shadcn-2025 drift** — 36 of 37 family roots ship none (only alert/card/carousel/combobox/number-field sub-components carry it). Blanket-add `data-slot="<name>"` to all roots + `:data-variant`/`:data-size` to every CVA-bearing root (Button binds only `:data-size` today; canonical binds slot+variant+size). Pure-additive, zero visual delta, `proof:data-slot` gate.

**CVA base-string modernization** (Button/Badge/Toggle are frozen at an older idiom; Alert/Card already canon — proving the team knows it): bake `[&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 [&_svg]:pointer-events-none` icon-sizing + `gap` into each base, switch Badge `transition-colors`→`transition-all`, add `has-[>svg]:px-3` to Button sizes. Overlay onto glass-ui's `btn-pill`/`focus-ring` recipe, don't replace. Verify against the `cn()` bucket table (the hand-rolled deduplicator — a deliberate keep — must not false-merge an icon `size-4` against a host `size-9`).

**`aria-invalid` error-paint.** Announced-but-not-seen: `useUserInvalidAria` bridges the announcement but no CVA/CSS paints the invalid state. Add `aria-invalid:` border+ring tint (token-first via `--destructive` color-mix) to Input/Textarea/NumberFieldInput/Select-trigger/Combobox-input. (Complements W18's `[aria-invalid]` ring-selector widening.)

**Tailwind-v4.3 / mwg folds** (tight, additive — fold into hygiene/affordance slots, NOT new waves):
- **text-shadow token bridge** — `.depth-text`/`.text-engraved` hand-roll raw multi-stop literals; the repo has no `--text-shadow-*` `@theme` tokens (v4.1 shipped them). Add `--text-shadow-{2xs..lg}` (warm `--shadow-color`-derived, dark-adaptive) and re-express the two utilities to compose them. Deletes hand-rolled literals (net-neutral-or-deletion holds).
- **`corner-shape: squircle` PE** — folded into the material plan above.
- **`text-wrap` on type/label atoms** — `balance` on the display ladder + headings, `pretty` on body/prose, `wrap-anywhere` on `.metric-badge`/`.badge` value slots (NOT on `*`).
- **oklab tint rationale** — either migrate surface-tints to `color-mix(in oklab,…)` per mwg §8, or document the deliberate `in srgb` brand hand-tuning (no silent `in srgb`).

**Keep / do-not-touch** (resist proliferation): `cn()` (deliberate, well-documented), the CSS-utility focus-ring (intentional token-first divergence — document it, don't swap to inline `focus-visible:ring`), `menuItemVariants` (already modern), Alert/Card CVA (already canon), the `srgb` glass ladder, scrollbar utilities (the hand-rolled `scrollbar-color` + webkit fallback is *more* correct than the bare v4.3 utility — keep), `@container-size`, stock palettes. New reka 2.9 `Color*`/`Autocomplete`/`MonthPicker` wraps are NOT warranted speculatively (visual-load-bearing ≥2-consumer invariant) — only `Color*` and Checkbox `trueValue`/`falseValue`+indeterminate have concrete in-repo demand, and only the indeterminate fix lands here.

---

## (5) THE MINIMAL GLASS-ATOMS WAVE SET (W22+)

Five new waves perfect all four factions; the existing W21 close moves to last. Each rides an existing mechanism (no new primitive), carries a born-RED gate, and is sequenced for disjoint/ordered file bounds. Proliferation explicitly avoided — material+card folds collapse into two waves, the whole primitive sweep into two, idiom into one.

**W22 — Glass-material unify + extend.** *Scope:* promote moving-specular + edge-light rim into the five-rung ladder (or a single `.glass-material` mixin the rungs compose); ship the named `#glass-refract` SVG filter asset (squircle profile, Snell n=1.5, kept behind the existing `@supports url()` gate); `@supports (corner-shape: squircle)` PE on `.glass-card`/`.glass-pill`/`.glass-dock`/`.btn-pill`; the `--glass-edge-gradient` directional rim; the `--glass-tint-source` adaptive-tint recipe (default = warm-white, zero delta); specular-intensity rides the press/hover state machine. *Gate* `proof:glass-material`: every floating/card/dock surface resolves the unified specular+rim (computed-style probe over a mounted matrix); the squircle decl sits inside `@supports` and base `border-radius` is unchanged (ungated → RED); the gradient rim resolves brighter top-left than bottom-right; reduced-transparency drops the lot.

**W23 — Glass-card perfection (shadcn-2025 + hover + specular).** *Opens after W22 (shares the card edge-light) and W12 (backdrop staging).* *Scope:* `--card-spacing` token driving CardHeader/Content/Footer padding + inter-section gap (retire the three `p-6` + `gap-y-1.5`); `data-size="sm"` rung; `CardAction` slot + `@container/card-header has-data-[slot=card-action]:grid-cols-[1fr_auto]` reflow; opt-in `<Card hover>` elevation reusing the cartoon longhand-translate mechanism; wire the dormant `--mouse-x/--mouse-y` pointer seam behind the opt-in; the content-layer cream-read fix (opaque legible ring + under-shadow lift); extend `card.vue` story. *Gate* `proof:card-idiom`: a `--card-spacing` override re-resolves all three subcomponents from one knob; the container-query header reflows at a width probe when `CardAction` present; `<Card hover>` shows a computed `translate`/`box-shadow` delta on hover while static `<Card>` is unchanged; `--mouse-x` updates on pointermove (PRM keeps it centred); the resting card edge clears a legibility floor over flat `--background`.

**W24 — Primitive geometry + material + bug (Checkbox/Switch/Textarea/NumberField).** *Opens after W13 (shares the `glass.css .input-pill` block — W24 touches only radius declarations; W13 owns border-color/alpha).* *Scope:* mint `--radius-field`; carve `.input-pill` radius by line-count (single-line pill; Textarea + NumberFieldInput → `--radius-field`); migrate NumberFieldInput onto the glass `.input-pill` recipe; Checkbox/Tabs off raw `rounded-sm` → `--radius-control`; Switch thumb glass-highlight + spring-on-travel + token geometry; Checkbox glass-tint fill; **Checkbox indeterminate `<Minus>` branch**; wire reka 2.9 `trueValue`/`falseValue`. *Gate* `proof:form-canon`: no multi-line/stepper form atom resolves `9999px` (computed-radius probe — born RED, Textarea is 9999px today); Textarea + NumberField share `--radius-field`; mounting Checkbox at `indeterminate` renders the dash not the check (born RED — always `<Check>` today); the switch-thumb transition reads a `--spring-*` channel.

**W25 — Cross-atom motion + a11y + overlay-band + tone parity.** *Opens after W13/W18; W25 touches `button/index.ts` base active-scale (W13 owns gold-audacious foreground — disjoint lines, sequence after).* *Scope:* compose `.tap-squish` onto Checkbox/Radio/SelectTrigger/TabsTrigger/AccordionTrigger/Switch-thumb/NumberField-steppers + Button base; add `.focus-ring` to AccordionTrigger + CollapsibleTrigger; migrate bare `transition-colors` atoms → `transition-control`; replace Notification `hover:bg-white/10` with a `--surface-tint-*` rung; Toast + Command onto `glass-floating`; add `success/warning/info` to Alert + Toast (retire demo fakes); wire `TabsIndicator` into base `<Tabs>`. *Gate* `proof:atoms-cohesion`: every named interactive atom carries (press-rung ∨ documented-exemption) ∧ `.focus-ring` ∧ a semantic-radius token ∧ `transition-control` (grep + computed probe, PRM reset reachable); every floating-band surface carries a `glass-*` tier; Alert/Toast resolve the 3 new tone variants from the existing tokens.

**W26 — reka/shadcn/Tailwind/mwg idiom + binding guard.** *Fully disjoint from W22-W25.* *Scope:* refactor Toast to `useForwardPropsEmits` + single-`Toaster` provider/viewport hoist; `SelectContent` transform-origin; blanket `data-slot` on 36 roots + `:data-variant`/`:data-size` on CVA roots; Button/Badge/Toggle CVA base modernization (icon-sizing, gap, `transition-all`, `has-[>svg]` padding) verified against the `cn()` bucket table; `aria-invalid:` error-paint on the 5 form controls wired to `useUserInvalidAria`; text-shadow `@theme` token bridge; `text-wrap` balance/pretty/wrap-anywhere on type/label atoms; oklab-tint rationale (migrate or document); one Playwright binding-regression spec (Toggle/Combobox/TagsInput/Switch/Checkbox rendered-effect); MIGRATION.md Combobox-searchTerm note; document the deliberate `cn()` + CSS-utility-focus-ring divergences in CLAUDE.md. *Gate* `proof:idiom-sweep`: every `ui/` root carries a `data-slot`; the three modernized CVA bases resolve icon-sizing without a false-merge; each named form atom paints on `aria-invalid`; `text-shadow-sm` resolves a non-empty value and no raw multi-stop `text-shadow:` literal survives outside the token defs; the binding spec asserts each model's rendered effect; Toast mounts N>1 toasts under one provider.

**W21 (close) → re-anchored LAST**, opens after W0-W26: registers the five new `proof:*` gates in `scripts/gates.mjs` with `{local,ci,release,sibling}` tags, runs the full matrix green, overfitting audit tallies zero orphans, `FINAL.md` cites a green run-id per wave.

**Sequencing spine:** W22 (unify material) is the spine — W23 extends the card edge from it. W24/W25 ride W13's affordance tokens. W26 is disjoint and can run in parallel. The close stays last.

---

**HEADLINE:** glass-ui's glass faction is reference-quality and its primitive *architecture* is idiomatic — AW's glass-atoms work is a DRY consolidation that routes every atom onto the existing spine (unified specular/rim, universal press-spring, semantic radii, `data-slot`/CVA canon) and folds the four unused Baseline-2025 capabilities (squircle, baked refraction, directional rim, content-tint), perfecting all four factions in **5 new waves (W22-W26) + the existing close**, with the named affordance bugs already owned by W13/W18.

**WAVE COUNT: 5 new glass-atoms waves (W22-W26); the existing W21 close re-anchored last → 6 waves touched.**

---

## Lane briefs

### Lane 1

I have the full picture. Returning the brief.

---

# AW Tranche — Glass-Material SOTA Research Brief (lane: glass-material-sota)

Tranche-development only — research + wave seeds, no implementation.

## What glass-ui already has (the AV.W15 ceiling)

Read of `src/styles/glass.css`, `tokens.css` (§8, §11b, §18), and `glass-specular-track.css` shows the material is already deep:

- **5-rung ladder** wash/quiet/resting/floating/overlay — alpha-monotonic, blur-clamped to the 8–16px budget band (`tokens.css:583-615`), `saturate()`+`brightness()` per rung (`tokens.css:602-613`).
- **Moving specular** — `glass-specular-track.css` paints a pointer-anchored masked radial catch-light on a `::before`, driven by `@property`-typed `--specular-x/y/intensity` (`tokens.css:1677-1693`), reduced-motion-static, `var()` fallback. Wired on Button `glass`/`glass-wash`, DockIconButton, Card.
- **Edge-light rim** — full-perimeter `--glass-edge-light` inset ring (`tokens.css:700`), composed on floating + dock tiers.
- **Content-aware under-shadow** — `[data-over-content="text|solid"]` swaps the under-shadow one rung heavier over text / lighter over solid (`glass.css:108-142`) — Apple's "shadow grows as text scrolls under" rule, attribute-driven.
- **Refraction garnish** — `@supports (backdrop-filter: url(#…))`-gated `.glass-refract` (`glass-specular-track.css:144-154`) layered over the blur base, never the substrate.
- **Squircle illusion** — `--glass-curvature-overlay` radial (`tokens.css:706`) on InstrumentChassis only.
- A11y brackets: `prefers-reduced-transparency`, `prefers-contrast`, `:has()` + `backdrop-filter` `@supports` fallbacks all present.

The gap is **not** "add specular/rim/refraction" — those exist. The gap is: the SOTA techniques sit on **isolated opt-in classes / single tiers**, not unified across every primitive; and three Baseline-2025 capabilities (`corner-shape: squircle`, true convex-lens displacement, content-derived adaptive tint) are unused.

## SOTA findings + citations

**Apple Liquid Glass = a layered meta-material, not a blur.** Its layers: lensing/refraction (light bends on curved edges), specular highlights that respond to motion, illumination, and an adaptive tint informed by surrounding content. Glass belongs to the **navigation/overlay layer floating above content — never glass-on-glass** (glass-ui already encodes this in `glass.css:3-19`). Shadows increase over text for separation. Two variants: regular (adaptive) vs clear. — WWDC25 session 219 "Meet Liquid Glass" (developer.apple.com/videos/play/wwdc2025/219/, June 2025); Apple Newsroom 2025-06-09 (apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/).

**The browser refraction recipe is a 3-primitive SVG filter** referenced via `backdrop-filter: url(#id)`: `feImage` (pre-baked displacement map) → `feDisplacementMap` (R=x-shift, G=y-shift, `scale`=max px, neutral 128) → `feImage` specular + `feBlend mode="screen"`. The displacement map is computed from a **convex-squircle surface profile** `y = ⁴√(1−(1−x)⁴)` (Apple's preferred curve) via Snell's law (n₁=1 air, n₂=1.5 glass). — kube.io/blog/liquid-glass-css-svg/ (2025); blog.logrocket.com/how-create-liquid-glass-effects-css-and-svg/ (2025).

**`backdrop-filter: url(#svg-filter)` is Chromium-only** — Safari/Firefox restrict `backdrop-filter` to built-in CSS functions; WebKit bug 245510 open, Firefox not shipping. Only the `scale` attribute animates without rebuilding the (expensive) displacement map. Treat refraction as progressive enhancement, blur as substrate. — kube.io, LogRocket (2025). glass-ui's `.glass-refract` already gates this correctly.

**Baseline dates (modern-web-guidance + caniuse, retrieved June 2026):**
- `backdrop-filter` — Baseline Newly 2024-09-16 (Chrome 76, FF 103, Safari 18). caniuse.com/css-backdrop-filter.
- `color-mix()` — Baseline Widely (all engines). `relative color syntax` (`oklch(from … l c h)`) — Baseline Newly 2024-09 (Chrome 125, FF 128, Safari 18). caniuse.com/css-relative-colors. **mwg caveat:** don't lightness-shift in `oklch from` (browsers don't gamut-map yet) — use `color-mix(in oklab,…)` ≤30% (modern-web-guidance `css` §5 "Generating tints").
- `@property` — Baseline 2024-07-09 (already used).
- **`corner-shape: squircle` / `superellipse()` — NOT Baseline**, Chrome 139+ only (June 2025), no Safari/FF. `backdrop-filter`, borders, shadows follow the corner shape. — MDN corner-shape; Smashing Magazine 2026-03; Frontend Masters blog. Must be `@supports`-gated progressive enhancement.
- mwg `css` §8 names the modern primitives glass-ui should lean on: `corner-shape: squircle` (gated), elliptical `border-radius`, `mix-blend-mode`+`isolation: isolate` for lighting overlays, `background-blend-mode: soft-light` for texture (glass-ui's grain `::after` already does this), gradients/`color-mix` in `oklab`/`oklch`.

**Stack currency** (installed, verified): reka-ui 2.9.7, Tailwind 4.3.0, CVA 0.7.1, Vue 3.5.34 — all current; no upgrade needed, just idiomatic use.

**Visual read** (warm-cream identity confirmed in demo screenshots): the glass over glass-ui's own flat cream substrate reads subtle — the specular/rim only sing over a busy backdrop (aurora/goo-blob). This argues the material work should be paired with a demo substrate that shows it, and the tint should derive from content rather than always being warm-white.

## glass-atoms wave-seed list

Tight set — DRY/KISS, no over-proliferation. Roughly 6 material seeds + 2 cross-cutting consistency seeds.

**W-α — Unify the specular/rim across every glass surface (DRY consolidation, no new tech).** Today `glass-specular-track` + `--glass-edge-light` are opt-in on a handful of components (Button glass, DockIconButton, Card). Promote the moving-specular + rim into the five-rung ladder itself (or a single `.glass-material` mixin the tiers compose) so floating/overlay/dock/dialog/sheet/popover all carry the same catch-light + rim grammar without per-component wiring. One source, every primitive consistent. KISS: collapse, don't add.

**W-β — Convex-lens refraction filter as a first-class (gated) garnish.** Ship a named `#glass-refract` SVG filter (squircle profile `y=⁴√(1−(1−x)⁴)`, Snell n=1.5, baked displacement map + `feBlend screen` specular) as a library asset, so `.glass-refract` works out-of-the-box instead of requiring the consumer to hand-mount the filter. Keep the existing `@supports (backdrop-filter: url(#…))` gate; blur stays substrate. Cite kube.io/LogRocket math.

**W-γ — `corner-shape: squircle` progressive enhancement.** `@supports (corner-shape: squircle)`-gated squircle on `.glass-card`, `.glass-pill`, dock, dialog/sheet — the Apple-canonical superellipse corner that `backdrop-filter` and shadows follow. Chrome-139-only; `border-radius` round stays the fallback. Adds the iOS-26 corner read with zero risk on other engines.

**W-δ — Chromatic edge dispersion (the rim's missing axis).** Current rim is white-only. Add an optional `oklab` chromatic-aberration garnish on the edge-light (warm fringe on one edge, cool on the other) via a second thin gradient ring or the displacement-map's R/B channel split — the "polished glass" dispersion Apple shows. Token-gated, low-alpha, reduced-transparency-off. Keep it warm-cream-biased, not iOS-blue.

**W-ε — Content-aware adaptive tint.** Apple's tint is "informed by surrounding content." Mint `--glass-tint-source` + a `oklch(from …)`/`color-mix(in oklab,…)` recipe (mwg-safe, ≤30% lightness shift) so a glass surface can sample a consumer-provided dominant backdrop color and tint toward it, instead of always warm-white. Extends the existing `[data-over-content]` attribute model into a tint axis, not just an under-shadow swap. Default = today's warm-white (zero surface delta).

**W-ζ — Specular-track as the universal interaction-light.** The pointer-anchored catch-light is the material's "illuminate under your fingertip" behavior — but it's the *interaction* half of the spring/squish already owned by dock/slider motion arms. Seed: make the specular-intensity lift ride the **same** press/hover state machine as the scale-press squish (one interaction vocabulary across Button, dock controls, slider thumb, switch), so material-light and motion-spring fire in lockstep. Consistency seed — references AV.W9/W11 spring wiring, does not re-derive it.

**W-η — Primitive material-consistency sweep (cross-cutting, KISS).** Audit every primitive (input, switch, slider thumb, badge, toggle, checkbox, select trigger, tabs, tooltip) for the four-state contract + which glass grammar it uses, and converge them onto the unified ladder tokens from W-α — so a Switch thumb, a Slider knob, and a glass Button all read as the same material. No new tokens; retire any per-component hand-rolled highlight/shadow literals onto the canonical `--glass-*` rungs (the same retirement discipline AL-W10 used for under-shadows). Pair with the standing overfitting audit (every artefact ≥2 sites or exported).

**W-θ — Demo substrate that proves the material.** The material only reads over a busy backdrop; add a glass-over-aurora/goo-blob story so every seed above is visually verifiable (and so the screenshot proof at tranche close shows refraction/specular/rim, not subtle-over-cream). Demo-private chassis, not library surface.

**Sequencing note (DRY):** W-α (unify) is the spine — do it first so β/γ/δ/ε/ζ extend one grammar rather than N opt-in classes. W-η + W-θ are the close-out consistency/proof passes.

## Sources

- [Meet Liquid Glass — WWDC25 session 219](https://developer.apple.com/videos/play/wwdc2025/219/) (Apple, June 2025)
- [Apple introduces a delightful and elegant new software design](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/) (2025-06-09)
- [Liquid Glass in the Browser: Refraction with CSS and SVG — kube.io](https://kube.io/blog/liquid-glass-css-svg/) (2025)
- [How to create Liquid Glass effects with CSS and SVG — LogRocket](https://blog.logrocket.com/how-create-liquid-glass-effects-css-and-svg/) (2025)
- [CSS Backdrop Filter — caniuse](https://caniuse.com/css-backdrop-filter) / [MDN backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- [CSS Relative colors — caniuse](https://caniuse.com/css-relative-colors)
- [corner-shape — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/corner-shape) / [Beyond border-radius — Smashing Magazine](https://www.smashingmagazine.com/2026/03/beyond-border-radius-css-corner-shape-property-ui/) (2026-03)
- modern-web-guidance@latest `css` guide (retrieved June 2026) — §5 tint-generation, §8 visual effects (squircle, blend-modes, oklab/oklch gradients)

## Files read (absolute)

- `/Users/mkbabb/Programming/glass-ui/src/styles/glass.css` — 5-rung ladder, content-aware under-shadow, a11y brackets
- `/Users/mkbabb/Programming/glass-ui/src/styles/tokens.css` — §8 glass primitives (583-815), §11b moving specular (1651-1693), §18 @property (1599-1649), edge-light/specular/curvature tokens (670-715)
- `/Users/mkbabb/Programming/glass-ui/src/styles/glass-specular-track.css` — moving specular `::before`, refraction garnish gate
- `/Users/mkbabb/Programming/glass-ui/src/components/ui/button/index.ts:29-37` — glass/glass-wash specular-track wiring
- `/Users/mkbabb/Programming/glass-ui/demo/stories/manifest.ts:69-130` — foundations/substrates/primitives story routes

---

### Lane 2

I'm a subagent returning text to a script; I'll skip file-sending and put my findings in the final response. Let me write the brief.

# AW Tranche — Glass Card SOTA Research Brief (lane: glass-cards-sota)

Research-only. Live capture at `localhost:5175` (glass-ui demo — note the prompt's port was right; my first probe raced before vite was up, and the Playwright session multiplexes across the co-located slides/xray apps so captures must be pinned via `run_code_unsafe` opening a fresh page). Sources read by absolute path. Card screenshots saved at `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/aw-card-light.png` and `aw-card-cartoon.png`.

## TL;DR

The glass **card material is already sophisticated** — AV.W15 gave it the moving specular track, the under-shadow floor, the edge-light rim, the over-content under-shadow modifier, and the no-glass-on-glass discipline. The remaining gaps are three: (1) **the card doesn't read on flat cream** because the glass fill is the *same hue* as the page (`--card` === `--background` === `--neutral-0`), so only alpha+blur+a faint 8-18% border separate it — and over a flat field there's nothing to blur; (2) **the card geometry has drifted off the shadcn-2025 idiom** — no `--card-spacing` token, no container-query header, no `CardAction` slot, hardcoded `p-6` per subcomponent instead of a `gap`-driven rhythm, and a `1px border` where shadcn moved to `ring-1`; (3) **the resting glass card has no hover-elevation** — only `cartoon` lifts; the plain glass card is inert on hover (the specular brightens but the plate doesn't rise). The existing AW.W12/W13 waves cover the *demo-staging* and *affordance* halves but **do not perfect the Card atom itself** — that's this lane's contribution.

## What I verified (live + source)

**Card material, computed (light mode, over the cream page `--neutral-0` = `srgb 0.982 0.981 0.978`):**

| tier | bg (same hue, varying α) | backdrop-filter | border α | radius |
|---|---|---|---|---|
| wash | `…0.978 / 0.30` | `blur(1px) saturate(1.05)` | 8% | 16px |
| quiet | `…0.978 / 0.50` | `blur(10px) saturate(1.05) brightness(1.02)` | 10% | 16px |
| resting | `…0.978 / 0.65` | `blur(12px) saturate(1.05)` | 12% | 16px |
| floating | `…0.978 / 0.80` | `blur(16px) saturate(1.4)` | 15% | 16px |
| overlay | `…0.978 / 0.95` | `blur(15px) saturate(1.5)` | 18% | 16px |

The tier alpha ladder is real and monotonic, but the **fill hue is identical to the page** — so on the flat cream story the five rungs render as near-identical rectangles (screenshot confirms). Root cause is `--card: var(--neutral-0)` and `--background: var(--neutral-0)` (`tokens.css:326,328`): a `color-mix(--card, transparent)` over a `--card`-colored page is invisible by construction. This is the audit's "glass doesn't read on flat cream" finding, and it is a **material/staging** issue, not a card-logic bug (toggles verified functional).

**Specular track active:** `.glass-specular-track::before` paints the radial catch-light at `opacity:0.35` rest, warm-white `hsl(40 30% 100%)` (not iOS blue — correct warm-cream identity), lifting to 0.6 hover / 0.85 active (`glass-specular-track.css:53,101,103`). The consumer must write `--mouse-x/--mouse-y`; without it the catch-light pins centred. **Card.vue applies `glass-specular-track` but ships no pointer-write seam** — so the headline AV.W15 fold is dormant on the Card unless a consumer wires it (`Card.vue:69`).

**Cartoon surface:** rest `translate:0` + `--shadow-cartoon-md`, 2px border; hover `translate: -1px -1px` + `--shadow-cartoon-lg` (`cards.css:33-48`). This is the **only card register with hover-elevation**. Plain glass cards are inert on hover.

**Geometry:** `--radius-card: var(--radius-2xl)` → resolves 16px (`theme.css:42`). Subcomponents hardcode `p-6` (Header/Content/Footer) and `gap-y-1.5` (Header) — no shared spacing token.

## SOTA crosswalk

**shadcn 2025 card idiom** (canonical source, ui.shadcn.com/docs/components/base/card, fetched 2026-06-06) has materially evolved and glass-ui has not tracked it:
- Root: `flex flex-col gap-(--card-spacing) … rounded-xl … py-(--card-spacing) … ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] data-[size=sm]:[--card-spacing:--spacing(3)]` — a **`--card-spacing` token** drives gap+padding from one knob, a **`data-size`** rung, and **`ring-1` replaces `border`**.
- Header: `@container/card-header grid auto-rows-min items-start gap-1 … has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]` — a **container-query grid** that auto-reflows when a **`CardAction` slot** (top-right control) is present.
- Footer: `… border-t … p-(--card-spacing)`.

glass-ui's card has **none** of: `--card-spacing` token, `data-size`, `CardAction` slot, `@container/card-header`, ring-edge, gap-driven internal rhythm. It hardcodes `p-6` × 3 and `gap-y-1.5`.

**iOS 26 Liquid Glass** (Apple Newsroom 2025-06-09; WWDC25 sess. 219; corroborated by search): glass is "best reserved for the navigation layer that floats above content," reflects+refracts the backdrop, carries **specular highlights** and **edge refraction**, and is **never nested glass-on-glass**. glass-ui already encodes all four (the no-glass-on-glass band rule in `glass.css:3-19`, specular track, edge-light rim, the `data-over-content` legibility modifier). The gap vs Apple is that **a card is a *content-layer* object**, so per Apple's own guidance a card at rest over a flat page *shouldn't* be heavy glass — it should be a near-opaque tier that only reads as glass over a busy backdrop. The card material is correct; the demo just never gives it a backdrop to refract.

**Modern CSS / Baseline (2025):** the masked-radial specular (`@property` 2024-07, `mask-image` 2023-12), `color-mix`, `light-dark()`, container queries (Baseline 2023), and `:has()` (Widely) are all already used. The one SOTA technique glass-ui doesn't use for the card edge is the **dual/gradient border-highlight** (a `border-image: linear-gradient(…)` or masked-pseudo "shine on one corner" that catches light directionally) — multiple 2025 tutorials (LogRocket, ekino, Medium/Yarinsa) converge on it as the signature iOS-26 rim. glass-ui's rim (`--glass-edge-light`) is a *uniform* inset stroke; a directional top-left gradient rim would close the last material-fidelity gap. (Cited below.)

## Convergence with existing AW waves (avoid duplication)

- **AW.W12** (glass-panel tier-honoring + demo backdrop) already books *staging the card story over a shipped Aurora/PaperBackdrop* and *re-verifying tier steps*. That fixes perception. **Note one stale claim to flag:** W12 §3.3 asserts a double-nested `light-dark(light-dark())` on `--glass-bg-*`; at HEAD those tokens are single `color-mix(--card …)` (`tokens.css:645-649`) and `--card` carries exactly one `light-dark()` (`:1369`) — the double-nest does not exist, so that token-hygiene sub-item is a no-op and should be dropped or re-targeted.
- **AW.W13** (affordance pass) owns input/select border-alpha + slider fill + button text — not the card.
- **Neither wave perfects the Card *atom*** (its geometry, its hover-elevation, its idiom drift, its dormant specular). That is the seed set below — it composes with W12 (W12 stages the backdrop; these seeds perfect what's staged) and shares no file bounds with W13.

## Glass-atoms wave-seed list

Every seed is token/CSS/CVA/slot — no new primitive, ≥2-consumer or demo-only. Ordered by leverage.

- **AW.Wα — Card idiom modernization (shadcn-2025 parity).** Adopt the `--card-spacing` token on the Card root and drive `CardHeader`/`CardContent`/`CardFooter` padding + the inter-section gap from it (replace the three hardcoded `p-6` + `gap-y-1.5` with `gap-(--card-spacing)` + `px-(--card-spacing)`), add a `data-size` rung (`sm` → tighter spacing) mirroring shadcn. Add a **`CardAction` slot** with the `@container/card-header grid has-data-[slot=card-action]:grid-cols-[1fr_auto]` reflow (top-right control affordance — used by any card with a menu/toggle in its header; ≥2 consumers across the demo + speedtest metric cards). Pure structure/CVA; the glass tier system is untouched. **Gate:** container-query reflow proven by a width-probe; `--card-spacing` override re-resolves all three subcomponents from one knob. [shadcn base/card, fetched 2026-06-06]

- **AW.Wβ — Resting glass-card hover-elevation parity.** Give the plain `surface="glass"` card the hover-lift the `cartoon` register already has — a token-gated `translate: var(--lift-sm)` + one shadow rung up + the specular intensity already brightens, so the plate *rises* on hover, not just glints. Reuse the `cartoon-surface` mechanism (longhand `translate` + `box-shadow` transition on `--spring-bouncy`/`--ease-apple`, `cards.css:40-47`); do not fork. Opt-in via an `interactive`/`hover` prop so static cards stay flat (the `.glass-card` "no hover lift" contract at `glass.css:172-174` is preserved for the *utility*; this is the *component* opting in). **Gate:** computed `translate`/`box-shadow` delta on hover for `<Card hover>`; static `<Card>` unchanged. [iOS-26 "lift on engagement"; Apple Newsroom 2025-06-09]

- **AW.Wγ — Wire the dormant specular seam on Card.** Card.vue already adds `glass-specular-track` but ships no `--mouse-x/--mouse-y` write, so the AV.W15 headline catch-light is centred-static on every card. Add the thin pointer-listener (the same ≤6-LOC seam `DockIconButton` uses, `glass-specular-track.css:19`) behind the `hover`/`interactive` opt-in so the catch-light actually tracks the cursor on a card. Reduced-motion already pins it centred (`:117-122`). **Gate:** `--mouse-x` updates on pointermove over an interactive card; PRM keeps it centred. [glass-specular-track.css:19; AV.W15]

- **AW.Wδ — Directional gradient edge-light (last material-fidelity gap).** The card rim (`--glass-edge-light`, a uniform inset stroke) is the one place glass-ui lags the 2025 iOS-26 CSS idiom, which catches light *directionally* (bright top-left, fading to the bottom-right). Add a `--glass-edge-gradient` token (a `linear-gradient` border-image or a masked `::before` 1px rim) layered over the existing uniform rim on the `floating`/card register, dark-arm via the existing `--shadow-color`/`*-dark` flip. Token + CSS only; composes with the existing rim, does not replace it. **Gate:** the gradient rim resolves a brighter top-left than bottom-right; reduced-transparency drops it with the blur. [LogRocket "how to create liquid glass effects with CSS and SVG", 2025; ekino-france "Liquid Glass in CSS (and SVG)", 2025]

- **AW.Wε — Card reads on cream: the content/navigation-layer split (composes with W12).** The deepest fix is recognizing a card is a *content-layer* object (Apple: glass is for the *navigation* layer). Two coordinated moves: (1) confirm W12's busy-backdrop staging lands so the *demo* reveals the tiers; (2) for the *default flat-page* case, ensure the resting card's **separation cue is the under-shadow + a legible ring**, not the (invisible-on-cream) translucency — i.e. lift the resting border off the 8-12%α floor toward a `ring-1`-class hairline (shadcn's `ring-foreground/10` ≈ 10%, but on *opaque* edge not the cream-matching glass border) and lean on `--glass-under-shadow-default` (already wired, `glass.css:81`) as the primary lift. This is the card-specific complement to W13's input-border lift; same precept (cream affordance too timid), different element. **Gate:** resting card edge legible over flat `--background` (computed contrast of the ring vs page > a floor); tiers still read over the W12 backdrop. [Apple HIG materials / no-glass-on-glass; CLAUDE.md `glass.css:3-19`]

- **AW.Wζ (small, demo-only) — Card story exercises the new affordances.** Once α-δ land, extend `demo/stories/primitives/card.vue` to show: an interactive `<Card hover>` row (proves Wβ/Wγ), a `CardAction`-bearing header (proves Wα), and the tier ladder over the W12 backdrop (proves Wε). No library change; consumes the new slots/props. Demo-private. **Gate:** story renders the four new affordances without raw-HTML re-rolls.

**Not in scope / defer:** SVG `feDisplacementMap` true-refraction on cards — Chromium-only, resize-expensive, already correctly gated as a PE-only `.glass-refract` garnish (`glass-specular-track.css:144`); do not promote to the card substrate. No new card variant or primitive — every seed extends an existing token/mechanism (cartoon's lift, the specular track, the edge-light rim, the shadcn `--card-spacing`/`CardAction` idiom).

## Sources

- [Apple introduces a delightful and elegant new software design — Apple Newsroom](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/) (2025-06-09) — Liquid Glass specular highlights, reflect/refract, navigation-layer framing
- [Card — shadcn/ui (base)](https://ui.shadcn.com/docs/components/base/card) (fetched 2026-06-06) — canonical 2025 card structure: `--card-spacing`, `ring-1`, `CardAction`, `@container/card-header`
- [How to create Liquid Glass effects with CSS and SVG — LogRocket](https://blog.logrocket.com/how-create-liquid-glass-effects-css-and-svg/) (2025) — SVG-filter refraction technique; Chromium-only backdrop+SVG support
- [Liquid Glass in CSS (and SVG) — ekino-france / Medium](https://medium.com/ekino-france/liquid-glass-in-css-and-svg-839985fcb88d) (2025) — masked-pseudo rim + relative-color edge highlight
- [Creating Liquid Glass Effects with CSS — Yarinsasson / Medium](https://yarinsa.medium.com/creating-liquid-glass-effects-with-css-the-art-of-digital-transparency-ebda92699993) (2025) — dual-border directional shine, mask-image highlight, multi-layer box-shadow
- [Tailwind CSS v4.0 — Tailwind Labs](https://tailwindcss.com/blog/tailwindcss-v4) (2025) — `@property`, `color-mix()`, cascade layers, native container queries (Baseline 2023)

**Key file:line anchors:** `Card.vue:69` (specular class, no pointer seam) · `cards.css:33-48` (cartoon lift = the only hover-elevation) · `glass.css:172-200` (`.glass-card` static, `:has(:focus-visible)` elevation) · `glass-specular-track.css:19,53,101-103,117-122` (specular seam + rest/hover/PRM) · `tokens.css:326,328` (`--card`===`--background`===`--neutral-0`, the read-on-cream root cause), `:574-576` (tier α ladder), `:645-649` (glass-bg = color-mix of `--card`, single light-dark — W12's double-nest claim is stale), `:700-701` (`--glass-edge-light` uniform rim), `:516` (`--shadow-card`) · `theme.css:42` (`--radius-card`=16px) · CardHeader/Content/Footer hardcode `p-6` (no `--card-spacing`).

---

### Lane 3

The background vite server exited (144 = killed by my pkill, expected). All screenshots captured. Here is the brief.

---

# AW · Lane primitives-perfection-1 — Form/Input Atoms Perfection (research + wave seeds)

Read-only research. Demo at `localhost:5175`, screenshots under `docs/tranches/AW/aw-*.png`. reka-ui dev-pinned `^2.9.7` (peer `^2.0`).

## What's already owned (do NOT re-seed)

The directive's three named affordance bugs are **already covered** by existing AW waves — my lane must not duplicate them:

- **AW.W13** (`waves/AW.W13-affordance.md`) owns: gold-audacious cream-on-cream text (`button/index.ts:17`), the `.input-pill` 8%α resting border floor + Select-trigger mirror (`glass.css:283-300`), and the standard slider range-fill. Gate `proof:affordance-contrast`.
- **AW.W18** (`waves/AW.W18-gate-pattern.md`) owns: widening `.input-pill` invalid ring to include `[aria-invalid="true"]`. Gate `proof:input-invalid-aria`.
- **AW.W20** owns demo-side ToggleGroup re-roll + token hygiene.

I independently re-confirmed all three (quantified below) so the seeds compose cleanly with W13/W18 rather than fighting them. **This lane seeds what W13/W18 leave on the table: the cross-atom CONSISTENCY + MATERIAL + reka-2.9/CVA idiom perfection.**

## Findings (citations + measured values)

### F1 — Three radius languages fracture the form family (consistency)
The atoms speak three different corner dialects against one warm-cream/iOS aesthetic:
- Input / Textarea / SelectTrigger → `.input-pill` `border-radius: var(--radius-pill)` = **9999px** (`glass.css:287`, `SelectTrigger.vue:41`)
- NumberFieldInput → `rounded-input` = `var(--radius)` = **0.625rem/10px** (`NumberFieldInput.vue:29`)
- Checkbox → `rounded-sm` = **4px** (`Checkbox.vue:24`)

Verified computed: `.input-pill` radius `9999px`, `--radius-input` resolves `0.625rem`. The NumberField (screenshot `aw-number-field.png`) reads as a different design system: solid `bg-background`, `border-input`, square-ish — no glass, no pill. It does not look like a sibling of Input.

### F2 — Textarea pill-radius is a visible defect (geometry)
`Textarea.vue:65` inherits the full `.input-pill` `9999px` radius. On a multi-line box this paints grotesque stadium ends (huge rounded top-left/bottom-right). `aw-textarea.png` shows it plainly. Pill radius is correct for a 2.5rem single-line control; it is wrong for any tall field. The fix is a non-pill rung for multi-line + NumberField (an `--radius-field` ≈ 1rem rung shared by Textarea + NumberField), reserving pill for single-line.

### F3 — Checkbox indeterminate renders a checkmark, not a dash (bug)
`Checkbox.vue:27-31` always renders `<Check>` in the indicator slot. reka-ui's `CheckboxIndicator` emits `data-state="indeterminate"`; the SFC ignores it. Grep confirms **no** `indeterminate`/`Minus` handling. `aw-checks.png` shows the "Indeterminate" box rendering a check. Idiomatic shadcn-vue conditionally renders `<Minus>` on `data-[state=indeterminate]`.

### F4 — Switch + Checkbox have no glass material (iOS-26 idiom gap)
- Switch (`Switch.vue:28-35`): track is flat `bg-input`/`bg-primary`, thumb is plain `bg-background` + `shadow-lg`. No specular, no `--glass-*` rung, no spring on the thumb travel (`transition-transform` uses default easing, not `--ease-spring`). It is stock shadcn, not Liquid Glass.
- Checkbox: flat `border-primary`, no glass fill, no press feedback.

These are the two atoms furthest from the `--glass-highlight`/`--glass-specular`/`--spring-snappy` vocabulary the slider and dock already speak.

### F5 — Press-spring is applied inconsistently across atoms (motion language)
- Button: `active:scale-[var(--scale-press-btn)]` (0.97) via Tailwind, on `--ease-standard` — not the spring (`buttonVariants` base, `index.ts:9`).
- Slider thumb: gets the true iOS spring — `transform … var(--ease-spring)` + `:active { scale(--scale-press-btn) }` (`Slider.vue:207,219`).
- Switch / Checkbox / Radio / SelectTrigger / NumberField steppers: **no press transform at all**.

The library HAS the canonical `.tap-squish` recipe (`utilities.css:201`, `scale: var(--scale-press)` on `--spring-snappy`, with a PRM reset) but the form atoms don't compose it. The iOS-26 "give under the finger" beat is present on exactly one atom.

### F6 — Faint affordance re-confirmed (feeds W13, do not re-own)
Measured: gold-audacious at rest `color rgb(255,255,255)` over `bg rgba(0,0,0,0)` + ~8%-gold gradient on cream → roughly 1.1:1, a catastrophic fail (`aw-buttons.png`). Pill input/select border `1px …/0.1` and `--glass-border-wash` = 8% foreground — the field edge nearly vanishes on cream (`aw-inputs.png`, `aw-select.png`). W13's gate already targets these; noting only to confirm the lane boundary.

### F7 — Reka-2.9 / CVA idiom drift (modernization)
- Only Button and Slider carry CVA variant axes. SelectTrigger hand-rolls `variant`/`size` as ad-hoc computed class strings (`SelectTrigger.vue:26-32`) instead of a `selectTriggerVariants` CVA — off-pattern vs the shadcn-vue convention CLAUDE.md states ("CVA variants co-exported from each index.ts").
- Switch/Checkbox/Radio have a single baked class string with no size axis — no `sm`/`lg` registers despite Input/Select/Slider all carrying size.
- `Textarea.vue` forwards only `placeholder`+`disabled` in `elementAttrs` (`:54-57`) while Input forwards the full §3 matrix (`Input.vue:60-70`) — Textarea silently drops `required`/`name`/`readonly`/`maxlength` from the typed surface (they fall through `$attrs`, but the typed prop surface is inconsistent between two siblings of the same family).

## Glass-atoms wave-seed list (primitives-perfection-1)

DRY/KISS: four tight waves, no proliferation. Each extends an existing mechanism (the 5-tier glass ladder, `.tap-squish`, CVA), born-RED gate, no new primitive. Sequenced AFTER W13 (W13 owns the border/contrast tokens these compose over).

**AW.Wp1 — Form-radius unification (the geometry fix).** Introduce one non-pill field rung `--radius-field` (≈ `var(--radius-2xl)`/1rem) and split `.input-pill` radius by line-count: single-line (Input, SelectTrigger) keep pill; Textarea + NumberFieldInput adopt `--radius-field`; Checkbox lifts `rounded-sm`→`--radius-sm`-but-softer or a shared `--radius-control` so the three atoms stop speaking three dialects. NumberFieldInput also migrates off the solid `bg-background`/`border-input` onto the `.input-pill` glass recipe (`--radius-field` variant) so it reads as an Input sibling. Files: `tokens.css`, `theme.css`, `glass.css` (`.input-pill` radius carve), `Textarea.vue`, `NumberFieldInput.vue`, `Checkbox.vue`. Gate `proof:form-radius-canon` — grep asserts no form atom resolves `9999px` on a multi-line/stepper field; computed-radius probe asserts Textarea + NumberField share `--radius-field`. Born RED (textarea is `9999px` today). Depends on W13 (shares the `glass.css .input-pill` block — coordinate the carve).

**AW.Wp2 — Switch + Checkbox glass material + indeterminate fix.** (a) Switch: thumb composes a `--glass-*` highlight + the spring on travel (`transition-transform … var(--ease-spring)`); track adopts a subtle inset/glass tint rung instead of flat `bg-input`. (b) Checkbox: conditionally render `<Minus>` on `data-[state=indeterminate]` (the F3 bug); add a glass-tint checked fill. Files: `Switch.vue`, `Checkbox.vue`. Gate `proof:checkbox-indeterminate` — mounts the checkbox at `indeterminate`, asserts the rendered glyph is the dash not the check (born RED — always `<Check>` today); a computed-style canary asserts the switch thumb transition reads `--spring-*`. KISS — material via existing tokens, no new variant.

**AW.Wp3 — Press-spring uniformity (the iOS-26 motion canon).** Compose the existing `.tap-squish` (`utilities.css:201`, already PRM-bracketed) onto every interactive form atom that lacks press feedback: Button base (swap the ad-hoc `active:scale` for the canonical recipe so it springs like the slider), Switch, Checkbox, RadioGroupItem, SelectTrigger, NumberField steppers. Single source — no per-atom transform re-derivation. Files: the seven SFC/CVA class strings only. Gate `proof:press-spring-canon` — grep asserts each named atom composes `tap-squish` (or the `--scale-press*` token on a `--spring-*` channel) and that the PRM reset is reachable. Born RED (5 of 7 atoms have no press transform). Pure class-string carve.

**AW.Wp4 — CVA + attr-surface idiom parity (reka-2.9 modernization).** (a) Extract `selectTriggerVariants` CVA co-exported from `select/index.ts` (replace the hand-rolled computed class strings, `SelectTrigger.vue:26-32`), matching Button/Slider. (b) Reconcile the Textarea typed `elementAttrs` to the full forms-§3 matrix Input carries (`required`/`name`/`readonly`/`maxlength`), so the two siblings present an identical typed surface. (c) Optional `size` axis stub for Switch/Checkbox/Radio only if a second consumer exists (visual-load-bearing-ness — skip if not). Files: `select/index.ts`, `SelectTrigger.vue`, `Textarea.vue`. Gate `proof:form-cva-parity` — asserts `selectTriggerVariants` is exported + consumed; asserts Textarea's typed prop set is a superset of the §3 matrix. Born RED. No behavior change, idiom-only.

### Boundary note for the orchestrator
Wp1 and W13 both carve `glass.css .input-pill` — sequence Wp1 AFTER W13 and have Wp1 touch only the radius declarations (W13 owns the border-color/alpha). Wp2's checkbox-indeterminate is orthogonal to all existing waves. Wp3 touches `button/index.ts` press scale — W13 also names `button/index.ts` (the gold-audacious foreground); disjoint lines (variant color vs base active-scale) but flag for the same agent or sequence Wp3 after W13. Wp4 is fully disjoint.

Screenshots for the seeds: `docs/tranches/AW/aw-buttons.png` (F6 gold defect), `aw-inputs.png` (F6 border), `aw-checks.png` (F3 indeterminate + F4 flat switch), `aw-slider.png` (the F5 spring reference), `aw-select.png` / `aw-select-open.png`, `aw-number-field.png` (F1 radius/material divergence), `aw-textarea.png` (F2 pill-radius defect).

---

### Lane 4

# AW Tranche — Overlay/Nav/Data Atoms Perfection Brief

Lane: primitives-perfection-2. Research + wave seeds only, no implementation. Source read by absolute path; demo screenshotted at localhost:5175 (dialog, badge, alert, tabs) — the dev server has a deep-link redirect quirk that made overlay-open interaction flaky, so overlay-tier verification leans on source + the static stories.

## What's already right (keep, don't churn)

- The floating-glass tier is the shared overlay substrate: Dialog, Sheet, Popover, Tooltip, HoverCard, DropdownMenu, ContextMenu all compose `glass-floating` + `popover-animate` + `slide-in-from-side` over the `--z-*` registry. `glass-floating` carries the full iOS-26 rim stack (`--glass-edge-light` + `--glass-under-shadow-vivid` + lift) at `glass.css:89`.
- `menuItemVariants` (`_shared/menuItemVariants.ts`) is a genuinely DRY four-state contract shared across the 9 menu/picker families, composing the `interactive-item` substrate (`utilities.css:156`).
- `ModalOverlay` (`_shared/ModalOverlay.vue`) canonicalizes the scrim across Dialog/Sheet; the no-glass-on-glass discipline (`glass.css:1-29`) is documented and the demo honors it (Alert/Badge/Toast paint flat tiers, glass reserved for the nav/overlay band).
- z-index registry is coherent (`tokens.css:268-287`): hovercard/tooltip 120, popover 130, modal 140, toast 160.
- PRM, reduced-transparency, high-contrast are all handled at the token layer (`glass.css:366-394`) and per-keyframe.

## Findings (file:line)

**1. Overlay-band material is inconsistent — three atoms break the `glass-floating` contract.**
- Toast (`toast/Toast.vue:38`) paints `bg-background ... shadow-modal` — flat, NOT `glass-floating`. It's an overlay-band surface (z-toast 160) yet it's the only floating notification that doesn't read as glass.
- Command (`command/Command.vue:26`) uses `bg-popover` flat; but Command is the same menu family as DropdownMenu (`dropdown-menu/DropdownMenuContent.vue:37`, `glass-floating`). A command palette over content is the canonical glass-overlay case.
- Alert (`alert/index.ts:8-21`) and Badge (`badge/index.ts`) correctly stay flat (content-band) — that's right, leave them.

**2. Alert is missing semantic variants the demo already renders.** `alertVariants` (`alert/index.ts:11-19`) declares ONLY `default` + `destructive`. The demo (`feedback/alert.vue`, screenshotted) shows Warning, Info, Success alerts with tinted borders/glyphs — those are faked at the demo site. Badge already has `success/warning/info` (`badge/index.ts:21-26`) consuming the `--{success,warning,info}` + `-foreground` tokens. Alert should mirror that 5-variant set; the tokens already exist.

**3. Toast variant set is thinner than Badge/Alert.** Toast (`toast/Toast.vue:15`) only has `default | destructive`. No `success/warning/info` despite the tokens existing and Badge having them. Toast is the highest-traffic status surface; it's the one most needing the semantic tones.

**4. Base reka Tabs active state has no floating-tier polish.** `TabsList.vue:18-21` is a transparent flex row (no rail bg); `TabsTrigger.vue:22` active state is only a `text-color` change — there is no `TabsIndicator` wired into the default `<Tabs>` story, so the active tab reads as a bare white card (screenshot: default Tabs). The spring pill+indicator (`TabsIndicator.vue:18`, `bg-secondary/80` + `ease-spring-snappy`) and the polished BouncyTabs live only in custom/tabs. The base atom under-delivers vs its own indicator primitive.

**5. Five overlapping entrance grammars for overlays — a vocabulary sprawl.** These all coexist and partially overlap:
- `popover-animate` (zoom-95 + fade, `utilities.css:8`) — dropdown/popover/tooltip/hovercard/context.
- `sheet-animate` (slide + fade, `utilities.css:720`) — sheet/drawer scrim.
- `glass-top-layer` native `@starting-style`/`overlay` grammar (`animations.css:325-366`) — native popover/dialog only.
- `useSpringMount` iOS-spring opt-in (`DialogContent.vue:88-114`, `SheetContent.vue:57-95`) — physics entrance.
- The Vue `<Transition>` sets `dialog-scale`/`dropdown`/`pop` (`transitions.css:42-97`) — used by custom components.
That's four ways to enter a popover. KISS target: a single canonical "floating entrance" token-driven recipe with spring as the one opt-in, and document which surface uses which (the spring path is justified for Dialog/Sheet; the duplication is in popover-animate vs the dropdown `<Transition>` vs top-layer).

**6. Tooltip/HoverCard/DropdownMenu re-declare radius+border literals inline instead of composing `.popover-content`.** The canonical `.popover-content` recipe (`utilities.css:101`, radius+outline+foreground) exists, but Tooltip (`TooltipContent.vue:27`, `rounded-tooltip border`), HoverCard (`HoverCardContent.vue:33`, `rounded-panel border`), DropdownMenu (`:37`, `rounded-panel border`) each hand-roll radius+border. Only Popover (`PopoverContent.vue:45`) and ContextMenu actually use `.popover-content` partially. The radius is split across `rounded-tooltip`/`rounded-panel` ad hoc.

**7. Separator label has a hardcoded `bg-background` that won't sit on glass.** `Separator.vue:30` paints the label chip `bg-background` — inside a glass panel (where separators commonly live) that's an opaque rectangle breaking the glass read. Should read a surface token or be transparent-with-blur.

**8. Skeleton uses scoped `<style>` for shimmer/breath** (`Skeleton.vue:49-113`) while the rest of the animation grammar is global CSS utilities. It's correct and PRM-gated, but it's the one atom keeping per-component scoped keyframes — candidate to fold into the global grammar for consistency (or document why it stays scoped, like the dropdown-font precedent).

**9. ProgressDefault indicator has no token-driven fill/track** (`ProgressDefault.vue:25,31`): hardcoded `bg-secondary`/`bg-primary`, while the gradient variant honors `--progress-track`/`--progress-fill` (`Progress.vue:33`). Minor — default could read the same tokens for retune symmetry.

**10. Avatar has no `base` default-size match and lacks status-ring affordance.** `avatarVariants` (`avatar/index.ts:11-15`) is `sm/base/lg` but the component default is `size: 'sm'` (`Avatar.vue:12`) — a 10px sm as default is small; and there's no presence/status ring (common avatar affordance, and StatusDot already exists to compose). Low priority.

## Glass-atoms wave-seed list (DRY/KISS, minimal proliferation)

Proposed as a tight set — fold related fixes into single waves rather than one-per-atom.

- **AW-W·overlay-material** — Bring the three off-contract overlay surfaces onto `glass-floating`: Toast (`Toast.vue:38`) and Command (`Command.vue:26`). Single material-consistency pass across the overlay band. (Findings 1.)
- **AW-W·semantic-tone-parity** — Add `success/warning/info` to `alertVariants` (`alert/index.ts`) and Toast `variant` (`Toast.vue`), reusing the existing `--{success,warning,info}` + `-foreground` tokens; retire the demo's faked alert variants. One CVA-extension wave covering both atoms + Badge alignment. (Findings 2, 3.)
- **AW-W·popover-recipe-DRY** — Route Tooltip/HoverCard/DropdownMenu/Popover/ContextMenu through `.popover-content` for radius+border+foreground (`utilities.css:101`), collapsing the inline `rounded-tooltip`/`rounded-panel`/`border` literals to one source; pick one canonical floating radius. (Finding 6.)
- **AW-W·entrance-grammar-canon** — Consolidate the overlay entrance vocabulary: one token-driven floating-entrance recipe, spring as the single opt-in; document the popover-animate vs `<Transition>` dropdown vs top-layer split and retire the redundant path. No new motion, just dedup + a precept note. (Finding 5.)
- **AW-W·tabs-base-polish** — Wire the `TabsIndicator` spring pill into the base `<Tabs>` default so the reka atom matches its own indicator primitive (not just custom BouncyTabs); align active-state affordance. (Finding 4.)
- **AW-W·atom-token-hygiene** — Bundle the small token/affordance fixes: Separator label surface token (`Separator.vue:30`), ProgressDefault `--progress-track/fill` symmetry (`ProgressDefault.vue`), Skeleton scoped-vs-global decision, Avatar default-size + optional StatusDot composition. One sweep wave for the ≤10-LOC items. (Findings 7, 8, 9, 10.)

Relevant source paths: `/Users/mkbabb/Programming/glass-ui/src/components/ui/{toast,command,alert,badge,tabs,tooltip,hover-card,dropdown-menu,context-menu,popover,dialog,sheet,separator,skeleton,progress,avatar}/` · shared substrate `/Users/mkbabb/Programming/glass-ui/src/components/ui/_shared/{menuItemVariants.ts,ModalOverlay.vue}` · CSS grammar `/Users/mkbabb/Programming/glass-ui/src/styles/{glass.css,utilities.css,animations.css,transitions.css,floating-panel.css}` · z/shadow tokens `/Users/mkbabb/Programming/glass-ui/src/styles/tokens.css:268-287,480`.

---

### Lane 5

SelectContent is fully idiomatic (uses `--reka-popper-available-height`, `--reka-select-trigger-width`, modern `h-(--reka-...)` Tailwind v4 arbitrary-property syntax). One observation: it lacks `origin-(--reka-select-content-transform-origin)` that ComboboxList has — a minor consistency gap for the scale-in animation anchor.

I have everything needed. Let me write up the brief.

---

# AW tranche — reka-idiom-sweep + binding-correctness brief

**Lane:** reka-idiom-sweep · **Scope:** research + wave seeds only (no implementation)
**Versions verified:** reka-ui `2.9.7` installed (matches `package.json` devDep `^2.9.7`; peer `^2.0`), vue `3.5.34`, against reka-ui docs/source as of June 2026.

## Method

Read all 42 `src/components/ui/*` wrappers (toggle, toggle-group, combobox, tags-input, switch, checkbox, select, number-field, tabs, radio-group, progress, toast, accordion, slider). Cross-checked each reka prop/emit contract against the installed `node_modules/reka-ui/dist` source and the reka-ui `.md` API docs. Swept `src/` + `demo/` for the stale-binding patterns from the binding-verification memory note. Captured the inputs story (warm-cream + pill aesthetic confirmed).

## Binding-correctness findings (the memory-note class)

The lib is in **good shape** on the headline stale bindings — the modern reka idiom is already in place. Specifics, all source-verified:

- **`Toggle` `v-model`** — `demo/stories/primitives/toggle.vue:29` uses `v-model="bold"`. CORRECT for reka 2.9: `Toggle` exposes `modelValue` as its v-model key (`node_modules/reka-ui/dist/Toggle/Toggle.js:45` `emits: ["update:modelValue"]`; it surfaces `pressed` only as a *slot prop* + `aria-pressed`). The old Radix-Vue `v-model:pressed` is retired; no occurrences in repo. No action.
- **`Combobox` search term** — reka 2.x moved the filter value OFF `ComboboxRoot` onto `ComboboxInput` via plain `v-model` (`modelValue`); `ComboboxRoot` has NO `searchTerm` prop (verified `node_modules/reka-ui/dist/combobox/ComboboxInput.cjs:17,39,46`). glass-ui's `Combobox.vue` just forwards `ComboboxRootProps`, so it's clean; no `v-model:search-term` anywhere in `src/`/`demo/`. The one `searchTerm` ref (`demo/stories/primitives/inputs.vue:11,82`) is a custom `SearchBar`, not reka. **Risk is external-consumer-only** — a downstream still on `v-model:search-term` silently no-ops. Seed: a MIGRATION note + a doc lint, not a lib change.
- **`TagsInputItem` `data-[state=active]`** (`src/components/ui/tags-input/TagsInputItem.vue`) — CORRECT. reka emits `data-state: "active" | "inactive"` on the item (`node_modules/reka-ui/dist/TagsInput/TagsInputItem.js:36,54`). No drift.
- No stale `:pressed`, `tag=` (the two `tag=` hits are semantic element-tag props on Notification/MetricStack, unrelated to reka), or legacy `searchTerm` bindings found in `src/`+`demo/`.

**Conclusion:** the binding-verification class is mostly clean at HEAD. The residual exposure is (a) external consumers and (b) the absence of a *test* that would catch a future regression — only e2e catches these, and there's no e2e asserting the rendered effect of these specific bindings.

## Non-idiomatic / inconsistency findings (real, actionable)

1. **Toast is the one genuinely non-idiomatic primitive.** `src/components/ui/toast/Toast.vue` (a) manually re-emits all six events (`@update:open`, `@escapeKeyDown`, `@swipeStart/Move/End/Cancel`) instead of `useForwardPropsEmits` — every other wrapper uses the forward helper; and (b) wraps EACH `<ToastRoot>` in its own `<ToastProvider>` + `<ToastViewport>`. Provider+viewport are meant to be app-root singletons; per-toast nesting breaks swipe/stacking/region semantics with multiple toasts. This is an architectural defect, not just style. Highest-value fix in the sweep.

2. **`SelectContent` lacks the transform-origin anchor that `ComboboxList` has.** `ComboboxList.vue:` uses `origin-(--reka-combobox-content-transform-origin)` so the scale-in animates from the trigger edge; `SelectContent.vue` (read in full) omits the equivalent `--reka-select-content-transform-origin`. Minor — the popover scale-in anchors from center instead of the trigger. A consistency gap in the popover-family animation language (Select vs Combobox vs Popover vs DropdownMenu vs HoverCard should all anchor identically).

3. **`Switch` thumb geometry is hardcoded, off the token system.** `Switch.vue` bakes `h-6 w-11` track + `h-5 w-5` thumb + `translate-x-5` as literal Tailwind classes — it does NOT read the `--slider-*`-style CSS-var geometry the Slider thumb does (`Slider.vue:196` reads `--slider-thumb-size` etc.). For a unified iOS-26 control language the on/off thumb and the slider knob should share a halo/spring/size vocabulary. Currently Switch has no press-spring, no focus halo rung — it's a plain shadcn switch under the warm-cream skin.

4. **`Checkbox` has no indeterminate visual.** `Checkbox.vue` renders a `Check` glyph unconditionally inside `CheckboxIndicator`. reka 2.9's indicator force-mounts on `state === 'indeterminate'` too (`node_modules/reka-ui/dist/checkbox/CheckboxIndicator.js:30`), so an indeterminate checkbox shows a checkmark — wrong glyph. Should branch on `data-[state=indeterminate]` to a `Minus` glyph. reka 2.9 also added `CheckboxGroupRoot` (array support) + `trueValue`/`falseValue` — uncovered surface.

5. **Default `Input` register reads flat, not glass.** The inputs screenshot shows the default Input as a low-contrast bordered pill with no blur/material — it doesn't participate in the glass ladder. Fine as a decision, but worth an explicit material-register call (does the text-field family get a `glass-wash` rung like SelectTrigger's `default` variant does?). SelectTrigger already has `glass-wash` default vs `ghost`; Input/Textarea/NumberFieldInput use plain `bg-background`. Inconsistent material language across the input family.

## New reka 2.9 surface (substrate-without-consumer-aware seeds)

reka 2.9 shipped components glass-ui doesn't wrap (cite: [reka-ui releases](https://github.com/unovue/reka-ui/releases), [reka-ui releases overview](https://reka-ui.com/docs/overview/releases), fetched 2026-06-07): **ColorArea/ColorField/ColorSlider/ColorSwatch/ColorSwatchPicker** (directly relevant — glass-ui already has OKLCh color primitives + a spectrum Slider variant; a real Color* wrap could replace the hand-rolled spectrum slider), **Autocomplete** (string-modelValue sibling to Combobox; `data-empty` + `hideWhenEmpty`), **MonthPicker/YearPicker/TimeRangeField**, **DropdownMenuFilter**, **Splitter pixel sizing**, **Checkbox/Switch custom true/false values**, **global Tooltip content config**. Per the visual-load-bearing invariant (≥2 consumers), most are NOT worth wrapping speculatively — but **Color\*** and **Checkbox `trueValue`/`falseValue` + indeterminate** are the two with concrete existing in-repo demand.

## Tailwind v4.3 / Baseline-CSS angle (material modernization)

Cite: [Tailwind v4.3 blog](https://tailwindcss.com/blog/tailwindcss-v4-3) (fetched 2026-06-07). v4.3 adds first-party **scrollbar utilities** (`scrollbar-thin`, `scrollbar-thumb-*`/`scrollbar-track-*`) — relevant for the glass popover/combobox/select viewports which currently style scrollbars ad hoc or not at all; **`@container-size`** (height-aware container queries) — useful for the dock/configurator density cascade; new neutral palettes (mauve/olive/mist/taupe) that could enrich the warm-cream token set. The glass material (`src/styles/glass.css`) already uses the Baseline-safe `backdrop-filter` + `color-mix(in srgb …)` house pattern correctly, with a `prefers-reduced-transparency`/forced-opacity fallback (lines 369-378). Modern-web opportunity: the glass ladder is built on `srgb` color-mix; an `oklch` color-mix pass would give perceptually-even tints (the color/ subtree already speaks OKLCh).

## glass-atoms wave-seed list (DRY/KISS — 5 waves, not more)

- **W-α · reka-idiom hardening (the headline).** Refactor `Toast` to `useForwardPropsEmits` + hoist `ToastProvider`/`ToastViewport` to a single app-root `Toaster` (fix the per-toast provider nesting). Add `origin-(--reka-select-content-transform-origin)` to `SelectContent` for popover-family animation parity. One coherent "make every wrapper idiomatic" wave.
- **W-β · binding-regression guard.** A single e2e/Playwright spec that mounts Toggle/Combobox/TagsInput/Switch/Checkbox and asserts the *rendered effect* of the model binding (not just types) — closes the "only e2e catches it" gap from the memory note so future reka bumps can't silently regress. Pairs with a MIGRATION.md note on the Combobox `searchTerm`→`ComboboxInput v-model` move for external consumers.
- **W-γ · unified iOS-26 control material.** Bring Switch (and Checkbox) onto the Slider's token-driven geometry + halo + press-spring vocabulary; give the input family a coherent material register (glass-wash vs ghost vs flat) matching SelectTrigger. The "consistent design+interaction+animation language" core ask.
- **W-δ · Checkbox/Switch completion.** Indeterminate `Minus` glyph (branch on `data-[state=indeterminate]`), wire reka 2.9 `trueValue`/`falseValue`, evaluate `CheckboxGroupRoot`. Small, contained.
- **W-ε · material modernization (optional, audit-gated).** OKLCh color-mix pass on the glass ladder; Tailwind v4.3 scrollbar utilities on glass viewports; evaluate wrapping reka 2.9 `Color*` to retire the hand-rolled spectrum Slider (only if ≥2 consumers materialize — visual-load-bearing invariant).

## Key file:line references

- `src/components/ui/toast/Toast.vue` — manual emit re-fire + per-toast provider/viewport (W-α)
- `src/components/ui/select/SelectContent.vue:46` — missing transform-origin vs `combobox/ComboboxList.vue` `origin-(--reka-combobox-content-transform-origin)` (W-α)
- `src/components/ui/switch/Switch.vue` — hardcoded `h-6 w-11`/`h-5 w-5`, no token geometry/halo/spring (W-γ)
- `src/components/ui/checkbox/Checkbox.vue` — unconditional `Check`, no indeterminate branch (W-δ)
- `src/components/ui/slider/Slider.vue:196-234` — the canonical token-geometry+halo+spring vocabulary to propagate (W-γ reference)
- `src/components/ui/combobox/Combobox.vue` + `node_modules/reka-ui/dist/combobox/ComboboxInput.cjs:46` — searchTerm lives on ComboboxInput v-model (W-β migration note)
- `src/styles/glass.css:51-103,369-378` — glass ladder (srgb color-mix + reduced-transparency fallback) (W-ε)

## Citations

- reka-ui releases (2.9.x new components, fixes): https://github.com/unovue/reka-ui/releases — fetched 2026-06-07
- reka-ui releases overview: https://reka-ui.com/docs/overview/releases — fetched 2026-06-07
- reka-ui TagsInput API (`.md`): https://reka-ui.com/docs/components/tags-input.md — fetched 2026-06-07
- reka-ui Combobox API (`.md`, searchTerm on Input): https://reka-ui.com/docs/components/combobox.md — fetched 2026-06-07
- reka-ui Checkbox API (indeterminate via model, trueValue/falseValue): https://reka-ui.com/docs/components/checkbox — fetched 2026-06-07
- reka-ui ToggleGroup API: https://reka-ui.com/docs/components/toggle-group.md — fetched 2026-06-07
- Tailwind CSS v4.3 (scrollbars, @container-size, palettes): https://tailwindcss.com/blog/tailwindcss-v4-3 — fetched 2026-06-07
- Installed-source verification: `node_modules/reka-ui/dist/{Toggle,combobox,TagsInput,checkbox}/*` at reka-ui 2.9.7

---

### Lane 6

The Card story confirms the five-tier glass ladder rendering — translucent warm cards on the cream background, with the wash→overlay progression. I now have full grounding. Synthesizing the brief.

---

# AW Tranche — Lane "shadcn-cva-idiom" Research Brief

**Scope:** Idiomatic shadcn-vue + CVA sweep of `src/components/ui/*`. Research only — wave seeds, no implementation.
**Verdict:** glass-ui's *architecture* is idiomatic shadcn-vue (wrapper / primitive / compound). The *drift* is real but bounded — it lives in three places: (1) `data-slot` coverage, (2) the modern CVA base-string idiom (svg-sizing, `has-[>svg]`, `aria-invalid`), and (3) inconsistency between components that were modernized (Alert, Card) and those frozen at an older idiom (Button, Toggle, Badge, Input). This is a *consistency* tranche, not a rewrite.

## Versions (all current)
- `reka-ui` 2.9.7 installed (peer `^2.9.7`) — latest. `class-variance-authority ^0.7`. `tailwindcss 4.3.0` installed. All on the 2026 baseline. No version-bump motivation; the drift is idiom, not stale deps.

## Canonical 2026 idiom (citations)
- **`data-slot` on every primitive** is the headline shadcn/ui + shadcn-vue Tailwind-v4 convention — "every primitive now has a data-slot attribute for styling." [shadcn-vue.com](https://www.shadcn-vue.com/) · [changelog, Nov 2025](https://www.shadcn-vue.com/docs/changelog), fetched 2026-06-06.
- **Canonical `Button.vue`** binds `data-slot="button"` + `:data-variant` + `:data-size`. glass-ui's Button binds only `:data-size`. Source: [unovue/shadcn-vue new-york-v4 Button.vue](https://raw.githubusercontent.com/unovue/shadcn-vue/dev/apps/v4/registry/new-york-v4/ui/button/Button.vue), fetched 2026-06-06.
- **Canonical `buttonVariants` base string** carries icon-sizing + focus + invalid utilities glass-ui's base omits: `gap-2 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3 aria-invalid:ring-destructive/20 aria-invalid:border-destructive`; sizes use `has-[>svg]:px-3`. Source: [new-york-v4 button/index.ts](https://raw.githubusercontent.com/unovue/shadcn-vue/dev/apps/v4/registry/new-york-v4/ui/button/index.ts), fetched 2026-06-06.
- **reka-ui styling guide** confirms `data-*` state attributes are the canonical Tailwind-variant target. [reka-ui.com/docs/guides/styling](https://reka-ui.com/docs/guides/styling), fetched 2026-06-06.

## Findings (file:line)

**1. `data-slot` is essentially absent on family roots.** 36 of 37 `ui/` root components ship NO `data-slot` (`button/Button.vue`, `input/Input.vue`, `toggle/Toggle.vue`, `slider/Slider.vue`, `select/Select.vue`, `tabs/Tabs.vue`, … — full list in audit). The 29 files that DO carry it are sub-components in alert/card/carousel/combobox/number-field only. `card/Card.vue:62` has `data-slot="card"`; `button/Button.vue:30-36` has none. This is the single biggest, most mechanical drift.

**2. Two CVA idioms coexist — one modern, one legacy.**
- *Modern* (matches 2026 canon): `alert/index.ts:8` — `grid has-[>svg]:grid-cols-[…] [&>svg]:size-4 *:data-[slot=alert-description]:…`. This is verbatim-current shadcn-vue.
- *Legacy*: `button/index.ts:9` base has no `[&_svg]` icon-sizing, no `gap`, no `aria-invalid`, no `has-[>svg]:` padding; `badge/index.ts:5` uses `transition-colors` (canon is `transition-all`) and has no svg-sizing; `toggle/index.ts:25` same.
The inconsistency is the problem — Alert proves the team knows the idiom; Button/Badge/Toggle predate it.

**3. Icon-sizing contract is unenforced.** Only `alert/index.ts` and `combobox/ComboboxItem.vue` use `[&_svg]`/`[&>svg]:size-4`. Button, Badge, Toggle, the menu family, and Input rely on each consumer/icon to self-size. Canon bakes `[&_svg:not([class*='size-'])]:size-4` into the base so a bare `<Plus/>` auto-sizes — glass-ui has no equivalent, so icon size is ad-hoc per call site.

**4. `aria-invalid` styling is missing from the form atoms.** Grep finds `aria-invalid` only in an `input/Input.vue` comment (line 16), never as a paint selector. Canon paints `aria-invalid:ring-destructive/20 aria-invalid:border-destructive` on Button + every input-shaped control. glass-ui has the `useUserInvalidAria` bridge (named in Input header) but no CVA/CSS error-paint — the invalid state is announced but not *seen*.

**5. Focus-ring is CSS-utility-driven, not Tailwind-`focus-visible:ring`.** glass-ui routes focus through the `.focus-ring` / `.btn-pill` / `.glass-btn` CSS utilities (`utilities.css:140`, `glass.css:236`), keyed off a single `--focus-ring-shadow` token. Canon inlines `focus-visible:ring-ring/50 focus-visible:ring-[3px]` in the CVA. This is a *legitimate, defensible* token-first divergence (matches the J "token-first" invariant) — flag it as **keep, document**, not fix. The only real gap: it's applied inconsistently (Button/Badge/Toggle/Input have no ring marker in template; Checkbox/Switch do), so audit which interactive atoms actually receive it.

**6. `data-variant` passthrough is sparse.** Only `slider/Slider.vue` binds `:data-variant`. Canon binds `:data-variant` + `:data-size` on every CVA component so consumers can style via attribute selector without re-deriving the variant. Cheap, mechanical, high-leverage for the dock/consumer override story.

**7. `cn()` is a hand-rolled deduplicator, not `tailwind-merge`** (`utils/cn.ts:28`, ~30 enumerated conflict buckets, ~0.5KB vs 22KB). This is a deliberate, well-documented choice. **Risk to flag, not fix:** the new idiom adds utility shapes the bucket table doesn't cover — `[&_svg]:size-4` arbitrary-selector tokens, `has-[>svg]:px-3`, `ring-[3px]`. These pass through untouched (line 167 "tokens that don't match a known bucket pass through"), which is *correct* (they don't conflict), but if AW adds `size-*` to icons the `size` bucket (line 108 `/^size-/`) could collide an icon `size-4` against a host `size-9` on the same element — verify no false-merge.

**8. Glass material + cards are sound and on-aesthetic.** The five-rung ladder (`glass.css:50-103`), `.glass-card` with `:has(:focus-visible)` focus-elevation (`glass.css:197`), `@supports not backdrop-filter` fallback (`glass.css:398`), and `color-mix` alpha derivatives all match the warm-cream iOS-26 Liquid-Glass target confirmed in the Card/Dialog screenshots (translucent cream plates, pill buttons, hairline borders, `radius-pill`/`radius-card` tokens at `theme.css:46-47`). No structural drift here — the glass faction is the *reference* the atoms should be brought up to, not the other way round.

## glass-atoms wave-seeds (DRY/KISS — 4 waves)

- **W-α · `data-slot` + `data-variant` blanket sweep.** Add `data-slot="<name>"` to all 36 family roots + sub-components, and `:data-variant`/`:data-size` to every CVA-bearing root (Button, Badge, Toggle, Avatar, Sheet, Slider, Alert). Pure-additive, mechanical, zero visual delta. One gate: a `proof:data-slot` test asserting every `ui/` root carries one (mirrors the existing proof-script house style). *This is the headline wave.*

- **W-β · CVA base-string modernization (Button/Badge/Toggle).** Bring the three legacy CVA bases to 2026 canon: bake `[&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 [&_svg]:pointer-events-none` icon-sizing into each base, add `gap` where canon does, switch Badge `transition-colors`→`transition-all`, and add `has-[>svg]:` padding to Button sizes. Keep glass-ui's `btn-pill`/`focus-ring`/token bindings — overlay the icon+gap idiom *onto* the existing recipe, don't replace it. Verify against `cn()` bucket table (finding 7).

- **W-γ · `aria-invalid` error-paint for form atoms.** Add an `aria-invalid:` paint contract (border + ring tint via `--destructive` color-mix, token-first to match house pattern) to Input, Textarea, NumberFieldInput, Select trigger, Combobox input — wiring it to the existing `useUserInvalidAria` bridge so the announced-invalid state also *paints*. Closes the seen-vs-announced gap (finding 4).

- **W-δ · focus-ring consistency audit (CLOSE-as-keep candidate).** Audit which interactive atoms actually receive `.focus-ring`/`focus-visible` (Button/Badge/Toggle/Input templates currently show no marker — verify the ring rides via `btn-pill`/`input-pill` CSS, finding 5). Document the deliberate CSS-utility-over-Tailwind-`ring` divergence in CLAUDE.md as an intentional token-first choice, and fix only the atoms that genuinely have no focus paint. Likely a small fix + a doc paragraph, not a wave's worth of churn — fold into W-α if thin.

**Do NOT spawn waves for:** the glass material/cards (finding 8 — reference-quality already), `cn()` replacement (finding 7 — deliberate, keep), `menuItemVariants` (`_shared/menuItemVariants.ts` already modern: `data-[highlighted]`, four-state, indicator/density axes), or Alert/Card (already canon). Resist proliferation — α+β+γ is the real surface; δ is a doc+spot-fix.

**Artifacts:** screenshots at `/Users/mkbabb/Programming/glass-ui/aw-buttons.png` (Dialog story — pill buttons, destructive red, glass card on cream) and `/Users/mkbabb/Programming/glass-ui/aw-card.png` (five-tier glass ladder). Key source: `/Users/mkbabb/Programming/glass-ui/src/components/ui/button/{index.ts,Button.vue}`, `/Users/mkbabb/Programming/glass-ui/src/components/ui/alert/index.ts` (the modern reference), `/Users/mkbabb/Programming/glass-ui/src/utils/cn.ts`, `/Users/mkbabb/Programming/glass-ui/src/styles/glass.css`.

---

### Lane 7

# AW tranche — lane `tailwind-v43-mwg`: Tailwind v4.3-idiom + mwg-Baseline wave seeds for the glass atoms

**Scope.** Research-only (no `src` writes). Target = idiomatic **Tailwind v4.3** (latest; no v5) + **modern-web-guidance** Baseline CSS, applied to the glass atoms: the material/effect (5-rung ladder + specular), the cards, and the primitives (Button/Badge/Input). Grounded in the running glass-ui demo (`localhost:5175`) and the on-disk styles. The AW charter (`docs/tranches/AW/AW.md`) already plans 19 waves; **this lane is additive — it folds 5 tight atom-polish seeds, none of which overlap the dock/aurora/blob/datatable arcs.**

## Headline verdict

glass-ui's atom layer is **already deeply idiomatic** — it uses `light-dark()` (71 sites in `tokens.css`), `color-mix(in srgb/oklab …)`, `:user-invalid`/`:user-valid`, `scrollbar-color` (Tailwind v4.3's headline feature, already hand-rolled), `mask-image`, `field-sizing: content`, `content-visibility`, `@property`-typed specular, `forced-colors`, and full PRM/reduced-transparency brackets. The mwg `css` guide reads like a description of this repo. **The gaps are narrow and additive**, concentrated in three Tailwind-v4.1+ utilities the repo predates and one Baseline visual idiom (squircle) that the demo's own Chromium build now supports.

## Findings + citations

### F1 — Hand-rolled text-shadows bypass Tailwind v4.1's `text-shadow-*` token surface
v4.1 shipped `text-shadow-2xs…text-shadow-lg` + colored `text-shadow-<color>` + opacity modifiers ([Tailwind v4.1 blog, 2025-04](https://tailwindcss.com/blog/tailwindcss-v4-1)). glass-ui hand-authors every text-shadow as a raw multi-stop literal and has **no `--text-shadow-*` `@theme` tokens** (live probe: `--text-shadow-sm` → `(none)`):
- `src/styles/utilities.css:236-246` (`.depth-text` — 9-layer hand stack)
- `src/styles/typography.css:489-491` (`.text-engraved` — 2-stop hand stack)

The repo otherwise threads *every* visual axis through `@theme` (theme.css §"Shadows"). text-shadow is the lone shadow family with no token bridge — a consistency hole, not a paint bug. Per mwg `css §5`: "DO NOT specify nontrivial styling values inline."

### F2 — No `corner-shape: squircle` progressive enhancement on the cards/dock/pills
mwg `css §8 Shapes` (retrieved): "Use `corner-shape: squircle` for more aesthetically pleasing curves as a progressive enhancement over regular rounded corners." The demo's Chromium build **supports it** (live probe `CSS.supports('corner-shape','squircle')` → `true`). The iOS-26 Liquid Glass aesthetic AW §5 commits to is *literally* a squircle language — Apple's continuous-corner geometry. grep: **zero** `corner-shape`/`squircle` in `src/`. This is the single highest-leverage aesthetic fold for the "iOS-26" axis, and it degrades to the existing `border-radius` with no fallback cost.

### F3 — The glass ladder is invisible on the default cream backdrop (corroborates AW.W12)
Screenshot of `/foundations/paper-glass` (`glass-ladder.png`): wash/quiet/resting/floating/overlay read as five near-identical pale cards. Live probe confirms they ARE alpha-monotonic (0.30 → 0.50 → 0.65 → 0.80 → 0.95 over `srgb 0.982 0.981 0.978`) and blur-distinct — but on a flat near-white field there's nothing to refract, so the ladder collapses perceptually. AW.W12 already plans the high-frequency backdrop; **this lane reinforces it and adds the v4.1 `mask-*`/`drop-shadow-<color>` tints as the cheap ladder-legibility lever** (warm colored under-shadow per rung makes the lift read even on cream).

### F4 — `wrap-anywhere`/`wrap-break-word` + `text-wrap` not threaded into the prose/label atoms
v4.1 added `wrap-break-word`/`wrap-anywhere` overflow-wrap utilities ([v4.1 blog](https://tailwindcss.com/blog/tailwindcss-v4-1)); mwg `css §7` + `accessibility §9` mandate `text-wrap: pretty` (body) / `balance` (headlines) and `overflow-wrap: break-word` for long tokens. glass-ui uses `text-wrap: pretty` in exactly one place (`.section-description`, utilities.css:36) and **nowhere else** — no `balance` on the type-display ladder, no `wrap-anywhere` on Badge/metric-badge (which `overflow: hidden` + truncate instead). The metric-badge max-width clip (utilities.css:377) would read better with `wrap-anywhere` for long values.

### F5 — v4.3 features that are correctly NOT needed (negative findings, recorded so they aren't re-litigated)
- **`scrollbar-*` utilities (v4.3 headline):** glass-ui already ships the canonical `scrollbar-color` + `@supports not (scrollbar-color: auto)` webkit fallback (utilities.css:121-137, tokens.css:387) — *more* correct than the bare v4.3 utility because it carries the fallback. **Keep as-is; do NOT swap to `scrollbar-thin`.**
- **`@container-size` (v4.3):** the dock/chassis container queries are inline-size only and correctly so. No height-axis query is warranted.
- **`font-features-*` (v4.2):** tabular-numerics are already handled via the mono stack; no new need.
- **Logical-property utilities (`pbs/mbs/inline/block`, v4.2):** mwg `css §1` prefers logical props, and the repo already uses `min-block-size`/`max-block-size`/`padding-inline`. Opportunistic, not a wave.
- **New `mauve/olive/mist/taupe` palettes (v4.2):** the warm-cream identity is the brand; per the user's "presets in consumers" memory, do NOT adopt stock palettes into library tokens.

### F6 — mwg gradient/tint correctness is already satisfied (audit confirmation)
mwg `css §8`: tints via `color-mix()` not `oklch(from … L …)` (browsers lack gamut mapping). glass-ui uses `color-mix(in srgb, …)` throughout — correct. mwg notes `color-mix` needs no `@supports` fallback (unlike gradient interpolation). The one note: mwg recommends `in oklab` over `in srgb` for *tint generation* ("DON'T use `in srgb` unless you have a specific reason"). glass-ui's surface-tints use `in srgb` — defensible (matching brand hand-tuning) but worth a documented rationale rather than silent.

## glass-atoms wave-seed list (additive to AW.md; fold into Band D / W13-W15)

These are **tight, DRY, KISS** — they do not proliferate new waves; each rides an existing AW slot.

| Seed | Folds into | What | mwg / TW cite | Gate sketch |
|---|---|---|---|---|
| **AS-1 · text-shadow token bridge** | **W15 (hygiene)** | Add `--text-shadow-{2xs,xs,sm,md,lg}` to `theme.css @theme` (warm `--shadow-color`-derived, dark-adaptive via the existing `color-mix` pattern); re-express `.depth-text` + `.text-engraved` to compose the tokens. One source per the cartoon-shadow precept. | [TW v4.1](https://tailwindcss.com/blog/tailwindcss-v4-1); mwg `css §5` | `proof:text-shadow-token` — `text-shadow-sm` utility resolves a non-empty value; no raw multi-stop `text-shadow:` literal survives outside the token defs |
| **AS-2 · squircle corner-shape PE** | **W13 (affordance) or W12** | Add `corner-shape: squircle` as a `@supports`-gated progressive enhancement on `.glass-card`/`.glass-pill`/`.glass-dock`/`.btn-pill` over the existing `border-radius`. Pure PE — degrades to current rounded corners. The literal iOS-26 geometry the tranche commits to (AW §5). | mwg `css §8 Shapes`; live Chromium support confirmed | `proof:squircle-pe` — the `corner-shape` decl sits inside `@supports (corner-shape: squircle)`; the base `border-radius` is unchanged so non-supporting engines paint identically; bite: an ungated `corner-shape` → RED |
| **AS-3 · colored per-rung under-shadow (ladder legibility)** | **W12 (glass-panel/ladder)** | Tint the existing `--glass-under-shadow-*` rungs with a warm `drop-shadow-<color>`-style cast so the ladder lift reads on the flat cream field (F3), composing with W12's high-frequency backdrop. Token-only; no new utility. | [TW v4.1 colored shadows](https://tailwindcss.com/blog/tailwindcss-v4-1); mwg `accessibility §9` (3:1 non-text contrast) | rides `proof:glass-panel-tiers` — the five rungs resolve five distinct computed under-shadows AND clear the 3:1 boundary-contrast floor on cream |
| **AS-4 · text-wrap on the type + label atoms** | **W15 (hygiene)** | `text-wrap: balance` on the `--type-display-*` ladder + `<th>`/section-heading; `text-wrap: pretty` on body/prose classes; `wrap-anywhere` on `.metric-badge`/`.badge` value slots instead of bare `overflow: hidden`. NOT on `*` (mwg perf caveat). | mwg `css §7`, `accessibility §9`; [TW v4.1 `wrap-*`](https://tailwindcss.com/blog/tailwindcss-v4-1) | `proof:text-wrap-atoms` — display headings carry `balance`, prose carries `pretty`, and no `text-wrap` lands on a universal selector |
| **AS-5 · oklab tint rationale (doc-only)** | **W19 close / W15** | Either migrate the surface-tint generation to `color-mix(in oklab, …)` per mwg `css §8`, OR add a one-line in-source rationale for the deliberate `in srgb` (brand hand-tuning). No silent `in srgb`. | mwg `css §8 Gradients and color-mix` | overfitting-audit row: every `in srgb` tint either migrated or carries a documented rationale |

**Disjointness:** AS-1/AS-4/AS-5 land in W15 (hygiene), AS-2/AS-3 land in W12/W13 (component fix pass). None touch the dock/aurora/blob/constellation surfaces. All are net-additive token/PE folds (inv P2 net-neutral-or-deletion holds — AS-1 deletes hand-rolled literals).

**KISS guard:** explicitly **rejected** as non-waves (F5): scrollbar-utility swap, `@container-size`, `font-features-*`, stock v4.2 palettes. The repo's existing idioms are already at or above the v4.3 bar; the only real headroom is the four token/PE folds above.

## Files referenced (absolute)
- Styles audited: `/Users/mkbabb/Programming/glass-ui/src/styles/{glass.css,glass-specular-track.css,theme.css,tokens.css,cards.css,utilities.css,transitions.css,typography.css,index.css}`
- Atoms: `/Users/mkbabb/Programming/glass-ui/src/components/ui/{button/index.ts,card/Card.vue,badge/index.ts}`
- Charter: `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/AW.md`
- Screenshot (ladder-on-cream legibility, F3): `/Users/mkbabb/Programming/glass-ui/glass-ladder.png`

## Sources
- [Tailwind CSS v4.1: Text shadows, masks, and tons more](https://tailwindcss.com/blog/tailwindcss-v4-1) (2025-04)
- [Tailwind CSS v4.3: Scrollbars, new colors, and more](https://tailwindcss.com/blog/tailwindcss-v4-3) (2026-05)
- [Tailwind CSS releases](https://github.com/tailwindlabs/tailwindcss/releases)
- modern-web-guidance `css`, `css-layout`, `accessibility`, `scroll-entry-exit-effects`, `soft-edge-content-fade` (via `npx modern-web-guidance@latest`, retrieved 2026-06-07)

---

### Lane 8

# AW Tranche — Glass-Atoms Cohesion Brief (Lane: atoms-cohesion)

Research only. Wave seeds, no implementation. All citations are `file:line` from HEAD.

## The cohesion question, answered

Glass-ui has a *strong, well-designed token spine* for the design language — iOS-canonical springs, a five-rung glass ladder, a press/hover/focus token triad, semantic radii. But the **atoms apply that spine unevenly**. The material/effect layer and the card layer are cohesive; the **interactive primitives are not**. Four divergence axes, each with a clean KISS fix.

The good news: the canonical recipes already exist (`.tap-squish`, `.btn-interactive`, `.focus-ring`, `transition-control`, the `--scale-press`/`--radius-*` tokens). The work is **routing every atom onto the existing canon**, not inventing new primitives. This is a DRY consolidation tranche, not a redesign.

---

## Finding 1 — The press-spring is applied to 4 atoms, missing on ~7 interactive ones

The iOS Liquid Glass "tap-squish" (`scale → --scale-press`, returned by `--spring-snappy`) is the system's signature interaction. The token canon is explicit that *"every primitive reaches for it unless it has a documented reason"* (`src/styles/tokens.css:1013-1016`). The shared recipe `.tap-squish` exists and is correct (`src/styles/utilities.css:201-216`).

But only **Button, Toggle(card), Slider, Progress** carry a press scale. These interactive atoms have **zero press feedback**:

- `checkbox/Checkbox.vue:24` — no `active:`
- `radio-group/RadioGroupItem.vue:28` — no `active:`
- `switch/Switch.vue:29` — `transition-colors` only; thumb has no give
- `select/SelectTrigger.vue:41` — `transition-control`, no press
- `tabs/TabsTrigger.vue:22` — `transition-control`, no press
- `accordion/AccordionTrigger.vue:26` — `transition-colors hover:underline`, no press
- `number-field/NumberFieldInput.vue:29` — no press

Result: pressing a Button squishes; pressing a Checkbox/Switch/Select does nothing. The interaction language is inconsistent across the atom set. Pure source survey confirms: `grep "active:scale|scale-press"` hits only `button/`, `toggle/`, `slider/`, `progress/`.

---

## Finding 2 — Radius vocabulary is fragmented across control atoms

The semantic radius tokens are well-defined (`src/styles/theme.css:30-49`): `--radius-input`/`--radius-button` → `var(--radius)` (the 0.625rem base), `--radius-pill`, `--radius-badge` → pill, etc. But atoms reach for **different rungs for the same conceptual shape**:

| Atom | radius used | citation |
|---|---|---|
| Checkbox | `rounded-sm` (4px) | `checkbox/Checkbox.vue:24` |
| Radio | `rounded-pill` | `radio-group/RadioGroupItem.vue:28` |
| Switch track | `rounded-pill` | `switch/Switch.vue:29` |
| SelectTrigger | `rounded-pill` | `select/SelectTrigger.vue:41` |
| Input | `--radius-pill` (via `.input-pill`) | `glass.css:287` |
| NumberFieldInput | `rounded-input` (→ base 0.625rem) | `number-field/NumberFieldInput.vue:29` |
| TabsTrigger | `rounded-sm` | `tabs/TabsTrigger.vue:22` |
| Toggle | `rounded-button` (→ base) | `toggle/index.ts:25` |
| Badge | `rounded-badge` (→ pill) | `badge/index.ts:6` |
| Alert | `rounded-lg` (→ base, raw not semantic) | `alert/index.ts:8` |

The text-input family disagrees with itself: `<Input>` is a full pill (`--radius-pill`) but `<NumberFieldInput>` is the base 0.625rem. Two text fields, two shapes. SelectTrigger is a pill but lives next to NumberField's softer rect. Tabs and Checkbox use the *raw* `rounded-sm` literal instead of a semantic token. This is the visible rhythm break in the warm-cream aesthetic.

---

## Finding 3 — focus-ring + transition discipline is inconsistent

The canonical focus treatment is `.focus-ring` (`utilities.css:140-144`, box-shadow ring from `--focus-ring-shadow`), applied on 16 atoms. But:

- **AccordionTrigger** (`accordion/AccordionTrigger.vue:26`) and **CollapsibleTrigger** carry **no `focus-ring` at all** — they fall back to the UA outline + `hover:underline`. Keyboard users get a different focus affordance on those two than on every other trigger. (Likely a real a11y gap, not just cosmetic.)
- **Transition vocabulary splits three ways**: `transition-control` (SelectTrigger, TabsTrigger — the canon, `utilities.css:698`), bare `transition-colors` (Switch, Accordion, Toggle, Badge, ToastAction), and per-site arbitrary wraps elsewhere. `transition-colors` omits `box-shadow`/`border-color`, so focus-ring fade-in and border shifts snap instead of animating on those atoms.
- **Hardcoded non-token color**: `notification/Notification.vue:25` uses `hover:bg-white/10` (a raw white alpha that paints wrong in light mode and bypasses the `--surface-tint-*` cascade the rest of the system uses).

---

## Finding 4 — Glass-tier usage is cohesive for floating surfaces EXCEPT Toast + Command

The glass ladder is applied consistently across most floating/overlay surfaces — Popover, Tooltip, DropdownMenu, HoverCard, ContextMenu, Combobox, SelectContent, Dialog all use `glass-floating` (verified via grep). Two outliers break the "navigation/overlay band is glass" discipline the codebase itself documents (`glass.css:1-19`):

- **Toast** (`toast/Toast.vue:38`) — a floating overlay surface, but uses bare `border` + `shadow-modal` + `rounded-panel`, **no `glass-*` tier**. Every other portal surface is frosted glass; the toast is an opaque card. Visually off-band.
- **Command** family (`command/*.vue`) — `grep -L glass-` shows the entire Command package has no glass tier on any surface, while its sibling DropdownMenu/Combobox do.

The five-tier ladder itself (`glass.css:48-106`), the material folds (rim light, specular, under-shadow, content-aware shadow), and the Card surface (`card/Card.vue`) are **cohesive and SOTA** — no work needed there. iOS-26 Liquid Glass + warm-cream reads correctly on Button/Card/Dialog (confirmed by demo screenshots: warm-cream pills, frosted plates, cohesive).

---

## Glass-atoms wave-seed list (minimal, KISS — 5 waves)

Sequenced so each wave is one coherent axis. No new primitives; every wave routes atoms onto recipes that already exist. Over-proliferation explicitly avoided (e.g. NOT a wave-per-atom).

**AW.W1 — Press-spring universalization.** Compose `.tap-squish` (or `active:scale-[var(--scale-press)]`) onto every interactive atom currently missing it: Checkbox, Radio, SelectTrigger, TabsTrigger, AccordionTrigger, Switch-thumb, NumberField steppers. One recipe, ~7 sites. Honors the existing PRM bracket (`utilities.css:210`) for free. *Closes Finding 1.*

**AW.W2 — Radius vocabulary consolidation.** Pick the canonical shape per atom-class and route every atom through the *semantic* token (kill raw `rounded-sm`/`rounded-lg` literals). Decide the two real questions: (a) does the text-input family unify on pill or on base-radius — Input vs NumberField must agree; (b) Checkbox/Tabs move off `rounded-sm` to `--radius-sm`/`--radius-input`. Token-only edits, zero new tokens. *Closes Finding 2.*

**AW.W3 — Focus + transition discipline.** Add `.focus-ring` to AccordionTrigger + CollapsibleTrigger; migrate bare `transition-colors` atoms (Switch, Toggle, Badge, ToastAction, Accordion) to `transition-control` so border/shadow/focus animate uniformly; replace `notification/Notification.vue:25` `hover:bg-white/10` with a `--surface-tint-*` rung. *Closes Finding 3.*

**AW.W4 — Off-band surface correction.** Move Toast onto `glass-floating` (or `glass-overlay`) and bring the Command family onto the glass ladder, matching its DropdownMenu/Combobox siblings. *Closes Finding 4.*

**AW.W5 — Cohesion lock (proof gate).** A `proof:atoms-cohesion` script asserting the invariants the prior 4 waves establish: every interactive atom carries (press-rung ∨ documented-exemption) ∧ `.focus-ring` ∧ a semantic-radius token ∧ `transition-control`; every floating-band surface carries a `glass-*` tier. Mirrors the existing `proof:shadow-contract`/`proof:dock-vocabulary` machinery so the language can't silently re-fragment. *Prevents regression.*

### Why not more waves
The material layer, the spring tokens, the radius *token* set, and the focus *recipe* are already correct and SOTA — they need no wave. The defect is uniformity of *application*, which is 4 mechanical consolidations + 1 gate. Splitting finer (per-atom waves) would over-proliferate against the existing canon. KISS holds at 5.

### Open decisions for the orchestrator
1. Text-input radius: unify Input + NumberField on **pill** or on **base 0.625rem**? (Affects the warm-cream rhythm — pill reads more iOS, base reads more document-form.)
2. Switch thumb press: scale the thumb, or leave switches press-exempt (toggle semantics, the state-change *is* the feedback)? Document whichever.
3. Toast tier: `glass-floating` (lighter, on-brand) vs `glass-overlay` (heavier, modal-register) — pick per the toast's z-band.

### Key file references
- Tokens: `src/styles/tokens.css` (springs §2 L159-163, scales/focus §11 L1009-1033), `src/styles/theme.css:30-49` (radii)
- Canonical recipes: `src/styles/utilities.css` (`.tap-squish` L201, `.btn-interactive` L988, `.focus-ring` L140, `transition-control` L698), `src/styles/glass.css` (5-tier ladder L48-106, `.input-pill` L283, `.btn-pill` L255)
- Divergent atoms: `checkbox/Checkbox.vue:24`, `radio-group/RadioGroupItem.vue:28`, `switch/Switch.vue:29,34`, `select/SelectTrigger.vue:41`, `tabs/TabsTrigger.vue:22`, `accordion/AccordionTrigger.vue:26`, `number-field/NumberFieldInput.vue:29`, `toast/Toast.vue:38`, `notification/Notification.vue:25`, `alert/index.ts:8`

(Note: the running demo dev server has route-ID drift between instances — `/primitives/checks` redirected to other stories on the stale 5175 instance. Button/Card/Dialog rendered correctly and confirm material/card cohesion visually; the four findings are grounded in source, which is the load-bearing evidence.)
