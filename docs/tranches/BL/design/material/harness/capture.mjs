#!/usr/bin/env node
// capture.mjs · render a specimen build (or a fixture directory) in every cell and save the painted captures
// and the layout geometry the witnesses read. All browser work lives here; the witnesses only read PNGs.
//
//   node capture.mjs <dist-or-fixture-dir> [--out <capdir>] [--engines chromium,webkit] [--themes light,dark]
//        [--grounds paper,aurora,aurora50,black,white,checker,stripes] [--scenes ladder,dialog,halo,empty]
//        [--live] [--live-ms 9000] [--variant base] [--inject <css>] [--worktree <path>]
//        [--signal-props --glass-backdrop-luma] [--wait-field 7000] [--wait-flat 2000]
//
// Per cell (engine × theme × ground × scene × variant): a fresh context at 1280×900, DPR 1, prefers-reduced-
// motion: reduce (the aurora parks after one frame, so every capture of a cell sees the same field), and
//   full    as painted                         noink  text fill transparent (strokes and halos kept)
//   maskA   text fill #00ff00, no stroke       maskB  text fill #ff00ff, no stroke  → glyph coverage
//   raw     every [data-spec] and scrim hidden → the bare ground
//   ring-*  one clip per [data-ring], focused with keyboard modality
// The halo scene captures `on` and `off` (capsules hidden); the empty scene captures `full`.
// The live pass (--live; Chromium; the field grounds) runs with motion on, counts main-thread readbacks
// (getImageData and WebGL readPixels, by wrapping the prototypes; no canvas context is ever requested),
// records the dock's published signal, then steps the field's ceiling and records the signal per frame.
// The live WebGPU field is observed only by screenshot.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { OUT, GROUNDS, FIELD_GROUNDS, THEMES, ENGINES, VIEW, CHROMIUM_ARGS, cli, list, playwright, serve, cellKey, readPng, region, mean3, Y } from "./lib.mjs";

const COUNTER = `(() => { const S = window.__hx = { readbacks: 0, gid: 0, rp: 0, alphas: [], ms: [] };
  const wrap = (P, name, kind) => { if (!P || !P[name]) return; const o = P[name]; P[name] = function (...a) { const t = performance.now(); const r = o.apply(this, a);
    S.ms.push(+(performance.now() - t).toFixed(2)); S.readbacks++; S[kind]++;
    if (kind === 'gid' && r && r.data) { let s = 0, n = 0; for (let i = 3; i < r.data.length; i += 4) { s += r.data[i]; n++; } S.alphas.push(n ? +(s / n / 255).toFixed(3) : 0); }
    return r; }; };
  wrap(window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype, 'getImageData', 'gid');
  wrap(window.OffscreenCanvasRenderingContext2D && OffscreenCanvasRenderingContext2D.prototype, 'getImageData', 'gid');
  wrap(window.WebGLRenderingContext && WebGLRenderingContext.prototype, 'readPixels', 'rp');
  wrap(window.WebGL2RenderingContext && WebGL2RenderingContext.prototype, 'readPixels', 'rp'); })();`;

const MODE_CSS = `
html[data-cap="noink"] [data-ink], html[data-cap="noink"] [data-ink] * { -webkit-text-fill-color: transparent !important; }
html[data-cap="noink"] [data-ink]::placeholder { -webkit-text-fill-color: transparent !important; color: transparent !important; }
html[data-cap="noink"] [data-ink] svg { visibility: hidden !important; }
html[data-cap="maskA"] [data-ink], html[data-cap="maskA"] [data-ink] * { -webkit-text-fill-color: #00ff00 !important; -webkit-text-stroke-width: 0 !important; text-shadow: none !important; }
html[data-cap="maskA"] [data-ink]::placeholder { -webkit-text-fill-color: #00ff00 !important; color: #00ff00 !important; opacity: 1 !important; text-shadow: none !important; }
html[data-cap="maskB"] [data-ink], html[data-cap="maskB"] [data-ink] * { -webkit-text-fill-color: #ff00ff !important; -webkit-text-stroke-width: 0 !important; text-shadow: none !important; }
html[data-cap="maskB"] [data-ink]::placeholder { -webkit-text-fill-color: #ff00ff !important; color: #ff00ff !important; opacity: 1 !important; text-shadow: none !important; }
html[data-cap="raw"] [data-spec], html[data-cap="raw"] [data-raw-hide] { visibility: hidden !important; }
html[data-cap="off"] [data-halo-capsule] { visibility: hidden !important; }
* { caret-color: transparent !important; }
`;

