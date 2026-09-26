#!/usr/bin/env node
// T-8 · Both engines (D-4): T-1 (the corner: fine, coarse, --ui-scale; H-1) and T-3 (the selected state, light,
// dark, PRT) re-run on every T-8 scene in Chromium and in Playwright WebKit; PASS when every measured cell passes
// in both. Playwright WebKit is not Safari: WebKit cannot emulate prefers-reduced-transparency, so its PRT cell
// takes the forced level-0 path. The real-Safari cell runs through safari.mjs (H-11): UNMEASURED (owner's
// safaridriver checkbox) until the owner enables remote automation, measured once it is.
//   node t8-both-engines.mjs --build <dir> | --fixture [--fault t8]
import { cli, sceneList, scenesFor, engineVersion, ENGINE_LABEL } from "./lib.mjs";
import { t1Cells } from "./t1-corner-stops.mjs";
import { t3Cells, T3_MODES } from "./t3-selected-separates.mjs";
import { safariCells } from "./safari.mjs";

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("T-8", async (args, target) => {
    const cells = [];
    const labels = [];
    let scenes = [];
    for (const engine of ["chromium", "webkit"]) {
      labels.push(await engineVersion(engine));
      scenes = scenesFor(await sceneList(target, engine), "T-8", { info: false, arms: false });
      for (const c of await t1Cells(target, engine, scenes)) cells.push({ ...c, line: `${ENGINE_LABEL[engine]} T-1 ${c.line}` });
      for (const c of await t3Cells(target, engine, scenes, { modes: T3_MODES, fill: false })) cells.push({ ...c, line: `${ENGINE_LABEL[engine]} T-3 ${c.line}` });
    }
    cells.push(...(await safariCells(target, scenes)));
    return { id: "T-8", title: "T-1 and T-3 hold in both engines (and in real Safari once enabled)", engine: "both", engineLabel: labels.join(" + "), target: target.label, dev: target.meta.dev, cells };
  });
}
