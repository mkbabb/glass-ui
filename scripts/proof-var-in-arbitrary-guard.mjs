#!/usr/bin/env node
// proof:var-in-arbitrary-guard — AY.W-LEG1 (the AX.W27a F7 idiom rule, NEVER written).
//
// Tailwind v4 ships TWO custom-property syntaxes:
//   - the `(--x)` SHORTHAND — `w-(--reka-tabs-indicator-size)`, the v4 idiom;
//   - the `[var(--x)]` ARBITRARY VALUE — the older, longer form.
// A no-fallback, no-type-prefix bare `prop-[var(--x)]` in a `:class`/CVA-base
// string where the `(--x)` shorthand applies is the longer-than-it-needs idiom;
// the gate names each such site so the conversion is owed + visible, never a
// silent mixed-idiom drift (the TabsIndicator.vue:19 line carries BOTH idioms in
// one string at HEAD — `w-(--…-size)` next to `bg-[var(--glass-bg-quiet)]`).
//
// THE GATE ENCODES THE RULE, NOT A SWEEP — three keep-classes stay GREEN:
//   1. FALLBACK-BEARING — `bg-[var(--progress-track,var(--secondary))]`: the
//      `(--x)` shorthand CANNOT express a default-value fallback. KEEP.
//   2. TYPE-HINTED — `text-[length:var(--control-text)]`, `[background:var(…)]`:
//      a `type:`/`prop:` data-type prefix (and the full-arbitrary-property form)
//      is not expressible as `prop-(--x)`. KEEP.
//   3. ARBITRARY-SELECTOR — `[&_svg:not([class*=size-])]:size-[var(--ui-glyph)]`:
//      the `var()` lives inside an arbitrary VARIANT selector (`[&…]:`), not a
//      bare utility. KEEP.
//
// WRITE-SCOPE: this gate VERIFIES — it does NOT edit the call sites. The ~54
// class-1 `<util>-[var(--x)]` → `<util>-(--x)` conversions are W-CSS1's §O6
// write scope. If W-CSS1 has landed, this gate is born-GREEN; if not, it lands
// RED-with-named-survivors (the fail-EXPLICIT shape — the sites are named +
// owed). NO double-edit on the same line.
//
// SELF-PROVING: a synthetic fixture proves the bite — a bare `h-[var(--x)]`
// REDDENS, while a fallback-bearing line + a `length:`-prefixed line + an
// arbitrary-selector line stay GREEN (the over-correction guard). If the detector
// mis-classifies any fixture, the gate reds loudly.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:var-in-arbitrary-guard";
const SRC = join(ROOT, "src");

// The shorthand-eligible utility prefixes (the props that accept `prop-(--x)`).
const PROP =
    "(?:bg|h|w|min-h|max-h|min-w|max-w|size|gap|p[xytrbl]?|m[xytrbl]?|inset|top|right|bottom|left|translate-[xy]|rounded[a-z-]*)";

// A candidate bare-var-in-arbitrary token: `<prop>-[var(--name)]` with NO comma
// (fallback) and NO `:` (type/prop prefix) inside the brackets — i.e. a plain
// `[var(--x)]`, the shorthand-eligible form. The `[var(--x, …)]` fallback and the
// `[length:var(…)]` / `[background:var(…)]` type/prop forms carry a `,`/`:` and
// do NOT match.
const CANDIDATE = new RegExp(`^${PROP}-\\[var\\(--[a-z0-9-]+\\)\\]$`);

/**
 * Is this whitespace-delimited class TOKEN a bare shorthand-eligible
 * `prop-[var(--x)]` that should use `prop-(--x)`?
 *
 * A Tailwind class token can carry variant prefixes (`hover:`, `data-[state=on]:`,
 * `[&_svg:not([class*=size-])]:`) before the utility. The ARBITRARY-SELECTOR keep
 * is exactly the case where a variant segment is an arbitrary `[&…]` selector — the
 * `var()` then lives inside a SELECTOR, not a bare utility value. So we split the
 * token on `:` at the TOP bracket level (a `:` inside `[...]` does not split — it
 * is part of an arbitrary selector like `[&_svg:not(...)]`), take the LAST segment
 * as the utility, and reject the token if ANY earlier (variant) segment is an
 * arbitrary `[&…]` selector.
 *
 * @param {string} token a single whitespace-delimited class
 * @returns {boolean}
 */
