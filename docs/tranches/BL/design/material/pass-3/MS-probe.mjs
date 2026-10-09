#!/usr/bin/env node
// MS-probe.mjs · the minor split's computed-style probe (computed style and getComputedStyle only; no canvas context is
// ever requested). Reads, per theme and engine, on a specimen build's ladder scene:
//   (a) :root  --glass-bound, --glass-veil-step, --card, --glass-veil-ink, --glass-backdrop-luma-knee
//   (b) every [data-spec] plate: --glass-veil-rung (registered <number>, so the CLAMPED α as computed), --glass-backdrop-luma,
//       background-color
//   (c) --clamp: the same, with --glass-backdrop-luma written on every plate at 0, 0.6, 0.8 and 1 (the sampler's range), so
//       the clamp's reach over the bound is read from the engine, not restated
//   node MS-probe.mjs <dist> [--engines chromium,webkit] [--clamp] [--ground paper] [--out file.json]
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
const CHECKOUT = "/Users/mkbabb/Programming/glass-ui";
const { chromium, webkit } = await import(path.join(CHECKOUT, "node_modules/playwright/index.mjs"));
const { serve, WEBKIT_SHIM } = await import(path.join(CHECKOUT, "docs/tranches/BL/design/material/harness/lib.mjs"));
const { values: a, positionals } = parseArgs({ allowPositionals: true, options: { engines: { type: "string" }, clamp: { type: "boolean" }, ground: { type: "string" }, out: { type: "string" } } });
const dist = positionals[0]; const server = await serve(dist);
const engines = (a.engines || "chromium,webkit").split(",");
const ground = a.ground || "paper";
const out = [];
for (const eng of engines) {
  const bt = eng === "chromium" ? chromium : webkit;
  const b = await bt.launch(eng === "chromium" ? { args: ["--force-color-profile=srgb"] } : {});
  for (const theme of ["light", "dark"]) {
    const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
    // Playwright WebKit mounts GlassDock only under D2's crash shim (H-14); every WebKit row here is +shim.
    if (eng === "webkit") await ctx.addInitScript(`document.addEventListener("readystatechange", () => { if (!document.getElementById("hx-wk-shim")) { const s = document.createElement("style"); s.id = "hx-wk-shim"; s.textContent = ${JSON.stringify(WEBKIT_SHIM)}; (document.head || document.documentElement).appendChild(s); } });`);
    const page = await ctx.newPage();
    await page.goto(`${server.url}index.html?scene=ladder&ground=${ground}&theme=${theme}`, { waitUntil: "load", timeout: 120000 });
    await page.waitForTimeout(1500);
    const lumas = a.clamp ? [null, 0, 0.6, 0.8, 1] : [null];
    for (const luma of lumas) {
      const r = await page.evaluate((luma) => {
        const R = getComputedStyle(document.documentElement), g = (s, p) => s.getPropertyValue(p).trim();
        const plates = [...document.querySelectorAll("[data-spec]")].filter((el) => !el.closest("[data-spec] [data-spec]") || true);
        if (luma !== null) for (const el of plates) { const t = el.matches(".glass-dock") ? el.querySelector(".dock-plate") : el; (t || el).style.setProperty("--glass-backdrop-luma", String(luma)); }
        const rows = plates.map((el) => { const t = el.matches(".glass-dock") ? (el.querySelector(".dock-plate") || el) : el; const s = getComputedStyle(t);
          return { spec: el.getAttribute("data-spec"), rung: g(s, "--glass-veil-rung"), luma: g(s, "--glass-backdrop-luma"), bg: s.backgroundColor }; });
        return { root: { bound: g(R, "--glass-bound"), step: g(R, "--glass-veil-step"), base: g(R, "--glass-veil-base"), card: g(R, "--card"), ink: g(R, "--glass-veil-ink"), knee: g(R, "--glass-backdrop-luma-knee") }, rows };
      }, luma);
      const rec = { eng, theme, ground, lumaWritten: luma, ...r };
      out.push(rec);
      console.log(`${eng} ${theme} luma=${luma ?? "as-mounted"} · bound ${r.root.bound} step ${r.root.step} base ${r.root.base} · ` + r.rows.map((x) => `${x.spec} ${x.rung}${x.luma && x.luma !== "0" ? "@" + x.luma : ""}`).join(" · "));
    }
    await ctx.close();
  }
  await b.close();
}
server.close();
if (a.out) fs.writeFileSync(a.out, JSON.stringify(out, null, 1));
