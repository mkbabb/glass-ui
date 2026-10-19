#!/usr/bin/env node
// crit-f6.mjs · D4-F pass-6 CRITIC probe. Two parts, light and dark.
//   --part strip  (a build made with `--route ../crit-route`, scene `critf6-migrated`): FV5-2's strip reset and the pin's
//          widened limit on the strip placements H6-3 does not build, on F's anatomy (see ../crit-route/migrated.mjs).
//          vt, ut, mt GATING: every tab 1 row, nothing cut past it, each tab the reference tab's height ±0.5 px.
//          ct, pg GATING (F's MIGRATION: "an option belongs to its nearest group"): the inner anatomy group's options
//          are tiles (fact flush, 16 px, column); in pg the outer option stays a pill (fact none, used corner h/2).
//   --part ink  (a route build): FV5-1 on every migrated site, not only K2's name (REPORT `name-ink` reads K2 only).
//          For every option of the six `<site>-migrated` scenes, every element holding its own text and every SVG
//          shape with a stroke or fill other than none: its computed colour (text) or paint (stroke/fill) is the
//          item's computed colour. GATING per scene and mode. Reported: the selected against unselected item ink.
//   node crit-f6.mjs --build <dir> --part strip|ink [--engine chromium|webkit] [--out <dir>]
import { cli, openPage, engineVersion, engineOf, f2 } from "../../../harness/lib.mjs";
import { READ_ITEM } from "../../../harness/fact-split.mjs";

const READ_TABS = async (id) => {
  await window.__th.frame();
  const strip = document.querySelector(`[data-c-st="${id}"]`);
  if (!strip) return null;
  const sb = strip.getBoundingClientRect();
  const tabs = [...strip.querySelectorAll(":scope > .segmented-tab")].map((tab) => {
    const boxes = [], rg = document.createRange(), tw = document.createTreeWalker(tab, NodeFilter.SHOW_TEXT);
    for (let n = tw.nextNode(); n; n = tw.nextNode()) { if (!n.textContent.trim() || n.parentElement.closest("[data-c-inner]")) continue; rg.selectNodeContents(n); for (const r of rg.getClientRects()) if (r.width > 1 && r.height > 1) boxes.push(r); }
    boxes.sort((p, q) => p.bottom - q.bottom); let rows = 0, bottom = -Infinity;
    for (const r of boxes) if ((r.top + r.bottom) / 2 > bottom) { rows++; bottom = r.bottom; }
    const tb = tab.getBoundingClientRect();
    const past = [...tab.querySelectorAll(":scope > *")].filter((k) => { const r = k.getBoundingClientRect(); return r.height > 0 && (r.bottom > tb.bottom + 1 || r.top < tb.top - 1); }).length;
    return { rows, w: tb.width, h: tb.height, past, fact: getComputedStyle(tab).getPropertyValue("--selection-tile").trim() };
  });
  return { w: sb.width, h: sb.height, fact: getComputedStyle(strip).getPropertyValue("--selection-tile").trim(), tabs };
};
const sdesc = (s) => s ? `strip ${f2(s.w)}×${f2(s.h)} fact ${s.fact || "(unset)"} · tabs ${s.tabs.map((t) => `${f2(t.h)}px ${t.rows}r${t.past ? ` ${t.past}cut` : ""} ${t.fact}`).join(", ")}` : "no strip";
const judgeTabs = (r, ref) => {
  if (!r || !ref) return { pass: false, why: !ref ? "no reference strip" : "no strip in the option" };
  if (ref.tabs.some((t) => t.rows !== 1)) return { pass: false, why: "the REFERENCE strip stacks: the composition is broken" };
  const bad = r.tabs.filter((t, i) => t.rows !== 1 || t.past || Math.abs(t.h - (ref.tabs[i]?.h ?? -99)) > 0.5);
  return { pass: !bad.length && r.tabs.length === ref.tabs.length, why: bad.length ? `${bad.length} tab(s) off the one-row law or off the reference height` : "every tab 1 row, nothing cut, at the reference height" };
};
const idesc = (r) => r ? `fact ${r.fact || "(unset)"} ${f2(r.w)}×${f2(r.h)} used ${f2(r.used)} (${f2(r.ratio)}×h/2) ${r.rows}r ${r.dir}` : "missing";
const isTile = (r) => r && r.fact === "flush" && Math.abs(r.used - 16) <= 0.5 && r.dir === "column";

