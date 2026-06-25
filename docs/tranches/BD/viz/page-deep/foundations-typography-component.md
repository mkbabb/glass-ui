# Pass-E COMPONENT deep audit — foundations/typography

**Page:** `foundations/typography` · import `/foundations/typography`
**Demo file:** `demo/stories/foundations/typography.vue`
**Manifest:** `s("foundations","typography",…)` → `CATEGORY_DEFAULT_BG.foundations = "paper"` (a STATIC paper wash, NOT a live GL field), `variant="page"`, body in a `resting` opaque `bg-card` Card.

## What the "component" actually is

This page demos NO Vue component. It exercises the **typography token system + the `@utility` semantic classes** plus three demo-chassis primitives:

- **`src/styles/typography.css`** → thin `@import` root over `typography/{scale,semantic,utilities}.css` (BA.W-CARVE2; 153/233/174L, each under the 500-line no-god-module bound).
  - `scale.css` — the OFL `local()` fallback `@font-face` set (Capsize-calibrated, zero-CLS swap) + the `:root` √φ `--type-*` scale tokens (the audacious `--type-display-{mega,hero,audacious}` clamp ladder peaking at 352px / the fast.com peg).
  - `semantic.css` — the 8-rung `@utility text-display{,-2..-5,-mega,-hero,-audacious}` ladder + the heading/body/prose/admin-label register. Every display rung reads `--type-leading-display: 1.05` + `--type-tracking-display: -0.015em` (BB.W-DISPLAY-TRACKING — the Apple −1.5%/84:80 signatures, em-relative so constant across the clamp).
- Chassis: **`StoryPage.vue`** (the `.scroll-build` + `.scroll-cascade` entrance host), **`StoryHero.vue`** (the glass-Card-over-background composite), **`StorySection.vue`** (label+heading+blurb), **`ShowcaseFrame.vue`** (the `tier="field|quiet|resting"` specimen host).

The page itself: a focal `text-display-audacious "Aa"` lead, an `Audacious peaks` section (3 `tier="field"` frames), a `graded ladder` section (1 `tier="quiet"` frame, 18 rows), a `Signature glyph` (`.fourier-f ℱ`).

## The seven audit lenses

### (1) ANIMATION — the four-state contract / spring physics / entrance

- **Page entrance: PRESENT and idiomatic.** The page rides `StoryPage`'s `.scroll-cascade` host (BB.W-SCROLL-MOTION) — each `StorySection` builds in on its own `view()` timeline, spring-clocked coupled transform+opacity, PRM → static terminal. The focal `<section>` rides the cascade too. No demo-local `@keyframes`. **GOOD.**
- **GAP — the type specimen itself is INERT.** Typography is a static-token page: the display rungs have NO entrance/hover/state animation of their OWN. The user's bar is "HIGH animation affordance for EVERY component." A type-specimen pane that leads with the library's proudest tier (the 352px audacious word) currently just fades in with the section and then sits dead. The library SHIPS the vehicles to make the type ALIVE without a fork: `SplitChars` + `useCharStagger` (per-glyph `--char-index` reveal, `/motion-core`, engine-free, the `vReveal` precedent), `TypewriterText`, and the `vReveal` `[data-reveal]` directive. The focal `Aa` and the three audacious peaks are the canonical `SplitChars`/`vReveal` consumers — a per-glyph gravity stagger on the focal word is exactly the "audacious type arrives with GRAVITY" register `story-hero-title--enter` already speaks. **This is the single biggest animation-affordance gap on the page.**
- **No four-state contract applies** — there are no interactive atoms on this page (it is a documentary specimen). That is correct; type rungs are not buttons.

### (2) PROCEDURAL VIZ

None on this page. `CATEGORY_DEFAULT_BG.foundations = "paper"` — a static paper-grain wash, GL-free by design (the one-GL-per-route budget + the M8 GL-on-static-wash gate). **Correct for the token-tour role**, but see the user-ask conflict in (7).

### (3) PERFORMANCE

