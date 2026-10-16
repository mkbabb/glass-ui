#!/usr/bin/env node
// D4-F pass-3 CRITIC · probes/attack.mjs · reads the attack compositions of ../attack-route/migrated.mjs on a build made
// with `build.mjs --route <D4-F-crit/attack-route>`, in Chromium and Playwright WebKit, under the harness lock.
//   node attack.mjs --build <out>/builds/<label> [--engines chromium,webkit] [--json f]
// Cells (each prints what it read; the verdict is against the route's own claim, quoted):
//   empty   c1-migrated: no status has a hint, so no item FILLS #meta. Claim (MIGRATION.md): "A group whose items fill
//           neither slot is pills". Reads the group's --selection-tile, the item corner against h/2, the item height,
//           how many empty .toggle-group__meta rows rendered, and the painted selected perimeter (::before opacity).
//   attrs   preset-migrated with consumer class/style/data-*/aria-label/role/tabindex/@click on every item. Pointer-click
//           item 0: the consumer handler ran once, the item is checked, and class, style, data-consumer, aria-label
//           landed; role stays the engine's radio and the group keeps one tab stop.
//   nest    v2-migrated: a pill group with no anatomy of its own that holds a wrapper with a one-item tile group.
//           Reads the OUTER items' --selection-tile and corner. Reported (R-4 of the spec, handed to the critic).
//   sup     strip-migrated, pills labelled "m<sup>2</sup> …": painted text rows, and on a development flavour the
//           count of "asks for a second row" names (want 0: one row of text).
import fs from "node:fs";
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load, engineVersion } from "../../../harness/lib.mjs";

const args = parseArgs();
const engines = String(args.engines ?? "chromium,webkit").split(",");
const lock = await acquireLock("d4f-p3-crit-attack");
const target = await openTarget(args);
const dev = !!target.meta.dev;
const out = { build: target.label, flavor: target.meta.flavor, dev, engines: {} };
const say = (s) => console.log(s);
say(`D4-F p3 critic attack · ${target.label} (flavor ${target.meta.flavor}, dev ${dev}) · lock waited ${lock.waitedS}s · load ${load()} at start`);
let fails = 0;
const cell = (E, k, ok, line) => { if (!ok) fails++; say(`  ${ok ? "PASS" : "FAIL"} ${k} · ${line}`); (E[k] ??= []).push({ ok, line }); };
const info = (E, k, line) => { say(`  INFO ${k} · ${line}`); (E[k] ??= []).push({ ok: null, line }); };
const names = (P) => P.logs.filter((l) => (l.type === "error" || l.type === "pageerror") && l.text.includes("asks for a second row"));

