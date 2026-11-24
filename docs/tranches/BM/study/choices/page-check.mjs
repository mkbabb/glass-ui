// The choices page once in headless Chromium at 390 and 1440, light and dark: script errors, horizontal overflow,
// every section's Replay pressed once (and again slowed), a tap on each demo control, and the hash route.
// Run from the repo root: ~/.claude/guard/guarded --timeout 15 -- node docs/tranches/BM/study/choices/page-check.mjs [shots-dir]
// One browser for the run, one context per cell, everything closed in finally. The page is wrapped the way the
// publisher wraps it (doctype, charset, viewport-fit=cover, a small reset). Headless Chromium is not Safari.
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const SHOTS = process.argv[2] || "";
const wrap = (body) => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style></head><body>${body}</body></html>`;
const html = wrap(readFileSync(path.join(HERE, "glass-choices.html"), "utf8"));

const browser = await chromium.launch({ headless: true });
let bad = 0;
try {
  for (const width of [390, 1440]) for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width, height: 844 }, colorScheme: scheme, hasTouch: width === 390, deviceScaleFactor: 1 });
    const errors = [];
    try {
      const page = await ctx.newPage();
      page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
      page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text()); });
      await page.setContent(html, { waitUntil: "load" });
      await page.waitForTimeout(400);
      const overflow = () => page.evaluate(() => {
        const W = document.documentElement.clientWidth, out = [];
        for (const e of document.querySelectorAll("main *")) {
          const r = e.getBoundingClientRect();
          if (r.width && r.right > W + 0.5) {
            // ignore what sits inside a box that clips or scrolls on its own
            let p = e.parentElement, inside = false;
            while (p && p !== document.body) { const s = getComputedStyle(p); if (/(auto|scroll|hidden|clip)/.test(s.overflowX)) { inside = true; break; } p = p.parentElement; }
            if (!inside) out.push((e.closest("[id]") || {}).id + " > " + e.tagName.toLowerCase() + "." + [...e.classList].join(".") + " right " + Math.round(r.right));
          }
        }
        // and nothing at rest runs past the side of its own before/after cell
        for (const c of document.querySelectorAll(".cell")) {
          const cr = c.getBoundingClientRect();
          for (const e of c.querySelectorAll("*")) {
            const r = e.getBoundingClientRect();
            if (!r.width || (r.right <= cr.right + 0.5 && r.left >= cr.left - 0.5)) continue;
            let p = e.parentElement, inside = false;
            while (p && p !== c) { const s = getComputedStyle(p); if (/(auto|scroll|hidden|clip)/.test(s.overflowX)) { inside = true; break; } p = p.parentElement; }
            if (!inside) { out.push("cell " + (c.closest("[id]") || {}).id + " > " + e.tagName.toLowerCase() + "." + [...e.classList].join(".") + " " + Math.round(r.left - cr.left) + ".." + Math.round(r.right - cr.right)); break; }
          }
        }
        return { scrollW: document.documentElement.scrollWidth, innerW: W, out: out.slice(0, 8) };
      });
      const rest = await overflow();
      const meta = await page.evaluate(() => ({
        title: document.title, bodyBg: getComputedStyle(document.body).backgroundColor,
        sections: document.querySelectorAll("section.choice").length, replays: [...document.querySelectorAll(".ctl .btn")].filter((b) => b.textContent === "Replay").length,
      }));
      if (SHOTS && ((width === 390 && scheme === "light") || (width === 1440 && scheme === "dark")))
        await page.screenshot({ path: path.join(SHOTS, `choices-${width}-${scheme}.jpg`), type: "jpeg", quality: 50, fullPage: true });
      // Every Replay once, then each again slowed.
      const replays = await page.$$(".ctl .btn");
      for (const b of replays) { if ((await b.textContent()) === "Replay") { await b.scrollIntoViewIfNeeded(); await b.click(); } }
      await page.waitForTimeout(2500);
      for (const b of replays) { const t = await b.textContent(); if (t === "Slow ×4") { await b.scrollIntoViewIfNeeded(); await b.click(); } }
      for (const b of replays) { if ((await b.textContent()) === "Replay") await b.click(); }
      await page.waitForTimeout(4500);
      // A tap on a sample of each demo's own controls.
      for (const sel of [".ib", ".tab", ".word", ".seatb", ".pbtn", ".pseat", ".psw", ".gstage .seat", ".dsw", ".pp", ".fr", ".vstage .open", "#mark-keys [data-step]", "[data-flat]", ".astage", ".smenu [role=menuitem]"]) {
        const list = await page.$$(sel);
        for (const e of list.slice(0, 6)) { try { await e.scrollIntoViewIfNeeded(); await e.click({ timeout: 1500 }); } catch (x) { /* covered or inert: skip */ } }
      }
      await page.waitForTimeout(1200);
      await page.evaluate(() => { location.hash = "#hover-plate"; });
      await page.waitForTimeout(900);
      const routed = await page.evaluate(() => { const s = document.getElementById("hover-plate"); const r = s.getBoundingClientRect(); return { here: s.classList.contains("here"), top: Math.round(r.top) }; });
      const after = await overflow();
      const ok = !errors.length && rest.scrollW <= rest.innerW && after.scrollW <= after.innerW && !rest.out.length && routed.here;
      if (!ok) bad++;
      console.log(JSON.stringify({ width, scheme, ok, meta, rest, after, routed, errors: errors.slice(0, 10) }));
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
process.exitCode = bad ? 1 : 0;
