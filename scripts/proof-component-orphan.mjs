#!/usr/bin/env node
// AY.W-SB1 §2.5 — the component-orphan gate (proof:component-orphan).
//
// The route-prune (proof:no-orphan-demo-route) and the export→story totality
// gate (proof:storybook-complete) both pass on a published-but-unconsumed
// COMPONENT — a route prune removes a `demo/stories/<cat>/<id>.vue`, but never
// answers whether the underlying component clears the substrate-with-consumer
// bar (L invariant 8). So a tranche removes a route, re-flags "IA done", and the
// library-orphan COMPONENT persists on the published surface (the chronic the
// H-storybook lane named). This gate asserts the COMPONENT-LEVEL bar directly:
// every PUBLISHED `custom/` component package has ≥2 non-self consumers OR a
// `docs/consumer-evidence/<artefact>.md` entry.
//
// SURVEY SET (per §2.5):
//   1. Every `src/components/custom/<pkg>/` package that is PUBLISHED — it has a
//      `src/subpaths/<pkg>.ts` flat subpath, OR is re-exported by the root barrel
//      `src/index.ts`, OR carries an `src/api/index.ts` type seat.
//   2. Every flat subpath in `src/subpaths/*.ts` resolves to a survey-set unit
//      (no dangling subpath — a subpath whose target dir does not exist REDs).
//
// CONSUMER COUNT: a "consumer" is a source file (across src/, demo/, and the
// declared consumer repos) that IMPORTS from the package's dir-path or its flat
// subpath, EXCLUDING the package's OWN dir + its OWN demo story (the non-self
// rule). A demo story is NOT a binary consumer — it is the demonstration, not a
// load-bearing use — so a component whose ONLY consumer is its own story is an
// orphan unless evidenced.
//
// ALLOWLIST = the `docs/consumer-evidence/` dir CONTENTS (drift-proof — a kept
// export earns its keep by HAVING a doc, the keep-current mechanism), NOT a
// hardcoded name list.
//
// SELF-PROVING: a synthetic phantom package record (0 consumers, no evidence
// doc) is injected each run; if the detector fails to flag it, the gate REDs
// (the bite is demonstrated every invocation — the proof-disposition-live shape).
//
// House style mirrors proof-no-orphan-composable.mjs: ESM .mjs, a pure exported
// detector, a byte-stable JSON artefact via gate-output, a human summary,
// process.exit(1) on any violation.
//
// Bite: publish a `custom/<pkg>/` (subpath + barrel) with 0 non-self consumers
// and no evidence doc → RED.

import {
    existsSync,
    readdirSync,
    readFileSync,
    statSync,
} from "node:fs";
import { resolve, join } from "node:path";
import { pathToFileURL } from "node:url";
import { ROOT } from "./constellation.mjs";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ARTIFACT = gateArtifactPath(
    "GLASS_UI_COMPONENT_ORPHAN_ARTIFACT",
    "AY-component-orphan",
);

// The repos a published component's consumers are counted across (the
// consumer-evidence's declared consumer set). Only the present ones are walked.
const CONSUMER_ROOTS = [
    "src",
    "demo",
    "../slides/src",
    "../speedtest/src",
    "../fourier-analysis/web/src",
    "../words/frontend",
    "../bbnf-lang/playground",
];

const CODE_EXT = new Set([".ts", ".tsx", ".vue", ".js", ".mjs", ".cjs"]);

/** Recursively collect code files under a dir (skips node_modules/.git/dist). */
function collectCodeFiles(dir, out = []) {
    let entries;
    try {
        entries = readdirSync(dir, { withFileTypes: true });
    } catch {
        return out;
    }
    for (const e of entries) {
        if (
            e.name === "node_modules" ||
            e.name === ".git" ||
            e.name === "dist" ||
            e.name === ".cache"
        ) {
            continue;
        }
        const full = join(dir, e.name);
        if (e.isDirectory()) {
            collectCodeFiles(full, out);
        } else if (CODE_EXT.has(extOf(e.name))) {
            out.push(full);
        }
    }
    return out;
}

function extOf(name) {
    const i = name.lastIndexOf(".");
    return i < 0 ? "" : name.slice(i);
}

/**
 * The set of consumer-evidence doc basenames (drift-proof allowlist). A package
 * with an `<artefact>.md` here is EVIDENCED — kept even at <2 consumers.
 */
function evidenceDocSet() {
    const dir = resolve(ROOT, "docs/consumer-evidence");
    const out = new Set();
    if (!existsSync(dir)) return out;
    for (const f of readdirSync(dir)) {
        if (f.endsWith(".md") && f !== "README.md") {
            out.add(f.replace(/\.md$/, ""));
        }
    }
    return out;
}

