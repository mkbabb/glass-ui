import { chromium } from "playwright";
const b = await chromium.connectOverCDP("http://localhost:9333");
const ctx = b.contexts()[0];
const OUT = "docs/tranches/BG/audit/visual/BG.W-DEMO-IA-REDESIGN-paint";
const ROUTES = ["/display/atoms","/data/metrics","/motion/scroll","/motion/text-motion","/forms/inputs","/forms/toggle","/data/table","/data/timeline","/feedback/toast","/foundations/paper-glass","/dock/overview"];
const results=[];
for (const route of ROUTES) {
  for (const mode of ["light","dark"]) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`http://localhost:5200/?capture=${route}&mode=${mode}`, { waitUntil: "load" });
    let ready=false;
    try { await page.waitForFunction(()=>document.documentElement.hasAttribute("data-capture-ready"), { timeout: 22000 }); ready=true; } catch(e){}
    await page.waitForTimeout(300);
    const meta = await page.evaluate(()=>{
      const notFound = !!document.querySelector(".not-found, [data-not-found]") || /Lost in the lattice|drifted off the graph/.test(document.body.innerText);
      const fam = !!document.querySelector(".family-tabs, [role='tablist'] .segmented-tab, .segmented-tabs");
      const shrink = !!document.querySelector(".story-hero-shrink");
      const scrollAway = !!document.querySelector(".story-hero-scroll-away");
      const h1 = document.querySelectorAll(".story-hero-cluster h1, .story-page-article h1").length;
      const badge = document.querySelector("[data-engine-badge], .capture-engine-badge");
      return { notFound, fam, shrink, scrollAway, h1count: h1, hasBadge: !!badge };
    });
    const rk = route.replace(/\//g,"_").replace(/^_/,"");
    const path = `${OUT}/chrome_cap_${rk}_${mode}.png`;
    await page.screenshot({ path, fullPage: false });
    results.push({ route, mode, ready, ...meta });
    await page.close();
  }
}
console.log(JSON.stringify(results,null,1));
await b.close();
