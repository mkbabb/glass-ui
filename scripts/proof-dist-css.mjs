// proof-dist-css.mjs — the dist/styles CSS parse + url() safety gate (GC2).
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
// SCOPE
//   Pure function of dist/styles/**/*.css — no sibling checkout, no network, no
//   browser. Runs identically on a dev machine and a clean CI runner. Tags:
//   local + ci + release (the build step runs first in the gates matrix,
//   guaranteeing dist/ is fresh before this gate executes). Fast: a full parse
//   pass over ~84 files finishes in < 200 ms.
//
// SELF-TEST — The guard runs two synthetic bad-CSS fixtures as a born-RED
// inline self-test every invocation (the proof:fail-explicit / comment-strip
// house pattern, per proof-gate-manifest-sound precedent). If the detector
// mis-fires and does NOT catch either class, the guard aborts loudly — never
// silently reports 0 violations on a broken detector.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { resolve, relative } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const require_ = createRequire(import.meta.url);
const lc = require_("lightningcss");

const DIST_STYLES = resolve(ROOT, "dist/styles");
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

    // 2. Check each file.
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

    console.log("proof:dist-css — dist/styles CSS parse + url() safety gate (GC2)");
    console.log(`  self-test   : ${facts.selfTestPassed ? "PASS" : "FAIL"}`);
    console.log(`  files scanned: ${facts.filesScanned ?? 0}`);
    console.log(`  parse errors : ${facts.parseErrors ?? 0}  (catches comment/unterminated-string class)`);
    console.log(`  unsafe url() : ${facts.unsafeUrlViolations ?? 0}  (catches bundler-hostile url() class)`);

    if (violations.length) {
        console.error("\nVIOLATIONS:");
        for (const v of violations) console.error(`  x ${v}`);
        console.error(
            "\n  To fix a parse error: ensure the vite build emits syntactically valid CSS" +
            " (see vite.style-assets.ts atSourceIndex — the comment-injection anchor)." +
            "\n  To fix an unsafe url(): use a data: URI, #fragment, or https: URL in the" +
            " dist CSS — never a relative/bare path (consumer bundlers will try to resolve it).",
        );
    }

    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${relative(ROOT, ARTIFACT)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
