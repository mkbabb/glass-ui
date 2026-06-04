#!/usr/bin/env node
// AT.W7-dock-c — the ι doc-rot sweep gate (proof:doc-consistency).
//
// CLAUDE.md is the repo's binding map of the source tree + the dependency
// surface. When the tree moves but the doc doesn't, the map silently rots: a
// reader (or an agent) cites `custom/dock-group/` or imports `lucide-vue-next`
// and finds nothing there. The W0b-B6 dock audit caught exactly this drift:
//
//   - `custom/dock-group/` is cited in CLAUDE.md's Structure tree (+ the
//     `dock-group.css` styles row + the `@mkbabb/glass-ui/dock-group` subpath
//     prose) but the directory, the stylesheet, and the subpath export were all
//     REMOVED at HEAD — a dangling citation.
//   - `custom/sidebar/` (+ the cited `custom/sidebar/types.ts`) likewise no
//     longer exists; the sidebar component dir relocated, the types live under
//     `composables/sidebar/`.
//   - the Dependencies table cites `lucide-vue-next ^0.525`, but the real peer
//     is `@lucide/vue ^1.16.0` (the renamed v1 package every SFC imports) — a
//     reference-rot the icon import `import … from "@lucide/vue"` proves.
//
// This gate makes CLAUDE.md's two binding citation classes RESOLVE at HEAD:
//
//   DIRS — every `custom/<dir>` directory CLAUDE.md cites resolves to a real
//          `src/components/custom/<dir>/` directory.
//   DEPS — every package the CLAUDE.md "## Dependencies" table names resolves to
//          a key in package.json's `dependencies` / `peerDependencies`.
//
// Scope is DELIBERATELY these two binding-correctness classes (the W7-dock-c
// spec). A subpath-prose sweep was tried and dropped: CLAUDE.md legitimately
// NAMES retired subpaths (`/pagination`, `/virtual`) in their retirement notes
// and carries `node_modules/@mkbabb/glass-ui/dist` path fragments — neither is
// rot, so a blanket subpath-resolves check produced false witnesses. The
// `dock-group` subpath prose is covered by the DIRS check (its `custom/`
// directory citation) without a separate, noisier subpath rule.
//
// House style mirrors scripts/proof-vt-names.mjs + proof-dock-motion-parity.mjs:
// ESM .mjs, the CLI paths resolve LAZILY + memoized (so importing the module for
// its exported pure detectors under vitest never runs FS/url side effects), a
// byte-stable JSON artefact via gate-output, a human summary, process.exit(1) on
// any violation (fail-closed).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        CLAUDE_MD: resolve(ROOT, "CLAUDE.md"),
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
// CITATION PARSERS — pure, FS-free. Each takes the raw CLAUDE.md text and
// returns the de-duplicated set of names it cites.
// ---------------------------------------------------------------------------

// `custom/<dir>` directory citations are read from the canonical Structure
// TREE block only — the map that ASSERTS each directory exists. A `├── <dir>/`
// / `└── <dir>/` box-drawing line whose name is a DIRECT child of the `custom/`
// header (trailing slash = directory; deeper-indented `*.vue` leaves are files
// and carry no trailing slash, so they're excluded). `index.ts` / `composables`
// are tree-internal scaffolding, not package dirs.
//
// We DELIBERATELY do NOT scan inline prose for `custom/<dir>` — the doc
// legitimately NAMES retired paths in their retirement notes (`the custom/
// sidebar/ dir was retired …`, `the @mkbabb/glass-ui/dock-group … was
// retired …`). Flagging a retirement note as a dangling citation would be a
// false witness (the AP.W4 discipline). The TREE is the only surface that
// asserts existence, so it is the only surface the gate rules on.
const TREE_INTERNAL = new Set(["index.ts", "composables"]);

