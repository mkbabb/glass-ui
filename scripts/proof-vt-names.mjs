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

import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

// The CLI paths (repo ROOT, the src/ scan dir, the gate-output ARTIFACT) are
// resolved LAZILY + memoized, never at module scope: importing this module for
// its exported pure detectors (scripts/__tests__/proof-vt-names.test.ts) must
// not run `fileURLToPath(import.meta.url)`, which throws under vitest's module
// runner (import.meta.url is not a file: URL there). Only the CLI path
// (analyzeFile + run) touches them.
// inv-θ: gate output is a pure function landing in a gitignored cache by default
// (.cache/gates/W2-vt-names.json). A DELIBERATE snapshot to the committed
// AR-audit path is opt-in via GLASS_UI_VT_NAMES_ARTIFACT (+ GATE_SNAPSHOT=1 for
// the timestamp). Default → byte-stable cache, so a gate run leaves git clean.
let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        SRC: resolve(ROOT, "src"),
        ARTIFACT: gateArtifactPath("GLASS_UI_VT_NAMES_ARTIFACT", "W2-vt-names"),
    };
    return _cliPaths;
}

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
//   --gl-tab-active    — SegmentedTabs (AX.W53): the single active tab
//                        (`aria-selected` on underline, `aria-pressed` on
//                        segmented/pill) is the position-anchor the ONE shared
//                        indicator (slider pill OR underline rule) tethers to.
//                        One active tab per strip ⇒ page-singleton. The former
//                        `--gl-toggle-active` second anchor is retired — the
//                        unified component drives all three variants off this
//                        single anchor name.
// ---------------------------------------------------------------------------
const STATIC_ALLOWLIST = new Set(["--gl-tab-active"]);

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
// The mint of a `view-transition-name` / `anchor-name` can arrive through SIX
// surface forms; AS.W0 proved the original single-shape scan caught only the
// first two and let the other four slip SILENTLY. All six are detected and
// ruled identically (dataflow-traced for the dynamic ones, allowlist-governed
// for the static ones):
//
//   (a) JS object-property kebab mint — `"view-transition-name": <expr>`
//       (the :style/style-object literal form).
//   (b) CSS / template-literal style-string declaration — `view-transition-name:
//       <value>;` (CSS static, or a backtick style-string carrying a `${…}`).
//   (c) camelCase IDL assignment — `.style.viewTransitionName = <expr>` /
//       `.viewTransitionName = <expr>` / `.style.anchorName = <expr>`.
//   (d) setProperty 2-arg — `.style.setProperty("view-transition-name", <expr>)`
//       / `("anchor-name", <expr>)` (string-LITERAL first arg only — a variable
//       first arg like `dim.value` is NOT this property and is not flagged).
//   (e) setAttribute style-string — `.setAttribute("style", `…view-transition-
//       name:…`)` (a `style` attribute string carrying the property).
//   (f) .vue <template> inline — `style="…view-transition-name:…"` or a `:style`
//       binding object literal `{ "view-transition-name": <expr> }` / camelCase
//       `{ viewTransitionName: <expr> }`, scanned in the TEMPLATE region.
//
// A dynamic mint (interpolated / expression-valued) is then DATAFLOW-traced: its
// value must resolve to `useId()` (directly or through a module-scope binding
// chain). A value tracing to a module-level numeric counter (`let X = 0`), a
// `.length`, or a clock/random source is a VIOLATION. A static mint is governed
// by the page-singleton allowlist.
// ---------------------------------------------------------------------------
const PROP_NAMES = ["view-transition-name", "anchor-name"];
// camelCase IDL spellings paired to the kebab property names.
const IDL_NAMES = ["viewTransitionName", "anchorName"];

// (a) JS object-property mint:  "view-transition-name": <value-up-to-,-or-}>
const jsPropRe = new RegExp(
    `["'](${PROP_NAMES.join("|")})["']\\s*:\\s*([^,}\\n]+)`,
    "g",
);

