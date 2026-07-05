import { chromium } from "playwright";
const CDP = "http://localhost:9477";
const BASE = "http://localhost:5200";
const browser = await chromium.connectOverCDP(CDP);
const ctx = await browser.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2, colorScheme:"light" });
const page = await ctx.newPage();
const url = `${BASE}/?capture=${encodeURIComponent("/dock/overview")}&mode=light`;
await page.goto(url,{waitUntil:"load",timeout:30000});
await page.waitForFunction(()=>document.documentElement.hasAttribute("data-capture-ready"),{timeout:30000});
const t0 = Date.now();
async function snap(label){
  return await page.evaluate((label)=>{
    const docks = Array.from(document.querySelectorAll(".glass-dock"));
    const sampled = document.querySelectorAll("[data-backdrop-sampled]").length;
    const prm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvases = Array.from(document.querySelectorAll("canvas")).map(c=>({
      w:c.width,h:c.height,
      field: c.hasAttribute("data-glass-field-canvas") || (c.closest("[data-glass-field-canvas]")!=null),
      rectW: Math.round(c.getBoundingClientRect().width),
      rectH: Math.round(c.getBoundingClientRect().height),
    }));
    const per = docks.slice(0,14).map((d,i)=>{
      const cs=getComputedStyle(d); const r=d.getBoundingClientRect();
      return {
        i, top: Math.round(r.top), h: Math.round(r.height),
        onscreen: r.top < innerHeight && r.bottom > 0,
        sample: d.getAttribute("data-glass-sample"),
        witnessAttr: d.hasAttribute("data-backdrop-sampled"),
        luma: cs.getPropertyValue("--glass-backdrop-luma").trim(),
        hue: cs.getPropertyValue("--glass-ambient-hue").trim(),
        sampledVar: cs.getPropertyValue("--glass-backdrop-sampled").trim(),
        bucket: cs.getPropertyValue("--glass-backdrop").trim(),
        inlineLuma: d.style.getPropertyValue("--glass-backdrop-luma") || "(none)",
      };
    });
    return { label, dockCount: docks.length, sampled, prm,
      canvases, per };
  }, label);
}
const r0 = await snap("at-ready");
await page.waitForTimeout(6000);
const r1 = await snap("plus-6s");
console.log(JSON.stringify({r0,r1},null,2));
await ctx.close(); await browser.close();
