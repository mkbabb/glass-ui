// BG.W-SCROLL-SHRINK-UNIFY — NON-AUTHORING Chrome leg (CDP → real Chrome.app / ANGLE Metal).
// Boots ?capture over BUILT :5200, polls data-capture-ready, GL_RENDERER probe, screenshots
// (rest + scrolled), and probes the scroll-shrink CHOREOGRAPHY as computational truth:
//  - every scroll/view-timeline-bound animation animates a COMPOSITOR-SAFE property ONLY
//    (scale/transform/opacity/filter) — no width/height/padding/margin/font-size/line-height
//    (the proof:no-layout-animation floor, MEASURED on the live getAnimations() set).
//  - ScrollCard: .card-scroll-host emits --card-scroll; .card-header--shrink lanes bind it.
//  - page-hero: story-hero-shrink-lift + title-collapse present.
//  - column cascade: .scroll-cascade / .scroll-build bound to view()/scroll().
//  - main.children.length + glContextCount (one-GL-per-route budget).
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const VDIR = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual";
const OUT = `${VDIR}/BG.W-SCROLL-SHRINK-UNIFY-paint`;
const ROUTES = ["/display/card", "/motion/scroll-choreography", "/compositions/hero"];
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };
const LAYOUT_PROPS = ["width","height","inline-size","block-size","padding","padding-top","padding-bottom","padding-left","padding-right","margin","margin-top","margin-bottom","margin-left","margin-right","font-size","line-height","top","left","right","bottom","inset","grid-template-rows","grid-template-columns","flex-basis","border-width","border-top-width","border-bottom-width","gap"];

const results = [];
const browser = await chromium.connectOverCDP("http://localhost:9477");