const READ_INK = async () => {
  await window.__th.frame();
  const out = [];
  for (const it of document.querySelectorAll("[data-scene] .toggle-group__item")) {
    const ink = getComputedStyle(it).color;
    const bad = [];
    let texts = 0, shapes = 0;
    for (const el of it.querySelectorAll("*")) {
      const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (own && !(el instanceof SVGElement)) { texts++; const c = getComputedStyle(el).color; if (c !== ink) bad.push(`${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 2).join(".")} "${el.textContent.trim().slice(0, 14)}" color ${c}`); }
      if (el instanceof SVGGeometryElement) {
        const cs = getComputedStyle(el);
        for (const p of ["stroke", "fill"]) { const v = cs[p]; if (!v || v === "none" || /^url/.test(v)) continue; shapes++; if (v !== ink) bad.push(`${el.tagName} ${p} ${v}`); }
      }
    }
    out.push({ scene: it.closest("[data-scene]")?.dataset.scene ?? "?", value: it.getAttribute("data-value") ?? it.textContent.trim().slice(0, 14), on: it.dataset.state === "on", ink, texts, shapes, bad });
  }
  return out;
};
const rgb = (s) => (s.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);
const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
const L = (c) => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
const ratio = (a, b) => { const [x, y] = [L(a), L(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const toRgb = async (page, c) => page.evaluate((c) => { const cv = document.createElement("canvas"); cv.width = cv.height = 1; const x = cv.getContext("2d"); x.fillStyle = "#000"; x.fillStyle = c; x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3); }, c);

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("CRIT-F6", async (args, target) => {
    const engine = engineOf(args);
    const part = args.part ?? "strip";
    const cells = [];
    for (const mode of ["light", "dark"]) {
      if (part === "strip") {
        const P = await openPage(target, engine, "critf6-migrated", { mode });
        try {
          const read = async (id) => P.page.evaluate(READ_TABS, id);
          const refV = await read("ref-v"), refU = await read("ref-u"), refP = await read("ref-p");
          for (const [id, ref] of [["vt", refV], ["ut", refU], ["mt", refP]]) {
            const r = await read(id), j = judgeTabs(r, ref), o = await P.page.evaluate(READ_ITEM, `[data-c-item="${id}"]`);
            cells.push({ gating: true, pass: j.pass, scene: "critf6-migrated", arm: "migrated", line: `${id} ${mode} · ${j.why} · ${sdesc(r)} · reference ${sdesc(ref)} · its option ${idesc(o)}` });
          }
          for (const id of ["ct", "pg"]) {
            const inn = [await P.page.evaluate(READ_ITEM, `[data-c-inner-item="${id}-0"]`), await P.page.evaluate(READ_ITEM, `[data-c-inner-item="${id}-1"]`)];
            const ok = inn.every(isTile);
            cells.push({ gating: true, pass: ok, scene: "critf6-migrated", arm: "migrated", line: `${id}-inner ${mode} · the inner anatomy group's options ${ok ? "ARE tiles" : "are NOT tiles"} · ${inn.map(idesc).join(" | ")}` });
          }
          const outer = await P.page.evaluate(() => { const el = document.querySelector('[data-c-item="pg"]'); const c = window.__th.corner(el); return { fact: getComputedStyle(el).getPropertyValue("--selection-tile").trim(), used: c.used, h: c.h, w: c.w, dir: getComputedStyle(el).flexDirection }; });
          const pill = (outer.fact === "none" || outer.fact === "") && Math.abs(outer.used - outer.h / 2) <= 0.5;
          cells.push({ gating: true, pass: pill, scene: "critf6-migrated", arm: "migrated", line: `pg-outer ${mode} · the pill group's option ${pill ? "stays a pill" : "is NOT a pill"} · fact ${outer.fact || "(unset)"} ${f2(outer.w)}×${f2(outer.h)} used ${f2(outer.used)} (h/2 ${f2(outer.h / 2)}) ${outer.dir}` });
        } finally { await P.close(); }
      } else {
        for (const scene of ["preset-migrated", "specimen-migrated", "strip-migrated", "f1-migrated", "v2-migrated", "c1-migrated"]) {
          const P = await openPage(target, engine, scene, { mode });
          try {
            const rs = await P.page.evaluate(READ_INK);
            const bad = rs.filter((r) => r.bad.length);
            const on = rs.find((r) => r.on), off = rs.find((r) => !r.on);
            let rep = "";
            if (on && off) { const a = await toRgb(P.page, on.ink), b = await toRgb(P.page, off.ink); rep = ` · selected ink ${a.join(",")} against unselected ${b.join(",")}: ${f2(ratio(a, b))}:1 (reported, R-5)`; }
            cells.push({ gating: true, pass: rs.length > 0 && !bad.length, scene, arm: "migrated", line: `INK ${scene} ${mode} · ${rs.length} option(s), ${rs.reduce((s, r) => s + r.texts, 0)} text holder(s), ${rs.reduce((s, r) => s + r.shapes, 0)} painted shape(s) · ${bad.length ? `OFF THE ITEM'S INK: ${bad.map((r) => `${r.value}${r.on ? " (on)" : ""} [${r.bad.slice(0, 3).join("; ")}]`).join(" | ")}` : "every text and shape paints its item's ink"}${rep}` });
          } finally { await P.close(); }
        }
      }
    }
    return { id: "CRIT-F6", title: `D4-F pass-6 critic cells (${part})`, engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}
