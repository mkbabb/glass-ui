# dock/layers — FRONTEND-DESIGN critique (Pass-E, design lens)

**Page**: `demo/stories/dock/layers.vue` · live `http://localhost:5173/dock/layers`
**Lens**: the frontend-design skill bar (distinctive · production-grade · AVOID generic-AI) applied to glass-ui's own language (DESIGN.md §L1–§L5, motion-canon P1–P7, affordance-map).
**Captured**: 1440×806 light + dark, full-page, computed-style probes (`_cap/dock-layers-{light,dark}.png`).

This page is the storybook's **clearest exposition of the dock's headline capability** — contextual layer switching (drill-in, switcher rail, pull-to-switch, collapse-while-switching, vertical overflow). The MECHANISM it teaches is the single most distinctive thing the library owns. And yet it reads as a **spec-sheet of five near-identical centered pills on one flat peach wash, narrated in changelog voice**. The substrate is correct; the *staging, hierarchy, animation life, and the very APIs it demonstrates* are under-spent. The irony: the page about contextual *animation* is itself almost entirely *static at rest*.

---

## 1. The verdict up front

The page demonstrates `DockLayerGroup`'s modes (drill-in, rail, pull-to-switch, collapse-morph, vertical overflow) honestly and correctly. But it stages them as **five sibling pills in a vertical list over a monochrome field**, and the frontend-design failures are systemic:

- **The aurora is monochrome.** A single warm-peach wash (`DEFAULT_AURORA_CONFIG`, `opacityCeiling 0.42`) in light; a muddy-brown-over-near-black gradient in dark (`_cap/dock-layers-dark.png`). The brief's "glass demos over COLORFUL aurora backgrounds" is the whole point of glass and it is unmet — glass over a one-hue field reads as a tinted pill, not a lensing layer (§L1: "surfaces are lensing layers, not blur swatches"; the lens has nothing to refract).
- **No card-per-section.** All five demos sit in a *transparent* `.dock-stage-tile` (a `1px oklab(… / 0.3)` hairline frame, `bg: transparent`); the sixth section ("Mechanics") sits in NO host at all (bare prose `<ol>`). Zero real glassy cards on the page (`glassCards = 1`, and that one is the dock itself). The user's "each sub-section in its OWN glassy card" is unmet.
- **The main area is NOT bigger.** The article column measures 1357px but the StoryPage prose/section width is capped well inside it; the demos centre in a column that leaves the dock pills floating small in a wide tile. The user asked for MORE room and a BIGGER main card; the page gives a thin centered stack.
- **The richest API it teaches is presented at its dullest.** Every demo is the SAME size, the SAME centered placement, the SAME muted-grey caption. The drill-in (the signature contextual *narrative* — root → pane → back) is the same scale as the vertical-overflow utility case. There is no protagonist, no "switch contexts and watch it morph" hero moment staged large.
- **Animation affordance is mechanism-only, and the page is dead at rest.** The docks morph WHEN you act on them — but nothing arrives, nothing breathes, and the *primary interactive cue* (the drill-in entry buttons) is a **raw `<button>` with `transition-colors hover:bg-muted`** — a generic grey color-fade, NOT the dock affordance floor (no hover-lift, no gleam-track, no press-squish, no spring). The page demonstrating the dock's liquid contextual motion opens with the least-liquid control in the library.

---

## 2. VISUAL HIERARCHY — correct chrome, flat body

**What works.** The `Dock Layers` H1 resolves to **86px Plus Jakarta Sans** (`--type-display-4`) — the audacious √φ ladder IS used for the hero and it lands. The eyebrow (`DOCK · LAYERS`) + the Fira-Code subpath chip (`@mkbabb/glass-ui/dock`) is the correct three-rung StoryHeader cluster (W-HIERARCHY2). Section `<h2>`s resolve to a consistent 20.4px `text-subheading`. The typographic *scaffolding* is correct and standardized.

**What fails.** After the title, **every section is the same weight** — six 20.4px headings, five centered pills, six muted-grey paragraphs. There is no focal demo, no protagonist (motion-canon P7's "everything is the same liquid" assumes a *composition*, not a uniform list). The drill-in — the page's most narratively-rich move (it tells a *story*: you are in Root, you choose Assets, you go in, you come back) — should be the HERO, staged 2× scale and central, with the rail/overflow/collapse cases as a tighter supporting grid.

**The typography ladder dies at the H1.** DESIGN.md's "kinetically typographic / TYPOGRAPHY-forward" identity never enters the body — the interior is 100% body-and-caption. A `text-display-mega` poster numeral or a single audacious word ("LAYERS", or the active-layer name itself rendered huge as the drill-in protagonist's anchor) would give the eye the focal mark the flat field denies it. The library ships `--type-display-mega` (177px) for exactly this; the page never reaches for it.

