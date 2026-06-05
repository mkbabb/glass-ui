#!/usr/bin/env node
// AU.W5 — the color-acyclic gate (proof:color-acyclic).
//
// The `/color` leaf (`src/composables/color/`) is the shared runtime-JS color core
// aurora + the goo-blob consume. inv-AT-color: the published graph must be a DAG —
// the leaf imports value.js; value.js's PUBLISHED lib never imports glass-ui; and
// the leaf never back-imports a glass-ui component (which would close a cycle into
// the very surfaces that depend on it). This gate asserts both:
//
//   (a) THE LEAF IS A TRUE LEAF — its transitive relative-import graph reaches NO
//       module under src/components/, and its bare (package) imports are only
//       value.js / vue / node builtins.
//   (b) THE DAG HOLDS ON THE value.js SIDE — value.js's `src/` imports
//       `@mkbabb/glass-ui` ZERO times (when the sibling is checked out; else the
//       structural devDep proof — value.js is glass-ui's dependency, not vice versa).
//
// inv ε / bite-check: a glass-ui → value.js → glass-ui cycle (the leaf importing a
// component, OR value.js/src importing glass-ui) reddens it.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { PARENT, resolveSibling } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ALLOWED_BARE = [/^@mkbabb\/value\.js(\/|$)/, /^vue$/, /^node:/];

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        LEAF: resolve(ROOT, "src/composables/color/index.ts"),
        COMPONENTS: resolve(ROOT, "src/components"),
        VALUEJS_SRC: resolve(PARENT, "value.js/src"),
        ARTIFACT: gateArtifactPath("GLASS_UI_COLOR_ACYCLIC_ARTIFACT", "AU-color-acyclic"),
    };
    return _cliPaths;
}

function stripComments(t) {
    return t.replace(/\/\*[\s\S]*?\*\//g, " ").split("\n").map((l) => { const i = l.indexOf("//"); return i === -1 ? l : l.slice(0, i); }).join("\n");
}
function resolveRel(fromFile, spec) {
    if (!spec.startsWith(".")) return null;
    const base = resolve(dirname(fromFile), spec);
    for (const c of [`${base}.ts`, `${base}.tsx`, `${base}.js`, `${base}.vue`, join(base, "index.ts"), join(base, "index.js"), base]) {
        if (existsSync(c) && statSync(c).isFile()) return c;
    }
    return null;
}

function run() {
    const { ROOT, LEAF, COMPONENTS, VALUEJS_SRC, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = { bareImports: new Set(), reached: [] };

    // (a) walk the leaf graph
    const seen = new Set();
    const stack = [LEAF];
    while (stack.length) {
        const file = resolve(stack.pop());
        if (seen.has(file) || !existsSync(file)) continue;
        seen.add(file);
        facts.reached.push(file.slice(ROOT.length + 1));
        if (file.startsWith(COMPONENTS + "/") && file !== LEAF) {
            violations.push(`the /color leaf transitively reaches a glass-ui COMPONENT (${file.slice(ROOT.length + 1)}) — a back-import that would close a cycle`);
        }
        const src = stripComments(readFileSync(file, "utf8"));
        for (const m of src.matchAll(/(?:import|export)\s+[^"';]*?from\s*["']([^"']+)["']|import\s*\(\s*["']([^"']+)["']\s*\)/g)) {
            const spec = m[1] ?? m[2];
            if (!spec) continue;
            if (spec.startsWith(".")) {
                const t = resolveRel(file, spec);
                if (t) stack.push(t);
            } else {
                facts.bareImports.add(spec);
                if (!ALLOWED_BARE.some((re) => re.test(spec))) {
                    violations.push(`the /color leaf graph imports a disallowed package "${spec}" (only value.js / vue / node builtins are leaf-safe)`);
                }
            }
        }
    }
    facts.bareImports = [...facts.bareImports];

    // (b) the value.js side of the DAG
    const sib = resolveSibling({ id: "value.js", dir: resolve(VALUEJS_SRC, "..") });
    if (sib.present && existsSync(VALUEJS_SRC)) {
        const hits = [];
        const walk = (d) => { for (const n of readdirSync(d)) { if (n === "node_modules") continue; const p = join(d, n); const st = statSync(p); if (st.isDirectory()) walk(p); else if (/\.(ts|tsx|js|vue)$/.test(n) && /@mkbabb\/glass-ui/.test(readFileSync(p, "utf8"))) hits.push(p); } };
        walk(VALUEJS_SRC);
        facts.valueJsGlassUiImports = hits.length;
        if (hits.length) violations.push(`value.js/src imports @mkbabb/glass-ui (${hits.length} file(s)) — the published graph is NOT a DAG`);
    } else {
        facts.valueJsGlassUiImports = "(sibling absent — structural: value.js is glass-ui's dep, not vice versa)";
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:color-acyclic", facts: { ...facts, reached: facts.reached.length }, violations });

    console.log("proof:color-acyclic — the /color leaf graph is a DAG (AU.W5)");
    console.log(`  leaf modules reached : ${facts.reached.length}`);
    console.log(`  bare imports         : [${facts.bareImports.join(", ")}]`);
    console.log(`  value.js→glass-ui    : ${facts.valueJsGlassUiImports}`);
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