try {
  for (const engine of engines) {
    const E = out.engines[engine] = { version: await engineVersion(engine), loadStart: load() };
    say(`\n${E.version} · load ${E.loadStart}`);

    { // empty
      for (const mode of ["light", "dark"]) {
        const P = await openPage(target, engine, "c1-migrated", { mode, query: { sel: 1 } });
        await P.page.waitForTimeout(600);
        const r = await P.page.evaluate(() => {
          const g = document.querySelector("[data-group]");
          const items = [...g.querySelectorAll("[data-item]")];
          const it = items[0], cs = getComputedStyle(it);
          const on = items.find((x) => x.getAttribute("aria-checked") === "true");
          const metas = g.querySelectorAll(".toggle-group__meta");
          const emptyMetas = [...metas].filter((m) => m.textContent.trim() === "" && m.getBoundingClientRect().height === 0).length;
          return {
            tile: getComputedStyle(g).getPropertyValue("--selection-tile").trim(),
            h: it.getBoundingClientRect().height, w: it.getBoundingClientRect().width,
            corner: parseFloat(cs.borderTopLeftRadius), dir: cs.flexDirection,
            metas: metas.length, emptyMetas,
            perimeter: on ? getComputedStyle(on, "::before").opacity : null,
            mark: on ? getComputedStyle(on, "::after").opacity : null,
            heights: items.map((x) => +x.getBoundingClientRect().height.toFixed(2)),
          };
        });
        const pill = r.tile === "none" && Math.abs(r.corner - r.h / 2) < 1;
        cell(E, "empty", pill, `c1-migrated ${mode} · ${r.metas} .toggle-group__meta rendered, ${r.emptyMetas} empty and 0 px tall · group --selection-tile ${r.tile} · item ${r.w.toFixed(2)}×${r.h.toFixed(2)}, corner ${r.corner.toFixed(2)} px (h/2 ${(r.h / 2).toFixed(2)}), flex-direction ${r.dir} · selected perimeter opacity ${r.perimeter}, mark opacity ${r.mark} · heights [${r.heights.join(", ")}] · want pills (none, h/2) · load ${load()}`);
        await P.close();
      }
    }

    { // attrs
      const P = await openPage(target, engine, "preset-migrated", { mode: "light", query: { sel: "none" } });
      await P.page.waitForTimeout(400);
      const box = await P.page.evaluate(() => { const r = document.querySelector("[data-item]").getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
      await P.page.mouse.click(box.x, box.y);
      await P.page.waitForTimeout(300);
      const r = await P.page.evaluate(() => {
        const items = [...document.querySelectorAll("[data-item]")];
        const it = items[0];
        return {
          clicks: it.dataset.clicks ?? "0", checked: it.getAttribute("aria-checked"), role: it.getAttribute("role"),
          cls: it.classList.contains("atk-consumer"), style: it.style.getPropertyValue("--atk-style").trim(),
          consumer: it.dataset.consumer ?? null, label: it.getAttribute("aria-label"),
          stops: items.filter((x) => x.tabIndex >= 0).length,
        };
      });
      const ok = r.clicks === "1" && r.checked === "true" && r.role === "radio" && r.cls && r.style === "7" && r.consumer === "yes" && r.label?.startsWith("preset ") && r.stops === 1;
      cell(E, "attrs", ok, `preset-migrated · pointer click on item 0: consumer @click ran ${r.clicks}× (want 1), aria-checked ${r.checked}, role ${r.role} (want radio), class ${r.cls}, style --atk-style "${r.style}", data-consumer ${r.consumer}, aria-label "${r.label}", tab stops ${r.stops} (want 1) · load ${load()}`);
      await P.close();
    }

    { // nest
      const P = await openPage(target, engine, "v2-migrated", { mode: "light", query: { sel: 1 } });
      await P.page.waitForTimeout(500);
      const r = await P.page.evaluate(() => {
        const g = document.querySelector("[data-group]");
        const outer = [...g.querySelectorAll(":scope > [data-item]")];
        const inner = g.querySelector(".atk-inner");
        const it = outer[0], cs = getComputedStyle(it), h = it.getBoundingClientRect().height;
        return { outerTile: getComputedStyle(g).getPropertyValue("--selection-tile").trim(), innerTile: inner ? getComputedStyle(inner).getPropertyValue("--selection-tile").trim() : null, corner: parseFloat(cs.borderTopLeftRadius), h, dir: cs.flexDirection, n: outer.length };
      });
      info(E, "nest", `v2-migrated · outer pill group (${r.n} items, no anatomy) --selection-tile ${r.outerTile}, item corner ${r.corner.toFixed(2)} px at h ${r.h.toFixed(2)} (h/2 ${(r.h / 2).toFixed(2)}), flex-direction ${r.dir} · inner tile group ${r.innerTile} · load ${load()}`);
      await P.close();
    }

    { // sup
      const P = await openPage(target, engine, "strip-migrated", { mode: "light", query: { sel: 1 } });
      await P.page.waitForTimeout(1200);
      const r = await P.page.evaluate(() => {
        const it = document.querySelector("[data-item]");
        const ir = it.getBoundingClientRect();
        const range = document.createRange(); const walk = document.createTreeWalker(it, NodeFilter.SHOW_TEXT); const boxes = [];
        for (let n = walk.nextNode(); n; n = walk.nextNode()) { range.selectNodeContents(n); for (const q of range.getClientRects()) if (q.width > 1 && q.height > 1) boxes.push({ t: +q.top.toFixed(2), b: +q.bottom.toFixed(2), text: n.textContent.trim().slice(0, 8) }); }
        return { h: ir.height, corner: parseFloat(getComputedStyle(it).borderTopLeftRadius), boxes, tile: getComputedStyle(it).getPropertyValue("--selection-tile").trim() };
      });
      const k = names(P).length;
      const line = `strip-migrated [${target.meta.flavor}] · pill ${r.h.toFixed(2)} px, corner ${r.corner.toFixed(2)}, tile ${r.tile} · text boxes ${r.boxes.map((b) => `${b.text} ${b.t}–${b.b}`).join(", ")} · "asks for a second row" names ${k} over ${await P.page.evaluate(() => document.querySelectorAll("[data-item]").length)} items (want 0)${k ? ` «${names(P)[0].text.slice(0, 90)}»` : ""} · load ${load()}`;
      if (dev) cell(E, "sup", k === 0, line); else info(E, "sup", line);
      await P.close();
    }
  }
} finally {
  await closeBrowsers();
  await target.close?.();
  lock.release();
}
if (args.json) fs.writeFileSync(String(args.json), JSON.stringify(out, null, 1));
say(`\nattack · ${fails} failing cell(s) · load ${load()} at end`);
process.exit(0);
