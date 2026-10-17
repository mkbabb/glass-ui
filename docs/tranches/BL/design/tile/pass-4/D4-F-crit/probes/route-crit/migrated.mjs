// D4-F pass 4 · CRITIC compositions (not a migration). Mounted as the "migrated" arm of a build made with
// `build.mjs <worktree> --route <this dir>` and read by ../crit-f.mjs. Each probed group carries `data-cg`, each
// probed item `data-ci`. The flip compositions read `order`, the scene app's own ref that `window.__tile.reorder()`
// reverses, so a slot empties or fills through Vue's reactivity (the prototype's anatomy-flip edits the DOM instead).
//   preset    VF · reactive flip, tile → pills → tile: every `#meta` is `v-if="order[0] === PRESETS[0].name"`
//   strip     VR · reactive flip, pills → tile: every `#media` is `v-if="order[0] !== PRESETS[0].name"`
//   v2        N3 · a pill ToggleGroup inside a tile option's `#meta` (the prototype's N-3: the pin reaches it). An
//                  interactive descendant inside a <button>, which the floor names in development (X-5)
//   specimen  PL · the consumer writes `--selection-tile: plated` on a group whose options fill `#meta`
//   f1        WN · the consumer writes `--selection-tile: none` on a wrapper between the group and its options
//   c1        MX · one option fills `#meta`, three are bare labels: every option is a card (MIGRATION)
export default {
  preset: {
    group: `<ToggleGroup type="single" data-group data-cg="vflip" aria-label="Spring presets" class="grid w-auto max-w-none grid-cols-2 gap-2" v-model="model">
        <ToggleGroupItem v-for="(p, i) in PRESETS" :key="p.name" :value="p.name" data-item :data-ci="i === 0 ? 'vflip-0' : undefined">
          <span data-ink class="text-small capitalize">{{ p.name }}</span>
          <template #meta><span v-if="order[0] === PRESETS[0].name" data-ink class="text-mono-caption tabular-nums whitespace-nowrap">{{ p.response }} s · ζ {{ p.damping }}</span></template>
        </ToggleGroupItem>
      </ToggleGroup>`,
  },
  strip: {
    group: `<ToggleGroup type="single" data-group data-cg="vrise" aria-label="Families" v-model="model">
        <ToggleGroupItem v-for="(fam, i) in ['ease', 'spring', 'bounce']" :key="fam" :value="fam" data-item :data-ci="i === 0 ? 'vrise-0' : undefined">
          <template #media><svg v-if="order[0] !== PRESETS[0].name" viewBox="0 0 48 24" class="h-6 w-12" fill="none" aria-hidden="true"><path d="M2 20 C 14 20 22 4 46 4" stroke="currentColor" stroke-width="1.75" /></svg></template>
          <span data-ink>{{ fam }}</span>
        </ToggleGroupItem>
      </ToggleGroup>`,
  },
  v2: {
    group: `<ToggleGroup type="single" data-group data-cg="n3-outer" aria-label="Outer tiles" class="grid grid-cols-2 gap-2" v-model="model">
        <ToggleGroupItem v-for="(p, i) in PALETTES.slice(0, 2)" :key="p.slug" :value="p.slug" data-item :data-ci="i === 0 ? 'n3-outer-0' : undefined">
          <span data-ink>{{ p.name }}</span>
          <template #meta><span v-if="i === 1" data-ink>{{ p.colors.length }} colours</span><ToggleGroup v-else type="single" data-cg="n3-inner" aria-label="Nested pills" model-value="a">
            <ToggleGroupItem value="a" data-ci="n3-inner-0"><span data-ink>A</span></ToggleGroupItem>
            <ToggleGroupItem value="b"><span data-ink>B</span></ToggleGroupItem>
          </ToggleGroup></template>
        </ToggleGroupItem>
      </ToggleGroup>`,
  },
  specimen: {
    group: `<ToggleGroup type="single" data-group data-cg="plated" aria-label="Plated tiles" class="grid grid-cols-2 gap-2" style="--selection-tile: plated" v-model="model">
        <ToggleGroupItem v-for="(c, i) in CURVE_GROUPS[0].items.slice(0, 2)" :key="c.name" :value="c.name" data-item :data-ci="i === 0 ? 'plated-0' : undefined">
          <span data-ink>{{ c.name }}</span><template #meta><span data-ink>curve</span></template>
        </ToggleGroupItem>
      </ToggleGroup>`,
  },
  f1: {
    group: `<ToggleGroup type="single" data-group data-cg="wrapnone" aria-label="Wrapped" class="block" v-model="model">
        <div class="grid grid-cols-3 gap-2" style="--selection-tile: none">
          <ToggleGroupItem v-for="(lv, i) in LEVELS.slice(0, 3)" :key="lv.id" :value="lv.id" data-item :data-ci="i === 0 ? 'wrapnone-0' : undefined"><span data-ink>n={{ lv.n }}</span><template #meta><span data-ink>level</span></template></ToggleGroupItem>
        </div>
      </ToggleGroup>`,
  },
  c1: {
    group: `<ToggleGroup type="single" data-group data-cg="mixed" aria-label="Mixed" class="grid grid-cols-2 gap-2" v-model="model">
        <ToggleGroupItem v-for="(s, i) in STATUSES.slice(0, 4)" :key="s.value" :value="s.value" data-item :data-ci="'mixed-' + i">
          <span data-ink>{{ s.label ?? s.value }}</span><template v-if="i === 0" #meta><span data-ink>with a hint</span></template>
        </ToggleGroupItem>
      </ToggleGroup>`,
  },
};
