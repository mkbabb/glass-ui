// Shared comment-stripping primitives for semantic source discovery. Both forms
// are pure and independent of the filesystem, arguments, or verification state.

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
 * A stateful line-machine strip for source containing comment-delimiter literals
 * inside regular expressions, the regex form's one blind spot.
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
