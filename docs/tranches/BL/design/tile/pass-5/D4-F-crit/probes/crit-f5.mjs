#!/usr/bin/env node
// crit-f5.mjs · D4-F pass-5 CRITIC probe. Two parts.
//   --part nest  (a build made with `--route <this dir>/route-crit5`)
//     ST   a SegmentedTabs inside a tile option's `#meta`: its tab must hold its two block rows on one row, as the
//          same strip beside the group does (base.css: "A one-row option (ToggleGroupItem, SegmentedTabs' tab)
//          composes `.pill-row`"). GATING for this probe, reported under next-pass classes (no H5 cell reads it)
//     L3   F's nesting by level: level 1 and 2 tiles, level 3 pills (MIGRATION "for two levels of groups (a group
//          three levels deep is pills)"). GATING for this probe (an E-3 claim)
//   --part mark  (a route build): F's MIGRATION claim "a selected one carries a check in its top inline-end corner
//          when it is at least 3.5 checks wide". For every tile option in every migrated scene: the ::after's used
//          inline size against the rule (padding-box width >= 3.5 x the mark size → the mark size, else 0). GATING
//          for this probe (an E-3 claim). On K2 (`specimen-migrated`) it also reports, per tile, whether the mark's box
//          covers the media path's end point and the overlap area with the path's box (G, reported)
// Light and dark (nest), light (mark: geometry only).
//   node crit-f5.mjs --build <dir> --part nest|mark [--engine chromium|webkit] [--out <dir>]
import { cli, openPage, engineVersion, engineOf, f2 } from "../../../harness/lib.mjs";
import { READ_ITEM, judgeFact } from "../../../harness/fact-split.mjs";

const READ_TAB = async (which) => {
  await window.__th.frame();
  const strip = document.querySelector(`[data-scene] [data-st="${which}"]`);
  if (!strip) return null;
  const tab = strip.querySelector(".segmented-tab");
  const tops = [];
  const w = document.createTreeWalker(tab, NodeFilter.SHOW_TEXT);
  for (let t = w.nextNode(); t; t = w.nextNode()) {
    if (!t.textContent.trim()) continue;
    const rg = document.createRange(); rg.selectNodeContents(t);
    for (const q of rg.getClientRects()) if (q.height > 0 && !tops.some((y) => Math.abs(y - q.top) < q.height / 2)) tops.push(q.top);
  }
  const b = tab.getBoundingClientRect(), sb = strip.getBoundingClientRect();
  const kids = [...tab.querySelectorAll("span")];
  const past = kids.filter((c) => { const r = c.getBoundingClientRect(); return r.height > 0 && (r.bottom > b.bottom + 1 || r.top < b.top - 1); }).length;
  return { rows: tops.length, w: b.width, h: b.height, stripH: sb.height, past,
    display: getComputedStyle(kids[0]).display, fact: getComputedStyle(tab.parentElement).getPropertyValue("--selection-tile").trim() };
};

