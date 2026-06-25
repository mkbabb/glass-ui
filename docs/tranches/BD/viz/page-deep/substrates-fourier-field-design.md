# substrates/fourier-field — FRONTEND-DESIGN deep critique (Pass-E)

**Surface:** `demo/stories/substrates/fourier-field.vue` · live `http://localhost:5173/substrates/fourier-field`
**Lens:** world-class frontend-design (distinctive, production-grade, anti-generic-AI) applied to the glass-ui language.
**North star:** DESIGN.md (iOS-26/27 Liquid Glass six-layer composite · 7 glass tiers · glass-cannot-sample-glass · spring physics) · `motion-canon.md` · `affordance-map.md` · `design-idioms.md` · `PROCEDURAL-SUITE.md`.
**Captured:** 1440×900, light + dark, live (the running build is AHEAD of the committed SFC — the import path renders as a `@mkbabb/glass-ui/fourier-field` code chip, the title is ink not violet, the blurb is tighter).

---

## 0. THE HEADLINE DEFECT — the protagonist is a dead gray slab (P0, blocking)

The single most important fact: **the FourierField stage does not paint.** Live, the
canvas is a flat gray rectangle in light mode and a flat near-black void in dark mode —
no epicycle chain, no reconstructing curve, no comet, no aurora behind it. The status
pill reads `N 4 / 16 playing`, so the engine *believes* it is live; the pixels say
otherwise.

