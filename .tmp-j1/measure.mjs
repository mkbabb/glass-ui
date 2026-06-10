import pw from "/Users/mkbabb/Programming/slides/node_modules/playwright/index.js";
const { chromium } = pw;

const PORT = process.argv[2] || "4351";
const HASH = process.argv[3] || "5"; // 5=fanin, 4=invoice
const SHOT = process.argv[4] || "fanin";
const OUT = "/Users/mkbabb/Programming/glass-ui/.tmp-j1";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(`http://localhost:${PORT}/til-briefing#${HASH}`, { waitUntil: "networkidle" });
// settle: deck reads hash on mount; ensure active slide matches
await page.waitForTimeout(900);

const data = await page.evaluate(() => {
  const slides = [...document.querySelectorAll('[data-slide]')];
  const active = slides.find(s => s.getAttribute('data-state') === 'active') || slides[0];
  const slideName = active?.getAttribute('data-slide');
  const result = { slideName, chips: [] };

  // Precise text-baseline measurement: drop an inline 'baseline-anchored' ruler
  // span next to each chip; an inline-block of height 0 with vertical-align:baseline
  // gives a rect whose top == the line's baseline y.
  function baselineY(afterNode, sampleEl) {
    const ruler = document.createElement('span');
    ruler.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline;';
    afterNode.after(ruler);
    const y = ruler.getBoundingClientRect().top;
    ruler.remove();
    return y;
  }

  for (const chip of document.querySelectorAll('.poster__human .chip, .sources li, .r-tag .chip')) {
    const host = chip.closest('.poster__human');
    if (!host) continue;
    const cr = chip.getBoundingClientRect();
    const cs = getComputedStyle(chip);
    const bl = baselineY(chip, host);
    result.chips.push({
      where: 'poster__human',
      text: chip.textContent.slice(0, 28),
      valign: cs.verticalAlign,
      fontSize: cs.fontSize,
      chipTop: +cr.top.toFixed(2),
      chipBottom: +cr.bottom.toFixed(2),
      chipMidY: +((cr.top + cr.bottom) / 2).toFixed(2),
      baselineY: +bl.toFixed(2),
      // optical: a pill reads "on the line" when its OPTICAL CENTER sits a touch
      // ABOVE the baseline (≈ cap-height/2). Report chip mid relative to baseline.
      chipMidAboveBaseline: +(bl - (cr.top + cr.bottom) / 2).toFixed(2),
      chipBottomBelowBaseline: +(cr.bottom - bl).toFixed(2),
    });
  }
  return result;
});

console.log(JSON.stringify(data, null, 2));

await page.screenshot({ path: `${OUT}/${SHOT}-full.png` });

// tight crop around the poster__human chip line
const chipBox = await page.evaluate(() => {
  const p = document.querySelector('[data-slide][data-state="active"] .poster__human') || document.querySelector('.poster__human');
  if (!p) return null;
  const r = p.getBoundingClientRect();
  return { x: Math.max(0, r.x - 10), y: Math.max(0, r.y - 10), width: r.width + 20, height: r.height + 20 };
});
if (chipBox) await page.screenshot({ path: `${OUT}/${SHOT}-chip.png`, clip: chipBox });

// tight crop around the fan-in flag endpoint (the arrow) if present
const flagBox = await page.evaluate(() => {
  const svg = document.querySelector('[data-slide="example-fanin"] .fanin__svg');
  if (!svg) return null;
  const halo = svg.querySelector('.flag-halo');
  if (!halo) return null;
  const r = halo.getBoundingClientRect();
  const pad = 60;
  return { x: Math.max(0, r.x - pad), y: Math.max(0, r.y - pad), width: r.width + pad * 2, height: r.height + pad * 2 };
});
if (flagBox) await page.screenshot({ path: `${OUT}/${SHOT}-arrow.png`, clip: flagBox });

await browser.close();
