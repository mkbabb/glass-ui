# motion/handmark — FRONTEND-DESIGN deep critique (Pass-E)

**Page:** `demo/stories/motion/handmark.vue` · live `http://localhost:5173/motion/handmark`
**Lens:** world-class frontend designer applying the frontend-design skill (distinctive, production-grade, anti-generic-AI) to glass-ui's own design language.
**North star:** `DESIGN.md` (§L1 six-layer Liquid Glass composite · §L2 spring physics · §L3 tap choreography · 7 tiers · glass-cannot-sample-glass) · `docs/precepts/{design-idioms,motion-canon,affordance-map}.md` · `PROCEDURAL-SUITE.md` · the dock contextual-switch/morph APIs.

Captures: `handmark-top.png` · `handmark-mid.png` · `handmark-low.png` · `handmark-full.png`.

---

## 1. The one-sentence verdict

The HandMark *component* is exceptional — the pen wobble, the boil morphology, the multiply highlighter, the crayon/marker grain all read genuinely hand-made, which is hard and rare. But the *page wrapping it* is the single weakest design surface in the motion band: seven identical opaque cream cards stacked in a flat cream column, zero glass, zero aurora, zero animation affordance on anything but the marks themselves, and a live dock sitting dim and unused in the corner. The marks are a Stradivarius; the page is the cardboard box it shipped in. This is exactly the generic-AI-template aesthetic the frontend-design skill exists to kill: same-card-N-times, captions-as-decoration, no focal point, no kinetic life.

## 2. What is genuinely good (keep, do not regress)

- **The marks themselves are bespoke and premium.** The pen underline under "pays in", the boil wobble under "future"/"here", the yellow highlighter band *multiplying* through "really matters", the crayon (waxy red) and marker (juicy green) strokes — these are measurably distinct and read as a human hand. This is the page's whole reason to exist and it delivers. Per `CLAUDE.md` §BA.W-HANDMARK the five highlighter deltas (low-seated hull ribbon, taper, square cap, mix-blend multiply un-walled) are LIVE and visible.
- **The audacious title is correct.** "Hand Mark" at `text-display-4` (the √φ ladder) over the Fira-Code subpath chip is the right masthead register — typography-forward, per the StoryHeader/W-HIERARCHY2 cluster. The eyebrow→title→blurb reading order is right.
- **The paper-grain register is idiom-true in principle.** The manifest declares `background: "paper"` deliberately (manifest scope-1 exception: "the hand-voice demo IS a paper-grain register surface"). Paper morphism is a first-class half of the system (DESIGN.md: "GLASS + PAPER morphism both"). HandMark over paper is the *correct* material pairing — the problem is not that it's paper, it's that the paper is dead-flat and the page does nothing else.

## 3. Visual hierarchy — where the eye lands (and where it doesn't)

**The eye lands on the title, then falls into mud.** After "Hand Mark" the page is seven visually-identical rows: mono ALL-CAPS caption → grey blurb → big cream card with a black phrase. There is no second focal point, no climax, no rhythm change across 3157px of scroll. Every section has the *same weight*, so the eye has nowhere to go and nothing pulls it down the page. The highlighter section (the most visually arresting mark — a saturated yellow band) is buried as section 3 of 7 at the same scale as everything else; it should be a hero moment.

**The √φ ladder is used once and then abandoned.** The title is `text-display-4`; every mark phrase is `text-display-3`; every caption is `--type-caption`; every blurb is `text-small`. Three rungs, flatly applied. DESIGN.md's whole typographic thesis ("kinetically typographic", the audacious sqrt-φ ladder) wants *dynamic range* — a `text-display-audacious` or `-mega` focal word somewhere, a deliberate drop to caption, contrast between specimen and chrome. The page treats the ladder as a lookup table, not a composition tool. `typography.vue` (per `CLAUDE.md` §BB.W-DEMO-DESIGN) is the model: "a focal `text-display-audacious` word… over the calm wash" — handmark should steal that move.

