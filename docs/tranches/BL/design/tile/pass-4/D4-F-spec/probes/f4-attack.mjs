#!/usr/bin/env node
// D4-F pass 4 · the route's own attack probe on HEAD + floor v3 (+ the route). Reads the compositions in
// ./route-f4/migrated.mjs (build with `build.mjs <wt> --route <this dir>/route-f4`), light and dark:
//   every [data-probe-g] group: the tile fact it carries against `data-want`
//   every [data-probe-i] item: the fact it reads on itself, the used corner, flex-direction, overflow, the rows of text
//   it paints (H3's midpoint rule) and the library rows it renders, against `data-want-item` (tile: the fact is not
//   none, 16 px, a column, nothing clipped, a `.block` inside it still a block; pill: the fact is none, h/2 ± 0.5, one row, no library row rendered)
//   on a development flavour, the console errors (a false "asks for a second row" on a tile is a FAIL)
//   node f4-attack.mjs --build <out>/builds/<label> [--engine chromium|webkit] [--out <dir>]
import { cli, openPage, engineVersion, engineOf, f2 } from "../../../harness/lib.mjs";

const SCENES = ["c1-migrated", "v2-migrated", "specimen-migrated", "f1-migrated", "preset-migrated", "strip-migrated"];

function read() {
  const rowsOf = (el) => { // the longest chain of text boxes, each with its midpoint below the last one's bottom
    const range = document.createRange(), walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), boxes = [];
    for (let n = walk.nextNode(); n; n = walk.nextNode()) { range.selectNodeContents(n); for (const r of range.getClientRects()) if (r.width > 1 && r.height > 1) boxes.push(r); }
    boxes.sort((p, q) => p.bottom - q.bottom);
    let rows = 0, bottom = -Infinity;
    for (const r of boxes) if ((r.top + r.bottom) / 2 > bottom) { rows++; bottom = r.bottom; }
    return rows;
  };
  const cut = (el) => { const b = el.getBoundingClientRect(); return [...el.querySelectorAll("*")].filter((c) => { const r = c.getBoundingClientRect(); return r.height > 0 && (r.bottom > b.bottom + 1 || r.top < b.top - 1); }).length; };
  const groups = [...document.querySelectorAll("[data-scene] [data-probe-g]")].map((g) => ({ name: g.dataset.probeG, want: g.dataset.want, fact: getComputedStyle(g).getPropertyValue("--selection-tile").trim() }));
  const items = [...document.querySelectorAll("[data-scene] [data-probe-i]")].filter((i) => i.dataset.wantItem).map((i) => {
    const cs = getComputedStyle(i), b = i.getBoundingClientRect();
    const used = Math.min(parseFloat(cs.borderTopLeftRadius) || 0, b.height / 2, b.width / 2);
    return { name: i.dataset.probeI, want: i.dataset.wantItem, fact: cs.getPropertyValue("--selection-tile").trim(), w: b.width, h: b.height, computed: cs.borderTopLeftRadius, used, dir: cs.flexDirection,
      overflow: cs.overflowY, rows: rowsOf(i), cut: cut(i), lib: i.querySelectorAll(":scope > .toggle-group__media, :scope > .toggle-group__meta").length,
      blockLost: [...i.querySelectorAll(".block")].filter((c) => getComputedStyle(c).display !== "block").length,
      inner: [...i.querySelectorAll("[style*='--selection-tile'], .block")].map((c) => `${c.tagName.toLowerCase()} ${getComputedStyle(c).display} fact ${getComputedStyle(c).getPropertyValue("--selection-tile").trim()}`) };
  });
  return { groups, items };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("F4-ATTACK", async (args, target) => {
    const engine = engineOf(args);
    const cells = [];
    const dev = !!target.meta.dev;
    for (const scene of SCENES) for (const mode of ["light", "dark"]) {
      const P = await openPage(target, engine, scene, { mode, query: { sel: 1 } });
      await P.page.waitForTimeout(1200); // the development check runs a frame after mount and after each mutation
      const r = await P.page.evaluate(read);
      const errs = P.logs.filter((l) => l.type === "error" || l.type === "pageerror").map((l) => l.text);
      await P.close();
      for (const g of r.groups) cells.push({ gating: true, pass: g.fact === g.want, scene, line: `${scene} ${mode} · group «${g.name}» fact ${g.fact || "(unset)"} (want ${g.want})` });
      for (const i of r.items) {
        const tile = i.fact !== "none" && Math.abs(i.used - 16) <= 0.5 && i.dir === "column" && i.cut === 0 && i.blockLost === 0;
        const pill = i.fact === "none" && Math.abs(i.used - i.h / 2) <= 0.5 && i.rows <= 1 && i.lib === 0;
        const pass = i.want === "tile" ? tile : pill;
        cells.push({ gating: true, pass, scene, line: `${scene} ${mode} · item «${i.name}» want ${i.want} · item fact ${i.fact} · ${f2(i.w)}×${f2(i.h)} ${i.computed} → used ${f2(i.used)} (h/2 ${f2(i.h / 2)}) · ${i.dir} · overflow ${i.overflow} · text rows ${i.rows}, cut ${i.cut}, library rows ${i.lib}, a tile's block content held inline ${i.blockLost}${i.inner.length ? " · inner " + i.inner.join("; ") : ""}` });
      }
      const false2nd = errs.filter((e) => /asks for a second row/.test(e) && r.items.some((i) => i.want === "tile"));
      if (scene === "preset-migrated" || scene === "strip-migrated") {
        const named = errs.filter((e) => /asks for a second row/.test(e)).length;
        // a tile group must not be named as a pill (preset); a pill stacked by a written fact is refused, so not named either way (strip)
        cells.push({ gating: dev && scene === "preset-migrated", pass: scene === "preset-migrated" ? named === 0 : true, scene,
          line: `${scene} ${mode} [${target.meta.flavor}${dev ? "" : ", production: reported"}] · "asks for a second row" ${named}${errs[0] ? ` «${errs[0].slice(0, 110)}»` : ""}${false2nd.length && scene === "preset-migrated" ? " (a tile named as a pill)" : ""}` });
      }
    }
    return { id: "F4-ATTACK", title: "D4-F pass 4: empty anatomy, wrappers and nesting, the fact written below the group", engine, engineLabel: await engineVersion(engine), target: target.label, dev, cells };
  });
}
