import { chromium } from "playwright";
const b = await chromium.connectOverCDP("http://localhost:9333");
const ctx = b.contexts()[0] || await b.newContext();
const p = await ctx.newPage();
await p.setViewportSize({ width: 1440, height: 900 });
const OUT = new URL(".", import.meta.url).pathname;
const jobs = JSON.parse(process.argv[2]); // [{route,mode,switchTo?}]
async function ready(){const t0=Date.now();while(Date.now()-t0<15000){if(await p.evaluate(()=>document.documentElement.hasAttribute("data-capture-ready")))return Date.now()-t0;await p.waitForTimeout(150);}return -1;}
for (const j of jobs) {
  await p.goto(`http://localhost:5200/?capture=${encodeURIComponent(j.route)}&mode=${j.mode}`, { waitUntil: "load", timeout: 30000 });
  const r = await ready(); await p.waitForTimeout(400);
  let sw = "";
  if (j.switchTo) {
    sw = await p.evaluate((needle) => {
      const c=[...document.querySelectorAll('button,[role="tab"]')].find(e=>new RegExp(needle,"i").test(e.textContent||""));
      if(c){c.click();return "clicked:"+(c.textContent||"").trim().slice(0,20);} return "NOTFOUND";
    }, j.switchTo);
    await p.waitForTimeout(700);
  }
  const gl = await p.evaluate(()=>{try{const c=document.createElement("canvas");const g=c.getContext("webgl2");const e=g.getExtension("WEBGL_debug_renderer_info");return e?g.getParameter(e.UNMASKED_RENDERER_WEBGL):"?";}catch(e){return "no-gl";}});
  const fn = `${j.route.replace(/\//g,"-").replace(/^-/,"")}${j.switchTo?"-"+j.switchTo:""}-chrome-${j.mode}.png`;
  await p.screenshot({ path: OUT + fn, fullPage: true });
  console.log(`CHROME ${j.route} ${j.mode}${j.switchTo?" ["+sw+"]":""} ready=${r}ms GL=${gl.slice(0,55)} → ${fn}`);
}
await p.close(); await b.close();
