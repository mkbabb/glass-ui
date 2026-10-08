#!/usr/bin/env node
// fixture-invariance.mjs · are two fixtures.mjs revisions byte-identical, page for page, outside the W-E family?
//   node fixture-invariance.mjs <old fixtures.mjs> <new fixtures.mjs>
// Renders fixturePage for every scene id (each SCENES entry, its -verbatim/-migrated/-stripped arms and the H3-11
// state arms) × every fault in the NEW FAULTS plus the clean page × flavours dist, src-dev, src × family "" and "e",
// with sel unset, 1 and none, and counts identical and differing pages per family.
import { pathToFileURL } from "node:url";
const [oldP, newP] = process.argv.slice(2);
const A = await import(pathToFileURL(oldP).href), B = await import(pathToFileURL(newP).href);
const { SCENES } = await import(pathToFileURL(newP.replace(/fixtures\.mjs$/, "scenes.mjs")).href);
const ids = ["__index"];
for (const s of SCENES) { ids.push(s.id); if (s.arms) for (const arm of ["-verbatim", "-migrated", "-verbatim-stripped", "-migrated-stripped", "-stripped"]) ids.push(s.id + arm); if (s.migratedArm) ids.push(s.id + "-migrated"); }
const faults = ["", ...Object.keys(B.FAULTS)];
const tally = {};
const diffs = [];
for (const family of ["", "e"]) for (const flavor of ["dist", "src-dev", "src"]) for (const fault of faults) for (const id of ids) for (const sel of [null, "1", "none"]) {
  const q = new URLSearchParams({ scene: id }); if (sel) q.set("sel", sel);
  const a = A.fixturePage(new URLSearchParams(q), fault, family, flavor), b = B.fixturePage(new URLSearchParams(q), fault, family, flavor);
  const k = family || "(none)"; tally[k] ??= { same: 0, differ: 0 };
  if (a === b) tally[k].same++; else { tally[k].differ++; if (diffs.length < 5) diffs.push(`family ${k} flavor ${flavor} fault ${fault || "clean"} scene ${id}`); }
}
console.log(JSON.stringify(tally));
for (const d of diffs) console.log(`differs: ${d}`);
