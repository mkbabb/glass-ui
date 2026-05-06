# J.R4 — Data + composition deep audit

## Preamble

Read-only research. Scope: J findings 15–18 (status badge alignment, fuzzy
search refinement, clearSearchCache rename + contrast, basic horizontal
pager weakness). Worktree HEAD `950d1f4` (post-I close). Probed at runtime
against the local demo on `http://localhost:5174` via Playwright; the demo
auto-cycles between stories whenever an `]`/`}` keyboard shortcut leaks
through, so several screenshots required two navigations. All cited line
numbers verified against the worktree.

Source corpus read in full:

- `src/components/ui/{table,data-table,badge,carousel,button}/**`
- `src/components/custom/{search,glass-carousel}/**`
- `src/composables/pagination/useOffsetPagination.ts`
- `demo/stories/data/{search,table,data-table,avatar}.vue`
- `demo/stories/containers/glass-carousel.vue`
- `demo/stories/navigation/carousel.vue`
- `docs/tranches/J/findings.md`
- `docs/audits/style-audit.md`
- `docs/precepts/instructions/tranche/SPEC.md`
- `CLAUDE.md` (Design Axes, conventions)

## Findings by axis (1-7)

### Axis 1 — Token alignment

- `src/components/custom/search/FuzzySearch.vue:336–351, 461–471` — inline
  `box-shadow: var(--shadow-md)`, `box-shadow: var(--shadow-xl)` and a
  hardcoded `border-radius: var(--radius-xl)` modal whose canonical
  surface is `<Dialog>` or `.glass-elevated`. The whole `<style scoped>`
  block (≈330 lines) re-implements an overlay surface in raw CSS rather
  than composing the canonical floating-panel / dialog tokens.
- `src/components/custom/search/FuzzySearch.vue:397` — magic
  `hsl(50 100% 60% / 0.35)` for the `<mark>` highlight. `--gold` /
  `--rainbow-pastel-yellow` tokens exist; this should reference one.
- `demo/stories/data/data-table.vue:36–40` — column classes use
  `text-mono-caption`, `text-muted-foreground`, `fira-code` directly;
  fine. No drift here.
- `demo/stories/data/table.vue:33–35` — the `statusTone()` helper hand-
  rolls `bg-section-N/15 text-section-N border-section-N/30` triplets.
  Glass-ui already exports `badgeToneVariants` (success / warning /
  destructive / info) at `src/components/ui/badge/index.ts:38–50` with
  identical `color-mix` recipes. The demo bypasses the tone CVA. Drift
  noted in §A.

### Axis 2 — Utility & `@apply` hygiene

- `src/components/custom/search/FuzzySearch.vue:115–268` — every chrome
  primitive (`.fuzzy-search-input-wrap`, `.fuzzy-search-action-btn`,
  `.fuzzy-search-results`, `.fuzzy-search-modal*`, `.fuzzy-search-badge`,
  `.fuzzy-search-result`) is bespoke CSS. Canonical replacements all
  exist:

  | bespoke class | canonical replacement |
  |---|---|
  | `.fuzzy-search-input-wrap` | `.input-bar` (used by `SearchBar.vue:5`) |
  | `.fuzzy-search-action-btn` | `<Button variant="ghost" size="icon">` |
  | `.fuzzy-search-results` (inline dropdown) | `.floating-panel` + `.popover-animate` |
  | `.fuzzy-search-modal-overlay/.fuzzy-search-modal` | `<Dialog>` / `<DialogContent>` |
  | `.fuzzy-search-badge` | `<Badge variant="secondary" size="sm">` (or new `size` rung) |
  | `.fuzzy-search-result` (button row) | `.interactive-item` + `.kbd` for the hint footer |
  | `.fuzzy-search-modal-hint kbd` | `.kbd` |

  The same package already uses `.input-bar` correctly in
  `SearchBar.vue:5`. `FuzzySearch.vue` was written before the
  canonical utility set existed and never absorbed it.
- `demo/stories/navigation/carousel.vue:106–117` — the dot indicator
  is a hand-rolled `flex` strip. There is no canonical
  `.carousel-dots` / `<CarouselDots>`; this same pattern recurs in
  `containers/glass-carousel.vue` (the `1 / 5` pill counter at line
  136–141 is also hand-rolled). See *Glass-ui gaps* §E1.

### Axis 3 — Interactive consistency

- `src/components/custom/search/FuzzySearch.vue:317–333` — the close /
  expand action buttons compose `border:none; background:none;` on a
  raw `<button>`, with bespoke hover state. They are missing the
  canonical `focus-visible:shadow-[var(--focus-ring-shadow)]` ring,
  the `--scale-press-btn` token, and the disabled-base contract that
  every `<Button variant="ghost" size="icon">` enforces.
