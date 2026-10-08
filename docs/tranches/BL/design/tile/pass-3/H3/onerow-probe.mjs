#!/usr/bin/env node
// onerow-probe.mjs · H3-3 audit: for one scene, apply T-2's three one-row cases to item 0 (each on a fresh page) and
// print what the witness reads (rows, cut, height) beside the raw content rects, the label's computed display,
// white-space, overflow and line-clamp, and a screenshot path, so a PASS can be checked against paint.
//   node onerow-probe.mjs --build <dir> --scene pill-icon [--engine chromium|webkit] [--save <dir>]
import path from "node:path";
import { cli, openPage, engineVersion, engineOf, savePng, shot, clipAround } from "../../harness/lib.mjs";
import { tagItems } from "../../harness/measure.mjs";
import { ROW_CASES } from "../../harness/t2-one-line-stadium.mjs";

await cli("ONEROW-PROBE", async (args, target) => {
  const engine = engineOf(args), scene = String(args.scene ?? "pill-icon"), cells = [];
  for (const [what, kind] of ROW_CASES) {
    const P = await openPage(target, engine, scene);
    await tagItems(P);
    const r = await P.page.evaluate(async (kind) => {
      const th = window.__th, el = document.querySelector('[data-th-idx="0"]');
      const label = el.querySelector("[data-line-slot]") ?? [...el.querySelectorAll("span")].find((e) => e.textContent.trim() && !e.children.length) ?? el;
      const add = (tag) => { const x = document.createElement(tag); x.setAttribute("data-th-added", ""); x.textContent = "1"; return x; };
      if (kind === "br") { const b = document.createElement("br"); label.append(b, add("span")); }
      else if (kind === "block") label.append(add("div"));
      else { const d = add("div"); d.setAttribute("data-ink", ""); el.append(d); }
      await th.frame(); await new Promise((res) => setTimeout(res, 600)); await th.frame();
      const cs = getComputedStyle(label), box = el.getBoundingClientRect();
      return { rows: th.rows(el), cut: th.cut(el), h: box.height, rect: { x: box.x, y: box.y, w: box.width, h: box.height },
        label: `${label.tagName.toLowerCase()} display ${cs.display} white-space ${cs.whiteSpace} overflow ${cs.overflowX}/${cs.overflowY} line-clamp ${cs.webkitLineClamp ?? "-"} max-block ${cs.maxBlockSize}`,
        rects: th.contentRects(el).map(({ q, node }) => `${node.tagName.toLowerCase()}${node.hasAttribute("data-th-added") ? "+" : ""} ${q.top.toFixed(1)}–${q.bottom.toFixed(1)}`).join(", ") };
    }, kind);
    let file = "";
    if (typeof args.save === "string") { file = path.join(args.save, `${scene}-${kind}-${engine}.png`); savePng(await shot(P.page, clipAround(r.rect, 6)), file); }
    await P.close();
    cells.push({ gating: false, pass: r.rows <= 1 && r.cut.n === 0, scene, line: `${scene} #0 ${what} · ${r.h.toFixed(2)} px · rows ${r.rows} · cut ${r.cut.n} · label ${r.label} · rects [${r.rects}]${file ? ` · ${file}` : ""}` });
  }
  return { id: "ONEROW-PROBE", title: "H3-3 audit: the one-row cases against raw rects and paint", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
});
