# Pass-E META-STORYBOOK audit — forms/combobox

- **Page**: `forms/combobox`
- **Import label**: `@mkbabb/glass-ui/forms`
- **SFC**: `demo/stories/forms/combobox.vue`
- **Live**: http://localhost:5173/forms/combobox (verified)
- **North star**: DESIGN.md (iOS-26/27 Liquid Glass six-layer composite, 7 tiers, glass-cannot-sample-glass, spring physics) · design-idioms / motion-canon / affordance-map · PROCEDURAL-SUITE · dock APIs

## Verdict-at-a-glance

This is one of the thin/flat pages the BD mandate exists to fix. A SINGLE `max-w-sm`
combobox trigger floats in a vast, mostly-empty card over a flat near-white paper
wash. No aurora, no glass-over-color (so the morphism cannot read), no second
sub-section, no card-per-sub-section, no dock APIs, no procedural animation, and the
component's own API is barely exercised. Path label is correct; prose is borderline.

---

## (1) DEMO CONGRUENCE — does it show the component at its BEST + full API?

**FAIL — thin, single-state, hand-rolled trigger.**

- ONE combobox instance only (`combobox.vue:67–119`). The full component family ships
  10 sub-components (`src/components/ui/combobox/index.ts`): `Combobox, ComboboxAnchor,
  ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator,
  ComboboxList, ComboboxSeparator, ComboboxViewport` (+ reka `ComboboxCancel,
  ComboboxTrigger`). The demo uses 8 of them and NEVER demonstrates `ComboboxSeparator`
  or `ComboboxViewport` (both exported, both dead on this page).
- The trigger is HAND-ROLLED as a raw `<button class="glass-wash focus-ring … rounded-full">`
  (`combobox.vue:70–85`) rather than a first-class glass trigger surface — so the page
  teaches a workaround, not the component at its best. No tag-input / multi-value combobox,
  no async/onSearch fuzzy variant, no `ComboboxCancel` clear affordance, no disabled item,
  no invalid/`aria-invalid` ring state (the `--invalid-ring` register CLAUDE.md documents
  for `ComboboxInput` is never shown).
- ZERO contextual-switching / dock-API exercise. The page does not compose `<GlassDock>`,
  `<DockStack>` (facets/stack), `<DockSection>`, or any contextual switch — even though the
  options literally split into two contexts (`basis` / `palette`) that a dock facet rail or
  tabbed context switch would showcase beautifully.
- Animation affordance is just the default reka open/close + the `.scroll-cascade` page
  build. The combobox itself carries no demonstrated liquid-reveal bloom, no spring, no
  high-affordance interaction beyond default.
- Live-verified: trigger opens, 8 items render across 2 groups (`Basis`, `Palette`), filter
  input present. The mechanism works — the DEMO is the problem, not the component.

## (2) COMPONENT ABILITY — a deft SERIES of glass-ui components, or thin/flat?

**FAIL — flat.** The page composes exactly: `StoryPage`, one `<IconChip>` (header),
one `<Label>`, one `<Combobox>` family, two `<p>` captions. No `<Card>`/`ShowcaseFrame`
sub-section hosts, no tabs, no buttons, no procedural-anim, no dock. It is a single
control dropped into the page body — the antithesis of "deftly uses a series of glass-ui
components." Compare even the sibling `select.vue`, which at least stages THREE sub-sections
(font / basis / density) — combobox has ONE.

## (3) GLASS SUFFUSION — live colorful field, or flat?

**FAIL — flat near-white wash, no glass morphism reads.**

- Live DOM probe: page substrate is `paper-underpaint fixed inset-0 -z-10 bg-background`
  (a flat near-white wash). `canvases: 0`, `aurora elements: 0`.
- Root cause: `manifest.ts:181` `CATEGORY_DEFAULT_BG.forms = "grid"` — the whole forms
  band defaults to a static grid/paper wash, NOT aurora. The combobox row (`manifest.ts:729`)
  declares no override, so it inherits `grid`.
- Consequence: the `glass-wash` trigger + the glass popover have nothing colorful behind
  them to refract — the six-layer optical composite (blur+saturate / tint / rim /
  catch-light / shadow / grain) is invisible against an off-white plate. The glass reads as
  a gray pill, exactly the FD-DOCK-1 / BG-2 "gray pill on charcoal" failure mode the STAGE
  work fixed elsewhere. PAPER morphism is technically present (the grid wash) but lifeless
  at this strength.
- The user's explicit ask — "glass demos over COLORFUL aurora backgrounds" — is unmet for
  this entire forms band by the category default.

## (4) STRUCTURE — own glassy card per sub-section? main card BIG enough?

**FAIL on both.**

- ONE `<section class="flex flex-col gap-3 max-w-sm">` (`combobox.vue:65`). It is NOT a
  glassy card — it is a bare flex column, and there is only one of it. "Each sub-section in
  its own glassy card" is entirely unmet (there are no sub-sections and no cards).
- Main card is OVERSIZED-AND-EMPTY, not "bigger + better used": the StoryPage body card
  spans the full `--story-page-max-inline` width (~1660px on screen) but the content is a
  `max-w-sm` (~384px) control hugging the left edge, leaving ~75% of the card as dead
  whitespace (see live full-page screenshot). The ask is more SCREEN SPACE well-USED; here
  the space exists but is squandered.

## (5) PATH-LABEL standardization

**PASS.** The subpath chip renders `@mkbabb/glass-ui/forms` (live-verified) and
`manifest.ts:238` maps `"forms/combobox": "@mkbabb/glass-ui/forms"`. Correct and standard.

## (6) LANGUAGE — superfluous prose to tighten

**MINOR.**

- Blurb (`combobox.vue:58–61`): "Type-ahead filtered selection — the section identity is the
  ONE color event." The trailing "the section identity is the ONE color event" is internal
  design-system meta-speak leaking into a user-facing blurb (it describes the demo's styling
  discipline, not the component). Tighten to the component fact: "Type-ahead filtered
  selection over grouped options." The identical leak exists in `select.vue:43–45`.
- The `combobox.vue:18–20` comment carries BC-tranche provenance ("BC.W-SUFFUSE-reconcile …
  PH3-safe") — fine as a code comment, not user-facing, but it signals the header is a
  copy-paste template shared verbatim with `select.vue:17–19` (drift risk).

## (7) BUGS

- No hard bug: the combobox opens, filters, and selects (live-verified, 8 items / 2 groups).
- `ComboboxSeparator` + `ComboboxViewport` are exported-but-unexercised on the canonical
  demo page (coverage gap, not a crash).
- The eval-driven open/close was clean; no console errors observed.

---

## Recommended redesign direction (for BD execution)

1. Override this row's background to a COLORFUL aurora (`s("forms","combobox",…,{ background:
   { kind:"aurora", palette:"…" } })`) so the glass trigger + popover refract a live field.
2. Split into ≥2-3 OWN glassy cards / `ShowcaseFrame tier="field"` sub-sections: (a) the
   grouped basis/palette combobox, (b) a tag-input / multi-value combobox, (c) an async /
   `onSearch` fuzzy variant + a `ComboboxCancel` clear + an `aria-invalid` ring state.
3. Replace the hand-rolled raw `<button>` trigger with the first-class glass trigger surface.
4. Use the dock contextual-switch API to flip the combobox's option-context (basis ↔ palette)
   as a live demo of dock-driven contextual switching — the options already model two contexts.
5. Fill the oversized main card: a multi-card bento that USES the screen width instead of a
   `max-w-sm` control in a sea of whitespace.
6. Tighten the blurb to component-facing language; de-template the shared header comment.