- **Compositor-only:** the entrance is transform+opacity (`.scroll-cascade`); the static paper wash is a `paper-grain-overlay` utility. No layout-animated property. **GOOD.**
- **No offscreen-pause needed** (no rAF / no GL on the page).
- **No layout thrash.** The display clamps resolve once at first paint; `font-display: optional` + the Capsize fallback metrics make the Plus Jakarta swap geometry-neutral (zero CLS). **GOOD.**
- **Font weight on the critical path:** the payload faces live in `fonts.css` (split off `/styles`), the calibrated `local()` fallback stays on the critical path. **GOOD.**

### (4) SAFARI

- **`text-wrap: balance`/`pretty`** on every display/heading/prose rung — Safari 17.4+ supports `balance`, degrades to normal wrapping with zero break (the comment says so). Safe.
- **`font-optical-sizing: auto` + `font-variation-settings: 'WONK' 1, 'SOFT' 0`** (inline on the focal `Aa`/peaks) — variable-font axes are Safari-safe; a non-variable fallback ignores them. Safe.
- **`clamp()` + `vw` slopes, em-relative tracking** — all baseline Safari. **No Safari risk on this page.**

### (5) IDIOMATIC / no-legacy

- **WORKAROUND — the focal section hand-rolls the page-identity header.** The page's lead `<section class="flex flex-col gap-3"><p class="section-label">Foundations · Typography</p>…` is a HAND-ROLLED eyebrow, NOT the chassis primitive. The page carries ZERO of the `borderLeft:`/`IconChip`/`section-label--tinted` page-identity paste (grep = 0) — so it is OUTSIDE the BD.W-PAGE-HEADER-FOLD 36-file set, but it ALSO does not get the coherent accent-rail + IconChip identity every other page wears. This is an inconsistency: the type page leads with a bare `.section-label` `<p>` where the rest of the storybook leads with the IconChip accent-rail header. **Non-idiomatic divergence.**
- **DEAD/superfluous-language:** the SFC docstring + inline comments are dense (the "tighten superfluous language" ask). Three comment blocks restate the same "the type IS the experience / one-color-event" point.
- **The ladder + peaks are plain `v-for` over local arrays** — idiomatic, no fork, no dual-path. Fine.
- **`leading-[0.85] tracking-tight` on the focal `Aa`** OVERRIDES the canonical `--type-leading-display: 1.05` / `--type-tracking-display: -0.015em` with arbitrary values — a per-site re-pin of the exact register BB.W-DISPLAY-TRACKING minted to STOP per-site re-pins. The focal word should read `text-display-audacious` clean (it already carries the rung) and drop the arbitrary `leading-[0.85] tracking-tight`, OR the page should declare it WANTS a tighter poster leading via `text-hero` (which owns `--text-hero-leading: 0.84`). **Minor token-discipline drift.**

### (6) The glass six-layer composite

The body sits in a `resting` opaque `bg-card` Card (the W54 legibility-allowlist surface) — so the SIX-layer optical composite (backdrop blur+saturate · tint · rim · catch-light · shadow · grain) is INTENTIONALLY ABSENT here (an opaque plate has no backdrop to sample; glass-cannot-sample-glass). The `tier="field"` frames host their content directly over the page paper wash with no plate. **This is correct for a documentary token page** — but it means the type page never demonstrates the glass band the user wants every page to show.

## User-ask mapping (the 2026-06-22 directive)

- **"each sub-section in its OWN glassy card"** — currently the sections are bare `StorySection` blocks with `ShowcaseFrame`s inside; they are NOT each their own glassy card. The user wants per-section glass cards.
- **"the main card area BIGGER (more screen space)"** — `--story-page-max-inline` bounds the article; the type ladder would benefit from a wider field.
- **"glass demos over COLORFUL aurora backgrounds"** — typography is on a STATIC paper wash. This DIRECTLY conflicts with the M8 GL-on-static-wash gate + the foundations→paper default + the one-GL-per-route budget. A colorful aurora behind the type pane is a deliberate scope decision, NOT a free change.
- **"leverage the dock APIs (contextual switching/animating)"** — the type page has no dock. The ladder/peaks/glyph trio is a natural `DockLayerGroup` contextual-switch candidate (switch between ladder · peaks · math/mono registers).
- **"standardize the import-path label"** — typography's `importPath` is the route `/foundations/typography` (no real subpath; it is a CSS-class page). Consistent with the PAGES.json convention for class-only pages.
- **"tighten superfluous language"** — the SFC docstring + the three restating comment blocks.

