#!/usr/bin/env node
// AR.W2 — view-transition-name / anchor-name mint-source static gate (invariant η).
//
// Invariant η: every `view-transition-name` / `anchor-name` MINT derives from an
// app-unique source (Vue `useId()`), OR is a documented page-singleton literal —
// NEVER a module-level `let X = 0;` counter.
//
// The diagnosed GlassDock bug: a `let dockInstanceId = 0; ... `vt-${++dockInstanceId}``
// counter restarts at 0 in every copy of the module-graph (a lazy chunk, an
// SSR pass, a second bundled copy of the lib), so two independently-mounted
// docks both mint `vt-1` and the browser SILENTLY collides their
// view-transition groups — the morph cross-pollinates. `useId()` is app-scoped
// (the Vue app instance owns the counter), so the same source always yields a
// fleet-unique name regardless of module-graph topology. Static page-singleton
// names (`--gl-tab-active`, a single active-anchor per page) are also collision-
// free BY CONSTRUCTION — there is only ever one on the page — and are allowed
// via an explicit allowlist so the gate stays a real guard.
//
// House style mirrors scripts/proof-theme-style.mjs + proof-phantom-classes.mjs:
//   - ESM .mjs, walk src/ (exclude node_modules/.git/.claude/worktrees/dist),
//   - COMMENT-STRIP first (the AP.W4 false-witness discipline) so the many doc
//     references to `view-transition-name` in headers/doc-blocks are NOT counted
//     as mints,
//   - emit a JSON report, print a human summary, process.exit(1) on violation
//     (fail-closed).

import { existsSync, readdirSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const SRC = resolve(ROOT, "src");
const ARTIFACT = resolve(ROOT, "docs/tranches/AR/audit/W2-vt-names.json");

// ---------------------------------------------------------------------------
// DOCUMENTED PAGE-SINGLETON ALLOWLIST.
//
// A static (un-interpolated) `view-transition-name`/`anchor-name` literal is a
// page-singleton: there is at most ONE element on the page carrying it, so it
// cannot collide. These are the ONLY static mint values the gate accepts; any
// NEW static name lands as a VIOLATION until a maintainer makes a CONSCIOUS
// allowlist entry here (with a one-line rationale). This keeps the gate a real
// guard rather than a rubber stamp.
//
//   --gl-tab-active    — UnderlineTabs: the single `aria-selected` tab is the
//                        position-anchor the underline indicator tethers to.
//                        One active tab per tablist ⇒ page-singleton.
//   --gl-toggle-active — BouncyToggle: the single `aria-pressed` button is the
//                        anchor the sliding pill tethers to. One pressed button
//                        per toggle ⇒ page-singleton.
// ---------------------------------------------------------------------------
const STATIC_ALLOWLIST = new Set(["--gl-tab-active", "--gl-toggle-active"]);

const EXCLUDE_DIRS = new Set(["node_modules", ".git", ".claude", "worktrees", "dist"]);

// ---------------------------------------------------------------------------
// Walk
// ---------------------------------------------------------------------------
function walk(dir) {
    const out = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.isDirectory()) {
            if (EXCLUDE_DIRS.has(entry.name)) continue;
            out.push(...walk(join(dir, entry.name)));
        } else if (entry.isFile() && /\.(vue|ts|css)$/.test(entry.name)) {
            out.push(join(dir, entry.name));
        }
    }
    return out;
}

// ---------------------------------------------------------------------------
// Comment-strip — replace comment bytes with spaces (newlines preserved) so
// downstream line numbers stay accurate. Three flavours, applied per region:
//   - JS/TS:  /* … */  and  // … (to EOL)
//   - CSS:    /* … */   ( // is NOT a comment in CSS — left intact )
//   - HTML:   <!-- … -->
// ---------------------------------------------------------------------------
function blankRange(text, start, end) {
    // Replace [start,end) with spaces, but keep '\n' so line counts survive.
    let out = "";
    for (let i = start; i < end; i++) out += text[i] === "\n" ? "\n" : " ";
    return out;
}

function stripBlockComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? text.length : end + 2;
            result += blankRange(text, i, stop);
            i = stop;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

