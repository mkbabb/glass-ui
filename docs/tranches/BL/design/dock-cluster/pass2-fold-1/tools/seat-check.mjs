// one-off: does the cluster's backdrop stand-down match the active seat, and what does it compute?
import fs from "node:fs"; import path from "node:path"; import http from "node:http"; import { pathToFileURL } from "node:url";
const NM = "/Users/mkbabb/Programming/glass-ui/node_modules";
const pw = await import(pathToFileURL(path.join(NM, "playwright/index.mjs")).href);
const site = path.resolve(process.argv[2]); const engine = process.argv[3] ?? "chromium";
const server = http.createServer((req, res) => { const u = new URL(req.url, "http://x"); let p = path.join(site, decodeURIComponent(u.pathname)); if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) p = path.join(site, "index.html"); res.writeHead(200, { "content-type": { ".js": "text/javascript", ".css": "text/css", ".html": "text/html" }[path.extname(p)] ?? "application/octet-stream" }); fs.createReadStream(p).pipe(res); });
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const browser = await pw[engine].launch({ headless: true });
try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 560 } });
    try {
        const page = await ctx.newPage();
        await page.goto(`http://127.0.0.1:${server.address().port}/?shape=onedock&open=1&mode=design`);
        await page.waitForFunction(() => window.__ab?.ready); await page.waitForTimeout(900);
        console.log(JSON.stringify(await page.evaluate(() => [...document.querySelectorAll("[data-testid=cluster] .glass-capsule")].map((b) => ({ cls: b.className, matches: b.matches(".dock-cluster > .glass-dock *"), bf: getComputedStyle(b).backdropFilter, wbf: getComputedStyle(b).webkitBackdropFilter, chain: (() => { const a = []; for (let e = b; e && a.length < 9; e = e.parentElement) a.push(e.className.toString().split(" ")[0]); return a; })() }))), null, 1));
    } finally { await ctx.close(); }
} finally { await browser.close(); server.close(); }
