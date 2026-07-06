// BG.W-FOURIER-BEAUTY — Chrome/Metal binding analysis (the dual-engine viz truth lives here;
// WebKit off-screen WKWebView cannot snapshot a WebGPU canvas — a harness limit, DOTFLOW precedent).
// FB1 stroke cross-section >=2.5px CSS mid-body + taper (screenshot pixel scan)
// FB3 pointer figure-eight follow: tracks-within-bound + critically-damped + ZERO jumps (--ff-head-xy)
// B3 PRM: static full figure (reduced-motion → head does not sweep)
// FB2 the FOURIER_FIGURES catalogue reads beautiful (cycle source, screenshot each)
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { inflateSync } from "node:zlib";

const CDP = process.env.CDP_URL || "http://localhost:9333";
const OUT = new URL(".", import.meta.url).pathname + "BG.W-FOURIER-BEAUTY-paint/";
const BASE = "http://localhost:5200";
const ROUTE = "/substrates/fourier-field";

function decodeRGBA(buf) {
    let p = 8, w = 0, h = 0, bd = 0, ct = 0; const idat = [];
    while (p < buf.length) { const len = buf.readUInt32BE(p); const type = buf.toString("ascii", p + 4, p + 8); const data = buf.subarray(p + 8, p + 8 + len); if (type === "IHDR") { w = data.readUInt32BE(0); h = data.readUInt32BE(4); bd = data[8]; ct = data[9]; } else if (type === "IDAT") idat.push(data); else if (type === "IEND") break; p += 12 + len; }
    const ch = ct === 6 ? 4 : ct === 2 ? 3 : 1; const raw = inflateSync(Buffer.concat(idat)); const stride = w * ch; const out = Buffer.alloc(w * h * 4); const prev = Buffer.alloc(stride); let ri = 0;
    for (let y = 0; y < h; y++) { const f = raw[ri++]; const line = Buffer.alloc(stride); for (let x = 0; x < stride; x++) { const rb = raw[ri++]; const a = x >= ch ? line[x - ch] : 0; const b = prev[x]; const c = x >= ch ? prev[x - ch] : 0; let v; switch (f) { case 0: v = rb; break; case 1: v = rb + a; break; case 2: v = rb + b; break; case 3: v = rb + ((a + b) >> 1); break; case 4: { const pa = Math.abs(b - c), pb = Math.abs(a - c), pc = Math.abs(a + b - 2 * c); v = rb + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c); break; } default: v = rb; } line[x] = v & 0xff; } line.copy(prev); for (let x = 0; x < w; x++) { const s = x * ch, d = (y * w + x) * 4; out[d] = line[s]; out[d + 1] = ch >= 3 ? line[s + 1] : line[s]; out[d + 2] = ch >= 3 ? line[s + 2] : line[s]; out[d + 3] = ch === 4 ? line[s + 3] : 255; } }
    return { w, h, data: out };
}

async function ready(page) { const t0 = Date.now(); while (Date.now() - t0 < 15000) { if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) return; await page.waitForTimeout(120); } }
async function scrollIn(page) { return await page.evaluate(() => { const t = document.querySelector(".fourier-field-canvas"); t.scrollIntoView({ block: "center" }); const r = t.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; }); }
const headXY = (page) => page.evaluate(() => { const f = document.querySelector(".fourier-field"); const v = f ? getComputedStyle(f).getPropertyValue("--ff-head-xy").trim() : ""; const p = v.split(/\s+/).map(Number); return p.length === 2 && p.every((n) => !isNaN(n)) ? p : null; });

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());

// ── FB1 stroke + FB3 pointer follow (dark) ──
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(`${BASE}/?capture=${encodeURIComponent(ROUTE)}&mode=dark`, { waitUntil: "load" });
await ready(page);
const rect = await scrollIn(page);
await page.waitForTimeout(1200);

// FB1 — screenshot the field, scan for the warm-red ribbon, measure max run-length width of a mid-body cross-section.
const buf = await page.screenshot({ clip: { x: rect.x, y: rect.y, width: rect.w, height: rect.h } });
const { w, h, data } = decodeRGBA(buf);
// a "ribbon" pixel: warm-red/pink, notably above the field's dark/neutral background.
function isRibbon(r, g, b) { return r > 120 && r - b > 25 && r - g > 8; }
let ribbonPx = 0; const widths = [];
for (let y = 4; y < h - 4; y += 1) {
    let run = 0;
    for (let x = 0; x < w; x++) { const d = (y * w + x) * 4; if (isRibbon(data[d], data[d + 1], data[d + 2])) { run++; ribbonPx++; } else { if (run >= 2) widths.push(run); run = 0; } }
    if (run >= 2) widths.push(run);
}
widths.sort((a, b) => a - b);
const med = widths.length ? widths[Math.floor(widths.length / 2)] : 0;
const p25 = widths.length ? widths[Math.floor(widths.length * 0.25)] : 0;
const p75 = widths.length ? widths[Math.floor(widths.length * 0.75)] : 0;
const maxW = widths.length ? widths[widths.length - 1] : 0;
console.log(JSON.stringify({ FB1: { dpr: 1, ribbonPixels: ribbonPx, horizRunCount: widths.length, medianRunPx: med, p25, p75, maxRunPx: maxW, note: "horizontal run-lengths of ribbon pixels; a near-horizontal ribbon segment reads its true cross-section, a near-vertical reads wide — taper = spread p25<p75" } }));

