#!/usr/bin/env node
// capture.mjs · render a specimen build (or a fixture directory) in every cell and save the painted captures
// and the layout geometry the witnesses read. All browser work lives here; the witnesses only read PNGs.
//
//   node capture.mjs <dist-or-fixture-dir> [--out <capdir>] [--engines chromium,webkit] [--themes light,dark]
//        [--grounds paper,aurora,aurora50,black,white,checker,stripes,red] [--scenes ladder,dialog,halo,empty,held,hostile,state,isolated]
//        [--live] [--live-ms 9000] [--motion] [--motion-ms 3000] [--step-ms 1500] [--variant base] [--inject <css>]
//        [--worktree <path>] [--signal-props --glass-backdrop-luma] [--wait-field 7000] [--wait-flat 2000]
//        [--no-webkit-shim] [--probe-unshimmed] [--drift] [--drift-ms 100000] [--drift-every 2000] [--release-ms 1200]
// A scene is captured only on the grounds lib.mjs SCENE_GROUNDS lists for it.
//
// Per cell (engine × theme × ground × scene × variant): a fresh context at 1280×900, DPR 1, prefers-reduced-
// motion: reduce (the aurora parks after one frame, so every capture of a cell sees the same field), and
//   full    as painted                         noink  text fill transparent (strokes and halos kept)
//   maskA   text fill #00ff00, no stroke       maskB  text fill #ff00ff, no stroke  → glyph coverage
//   raw     every [data-spec] and scrim hidden → the bare ground
//   ring-*  one clip per [data-ring], focused with keyboard modality
// The halo scene captures `on` and `off` (capsules hidden); the empty scene captures `full`.
// The live pass (--live; every engine, Playwright WebKit +shim; the field grounds; H-3: one default dock, the fed window is retired) runs with
// motion on and counts, behaviourally and whatever the writer is named, (a) main-thread readbacks: getImageData,
// WebGL readPixels and canvas toDataURL, by wrapping the prototypes (no canvas context is ever requested); and
// (b) custom-property writes per animation frame, from any source: CSSStyleDeclaration.setProperty, Typed-OM
// StylePropertyMap.set, a `style` attribute rewrite, a <style> text rewrite and CSSStyleSheet insertRule/replace.
// It then steps the field's ceiling and records the dock's signal property per frame (W-B, banked).
// The motion pass (--motion; H-11; Chromium and Playwright WebKit; the field grounds; the ladder scene) runs with
// motion on and saves whole frames: `motion` frames spread over --motion-ms of the moving field, and `step` frames
// from 200 ms before to --step-ms after a ceiling step. Chromium frames are the compositor's own (CDP
// Page.startScreencast, PNG, every frame); Playwright WebKit frames are a page.screenshot loop (sparser; labelled).
// Playwright WebKit mounts GlassDock only under D2's crash shim (H-14, lib.mjs WEBKIT_SHIM); every WebKit cell is
// "+shim", and --probe-unshimmed records whether the unshimmed dock still crashes (so the shim never hides it).
// H3-5: a held cell (the pointer pressed on [data-press]) also records the RELEASE window: whole frames from 100 ms before
// the pointer lifts to --release-ms after (Chromium: the CDP screencast, every composited frame; Playwright WebKit: a
// page.screenshot loop), so the witness reads the carriers' hand-off and the unmount, not only the hold.
// H3-12: the drift pass (--drift; both engines; the ladder over the c1 aurora; both themes; motion on) samples one whole
// frame every --drift-every ms for --drift-ms (100 s). Each frame is written to disk as it is taken and nothing is held
// in memory, so the window's heap is one frame (pass 2's 90 s screencast window exhausted the node heap by keeping all).
// Every cell also records its console errors and warnings, counted and as text (H3-8: a colour retune refused loud; H4-4:
// W-C counts only the messages that name a glass token, so it needs the text, not a count).
// Playwright WebKit is retired and relaunched every NAV_CAP (60) page loads of one browser process: macOS AppSSO stops
// answering at about the 90th navigation (tile pass-3 H3-1). Each relaunch is recorded in meta.navRetired.
// The same class can strike below the cap when the machine is saturated (H4: one page open sat unanswered for 45 min at
// load 500-1000, with no timeout to end it). So every Playwright WebKit page open, cell and context close runs under a
// deadline (OPEN_MS, CELL_MS, CLOSE_MS); past it the browser is killed and relaunched, and the page open or the cell is
// tried once more. Each is recorded in meta.navStalled and printed; a cell that stalls twice is a CRASH row, as before.
// The live WebGPU field is observed only by screenshot.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import { holdWebkitLock, OUT, GROUNDS, EXTRA_GROUNDS, FIELD_GROUNDS, SCENES, SCENE_GROUNDS, THEMES, ENGINES, VIEW, CHROMIUM_ARGS, NAV_CAP, BOUND_PROP, FLAT_ATTR, GROUND_STATE_ATTR, WEBKIT_SHIM, cli, list, playwright, serve, cellKey, readPng, region, mean3, Y } from "./lib.mjs";

const OPEN_MS = +(process.env.D3_OPEN_MS || 90000), CELL_MS = +(process.env.D3_CELL_MS || 600000), CLOSE_MS = 30000;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const deadline = (p, ms, what) => { let t; return Promise.race([p, new Promise((_, rej) => { t = setTimeout(() => rej(new Error(`STALL: ${what} unanswered after ${ms / 1000} s`)), ms); })]).finally(() => clearTimeout(t)); };
// A stalled Playwright WebKit does not answer close() either: kill this process's pw_run.sh children and theirs.
const killWebkit = () => { try { for (const pid of execFileSync("pgrep", ["-P", String(process.pid), "-f", "pw_run.sh"], { encoding: "utf8" }).split("\n").filter(Boolean)) {
  try { execFileSync("pkill", ["-9", "-P", pid]); } catch {} try { process.kill(+pid, "SIGKILL"); } catch {} } } catch {} };
