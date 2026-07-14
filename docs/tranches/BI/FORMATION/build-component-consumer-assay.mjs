import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

import { COMPONENT_CONCEPTS, SOURCE_BASE, SPECIAL_COMPONENT_CONCEPTS } from "./waves.registry.mjs";

const ROOT = dirname(new URL(import.meta.url).pathname);
const PACKAGE = "@mkbabb/glass-ui";
const REPOS = [
    ["value.js", "/Users/mkbabb/Programming/value.js"],
    ["keyframes.js", "/Users/mkbabb/Programming/keyframes.js"],
    ["atlas", "/Users/mkbabb/Programming/atlas"],
    ["fourier-analysis", "/Users/mkbabb/Programming/fourier-analysis"],
    ["sci-report", "/Users/mkbabb/Programming/sci-report"],
    ["muster", "/Users/mkbabb/Programming/muster"],
    ["bbnf-buddy", "/Users/mkbabb/Programming/bbnf-buddy"],
    ["slides", "/Users/mkbabb/Programming/slides"],
    ["speedtest", "/Users/mkbabb/Programming/speedtest"],
];

const sha = (value) => createHash("sha256").update(value).digest("hex");
const run = (cwd, ...args) => execFileSync("git", args, { cwd, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }).trim();
const tryRun = (cwd, ...args) => {
    try {
        return run(cwd, ...args);
    } catch (error) {
        if (error.status === 1) return "";
        throw error;
    }
};
const pascal = (value) => value.split("-").map((part) => part ? part[0].toUpperCase() + part.slice(1) : "").join("");
const uniq = (items) => [...new Set(items)];
const cell = (value) => String(value ?? "—").replaceAll("|", "\\|").replaceAll("\n", " ");
const table = (headers, rows) => [
    `| ${headers.map(cell).join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map(cell).join(" | ")} |`),
].join("\n");

const dispositions = JSON.parse(readFileSync(join(ROOT, "component-dispositions.json"), "utf8"));
if (dispositions.sourceBase !== SOURCE_BASE) throw new Error("component dispositions are stale");

const concepts = [
    ...COMPONENT_CONCEPTS.map((meta) => ({
        id: meta.name,
        decision: meta.decision,
        publicName: meta.pascal,
        memberNames: meta.members.map((member) => member.name),
        contract: meta.contract,
        productJudgment: meta.productJudgment ?? null,
    })),
    ...SPECIAL_COMPONENT_CONCEPTS.map((meta) => ({
        id: meta.name,
        decision: meta.decision,
        publicName: meta.pascal,
        memberNames: [meta.name],
        contract: meta.contract,
        productJudgment: meta.productJudgment ?? null,
    })),
];
const conceptById = new Map(concepts.map((row) => [row.id, row]));
const aliases = concepts.flatMap((concept) => uniq([
    concept.publicName,
    pascal(concept.id),
    ...concept.memberNames.map(pascal),
]).map((alias) => ({ alias, conceptId: concept.id })))
    .filter((row) => row.alias.length >= 3)
    .sort((a, b) => b.alias.length - a.alias.length || a.conceptId.localeCompare(b.conceptId));
const subpathMap = new Map();
for (const concept of concepts) {
    for (const slug of uniq([concept.id, ...concept.memberNames])) {
        if (!subpathMap.has(slug)) subpathMap.set(slug, []);
        subpathMap.get(slug).push(concept.id);
    }
}
const RETIRED_SUBPATH_DESTINATIONS = Object.freeze({
    "confirm-dialog": "dialog",
    "context-menu": "dropdown-menu",
    "icon-tooltip": "tooltip",
    "hover-popover": "popover",
    "selectable-chip": "chip",
    sheet: "drawer",
    "toggle-chip": "chip",
});

const sourceFile = /\.(?:[cm]?[jt]sx?|vue|svelte)$/i;
const excludedPath = /(?:^|\/)(?:node_modules|dist|build|coverage|vendor|\.cache)(?:\/|$)/;

const parseNamedBindings = (clause) => {
    const match = /\{([\s\S]*?)\}/.exec(clause);
    if (!match) return [];
    return match[1].split(",").map((part) => part
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .trim()
        .replace(/^type\s+/, "")
        .split(/\s+as\s+/)[0]
        .trim())
        .filter(Boolean);
};

