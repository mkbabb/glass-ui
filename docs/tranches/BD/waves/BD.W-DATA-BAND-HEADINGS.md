# BD.W-DATA-BAND-HEADINGS

## 1. Band + one-line goal

**Band 5** — Demo PAGES second-half modernization (the data-band drain).

Migrate the data stories still hand-rolling raw `text-admin-label mb-4` section headers onto the canonical `<StorySection heading>` rung (the 20.4px `text-subheading` register), so the data band's body section headings read at the canonical rung — the lone outlier band of az-hierarchy-library-wide-migration / GAP-6. Zero src paint (demo-private).

## 2. Starting state — the exact on-disk reality (verified by reading)

`demo/stories/StorySection.vue` (verified): the `heading` prop renders a semantic `<h2 class="text-subheading">` (√φ, 20.4px / 600 — the canonical section-heading rung, `:42,75-79`); `label` renders the mono-caption eyebrow (`.section-label`). The docstring (`:16-32`) names this exact migration ("a story that organizes its body into named sections reaches for `heading`, NOT a hand-rolled `text-sm font-semibold`").

The data band split (verified via `grep -rln "import StorySection from" demo/stories/data` + `grep -rln "text-admin-label mb-4" demo/stories/data`):
- **7 data stories already import StorySection**: data-table, infinite-scroll, metric-stack, search, virtual-section, scrolling-text, metric-cell.
- **6 data stories hand-roll the `<p class="text-admin-label mb-4 text-muted-foreground">` section-header form** (the raw header, NOT migrated):

| File | Raw header sites (verified file:line) |
|---|---|
| `data/timeline.vue` | `:51` `<p class="text-admin-label mb-4 text-muted-foreground">Release timeline</p>` · `:111` `…>Events</p>` |
| `data/timeline-continuous.vue` | `:141` `…>Continuous variant — ONE rail, N regions</p>` · `:242` `…>Segments</p>` |
| `data/timeline-segmented.vue` | `:132` `…>Segmented variant — multi-phase progress</p>` · `:210` `…>Segments</p>` |
| `data/sortable-list.vue` | `:94` `…>Single list · drag the grip to reorder</p>` · `:128` `…>Handle-only …</p>` · `:164` `…>Cross-list …</p>` (+ in-card `<span class="text-admin-label">` group labels at `:171,199,227` — those are sub-group eyebrows, NOT body section headers) |
| `data/avatar.vue` | `:32` `…>Sizes</p>` · `:49` `…>Shapes · fallbacks · tones</p>` · `:75` `…>Grouped · StackedIconGroup …</p>` · `:116` `…>Roster</p>` |
| `data/table.vue` | `:73` `…>Basic table</p>` · `:126` `…>Empty state — &lt;TableEmpty&gt;</p>` (DISTINCT from the suffuse page-header `section-label--tinted text-admin-label` at `:62` — that is the PAGE identity eyebrow, KEPT) |

The raw `text-admin-label` (`--type-admin-label`, 0.625rem) renders BELOW body — it reads as a micro-caption, not a section heading. The 5 other demo bands run 10-11/12 migrated; data is the outlier (6 stragglers).

`StorySection` is imported in the 7 already-migrated data stories; these 6 must import it (timeline/timeline-continuous/timeline-segmented/sortable-list/avatar/table do NOT import it — verified: only the 7 above appear in the import grep). The enrolled-set gate that locks this lives in `proof:hierarchy` (the az-hierarchy-library-wide-migration owner — see §4).

## 3. The build

For each of the 6 data stories, replace each raw `<p class="text-admin-label mb-4 text-muted-foreground">…</p>` body section header with the canonical `<StorySection heading="…">` rung (importing `StorySection` from `../StorySection.vue` where absent — timeline/timeline-continuous/timeline-segmented/sortable-list/avatar/table). The migration is per-site:

- A `<div><p class="text-admin-label mb-4 …">Title</p><card/></div>` block becomes `<StorySection heading="Title"><card/></StorySection>` (StorySection IS the `flex flex-col gap-3` section wrapper — the outer `<div>` collapses onto it). The heading text is the SAME copy (`"Release timeline"`, `"Events"`, `"Sizes"`, `"Basic table"`, …) at the canonical `text-subheading` rung.
- Where the raw header is a DESCRIPTIVE sentence not a heading (`"Continuous variant — ONE rail, N regions"`, `"Segmented variant — multi-phase progress"`, `"Single list · drag the grip to reorder"`, `"Cross-list · drop between columns …"`), use `<StorySection label="…">` (the mono-caption eyebrow rung) OR `heading` per the section's intent — a NAMED section gets `heading`, a supporting tag gets `label`. The `text-admin-label` micro-caption is the WRONG rung for both; the migration picks the right one. (A short noun-phrase like `"Sizes"`/`"Events"`/`"Roster"`/`"Segments"` → `heading`; the long instructional descriptors → `label` or `heading` per the named-section judgment.)
- **The sortable-list in-card group labels** (`:171 <span class="text-admin-label">Todo</span>`, `:199 Doing`, `:227 Done`) are NOT body section headers — they are column eyebrows inside the kanban cards (and `:199,227` carry section tints). They STAY as `text-admin-label` (a micro group label, the deliberate KEEP — `text-admin-label` is a sanctioned distinct micro register per the eyebrow-union canon).
- **The table.vue suffuse page header** (`:62 <span class="section-label--tinted text-admin-label">Data · Table</span>`) is the PAGE identity eyebrow (the BC.W-SUFFUSE-reconcile header) — UNTOUCHED (it is the DATA-SUFFUSE register, not a body section header).

