#!/usr/bin/env node
// AV.W10 — the no-orphan-demo-route gate (proof:no-orphan-demo-route).
//
// The storybook manifest (demo/stories/manifest.ts) is the single source of
// truth for the IA. Every story SFC under a manifest CATEGORY folder
// (demo/stories/<category>/<id>.vue) must be referenced by EXACTLY ONE manifest
// row, and every manifest row must resolve to an existing file. The bidirectional
// set-equality is the falsifier: a moved/renamed file that loses its row is an
// ORPHAN FILE; a row pointing at a deleted/missing file is a DANGLING ROW.
//
// Helper SFCs are excluded by construction: only directories whose name is a
// manifest category id are story folders. Root-level shared chassis
// (StoryPage.vue, ShowcaseFrame.vue, …) and per-story helper dirs (aurora/**)
// are NOT category folders, so they are never counted as stories.
//
// inv ε / bite-check: leave an unreferenced `.vue` in a category folder → RED
// (orphan file); add a manifest row pointing at a nonexistent `.vue` → RED
// (dangling row).

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        MANIFEST: resolve(ROOT, "demo/stories/manifest.ts"),
        STORIES_DIR: resolve(ROOT, "demo/stories"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_NO_ORPHAN_DEMO_ROUTE_ARTIFACT",
            "AV-no-orphan-demo-route",
        ),
    };
    return _cliPaths;
}

/**
 * Parse the manifest's category ids and `<category>/<id>` rows. Pure — the
 * manifest source is injected. Returns `{ categories, rows }`.
 */
export function parseManifest(src) {
    // Category ids: `id: "foo",` immediately inside a CATEGORIES entry. We take
    // every `id: "…"` that is followed (later in the block) by `stories:`. Simpler
    // + robust: collect the distinct first arg of every `s("cat", …)` call — those
    // ARE the category ids in use — plus any declared `id:` on a category object.
    const rows = [];
    const rowRe = /\bs\(\s*"([^"]+)"\s*,\s*"([^"]+)"/g;
    let m;
    while ((m = rowRe.exec(src))) rows.push(`${m[1]}/${m[2]}`);

    const categories = new Set(rows.map((r) => r.split("/")[0]));
    return { categories: [...categories], rows };
}

/**
 * Walk demo/stories and collect `<category>/<id>` for every `.vue` directly
 * inside a category folder. `categories` scopes the walk so helper dirs/files
 * are excluded. Pure given the readdir injection.
 */
export function collectStoryFiles(storiesDir, categories, fs) {
    const files = [];
    for (const cat of categories) {
        const dir = resolve(storiesDir, cat);
        if (!fs.existsSync(dir)) continue;
        for (const entry of fs.readdirSync(dir)) {
            if (!entry.endsWith(".vue")) continue;
            const full = resolve(dir, entry);
            if (!fs.statSync(full).isFile()) continue;
            files.push(`${cat}/${entry.replace(/\.vue$/, "")}`);
        }
    }
    return files;
}

function run() {
    const P = cliPaths();
    const violations = [];
    const facts = {};

    const { categories, rows } = parseManifest(readFileSync(P.MANIFEST, "utf8"));
    facts.categoryCount = categories.length;
    facts.rowCount = rows.length;

    const fs = { existsSync, readdirSync, statSync };
    const files = collectStoryFiles(P.STORIES_DIR, categories, fs);
    facts.fileCount = files.length;

    const rowSet = new Set(rows);
    const fileSet = new Set(files);

    // Duplicate rows (two rows → one file) is a manifest defect.
    const seen = new Set();
    for (const r of rows) {
        if (seen.has(r)) violations.push(`duplicate manifest row: ${r}`);
        seen.add(r);
    }

    // Dangling rows — a row with no file.
    const dangling = rows.filter((r) => !fileSet.has(r));
    for (const r of dangling) {
        violations.push(`dangling row: manifest references ${r}.vue which does not exist`);
    }

    // Orphan files — a file with no row.
    const orphans = files.filter((f) => !rowSet.has(f));
    for (const f of orphans) {
        violations.push(`orphan file: demo/stories/${f}.vue is referenced by no manifest row`);
    }

    facts.danglingRows = dangling;
    facts.orphanFiles = orphans;

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:no-orphan-demo-route",
        facts,
        violations,
    });

    console.log("proof:no-orphan-demo-route — every story file ↔ exactly one manifest row (AV.W10)");
    console.log(`  categories : ${facts.categoryCount}`);
    console.log(`  rows       : ${facts.rowCount}`);
    console.log(`  files      : ${facts.fileCount}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(P.ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
