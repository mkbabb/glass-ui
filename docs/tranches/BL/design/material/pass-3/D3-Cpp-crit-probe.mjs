#!/usr/bin/env node
// D3-Cpp-crit-probe.mjs · D3 pass 3, C″ CRITIC: two probes of the route's stated invariants on a C″ specimen build.
// Computed style, DOM attributes and page screenshots only; no canvas context is requested.
// Source of record for its readings: D3-Cpp-critique.md.
//
//   held   "chrome does not move" (spec §1.1, §1.8; Q-3 a) against FL-7 under a claim (proto §8.1). The held scene with
//          its dock: the pointer presses and holds the dock's Slider ([data-press], as capture.mjs does), then reads the
//          α each held plate paints (--glass-veil-rung on the plate, the carriers' computed background) and --glass-bound,
//          claimed (?claim=honest) and unclaimed (?claim=none). In paint: the held dock's composite at x 278 (left of the
//          Slider and its focus veil, FV2 §3) over black and white, against the same cell unclaimed.
//   retune C-4 "followed or refused loud" by the paths the resolver does NOT observe (it watches <html> class/style and
//          <head> children; groundClaim.ts watchPage). The ladder over paper under a page claim; H3-8's retune values
//          (lib.mjs RETUNES) applied four ways: none; a <style> added to <head> after load (the H3-8 path, observed);
//          the same declarations on <body> inline style after load; a class toggled on <body> after load, its rule
//          already in <head> from before the claim. Reads the claim's stamp, page tone, content bound and console
//          warnings, and in paint (text hidden) the wash plate against the page: ΔE and ΔL in OKLab (M-6's signed leg,
//          dark), and the fg/muted split on the wash plate (W-C leg 2, light).
//
//   node D3-Cpp-crit-probe.mjs <dist> held|retune [--engines chromium,webkit] [--out file.json]
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
const CHECKOUT = "/Users/mkbabb/Programming/glass-ui";
const { chromium, webkit } = await import(path.join(CHECKOUT, "node_modules/playwright/index.mjs"));
const H = path.join(CHECKOUT, "docs/tranches/BL/design/material/harness/lib.mjs");
const { serve, WEBKIT_SHIM, CHROMIUM_ARGS, oklab, dE, hex, f, PNG: Png } = await import(H);
const { values: a, positionals } = parseArgs({ allowPositionals: true, options: { engines: { type: "string" }, out: { type: "string" } } });
const [dist, mode] = positionals;
if (!dist || !["held", "retune"].includes(mode)) { console.error("usage: node D3-Cpp-crit-probe.mjs <dist> held|retune"); process.exit(2); }
const server = await serve(dist);
const load = () => (process.env.LOADAVG ?? "");
const out = [];

const mean = (png, x0, y0, w, h) => { const s = [0, 0, 0]; let n = 0; for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) { const i = (png.width * y + x) << 2; s[0] += png.data[i]; s[1] += png.data[i + 1]; s[2] += png.data[i + 2]; n++; } return s.map((v) => v / n); };
const shot = async (page) => Png.sync.read(await page.screenshot({ type: "png" }));

async function open(b, eng, theme, url) {
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  if (eng === "webkit") await ctx.addInitScript(`document.addEventListener("readystatechange", () => { if (!document.getElementById("hx-wk-shim")) { const s = document.createElement("style"); s.id = "hx-wk-shim"; s.textContent = ${JSON.stringify(WEBKIT_SHIM)}; (document.head || document.documentElement).appendChild(s); } });`);
  const page = await ctx.newPage();
  const warns = [];
  page.on("console", (m) => { if ((m.type() === "warning" || m.type() === "error") && /glass-ui/.test(m.text())) warns.push(m.text().slice(0, 200)); });
  await page.goto(`${server.url}index.html?${url}&theme=${theme}`, { waitUntil: "load", timeout: 180000 });
  return { ctx, page, warns };
}

