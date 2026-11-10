// C6 paint witness: the expanded dock with its active seat, the round-1 cluster (seat blur stood down)
// against the same cluster with the seat's blur forced back, and 11.0.0's lone dock. Light and dark, 1440.
import fs from "node:fs"; import path from "node:path"; import http from "node:http"; import { createRequire } from "node:module"; import { pathToFileURL } from "node:url";
const NM = "/Users/mkbabb/Programming/glass-ui/node_modules";
const pw = await import(pathToFileURL(path.join(NM, "playwright/index.mjs")).href);
const { PNG } = createRequire(path.join(NM, "_.cjs"))("pngjs");
const [site, out, engine = "chromium"] = process.argv.slice(2).map((v, i) => (i < 2 ? path.resolve(v) : v));
const server = http.createServer((req, res) => { const u = new URL(req.url, "http://x"); let p = path.join(site, decodeURIComponent(u.pathname)); if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) p = path.join(site, "index.html"); res.writeHead(200, { "content-type": { ".js": "text/javascript", ".css": "text/css", ".html": "text/html" }[path.extname(p)] ?? "application/octet-stream" }); fs.createReadStream(p).pipe(res); });
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const browser = await pw[engine].launch({ headless: true });
const res = {};
try {
    for (const theme of ["light", "dark"]) for (const [label, q, css] of [["f1", "", ""], ["f1-seatblur", "", ".dock-cluster > .glass-dock .glass-capsule { backdrop-filter: var(--glass-blur-floating) !important; }"], ["v1100", "&nocluster=1", ""]]) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 560 }, deviceScaleFactor: 2, colorScheme: theme });
        try {
            const page = await ctx.newPage();
            await page.goto(`http://127.0.0.1:${server.address().port}/?shape=onedock&open=1&mode=design&fused=0${q}${theme === "dark" ? "&dark=1" : ""}`);
            await page.waitForFunction(() => window.__ab?.ready); await page.waitForTimeout(900);
            if (css) await page.addStyleTag({ content: css });
            await page.waitForTimeout(200);
            const b = await page.evaluate(() => { const s = [...document.querySelectorAll("[data-testid=cluster] .glass-capsule")][0]; const r = s.getBoundingClientRect(); const d = document.querySelector("[data-testid=cluster]").getBoundingClientRect(); return { seat: [r.left, r.top, r.width, r.height], dock: [d.left, d.top, d.width, d.height], bf: getComputedStyle(s).backdropFilter }; });
            const clip = { x: Math.floor(b.dock[0]) - 24, y: Math.floor(b.dock[1]) - 24, width: Math.ceil(b.dock[2]) + 48, height: Math.ceil(b.dock[3]) + 48 };
            const buf = await page.screenshot({ clip });
            fs.writeFileSync(path.join(out, "png", `${engine}-seat-${label}-${theme}.png`), buf);
            const png = PNG.sync.read(buf);
            // the seat's mean luminance and its sd, over its inner 60 %
            const vals = [];
            for (let y = b.seat[1] + b.seat[3] * 0.2; y < b.seat[1] + b.seat[3] * 0.8; y += 0.5) for (let x = b.seat[0] + b.seat[2] * 0.2; x < b.seat[0] + b.seat[2] * 0.8; x += 0.5) { const px = Math.floor((x - clip.x) * 2), py = Math.floor((y - clip.y) * 2); const i = (py * png.width + px) * 4; vals.push(0.2126 * png.data[i] + 0.7152 * png.data[i + 1] + 0.0722 * png.data[i + 2]); }
            const m = vals.reduce((a, v) => a + v, 0) / vals.length, sd = Math.sqrt(vals.reduce((a, v) => a + (v - m) ** 2, 0) / vals.length);
            res[`${label}-${theme}`] = { bf: b.bf, seatMeanL: +m.toFixed(1), seatSd: +sd.toFixed(2) };
        } finally { await ctx.close(); }
    }
} finally { await browser.close(); server.close(); }
fs.writeFileSync(path.join(out, "data", `${engine}-seat.json`), JSON.stringify(res, null, 1));
console.log(JSON.stringify(res));
