#!/usr/bin/env node
// FV4-hover-probe.mjs · D3 pass 5, floor v4 (REGISTRY P4-6.2 step 2): R-6's precondition and its paint, on the real
// components. R-6 drops the fill from `.glass-menu-row:hover`, so the row's fill must reach paint through reka's
// `[data-highlighted]` alone. This probe reads, per composer of `.glass-menu-row`:
//   pointer   the mouse moved onto the row (pointermove, 6 steps): does the row carry [data-highlighted], and what is its
//             computed background? (the precondition: every composer is highlighted by pointer movement)
//   parked    the pointer rests on row 0, then the keyboard moves the highlight (ArrowDown): row 0 is :hover and not
//             highlighted, row 1 is highlighted. What does each paint? (R-4 as built paints the selected rung on both:
//             hover minting the state rung; literal R-6 leaves `.interactive-item:hover` to paint row 0)
//   bare      a lone `.interactive-item.glass-menu-row` that no reka primitive drives, hovered: the paint a row gets
//             on hover alone, with no highlight
// Composers: rowClass.ts through SelectItem and CommandItem, and the four DropdownMenu items (Item, CheckboxItem,
// RadioItem, SubTrigger). Computed style only (no screenshots); every page, context and browser closed in a finally.
//   node FV4-hover-probe.mjs <worktree> --label <name> [--skip-build] [--engines chromium,webkit] [--out <json>] [--shot <dir>]
// Build output and vite cache live under $D3_OUT/builds/<label>-hp (inside the seat's worktree).
import fs from "node:fs";
import path from "node:path";
import { CHECKOUT, OUT, cli, list, serve, playwright } from "../harness/lib.mjs";

const a = cli({ label: { type: "string" }, "skip-build": { type: "boolean" }, engines: { type: "string" }, out: { type: "string" }, shot: { type: "string" } });
const wt = path.resolve(a._[0] || "");
const label = a.label || "probe";
const root = path.join(OUT, "builds", `${label}-hp`), app = path.join(root, "app"), dist = path.join(root, "dist");

const indexHtml = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=1024, initial-scale=1">
<title>FV4 hover probe</title>
<script>const q=new URLSearchParams(location.search); if(q.get('theme')==='dark'){document.documentElement.classList.add('dark');}</script>
</head><body><div id="app"></div><script type="module" src="./main.ts"></script></body></html>`;
const mainTs = `import "./probe.css";
import { createApp } from "vue";
import App from "./App.vue";
createApp(App).mount("#app");`;
const appVue = `<script setup lang="ts">
import { ref } from "vue";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from "@glass/components/menu";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@glass/components/select";
import { Command, CommandInput, CommandList, CommandGroup, CommandItem } from "@glass/components/command";
const scene = new URLSearchParams(location.search).get("scene") || "menu";
const open = ref(true), selOpen = ref(true), sel = ref("zeta"), chk = ref(false), radio = ref("r2");
const keep = (e: Event) => e.preventDefault();
</script>
<template>
  <main class="hp-page">
    <div v-if="scene === 'bare'" class="hp-bare"><div class="interactive-item glass-menu-row" data-probe="bare-0">Bare row</div></div>
    <DropdownMenu v-else-if="scene === 'menu'" v-model:open="open">
      <DropdownMenuTrigger as-child><button type="button" class="hp-trigger">Menu</button></DropdownMenuTrigger>
      <DropdownMenuContent class="hp-menu" @focus-outside="keep" @interact-outside="keep" @pointer-down-outside="keep">
        <DropdownMenuItem data-probe="item-0">First item</DropdownMenuItem>
        <DropdownMenuItem data-probe="item-1">Second item</DropdownMenuItem>
        <DropdownMenuCheckboxItem v-model="chk" data-probe="checkbox">Checkbox item</DropdownMenuCheckboxItem>
        <DropdownMenuRadioGroup v-model="radio"><DropdownMenuRadioItem value="r1" data-probe="radio">Radio item</DropdownMenuRadioItem></DropdownMenuRadioGroup>
        <DropdownMenuSub><DropdownMenuSubTrigger data-probe="subtrigger">More</DropdownMenuSubTrigger>
          <DropdownMenuSubContent><DropdownMenuItem>Nested</DropdownMenuItem></DropdownMenuSubContent></DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
    <Select v-else-if="scene === 'select'" v-model="sel" v-model:open="selOpen">
      <SelectTrigger aria-label="Pick" class="hp-trigger"><SelectValue /></SelectTrigger>
      <SelectContent position="popper"><SelectItem value="alpha" data-probe="select-0">Alpha</SelectItem>
        <SelectItem value="beta" data-probe="select-1">Beta</SelectItem><SelectItem value="zeta" data-probe="select-2">Zeta</SelectItem></SelectContent>
    </Select>
    <Command v-else class="hp-command" :default-open="true">
      <CommandInput placeholder="Search" data-probe="command-input" />
      <CommandList><CommandGroup heading="Rows">
        <CommandItem value="one" data-probe="command-0">One</CommandItem><CommandItem value="two" data-probe="command-1">Two</CommandItem>
        <CommandItem value="three" data-probe="command-2">Three</CommandItem></CommandGroup></CommandList>
    </Command>
  </main>
