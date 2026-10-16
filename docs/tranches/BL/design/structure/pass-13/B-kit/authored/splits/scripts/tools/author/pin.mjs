#!/usr/bin/env node
// pin.mjs — derive the seal pin rows 01-03 need (B11: the pin names every module and every
// door's names). The pin is written by the gate itself (`seal.mjs --write-pin`), then
// compared with the pin the tree held: the only change allowed is the three scripts modules
// (any of them the tree now holds) and their doors. Anything else stops before the pin is
// written. It runs after each split script, so each row carries its own pin lines.
//
//   node pin.mjs --root <tree after a split script>
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { isDeepStrictEqual } from "node:util";
import { join } from "node:path";
import { rootArg } from "./lib.mjs";

const root = rootArg();
if (!existsSync(join(root, "scripts/structure/seal/seal.mjs"))) {
    console.log("pin: this tree has no seal gate (the floor alone, arm F); no pin to write");
    process.exit(0);
}
const PIN = "scripts/structure/records/seal-pin.json";
const OURS = ["scripts/bundle-checks", "scripts/comments", "scripts/package-verify"];
const dir = mkdtempSync(join(tmpdir(), "split-scripts-pin-"));
const out = join(dir, "pin.json");
try {
    try {
        execFileSync("node", ["scripts/structure/seal/seal.mjs", "--root", root, "--write-pin", out], { cwd: root, stdio: "ignore" });
    } catch (error) {
        if (error.status !== 1) throw error; // exit 1 is a red gate (B0/B2/B6 on the route's tree); the pin is still written
    }
    const was = JSON.parse(readFileSync(join(root, PIN), "utf8"));
    const now = JSON.parse(readFileSync(out, "utf8"));
    const stop = [];
    const added = now.modules.filter((m) => !was.modules.includes(m));
    const gone = was.modules.filter((m) => !now.modules.includes(m));
    if (gone.length) stop.push(`modules gone: ${gone.join(", ")}`);
    if (!added.length || added.some((m) => !OURS.includes(m))) stop.push(`modules added: ${added.join(", ") || "none"} (expected some of ${OURS.join(", ")})`);
    for (const d of new Set([...Object.keys(was.doors), ...Object.keys(now.doors)])) {
        const ours = added.some((m) => d === `${m}/index.mjs`);
        if (ours ? d in was.doors : !isDeepStrictEqual(was.doors[d], now.doors[d])) stop.push(`door ${d} changed`);
    }
    for (const k of ["names", "holds"]) if (!isDeepStrictEqual(was[k], now[k])) stop.push(`pin ${k} changed`);
    if (stop.length) throw new Error(`pin.mjs: stopped\n  ${stop.join("\n  ")}`);
    writeFileSync(join(root, PIN), readFileSync(out, "utf8"));
    console.log(`pin: +${added.length} module(s) (${added.join(", ")}) and their doors`);
} finally {
    rmSync(dir, { recursive: true, force: true });
}