const parseImports = (content) => {
    const rows = [];
    const seen = new Set();
    const add = (specifier, bindings, index, kind) => {
        if (!(specifier === PACKAGE || specifier.startsWith(`${PACKAGE}/`))) return;
        const key = `${index}\0${specifier}\0${bindings.join(",")}\0${kind}`;
        if (seen.has(key)) return;
        seen.add(key);
        rows.push({ specifier, bindings, index, kind });
    };

    const fromPattern = /(?:^|[;\n])\s*(import|export)\s+(?:type\s+)?((?:(?!;|\n\s*(?:import|export)\b)[\s\S])*?)\s+from\s+["'](@mkbabb\/glass-ui(?:\/[^"']*)?)["']/gm;
    for (const match of content.matchAll(fromPattern)) add(match[3], parseNamedBindings(match[2]), match.index, match[1] === "export" ? "re-export" : "static-import");

    const sideEffectPattern = /\bimport\s+["'](@mkbabb\/glass-ui(?:\/[^"']*)?)["']/g;
    for (const match of content.matchAll(sideEffectPattern)) add(match[1], [], match.index, "side-effect-import");

    const dynamicPattern = /\bimport\s*\(\s*["'](@mkbabb\/glass-ui(?:\/[^"']*)?)["']\s*\)/g;
    for (const match of content.matchAll(dynamicPattern)) add(match[1], [], match.index, "dynamic-import");

    const requirePattern = /\brequire\s*\(\s*["'](@mkbabb\/glass-ui(?:\/[^"']*)?)["']\s*\)/g;
    for (const match of content.matchAll(requirePattern)) add(match[1], [], match.index, "require");
    return rows;
};

const conceptsForImport = (row) => {
    const mappings = new Map();
    const add = (conceptId, basis) => {
        if (!mappings.has(conceptId)) mappings.set(conceptId, new Set());
        mappings.get(conceptId).add(basis);
    };
    const subpath = row.specifier === PACKAGE ? "" : row.specifier.slice(PACKAGE.length + 1).split("/")[0];
    for (const id of subpathMap.get(subpath) ?? []) add(id, `CURRENT_SUBPATH:${subpath}`);
    if (RETIRED_SUBPATH_DESTINATIONS[subpath]) add(RETIRED_SUBPATH_DESTINATIONS[subpath], `RETIRED_CLEAN_BREAK:${subpath}`);
    for (const binding of row.bindings) {
        for (const { alias, conceptId } of aliases) {
            if (binding === alias || (binding.startsWith(alias) && /^[A-Z]/.test(binding.slice(alias.length, alias.length + 1)))) {
                add(conceptId, `NAMED_BINDING:${binding}→${alias}`);
                break;
            }
        }
    }
    return [...mappings.entries()].map(([conceptId, bases]) => ({ conceptId, bases: [...bases].sort() })).sort((a, b) => a.conceptId.localeCompare(b.conceptId));
};

const repoRows = [];
const importRows = [];
for (const [name, path] of REPOS) {
    const head = run(path, "rev-parse", "HEAD");
    const branch = run(path, "branch", "--show-current");
    const tree = run(path, "rev-parse", "HEAD^{tree}");
    const porcelain = tryRun(path, "status", "--porcelain=v1", "--untracked-files=all");
    const grep = tryRun(path, "grep", "-l", "-I", "--fixed-strings", PACKAGE, "HEAD", "--");
    const paths = grep.split("\n").filter(Boolean).map((line) => line.startsWith("HEAD:") ? line.slice(5) : line)
        .filter((file) => sourceFile.test(file) && !excludedPath.test(file));
    let clauseCount = 0;
    for (const file of paths) {
        const content = run(path, "show", `HEAD:${file}`);
        const imports = parseImports(content);
        for (const imported of imports) {
            clauseCount += 1;
            const conceptMappings = conceptsForImport(imported);
            importRows.push({
                repository: name,
                repositoryHead: head,
                file,
                ...imported,
                conceptIds: conceptMappings.map((row) => row.conceptId),
                conceptMappings,
            });
        }
    }
    repoRows.push({
        repository: name,
        path,
        branch,
        head,
        tree,
        porcelainSha256: sha(porcelain),
        importingTrackedSourceFiles: paths.length,
        importClauses: clauseCount,
    });
}

const conceptRows = concepts.map((concept) => {
    const disposition = dispositions.rows.find((row) => row.conceptId === concept.id);
    if (!disposition) throw new Error(`missing component disposition: ${concept.id}`);
    const imports = importRows.filter((row) => row.conceptIds.includes(concept.id));
    const externalRepositories = uniq(imports.map((row) => row.repository)).sort();
    const externalImportPaths = uniq(imports.map((row) => `${row.repository}:${row.file}`)).sort();
    const currentDemos = disposition.actualCurrentDemoPaths.filter((path) => path !== "demo/stories/manifest.ts");
    const evidenceClass = imports.length
        ? "TRACKED_EXTERNAL_RUNTIME_IMPORT"
        : currentDemos.length
            ? "FIRST_PARTY_RUNTIME_DEMO_ONLY"
            : "NO_RUNTIME_CONSUMER_EVIDENCE";
    const decisionPressure = ["delete", "private", "rehome", "rehome-private"].includes(concept.decision) && imports.length
        ? "COLLISION_EXTERNAL_IMPORT_REQUIRES_REDECISION"
        : concept.decision === "retain" && evidenceClass !== "TRACKED_EXTERNAL_RUNTIME_IMPORT"
            ? concept.productJudgment
                ? "DECISION_SUPPORTED_BY_PRODUCT_JUDGMENT"
                : "RETAIN_REQUIRES_EXPLICIT_PRODUCT_JUDGMENT"
            : "DECISION_SUPPORTED_BY_CONSUMER_CLASS";
    return {
        conceptId: concept.id,
        publicName: concept.publicName,
        decision: concept.decision,
        contract: concept.contract,
        productJudgment: concept.productJudgment,
        evidenceClass,
        decisionPressure,
        externalImportClauseCount: imports.length,
        externalRepositories,
        externalImportPaths,
        externalImports: imports.map(({ repository, repositoryHead, file, specifier, bindings, kind, conceptMappings }) => ({ repository, repositoryHead, file, specifier, bindings, kind, conceptMappings: conceptMappings.filter((mapping) => mapping.conceptId === concept.id) })),
        currentFirstPartyDemos: currentDemos,
        canonicalWaves: disposition.canonicalWaves,
    };
});

