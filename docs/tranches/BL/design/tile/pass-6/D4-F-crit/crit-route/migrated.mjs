// D4-F pass-6 critic · strip compositions on F's ANATOMY (not a migration, not a harness change). A scene app built with
// `build.mjs <worktree> --route <this dir>` renders the key `critf6` as `critf6-migrated`. Read by ../probes/crit-f6.mjs
// (part `strip`). F invites a control below the label (`#meta`) or above it (`#media`); H6-3 builds one horizontal pill
// strip in a tile option's `#meta`. These are the other placements, each tab carrying two block rows through `#option`:
//   vt   a tile option whose #meta holds a VERTICAL pill strip                         want: each tab 1 row, uncut
//   ut   a tile option whose #meta holds an UNDERLINE strip (semantics="tabs")         want: the same
//   mt   a tile option whose #MEDIA holds a pill strip                                 want: the same
//   ct   a tile option whose #meta strip's first tab holds an anatomy group (#meta)    want: inner options tiles
//   pg   a PILL group (no anatomy of its own) whose option holds a strip whose tab holds an anatomy group
//        want: the outer option stays a pill (fact none, h/2): F counts groups, and a strip between is no group;
//        the inner options are tiles
//   ref-v, ref-u, ref-p  the same strips outside any group (references)
const two = `<template #option="{ option }"><span class="block">{{ option.label }}</span><span class="block text-micro">two</span></template>`;
const strip = (id, extra = "") => `<SegmentedTabs data-c-st="${id}" :model-value="tabsOptions[0].value" :options="tabsOptions" aria-label="Strip ${id}" ${extra}>${two}</SegmentedTabs>`;
const inner = (tag) => `<ToggleGroup type="single" model-value="i0" aria-label="Inner ${tag}" data-c-inner="${tag}"><ToggleGroupItem value="i0" data-c-inner-item="${tag}-0"><span>Inner</span><template #meta><span>row</span></template></ToggleGroupItem><ToggleGroupItem value="i1" data-c-inner-item="${tag}-1"><span>Other</span><template #meta><span>row</span></template></ToggleGroupItem></ToggleGroup>`;
const stripWithGroup = (id) => `<SegmentedTabs data-c-st="${id}" :model-value="tabsOptions[0].value" :options="tabsOptions.slice(0, 2)" semantics="radio" aria-label="Strip ${id}"><template #option="{ option }"><span>{{ option.label }}</span><template v-if="option.value === tabsOptions[0].value">${inner(id)}</template></template></SegmentedTabs>`;
const opt = (v, slot, x) => `<ToggleGroupItem value="${v}" data-c-item="${v}"><span>Gentle</span><template #${slot}>${x}</template></ToggleGroupItem>`;
export default {
  critf6: {
    group: `<div class="c-both flex flex-col gap-6" data-c>
      <ToggleGroup type="single" aria-label="Crit tiles" model-value="vt" class="grid grid-cols-1 gap-2" data-c-group>
        ${opt("vt", "meta", strip("vt", 'orientation="vertical" semantics="radio"'))}
        ${opt("ut", "meta", strip("ut", 'variant="underline" semantics="tabs"'))}
        ${opt("mt", "media", strip("mt", 'semantics="radio"'))}
        ${opt("ct", "meta", stripWithGroup("ct"))}
      </ToggleGroup>
      <ToggleGroup type="single" aria-label="Crit pills" model-value="pg" class="flex flex-col gap-2" data-c-pills>
        <ToggleGroupItem value="pg" data-c-item="pg">${stripWithGroup("pg")}</ToggleGroupItem>
        <ToggleGroupItem value="pq" data-c-item="pq"><span>Plain</span></ToggleGroupItem>
      </ToggleGroup>
      ${strip("ref-v", 'orientation="vertical" semantics="radio"')}
      ${strip("ref-u", 'variant="underline" semantics="tabs"')}
      ${strip("ref-p", 'semantics="radio"')}
      </div>`,
    css: `.c-both { inline-size: 520px; }`,
  },
};