**Captions are doing a heading's job.** Every section leads with a mono ALL-CAPS `.section-label` eyebrow ("PEN UNDERLINE · THE MASTHEAD DEFAULT") and only the first section also has a real `<h2>` ("The hand voice"). The other six have *no* heading — just an eyebrow caption acting as the title. That inverts the W-HIERARCHY rung order (eyebrow is *supporting*, above a heading, not the heading itself). The eye reads seven faint grey all-caps labels as noise, not structure.

## 4. Affordance — interactive cues

**Almost nothing signals it is interactive, because almost nothing is.** The page has exactly one interactive control in its body: the "Replay draw" outline Button in the draw-on section. That button is correctly a glass-ui `<Button variant="outline">` (good — Component-over-CSS-class, the four-state contract per DESIGN.md philosophy). But:

- **The draw-on demo is the page's best teaching moment and it's nearly invisible.** "draw-on reveals the mark once on appear" — but it fires on `appear="manual"`, so on load the line is *already drawn* (or never draws) and the only way to see the signature animation is to find and click a small grey outline button below the phrase. The marquee animation of the whole component is gated behind a button that doesn't look like the star. The affordance is backwards: the *mark* should invite replay (hover-to-redraw, or auto-loop on a gentle clock), not a detached secondary button.
- **The dock is RIGHT THERE and does nothing.** A live `.glass-dock` (13 controls, `blur(9px)`, translucent — confirmed in DOM) floats top-left, dim and decorative. The user's explicit ask is "leverage the dock APIs (contextual switching/animating)… each page deftly uses a series of glass-ui components (docks/…)". This page ships a dock and ignores it. The brush-continuum section (pen/boil/pencil/crayon/marker) is *begging* to be a dock layer-switcher or a `<DockStack mode="facets">` carousel where each facet is a brush, each carrying its own `--glass-accent` hue (crayon→warm-red, marker→green) — the contextual-switch API exists and is unused.
- **No hover state on the specimens.** The marks are static SVG overlays. Hovering a card does nothing. Hovering a mark does nothing. There is zero "this is alive, touch it" cue anywhere except the lone button.

## 5. Animation affordance — is every element ALIVE at the iOS-27 bar?

**No. This is the page's biggest failure against the binding brief ("HIGH animation affordance for EVERY component").**

- **Entrance:** the page rides `.scroll-cascade` (StoryPage), so sections do fade-rise on scroll — that's the one thing alive. Good but invisible-by-default (it's a quiet 6px-ish build).
- **Hover:** nothing. No card lift, no specular gleam, no mark redraw. DESIGN.md §L3 tap-choreography and the §BB.W-LIQUIDHOVER tier-root specular auto-arm exist and reach *zero* surfaces here.
- **Press:** only the one button squishes (and only because `<Button>` bundles it). No card is `:pressable`.
- **State:** the highlighter, the ring, the colored mark — all static one-shot. The boil brush is a *living-line* engine (`CLAUDE.md`: "boil living line") and the page renders it frozen. The component can *breathe* and the demo shows a corpse.
- **The marks don't loop or invite re-trigger.** iOS-27 ambient life means a procedural mark should subtly boil/re-ink on a calm clock (PRM-gated per motion-canon P6). Here every mark draws once at mount (or not at all) and sits dead.

Against motion-canon: P3 (fade coupled to transform) and P4 (per-spring duration clock) are satisfied *by the chassis cascade* but never *consumed by the content*. The page inherits motion; it authors none.

## 6. Polish + distinctiveness — bespoke or generic-AI-template?

**Generic-AI-template, structurally.** The tell is the seven-identical-cards pattern: same `paper-grain-overlay rounded-card border bg-card p-8` wrapper, repeated verbatim, with content swapped. A world-class designer never ships seven identical containers — they vary scale, treatment, and emphasis to build a narrative. Here every section is a peer; the page is a spec-sheet, not a designed artifact. `CLAUDE.md` §BB.W-DEMO-DESIGN says this explicitly for the core panes ("DESIGNED specimens, not flat spec-sheets") — handmark is precisely the flat spec-sheet that doctrine condemns.

