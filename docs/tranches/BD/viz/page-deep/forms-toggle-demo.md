# Pass-E META-STORYBOOK audit — forms/toggle

- **Page**: `forms/toggle` · import `@mkbabb/glass-ui/toggle-group`
- **SFC**: `demo/stories/forms/toggle.vue` (151 lines)
- **Live**: http://localhost:5173/forms/toggle (spot-checked, screenshot `forms-toggle-live.png`)
- **Manifest row**: `demo/stories/manifest.ts:731` `s("forms", "toggle", "Toggle · Toggle Group")` — no bg override → `CATEGORY_DEFAULT_BG.forms = "grid"` (`manifest.ts:184`)
- **Verdict**: among the WEAKEST forms pages. Flat, thin, one-card stack over a dead cream substrate. The exact opposite of the BD north star.

---

## (1) DEMO CONGRUENCE — does it show each component at its BEST + full API?

Partially. The page exercises FOUR distinct primitives (`Toggle`, `ToggleGroup` multi + single, `ToggleChip` chip + cell) — good *breadth*. But each is shown at its dullest:

- **`Toggle` single** (`toggle.vue:54`) — one bare icon button + a `pressed · false` caption. No size axis, no variant axis, no disabled state, no animation affordance shown. The press-spring / specular gleam that the library ships (`useSpringPress`, the §6 register) is invisible at this scale.
- **`ToggleGroup type="multiple"`** (`:66`) `variant="outline"` and **`type="single"`** (`:85`) default variant — the page does NOT surface the `variant="card"` tile register (CLAUDE.md §W-CONTROL-TOKENS: `<ToggleGroupItem variant="card">` paints `--radius-card`), nor the radio-semantics arm visibly (`role="radiogroup"`/`aria-checked` — the headline a11y feature of the single arm is invisible to the eye). The DEFINING new dock-band APIs (contextual switching, morph) are **entirely absent** even though a toggle-group IS the canonical "switch one surface" control that a dock contextual-switch would drive.
- **`ToggleChip` chip** (`:103`) and **cell** (`:127`) — the cell variant uses a meaningless `bg-viz-fourier` swatch dot (`:138`) that has nothing to do with the `warm/cool/mono` palette labels it sits beside (a warm/cool/mono picker should show warm/cool/mono swatches — it shows three identical red dots). Demo is literally mislabeled vs. its own data.

**No contextual-switching / animation demonstration.** The user's binding ask ("leverage the dock APIs — contextual switching/animating; each page deftly uses a series of glass-ui components: docks/procedural-anims/cards/tabs/buttons") is unmet: zero dock, zero tabs, zero procedural-anim, zero card composition, zero animated reveal beyond the chassis `.scroll-cascade` entrance.

## (2) COMPONENT ABILITY — deft SERIES of glass-ui components, or thin/flat?

**Thin/flat.** The page composes only the four toggle primitives + one `IconChip` header glyph. It does NOT compose any of: `GlassDock` (the obvious contextual-switch host for "which toggle set is active"), `SegmentedTabs` (to switch between the multi/single/chip/cell registers), `ShowcaseFrame`/glass cards (the per-section host), `Button`, any procedural-anim backdrop. Compare the strong sibling `selectable-chip.vue` (`StorySection` + `ShowcaseFrame pad="lg"` per section) — and even THAT is card-flat with no aurora. The toggle page is a tier below: it doesn't even reach for `StorySection`.

## (3) GLASS SUFFUSION — live colorful field, or flat?

**FLAT — the cardinal miss.** Live check: `canvasCount: 0`, background element is `paper-underpaint fixed inset-0 -z-10 bg-background` — a static near-white cream wash, NOT a colorful aurora. The body card resolves `glass-resting` (`backdrop-filter: blur(10px) saturate(1.05)`, bg `oklab(0.934 … / 0.664)`) — so it IS a real glass tier, but **glass over a flat cream page has nothing behind to refract** (CLAUDE.md AX.W54: "The blur is imperceptible over a flat substrate"). The six-layer Liquid-Glass composite (DESIGN.md) cannot read: no backdrop to blur+saturate, no color to tint, the rim/catch-light are invisible at this contrast. The forms-band `grid` default (`manifest.ts:184`) is the engineering-paper register — defensible for dense forms, but the user explicitly asks "glass demos over COLORFUL aurora backgrounds." PAPER morphism: the page rides the paper-underpaint but does nothing with it (no `paper-grain-overlay`, no blueprint-grid rail, no `.paper-ink-mark`) — neither glass NOR paper morphism actually reads.

