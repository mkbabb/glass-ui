import { chromium } from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs";
const GROUND="/Users/mkbabb/Programming/glass-ui/docs/tranches/AZ/audit/ground";
const browser=await chromium.launch();
const ctx=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
const page=await ctx.newPage();
page.on("pageerror",e=>console.log("PAGEERR:",e.message));
page.on("console",m=>{ if(m.type()==="error") console.log("CONSOLE-ERR:",m.text().slice(0,120)); });
console.log("goto...");
await page.goto("http://localhost:5199/dock/overview",{waitUntil:"commit",timeout:15000});
console.log("committed, waiting 2s");
await page.waitForTimeout(2000);
console.log("evaluate title:", await page.title().catch(e=>"ERR:"+e.message));
const quick=await page.evaluate(()=>({ docks:document.querySelectorAll(".glass-dock").length, canvas:document.querySelectorAll("canvas").length, body:!!document.body }))
  .catch(e=>"EVAL-ERR:"+e.message);
console.log("QUICK:", JSON.stringify(quick));
await page.screenshot({path:`${GROUND}/F2-probe-overview.png`}).catch(e=>console.log("SHOT-ERR:",e.message));
await browser.close();
console.log("DONE");