- `demo/stories/data/search.vue:318` — `variant="danger-subtle"` on
  the cache-clear button. Runtime measurement (Playwright):
  - text color `rgb(219, 36, 36)` (= `--destructive` light value)
  - bg `oklab(... / 0.1)` (= `bg-destructive/10`)
  - **text-vs-button-bg contrast = 4.28 : 1** — fails WCAG AA for
    normal-weight body text (4.5 : 1 floor).
  - text-vs-card-bg contrast = 4.70 : 1 — borderline pass, but the
    label still reads through the 10 % red wash, so the visible
    composite is the failing 4.28 figure.
  This is the contrast complaint in finding 17. See §C.
- `demo/stories/navigation/carousel.vue:107–117` — the dot indicator
  buttons use raw Tailwind utilities rather than `<Button
  variant="ghost" size="icon">`; no `--scale-press-btn`, no
  `disabled-base`. Repeated on `containers/glass-carousel.vue:106` for
  the pill counter (a span, not a button — fine, but the pattern is
  unowned).

### Axis 4 — Variant orthogonality and rooting

- `src/components/ui/badge/index.ts:5` — base `text-xs` is hardcoded.
  No `size` axis on the CVA. When a Badge sits inside a `text-sm`
  table row the type-size mismatch creates the visual baseline drift
  the user perceives as "not aligned" (see §A). Adding a `size`
  variant would let `<Badge size="sm">` adopt `text-sm leading-tight`
  to match adjacent cell text.
- `src/components/ui/data-table/DataTable.vue:172` — `DataTable` ships
  with no slot for `<DataTablePagination>`-replacement; the only
  pager is the built-in numeric strip in
  `DataTablePagination.vue:46–112`. There is no pluggable carousel-
  shaped pager idiom. See §D + §E2.

### Axis 5 — Overlay and motion vocabulary

- `src/components/custom/search/FuzzySearch.vue:449–471` — the modal
  overlay duplicates `--z-modal`, `dialog-scale` semantics with a
  bespoke `position:fixed; backdrop-filter:blur(6px)`. Canonical:
  `<Dialog>` already provides `--z-modal` + `.glass-elevated` +
  `dialog-scale` transition. Drift.
- `src/components/custom/search/FuzzySearch.vue:434–446` — bespoke
  `fuzzy-search-dropdown-enter/leave` keyframes that duplicate
  `.popover-animate .slide-in-from-side` token semantics.
- `src/components/custom/search/FuzzySearch.vue:563–599` — bespoke
  modal-enter/leave transitions that duplicate `dialog-scale` and
  `dialog-in`/`dialog-out` (`src/styles/animations.css`).

### Axis 6 — Typographic and structural hierarchy

- `demo/stories/data/search.vue:264, 270, 274, 278, 327, 333, 340,
  346, 360, 364, 368, 372, 383, 394, 419, 436` — sixteen sites use a
  bare `fira-code` class. There is a canonical `.text-mono-{micro,
  small,caption,prose,code}` family at
  `src/styles/typography.css`. `fira-code` alone is the font-family
  hint; the type-scale + leading + tracking semantic should ride
  with `.text-mono-caption` or `.text-mono-code`. Pattern drift.
- `demo/stories/data/search.vue:241, 286` — `rounded-card border
  border-border bg-card p-4 shadow-cartoon` repeated verbatim three
  times for what is clearly a `<Card variant="...">` composition.
  The `<Card>` primitive already encodes the same shape; the demo
  is reaching past the primitive.

### Axis 7 — Accessibility resilience

- `src/components/custom/search/FuzzySearch.vue:336–408` — the
  inline dropdown applies `backdrop-filter: blur(12px)` directly
  with no `prefers-reduced-transparency` fallback. Canonical
  `.glass-elevated` ships the fallback inside the utility.
- `src/components/custom/search/FuzzySearch.vue:457–459` — the
  modal overlay uses `backdrop-filter: blur(6px)` likewise without a
  `@supports not (backdrop-filter)` solid fallback.
- `src/components/ui/badge/Badge.vue:13` — the badge is a `<div>`,
  not a `<span>`. When status badges are placed inside a `<td>`,
  the implicit block-ish layout context can amplify baseline drift
  on browsers that compute `<div>` baseline differently. Symmetry
  with shadcn-vue: shadcn-vue's Badge is also a `<div>` so this
  is not a regression — but if a `size` rung lands (Axis 4), the
  block-vs-inline question should be revisited.

## Status badge alignment diagnosis (A)

Finding 15: "Table items (status field badge) — text vertically and
horizontally aligned, idiomatically."