**The opaque cream card is the wrong material.** Card bg measured `rgb(251,248,244)` — a fully opaque cream slab. Over the page's *also*-cream paper wash, the cards barely separate from the background (the border hairline is the only edge). This is the BG-2 black-plate defect's cousin: an opaque plate where a glass/veil register would sing. Per DESIGN.md §L1, a glass surface needs the six-layer composite; these cards have one layer (a tint) and read iOS-7-flat. The page demos a *paper* component, so the specimen card can stay paper — but the *chrome* around it (the section frame, the brush gallery) wants glass over something colorful.

## 7. North-star fidelity — iOS-27 / paper / glass

- **Glass:** absent from the content. The only glass on screen is the dim unused dock. DESIGN.md's six-layer composite, the 7 tiers, the spring-physics surface life — none reach this page. The user's "glass demos over COLORFUL aurora backgrounds" is *directly contradicted*: there is no aurora and no glass demo.
- **Paper:** present but inert. Paper morphism is legitimate here (the mark *is* a paper mark), but a living paper surface still has grain depth, edge catch, and a warm-chroma floor (`CLAUDE.md` §BA.W-NO-GRAY — warm material, not gray). The current paper reads flat and slightly washed-out, not the rich warm-cream identity.
- **Spring physics:** the marks themselves use the seeded pencil-boil engine, not the spring vocabulary — that's correct (a wobble is geometry, not a spring). But the *page* surfaces (cards, dock, gallery) should ride `--spring-snappy`/`--spring-smooth` on hover/press and don't.

## 8. Spacing / rhythm — golden ratio

The section gap is the tokenized `--story-page-section-gap` (correct, uniform per BC.W-STORYBOOK-META). Card padding is `p-8` flat — *not* the φ-derived `--card-pad-block`/`--card-pad-inline` ladder (`CLAUDE.md` §BB.W-CARD-PAD: sqrt-φ block over inline anchor). So the cards' internal rhythm is a flat 1:1 box, missing the golden top-lift that clears headings off the edge. The marks sit dead-center in a uniform box; a φ-tuned card would give the specimen breathing room above. The overall vertical rhythm is *even* but *monotonous* — even spacing with no scale variation reads as a list, not a composition.

## 9. Color — suffusion proportion

**Under-suffused to the point of greyscale.** The page is black ink on cream, full stop. The only color events are *inside the marks* (the yellow highlighter, red crayon, green marker, and the `--motion-accent` purple in the last section). That's actually close to correct per the one-color-event rule (`CLAUDE.md` §AZ.W-SUFFUSE: one deliberate color event per surface, body ink stays untinted) — BUT the page has *thrown away* the motion band's identity. The motion family's signature is the `--motion-accent` violet (`--viz-legendre`, confirmed `oklch(0.739 0.134 318.1)`); it appears once, in the *last* section, on one tiny mark. The masthead, the eyebrows, the chrome — all greyscale. A motion-band page should carry the violet as its one coherent thread (per `CLAUDE.md` §BB.W-SUFFUSE3: "the motion page TITLES lift… with the --motion-accent violet as the ONE color text-event on a page-local masthead"). Handmark's masthead is ink, not violet — it doesn't even claim its own band identity.

## 10. Import-path label inconsistency (the user's explicit ask)

The page chip reads `@mkbabb/glass-ui/handmark` (correct public subpath, from the manifest `subpath` field). But the SFC source imports from deep relative paths:
```
import { Button } from "../../../src/components/ui/button";
import { HandMark } from "../../../src/components/custom/handmark";
```
The *displayed* convention (public subpath) and the *authored* convention (relative `src/`) diverge. Per the user's "standardize the import-path label": the demo SFCs should import via the published subpath alias (`@mkbabb/glass-ui/handmark`, `@mkbabb/glass-ui/button`) so what the page advertises is what the code does — the chip becomes a true, copy-pasteable label rather than a decoration sitting over a relative import.

## 11. Superfluous language (the user's explicit ask)

