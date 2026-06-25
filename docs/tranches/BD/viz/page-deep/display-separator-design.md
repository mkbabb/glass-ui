# display/separator — FRONTEND-DESIGN deep critique (Pass-E)

SFC: `demo/stories/display/separator.vue` · live: `http://localhost:5173/display/separator`
North star: `DESIGN.md` (iOS-26/27 Liquid Glass §L1–§L5) · `docs/precepts/{design-idioms,motion-canon,affordance-map}.md`
Captured: 1440×900, light mode, all 4 StorySections, the floating shell dock.

---

## TL;DR

The Separator is the library's *humblest* primitive — a 1px warm-ink hairline — and this page treats it like one: **four flat sub-sections stacked inside ONE giant resting-tier outer plate, zero color, zero procedural backdrop, zero animation beyond the route-enter build, and not a single component besides `Card` + `Separator` itself.** The component's own engineering is genuinely good (the BC.W-SEPARATOR-FIX split-rule flexbox is the correct textbook `─── or ───` divider, warm `--separator-ink` not grey per BA.W-NO-GRAY), but the *page* is the most generic-AI-template surface in the set: a documentation scroll, not a designed showcase. The user's seven asks are all real and all unmet. The opportunity is high precisely *because* the subject is minimal — a separator page is where you must PERFORM hierarchy, because the primitive itself carries almost none. This page should be the cleanest demonstration in the library that a divider is an act of *rhythm*, and instead it's four indistinguishable boxes.

---

## 1. VISUAL HIERARCHY — does the eye land right?

**Strong (the only strong thing):** The `Separator` masthead — `text-display`-ladder sqrt-φ wordmark (~96px) over the standardized `@mkbabb/glass-ui/separator` import chip — is exactly the typography-forward opening DESIGN.md wants. Eye lands on the wordmark, drops to the chip. This is correct and already carries the user's "standardize the import-path label" ask (the chip reads `@mkbabb/glass-ui/separator` verbatim, confirmed live).

**The collapse below the masthead:** every section is the identical `StorySection label=… (mono caption) → Card → CardContent → flat copy` sandwich, FOUR times, on the same warm-cream plate. The `label` rung is the mono eyebrow (`text-mono-caption`, BB.W-EYEBROW-UNION) — fine for a caption — but there is **no `heading` rung** (the `text-subheading` 20.4px/600 register, AZ.W-HIERARCHY) anywhere below the masthead, so the √φ ladder is used ONCE and abandoned. For a *type-forward* library this is the cardinal under-use of its own audacious ladder: a separator page should have AT LEAST one editorial display moment that IS a separator (a giant `or`, a hero numeral straddling a rule) and it has none.

