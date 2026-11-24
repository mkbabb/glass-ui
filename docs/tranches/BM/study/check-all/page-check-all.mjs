// BM study: every live reading page once in headless Chromium at 390 and 1440, light and dark (52 cells), with the
// geometry and gestures P4-bud, P5-mark, P6-hosts, P7-fuse and P8-present claim, and their strips. Carried from pass 8's
// page-check.mjs; pass 8's resume (2026-11-23) aimed every gesture at a target scrolled on screen, drove P8-present by
// touch at 390, and skipped buttons a person cannot reach (inside an inert or hidden subtree).
// Run: ~/.claude/guard/guarded --timeout 15 -- node docs/tranches/BM/study/check-all/page-check-all.mjs [page …]
// Named pages replace only their own rows in page-check.json.
// One browser for the run, one context per cell, everything closed in finally.
// The page is wrapped the way the publisher wraps it (doctype, charset, viewport-fit=cover, the reset).
// Headless Chromium draws no GPU and is not Safari: this checks layout, script errors, overflow and the gestures' logic.
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const PAGES = path.resolve(HERE, "../pages");
const ALL = ["R1", "R2", "R3", "R3b", "R5", "R6", "R7", "P2-scroll", "P4-bud", "P5-mark", "P6-hosts", "P7-fuse", "P8-present", "P9-slider", "P10-slider", "P10-toggle", "P10-plate"];
const files = process.argv.length > 2 ? ALL.filter((f) => process.argv.includes(f)) : ALL; // pass page names to check a few
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
      const errors = [], notes = [];
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
            await page.click(`[data-pick="${k}"]`); await page.waitForTimeout(400); await page.click("#half"); await page.waitForTimeout(600);
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
        if ((f === "P5-mark" || f === "P6-hosts") && width === 390) {
          // Every strip and run, per letter: a tap on the last option, the mark's rest checked against its option,
          // then a drag from the chosen option back past the first (P5-mark, and P6-hosts' fitting runs). Strip images
          // mid-travel for DESIGN §7 and §8. Chromium paints these; the motion's thread and rate are the iPhone's.
          for (const row of await page.locator(".letter").all()) {
            const q = await row.evaluate((n) => n.closest("section").dataset.q), v = await row.getAttribute("data-v");
            let k = 0;
            for (const g of await row.locator(".strip, .run").all()) {
              const opts = await g.locator(".tab, .word, .seat").all(); if (!opts.length) continue;
              const last = opts[opts.length - 1];
              await last.scrollIntoViewIfNeeded(); await last.click(); await page.waitForTimeout(60);
              if (scheme === "light") await g.screenshot({ path: path.join(HERE, `${f}-${q}-${v}-${k}-mid.png`) });
              await page.waitForTimeout(600);
              const off = await g.evaluate((s) => { const m = s.querySelector(".mark"), t = s.querySelector('[aria-selected="true"], [aria-current="page"]'); if (!m || !t) return 99; const r = m.getBoundingClientRect(), o = t.getBoundingClientRect(); return Math.abs(r.left - o.left) + (m.dataset.window === undefined ? Math.abs(r.width - o.width) : 0); });
              if (off > 1) errors.push(`${f} ${q} ${v} ${k}: the mark rests ${off.toFixed(1)} px off its option after a tap`);
              const mode = await g.evaluate((s) => (s.closest(".port") || {}).dataset?.mode || "strip");
              if (mode === "strip" || mode === "fits") {
                const b0 = await opts[0].boundingBox(), bn = await last.boundingBox();
                await page.mouse.move(bn.x + bn.width / 2, bn.y + bn.height / 2); await page.mouse.down();
                for (let i = 0; i <= 12; i++) { await page.mouse.move(bn.x + bn.width / 2 - ((bn.x - b0.x + 60) * i) / 12, bn.y + bn.height / 2); await page.waitForTimeout(16); }
                await page.mouse.up(); await page.waitForTimeout(700);
                const chosen = await g.evaluate((s) => [...s.querySelectorAll(".tab, .word, .seat")].findIndex((t) => t.getAttribute("aria-selected") === "true" || t.getAttribute("aria-current") === "page"));
                if (chosen !== 0) errors.push(`${f} ${q} ${v} ${k}: a drag past the first option chose ${chosen}`);
              }
              k++;
            }
            for (const l of await row.locator(".level").all()) {
              await l.evaluate((n) => n.scrollIntoView({ block: "center" })); // a tap lands only on what is on screen
              const bb = await l.boundingBox(); await page.mouse.click(bb.x + bb.width - 8, bb.y + bb.height / 2); await page.waitForTimeout(700);
              if ((await l.getAttribute("aria-valuenow")) !== "5") errors.push(`${f} level ${v}: a tap at the end did not choose 5`);
              if (scheme === "light") await l.screenshot({ path: path.join(HERE, `${f}-level-${v}.png`) });
            }
          }
        }
        if (f === "P7-fuse" && width === 390 && scheme === "light") {
          // Section 1 held at the neck (2.5 px gap), each lane, as the frames DESIGN §9.2 cites; the shape only: Chromium
          // paints its own filter and clip in software, and is not WebKit or Safari.
          await page.click('[data-run="seat"]'); await page.waitForTimeout(900);
          await page.click('[data-hold="seat"]'); await page.waitForTimeout(1200); // held 2.5 px apart
          for (const lane of ["under", "clear", "meet", "goo", "cut"]) await page.locator(`.stage[data-lane="${lane}"]`).screenshot({ path: path.join(HERE, `P7-fuse-hold-${lane}.png`) });
          for (let i = 0; i < 5; i++) { await page.click('[data-hold="seat"]'); await page.waitForTimeout(700); } // the other four openings, then let go
          if ((await page.getAttribute('[data-hold="seat"]', "aria-pressed")) !== "false") errors.push("Hold did not let go after the fifth opening");
          await page.waitForTimeout(400);
          for (const lane of ["under", "clear", "meet", "goo", "cut"]) await page.locator(`.stage[data-lane="${lane}"]`).screenshot({ path: path.join(HERE, `P7-fuse-open-${lane}.png`) });
          // the fold, half-way, slowed
          await page.click("#slow"); await page.click('[data-run="fold"]'); await page.waitForTimeout(260 * 4 / 2);
          for (const lane of ["fade", "cover", "quick"]) await page.locator(`.stage[data-lane="${lane}"]`).screenshot({ path: path.join(HERE, `P7-fuse-fold-${lane}.png`) });
          await page.click('[data-run="fold"]'); await page.click("#slow"); await page.waitForTimeout(1500);
          const cut = await page.evaluate(() => getComputedStyle(document.querySelector(".cplate")).clipPath.slice(0, 24));
          if (!/^path\(/.test(cut)) errors.push("D's cut not applied: " + cut);
        }
        if (f === "P8-present") {
          // At 390 a finger (CDP touch events, as Chromium takes them from a touch screen), at 1440 the mouse. Every target
          // is scrolled to the middle of the screen first: a gesture lands only on what is on screen.
          const touch = width === 390, cdp = touch ? await ctx.newCDPSession(page) : null;
          const centre = (loc) => loc.evaluate((n) => n.scrollIntoView({ block: "center" }));
          const line = (a, b, n) => Array.from({ length: n + 1 }, (_, i) => [a[0] + ((b[0] - a[0]) * i) / n, a[1] + ((b[1] - a[1]) * i) / n]);
          const gesture = async (pts) => {
            const [x0, y0] = pts[0];
            if (touch) {
              await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: x0, y: y0, id: 1 }] });
              for (const [x, y] of pts.slice(1)) { await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y, id: 1 }] }); await page.waitForTimeout(16); }
              await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
            } else {
              await page.mouse.move(x0, y0); await page.mouse.down();
              for (const [x, y] of pts.slice(1)) { await page.mouse.move(x, y); await page.waitForTimeout(16); }
              await page.mouse.up();
            }
          };
          // 1: open the second seat in each stage, mid-grow and landed; the menu sits past the dock's top edge, never over it.
          for (const st of await page.locator(".s1").all()) {
            await centre(st);
            await st.locator(".seat").nth(1).click(); await page.waitForTimeout(120);
            const geo = await st.evaluate((n) => { const m = n.querySelector(".menu"), d = n.querySelector(".dock"); if (!m) return null; const a = m.getBoundingClientRect(), b = d.getBoundingClientRect(); return { gap: +(b.top - a.bottom).toFixed(1) }; });
            if (!geo || geo.gap < 0) errors.push(`P8-present s1: the menu ${geo ? "overlaps the dock by " + -geo.gap + " px" : "did not open"}`);
            if (width === 390) await st.screenshot({ path: path.join(HERE, `P8-present-s1-${scheme}-grow.png`) });
            await page.waitForTimeout(500);
            if (width === 390) await st.screenshot({ path: path.join(HERE, `P8-present-s1-${scheme}-open.png`) });
            await st.locator(".menu [role=menuitem]").nth(2).click(); await page.waitForTimeout(400);
            if (await st.locator(".menu").count()) errors.push("P8-present s1: a row's click left the menu open");
          }
          // 2: press on the first row, slide to the third, lift: the third is chosen, and the lift reaches it (the press
          // released its row's capture, §10.4's first listener). A press slid off the list and lifted chooses nothing.
          // The second try (away and back to the row it started on) is Safari's to answer; Chromium's answer is noted.
          await centre(page.locator("#slide"));
          await page.evaluate(() => {
            const name = (t) => (t.closest && t.closest("[role=menuitem]") || {}).textContent || t.tagName;
            window.__up = []; window.__clicks = [];
            document.addEventListener("pointerup", (e) => window.__up.push(name(e.target)), true);
            document.getElementById("slide").addEventListener("click", (e) => window.__clicks.push(name(e.target)), true);
          });
          const rows = page.locator("#slide [role=menuitem]"), mb = await page.locator("#slide .menu").boundingBox();
          const b0 = await rows.nth(0).boundingBox(), b2 = await rows.nth(2).boundingBox();
          const c0 = [b0.x + 40, b0.y + b0.height / 2], c2 = [b2.x + 40, b2.y + b2.height / 2];
          await gesture(line(c0, c2, 8)); await page.waitForTimeout(350);
          const t1 = await page.textContent("#chosen"), up1 = await page.evaluate(() => window.__up.at(-1));
          if (!/Garage/.test(t1)) errors.push(`P8-present s2: a slide from Upstairs to Garage chose "${t1}"`);
          if (touch && up1 !== "Garage") errors.push(`P8-present s2: the lift reached ${up1}, not the row under the finger (the press kept its capture)`);
          await gesture(line(c0, [mb.x + mb.width + 40, c0[1]], 8)); await page.waitForTimeout(350);
          const t2 = await page.textContent("#chosen");
          if (t2 !== t1) errors.push(`P8-present s2: a lift off the list chose "${t2}"`);
          const k0 = await page.evaluate(() => window.__clicks.length);
          await gesture([...line(c0, c2, 6), ...line(c2, c0, 6).slice(1)]); await page.waitForTimeout(350);
          const t3 = await page.textContent("#chosen"), clicked = await page.evaluate((k) => window.__clicks.slice(k), k0);
          notes.push(`s2 second try (${touch ? "touch" : "mouse"}), away to Garage and back to Upstairs: ${/Upstairs/.test(t3) ? "chose Upstairs" : "chose nothing"}; the browser ${clicked.length ? "sent a click on " + clicked.join(", ") : "sent no click"}`);
          // 3: drag A up to its top rung and let go (a fling); move B up by one rung the same way (a touch scroll at 390,
          // a wheel at 1440); each readout names 85 %.
          const sa = page.locator('.s3[data-sheet="spring"]'), sb = page.locator('.s3[data-sheet="scroll"]');
          await centre(sa);
          const ab = await sa.locator(".springsheet").boundingBox(), H = (await sa.boundingBox()).height;
          await gesture(line([ab.x + 60, ab.y + 12], [ab.x + 60, ab.y + 12 - 0.45 * H], 10));
          await page.waitForTimeout(1400);
          const restA = await sa.locator("xpath=..").locator("[data-rest]").textContent();
          await centre(sb);
          const restB0 = await sb.locator("xpath=..").locator("[data-rest]").textContent();
          if (!/40/.test(restB0)) errors.push(`P8-present s3: B reads "${restB0}" after load, not its first rung (fold B8-1)`);
          const bb = await sb.boundingBox();
          if (touch) await cdp.send("Input.synthesizeScrollGesture", { x: Math.round(bb.x + 60), y: Math.round(bb.y + bb.height - 60), yDistance: -Math.round(0.45 * bb.height), gestureSourceType: "touch", speed: 900 });
          else { await page.mouse.move(bb.x + 60, bb.y + bb.height - 60); await page.mouse.wheel(0, Math.round(0.45 * bb.height)); }
          await page.waitForTimeout(1200);
          const restB = await sb.locator("xpath=..").locator("[data-rest]").textContent();
          if (!/85/.test(restA) || !/85/.test(restB)) errors.push(`P8-present s3: A reads "${restA}", B reads "${restB}"`);
          if (width === 390) for (const k of ["spring", "scroll"]) await page.locator(`.s3[data-sheet="${k}"]`).screenshot({ path: path.join(HERE, `P8-present-s3-${k}-${scheme}.png`) });
          // 4: open each dialog: the page behind it, its Open button included, lies under the veil; capture it; Escape
          // closes it, and the closed dialog is inert.
          for (const k of ["a", "b", "c", "d"]) {
            const st = page.locator(`.s4[data-dialog="${k}"]`);
            await centre(st);
            await st.locator(".open").click(); await page.waitForTimeout(400);
            const top = await st.evaluate((n) => { const o = n.querySelector(".open").getBoundingClientRect(), t = document.elementFromPoint(o.left + o.width / 2, o.top + o.height / 2); return t ? t.className : "nothing"; });
            if (!/veil/.test(top)) errors.push(`P8-present s4 ${k}: the open dialog leaves ${top} above its veil`);
            if (width === 390) await st.screenshot({ path: path.join(HERE, `P8-present-s4-${k}-${scheme}.png`) });
            await page.keyboard.press("Escape"); await page.waitForTimeout(300);
            if (!(await st.evaluate((n) => n.querySelector(".dialog").inert))) errors.push(`P8-present s4 ${k}: the closed dialog is not inert`);
          }
          if (cdp) await cdp.detach();
        }
        // Every button a person can reach, once: handles, not nth locators, since menus come and go. A button inside an
        // inert or hidden subtree is not there for a person and is skipped. A button that lies under an open menu or
        // dialog is noted, Escape closes what covers it (a tap on the phone), and then it is tapped.
        for (const b of await page.$$("main button")) {
          const state = await b.evaluate((n) => {
            if (!n.isConnected || n.closest("[inert], [hidden]") || !n.getClientRects().length || getComputedStyle(n).visibility === "hidden") return "absent";
            n.scrollIntoView({ block: "center" });
            const r = n.getBoundingClientRect(), t = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
            return t && (t === n || n.contains(t)) ? "ok" : t ? (t.getAttribute("role") || t.className || t.tagName) : "nothing";
          }).catch(() => "absent");
          if (state === "absent") continue;
          const label = await b.evaluate((n) => n.getAttribute("aria-label") || n.textContent.trim().slice(0, 24));
          if (state !== "ok") {
            notes.push(`"${label}" lay under the open ${state}; Escape closed it before the tap`);
            await page.keyboard.press("Escape"); await page.waitForTimeout(300);
          }
          try { await b.click({ timeout: 2000 }); await page.waitForTimeout(250); }
          catch (e) { errors.push(`click "${label}": ` + String(e.message).split("\n")[0]); }
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
        results.push({ page: f, width, scheme, ...atRest, after, overflow: atRest.scrollW > atRest.innerW || after.scrollW > after.innerW, errors, notes });
      } finally {
        await ctx.close();
      }
    }
  }
} finally {
  await browser.close();
}
const OUT = path.join(HERE, "page-check.json");
let rows = results;
if (files.length < ALL.length) {
  let prior = []; try { prior = JSON.parse(readFileSync(OUT, "utf8")).results; } catch {}
  rows = [...prior.filter((r) => !files.includes(r.page)), ...results].sort((a, b) => ALL.indexOf(a.page) - ALL.indexOf(b.page));
}
writeFileSync(OUT, JSON.stringify({ at: new Date().toISOString(), engine: "playwright chromium headless (no GPU)", results: rows }, null, 1));
for (const r of results) {
  const stat = r.after.stat ? " [" + r.after.stat.slice(0, 140) + "]" : "";
  console.log(`${r.page} ${r.width} ${r.scheme} overflow=${r.overflow} errors=${r.errors.length} firstIsAsk=${r.firstIsAsk} title="${r.title}"${stat}`);
  for (const e of r.errors) console.log("   " + e);
  for (const n of r.notes) console.log("   note: " + n);
}
