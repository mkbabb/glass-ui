// gates.mjs — the SINGLE gate manifest (AS.W2, inv-θ / the F3 fix).
//
// Before AS.W2 three hand-curated "gate sets" disagreed: `proof:all` ran 6,
// `ci.yml` ran 11, `release.sh` ran 4 (zero proof:*). So a local `proof:all`
// went GREEN while CI was RED (the aggregate lied), and a tagged release
// re-checked no binding-correctness gate at all (surface/VT-name/phantom drift
// between the last CI run and the tag shipped unguarded). This module is the
// one manifest: every gate tagged `{local, ci, release}` (+ `sibling` where it
// walks a sibling checkout). The three aggregates are FILTERS over it:
//   - `proof:all`   → `node scripts/gates.mjs --run local`   (the local proof set)
//   - `release.sh`  → `node scripts/gates.mjs --run release`
//   - `ci.yml`      → keeps explicit per-step visibility, VERIFIED against the
//                     manifest by `--verify-ci` (drift fails closed).
//
// So local == ci == release is STRUCTURAL, not coincidental.

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";

/**
 * The manifest. `cmd` is the npm script; `tags` selects the aggregates it
 * belongs to; `sibling: true` means it walks a sibling checkout (so it is
 * skipped-by-policy when no sibling is present — never a hard failure on a
 * clean runner, per constellation.resolveSibling). `note` documents intent.
 */
export const GATES = [
    { id: "typecheck", cmd: "typecheck", tags: ["local", "ci", "release"] },
    { id: "test", cmd: "test", tags: ["local", "ci"], note: "release runs it via prepublishOnly" },
    { id: "build", cmd: "build", tags: ["local", "ci", "release"] },
    { id: "verify-export-types", cmd: "verify-export-types", tags: ["local", "ci", "release"] },
    { id: "profile:budget", cmd: "profile:budget", tags: ["local", "ci", "release"] },
    { id: "proof:package", cmd: "proof:package", tags: ["local", "ci", "release"], sibling: true, note: "keyframes peer" },
    { id: "proof:theme", cmd: "proof:theme", tags: ["local", "ci", "release"] },
    { id: "proof:components-css", cmd: "proof:components-css", tags: ["local", "ci", "release"] },
    { id: "proof:consumers:static", cmd: "proof:consumers:static", tags: ["local", "ci", "release"], sibling: true },
    { id: "proof:consumers:build", cmd: "proof:consumers:build", tags: ["local"], sibling: true, note: "walks sibling builds; local-only" },
    { id: "proof:runtime", cmd: "proof:runtime", tags: ["local"], sibling: true, note: "walks sibling builds; local-only" },
    { id: "proof:resolution", cmd: "proof:resolution", tags: ["local", "ci", "release"], sibling: true },
    { id: "proof:phantom-classes", cmd: "proof:phantom-classes", tags: ["local", "ci", "release"], sibling: true },
    { id: "proof:vt-names", cmd: "proof:vt-names", tags: ["local", "ci", "release"] },
    { id: "proof:dock-motion-parity", cmd: "proof:dock-motion-parity", tags: ["local", "ci", "release"], note: "AT.W6-dock-c — dock VT/FLIP timing-parity static gate" },
    { id: "proof:dock-opacity-lockstep", cmd: "proof:dock-opacity-lockstep", tags: ["local", "ci", "release"], note: "AU.W2 — dock fade↔morph opacity-lockstep (slides-F P0): the layer opacity transition rides the SAME --dock-motion-resize token as the container morph (0-frame settle, ≤1-frame bar)" },
    { id: "proof:doc-consistency", cmd: "proof:doc-consistency", tags: ["local", "ci", "release"], note: "AT.W7-dock-c — CLAUDE.md custom-dir + dependency citations resolve at HEAD (doc-rot guard)" },
    { id: "proof:au-w0-reground", cmd: "proof:au-w0-reground", tags: ["local", "ci"], note: "AU.W0 — formalize+re-ground meta-gate (AU.md/PROGRESS.md exist; 3 dock SHAs ancestor-reachable; zero bundle labels survive; W6-dock-b collision re-lettered)" },
    { id: "proof:au-w1-design", cmd: "proof:au-w1-design", tags: ["local", "ci"], note: "AU.W1 — design-slice meta-gate (3 slices cite AT.W1 origin + HEAD delta; the W1c registry enumerates the full AU gate fleet with greening waves)" },
    { id: "proof:strict-templates", cmd: "proof:strict-templates", tags: ["local", "ci"], note: "AU.W3 KEYSTONE — checkUnknownProps:true across the 3 tsconfigs; <GlassDock bogus-prop> is a RED typecheck (the silent-no-op closer); zero @ts-expect-error suppressions" },
    { id: "proof:peer-optional", cmd: "proof:peer-optional", tags: ["local", "ci", "release"], note: "AU.W3 — peer optionality is a derived fact of the root bundle (optional IFF absent from dist/glass-ui.js & not core-substrate); the dead optionalPeerDependencies field deleted" },
    { id: "proof:vueuse-free-root", cmd: "proof:vueuse-free-root", tags: ["local", "ci"], note: "AU.W3 — the root barrel transitively imports no @vueuse/core (SOURCE-graph walk from src/index.ts + DIST-floor grep of glass-ui.js)" },
    { id: "proof:supportsPostTask-wired", cmd: "proof:supportsPostTask-wired", tags: ["local", "ci"], note: "AU.W3 — supportsPostTask is WIRED (>=1 real caller) or DROPPED — no exported orphan (P3)" },
    { id: "proof:font-axes", cmd: "proof:font-axes", tags: ["local", "ci"], note: "AU.W4 — every variation axis typography.css references (WONK/SOFT) is carried by the shipped display @font-face (parsed from the woff2 fvar) — no silently-inert axis" },
    { id: "proof:color-acyclic", cmd: "proof:color-acyclic", tags: ["local", "ci", "release", "sibling"], note: "AU.W5 — the /color leaf graph is a DAG (imports value.js only, no component back-import; value.js/src never imports glass-ui)" },
    { id: "proof:single-color-core", cmd: "proof:single-color-core", tags: ["local", "ci"], note: "AU.W5 — ONE runtime-JS color source (value.js); no glass-ui src re-defines a value.js color primitive; CSS token tier exempt" },
    { id: "proof:frostShader-deleted", cmd: "proof:frostShader-deleted", tags: ["local", "ci"], note: "AU.W6 — the frostShader.ts orphan is DELETED (file-absence + import-graph, NOT a name-grep — the name form is born-green at HEAD)" },
    { id: "proof:lockfile", cmd: "proof:lockfile", tags: ["local", "ci", "release"], note: "registry-resolution drift guard" },
    { id: "audit:stash", cmd: "audit:stash", tags: ["ci"] },
];