async function held(b, eng) {
  for (const theme of ["light", "dark"]) for (const ground of ["black", "white", "aurora"]) {
    const res = {};
    for (const claim of ["honest", "none"]) {
      const { ctx, page, warns } = await open(b, eng, theme, `scene=held&ground=${ground}&claim=${claim}`);
      await page.waitForTimeout(1500);
      const at = await page.evaluate(() => { const r = document.querySelector("[data-press]").getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; });
      await page.mouse.move(...at); await page.mouse.down(); await page.waitForTimeout(900);
      const r = await page.evaluate(() => {
        const g = (el, p) => (el ? getComputedStyle(el).getPropertyValue(p).trim() : null);
        const m = document.querySelector("main");
        const one = (sel) => { const el = document.querySelector(sel); if (!el) return null; const plate = el.matches(".dock-plate, .glass-wash, .glass-floating") ? el : el.querySelector(".dock-plate") || el;
          const car = plate.querySelector(":scope > .glass-grasp-carrier");
          const rr = plate.getBoundingClientRect();
          return { rung: +(+g(plate, "--glass-veil-rung")).toFixed(4), floor: +(+g(plate, "--glass-veil-floor")).toFixed(4), rest: +(+g(plate, "--glass-veil-rest")).toFixed(4), held: !!car && car.getAttribute("data-grasp"), carrierBg: car ? getComputedStyle(car).backgroundColor : null, rect: [Math.round(rr.left), Math.round(rr.top), Math.round(rr.width), Math.round(rr.height)] }; };
        return { state: m?.getAttribute("data-glass-ground-state"), bound: +(+g(m, "--glass-bound")).toFixed(4), cb: +(+g(m, "--glass-content-bound")).toFixed(4),
          dock: one('[data-spec="dock-held"]'), floating: one('[data-spec="floating-held"]'), wash: one('[data-spec="wash-held"]') };
      });
      // the held dock's composite at x 278, the plate's vertical middle (left of the Slider and its focus veil)
      const png = await shot(page);
      const d = r.dock?.rect;
      r.dockPx = d ? mean(png, 274, d[1] + Math.floor(d[3] / 2) - 2, 8, 4) : null;
      res[claim] = { ...r, warns: warns.length };
      await page.mouse.up();
      await ctx.close();
    }
    const c = res.honest, u = res.none;
    const line = `${eng} ${theme} ${ground} · bound ${c.bound} content ${c.cb} state ${c.state} · dock-held rung claimed ${c.dock?.rung} (floor ${c.dock?.floor}, rest ${c.dock?.rest}, carrier ${c.dock?.held}) unclaimed ${u.dock?.rung} · floating-held ${c.floating?.rung} / ${u.floating?.rung} · wash-held ${c.wash?.rung} / ${u.wash?.rung} · dock px x278 claimed ${c.dockPx ? hex(c.dockPx) : "—"} unclaimed ${u.dockPx ? hex(u.dockPx) : "—"} ΔE ${c.dockPx && u.dockPx ? f(dE(c.dockPx, u.dockPx), 3) : "—"}`;
    console.log(line);
    out.push({ mode, eng, theme, ground, claimed: c, unclaimed: u });
  }
}

const RET = {
  bg: { light: ["--background", "hsl(210 22% 93%)"], dark: ["--background", "hsl(220 16% 13%)"] },
  fg: { light: ["--foreground", "oklch(0.42 0.02 56)"], dark: ["--foreground", "oklch(0.86 0.01 68)"] },
};