Root cause, measured: the canvas backing store is **300×150 (the unsized default HTML
canvas buffer) while displayed at 622×521** — the substrate never resized its drawing
buffer to the stage box, so it draws into a 300×150 buffer stretched empty over a half-
megapixel display surface. `navigator.gpu` is present; no GPU/substrate error is logged.
This is the `useGpuSubstrate` consumer-owns-DPR/resize seam (PROCEDURAL-SUITE §"consumer
owns its DPR policy") never firing on this surface, OR a SwiftShader software-raster fall
that produces no paint and no `auroraFallbackGround`-style luminance-faithful placeholder
(the `W-AURORA-SWRASTER` discipline exists for aurora but the Fourier field has no
equivalent CSS ground).

Everything below is moot until the protagonist paints. A "live studio" whose entire
left 60% is a gray hole is not a B-grade page — it is a broken page. **This is design
move #1 and it is not optional.** The page must NEVER ship a dead-canvas slab: it needs
(a) the resize-buffer fix so the WGSL surface fills its box, and (b) a luminance-faithful
CSS/2D *resting* ground (a faint epicycle-ring or warm-cream radial) that paints when the
substrate cannot, so the stage is never a void. Reference: PROCEDURAL-SUITE "the live-PRM
freeze draws ONE static frame then parks" — there must ALWAYS be a frame.

---

## 1. VISUAL HIERARCHY — the title is a wall, the studio is an afterthought

**The eye lands wrong.** On first paint the viewport is ~70% consumed by a two-line
`Fourier / Field` set at what reads as `text-display-mega`/`-hero` scale — an enormous
ink wordmark that pushes the actual subject (the live studio, the entire point of the
page) **entirely below the fold.** You must scroll the inner `<main>` to even see the
configurator. The audacious √φ ladder is being used — but as a *blunt instrument*, not a
hierarchy. DESIGN.md / the suffusion doctrine says the mega/hero tiers ACTIVATE on the
metric/number/hero surfaces; here the hero `<h1>` has eaten the page.

This inverts the user's explicit ask ("the main card area BIGGER — more screen space").
Right now the *title* is big and the *card* is small-and-scrolled. The fix is a
hierarchy inversion:

- **Demote the masthead to a single-line `text-display-3`** (the committed SFC's
  intent — violet `--motion-accent`, one color event) seated in a compact
  `StoryHeader`-style cluster (eyebrow → title → one-line blurb), occupying the top
  ~18-22% only. The W-HIERARCHY2 GRAVITY entrance already exists for this cluster — use
  it.
- **Promote the studio to the hero.** The `Configurator` is currently capped at
  `h-[min(72vh,600px)]` inside a `ShowcaseFrame pad="lg"`. Lift it to fill the freed
  space — the stage should be the LARGEST thing on the page, ~60-68vh, the protagonist
  the eye lands on. This directly satisfies the "bigger main card area."
- The 5-line prose blurb (live: "ONE Fourier view on the WebGPU substrate. Drag the
  harmonic-count N slider and WATCH…") is **too long and shouty** (`WATCH`, `SCRUB`,
  `No Canvas2D anywhere`). The user asked to *tighten superfluous language.* Cut to two
  sentences: what it is, one verb of interaction. The "No Canvas2D anywhere" /
  "WebGPU-first" engineering boast belongs in a tooltip or the README, not the masthead
  body — it is implementation trivia masquerading as copy.

**The good:** the eyebrow + import-path code-chip pattern is clean and the live build's
`@mkbabb/glass-ui/fourier-field` chip is exactly the standardized label the ask wants —
keep that, propagate it to sibling pages.

---

## 2. THE ONE-CARD MONOLITH — the user asked for per-section glassy cards; this is a slab

The user's first request: *"each sub-section in its OWN glassy card."* The current page
is the OPPOSITE — ONE giant `Configurator` `glass-floating` panel holds the stage on the
left and a single scrolling controls column on the right, with the four
`ConfiguratorLayer` sections (Spectrum · Epicycles · Comet · Color) stacked as flush,
hairline-divided rows inside that one panel. They read as one undifferentiated control
wall, not four distinct instruments.

This is the architectural move the page is missing, and it is also where the **dock APIs**
the ask names should enter. Two strong options, both idiomatic:

- **(A — dock-contextual, the ask's literal request.)** Replace the four stacked
  `ConfiguratorLayer`s with a `DockLayerGroup` / `<DockStack mode="facets">` rail
  (Spectrum · Epicycles · Comet · Color as facet chips, each with its own
  `--glass-accent` context hue per `W-DOCK-RAIL-REALIZE`). Clicking a facet morphs the
  controls panel to that section's card — *contextual switching, animated*, exactly the
  "leverage the dock APIs" brief. Each section becomes its own glass card revealed on the
  one `--spring-dock` clock. This is the most distinctive move and the one that makes the
  page *teach the dock system while teaching Fourier.*
- **(B — discrete glass cards.)** Render each `ConfiguratorLayer` as a distinct
  `glass-quiet`/`glass-resting` card with real inter-card gap (the golden
  `--card-pad-section-gap`), so the four instruments separate visually — Spectrum and
  Color are clearly different surfaces. Pairs with the `.scroll-cascade` register so they
  build in on `view()` timelines as you scroll the column.

Either kills the slab. (A) is the world-class answer — it is bespoke, it shows off the
contextual-dock silhouette, and it is what no generic-AI template would reach for.

---

## 3. THE BACKDROP — glass with nothing to refract (the iOS-27 north-star miss)

DESIGN.md is unambiguous: glass is a **six-layer optical composite** whose backdrop-blur
layer needs *something behind it to bend.* The ask says it plainly: *"glass demos over
COLORFUL aurora backgrounds."* This page has NONE. The stage wrap is
`background: transparent`, the `ShowcaseFrame tier="quiet"` sits on the flat cream page,
and even when the canvas DID paint it would be a Fourier curve on void — the
`glass-floating` configurator panel is blurring a flat warm-cream page, so its blur is
imperceptible (CLAUDE.md AX.W54: "the blur is imperceptible over a flat substrate —
nothing behind to blur").

The page is a *substrates* demo and it has no live substrate behind the glass. This is
the single biggest fidelity miss after the dead canvas. The move:

- **Seat the whole studio over a `<DockStage>`-style shared `<Aurora>`** (offscreen-paused
  by construction), warm-to-violet to echo the `--viz-legendre` / `--motion-accent`
  motion-family hue. Now the `glass-floating` configurator panel ACTUALLY refracts a
  colorful field — the six-layer composite reads, the page becomes a glass-over-aurora
  showcase, and the Fourier curve draws over a living backdrop instead of a gray box.
  Respect the one-GL-context-per-route budget: ONE aurora behind, the Fourier field on
  top (it is the protagonist, not a second ambient layer).
- This is also the fix for "glass-cannot-sample-glass": with an aurora backdrop the
  controls panel's blur has a real source, and the stage's own glass chrome (the status
  pill, the transport bar) reads as genuine liquid glass over color.

---

## 4. ANIMATION AFFORDANCE — the chrome is alive, the protagonist and the controls are NOT

Per `affordance-map.md`, every interactive element must answer the pointer with one of
the five primitives (HOVER-LIFT · GLEAM-TRACK · PRESS-SQUISH · …). Audit:

- **The stage:** dead (see §0). When fixed, the FourierField's own pointer-scrub IS its
  affordance — but there is zero *cue* that the field is draggable/scrubbable. A
  first-time user sees a gray box. Add a resting hint: a faint "drag to scrub" `IconChip`
  reveal or a cursor-follow gleam on the stage so the SCRUB affordance is discoverable
  (the blurb says you can scrub; the surface gives no sign).
- **The controls:** the `LabeledSlider`/`LabeledSelect` rows are functional but read
  static — no entrance, no per-row hover-lift. They should ride the W-HIERARCHY /
  `.scroll-cascade` build-in and carry the `transition-control` hover-lift so the
  instrument feels alive at the iOS-27 bar. Right now the panel is a spreadsheet of
  controls, not a liquid instrument.
- **The raw `<input type="checkbox" class="accent-[var(--viz-fourier)]">`** for "Show
  chain" and "Rainbow chain" is a hard rule break: a raw native checkbox in a glass
  studio is the generic-AI tell. It has no hover-lift, no press-squish, no glass. Replace
  with `<Switch>` or `<ToggleChip>` — the library OWNS these and they carry the
  affordance contract. This is a distinctiveness regression sitting in the middle of an
  otherwise-bespoke surface.
- **The preset tabs** ("Ambient ellipse · Dense reconstruction · Brand ℱ …") clip HARD
  off the right edge of the panel — no `<FadingScroll>` feather (the page imports none),
  so "Brand mark ℱ" and "Summing harmonics" are sliced. The R8-08 "Shy" defect class.
  Wrap the preset strip in `<FadingScroll axis="x">` or route it through
  `<SegmentedTabs>` so the overflow feathers and the indicator glides on `--spring-snappy`.
- **The transport bar** (`DockBackgroundToggle` + `GlassTimeline scrubber` + speed
  `LabeledSelect`) is the strongest-composed cluster on the page — it reads as a real
  media transport. Keep it; give the pause toggle a press-squish and the scrubber a
  thumb-halo on `data-held`.

**Net:** the chrome (configurator panel, transport, dock) animates; the two things the
page is ABOUT (the viz and the act of controlling it) are inert. That is exactly backwards
for a procedural-suite hero.

---

## 5. POLISH + DISTINCTIVENESS — bespoke chrome, generic skeleton

The component-level craft is high (the configurator hierarchy registers, the mono
`--token` sublabels, the violet slider fills in dark, the dark luminous-transmissive
register from `W-DARK-MATERIAL` all read premium). But the PAGE-LEVEL gestalt is generic:
a giant title over a single controls-panel slab on a flat page is a template shape. The
distinctiveness lives in the *parts*, not the *composition.*

The ask names the cure: *"each page deftly uses a series of glass-ui components
(docks/procedural-anims/cards/tabs/buttons)."* This page uses Configurator + LabeledField
+ Timeline + one DockBackgroundToggle — a narrow slice. To be world-class it should
ORCHESTRATE: the aurora backdrop (§3), a dock facet-rail for the sections (§2A), discrete
glass cards (§2B), `SegmentedTabs` for the presets (§4), a real `<Switch>`/`<ToggleChip>`
(§4), and the audacious type *demoted to a frame, not a wall* (§1). A page that composes
eight library primitives in a coherent gestalt is bespoke; one that stacks three in a slab
is a template.

---

## 6. SPACING / RHYTHM — the golden ladder is present in the panel, absent on the page

Inside the configurator the `--card-pad-*` √φ ladder and the `--configurator-*` hierarchy
tokens give the controls a real cadence. But at PAGE scale the rhythm is broken: the
title-to-studio relationship is not a φ step, it is a cliff (title ~70vh, studio
below-fold). The `ShowcaseFrame pad="lg"` wraps the whole `Configurator` in one pad box,
so the stage and controls share one outer frame with no breathing between them and the
page edge. Re-establish the page-level golden rhythm: masthead (φ⁻² band) → studio (the
dominant φ band) → generous edge gutter, with the `--dock-content-safe-inset` reserved so
the bottom dock never grazes the transport bar.

---

## 7. COLOR — proportion is correct, but under-deployed

The suffusion proportion is RIGHT: one color event (the `--motion-accent` violet on the
title in the committed SFC; the `--viz-fourier`/`--viz-chebyshev`/`--viz-legendre` curve
hues; the violet slider fills), body ink untinted, the mono sublabels neutral. No
violation. But the page is currently *monochrome in practice* because the one place color
should sing — the live curve and its backdrop — is gray. With the canvas fixed (§0) and
the aurora seated (§3), the warm-Fourier curve over a violet-warm aurora becomes the
page's color identity, and the `--viz-*` palette select becomes a real, visible choice
instead of an abstract one. The color story is well-designed and waiting on the paint fix
to be seen.

---

## TOP DESIGN MOVES (priority-ordered)

1. **Make the protagonist paint (P0).** Fix the 300×150-buffer-stretched-empty resize so
   the WGSL stage fills its box, AND ship a luminance-faithful CSS resting ground so the
   stage is NEVER a void (the `W-AURORA-SWRASTER` discipline, transposed to fourier-field).
2. **Invert the hierarchy.** Demote the masthead to a single-line `text-display-3` cluster
   (W-HIERARCHY2 GRAVITY entrance); promote the studio to the dominant ~60-68vh hero — the
   "bigger main card area" the ask names.
3. **Seat the studio over a colorful `<Aurora>` backdrop** (offscreen-paused, one GL
   context) so the glass actually refracts — the iOS-27 six-layer composite reads, per
   DESIGN.md.
4. **Break the slab into per-section glass cards via the dock APIs** — a `DockStack
   mode="facets"` / `DockLayerGroup` rail (Spectrum · Epicycles · Comet · Color, each a
   `--glass-accent` context card), contextual-switching animated on `--spring-dock`. This
   is the most distinctive move.
5. **Animate the inert parts:** `.scroll-cascade` entrance + `transition-control`
   hover-lift on every control row; a discoverable scrub-affordance cue on the stage;
   `<FadingScroll>`/`<SegmentedTabs>` for the clipping preset strip.
6. **Replace the raw native checkboxes** with `<Switch>`/`<ToggleChip>` (affordance-map
   compliance; kill the generic-AI tell).
7. **Tighten the copy** to two sentences; drop the `WATCH`/`SCRUB`/`No Canvas2D` shouting;
   keep the standardized `@mkbabb/glass-ui/fourier-field` import-path chip.

---

## VERDICT (5 lines)

1. The page's protagonist is BROKEN: the FourierField stage paints a dead 300×150-buffer gray slab (near-black void in dark) — no curve, no epicycles, no backdrop — so the "live studio" is a hole; nothing else matters until it paints + carries a luminance-faithful resting ground.
2. Hierarchy is inverted against the brief: a 70vh ink `Fourier/Field` wall buries the studio below the fold, when the user asked for a BIGGER main card — demote the masthead to a single `text-display-3` cluster and promote the stage to the dominant hero.
3. The user's "each sub-section in its own glassy card" + "leverage the dock APIs" is unmet: one monolithic Configurator slab should become a `DockStack mode="facets"` contextual rail (Spectrum · Epicycles · Comet · Color), each a `--glass-accent` card switched on `--spring-dock`.
4. The iOS-27 six-layer north star fails for lack of a backdrop — a *substrates* demo with no live substrate; seat the whole studio over a colorful offscreen-paused `<Aurora>` so the glass finally refracts something.
5. Component craft is genuinely premium (configurator hierarchy, dark luminous-glass, transport cluster), but the page-level gestalt is a generic slab with inert controls and raw native checkboxes — orchestrate eight primitives over aurora with `.scroll-cascade` + hover-lift affordance to make it bespoke.