// FB3 — pointer follow. Baseline: sample --ff-head-xy over a full period with NO pointer (autonomous trace).
async function meanHead(ms) { const t0 = Date.now(); const xs = [], ys = []; while (Date.now() - t0 < ms) { const p = await headXY(page); if (p) { xs.push(p[0]); ys.push(p[1]); } await page.waitForTimeout(16); } const mean = (a) => a.reduce((s, v) => s + v, 0) / a.length; return { mx: mean(xs), my: mean(ys), n: xs.length, spanX: Math.max(...xs) - Math.min(...xs), spanY: Math.max(...ys) - Math.min(...ys) }; }
// Move pointer to a viewport point, settle, then average head (lean+centroid) over a period.
async function holdAt(px, py, settleMs, avgMs) { await page.mouse.move(px, py, { steps: 8 }); await page.waitForTimeout(settleMs); return await meanHead(avgMs); }

const cx = rect.x + rect.w / 2, cy = rect.y + rect.h / 2;
const R = Math.min(rect.w, rect.h) * 0.32;
const center = await meanHead(650); // no pointer → centroid (approx)
const right = await holdAt(cx + R, cy, 500, 650);
const left = await holdAt(cx - R, cy, 500, 650);
const up = await holdAt(cx, cy - R, 500, 650);
const down = await holdAt(cx, cy + R, 500, 650);
// lean = mean(pos) - center. Follow correct if lean sign matches pointer offset direction.
const lean = (m) => ({ dx: +(m.mx - center.mx).toFixed(4), dy: +(m.my - center.my).toFixed(4) });
console.log(JSON.stringify({ FB3_follow: { centroid: { mx: +center.mx.toFixed(4), my: +center.my.toFixed(4), traceSpanX: +center.spanX.toFixed(3), traceSpanY: +center.spanY.toFixed(3) }, leanRight: lean(right), leanLeft: lean(left), leanUp: lean(up), leanDown: lean(down), reachBound: 0.7 } }));

// FB3 continuity + no-jump — DISCONTINUOUS pointer teleport must NOT teleport the head.
// Sample per-frame head while teleporting pointer far-left → far-right in one jump.
await page.mouse.move(cx - R, cy, { steps: 4 }); await page.waitForTimeout(400);
const series = [];
// prime a few frames
for (let i = 0; i < 6; i++) { const p = await headXY(page); if (p) series.push({ t: i, x: p[0], y: p[1], ptr: "L" }); await page.waitForTimeout(16); }
await page.mouse.move(cx + R, cy); // single discontinuous jump (no steps)
for (let i = 0; i < 40; i++) { const p = await headXY(page); if (p) series.push({ t: 6 + i, x: p[0], y: p[1], ptr: "R" }); await page.waitForTimeout(16); }
// max per-frame delta magnitude
let maxJump = 0, jumpAt = -1;
for (let i = 1; i < series.length; i++) { const d = Math.hypot(series[i].x - series[i - 1].x, series[i].y - series[i - 1].y); if (d > maxJump) { maxJump = d; jumpAt = i; } }
console.log(JSON.stringify({ FB3_nojump: { frames: series.length, maxPerFrameDeltaUnit: +maxJump.toFixed(4), atFrame: jumpAt, note: "autonomous trace ~<=0.03/frame; a headT=pointer snap on the teleport frame (frame 6) would spike >>0.1" } }));

await page.screenshot({ path: `${OUT}ff-chrome-dark-fieldcrop.png`, clip: { x: rect.x, y: rect.y, width: rect.w, height: rect.h } });
await page.close();

// ── B3 PRM static (dark) ── reduced-motion → the head should not sweep (static full figure).
const pg2 = await ctx.newPage();
await pg2.setViewportSize({ width: 1440, height: 900 });
await pg2.emulateMedia({ reducedMotion: "reduce" });
await pg2.goto(`${BASE}/?capture=${encodeURIComponent(ROUTE)}&mode=dark`, { waitUntil: "load" });
await ready(pg2);
await pg2.evaluate(() => document.querySelector(".fourier-field-canvas").scrollIntoView({ block: "center" }));
await pg2.waitForTimeout(1500);
const prmSpan = await (async () => { const xs = [], ys = []; const t0 = Date.now(); while (Date.now() - t0 < 800) { const p = await pg2.evaluate(() => { const f = document.querySelector(".fourier-field"); const v = f ? getComputedStyle(f).getPropertyValue("--ff-head-xy").trim() : ""; const q = v.split(/\s+/).map(Number); return q.length === 2 && q.every((n) => !isNaN(n)) ? q : null; }); if (p) { xs.push(p[0]); ys.push(p[1]); } await pg2.waitForTimeout(16); } return { n: xs.length, spanX: xs.length ? +(Math.max(...xs) - Math.min(...xs)).toFixed(4) : null, spanY: ys.length ? +(Math.max(...ys) - Math.min(...ys)).toFixed(4) : null }; })();
console.log(JSON.stringify({ B3_PRM: { ...prmSpan, note: "reduced-motion: head span ~0 = static full figure (no sweep)" } }));
await pg2.screenshot({ path: `${OUT}ff-chrome-dark-PRM-fieldcrop.png`, clip: await pg2.evaluate(() => { const r = document.querySelector(".fourier-field-canvas").getBoundingClientRect(); return { x: r.left, y: r.top, width: r.width, height: r.height }; }) });
await pg2.close();

await browser.close();
