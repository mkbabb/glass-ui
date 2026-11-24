// seal-series.mjs <engine> <tree> <w>: the fourier repro's open, per frame: the morph
// scalar, the seal's effective opacity and each ancestor's opacity up to the dock.
import { createRequire } from "node:module";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
const TREES = join(HERE, "../../trees");
const [engine = "chromium", tree = "cure", wArg = "1440"] = process.argv.slice(2);
const w = +wArg;
const pw = createRequire(join(TREES, tree, "package.json"))("playwright");
const TYPES = { ".js": "text/javascript", ".css": "text/css", ".html": "text/html" };
const browser = await pw[engine].launch(engine === "chromium" ? { args: ["--use-angle=metal", "--enable-gpu-rasterization"] } : {});
try {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 2 });
  const dist = join(TREES, tree, "slim-dist");
  await ctx.route(`http://${tree}.test/**`, (rt) => { let p = new URL(rt.request().url()).pathname.replace(/^\/slim\/?/, ""); if (!p || p.endsWith("/")) p += "index.html"; const f = join(dist, p); return existsSync(f) ? rt.fulfill({ status: 200, body: readFileSync(f), headers: { "content-type": TYPES[extname(f)] ?? "application/octet-stream" } }) : rt.fulfill({ status: 404, body: "" }); });
  const page = await ctx.newPage();
  try {
    await page.goto(`http://${tree}.test/slim/?c=fourier-dock`);
    await page.waitForFunction(() => window.__animReady === true);
    await page.waitForTimeout(800);
    const b = await page.locator("[data-testid=fourier-dock]").boundingBox();
    const p = page.evaluate(() => new Promise((done) => { const d = document.querySelector("[data-testid=fourier-dock]"); const seal = d.querySelector(".dock-layer--summary").firstElementChild; const rows = []; const t0 = performance.now(); const tick = (now) => { const chain = []; for (let n = seal; n && n !== d.parentElement; n = n.parentElement) { const cs = getComputedStyle(n); chain.push(`${(n.className?.baseVal ?? n.className).toString().split(" ")[0] || n.tagName}:${cs.display === "contents" ? "c" : cs.opacity}`); } rows.push(`${(now - t0).toFixed(1)} m=${d.hasAttribute("data-morphing") ? 1 : 0} t=${d.style.getPropertyValue("--dock-morph-t").slice(0, 6)} ${chain.join(" ")}`); if (now - t0 < 400) requestAnimationFrame(tick); else done(rows); }; requestAnimationFrame(tick); }));
    await page.waitForTimeout(50);
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
    console.log((await p).join("\n"));
  } finally { await page.close(); await ctx.close(); }
} finally { await browser.close(); }
