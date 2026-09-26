// D4-F block test · reading 1 · the one migration reading 1 needs to read V1 at all.
// V1 (value.js EasingSpecimenStrip) is a row of selectable Chips at HEAD, so a ToggleGroupItem rule cannot see it.
// This arm moves V1 onto ToggleGroup with its content unchanged: a bare glyph `svg` over a label `span`, as
// scenes.mjs transcribes it (EasingSpecimenStrip.vue:86-227). The item carries no consumer class: V1's `vj-tile`
// (a 2.75rem column) is item layout, which a tile rule owns under F. K1 and K2 need no migration for reading 1:
// their library arms already hold two element rows.
export default {
  strip: {
    group: `<ToggleGroup type="single" size="sm" data-group aria-label="Easing curve specimens" class="strip-row" v-model="model">
          <div v-for="fam in STRIP" :key="fam.family" class="strip-family">
            <span class="family-eyebrow" aria-hidden="true">{{ fam.family }}</span>
            <div class="family-tiles">
              <ToggleGroupItem v-for="t in fam.tiles" :key="fam.family + t[0]" :value="fam.family + '-' + t[0]" :aria-label="fam.family + '-' + t[0]" data-item>
                <svg data-ink class="tile-glyph" viewBox="0 0 1 1" aria-hidden="true"><path :d="t[1]" vector-effect="non-scaling-stroke" /></svg>
                <span data-ink data-line-slot class="tile-label">{{ t[0] }}</span>
              </ToggleGroupItem>
            </div>
          </div>
        </ToggleGroup>`,
  },
};
