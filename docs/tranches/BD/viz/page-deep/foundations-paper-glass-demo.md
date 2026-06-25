# Pass-E META-STORYBOOK audit — foundations/paper-glass

- **Page**: `/foundations/paper-glass`
- **SFC**: `demo/stories/foundations/paper-glass.vue` (245 lines)
- **Manifest row**: `manifest.ts:495-506` — `background: "paper"`, `hero: true`, `heroScale: "hero"`
- **Live**: http://localhost:5173/foundations/paper-glass (verified; `heroTitle: "Paper & Glass"`, `canvasCount: 0`)

## Verdict snapshot
A thin, flat token spec-sheet masquerading as the library's flagship glass demo. It imports ZERO glass-ui components (only StoryPage/StorySection chassis + raw `cn()`), composes hand-rolled `<div>` plates, and demos glass over a STATIC washed-out gradient+grid — never the live colorful aurora the morphism needs. The path-label is already standardized. This is the single highest-leverage page to rebuild for the BD liquid-glass north star.

---

## (1) DEMO CONGRUENCE — does it show glass at its BEST + full API?

**FAIL — flat, static, no animation, no contextual switching.**

- The page is the canonical "Paper & Glass" foundations demo — it SHOULD be the hero showcase of the six-layer optical composite (DESIGN.md). Instead it renders five `h-48` tier tiles (`paper-glass.vue:115-138`) + three `min-h-56` plates (`:163-196`) + a standalone grain tile (`:201-220`) + a 4-cell token readout (`:223-242`) — all static.
- **No animation affordance anywhere** — violates the "HIGH animation affordance for EVERY component" bar. No `.scroll-cascade` entrance on the tiles (the StoryPage chassis wraps `<slot>` in `.scroll-cascade`, but the bare `<div>` tile grids are direct children that build in as ONE block, not per-tile staggered). No hover-lift, no specular gleam, no press, no liquid-reveal — the glass tiers are shown DEAD.
- **No contextual switching / no dock APIs.** The page is about glass TIERS — the perfect surface to demo `<GlassDock>` contextual switching, `<DockStack mode="facets">` per-tier accent rims, or a `<SegmentedTabs>` tier-selector morphing a single live specimen. None present.
- **Full API unexercised**: glass-ui ships `--glass-level` (opaque escape), `--glass-depth`/`.glass-deep` (BB.W-DEEP-GLASS), `--glass-accent` per-instance chromatic rim (BB.W-GLASS-ACCENT), `.glass-lens` refraction (BB.W-LENSING), the `surface="glass|veil|opaque"` axis, `useLiquidReveal`, `useSpecularPointer`. The page demos NONE of these — it shows only the raw 5-rung `--glass-bg-*` opacity ladder as labeled rectangles.

## (2) COMPONENT ABILITY — deft series of glass-ui components?

**FAIL — imports zero components.**

- `grep -E "^import" paper-glass.vue`: only `StoryPage`, `StorySection`, `vue`, `cn`. **No `<Card>`, no `<Button>`, no `<Tabs>`, no `<GlassDock>`, no procedural-anim, no `<Configurator>`.**
- Every surface is a hand-rolled `<div :class="cn('glass-resting paper-grain-overlay rounded-card border ...')">` (`:117-126`, `:164-174`, `:205-211`, `:226-230`). This is exactly the "raw recipe triplet" the demo chassis (`<ShowcaseFrame>`, `<StorySection>`) was built to retire — and it sidesteps the actual library `<Card tier="...">` primitive, which is the canonical way a consumer reaches these tiers.
- The "ladder, against something" section is the closest to a real demo but is still three static plates with a colored dot (`:185-189`) — no component, no interaction.

## (3) GLASS SUFFUSION — live colorful field?

**FAIL — static, near-gray field; no aurora.**

- **`canvasCount: 0`** live — there is NO `<Aurora>`/`<GooBlob>`/`<Constellation>`. The page's manifest background is `"paper"` (flat warm-cream), so the top tier tiles + grain tile + token readout float over a FLAT cream page — the glass blur has nothing behind it to refract (CLAUDE.md AX.W54: "blur is imperceptible over a flat substrate").
- The one "field" is a hand-rolled static gradient on `paper-glass.vue:153`: `linear-gradient(135deg, color-mix(in srgb, var(--viz-fourier) 24%, transparent), transparent 36%), radial-gradient(... var(--viz-chebyshev) 25% ...), var(--background)` + a `--surface-tint-8` (GRAY) grid overlay at `opacity-45` (`:157-161`). Live-measured `--viz-fourier` = `oklch(0.579 0.201 30.4)` (a real red) but at 24% over cream it washes to a barely-tinted gray — the screenshot confirms the field reads as a flat gray box, NOT "something vivid." This is the exact BG-2 "glass over a flat plate occludes the field" defect W-STAGE/`tier="field"` was built to kill, re-introduced by hand.
- The user's bar — "glass demos over COLORFUL aurora backgrounds so the morphism reads" — is unmet. The six-layer composite (backdrop blur · tint · rim · catch-light · shadow · grain) cannot read against a static gray gradient; it needs a live, saturated, moving field.
- **Paper morphism**: present but minimal — `paper-grain-overlay` is applied (`:123`, `:171`, `:208`) and the standalone grain tile (`:201-220`) demos `--glass-grain-opacity`. This is the one genuinely on-spec piece, but it's a tiny static tile at the bottom, not a focal paper-vs-glass juxtaposition.

