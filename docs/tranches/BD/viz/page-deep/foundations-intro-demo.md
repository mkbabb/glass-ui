# Pass-E page-deep: `foundations/intro`

- **Import label (standardize to):** `/foundations/intro`
- **SFC:** `demo/stories/foundations/intro.vue`
- **Live:** http://localhost:5173/foundations/intro
- **Role:** the storybook FRONT DOOR (the lone D0 root; `hero: true`, `background: aurora rose-indigo-amber`, `:hero-title="false"` bespoke composition).
- **Audited:** source (intro.vue + StoryPage.vue + StoryHero.vue + SectionPreviewCard.vue + manifest row) + LIVE at 1440×900.

This page is NOT a component demo — it is the front-door INDEX (one audacious hero + an 11-card category grid). So the "does the demo exercise the component's full API" lens reads differently than a component page: the components ON SHOW are `<SectionPreviewCard>` (the bento), `<IconChip>` (the POP), `<Aurora>` (the field), and `<Card glass>` tiers. The audit applies the user's 7 bars to that index role.

---

## VERDICT SUMMARY

| Lens | State |
|---|---|
| 1 — Demo congruence (best + full API) | PARTIAL — the index is handsome but exercises a NARROW slice; no dock/tabs/procedural-anim/button composition |
| 2 — Component ability (series of glass-ui components) | THIN — 4 primitives (PreviewCard·IconChip·Aurora·Card); zero dock/tabs/buttons/viz |
| 3 — Glass suffusion (glass over live aurora) | STRONG on the cards, ABSENT on the hero (bare ink-on-field, no plate) |
| 4 — Structure (own glassy cards + big main area) | Cards: YES. Hero: NO card. Main area: hero EATS the first viewport |
| 5 — Path-label standardization | MISS — the page renders NO `/foundations/intro` chip; the card chips are package-imports |
| 6 — Language | TIGHT in render; source comments are heavy (cosmetic) |
| 7 — Bugs | 2 (title clips above-fold on entrance; hero "readability plate" is transparent — claim≠render) + 2 console warns |

---

## (1) DEMO CONGRUENCE — the index shows ONE register at its best, not a SERIES

The front-door's job is to PREVIEW the whole system. At HEAD it shows:
- a single `text-display-mega` hero (the type ladder — good, on-brand)
- a full-bleed `<Aurora>` (the substrate — good, colorful, one GL context, budget-clean)
- 11 `<SectionPreviewCard>` bento tiles, each with an `<IconChip>` POP + a Fira-Code subpath chip + a STILL glyph thumbnail (`.intro-cat-thumb`, intro.vue:122-127).

What it does NOT do — and the user's bar explicitly names: "each page deftly uses a SERIES of glass-ui components (docks/procedural-anims/cards/tabs/buttons)." The front door is the one page that SHOULD be a sampler, yet:
- **No dock contextual-switch demo.** The page never composes `<GlassDock>`/`<DockStack mode="facets">`/`<DockLayerGroup>` — the headline primitive, and the band the user most wants leveraged. The category index is a static grid; it could BE a `<DockStack>` context-carousel or a dock-driven contextual switch into each band (the dock APIs the prompt names: contextual-switching/animating).
- **No procedural-anim mini.** Every card preview is a frozen lucide glyph (intro.vue:104-112 → `.intro-cat-thumb`), NOT the marquee specimen `SectionPreviewCard` was built to host (its own header comment, SectionPreviewCard.vue:6-16, promises "a tiny live `<Button>` row, a mini glass card silhouette, a frozen aurora still"). The substrates card previews a `Droplet` glyph, not a frozen GooBlob/aurora still; the dock card previews a rectangle glyph, not a mini dock. **The preview seam is built and WIRED to glyphs only — the richest affordance on the card is unused.**
- **No tabs/buttons.** Zero `<SegmentedTabs>`, zero `<Button>` variants on show.

So the demo is congruent with "a type-forward front door" but UNDER-congruent with "a deft series of glass-ui components." The full API of `SectionPreviewCard` (the `#preview` live-specimen slot) is itself under-exercised.

## (2) COMPONENT ABILITY — thin

Four components compose the page (PreviewCard, IconChip, Aurora, Card-tier). That is a real composition (not flat), but it is the THINNEST front door the system could ship given the band: the dock, tabs, procedural-suite, and button families — all shipped, all demo-able over the same aurora — are absent. The lead/rest grid rhythm (intro.vue:31-50, `lead: idx===0` → `sm:col-span-2`) is a nice touch and reads live (Foundations spans 2 cols).

## (3) GLASS SUFFUSION — strong on cards, ABSENT on the hero

