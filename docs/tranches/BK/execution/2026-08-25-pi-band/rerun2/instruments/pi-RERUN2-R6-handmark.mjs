/**
 * CELL 2 — π-RERUN2-R6, per-mount scroll-into-view capture.
 * Screenshot + getComputedStyle only. getContext() NEVER called.
 * >=600ms settle after every scroll. dpr-scale before cropping.
 */
import { chromium } from "playwright";
import { PNG } from "pngjs";
import fs from "node:fs";
import { oklabFromRgb } from "/Users/mkbabb/Programming/glass-ui/scripts/lib/paint-arm.mjs";

const BASE = "http://localhost:5433";
const BANK = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BK/execution/2026-08-25-pi-band/rerun2";
const ROUTE = "/motion/handmark";

const MOUNTS = [
  { key: "paysin", idx: 0 }, { key: "Friday", idx: 3 }, { key: "threefold", idx: 4 },
  { key: "Hpqjyreallym", idx: 5 }, { key: "Hpqjyreallymat", idx: 6 },
  { key: "rose", idx: 7 }, { key: "violet", idx: 8 }, { key: "drawn", idx: 9 },
];

const READ_ONE = (idx) => {
  const m = document.querySelectorAll(".hm-mark")[idx];
  if (!m) return null;
  const cs = getComputedStyle(m);
  const host = m.closest(".hm");
  const hcs = host ? getComputedStyle(host) : null;
  const ink = m.querySelector(".hm-ink");
  const guide = m.querySelector(".hm-guide");
  const mask = m.querySelector("mask");
  const R = (e) => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; };
  let inkBBox = null, guideLen = null;
  try { const b = ink.getBBox(); inkBBox = { x: b.x, y: b.y, w: b.width, h: b.height }; } catch {}
  try { guideLen = Math.round(guide.getTotalLength() * 1000) / 1000; } catch {}
  const gcs = guide ? getComputedStyle(guide) : null;
  return {
    i: idx, shape: host?.getAttribute("data-shape") || "(none)",
    hostText: (host?.textContent || "").trim().slice(0, 34),
    wAttr: parseFloat(m.getAttribute("width")), hAttr: parseFloat(m.getAttribute("height")),
    wAttrRaw: m.getAttribute("width"), hAttrRaw: m.getAttribute("height"),
    csWidth: cs.width, csHeight: cs.height, csWidthPx: parseFloat(cs.width),
    overflow: cs.overflow, transform: cs.transform,
    frameRect: R(m), hostRect: host ? R(host) : null,
    hostPaddingInline: hcs ? hcs.paddingInline : null, hostPaddingLeft: hcs ? hcs.paddingLeft : null,
    maskWindow: mask ? { x: +mask.getAttribute("x"), y: +mask.getAttribute("y"), w: +mask.getAttribute("width"), h: +mask.getAttribute("height") } : null,
    inkBBox, guideLen,
    strokeDasharray: gcs?.strokeDasharray, strokeDashoffset: gcs?.strokeDashoffset,
    inkFill: ink ? getComputedStyle(ink).fill : null,
    inkVisibility: ink ? getComputedStyle(ink).visibility : null,
  };
};

function cropPNG(png, r, dpr) {
  const x0 = Math.max(0, Math.round(r.x * dpr)), y0 = Math.max(0, Math.round(r.y * dpr));
  const x1 = Math.min(png.width, Math.round((r.x + r.w) * dpr)), y1 = Math.min(png.height, Math.round((r.y + r.h) * dpr));
  const w = Math.max(0, x1 - x0), h = Math.max(0, y1 - y0);
  const out = new PNG({ width: w || 1, height: h || 1 });
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const s = ((y + y0) * png.width + (x + x0)) << 2, d = (y * w + x) << 2;
    out.data[d] = png.data[s]; out.data[d + 1] = png.data[s + 1]; out.data[d + 2] = png.data[s + 2]; out.data[d + 3] = png.data[s + 3];
  }
  return { png: out, w, h, clippedByViewport: (x1 - x0) < Math.round(r.w * dpr) - 1 || (y1 - y0) < Math.round(r.h * dpr) - 1 };
}

function inkStats(cA, cB) {
  const A = cA.png, B = cB.png, w = cA.w, h = cA.h;
  let total = 0, c08 = 0, c04 = 0, hue78 = 0, deltaPx = 0, maxDelta = 0, sumC = 0, sumL = 0, nC = 0;
  const same = B.width === A.width && B.height === A.height;
  const liveCols = new Set();
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) << 2; total++;
    const r = A.data[i], g = A.data[i + 1], b = A.data[i + 2];
    const o = oklabFromRgb(r, g, b); const C = Math.hypot(o.a, o.b);
    let hd = (Math.atan2(o.b, o.a) * 180) / Math.PI; if (hd < 0) hd += 360;
    if (C >= 0.08) c08++; if (C >= 0.04) c04++;
    if (C >= 0.04 && Math.abs(((hd - 78 + 540) % 360) - 180) > 140) hue78++;
    if (C > 0.02) { sumC += C; sumL += o.L; nC++; }
    if (same) {
      const d = Math.max(Math.abs(r - B.data[i]), Math.abs(g - B.data[i + 1]), Math.abs(b - B.data[i + 2]));
      if (d > 6) { deltaPx++; liveCols.add(x); }
      if (d > maxDelta) maxDelta = d;
    }
  }
  // longest dead run across columns (the battery's own instrument for `rose`)
  let longestDead = 0, run = 0;
  for (let x = 0; x < w; x++) { if (liveCols.has(x)) { run = 0; } else { run++; if (run > longestDead) longestDead = run; } }
  return { totalPx: total, chromaGE08: c08, chromaGE04: c04, hue78, deltaPx, maxDelta,
    liveCols: liveCols.size, cols: w, longestDeadRun: longestDead,
    meanC: nC ? +(sumC / nC).toFixed(5) : 0, meanL: nC ? +(sumL / nC).toFixed(5) : 0 };
}

