# Pass-E META-STORYBOOK audit — `substrates/glass-panel`

- **Route**: `/substrates/glass-panel`
- **SFC**: `demo/stories/substrates/glass-panel.vue` (88 lines)
- **Manifest row**: `demo/stories/manifest.ts:622-630` (`background: "grid"`, NOT hero — a non-hero substrate page)
- **Path-label**: `demo/stories/manifest.ts:225` → `"@mkbabb/glass-ui/glass-panel"` (already standardized — live chip confirmed `@mkbabb/glass-ui/glass-panel`)
- **Live**: `http://localhost:5173/substrates/glass-panel` (spot-checked at 1440×900, DPR 2)
- **Captures**: `_shot-glass-panel-full.png` (full-page, with lens/deep toggled ON), `_shot-glass-panel-clean.png` (rest state)

**NAMING NOTE (carries the whole audit):** the route/component is named `glass-panel` and ships `@mkbabb/glass-ui/glass-panel`, but the SFC is the **MATERIALS gallery** — the `<GlassPanel>` *component* was PRUNED at BC.W-GLASS-PRUNE (`glass-panel.vue:1-14`). The page now teaches the five-rung `.glass-{wash,quiet,resting,floating,overlay}` CSS ladder BARE (no `<GlassPanel>` component), over a live `<Aurora>`. So the "import: `@mkbabb/glass-ui/glass-panel`" chip is honest at the *subpath* level (the subpath still exists, package.json:519) but the demo composes ZERO of that subpath's exports — it composes `.glass-*` CSS classes from `@mkbabb/glass-ui/styles`. This is a latent path-label honesty seam (P2-1).

This page is the SIBLING of `/substrates/glass-material` and shares its thesis (*glass reads against busy color*), but is materially HEALTHIER: it self-stages its OWN foreground `<Aurora>` (`glass-panel.vue:60`), so unlike glass-material it actually floats over a colorful field. The headline gaps here are STRUCTURE + COMPONENT-THINNESS + a real lens-collapse regression, not a dead field.

---

## P0 — BLOCKING DEFECTS

