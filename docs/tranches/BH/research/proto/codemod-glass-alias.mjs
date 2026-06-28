#!/usr/bin/env node
/**
 * P4 PROTOTYPE — @glass alias codemod DRY-RUN (read-only).
 *
 * Rewrites demo deep-relative src imports  `(../)+src/X`  →  `@glass/X`.
 * Reports the EXACT edit set without touching the repo. Writes its report
 * ONLY under proto/. Reads repo files read-only.
 *
 * Safety model:
 *  - We ONLY rewrite the string INSIDE an import/export specifier position:
 *      from "..."        |  from '...'
 *      import("...")     |  import('...')
 *      import "..."      (side-effect)
 *      export ... from "..."
 *  - We separately scan EVERY `(../)+src/` occurrence in the file and bucket
 *    those NOT covered by a specifier rewrite as `unmatched` (comments, CSS,
 *    string-built paths). If `unmatched` contains any real import → UNSAFE.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";

const REPO = "/Users/mkbabb/Programming/glass-ui";
const DEMO = join(REPO, "demo");
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/b6d23e41-2f2a-4407-ba89-e126e9497583/scratchpad/bh-research/proto";

// ---- file walk -------------------------------------------------------------
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
const files = walk(DEMO);

// ---- specifier-position rewrite -------------------------------------------
// Matches the quoted module specifier of: from X | import(X) | import X | export..from X
// Capture group 2 = the specifier body (without quotes).
const SPECIFIER_RE =
    /(\bfrom\s*|\bimport\s*\(\s*|\bimport\s+|\bexport\s+\*\s+from\s*|\brequire\s*\(\s*)(["'])((?:\.\.\/)+src\/[^"']+)\2/g;

// Any `(../)+src/` anywhere (for the unmatched/unsafe audit).
const ANY_SRC_RE = /(?:\.\.\/)+src\/[^\s"'`)]+/g;

const PREFIX_RE = /^(?:\.\.\/)+src\//;

const edits = [];      // {file,line,col,old,new,depth}
const cssRefs = [];    // {file,line,text}
const unmatched = [];  // {file,line,text,kind}

for (const file of files) {
    const ext = extname(file);
    const rel = relative(REPO, file);
    const src = readFileSync(file, "utf8");
    const lines = src.split("\n");

    // --- collect specifier rewrites (code files only) ---
    if (CODE_EXT.has(ext)) {
        for (const m of src.matchAll(SPECIFIER_RE)) {
            const spec = m[3];
            const idx = m.index;
            const line = src.slice(0, idx).split("\n").length;
            const depth = (spec.match(/\.\.\//g) || []).length;
            const nu = spec.replace(PREFIX_RE, "@glass/");
            edits.push({ file: rel, line, old: spec, new: nu, depth });
        }
    }

    // --- audit EVERY (../)+src/ occurrence; classify any not covered above ---
    const covered = new Set(edits.filter((e) => e.file === rel).map((e) => e.old));
    for (let i = 0; i < lines.length; i++) {
        const lineNo = i + 1;
        for (const m of lines[i].matchAll(ANY_SRC_RE)) {
            const tok = m[0].replace(/[.,;:`)\]]+$/, "");
            if (covered.has(tok)) continue;
            if (ext === ".css") {
                cssRefs.push({ file: rel, line: lineNo, text: lines[i].trim() });
                continue;
            }
            // code file but NOT a specifier rewrite — comment / prose / dynamic?
            const trimmed = lines[i].trim();
            const isComment =
                trimmed.startsWith("*") ||
                trimmed.startsWith("//") ||
                trimmed.startsWith("/*") ||
                /^\s*\*/.test(lines[i]);
            unmatched.push({
                file: rel,
                line: lineNo,
                text: trimmed.slice(0, 120),
                kind: isComment ? "comment" : "REVIEW",
            });
        }
    }
}

// ---- report ----------------------------------------------------------------
const byDepth = edits.reduce((a, e) => ((a[e.depth] = (a[e.depth] || 0) + 1), a), {});
const filesTouched = new Set(edits.map((e) => e.file));
const reviewHits = unmatched.filter((u) => u.kind === "REVIEW");

const report = {
    summary: {
        totalRewrites: edits.length,
        byDepth,
        filesTouched: filesTouched.size,
        cssRefs_separateClass: cssRefs.length,
        unmatchedComments: unmatched.filter((u) => u.kind === "comment").length,
        unmatchedREVIEW_unsafeIfNonzero: reviewHits.length,
        SAFE: reviewHits.length === 0,
    },
    cssRefs,
    reviewHits,
    sampleEdits: edits.slice(0, 12),
    allEdits: edits,
};

writeFileSync(join(OUT, "codemod-dryrun-report.json"), JSON.stringify(report, null, 2));

// human console summary
console.log("=== @glass codemod DRY-RUN ===");
console.log("total import-specifier rewrites :", edits.length);
console.log("  by depth (../ count)          :", JSON.stringify(byDepth));
console.log("files touched                   :", filesTouched.size);
console.log("CSS refs (separate class)       :", cssRefs.length, "(NOT JS-alias targets)");
console.log("unmatched comments (ignored)    :", report.summary.unmatchedComments);
console.log("REVIEW hits (UNSAFE if > 0)     :", reviewHits.length);
console.log("SAFE                            :", report.summary.SAFE);
console.log("");
console.log("--- sample edits (first 12) ---");
for (const e of report.sampleEdits)
    console.log(`  ${e.file}:${e.line}  "${e.old}"  ->  "${e.new}"`);
if (reviewHits.length) {
    console.log("\n--- REVIEW (manual) ---");
    for (const u of reviewHits) console.log(`  ${u.file}:${u.line}  ${u.text}`);
}
console.log("\nfull report -> proto/codemod-dryrun-report.json");
