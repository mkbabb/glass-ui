// AY.W-A11Y-PERF O-2 — proof:webkit-backdrop — the build-DIFF gate that asserts the
// SHIPPED dist CSS carries the `-webkit-backdrop-filter` prefix.
//
// H-2: glass-ui authors the UNPREFIXED `backdrop-filter` only in source (the
// single-source-of-truth discipline). Without the O-2a build pass the shipped
// `dist/styles/*.css` ships the unprefixed form only, and a Safari ≤17 engine (which
// supports ONLY the `-webkit-` form) paints NO blur AND the `@supports not` opaque
// fallback does NOT fire — a transparent glass surface with floating text. This gate
// reads the SHIPPED dist (the build-output artefact the consumer actually receives, NOT
// the source) and asserts:
//   1. COUNT-PARITY: every unprefixed `backdrop-filter: <v>;` DECLARATION (in a rule
//      body) is immediately preceded by a `-webkit-backdrop-filter: <v2>;` whose value
//      equals <v> (the SAME blur radius — a webkit pair painting a different value is a
//      defect).
//   2. @SUPPORTS-TRAP: glass.css carries BOTH guards — the existing no-blur
//      `@supports not (… or …)` AND the new webkit-only `@supports ((-webkit-backdrop-
//      filter: blur(1px)) and (not (backdrop-filter: blur(1px))))`.
//
// Born-RED at HEAD (1 webkit / 15 backdrop-filter before O-2a). After O-2a the build
// pass makes it parity → exit 0. Bite: remove the build-injection pass → parity breaks.
//
// Runs AFTER `npm run build` (it reads dist/). If dist/ is absent it exits non-zero with
// a "run build first" message (NOT a silent skip — the artefact is deterministic).

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DIST_STYLES = resolve(ROOT, "dist/styles");

function fail(msg) {
    console.error(`[proof:webkit-backdrop] RED — ${msg}`);
    process.exit(1);
}

if (!existsSync(DIST_STYLES)) {
    fail(`dist/styles not found at ${DIST_STYLES} — run \`npm run build\` first (this gate reads the SHIPPED dist artefact).`);
}

// Strip /* … */ comments so a `backdrop-filter` inside a doc-comment is not counted.
function stripComments(css) {
    return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

const cssFiles = readdirSync(DIST_STYLES).filter((f) => f.endsWith(".css"));
let totalUnprefixed = 0;
let totalPaired = 0;
const violations = [];

for (const file of cssFiles) {
    const path = resolve(DIST_STYLES, file);
    if (!statSync(path).isFile()) continue;
    const css = stripComments(readFileSync(path, "utf-8"));

    // Find every unprefixed `backdrop-filter: <value>;` DECLARATION. The `[^-]` (or
    // string/brace/semicolon start) guard before the property name excludes the
    // `-webkit-backdrop-filter` property AND the `@supports (... backdrop-filter ...)`
    // query conditions (those sit inside `(` parens — `(backdrop-filter: blur(1px))` —
    // and are matched separately below to be EXCLUDED, since a query condition is not a
    // paintable declaration). A declaration ends with `;` and lives in a `{ … }` body.
    // We tokenize line-aware: a real decl line is `<indent>backdrop-filter: <v>;`. The
    // value admits one level of balanced parens (`var(--x)` / `blur(10px)`) but STOPS at
    // the `;` so it cannot spill across an `@supports` prelude's `) or (` operators.
    const declRe = /(^|[\n;{])\s*backdrop-filter\s*:\s*((?:[^;{}()]|\([^()]*\))+);/g;
    let m;
    while ((m = declRe.exec(css)) !== null) {
        const value = m[2].trim();
        totalUnprefixed += 1;
        // Look back from the decl start for the immediately-preceding
        // `-webkit-backdrop-filter: <v2>;` pair (allow only whitespace between).
        const declStart = m.index + m[1].length;
        const lookback = css.slice(Math.max(0, declStart - 120), declStart);
        const pairMatch = lookback.match(
            /-webkit-backdrop-filter\s*:\s*((?:[^;{}()]|\([^()]*\))+);\s*$/,
        );
        if (!pairMatch) {
            violations.push(
                `${file}: unprefixed \`backdrop-filter: ${value};\` has NO immediately-preceding \`-webkit-backdrop-filter:\` pair`,
            );
            continue;
        }
        const pairValue = pairMatch[1].trim();
        if (pairValue !== value) {
            violations.push(
                `${file}: webkit pair value mismatch — \`-webkit-backdrop-filter: ${pairValue};\` ≠ \`backdrop-filter: ${value};\` (the prefixed pair must paint the SAME blur)`,
            );
            continue;
        }
        totalPaired += 1;
    }
}

// @supports-trap: glass.css must carry BOTH guards.
const glassCss = existsSync(resolve(DIST_STYLES, "glass.css"))
    ? readFileSync(resolve(DIST_STYLES, "glass.css"), "utf-8")
    : "";
const hasNoBlurGuard =
    /@supports\s+not\s*\(\(\s*backdrop-filter\s*:\s*blur\(1px\)\s*\)\s+or\s+\(\s*-webkit-backdrop-filter\s*:\s*blur\(1px\)\s*\)\)/.test(
        glassCss,
    );
const hasWebkitOnlyGuard =
    /@supports\s*\(\(\s*-webkit-backdrop-filter\s*:\s*blur\(1px\)\s*\)\s+and\s+\(\s*not\s*\(\s*backdrop-filter\s*:\s*blur\(1px\)\s*\)\s*\)\)/.test(
        glassCss,
    );
if (!hasNoBlurGuard) {
    violations.push(
        "dist/styles/glass.css: missing the no-blur `@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))` guard",
    );
}
if (!hasWebkitOnlyGuard) {
    violations.push(
        "dist/styles/glass.css: missing the webkit-only `@supports ((-webkit-backdrop-filter: blur(1px)) and (not (backdrop-filter: blur(1px))))` guard (the Safari-17 trap-close confirmation)",
    );
}

console.log("proof:webkit-backdrop — the shipped-dist `-webkit-backdrop-filter` parity gate");
console.log(`  dist css files scanned : ${cssFiles.length}`);
console.log(`  unprefixed decls       : ${totalUnprefixed}`);
console.log(`  webkit-paired          : ${totalPaired}`);
console.log(`  @supports no-blur guard: ${hasNoBlurGuard ? "✓" : "✗"}`);
console.log(`  @supports webkit-only  : ${hasWebkitOnlyGuard ? "✓" : "✗"}`);

if (violations.length > 0) {
    console.error(`\n[proof:webkit-backdrop] RED — ${violations.length} violation(s):`);
    for (const v of violations) console.error(`    ✗ ${v}`);
    process.exit(1);
}
if (totalUnprefixed === 0) {
    fail("no `backdrop-filter` declarations found in dist/styles/*.css — the build did not emit the glass cascade (or the scan is broken).");
}

console.log(
    `\n[proof:webkit-backdrop] GREEN — all ${totalUnprefixed} shipped backdrop-filter declarations carry a matching -webkit- pair; both @supports guards present.`,
);
process.exit(0);