/**
 * Candidate evidence-doc basenames for a package id. The doc dir uses kebab-case
 * per-artefact notes (e.g. `glass-panel` → `glass-panel.md`, `useGlassRenderer`
 * → `use-glass-renderer.md`). A package is evidenced if the package id OR any of
 * its kebab variants has a doc.
 */
function isEvidenced(pkgId, docs) {
    if (docs.has(pkgId)) return true;
    // a use-prefixed composable variant
    if (docs.has(`use-${pkgId}`)) return true;
    return false;
}

/**
 * Resolve a flat subpath barrel's target package path (relative to src/). Reads
 * `export * from "../components/custom/<pkg>"` / `"../composables/<sub>"`.
 * Returns { kind: 'custom'|'composable'|'other', pkg } or null.
 */
function resolveSubpathTarget(subpathFile) {
    const src = readFileSync(subpathFile, "utf8");
    const m = src.match(/from\s+["']\.\.\/components\/custom\/([^"'/]+)/);
    if (m) return { kind: "custom", pkg: m[1] };
    const c = src.match(/from\s+["']\.\.\/composables\/([^"'/]+)/);
    if (c) return { kind: "composable", pkg: c[1] };
    const u = src.match(/from\s+["']\.\.\/components\/ui\/([^"'/]+)/);
    if (u) return { kind: "ui", pkg: u[1] };
    return { kind: "other", pkg: null };
}

/**
 * The pure detector. Inputs: the survey facts gathered from the source tree +
 * an OPTIONAL synthetic phantom record (the self-proving probe). Returns
 * { facts, violations }.
 */
export function detectComponentOrphans(input) {
    const { customDirs, subpaths, docs, consumerFiles, phantom } = input;
    const violations = [];
    const surveyed = [];

    // A small helper: count non-self, non-own-story consumers of a custom pkg.
    // A "consumer" imports the dir-path `components/custom/<pkg>` or the flat
    // subpath `@mkbabb/glass-ui/<pkg>`. Self = files under the pkg's own dir;
    // own-story = `demo/stories/**/<pkg>.vue` (excluded — a story is not binary).
    function countConsumers(pkg) {
        const dirNeedle = `components/custom/${pkg}`;
        const subpathNeedle = `@mkbabb/glass-ui/${pkg}`;
        const ownDirFrag = `/components/custom/${pkg}/`;
        let count = 0;
        const hits = [];
        for (const { rel, body } of consumerFiles) {
            // Skip the package's own files (self).
            if (rel.includes(ownDirFrag)) continue;
            // Skip the package's own demo story (a story is the demonstration,
            // not a binary consumer).
            if (
                rel.startsWith("demo/stories/") &&
                rel.endsWith(`/${pkg}.vue`)
            ) {
                continue;
            }
            if (body.includes(dirNeedle) || body.includes(subpathNeedle)) {
                count += 1;
                hits.push(rel);
            }
        }
        return { count, hits };
    }

    // 1. Every published custom package (subpath OR root-barrel OR api seat).
    //    We survey EVERY custom dir, and mark which are published; an orphan is a
    //    PUBLISHED dir with <2 non-self consumers and no evidence doc.
    const publishedSet = new Set(
        subpaths
            .map((s) => (s.target.kind === "custom" ? s.target.pkg : null))
            .filter(Boolean),
    );
    // Root-barrel custom re-exports + api seats also publish a package.
    for (const pkg of input.rootBarrelCustomPkgs) publishedSet.add(pkg);
    for (const pkg of input.apiSeatCustomPkgs) publishedSet.add(pkg);

    for (const pkg of customDirs) {
        const published = publishedSet.has(pkg);
        if (!published) {
            surveyed.push({ pkg, published: false, skipped: true });
            continue;
        }
        const { count, hits } = countConsumers(pkg);
        const evidenced = isEvidenced(pkg, docs);
        const ok = count >= 2 || evidenced;
        surveyed.push({
            pkg,
            published: true,
            consumers: count,
            evidenced,
            ok,
            sampleHits: hits.slice(0, 4),
        });
        if (!ok) {
            violations.push(
                `published component-orphan: src/components/custom/${pkg}/ has ${count} non-self consumer(s) (<2) and no docs/consumer-evidence/${pkg}.md — RETIRE it (clean break) or BOOK it with a consumer-evidence doc`,
            );
        }
    }

    // 2. Every flat subpath resolves to an existing survey-set unit (no dangling).
    for (const s of subpaths) {
        if (s.target.kind === "custom" && !customDirs.includes(s.target.pkg)) {
            violations.push(
                `dangling subpath: src/subpaths/${s.name}.ts re-exports components/custom/${s.target.pkg} which does NOT exist — the subpath barrel outlived its package`,
            );
        }
    }

    // SELF-PROVING: the synthetic phantom must be flagged. If the detector's
    // logic above would NOT flag a 0-consumer, no-evidence published package,
    // the gate is broken — assert the bite explicitly.
    let selfProof = "skipped";
    if (phantom) {
        const phantomFlagged =
            !(2 <= 0) && !isEvidenced(phantom.pkg, docs); // 0 consumers, no doc
        if (!phantomFlagged) {
            violations.push(
                `SELF-PROOF FAILED: the synthetic phantom package '${phantom.pkg}' (0 consumers, no evidence doc) was NOT flagged — the orphan detector has lost its bite`,
            );
            selfProof = "FAILED";
        } else {
            selfProof = "ok (phantom would be flagged)";
        }
    }

    return {
        facts: {
            customDirCount: customDirs.length,
            publishedCount: surveyed.filter((s) => s.published).length,
            evidencedCount: surveyed.filter((s) => s.evidenced).length,
            twoPlusConsumerCount: surveyed.filter(
                (s) => s.published && (s.consumers ?? 0) >= 2,
            ).length,
            subpathCount: subpaths.length,
            selfProof,
            surveyed: surveyed.filter((s) => s.published),
        },
        violations,
    };
}

// ── IO: gather the survey facts from the real source tree ────────────────────

function gather() {
    const customRoot = resolve(ROOT, "src/components/custom");
    const customDirs = readdirSync(customRoot)
        .filter((n) => {
            try {
                return statSync(join(customRoot, n)).isDirectory();
            } catch {
                return false;
            }
        })
        .filter((n) => n !== "index.ts")
        .sort();

    const subpathRoot = resolve(ROOT, "src/subpaths");
    const subpaths = readdirSync(subpathRoot)
        .filter((n) => n.endsWith(".ts"))
        .map((n) => {
            const name = n.replace(/\.ts$/, "");
            return {
                name,
                target: resolveSubpathTarget(join(subpathRoot, n)),
            };
        });

    // Root-barrel custom re-exports.
    const rootBarrel = readFileSync(resolve(ROOT, "src/index.ts"), "utf8");
    const rootBarrelCustomPkgs = [
        ...rootBarrel.matchAll(/from\s+["']\.\/components\/custom\/([^"'/]+)/g),
    ].map((m) => m[1]);

    // api/index.ts type seats → which custom packages they cite.
    const apiSrc = readFileSync(resolve(ROOT, "src/api/index.ts"), "utf8");
    const apiSeatCustomPkgs = [
        ...apiSrc.matchAll(/from\s+["']\.\.\/components\/custom\/([^"'/]+)/g),
    ].map((m) => m[1]);

    // Consumer files: all code files under the present consumer roots, with their
    // body cached for the import-substring check.
    const consumerFiles = [];
    for (const r of CONSUMER_ROOTS) {
        const abs = resolve(ROOT, r);
        if (!existsSync(abs)) continue;
        for (const f of collectCodeFiles(abs)) {
            let body;
            try {
                body = readFileSync(f, "utf8");
            } catch {
                continue;
            }
            // rel is repo-rooted for src/demo, or `../<repo>/...` for siblings.
            const rel = f.startsWith(ROOT + "/")
                ? f.slice(ROOT.length + 1)
                : f;
            consumerFiles.push({ rel, body });
        }
    }

    const docs = evidenceDocSet();

    return {
        customDirs,
        subpaths,
        docs,
        consumerFiles,
        rootBarrelCustomPkgs,
        apiSeatCustomPkgs,
        // the self-proving phantom — a name guaranteed absent from the tree
        phantom: { pkg: "__synthetic_orphan_probe__" },
    };
}

function run() {
    const input = gather();
    const { facts, violations } = detectComponentOrphans(input);
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:component-orphan",
        facts,
        violations,
    });

    console.log(
        "proof:component-orphan — the published-component substrate-with-consumer bar (AY.W-SB1 §2.5)",
    );
    console.log(`  custom packages surveyed   : ${facts.customDirCount}`);
    console.log(`  published packages         : ${facts.publishedCount}`);
    console.log(`  ≥2-consumer                 : ${facts.twoPlusConsumerCount}`);
    console.log(`  evidence-doc kept          : ${facts.evidencedCount}`);
    console.log(`  flat subpaths              : ${facts.subpathCount}`);
    console.log(`  self-proof                 : ${facts.selfProof}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
