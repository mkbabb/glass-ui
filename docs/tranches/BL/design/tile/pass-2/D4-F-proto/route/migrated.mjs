// D4-F prototype · the route's migrated arms (H-7). Copied from ../../D4-F-spec/route/migrated.mjs and changed in
// one site: F1's `is-bound` endpoint is content in `#meta` (a word), not a consumer border (spec R-2b).
// D4-F · the route's migrated arms (H-7). The anatomy declares the tile: each site's content is unchanged and only
// PLACED. A row above the label goes in `#media`, a row below it in `#meta`, the label stays the default slot. No
// item carries a paint class, and no group or item carries a shape declaration. The css below is the consumer's
// own content styling under the migration (scoped to the migrated arm by build.mjs): a stroke that reads
// `currentColor` takes the library's state ink through the media row (X-2), so no `[data-state="on"] path` rule.
//   preset    K1  name / readout                    → label + #meta
//   specimen  K2  stage / name / sr-only            → #media + label (+ the sr-only description, an adornment)
//   strip     V1  glyph / label, selectable Chips   → ToggleGroup single: #media + label
//   f1        F1  thumbnail / label, glass Buttons  → ToggleGroup single: #media + label; the bound endpoint is a #meta word
//   v2        V2  thumbnail / name / count, N-of-M  → ToggleGroup multiple (Q-7 a): #media + label + #meta
//   c1        C1  radios in one-line rows           → ToggleGroup single, vertical: one-row pills (no anatomy)
export default {
  preset: {
    group: `<ToggleGroup type="single" data-group aria-label="Spring presets" class="preset-grid grid w-auto max-w-none grid-cols-2 gap-2" v-model="model">
        <ToggleGroupItem v-for="p in orderedPresets" :key="p.name" :value="p.name" :title="p.blurb" data-item>
          <span data-ink class="text-small capitalize">{{ p.name }}</span>
          <template #meta><span data-ink data-line-slot class="text-mono-caption tabular-nums whitespace-nowrap">{{ p.response }} s · ζ {{ p.damping }}</span></template>
        </ToggleGroupItem>
      </ToggleGroup>`,
  },
  specimen: {
    group: `<ToggleGroup type="single" size="sm" data-group aria-label="Easing curve specimens" class="specimen-grid-group" v-model="model">
        <section v-for="g in CURVE_GROUPS" :key="g.family" class="catalogue-section">
          <h3 class="catalogue-family text-subheading">{{ g.family }}</h3>
          <div class="specimen-grid">
            <ToggleGroupItem v-for="c in g.items" :key="c.name" :value="c.name" :aria-describedby="'desc-' + c.name" data-item data-surface="opaque">
              <template #media><span data-ink class="tile-stage" aria-hidden="true"><span class="tile-plot"><svg class="tile-sparkline" viewBox="0 0 1 1" preserveAspectRatio="none"><path :d="c.path" vector-effect="non-scaling-stroke" /></svg><span class="curve-carriage tile-carriage" style="--curve-rest: translate(0%, 100%)"><span class="curve-ball tile-ball"></span></span></span></span></template>
              <span data-ink data-line-slot class="tile-name text-mono-caption" data-register="code">{{ c.name }}</span>
              <span :id="'desc-' + c.name" class="sr-only" aria-hidden="true">{{ c.description }}</span>
            </ToggleGroupItem>
          </div>
        </section>
      </ToggleGroup>`,
    // the group pad is the library's (the ring's reach); the tile keeps the consumer's containment (X-3)
    css: `.specimen-grid-group { padding: var(--focus-ring-reach) var(--focus-ring-reach) 1rem; }
      [data-item] { content-visibility: auto; contain-intrinsic-size: auto 104px; }
      .tile-sparkline path { stroke: currentColor; }
      .tile-name { align-self: stretch; }`,
  },
  strip: {
    group: `<ToggleGroup type="single" size="sm" data-group aria-label="Easing curve specimens" class="strip-row" v-model="model">
          <div v-for="fam in STRIP" :key="fam.family" class="strip-family">
            <span class="family-eyebrow" aria-hidden="true">{{ fam.family }}</span>
            <div class="family-tiles">
              <ToggleGroupItem v-for="t in fam.tiles" :key="fam.family + t[0]" :value="fam.family + '-' + t[0]" :aria-label="fam.family + '-' + t[0]" data-item>
                <template #media><svg data-ink class="tile-glyph" viewBox="0 0 1 1" aria-hidden="true"><path :d="t[1]" vector-effect="non-scaling-stroke" /></svg></template>
                <span data-ink data-line-slot class="tile-label">{{ t[0] }}</span>
              </ToggleGroupItem>
            </div>
          </div>
        </ToggleGroup>`,
    css: `.tile-glyph path { stroke: currentColor; }
      .toggle-group__media { justify-content: center; }
      .tile-label { align-self: center; }`,
  },
  f1: {
    group: `<ToggleGroup type="single" data-group aria-label="Harmonic level" class="f1-grid flex-nowrap max-w-full" v-model="model">
        <ToggleGroupItem v-for="lv in LEVELS" :key="lv.id" :value="lv.id" data-item>
          <template #media><svg data-ink viewBox="0 0 200 200" class="grid-svg"><path :d="lv.path" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg></template>
          <span data-ink data-line-slot class="grid-label">n={{ lv.n }}</span>
          <template v-if="lv.bound" #meta><span data-ink class="grid-bound text-micro">bound</span></template>
        </ToggleGroupItem>
      </ToggleGroup>`,
    css: `.grid-label, .grid-bound { align-self: center; }`,
  },
  v2: {
    group: `<ToggleGroup type="multiple" orientation="vertical" data-group aria-label="Mix sources" class="tx-v2 w-full" v-model="multi">
        <ToggleGroupItem v-for="p in PALETTES" :key="p.slug" :value="p.slug" data-item>
          <template #media><span data-ink class="tx-v2-strip w-full overflow-hidden rounded-sm"><span v-for="c in p.colors" :key="c" :style="{ background: c }"></span></span></template>
          <span data-ink class="mix-palette-name text-small font-display truncate">{{ p.name }}</span>
          <template #meta><span data-ink data-line-slot class="fira-code text-micro">{{ p.colors.length }} colours</span></template>
        </ToggleGroupItem>
      </ToggleGroup>`,
  },
  c1: {
    group: `<ToggleGroup type="single" orientation="vertical" data-group aria-label="Status" class="min-w-48" v-model="model">
        <ToggleGroupItem v-for="o in STATUSES" :key="o.value" :value="o.value" data-item>
          <span data-ink data-line-slot class="flex-1 text-left">{{ o.label }}</span>
          <span v-if="o.count !== undefined" data-ink class="num">{{ o.count }}</span>
        </ToggleGroupItem>
      </ToggleGroup>`,
  },
};
