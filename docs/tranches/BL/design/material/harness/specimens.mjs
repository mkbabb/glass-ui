// specimens.mjs · the specimen app, written into a scratch build root and bundled against ANY worktree's
// `src` through the `@glass` alias. Nothing here is library code: it lays the real specimens out on a
// fixed 1280×900 grid and stamps the DOM contract the capture reads.
//
// THE DOM CONTRACT (fixtures honour the same one):
//   [data-spec="<id>"]   a measured surface: wash quiet resting card floating overlay dialog-rung opaque
//                        dock popover dialog (and, in the halo scene, [data-halo-host] / [data-halo-ref])
//   [data-ink="<id>"]    a text run inside it; ids containing "muted" are the muted register, all others fg
//   [data-edge="<id>"]   an element whose painted border is a non-text perimeter
//   [data-ring="<id>"]   a focusable whose focus outline is a non-text ring
//   [data-sample]        an empty region of the surface (the composite)
//   [data-bare]          an empty region of the page (the bare ground)
//   [data-raw-hide]      anything the raw capture must hide besides [data-spec] (the modal scrim)
//   window.__harness.setCeiling(v)   steps the field's opacity ceiling (W-B's step)
// URL: ?scene=ladder|dialog|halo|empty &ground=<GROUNDS> &theme=light|dark &nodock=1 &feed=1
import { CHECKOUT } from "./lib.mjs";

export function specimenApp(wt) {
  const nm = `${CHECKOUT}/node_modules`;
  const indexHtml = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=1280, initial-scale=1">
<title>D3 material specimens</title>
<script>const q=new URLSearchParams(location.search); if(q.get('theme')==='dark'){document.documentElement.classList.add('dark');}</script>
</head><body><div id="app"></div><script type="module" src="./main.ts"></script></body></html>
`;
  const mainTs = `import "./harness.css";
import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);
app.config.errorHandler = (err, _i, info) => { console.error("[specimens] app error", info, err); (window as any).__errors = ((window as any).__errors || 0) + 1; };
app.mount("#app");
`;
  const appVue = `<script setup lang="ts">
import { ref, onMounted } from "vue";
import { GlassDock, DockControl, DockSeparator } from "@glass/components/dock";
import { Aurora } from "@glass/components/aurora";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@glass/components/dialog";
import { Popover, PopoverTrigger, PopoverContent } from "@glass/components/popover";
import { Input } from "@glass/components/input";

const q = new URLSearchParams(location.search);
const ground = q.get("ground") ?? "paper";
const scene = q.get("scene") ?? "ladder";
const nodock = q.get("nodock") === "1";
const feed = q.get("feed") === "1";
const field = ground === "aurora" || ground === "aurora50";
const ceiling = ref(ground === "aurora50" ? 0.5 : 1);
(window as any).__harness = { setCeiling: (v: number) => { ceiling.value = v; } };
const fieldCanvas = (): HTMLCanvasElement | null => document.querySelector("[data-glass-field-canvas] canvas");
const keep = (e: Event) => e.preventDefault();

const LEVELS = [
  { id: "wash", cls: "glass-wash", band: "content" },
  { id: "quiet", cls: "glass-quiet", band: "content" },
  { id: "resting", cls: "glass-resting", band: "content" },
  { id: "card", cls: "glass-card", band: "content" },
  { id: "floating", cls: "glass-floating", band: "chrome" },
  { id: "overlay", cls: "glass-overlay", band: "chrome" },
  // The dialog RUNG on a plain plate, through the same seam DialogContent uses; the real Dialog is its own scene.
  { id: "dialog-rung", cls: "glass-floating", band: "chrome", style: { "--glass-veil-tier": "var(--glass-veil-dialog)" } },
  { id: "opaque", cls: "glass-resting glass-opaque", band: "escape" },
].map((L, i) => ({ ...L, pos: { left: 24 + (i % 4) * 304 + "px", top: 24 + Math.floor(i / 4) * 212 + "px" } }));
const HALO = ["wash", "quiet", "resting", "card"].map((id, i) => ({ id, cls: "glass-" + id, top: 40 + i * 150 + "px" }));

onMounted(() => {
  const stamp = () => {
    document.querySelectorAll(".bg-overlay-scrim, .glass-focus-veil").forEach((e) => e.setAttribute("data-raw-hide", ""));
    document.querySelector('[data-slot="dialog-close"]')?.setAttribute("data-ring", "close");
  };
  stamp(); setTimeout(stamp, 200); setTimeout(stamp, 1000);
});
</script>

