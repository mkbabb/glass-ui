#!/usr/bin/env node
// D3-Cpp-computed.mjs · the C″ spec's computed-style probe (getComputedStyle only; no canvas context is requested).
// Loads a specimen build's ladder under ?claim=honest with D3-Cpp-probe.css injected, per variant, ground, theme and
// engine, and reads on <main> and on every content and chrome plate: --glass-bound, --glass-content-bound and the
// registered rung --glass-veil-rung (the α the plate paints). Grounds: black and white (a bare stand claim: the
// floor v2 library has no tone function, so the claim carries no tones, which is the any-input claim C-2 names),
// aurora (a field claim, with or without the c1 publication literal), paper (a page claim).
//   node D3-Cpp-computed.mjs <dist> [--engines chromium,webkit] [--out file.json]
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
const CHECKOUT = "/Users/mkbabb/Programming/glass-ui";
const P3 = path.join(CHECKOUT, "docs/tranches/BL/design/material/pass-3");
const { chromium, webkit } = await import(path.join(CHECKOUT, "node_modules/playwright/index.mjs"));
const { serve, WEBKIT_SHIM } = await import(path.join(CHECKOUT, "docs/tranches/BL/design/material/harness/lib.mjs"));
const { values: a, positionals } = parseArgs({ allowPositionals: true, options: { engines: { type: "string" }, out: { type: "string" } } });
const server = await serve(positionals[0]);
const base = fs.readFileSync(path.join(P3, "D3-Cpp-probe.css"), "utf8");
const PUB = `[data-glass-ground="field"] { --glass-ground-lo: 0.4117; --glass-ground-hi: 0.7825; }`;
const VARIANTS = {
  "static+pub": base + PUB,
  "static+nopub": base,
  "strong+pub": base + PUB + `html:not(.dark) { --cpp-ink-l: 0.4096; }`,
  "reach+pub": base + PUB + `html:not(.dark) { --cpp-ink-l: 0.3061; }`,
};
const GROUNDS = ["black", "white", "aurora", "paper"];
const out = [];
for (const eng of (a.engines || "chromium,webkit").split(",")) {
  const b = await (eng === "chromium" ? chromium : webkit).launch();
  for (const theme of ["light", "dark"]) for (const [variant, css] of Object.entries(VARIANTS)) for (const ground of GROUNDS) {
    const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
    if (eng === "webkit") await ctx.addInitScript(`document.addEventListener("readystatechange", () => { if (!document.getElementById("hx-wk-shim")) { const s = document.createElement("style"); s.id = "hx-wk-shim"; s.textContent = ${JSON.stringify(WEBKIT_SHIM)}; (document.head || document.documentElement).appendChild(s); } });`);
    const page = await ctx.newPage();
    await page.goto(`${server.url}index.html?scene=ladder&ground=${ground}&theme=${theme}&claim=honest`, { waitUntil: "load", timeout: 180000 });
    await page.addStyleTag({ content: css });
    await page.waitForTimeout(800);
    const r = await page.evaluate(() => {
      const g = (el, p) => getComputedStyle(el).getPropertyValue(p).trim();
      const m = document.querySelector("main");
      const rows = [...document.querySelectorAll("[data-spec]")].filter((el) => !el.matches(".glass-dock")).map((el) => ({ spec: el.getAttribute("data-spec"), rung: g(el, "--glass-veil-rung") }));
      return { claim: m?.getAttribute("data-glass-ground"), bound: g(m, "--glass-bound"), cb: g(m, "--glass-content-bound"), ge: g(m, "--glass-ground-e"), rows };
    });
    out.push({ eng, theme, variant, ground, ...r });
    console.log(`${eng} ${theme} ${variant} ${ground} claim=${JSON.stringify(r.claim)} bound ${(+r.bound).toFixed(4)} content ${(+r.cb).toFixed(4)} g ${(+r.ge).toFixed(4)} · ` + r.rows.map((x) => `${x.spec} ${(+x.rung).toFixed(3)}`).join(" "));
    await ctx.close();
  }
  await b.close();
}
server.close();
if (a.out) fs.writeFileSync(a.out, JSON.stringify(out, null, 1));
