#!/usr/bin/env node
// The ONE comment counter (BJ TERMINAL-ROSTER row #17, W-COMMENT-DIET).
//
// J-10 IS WHY THIS FILE EXISTS. Three seats once quoted three different suite
// counts from three different regexes, and the ruling was that no bare figure is
// ever quoted again: one committed figure, one committed detector, and the figure
// is what the detector emits. The comment census is the same shape of number — the
// 39.4% in `WAVES.md:847` had no committed instrument behind it, so it could not be
// re-derived, only re-typed. This is the instrument. Anything that quotes a comment
// ratio quotes THIS command's output, or it quotes nothing.
//
// THE DETECTOR, stated so it can be argued with rather than trusted:
//
//   CORPUS      `git ls-files <root>` filtered to .ts .vue .css .mjs — TRACKED
//               files only. Untracked working-tree dirt (four concurrent lanes)
//               cannot move the figure, and neither can a build artefact.
//   RAW         every line of the file.
//   NON-BLANK   a line with at least one non-whitespace character.
//   COMMENT     a NON-BLANK line on which EVERY non-whitespace character lies
//               inside a comment — a `//` line comment, a `/* … */` block
//               (continuation lines counted, which is what `WAVES.md:847` means by
//               "block continuations counted"), or an `<!-- … -->` HTML comment.
//   CODE        NON-BLANK − COMMENT. A line carrying code AND a trailing comment
//               is CODE: the line is load-bearing, and scoring it as prose would
//               flatter the ratio in the direction this wave is trying to cut.
//   SHARE       COMMENT / NON-BLANK.
//
// THE LEXER IS STATEFUL, NOT LINE-LOCAL, because a line-local regex cannot tell
// `*` in a block body from `*` in an expression, and cannot tell `// ` in a string
// literal (`"https://…"`, of which this repo has many) from a comment. TWO kinds of
// state cross a newline and both are carried: a block comment, and a JS TEMPLATE
// LITERAL. Nothing else can — `"…"` and `'…'` cannot span a newline in JS or in
// CSS, so they are line-local by the grammar rather than by approximation, and a
// backtick is a string delimiter in JS only (in CSS it is an ordinary character, so
// carrying one there would swallow arbitrary text on a stray tick).
//
// THE TEMPLATE CARRY IS LOAD-BEARING, not a nicety: this repo keeps its GLSL and
// WGSL shader sources in multi-line template literals, and those shaders are full of
// `//` lines. A shader line is inside a STRING, not inside a comment, so the rule
// above scores it CODE — and it takes cross-line state to see that. MEASURED, not
// asserted: without the carry the instrument contradicts its own printed rule by
// 1,489 lines at `4a86570b` (34,206 comment / 40.2% against 32,717 / 38.4%), and the
// gate pins it — `tests/gates/comment-ratio.test.ts` fails its template arm when the
// carry is cut.
//
// The per-line `"…"` / `'…'` branch decides no verdict on this corpus (deleting it
// moves the figure by 0 at `4a86570b`) and is kept for a different reason, also
// pinned: it stops a `/*` INSIDE a string from opening a phantom block that would
// then swallow the live lines beneath it.
//
// `.vue` is lexed per top-level block: `<template>` as HTML, `<script>` as JS/TS,
// `<style>` as CSS — anchored at column 0, which is the SFC convention the whole
// corpus follows (slot `<template #name>` is always indented, and the one-line
// `<style src="…"></style>` form is handled as a single tag line). A block boundary
// resets the carried template state: an SFC block is its own lexical world.
//
// WHAT THIS DELIBERATELY DOES NOT DO — the approximations, enumerated, because an
// undocumented approximation in a detector is how a figure becomes a lie:
//
//   REGEX LITERALS are not lexed. A `/` opening a regex that contained a bare `//`
//   would be misread — but a regex cannot contain a bare unescaped `//` (that is an
//   empty regex followed by junk), so the class is empty in practice, not merely
//   rare.
//   TEMPLATE INTERPOLATION interiors (`${…}`) are lexed as string content rather
//   than as code, so a line lying wholly inside an interpolation and carrying only
//   a `//` comment would score CODE where a real parser says COMMENT. Measured, not
//   assumed: the class is EMPTY on this corpus (`--audit-interp`, 0 lines).
//   HTML ATTRIBUTE STRINGS are not lexed as strings (see the scanner) — an HTML
//   attribute cannot contain a comment opener that matters, and treating it as a
//   string would break `<div class="a">` spanning lines.
//
// SECOND FIGURE, same command: the PROSE-CLASS census. `G-COMMENT-RATIO`'s
// assertion has two halves — "≤20% of src" AND "no comment names a tranche, wave,
// or round" — and only the second half is checkable line by line. Every hit is
// emitted with its file, line and matched class so the number is a list, never an
// adjective.
//
// USAGE
//   node scripts/comment-census.mjs                 # src, human table
//   node scripts/comment-census.mjs --json          # machine figures
//   node scripts/comment-census.mjs --root demo     # any tracked root
//   node scripts/comment-census.mjs --prose         # the prose-class hit list
//   node scripts/comment-census.mjs --per-file      # every file, share-ranked
//   node scripts/comment-census.mjs --rev HEAD      # the COMMITTED figure, lane-dirt-free
//   node scripts/comment-census.mjs --audit-interp  # the declared approximation, bounded

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { extname } from "node:path";