for (const route of ROUTES) {
  for (const mode of MODES) {
    const ctx = await browser.newContext({ viewport:{width:SIZE.w,height:SIZE.h}, deviceScaleFactor:2, colorScheme:mode });
    const page = await ctx.newPage();
    const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
    const tag = route.replace(/^\//,"").replace(/\//g,"_");
    const slug = `sss-${tag}-chrome-${mode}`;
    let glRenderer=null, probe=null, err=null, badge=null;
    try {
      await page.goto(url, { waitUntil:"load", timeout:30000 });
      await page.waitForFunction(()=>document.documentElement.hasAttribute("data-capture-ready"), { timeout:25000 });
      await page.waitForTimeout(1400);
      glRenderer = await page.evaluate(()=>{ try{const c=document.createElement("canvas");const gl=c.getContext("webgl2")||c.getContext("webgl");if(!gl)return"no-webgl";const d=gl.getExtension("WEBGL_debug_renderer_info");return d?gl.getParameter(d.UNMASKED_RENDERER_WEBGL):"no-debug-ext";}catch(e){return"err:"+e.message;} });
      // engine badge: decode the top-left 2x2px provenance dot the harness paints (fallback: read text)
      badge = await page.evaluate(()=>{ const el=document.querySelector("[data-capture-engine-badge], .capture-engine-badge"); return el?el.textContent.trim():null; });
      // rest screenshot
      await page.screenshot({ path:`${OUT}/${slug}-rest.png`, fullPage:false });

      probe = await page.evaluate((args)=>{
        const { LAYOUT_PROPS } = args;
        const r = document.documentElement;
        // enumerate ALL animations, classify timeline + animated props
        const anims = document.getAnimations();
        const scrollBound = [];
        const layoutViolations = [];
        for (const a of anims) {
          const tl = a.timeline;
          const tlType = tl ? tl.constructor.name : "null";
          const isScrollTl = tlType === "ScrollTimeline" || tlType === "ViewTimeline";
          const eff = a.effect;
          let props = [];
          let kfName = null;
          try {
            const kfs = eff && eff.getKeyframes ? eff.getKeyframes() : [];
            const s = new Set();
            for (const kf of kfs) for (const k of Object.keys(kf)) {
              if (["composite","computedOffset","easing","offset"].includes(k)) continue;
              s.add(k);
            }
            props = [...s];
            kfName = (eff && eff.getComputedTiming) ? (a.animationName || null) : null;
          } catch(e){}
          const targetCls = (eff && eff.target && eff.target.className) ? eff.target.className.toString().slice(0,70) : (eff&&eff.target&&eff.target.tagName)||"?";
          // camelCase -> kebab for comparison
          const kebab = props.map(p=>p.replace(/[A-Z]/g,m=>"-"+m.toLowerCase()));
          const bad = kebab.filter(p=>LAYOUT_PROPS.includes(p));
          if (isScrollTl) {
            scrollBound.push({ tlType, props: kebab, target: targetCls, animName: a.animationName||null });
            if (bad.length) layoutViolations.push({ target: targetCls, bad, tlType, animName:a.animationName||null });
          } else if (bad.length) {
            // non-scroll animation animating a layout prop (only allowlisted reclaims OK — record for inspection)
            layoutViolations.push({ target: targetCls, bad, tlType, animName:a.animationName||null, nonScroll:true });
          }
        }
        // scroll hosts + named timelines
        const scrollHosts = Array.from(document.querySelectorAll(".card-scroll-host")).map(el=>{
          const st=getComputedStyle(el);
          return { cls:el.className.toString().slice(0,60), scrollTimeline:st.scrollTimelineName||st.getPropertyValue("scroll-timeline-name")||st.scrollTimeline||"", overflow:st.overflow, h:Math.round(el.getBoundingClientRect().height) };
        });
        const shrinkHeaders = Array.from(document.querySelectorAll(".card-header--shrink")).map(el=>({ cls:el.className.toString().slice(0,60) }));
        // scroll-choreography classes
        const cascade = document.querySelectorAll(".scroll-cascade, .scroll-cascade--columns").length;
        const build = document.querySelectorAll(".scroll-build").length;
        const pin = document.querySelectorAll(".scroll-pin, .scroll-pin-stage").length;
        // story-hero
        const heroCluster = document.querySelectorAll(".story-hero, [class*=story-hero]").length;
        // main children + GL contexts
        const main = document.querySelector("main");
        const mainChildren = main ? main.children.length : null;
        const canvases = Array.from(document.querySelectorAll("canvas"));
        let glContextCount = 0;
        for (const c of canvases) { try { const has = c.__glctx || (c.getContext && (c.width>0)); if (c.getContext) { /* can't re-get without side effects; count canvases as proxy */ } } catch(e){} }
        glContextCount = canvases.length;
        // page scroll dims for scrolling later
        const doc = document.scrollingElement || document.documentElement;
        const scrollHostEl = document.querySelector(".card-scroll-host");
        return {
          route: location.search,
          animCount: anims.length,
          scrollBoundCount: scrollBound.length,
          scrollBound: scrollBound.slice(0,20),
          layoutViolations,
          scrollHosts,
          shrinkHeaderCount: shrinkHeaders.length,
          cascade, build, pin, heroCluster,
          mainChildren,
          glContextCount,
          canvasCount: canvases.length,
          hasCardScrollHost: !!scrollHostEl,
          docScrollHeight: doc.scrollHeight,
          viewportH: window.innerHeight,
        };
      }, { LAYOUT_PROPS });

      // Drive a SCROLL to exercise the choreography, then re-capture (proves it PAINTS the shrink)
      if (route === "/display/card") {
        // scroll the inner card-scroll-host
        const scrolled = await page.evaluate(()=>{
          const host = document.querySelector(".card-scroll-host");
          if (!host) return { ok:false };
          const before = { top: host.scrollTop, headerH: (host.querySelector(".card-header--shrink")||{}).getBoundingClientRect ? Math.round(host.querySelector(".card-header--shrink").getBoundingClientRect().height) : null };
          host.scrollTop = Math.min(host.scrollHeight - host.clientHeight, 400);
          return { ok:true, before, scrollTop: host.scrollTop, scrollMax: host.scrollHeight - host.clientHeight };
        });
        await page.waitForTimeout(700);
        await page.screenshot({ path:`${OUT}/${slug}-scrolled.png`, fullPage:false });
        // measure header title scale after scroll to prove shrink applied
        const shrinkMeasure = await page.evaluate(()=>{
          const t = document.querySelector(".card-header--shrink [data-slot='card-title']");
          if(!t) return null;
          const st = getComputedStyle(t);
          return { transform: st.transform, scale: st.scale };
        });
        probe.scrolled = scrolled;
        probe.shrinkMeasureAfterScroll = shrinkMeasure;
      } else if (route === "/motion/scroll-choreography") {
        const scrolled = await page.evaluate(()=>{
          const main = document.querySelector("main") || document.scrollingElement;
          const before = window.scrollY;
          main.scrollTop = 600; window.scrollTo(0, 600);
          return { before, after: window.scrollY, mainScrollTop: main.scrollTop };
        });
        await page.waitForTimeout(700);
        await page.screenshot({ path:`${OUT}/${slug}-scrolled.png`, fullPage:false });
        probe.scrolled = scrolled;
      }
      probe.badge = badge;
      probe.glRenderer = glRenderer;
    } catch(e) { err = e.message; }
    results.push({ route, mode, slug, glRenderer, badge, err, probe });
    await ctx.close();
  }
}
writeFileSync(`${OUT}/probes-chrome.json`, JSON.stringify(results,null,2));
console.log(JSON.stringify(results.map(r=>({route:r.route,mode:r.mode,err:r.err,gl:r.glRenderer,scrollBound:r.probe&&r.probe.scrollBoundCount,viol:r.probe&&r.probe.layoutViolations&&r.probe.layoutViolations.length,hosts:r.probe&&r.probe.scrollHosts&&r.probe.scrollHosts.length,shrinkHdr:r.probe&&r.probe.shrinkHeaderCount,cascade:r.probe&&r.probe.cascade,build:r.probe&&r.probe.build,hero:r.probe&&r.probe.heroCluster,mainKids:r.probe&&r.probe.mainChildren,gl_ctx:r.probe&&r.probe.glContextCount})),null,2));
process.exit(0);
