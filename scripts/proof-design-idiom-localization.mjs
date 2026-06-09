#!/usr/bin/env node
// AU.W8b — the design-idiom-localization gate (proof:design-idiom-localization).
//
// glass-ui's tokens.css → theme.css → utilities.css → scoped cascade is the GOLD
// STANDARD (slides-F adopts it byte-for-byte). The discipline leak this gate closes:
// `text-[var(--…)]` / `shadow-[var(--…)]` ARBITRARY wraps that bypass the @theme
// layer (a token reference smuggled into Tailwind arbitrary-value syntax instead of
// the @theme-generated `text-<token>` / `shadow-<token>` utility). The W8b fold lifts
// the 12 known sites (AU.W8b.4 / AU-AUGMENT §5.4); this gate keeps NEW ones from
// landing. It flags ONLY the two highest-signal wrap forms (per AU-AUGMENT §6.1) —
// NOT every arbitrary value, so a compound `transition-[…]` is intentionally
// unflagged.
//
// House style mirrors proof-dock-opacity-lockstep.mjs: ESM .mjs, comment-strip
// first (false-witness discipline — a commented-out wrap is never a witness), a
// pure exported detector, a byte-stable JSON artefact via gate-output, a human
// summary, process.exit(1) on any violation.
//
// ALLOWLIST: a legitimate runtime-themed comma-fallback binding is KEPT, not lifted
// — `--active-tab-color` is a consumer-set runtime var with a `--foreground`
// fallback (TabsTrigger.vue), NOT a static @theme token. The allowlist is an
// explicit {file, line, var} array; a NEW unjustified wrap still reddens.

import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

// The two highest-signal anti-pattern wrap forms (AU-AUGMENT §6.1). Each match
// is a token smuggled into Tailwind arbitrary-value syntax that bypasses the
// @theme layer — use the @theme-generated `text-<token>` / `shadow-<token>`.
const WRAP_RES = [
    { name: "text-[var]", utility: "text-<token>", re: /\btext-\[var\(--[^\]]+\)\]/g },
    { name: "shadow-[var]", utility: "shadow-<token>", re: /\bshadow-\[var\(--[^\]]+\)\]/g },
];

// Explicit {file, line, var} allowlist — legitimate runtime-themed comma-fallback
// bindings that are KEEP (a consumer-set runtime var, not a static @theme token).
// `file` is repo-relative; `line` is 1-based; `var` is the leading custom prop the
// wrap binds. A NEW unjustified wrap that is NOT in this array still reddens.
const ALLOWLIST = [
    {
        file: "src/components/ui/tabs/TabsTrigger.vue",
        line: 22,
        var: "--active-tab-color",
        rationale:
            "runtime-themed binding: --active-tab-color is consumer-set with a --foreground fallback (NOT a static @theme token).",
    },
];

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        SFC_ROOT: resolve(ROOT, "src/components"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_DESIGN_IDIOM_LOCALIZATION_ARTIFACT",
            "AU-design-idiom-localization",
        ),
    };
    return _cliPaths;
}

// Blank a [start,end) range, preserving newlines (and thus line numbers/offsets)
// so a comment-stripped match never shifts the reported line.
function blankRange(text, start, end) {
    let out = "";
    for (let i = start; i < end; i++) out += text[i] === "\n" ? "\n" : " ";
    return out;
}

// Comment-strip for both .vue (HTML `<!-- -->` in template + JS `//` `/* */` in
// <script>) and .ts (`//` `/* */`). Blanks each comment span to whitespace so a
// commented-out wrap is never a false witness. Offsets/newlines preserved.
function stripComments(text) {
    let result = "";
    let i = 0;
    const n = text.length;
    while (i < n) {
        // HTML comment
        if (text[i] === "<" && text.startsWith("<!--", i)) {
            const end = text.indexOf("-->", i + 4);
            const stop = end === -1 ? n : end + 3;
            result += blankRange(text, i, stop);
            i = stop;
            continue;
        }
        // Block comment
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? n : end + 2;
            result += blankRange(text, i, stop);
            i = stop;
            continue;
        }
        // Line comment
        if (text[i] === "/" && text[i + 1] === "/") {
            let end = text.indexOf("\n", i + 2);
            if (end === -1) end = n;
            result += blankRange(text, i, end);
            i = end;
            continue;
        }
        result += text[i];
        i++;
    }
    return result;
}

// Recursively collect src/components/**/*.{vue,ts} (a tiny readdir walk — no dep).
function sfcFiles(dir) {
    const out = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = resolve(dir, entry.name);
        if (entry.isDirectory()) {
            out.push(...sfcFiles(full));
        } else if (entry.isFile() && (entry.name.endsWith(".vue") || entry.name.endsWith(".ts"))) {
            out.push(full);
        }
    }
    return out;
}

// 1-based line number of a character offset.
function lineOf(text, offset) {
    let line = 1;
    for (let i = 0; i < offset && i < text.length; i++) {
        if (text[i] === "\n") line++;
    }
    return line;
}

// Is this {relFile, line, matchText} covered by the allowlist? The allowlist var
// appearing inside the matched wrap (file + var) anchors the entry to the right
// binding — robust against line shifts (the `line` field stays informational; an
// edit elsewhere in the file no longer falsely un-allowlists the binding).
function isAllowed(relFile, line, matchText) {
    return ALLOWLIST.some((a) => a.file === relFile && matchText.includes(a.var));
}

// The pure detector. Takes a list of {rel, src} (src is comment-stripped) and
// returns {facts, violations}. `rel` is the repo-relative path (for the allowlist
// + the violation message).
export function detectIdiom(entries) {
    const violations = [];
    const facts = { scanned: entries.length, hits: 0, allowlisted: 0 };
    for (const { rel, src } of entries) {
        for (const { name, utility, re } of WRAP_RES) {
            re.lastIndex = 0;
            for (const m of src.matchAll(re)) {
                const line = lineOf(src, m.index);
                if (isAllowed(rel, line, m[0])) {
                    facts.allowlisted++;
                    continue;
                }
                facts.hits++;
                violations.push(
                    `${rel}:${line}: ${name} arbitrary-value wrap \`${m[0]}\` — use the @theme utility (${utility})`,
                );
            }
        }
    }
    return { facts, violations };
}

// Read + comment-strip every file, carrying the repo-relative path.
export function detectSource(root, files, readFile) {
    const entries = files.map((f) => ({
        rel: f.slice(root.length + 1),
        src: stripComments(readFile(f) ?? ""),
    }));
    return detectIdiom(entries);
}

function run() {
    const { ROOT, SFC_ROOT, ARTIFACT } = cliPaths();
    const files = sfcFiles(SFC_ROOT);
    const { facts, violations } = detectSource(ROOT, files, (f) => readFileSync(f, "utf8"));
    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:design-idiom-localization",
        facts,
        violations,
    });

    console.log(
        "proof:design-idiom-localization — scoped styles consume @theme utilities, not text-[var]/shadow-[var] wraps (AU.W8b)",
    );
    console.log(`  files scanned : ${facts.scanned}`);
    console.log(`  wrap hits     : ${facts.hits}`);
    console.log(`  allowlisted   : ${facts.allowlisted}`);
    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
