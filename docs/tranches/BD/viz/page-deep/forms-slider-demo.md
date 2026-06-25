# Pass-E META-STORYBOOK deep audit — forms/slider

- **Page**: `forms/slider`
- **Import label (live)**: `@mkbabb/glass-ui/slider` ✓ (chip renders correctly)
- **SFC**: `demo/stories/forms/slider.vue`
- **Component**: `src/components/ui/slider/Slider.vue` (+ `slider/index.ts`)
- **Live**: http://localhost:5173/forms/slider — spot-checked desktop, both header + matrix + spectrum
- **Verdict**: thin, flat spec-sheet — under-demos a dock-integrated component; ONE dead feature.

---

## (1) DEMO CONGRUENCE — does it show the component at its BEST + full API?

**Partial — the headline API is ENTIRELY ABSENT.** The Slider's single most distinctive
capability is `keepDockOpen` (default `true`) — the bidirectional dock-hold contract
(`Slider.vue:17-31, 54-86`): drag-acquires a `dockKeepOpen` token, subscribes to `dockHeld`,
and intensifies the thumb/track halo via `data-held` (`Slider.vue:143, 327-338`). The CLAUDE.md
"Slider keep-dock-open contract" is the component's reason-to-exist. **This page demonstrates it
ZERO times** — there is no `<GlassDock>` on the page hosting a slider, no held-state visual, no
mention beyond a prose nod in the in-card blurb ("Range selection with keep-dock-open"). The only
keep-dock-open proof in the whole repo is `demo/stories/compositions/dock-with-slider.vue` — a
DIFFERENT page. The component's flagship integration is invisible on its own demo.

API coverage that IS present: `variant` (standard/spectrum) ✓, `size` (sm/md/lg matrix) ✓,
range/two-thumb mode ✓ (`slider.vue:106`), `disabled` ✓, consumer retint via `--slider-track-bg`
✓ (`slider.vue:120-124`), the `[&_.slider-range]` descendant retint — **DEAD, see §7**.

No animation affordance is *shown*: the slider's press-spring give (`Slider.vue:308-316`), the
hover edge-rim lift (`:291-296`), the held-halo intensify — none are exercised or called out.
A static screenshot reads identically to a plain `<input type=range>` skin. "HIGH animation
affordance for EVERY component" (north-star) is unmet here.

## (2) COMPONENT ABILITY — deft SERIES of glass-ui components, or thin/flat?

**Thin/flat.** The page composes exactly TWO glass-ui surfaces: `<Slider>` (11 instances) and
ONE `<IconChip>` in the in-card header (`slider.vue:48`). Everything else is raw
`<section>`/`<span>`/`<p>` + Tailwind. No `<Card>` per section (the chassis `StoryHero` wraps the
WHOLE body in one card — the sub-sections are bare flex stacks). No `<Tabs>` to switch standard ↔
spectrum ↔ range. No `<GlassDock>` to host the keep-dock-open story. No procedural-anim. No
`<Button>`. The user's bar — "each page deftly uses a SERIES of glass-ui components
(docks/procedural-anims/cards/tabs/buttons)" — is not met: this is a 6-section vertical list of
bare sliders, the thinnest possible composition.

## (3) GLASS SUFFUSION — live colorful field, or flat?

**FLAT — no live field.** Live-verified: `hasAurora: false`; background resolves to
`story-hero-bg grid-bg story-hero-bg--bleed` — the STATIC grey blueprint-grid wash (forms category
default `CATEGORY_DEFAULT_BG.forms = "grid"`, manifest.ts:184). The glass slider fills
(`backdrop-filter: var(--glass-blur-quiet)` on `.slider-range`) have NOTHING colorful behind them
to refract — the morphism cannot read. The user's explicit bar — "glass demos over COLORFUL aurora
backgrounds" — is unmet. A slider whose whole identity is "liquid-glass cylinder over the muted
track" demoed over flat grey is the exact "glassiness demo over an opaque plate occludes the field"
defect class the codebase fought elsewhere (BG-2). PAPER morphism: also absent (no
`paper-grain-overlay`/`.paper-texture` register, no apt use).

Card tier live = `resting` (opaque-enough) — correct for a static-grid page per the StoryHero
`cardTier` logic, but it confirms there is no glass-over-live-field read here at all.

## (4) STRUCTURE — own glassy card per sub-section? main area BIG enough?

