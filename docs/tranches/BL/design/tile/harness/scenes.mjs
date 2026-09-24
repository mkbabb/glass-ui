// scenes.mjs · the scene app, written into a scratch build root and bundled against ANY worktree's `src`
// through the `@glass` alias. Nothing here is library code. It transcribes the three consumer tile sites and
// the single-line references, and stamps the DOM contract the witnesses read.
//
// THE DOM CONTRACT (fixtures.mjs honours the same one):
//   [data-scene="<id>"]   the scene root (one per page)
//   [data-group]          the selection group
//   [data-item]           a selectable item (the element that owns the corner, the state and the focus)
//   [data-ink]            consumer content inside an item (hidden when the witness reads the plate alone)
//   [data-line-slot]      where a witness appends one more line of content
//   [data-sentinel]       focusable buttons before and after the group ("before", "after")
//   window.__tile = { ready, dev, scenes, exports, select(i|null), selected() }
// URL: ?scene=<id> &mode=dark &shape=stadium|rungHalf|field (owner-glance only) &sel=<i>|none
//
// SCENES. "bare" transcribes a consumer site with its markup, its layout and its unconditional content
// typography, and drops every consumer rule that paints the item: its radius, outline, background, border,
// shadow, and every state-keyed ([data-state], :hover) rule. "verbatim" keeps all of the consumer's paint.
// Consumer revisions transcribed: keyframes.js 87bcc597, the tile files unchanged at dd7eae52
// (SpringPhysicsFacet.vue:72-90 markup, :197-215 scoped cell paint; EasingTarget.vue:115-156,403-415;
// EasingTarget.css:100-224; design-idioms.css:219-240),
// value.js working tree of 2026-09-24 (EasingSpecimenStrip.vue:86-227).

/** The scene registry: which witness each scene gates (gates) or reports as information (info). */
export const SCENES = [
  { id: "preset", site: "keyframes.js SpringPhysicsFacet preset tiles (bare)", gates: ["T-1", "T-3", "T-4", "T-5", "T-6", "T-8", "W-B", "W-E"] },
  { id: "preset-verbatim", site: "keyframes.js SpringPhysicsFacet preset tiles (verbatim, the consumer's paint)", pair: "preset", gates: ["T-4", "T-7"], info: ["T-1", "T-3"] },
  { id: "specimen", site: "keyframes.js EasingTarget specimen tiles in FadingScroll (bare)", gates: ["T-1", "T-3", "T-4", "T-5", "T-6", "T-8", "W-B", "W-E"] },
  { id: "specimen-verbatim", site: "keyframes.js EasingTarget specimen tiles (verbatim)", pair: "specimen", gates: ["T-4", "T-7"], info: ["T-1", "T-3"] },
  { id: "strip", site: "value.js EasingSpecimenStrip, selectable Chip icon circles (bare)", gates: ["T-3", "T-5", "W-B", "W-E"], info: ["T-1", "T-6"] },
  { id: "strip-verbatim", site: "value.js EasingSpecimenStrip (verbatim)", pair: "strip", gates: ["T-7"], info: ["T-3"] },
  { id: "single", site: "single-line ToggleGroup sm (the keyframes.js family filter)", gates: ["T-2", "T-5"], info: ["T-3", "T-6"] },
  { id: "vertical", site: "single-line vertical ToggleGroup, four items (the ConsoleRail analogue)", gates: ["T-2", "T-5"] },
  { id: "tabs", site: "SegmentedTabs semantics=toggle, four single-line options", gates: ["T-2", "T-5"] },
  { id: "card", site: "Card's selectable arm, wired as demo/stories/display/card.vue", gates: ["T-1", "T-3", "T-4", "T-5", "T-6", "W-C"] },
  { id: "chipcell", site: "selectable Chip shape=cell, two lines", gates: ["T-1", "T-3", "T-5", "T-6"] },
  { id: "wrap", site: "the control-role holders whose content can wrap: ToggleGroupItem, pill Chip, Button", gates: ["T-1", "W-A"] },
  { id: "family-d", site: "the preset and specimen tiles as <ToggleGroup shape=\"cell\"> with no item utilities", gates: ["W-D"] },
];