// (b/e/f) CSS declaration mint:  view-transition-name: <value> ;  (property, not
// quoted key). Reused to scan CSS regions, template-region inline style strings,
// and any backtick style-string carrying the property.
const cssDeclRe = new RegExp(
    `(^|[^"'\\w-])(${PROP_NAMES.join("|")})\\s*:\\s*([^;\\n}]+)`,
    "g",
);

// (c) camelCase IDL assignment:  .viewTransitionName = <expr>  /  .anchorName = …
//     (covers both `.style.viewTransitionName=` and a bare `.viewTransitionName=`).
//     `==`/`===`/`!=` comparisons are excluded via the negative lookahead.
const idlAssignRe = new RegExp(
    `\\.(${IDL_NAMES.join("|")})\\s*=\\s*(?!=)([^;\\n]+)`,
    "g",
);

// (d) setProperty 2-arg with a STRING-LITERAL property name:
//     .setProperty("view-transition-name", <expr>)
const setPropRe = new RegExp(
    `\\.setProperty\\(\\s*["'](${PROP_NAMES.join("|")})["']\\s*,\\s*([^)\\n]+)\\)`,
    "g",
);

// (e) setAttribute("style", <string>) — flag when the style string carries the
//     property. We capture the whole second arg and re-scan it with cssDeclRe.
const setAttrStyleRe = /\.setAttribute\(\s*["']style["']\s*,\s*([^)]*)\)/g;

// (f) .vue <template> `:style` binding camelCase object key — viewTransitionName: …
const tmplIdlKeyRe = new RegExp(
    `(${IDL_NAMES.join("|")})\\s*:\\s*([^,}\\n]+)`,
    "g",
);

function hasInterpolation(value) {
    return /\$\{/.test(value);
}

// Is the value a BARE static string literal (no interpolation / expression)?
//   e.g.  "foo"  or  'bar'  → static; `gl-${x}` / expr → dynamic.
function isBareStaticString(value) {
    const v = value.trim();
    return /^["'][^"'`$]*["']\s*$/.test(v);
}

// Find a module-level (script/module scope — NOT inside a function/arrow body)
// numeric `let|var <ident> = <integer>;` counter. We approximate "module scope"
// via brace-depth: depth 0 at the position the decl begins. Returns the set of
// counter ident names declared at depth 0. (`const` can't be a counter — it is
// never reassigned — so it is excluded.)
function moduleLevelNumericLets(text) {
    const names = new Set();
    const re = /\b(?:let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*-?\d+\s*;/g;
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

// PER-MINT DATAFLOW TRACE (replaces the old file-level `fileHasUseId` boolean).
//
// Resolve where a dynamic mint's VALUE comes from. Starting at the mint
// expression, transitively pull in every module-scope binding it references
// (the GlassDock chain: mint `dockId.replace(…)` → binding `dockId` whose RHS is
// `` `glass-dock-${useId()}` ``). Over the closure of fragments (the mint expr +
// every binding RHS reached), classify the source:
//
//   - usesId      → some reached fragment calls `useId()` directly.
//   - usesCounter → some reached fragment references a module-level numeric
//                   counter (`let|var X = 0`).
//   - usesVolatile→ some reached fragment reads a `.length`, a clock
//                   (`Date.now()`/`performance.now()`), or `Math.random()`.
//
// A merely-MENTIONED `useId()` elsewhere in the file no longer launders an
// unrelated counter-fed mint: only `useId()` reached through THIS mint's binding
// chain sets `usesId`.
function traceMintSource(expr, counterNames, bindings) {
    const refs = (s) => s.match(/[A-Za-z_$][\w$]*/g) ?? [];
    const seen = new Set();
    const fragments = [expr];
    const stack = [...refs(expr)];
    while (stack.length) {
        const id = stack.pop();
        if (seen.has(id)) continue;
        seen.add(id);
        const rhs = bindings.get(id);
        if (rhs !== undefined) {
            fragments.push(rhs);
            stack.push(...refs(rhs));
        }
    }
    let usesId = false;
    let usesCounter = false;
    let usesVolatile = false;
    for (const frag of fragments) {
        if (/\buseId\s*\(/.test(frag)) usesId = true;
        if (
            /\.length\b/.test(frag) ||
            /\bDate\s*\.\s*now\s*\(/.test(frag) ||
            /\bperformance\s*\.\s*now\s*\(/.test(frag) ||
            /\bMath\s*\.\s*random\s*\(/.test(frag)
        )
            usesVolatile = true;
    }
    // Counter membership is checked over the reached identifier set (which
    // already includes every ident pulled in transitively).
    for (const id of seen) if (counterNames.has(id)) usesCounter = true;
    return { usesId, usesCounter, usesVolatile };
}

// ---------------------------------------------------------------------------
// Per-file analysis
// ---------------------------------------------------------------------------
function analyzeFile(path) {
    const raw = readFileSync(path, "utf8");
    const rel = path.slice(cliPaths().ROOT.length + 1);
    return analyzeSource(path, raw, rel);
}

// Pure (FS-free) twin of analyzeFile: classify mints in `raw`, treating `path`
// only as the region-kind selector (.ts/.css/.vue). `rel` is the file label
// stamped into each mint record. Exported so the gate's detection logic can be
// exercised over in-memory fixtures (scripts/__tests__/proof-vt-names.test.ts)
// without touching the filesystem — analyzeFile is just this + a readFileSync.
export function analyzeSource(path, raw, rel = path) {
    const regions = fileRegions(path, raw);
    const mints = [];

    // Whole-file (comment-stripped) SCRIPT text for module-scope dataflow facts:
    // the module-level counter set + binding map are file-scoped. For a .vue we
    // concatenate the script regions; for .ts the single region. (The old
    // file-level `fileHasUseId` boolean is GONE — useId derivation is now traced
    // per-mint, not asserted file-wide.)
    const scriptText = regions
        .filter((r) => r.kind === "script" || r.kind === "ts")
        .map((r) => r.text)
        .join("\n");
    const counterNames = moduleLevelNumericLets(scriptText);
    const bindings = moduleLevelBindings(scriptText);

    // Record a dynamic mint with the raw value `expr` to dataflow-trace, plus a
    // human-readable `source`.
    const pushDynamic = (text, idx, expr, source) =>
        mints.push({
            file: rel,
            line: lineOf(text, idx),
            kind: "js-dynamic",
            source,
            expr,
        });
    const pushStatic = (text, idx, kind, source) =>
        mints.push({ file: rel, line: lineOf(text, idx), kind, source });

    // Scan a style-string fragment (a backtick/quoted CSS string, an inline
    // `style="…"`, a setAttribute body) for the property declaration. Each
    // declaration found is a dynamic mint if interpolated, else a static mint.
    const scanStyleString = (text, baseIdx, frag, fragOffset) => {
        cssDeclRe.lastIndex = 0;
        let d;
        while ((d = cssDeclRe.exec(frag)) !== null) {
            const value = d[3].trim();
            const at = baseIdx + fragOffset + d.index + d[1].length;
            if (hasInterpolation(value)) {
                pushDynamic(text, at, value, `${d[2]}: ${value}`);
            } else {
                const ident = value.replace(/!important\s*$/, "").trim();
                pushStatic(text, at, "css-static", ident);
            }
        }
    };

    for (const region of regions) {
        const isScriptLike = region.kind === "script" || region.kind === "ts";
        const isCssLike = region.kind === "css" || region.kind === "style";
        const isTemplate = region.kind === "template";
        const text = region.text;
        let m;

        if (isScriptLike) {
            // (a) object-property kebab mints:  "view-transition-name": <value>
            jsPropRe.lastIndex = 0;
            while ((m = jsPropRe.exec(text)) !== null) {
                const value = m[2].trim();
                if (isBareStaticString(value)) {
                    pushStatic(text, m.index, "js-static", value.replace(/^["']|["']$/g, ""));
                } else {
                    pushDynamic(text, m.index, value, value);
                }
            }
            // (b) template-literal / quoted style strings carrying the property
            //     with `${…}` — `el.style.cssText = `…view-transition-name:${x}…``.
            cssDeclRe.lastIndex = 0;
            while ((m = cssDeclRe.exec(text)) !== null) {
                const value = m[3];
                if (hasInterpolation(value)) {
                    pushDynamic(
                        text,
                        m.index + m[1].length,
                        value.trim(),
                        `${m[2]}: ${value.trim()}`,
                    );
                }
            }
            // (c) camelCase IDL assignment:  .viewTransitionName = <expr>
            idlAssignRe.lastIndex = 0;
            while ((m = idlAssignRe.exec(text)) !== null) {
                const value = m[2].trim();
                if (isBareStaticString(value)) {
                    pushStatic(text, m.index, "js-static", value.replace(/^["']|["']$/g, ""));
                } else {
                    pushDynamic(text, m.index, value, `.${m[1]} = ${value}`);
                }
            }
            // (d) setProperty 2-arg:  .setProperty("view-transition-name", <expr>)
            setPropRe.lastIndex = 0;
            while ((m = setPropRe.exec(text)) !== null) {
                const value = m[2].trim();
                if (isBareStaticString(value)) {
                    pushStatic(text, m.index, "js-static", value.replace(/^["']|["']$/g, ""));
                } else {
                    pushDynamic(text, m.index, value, `setProperty(${m[1]}, ${value})`);
                }
            }
            // (e) setAttribute("style", <string>) carrying the property.
            setAttrStyleRe.lastIndex = 0;
            while ((m = setAttrStyleRe.exec(text)) !== null) {
                const frag = m[1];
                const fragOffset = m[0].length - frag.length;
                scanStyleString(text, m.index, frag, fragOffset);
            }
        }

        if (isCssLike) {
            cssDeclRe.lastIndex = 0;
            while ((m = cssDeclRe.exec(text)) !== null) {
                const value = m[3].trim();
                if (hasInterpolation(value)) continue; // dynamic — not a CSS-static mint
                const ident = value.replace(/!important\s*$/, "").trim();
                pushStatic(text, m.index + m[1].length, "css-static", ident);
            }
        }

        if (isTemplate) {
            // (f) .vue <template> inline mints. Two forms:
            //   1. an inline / bound `style="…view-transition-name:…"` string —
            //      caught by the CSS-declaration scan over the template text.
            //   2. a `:style` binding OBJECT literal whose key is the camelCase
            //      IDL spelling — `{ viewTransitionName: <expr> }`. The kebab
            //      object key (`"view-transition-name": …`) is caught by jsPropRe.
            cssDeclRe.lastIndex = 0;
            while ((m = cssDeclRe.exec(text)) !== null) {
                const value = m[3].trim();
                const at = m.index + m[1].length;
                if (hasInterpolation(value)) {
                    pushDynamic(text, at, value, `${m[2]}: ${value}`);
                } else {
                    pushStatic(text, at, "css-static", value.replace(/!important\s*$/, "").trim());
                }
            }
            jsPropRe.lastIndex = 0;
            while ((m = jsPropRe.exec(text)) !== null) {
                const value = m[2].trim();
                if (isBareStaticString(value)) {
                    pushStatic(text, m.index, "js-static", value.replace(/^["']|["']$/g, ""));
                } else {
                    pushDynamic(text, m.index, value, value);
                }
            }
            tmplIdlKeyRe.lastIndex = 0;
            while ((m = tmplIdlKeyRe.exec(text)) !== null) {
                const value = m[2].trim();
                if (isBareStaticString(value)) {
                    pushStatic(text, m.index, "js-static", value.replace(/^["']|["']$/g, ""));
                } else {
                    pushDynamic(text, m.index, value, `${m[1]}: ${value}`);
                }
            }
        }
    }

    return { rel, mints, counterNames, bindings };
}

// ---------------------------------------------------------------------------
// Verdict
// ---------------------------------------------------------------------------
function verdictFor(mint, fileFacts) {
    if (mint.kind === "js-dynamic") {
        // PER-MINT DATAFLOW: the mint's VALUE expression must resolve to useId()
        // through this mint's own binding chain. The `expr` field carries the
        // raw value to trace (the GlassDock chain: `dockId.replace(…)` →
        // `dockId` → `` `glass-dock-${useId()}` ``). A value fed by a module-level
        // numeric counter, a `.length`, or a clock/random source is a VIOLATION;
        // a value with no useId derivation at all is a VIOLATION. A file that
        // merely MENTIONS useId() elsewhere no longer launders an unrelated
        // counter-fed mint — only useId() reached through THIS chain passes.
        const trace = traceMintSource(
            mint.expr ?? mint.source,
            fileFacts.counterNames,
            fileFacts.bindings,
        );
        if (trace.usesCounter) {
            return {
                verdict: "violation",
                reason: `dynamic mint traces to a module-level counter (one of: ${[...fileFacts.counterNames].join(", ")}) — restarts per module-graph copy and silently collides (the GlassDock bug); mint from useId() instead`,
            };
        }
        if (trace.usesVolatile && !trace.usesId) {
            return {
                verdict: "violation",
                reason: "dynamic mint traces to a volatile source (.length / Date.now() / performance.now() / Math.random()) — not app-unique; mint from useId() instead",
            };
        }
        if (!trace.usesId) {
            return {
                verdict: "violation",
                reason: "dynamic mint does not trace to useId() — its value must resolve (directly or through a module-scope binding chain) to Vue's app-scoped useId()",
            };
        }
        return { verdict: "pass", reason: "value traces to useId(); no module-level counter or volatile source" };
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
// Detect — the core per-file ruling: dedupe a file's mints and apply the
// verdict to each. Returns `{ mints, violations }` for ONE file's facts. This is
// the unit the spec drives (via detectSource below); `run()` folds it over the
// whole src/ tree.
// ---------------------------------------------------------------------------
export function detect(facts) {
    const mints = [];
    const violations = [];
    // One declaration can surface through two detection forms when forms nest
    // (a backtick style-string is both a form-(b) declaration AND, when wrapped
    // in `setAttribute("style", …)`, a form-(e) hit). Dedupe per file by
    // (line · kind · source) so a single mint is reported once.
    const seenKeys = new Set();
    for (const mint of facts.mints) {
        const key = `${mint.line}|${mint.kind}|${mint.source}`;
        if (seenKeys.has(key)) continue;
        seenKeys.add(key);
        const v = verdictFor(mint, facts);
        // `expr` is an internal tracing aid — keep it out of the report.
        const { expr: _expr, ...reported } = mint;
        const record = { ...reported, verdict: v.verdict };
        mints.push(record);
        if (v.verdict === "violation") {
            violations.push({ ...record, reason: v.reason });
        }
    }
    return { mints, violations };
}

// FS-free convenience: classify in-memory `source` text as if it were the file
// `path` (region kind keyed off the extension). The spec's entry point.
export function detectSource(path, source) {
    return detect(analyzeSource(path, source, path));
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------
function run() {
    const { ROOT, SRC, ARTIFACT } = cliPaths();
    const files = walk(SRC);
    const mints = [];
    const violations = [];

    for (const path of files) {
        const facts = analyzeFile(path);
        const ruled = detect(facts);
        mints.push(...ruled.mints);
        violations.push(...ruled.violations);
    }

    // Stable ordering for a deterministic artefact.
    const byLoc = (a, b) =>
        a.file === b.file ? a.line - b.line : a.file < b.file ? -1 : 1;
    mints.sort(byLoc);
    violations.sort(byLoc);

    const status = violations.length === 0 ? "pass" : "fail";
    // inv-θ: `generatedAt` is the only volatile field; dropped unless
    // GATE_SNAPSHOT=1, so the default cache artefact is byte-stable across runs.
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:vt-names",
        mints,
        violations,
    });

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

// CLI entry — walk src/ + fail-closed — runs ONLY when invoked directly
// (`node scripts/proof-vt-names.mjs`), not when imported by the spec (the import
// path leaves argv[1] as the test runner / unset, so this stays inert).
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
