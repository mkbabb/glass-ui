import { chromium } from "playwright";
const b = await chromium.connectOverCDP("http://localhost:9333");
const ctx = b.contexts()[0] || await b.newContext();
const p = await ctx.newPage();
await p.goto("http://localhost:5200/foundations/typography", { waitUntil: "load", timeout: 30000 });
await p.waitForTimeout(1500);
const routes = await p.evaluate(() => {
  // find a vue app / router
  const el = document.querySelector('#app') || document.body.firstElementChild;
  let router = null;
  // vue3: app.__vue_app__.config.globalProperties.$router
  const app = el && el.__vue_app__;
  if (app) router = app.config?.globalProperties?.$router;
  if (!router && window.__router__) router = window.__router__;
  if (!router) return { err: "no router found", keys: el ? Object.keys(el).filter(k=>k.startsWith('__')) : [] };
  const recs = router.getRoutes ? router.getRoutes() : [];
  return { paths: recs.map(r => r.path).filter(pp => pp && !pp.includes(':') && pp !== '/' ) };
});
console.log(JSON.stringify(routes, null, 1));
await p.close(); await b.close();
