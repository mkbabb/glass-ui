import pw from "/Users/mkbabb/Programming/slides/node_modules/playwright/index.js";
const { chromium } = pw;
const PORT = process.argv[2] || "4351";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(`http://localhost:${PORT}/til-briefing#5`, { waitUntil: "networkidle" });
await page.waitForTimeout(800);

const variants = ["middle", "baseline", "-0.12em", "-0.18em", "-0.24em", "text-bottom", "bottom"];
const rows = [];
for (const va of variants) {
  const r = await page.evaluate((v) => {
    const slide = document.querySelector('[data-slide="example-fanin"]');
    const host = slide.querySelector('.poster__human');
    const chip = host.querySelector('.chip');
    chip.style.verticalAlign = v;

    // serif text baseline (running text)
    const serifRuler = document.createElement('span');
    serifRuler.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline;';
    chip.after(serifRuler);
    const serifBaseline = serifRuler.getBoundingClientRect().top;
    serifRuler.remove();

    // pill's OWN inner-text baseline: the chip is inline-flex; its label text sits
    // centered. Measure the bottom of the mono glyphs inside via a 0-size baseline
    // ruler appended INSIDE the chip.
    const innerRuler = document.createElement('span');
    innerRuler.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline;';
    chip.appendChild(innerRuler);
    const pillTextBaseline = innerRuler.getBoundingClientRect().top;
    innerRuler.remove();

    return {
      va: getComputedStyle(chip).verticalAlign,
      // negative => pill text baseline ABOVE serif baseline (pill text rides HIGH)
      pillBaselineVsSerif: +(pillTextBaseline - serifBaseline).toFixed(2),
    };
  }, va);
  rows.push({ set: va, ...r });
}
console.log(JSON.stringify(rows, null, 2));
await browser.close();
