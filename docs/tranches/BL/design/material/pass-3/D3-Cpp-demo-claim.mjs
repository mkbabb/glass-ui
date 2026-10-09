#!/usr/bin/env node
// D3-Cpp-demo-claim.mjs · D3 pass 3, C″ prototype: the demo's claimed region (C-8, H3-10), read from computed style and
// attributes only (no canvas context requested). Opens the built demo's glass-material story per theme and engine and
// prints the claim element's stamp, its content bound against --glass-bound, and the publication it reads.
// Source of record for its readings: D3-Cpp-proto.md §3 (C-8).
//   node D3-Cpp-demo-claim.mjs <demo dist> [--engines chromium,webkit]
import path from "node:path";
const H = new URL("../harness/", import.meta.url).pathname;
const { serve, playwright, CHROMIUM_ARGS, VIEW, WEBKIT_SHIM } = await import(path.join(H, "lib.mjs"));
const dist = path.resolve(process.argv[2]);
const ei = process.argv.indexOf("--engines");
const engines = (ei > 0 ? process.argv[ei + 1] : "chromium,webkit").split(",");
const pw = await playwright(), srv = await serve(dist);
for (const engine of engines) {
  const browser = await pw[engine].launch({ headless: true, args: engine === "chromium" ? CHROMIUM_ARGS : [] });
  for (const theme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: VIEW, deviceScaleFactor: 1, colorScheme: theme, reducedMotion: "reduce" });
    // Playwright WebKit crashes on an unshimmed GlassDock mount (H-14): the same +shim init script glance.mjs adds.
    if (engine === "webkit") await ctx.addInitScript(`document.addEventListener("readystatechange", () => { if (!document.getElementById("hx-wk-shim")) { const s = document.createElement("style"); s.id = "hx-wk-shim"; s.textContent = ${JSON.stringify(WEBKIT_SHIM)}; (document.head || document.documentElement).appendChild(s); } });`);
    const page = await ctx.newPage(); const warns = [];
    page.on("console", (m) => { if (/glass-ui/.test(m.text())) warns.push(m.text().slice(0, 140)); });
    await page.goto(`${srv.url}?capture=/substrates/glass-material&mode=${theme}`, { waitUntil: "load", timeout: 120000 });
    await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), null, { timeout: 120000 }); await page.waitForTimeout(2500);
    const r = await page.evaluate(() => [...document.querySelectorAll("[data-glass-ground]")].map((e) => {
      const cs = getComputedStyle(e), g = (p) => cs.getPropertyValue(p).trim();
      return { ground: e.getAttribute("data-glass-ground"), state: e.getAttribute("data-glass-ground-state"), content: g("--glass-content-bound"), bound: g("--glass-bound"), live: g("--glass-field-live"), lo: g("--glass-field-lo"), hi: g("--glass-field-hi"), ceiling: g("--glass-field-ceiling") };
    }));
    console.log(`${engine} ${theme}: ${JSON.stringify(r)} · glass-ui warnings ${warns.length}`);
    await ctx.close();
  }
  await browser.close();
}
srv.close();
