#!/usr/bin/env node
// D4 pass 10 · CRITIC diagnostic: CRIT10-CARRIER read a selected pill's fill EQUAL to its rest fill under PRT
// (prefers-reduced-transparency: the harness's `prt` mode), 1.00:1, where light and dark read 1.20-1.21:1. Is the tint
// not painted, or painted under something? Per mode (light, dark, prt) on `single`: pill 1 selected by click; its
// computed background-color, background-image, the ::before (perimeter) opacity and border colour, the computed
// `--selection-paint`, `--selection-perimeter`, `--glass-level`, and the rest pill 0's background-color. Info only.
//   node crit10-prt-tint.mjs --build <route build> [--engine webkit] [--out <dir>]
import { cli, openPage, engineVersion, engineOf } from "../../../harness/lib.mjs";

await cli("CRIT10-PRT-TINT", async (args, target) => {
  const engine = engineOf(args), cells = [];
  for (const mode of ["light", "dark", "prt"]) {
    const P = await openPage(target, engine, "single", { mode, query: { sel: "none" } });
    let r = null;
    try {
      const { page } = P, loc = page.locator("[data-scene] [data-item]");
      await loc.nth(1).click(); await page.mouse.move(2, 2); await page.evaluate(() => document.activeElement?.blur?.()); await page.waitForTimeout(900);
      r = await page.evaluate(() => {
        const [a, b] = [...document.querySelectorAll("[data-scene] [data-item]")].slice(0, 2), cb = getComputedStyle(b), ca = getComputedStyle(a), pb = getComputedStyle(b, "::before");
        const v = (c, n) => c.getPropertyValue(n).trim();
        return { on: b.dataset.state, bgOn: cb.backgroundColor, imgOn: cb.backgroundImage.slice(0, 120), bgRest: ca.backgroundColor, imgRest: ca.backgroundImage.slice(0, 120), before: `${pb.opacity} ${pb.borderTopColor} ${pb.borderTopWidth}`, paint: v(cb, "--selection-paint"), perim: v(cb, "--selection-perimeter"), level: v(cb, "--glass-level"), cls: b.className };
      });
    } finally { await P.close(); }
    cells.push({ gating: false, pass: true, line: `single ${P.modeLabel}${P.modeOk ? "" : " (MODE NOT APPLIED)"} · pill 1 ${r.on} · bg ${r.bgOn} · image ${r.imgOn} · ::before ${r.before} · --selection-paint ${r.paint} · --selection-perimeter «${r.perim}» · --glass-level «${r.level}» · rest pill 0 bg ${r.bgRest} image ${r.imgRest} · class ${r.cls}` });
  }
  return { id: "CRIT10-PRT-TINT", title: "why a selected pill reads no tint under PRT (pass-10 critic diagnostic, info)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
});
