#!/usr/bin/env node
// MS-clamp.mjs · does 10.1.0's earned-ink clamp (the sampler, `--glass-backdrop-luma`, the knee 0.6) move the minor split's
// light veil off the bound in the demo, where the sampler is fed? Computed style only: this script never requests a canvas
// context (the library's own sampler does its own readback, as 10.1.0 ships it).
// Per engine and theme, it opens a demo route through the capture boot (`?capture=<route>&mode=<theme>`), motion ON so the
// field moves, and every --every ms for --ms reads:
//   the root's --glass-bound; every element carrying a non-zero --glass-backdrop-luma that is a plate (.dock-plate, or an
//   element whose computed --glass-veil-rung differs from its tier); per plate the registered --glass-veil-rung (the
//   CLAMPED α the plate paints) and the luma it read.
//   node MS-clamp.mjs <demo-dist> [--routes /dock/overview,/substrates/glass-material] [--engines chromium] [--ms 8000] [--every 500] [--out f.json]
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
const CHECKOUT = "/Users/mkbabb/Programming/glass-ui";
const { chromium, webkit } = await import(path.join(CHECKOUT, "node_modules/playwright/index.mjs"));
const { serve, CHROMIUM_ARGS, WEBKIT_SHIM } = await import(path.join(CHECKOUT, "docs/tranches/BL/design/material/harness/lib.mjs"));
const { values: a, positionals } = parseArgs({ allowPositionals: true, options: { routes: { type: "string" }, engines: { type: "string" }, ms: { type: "string" }, every: { type: "string" }, out: { type: "string" }, themes: { type: "string" } } });
const server = await serve(path.resolve(positionals[0]));
const routes = (a.routes || "/dock/overview,/substrates/glass-material").split(","), engines = (a.engines || "chromium").split(",");
const themes = (a.themes || "light,dark").split(","), ms = +(a.ms || 8000), every = +(a.every || 500);
const out = [];
for (const eng of engines) {
  const b = await (eng === "chromium" ? chromium : webkit).launch(eng === "chromium" ? { args: CHROMIUM_ARGS ?? [] } : {});
  for (const theme of themes) for (const route of routes) {
    const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1, colorScheme: theme, reducedMotion: "no-preference" });
    if (eng === "webkit") await ctx.addInitScript(`document.addEventListener("readystatechange", () => { if (!document.getElementById("hx-wk-shim")) { const s = document.createElement("style"); s.id = "hx-wk-shim"; s.textContent = ${JSON.stringify(WEBKIT_SHIM)}; (document.head || document.documentElement).appendChild(s); } });`);
    const page = await ctx.newPage(); let err = null;
    try { await page.goto(`${server.url}?capture=${route}&mode=${theme}`, { waitUntil: "load", timeout: 120000 }); await page.waitForSelector("html[data-capture-ready]", { timeout: 60000 }); }
    catch (e) { err = String(e).split("\n")[0].slice(0, 160); }
    const samples = [];
    if (!err) for (let t = 0; t <= ms; t += every) {
      samples.push(await page.evaluate(() => {
        const g = (el, p) => getComputedStyle(el).getPropertyValue(p).trim();
        const bound = +g(document.documentElement, "--glass-bound");
        const plates = [...document.querySelectorAll(".dock-plate, [class*='glass-wash'], [class*='glass-quiet'], [class*='glass-resting'], .glass-card, .glass-floating, .glass-overlay")];
        const rows = plates.map((el) => ({ el: (el.className || "").toString().split(" ").slice(0, 2).join("."), rung: +g(el, "--glass-veil-rung"), luma: +(g(el, "--glass-backdrop-luma") || 0) }));
        const fed = rows.filter((r) => r.luma > 0);
        return { bound, n: rows.length, fed: fed.length, maxLuma: Math.max(0, ...rows.map((r) => r.luma)), dock: rows.filter((r) => r.el.startsWith("dock-plate")).map((r) => [r.rung, r.luma]),
          offBound: rows.filter((r) => r.luma > 0).map((r) => r.rung) };
      }));
      await page.waitForTimeout(every);
    }
    const fedS = samples.filter((s) => s.fed > 0);
    const dockR = samples.flatMap((s) => s.dock.map((d) => d[0])), dockL = samples.flatMap((s) => s.dock.map((d) => d[1]));
    const rec = { eng, theme, route, err, bound: samples[0]?.bound, samples: samples.length, samplesFed: fedS.length, maxLuma: Math.max(0, ...samples.map((s) => s.maxLuma)),
      dockRung: dockR.length ? [Math.min(...dockR), Math.max(...dockR)] : null, dockLuma: dockL.length ? [Math.min(...dockL), Math.max(...dockL)] : null,
      fedRung: fedS.length ? [Math.min(...fedS.flatMap((s) => s.offBound)), Math.max(...fedS.flatMap((s) => s.offBound))] : null };
    out.push(rec); console.log(JSON.stringify(rec));
    await ctx.close();
  }
  await b.close();
}
server.close();
if (a.out) fs.writeFileSync(a.out, JSON.stringify(out, null, 1));
