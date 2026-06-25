# Pass-E META-STORYBOOK demo audit — substrates/dot-matrix

- **Import label**: `@mkbabb/glass-ui/dot-matrix`
- **SFC**: `demo/stories/substrates/dot-matrix.vue`
- **Live**: http://localhost:5173/substrates/dot-matrix
- **Manifest row**: `demo/stories/manifest.ts:684-694` (`background: "grid"`, `hero: true`, `heroScale: "hero"`)
- **Audited live** (Chrome via devtools-mcp, 1440×900, DPR 2, WebGPU present). Comparison surfaces: substrates/dot-flow-field (sibling WebGPU viz) + substrates/aurora (WebGL2 viz).

## VERDICT SUMMARY
The page is a **near-total failure on every axis the user named.** The headline viz is a DEAD DEMO (the globe never paints — blank 460px void), the layout is BROKEN (the hero title overlaps the controls + the blurb is duplicated and collides with itself), there is exactly ONE flat card (not one-glassy-card-per-subsection), the glass is demoed over a FLAT CREAM GRID (not a live colorful aurora), zero dock/tab/button/card composition, and the blurb prose is grossly over-long. This page needs a gestalt rebuild, not patches.

---

## (7) BUGS — most severe first

### BUG-1 (P0, BLOCKER): the DotMatrix globe NEVER PAINTS — dead demo
The entire 460px `ShowcaseFrame` region is **blank cream** on the live page. No dots, no globe, nothing. Confirmed by viewport screenshot (the lower ~700px of the card is empty) and by canvas inspection.

- The canvas backing store is **stuck at the HTML default 300×150** while its CSS box is **1033×460** at DPR 2 (it should be ~2066×920). `evaluate` readback: `{"backing":{"w":300,"h":150},"style":{"w":"1032.81px","h":"460px"}, "dpr":2}`. The WebGPU substrate never sized the drawing surface, so nothing visible renders into the layout box.
- Dispatching a `window resize` + waiting 1s does NOT update the backing store — it stays 300×150. The viz is permanently dead, not merely slow to arm.
- **The sibling `substrates/dot-flow-field` (also `useGpuSubstrate`/WebGPU-first) is ALSO BLANK** — same 300×150 stuck backing store. The **WebGL2 `substrates/aurora` PAINTS PERFECTLY** (full colorful gradient fills the page). So this is a **born-WebGPU-substrate failure**, not dot-matrix-specific source.
- **Probable root cause**: `DotMatrix.vue` wrapper sets `content-visibility: auto` + `contain-intrinsic-size: auto none` (DotMatrix.vue style block). With the viz mounted offscreen inside the nested `.demo-main-scroller`, the browser content-skips layout for the wrapper at arm time, so the substrate's resize path never reads a non-zero canvas size and never configures the WebGPU drawing buffer. The WebGL2 path tolerates this; the WebGPU `context.configure` path apparently does not re-fire when the box finally measures. (Root-cause confirmation belongs to the substrate `useWebGPUCanvas`/`useGpuSubstrate` resize wiring — out of demo scope, but the demo is the surface that exposes it.)
- **The entire premise of the page (the "fine-dot sphere" hero) does not exist on screen.** This is the single most important finding.

### BUG-2 (P0): hero/section layout COLLISION + DUPLICATED descriptor
The page renders the descriptor TWICE, overlapping:
1. The chrome `StoryHeader` (StoryPage.vue header) paints the audacious `text-display-hero` "Dot Matrix" title + the manifest blurb + the `@mkbabb/glass-ui/dot-matrix` subpath chip.
2. The `StorySection` inside the card paints its OWN `heading="Dot matrix"` + `label="Fibonacci phyllotaxis…"` eyebrow + a SECOND ~identical long blurb (dot-matrix.vue:53-55).

Live screenshots show the giant "Matrix" title overlapping the switch row ("two-globe mono-on-near-black reference…", "interactive…", "paused"), the chrome blurb overlapping the section eyebrow, and the section heading "Dot matrix" colliding with the chrome blurb. It reads as a **stacking/z-order/spacing breakdown** — the hero cluster, the controls, and the section body are all piled on top of each other near the top of the card. The duplicated blurb (chrome blurb ≈ section blurb, both ~90 words) is the content half of the same defect.

### BUG-3 (P1): the "interactive" affordance is DEAD by construction
`DotMatrix.vue` puts `pointer-events: none` on `.dot-matrix-canvas` AND the wrapper has no pointer handler. The page exposes an "interactive (parallax + dimple + flick bloom)" switch (default ON), but **no pointer events can reach the canvas/renderer** through the demo as wired — the much-advertised cursor parallax/dimple/flick cannot fire. (Even if BUG-1 were fixed, the interaction would be dead unless the wrapper forwards pointer position to `usePointerVelocityField`.)

---

## (1) DEMO CONGRUENCE — does it show the component at its BEST + full API?
**FAIL.** The component's whole reason to exist (a 3D depth-shaded dot-sphere) is invisible (BUG-1). Beyond the dead render:
- API exercised: only `palette`/`background`/`spheres`/`breathing`/`interactive`/`paused` via two presets + three switches. The `DotMatrixConfig` surface (dot count, sphere radius, spin rate, tilt, depth-fade constants `FACING_LO/HI`, `SIZE_TAPER_*`, `breathRadius`) is NOT exposed — no `<Configurator>`, no sliders. A studio-grade viz demo should let you scrub the phyllotaxis count, the depth-fade band, the spin/tilt, the breathing depth live (cf. the aurora studio which drives "EVERY axis" via a right-hand Configurator).
- Contextual switching: a two-state `<Switch>` preset toggle is the floor, not deft. No `<DockLayerGroup>`/`<SegmentedTabs>` register switching, no animated transition between warm-cream ↔ reference.
- The new dock APIs (contextual-switching/morph/silhouette) are entirely absent — the only dock on the page is the global demo-shell nav dock at the bottom, which the page does not compose or exercise.

