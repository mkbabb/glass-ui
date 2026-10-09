#!/usr/bin/env node
// D3-Cpp-proto-computed.mjs · the C″ prototype's computed-style probe (getComputedStyle and DOM attributes only; no
// canvas context is requested). Loads a C″ specimen build per scene, ground, theme, claim switch and engine, waits for the
// claim's spring to settle, and reads on <main>: the claim attribute and its stamped state, --glass-bound,
// --glass-content-bound, --glass-ground-e, the page tones, --glass-field-live; on every plate, the α it paints
// (--glass-veil-rung); and the console's warnings. Source of record for its readings: D3-Cpp-proto.md §3.
//   node D3-Cpp-proto-computed.mjs <dist> [--engines chromium,webkit] [--inject <css>] [--cells <regex>] [--out file.json]
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
const CHECKOUT = "/Users/mkbabb/Programming/glass-ui";
const { chromium, webkit } = await import(path.join(CHECKOUT, "node_modules/playwright/index.mjs"));
const { serve, WEBKIT_SHIM } = await import(path.join(CHECKOUT, "docs/tranches/BL/design/material/harness/lib.mjs"));
const { values: a, positionals } = parseArgs({ allowPositionals: true, options: { engines: { type: "string" }, out: { type: "string" }, inject: { type: "string" }, cells: { type: "string" }, settle: { type: "string" } } });
const server = await serve(positionals[0]);
const inject = a.inject ? fs.readFileSync(a.inject, "utf8") : "";
const cellRe = a.cells ? new RegExp(a.cells) : null;
const CELLS = [
  ...["black", "white", "paper", "aurora", "aurora50", "red", "deep", "stripes", "checker"].map((g) => ["ladder", g]),
  ["claim", "paper"], ["hostile", "aurora"], ["fieldout", "aurora"], ["fieldtwo", "aurora"], ["fieldgone", "aurora"], ["held", "black"],
];
const out = [];
for (const eng of (a.engines || "chromium,webkit").split(",")) {
  const b = await (eng === "chromium" ? chromium : webkit).launch(eng === "chromium" ? { args: ["--enable-unsafe-webgpu", "--ignore-gpu-blocklist", "--use-angle=metal"] } : {});
  for (const theme of ["light", "dark"]) for (const claim of ["honest", "none"]) for (const [scene, ground] of CELLS) {
    const id = `${eng} ${theme} ${claim} ${scene} ${ground}`;
    if (cellRe && !cellRe.test(id)) continue;
    const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
    if (eng === "webkit") await ctx.addInitScript(`document.addEventListener("readystatechange", () => { if (!document.getElementById("hx-wk-shim")) { const s = document.createElement("style"); s.id = "hx-wk-shim"; s.textContent = ${JSON.stringify(WEBKIT_SHIM)}; (document.head || document.documentElement).appendChild(s); } });`);
    const page = await ctx.newPage();
    const warns = [];
    page.on("console", (m) => { if (m.type() === "warning" || m.type() === "error") warns.push(m.text().slice(0, 160)); });
    await page.goto(`${server.url}index.html?scene=${scene}&ground=${ground}&theme=${theme}&claim=${claim}${scene === "held" ? "&nodock=1" : ""}`, { waitUntil: "load", timeout: 180000 });
    if (inject) await page.addStyleTag({ content: inject });
    await page.waitForTimeout(+(a.settle || (scene === "fieldgone" ? 2500 : 1200)));
    const r = await page.evaluate(() => {
      const g = (el, p) => getComputedStyle(el).getPropertyValue(p).trim();
      const m = document.querySelector("main");
      const n = (p) => +(+g(m, p)).toFixed(4);
      const rows = Object.fromEntries([...document.querySelectorAll("[data-spec]")].map((el) => [el.getAttribute("data-spec"), +(+g(el, "--glass-veil-rung")).toFixed(4)]));
      return { attr: m?.getAttribute("data-glass-ground"), state: m?.getAttribute("data-glass-ground-state"), bound: n("--glass-bound"), cb: n("--glass-content-bound"), ge: n("--glass-ground-e"), pageLo: g(m, "--glass-page-lo"), pageHi: g(m, "--glass-page-hi"), live: g(m, "--glass-field-live"), rows };
    });
    const rec = { eng, theme, claim, scene, ground, ...r, warns: warns.filter((w) => /glass-ui/.test(w)) };
    out.push(rec);
    console.log(`${id} · attr ${JSON.stringify(r.attr)} state ${r.state} bound ${r.bound} content ${r.cb} g ${r.ge} page ${r.pageLo}/${r.pageHi} live ${r.live} warns ${rec.warns.length} · ` + Object.entries(r.rows).map(([k, v]) => `${k} ${v}`).join(" "));
    await ctx.close();
  }
  await b.close();
}
server.close();
if (a.out) fs.writeFileSync(a.out, JSON.stringify(out, null, 1));
