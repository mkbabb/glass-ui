# Page audit — FOUNDATIONS (13 pages)

Branch `prototype/liquid-dock`. PLANNING audit, no src edits. Live spot-checked at
`:5173` (`/foundations/shadows`, `/foundations/radii`). The KISS/DRY headline:
**every foundations page uses the shared chassis** (`StoryPage` → `StoryHero` →
`StorySection`/`ShowcaseFrame`) — zero hand-rolled page scaffolds. So **all four
structural defects (header-scale · dividing-line · paper-morphism · background)
are ONE-chassis fixes** that propagate to 13 pages from a single seam. The
per-page work is minimal.

## The 13 pages + chassis usage

| page | bg (resolved) | hero? | uses chassis | per-page bug |
|---|---|---|---|---|
| intro | aurora | hero | StoryPage (3 refs) | front-door D0; ok |
| colors | paper (cat default) | page | StoryPage/StorySection (16) | — |
| typography | paper (cat default) | page | StoryPage/StorySection/ShowcaseFrame (lots) | paper SPECIMEN page yet surfaces NO grain on its frames |
| radii | paper (cat default) | page | StoryPage/StorySection (9) | — |
| shadows | paper (cat default) | page | StoryPage/StorySection (9) | — |
| motion | constellation | page | StoryPage (8) | — |
| paper-glass | paper | hero | StoryPage + `paper-grain-overlay` ✓ | the ONLY page surfacing grain on content tiles |
| icons | paper (cat default) | page | StoryPage/StorySection (18) | — |
| surface-tints | paper (cat default) | page | StoryPage/StorySection (9) | — |
| overlays-scrims | paper (cat default) | page | StoryPage/StorySection (12) | — |
| chart-chassis-palette | paper (cat default) | page | StoryPage/StorySection (22) | — |
| paper-texture | paper (cat default) | page | StoryPage + `PaperBackdrop` ✓ | grain demo trapped in 56px tiles, not the page material |
| css-utilities | paper (cat default) | page | StoryPage/StorySection (23) | — |

Category default background = **`paper`** (manifest.ts:182) → every page without an
explicit `background:` resolves `kind:"paper"` and StoryHero mounts the
`.story-bg-paper paper-grain-overlay` div FULL-BLEED behind the content
(StoryHero.vue:312-321). So foundations IS on the paper substrate by design — the
defect is that the substrate is INVISIBLE (below).

---

## DEFECT 1 — header 2x too large (→ W-HEADER-SCALE, ONE chassis fix)

**Binding live measure (`/foundations/shadows`, a D3 sub-page, 1440×900):**
the chrome `<h1>` resolves `text-display-4` → **`font-size: 86.1px`, box 90px tall**
(measured via getComputedStyle). The "Shadows" title fills ~half the band width.
The D2 main (`colors`) resolves `text-display-5` (68-110px). `intro` D0 = `mega`.

**Root cause — the depth→rung floor in `manifest.ts:453-456`:**
```
story.heroScale = depth === "D0" ? "mega" : depth === "D2" ? "5" : "4";
```
maps onto `text-display-${heroScale}` in StoryHero.vue:92. The clamps
(`src/styles/typography/scale.css:125-127`):
- `--type-display-4: clamp(3.33rem, 2.5rem + 4vw, 5.382rem)` → **53-86px**
- `--type-display-5: clamp(4.236rem, 3.5rem + 6vw, 6.854rem)` → **68-110px**

These are the LIBRARY audacious display ladder — correct for a hero/landing, **2x
too large as a demo page header** (a demo page header wants ~text-title/heading,
~30-40px). The addendum is explicit: halve the **demo header rung**, the library
ladder UNTOUCHED.

**Fix (ONE seam):** introduce a demo header rung (`--story-header-h1`, ~`text-title`
/ `text-heading` for D3, `text-display`/`-2` for D2/D0) OR re-map
`manifest.ts:453-456` down ~2 rungs (D3 `4`→`title`/`heading`, D2 `5`→`display`,
D0 `mega`→`display-2`). Single edit at the heroScale resolver + the
`heroClass`/title `<h1>` class binding (StoryHero.vue:92 / StoryPage.vue:109-119).
The full-bleed live-hero pages (intro) may keep a larger rung as their marquee
moment — keep the explicit `heroScale:"hero"` override path (manifest.ts:453 `if
(!story.heroScale)`), so the override is honored. **ONE chassis fix, 13 pages.**

## DEFECT 2 — no dividing line below the header (→ W-PAGE-CHASSIS, ONE chassis fix)

**Binding live measure:** both `<header>` and `.story-header-cluster` resolve
`border-bottom: 0px solid` (getComputedStyle). There is NO `--story-header-rule`
token, NO header-bottom rule anywhere (grep of `story-hero.css` / `StoryPage.vue`
/ `StoryHeader.vue` for `header-rule`/`border-block-end` = ZERO hits). The title
floats with no visual separation from the body card.

**Note the asymmetry:** the IN-BODY section delimiter DOES paint — the
`.story-sections--delimited > * + *` rule (story-hero.css:428) draws a
`1px color(srgb …/0.55)` hairline between body sections (confirmed live + visible
in the screenshot above the "Cartoon lift" section). So the chassis already speaks
the hairline vocabulary; it just doesn't draw the HEADER→body rule.

**Fix (ONE seam):** add a `--story-header-rule` hairline below the StoryHeader
cluster — a `border-block-end` / `::after` on `.story-hero-cluster` (or the
`<header>` on the content path) reading the dark-adaptive `--configurator-divider`
token (the SAME token the in-body seam already uses, so it survives the dark glass
plate — never an inline `border-border/N`). The addendum folds this into
W-PAGE-CHASSIS. **ONE chassis edit, 118 pages.** GATE: getComputedStyle
header-border ≥ 1px on the dark-adaptive token.

