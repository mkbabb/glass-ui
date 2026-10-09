#!/usr/bin/env node
// FV2-halo-probe.mjs · D3 pass 3, floor v2, N-3: what paints the halo M-2h reads on the held dock (Chromium).
// Opens the specimen's held scene over black (light) as capture.mjs does, presses and holds the dock's Slider, then lists
// the element stack at a row of points across the dock's right half and above it, with each element's paint-bearing
// computed properties (filter, backdrop-filter, box-shadow, opacity, transform, background, size).
//   node FV2-halo-probe.mjs <specimen dist> [--theme light] [--ground black]
// Reads computed style and elementsFromPoint only: no canvas read, no getContext.
import path from "node:path";
import { CHROMIUM_ARGS, VIEW, playwright, serve, cli } from "../harness/lib.mjs";

const a = cli({ theme: { type: "string" }, ground: { type: "string" } });
const dist = path.resolve(a._[0]);
const theme = a.theme || "light", ground = a.ground || "black";
const { chromium } = await playwright();
const server = await serve(dist);
const browser = await chromium.launch({ args: CHROMIUM_ARGS });
const page = await (await browser.newContext({ viewport: VIEW, deviceScaleFactor: 1, reducedMotion: "reduce" })).newPage();
await page.goto(`${server.url}index.html?scene=held&ground=${ground}&theme=${theme}`, { waitUntil: "load", timeout: 120000 });
await page.waitForTimeout(1500);
const r = await page.evaluate(() => { const s = document.querySelector(".hx-dockslider"); const b = s.getBoundingClientRect(); return [b.x + b.width / 2, b.y + b.height / 2]; });
await page.mouse.move(...r); await page.mouse.down(); await page.waitForTimeout(900);
const out = await page.evaluate((pts) => pts.map(([x, y]) => ({ x, y, stack: document.elementsFromPoint(x, y).slice(0, 8).map((el) => {
  const cs = getComputedStyle(el), b = el.getBoundingClientRect();
  const keep = { filter: cs.filter, backdrop: cs.backdropFilter, shadow: cs.boxShadow, opacity: cs.opacity, transform: cs.transform, bg: cs.backgroundColor, bgi: cs.backgroundImage.slice(0, 60) };
  for (const k of Object.keys(keep)) if (["none", "1", "rgba(0, 0, 0, 0)"].includes(keep[k])) delete keep[k];
  return { el: `${el.tagName.toLowerCase()}.${(el.getAttribute("class") || "").split(" ").filter(Boolean).slice(0, 3).join(".")}${el.dataset.grasp ? `[grasp=${el.dataset.grasp}]` : ""}`, box: [b.x, b.y, b.width, b.height].map((v) => Math.round(v)), ...keep };
}) })), [[300, 328], [400, 328], [480, 328], [560, 328], [480, 300], [400, 300]]);
// Every element or pseudo-element in the document with a filter, backdrop-filter, mask or box-shadow while held
// (carriers are pointer-events: none, so elementsFromPoint does not list them).
const painters = await page.evaluate(() => [...document.querySelectorAll("*")].flatMap((el) => [null, "::before", "::after"].map((pe) => {
  const cs = getComputedStyle(el, pe); if (pe && (cs.content === "none" || cs.display === "none")) return null;
  const f = { filter: cs.filter, backdrop: cs.backdropFilter, mask: cs.maskImage, shadow: cs.boxShadow };
  for (const k of Object.keys(f)) if (!f[k] || f[k] === "none") delete f[k];
  if (!f.filter && !f.backdrop && !f.mask) return null;
  const b = el.getBoundingClientRect();
  return { el: `${el.tagName.toLowerCase()}.${(el.getAttribute("class") || "").split(" ").filter(Boolean).slice(0, 3).join(".")}${pe || ""}${el.dataset.grasp ? `[grasp=${el.dataset.grasp}]` : ""}`, parent: (el.parentElement?.getAttribute("class") || "").split(" ").slice(0, 2).join("."), box: [b.x, b.y, b.width, b.height].map((v) => Math.round(v)), transform: getComputedStyle(el).transform, ...f };
}).filter(Boolean)));
console.log(JSON.stringify({ theme, ground, slider: r, out, painters }, null, 1));
await page.mouse.up(); await browser.close(); server.close();
