# dock/rail — FRONTEND-DESIGN critique (Pass-E, design lens)

**Page**: `demo/stories/dock/rail.vue` · live `http://localhost:5173/dock/rail`
**Lens**: the frontend-design skill bar (distinctive · production-grade · AVOID generic-AI) applied to glass-ui's own language (DESIGN.md §L1–§L5, motion-canon, affordance-map, the dock-system APIs).
**Captured**: 1440×900 light (top/mid/bottom) + dark, computed-style probes (`_cap/dock-rail-*.png`).

This page exists to showcase the **vertical dock + the `<DockStack>` macOS hover-expand rail** — the single most distinctive, most-engineered surface in the dock band (BC.W-DOCK-STACK-RAIL → BE.W-DOCK-RAIL-REALIZE: the box-inviolate gutter fan, the per-facet `--glass-accent` rim, the one-registry `v-model`). It is the *demo for the headline rail mechanism*. Today it reads as **four near-identical grey dock circles stranded in a flat cream void**, with the marquee rail invisible until you happen to hover the right pixel, narrated by 110-word paragraphs. The substrate is correct; the *staging, the card-per-section, the aurora, the screen-spend, and the resting-state animation life are all under-spent*. This is the page the brief's structural asks map onto most literally — and almost none of them are met.

---

## 1. The verdict up front