const EXTENSIONS = new Set([".ts", ".vue", ".css", ".mjs"]);

/** Language modes the lexer knows. `.vue` mixes all three. */
const JS = "js";
const CSS = "css";
const HTML = "html";

const MODE_BY_EXT = {
    ".ts": JS,
    ".mjs": JS,
    ".css": CSS,
    ".vue": HTML,
};

/**
 * Classify one file's lines as BLANK · COMMENT · CODE.
 *
 * Returns a `Uint8Array` parallel to the lines: 0 blank, 1 comment, 2 code. The
 * per-line verdict is kept (rather than only the totals) because the diet needs to
 * point at lines, and because `--per-file` and the prose census both read it.
 */
function classify(text, mode) {
    const lines = text.split("\n");
    const verdict = new Uint8Array(lines.length);
    const modes = new Array(lines.length).fill(mode);

    // Carried across lines: a block comment, and an open template literal.
    let inBlock = false;
    let blockKind = null; // "c" for /* … */, "html" for <!-- … -->
    let quote = null; // only ever "`" here — see scanLine's exit clause

    let vueMode = mode === HTML ? HTML : mode;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (mode === HTML && !inBlock) {
            // `.vue` top-level block switching, column-0 anchored. The tag line
            // itself is ordinary content of the OUTER mode and falls through to
            // the lexer below, so `<style src="…"></style>` scores as code.
            // Either boundary ends the block's lexical world, so a template left
            // open by malformed source cannot leak across it.
            const close = /^<\/(template|script|style)>/.exec(line);
            if (close) {
                vueMode = HTML;
                quote = null;
            }
            const open = /^<(template|script|style)(\s|>)/.exec(line);
            if (open && !new RegExp(`</${open[1]}>`).test(line)) {
                vueMode =
                    open[1] === "script" ? JS : open[1] === "style" ? CSS : HTML;
                verdict[i] = line.trim() === "" ? 0 : 2;
                quote = null;
                continue;
            }
        }

        const active = mode === HTML ? vueMode : mode;
        modes[i] = active;
        const result = scanLine(line, active, inBlock, blockKind, quote);
        inBlock = result.inBlock;
        blockKind = result.blockKind;
        quote = result.quote;
        verdict[i] = result.verdict;
    }

    return { lines, verdict, modes };
}

/**
 * Walk one line character by character in `mode`, carrying block AND string state
 * in and out.
 *
 * `sawComment` / `sawCode` are the whole judgement: a non-blank line is COMMENT iff
 * it produced comment characters and produced no code characters.
 */
