# Pass-E — FRONTEND-DESIGN critique: `substrates/dot-flow-field`

**Page:** `demo/stories/substrates/dot-flow-field.vue` (99 lines) · live `/substrates/dot-flow-field`
**North star:** DESIGN.md (iOS-26/27 Liquid Glass) · `docs/precepts/{design-idioms,motion-canon,affordance-map}.md` · `PROCEDURAL-SUITE.md`
**Lens:** world-class frontend designer; distinctive + production-grade; AVOID generic-AI aesthetics; applied to glass-ui's own language.

---

## 0. The one-sentence verdict

This is the **orphan of the procedural-suite band**: aurora (176 LOC), blob (870), concentric (276), paper-grid (336) all compose the shared **`VizStudio` chassis** (`BC.W-VIZ-CONFIGURATOR-SUITE` — stage-LEFT / configurator-RIGHT / preset-thumbnail row / `<ColorSwatch>` palette editor / shrink-on-scroll hero), and `dot-flow-field` composes **none of it** — it is a bare `StorySection` + three raw `<Switch>` toggles + one transparent `ShowcaseFrame` over a flat cream `grid` wash. The page wears the band's audacious `heroScale: "hero"` 177px title (a cheque the body cannot cash) over a sub-storybook body. It does not look bespoke; it looks like a placeholder that never got finished.

---

## 1. The live capture (what the eye actually lands on)

Captured at 1080p desktop, light mode, fresh navigate:

- **The 177px `Dot Flow Field` display `<h1>` eats the ENTIRE first viewport.** Below the fold, before any field, sits the ~200-word `text-small` blurb wall. The hero ladder is used — but inverted: maximal type over minimal content. The eye lands on a title with nothing to look AT.
- **The field box renders BLANK.** The `<canvas class="dot-flow-field-canvas">` is `1033×460` CSS but its backing store is still `300×150` (never resized/armed); under the software-raster guard (`W-AURORA-SWRASTER`) the WebGL2 fallback paints an inert handle → an empty cream rectangle. *(Caveat: a real Metal GPU would paint the lattice; but the designer-bar judges the captured frame, and the captured frame is a void inside a borderless transparent `tier="field"` frame — there is not even a glass plate to read as "a surface is here." On a non-WebGPU machine the visitor sees nothing.)*
- **The sticky shrink-title overlaps the controls** mid-scroll: "Field" sits ON TOP of the `interactive`/`paused` Switch row — a z-order/sticky-release defect (`story-hero-shrink` not collapsing before the controls scroll under it).
- **The three toggles are an undifferentiated horizontal `flex-wrap` of raw `<Switch>`** with `text-sm` labels ("mono-on-near-black reference (off = warm-cream identity default)") — engineering prose, not a control surface.

The import-path chip (`@mkbabb/glass-ui/dot-flow-field`, Fira-Code, on the StoryPage chassis) IS already standardized and correct — the one element that meets the bar.

---

## 2. VISUAL HIERARCHY — does the eye land right?

**No.** The typographic ladder (√φ audacious display, DESIGN.md §Typography) is present at the title but the page is top-heavy and bottom-empty:

- The hero `<h1>` (`text-display-hero`) is the band default, fine in principle — but on a page whose protagonist is a *live field*, the field must be the focal mass, not the title. Aurora/blob seat a `min(78vh,720px)` live stage as the dominant element; here the stage is a flat 460px strip that reads as secondary to the type.
- There is **one** `StorySection` heading and **zero** sub-structure. The user's explicit ask — "each sub-section in its OWN glassy card" — has no expression: there are no sub-sections at all. Mechanism (wave physics), color register (warm-cream vs mono-reference), interaction (pointer ripple/flick), and degradation (PRM) are four distinct stories crushed into one blurb paragraph + three loose toggles.
- The **golden-ratio rhythm** (`design-idioms.md` card-pad ladder, sqrt-φ block-over-inline) is absent — `gap-4` flex toggles, a `460px` magic-number frame, a trailing `text-sm` PRM note. No φ cadence between the parts.

**The blurb is a wall.** ~200 words of dense citation prose (`∇⊥ψ`, "Gerstner/Tessendorf sum-of-sines", "Tessendorf 2001 · Bridson 2007") in `text-small text-muted-foreground` — the user's "tighten superfluous language" ask, verbatim. The page TELLS the physics instead of SHOWING it.

---

## 3. AFFORDANCE — clear interactive cues?