const COUNTER = `(() => { const S = window.__hx = { readbacks: 0, gid: 0, rp: 0, url: 0, alphas: [], ms: [], frame: 0, writes: {}, wframes: {}, lastW: {} };
  const wrap = (P, name, kind) => { if (!P || !P[name]) return; const o = P[name]; P[name] = function (...a) { const t = performance.now(); const r = o.apply(this, a);
    S.ms.push(+(performance.now() - t).toFixed(2)); S.readbacks++; S[kind]++;
    if (kind === 'gid' && r && r.data) { let s = 0, n = 0; for (let i = 3; i < r.data.length; i += 4) { s += r.data[i]; n++; } S.alphas.push(n ? +(s / n / 255).toFixed(3) : 0); }
    return r; }; };
  wrap(window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype, 'getImageData', 'gid');
  wrap(window.OffscreenCanvasRenderingContext2D && OffscreenCanvasRenderingContext2D.prototype, 'getImageData', 'gid');
  wrap(window.WebGLRenderingContext && WebGLRenderingContext.prototype, 'readPixels', 'rp');
  wrap(window.WebGL2RenderingContext && WebGL2RenderingContext.prototype, 'readPixels', 'rp');
  wrap(window.HTMLCanvasElement && HTMLCanvasElement.prototype, 'toDataURL', 'url');
  // Custom-property writes, per animation frame, by name, from any source.
  const note = (name) => { if (!name || !String(name).startsWith('--')) return; name = String(name);
    S.writes[name] = (S.writes[name] || 0) + 1; if (S.lastW[name] !== S.frame) { S.lastW[name] = S.frame; S.wframes[name] = (S.wframes[name] || 0) + 1; } };
  const decls = (txt) => (String(txt || '').match(/--[A-Za-z0-9_-]+(?=\\s*:)/g) || []);
  for (const P of [window.CSSStyleDeclaration && CSSStyleDeclaration.prototype, window.CSSStyleProperties && CSSStyleProperties.prototype]) if (P && P.setProperty) {
    const o = P.setProperty; P.setProperty = function (n, ...a) { note(n); return o.call(this, n, ...a); }; }
  if (window.StylePropertyMap) { const o = StylePropertyMap.prototype.set; StylePropertyMap.prototype.set = function (n, ...a) { note(n); return o.call(this, n, ...a); }; }
  if (window.CSSStyleSheet) { const P = CSSStyleSheet.prototype;
    for (const k of ['insertRule', 'replaceSync', 'replace']) if (P[k]) { const o = P[k]; P[k] = function (t, ...a) { decls(t).forEach(note); return o.call(this, t, ...a); }; } }
  const mo = new MutationObserver((ms) => { for (const m of ms) {
    if (m.type === 'attributes' && m.attributeName === 'style') { const now = decls(m.target.getAttribute('style')), was = decls(m.oldValue);
      const a = m.target.getAttribute('style') || '', b = m.oldValue || '';
      for (const n of new Set([...now, ...was])) { const rx = new RegExp(n.replace(/[-]/g, '\\\\-') + '\\\\s*:([^;]*)'); if ((a.match(rx) || [])[1] !== (b.match(rx) || [])[1]) note(n); } }
    else { const el = m.target.nodeType === 3 ? m.target.parentNode : m.target; if (el && el.tagName === 'STYLE') decls(el.textContent).forEach(note); } } });
  const arm = () => mo.observe(document.documentElement, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['style'], childList: true, characterData: true });
  if (document.documentElement) arm(); else document.addEventListener('readystatechange', arm, { once: true });
  const tick = () => { S.frame++; requestAnimationFrame(tick); }; requestAnimationFrame(tick); })();`;

const MODE_CSS = `
html[data-cap="noink"] [data-ink], html[data-cap="noink"] [data-ink] * { -webkit-text-fill-color: transparent !important; }
html[data-cap="noink"] [data-ink]::placeholder { -webkit-text-fill-color: transparent !important; color: transparent !important; }
html[data-cap="noink"] [data-ink] svg { visibility: hidden !important; }
html[data-cap="maskA"] [data-ink], html[data-cap="maskA"] [data-ink] * { -webkit-text-fill-color: #00ff00 !important; -webkit-text-stroke-width: 0 !important; text-shadow: none !important; }
html[data-cap="maskA"] [data-ink]::placeholder { -webkit-text-fill-color: #00ff00 !important; color: #00ff00 !important; opacity: 1 !important; text-shadow: none !important; }
html[data-cap="maskB"] [data-ink], html[data-cap="maskB"] [data-ink] * { -webkit-text-fill-color: #ff00ff !important; -webkit-text-stroke-width: 0 !important; text-shadow: none !important; }
html[data-cap="maskB"] [data-ink]::placeholder { -webkit-text-fill-color: #ff00ff !important; color: #ff00ff !important; opacity: 1 !important; text-shadow: none !important; }
/* H-1: a descendant that sets visibility: visible (the dock layers do, dock/styles/layers.css) paints through a
   hidden ancestor, so raw hides every descendant of a surface too (S-10, PF-12). */
html[data-cap="raw"] [data-spec], html[data-cap="raw"] [data-spec] *, html[data-cap="raw"] [data-raw-hide] { visibility: hidden !important; }
html[data-cap="noink"] [data-fill] svg { visibility: hidden !important; }
html[data-cap="off"] [data-halo-capsule] { visibility: hidden !important; }
* { caret-color: transparent !important; }
`;