const unknownImports = importRows.filter((row) => row.conceptIds.length === 0);
const counts = {
    repositories: repoRows.length,
    trackedImportClauses: importRows.length,
    mappedComponentImportClauses: importRows.filter((row) => row.conceptIds.length > 0).length,
    nonComponentImportClauses: unknownImports.length,
    componentConcepts: conceptRows.length,
    externallyImportedConcepts: conceptRows.filter((row) => row.externalImportClauseCount > 0).length,
    firstPartyDemoOnlyConcepts: conceptRows.filter((row) => row.evidenceClass === "FIRST_PARTY_RUNTIME_DEMO_ONLY").length,
    noRuntimeEvidenceConcepts: conceptRows.filter((row) => row.evidenceClass === "NO_RUNTIME_CONSUMER_EVIDENCE").length,
    decisionCollisions: conceptRows.filter((row) => row.decisionPressure === "COLLISION_EXTERNAL_IMPORT_REQUIRES_REDECISION").length,
    retainJudgmentsRequired: conceptRows.filter((row) => row.decisionPressure === "RETAIN_REQUIRES_EXPLICIT_PRODUCT_JUDGMENT").length,
    explicitProductJudgments: conceptRows.filter((row) => row.decisionPressure === "DECISION_SUPPORTED_BY_PRODUCT_JUDGMENT").length,
};

const output = {
    schemaVersion: 1,
    generatedAt: "2026-07-14",
    sourceBase: SOURCE_BASE,
    status: "FORMATION_RESEARCH_ONLY",
    scanLaw: "Tracked HEAD source imports only; foreign trees are read-only; docs, locks, build output, node_modules, and untracked/dirty bytes earn no consumer credit.",
    thresholdLaw: "Counts are evidence, never gates. External use can prevent a silent prune; absence does not automatically delete a first-party primitive, and a demo alone requires an explicit product judgment.",
    retiredSubpathDestinations: RETIRED_SUBPATH_DESTINATIONS,
    counts,
    repositories: repoRows,
    imports: importRows,
    concepts: conceptRows,
    nonComponentImports: unknownImports,
};
writeFileSync(join(ROOT, "component-consumer-assay.json"), `${JSON.stringify(output, null, 2)}\n`);

const md = `# Component consumer assay\n\n` +
    `${output.scanLaw}\n\n${output.thresholdLaw}\n\n` +
    `Counts: ${Object.entries(counts).map(([key, value]) => `${key}=${value}`).join(", ")}.\n\n` +
    `## Component decisions\n\n` +
    table(["concept", "decision", "consumer evidence", "external clauses / repos", "first-party demos", "decision pressure", "product judgment", "owners"], conceptRows.map((row) => [
        row.conceptId,
        row.decision,
        row.evidenceClass,
        `${row.externalImportClauseCount} / ${row.externalRepositories.join(", ") || "none"}`,
        row.currentFirstPartyDemos.join(", ") || "none",
        row.decisionPressure,
        row.productJudgment || "not required",
        row.canonicalWaves.join(", "),
    ])) + `\n\n` +
    `## Bound repositories\n\n` +
    table(["repository", "branch", "HEAD", "tree", "tracked importing files", "clauses", "porcelain digest"], repoRows.map((row) => [
        row.repository, row.branch, row.head, row.tree, row.importingTrackedSourceFiles, row.importClauses, row.porcelainSha256,
    ])) + `\n\n` +
    `Non-component package imports (styles, motion/composables, aggregate entries, and unresolved retired surfaces) remain in the JSON for migration analysis; they are not silently counted as component consumers.\n`;
writeFileSync(join(ROOT, "COMPONENT-CONSUMER-ASSAY.md"), md);

console.log(JSON.stringify({ ok: true, ...counts }, null, 2));
