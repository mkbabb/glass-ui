// diag-press.mjs <url> <dockSelector> <themeSelector> [engine] [w] [scheme]
// One browser, one context. Opens the dock (hover at 1440, tap at 390), then presses the
// theme seat and logs one row per rendered frame for 900 ms: the run's scroll offset and
// extents, the fit flag, the reserve boxes, the first and theme seats' boxes, and every
// attribute or class mutation inside the dock in that window.
import { createRequire } from "node:module";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
const require = createRequire(join(HERE, "../../trees/v11.1.0/package.json"));
const pw = require("playwright");
const [url, sel, themeSel, engine = "chromium", w = "1440", scheme = "light"] = process.argv.slice(2);
const W = +w, coarse = W < 800, H = coarse ? 844 : 900;
const browser = await pw[engine].launch(engine === "chromium" ? { args: ["--use-angle=metal", "--enable-gpu-rasterization"] } : {});
try {
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, colorScheme: scheme, hasTouch: coarse, isMobile: coarse && engine === "webkit" });
  try {
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForSelector(sel, { timeout: 20000 });
    await page.waitForTimeout(1200);
    const box = await page.locator(sel).first().boundingBox();
    if (coarse) await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
    else await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(1500);
    const before = await page.evaluate(([sel]) => {
      const d = document.querySelector(sel), run = d.querySelector(".dock-run");
      const cs = (p) => getComputedStyle(run, p);
      return { fits: d.hasAttribute("data-run-fits"), yield: getComputedStyle(d).getPropertyValue("--dock-run-yield"), sl: run.scrollLeft, sw: run.scrollWidth, cw: run.clientWidth, before: cs("::before").width, after: cs("::after").width, padL: cs().paddingLeft, padR: cs().paddingRight, kids: [...run.children].map((c) => [c.className.toString().slice(0, 40), getComputedStyle(c).display, c.offsetLeft, c.offsetWidth, +c.getBoundingClientRect().width.toFixed(3)]) };
    }, [sel]);
    await page.evaluate(([sel]) => {
      const d = document.querySelector(sel), run = d.querySelector(".dock-run");
      const rows = (window.__rows = []), muts = (window.__muts = []);
      const t0 = performance.now();
      new MutationObserver((rs) => { for (const r of rs) muts.push({ t: +(performance.now() - t0).toFixed(1), type: r.type, attr: r.attributeName, tgt: (r.target.className?.toString?.() || r.target.nodeName).slice(0, 50), val: r.type === "attributes" ? r.target.getAttribute?.(r.attributeName)?.slice?.(0, 60) : null }); }).observe(d, { attributes: true, subtree: true, childList: true, attributeFilter: ["class", "data-run-fits", "style", "aria-pressed", "tabindex"] });
      run.addEventListener("scroll", () => muts.push({ t: +(performance.now() - t0).toFixed(1), type: "scroll", sl: run.scrollLeft }));
      const seats = [...run.children];
      const tick = () => {
        rows.push({ t: +(performance.now() - t0).toFixed(1), sl: run.scrollLeft, sw: run.scrollWidth, cw: run.clientWidth, fits: d.hasAttribute("data-run-fits") ? 1 : 0, bW: getComputedStyle(run, "::before").width, aW: getComputedStyle(run, "::after").width, s0: +seats[0].getBoundingClientRect().left.toFixed(2), sN: +seats[seats.length - 1].getBoundingClientRect().left.toFixed(2), act: document.activeElement?.className?.toString?.().slice(0, 30) });
        if (performance.now() - t0 < 900) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      window.__t0 = t0;
    }, [sel]);
    const tb = await page.locator(themeSel).first().boundingBox();
    const tPress = await page.evaluate(() => performance.now() - window.__t0);
    if (coarse) await page.touchscreen.tap(tb.x + tb.width / 2, tb.y + tb.height / 2);
    else { await page.mouse.move(tb.x + tb.width / 2, tb.y + tb.height / 2); await page.mouse.down(); await page.mouse.up(); }
    await page.waitForTimeout(1100);
    const out = await page.evaluate(() => ({ rows: window.__rows, muts: window.__muts }));
    console.log(JSON.stringify({ before, tPress, ...out }));
  } finally { await ctx.close(); }
} finally { await browser.close(); }
