#!/usr/bin/env node

import { createHash } from "node:crypto";
import {
    existsSync,
    readFileSync,
    readdirSync,
    statSync,
    writeFileSync,
} from "node:fs";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import ts from "typescript";

const repositoryRoot = resolve(import.meta.dirname, "../../../../..");
const outputDirectory = import.meta.dirname;
const productRoots = ["src", "demo"];
const importedExtensions = [
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
const sourceExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".vue", ".css"]);

function walk(directory) {
    return readdirSync(directory, { withFileTypes: true })
        .sort((left, right) => left.name.localeCompare(right.name))
        .flatMap((entry) => {
            const path = join(directory, entry.name);
            return entry.isDirectory() ? walk(path) : [path];
        });
}

function portable(path) {
    return path.split(sep).join("/");
}

function digest(value) {
    return createHash("sha256").update(value).digest("hex");
}

function stripQuery(specifier) {
    return specifier.split(/[?#]/, 1)[0];
}

function extractReferences(path, source) {
    const extension = extname(path);
    const references = new Map();
    const add = (specifier, syntax) => {
        const key = `${syntax}\0${specifier}`;
        references.set(key, { specifier, syntax });
    };

    if (extension === ".css") {
        const uncommented = source.replace(/\/\*[\s\S]*?\*\//g, "");
        for (const match of uncommented.matchAll(/@import\s+(?:url\()?["']([^"']+)["']/g)) {
            add(match[1], "css-import");
        }
        for (const match of uncommented.matchAll(/url\(\s*["']?([^"'()]+)["']?\s*\)/g)) {
            if (!match[1].startsWith("data:")) add(match[1], "css-url");
        }
        return [...references.values()];
    }

    const preprocessed = ts.preProcessFile(source, true, true);
    for (const imported of preprocessed.importedFiles) add(imported.fileName, "ecmascript");

    if (extension === ".vue") {
        for (const match of source.matchAll(
            /<(?:style|script|template)\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/g,
        )) {
            add(match[1], "vue-block-src");
        }
    }

    return [...references.values()];
}

function extractLiteralGlobPatterns(source) {
    const patterns = [];
    const callPattern =
        /import\.meta\.glob(?:<[^>]*>)?\s*\(\s*(\[[\s\S]*?\]|["'][^"']+["'])/g;
    for (const call of source.matchAll(callPattern)) {
        for (const literal of call[1].matchAll(/["']([^"']+)["']/g)) {
            patterns.push(literal[1]);
        }
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
    const absolutePattern = resolve(dirname(join(repositoryRoot, importer)), pattern);
    const repositoryPattern = portable(relative(repositoryRoot, absolutePattern));
    const matcher = globExpression(repositoryPattern);
    return [...nodeSet].filter((candidate) => matcher.test(candidate)).sort();
}

function resolveInternal(importer, rawSpecifier, nodeSet) {
    const specifier = stripQuery(rawSpecifier);
    let base;
    if (specifier === "@glass") {
        base = join(repositoryRoot, "src");
    } else if (specifier.startsWith("@glass/")) {
        base = join(repositoryRoot, "src", specifier.slice("@glass/".length));
    } else if (specifier.startsWith(".")) {
        base = resolve(dirname(join(repositoryRoot, importer)), specifier);
    } else {
        return { kind: "external", specifier: rawSpecifier };
    }

    const candidates = [
        base,
        ...importedExtensions.map((extension) => `${base}${extension}`),
        ...importedExtensions.map((extension) => join(base, `index${extension}`)),
    ];
    for (const candidate of candidates) {
        const relativeCandidate = portable(relative(repositoryRoot, candidate));
        if (nodeSet.has(relativeCandidate)) {
            return { kind: "internal", target: relativeCandidate, specifier: rawSpecifier };
        }
    }
    for (const candidate of candidates) {
        if (existsSync(candidate) && statSync(candidate).isFile()) {
            return {
                kind: "repository-boundary",
                target: portable(relative(repositoryRoot, candidate)),
                specifier: rawSpecifier,
            };
        }
    }
    return {
        kind: "unresolved-internal",
        target: portable(relative(repositoryRoot, base)),
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

    function visit(node) {
        indices.set(node, nextIndex);
        lowLinks.set(node, nextIndex);
        nextIndex += 1;
        stack.push(node);
        onStack.add(node);

        for (const target of adjacency.get(node) ?? []) {
            if (!indices.has(target)) {
                visit(target);
                lowLinks.set(node, Math.min(lowLinks.get(node), lowLinks.get(target)));
            } else if (onStack.has(target)) {
                lowLinks.set(node, Math.min(lowLinks.get(node), indices.get(target)));
            }
        }

        if (lowLinks.get(node) === indices.get(node)) {
            const component = [];
            while (stack.length > 0) {
                const member = stack.pop();
                onStack.delete(member);
                component.push(member);
                if (member === node) break;
            }
            components.push(component.sort());
        }
    }

    for (const node of nodes) if (!indices.has(node)) visit(node);
    return components.sort((left, right) => right.length - left.length || left[0].localeCompare(right[0]));
}

function leafModule(path) {
    const parts = path.split("/");
    if (parts[0] === "src" && parts[1] === "components") {
        return parts.length > 3 ? `src/components/${parts[2]}` : "src/components/_root";
    }
    if (parts[0] === "src" && ["composables", "lib"].includes(parts[1])) {
        return parts.length > 3 ? `src/${parts[1]}/${parts[2]}` : `src/${parts[1]}/_root`;
    }
    if (parts[0] === "src" && parts[1] === "styles") {
        return parts.length > 3 ? `src/styles/${parts[2]}` : "src/styles/_root";
    }
    if (parts[0] === "demo" && parts.length > 3) return `demo/${parts[1]}/${parts[2]}`;
    if (parts[0] === "demo" && parts.length > 2) return `demo/${parts[1]}`;
    return parts.slice(0, -1).join("/") || "_root";
}

function reviewBatch(module) {
    if (module.startsWith("src/components/")) return "components";
    if (module.startsWith("src/composables/")) return "composables";
    if (module.startsWith("src/lib/")) return "lib";
    if (module.startsWith("src/styles/")) return "styles";
    if (module.startsWith("demo/")) return "demo";
    return "root-and-build";
}

function kebab(value) {
    return value
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/[_\s]+/g, "-")
        .toLowerCase();
}

const absoluteFiles = productRoots.flatMap((root) => walk(join(repositoryRoot, root)));
const nodes = absoluteFiles.map((absolutePath) => {
    const path = portable(relative(repositoryRoot, absolutePath));
    const source = readFileSync(absolutePath);
    const text = source.toString("utf8");
    return {
        path,
        bytes: source.byteLength,
        lines: text === "" ? 0 : text.split(/\r?\n/).length,
        extension: extname(path),
        module: leafModule(path),
        batch: reviewBatch(leafModule(path)),
        sha256: digest(source),
    };
});
const nodeSet = new Set(nodes.map(({ path }) => path));
const internalEdges = [];
const externalEdges = [];
const repositoryBoundaryEdges = [];
const unresolvedInternalEdges = [];
const unresolvedGlobPatterns = [];

for (const node of nodes) {
    if (!sourceExtensions.has(node.extension)) continue;
    const source = readFileSync(join(repositoryRoot, node.path), "utf8");
    for (const { specifier, syntax } of extractReferences(node.path, source)) {
        const resolution = resolveInternal(node.path, specifier, nodeSet);
        const edge = { source: node.path, specifier, syntax, ...resolution };
        if (resolution.kind === "internal") internalEdges.push(edge);
        else if (resolution.kind === "external") externalEdges.push(edge);
        else if (resolution.kind === "repository-boundary") repositoryBoundaryEdges.push(edge);
        else unresolvedInternalEdges.push(edge);
    }
    for (const pattern of extractLiteralGlobPatterns(source)) {
        const targets = expandLiteralGlob(node.path, pattern, nodeSet);
        if (targets.length === 0) {
            unresolvedGlobPatterns.push({ source: node.path, pattern });
            continue;
        }
        for (const target of targets) {
            internalEdges.push({
                source: node.path,
                target,
                specifier: pattern,
                syntax: "vite-import-meta-glob",
                kind: "internal",
            });
        }
    }
}

internalEdges.sort(
    (left, right) =>
        left.source.localeCompare(right.source) ||
        left.target.localeCompare(right.target) ||
        left.specifier.localeCompare(right.specifier),
);
externalEdges.sort(
    (left, right) =>
        left.source.localeCompare(right.source) || left.specifier.localeCompare(right.specifier),
);
repositoryBoundaryEdges.sort(
    (left, right) =>
        left.source.localeCompare(right.source) || left.target.localeCompare(right.target),
);
unresolvedInternalEdges.sort(
    (left, right) =>
        left.source.localeCompare(right.source) || left.specifier.localeCompare(right.specifier),
);

const adjacency = new Map(nodes.map(({ path }) => [path, []]));
const reverseAdjacency = new Map(nodes.map(({ path }) => [path, []]));
for (const edge of internalEdges) {
    adjacency.get(edge.source).push(edge.target);
    reverseAdjacency.get(edge.target).push(edge.source);
}
const stronglyConnectedComponents = tarjan(
    nodes.map(({ path }) => path),
    adjacency,
);
const cycles = stronglyConnectedComponents.filter(
    (component) =>
        component.length > 1 ||
        internalEdges.some(
            ({ source, target }) => source === component[0] && target === component[0],
        ),
);

const moduleMap = new Map();
for (const node of nodes) {
    if (!moduleMap.has(node.module)) {
        moduleMap.set(node.module, {
            id: node.module,
            batch: node.batch,
            nodes: [],
            lines: 0,
            bytes: 0,
            internalEdgesOut: 0,
            internalEdgesIn: 0,
            externalEdges: 0,
        });
    }
    const module = moduleMap.get(node.module);
    module.nodes.push(node.path);
    module.lines += node.lines;
    module.bytes += node.bytes;
}
for (const edge of internalEdges) {
    const sourceModule = moduleMap.get(leafModule(edge.source));
    const targetModule = moduleMap.get(leafModule(edge.target));
    sourceModule.internalEdgesOut += 1;
    targetModule.internalEdgesIn += 1;
}
for (const edge of externalEdges) moduleMap.get(leafModule(edge.source)).externalEdges += 1;
const modules = [...moduleMap.values()].sort(
    (left, right) => right.lines - left.lines || left.id.localeCompare(right.id),
);
const moduleEdgeMap = new Map();
for (const edge of internalEdges) {
    const source = leafModule(edge.source);
    const target = leafModule(edge.target);
    if (source === target) continue;
    const key = `${source}\0${target}`;
    if (!moduleEdgeMap.has(key)) {
        moduleEdgeMap.set(key, { source, target, edgeCount: 0, fileEdges: [] });
    }
    const moduleEdge = moduleEdgeMap.get(key);
    moduleEdge.edgeCount += 1;
    moduleEdge.fileEdges.push({
        source: edge.source,
        target: edge.target,
        syntax: edge.syntax,
    });
}
const moduleEdges = [...moduleEdgeMap.values()].sort(
    (left, right) =>
        left.source.localeCompare(right.source) || left.target.localeCompare(right.target),
);
const moduleAdjacency = new Map(modules.map(({ id }) => [id, []]));
for (const edge of moduleEdges) moduleAdjacency.get(edge.source).push(edge.target);
const moduleStronglyConnectedComponents = tarjan(
    modules.map(({ id }) => id),
    moduleAdjacency,
);
const moduleCycles = moduleStronglyConnectedComponents.filter(
    (component) => component.length > 1,
);

const filesByDirectory = new Map();
for (const node of nodes) {
    const directory = portable(dirname(node.path));
    if (!filesByDirectory.has(directory)) filesByDirectory.set(directory, []);
    filesByDirectory.get(directory).push(node.path);
}
const modulePrefixCandidates = [];
for (const [directory, paths] of filesByDirectory) {
    const directoryName = kebab(directory.split("/").at(-1));
    if (!directoryName || directoryName === "." || paths.length < 2) continue;
    for (const path of paths) {
        const basename = kebab(path.split("/").at(-1).replace(/\.[^.]+$/, ""));
        if (
            !["index", "readme"].includes(basename) &&
            basename.startsWith(`${directoryName}-`)
        ) {
            modulePrefixCandidates.push({
                path,
                directory,
                redundantPrefix: directoryName,
                proposedBasename: basename.slice(directoryName.length + 1),
            });
        }
    }
}

const inSourceTests = nodes
    .filter(({ path }) => /(?:^|\/)(?:__tests__|[^/]+\.(?:test|spec)\.[^/]+)$/.test(path))
    .map(({ path }) => path);
const isolatedNodes = nodes
    .filter(
        ({ path }) =>
            (adjacency.get(path)?.length ?? 0) === 0 &&
            (reverseAdjacency.get(path)?.length ?? 0) === 0,
    )
    .map(({ path }) => path);
const topFanOut = nodes
    .map(({ path }) => ({ path, count: new Set(adjacency.get(path)).size }))
    .sort((left, right) => right.count - left.count || left.path.localeCompare(right.path))
    .slice(0, 40);
const topFanIn = nodes
    .map(({ path }) => ({ path, count: new Set(reverseAdjacency.get(path)).size }))
    .sort((left, right) => right.count - left.count || left.path.localeCompare(right.path))
    .slice(0, 40);
const edgeSyntaxCounts = [...internalEdges, ...externalEdges, ...repositoryBoundaryEdges]
    .reduce((counts, edge) => {
        counts.set(edge.syntax, (counts.get(edge.syntax) ?? 0) + 1);
        return counts;
    }, new Map());

const productGraph = {
    schema: "glass-ui-import-dag/2",
    observedAt: new Date().toISOString(),
    repositoryRoot,
    scope: {
        roots: productRoots,
        nodeDefinition: "Every regular file under src/ and demo/.",
        edgeDefinition:
            "Static import/export-from, literal dynamic import, Vue external block src, literal Vite import.meta.glob expansion, CSS @import, and non-data CSS url references.",
    },
    summary: {
        nodes: nodes.length,
        internalEdges: internalEdges.length,
        externalEdges: externalEdges.length,
        repositoryBoundaryEdges: repositoryBoundaryEdges.length,
        unresolvedInternalEdges: unresolvedInternalEdges.length,
        unresolvedGlobPatterns: unresolvedGlobPatterns.length,
        leafModules: modules.length,
        reviewBatches: [...new Set(nodes.map(({ batch }) => batch))].length,
        stronglyConnectedComponents: stronglyConnectedComponents.length,
        cycles: cycles.length,
        moduleEdges: moduleEdges.length,
        moduleStronglyConnectedComponents: moduleStronglyConnectedComponents.length,
        moduleCycles: moduleCycles.length,
        isolatedNodes: isolatedNodes.length,
        inSourceTests: inSourceTests.length,
        modulePrefixCandidates: modulePrefixCandidates.length,
    },
    nodes,
    internalEdges,
    externalEdges,
    repositoryBoundaryEdges,
    unresolvedInternalEdges,
    unresolvedGlobPatterns,
    modules,
    moduleEdges,
    moduleStronglyConnectedComponents,
    moduleCycles,
    stronglyConnectedComponents,
    cycles,
    isolatedNodes,
    inSourceTests,
    modulePrefixCandidates,
    topFanIn,
    topFanOut,
    edgeSyntaxCounts: Object.fromEntries([...edgeSyntaxCounts].sort()),
};

const canonicalGraph = JSON.stringify(
    { ...productGraph, observedAt: "<excluded-from-receipt>" },
    null,
    2,
);
productGraph.graphSha256 = digest(canonicalGraph);
writeFileSync(
    join(outputDirectory, "IMPORT-DAG-V2.json"),
    `${JSON.stringify(productGraph, null, 2)}\n`,
);

const batchRows = [...new Set(modules.map(({ batch }) => batch))]
    .sort()
    .map((batch) => {
        const members = modules.filter((module) => module.batch === batch);
        return `| \`${batch}\` | ${members.length} | ${members.reduce((sum, module) => sum + module.nodes.length, 0)} | ${members.reduce((sum, module) => sum + module.lines, 0)} |`;
    })
    .join("\n");
const moduleRows = modules
    .map(
        (module) =>
            `| \`${module.id}\` | \`${module.batch}\` | ${module.nodes.length} | ${module.lines} | ${module.internalEdgesIn} | ${module.internalEdgesOut} | ${module.externalEdges} |`,
    )
    .join("\n");
const cycleRows =
    cycles.length === 0
        ? "| — | — |"
        : cycles
              .map(
                  (component, index) =>
                      `| C${String(index + 1).padStart(2, "0")} | ${component.map((path) => `\`${path}\``).join("<br>")} |`,
              )
              .join("\n");
const moduleCycleRows =
    moduleCycles.length === 0
        ? "| — | — |"
        : moduleCycles
              .map(
                  (component, index) =>
                      `| M${String(index + 1).padStart(2, "0")} | ${component.map((module) => `\`${module}\``).join("<br>")} |`,
              )
              .join("\n");
const prefixRows =
    modulePrefixCandidates.length === 0
        ? "| — | — | — |"
        : modulePrefixCandidates
              .map(
                  ({ path, redundantPrefix, proposedBasename }) =>
                      `| \`${path}\` | \`${redundantPrefix}\` | \`${proposedBasename}\` |`,
              )
              .join("\n");

const summary = `# Glass UI library and demo import DAG — corrected v2

Observed: ${productGraph.observedAt}

Graph receipt: \`${productGraph.graphSha256}\`

## Scope and result

This is a complete file inventory for \`src/\` and \`demo/\`. Edges cover
static imports, export-from declarations, literal dynamic imports, CSS imports,
local CSS assets, Vue external block sources, and expanded literal Vite
\`import.meta.glob\` targets. External package edges remain explicit. An
unresolved relative, \`@glass\`, or glob edge is a graph defect, not silently
discarded.

| Measure | Count |
| --- | ---: |
| Nodes | ${nodes.length} |
| Internal edges | ${internalEdges.length} |
| External edges | ${externalEdges.length} |
| Repository-boundary edges | ${repositoryBoundaryEdges.length} |
| Unresolved internal edges | ${unresolvedInternalEdges.length} |
| Unresolved glob patterns | ${unresolvedGlobPatterns.length} |
| Leaf modules | ${modules.length} |
| Review batches | ${[...new Set(nodes.map(({ batch }) => batch))].length} |
| File cycles | ${cycles.length} |
| Cross-module edge pairs | ${moduleEdges.length} |
| Module cycles | ${moduleCycles.length} |
| Isolated nodes | ${isolatedNodes.length} |
| Tests under product roots | ${inSourceTests.length} |
| Module-prefix candidates | ${modulePrefixCandidates.length} |

## Review batches

Every node belongs to exactly one leaf module and every leaf module belongs to
exactly one review batch. Reviewers must account for every batch; they may split
a batch along the recorded leaf-module boundaries when its local dependency
shape demands it.

| Batch | Leaf modules | Nodes | Lines |
| --- | ---: | ---: | ---: |
${batchRows}

## Cycles

| Cycle | Members |
| --- | --- |
${cycleRows}

## Module cycles

Module SCCs expose dependency knots that file-only cycles can hide. The
adjudication must account for each cross-module member and cut direction.

| Module cycle | Members |
| --- | --- |
${moduleCycleRows}

## Mechanical module-prefix candidates

These are candidates, not automatic renames. The three-pass review must reject
false positives and apply the generalized rule: once a directory supplies the
module name, child filenames do not repeat it.

| Path | Repeated directory prefix | Candidate basename |
| --- | --- | --- |
${prefixRows}

## Leaf-module ledger

| Module | Batch | Nodes | Lines | Edges in | Edges out | External edges |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
${moduleRows}

## Machine-readable evidence

\`IMPORT-DAG-V2.json\` contains every node, file edge, cross-module edge,
file/module strongly connected component, isolated node, fan-in/fan-out
ranking, module-prefix candidate, and complete leaf-module assignment. It is
the corrected review substrate; this summary is only its human index.
`;
writeFileSync(join(outputDirectory, "IMPORT-DAG-V2-SUMMARY.md"), summary);

console.log(JSON.stringify(productGraph.summary, null, 2));
console.log(`graphSha256=${productGraph.graphSha256}`);
