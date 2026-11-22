// nofill9.mjs <port> <tag> [--engine chromium|webkit]: MEASURE-9 part H, item H5 (RU-97 as amended for C8-M6). The seats
// the eighth pass read with no fill, and the loose control, each read on its page (?c=dock-comp&page=...&ground=flat),
// both schemes: rail's current Regions, canvas-tools's Grid (current) and Draw (pressed), and the loose row's current
// Layers and resting Grid. Per seat: its computed background-color and background-image, the dock's hover and current
// tokens as computed at the seat, and the twin shot's fill (the seat's direct glyph `visibility: hidden`, the modal colour
// of its content box) against its ring; the twin crop of the seat saved (crops-m9/nofill9/). Run on the tip and on
// v11.0.2's build (`base`), so a fill that went missing is told from one never there. One browser, a context per page.
import { createRequire } from "node:module";
import { writeFileSync, mkdirSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const [port, tag] = a;
const engine = a.includes("--engine") ? a[a.indexOf("--engine") + 1] : "chromium";
const dir = new URL(`../../crops-m9/nofill9/`, import.meta.url);
mkdirSync(dir, { recursive: true });
const CELLS = [["rail", ["Regions"]], ["canvas-tools", ["Grid", "Draw"]], ["loose", ["Layers", "Grid"]]];
const out = { engine, tag, cells: [] };
let browser;
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "chromium" ? { args: ["--use-angle=metal", "--enable-gpu-rasterization"] } : { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` }) });
    for (const [page, seats] of CELLS) for (const scheme of ["light", "dark"]) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: scheme });
        try {
            const p = await ctx.newPage();
            await p.goto(`http://127.0.0.1:${port}/?c=dock-comp&page=${page}&ground=flat${scheme === "dark" ? "&scheme=dark" : ""}`);
            await p.waitForSelector(page === "loose" ? "[data-testid=loose-row]" : "[data-story-stage] .glass-dock", { timeout: 60000 });
            await p.waitForTimeout(2500);
            // open every dock of the page by hover, then a press on its folded face if it did not open
            const n = await p.evaluate(() => document.querySelectorAll("[data-story-stage] .glass-dock").length);
            for (let k = 0; k < n; k++) {
                const b = await p.evaluate((k) => { const d = document.querySelectorAll("[data-story-stage] .glass-dock")[k]; const r = d.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2, open: d.classList.contains("expanded") }; }, k);
                if (!b.open) { await p.mouse.move(b.x - 6, b.y); await p.mouse.move(b.x, b.y, { steps: 3 }); await p.waitForTimeout(900); }
                const open = await p.evaluate((k) => document.querySelectorAll("[data-story-stage] .glass-dock")[k].classList.contains("expanded"), k);
                if (!open) { const f = await p.evaluate((k) => { const s = document.querySelectorAll("[data-story-stage] .glass-dock")[k].querySelector(".dock-layer--summary"); const r = s?.getBoundingClientRect(); return r && r.width > 2 ? { x: r.x + r.width / 2, y: r.y + r.height / 2 } : null; }, k); if (f) { await p.mouse.click(f.x, f.y); await p.waitForTimeout(900); } }
            }
            await p.mouse.move(2, 2);
            await p.waitForTimeout(500);
            for (const name of seats) {
                const sel = `[data-story-stage] [aria-label="${name}"]`;
                const info = await p.evaluate((sel) => {
                    const e = [...document.querySelectorAll(sel)].find((x) => x.checkVisibility());
                    if (!e) return null;
                    const cs = getComputedStyle(e);
                    const probe = (v) => { const s = document.createElement("span"); s.style.background = v; e.parentElement.appendChild(s); const c = getComputedStyle(s).backgroundColor; s.remove(); return c; };
                    for (const g of e.querySelectorAll(":scope > :is(svg, img, picture)")) g.style.visibility = "hidden";
                    e.setAttribute("data-nofill9", "");
                    const r = e.getBoundingClientRect(); const n = (k) => parseFloat(cs[k]) || 0;
                    return { inDock: !!e.closest(".glass-dock"), current: e.getAttribute("aria-current"), pressed: e.getAttribute("aria-pressed"), backgroundColor: cs.backgroundColor, backgroundImage: cs.backgroundImage.slice(0, 120), backgroundClip: cs.backgroundClip, hoverToken: probe("var(--dock-control-hover-bg)"), currentToken: probe("var(--dock-control-active-bg)"),
                        box: [r.left, r.top, r.width, r.height], content: [r.left + n("borderLeftWidth") + n("paddingLeft"), r.top + n("borderTopWidth") + n("paddingTop"), r.right - n("borderRightWidth") - n("paddingRight"), r.bottom - n("borderBottomWidth") - n("paddingBottom")] };
                }, sel);
                if (!info) { out.cells.push({ page, scheme, seat: name, missing: true }); continue; }
                await p.waitForTimeout(60);
                const [x, y, w, h] = info.box;
                const shot = await p.screenshot({ clip: { x: x - 6, y: y - 6, width: w + 12, height: h + 12 }, path: new URL(`${tag}.${engine}.${page}.${scheme}.${name}.png`, dir).pathname });
                const px = await p.evaluate(async ({ b64, info }) => {
                    const bmp = await createImageBitmap(new Blob([Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))], { type: "image/png" }));
                    const c = new OffscreenCanvas(bmp.width, bmp.height).getContext("2d", { willReadFrequently: true }); c.drawImage(bmp, 0, 0);
                    const img = c.getImageData(0, 0, bmp.width, bmp.height);
                    const [bx, by] = info.box; const ox = bx - 6, oy = by - 6;
                    const mode = (keep) => { const bins = new Map(); for (let yy = 0; yy < img.height; yy++) for (let xx = 0; xx < img.width; xx++) { if (!keep(xx + ox, yy + oy)) continue; const i = (yy * img.width + xx) * 4; const k = (img.data[i] >> 4) * 256 + (img.data[i + 1] >> 4) * 16 + (img.data[i + 2] >> 4); const b = bins.get(k) || [0, 0, 0, 0]; b[0] += img.data[i]; b[1] += img.data[i + 1]; b[2] += img.data[i + 2]; b[3]++; bins.set(k, b); } let best = null; for (const b of bins.values()) if (!best || b[3] > best[3]) best = b; return best ? [best[0] / best[3], best[1] / best[3], best[2] / best[3]].map(Math.round) : null; };
                    const [l, t, r, bt] = info.content; const [x0, y0, w0, h0] = info.box;
                    const fill = mode((x, y) => x >= l && x < r && y >= t && y < bt);
                    const ring = mode((x, y) => (x < x0 - 1 || x >= x0 + w0 + 1 || y < y0 - 1 || y >= y0 + h0 + 1));
                    const lin = (v) => ((v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4); const L = (q) => 0.2126 * lin(q[0]) + 0.7152 * lin(q[1]) + 0.0722 * lin(q[2]);
                    return { fill, ring, fillVsRing: fill && ring ? +((Math.max(L(fill), L(ring)) + 0.05) / (Math.min(L(fill), L(ring)) + 0.05)).toFixed(3) : null };
                }, { b64: shot.toString("base64"), info });
                await p.evaluate(() => { for (const e of document.querySelectorAll("[data-nofill9]")) { for (const g of e.querySelectorAll(":scope > :is(svg, img, picture)")) g.style.removeProperty("visibility"); e.removeAttribute("data-nofill9"); } });
                out.cells.push({ page, scheme, seat: name, ...info, ...px });
                console.log(page, scheme, name, info.backgroundColor, px.fillVsRing);
            }
        } finally {
            await ctx.close();
        }
    }
} finally {
    if (browser) await browser.close();
    writeFileSync(new URL(`../../logs/m9-nofill.${tag}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
}
