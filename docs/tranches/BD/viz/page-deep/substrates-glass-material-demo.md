# Pass-E META-STORYBOOK audit — `substrates/glass-material`

- **Route**: `/substrates/glass-material`
- **SFC**: `demo/stories/substrates/glass-material.vue` (385 lines)
- **Manifest row**: `demo/stories/manifest.ts:601-611` (`hero: true`, `heroScale: "hero"`, `background: "aurora"`)
- **Path-label**: `demo/stories/manifest.ts:224` → `"/substrates/glass-material"`
- **Live**: `http://localhost:5173/substrates/glass-material` (spot-checked at 1440×900, DPR 2)
- **Captures**: `_shot-glass-material-full.png`, `_shot-glass-material-top.png`, `_shot-aurora-compare.png` (the sibling `/substrates/aurora` for contrast)

This is the ONE page whose entire thesis is *glass reads against busy color* — the SFC header comment says it verbatim (`glass-material.vue:7-8`: "staged over a shipped high-frequency Aurora backdrop so the specular + rim + folds read against busy color (glass does not read on flat cream)"). The live page **fails its own thesis**: the glass plates float over flat near-cream, not a colorful field. That is the headline finding.

---

## P0 — BLOCKING DEFECTS

### P0-1 — The aurora backdrop is a low-res, washed-out smear (the thesis fails) — `glass-material.vue:87-91` + StoryHero chassis
The page declares `background: "aurora"` and relies on the StoryHero *contained* background aurora. Live measurement:
```
canvas intrinsic = 300 × 150   (the HTML <canvas> default — never sized to its box)
canvas rect      = 1152 × 4386 (upscaled ~3.8× wide, ~29× tall on DPR-2)
canvas opacity   = 0.6
```
A 300×150 buffer stretched to 1152×4386 is a blurry, low-frequency wash; at opacity 0.6 over the cream page it resolves to flat near-white (confirmed in `_shot-glass-material-full.png` — the field is gone). The glass plates read as faint gray rectangles, NOT liquid glass. **The page that exists to prove "glass over color" is the one substrate page with no vibrant field.**

Contrast proof (`_shot-aurora-compare.png`): the dedicated `/substrates/aurora` page carries a SECOND, full-fidelity foreground `<Aurora>` specimen (`704×627 @ opacity 1`) — a rich magenta→orange→violet field the glass + configurator read against beautifully. glass-material has NO foreground specimen, so it inherits ONLY the washed StoryHero background.

**Fix (architectural, not a patch):** glass-material must stage its OWN colorful foreground `<Aurora>` field behind the plate matrix — the `DockStage` pattern (`demo/stories/dock/DockStage.vue`: ONE shared `PRESETS.OPENAI_SKY` aurora `@ opacityCeiling 0.55` behind a column of transparent-tile demos). A `tier="field"` ShowcaseFrame over a real vibrant aurora is exactly the BG-2 staging the dock band already ships. Do NOT rely on the StoryHero background wash. (The underlying StoryHero 300×150-canvas-not-sized bug is a chassis defect that affects every `hero:true` substrate page; it is masked elsewhere by foreground specimens, exposed here.)

### P0-2 — Sticky hero title overlaps scrolled section content — StoryPage chassis (`StoryPage.vue:106` `story-hero-shrink`) manifested by `heroScale: "hero"`
Live: `.story-hero-shrink` is `position: sticky; z-index: 2; background: transparent`. The hero `<h1>` "Glass Material" renders at the **largest** rung (`heroScale: "hero"`, ~177px) and, on scroll, sticks at `top: 38` with NO backplate/scrim. Scrolled content (the *dynamic-luminance* and *glass-accent* sections) slides UNDERNEATH and the giant letterforms **collide with the section labels + blurbs** (`_shot-glass-material-full.png` and `_shot-glass-material-top.png` both show "Glass Material" sitting on top of section text — unreadable). This is the iOS-27 large-title-collapse done WITHOUT the collapse-to-slim-bar or the scrim. Acute here because (a) `heroScale: "hero"` is the tallest title and (b) the page is content-tall with transparent field-frames (no card edges to occlude the overlap). **Fix:** the shrink header needs an opaque/glass backplate when stuck, OR glass-material should drop to a smaller `heroScale` (it is the only substrate page on `"hero"` plus tall content). Chassis-level, but glass-material is the worst manifestation.

---

## P1 — STRUCTURE & USER-MANDATE GAPS

### P1-1 — Sub-sections are NOT "in their OWN glassy card" (user ask UNMET) — every `<ShowcaseFrame ... tier="field">`
All 9 sections wrap content in `<ShowcaseFrame pad="lg" tier="field">`. Live: `tier="field"` resolves `border-transparent bg-transparent shadow-none` (`ShowcaseFrame.vue:88-89`) — measured `bg rgba(0,0,0,0)`, `border rgba(0,0,0,0)`, `box-shadow none`. So each sub-section is a transparent rectangle on the page wash — a flat gap-stack, NOT a delimited glassy card. The user explicitly asks "each sub-section in its OWN glassy card." `tier="field"` was the right call to avoid an opaque plate occluding the field, BUT the page then never re-introduces a card silhouette — it reads as undelimited blocks. **Fix:** stage the matrix over a real foreground aurora (P0-1) and give each section a genuine GLASS card (`glass-quiet`/`glass-resting` tier) so the section IS a glassy card floating over the colorful field — which simultaneously demonstrates the component and satisfies the "own glassy card" mandate (the section chrome becomes a live glass-material specimen — eat the dogfood).

