#!/usr/bin/env node
// wk-plants.mjs · D3 pass 8, the owed-WebKit seat: the banked plant sets (pass-4/FV3-plants.mjs, pass-3/FV2-plants.mjs)
// captured in Playwright WebKit only. Those scripts take no --engines flag: a variant with no `engines` captures through
// capture.mjs's default, lib.mjs's ENGINES array. This wrapper narrows that one shared array to ["webkit"] before the
// plant script loads, so the Chromium half (read by FV6 §5.4 on byte-identical specimens) is not re-captured inside the
// one machine-wide WebKit lock. The variant tables are not copied (P-3): the plant script runs its own CLI on import,
// with this process's argv.
//   WK_PLANTS=FV3|FV2 node wk-plants.mjs <dist> <worktree> --only id,id --out <dir>
import { ENGINES } from "../harness/lib.mjs";

ENGINES.splice(0, ENGINES.length, "webkit");
const which = process.env.WK_PLANTS;
if (which !== "FV3" && which !== "FV2") { console.error("WK_PLANTS must be FV3 or FV2"); process.exit(2); }
console.log(`wk-plants: ${which}, engines ${JSON.stringify(ENGINES)}`);
await import(which === "FV3" ? "../pass-4/FV3-plants.mjs" : "../pass-3/FV2-plants.mjs");
