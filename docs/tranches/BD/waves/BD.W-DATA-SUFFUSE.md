# BD.W-DATA-SUFFUSE

## 1. Band + one-line goal

**Band 5** — Demo PAGES second-half (the data-band drain).

Thread the per-section `--section-color-9` data-band identity COLOR EVENT (tinted eyebrow + border-left accent rail + focal IconChip — the BC.W-SUFFUSE-reconcile shape) across the data stories carrying zero identity event, so the whole data band reads with the ONE coherent color event per surface — matching the feedback band's `--section-color-8` ruby. Zero src paint (demo-private; the proof:suffuse LEDGER extend is a `scripts/` edit).

## 2. Starting state — the exact on-disk reality (verified by reading)

The feedback band is the MODEL (verified via grep). All 6 feedback stories carry the `FEEDBACK_STOP = 8` identity: `feedback/progress.vue:16,68-75`, `confirm-dialog.vue:9,49-56`, `notification.vue:11,77-84`, `toast.vue:17,106-113`, `alert.vue:10`, `completion-seal.vue:10,83`. The shape (verified at `progress.vue:68-75`):
```html
<header :style="{ '--section-label-accent': 'var(--section-color-8)', borderLeft: '3px solid color-mix(…)' }">
  <IconChip :icon="Gauge" :section="8" bloom reveal />
  <div><span class="section-label--tinted text-admin-label">Feedback · Progress</span><p class="text-small …">…</p></div>
</header>
```

The data band at HEAD carries the `--section-color-9` event on ONLY **2 of 14** stories (verified in `scripts/proof-suffuse.mjs:201-202`):
```js
{ surface: "demo/stories/data/table.vue", event: "--section-color-9", kind: "color" },
{ surface: "demo/stories/data/data-table.vue", event: "--section-color-9", kind: "color" },
```
+ `data/metric-cell.vue:136-138` enrolled on `--chart-*` (the semantic glyph tint, the metric register — NOT a `--section-color-9` page identity).

table.vue + data-table.vue carry the `DATA_STOP = 9` header (verified `data-table.vue:15-18,160-178` + `table.vue:18-21,52-70`). The OTHER data stories carry **zero `--section-color-9` page-identity event**:
- `data/avatar.vue`, `data/infinite-scroll.vue`, `data/metric-stack.vue`, `data/scrolling-text.vue`, `data/search.vue`, `data/sortable-list.vue`, `data/tags-input.vue`, `data/timeline.vue`, `data/timeline-continuous.vue`, `data/timeline-segmented.vue`, `data/virtual-section.vue`.

(These use `--section-color-N` per-ITEM tints for row dots/avatars — `var(--section-color-${p.tone})` — but NO page-level `--section-color-9` IDENTITY header. The per-item tone is the data CONTENT; the page identity is the ONE event the band lacks.)

`scripts/proof-suffuse.mjs` LEDGER (`:107-247`) declares each enrolled surface's ONE event; d1 (body ink untinted, `:462`), d2 (chip ratio, `:484`), d3 (≤1 event per surface, `:534`), d-ledger (covers closed set, `:558`). The `data→9 (slate)` category is named at `:165,198-202`. The per-item `var(--section-color-${tone})` dots do NOT trip d3 (they are not the `--section-color-9` family on a `<p>`; d1 scans `<p>` body copy only; d3 counts DISTINCT families — a per-item ramp tint + a `--section-color-9` header is still ONE `section-color` family).

## 3. The build

Thread the BC.W-SUFFUSE-reconcile header onto the 11 zero-identity data stories (avatar, infinite-scroll, metric-stack, scrolling-text, search, sortable-list, tags-input, timeline, timeline-continuous, timeline-segmented, virtual-section), each carrying the data band's ONE `--section-color-9` event — the EXACT shape table.vue + data-table.vue already use (and the feedback band's `--section-color-8` model). For each:

```html
<script setup>
const DATA_STOP = 9;            // BD.W-DATA-SUFFUSE — the data band's ONE --section-color-9 identity
import { IconChip } from "../../../src/components/custom/icon-chip";
import { <Glyph> } from "@lucide/vue";   // a per-story representative lucide glyph
</script>
<header class="flex items-center gap-4 pl-5"
  :style="{ '--section-label-accent': 'var(--section-color-9)',
            borderLeft: '3px solid color-mix(in srgb, var(--section-label-accent) 55%, transparent)' }">
  <IconChip :icon="<Glyph>" :section="DATA_STOP" bloom reveal />
  <div class="flex flex-col gap-1">
    <span class="section-label--tinted text-admin-label">Data · <Name></span>
    <p class="text-small text-muted-foreground"><one-line section descriptor — the ONE color event></p>
  </div>
</header>
```

Where a story's page-identity header is folded onto `<StorySectionHeader>` via BD.W-PAGE-HEADER-FOLD (data-table, table — their page-top IconChip-led header is in PAGE-HEADER-FOLD's 36-set), the `:section="9"` on that primitive IS the event — no second header. Where a story has a plain `<StorySection label/heading>` page top (search, infinite-scroll, metric-stack, virtual-section, scrolling-text, metric-cell), the identity header is ADDED as the page-identity `<header>` above it (the data-table precedent: the suffuse header + a separate StorySection card heading coexist — the header is the PAGE identity, the StorySection is the card heading).

