#!/usr/bin/env node
// D3-Ap-crit-probe.mjs · the A′ critic's probes (D3-Ap-critique.md).
//   node D3-Ap-crit-probe.mjs story <demo-dist> [--engine chromium|webkit] [--out <dir>] [--frames n]
//     The glass-material story's "the bound" section: the two plates over the live canvas. Per theme and frame:
//     each plate's computed paint, its painted interior (a text-free strip), the canvas ground beside it, and the
//     implied α = (C − G) / (P − G) per linear channel against the computed `--card` pole. No getContext() on the
//     live canvas: the ground is read from the screenshot only.
//   node D3-Ap-crit-probe.mjs grounds <capdir>
//     The light ladder's composites over every ground in a harness capture: L, ΔE from paper and from the pole,
//     against HEAD's grey `#d7d4ce` (L 0.871).
//   node D3-Ap-crit-probe.mjs variant <dist> <worktree> <id> --css '<css>' [--scenes s] [--grounds g] [--engines e] [--themes t]
//     One injected variant captured into $D3_OUT/caps/crit-<id> (relabelled `base`), as D3-Ap-plants.mjs does.
//   node D3-Ap-crit-probe.mjs held <capdir>
//     Each held plate's painted α over black/white beside its computed bound, and its sample rect beside the
//     plate's painted extent (the geometry suspect for the held dock's residual).
import os from "node:os";
import { capture } from "../harness/capture.mjs";
import { OUT, paintedAlpha } from "../harness/lib.mjs";
import fs from "node:fs";
import path from "node:path";
import { PNG, VIEW, WEBKIT_SHIM, CHROMIUM_ARGS, cli, loadCapture, pick, composite, lch, dE, hex, f, lin, playwright, serve } from "../harness/lib.mjs";

const mode = process.argv[2];
const a = cli({ engine: { type: "string" }, out: { type: "string" }, frames: { type: "string" }, css: { type: "string" }, scenes: { type: "string" }, grounds: { type: "string" }, engines: { type: "string" }, themes: { type: "string" } });

const median = (px) => [0, 1, 2].map((k) => { const v = px.map((p) => p[k]).sort((x, y) => x - y); return v[v.length >> 1]; });
function rect(png, x0, y0, w, h) {
  const px = [];
  for (let y = Math.round(y0); y < Math.round(y0 + h); y++) for (let x = Math.round(x0); x < Math.round(x0 + w); x++) {
    if (x < 0 || y < 0 || x >= png.width || y >= png.height) continue;
    const i = (y * png.width + x) * 4; px.push([png.data[i], png.data[i + 1], png.data[i + 2]]);
  }
  return median(px);
}
const impliedAlpha = (C, G, P) => { const r = [0, 1, 2].map((k) => { const d = lin(P[k]) - lin(G[k]); return Math.abs(d) < 0.05 ? null : (lin(C[k]) - lin(G[k])) / d; }).filter((v) => v != null); return r.length ? r.reduce((s, v) => s + v, 0) / r.length : null; };
const parseRgb = (s) => { const m = String(s).match(/[\d.]+/g); return m ? m.slice(0, 3).map(Number) : null; };