export function citedCustomDirs(claudeMd) {
    const dirs = new Set();
    const lines = claudeMd.split("\n");
    let inCustomTree = false;
    let customIndent = -1;
    for (const line of lines) {
        const headerMatch = line.match(/^(\s*│?\s*)[├└]──\s*custom\/\s/);
        if (headerMatch) {
            inCustomTree = true;
            customIndent = line.indexOf("custom/");
            continue;
        }
        if (inCustomTree) {
            // A directory entry: `… ├── <name>/` (trailing slash = dir).
            const dirMatch = line.match(/[├└]──\s+([a-z0-9][a-z0-9-]*)\/(?:\s|$)/);
            if (dirMatch) {
                const col = line.search(/[├└]──/);
                // Only DIRECT children of custom/ (the custom/ header column or
                // shallower) are package dirs; deeper nodes (a dock/ child) are
                // component files, not package dirs.
                if (col <= customIndent && !TREE_INTERNAL.has(dirMatch[1])) {
                    dirs.add(dirMatch[1]);
                }
            }
            // The `└── index.ts` barrel at the custom/ level (or a sibling whose
            // column is left of the custom/ children) closes the block.
            const closes = /[├└]──\s+index\.ts/.test(line) &&
                line.search(/[├└]──/) <= customIndent;
            if (closes) inCustomTree = false;
        }
    }
    return dirs;
}

// The "## Dependencies" table package names. The table rows are
// `| `<pkg>` ^x.y | … |`; we read the first backtick-fenced token of each row
// between the `## Dependencies` header and the next `## ` header.
export function citedDeps(claudeMd) {
    const deps = new Set();
    const start = claudeMd.indexOf("## Dependencies");
    if (start === -1) return deps;
    const rest = claudeMd.slice(start + "## Dependencies".length);
    const end = rest.indexOf("\n## ");
    const block = end === -1 ? rest : rest.slice(0, end);
    // A table data row begins with `|` and carries a backtick-fenced package as
    // its first cell. The header (`| Package |`) + separator (`|---|`) rows
    // carry no backticks, so they're skipped.
    for (const line of block.split("\n")) {
        if (!line.trimStart().startsWith("|")) continue;
        const cell = line.split("|")[1] ?? "";
        const m = cell.match(/`([^`]+)`/);
        if (m) deps.add(m[1].trim());
    }
    return deps;
}

// ---------------------------------------------------------------------------
// The pure detector. Takes the raw CLAUDE.md + package.json text + a
// `dirExists(name)` resolver, returns { facts, violations }. The resolver is
// injected so the spec can drive it FS-free.
// ---------------------------------------------------------------------------
export function detectConsistency({ claudeMd, packageJson, dirExists }) {
    const violations = [];
    const pkg = typeof packageJson === "string" ? JSON.parse(packageJson) : packageJson;
    const declaredDeps = new Set([
        ...Object.keys(pkg.dependencies ?? {}),
        ...Object.keys(pkg.peerDependencies ?? {}),
    ]);

    const dirs = [...citedCustomDirs(claudeMd)].sort();
    const deps = [...citedDeps(claudeMd)].sort();

    const facts = {
        citedDirs: dirs,
        citedDeps: deps,
    };

    // DIRS — every cited `custom/<dir>` resolves to a real directory at HEAD.
    for (const dir of dirs) {
        if (!dirExists(dir)) {
            violations.push(
                `CLAUDE.md cites \`custom/${dir}/\` but src/components/custom/${dir}/ does not exist at HEAD — dangling directory citation (doc-rot). Remove the citation or restore the directory.`,
            );
        }
    }

    // DEPS — every package the Dependencies table names is a real declared dep.
    for (const dep of deps) {
        if (!declaredDeps.has(dep)) {
            violations.push(
                `CLAUDE.md's Dependencies table cites \`${dep}\` but package.json declares no such dependency/peerDependency at HEAD — reference rot. Correct the package name (e.g. lucide-vue-next → @lucide/vue) or update package.json.`,
            );
        }
    }

    return { facts, violations };
}

// FS-free convenience for the spec.
export function detectSource({ claudeMd, packageJson, existingDirs }) {
    const dirSet = new Set(existingDirs ?? []);
    return detectConsistency({
        claudeMd,
        packageJson,
        dirExists: (d) => dirSet.has(d),
    });
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------
function run() {
    const { ROOT, CLAUDE_MD, PACKAGE_JSON, CUSTOM_DIR, ARTIFACT } = cliPaths();

    const claudeMd = readFileSync(CLAUDE_MD, "utf8");
    const packageJson = readFileSync(PACKAGE_JSON, "utf8");

    const { facts, violations } = detectConsistency({
        claudeMd,
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

    console.log("proof:doc-consistency — CLAUDE.md custom-dir + dependency citation gate (AT.W7-dock-c)");
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
