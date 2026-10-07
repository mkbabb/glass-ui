#!/usr/bin/env node
// D3-Ap-probe.mjs · A′ pass-2 probe: is the level-0 escape (`.glass-opaque`) a paint-equal replacement for
// GlassDock's `backdropMode="opaque"` (REGISTRY §7.3 A′ item 4)? On a tree where the prop is deleted (the A′
// prototype) the `mode` dock carries a dead attribute and paints the default, and `class-l1` is the item's plant: the
// escape class with `--glass-level` held at 1, which must paint the bound plate, not the escape. Builds a three-dock page against a worktree's `src`
// and reads, per engine × theme × ground: the plate composite in an empty dock region, the plate's computed
// `backdrop-filter`, `background-color` and border colour, and the dock-scoped `--dock-surface-blur`.
//   node D3-Ap-probe.mjs <worktree> [--out <dir>] [--engines chromium,webkit]
// Docks: `default` (glass), `mode` (backdrop-mode="opaque"), `class` (class="glass-opaque"), `class-l1` (the plant). Grounds: black, white,
// aurora (c1). Playwright WebKit mounts GlassDock only under the H-14 shim; its rows are "webkit+shim".
// Nothing is written into the worktree; the app, vite cache and dist live under --out.
import fs from "node:fs";
import path from "node:path";
import { CHECKOUT, CHROMIUM_ARGS, VIEW, WEBKIT_SHIM, playwright, serve, readPng, region, mean3, dE, hex, lch, cli, list } from "../harness/lib.mjs";

const a = cli({ out: { type: "string" }, engines: { type: "string" } });
const wt = path.resolve(a._[0] || ".");
const out = path.resolve(a.out || path.join(process.env.D3_OUT || "/tmp", "ap-probe"));
const nm = `${CHECKOUT}/node_modules`;
const app = path.join(out, "app"), dist = path.join(out, "dist");
fs.rmSync(app, { recursive: true, force: true }); fs.mkdirSync(app, { recursive: true });
fs.writeFileSync(path.join(app, "index.html"), `<!doctype html><html lang="en"><head><meta charset="utf-8">
<script>const q=new URLSearchParams(location.search); if(q.get('theme')==='dark'){document.documentElement.classList.add('dark');}</script>
</head><body><div id="app"></div><script type="module" src="./main.ts"></script></body></html>`);
fs.writeFileSync(path.join(app, "main.ts"), `import "./p.css"; import { createApp } from "vue"; import App from "./App.vue"; createApp(App).mount("#app");`);
fs.writeFileSync(path.join(app, "App.vue"), `<script setup lang="ts">
import { GlassDock, DockControl } from "@glass/components/dock";
import { Aurora } from "@glass/components/aurora";
const q = new URLSearchParams(location.search); const ground = q.get("ground") ?? "black";
const DOCKS = [{ id: "default", attrs: {} }, { id: "mode", attrs: { "backdrop-mode": "opaque" } }, { id: "class", attrs: { class: "glass-opaque" } },
  { id: "class-l1", attrs: { class: "glass-opaque", style: "--glass-level: 1" } }];
</script>
<template>
  <Aurora v-if="ground === 'aurora'" class="fixed inset-0 -z-10" :opacity-ceiling="1" aria-hidden="true" />
  <div v-else class="p-stand" :data-ground="ground"></div>
  <div v-for="(D, i) in DOCKS" :key="D.id" class="p-cell" :style="{ top: 60 + i * 140 + 'px' }">
    <GlassDock v-bind="D.attrs" :data-probe="D.id" orientation="horizontal" fit-content :collapse="false" aria-label="probe">
      <DockControl shape="tab" :active="true">Photos</DockControl>
      <span class="p-sample" data-sample></span>
    </GlassDock>
  </div>
</template>`);
fs.writeFileSync(path.join(app, "p.css"), `@import "${nm}/tailwindcss/index.css" source("./");
@source "${wt}/src/components/**/*.vue";
@source "${wt}/src/components/_shared/**/*.ts";
@source "${wt}/src/components/**/index.ts";
@import "${nm}/tw-animate-css/dist/tw-animate.css";
@import "${wt}/src/styles/index.css";
html, body { margin: 0; min-height: 100vh; } body { background: var(--background); color: var(--foreground); font: 15px/20px system-ui, sans-serif; }
.p-stand { position: fixed; inset: 0; z-index: -1; } .p-stand[data-ground="black"] { background: #000; } .p-stand[data-ground="white"] { background: #fff; }
.p-cell { position: absolute; left: 40px; } .p-sample { display: inline-block; width: 160px; height: 40px; }`);