const PRESETS = [
  { name: "smooth", response: 0.5, damping: 1, blurb: "critically damped" },
  { name: "snappy", response: 0.35, damping: 0.78, blurb: "quick, a touch of overshoot" },
  { name: "bouncy", response: 0.5, damping: 0.5, blurb: "visible overshoot" },
  { name: "gentle", response: 0.7, damping: 0.95, blurb: "slow and soft" },
];
// Eight of the 28 specimen curves, portrait paths sampled from the easing functions (value vs time, y up).
const CURVES = (() => {
  const fns = {
    linear: (t) => t,
    "ease-in-quad": (t) => t * t,
    "ease-out-quad": (t) => 1 - (1 - t) ** 2,
    "ease-in-out-quad": (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2),
    "ease-in-cubic": (t) => t ** 3,
    "ease-out-cubic": (t) => 1 - (1 - t) ** 3,
    "ease-in-back": (t) => 2.70158 * t ** 3 - 1.70158 * t * t,
    "ease-out-back": (t) => 1 + 2.70158 * (t - 1) ** 3 + 1.70158 * (t - 1) ** 2,
  };
  return Object.entries(fns).map(([name, f]) => ({
    name,
    path: Array.from({ length: 33 }, (_, i) => { const t = i / 32; return `${i ? "L" : "M"}${t.toFixed(4)} ${(1 - f(t)).toFixed(4)}`; }).join(" "),
  }));
})();
const STRIP = [
  { family: "quad", tiles: [["in", "M0 1 Q .6 1 1 0"], ["out", "M0 1 Q .4 0 1 0"], ["in-out", "M0 1 C .5 1 .5 0 1 0"]] },
  { family: "back", tiles: [["in", "M0 1 C .3 1.3 .7 .9 1 0"], ["out", "M0 1 C .3 .1 .7 -.3 1 0"], ["in-out", "M0 1 C .6 1.4 .4 -.4 1 0"]] },
];

