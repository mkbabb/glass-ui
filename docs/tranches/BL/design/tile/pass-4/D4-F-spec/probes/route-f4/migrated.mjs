// D4-F pass 4 · the route's own attack compositions (not a migration), mounted as the "migrated" arm of a build made
// with `build.mjs <worktree> --route <this dir>` and read by ../f4-attack.mjs. Each group says what it must be
// (`data-want`: the tile fact), each probed item what it must wear (`data-want-item`: tile | pill).
//   c1        E · empty anatomy in four spellings: a false v-if, a v-for over nothing, blank text, a slot left empty
//   v2        N · K2's wrappers (section > div) around tiles, with a pill group nested in one wrapper (pill-in-tile)
//   specimen  N · a pill group whose own items sit in wrappers, holding a tile group three wrappers down (tile-in-pill)
//   f1        N · both levels tiles: an outer tile group (wrapped items) holding a nested tile group
//   preset    P · the fact written on an option inside a tile group (`style="--selection-tile: none"`), and on the
//                 label's content (`--selection-tile: none` on a span in item 1)
//   strip     S · the fact written inside a pill's label: a span that sets `--selection-tile: flush; display: block`
export default {
  c1: {
    group: `<ToggleGroup type="single" orientation="vertical" data-group data-probe-g="empty" data-want="none" aria-label="Status" class="min-w-48" v-model="model">
        <ToggleGroupItem value="open" data-item data-probe-i="vif" data-want-item="pill"><span data-ink>Open</span><template #meta><span v-if="false">hint</span></template></ToggleGroupItem>
        <ToggleGroupItem value="draft" data-item data-probe-i="vfor" data-want-item="pill"><span data-ink>Draft</span><template #media><span v-for="x in []" :key="x">{{ x }}</span></template></ToggleGroupItem>
        <ToggleGroupItem value="closed" data-item data-probe-i="blank" data-want-item="pill"><span data-ink>Closed</span><template #meta>{{ '  ' }}</template></ToggleGroupItem>
        <ToggleGroupItem value="all" data-item data-probe-i="none" data-want-item="pill"><span data-ink>All</span><template #meta></template></ToggleGroupItem>
      </ToggleGroup>`,
  },
  v2: {
    group: `<ToggleGroup type="multiple" data-group data-probe-g="k2wrap" data-want="flush" aria-label="Wrapped tiles" class="block" v-model="multi">
        <section class="mb-2"><h3 class="text-micro">family</h3><div class="grid grid-cols-2 gap-2">
          <ToggleGroupItem v-for="p in PALETTES.slice(0, 2)" :key="p.slug" :value="p.slug" data-item data-probe-i="wrapped" data-want-item="tile">
            <span data-ink>{{ p.name }}</span><template #meta><span data-ink>{{ p.colors.length }} colours</span></template>
          </ToggleGroupItem>
        </div></section>
        <section><div class="p-1">
          <ToggleGroup type="single" data-probe-g="pill-in-tile" data-want="none" aria-label="Nested pills" model-value="a">
            <ToggleGroupItem value="a" data-probe-i="inner-pill" data-want-item="pill"><span data-ink>Nested A</span></ToggleGroupItem>
            <ToggleGroupItem value="b"><span data-ink>Nested B</span></ToggleGroupItem>
          </ToggleGroup>
        </div></section>
      </ToggleGroup>`,
  },
  specimen: {
    group: `<ToggleGroup type="single" data-group data-probe-g="pill-outer" data-want="none" aria-label="Pills" class="block" v-model="model">
        <div class="flex gap-2"><span>
          <ToggleGroupItem v-for="c in CURVE_GROUPS[0].items.slice(0, 2)" :key="c.name" :value="c.name" data-item data-probe-i="outer-pill" data-want-item="pill"><span data-ink>{{ c.name }}</span></ToggleGroupItem>
        </span></div>
        <div><div><div>
          <ToggleGroup type="single" data-probe-g="tile-in-pill" data-want="flush" aria-label="Inner tiles" model-value="x">
            <ToggleGroupItem value="x" data-probe-i="inner-tile" data-want-item="tile"><span data-ink>Inner</span><template #meta><span data-ink>tile</span></template></ToggleGroupItem>
          </ToggleGroup>
        </div></div></div>
      </ToggleGroup>`,
  },
  f1: {
    group: `<ToggleGroup type="single" data-group data-probe-g="tile-outer" data-want="flush" aria-label="Outer tiles" class="block" v-model="model">
        <div class="grid grid-cols-3 gap-2">
          <ToggleGroupItem v-for="lv in LEVELS.slice(0, 3)" :key="lv.id" :value="lv.id" data-item data-probe-i="outer-tile" data-want-item="tile"><span data-ink>n={{ lv.n }}</span><template #meta><span data-ink>level</span></template></ToggleGroupItem>
        </div>
        <div class="mt-2"><ToggleGroup type="single" data-probe-g="tile-in-tile" data-want="flush" aria-label="Inner tiles" model-value="y">
          <ToggleGroupItem value="y" data-probe-i="inner-tile" data-want-item="tile"><span data-ink>Inner</span><template #meta><span data-ink>tile</span></template></ToggleGroupItem>
        </ToggleGroup></div>
      </ToggleGroup>`,
  },
  preset: {
    group: `<ToggleGroup type="single" data-group data-probe-g="pinned" data-want="flush" aria-label="Spring presets" class="preset-grid grid w-auto max-w-none grid-cols-2 gap-2" v-model="model">
        <ToggleGroupItem v-for="(p, i) in orderedPresets" :key="p.name" :value="p.name" data-item :data-probe-i="i === 0 ? 'item-writes-none' : i === 1 ? 'content-writes-none' : undefined" :data-want-item="i < 2 ? 'tile' : undefined" :style="i === 0 ? '--selection-tile: none' : undefined">
          <span data-ink class="text-small capitalize">{{ p.name }}</span>
          <template #meta><span data-ink data-line-slot class="text-mono-caption tabular-nums whitespace-nowrap" :style="i === 1 ? '--selection-tile: none' : undefined">{{ p.response }} s · ζ {{ p.damping }}<span class="block">second</span></span></template>
        </ToggleGroupItem>
      </ToggleGroup>`,
  },
  strip: {
    group: `<ToggleGroup type="single" data-group data-probe-g="pill-content-writes" data-want="none" aria-label="Pills" v-model="model">
        <ToggleGroupItem v-for="(fam, i) in ['ease', 'spring', 'bounce']" :key="fam" :value="fam" data-item :data-probe-i="i === 0 ? 'label-writes-flush' : undefined" :data-want-item="i === 0 ? 'pill' : undefined">
          <span data-ink>{{ fam }}<span v-if="i === 0" style="--selection-tile: flush; display: block">0.5 s</span></span>
        </ToggleGroupItem>
      </ToggleGroup>`,
  },
};
