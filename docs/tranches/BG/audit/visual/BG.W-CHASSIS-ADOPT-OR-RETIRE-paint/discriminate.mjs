import { chromium } from "playwright";
const browser = await chromium.connectOverCDP(process.env.CDP_URL);
const ctx = browser.contexts()[0];
const routes = (process.env.ROUTES||"").split(",");
for (const route of routes) {
  const page = await ctx.newPage();
  await page.goto(`${process.env.ORIGIN}/?capture=${encodeURIComponent(route)}&mode=light`, { waitUntil:"load", timeout:30000 });
  let ready=false; const t0=Date.now();
  while(Date.now()-t0<15000){ ready=await page.evaluate(()=>document.documentElement.hasAttribute("data-capture-ready")); if(ready)break; await page.waitForTimeout(150);}
  const d = await page.evaluate(()=>{
    const scope=document.querySelector("main")||document.body;
    const clusters=scope.querySelectorAll(".story-header-cluster");
    const displayTitles=[...scope.querySelectorAll("h1")].map(e=>(e.textContent||"").trim()).filter(Boolean);
    const is404=/lost in the lattice|404/i.test(scope.textContent||"");
    const studioTitles=[...scope.querySelectorAll("h1,h2,h3")].filter(e=>/studio/i.test(e.textContent||"")).map(e=>e.textContent.trim());
    return { is404, clusterCount:clusters.length, headerTags:scope.querySelectorAll("header").length, h1:displayTitles, studioTitles };
  });
  console.log(route.padEnd(34), JSON.stringify(d));
  await page.close();
}
await browser.close().catch(()=>{});