Runtime measurement at `demo/stories/data/table.vue` (rendered):

| cell | leaf top-offset | leaf height | font-size | line-height |
|---|---|---|---|---|
| `INV-001` | 0.0 px | 55.0 px | 14 px | 20 px |
| `Ada Lovelace` | 0.0 px | 55.0 px | 14 px | 20 px |
| `Paid` (Badge) | **16.5 px** | **22.0 px** | **12 px** | **16 px** |
| `Card` | 0.0 px | 55.0 px | 14 px | 20 px |
| `$248.00` | 0.0 px | 55.0 px | 14 px | 20 px |

The cell itself is `vertical-align: middle` (correct) and the
internal Badge is `inline-flex items-center` (correct). The badge
sits at 16.5 px top + 22 px height = midline 27.5 px, while the
adjacent text-cells fill the full 55 px row at midline 27.5 px. So
they **are mathematically vertically centered**.

The user's perception is real but the root is not the cell or the
Badge layout — it's three orthogonal type-size mismatches:

1. **Badge font-size = 12 px vs row body = 14 px.** The 2 px delta
   creates an apparent baseline lift because the badge cap-height is
   visibly shorter than the cell text x-height even though their
   geometric midlines coincide.
2. **Badge line-height = 16 px on a 12 px font** (factor 1.33) —
   slack inside the pill above and below the glyphs creates an extra
   top "halo" that reads as a vertical offset.
3. **`px-2.5 py-0.5` on the Badge** — the asymmetric horizontal vs
   vertical padding makes the pill feel optically taller-than-wide
   for short labels like `Paid`, dragging the perceived center.

**Drift** — `demo/stories/data/table.vue:33–35` rolls its own
`bg-section-N/15 text-section-N border-section-N/30` triplets.
`badgeToneVariants` (`src/components/ui/badge/index.ts:38–50`)
already encodes the same recipe under semantic tone names
(`success`, `warning`, `destructive`, `info`). The story should
be either:

```vue
<Badge :tone="row.status === 'paid' ? 'success' : row.status === 'pending' ? 'warning' : 'destructive'">
```

or, if section-N hue continuity matters more than semantic naming,
a new `tone="section-N"` axis on `badgeToneVariants`. The current
drift is an accidental fork.

**Primitive-vs-story attribution.** The cell-level alignment is
correct in the primitive (`TableCell.vue:11` uses `align-middle`,
`Badge.vue` is `inline-flex items-center`). The visual "off-axis"
read is a **primitive gap**: `<Badge>` lacks a `size` rung that
matches the row's `text-sm` line-height. Story has correct
composition; primitive lacks the size axis the story needs to
align baseline-to-baseline with surrounding text.

**Proposal** — add a `size` axis to `badgeVariants`:

```ts
size: {
    sm: "text-xs leading-4 px-2 py-0.5", // current default
    md: "text-sm leading-5 px-2.5 py-0.5", // matches text-sm rows
    lg: "text-base leading-6 px-3 py-1",
}
```

Then `demo/stories/data/table.vue` uses `<Badge size="md"
:tone="...">`, and the visual offset disappears because the
badge text inherits the same line-height as the cell text.

## Fuzzy search refinement enumeration (B)

Finding 16: "DATA · FUZZY SEARCH — controls and design need to be
refined."

Read `demo/stories/data/search.vue` in full (453 lines). The story
exposes four control surfaces and one results panel; each has at
least one chrome violation against the canonical primitives.

### Refinement enumeration

