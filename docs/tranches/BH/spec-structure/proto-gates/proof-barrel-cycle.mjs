#!/usr/bin/env node
// PROTOTYPE (BH round-6 spec-structure) — proof:import-boundaries CYCLE ARM.
//
// The G4 cycle-detection arm booked for the DEFERRED barrel-discipline pass
// (STRUCTURE-SPEC §6/G4, §9.3) — NOT the 5.0.0 flatten (a graph-invariant reroute).
// It closes the one class the flatten's boundary gate cannot: a component/sibling
// module that imports its OWN directory barrel (`./index`) while the barrel re-
// exports it — an A↔B (or longer) pure-re-export SCC. A runtime import cycle THROUGH
// a barrel is the DCE hazard the deferred guts→sibling-BARREL reroute must never
// re-introduce: Rolldown cannot cleanly split a barrel that participates in a
// runtime cycle, so the whole SCC hoists into one shared chunk every consumer drags.
//
// THE DECIDING DISTINCTION — VALUE edges only:
//   - A VALUE import/export edge (the statement imports/exports ≥1 runtime binding)
//     is a real runtime edge → participates in cycle detection.
//   - A TYPE-ONLY statement (`import type …`, `export type …`) is DCE-ERASED
//     (verbatimModuleSyntax strips it), so it forms NO runtime cycle — EXCLUDED
//     from the graph (mirrors proof:barrel-pure's `export type` exemption). A pure
//     type back-edge (ui/drawer/constants.ts `import type { DrawerDirection }
//     from "./index"`) is therefore NOT a violation.
//   - A DYNAMIC `import("…")` is a code-split boundary that BREAKS the synchronous
//     cycle (border-progress's spectrum-walk uses exactly this to defuse its would-
//     be color-leaf cycle) — EXCLUDED. Only STATIC value edges form a runtime SCC.
//
// VIOLATION := an SCC of size ≥2 that contains ≥1 BARREL node (a file named
// index.ts). A barrel inside a runtime cycle means its re-export graph is circular
// — the DCE hazard. The FIX is always to re-point the sibling's import off the
// barrel onto the CONCRETE sibling leaf (`./core`), breaking the cycle (the exact
// BH.5.0.0 `composables/color` un-mix: useAccentTone.ts `./index` → `./core`).
// Non-barrel SCCs are reported as ADVISORY facts (a component-internal cycle is a
// separate colocation smell, not this arm's scope).
//
// BORN-RED on HEAD by design: `composables/color/index.ts` ⇄ `useAccentTone.ts`
// (useAccentTone imports the VALUE `cssToOklch` from `./index`; the barrel re-
// exports `useAccentTone`) — a 2-node barrel SCC. GREEN after the un-mix.
//
// House style mirrors proof-import-boundaries.mjs / proof-no-god-module.mjs: a PURE
// detect() over an INJECTED adjacency (so the self-test plants synthetic graphs),
// a live scan that builds the real graph, a self-test bite per clause, fail-closed.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, dirname, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// ── ROOT — a --root=<path> arg lets the proto run READ-ONLY against the live main
//    tree (or a worktree); default is the enclosing repo of this script.
function resolveRoot() {
    const arg = process.argv.find((a) => a.startsWith("--root="));
    if (arg) return resolve(arg.slice("--root=".length));
    return resolve(fileURLToPath(new URL("../../../../../", import.meta.url)));
}
const ROOT = resolveRoot();
const SRC = resolve(ROOT, "src");
const rel = (p) => relative(ROOT, p).split(sep).join("/");

// ── comment-strip + .vue <script> extract (the shared walker primitives, inlined
//    here so the proto is self-contained; the SHIPPED gate composes the repo leaf
//    scripts/lib/critical-path-walk.mjs per the no-second-copy discipline).
function stripComments(text) {
    return text
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}
function vueScript(source) {
    const blocks = [...source.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)];
    return blocks.map((b) => b[1]).join("\n");
}

