#!/usr/bin/env node
// T-8 · Both engines (D-4): T-1 (the corner) and T-3 (the selected state, light, dark, PRT) re-run on every
// T-8 scene in Chromium and in Playwright WebKit; PASS when every measured cell passes in both. Playwright
// WebKit is not Safari: WebKit cannot emulate prefers-reduced-transparency, so its PRT cell takes the forced
// level-0 path, and the real-Safari cell stays UNMEASURED (owner's safaridriver checkbox).
//   node t8-both-engines.mjs --build <dir> | --fixture [--fault t8]
import { cli, sceneList, scenesFor, engineVersion, ENGINE_LABEL, SAFARI_CELL } from "./lib.mjs";
import { t1Cells } from "./t1-corner-stops.mjs";
import { t3Cells, T3_MODES } from "./t3-selected-separates.mjs";

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("T-8", async (args, target) => {
    const cells = [];
    const labels = [];
    for (const engine of ["chromium", "webkit"]) {
      labels.push(await engineVersion(engine));
      const scenes = scenesFor(await sceneList(target, engine), "T-8", { info: false });
      for (const c of await t1Cells(target, engine, scenes)) cells.push({ ...c, line: `${ENGINE_LABEL[engine]} T-1 ${c.line}` });
      for (const c of await t3Cells(target, engine, scenes, { modes: T3_MODES })) cells.push({ ...c, line: `${ENGINE_LABEL[engine]} T-3 ${c.line}` });
    }
    cells.push({ gating: true, pass: null, line: SAFARI_CELL });
    return { id: "T-8", title: "T-1 and T-3 hold in both engines", engine: "both", engineLabel: labels.join(" + "), target: target.label, dev: target.meta.dev, cells };
  });
}
