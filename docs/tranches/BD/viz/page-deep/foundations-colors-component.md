# Pass-E deep audit — foundations/colors (the COMPONENT layer)

**Route:** `/foundations/colors` · **Demo SFC:** `demo/stories/foundations/colors.vue`

## What this page actually demos (the real src)

`foundations/colors` is a TOKEN-TOUR page — its "component" is the **color token
system**, not a Vue component:

1. **`--section-color-0..12`** (13-stop jewel ramp) + **`--viz-{fourier,chebyshev,legendre,amber,green}`**
   + the core role tokens — all defined in `src/styles/tokens/color-radius.css §6/§6b`
   (light), `tokens/dark-arm.css` (dark fallback), `tokens/light-dark.css` (the
   `light-dark()` arm). Authored as perceptually-even **oklch** pairs. This is
   genuinely well-built — categorical jewel hues, hand-tuned L, BC.W-ACCENT-TONE
   already rebaselined `--section-color-5` for the 5.11:1 AA floor over warm-cream.
2. The demo chassis primitives: **`ShowcaseFrame`** (`demo/stories/ShowcaseFrame.vue`),
   **`StorySection`** / **`StoryPage`**.
3. The motion register **`.scroll-cascade` / `.scroll-cascade--columns`**
   (`src/styles/scroll-choreography.css`).

Because the page paints with raw `<div>` swatches reading `var(--token)`, the
component-layer audit is of (a) the cascade motion register and (b) the demo chassis
the page leans on. Findings below are scoped to those + the token system.

---

## Findings (audit dimensions 1-6)

### F1 — ANIMATION · `.scroll-cascade--columns` stagger is DEAD (the `* 0` no-op) — JANKY/MISSING
`scroll-choreography.css:190-197`: the column variant's `animation-range` is
`calc(var(--scroll-cascade-range-end, 45%) + var(--scroll-cascade-column-stagger, 60ms) * 0)`.
The `* 0` zeroes the stagger term — the per-child `--col` index the page sets
(`colors.vue:70`, `:style="{ '--col': i }"`) is **never read**, and the
`--scroll-cascade-column-stagger` token is multiplied to nothing. The even/odd
direction-flip (`gl-cascade-build-col-even`) works; the *Codrops column-offset stagger*
the comment promises does not. The 13 rainbow stops therefore all enter on the SAME
view()-window — no per-column cadence. Dead-code / non-idiomatic placeholder left in
a shipped register. (Also: `--col` is set but consumed by nothing — the page declares
a variable the CSS never reads.)
→ **MODIFY `BD.W-TOKEN-TOUR-GLASS`** (Arm A is already retouching this page's wrappers;
add a sub-clause to repair the column-stagger: either drive `animation-delay` off
`--col * --scroll-cascade-column-stagger` or `animation-range-start` off `--col`, and
make `--col` load-bearing — with a gate bite that the stagger token is non-zero-multiplied).

### F2 — GLASS SIX-LAYER COMPOSITE · ABSENT — the sub-sections are NOT glassy cards
The user's binding ask ("each sub-section in its OWN glassy card; glass demos over
COLORFUL aurora backgrounds") is unmet. `StorySection` is a bare `flex flex-col`
wrapper (zero chrome — verified `StorySection.vue:1-60`). The swatch hosts use
`ShowcaseFrame tier="quiet"` = `bg-card/40 border-border/40` — a HALF-OPAQUE plate,
**not** a glass tier: no `glass-quiet`, no `backdrop-filter` blur+saturate, no edge
rim, no inner catch-light — i.e. NONE of the six-layer optical composite DESIGN.md
mandates. The page background is `foundations → "paper"` (manifest `CATEGORY_DEFAULT_BG`,
`:182`) — a static paper wash, NOT a colorful aurora. So there is no field for glass to
refract and no glass to refract it.
→ **AUGMENT `BD.W-TOKEN-TOUR-GLASS`** (Arm B already books a BC glass-band demo on a
foundations page, but onto `paper-glass.vue`, not `colors`). Extend its scope (or mint a
sibling BD wave) to: wrap each `StorySection` of `colors` in a real `<Card tier="floating">`
glassy card over a contained-or-page aurora field via `ShowcaseFrame tier="field"`, so the
13-stop ramp + viz glyphs read as glass-over-color. Respect the one-GL-per-route budget
(one contained `<Aurora>` behind the page, offscreen-paused, NOT N contexts).