Weak. The only interactive controls are three `<Switch>` — and a Switch is the wrong primitive twice over:

- `mono-on-near-black reference` is a **theme/preset choice**, not a binary state — it deserves the `<PresetPickerRow>` thumbnail register aurora ships (two baked thumbnails: warm-cream vs mono-on-black), so the user SEES the two looks before committing. A Switch hides the payoff behind a label.
- `interactive` and `paused` are genuine binary states, acceptable as Switches — but they belong in a **configurator column** (`<ConfiguratorRow>` over `<ConfiguratorLayer>`), not a naked `flex-wrap`. The page exposes ONLY 3 of the viz's real axes — `FlowFieldConfig` carries palette/wave-amplitude/wave-speed/lattice-pitch/contrast/dot-size, none of which are tunable here. Against the user mandate ("a full configurator for each viz", `VizStudio` docstring) this is a control desert.

There is no dock anywhere on the body (the only dock is the global shell nav at far left). The user's ask — "leverage the dock APIs (contextual switching/animating)" — is unmet: the natural move is a `<GlassDock>` transport/register-switcher under the field (the dock-as-viz-control idiom the band already owns).

---

## 4. ANIMATION AFFORDANCE — is every element ALIVE at the iOS-27 bar?

**Mostly static.** Against `affordance-map.md`'s five-primitive closed set:

- **The field itself** is the one animated element — and in capture it is dead (blank). When it paints it is genuinely alive (the sweeping iso-band, pointer ripple, flick bloom) — that is the page's one real asset, and it is buried.
- **The toggles** are raw `<Switch>` — they DO inherit the Switch affordance row (track hover, thumb gleam `glass-specular-track`, thumb spring on `--spring-snappy`, focus-ring) per the map, so they are not inert. But they are the LOW-affordance floor, not the iOS-27 ceiling.
- **No HOVER-LIFT, no PRESS-SQUISH, no GLEAM-TRACK on any card** — because there are no cards. The user's "high animation affordance for EVERY component" and "each sub-section in its own glassy card" both fail at the same root: there are no glassy sub-surfaces to animate.
- **Entrance:** the page rides `.scroll-build` / `.scroll-cascade` (StoryPage chassis) so the title + blurb fade-rise on mount — but with one section there is no *cascade*, just one beat. The orchestrated section-build (`BB.W-SCROLL-MOTION`) is wasted on a single block.
- **Preset switch is instant** (`Object.assign` + JSON clone) — no morph, no crossfade between the warm-cream and mono-reference looks. The two registers should cross-dissolve on the `--spring-smooth` clock (motion-canon P1 EFFECTS→bezier / SPATIAL→spring); instead the field hard-cuts.

---

## 5. POLISH + DISTINCTIVENESS — bespoke or generic-AI-template?

**Generic.** This is the tell: a giant sans title, a paragraph of prose, three toggles, an empty box. Strip the Fira-Code chip and this is an indistinguishable AI-scaffold page. The band's distinctive moves — the rounded glass inspector with controls-right, the baked preset thumbnails, the `<ColorSwatch>` palette editor, the live stage as protagonist, the shadow-cartoon offset-stamp studio frame — are ALL absent. The page does not consume the library it is meant to showcase.

The `tier="field"` frame (transparent, no plate) was a deliberate choice (BG-2 black-plate fix — glass-over-live-field), but here it backfires: with the field blank there is no plate AND no field, so the box reads as a hole. A studio page needs the rounded studio frame (`viz-studio shadow-cartoon`) to give the empty/loading state an edge.

---

## 6. NORTH-STAR FIDELITY — iOS-27 / glass / paper

