import pw from "/Users/mkbabb/Programming/slides/node_modules/playwright/index.js";
const { chromium } = pw;
const PORT = process.argv[2] || "4351";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(`http://localhost:${PORT}/til-briefing#5`, { waitUntil: "networkidle" });
await page.waitForTimeout(800);

const variants = ["middle", "-0.12em", "-0.18em", "-0.24em", "-0.30em"];
const rows = [];
for (const va of variants) {
  const r = await page.evaluate((v) => {
    const slide = document.querySelector('[data-slide="example-fanin"]');
    const host = slide.querySelector('.poster__human');
    const chip = host.querySelector('.chip');
    chip.style.verticalAlign = v;
    // baseline ruler in running text after chip
    const ruler = document.createElement('span');
    ruler.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline;';
    chip.after(ruler);
    const baseline = ruler.getBoundingClientRect().top;
    ruler.remove();
    const fontPx = parseFloat(getComputedStyle(host).fontSize);
    const capMid = baseline - fontPx * 0.70 / 2; // midpoint of cap-height band
    const cr = chip.getBoundingClientRect();
    const chipMid = (cr.top + cr.bottom) / 2;
    return {
      va: getComputedStyle(chip).verticalAlign,
      chipMidMinusCapMid: +(chipMid - capMid).toFixed(2),
      chipBottomMinusBaseline: +(cr.bottom - baseline).toFixed(2),
    };
  }, va);
  rows.push({ set: va, ...r });
}
console.log(JSON.stringify(rows, null, 2));
await browser.close();
