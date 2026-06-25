# Pass-E — META-STORYBOOK DEMO audit: `motion/handmark`

- **Component**: `HandMark` / `InkMark` (the hand-voice mark family)
- **Import**: `@mkbabb/glass-ui/handmark`
- **SFC**: `demo/stories/motion/handmark.vue` (132 lines, 7 `<StorySection>` blocks)
- **Live**: http://localhost:5173/motion/handmark (verified on Chrome, :5173)
- **Manifest row**: `manifest.ts:1103-1116` — `background: "paper"` (per-route exception off the motion-band `constellation` default; manifest.ts:178/191)

Live spot-check facts (getComputedStyle / DOM census on the running page):
- `canvas` count: **0**. `[class*="aurora"]` count: **0**. → NO live field anywhere on the page.
- 8 `.paper-grain-overlay` hosts: 1 is the StoryHero bleed-bg, 7 are demo plates `rounded-card border bg-card p-8` → opaque cream `rgb(251,248,244)`, `backdrop-filter: none`.
- Only glass on the page is the CHROME dock (`.demo-sidebar-dock`), not part of the demo composition.
- `<h2>` section headings: **1** (only the first section); the other 6 carry a mono-caption eyebrow only.
- Highlighter `mix-blend-mode: multiply` live (3 els) — reads against the page text. ✓
- Subpath chip text resolves to `@mkbabb/glass-ui/handmark`. ✓ (standardized)
- All 7 demos render; no dead demo, no broken animation (draw-on Replay button present + functional; brush voices distinct; ring circles the datum).

---

## (1) DEMO CONGRUENCE — does it show the component at its BEST + full API?

**Partial.** The API coverage is genuinely good — this page is the consolidated home for the family and exercises a wide surface: `shape` (underline default, `highlight`, `circle`), `brush` (pen/boil/pencil/crayon/marker/ring/highlighter), `animation="draw-on"` + `appear="manual"` + imperative `play()`, `seed` (two seeds read distinct; one reproduces), `color` (currentColor default + explicit `var(--motion-accent)`), `box` positioning. That is most of the documented prop space.

What is NOT shown at its BEST:
- **No animation affordance on 6 of 7 sections.** Only the draw-on section animates; the masthead/boil/highlighter/brush/ring/color marks render STATIC. The DESIGN bar is "HIGH animation affordance for EVERY component." Boil's whole point is the *living line* (the `boil` brush is documented as a living-line morphology) yet it sits frozen. There is no `draw-on` on the masthead, no boil-animation toggle, no replay on the highlighter. The page reads as a static catalogue, not a hand-voice in motion.
- **The marks are small relative to the canvas.** Each demo is a single `text-display-3` line on a large `p-8` plate; the marks are demonstrated once and the rest of the plate is dead space. The highlighter band reads a touch narrow/short over its word (handmark-mid.png) and the ring sits high over "ringed" (handmark-bottom.png) — minor fidelity nits, functional.
- **The strikethrough / box / bracket / arbitrary-path shapes** (named in the CLAUDE.md HandMark contract: "underline · strikethrough · highlight band · circle · box · bracket · arbitrary path") are NOT demoed. `shape="circle"` and `highlight` are shown; strikethrough/box/bracket are absent.

## (2) COMPONENT ABILITY — deft SERIES of glass-ui components, or thin/flat?

**Thin/flat.** The page composes exactly TWO library components: `<HandMark>` (the subject) and ONE `<Button variant="outline">` (the Replay control). Everything else is `<StoryPage>` / `<StorySection>` chassis + raw `<div class="paper-grain-overlay rounded-card border bg-card p-8">` recipe triplets (handmark.vue:28,40,53,69,88,102,122).

- **Zero dock APIs.** The user mandate explicitly asks pages to "leverage the dock APIs (contextual switching/animating)." This is a motion-band page with seven distinct registers (pen/boil/highlighter/draw-on/brush-continuum/ring/color) — a NATURAL fit for a `<DockLayerGroup>` / `<DockStack mode="facets">` contextual switcher that swaps the focal mark register while one big stage animates. None used.
- **Zero tabs.** The brush-continuum section (pen/boil/pencil/crayon/marker) is a literal tab/toggle-group case — a `<SegmentedTabs>` or `<ToggleGroup>` swapping the brush on ONE animated word would be the deft composition. Instead it is 5 stacked static `<p>` rows.
- **No procedural anim, no cards (library `<Card>`), no real glass surfaces.** The raw `bg-card` div triplets are exactly the recipe ShowcaseFrame/Card were built to retire.

## (3) GLASS SUFFUSION — glass over a LIVE colorful field?

