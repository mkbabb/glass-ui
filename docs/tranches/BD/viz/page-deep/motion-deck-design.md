# motion/deck — FRONTEND-DESIGN critique (Pass-E, design lens)

Page: `demo/stories/motion/deck.vue` · live `http://localhost:5173/motion/deck`
Captures: `_shot-deck-light.png` · `_shot-deck-stage2.png` (light, stage centered) · `_shot-deck-dark.png`
North star: DESIGN.md (§L1 six-layer composite · §L2 spring physics · §L3 tap choreography · the 7 tiers · glass-cannot-sample-glass) · motion-canon.md (P1–P6) · affordance-map.md (the five primitives) · design-idioms.md · the dock APIs · PROCEDURAL-SUITE.md.

Verdict in one line: a CORRECT, honest, minimal exerciser of the `/deck` headless core that DESIGN-UNDERPERFORMS at every turn — one card holding one undersized grey slide-stage, bare ghost paging, a near-dead constellation, and a deck whose own slides barely move. It demonstrates the API and forgets it is a *presentation* register that should feel like a keynote.

---

## 1. VISUAL HIERARCHY — the eye lands on a grey rectangle, not a slide

- **The page title is right; the stage is the problem.** `StoryPage`/`StoryHeader` render the audacious display `<h1>` "Deck" + the `@mkbabb/glass-ui/deck` chip (correct, standardized — KEEP). But the LANDING object — the deck stage itself — is a flat ~224px (`min-block-size: 14rem`) grey `glass-quiet` slab floating in a sea of empty card. On a *presentation* register the stage is the hero; here it is a small letterboxed strip with a giant blurb above it and dead space below. The eye reads the prose, then a tiny slide, then nothing.
- **The slide title under-spends the √φ ladder.** The active slide title is `text-display-2` (53px) in `--motion-accent` violet — pleasant, but this is a *full-viewport presentation* register and the slide headline is the single most important pixel. DESIGN.md is TYPOGRAPHY-FORWARD; a keynote slide title is the canonical `text-display-mega`/`-hero` home. At 53px on a 1022px-wide stage the title reads as a card heading, not a slide. The slide body is `text-body` (14px) — a real slide subtitle wants `text-subheading`/`text-title`. The type does not say "this is a SLIDE."
- **Flat section weight, single section.** The page has ONE `StorySection` (`heading="Keyboard-paged presentation deck"` — good, it uses the `heading` rung). But the blurb is 4 lines of dense internal vocabulary above a small stage, so the prose out-weighs the demo. The teaching surface should be the deck IN MOTION, not a paragraph describing it.
- **`1 / 6` slide counter is a mono caption top-left** — correct register (`text-mono-caption`), but it is the only locator and it competes with nothing. A slide deck wants a progress affordance (the pager) that reads as PRIMARY, not a 6px-dot afterthought below the stage.

## 2. STRUCTURE — one card, one slab; the user's "each sub-section in its OWN glassy card, main card BIGGER" is unmet

The user's binding directive maps cleanly onto a deck page and is ignored.

- **One `StoryPage` card holds one inner stage.** There are no sub-cards. A deck demo has natural sub-surfaces the ask names: (a) the STAGE (the live slide), (b) the CONTROLS (prev/pager/next), (c) a CONTRACT panel (the keyboard map / aria-live readout / "Slide N of M"). Each should be its OWN glassy card — stage `glass-resting` (the hero, BIGGER), controls a `glass-floating` pill (a real dock!), the contract a `glass-quiet` aside. Right now it is one undifferentiated column inside the chassis card.
- **The stage is TOO SMALL.** `min-block-size: 14rem` letterboxes a "full-viewport PRESENTATION register" into a 224px strip. The ask is explicit: *the main card area BIGGER (more screen space).* The stage should claim the dominant vertical band — `min-block-size: clamp(20rem, 48vh, 32rem)` — so a slide reads as a slide, not a banner.
- **The stage glass is REAL but reads as a slab (the BG-2 class).** Verified: the stage composes `glass-quiet` honestly — `backdrop-filter: blur(8px) saturate(1.35) brightness(1.16)`, a 1px rim, the dark-arm luminosity lift. But over the near-invisible constellation there is almost nothing to refract, so in light mode it reads as a dead grey rectangle (`_shot-deck-stage2.png` is the proof — the stage is the greyest object on the page). DESIGN.md §L1: a surface with nothing behind it to bend "reads iOS-7-flat." The glass needs a COLORFUL backdrop to come alive (§3).
- **The inner active slide and the stage are TWO stacked glass surfaces.** The slide `section` sits inside the `glass-quiet` stage; if the slide itself ever gained a glass tier this is the `glass-cannot-sample-glass` trap (§L1) — two `backdrop-filter` layers compositing to black. Today the slide is transparent (safe), but any "put each slide on its own card" move must route through ONE composition container, not nested `backdrop-filter`.

