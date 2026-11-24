// diag-close.mjs <url> <dockSelector> [engine] [w] [scheme]
// One browser, one context. Opens the dock by hover, closes it by Escape from a seat,
// and logs (1) every inline write of a --dock-* property on the dock or its parts, with
// the summary pane's box at that moment, and (2) one row per rendered frame of the close.
import { createRequire } from "node:module";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
const require = createRequire(join(HERE, "../../trees/v11.1.0/package.json"));
const pw = require("playwright");
const [url, sel, engine = "chromium", w = "1440", scheme = "light"] = process.argv.slice(2);
const W = +w, H = W > 800 ? 900 : 844;
const browser = await pw[engine].launch(engine === "chromium" ? { args: ["--use-angle=metal", "--enable-gpu-rasterization"] } : {});
try {
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, colorScheme: scheme });
  try {
    const page = await ctx.newPage();
    await page.addInitScript(() => {
      window.__w = [];
      const orig = CSSStyleDeclaration.prototype.setProperty;
      CSSStyleDeclaration.prototype.setProperty = function (p, v, pr) {
        const r = orig.call(this, p, v, pr);
        try {
          if (typeof p === "string" && /^--dock-(expanded-px|collapsed-px|pane-shift|morph-origin)/.test(p) && window.__dock) {
            const d = window.__dock, s = d.querySelector(".dock-layer--summary");
            const b = (e) => { const q = e.getBoundingClientRect(); return [+q.left.toFixed(2), +q.width.toFixed(2)]; };
            window.__w.push({ t: +performance.now().toFixed(1), p, v, own: this === d.style ? "root" : this === s?.style ? "summary" : "other", morph: d.hasAttribute("data-morphing"), cls: d.className.replace(/app-dock |glass-dock |horizontal |shape-pill /g, ""), root: b(d), rootCss: getComputedStyle(d).inlineSize, sum: s ? b(s) : null, pad: getComputedStyle(d).paddingLeft });
          }
        } catch {}
        return r;
      };
    });
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForSelector(sel, { timeout: 20000 });
    await page.waitForTimeout(1500);
    await page.evaluate((sel) => { window.__dock = document.querySelector(sel); }, sel);
    const box = await page.locator(sel).first().boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(1800);
    await page.evaluate(() => { window.__w.push({ mark: "open settled" }); });
    // focus a seat in the full layer and press Escape; sample every frame for 1.4 s
    await page.evaluate(() => {
      const d = window.__dock; const rows = (window.__rows = []);
      const s = d.querySelector(".dock-layer--summary"), L = d.querySelector(".dock-layers"), run = d.querySelector(".dock-run");
      const pers = d.querySelector(".dock-persistent");
      const bx = (e) => { if (!e) return null; const q = e.getBoundingClientRect(); return [+q.left.toFixed(2), +q.width.toFixed(2)]; };
      const t0 = performance.now();
      const tick = () => {
        const cs = getComputedStyle(d);
        rows.push({ t: +(performance.now() - t0).toFixed(1), m: d.hasAttribute("data-morphing") ? 1 : 0, mt: d.style.getPropertyValue("--dock-morph-t"), root: bx(d), css: cs.inlineSize, padL: cs.paddingLeft, sc: cs.scale, oR: d.style.getPropertyValue("--dock-morph-origin"), oL: L?.style.getPropertyValue("--dock-morph-origin"), layers: bx(L), sum: bx(s), shift: s?.style.getPropertyValue("--dock-pane-shift"), run: bx(run), runSl: run?.scrollLeft, pers: bx(pers) });
        if (performance.now() - t0 < 1400) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      const seat = d.querySelector(".dock-run [data-glass-dock-seat], .dock-run button, .dock-run a");
      seat?.focus();
      seat?.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });
    await page.waitForTimeout(1700);
    const out = await page.evaluate(() => ({ writes: window.__w, rows: window.__rows, kids: [...window.__dock.children].map((c) => c.className) }));
    console.log(JSON.stringify(out));
  } finally { await ctx.close(); }
} finally { await browser.close(); }
