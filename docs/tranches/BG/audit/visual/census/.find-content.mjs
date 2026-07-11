import { chromium } from "playwright";
const b = await chromium.connectOverCDP("http://localhost:9333");
const ctx = b.contexts()[0] || await b.newContext();
const p = await ctx.newPage();
const routes = process.argv[2].split(",");
const needle = process.argv[3]; // regex
for (const route of routes) {
  await p.goto(`http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=dark`, { waitUntil: "load", timeout: 30000 });
  const t0=Date.now(); while(Date.now()-t0<15000){ if(await p.evaluate(()=>document.documentElement.hasAttribute("data-capture-ready")))break; await p.waitForTimeout(150);}
  await p.waitForTimeout(400);
  const found = await p.evaluate((re) => {
    const rx = new RegExp(re, "i");
    // find avatar-like: elements whose text is 2-uppercase initials on a colored chip, OR matches needle
    const hits = [];
    document.querySelectorAll("*").forEach(el => {
      if (el.children.length === 0) {
        const t = (el.textContent||"").trim();
        if (t && rx.test(t) && t.length < 30) {
          const cs = getComputedStyle(el);
          hits.push({ t: t.slice(0,24), cls: (el.className?.toString?.()||"").slice(0,40), color: cs.color });
        }
      }
    });
    return hits.slice(0, 12);
  }, needle);
  console.log(`[${route}] ${found.length} hits for /${needle}/`);
  found.forEach(h => console.log(`   "${h.t}"  color=${h.color}  .${h.cls}`));
}
await p.close(); await b.close();
