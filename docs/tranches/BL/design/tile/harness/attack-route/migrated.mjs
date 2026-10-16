// attack-route · H4-1, the shared attack set's compositions. Not a migration: each site is an attack, mounted as the
// "migrated" arm of a build made with `build.mjs <worktree> --route <this dir>`, and read by fact-split.mjs,
// attack.mjs and corner-refusal.mjs. One composition serves every route: a tile group carries BOTH live
// declarations of pass 4, D′'s `shape="cell"` on the group and F's filled `#meta` slot on the items. A route reads
// only its own declaration (D′ ignores a slot it does not have; F's ToggleGroup takes `shape` as a plain attribute),
// so D′ and F mount the same markup and the two critics read the same cells (REGISTRY §P3-6.2 H4-1). At HEAD and on
// floor v2 neither declaration exists, and every group here is a pill group.
//   preset    the reference tile group, with consumer attributes on every item (ATTACK `attrs`; the CORNER host;
//             FACT reads the declared reference on `specimen`)
//   specimen  FACT: a tile group holding a pill group (`.atk-pill-in`), and a pill group beside it (`.atk-pill-beside`)
//   v2        FACT: a pill group holding a one-item tile group (`.atk-tile-in`): the nesting reach
//   c1        ATTACK `empty`: no declaration; every item's optional slots render nothing (`v-if` on absent data)
//   strip     ATTACK `sup`: pills whose label carries a superscript (one row of text)
export const ATTACK_LABEL = "H4-attack";
const pills = (cls, label) => `<ToggleGroup type="single" aria-label="${label}" model-value="a" class="${cls}">
          <ToggleGroupItem value="a" data-atk-item><span data-ink>Nested A</span></ToggleGroupItem>
          <ToggleGroupItem value="b" data-atk-item><span data-ink>Nested B</span></ToggleGroupItem>
        </ToggleGroup>`;
export default {
  preset: {
    group: `<ToggleGroup type="single" shape="cell" data-group aria-label="Spring presets" class="preset-grid grid w-auto max-w-none grid-cols-2 gap-2" v-model="model">
        <ToggleGroupItem v-for="p in orderedPresets" :key="p.name" :value="p.name" data-item
          class="atk-consumer" style="--atk-style: 7" data-consumer="yes" :aria-label="'preset ' + p.name"
          role="option" tabindex="0"
          @click="$event.currentTarget.dataset.clicks = String(Number($event.currentTarget.dataset.clicks || 0) + 1)">
          <span data-ink class="text-small capitalize">{{ p.name }}</span>
          <template #meta><span data-ink data-line-slot class="text-mono-caption tabular-nums whitespace-nowrap">{{ p.response }} s · ζ {{ p.damping }}</span></template>
        </ToggleGroupItem>
      </ToggleGroup>`,
  },
  specimen: {
    group: `<div class="atk-split flex flex-col gap-3">
      <ToggleGroup type="single" shape="cell" data-group aria-label="Tiles" class="atk-tile grid grid-cols-2 gap-2" v-model="model">
        <ToggleGroupItem v-for="p in PRESETS.slice(0, 2)" :key="p.name" :value="p.name" data-item>
          <span data-ink class="text-small capitalize">{{ p.name }}</span>
          <template #meta><span data-ink data-line-slot class="text-mono-caption">{{ p.response }} s</span></template>
        </ToggleGroupItem>
        <div class="atk-nest col-span-2">
        ${pills("atk-pill-in", "Nested pills")}
        </div>
      </ToggleGroup>
      ${pills("atk-pill-beside", "Pills beside")}
      </div>`,
  },
  v2: {
    group: `<ToggleGroup type="multiple" data-group aria-label="Mix sources" class="atk-outer" v-model="multi">
        <ToggleGroupItem v-for="p in PALETTES" :key="p.slug" :value="p.slug" data-item>
          <span data-ink data-line-slot>{{ p.name }}</span>
        </ToggleGroupItem>
        <div class="atk-nest">
          <ToggleGroup type="single" shape="cell" aria-label="Inner" model-value="x" class="atk-tile-in">
            <ToggleGroupItem value="x" data-atk-item><span data-ink>Inner</span><template #meta><span data-ink>tile</span></template></ToggleGroupItem>
          </ToggleGroup>
        </div>
      </ToggleGroup>`,
  },
  c1: {
    group: `<ToggleGroup type="single" orientation="vertical" data-group aria-label="Status" class="min-w-48" v-model="model">
        <ToggleGroupItem v-for="o in STATUSES" :key="o.value" :value="o.value" data-item>
          <span data-ink data-line-slot>{{ o.label }}</span>
          <template #media><span v-if="o.icon" class="size-4"></span></template>
          <template #meta><span v-if="o.hint" class="text-micro">{{ o.hint }}</span></template>
        </ToggleGroupItem>
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
