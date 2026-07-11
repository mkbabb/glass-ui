// Cross-engine computational confirmation: does WebKit's CSS engine ALSO freeze the
// deep LERP at :root's --glass-depth initial (registered @property eager substitution)?
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { webkit } = require("playwright");
const browser = await webkit.launch();
const out = {};
for (const mode of ["light","dark"]) {
  const ctx = await browser.newContext({ viewport:{width:1440,height:900}, colorScheme:mode });
  const page = await ctx.newPage();
  await page.goto(`http://localhost:5200/?capture=/display/buttons&mode=${mode}`, { waitUntil:"load", timeout:30000 });
  try { await page.waitForFunction(()=>document.documentElement.hasAttribute("data-capture-ready"),{timeout:25000}); } catch {}
  const probe = await page.evaluate(()=>{
    const blurPx=(bf)=>{const m=/blur\(([-\d.]+)px\)/.exec(bf||"");return m?parseFloat(m[1]):null;};
    const satVal=(bf)=>{const m=/saturate\(([-\d.]+)\)/.exec(bf||"");return m?parseFloat(m[1]):null;};
    function mk(cls,depth){
      const el=document.createElement("div");el.className=cls;
      el.style.cssText="position:fixed;left:-9999px;width:120px;height:80px";
      if(depth!=null) el.style.setProperty("--glass-depth",String(depth));
      document.body.appendChild(el);const cs=getComputedStyle(el);
      const bf=(cs.backdropFilter||cs.webkitBackdropFilter||"").trim();
      const r={cls,depth,glassDepth:cs.getPropertyValue("--glass-depth").trim(),
        deepActiveRadius:cs.getPropertyValue("--glass-blur-deep-active-radius").trim(),
        blurPx:blurPx(bf),satVal:satVal(bf)};
      el.remove();return r;
    }
    return {
      grades:{content:getComputedStyle(document.documentElement).getPropertyValue("--glass-depth-content").trim(),
              popover:getComputedStyle(document.documentElement).getPropertyValue("--glass-depth-popover").trim(),
              menu:getComputedStyle(document.documentElement).getPropertyValue("--glass-depth-menu").trim()},
      overlayScalar:mk("glass-overlay",null).glassDepth,
      floatingScalar:mk("glass-floating",null).glassDepth,
      contentScalar:mk("glass-card",null).glassDepth,
      deepContent:mk("glass-floating glass-deep",0.35),
      deepPopover:mk("glass-floating glass-deep",0.7),
      deepMenu:mk("glass-floating glass-deep",1),
      deepFloor:mk("glass-floating glass-deep",0),
      realCtaDeep:mk("glass-wash btn-glass glass-deep",null),
    };
  });
  out[mode]=probe;
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(out,null,2));