Clean break — every raw `text-admin-label mb-4` body section header DELETED at the call site, no dual rung.

## 4. The gate — born-RED→GREEN

`proof:hierarchy` is the az-hierarchy-library-wide-migration owner (the enrolled-set section-heading gate). Extend it in place:

- **Extend the enrolled set** to the 6 data stragglers (timeline, timeline-continuous, timeline-segmented, sortable-list, avatar, table) — the same enrolled-set mechanism that asserts the canonical `<StorySection heading>`/bare `text-subheading <h2>` is the ONLY section-heading register in the set.
- **A new clause `data-band-headings-migrated`** (born-RED): assert ZERO raw `text-admin-label mb-4 text-muted-foreground` **body section header** in the data band (the 6 files), EXCEPT the allowlisted KEEPs (the sortable-list kanban group labels `:171,199,227` — bare `text-admin-label` WITHOUT `mb-4` on a `<span>` inside a kanban card; the table.vue suffuse page-header `section-label--tinted text-admin-label`). The detector keys on the `<p class="text-admin-label mb-4` body-header SHAPE, not the bare `text-admin-label` micro register (which stays sanctioned).
- **Self-test bite.** A synthetic data file re-introducing `<p class="text-admin-label mb-4 text-muted-foreground">Header</p>` MUST red the new clause; a `<span class="text-admin-label">Todo</span>` (the kanban group-label KEEP) MUST NOT (the distinguishing bite — the body-header shape reds, the micro-label register stays green).

Born-RED on the current tree (the 6 stragglers carry the raw headers); GREEN at the build (migrated onto `<StorySection heading>`/`label`).

## 5. Paint verification

The BC anti-disease law: **no source-green close.** `tests-visual/hierarchy.spec.ts` (or the `proof:ba-gestalt` `page-band` aggregate-surface verdict — the data panes' storybook-meta roster home, BD.W-GESTALT-ROSTER-GROW) on `:5199`, BOTH modes × desktop+mobile:
- the data-band section headings now resolve the canonical `text-subheading` rung (~20.4px / 600) — a getComputedStyle font-size readback, not a string match (a class re-roll cannot evade it; the StorySection.vue heading-rung π precedent);
- the sortable-list kanban group labels stay at the micro `text-admin-label` rung (the KEEP un-regressed);
- the table.vue page eyebrow stays the suffuse `section-label--tinted` register.
The captured DELTA is the binding proof. The `proof:ba-gestalt` `page-band` aggregate-surface verdict on the fresh capture (G7 auto-revokes the drifted demo-SFC surface-hash).

## 6. Fences + risks

- **MUST NOT** migrate the sortable-list kanban column eyebrows (`Todo`/`Doing`/`Done`) or the table.vue suffuse page eyebrow — they are NOT body section headers; `text-admin-label` is a deliberate sanctioned micro register (the eyebrow-union canon). The detector + self-test distinguish the body-header shape from the micro-label register.
- **MUST NOT** lift `text-admin-label` to `text-subheading` library-wide — this is a per-site DEMO migration (the raw body section headers in 6 data stories), not a token retune.
- **Coordinate with BD.W-DATA-BAND-GLASS** — that wave folds the card plates onto ShowcaseFrame; this folds the headers onto StorySection. They touch disjoint markup (the card `<div>` vs the `<p>` header) but BOTH may rewrite the same outer `<div>` wrapper — sequence so the StorySection wrapper absorbs the `flex flex-col gap-N` outer div ONCE (StorySection IS that wrapper).
- **Coordinate with BD.W-PAGE-HEADER-FOLD** — that wave folds the page-identity IconChip-led header onto `<StorySectionHeader>` (a RICHER page-top header with an accent rail + chip); this wave threads the plain `<StorySection heading>` (a bare in-body semantic heading). A data story may use EITHER per its section's weight — the page-identity header is StorySectionHeader (PAGE-HEADER-FOLD's set), a plain named in-body section gets StorySection. Do not double-thread one section onto both.
- Zero `src/` paint — StorySection is demo-private.
