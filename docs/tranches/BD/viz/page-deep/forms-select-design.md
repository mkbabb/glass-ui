# Pass-E — FRONTEND-DESIGN critique: forms/select

**Page:** `demo/stories/forms/select.vue` · live `http://localhost:5173/forms/select`
**Lens:** world-class frontend-design critique against the iOS-26/27 Liquid-Glass north star (DESIGN.md §L1–L5), the paper/glass dual morphism, the audacious √φ ladder, and the dock/procedural APIs.
**Verdict in one phrase:** a competent spec-sheet wearing a hero title — it reads generic-AI-template, not bespoke-premium, because every promise the chassis makes (glass, paper, motion, color, dock) dies the moment you reach the body.

---

## 0. What's actually on the screen

One flat near-white card (`--story-page-max-inline` wide, but the content occupies the LEFT THIRD), holding a teal-chip header and three `max-w-sm` `<Select>` controls stacked in a `gap`-and-hairline column. The audacious `text-display-4` "Select" title sits ABOVE the card on the bare page. Background is `grid` (engineering-paper) per the manifest — but the grid does not perceptibly read through the opaque `--card` plate, so the page is functionally a gray card on a gray page. The dock is the global story-nav chrome at bottom + the section-facet rail at top-left; neither is exercised BY this page.

This is three dropdowns in a box. The user's brief — "each sub-section in its own glassy card; main area BIGGER; leverage the dock APIs; a series of glass-ui components; glass over COLORFUL aurora; standardize the import label; tighten language" — is met on exactly ONE axis (the import label exists). The rest is open.

---

## 1. VISUAL HIERARCHY — the eye lands, then starves

**The title is right; everything below it is a flat plateau.** The `text-display-4` "Select" is the one genuinely audacious move and it works — the √φ ladder earns its keep at the masthead. But the moment the eye drops into the card, the hierarchy COLLAPSES to a single weight: three identical `<Label>` (`text-small`) → three identical triggers → done. There is no second tier, no focal control, no rhythm. DESIGN.md's typography is "kinetically typographic, orthogonally variant" (§Philosophy) and the page uses ONE non-title rung. The `Font family` / `Orthogonal basis` / `Density` labels are peers when they should not be — `Orthogonal basis` is the INTERESTING one (it carries the viz-dot identity) and it's buried as the middle child with zero promotion.

**The header is doing the section's job twice.** The page renders the eyebrow+blurb TWICE — once in the chrome `<header>` above the card (`FORMS · SELECT` + the StoryHeader cluster), then AGAIN inside the card (the IconChip + `Forms · Select` + the same descriptor). This is a literal duplicate-descriptor smell; the in-card header restates what the masthead already said. The blurb itself ("the section identity is the ONE color event; the controls stay ink") is META-COMMENTARY ABOUT THE DESIGN SYSTEM, not about Select — exactly the superfluous language the user asked to tighten.

**The card area is BIGGER than its content by 3×.** The card spans the full `--story-page-max-inline`, but content is `max-w-sm` and left-aligned, leaving ~65% of the card as dead cream void (visible right of every control in the screenshot). The user asked the main area BIGGER — the card already IS big; the failure is that nothing FILLS it. Right now "bigger card" would just mean "more void."

## 2. AFFORDANCE — adequate, undistinguished

The triggers read as triggers (chevron, pill, hairline border) — the affordance floor is met. But:
- The disabled `Spacious` item (density select) is invisible until opened; there is no surface hint that the third select even has a disabled state to demonstrate. The page's stated TEACHING POINT (a disabled item) is hidden behind a click.
- The `selected · plus-jakarta-sans` mono caption under the first select is a debug readout, not an affordance — it teaches nothing and adds visual noise (a fourth typographic weight that competes with the labels).
- No select shows the SelectTrigger `size` font-rung axis (the `display`/`audacious` rungs from W-MENU-GLASS BA-VJS-4), the keepDockOpen-adjacent contracts, or `surface="veil"`. The page demonstrates the DEFAULT three times and the variant surface zero times.

## 3. ANIMATION AFFORDANCE — the iOS-27 bar is MISSED wholesale

