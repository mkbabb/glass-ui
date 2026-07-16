// minify-css.mjs — the string-aware CSS minify core (BG.W-CSS-MINIFY / F8.4).
//
// The `dist/styles/*.css` cascade is copied RAW from `src/styles/` (cpSync) so it
// still carries Tailwind-v4 SOURCE directives (`@theme`/`@utility`/`@apply`/
// `@source`/`@variant`/`@layer`) the CONSUMER's Tailwind processes, PLUS the
// build-injected `-webkit-backdrop-filter` pairs and the `@supports` no-masking
// fallbacks. A real CSS minifier (lightningcss/esbuild) would drop the
// "redundant" webkit prefix, prune a "dead" `@supports` fallback branch, or
// choke on the non-standard Tailwind at-rules — every one a semantic change that
// breaks a consumer's Tailwind build. So the
// minify is DELIBERATELY conservative + purely lexical: strip comments + collapse
// whitespace runs to ONE space, NEVER a structural transform. It preserves
// `calc(a + b)` spacing (whitespace-run → single space, never removed around
// operators), the `@supports`/webkit pairs, and every Tailwind directive verbatim.
//
// THE STRING TRAP (the atSourceIndex lesson, load-bearing): `@source "../*.js";`
// contains the substring `/*` INSIDE its string literal. A naive comment strip
// (`/\/\*[\s\S]*?\*\//`) matches from THAT `/*` to the next `*/` and eats the
// `@source` line plus everything to the next comment close — corrupting the
// shipped cascade. The scanner below is a STRING-AWARE state machine: it copies
// string bodies (`"…"`/`'…'`, `\`-escapes honoured) verbatim and only recognises
// `/*…*/` comments OUTSIDE strings. Base64 data URIs never contain `/*` (the
// base64 alphabet has `/` but never `*`), and are quoted anyway, so they pass
// through untouched.

/**
 * minifyCss — strip comments + collapse whitespace to a single line, string-safe.
 * Returns a comment-free, newline-free CSS string (semantics byte-preserved:
 * whitespace runs collapse to ONE space so `calc()`, selectors, `@apply a b`,
 * and every operator spacing survive).
 */
export function minifyCss(css) {
    let out = "";
    let pendingSpace = false;
    const n = css.length;
    let i = 0;
    while (i < n) {
        const c = css[i];
        // ── String literal — copy the body verbatim (protects `/*` in `@source`,
        //    `content:"…"`, and any quoted url()). ──
        if (c === '"' || c === "'") {
            if (pendingSpace && out.length > 0) out += " ";
            pendingSpace = false;
            const quote = c;
            out += c;
            i++;
            while (i < n) {
                const d = css[i];
                if (d === "\\" && i + 1 < n) {
                    out += d + css[i + 1];
                    i += 2;
                    continue;
                }
                out += d;
                i++;
                if (d === quote) break;
            }
            continue;
        }
        // ── Comment `/* … */` (only OUTSIDE strings — we are outside). Acts as a
        //    whitespace separator. ──
        if (c === "/" && css[i + 1] === "*") {
            i += 2;
            while (i < n && !(css[i] === "*" && css[i + 1] === "/")) i++;
            i += 2; // skip the closing `*/`
            pendingSpace = true;
            continue;
        }
        // ── Whitespace run → one pending space. ──
        if (c === " " || c === "\t" || c === "\n" || c === "\r" || c === "\f") {
            pendingSpace = true;
            i++;
            continue;
        }
        // ── A normal token char. ──
        if (pendingSpace && out.length > 0) out += " ";
        pendingSpace = false;
        out += c;
        i++;
    }
    return out.trim();
}

/**
 * hasCommentOutsideString — true iff a slash-star comment block exists OUTSIDE
 * any string literal (the string-aware companion to a naive comment regex — a
 * `@source "../[star].js"` must NOT read as a comment because its string body
 * contains the slash-star bytes).
 */
export function hasCommentOutsideString(css) {
    const n = css.length;
    let i = 0;
    while (i < n) {
        const c = css[i];
        if (c === '"' || c === "'") {
            const quote = c;
            i++;
            while (i < n) {
                const d = css[i];
                if (d === "\\" && i + 1 < n) {
                    i += 2;
                    continue;
                }
                i++;
                if (d === quote) break;
            }
            continue;
        }
        if (c === "/" && css[i + 1] === "*") return true;
        i++;
    }
    return false;
}

/**
 * isMinified — the gate predicate: a published CSS partial is minified iff it
 * carries NO comment block (string-aware) AND is a single line (no interior
 * newline; a lone trailing newline is tolerated).
 */
export function isMinified(css) {
    if (hasCommentOutsideString(css)) return false;
    if (/\n/.test(css.replace(/\n$/, ""))) return false;
    return true;
}