export function sceneApp(wt, nm, { familyModules = {} } = {}) {
  const famImports = Object.entries(familyModules)
    .map(([k, dir]) => `import * as fam_${k} from "@glass/components/${dir}";`).join("\n");
  const famExports = Object.keys(familyModules).map((k) => `...Object.keys(fam_${k})`).join(", ");

  const indexHtml = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>D4 tile scenes</title>
<script>const q=new URLSearchParams(location.search); if(q.get('mode')==='dark'){document.documentElement.classList.add('dark');}</script>
</head><body><div id="app"></div><script type="module" src="./main.ts"></script></body></html>
`;
  const mainTs = `import "./tile.css";
import { createApp } from "vue";
import App from "./App.vue";
${famImports}
const app = createApp(App);
app.config.errorHandler = (err, _i, info) => { console.error("[tile] app error", info, err); };
(window as any).__tileExports = [${famExports}];
app.mount("#app");
`;

  const appVue = `<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
import { ToggleGroup, ToggleGroupItem } from "@glass/components/toggle-group";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@glass/components/card";
import { Chip } from "@glass/components/chip";
import { Button } from "@glass/components/button";
import { FadingScroll } from "@glass/components/fading-scroll";
import { SegmentedTabs } from "@glass/components/tabs";

const SCENES = ${JSON.stringify(SCENES)};
const PRESETS = ${JSON.stringify(PRESETS)};
const CURVES = ${JSON.stringify(CURVES)};
const STRIP = ${JSON.stringify(STRIP)};
const q = new URLSearchParams(location.search);
const scene = q.get("scene") ?? "__index";
const shape = q.get("shape") ?? "stadium";
const verbatim = scene.endsWith("-verbatim");
const base = scene.replace(/-verbatim$/, "");

// Every scene's values, in item order; the model holds one of them (or NONE).
const NONE = "__none__";
const values: Record<string, string[]> = {
  preset: PRESETS.map((p) => p.name),
  specimen: CURVES.map((c) => c.name),
  strip: STRIP.flatMap((f) => f.tiles.map((t) => f.family + "-" + t[0])),
  single: ["All", "Power", "Back", "Elastic"],
  vertical: ["L", "C", "H", "A"],
  tabs: ["All", "Power", "Back", "Elastic"],
  card: ["starter", "team", "studio", "scale"],
  chipcell: ["one", "two", "three", "four"],
  wrap: ["a", "b"],
  "family-d": PRESETS.map((p) => p.name),
};
const vals = values[base] ?? [];
const selQ = q.get("sel");
const model = ref<string>(selQ === "none" ? NONE : vals[selQ ? Number(selQ) : 1] ?? NONE);
const specModel = ref<string>(CURVES[1].name);
const tabsOptions = values.tabs.map((v) => ({ label: v, value: v }));

(window as any).__tile = {
  ready: false,
  dev: import.meta.env.DEV,
  scenes: SCENES,
  scene,
  exports: (window as any).__tileExports ?? [],
  async select(i: number | null) {
    model.value = i === null ? NONE : vals[i];
    specModel.value = i === null ? NONE : CURVES[i]?.name ?? NONE;
    await nextTick();
  },
  selected: () => model.value,
};

onMounted(async () => {
  await nextTick();
  requestAnimationFrame(() => requestAnimationFrame(() => { (window as any).__tile.ready = true; }));
});
</script>

<template>
  <main class="tx-page" :data-shape-candidate="shape">
    <button class="tx-sentinel" data-sentinel="before" type="button">before</button>

    <!-- keyframes.js SpringPhysicsFacet.vue:72-93, hosted as the facet hosts it (Card tier=quiet, CardContent px-4 py-3) -->
    <section v-if="base === 'preset'" :data-scene="scene" class="tx-host">
      <Card tier="quiet" class="cartoon-surface w-full overflow-visible">
        <CardContent class="panel-content flex flex-col gap-3 px-4 py-3">
          <ToggleGroup
            type="single" data-group aria-label="Spring presets"
            :class="verbatim
              ? 'preset-grid grid w-auto max-w-none grid-cols-2 gap-2 rounded-none bg-transparent p-0 shadow-none backdrop-filter-none'
              : 'preset-grid grid w-auto max-w-none grid-cols-2 gap-2'"
            v-model="model"
          >
            <ToggleGroupItem
              v-for="p in PRESETS" :key="p.name" :value="p.name" :title="p.blurb" data-item
              :class="verbatim
                ? 'preset-cell kf-verbatim w-full min-w-0 flex-col items-start gap-0.5 bg-background px-3 py-2 font-medium leading-normal'
                : 'preset-cell w-full min-w-0 flex-col items-start gap-0.5 px-3 py-2 font-medium leading-normal'"
            >
              <span data-ink class="text-small text-foreground capitalize">{{ p.name }}</span>
              <span data-ink data-line-slot class="text-mono-caption text-muted-foreground tabular-nums whitespace-nowrap">{{ p.response }} s · ζ {{ p.damping }}</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </CardContent>
      </Card>
    </section>

    <!-- keyframes.js EasingTarget.vue:115-156 + EasingTarget.css:100-213, inside the stage Card as the scene hosts it -->
    <section v-else-if="base === 'specimen'" :data-scene="scene" class="tx-host easing-target">
      <Card :shadow="false" class="flex w-full flex-col gap-4 overflow-hidden px-4 py-4">
        <FadingScroll axis="y" class="specimen-drawer min-h-0 w-full">
          <ToggleGroup type="single" size="sm" data-group aria-label="Easing curve specimens"
            :class="verbatim ? 'specimen-grid kf-verbatim-grid' : 'specimen-grid'" v-model="model">
            <ToggleGroupItem
              v-for="c in CURVES" :key="c.name" :value="c.name" :title="c.name" data-item data-surface="opaque"
              :class="verbatim ? 'specimen-tile kf-verbatim flex-col gap-1.5 px-2 py-2.5' : 'specimen-tile flex-col gap-1.5 px-2 py-2.5'"
            >
              <span data-ink class="tile-stage" aria-hidden="true">
                <svg class="tile-sparkline" viewBox="0 0 1 1" preserveAspectRatio="none"><path :d="c.path" vector-effect="non-scaling-stroke" /></svg>
                <span class="progress-rail tile-rail"></span>
                <span class="progress-ball tile-ball"></span>
              </span>
              <span data-ink data-line-slot class="tile-name text-mono-caption" data-register="code">{{ c.name }}</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </FadingScroll>
      </Card>
    </section>

    <!-- value.js EasingSpecimenStrip.vue:86-122 -->
    <section v-else-if="base === 'strip'" :data-scene="scene" class="tx-host">
      <FadingScroll axis="x" class="specimen-strip">
        <div class="strip-row" role="group" aria-label="Easing curve specimens" data-group>
          <div v-for="fam in STRIP" :key="fam.family" class="strip-family">
            <span class="family-eyebrow" aria-hidden="true">{{ fam.family }}</span>
            <div class="family-tiles">
              <Chip
                v-for="t in fam.tiles" :key="fam.family + t[0]" mode="selectable" shape="icon"
                :class="verbatim ? 'vj-tile vj-verbatim' : 'vj-tile'" data-item
                :model-value="model === fam.family + '-' + t[0]" :aria-label="fam.family + '-' + t[0]"
                @update:model-value="(on: boolean) => { if (on) model = fam.family + '-' + t[0]; }"
              >
                <svg data-ink class="tile-glyph" viewBox="0 0 1 1" aria-hidden="true"><path :d="t[1]" vector-effect="non-scaling-stroke" /></svg>
                <span data-ink data-line-slot class="tile-label">{{ t[0] }}</span>
              </Chip>
            </div>
          </div>
        </div>
      </FadingScroll>
    </section>

    <!-- keyframes.js EasingTarget.vue:54-68, the family filter -->
    <section v-else-if="base === 'single'" :data-scene="scene" class="tx-host">
      <ToggleGroup type="single" size="sm" data-group aria-label="Filter curves by family" v-model="model">
        <ToggleGroupItem v-for="v in values.single" :key="v" :value="v" data-item><span data-ink data-line-slot>{{ v }}</span></ToggleGroupItem>
      </ToggleGroup>
    </section>

    <section v-else-if="base === 'vertical'" :data-scene="scene" class="tx-host">
      <ToggleGroup type="single" orientation="vertical" data-group aria-label="Channel" v-model="model" class="w-16">
        <ToggleGroupItem v-for="v in values.vertical" :key="v" :value="v" data-item><span data-ink data-line-slot>{{ v }}</span></ToggleGroupItem>
      </ToggleGroup>
    </section>

    <section v-else-if="base === 'tabs'" :data-scene="scene" class="tx-host">
      <SegmentedTabs data-group v-model="model" :options="tabsOptions" semantics="toggle" aria-label="Family" />
    </section>

    <!-- demo/stories/display/card.vue:117-137 -->
    <section v-else-if="base === 'card'" :data-scene="scene" class="tx-host">
      <div class="tx-card-board" role="listbox" aria-label="Plan" data-group>
        <Card v-for="v in values.card" :key="v" size="sm" data-item :selected="model === v"
          @click="model = v" @keydown.enter.prevent="model = v" @keydown.space.prevent="model = v">
          <CardHeader><CardTitle data-ink>{{ v }}</CardTitle><CardDescription data-ink data-line-slot>For a {{ v }} workload.</CardDescription></CardHeader>
        </Card>
      </div>
    </section>

    <section v-else-if="base === 'chipcell'" :data-scene="scene" class="tx-host">
      <div role="group" aria-label="Cells" class="tx-chiprow" data-group>
        <Chip v-for="v in values.chipcell" :key="v" mode="selectable" shape="cell" data-item class="tx-cell"
          :model-value="model === v" @update:model-value="(on: boolean) => { if (on) model = v; }">
          <span data-ink class="tx-cell-ink"><span>{{ v }}</span><span data-line-slot class="tx-cell-meta">0.{{ v.length }} s</span></span>
        </Chip>
      </div>
    </section>

    <section v-else-if="base === 'wrap'" :data-scene="scene" class="tx-host tx-wrap">
      <ToggleGroup type="single" data-group aria-label="Wrap" v-model="model">
        <ToggleGroupItem value="a" data-item data-holder="ToggleGroupItem"><span data-ink data-line-slot>Linear</span></ToggleGroupItem>
      </ToggleGroup>
      <Chip mode="selectable" shape="pill" data-item data-holder="Chip pill" :model-value="false"><span data-ink data-line-slot>Tag</span></Chip>
      <Button data-item data-holder="Button"><span data-ink data-line-slot>Continue</span></Button>
    </section>

    <!-- D4-D: the tile declared once at the group; the items carry no utilities -->
    <section v-else-if="base === 'family-d'" :data-scene="scene" class="tx-host">
      <ToggleGroup type="single" shape="cell" data-group aria-label="Spring presets" v-model="model">
        <ToggleGroupItem v-for="p in PRESETS" :key="p.name" :value="p.name" data-item>
          <span data-ink class="text-small text-foreground capitalize">{{ p.name }}</span>
          <span data-ink data-line-slot class="text-mono-caption text-muted-foreground">{{ p.response }} s · ζ {{ p.damping }}</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </section>

    <section v-else data-scene="__index"><p>{{ SCENES.map((s) => s.id).join(" · ") }}</p></section>

    <button class="tx-sentinel" data-sentinel="after" type="button">after</button>
  </main>
</template>
`;

  const css = `@import "${nm}/tailwindcss/index.css" source("./");
@source "${wt}/src/components/**/*.vue";
@source "${wt}/src/components/_shared/**/*.ts";
@source "${wt}/src/components/**/index.ts";
@import "${nm}/tw-animate-css/dist/tw-animate.css";
@import "${wt}/src/styles/index.css";

html, body { margin: 0; }
body { background: var(--background); color: var(--foreground); font-family: system-ui, sans-serif; }
.tx-page { padding: 24px; display: flex; flex-direction: column; align-items: flex-start; gap: 16px; }
.tx-sentinel { font: 12px system-ui; padding: 2px 6px; }
.tx-host { width: 460px; }
.tx-card-board { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.tx-chiprow { display: flex; gap: 8px; flex-wrap: wrap; }
.tx-cell-ink { display: flex; flex-direction: column; align-items: flex-start; line-height: 1.3; }
.tx-cell-meta { font-size: 11px; opacity: 0.8; }
.tx-wrap { display: flex; gap: 12px; align-items: flex-start; }
.tx-wrap [data-item] { max-inline-size: 110px; white-space: normal; }

/* ── consumer transcriptions ── */
/* keyframes.js demo/styles/style.css:167,215 and design-idioms.css:219-240 (the tokens and the rail/ball idiom) */
:root { --accent-kf: light-dark(oklch(0.56 0.17 295), oklch(0.74 0.13 305)); --color-progress: var(--accent-kf); }
.progress-rail { position: absolute; top: 50%; left: 0; width: 100%; height: 2px; transform: translateY(-50%); border-radius: var(--radius-pill); background: color-mix(in srgb, var(--ball-tone, var(--color-progress)) var(--rail-tint, 8%), transparent); pointer-events: none; }
.progress-ball { position: absolute; top: 50%; width: var(--ball-size, 36px); height: var(--ball-size, 36px); margin-top: calc(var(--ball-size, 36px) / -2); border-radius: var(--radius-pill); background: var(--ball-tone, var(--color-progress)); box-shadow: 0 2px 10px color-mix(in srgb, var(--ball-tone, var(--color-progress)) var(--ball-glow, 35%), transparent); pointer-events: none; }

/* keyframes.js SpringPhysicsFacet.vue:285-309, verbatim only */
.preset-cell.kf-verbatim { border-radius: var(--radius-field); outline: 1px dashed transparent; outline-offset: -1px; border-color: transparent; transition: outline-color var(--duration-fast) ease, background-color var(--duration-fast) ease; }
.preset-cell.kf-verbatim:hover { background: color-mix(in srgb, var(--color-progress) 6%, var(--background)); outline-color: color-mix(in srgb, var(--color-progress) 35%, transparent); }
.preset-cell.kf-verbatim[data-state="on"] { background: color-mix(in srgb, var(--color-progress) 8%, var(--background)); outline-color: color-mix(in srgb, var(--color-progress) 65%, transparent); border-color: transparent; box-shadow: none; }

/* keyframes.js EasingTarget.css:1-8,100-213; layout and unconditional content typography in both variants */
.easing-target { --ball-tone: var(--color-progress); }
.specimen-drawer { max-block-size: 340px; }
.specimen-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 0.5rem; padding: 2px 2px 1rem; }
.specimen-tile { content-visibility: auto; contain-intrinsic-size: auto 104px; align-items: stretch; }
.tile-stage { position: relative; display: block; width: 100%; height: 3.25rem; }
.tile-sparkline { position: absolute; inset: 18% 0; width: 100%; height: 64%; overflow: visible; }
.tile-sparkline path { fill: none; stroke: color-mix(in srgb, var(--foreground) 22%, transparent); stroke-width: 1.25; stroke-linecap: round; stroke-linejoin: round; }
.tile-rail { height: 1px; --rail-tint: 16%; }
.tile-stage::before, .tile-stage::after { content: ""; position: absolute; top: 50%; width: 1px; height: 9px; transform: translateY(-50%); background: color-mix(in srgb, var(--foreground) 22%, transparent); }
.tile-stage::before { left: 6.5px; }
.tile-stage::after { right: 6.5px; }
.tile-ball { --ball-size: 14px; --ball-glow: 28%; left: 0; }
.tile-name { text-transform: none; text-align: center; letter-spacing: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.35; padding-bottom: 0.125rem; color: var(--muted-foreground); }
/* verbatim only: the radius, the state-keyed paint, and the group reset (EasingTarget.vue:403-415) */
.specimen-tile.kf-verbatim { border-radius: var(--radius-field); }
.specimen-tile.kf-verbatim[data-state="on"] .tile-sparkline path { stroke: color-mix(in srgb, var(--ball-tone) 65%, transparent); stroke-width: 1.5; }
.specimen-tile.kf-verbatim[data-state="on"] .tile-name { color: var(--ball-tone); font-weight: 600; }
.specimen-tile.kf-verbatim:hover .tile-name { color: var(--foreground); }
.specimen-grid.kf-verbatim-grid { border-radius: 0; background: none; -webkit-backdrop-filter: none; backdrop-filter: none; box-shadow: none; }

/* value.js EasingSpecimenStrip.vue:125-227; layout and unconditional content typography in both variants */
.strip-row { display: inline-flex; align-items: stretch; gap: 0.875rem; width: max-content; padding: 2px; }
.strip-family { display: flex; flex-direction: column; gap: 0.2rem; }
.strip-family + .strip-family { border-left: 1px solid var(--card-edge); padding-left: 0.875rem; }
.family-eyebrow { font-family: var(--font-mono); font-size: 0.5625rem; line-height: 1; letter-spacing: 0.08em; color: var(--muted-foreground); opacity: 0.75; }
.family-tiles { display: flex; align-items: flex-start; gap: 0.25rem; }
.vj-tile { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.125rem; inline-size: 2.75rem; block-size: 2.75rem; padding: 0.25rem; }
.tile-glyph { inline-size: 1.375rem; block-size: 1.375rem; overflow: visible; }
.tile-glyph path { fill: none; stroke: color-mix(in oklab, var(--foreground) 65%, transparent); stroke-width: 1.25; stroke-linecap: round; stroke-linejoin: round; }
.tile-label { font-family: var(--font-mono); font-size: 0.5625rem; line-height: 1.2; text-transform: none; color: var(--muted-foreground); white-space: nowrap; }
.vj-verbatim[data-state="on"] .tile-glyph path { stroke: var(--motion-accent, var(--foreground)); stroke-width: 1.75; }
.vj-verbatim[data-state="on"] .tile-label { color: var(--motion-accent, var(--foreground)); font-weight: 600; }
.vj-verbatim:hover .tile-label { color: var(--foreground); }

/* owner-glance shape candidates (glance.mjs only; never read by a witness) */
[data-shape-candidate="rungHalf"] .toggle-group__item { border-radius: calc(var(--toggle-group-item-size) / 2) !important; }
[data-shape-candidate="field"] .toggle-group__item { border-radius: var(--radius-field) !important; }
`;
  return { "index.html": indexHtml, "main.ts": mainTs, "App.vue": appVue, "tile.css": css };
}
