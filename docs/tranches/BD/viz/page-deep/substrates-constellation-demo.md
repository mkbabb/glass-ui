# Pass-E META-STORYBOOK deep audit — `substrates/constellation`

- **Page**: `substrates/constellation`
- **Import label**: `@mkbabb/glass-ui/constellation`
- **SFC**: `demo/stories/substrates/constellation.vue` (760 lines)
- **Live**: `http://localhost:5173/substrates/constellation` (spot-checked on real Chrome via DevTools MCP, both fresh-nav + 2s settle)
- **Manifest row**: `manifest.ts:222` (subpath) · `manifest.ts:574-579` (story, `background: "constellation"`, hero)
- **DESIGN north-star**: DESIGN.md (iOS-26/27 Liquid Glass 6-layer composite, 7 tiers, spring physics) · PROCEDURAL-SUITE.md (constellation = Canvas2D drifting proximity-graph; "ONE GL context per route" budget) · design-idioms/motion-canon/affordance-map.

---

## VERDICT SUMMARY (severity-ordered)

| # | Severity | Finding |
|---|---|---|
| B1 | **BLOCKER** | The whole constellation substrate is DEAD on this route — `field.nodes:0, w:0, h:0`, every canvas backing-store stuck at 300×150, 0 painted pixels. Page = empty cream boxes. |
| B2 | **BLOCKER** | Hero `<h1>` overflows + clips ("Constellati…", scrollW 1536 > clientW 1066) AND the sticky giant title overlaps demo content during scroll. |
| S1 | major | Glass suffusion FAILS — 8 demo sections each on an opaque `bg-card` (`rgb(251,248,244)`) plate; none float glass over the live field. |
| S2 | major | 10 Canvas2D contexts on ONE route (1 bg + 9 demos) — blows the PROCEDURAL-SUITE "one GL context per route" budget by 10×. |
| S3 | major | No glass-ui component COMPOSITION — zero dock/tabs/cards/buttons; flat `<Switch>` + 8 raw `<div bg-card>` boxes + canvas. Thin/flat for a "deftly composes a series" bar. |
| C1 | minor | Sub-sections are NOT in their own glassy cards (they are opaque `bg-card` `<div>`s, not `<Card tier>`); main canvas area is 420px tall but boxed, not "bigger". |
| C2 | minor | Path label IS standardized (good — `@mkbabb/glass-ui/constellation` chip renders). |
| L1 | minor | Blurbs are bloated with internal/π/tranche jargon ("the π refit-live spec", "AY.W-CON1", "slides aliases it to --ncsu-red"). |

---

## (1) DEMO CONGRUENCE — does the demo show the component at its BEST + full API?

