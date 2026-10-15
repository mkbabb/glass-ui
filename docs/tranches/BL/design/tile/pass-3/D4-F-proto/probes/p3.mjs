#!/usr/bin/env node
// D4-F pass-3 prototype · probes/p3.mjs · what the prototype added to the spec's sketch, and the spec's two owed
// reads (its §6 R-10 and R-11), read where the H3 battery and the shared probes do not read them. One process
// under the harness lock; the load is printed beside every section.
//   node p3.mjs --build <out>/builds/f3p-src [--engines chromium,webkit] [--only stack,forced,settle,cost] [--json f]
// Sections:
//   stack   R-13, the development name for text stacked INSIDE the rung. Per flavour (run once per build):
//           rest    every gating pill scene as mounted: 0 "asks for a second row" names (a tall badge or an icon
//                   beside a label is one row; the name must not be noise).
//           style   1.1 s after mount, a <span style="display:block"> appended inside item 0's label.
//           class   the same span appended inline, then given a class that sets display:block 300 ms later (the
//                   observer's attribute arm).
//           inline  control: an inline span appended. One row, 0 names.
//           A development flavour must name style and class once each and stay silent on rest and inline; a
//           production flavour must stay silent everywhere. The painted rows are reported beside the names.
//   forced  the mark under forced colours: its computed fill against the selected plate's (the spec's sketch
//           painted Highlight on Highlight). Gating: contrast >= 3 and the mark at its nominal size.
//   settle  the spec's R-11: the selected K2 plate, sampled 2 frames, 700 ms and 1500 ms after load, on the spec's
//           strip (3 px inside the border box) and on one 8 px inside. Reported.
//   cost    the spec's R-10: style recalculation with the :has() tile rule and with the same rule keyed on a class.
//           Reported, with the load.
import fs from "node:fs";
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load, engineVersion, shot, meanRect, contrast } from "../../../harness/lib.mjs";

const args = parseArgs();
const engines = String(args.engines ?? "chromium,webkit").split(",");
const only = args.only ? String(args.only).split(",") : null;
const want = (k) => !only || only.includes(k);
const lock = await acquireLock("d4f-p3-proto-probe");
const target = await openTarget(args);
const out = { build: target.label, meta: target.meta, engines: {} };
const say = (s) => console.log(s);
say(`D4-F p3 proto probe · ${target.label} (${target.meta.sha}, flavor ${target.meta.flavor}, dev ${!!target.meta.dev}) · lock waited ${lock.waitedS}s · load ${load()} at start`);
let pass = 0, n = 0;
const cell = (E, sec, ok, line, gating = true) => { if (gating) { n++; if (ok) pass++; } say(`  ${gating ? (ok ? "PASS" : "FAIL") : "INFO"} ${sec} · ${line}`); (E[sec] ??= []).push({ ok, gating, line }); };
const FRAME = `new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))`;
async function open(engine, scene, o) { let e; for (let k = 0; k < 3; k++) { try { return await openPage(target, engine, scene, o); } catch (x) { e = x; say(`  retry ${scene} after: ${String(x.message).split("\n")[0]} · load ${load()}`); } } throw e; }
const names = (P) => P.logs.filter((l) => (l.type === "error" || l.type === "pageerror") && l.text.includes("[ToggleGroupItem]") && l.text.includes("asks for a second row"));
const css = (s) => { const m = /(\d+(?:\.\d+)?)[ ,]+(\d+(?:\.\d+)?)[ ,]+(\d+(?:\.\d+)?)/.exec(s); return m ? [+m[1], +m[2], +m[3]] : null; };