function isBareShorthandEligible(token) {
    // Split on top-level `:` (depth 0 — not inside `[...]` / `(...)`).
    const segments = [];
    let depth = 0;
    let cur = "";
    for (const ch of token) {
        if (ch === "[" || ch === "(") depth++;
        else if (ch === "]" || ch === ")") depth = Math.max(0, depth - 1);
        if (ch === ":" && depth === 0) {
            segments.push(cur);
            cur = "";
        } else {
            cur += ch;
        }
    }
    segments.push(cur);

    const utility = segments[segments.length - 1];
    const variants = segments.slice(0, -1);

    // ARBITRARY-SELECTOR keep: a variant segment is an arbitrary `[&…]` selector
    // (the `var()` lives inside a SELECTOR, e.g. `[&_svg:not([class*=size-])]`).
    if (variants.some((v) => /^\[&/.test(v))) return false;

    // The utility itself must be the bare `prop-[var(--x)]` shorthand-eligible form.
    return CANDIDATE.test(utility);
}

// ── The class-string extractor ─────────────────────────────────────────────
// We scan `:class="…"` / `class="…"` attribute strings (Vue templates) AND
// CVA base strings (the first string-literal argument to `cva("…")`). Rather
// than parse the SFC, we scan line-by-line and tokenize any run of class-like
// tokens — false-positive-safe because a non-class string never carries a
// `prop-[var(--x)]` token. We split each line into whitespace runs and test
// every token; the line/file is the violation locus.

const CLASS_TOKEN = /[^\s'"`]+/g;

/**
 * @param {string} src file contents
 * @returns {{line:number, token:string}[]}
 */
function scanSource(src) {
    const hits = [];
    const lines = src.split("\n");
    lines.forEach((ln, i) => {
        // Only lines that carry a `[var(--` arbitrary-value can possibly hit —
        // a fast pre-filter (the shorthand `(--x)` form has no `[var`).
        if (!ln.includes("[var(--")) return;
        for (const m of ln.matchAll(CLASS_TOKEN)) {
            if (isBareShorthandEligible(m[0])) {
                hits.push({ line: i + 1, token: m[0] });
            }
        }
    });
    return hits;
}

/** Recursively collect `.vue`/`.ts` files under SRC (skip __tests__). */
function collectFiles(dir, acc = []) {
    for (const name of readdirSync(dir)) {
        if (name === "__tests__" || name === "node_modules") continue;
        const p = join(dir, name);
        const st = statSync(p);
        if (st.isDirectory()) collectFiles(p, acc);
        else if (/\.(vue|ts)$/.test(name) && !/\.test\.ts$/.test(name)) acc.push(p);
    }
    return acc;
}

/**
 * The PURE detector — over a list of `{path, src}` records, returns the
 * named violations. Split out so the self-test can exercise it with synthetic
 * source (no on-disk fixture).
 *
 * @param {{path:string, src:string}[]} records
 * @returns {{file:string, line:number, token:string}[]}
 */
export function detect(records) {
    const violations = [];
    for (const { path, src } of records) {
        for (const h of scanSource(src)) {
            violations.push({ file: path, line: h.line, token: h.token });
        }
    }
    return violations;
}

// ── Self-test — the bite + the three keeps, every run ────────────────────────
function selfTest() {
    const BITE = `:class="cn('input-pill h-[var(--control-h-md)] rounded-field px-9')"`;
    const KEEP_FALLBACK = `class="rounded-pill bg-[var(--progress-track,var(--secondary))]"`;
    const KEEP_TYPE = `'whitespace-nowrap text-[length:var(--control-text)] font-medium'`;
    const KEEP_PROP_ARB = `class="h-full [background:var(--progress-fill,var(--primary))]"`;
    const KEEP_ARB_SELECTOR = `'foo [&_svg:not([class*=size-])]:size-[var(--ui-glyph)] bar'`;
    const KEEP_SHORTHAND = `'w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position)'`;

    const biteHits = detect([{ path: "synthetic/bite.vue", src: BITE }]);
    const keepHits = detect([
        { path: "synthetic/keep-fallback.vue", src: KEEP_FALLBACK },
        { path: "synthetic/keep-type.ts", src: KEEP_TYPE },
        { path: "synthetic/keep-prop-arb.vue", src: KEEP_PROP_ARB },
        { path: "synthetic/keep-arb-selector.ts", src: KEEP_ARB_SELECTOR },
        { path: "synthetic/keep-shorthand.ts", src: KEEP_SHORTHAND },
    ]);

    const errors = [];
    if (biteHits.length !== 1 || biteHits[0].token !== "h-[var(--control-h-md)]")
        errors.push(
            `bite NOT flagged — a bare h-[var(--control-h-md)] must RED (got ${JSON.stringify(biteHits)})`,
        );
    if (keepHits.length)
        errors.push(
            `over-correction — a keep line was flagged: ${keepHits.map((h) => h.token).join(", ")}`,
        );
    return errors;
}

function run() {
    const errors = selfTest();
    if (errors.length) {
        console.error(
            "[proof:var-in-arbitrary-guard] SELF-TEST FAILED — the gate is not load-bearing:",
        );
        for (const e of errors) console.error(`  ✗ ${e}`);
        process.exit(1);
    }

    const files = collectFiles(SRC);
    const records = files.map((p) => ({
        path: relative(ROOT, p),
        src: readFileSync(p, "utf8"),
    }));
    const violations = detect(records);

    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath(
        "GATE_VAR_IN_ARBITRARY_OUT",
        "AY-var-in-arbitrary-guard",
    );
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:var-in-arbitrary-guard",
        command: COMMAND,
        scanned: files.length,
        violations: violations.map((v) => `${v.file}:${v.line} — ${v.token}`),
    });

    console.log(
        "proof:var-in-arbitrary-guard — bare shorthand-eligible [var(--x)] in :class/CVA base (AY.W-LEG1)",
    );
    console.log(`  files scanned         : ${files.length}`);
    console.log(`  self-test (bite proof): OK — bite flagged, 5 keep lines stay GREEN`);
    console.log(`  violations            : ${violations.length}`);
    for (const v of violations)
        console.error(
            `  ${v.file}:${v.line} — bare [var(--x)] where the (--x) shorthand applies; use ${v.token.replace(/\[var\((--[a-z0-9-]+)\)\]/, "($1)")}`,
        );

    if (status === "fail") {
        console.error(
            `\n[proof:var-in-arbitrary-guard] ${violations.length} shorthand-eligible bare [var(--x)] — the (--x) v4 shorthand applies (W-CSS1 §O6 owns the conversion). Convert or justify (fallback/type/arbitrary-selector keeps stay GREEN).`,
        );
        process.exit(1);
    }
    console.log(
        "\n[proof:var-in-arbitrary-guard] no shorthand-eligible bare [var(--x)] in any :class/CVA base; the fallback/type/arbitrary-selector keeps stay GREEN.",
    );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