// In-page: layout geometry only. Probes carry pixel rows/columns; no colour is read here.
const GEOM = `(() => {
  const px = (v) => parseFloat(v) || 0;
  const R = (el) => { const r = el.getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; };
  const range = (a, b) => { const o = []; for (let x = a; x <= b; x++) o.push(x); return o; };
  const topCols = (r, rad) => { const x0 = Math.ceil(r.left + rad + 2), x1 = Math.floor(r.right - rad - 2); const c = Math.round(r.left + r.width / 2);
    return x1 - x0 >= 3 ? range(x0, Math.min(x1, x0 + 160)) : [c - 1, c, c + 1]; };
  const textBox = (el) => {
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") { const cs = getComputedStyle(el), r = el.getBoundingClientRect();
      const l = px(cs.borderLeftWidth) + px(cs.paddingLeft), rr = px(cs.borderRightWidth) + px(cs.paddingRight), t = px(cs.borderTopWidth) + 2, b = px(cs.borderBottomWidth) + 2;
      return [r.left + l - 3, r.top + t, r.width - l - rr + 6, r.height - t - b]; }
    const rg = document.createRange(); rg.selectNodeContents(el); const t = rg.getBoundingClientRect(); return [t.left - 3, t.top - 3, t.width + 6, t.height + 6]; };
  const borderProbe = (el) => { const cs = getComputedStyle(el), bw = Math.round(px(cs.borderTopWidth));
    if (!bw || cs.borderTopStyle === "none" || cs.borderTopStyle === "hidden") return { painted: false, note: "no border painted" };
    const r = el.getBoundingClientRect(), T = Math.round(r.top), rad = Math.min(px(cs.borderTopLeftRadius), r.height / 2, r.width / 2);
    const band = range(T, T + bw - 1); return { painted: true, kind: "border", width: bw, cols: topCols(r, rad).map((x) => ({ x, band, in: T + bw, out: T - 1 })) }; };
  const specs = [...document.querySelectorAll("[data-spec]")].map((el) => ({
    id: el.dataset.spec, band: el.dataset.band || null, rect: R(el),
    sample: (() => { const s = el.querySelector("[data-sample]"); if (!s) return null; const r = R(s); return [r[0] + 3, r[1] + 3, r[2] - 6, r[3] - 6]; })(),
    inks: [...el.querySelectorAll("[data-ink]")].map((i) => ({ id: i.dataset.ink, box: textBox(i) })),
    edges: [...el.querySelectorAll("[data-edge]")].map((e) => ({ id: e.dataset.edge, ...borderProbe(e) })),
    rings: [...el.querySelectorAll("[data-ring]")].map((e) => e.dataset.ring) }));
  const bare = document.querySelector("[data-bare]");
  const halo = [...document.querySelectorAll("[data-halo-host],[data-halo-ref]")].map((h) => ({ id: h.dataset.haloHost || "ref", ref: h.hasAttribute("data-halo-ref"), rect: R(h), capsule: R(h.querySelector("[data-halo-capsule]")) }));
  const aur = document.querySelector("[data-aurora-substrate]");
  return { specs, bare: bare ? R(bare) : null, halo, substrate: aur ? aur.getAttribute("data-aurora-substrate") : null, errors: window.__errors || 0 };
})()`;

const RING = `((id) => { const px = (v) => parseFloat(v) || 0;
  const el = [...document.querySelectorAll("[data-ring]")].find((e) => e.dataset.ring === id && !e.__hxDone) || null; if (!el) return null; el.__hxDone = true;
  el.focus({ preventScroll: true }); return true; })`;
