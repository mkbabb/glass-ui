# BC.W-STORYBOOK-META — the storybook idiom-audit ledger (the dogfood census + the routed fold-candidates)

The frontend-design plugin meta-pass over the storybook AS ONE ARTIFACT (USER-DEFECTS §D:
*"Run a frontend-design plugin audit of ALL UI panes"* + *"glass-ui idiom audit: what to
smoothen / refine / hone / abstract out (or fold into one extant component); find GAPS"* +
*"demo storybook hardening with proper design hierarchy to DOGFOOD and leverage our own
components"*). The whole-storybook design-quality gate is `proof:storybook-meta` (the nine-axis
SOURCE arm) + `tests-visual/storybook-meta.spec.ts` (the π readback) + the `page-band` row of
the `proof:ba-gestalt` roster (the pixel verdict). This ledger records (a) the dogfood census
+ the routed residuals each fold-candidate's disposition is DECIDED, never silently dropped
(SYNTHESIS #20), and (b) the idiom smoothen/refine/abstract/gap findings.

## 1. The discharged dogfood fold-candidates (this wave's own deliverables)

| candidate | disposition | landed by |
|---|---|---|
| `<StorySectionHeader>` mint (GAP-2 — the 42nd-paste preventer) | BUILT — composes the shipped `<IconChip>` + the `border-l-[3px]` accent rail + the mono `.section-label--tinted` eyebrow + the `text-small` blurb, baking `--section-label-accent` IN; NO inline-style chip re-paste (proof:icon-chip D4). Demo-private, zero src/ paint. | BC.W-STORYBOOK-META (`demo/stories/StorySectionHeader.vue`) |
| the SHELL chrome sweep (GAP-5 — the highest-visibility dogfood miss, UN-OWNED until now) | BUILT — the morph toggle composes `<Button>` (the `btn-pill` raw chain retired), the liquid-preview toggle composes `<Switch>` (the raw `<input type="checkbox">` retired), the empty state composes `<Card>` (the raw `rounded-[…] border bg-background/40` div retired); the `data-testid`s preserved (the in-situ dock-morph wiring byte-stable). The `<kbd>` help chip is the recorded KISS-KEEP (1 site, no fold). | BC.W-STORYBOOK-META (`demo/layout/AppShell.vue`) |
| the section-rhythm tokenization (axis-3) | BUILT — `--story-page-section-gap`/`-max-inline`/`-header-gap` minted in `story-hero.css`; the chassis READS them (clean break — no `gap-10`/`max-w-6xl` literal survives on the chassis). Every page breathes the SAME measured rhythm (the herostudios generous-whitespace north-star). | BC.W-STORYBOOK-META (`story-hero.css` + `StoryPage.vue`) |
| the stray-blue close (M7 — the "WTF is this blue" residual) | FIXED — `foundations/css-utilities.vue`'s four `scale-on-hover` demo glyphs re-pointed off raw Tailwind (`text-rose/amber/violet/sky-500`) onto the IDENTITY palette (`--section-color-8/2/7/5`). Zero raw Tailwind chromatic utility survives in `demo/stories/**`. | BC.W-STORYBOOK-META (`foundations/css-utilities.vue`) |
| `<SectionPreviewCard>` (GAP-7 — VERIFY, not re-mint) | VERIFIED — exists (`BC.W-PAGE-CHASSIS:269` mint), composes the shipped `<IconChip>` + the `.fira-code` subpath chip + the bounded inert preview (≥2 primitives — the bento dogfood exemplar). Not re-minted here. | BC.W-PAGE-CHASSIS (verified by BC.W-STORYBOOK-META M9d) |

## 2. The routed cross-cutting residuals (the FIX is the page bands' slice; this MEASURES + routes)

The dogfood FIX vs MEASURE split (the band-5 boundary, the spec fences): `BC.W-PAGE-PRUNE`/
`BC.W-PAGE-HIERARCHY` own the per-page RE-THREAD (raw triplet → `<Card>`/`<ShowcaseFrame>`, raw
`<button>` → `<Button>`); `proof:storybook-meta` M9a/M9b own the cross-cutting MEASURE — the
NON-REGRESSION RATCHET (a NEW off-baseline hand-roll above the recorded census reds; the count
NEVER grows). Each residual below routes to its owning page band; the ratchet shrinks as they
re-thread. None is silently dropped.

### M9a — the raw `rounded-card border bg-card`/`shadow-cartoon` triplet census (24 residuals → compose `<Card>`/`<ShowcaseFrame>`)

ROUTE → the page band that re-threads it onto `<Card>`/`<ShowcaseFrame>`:

- **data band** (`BC.W-PAGE-PRUNE`/`HIERARCHY`): `data/avatar.vue`, `data/data-table.vue`,
  `data/infinite-scroll.vue`, `data/metric-cell.vue`, `data/metric-stack.vue`, `data/search.vue`,
  `data/sortable-list.vue`, `data/table.vue`, `data/timeline.vue`, `data/timeline-continuous.vue`,
  `data/timeline-segmented.vue`, `data/virtual-section.vue`
- **display band**: `display/metric-badge.vue`, `display/pulse.vue`, `display/section.vue`
- **forms band**: `forms/label.vue`, `forms/multi-select.vue`
- **foundations band**: `foundations/motion.vue`, `foundations/paper-glass.vue`, `foundations/shadows.vue`
- **motion band**: `motion/handmark.vue`, `motion/typewriter.vue`
- **navigation band**: `navigation/header-ribbon.vue`
- **aurora chrome**: `aurora/PresetPickerRow.vue` (a configurator-row helper — review for the
  control-pane allowlist vs the `<Card>` re-thread on its owning aurora-chrome wave)

ALLOWLISTED (NOT a residual): `ShowcaseFrame.vue` (DEFINES the triplet — its reason to exist),
`SectionPreviewCard.vue` (the chassis card SHELL mint).

### M9b — the raw `<button>` census (14 residuals → compose the glass `<Button>`)

ROUTE → the page band:

- **data band**: `data/infinite-scroll.vue`, `data/timeline-continuous.vue`, `data/timeline-segmented.vue`,
  `data/virtual-section.vue`
- **containers band**: `containers/expandable-container.vue`, `containers/hover-card.vue`
- **dock band**: `dock/layers.vue`, `dock/overview.vue`
- **forms band**: `forms/combobox.vue`
- **foundations band**: `foundations/shadows.vue`
- **navigation band**: `navigation/toc-tracking.vue`
- **substrates band**: `substrates/blob.vue`, `substrates/goo-dot.vue`
- **compositions band**: `compositions/instrument-chassis.vue`

ALLOWLISTED (NOT a residual — the configurator/control panes that hand-roll a bare control by
design, per the spec's narrow allowlist): `aurora/OklchStopRow.vue`, `aurora/PresetPickerRow.vue`,
`motion/curve-gallery.vue`, `motion/springs.vue`, `motion/scroll-system.vue`,
`foundations/css-utilities.vue` (the `scale-on-hover` demo buttons), `display/buttons.vue` (the
button pane demonstrates raw vs `<Button>`), `CodeBlock.vue` (the copy-affordance button — the
chassis primitive).

## 3. The cross-band coherence finding (the GlassPanel published-but-not-composed gap)

`<GlassPanel>` is a PUBLISHED surface (subpath `/glass-panel` + the `GlassPanelVariant`/
`GlassPanelProps` api seats, the AZ.W-PRUNE2 RESTORE for the keyframes consumer) whose own story
route `substrates/glass-panel.vue` (the BC.W-GLASS-PRUNE MATERIALS gallery) deliberately
demonstrates the five-rung glass ladder by composing the `.glass-{rung}` CLASSES bare — NOT the
`<GlassPanel>` component tag (the documented "which glass do I reach for?" binary answer). The
`proof:storybook-complete` totality gate read this as undemonstrated (a real export→story gap).
DISPOSITION: RECOGNIZED — the `DEMONSTRATED_AS_MATERIAL` allowlist (a documented gate fact, NOT a
silent skip) records that GlassPanel's named route demonstrates the SURFACE IT RENDERS (the
material), with the anti-evasion floor that the route SFC must exist on disk (an absent route is a
dead claim → RED). A future reconcile (restore the `<GlassPanel>` tag in its gallery OR formally
retire the published surface) is the substrate-band's slice — the published-vs-demonstrated
coherence is recorded, not silently greened.

## 4. The smoothen / refine / hone findings (the idiom-audit deliverable)

- **The micro-eyebrow register is hand-rolled in places.** Four `text-[10px] uppercase tracking-*`
  micro-eyebrow labels (`navigation/carousel.vue`, `dock/overview.vue` ×2) + one `text-mono-caption`
  viz coordinate annotation (`aurora/NucleiOverlay.vue`) hand-roll the sanctioned `text-admin-label`
  (0.625rem) register. These are LEGITIMATE (the sanctioned micro register — the M6 fontsize floor
  binds BODY/caption prose, not the eyebrow micro), so they do NOT red the legibility floor. FOLD
  CANDIDATE (future book): re-point the hand-rolled `text-[10px] uppercase tracking-*` onto the
  canonical `text-admin-label` utility (an idiom-adherence smoothen, ≥2 sites — booked to the owning
  navigation/dock bands, NOT this wave's footprint).
- **The page rhythm is now ONE token family** (the smoothen this wave landed): every page reads the
  SAME `--story-page-section-gap`/`-max-inline` cadence — the cross-page seam (a designer scrolling
  the storybook cannot find where one author's page ends and another begins) is closed on the rhythm
  axis.
- **No GAP found in the chassis layer** (`research/feat/storybook-dogfood.md §1` — the chassis
  primitives StoryHero/StoryPlayButton/PresetEditor/StorySection/ShowcaseFrame/StoryHeader/
  SectionPreviewCard all eat library components): RECORDED — the chassis layer is the solved
  problem; the dogfood arm targets the per-page BODY bypasses (§2) + the SHELL chrome (§1, FIXED) +
  the missing `<StorySectionHeader>` home (§1, BUILT), never the healthy chassis.