/** The gate cmds tagged for a given aggregate, in manifest order. */
export function gatesFor(mode) {
    return GATES.filter((g) => g.tags.includes(mode));
}

/** Run a tagged subset sequentially; exit nonzero on the first failure. */
function runMode(mode) {
    const set = gatesFor(mode);
    if (!set.length) {
        console.error(`[gates] unknown mode '${mode}' (expected local|ci|release)`);
        process.exit(2);
    }
    console.log(`[gates] running '${mode}' set (${set.length} gates): ${set.map((g) => g.id).join(", ")}`);
    for (const g of set) {
        console.log(`\n[gates] ── ${g.id} ──`);
        try {
            execSync(`npm run ${g.cmd}`, { cwd: ROOT, stdio: "inherit" });
        } catch {
            console.error(`\n[gates] FAIL at '${g.id}' (mode '${mode}')`);
            process.exit(1);
        }
    }
    console.log(`\n[gates] '${mode}' set PASSED (${set.length} gates).`);
}

/**
 * Verify the ci.yml step set matches the manifest's ci-tagged set exactly —
 * so the explicit per-step YAML (kept for Actions-UI visibility) can never
 * silently drift from the manifest. Fails closed on any add/drop.
 */
function verifyCi() {
    const ciPath = resolve(ROOT, ".github/workflows/ci.yml");
    const yaml = readFileSync(ciPath, "utf8");
    const ciSteps = new Set(
        [...yaml.matchAll(/run:\s*npm run ([A-Za-z0-9:_-]+)/g)].map((m) => m[1]),
    );
    const expected = new Set(gatesFor("ci").map((g) => g.cmd));
    const missing = [...expected].filter((c) => !ciSteps.has(c));
    const extra = [...ciSteps].filter((c) => !expected.has(c) && GATES.some((g) => g.cmd === c));
    if (missing.length || extra.length) {
        console.error("[gates:verify-ci] ci.yml drifted from the gate manifest:");
        for (const c of missing) console.error(`  MISSING from ci.yml: ${c}`);
        for (const c of extra) console.error(`  EXTRA in ci.yml (not ci-tagged): ${c}`);
        process.exit(1);
    }
    console.log(`[gates:verify-ci] ci.yml matches the manifest ci set (${expected.size} gates).`);
}

const arg = process.argv[2];
if (arg === "--run") runMode(process.argv[3]);
else if (arg === "--verify-ci") verifyCi();
else if (arg === "--list") {
    const mode = process.argv[3] ?? "local";
    console.log(gatesFor(mode).map((g) => g.cmd).join("\n"));
} else {
    console.error("usage: gates.mjs --run <local|ci|release> | --verify-ci | --list <mode>");
    process.exit(2);
}
