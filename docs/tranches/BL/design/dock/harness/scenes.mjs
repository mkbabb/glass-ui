// scenes.mjs: the scene page, as source strings written into a scratch dir at
// build time. It mounts GlassDock from a worktree's src/ through the @glass alias.
//
// Coupling to src/ layout is exactly the import block of App.vue below (the
// dock, popover, select and scroll-progress-rim barrels, and the motion barrel
// for SPRING_PRESETS). A family that moves those barrels changes these lines.
//
// Scenes (?scene=):
//   fit      horizontal fit-content dock, collapse=false (the chicago C-2 composition).
//            &routed=1 swaps `active` for aria-current (F-18 route 3).
//   rail     vertical long run, n seats capped at h (the owner's F-18 lens witness).
//   long     horizontal long run: 14 icon seats under a 360px cap.
//   morph    collapsible horizontal dock (persistent Home, 3 icons, 2 label seats, a
//            select trigger, a collapsed face). __scene.setExtra(bool) adds a label seat.
//   vmorph   collapsible vertical dock.
//   swap     DockLayerGroup with two faces of different width. __scene.setFace(id).
//   menu     collapsible dock whose full face holds a keep-dock-open popover trigger.
//   compact  a long page and a dock bound to the adapter's compactProps (none at HEAD).
//   rim      horizontal dock with a consumer-composed ScrollProgressRim overlay
//            (the only rim HEAD can make); &collapse=closed for the collapsed rung.
//   vrim     the vertical twin of rim.
export function sceneFiles(wt) {
    const nm = `${wt}/node_modules`;
    return {
        "index.html": `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>dock harness</title></head><body><div id="app"></div><script type="module" src="./main.ts"></script></body></html>`,
        "main.ts": `import "./h.css";
import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);
app.config.errorHandler = (err, _i, info) => { console.error("[harness] app error", info, err); (window as any).__errors = ((window as any).__errors || 0) + 1; };
app.mount("#app");
`,
        "h.css": `@import "${nm}/tailwindcss/index.css" source("./");
@source "${wt}/src/components/**/*.vue";
@source "${wt}/src/components/_shared/**/*.ts";
@source "${wt}/src/components/**/index.ts";
@import "${nm}/tw-animate-css/dist/tw-animate.css";
@import "${wt}/src/styles/index.css";
body { min-height: 100vh; margin: 0; }
`,
        "App.vue": APP_VUE,
    };
}

