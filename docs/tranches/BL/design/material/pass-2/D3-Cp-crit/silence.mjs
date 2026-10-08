#!/usr/bin/env node
// D3 pass 2 · C′ critic probe: is a dead thin arm loud? (REGISTRY §5 Q-7 default (a)+(b); §7.3 C′ item 3.)
// Opens the ladder over the c1 aurora under ?claim=honest, once as built and once with an injected stylesheet (nopub.css:
// the field publication reset to its registered initials, as when the Aurora sits outside the claim's ancestor chain).
// Records every console message, every page error, the publication attribute on every host, the main's claimed tone and
// the wash plate's computed content bound and solved ink. Pure DOM/computed-style reads; no canvas context is requested.
//   node silence.mjs <dist> [--engine chromium|webkit] [--inject nopub.css] [--theme light|dark]
import path from "node:path";
import fs from "node:fs";
import os from "node:os";
import { parseArgs } from "node:util";

const HARNESS = new URL("../../harness/", import.meta.url).pathname;
const { serve, playwright, CHROMIUM_ARGS, WEBKIT_SHIM, VIEW } = await import(path.join(HARNESS, "lib.mjs"));
const { values: a, positionals } = parseArgs({ allowPositionals: true, options: {
  engine: { type: "string", default: "chromium" }, inject: { type: "string" }, theme: { type: "string", default: "light" },
  query: { type: "string", default: "claim=honest" }, ground: { type: "string", default: "aurora" },
  // --software: launch Chromium without the GPU flags, so the Aurora resolves its "css" arm (software raster guard).
  software: { type: "boolean", default: false } } });
const dist = path.resolve(positionals[0]);
const css = a.inject ? fs.readFileSync(path.resolve(a.inject), "utf8") : "";
const pw = await playwright(), srv = await serve(dist);
const browser = await pw[a.engine].launch({ headless: true, args: a.engine === "chromium" && !a.software ? CHROMIUM_ARGS : [] });
const ctx = await browser.newContext({ viewport: VIEW, deviceScaleFactor: 1, colorScheme: a.theme, reducedMotion: "reduce" });
const styles = [a.engine === "webkit" ? WEBKIT_SHIM : "", css].filter(Boolean).join("\n");
if (styles) await ctx.addInitScript(`document.addEventListener("readystatechange", () => { if (!document.getElementById("hx-crit")) { const s = document.createElement("style"); s.id = "hx-crit"; s.textContent = ${JSON.stringify(styles)}; (document.head || document.documentElement).appendChild(s); } });`);
const page = await ctx.newPage();
const consoleLog = [];
page.on("console", (m) => consoleLog.push(`${m.type()}: ${m.text().slice(0, 200)}`));
page.on("pageerror", (e) => consoleLog.push(`pageerror: ${String(e).slice(0, 200)}`));
await page.goto(`${srv.url}index.html?scene=ladder&ground=${a.ground}&theme=${a.theme}&${a.query}`, { waitUntil: "load", timeout: 120000 });
await page.waitForTimeout(5000);
const read = await page.evaluate(() => {
  const cs = (el, p) => (el ? getComputedStyle(el).getPropertyValue(p).trim() : null);
  const main = document.querySelector("main"), wash = document.querySelector('[data-spec="wash"]');
  const muted = document.querySelector('[data-spec="wash"] [data-ink="muted"]');
  return {
    hosts: [...document.querySelectorAll("[data-glass-field]")].map((e) => `${e.tagName.toLowerCase()}#${e.id || ""}.${e.className || ""} = ${e.getAttribute("data-glass-field")}`),
    flat: document.querySelectorAll("[data-glass-flat]").length,
    substrate: document.querySelector("[data-aurora-substrate]")?.getAttribute("data-aurora-substrate") ?? null,
    mainClaim: main?.getAttribute("data-glass-ground"),
    mainLo: cs(main, "--glass-ground-lo"), mainHi: cs(main, "--glass-ground-hi"),
    fieldLo: cs(main, "--glass-field-lo"), fieldHi: cs(main, "--glass-field-hi"), fieldCeiling: cs(main, "--glass-field-ceiling"),
    washBound: cs(wash, "--glass-content-bound"), anyInputBound: cs(wash, "--glass-bound"),
    washMuted: muted ? getComputedStyle(muted).color : null,
  };
});
console.log(JSON.stringify({ dist, engine: a.engine, theme: a.theme, inject: a.inject ? path.basename(a.inject) : null, load: os.loadavg().map((v) => +v.toFixed(1)), read, console: consoleLog }, null, 1));
await browser.close(); srv.close();