function scanLine(line, mode, inBlockIn, blockKindIn, quoteIn) {
    let inBlock = inBlockIn;
    let blockKind = blockKindIn;
    let sawComment = false;
    let sawCode = false;
    let quote = quoteIn ?? null; // `"` `'` `` ` `` — the open string delimiter, if any

    for (let i = 0; i < line.length; i++) {
        const c = line[i];
        const next = line[i + 1];

        if (inBlock) {
            sawComment ||= !/\s/.test(c);
            if (blockKind === "c" && c === "*" && next === "/") {
                inBlock = false;
                blockKind = null;
                sawComment = true;
                i++;
            } else if (
                blockKind === "html" &&
                c === "-" &&
                next === "-" &&
                line[i + 2] === ">"
            ) {
                inBlock = false;
                blockKind = null;
                sawComment = true;
                i += 2;
            }
            continue;
        }

        if (quote) {
            sawCode = true;
            if (c === "\\") {
                i++;
                continue;
            }
            if (c === quote) quote = null;
            continue;
        }

        if (/\s/.test(c)) continue;

        // `//` opens a line comment in JS only. CSS has no line-comment form —
        // scoring `//` as one there would misread a bare `url(//host/x)`.
        if (mode === JS && c === "/" && next === "/") {
            sawComment = true;
            break;
        }
        if ((mode === JS || mode === CSS) && c === "/" && next === "*") {
            inBlock = true;
            blockKind = "c";
            sawComment = true;
            i++;
            continue;
        }
        if (
            mode === HTML &&
            c === "<" &&
            next === "!" &&
            line.slice(i, i + 4) === "<!--"
        ) {
            inBlock = true;
            blockKind = "html";
            sawComment = true;
            i += 3;
            continue;
        }
        // A backtick opens a string in JS ONLY. In CSS it is an ordinary character,
        // and treating it as a delimiter would let a stray tick swallow the rest of
        // a stylesheet once the state carries across lines.
        if (mode === JS && c === "`") {
            quote = c;
            sawCode = true;
            continue;
        }
        if (mode !== HTML && (c === '"' || c === "'")) {
            quote = c;
            sawCode = true;
            continue;
        }
        // HTML attribute strings never contain a comment opener that matters, and
        // treating them as strings would break `<div class="a">` spanning lines.
        sawCode = true;
    }

    const blank = line.trim() === "";
    const verdict = blank ? 0 : sawCode ? 2 : sawComment ? 1 : 2;
    // ONLY a template literal survives a newline. An unterminated `"…"` or `'…'` is
    // a syntax error in both grammars, so carrying one would propagate a typo into
    // the figure instead of confining it to its line.
    return { inBlock, blockKind, verdict, quote: quote === "`" ? "`" : null };
}

/**
 * THE INTERPOLATION APPROXIMATION, MEASURED — `--audit-interp`.
 *
 * The lexer reads a `${…}` interior as string content, so a line lying WHOLLY inside
 * an interpolation and carrying only a comment scores CODE where a real parser says
 * COMMENT. The header declares that class; this is the command that BOUNDS it, because
 * a declared approximation with a re-runnable count is a bound and one without is a
 * hope. It walks the same text with interpolation depth tracked and returns every line
 * the two readings would disagree on.
 *
 * `tpl` is a STACK, one brace-depth per open template, because the nested form really
 * occurs here (`MusicStaff.vue:92`, `useWebGPUCanvas.ts:395`) and a flat flag loses the
 * OUTER template at the inner one's closer. Depth 0 is string content; any greater
 * depth is interpolation CODE, where a comment opener is real.
 */
