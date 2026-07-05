// scripts/lib/detect/comment-strip.mjs — the ONE comment-strip primitive.
//
// BG.W-GATE-FAMILY-CONSOLIDATE (F8.1). The "comment-strip pure-detector house
// pattern" every source-scanning gate opens with was re-implemented ~40× across
// scripts/proof-*.mjs (no-masking-manifest.stripComments, close-sweep.stripJs,
// adaptive-glass, glass-cohesion, …). Two shapes recurred: a URL-safe regex
// strip (block + `//` line, preserving `://`) and a line-machine strip (a
// stateful `/* … */` walker that a `/\/\*/`-bearing gate body would otherwise
// eat whole). This module is the single home for BOTH so a family gate never
// re-derives the strip. Pure (no fs, no argv) → self-testable.

/**
 * Strip block comments AND `//` line comments (URL-safe — a `://` inside a
 * string survives). The regex form: fast, good for CSS + prose-bearing source.
 * @param {string} src
 * @returns {string}
 */
export function stripComments(src) {
    // Block comments first.
    let out = src.replace(/\/\*[\s\S]*?\*\//g, "");
    // Line comments — the URL-safe form (only strip `//` NOT preceded by `:`),
    // so `https://` inside a string survives (the clause-7 house idiom).
    out = out.replace(/(^|[^:])\/\/[^\n]*/g, "$1");
    return out;
}

/**
 * The line-machine strip (the close-sweep `stripJs` shape). A stateful walker
 * that never eats a gate body carrying a block-comment-delimiter literal in a
 * regex — the regex form's one blind spot. Use this when the SCANNED source is
 * itself a gate script carrying comment-delimiter literals in its own detectors.
 * @param {string} src
 * @returns {string}
 */
export function stripJs(src) {
    const out = [];
    let inBlock = false;
    for (const line of src.split("\n")) {
        const t = line.trim();
        if (inBlock) {
            if (t.includes("*/")) inBlock = false;
            continue;
        }
        if (t.startsWith("/*")) {
            if (!t.includes("*/")) inBlock = true;
            continue;
        }
        if (t.startsWith("//")) continue;
        out.push(line.replace(/\/\/.*$/, ""));
    }
    return out.join("\n");
}
