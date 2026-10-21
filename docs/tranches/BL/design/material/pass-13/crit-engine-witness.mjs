#!/usr/bin/env node
// crit-engine-witness.mjs · D3 pass-13 CRITIC: is R-37's premise an engine fact, or a declaration the engine rejects?
// O-103b's wording is "WebKit headless paints no backdrop-filter". If Playwright WebKit painted backdrop-filter on a
// minimal page but not on the veil, the report would hide a dead declaration (E-2). This witness reads, per engine, in one
// browser with a fresh context per cell (every page, context and the browser closed in a finally):
//   blur    a 4 px black/white stripe field under a 200 px box with backdrop-filter: blur(8px) (+ -webkit- twin):
//           luma stddev inside vs outside the box. A painted blur flattens the stripes.
//   bright  a solid #e87237 field under a box with backdrop-filter: brightness(0.5): mean inside vs outside.
//   veil    the built specimen CSS (argv[3]) and <html class="dark"><div class="glass-focus-veil">: the computed
//           backdrop-filter, -webkit-backdrop-filter and background-color the engine resolves for the veil, and the
//           same in light. A rejected declaration resolves to "none".
// No GPU launch argument, no getContext(), no screencapture. Chromium is the control.
//   node crit-engine-witness.mjs <chromium|webkit> <specimen.css> <out.json>
import fs from "node:fs";
import os from "node:os";
import pngjs from "/Users/mkbabb/Programming/glass-ui/node_modules/pngjs/lib/png.js";
const { PNG } = pngjs;
import pw from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.js";

const [engine, cssFile, outFile] = process.argv.slice(2);
if (!engine || !cssFile || !outFile) { console.error("usage: crit-engine-witness.mjs <engine> <css> <out>"); process.exit(2); }
const css = fs.readFileSync(cssFile, "utf8");
const load = () => os.loadavg().map((x) => x.toFixed(1)).join(" ");
const stats = (buf) => { const p = PNG.sync.read(buf), L = [];
  for (let i = 0; i < p.data.length; i += 4) L.push(0.2126 * p.data[i] + 0.7152 * p.data[i + 1] + 0.0722 * p.data[i + 2]);
  const m = L.reduce((a, b) => a + b, 0) / L.length, sd = Math.sqrt(L.reduce((a, b) => a + (b - m) ** 2, 0) / L.length);
  const rgb = [0, 1, 2].map((k) => { let s = 0; for (let i = k; i < p.data.length; i += 4) s += p.data[i]; return Math.round(s / (p.data.length / 4)); });
  return { mean: +m.toFixed(2), sd: +sd.toFixed(2), rgb }; };
const out = { engine, version: null, load_start: load(), cells: {} };
const browser = await pw[engine].launch();
try {
  out.version = browser.version();
  const cell = async (name, html, fn) => {
    const ctx = await browser.newContext({ viewport: { width: 600, height: 400 }, deviceScaleFactor: 1 });
    try { const page = await ctx.newPage(); await page.setContent(html); await page.waitForTimeout(300); out.cells[name] = { load: load(), ...(await fn(page)) }; }
    finally { await ctx.close(); }
  };
  const box = (f) => `<style>html,body{margin:0}#b{position:absolute;left:200px;top:100px;width:200px;height:200px;backdrop-filter:${f};-webkit-backdrop-filter:${f}}</style>`;
  const clipIn = { x: 280, y: 180, width: 40, height: 40 }, clipOut = { x: 40, y: 180, width: 40, height: 40 };
  await cell("blur", `${box("blur(8px)")}<body style="background:repeating-linear-gradient(90deg,#000 0 4px,#fff 4px 8px)"><div id=b></div>`, async (page) => ({
    computed: await page.$eval("#b", (e) => [getComputedStyle(e).backdropFilter, getComputedStyle(e).webkitBackdropFilter]),
    inside: stats(await page.screenshot({ clip: clipIn })), outside: stats(await page.screenshot({ clip: clipOut })) }));
  await cell("bright", `${box("brightness(0.5)")}<body style="background:#e87237"><div id=b></div>`, async (page) => ({
    computed: await page.$eval("#b", (e) => [getComputedStyle(e).backdropFilter, getComputedStyle(e).webkitBackdropFilter]),
    inside: stats(await page.screenshot({ clip: clipIn })), outside: stats(await page.screenshot({ clip: clipOut })) }));
  for (const theme of ["dark", "light"]) await cell(`veil-${theme}`, `<html class="${theme}"><head><style>${css}</style></head><body><div class="glass-focus-veil" style="position:fixed;inset:0"></div></body></html>`, async (page) => ({
    computed: await page.$eval(".glass-focus-veil", (e) => { const s = getComputedStyle(e); return { backdropFilter: s.backdropFilter, webkitBackdropFilter: s.webkitBackdropFilter, background: s.backgroundColor, tone: s.getPropertyValue("--glass-focus-veil-tone").trim(), dim: s.getPropertyValue("--glass-focus-veil-dim").trim() }; }) }));
} finally { await browser.close(); }
out.load_end = load();
const b = out.cells.blur, r = out.cells.bright;
out.verdict = {
  blur_painted: b.inside.sd < 0.5 * b.outside.sd,
  brightness_painted: r.inside.mean < 0.8 * r.outside.mean,
  blur_declaration_accepted: b.computed.some((v) => v && v !== "none"),
  veil_dark_declaration_accepted: [out.cells["veil-dark"].computed.backdropFilter, out.cells["veil-dark"].computed.webkitBackdropFilter].some((v) => v && v !== "none"),
};
fs.writeFileSync(outFile, JSON.stringify(out, null, 1));
console.log(`ENGINE-WITNESS ${engine} ${out.version}: blur painted ${out.verdict.blur_painted} (sd in ${b.inside.sd} / out ${b.outside.sd}; computed ${b.computed.join(" | ")}) · brightness painted ${out.verdict.brightness_painted} (mean in ${r.inside.mean} / out ${r.outside.mean}) · veil dark computed ${JSON.stringify(out.cells["veil-dark"].computed)} · veil light computed ${JSON.stringify(out.cells["veil-light"].computed)} · load ${out.load_start} → ${out.load_end}`);