function interpApproximations(text, mode, file) {
    if (mode !== JS) return [];
    const lines = text.split("\n");
    const hits = [];
    let inBlock = false;
    let quote = null; // `"` or `'`
    const tpl = [];
    const inString = () => tpl.length > 0 && tpl[tpl.length - 1] === 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // The class is lines lying WHOLLY inside an interpolation, so the verdict only
        // counts when the line INHERITED that state rather than opening it.
        const startedInInterp = tpl.length > 0 && !inString();
        let sawComment = false;
        let sawCode = false;

        for (let j = 0; j < line.length; j++) {
            const c = line[j];
            const next = line[j + 1];

            if (inBlock) {
                sawComment ||= !/\s/.test(c);
                if (c === "*" && next === "/") {
                    inBlock = false;
                    sawComment = true;
                    j++;
                }
                continue;
            }
            if (quote) {
                sawCode = true;
                if (c === "\\") j++;
                else if (c === quote) quote = null;
                continue;
            }
            if (inString()) {
                sawCode = true;
                if (c === "\\") j++;
                else if (c === "`") tpl.pop();
                else if (c === "$" && next === "{") {
                    tpl[tpl.length - 1] = 1;
                    j++;
                }
                continue;
            }
            if (/\s/.test(c)) continue;
            if (c === "/" && next === "/") {
                sawComment = true;
                break;
            }
            if (c === "/" && next === "*") {
                inBlock = true;
                sawComment = true;
                j++;
                continue;
            }
            sawCode = true;
            if (c === '"' || c === "'") quote = c;
            else if (c === "`") tpl.push(0);
            else if (tpl.length > 0 && c === "{") tpl[tpl.length - 1]++;
            else if (tpl.length > 0 && c === "}") tpl[tpl.length - 1]--;
        }

        const blank = line.trim() === "";
        const verdict = blank ? 0 : sawCode ? 2 : sawComment ? 1 : 2;
        if (startedInInterp && verdict === 1) {
            hits.push({ file, line: i + 1, text: line.trim() });
        }
    }
    return hits;
}

/**
 * The PROSE CLASSES — `G-COMMENT-RATIO`'s second half made checkable.
 *
 * Each row is a name and the pattern that convicts it. A comment states the
 * contract, the invariant or the trap; it does not state which tranche changed the
 * code, that a rule was followed, or what the code used to be. History lives in
 * git.
 */
