import { chromium } from "playwright";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const OUT="/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/backdrop-blur-engage/";
const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto("http://localhost:5200/containers/drawer", { waitUntil: "load" });
await page.waitForTimeout(1000);
await page.getByRole("button", { name: /open drawer/i }).first().click();
await page.waitForTimeout(600);
const info = await page.evaluate(()=>{
  const sheets=[...document.querySelectorAll('.glass-drawer')].map(e=>{
    const r=e.getBoundingClientRect(); const cs=getComputedStyle(e);
    return { t: e.style.getPropertyValue('--glass-drawer-t'), transform: cs.transform.slice(0,30), backdrop:(cs.backdropFilter||cs.webkitBackdropFilter), top: Math.round(r.top), h: Math.round(r.height), visibleInVp: r.top < 900 && r.bottom>0 };
  });
  const prm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  return { prm, sheets };
});
await page.screenshot({ path: OUT+"drawer-prm-open-chrome-light.png", fullPage:false });
console.log(JSON.stringify(info,null,1));
await page.close(); await browser.close();