// ── VALUE static relative edge extraction. A statement is a VALUE edge unless the
//    WHOLE statement is `import type`/`export type`. Dynamic `import()` excluded.
//    Returns the set of relative specifiers this module value-depends on.
const IMPORT_FROM_RE =
    /(?:import|export)(\s+type)?\s+[^"';]*?from\s*["']([^"']+)["']/g;
const BARE_IMPORT_RE = /(?<!\.)\bimport\s+["']([^"']+)["']/g;
function valueEdges(source) {
    const specs = new Set();
    for (const m of source.matchAll(IMPORT_FROM_RE)) {
        const isTypeStatement = Boolean(m[1]); // `import type` / `export type`
        const spec = m[2];
        if (isTypeStatement) continue; // DCE-erased — no runtime edge
        if (spec.startsWith(".")) specs.add(spec);
    }
    for (const m of source.matchAll(BARE_IMPORT_RE)) {
        if (m[1].startsWith(".")) specs.add(m[1]); // bare `import "./x"` — value side effect
    }
    return specs;
}

// ── relative specifier → resolved file (index.ts / .ts / .vue resolution order).
function resolveTarget(fromFile, spec) {
    const base = resolve(dirname(fromFile), spec);
    const cands = [
        base,
        `${base}.ts`,
        `${base}.vue`,
        resolve(base, "index.ts"),
        resolve(base, "index.vue"),
    ];
    for (const c of cands) {
        if (existsSync(c) && statSync(c).isFile()) return c;
    }
    return null;
}

function collectFiles(dir, acc = []) {
    for (const name of readdirSync(dir)) {
        const p = resolve(dir, name);
        const st = statSync(p);
        if (st.isDirectory()) {
            if (name === "node_modules" || name === "__tests__") continue;
            collectFiles(p, acc);
        } else if (/\.(ts|vue)$/.test(name) && !/\.d\.ts$/.test(name)) {
            acc.push(p);
        }
    }
    return acc;
}

const isBarrel = (absPath) => /(^|\/)index\.ts$/.test(absPath.split(sep).join("/"));

// ── THE PURE DETECTOR — Tarjan SCC over an INJECTED adjacency `{ node: [targets] }`
//    + an `isBarrelNode(node)` predicate. Returns { sccs, violations }. VIOLATION :=
//    an SCC of size ≥2 containing ≥1 barrel node.
export function detectCycles(adj, isBarrelNode) {
    const index = new Map();
    const low = new Map();
    const onStack = new Set();
    const stack = [];
    const sccs = [];
    let counter = 0;
    const nodes = Object.keys(adj);

    function strongconnect(v) {
        // iterative Tarjan (recursion-depth-safe for a large src graph)
        const work = [[v, 0]];
        while (work.length) {
            const frame = work[work.length - 1];
            const [node, pi] = frame;
            if (pi === 0) {
                index.set(node, counter);
                low.set(node, counter);
                counter++;
                stack.push(node);
                onStack.add(node);
            }
            const succs = adj[node] ?? [];
            let recursed = false;
            for (let i = pi; i < succs.length; i++) {
                const w = succs[i];
                if (!index.has(w)) {
                    frame[1] = i + 1;
                    work.push([w, 0]);
                    recursed = true;
                    break;
                } else if (onStack.has(w)) {
                    low.set(node, Math.min(low.get(node), index.get(w)));
                }
            }
            if (recursed) continue;
            if (low.get(node) === index.get(node)) {
                const comp = [];
                let w;
                do {
                    w = stack.pop();
                    onStack.delete(w);
                    comp.push(w);
                } while (w !== node);
                if (comp.length >= 2) sccs.push(comp);
            }
            work.pop();
            if (work.length) {
                const parent = work[work.length - 1][0];
                low.set(parent, Math.min(low.get(parent), low.get(node)));
            }
        }
    }
    for (const v of nodes) if (!index.has(v)) strongconnect(v);

    const violations = [];
    for (const comp of sccs) {
        const barrels = comp.filter((n) => isBarrelNode(n));
        if (barrels.length > 0) {
            violations.push({
                scc: comp,
                barrels,
                kind: "barrel-cycle",
            });
        }
    }
    return { sccs, violations };
}

// ── live scan — build the real VALUE-import adjacency over src/**.
function scanGraph() {
    const files = collectFiles(SRC);
    const fileSet = new Set(files);
    const adj = {};
    for (const f of files) {
        let src = readFileSync(f, "utf8");
        if (f.endsWith(".vue")) src = vueScript(src);
        src = stripComments(src);
        const targets = [];
        for (const spec of valueEdges(src)) {
            const t = resolveTarget(f, spec);
            if (t && fileSet.has(t) && t !== f) targets.push(t);
        }
        adj[f] = [...new Set(targets)];
    }
    return adj;
}

// ── self-test — synthetic graphs over the pure detector + the erasure bite.
function selfTest() {
    const barrelOf = (n) => n.endsWith("/index.ts");
    // GOOD: a DAG (barrel → sibling → leaf, no back-edge).
    const dag = {
        "d/index.ts": ["d/core.ts", "d/useThing.ts"],
        "d/useThing.ts": ["d/core.ts"],
        "d/core.ts": ["ext/value.ts"],
        "ext/value.ts": [],
    };
    const baseGreen = detectCycles(dag, barrelOf).violations.length === 0;

    // Each bite declares an EXPECTation (red = a violation must be caught; green =
    // a good case must NOT be flagged). `pass` is the bite's own verdict.
    const bites = [];
    const bite = (name, expect, violations) =>
        bites.push({
            name,
            expect,
            pass: expect === "red" ? violations > 0 : violations === 0,
        });

    // (a) the color-shaped barrel↔sibling VALUE SCC — expect RED (caught).
    bite("a-barrel-sibling-scc-reds", "red", detectCycles({
        "d/index.ts": ["d/core.ts", "d/useThing.ts"],
        "d/useThing.ts": ["d/index.ts"], // sibling imports the barrel (value) — the cycle
        "d/core.ts": [],
    }, barrelOf).violations.length);

    // (b) a TYPE-ONLY back-edge is erased upstream (valueEdges drops it), so the
    //     barrel has NO back-edge — expect GREEN (no false positive; drawer's case).
    bite("b-type-only-back-edge-green", "green", detectCycles({
        "d/index.ts": ["d/constants.ts"],
        "d/constants.ts": [],
    }, barrelOf).violations.length);

    // (c) a 3-node barrel cycle A(index)→B→C→A — expect RED.
    bite("c-three-node-barrel-cycle-reds", "red", detectCycles({
        "d/index.ts": ["d/b.ts"],
        "d/b.ts": ["d/c.ts"],
        "d/c.ts": ["d/index.ts"],
    }, barrelOf).violations.length);

    // (d) a NON-barrel 2-node cycle is an SCC FACT but NOT a barrel-cycle violation
    //     (advisory only) — expect GREEN (violations === 0) AND detected as 1 SCC.
    const nb = detectCycles({ "d/a.ts": ["d/b.ts"], "d/b.ts": ["d/a.ts"] }, barrelOf);
    bites.push({
        name: "d-non-barrel-cycle-advisory-not-violation",
        expect: "green",
        pass: nb.violations.length === 0 && nb.sccs.length === 1,
    });

    // (e) a would-be barrel cycle whose sibling edge is a DYNAMIC import (excluded
    //     upstream by valueEdges) has NO back-edge — expect GREEN (border-progress's
    //     spectrum-walk defusal shape).
    bite("e-dynamic-import-defused-green", "green", detectCycles({
        "d/index.ts": ["d/shell.ts"],
        "d/shell.ts": [],
    }, barrelOf).violations.length);

    // (f) the MINIMAL-un-mix trap — a PURE barrel (0 own-runtime exports) whose SFC
    //     still imports the barrel is STILL a cycle. Proves barrel-purity ≠ cycle-
    //     freedom (the round-6 finding): re-pointing the SFC to the concrete leaf is
    //     what breaks it. Expect RED.
    bite("f-pure-barrel-still-cyclic-reds", "red", detectCycles({
        "d/index.ts": ["d/Comp.vue", "d/variants.ts"], // pure: export {Comp} + export * from variants
        "d/Comp.vue": ["d/index.ts"], // SFC still imports variants THROUGH the barrel
        "d/variants.ts": [],
    }, barrelOf).violations.length);

    // (g) the deferred-pass FIX — the SFC re-points to the concrete sibling; the
    //     cycle breaks. Expect GREEN.
    bite("g-sfc-repointed-to-leaf-green", "green", detectCycles({
        "d/index.ts": ["d/Comp.vue", "d/variants.ts"],
        "d/Comp.vue": ["d/variants.ts"], // re-pointed OFF the barrel — no back-edge
        "d/variants.ts": [],
    }, barrelOf).violations.length);

    return { baseGreen, bites };
}

// ── the valueEdges erasure unit — proves `import type`/dynamic are dropped, the
//    load-bearing precondition of bites (b) + (e).
function erasureUnit() {
    const typeStmt = `import type { DrawerDirection } from "./index";`;
    const valueStmt = `import { cssToOklch, type OklchStop } from "./index";`;
    const dynStmt = `const x = import("./spectrum-walk");`;
    const bareStmt = `import "./side-effect";`;
    return {
        typeErased: !valueEdges(typeStmt).has("./index"),
        valueKept: valueEdges(valueStmt).has("./index"),
        dynExcluded: !valueEdges(dynStmt).has("./spectrum-walk"),
        bareKept: valueEdges(bareStmt).has("./side-effect"),
    };
}

function run() {
    const adj = scanGraph();
    const { sccs, violations } = detectCycles(adj, isBarrel);

    const st = selfTest();
    const eu = erasureUnit();
    const errs = [];
    if (!st.baseGreen) errs.push("self-test: GOOD DAG did not green (detector over-strict)");
    const biteFail = st.bites.filter((b) => !b.pass).map((b) => b.name);
    if (biteFail.length) errs.push(`self-test bite(s) failed: ${biteFail.join(", ")}`);
    if (!eu.typeErased) errs.push("erasure-unit: `import type` was NOT erased");
    if (!eu.valueKept) errs.push("erasure-unit: a value edge was dropped");
    if (!eu.dynExcluded) errs.push("erasure-unit: a dynamic import() was NOT excluded");
    if (!eu.bareKept) errs.push("erasure-unit: a bare `import \"./x\"` value side-effect was dropped");

    const barrelViolations = violations.length;
    const status = barrelViolations === 0 && errs.length === 0 ? "pass" : "fail";

    console.log("proof:barrel-cycle — the G4 barrel-SCC cycle arm (BH round-6 proto)");
    console.log(`  root                        : ${ROOT}`);
    console.log(`  SCCs (size≥2) total         : ${sccs.length}`);
    console.log(`  barrel-cycle VIOLATIONS     : ${barrelViolations}`);
    console.log(`  self-test base green        : ${st.baseGreen ? "✓" : "✗"}`);
    console.log(`  self-test bites (${st.bites.length}) pass    : ${biteFail.length === 0 ? "✓" : "✗ " + biteFail.join(",")}`);
    console.log(`  erasure-unit (type/dyn/bare): ${eu.typeErased && eu.valueKept && eu.dynExcluded && eu.bareKept ? "✓" : "✗"}`);

    if (violations.length) {
        console.log("\nBARREL-CYCLE VIOLATIONS (re-point the sibling import off the barrel onto the concrete leaf):");
        for (const v of violations) {
            console.log(`  ✗ SCC {${v.scc.map(rel).join(" ⇄ ")}}`);
            console.log(`      barrel node(s): ${v.barrels.map(rel).join(", ")}`);
        }
    }
    // advisory: non-barrel SCCs
    const advisory = sccs.filter((c) => !c.some(isBarrel));
    if (advisory.length) {
        console.log("\nADVISORY (non-barrel SCCs — component-internal cycles, out of this arm's scope):");
        for (const c of advisory) console.log(`  · {${c.map(rel).join(" ⇄ ")}}`);
    }
    if (errs.length) {
        console.log("\nGATE ERRORS:");
        for (const e of errs) console.log(`  ✗ ${e}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
