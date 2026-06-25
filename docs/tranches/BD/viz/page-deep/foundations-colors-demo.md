# Pass-E deep audit — foundations/colors

- **Route**: `/foundations/colors` · **SFC**: `demo/stories/foundations/colors.vue` · **Live**: http://localhost:5173/foundations/colors
- **Manifest**: `demo/stories/manifest.ts:474` (`s("foundations","colors","Colors","Warm cream, 13-stop section palette, viz basis.")`), depth `D2` (category main), `heroScale` resolves `5`, `subpath` `/foundations/colors`.
- **Background**: NO explicit `background` on the row → inherits `CATEGORY_DEFAULT_BG.foundations = "paper"` (`manifest.ts:182`). The page is a FLAT paper wash — **not** a live colorful aurora field.
- **Verdict header**: structurally thin (ONE body card holding 3 hairline-delimited sections, not per-section cards), glass demoed over a DEAD paper substrate, the focal rainbow is BROKEN (stuck mid-animation), zero glass-ui component composition (no dock/tabs/buttons/procedural-anim), wide dead margin. See verdict.

---

## (7) BUG — FOCAL — the rainbow `.scroll-cascade--columns` entrance never settles [P0]

The 13-stop ramp is the **focal moment** (promoted FIRST in source order, `colors.vue:62-78`) and it renders **permanently half-faded and mis-aligned**.

Live readback (scrolled to top, rainbow fully in view at `top=448px`, `vh=806`):
```
all 13 stops:  opacity: 0.402231   transform: translateY(±11.9554px)   (even +Y, odd -Y)
```
Every stop is frozen at `opacity 0.40` with the alternating ±11.9px column offset — it never reaches `opacity 1 / translateY 0`.

**Root cause** (`src/styles/scroll-choreography.css:154-208`): `.scroll-cascade--columns > *` drives the build off `animation-timeline: view(block)` + `animation-range: entry 0% … 45%`. A `view()` timeline measures the element's *entry into the scrollport*. The rainbow is the FIRST body element, so on a fresh page (scrolled to top) it is ALREADY fully in view without any scroll having occurred — the `entry` progress sits stuck partway (≈40%) and the keyframe never advances to its terminal frame. The focal asset of a COLORS page is rendered half-transparent with a jagged even/odd vertical zig-zag (visible in the screenshot: stops 1, 3, 5… ride higher than 0, 2, 4…).

This is the canonical "canon-on-paper / muddy-in-render" gap (MEMORY: live-π / gestalt). A `.scroll-cascade--columns` register that is keyed to scroll entry must NOT host an always-above-the-fold focal element; either (a) the rainbow uses a mount-on entrance (the `.scroll-build` `@keyframes`-on-mount register, which fires on route-mount not scroll-entry — `scroll-choreography.css:52`), or (b) `animation-range` must include an `entry-crossing 0% cover …` clause that resolves to terminal when the element is already covered. As-is the page's HERO swatches are visibly broken at rest.

---

## (4) STRUCTURE — main card too narrow + sub-sections share ONE card [P1]

- **Main card area not BIG enough.** `article` `max-inline-size: var(--story-page-max-inline)` resolves to **1152px** (`StoryPage.vue:87`) on a 1440px viewport → ~288px of dead horizontal margin. The user mandate is "the main card area BIGGER (more screen space)." The 13-stop rainbow is cramped into 1152px (each swatch ≈75px) when the page could give it the full width.
- **Sub-sections are NOT each in their own glassy card.** Live: all 3 sections (`Section ramp`, `Viz basis`, `Core roles`) live inside ONE `rounded-card` body plate (`backdrop: blur(10px) saturate(1.05)`, bg α 0.664) and are merely separated by `.story-sections--delimited` hairline rules (`StoryPage.vue:166-175`). The user mandate is explicit: "each sub-section in its OWN glassy card." Today each `StorySection` is a bare `<section class="flex flex-col">` (`StorySection.vue:71`) — no card chrome. The Viz-basis and Core-roles grids DO use `<ShowcaseFrame>` per-TILE, but the SECTION itself is plate-less.

The correct gestalt: each `StorySection` wrapped in its own glass card (a `ShowcaseFrame tier="quiet"` or a `glass-card` section shell), the three cards stacked over a live field so each reads as a distinct glassy pane.

---

## (3) GLASS SUFFUSION — glass over a DEAD paper wash, blur wasted [P1]

- The body card carries real `backdrop-filter: blur(10px) saturate(1.05)` but the substrate behind it is `story-bg-paper paper-grain-overlay` (`manifest.ts:182`) — a flat near-white wash. `hasCanvas: false` (no GL). **Glass over a flat field has nothing to refract** — the morphism does not read (CLAUDE.md AX.W54: "the blur is imperceptible over a flat substrate"). The user mandate: "glass demos over COLORFUL aurora backgrounds."
- A COLORS page is the single best candidate for a live colorful field — the section ramp + viz hues ARE the page's subject. Putting the glass panes over a live `<Aurora>` (or even a `constellation`) would let the glass refraction read AND tie the backdrop to the content. The one-GL-per-route budget (CLAUDE.md) is available — this route spends zero.
- **PAPER morphism**: present (`paper-grain-overlay`) but it is the WHOLE-page wash, not a deliberate paper-card register beside a glass-card register. The page does not contrast the two morphisms; it is mono-paper.

