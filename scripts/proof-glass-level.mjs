// proof:glass-level — AX.W54: the --glass-level SCALAR gate (the level-seam gate).
//
// AY.W-GLASS — the prior `--one-model` G-1 cohesion arm was an 8-file regression
// canary; it is SUPERSEDED by the inventory-complete proof:glass-cohesion gate (the
// `--one-model` flag + the proof:glass-one-model package.json key are REMOVED, clean
// break). This gate keeps ONLY arm 1: the --glass-level scalar threads BOTH ladders at
// their ONE sites (level=1 byte-identical by construction; the opaque escape + the
// a11y brackets ride the ONE level path).
//
// Device-free SOURCE arm (always gates). The PAINTED render — the level=1 byte-
// identity + a mounted glass backdrop-filter being a real glass blur over its backdrop
// — is the W00 π live audit (the cardinal lesson: a source gate alone is the headless-
// green trap; the orchestrator drives the live readback + the DELTA capture).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
// AY.W-CSS1 — tokens.css/glass.css became thin @import roots over carved
// partials; readMonolith concatenates the root + partials in cascade order so a
// source-scan keeps finding every rule (the read-dock-css.mjs precedent).
import { readMonolith } from "./read-css-monoliths.mjs";

const COMMAND = "npm run proof:glass-level";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};
// strip CSS/JS + HTML/Vue comments so a prose mention (e.g. a comment naming the
// `bg-background` it replaced) is not a false hit
const strip = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

const tokens = readMonolith(ROOT, "tokens");
const tokensB = strip(tokens);
const glass = readMonolith(ROOT, "glass");
const glassB = strip(glass);

const checks = []; // {arm, id, pass, detail}
const add = (arm, id, pass, detail) => checks.push({ arm, id, pass: Boolean(pass), detail });

// ── ARM 1: the --glass-level scalar ───────────────────────────────────────────
add(
    "level",
    "property-registered",
    /@property\s+--glass-level\s*\{[^}]*syntax:\s*["']<number>["'][^}]*inherits:\s*true[^}]*initial-value:\s*1/s.test(
        tokensB,
    ),
    "@property --glass-level { syntax:<number>; inherits:true; initial-value:1 }",
);
// opacity seam: every --glass-bg-* rung threads the level inversion
const bgRungs = ["wash", "quiet", "resting", "floating", "overlay", "dock", "chassis"];
const opacityThreaded = bgRungs.every((r) => {
    const m = tokensB.match(new RegExp(`--glass-bg-${r}:[^;]*`));
    return m && /\(1 - \(1 - var\(--glass-opacity-[a-z]+\)\) \* var\(--glass-level\)\)/.test(m[0]);
});
add("level", "opacity-seam-threaded", opacityThreaded, "all 7 --glass-bg-* rungs invert through var(--glass-level)");
// blur seam: every --glass-blur-* token scales its radius by the level
const blurRungs = ["wash", "quiet", "resting", "floating", "overlay", "dock", "btn"];
const blurThreaded = blurRungs.every((r) => {
    const m = tokensB.match(new RegExp(`--glass-blur-${r}:[^;]*`));
    return m && /blur\(calc\(var\(--glass-blur-[a-z]+-radius\) \* var\(--glass-level\)\)\)/.test(m[0]);
});
add("level", "blur-seam-threaded", blurThreaded, "all 6 --glass-blur-* + --glass-blur-btn scale the radius by var(--glass-level)");
add(
    "level",
    "opaque-escape",
    /\.glass-opaque\s*\{[^}]*--glass-level:\s*0/s.test(glassB),
    ".glass-opaque { --glass-level: 0 }",
);
add(
    "level",
    "a11y-reduce-rides-level",
    /prefers-reduced-transparency:\s*reduce\)\s*\{[^}]*--glass-level:\s*0/s.test(glassB),
    "prefers-reduced-transparency: reduce → :root{ --glass-level: 0 }",
);
add(
    "level",
    "a11y-contrast-rides-level",
    /prefers-contrast:\s*more\)\s*\{[^}]*--glass-level:\s*0?\.\d/s.test(glassB),
    "prefers-contrast: more → :root{ --glass-level: <bounded> }",
);

// ── Report ────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);

console.log("proof:glass-level — the --glass-level SCALAR gate (AX.W54)");
console.log(`  [level] ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_GLASS_LEVEL_OUT", "AX-glass-level");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:glass-level",
    command: COMMAND,
    checks: checks.map((c) => ({ arm: c.arm, id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:glass-level] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.arm}/${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(`\n[proof:glass-level] glass-level scalar locked — one knob threads both ladders.`);
