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
    {
        id: "proof:animation-coherence",
        cmd: "proof:animation-coherence",
        tags: ["local", "ci"],
        sibling: true,
        note: "AX.W05 — ONE iOS-spring vocabulary. (A) survivor sweep: zero --ease-apple-spring/--motion-ease-apple-spring def-or-consumer under src/ (deletion-proof, comment-stripped). (B) consumer-coverage (fail-closed): every defined --spring-* token reaches >=1 consumer (direct var() OR --ease-spring-* alias) — the generator cannot mint a dead token. (C) governed rationale: every regen PRESETS row names a surface-class register in its comment. Plus the cross-repo CONSTELLATION CENSUS (publish-gated forcing function): a consumer reading var(--ease-apple-spring) with no local def is RED-pending-W34 (sibling skip when absent). Bite: re-add an apple-spring read in src/ → survivor RED; mint a consumer-less --spring-X → coverage RED; strip a register: segment → rationale RED.",
    },
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