const RING_PROBE = `((id) => { const px = (v) => parseFloat(v) || 0; const el = document.activeElement; if (!el || el.dataset.ring !== id) return { painted: false, note: "focus did not land" };
  const cs = getComputedStyle(el), ow = Math.round(px(cs.outlineWidth)), off = Math.round(px(cs.outlineOffset));
  const r = el.getBoundingClientRect(); const spec = el.closest("[data-spec]");
  const clip = [Math.floor(r.left) - 16, Math.floor(r.top) - 16, Math.ceil(r.width) + 32, Math.ceil(r.height) + 32];
  if (!ow || cs.outlineStyle === "none") return { painted: false, note: "no focus outline painted", clip, spec: spec && spec.dataset.spec, focusVisible: el.matches(":focus-visible") };
  const T = Math.round(r.top), top = T - off - ow, rad = Math.min(px(cs.borderTopLeftRadius) + Math.max(0, off), r.height / 2 + off, r.width / 2 + off);
  const range = (a, b) => { const o = []; for (let x = a; x <= b; x++) o.push(x); return o; };
  const x0 = Math.ceil(r.left - off + rad + 2), x1 = Math.floor(r.right + off - rad - 2), c = Math.round(r.left + r.width / 2);
  const xs = x1 - x0 >= 3 ? range(x0, Math.min(x1, x0 + 160)) : [c - 1, c, c + 1];
  const band = range(top, top + ow - 1);
  return { painted: true, kind: "outline", width: ow, offset: off, clip, spec: spec && spec.dataset.spec, focusVisible: el.matches(":focus-visible"), cols: xs.map((x) => ({ x, band, in: top + ow, out: top - 1 })) }; })`;

const SIGNALS = `((props) => { const d = document.querySelector('[data-spec="dock"]'); const S = window.__hx || {};
  const sig = d ? { state: d.getAttribute("data-backdrop-sample-state"), reason: d.getAttribute("data-backdrop-sample-reason"), source: d.getAttribute("data-backdrop-sample-source"),
    props: Object.fromEntries(props.map((p) => [p, getComputedStyle(d).getPropertyValue(p).trim()])) } : null;
  return { dock: sig, readbacks: S.readbacks || 0, getImageData: S.gid || 0, readPixels: S.rp || 0, alphaMax: S.alphas && S.alphas.length ? Math.max(...S.alphas) : null, msMax: S.ms && S.ms.length ? Math.max(...S.ms) : null }; })`;