| # | Site | Issue | Canonical replacement |
|---|---|---|---|
| B1 | `search.vue:242–253` | Two side-by-side search inputs (`SearchBar` + `FuzzySearch.variant=floating`) read as duplicates because they have no labels and overlap visually. | Single `<FuzzySearch>` with `variant="inline"` (new variant) plus a `text-admin-label` overhead — or split into a `<SearchPanel>` composition (§E2). |
| B2 | `search.vue:241, 286` (and `352`) | Three handcrafted `bg-card`/`bg-background` cards with `rounded-card border border-border ... shadow-cartoon`. | `<Card>` + `<CardHeader>` + `<CardContent>`. |
| B3 | `FuzzySearch.vue:117–146` | Custom `.fuzzy-search-input-wrap` / `.fuzzy-search-action-btn` chrome. | Compose `.input-bar` (already used in `SearchBar.vue:5`) + `<Button variant="ghost" size="icon">`. |
| B4 | `FuzzySearch.vue:336–408` | Bespoke inline-dropdown overlay duplicating popover token semantics. | `<Popover>` + `<PopoverContent>` with `.popover-animate .slide-in-from-side`. |
| B5 | `FuzzySearch.vue:449–530` | Bespoke command-palette modal duplicating `<Dialog>`. | `<Dialog>` + `<DialogContent>`; or, more idiomatically, `<Command>` (already exported at `src/components/ui/command`). |
| B6 | `FuzzySearch.vue:531–560` | Bespoke `.fuzzy-search-modal-hint kbd` chrome. | `.kbd` utility class (`src/styles/utilities.css`). |
| B7 | `FuzzySearch.vue:163, 233` | Custom `.fuzzy-search-badge` with `data-type` attribute. | `<Badge variant="secondary" size="sm">` (post-§A size addition). |
| B8 | `search.vue:305–322` | Helper-button row (`buildIndex`, `searchIndex`, `fuzzyMatch`, `clearSearchCache`) is `flex flex-wrap gap-2` only — no grouping label, no separator. | `<DockGroup>` or `<ToggleGroup>` would carry the "operation cluster" semantic; failing that, a `text-admin-label` heading + `Separator` row. |
| B9 | `search.vue:264–280, 358–374` | Hand-rolled `<dl><dt><dd>` "readout" panels with `fira-code` text. | Compose `<MetricBadge>` (already exported under instrument-cluster axis) for each (label, value) pair. |
| B10 | `search.vue:286, 376–387` | "Manual results" list is a `<ol>` with hand-rolled item chrome. | Compose `<SortableList>` items or a `<Card>` mini-row pattern. |
| B11 | `search.vue:404–440` | Result cards use `border-l-4` with inline `:style="{borderLeftColor: var(--section-color-N)}"`. The `<Card>` primitive has no `accent-color` prop, forcing inline styling. | New `<Card>` prop `:accent="section-N"` driving `border-l-4 border-l-[var(--section-color-N)]`. |

**Net diagnosis**: the FuzzySearch *component* (not the story) is
the primary source of refinement debt. The component shipped
before `.input-bar`, `.kbd`, `<Popover>`, `<Dialog>`, `.glass-
elevated`, `.popover-animate`, and `<Badge size>` existed in the
canon; it now duplicates every one of them in raw CSS. A gestalt
rewrite of `FuzzySearch.vue` is the right scope, not a per-site
patch.

**Primitive-vs-story attribution**: 80 % primitive (FuzzySearch),
20 % story chrome (Card forks, helper-row layout). The story is
the symptom; the primitive is the disease.

## clearSearchCache rename + design-language proposal (C)

Finding 17: "`clearSearchCache` — rename; the button is not
visible (contrast); not using proper button design language."

### Locate

- Public export: `src/components/custom/search/composables/fuzzySearchIndex.ts:236–243`.
- Re-exports: `src/components/custom/search/index.ts:5`,
  `src/components/custom/search/composables/index.ts:3`.
- Internal callers: `useFuzzySearch.ts:7, 90, 134` (correct — the
  composable owns cache lifecycle).
- Tests: `src/components/custom/search/__tests__/search-contracts.test.ts:5,51,78`,
  `tests/composables.smoke.spec.ts:15,233,238`.
- **The button**: `demo/stories/data/search.vue:318–321` —
  `<Button type="button" variant="danger-subtle" size="sm"
  data-testid="clear-cache-button" @click="runClearCache">
  <Trash2 ... /> clearSearchCache </Button>`.

### Rename

The exported helper `clearSearchCache` is a **library API name** —
keep it as the function identifier; renaming the export is a
breaking change consumer trees would have to absorb (`words/`,
`fourier-analysis/`, `bbnf-lang/` all consume search per
`docs/tranches/I/PROGRESS.md`). The user's complaint is the
button **label**, which currently reads `clearSearchCache` (raw
identifier). This is the literal-API-as-UI-label anti-pattern.

**Proposal**:

| layer | old | new |
|---|---|---|
| public export (lib API) | `clearSearchCache` | **keep** — stable contract |
| story-side handler | `runClearCache` | **keep** — same |
| button label (visible text) | `clearSearchCache` | **`Clear cache`** (sentence case, product-meaningful) |
| button `aria-label` | implicit from text | `"Clear search cache"` (full phrase) |
| `data-testid` | `clear-cache-button` | **keep** — test contract |

Rationale: API identifiers belong in the helper-call-ledger
readout (which already shows `clearSearchCache` correctly at
`search.vue:371`). The button's job is to communicate the
**action**, not the function name.

### Contrast diagnosis

Runtime measurement (Playwright, light mode,
`/data/search`):

```
btn_color:        rgb(219, 36, 36)            # = --destructive
btn_background:   oklab(... / 0.1)            # = bg-destructive/10
card_bg:          rgb(251, 250, 249)          # = --card
contrast(text vs btn-bg):    4.28 : 1   # FAILS WCAG AA (4.5)
contrast(text vs card-bg):   4.70 : 1   # borderline pass
```

