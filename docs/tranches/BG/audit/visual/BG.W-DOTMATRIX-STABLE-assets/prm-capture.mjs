// PRM static-frame check + computed DOM checks. Emulates prefers-reduced-motion:reduce,
// loads the live route, scrolls the globe into view, waits, captures the globe region.
// Under PRM the substrate paints ONE static frame then parks — it must STILL read as a
// sphere from the depth-fade alone. Also records glContextCount / main.children / getAnimations.
import { chromium } from "playwright";
import { PNG } from "pngjs";
import fs from "node:fs";
const CDP = "http://localhost:9333";
const MODE = process.argv[2] || "dark";
const OUT = new URL(".", import.meta.url).pathname;

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.emulateMedia({ colorScheme: MODE, reducedMotion: "reduce" });
await page.goto("http://localhost:5200/substrates/dot-matrix", { waitUntil: "load", timeout: 30000 });
await page.evaluate((m) => document.documentElement.classList.toggle("dark", m === "dark"), MODE);
await page.waitForTimeout(2500);
const dom = await page.evaluate(() => {
  const cs = Array.from(document.querySelectorAll("canvas"));
  const main = document.querySelector("main");
  return {
    canvasCount: cs.length,
    canvases: cs.map((c) => { const r = c.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height) }; }),
    mainChildren: main ? main.children.length : -1,
    getAnimations: document.getAnimations ? document.getAnimations().length : -1,
    prm: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  };
});
const gi = await page.evaluate(() => {
  const cs = Array.from(document.querySelectorAll("canvas"));
  const i = cs.findIndex((c) => { const r = c.getBoundingClientRect(); return Math.abs(r.height - 460) < 40 && r.width < 1300; });
  cs[i].scrollIntoView({ block: "center" });
  return i;
});
await page.waitForTimeout(1500);
const globe = page.locator("canvas").nth(gi);
const b = await globe.boundingBox();
// two shots 1.5s apart — under PRM they must be IDENTICAL (parked, no motion)
const buf1 = await page.screenshot({ clip: b });
await page.waitForTimeout(1500);
const buf2 = await page.screenshot({ clip: b });
const outPath = `${OUT}dotmatrix-chrome-${MODE}-prm-globe.png`;
fs.writeFileSync(outPath, buf1);
const p1 = PNG.sync.read(buf1), p2 = PNG.sync.read(buf2);
let diff = 0, s = 0, mx = 0;
for (let i = 0; i < p1.data.length; i += 4) {
  const l1 = 0.2126*p1.data[i]+0.7152*p1.data[i+1]+0.0722*p1.data[i+2];
  const l2 = 0.2126*p2.data[i]+0.7152*p2.data[i+1]+0.0722*p2.data[i+2];
  diff += Math.abs(l1 - l2); s += l1; if (l1 > mx) mx = l1;
}
const n = p1.data.length / 4;
console.log(JSON.stringify({ mode: MODE, ...dom, outPath,
  globeRegionMean: +(s/n).toFixed(2), globeRegionMax: +mx.toFixed(1),
  prmFrameToFrameMeanAbsDiff: +(diff/n).toFixed(4) }, null, 2));
await page.close();
await browser.close();
