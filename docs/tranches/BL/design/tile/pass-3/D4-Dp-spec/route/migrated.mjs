// D4-D′ pass-3 spec seat · the six consumer migrations, carried byte-for-byte in markup from ../../pass-2/D4-Dp-proto/route/migrated.mjs
// (sha1 in ../D4-Dp-spec.md), as the harness's migrated arm (H-7). On floor v2 `shape="cell"` sets `--selection-tile: flush`.
// Each deletes every consumer rule that paints the item (corner, outline, fill, border, selected ink) and the
// item utilities `shape="cell"` now supplies (column, pad pair, leading). What stays is the consumer's content,
// its content typography and its group LAYOUT (grid, columns, gap), which `cell` does not own (CX-5).
// X-2: each stage strokes with the library's `--selection-ink`, one stateless rule, no `[data-state="on"]` rule.
export default {
  // K1 SpringPhysicsFacet: the group reset (rounded-none bg-transparent p-0 shadow-none backdrop-filter-none)
  // deletes (the group paints nothing, and p-0 cut the ring's reach); item utilities and scoped paint delete.
  preset: {
    group: `<ToggleGroup type="single" shape="cell" data-group aria-label="Spring presets" class="preset-grid grid w-auto max-w-none grid-cols-2 gap-2" v-model="model">
        <ToggleGroupItem v-for="p in orderedPresets" :key="p.name" :value="p.name" :title="p.blurb" data-item class="preset-cell w-full min-w-0">
          <span data-ink class="text-small capitalize">{{ p.name }}</span>
          <span data-ink data-line-slot class="text-mono-caption text-muted-foreground tabular-nums whitespace-nowrap">{{ p.response }} s · ζ {{ p.damping }}</span>
        </ToggleGroupItem>
      </ToggleGroup>`,
  },
  // K2 EasingCatalogue: shape="cell" size="sm"; the item's flex-col/pad utilities, the group reset, the corner,
  // the outline selection and the selected stroke/ink rules delete. The group's own `padding: 2px 2px 1rem`
  // (unlayered, it outranks the ring reach, FL-5) becomes a bottom pad only on a migrated class.
  specimen: {
    group: `<ToggleGroup type="single" shape="cell" size="sm" data-group aria-label="Easing curve specimens" class="mig-specimen-group" v-model="model">
        <section v-for="g in CURVE_GROUPS" :key="g.family" class="catalogue-section">
          <h3 class="catalogue-family text-subheading">{{ g.family }}</h3>
          <div class="specimen-grid">
            <ToggleGroupItem v-for="c in g.items" :key="c.name" :value="c.name" :aria-describedby="'desc-' + c.name" data-item data-surface="opaque" class="specimen-tile">
              <span data-ink class="tile-stage" aria-hidden="true"><span class="tile-plot"><svg class="tile-sparkline" viewBox="0 0 1 1" preserveAspectRatio="none"><path :d="c.path" vector-effect="non-scaling-stroke" /></svg><span class="curve-carriage tile-carriage" style="--curve-rest: translate(0%, 100%)"><span class="curve-ball tile-ball"></span></span></span></span>
              <span data-ink data-line-slot class="tile-name text-mono-caption" data-register="code">{{ c.name }}</span>
              <span :id="'desc-' + c.name" class="sr-only" aria-hidden="true">{{ c.description }}</span>
            </ToggleGroupItem>
          </div>
        </section>
      </ToggleGroup>`,
    css: `.mig-specimen-group { display: flex; flex-direction: column; flex-wrap: nowrap; align-items: stretch; gap: 1.25rem; inline-size: 100%; padding-block-end: 1rem; }
      .tile-sparkline path { stroke: var(--selection-ink); }
      .tile-name { color: var(--selection-ink); }`,
  },
  // V1 EasingSpecimenStrip: Chip icon circles in a `group` (aria-pressed, 3 stops) become ONE radiogroup of cell
  // tiles; the family rows keep their inline layout (the consumer's), and the selected glyph/label rules delete.
  strip: {
    group: `<ToggleGroup type="single" shape="cell" size="sm" data-group aria-label="Easing curve specimens" class="strip-row" v-model="model">
          <div v-for="fam in STRIP" :key="fam.family" class="strip-family">
            <span class="family-eyebrow" aria-hidden="true">{{ fam.family }}</span>
            <div class="family-tiles">
              <ToggleGroupItem v-for="t in fam.tiles" :key="fam.family + t[0]" :value="fam.family + '-' + t[0]" :aria-label="fam.family + '-' + t[0]" data-item class="vj-tile">
                <svg data-ink class="tile-glyph" viewBox="0 0 1 1" aria-hidden="true"><path :d="t[1]" vector-effect="non-scaling-stroke" /></svg>
                <span data-ink data-line-slot class="tile-label">{{ t[0] }}</span>
              </ToggleGroupItem>
            </div>
          </div>
        </ToggleGroup>`,
    css: `.tile-glyph path { stroke: var(--selection-ink); }
      .tile-label { color: var(--selection-ink); }`,
  },
  // F1 HarmonicLevelGrid (H-10): a thumbnail strip of glass Buttons with no ARIA state becomes a one-of-N cell
  // group. The strip's scroll layout stays the consumer's; the border, fill, shadow, hover and active paint and the
  // active label ink delete. `is-bound` (a bound endpoint) stays as the consumer's MEANING with no border paint:
  // a border would be a second state on the selected carrier's neighbour channel (X-1), which the perimeter
  // survives (probes/states.mjs "sibling"), but F1 carries it as content in its own tranche.
  f1: {
    group: `<ToggleGroup type="single" shape="cell" size="sm" data-group aria-label="Harmonic level" class="f1-grid" v-model="model">
        <ToggleGroupItem v-for="lv in LEVELS" :key="lv.id" :value="lv.id" data-item class="grid-cell" :class="{ 'is-bound': lv.bound }">
          <svg data-ink viewBox="0 0 200 200" class="grid-svg"><path :d="lv.path" fill="none" stroke="var(--accent-red)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>
          <span data-ink data-line-slot class="grid-label">n={{ lv.n }}</span>
        </ToggleGroupItem>
      </ToggleGroup>`,
    css: `.grid-label { color: var(--selection-ink); }`,
  },
  // V2 MixSourceSelector (H-10, Q-7 (a)): N-of-M palettes on native buttons with aria-pressed become
  // `type="multiple" shape="cell"`, the same tile anatomy as the single arm (X-4), a <button> host. The ring,
  // rounded-card, the selected ring-2 and the rest-name ink delete.
  v2: {
    group: `<ToggleGroup type="multiple" shape="cell" data-group aria-label="Mix sources" class="flex flex-col gap-2" v-model="multi">
        <ToggleGroupItem v-for="p in PALETTES" :key="p.slug" :value="p.slug" data-item class="w-full">
          <span data-ink class="tx-v2-strip overflow-hidden rounded-sm"><span v-for="c in p.colors" :key="c" :style="{ background: c }"></span></span>
          <span data-ink class="flex items-center justify-between gap-2 min-w-0">
            <span class="mix-palette-name text-small font-display font-semibold truncate">{{ p.name }}</span>
            <span data-line-slot class="fira-code text-micro text-muted-foreground shrink-0">{{ p.colors.length }}</span>
          </span>
        </ToggleGroupItem>
      </ToggleGroup>`,
  },
  // C1 chicago status filter (H-10): hand-rolled radios with a check mark become a vertical one-of-N PILL group
  // (every option is one line); the mark is content rendered from the model, not paint. rounded-md and the
  // hover/checked fill delete.
  c1: {
    group: `<ToggleGroup type="single" orientation="vertical" data-group aria-label="Status" class="min-w-48" v-model="model">
        <ToggleGroupItem v-for="o in STATUSES" :key="o.value" :value="o.value" data-item class="justify-start">
          <svg class="size-4 shrink-0" :class="model === o.value ? 'opacity-100' : 'opacity-0'" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
          <span data-ink data-line-slot class="flex-1 text-start">{{ o.label }}</span>
          <span v-if="o.count !== undefined" data-ink class="text-muted-foreground num">{{ o.count }}</span>
        </ToggleGroupItem>
      </ToggleGroup>`,
  },
};