const APP_VUE = `<script setup lang="ts">
import { ref, computed } from "vue";
import { GlassDock, DockControl, DockSeparator, DockLayerGroup, DockLayer, DockTrigger } from "@glass/components/dock";
import { Popover, PopoverContent, PopoverTrigger } from "@glass/components/popover";
import { Select, SelectContent, SelectItem, SelectValue } from "@glass/components/select";
import { ScrollProgressRim } from "@glass/components/scroll-progress-rim";
import { SPRING_PRESETS } from "@glass/composables/motion";

const q = new URLSearchParams(location.search);
const scene = q.get("scene") ?? "fit";
const routed = q.get("routed") === "1";
const active = ref(scene === "long" ? "v3" : "a");
const face = ref("short");
const extra = ref(false);
const pick = ref("square");
const railN = Number(q.get("n") ?? "11");
const railH = q.get("h") ?? "560px";
const shape = (q.get("shape") ?? "pill") as "pill" | "card" | "rounded";
const collapse = (q.get("collapse") === "closed" ? "closed" : false) as false | "closed";
const cfg = (window as any).__dockAdapterConfig ?? {};
// Adapter-declared props for rungs HEAD has no API for. "@window" resolves to a getter.
const resolve = (o: Record<string, unknown> | null | undefined) => o ? Object.fromEntries(Object.entries(o).map(([k, v]) => [k, v === "@window" ? () => window : v])) : {};
const compactProps = computed(() => resolve(cfg.compactProps));
const rimProps = computed(() => resolve(cfg.rimProps));
const w = window as any;
w.__scene = {
  name: scene,
  presets: SPRING_PRESETS,
  dockPropNames: Object.keys((GlassDock as any).props ?? {}),
  compactDeclared: !!cfg.compactProps,
  rimDeclared: !!cfg.rimProps,
  setFace: (f: string) => { face.value = f; },
  setActive: (f: string) => { active.value = f; },
  setExtra: (v: boolean) => { extra.value = v; },
};
</script>

<template>
  <main :style="{ padding: '24px', minHeight: scene === 'compact' ? '6000px' : '3600px', background: 'linear-gradient(180deg,#f3efe6,#e8e2d4)' }">
    <template v-if="scene === 'fit'">
      <div style="position: fixed; left: 0; right: 0; bottom: 24px; display: flex; justify-content: center;">
        <GlassDock data-testid="dock" orientation="horizontal" fit-content :collapse="false" aria-label="Fit dock">
          <DockControl shape="tab" :active="!routed && active === 'a'" :aria-current="routed && active === 'a' ? 'page' : undefined" data-testid="t1" @click="active = 'a'">Photos</DockControl>
          <DockControl shape="tab" :active="!routed && active === 'b'" :aria-current="routed && active === 'b' ? 'page' : undefined" data-testid="t2" @click="active = 'b'">Lots</DockControl>
          <DockControl shape="tab" :active="!routed && active === 'c'" :aria-current="routed && active === 'c' ? 'page' : undefined" data-testid="t3" @click="active = 'c'">Map</DockControl>
          <DockSeparator />
          <Popover keep-dock-open>
            <PopoverTrigger as-child><DockControl shape="tab" data-testid="t4">Filters</DockControl></PopoverTrigger>
            <PopoverContent side="top" class="w-56 p-3"><p>Options</p></PopoverContent>
          </Popover>
          <DockSeparator />
          <DockControl aria-label="Theme" data-testid="i1"><svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7" fill="currentColor"/></svg></DockControl>
        </GlassDock>
      </div>
    </template>

    <template v-else-if="scene === 'rail'">
      <div :style="{ position: 'fixed', left: '16px', top: '16px', height: railH, display: 'flex' }">
        <GlassDock data-testid="dock" orientation="vertical" :shape="shape" :collapse="false" aria-label="Rail" :style="{ '--dock-max-block-size': railH }">
          <DockControl v-for="i in railN" :key="i" :aria-label="'Seat ' + i" :aria-current="i === 3 ? 'page' : undefined" :data-testid="'s' + i"><svg width="20" height="20" viewBox="0 0 20 20"><rect x="3" y="3" width="14" height="14" rx="3" fill="currentColor"/></svg></DockControl>
        </GlassDock>
      </div>
    </template>

    <template v-else-if="scene === 'long'">
      <div style="position: fixed; left: 0; right: 0; bottom: 24px; display: flex; justify-content: center;">
        <GlassDock data-testid="dock" orientation="horizontal" :collapse="false" aria-label="Long dock" style="max-inline-size: 360px">
          <DockControl v-for="i in 14" :key="i" :aria-label="'V' + i" :active="active === 'v' + i" :data-testid="'s' + i" @click="active = 'v' + i">{{ i }}</DockControl>
        </GlassDock>
      </div>
    </template>

    <template v-else-if="scene === 'morph' || scene === 'vmorph'">
      <div :style="scene === 'morph' ? 'position: fixed; left: 0; right: 0; bottom: 24px; display: flex; justify-content: center;' : 'position: fixed; left: 16px; top: 0; bottom: 0; display: flex; align-items: center;'">
        <GlassDock data-testid="dock" :orientation="scene === 'morph' ? 'horizontal' : 'vertical'" :shape="shape" collapse="closed" aria-label="Morph dock">
          <template #persistent><DockControl aria-label="Home" data-testid="home">H</DockControl></template>
          <DockControl aria-label="One" data-testid="f1">1</DockControl>
          <DockControl aria-label="Two">2</DockControl>
          <DockControl aria-label="Three">3</DockControl>
          <DockSeparator />
          <template v-if="scene === 'morph'">
            <DockControl shape="tab" data-testid="play">Play</DockControl>
            <DockControl shape="tab">Settings</DockControl>
            <Select v-model="pick">
              <DockTrigger for="select" data-testid="sel"><SelectValue /></DockTrigger>
              <SelectContent><SelectItem value="square">Square</SelectItem><SelectItem value="spring">Spring</SelectItem></SelectContent>
            </Select>
            <DockControl v-if="extra" shape="tab" data-testid="extra">Brushes and layers</DockControl>
          </template>
          <template v-else>
            <DockControl aria-label="Four">4</DockControl>
            <DockControl v-if="extra" aria-label="Five" data-testid="extra">5</DockControl>
          </template>
          <template #collapsed><DockControl aria-label="Play" data-testid="cplay">P</DockControl></template>
        </GlassDock>
      </div>
    </template>

    <template v-else-if="scene === 'swap'">
      <div style="position: fixed; left: 0; right: 0; bottom: 24px; display: flex; justify-content: center;">
        <GlassDock data-testid="dock" orientation="horizontal" fit-content :collapse="false" aria-label="Swap dock">
          <DockLayerGroup v-model:active="face" :show-switcher="false">
            <DockLayer id="short" label="Short">
              <DockControl aria-label="A">A</DockControl>
              <DockControl aria-label="B">B</DockControl>
            </DockLayer>
            <DockLayer id="long" label="Long">
              <DockControl aria-label="C">C</DockControl>
              <DockControl shape="tab">Tools</DockControl>
              <DockControl shape="tab">Brushes</DockControl>
              <DockControl shape="tab">Layers</DockControl>
              <DockControl aria-label="D">D</DockControl>
            </DockLayer>
          </DockLayerGroup>
        </GlassDock>
      </div>
    </template>

    <template v-else-if="scene === 'menu'">
      <div style="position: fixed; left: 0; right: 0; bottom: 24px; display: flex; justify-content: center;">
        <GlassDock data-testid="dock" orientation="horizontal" collapse="closed" aria-label="Menu dock">
          <DockControl aria-label="One">1</DockControl>
          <DockControl aria-label="Two">2</DockControl>
          <Popover keep-dock-open>
            <PopoverTrigger as-child><DockControl shape="tab" data-testid="menu">More</DockControl></PopoverTrigger>
            <PopoverContent side="top" class="w-56 p-3" data-testid="menu-content"><p>Options</p></PopoverContent>
          </Popover>
          <template #collapsed><DockControl aria-label="Open" data-testid="cplay">P</DockControl></template>
        </GlassDock>
      </div>
    </template>

    <template v-else-if="scene === 'compact'">
      <div style="position: fixed; left: 0; right: 0; bottom: 24px; display: flex; justify-content: center;">
        <GlassDock data-testid="dock" orientation="horizontal" fit-content :collapse="false" aria-label="Compact dock" v-bind="compactProps">
          <DockControl shape="tab" :active="active === 'a'" data-testid="t1" @click="active = 'a'">Photos</DockControl>
          <DockControl shape="tab" :active="active === 'b'" data-testid="t2" @click="active = 'b'">Lots</DockControl>
          <DockControl aria-label="Theme" data-testid="i1">T</DockControl>
        </GlassDock>
      </div>
    </template>

    <template v-else-if="scene === 'rim' || scene === 'vrim'">
      <div :style="scene === 'rim' ? 'position: fixed; left: 0; right: 0; bottom: 24px; display: flex; justify-content: center;' : 'position: fixed; left: 16px; top: 0; bottom: 0; display: flex; align-items: center;'">
        <GlassDock data-testid="dock" :orientation="scene === 'rim' ? 'horizontal' : 'vertical'" :shape="shape" :collapse="collapse" aria-label="Rim dock" v-bind="rimProps">
          <DockControl aria-label="One">1</DockControl>
          <DockControl aria-label="Two">2</DockControl>
          <DockControl aria-label="Three">3</DockControl>
          <template #collapsed><DockControl aria-label="Open">P</DockControl></template>
          <template v-if="!cfg.rimProps" #persistent-end>
            <ScrollProgressRim :value="0.6" :orientation="scene === 'rim' ? 'horizontal' : 'vertical'" data-testid="rim" style="position: absolute; inset: 0;" />
          </template>
        </GlassDock>
      </div>
    </template>
  </main>
</template>
`;
