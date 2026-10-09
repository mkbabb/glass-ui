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
//            (the only rim HEAD can make); &collapse=closed for the collapsed rung;
//            &source=el binds the adapter's rimProps "@source" to a scrolling element.
//   vrim     the vertical twin of rim.
// H2 scenes and variants (H-7, O-65, O-67):
//   morph    &anchor=end (right-anchored, K-11) · &wide=1 (a wide #collapsed face, K-5) ·
//            __scene.setLead(bool) (a seat inserted at the start) · __scene.collapse()/expand()
//   compact  &active=b (the second seat current) · &source=late|el (a getter to an element that
//            mounts 600 ms late, or at once) · &twin=1 (a second dock on the same source;
//            __scene.dropA() unmounts it) · __scene.scrollTo(y) / scrollMax()
//   hidden   the fit dock inside a display:none host; __scene.show()
//   cwidth   a consumer width (240 px) on the root; __scene.consumerBudget = 240
//   depth    seats behind a wrapper and in a display: contents group (K-12)
//   nested   a nested-scroller seat under a 360 px cap (C CX-8); __scene.consumerBudget = 360
//   tick     a label seat whose text changes every 180 ms (C CX-7)
//   seatgrow a seat with its own CSS width transition (K-13); __scene.grow(bool)
//   form     the collapsed form (O-65): face in #collapsed; track, count, dismiss in #persistent-end
//   edge     &kind=top|side|canvas[&clip=1] with a [data-testid=surface-above] (O-67); seat e1
//            carries its badge in DockControl's #badge slot (floor v2 N-4); a build without the
//            slot renders no badge, and W7 reads `badge` absent there
// H3 variants (pass-3/H3.md):
//   morph    &neighbour=1 (H3-7: the dock in flow in a left-aligned row, a [data-testid=neighbour]
//            box after it, read per frame) · __scene.stretch(px) (H3-6: the root held px wider
//            than its natural width, so a prepended seat does not change the run's size)
//   swap     &three=1 (pass-3 D2-B′ `retarget`: a third face `mid`, so a swap can be retargeted
//            mid-flight to a face that is neither of the two on the glass)
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
import { ref, computed, nextTick } from "vue";
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
const cfg = (window as any).__dockAdapterConfig ?? JSON.parse(q.get("hpcfg") ?? "{}");
const source = q.get("source") ?? "window";
const lateOn = ref(source === "el");
if (source === "late") setTimeout(() => { lateOn.value = true; }, 600);
const srcEl = () => document.querySelector("[data-testid=src]") as HTMLElement | null;
const srcGetter = () => (source === "window" ? window : srcEl());
// Adapter-declared props for rungs HEAD has no API for. "@source" resolves to a getter of the
// scene's scroll source: the window, an element, or an element that mounts late. It resolves at
// any depth, so a grouped prop (the floor's scroll: { source, compact, rim }) binds too.
const resolve = (o: Record<string, unknown> | null | undefined): Record<string, unknown> => o ? Object.fromEntries(Object.entries(o).map(([k, v]) => [k, v === "@source" ? srcGetter : v && typeof v === "object" && !Array.isArray(v) ? resolve(v as Record<string, unknown>) : v])) : {};
const lead = ref(false);
const wide = q.get("wide") === "1";
const anchorEnd = q.get("anchor") === "end";
const neighbour = q.get("neighbour") === "1";
const three = q.get("three") === "1";
const stretchW = ref<number | null>(null);
const shown = ref(scene !== "hidden");
const grow = ref(false);
const twinOn = ref(q.get("twin") === "1");
const tickText = ref("0:08");
const TICKS = ["0:08", "0:09", "0:10", "0:11", "1:12", "10:58", "0:07", "1:01"];
const tickLog: number[] = [];
let tickT = 0;
const dockRef = ref<any>(null);
const isDark = document.documentElement.classList.contains("dark");
const kind = q.get("kind") ?? "side";
const clipPanel = q.get("clip") === "1";
if (scene === "compact" && q.get("active") === "b") active.value = "b";
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
  setLead: (v: boolean) => { lead.value = v; },
  collapse: () => dockRef.value?.collapse(),
  expand: () => dockRef.value?.expand(),
  show: () => { shown.value = true; },
  grow: (v: boolean) => { grow.value = v; },
  startTick: () => { let k = 0; tickT = window.setInterval(async () => { tickText.value = TICKS[++k % TICKS.length]; await nextTick(); tickLog.push((document.querySelector("[data-testid=dock]") as HTMLElement).offsetWidth); }, 180); },
  stopTick: () => clearInterval(tickT),
  tickLog: () => tickLog,
  scrollTo: (y: number) => { const s = srcGetter(); if (!s) return; if (s === window) window.scrollTo(0, y); else (s as HTMLElement).scrollTop = y; },
  scrollMax: () => { const s = srcGetter(); if (!s) return 0; return s === window ? document.documentElement.scrollHeight - innerHeight : (s as HTMLElement).scrollHeight - (s as HTMLElement).clientHeight; },
  dropA: () => { twinOn.value = false; },
  consumerBudget: scene === "cwidth" ? 240 : scene === "nested" ? 360 : undefined,
  stretch: (px: number) => { const r = document.querySelector("[data-testid=dock]") as HTMLElement; stretchW.value = r.offsetWidth + px; },
};
const morphHost = scene === "vmorph" ? "position: fixed; left: 16px; top: 0; bottom: 0; display: flex; align-items: center;"
  : neighbour ? "position: fixed; left: 40px; right: 0; bottom: 24px; display: flex; align-items: center; justify-content: flex-start; gap: 12px;"
  : "position: fixed; left: 0; right: 0; bottom: 24px; display: flex; justify-content: " + (anchorEnd ? "flex-end; padding-right: 40px" : "center") + ";";
