import { chromium } from "playwright-core";
const BASE = "http://localhost:5199";
const park = (p) => p.evaluate(() => { try { Object.defineProperty(document,"hidden",{value:true,configurable:true}); document.dispatchEvent(new Event("visibilitychange")); } catch {} });
const out = {};
const b = await chromium.launch({ headless: true });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

await page.goto(`${BASE}/display/buttons`, { waitUntil: "domcontentloaded" });
await park(page); await page.waitForTimeout(700);
out.buttonProbe = await page.evaluate(() => {
  const o = {}; const seen = new Set();
  for (const btn of Array.from(document.querySelectorAll("button")).slice(0, 60)) {
    const cs = getComputedStyle(btn);
    const label = (btn.textContent || "").trim().slice(0, 18) || btn.className.split(" ")[0];
    if (seen.has(label)) continue; seen.add(label);
    o[label] = { prop: cs.transitionProperty.slice(0,80), timing: cs.transitionTimingFunction.slice(0,120), dur: cs.transitionDuration.slice(0,60) };
    if (seen.size >= 14) break;
  }
  return o;
});

// reveal usage across key routes
const routes = ["/foundations/intro", "/display/card", "/dock/overview", "/compositions/settings"];
out.revealUsage = {};
for (const r of routes) {
  await page.goto(`${BASE}${r}`, { waitUntil: "domcontentloaded" }).catch(()=>{});
  await park(page); await page.waitForTimeout(500);
  out.revealUsage[r] = await page.evaluate(() => ({
    dataReveal: document.querySelectorAll("[data-reveal]").length,
    dataCountup: document.querySelectorAll("[data-countup]").length,
    dataScrollReveal: document.querySelectorAll("[data-scroll-reveal]").length,
    scrollProgress: document.querySelectorAll(".scroll-progress, [class*='scroll-progress']").length,
    staggerReveal: document.querySelectorAll("[data-stagger], .stagger-reveal").length,
  }));
}

// page-transition probe: does router-view wrap a <Transition>?
await page.goto(`${BASE}/foundations/colors`, { waitUntil: "domcontentloaded" });
await park(page); await page.waitForTimeout(300);
out.shellAnim = await page.evaluate(() => {
  const main = document.querySelector("main, [class*='router'], #app > *");
  return { mainClasses: main ? main.className.slice(0,120) : null };
});

await b.close();
console.log(JSON.stringify(out, null, 2));