This is the most damning axis. DESIGN.md §L2/§L3 demand every interactive primitive be ALIVE — entrance (`.scroll-cascade` spring-clocked build), hover (glass-quiet lift `--menu-row-lift` on `--spring-smooth`), press (`--scale-press` squish + spring release), open (`.glass-reveal` liquid bloom-from-anchor). The select PRIMITIVE ships all of this (W-MENU-GLASS, W-LIQUID-REVEAL, W-PRESS-UNIFY). But the PAGE exercises none of it visibly because:
- **The body is static at rest.** Three triggers sit inert. No focal element pulses, reveals, or invites. Compare DESIGN.md §L4 "Appeal" (medium tier) — the page has zero personality motion. The IconChip `:reveal`+`bloom` is the ONLY animated element and it's a 22px glyph in the header.
- **The open animation is the only life, and it's incidental.** When the dropdown opens it blooms (`.glass-reveal`) and rows hover-lift — good, that's the primitive working. But the user must HUNT for it; the page does not stage or invite the interaction. At the iOS-27 bar the RESTING page should already telegraph "I am alive."
- **No state choreography.** Selecting `Fourier` vs `Legendre` should DO something to the page (the viz-dot identity should ripple out — recolor a rim, seed a procedural accent). Right now selection updates a debug string. DESIGN.md §L4 "Secondary action" is weak-tier (consumer-owned) — but THIS IS the consumer, and it owns nothing.

**Net:** the page is a static screenshot of a kinetic system. That is the cardinal sin against the north star.

## 4. POLISH + DISTINCTIVENESS — generic-AI-template