**Move**: stage the drill-in demo as the protagonist at hero scale, anchored by a poster-rung typographic mark that *reflects the active layer* (the live `activeLayer` value rendered at `--type-display-mega` behind/beside the dock — the contextual state made TYPOGRAPHIC, the library's identity made load-bearing on the page that teaches context).

---

## 3. STAGING / GLASS FIDELITY — the lens has nothing to refract

This is the **single highest-leverage failure**, shared with `dock/overview`. DESIGN.md §L1: glass *bends and concentrates light*; the six-layer composite (backdrop blur+saturate · tint · rim · catch-light · shadow · grain) only reads as iOS-26-liquid **over content worth refracting**. §L5's worst-case-contrast rule assumes a *kinetic, varied* backdrop.

The DockStage field is a **single flat warm hue** (the calm `DEFAULT_AURORA_CONFIG`). Over it:

- The dock glass (`bg color(srgb 0.86 0.85 0.84 / 0.328)`, `backdrop blur(9px)`) reads as a translucent peach pill. The backdrop-blur has nothing structured to blur; the `saturate()` channel has no chroma to concentrate; only the rim + catch-light + shadow legs of the six-layer composite do visible work. The plate is glass in *recipe* but not in *read*.
- In **dark mode the field collapses to a muddy brown over near-black** (`_cap/dock-layers-dark.png`) — the dock reads, but the "colorful aurora" is gone; it is a brown gradient. The §L1 promise (a backdrop worth lensing) is broken in the mode where glass should be most dramatic.

**The fix is the brief's directive verbatim — "glass demos over COLORFUL aurora backgrounds."** The DockStage should run a **richer multi-nuclei aurora preset** (a vivid procedural-suite palette, warm-to-cool nuclei drifting) so the glass actually lenses varied color: the blur smears real structure, the saturate concentrates real chroma, and the dock reads as Apple-grade liquid glass rather than a tinted div. Keep it offscreen-paused (already by construction via `useIntersectionPause` + `content-visibility`) and budget-safe (ONE GL context per route via the shared `DockStage`, already honored — the page correctly threads `:background-canvas` so all five docks sample the ONE field; do NOT regress that). Verify dark-mode chroma survives.

---

## 4. CARD-PER-SECTION + LAYOUT — transparent tiles are not cards

The user's structural ask is explicit: **each sub-section in its OWN glassy card; the main card BIGGER.** Today:

| Treatment | Sections | Reads as |
|---|---|---|
| `.dock-stage-tile` (transparent `bg`, `1px oklab(…/0.3)` hairline) | Drill-in, Rail, Rail-hosted, Collapse-while-switching, Vertical-overflow (5) | a faint dashed-looking placeholder frame |
| no host at all (bare `<ol>`) | Mechanics (1) | a paragraph of numbered prose |

A hairline rounded rectangle is the **generic-AI default** the frontend-design skill warns against. The intent (BA.W-STAGE's "transparent tile so the dock's glass floats over the live field") is *architecturally sound* — an opaque `bg-card` plate WOULD occlude the aurora (and, worse, §L1 "glass cannot sample glass" — a glass card hosting a glass dock would double-composite to black). But the execution stops at a border, which gives the eye no card to land on.

**The resolution is the `surface="veil"` glass tier — not opaque, not bare, and §L1-safe.** DESIGN.md ships exactly the right primitive: the **Wash/Quiet tiers admit the backdrop through** (§L1 tier table — "permeable veil over a kinetic backdrop"). BUT note the glass-cannot-sample-glass constraint: a `.glass-wash` card *directly* hosting the `.glass-dock` stacks two `backdrop-filter` surfaces. The correct architectural transposition is the §L1 **single-composition-container** rule — the veil card and the dock must share ONE composite context (the iOS `GlassEffectContainer`), OR the section card carries the rim+catch-light+grain *decoration* while a single backdrop-filter layer (the card's) does the lensing and the dock reads as a *tint-only* plate within it. This is the real design move: a section card that reads as glass-ui (rim + grain + catch-light, a real card the eye lands on) framing a dock that floats inside its composite — satisfying "own glassy card" AND "glass over the live field" without the black-composite bug. It is a genuine architectural decision, not a `surface=` knob slapped on.

**The width**: lift the StoryPage content cap toward the full generous width on the dock pages specifically (the showcase that wants the room), and let the protagonist demo claim a BIGGER central card — the user's "main card area BIGGER" applied to the drill-in hero.

---

## 5. ANIMATION AFFORDANCE — the contextual page is static at rest

This is the most pointed failure given the page's subject. Per affordance-map's five-primitive vocabulary + motion-canon P7, every interactive element should answer the pointer the same liquid way, and a flagship should *arrive*.

**Alive (good):** the `DockIconButton`s inside the panes carry the full floor — `--scale-hover-dock` (1.1) hover-lift, `v-specular` gleam-track, `:active` `--scale-press-dock` (0.92) press-squish, `.focus-ring`. The collapse↔expand + pane-swap rides ONE `--dock-morph-t` spring on its own clock (P4). The rail's `:draggable` is a real `useDragMorph` pull-to-switch (affordance-map's DRAG-MORPH primitive, consumer #2). The dock *mechanics* honor the canon.

**Dead (the gap):**
- **The primary entry control is sub-floor.** The drill-in root buttons are raw `<button class="… transition-colors hover:bg-muted hover:text-foreground">` (probed: `transition: color 0.15s …, background-color …`). That is a generic grey color-fade — affordance-map says EVERY interactive element carries at least HOVER-LIFT + FOCUS-RING, and the glass/dock controls carry GLEAM-TRACK + PRESS-SQUISH. These three drill-in entry buttons — the FIRST thing a user touches on the page about dock context — have hover-lift=GAP, gleam=GAP, press-squish=GAP. They should be `<DockIconButton>` (or `<Button variant="glass">`), inheriting the floor, NOT a hand-rolled `hover:bg-muted` chip. This is the affordance-map "map-says-yes / source-says-no" red, on the page's hero interaction.
- **No entrance.** The page does not visibly *build in* — no per-demo gravity-rise, no staggered arrival landing on the docks (motion-canon "the page assembles itself"). The five demo cards should bloom in on their own `--spring-snappy-duration` beats (`.scroll-cascade`, W-SCROLL-MOTION), so the page that teaches *animated context* arrives animated.
- **No state-life at rest.** The active-layer readout is a flat `text-mono-caption` string (`active layer = root`). On a page about *switching context*, that readout should be a LIVE animated transition — the layer name morphing (`useTextHighlight` / a `split-chars` re-stagger) as you drill in, the active rail chip lifting onto the selected-as-glass tier with a `--glass-accent` chromatic rim (BB.W-GLASS-ACCENT — one color event, the band's hue, on the *selected* control). The contextual STATE should be visibly, kinetically alive — that's the whole demo.

**Move**: (a) re-point the drill-in entry buttons onto `<DockIconButton>`/`<Button variant="glass">` (the affordance floor); (b) wire `.scroll-cascade` gravity-entrance onto the five demo cards; (c) make the active-layer readout a live typographic transition + give the active rail/drill chip a `--glass-accent` focal glow — the contextual switch made VISIBLE, not just functional.

---

## 6. POLISH / DISTINCTIVENESS — competent, not bespoke

The page avoids the worst generic-AI sins (real tokens, real components, no gradient-purple soup). But it does not read **bespoke + premium**:

- **Repetition without rhythm.** Five centered pills in a vertical stack is a *list*, not a composition. The frontend-design "distinctive layout" bar wants protagonist/satellite or bento — scale contrast, asymmetry — not a uniform column. The five layer modes are a NATURAL bento: the drill-in hero large, the rail + collapse + overflow as supporting tiles of varied size around it.
- **Captions are changelog voice, not showcase copy.** The Rail caption ("… the `useDragMorph` consumer #2; the reka Arrow-key roving stays") and the Mechanics `<ol>` (five steps of internal FLIP-measure implementation detail: "Capture the container's current dimension, pin it inline … Clear inline dimension on `transitionend`") are *internal documentation*, not product copy (MEMORY: no grandiloquence, tighten superfluous language). A showcase shows the morph; it does not narrate the five-step measure algorithm. Cut every caption to ONE showcase sentence; the Mechanics section is pure implementation-leak — delete it or demote it to a collapsed code-peek.
- **The hairline tile frame** (`oklab(… / 0.3)` border) is the most generic element on the page. The veil-glass card (§4) replaces it with something that reads as glass-ui.

---

## 7. SPACING / RHYTHM + COLOR SUFFUSION

**Spacing**: the section vertical rhythm is tokenized and golden-ratio-derived — fine. The tiles carry a uniform `padding: 40px`; with the dock pill small and centered, that reads as a lot of empty plate around a small object — the *proportion* is off (a big frame around a small pill), the opposite of the protagonist staging §2 wants. The 1357px article with the content capped narrower wastes horizontal room on the showcase that should claim it.

**Color suffusion**: **monochromatic to a fault.** The one-color-event rule (AZ.W-SUFFUSE) is *over*-applied — the aurora is one hue, the captions grey, the chips grey, the active-state register absent. The dock-LAYERS band has an obvious accent opportunity the page ignores: each *layer* (Assets/Layers/Libraries) could carry its OWN context hue, surfaced as a `--glass-accent` chromatic rim on the active rail chip (the per-instance axis the library ships, BB.W-GLASS-ACCENT; the `DockStack mode="facets"` carousel does exactly this with per-facet `item.accent`). That is one color event, on the *selected* control, that makes the contextual switch *chromatically legible* — drill into Assets and the warm-spot follows. It would give the eye a focal hue the flat field denies, AND reinforce the page's subject (you can SEE which context you're in).

---

## 8. PATH-LABEL + LANGUAGE (the user's explicit asks)

- **Path label**: the rendered subpath chip is correct and standardized — `@mkbabb/glass-ui/dock` (matches `PAGES.json` `importPath`). The SFC imports via the local relative path (`../../../src/components/custom/dock`), which is the demo-internal mechanism, not the rendered label — fine. No path-label finding; this page is already conformant. (The systemic standardization concern is the 28-vs-90 split across the corpus, not this page.)
- **Superfluous language**: the captions over-explain the *mechanism* in changelog voice. The Rail caption leaks `useDragMorph consumer #2` + "the reka Arrow-key roving stays" (internal-wiring trivia); the Collapse caption leaks `--dock-morph-t` + "no double-animated pixels" (gate-spec voice); the Mechanics `<ol>` is a five-step FLIP-algorithm implementation dump. Cut each demo caption to ONE showcase sentence naming what the user SEES ("Drill into a pane; the dock resizes in place to fit it"); move the API/wiring detail into a code-peek or tooltip; delete the Mechanics implementation list (the morph IS the demo — narrating its measure algorithm is the spec appendix, not the showcase).

---

## TOP DESIGN MOVES (ranked, concrete)

1. **Colorful aurora, not the calm wash.** Swap the DockStage `DEFAULT_AURORA_CONFIG` for a vivid multi-nuclei preset so the glass actually lenses varied color (§L1). Single highest-leverage fix — it makes every dock on the page read as liquid glass instead of a tinted pill. Verify dark-mode chroma survives (don't collapse to brown). Shared with `dock/overview` → a SYSTEMIC DockStage-preset fix, not per-page.
2. **Veil-glass card per section, §L1-composite-safe.** Replace the transparent hairline tiles with a real glassy section card (rim + catch-light + grain) that shares ONE composition container with the dock it hosts (the §L1 `GlassEffectContainer` rule — never two raw `backdrop-filter` layers overlapping, which composites black). Satisfies "own glassy card" + "glass over the live field" + the glass-cannot-sample-glass constraint, all at once, and kills the generic hairline.
3. **Stage the drill-in as protagonist + make the context TYPOGRAPHIC.** Promote the drill-in demo to hero scale in a BIGGER central card; anchor it with a `--type-display-mega` poster mark that renders the LIVE active-layer name (the contextual state made load-bearing typography). Arrange Rail/Collapse/Overflow as a supporting bento of varied tiles around it — protagonist/satellite, not a uniform stack.
4. **Floor the affordance + make the switch ALIVE.** Re-point the raw drill-in `<button>`s onto `<DockIconButton>`/`<Button variant="glass">` (the affordance-map HOVER-LIFT+GLEAM+PRESS floor, currently a generic `hover:bg-muted` GAP); wire `.scroll-cascade` gravity-entrance onto the five cards; give the active rail/drill chip a `--glass-accent` per-context chromatic rim (BB.W-GLASS-ACCENT, one color event on the selected control) and animate the active-layer readout (`useTextHighlight`/`split-chars`) so drilling in is visibly, kinetically legible.
5. **Bigger + tighter.** Lift the StoryPage content cap toward full width on the dock pages; let the protagonist claim a bigger central card; cut every caption to one showcase sentence; delete the Mechanics implementation `<ol>` and the changelog-voice API trivia (`useDragMorph consumer #2`, `--dock-morph-t`, "no double-animated pixels").
