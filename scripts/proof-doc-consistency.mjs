#!/usr/bin/env node
// AT.W7-dock-c — the ι doc-rot sweep gate (proof:doc-consistency).
// RE-HOMED off CLAUDE.md onto the canon homes (BH.B5c). The binding map of the
// source tree moved to the GENERATED `docs/canon/structure.md` (the dir arm) and the
// dependency surface to `docs/canon/dependencies.md`'s markdown table (the dep arm) —
// so when the tree moves but a doc doesn't, the map silently rots exactly as before,
// but the home is a live canon doc, not the deleted CLAUDE.md. The RELEASE-tagged
// bare readFileSync crash (the ENOENT-mid-`--run full` `git tag` abort) is gone:
// readCanon(…, "strict") THROWS a NAMED "home is ABSENT" error only if the canon home
// itself is missing (a clean loud RED via the resolver, never a raw stack).
//
// The two binding citation classes still RESOLVE at HEAD:
//
//   DIRS — every `custom/<dir>` the structure.md enumeration lists resolves to a real
//          `src/components/custom/<dir>/` directory (structure.md is regen-derived from
//          disk by proof:claude-structure-sync, so a hand-edited phantom dir REDs here
//          + the regen-freshness gate reds the drift).
//   DEPS — every package the `docs/canon/dependencies.md` table names resolves to a key
//          in package.json's `dependencies` / `peerDependencies` (the citedDeps table
//          parser is the canon-doc.mjs seam — ONE parser, fold-obligation 1).
//
// House style: ESM .mjs, CLI paths LAZY + memoized, a byte-stable JSON artefact, a
// human summary, process.exit(1) on any violation (fail-closed).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readCanon, canonDocRel, citedDeps } from "./lib/canon-doc.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        PACKAGE_JSON: resolve(ROOT, "package.json"),
        CUSTOM_DIR: resolve(ROOT, "src/components/custom"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_DOC_CONSISTENCY_ARTIFACT",
            "AT-doc-consistency",
        ),
    };
    return _cliPaths;
}

// ---------------------------------------------------------------------------
// CITATION PARSERS — pure, FS-free.
// ---------------------------------------------------------------------------

// The GENERATED structure.md custom/ enumeration is a `## src/components/custom (N
// dirs)` header followed by `- <name>/` bullets (regen-structure.mjs). Parse the
// custom section's bullet dir names (trailing slash = directory).
export function citedCustomDirs(structureMd) {
    const dirs = new Set();
    const lines = structureMd.split("\n");
    let inCustom = false;
    for (const line of lines) {
        if (/^##\s+src\/components\/custom\b/.test(line)) {
            inCustom = true;
            continue;
        }
        if (inCustom && /^##\s+/.test(line)) break; // next section closes the block
        if (!inCustom) continue;
        const m = line.match(/^\s*-\s+([a-z0-9][a-z0-9-]*)\/\s*$/);
        if (m) dirs.add(m[1]);
    }
    return dirs;
}

// ---------------------------------------------------------------------------
// The pure detector. Takes the structure.md + dependencies.md + package.json text +
// a `dirExists(name)` resolver, returns { facts, violations }. FS-injected for the spec.
// ---------------------------------------------------------------------------
export function detectConsistency({ structureMd, dependenciesMd, packageJson, dirExists }) {
    const violations = [];
    const pkg = typeof packageJson === "string" ? JSON.parse(packageJson) : packageJson;
    const declaredDeps = new Set([
        ...Object.keys(pkg.dependencies ?? {}),
        ...Object.keys(pkg.peerDependencies ?? {}),
    ]);

    const dirs = [...citedCustomDirs(structureMd)].sort();
    const deps = citedDeps(dependenciesMd).map((d) => d.pkg).sort();

    const facts = { citedDirs: dirs, citedDeps: deps };

    // DIRS — every structure.md `custom/<dir>` resolves to a real directory at HEAD.
    for (const dir of dirs) {
        if (!dirExists(dir)) {
            violations.push(
                `docs/canon/structure.md lists \`custom/${dir}/\` but src/components/custom/${dir}/ does not exist at HEAD — dangling directory citation (doc-rot). Re-generate structure.md (node scripts/regen-structure.mjs --write) or restore the directory.`,
            );
        }
    }

    // DEPS — every package the dependencies.md table names is a real declared dep.
    for (const dep of deps) {
        if (!declaredDeps.has(dep)) {
            violations.push(
                `docs/canon/dependencies.md's table cites \`${dep}\` but package.json declares no such dependency/peerDependency at HEAD — reference rot. Correct the package name or update package.json.`,
            );
        }
    }

    return { facts, violations };
}

// FS-free convenience for the spec.
export function detectSource({ structureMd, dependenciesMd, packageJson, existingDirs }) {
    const dirSet = new Set(existingDirs ?? []);
    return detectConsistency({
        structureMd,
        dependenciesMd,
        packageJson,
        dirExists: (d) => dirSet.has(d),
    });
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------
function run() {
    const { ROOT, PACKAGE_JSON, CUSTOM_DIR, ARTIFACT } = cliPaths();

    // readCanon(…, "strict") THROWS a NAMED "home is ABSENT" error if the canon home
    // is missing — a clean loud RED via the resolver, never a raw ENOENT stack trace.
    let structureMd;
    let dependenciesMd;
    try {
        structureMd = readCanon("structure", "strict");
        dependenciesMd = readCanon("dependencies", "strict");
    } catch (e) {
        console.error(`proof:doc-consistency — a canon home is absent: ${String(e?.message ?? e)}`);
        console.error(
            `  (re-home the contract at ${canonDocRel("structure")} / ${canonDocRel("dependencies")} before running this gate)`,
        );
        process.exit(1);
    }
    const packageJson = readFileSync(PACKAGE_JSON, "utf8");

    const { facts, violations } = detectConsistency({
        structureMd,
        dependenciesMd,
        packageJson,
        dirExists: (dir) => existsSync(resolve(CUSTOM_DIR, dir)),
    });

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:doc-consistency",
        facts,
        violations,
    });

    console.log("proof:doc-consistency — canon structure.md custom-dir + dependencies.md citation gate (AT.W7-dock-c, BH.B5c re-home)");
    console.log(`  cited custom/<dir> : ${facts.citedDirs.length}`);
    console.log(`  cited deps         : ${facts.citedDeps.length}`);
    if (violations.length > 0) {
        console.log("");
        console.log("VIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log("");
    console.log(`  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);

    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
