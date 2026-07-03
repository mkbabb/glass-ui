import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");
const browser = await chromium.connectOverCDP("http://localhost:9477");
const ctx = await browser.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2, colorScheme:"light" });
const page = await ctx.newPage();
await page.goto("http://localhost:5200/?capture=/display/card&mode=light", { waitUntil:"load", timeout:30000 });
await page.waitForFunction(()=>document.documentElement.hasAttribute("data-capture-ready"), { timeout:25000 });
await page.waitForTimeout(800);

// mark the first card-title inside a shrink header for CDP lookup
const marked = await page.evaluate(()=>{
  const t = document.querySelector(".card-header--shrink > [data-slot='card-title']");
  if(!t) return false;
  t.setAttribute("data-probe-target","1");
  const st = getComputedStyle(t);
  return {
    transformOrigin: st.transformOrigin,
    animationName: st.animationName,
    animationTimeline: st.animationTimeline,
    animationRange: st.getPropertyValue("animation-range"),
  };
});
console.log("computed on title:", JSON.stringify(marked));

// CDP matched styles
const client = await page.context().newCDPSession(page);
await client.send("DOM.enable");
await client.send("CSS.enable");
const { root } = await client.send("DOM.getDocument", { depth: -1 });
const { nodeId } = await client.send("DOM.querySelector", { nodeId: root.nodeId, selector: "[data-probe-target='1']" });
const matched = await client.send("CSS.getMatchedStylesForNode", { nodeId });
// filter rules that mention animation
const hits = [];
for (const m of matched.matchedCSSRules || []) {
  const sel = m.rule.selectorList.text;
  const props = m.rule.style.cssProperties.filter(p=>/animation|transform-origin|scale/.test(p.name)).map(p=>p.name+":"+p.value);
  const media = (m.rule.media||[]).map(mm=>mm.text);
  if (props.length) hits.push({ sel, media, props, matchingSelectors: m.matchingSelectors });
}
console.log("=== matched rules touching animation/transform-origin/scale ===");
console.log(JSON.stringify(hits, null, 2));
await ctx.close();
process.exit(0);
