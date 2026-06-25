# Pass-E — FRONTEND-DESIGN critique: forms/multi-select

**Page:** `demo/stories/forms/multi-select.vue` · live `http://localhost:5173/forms/multi-select`
**Lens:** world-class frontend-design critique against the iOS-26/27 Liquid-Glass north star (DESIGN.md §L1–L5), the paper/glass dual morphism, the audacious √φ ladder, and the dock/procedural APIs.
**Verdict in one phrase:** the same competent-spec-sheet-wearing-a-hero-title pattern as forms/select — but multi-select carries MORE latent kinetic identity (selection IS the demo here) and squanders all of it; the page is a static diagram of a system whose whole point is selection-as-living-state.

---

## 0. What's actually on the screen

One flat near-white card (`--story-page-max-inline` wide) whose content occupies the LEFT ~third; ~65% of the card is dead cream void to the right (visible in `_cap-forms-multi-select-light.png`). It holds a teal-chip in-card header, then three stacked `max-w-sm` sections — `Bases` (a MultiSelect pre-seeded `[fourier, chebyshev]`, two secondary badges below it + a `2 SELECTED` mono caption), `Stack (unbounded)` (empty, `maxDisplay 2`), `Disabled` (locked) — separated by hairlines, then a `model summary` debug grid echoing the raw value arrays. The audacious `text-display-4` "Multi-Select" title sits ABOVE the card on the bare page. Background is `grid` (engineering-paper) per the forms-category manifest key — but it does not perceptibly read through the opaque `--card` plate, so the page is functionally a gray card on a gray page. Opening a select (`_cap-forms-multi-select-open.png`) reveals the one genuinely glassy moment: a floating frosted Command popover that blooms in, with check-marked rows. The dock is the global story-nav chrome at bottom + the section-facet rail at top-left; neither is exercised BY this page.

This is three multi-selects in a box plus a value dump. The user's brief — "each sub-section in its own glassy card; main area BIGGER; leverage the dock APIs; a series of glass-ui components; glass over COLORFUL aurora; standardize the import label; tighten language" — is met on roughly ONE axis (a `/forms/multi-select` path chip exists, though it is the local-slug convention, not the `@mkbabb/glass-ui/...` form). The rest is open.

---

## 1. VISUAL HIERARCHY — the eye lands, then plateaus, then hits a debug dump

**The title is right; everything below it flattens to one weight.** The `text-display-4` "Multi-Select" is the one genuinely audacious move and it earns its keep — the √φ ladder works at the masthead. The moment the eye drops into the card the hierarchy COLLAPSES: `Bases` / `Stack (unbounded)` / `Disabled` are three identical `<Label>` (`text-small`) at one rung, three identical triggers, three identical mono captions. There is no second tier, no focal control, no rhythm. DESIGN.md opens "kinetically typographic, orthogonally variant" (§Philosophy) and the body uses exactly ONE non-title type rung. `Bases` is the INTERESTING section (it carries the `--viz-fourier`/`-chebyshev`/`-legendre` orthogonal-basis identity — the same family the whole motion band suffuses with) and it is demoted to a peer of `Disabled`, a state-demo with zero conceptual weight.

**The header is doing the section's job twice.** The page renders the eyebrow+blurb TWICE — the chrome `<header>` masthead (`FORMS · MULTI-SELECT` + the StoryHeader cluster) and AGAIN inside the card (the IconChip + `Forms · Multi-select` + the descriptor). A literal duplicate-descriptor smell. And the in-card blurb — "Multiple-choice tag selection — the section identity is the ONE color event" — is META-COMMENTARY ABOUT THE DESIGN SYSTEM ("the section identity is the ONE color event"), not about multi-select. That clause is exactly the superfluous language the user asked to tighten: it describes the suffusion rule, not the component.

**The card area is bigger than its content by ~3×, and ends on a debug grid.** The `model summary` block (`[fourier, chebyshev]` / `[—]`) is a developer's console.log rendered as UI. It is the LAST thing the eye lands on — the page's terminal beat is a raw value dump, the least designed element on the screen. The user asked the main area BIGGER; the card already IS big — the failure is that nothing FILLS it, and what does fill the bottom is debug noise. "Bigger card" today would mean "more void + a bigger debug dump."

## 2. AFFORDANCE — adequate trigger, broken badge, hidden teaching point

The triggers read as triggers (chevron, pill, hairline) — the affordance floor is met. But multi-select has a specific affordance surface the page mishandles:

- **The remove (×) badge buttons have NO accessible name.** The a11y snapshot shows them as bare `button` nodes (uid 6_17/6_19/6_27/6_29 — "Fourier ×", "Chebyshev ×", etc.) with no label. This is a real defect, not a stylistic note: a screen-reader user hears "button" with no indication it removes a tag. The component (`MultiSelect.vue`) ships the `<X>` glyph but no `aria-label="Remove {label}"`. The page is the demo that should surface this, and instead it propagates the gap. (Per the MEMORY binding-verification note, this is the silent-no-op class — vue-tsc passes, only the a11y tree catches it.)
- **The `disabled` row reads as "broken," not "demonstrated."** The locked select shows `Vue 3.5, Tailwind v4` as faint badges with no surface cue that disabled-ness is the TEACHING POINT — it looks like a select that failed to load. A disabled-state demo needs an explicit visual frame ("this is the disabled register").
- **The `Stack (unbounded)` section is empty at rest**, so the `maxDisplay 2 → (+N)` overflow — the entire reason that section exists — is invisible until the user manually selects 3+ tools. The page's marquee multi-select feature (overflow collapse) is HIDDEN behind interaction the page does not invite or pre-stage.
- **No surface variants shown.** No `surface="veil"` trigger, no SelectTrigger `size` font-rung axis (the W-MENU-GLASS BA-VJS-4 `display`/`audacious` rungs), no `--glass-accent` per-instance rim. The page demonstrates the DEFAULT three times and the variant surface zero times.

## 3. ANIMATION AFFORDANCE — the iOS-27 bar is MISSED wholesale; selection-as-life is the squandered headline

This is the most damning axis, and multi-select makes it sharper than select did: **selection is the whole subject, and selection animates NOTHING on the page.** DESIGN.md §L2/§L3 demand every interactive primitive be ALIVE — entrance (`.scroll-cascade` spring-clocked build), hover (glass-quiet `--menu-row-lift` on `--spring-smooth`), press (`--scale-press` 0.96 squish + `--spring-snappy` release), open (`.glass-reveal` liquid bloom-from-anchor). The multi-select PRIMITIVE ships much of this (the popover blooms, rows hover-lift). But the PAGE exercises none of it visibly because:

- **The body is static at rest.** Three triggers + two badge rows + a debug grid sit inert. No focal element pulses, reveals, or invites. The IconChip `:reveal`+`bloom` is the ONLY animated element and it's a 22px glyph in the header. DESIGN.md §L4 "Appeal" (medium tier) — the page has zero personality motion.
- **Tag add/remove is the canonical multi-select micro-interaction, and it has no choreography.** When a user toggles `Legendre` ON, a badge should SPRING in (squash-and-stretch §L4 #1, `--spring-bouncy` arrival); when they hit ×, it should collapse out. Right now badges appear/vanish with no motion — the single most expressive moment the component owns is dead. A multi-select where tags pop in/out on the bouncy spring is the iOS-27 read; a multi-select where they just appear is iOS-7-flat.
- **Selection has no consequence to the page.** Choosing `Fourier` vs `Legendre` should DO something — the viz-dot identity (`--viz-fourier`/`-chebyshev`/`-legendre`) should ripple out (recolor a card rim via W-GLASS-ACCENT, seed a procedural accent). Today selection updates a debug string `[fourier, chebyshev]`. DESIGN.md §L4 "Secondary action" is consumer-owned — but THIS IS the consumer, and it owns nothing.
- **The open animation is the only life, and the user must HUNT for it.** The page does not stage or invite the dropdown. At the iOS-27 bar the RESTING page should already telegraph "I am alive."

**Net:** the page is a static screenshot of a kinetic system whose kinesis IS selection. That is the cardinal sin against the north star, doubled.

## 4. POLISH + DISTINCTIVENESS — generic-AI-template

A blind reviewer would not know this is glass-ui. It looks like any Tailwind starter's "multi-select form section": gray card, left-aligned labels, default outline triggers, secondary-gray badges, a hairline between rows, a debug value dump at the bottom. The bespoke signals (paper grain, glass refraction, the warm-cream identity, the cartoon shadow, the suffusion color event, the spring tap-squish) are ALL ABSENT from the body:

- **No glass.** The card is opaque `--card`; the triggers are `.control-surface` rest-tier; the badges are flat `variant="secondary"`. NOTHING in the body composes a `.glass-*` tier you can SEE. Over a flat opaque plate the blur has nothing to bend — DESIGN.md §L1 "glass is imperceptible over a flat substrate." This is the BG-2 black-plate defect class the W-STAGE `tier="field"` fix exists for, un-applied. The one glassy moment (the open popover) is over a gray page, so even IT can't lens anything colorful.
- **No paper.** Forms is the PAPER category (grid background) and the page captures zero paper character — no `paper-grain-overlay`, no blueprint-grid reading through, no `.paper-ink-mark` rail. The `math-paper.vue` gold-standard idiom (a `border-l-[3px]` accent rail + mono label + grain on a `wash` tier) is THE calm-content model in CLAUDE.md §SUFFUSE and this page ignores it. The header DOES use the `borderLeft` accent rail — the one paper gesture — but on an opaque card, so the grain never reads behind it.
- **The badges are the wrong material.** `variant="secondary"` is a flat gray pill. The natural multi-select tag in this system is a glass-tinted or `--glass-accent`-keyed chip (the `<IconChip>` / `<SelectableChip>` register, BC.W-ACCENT-TONE) carrying the option's brand hue. Today the selected `Fourier` badge is gray; it SHOULD carry `--viz-fourier`.
- **The warm identity is washed out.** The cream reads as flat gray in the capture (the W-NO-GRAY warm-chroma floor is in the tokens but the flat opaque composite never surfaces it).

## 5. iOS-26/27 / PAPER / GLASS FIDELITY — north-star miss

Against DESIGN.md's six-layer composite (§L1): the body surfaces show **zero** of the six layers visibly (no backdrop blur reads, no rim halo, no catch-light, no grain) — the open popover is the only place ANY layer surfaces, and it's over a colorless backdrop. The seven-tier ladder is unused below the masthead. §L2 spring physics + §L3 tap-choreography are present in the primitive, un-staged on the page (badges don't spring, page is static at rest). The dual GLASS+PAPER morphism the brief names is at 0/2 in the body.

The "glass demos over COLORFUL aurora" ask is the sharpest miss: forms is keyed to `grid`, not `aurora`, and even the grid doesn't read. A multi-select demonstrating GLASS (its popover, its tag chips) needs a live, COLORFUL substrate behind it for the refraction to mean anything — `<ShowcaseFrame tier="field">` over a contained, offscreen-paused `<Aurora>` (the W-STAGE `<DockStage>` one-GL-per-route idiom) is the exact pattern. Right now there is nothing for the glass to lens, and nothing for the orthogonal-basis hues to suffuse.

## 6. SPACING / RHYTHM — flat, not golden; ends on a console dump

The section stack rides `--story-page-section-gap` (good, tokenized) and the card rides the `--card-pad-*` √φ ladder (good, W-CARD-PAD). But the INTERNAL rhythm of each section is a flat `gap-3` / `gap-1` — no √φ relationship between label → trigger → badges → caption. The badge row + the `2 SELECTED` caption + the hairline stack with no measured cadence. The card's huge right void breaks any sense of proportion: content hugs the left gutter while 65% of the φ-padded card is empty. Golden-ratio rhythm (the W-CARD-PAD sqrt-φ block-over-inline) requires the content to OCCUPY the proportioned space, not pool in a corner. And the terminal `model summary` grid is an un-rhythmic debug afterthought — it breaks the page's cadence entirely.

## 7. COLOR / SUFFUSION — under-proportioned to near-colorless; the basis hues are the squandered asset

The ONE color event (teal `--section-color-3` on the IconChip + header rail) is correct PER the one-color-event rule (CLAUDE.md §SUFFUSE) — body stays ink, single chip pop. But the page is so restrained it reads COLORLESS: a single 22px teal glyph in a sea of gray is not "suffusion within proportion," it's "almost no color." Worse than select: multi-select OWNS the orthogonal-basis brand palette (`--viz-fourier`/`-chebyshev`/`-legendre`/`-hermite`/`-laguerre`/`-bessel` — six gorgeous library hues) AND it selects them as TAGS, and it renders every one of them as flat ink (in the open dropdown, `_cap-forms-multi-select-open.png`) and flat gray (as selected badges). The suffusion budget is spent at ~5% of allowance. The right move is NOT to abandon the one-color-event discipline but to recognize that in a multi-select OF brand bases, each selected TAG carrying its own `--viz-*` hue IS one coherent color SYSTEM (the data-protagonist register), not N competing events — the way the chart-chassis palette is one event across 13 stops.

---

## TOP DESIGN MOVES (to make this page exceptional)

1. **Card-per-subsection over a live COLORFUL aurora (the headline move).** Split `Bases` / `Stack` / `Disabled` into THREE glassy `<Card surface="glass">` / `<ShowcaseFrame tier="field">` tiles in a responsive grid, each floating over ONE shared, offscreen-paused `<Aurora>` (the `<DockStage>` one-GL-per-route pattern; forms is keyed `grid` but this page should override to `aurora` for the glass to mean anything). NOW the §L1 six-layer composite is visible — the trigger pill and the open popover lens a colorful field, the rim/catch-light read, the warm cream pops. This single move converts the page from spec-sheet to specimen and satisfies "own glassy card · bigger area filled · glass over colorful aurora" at once.

2. **Make tag selection KINETIC and make the basis hues the data-protagonist.** Re-skin the selected badges as brand-hue chips (`<SelectableChip>` / `<IconChip bare :tone>` keyed to each option's `--viz-*`), and animate add/remove: a tag SPRINGS in on `--spring-bouncy` (§L4 #1 squash-and-stretch), collapses out on `--ease-out`. On `Bases` (the focal card), ripple the selected basis's hue out as a `--glass-accent` rim (W-GLASS-ACCENT per-instance chromatic axis) on its OWN card, and seed a tiny procedural accent (a Fourier epicycle / Chebyshev-node micro-glyph) — so choosing a basis ANIMATES the page. This is the "deftly uses a series of glass-ui components" ask: MultiSelect + SelectableChip + a procedural-suite micro-viz + W-GLASS-ACCENT, composed; AND it lifts the suffusion from 5% to a coherent data-protagonist system.

3. **Stage the resting page so it's ALIVE before interaction, and pre-stage the teaching points (§L2/§L3).** Let the three cards arrive on the `.scroll-cascade` spring-clocked build (available, just unstaged); give each trigger the visible hover-lift register; add ONE inviting PRM-gated catch-light sweep on the focal `Bases` card. CRUCIALLY: pre-populate the `Stack` card with 3+ tools so the `(+N)` overflow is VISIBLE at rest (the marquee feature, currently hidden), and visually FRAME the `Disabled` card as the disabled register (a "locked" affordance, not a load-failure read). The iOS-27 bar is "alive at rest," not "alive on click."

4. **Leverage the dock contextual-switching API IN the page.** Use a `<DockLayerGroup>` / `<DockStack mode="facets">` to switch the demo CONTEXT (e.g. "bounded · overflow · disabled" as three dock facets that morph the showcased multi-select — exactly the three states the page splits into static sections today), so the dock's contextual-switching/animating APIs are exercised BY the content, not just the global story nav. This collapses three static sections into one focal card the dock morphs between — bigger main area, less repetition, the literal "leverage the dock APIs" ask.

5. **Fix the affordance defect, add the PAPER half, and tighten/standardize.** Add `aria-label="Remove {label}"` to the badge × buttons in `MultiSelect.vue` (the real a11y defect this demo should surface, not propagate). Give the cards the `math-paper.vue` idiom (grain reading through a `wash`/`quiet` tier so the engineering grid is visible, the `.paper-ink-mark` accent rail kept) so GLASS+PAPER is 2/2. De-duplicate the header (drop the in-card eyebrow/blurb restatement — the masthead already carries it), DELETE the `model summary` debug grid (or fold it into a single subtle live-count chip), kill the `2 SELECTED` / `MAXDISPLAY · 2 …` debug captions, rewrite the blurb to describe multi-select not the design system, and standardize the import chip to the `@mkbabb/glass-ui/multi-select` form (the cross-page path-label convention).

---

## Precept ledger (named misses)

- §L1 six-layer composite + tier ladder — body shows 0/6 layers visibly, ladder unused (opaque card; BG-2 black-plate class). Only the open popover surfaces glass, over a colorless backdrop.
- §L1 "glass imperceptible over flat substrate" — directly violated (no live colorful backdrop to lens).
- §L2/§L3 spring physics + tap choreography (squash-and-stretch) — present in primitive, un-staged on page; the canonical tag add/remove micro-interaction is motionless.
- §L4 Appeal / Secondary-action — zero personality motion; selection has no consequence beyond a debug string.
- CLAUDE.md §SUFFUSE one-color-event — technically correct but under-proportioned to near-colorless; the six orthogonal-basis brand hues rendered flat ink/gray, the data-protagonist register unused.
- W-STAGE `tier="field"` / `<DockStage>` — the exact fix for the flat-plate defect, un-applied.
- W-GLASS-ACCENT — the per-instance hue rim that would make tag selection kinetic + colored, unused.
- BC.W-ACCENT-TONE `<SelectableChip>` — the natural tag-chip register; today's tags are flat `variant="secondary"` gray.
- math-paper.vue calm-content idiom — the paper-category gold standard, ignored (grain never reads behind the opaque card).
- W-CARD-PAD √φ ladder — applied to the card, but content pools in the left gutter so the proportion reads broken; the page terminates on a non-rhythmic debug grid.
- a11y (MEMORY binding-verification class) — the badge × remove buttons ship NO accessible name (bare `button` nodes in the a11y tree); the demo propagates the gap instead of surfacing it.