## DEFECT 3 — NO paper grain/grit anywhere (→ W-PAPER-MORPHISM, foundations is the PAPER HOME)

**Binding live measure (`/foundations/shadows`):**
- `--glass-grain-opacity: 0.025` (2.5%), `mix-blend-mode: overlay` on the
  `paper-grain-overlay ::after` — **imperceptible** over the cream page. This is
  why the user reads "no grain anywhere": it technically paints, but at 2.5%
  overlay-blend it is invisible.
- `--story-paper-wash: transparent` in LIGHT mode (story-hero.css:362) — so in
  light there is NO paper tint at all under the ~invisible grain. Only the dark
  arm lifts it.
- The full-bleed grain is BEHIND the content card, which is `glass-resting`
  (`oklab(0.93 … / 0.664)`, 66% opaque cream) — so even the faint grain is
  **occluded by the content plate**. Screenshot: the entire page reads as flat
  cream, zero grit.

**The deeper finding — paper is a BACKGROUND wash, never a MATERIAL on the
specimen surfaces.** Only 2 of 13 pages surface grain on actual content:
- `paper-glass.vue` (the 5 tier tiles carry `paper-grain-overlay` directly,
  lines 123/171) — the one page where grain reads on a surface.
- `paper-texture.vue` (`<PaperBackdrop>` in 56px-152px tiles) — the grain is
  demoed as a swatch trapped in small frames, not as the page material.

The other 11 foundations pages have grain ONLY as the invisible full-bleed bg the
card covers. **Foundations is THE paper home** (the type/print-specimen, the token
tours) — per the design language the paper grit should READ on these pages.

**Fix (chassis + a couple of per-page promotions):**
1. **ONE chassis fix (W-PAPER-MORPHISM):** lift the paper register so it READS —
   raise `--glass-grain-opacity` on the paper-substrate (or a dedicated
   `--story-paper-grain` rung above 2.5%) AND give the LIGHT-mode
   `--story-paper-wash` a faint warm-cream tint (it's `transparent` now) so the
   paper substrate is a visible material, not a no-op. This propagates to all 11
   default-paper pages. GATE: the rendered grain delta ≥ a perceptible floor
   (getImageData variance on the paper bg, not just "the token is present").
2. **ShowcaseFrame already ships `grain?: boolean`** (ShowcaseFrame.vue:48,110 →
   `paper-grain-overlay`) but NO foundations page passes it. The print-specimen
   pages (typography, colors, radii, shadows, surface-tints) should pass
   `grain` / `tier="quiet"` on their specimen frames so the grit reads on the
   demo surfaces — a 1-prop per-page touch, not a rewrite. This is the
   "type/print-specimen pages are the paper home" call.
3. **typography.vue is the worst miss** — it's the editorial TYPE SPECIMEN
   (the paper-pillar page par excellence) yet its `ShowcaseFrame`s are
   `tier="field"`/`tier="quiet"` with NO grain (typography.vue:79-124). The
   print-specimen should sit ON paper. Per-page: add `grain` to its specimen
   frames.

## DEFECT 4 — engaging background (→ W-PAGE-BACKGROUND, mostly already wired)

Foundations is correctly the CALM band per the design language — `paper`
(default) / `grid` / `constellation` (motion) / `aurora` (intro hero). This is
the right register (dense token pages ride the calm wash, not a GL field). The
real gap here is **DEFECT 3** — the calm paper wash is INVISIBLE, so the pages
read as a void rather than "calm paper." Fixing the paper-read (DEFECT 3) IS the
background fix for foundations. No per-page background work needed beyond making
paper read. `motion` (constellation) + `intro` (aurora hero) already have a live
field.

---

## Per-page bugs (genuinely per-page, NOT chassis)

- **typography.vue** — the paper-pillar page surfaces zero grain on its frames
  (all `tier="field"`/`quiet`, no `grain`). Promote its specimen frames onto
  paper (1-prop per frame). Also its focal `Aa` rides `text-display-audacious`
  inline (line 60) — that's the SPECIMEN content (correct, it's demoing the
  audacious tier), NOT the over-scaled header; leave it.
- **paper-texture.vue** — grain demoed in 56-152px tiles (lines 25,34,51-65,105).
  Correct as a register demo, but the page itself should also wear the grain as
  its material (compose ShowcaseFrame `grain` on its prose section). Minor.
- **paper-glass.vue** — the reference for grain-on-surface; KEEP. No bug.
- The remaining 9 pages (colors/radii/shadows/icons/surface-tints/overlays-scrims/
  chart-chassis-palette/css-utilities/motion) carry NO per-page bug — they inherit
  all four structural defects from the chassis and are fixed for free by the
  chassis waves. **This is the DRY win.**

## Verdict map (defect → wave → scope)

| defect | wave | scope | evidence |
|---|---|---|---|
| header 2x too large | **W-HEADER-SCALE** | ONE chassis (manifest heroScale floor + StoryHero class) | h1=86.1px live |
| no header dividing line | **W-PAGE-CHASSIS** | ONE chassis (`--story-header-rule` below cluster) | header border=0px live |
| no paper grain/grit | **W-PAPER-MORPHISM** | ONE chassis (lift grain-opacity + light paper-wash) + per-page `grain` prop on specimen frames | grain-opacity=0.025, paper-wash=transparent live |
| engaging background | **W-PAGE-BACKGROUND** | already wired; subsumed by W-PAPER-MORPHISM for foundations | paper bg present but invisible |
