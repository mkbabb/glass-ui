#!/usr/bin/env node
// import-dag.mjs — the TYPED-EDGE import graph (v3), BK #21 W-DAG-REDUCE's instrument.
// ============================================================================
// WHY A THIRD PASS EXISTS, stated so the figures it emits can be judged.
//
// Pass 1 (`IMPORT-DAG-PASS1.json`, 2,182 edges / 9 cycles) is RETIRED: it omitted
// 19 Vue external-block refs and 107 Vite glob story edges, so its cycle count was
// an artifact of what it could not see. Pass 2
// (`docs/tranches/BJ/audits/2026-07-28-library-dag/IMPORT-DAG-V2.json`) closed both
// blind spots and is the census this file supersedes. Both receipts are preserved;
// neither is edited.
//
// V2'S REMAINING BLINDNESS, AND THE WHOLE REASON FOR V3: v2 resolves specifiers with
// `ts.preProcessFile`, which reports THAT a file is imported and never WHY. So
// `import type { DockAxis } from "../dock"` and `import { GlassDock } from "../dock"`
// are the same edge to it. They are not the same edge to a bundler, to a cycle, or to
// this wave: a TYPE-ONLY edge is ERASED at compile time and cannot participate in a
// runtime import cycle. A strongly-connected component held together by type edges is
// a NAMING knot, not an initialisation hazard, and the two cost completely different
// things to dissolve. Counting them together is how "3 module SCCs" becomes an
// unactionable number.
//
// SO V3 EMITS TWO GRAPHS FROM ONE WALK:
//   · the FULL graph   — every edge v2 saw, so the two censuses are comparable, and
//   · the VALUE graph  — value edges only (type/style/glob edges dropped), which is
//                        the graph a runtime cycle actually lives in.
// The delta between their SCC sets is this wave's work list, and it is derived rather
// than asserted.
//
// EDGE TYPES (the `type` field on every internal edge):
//   value         — a runtime `import`/`export … from`, or a bare side-effect import.
//   type          — `import type` / `export type`, or a clause whose every named
//                   specifier carries its own `type` keyword. Erased at compile time.
//   style         — a CSS `@import` or `url()`.
//   vue-block-src — a `<style|script|template src="…">` external block ref.
//   glob          — an `import.meta.glob` literal-pattern expansion.
//
// THE OWNER MANIFEST is FAIL-CLOSED (the `regen-exports.mjs` discipline): every module
// inside a module SCC of size > 1 MUST carry an explicit owner below, or this script
// exits 1. A cycle whose owner is unnamed is a cycle nobody is going to dissolve — the
// v2 census listed its SCCs and named no seat, and the rows sat unowned for a tranche.
//
// USAGE
//   node scripts/import-dag.mjs                 — human census to stdout.
//   node scripts/import-dag.mjs --json          — the machine report.
//   node scripts/import-dag.mjs --json --out P  — write the report to P.
//   node scripts/import-dag.mjs --module M      — explain one module's in/out edges.
// ============================================================================

import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import ts from "typescript";

const REPO_ROOT = resolve(import.meta.dirname, "..");
const PRODUCT_ROOTS = ["src", "demo"];
const RESOLVABLE_EXTENSIONS = [
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".mjs",
    ".vue",
    ".css",
    ".json",
    ".md",
    ".woff2",
    ".txt",
];
const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".vue", ".css"]);
const SKIP_DIRECTORIES = new Set(["node_modules", ".git", "dist"]);

