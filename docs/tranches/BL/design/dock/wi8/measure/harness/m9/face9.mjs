// face9.mjs <port> <tag> [--engine chromium|webkit]: MEASURE-9 part H, item H7 (RU-105, RU-112, RU-120). The one-glyph
// folded faces on the tip, at 1440 by 900 fine and 390 by 844 coarse, light, the pointer away:
//   - dock-comp's figure-tools (three faces), pill and chrome (flat ground), chrome waited out: its stage mounts open
//     (collapse="open") and folds on its idle window, so the read waits up to 15 s for the `collapsed` class and records
//     when it came; and dock-wi8's w-pill, w-card and w-rounded with the page's size classes off (m9/mkpage9.py);
//   - per folded dock: the face's box, its direct glyph's box against `--dock-control-glyph-size` (a probe in the same
//     dock), the face's inline padding, the folded plate's box and used corner. The box clause (RU-112): a one-glyph
//     face square within 0.5 px and its folded plate's two extents equal within 0.5 px;
//   - G-15 on chrome's folded glyph (RU-105): its colour, with the opacity of every ancestor, over the modal colour of a
//     2 px ring 2 px outside the glyph's box, against 3:1;
//   - every other folded face of the compositions listed with what it is (empty, composed, persistent seats, rests open).
// One browser, a context per cell, closed in finally. Log: logs/m9-face-<tag>.<engine>.json.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const [port, tag] = a;
const engine = a.includes("--engine") ? a[a.indexOf("--engine") + 1] : "chromium";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const out = { engine, rows: [] };
const CELLS = [
    ...["figure-tools", "pill", "chrome", "nav", "rail", "canvas-tools", "transport", "pager", "corner-controls", "action-row"].map((pg) => ({ name: pg, url: `?c=dock-comp&page=${pg}&ground=flat`, sel: "[data-story-stage] .glass-dock" })),
    ...["w-pill", "w-card", "w-rounded"].map((c) => ({ name: c, url: `?c=dock-wi8&cell=${c}`, sel: `[data-testid=${c}]` })),
];
const READ = async ({ sel, shot }) => {
    const bmp = shot ? await createImageBitmap(new Blob([Uint8Array.from(atob(shot), (c) => c.charCodeAt(0))], { type: "image/png" })) : null;
    let img = null;
    if (bmp) { const c = new OffscreenCanvas(bmp.width, bmp.height).getContext("2d", { willReadFrequently: true }); c.drawImage(bmp, 0, 0); img = c.getImageData(0, 0, bmp.width, bmp.height); }
    const lin = (v) => ((v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4); const L = (q) => 0.2126 * lin(q[0]) + 0.7152 * lin(q[1]) + 0.0722 * lin(q[2]);
    const oc = new OffscreenCanvas(1, 1).getContext("2d", { willReadFrequently: true });
    const rgba = (css) => { oc.clearRect(0, 0, 1, 1); oc.fillStyle = "#000"; oc.fillStyle = css; oc.fillRect(0, 0, 1, 1); const d = oc.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
    const ring = (r) => { const bins = new Map(); for (let y = Math.floor(r.top) - 4; y < Math.ceil(r.bottom) + 4; y++) for (let x = Math.floor(r.left) - 4; x < Math.ceil(r.right) + 4; x++) { const inner = x >= Math.floor(r.left) - 2 && x < Math.ceil(r.right) + 2 && y >= Math.floor(r.top) - 2 && y < Math.ceil(r.bottom) + 2; if (inner || !img || x < 0 || y < 0 || x >= img.width || y >= img.height) continue; const i = (y * img.width + x) * 4; const k = (img.data[i] >> 4) * 256 + (img.data[i + 1] >> 4) * 16 + (img.data[i + 2] >> 4); const b = bins.get(k) || [0, 0, 0, 0]; b[0] += img.data[i]; b[1] += img.data[i + 1]; b[2] += img.data[i + 2]; b[3]++; bins.set(k, b); } let best = null; for (const b of bins.values()) if (!best || b[3] > best[3]) best = b; return best ? [best[0] / best[3], best[1] / best[3], best[2] / best[3]] : null; };
    return [...document.querySelectorAll(sel)].map((d) => {
        const label = d.getAttribute("aria-label");
        const posture = d.classList.contains("collapsed") ? "folded" : d.classList.contains("expanded") ? "open" : "rest";
        const face = d.querySelector(".dock-layer--summary");
        const plate = d.querySelector(".dock-plate") ?? d;
        const pr = plate.getBoundingClientRect(); const pcs = getComputedStyle(plate);
        const used = Math.min(parseFloat(pcs.borderTopLeftRadius) || 0, pr.width / 2, pr.height / 2);
        const row = { label, posture, plate: [+pr.width.toFixed(2), +pr.height.toFixed(2)], plateCorner: pcs.borderTopLeftRadius.endsWith("%") ? pcs.borderTopLeftRadius : +used.toFixed(2) };
        if (!face || posture !== "folded") { row.face = face ? (face.children.length ? "present" : "empty") : "none"; return row; }
        const fr = face.getBoundingClientRect(); const fcs = getComputedStyle(face);
        const glyph = face.querySelector(":scope > :is(svg, img, picture)");
        const probe = document.createElement("span"); probe.style.cssText = "position:absolute;inline-size:var(--dock-control-glyph-size);block-size:1px;visibility:hidden"; face.appendChild(probe); const share = probe.getBoundingClientRect().width; probe.remove();
        row.face = { w: +fr.width.toFixed(2), h: +fr.height.toFixed(2), paddingInline: fcs.paddingLeft, kind: glyph ? (glyph.getAttribute("class")?.match(/\b(h-|w-|size-)\S+/) ? "glyph with a size class" : "glyph") : face.textContent.trim() ? "words" : face.children.length ? "composed" : "empty", children: [...face.children].map((c) => c.tagName.toLowerCase() + (c.className?.baseVal ?? c.className ? "." + String(c.className?.baseVal ?? c.className).split(" ")[0] : "")).slice(0, 3) };
        if (glyph) {
            const g = glyph.getBoundingClientRect();
            row.glyph = { w: +g.width.toFixed(2), h: +g.height.toFixed(2), share: +share.toFixed(2) };
            row.square = Math.abs(fr.width - fr.height) <= 0.5;
            row.plateSquare = Math.abs(pr.width - pr.height) <= 0.5;
            row.box = row.square && row.plateSquare ? "pass" : "FAIL";
            let op = 1; for (let e = glyph; e && e !== document.body; e = e.parentElement) op *= parseFloat(getComputedStyle(e).opacity);
            const c = rgba(getComputedStyle(glyph).color); const bg = ring(g);
            if (bg) { const al = c[3] * op; const mix = [0, 1, 2].map((i) => c[i] * al + bg[i] * (1 - al)); const x = L(mix), y = L(bg); row.ink = { cr: +((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)).toFixed(2), need: 3, op: +op.toFixed(3) }; }
        }
        return row;
    });
};
let browser;
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    for (const coarse of [false, true]) for (const c of CELLS) {
        const ctx = await browser.newContext({ viewport: coarse ? { width: 390, height: 844 } : { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: "light", ...(coarse ? (engine === "chromium" ? { hasTouch: true, isMobile: true } : { hasTouch: true }) : {}) });
        try {
            const page = await ctx.newPage();
            await page.goto(`http://127.0.0.1:${port}/${c.url}`);
            await page.waitForSelector(c.sel, { timeout: 60000 });
            await page.mouse.move(2, 2).catch(() => {});
            const t0 = Date.now();
            await sleep(1500);
            let waited = null;
            if (c.name === "chrome") {
                while (Date.now() - t0 < 15000) { if (await page.evaluate((s) => document.querySelector(s)?.classList.contains("collapsed"), c.sel)) { waited = Date.now() - t0; break; } await sleep(250); }
                await sleep(800);
            }
            const shot = (await page.screenshot({ type: "png" })).toString("base64");
            const rows = await page.evaluate(READ, { sel: c.sel, shot });
            for (const r of rows) out.rows.push({ cell: c.name, width: coarse ? 390 : 1440, ...(c.name === "chrome" ? { foldedAfterMs: waited } : {}), ...r });
            console.log(c.name, coarse ? 390 : 1440, JSON.stringify(rows.map((r) => [r.label, r.posture, r.face?.kind ?? r.face, r.face?.w, r.face?.h, r.glyph?.w, r.glyph?.share, r.plate, r.box, r.ink?.cr])));
        } catch (e) {
            out.rows.push({ cell: c.name, width: coarse ? 390 : 1440, error: String(e).slice(0, 200) });
        } finally {
            await ctx.close();
        }
    }
} finally {
    if (browser) await browser.close();
    writeFileSync(new URL(`../../logs/m9-face-${tag}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
}
