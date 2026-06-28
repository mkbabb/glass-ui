#!/usr/bin/env node
/**
 * P3.3 PROTOTYPE — tests/ @glass-alias codemod DRY-RUN (read-only).
 *
 * Mirrors the demo P4 codemod (codemod-glass-alias.mjs) over the tests/ tree:
 * rewrites deep-relative src imports `(../)+src/X` -> `@glass/X` in
 * import/export SPECIFIER position only. Reports the EXACT edit set without
 * touching the repo. Writes its report ONLY under proto/. Reads repo read-only.
 *
 * THREE buckets (vs demo's two):
 *   1. rewrites      — static + dynamic import/export specifiers -> @glass/X
 *   2. fsPathRefs    — `resolve(__dirname, "(../)+src/...")` / readFileSync path
 *                      literals. These are FILESYSTEM paths, NOT module
 *                      specifiers; the @glass alias is module-resolution-only,
 *                      so they MUST stay relative. SAFE non-rewrite class.
 *   3. reviewHits    — any other `(../)+src/` not a comment/specifier/fs-path.
 *                      UNSAFE if > 0.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";

const REPO = "/Users/mkbabb/Programming/glass-ui";
const TESTS = join(REPO, "tests");
const OUT =
    "/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/b6d23e41-2f2a-4407-ba89-e126e9497583/scratchpad/bh-research/proto";

function walk(dir, acc = []) {
    for (const name of readdirSync(dir)) {
        const p = join(dir, name);
        const s = statSync(p);
        if (s.isDirectory()) {
            if (name === "node_modules" || name === "dist") continue;
            walk(p, acc);
        } else acc.push(p);
    }
    return acc;
}

const CODE_EXT = new Set([".ts", ".vue", ".js", ".mts", ".cts", ".tsx", ".jsx"]);
const files = walk(TESTS);

// import/export SPECIFIER position — STATIC + DYNAMIC + typeof import.
// group2 = quote, group3 = specifier body. `typeof import("...")` is reached by
// the `\bimport\s*\(` arm (the `typeof ` prefix is irrelevant to the match).
const SPECIFIER_RE =
    /(\bfrom\s*|\bimport\s*\(\s*|\bimport\s+|\bexport\s+\*\s+from\s*|\bexport\s+\{[^}]*\}\s+from\s*|\brequire\s*\(\s*)(["'])((?:\.\.\/)+src\/[^"']+)\2/g;

// `resolve(__dirname, "(../)+src/...")` / readFileSync fs-path literal.
const FSPATH_RE =
    /\b(?:resolve|readFileSync|readdirSync|existsSync|join|statSync)\s*\([^)]*?(["'])((?:\.\.\/)+src\/[^"']+)\1/g;

const ANY_SRC_RE = /(?:\.\.\/)+src\/[^\s"'`)]+/g;
const PREFIX_RE = /^(?:\.\.\/)+src\//;

const edits = [];
const fsPathRefs = [];
const unmatched = [];

for (const file of files) {
    const ext = extname(file);
    const rel = relative(REPO, file);
    const src = readFileSync(file, "utf8");
    const lines = src.split("\n");

    if (CODE_EXT.has(ext)) {
        for (const m of src.matchAll(SPECIFIER_RE)) {
            const spec = m[3];
            const idx = m.index;
            const line = src.slice(0, idx).split("\n").length;
            const depth = (spec.match(/\.\.\//g) || []).length;
            const isDynamic = /\bimport\s*\(/.test(m[1]);
            edits.push({
                file: rel,
                line,
                old: spec,
                new: spec.replace(PREFIX_RE, "@glass/"),
                depth,
                kind: isDynamic ? "dynamic" : "static",
            });
        }
        for (const m of src.matchAll(FSPATH_RE)) {
            const spec = m[2];
            const idx = m.index;
            const line = src.slice(0, idx).split("\n").length;
            fsPathRefs.push({ file: rel, line, path: spec });
        }
    }

    // audit EVERY (../)+src/ occurrence; bucket any not covered above.
    const coveredSpec = new Set(edits.filter((e) => e.file === rel).map((e) => e.old));
    const coveredFs = new Set(fsPathRefs.filter((e) => e.file === rel).map((e) => e.path));
    for (let i = 0; i < lines.length; i++) {
        const lineNo = i + 1;
        for (const m of lines[i].matchAll(ANY_SRC_RE)) {
            const tok = m[0].replace(/[.,;:`)\]]+$/, "");
            if (coveredSpec.has(tok) || coveredFs.has(tok)) continue;
            const trimmed = lines[i].trim();
            const isComment =
                trimmed.startsWith("*") ||
                trimmed.startsWith("//") ||
                trimmed.startsWith("/*") ||
                /^\s*\*/.test(lines[i]);
            unmatched.push({
                file: rel,
                line: lineNo,
                text: trimmed.slice(0, 140),
                kind: isComment ? "comment" : "REVIEW",
            });
        }
    }
}

const byDepth = edits.reduce((a, e) => ((a[e.depth] = (a[e.depth] || 0) + 1), a), {});
const byKind = edits.reduce((a, e) => ((a[e.kind] = (a[e.kind] || 0) + 1), a), {});
const filesTouched = new Set(edits.map((e) => e.file));
const reviewHits = unmatched.filter((u) => u.kind === "REVIEW");

const report = {
    summary: {
        specFiles: files.filter((f) => /\.(test|spec)\.(ts|tsx|vue)$/.test(f)).length,
        totalRewrites: edits.length,
        byDepth,
        byKind,
        filesTouched: filesTouched.size,
        fsPathRefs_safeNonRewrite: fsPathRefs.length,
        unmatchedComments: unmatched.filter((u) => u.kind === "comment").length,
        unmatchedREVIEW_unsafeIfNonzero: reviewHits.length,
        SAFE: reviewHits.length === 0,
    },
    fsPathRefs,
    reviewHits,
    sampleEdits: edits.slice(0, 14),
    allEdits: edits,
};

writeFileSync(join(OUT, "codemod-tests-dryrun-report.json"), JSON.stringify(report, null, 2));

console.log("=== tests/ @glass codemod DRY-RUN ===");
console.log("spec files                       :", report.summary.specFiles);
console.log("total specifier rewrites         :", edits.length, JSON.stringify(byKind));
console.log("  by depth (../ count)           :", JSON.stringify(byDepth));
console.log("files touched                    :", filesTouched.size);
console.log("fs-path refs (SAFE non-rewrite)  :", fsPathRefs.length);
console.log("unmatched comments (ignored)     :", report.summary.unmatchedComments);
console.log("REVIEW hits (UNSAFE if > 0)      :", reviewHits.length);
console.log("SAFE                             :", report.summary.SAFE);
console.log("\n--- sample edits (first 14) ---");
for (const e of report.sampleEdits)
    console.log(`  [${e.kind}] ${e.file}:${e.line}  "${e.old}" -> "${e.new}"`);
console.log("\n--- fs-path refs (left relative) ---");
for (const r of fsPathRefs) console.log(`  ${r.file}:${r.line}  ${r.path}`);
if (reviewHits.length) {
    console.log("\n--- REVIEW (manual) ---");
    for (const u of reviewHits) console.log(`  ${u.file}:${u.line}  ${u.text}`);
}
console.log("\nfull report -> proto/codemod-tests-dryrun-report.json");
