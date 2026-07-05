import { chromium } from "playwright";
const b = await chromium.connectOverCDP("http://localhost:9477");
const ctx = await b.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2, colorScheme:"light" });
const p = await ctx.newPage();
await p.goto("http://localhost:5200/?capture=%2Fdock%2Foverview&mode=light",{waitUntil:"load"});
await p.waitForFunction(()=>document.documentElement.hasAttribute("data-capture-ready"),{timeout:30000});
const r = await p.evaluate(()=>{
  const root=document.documentElement; const rs=getComputedStyle(root);
  // ST2: dead --glass-backdrop-hue must be ABSENT; --glass-ambient-hue is the live channel
  const deadHue = rs.getPropertyValue("--glass-backdrop-hue").trim();
  // ST1: clear-scrim static floor — read from a dock (any element inheriting the token)
  const dock = document.querySelector(".glass-dock");
  const ds = dock?getComputedStyle(dock):rs;
  const clearScrimStrength = ds.getPropertyValue("--glass-clear-scrim-strength").trim();
  // count any rendered .glass-clear / [data-surface=clear]
  const clearEls = document.querySelectorAll(".glass-clear,[data-surface='clear']").length;
  return { deadHue: deadHue||"(absent)", clearScrimStrength: clearScrimStrength||"(unset)", clearEls };
});
console.log(JSON.stringify(r,null,2));
await ctx.close(); await b.close();
