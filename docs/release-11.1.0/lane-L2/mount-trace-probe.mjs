import { chromium } from "playwright";
const base = process.argv[2];
const browser = await chromium.launch({ headless: true });
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(`${base}/docs/release-11.1.0/lane-L2/harness/index.html?scene=mount`);
  await page.waitForFunction(() => window.__ready === true);
  await page.waitForTimeout(500);
  const r = await page.evaluate(async () => {
    const stacks = {};
    let on = false;
    const rec = (k) => { if (!on) return; const s = new Error().stack.split("\n").slice(2, 6).map((l) => l.trim().replace(/https?:\/\/[^/]+/, "").replace(/\?[^:]*/, "")).join(" < "); stacks[k + " " + s] = (stacks[k + " " + s] ?? 0) + 1; };
    const gcs = window.getComputedStyle;
    window.getComputedStyle = function (el, p) { rec("gcs" + (el === document.documentElement ? "[root]" : "")); return gcs.call(window, el, p); };
    const rect = Element.prototype.getBoundingClientRect;
    Element.prototype.getBoundingClientRect = function () { rec("rect"); return rect.call(this); };
    const efp = document.elementsFromPoint;
    document.elementsFromPoint = function (x, y) { rec("efp"); return efp.call(document, x, y); };
    on = true;
    window.__mount.next();
    await window.__mount.tick();
    on = false;
    return stacks;
  });
  for (const [k, n] of Object.entries(r).sort((a, b) => b[1] - a[1])) console.log(n, k);
} finally { await browser.close(); }