const READ_MARKS = async () => {
  await window.__th.frame();
  const out = [];
  for (const it of document.querySelectorAll("[data-scene] .toggle-group__item")) {
    const cs = getComputedStyle(it), a = getComputedStyle(it, "::after");
    const marked = cs.getPropertyValue("--toggle-group-marked").trim();
    const fact = it.parentElement ? getComputedStyle(it.parentElement).getPropertyValue("--selection-tile").trim() : "";
    const mark = parseFloat(getComputedStyle(it).getPropertyValue("--toggle-group-mark")) * parseFloat(getComputedStyle(document.documentElement).fontSize);
    const b = it.getBoundingClientRect();
    const padW = it.clientWidth; // the padding box (no scrollbar on an option)
    const used = parseFloat(a.width) || 0;
    const tile = fact !== "" && fact !== "none";
    const want = !tile ? 0 : padW >= 3.5 * mark ? mark : 0;
    let cover = null;
    const path = it.querySelector(".toggle-group__media path, svg path");
    if (tile && used > 0 && path && path.getTotalLength) {
      const ins = parseFloat(a.insetBlockStart ?? a.top) || 0, ine = parseFloat(a.insetInlineEnd ?? a.right) || 0;
      const mx1 = b.right - ine - used, my0 = b.top + ins, mx2 = mx1 + used, my1 = my0 + used;
      const svg = path.ownerSVGElement, m = path.getScreenCTM();
      const end = path.getPointAtLength(path.getTotalLength());
      const p = svg.createSVGPoint(); p.x = end.x; p.y = end.y; const e = p.matrixTransform(m);
      const pr = path.getBoundingClientRect();
      const ox = Math.max(0, Math.min(mx2, pr.right) - Math.max(mx1, pr.left)), oy = Math.max(0, Math.min(my1, pr.bottom) - Math.max(my0, pr.top));
      cover = { endIn: e.x >= mx1 && e.x <= mx2 && e.y >= my0 && e.y <= my1, end: [e.x - b.left, e.y - b.top], markBox: [mx1 - b.left, my0 - b.top, used], overlap: ox * oy, pathArea: pr.width * pr.height };
    }
    out.push({ scene: it.closest("[data-scene]")?.dataset.scene ?? "?", value: it.getAttribute("data-value") ?? it.textContent.trim().slice(0, 18), tile, marked, padW, mark, used, want, on: it.dataset.state === "on", cover });
  }
  return out;
};

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("CRIT-F5", async (args, target) => {
    const engine = engineOf(args);
    const part = args.part ?? "nest";
    const cells = [];
    if (part === "nest") {
      for (const mode of ["light", "dark"]) {
        let P = await openPage(target, engine, "stnest-migrated", { mode });
        try {
          const inn = await P.page.evaluate(READ_TAB, "in"), bes = await P.page.evaluate(READ_TAB, "beside");
          const outer = await P.page.evaluate(READ_ITEM, `[data-scene] [data-ci="st-outer-0"]`);
          const errs = P.logs.filter((l) => l.type === "error" || l.type === "pageerror");
          const d = (r) => r ? `${r.rows} text row(s) · tab ${f2(r.w)}×${f2(r.h)} (strip ${f2(r.stripH)}) · first span display ${r.display} · tab parent's fact ${r.fact || "(unset)"} · spans past the tab ${r.past}` : "no element";
          cells.push({ gating: true, pass: !!bes && bes.rows === 1, scene: "stnest-migrated", line: `ST-control ${mode} · the strip beside the group · want one row · ${d(bes)}` });
          cells.push({ gating: true, pass: !!inn && inn.rows === 1, scene: "stnest-migrated", line: `ST ${mode} · the strip inside a tile option's #meta · want one row (as beside) · ${d(inn)} · outer option ${outer ? `${judgeFact("tile", outer).why}, ${f2(outer.w)}×${f2(outer.h)}` : "?"} · ${target.meta.dev ? `console errors from navigation ${errs.length}${errs[0] ? ` «${errs.map((e) => e.text.slice(0, 90)).join(" | ")}»` : ""}` : "production flavour"}` });
        } finally { await P.close(); }
        P = await openPage(target, engine, "n3deep-migrated", { mode });
        try {
          for (const [id, want] of [["l1-0", "tile"], ["l2-0", "tile"], ["l3-0", "pill"]]) {
            const r = await P.page.evaluate(READ_ITEM, `[data-scene] [data-ci="${id}"]`);
            const j = judgeFact(want, r);
            cells.push({ gating: true, pass: j.pass, scene: "n3deep-migrated", line: `L3 ${mode} · ${id} · want ${want} · ${j.why}${r ? ` · fact ${r.fact} · ${f2(r.w)}×${f2(r.h)} · ${r.computed} → used ${f2(r.used)} (${f2(r.ratio)}×h/2) · ${r.rows} row(s) · ${r.dir}` : ""}` });
          }
          const errs = P.logs.filter((l) => l.type === "error" || l.type === "pageerror");
          cells.push({ gating: false, pass: true, scene: "n3deep-migrated", line: `L3 ${mode} · ${target.meta.dev ? `console errors from navigation ${errs.length}${errs[0] ? ` «${errs.map((e) => e.text.slice(0, 80)).join(" | ")}»` : ""}` : "production flavour"} (reported)` });
        } finally { await P.close(); }
      }
    } else {
      for (const scene of ["specimen-migrated", "preset-migrated", "strip-migrated", "v2-migrated", "f1-migrated", "c1-migrated"]) {
        const P = await openPage(target, engine, scene, { mode: "light" });
        try {
          const rs = await P.page.evaluate(READ_MARKS);
          const tiles = rs.filter((r) => r.tile);
          const bad = tiles.filter((r) => Math.abs(r.used - r.want) > 0.5);
          const marked = tiles.filter((r) => r.want > 0).length;
          cells.push({ gating: true, pass: tiles.length === 0 || bad.length === 0, scene, line: `MK ${scene} · ${tiles.length} tile option(s), ${marked} wide enough for the mark (padding box >= 3.5 marks), ${rs.length - tiles.length} pill(s) · ${bad.length ? `MISMATCH ${bad.map((r) => `${r.value}: pad ${f2(r.padW)} px, mark ${f2(r.mark)}, used ${f2(r.used)} (want ${f2(r.want)})`).join("; ")}` : `every used mark size matches the rule (${[...new Set(tiles.map((r) => `${f2(r.padW)}→${f2(r.used)}`))].slice(0, 6).join(", ")})`}` });
          for (const r of tiles.filter((x) => x.cover)) {
            cells.push({ gating: false, pass: true, scene, line: `MK-cover ${scene} · ${r.value}${r.on ? " (selected)" : ""} · mark box at ${f2(r.cover.markBox[0])},${f2(r.cover.markBox[1])} size ${f2(r.cover.markBox[2])} · media path end at ${f2(r.cover.end[0])},${f2(r.cover.end[1])} · ${r.cover.endIn ? "the mark COVERS the path's end point" : "the end point is clear"} · overlap with the path box ${f2(r.cover.overlap)} px² of ${f2(r.cover.pathArea)} (reported, G)` });
          }
        } finally { await P.close(); }
      }
    }
    return { id: "CRIT-F5", title: `D4-F pass-5 critic cells (${part})`, engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}
