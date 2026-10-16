// floor-v3/probes/route-multi · FV3-2's one measurement the pass-3 critic read from code only (`D′c` §5): a consumer
// `role`, `tabindex` and selection state on the items of a `type="multiple"` ToggleGroup. Not a migration: the V2
// palette set mounted as the "migrated" arm of a build made with `build.mjs <worktree> --route <this dir>`, and read by
// `../multi-role.mjs`. `preset` carries the same attributes on a `type="single"` group, the pair's control.
export default {
  v2: {
    group: `<ToggleGroup type="multiple" data-group aria-label="Mix sources" v-model="multi">
        <ToggleGroupItem v-for="p in PALETTES" :key="p.slug" :value="p.slug" data-item
          role="option" tabindex="0" aria-checked="false" aria-pressed="false" data-consumer="yes">
          <span data-ink data-line-slot>{{ p.name }}</span>
        </ToggleGroupItem>
      </ToggleGroup>`,
  },
  preset: {
    group: `<ToggleGroup type="single" data-group aria-label="Spring presets" v-model="model">
        <ToggleGroupItem v-for="p in orderedPresets" :key="p.name" :value="p.name" data-item
          role="option" tabindex="0" aria-checked="false" aria-pressed="false" data-consumer="yes">
          <span data-ink data-line-slot class="capitalize">{{ p.name }}</span>
        </ToggleGroupItem>
      </ToggleGroup>`,
  },
};
