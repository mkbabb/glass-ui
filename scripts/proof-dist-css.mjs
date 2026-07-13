// proof-dist-css.mjs — the dist/styles CSS parse + url() safety gate (GC2),
// PLUS the SOURCE-SIDE comment-balance + fold-anchor harden (BC.W-DIST-COMMENT-FIX).
//
// The 4.0.0 prepublish gate (`build && test`) had NO check that the emitted
// dist CSS was syntactically valid or bundler-safe. Two distinct bug classes
// shipped silently to npm:
//
//   1. COMMENT-BUG (unterminated-string class). vite.style-assets.ts injected
//      an @import fold-comment by locating the `@source` at-rule via a bare
//      `indexOf` that matched the PROSE mention of `@source` inside a block
//      comment first. The injected comment-close `*/` prematurely terminated
//      the outer prose comment, orphaning the remaining prose as live CSS — the
//      apostrophe in the prose became an unterminated string token. Every
//      consumer's Tailwind v4 build failed. Fix: `atSourceIndex()` anchors on
//      the real at-rule (line-start `/^[ \t]*@source\b/m`). This guard catches
//      the class structurally: `lightningcss.transform` with `errorRecovery:
//      false` throws on any unterminated string/comment-nesting error — the
//      parse would have caught the shipped bug.
//
//   2. GLASS-REFRACT url() class (bundler-hostile). The split `--glass-refract-
//      filter` property was authored as `url("HEAD") 28 url("TAIL")` where TAIL
//      started with a bare quote character. Vite/postcss url()-rewriters treat
//      any `url("…")` whose content is not `data:` / `#` / `http` as a
//      RELATIVE FILE PATH and attempt to resolve it at build time — triggering
//      `ENOENT: open '"'` in every consumer build. Fix: ONE complete
//      `url("data:image/svg+xml,…")` token (data: URIs are skipped by
//      url()-rewriters). This guard catches the class: after comment-stripping,
//      every `url()` token in the emitted dist must resolve to `data:`, `#`, or
//      `http` — any relative/bare path is a violation.
//
// GUARD STRATEGY
//
//   (a) CSS PARSE — every dist/styles/**/*.css is parsed by `lightningcss` with
//       `errorRecovery: false`. A syntax error (unterminated string, malformed
//       at-rule body, etc.) throws a `SyntaxError` with file + location — the
//       gate captures that as a violation. lightningcss is the same engine
//       Tailwind v4 uses; a parse here = a parse in a consumer's Tailwind build.
//
//   (b) URL-SAFETY SCAN — after lightningcss parses the file, we walk the
//       comment-stripped CSS for `url()` tokens and reject any value that is not:
//         - `data:…`  (inline asset — rewriter-safe)
//         - `#…`      (SVG fragment reference — rewriter-safe)
//         - `http…`   (absolute URL — rewriter-safe)
//       A relative or bare value (e.g. `../fonts/foo.woff2`, `'HEAD'`) is a
//       rewriter-hostile violation. The scan is post-parse: if the file parses
//       cleanly, the url() values in the output are the VALUES lightningcss
//       normalised — a reliable surface to inspect.
//
//   (c) SOURCE-SIDE COMMENT-BALANCE (BC.W-DIST-COMMENT-FIX harden, DC3). (a)/(b)
//       catch the bug in the EMITTED dist (after the build); (c) catches it
//       BEFORE the build, at the SOURCE. Every src/styles/**/*.css is walked by a
//       STATEFUL comment-tokenizer (NOT a naive `/\*` vs `*/` regex count — those
//       false-fire on a JSDoc `* theme/*.css` line or a `*/` inside a string,
//       both of which appear in the real cascade). A block comment left UNCLOSED
//       at EOF (or an unterminated string at EOF) is the imbalance that, once the
//       vite fold injects its comment-close, poisons the downstream prose — the
//       root cause of the apostrophe-as-unterminated-string class, caught at the
//       source. CSS comments do NOT nest, so the tokenizer treats any `/*` already
//       inside a comment as literal text — the only real failure is an unclosed
//       comment / unterminated string at EOF.
//
//   (d) FOLD-ANCHOR CONFIRM (BC.W-DIST-COMMENT-FIX confirm, DC4). vite.style-
//       assets.ts MUST anchor the @import fold-injection on the line-start
//       `atSourceIndex` regex (`/^[ \t]*@source\b/m`), NOT a bare
//       `indexOf("@source")` that matches the PROSE mention inside the comment
//       block first (the exact 4.0.0 bug). A regression to an `indexOf("@source")`
//       fold-injection REDs. This is a CONFIRM clause — the 4.0.1 hotfix landed
//       the anchor; the gate makes a future un-fix impossible.
//
//   The cross-repo convergence (the speedtest fleet's vite.style-assets.ts fix and
//   glass-ui's 4.0.1 atSourceIndex fix are the SAME root fix) is recorded in
//   docs/tranches/BC/coordination/dist-comment-converge.md — the no-silent-drop
//   ledger. The unterminated-string class is now closed at all THREE layers: the
//   SOURCE (c)/(d), the emitted DIST (a)/(b), and the consumer BUILD (the fleet's
//   green npm run build, the EXECUTION-phase witness).
//
// SCOPE
//   Pure function of dist/styles/**/*.css + src/styles/**/*.css + the
//   vite.style-assets.ts source — no sibling checkout, no network, no browser.
//   Runs identically on a dev machine and a clean CI runner. Tags: local + ci +
//   release (the build step runs first in the gates matrix, guaranteeing dist/ is
//   fresh before this gate executes). Fast: a full parse pass over ~90 files
//   finishes in < 200 ms.
//
// SELF-TEST — The guard runs synthetic bad-CSS/bad-source fixtures as a born-RED
// inline self-test every invocation (the proof:fail-explicit / comment-strip
// house pattern, per proof-gate-manifest-sound precedent). If the detector
// mis-fires and does NOT catch a class, the guard aborts loudly — never silently
// reports 0 violations on a broken detector. Fixtures: A unterminated string
// (parse), B relative url() (url-safety), C safe data: url() (anti-false-positive),
// D unclosed source comment (DC3), E synthetic `indexOf("@source")` fold (DC4).

