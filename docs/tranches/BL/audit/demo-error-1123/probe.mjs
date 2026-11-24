// The owner's "glass.babb.dev has an error" (2026-11-23 23:03): load / and every route the page links to, at 390 (touch)
// and 1440, collecting page errors, console errors, failed requests and 4xx/5xx. One browser; a context per cell.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const BASE = "https://glass.babb.dev";
const out = [];
const browser = await chromium.launch({ headless: true });
try {
  let routes = ["/"];
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    try {
      const p = await ctx.newPage();
      await p.goto(BASE + "/", { waitUntil: "networkidle", timeout: 30000 });
      const hrefs = await p.evaluate(() => [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")));
      routes = [...new Set(["/", ...hrefs.filter((h) => h && h.startsWith("/") && !h.startsWith("//"))])].slice(0, 60);
    } finally { await ctx.close(); }
  }
  for (const r of routes) for (const w of [390, 1440]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, hasTouch: w === 390, colorScheme: "dark" });
    const errs = [];
    try {
      const p = await ctx.newPage();
      p.on("pageerror", (e) => errs.push("pageerror: " + e.message.slice(0, 300)));
      p.on("console", (m) => { if (m.type() === "error") errs.push("console: " + m.text().slice(0, 300)); });
      p.on("requestfailed", (q) => errs.push("failed: " + q.url().slice(0, 160) + " " + (q.failure() || {}).errorText));
      p.on("response", (s) => { if (s.status() >= 400) errs.push(s.status() + " " + s.url().slice(0, 160)); });
      await p.goto(BASE + r, { waitUntil: "networkidle", timeout: 30000 }).catch((e) => errs.push("goto: " + e.message.slice(0, 200)));
      await p.waitForTimeout(800);
      const body = await p.evaluate(() => ({ text: document.body.innerText.trim().slice(0, 120), nodes: document.querySelectorAll("main *, #app *").length }));
      out.push({ route: r, width: w, errs, body });
      console.log(`${String(w).padEnd(4)} ${r.padEnd(32)} nodes ${String(body.nodes).padEnd(5)} ${errs.length ? "ERR " + errs.join(" | ").slice(0, 400) : "ok"}`);
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
writeFileSync(new URL("./probe.json", import.meta.url), JSON.stringify(out, null, 1));
