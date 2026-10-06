#!/usr/bin/env node
// D4-D′ prototype probe (copied from D4-Dp-spec/probes, unchanged in logic) · gestalt captures of the route's migrated arms beside the unmigrated ones (item 7, C-4: V1's
// 44 px tile at 16 px; the §7.3 gestalt read is the critic's, these are its inputs). One PNG per scene × mode × engine.
//   node capture.mjs --build <dir> --dir <out> [--engines chromium,webkit]
import fs from "node:fs";
import path from "node:path";
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load } from "../../../harness/lib.mjs";
const args = parseArgs();
const lock = await acquireLock("dp-proto-capture");
const target = await openTarget(args);
fs.mkdirSync(args.dir, { recursive: true });
console.log(`capture · ${target.label} · load ${load()}`);
for (const engine of String(args.engines ?? "chromium,webkit").split(","))
  for (const scene of ["preset-migrated", "preset-verbatim", "specimen-migrated", "strip-migrated", "strip-verbatim", "f1-migrated", "v2-migrated", "c1-migrated"])
    for (const mode of ["light", "dark"]) {
      const P = await openPage(target, engine, scene, { mode });
      await P.page.mouse.move(1, 1);
      const el = await P.page.$("[data-group]");
      const file = path.join(args.dir, `${scene}-${mode}-${engine}.png`);
      await el.screenshot({ path: file, scale: "css" });
      console.log(`  ${file}`);
      await P.close();
    }
await closeBrowsers(); await target.close(); lock.release(); process.exit(0);
