#!/usr/bin/env node
// PROTOTYPE (BH round-2 spec-structure G4) — proof:import-boundaries.
//
// The 4-node DAG (STRUCTURE-SPEC §2.5, B3):
//     shared/composables → components → subpath-entries (src/*.ts) → app
// The curated SUBPATH-ENTRY layer is the ONLY node exempt from the shared→
// components prohibition: it alone reaches BOTH directions (re-export from
// shared AND from a component's deep colocated leaf, §2.1 B4 deep-leaf
// exemption). Every other edge obeys the DAG. Concretely:
//   - subpath-entry  → *            ALWAYS legal (the exempt publish node)
//   - components     → shared        legal (the UP edge)
//   - components     → same-component legal (a component reaches its own guts)
//   - components     → other-BARREL   legal (compose a sibling via its index.ts)
//   - components     → other-GUTS     RED   (reach into another comp's
//                                           composables/shaders/sections leaf)
//        · other-GUTS that is a DI-CONTEXT module (createStrictContext/
//          createOptionalContext) → DISTINCT verdict: PROMOTE-to-composables/
//          context/ (NOT barrel-route — routing a context reader through the
//          provider's barrel drags the provider's SFC graph into the reader's
//          chunk; the round-2 dockContext case, verified live: 5 foreign readers).
//   - shared         → shared         legal
//   - shared         → components     RED   (the prohibition) — EXCEPT an
//                                           aggregator `export *` re-export from
//                                           an index.ts barrel (a PUBLISH edge,
//                                           the T3 root-barrel/aggregator carve)
//   - shared/components → subpath-entry RED (no reach up to the publish layer)
//
// The pure evaluateEdge() runs over an INJECTED edge descriptor so the self-test
// can feed synthetic edges (the proof:no-god-module detect() precedent).
//
// Self-test bites (the directive's three + a directional-legality bite + the
// round-3 DI-context PROMOTE bite):
//   (a) a shared→components import edge REDs;
//   (b) a subpath-entry deep-leaf re-export PASSES;
//   (c) a cross-component reach into another component's guts REDs (the
//       BURIED-PRIMITIVE bite — generic "promote to the shared tree" verdict);
//   (d) morphSignatures — a shared leaf imported by a sibling shared leaf
//       (useGooMorph) — is a legal shared→shared edge (never flagged), and a
//       component importing it (dock) is a legal components→shared UP edge;
//   (f) a cross-component reach into a DI-CONTEXT guts leaf REDs with the
//       DISTINCT PROMOTE-to-composables/context/ verdict (the dockContext
//       case), and the SAME guts geometry over a NON-DI leaf keeps the generic
//       buried-primitive verdict — the two verdicts are decidably distinct.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, relative, dirname, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// ── ROOT resolution — a --root=<path> arg lets the proto run READ-ONLY against
//    the live main tree; default is the enclosing repo of this script.
function resolveRoot() {
    const arg = process.argv.find((a) => a.startsWith("--root="));
    if (arg) return resolve(arg.slice("--root=".length));
    return resolve(fileURLToPath(new URL("../../", import.meta.url)));
}
const ROOT = resolveRoot();
const SRC = resolve(ROOT, "src");
const rel = (p) => relative(ROOT, p).split(sep).join("/");

const SEGMENT_DIRS = new Set([
    "composables", "shaders", "skeleton", "styles", "sections", "constants", "utils", "config",
]);

// The subpath-entry node: the curated flat src/*.ts publish barrels + the 78
// src/subpaths/*.ts mirror barrels + the api aggregator. This node is exempt.
function isSubpathEntry(relPath) {
    return (
        /^src\/[a-z-]+\.ts$/.test(relPath) ||        // src/motion.ts, src/index.ts, …
        /^src\/subpaths\/[a-z0-9-]+\.ts$/.test(relPath) ||
        relPath === "src/api/index.ts"
    );
}