- **Six-layer glass composite (DESIGN.md §L1):** zero glass surfaces on the body. The page is cream-on-cream. No backdrop-blur, no rim, no catch-light, no grain anywhere a sub-section card would carry them.
- **GLASS demos over COLORFUL aurora (user ask):** the page sits on a flat `grid` wash. The field's own warm-cream default reads as beige-on-beige — there is no color event, no aurora behind the glass. The mono-on-near-black reference preset is the ONLY place real contrast lives, and it is hidden behind a Switch labeled in engineer-prose.
- **Suffusion proportion (`AZ.W-SUFFUSE`, one-color-event-per-surface):** the page has ZERO color events — it is monochrome ink-on-cream. It is under-suffused, not over. The substrates band is exactly where a bold color event belongs (the field's hue, or a `--motion-accent` violet masthead the `VizStudio` `#masthead` slot exists to host).
- **Spring physics (§L2):** the field animates on its own clock; the UI chrome does not exercise springs because there is no chrome to animate.

---

## 7. TOP DESIGN MOVES (ranked, concrete)

**M1 — Adopt `<VizStudio>` wholesale (THE move; everything else follows).** Re-author the SFC as `<VizStudio heading="Dot flow field" :presets …><template #stage>…</template><template #controls>…</template></VizStudio>`, exactly as `aurora.vue` (176 LOC) does. This single transposition delivers, for free: stage-LEFT at `min(78vh,720px)` (the BIGGER main card the user asks for), configurator-RIGHT (`BC.W-CONFIG-RIGHT`), the rounded `shadow-cartoon` studio frame, the shrink-on-scroll hero already wired. The field becomes the protagonist; the page stops being an orphan. *(design-idioms §11 editor-on-Configurator; `VizStudio` docstring "the ONE shape EVERY viz studio composes".)*

**M2 — Build the full configurator (the user's "full configurator + comprehensive demo suite").** Promote the three Switches into `<ConfiguratorLayer>` sections of `<ConfiguratorRow>`: a **Wave** section (amplitude/speed/lattice-pitch/contrast sliders), an **Interaction** section (interactive + flick-burst toggles), a **Render** section (dot-size, paused). Add the `<ColorSwatch>` palette editor for the dot + ground stops (aurora's pattern) — the user's "deftly uses a series of glass-ui components" met by ACTIVATING the real ones.

**M3 — Preset thumbnails, not a reference Switch.** Replace `mono-on-near-black` Switch with a `<PresetPickerRow>` of two (or three) baked-thumbnail cards: warm-cream identity · mono-on-near-black reference · (a colorful aurora-tinted theme — presets-in-consumers). The user SEES the look before selecting; the preset switch cross-dissolves the field on `--spring-smooth` (motion-canon P1), not a hard cut.

**M4 — Sub-sections in their OWN glassy cards (verbatim user ask).** Below the studio frame, a `.scroll-cascade` of `<Card>` (or `ShowcaseFrame tier="resting"`) sub-sections — *The wave* (a still of the iso-band sweep) · *The lattice* (the anchored-dot-vs-free-particle distinction, shown) · *Pointer ripple* (a captured flick-bloom) · *Reduced motion* (the parked frame). Each card carries the six-layer glass composite + HOVER-LIFT + a `:reveal` IconChip color-pop (`AZ.W-SUFFUSE`). This is where the band's animation affordance and golden-pad rhythm finally land.

**M5 — Leverage the dock (user ask).** Seat a `<GlassDock>` register-switcher under/over the field for transport (play/pause/reset) + the dot-vs-dither register toggle — the dock-as-viz-control idiom, contextual-switching its layers on `useContextualDockLayers`. A floating glass dock over the live field is the single most on-brand iOS-27 move available here.

**M6 — COLOR + a colorful aurora ground.** Make the live demo's lead a colorful register, not beige-on-beige: tint the dot palette to a warm-amber→violet `--section-color` event, OR drop the field over a subtle `<Aurora>`-tinted ground in the stage (one-GL-per-route budget already spent on the field — so tint the field's OWN palette rather than mount a second context). One deliberate color event (the suffusion rule), loud enough to read as bespoke.

**M7 — Tighten the prose (user ask).** Cut the 200-word blurb to ≤2 sentences ("A calm lattice of warm-cream dots a slow LARGE wave sweeps through — drag to ripple it, flick for a bloom."). Move the Tessendorf/Bridson citations + the `∇⊥ψ`/`waveBand(h)·contrast` math into a collapsed `<details>` "The physics" card or a footnote rung. The page should show the wave, not lecture about it.

**M8 — Fix the sticky-title overlap + the blank-canvas floor.** Resolve the `story-hero-shrink` z-order so the collapsed title never overlaps the control row; and give the field a real loading/degraded state (a static `auroraFallbackGround`-style luminance-faithful poster, the `W-AURORA-SWRASTER` ground precedent) so a non-WebGPU visitor sees the lattice SHAPE, never an empty cream void.

---

## 8. What is already right (keep)

- The Fira-Code `@mkbabb/glass-ui/dot-flow-field` subpath chip (standardized, correct).
- The `tier="field"` glass-over-field intent (correct — once the field paints + a studio frame gives it an edge).
- The PRM-respect note (correct content; wrong placement — belongs in the degraded-state card, M4).
- `commit-on-write` clone semantics (correct for a single-surface viz).