## FOLD / MODIFY / AUGMENT / PRUNE → BD waves

| # | Finding | Verdict | Wave |
|---|---------|---------|------|
| F1 | Type specimen is INERT — no per-glyph entrance on the focal `Aa` / audacious peaks; library ships `SplitChars`/`useCharStagger`/`vReveal` (no fork) | **AUGMENT** | **NEW `BD.W-TYPOGRAPHY-ALIVE`** (sibling of W-TOKEN-TOUR-GLASS, Band 4, zero src paint) — wire `SplitChars`+gravity-stagger on the focal word + the 3 peaks; PRM-static |
| F2 | Page leads with a hand-rolled `.section-label` `<p>`, not the chassis IconChip accent-rail header | **FOLD** | **BD.W-PAGE-HEADER-FOLD** — extend the enrolled set to fold the typography focal-header onto `StorySectionHeader`/`StoryPageHeader` (it is the 37th non-`borderLeft` divergent case the wave's settings.vue note already flags as a separate-idiom concern) |
| F3 | "each sub-section in its OWN glassy card" + glass-band demo on a foundations page (GL-free) | **MODIFY** | **BD.W-TOKEN-TOUR-GLASS Arm B** — the type ladder/peaks gain `<ShowcaseFrame tier="field">`/`<Card tier>` per-section glass framing over the static wash (already its remit; extend to typography) |
| F4 | Focal `Aa` re-pins `leading-[0.85] tracking-tight` arbitrary, overriding the BB.W-DISPLAY-TRACKING canonical rung | **MODIFY** | **BD.W-PAGE-OFFTOKEN-SWEEP** — drop the arbitrary `leading-[]`/`tracking-tight`; read `text-display-audacious` clean (or `text-hero` for poster leading) |
| F5 | Superfluous SFC docstring + 3 restating comment blocks | **PRUNE** | **BD.W-PAGE-OFFTOKEN-SWEEP** (or the comment-tighten arm) — collapse to one tight docstring |
| F6 | "leverage the dock APIs" — ladder/peaks/math as a `DockLayerGroup` contextual switch | **AUGMENT** | **NEW `BD.W-TYPOGRAPHY-ALIVE`** §2 (optional, scope-gated) — a dock layer-group switching the three type registers; respects the one-dock-per-route budget |
| F7 | "colorful aurora behind the type pane" conflicts with M8 GL-on-static-wash + one-GL-per-route + foundations→paper | **DECISION-GATED** | A scope call for the orchestrator — NOT a free fold; if taken, it is a manifest `background:` change + an M8-gate carve, owned by a NEW wave, not TOKEN-TOUR-GLASS (which is explicitly GL-FREE) |

## Verdict (5 lines)

1. **Sound + Safari-safe + performant:** the type token system (√φ ladder, BB.W-DISPLAY-TRACKING tracking/leading, Capsize zero-CLS fallback) is idiomatic and clean; the page entrance rides `.scroll-cascade` compositor-only with no thrash.
2. **Biggest gap — the type specimen is ANIMATIONALLY DEAD:** the focal audacious word + the 3 peaks fade in with the section then sit inert; the library already ships `SplitChars`/`useCharStagger`/`vReveal` to give per-glyph gravity entrance with zero fork → **AUGMENT via a NEW `BD.W-TYPOGRAPHY-ALIVE`**.
3. **Non-idiomatic header divergence:** the page hand-rolls a bare `.section-label` `<p>` instead of the chassis IconChip accent-rail identity every other page wears → **FOLD onto BD.W-PAGE-HEADER-FOLD**.
4. **Token-discipline drift + superfluous language:** the focal `Aa` re-pins `leading-[0.85] tracking-tight` over the canonical display rung, and the SFC restates its thesis 3×  → **MODIFY/PRUNE via BD.W-PAGE-OFFTOKEN-SWEEP**.
5. **Glass-band + per-section-card + aurora asks:** "each sub-section in its own glassy card" + the glass band demo maps to **BD.W-TOKEN-TOUR-GLASS Arm B** (GL-free `tier="field"` framing); the "colorful aurora behind type" ask is a **DECISION-GATED scope call** that collides with the M8 GL-on-static-wash gate + foundations→paper default and must NOT be smuggled into the GL-free TOKEN-TOUR wave.