/** Classify a src-relative POSIX path into a DAG node. */
function classifyNode(relPath) {
    if (isSubpathEntry(relPath)) return "subpath-entry";
    if (relPath.startsWith("src/composables/")) return "shared";
    if (relPath.startsWith("src/components/")) return "components";
    return "neutral"; // utils/, styles/, standalone leaves — not DAG-governed here
}

/** The top-level component family for a components/ path (ui|custom)/<name>. */
function componentFamily(relPath) {
    const m = relPath.match(/^src\/components\/(?:ui|custom)\/([a-z0-9-]+)\//);
    return m ? m[1] : null;
}

/** True if the target path is a DEEP GUTS leaf (under a segment dir), not the
 *  component's public barrel or a root-level file. */
function isComponentGuts(relPath) {
    const m = relPath.match(/^src\/components\/(?:ui|custom)\/[a-z0-9-]+\/(.+)$/);
    if (!m) return false;
    const tail = m[1];
    if (!tail.includes("/")) return false; // root-level file (the barrel/SFC), not guts
    const firstSeg = tail.split("/")[0];
    return SEGMENT_DIRS.has(firstSeg);
}

// ── DI-context DEFINITION detector.
// A DI-context leaf is a module that CALLS createStrictContext / createOptionalContext
// (the house DI factory pair, `composables/context/`). The `[<(]` guard matches the
// CALL / generic-instantiation form (`createStrictContext<DockContext>(`) and NOT the
// bare import specifier (`import { createStrictContext }`), so an importer that never
// mints a context is not a false DI-context leaf. Cached by absolute path.
const CTX_DEF_RE = /create(?:Strict|Optional)Context\s*[<(]/;
const _diCache = new Map();
function isDiContextModule(absPath) {
    if (!absPath) return false;
    if (_diCache.has(absPath)) return _diCache.get(absPath);
    let src = "";
    try { src = readFileSync(absPath, "utf8"); } catch { /* unreadable → not DI */ }
    if (absPath.endsWith(".vue")) src = vueScript(src);
    const isCtx = CTX_DEF_RE.test(stripComments(src));
    _diCache.set(absPath, isCtx);
    return isCtx;
}

/**
 * The PURE edge adjudicator. `edge` = {
 *   sourceNode, targetNode,      // DAG node classes
 *   sameComponent,               // both under the SAME component family
 *   targetIsGuts,                // target is a deep segment leaf
 *   targetIsDiContext,           // target guts leaf mints a DI context (createStrict/OptionalContext)
 *   isBarrelReexport,            // the edge is `export * from` (aggregator/publish)
 * }
 * Returns a violation string, or null when the edge is legal.
 */
export function evaluateEdge(edge) {
    const {
        sourceNode, targetNode, sameComponent, targetIsGuts, targetIsDiContext, isBarrelReexport,
    } = edge;

    // The exempt publish node reaches BOTH directions.
    if (sourceNode === "subpath-entry") return null;

    // Nothing may reach UP into the subpath-entry publish layer.
    if (targetNode === "subpath-entry") {
        return `${sourceNode} → subpath-entry: no node may import the curated publish layer (src/*.ts) — it is the sink, not a dependency`;
    }

    if (sourceNode === "shared") {
        if (targetNode === "shared") return null;
        if (targetNode === "components") {
            // The aggregator carve — an `export *` re-export from an index.ts
            // barrel is a PUBLISH edge (the co-located domain composable
            // re-surfaced through the shared aggregate), not a family dependency.
            if (isBarrelReexport) return null;
            return `shared → components: a shared-tree leaf reaches down into components/ (the DAG prohibition); a shared primitive must not depend on a component`;
        }
        return null;
    }

    if (sourceNode === "components") {
        if (targetNode === "shared") return null;       // the UP edge
        if (targetNode === "components") {
            if (sameComponent) return null;              // own guts — fine
            if (targetIsGuts) {
                // The DI-context sub-ruling (round-2 fold, round-3 bite): a foreign
                // reach into a createStrictContext/createOptionalContext DI leaf is
                // NOT resolvable by barrel-route (routing a context reader through
                // the provider's PUBLIC barrel drags the provider's SFC graph into
                // the reader's chunk — the exact chunk-hostile outcome the dockContext
                // case forbids). Its resolution is DISTINCT: PROMOTE the SFC-free
                // context leaf to composables/context/ and import it UP.
                if (targetIsDiContext) {
                    return `components → components-GUTS(DI-context): a foreign component reaches into a createStrictContext/createOptionalContext DI leaf — barrel-route would drag the provider's SFC graph into the reader's chunk; PROMOTE the context leaf to composables/context/ (InjectionKey + types + helper pair, SFC-free) and import it UP (§1.3 T3)`;
                }
                return `components → components-GUTS: a component reaches into ANOTHER component's deep leaf (composables/shaders/sections) — cross-component imports go through the public barrel only (B4); promote the shared primitive to the shared tree`;
            }
            return null;                                  // sibling BARREL compose — fine
        }
        return null;
    }
    return null; // neutral source — not DAG-governed
}

// ── The edge extractor (reuse of the house comment-strip + edge regex shape).
function stripComments(text) {
    let out = "";
    let i = 0;
    while (i < text.length) {
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? text.length : end + 2;
            for (let j = i; j < stop; j++) out += text[j] === "\n" ? "\n" : " ";
            i = stop;
        } else if (text[i] === "/" && text[i + 1] === "/") {
            const nl = text.indexOf("\n", i);
            const stop = nl === -1 ? text.length : nl;
            for (let j = i; j < stop; j++) out += " ";
            i = stop;
        } else { out += text[i]; i++; }
    }
    return out;
}
function vueScript(source) {
    let body = "";
    for (const m of source.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)) body += `${m[1]}\n`;
    return body;
}
function resolveTarget(fromFile, specifier) {
    if (!specifier.startsWith(".")) return null;
    const base = resolve(dirname(fromFile), specifier);
    const cands = [`${base}.ts`, `${base}.vue`, `${base}.tsx`, resolve(base, "index.ts"), resolve(base, "index.vue"), base];
    return cands.find((c) => existsSync(c) && statSync(c).isFile()) ?? null;
}
// Match an edge and whether it is an `export * from` (aggregator re-export).
const EDGE_RE = /(?<reexport>export\s*\*\s*from|export\s+[^"';]*?from|import\s+[^"';]*?from|import)\s*["']([^"']+)["']/g;

function collectFiles(dir, acc) {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
        const full = resolve(dir, e.name);
        if (e.isDirectory()) {
            if (e.name === "__tests__" || e.name === "node_modules") continue;
            collectFiles(full, acc);
        } else if (/\.(ts|vue)$/.test(e.name) && !e.name.endsWith(".d.ts")) acc.push(full);
    }
    return acc;
}

function scanEdges() {
    const files = collectFiles(SRC, []);
    const edges = [];
    for (const f of files) {
        const relFrom = rel(f);
        let src = readFileSync(f, "utf8");
        if (f.endsWith(".vue")) src = vueScript(src);
        src = stripComments(src);
        for (const m of src.matchAll(EDGE_RE)) {
            const spec = m[2];
            if (!spec || !spec.startsWith(".")) continue;
            const target = resolveTarget(f, spec);
            if (!target) continue;
            const relTo = rel(target);
            const isBarrelReexport = /export\s*\*\s*from/.test(m[1]) && /\/index\.ts$/.test(relFrom);
            const targetIsGuts = isComponentGuts(relTo);
            edges.push({
                from: relFrom,
                to: relTo,
                sourceNode: classifyNode(relFrom),
                targetNode: classifyNode(relTo),
                sameComponent:
                    componentFamily(relFrom) !== null &&
                    componentFamily(relFrom) === componentFamily(relTo),
                targetIsGuts,
                // DI-context is meaningful only on a cross-component guts reach.
                targetIsDiContext: targetIsGuts && isDiContextModule(target),
                isBarrelReexport,
            });
        }
    }
    return edges;
}

// ── The self-test bites.
function selfTest() {
    const fails = [];
    let count = 0;
    const check = (edge, shouldFlag, name) => {
        count++;
        const v = evaluateEdge(edge);
        if (shouldFlag && !v) fails.push(`[SELF-TEST] expected FLAG but passed: ${name}`);
        if (!shouldFlag && v) fails.push(`[SELF-TEST] expected PASS but flagged (${v}): ${name}`);
    };
    // (a) a shared→components import edge REDs.
    check(
        { sourceNode: "shared", targetNode: "components", sameComponent: false, targetIsGuts: true, targetIsDiContext: false, isBarrelReexport: false },
        true, "shared→components import edge",
    );
    // (a-fence) the aggregator `export *` re-export from a barrel PASSES.
    check(
        { sourceNode: "shared", targetNode: "components", sameComponent: false, targetIsGuts: false, targetIsDiContext: false, isBarrelReexport: true },
        false, "shared→components aggregator export* re-export (the composables/index.ts carve)",
    );
    // (b) a subpath-entry deep-leaf re-export PASSES.
    check(
        { sourceNode: "subpath-entry", targetNode: "components", sameComponent: false, targetIsGuts: true, targetIsDiContext: false, isBarrelReexport: true },
        false, "subpath-entry deep-leaf re-export (src/motion.ts → dock/composables/useDockCtaReceive)",
    );
    // (c) a cross-component reach into another component's guts REDs (BURIED-PRIMITIVE).
    check(
        { sourceNode: "components", targetNode: "components", sameComponent: false, targetIsGuts: true, targetIsDiContext: false, isBarrelReexport: false },
        true, "cross-component guts reach (concentric → liquid-grid/composables)",
    );
    // (c-fence) a component reaching its OWN guts PASSES.
    check(
        { sourceNode: "components", targetNode: "components", sameComponent: true, targetIsGuts: true, targetIsDiContext: false, isBarrelReexport: false },
        false, "component reaches its own composables/ (legal)",
    );
    // (c-fence2) a component composing a SIBLING via its public barrel PASSES.
    check(
        { sourceNode: "components", targetNode: "components", sameComponent: false, targetIsGuts: false, targetIsDiContext: false, isBarrelReexport: false },
        false, "component composes a sibling via its index.ts barrel (metric-pill → metric-badge)",
    );
    // (d) morphSignatures — components→shared UP edge PASSES; shared→shared PASSES.
    check(
        { sourceNode: "components", targetNode: "shared", sameComponent: false, targetIsGuts: false, targetIsDiContext: false, isBarrelReexport: false },
        false, "dock → shared/composables/motion/morphSignatures (the UP edge)",
    );
    check(
        { sourceNode: "shared", targetNode: "shared", sameComponent: false, targetIsGuts: false, targetIsDiContext: false, isBarrelReexport: false },
        false, "useGooMorph → morphSignatures (sibling shared→shared, keeps it shared)",
    );
    // (e) nothing reaches UP into the publish layer.
    check(
        { sourceNode: "components", targetNode: "subpath-entry", sameComponent: false, targetIsGuts: false, targetIsDiContext: false, isBarrelReexport: false },
        true, "component imports a src/*.ts subpath barrel (illegal reach into the sink)",
    );

    // (f) THE DI-CONTEXT PROMOTE bite (round-3). A cross-component reach into a
    // DI-context guts leaf REDs with the DISTINCT promote-to-composables/context/
    // verdict — and the SAME guts geometry over a NON-DI leaf keeps the generic
    // buried-primitive verdict. The two verdicts must be decidably DISTINCT (the
    // dockContext case: routing 5 foreign readers through the dock barrel is
    // chunk-hostile, so the gate must NOT emit the generic barrel-route advice).
    const diEdge = { sourceNode: "components", targetNode: "components", sameComponent: false, targetIsGuts: true, targetIsDiContext: true, isBarrelReexport: false };
    const nonDiEdge = { sourceNode: "components", targetNode: "components", sameComponent: false, targetIsGuts: true, targetIsDiContext: false, isBarrelReexport: false };
    check(diEdge, true, "DI-context guts reach (5 foreign → dock/composables/dockContext.ts) flags PROMOTE-to-context");
    count++; // the three distinctness sub-asserts count as one composite bite
    const diVerdict = evaluateEdge(diEdge) || "";
    const nonDiVerdict = evaluateEdge(nonDiEdge) || "";
    if (!/composables\/context\//.test(diVerdict)) {
        fails.push("[SELF-TEST] DI-context verdict does not name composables/context/ (the promote target)");
    }
    if (/composables\/context\//.test(nonDiVerdict)) {
        fails.push("[SELF-TEST] buried-primitive verdict wrongly names composables/context/ (not distinct)");
    }
    if (diVerdict === nonDiVerdict) {
        fails.push("[SELF-TEST] DI-context and buried-primitive verdicts are IDENTICAL (not distinct)");
    }

    return { fails, count };
}

function run() {
    const edges = scanEdges();
    const violations = [];
    for (const e of edges) {
        const v = evaluateEdge(e);
        if (v) violations.push(`${e.from} → ${e.to}\n     ${v}`);
    }
    const { fails: selfFails, count: selfCount } = selfTest();
    violations.push(...selfFails);

    // The interesting edge classes, reported as facts.
    const carved = edges.filter((e) => e.sourceNode === "shared" && e.targetNode === "components" && e.isBarrelReexport);
    const gutsReach = edges.filter((e) => e.sourceNode === "components" && e.targetNode === "components" && !e.sameComponent && e.targetIsGuts);
    const diReach = gutsReach.filter((e) => e.targetIsDiContext);

    // The ≥2-FOREIGN-reader PROMOTE-to-context census (the aggregate driver): group
    // DI-context guts reaches by target, count DISTINCT reading families, and name
    // the targets read by ≥2 foreign families (the dockContext driver).
    const diByTarget = new Map();
    for (const e of diReach) {
        const fam = componentFamily(e.from);
        if (!diByTarget.has(e.to)) diByTarget.set(e.to, new Set());
        diByTarget.get(e.to).add(fam);
    }

    console.log("PROTO proof:import-boundaries — the 4-node DAG (shared → components → subpath-entries → app)");
    console.log(`  scanned ${edges.length} relative src edges (root=${rel(SRC)})`);
    console.log(`  shared→components aggregator re-exports (CARVED, legal): ${carved.length}`);
    for (const c of carved) console.log(`    ~ ${c.from} → ${c.to}`);
    console.log(`  cross-component GUTS reaches (RED): ${gutsReach.length}`);
    for (const g of gutsReach) console.log(`    ✗ ${g.from} → ${g.to}${g.targetIsDiContext ? "  [DI-context → PROMOTE-to-composables/context/]" : ""}`);
    console.log(`  DI-context ≥2-foreign PROMOTE-to-context census:`);
    for (const [target, fams] of diByTarget) {
        console.log(`    ${fams.size >= 2 ? "⇧ PROMOTE" : "· single-family"}  ${target} ← {${[...fams].join(", ")}} (${fams.size} foreign)`);
    }
    console.log(`  self-test bites: ${selfFails.length === 0 ? `${selfCount}/${selfCount} handled ✓` : selfFails.length + " FAILED"}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    const status = violations.length === 0 ? "PASS" : "FAIL";
    console.log(`\n  status: ${status}`);
    process.exit(violations.length === 0 ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) run();
