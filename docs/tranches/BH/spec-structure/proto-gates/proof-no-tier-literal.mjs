#!/usr/bin/env node
// PROTOTYPE (BH round-3 spec-structure G7) — proof:no-tier-literal.
//
// STRUCTURE-SPEC §6 G7 + CODEMOD-SPEC §3. The atomic-migration STANDING witness:
// after the ui/custom flatten, NO file in the enforcement corpus (scripts/) may
// carry a dead-tier literal — a dangling reference into a tier (`components/ui`
// or `components/custom`) that no longer exists on disk.
//
//   born-RED  : ≥1 survivor on the pre-flatten tree            → exit 1
//   GREEN     : 0 survivors after the flatten codemod          → exit 0
//
// THE DETECTOR (CODEMOD-SPEC §3, verbatim) — slash / bare-segment-terminal /
// @glass-alias forms, with a lookahead that REJECTS a longer segment
// (`components/custom-hook`, `components/uikit`) so a legitimately-named peer
// never false-flags:
const TIER_RE = /(?:@glass\/)?components\/(ui|custom)(?=[/"'`)\s]|$)/g;
//
// TWO round-2/round-3 corrections are load-bearing here, BOTH closing a
// false-green class where a naive scan greens past a hidden literal:
//   (A) RECURSE scripts/ subdirs — 18 occurrences hide in
//       scripts/{aurora-profile,lib,fixtures}/ that a top-level `scripts/*.mjs`
//       glob would miss (round-2 correction).
//   (B) SCAN ALL TEXT FILES, not `.mjs` only — 16 occurrences hide in 7
//       `wf-*.js` workflow scripts + 1 `.vue` test fixture that a `.mjs`-only
//       filter would miss (round-3 finding; the codemod file-set MUST widen to
//       match — see findings).
//
// skip-self: the detector legitimately NAMES what it forbids (this docstring +
// its fixtures). It exempts exactly its OWN realpath when that path falls under
// the scanned dir — the standard house exemption. A future gate cannot hide a
// literal by renaming (only ONE file, by realpath, is exempt).

import { readdirSync, readFileSync, mkdtempSync, mkdirSync, writeFileSync, rmSync, realpathSync } from "node:fs";
import { resolve, relative, sep, join, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";

// Text extensions the enforcement corpus can carry a tier-literal in. NOT
// `.mjs` only (correction B). `.md`/`.json` in scripts/ carry none at HEAD, so
// this set is exactly the literal-bearing surface + its natural kin.
const TEXT_EXT = new Set([".mjs", ".js", ".cjs", ".mts", ".cts", ".ts", ".vue"]);

// ── The PURE detector over injected text (self-test feeds synthetic strings).
export function scanText(text) {
    const m = text.match(TIER_RE);
    return m ? m.length : 0;
}

// ── The recursive text-file walker (correction A). Skips node_modules + the
//    gate's own realpath (skip-self).
function walkTextFiles(dir, selfReal, acc = []) {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
        const full = resolve(dir, e.name);
        if (e.isDirectory()) {
            if (e.name === "node_modules" || e.name === ".git") continue;
            walkTextFiles(full, selfReal, acc);
        } else {
            const dot = e.name.lastIndexOf(".");
            const ext = dot >= 0 ? e.name.slice(dot) : "";
            if (!TEXT_EXT.has(ext)) continue;
            let real;
            try { real = realpathSync(full); } catch { real = full; }
            if (selfReal && real === selfReal) continue; // skip-self
            acc.push(full);
        }
    }
    return acc;
}

// ── Locate the repo root (walk up for package.json), then scripts/.
function resolveScriptsDir() {
    const arg = process.argv.find((a) => a.startsWith("--scripts="));
    if (arg) return resolve(arg.slice("--scripts=".length));
    let d = dirname(fileURLToPath(import.meta.url));
    for (let i = 0; i < 12; i++) {
        try {
            const cand = resolve(d, "scripts");
            readdirSync(cand);
            // prefer a scripts/ that holds gates.mjs (the enforcement corpus)
            const has = readdirSync(cand).includes("gates.mjs");
            if (has) return cand;
        } catch { /* keep walking */ }
        const up = dirname(d);
        if (up === d) break;
        d = up;
    }
    // fallback: main-tree scripts (proto convenience)
    return "/Users/mkbabb/Programming/glass-ui/scripts";
}

function scanDir(scriptsDir, selfReal) {
    const files = walkTextFiles(scriptsDir, selfReal);
    let survivors = 0;
    const byFile = [];
    const byExt = {};
    const bySub = {};
    for (const f of files) {
        let txt;
        try { txt = readFileSync(f, "utf8"); } catch { continue; }
        const n = scanText(txt);
        if (n) {
            survivors += n;
            const rel = relative(scriptsDir, f);
            const dot = f.lastIndexOf(".");
            const ext = f.slice(dot);
            const sub = rel.includes(sep) ? rel.split(sep)[0] : "(top)";
            byExt[ext] = (byExt[ext] || 0) + n;
            bySub[sub] = (bySub[sub] || 0) + n;
            byFile.push({ rel, n });
        }
    }
    return { survivors, files: byFile.length, scanned: files.length, byFile, byExt, bySub };
}

// ── The self-test: 7 string fixtures + the anti-evasion recursion + skip-self
//    bites (each builds + tears down its own temp fixture tree).
function selfTest() {
    const fails = [];
    const flag = (text, shouldFlag, name) => {
        const n = scanText(text);
        if (shouldFlag && n === 0) fails.push(`[SELF-TEST] expected FLAG, passed: ${name}`);
        if (!shouldFlag && n !== 0) fails.push(`[SELF-TEST] expected PASS, flagged: ${name}`);
    };
    // 1-4 FLAG: slash (custom), slash (ui), bare segment-terminal, @glass alias.
    flag(`import { GlassDock } from "../../src/components/custom/dock";`, true, "1 slash components/custom/");
    flag(`const UI = resolve(SRC, "components/ui/carousel");`, true, "2 slash components/ui/");
    flag(`const CUSTOM = resolve(SRC, "components/custom")`, true, "3 bare segment-terminal components/custom");
    flag(`export * from "@glass/components/custom/aurora";`, true, "4 @glass alias form");
    // 5-7 PASS: flat peer, merged reka home, longer-segment peer (the lookahead guard).
    flag(`const D = resolve(SRC, "components/dock");`, false, "5 flat peer components/dock");
    flag(`export * from "@glass/components/tabs/reka";`, false, "6 merged reka components/tabs/reka");
    flag(`import { useCustomHook } from "../components/custom-hook/index";`, false, "7 longer-segment components/custom-hook");

    // ── Anti-evasion bite: a PLANTED SUBDIR literal must be caught (proves
    //    recursion, correction A). Build a temp tree with the literal ONLY in a
    //    nested subdir file, assert it is found; then a clean tree → 0.
    const tmp = mkdtempSync(join(tmpdir(), "g7-antievasion-"));
    try {
        mkdirSync(join(tmp, "lib", "detect"), { recursive: true });
        writeFileSync(join(tmp, "top.mjs"), "// clean top-level file, no literal\n");
        // the planted literal, buried two subdirs deep, in a .js (not .mjs):
        writeFileSync(join(tmp, "lib", "detect", "buried.js"),
            'const p = "src/components/custom/dock/GlassDock.vue"; // planted\n');
        const dirty = scanDir(tmp, null);
        if (dirty.survivors < 1) fails.push("[SELF-TEST] anti-evasion: planted subdir .js literal NOT caught (recursion/ext hole)");
        if (!dirty.byFile.some((f) => f.rel.includes("detect"))) fails.push("[SELF-TEST] anti-evasion: literal not attributed to the nested subdir");
        // remove it → clean.
        rmSync(join(tmp, "lib", "detect", "buried.js"));
        const clean = scanDir(tmp, null);
        if (clean.survivors !== 0) fails.push("[SELF-TEST] anti-evasion: clean tree still flags (false-positive)");
    } finally {
        rmSync(tmp, { recursive: true, force: true });
    }

    // ── Skip-self bite: a copy of a detector (containing TIER_RE + fixtures) is
    //    exempted by realpath, while a SIBLING carrying a real literal is caught.
    const tmp2 = mkdtempSync(join(tmpdir(), "g7-skipself-"));
    try {
        const selfCopy = join(tmp2, "proof-no-tier-literal.mjs");
        // this copy legitimately names the tier in its regex + a fixture:
        writeFileSync(selfCopy, 'const RE = /components\\/(ui|custom)/g;\n// fixture: "components/custom/dock"\n');
        writeFileSync(join(tmp2, "other-gate.mjs"), 'const P = "src/components/ui/button/index.ts";\n');
        const real = realpathSync(selfCopy);
        const withSkip = scanDir(tmp2, real);
        if (withSkip.byFile.some((f) => f.rel === "proof-no-tier-literal.mjs"))
            fails.push("[SELF-TEST] skip-self: gate's own copy was NOT exempted");
        if (!withSkip.byFile.some((f) => f.rel === "other-gate.mjs"))
            fails.push("[SELF-TEST] skip-self: a SIBLING literal was wrongly exempted");
        const noSkip = scanDir(tmp2, null);
        if (noSkip.survivors <= withSkip.survivors)
            fails.push("[SELF-TEST] skip-self: exemption removed nothing (no-op)");
    } finally {
        rmSync(tmp2, { recursive: true, force: true });
    }
    return fails;
}

function run() {
    const scriptsDir = resolveScriptsDir();
    let selfReal;
    try { selfReal = realpathSync(fileURLToPath(import.meta.url)); } catch { selfReal = null; }
    const r = scanDir(scriptsDir, selfReal);
    const selfFails = selfTest();

    console.log("PROTO proof:no-tier-literal — G7 (dead-tier literal in the enforcement corpus)");
    console.log(`  scanned ${r.scanned} text files under ${scriptsDir} (recursive)`);
    console.log(`  survivors (dead-tier literals): ${r.survivors} across ${r.files} files`);
    console.log(`  by extension:`, JSON.stringify(r.byExt));
    console.log(`  by subdir:`, JSON.stringify(r.bySub));
    console.log(`  self-test bites: ${selfFails.length === 0 ? "9/9 handled ✓" : selfFails.length + " FAILED"}`);
    for (const f of selfFails) console.log(`    ${f}`);
    if (r.survivors && process.argv.includes("--list")) {
        console.log("  survivor files:");
        for (const f of r.byFile.sort((a, b) => b.n - a.n).slice(0, 20)) console.log(`    ✗ ${f.rel} (${f.n})`);
    }
    const ok = r.survivors === 0 && selfFails.length === 0;
    console.log(`\n  status: ${ok ? "PASS" : "FAIL"} (born-RED pre-flatten; GREEN when survivors==0)`);
    process.exit(ok ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) run();