**API coverage is genuinely thorough** (this is the page's strength on paper): 8 sections exercise `drawOverlay`, `warpOnClick`, `wander`, `gravityWell`, `opacityCeiling` (recession A/B), `pinned`+`accentEdges`+`pinnedDrift`+`warpSettled`, the public `field` seam (supernova), and `:freeze` deterministic capture. That is the FULL surface.

**But the demo does not show the component AT ITS BEST — it shows NOTHING:**

- **B1 (BLOCKER) — the substrate is dead.** Live readback (`constellation.vue:298` exposes `__constellationWarp.field`):
  - `window.__constellationWarp.field` → `{ nodes: 0, w: 0, h: 0 }` after fresh nav + 2s.
  - Every demo canvas backing store: `300×150` (the unsized Canvas2D default) while CSS box is 1064×420.
  - Painted-pixel scan (`getImageData`): **0 non-blank pixels** on the warp host AND on the StoryHero full-bleed bg-field canvas.
  - Visual: the warp demo card renders as a **blank cream box** (screenshot 2); no nodes, no edges, no focal pulse.
  - No JS error in console (only a benign `<Transition>` non-element-root warn + my own `getImageData` perf warn) — so it is a silent seed/resize failure, not a throw. The field's `w/h` never leave 0 → `seed` produces 0 nodes → nothing to draw. The `useCanvas2D` ResizeObserver path is not delivering a real extent to these instances on this route.

  Net: **a viz-demo page where the viz never paints.** Every "click to warp / hold to pull / double-tap to detonate" affordance is inert because there is no field. This is the cardinal Pass-E defect (demo ≠ component at its best; it is a dead demo).

- The `interactive` toggle (`:23`) drives `pointerReactive` — untestable while the field is dead.

## (2) COMPONENT ABILITY — deftly composes a SERIES of glass-ui components?

**No.** The page composes exactly TWO library primitives at the chrome level — `<Switch>` + `<Label>` (`constellation.vue:14-15`) — and then 8 raw `<div class="relative h-[420px] bg-card">` boxes each wrapping one `<Constellation>`. There are:
- **No `<Card>`** (the sections are bare `<div bg-card>`, NOT `<Card tier="…">` — they get no glass tier, rim, catch-light, or shadow composite).
- **No `<SegmentedTabs>`** — the 8 sections are a long vertical scroll; the obvious "deft" move is to fold the 8 API facets into a `<SegmentedTabs>` (variant switcher) or a `<DockLayerGroup>` contextual-switch so the BIG canvas stays put and the controls swap (the user's "leverage the dock APIs / contextual switching" bar).
- **No `<Button>`** — "click to warp", "double-tap", "hold to pull" are bare canvas gestures with a `bg-card/80` `<span>` hint; no glass button affordance, no configurator.
- **No dock** page-composed (the bottom dock is the demo-shell nav chassis, not this page's composition).

The user's explicit bar — *"each page deftly uses a series of glass-ui components (docks/procedural-anims/cards/tabs/buttons)"* — is unmet. The page is `Switch` + `Constellation` only. Flat.

## (3) GLASS SUFFUSION — glass over a LIVE colorful field?

**No (and doubly broken).**

- **S1** — the page IS a full-bleed-`background:"constellation"` hero (`StoryHero.vue:222`, `fullBleed=true`, content on `.story-hero-bleed-content`), so the *intent* is right: a live field behind the page. **But** (a) the field is dead (B1) so there is no colorful drift, and (b) each of the 8 demo sections re-mounts its OWN opaque `bg-card` plate (`rgb(251,248,244)`, confirmed via `getComputedStyle` on all 8 `data-testid` hosts) that **occludes** the page field behind it. So even with a live field, the glass never reads against it — each demo is a same-tone cream slab on cream. There is zero glass morphism on this page.
- **The constellation field is itself NOT "colorful aurora"** — it is a neutral warm-cream node/edge lattice. The user's "glass demos over COLORFUL aurora backgrounds" bar wants the viz suffused over a chromatic field; here the substrate is monochrome cream-on-cream (low contrast even when it paints — the `--constellation-*` tokens are warm-neutral). Consider staging the demos over a real `<Aurora>` field (the `DockStage` pattern) so the glass + the lattice both read.
- **PAPER morphism**: absent. No paper-grain / blueprint-grid register used, though the page is in a band where paper could apt a "lattice = drafting" read.

## (4) STRUCTURE — own glassy card per sub-section? main area BIG enough?

- **C1** — sub-sections are NOT in their own GLASSY cards. They are `<ShowcaseFrame pad="none">` wrapping a raw `<div class="rounded-card bg-card">` (`constellation.vue:481, 508, 550, 573, 600, 645, 698, 725`). `ShowcaseFrame` here resolves to `tier="resting"` → `bg-card border-border shadow-cartoon` (opaque). To honor the user bar ("each sub-section in its OWN glassy card") these should be `<Card tier="quiet"|"wash">` (or `<ShowcaseFrame tier="field">`) so each section is a translucent glass plate the field reads through — the exact `tier="field"` BG-2 fix ShowcaseFrame already ships (`ShowcaseFrame.vue:88`) but this page never uses.
- **Main card area BIGGER**: each canvas host is `h-[420px]` (recession pair `h-[300px]`). For a viz whose whole point is the drift field, 420px boxed is modest. The user wants "the main card area BIGGER (more screen space)" — a hero viz route should give the primary lattice a much taller / near-viewport stage (the `DockStage` full-column pattern), with the API facets as a contextual switch over ONE big canvas rather than 8 small repeated 420px boxes.
- The 8-box vertical repeat is also wasteful: 8 separate 420px lattices stacked is a 5795px-tall page (measured) of mostly-identical empty boxes.

## (5) PATH-LABEL standardization

- **PASS.** `manifest.ts:222` maps `substrates/constellation → "@mkbabb/glass-ui/constellation"`, and the StoryHeader renders the Fira-Code subpath chip `@mkbabb/glass-ui/constellation` (confirmed live, screenshot 1). Matches the required label exactly. No action.

## (6) LANGUAGE — superfluous prose to tighten?

The blurbs leak internal/tranche/π vocabulary that a consumer-facing demo should never show:
- `:469` "(NOT the slides red anomaly)" — internal cross-repo reference.
- `:503` "slides aliases it to `--ncsu-red`" — foreign-repo trivia.
- `:540` "the π refit-live spec target THIS host deterministically … AY.W-DOCK-CHROME §4" — gate/π jargon in a comment, but the comment density bleeds into the tone.
- `:596` "the ONE recession contract the four live substrates share" — fine, but verbose.
- `:720` "The π freeze-live spec mounts this twice and asserts the node-position + overlay-phase hashes are BYTE-IDENTICAL" — π-test internals surfaced to the user.
- General: blurbs run 3-5 sentences with parentheticals-in-parentheticals. Tighten to ONE crisp sentence of consumer value + ONE of mechanism. Strip every `π`, `AY.W-CON*`, `slides`, `--ncsu-red`, "spec" reference.

## (7) BUGS

- **B1 (BLOCKER)** — dead substrate (see §1). Field `w/h/nodes = 0`, 0 painted pixels, all canvases 300×150. The page does not render its viz.
- **B2 (BLOCKER)** — hero title overflow + sticky overlap:
  - `<h1>` "Constellation" at `font-size 244.8px` (`text-display-4`) has `scrollWidth 1536 > clientWidth 1066` → the word is **clipped** to "Constellati…" (screenshot 1). The audacious √φ ladder rung is too large for the viewport width here — needs a clamp / smaller `heroScale` for long single-word titles, or `overflow-wrap`/`hyphens`.
  - During scroll the sticky `.story-hero-shrink` title (top:0) renders OVER the warp demo card + its blurb (screenshot 2 — "Constellation" painted across the demo body text). The sticky large-title collapse is not shrinking fast enough / the z-order lets the giant glyph sit atop scrolled content. iOS-27 large-title collapse should shrink to a slim bar before content reaches it.
- Minor: 10 Canvas2D rAF loops (S2) — even when fixed, this is a perf liability (the budget is ONE). Fold to one staged canvas + contextual switch.

---

## RECOMMENDED REDESIGN (gestalt, not patch)

1. **Fix B1 first** — the substrate seed/resize is broken on this route; without paint nothing else matters. (Likely the `useCanvas2D` ResizeObserver not delivering extent to flex-child hosts — note the demo's own `resizeTo` hack at `:323` force-sets `width/height !important + flex:none`, hinting the flex-parent stretch already fought the substrate sizing.)
2. **Fix B2** — clamp the hero title for long words; make the sticky collapse shrink before content overlap.
3. **ONE big staged canvas + contextual switch.** Replace the 8 stacked 420px boxes with ONE near-viewport `<Constellation>` over a live `<Aurora>` field (DockStage pattern), and a `<SegmentedTabs>` or `<DockLayerGroup>` that swaps the active facet (warp / wander / gravity-well / pinned / supernova / freeze / recession) over the SAME canvas — leveraging the dock contextual-switch API the user named.
4. **Each facet's controls in its OWN glassy card** — `<Card tier="quiet">` floating over the field, NOT `bg-card` slabs.
5. **Suffuse glass over a colorful field** — stage over `<Aurora>` (chromatic), so the glass cards + the lattice both read the morphism.
6. **Tighten every blurb** to consumer-facing one-liners; strip π/tranche/slides jargon.
