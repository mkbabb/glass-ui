// Chrome refined probe — BG.W-BLOB-AFFECT-INTERACT.
//  (A) proper GPU-context count (webgpu-first suite: probe webgpu + webgl2 both)
//  (B) per-preset motion-character (ambient orbit-drift magnitude per preset — excited
//      should churn faster than calm/shy; a MOTION signal, not just hue)
//  (C) per-preset hue distinctness (mean RGB of the blob region per preset)
//  (D) click-deform settle/jitter — read frames out to ~1.2s and confirm the deform
//      DECAYS back toward ambient (a clean spring settle, not sustained oscillation)
import { chromium } from "playwright";
import { inflateSync } from "node:zlib";

function decodeRGBA(buf) {
    let p = 8, w = 0, h = 0, bd = 0, ct = 0; const idat = [];
    while (p < buf.length) { const len = buf.readUInt32BE(p); const type = buf.toString("ascii", p + 4, p + 8); const data = buf.subarray(p + 8, p + 8 + len); if (type === "IHDR") { w = data.readUInt32BE(0); h = data.readUInt32BE(4); bd = data[8]; ct = data[9]; } else if (type === "IDAT") idat.push(data); else if (type === "IEND") break; p += 12 + len; }
    const ch = ct === 6 ? 4 : ct === 2 ? 3 : 1; if (bd !== 8) throw new Error("bd" + bd);
    const raw = inflateSync(Buffer.concat(idat)); const stride = w * ch; const out = Buffer.alloc(w * h * 4); const prev = Buffer.alloc(stride); let ri = 0;
    for (let y = 0; y < h; y++) { const f = raw[ri++]; const line = Buffer.alloc(stride); for (let x = 0; x < stride; x++) { const rb = raw[ri++]; const a = x >= ch ? line[x - ch] : 0; const b = prev[x]; const c = x >= ch ? prev[x - ch] : 0; let v; switch (f) { case 0: v = rb; break; case 1: v = rb + a; break; case 2: v = rb + b; break; case 3: v = rb + ((a + b) >> 1); break; case 4: { const pa = Math.abs(b - c), pb = Math.abs(a - c), pc = Math.abs(a + b - 2 * c); v = rb + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c); break; } default: v = rb; } line[x] = v & 0xff; } line.copy(prev); for (let x = 0; x < w; x++) { const s = x * ch, d = (y * w + x) * 4; out[d] = line[s]; out[d + 1] = ch >= 3 ? line[s + 1] : line[s]; out[d + 2] = ch >= 3 ? line[s + 2] : line[s]; out[d + 3] = ch === 4 ? line[s + 3] : 255; } }
    return { w, h, data: out };
}
function meanAbsDelta(bufA, bufB) { const A = decodeRGBA(bufA), B = decodeRGBA(bufB); const w = Math.min(A.w, B.w), h = Math.min(A.h, B.h); let sum = 0, n = 0; const step = 5; for (let y = 0; y < h; y += step) for (let x = 0; x < w; x += step) { const dA = (y * A.w + x) * 4, dB = (y * B.w + x) * 4; const lA = 0.299 * A.data[dA] + 0.587 * A.data[dA + 1] + 0.114 * A.data[dA + 2]; const lB = 0.299 * B.data[dB] + 0.587 * B.data[dB + 1] + 0.114 * B.data[dB + 2]; sum += Math.abs(lA - lB); n++; } return +(sum / n).toFixed(3); }
// Mean RGB over the central disc of the blob region (ignore corners which are backdrop).
function meanRGBcentral(buf) { const { w, h, data } = decodeRGBA(buf); let r = 0, g = 0, b = 0, n = 0; const cx = w / 2, cy = h / 2, rad = Math.min(w, h) * 0.28, r2 = rad * rad; const step = 4; for (let y = 0; y < h; y += step) for (let x = 0; x < w; x += step) { const dx = x - cx, dy = y - cy; if (dx * dx + dy * dy > r2) continue; const d = (y * w + x) * 4; r += data[d]; g += data[d + 1]; b += data[d + 2]; n++; } return { r: Math.round(r / n), g: Math.round(g / n), b: Math.round(b / n), n }; }

