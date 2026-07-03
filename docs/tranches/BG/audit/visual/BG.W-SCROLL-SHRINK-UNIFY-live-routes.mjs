import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");
const browser = await chromium.connectOverCDP("http://localhost:9477");
const LAYOUT_PROPS = ["width","height","inlineSize","blockSize","padding","paddingTop","paddingBottom","paddingLeft","paddingRight","margin","marginTop","marginBottom","fontSize","lineHeight","top","left","right","bottom","inset","gridTemplateRows","gridTemplateColumns","flexBasis","borderWidth","borderTopWidth","borderBottomWidth","gap"];

async function probeRoute(route, scrollTarget){
  const ctx = await browser.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2, colorScheme:"light" });
  const page = await ctx.newPage();
  await page.goto(`http://localhost:5200${route}`, { waitUntil:"load", timeout:30000 });
  await page.waitForTimeout(2500);
  const res = await page.evaluate(async (args)=>{
    const { LAYOUT_PROPS } = args;
    // enumerate scroll/view-timeline animations, classify compositor-safety
    function scan(){
      const anims = document.getAnimations();
      const bound = [];
      const violations = [];
      for (const a of anims){
        const tl = a.timeline; const tlType = tl?tl.constructor.name:"null";
        const isScroll = tlType==="ScrollTimeline" || tlType==="ViewTimeline";
        if (!isScroll) continue;
        let props=[]; try{ const kfs=a.effect.getKeyframes(); const s=new Set(); for(const kf of kfs) for(const k of Object.keys(kf)){ if(["composite","computedOffset","easing","offset"].includes(k))continue; s.add(k);} props=[...s]; }catch(e){}
        const bad = props.filter(p=>LAYOUT_PROPS.includes(p));
        const target = (a.effect&&a.effect.target)?(a.effect.target.className||a.effect.target.tagName).toString().slice(0,50):"?";
        bound.push({ tlType, name:a.animationName, props, target });
        if (bad.length) violations.push({ name:a.animationName, bad, target });
      }
      return { total:anims.length, boundCount:bound.length, bound:bound.slice(0,30), violations };
    }
    const atRest = scan();
    // scroll the scroller
    const main = document.querySelector("main") || document.scrollingElement || document.documentElement;
    const beforeY = main.scrollTop;
    main.scrollTop = 500;
    window.scrollTo(0,500);
    await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
    const afterY = main.scrollTop;
    const afterScroll = scan();
    // sample a couple bound targets' transform to prove response to scroll
    return { atRest, afterScroll, scrolledFrom:beforeY, scrolledTo:afterY,
      cascadeEls: document.querySelectorAll(".scroll-cascade").length,
      buildEls: document.querySelectorAll(".scroll-build").length,
      pinEls: document.querySelectorAll(".scroll-pin, .scroll-pin-stage").length,
      heroShrink: document.querySelectorAll(".story-hero-shrink").length,
      heroScrollAway: document.querySelectorAll(".story-hero-scroll-away").length,
    };
  }, { LAYOUT_PROPS });
  await ctx.close();
  return { route, res };
}

for (const route of ["/motion/scroll-choreography","/compositions/hero"]){
  const r = await probeRoute(route);
  console.log("=== LIVE", route, "===");
  console.log("cascadeEls:", r.res.cascadeEls, "buildEls:", r.res.buildEls, "pinEls:", r.res.pinEls, "heroShrink:", r.res.heroShrink, "heroScrollAway:", r.res.heroScrollAway);
  console.log("scrollBound atRest:", r.res.atRest.boundCount, "afterScroll:", r.res.afterScroll.boundCount, "violations:", JSON.stringify(r.res.afterScroll.violations));
  console.log("bound sample:", JSON.stringify(r.res.afterScroll.bound.slice(0,12), null, 1));
}
process.exit(0);
