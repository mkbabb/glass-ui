#!/usr/bin/env node
// W-D (D4-D, the tile shape on ToggleGroup) · The tile is declared once, at the group: in the W-D scenes the
// group carries shape="cell" and the items carry no utilities, and every item computes a 16 px used corner that
// --radius-field resolves to, a column layout (flex-direction column), body leading (line-height equal to
// --type-leading-body × font-size) and more than one row of content.
//   node wd-declared-cell.mjs --build <dir> | --fixture [--fault wd] [--engine chromium|webkit]
import { cli, openPage, sceneList, scenesFor, engineVersion, f2 } from "./lib.mjs";

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("W-D", async (args, target) => {
    const engine = args.engine ?? "chromium";
    const cells = [];
    for (const sc of scenesFor(await sceneList(target, engine), "W-D")) {
      const P = await openPage(target, engine, sc.id);
      const rows = await P.page.evaluate(() => window.__th.items().map((el) => {
        const th = window.__th, cs = getComputedStyle(el), c = th.corner(el);
        const field = parseFloat(th.resolve(el, "--radius-field"));
        const lead = parseFloat(th.resolve(el, "--type-leading-body", "z-index")) || parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--type-leading-body"));
        const lh = cs.lineHeight === "normal" ? NaN : parseFloat(cs.lineHeight);
        return { used: c.used, computed: c.computed, field, dir: cs.flexDirection, lh, want: lead * parseFloat(cs.fontSize), rows: th.rows(el), cls: el.className };
      }));
      rows.forEach((r, i) => {
        const ok = Math.abs(r.used - 16) <= 0.5 && Math.abs(r.field - r.used) <= 0.5 && r.dir === "column" && Math.abs(r.lh - r.want) <= 0.5 && r.rows > 1;
        cells.push({ gating: sc.gating, pass: ok, scene: sc.id, line: `${sc.id} #${i} · corner ${r.computed}→${f2(r.used)} (--radius-field ${f2(r.field)}) · ${r.dir} · line-height ${f2(r.lh)} vs body ${f2(r.want)} · rows ${r.rows}` });
      });
      await P.close();
    }
    return { id: "W-D", title: "the tile is declared once, at the group (D4-D)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}
