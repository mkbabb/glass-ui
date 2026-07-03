import { chromium } from "playwright-core";
const browser = await chromium.connectOverCDP("http://127.0.0.1:9345");
const ctx = browser.contexts()[0];
const page = ctx.pages()[0] ?? (await ctx.newPage());
await page.goto("http://localhost:5200/dock/overview", { waitUntil: "networkidle" });
await new Promise(r => setTimeout(r, 2500));
const info = await page.evaluate(() => ({
  url: location.href,
  docks: [...document.querySelectorAll(".glass-dock")].map(d => ({
    cls: d.className,
    rect: (() => { const r = d.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)]; })(),
  })),
  main: !!document.querySelector("main"),
  h1: document.querySelector("h1")?.textContent?.trim(),
  errors: window.__errors ?? null,
}));
console.log(JSON.stringify(info, null, 2));
await browser.close();
