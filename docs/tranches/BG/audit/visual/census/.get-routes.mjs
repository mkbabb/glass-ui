import { chromium } from "playwright";
const b = await chromium.connectOverCDP("http://localhost:9333");
const ctx = b.contexts()[0] || await b.newContext();
const p = await ctx.newPage();
await p.goto("http://localhost:5200/", { waitUntil: "load", timeout: 30000 });
await p.waitForTimeout(1500);
// Try the app's router / manifest export
const routes = await p.evaluate(() => {
  // Vue router instance often on window or attached; also scan all <a href> in nav
  const set = new Set();
  document.querySelectorAll('a[href^="/"], a[href^="#/"]').forEach(a => {
    let h = a.getAttribute('href'); if(h) set.add(h.replace(/^#/, ''));
  });
  // also look for a global route registry
  const g = (window.__DEMO_ROUTES__ || window.__ROUTES__ || null);
  return { fromLinks: [...set], fromGlobal: g };
});
console.log(JSON.stringify(routes, null, 1));
await p.close(); await b.close();
