# Page-audit — DATA category (14 pages)

Branch `prototype/liquid-dock`. PLANNING audit — no src edits. Live spot-checks via isolated Playwright context on the demo at `:5173` (the demo runs on 5173/5175, NOT the canonical 5199 — server-port note for the fix agents).

The 14 pages: `table` · `data-table` · `tags-input` · `avatar` · `sortable-list` · `infinite-scroll` · `timeline` · `timeline-segmented` · `timeline-continuous` · `search` · `virtual-section` · `scrolling-text` · `metric-cell` · `metric-stack`.

NOTE: the addendum parenthetical ("border-progress/metric-badge/metric-pill" as data pages) is WRONG — those live in the **display** category (`manifest.ts:250-251`, `778-781`). They are NOT in `demo/stories/data/`. The border-progress ring is a display-category audit, not data.

---

## 1. CHASSIS CONFIRMATION — DRY holds

**All 14 pages USE the shared `StoryPage` chassis** (zero header hand-roll at the page root). DRY confirmed, exactly as the addendum's batch-1/2 found. Every structural chassis fix (W-HEADER-SCALE, W-PAGE-CHASSIS rule, W-STICKY-TITLE-CONDENSE) propagates to all 14 from the ONE chassis edit.

---

## 2. SYSTEMIC defects — CONFIRMED on data

### W-HEADER-SCALE — CONFIRMED (all 14)
Live: every data page's hero `<h1>` resolves **86.112px** (`text-display-4`, the `assignDepths` D3→`4` rung). Measured on `data-table`, `metric-cell`, `timeline`. This is the over-scaled demo header rung — one chassis fix in the manifest `heroScale` depth map.

### Duplicate hand-rolled header — CONFIRMED on 2 pages
The SYSTEMIC double-header (the in-card `<header>` IconChip cluster that duplicates the chassis StoryHeader descriptor) appears on:
- **`data-table.vue:160-178`** — `<header>` + `<IconChip :icon="Database" :section="9" bloom reveal>` + `section-label--tinted` "Data · Data table" + a blurb `<p>`. Live: TWO eyebrows render — chassis "Data · Data Table" AND hand-rolled "Data · Data table" (verbatim duplicate, just case-differs).
- **`table.vue:52-70`** — identical pattern: `<header>` + `<IconChip :icon="Table2" :section="9" bloom reveal>` + "Data · Table" eyebrow + blurb.

Both already half-fixed once (data-table.vue:181 comment "the in-card eyebrow 'Data table' was a DUP… dropped") but the `<header>` block STILL re-renders the category·story eyebrow + a redundant blurb. → folds into **W-PAGE-CHASSIS** (route the `--section-color-9` data identity through a chassis prop; delete both hand-rolls).

The other 12 pages do NOT carry the IconChip duplicate-header. (`sortable-list.vue` has 3 `<header>` elements at lines 170/198/226 — these are legit KANBAN-COLUMN headers ["Todo"/"Doing"/"Done"], NOT a page-header dup. Leave them.)

### W-PAGE-CHASSIS header rule — CONFIRMED absent (all 14)
Live: the StoryHeader cluster resolves `border-bottom: 0px` — `--story-header-rule` does not exist. No header→body seam on any data page. One chassis fix.

### Glass-not-staged (W-PAGE-BACKGROUND) — N/A for data (by design)
Data category default background is `grid` (`manifest.ts:189`, `data: "grid"`), and `table/data-table/metric-cell/metric-stack` explicitly declare `background:"grid"`. These are LEDGER/TABLE/METRIC surfaces, NOT glass-morphism demos — the addendum's one-GL-per-route fence correctly keeps the dense data band on the FREE static `grid` wash, no live field. The "glass demos must stage over a live field" ask does not target data. `tags-input.vue` uses opaque `bg-card` plates (lines 49,78) but it is a tags input, not a glass demo — acceptable. **No glass-not-staged fix owed here.** (If W-PAPER-MORPHISM lifts the `grid` wash strength chassis-wide, data benefits for free.)

---

## 3. CATEGORY-SPECIFIC defects