// In-page: layout geometry only. Probes carry pixel rows/columns; no colour is read here.
const GEOM = `((opts) => {
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
  const num = (el, p) => { const v = parseFloat(getComputedStyle(el).getPropertyValue(p)); return Number.isFinite(v) ? v : null; };
  // H3-11: does an element form a stacking context? From computed style and its parent's display (CSS 2.1 + the
  // properties that create one since). A z-index digit on a non-positioned, non-flex/grid item forms none.
  const stacking = (el) => { const cs = getComputedStyle(el), p = el.parentElement ? getComputedStyle(el.parentElement) : null, why = [];
    const z = cs.zIndex !== "auto", pos = cs.position, item = p && /(flex|grid)/.test(p.display);
    if (el === document.documentElement) why.push("root");
    if (pos === "fixed" || pos === "sticky") why.push("position " + pos);
    if ((pos === "absolute" || pos === "relative") && z) why.push("positioned z-index " + cs.zIndex);
    if (item && z) why.push("flex/grid item z-index " + cs.zIndex);
    if (parseFloat(cs.opacity) < 1) why.push("opacity " + cs.opacity);
    for (const k of ["transform", "scale", "rotate", "translate", "filter", "backdropFilter", "clipPath", "maskImage", "perspective"]) { const v = cs[k]; if (v && v !== "none" && v !== "auto") why.push(k); }
    if (cs.mixBlendMode && cs.mixBlendMode !== "normal") why.push("mix-blend-mode");
    if (cs.isolation === "isolate") why.push("isolation");
    if (/(layout|paint|strict|content)/.test(cs.contain || "")) why.push("contain " + cs.contain);
    if (/(size|inline-size)/.test(cs.containerType || "")) why.push("container-type");
    if (/(transform|opacity|filter|isolation|mix-blend-mode|z-index)/.test(cs.willChange || "")) why.push("will-change");
    return { forms: why.length > 0, why, zIndex: cs.zIndex, position: pos, parentDisplay: p ? p.display : null }; };
  // H3-5: the host's own backdrop-root formers while held (grasp.css's law; the library's arm reads the host-subject
  // slice). A host with a former standing is not declared graspable: its carriers would blur nothing.
  const formers = (host) => { const cs = getComputedStyle(host), after = getComputedStyle(host, "::after"), out = [];
    if (/paint|strict|content/.test(cs.contain || "")) out.push("contain " + cs.contain);
    if (cs.filter !== "none") out.push("filter"); if (parseFloat(cs.opacity) < 1) out.push("opacity");
    if (cs.maskImage && cs.maskImage !== "none") out.push("mask"); if (cs.clipPath && cs.clipPath !== "none") out.push("clip-path");
    if (cs.mixBlendMode !== "normal") out.push("mix-blend-mode");
    if (after && after.content !== "none" && after.display !== "none" && after.mixBlendMode && after.mixBlendMode !== "normal") out.push("::after mix-blend-mode " + after.mixBlendMode);
    return out; };
  const specs = [...document.querySelectorAll("[data-spec]")].map((el) => ({
    id: el.dataset.spec, band: el.dataset.band || null, rect: R(el),
    // H-4: the computed bound (FL-5's one source of record), read from the cascade on the plate itself.
    bound: num(el, opts.boundProp),
    // H-15: the flat-pole stamp, on the plate or any ancestor.
    flat: !!el.closest("[" + opts.flatAttr + "]"),
    // H-5: is the held register engaged (a [data-held] host on or inside the surface with its grasp carrier)?
    held: !!(el.matches("[data-held]") || el.querySelector("[data-held]")) && !!el.querySelector('.glass-grasp-carrier[data-grasp="grasp"]'),
    // H3-5: the grasp hosts on or inside the surface (the carriers' parent), their formers, and whether they form a stacking context (H3-11).
    hosts: [...new Set([...el.querySelectorAll('.glass-grasp-carrier[data-grasp="grasp"]')].map((c) => c.parentElement))].map((h) => ({
      cls: (h.getAttribute("class") || "").split(" ").filter(Boolean).slice(0, 4).join("."), formers: formers(h), stack: stacking(h) })),
    // H3-6, H3-7: the claim the surface sits under and the stamp on it or an ancestor.
    claim: el.closest("[data-glass-ground]")?.getAttribute("data-glass-ground") ?? null,
    stamp: el.closest("[" + opts.stampAttr + "]")?.getAttribute(opts.stampAttr) ?? null,
    fills: [...el.querySelectorAll("[data-fill]")].map((f) => ({ id: f.dataset.fill, rect: R(f) })),
    sample: (() => { const s = el.querySelector("[data-sample]"); if (!s) return null; const r = R(s); return [r[0] + 3, r[1] + 3, r[2] - 6, r[3] - 6]; })(),
    inks: [...el.querySelectorAll("[data-ink]")].map((i) => ({ id: i.dataset.ink, box: textBox(i) })),
    edges: [...el.querySelectorAll("[data-edge]")].map((e) => ({ id: e.dataset.edge, ...borderProbe(e) })),
    rings: [...el.querySelectorAll("[data-ring]")].map((e) => e.dataset.ring) }));
  const bare = document.querySelector("[data-bare]");
  const halo = [...document.querySelectorAll("[data-halo-host],[data-halo-ref]")].map((h) => ({ id: h.dataset.haloHost || "ref", ref: h.hasAttribute("data-halo-ref"), rect: R(h), capsule: R(h.querySelector("[data-halo-capsule]")) }));
  const aur = document.querySelector("[data-aurora-substrate]");
  const veil = [...document.querySelectorAll("[data-veil-probe]")].map((v) => R(v));
  // H3-9: the O-66 §1 probes (the trigger and Input strips; the menu rows), with the row's highlighted state.
  const probes = Object.fromEntries([...document.querySelectorAll("[data-probe]")].map((p) => [p.dataset.probe, { rect: R(p), highlighted: p.hasAttribute("data-highlighted") }]));
  const press = document.querySelector("[data-press]"), slider = press ? (press.closest(".glass-slider") || press) : null;
  return { specs, bare: bare ? R(bare) : null, halo, veil, probes, pressRect: slider ? R(slider) : null, substrate: aur ? aur.getAttribute("data-aurora-substrate") : null, errors: window.__errors || 0 };
})`;

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
  return { dock: sig, readbacks: S.readbacks || 0, getImageData: S.gid || 0, readPixels: S.rp || 0, toDataURL: S.url || 0, alphaMax: S.alphas && S.alphas.length ? Math.max(...S.alphas) : null, msMax: S.ms && S.ms.length ? Math.max(...S.ms) : null,
    frames: S.frame || 0, writes: { ...(S.writes || {}) }, wframes: { ...(S.wframes || {}) } }; })`;
// Reset the per-frame write tally (the live window counts only what happens inside it, after load and settle).
const WRESET = `(() => { const S = window.__hx; if (S) { S.frame = 0; S.writes = {}; S.wframes = {}; S.lastW = {}; S.readbacks = 0; S.gid = 0; S.rp = 0; S.url = 0; S.alphas = []; S.ms = []; } })()`;
const shimScript = (css) => `(() => { const add = () => { if (document.getElementById("hx-wk-shim")) return; const s = document.createElement("style"); s.id = "hx-wk-shim"; s.textContent = ${JSON.stringify(css)}; (document.head || document.documentElement).appendChild(s); };
  if (document.documentElement) add(); document.addEventListener("readystatechange", add); })();`;

export async function capture(target, o = {}) {
  target = path.resolve(target);
  const buildMeta = fs.existsSync(path.join(target, "build.json")) ? JSON.parse(fs.readFileSync(path.join(target, "build.json"), "utf8")) : {};
  const label = o.label || buildMeta.label || path.basename(target);
  const capdir = path.resolve(o.out || path.join(OUT, "caps", label));
  fs.mkdirSync(path.join(capdir, "png"), { recursive: true });
  const cellsFile = path.join(capdir, "cells.json");
  const prev = fs.existsSync(cellsFile) ? JSON.parse(fs.readFileSync(cellsFile, "utf8")) : { cells: [], live: [], motion: [] };
  const engines = list(o.engines, ENGINES), themes = list(o.themes, THEMES), grounds = list(o.grounds, [...GROUNDS, ...EXTRA_GROUNDS]);
  const scenes = list(o.scenes, SCENES);
  const variant = o.variant || "base", props = list(o.signalProps, ["--glass-backdrop-luma"]);
  const waitField = +(o.waitField || 7000), waitFlat = +(o.waitFlat || 2000), liveMs = +(o.liveMs || 9000);
  const motionMs = +(o.motionMs || 3000), stepMs = +(o.stepMs || 1500);
  const shim = !o.noWebkitShim;
  const geomOpts = JSON.stringify({ boundProp: o.boundProp || BOUND_PROP, flatAttr: FLAT_ATTR, stampAttr: GROUND_STATE_ATTR });
  const driftMs = +(o.driftMs || 100000), driftEvery = +(o.driftEvery || 2000), releaseMs = +(o.releaseMs || 1200);
  const inject = o.inject ? fs.readFileSync(path.resolve(o.inject), "utf8") : "";
  // --query: extra URL parameters for every page this capture opens (the specimen page's consumer switches, e.g.
  // `claim=honest`). The cells keep their variant: a witness reads the run it is pointed at.
  const qs = o.query ? "&" + String(o.query).replace(/^[&?]/, "") : "";
  const pw = await playwright();
  const server = await serve(target);
  const cells = [], live = [], motion = [], drift = [], versions = {}, unshimmed = {}, navRetired = {}, navStalled = {};
  const t0 = Date.now();
  const log = (s) => { if (!o.quiet) console.log(s); };
  const newPage = async (browser, engine, theme, reducedMotion) => {
    const ctx = await browser.newContext({ viewport: VIEW, deviceScaleFactor: 1, colorScheme: theme, reducedMotion });
    await ctx.addInitScript(COUNTER);
    if (engine === "webkit" && shim) await ctx.addInitScript(shimScript(WEBKIT_SHIM));
    const page = await ctx.newPage();
    return { ctx, page };
  };
  // Rest the pointer: press and hold [data-press] (the held dock), else rest on [data-hover], else the far corner.
  const restPointer = async (page) => {
    const at = await page.evaluate(() => { const c = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
      return { press: c(document.querySelector("[data-press]")), hover: c(document.querySelector("[data-hover]")) }; });
    if (at.press) { await page.mouse.move(...at.press); await page.mouse.down(); await page.waitForTimeout(700); return "press"; }
    if (at.hover) { await page.mouse.move(...at.hover); await page.waitForTimeout(400); return "hover"; }
    await page.mouse.move(VIEW.width - 1, VIEW.height - 1);
    // H3-9: [data-focus] takes focus after the pointer rests (the highlighted menu row).
    if (await page.evaluate(() => { const el = document.querySelector("[data-focus]"); if (!el) return false; el.focus(); return true; })) { await page.waitForTimeout(300); return "focus"; }
    return "rest";
  };
  // A window of whole frames around an action: Chromium keeps every composited frame (CDP screencast), Playwright
  // WebKit a page.screenshot loop. Frames are written as `${stem}-${kind}NNN.png`; returns [{ kind, t, file }] with t
  // relative to the action.
  const frameWindow = async (ctx, page, engine, stem, kind, preMs, postMs, act) => {
    const frames = [], keep = (buf, t) => { const file = `png/${stem}-${kind}${String(frames.length).padStart(3, "0")}.png`; fs.writeFileSync(path.join(capdir, file), buf); frames.push({ kind, t: +t.toFixed(1), file }); };
    if (engine === "chromium") {
      // The screencast sends a frame only when the compositor paints something new, so a still page yields none: the
      // window is bracketed by one screenshot before the action and one after it (the settled frame).
      const tPre = Date.now(), preBuf = await page.screenshot({ type: "png" });
      const cdp = await ctx.newCDPSession(page), got = [];
      cdp.on("Page.screencastFrame", (e) => { got.push({ data: e.data, ts: e.metadata.timestamp * 1000 }); cdp.send("Page.screencastFrameAck", { sessionId: e.sessionId }).catch(() => {}); });
      await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1 });
      await page.waitForTimeout(preMs);
      const tA = await page.evaluate(() => Date.now()); await act();
      await page.waitForTimeout(postMs);
      await cdp.send("Page.stopScreencast"); await cdp.detach().catch(() => {});
      keep(preBuf, Math.min(-preMs, tPre - tA));
      for (const g of got.filter((g) => g.ts >= tA - preMs)) keep(Buffer.from(g.data, "base64"), g.ts - tA);
      const tPost = Date.now(); keep(await page.screenshot({ type: "png" }), tPost - tA);
    } else {
      const pre = [], t0 = Date.now();
      // A pre frame is timed at the screenshot's start, so a slow screenshot (load) still lands before the action.
      while (Date.now() - t0 < preMs) { const t = Date.now(); pre.push({ buf: await page.screenshot({ type: "png" }), t: Math.min(t, Date.now() - 1) }); }
      const tA = Date.now(); await act();
      for (const p of pre) keep(p.buf, p.t - tA);
      while (Date.now() - tA < postMs) { const t = Date.now(); keep(await page.screenshot({ type: "png" }), t - tA); }
    }
    return frames;
  };
  for (const engine of engines) {
    const launch = () => pw[engine].launch({ headless: true, args: engine === "chromium" ? CHROMIUM_ARGS : [] });
    if (engine === "webkit") await holdWebkitLock();
    let browser = await launch(), navs = 0;
    try {
    versions[engine] = browser.version(); navRetired[engine] = 0; navStalled[engine] = 0;
    // Every page load goes through fresh(): past NAV_CAP loads, Playwright WebKit's browser is closed and relaunched.
    const fresh = async () => {
      if (engine === "webkit" && navs >= NAV_CAP) { await browser.close().catch(() => {}); browser = await launch(); navs = 0; navRetired[engine]++; log(`webkit browser retired and relaunched after ${NAV_CAP} page loads (${navRetired[engine]}×)`); }
      navs++; return browser;
    };
    const retire = async (why) => { await Promise.race([browser.close().catch(() => {}), sleep(5000)]); killWebkit(); browser = await launch(); navs = 0; navStalled[engine]++; log(`webkit browser killed and relaunched (${why})`); };
    const open = async (theme, reducedMotion) => { for (let k = 0; ; k++) {
      try { return await deadline(newPage(await fresh(), engine, theme, reducedMotion), OPEN_MS, "page open"); }
      catch (e) { if (engine !== "webkit" || k >= 2 || !/^STALL/.test(e.message)) throw e; await retire(e.message); } } };
    const shut = async (ctx) => { try { await deadline(ctx.close().catch(() => {}), CLOSE_MS, "context close"); } catch (e) { if (engine === "webkit") await retire(e.message); else log(`${engine}: ${e.message}`); } };
    for (const theme of themes) for (const ground of grounds) for (const scene of scenes) {
      if (!(SCENE_GROUNDS[scene] || []).includes(ground)) continue;
      for (let attempt = 0; attempt < 2; attempt++) {
      const base = { engine, theme, ground, scene, variant, shim: engine === "webkit" && shim, nodock: engine === "webkit" && !shim, files: {} };
      const stem = `${engine}-${theme}-${ground}-${scene}-${variant}`;
      const { ctx, page } = await open(theme, "reduce");
      const errs = [], consoleN = { error: 0, warning: 0, texts: [] }; let crashed = false;
      page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
      page.on("console", (m) => { const k = m.type() === "warning" || m.type() === "warn" ? "warning" : m.type() === "error" ? "error" : null; if (!k) return; consoleN[k]++; if (consoleN.texts.length < 64) consoleN.texts.push(m.text().slice(0, 300)); });
      page.on("crash", () => { crashed = true; });
      try { await deadline((async () => {
        await page.goto(`${server.url}index.html?scene=${scene}&ground=${ground}&theme=${theme}${base.nodock ? "&nodock=1" : ""}${qs}`, { waitUntil: "load", timeout: 120000 });
        await page.addStyleTag({ content: MODE_CSS + inject });
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(FIELD_GROUNDS.includes(ground) ? waitField : waitFlat);
        await page.evaluate(() => { if (!document.activeElement?.closest?.("[data-slot=dialog-content]")) document.activeElement?.blur?.(); });
        base.pointer = await restPointer(page);
        await page.waitForTimeout(300);
        const geom = await page.evaluate(GEOM + "(" + geomOpts + ")");
        const modes = scene === "halo" ? ["on", "off"] : scene === "empty" ? ["full"] : ["full", "noink", "maskA", "maskB", "raw"];
        for (const mode of modes) {
          await page.evaluate((m) => document.documentElement.setAttribute("data-cap", m), mode);
          await page.waitForTimeout(250);
          const file = `png/${stem}-${mode}.png`;
          fs.writeFileSync(path.join(capdir, file), await page.screenshot({ type: "png" }));
          base.files[mode] = file;
        }
        await page.evaluate(() => document.documentElement.removeAttribute("data-cap"));
        // The held register must still be engaged after the captures (a released hold is a FAIL row, not a rest read).
        if (base.pointer === "press") geom.heldAfter = await page.evaluate(GEOM + "(" + geomOpts + ")").then((g) => Object.fromEntries(g.specs.map((x) => [x.id, x.held])));
        const signals = await page.evaluate(SIGNALS + "(" + JSON.stringify(props) + ")");
        // H3-5: the release window, frames from 100 ms before the pointer lifts to releaseMs after.
        // Motion goes on for the window (the cell was captured under reduced motion): the hand-off a user without the
        // preference sees, carriers' fade and unmount included.
        if (base.pointer === "press") {
          await page.emulateMedia({ reducedMotion: "no-preference" }); await page.waitForTimeout(300);
          base.release = { ms: releaseMs, motion: "no-preference", source: engine === "chromium" ? "a screenshot, then the CDP screencast (every painted frame), then a screenshot" : "page.screenshot loop",
            frames: await frameWindow(ctx, page, engine, stem, "release", 100, releaseMs, () => page.mouse.up()) };
          await page.emulateMedia({ reducedMotion: "reduce" });
        }
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
        Object.assign(base, { specs: geom.specs, bare: geom.bare, halo: geom.halo, veil: geom.veil, probes: geom.probes, pressRect: geom.pressRect, heldAfter: geom.heldAfter || null, substrate: geom.substrate, appErrors: geom.errors, signals, rings, errs, console: consoleN, crashed });
      })(), CELL_MS, "cell"); } catch (e) {
        Object.assign(base, { crashed: true, error: String(e).split("\n")[0].slice(0, 240), errs });
      }
      // A Playwright WebKit stall or page close is the AppSSO class first: the browser is replaced and the cell tried once more.
      if (engine === "webkit" && attempt === 0 && base.crashed && /STALL|has been closed/.test(base.error || "")) { await retire(`${stem}: ${base.error}`); continue; }
      cells.push(base);
      log(`${stem}${base.shim ? " +shim" : ""}: ${base.crashed ? "CRASH " + (base.error || "") : `${base.specs.length} specs, ${base.rings.length} rings, pointer ${base.pointer}, readbacks ${base.signals.readbacks}${errs.length ? `, ${errs.length} page errors` : ""}`}`);
      await shut(ctx);
      break;
      }
    }
    // H-14: does the unshimmed dock still crash Playwright WebKit? Recorded beside the shimmed cells, never hidden.
    if (engine === "webkit" && o.probeUnshimmed) for (const theme of themes) {
      const ctx = await (await fresh()).newContext({ viewport: VIEW, deviceScaleFactor: 1, colorScheme: theme, reducedMotion: "reduce" });
      const page = await ctx.newPage(); let crashed = false; page.on("crash", () => { crashed = true; });
      let error = null;
      try { await page.goto(`${server.url}index.html?scene=ladder&ground=paper&theme=${theme}${qs}`, { waitUntil: "load", timeout: 60000 }); await page.waitForTimeout(2500); await page.evaluate(() => 1); }
      catch (e) { error = String(e).split("\n")[0].slice(0, 160); crashed = true; }
      unshimmed[theme] = { crashed, error };
      log(`webkit ${theme} ladder paper UNSHIMMED: ${crashed ? "CRASH " + (error || "") : "no crash"}`);
      await shut(ctx);
    }
    if (o.live) {
      for (const theme of themes) for (const ground of grounds.filter((g) => FIELD_GROUNDS.includes(g))) {
        const { ctx, page } = await open(theme, "no-preference");
        const rec = { engine, theme, ground, variant, liveMs };
        try {
          await page.goto(`${server.url}index.html?scene=ladder&ground=${ground}&theme=${theme}${qs}`, { waitUntil: "load", timeout: 120000 });
          await page.addStyleTag({ content: MODE_CSS + inject });
          await page.mouse.move(VIEW.width - 1, VIEW.height - 1);
          await page.waitForTimeout(1500);
          await page.evaluate(WRESET);
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
            const file = `png/live-${theme}-${ground}-${variant}-raw.png`;
            fs.writeFileSync(path.join(capdir, file), await page.screenshot({ type: "png" }));
            rec.step.file = file;
          }
        } catch (e) { rec.error = String(e).split("\n")[0].slice(0, 240); }
        live.push(rec);
        const top = Object.entries(rec.wframes || {}).sort((x, y) => y[1] - x[1]).slice(0, 3).map(([k, v]) => `${k}×${v}`).join(" ");
        log(`live ${engine} ${theme} ${ground}: readbacks ${rec.readbacks} (getImageData ${rec.getImageData}, readPixels ${rec.readPixels}, toDataURL ${rec.toDataURL}), frames ${rec.frames}, custom-property writes in frames: ${top || "none"}${rec.error ? " ERROR " + rec.error : ""}`);
        await shut(ctx);
      }
    }
    // H-11: the motion windows. Whole frames of the moving field (motion) and of a ceiling step (step).
    if (o.motion) for (const theme of themes) for (const ground of grounds.filter((g) => FIELD_GROUNDS.includes(g))) {
      const { ctx, page } = await open(theme, "no-preference");
      const rec = { engine, theme, ground, variant, shim: engine === "webkit" && shim, motionMs, stepMs, frames: [], source: engine === "chromium" ? "CDP Page.startScreencast (png, every frame)" : "page.screenshot loop" };
      const stem = `motion-${engine}-${theme}-${ground}-${variant}`;
      try {
        await page.goto(`${server.url}index.html?scene=ladder&ground=${ground}&theme=${theme}${qs}`, { waitUntil: "load", timeout: 120000 });
        await page.addStyleTag({ content: MODE_CSS + inject });
        await page.evaluate(() => document.fonts.ready);
        await page.mouse.move(VIEW.width - 1, VIEW.height - 1);
        await page.evaluate(() => document.activeElement?.blur?.());
        await page.waitForTimeout(waitField);
        rec.specs = (await page.evaluate(GEOM + "(" + geomOpts + ")")).specs.map((x) => ({ id: x.id, rect: x.rect, inks: x.inks }));
        const to = ground === "aurora50" ? 1 : 0.5; rec.to = to;
        const keep = (buf, kind, t) => { const file = `png/${stem}-${kind}${String(rec.frames.filter((f) => f.kind === kind).length).padStart(3, "0")}.png`; fs.writeFileSync(path.join(capdir, file), buf); rec.frames.push({ kind, t: +t.toFixed(1), file }); };
        if (engine === "chromium") {
          const cdp = await ctx.newCDPSession(page);
          const got = [];
          cdp.on("Page.screencastFrame", (e) => { got.push({ data: e.data, ts: e.metadata.timestamp * 1000 }); cdp.send("Page.screencastFrameAck", { sessionId: e.sessionId }).catch(() => {}); });
          await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1 });
          await page.waitForTimeout(motionMs);
          const tStep = await page.evaluate((v) => { window.__harness.setCeiling(v); return Date.now(); }, to);
          await page.waitForTimeout(stepMs);
          await cdp.send("Page.stopScreencast");
          const mot = got.filter((g) => g.ts < tStep - 200), stp = got.filter((g) => g.ts >= tStep - 200);
          const nM = 12, pickM = mot.length <= nM ? mot : Array.from({ length: nM }, (_, k) => mot[Math.round((k * (mot.length - 1)) / (nM - 1))]);
          for (const g of pickM) keep(Buffer.from(g.data, "base64"), "motion", g.ts - tStep);
          for (const g of stp) keep(Buffer.from(g.data, "base64"), "step", g.ts - tStep);
          rec.screencastFrames = got.length;
        } else {
          const tA = Date.now();
          for (let k = 0; k < 12 && Date.now() - tA < motionMs * 2; k++) { const t = Date.now(); keep(await page.screenshot({ type: "png" }), "motion", t - tA - motionMs); await page.waitForTimeout(Math.max(0, motionMs / 12 - (Date.now() - t))); }
          // The step window opens 200 ms before the step, as Chromium's does: pre-step frames are kept and re-timed to the step.
          const pre = [], tPre = Date.now();
          while (Date.now() - tPre < 200) { const t = Date.now(); pre.push({ buf: await page.screenshot({ type: "png" }), t }); }
          const tStep = await page.evaluate((v) => { window.__harness.setCeiling(v); return Date.now(); }, to);
          for (const p of pre) keep(p.buf, "step", p.t - tStep);
          while (Date.now() - tStep < stepMs) { const t = Date.now(); keep(await page.screenshot({ type: "png" }), "step", t - tStep); }
        }
      } catch (e) { rec.error = String(e).split("\n")[0].slice(0, 240); }
      motion.push(rec);
      log(`motion ${engine}${rec.shim ? "+shim" : ""} ${theme} ${ground}: ${rec.frames.filter((f) => f.kind === "motion").length} motion frames, ${rec.frames.filter((f) => f.kind === "step").length} step frames${rec.screencastFrames != null ? ` (of ${rec.screencastFrames} screencast frames)` : ""}${rec.error ? " ERROR " + rec.error : ""}`);
      await shut(ctx);
    }
    // H3-12: the drift window. One frame every driftEvery ms for driftMs over the moving c1 field, streamed to disk.
    if (o.drift) for (const theme of themes) for (const ground of grounds.filter((g) => g === "aurora")) {
      const { ctx, page } = await open(theme, "no-preference");
      const rec = { engine, theme, ground, variant, shim: engine === "webkit" && shim, driftMs, driftEvery, frames: [], source: "page.screenshot every " + driftEvery + " ms" };
      const stem = `drift-${engine}-${theme}-${ground}-${variant}`;
      try {
        await page.goto(`${server.url}index.html?scene=ladder&ground=${ground}&theme=${theme}${qs}`, { waitUntil: "load", timeout: 120000 });
        await page.addStyleTag({ content: MODE_CSS + inject });
        await page.evaluate(() => document.fonts.ready);
        await page.mouse.move(VIEW.width - 1, VIEW.height - 1);
        await page.evaluate(() => document.activeElement?.blur?.());
        await page.waitForTimeout(waitField);
        rec.specs = (await page.evaluate(GEOM + "(" + geomOpts + ")")).specs.map((x) => ({ id: x.id, rect: x.rect, inks: x.inks }));
        const tA = Date.now();
        for (let k = 0; Date.now() - tA < driftMs; k++) {
          const due = tA + k * driftEvery; if (Date.now() < due) await page.waitForTimeout(due - Date.now());
          const t = Date.now() - tA, file = `png/${stem}-drift${String(k).padStart(3, "0")}.png`;
          fs.writeFileSync(path.join(capdir, file), await page.screenshot({ type: "png" }));
          rec.frames.push({ kind: "drift", t, file });
        }
        rec.load = os.loadavg().map((v) => +v.toFixed(1));
      } catch (e) { rec.error = String(e).split("\n")[0].slice(0, 240); }
      drift.push(rec);
      log(`drift ${engine}${rec.shim ? "+shim" : ""} ${theme} ${ground}: ${rec.frames.length} frames over ${rec.frames.length ? (rec.frames[rec.frames.length - 1].t / 1000).toFixed(1) : 0} s${rec.error ? " ERROR " + rec.error : ""}`);
      await shut(ctx);
    }
    } finally { await browser.close().catch(() => {}); }
  }
  server.close();
  const keep = (arr, fresh, key) => { const ks = new Set(fresh.map(key)); return [...arr.filter((c) => !ks.has(key(c))), ...fresh]; };
  const liveKey = (r) => [r.engine, r.theme, r.ground, r.variant].join("/");
  const doc = {
    meta: { ...(prev.meta || {}), target, label, worktree: o.worktree || buildMeta.worktree || prev.meta?.worktree || null, sha: buildMeta.sha || prev.meta?.sha || null,
      versions: { ...(prev.meta?.versions || {}), ...versions }, navCap: NAV_CAP, navStalled: Object.fromEntries([...new Set([...Object.keys(prev.meta?.navStalled || {}), ...Object.keys(navStalled)])].map((e) => [e, (prev.meta?.navStalled?.[e] || 0) + (navStalled[e] || 0)])), navRetired: Object.fromEntries([...new Set([...Object.keys(prev.meta?.navRetired || {}), ...Object.keys(navRetired)])].map((e) => [e, (prev.meta?.navRetired?.[e] || 0) + (navRetired[e] || 0)])), webkitShim: shim ? WEBKIT_SHIM : null,
      webkitUnshimmed: { ...(prev.meta?.webkitUnshimmed || {}), ...unshimmed },
      captured: new Date().toISOString(), query: o.query || null, load: os.loadavg().map((v) => +v.toFixed(1)), seconds: +((Date.now() - t0) / 1000).toFixed(1) },
    cells: keep(prev.cells || [], cells, cellKey), live: keep(prev.live || [], live, liveKey), motion: keep(prev.motion || [], motion, liveKey), drift: keep(prev.drift || [], drift, liveKey) };
  fs.writeFileSync(cellsFile, JSON.stringify(doc, null, 1));
  log(`captured ${cells.length} cells, ${live.length} live windows, ${motion.length} motion windows and ${drift.length} drift windows in ${doc.meta.seconds}s (load ${doc.meta.load.join(" ")}) → ${capdir}`);
  return { capdir, doc };
}

// Mean relative luminance of the painted field under a rect (W-B), from a raw screenshot.
export function lumaUnder(file, rect) { return mean3(region(readPng(file), rect).map((p) => [Y(p), 0, 0]))[0]; }

if (import.meta.url === `file://${process.argv[1]}`) {
  const a = cli({ out: { type: "string" }, engines: { type: "string" }, themes: { type: "string" }, grounds: { type: "string" }, scenes: { type: "string" },
    live: { type: "boolean" }, "live-ms": { type: "string" }, motion: { type: "boolean" }, "motion-ms": { type: "string" }, "step-ms": { type: "string" },
    variant: { type: "string" }, inject: { type: "string" }, worktree: { type: "string" }, "no-webkit-shim": { type: "boolean" }, "probe-unshimmed": { type: "boolean" },
    "signal-props": { type: "string" }, "wait-field": { type: "string" }, "wait-flat": { type: "string" }, label: { type: "string" }, quiet: { type: "boolean" }, query: { type: "string" },
    drift: { type: "boolean" }, "drift-ms": { type: "string" }, "drift-every": { type: "string" }, "release-ms": { type: "string" } });
  if (!a._[0]) { console.error("usage: node capture.mjs <dist-or-fixture-dir> [--out capdir] …"); process.exit(2); }
  await capture(a._[0], { ...a, liveMs: a["live-ms"], motionMs: a["motion-ms"], stepMs: a["step-ms"], noWebkitShim: a["no-webkit-shim"], probeUnshimmed: a["probe-unshimmed"],
    signalProps: a["signal-props"], waitField: a["wait-field"], waitFlat: a["wait-flat"], driftMs: a["drift-ms"], driftEvery: a["drift-every"], releaseMs: a["release-ms"] });
}
