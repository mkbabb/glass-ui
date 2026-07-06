// BG.W-FOURIER-BEAUTY FB3 (refined) — in-page rAF recorder (true frame alignment) + pixel-centroid follow.
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { inflateSync } from "node:zlib";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const OUT = new URL(".", import.meta.url).pathname + "BG.W-FOURIER-BEAUTY-paint/";
const BASE = "http://localhost:5200";
const ROUTE = "/substrates/fourier-field";

function decodeRGBA(buf) { let p = 8, w = 0, h = 0, bd = 0, ct = 0; const idat = []; while (p < buf.length) { const len = buf.readUInt32BE(p); const type = buf.toString("ascii", p + 4, p + 8); const data = buf.subarray(p + 8, p + 8 + len); if (type === "IHDR") { w = data.readUInt32BE(0); h = data.readUInt32BE(4); bd = data[8]; ct = data[9]; } else if (type === "IDAT") idat.push(data); else if (type === "IEND") break; p += 12 + len; } const ch = ct === 6 ? 4 : ct === 2 ? 3 : 1; const raw = inflateSync(Buffer.concat(idat)); const stride = w * ch; const out = Buffer.alloc(w * h * 4); const prev = Buffer.alloc(stride); let ri = 0; for (let y = 0; y < h; y++) { const f = raw[ri++]; const line = Buffer.alloc(stride); for (let x = 0; x < stride; x++) { const rb = raw[ri++]; const a = x >= ch ? line[x - ch] : 0; const b = prev[x]; const c = x >= ch ? prev[x - ch] : 0; let v; switch (f) { case 0: v = rb; break; case 1: v = rb + a; break; case 2: v = rb + b; break; case 3: v = rb + ((a + b) >> 1); break; case 4: { const pa = Math.abs(b - c), pb = Math.abs(a - c), pc = Math.abs(a + b - 2 * c); v = rb + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c); break; } default: v = rb; } line[x] = v & 0xff; } line.copy(prev); for (let x = 0; x < w; x++) { const s = x * ch, d = (y * w + x) * 4; out[d] = line[s]; out[d + 1] = ch >= 3 ? line[s + 1] : line[s]; out[d + 2] = ch >= 3 ? line[s + 2] : line[s]; out[d + 3] = ch === 4 ? line[s + 3] : 255; } } return { w, h, data: out }; }
const isRibbon = (r, g, b) => r > 120 && r - b > 25 && r - g > 8;
async function centroid(page, rect) { const buf = await page.screenshot({ clip: { x: rect.x, y: rect.y, width: rect.w, height: rect.h } }); const { w, h, data } = decodeRGBA(buf); let sx = 0, sy = 0, n = 0; for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const d = (y * w + x) * 4; if (isRibbon(data[d], data[d + 1], data[d + 2])) { sx += x; sy += y; n++; } } return n ? { cx: sx / n / w, cy: sy / n / h, n } : { cx: null, cy: null, n: 0 }; }
async function ready(page) { const t0 = Date.now(); while (Date.now() - t0 < 15000) { if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) return; await page.waitForTimeout(120); } }

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(`${BASE}/?capture=${encodeURIComponent(ROUTE)}&mode=dark`, { waitUntil: "load" });
await ready(page);
const rect = await page.evaluate(() => { const t = document.querySelector(".fourier-field-canvas"); t.scrollIntoView({ block: "center" }); const r = t.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
await page.waitForTimeout(1200);

// Install an in-page rAF recorder of --ff-head-xy with a pointer-marker channel.
await page.evaluate(() => {
    const f = document.querySelector(".fourier-field");
    window.__ffRec = []; window.__ffMark = "none"; window.__ffStop = false;
    const loop = () => { if (window.__ffStop) return; const v = getComputedStyle(f).getPropertyValue("--ff-head-xy").trim(); const p = v.split(/\s+/).map(Number); if (p.length === 2 && !p.some(isNaN)) window.__ffRec.push([performance.now(), p[0], p[1], window.__ffMark]); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
});
const cx = rect.x + rect.w / 2, cy = rect.y + rect.h / 2;
const R = Math.min(rect.w, rect.h) * 0.34;
// Phase A: autonomous baseline (no pointer over field) — move pointer far away first.
await page.mouse.move(50, 50); await page.evaluate(() => { window.__ffMark = "baseline"; });
await page.waitForTimeout(1400);
// Phase B: teleport pointer L -> R in one jump (mark the jump frame).
await page.mouse.move(cx - R, cy, { steps: 6 }); await page.evaluate(() => { window.__ffMark = "left"; });
await page.waitForTimeout(700);
await page.evaluate(() => { window.__ffMark = "JUMP"; });
await page.mouse.move(cx + R, cy); // discontinuous
await page.evaluate(() => { window.__ffMark = "right"; });
await page.waitForTimeout(900);
await page.evaluate(() => { window.__ffStop = true; });
const rec = await page.evaluate(() => window.__ffRec);

function maxDelta(rows) { let m = 0, at = -1; for (let i = 1; i < rows.length; i++) { const d = Math.hypot(rows[i][1] - rows[i - 1][1], rows[i][2] - rows[i - 1][2]); if (d > m) { m = d; at = i; } } return { m: +m.toFixed(4), at }; }
const base = rec.filter((r) => r[3] === "baseline");
const all = rec;
// find the frame index right at/after the JUMP mark
let jumpIdx = all.findIndex((r) => r[3] === "JUMP");
if (jumpIdx < 0) jumpIdx = all.findIndex((r) => r[3] === "right");
// per-frame delta AT the jump transition (jumpIdx-1 -> jumpIdx and a couple around)
const around = [];
for (let i = Math.max(1, jumpIdx - 1); i <= Math.min(all.length - 1, jumpIdx + 3); i++) around.push({ i, mark: all[i][3], d: +Math.hypot(all[i][1] - all[i - 1][1], all[i][2] - all[i - 1][2]).toFixed(4) });
console.log(JSON.stringify({ FB3_frames: { total: all.length, baselineFrames: base.length, baselineMaxDelta: maxDelta(base), allMaxDelta: maxDelta(all), jumpIdx, deltasAroundJump: around, meanFrameDtMs: +((all[all.length - 1][0] - all[0][0]) / (all.length - 1)).toFixed(1) } }));

// Follow via pixel centroid at waypoints (phase-robust: ribbon is a long arc).
await page.evaluate(() => { window.__ffStop = true; });
async function holdCentroid(px, py) { await page.mouse.move(px, py, { steps: 10 }); await page.waitForTimeout(900); // several frames to settle the critically-damped lean
    // average 3 screenshots to reduce trace-phase residue
    const cs = []; for (let k = 0; k < 3; k++) { cs.push(await centroid(page, rect)); await page.waitForTimeout(180); }
    const mean = (a) => a.reduce((s, v) => s + v, 0) / a.length; return { cx: +mean(cs.map(c => c.cx)).toFixed(4), cy: +mean(cs.map(c => c.cy)).toFixed(4), n: Math.round(mean(cs.map(c => c.n))) }; }
await page.mouse.move(50, 50); await page.waitForTimeout(700);
const cCenter = await holdCentroid(cx, cy);
const cRight = await holdCentroid(cx + R, cy);
const cLeft = await holdCentroid(cx - R, cy);
const cUp = await holdCentroid(cx, cy - R);
const cDown = await holdCentroid(cx, cy + R);
console.log(JSON.stringify({ FB3_centroidFollow: {
    center: cCenter, right: cRight, left: cLeft, up: cUp, down: cDown,
    dx_right: +(cRight.cx - cCenter.cx).toFixed(4), dx_left: +(cLeft.cx - cCenter.cx).toFixed(4),
    dy_up: +(cUp.cy - cCenter.cy).toFixed(4), dy_down: +(cDown.cy - cCenter.cy).toFixed(4),
    note: "dx_right>0 & dx_left<0 & dy_up<0 & dy_down>0 => figure leans toward pointer (screen coords)"
} }));
await page.close();
await browser.close();
