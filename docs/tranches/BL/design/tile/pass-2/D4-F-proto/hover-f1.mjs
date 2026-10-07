#!/usr/bin/env node
// D4-F-proto/hover-f1.mjs · why T-6's hover light reads 0.70 % on f1-migrated in Chromium and 73.62 % in Playwright
// WebKit: the hovered item's computed plate (background-image, background-color, the plate token) at rest and on
// :hover, per engine, for f1-migrated, preset-migrated and specimen-migrated.
//   node hover-f1.mjs --build <out>/builds/f-src
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load } from "../../harness/lib.mjs";
import { hoverLight, unselectedIdx } from "../../harness/measure.mjs";
const args = parseArgs(); const lock = await acquireLock("d4f-proto-hover-f1"); const target = await openTarget(args);
console.log(`hover-f1 · ${target.label} · load ${load()}`);
for (const engine of ["chromium", "webkit"]) for (const scene of ["f1-migrated", "preset-migrated", "specimen-migrated"]) {
  const P = await openPage(target, engine, scene); const u = await unselectedIdx(P);
  const read = () => P.page.evaluate((u) => { const e = document.querySelector(`[data-th-idx="${u}"]`), cs = getComputedStyle(e), r = e.getBoundingClientRect();
    return { hover: e.matches(":hover"), bgi: cs.backgroundImage.slice(0, 160), bgc: cs.backgroundColor, plate: cs.getPropertyValue("--glass-defined-plate").trim().slice(0, 90), box: `${r.x.toFixed(0)},${r.y.toFixed(0)} ${r.width.toFixed(0)}×${r.height.toFixed(0)}`, top: (() => { const t = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return t ? `${t.tagName.toLowerCase()}.${[...t.classList].slice(0, 2).join(".")}` : null; })() }; }, u);
  const rest = await read(); const r = await P.page.evaluate((u) => window.__th.rect(document.querySelector(`[data-th-idx="${u}"]`)), u);
  await P.page.mouse.move(r.x + r.w / 2, r.y + r.h / 2); await P.page.waitForTimeout(600); const hov = await read(); await P.page.mouse.move(2, 2); await P.page.waitForTimeout(300);
  const hl = await hoverLight(P, u);
  console.log(`${engine} ${scene} #${u} box ${rest.box} · element at centre ${rest.top}\n  rest  hover=${rest.hover} bgc ${rest.bgc} plate ${rest.plate}\n        bgi ${rest.bgi}\n  hover hover=${hov.hover} bgc ${hov.bgc} plate ${hov.plate}\n        bgi ${hov.bgi}\n  hoverLight ${hl.changedPct.toFixed(2)} %`);
  await P.close();
}
console.log(`load ${load()} at end`); await closeBrowsers(); await target.close(); lock.release(); process.exit(0);