### P1-2 — Main card area is capped narrow (user ask: BIGGER) — `StoryPage.vue:87` / `manifest tokens`
Live: `.story-page-article` `max-inline-size: 1152px` on a 1440px viewport → the main column is 80% width. The user asks "the main card area BIGGER (more screen space)." A glassiness MATRIX showcase (many plates per row) benefits from a wider canvas; `--story-page-max-inline` is the single knob. Consider a per-page wide override (or a `contentClass` widen) for this matrix page.

### P1-3 — Thin on glass-ui COMPONENT composition (user ask: "deftly uses a SERIES of glass-ui components: docks/procedural-anims/cards/tabs/buttons") — whole SFC
The page composes raw `<div class="glass-*">` plates + `useSpecularTracking` + `useGlassBackdropLuminance` + ONE `<Button>` row (the tint sampler, `glass-material.vue:284-294`). It demonstrates the CSS material grammar well, but as a META-STORYBOOK page it composes almost NO finished glass-ui components: no `<Card>`, no `<SegmentedTabs>` (the 9 flat sections are a natural tab/segmented-control case — tint / accent / refract / squircle / chromatic / metal / deep), no dock, no procedural-anim beyond the (broken) background. **The user's dock-API ask** ("leverage the dock APIs — contextual switching/animating") is entirely absent. A deft version: drive the matrix-mode switch (specular · accent · refract · squircle · metal · deep) through `<SegmentedTabs>` or a `<DockStack mode="facets">` context carousel, each facet contextually switching the staged register over the live field — that exercises the new dock contextual-switching APIs AND tightens the 9-section scroll into an animated switcher.

### P1-4 — No PAPER morphism present (user ask: "GLASS + PAPER morphism both")
The page is glass-only. No `paper-grain-overlay`, no `.paper-ink-mark`, no paper-tier specimen. The matrix could carry one paper-register row (e.g. the rim/edge devices on a paper card) to show both morphisms the design north star names.

---

## P2 — PATH-LABEL & LANGUAGE

### P2-1 — Path-label is the literal route, NOT the standardized import form — `manifest.ts:224`
Every sibling substrate page carries an `@mkbabb/glass-ui/<sp>` import chip (`/aurora`, `/goo-blob`, `/glass-panel`, …). glass-material carries `"/substrates/glass-material"` — a raw route path (live chip text confirmed: `/substrates/glass-material`). Per the manifest rule (`manifest.ts:196-204, 382`) a route with no single published subpath falls back to its route path, which is technically the defined behavior — BUT for a META audit standardizing the label, the glass material SHIPS via `@mkbabb/glass-ui/styles` (the `.glass-*` ladder + `.glass-material` mixin live in `src/styles/glass/`). **Recommend** the chip read `@mkbabb/glass-ui/styles` (the honest import surface for this material) so the page matches the sibling `@mkbabb/glass-ui/*` convention instead of a route literal.

### P2-2 — Superfluous / over-engineered prose to tighten
- **SFC header comment (`glass-material.vue:1-15`)** and the per-section inline comments (`:21-29`, `:44-48`, `:56-66`, `:68-83`, `:176-203`) are long meta-narration ("the W-PRUNE2 E4-3 own-story exclusion", "byte-identical neutral fallback", "the §F1 data-keyed colored hover made a ONE-LINE seam"). This is tranche-bookkeeping prose, not demo authoring — trim to one line per block.
- **The live blurbs are dense and jargon-heavy** (e.g. `:123` "writes --glass-backdrop-luma + the --glass-backdrop: light|dark bucket on it"; `:173` the glass-accent blurb is 5 sentences). Per the writing-style guide (no grandiloquence, maintain levity) these read as spec excerpts. Tighten each blurb to ONE plain sentence + let the demo show the rest.
- Repeated "byte-identical", "the on/off contrast device", "presets-in-consumers" framing across blurbs is internal vocabulary leaking to the demo surface.

---

## P3 — WHAT WORKS (keep)
- The `useSpecularTracking` single-seam moving catch-light is correctly bound across every plate (`:42`, `:104-106`) — the DRY pointer-write is live (cannot fully verify the gleam without a real pointer move, but the wiring is correct).
- The glass-accent swatch grid DOES render distinct per-instance rim hues (rose/amber/teal/violet visible in `_shot-glass-material-top.png`) — the `--glass-accent` per-instance axis reads.
- The rim ON/OFF and accent ON/OFF contrast devices are a good demonstration pattern.
- The live-luminance readout (`luma 1.000 · light`) renders — though note it reads `1.000` (pure white), consistent with P0-1: the observer is sampling the washed-out near-white field, not a colorful one. Fixing P0-1 makes this readout meaningful (it will track real field luma).

---

## Verdict-supporting metrics
| Check | Result |
|---|---|
| Glass over LIVE colorful field | ❌ flat cream (300×150 canvas @ 0.6 — P0-1) |
| Each sub-section in own GLASSY card | ❌ transparent `tier="field"` frames (P1-1) |
| Main card area BIG | ⚠️ 1152px / 80% vw, capped (P1-2) |
| Deft SERIES of glass-ui components | ❌ raw `glass-*` divs + 1 Button; no Card/Tabs/Dock (P1-3) |
| Dock APIs (contextual switch/animate) | ❌ absent (P1-3) |
| Paper morphism | ❌ absent (P1-4) |
| Hero/title rendering | ❌ sticky overlap bug (P0-2) |
| Path-label standardized | ⚠️ route literal, not `@mkbabb/glass-ui/*` (P2-1) |
| Language tightness | ⚠️ over-narrated comments + dense blurbs (P2-2) |
| Specular / accent / rim devices | ✅ wired + reading |
