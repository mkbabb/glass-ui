#!/usr/bin/env node
// MS2-island.mjs · D3 pass 4, the minor split v2: one `.dark` island cell, read against HEAD (MS §1.1's unmeasured side
// effect). A light page (the specimen build's `empty` scene over paper) mounts a `.dark` element painted with the
// dark page, holding the five ladder plates, a `.control-surface` (the Select trigger's register) and a `.field-control`
// input (the Input's register). The same block is mounted once more on a fully dark page as the reference the island
// should match. Per plate: the computed rung (`--glass-veil-rest`) and the painted mean of its centre (screenshot only;
// no canvas context is requested).
//   node MS2-island.mjs <dist> --label head|minor2 [--engines chromium,webkit] [--out file.json]
// Playwright WebKit is not Safari: its rows are labelled "Playwright WebKit". Run under `guarded --exclusive webkit`.
import fs from "node:fs";
import path from "node:path";
import { holdWebkit } from "../../../driver/webkit-lock.mjs";
import { playwright, serve, readPng, region, mean3, hex, dE, lch, CHROMIUM_ARGS, VIEW, WEBKIT_SHIM, cli, list } from "../harness/lib.mjs";
import { PNG } from "../harness/lib.mjs";

const a = cli({ label: { type: "string" }, engines: { type: "string" }, out: { type: "string" } });
const dist = path.resolve(a._[0]);
const engines = list(a.engines, ["chromium", "webkit"]);
const PLATES = ["wash", "quiet", "resting", "floating", "overlay"];

const MOUNT = (island) => `(() => {
  const host = document.createElement("div");
  host.id = "ms2-island";
  ${island ? 'host.className = "dark";' : ""}
  host.style.cssText = "position:fixed;left:40px;top:40px;width:900px;padding:24px;display:flex;flex-wrap:wrap;gap:16px;z-index:9999;background:var(--background);color:var(--foreground)";
  for (const r of ${JSON.stringify(PLATES)}) {
    const p = document.createElement("div"); p.className = "glass-" + r; p.dataset.ms2 = r;
    p.style.cssText = "width:150px;height:80px;border-radius:16px;position:relative"; host.appendChild(p);
  }
  const t = document.createElement("div"); t.className = "control-surface"; t.dataset.ms2 = "trigger";
  t.style.cssText = "width:200px;height:40px;border-radius:999px"; host.appendChild(t);
  const i = document.createElement("input"); i.className = "field-control"; i.dataset.ms2 = "input"; i.value = "";
  i.style.cssText = "width:200px;height:40px;border-radius:999px"; host.appendChild(i);
  document.body.appendChild(host);
  return true;
})()`;

const READ = `(() => [...document.querySelectorAll("[data-ms2]")].map((el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
  return { id: el.dataset.ms2, box: [r.left, r.top, r.width, r.height], rest: cs.getPropertyValue("--glass-veil-rest").trim(),
    wash: cs.getPropertyValue("--glass-veil-wash").trim(), bg: cs.backgroundColor, img: cs.backgroundImage.slice(0, 160),
    surface: cs.getPropertyValue("--control-surface-bg").trim().slice(0, 120), scheme: cs.colorScheme }; }))()`;

const server = await serve(dist);
const out = { label: a.label, dist, when: new Date().toISOString(), rows: [] };
const pw = await playwright();
try {
  for (const engine of engines) {
    if (engine === "webkit") await holdWebkit();
    const browser = await pw[engine].launch({ headless: true, args: engine === "chromium" ? CHROMIUM_ARGS : [] });
    try {
      for (const [cell, theme, island] of [["island", "light", true], ["dark-page", "dark", false]]) {
        const ctx = await browser.newContext({ viewport: VIEW, deviceScaleFactor: 1, colorScheme: theme, reducedMotion: "reduce" });
        try {
          const page = await ctx.newPage();
          await page.goto(`${server.url}index.html?scene=empty&ground=paper&theme=${theme}${engine === "webkit" ? "&nodock=1" : ""}`, { waitUntil: "load", timeout: 120000 });
          if (engine === "webkit") await page.addStyleTag({ content: WEBKIT_SHIM });
          await page.evaluate(() => document.fonts.ready);
          await page.waitForTimeout(1500);
          await page.evaluate(MOUNT(island));
          await page.waitForTimeout(800);
          const els = await page.evaluate(READ);
          const png = PNG.sync.read(await page.screenshot({ type: "png" }));
          for (const e of els) {
            const [x, y, w, h] = e.box;
            const c = mean3(region(png, [Math.round(x + w * 0.3), Math.round(y + h * 0.3), Math.round(w * 0.4), Math.round(h * 0.4)]));
            const [L, C] = lch(c);
            out.rows.push({ engine: engine === "webkit" ? "Playwright WebKit" : "chromium", cell, id: e.id, hex: hex(c), L: +L.toFixed(4), C: +C.toFixed(4), rgb: c.map((v) => +v.toFixed(1)), rest: e.rest, washToken: e.wash, surface: e.surface, scheme: e.scheme });
          }
          const bgc = mean3(region(png, [48, 48, 8, 8]));
          out.rows.push({ engine: engine === "webkit" ? "Playwright WebKit" : "chromium", cell, id: "host-page", hex: hex(bgc), rgb: bgc.map((v) => +v.toFixed(1)) });
        } finally { await ctx.close().catch(() => {}); }
      }
    } finally { await browser.close().catch(() => {}); }
  }
} finally { server.close(); }
// The island against the dark page, per engine and element.
for (const r of out.rows.filter((x) => x.cell === "island")) {
  const ref = out.rows.find((x) => x.cell === "dark-page" && x.engine === r.engine && x.id === r.id);
  if (ref) r.dE_vs_darkPage = +dE(r.rgb, ref.rgb).toFixed(4);
}
const text = JSON.stringify(out, null, 1);
if (a.out) fs.writeFileSync(a.out, text);
for (const r of out.rows) console.log(`${a.label} ${r.engine} ${r.cell} ${r.id}: ${r.hex}${r.L != null ? ` L ${r.L} C ${r.C}` : ""}${r.rest ? ` rest ${r.rest}` : ""}${r.dE_vs_darkPage != null ? ` ΔE vs dark page ${r.dE_vs_darkPage}` : ""}`);
