# BD page-audit — NAVIGATION (4 pages)

Branch `prototype/liquid-dock`. PLANNING audit, no src edits. Live-confirmed at `:5173` (chrome-devtools, both modes).

The 4 navigation pages (manifest.ts:848-873): `tabs` (D2 main), `carousel`, `header-ribbon`, `toc-tracking` (D3 subs). The DOCK band is a SEPARATE category (manifest.ts:876+) — navigation does NOT host the dock; the cross-ref below confirms the nav demos carry NO dock dependency.

## (1) CONFIRM the shared chassis is used (DRY)

All 4 pages compose `<StoryPage>` + `<StorySection>` (zero hand-rolled `StoryHero`/`StoryHeader`). The manifest-driven `StoryHeader` cluster (eyebrow → subpath chip → display `<h1>` → blurb) renders on every page. **DRY = mostly-CONFIRMED for the page shell, with ONE category-wide hand-roll defect** (the duplicate-header, §3 bug N1).

## (2) The 6 shared-chassis defects — ALL APPLY (fixed for free)

| Defect | Confirmed on navigation | Evidence |
|---|---|---|
| **W-HEADER-SCALE** (header 2× too large) | YES, all 4 | `.story-hero-title` font-size measured: tabs **109.7px** (D2 `text-display-5`), carousel/header-ribbon/toc-tracking **86.1px** (D3 `text-display-4`). The giant title buries the viewport top on every nav page (screenshot-confirmed — "Tabs"/"Carousel"/"ToC Tracking" fill the upper third). Set in `manifest.ts:453-456 assignDepths()` depth→rung map. ONE chassis fix. |
| **W-PAGE-CHASSIS** (`--story-header-rule` absent) | YES, all 4 | `.story-header-cluster` resolves `border-bottom-width: 0px`, `::after content: normal`. No header→body seam; `--story-header-rule` is undefined repo-wide (grep). ONE chassis fix. |
| **W-PAPER-MORPHISM** (paper grain sub-perceptual) | YES (where paper used) | `--glass-grain-opacity: 0.025` light / `0.045` dark (`glass-fx.css:17`, `dark-arm.css:224`) — invisible. tabs.vue:175/195 host the underline tabs on `paper-grain-overlay` cards; the grain is present but sub-perceptual. ONE chassis fix lifts it. |
| **W-STICKY-TITLE-CONDENSE** (sticky title, no backing bar) | YES, all 4 | `.story-hero-shrink` has `z-index: 2` + the scroll() shrink keyframe but NO backing/scrim bar (`story-hero.css:227-262`), so on scroll the body content slides UNDER the floating title text → occlusion. ONE chassis fix. |
| **W-PAGE-BACKGROUND** (glass demos not over a live field) | YES, MIXED (see below) | navigation default bg = `aurora` (manifest.ts:187). The aurora DOES render contained `-z-10` behind the card on all 4 (`heroVariant:"page"`, `heroFullBleed:null`). carousel reads BEAUTIFULLY (glass-pager + slide float over the live drift — the band working as intended). BUT the inner demo hosts re-occlude it (§3 bugs N2/N3). |
| **W-PRESET-RENDER / W-DOTFLOW** (WebGPU readback) | N/A | No configurator/preset gallery and no WebGPU viz on any nav page — these two BUGs do not apply to navigation. |

## (3) CATEGORY-SPECIFIC per-page bugs (the genuinely-per-page arm)

**N1 — DUPLICATE eyebrow header (3 of 4 pages; the category-wide hand-roll DRY miss).**
`tabs.vue:88-105`, `carousel.vue:65-82`, `header-ribbon.vue:19-36` each hand-roll a `<header class="flex items-center gap-4 pl-5">` INSIDE the `<StoryPage>` body slot — an `<IconChip :section="12">` + a SECOND "Navigation · {Story}" `section-label--tinted` eyebrow + a redundant blurb. But `StoryPage` ALREADY renders the manifest-driven `StoryHeader` cluster with the SAME eyebrow + blurb above. Live DOM shows TWO headers per page:
- tabs: `["Navigation · Tabs@mkbabb/glass-ui/tabsTabs…", "Navigation · Tabs Panel-nav and toggle-strip…"]`
- carousel: `["Navigation · Carousel@mkbabb/glass-ui/carousel", "Navigation · Carousel Paged item scrollers…"]`
- header-ribbon: `["Navigation · Header Ribbon@mkbabb/…", "Navigation · Header ribbon Banner ribbon…"]`
This is the `IconChip`-pop section-identity event re-pasted per page — the eyebrow/blurb is shown TWICE. FIX: delete the hand-rolled `<header>` blocks; if the nav band wants the `IconChip` section-pop, it belongs ONCE in the chassis (a `section`-keyed `IconChip` slot on `StoryHeader`), not re-pasted in 3 SFCs. **toc-tracking.vue is the correct model — it hand-rolls NO header** (single chassis header only).