</template>`;
const nm = `${CHECKOUT}/node_modules`;
const probeCss = () => `@import "${nm}/tailwindcss/index.css" source("./");
@source "${wt}/src/components/**/*.vue";
@source "${wt}/src/components/_shared/**/*.ts";
@source "${wt}/src/components/**/index.ts";
@import "${nm}/tw-animate-css/dist/tw-animate.css";
@import "${wt}/src/styles/index.css";
html, body { margin: 0; } .hp-page { padding: 40px; min-height: 100vh; box-sizing: border-box; background: var(--background); color: var(--foreground); }
.hp-menu { width: 260px; } .hp-command { width: 320px; } .hp-bare { width: 260px; padding: 8px; } .hp-trigger { font: inherit; padding: 6px 14px; }`;

async function build() {
  fs.rmSync(app, { recursive: true, force: true }); fs.mkdirSync(app, { recursive: true });
  for (const [n, b] of Object.entries({ "index.html": indexHtml, "main.ts": mainTs, "App.vue": appVue, "probe.css": probeCss() })) fs.writeFileSync(path.join(app, n), b);
  process.env.NODE_ENV = "production";
  const { build } = await import(path.join(CHECKOUT, "node_modules/vite/dist/node/index.js"));
  const vue = (await import(path.join(CHECKOUT, "node_modules/@vitejs/plugin-vue/dist/index.mjs"))).default;
  const tailwindcss = (await import(path.join(CHECKOUT, "node_modules/@tailwindcss/vite/dist/index.mjs"))).default;
  const { glassCssTarget } = await import(path.join(wt, "vite.targets.ts"));
  await build({
    configFile: false, mode: "production", root: app, base: "./", cacheDir: path.join(root, ".vite"), logLevel: "warn", publicDir: false,
    plugins: [tailwindcss(), vue()],
    resolve: { alias: [{ find: "@glass", replacement: path.join(wt, "src") },
      { find: /^vue$/, replacement: path.join(CHECKOUT, "node_modules/vue/dist/vue.runtime.esm-bundler.js") }] },
    build: { outDir: dist, emptyOutDir: true, cssTarget: glassCssTarget, target: "esnext", minify: false, sourcemap: false, reportCompressedSize: false },
  });
}

const SCENES = { menu: ["item-0", "item-1", "checkbox", "radio", "subtrigger"], select: ["select-0", "select-1", "select-2"], command: ["command-0", "command-1", "command-2"], bare: ["bare-0"] };
const SETTLE = 700; // past the engage attack and release clocks, so computed style is the landed state
const read = (page, probe) => page.evaluate((p) => {
  const el = document.querySelector(`[data-probe="${p}"]`);
  if (!el) return null;
  const cs = getComputedStyle(el);
  return { highlighted: el.hasAttribute("data-highlighted"), hover: el.matches(":hover"), focus: el.matches(":focus"), bg: cs.backgroundColor, translate: cs.translate };
}, probe);
async function center(page, probe) { const b = await page.locator(`[data-probe="${probe}"]`).boundingBox(); return b && [b.x + b.width / 2, b.y + b.height / 2]; }

async function run(engine, base) {
  const pw = await playwright();
  const browser = await pw[engine].launch({ headless: true });
  const rows = [];
  try {
    for (const theme of ["light", "dark"]) for (const scene of Object.keys(SCENES)) {
      const ctx = await browser.newContext({ viewport: { width: 1024, height: 700 }, deviceScaleFactor: 1, hasTouch: false });
      try {
        const page = await ctx.newPage();
        await page.goto(`${base}?scene=${scene}&theme=${theme}`, { waitUntil: "load" });
        await page.waitForSelector(`[data-probe="${SCENES[scene][0]}"]`, { timeout: 10000 });
        await page.waitForTimeout(400);
        if (scene === "command") { const c = await center(page, "command-input"); await page.mouse.click(...c); await page.waitForTimeout(200); }
        // pointer: each row, the mouse moved onto it from off the row
        for (const probe of SCENES[scene]) {
          const c = await center(page, probe);
          await page.mouse.move(c[0] - 40, c[1] - 60 > 0 ? c[1] - 60 : 5, { steps: 1 });
          if (scene === "menu" || scene === "select") await page.mouse.move(c[0] - 60, c[1], { steps: 2 });
          await page.mouse.move(c[0], c[1], { steps: 6 });
          await page.waitForTimeout(SETTLE);
          rows.push({ engine, theme, scene, mode: "pointer", probe, ...(await read(page, probe)) });
        }
        // parked: the pointer on row 0, the keyboard moves the highlight to the next row
        if (scene !== "bare") {
          const [r0, r1] = SCENES[scene];
          const c = await center(page, r0);
          await page.mouse.move(c[0] + 5, c[1], { steps: 4 }); await page.mouse.move(c[0], c[1], { steps: 2 });
          await page.waitForTimeout(SETTLE);
          await page.keyboard.press("ArrowDown");
          await page.waitForTimeout(SETTLE);
          rows.push({ engine, theme, scene, mode: "parked", probe: r0, ...(await read(page, r0)) });
          rows.push({ engine, theme, scene, mode: "parked", probe: r1, ...(await read(page, r1)) });
          // --shot: the one frame the glance pair cites, the open menu in this parked state (pointer on row 0, the
          // keyboard's highlight on row 1), cropped to the menu with a 16 px margin.
          if (a.shot && scene === "menu") {
            const box = await page.locator(".hp-menu").boundingBox();
            fs.mkdirSync(a.shot, { recursive: true });
            await page.screenshot({ path: path.join(a.shot, `${label}-${engine}-${theme}-menu-parked.png`),
              clip: { x: Math.max(0, box.x - 16), y: Math.max(0, box.y - 16), width: box.width + 32, height: box.height + 32 } });
          }
        }
        await page.close();
      } finally { await ctx.close(); }
    }
  } finally { await browser.close(); }
  return rows;
}

if (!a["skip-build"]) { const t0 = Date.now(); await build(); console.log(`built ${label} from ${wt} in ${((Date.now() - t0) / 1000).toFixed(1)}s → ${dist}`); }
const srv = await serve(dist);
const all = [];
try {
  for (const engine of list(a.engines, ["chromium"])) {
    const rows = await run(engine, srv.url);
    all.push(...rows);
    for (const r of rows) console.log(`${label} ${engine === "webkit" ? "Playwright WebKit" : "Chromium"} ${r.theme} ${r.scene} ${r.mode} ${r.probe}: highlighted=${r.highlighted} hover=${r.hover} focus=${r.focus} bg=${r.bg} translate=${r.translate}`);
  }
} finally { srv.close(); }
const ptr = all.filter((r) => r.mode === "pointer" && r.scene !== "bare");
const miss = ptr.filter((r) => !r.highlighted);
console.log(`POINTER→[data-highlighted] ${ptr.length - miss.length}/${ptr.length}${miss.length ? " MISSING: " + miss.map((r) => `${r.engine}/${r.theme}/${r.probe}`).join(", ") : ""}`);
const parked = all.filter((r) => r.mode === "parked" && r.hover && !r.highlighted);
const filled = parked.filter((r) => !/rgba\(0, 0, 0, 0\)|transparent/.test(r.bg));
console.log(`PARKED hovered-not-highlighted rows: ${parked.length}; painting a fill: ${filled.length}${filled.length ? " (" + [...new Set(filled.map((r) => r.bg))].join(" | ") + ")" : ""}`);
const bare = all.filter((r) => r.scene === "bare");
console.log(`BARE hover paint: ${bare.map((r) => `${r.engine}/${r.theme} ${r.bg}`).join("; ")}`);
if (a.out) fs.writeFileSync(a.out, JSON.stringify(all, null, 1));