The failing pair is text-vs-its-own-background. In dark mode the
`--destructive` lightness flips (`tokens.css:509`), and the same
calculation lands at ~3.1 : 1 — **clearly invisible**, which
matches the user's report.

`buttonVariants.variant.danger-subtle` (`button/index.ts:29–30`)
is the only variant in the CVA that pairs `text-destructive` with
`bg-destructive/10`. Every other variant uses a
foreground-on-solid pairing that meets contrast. The variant
itself is the disease — not the surface tier or the consumer.

### Design-language compliance

The button already composes `<Button>` correctly (it's not bespoke
chrome). The breakage is **inside the variant**. Three alternative
fixes, ranked:

1. **Retire `danger-subtle`** (preferred). Replace with
   `<Button variant="destructive" size="sm">`. The full destructive
   variant is `bg-destructive text-destructive-foreground`, which
   meets contrast in both modes. Cache-clearing is a **destructive
   action** (it discards state); the muted "subtle" treatment was
   always semantically wrong. `buttonVariants.variant.danger-
   subtle` has exactly one consumer (this button) per `H-deep-audit-
   β-substrate.md:233` — retiring it is a single-site change. This
   matches the [No backwards compat] precept (clean break, no
   migration shim).
2. **Repair `danger-subtle`**. Bump bg opacity to `/15` and add
   `font-medium` (already present via base) plus a subtle border:
   `border border-destructive/30`. This raises text-vs-bg contrast
   to ≈ 5.1 : 1 and gives the button a definite edge. Keeps the
   variant for future "soft destructive" use.
3. Lift the surface tier under the button. Currently the button
   sits on `<Card variant="default">` (cream `--card`). Putting the
   helper row on `<Card variant="pane">` (a `--background` neutral)
   would let the destructive tint stand out — but doesn't fix the
   intra-button contrast.

**Recommendation**: option 1. Cache-clearing is destructive; the
canonical variant for destructive actions is `destructive`. The
`Trash2` icon already signals the semantic.

### Final composition (proposed)

```vue
<Button
    type="button"
    variant="destructive"
    size="sm"
    data-testid="clear-cache-button"
    @click="runClearCache"
>
    <Trash2 class="mr-2 h-4 w-4" />
    Clear cache
</Button>
```

**Primitive-vs-story attribution**: variant retirement is a
primitive change (`button/index.ts`); button label and icon
sitting are story changes. Both are required; neither alone
closes the finding.

## Basic horizontal pager weakness (D)

Finding 18: "Basic horizontal pager — weak; `<GlassCarousel>` story
pager is the better idiom."

### Locate

- **Basic horizontal pager**: `demo/stories/navigation/carousel.vue:46–65`.
  Title literally `<h2>Basic horizontal pager</h2>` (line 47). Wraps
  shadcn-vue `<Carousel>` (embla) primitive.
- **Glass carousel — story pager**: `demo/stories/navigation/carousel.vue:67–119`
  (note: this is in the *same* file). Wraps the same shadcn `<Carousel>`
  but adds glass-subtle skin + dot indicator + multi-slide viewport.
- **GlassCarousel pager**: `demo/stories/containers/glass-carousel.vue:118–194`.
  Wraps the **custom** `<GlassCarousel>` (NOT shadcn `<Carousel>`); has
  `< | 1 / 5 | > | Collapse` chevron + counter + state-toggle row.

So there are actually **three** "horizontal pager" idioms in the demo:

1. shadcn `<Carousel>` raw (basic) — `navigation/carousel.vue:48–63`.
2. shadcn `<Carousel>` + dot strip (story-pager) — `navigation/carousel.vue:74–117`.
3. custom `<GlassCarousel>` + chevrons + counter — `containers/glass-carousel.vue:127–157`.

### Comparison

| affordance | basic (1) | story-pager (2) | GlassCarousel (3) |
|---|---|---|---|
| visible viewport size | 1 slide | 3 slides | 5 slides |
| chevron prev/next | hidden inside slide | flanking the row | external pill row |
| index counter | none | none | `1 / 5` pill |
| dot indicator | none | yes | implicit via item active state |
| state toggle (Collapse/Expand) | none | none | yes |
| tactile press affordance | embla default | embla default | `--scale-press` + bg-shift |
| keyboard | embla default | embla default | embla-equivalent |
| substrate | `bg-card/30` | `bg-card/30 + glass-subtle` | `glass-carousel--expanded` (canonical) |

