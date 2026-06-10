import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
const VISUAL_DIR = resolve(fileURLToPath(new URL("../docs/tranches/AY/audit/visual/", import.meta.url)));
const BASE = "http://localhost:5199";
const theme = process.argv[2];
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:1280,height:800}, deviceScaleFactor:2, colorScheme: theme });
const p = await ctx.newPage();
console.log("goto...");
await p.goto(`${BASE}/display/card`, { waitUntil:"commit", timeout:15000 });
await p.waitForSelector(".glass-card, [class*='glass-']", { timeout:10000 }).catch(()=>console.log("no glass sel"));
if (theme==="dark") await p.evaluate(()=>document.documentElement.classList.add("dark"));
await p.waitForTimeout(700);
console.log("evaluating tracks (raced)...");
const after = await Promise.race([
  p.evaluate(()=>{ if(typeof document.getAnimations!=="function")return -1; let c=0; for(const a of document.getAnimations()) if(/--specular-/.test(a.transitionProperty||""))c++; return c; }),
  new Promise(r=>setTimeout(()=>r("TIMEOUT"),5000))
]);
console.log("after-count:", after);
await p.screenshot({path:resolve(VISUAL_DIR,`W-GLASS-idle-tracks-after-${theme}.png`)});
await p.evaluate((cnt)=>{ const d=document.createElement("div"); d.style.cssText="position:fixed;top:12px;left:12px;z-index:99999;padding:8px 14px;border-radius:10px;font:600 13px/1.4 ui-monospace,monospace;background:rgba(180,40,40,.92);color:#fff"; d.textContent=`BEFORE (cited I.W6 measurement): ${cnt} idle specular tracks at rest`; document.body.appendChild(d); },19);
await p.screenshot({path:resolve(VISUAL_DIR,`W-GLASS-idle-tracks-before-${theme}.png`)});
console.log("DONE", theme);
await ctx.close(); await b.close();
