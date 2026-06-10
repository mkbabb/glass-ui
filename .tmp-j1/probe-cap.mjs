import pw from "/Users/mkbabb/Programming/slides/node_modules/playwright/index.js";
const { chromium } = pw;
const PORT = process.argv[2] || "4351";
const VA = process.argv[3] || null; // optional vertical-align override to test

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(`http://localhost:${PORT}/til-briefing#5`, { waitUntil: "networkidle" });
await page.waitForTimeout(800);

const out = await page.evaluate((va) => {
  const slide = document.querySelector('[data-slide="example-fanin"]');
  const host = slide.querySelector('.poster__human');
  const chip = host.querySelector('.chip');
  if (va) chip.style.verticalAlign = va;

  // measure serif cap-top and baseline using a probe of a capital letter placed
  // in the running text right after the chip
  const probe = document.createElement('span');
  probe.textContent = 'E';
  // inherit the serif line styling from host
  probe.style.cssText = 'font-family:inherit;font-size:inherit;line-height:inherit;';
  chip.after(probe);
  const pr = probe.getBoundingClientRect();
  // baseline ruler
  const ruler = document.createElement('span');
  ruler.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline;';
  probe.after(ruler);
  const baseline = ruler.getBoundingClientRect().top;
  ruler.remove();
  probe.remove();

  const cr = chip.getBoundingClientRect();
  const cap = getComputedStyle(host);
  // cap-top: glyph box top is roughly cap-top + small leading; use a tighter estimate:
  // For most serifs cap-height ≈ 0.7*em above baseline. probe.top includes line leading.
  const fontPx = parseFloat(cap.fontSize);
  const capTop = baseline - fontPx * 0.70;      // serif cap-height ≈0.70em
  const xHeightMid = baseline - fontPx * 0.45 / 2; // x-height ≈0.45em, its midline
  const capMid = (capTop + baseline) / 2;
  return {
    va: getComputedStyle(chip).verticalAlign,
    fontPx,
    baseline: +baseline.toFixed(2),
    estCapTop: +capTop.toFixed(2),
    estCapMid: +capMid.toFixed(2),
    estXHeightMid: +xHeightMid.toFixed(2),
    chipTop: +cr.top.toFixed(2),
    chipBottom: +cr.bottom.toFixed(2),
    chipMid: +((cr.top + cr.bottom)/2).toFixed(2),
    // we want chipMid ≈ capMid for optical centering on the line.
    chipMidMinusCapMid: +(((cr.top+cr.bottom)/2) - capMid).toFixed(2),
    chipBottomMinusBaseline: +(cr.bottom - baseline).toFixed(2),
  };
}, VA);
console.log(JSON.stringify(out, null, 2));
await browser.close();