**N2 — header-ribbon: glass demo on an OPAQUE plate, NOT the live field (W-PAGE-BACKGROUND / `tier="field"` miss).**
`header-ribbon.vue:42-44` hosts the ribbon in `class="relative h-32 … rounded-card border border-border/60 bg-card"` — measured `background-color: rgb(251,248,244)` opaque, `backdrop-filter: none`. The aurora field is occluded; the glassy `HeaderRibbon`/`DockIconButton` chrome reads against a dead cream plate, not the live drift (the EXACT BG-2 black-plate class the addendum names). FIX: drop the opaque `bg-card` host → `bg-transparent`/`tier="field"` so the ribbon glass reads over the aurora.

**N3 — header-ribbon: `<StorySection label=>` not `heading=` (W-PAGE-CHASSIS section-affordance miss).**
`header-ribbon.vue:39` uses `label="hover-tracking ribbon"` → live DOM: zero `<h2>`, only a `.section-label` eyebrow caption. The section has no heading rung (the genuinely-per-page `label→heading` re-key the addendum's batch-1 names). The other 3 nav pages use `heading=` correctly. FIX: `label→heading`.

**N4 — toc-tracking: `themed-card` is an UNDEFINED class → panes are fully transparent over the live aurora (legibility BUG).**
`toc-tracking.vue:125,160` apply `class="themed-card …"` to BOTH the ToC nav pane AND the long scroll document. **`.themed-card` is defined NOWHERE in the repo** (grep src/ + demo/ CSS = zero matches). Live DOM: `background-color: rgba(0,0,0,0)`, `backdrop-filter: none`, no border → the dual-pane sits DIRECTLY on the contained aurora with no surface treatment. In dark mode (screenshot) the aurora drift bleeds straight through both panes — the ToC links + subsection body text wash out / drop below legibility over the bright field. This is a real dead-class bug AND a background mismatch: a dense TWO-PANE text/scroll-tracking demo is the wrong fit for a live aurora. FIX: give the panes a real glass/opaque surface (`glass-resting`/`bg-card` plate) OR route toc-tracking to a calm `grid`/`paper` background (a per-route manifest override) — a scroll-tracking demo does not need the live field.

**N5 (minor) — toc-tracking: active-item color is `--primary` violet, not the nav `--section-color-12` indigo identity.**
`toc-tracking.vue:134,148` style the active ToC item `bg-primary/10 text-primary`. `--primary` resolves `oklch(0.739 0.134 318.1)` (the dark violet / chromatic primary), which diverges from the nav band's declared ONE-color-event identity (`--section-color-12` indigo, set in the other 3 pages' headers). Minor — the active highlight reads, but it is off-identity for the band. FIX (optional): re-key the active tint to `--section-color-12`.

## (4) Category-specific notes (the DOCK-adjacent band hallmark)

- **Dock cross-ref (Pass-D dock-hallmark):** navigation has NO dock dependency (grep: zero `GlassDock`/`DockStage`/`useDock` in `navigation/*.vue`). header-ribbon composes `DockIconButton` as a generic glass icon button (the ribbon's control glyphs), NOT a `GlassDock`/morph engine — so the "dock unwired" Pass-D finding does NOT surface on any nav page. The dock hallmark lives entirely in the `dock` category.
- **tabs/menu glass register:** the `pill` SegmentedTabs (tabs.vue:112-167) hosts on `.glass-card` wrappers; over the contained aurora the glass-quiet track reads as a dim gray slab rather than glass-over-field (visible in the tabs screenshot — the `.glass-card` demo wrapper sits opaque-ish on the aurora). The selected `glass-floating` indicator reads correctly. The underline (paper) tabs are correctly on `paper-grain-overlay` cards (but the grain is sub-perceptual — N/A, W-PAPER-MORPHISM). Folds into W-PAGE-BACKGROUND `tier="field"` for the glass-card hosts.
- **The aurora-over-glass band IS the right identity for navigation** — carousel proves it (the pager+slides float over a live drift, gorgeous). The fixes are: (a) stop the inner demo hosts re-occluding the field (N2, N4, tabs `.glass-card`), (b) kill the duplicate header (N1), (c) the 6 chassis fixes propagate for free.