export async function capture(target, o = {}) {
  target = path.resolve(target);
  const buildMeta = fs.existsSync(path.join(target, "build.json")) ? JSON.parse(fs.readFileSync(path.join(target, "build.json"), "utf8")) : {};
  const label = o.label || buildMeta.label || path.basename(target);
  const capdir = path.resolve(o.out || path.join(OUT, "caps", label));
  fs.mkdirSync(path.join(capdir, "png"), { recursive: true });
  const cellsFile = path.join(capdir, "cells.json");
  const prev = fs.existsSync(cellsFile) ? JSON.parse(fs.readFileSync(cellsFile, "utf8")) : { cells: [], live: [] };
  const engines = list(o.engines, ENGINES), themes = list(o.themes, THEMES), grounds = list(o.grounds, GROUNDS);
  const scenes = list(o.scenes, ["ladder", "dialog", "halo", "empty"]);
  const variant = o.variant || "base", props = list(o.signalProps, ["--glass-backdrop-luma"]);
  const waitField = +(o.waitField || 7000), waitFlat = +(o.waitFlat || 2000), liveMs = +(o.liveMs || 9000);
  const inject = o.inject ? fs.readFileSync(path.resolve(o.inject), "utf8") : "";
  const pw = await playwright();
  const server = await serve(target);
  const cells = [], live = [], versions = {};
  const t0 = Date.now();
  const log = (s) => { if (!o.quiet) console.log(s); };
  for (const engine of engines) {
    const browser = await pw[engine].launch({ headless: true, args: engine === "chromium" ? CHROMIUM_ARGS : [] });
    versions[engine] = browser.version();
    for (const theme of themes) for (const ground of grounds) for (const scene of scenes) {
      if (scene === "halo" && ground !== "paper") continue;
      if (scene === "empty" && !FIELD_GROUNDS.includes(ground)) continue;
      const nodock = engine === "webkit";
      const base = { engine, theme, ground, scene, variant, nodock, files: {} };
      const stem = `${engine}-${theme}-${ground}-${scene}-${variant}`;
      const ctx = await browser.newContext({ viewport: VIEW, deviceScaleFactor: 1, colorScheme: theme, reducedMotion: "reduce" });
      await ctx.addInitScript(COUNTER);
      const page = await ctx.newPage();
      const errs = []; let crashed = false;
      page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
      page.on("crash", () => { crashed = true; });
      try {
        await page.goto(`${server.url}index.html?scene=${scene}&ground=${ground}&theme=${theme}${nodock ? "&nodock=1" : ""}`, { waitUntil: "load", timeout: 120000 });
        await page.addStyleTag({ content: MODE_CSS + inject });
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(FIELD_GROUNDS.includes(ground) ? waitField : waitFlat);
        await page.mouse.move(VIEW.width - 1, VIEW.height - 1);
        await page.evaluate(() => { if (!document.activeElement?.closest?.("[data-slot=dialog-content]")) document.activeElement?.blur?.(); });
        await page.waitForTimeout(300);
        const geom = await page.evaluate(GEOM);
        const modes = scene === "halo" ? ["on", "off"] : scene === "empty" ? ["full"] : ["full", "noink", "maskA", "maskB", "raw"];
        for (const mode of modes) {
          await page.evaluate((m) => document.documentElement.setAttribute("data-cap", m), mode);
          await page.waitForTimeout(250);
          const file = `png/${stem}-${mode}.png`;
          fs.writeFileSync(path.join(capdir, file), await page.screenshot({ type: "png" }));
          base.files[mode] = file;
        }
        await page.evaluate(() => document.documentElement.removeAttribute("data-cap"));
        const signals = await page.evaluate(SIGNALS + "(" + JSON.stringify(props) + ")");
        const rings = [];
        const ringIds = geom.specs.flatMap((s) => s.rings);
        if (ringIds.length) {
          await page.keyboard.press("Shift");  // a keyboard interaction, so programmatic focus shows :focus-visible
          await page.keyboard.press("Tab"); await page.keyboard.press("Shift+Tab");
          for (const id of ringIds) {
            if (!(await page.evaluate(RING + "(" + JSON.stringify(id) + ")"))) continue;
            await page.waitForTimeout(450);
            const probe = await page.evaluate(RING_PROBE + "(" + JSON.stringify(id) + ")");
            if (probe.clip) {
              const [x, y, w, h] = probe.clip; const file = `png/${stem}-ring-${probe.spec}-${id}.png`;
              fs.writeFileSync(path.join(capdir, file), await page.screenshot({ type: "png", clip: { x: Math.max(0, x), y: Math.max(0, y), width: w, height: h } }));
              probe.file = file; probe.dx = Math.max(0, x); probe.dy = Math.max(0, y);
            }
            rings.push({ id, ...probe });
          }
        }
        Object.assign(base, { specs: geom.specs, bare: geom.bare, halo: geom.halo, substrate: geom.substrate, appErrors: geom.errors, signals, rings, errs, crashed });
      } catch (e) {
        Object.assign(base, { crashed: true, error: String(e).split("\n")[0].slice(0, 240), errs });
      }
      cells.push(base);
      log(`${stem}: ${base.crashed ? "CRASH " + (base.error || "") : `${base.specs.length} specs, ${base.rings.length} rings, readbacks ${base.signals.readbacks}${base.signals.dock ? `, dock ${base.signals.dock.state}` : ""}${errs.length ? `, ${errs.length} page errors` : ""}`}`);
      await ctx.close().catch(() => {});
    }
    if (o.live && engine === "chromium") {
      for (const theme of themes) for (const ground of grounds.filter((g) => FIELD_GROUNDS.includes(g))) for (const feed of [false, true]) {
        const ctx = await browser.newContext({ viewport: VIEW, deviceScaleFactor: 1, colorScheme: theme, reducedMotion: "no-preference" });
        await ctx.addInitScript(COUNTER);
        const page = await ctx.newPage();
        const rec = { engine, theme, ground, feed, variant, liveMs };
        try {
          await page.goto(`${server.url}index.html?scene=ladder&ground=${ground}&theme=${theme}${feed ? "&feed=1" : ""}`, { waitUntil: "load", timeout: 120000 });
          await page.addStyleTag({ content: MODE_CSS + inject });
          await page.mouse.move(VIEW.width - 1, VIEW.height - 1);
          await page.waitForTimeout(liveMs);
          Object.assign(rec, await page.evaluate(SIGNALS + "(" + JSON.stringify(props) + ")"));
          rec.gpu = await page.evaluate(async () => (navigator.gpu ? !!(await navigator.gpu.requestAdapter().catch(() => null)) : false));
          const to = ground === "aurora50" ? 1 : 0.5;
          rec.step = await page.evaluate(async ([p, to]) => {
            const d = document.querySelector('[data-spec="dock"]'); if (!d || !window.__harness) return null;
            const read = () => { const v = parseFloat(getComputedStyle(d).getPropertyValue(p)); return Number.isFinite(v) ? v : null; };
            const series = [read()]; window.__harness.setCeiling(to);
            for (let i = 0; i < 90; i++) { await new Promise((r) => requestAnimationFrame(r)); series.push(read()); }
            const r = d.getBoundingClientRect(); return { prop: p, to, series, rect: [r.left, r.top, r.width, r.height] };
          }, [props[0], to]);
          if (rec.step) {
            await page.evaluate(() => document.documentElement.setAttribute("data-cap", "raw")); await page.waitForTimeout(60);
            const file = `png/live-${theme}-${ground}-${feed ? "feed" : "default"}-${variant}-raw.png`;
            const buf = await page.screenshot({ type: "png" }); fs.writeFileSync(path.join(capdir, file), buf);
            rec.step.file = file;
            rec.step.after = await page.evaluate((p) => { const d = document.querySelector('[data-spec="dock"]'); const v = parseFloat(getComputedStyle(d).getPropertyValue(p)); return Number.isFinite(v) ? v : null; }, props[0]);
          }
        } catch (e) { rec.error = String(e).split("\n")[0].slice(0, 240); }
        live.push(rec);
        log(`live ${theme} ${ground} ${feed ? "fed" : "default"}: readbacks ${rec.readbacks} (getImageData ${rec.getImageData}, alpha max ${rec.alphaMax}), dock ${rec.dock?.state}/${rec.dock?.reason}, ${props[0]}=${rec.dock?.props?.[props[0]]}${rec.error ? " ERROR " + rec.error : ""}`);
        await ctx.close().catch(() => {});
      }
    }
    await browser.close();
  }
  server.close();
  const keep = (arr, fresh, key) => { const ks = new Set(fresh.map(key)); return [...arr.filter((c) => !ks.has(key(c))), ...fresh]; };
  const liveKey = (r) => [r.engine, r.theme, r.ground, r.feed, r.variant].join("/");
  const doc = {
    meta: { ...(prev.meta || {}), target, label, worktree: o.worktree || buildMeta.worktree || prev.meta?.worktree || null, sha: buildMeta.sha || prev.meta?.sha || null,
      versions: { ...(prev.meta?.versions || {}), ...versions }, captured: new Date().toISOString(), load: os.loadavg().map((v) => +v.toFixed(1)), seconds: +((Date.now() - t0) / 1000).toFixed(1) },
    cells: keep(prev.cells || [], cells, cellKey), live: keep(prev.live || [], live, liveKey) };
  fs.writeFileSync(cellsFile, JSON.stringify(doc, null, 1));
  log(`captured ${cells.length} cells and ${live.length} live windows in ${doc.meta.seconds}s (load ${doc.meta.load.join(" ")}) → ${capdir}`);
  return { capdir, doc };
}

// Mean relative luminance of the painted field under a rect (W-B), from a raw screenshot.
export function lumaUnder(file, rect) { return mean3(region(readPng(file), rect).map((p) => [Y(p), 0, 0]))[0]; }

if (import.meta.url === `file://${process.argv[1]}`) {
  const a = cli({ out: { type: "string" }, engines: { type: "string" }, themes: { type: "string" }, grounds: { type: "string" }, scenes: { type: "string" },
    live: { type: "boolean" }, "live-ms": { type: "string" }, variant: { type: "string" }, inject: { type: "string" }, worktree: { type: "string" },
    "signal-props": { type: "string" }, "wait-field": { type: "string" }, "wait-flat": { type: "string" }, label: { type: "string" }, quiet: { type: "boolean" } });
  if (!a._[0]) { console.error("usage: node capture.mjs <dist-or-fixture-dir> [--out capdir] …"); process.exit(2); }
  await capture(a._[0], { ...a, liveMs: a["live-ms"], signalProps: a["signal-props"], waitField: a["wait-field"], waitFlat: a["wait-flat"] });
}
