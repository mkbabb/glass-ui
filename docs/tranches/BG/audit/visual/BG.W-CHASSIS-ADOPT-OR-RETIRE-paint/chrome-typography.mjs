import { chromium } from "playwright";
const CDP = process.env.CDP_URL, ORIGIN = process.env.ORIGIN;
const OUT = new URL(".", import.meta.url).pathname;
const route = "/foundations/typography";
const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0];
for (const mode of ["light","dark"]) {
  const page = await ctx.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${ORIGIN}/?capture=${encodeURIComponent(route)}&mode=${mode}`, { waitUntil:"load", timeout:30000 });
  let ready=false; const t0=Date.now();
  while(Date.now()-t0<15000){ ready=await page.evaluate(()=>document.documentElement.hasAttribute("data-capture-ready")); if(ready)break; await page.waitForTimeout(150);}
  await page.waitForTimeout(500);
  const dom = await page.evaluate(()=>{
    const scope=document.querySelector("main")||document.body;
    const h1s=[...document.querySelectorAll("h1")];
    return { h1Count:h1s.length, h1texts:h1s.map(e=>(e.textContent||"").trim()).filter(Boolean),
      inlineHdr:scope.querySelectorAll("header").length,
      studioTitles:[...document.querySelectorAll("h1,h2,h3")].filter(e=>/studio/i.test(e.textContent||"")).length };
  });
  const outPath=`${OUT}chrome__foundations_typography_${mode}.png`;
  await page.screenshot({ path:outPath, fullPage:true });
  console.log(JSON.stringify({route,mode,ready,dom,outPath}));
  await page.close();
}
await browser.close().catch(()=>{});