const ROUTE = "/substrates/blob";
const CDP = process.env.CDP_URL || "http://localhost:9333";

async function pollReady(page) { const t0 = Date.now(); while (Date.now() - t0 < 15000) { if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) break; await page.waitForTimeout(150); } }

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(`http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=light`, { waitUntil: "load", timeout: 30000 });
await pollReady(page);

// (A) proper GPU context count — probe webgpu + webgl2 on every canvas.
const gpu = await page.evaluate(() => {
    const canvases = Array.from(document.querySelectorAll("canvas"));
    let webgpu = 0, webgl2 = 0, other = 0;
    for (const c of canvases) {
        let matched = false;
        for (const t of ["webgpu", "webgl2", "webgl"]) {
            try { const g = c.getContext(t); if (g) { if (t === "webgpu") webgpu++; else webgl2++; matched = true; break; } } catch { }
        }
        if (!matched) other++;
    }
    return { canvasCount: canvases.length, webgpu, webgl2, other, hasNavigatorGpu: !!navigator.gpu };
});

// Bring the hero into view.
await page.evaluate(() => document.querySelector(".goo-blob-wrapper")?.scrollIntoView({ block: "center" }));
await page.waitForTimeout(300);
const rect = await page.evaluate(() => { const w = document.querySelector(".goo-blob-wrapper"); if (!w) return null; const r = w.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height, cx: r.x + r.width / 2, cy: r.y + r.height / 2 }; });
const vw = 1440, vh = 900;
const cx0 = Math.max(0, Math.min(vw - 1, rect.x)), cy0 = Math.max(0, Math.min(vh - 1, rect.y));
const clip = { x: cx0, y: cy0, width: Math.max(1, Math.min(vw - cx0, rect.w)), height: Math.max(1, Math.min(vh - cy0, rect.h)) };
const shot = () => page.screenshot({ clip });

// (B)+(C) per-preset motion + hue. Click each preset tab, settle, then measure the
// ambient orbit-drift magnitude over ~200ms (motion character) + the central mean RGB (hue).
const presetTabs = await page.$$('[role="tab"]');
const presetInfo = [];
for (let i = 0; i < presetTabs.length; i++) {
    const label = await presetTabs[i].evaluate((el) => el.textContent.trim().split("\n")[0]);
    await presetTabs[i].click();
    await page.mouse.move(4, 4); // park pointer far away (measure AMBIENT, no lean)
    await page.waitForTimeout(900); // let the mood cross-fade + palette settle
    const f0 = await shot();
    await page.waitForTimeout(100); const f1 = await shot();
    await page.waitForTimeout(100); const f2 = await shot();
    const drift100 = meanAbsDelta(f0, f1), drift200 = meanAbsDelta(f0, f2);
    const rgb = meanRGBcentral(f0);
    presetInfo.push({ i, label, motionDrift100ms: drift100, motionDrift200ms: drift200, centralRGB: rgb });
}

// (D) click-deform settle/jitter on the ACTIVE preset — read the decay curve.
await page.mouse.move(rect.cx, rect.cy);
await page.waitForTimeout(500);
const preClick = await shot();
await page.mouse.down(); await page.mouse.up();
await page.waitForTimeout(50); const t50 = await shot();
await page.waitForTimeout(150); const t200 = await shot();
await page.waitForTimeout(300); const t500 = await shot();
await page.waitForTimeout(400); const t900 = await shot();
await page.waitForTimeout(400); const t1300 = await shot();
// park pointer, measure post-settle ambient for the baseline
await page.mouse.move(4, 4); await page.waitForTimeout(400);
const ambA = await shot(); await page.waitForTimeout(120); const ambB = await shot();
const settle = {
    ambientNow: meanAbsDelta(ambA, ambB),
    deform_pre_to_50ms: meanAbsDelta(preClick, t50),
    deform_pre_to_200ms: meanAbsDelta(preClick, t200),
    decay_200_to_500: meanAbsDelta(t200, t500),
    decay_500_to_900: meanAbsDelta(t500, t900),
    decay_900_to_1300: meanAbsDelta(t900, t1300),
};

console.log(JSON.stringify({ gpu, rect, presetInfo, settle }, null, 2));
await page.close();
await browser.close();
