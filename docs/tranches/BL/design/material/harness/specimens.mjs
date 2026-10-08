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
//   [data-raw-hide]      anything the raw capture must hide besides [data-spec] (the modal scrim, the focus veil)
//   [data-fill="<id>"]   an element whose painted fill is a state register (M-9: active, hover, checked, selected)
//   [data-veil-probe]    a region of the page under an engaged focus veil (M-9: the veil must dim it)
//   [data-hover]         the element the capture's pointer rests on (the hover register)
//   [data-press]         the element the capture presses and holds through every capture (the held dock, H-5)
//   [data-hx-band]       an opaque band interposed between the field and the glass (H-10); part of the ground
//   [data-hx-declared]   a page region a consumer declares ("dark" or "light"); class .hx-declared is the route's hook
//   window.__harness.setCeiling(v)   steps the field's opacity ceiling (W-B's step, M-2m's ground step)
//   [data-glass-ground]  a consumer's claim on the ground under a scope (D3 C′, tokens/glass.css); written under
//                        ?claim= and, always, in the claim and field-claim scenes (H3-6, H3-7); inert on a build whose
//                        library has no claim
//   [data-probe="<id>"]  an O-66 §1 probe (H3-9): trigger-paper, input-paper, trigger-pane, input-pane, row-0, row-2
//   [data-focus]         the element the capture focuses after resting the pointer (the highlighted menu row, H3-9)
// H3-2: every content plate carries a "muted-strong" run (--muted-foreground-strong, which every rung re-points), and
// the ladder carries a .glass-capsule ("capsule"), whose muted run the library re-points to the -strong register.
// URL: ?scene=<SCENES> &ground=<GROUNDS|red|deep> &theme=light|dark &nodock=1 &claim=honest|field-false|root-page|none
//   claim=honest       the page claims what it paints under every <main>, as a consumer would: paper → "page", the
//                      aurora → "field" (the field's own publication), a stand → its colours' tones, and the hostile
//                      scene → the worst of its band and declared region (both painted under <main>). Portals and the
//                      Dialog stay unclaimed.
//   claim=field-false  as honest, except the hostile scene claims the field and hides its band (a false claim)
//   claim=root-page    <html> claims the page ground everywhere (pass 1's page default, the masking plant)
//   claim=none         the claim and field-claim scenes drop their claim (H3-7's unclaimed reference, variant noclaim)
// The ink ids: "fg" and "muted" on every surface; the dock's fg run is the ACTIVE tab and its inactive tab is
// "muted-tab" (S-9, H-2: an inactive DockControl paints --muted-foreground by design, so it is a muted run).
import fs from "node:fs";
import { CHECKOUT } from "./lib.mjs";

