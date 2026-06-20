# BD.W-DATA-BAND-GLASS

## 1. Band + one-line goal

**Band 5** — Demo PAGES second-half modernization (the data-band drain).

Drain the M9A raw-triplet baseline's data-band slice to ∅: re-thread the data stories' opaque `rounded-card border …bg-card …shadow-cartoon` body plates onto `<ShowcaseFrame>` (tier=`field` for live-glass demos / `resting`|`quiet` for opaque-atom specimens) or the `<Card>` glass tier, so the data band reads as warm-cream glass over the per-route field, not gray slabs on charcoal — the AX.W54 glass-first + BG-2 black-plate fix finally reach the data band. Zero src paint (demo-private).

## 2. Starting state — the exact on-disk reality (verified by reading)

`scripts/proof-storybook-meta.mjs:264` declares the census detector:
```js
const TRIPLET_RE = /rounded-card[^"'`]*\bborder\b[^"'`]*\b(?:bg-card|shadow-cartoon)\b/;
```
`:267-292` declares `M9A_BASELINE` — a 24-file recorded census baseline. The **data-band slice** (the 12 files this wave drains) is:
```
demo/stories/data/avatar.vue
demo/stories/data/data-table.vue
demo/stories/data/infinite-scroll.vue
demo/stories/data/metric-cell.vue
demo/stories/data/metric-stack.vue
demo/stories/data/search.vue
demo/stories/data/sortable-list.vue
demo/stories/data/table.vue
demo/stories/data/timeline-continuous.vue
demo/stories/data/timeline-segmented.vue
demo/stories/data/timeline.vue
demo/stories/data/virtual-section.vue
```
`detectRawTriplet` (`:293-307`) flags a file off-allowlist whose source matches `TRIPLET_RE`; a NEW off-baseline file REDS the non-regression ratchet, a baseline-recorded file routes to the idiom-audit ledger (no regression). `m9a-raw-triplet-measure` is the aggregate clause (`:646`). The π is `tests-visual/storybook-meta.spec.ts` + the `proof:ba-gestalt` `page-band` aggregate-surface verdict (the data panes map to the storybook-meta `page-band` row in the BD-grown roster — BD.W-GESTALT-ROSTER-GROW; the re-threaded `demo/stories/data/*.vue` panes are enrolled in the `page-band` BD freshness record's `surface-paths`, so a re-thread drifts the surface-hash → G7 auto-revoke).

The exact triplet sites, each verified on disk:
- `data/timeline.vue:56` `'flex flex-col gap-8 rounded-card border border-border bg-card p-6 shadow-cartoon'` + `:112` `rounded-card border border-border bg-card shadow-cartoon` (the events `<ol>`). NOT an opaque-atom — a glassiness-demoable card.
- `data/data-table.vue:193` `cn('rounded-card border border-border bg-card shadow-cartoon')` wrapping `<DataTable>` — hosts a **table atom** (opaque-allowlist).
- `data/timeline-continuous.vue:148` `'flex flex-col gap-6 rounded-card border border-border bg-card p-6 shadow-cartoon'` + `:244` (segments `<ol>`). Glass-demoable.
- `data/timeline-segmented.vue:139` + `:212` — same shape. Glass-demoable.
- `data/avatar.vue:81` `'flex items-center gap-6 rounded-card border border-border bg-card p-6 shadow-cartoon'` (StackedIconGroup host) + `:117` (roster `<ul>`) — hosts **avatar atoms** (opaque-allowlist), but the card chrome itself is glassable.
- `data/sortable-list.vue:100,135,169` `'flex flex-col gap-2 rounded-card border border-border bg-card p-3 shadow-cartoon'` on the `<SortableList>` roots. (`:197,225` use `bg-section-5/5`/`bg-section-4/5` — a section-tint, NOT `bg-card`; they do NOT match the regex and stay.) Glass-demoable.
- `data/table.vue:77` `'overflow-hidden rounded-card border border-border bg-card shadow-cartoon'` + `:129` (empty-state table) — hosts a **table atom** (opaque-allowlist).
- `data/infinite-scroll.vue:89` `'max-h-[28rem] overflow-y-auto rounded-card border border-border bg-card shadow-cartoon'` on `<InfiniteScroll>` — a scroll-port glass card.
- `data/virtual-section.vue:102` `'relative max-h-[32rem] overflow-y-auto rounded-card border border-border bg-card shadow-cartoon'` on the scroll container — a scroll-port glass card.
- `data/metric-stack.vue:14,38` `'…rounded-card border border-border/60 bg-card p-4'` + `:66,81` `'…rounded-card border border-border/60 bg-card/50 px-6 py-6'` (the `bg-card/50` form STILL matches `\bbg-card\b`). Hosts **MetricStack/MetricRow** + the poster-hero number cards — glass-demoable.
- `data/metric-cell.vue:164,188` `'…rounded-card border border-border/60 bg-card/50 px-6 py-5'` (the count-up poster cards). Glass-demoable.
- `data/search.vue:248,316` `'flex flex-col gap-4 rounded-card border border-border bg-card p-4 shadow-cartoon'`. (`:286,389` use `bg-background`, `:362,368,374,380` use `rounded-md` — off-regex; `:417,440` use `<Card>` already.) Glass-demoable.

`demo/stories/ShowcaseFrame.vue` exists (the chassis home, docstring: "replaces the `rounded-card border bg-card shadow-cartoon` triplet across ~25-30 demo sites" + the three-value `tier` axis `resting`|`quiet`|`field` from BA.W-STAGE: `field` = `border-transparent bg-transparent`). **ZERO data stories import ShowcaseFrame** at HEAD (verified: `grep -rln ShowcaseFrame demo/stories/data` = none).

## 3. The build

The data routes inherit the **static grid wash** (the `CATEGORY_DEFAULT_BG` map resolves `data→grid` — verified in SEED/idiom). The re-thread drops the opaque `bg-card` plate so the wash reads through; it does NOT stage new GL (one-GL-per-route held). For EACH file, replace the hand-rolled triplet `<div>`/component-class with `<ShowcaseFrame :tier>` (or `<Card>`), `tier` chosen by the opaque-atom-allowlist fence:

- **tier=`field`** for the cards that demo glass / a live-glass surface and host no opaque atom: `timeline.vue` (both cards), `timeline-continuous.vue` (both), `timeline-segmented.vue` (both), `sortable-list.vue` (the 3 list roots), `infinite-scroll.vue`, `virtual-section.vue`, `metric-stack.vue` (all 4), `metric-cell.vue` (both poster cards), `search.vue` (both helper cards). The glass these host (or the warm-cream plate over the grid) reads over the page wash instead of an occluding charcoal slab.
- **tier=`resting`** (`bg-card`, byte-identical to HEAD) for the genuine opaque-atom specimen hosts where the demo is the atom not glassiness: `data-table.vue:193` (DataTable atom), `table.vue:77,129` (Table atom), `avatar.vue:81,117` (StackedIconGroup/roster of avatar atoms). The BG-2 fix is for glass-over-plate occlusion; a legitimately-opaque atom keeps its opaque host (the allowlist fence). `resting` = the HEAD `bg-card` look through the chassis primitive — a component-over-class fold, not a visual change.

ShowcaseFrame already owns the rounded-card + border + (resting) bg-card + the pad knob; the `cn('rounded-card border … bg-card … shadow-cartoon')` literal is DELETED at each call site — clean break, no dual path. Where the triplet `<div>` also carried scroll/flex/max-h utilities (`infinite-scroll`, `virtual-section`, `timeline`), those layout utilities thread through ShowcaseFrame's forwarded `class`/`:class` (it composes `cn`). Where the host is a component (`<InfiniteScroll :class>`, `<SortableList class>`) and ShowcaseFrame cannot wrap it without re-parenting a load-bearing scroll/sortable root, KEEP the component but re-point its decoration class off the raw triplet onto the ShowcaseFrame `tier=field` decoration class (the FadingScroll `useFadingScroll(containerRef)` precedent — re-skin the existing root, do not re-parent). The cleanest expression: ShowcaseFrame wraps the card; the scroll/list component stays its child.

Fences respected: **opaque-atom-allowlist** (resting for avatar/table/data-table atoms), **one-GL-per-route** (field drops the plate, the existing grid wash reads through — no new GL), **presets-in-consumers** (the section-color tints stay demo-local data; ShowcaseFrame is a demo-private chassis), **warm-cream identity** (field reveals the warm wash, resting keeps the warm `bg-card`).

## 4. The gate — born-RED→GREEN

Extend `proof:storybook-meta` in place (NO new gate — the M9A ratchet IS the lock):

- **The drain.** Each re-threaded file is REMOVED from `M9A_BASELINE` (`scripts/proof-storybook-meta.mjs:267-292`) in lockstep with its re-thread. After the build the data-band slice of the baseline == ∅ (the 12 data lines deleted). Because the file no longer matches `TRIPLET_RE` (the literal is gone), `detectRawTriplet` finds it neither in the census nor the regression set — the ratchet stays GREEN; if a file were dropped from the baseline but STILL carried the triplet, it would REGRESS-RED (the lockstep enforcement, the anti-stale-grandfather floor).
- **A new positive clause `m9a-data-band-drained`.** Assert the 12 data-band paths are ABSENT from `M9A_BASELINE` AND each composes `<ShowcaseFrame` (or `<Card`) AND carries no surviving `TRIPLET_RE` match. Born-RED on HEAD (the 12 are IN the baseline + carry the triplet); GREEN at the build.
- **Self-test bite.** The existing M9a ratchet self-test (`:481-507`) already proves a NEW off-baseline triplet REDS while an allowlist+baseline file stays GREEN — KEEP it. ADD a bite: a synthetic data file dropped from the baseline but STILL carrying `rounded-card border bg-card` MUST red the `m9a-data-band-drained` clause (the lockstep — you cannot remove a baseline row without removing the triplet).

Born-RED on the current tree (the 12 baseline rows present + the triplets live); GREEN at the build (rows deleted + triplets folded onto ShowcaseFrame).

## 5. Paint verification

The BC anti-disease law: **no source-green close.** `tests-visual/storybook-meta.spec.ts` (or the `proof:ba-gestalt` `page-band` aggregate-surface verdict — the data panes' storybook-meta roster home, BD.W-GESTALT-ROSTER-GROW) captures each re-threaded data route on `:5199`, BOTH modes (light + dark) × desktop+mobile:
- the `field`-tier cards read as warm-cream glass / the grid wash THROUGH the card (not a charcoal `bg-card` slab on the dark page) — the BG-2 black-plate kill;
- the `resting`-tier opaque-atom hosts (avatar/table/data-table) read byte-identical to HEAD (the allowlist atoms keep their opaque plate);
- no CLS / no occlusion regression.
The captured DELTA artefact (screenshot + paired readback) is the binding proof — a commit-message claim is forbidden (the cardinal-lesson). The `proof:ba-gestalt` `page-band` aggregate-surface verdict is re-earned on the FRESH capture (G7 auto-revokes the drifted surface).

## 6. Fences + risks

- **MUST NOT** flip avatar/table/data-table to `field` — they host opaque-allowlist atoms; the BG-2 fix is for glass occlusion, not legit opaque atoms. tier=`resting` keeps them byte-identical.
- **MUST NOT** re-parent a load-bearing scroll/sortable root (InfiniteScroll, virtual-section's scroll container, SortableList) — re-skin the existing root via ShowcaseFrame-as-parent or the decoration-class re-point, never break the scroll-port/drag contract.
- **MUST NOT** stage a new GL substrate on a data route (one-GL-per-route) — `field` drops the plate so the EXISTING grid wash reads; the `proof:suffuse` (e)-clause substrate fence + `proof:storybook-meta` M8 both red a planted `<Aurora>` on a content page.
- **MUST NOT** drop a `M9A_BASELINE` row without deleting its triplet (the lockstep) — the new self-test bite reds that.
- **Coordinate with BD.W-MISSED-SLAB-CENSUS** (scrolling-text `rounded-md`, tags-input `shadow-cartoon-sm`) — those are the regex-escape variants this regex does NOT catch; that wave widens the regex + re-threads them. This wave touches only the 12 `TRIPLET_RE`-matching baseline files.
- **Coordinate with BD.W-DATA-SUFFUSE** — the section-color tints (`bg-section-N/5`, `--section-color-N`) stay; this wave touches only the `bg-card`/`shadow-cartoon` opaque plate.
- Zero `src/` paint — ShowcaseFrame is demo-private; the library tokens/components are untouched.
