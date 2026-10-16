#!/usr/bin/env node
// crit-level-diag.mjs · D4-D′ pass-4 CRITIC diagnostic for crit-level's `item-none-in-tile` cell: what the item-level
// write changes inside a declared tile. Reads every descendant of preset-migrated's item 0 (tag, class, display, box)
// before and after `--selection-tile: none` is written inline on the item, and prints the ones that changed.
//   node crit-level-diag.mjs --build <dir> [--engine chromium|webkit] [--out <dir>]
import { cli, openPage, engineVersion, engineOf, f2 } from "../../../harness/lib.mjs";

const SNAP = () => [...document.querySelector("[data-scene] [data-item]").querySelectorAll("*")].map((e) => {
  const r = e.getBoundingClientRect(), cs = getComputedStyle(e);
  return { tag: e.tagName.toLowerCase(), cls: (e.getAttribute("class") ?? "").slice(0, 40), display: cs.display, w: r.width, h: r.height, x: r.x, y: r.y };
});

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("CRIT-LEVEL-DIAG", async (args, target) => {
    const engine = engineOf(args);
    const cells = [];
    const P = await openPage(target, engine, "preset-migrated", { mode: "light", query: { sel: "0" } });
    try {
      await P.page.evaluate(() => window.__th.frame());
      const before = await P.page.evaluate(SNAP);
      const h0 = await P.page.evaluate(() => document.querySelector("[data-scene] [data-item]").getBoundingClientRect().height);
      await P.page.evaluate(() => document.querySelector("[data-scene] [data-item]").style.setProperty("--selection-tile", "none"));
      await P.page.waitForTimeout(400);
      const after = await P.page.evaluate(SNAP);
      const h1 = await P.page.evaluate(() => document.querySelector("[data-scene] [data-item]").getBoundingClientRect().height);
      const changed = before.map((b, i) => [b, after[i]]).filter(([b, a]) => b.display !== a.display || Math.abs(b.h - a.h) > 0.5 || Math.abs(b.w - a.w) > 0.5 || Math.abs(b.y - a.y) > 0.5);
      cells.push({ gating: true, pass: changed.length === 0, line: `item 0 ${f2(h0)} → ${f2(h1)} px tall · ${changed.length} of ${before.length} descendants changed` });
      for (const [b, a] of changed) cells.push({ gating: false, pass: null, line: `  <${b.tag} class="${b.cls}"> display ${b.display} → ${a.display} · ${f2(b.w)}×${f2(b.h)} at y ${f2(b.y)} → ${f2(a.w)}×${f2(a.h)} at y ${f2(a.y)}` });
    } finally { await P.close(); }
    return { id: "CRIT-LEVEL-DIAG", title: "what an item-level `--selection-tile: none` changes inside a declared tile (critic diagnostic)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}
