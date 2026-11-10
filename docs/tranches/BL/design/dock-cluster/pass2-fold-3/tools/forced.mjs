// PASS-2 FOLD-3 forced-colors arm (Chromium only: WebKit has no forced-colors mode).
// For each composition, theme, width and state: the elements that paint a forced edge, the ring pseudo's
// background, and a pixel read of the outline: edge runs along the silhouette's middle row, and whether
// the top and bottom edges are present at each member's centre and at each cut.
// One browser per run, a new context per cell, both closed in finally.
// usage: node forced.mjs --site <site> --out <dir> --tag <tag>
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const NM = "/Users/mkbabb/Programming/glass-ui/node_modules";
const { chromium } = await import(pathToFileURL(path.join(NM, "playwright/index.mjs")).href);
const { PNG } = createRequire(path.join(NM, "_.cjs"))("pngjs");
const args = Object.fromEntries(process.argv.slice(2).reduce((a, k, i, arr) => (k.startsWith("--") ? [...a, [k.slice(2), arr[i + 1]]] : a), []));
const site = path.resolve(args.site), out = path.resolve(args.out), tag = args.tag ?? "f3";
fs.mkdirSync(path.join(out, "png"), { recursive: true });
fs.mkdirSync(path.join(out, "data"), { recursive: true });
const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
const server = http.createServer((req, res) => {
    let p = path.join(site, decodeURIComponent(new URL(req.url, "http://x").pathname));
    if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) p = path.join(site, "index.html");
    res.writeHead(200, { "content-type": MIME[path.extname(p)] ?? "application/octet-stream", "cache-control": "no-store" });
    fs.createReadStream(p).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;
const Lum = (d, i) => 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
const COMPS = [["after", {}], ["after-sitedock", { sitedock: "1" }], ["before", { nocluster: "1" }]];
const rec = { tag, started: new Date().toISOString(), cells: {} };
const browser = await chromium.launch({ headless: true });
try {
    rec.version = browser.version();
    for (const w of [1440, 390]) for (const [lab, extra] of COMPS) for (const theme of ["light", "dark"]) for (const state of ["collapsed", "expanded"]) {
        const ctx = await browser.newContext({ viewport: { width: w, height: 560 }, deviceScaleFactor: 2, colorScheme: theme, forcedColors: "active" });
        try {
            const page = await ctx.newPage();
            const errs = [];
            page.on("pageerror", (e) => errs.push(e.message));
            const q = new URLSearchParams({ mode: "flat", fused: "1", shape: "onedock", bind: "1", ...extra, ...(theme === "dark" ? { dark: "1" } : {}) });
            await page.goto(`${base}/?${q}`);
            await page.waitForFunction(() => window.__ab?.ready, null, { timeout: 15000 });
            await page.waitForTimeout(700);
            if (state === "expanded") { await page.evaluate(() => window.__ab.expand()); await page.waitForTimeout(1000); }
            const g = await page.evaluate(() => {
                const root = document.querySelector("[data-testid=cluster]");
                const canvas = (() => { const p = document.createElement("div"); p.style.color = "Canvas"; document.body.append(p); const c = getComputedStyle(p).color; p.remove(); return c; })();
                const edges = [];
                for (const e of [root, ...root.querySelectorAll("*")]) for (const pse of [null, "::before", "::after"]) {
                    const cs = getComputedStyle(e, pse);
                    if (pse && cs.content === "none") continue;
                    if (cs.visibility === "hidden" || cs.display === "none") continue;
                    const bw = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderRightWidth) + parseFloat(cs.borderBottomWidth) + parseFloat(cs.borderLeftWidth);
                    if (bw > 0 && cs.borderTopStyle !== "none" && cs.borderTopColor !== canvas && !/rgba\(0, 0, 0, 0\)/.test(cs.borderTopColor)) {
                        const r = e.getBoundingClientRect();
                        edges.push({ el: (e.className?.baseVal ?? e.className ?? e.tagName).toString().split(" ").slice(0, 2).join(".") + (pse ?? ""), color: cs.borderTopColor, radius: cs.borderTopLeftRadius, w: +r.width.toFixed(1), h: +r.height.toFixed(1) });
                    }
                }
                const ms = [...root.querySelectorAll(":scope > .glass-dock")].map((d) => { const r = d.getBoundingClientRect(); return { label: d.getAttribute("aria-label"), l: r.left, r: r.right, t: r.top, b: r.bottom }; });
                const ring = [...root.querySelectorAll(":scope > .glass-dock > .dock-plate")].map((p) => { const cs = getComputedStyle(p); const b = getComputedStyle(p, "::before"); return { vis: cs.visibility, ringBg: b.backgroundColor, ringFca: b.forcedColorAdjust, ringClip: b.clipPath.slice(0, 16) }; });
                return { canvas, edges, ms, ring, fused: window.__ab.fused(), expanded: window.__ab.expanded() };
            });
            const png = PNG.sync.read(await page.screenshot());
            const dsf = png.width / w;
            const px = (x, y) => Lum(png.data, (Math.round(y * dsf) * png.width + Math.round(x * dsf)) * 4);
            const field = px(Math.max(2, Math.min(...g.ms.map((m) => m.l)) - 14), (g.ms[0].t + g.ms[0].b) / 2);
            const TH = 60;
            // edge runs along the middle row, in device px, from 12 px left of the row to 12 px right
            const x0 = Math.min(...g.ms.map((m) => m.l)) - 12, x1 = Math.max(...g.ms.map((m) => m.r)) + 12;
            const ymid = (g.ms[0].t + g.ms[0].b) / 2;
            const runs = [];
            let inRun = false;
            for (let X = Math.round(x0 * dsf); X <= Math.round(x1 * dsf); X++) {
                const on = Math.abs(Lum(png.data, (Math.round(ymid * dsf) * png.width + X) * 4) - field) > TH;
                if (on && !inRun) runs.push(+(X / dsf).toFixed(1));
                inRun = on;
            }
            // top and bottom edge present at a column: any device px within ±4 px of the member's top / bottom past the threshold
            const edgeAt = (x, yEdge) => { for (let y = yEdge - 4; y <= yEdge + 4; y += 1 / dsf) if (Math.abs(px(x, y) - field) > TH) return true; return false; };
            const cols = g.ms.map((m) => ({ label: m.label, top: edgeAt((m.l + m.r) / 2, m.t), bottom: edgeAt((m.l + m.r) / 2, m.b) }));
            const cuts = g.ms.slice(1).map((m, i) => { const x = (g.ms[i].r + m.l) / 2; return { x: +x.toFixed(1), top: edgeAt(x, m.t), bottom: edgeAt(x, m.b) }; });
            const key = `${lab}-${theme}-${state}-${w}`;
            rec.cells[key] = { ...g, field: +field.toFixed(1), runs, nRuns: runs.length, cols, cuts, errs: errs.slice(0, 3) };
            console.log(`[forced/${tag}]`, key, "fused", g.fused, "| edges", g.edges.length, JSON.stringify(g.edges.map((e) => e.el)), "| runs", runs.length, JSON.stringify(runs), "| cols", JSON.stringify(cols.map((c) => [c.label, c.top, c.bottom])), "| cuts", JSON.stringify(cuts.map((c) => [c.x, c.top, c.bottom])), "| ring", JSON.stringify(g.ring.map((r) => [r.vis, r.ringBg, r.ringFca])));
            if (w === 1440) {
                const y0 = Math.max(0, Math.floor(Math.min(...g.ms.map((m) => m.t)) - 20));
                await page.screenshot({ path: path.join(out, "png", `chromium-${tag}-forced-${key}.png`), clip: { x: Math.max(0, Math.floor(x0 - 12)), y: y0, width: Math.ceil(x1 - x0 + 24), height: Math.ceil(Math.max(...g.ms.map((m) => m.b)) - y0 + 20) } });
            }
        } finally { await ctx.close(); }
    }
} finally {
    await browser.close();
    server.close();
    rec.ended = new Date().toISOString();
    fs.writeFileSync(path.join(out, "data", `chromium-${tag}-forced.json`), JSON.stringify(rec, null, 1));
}
