# foundations/shadows — FRONTEND-DESIGN deep critique (Pass-E)

**Page:** `demo/stories/foundations/shadows.vue` · live `http://localhost:5173/foundations/shadows`
**Lens:** frontend-design skill (distinctive, production-grade, AVOID generic-AI aesthetics) ∩ glass-ui design language
**North star:** `DESIGN.md` (iOS-26/27 Liquid Glass — the SIX-layer optical composite + 7 tiers + glass-cannot-sample-glass + spring physics) · `docs/precepts/{design-idioms,motion-canon,affordance-map}.md`

---

## 0. What the page IS today (the honest read)

A two-section token tour inside ONE flat `wash`-tier StoryHero card:

1. **Elevation** — an 11-cell grid of `140×90` cream rectangles, each painting one `shadow-*` token (`xs…2xl`, `cartoon`, `cartoon-hover`, `modal`, `soft`, `elevated`) with a `text-mono-caption` label underneath. Static. The cells fade in once on the `.scroll-cascade` and then never move again.
2. **Cartoon lift · hover the card** — one `glass-card` button (`HOVER ME` / `Lifts 1px`) beside a paragraph of explanatory body copy. The button does a `-translate 1px` + `shadow-cartoon → shadow-cartoon-hover` swap on hover.

The whole thing is honest, accessible, and token-correct. It is also **the most generic page in the demo** — it reads as a spec-sheet swatch grid, the exact "documentary table" `BB.W-DEMO-DESIGN` was supposed to retire (cf. `typography.vue`/`colors.vue`/`buttons.vue` which got the focal-specimen treatment; **shadows was left behind**). Against the iOS-27 bar and against its OWN sibling pages, it under-delivers on every axis the user named.

---

## 1. VISUAL HIERARCHY — the eye lands flat, the ladder is barely used

- **The hero is correct, the body is a void.** `Shadows` renders at the display register (`story-hero-title`, the √φ audacious ladder — good), eyebrow + blurb cluster above it (`W-HIERARCHY2` gravity cluster — good). But the moment the eye drops into the card, **everything is the same weight**: 11 identical rectangles, two identical `text-subheading` H2s, one body paragraph. There is no FOCAL specimen, no protagonist. The page peaks at the `<h1>` and then goes monotone — the exact "peaks at the title then monotone" failure `BB.W-DEMO-DESIGN` calls out for the foundations panes.
- **The audacious ladder is NOT used past the hero.** Per the binding brief ("TYPOGRAPHY-forward, the audacious √φ ladder") and `BB.W-SUFFUSE3`'s audacious-type-uplift (the mega/audacious tiers ACTIVATE on number/metric surfaces), a shadows page has an obvious typographic protagonist it ignores: **the cartoon shadow is the library's signature surface mechanic.** A `text-display-audacious` word — `DEPTH`, or the literal `cartoon` token name — cast with the very `shadow-cartoon` token it documents (type-as-specimen) is the move. Right now the only display type is the route-echo `<h1>`.
- **The grid has no internal hierarchy.** `xs` and `2xl` carry identical visual weight (same cell, same label rung) even though they sit at opposite ends of an *elevation* axis. An elevation tour should READ as a ladder — the cells should ascend (literal `translateY` / scale step, or a left-to-right size ramp) so the eye traverses shallow→deep. The `BB.W-CARD-PAD` golden ladder (sqrt-φ block over inline anchor) is the spacing vocabulary; nothing here steps.

**Verdict:** hierarchy is hero-only. Below the fold-line of the title it is a uniform gray field of equal-weight atoms.

---

## 2. AFFORDANCE — one real interactive cue on the whole page

- The 11 elevation cells are **non-interactive divs** with no hover, no focus, no cursor change. A first-class shadows page would let you *feel* the difference — hover a cell to lift it onto its hover-shadow, press it to seat it (the `W-PRESS-UNIFY` coupled spring-press is RIGHT THERE, unused). Currently the only thing that responds to a pointer is the single cartoon button.
- The cartoon button's affordance is **correct but lonely** — `focus-ring`, a real `glass-card` surface, a 1px-lift hover. It's the one bright spot. But it carries the entire interactive story of a page whose whole subject is *surface behavior*.
- **No state affordance anywhere.** Shadows on iOS are stateful (rest → hover → press → focus → elevated/dragging). The page shows ZERO of this loop except the one hover swap. The `docs/precepts/affordance-map.md` four-state contract (standard·hover·active·disabled) that every interactive atom is supposed to carry is absent from 10 of the 11 specimens.