- **The aurora exists on ONE of four sections.** Probe: `canvases === 1`. Only the "Vertical dock" specimen (§1) hosts an `<Aurora>`. Sections 2–4 (Rounded shape, Collapsible, Stack rail) sit on a **bare flat cream rectangle** (`backgroundColor: rgba(0,0,0,0)`, `border: 0px`, no frame). The brief's "glass demos over COLORFUL aurora backgrounds" is **3/4 unmet** — and the one aurora that *is* present resolved to the **2D/CSS software-raster fallback** (`canvas.getContext` returns a 2d context, not webgl2), so even §1 is a flat warm-peach wash, not a live multi-nuclei field. Glass over a one-color flat wash reads as a *tinted pill*, not a lensing layer (§L1: "surfaces are lensing layers, not blur swatches" — the lens has nothing to refract).
- **Zero card-per-section.** Every demo host is either a hairline-less `flex justify-start` (§2–4) or one `overflow-hidden rounded` aurora box (§1). The user's "each sub-section in its OWN glassy card" is **fully unmet** — there is no card to land the eye on, in any section. Three of four demos float in undifferentiated cream.
- **The main area is SMALLER, not bigger.** `articleMaxInline === 1152px` on a 1440px viewport → **288px of dead margin**. The user explicitly asked the main card area BIGGER (more screen space); the page gives a narrow column with vast empty side-gutters and vast empty *vertical* gutters inside each demo host (the Collapsible host is `min-h-18rem` of empty cream around one 54px circle).
- **The headline API is invisible at rest.** `<DockStack>` — the entire reason this page exists — renders as a **single collapsed circle** until hovered. The macOS fan, the per-facet accent rim (BE.W-DOCK-RAIL-REALIZE's `--glass-accent` chromatic context hue), the `active layer = assets` switch — none of it is visible in the resting capture. The page leverages the dock's richest API but *hides it behind a hover the user may never discover*. The marquee move must be **staged open, large, central**, not collapsed in a corner.
- **`DockLayerGroup show-rail=false` + a separate `DockStack` is doubled plumbing.** The page mounts a `<DockLayerGroup :show-rail="false">` (rail suppressed) AND a `<DockStack>` writing the same `railLayer` ref — two components for one mechanism, the layer group reduced to a dead state-holder. The cleaner BE.W-DOCK-RAIL-REALIZE shape is `<DockStack mode="facets">` as the single registry-and-render surface.

---

## 2. VISUAL HIERARCHY — correct scaffolding, flat interior, wrong title

**What works.** The hero `<h1>` resolves to **86.1px Plus Jakarta Sans** (`--type-display-4`) — the audacious √φ ladder lands on the page title. The eyebrow (`DOCK · VERTICAL DOCK`) + the Fira-Code subpath chip (`@mkbabb/glass-ui/dock`) is the correct three-rung StoryHeader cluster (W-HIERARCHY2). All four section `<h2>`s resolve to a consistent 20.4px / 600 `text-subheading`. The typographic *scaffolding* is right.

**What fails.**

- **The page title lies.** The H1 reads **"Vertical Dock"** — but the route is `dock/rail` and the page's *headline* section is the Stack rail. The most distinctive surface (the rail) is the LAST, smallest section; the title advertises the least distinctive one (a static vertical nav). Re-title the page **"Dock Rail"** (or "Stack Rail") and lead with the rail as the protagonist.
- **Four sections, four identical weights.** Vertical-dock, Rounded-shape, Collapsible, Stack-rail are all the same 20.4px heading + same grey paragraph + same lone-circle-in-void demo. There is **no protagonist**. The frontend-design bar demands one demo staged hero-scale (the live rail fan, or the collapse↔expand morph) with the utility demos (rounded-corner variant, separator) demoted to a tight supporting strip. Today "Rounded shape" (a corner-radius variant — trivial) gets equal billing with the rail (the engineering centerpiece).
- **The typography ladder dies at the H1.** DESIGN.md's "TYPOGRAPHY-forward / kinetically typographic" identity never enters the body. A `text-display-mega` "RAIL" wordmark behind the live fan, or the active-layer name (`Assets`) rendered at a poster rung as it switches, would make the interior *speak* the library's own audacious voice. Today the interior is 100% body+caption+code-chip.

---

## 3. STAGING / GLASS FIDELITY — the lens has nothing to refract (the highest-leverage failure)

DESIGN.md §L1 is unambiguous: glass *bends and concentrates light*; the six-layer composite (backdrop blur+saturate · tint · rim · catch-light · shadow · grain) only reads as iOS-26-liquid **over content worth refracting**, and §L5's worst-case-contrast rule assumes a *kinetic, varied* backdrop.

- **§1 (Vertical dock)** has an `<Aurora :config="DEFAULT_AURORA_CONFIG" :opacity-ceiling="0.4">` — but it fell to the **2D software-raster fallback** (probe-confirmed), so it paints a single flat warm-peach gradient. The dock's `backdrop-filter` blur has no structure to smear and the `saturate()` channel has no chroma to concentrate. The dock reads as a peach pill, not a lens.
- **§2–4** have **no backdrop at all** (`canvases === 1`). The dock glass sits over the page's flat cream `--neutral-0` — there is *literally nothing behind the glass*. §L1's "glass is imperceptible over a flat substrate" (CLAUDE.md AX.W54) is the live result: these docks read as grey-bordered circles, not glass.
- **Dark mode** collapses the §1 field to a muddy brown over near-black; the "colorful aurora" is gone (capture `dock-rail-dark.png`).

**The fix is the brief verbatim — "glass demos over COLORFUL aurora backgrounds."** Every demo host must run a **live, vivid, multi-nuclei aurora** (a procedural-suite vibrant palette, NOT the calm `DEFAULT_AURORA_CONFIG`), forced to the WebGL path (the 2D fallback must not be the demo's reality — investigate why it's degrading on this route; one GL context per route is the budget, so the four demos share ONE staged backdrop à la `<DockStage>`). The rail's per-facet `--glass-accent` hues (BE.W-DOCK-RAIL-REALIZE) then read as *chromatic context rims lensing a colored field* — the single move that turns this from a tinted-div demo into an Apple-grade glass showcase.

---

## 4. CARD-PER-SECTION + LAYOUT — no cards, a narrow column, empty hosts

The user's structural ask: **each sub-section in its OWN glassy card; the main card BIGGER.** Both unmet.

| § | Host | Reads as |
|---|---|---|
| 1 Vertical dock | `relative … overflow-hidden rounded` + 1 aurora | a peach box (only framed one) |
| 2 Rounded shape | bare `flex justify-start` | a circle floating in cream void |
| 3 Collapsible | `flex min-h-18rem` (empty) | a 54px circle in 288px of empty cream |
| 4 Stack rail | `flex min-h-20rem` (empty) | a collapsed circle + a paragraph |

**The resolution is the `surface="veil"` glass tier** — DESIGN.md ships exactly the right primitive for this kinetic-backdrop case. The **Wash/Quiet/veil tiers admit the backdrop through** (§L1 tier table: "permeable veil over a kinetic backdrop"). A `.glass-wash`/veil section card frames each demo as a *real glassy card* (rim + catch-light + grain) WHILE the colored aurora reads through it onto the dock — satisfying "own glassy card" AND "glass over the live field" at once, with zero occlusion. This is the architectural transposition (the affordance-map's stop-choosing-between-opaque-and-bare): use the veil tier the library already ships, not a hairline border and not an opaque `bg-card` plate.

**The empty vertical void** inside each host (`min-h-18rem`/`min-h-20rem` around a single small circle) is the worst offender against "BIGGER" — the demos are *tiny*, the *frames* are huge. Either scale the docks up (a hero-scale rail at 1.5–2×) or let the demo + a live readout + a poster-rung typographic anchor fill the card. **Width**: lift the 1152px cap toward the full generous bound on this showcase route — 288px of unused viewport on a rail-showcase page is the opposite of the ask.

---

## 5. ANIMATION AFFORDANCE — mechanism-alive, page-dead

Per affordance-map + motion-canon, every element should answer the pointer the same liquid way, and the flagship should *arrive*.

**Alive (good):** the dock controls carry the affordance floor — `DockIconButton` hover-lift (`--scale-hover-dock`), `v-specular` gleam, `:active` press-squish (`--scale-press-dock` 0.92, §L3), focus-ring. The collapse↔expand morph rides `--spring-dock` on its own clock (motion-canon P4). The `<DockStack>` fan springs open on `--spring-dock`, staggered, PRM-carved (§L2 snappy register). The *mechanics* honor the canon.

**Dead (the gap):**
- **No resting-state for the protagonist.** The rail's whole point is the *fan* — yet at rest it's a collapsed circle. A premium showcase shows the marquee animation *playing on a loop or fanned-by-default*, with the per-facet accent rims lit, so the eye sees the engineered move without hunting for the hover. (DESIGN.md §L4 "Appeal" — distinctive personality must be *visible*, not hover-gated.)
- **No entrance landing on the demos.** The page mounts inside `.scroll-cascade`, but the four demo hosts don't visibly *build in* — there's no per-demo gravity-rise landing on the docks (motion-canon "page assembles itself"). Each dock should bloom in on its own `--spring-snappy-duration` beat.
- **No live state-life.** The `active layer = assets` readout is a static mono caption that flips text. It should be a live animated value (the library ships `useAnimatedNumber`/`useCountup`/`SplitChars`), the switching facet should lift onto the selected-as-glass tier *visibly*, and the active accent hue should suffuse the readout (the one-color-event proportion, W-SUFFUSE).
- **The `<DockLayerGroup>` content is invisible.** With `show-rail=false` the layer panes never render visibly — the contextual-switch *animation* (the dock's marquee crossfade capability) is entirely absent from the page that is supposed to demonstrate "the dock APIs (contextual switching/animating)."

---

## 6. POLISH / DISTINCTIVENESS / COLOR — generic-AI tells

- **Three+ inconsistent host treatments down one column** (framed aurora box → bare flex → empty min-h flex) is the canonical generic-AI "wrapped each block in whatever was handy" tell the frontend-design skill warns against.
- **Color suffusion is absent.** Per W-SUFFUSE the dock band's ONE color event should read (the per-facet `--glass-accent` context hues on the rail). Today the only color is the §1 peach wash; the rail's chromatic-rim identity (the whole BE.W-DOCK-RAIL-REALIZE point) never paints because the rail is collapsed. The page is monochrome grey-on-cream — the opposite of "deftly uses a series of glass-ui components" with the suffusion proportion.
- **Prose-over-show.** Each section narrates the mechanism in 60–110 words (the Stack-rail blurb is 110 words explaining box-inviolate topology) instead of *showing* it. A flagship makes the rule visible (the fan extending into the gutter, captioned in one line), not a wall of architecture prose.
- **Import-path chip is already correct** (`@mkbabb/glass-ui/dock`, the subpath form) — but the in-SFC import is `from "../../../src/components/custom/dock"` (a deep relative path). Standardize the demo import to the published subpath label so the demo *is* the consumer example.

---

## 7. The TOP design moves (ranked, concrete)

1. **Stage ONE live colorful aurora behind ALL four demos** (a `<DockStage>`-style shared GL context, vivid multi-nuclei palette, forced WebGL — fix the 2D-fallback degrade). This is the single highest-leverage move: it makes every glass dock *lens a colored field* (§L1) and meets the brief's headline ask.
2. **Wrap each section in a `surface="veil"` glass card** (§L1 Wash/Quiet tier) — own glassy card AND backdrop-through, no occlusion. Kills the three-inconsistent-hosts generic-AI tell in one move.
3. **Make the rail the protagonist: fanned-open + hero-scale + per-facet accent rims lit at rest**, retitle the page "Dock Rail", and demote Rounded-shape/Vertical-nav to a tight supporting strip. The marquee API must be *seen*, not hover-discovered.
4. **Collapse `DockLayerGroup show-rail=false` + DockStack → one `<DockStack mode="facets">`** (BE.W-DOCK-RAIL-REALIZE) as the single registry-and-render surface; show the contextual-switch crossfade *animating* the active layer pane beside it.
5. **Lift the width cap + shrink the empty host voids**: bigger main area, bigger docks, live animated `active layer` readout (`useCountup`/`SplitChars`) with the active accent hue suffused. Wire `.scroll-cascade` to actually land a gravity-entrance on each card.
