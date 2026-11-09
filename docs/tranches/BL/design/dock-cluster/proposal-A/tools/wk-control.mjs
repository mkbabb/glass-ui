// wk-control.mjs --site <dir> --engine webkit|chromium --out <dir>: is the backdrop blur live at all in this engine?
// Four reads of stripe contrast through the glass: the cluster as built, the same plates with the cluster
// class removed (plain GlassDocks, no cluster CSS), a bare test div with backdrop-filter: blur(16px), and
// the plate's computed backdrop-filter.
import fs from "node:fs"; import path from "node:path"; import http from "node:http";
import { createRequire } from "node:module"; import { pathToFileURL } from "node:url";
const NM = "/Users/mkbabb/Programming/glass-ui/node_modules";
const pw = await import(pathToFileURL(path.join(NM, "playwright/index.mjs")).href);
const { PNG } = createRequire(path.join(NM, "_.cjs"))("pngjs");
const a = Object.fromEntries(process.argv.slice(2).reduce((x, k, i, arr) => (k.startsWith("--") ? [...x, [k.slice(2), arr[i + 1]]] : x), []));
const site = path.resolve(a.site), engine = a.engine, out = path.resolve(a.out);
const SHIM = ".glass-dock .dock-plate { border-color: var(--dock-plate-expanded-border) !important; }";
const srv = http.createServer((q, r) => { let p = path.join(site, new URL(q.url, "http://x").pathname); if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) p = path.join(site, "index.html"); r.writeHead(200, { "content-type": p.endsWith(".js") ? "text/javascript" : p.endsWith(".css") ? "text/css" : "text/html" }); fs.createReadStream(p).pipe(r); });
await new Promise((r) => srv.listen(0, "127.0.0.1", r));
const sd = (buf, x0, x1, y) => { const img = PNG.sync.read(buf); const v = []; for (let x = x0; x < x1; x++) { const i = (y * img.width + x) * 4; v.push(0.2126 * img.data[i] + 0.7152 * img.data[i + 1] + 0.0722 * img.data[i + 2]); } const m = v.reduce((p, q) => p + q, 0) / v.length; return +Math.sqrt(v.reduce((p, q) => p + (q - m) ** 2, 0) / v.length).toFixed(1); };
const res = { engine };
let b;
try {
  b = await pw[engine].launch({ headless: true });
  for (const variant of ["cluster", "no-cluster"]) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 560 }, deviceScaleFactor: 1 });
    try {
      const page = await ctx.newPage();
      if (engine === "webkit") await page.addInitScript((css) => { const add = () => { const s = document.createElement("style"); s.textContent = css; (document.head || document.documentElement).appendChild(s); }; document.documentElement ? add() : document.addEventListener("readystatechange", add, { once: true }); }, SHIM);
      await page.goto(`http://127.0.0.1:${srv.address().port}/?n=3&fused=0`);
      await page.waitForFunction(() => window.__cluster?.ready); await page.waitForTimeout(600);
      if (variant === "no-cluster") await page.evaluate(() => { const c = document.querySelector(".glass-dock-cluster"); c.classList.remove("glass-dock-cluster"); c.style.display = "flex"; c.style.gap = "8px"; c.style.justifyContent = "center"; });
      await page.evaluate(() => { const d = document.createElement("div"); d.id = "probe"; Object.assign(d.style, { position: "absolute", left: "40px", width: "160px", top: "calc(50% - 30px)", height: "40px", backdropFilter: "blur(16px)", webkitBackdropFilter: "blur(16px)", zIndex: 5 }); document.body.appendChild(d); });
      await page.waitForTimeout(300);
      const geo = await page.evaluate(() => { const p = document.querySelector(".glass-dock"); const r = p.getBoundingClientRect(); const pr = document.getElementById("probe").getBoundingClientRect(); const cs = getComputedStyle(p.querySelector(".dock-plate")); return { plate: [r.left, r.right, r.top], probe: [pr.left, pr.right, pr.top], bf: cs.backdropFilter || cs.webkitBackdropFilter, wbf: cs.webkitBackdropFilter, level: getComputedStyle(p).getPropertyValue("--glass-level"), blurTok: getComputedStyle(p).getPropertyValue("--dock-surface-blur") }; });
      const buf = await page.screenshot();
      fs.writeFileSync(path.join(out, `${engine}-control-${variant}.png`), buf);
      res[variant] = { ...geo, plateStripeSd: sd(buf, Math.round(geo.plate[0] + 14), Math.round(geo.plate[1] - 14), Math.round(geo.plate[2] + 4)), probeStripeSd: sd(buf, Math.round(geo.probe[0] + 10), Math.round(geo.probe[1] - 10), Math.round(geo.probe[2] + 20)), bareSd: sd(buf, 230, 400, Math.round(geo.probe[2] + 20)) };
    } finally { await ctx.close(); }
  }
} finally { if (b) await b.close(); srv.close(); fs.writeFileSync(path.join(out, `control-${engine}.json`), JSON.stringify(res, null, 1)); console.log(JSON.stringify(res)); }
