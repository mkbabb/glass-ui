#!/usr/bin/env node
// D4-F-block/idiom9.mjs · design-idioms §9 on reading 2: one item, two content models. Is the tile ToggleGroupItem
// the same primitive as the pill ToggleGroupItem (one item, two content models), or a second primitive inside one
// component (B's ChoiceCard under another name)?
//   node idiom9.mjs --build <out>/builds/r2-src [--engines chromium,webkit] [--json <file>]
// Three reads, on the reading-2 build:
//   1. chassis  the pill model (pill-icon #0) against the tile model (preset-migrated #0, strip-migrated #0): tag,
//               class list, data-slot, role, aria-checked, tabindex, and every computed property; the properties that
//               differ are listed, so what the tile model changes is on the record, not asserted;
//   2. mixed    one group, both models: preset-migrated with the `#meta` row removed from items 1 and 3 (live DOM,
//               slot content only), so each grid row holds a pill beside a cell. Per item: model, role, checked,
//               tabindex; then the one engine's keys across the models (focus the selected pill #1, ArrowRight,
//               ArrowLeft, ArrowDown), reading focus and the model after each;
//   3. the grid row a pill shares with a cell (REGISTRY §6.1 question 2, reported only): its box and used corner.
import fs from "node:fs";
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load, engineVersion } from "../../harness/lib.mjs";

const IGNORE = /^(width|height|inline-size|block-size|min-|max-|perspective-origin|transform-origin|inset|top|left|right|bottom|x$|y$|d$|cx|cy|r$|rx|ry)/;
function chassis() {
  const el = document.querySelector("[data-scene] [data-item]");
  const cs = getComputedStyle(el), props = {};
  for (let i = 0; i < cs.length; i++) props[cs[i]] = cs.getPropertyValue(cs[i]);
  return { tag: el.tagName.toLowerCase(), cls: [...el.classList].filter((c) => !c.startsWith("data-")), slot: el.dataset.slot, role: el.getAttribute("role"),
    checked: el.getAttribute("aria-checked"), tabindex: el.getAttribute("tabindex"), props };
}
const frame = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

const args = parseArgs();
const engines = String(args.engines ?? "chromium,webkit").split(",");
const lock = await acquireLock("d4f-block-idiom9");
const target = await openTarget(args);
const out = { build: target.label, engines: {} };
console.log(`D4-F §9 · one item, two content models · ${target.label} · load ${load()} at start`);
for (const engine of engines) {
  const E = out.engines[engine] = { version: await engineVersion(engine), loadStart: load() };
  console.log(`\n${E.version} · load ${E.loadStart}`);
  // 1 · chassis
  const read = async (scene) => { const P = await openPage(target, engine, scene); const c = await P.page.evaluate(chassis); await P.close(); return c; };
  const pill = await read("pill-icon"), k1 = await read("preset-migrated"), v1 = await read("strip-migrated");
  const diff = (a, b) => Object.keys(a.props).filter((k) => !IGNORE.test(k) && a.props[k] !== b.props[k]).map((k) => `${k}: ${a.props[k]} → ${b.props[k]}`);
  E.chassis = {
    pill: { tag: pill.tag, cls: pill.cls, slot: pill.slot, role: pill.role, checked: pill.checked, tabindex: pill.tabindex },
    k1: { tag: k1.tag, cls: k1.cls, slot: k1.slot, role: k1.role, checked: k1.checked, tabindex: k1.tabindex },
    v1: { tag: v1.tag, cls: v1.cls, slot: v1.slot, role: v1.role, checked: v1.checked, tabindex: v1.tabindex },
    diffK1: diff(pill, k1), diffV1: diff(pill, v1),
  };
  const sameCls = (a, b) => a.cls.filter((c) => !b.cls.includes(c)).concat(b.cls.filter((c) => !a.cls.includes(c)));
  console.log(`  CHASSIS pill ${pill.tag}.${pill.cls.join(".")} slot ${pill.slot} role ${pill.role} · K1 tile class delta [${sameCls(pill, k1).join(" ")}] role ${k1.role} · V1 tile class delta [${sameCls(pill, v1).join(" ")}] role ${v1.role}`);
  console.log(`  COMPUTED pill → K1 tile, ${E.chassis.diffK1.length} properties differ (size-derived ignored):\n    ${E.chassis.diffK1.join("\n    ")}`);
  console.log(`  COMPUTED pill → V1 tile, ${E.chassis.diffV1.length} properties differ: ${E.chassis.diffV1.map((l) => l.split(":")[0]).join(", ")}`);

  // 2 · mixed group
  const P = await openPage(target, engine, "preset-migrated");
  await P.page.evaluate(async () => { const its = [...document.querySelectorAll("[data-item]")]; for (const i of [1, 3]) its[i].querySelector(".toggle-group__meta")?.remove(); await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))); });
  const state = () => P.page.evaluate(() => {
    const its = [...document.querySelectorAll("[data-item]")];
    return { items: its.map((el, i) => { const cs = getComputedStyle(el), r = el.getBoundingClientRect(); return { i, model: el.querySelector(":scope > .toggle-group__meta, :scope > .toggle-group__media") ? "tile" : "pill",
      role: el.getAttribute("role"), checked: el.getAttribute("aria-checked"), tabindex: el.getAttribute("tabindex"), box: `${r.width.toFixed(1)}×${r.height.toFixed(1)}`, corner: `${cs.borderTopLeftRadius}→${Math.min(parseFloat(cs.borderTopLeftRadius), r.width / 2, r.height / 2).toFixed(2)}` }; }),
      focus: its.indexOf(document.activeElement), model: window.__tile.selected(), group: document.querySelector("[data-group]").getAttribute("role") };
  });
  const s0 = await state();
  E.mixed = { initial: s0, keys: [] };
  console.log(`  MIXED group role ${s0.group}; ${s0.items.map((x) => `#${x.i} ${x.model} ${x.role} checked ${x.checked} tabindex ${x.tabindex} ${x.box} ${x.corner}`).join(" | ")}`);
  await P.page.evaluate(() => document.querySelectorAll("[data-item]")[1].focus());
  for (const key of ["ArrowRight", "ArrowLeft", "ArrowDown"]) {
    await P.page.keyboard.press(key);
    await P.page.evaluate(frame);
    const s = await state();
    const models = s.items.map((x) => x.model);
    E.mixed.keys.push({ key, focus: s.focus, focusModel: models[s.focus], selected: s.model, tabindex: s.items.map((x) => x.tabindex).join("") });
    console.log(`  KEY ${key}: focus #${s.focus} (${models[s.focus]}), model ${s.model}, tabindex ${s.items.map((x) => x.tabindex).join("")}`);
  }
  await P.close();
  E.loadEnd = load();
  console.log(`  load ${E.loadEnd} at end`);
}
if (typeof args.json === "string") fs.writeFileSync(args.json, JSON.stringify(out, null, 1));
await closeBrowsers();
await target.close();
lock.release();
process.exit(0);
