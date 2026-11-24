// BM pass 4 (copied from pass 3, page list extended with P4-bud; R3b rebuilt and P2-scroll edited by the pass-3 fold): check each reading page (pass 1's, as cured by the fold, and P2-scroll) once in headless Chromium at 390 and 1440, light and dark.
// Run: ~/.claude/guard/guarded --timeout 10 -- node docs/tranches/BM/study/pass-4/check/page-check.mjs
// One browser for the run, one context per cell, everything closed in finally.
// The page is wrapped the way the publisher wraps it (doctype, charset, viewport-fit=cover, the reset).
// Headless Chromium draws no GPU and is not Safari: this checks layout, script errors and overflow only.
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const PAGES = path.resolve(HERE, "../../pages");
const files = ["R1", "R2", "R3", "R3b", "R4", "R5", "R6", "R7", "P2-scroll", "P4-bud"];
const wrap = (body) => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style></head><body>${body}</body></html>`;

const results = [];
const browser = await chromium.launch({ headless: true });
try {
  for (const f of files) {
    const html = wrap(readFileSync(path.join(PAGES, f + ".html"), "utf8"));
    for (const width of [390, 1440]) for (const scheme of ["light", "dark"]) {
      const ctx = await browser.newContext({ viewport: { width, height: 844 }, colorScheme: scheme, hasTouch: width === 390, deviceScaleFactor: 1 });
      const errors = [];
      try {
        const page = await ctx.newPage();
        page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
        page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text()); });
        await page.setContent(html, { waitUntil: "load" });
        await page.waitForTimeout(300);
        const atRest = await page.evaluate(() => ({
          title: document.title,
          firstIsAsk: !!document.querySelector("main > .ask:first-child"),
          scrollW: document.documentElement.scrollWidth, innerW: window.innerWidth,
          bodyBg: getComputedStyle(document.body).backgroundColor,
          env: (document.getElementById("env") || {}).textContent || "",
        }));
        if (width === 390 && scheme === "light")
          await page.screenshot({ path: path.join(HERE, `${f}-390-light.jpg`), type: "jpeg", quality: 55, fullPage: true });
        if (f === "P4-bud" && width === 390 && scheme === "light") {
          // The shape strips §6 cites: each lane held mid-way (Half) and at rest (Open), and the fold half-done.
          // Chromium paints its own backdrop in software; these show the shape only, never WebKit's backdrop.
          for (const k of ["a", "b", "c", "d", "e"]) {
            await page.click(`[data-pick="${k}"]`); await page.click("#half"); await page.waitForTimeout(600);
            await page.locator("#stage").screenshot({ path: path.join(HERE, `P4-bud-${k}-half.png`) });
            await page.click("#open"); await page.waitForTimeout(600);
            const box = await page.evaluate(() => { const l = document.querySelector(".lane.on"); const r = l.getBoundingClientRect(); return { w: r.width, h: r.height }; });
            if (Math.round(box.w) !== 250 || Math.round(box.h) !== 188) errors.push(`lane ${k} rest box ${box.w}x${box.h}`);
            await page.click("#open"); await page.waitForTimeout(400);
          }
          await page.click('[data-pick="a"]');
          await page.click("#slow"); await page.click("#fold"); await page.waitForTimeout(400);
          await page.locator("#folds").screenshot({ path: path.join(HERE, "P4-bud-fold-mid.png") });
          await page.click("#fold"); await page.click("#slow"); await page.waitForTimeout(900);
        }
        const buttons = await page.locator("main button").all();
        for (const b of buttons) {
          try { await b.click({ timeout: 2000 }); await page.waitForTimeout(250); }
          catch (e) { errors.push("click: " + String(e.message).split("\n")[0]); }
        }
        if (f === "R2") { await page.click("#go"); await page.waitForTimeout(1200); }
        if (f === "P2-scroll") {
          for (let i = 0; i < 40; i++) { await page.mouse.wheel(0, i < 20 ? 120 : -120); await page.waitForTimeout(30); }
          for (const id of ["#stripC", "#stripD"]) await page.locator(id).evaluate((n) => n.scrollBy({ left: 200 }));
        }
        if (f === "R6") {
          const box = await page.locator("#pad").boundingBox();
          await page.mouse.move(box.x + 40, box.y + 40);
          await page.mouse.down();
          for (let i = 0; i < 60; i++) {
            await page.mouse.move(box.x + 140 + 100 * Math.cos(i / 6), box.y + 140 + 80 * Math.sin(i / 6));
            await page.waitForTimeout(16);
          }
          await page.mouse.up();
          await page.waitForTimeout(100);
        }
        await page.waitForTimeout(900);
        const after = await page.evaluate(() => ({
          scrollW: document.documentElement.scrollWidth, innerW: window.innerWidth,
          stat: [...document.querySelectorAll(".stat, .count b, #fit, #env, #clipkind, .clipread")].map((n) => n.textContent.trim()).join(" | "),
        }));
        results.push({ page: f, width, scheme, ...atRest, after, overflow: atRest.scrollW > atRest.innerW || after.scrollW > after.innerW, errors });
      } finally {
        await ctx.close();
      }
    }
  }
} finally {
  await browser.close();
}
writeFileSync(path.join(HERE, "page-check.json"), JSON.stringify({ at: new Date().toISOString(), engine: "playwright chromium headless (no GPU)", results }, null, 1));
for (const r of results) {
  const stat = r.after.stat ? " [" + r.after.stat.slice(0, 140) + "]" : "";
  console.log(`${r.page} ${r.width} ${r.scheme} overflow=${r.overflow} errors=${r.errors.length} firstIsAsk=${r.firstIsAsk} title="${r.title}"${stat}`);
  for (const e of r.errors) console.log("   " + e);
}
