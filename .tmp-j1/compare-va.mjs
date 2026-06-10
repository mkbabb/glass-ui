import pw from "/Users/mkbabb/Programming/slides/node_modules/playwright/index.js";
const { chromium } = pw;
const PORT = process.argv[2] || "4351";
const OUT = "/Users/mkbabb/Programming/glass-ui/.tmp-j1";

const variants = ["middle", "-0.12em", "-0.18em", "-0.24em", "-0.30em"];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(`http://localhost:${PORT}/til-briefing#5`, { waitUntil: "networkidle" });
await page.waitForTimeout(800);

for (const va of variants) {
  await page.evaluate((v) => {
    for (const chip of document.querySelectorAll('.poster__human .chip')) chip.style.verticalAlign = v;
  }, va);
  await page.waitForTimeout(120);
  const box = await page.evaluate(() => {
    const p = document.querySelector('[data-slide="example-fanin"] .poster__human');
    const r = p.getBoundingClientRect();
    return { x: Math.max(0, r.x-8), y: Math.max(0, r.y-8), width: Math.min(900, r.width+16), height: r.height+16 };
  });
  const safe = va.replace(/[^a-z0-9.-]/gi, '_');
  await page.screenshot({ path: `${OUT}/va-${safe}.png`, clip: box });
}
await browser.close();
console.log("done", variants.join(", "));
