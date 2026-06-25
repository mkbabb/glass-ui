# foundations/css-utilities — FRONTEND-DESIGN deep critique (Pass-E)

**Surface:** `demo/stories/foundations/css-utilities.vue` · live `http://localhost:5173/foundations/css-utilities`
**Captured:** 1440×900, both modes. Content page (`hero: false`), category bg = `paper` (static), body in ONE `glass-resting` card.
**North star:** DESIGN.md §L1–L5 · design-idioms.md · motion-canon.md (P1–P6) · affordance-map.md.
**One-line:** the LEAST important page in the system (a single token + a single utility) is given a whole route and renders as a tall grey near-empty slab — the gap between the audacious title and the inert body is the whole story.

---

## 0. What this page IS, honestly

This page documents exactly TWO things: the `--scale-hover` token (default 1.08) and the `.scale-on-hover` utility that reads it. That is a one-token, one-rule, one-transition surface. The page spends three full-bleed StorySections + a 1152px-wide glass card + ~1100px of vertical scroll on it. The content-to-canvas ratio is the root design problem: there is almost nothing to show, and the chassis inflates the nothing into a poster. Every critique below is downstream of that mismatch. The right gestalt move is NOT "decorate the empty card" — it is "make the demo DO something so alive that the scarcity becomes a virtue" (one hero interaction, exhaustively animated), then collapse the prose into that one stage.

---

## 1. VISUAL HIERARCHY — the eye lands on the title, then falls off a cliff

- **The title is genuinely good and genuinely orphaned.** `CSS Utilities` renders at `text-display-4`-class (53–86px Plus-Jakarta, the √φ audacious ladder — §Typography). It is the single best thing on the page. But it is the ONLY typographic event. Below it the hierarchy flatlines: a 12px mono eyebrow, an 18px blurb, then THREE identical mono section-labels (`DEFAULT --SCALE-HOVER = 1.08` / `PER-INSTANCE…` / `TOKEN SURFACE`) at the SAME weight, SAME color, SAME size. The ladder has a top rung and a floor rung and nothing in between — the "typography-forward" mandate is half-met (the title) and half-ignored (every section reads as a caption). This is the classic AI-template tell: one hero, then undifferentiated body.
- **The 1.08 number is buried in a mono label.** The whole page is ABOUT the number 1.08 (and its 1.04/1.15/1.25 overrides). Those numbers should be the protagonists — they belong at `text-display-mega`/`-hero` (the metric/number home per §Audacious display tier, the fast.com peg), not as 12px `fira-code` captions under tiny black swatches. The page documents an audacious type ladder while refusing to use it on its own data-protagonist. (CONTROL-CUSTOM CP1 / data-protagonist precept — the number IS the content.)
- **The override grid inverts the read.** The four override frames put a tiny 48px swatch on top, then the number `1.04`, then the word `subtle` — eye lands on the (identical, inert) black square first, the meaningful number second. Flip it: the NUMBER is the hero, the swatch is the proof.
- **The first frame and the override grid are visually unrelated.** Frame 1 is one wide `bg-card` band with 4 circular icon chips; frames 2-5 are a 4-up grid of `bg-card/40` quiet cards with rounded-square swatches. Two completely different specimen languages for the SAME utility. The eye cannot build a model.

## 2. AFFORDANCE — the interactive cue is a lie of omission

- **Everything that is interactive looks identical to everything that is not.** The four icon chips in frame 1 are `<button>`s (real, hoverable). The four override swatches are `<button>`s too — but they are bare black/violet squares with NO label, NO icon, NO press cue, NO focus-visible styling visible at rest. A user has no way to know any of these are touchable until they happen to mouse over one. DESIGN.md §Philosophy "four-state interactive contract" is the binding rule: rest/hover/active/disabled + focus ring. These chips ship rest + hover-scale only. No `:active` squish (§L3 tap choreography — `--scale-press` 0.96 is MANDATORY and absent), no focus ring, no pressed state.
- **The override swatches have no content.** A 48px solid `bg-primary` square with no glyph is not a demo of anything — it is a placeholder. In dark mode it becomes a `bg-primary` violet square (the legendre-violet dark `--primary`), which reads as a random color the page never explains. The swatch should carry the SAME glyph language as frame 1 (a Lucide icon) so the two halves of the page speak one vocabulary AND so the swatch is self-evidently a control.
- **The whole "hover to see it scale" mechanic is undiscoverable on touch + on first paint.** Nothing on the page says "interact with me" except the blurb prose. A world-class demo makes the affordance ITSELF the headline — a perpetually-breathing chip, a "hover me" ghost label that fades on first interaction, an auto-played once-through scale-pulse on mount so the user SEES the behavior before they're asked to discover it.

