// which elements paint an edge under forced colors (Chromium), cluster vs 11.0.0, collapsed and expanded
import path from "node:path"; import http from "node:http"; import fs from "node:fs"; import { pathToFileURL } from "node:url";
const NM = "/Users/mkbabb/Programming/glass-ui/node_modules";
const { chromium } = await import(pathToFileURL(path.join(NM, "playwright/index.mjs")).href);
const site = path.resolve(process.argv[2]); const out = path.resolve(process.argv[3]);
const server = http.createServer((q, s) => { let p = path.join(site, new URL(q.url, "http://x").pathname); if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) p = path.join(site, "index.html"); s.writeHead(200, { "content-type": p.endsWith(".js") ? "text/javascript" : p.endsWith(".css") ? "text/css" : "text/html" }); fs.createReadStream(p).pipe(s); });
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true });
const res = {};
try {
  for (const [lab, q] of [["after", ""], ["before", "&nocluster=1"]]) for (const st of ["collapsed", "expanded"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 560 }, deviceScaleFactor: 2, forcedColors: "active" });
    try {
      const page = await ctx.newPage();
      await page.goto(`${base}/?mode=flat&shape=onedock&bind=1&fused=1${q}`);
      await page.waitForFunction(() => window.__ab?.ready); await page.waitForTimeout(700);
      if (st === "expanded") { await page.evaluate(() => window.__ab.expand()); await page.waitForTimeout(900); }
      res[`${lab}-${st}`] = await page.evaluate(() => {
        const root = document.querySelector("[data-testid=cluster]");
        const rows = [];
        for (const e of [root, ...root.querySelectorAll("*")]) for (const pse of [null, "::before", "::after"]) {
          const cs = getComputedStyle(e, pse);
          if (pse && cs.content === "none") continue;
          const bw = ["Top", "Right", "Bottom", "Left"].map((s) => cs[`border${s}Width`]).join(" ");
          if (bw !== "0px 0px 0px 0px" && cs.borderTopStyle !== "none" && cs.visibility !== "hidden" && cs.display !== "none") {
            const r = e.getBoundingClientRect();
            rows.push({ el: (e.className?.baseVal ?? e.className ?? e.tagName).toString().slice(0, 50) + (pse ?? ""), bw, color: cs.borderTopColor, radius: cs.borderTopLeftRadius, clip: cs.clipPath.slice(0, 60), w: +r.width.toFixed(1), h: +r.height.toFixed(1) });
          }
        }
        return rows;
      });
      console.log(lab, st, JSON.stringify(res[`${lab}-${st}`]));
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); server.close(); fs.writeFileSync(path.join(out, "data", "chromium-forced-attr.json"), JSON.stringify(res, null, 1)); }