### P0-1 — `.glass-lens` ON collapses the five-rung BLUR ladder to a uniform 10px (the gallery's own thesis breaks under its own toggle) — `src/styles/glass/squircle.css` (the `.glass-lens` blur override) × `glass-panel.vue:72`
Live measurement, toggles OFF (clean load): the rungs differentiate correctly —
```
wash     blur(1px)  sat 1.05  α 0.33
quiet    blur(8px)  sat 1.05  α 0.52
resting  blur(10px) sat 1.05  α 0.66
floating blur(13px) sat 1.18  α 0.81
overlay  blur(20px) sat 1.20  α 0.95
```
Toggle `.glass-lens` ON and re-measure: **ALL FIVE rungs paint `blur(10px) saturate(1.3) brightness(1.14)`** — the RESTING value. The matched rule is `.glass-material.glass-lens, .glass-lens { backdrop-filter: var(--glass-blur-resting) var(--glass-refract-filter) }`, which hardcodes the resting blur because the squircle `feDisplacementMap` base is authored against the resting rung. So the moment a viewer toggles the REFRACTION axis the page exists to demo, the BLUR-LADDER axis the page ALSO exists to demo **silently flattens** — wash, quiet, floating, and overlay all become 10px. Each rung's own `--glass-blur-{rung}` var still resolves to its correct distinct value (1/8/10/13/20px), proving the override is the squircle rule, not a token bug. **This is the page's worst live defect:** the two axes the page advertises as "orthogonal decorations ON the rungs" (`glass-panel.vue:31-35`) are NOT orthogonal — lens clobbers the blur differential. **Fix (architectural):** the lens rule must compose the PER-RUNG blur (`var(--glass-blur-resting, …)` → the rung's own var), or the squircle displacement base must be rung-relative, so refraction layers ON the ladder rather than replacing it. If the constraint is genuinely fixed (the displacement map needs one base), the demo must SAY so (a one-line note) rather than present them as freely-orthogonal.

---

## P1 — STRUCTURE & USER-MANDATE GAPS

### P1-1 — Sub-sections are NOT "each in its OWN glassy card" (user ask UNMET) — the whole SFC is ONE `<StorySection>` (`glass-panel.vue:43-85`)
The page is a SINGLE `<StorySection>` containing ALL five rungs in ONE shared aurora matrix (`sectionCount: 0` distinct story-section cards live; one `.rounded-card` matrix, `glass-panel.vue:59`). There is no per-sub-section delimitation. The user explicitly asks "each sub-section in its OWN glassy card." Here the natural sub-sections (the ladder · the deep axis · the lens axis · a chromatic/metal/paper register) are all collapsed into one row of plate specimens with no card silhouette around each conceptual group. **Fix:** break the page into MULTIPLE glassy cards — e.g. a "Ladder" card, a "Depth axis" card, a "Refraction axis" card, each a real `glass-quiet`/`glass-resting` tier floating over the live field (eat the dogfood — the section chrome BECOMES a glass-material specimen). This simultaneously satisfies the mandate AND demonstrates the material.

### P1-2 — Main card area is SMALL on BOTH axes (user ask: BIGGER, more screen space) — `glass-panel.vue:60-62` matrix + `StoryPage.vue` article cap
Live: the article column is `1152px` on a `1440px` viewport (80% width, `--story-page-max-inline` cap). Worse, the matrix itself is only `1086 × 244px` — ONE short row of 5 rung cells. The aurora field gets ~244px of vertical space; the glass-over-color thesis would read far stronger with a taller, wider canvas. The user asks for "the main card area BIGGER (more screen space)." **Fix:** widen the page (per-page `--story-page-max-inline` override / `contentClass` widen) AND give the matrix real height (taller rung cells, or a 2-row layout, or a big hero plate) so the live field is a generous canvas, not a 244px strip.

### P1-3 — Thin on glass-ui COMPONENT composition (user ask: "deftly uses a SERIES of glass-ui components: docks/procedural-anims/cards/tabs/buttons") — whole SFC
The page composes: raw `<div class="glass-*">` plates, ONE `<Aurora>`, and ONE `<ToggleGroup>` (the deep/lens axis chips, `glass-panel.vue:51-54`). That is TWO finished components (`Aurora` + `ToggleGroup`) plus CSS classes. As a META-STORYBOOK page it composes almost NO glass-ui surface: no `<Card>` (ironic — the SFC comment tells the reader to "reach for `<Card>`" at `:45`, but the page itself never shows one), no `<SegmentedTabs>` (the deep/lens/chromatic/metal registers are a natural tab/facet case), no dock, no second procedural-anim. **The user's dock-API ask** ("leverage the dock APIs — contextual switching/animating") is ENTIRELY ABSENT. A deft version: drive the register switch (ladder · depth · refraction · chromatic · metal) through `<SegmentedTabs>` or a `<DockStack mode="facets">` context carousel, each facet contextually switching the staged glass register over the live field — exercising the new dock contextual-switching APIs AND animating the gallery.

### P1-4 — No PAPER morphism (user ask: "GLASS + PAPER morphism both")
Glass-only. No `paper-grain-overlay`, no `.paper-ink-mark`, no paper-tier specimen. The design north star names BOTH morphisms; the matrix could carry one paper-register row (a rim/edge device on a paper card) to show both.

### P1-5 — `<ToggleGroup>` chips are bare text, not the glassy chip register — `glass-panel.vue:52-53`
The axis chips render as `.glass-deep` / `.glass-lens` plain ToggleGroupItems. On a page whose entire subject is liquid glass, the toggle chips are an obvious place to demonstrate the `<SelectableChip>` / glass-accent tonal register or at least a glass-tier toggle surface. Currently they read as flat mono-caption buttons — a missed self-demonstration.

---

## P2 — PATH-LABEL & LANGUAGE

### P2-1 — Path-label chip is `@mkbabb/glass-ui/glass-panel` but the demo composes NONE of that subpath — `manifest.ts:225`
The chip is technically standardized (matches the `@mkbabb/glass-ui/*` sibling convention, live-confirmed). BUT the `<GlassPanel>` component was pruned (BC.W-GLASS-PRUNE) and the demo composes `.glass-*` CSS from `@mkbabb/glass-ui/styles` instead. So the honest import surface for what this page TEACHES is `@mkbabb/glass-ui/styles` (the `.glass-{rung}` ladder lives in `src/styles/glass/ladder.css`). **Recommend** either (a) re-label the chip `@mkbabb/glass-ui/styles` to match the material the page actually demos, or (b) if `/glass-panel` is being kept as a live subpath, have the page COMPOSE it (mount the actual exported surface) so the label is true. The current state is a label that points at a subpath the demo never imports.

### P2-2 — Superfluous / over-engineered prose to tighten
- **SFC header comment (`glass-panel.vue:1-14`)** is 14 lines of tranche-bookkeeping narration ("the W-PRUNE2 E4-3 own-story exclusion"-class meta, "apple.com's web has no glass-materials gallery", "research/apple-glass.md §3.1", "the binary answer to which glass do I reach for"). This is internal rationale, not demo authoring. Trim to 2-3 lines.
- **The StorySection blurb (`glass-panel.vue:45`)** is FIVE sentences packed with internal vocabulary ("the apple-home-nav register", "WebKit degrades to blur", "reach for `<Card>` (the CARDS register, /display/card) — not a panel"). Per the writing-style guide (no grandiloquence, maintain levity) tighten to ONE plain sentence + let the live toggles teach the rest.
- The per-rung `blurb` strings (`:24-28`) read as spec lines ("~0.30α — sub-perceptual veil", "modal-over-modal"). The α numbers are fine; the editorializing tails ("the calm body rung", "the canonical plate") are filler.

---

## P3 — WHAT WORKS (keep)
- **The field IS colorful + live** (the glass-material P0 does NOT recur here): `glass-panel.vue:60` self-stages its OWN foreground `<Aurora :config="DEFAULT_AURORA_CONFIG">`, ONE GL context on the route (the one-GL-per-route budget held). The warm coral→orange field reads clearly behind the rungs (`_shot-glass-panel-clean.png`). This is the correct staging the sibling page lacks.
- **The five-rung ladder differentiates correctly at rest** — blur 1/8/10/13/20px AND alpha .33/.52/.66/.81/.95 both monotonic (live-measured). "Each rung visibly more present than the last" holds (until lens is toggled — P0-1).
- **Both axis toggles function live** — `.glass-deep` re-points the blur to the deep family (the `--glass-blur-floating` var resolves to the 16px deep value), `.glass-lens` applies the full squircle `feDisplacementMap` refraction filter (the OS-grade displacement map is live and correct in the filter chain).
- **The path-label is the standardized `@mkbabb/glass-ui/*` form** (modulo the honesty seam P2-1) — no route-literal like glass-material had.
- **No hero-overlap bug** — the page is non-hero (`background: "grid"`, no `heroScale`) and short (docHeight == viewportH, no scroll), so the sticky-title collision that plagues glass-material cannot manifest.

---

## Verdict-supporting metrics
| Check | Result |
|---|---|
| Glass over LIVE colorful field | ✅ self-staged foreground Aurora, warm coral field reads |
| Each sub-section in own GLASSY card | ❌ one StorySection, one shared matrix (P1-1) |
| Main card area BIG | ❌ 1152px / 80% vw AND matrix only 244px tall (P1-2) |
| Deft SERIES of glass-ui components | ❌ Aurora + ToggleGroup + raw `.glass-*` divs; no Card/Tabs/Dock (P1-3) |
| Dock APIs (contextual switch/animate) | ❌ absent (P1-3) |
| Paper morphism | ❌ absent (P1-4) |
| Five-rung blur ladder (at rest) | ✅ 1/8/10/13/20px monotonic |
| Five-rung blur ladder (lens ON) | ❌ collapses to uniform 10px (P0-1) |
| Axis toggles (deep/lens) live | ✅ both apply + paint |
| Path-label standardized | ⚠️ `@mkbabb/glass-ui/glass-panel` form ✅, but demo imports none of it (P2-1) |
| Canvas resolution | ⚠️ 300×150 buffer upscaled 7.2× (smooth gradient tolerates it) |
| Language tightness | ❌ 14-line meta header + 5-sentence blurb (P2-2) |
| Hero/title overlap | ✅ non-hero, no scroll — bug cannot manifest |