const results = {};
const browser = await chromium.launch({ headless: true });

for (const vp of [{ name: "1440", width: 1440, height: 900, dpr: 2 }, { name: "390x844", width: 390, height: 844, dpr: 3 }]) {
  for (const theme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: vp.dpr, colorScheme: theme });
    const page = await ctx.newPage();
    await page.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
    await page.goto(BASE + ROUTE, { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle").catch(() => {});
    await page.evaluate(() => document.fonts?.ready).catch(() => {});
    await page.waitForTimeout(1600);
    await page.evaluate((t) => { document.documentElement.classList.toggle("dark", t === "dark"); }, theme);
    await page.waitForTimeout(700);

    const tag = `${vp.name}-${theme}`;
    const dpr = await page.evaluate(() => window.devicePixelRatio);
    const htmlClass = await page.evaluate(() => document.documentElement.className);
    const per = [];

    for (const M of MOUNTS) {
      // scroll the mount to the middle of its own scroller, then let it settle (>=600ms)
      await page.evaluate((idx) => {
        const m = document.querySelectorAll(".hm-mark")[idx];
        m?.closest(".hm")?.scrollIntoView({ block: "center", inline: "center", behavior: "instant" });
      }, M.idx);
      await page.waitForTimeout(750);

      const row = await page.evaluate(READ_ONE, M.idx);
      if (!row) { per.push({ key: M.key, missing: true }); continue; }

      const fr = row.frameRect, mw = row.maskWindow, ib = row.inkBBox;
      let ux0 = -Infinity, uy0 = -Infinity, ux1 = Infinity, uy1 = Infinity;
      if (ib) { ux0 = Math.max(ux0, ib.x); uy0 = Math.max(uy0, ib.y); ux1 = Math.min(ux1, ib.x + ib.w); uy1 = Math.min(uy1, ib.y + ib.h); }
      if (mw) { ux0 = Math.max(ux0, mw.x); uy0 = Math.max(uy0, mw.y); ux1 = Math.min(ux1, mw.x + mw.w); uy1 = Math.min(uy1, mw.y + mw.h); }
      const pad = 3;
      const region = { x: fr.x + ux0 - pad, y: fr.y + uy0 - pad, w: (ux1 - ux0) + 2 * pad, h: (uy1 - uy0) + 2 * pad };

      const shotA = PNG.sync.read(await page.screenshot());
      await page.addStyleTag({ content: ".hm-mark{visibility:hidden !important}" });
      await page.waitForTimeout(450);
      const shotB = PNG.sync.read(await page.screenshot());
      await page.evaluate(() => [...document.querySelectorAll("style")].filter((s) => s.textContent.includes("hm-mark{visibility:hidden")).forEach((s) => s.remove()));
      await page.waitForTimeout(350);

      const cA = cropPNG(shotA, region, dpr), cB = cropPNG(shotB, region, dpr);
      const st = inkStats(cA, cB);
      fs.writeFileSync(`${BANK}/pi-RERUN2-R6-crop-${M.key}-${tag}.png`, PNG.sync.write(cA.png));
      fs.writeFileSync(`${BANK}/pi-RERUN2-R6-cropHIDDEN-${M.key}-${tag}.png`, PNG.sync.write(cB.png));

      per.push({
        key: M.key, i: M.idx, shape: row.shape, hostText: row.hostText,
        wAttr: row.wAttr, hAttr: row.hAttr, wAttrRaw: row.wAttrRaw, hAttrRaw: row.hAttrRaw,
        csWidth: row.csWidth, csWidthPx: row.csWidthPx, widthGT0: row.csWidthPx > 0,
        overflow: row.overflow, maskWindow: mw, inkBBox: ib, guideLen: row.guideLen,
        strokeDasharray: row.strokeDasharray, strokeDashoffset: row.strokeDashoffset,
        inkFill: row.inkFill,
        inkUserSpaceX: ib ? [+ib.x.toFixed(3), +(ib.x + ib.w).toFixed(3)] : null,
        frameViewportX: [0, row.wAttr],
        inkWhollyOutsideOwnViewport: ib ? (ib.x + ib.w <= 0 || ib.x >= row.wAttr) : null,
        hostPaddingInline: row.hostPaddingInline, hostRect: row.hostRect,
        region, cropPx: { w: cA.w, h: cA.h }, clipped: cA.clippedByViewport,
        stats: st, PAINTS: st.deltaPx > 0,
      });
    }

    // arm 6 — gallery at rest (top of page)
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.evaluate(() => document.querySelector(".hm")?.closest("[class*=overflow],main,body")?.scrollTo?.(0, 0));
    await page.waitForTimeout(750);
    fs.writeFileSync(`${BANK}/pi-RERUN2-R6-GALLERY-rest-${tag}.png`, await page.screenshot({ fullPage: true }));

    results[tag] = { url: ROUTE, viewport: `${vp.width}x${vp.height}`, dpr, theme, htmlClass,
      anyZeroWidth: per.some((p) => p.widthGT0 === false), mounts: per };
    console.log(`--- ${tag} --- zeroW=${results[tag].anyZeroWidth} ` + per.map((p) => `${p.key}:${p.PAINTS ? "PAINT" : "BLANK"}(${p.stats.deltaPx}${p.clipped ? ",CLIP" : ""})`).join(" "));
    await ctx.close();
  }
}
await browser.close();
fs.writeFileSync(`${BANK}/pi-RERUN2-R6-CENSUS-all.json`, JSON.stringify(results, null, 1));
console.log("WROTE census");