A blind reviewer would not know this is glass-ui. It looks like any Tailwind starter's "form section": gray card, left-aligned labels, default selects, a hairline between rows. The bespoke signals (paper grain, glass refraction, the warm-cream identity, the cartoon shadow, the suffusion color event) are ALL ABSENT from the body:
- **No glass.** The card is opaque `--card`. The selects are `.control-surface` rest-tier. NOTHING in the body composes a `.glass-*` tier you can SEE — over a flat opaque plate the blur has nothing to bend (DESIGN.md §L1 "glass is imperceptible over a flat substrate"). This is the BG-2 black-plate defect class the W-STAGE `tier="field"` fix exists for, un-applied.
- **No paper.** Forms is the PAPER category (grid background) and the page captures zero paper character — no `paper-grain-overlay`, no blueprint-grid reading through, no `.paper-ink-mark` rail. The `math-paper.vue` gold-standard idiom (a `border-l-[3px]` accent rail + mono label + grain) is referenced in CLAUDE.md §SUFFUSE as THE calm-content model and this page ignores it.
- **The warm identity is washed out.** The cream reads as flat gray in the capture (the W-NO-GRAY warm-chroma floor is in the tokens but the flat composite doesn't surface it).

## 5. iOS-26/27 / PAPER / GLASS FIDELITY — north-star miss

Against DESIGN.md's six-layer composite (§L1): the body surfaces show **zero** of the six layers visibly (no backdrop blur reads, no rim halo, no catch-light, no grain). The seven-tier ladder is unused below the masthead. §L3 tap-choreography: present in the primitive, un-staged on the page. The dual GLASS+PAPER morphism the brief names is at 0/2 in the body.

The "glass demos over COLORFUL aurora" ask is the sharpest miss: the forms category is keyed to `grid`, not `aurora`, and even the grid doesn't read. A select demonstrating GLASS needs a live, COLORFUL substrate behind it for the refraction to mean anything — `<ShowcaseFrame tier="field">` over a contained `<Aurora>` (offscreen-paused, one-GL-per-route budget) is the exact idiom (W-STAGE `<DockStage>` precedent). Right now there is nothing for the glass to lens.

## 6. SPACING / RHYTHM — flat, not golden

The section stack rides `--story-page-section-gap` (good, tokenized) and the `--card-pad-*` √φ ladder (good, from W-CARD-PAD). But the INTERNAL rhythm of each section is a flat `gap-3` — no √φ relationship between label→control→caption. The card's huge right void breaks any sense of measured proportion; the content hugs the left gutter while 65% of the φ-padded card is empty. Golden-ratio rhythm requires the content to OCCUPY the proportioned space, not pool in a corner.

## 7. COLOR / SUFFUSION — under-proportioned (the one restrained-correct axis, taken too far toward nothing)

The ONE color event (teal `--section-color-3` on the IconChip + header rail) is correct PER the one-color-event rule (CLAUDE.md §SUFFUSE) — body stays ink, single chip pop. But the page is so restrained it reads COLORLESS: a single 22px teal glyph in a sea of gray is not "suffusion within proportion," it's "almost no color." The viz-dot identity (`--viz-fourier`/`-chebyshev`/`-legendre`) is HIDDEN inside the closed Orthogonal-basis dropdown — the page OWNS three gorgeous brand hues and shows them only on click. The suffusion proportion is mis-set: the focal teal should anchor, AND the basis hues should get ONE visible event (a selected-state rim, a procedural seed) — currently the color budget is spent at 5% of its allowance.

---

## TOP DESIGN MOVES (to make this page exceptional)

1. **Card-per-subsection over a live COLORFUL aurora (the headline move).** Split the three selects into THREE glassy `<Card surface="glass">` / `<ShowcaseFrame tier="field">` tiles in a responsive grid, each floating over ONE shared, offscreen-paused `<Aurora>` (the `<DockStage>` one-GL-per-route pattern). NOW the six-layer composite (§L1) is visible — the glass lenses a colorful field, the rim and catch-light read, the warm cream pops. This single move converts the page from spec-sheet to specimen and satisfies "own glassy card · bigger area filled · glass over colorful aurora" at once.

2. **Promote `Orthogonal basis` to the focal demo + make selection KINETIC.** Make the basis select the hero control: on select, ripple its `--viz-*` hue out as a `--glass-accent` rim (W-GLASS-ACCENT per-instance chromatic axis) on its own card AND seed a tiny procedural accent (a Fourier epicycle / Chebyshev node glyph) — so choosing a basis ANIMATES the page (§L4 Appeal/Secondary-action, owned here as the consumer). This is the "deftly uses a series of glass-ui components" ask: Select + IconChip + a procedural-suite micro-viz + the accent axis, composed.

3. **Stage the resting page so it's ALIVE before interaction (§L2/§L3).** Let the cards arrive on the `.scroll-cascade` spring-clocked build (already available, just not visibly staged), give each trigger the visible hover-lift register, and add ONE inviting affordance (a gentle PRM-gated catch-light sweep on the focal card) so the resting page telegraphs kinesis. The iOS-27 bar is "alive at rest," not "alive on click."

4. **Leverage the dock contextual-switching API IN the page.** Use a `<DockLayerGroup>` / `<DockStack mode="facets">` to switch the demo CONTEXT (e.g. "grouped · viz-basis · disabled-state" as three dock facets that morph the showcased select), so the dock's contextual-switching/animating APIs are exercised BY the content, not just the global story nav. This is the literal "leverage the dock APIs" ask.

5. **Add the PAPER half + standardize/tighten.** Forms is the paper category — give the card the `math-paper.vue` idiom (grain overlay reading through a `wash`/`quiet` tier so the engineering grid is visible, a `.paper-ink-mark` accent rail) so the GLASS+PAPER dual morphism is 2/2. De-duplicate the header (drop the in-card eyebrow/blurb restatement — the masthead already carries it), kill the `selected · …` debug caption, rewrite the blurb to describe SELECT not the design system, and keep the standardized `@mkbabb/glass-ui/select` import chip (the one thing already right). Surface the disabled-item teaching point as a visible state, not a hidden one.

---

## Precept ledger (named misses)

- §L1 six-layer composite + tier ladder — body shows 0/6 layers, ladder unused (opaque card; BG-2 black-plate class).
- §L1 "glass imperceptible over flat substrate" — directly violated (no live backdrop to lens).
- §L2/§L3 spring physics + tap choreography — present in primitive, un-staged on page (static at rest).
- §L4 Appeal / Secondary-action — zero personality motion; selection has no consequence.
- CLAUDE.md §SUFFUSE one-color-event — technically correct but under-proportioned to near-colorless; basis hues hidden.
- W-STAGE `tier="field"` / `<DockStage>` — the exact fix for the flat-plate defect, un-applied.
- W-GLASS-ACCENT — the per-instance hue rim that would make selection kinetic, unused.
- math-paper.vue calm-content idiom — the paper-category gold standard, ignored.
- W-CARD-PAD √φ ladder — applied to the card, but content pools in the left gutter so the proportion reads broken.