The per-story glyph is the section's representative icon (Clock/History for timeline*, Users for avatar, Layers for sortable, ListPlus for infinite-scroll, Type for scrolling-text, Tags for tags-input, BarChart3 for metric-stack, etc.) — the chip is the ONE color event vehicle. The chip tints the plate+glyph only; the body ink stays untinted (d1). ONE event per surface (d3) — the chip+rail+eyebrow family counts as ONE.

**presets-in-consumers / proportion fence:** the identity reads the LIBRARY `--section-color-9` ramp (never a hand-rolled raw-Tailwind chromatic utility — the M7 stray-blue stays closed). ONE color event per surface — never a four-hue rainbow. The reference-class stories (metric-stack/metric-cell — their `--chart-*` viz IS the component teaching content) keep their existing register; the `--section-color-9` page identity is ADDITIVE (the page chrome is the section event, the component viz is not a competing page event — the badge-reference / progress-reference precedent in the LEDGER).

## 4. The gate — born-RED→GREEN

Extend `proof:suffuse` in place (NO new gate — the LEDGER + d1/d3 ARE the lock):

- **Extend the LEDGER** (`scripts/proof-suffuse.mjs:107-247`) with the 11 data-band rows on `--section-color-9` (kind `color`; metric-stack stays `reference` because its `--chart-*`/audacious viz is the teaching content, the section event ADDED as page chrome — or `color` if the chart tint is removed; pick `reference` to preserve the existing chart event). After the extend the data-band slice of the LEDGER covers all 14 data stories.
- **A new clause `data-band-suffused`** (born-RED): assert the 11 named data stories each carry the `--section-color-9` page-identity header (the `<IconChip :section="9"` OR `--section-label-accent: var(--section-color-9)` + the `section-label--tinted` eyebrow) AND the d3 ≤1-event count holds over the extended LEDGER. Born-RED on HEAD (the 11 carry zero `--section-color-9` identity header); GREEN at the build.
- **d3 / d1 stay GREEN by construction** — the chip is ONE event (chip+rail+eyebrow = ONE `section-color` family); the body copy stays untinted. If a re-thread accidentally tints a `<p>` body run, d1 reds (the floor). The d-ledger under-enrollment guard now covers the full data band.
- **Self-test bite.** A synthetic data file with a SECOND competing event family (e.g. `--section-color-9` header + a `--viz-fourier` body fill on a non-reference surface) MUST red d3; a synthetic data file with the section header + per-item ramp dots (ONE family) MUST stay GREEN (the distinguishing bite — per-item ramp is the same family, a second family reds).

Born-RED on the current tree (11 data stories carry zero identity event); GREEN at the build (the `--section-color-9` event threaded + the LEDGER extended).

## 5. Paint verification

The BC anti-disease law: **no source-green close.** `tests-visual/suffuse.spec.ts` (or the `proof:ba-gestalt` `page-band` aggregate-surface verdict — the data panes' storybook-meta roster home, BD.W-GESTALT-ROSTER-GROW) on `:5199`, BOTH modes × desktop+mobile (the getComputedStyle readback — the binding truth):
- the data band reads the `--section-color-9` slate event COHERENTLY across all 14 stories (the tinted eyebrow + accent rail + IconChip POP resolve the `--section-color-9` hue — a computed-style readback, not a string match);
- the body ink stays untinted (no `<p>` value/unit run carries the section tint);
- ONE event per surface (no second competing hue);
- the band reads with the SAME coherence the feedback band's `--section-color-8` ruby carries.
The captured DELTA is the binding proof. The `proof:ba-gestalt` `page-band` aggregate-surface verdict on the fresh capture (G7 auto-revokes the drifted demo-SFC surface-hash).

## 6. Fences + risks

- **PROPORTION FENCE** — ONE color event per surface (chip+rail+eyebrow in ONE hue; body ink untinted; per-item ramp dots are the same `section-color` family, not a second event). `proof:suffuse` d1-d3 stay GREEN; a legitimately-documentary route (if any) earns no event. Never a four-hue rainbow.
- **PRESETS-IN-CONSUMERS** — the identity reads the LIBRARY `--section-color-9` ramp, never a hand-rolled raw-Tailwind `bg-slate-*`/`text-slate-*` (M7 stray-blue stays closed). The chip is the `<IconChip :section>` primitive (no inline re-paste — proof:icon-chip D4).
- **MUST NOT** add a live GL substrate to a data route (the proof:suffuse (e)-clause substrate fence + proof:storybook-meta M8) — the data band rides the static grid wash; the suffuse event is a CSS color event, not a substrate.
- **Coordinate with BD.W-PAGE-HEADER-FOLD** — table.vue + data-table.vue have their page-identity header folded onto `<StorySectionHeader :section="9">` (the page-top IconChip-led header, in PAGE-HEADER-FOLD's 36-set); the `:section="9"` on the primitive IS the event (do not add a second header). The 11 others get the header here.
- **Coordinate with BD.W-DATA-BAND-GLASS** — the section-color tints stay; the glass wave touches only the `bg-card`/`shadow-cartoon` opaque plate. They are disjoint paint channels.
- **metric-stack/metric-cell reference-class** — their `--chart-*` viz is the component teaching content (LEDGER kind `reference`); the `--section-color-9` page identity is ADDITIVE page chrome, not a competing event (the progress/badge reference precedent).
- Zero `src/` paint — the IconChip/section ramp are library components consumed; the LEDGER extend is a `scripts/` edit.
