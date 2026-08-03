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

const isWhitespace = (code) => code === 0x20 || code === 0x09 || code === 0x0a || code === 0x0d || code === 0x0c;
const isHex = (code) => (code >= 0x30 && code <= 0x39) || (code >= 0x41 && code <= 0x46) || (code >= 0x61 && code <= 0x66);
const isName = (code) =>
    code === 0x2d || code === 0x5f ||
    (code >= 0x30 && code <= 0x39) || (code >= 0x41 && code <= 0x5a) ||
    (code >= 0x61 && code <= 0x7a) || code >= 0x80;
const isNameContinuation = (code) => code === 0x5c || isName(code);

function consumeEscape(css, start) {
    let end = start + 1;
    if (end >= css.length) return { end, point: -1, hexDigits: 0, terminated: false };
    const next = css.charCodeAt(end);
    if (next === 0x0d || next === 0x0a || next === 0x0c) {
        if (next === 0x0d && css.charCodeAt(end + 1) === 0x0a) end++;
        return { end: end + 1, point: -1, hexDigits: 0, terminated: true };
    }

    let hexDigits = 0;
    let point = 0;
    while (hexDigits < 6 && isHex(css.charCodeAt(end))) {
        const digit = css.charCodeAt(end++);
        point = point * 16 + (digit <= 0x39 ? digit - 0x30 : digit <= 0x46 ? digit - 0x37 : digit - 0x57);
        hexDigits++;
    }
    if (hexDigits > 0) {
        let terminated = false;
        if (css.charCodeAt(end) === 0x0d) {
            end += css.charCodeAt(end + 1) === 0x0a ? 2 : 1;
            terminated = true;
        } else if (isWhitespace(css.charCodeAt(end))) {
            end++;
            terminated = true;
        }
        return { end, point: point === 0 || point > 0x10ffff ? 0xfffd : point, hexDigits, terminated };
    }

    const escapedPoint = css.codePointAt(end);
    return { end: end + (escapedPoint === undefined ? 0 : escapedPoint > 0xffff ? 2 : 1), point: escapedPoint ?? -1, hexDigits: 0, terminated: false };
}

function consumeString(css, start) {
    const quote = css.charCodeAt(start);
    for (let end = start + 1; end < css.length; end++) {
        const code = css.charCodeAt(end);
        if (code === 0x5c) {
            end = consumeEscape(css, end).end - 1;
            continue;
        }
        if (code === 0x0a || code === 0x0d || code === 0x0c) {
            const kind = code === 0x0a ? "LF" : code === 0x0d ? "CR" : "FF";
            throw new Error(`Raw ${kind} in CSS string literal`);
        }
        if (code === quote) return end + 1;
    }
    throw new Error("Unterminated CSS string literal");
}

function consumeComment(css, start) {
    for (let end = start + 2; end < css.length; end++) {
        if (css.charCodeAt(end) === 0x2a && css.charCodeAt(end + 1) === 0x2f) return end + 2;
    }
    throw new Error("Unterminated CSS comment");
}

function consumeName(css, start) {
    let end = start;
    let decoded = "";
    let unterminatedHex = false;
    while (end < css.length) {
        const code = css.charCodeAt(end);
        if (code === 0x5c) {
            const escape = consumeEscape(css, end);
            if (escape.point < 0) throw new Error("Invalid CSS name escape");
            decoded += String.fromCodePoint(escape.point);
            end = escape.end;
            unterminatedHex = escape.hexDigits > 0 && escape.hexDigits < 6 && !escape.terminated;
        } else if (isNameContinuation(code)) {
            const point = css.codePointAt(end);
            decoded += String.fromCodePoint(point);
            end += point > 0xffff ? 2 : 1;
            unterminatedHex = false;
        } else break;
    }
    return { end, decoded, unterminatedHex };
}

function consumeUrl(css, start) {
    for (let end = start + 1; end < css.length; end++) {
        const code = css.charCodeAt(end);
        if (code === 0x22 || code === 0x27) {
            end = consumeString(css, end) - 1;
        } else if (code === 0x5c) {
            end = consumeEscape(css, end).end - 1;
        } else if (code === 0x2f && css.charCodeAt(end + 1) === 0x2a) {
            end = consumeComment(css, end) - 1;
        } else if (code === 0x29) {
            return end + 1;
        }
    }
    throw new Error("Unterminated CSS url() function");
}

function scanCss(css) {
    let output = "";
    let pendingSpace = false;
    let previousStructural = false;
    let hasComment = false;

    const emit = (token, structural = false) => {
        if (pendingSpace && output.length > 0 && !previousStructural && !structural) output += " ";
        pendingSpace = false;
        output += token;
        previousStructural = structural;
    };

    for (let index = 0; index < css.length;) {
        const code = css.charCodeAt(index);
        if (code === 0x22 || code === 0x27) {
            const end = consumeString(css, index);
            emit(css.slice(index, end));
            index = end;
            continue;
        }

        if (code === 0x2f && css.charCodeAt(index + 1) === 0x2a) {
            index = consumeComment(css, index);
            pendingSpace = true;
            hasComment = true;
            continue;
        }

        if ((code === 0x23 || code === 0x40) && (css.charCodeAt(index + 1) === 0x5c || isName(css.charCodeAt(index + 1)))) {
            const name = consumeName(css, index + 1);
            let token = css.slice(index, name.end);
            if (name.unterminatedHex && css.charCodeAt(name.end) === 0x2f && css.charCodeAt(name.end + 1) === 0x2a) token += " ";
            emit(token);
            index = name.end;
            continue;
        }

        if (code === 0x5c || isName(code)) {
            const name = consumeName(css, index);
            if (name.decoded.toLowerCase() === "url" && css.charCodeAt(name.end) === 0x28) {
                const end = consumeUrl(css, name.end);
                emit(css.slice(index, end));
                index = end;
            } else {
                let token = css.slice(index, name.end);
                if (name.unterminatedHex && css.charCodeAt(name.end) === 0x2f && css.charCodeAt(name.end + 1) === 0x2a) token += " ";
                emit(token);
                index = name.end;
            }
            continue;
        }

        if (isWhitespace(code)) {
            pendingSpace = true;
            index++;
            continue;
        }
        emit(css[index], code === 0x7b || code === 0x7d || code === 0x3b || code === 0x2c);
        index++;
    }
    return { output, hasComment };
}

export function minifyCss(css) {
    return scanCss(css).output;
}

export function hasCommentOutsideString(css) {
    return scanCss(css).hasComment;
}

export function isMinified(css) {
    if (hasCommentOutsideString(css)) return false;
    return !css.replace(/\n$/, "").includes("\n");
}
