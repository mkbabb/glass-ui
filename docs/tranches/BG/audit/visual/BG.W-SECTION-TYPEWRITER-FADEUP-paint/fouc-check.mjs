import { chromium } from "playwright";
const browser = await chromium.connectOverCDP("http://localhost:9478");
const ctx = browser.contexts()[0];
// Find a route with enough heading sections that some stay below-fold at top:0.
for (const route of ["/containers/tooltip", "/compositions/form-validation", "/containers/dialog"]) {
  const page = await ctx.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`http://localhost:5200${route}`, { waitUntil: "networkidle" });
  await page.waitForSelector(".story-section__heading", { timeout: 15000 });
  const r = await page.evaluate(async () => {
    const scroller = document.querySelector("main.demo-main-scroller");
    scroller.scrollTop = 0;
    await new Promise(r => setTimeout(r, 300));
    const heads = [...document.querySelectorAll(".story-section__heading")];
    const armedNotRevealed = heads.find(h => h.hasAttribute("data-reveal-armed") && !h.hasAttribute("data-revealed"));
    let foucOpacity = null, foucTransform = null;
    if (armedNotRevealed) {
      const c = armedNotRevealed.querySelector(".char");
      if (c) { const cs = getComputedStyle(c); foucOpacity = cs.opacity; foucTransform = cs.transform; }
    }
    return {
      headingCount: heads.length,
      revealedAtTop: heads.filter(h => h.hasAttribute("data-revealed")).length,
      armedNotRevealedCount: heads.filter(h => h.hasAttribute("data-reveal-armed") && !h.hasAttribute("data-revealed")).length,
      foucFloorGlyphOpacity: foucOpacity,
      foucFloorGlyphTransform: foucTransform,
    };
  });
  console.log(`### ${route}`, JSON.stringify(r));
  await page.close();
}
await browser.close();
