#!/usr/bin/env node
// D4-D′ critic probe · the paint read behind a canon-test evasion: on a planted build, the used corner of the
// first migrated tile against the root's --radius-field (T-1's bound for a tile). A direct read, not the witness.
//   node plant-corner.mjs --build <out>/builds/<plant> --scenes specimen-migrated,preset-migrated
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load } from "../../../harness/lib.mjs";
const args = parseArgs();
const lock = await acquireLock("dp-crit-plant-corner");
const target = await openTarget(args);
for (const scene of String(args.scenes).split(",")) {
  const P = await openPage(target, "chromium", scene, { mode: "light" });
  const r = await P.page.evaluate(() => { const th = window.__th; const it = th.items()[0]; const c = th.corner(it); return { w: c.w, h: c.h, computed: c.computed, used: c.used, field: th.resolve(document.body, "--radius-field") }; });
  const ok = Math.abs(r.used - parseFloat(r.field)) < 0.5;
  console.log(`  ${ok ? "PASS" : "FAIL"} chromium ${target.label} ${scene} · ${r.w.toFixed(2)}×${r.h.toFixed(2)} ${r.computed}→${r.used.toFixed(2)} · bound root --radius-field = ${r.field} · load ${load()}`);
  await P.close();
}
await closeBrowsers(); await target.close(); lock.release(); process.exit(0);
