#!/usr/bin/env node
// D3 pass 2 · C′ recalc probe (REGISTRY §7.3 C′ item 8: "recalc reported").
// Opens the specimen ladder over the c1 aurora and forces N style recalculations by stepping the scope's claimed tone
// (`--glass-ground-lo` / `-hi` on <main>, a property every plate's solve reads), reading one computed value per step so
// each step is a real recalc. Reports ms per recalc (performance.now around the forced read) and, in Chromium, the
// CDP `RecalcStyleDuration` delta. Run it on the base build (HEAD or the floor: the property is inert there, so the
// recalc is the cascade's own cost) and on the route build, same engine, same load band; the ratio is the datum.
//   node D3-Cp-recalc.mjs <dist> [--engine chromium|webkit] [--n 200] [--query claim=honest] [--ground aurora]
import path from "node:path";
import { parseArgs } from "node:util";
import os from "node:os";

const HARNESS = new URL("../harness/", import.meta.url).pathname;
const { serve, playwright, CHROMIUM_ARGS, WEBKIT_SHIM, VIEW } = await import(path.join(HARNESS, "lib.mjs"));
const { values: a, positionals } = parseArgs({ allowPositionals: true, options: {
  engine: { type: "string", default: "chromium" }, n: { type: "string", default: "200" }, query: { type: "string", default: "" }, ground: { type: "string", default: "aurora" } } });
const dist = path.resolve(positionals[0]);
const pw = await playwright(), srv = await serve(dist);
const browser = await pw[a.engine].launch({ headless: true, args: a.engine === "chromium" ? CHROMIUM_ARGS : [] });
const out = [];
for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: VIEW, deviceScaleFactor: 1, colorScheme: theme, reducedMotion: "reduce" });
  if (a.engine === "webkit") await ctx.addInitScript(`document.addEventListener("readystatechange", () => { if (!document.getElementById("hx-wk-shim")) { const s = document.createElement("style"); s.id = "hx-wk-shim"; s.textContent = ${JSON.stringify(WEBKIT_SHIM)}; (document.head || document.documentElement).appendChild(s); } });`);
  const page = await ctx.newPage();
  await page.goto(`${srv.url}index.html?scene=ladder&ground=${a.ground}&theme=${theme}${a.query ? "&" + a.query : ""}`, { waitUntil: "load", timeout: 120000 });
  await page.waitForTimeout(4000);
  const cdp = a.engine === "chromium" ? await ctx.newCDPSession(page) : null;
  if (cdp) await cdp.send("Performance.enable");
  const metric = async () => { if (!cdp) return null; const { metrics } = await cdp.send("Performance.getMetrics"); return metrics.find((m) => m.name === "RecalcStyleDuration")?.value ?? null; };
  const r0 = await metric();
  const t = await page.evaluate((n) => {
    const main = document.querySelector("main"), probe = document.querySelector('[data-spec="wash"] [data-ink="muted"]');
    const times = [];
    for (let i = 0; i < n; i++) {
      const v = (0.2 + 0.6 * ((i % 10) / 10)).toFixed(3);
      main.style.setProperty("--glass-ground-lo", v); main.style.setProperty("--glass-ground-hi", v);
      const t0 = performance.now(); getComputedStyle(probe).color; times.push(performance.now() - t0);
    }
    times.sort((x, y) => x - y);
    return { n, p50: times[Math.floor(n / 2)], p90: times[Math.floor(n * 0.9)], mean: times.reduce((s, x) => s + x, 0) / n, elements: document.querySelectorAll("*").length };
  }, +a.n);
  const r1 = await metric();
  out.push({ engine: a.engine, theme, ...t, cdpRecalcMsPerStep: r0 != null && r1 != null ? ((r1 - r0) * 1000) / t.n : null });
  await ctx.close();
}
await browser.close(); srv.close();
console.log(JSON.stringify({ dist, query: a.query, ground: a.ground, load: os.loadavg().map((v) => +v.toFixed(1)), rows: out }, null, 1));
