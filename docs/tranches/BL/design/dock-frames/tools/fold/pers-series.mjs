// pers-series.mjs <engine> [trees=base,cure]: the harness page's persistent seat through an
// open (hover) and a close (outside click) at 1440 light, per frame: the morph flag and
// scalar, the plate's left edge and width, the persistent seat's centre, and the
// expanded face's first seat. One browser, a context per tree, closed in finally.
import { createRequire } from "node:module";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
const TREES = join(HERE, "../../trees");
const [engine = "chromium", treesArg = "base,cure"] = process.argv.slice(2);
const trees = treesArg.split(",");
const pw = createRequire(join(TREES, trees[0], "package.json"))("playwright");
const TYPES = { ".js": "text/javascript", ".css": "text/css", ".html": "text/html" };
const SEL = "[data-testid=dock-h-closed]";
const sample = (ms) => new Promise((done) => {
  const d = document.querySelector("[data-testid=dock-h-closed]");
  const pers = d.querySelector(".dock-persistent [data-glass-dock-seat]");
  const rows = []; const t0 = performance.now();
  const tick = (now) => {
    const b = d.getBoundingClientRect(), p = pers.getBoundingClientRect();
    const cs = getComputedStyle(d);
    rows.push(`${(now - t0).toFixed(1).padStart(6)} m=${d.hasAttribute("data-morphing") ? 1 : 0} t=${(d.style.getPropertyValue("--dock-morph-t") || "-").slice(0, 5).padEnd(5)} cls=${d.classList.contains("collapsed") ? "c" : "e"} plateL=${b.left.toFixed(2)} plateW=${b.width.toFixed(2)} pad=${cs.paddingLeft} persX=${(p.left + p.width / 2).toFixed(2)} persFromPlateL=${(p.left - b.left).toFixed(2)}`);
    if (now - t0 < ms) requestAnimationFrame(tick); else done(rows);
  };
  requestAnimationFrame(tick);
});
const browser = await pw[engine].launch(engine === "chromium" ? { args: ["--use-angle=metal", "--enable-gpu-rasterization"] } : {});
try {
  for (const tree of trees) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
    try {
      const dist = join(TREES, tree, "slim-dist");
      await ctx.route(`http://${tree}.test/**`, (rt) => { let p = new URL(rt.request().url()).pathname.replace(/^\/slim\/?/, ""); if (!p || p.endsWith("/")) p += "index.html"; const f = join(dist, p); return existsSync(f) ? rt.fulfill({ status: 200, body: readFileSync(f), headers: { "content-type": TYPES[extname(f)] ?? "application/octet-stream" } }) : rt.fulfill({ status: 404, body: "" }); });
      const page = await ctx.newPage();
      try {
        await page.goto(`http://${tree}.test/slim/?c=dock&scheme=light`, { waitUntil: "load" });
        await page.waitForFunction(() => window.__animReady === true, null, { timeout: 20000 });
        await page.waitForTimeout(800);
        await page.locator(SEL).first().scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        const b = await page.locator(SEL).first().boundingBox();
        const oP = page.evaluate(sample, 700);
        await page.waitForTimeout(50);
        await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
        const open = await oP;
        await page.waitForTimeout(300);
        const cP = page.evaluate(sample, 900);
        await page.waitForTimeout(40);
        await page.mouse.click(1430, 880);
        const close = await cP;
        console.log(`== ${engine} ${tree} open`); console.log(open.join("\n"));
        console.log(`== ${engine} ${tree} close`); console.log(close.join("\n"));
      } finally { await page.close(); }
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