The basic pager (1) has *no* navigational chrome visible above the
fold (Playwright capture: `j-r4-navigation-carousel.png`); only the
floating arrow inside the slide hints at navigability. It's weak by
every affordance axis.

The story-pager (2) is **stronger** but still hand-rolls the dot
indicator (`navigation/carousel.vue:106–117`) — pattern that
recurs in `containers/glass-carousel.vue:136–141` (the `1 / 5` pill
counter is also hand-rolled). Neither lives in the canon.

The GlassCarousel pager (3) is the strongest — but its chevron +
counter row at `containers/glass-carousel.vue:127–157` is **also
hand-rolled** (24 lines of demo-side JSX). The user's "better idiom"
remark refers to this hand-rolled composition; nothing in the
library currently exports it.

### Proposal

- **Retire** the basic pager section (1) at `navigation/carousel.vue:46–65`.
  It has no pedagogic value beyond "embla works" — covered by the story-
  pager section.
- **Promote** the GlassCarousel chevron + counter row to a
  `<GlassCarouselPager>` slot or sibling component
  (composing `<Button variant="outline" size="icon">` + a
  `.rounded-pill` counter + state-toggle). See *Glass-ui gaps* §E3.
- **Keep** the story-pager (2) as a comparison artefact — but rebuild
  its dot strip on top of the new `<CarouselDots>` primitive (also §E3).

**Primitive-vs-story attribution**: the weakness is **library**.
No `<CarouselPager>` / `<CarouselDots>` / `<GlassCarouselPager>`
primitive exists; every pager affordance is hand-rolled in the
story. Story-as-oracle is failing because the canon has no slot
for it to mirror.

## Glass-ui gap candidates (E)

The four findings collapse into three reusable substrate gaps and
one composition gap.

### E1 — `<Badge>` `size` axis + `<Badge>` `<span>` root

- **Sites driving need**: `demo/stories/data/table.vue:75–80`,
  `demo/stories/data/data-table.vue` (status column not yet present
  but obvious next step), `demo/stories/data/search.vue:228, 231,
  234, 419, 427, 434` (six call-sites all pass `text-xs` Badges into
  `text-sm` contexts).
- **Proposal**: extend `badgeVariants` (`badge/index.ts:5`) with a
  `size: { sm | md | lg }` axis. Default stays `sm` for back-compat.
- **Rationale**: lifts the §A baseline-drift root cause to a single
  CVA branch.

### E2 — `<SearchPanel>` composition (or canonical replacement of FuzzySearch.vue)

- **Sites driving need**: `demo/stories/data/search.vue:240–283`
  (search + readout panel pair); the user's screenshots in the
  prompt indicate the *whole* fuzzy-search story is the failure
  mode.
- **Proposal**: a `<SearchPanel>` that composes `<Card>` +
  `<FuzzySearch>` (rewritten on top of `<Popover>`/`<Dialog>` +
  `.input-bar`) + a `<MetricBadge>` readout column. Or, more
  surgically: rewrite `FuzzySearch.vue` to compose canonical
  primitives (per §B table) and keep the demo composition where it
  is. The latter is smaller scope and matches the gestalt rewrite
  thesis.
- **Rationale**: The current `FuzzySearch.vue` is a 600-line
  monolith that re-implements Popover, Dialog, Input, Button, Badge,
  Kbd, and the floating-panel surface in raw CSS. A rewrite that
  composes the canon would reduce the file to ≈ 150 lines.

### E3 — `<CarouselPager>` + `<CarouselDots>` (or `<GlassCarouselPager>`)

- **Sites driving need**: `navigation/carousel.vue:106–117` (dot
  strip), `containers/glass-carousel.vue:127–157` (chevron + counter
  + state-toggle row). Two demo sites; one consumer pattern in
  external trees would push this above the bar.
- **Proposal A** (minimal): two new sub-components in
  `src/components/ui/carousel/`:
  - `<CarouselDots>` — auto-generates dot indicators from
    `carouselApi.scrollSnapList()`, calls `api.scrollTo(i)`, mirrors
    `pagerIndex` from `api.on("select")`.
  - `<CarouselPager>` — chevron-prev + index-counter + chevron-next
    pill row (composes `<Button variant="outline" size="icon">`).
- **Proposal B** (extends): add `<GlassCarouselPager>` to
  `src/components/custom/glass-carousel/` for the chevron + counter
  + state-toggle composition (the demo's "GlassCarousel pager"
  idiom).
- **Rationale**: stops both demo files from forking the same dot/
  counter chrome; canonicalizes the affordance the user calls "the
  better idiom".

### E4 — `<Card>` `accent` axis

