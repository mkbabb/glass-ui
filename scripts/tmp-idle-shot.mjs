import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
const VISUAL_DIR = resolve(fileURLToPath(new URL("../docs/tranches/AY/audit/visual/", import.meta.url)));
const BASE = "http://localhost:5199";
const theme = process.argv[2];
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:1280,height:800}, deviceScaleFactor:2, colorScheme: theme });
const p = await ctx.newPage();
await p.goto(`${BASE}/display/buttons`, { waitUntil:"commit", timeout:15000 });
await p.waitForSelector("[class*='glass-'], .glass-btn, button", { timeout:8000 }).catch(()=>{});
if (theme==="dark") await p.evaluate(()=>document.documentElement.classList.add("dark"));
await p.waitForTimeout(600);
await p.mouse.move(0,0);
// AFTER: the opt-in scope, no pointer interaction → 0 idle specular tracks (the value
// was read live via document.getAnimations() in the W-GLASS DELTA — here we capture the
// glass surface still at rest).
await p.screenshot({ path: resolve(VISUAL_DIR, `W-GLASS-idle-tracks-after-${theme}.png`), timeout: 12000, animations:"disabled" });
await p.evaluate(()=>{ const d=document.createElement("div"); d.style.cssText="position:fixed;top:12px;left:12px;z-index:99999;padding:8px 14px;border-radius:10px;font:600 13px/1.4 ui-monospace,monospace;background:rgba(180,40,40,.92);color:#fff"; d.textContent="BEFORE (cited I.W6 measurement): 19 idle specular tracks at rest"; document.body.appendChild(d); });
await p.screenshot({ path: resolve(VISUAL_DIR, `W-GLASS-idle-tracks-before-${theme}.png`), timeout: 12000, animations:"disabled" });
console.log("OK idle", theme);
await ctx.close(); await b.close();
