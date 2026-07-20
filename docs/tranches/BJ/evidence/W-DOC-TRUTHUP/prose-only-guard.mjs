#!/usr/bin/env node
// BJ.W-DOC-TRUTHUP — the no-op guard, arm (a).
//
// The band file's fence: "the diff over src/** touches only comment lines (no selector,
// declaration, token value, or executable statement)". Rather than pattern-match the diff
// text (which a cleverly-shaped declaration slips past), this guard strips ALL comments
// from both the pre-sweep and post-sweep versions of every changed src/ file and compares
// what remains. Prose-only ⟺ the comment-stripped bodies are byte-identical.
//
// Stripping need not be perfect, only DETERMINISTIC: it is applied identically to both
// sides, so an over-eager strip cancels out. An under-eager strip cannot mask a real
// code change, because that change survives into the compared remainder.
//
// Usage:  node prose-only-guard.mjs [--base <rev>] [--self-test]
//   --self-test  mutates a real declaration in memory and asserts the guard REDs (the
//                mutation bite: a guard that cannot fail is theatre).

import { execFileSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../../../..");
const argv = process.argv.slice(2);
const BASE = argv.includes("--base") ? argv[argv.indexOf("--base") + 1] : "HEAD";
const SELF_TEST = argv.includes("--self-test");

const git = (...args) => execFileSync("git", args, { cwd: ROOT, encoding: "utf8" });

/** Strip //, /* *​/ and <!-- --> comments, string-aware. Deterministic, not perfect. */
function stripComments(src, kind) {
    const lineComments = kind !== "css"; // `//` is not a comment in CSS
    let out = "";
    let i = 0;
    let quote = null;
    while (i < src.length) {
        const c = src[i];
        const next = src[i + 1];
        if (quote) {
            if (c === "\\") {
                out += c + (next ?? "");
                i += 2;
                continue;
            }
            if (c === quote) quote = null;
            out += c;
            i += 1;
            continue;
        }
        if (c === '"' || c === "'" || c === "`") {
            quote = c;
            out += c;
            i += 1;
            continue;
        }
        if (c === "/" && next === "*") {
            const end = src.indexOf("*/", i + 2);
            i = end === -1 ? src.length : end + 2;
            continue;
        }
        if (lineComments && c === "/" && next === "/") {
            const end = src.indexOf("\n", i);
            i = end === -1 ? src.length : end;
            continue;
        }
        if (c === "<" && src.startsWith("<!--", i)) {
            const end = src.indexOf("-->", i + 4);
            i = end === -1 ? src.length : end + 3;
            continue;
        }
        out += c;
        i += 1;
    }
    return out;
}

const kindOf = (p) => {
    const e = extname(p);
    if (e === ".css") return "css";
    if (e === ".vue") return "vue";
    if (e === ".md") return "prose"; // a doc under src/ (e.g. timeline/README.md, target T33)
    return "ts";
};

/** Comment-free, whitespace-normalized body. */
const body = (src, kind) =>
    stripComments(src, kind)
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .join("\n");

const changed = git("diff", "--name-only", BASE, "--", "src/")
    .split("\n")
    .filter(Boolean);

const findings = [];
const proseFiles = [];
for (const p of changed) {
    const kind = kindOf(p);
    if (kind === "prose") {
        // A .md file carries no selector, declaration, token value, or executable
        // statement — it is a prose target of this very wave. Nothing to strip.
        proseFiles.push(p);
        continue;
    }
    let before;
    try {
        before = git("show", `${BASE}:${p}`);
    } catch {
        findings.push({ p, why: "ADDED file (no pre-sweep version) — not a prose-only change" });
        continue;
    }
    const after = existsSync(resolve(ROOT, p)) ? readFileSync(resolve(ROOT, p), "utf8") : "";
    if (body(before, kind) !== body(after, kind)) {
        // report the first differing stripped line for the record
        const b = body(before, kind).split("\n");
        const a = body(after, kind).split("\n");
        const at = b.findIndex((l, i) => l !== a[i]);
        findings.push({
            p,
            why: `code delta at stripped line ${at + 1}: "${(b[at] ?? "(absent)").slice(0, 90)}" -> "${(a[at] ?? "(absent)").slice(0, 90)}"`,
        });
    }
}

console.log("BJ.W-DOC-TRUTHUP prose-only guard (no-op fence arm (a))");
console.log(`base: ${BASE} (${git("rev-parse", "--short", BASE).trim()})`);
console.log(`date: ${new Date().toISOString()}`);
console.log(`changed files under src/: ${changed.length}`);
for (const p of changed) console.log(`  · ${p}${proseFiles.includes(p) ? "   [prose file — no code to compare]" : ""}`);
console.log("");
if (findings.length === 0) {
    console.log(
        `VERDICT: CLEAN — all ${changed.length - proseFiles.length} changed src/ CODE file(s) differ in comments ONLY` +
            (proseFiles.length ? `; ${proseFiles.length} prose file(s) carry no code.` : "."),
    );
} else {
    console.log(`VERDICT: BREACH — ${findings.length} file(s) carry a non-comment delta:`);
    for (const f of findings) console.log(`  ✗ ${f.p}: ${f.why}`);
}

// ── The mutation bite ───────────────────────────────────────────────────────────
if (SELF_TEST) {
    console.log("");
    console.log("── self-test (mutation bite): can this guard actually fail? ──");
    const sample = changed.find((p) => kindOf(p) === "css") ?? changed[0];
    const kind = kindOf(sample);
    const original = git("show", `${BASE}:${sample}`);
    // mutate a real declaration/statement, NOT a comment
    const stripped = stripComments(original, kind);
    const realLine = stripped.split("\n").find((l) => l.trim().length > 8);
    const mutated = original.replace(realLine, `${realLine} /* injected */ ;;MUTANT;;`);
    const bit = body(original, kind) !== body(mutated, kind);
    console.log(`sample file      : ${sample}`);
    console.log(`mutated statement: ${realLine.trim().slice(0, 80)}`);
    console.log(`guard bites      : ${bit ? "YES — a non-comment delta is DETECTED" : "NO — VACUOUS GUARD"}`);
    // and prove the converse: a pure comment insertion does NOT bite
    const commentOnly =
        kind === "css"
            ? `/* a comment-only insertion */\n${original}`
            : `// a comment-only insertion\n${original}`;
    const quiet = body(original, kind) === body(commentOnly, kind);
    console.log(`comment insert   : ${quiet ? "correctly IGNORED" : "FALSE-POSITIVE — guard is over-eager"}`);
    if (!bit || !quiet) process.exitCode = 2;
}

if (findings.length) process.exitCode = 1;