## (2) COMPONENT ABILITY — a deft SERIES of glass-ui components?
**FAIL — thin and flat.** The page composes exactly: `StoryPage` → `StorySection` → 3× `Switch`+`Label` → ONE `ShowcaseFrame` → `DotMatrix` → a `<p>`. No `<Card>` family, no `<SegmentedTabs>`, no `<Button>`, no `<GlassDock>`/`<DockStack>`/`<DockLayerGroup>`, no `<Configurator>`, no `<MetricStack>`/`<BorderProgress>`/any procedural-suite sibling. It is the thinnest possible viz mount. The user's "each page deftly uses a series of glass-ui components (docks/procedural-anims/cards/tabs/buttons)" bar is unmet.

## (3) GLASS SUFFUSION — live colorful aurora field?
**FAIL.** `background: "grid"` (manifest.ts:690) = a static cream paper-grid wash. The glass card floats over **flat warm cream**, so there is NO morphism to read — glass over a flat substrate is invisible glass (the very thing AX.W54 warns about). Contrast: `substrates/aurora` paints a full rose-indigo-amber field and the glass POPS. The `ShowcaseFrame tier="field"` is correct (no opaque plate), but there is no live colorful field BEHIND it. The viz self-stages ONE GL context, but that doesn't preclude a colorful CSS/aurora ground behind the card. PAPER morphism: the grid wash is present but flat and unremarkable; no deliberate paper-grain/blueprint composition. The user's "glass demos over COLORFUL aurora backgrounds" bar is unmet.

## (4) STRUCTURE — one glassy card per sub-section? main area BIG enough?
**FAIL on both.**
- **One card per subsection**: there is only ONE `StorySection` and ONE `ShowcaseFrame`. Controls, viz, and prose are not separated into their own glassy cards — they are a single ungrouped stack inside the page card (and currently colliding, BUG-2). The user explicitly asked for "each sub-section in its OWN glassy card."
- **Main card area BIGGER**: the viz canvas is a fixed `h-[460px]` (`dot-matrix.vue:79`) — modest, and dwarfed by the oversized hero title + the two long blurbs + the control row above it. For a hero-grade globe the canvas should command the majority of the viewport (the user: "the main card area BIGGER — more screen space"). Currently the dead void is large but the *intended* viz box is only 460px and buried below ~600px of text/controls.

## (5) PATH-LABEL standardization
**PARTIAL.** The subpath chip in the chrome eyebrow reads `@mkbabb/glass-ui/dot-matrix` (correct, full form). But the in-body prose uses the SHORT form twice: section blurb "Shipped /dot-matrix." (`dot-matrix.vue:55`) and the manifest blurb "Shipped /dot-matrix." (manifest.ts:688), while the footer `<p>` uses the full `@mkbabb/glass-ui/dot-matrix` (`dot-matrix.vue:89`). Standardize on the full `@mkbabb/glass-ui/dot-matrix` everywhere (drop the bare `/dot-matrix`).

## (6) LANGUAGE — superfluous prose to tighten?
**FAIL — grossly verbose, and triplicated.** The same ~90-word descriptor appears in THREE places (manifest blurb, StorySection blurb, README) plus a 60-word footer `<p>`. The blurbs over-explain with citation litter ("Will-Howard / COBE / Stripe lineage", "Martin Roberts / extremelearning, arXiv 0912.4540", "opacity = 0.15 + 0.85·facing"), ALL-CAPS shouting ("SURFACE", "BRIGHTNESS + DEPTH", "WebGPU-FIRST", "ONE GL context"), and editorializing ("dignified, hero-grade, nothing darts"). The user's writing-style memory: no grandiloquence, no over-punctuation. Cut the section blurb to ~one sentence ("A globe of fine warm-cream dots on a sphere surface, depth-shaded so it reads as a translucent dot-shell."), drop the math/citation from the visible UI (keep it in the README), and remove the redundant footer paragraph.

---

## RECOMMENDED REBUILD (gestalt, not patch)
1. **Fix BUG-1 at the substrate** (canvas backing-store sizing under `content-visibility:auto` for the WebGPU path) — the viz must paint. This is the precondition for everything else; the demo currently certifies nothing.
2. **De-duplicate + de-collide the header**: let the chrome `StoryHeader` own the title/eyebrow/blurb ONCE; the `StorySection` carries no second blurb (or drop `StorySection`'s heading/blurb and keep only the controls + viz). Fix the z/spacing so the controls sit BELOW the hero cluster, not under it.
3. **One glassy card per subsection**: a `<Card>` for the controls (ideally a `<Configurator>` exposing dot-count/spin/tilt/depth-fade/breathing live), a BIG `<Card surface="glass">` for the globe canvas (let it own the majority of the viewport), an optional `<Card>` for the math/citation note.
4. **Live colorful field**: set `background: "aurora"` (or layer a colorful aurora behind the card) so the glass morphism reads. The viz still owns its one GL context; the page ground can be the CSS aurora wash.
5. **Leverage dock/tabs**: a `<SegmentedTabs>` or `<DockStack mode="facets">` to switch warm-cream ↔ reference ↔ (future) presets with an animated transition, instead of a bare `<Switch>`.
6. **Bigger canvas** (`h-[600px]`+ or `aspect-square` hero), pointer-forwarding wired so "interactive" is real.
7. **Tighten prose** to one sentence in-UI; standardize `@mkbabb/glass-ui/dot-matrix` everywhere.
