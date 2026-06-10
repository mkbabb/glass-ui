import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
const VISUAL_DIR = resolve(fileURLToPath(new URL("../docs/tranches/AY/audit/visual/", import.meta.url)));
const BASE = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5199";

async function shot(theme, kind) {
  const b = await chromium.launch();
  try {
    const ctx = await b.newContext({ viewport:{width:1280,height:800}, deviceScaleFactor:2, colorScheme: theme });
    const p = await ctx.newPage();
    if (kind === "drawer") {
      await p.goto(`${BASE}/containers/drawer`, { waitUntil:"domcontentloaded", timeout:20000 });
      await p.evaluate((t)=>{ if(t==="dark")document.documentElement.classList.add("dark"); else document.documentElement.classList.remove("dark"); }, theme);
      await p.waitForTimeout(500);
      await p.getByRole("button",{name:"Open drawer"}).first().click({timeout:8000});
      await p.waitForTimeout(800);
      const name=`W-GLASS-drawer-glass-${theme}.png`;
      await p.locator(".glass-drawer").first().screenshot({path:resolve(VISUAL_DIR,name)}).catch(()=>p.screenshot({path:resolve(VISUAL_DIR,name)}));
      console.log("OK",name);
    } else if (kind === "notif") {
      await p.goto(`${BASE}/feedback/notification`, { waitUntil:"domcontentloaded", timeout:20000 });
      await p.evaluate((t)=>{ if(t==="dark")document.documentElement.classList.add("dark"); }, theme);
      await p.waitForTimeout(500);
      await p.getByRole("button",{name:"Success"}).first().click({timeout:8000});
      await p.getByRole("button",{name:"Info"}).first().click({timeout:8000});
      await p.waitForTimeout(600);
      const name=`W-GLASS-notification-floating-${theme}.png`;
      await p.locator(".glass-floating").first().screenshot({path:resolve(VISUAL_DIR,name)}).catch(()=>p.screenshot({path:resolve(VISUAL_DIR,name)}));
      console.log("OK",name);
    } else if (kind === "idle") {
      await p.goto(`${BASE}/display/card`, { waitUntil:"domcontentloaded", timeout:20000 });
      await p.evaluate((t)=>{ if(t==="dark")document.documentElement.classList.add("dark"); }, theme);
      await p.mouse.move(0,0); await p.waitForTimeout(900);
      const after = await p.evaluate(()=>{ if(typeof document.getAnimations!=="function")return -1; let c=0; for(const a of document.getAnimations()) if(/--specular-/.test(a.transitionProperty||""))c++; return c; });
      await p.screenshot({path:resolve(VISUAL_DIR,`W-GLASS-idle-tracks-after-${theme}.png`)});
      await p.evaluate((cnt)=>{ const d=document.createElement("div"); d.style.cssText="position:fixed;top:12px;left:12px;z-index:99999;padding:8px 14px;border-radius:10px;font:600 13px/1.4 ui-monospace,monospace;background:rgba(180,40,40,.92);color:#fff"; d.textContent=`BEFORE (cited I.W6 measurement): ${cnt} idle specular tracks at rest`; document.body.appendChild(d); },19);
      await p.screenshot({path:resolve(VISUAL_DIR,`W-GLASS-idle-tracks-before-${theme}.png`)});
      console.log("OK idle",theme,"after-count:",after);
    }
    await ctx.close();
  } finally { await b.close(); }
}
const [,,theme,kind] = process.argv;
await shot(theme, kind);
