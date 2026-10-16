// D4-F pass-3 CRITIC · attack-route/migrated.mjs · consumer compositions the battery does not render, built as the
// "migrated" arm of four sites so the harness's own scene app (build.mjs --route) mounts them on the route's library.
// Not a migration: each site is an attack. Read by ../probes/attack.mjs.
//   c1      EMPTY ANATOMY. A generic option list whose #meta holds an optional hint (`v-if`); no status has one, so
//           no item fills #meta. MIGRATION.md: "A group whose items fill neither slot is pills".
//   preset  CONSUMER ATTRIBUTES under `inheritAttrs: false`: a consumer class, style, data-*, aria-label and @click
//           on each tile. The engine must keep role/tabindex; everything else must still land and the handler run.
//   v2      NESTING. A pill group (no anatomy) whose children include a wrapper holding a small tile group.
//   strip   A pill whose label carries a superscript (m<sup>2</sup>): one row of text; a development build must not
//           name it as "asks for a second row".
export default {
  c1: {
    group: `<ToggleGroup type="single" orientation="vertical" data-group aria-label="Status" class="min-w-48" v-model="model">
        <ToggleGroupItem v-for="o in STATUSES" :key="o.value" :value="o.value" data-item>
          <span data-ink data-line-slot>{{ o.label }}</span>
          <template #meta><span v-if="o.hint" class="text-micro">{{ o.hint }}</span></template>
        </ToggleGroupItem>
      </ToggleGroup>`,
  },
  preset: {
    group: `<ToggleGroup type="single" data-group aria-label="Spring presets" class="preset-grid grid w-auto max-w-none grid-cols-2 gap-2" v-model="model">
        <ToggleGroupItem v-for="p in orderedPresets" :key="p.name" :value="p.name" data-item
          class="atk-consumer" style="--atk-style: 7" data-consumer="yes" :aria-label="'preset ' + p.name"
          role="option" tabindex="0"
          @click="$event.currentTarget.dataset.clicks = String(Number($event.currentTarget.dataset.clicks || 0) + 1)">
          <span data-ink class="text-small capitalize">{{ p.name }}</span>
          <template #meta><span data-ink data-line-slot class="text-mono-caption tabular-nums whitespace-nowrap">{{ p.response }} s</span></template>
        </ToggleGroupItem>
      </ToggleGroup>`,
  },
  v2: {
    group: `<ToggleGroup type="multiple" data-group aria-label="Mix sources" class="atk-outer" v-model="multi">
        <ToggleGroupItem v-for="p in PALETTES" :key="p.slug" :value="p.slug" data-item>
          <span data-ink data-line-slot>{{ p.name }}</span>
        </ToggleGroupItem>
        <div class="atk-nest">
          <ToggleGroup type="single" aria-label="Inner" model-value="x" class="atk-inner">
            <ToggleGroupItem value="x" class="atk-inner-item">Inner<template #meta>tile</template></ToggleGroupItem>
          </ToggleGroup>
        </div>
      </ToggleGroup>`,
  },
  strip: {
    group: `<ToggleGroup type="single" data-group aria-label="Area unit" v-model="model">
        <ToggleGroupItem v-for="fam in STRIP.flatMap((f) => f.tiles.map((t) => f.family + '-' + t[0]))" :key="fam" :value="fam" data-item>
          <span data-ink data-line-slot>m<sup>2</sup> {{ fam }}</span>
        </ToggleGroupItem>
      </ToggleGroup>`,
  },
};