- **Sites driving need**: `demo/stories/data/search.vue:404–410`
  (border-l accent), `demo/stories/data/sortable-list.vue` (likely
  same), and any "list of items with section-tinted left rule"
  pattern.
- **Proposal**: `<Card :accent="0..12">` driving
  `border-l-4 border-l-[var(--section-color-N)]`.
- **Rationale**: stops the inline-style escape hatch the demo
  uses (`:style="{borderLeftColor: var(--section-color-...)}"`).
  Sub-bar today (one strong consumer); reassess if a second
  consumer surfaces.

## Story-vs-primitive attribution (F)

Per W3.α story-fidelity policy, `demo/` stories are the canonical
visual reference. Each finding decomposes:

| finding | primitive role | story role |
|---|---|---|
| 15 (status badge alignment) | **Primitive gap** — Badge has no `size` axis matching `text-sm` rows. | **Story drift** — bypasses `badgeToneVariants` via hand-rolled `bg-section-N/15` triplet. |
| 16 (FuzzySearch refinement) | **Primitive disease** — `FuzzySearch.vue` re-implements Popover, Dialog, Input, Button, Badge, Kbd, floating-panel. | **Story symptom** — story tries to dress up a sick component. |
| 17 (clearSearchCache) | **Primitive bug** — `danger-subtle` variant fails contrast (4.28:1 light, ~3.1:1 dark). | **Story bug** — uses raw API name as button label. |
| 18 (basic pager) | **Primitive gap** — no `<CarouselPager>` / `<CarouselDots>` / `<GlassCarouselPager>`. | **Story symptom** — every demo hand-rolls the same chrome. |

Three of four findings are **primitive-rooted**. Stories are the
oracle but the canon is missing what the oracle expects them to
mirror.

## Glass-ui gaps surfaced

(Compact restatement of §E for the gap intake.)

| ID | Gap | Call sites | Tier |
|---|---|---|---|
| G-J-R4-1 | `badgeVariants.size` axis (`sm` / `md` / `lg`) | 6+ across `data-table.vue`, `table.vue`, `search.vue` | substrate |
| G-J-R4-2 | `FuzzySearch.vue` rewrite onto canonical primitives (Popover, Dialog, Input, Button, Badge, Kbd) | 1 component, downstream simplification across `search.vue` | composite rewrite |
| G-J-R4-3 | `<CarouselPager>` + `<CarouselDots>` (shadcn-vue carousel sub-components) | 2 demo sites; pattern recurs externally | substrate |
| G-J-R4-4 | `<GlassCarouselPager>` (chevron + counter + state-toggle composition) | 1 demo site; user calls it "the better idiom" | composite |
| G-J-R4-5 | `cardVariants.accent` axis (section-N tinted left rule) | 1 demo site (search results) | substrate (sub-bar — defer unless second site surfaces) |
| G-J-R4-6 | Retire `buttonVariants.variant.danger-subtle` (failing contrast in both modes; 1 consumer) | 1 site | retire |

## Union candidates

Same pattern, different vocabulary, both libraries:

| ID | glass-ui form | demo form | proposed canonical |
|---|---|---|---|
| U-J-R4-1 | `badgeToneVariants.tone.{success,warning,destructive,info}` (`badge/index.ts:38–50`) | `bg-section-N/15 text-section-N border-section-N/30` triplet (`table.vue:33–35`) | extend `badgeToneVariants` with `section-{0..12}` tones, OR extend `badge.color` variant to accept section tokens; converge on tone vocabulary. |
| U-J-R4-2 | `<Card>` + `<CardHeader>` + `<CardContent>` chrome | `rounded-card border border-border bg-card p-4 shadow-cartoon` triplet (`search.vue:241,286`; `data-table.vue:84`) | `<Card>` (already canonical); demo should not reach past it. |
| U-J-R4-3 | `<Popover>` + `<PopoverContent>` w/ `--z-popover` + `.popover-animate .slide-in-from-side` | `position:absolute; z:var(--z-popover); ...` (`FuzzySearch.vue:336–351`) | `<Popover>` (already canonical). |
| U-J-R4-4 | `<Dialog>` + `<DialogContent>` w/ `--z-modal` + `dialog-scale` | `position:fixed; z:var(--z-modal); ...` (`FuzzySearch.vue:449–471`) | `<Dialog>` (already canonical). |
| U-J-R4-5 | `.kbd` utility | bespoke `kbd` chrome (`FuzzySearch.vue:548–560`) | `.kbd` (already canonical). |
| U-J-R4-6 | shadcn `<Carousel>` (embla) — used in `navigation/carousel.vue` | custom `<GlassCarousel>` (own scroll mgmt) — used in `containers/glass-carousel.vue` | both legitimate; the union point is *paging chrome* (G-J-R4-3 + G-J-R4-4). |