## 3. ANIMATION AFFORDANCE — fails the iOS-27 bar comprehensively

This is the most serious failure against the BD liquid-glass north star. The page is about MOTION (a hover-scale utility) and is itself almost entirely STATIC.

- **Entrance:** the page rides `.scroll-build` + `.scroll-cascade` (StoryPage chassis) so the sections fade-rise on mount — that is the ONE animation present, and it is inherited, not authored. Good that it exists; it is table stakes, not distinction.
- **Hover:** `.scale-on-hover` fires `scale(1.08)` on `--duration-fast` + `--ease-standard`. This is a BEZIER on a SPATIAL transform — a direct violation of motion-canon P1 (spring-iff-spatial: a channel that MOVES/RESHAPES rides a `--spring-*`, never a bezier). A scale lift on `--ease-standard` reads as a flat mechanical zoom, not the iOS "confident tap" pop. The single most-demonstrated interaction on the page uses the wrong easing class per the project's own canon. It should ride `--spring-snappy` + `--spring-snappy-duration` (§L2 spring selection rule — "if the user's finger touched a pixel, use a spring"; the hover is the finger approaching).
- **Press:** NONE. No `:active` scale, no `--scale-press` squish, no touch-illumination. §L3 declares "tap-squish is universal — buttons squish." These are buttons. They do not squish. The page demonstrating the LIBRARY'S motion vocabulary omits the library's mandatory press contract.
- **State / breathing / ambient:** nothing. No idle life, no shimmer, no specular gleam following the pointer (the `vSpecular` tier-root auto-arm exists and would make every chip gleam — W-LIQUIDHOVER — and is unused here), no glass refraction (`.glass-lens` / `--glass-refract` — W-LENSING — absent). The chips are flat circles with a cartoon shadow; they could be a 2018 Bootstrap page.
- **The override swatches don't animate the thing they document.** They are supposed to show 1.04 vs 1.15 vs 1.25 hover lifts side-by-side. But there is no way to see all four at once (you can only hover one), no auto-cycle, no "play all" affordance. The comparative payload — the WHOLE point of the per-scope section — is invisible unless you manually hover each of four cards in sequence and hold a mental image.

## 4. POLISH + DISTINCTIVENESS — reads generic-AI-template, not bespoke-premium

- **Glass over a flat grey/black void is the cardinal anti-pattern.** The body card is `glass-resting` (blur 10px, α 0.66) — but the page background is the STATIC `paper` wash (a flat near-white in light, near-black in dark). DESIGN.md §L1: "the blur is imperceptible over a flat substrate (nothing behind to blur)." Confirmed in render: the card reads as a near-opaque off-white plate in light, a charcoal slab in dark. The six-layer optical composite (§L1 — backdrop blur+saturate · tint · rim · catch-light · shadow · grain) has NOTHING to refract, so five of the six layers are inert. The user's explicit BD ask — "glass demos over COLORFUL aurora backgrounds" — is the direct fix and is unmet: this is a glass page with no glass-worthy backdrop.
- **No dock leverage.** The user's BD ask names "leverage the dock APIs (contextual switching/animating)." This page has zero dock content — the only dock on screen is the global nav shell. A page about a hover/scale utility is a perfect contextual-dock candidate: a `<DockStack mode="facets">` rail to switch the override scope (subtle/default/boomed/audacious) and animate the live swatch, or a dock-hosted control strip that re-tunes `--scale-hover` live.
- **The sub-sections are NOT in their own glassy cards.** The user's BD ask: "each sub-section in its OWN glassy card." Here all three sections share ONE outer card and the sections inside are bare (frame 1 is one ShowcaseFrame, frames 2-5 are a grid, section 3 is a `bg-card/40` prose `<ul>`). No per-section glass surface, no tier hierarchy, no §L1 ladder on display. For a FOUNDATIONS page that should be teaching the glass ladder by example, this is a missed teaching surface.
- **Off-brand stray hues.** The four icon glyphs read `--section-color-8` (ruby, fine), `--section-color-2` (oklch hue 265 — BLUE), `--section-color-7` (hue 317 — VIOLET), `--section-color-5` (amber, fine). Over the warm-cream paper page the blue Star and violet Sparkles read as the exact "WTF is this blue" stray-hue the source comment claims to have swept. These ARE library ramp stops, but picking the two COOLEST stops on the warmest page violates the suffusion proportion (§one-color-event / W-SUFFUSE — one deliberate color event per surface, warm-coherent). The page wants the warm arc of the ramp (7-8-5-0) or a single suffused hue, not a cool-warm rainbow on cream.
- **`bg-primary` black/violet swatches are the off-the-shelf tell.** A solid `--primary` square with no treatment is the most generic possible specimen. Bespoke would make the swatch itself a glass tile that refracts the aurora behind it as it scales — the scale demo and the glass demo become one.