for (const engine of engines) {
  const E = out.engines[engine] = { version: await engineVersion(engine), loadStart: load() };
  say(`\n${E.version} · load ${E.loadStart}`);
  const section = async (k, fn) => { if (!want(k)) return; say(` [${k}] load ${load()}`); try { await fn(); } catch (e) { cell(E, k, false, `HARNESS ERROR ${String(e.message).split("\n")[0]} · load ${load()}`); } };
  const dev = !!target.meta.dev;

  await section("stack", async () => {
    for (const scene of ["single", "vertical", "pill-icon", "pill-badge", "family-d-undeclared"]) {
      const P = await open(engine, scene);
      await P.page.waitForTimeout(1100);
      const k = names(P).length;
      cell(E, "stack", k === 0, `rest ${scene} [${target.meta.flavor}] · names ${k} (want 0) · load ${load()}`);
      await P.close();
    }
    for (const scene of ["single", "pill-badge"]) for (const kind of ["style", "class", "inline"]) {
      const P = await open(engine, scene);
      await P.page.waitForTimeout(1100);
      const r = await P.page.evaluate(async (kind) => {
        const it = document.querySelector("[data-item]"); const label = it.querySelector("[data-line-slot]") ?? it.querySelector("span") ?? it;
        const d = document.createElement("span"); d.textContent = "0.35 s · ζ 0.6";
        if (kind === "style") d.style.display = "block";
        label.append(" ", d);
        if (kind === "class") {
          const st = document.createElement("style"); st.textContent = ".th-blk{display:block}"; document.head.append(st);
          await new Promise((res) => setTimeout(res, 300));
          d.className = "th-blk";
        }
        await new Promise((res) => setTimeout(res, 800));
        const ir = it.getBoundingClientRect();
        const range = document.createRange(); range.selectNodeContents(label);
        const rects = [...range.getClientRects()].filter((q) => q.width > 1 && q.height > 1);
        const inside = rects.filter((q) => q.bottom <= ir.bottom + 0.5 && q.top >= ir.top - 0.5);
        const tops = (xs) => [...new Set(xs.map((q) => Math.round(q.top)))].length;
        return { rung: parseFloat(getComputedStyle(it).minBlockSize), h: ir.height, rows: tops(rects), inside: tops(inside), corner: getComputedStyle(it).borderTopLeftRadius };
      }, kind);
      const k = names(P).length;
      const wantNames = dev && kind !== "inline" ? 1 : 0;
      cell(E, "stack", k === wantNames, `${kind} ${scene} [${target.meta.flavor}] · item ${r.h.toFixed(2)} px at rung ${r.rung.toFixed(2)}, ${r.corner} · text rows ${r.rows}, painted inside the plate ${r.inside} · names ${k} (want ${wantNames})${k ? ` «${names(P)[0].text.slice(0, 70)}»` : ""} · load ${load()}`);
      await P.close();
    }
  });

  await section("forced", async () => {
    for (const scene of ["preset-migrated", "specimen-migrated"]) {
      const P = await open(engine, scene, { mode: "forced", query: { sel: 1 } });
      await P.page.waitForTimeout(700);
      const r = await P.page.evaluate(() => {
        const it = document.querySelector('[data-item][data-state="on"]') ?? document.querySelector('[data-item][aria-checked="true"]');
        const cs = getComputedStyle(it), a = getComputedStyle(it, "::after");
        return { forced: matchMedia("(forced-colors: active)").matches, plate: cs.backgroundColor, mark: a.backgroundColor, size: a.inlineSize ?? a.width, opacity: a.opacity, adjust: a.forcedColorAdjust };
      });
      const p = css(r.plate), m = css(r.mark); const c = p && m ? contrast(m, p) : 0;
      cell(E, "forced", r.forced && c >= 3 && parseFloat(r.size) >= 14 && +r.opacity === 1, `${scene} ${P.modeLabel} · forced-colors matches ${r.forced} · selected plate ${r.plate} · mark ${r.mark} (${r.size}, opacity ${r.opacity}, forced-color-adjust ${r.adjust}) · mark against plate ${c.toFixed(2)}:1 · load ${load()}`);
      await P.close();
    }
  });

  await section("settle", async () => {
    for (const mode of ["light", "dark"]) {
      const P = await open(engine, "specimen-migrated", { mode, query: { sel: 1 } });
      await P.page.mouse.move(2, 2);
      const g = await P.page.evaluate(() => {
        const items = [...document.querySelectorAll("[data-item]")]; items[0].scrollIntoView({ block: "center" });
        const box = (el) => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; };
        return { off: box(items[0]), on: box(items[1]) };
      });
      const clip = { x: Math.floor(g.off.x) - 8, y: Math.floor(g.off.y) - 8, width: Math.ceil(g.on.x + g.on.w - g.off.x) + 16, height: Math.ceil(g.off.h) + 16 };
      const rgb = (c) => c.map((v) => v.toFixed(0)).join(",");
      const reads = [];
      for (const [label, wait] of [["2 frames", 0], ["700 ms", 700], ["1500 ms", 800]]) {
        if (wait) await P.page.waitForTimeout(wait); else await P.page.evaluate(FRAME);
        const s = await shot(P.page, clip);
        const at = (dy) => meanRect(s, { x: g.on.x + 16, y: g.on.y + dy, w: Math.max(4, g.on.w - 60), h: 4 });
        reads.push(`${label}: 3 px in ${rgb(at(3))}, 8 px in ${rgb(at(8))}`);
      }
      cell(E, "settle", true, `specimen-migrated ${P.modeLabel} · selected tile y ${g.on.y.toFixed(2)} (fraction ${(g.on.y % 1).toFixed(2)}) · ${reads.join(" · ")} · load ${load()}`, false);
      await P.close();
    }
  });

  await section("cost", async () => {
    const P = await open(engine, "specimen-migrated");
    const r = await P.page.evaluate(async () => {
      const grid = document.querySelector("[data-group]"), proto = grid.querySelector("[data-item]");
      for (let k = 0; k < 192; k++) proto.parentNode.append(proto.cloneNode(true));
      const items = [...document.querySelectorAll("[data-item]")];
      const time = () => { const t0 = performance.now(); for (let k = 0; k < 40; k++) { items[(k * 7) % items.length].toggleAttribute("data-probe"); document.documentElement.classList.toggle("th-x"); void items[0].offsetHeight; getComputedStyle(items[items.length - 1]).borderTopLeftRadius; } return performance.now() - t0; };
      const rounds = (m) => Array.from({ length: m }, time).sort((a, b) => a - b);
      const withHas = rounds(9);
      let rewritten = 0;
      for (const s of document.styleSheets) { let rules; try { rules = s.cssRules; } catch { continue; } const walk = (list, owner) => { for (let i = list.length - 1; i >= 0; i--) { const x = list[i]; if (x.selectorText && x.selectorText.includes(":has(") && x.selectorText.includes("toggle-group__me")) { const text = x.cssText.replace(x.selectorText, ".toggle-group.th-tiles"); owner.deleteRule(i); owner.insertRule(text, i); rewritten++; } else if (x.cssRules && !x.selectorText) walk(x.cssRules, x); } }; walk(rules, s); }
      grid.classList.add("th-tiles");
      const withClass = rounds(9);
      const cs = getComputedStyle(items[0]);
      return { n: items.length, rewritten, withHas, withClass, radius: cs.borderTopLeftRadius, tile: cs.getPropertyValue("--selection-tile").trim() };
    });
    const med = (a) => a[Math.floor(a.length / 2)];
    cell(E, "cost", true, `${r.n} tiles, 40 forced style+layout passes per round, 9 rounds · the :has() tile rule min ${r.withHas[0].toFixed(1)} ms, median ${med(r.withHas).toFixed(1)} ms · the same ${r.rewritten} rule(s) keyed on a class min ${r.withClass[0].toFixed(1)} ms, median ${med(r.withClass).toFixed(1)} ms (tile corner still ${r.radius}, fact ${r.tile}) · ratio of minima ${(r.withHas[0] / r.withClass[0]).toFixed(2)} · load ${load()}`, false);
    await P.close();
  });
  E.loadEnd = load();
}
await closeBrowsers();
lock.release?.();
say(`\nD4-F p3 proto probe · gating ${pass}/${n} · load ${load()} at end`);
if (args.json) fs.writeFileSync(String(args.json), JSON.stringify({ ...out, pass, n, loadEnd: load() }, null, 2));
process.exit(0);