The blurbs over-explain in implementation-spec voice, not designer voice:
- "the word stays real selectable text, the mark is an aria-hidden SVG overlay. The PEN default is grain:0 — a clean wobbled path, no filter." → that's commit-message prose, not a demo caption.
- "off the house prng leaf. Two seeds read distinct; one seed reproduces." → internal mechanism, not user-facing.
- "a low-seated hull ribbon, tapered ends, a square cap, multiplying against the page text behind it (not isolated off the page)." → five clauses where one would do.

Tighten to the *feeling*, per MEMORY feedback_writing_style (no grandiloquence, no over-punctuation): "The pen lays a clean wobbled line under any word." / "Each brush is a point in one parameter space — pen, pencil, crayon, marker, all measurably distinct."

---

## TOP design moves to make this page exceptional

Ranked by impact. Each cites the precept it satisfies.

1. **Each sub-section in its OWN glassy card over a COLORFUL aurora (the user's headline ask).** Drop the seven opaque cream slabs. Frame the whole page over a contained, offscreen-paused `<Aurora>` in the motion-violet palette (the `--motion-accent`/`--viz-legendre` register), and host each specimen in a `<ShowcaseFrame>` glass card (`surface="glass"`/veil) so the glass reads as *liquid* over a live colorful field — DESIGN.md §L1 six-layer composite finally on screen, the BG-2 black-plate kill (`CLAUDE.md` §BB.W-DEMO-DESIGN `tier="field"`). Keep the *specimen* card paper (the mark needs paper), but float that paper card *inside* a glass frame over aurora: paper-over-glass-over-aurora, the GLASS+PAPER duality DESIGN.md demands, in one composition. One GL context per route (the budget holds).

2. **Bigger main card area, more screen space.** The cards are currently lost in a 1152px column with huge dead margins. Widen the specimen stage, give the hero mark (the highlighter or the masthead pen line) a `text-display-mega`/`-audacious` focal treatment in a dominant card, and demote the reference brushes to a tighter gallery. Build *dynamic range* in the √φ ladder (DESIGN.md kinetic typography; `typography.vue`'s focal-word model).

3. **Make the brush continuum a DOCK contextual-switcher.** This is the user's "leverage the dock APIs" ask, perfectly sited. Turn pen/boil/pencil/crayon/marker into a `<DockStack mode="facets">` (BE.W-DOCK-RAIL-REALIZE) or a `<DockLayerGroup>` — each brush a facet chip carrying its own `--glass-accent` hue (crayon→warm-red, marker→green, the per-instance chromatic-rim axis BB.W-GLASS-ACCENT), clicking morphs the live specimen between brushes on the `--spring-dock` clock. The page goes from a static list to an interactive instrument. The dock stops being dead chrome and becomes the page's spine — "each page deftly uses a series of glass-ui components (docks/…)".

4. **Animate EVERY element to the iOS-27 bar.** Marks auto-draw on scroll-into-view (the `.scroll-cascade` already fires — couple the mark's `draw-on` to it so each specimen *signs itself* as it enters). Hover a card → specular gleam + the boil mark re-inks on a calm PRM-gated loop (the living-line engine, finally living). Hover a brush facet → preview-redraw. Press → squish (§L3). Replace the detached "Replay draw" button with hover-to-redraw on the mark itself (affordance on the star, not a satellite). This satisfies the binding "HIGH animation affordance for EVERY component".

5. **Claim the motion-band violet identity + standardize import label + tighten copy.** Lift the masthead "Hand Mark" into the `--motion-accent` violet (BB.W-SUFFUSE3 masthead-violet), keeping body ink untinted (one-color-event rule). Re-point the SFC imports to the public `@mkbabb/glass-ui/*` subpaths so the displayed chip is the real import. Cut every blurb to one feeling-first sentence (feedback_writing_style). Use real `<StorySection heading=…>` `<h2>`s instead of eyebrow-as-title, restoring the W-HIERARCHY rung order so the eye reads structure, not grey noise.