import { readdirSync, readFileSync, statSync } from "node:fs";
import { resolve, relative } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const require_ = createRequire(import.meta.url);
const lc = require_("lightningcss");

const DIST_STYLES = resolve(ROOT, "dist/styles");
const SRC_STYLES = resolve(ROOT, "src/styles");
// B0 STYLE-REDRAIN carved the fold-injection anchor into vite.style-fold.ts
// (atSourceIndex exported there; vite.utility-emit.ts consumes it). DC4 follows
// the carve — the anchor home is the fold module, not the assets emitter.
const VITE_STYLE_ASSETS = resolve(ROOT, "vite.style-fold.ts");
const COMMAND = "npm run proof:dist-css";

// ── helpers ────────────────────────────────────────────────────────────────

/** Recursively collect all *.css files under `dir`. */
function walkCss(dir) {
    const out = [];
    for (const entry of readdirSync(dir)) {
        const full = resolve(dir, entry);
        if (statSync(full).isDirectory()) out.push(...walkCss(full));
        else if (entry.endsWith(".css")) out.push(full);
    }
    return out.sort();
}

/**
 * Strip block comments (`/* … *\/`) from CSS text.
 * Returns the comment-free text (preserving byte positions for url() matching).
 */
function stripComments(css) {
    return css.replace(/\/\*[\s\S]*?\*\//g, (m) => " ".repeat(m.length));
}

// ── detection ──────────────────────────────────────────────────────────────

/**
 * url()-SAFE PREDICATE. A url() value is safe when it is:
 *   - a data: URI         → rewriter skips it
 *   - a # fragment ref    → SVG filter / gradient fragment; rewriter skips it
 *   - an http(s): URL     → absolute; rewriter skips it
 * Anything else (relative path, bare quoted string) is bundler-hostile.
 */
function isSafeUrlValue(raw) {
    // raw is the content inside url(…) after stripping outer quotes.
    return (
        raw.startsWith("data:") ||
        raw.startsWith("#") ||
        raw.startsWith("http://") ||
        raw.startsWith("https://")
    );
}

/**
 * Scan a comment-stripped CSS string for url() tokens. Returns an array of
 * {value, context} objects for any url() whose value is NOT safe.
 */
function unsafeUrls(stripped) {
    const violations = [];
    // Match url("…"), url('…'), or url(…) — tolerant of whitespace.
    const URL_RE = /\burl\s*\(\s*(?:"([^"]*)"|'([^']*)'|([^)\s]*))\s*\)/g;
    let m;
    while ((m = URL_RE.exec(stripped)) !== null) {
        const raw = (m[1] ?? m[2] ?? m[3] ?? "").trim();
        if (!isSafeUrlValue(raw)) {
            const start = Math.max(0, m.index - 40);
            const ctx = stripped.slice(start, m.index + m[0].length + 40).replace(/\s+/g, " ").trim();
            violations.push({ value: raw, context: ctx });
        }
    }
    return violations;
}

/**
 * Run both checks on a single CSS file. Returns an array of violation strings.
 */
function checkFile(filePath, css) {
    const rel = relative(DIST_STYLES, filePath);
    const violations = [];

    // (a) Syntax parse via lightningcss.
    try {
        lc.transform({
            filename: filePath,
            code: typeof css === "string" ? Buffer.from(css) : css,
            minify: false,
            errorRecovery: false,
        });
    } catch (e) {
        const loc = e.loc ? ` (line ${e.loc.line}, col ${e.loc.column})` : "";
        violations.push(
            `[parse-error] ${rel}${loc}: ${e.message}`,
        );
        // A parse failure means subsequent url() scan is unreliable; skip it.
        return violations;
    }

    // (b) url()-safety scan on comment-stripped text.
    const stripped = stripComments(
        typeof css === "string" ? css : css.toString("utf8"),
    );
    for (const { value, context } of unsafeUrls(stripped)) {
        violations.push(
            `[unsafe-url] ${rel}: url("${value}") is not data:/# /http — bundler url()-rewriters will try to resolve it as a file path (context: …${context}…)`,
        );
    }

    return violations;
}

// ── source-side comment-balance (DC3) ──────────────────────────────────────

/**
 * STATEFUL comment-balance scan. CSS comments do NOT nest and `/*` / `*\/`
 * substrings appear legitimately inside JSDoc-style prose (`* theme/*.css`) and
 * inside string literals (`url("…*\/…")`), so a naive `/\*` vs `*\/` regex count
 * false-fires. The tokenizer walks char-by-char tracking `inComment`/`inString`,
 * so only a block comment / string left OPEN at EOF is reported.
 *
 * Returns { unclosedComment, commentStartLine, unterminatedString }.
 */
function commentBalance(css) {
    let i = 0;
    const n = css.length;
    let inComment = false;
    let inString = false;
    let quote = "";
    let line = 1;
    let commentStartLine = 0;
    let stringStartLine = 0;
    while (i < n) {
        const c = css[i];
        const c2 = css[i + 1];
        if (c === "\n") line++;
        if (inComment) {
            if (c === "*" && c2 === "/") {
                inComment = false;
                i += 2;
                continue;
            }
            i++;
            continue;
        }
        if (inString) {
            if (c === "\\") {
                i += 2;
                continue;
            }
            if (c === quote) {
                inString = false;
                quote = "";
            }
            i++;
            continue;
        }
        if (c === "/" && c2 === "*") {
            inComment = true;
            commentStartLine = line;
            i += 2;
            continue;
        }
        if (c === '"' || c === "'") {
            inString = true;
            quote = c;
            stringStartLine = line;
            i++;
            continue;
        }
        i++;
    }
    return {
        unclosedComment: inComment,
        commentStartLine: inComment ? commentStartLine : 0,
        unterminatedString: inString,
        stringStartLine: inString ? stringStartLine : 0,
    };
}

/**
 * DC3 — scan every src/styles/**\/*.css for comment-balance. Returns an array of
 * violation strings (an unclosed comment / unterminated string at EOF is the
 * imbalance that poisons the downstream prose once the vite fold injects).
 */
function checkSourceComments() {
    const violations = [];
    if (!statSync(SRC_STYLES, { throwIfNoEntry: false })?.isDirectory()) {
        // src/styles is the repo source — its absence is itself a violation.
        violations.push(`[source-missing] src/styles/ does not exist`);
        return { violations, filesScanned: 0 };
    }
    const files = walkCss(SRC_STYLES);
    for (const f of files) {
        const css = readFileSync(f, "utf8");
        const rel = relative(ROOT, f);
        const bal = commentBalance(css);
        if (bal.unclosedComment) {
            violations.push(
                `[source-comment-imbalance] ${rel}: a /* block comment opened at line ${bal.commentStartLine} is never closed (*/) before EOF — an unclosed comment lets the vite @import fold-injection orphan the downstream prose as live CSS (the unterminated-string class).`,
            );
        }
        if (bal.unterminatedString) {
            violations.push(
                `[source-string-imbalance] ${rel}: a string literal opened at line ${bal.stringStartLine} is never closed before EOF.`,
            );
        }
    }
    return { violations, filesScanned: files.length };
}

// ── source-side fold-anchor confirm (DC4) ──────────────────────────────────

/**
 * DC4 — confirm vite.style-assets.ts anchors the @import fold-injection on the
 * line-start `atSourceIndex` regex (`/^[ \t]*@source\b/m`), NOT a bare
 * `indexOf("@source")` that matches the prose mention inside a comment block
 * first (the 4.0.0 bug). Returns violation strings.
 *
 * Accepts an optional `src` override so the self-test can feed a synthetic
 * `indexOf("@source")`-fold source and prove the detector bites.
 */
function checkAtSourceAnchor(src) {
    const violations = [];
    let text = src;
    if (text === undefined) {
        if (!statSync(VITE_STYLE_ASSETS, { throwIfNoEntry: false })?.isFile()) {
            violations.push(`[fold-anchor-missing] vite.style-assets.ts does not exist`);
            return violations;
        }
        text = readFileSync(VITE_STYLE_ASSETS, "utf8");
    }
    // Strip block comments so the prose mention of `indexOf` (in the atSourceIndex
    // docstring) is not mistaken for a live fold-injection call.
    const code = stripComments(text);

    // The line-start anchor regex MUST be present in the live code.
    const hasLineStartAnchor = /\/\^\[ \\t\]\*@source\\b\/m/.test(code);
    if (!hasLineStartAnchor) {
        violations.push(
            `[fold-anchor-regression] vite.style-assets.ts no longer carries the line-start fold anchor (/^[ \\t]*@source\\b/m) — without it the @import fold-injection can land inside a comment block's prose mention of @source (the 4.0.0 unterminated-string bug).`,
        );
    }

    // A bare indexOf("@source") / indexOf('@source') in LIVE code is the
    // regressed fold-injection form (the prose-matching bug). Forbidden.
    const BARE_INDEXOF = /\.indexOf\(\s*["'`]@source\b/;
    if (BARE_INDEXOF.test(code)) {
        violations.push(
            `[fold-anchor-indexof] vite.style-assets.ts uses a bare indexOf("@source") for the @import fold-injection — that matches the PROSE mention inside the comment block FIRST and slices the injection into an open comment (the 4.0.0 bug). Anchor on the line-start at-rule via atSourceIndex (/^[ \\t]*@source\\b/m) instead.`,
        );
    }
    return violations;
}

// ── self-test (inline, runs every invocation) ──────────────────────────────

function runSelfTest() {
    const selfFails = [];

    // Fixture A — unterminated string (the apostrophe-in-prose bug class).
    const fixtureA = "it's broken text outside any rule";
    const errorsA = checkFile("_self-test-A.css", Buffer.from(fixtureA));
    if (!errorsA.some((v) => v.includes("parse-error"))) {
        selfFails.push(
            "SELF-TEST A FAILED: unterminated-string fixture was NOT caught by the parse check — the parse arm is not load-bearing",
        );
    }

    // Fixture B — relative url() (the glass-refract bundler-hostile class).
    const fixtureB = ".a { background: url('../fonts/foo.woff2'); }";
    const errorsB = checkFile("_self-test-B.css", Buffer.from(fixtureB));
    if (!errorsB.some((v) => v.includes("unsafe-url"))) {
        selfFails.push(
            "SELF-TEST B FAILED: relative url() fixture was NOT caught by the url()-safety scan — the url() arm is not load-bearing",
        );
    }

    // Fixture C — safe data: url() must NOT be flagged (anti-false-positive).
    const fixtureC = ".a { filter: url(\"data:image/svg+xml,%3Csvg%3E%3C/svg%3E#id\"); }";
    const errorsC = checkFile("_self-test-C.css", Buffer.from(fixtureC));
    if (errorsC.length > 0) {
        selfFails.push(
            `SELF-TEST C FAILED: a safe data: url() was incorrectly flagged (false positive): ${errorsC.join("; ")}`,
        );
    }

    // Fixture D — DC3 source-side: an UNCLOSED block comment (the @source prose
    // mention an indexOf fold would slice). The stateful tokenizer must report it.
    const fixtureD = "/* BA.W-EMISSION — re-pointed the @source glob, the apostrophe's here\n.a { color: red; }";
    const balD = commentBalance(fixtureD);
    if (!balD.unclosedComment) {
        selfFails.push(
            "SELF-TEST D FAILED: an unclosed source comment was NOT caught by commentBalance() — the DC3 source-side arm is not load-bearing",
        );
    }
    // Fixture D' — a WELL-FORMED comment with a `@source` prose mention + an
    // apostrophe inside it must NOT be flagged (anti-false-positive — this is the
    // real index.css shape).
    const fixtureDok = "/* re-pointed the @source glob; the apostrophe's fine */\n.a { color: red; }";
    const balDok = commentBalance(fixtureDok);
    if (balDok.unclosedComment || balDok.unterminatedString) {
        selfFails.push(
            "SELF-TEST D' FAILED: a well-formed comment with a @source prose mention was incorrectly flagged (false positive)",
        );
    }

    // Fixture E — DC4 source-side: a synthetic `indexOf("@source")` fold-injection
    // (the regressed form) must RED.
    const fixtureE = 'const sourceAt = indexSrc.indexOf("@source");';
    const errorsE = checkAtSourceAnchor(fixtureE);
    if (!errorsE.some((v) => v.includes("fold-anchor-indexof"))) {
        selfFails.push(
            "SELF-TEST E FAILED: a synthetic indexOf(\"@source\") fold was NOT caught by checkAtSourceAnchor() — the DC4 anchor-confirm arm is not load-bearing",
        );
    }
    // Fixture E' — the line-start anchor form must NOT be flagged.
    const fixtureEok = "const m = /^[ \\t]*@source\\b/m.exec(css);";
    const errorsEok = checkAtSourceAnchor(fixtureEok);
    if (errorsEok.length > 0) {
        selfFails.push(
            `SELF-TEST E' FAILED: the line-start anchor form was incorrectly flagged (false positive): ${errorsEok.join("; ")}`,
        );
    }

    return selfFails;
}

// ── main ───────────────────────────────────────────────────────────────────

export function detect() {
    const violations = [];
    const facts = {};

    // 0. Self-test — must pass before we claim any gate result.
    const selfFails = runSelfTest();
    facts.selfTestPassed = selfFails.length === 0;
    for (const f of selfFails) violations.push(f);

    // 1. Collect dist CSS files.
    if (!statSync(DIST_STYLES, { throwIfNoEntry: false })?.isDirectory()) {
        violations.push(
            `[missing-dist] dist/styles/ does not exist — run \`npm run build\` first`,
        );
        facts.filesScanned = 0;
        return { facts, violations };
    }
    const files = walkCss(DIST_STYLES);
    facts.filesScanned = files.length;

    if (files.length === 0) {
        violations.push(
            `[empty-dist] dist/styles/ contains no .css files — run \`npm run build\` first`,
        );
        return { facts, violations };
    }

    // 2. Check each dist file (DC1 parse + DC2 url-safety).
    const parseErrors = [];
    const urlViolations = [];
    for (const f of files) {
        const css = readFileSync(f);
        const fileViolations = checkFile(f, css);
        for (const v of fileViolations) {
            if (v.startsWith("[parse-error]")) parseErrors.push(v);
            else urlViolations.push(v);
            violations.push(v);
        }
    }
    facts.parseErrors = parseErrors.length;
    facts.unsafeUrlViolations = urlViolations.length;

    // 3. DC3 — SOURCE-SIDE comment-balance over src/styles/**/*.css.
    const { violations: sourceCommentViolations, filesScanned: srcScanned } =
        checkSourceComments();
    facts.sourceFilesScanned = srcScanned;
    facts.sourceCommentViolations = sourceCommentViolations.length;
    for (const v of sourceCommentViolations) violations.push(v);

    // 4. DC4 — fold-anchor confirm over vite.style-assets.ts.
    const foldAnchorViolations = checkAtSourceAnchor();
    facts.foldAnchorViolations = foldAnchorViolations.length;
    for (const v of foldAnchorViolations) violations.push(v);

    return { facts, violations };
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_DIST_CSS_ARTIFACT",
        "GC2-dist-css",
    );

    const { facts, violations } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: COMMAND,
        facts,
        violations,
    });

    console.log("proof:dist-css — dist/styles CSS parse + url() safety gate (GC2) + source-side comment-balance harden (BC.W-DIST-COMMENT-FIX)");
    console.log(`  self-test        : ${facts.selfTestPassed ? "PASS" : "FAIL"}  (5 bites: parse / url / data-safe / DC3 source-comment / DC4 fold-anchor)`);
    console.log(`  dist files scanned: ${facts.filesScanned ?? 0}`);
    console.log(`  DC1 parse errors  : ${facts.parseErrors ?? 0}  (catches comment/unterminated-string class)`);
    console.log(`  DC2 unsafe url()  : ${facts.unsafeUrlViolations ?? 0}  (catches bundler-hostile url() class)`);
    console.log(`  src files scanned : ${facts.sourceFilesScanned ?? 0}`);
    console.log(`  DC3 src comments  : ${facts.sourceCommentViolations ?? 0}  (catches source-side comment imbalance before the build)`);
    console.log(`  DC4 fold anchor   : ${facts.foldAnchorViolations ?? 0}  (confirms vite.style-assets.ts atSourceIndex line-start anchor, not bare indexOf)`);

    if (violations.length) {
        console.error("\nVIOLATIONS:");
        for (const v of violations) console.error(`  x ${v}`);
        console.error(
            "\n  To fix a parse error: ensure the vite build emits syntactically valid CSS" +
            " (see vite.style-assets.ts atSourceIndex — the comment-injection anchor)." +
            "\n  To fix an unsafe url(): use a data: URI, #fragment, or https: URL in the" +
            " dist CSS — never a relative/bare path (consumer bundlers will try to resolve it)." +
            "\n  To fix a source-comment imbalance (DC3): close every /* with a matching */ in" +
            " src/styles/**/*.css — an unclosed comment poisons the downstream prose once the fold injects." +
            "\n  To fix a fold-anchor regression (DC4): anchor the @import fold-injection on the" +
            " line-start atSourceIndex regex (/^[ \\t]*@source\\b/m), never a bare indexOf(\"@source\").",
        );
    }

    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${relative(ROOT, ARTIFACT)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
