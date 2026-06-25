# Pass-E COMPONENT deep audit — foundations/radii

**Page:** `foundations/radii` · import `/foundations/radii`
**Demo file:** `demo/stories/foundations/radii.vue`
**Manifest:** `s("foundations","radii","Radii","Radius tokens from xs to pill.")` → `CATEGORY_DEFAULT_BG.foundations = "paper"` (a STATIC paper wash, NOT a live GL field), `variant="page"`, body in a `resting` opaque `bg-card` Card. The route's subpath chip resolves `SUBPATHS["foundations/radii"] ?? "/foundations/radii"` → the bare route path `/foundations/radii` (no `@mkbabb/glass-ui/<sp>` entry; manifest.ts:382).

## What the "component" actually is

This page demos **NO Vue component**. It is a pure DESIGN-TOKEN tour — 14 bare `<div>` swatches (`h-20 w-20 border border-border bg-card shadow-cartoon` + the demoed `r.cls`) over two `StorySection`s. The "underlying component(s)" are:

- **`src/styles/theme/radius.css`** (the real source) — the LEADING plain `@theme` radius system: the primitives (`--radius` 0.625rem · `--radius-xs/sm` 4px · `--radius-md` 6px · `--radius-xl` 12px · `--radius-2xl` 1rem · `--radius-3xl` 1.5rem · `--radius-pill` 9999px) + the semantic aliases the swatches demo (`--radius-card→2xl`, `--radius-panel→xl`, `--radius-dialog→2xl`, `--radius-input/button→--radius`, `--radius-badge/dock/tab→pill`, `--radius-field→2xl`, `--radius-control→pill`, `--radius-tooltip→lg`) + the AX.W56 **corner-SHAPE squircle axis** (`--corner-k-{squircle,soft,sharp}` + `--corner-shape-{card,pill,bigdock,dialog,sheet,panel,hero,thumb}`). Plain-not-inline on purpose (value-identical aliases must not collapse + drop a `rounded-*` utility under v4 inline substitution — radius.css:1-11).
- **Demo chassis** (the only "components"): `StoryPage.vue` (the `.scroll-build`/`.scroll-cascade` entrance host + the `delimited` hairline seam), `StoryHero.vue` (the glass-Card-over-background composite + the Fira-Code subpath chip), `StorySection.vue` (label+heading+blurb at the `text-subheading` rung), and the `.scroll-cascade` register (`scroll-choreography.css`, BB.W-SCROLL-MOTION).

The page body: a `Scale` section (7 swatches in a `flex-wrap` `.scroll-cascade`) + a `Semantic aliases` section (7 swatches in a 7-col grid `.scroll-cascade`).

## The seven audit lenses

### (1) ANIMATION — four-state contract / spring physics / entrance/exit