**Absent — the headline defect.** 0 canvases, 0 aurora. The page is flat opaque cream on cream. The `background: "paper"` manifest choice (a static wash) is defended in the manifest comment as "idiom-true" because HandMark is a paper-grain register — and PAPER morphism IS apt here (the `paper-grain-overlay` is the right substrate for a hand-mark). BUT:
- The user bar is "glass demos over COLORFUL aurora backgrounds" AND "GLASS + PAPER morphism both." This page delivers neither glass NOR color — it is paper-on-paper with no glass tier and no live field. Even granting paper as the hand-mark substrate, the demo plates are flat opaque `bg-card`, not `glass-wash`/`glass-quiet` tiers letting any field read through. There is no morphism reading at all.
- The DockStage pattern (`demo/stories/dock/DockStage.vue`) — ONE shared offscreen-paused aurora behind a column of demos — is the established idiom for exactly this and is NOT used. A colorful aurora behind the cards, with the hand-marks reading as ink ON glass ON the live field, would make the glass+paper composite the page is supposed to teach.

## (4) STRUCTURE — own glassy card per sub-section? main area BIG enough?

**Fails the user bar.** Each sub-section is NOT in its own *glassy* card — it sits in the ONE outer `.story-hero > .rounded-card` plate (the StoryHero card), and inside it each demo is an opaque `bg-card` inner box (`sectionAncestry`: `section.story-sections` → `rounded-card` → `story-hero`). So:
- The sub-sections are nested boxes inside one big plate, not discrete glassy cards. The eyebrow caption + blurb sit OUTSIDE the inner plate (on the cream), the mark sits INSIDE it — the "each sub-section in its own glassy card" mandate (label+blurb+demo as ONE coherent glass card) is unmet.
- Main card area: the outer plate is wide (`--story-page-max-inline`) but the per-demo focal area is a single short text line on a tall `p-8` plate — generous *whitespace*, not generous *demo*. The user asks the main card area BIGGER (more screen space for the demonstration). Here the screen is spent on padding, not on a large animated stage.

## (5) PATH-LABEL standardization

**Pass.** The chrome subpath chip resolves `@mkbabb/glass-ui/handmark` (manifest.ts:318, verified live). The in-SFC imports use the relative dev paths (`../../../src/components/custom/handmark`, handmark.vue:11) which is the storybook norm — not a label the user sees. No raw/inconsistent label.

## (6) LANGUAGE — superfluous prose to tighten?

Several blurbs over-explain with internal-jargon and parenthetical asides that read as commit-message residue, not demo copy:
- handmark.vue:26 — "The PEN default is grain:0 — a clean wobbled path, no filter." (implementation detail; the user does not need `grain:0`.)
- handmark.vue:38 — "off the house prng leaf" (internal architecture leak).
- handmark.vue:51 — "a low-seated hull ribbon, tapered ends, a square cap, multiplying against the page text behind it (not isolated off the page)" — the `(not isolated off the page)` is a fix-note, not demo prose.
- handmark.vue:67 — "(never dashoffset under a filter)" — internal constraint, drop.
- handmark.vue:86 — "not a class in a taxonomy" / "never everything-renders-pen" — defensive phrasing.
- handmark.vue:120 — "(--viz-legendre violet twin; demo-local, never a lib token)" — token-provenance aside.

Tighten each blurb to one plain sentence describing what the viewer SEES, not how it is built.

## (7) BUGS

No hard bugs. The page is live, all 7 demos render, the draw-on Replay fires, brush voices are distinct, the highlighter multiplies, the ring circles its datum. Minor fidelity nits (highlighter band slightly short; ring sits high over the word) — cosmetic, not broken. The inconsistent section register (1 `<h2>` heading on section 1, 6 eyebrow-only sections) is a hierarchy inconsistency, not a bug.

---

## Recommended gestalt rebuild (architectural, not patch)

1. Put the page over a LIVE colorful aurora via the `DockStage` idiom (one shared offscreen-paused aurora), with each demo as a real `glass-quiet`/`glass-wash` card so the glass+paper composite reads — paper-grain mark ON glass ON the live field.
2. Each sub-section → its OWN glass card (label + blurb + a BIG animated stage as one unit).
3. Compose the dock APIs: a `<DockStack mode="facets">` or `<DockLayerGroup>` contextual switcher that swaps the focal register (pen/boil/highlighter/draw-on/ring) while ONE large stage animates the mark — delivering the contextual-switching/animation mandate.
4. The brush continuum → `<SegmentedTabs>`/`<ToggleGroup>` swapping the brush on ONE large animated word (replace the 5 static rows).
5. Add animation affordance to every section (draw-on/boil-living-line/replay), and demo the missing `strikethrough`/`box`/`bracket` shapes.
6. Tighten every blurb to one viewer-facing sentence.
