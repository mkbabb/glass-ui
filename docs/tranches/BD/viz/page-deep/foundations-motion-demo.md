# Pass-E META-STORYBOOK audit — `foundations/motion`

- **Path-label**: `/foundations/motion`
- **SFC**: `demo/stories/foundations/motion.vue`
- **Live**: `http://localhost:5173/foundations/motion` (spot-checked 2026-06-23, server up)
- **Manifest row**: `demo/stories/manifest.ts:486-494` — `background: "constellation"`, `variant="page"` (not hero)
- **Captures**: `_motion-full.png` (above-fold), `_motion-cards2.png` (transition cards)

## Verdict snapshot

The page is a **flat two-section spec-sheet**: a bordered doctrine TABLE + a 6-up grid of OPAQUE cream tiles. It composes exactly TWO library components — `<Button size="sm" variant="secondary">` (the Toggle) and the raw Vue `<Transition>` wrapper. The DESIGN north-star asks (own glassy cards per sub-section · bigger main area · dock APIs · a SERIES of glass-ui components · glass over a LIVE colorful field) are essentially **unmet**. The motion-purple identity (`--motion-accent`) is correctly present on the sample chips; the title chip + audacious `<h1>` chassis is correct; the path-label is already standardized.

---

## (1) DEMO CONGRUENCE — does it show motion at its BEST + full API?

**WEAK.** This is the FOUNDATIONS motion tour (the `<Transition>` grammar + the §6 easing legend), and it deliberately defers the curve canon to `Motion ▸ Curve Gallery` (motion.vue:2-7). Within that narrowed scope:

- The 6 `<Transition>` class-sets DO each animate on Toggle (fade · fade-slide · pop · dialog-scale · dropdown · tab-fade — motion.vue:31-68), and they DO read live (verified: the purple chip enters/leaves). That part is honest and functional.
- **But the demo never shows the motion system at its BEST.** A FOUNDATIONS-of-motion page that is the gateway to the whole liquid-glass motion language shows NONE of the headline mechanisms the library actually ships and CLAUDE.md canonizes: no spring-press (`useSpringPress`/`useLiquidPress`), no `.scroll-build`/`.scroll-cascade` choreography (ironically the page itself rides `.scroll-cascade` but never DEMOS it), no `useLiquidReveal` bloom-from-source, no `useDragMorph` pull-squish, no per-spring duration clock, no `vReveal`/`SplitChars`. The "which easing fits which job" doctrine is shown as a STATIC TABLE of prose strings (motion.vue:85-100) — a motion page whose centerpiece is a non-animated table is a category miss.
- **No contextual switching / no dock APIs.** The page does not compose any dock, tabs, or procedural-anim — so the "leverage the dock APIs (contextual switching/animating)" mandate is 0% met.

## (2) COMPONENT ABILITY — a SERIES of glass-ui components, or thin/flat?

**THIN/FLAT.** Component inventory:
- `<StoryPage>` / `<StorySection>` (chassis) — `motion.vue:8-9`
- `<Button size="sm" variant="secondary">` — the only true library atom, used solely as a Toggle (`motion.vue:146-148`)
- raw `<Transition>` + hand-rolled `<table>` + hand-rolled tile `<div>`s

That is it. No Tabs (a `<SegmentedTabs>` would be the natural host to switch BETWEEN the 6 transition families or between "easing-doctrine / class-sets / spring-orchestrator"), no Card primitive (the tiles are raw `bg-card` divs, not `<Card>`), no dock, no procedural-anim, no IconChip pops. The page does NOT deftly compose a series of components — it hand-rolls flat HTML around one button.

## (3) GLASS SUFFUSION — glass over a LIVE colorful field?

