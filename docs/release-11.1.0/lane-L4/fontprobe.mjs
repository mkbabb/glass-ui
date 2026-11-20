// Lane L4 browser witness for the file delivery (O-173 G2) and IBM Plex Sans (O-163).
// Serves <package-root> (a tree holding the built `dist/`) on a local port, loads a page
// that links `dist/styles/font-files.css` and sets text in each face, and reads: the
// sheet's status, bytes and data-URI count; the faces the page loaded; the woff2 requests
// and their statuses; `document.fonts.check` per face; the layout-shift sum (Chromium).
//   node fontprobe.mjs <chromium|webkit> <package-root> <out-dir> <label>
import { chromium, webkit } from "playwright";
import { createReadStream, existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import http from "node:http";
import { homedir } from "node:os";
import { extname, join, normalize } from "node:path";

const [engineName, root, outDir, label] = process.argv.slice(2);
mkdirSync(join(outDir, "png"), { recursive: true });
const WEBKIT_2287 = join(homedir(), "Library/Caches/ms-playwright/webkit-2287/pw_run.sh");

const PAGE = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="/dist/styles/font-files.css">
<style>body{margin:0;padding:24px 16px;background:#fbf7f0;color:#1d1813;font-size:18px;line-height:1.5}
p{margin:0 0 8px}.j4{font-family:"Plus Jakarta Sans";font-weight:400}.j6{font-family:"Plus Jakarta Sans";font-weight:600}
.f{font-family:"Fira Code";font-weight:400}.p4{font-family:"IBM Plex Sans";font-weight:400}.p5{font-family:"IBM Plex Sans";font-weight:500}
.pi{font-family:"IBM Plex Sans";font-style:italic}</style></head><body><div id="t">
<p class="j4">Plus Jakarta Sans 400 · Rough Ridge Lookout</p><p class="j6">Plus Jakarta Sans 600 · Mabry Mill</p>
<p class="f">Fira Code 14/15 -> 0x1f</p><p class="p4">IBM Plex Sans 400 · Cumberland Knob</p>
<p class="p5">IBM Plex Sans 500 · Linville Falls</p><p class="pi">IBM Plex Sans italic · Watauga County</p></div></body></html>`;

const types = { ".css": "text/css", ".woff2": "font/woff2", ".html": "text/html" };
const server = http.createServer((req, res) => {
    const u = new URL(req.url, "http://x");
    if (u.pathname === "/") {
        res.writeHead(200, { "content-type": "text/html" });
        res.end(PAGE);
        return;
    }
    const p = normalize(join(root, decodeURIComponent(u.pathname)));
    if (!p.startsWith(normalize(root)) || !existsSync(p) || !statSync(p).isFile()) {
        res.writeHead(404);
        res.end();
        return;
    }
    res.writeHead(200, { "content-type": types[extname(p)] ?? "application/octet-stream", "access-control-allow-origin": "*" });
    createReadStream(p).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const results = { engine: engineName, label, root, cells: [] };
const verdicts = [];
const browser = await (engineName === "webkit"
    ? webkit.launch(existsSync(WEBKIT_2287) ? { executablePath: WEBKIT_2287 } : {})
    : chromium.launch());
try {
    results.version = browser.version();
    for (const width of [390, 1440]) {
        const context = await browser.newContext({ viewport: { width, height: 800 }, deviceScaleFactor: 1 });
        try {
            const page = await context.newPage();
            await page.addInitScript(() => {
                window.__cls = 0;
                window.__clsSupported = (PerformanceObserver.supportedEntryTypes ?? []).includes("layout-shift");
                if (window.__clsSupported)
                    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: "layout-shift", buffered: true });
            });
            const requests = [];
            page.on("response", (r) => { if (r.url().endsWith(".woff2")) requests.push({ url: r.url().replace(base, ""), status: r.status() }); });
            await page.goto(`${base}/`, { waitUntil: "load" });
            await page.evaluate(() => document.fonts.ready);
            await page.waitForTimeout(800);
            const m = await page.evaluate(async () => {
                const res = await fetch("/dist/styles/font-files.css");
                const css = res.ok ? await res.text() : "";
                return {
                    sheet: { status: res.status, bytes: css.length, dataUris: (css.match(/url\(\s*["']?data:/g) ?? []).length },
                    faces: [...document.fonts].map((f) => ({ family: f.family.replace(/"/g, ""), style: f.style, weight: f.weight, status: f.status })),
                    check: {
                        jakarta400: document.fonts.check('400 16px "Plus Jakarta Sans"'),
                        jakarta600: document.fonts.check('600 16px "Plus Jakarta Sans"'),
                        fira: document.fonts.check('400 16px "Fira Code"'),
                        plex400: document.fonts.check('400 16px "IBM Plex Sans"'),
                        plexItalic: document.fonts.check('italic 400 16px "IBM Plex Sans"'),
                    },
                    cls: window.__clsSupported ? window.__cls : null,
                };
            });
            const box = await page.locator("#t").boundingBox();
            await page.screenshot({ path: join(outDir, "png", `${label}-${engineName}-fonts-${width}.png`), clip: box });
            const loaded = (family, style = "normal") => m.faces.some((f) => f.family === family && f.style === style && f.status === "loaded");
            const cell = { width, ...m, requests };
            results.cells.push(cell);
            const ok = (name, pass, detail) => verdicts.push({ cell: `${width} ${name}`, pass, detail });
            ok("O-173 G2 the sheet is served and carries 0 data URIs", m.sheet.status === 200 && m.sheet.dataUris === 0, m.sheet);
            ok("O-173 G2 Jakarta 400 and 600 and Fira Code load from files", loaded("Plus Jakarta Sans") && loaded("Fira Code") && m.check.jakarta400 && m.check.jakarta600 && m.check.fira, { check: m.check });
            ok("O-173 G2 every woff2 request is a file under /dist/fonts/ and answers 200", requests.length > 0 && requests.every((r) => r.status === 200 && r.url.startsWith("/dist/fonts/")), requests);
            ok("O-173 G2 layout shift <= 0.01", m.cls === null ? null : m.cls <= 0.01, { cls: m.cls });
            ok("O-163 IBM Plex Sans upright and italic load", loaded("IBM Plex Sans", "normal") && loaded("IBM Plex Sans", "italic"), m.faces.filter((f) => f.family === "IBM Plex Sans"));
        } finally {
            await context.close();
        }
    }
} finally {
    await browser.close();
    server.close();
}
results.verdicts = verdicts;
writeFileSync(join(outDir, `${label}-${engineName}-fonts.json`), JSON.stringify(results, null, 1));
for (const v of verdicts) console.log(`${v.pass === null ? "N/A " : v.pass ? "PASS" : "FAIL"} ${v.cell} ${JSON.stringify(v.detail).slice(0, 200)}`);
const failed = verdicts.filter((v) => v.pass === false).length;
console.log(`${label} ${engineName} fonts: ${verdicts.filter((v) => v.pass).length} pass, ${failed} fail`);
process.exitCode = failed ? 1 : 0;