- **Page entrance: PRESENT, idiomatic.** Both swatch grids carry `.scroll-cascade` (BB.W-SCROLL-MOTION) — each child builds in on its own `view()` timeline, coupled transform+opacity, `view(block)` + `animation-range: entry 0% 45%`, PRM/non-`@supports` → static terminal. Compositor-only, no setTimeout, no demo-local `@keyframes`. **GOOD** — the entrance is correct per motion-canon P1-P6.
- **GAP — the swatches are otherwise INERT, and they are the WHOLE point.** The user bar is "HIGH animation affordance for EVERY component." A radius swatch is a SPECIMEN of a shape — it has NO hover, NO four-state, NO morph. The library SHIPS the exact vehicle to make radius ALIVE without a fork: the AX.W56 `--corner-shape` superellipse axis + W42's documented **animated-k** register (the dock-morph `calc()`s an animated squircle `k` against the ONE `--corner-k-*` vocab — radius.css:83-84). A radii tour that lets a swatch MORPH its corner (round↔squircle↔pill, or sweep `--radius` / `--corner-k` on hover/scrub) would demonstrate the token system's most distinctive, least-shown capability (the corner-SHAPE axis is demoed on NO foundations page). The four-state contract does NOT apply (no interactive atoms — correct; specimens are not buttons), but a **hover-morph / scrubbed-`--radius` affordance is the single biggest animation gap.**
- No exit animation needed (specimens don't unmount on interaction).

### (2) PROCEDURAL VIZ

None, and none is owed. `CATEGORY_DEFAULT_BG.foundations = "paper"` — a static paper-grain wash, GL-free by the one-GL-per-route budget + the M8 GL-on-static-wash gate. **Correct for the token-tour role** (but see the user-ask conflict in §7).

### (3) PERFORMANCE — compositor-only / offscreen-pause / layout-thrash

- **Clean.** The swatches are static `border-radius` boxes; no animation touches a layout property. The `.scroll-cascade` keyframes animate only `opacity`/`translateY` (compositor-safe — `proof:no-layout-animation` GREEN). No rAF, no GL, nothing to offscreen-pause. `border-radius` itself triggers no layout. **PASS.**

### (4) SAFARI compatibility

- **Tokens: fully cross-engine.** `border-radius` + the `--radius-*` vars are universal. The `--corner-shape` superellipse axis is Chrome-139+ ONLY and is correctly `@supports (corner-shape: …)`-gated in glass.css/dock.css over the `border-radius` round CONTRACT (radius.css:75-78 — "NEVER make corner-shape the contract; Safari/Firefox have no positive signal through 2026"). The radii PAGE itself touches none of the squircle axis, so it is byte-identical on WebKit. **PASS** — but a squircle-demo augment (§7) MUST carry the same `@supports`-gated round fallback so it degrades, not breaks, on Safari.

### (5) IDIOMATIC / no-legacy

- **The raw swatch triplet is CORRECT here (the specimen-KEEP fence).** `h-20 w-20 border border-border bg-card shadow-cartoon` + `r.cls` is a SPECIMEN whose box-style IS the demoed token — folding it onto `<ShowcaseFrame>` (root `rounded-card shadow-cartoon`) would MASK the very radius/shadow it demos. This is the canonical specimen-swatch case, explicitly allowlisted by **`BD.W-TOKEN-TOUR-GLASS` §2 (KEEP)** + guarded by gate clause **M12-2**. So the triplet is NOT legacy — do not "consistency-fold" it.
- **`bg-card` opaque plate (minor).** The swatch fill is `bg-card` (an opaque plate) — fine for showing a SHAPE silhouette, but the user wants glass-over-colorful-aurora. A radius swatch over a transmissive glass tier (or `tier="field"`) would read the page wash through the corner — a glassiness upgrade without masking the radius (the corner is the demo, the fill is incidental).
- **No dual-path / dead code / workaround on this page.** The `radius.css` source carries one recorded near-dead pair (`--corner-k-soft`/`--corner-k-sharp` have no runtime `var()` consumer but ARE pinned by `proof:squircle-language`'s TOKEN-AXIS-EXISTS clause — KEPT, not swept, with the clean-break delete a coordination follow-up; radius.css:85-89). Not this page's concern.

### (6) The glass six-layer composite

- **ABSENT on the swatches by design** (they are opaque `bg-card` specimens — no backdrop blur, no rim, no catch-light, no grain). The six-layer composite lives on the **page CARD** (`StoryHero`'s glass Card over the paper wash) — present at the chassis level, not the swatch level. This is correct for a SHAPE specimen but is exactly the user's "glass demos over colorful aurora" gap: the radii tour shows shape over an opaque plate over a static paper wash, never glass-over-a-live-field.

## FOLD / MODIFY / AUGMENT / PRUNE — mapped to BD waves

- **MODIFY — `BD.W-TOKEN-TOUR-GLASS` (Arm B coverage).** The wave brings the BC glass band onto `paper-glass.vue` but leaves radii a bare-swatch KEEP. EXTEND the wave's roster so the radii swatches host their fill on `tier="field"` (or a transmissive glass tier) — the corner stays un-masked (the demoed token) while the page wash reads THROUGH it (glassiness upgrade, M12-2 still GREEN because the radius is the box geometry, not the fill plate). Zero src paint.
- **MODIFY — path-label standardization (`W-STORY-PAGE-STANDARD` / the manifest SUBPATHS map).** The radii chip resolves the bare route `/foundations/radii`; the `foundations` category root is `@mkbabb/glass-ui/styles` (manifest.ts:338). Standardize the token-tour chip convention — a CSS-token page is consumed via the styles cascade, so it should carry `@mkbabb/glass-ui/styles` (or an explicit `foundations/radii` SUBPATHS entry) rather than a route path masquerading as an import. This is the user's "standardize the import-path label" ask, systemic across the 28 route-path pages (PASS-E cross-cutting).
- **AUGMENT — `W-LIQUID-ENTRANCE-GENERAL` + the W42 animated-`k` register.** Give the swatches a HIGH-affordance hover/scrub morph: sweep `--radius` (or animate the `@supports`-gated `--corner-k` squircle `k`) so a swatch MORPHS its corner round↔squircle↔pill on hover — the corner-SHAPE axis the library ships but no foundations page demos. Compositor-only (`border-radius`/`corner-shape` are paint, the morph rides `--spring-*`), Safari-degrades via the round `@supports` fallback. This makes the radii tour the canonical animated-corner showcase.
- **AUGMENT — `W-STORY-PAGE-STANDARD` (the sub-section-in-its-own-glassy-card + bigger main card asks).** The two `StorySection`s currently sit flat in one Card; the user wants EACH sub-section in its own glassy sub-card + the main card BIGGER + dock-API contextual switching. Classify radii as a `<DemoMatrix>` (swatch grid) sub-type and wrap Scale / Semantic-aliases each in a glassy sub-card; a dock-API context switch (Scale ↔ Semantic ↔ Corner-shape) is the contextual-switching lever the user names. This is the page's standardization fold.
- **PRUNE — superfluous language.** The 7-line docstring (radii.vue:1-7) over-explains the chassis-lever rationale for a trivial swatch grid; tighten to one line. (No src/ code prune — the page is already minimal.)

## Verdict (5 lines)

1. NOT a Vue component — a pure radius TOKEN tour (`src/styles/theme/radius.css`) of 14 bare specimen swatches; the raw `border + bg-card + shadow-cartoon + r.cls` triplet is CORRECT (the specimen-KEEP fence, `BD.W-TOKEN-TOUR-GLASS` M12-2 — do NOT fold).
2. ANIMATION: entrance is idiomatic (`.scroll-cascade`, compositor-only, PRM-safe) but the swatches are otherwise INERT — the biggest gap is the un-demoed corner-SHAPE/animated-`k` squircle axis (a hover/scrub corner-morph is the obvious HIGH-affordance augment).
3. PERFORMANCE + SAFARI: clean — static `border-radius`, no GL/rAF/layout-thrash; the squircle axis is correctly Chrome-139-gated over the universal round contract, so any squircle augment must keep the `@supports` round fallback.
4. GLASS: the six-layer composite lives on the page card, not the swatches (opaque `bg-card` plates) — the user's glass-over-colorful-aurora + own-glassy-sub-card asks are real gaps (MODIFY `BD.W-TOKEN-TOUR-GLASS` Arm-B `tier="field"` + `W-STORY-PAGE-STANDARD`).
5. Path label `/foundations/radii` should standardize to `@mkbabb/glass-ui/styles` (the foundations cascade root) — the user's import-path-label ask, systemic; tighten the over-written docstring.
