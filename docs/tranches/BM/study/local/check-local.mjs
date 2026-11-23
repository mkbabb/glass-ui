// Loads every page of the local site over the network address (not localhost, which browsers count as secure) at
// 390 px with touch, light and dark: no script error, no failed request, every board link answers, and R6's secure
// line shows on the plain link and stays hidden on the secure one.
// Run: ~/.claude/guard/guarded --timeout 10 -- node docs/tranches/BM/study/local/check-local.mjs <ip>
import { chromium } from "playwright";
import { readdirSync } from "node:fs";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const ip = process.argv[2];
const plain = `http://${ip}:4415/`, secure = `https://${ip}:4416/`;
const pages = readdirSync(path.join(HERE, "www")).filter((f) => f.endsWith(".html"));
const faults = [];
const browser = await chromium.launch({ headless: true });
try {
  for (const f of pages) for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, colorScheme: scheme, ignoreHTTPSErrors: true });
    try {
      const page = await ctx.newPage(), errs = [];
      page.on("pageerror", (e) => errs.push("pageerror " + e.message));
      page.on("console", (m) => { if (m.type() === "error") errs.push("console " + m.text()); });
      page.on("requestfailed", (r) => errs.push("failed " + r.url().slice(0, 80)));
      page.on("response", (r) => { if (r.status() >= 400) errs.push(r.status() + " " + r.url().slice(0, 80)); });
      await page.goto(plain + f, { waitUntil: "load" });
      await page.waitForTimeout(250);
      const s = await page.evaluate(() => ({ title: document.title, wide: document.documentElement.scrollWidth > innerWidth,
        note: document.getElementById("secure-note") ? !document.getElementById("secure-note").hidden : null,
        links: [...document.querySelectorAll("a[href$='.html']")].map((a) => a.href) }));
      if (s.wide) errs.push("the page scrolls sideways at 390");
      if (f === "touch-event-rate.html" && s.note !== true) errs.push("R6 secure line hidden on the plain link");
      for (const href of new Set(s.links)) { const r = await ctx.request.get(href); if (r.status() !== 200) errs.push(`link ${href} → ${r.status()}`); }
      console.log(`${scheme.padEnd(5)} ${f.padEnd(30)} ${s.title.padEnd(26)} links ${new Set(s.links).size} ${errs.length ? "FAULT " + errs.join(" | ") : "ok"}`);
      faults.push(...errs.map((e) => `${f} ${scheme}: ${e}`));
    } finally { await ctx.close(); }
  }
  const ctx = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 390, height: 844 }, hasTouch: true });
  try {
    const page = await ctx.newPage();
    await page.goto(secure + "touch-event-rate.html", { waitUntil: "load" });
    const s = await page.evaluate(() => ({ secure: isSecureContext, note: !document.getElementById("secure-note").hidden, co: "getCoalescedEvents" in PointerEvent.prototype }));
    console.log("secure copy:", JSON.stringify(s));
    if (!s.secure || s.note || !s.co) faults.push("secure copy: " + JSON.stringify(s));
    const p2 = await ctx.newPage();
    await p2.goto(plain.replace(ip, ip) + "index.html");
    await p2.screenshot({ path: path.join(HERE, "logs", "board-390.png") });
  } finally { await ctx.close(); }
} finally { await browser.close(); }
console.log(faults.length ? `${faults.length} fault(s)` : "clean");
process.exit(faults.length ? 1 : 0);