if (mode === "story") {
  const dist = path.resolve(process.argv[3]);
  const engine = a.engine || "chromium", frames = Number(a.frames || 4);
  const out = path.resolve(a.out || "."); fs.mkdirSync(out, { recursive: true });
  const pw = await playwright();
  const browser = await pw[engine].launch(engine === "chromium" ? { args: CHROMIUM_ARGS } : {});
  const srv = await serve(dist);
  for (const theme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: VIEW, deviceScaleFactor: 1, colorScheme: theme });
    const page = await ctx.newPage();
    if (engine === "webkit") await page.addInitScript((css) => { document.addEventListener("DOMContentLoaded", () => { const s = document.createElement("style"); s.textContent = css; document.head.append(s); }); }, WEBKIT_SHIM);
    await page.goto(`${srv.url}?capture=/substrates/glass-material&mode=${theme}`, { waitUntil: "load", timeout: 120000 });
    await page.waitForSelector("html[data-capture-ready]", { timeout: 60000 });
    await page.locator("[data-material-live-canvas]").scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);
    for (let fr = 0; fr < frames; fr++) {
      const info = await page.evaluate(() => {
        const cv = document.querySelector("[data-material-live-canvas]"), box = cv.parentElement;
        const probe = document.createElement("div"); probe.style.color = "var(--card)"; box.append(probe);
        const card = getComputedStyle(probe).color; probe.remove();
        const plates = [...box.children].filter((el) => /glass-(floating|wash)/.test(el.className)).map((el) => {
          const cs = getComputedStyle(el), r = el.getBoundingClientRect();
          return { cls: el.className.match(/glass-(floating|wash)/)[0], x: r.x, y: r.y, w: r.width, h: r.height, bg: cs.backgroundColor, bf: cs.backdropFilter || cs.webkitBackdropFilter, bound: cs.getPropertyValue("--glass-bound").trim(), rung: cs.getPropertyValue("--glass-veil-rung").trim(), level: cs.getPropertyValue("--glass-level").trim() };
        });
        const br = box.getBoundingClientRect();
        return { card, ground: box.getAttribute("data-ground"), box: { x: br.x, y: br.y, w: br.width, h: br.height }, plates };
      });
      const buf = await page.screenshot();
      const png = PNG.sync.read(buf);
      if (fr === 0) fs.writeFileSync(path.join(out, `story-bound-${engine}-${theme}.png`), buf);
      const P = parseRgb(info.card);
      for (const p of info.plates) {
        const C = rect(png, p.x + 14, p.y + 3, p.w - 28, 6);                // a text-free strip under the top edge
        const G = rect(png, info.box.x + 3, p.y + p.h / 2 - 10, 10, 20);   // the canvas in the frame's left padding
        const L = lch(C)[0], al = impliedAlpha(C, G, P);
        console.log(`${engine} ${theme} frame ${fr} ground=${info.ground} ${p.cls}: composite ${hex(C)} L ${f(L, 3)} · ground ${hex(G)} L ${f(lch(G)[0], 3)} · pole ${hex(P)} · implied α ${f(al, 3)} · bg ${p.bg} · bound ${p.bound} · level ${p.level} · filter ${p.bf} · ΔE(HEAD grey #d7d4ce) ${f(dE(C, [215, 212, 206]), 3)}`);
      }
      await page.waitForTimeout(700);
    }
    await ctx.close();
  }
  await browser.close(); srv.close?.();
} else if (mode === "grounds") {
  const cap = loadCapture(path.resolve(process.argv[3]));
  for (const engine of ["chromium", "webkit"]) for (const theme of ["light", "dark"]) {
    const paperCell = pick(cap, { engine, theme, ground: "paper", scene: "ladder" })[0];
    for (const ground of ["paper", "black", "white", "checker", "stripes", "aurora", "aurora50", "red"]) {
      const c = pick(cap, { engine, theme, ground, scene: "ladder" })[0]; if (!c) continue;
      const rows = [];
      for (const s of c.specs) { if (!s.sample) continue; const C = composite(cap, c, s); if (!C) continue;
        const ps = paperCell && paperCell.specs.find((x) => x.id === s.id); const Cp = ps ? composite(cap, paperCell, ps) : null;
        rows.push(`${s.id} ${hex(C)} L ${f(lch(C)[0], 3)} C ${f(lch(C)[1], 3)}${Cp ? ` ΔE(paper-composite) ${f(dE(C, Cp), 3)}` : ""}`); }
      console.log(`${engine === "webkit" ? "webkit+shim" : engine} ${theme} ${ground}: ${rows.join(" | ")}`);
    }
  }
} else if (mode === "variant") {
  const [dist, wt, id] = process.argv.slice(3, 6);
  const root = path.join(OUT, "caps"), capdir = path.join(root, `crit-${id}`), css = path.join(root, `crit-${id}.css`);
  fs.mkdirSync(root, { recursive: true }); fs.writeFileSync(css, a.css + "\n");
  console.log(`== crit-${id} · load ${os.loadavg().map((x) => x.toFixed(1)).join(" ")}`);
  await capture(path.resolve(dist), { out: capdir, engines: a.engines, themes: a.themes, scenes: a.scenes, grounds: a.grounds, variant: id, inject: css, worktree: path.resolve(wt), quiet: true });
  const f2 = path.join(capdir, "cells.json"), d = JSON.parse(fs.readFileSync(f2, "utf8"));
  for (const k of ["cells", "live", "motion"]) for (const c of d[k] || []) c.variant = "base";
  fs.writeFileSync(f2, JSON.stringify(d, null, 1));
  console.log(`== done · load ${os.loadavg().map((x) => x.toFixed(1)).join(" ")}`);
} else if (mode === "held") {
  const cap = loadCapture(path.resolve(process.argv[3]));
  for (const engine of ["chromium", "webkit"]) for (const theme of ["light", "dark"]) {
    const cb = pick(cap, { engine, theme, ground: "black", scene: "held" })[0], cw = pick(cap, { engine, theme, ground: "white", scene: "held" })[0];
    if (!cb || !cw) continue;
    for (const s of cb.specs) { if (!s.sample) continue; const sw = cw.specs.find((x) => x.id === s.id); const al = paintedAlpha(cap, cb, cw, s);
      console.log(`${engine === "webkit" ? "webkit+shim" : engine} ${theme} ${s.id}: painted α ${al.alpha.toFixed(3)} (bound ${s.bound}) · black ${hex(composite(cap, cb, s))} white ${hex(composite(cap, cw, sw))} · sample ${JSON.stringify(s.sample)} rect ${JSON.stringify(s.rect || s.box || null)}`); }
  }
} else { console.error("usage: node D3-Ap-crit-probe.mjs story <demo-dist> | grounds <capdir>"); process.exit(2); }