## 3. BACKGROUND — a near-dead constellation, not the COLORFUL aurora the ask names

- The manifest assigns `motion → constellation` (the drift-band default). Verified: the field is sparse grey dots, near-invisible in light, faint in dark. The user's ask is verbatim: *glass demos over COLORFUL aurora backgrounds.* A presentation register is the STRONGEST case for a designed field — a keynote backdrop. The motion-family violet identity (`--motion-accent`/`--viz-legendre`) is the natural aurora seed: a violet-tuned `<Aurora>` (offscreen-paused, one-GL-per-route) would make the slide-stage glass READ as liquid glass and give the deck a keynote atmosphere. At minimum, colorize the constellation to the motion-violet so the field carries the family hue instead of reading as generic grey static.

## 4. ANIMATION AFFORDANCE — a PRESENTATION page whose slides barely move (the deepest failure)

Per the brief: *every element ALIVE at the iOS-27 bar — entrance, hover, press, state. HIGH animation affordance for EVERY component.* A deck is the purest motion surface in the library and this one is nearly inert.

- **The slide transition is a flat `translateX(2rem) + opacity` cross-fade** (lines 116–128). It rides `--spring-deck` (= `--spring-smooth`) on the transform — honest and PRM-carved — but it is the MINIMUM viable transition. A keynote slide change at the iOS-27 bar is a directional, depth-aware move: the outgoing slide recedes/blurs, the incoming blooms FROM the advance direction (forward vs back), coupled with a `filter` blur-settle (motion-canon P3 fade-coupled-to-transform). The `useLiquidReveal` source-rect bloom is RIGHT THERE in the family. Today every slide change looks identical regardless of direction.
- **No entrance choreography.** The stage, the slides, the pager, the prev/next don't stagger in. The page gets `.scroll-build` from the chassis for free but the deck's own elements have no `.scroll-cascade`. A deck should ASSEMBLE — stage settles, controls slide up, first slide blooms.
- **Prev / Next are bare ghost-text buttons** (`variant="ghost"`). They carry the library press floor (the only true four-state affordance on the page) but they are the LEAST interesting controls and read as plain links (`_shot-deck-stage2.png`: faint "Prev" / "Next" text at the stage edges). On a deck these are the primary navigation — they want to be real `glass-floating` icon controls (chevrons) with hover-lift + gleam + press-squish per affordance-map (HOVER-LIFT · GLEAM-TRACK · PRESS-SQUISH).
- **The `<DeckPager>` dots are tiny grey afterthoughts.** They window correctly (the oracle works) but render as ~6px grey dots below the stage. The active dot should be a confident `--motion-accent` violet pill that GLIDES between positions (the PagerDots register supports this); right now the state change is barely visible.
- **The in-slide `Button` (Focus-guarded slide) is a stock `variant="default"`** — fine, but it is the ONLY interactive cue inside a slide and it doesn't teach the focus-guard story visually (nothing signals "this control steals Space from paging").
- **The dock APIs the user named are entirely absent.** A deck's controls ARE a dock by nature — a floating glass control bar. The page should compose `<GlassDock>` as the presentation control strip (prev · pager · next · play/pause), demonstrating the dock's contextual-switching/morph as the deck's chrome. The deck's "Slide N of M" context is the canonical `<DockStack mode="facets">` or `<DockLayerGroup>` case: the dock morphs/animates as the deck advances. This is the single highest-leverage way to satisfy "leverage the dock APIs (contextual switching/animating)."

## 5. POLISH + DISTINCTIVENESS — a competent API exerciser, not a bespoke keynote

- The composition is the generic shape: a label, a long blurb, a bordered preview box, a prev/dots/next row. Nothing says "this is THE presentation register of a liquid-glass library." A world-class deck page would let the deck author the layout — slides that bloom directionally, a glass control dock that morphs per slide, an aurora keynote field, slide titles at the audacious tier.
- **No spring-physics expression.** This is a `--spring-deck` page that never SHOWS the spring. A keynote transition at the iOS bar carries the §L2 spring feeling (the smooth glide is correct for a pane swap, but it should be VISIBLE — a slight settle, a depth cue), not a 2rem slide-and-fade that could be any CSS transition.
- **The copy is dense, machine-facing** (the "tighten superfluous language" ask). The blurb: *"useDeck owns the headless index + progress + the 'Slide N of M' announcer; useDeckKeyboard pages on Arrow/Space/digit (focus-guarded so a focused control keeps its native activation); the slide transition rides --spring-deck; <DeckPager> windows the dots over PagerDots' ONE oracle."* This is a commit message. A user does not care about "PagerDots' ONE oracle." → "A keyboard-paged presentation deck. Arrow/Space to advance, digits to jump, focus-guarded so controls inside a slide still work." The slide bodies themselves are good (they teach the keyboard contract concisely) — KEEP those.