**Verdict:** affordance density ≈ 1 interactive element / page. For a *surface-affordance* documentation page that is a self-contradiction.

---

## 3. ANIMATION AFFORDANCE — alive once, then dead

Against the binding bar ("is every element ALIVE — entrance, hover, press, state — at the iOS-27 bar?") this page is **mostly static**:

- **Entrance:** ✓ present — `.scroll-cascade` staggers the grid in (`W-SCROLL-MOTION`, PRM-carved). This is the one thing done right.
- **Hover:** ✗ — only the cartoon button. The 11 cells are inert.
- **Press:** ✗ — nothing presses. `useSpringPress`/`useLiquidPress` (`W-PRESS-UNIFY`, the interruptible coupled spring) exists and is consumer-hungry; this page should be a consumer.
- **State/continuous:** ✗ — no living motion. A shadows page is the *natural* home for a slow, continuous **light-source sweep** (a moving key-light that rakes across all 11 cells so the cast shadows shift in real time — the single most convincing way to communicate "these are different elevations"). That would make the page ALIVE in the `motion-canon.md` P5 compositor-only / P6 PRM-keeps-fade-drops-transform sense, with zero layout cost (animate a `--light-angle` custom prop driving `box-shadow` offset, or a `filter: drop-shadow` direction).
- **No spring anywhere.** The `motion-canon.md` SPATIAL-rides-a-spring / EFFECTS-rides-a-bezier split is unexercised. The cartoon lift uses `transition-transform duration-fast ease-out` — fine for a bezier effect, but the *lift* is spatial and should ride `--spring-smooth` per P1.

**Verdict:** one entrance animation, one hover. ~10% of the iOS-27 animation-affordance bar.

---

## 4. POLISH + DISTINCTIVENESS — reads as generic-AI swatch-grid

This is the page's biggest failure against the frontend-design skill's prime directive (avoid generic AI aesthetics):