### (a) Raw `<button>` / shadcn-residue — NONE found
Source grep: ZERO raw `<button[ >]` in any of the 14 data demos. The Pass-D breadth finding (raw `<button>`s in data demos) does **NOT reproduce** in the current `prototype/liquid-dock` tree. (Live `button:not([class*=reka])` counts on timeline=31 are the demo-shell nav dock + reka-primitive buttons, not demo-source buttons.) No raw-button fix owed.

### (b) The SECTION-AFFORDANCE miss — the genuinely-per-page arm (6 pages)
The W-PAGE-CHASSIS `label→heading` re-key is the dominant per-page data defect. These pages give sections an EYEBROW caption (`label=` or bare `<p class="text-admin-label">`) but NO semantic `<h2 class="text-subheading">` heading rung — so live `<h2>` count is **0** on metric-cell, metric-stack, timeline (measured). Sections read as captions-below-body, no heading hierarchy.

- **`metric-cell.vue:82,118,144`** — three `<StorySection label="…">` (no `heading=`). Live h2count=0.
- **`metric-stack.vue:10,34,60`** — three `<StorySection label="…">` (no `heading=`).
- **`scrolling-text.vue:28,81,99…`** (7 StorySection) — all `label=` only.
- **`avatar.vue:32,49,75,116`** — bare `<p class="text-admin-label mb-4">` for "Sizes"/"Shapes"/"Roster" (zero StorySection — should adopt StorySection `heading=`).
- **`table.vue:73,126`** — bare `<p class="text-admin-label mb-4">` "Basic table"/"Empty state" (zero StorySection in body beyond the dup-header arm).
- **`timeline.vue:51,111` / `timeline-segmented.vue:132,210` / `timeline-continuous.vue:141,242`** — bare `<p class="text-admin-label mb-4">` "Release timeline"/"Events"/"Segments" as section titles (zero StorySection).
- **`tags-input.vue`** — ZERO section structure at all (plain `<div class="flex flex-col gap-2">` + `text-mono-caption` captions, no StorySection, no heading). Worst affordance miss in data.

REFERENCE (correct): **`search.vue:233,429`** uses `<StorySection label= heading=>` and `<StorySection heading=>` — the model to re-key the 6+ pages onto.

### (c) Per-page render BUGs — NONE found
All exercised surfaces RENDER: DataTable (6 rows, data-table), 28 MetricCells (metric-cell), timeline (2 instances). No blank/dead render in data. The WebGPU preset/dot-flow blank-render bug (W-PRESET-RENDER / W-DOTFLOW-REBUILD) is substrates/viz-specific — does not touch the data category (no WebGPU surfaces here).

### (d) Minor: opaque-plate `bg-card` table chrome
`data-table.vue:193`, `table.vue:77,129` wrap the table in `rounded-card border bg-card shadow-cartoon` (opaque). Fine for a ledger over `grid` (no glass intended), but if the chassis lifts the paper-wash these stay opaque islands — low priority, note only.

---

## 4. VERDICT (5 lines)

1. **DRY confirmed** — all 14 data pages use the `StoryPage` chassis; the 3 systemic chassis defects (W-HEADER-SCALE h1=86px, header-rule `border-bottom:0`, sticky-condense) propagate from one chassis fix.
2. **Duplicate hand-rolled header CONFIRMED on 2 pages** — `data-table.vue:160-178` + `table.vue:52-70` (IconChip `<header>` re-renders the chassis "Data · …" eyebrow + blurb; live shows two eyebrows) → fold into W-PAGE-CHASSIS.
3. **Glass-not-staged is N/A for data** — the band rides the FREE static `grid` wash by design (one-GL-per-route fence); no glass-morphism demos owed a live field.
4. **No raw `<button>` / shadcn-residue** — the Pass-D breadth finding does NOT reproduce in data; **no per-page render bug** (DataTable/MetricCell/timeline all paint), **no border-progress** (it's a display page, not data).
5. **Dominant per-page arm = the `label→heading` section-affordance re-key** (W-PAGE-CHASSIS) on metric-cell/metric-stack/scrolling-text/timeline×3/avatar/table (live `<h2>`=0; sections are eyebrow-only) + tags-input has ZERO section structure (worst); `search.vue` is the correct reference model.
