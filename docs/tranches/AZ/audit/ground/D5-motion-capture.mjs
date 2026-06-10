// D5-animation-targets — read-only motion audit capture.
// Drives the live demo at :5199, samples animation behavior, captures frames.
// NO source edits; writes only .png/.json under this ground dir.
import { chromium } from "playwright-core";
import { fileURLToPath } from "node:url";
import path from "node:path";

const OUT = path.dirname(fileURLToPath(import.meta.url));
const BASE = "http://localhost:5199";
const PRE = "D5-";

const findChrome = () => {
  // use the playwright-managed chromium
  return undefined; // let playwright resolve channel
};

async function park(page) {
  await page.evaluate(() => {
    try {
      Object.defineProperty(document, "hidden", { value: true, configurable: true });
      document.dispatchEvent(new Event("visibilitychange"));
    } catch {}
  });
}

const results = {};

async function main() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();

  // 1) /foundations/motion — the CSS-half token tour
  await page.goto(`${BASE}/foundations/motion`, { waitUntil: "networkidle" });
  await park(page);
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT, `${PRE}foundations-motion.png`), fullPage: true });
  results.foundationsMotion = await page.evaluate(() => {
    const txt = document.body.innerText.slice(0, 600);
    return { hasContent: document.body.innerText.length, head: txt };
  });

  // 2) /motion/curve-gallery — the JS-half curve table
  await page.goto(`${BASE}/motion/curve-gallery`, { waitUntil: "networkidle" });
  await park(page);
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT, `${PRE}motion-curve-gallery.png`), fullPage: true });

  // 3) /motion/springs
  await page.goto(`${BASE}/motion/springs`, { waitUntil: "networkidle" });
  await park(page);
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT, `${PRE}motion-springs.png`), fullPage: true });

  // 4) /motion/reveal — vReveal
  await page.goto(`${BASE}/motion/reveal`, { waitUntil: "networkidle" });
  await park(page);
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT, `${PRE}motion-reveal.png`), fullPage: true });

  // 5) Button hover/press register — find a primary button, sample transition props
  await page.goto(`${BASE}/foundations/buttons`, { waitUntil: "networkidle" }).catch(() => {});
  await park(page);
  await page.waitForTimeout(300);
  results.buttonProbe = await page.evaluate(() => {
    const out = {};
    const btns = Array.from(document.querySelectorAll("button")).slice(0, 30);
    const seen = new Set();
    for (const b of btns) {
      const cs = getComputedStyle(b);
      const key = b.className.split(" ").slice(0, 3).join(".");
      if (seen.has(key)) continue;
      seen.add(key);
      out[key] = {
        transitionProperty: cs.transitionProperty,
        transitionTiming: cs.transitionTimingFunction,
        transitionDuration: cs.transitionDuration,
      };
      if (seen.size >= 12) break;
    }
    return out;
  });

  // 6) Static-content scan: does the home/landing page use vReveal staggers?
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await park(page);
  await page.waitForTimeout(400);
  results.revealUsage = await page.evaluate(() => {
    return {
      dataReveal: document.querySelectorAll("[data-reveal]").length,
      dataCountup: document.querySelectorAll("[data-countup]").length,
      dataScrollReveal: document.querySelectorAll("[data-scroll-reveal]").length,
      scrollProgress: document.querySelectorAll(".scroll-progress").length,
      route: location.pathname,
    };
  });
  await page.screenshot({ path: path.join(OUT, `${PRE}landing.png`), fullPage: false });

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
