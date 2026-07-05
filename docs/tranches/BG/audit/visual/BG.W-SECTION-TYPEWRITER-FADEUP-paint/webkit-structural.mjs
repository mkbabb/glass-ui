import { webkit } from "playwright";
for (const mode of ["light", "dark"]) {
  const browser = await webkit.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.addInitScript((m) => { try { localStorage.setItem("vueuse-color-scheme", m); } catch {} }, mode);
  await page.goto("http://localhost:5200/containers/accordion", { waitUntil: "load" });
  await page.waitForSelector(".story-section__heading", { timeout: 15000 });
  await page.waitForTimeout(600); // let reveal settle
  const res = await page.evaluate(() => {
    const heads = [...document.querySelectorAll(".story-section__heading")];
    const firstRev = heads.find((h) => h.hasAttribute("data-revealed")) || heads[0];
    const cs = [...firstRev.querySelectorAll(".char")];
    const bodyChild = document.querySelector(".story-section__body > *");
    const bc = bodyChild ? getComputedStyle(bodyChild) : {};
    return {
      headingCount: heads.length,
      armed: heads.filter((h) => h.hasAttribute("data-reveal-armed")).length,
      revealed: heads.filter((h) => h.hasAttribute("data-revealed")).length,
      glyphs: cs.length,
      charAnimName: cs[0] ? getComputedStyle(cs[0]).animationName : null,
      charDisplay: cs[0] ? getComputedStyle(cs[0]).display : null,
      charDelayIdx2: cs[2] ? getComputedStyle(cs[2]).animationDelay : null,
      charStaggerStep: getComputedStyle(document.documentElement).getPropertyValue("--char-stagger-step").trim(),
      bodyAnimName: bc.animationName, bodyAnimTimeline: bc.animationTimeline,
    };
  });
  console.log(`### WebKit /containers/accordion [${mode}]`);
  console.log(JSON.stringify(res, null, 2));
  await browser.close();
}
