// D4-F block test · reading 2 · the anatomical reading: the consumer names its rows in library slots.
// ToggleGroupItem (reading2.patch) renders `#media` above and `#meta` below the default slot, each in a marked
// wrapper (`.toggle-group__media`, `.toggle-group__meta`); the cell rule reads their presence. Each site's content
// is unchanged, only placed: K1's readout is `#meta`, K2's stage and V1's glyph are `#media`, the name or label stays
// the default slot. No item carries a consumer class (a tile rule owns the item's layout).
export default {
  preset: {
    group: `<ToggleGroup type="single" data-group aria-label="Spring presets" class="preset-grid grid w-auto max-w-none grid-cols-2 gap-2" v-model="model">
        <ToggleGroupItem v-for="p in orderedPresets" :key="p.name" :value="p.name" :title="p.blurb" data-item>
          <span data-ink class="text-small text-foreground capitalize">{{ p.name }}</span>
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
  },
};