## 6. SPACING / RHYTHM — fine scaffold, wasted vertical

- The chassis card padding is the BB.W-CARD-PAD √φ ladder (owned, correct). The `gap-6`/`gap-4` between stage and controls is on the adjacent scale. The rhythm BREAK is the proportion: a 4-line blurb + a 224px stage + a thin pager row leaves the bottom half of the card empty (`_shot-deck-light.png` / `_shot-deck-stage2.png`). The stage should claim the φ-dominant band; the blurb should shrink to one line.

## 7. COLOR — suffusion correct but timid; the violet never becomes the page identity

- The one-color-event rule (W-SUFFUSE) is honored: the slide title is the sole `--motion-accent` violet text-event, the body stays ink, the counter is mono. Good discipline. But the violet is a single dab on a 53px title — it never becomes the page's atmosphere. On a presentation register the family violet should suffuse the FIELD (a violet aurora), the active pager dot, the control-dock accent rim (via `--glass-accent`) — making the deck unmistakably the motion band's surface, not a generic grey demo.

## 8. PATH LABEL + standardization — CORRECT, keep

- The chrome chip reads `@mkbabb/glass-ui/deck` (verified via manifest line 316). This is the standardized subpath label, no `/motion/deck` local-label drift. KEEP. The path-label ask is already satisfied on this page.

---

## TOP DESIGN MOVES (ranked, concrete)

1. **BIGGER stage as the hero, on REAL colorful glass.** Lift `min-block-size: 14rem → clamp(20rem, 48vh, 32rem)`, promote it to `glass-resting`, and put it over a violet-seeded `<Aurora>` (motion-accent hue, offscreen-paused, one-GL-per-route) so the slide-stage glass refracts a designed keynote field instead of dead grey constellation. This single move satisfies "main card BIGGER" + "COLORFUL aurora backgrounds" + makes §L1 glass actually read.
2. **Make the controls a real `<GlassDock>` presentation strip + leverage dock contextual-switching.** Replace the ghost prev/dots/next row with a `glass-floating` `<GlassDock>` (chevron `<DockIconButton>`s · the `<DeckPager>` · a play/pause). Drive a `<DockStack mode="facets">`/`<DockLayerGroup>` off the slide index so the dock MORPHS/animates as the deck advances — the literal "leverage the dock APIs (contextual switching/animating)" ask, and the canonical affordance showcase (HOVER-LIFT · GLEAM-TRACK · PRESS-SQUISH per affordance-map).
3. **Author a directional, depth-aware slide transition (the iOS-27 keynote bar).** Replace the flat `translateX(2rem)+opacity` with a forward/back-aware bloom: outgoing recedes + blurs (`filter` blur-settle, motion-canon P3), incoming blooms FROM the advance direction via `useLiquidReveal`/the spring source-rect, coupled fade. Make the `--spring-deck` feeling VISIBLE (§L2 smooth glide with a real settle).
4. **Each teaching surface in its OWN glassy sub-card.** Split into three glass cards: the BIG `glass-resting` STAGE (hero), the `glass-floating` CONTROL DOCK, and a `glass-quiet` CONTRACT aside (the live keyboard map + the visible "Slide N of M" aria readout). The user's "each sub-section in its OWN glassy card" — met by composition, not one slab.
5. **Slide titles at the audacious tier + a confident violet pager.** Promote the slide headline to `text-display-mega`/`-hero` (the keynote-title home of the √φ ladder); make the active `<DeckPager>` dot a `--motion-accent` violet pill that GLIDES between slots (the PagerDots glide register). The slide must READ as a slide; the progress must READ as progress.
6. **Entrance choreography + alive controls.** `.scroll-cascade` the stage→dock→first-slide assembly; give the control-dock chevrons hover-lift + gleam + press-squish; give the in-slide Focus-guarded `Button` a visual focus-guard cue. Every element ALIVE — entrance, hover, press, state.
7. **Tighten the blurb to one line; keep the slide bodies.** "A keyboard-paged presentation deck — Arrow/Space to advance, digits to jump, focus-guarded so controls inside a slide still work." Drop the oracle/announcer internals. KEEP the per-slide bodies (they teach the contract concisely).