---

## (1) DEMO CONGRUENCE — does NOT exercise the dock/animation/contextual APIs [P1]

- The page is a static swatch sheet. It shows the `--section-color-*` ramp + `--viz-*` basis + core role tokens. That is correct *content*, but the user mandate is "leverage the dock APIs (contextual switching/animating)" and "deftly uses a SERIES of glass-ui components."
- **Zero dock usage.** A colors page is the natural home for the dock's contextual-switching API: a `<DockStack mode="facets">` (BE.W-DOCK-RAIL-REALIZE) where each facet chip carries its OWN `--glass-accent` hue from the section ramp would be a literal demonstration of the per-instance chromatic-rim axis (BB.W-GLASS-ACCENT) AND a contextual switcher between palette views (ramp / viz / roles). The page references NONE of the dock APIs.
- **No tabs.** The three views (ramp / viz / core) are an obvious `<SegmentedTabs>` contextual-switch case (variant="pill" glass material, BA.W-TABS) — a colors page could switch between palette registers with the elastic indicator instead of a flat vertical stack.
- **No procedural anim.** A colors page could host a procedural viz tinted by the ramp (the aurora consumes the section palette) as the live field — folding requirement (3) and (1) together.
- **No buttons / copy-to-clipboard.** Each swatch is a dead `<div>`. A best-in-class color tour makes each chip a `<Button variant="glass">` that copies the token (`bg-section-7`) on click with a press register + a toast — the high-animation-affordance bar (DESIGN.md). Today the only interaction is the Core-roles tiles' 1px hover nudge (`colors.vue:133-138`).

## (2) COMPONENT ABILITY — thin/flat [P1]

Composes only `StoryPage` / `StorySection` / `ShowcaseFrame` + bare `<div>` swatches. No `GlassDock`, no `DockStack`, no `SegmentedTabs`, no `<Button>`, no `Aurora`/procedural viz, no `IconChip` (the comment at `colors.vue:6` CLAIMS "viz-basis glyphs pop in on the IconChip `:reveal` axis" but the SFC uses bare `<div>` glyph letters — `colors.vue:99-107` — NOT `<IconChip>`; the comment is stale/aspirational). The page is a flat token sheet, the antithesis of "deftly composes a SERIES of glass-ui components."

---

## (5) PATH-LABEL — standardized, OK [PASS]

The subpath chip renders `/foundations/colors` (screenshot, Fira-Code chip). Matches `SUBPATHS["foundations/colors"] = "/foundations/colors"` (`manifest.ts:207`). This is a token/ink page with no published import surface, so the route-path label is correct per the subpath-resolution rule. No action.

---

## (6) LANGUAGE — minor tightening [P2]

- `colors.vue:57-61` blurb: "The brand's vibrant register; the role tokens below stay documentary-monochrome." — the "documentary-monochrome" meta-commentary is internal-rationale leaking into demo copy. Tighten to the token fact: "The chapter palette — `--section-color-0..12`, as `bg-section-N`."
- The SFC header comment (`colors.vue:2-11`) is a 10-line wave-rationale essay — fine as a code comment but note the IconChip claim (line 6) is now FALSE (see §2); reconcile or remove.
- `StorySection heading="Section ramp · 13 stops"` + the eyebrow `label="Foundations · Color"` duplicate the page eyebrow `FOUNDATIONS · COLORS` already shown above the title — redundant chrome. The first StorySection's eyebrow can drop.

---

## Concrete fix sketch (architectural, not a patch)

1. **Kill the rainbow bug**: move the focal ramp off `.scroll-cascade--columns` (scroll-entry-keyed) onto the mount-keyed `.scroll-build` register OR add an `entry-crossing`/`cover`-aware `animation-range` so an above-the-fold element resolves terminal. (P0)
2. **Live field**: give the row `background: { kind: "aurora", palette: <ramp-derived> }` so the glass panes refract a colorful field. (P1)
3. **Per-section glass cards**: wrap each `StorySection` body in its own `ShowcaseFrame tier="quiet"`/glass-card pane; three stacked glassy cards over the field. (P1)
4. **Wider main**: lift `--story-page-max-inline` for this token-tour route (or a `contentClass` widen) so the 13-stop ramp breathes. (P1)
5. **Compose components**: a `<SegmentedTabs variant="pill">` (or `<DockStack mode="facets">` with per-chip `--glass-accent` from the ramp) to switch ramp/viz/roles; each swatch a `<Button variant="glass">` copy-token affordance with press + toast; `<IconChip>` for the viz glyphs (make the stale comment true). (P1)