process.env.NODE_ENV = "production";
const { build } = await import(path.join(nm, "vite/dist/node/index.js"));
const vue = (await import(path.join(nm, "@vitejs/plugin-vue/dist/index.mjs"))).default;
const tailwindcss = (await import(path.join(nm, "@tailwindcss/vite/dist/index.mjs"))).default;
const { glassCssTarget } = await import(path.join(wt, "vite.targets.ts"));
await build({ configFile: false, mode: "production", root: app, base: "./", cacheDir: path.join(out, ".vite"), logLevel: "warn", publicDir: false,
  plugins: [tailwindcss(), vue()],
  resolve: { alias: [{ find: "@glass", replacement: path.join(wt, "src") }, { find: /^vue$/, replacement: path.join(nm, "vue/dist/vue.runtime.esm-bundler.js") }] },
  build: { outDir: dist, emptyOutDir: true, cssTarget: glassCssTarget, target: "esnext", minify: false, reportCompressedSize: false } });

const pw = await playwright();
const srv = await serve(dist);
const rows = [];
for (const engine of list(a.engines, ["chromium", "webkit"])) {
  const browser = await pw[engine].launch(engine === "chromium" ? { args: CHROMIUM_ARGS } : {});
  for (const theme of ["light", "dark"]) for (const ground of ["black", "white", "aurora"]) {
    const ctx = await browser.newContext({ viewport: VIEW, deviceScaleFactor: 1, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    // H-14: the shim is in the document before any script runs (capture.mjs shimScript's form).
    if (engine === "webkit") await page.addInitScript(`(() => { const add = () => { if (document.getElementById("hx-wk-shim")) return; const s = document.createElement("style"); s.id = "hx-wk-shim"; s.textContent = ${JSON.stringify(WEBKIT_SHIM)}; (document.head || document.documentElement).appendChild(s); }; if (document.documentElement) add(); document.addEventListener("readystatechange", add); })();`);
    await page.goto(`${srv.url}index.html?theme=${theme}&ground=${ground}`, { waitUntil: "load" });
    await page.waitForTimeout(ground === "aurora" ? 2500 : 800);
    const geo = await page.evaluate(() => [...document.querySelectorAll("[data-probe]")].map((d) => {
      const p = d.querySelector(".dock-plate"), s = d.querySelector("[data-sample]").getBoundingClientRect(), cs = getComputedStyle(p);
      return { id: d.dataset.probe, sample: [s.left + 4, s.top + 4, s.width - 8, s.height - 8], bf: cs.backdropFilter || cs.webkitBackdropFilter || "", bg: cs.backgroundColor,
        border: cs.borderTopColor, blurVar: getComputedStyle(d).getPropertyValue("--dock-surface-blur").trim(), level: getComputedStyle(p).getPropertyValue("--glass-level").trim() };
    }));
    const file = path.join(out, `${engine}-${theme}-${ground}.png`);
    await page.screenshot({ path: file });
    const png = readPng(file);
    for (const g of geo) rows.push({ engine: engine === "webkit" ? "webkit+shim" : engine, theme, ground, ...g, composite: mean3(region(png, g.sample.map(Math.round))) });
    await ctx.close();
  }
  await browser.close();
}
srv.close();
fs.writeFileSync(path.join(out, "probe.json"), JSON.stringify(rows, null, 1));
console.log("| engine | theme | ground | dock | composite | L | ΔE vs `mode` | ΔE vs `class` | plate backdrop-filter | border | `--dock-surface-blur` |");
console.log("|---|---|---|---|---|---:|---:|---:|---|---|---|");
for (const r of rows) {
  const at = (id) => rows.find((x) => x.engine === r.engine && x.theme === r.theme && x.ground === r.ground && x.id === id);
  console.log(`| ${r.engine} | ${r.theme} | ${r.ground} | ${r.id} | \`${hex(r.composite)}\` | ${lch(r.composite)[0].toFixed(3)} | ${dE(r.composite, at("mode").composite).toFixed(4)} | ${dE(r.composite, at("class").composite).toFixed(4)} | \`${r.bf}\` | \`${r.border}\` | \`${r.blurVar}\` |`);
}