## 5. iOS-27 / PAPER / GLASS NORTH-STAR FIDELITY

- **Glass:** present in class, dead in render (no backdrop — see §4). Five of six §L1 layers inert.
- **Paper:** the page IS on the paper register but never USES it as a designed surface — no `paper-grain-overlay`, no blueprint-grid, no ink-rail (the `math-paper.vue` gold-standard idiom from §calm-content). A foundations page is the ideal home for the paper-morphism the BD ask names ("GLASS + PAPER morphism both") and it ships neither deliberately.
- **Spring physics:** absent (the one motion is a bezier — §3).
- **Suffusion proportion:** violated (cool-warm rainbow on cream — §4).
- **Verdict:** the page name-checks the system (glass card, scale token, section chassis) but embodies almost none of the language's distinctive moves. It is COMPLIANT-flat, not LIQUID.

## 6. SPACING / RHYTHM (golden-ratio)

- The chassis rhythm is correct and inherited: `--story-page-section-gap` 2.5rem, `--story-page-max-inline` 72rem, card padding 32px (the φ-ladder W-CARD-PAD). No complaint at the chassis level.
- The PROBLEM is vertical emptiness, not bad spacing: the first frame is a ~140px-tall band holding four 56px chips centered in a sea of whitespace (~40% of the band is empty horizontal void on a 1440 viewport). The frame is sized for content it doesn't have. Golden-ratio rhythm can't save a surface with no protagonist.
- The override grid is a clean 4-up `sm:grid-cols-4` — fine — but each cell is mostly empty (a 48px swatch + two text lines in a ~180px-tall card).

## 7. COLOR

Covered in §4. Net: warm-cream identity is correct at the chassis; the demo glyph palette breaks it with two cool stops; the swatches contribute no color event (black) or an unexplained one (dark violet). The page should choose ONE suffusion strategy: either the warm arc of the ramp for the four glyphs, or a single `--motion-accent`-style event (this IS a motion-utility page — the legendre-violet `--motion-accent` would be the coherent ONE event, matching the /motion family identity).

---

## TOP DESIGN MOVES (ranked — make this page exceptional)

1. **Put the page over a live, colorful aurora and drop the sub-sections into their OWN glass cards (the user's two headline asks, one move).** Set `background: "aurora"` (warm preset) in the manifest row, switch the ShowcaseFrames to `tier="field"` (they already support it — the BG-2 plate-kill), and give each StorySection its own `glass-resting` card so the §L1 six-layer composite finally has a backdrop to refract. Now the swatches that scale ALSO refract the moving aurora as they lift — the scale demo and the glass demo fuse. This is the single highest-leverage change.

2. **Make the NUMBERS the protagonists at the audacious ladder.** Render `1.08` / `1.04` / `1.15` / `1.25` at `text-display-mega`/`-hero` (the metric home — §Audacious display tier), with the swatch as the small proof beneath. The page documents the audacious ladder; it must USE it on its own data. (Data-protagonist precept.)

3. **Fix the motion to the project's OWN canon, then over-animate it.** Re-point `.scale-on-hover` (or the demo's local override) to `--spring-snappy` + `--spring-snappy-duration` (motion-canon P1, §L2). Add the mandatory `:active` `--scale-press` squish (§L3). Arm `vSpecular` so each chip gleams pointer-following (W-LIQUIDHOVER). Add an on-mount once-through scale-pulse so the behavior SELF-DEMONSTRATES. Every chip: entrance + hover-spring + press-squish + specular-gleam — the iOS-27 bar.

4. **Leverage the dock APIs for the override comparison (the user's dock ask).** Replace the static 4-up override grid with a `<DockStack mode="facets">` rail (subtle/default/boomed/audacious chips, each carrying its `--glass-accent` context hue per BB.W-GLASS-ACCENT) that drives ONE large live swatch — selecting a facet animates `--scale-hover` and the hero swatch springs to the new lift. The comparative payload becomes a single living stage with contextual switching, not four dead cells. Add a "play all" that cycles the four lifts on the spring clock so the comparison is visible without manual hovering.

5. **Differentiate the section ladder + warm the palette + add paper.** Give each section a `text-subheading` `<h2>` heading (StorySection's `heading` prop — currently only `label` is used, so every section is a caption) so the typographic ladder has a middle rung. Recolor the four glyphs to the WARM arc of the ramp (or one `--motion-accent` event) for suffusion coherence. Layer `paper-grain-overlay` / the blueprint-grid on the cards so the BD "GLASS + PAPER both" mandate is met on this foundations surface. Tighten the blurbs (the source prose is already verbose — collapse the §3 `token surface` `<ul>` into a single mono caption strip).