const PROSE_CLASSES = [
    ["tranche-id", /\b(?:tranche\s+)?B[A-K]\s*(?:#\d+|tranche)|\btranche\b/i],
    // `Φ` is not a word character, so `\bΦ\d` can never fire — `/\bΦ\d/.test("Φ4")`
    // is `false`. The class had a hole where its own phase ids live. Closing it moves
    // the figure by 0 at `4a86570b` (no comment in `src` carries a phase id today), so
    // it is a KEEP-DEAD lock rather than a cut, and only a fixture can show it fires.
    ["wave-id", /\bW-[A-Z][A-Z0-9-]{2,}\b|\bwave\s+\d|Φ\d/],
    ["round-id", /⊕|\bround\s+\d|\bRT-[A-Za-z0-9]/],
    ["rule-obeyed", /\bclean break\b|\bno alias(?:es)?\b|\bbyte-isomorphic\b/i],
    // The last two alternations are the TOKEN OBITUARY, the form the file-obituary
    // pattern could not reach: a named custom property in the same breath as its own
    // removal — "`--duration-sparkle` (600ms) DELETED with the disco recipe". A live
    // contract says what a token IS; naming one alongside `deleted`/`retired`/
    // `removed` is a sentence about a token that is not there, which is the class
    // `WAVES.md:847` sends to git. Verified on the corpus rather than assumed: the two
    // token alternations convict 30 real obituaries at `4a86570b` (prose 276 with them,
    // 246 without) and nothing that states a contract.
    [
        "obituary",
        /\bdeleted\b.*\bfile\b|\bused to be\b|\bformerly\b|\bwas renamed\b|--[\w-]+[^\n]*\b(?:deleted|retired|removed)\b|\b(?:deleted|retired|removed)\b[^\n]*--[\w-]+/i,
    ],
];

function proseHits(lines, verdict, file) {
    const hits = [];
    for (let i = 0; i < lines.length; i++) {
        if (verdict[i] !== 1) continue;
        for (const [name, pattern] of PROSE_CLASSES) {
            if (pattern.test(lines[i])) {
                hits.push({ file, line: i + 1, class: name, text: lines[i].trim() });
                break;
            }
        }
    }
    return hits;
}

/**
 * COMMENTED-OUT DECLARATIONS — `G-DETECTOR-BLIND`'s fuel, counted.
 *
 * The arm's assertion is "no source-scanning gate counts a commented-out
 * declaration as live", and `WAVES.md:847` names the mechanism: *prose currently
 * defeats the detectors*. Sixty-five gate files read product source and each rolls
 * its own matcher; auditing all sixty-five is an apparatus, and half of them read
 * text where the question does not arise. The corpus side is one measurement and it
 * removes the FUEL rather than policing the fire — a commented-out declaration that
 * does not exist cannot be scored live by any matcher, stripping or not.
 *
 * Convicting form, deliberately narrow so a false positive is close to impossible:
 * a COMMENT line, in CSS lexical context (a `.css` file or an SFC `<style>` block),
 * whose text is a complete declaration — a custom property, or a lowercase-hyphen
 * property with a value, terminated by `;`. English prose does not end in a
 * semicolon after a lowercase colon-separated head.
 */
const DEAD_DECL = /^(--[\w-]+\s*:\s*\S[^;]*;|[a-z][a-z-]*\s*:\s*\S[^;{}]*;)$/;

function deadDeclarations(lines, verdict, modes, file) {
    const hits = [];
    for (let i = 0; i < lines.length; i++) {
        if (verdict[i] !== 1 || modes[i] !== CSS) continue;
        // Strip the comment delimiters the line is wrapped in before matching.
        const bare = lines[i]
            .replace(/\/\*+/g, "")
            .replace(/\*+\//g, "")
            .replace(/^\s*\*+/, "")
            .trim();
        if (DEAD_DECL.test(bare)) hits.push({ file, line: i + 1, text: bare });
    }
    return hits;
}

/**
 * The contiguous JS-mode line runs of an already-classified file.
 *
 * A `.ts`/`.mjs` file is one run; an SFC is one run per `<script>` block, tag lines
 * excluded. The interpolation probe needs real JS text, and a `.vue` file joined
 * end to end is not that.
 */
function jsRuns(lines, modes) {
    const runs = [];
    let start = -1;
    for (let i = 0; i <= lines.length; i++) {
        const isJs = i < lines.length && modes[i] === JS;
        if (isJs && start < 0) start = i;
        if (!isJs && start >= 0) {
            runs.push({ offset: start, text: lines.slice(start, i).join("\n") });
            start = -1;
        }
    }
    return runs;
}

function tracked(root, rev) {
    const args = rev
        ? ["ls-tree", "-r", "-z", "--name-only", rev, "--", root]
        : ["ls-files", "-z", "--", root];
    const out = execFileSync("git", args, {
        encoding: "utf8",
        maxBuffer: 64 * 1024 * 1024,
    });
    return out
        .split("\0")
        .filter(Boolean)
        .filter((f) => EXTENSIONS.has(extname(f)));
}

/**
 * Read every path at a COMMITTED revision, in one `git cat-file --batch`.
 *
 * ⊕⁷⁴'s L-1 is the lesson this exists for: a figure measured on the working tree of
 * a four-lane shared checkout is contaminated by whichever lane last saved. A
 * committed figure must name the tree it was taken on, and be re-derivable there by
 * anyone, forever. `--rev` is that mode; the default working-tree read stays, because
 * the GATE has to judge the bytes a build would actually ship.
 */
function readAtRev(rev, files) {
    const input = files.map((f) => `${rev}:${f}`).join("\n") + "\n";
    const raw = execFileSync("git", ["cat-file", "--batch"], {
        input,
        maxBuffer: 512 * 1024 * 1024,
    });
    const out = new Map();
    let at = 0;
    for (const file of files) {
        const nl = raw.indexOf(0x0a, at);
        const header = raw.toString("utf8", at, nl);
        at = nl + 1;
        const parts = header.split(" ");
        if (parts[1] !== "blob") {
            // `missing` — the path is in the tree listing but not resolvable.
            continue;
        }
        const size = Number(parts[2]);
        out.set(file, raw.toString("utf8", at, at + size));
        at += size + 1;
    }
    return out;
}

export function census(root = "src", rev = null) {
    const files = tracked(root, rev);
    const blobs = rev ? readAtRev(rev, files) : null;
    const perFile = [];
    const hits = [];
    const dead = [];
    // A TRACKED path can be absent from the working tree — a concurrent lane's
    // delete, staged or not. Skipping it silently would let the denominator drift
    // without a word, so the omission is a REPORTED figure and the census says so
    // in its own output. It is never an allowlist: the paths come back the moment
    // they are on disk.
    const missing = [];
    const interp = [];
    let raw = 0;
    let nonBlank = 0;
    let comment = 0;

    for (const file of files) {
        if (blobs ? !blobs.has(file) : !existsSync(file)) {
            missing.push(file);
            continue;
        }
        const text = blobs ? blobs.get(file) : readFileSync(file, "utf8");
        const mode = MODE_BY_EXT[extname(file)];
        const { lines, verdict, modes } = classify(text, mode);
        // A trailing newline yields one empty final element; it is blank either
        // way, so RAW counts lines-of-text, not split length.
        const fileRaw = text.endsWith("\n") ? lines.length - 1 : lines.length;
        let fileNonBlank = 0;
        let fileComment = 0;
        for (let i = 0; i < verdict.length; i++) {
            if (verdict[i] === 0) continue;
            fileNonBlank++;
            if (verdict[i] === 1) fileComment++;
        }
        raw += fileRaw;
        nonBlank += fileNonBlank;
        comment += fileComment;
        perFile.push({
            file,
            raw: fileRaw,
            nonBlank: fileNonBlank,
            comment: fileComment,
            code: fileNonBlank - fileComment,
            share: fileNonBlank ? fileComment / fileNonBlank : 0,
        });
        hits.push(...proseHits(lines, verdict, file));
        dead.push(...deadDeclarations(lines, verdict, modes, file));
        for (const run of jsRuns(lines, modes)) {
            for (const hit of interpApproximations(run.text, JS, file)) {
                interp.push({ ...hit, line: hit.line + run.offset });
            }
        }
    }

    return {
        root,
        rev,
        files: files.length - missing.length,
        tracked: files.length,
        missing,
        raw,
        nonBlank,
        comment,
        code: nonBlank - comment,
        share: nonBlank ? comment / nonBlank : 0,
        perFile,
        prose: hits,
        dead,
        interp,
    };
}

/**
 * The detector, applied to one string — the seam the gate's fixtures drive.
 *
 * J-10 asks that the numerator NAME its detector. A named detector nobody can run
 * against a known input is still a narration, so this is the same `classify` the
 * census uses, reachable with an extension instead of a path.
 */
export function classifyText(text, ext) {
    const mode = MODE_BY_EXT[ext];
    if (!mode) throw new Error(`comment-census: no lexer for "${ext}"`);
    const { lines, verdict, modes } = classify(text, mode);
    let nonBlank = 0;
    let comment = 0;
    for (const v of verdict) {
        if (v === 0) continue;
        nonBlank++;
        if (v === 1) comment++;
    }
    return {
        nonBlank,
        comment,
        code: nonBlank - comment,
        dead: deadDeclarations(lines, verdict, modes, "<inline>"),
        prose: proseHits(lines, verdict, "<inline>"),
    };
}

/** Roll a census up by directory prefix, for the table `WAVES.md:847` prints. */
export function byPrefix(result, prefixes) {
    return prefixes.map((prefix) => {
        const rows = result.perFile.filter((r) => r.file.startsWith(prefix));
        const nonBlank = rows.reduce((n, r) => n + r.nonBlank, 0);
        const comment = rows.reduce((n, r) => n + r.comment, 0);
        return {
            prefix,
            files: rows.length,
            nonBlank,
            comment,
            code: nonBlank - comment,
            share: nonBlank ? comment / nonBlank : 0,
        };
    });
}

const pct = (n) => `${(n * 100).toFixed(1)}%`;

function main(argv) {
    const root =
        argv.includes("--root") ? argv[argv.indexOf("--root") + 1] : "src";
    const rev = argv.includes("--rev") ? argv[argv.indexOf("--rev") + 1] : null;
    const result = census(root, rev);

    if (argv.includes("--json")) {
        const { perFile, prose, dead, missing, interp, ...totals } = result;
        process.stdout.write(
            `${JSON.stringify(
                {
                    ...totals,
                    missing: missing.length,
                    proseHits: prose.length,
                    deadDeclarations: dead.length,
                    interpApproximations: interp.length,
                    ...(argv.includes("--per-file") ? { perFile } : {}),
                    ...(argv.includes("--prose") ? { prose } : {}),
                    ...(argv.includes("--dead") ? { dead } : {}),
                    ...(argv.includes("--audit-interp") ? { interp } : {}),
                },
                null,
                2,
            )}\n`,
        );
        return;
    }

    if (argv.includes("--audit-interp")) {
        for (const hit of result.interp) {
            process.stdout.write(`${hit.file}:${hit.line}  ${hit.text}\n`);
        }
        process.stdout.write(
            `\ninterpolation-interior comment lines — the declared approximation's ` +
                `MAGNITUDE, scored CODE by the census: ${result.interp.length}\n`,
        );
        return;
    }

    if (argv.includes("--dead")) {
        for (const hit of result.dead) {
            process.stdout.write(`${hit.file}:${hit.line}  ${hit.text}\n`);
        }
        process.stdout.write(
            `\ncommented-out declarations: ${result.dead.length}\n`,
        );
        return;
    }

    if (argv.includes("--prose")) {
        for (const hit of result.prose) {
            process.stdout.write(
                `${hit.file}:${hit.line}  [${hit.class}]  ${hit.text}\n`,
            );
        }
        process.stdout.write(`\nprose-class hits: ${result.prose.length}\n`);
        return;
    }

    if (argv.includes("--per-file")) {
        const rows = [...result.perFile].sort((a, b) => b.comment - a.comment);
        for (const r of rows) {
            process.stdout.write(
                `${String(r.comment).padStart(5)} / ${String(r.nonBlank).padEnd(
                    6,
                )} ${pct(r.share).padStart(6)}  ${r.file}\n`,
            );
        }
        return;
    }

    const prefixes = [
        `${root}/`,
        `${root}/components/`,
        `${root}/components/dock/`,
        `${root}/styles/`,
        `${root}/styles/tokens/`,
    ];
    process.stdout.write(
        "detector: tracked .ts/.vue/.css/.mjs; COMMENT = a non-blank line whose every\n" +
            "non-whitespace character lies inside //, /* */ or <!-- --> (continuations counted);\n" +
            "CODE = non-blank minus comment; share = comment / non-blank.\n\n",
    );
    process.stdout.write(
        `${"directory".padEnd(28)}${"files".padStart(6)}${"non-blank".padStart(
            11,
        )}${"comment".padStart(9)}${"code".padStart(8)}${"share".padStart(8)}\n`,
    );
    for (const row of byPrefix(result, prefixes)) {
        process.stdout.write(
            `${row.prefix.padEnd(28)}${String(row.files).padStart(6)}${String(
                row.nonBlank,
            ).padStart(11)}${String(row.comment).padStart(9)}${String(
                row.code,
            ).padStart(8)}${pct(row.share).padStart(8)}\n`,
        );
    }
    process.stdout.write(
        `\n${root}${rev ? ` @ ${rev}` : " (working tree)"}: ${result.files} files · ${result.raw} raw · ${result.nonBlank} non-blank · ` +
            `${result.comment} comment · ${result.code} code · ${pct(result.share)}\n` +
            `prose-class hits (tranche/wave/round/rule-obeyed/obituary): ${result.prose.length}\n` +
            `commented-out declarations (G-DETECTOR-BLIND fuel): ${result.dead.length}\n` +
            (result.missing.length
                ? `tracked-but-absent from the working tree, EXCLUDED from every figure ` +
                  `above: ${result.missing.length}\n${result.missing.map((f) => `  ${f}`).join("\n")}\n`
                : ""),
    );
}

if (import.meta.url === `file://${process.argv[1]}`) main(process.argv.slice(2));