**No own cards; wasted top space.** All 6 sub-sections (standard / viz-fourier fill / range /
spectrum / disabled / matrix) are bare `<section class="flex flex-col gap-3">` blocks inside ONE
shared `StoryHero` card, separated only by the chassis `--configurator-divider` hairlines
(`story-sections--delimited`). The user's bar — "each sub-section in its OWN glassy card" — is NOT
met. The "main card area BIGGER" bar is partially unmet: live the card starts ~360px down the page
(huge empty grey expanse above holding only the chrome eyebrow+title+blurb), and the article is
`max-w` bounded by `--story-page-max-inline`. The card itself is wide but the vertical real-estate
above it is dead space, and the sliders read as a thin to-do list rather than a generous showcase.

**DUPLICATE HEADER bug-adjacent**: the chrome renders `FORMS · SLIDER` + "Slider" + blurb at top,
then the in-card hand-rolled header (`slider.vue:40-58`) renders a SECOND `FORMS · SLIDER` eyebrow +
IconChip + a DIFFERENT descriptor. Two competing section headers for one page — the
W-HIERARCHY2 reading-order discipline (one ordered descriptor cluster) is bypassed by the SFC
hand-rolling its own header inside the card.

## (5) PATH-LABEL — `@mkbabb/glass-ui/slider`

**Correct ✓.** Live chip reads `@mkbabb/glass-ui/slider` (manifest.ts:235; StoryHeader subpath
chip). But the SFC IMPORT is the deep relative path
`../../../src/components/ui/slider` (`slider.vue:4`), not the package subpath — fine for a
demo-internal SFC, but note the in-SFC `IconChip` import is also deep-relative (`slider.vue:6`).
No standardization defect in the visible LABEL; the import statements are demo-internal and
consistent with siblings.

## (6) LANGUAGE — superfluous prose to tighten

- `slider.vue:53-56` in-card blurb: "Range selection with keep-dock-open — the section identity is
  the ONE color event." The trailing "the section identity is the ONE color event" is internal
  audit jargon leaking into user-facing copy — tighten/delete.
- `slider.vue:8-11` comment "the cool stop … PH3-safe …" and `slider.vue:19-21` "Hard gate requires
  every cell renders" are dev-process notes, fine as comments but verbose.
- `slider.vue:60-62, 74, 97, 109-111, 127` section-lead comments are accurate but wordy; the
  `viz-fourier fill` section label + comment promise a feature that does not render (§7).
- Manifest blurb (`manifest.ts:725`) "Two recipes — standard … + spectrum …" is fine and terse —
  but it OMITS the range mode and the keep-dock-open headline. Consider surfacing the dock contract.

## (7) BUGS

**BUG-1 (HARD) — the "viz-fourier fill" feature is DEAD.** `slider.vue:88-93` applies
`[&_.slider-track]:bg-viz-fourier/25` + `[&_.slider-range]:bg-viz-fourier` to retint the fill red.
Live-verified the slider DOES carry these classes AND `bg-viz-fourier` resolves standalone to
`oklch(0.579 0.201 30.4)` (red), but the `.slider-range` STILL computes
`oklab(0.216 …)` = `--primary` (warm-ink dark). The whole "viz-fourier fill" section renders
IDENTICAL to the standard slider above it. Root cause: the scoped-component CSS rule
`.slider-range { background: color-mix(in oklab, var(--slider-range-bg, var(--primary)) … ) }`
(`Slider.vue:225`) is UNLAYERED and wins over the `@layer utilities` Tailwind descendant utility
regardless of specificity (the unlayered-beats-@layer cascade trap noted across the codebase, e.g.
AZ.W-DOCK-RAIL / W-MENU-GLASS). The demo's named feature cannot work via `[&_.slider-range]:bg-*`;
the correct seam is the documented `--slider-range-bg` custom property (`Slider.vue:222-224`), which
the spectrum section already uses correctly via `--slider-track-bg`. **Fix**: replace the descendant
arbitrary-utility retint with `:style="{ '--slider-range-bg': 'var(--viz-fourier)' }"` (+ a
`--slider-track-bg` for the 25% track) — the token seam that actually paints.

**BUG-2 (minor) — wasted vertical space / page reads short.** ~360px dead grey above the card; the
duplicate header (§4) compounds it.

No broken animations observed (spectrum thumb visible w12/h24, gradient track paints, matrix all 6
cells render); no console errors surfaced for the slider.
