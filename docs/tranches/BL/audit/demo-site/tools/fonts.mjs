// Font arrival check (read-only). Machine law: guarded browser run; Chromium headless
// shell with the brief's named GPU flags; one browser, one context, closed in finally.
import { chromium } from "playwright";
const b = await chromium.launch({ headless: true, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
try {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark" });
  const p = await ctx.newPage();
  const reqs = [];
  p.on("requestfinished", (r) => { if (/woff2?|ttf|otf/.test(r.url())) reqs.push(r.url().split("/").pop()); });
  p.on("requestfailed", (r) => { if (/woff2?|ttf|otf/.test(r.url())) reqs.push("FAILED " + r.url().split("/").pop() + " " + r.failure()?.errorText); });
  await p.goto("https://glass.babb.dev/foundations/intro", { waitUntil: "load" });
  for (const t of [500, 1500, 4000]) {
    await p.waitForTimeout(t === 500 ? 500 : t === 1500 ? 1000 : 2500);
    console.log(t, JSON.stringify(await p.evaluate(() => ({ status: document.fonts.status, faces: [...document.fonts].map((f) => f.family + ":" + f.weight + ":" + f.status).slice(0, 12), h1: getComputedStyle(document.querySelector("h1")).fontFamily.slice(0, 80), jak: document.fonts.check('700 40px "Plus Jakarta Sans"') }))));
  }
  console.log("font requests", JSON.stringify(reqs));
  await ctx.close();
} finally { await b.close(); }
