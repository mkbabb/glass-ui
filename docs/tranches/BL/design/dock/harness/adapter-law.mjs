// adapter-law.mjs · H-6, the adapter law, as a check.
//
//   node adapter-law.mjs [<adapter.mjs> …]      (default: adapter-head.mjs)
//
// An adapter reads DOM and pixels. It never derives a reading from the family's own
// inputs and never pre-clips. Each route's adapter is (1) linted here and (2) diffed
// against adapter-head.mjs, and the critic reviews the diff before any run. The lint is
// static, so it is engine-independent; the runtime half of the law is W1 `agree` (the
// painted silhouette IS extent()) and W3 `faces` (read from pixels, never paintingSeats()).
//
// RULES (each a FAIL line naming the read):
//   L-1 extent() and paintingSeats() read no custom property (getPropertyValue("--…"), var(--…))
//   L-2 paintingSeats() never refers to extent() or plate() (no pre-clip)
//   L-3 the probe source writes nothing into the page (no setProperty, setAttribute, classList
//       edits, style assignment, appendChild outside the tokenMs probe element)
//   L-4 webkitShim, when present, sets colours only (the harness-only crash aid, S-2): every
//       declaration is a *-color or border-color, never geometry or motion
//   L-5 the contract is complete: root plate axis extent seats paintingSeats morphing rung
//       posture budget rim compact badge
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { HERE } from "./lib.mjs";

const files = process.argv.slice(2).filter((a) => !a.startsWith("--"));
if (!files.length) files.push(path.join(HERE, "adapter-head.mjs"));
const READS = ["root", "plate", "axis", "extent", "seats", "paintingSeats", "morphing", "rung", "posture", "budget", "rim", "compact", "badge"];
/** The body of one `name: (...) => …,` member of the probe object literal (to the next member). */
function member(src, name) {
    const re = new RegExp(`\\n\\s*${name}:\\s*`);
    const m = re.exec(src); if (!m) return null;
    const rest = src.slice(m.index + m[0].length);
    const next = /\n\s{4}[a-zA-Z]+:\s*(\(|[a-zA-Z])/.exec(rest);
    return next ? rest.slice(0, next.index) : rest;
}
let bad = 0;
for (const f of files) {
    const mod = await import(pathToFileURL(path.resolve(f)).href);
    const src = mod.source ?? "";
    const fails = [];
    for (const k of ["extent", "paintingSeats"]) { const b = member(src, k) ?? ""; if (/getPropertyValue\(\s*["']--|var\(--/.test(b)) fails.push(`L-1 ${k}() reads a custom property`); }
    const ps = member(src, "paintingSeats") ?? "";
    if (/\bextent\(|\bplate\(/.test(ps)) fails.push("L-2 paintingSeats() refers to extent()/plate() (a pre-clip)");
    const writes = src.replace(/const d = document\.createElement\("div"\);[\s\S]*?d\.remove\(\);/g, "");
    if (/\.setProperty\(|\.setAttribute\(|classList\.(add|remove|toggle)|\.style\.[a-zA-Z]+\s*=|\.appendChild\(|\.append\(/.test(writes)) fails.push("L-3 the probe writes into the page");
    if (mod.webkitShim) { const decls = mod.webkitShim.replace(/[^{]*\{([^}]*)\}/g, "$1;").split(";").map((d) => d.trim()).filter(Boolean); const geo = decls.filter((d) => !/^[a-z-]*color\s*:/.test(d.split(":")[0] + ":")); if (geo.length) fails.push(`L-4 webkitShim sets more than colour: ${geo.join("; ")}`); }
    const missing = READS.filter((k) => member(src, k) == null); if (missing.length) fails.push(`L-5 the contract lacks ${missing.join(", ")}`);
    let diff = "";
    const head = path.join(HERE, "adapter-head.mjs");
    if (path.resolve(f) !== head) { try { execFileSync("diff", ["-u", head, path.resolve(f)]); diff = "(identical to adapter-head.mjs)"; } catch (e) { diff = String(e.stdout ?? ""); } }
    console.log(`${fails.length ? "FAIL" : "PASS"}  adapter-law  ${path.relative(process.cwd(), path.resolve(f))}  ${fails.length ? fails.join(" · ") : "L-1..L-5 hold"}`);
    if (diff && process.argv.includes("--diff")) console.log(diff);
    else if (diff) console.log(`      diff against adapter-head.mjs: ${diff.split("\n").filter((l) => /^[+-][^+-]/.test(l)).length} changed line(s) (--diff prints them for the critic)`);
    if (fails.length) bad++;
}
process.exitCode = bad ? 1 : 0;
