// D4-D′ pass-6 critic · the strip-reach compositions (FV5-2's reset and the pin's widened limit), on D′'s declaration.
// Not a migration and not a harness change: a scene app built with `build.mjs <worktree> --route <this dir>` renders
// the key `critp6` as `critp6-migrated` (a key that is no consumer site renders as written). Read by
// ../probes/crit-p6.mjs. Every strip's tabs carry two block rows through `#option`, as H6-3's do.
//   vt   a tile option (`shape="cell"`) holding a VERTICAL pill strip            want: each tab one row, nothing cut
//   ut   a tile option holding an UNDERLINE strip (`semantics="tabs"`)          want: each tab one row, nothing cut
//   ct   a tile option holding a strip whose first tab holds a `shape="cell"` group  want: the inner options are tiles
//   sw   a tile option holding a pill strip; the probe injects a consumer write ON the strip (FLOOR-V5 §1.2, info)
//   ref-v, ref-u  the same strips outside any group (the references)
const two = `<template #option="{ option }"><span class="block">{{ option.label }}</span><span class="block text-micro">two</span></template>`;
const strip = (id, extra = "") => `<SegmentedTabs data-c-st="${id}" :model-value="tabsOptions[0].value" :options="tabsOptions" aria-label="Strip ${id}" ${extra}>${two}</SegmentedTabs>`;
const opt = (v, inner) => `<ToggleGroupItem value="${v}" data-c-item="${v}"><span class="block" data-c-content><span class="block">Gentle</span><span class="block text-micro">soft</span></span>${inner}</ToggleGroupItem>`;
const cellInTab = `<SegmentedTabs data-c-st="ct" :model-value="tabsOptions[0].value" :options="tabsOptions.slice(0, 2)" semantics="radio" aria-label="Strip ct"><template #option="{ option }"><span>{{ option.label }}</span><ToggleGroup v-if="option.value === tabsOptions[0].value" type="single" shape="cell" model-value="i0" aria-label="Inner tiles" data-c-inner><ToggleGroupItem value="i0" data-c-inner-item="i0"><span class="block">Inner</span><span class="block text-micro">row</span></ToggleGroupItem><ToggleGroupItem value="i1" data-c-inner-item="i1"><span class="block">Other</span><span class="block text-micro">row</span></ToggleGroupItem></ToggleGroup></template></SegmentedTabs>`;
export default {
  critp6: {
    group: `<div class="c-both flex flex-col gap-6" data-c>
      <ToggleGroup type="single" shape="cell" aria-label="Crit tiles" model-value="vt" class="c-group grid grid-cols-1 gap-2" data-c-group>
        ${opt("vt", strip("vt", 'orientation="vertical" semantics="radio"'))}
        ${opt("ut", strip("ut", 'variant="underline" semantics="tabs"'))}
        ${opt("ct", cellInTab)}
        ${opt("sw", strip("sw", 'semantics="radio"'))}
      </ToggleGroup>
      ${strip("ref-v", 'orientation="vertical" semantics="radio"')}
      ${strip("ref-u", 'variant="underline" semantics="tabs"')}
      ${strip("ref-p", 'semantics="radio"')}
      </div>`,
    css: `.c-both { inline-size: 520px; }`,
  },
};
