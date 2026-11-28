// neck.mjs <port> <tag> [--engine chromium|webkit] [--widths 1440,390] [--designs a,b,svg]
// P-1: the neck, A and B, held at p = 0, 0.25, 0.5, 0.75, 1 on a flat and a striped ground,
// light and dark. "svg" is design A with the SVG goo filter planted on the dock root.
// Readings (see PROTOTYPE.md): 1 backdrop kept, 2 one surface, 3 the facing end at 4x.
import { createRequire } from "node:module";
import { writeFileSync, mkdirSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const { PNG } = require("pngjs");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [port, tag] = a;
const engine = val("--engine", "chromium");
const widths = val("--widths", "1440,390").split(",").map(Number);
const designs = val("--designs", "a,b,svg").split(",");
const OUT = new URL("../neck/", import.meta.url);
mkdirSync(OUT, { recursive: true });
const PS = [0, 0.25, 0.5, 0.75, 1];
const res = [];
const DPR = +val("--dpr", 1);
const lum = (img, x, y) => {
    x = Math.round(x * DPR); y = Math.round(y * DPR);
    if (x < 0 || y < 0 || x >= img.width || y >= img.height) return NaN;
    const i = (y * img.width + x) * 4;
    return [img.data[i], img.data[i + 1], img.data[i + 2]];
};
const L = (c) => 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
const std = (xs) => { const m = xs.reduce((s, v) => s + v, 0) / xs.length; return Math.sqrt(xs.reduce((s, v) => s + (v - m) ** 2, 0) / xs.length); };
let browser;
try {
    browser = await pw[engine].launch({ headless: true, args: engine === "chromium" ? ["--use-angle=metal", "--enable-gpu-rasterization"] : [] });
    for (const w of widths) for (const scheme of ["light", "dark"]) for (const ground of ["flat", "stripes"]) for (const design of designs) {
        const dpr = DPR;
        const ctx = await browser.newContext({ viewport: { width: w, height: 800 }, deviceScaleFactor: dpr, colorScheme: scheme });
        try {
            const page = await ctx.newPage();
            const neck = design === "b" ? "b" : "a";
            await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=w-std&neck=${neck}&ground=${ground}${scheme === "dark" ? "&scheme=dark" : ""}`);
            await page.waitForSelector("[data-testid=w-std]");
            await page.waitForTimeout(500);
            if (design === "svg") {
                await page.evaluate(() => {
                    const ns = "http://www.w3.org/2000/svg";
                    const svg = document.createElementNS(ns, "svg");
                    svg.setAttribute("width", "0"); svg.setAttribute("height", "0"); svg.style.position = "absolute";
                    svg.innerHTML = '<filter id="wi8-goo"><feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b"/><feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="g"/><feComposite in="SourceGraphic" in2="g" operator="atop"/></filter>';
                    document.body.appendChild(svg);
                    document.querySelector("[data-testid=w-std]").style.filter = "url(#wi8-goo)";
                });
            }
            const b = await page.locator("[data-testid=w-std] .dock-layer--summary").boundingBox();
            await page.mouse.move(b.x + b.width / 2 - 4, b.y + b.height / 2);
            await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 3 });
            await page.waitForTimeout(1200);
            await page.mouse.move(2, 790); // away, the linger keeps it open
            await page.waitForTimeout(400);
            for (const p of PS) {
                const geo = await page.evaluate((p) => {
                    const hold = Object.values(window.__dockHold || {})[0];
                    if (hold) hold(0.5 + p / 2);
                    const d = document.querySelector("[data-testid=w-std]");
                    const R = d.getBoundingClientRect();
                    const be = d.querySelector(".dock-beside");
                    const cs = getComputedStyle(be);
                    const gap = parseFloat(cs.paddingInlineStart) - parseFloat(cs.paddingInlineEnd);
                    const B = be.getBoundingClientRect();
                    const seatW = B.width - gap;
                    return { R: { l: R.left, t: R.top, r: R.right, b: R.bottom }, seatW, gap, open: d.classList.contains("expanded") };
                }, p);
                await page.waitForTimeout(120);
                const clip = { x: Math.max(0, Math.floor(geo.R.l - 40)), y: Math.max(0, Math.floor(geo.R.t - 40)), width: Math.ceil(geo.R.r - geo.R.l + 80), height: Math.ceil(geo.R.b - geo.R.t + 80) };
                const buf = await page.screenshot({ clip });
                const name = `neck.${tag}.${engine}.${w}.${scheme}.${ground}.${design}.p${p}.png`;
                writeFileSync(new URL(name, OUT), buf);
                const img = PNG.sync.read(buf);
                const ox = clip.x, oy = clip.y;
                const H = geo.R.b - geo.R.t;
                const seatL = geo.R.r - geo.seatW;
                const mainR = p > 0 ? seatL - geo.gap * p : geo.R.r;
                const row = geo.R.t + 8 - oy;
                // 1: backdrop kept: luminance spread inside the glass against the bare ground above it
                const xsMain = []; for (let x = geo.R.l + H / 2; x < mainR - 6; x++) xsMain.push(x - ox);
                const xsSeat = []; for (let x = seatL + 6; x < geo.R.r - H / 2 + 4; x++) xsSeat.push(x - ox);
                const inside = (xs) => std(xs.map((x) => L(lum(img, x, row))));
                const outside = std(xsMain.map((x) => L(lum(img, x, geo.R.t - 24 - oy))));
                const r1Main = inside(xsMain) / (outside || 1);
                const r1Seat = xsSeat.length > 2 ? inside(xsSeat) / (outside || 1) : null;
                // 2: one surface (flat): every glass pixel on the row against the main plate's centre
                const ref = lum(img, (geo.R.l + mainR) / 2 - ox, row);
                let dev = 0;
                for (let x = geo.R.l + H / 2; x < geo.R.r - H / 2; x++) {
                    if (p > 0 && x > mainR - H / 2 && x < seatL + H / 2) continue; // the gap and the facing corners
                    const c = lum(img, x - ox, row);
                    dev = Math.max(dev, Math.abs(c[0] - ref[0]), Math.abs(c[1] - ref[1]), Math.abs(c[2] - ref[2]));
                }
                // 2b: stripes: a junction column against the mean of its neighbours (3 px each side)
                let junction = null;
                if (p > 0 && p < 1) {
                    const cy = (geo.R.t + geo.R.b) / 2 - oy;
                    const col = (x) => L(lum(img, x - ox, cy));
                    junction = Math.max(...[mainR, seatL].map((x) => Math.abs(col(x) - (col(x - 3) + col(x + 3)) / 2)));
                }
                res.push({ engine, w, scheme, ground, design, p, open: geo.open, geo: { ...geo.R, seatW: geo.seatW, gap: geo.gap, mainR, seatL }, backdropRatioMain: +r1Main.toFixed(3), backdropRatioSeat: r1Seat == null ? null : +r1Seat.toFixed(3), flatMaxDev: +dev.toFixed(1), junction: junction == null ? null : +junction.toFixed(1), png: name });
                console.log(JSON.stringify(res[res.length - 1]));
            }
            // 3: the facing end at 4x, open rest: a separate capture at dpr 4
            if (ground === "flat") {
                await page.evaluate(() => { const hold = Object.values(window.__dockHold || {})[0]; if (hold) hold(1); });
                const g = await page.evaluate(() => { const d = document.querySelector("[data-testid=w-std]"); const R = d.getBoundingClientRect(); const be = d.querySelector(".dock-beside"); const B = be.getBoundingClientRect(); const cs = getComputedStyle(be); const gap = parseFloat(cs.paddingInlineStart) - parseFloat(cs.paddingInlineEnd); return { l: R.left, t: R.top, r: R.right, b: R.bottom, seatL: R.right - (B.width - gap), gap }; });
                const ctx4 = null; void ctx4;
                const cy = (g.t + g.b) / 2;
                const z = 4;
                const buf4 = await page.screenshot({ clip: { x: g.l - 4, y: cy - 2, width: g.r - g.l + 8, height: 4 }, scale: "device" });
                const img4 = PNG.sync.read(buf4);
                const mainR = g.seatL - g.gap;
                const prof = (x0, dir) => { const out = []; for (let k = 0; k < 8; k += 1 / DPR) out.push(L(lum(img4, x0 + dir * k - (g.l - 4), 2))); return out; };
                const outer = prof(g.l - 1, +1), facing = prof(mainR + 1, -1);
                const edgeDiff = Math.max(...outer.map((v, k) => Math.abs(v - facing[k])));
                res.push({ engine, w, scheme, ground, design, reading: "edge", edgeDiff: +edgeDiff.toFixed(1), outer: outer.map((v) => +v.toFixed(0)), facing: facing.map((v) => +v.toFixed(0)) });
                console.log(JSON.stringify(res[res.length - 1]));
            }
        } finally {
            await ctx.close();
        }
    }
} finally {
    if (browser) await browser.close();
    writeFileSync(new URL(`neck.${tag}.${engine}.json`, OUT), JSON.stringify(res, null, 1));
}
