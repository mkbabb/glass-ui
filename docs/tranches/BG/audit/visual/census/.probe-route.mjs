import { chromium } from "playwright";
const b = await chromium.connectOverCDP("http://localhost:9333");
const ctx = b.contexts()[0] || await b.newContext();
const p = await ctx.newPage();
const routes = process.argv[2].split(",");
for (const route of routes) {
  await p.goto(`http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=dark`, { waitUntil: "load", timeout: 30000 });
  // poll ready
  const t0=Date.now(); let ready=false;
  while(Date.now()-t0<15000){ if(await p.evaluate(()=>document.documentElement.hasAttribute("data-capture-ready"))){ready=true;break;} await p.waitForTimeout(150);}
  await p.waitForTimeout(300);
  const info = await p.evaluate(() => {
    const main = document.querySelector("main") || document.body;
    const h = main.innerText.slice(0, 200).replace(/\n+/g," | ");
    const is404 = /drifted off the grid|not found|404/i.test(document.body.innerText) && main.querySelectorAll("*").length < 40;
    return { title: document.title, textStart: h, childCount: main.querySelectorAll("*").length, is404 };
  });
  console.log(`[${route}] ready=${ready} 404?=${info.is404} kids=${info.childCount}\n   "${info.textStart}"`);
}
await p.close(); await b.close();
