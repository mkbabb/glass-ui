import { chromium } from "playwright";
import fs from "node:fs";
import { PNG } from "pngjs";

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-DOTFLOW-REBUILD-rebuild-paint";
const ROUTE = "/substrates/dot-flow-field";
const results = {};

function census(pngPath) {
  const png = PNG.sync.read(fs.readFileSync(pngPath));
  const { width: W, height: H, data } = png;
  let sum = 0, sum2 = 0, n = 0, p = [];
  let warm = 0, teal = 0, colored = 0;
  const NB = 24;
  const cols = new Array(NB).fill(0), colN = new Array(NB).fill(0);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      const r = data[i], g = data[i+1], b = data[i+2];
      const lum = 0.2126*r + 0.7152*g + 0.0722*b;
      sum += lum; sum2 += lum*lum; n++; p.push(lum);
      const ci = Math.min(NB-1, Math.floor(x / (W/NB)));
      cols[ci] += lum; colN[ci]++;
      const mx = Math.max(r,g,b), mn = Math.min(r,g,b);
      if (mx - mn > 16) { colored++; if (r >= b) warm++; else teal++; }
    }
  }
  p.sort((a,b)=>a-b);
  const mean = sum/n, std = Math.sqrt(sum2/n - mean*mean);
  return {
    W, H, mean: +mean.toFixed(1), std: +std.toFixed(1),
    p01: p[Math.floor(n*0.01)], p50: p[Math.floor(n*0.5)], p99: p[Math.floor(n*0.99)],
    min: p[0], max: p[n-1],
    warmPct: colored? +(100*warm/colored).toFixed(0):0,
    tealPct: colored? +(100*teal/colored).toFixed(0):0,
    coloredPct: +(100*colored/n).toFixed(1),
    colProfile: cols.map((s,i)=>Math.round(s/colN[i])),
  };
}

function frameDiff(a, b) {
  const A = PNG.sync.read(fs.readFileSync(a)), B = PNG.sync.read(fs.readFileSync(b));
  if (A.width !== B.width || A.height !== B.height) return { err: "size-mismatch" };
  let d = 0, n = 0, changed = 0;
  for (let i = 0; i < A.data.length; i += 4) {
    const la = 0.2126*A.data[i]+0.7152*A.data[i+1]+0.0722*A.data[i+2];
    const lb = 0.2126*B.data[i]+0.7152*B.data[i+1]+0.0722*B.data[i+2];
    const dd = Math.abs(la-lb); d += dd; n++; if (dd > 8) changed++;
  }
  return { meanDiff: +(d/n).toFixed(2), changedPct: +(100*changed/n).toFixed(2) };
}

const browser = await chromium.connectOverCDP("http://localhost:9477");

for (const mode of ["light", "dark"]) {
  const context = await browser.newContext({ deviceScaleFactor: 2, colorScheme: mode, viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const url = `http://localhost:5200/?capture=${ROUTE}&mode=${mode}`;
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), null, { timeout: 30000 });
  await page.waitForTimeout(4000);

  await page.evaluate(() => {
    const main = document.querySelector("main.demo-main-scroller");
    const wrap = document.querySelector(".dot-flow-field-wrapper");
    if (main && wrap) {
      const wr = wrap.getBoundingClientRect();
      const mr = main.getBoundingClientRect();
      main.scrollTop += (wr.top - mr.top) - 90;
    }
  });
  await page.waitForTimeout(1800);

  const probe = await page.evaluate(() => {
    const cs = [...document.querySelectorAll("canvas")];
    const c = cs.find(x => x.parentElement?.className?.toString().includes("dot-flow-field")) || cs[1];
    if (!c) return { err: "no-canvas" };
    const r = c.getBoundingClientRect();
    let wgpu = false, gl2 = false;
    try { wgpu = !!c.getContext("webgpu"); } catch(e){}
    try { gl2 = !!c.getContext("webgl2"); } catch(e){}
    let renderer = null;
    try { const t = document.createElement("canvas"); const g = t.getContext("webgl2"); const d = g && g.getExtension("WEBGL_debug_renderer_info"); if (d) renderer = g.getParameter(d.UNMASKED_RENDERER_WEBGL); } catch(e){}
    return { w: c.width, h: c.height, bb: {x:r.x,y:r.y,w:r.width,h:r.height}, wgpu, gl2, renderer };
  });
  const bb = probe.bb;
  const clip = { x: Math.max(0, Math.round(bb.x)), y: Math.max(0, Math.round(bb.y)), width: Math.round(bb.w), height: Math.round(bb.h) };

  await page.mouse.move(50, 50);
  await page.waitForTimeout(400);
  const fA = `${OUT}/chrome-${mode}-canvas.png`;
  await page.screenshot({ path: fA, clip });

  await page.waitForTimeout(750);
  const fA2 = `${OUT}/chrome-${mode}-canvas-t2.png`;
  await page.screenshot({ path: fA2, clip });

  const cy = bb.y + bb.h/2;
  await page.mouse.move(bb.x + bb.w*0.25, cy, { steps: 8 });
  await page.waitForTimeout(350);
  const fP1 = `${OUT}/chrome-${mode}-canvas-ptr1.png`;
  await page.screenshot({ path: fP1, clip });
  await page.mouse.move(bb.x + bb.w*0.75, cy, { steps: 12 });
  await page.waitForTimeout(350);
  const fP2 = `${OUT}/chrome-${mode}-canvas-ptr2.png`;
  await page.screenshot({ path: fP2, clip });

  const full = `${OUT}/chrome-${mode}-full.png`;
  await page.screenshot({ path: full });

  const c = census(fA);
  const motion = frameDiff(fA, fA2);
  const ptrBend = frameDiff(fP1, fP2);
  results[mode] = { url, probe, census: c, motion, ptrBend, files: { fA, fA2, fP1, fP2, full } };
  console.log(`\n[${mode}] wgpu=${probe.wgpu} gl2=${probe.gl2} bb=`, JSON.stringify(bb));
  console.log(`[${mode}] renderer=${probe.renderer}`);
  console.log(`[${mode}] census=`, JSON.stringify(c));
  console.log(`[${mode}] motion(750ms,no-ptr)=`, JSON.stringify(motion), " ptrBend=", JSON.stringify(ptrBend));
  await context.close();
}

fs.writeFileSync(`${OUT}/chrome-results.json`, JSON.stringify(results, null, 2));
await browser.close();
console.log("\nDONE");