## (4) STRUCTURE — own glassy cards? main area big enough?

**PARTIAL FAIL.**

- **Sub-sections NOT each in their own glassy card.** The page is a flat vertical stack of bare `<div>` blocks (`:115`, `:142` StorySection, `:201`, `:223`) separated only by the chassis hairline delimiter. The user's bar — "each sub-section in its OWN glassy card" — is unmet: the tier-tile grid, the grain tile, and the token readout are NOT wrapped in glass cards; they're undelimited content blocks. Only the middle "ladder" section has a wrapping plate (the gradient field `:149`), and even that is a flat opaque-ish gradient div, not a glass card.
- **Main card area is NOT bigger.** The tier tiles are `h-48` (192px), the ladder plates `min-h-56` (224px live-measured), the grain tile `h-40` (160px). These are small fixed-height rectangles. Article width is 1152px in a 1440px viewport (the standard `--story-page-max-inline` bound — acceptable), but the demo SURFACES inside are cramped fixed-height tiles. The user wants "the main card area BIGGER (more screen space)" — the focal glass specimen should be a large, dominant live card, not a 192px tile in a 4-up grid.

## (5) PATH-LABEL standardization

**PASS.** The subpath chip renders `/foundations/paper-glass` live (StoryHeader chip via `manifest.ts:212` `"foundations/paper-glass": "/foundations/paper-glass"`). No in-SFC hand-rolled path label exists; the standardized chassis chip is used. No action needed.

## (6) LANGUAGE — superfluous prose

**Tighten.** The SFC carries three multi-line interface/comment blocks that over-explain:
- `:7-9` "The paper-vs-glass tour declares a paper-grain wash on its manifest row; the page chassis renders it behind a glassy hero card..." — superfluous (restates the manifest).
- `:19-21` "Each rung-over-colour plate carries its own paper-grain so the same five tiers read as five distinct translucent surfaces over a vivid field rather than five identical white rectangles." — the "rather than five identical white rectangles" editorializing; tighten.
- `:140-141` comment + the `role` strings on the plates ("the thinnest rung — the field reads almost clean through it", `:73`) are fine as labels but the duplicated tier-role prose between `tiers[]` (`:36`) and `paperGlassPlates[]` (`:73`) is redundant — two parallel role-string tables for the same five tiers.
- The blurb "Four glass tiers, paper grain, blend modes." (manifest `:499`) says "Four" but the page shows FIVE tiers (wash/quiet/resting/floating/overlay) — **factual mismatch**, fix to "Five glass tiers" or drop the count.

## (7) BUGS

- **Blurb count bug**: manifest blurb says "Four glass tiers" (`manifest.ts:499`) but `tiers[]` has five entries (`paper-glass.vue:30-66`). Cosmetic but wrong.
- **"blend modes" claimed, none shown**: the blurb promises "blend modes" but the SFC has zero `mix-blend-mode`/`background-blend-mode` — the grain overlay is plain opacity. Dead claim.
- **No genuine dead-demo / broken-animation** — the static content renders correctly; the defect is that it's static by design, not broken.
- (Audit note: chrome-devtools tab-thrash gave one contaminated screenshot showing a `/motion/deck` overlay; re-probed in isolation — the paper-glass DOM is clean, `canvasCount: 0`, 3 ladder cards at 224px confirmed.)

---

## Rebuild recommendation (architectural, not patch)
1. Flip the manifest background to a LIVE field (`background: "aurora"`) OR mount a `tier="field"` `<ShowcaseFrame>` hosting a real `<Aurora>` behind the ladder so the six-layer composite reads (BG-2 fix, on-spec).
2. Wrap EACH sub-section in its own `<Card tier="...">` / `<ShowcaseFrame>` glass card — use the actual library `<Card>` primitive, not hand-rolled `glass-*` divs.
3. Make the focal specimen a BIG live card: one large `<Card>` morphing tier via a `<SegmentedTabs>` selector (contextual switching) over the live aurora, with `useLiquidReveal`/specular hover demoing the animation affordance.
4. Demo the new axes the page is literally about: `--glass-accent` per-instance rim, `.glass-deep`, the `surface="glass|veil|opaque"` axis, `.glass-lens` — one focal card per axis.
5. Add `.scroll-cascade` per-tile entrance + hover-lift so glass reads ALIVE.
6. Fix the blurb count ("Five glass tiers") + either demo blend modes or drop the claim.