**FAILS — the morphism does not read.**
- Manifest declares `background: "constellation"` — a MONOCHROME node field, NOT a "COLORFUL aurora" (the user's explicit ask is "glass demos over COLORFUL aurora backgrounds"). Live read: the constellation is present (`canvas`/`.story-hero-bg` at opacity 1) but barely perceptible — faint gray dots, no color event.
- **The sub-section content is OPAQUE, so nothing reads through.** Verified live: the outer story Card is translucent glass (`oklab(... / 0.328)`), but the 6 transition tiles paint a FULLY OPAQUE cream plate `rgb(251, 248, 244)` (`bg-card`, `motion.vue:112`) and the sample stage is `bg-background/40` (`motion.vue:124`). The doctrine table wrapper is opaque-bordered `bg-[var(--surface-tint-1)]` (`motion.vue:85-88`). So the glass morphism the page is FOUNDATIONALLY about is invisible — flat plates on a flat field. This is the BG-2 "black-plate" class CLAUDE.md condemns for the glass demos (W-DEMO-DESIGN / `<ShowcaseFrame tier="field">`), reproduced here.
- **No PAPER morphism** despite motion-doctrine being a documentary surface where the math-paper/grain idiom would be apt.

## (4) STRUCTURE — own glassy cards per sub-section · big main area?

**FAILS both bars.**
- **Sub-sections NOT in their own glassy cards.** The two `<StorySection>`s render bare (`flex flex-col` + label/blurb + slot, `StorySection.vue:71-87`) — no card surface. The doctrine table is wrapped in a `rounded-card border` shell but it is an opaque table chrome, not a glass card. The user's "each sub-section in its OWN glassy card" is unmet.
- **Main area is SMALL / flat.** The whole body is one `resting`-tier story Card bounded to `--story-page-max-inline`; inside it the doctrine occupies ~5 short rows and the 6 tiles are a tight 3-col grid of 112px-tall stages. There is no BIG focal motion surface — the screen is mostly empty cream margin (see `_motion-full.png`: title + table fills < 50% height, rest is whitespace). The "main card area BIGGER (more screen space)" ask is unmet — the content is small and the page reads sparse.

## (5) PATH-LABEL standardization

**PASS.** `/foundations/motion` is in `SUBPATHS` (`manifest.ts:211`) and renders as the Fira-Code subpath chip via `StoryHeader` (verified live: the `/foundations/motion` chip shows under the eyebrow). No action.

## (6) LANGUAGE — superfluous prose to tighten

A few over-written blurbs:
- `motion.vue:83` — "The full curve canon (every spring + bezier + analytic family, plotted off its real JS twin) lives on Motion ▸ Curve Gallery; this is the foundation tour of the grammar those curves build." — the parenthetical is encyclopedic; tighten to "The full curve canon lives on Motion ▸ Curve Gallery; this is the grammar tour."
- `motion.vue:16` easing string — "(bezier — never a spring on a colour)" and `motion.vue:19` "(NO overshoot past gone)" read as internal scolding; fine as terse doctrine but the ALL-CAPS "NO" is shouty for a demo legend.
- `motion.vue:53` "Dialog-appropriate: slow bouncy entry, measured exit." — fine.
- Header comment block `motion.vue:1-7` is fine (dev-facing).

Overall language is acceptable; minor tightening only.

## (7) BUGS

- **No dead demo / no broken animation** — the 6 toggles all animate live (verified). Functionally sound.
- **Latent category bug**: the manifest assigns `constellation` to a page that the user wants over a COLORFUL aurora; with the opaque tiles the chosen background is functionally dead weight (a live GL context spent on an invisible field — wastes the one-GL-per-route budget for zero visual payoff).

---

## Recommended redesign (architectural, not a patch)

1. **Each sub-section → its OWN glass card** over a **COLORFUL aurora** (`background: "aurora"` with a warm/violet palette via the manifest object form, not the gray constellation). Drop the tiles to `<ShowcaseFrame tier="field">` / `<Card tier="wash">` so the aurora reads THROUGH — the page's whole subject (motion + glass) becomes self-demonstrating.
2. **Host the families on `<SegmentedTabs>`** (a contextual switcher) — easing-doctrine · transition class-sets · live spring-press — so the page DEFTLY composes tabs + cards + buttons and demonstrates contextual switching/animation.
3. **Make the doctrine LIVE**: replace the static table with rows that actually PLAY each easing on a moving chip (consume the real `--ease-*`/`--spring-*` tokens), turning the legend into a motion specimen.
4. **Add a dock-driven facet switch** (W-DOCK-STACK `mode="facets"`) to pick the active transition family — satisfies the "leverage the dock APIs" mandate and gives the page a SERIES of glass-ui components.
5. **Bigger focal area**: lead with ONE large animated specimen (a spring-press hero or a `useLiquidReveal` bloom) at display scale before the grid, filling the empty above-fold whitespace.
