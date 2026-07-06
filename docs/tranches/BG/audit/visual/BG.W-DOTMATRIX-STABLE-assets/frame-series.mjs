// BG.W-DOTMATRIX-STABLE — the binding NO-FLASH 60s frame-series (Chrome, live route).
// Navigates the LIVE /substrates/dot-matrix route (not ?capture=, so the globe animates +
// is interactive), scrolls the globe into view, waits out the sanctioned entrance bloom,
// then records a 60s per-frame mean-luminance series over the DotMatrix canvas region while
// a scripted pointer program runs: PARK -> SWEEP -> FLICK -> PARK -> WAKE(scroll off+back).
// Decodes each region screenshot with pngjs -> whole-region mean luminance (a whole-globe
// flash spikes the global mean; a LOCAL glow barely moves it). Also samples a cursor-local
// crop during FLICK to confirm the glow is local. Emits a JSON report + saves flick PNGs.
import { chromium } from "playwright";
import { PNG } from "pngjs";
import fs from "node:fs";

const CDP = "http://localhost:9333";
const MODE = process.argv[2] || "dark"; // light|dark
const OUT = new URL(".", import.meta.url).pathname;
const DUR_MS = 60000;

function meanLum(png, sx, sy, sw, sh) {
  // whole-region mean + cursor-local max-block mean; png is a PNG (RGBA)
  const { width, height, data } = png;
  sx = Math.max(0, Math.floor(sx)); sy = Math.max(0, Math.floor(sy));
  sw = Math.min(width - sx, Math.floor(sw)); sh = Math.min(height - sy, Math.floor(sh));
  let s = 0, n = 0;
  for (let y = sy; y < sy + sh; y++) {
    for (let x = sx; x < sx + sw; x++) {
      const i = (y * width + x) * 4;
      s += 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      n++;
    }
  }
  return n ? s / n : 0;
}

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:5200/substrates/dot-matrix", { waitUntil: "load", timeout: 30000 });

// set color scheme
await page.emulateMedia({ colorScheme: MODE });
await page.evaluate((m) => {
  document.documentElement.classList.toggle("dark", m === "dark");
}, MODE);

await page.waitForTimeout(1500);

// locate the DotMatrix canvas (the ~460px-tall one, not the full-viewport bg)
const globeSel = await page.evaluate(() => {
  const cs = Array.from(document.querySelectorAll("canvas"));
  const idx = cs.findIndex((c) => {
    const r = c.getBoundingClientRect();
    return Math.abs(r.height - 460) < 40 && r.width < 1300;
  });
  return idx;
});
if (globeSel < 0) { console.error("GLOBE_CANVAS_NOT_FOUND"); process.exit(2); }
const globe = page.locator("canvas").nth(globeSel);
await globe.scrollIntoViewIfNeeded();
await page.waitForTimeout(500);

// wait out the sanctioned cold-first-visible entrance bloom (fires once) + settle
await page.waitForTimeout(3500);

let box = await globe.boundingBox();
console.error("globe box:", JSON.stringify(box));
const cx = box.x + box.width / 2, cy = box.y + box.height / 2;

// park the pointer far away (top-left corner of viewport, off the canvas)
await page.mouse.move(5, 5);
await page.waitForTimeout(400);

const samples = [];
const t0 = Date.now();
let lastPointer = { x: 5, y: 5 };
let flickPeakSaved = 0;

async function sample(phase) {
  const b = await globe.boundingBox();
  if (!b) return;
  const buf = await page.screenshot({ clip: b });
  const png = PNG.sync.read(buf);
  const global = meanLum(png, 0, 0, png.width, png.height);
  // cursor-local crop (in canvas-region pixel space, dpr-scaled)
  const dpr = png.width / b.width;
  const lx = (lastPointer.x - b.x) * dpr, ly = (lastPointer.y - b.y) * dpr;
  const cropW = 160 * dpr, cropH = 160 * dpr;
  const local = meanLum(png, lx - cropW / 2, ly - cropH / 2, cropW, cropH);
  samples.push({ t: Date.now() - t0, phase, global: +global.toFixed(3), local: +local.toFixed(3) });
  return { png, buf, b, global, local };
}

// ─── PHASE PARK1 (0-14s): pointer parked off-canvas ───
while (Date.now() - t0 < 14000) {
  await sample("park1");
}

// ─── PHASE SWEEP (14-28s): slow sweep across the canvas ───
while (Date.now() - t0 < 28000) {
  const frac = ((Date.now() - t0 - 14000) / 14000);
  const x = box.x + 40 + (box.width - 80) * ((Math.sin(frac * Math.PI * 3) + 1) / 2);
  const y = box.y + box.height / 2 + Math.sin(frac * Math.PI * 5) * (box.height / 3);
  await page.mouse.move(x, y, { steps: 3 });
  lastPointer = { x, y };
  await sample("sweep");
}

