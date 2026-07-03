import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");
const browser = await chromium.connectOverCDP("http://localhost:9477");
const ctx = await browser.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2, colorScheme:"light" });
const page = await ctx.newPage();
// LIVE route (no ?capture harness freeze) — history routing
await page.goto("http://localhost:5200/display/card", { waitUntil:"load", timeout:30000 });
await page.waitForTimeout(2500);
const hasCapture = await page.evaluate(()=>document.documentElement.hasAttribute("data-capture"));
const found = await page.evaluate(()=>{
  const hosts = document.querySelectorAll(".card-scroll-host");
  return { hasCapture: document.documentElement.hasAttribute("data-capture"), hostCount: hosts.length,
    shrinkCount: document.querySelectorAll(".card-header--shrink").length };
});
console.log("route loaded, hasCapture=", hasCapture, JSON.stringify(found));

// find first card-scroll-host with a shrink header + scrollable content, measure title scale at 0 and at >120px
const result = await page.evaluate(async ()=>{
  const hosts = Array.from(document.querySelectorAll(".card-scroll-host"));
  const out = [];
  for (const host of hosts) {
    const title = host.querySelector(".card-header--shrink > [data-slot='card-title']");
    if (!title) continue;
    const scrollMax = host.scrollHeight - host.clientHeight;
    if (scrollMax < 20) { out.push({ skipped:"no-overflow", scrollMax }); continue; }
    // at rest
    host.scrollTop = 0;
    await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
    const rest = getComputedStyle(title).scale;
    const restRect = title.getBoundingClientRect();
    // scroll past the 120px range
    host.scrollTop = Math.min(scrollMax, 200);
    await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
    const scrolled = getComputedStyle(title).scale;
    const scrolledRect = title.getBoundingClientRect();
    const animName = getComputedStyle(title).animationName;
    const animTl = getComputedStyle(title).animationTimeline;
    out.push({ scrollMax, restScale: rest, scrolledScale: scrolled,
      restW: +restRect.width.toFixed(1), scrolledW: +scrolledRect.width.toFixed(1),
      animName, animTl });
    if (out.length >= 3) break;
  }
  return out;
});
console.log("LIVE scroll measurements:");
console.log(JSON.stringify(result, null, 2));
await ctx.close();
process.exit(0);
