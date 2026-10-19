// sites.mjs · H6-2 · ONE transcription per consumer site, with the declaration its only parameter (REGISTRY §P5-6.2
// H6-2, M-17; P-3). H5-5 wrote K2 once (`k2.mjs`) and XSCRIPT gated it; the other five sites stayed two hand copies,
// and they drifted beyond the declaration (D′'s `strip` and `f1` read `var(--selection-ink)` as consumer CSS, F's did
// not; D′'s preset readout and C1 count kept `text-muted-foreground`, a rest colour on content; D′'s C1 kept the
// consumer's model-bound check mark; F1 stroked with the consumer's red on D′ and `currentColor` on F; the V2 rows
// and the item layout classes differed). Here each site is written once:
//   "shape"    D′: `shape="cell"` on the group; every row in the default slot
//   "anatomy"  F: no group declaration; a row above the label in `#media`, a row below it in `#meta`
// The rule every site follows (FV5-1, REGISTRY §P5-2): the consumer keeps its content, its content typography and its
// group layout; nothing paints the option; content sets no ink of its own, so it inherits the item's ink, and media
// strokes with `currentColor`. A consumer rest colour on content is deleted, as is any selected paint, and the
// consumer's own selected-state mark (C1's model-bound check) goes with it: the library carries the selection. K2 is
// `k2.mjs`, imported, so the pass-5 route dirs and this module read one K2.
//   preset    K1  name / readout                     readout below the label
//   specimen  K2  stage / name / sr-only             `k2.mjs`
//   strip     V1  glyph / label                      glyph above the label; the column centred (the consumer's)
//   f1        F1  thumbnail / label / bound word     thumbnail above, the bound endpoint a word below; centred
//   v2        V2  swatches / name and count          swatches above; the name and count one row (the consumer's)
//   c1        C1  label / count                      one-row pills, no declaration on either route (Q-10 (b))
import { K2_SPECIMEN, K2_DECLARATIONS } from "./k2.mjs";

export const DECLARATIONS = K2_DECLARATIONS;
export function MIGRATED(declaration) {
  if (!DECLARATIONS.includes(declaration)) throw new Error(`MIGRATED: declaration is one of ${DECLARATIONS.join(", ")}`);
  const D = declaration === "shape";
  const shape = D ? ' shape="cell"' : "";
  const media = (x) => (D ? x : `<template #media>${x}</template>`);
  // a conditional row below the label: D′ puts the condition on the row, F on the slot (XSCRIPT's `undeclare` moves it back)
  const meta = (x, vif = "") => (D ? (vif ? x.replace(/^<([\w-]+)/, `<$1 v-if="${vif}"`) : x) : `<template${vif ? ` v-if="${vif}"` : ""} #meta>${x}</template>`);
  return {
    preset: {
      group: `<ToggleGroup type="single"${shape} data-group aria-label="Spring presets" class="preset-grid grid w-auto max-w-none grid-cols-2 gap-2" v-model="model">
        <ToggleGroupItem v-for="p in orderedPresets" :key="p.name" :value="p.name" :title="p.blurb" data-item class="w-full min-w-0">
          <span data-ink class="text-small capitalize">{{ p.name }}</span>
          ${meta(`<span data-ink data-line-slot class="text-mono-caption tabular-nums whitespace-nowrap">{{ p.response }} s · ζ {{ p.damping }}</span>`)}
        </ToggleGroupItem>
      </ToggleGroup>`,
    },
    specimen: K2_SPECIMEN(declaration),
    strip: {
      group: `<ToggleGroup type="single"${shape} size="sm" data-group aria-label="Easing curve specimens" class="strip-row" v-model="model">
          <div v-for="fam in STRIP" :key="fam.family" class="strip-family">
            <span class="family-eyebrow" aria-hidden="true">{{ fam.family }}</span>
            <div class="family-tiles">
              <ToggleGroupItem v-for="t in fam.tiles" :key="fam.family + t[0]" :value="fam.family + '-' + t[0]" :aria-label="fam.family + '-' + t[0]" data-item>
                ${media(`<svg data-ink class="tile-glyph" viewBox="0 0 1 1" aria-hidden="true"><path :d="t[1]" vector-effect="non-scaling-stroke" /></svg>`)}
                <span data-ink data-line-slot class="tile-label">{{ t[0] }}</span>
              </ToggleGroupItem>
            </div>
          </div>
        </ToggleGroup>`,
      // the consumer's tile centres its column (EasingSpecimenStrip.vue's `.vj-tile { align-items: center }`)
      css: `[data-item] { align-items: center; }`,
    },
    f1: {
      group: `<ToggleGroup type="single"${shape} data-group aria-label="Harmonic level" class="f1-grid flex-nowrap max-w-full" v-model="model">
        <ToggleGroupItem v-for="lv in LEVELS" :key="lv.id" :value="lv.id" data-item class="grid-cell">
          ${media(`<svg data-ink viewBox="0 0 200 200" class="grid-svg"><path :d="lv.path" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>`)}
          <span data-ink data-line-slot class="grid-label">n={{ lv.n }}</span>
          ${meta(`<span data-ink class="grid-bound text-micro">bound</span>`, "lv.bound")}
        </ToggleGroupItem>
      </ToggleGroup>`,
      // the consumer's cell is a Button, which centres its content (HarmonicLevelGrid.vue:32-70)
      css: `[data-item] { align-items: center; }`,
    },
    v2: {
      group: `<ToggleGroup type="multiple"${shape} orientation="vertical" data-group aria-label="Mix sources" class="tx-v2 flex flex-col gap-2" v-model="multi">
        <ToggleGroupItem v-for="p in PALETTES" :key="p.slug" :value="p.slug" data-item class="w-full">
          ${media(`<span data-ink class="tx-v2-strip w-full overflow-hidden rounded-sm"><span v-for="c in p.colors" :key="c" :style="{ background: c }"></span></span>`)}
          <span data-ink class="flex w-full min-w-0 items-center justify-between gap-2"><span class="mix-palette-name text-small font-display font-semibold truncate">{{ p.name }}</span><span data-line-slot class="fira-code text-micro shrink-0">{{ p.colors.length }}</span></span>
        </ToggleGroupItem>
      </ToggleGroup>`,
    },
    c1: {
      group: `<ToggleGroup type="single" orientation="vertical" data-group aria-label="Status" class="min-w-48" v-model="model">
        <ToggleGroupItem v-for="o in STATUSES" :key="o.value" :value="o.value" data-item>
          <span data-ink data-line-slot class="flex-1 text-start">{{ o.label }}</span>
          <span v-if="o.count !== undefined" data-ink class="num">{{ o.count }}</span>
        </ToggleGroupItem>
      </ToggleGroup>`,
    },
  };
}