// ─── PHASE FLICK (28-42s): fast flicks (the accel burst) ───
let flickI = 0;
while (Date.now() - t0 < 42000) {
  flickI++;
  // a flick: jump fast across the globe in few steps, then hold
  const ang = flickI * 1.7;
  const fx = box.x + box.width / 2 + Math.cos(ang) * box.width * 0.35;
  const fy = box.y + box.height / 2 + Math.sin(ang) * box.height * 0.35;
  await page.mouse.move(fx, fy, { steps: 2 }); // fast = few steps
  lastPointer = { x: fx, y: fy };
  const r = await sample("flick");
  // save a couple of flick-peak PNGs for the local-glow proof
  if (r && flickPeakSaved < 2 && r.local > r.global * 1.05) {
    fs.writeFileSync(`${OUT}flick-peak-${MODE}-${flickPeakSaved}.png`, r.buf);
    flickPeakSaved++;
  }
  // a few tight samples right after the flick to catch a same-frame spike
  await sample("flick");
  await sample("flick");
  await page.waitForTimeout(300);
}

// ─── PHASE PARK2 (42-50s): parked, the glow must decay to rest ───
await page.mouse.move(5, 5);
while (Date.now() - t0 < 50000) {
  await sample("park2");
}

// ─── PHASE WAKE-TEST (50-60s): scroll globe OFF (park loop) then BACK (wake) ───
// scroll to top so the globe leaves the viewport -> the offscreen-pause parks the loop
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await page.waitForTimeout(3000); // parked, offscreen
// scroll the globe back into view -> WAKE. sample densely to catch a clear/blackout flash.
await globe.scrollIntoViewIfNeeded();
const wakeStart = Date.now();
while (Date.now() - wakeStart < 6000 && Date.now() - t0 < 62000) {
  await sample("wake");
}

// ─── ANALYSIS ───
function phaseStats(name) {
  const rows = samples.filter((s) => s.phase === name);
  if (rows.length < 2) return { phase: name, count: rows.length };
  let maxDelta = 0, maxDeltaAt = 0;
  for (let i = 1; i < rows.length; i++) {
    const d = Math.abs(rows[i].global - rows[i - 1].global);
    if (d > maxDelta) { maxDelta = d; maxDeltaAt = rows[i].t; }
  }
  const gvals = rows.map((r) => r.global);
  return {
    phase: name, count: rows.length,
    globalMin: +Math.min(...gvals).toFixed(3),
    globalMax: +Math.max(...gvals).toFixed(3),
    maxConsecDelta: +maxDelta.toFixed(3),
    maxConsecDeltaAtMs: maxDeltaAt,
  };
}

// overall consecutive delta across the WHOLE series (wall-clock ordered)
let overallMaxDelta = 0, overallAt = 0, overallFrom = null, overallTo = null;
for (let i = 1; i < samples.length; i++) {
  const d = Math.abs(samples[i].global - samples[i - 1].global);
  if (d > overallMaxDelta) {
    overallMaxDelta = d; overallAt = samples[i].t;
    overallFrom = samples[i - 1]; overallTo = samples[i];
  }
}
// blackout check: any sample whose global luminance collapses far below the running median
const sortedG = [...samples.map((s) => s.global)].sort((a, b) => a - b);
const medianG = sortedG[Math.floor(sortedG.length / 2)];
const minG = sortedG[0];
const blackoutFrames = samples.filter((s) => s.global < Math.max(1, medianG * 0.35));

const report = {
  mode: MODE,
  totalSamples: samples.length,
  durationMs: Date.now() - t0,
  medianGlobalLum: +medianG.toFixed(3),
  minGlobalLum: +minG.toFixed(3),
  overall: {
    maxConsecDelta: +overallMaxDelta.toFixed(3),
    atMs: overallAt,
    from: overallFrom && { t: overallFrom.t, phase: overallFrom.phase, global: overallFrom.global },
    to: overallTo && { t: overallTo.t, phase: overallTo.phase, global: overallTo.global },
  },
  phases: ["park1", "sweep", "flick", "park2", "wake"].map(phaseStats),
  flickLocalGlow: (() => {
    const f = samples.filter((s) => s.phase === "flick");
    if (!f.length) return null;
    const localGtGlobal = f.filter((s) => s.local > s.global * 1.03).length;
    return { flickSamples: f.length, framesLocalBrighterThanGlobal: localGtGlobal };
  })(),
  blackoutFrameCount: blackoutFrames.length,
  blackoutSample: blackoutFrames[0] || null,
  samples,
};
fs.writeFileSync(`${OUT}frame-series-${MODE}.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify({ ...report, samples: `[${samples.length} samples in json]` }, null, 2));
await page.close();
await browser.close();