## (4) STRUCTURE — each sub-section its OWN glassy card? main card BIG enough?

**Both unmet.**

- **One outer card, six bare sections.** Live: the `.story-sections` stack lives inside ONE `glass-resting` body card (1152px), and the six children are raw `<section class="flex flex-col gap-3">` blocks (`toggle.vue:51,64,83,100,124`) separated only by the chassis `--configurator-divider` hairlines. The user's bar — "each sub-section in its OWN glassy card" — is NOT met. Each toggle register should be its own glass plate (the `ShowcaseFrame`/`glass-quiet`-tier-per-section pattern), ideally over the live field so the morphism reads per card.
- **Main card NOT bigger.** Article is bounded to `--story-page-max-inline` (the standard rhythm); the body card is 1152px of a 1440px viewport but mostly EMPTY — the toggle controls are tiny (a 32px icon button, a 3-icon group) afloat in vast whitespace. The user asks the main card area to be BIGGER / use more screen space; here the screen is under-used by content, not over-used. A bigger, denser, multi-card bento would serve.

## (5) PATH-LABEL standardization

**Correct.** Live subpath chip renders exactly `@mkbabb/glass-ui/toggle-group` (single, matches `manifest.ts:240`). No action — this is the standard the other pages should match.

## (6) LANGUAGE — superfluous prose to tighten?

- **Double-header / redundant descriptor.** The chrome renders the big `Toggle · Toggle Group` title + subpath chip (StoryPage chrome), then the SFC's OWN in-body `<header>` (`toggle.vue:30-48`) re-states `Forms · Toggle` + a blurb "On/off and grouped toggles — the section identity is the ONE color event." This is a hand-rolled duplicate of the chassis eyebrow/blurb. The "— the section identity is the ONE color event" tail is internal design-process meta leaking into the user-facing demo (same in `toggle-chip.vue:55`). **Tighten**: drop the hand-rolled `<header>` entirely (the chassis already shows eyebrow+title+blurb); if a section accent is wanted, use `StorySection`.
- Section captions are fine (`single toggle`, `marks · [bold]`) — terse, keep.

## (7) BUGS / dead demo

- **Mislabeled cell swatches (`toggle.vue:138`)**: `warm/cool/mono` cells each render `<span class="h-6 w-6 rounded-full bg-viz-fourier" />` — three identical red dots regardless of the warm/cool/mono label. Either bug or copy-paste filler; the swatch should reflect the palette it names. Concrete, visible, wrong.
- **No animation affordance** beyond the chassis entrance — the user's "HIGH animation affordance for EVERY component" bar fails. The toggles flip state with no spring/morph reveal exercised on-page.
- No console errors observed; no broken render; the four primitives DO toggle live (functional, just flat).

---

## Recommended transposition (architectural, not patch)

1. **Per-register glass cards over a LIVE aurora.** Wrap the four registers (single Toggle · multi group · single group · chip/cell) each in its own `ShowcaseFrame tier="field"` (the BG-2 glass-over-field host) seated on a per-route `<Aurora>` backdrop (or `<DockStage>`-style shared offscreen-paused field) so the six-layer composite actually reads — one GL context per route (the budget). Forms-band could keep `grid` as the page wash but float the demo cards over a contained colorful field.
2. **Leverage the dock contextual-switch.** A `GlassDock` (or `DockLayerGroup`) drives WHICH toggle family is "active" — the toggle-group IS the canonical surface a contextual switch mutates; this is the deftest fit on the whole forms band.
3. **`SegmentedTabs`** to switch material registers (outline vs card vs chip vs cell), demonstrating the `variant="card"` tile + radio-semantics arm that are currently invisible.
4. **Bigger, denser bento** in a larger main card — the empty whitespace becomes a multi-card grid showing size/variant/disabled axes + the press-spring animation.
5. **Adopt `StorySection`** (band-consistency) and DELETE the hand-rolled `<header>` double + the "ONE color event" meta tail.
6. **Fix the cell swatches** to reflect warm/cool/mono.