// ---------------------------------------------------------------------------
// THE OWNER MANIFEST — fail-closed. Module prefix → the seat that owns its edges.
// Longest prefix wins. Adding a module to the tree without adding it here is only an
// error if that module lands inside a cycle; an acyclic module needs no owner.
// ---------------------------------------------------------------------------
const OWNER_MANIFEST = [
    // M01 — the demo manifest/story knot. The manifest seam is #58/#56's, NOT #21's.
    ["demo/stories", "#58/#56 — M01 manifest seam"],
    ["demo/chassis", "#58 — chassis (W-COLOCATION #62 co-lands)"],
    // [2026-08-10 · BK #21 W-DAG-REDUCE — M03 DISSOLVED, its owner rows STRUCK.]
    // ~~["demo/shell", "#21 — M03 demo↔shell"]~~
    // ~~["demo",       "#21 — M03 demo↔shell"]~~
    // `demo` ↔ `demo/shell` was severed at this row (the `shellFieldActive` back edge is
    // now a local computed in `AppShell.vue`). A dissolved cycle keeps no owner: leaving
    // the rows here would let a RE-FORMED M03 find an owner and pass the fail-closed
    // check below, so the lock would be decorative. Struck, the census FAIL-CLOSES on any
    // re-formation — and because it resolves specifiers on DISK, it closes every specifier
    // shape at once (`../router`, `../../demo/router`, `../router.ts`, dynamic
    // `import("../router")`), which is what the regex tripwire in
    // `tests/demo/router-field-ownership.test.ts` cannot do.
    // Verified safe on today's bytes: no member of M01 (`demo/chassis*` + `demo/stories*`),
    // M02, or `dialog`↔`sheet` is `demo` or `demo/shell`, so the census stays exit 0 now
    // and exits 1 the moment the cycle returns. Restoring either row requires re-arguing
    // the dissolution.
    // M02 — the component knot. #89 owns the dock↔menu edge; #21 owns the module SCC.
    ["src/components/dock", "#89 — M02 dock edge (sever landed)"],
    ["src/components/menu", "#89 — M02 menu edge (was dropdown-menu)"],
    ["src/components/_shared", "#21 — M02 module SCC"],
    ["src/components/search", "#21 — M02 module SCC"],
    ["src/components/select", "#21 — M02 module SCC"],
    ["src/components/tabs", "#21 — M02 module SCC"],
    ["src/components/tooltip", "#21 — M02 module SCC"],
    ["src/composables/glass", "#21 — M02 module SCC"],
    ["src/composables/motion", "#21 — M02 module SCC"],
    // Everything else in the library proper.
    ["src/components", "#21 — library modules"],
    ["src/composables", "#21 — library modules"],
    ["src/styles", "#19 — style registers"],
    ["src", "#21 — library root"],
];

function ownerOf(module) {
    let best = null;
    for (const [prefix, owner] of OWNER_MANIFEST) {
        if (module === prefix || module.startsWith(`${prefix}/`)) {
            if (best === null || prefix.length > best.prefix.length) best = { prefix, owner };
        }
    }
    return best?.owner ?? null;
}

// ---------------------------------------------------------------------------
// WALK + RESOLVE — the v2 machinery, unchanged in behaviour so the two censuses
// stay comparable. Only the edge TYPING below it is new.
// ---------------------------------------------------------------------------
function walk(directory) {
    return readdirSync(directory, { withFileTypes: true })
        .sort((left, right) => left.name.localeCompare(right.name))
        .flatMap((entry) => {
            if (entry.isDirectory() && SKIP_DIRECTORIES.has(entry.name)) return [];
            const path = join(directory, entry.name);
            return entry.isDirectory() ? walk(path) : [path];
        });
}

