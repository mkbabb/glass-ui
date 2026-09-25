#!/usr/bin/env node
// classify.mjs — splits every RED clause of b-seal-on-g.mjs's result by the mechanism its lines
// show (which unit declaration each route keeps). Reads only the result file; computes nothing
// from a tree. Every bucket is a pattern over the gate's own line text, stated below.
//   node classify.mjs <result.json> <out.json>
import { readFileSync, writeFileSync } from "node:fs";

const [inp, out] = process.argv.slice(2);
const R = JSON.parse(readFileSync(inp, "utf8"));
const S = R.readings.self, P = R.readings.bpin;
const KERNEL = ["src/composables/", "src/styles/", "src/components/_shared/", "src/fonts/"];
const kern = (f) => KERNEL.some((k) => f.startsWith(k));
const zone = (f) => { const t = f.split("/")[0]; return ["src", "demo", "scripts", "tests", "tests-visual"].includes(t) ? t : "other"; };
const unitOf = (f) => /^src\/components\/([^/_][^/]*)\//.exec(f)?.[1] ?? null;
const tally = (lines, key) => { const m = {}; for (const l of lines) { const k = key(l); m[k] = (m[k] ?? 0) + 1; } return Object.fromEntries(Object.entries(m).sort((a, b) => b[1] - a[1])); };
const from = (l) => l.split(/[: ]/)[0];
const arrowTo = (l) => /-> (\S+)/.exec(l)?.[1] ?? "";

const c = {};
c.B0 = { meta: S.meta.b0, byZone: tally(S.V.B0, (l) => zone(from(l))), colocatedTests: S.V.B0.filter((l) => /\/__tests__\//.test(from(l))).length };
c.B1 = tally(S.V.B1, (l) => {
    if (l.includes("(own door)")) return "own door (a module member imports its own door)";
    const f = from(l), t = arrowTo(l);
    if (kern(t)) return kern(f) ? "kernel -> kernel module, past its door" : "unit/scripts -> kernel module, past its door";
    if (unitOf(t) && unitOf(f) === unitOf(t)) return "within one component unit, into a nested module past its door";
    if (unitOf(t)) return "into another component unit past its door";
    if (t.startsWith("scripts/")) return "scripts -> scripts module, past its door";
    return "other";
});
c.B2 = { byZone: tally(S.V.B2, (l) => zone(from(l))), byKind: tally(S.V.B2, (l) => /\[([a-z-]+)\]$/.exec(l)?.[1] ?? "?") };
c.B3 = tally(S.V.B3, (l) => `${from(l)} imports a unit sheet past the unit's index.css`);
c.B4 = S.V.B4.map((l) => l.slice(0, 120));
c.B5 = S.V.B5;
c.B6 = { dirs: S.V.B6.filter((l) => l.includes("direct files")).length, files: S.V.B6.filter((l) => l.includes(" lines > ")).length, filesByZone: tally(S.V.B6.filter((l) => l.includes(" lines > ")), (l) => zone(from(l))) };
c.B7 = tally(S.V.B7, (l) => {
    const d = l.split(" ")[0];
    if (l.includes("CSS-only door")) return "script code behind a CSS-only door";
    if (d.startsWith("scripts/")) return "scripts dir with no door";
    if (d.startsWith("src/components/_shared/")) return "_shared kernel module with no door";
    if (d.startsWith("src/composables/")) return "composables kernel module with no door";
    if (d.startsWith("src/styles/")) return "styles kernel module with no door";
    if (unitOf(d)) return "nested dir of a component unit with no door (G: eponymous root / base / carve module)";
    return "other";
});
c.B8 = tally(S.V.B8, (l) => `${/\/__tests__\//.test(from(l)) ? "colocated test" : "library file"} reads ${/the library reads the (\w[\w-]*)/.exec(l)?.[1]}`);
c.B9 = S.V.B9;
c.B10 = S.V.B10.map((l) => l.split(" readers")[0]);
c.B11self = tally(S.V.B11, (l) => l.split(" exports")[0]);
c.B11bpin = tally(P.V.B11, (l) => /\(not in the pin\)$/.test(l) ? (l.startsWith("module ") ? "module not in B's pin" : "door name not in B's pin") : /\(pinned, now gone\)$/.test(l) ? (l.startsWith("module ") ? "B's pinned module absent" : "B's pinned door name absent") : "structural (no outside reader / empty door)");
c.B14 = S.V.B14;
c.B16 = tally(S.V.B16, (l) => {
    if (l.includes("a helper in")) return "slot helper read from outside its slot";
    const slot = /colocated in (\S+);/.exec(l)?.[1];
    const home = /home is (.+)\)$/.exec(l)?.[1];
    if (!slot) return `in the harness; B homes it in a module (${home ? "subject in one module" : "?"})`;
    if (home?.startsWith("the harness")) return slot.startsWith("src/components/_shared") || slot.startsWith("src/composables") || slot.startsWith("src/styles") ? "colocated in a kernel dir; B: several units/container -> harness" : "colocated in a component unit; B: several units -> harness";
    if (home && slot.startsWith(`${home}/`)) return "colocated in a nested dir; B: home is the enclosing unit/module (the nested dir has no door, so it is no module)";
    return "colocated elsewhere";
});
const totals = { bpin: P.total, self: S.total, selfNoHolds: R.readings["self-noholds"].total, literal: R.readings.literal };
writeFileSync(out, `${JSON.stringify({ totals, counts: S.counts, classes: c }, null, 1)}\n`);
console.log(JSON.stringify({ totals, classes: c }, null, 1));