</script>

<template>
  <main :style="{ padding: '24px', minHeight: scene === 'compact' ? '6000px' : '3600px', background: isDark ? 'linear-gradient(180deg,#1c1917,#0c0a09)' : 'linear-gradient(180deg,#f3efe6,#e8e2d4)' }">
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
      <div :style="morphHost">
        <GlassDock ref="dockRef" data-testid="dock" :orientation="scene === 'morph' ? 'horizontal' : 'vertical'" :shape="shape" collapse="closed" aria-label="Morph dock" :style="stretchW ? { width: stretchW + 'px' } : undefined">
          <template #persistent><DockControl aria-label="Home" data-testid="home">H</DockControl></template>
          <DockControl v-if="lead" :shape="scene === 'morph' ? 'tab' : 'icon'" aria-label="Lead" data-testid="lead">{{ scene === 'morph' ? 'Lead' : '0' }}</DockControl>
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
          <template #collapsed><DockControl v-if="wide" shape="tab" data-testid="cplay">Now playing</DockControl><DockControl v-else aria-label="Play" data-testid="cplay">P</DockControl></template>
        </GlassDock>
        <div v-if="neighbour" data-testid="neighbour" style="flex: 0 0 auto; width: 80px; height: 40px; border-radius: 8px; background: #3a53e6;"></div>
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
            <DockLayer v-if="three" id="mid" label="Mid">
              <DockControl aria-label="E">E</DockControl>
              <DockControl shape="tab">Mid</DockControl>
              <DockControl aria-label="F">F</DockControl>
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
      <div v-if="source !== 'window' && lateOn" data-testid="src" style="position: fixed; left: 16px; top: 16px; width: 280px; height: 200px; overflow: auto; background: rgba(255,255,255,.5);"><div style="height: 4000px"></div></div>
      <div v-if="twinOn" style="position: fixed; left: 0; right: 0; top: 16px; display: flex; justify-content: center;">
        <GlassDock data-testid="dock-a" orientation="horizontal" fit-content :collapse="false" aria-label="Twin dock" v-bind="compactProps">
          <DockControl aria-label="A1">A</DockControl>
        </GlassDock>
      </div>
      <div style="position: fixed; left: 0; right: 0; bottom: 24px; display: flex; justify-content: center;">
        <GlassDock data-testid="dock" orientation="horizontal" fit-content :collapse="false" aria-label="Compact dock" v-bind="compactProps">
          <DockControl shape="tab" :active="active === 'a'" data-testid="t1" @click="active = 'a'">Photos</DockControl>
          <DockControl shape="tab" :active="active === 'b'" data-testid="t2" @click="active = 'b'">Lots</DockControl>
          <DockControl aria-label="Theme" data-testid="i1">T</DockControl>
        </GlassDock>
      </div>
    </template>

    <template v-else-if="scene === 'rim' || scene === 'vrim'">
      <div v-if="source === 'el'" data-testid="src" style="position: fixed; left: 16px; top: 16px; width: 280px; height: 200px; overflow: auto; background: rgba(255,255,255,.5);"><div style="height: 4000px"></div></div>
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
    <template v-else-if="scene === 'hidden'">
      <div :style="{ position: 'fixed', left: 0, right: 0, bottom: '24px', display: shown ? 'flex' : 'none', justifyContent: 'center' }">
        <GlassDock data-testid="dock" orientation="horizontal" fit-content :collapse="false" aria-label="Hidden dock">
          <DockControl shape="tab" data-testid="t1">Photos</DockControl>
          <DockControl shape="tab" data-testid="t2">Lots</DockControl>
          <DockControl aria-label="Theme" data-testid="i1">T</DockControl>
        </GlassDock>
      </div>
    </template>

    <template v-else-if="scene === 'cwidth'">
      <div style="position: fixed; left: 0; right: 0; bottom: 24px; display: flex; justify-content: center;">
        <GlassDock data-testid="dock" orientation="horizontal" :collapse="false" aria-label="Consumer width dock" style="width: 240px">
          <DockControl v-for="i in 8" :key="i" :aria-label="'C' + i" :data-testid="'c' + i">{{ i }}</DockControl>
        </GlassDock>
      </div>
    </template>

    <template v-else-if="scene === 'depth'">
      <div style="position: fixed; left: 0; right: 0; bottom: 24px; display: flex; justify-content: center;">
        <GlassDock data-testid="dock" orientation="horizontal" fit-content :collapse="false" aria-label="Depth dock">
          <div style="display: flex; gap: 4px;">
            <DockControl aria-label="Alpha" data-testid="d1">A</DockControl>
            <DockControl aria-label="Beta" data-testid="d2">B</DockControl>
            <div role="radiogroup" style="display: contents;">
              <DockControl shape="tab" data-testid="d3">Day</DockControl>
              <DockControl shape="tab" data-testid="d4">Week</DockControl>
            </div>
          </div>
        </GlassDock>
      </div>
    </template>

    <template v-else-if="scene === 'nested'">
      <div style="position: fixed; left: 0; right: 0; bottom: 24px; display: flex; justify-content: center;">
        <GlassDock data-testid="dock" orientation="horizontal" :collapse="false" aria-label="Nested dock" style="max-inline-size: 360px">
          <DockControl aria-label="Prev" data-testid="n1">P</DockControl>
          <DockControl shape="tab" aria-label="Categories" data-testid="strip" style="flex: 1 1 auto; min-width: 0;">
            <span style="display: flex; gap: 4px; overflow-x: auto; min-width: 0;"><span v-for="i in 12" :key="i" style="flex: 0 0 auto; padding: 6px 10px; border-radius: 12px; background: rgba(0,0,0,.06);">Cat {{ i }}</span></span>
          </DockControl>
          <DockControl aria-label="Next" data-testid="n2">N</DockControl>
          <DockControl aria-label="Layers" data-testid="n3">L</DockControl>
        </GlassDock>
      </div>
    </template>

    <template v-else-if="scene === 'tick'">
      <div style="position: fixed; left: 0; right: 0; bottom: 24px; display: flex; justify-content: center;">
        <GlassDock data-testid="dock" orientation="horizontal" fit-content :collapse="false" aria-label="Tick dock">
          <DockControl aria-label="Play" data-testid="k1">P</DockControl>
          <DockControl shape="tab" data-testid="tick">{{ tickText }}</DockControl>
          <DockControl aria-label="Stop" data-testid="k2">S</DockControl>
        </GlassDock>
      </div>
    </template>

    <template v-else-if="scene === 'seatgrow'">
      <div style="position: fixed; left: 0; right: 0; bottom: 24px; display: flex; justify-content: center;">
        <GlassDock data-testid="dock" orientation="horizontal" fit-content :collapse="false" aria-label="Grow dock">
          <DockControl aria-label="A">A</DockControl>
          <DockControl shape="tab" data-testid="grow" :style="{ width: grow ? '160px' : '80px', transition: 'width .3s ease' }">Grow</DockControl>
          <DockControl aria-label="B">B</DockControl>
        </GlassDock>
      </div>
    </template>

    <template v-else-if="scene === 'form'">
      <div style="position: fixed; left: 0; right: 0; bottom: 24px; display: flex; justify-content: center;">
        <GlassDock ref="dockRef" data-testid="dock" orientation="horizontal" collapse="closed" aria-label="Form dock">
          <DockControl aria-label="One" data-testid="f1">1</DockControl>
          <DockControl aria-label="Two">2</DockControl>
          <DockControl shape="tab">Settings</DockControl>
          <template #collapsed><DockControl aria-label="Play" data-testid="form-face">▶</DockControl></template>
          <template #persistent-end>
            <div data-testid="form-track" style="flex: 0 0 64px; width: 64px; height: 4px; border-radius: 2px; background: #3a53e6; align-self: center;"></div>
            <span data-testid="form-count" style="padding: 0 4px; font-weight: 700; align-self: center;">1</span>
            <DockControl aria-label="Dismiss" data-testid="form-dismiss">×</DockControl>
          </template>
        </GlassDock>
      </div>
    </template>

    <template v-else-if="scene === 'edge'">
      <div v-if="kind === 'side'" data-testid="surface-above" data-edge="bottom" style="position: fixed; left: 0; right: 0; top: 0; height: 56px; background: #d6d0c4;"></div>
      <div :data-testid="kind === 'canvas' ? 'surface-above' : undefined" data-edge="top" :style="kind === 'canvas' ? 'position: fixed; left: 200px; top: 140px; width: 800px; height: 480px; background: rgba(0,0,0,.04); border: 1px solid rgba(0,0,0,.2);' + (clipPanel ? ' overflow: hidden;' : '') : kind === 'side' ? 'position: fixed; left: 0; top: 56px;' : 'position: fixed; left: 0; right: 0; top: 16px; display: flex; justify-content: center;'">
        <div :style="kind === 'canvas' ? 'position: absolute; left: 0; top: 0; display: flex;' : 'display: flex;'">
          <GlassDock data-testid="dock" :orientation="kind === 'side' ? 'vertical' : 'horizontal'" fit-content :collapse="false" aria-label="Edge dock">
            <DockControl aria-label="Expand" data-testid="e1"><svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7" fill="currentColor"/></svg><template #badge><span data-testid="badge" style="display: block; width: 8px; height: 8px; border-radius: 4px; background: #f59e0b;"></span></template></DockControl>
            <DockControl aria-label="Edit" data-testid="e2"><svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7" fill="currentColor"/></svg></DockControl>
          </GlassDock>
        </div>
      </div>
    </template>
  </main>
</template>
`;
