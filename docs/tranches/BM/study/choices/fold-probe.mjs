// The fold's own probe: the fixed demos read back in headless Chromium at 390 and 1440, light and dark, with crops to look at.
// Run from the repo root: ~/.claude/guard/guarded --timeout 20 -- node docs/tranches/BM/study/choices/fold-probe.mjs <shots-dir>
// One browser, one context per cell, everything closed in finally. Headless Chromium is not Safari and is no iPhone reading.
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const SHOTS = process.argv[2] || "";
const wrap = (body) => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<style>:root{color-scheme:light}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style></head><body>${body}</body></html>`;
const html = wrap(readFileSync(path.join(HERE, "glass-choices.html"), "utf8"));
const CROPS = ["dock-size", "dark-dock", "springs", "edge", "menu-grow", "dialog-veil", "arrival", "pager-dots", "code-font", "dock-defaults", "motion-study", "underline", "depth"];

const browser = await chromium.launch({ headless: true });
try {
  for (const [width, scheme] of [[390, "light"], [390, "dark"], [1440, "light"], [1440, "dark"]]) {
    const ctx = await browser.newContext({ viewport: { width, height: 844 }, colorScheme: scheme, hasTouch: width === 390, deviceScaleFactor: width === 390 ? 2 : 1 });
    try {
      const page = await ctx.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
      await page.setContent(html, { waitUntil: "load" });
      await page.waitForTimeout(600);
      const out = { width, scheme, errors };

      // Text: the smallest visible run, and the default tag's contrast on its cell.
      out.text = await page.evaluate(() => {
        let min = 99, where = "";
        const w = document.createTreeWalker(document.querySelector("main"), NodeFilter.SHOW_TEXT);
        while (w.nextNode()) {
          const t = w.currentNode; if (!t.textContent.trim()) continue;
          const e = t.parentElement, cs = getComputedStyle(e);
          if (cs.visibility === "hidden" || e.closest("[aria-hidden=true]")) continue;
          const r = e.getBoundingClientRect(); if (!r.width || !r.height) continue;
          const f = parseFloat(cs.fontSize); if (f < min) { min = f; where = e.className + " «" + t.textContent.trim().slice(0, 20) + "»"; }
        }
        return { min, where, fira: document.fonts.check('14px "Fira Code"') };
      });

      // Values: today's dark dock, the dialog's plate and the veil, the edge's lines.
      out.values = await page.evaluate(() => {
        const g = (sel, prop) => { const e = document.querySelector(sel); return e ? getComputedStyle(e)[prop] : null; };
        return {
          dockToday: g(".dk.lv-today .ddock", "backgroundColor"), dockA: g(".dk.lv-a .ddock", "backgroundColor"),
          dialogA: g(".dialog.frost", "backgroundColor") + " | " + g(".dialog.frost", "backdropFilter"), dialogB: g(".dialog.tintonly", "backgroundColor") + " | " + g(".dialog.tintonly", "backdropFilter"),
          veil: g(".veil.blur", "backgroundColor") + " | " + g(".veil.blur", "backdropFilter"),
          edgeA: g(".ecard.e-a", "boxShadow"), chromeTodayPill: g(".m-today > .pill", "backgroundColor"),
          rings: [...document.querySelectorAll(".cell.is-default")].filter((c) => !/Default/.test(c.querySelector(".tag")?.textContent || "")).length,
        };
      });

      // Depth: the figure across the gap, over part of one letter of each word.
      out.depth = await page.evaluate(() => {
        const sc = document.querySelector("#depth .cell.is-default"); const t = sc.querySelector(".dtitle"), b = sc.querySelector(".dblob").getBoundingClientRect();
        const a = t.querySelector(".behind").getBoundingClientRect(), f = t.querySelector(".front").getBoundingClientRect();
        return { glassCovered: Math.round(Math.max(0, a.right - b.left)), uiOver: Math.round(Math.max(0, b.right - f.left)), glassW: Math.round(a.width), uiW: Math.round(f.width) };
      });

      // The edge: A against B in the magnified crop, the share of pixels that differ.
      const zooms = await page.$$("#edge .zoom");
      if (zooms.length === 3) {
        const [za, zb] = [await zooms[0].screenshot(), await zooms[1].screenshot()];
        out.edgeZoom = await page.evaluate(async ([a, b]) => {
          const load = (u) => new Promise((r) => { const i = new Image(); i.onload = () => r(i); i.src = u; });
          const [ia, ib] = await Promise.all([load(a), load(b)]); const w = Math.min(ia.width, ib.width), h = Math.min(ia.height, ib.height);
          const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
          x.drawImage(ia, 0, 0); const da = x.getImageData(0, 0, w, h).data; x.clearRect(0, 0, w, h); x.drawImage(ib, 0, 0); const db = x.getImageData(0, 0, w, h).data;
          let n = 0, maxd = 0; for (let i = 0; i < da.length; i += 4) { const d = Math.max(Math.abs(da[i] - db[i]), Math.abs(da[i + 1] - db[i + 1]), Math.abs(da[i + 2] - db[i + 2])); if (d > 8) n++; maxd = Math.max(maxd, d); }
          return { differ: +(100 * n / (w * h)).toFixed(1), maxChannel: maxd };
        }, ["data:image/png;base64," + za.toString("base64"), "data:image/png;base64," + zb.toString("base64")]);
      }

      // Choice 4: one Replay, each B puck's furthest point past its track's end.
      await page.locator("#springs .ctl .btn", { hasText: "Replay" }).scrollIntoViewIfNeeded();
      await page.evaluate(() => { window.__p = {}; const ps = [...document.querySelectorAll('#springs [data-v="b"] .puck')]; const t0 = performance.now(); const tick = () => { ps.forEach((p, i) => { const span = p.parentElement.clientWidth - 26; const x = new DOMMatrix(getComputedStyle(p).transform).m41 || parseFloat(getComputedStyle(p).translate) || 0; window.__p[i] = Math.max(window.__p[i] || -1e9, (x - span) / span * 100); }); if (performance.now() - t0 < 900) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
      await page.locator("#springs .ctl .btn", { hasText: "Replay" }).click();
      await page.waitForTimeout(1000);
      out.springsB = await page.evaluate(() => Object.values(window.__p).map((v) => +v.toFixed(2)));

      // Choice 10: today's lane through one Replay (clip, and whether its button ever hides).
      const todayCell = page.locator("#menu-grow .cell").first();
      await page.locator("#menu-grow .ctl .btn", { hasText: "Replay" }).scrollIntoViewIfNeeded();
      await page.evaluate(() => { window.__g = []; const pT = document.querySelector("#menu-grow .pT"), seat = pT.closest(".gstage").querySelector(".seat"); const t0 = performance.now(); const tick = () => { window.__g.push([Math.round(performance.now() - t0), getComputedStyle(pT).clipPath, getComputedStyle(seat).opacity]); if (performance.now() - t0 < 1000) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
      await page.locator("#menu-grow .ctl .btn", { hasText: "Replay" }).click();
      await page.waitForTimeout(1100);
      out.grow = await page.evaluate(() => { const g = window.__g; const seatMin = Math.min(...g.map((x) => +x[2])); const clips = [...new Set(g.map((x) => x[1]))]; return { seatMin, first: clips[0], some: clips.filter((_, i) => i % Math.max(1, Math.floor(clips.length / 5)) === 0).slice(0, 6), last: clips[clips.length - 1] }; });
      void todayCell;

      // On a phone: the controls ride along, and a cell below waits for view before it plays.
      if (width === 390) {
        await page.evaluate(() => { const s = document.getElementById("menu-grow"); scrollTo(0, s.getBoundingClientRect().top + scrollY - 72); });
        await page.waitForTimeout(300);
        await page.evaluate(() => { window.__w = null; const lane = document.querySelectorAll("#menu-grow .glane")[3]; const mo = new MutationObserver(() => { if (window.__w === null && lane.classList.contains("leaving")) window.__w = performance.now(); }); mo.observe(lane, { attributes: true }); window.__mo = mo; window.__t0 = performance.now(); });
        await page.locator("#menu-grow .ctl .btn", { hasText: "Replay" }).click();
        await page.waitForTimeout(600);
        const before = await page.evaluate(() => window.__w);
        await page.evaluate(() => { const c = document.querySelectorAll("#menu-grow .cell")[3]; scrollTo(0, c.getBoundingClientRect().top + scrollY - 140); });
        await page.waitForTimeout(700);
        out.phone = await page.evaluate((before) => {
          const ctl = document.querySelector("#menu-grow > .ctl").getBoundingClientRect();
          return { lastCellPlayedBeforeScroll: before !== null, lastCellPlayedAfterScroll: window.__w !== null, ctlTop: Math.round(ctl.top) };
        }, before);
      }

      // Crops to look at.
      if (SHOTS) for (const id of CROPS) {
        await page.evaluate((id) => { location.hash = ""; document.getElementById(id).scrollIntoView({ block: "start" }); }, id);
        await page.waitForTimeout(250);
        await page.locator("#" + id).screenshot({ path: path.join(SHOTS, `${id}-${width}-${scheme}.jpg`), type: "jpeg", quality: 60 });
      }
      const sw = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
      out.overflow = sw[0] > sw[1];
      console.log(JSON.stringify(out));
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
