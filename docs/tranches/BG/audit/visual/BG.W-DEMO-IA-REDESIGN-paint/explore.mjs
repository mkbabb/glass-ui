import { chromium } from "playwright";
const b = await chromium.connectOverCDP("http://localhost:9333");
const ctx = b.contexts()[0];
const page = await ctx.newPage();
await page.goto("http://localhost:5200/display/atoms", { waitUntil: "load" });
// wait for app mount
await page.waitForSelector("main", { timeout: 15000 });
await page.waitForTimeout(1500);
const info = await page.evaluate(() => {
  const out = {};
  // find scroll containers
  const main = document.querySelector("main");
  out.mainClass = main ? main.className : null;
  out.mainScrollHeight = main ? main.scrollHeight : null;
  out.mainClientHeight = main ? main.clientHeight : null;
  out.mainOverflowY = main ? getComputedStyle(main).overflowY : null;
  // shrink element
  const shrink = document.querySelector(".story-hero-shrink");
  out.shrinkExists = !!shrink;
  if (shrink) {
    out.shrinkClass = shrink.className;
    const cs = getComputedStyle(shrink);
    out.shrinkScale = cs.scale;
    out.shrinkTranslate = cs.translate;
    out.shrinkAnimName = cs.animationName;
    out.shrinkAnimTimeline = cs.animationTimeline;
    out.shrinkPosition = cs.position;
  }
  const scrollAway = document.querySelector(".story-hero-scroll-away");
  out.scrollAwayExists = !!scrollAway;
  // title element inside cluster
  const title = document.querySelector(".story-hero-shrink .story-hero-title, .story-hero-shrink h1, .story-hero-cluster h1");
  if (title) {
    out.titleTag = title.tagName;
    out.titleClass = title.className;
    const tc = getComputedStyle(title);
    out.titleOpacity = tc.opacity;
    out.titleScale = tc.scale;
  }
  // getAnimations count
  out.docAnims = document.getAnimations().length;
  // which element is the scroll timeline source? find all scrollable ancestors of shrink
  if (shrink) {
    let el = shrink.parentElement, chain = [];
    while (el) {
      const s = getComputedStyle(el);
      if (["auto","scroll"].includes(s.overflowY) && el.scrollHeight > el.clientHeight+2) {
        chain.push({tag: el.tagName, cls: el.className.slice(0,50), sh: el.scrollHeight, ch: el.clientHeight});
      }
      el = el.parentElement;
    }
    out.scrollAncestors = chain;
  }
  return out;
});
console.log(JSON.stringify(info, null, 2));
await page.close();
await b.close();