function stripLineComments(text) {
    // Strip `// … EOL`. Best-effort string awareness so a `//` inside a string
    // literal (e.g. a URL) is not treated as a comment. Adequate for our corpus.
    const lines = text.split("\n");
    return lines
        .map((line) => {
            let inS = null; // current string quote char
            for (let i = 0; i < line.length; i++) {
                const c = line[i];
                if (inS) {
                    if (c === "\\") {
                        i++;
                        continue;
                    }
                    if (c === inS) inS = null;
                    continue;
                }
                if (c === '"' || c === "'" || c === "`") {
                    inS = c;
                    continue;
                }
                if (c === "/" && line[i + 1] === "/") {
                    return line.slice(0, i) + " ".repeat(line.length - i);
                }
            }
            return line;
        })
        .join("\n");
}

function stripHtmlComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text.startsWith("<!--", i)) {
            const end = text.indexOf("-->", i + 4);
            const stop = end === -1 ? text.length : end + 3;
            result += blankRange(text, i, stop);
            i = stop;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

// ---------------------------------------------------------------------------
// Region model. A region is { kind: 'script'|'style'|'template'|'css'|'ts',
// text } where `text` is comment-stripped and line-aligned to the FILE (the
// region's content sits at its real file lines, everything else is blanked).
//
//   - .ts  → one 'ts' region (block + line comments stripped).
//   - .css → one 'css' region (block comments stripped).
//   - .vue → split into <script>/<style>/<template> blocks; each block's bytes
//            are comment-stripped in place and the rest of the file is blanked,
//            so a mint's reported line is its true file line.
// ---------------------------------------------------------------------------
function fileRegions(path, raw) {
    if (path.endsWith(".ts")) {
        return [{ kind: "ts", text: stripLineComments(stripBlockComments(raw)) }];
    }
    if (path.endsWith(".css")) {
        return [{ kind: "css", text: stripBlockComments(raw) }];
    }
    // .vue — carve top-level blocks, blank everything else.
    const regions = [];
    const blockRe = /<(script|style|template)\b[^>]*>([\s\S]*?)<\/\1>/gi;
    let m;
    while ((m = blockRe.exec(raw)) !== null) {
        const tag = m[1].toLowerCase();
        const inner = m[2];
        const innerStart = m.index + m[0].indexOf(inner, m[1].length);
        // A file-length canvas of spaces+newlines; drop the block's stripped
        // text at its true offset so line numbers match the source.
        let stripped;
        let kind;
        if (tag === "script") {
            stripped = stripLineComments(stripBlockComments(inner));
            kind = "script";
        } else if (tag === "style") {
            stripped = stripBlockComments(inner);
            kind = "style";
        } else {
            stripped = stripHtmlComments(inner);
            kind = "template";
        }
        const canvas =
            blankRange(raw, 0, innerStart) +
            stripped +
            blankRange(raw, innerStart + inner.length, raw.length);
        regions.push({ kind, text: canvas });
    }
    return regions;
}

function lineOf(text, index) {
    return text.slice(0, index).split("\n").length;
}

// ---------------------------------------------------------------------------
// Mint detection.
//
// JS-side dynamic mint: an object property `"view-transition-name":` /
//   `"anchor-name":` whose value is NOT a bare static string literal (it is a
//   template literal or any expression), OR a template-literal style string that
//   carries `view-transition-name:`/`anchor-name:` with a `${…}` interpolation.
//
// CSS/static mint: a literal `view-transition-name: <ident>;` /
//   `anchor-name: <ident>;` with NO interpolation.
// ---------------------------------------------------------------------------
const PROP_NAMES = ["view-transition-name", "anchor-name"];

// JS object-property mint:  "view-transition-name": <value-up-to-,-or-}>
const jsPropRe = new RegExp(
    `["'](${PROP_NAMES.join("|")})["']\\s*:\\s*([^,}\\n]+)`,
    "g",
);

// CSS declaration mint:  view-transition-name: <value> ;   (property, not quoted key)
const cssDeclRe = new RegExp(
    `(^|[^"'\\w-])(${PROP_NAMES.join("|")})\\s*:\\s*([^;\\n}]+)`,
    "g",
);

function hasInterpolation(value) {
    return /\$\{/.test(value);
}

// Is the JS-property value a BARE static string literal (no interpolation /
// expression)?  e.g.  "foo"  or  'bar'  → static; `gl-${x}` / expr → dynamic.
function isBareStaticString(value) {
    const v = value.trim();
    return /^["'][^"'`$]*["']\s*$/.test(v);
}

// Find a module-level (script/module scope — NOT inside a function/arrow body)
// numeric `let <ident> = <integer>;` counter. We approximate "module scope" via
// brace-depth: depth 0 at the position the `let` begins. Returns the set of
// counter ident names declared at depth 0.
function moduleLevelNumericLets(text) {
    const names = new Set();
    const re = /\blet\s+([A-Za-z_$][\w$]*)\s*=\s*-?\d+\s*;/g;
    let m;
    while ((m = re.exec(text)) !== null) {
        // Brace depth before this match (ignoring braces inside strings is
        // approximated — our corpus has no brace-bearing string literals before
        // a counter decl). depth 0 ⇒ module scope.
        const before = text.slice(0, m.index);
        const depth = countDepth(before);
        if (depth === 0) names.add(m[1]);
    }
    return names;
}

function countDepth(text) {
    let depth = 0;
    let inS = null;
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (inS) {
            if (c === "\\") {
                i++;
                continue;
            }
            if (c === inS) inS = null;
            continue;
        }
        if (c === '"' || c === "'" || c === "`") {
            inS = c;
            continue;
        }
        if (c === "{") depth++;
        else if (c === "}") depth--;
    }
    return depth;
}

// Collect module-level (depth-0) `const/let <ident> = <rhs>;` bindings. Returns
// a Map ident → rhs-text. Used to trace whether a counter transitively feeds a
// mint expression (the GlassDock chain: counter → `dockId` → the mint).
function moduleLevelBindings(text) {
    const map = new Map();
    const re = /\b(?:const|let)\s+([A-Za-z_$][\w$]*)\s*=\s*([^;\n]+);/g;
    let m;
    while ((m = re.exec(text)) !== null) {
        if (countDepth(text.slice(0, m.index)) === 0) {
            map.set(m[1], m[2]);
        }
    }
    return map;
}

// Does any module-level numeric counter in `counterNames` FEED `expr` — either
// referenced directly in `expr`, OR via a module-level binding chain that `expr`
// pulls in (e.g. mint references `dockId`, `dockId`'s RHS references the
// counter)? Bounded transitive walk over module-scope bindings.
function counterFeedsExpr(expr, counterNames, bindings) {
    if (counterNames.size === 0) return false;
    const refs = (s) => (s.match(/[A-Za-z_$][\w$]*/g) ?? []);
    const seen = new Set();
    const stack = [...refs(expr)];
    while (stack.length) {
        const id = stack.pop();
        if (seen.has(id)) continue;
        seen.add(id);
        if (counterNames.has(id)) return true;
        const rhs = bindings.get(id);
        if (rhs) stack.push(...refs(rhs));
    }
    return false;
}

// ---------------------------------------------------------------------------
// Per-file analysis
// ---------------------------------------------------------------------------
function analyzeFile(path) {
    const raw = readFileSync(path, "utf8");
    const rel = path.slice(ROOT.length + 1);
    const regions = fileRegions(path, raw);
    const mints = [];

    // Whole-file (comment-stripped) text for cross-region facts: useId presence
    // and module-level counter lets are file-scoped. For a .vue we concatenate
    // the script regions; for .ts the single region.
    const scriptText = regions
        .filter((r) => r.kind === "script" || r.kind === "ts")
        .map((r) => r.text)
        .join("\n");
    const fileHasUseId = /\buseId\s*\(/.test(scriptText);
    const counterNames = moduleLevelNumericLets(scriptText);
    const bindings = moduleLevelBindings(scriptText);

    for (const region of regions) {
        const isScriptLike = region.kind === "script" || region.kind === "ts";
        const isCssLike = region.kind === "css" || region.kind === "style";

        if (isScriptLike) {
            // JS-side: object-property mints.
            let m;
            jsPropRe.lastIndex = 0;
            while ((m = jsPropRe.exec(region.text)) !== null) {
                const value = m[2].trim();
                if (isBareStaticString(value)) {
                    // A bare static string used as a JS-side VT name is treated
                    // like a static mint (allowlist-governed).
                    const lit = value.replace(/^["']|["']$/g, "");
                    mints.push({
                        file: rel,
                        line: lineOf(region.text, m.index),
                        kind: "js-static",
                        source: lit,
                    });
                } else {
                    mints.push({
                        file: rel,
                        line: lineOf(region.text, m.index),
                        kind: "js-dynamic",
                        source: value,
                    });
                }
            }
            // Template-literal style strings carrying the property with ${…}.
            // (Covered by the cssDeclRe scan below restricted to interpolated
            //  values inside backtick strings — but to keep regions clean we
            //  scan the script text for `prop:` + ${ on the same declaration.)
            cssDeclRe.lastIndex = 0;
            while ((m = cssDeclRe.exec(region.text)) !== null) {
                const value = m[3];
                if (hasInterpolation(value)) {
                    mints.push({
                        file: rel,
                        line: lineOf(region.text, m.index + m[1].length),
                        kind: "js-dynamic",
                        source: `${m[2]}: ${value.trim()}`,
                    });
                }
            }
        }

        if (isCssLike) {
            let m;
            cssDeclRe.lastIndex = 0;
            while ((m = cssDeclRe.exec(region.text)) !== null) {
                const value = m[3].trim();
                if (hasInterpolation(value)) continue; // dynamic — not a CSS-static mint
                // strip a trailing `}` artefact / `!important`
                const ident = value.replace(/!important\s*$/, "").trim();
                mints.push({
                    file: rel,
                    line: lineOf(region.text, m.index + m[1].length),
                    kind: "css-static",
                    source: ident,
                });
            }
        }
    }

    return { rel, mints, fileHasUseId, counterNames, bindings };
}

// ---------------------------------------------------------------------------
// Verdict
// ---------------------------------------------------------------------------
function verdictFor(mint, fileFacts) {
    if (mint.kind === "js-dynamic") {
        // Must derive from useId() AND have no module-level numeric counter
        // feeding it. We flag the GlassDock pattern: a dynamic mint whose
        // expression is fed — directly or through a module-scope binding chain
        // (`counter → dockId → mint`) — by a module-level numeric `let` counter.
        // An UNRELATED module-level counter (a `let rafId = 0` not in the mint's
        // chain) does NOT fire, by construction of the transitive trace.
        const fedByCounter = counterFeedsExpr(
            mint.source,
            fileFacts.counterNames,
            fileFacts.bindings,
        );
        if (fedByCounter) {
            return {
                verdict: "violation",
                reason: `dynamic mint fed by module-level counter (one of: ${[...fileFacts.counterNames].join(", ")}) — restarts per module-graph copy and silently collides (the GlassDock bug); mint from useId() instead`,
            };
        }
        if (!fileFacts.fileHasUseId) {
            return {
                verdict: "violation",
                reason: "dynamic mint with no useId() in file — name must derive from an app-unique source",
            };
        }
        return { verdict: "pass", reason: "derives from useId(); no module-level counter" };
    }

    // css-static / js-static → allowlist-governed page-singleton.
    if (STATIC_ALLOWLIST.has(mint.source)) {
        return { verdict: "pass", reason: "documented page-singleton (allowlist)" };
    }
    return {
        verdict: "violation",
        reason: `static name "${mint.source}" not in the documented page-singleton allowlist — add a conscious allowlist entry or derive it from useId()`,
    };
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------
function run() {
    const files = walk(SRC);
    const mints = [];
    const violations = [];

    for (const path of files) {
        const facts = analyzeFile(path);
        for (const mint of facts.mints) {
            const v = verdictFor(mint, facts);
            const record = { ...mint, verdict: v.verdict };
            mints.push(record);
            if (v.verdict === "violation") {
                violations.push({ ...record, reason: v.reason });
            }
        }
    }

    // Stable ordering for a deterministic artefact.
    const byLoc = (a, b) =>
        a.file === b.file ? a.line - b.line : a.file < b.file ? -1 : 1;
    mints.sort(byLoc);
    violations.sort(byLoc);

    const status = violations.length === 0 ? "pass" : "fail";
    const report = {
        generatedAt: new Date().toISOString(),
        status,
        command: "npm run proof:vt-names",
        mints,
        violations,
    };

    mkdirSync(resolve(ARTIFACT, ".."), { recursive: true });
    writeFileSync(ARTIFACT, `${JSON.stringify(report, null, 2)}\n`);

    // ---- human summary ----
    console.log("proof:vt-names — view-transition-name / anchor-name mint gate (AR invariant η)");
    console.log(`  scanned: ${files.length} files under src/`);
    console.log(`  mints:   ${mints.length} (${mints.filter((m) => m.verdict === "pass").length} pass, ${violations.length} violation)`);
    console.log("");
    for (const m of mints) {
        const tag = m.verdict === "pass" ? "PASS" : "FAIL";
        console.log(`  [${tag}] ${m.file}:${m.line}  (${m.kind})  ${m.source}`);
    }
    if (violations.length > 0) {
        console.log("");
        console.log("VIOLATIONS:");
        for (const v of violations) {
            console.log(`  ✗ ${v.file}:${v.line} — ${v.reason}`);
        }
    }
    console.log("");
    console.log(`  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);

    process.exit(status === "pass" ? 0 : 1);
}

run();