const portable = (path) => path.split(sep).join("/");
const digest = (value) => createHash("sha256").update(value).digest("hex");
const stripQuery = (specifier) => specifier.split(/[?#]/, 1)[0];

/**
 * The TYPE-ONLY classifier — v3's whole contribution, and the one place a wrong
 * answer would flatter the census.
 *
 * An edge is `type` when the syntax GUARANTEES erasure:
 *   · `import type X from "m"` / `import type { A } from "m"` — the clause is type-only;
 *   · `export type { A } from "m"`;
 *   · `import { type A, type B } from "m"` — EVERY named specifier is type-only, so
 *     nothing survives erasure. One value specifier among them makes the whole edge
 *     `value`, because one runtime binding is enough to make the import real.
 * Everything else is `value`, including a bare `import "m"` (side effect — the most
 * runtime-real edge there is) and `export * from "m"`.
 *
 * DECLARED APPROXIMATION: a `value` edge that imports only interfaces WITHOUT the
 * `type` keyword is scored `value`. That is deliberate and it errs toward the graph
 * being LARGER — `verbatimModuleSyntax` is not on, so such an import is genuinely
 * emitted by some toolchains. This instrument never scores an edge smaller than the
 * syntax proves.
 */
function classifyImportDeclaration(node) {
    if (ts.isImportDeclaration(node)) {
        const clause = node.importClause;
        if (!clause) return "value"; // bare side-effect import
        if (clause.isTypeOnly) return "type";
        if (clause.name) return "value"; // default binding is a value binding
        const bindings = clause.namedBindings;
        if (bindings && ts.isNamedImports(bindings)) {
            if (bindings.elements.length === 0) return "value";
            return bindings.elements.every((element) => element.isTypeOnly) ? "type" : "value";
        }
        return "value"; // namespace import
    }
    if (ts.isExportDeclaration(node)) {
        if (node.isTypeOnly) return "type";
        const clause = node.exportClause;
        if (clause && ts.isNamedExports(clause)) {
            if (clause.elements.length === 0) return "value";
            return clause.elements.every((element) => element.isTypeOnly) ? "type" : "value";
        }
        return "value"; // export * from
    }
    return "value";
}

/** The `<script>` bodies of an SFC, concatenated — the only TS an SFC contains. */
function vueScriptSource(source) {
    const blocks = [];
    for (const match of source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) {
        blocks.push(match[1]);
    }
    return blocks.join("\n;\n");
}

function extractReferences(path, source) {
    const extension = extname(path);
    const references = [];
    const seen = new Set();
    const add = (specifier, type) => {
        const key = `${type}\0${specifier}`;
        if (seen.has(key)) return;
        seen.add(key);
        references.push({ specifier, type });
    };

    if (extension === ".css") {
        const uncommented = source.replace(/\/\*[\s\S]*?\*\//g, "");
        for (const match of uncommented.matchAll(/@import\s+(?:url\()?["']([^"']+)["']/g)) {
            add(match[1], "style");
        }
        for (const match of uncommented.matchAll(/url\(\s*["']?([^"'()]+)["']?\s*\)/g)) {
            if (!match[1].startsWith("data:")) add(match[1], "style");
        }
        return references;
    }

    const scriptSource = extension === ".vue" ? vueScriptSource(source) : source;
    const file = ts.createSourceFile(
        extension === ".vue" ? `${path}.ts` : path,
        scriptSource,
        ts.ScriptTarget.Latest,
        /* setParentNodes */ false,
        extension === ".vue" || extension === ".ts" || extension === ".tsx"
            ? ts.ScriptKind.TS
            : ts.ScriptKind.JS,
    );

    for (const statement of file.statements) {
        if (ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement)) {
            const specifier = statement.moduleSpecifier;
            if (specifier && ts.isStringLiteral(specifier)) {
                add(specifier.text, classifyImportDeclaration(statement));
            }
        }
        if (
            ts.isImportEqualsDeclaration(statement) &&
            ts.isExternalModuleReference(statement.moduleReference) &&
            ts.isStringLiteral(statement.moduleReference.expression)
        ) {
            add(statement.moduleReference.expression.text, "value");
        }
    }

    // Dynamic `import("…")` — a runtime edge by construction, so `value`. Walked with a
    // regex over the script text rather than the AST because it can appear at any depth.
    for (const match of scriptSource.matchAll(/\bimport\s*\(\s*["']([^"']+)["']\s*\)/g)) {
        add(match[1], "value");
    }

    if (extension === ".vue") {
        for (const match of source.matchAll(
            /<(?:style|script|template)\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/g,
        )) {
            add(match[1], "vue-block-src");
        }
    }

    return references;
}

function extractLiteralGlobPatterns(source) {
    const patterns = [];
    const callPattern = /import\.meta\.glob(?:<[^>]*>)?\s*\(\s*(\[[\s\S]*?\]|["'][^"']+["'])/g;
    for (const call of source.matchAll(callPattern)) {
        for (const literal of call[1].matchAll(/["']([^"']+)["']/g)) patterns.push(literal[1]);
    }
    return patterns;
}

function globExpression(pattern) {
    let expression = "^";
    for (let index = 0; index < pattern.length; index += 1) {
        const character = pattern[index];
        if (character === "*" && pattern[index + 1] === "*") {
            expression += ".*";
            index += 1;
        } else if (character === "*") {
            expression += "[^/]*";
        } else if (character === "?") {
            expression += "[^/]";
        } else {
            expression += character.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
        }
    }
    return new RegExp(`${expression}$`);
}

function expandLiteralGlob(importer, pattern, nodeSet) {
    const absolutePattern = resolve(dirname(join(REPO_ROOT, importer)), pattern);
    const repositoryPattern = portable(relative(REPO_ROOT, absolutePattern));
    const matcher = globExpression(repositoryPattern);
    return [...nodeSet].filter((candidate) => matcher.test(candidate)).sort();
}

function resolveInternal(importer, rawSpecifier, nodeSet) {
    const specifier = stripQuery(rawSpecifier);
    let base;
    if (specifier === "@glass") base = join(REPO_ROOT, "src");
    else if (specifier.startsWith("@glass/"))
        base = join(REPO_ROOT, "src", specifier.slice("@glass/".length));
    else if (specifier.startsWith("."))
        base = resolve(dirname(join(REPO_ROOT, importer)), specifier);
    else return { kind: "external", specifier: rawSpecifier };

    const candidates = [
        base,
        ...RESOLVABLE_EXTENSIONS.map((extension) => `${base}${extension}`),
        ...RESOLVABLE_EXTENSIONS.map((extension) => join(base, `index${extension}`)),
    ];
    for (const candidate of candidates) {
        const relativeCandidate = portable(relative(REPO_ROOT, candidate));
        if (nodeSet.has(relativeCandidate))
            return { kind: "internal", target: relativeCandidate, specifier: rawSpecifier };
    }
    for (const candidate of candidates) {
        if (existsSync(candidate) && statSync(candidate).isFile())
            return {
                kind: "repository-boundary",
                target: portable(relative(REPO_ROOT, candidate)),
                specifier: rawSpecifier,
            };
    }
    return {
        kind: "unresolved-internal",
        target: portable(relative(REPO_ROOT, base)),
        specifier: rawSpecifier,
    };
}

function tarjan(nodes, adjacency) {
    let nextIndex = 0;
    const indices = new Map();
    const lowLinks = new Map();
    const stack = [];
    const onStack = new Set();
    const components = [];

    // Iterative — the demo story knot is a 108-file cycle and a recursive visit blows
    // the stack on the deeper glob fan-outs.
    for (const root of nodes) {
        if (indices.has(root)) continue;
        const work = [{ node: root, edges: [...(adjacency.get(root) ?? [])], cursor: 0 }];
        indices.set(root, nextIndex);
        lowLinks.set(root, nextIndex);
        nextIndex += 1;
        stack.push(root);
        onStack.add(root);

        while (work.length > 0) {
            const frame = work[work.length - 1];
            if (frame.cursor < frame.edges.length) {
                const target = frame.edges[frame.cursor];
                frame.cursor += 1;
                if (!indices.has(target)) {
                    indices.set(target, nextIndex);
                    lowLinks.set(target, nextIndex);
                    nextIndex += 1;
                    stack.push(target);
                    onStack.add(target);
                    work.push({
                        node: target,
                        edges: [...(adjacency.get(target) ?? [])],
                        cursor: 0,
                    });
                } else if (onStack.has(target)) {
                    lowLinks.set(
                        frame.node,
                        Math.min(lowLinks.get(frame.node), indices.get(target)),
                    );
                }
                continue;
            }
            work.pop();
            const parent = work[work.length - 1];
            if (parent) {
                lowLinks.set(
                    parent.node,
                    Math.min(lowLinks.get(parent.node), lowLinks.get(frame.node)),
                );
            }
            if (lowLinks.get(frame.node) === indices.get(frame.node)) {
                const component = [];
                while (stack.length > 0) {
                    const member = stack.pop();
                    onStack.delete(member);
                    component.push(member);
                    if (member === frame.node) break;
                }
                components.push(component.sort());
            }
        }
    }
    return components.sort(
        (left, right) => right.length - left.length || left[0].localeCompare(right[0]),
    );
}

function leafModule(path) {
    const parts = path.split("/");
    if (parts[0] === "src" && parts[1] === "components")
        return parts.length > 3 ? `src/components/${parts[2]}` : "src/components/_root";
    if (parts[0] === "src" && ["composables", "lib"].includes(parts[1]))
        return parts.length > 3 ? `src/${parts[1]}/${parts[2]}` : `src/${parts[1]}/_root`;
    if (parts[0] === "src" && parts[1] === "styles")
        return parts.length > 3 ? `src/styles/${parts[2]}` : "src/styles/_root";
    if (parts[0] === "demo" && parts.length > 3) return `demo/${parts[1]}/${parts[2]}`;
    if (parts[0] === "demo" && parts.length > 2) return `demo/${parts[1]}`;
    return parts.slice(0, -1).join("/") || "_root";
}

// ---------------------------------------------------------------------------
// BUILD
// ---------------------------------------------------------------------------
const absoluteFiles = PRODUCT_ROOTS.flatMap((root) => walk(join(REPO_ROOT, root)));
const nodes = absoluteFiles.map((absolutePath) => {
    const path = portable(relative(REPO_ROOT, absolutePath));
    const source = readFileSync(absolutePath);
    return {
        path,
        bytes: source.byteLength,
        extension: extname(path),
        module: leafModule(path),
        sha256: digest(source),
    };
});
const nodeSet = new Set(nodes.map(({ path }) => path));

const internalEdges = [];
const externalEdges = [];
const unresolvedInternalEdges = [];
const unresolvedGlobPatterns = [];

for (const node of nodes) {
    if (!SOURCE_EXTENSIONS.has(node.extension)) continue;
    const source = readFileSync(join(REPO_ROOT, node.path), "utf8");

    for (const { specifier, type } of extractReferences(node.path, source)) {
        const resolved = resolveInternal(node.path, specifier, nodeSet);
        if (resolved.kind === "internal") {
            internalEdges.push({ from: node.path, to: resolved.target, specifier, type });
        } else if (resolved.kind === "external") {
            externalEdges.push({ from: node.path, specifier });
        } else if (resolved.kind === "unresolved-internal") {
            unresolvedInternalEdges.push({ from: node.path, specifier, base: resolved.target });
        }
    }

    for (const pattern of extractLiteralGlobPatterns(source)) {
        const matches = expandLiteralGlob(node.path, pattern, nodeSet);
        if (matches.length === 0) {
            unresolvedGlobPatterns.push({ from: node.path, pattern });
            continue;
        }
        for (const target of matches) {
            internalEdges.push({ from: node.path, to: target, specifier: pattern, type: "glob" });
        }
    }
}

const edgeTypeTally = {};
for (const edge of internalEdges) edgeTypeTally[edge.type] = (edgeTypeTally[edge.type] ?? 0) + 1;

const VALUE_TYPES = new Set(["value", "glob", "vue-block-src", "style"]);
const isValueEdge = (edge) => VALUE_TYPES.has(edge.type);

function adjacencyOf(edges, key) {
    const adjacency = new Map();
    for (const edge of edges) {
        const from = key(edge.from);
        const to = key(edge.to);
        if (from === to) continue;
        if (!adjacency.has(from)) adjacency.set(from, new Set());
        adjacency.get(from).add(to);
    }
    return new Map([...adjacency].map(([from, set]) => [from, [...set].sort()]));
}

const moduleOf = new Map(nodes.map((node) => [node.path, node.module]));
const allModules = [...new Set(nodes.map((node) => node.module))].sort();
const filePaths = nodes.map((node) => node.path).sort();
const valueEdges = internalEdges.filter(isValueEdge);

const fileSccsFull = tarjan(filePaths, adjacencyOf(internalEdges, (path) => path)).filter(
    (component) => component.length > 1,
);
const fileSccsValue = tarjan(filePaths, adjacencyOf(valueEdges, (path) => path)).filter(
    (component) => component.length > 1,
);
const moduleSccsFull = tarjan(
    allModules,
    adjacencyOf(internalEdges, (path) => moduleOf.get(path)),
).filter((component) => component.length > 1);
const moduleSccsValue = tarjan(
    allModules,
    adjacencyOf(valueEdges, (path) => moduleOf.get(path)),
).filter((component) => component.length > 1);

// FAIL-CLOSED OWNERSHIP — every module in a cycle names a seat, or this exits 1.
const cyclicModules = [...new Set([...moduleSccsFull, ...moduleSccsValue].flat())].sort();
const unownedModules = cyclicModules.filter((module) => ownerOf(module) === null);

const targetsOf = new Map();
for (const edge of internalEdges) {
    if (!targetsOf.has(edge.to)) targetsOf.set(edge.to, 0);
    targetsOf.set(edge.to, targetsOf.get(edge.to) + 1);
}
const leafModules = allModules.filter((module) => {
    const outward = internalEdges.filter(
        (edge) => moduleOf.get(edge.from) === module && moduleOf.get(edge.to) !== module,
    );
    return outward.length === 0;
});

const report = {
    instrument: "scripts/import-dag.mjs",
    version: 3,
    supersedes: "docs/tranches/BJ/audits/2026-07-28-library-dag/IMPORT-DAG-V2.json",
    productRoots: PRODUCT_ROOTS,
    totals: {
        nodes: nodes.length,
        modules: allModules.length,
        internalEdges: internalEdges.length,
        externalEdges: externalEdges.length,
        valueEdges: valueEdges.length,
        typeEdges: internalEdges.length - valueEdges.length,
        unresolvedImports: unresolvedInternalEdges.length,
        unresolvedGlobs: unresolvedGlobPatterns.length,
        leafModules: leafModules.length,
    },
    edgeTypeTally,
    fileSccs: { full: fileSccsFull.length, value: fileSccsValue.length },
    moduleSccs: {
        full: moduleSccsFull.map((members) => ({
            members,
            owners: members.map((module) => ownerOf(module)),
        })),
        value: moduleSccsValue.map((members) => ({
            members,
            owners: members.map((module) => ownerOf(module)),
        })),
    },
    unownedModules,
};

// ---------------------------------------------------------------------------
// EMIT
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const wantsJson = args.includes("--json");
const outIndex = args.indexOf("--out");
const moduleIndex = args.indexOf("--module");

if (moduleIndex !== -1) {
    const target = args[moduleIndex + 1];
    const outward = internalEdges.filter(
        (edge) => moduleOf.get(edge.from) === target && moduleOf.get(edge.to) !== target,
    );
    const inward = internalEdges.filter(
        (edge) => moduleOf.get(edge.to) === target && moduleOf.get(edge.from) !== target,
    );
    console.log(`module ${target} — owner: ${ownerOf(target) ?? "UNOWNED"}`);
    console.log(`\nOUT (${outward.length}):`);
    for (const edge of outward)
        console.log(`  [${edge.type}] ${edge.from} -> ${edge.to}  (${edge.specifier})`);
    console.log(`\nIN (${inward.length}):`);
    for (const edge of inward)
        console.log(`  [${edge.type}] ${edge.from} -> ${edge.to}  (${edge.specifier})`);
    process.exit(0);
}

if (wantsJson) {
    const payload = JSON.stringify(
        { ...report, internalEdges, externalEdges, nodes },
        null,
        outIndex === -1 ? 0 : 2,
    );
    if (outIndex !== -1) writeFileSync(resolve(REPO_ROOT, args[outIndex + 1]), `${payload}\n`);
    else console.log(payload);
} else {
    const t = report.totals;
    console.log("detector: typed-edge import graph over src/ + demo/; EDGE TYPES = value |");
    console.log("  type | style | vue-block-src | glob; a `type` edge is erased at compile");
    console.log("  time and is EXCLUDED from the value graph; SCCs by Tarjan, size > 1.");
    console.log("");
    console.log(`nodes            ${t.nodes}`);
    console.log(`modules          ${t.modules}`);
    console.log(`internal edges   ${t.internalEdges}`);
    console.log(`external edges   ${t.externalEdges}`);
    console.log(`unresolved       ${t.unresolvedImports} imports · ${t.unresolvedGlobs} globs`);
    console.log(`leaf modules     ${t.leafModules}`);
    console.log("");
    console.log("edge types:");
    for (const [type, count] of Object.entries(edgeTypeTally).sort((a, b) => b[1] - a[1]))
        console.log(`  ${type.padEnd(14)} ${count}`);
    console.log("");
    console.log(`file SCCs        full ${report.fileSccs.full} · value ${report.fileSccs.value}`);
    console.log(
        `module SCCs      full ${moduleSccsFull.length} · value ${moduleSccsValue.length}`,
    );
    console.log("");
    for (const [label, components] of [
        ["FULL", moduleSccsFull],
        ["VALUE", moduleSccsValue],
    ]) {
        console.log(`${label} module SCCs:`);
        if (components.length === 0) console.log("  (none)");
        for (const [index, members] of components.entries()) {
            console.log(`  M${String(index + 1).padStart(2, "0")} (${members.length} members)`);
            for (const module of members)
                console.log(`     ${module.padEnd(34)} ${ownerOf(module) ?? "UNOWNED"}`);
        }
        console.log("");
    }
}

if (unownedModules.length > 0) {
    console.error(
        `FAIL-CLOSED: ${unownedModules.length} module(s) inside a cycle carry no owner ` +
            `in OWNER_MANIFEST: ${unownedModules.join(", ")}`,
    );
    process.exit(1);
}