- **It looks like every shadow-token page on every Tailwind starter ever shipped.** A 2/3/4/6-col responsive grid of equal rounded rectangles with monospace labels is the *canonical* AI-generated design-system filler. Nothing here says "glass-ui." A reviewer could not tell this page apart from a shadcn docs scaffold.
- **No glass, on the glass-ui shadows page.** The specimen cells are flat `bg-card` opaque rectangles. The library's whole identity is the SIX-layer Liquid Glass composite (`DESIGN.md`) — backdrop blur+saturate · surface tint · edge rim · inner catch-light · drop shadow · grain. The *drop shadow is layer 5 of that composite* — yet the page documents shadow in total isolation from the five layers it actually co-renders with. The distinctive move is to show shadow **as the grounding layer of real glass tiers** over a real backdrop, not as a flat-card abstraction.
- **The cartoon mechanic is undersold.** "The library's signature surface affordance" (the copy's own words) gets ONE small 56×128 button in a corner. The signature move deserves to be the page's HERO specimen — large, central, audacious.
- **Background is dead flat.** Per the brief ("glass demos over COLORFUL aurora backgrounds") and the sibling `/motion/deck` page (which floats its card over a live constellation field), this page has NOTHING behind the card — a flat `--neutral-0` page. Shadows literally cannot be evaluated without something behind them; a colorful aurora is both on-brand AND functionally necessary here.

**Verdict:** bespoke-premium score ≈ 2/10. This is the template-AI look the skill exists to prevent.

---

## 5. iOS-27 / PAPER / GLASS NORTH-STAR FIDELITY

- **GLASS:** absent from specimens (flat opaque cards). The page documents a glass-system layer using non-glass surfaces.
- **PAPER:** partially honored — the `shadow-cartoon` / `paper-on-paper` register IS the paper-morphism half, and the copy names it well. But it's confined to one button. The `cards.css` `@utility cartoon-surface` + the Memphis-sticker offset stamp is the most *distinctive* thing the page has and it's a footnote.
- **glass-cannot-sample-glass:** not exercised (no nested glass to get it wrong, but also no demonstration of the rule).
- **Spring physics:** unexercised (§3).
- **The dark-stage perception-correction is genuinely good craft** (`.shadow-stage` paints a mid-tone backing in dark so cast shadows read over the near-black page — `W-DARK-MATERIAL` aware). This is the one place the page shows real design intelligence. Keep it; it must survive any redesign.

**Fidelity:** ~3/10 — the paper half is whispered, the glass half is missing, springs absent.

---

## 6. SPACING / RHYTHM (golden-ratio) & COLOR (suffusion proportion)

- **Spacing:** the grid is a flat `gap-8` uniform lattice — no √φ ladder, no `BB.W-CARD-PAD` block-over-inline axis split. The card uses the StoryHero padding (correct) but the *interior* rhythm is mechanical. The cell→label `gap-3` is fine but undifferentiated.
- **Color / suffusion:** the page is almost entirely monochrome (cream cells, ink labels, brown-muted captions). Per `BB.W-SUFFUSE3`'s one-color-event rule this is *defensible* for a documentary token tour (the legitimately-monochrome surfaces stay flat) — BUT the page spends its zero color events on NOTHING, when shadow is the one foundations topic where a single warm key-light tint (a `--section-color-N` raking light) would be both the ONE color event AND the functional protagonist. The page is under-suffused, not over.

---

## 7. THE TOP DESIGN MOVES (concrete, ranked, idiomatic — no workarounds)

1. **Each sub-section in its OWN glassy card over a COLORFUL aurora.** Replace the single flat `wash` StoryHero card with a `<DockStage>`-style live `<Aurora>` backdrop (one GL context per route — the budget holds), and seat **Elevation** and **Cartoon lift** each in its own `glass-floating` card floating over it. This delivers four of the user's asks at once (own-card-per-section · bigger main area · glass-over-aurora · components-in-concert) and makes the specimens *actually documentable* (a shadow needs a backdrop). `glass-material.vue`'s `<ShowcaseFrame tier="field">` (BG-2 black-plate kill) is the precedent — glass over a live field, never a flat plate.

2. **Make the cells GLASS, and make them ALIVE.** Re-cast the 11 specimens as real glass tiers (the `deep`/`floating`/`resting` rungs) so each shows shadow *as layer-5 of the six-layer composite* over the aurora. Add the full four-state loop: hover lifts onto the hover-shadow on `--spring-smooth`, press seats via `useSpringPress`/`useLiquidPress` (`W-PRESS-UNIFY` gets its hungry consumer), focus-ring on keyboard. Every cell becomes a living affordance.

3. **A continuous raking key-light.** Animate a `--light-angle` custom prop (compositor-only, PRM-static per `motion-canon` P5/P6) that slowly rakes a key-light across all cells so the cast shadows shift in real time — the single most convincing, most *distinctive*, most on-iOS-27 way to communicate elevation. This is the page's signature living-motion moment and nothing like it exists in any generic shadow page.

4. **Promote the cartoon mechanic to HERO specimen with audacious type.** Pull the `Lifts 1px` cartoon card to large/central, and set a `text-display-audacious` word (`DEPTH` or `cartoon`) cast in the very `shadow-cartoon` token it documents — type-as-specimen, the `BB.W-DEMO-DESIGN` editorial-specimen treatment `typography.vue` got. This activates the √φ ladder past the hero and makes the "signature surface affordance" actually read as signature.

5. **Leverage the dock APIs for contextual switching.** Add a small page-local `<GlassDock>` (or `<DockStack mode="facets">`) that toggles the elevation grid between contexts — *Glass tiers* / *Cartoon (paper)* / *Modal+overlay* — each facet animating the card set with the `useDockOrientationMorph`/crossfade vocabulary (the user's "leverage the dock APIs / contextual switching" ask, the `/dock` system's whole point). The facet chips carry per-context `--glass-accent` hues (`W-GLASS-ACCENT`) — the page's ONE color event, functional.

6. **Standardize the import-path label.** The eyebrow reads the literal route `/foundations/shadows`; the sibling `/motion/deck` page reads the canonical `@mkbabb/glass-ui/deck`. Foundations pages have no single import, but the label register must be consistent — show the relevant token namespace (`@mkbabb/glass-ui/styles` → `--shadow-*`) so the affordance reads as a real, copyable surface, not a router breadcrumb.

7. **Tighten the language.** The blurb "Cartoon offset, elevated, modal." is a fragment list; the body paragraph is fine but the section heading "Cartoon lift · hover the card" embeds an instruction in a title. Per the brief ("tighten superfluous language") + the writing-style memory (no editorializing): heading → `Cartoon lift`; move "hover the card" into a caption or let the affordance speak. Drop "It's the library's signature surface affordance" self-praise — *show* it (move #4), don't assert it.

8. **Step the elevation grid into a real ladder.** Order/size the cells so they ascend shallow→deep (a `translateY` or scale ramp on the `--scroll-cascade--columns` flourish), so the grid READS as an elevation axis, not a flat swatch lattice — giving the eye the traversal §1 says is missing.

---

*Keep (do not regress):* the `.shadow-stage` dark perception-correction (§5), the `.scroll-cascade` PRM-safe entrance (§3), the cartoon-token correctness, the hero gravity-cluster.