<template>
  <Aurora v-if="field && scene !== 'halo'" class="fixed inset-0 -z-10" data-glass-field-canvas :opacity-ceiling="ceiling" aria-hidden="true" />
  <div v-else-if="ground !== 'paper'" class="hx-stand" :data-ground="ground" aria-hidden="true"></div>
  <div class="hx-bare" data-bare aria-hidden="true"></div>

  <main v-if="scene === 'ladder'" class="hx-page">
    <section v-for="L in LEVELS" :key="L.id" :class="['hx-plate', L.cls]" :data-spec="L.id" :data-band="L.band" :style="{ ...L.pos, ...(L.style || {}) }">
      <p class="hx-fg"><span data-ink="fg">{{ L.id }} Aa foreground</span></p>
      <p class="text-muted-foreground"><span data-ink="muted">Muted caption ink</span></p>
      <div class="hx-wells">
        <Input model-value="Lot 42" aria-label="Lot" data-ink="well-fg" data-edge="well" data-ring="well" />
        <Input placeholder="Search lots" aria-label="Search" data-ink="well-muted" />
      </div>
      <div class="hx-sample" data-sample></div>
    </section>
    <div v-if="!nodock" class="hx-dockcell">
      <GlassDock data-spec="dock" data-band="chrome" orientation="horizontal" fit-content :collapse="false" aria-label="Specimen dock" :background-canvas="feed ? fieldCanvas : undefined">
        <DockControl shape="tab" :active="true">Photos</DockControl>
        <DockControl shape="tab"><span data-ink="fg">Lots</span></DockControl>
        <DockSeparator />
        <span class="hx-docklabel text-muted-foreground"><span data-ink="muted">12 lots</span></span>
        <span class="hx-docksample" data-sample></span>
      </GlassDock>
    </div>
    <div class="hx-popcell">
      <Popover default-open>
        <PopoverTrigger class="hx-poptrigger">Filters</PopoverTrigger>
        <PopoverContent data-spec="popover" data-band="chrome" side="bottom" align="start" :side-offset="8" @focus-outside="keep" @interact-outside="keep" @pointer-down-outside="keep">
          <div class="hx-popbody">
            <p class="hx-fg"><span data-ink="fg">Popover Aa foreground</span></p>
            <p class="text-muted-foreground"><span data-ink="muted">Muted caption ink</span></p>
            <div class="hx-popsample" data-sample></div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  </main>

  <Dialog v-else-if="scene === 'dialog'" default-open>
    <DialogContent data-spec="dialog" data-band="chrome" class="hx-dialog" @pointer-down-outside="keep" @interact-outside="keep">
      <DialogHeader>
        <DialogTitle><span data-ink="fg">Dialog Aa title</span></DialogTitle>
        <DialogDescription><span data-ink="fg-description">The description reads foreground ink.</span></DialogDescription>
      </DialogHeader>
      <p class="text-muted-foreground hx-dialogmuted"><span data-ink="muted">Muted caption ink</span></p>
      <Input model-value="Lot 42" aria-label="Lot" data-ink="well-fg" data-edge="well" data-ring="well" />
      <div class="hx-dialogsample" data-sample></div>
    </DialogContent>
  </Dialog>

  <main v-else-if="scene === 'halo'" class="hx-page">
    <section v-for="H in HALO" :key="H.id" :class="['hx-halohost', H.cls]" :data-halo-host="H.id" :style="{ top: H.top }">
      <button class="glass-capsule hx-capsule" data-halo-capsule>Pause</button>
    </section>
    <div class="hx-haloref" data-halo-ref style="top: 640px"><button class="glass-capsule hx-capsule" data-halo-capsule>Pause</button></div>
  </main>
</template>
`;
  const css = `@import "${nm}/tailwindcss/index.css" source("./");
@source "${wt}/src/components/**/*.vue";
@source "${wt}/src/components/_shared/**/*.ts";
@source "${wt}/src/components/**/index.ts";
@import "${nm}/tw-animate-css/dist/tw-animate.css";
@import "${wt}/src/styles/index.css";

html, body { margin: 0; min-height: 100vh; }
body { background: var(--background); color: var(--foreground); font-family: system-ui, sans-serif; font-size: 15px; line-height: 20px; }
.hx-page { position: relative; width: 1280px; height: 900px; }
.hx-stand { position: fixed; inset: 0; z-index: -1; }
.hx-stand[data-ground="black"] { background: #000; }
.hx-stand[data-ground="white"] { background: #fff; }
.hx-stand[data-ground="checker"] { background: repeating-conic-gradient(#000 0 25%, #fff 0 50%) 0 0 / 16px 16px; }
.hx-stand[data-ground="stripes"] { background: repeating-linear-gradient(90deg, #7c3aed 0 24px, #facc15 24px 48px); }
.hx-bare { position: absolute; left: 24px; top: 844px; width: 280px; height: 36px; pointer-events: none; }
.hx-plate { position: absolute; width: 280px; height: 188px; box-sizing: border-box; padding: 14px 16px; }
.hx-plate p, .hx-popbody p { margin: 0 0 6px; font-size: 15px; line-height: 20px; }
.hx-fg { font-weight: 600; }
.hx-wells { display: flex; gap: 12px; margin-top: 10px; }
.hx-wells > * { flex: 1 1 0; min-width: 0; }
.hx-sample { position: absolute; left: 16px; right: 16px; bottom: 10px; height: 44px; }
.hx-dockcell { position: absolute; left: 24px; top: 470px; }
.hx-docklabel { padding-inline: 10px; font-size: 15px; }
.hx-docksample { display: inline-block; width: 140px; height: 40px; }
.hx-popcell { position: absolute; left: 936px; top: 470px; }
.hx-poptrigger { font: inherit; padding: 6px 14px; }
.hx-popbody { width: 248px; padding: 14px 16px; box-sizing: border-box; }
.hx-popsample { height: 48px; margin-top: 8px; }
[data-slot="dialog-content"].hx-dialog { block-size: 360px; }
.hx-dialogmuted { margin: 0; font-size: 15px; line-height: 20px; }
.hx-dialogsample { height: 48px; }
.hx-halohost { position: absolute; left: 120px; width: 300px; height: 120px; box-sizing: border-box; }
.hx-haloref { position: absolute; left: 120px; width: 300px; height: 120px; }
.hx-capsule { position: absolute; left: 2px; top: 40px; padding: 8px 18px; font: inherit; }
`;
  return { "index.html": indexHtml, "main.ts": mainTs, "App.vue": appVue, "harness.css": css };
}