- **Cards: YES.** Each `<SectionPreviewCard>` is `glass-resting paper-grain-overlay` (SectionPreviewCard.vue:55) over the FULL-BLEED live aurora — GLASS + PAPER morphism both, and the field reads THROUGH the resting tier (verified live: the rose/indigo/amber drift is visible behind every tile). This is the page's strongest design moment and exactly the user's bar.
- **Hero: NO.** The hero (eyebrow + `text-display-mega` h1 + blurb) floats on a TRANSPARENT `.story-hero-bleed-content` (verified live: `backgroundColor: rgba(0,0,0,0)`, `backdropFilter: none`). StoryHero.vue:323-325 comments "the content floats DIRECTLY over the live field on a thin readability plate" — **there is no plate at render** (the `.story-hero-bleed-content` carries `--glass-backdrop: light` for the W55 bucket but paints no glass surface). The hero is bare ink-on-aurora. It is legible only because the rose-indigo-amber palette is bright; it does NOT demo glass on the page's hero moment, and on a darker palette the AA would be at risk.

## (4) STRUCTURE — cards good; the main area is EATEN by the hero

- **Own glassy card per sub-section: cards YES, hero NO** (see §3). The 11 categories each get their own glass card — the user's bar met for the index. The hero "sub-section" is the exception (no card).
- **Main card area BIGGER (the user's explicit ask):** the front door has the inverse problem. The `text-display-mega` h1 is **177.4px font / 186.3px line-height × 3 lines = 745px tall** (measured live), seated at top 223 in an 806px viewport → the hero ALONE consumes the entire first screen, pushing the eyebrow's-purpose CONTENT (the category grid, the page's actual function) entirely below the fold (grid top ≈ 1356px; you must scroll ~1180px to reach the lead card). For an INDEX page whose value is the grid, the giant title starves the "main area" the user wants bigger. Recommend dropping the front-door hero to `text-display-hero`/`-5` (or a 2-line max) so the grid lifts into the first viewport.

## (5) PATH-LABEL — non-standard

The page renders NO `/foundations/intro` path label. The bespoke hero (`:hero-title="false"`) shows only the eyebrow `ℱ glass-ui · storybook` (intro.vue:68-70) — it bypasses StoryPage's standardized subpath-chip chassis (the Fira-Code `subpath` chip every CONTENT page carries via StoryHeader). The manifest DOES define `"foundations/intro": "/foundations/intro"` (manifest.ts:206) but the SFC never threads/renders it. The card subpath chips ARE present but they are PACKAGE-IMPORT labels (`@mkbabb/glass-ui/styles`, `/aurora`, `/dock`, …), not route paths — a DIFFERENT label axis. Standardize: render the `/foundations/intro` route chip in the hero eyebrow row (or restore the chassis subpath chip on the front door).

## (6) LANGUAGE

- **Render prose is tight** — the hero blurb (intro.vue:76-80) and the 11 SUMMARIES (intro.vue:17-29) are one-line each, no grandiloquence.
- **Source comments are HEAVY** (cosmetic, not user-facing): intro.vue:8-37 and SectionPreviewCard.vue:1-21 carry long tranche-archaeology blocks (BC.W-HERO-AUDACIOUS / BC.W-PAGE-CHASSIS lineage). Tighten if a comment pass is in scope; zero render impact.

## (7) BUGS

1. **Title clips above-fold on entrance (transient).** First-paint screenshot shows "Glass, paper, and" cut off above the viewport — the `.scroll-build` entrance keyframe seats the h1 at top -957 mid-flight (measured), settling to top 223. The clip is a one-frame entrance artifact, but combined with §4 it reads as a broken hero on load. Root: the 745px title + the entrance translate exceed the scroller top.
2. **Hero "readability plate" is a no-op** (§3) — the StoryHero comment promises a plate; the element paints transparent. Either render the plate (glass-first the hero, satisfying the user's glass-over-aurora bar) or fix the comment.
3. **Console warn — `<Transition>` non-element root** (msgid 117): `StoryPage`'s `TooltipProvider` root is a fragment under the route `<Transition name="fade-slide">` → "renders non-element root node that cannot be animated." Chassis-level, but fires on this page; the route fade-slide silently no-ops on the front door.
4. **Console warn — aurora deferred-init with no `onInitError`** (msgid 118): a WebGL/shader failure on this page would surface as an unhandled rejection. Pass `runtimeOptions.onInitError` on the hero `<Aurora>`.

---

## RECOMMENDATIONS (architectural, not patches)

1. **Make the front door a SAMPLER.** Compose the dock (a `<DockStack mode="facets">` context-carousel driving the category switch, OR a `<GlassDock>` rail navigating bands) + restore the live `#preview` specimens (mini button row / frozen viz still / dock silhouette) the `SectionPreviewCard` seam already exposes — exercise the dock/tabs/button/procedural-anim series the user named.
2. **Glass-first the hero.** Wrap the hero eyebrow+title+blurb in a real thin glass plate (the comment's promise) so the page's HEADLINE moment demos the morphism over the aurora, not bare ink.
3. **Right-size the title** so the category grid (the page's function) lifts into the first viewport — the user's "main area bigger" bar.
4. **Render the `/foundations/intro` route chip** for path-label uniformity with the content pages.
