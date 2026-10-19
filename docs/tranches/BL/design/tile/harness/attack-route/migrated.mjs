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
//   matrix    H5-2 FACT's write-site × read-site matrix and H5-4's mount-time name: a tile group and a pill group, each
//             with a direct option, an option behind a wrapper `div`, and an option that holds a nested group of the
//             other kind (`matrix-migrated`). `?w=<site>&v=<value>` writes `--selection-tile: <value>` inline at mount
//             on that site in BOTH groups (`mx(site)`, scenes.mjs), so the development names see the write. Sites:
//             ancestor (a div around the group), group, wrapper, option (the direct option), content (a span inside
//             it; the direct option's only), nested-group (the root of the group inside the third option), nested-option (that group's first
//             option). Every option's content holds two block rows (`[data-mx-content]`) the pill's one-row law runs
//             inline, so a reader that splits the fact shows in the rows. Values are unique per option (the names
//             carry them)
//             H6-3: each group also has a fourth option (`td`, `pd`) holding a SegmentedTabs (`data-mx-st="t"` | `"p"`),
//             the other `.pill-row` holder, whose tabs each carry two block rows through `#option`; the same strip
//             beside the groups is the reference (`data-mx-st="ref"`). FACT reads the tab's rows, the strip's height
//             and the development names (`Fc5` §3.1's `stnest`, moved into the matrix)
export const ATTACK_LABEL = "H4-attack";
/** H6-3: a SegmentedTabs whose tabs carry two block rows (a `.pill-row` holder that is not a group) */
const mxStrip = (which) => `<SegmentedTabs data-mx-st="${which}" :model-value="tabsOptions[0].value" :options="tabsOptions" semantics="radio" aria-label="Strip ${which}"><template #option="{ option }"><span class="block">{{ option.label }}</span><span class="block text-micro">two</span></template></SegmentedTabs>`;
/** H5-2: one option of the matrix: two block rows of content, a #meta row for a tile (F's declaration). */
const mxContent = (a, b, site = false) => `<span data-mx-content${site ? ` data-mx-site="content" :style="mx('content')"` : ""} class="block"><span class="block">${a}</span><span class="block text-micro">${b}</span></span>`;
const mxGroup = (kind) => {
  const tile = kind === "tile";
  const t = tile ? "t" : "p";
  const decl = (on) => (on ? ' shape="cell"' : "");
  const meta = (on) => (on ? `<template #meta><span class="text-mono-caption">0.5 s</span></template>` : "");
  return `<div data-mx-kind="${kind}" data-mx-site="ancestor" :style="mx('ancestor')" class="mx-host">
        <ToggleGroup type="single"${decl(tile)} aria-label="Matrix ${kind}s" model-value="${t}a" data-mx-site="group" :style="mx('group')" class="mx-group grid grid-cols-2 gap-2">
          <ToggleGroupItem value="${t}a" data-mx-item="${t}a" data-mx-site="option" :style="mx('option')">${mxContent("Smooth", "calm", true)}${meta(tile)}</ToggleGroupItem>
          <div data-mx-site="wrapper" :style="mx('wrapper')" class="mx-wrap">
            <ToggleGroupItem value="${t}b" data-mx-item="${t}b">${mxContent("Snappy", "quick")}${meta(tile)}</ToggleGroupItem>
          </div>
          <ToggleGroupItem value="${t}c" data-mx-item="${t}c">${mxContent("Bouncy", "lively")}
            <ToggleGroup type="single"${decl(!tile)} aria-label="Nested ${tile ? "pills" : "tiles"}" model-value="${t}n0" data-mx-site="nested-group" :style="mx('nested-group')">
              <ToggleGroupItem value="${t}n0" data-mx-item="${t}n0" data-mx-site="nested-option" :style="mx('nested-option')">${mxContent("Inner", "row")}${meta(!tile)}</ToggleGroupItem>
              <ToggleGroupItem value="${t}n1">${mxContent("Other", "row")}${meta(!tile)}</ToggleGroupItem>
            </ToggleGroup>
            ${meta(tile)}
          </ToggleGroupItem>
          <ToggleGroupItem value="${t}d" data-mx-item="${t}d" class="mx-st-opt">${mxContent("Gentle", "soft")}${mxStrip(t)}${meta(tile)}</ToggleGroupItem>
        </ToggleGroup>
      </div>`;
};
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
  matrix: {
    group: `<div class="mx-both flex flex-col gap-6" data-mx>
      ${mxGroup("tile")}
      ${mxGroup("pill")}
      ${mxStrip("ref")}
      </div>`,
    css: `.mx-host { inline-size: 460px; } .mx-wrap, .mx-st-opt { grid-column: 1 / -1; } .mx-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }`,
  },
  strip: {
    group: `<ToggleGroup type="single" data-group aria-label="Area unit" v-model="model">
        <ToggleGroupItem v-for="fam in STRIP.flatMap((f) => f.tiles.map((t) => f.family + '-' + t[0]))" :key="fam" :value="fam" data-item>
          <span data-ink data-line-slot>m<sup>2</sup> {{ fam }}</span>
        </ToggleGroupItem>
      </ToggleGroup>`,
  },
};