### F3 — PAGE-IDENTITY HEADER · colors.vue is OUTSIDE the 36-file fold
`grep IconChip|borderLeft|section-label--tinted colors.vue` = 1 (incidental). The page
opens with a bare `<StorySection label="Foundations · Color">` — it does NOT carry the
canonical accent-rail + `<IconChip :section>` page-identity header the 36 forms/data/etc
pages do (`BD.W-PAGE-HEADER-FOLD` set). So the color page — the literal HOME of the section
ramp — has the WEAKEST identity affordance of any page. The user's "standardize the
import-path label" + "deftly uses a series of glass-ui components" both point here.
→ **MODIFY `BD.W-PAGE-HEADER-FOLD`**: add `foundations/colors` to the enrolled fold set
(it should lead with the folded `StoryPageHeader` :icon/:section/:eyebrow/:blurb cluster,
:section=6 tomato or its own stop) so it gains the IconChip identity + the standardized
import-path label the user asked for.

### F4 — PERFORMANCE · compositor-clean, but a hover micro-thrash on core grid
`.scroll-cascade` is compositor-only (transform+opacity, view() timeline, PRM-gated under
`@supports`+`prefers-reduced-motion: no-preference` — correct). No layout-thrash in the
register. The ONE smell: the core-roles grid hover (`colors.vue:133-138`) is
`hover:-translate-x-px hover:-translate-y-px` on `transition-transform duration-fast` —
fine — but it is a raw demo-local hover, NOT the library's four-state contract / a glass
press register. No offscreen-pause concern (no GL on this page). No procedural viz here
(dimension 2 = N/A — this is a token page; aurora/blob/fourier specs do not apply).
→ **FOLD into `BD.W-TOKEN-TOUR-GLASS`**: when F2's glass cards land, route the hover lift
through the shipped `.glass-press` / four-state register instead of the raw `-translate`
paste.

### F5 — SAFARI · the token system is clean; the GL ask must gate
oklch tokens + `light-dark()` + `@property` registers are all Safari 26+ baseline. The
`.scroll-cascade` `view()`/`animation-range` register is `@supports`-gated (degrades to
terminal state — safe). IF F2's glass-over-aurora lands, the `.glass-lens` squircle
refraction is `@supports (backdrop-filter: url(#…))`-gated (off-Chromium reads the blur
base) — DESIGN.md's glass-cannot-sample-glass + the deep-glass `saturate(1.5) blur(16px)`
are Safari-safe; the SVG-displacement lens is the only progressive-enhancement leg.
→ no new wave — covered by `BD.W-DEEP-GLASS-20PX` + `BD.W-GLASS-LENS-CHROMA` fences if F2 adopts them.

### F6 — IDIOMATIC / NO-LEGACY · two transpose targets
(a) **`--col` declared-but-unread** (F1) — a dead variable + a `* 0` no-op is exactly the
non-idiomatic dual-/dead-path the tranche forbids; transpose to a live stagger.
(b) **The page demos color with raw `<div>` swatches** — idiomatic for a pure token sheet,
but the user wants it to "deftly use a series of glass-ui components (docks/cards/tabs)".
The DOCK ask (contextual switching between the three sub-sections — ramp / viz / roles —
as dock-driven tabs, or the section ramp surfaced as a dock contextual-facet rail) is
entirely unaddressed by any BD wave for this page. The viz-basis glyphs (`ℱ/T/P`) are
display-register letters faked inline — a candidate to compose the real `<IconChip>` or a
section-tinted `<SelectableChip>` (BC.W-ACCENT-TONE) rather than a styled `<div>`.
→ **AUGMENT (new BD wave or extend `BD.W-TOKEN-TOUR-GLASS`)**: a `colors` page that (i)
switches ramp/viz/roles via `<SegmentedTabs variant="pill">` or a `<DockStack mode="facets">`
contextual rail keyed to the `--section-color` hues (the per-facet `--glass-accent` the
BE.W-DOCK-RAIL-REALIZE register already ships), (ii) bigger main card area
(`maxInline` override on StoryPage), (iii) `<IconChip>` for the viz glyphs.

---

## Verdict map (each finding → disposition on BD)

| # | Finding | Disposition | Wave |
|---|---------|-------------|------|
| F1 | `.scroll-cascade--columns` stagger `* 0` dead, `--col` unread | MODIFY | BD.W-TOKEN-TOUR-GLASS |
| F2 | No glass six-layer cards; no aurora field | AUGMENT | BD.W-TOKEN-TOUR-GLASS (+ deep-glass/lens fences) |
| F3 | colors outside the page-identity header fold | MODIFY | BD.W-PAGE-HEADER-FOLD |
| F4 | raw hover lift, not four-state/press register | FOLD | BD.W-TOKEN-TOUR-GLASS |
| F5 | Safari: gate the GL/lens leg (if F2 lands) | — (fenced) | BD.W-DEEP-GLASS-20PX / W-GLASS-LENS-CHROMA |
| F6 | dock/tabs/IconChip ask unaddressed; `--col` dead var | AUGMENT | new BD wave OR extend BD.W-TOKEN-TOUR-GLASS |
