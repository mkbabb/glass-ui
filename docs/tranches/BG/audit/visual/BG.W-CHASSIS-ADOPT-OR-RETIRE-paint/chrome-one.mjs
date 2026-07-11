import { chromium } from "playwright";
const CDP=process.env.CDP_URL, ORIGIN=process.env.ORIGIN, route=process.env.ROUTE, slug=process.env.SLUG;
const OUT=new URL(".",import.meta.url).pathname;
const browser=await chromium.connectOverCDP(CDP);
const ctx=browser.contexts()[0];
for(const mode of ["light","dark"]){
  const page=await ctx.newPage();
  await page.setViewportSize({width:1440,height:900});
  await page.goto(`${ORIGIN}/?capture=${encodeURIComponent(route)}&mode=${mode}`,{waitUntil:"load",timeout:30000});
  let ready=false; const t0=Date.now();
  while(Date.now()-t0<15000){ready=await page.evaluate(()=>document.documentElement.hasAttribute("data-capture-ready"));if(ready)break;await page.waitForTimeout(150);}
  await page.waitForTimeout(600);
  const gl=await page.evaluate(()=>{try{const c=document.createElement("canvas");const g=c.getContext("webgl2")||c.getContext("webgl");if(!g)return"no-webgl";const e=g.getExtension("WEBGL_debug_renderer_info");return e?g.getParameter(e.UNMASKED_RENDERER_WEBGL):g.getParameter(g.RENDERER);}catch(e){return"err"}});
  const dom=await page.evaluate(()=>{const s=document.querySelector("main")||document.body;const h=[...s.querySelectorAll("h1")].map(e=>(e.textContent||"").trim()).filter(Boolean);return{clusterCount:s.querySelectorAll(".story-header-cluster").length,headerTags:s.querySelectorAll("header").length,h1:h,studioTitles:[...s.querySelectorAll("h1,h2,h3")].filter(e=>/studio/i.test(e.textContent||"")).length,canvasCount:s.querySelectorAll("canvas").length};});
  const outPath=`${OUT}chrome__${slug}_${mode}.png`;
  await page.screenshot({path:outPath,fullPage:true});
  console.log(JSON.stringify({route,mode,ready,gl,dom,outPath}));
  await page.close();
}
await browser.close().catch(()=>{});