export function specimenApp(wt) {
  const nm = `${CHECKOUT}/node_modules`;
  // The claim's tone function, where the worktree's library has one; a library without it gets no tones.
  const hasTone = fs.existsSync(`${wt}/src/composables/glass/groundTone.ts`);
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
import { Checkbox } from "@glass/components/checkbox";
import { SegmentedTabs } from "@glass/components/tabs";
import { Slider } from "@glass/components/slider";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@glass/components/select";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@glass/components/menu";
${hasTone ? 'import { glassGroundTone, readGlassSaturate } from "@glass/composables/glass/groundTone";' : "const glassGroundTone = null as any, readGlassSaturate = null as any;"}

const q = new URLSearchParams(location.search);
const ground = q.get("ground") ?? "paper";
const scene = q.get("scene") ?? "ladder";
const nodock = q.get("nodock") === "1";
const field = ground === "aurora" || ground === "aurora50";
const ceiling = ref(ground === "aurora50" ? 0.5 : 1);
(window as any).__harness = { setCeiling: (v: number) => { ceiling.value = v; } };
const keep = (e: Event) => e.preventDefault();
const declared = q.get("theme") === "dark" ? "light" : "dark";
const FIELDCLAIM = ["fieldout", "fieldtwo", "fieldgone"].includes(scene);
const LADDERISH = ["ladder", "hostile", "isolated", ...(FIELDCLAIM ? [scene] : [])].includes(scene);
// H3-7: fieldgone unmounts the Aurora 1.2 s after mount (the claim stays); fieldout mounts it outside every ancestor of
// <main>; fieldtwo adds a second Aurora at ceiling 0.5 under the content row (y 12-224).
const auroraOn = ref(true);
if (scene === "fieldgone") setTimeout(() => { auroraOn.value = false; }, 1200);
// H3-9 (O-66 §1): a filled Select beside a filled Input; a menu open with its first row focused.
const o66sel = ref("normal"), o66inp = ref("1000ms"), o66open = ref(true);
const seg = ref("a");
const SEG = [{ label: "Grid", value: "a" }, { label: "List", value: "b" }];

// The consumer's claim (?claim=). The stands' colours and the hostile scene's band + declared region are what
// this page paints under <main>; the field is the aurora's own publication.
const claim = q.get("claim");
const STAND: Record<string, string[]> = { black: ["#000000"], white: ["#ffffff"], checker: ["#000000", "#ffffff"], stripes: ["#7c3aed", "#facc15"], red: ["#761617"], deep: ["#193b59"] };
const HOSTILE = q.get("theme") === "dark" ? ["#f4f1ea", "#ffffff"] : ["#0b1020", "#000000"];
const claimMode = FIELDCLAIM ? (claim === "none" ? undefined : "field")
  : scene === "claim" ? (claim === "none" ? undefined : "page")
  : !claim || claim === "root-page" || claim === "none" ? undefined
  : scene === "hostile" ? (claim === "field-false" ? "field" : "")
  : field ? "field" : ground === "paper" ? "page" : "";
const claimColors = claimMode === "" ? (scene === "hostile" ? HOSTILE : STAND[ground] ?? null) : null;
const claimStyle = ref<Record<string, string>>({});

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
const HELD = [{ id: "wash-held", cls: "glass-wash", band: "content" }, { id: "floating-held", cls: "glass-floating", band: "chrome" }];
const HALO = ["wash", "quiet", "resting", "card"].map((id, i) => ({ id, cls: "glass-" + id, top: 40 + i * 150 + "px" }));

onMounted(() => {
  if (claim === "root-page") document.documentElement.setAttribute("data-glass-ground", "page");
  if (claimColors && glassGroundTone) {
    const saturate = readGlassSaturate(document.documentElement);
    let lo = 1, hi = 0;
    for (const c of claimColors) { const t = glassGroundTone(c, { saturate }); lo = Math.min(lo, t.lo); hi = Math.max(hi, t.hi); }
    claimStyle.value = { "--glass-ground-lo": lo.toFixed(4), "--glass-ground-hi": hi.toFixed(4) };
  }
  const stamp = () => {
    document.querySelectorAll(".bg-overlay-scrim, .glass-focus-veil").forEach((e) => e.setAttribute("data-raw-hide", ""));
    document.querySelector('[data-slot="dialog-close"]')?.setAttribute("data-ring", "close");
    document.querySelector(".hx-seg .segmented-indicator")?.setAttribute("data-fill", "selected");
  };
  stamp(); setTimeout(stamp, 200); setTimeout(stamp, 1000);
});
</script>

<template>
  <div v-if="scene === 'fieldout'" class="hx-fieldhost" aria-hidden="true"><Aurora class="fixed inset-0 -z-10" :opacity-ceiling="ceiling" /></div>
  <Aurora v-else-if="field && scene !== 'halo' && auroraOn" class="fixed inset-0 -z-10" :opacity-ceiling="ceiling" aria-hidden="true" />
  <Aurora v-if="scene === 'fieldtwo'" class="hx-field2" :opacity-ceiling="0.5" aria-hidden="true" />
  <div v-else-if="ground !== 'paper'" class="hx-stand" :data-ground="ground" aria-hidden="true"></div>
  <div class="hx-bare" data-bare aria-hidden="true"></div>

  <main v-if="LADDERISH" class="hx-page" :data-glass-ground="claimMode" :style="[scene === 'isolated' ? { isolation: 'isolate' } : {}, claimStyle]">
    <template v-if="scene === 'hostile'">
      <div class="hx-band" data-hx-band style="top: 36px; height: 52px" aria-hidden="true"></div>
      <div class="hx-band" data-hx-band style="top: 474px; height: 48px; width: 900px" aria-hidden="true"></div>
      <div class="hx-declared" :data-hx-declared="declared" aria-hidden="true"></div>
    </template>
    <section v-for="L in LEVELS" :key="L.id" :class="['hx-plate', L.cls]" :data-spec="L.id" :data-band="L.band" :style="{ ...L.pos, ...(L.style || {}) }">
      <p class="hx-fg"><span data-ink="fg">{{ L.id }} Aa foreground</span></p>
      <p class="text-muted-foreground"><span data-ink="muted">Muted caption ink</span><template v-if="L.band === 'content'"> <span class="hx-strong" data-ink="muted-strong">strong</span></template></p>
      <div class="hx-wells">
        <Input model-value="Lot 42" aria-label="Lot" data-ink="well-fg" data-edge="well" data-ring="well" />
        <Input placeholder="Search lots" aria-label="Search" data-ink="well-muted" />
      </div>
      <div class="hx-sample" data-sample></div>
    </section>
    <div v-if="!nodock" class="hx-dockcell">
      <GlassDock data-spec="dock" data-band="chrome" orientation="horizontal" fit-content :collapse="false" aria-label="Specimen dock">
        <DockControl shape="tab" :active="true"><span data-ink="fg">Photos</span></DockControl>
        <DockControl shape="tab"><span data-ink="muted-tab">Lots</span></DockControl>
        <DockSeparator />
        <span class="hx-docklabel text-muted-foreground"><span data-ink="muted">12 lots</span></span>
        <span class="hx-docksample" data-sample></span>
      </GlassDock>
    </div>
    <div class="hx-capcell"><span class="glass-capsule hx-capspec" data-spec="capsule" data-band="content"><span data-ink="fg">Chip</span> <span class="text-muted-foreground" data-ink="muted">12 lots</span></span></div>
    <div v-if="scene !== 'isolated'" class="hx-popcell">
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

  <main v-else-if="scene === 'held'" class="hx-page" :data-glass-ground="claimMode" :style="claimStyle">
    <section v-for="(H, i) in HELD" :key="H.id" :class="['hx-plate', H.cls]" :data-spec="H.id" :data-band="H.band" data-held :style="{ left: 24 + i * 304 + 'px', top: '24px' }">
      <span class="glass-grasp-carrier" data-grasp="rest"></span>
      <span class="glass-grasp-carrier" data-grasp="grasp"></span>
      <p class="hx-fg"><span data-ink="fg">{{ H.id }} Aa foreground</span></p>
      <p class="text-muted-foreground"><span data-ink="muted">Muted caption ink</span></p>
      <div class="hx-wells">
        <Input model-value="Lot 42" aria-label="Lot" data-ink="well-fg" data-edge="well" data-ring="well" />
        <Input placeholder="Search lots" aria-label="Search" data-ink="well-muted" />
      </div>
      <div class="hx-sample" data-sample></div>
    </section>
    <div v-if="!nodock" class="hx-dockcell" style="top: 300px">
      <GlassDock data-spec="dock-held" data-band="chrome" orientation="horizontal" fit-content :collapse="false" aria-label="Held dock">
        <DockControl shape="tab" :active="true"><span data-ink="fg">Photos</span></DockControl>
        <DockControl shape="tab"><span data-ink="muted-tab">Lots</span></DockControl>
        <DockSeparator />
        <span class="hx-docklabel text-muted-foreground"><span data-ink="muted">12 lots</span></span>
        <span class="hx-docksample" data-sample></span>
        <Slider :default-value="[40]" class="hx-dockslider" data-press aria-label="Volume" />
      </GlassDock>
    </div>
    <div v-if="!nodock" class="hx-dockcell" style="top: 440px">
      <GlassDock data-spec="dock-collapsed" data-band="chrome" orientation="horizontal" :collapse="true" aria-label="Collapsed dock">
        <DockControl shape="tab" :active="true">Photos</DockControl>
        <DockControl shape="tab">Lots</DockControl>
        <template #collapsed><span class="hx-collapsedglyph"><span data-ink="fg">Aa</span></span></template>
      </GlassDock>
    </div>
  </main>

  <main v-else-if="scene === 'state'" class="hx-page" :data-glass-ground="claimMode" :style="claimStyle">
    <section class="hx-plate glass-resting" data-spec="resting" data-band="content" style="left: 24px; top: 24px">
      <p class="hx-fg"><span data-ink="fg">resting Aa foreground</span></p>
      <div class="hx-staterow">
        <Checkbox :model-value="true" aria-label="Checked" data-fill="checked" />
        <SegmentedTabs v-model="seg" class="hx-seg" :options="SEG" aria-label="View" />
      </div>
      <div class="hx-sample" data-sample></div>
    </section>
    <div v-if="!nodock" class="hx-dockcell" style="top: 300px">
      <GlassDock data-spec="dock" data-band="chrome" orientation="horizontal" fit-content :collapse="false" aria-label="State dock">
        <DockControl shape="tab" :active="true" data-fill="active"><span data-ink="fg">Photos</span></DockControl>
        <DockControl shape="tab" data-fill="hover" data-hover><span data-ink="muted-tab">Lots</span></DockControl>
        <DockSeparator />
        <span class="hx-docksample" data-sample></span>
      </GlassDock>
    </div>
    <div class="glass-focus-veil" data-engaged data-raw-hide aria-hidden="true" style="--veil-x: 70.3125%; --veil-y: 22.2222%; --glass-focus-veil-core-x: 90px; --glass-focus-veil-core-y: 60px"></div>
    <div class="hx-veilprobe" data-veil-probe aria-hidden="true"></div>
  </main>

  <main v-else-if="scene === 'claim'" class="hx-page" :data-glass-ground="claimMode">
    <div class="hx-tray bg-secondary" aria-hidden="true"></div>
    <section v-for="(L, i) in LEVELS.filter((x) => x.band === 'content')" :key="L.id" :class="['hx-plate', L.cls]" :data-spec="L.id" data-band="content" :style="{ left: 24 + i * 304 + 'px', top: '24px' }">
      <p class="hx-fg"><span data-ink="fg">{{ L.id }} Aa foreground</span></p>
      <p class="text-muted-foreground"><span data-ink="muted">Muted caption ink</span> <span class="hx-strong" data-ink="muted-strong">strong</span></p>
      <div class="hx-sample" data-sample></div>
    </section>
    <section class="hx-plate glass-card glass-opaque hx-host2" aria-label="Opaque card">
      <section v-for="(L, i) in [{ id: 'wash-in-card', cls: 'glass-wash' }, { id: 'quiet-in-card', cls: 'glass-quiet' }]" :key="L.id" :class="['hx-plate', L.cls]" :data-spec="L.id" data-band="content" :style="{ left: 16 + i * 304 + 'px', top: '16px', height: '150px' }">
        <p class="hx-fg"><span data-ink="fg">{{ L.id }} Aa foreground</span></p>
        <p class="text-muted-foreground"><span data-ink="muted">Muted caption ink</span> <span class="hx-strong" data-ink="muted-strong">strong</span></p>
        <div class="hx-sample" data-sample></div>
      </section>
    </section>
  </main>

  <main v-else-if="scene === 'o66field'" class="hx-page hx-o66">
    <section class="hx-o66col">
      <Select v-model="o66sel"><SelectTrigger aria-label="Direction" data-probe="trigger-paper"><SelectValue /></SelectTrigger>
        <SelectContent><SelectItem value="normal">Normal</SelectItem><SelectItem value="reverse">Reverse</SelectItem></SelectContent></Select>
      <Input v-model="o66inp" aria-label="Duration" data-probe="input-paper" />
    </section>
    <section class="glass-floating hx-o66col hx-o66pane">
      <Select v-model="o66sel"><SelectTrigger aria-label="Direction in pane" data-probe="trigger-pane"><SelectValue /></SelectTrigger>
        <SelectContent><SelectItem value="normal">Normal</SelectItem><SelectItem value="reverse">Reverse</SelectItem></SelectContent></Select>
      <Input v-model="o66inp" aria-label="Duration in pane" data-probe="input-pane" />
    </section>
  </main>

  <main v-else-if="scene === 'o66menu'" class="hx-page hx-o66">
    <DropdownMenu v-model:open="o66open">
      <DropdownMenuTrigger as-child><button type="button" class="hx-poptrigger">Commands</button></DropdownMenuTrigger>
      <DropdownMenuContent class="hx-o66menu" @focus-outside="keep" @interact-outside="keep" @pointer-down-outside="keep">
        <DropdownMenuItem data-probe="row-0" data-focus>First command</DropdownMenuItem>
        <DropdownMenuItem data-probe="row-1">Second command</DropdownMenuItem>
        <DropdownMenuItem data-probe="row-2">Third command</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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

  <main v-else-if="scene === 'halo'" class="hx-page" :data-glass-ground="claimMode" :style="claimStyle">
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
.hx-stand[data-ground="red"] { background: #761617; }
.hx-stand[data-ground="deep"] { background: #193b59; }
.hx-field2 { position: fixed; left: 0; top: 12px; width: 1280px; height: 212px; z-index: -9; }
.hx-strong { color: var(--muted-foreground-strong); }
.hx-capcell { position: absolute; left: 24px; top: 600px; }
.hx-capspec { display: inline-block; padding: 8px 18px; font-size: 15px; line-height: 20px; }
.hx-tray { position: absolute; left: 0; top: 12px; width: 1280px; height: 212px; }
.hx-host2 { left: 24px; top: 236px; width: 640px; height: 182px; }
.hx-o66 { padding: 24px; box-sizing: border-box; }
.hx-o66col { display: grid; gap: 16px; width: 340px; margin-bottom: 24px; }
.hx-o66pane { width: 380px; padding: 20px; border-radius: 24px; box-sizing: border-box; }
.hx-o66menu { width: 280px; }
.hx-band { position: absolute; left: 0; width: 1280px; background: #0b1020; }
html.dark .hx-band { background: #f4f1ea; }
.hx-declared { position: absolute; left: 920px; top: 500px; width: 330px; height: 220px; background: #000; }
html.dark .hx-declared { background: #fff; }
.hx-staterow { display: flex; align-items: center; gap: 16px; margin-top: 12px; }
.hx-collapsedglyph { font-weight: 600; }
.hx-dockslider { width: 120px; margin-inline: 10px; }
.hx-veilprobe { position: absolute; left: 870px; top: 180px; width: 60px; height: 40px; pointer-events: none; }
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