async function retune(b, eng) {
  for (const theme of ["light", "dark"]) for (const which of ["bg", "fg"]) for (const path_ of ["none", "head", "body-inline", "body-class"]) {
    const [prop, val] = RET[which][theme];
    const { ctx, page, warns } = await open(b, eng, theme, `scene=ladder&ground=paper&claim=honest&nodock=1`);
    if (path_ === "body-class") await page.addStyleTag({ content: `body.hx-theme-x { ${prop}: ${val}; }` });
    await page.waitForTimeout(1200);
    const before = await page.evaluate(() => { const m = document.querySelector("main"); const g = (p) => getComputedStyle(m).getPropertyValue(p).trim(); return { state: m.getAttribute("data-glass-ground-state"), pageHi: g("--glass-page-hi"), cb: g("--glass-content-bound") }; });
    if (path_ === "head") await page.addStyleTag({ content: `html:root { ${prop}: ${val}; }` });
    if (path_ === "body-inline") await page.evaluate(([p, v]) => document.body.style.setProperty(p, v), [prop, val]);
    if (path_ === "body-class") await page.evaluate(() => document.body.classList.add("hx-theme-x"));
    await page.waitForTimeout(1500); // the claim's lag spring settles
    const after = await page.evaluate(() => {
      const m = document.querySelector("main"); const g = (el, p) => getComputedStyle(el).getPropertyValue(p).trim();
      const wash = document.querySelector('[data-spec="wash"]');
      const fgEl = wash && wash.querySelector('[data-ink="fg"]'), muEl = wash && wash.querySelector('[data-ink="muted"]');
      return { state: m.getAttribute("data-glass-ground-state"), pageHi: g(m, "--glass-page-hi"), cb: g(m, "--glass-content-bound"), washRung: g(wash, "--glass-veil-rung"),
        bodyBg: getComputedStyle(document.body).backgroundColor, fgCol: fgEl ? getComputedStyle(fgEl).color : null, muCol: muEl ? getComputedStyle(muEl).color : null,
        rect: (() => { const r = wash.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)]; })() };
    });
    const warnsBefore = warns.length;
    // Text hidden by inline style on the runs, NOT by a <head> stylesheet: a <head> child is the path the resolver
    // observes, and it would re-resolve the claim before the frame (the first run of this probe did exactly that).
    await page.evaluate(() => document.querySelectorAll("main [data-spec] *").forEach((el) => el.style.setProperty("visibility", "hidden", "important")));
    await page.waitForTimeout(300);
    const png = await shot(page);
    const stillStale = await page.evaluate(() => getComputedStyle(document.querySelector("main")).getPropertyValue("--glass-page-hi").trim());
    const w = after.rect;
    const plate = mean(png, w[0] + 12, w[1] + 12, Math.max(4, w[2] - 24), Math.max(4, Math.min(24, w[3] - 24)));
    const pagePx = mean(png, 4, 880, 16, 12);
    const Lp = oklab(plate)[0], Lg = oklab(pagePx)[0];
    const rec = { mode, eng, theme, which, path: path_, before, after, warns: warnsBefore, pageHiAtFrame: stillStale, plate: hex(plate), page: hex(pagePx), dE: dE(plate, pagePx), dL: Lp - Lg };
    out.push(rec);
    console.log(`${eng} ${theme} retune-${which} via ${path_} · stamp ${before.state} → ${after.state} · page-hi ${before.pageHi} → ${after.pageHi} · content ${before.cb} → ${after.cb} (wash rung ${after.washRung}) · warns ${warnsBefore} · page-hi at frame ${stillStale} · body ${after.bodyBg} · wash ${rec.plate} page ${rec.page} ΔE ${f(rec.dE, 3)} ΔL ${f(rec.dL, 3)} · fg ${after.fgCol} muted ${after.muCol}`);
    await ctx.close();
  }
}

for (const eng of (a.engines || "chromium,webkit").split(",")) {
  const b = await (eng === "chromium" ? chromium : webkit).launch(eng === "chromium" ? { args: CHROMIUM_ARGS } : {});
  await (mode === "held" ? held : retune)(b, eng);
  await b.close();
}
server.close();
if (a.out) fs.writeFileSync(a.out, JSON.stringify(out, null, 1));