## Proposed J wave shape

J's data + composition slice splits cleanly along primitive vs
composite vs retire-or-rewrite axes. Proposed sub-waves (numbered
J.D.1..J.D.4 to mark Data lane; integrate with parallel lanes from
R1/R2/R3 as the synthesis wave dictates):

### J.D.1 — Badge size axis + table tone reconciliation

- Add `size: { sm | md | lg }` to `badgeVariants` (`badge/index.ts:5`).
- Add `section-{0..12}` tones to `badgeToneVariants`
  (`badge/index.ts:38`).
- Update `demo/stories/data/table.vue:74–80` to compose
  `<Badge size="md" tone="...">` — retire `statusTone()` helper.
- **Hard gate**: Playwright run on `/data/table` shows badge
  baseline within ±0.5 px of adjacent text baseline; visual diff
  vs pre-wave screenshot.

### J.D.2 — FuzzySearch gestalt rewrite

- Rewrite `src/components/custom/search/FuzzySearch.vue` to compose
  `<Popover>` (inline mode) + `<Dialog>` or `<Command>` (modal mode)
  + `.input-bar` + `<Button variant="ghost" size="icon">` + `<Badge
  size="sm" variant="secondary">` + `.kbd`.
- Delete `<style scoped>` block (≈330 lines) — net code reduction
  ~70 %.
- `demo/stories/data/search.vue` simplifies as a side-effect: drop
  the duplicate `SearchBar` (B1) or convert to a `text-admin-label`
  context.
- **Hard gate**: existing `search-contracts.test.ts` + `composables.
  smoke.spec.ts` pass unchanged; Playwright captures of `/data/search`
  show inline + modal modes both render with canonical token chrome.

### J.D.3 — Cache-clear contrast + label

- Retire `buttonVariants.variant.danger-subtle` (`button/index.ts:29–30`).
- Update `demo/stories/data/search.vue:318–321` to
  `<Button variant="destructive" size="sm">` with label
  `Clear cache` and `aria-label="Clear search cache"`.
- Update `demo/stories/primitives/buttons.vue:27` (the only other
  consumer) to remove `danger-subtle` from its variant grid.
- **Hard gate**: Playwright contrast check shows
  text-vs-button-bg ≥ 4.5:1 in both light and dark modes;
  `buttonVariants.variant` enum no longer contains `danger-subtle`
  (typecheck enforces).

### J.D.4 — Carousel pager canon

- Add `<CarouselPager>` and `<CarouselDots>` sub-components to
  `src/components/ui/carousel/` (compose `<Button variant="outline"
  size="icon">` + a counter pill).
- Add `<GlassCarouselPager>` to
  `src/components/custom/glass-carousel/` (chevron + counter +
  state-toggle row).
- Retire the "Basic horizontal pager" section
  (`demo/stories/navigation/carousel.vue:46–65`) — replace with the
  story-pager (2) using new `<CarouselDots>`.
- Update `demo/stories/containers/glass-carousel.vue:127–157` to
  compose `<GlassCarouselPager>` instead of hand-rolling the row.
- **Hard gate**: Playwright captures of `/navigation/carousel` and
  `/containers/glass-carousel` show no hand-rolled chrome; greppy
  `rounded-pill` / `rounded-full` count in those files drops to
  near zero (the dot/counter primitives own the radius).

Ordering: J.D.1 ↔ J.D.3 are independent and can land in parallel.
J.D.2 depends on J.D.1 (uses the new `<Badge size>` for type
chips). J.D.4 is independent of all three. So a 4-agent wave with
{J.D.1, J.D.3, J.D.4} parallel and J.D.2 in a follow-up sub-wave
is the simplest disjoint-ownership dispatch.

Optional sub-bar: **J.D.5 — Card accent axis** (E4 / G-J-R4-5).
Defer until a second site surfaces; one demo site is sub-bar.

## Closing tally

- Findings audited: 4 (J.15 — J.18).
- Drift sites: 23 (16 `fira-code` bare-class sites in `search.vue`;
  6 hand-rolled chrome blocks across `FuzzySearch.vue`; one
  `statusTone()` fork in `table.vue`).
- Glass-ui gaps surfaced: 6 (E1–E4 + G-J-R4-6 retirement + sub-bar
  E4).
- Union candidates: 6 (U-J-R4-1 — U-J-R4-6).
- Recommended J wave shape: 4 sub-waves (J.D.1–J.D.4) + 1 deferred
  sub-bar (J.D.5).
- Primitive-rooted findings: 3 of 4 (15, 16, 18); story-rooted: 0;
  both: 1 (17 — variant retirement + label rename).