**The single-plate problem (the user's "each sub-section in its own glassy card" ask, verbatim-unmet):** the entire `StoryPage` body sits in ONE resting outer plate, and the four sub-sections are flat hairline-delimited regions inside it (the `:delimited` chassis seam). The two inner `Card`s (horizontal, labelled) ARE cards, but the vertical-flex and section-label-copy sections are bare CardContent on the outer plate — so the page is structurally inconsistent (two boxed, two not) and the eye has no landmark rhythm. A page about *dividing space* fails to divide its own space into discrete glassy cards.

## 2. AFFORDANCE — clear interactive cues?

There is **nothing interactive on this page at all.** Not one button, switch, toggle, tab, or pressable surface — only static `Card`s and `Separator`s. That is a defensible literal reading ("a separator is non-interactive") but it is a design failure against the BD bar: the user explicitly asks each page to "deftly use a series of glass-ui components (docks/procedural-anims/cards/tabs/buttons)." A separator page can — and should — be *driven* by controls: an `orientation` toggle (`<SegmentedTabs>` or `<ToggleGroup type="single">`) that morphs the live specimen horizontal↔vertical, a `label` text input that re-renders the split-rule, a density slider that animates `my-*` spacing. Those would make the divider's *parameters* tangible. As shipped, the reader cannot DO anything; they can only read.

## 3. ANIMATION AFFORDANCE — is every element ALIVE at the iOS-27 bar?

**This is the deepest miss.** Per `affordance-map.md` the closed 5-primitive set (HOVER-LIFT · GLEAM-TRACK · PRESS-SQUISH · DRAG-MORPH · FOCUS-RING) should make every element answer the pointer; per `motion-canon.md` P1–P6 and `feedback_liquid_weight_universal` ALL motion must carry weight/inertia/bounce. On this page:

- **Entrance:** the `.scroll-build` / `.scroll-cascade` page-build fires once on route-enter (StoryPage hosts it) — present, correct, PRM-carved. ✓ The single alive thing.
- **Hover:** the `Card`s do NOT lift (no `:pressable`, no cartoon tier, no `v-specular` gleam-track). The separators are inert. Zero hover life.
- **Press:** nothing presses (nothing is interactive). The canonical §L3 tap-squish (`--scale-press` 0.96 + `--spring-snappy`) is invisible on the page.
- **State / the separator's OWN animation affordance:** here is the bespoke opportunity totally missed — **the separator should DRAW.** A rule that wipes in (`stroke-dashoffset` / `scaleX` origin-center on `--spring-smooth`) is the obvious "every component is alive" move for a literal line. The split-rule's two segments could grow outward from the label on the snappy clock (the `useLiquidFlex` reciprocal-stretch register already exists). An orientation morph H↔V is a textbook `--dock-morph-t` / View-Transitions case the library already ships. None of it is exercised. A 1px line is the EASIEST thing in the library to animate distinctively, and it sits dead.

Verdict: against the BD "HIGH animation affordance for EVERY component" bar, the page is ~95% static — worse than display/card because there isn't even a cartoon hover-lift.

## 4. POLISH + DISTINCTIVENESS — bespoke-premium or generic-AI-template?

**Squarely generic-template.** The tells: four identical eyebrow→box→copy sandwiches; flat warm-cream plates with no elevation differentiation; filler copy ("Paragraph above the rule." / "Paragraph below." / "Docs · API · Playground · Changelog"). Nothing here looks like a product — it looks like a Storybook MDX stub. The ONE genuinely nice detail is the labelled split-rule (`─── or ───` with the small `bg-background` label chip) — that composition is correct and premium-adjacent, but it's a 14px caption between two thin lines, far too quiet to anchor a page. There is no second display moment, no oversized specimen, no editorial pull-quote, no paper register, no aurora — none of the library's distinctive vocabulary is on screen.

## 5. iOS-27 / GLASS / PAPER NORTH-STAR FIDELITY

- **§L1 six-layer composite:** the `Card`s nominally compose the six layers, but over the FLAT solid page (no procedural backdrop, `canvas` count = 0 confirmed live) the backdrop-blur + saturate channels do **literally nothing** — there is nothing high-frequency behind to refract, so every surface reads iOS-7-flat-tinted, not iOS-26-lensing. The material is structurally present and visually defeated by the stage. The user's "glass demos over COLORFUL aurora backgrounds" ask is verbatim-unmet.
- **§L1 glass-cannot-sample-glass:** trivially respected (no overlapping glass). ✓
- **§L2/§L3 spring physics:** entirely unused (no motion to spring).
- **Paper morphism:** absent. A separator is the ONE primitive that is *more* native to paper than to glass (a rule on a sheet) — the `paper-grain` / blueprint-grid / `math-paper` gold-standard register (`design-idioms.md`) would make a paper-rule specimen sing, and DESIGN's "GLASS + PAPER both" mandate goes untouched. This is the single biggest distinctive-register miss on the page.
- **§L5 a11y brackets:** inherited via tokens; the component's `role="separator"` + `aria-orientation` + labelled `aria-label` are correct (good component hygiene). ✓

## 6. SPACING / RHYTHM (golden-ratio)

Card-internal padding rides the W-CARD-PAD √φ ladder (correct, the headings clear the top edge). But **inter-section rhythm is dead-monotone** — every section is the same vertical beat, and ironically the page about *spacing rules* (`my-4`, `my-6`, `mx-4`) demonstrates only two arbitrary margin values with no φ-stepped cadence shown. A separator page should TEACH rhythm: a visible ladder of `my-2 / my-4 / my-6 / my-8` rules so the reader sees breath as a designed scale. The dock floats correctly over the bottom; that's the only spatial sophistication.

## 7. COLOR — suffusion proportion

**Effectively monochrome — and here that is a MISS, not restraint.** The page is all warm-ink-on-cream with zero `--section-color` / `--viz-*` event. The one-color-event rule (`proof:suffuse`, AZ.W-SUFFUSE) says ONE deliberate color event per surface — this page spends ZERO. A separator is a perfect vehicle for a *single* premium color event: a gradient-spectrum rule (the `useBorderSpectrum` OKLCH/shorter-hue walk the library already ships for `BorderProgress`), or a section-color-keyed divider per group. The warm hairline is correct as the DEFAULT, but a showcase that never demonstrates the rule can carry color leaves its most photogenic move on the floor.

---

## TOP DESIGN MOVES (ranked, concrete)

1. **Stage the whole page over a COLORFUL `<Aurora>` and give each sub-section its OWN floating-tier glassy card** (`<DockStage>` / `ShowcaseFrame tier="field"` precedent). This single move answers four user asks at once: own-card-per-section, bigger main area, glass-over-colorful-aurora, and makes the §L1 six-layer composite actually *lens*. The dividers reading over a live aurora is the whole point of a glass separator.

2. **Make the separator ALIVE — it must draw.** Wipe the rule in on `--spring-smooth` (scaleX origin-center); grow the labelled split-rule's two segments outward from the label chip on `--spring-snappy`; add an orientation H↔V morph on the live specimen via the View-Transitions / `--dock-morph-t` substrate the library already ships. A 1px line is the easiest distinctive animation in the library; ship it.

3. **Leverage the dock APIs for contextual switching** (the user's ask). A `<DockStack mode="facets">` or `<SegmentedTabs>` orientation/label/density switcher that MORPHS the hero specimen live — turning the page from a static gallery into a parametric instrument. This is the "deftly uses a series of components" bar.

4. **Add a TYPOGRAPHY-forward editorial hero specimen** below the masthead: a giant `text-display` `or` straddling a split-rule, or an oversized numeral with a vertical rule — one second display moment so the √φ ladder is used more than once.

5. **Ship a PAPER register** — a separator-on-paper specimen (`paper-grain-overlay` + blueprint grid, the `math-paper` gold standard). The separator is more native to paper than any other primitive; this honors DESIGN's GLASS+PAPER mandate and adds a distinctive register no other page has cause to.

6. **Spend ONE color event**: a gradient-spectrum rule via `useBorderSpectrum` (OKLCH/shorter-hue), or section-color-keyed dividers — proportionate per `proof:suffuse`, premium, photogenic.

7. **Teach rhythm**: a visible φ-ladder of `my-2/4/6/8` rules so spacing reads as a designed scale, not two arbitrary margins. (Tighten the filler copy while doing it — the user's "tighten superfluous language" ask.)

---

## VERDICT (5 lines)

1. The Separator COMPONENT is well-built (BC split-rule flexbox, warm `--separator-ink`, correct a11y) but the PAGE is the most generic-AI-template surface in the set — four flat boxes in one giant plate, zero color, zero aurora, zero animation past the entrance.
2. Visual hierarchy collapses after a strong masthead: the √φ ladder is used once and abandoned, and the page is structurally inconsistent (two sections boxed, two not) — the user's "each sub-section its own glassy card" ask is verbatim-unmet.
3. Animation affordance is ~95% absent — and a 1px rule is the EASIEST distinctive animation in the library (draw-in, split-rule grow-from-label, H↔V morph), so the miss is glaring against the iOS-27 / liquid-weight-universal bar.
4. North-star fidelity is defeated by the stage: the six-layer glass composite cannot lens over a flat solid page (canvas count = 0), and the PAPER register — the separator's most native home — is entirely absent.
5. Top move: stage over a colorful `<Aurora>`, give each section its own floating glassy card, make the rule DRAW, and drive it with a dock/tabs orientation switcher — turning a documentation scroll into a parametric, alive, bespoke instrument.
