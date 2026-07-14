import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, relative, resolve } from "node:path";

import ts from "typescript";

import { SOURCE_BASE } from "./waves.registry.mjs";
import { buildEntrySet, readTree } from "../../../../scripts/lib/subpath-policy.mjs";

const ROOT = dirname(new URL(import.meta.url).pathname);
const REPO = resolve(ROOT, "../../../..");
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
const runGit = (cwd, ...args) => execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    maxBuffer: 96 * 1024 * 1024,
}).trim();
const tryGit = (cwd, ...args) => {
    try {
        return runGit(cwd, ...args);
    } catch (error) {
        if (error.status === 1) return "";
        throw error;
    }
};
const uniq = (items) => [...new Set(items)];
const cell = (value) => String(value ?? "—").replaceAll("|", "\\|").replaceAll("\n", " ");
const table = (headers, rows) => [
    `| ${headers.map(cell).join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map(cell).join(" | ")} |`),
].join("\n");
const sourceFile = /\.(?:[cm]?[jt]sx?|vue|svelte)$/i;
const excludedPath = /(?:^|\/)(?:node_modules|dist|build|coverage|vendor|\.cache)(?:\/|$)/;
const testPath = /(?:^|\/)(?:__tests__|tests?|specs?)(?:\/|$)|\.(?:test|spec)\.[^/]+$/i;
const demoPath = /(?:^|\/)(?:demo|demos|storybook|stories)(?:\/|$)/i;
const typeName = /(?:Props|Emits|Type|Types|Options|Config|State|Context|Instance|Return|Api|Variant|Variants|Mode|Direction|Placement|Shape|Descriptor|Kind|Item|Event)$/;

const packageJson = JSON.parse(readFileSync(resolve(REPO, "package.json"), "utf8"));
const componentDispositions = JSON.parse(readFileSync(resolve(ROOT, "component-dispositions.json"), "utf8"));
if (componentDispositions.sourceBase !== SOURCE_BASE) throw new Error("component dispositions are stale");

const toRepoPath = (path) => relative(REPO, path).replaceAll("\\", "/");
const moduleCache = new Map();

function resolveLocalModule(fromFile, specifier) {
    if (!specifier.startsWith(".")) return null;
    const base = resolve(dirname(fromFile), specifier);
    const candidates = extname(base)
        ? [base]
        : [base, `${base}.ts`, `${base}.tsx`, `${base}.vue`, resolve(base, "index.ts")];
    for (const candidate of candidates) {
        try {
            readFileSync(candidate);
            return candidate;
        } catch {
            // Try the next static-resolution candidate.
        }
    }
    return null;
}

function familyForPath(path) {
    const match = /src\/components\/(ui|custom)\/([^/]+)\//.exec(path);
    return match ? { tier: match[1], name: match[2] } : null;
}

function isExternalComponentName(name) {
    return /^[A-Z][A-Za-z0-9]+$/.test(name) && !typeName.test(name);
}

function moduleComponents(file, stack = []) {
    if (moduleCache.has(file)) return moduleCache.get(file);
    if (stack.includes(file)) return new Map();
    if (file.endsWith(".vue")) {
        const row = new Map([["default", {
            sourcePath: toRepoPath(file),
            declarationPath: toRepoPath(file),
            origin: "LOCAL_VUE_SFC",
        }]]);
        moduleCache.set(file, row);
        return row;
    }

    const content = readFileSync(file, "utf8");
    const source = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const exports = new Map();
    moduleCache.set(file, exports);
    const nextStack = [...stack, file];

    for (const statement of source.statements) {
        if (!ts.isExportDeclaration(statement) || statement.isTypeOnly) continue;
        const specifier = statement.moduleSpecifier && ts.isStringLiteral(statement.moduleSpecifier)
            ? statement.moduleSpecifier.text
            : null;
        if (!specifier) continue;
        const local = resolveLocalModule(file, specifier);

        if (!statement.exportClause) {
            if (!local) continue;
            for (const [name, row] of moduleComponents(local, nextStack)) {
                if (name !== "default") exports.set(name, row);
            }
            continue;
        }
        if (!ts.isNamedExports(statement.exportClause)) continue;

        for (const element of statement.exportClause.elements) {
            if (element.isTypeOnly) continue;
            const exportedName = element.name.text;
            const importedName = element.propertyName?.text ?? exportedName;
            if (local) {
                const target = moduleComponents(local, nextStack).get(importedName);
                if (target) exports.set(exportedName, {
                    ...target,
                    declarationPath: target.declarationPath ?? toRepoPath(file),
                });
            } else if (specifier === "reka-ui" && isExternalComponentName(exportedName)) {
                exports.set(exportedName, {
                    sourcePath: `external:reka-ui#${importedName}`,
                    declarationPath: toRepoPath(file),
                    origin: "UPSTREAM_REKA_COMPONENT_REEXPORT",
                });
            }
        }
    }
    return exports;
}

const entrySet = buildEntrySet(readTree({ repoRoot: REPO })).entries;
const publishedEntryNames = new Set(Object.keys(packageJson.exports)
    .filter((key) => key === "." || (key.startsWith("./") && typeof packageJson.exports[key] === "object" && packageJson.exports[key]?.import))
    .map((key) => key === "." ? "index" : key.slice(2)));
const surfaceRows = [];
for (const [entryName, relPath] of Object.entries(entrySet).sort(([a], [b]) => a.localeCompare(b))) {
    if (!publishedEntryNames.has(entryName)) continue;
    const sourcePath = resolve(REPO, relPath);
    const specifier = entryName === "index" ? PACKAGE : `${PACKAGE}/${entryName}`;
    for (const [exportedName, resolvedComponent] of moduleComponents(sourcePath)) {
        surfaceRows.push({ entryName, specifier, exportedName, entrySourcePath: relPath, ...resolvedComponent });
    }
}

const membersByKey = new Map();
for (const surface of surfaceRows) {
    const key = `${surface.sourcePath}\0${surface.exportedName}`;
    if (!membersByKey.has(key)) membersByKey.set(key, {
        exportedName: surface.exportedName,
        sourcePath: surface.sourcePath,
        declarationPaths: [],
        origins: [],
        publishedSpecifiers: [],
        entrySourcePaths: [],
    });
    const member = membersByKey.get(key);
    member.declarationPaths.push(surface.declarationPath);
    member.origins.push(surface.origin);
    member.publishedSpecifiers.push(surface.specifier);
    member.entrySourcePaths.push(surface.entrySourcePath);
}

function parseNamedBindings(clause, declarationTypeOnly) {
    const match = /\{([\s\S]*?)\}/.exec(clause);
    if (!match) return [];
    return match[1].split(",").map((raw) => {
        const clean = raw.replace(/\/\*[\s\S]*?\*\//g, "").trim();
        if (!clean) return null;
        const itemTypeOnly = /^type\s+/.test(clean);
        const withoutType = clean.replace(/^type\s+/, "");
        const [importedName, localName = importedName] = withoutType.split(/\s+as\s+/).map((value) => value.trim());
        return { importedName, localName, typeOnly: declarationTypeOnly || itemTypeOnly };
    }).filter(Boolean);
}

function parsePackageClauses(content) {
    const rows = [];
    const pattern = /(?:^|[;\n])\s*(import|export)\s+(type\s+)?((?:(?!;|\n\s*(?:import|export)\b)[\s\S])*?)\s+from\s+["'](@mkbabb\/glass-ui(?:\/[^"']*)?)["']/gm;
    for (const match of content.matchAll(pattern)) {
        const statement = match[0];
        const kind = match[1] === "export" ? "REEXPORT_PROJECTION" : "STATIC_IMPORT";
        rows.push({
            kind,
            specifier: match[4],
            bindings: parseNamedBindings(match[3], Boolean(match[2])),
            index: match.index,
            statement,
        });
    }
    return rows;
}

const memberRows = [...membersByKey.values()]
    .map((row) => ({
        ...row,
        declarationPaths: uniq(row.declarationPaths).sort(),
        origins: uniq(row.origins).sort(),
        publishedSpecifiers: uniq(row.publishedSpecifiers).sort(),
        entrySourcePaths: uniq(row.entrySourcePaths).sort(),
        foreignEvidence: [],
    }))
    .sort((a, b) => a.exportedName.localeCompare(b.exportedName) || a.sourcePath.localeCompare(b.sourcePath));

const memberBySpecifierAndName = new Map();
const membersByName = new Map();
for (const member of memberRows) {
    if (!membersByName.has(member.exportedName)) membersByName.set(member.exportedName, []);
    membersByName.get(member.exportedName).push(member);
    for (const specifier of member.publishedSpecifiers) {
        memberBySpecifierAndName.set(`${specifier}\0${member.exportedName}`, member);
    }
}

const repositoryRows = [];
const unmatchedBindings = [];
for (const [repository, path] of REPOS) {
    const head = runGit(path, "rev-parse", "HEAD");
    const tree = runGit(path, "rev-parse", "HEAD^{tree}");
    const branch = runGit(path, "branch", "--show-current");
    const porcelain = tryGit(path, "status", "--porcelain=v1", "--untracked-files=all");
    const grep = tryGit(path, "grep", "-l", "-I", "--fixed-strings", PACKAGE, "HEAD", "--");
    const files = grep.split("\n").filter(Boolean).map((line) => line.startsWith("HEAD:") ? line.slice(5) : line)
        .filter((file) => sourceFile.test(file) && !excludedPath.test(file));
    let clauses = 0;
    let bindings = 0;
    for (const file of files) {
        const content = runGit(path, "show", `HEAD:${file}`);
        for (const clause of parsePackageClauses(content)) {
            clauses += 1;
            const residual = content.slice(0, clause.index) + content.slice(clause.index + clause.statement.length);
            for (const binding of clause.bindings) {
                bindings += 1;
                const member = memberBySpecifierAndName.get(`${clause.specifier}\0${binding.importedName}`);
                const usedOutsideClause = new RegExp(`\\b${binding.localName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(residual);
                const evidenceClass = clause.kind === "REEXPORT_PROJECTION"
                    ? "REEXPORT_PROJECTION_ZERO_DEMAND_CREDIT"
                    : binding.typeOnly
                        ? "TYPE_ONLY_IMPORT_ZERO_DEMAND_CREDIT"
                        : testPath.test(file)
                            ? "TEST_IMPORT_ZERO_DEMAND_CREDIT"
                            : demoPath.test(file)
                                ? "FOREIGN_DEMO_USAGE"
                                : usedOutsideClause
                                    ? "FOREIGN_RUNTIME_USED_VALUE_IMPORT"
                                    : "UNUSED_VALUE_IMPORT_ZERO_DEMAND_CREDIT";
                const evidence = {
                    repository,
                    repositoryHead: head,
                    file,
                    specifier: clause.specifier,
                    importedName: binding.importedName,
                    localName: binding.localName,
                    clauseKind: clause.kind,
                    typeOnly: binding.typeOnly,
                    usedOutsideClause,
                    evidenceClass,
                };
                if (member) member.foreignEvidence.push(evidence);
                else {
                    unmatchedBindings.push(evidence);
                    const sameNameMembers = membersByName.get(binding.importedName) ?? [];
                    if (sameNameMembers.length === 1) {
                        if (!sameNameMembers[0].misprojectedForeignEvidence) sameNameMembers[0].misprojectedForeignEvidence = [];
                        sameNameMembers[0].misprojectedForeignEvidence.push({
                            ...evidence,
                            evidenceClass: "WRONG_OR_RETIRED_SPECIFIER_ZERO_CURRENT_DEMAND_CREDIT",
                        });
                    }
                }
            }
        }
    }
    repositoryRows.push({
        repository,
        path,
        branch,
        head,
        tree,
        porcelainSha256: sha(porcelain),
        importingTrackedFiles: files.length,
        packageImportClauses: clauses,
        namedBindings: bindings,
    });
}

function trackedTextFiles(prefixes) {
    const files = runGit(REPO, "ls-files", ...prefixes).split("\n").filter(Boolean)
        .filter((path) => sourceFile.test(path) && !excludedPath.test(path));
    return files.map((path) => ({ path, content: readFileSync(resolve(REPO, path), "utf8") }));
}

const firstPartyDemoFiles = trackedTextFiles(["demo"]);
const firstPartySourceFiles = trackedTextFiles(["src"]);
const kebab = (value) => value.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const tagWitnesses = (member, files) => {
    const names = uniq([member.exportedName, kebab(member.exportedName)]);
    return files.filter(({ path, content }) => path !== member.sourcePath && names.some((name) => new RegExp(`<${name}(?:\\s|/|>)`, "i").test(content)))
        .map(({ path }) => path)
        .sort();
};

function directImportedUseWitnesses(member, files) {
    const family = familyForPath(member.sourcePath) ?? member.declarationPaths.map(familyForPath).find(Boolean) ?? null;
    if (!family) return [];
    const familyNeedles = [
        `components/${family.tier}/${family.name}`,
        member.sourcePath.replace(/^src\//, ""),
        member.sourcePath.split("/").at(-1)?.replace(/\.vue$/, ""),
        ...member.entrySourcePaths.map((path) => path.replace(/\/index\.ts$/, "").replace(/^src\//, "")),
    ].filter(Boolean);
    const rows = [];
    const pattern = /(?:^|[;\n])\s*import\s+(?!type\b)((?:(?!;|\n\s*import\b)[\s\S])*?)\s+from\s+["']([^"']+)["']/gm;
    for (const { path, content } of files) {
        if (path === member.sourcePath) continue;
        for (const match of content.matchAll(pattern)) {
            const specifier = match[2];
            const normalizedTarget = specifier.startsWith("@glass/")
                ? `src/${specifier.slice("@glass/".length)}`
                : specifier.startsWith(".")
                    ? toRepoPath(resolve(dirname(resolve(REPO, path)), specifier))
                    : specifier;
            if (!familyNeedles.some((needle) => normalizedTarget.includes(needle))) continue;
            const residual = content.slice(0, match.index) + content.slice(match.index + match[0].length);
            for (const binding of parseNamedBindings(match[1], false)) {
                if (binding.typeOnly || binding.importedName !== member.exportedName) continue;
                if (new RegExp(`\\b${binding.localName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(residual)) rows.push(path);
            }
            const defaultBinding = /^\s*([A-Za-z_$][\w$]*)\s*(?:,|$)/.exec(match[1])?.[1];
            const memberLeaf = member.sourcePath.split("/").at(-1)?.replace(/\.vue$/, "");
            if (defaultBinding && memberLeaf && normalizedTarget.includes(memberLeaf) && new RegExp(`\\b${defaultBinding.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(residual)) rows.push(path);
        }
    }
    return uniq(rows).sort();
}

const dispositionsByFamily = new Map();
for (const disposition of componentDispositions.rows) {
    for (const member of disposition.currentMembers) {
        dispositionsByFamily.set(`${member.tier}\0${member.name}`, { disposition, member });
    }
}

const exactDeleteSymbols = new Set(["GlassCarouselPager", "StackedIconGroup"]);
let sequence = 0;
for (const member of memberRows) {
    sequence += 1;
    member.id = `PCM-${String(sequence).padStart(3, "0")}`;
    member.misprojectedForeignEvidence ??= [];
    member.firstPartyDemoTagPaths = tagWitnesses(member, firstPartyDemoFiles);
    member.internalCompositionTagPaths = tagWitnesses(member, firstPartySourceFiles);
    member.firstPartyDemoImportedUsePaths = directImportedUseWitnesses(member, firstPartyDemoFiles);
    member.internalCompositionImportedUsePaths = directImportedUseWitnesses(member, firstPartySourceFiles);
    member.firstPartyDemoWitnessPaths = [...member.firstPartyDemoImportedUsePaths];
    member.internalCompositionWitnessPaths = [...member.internalCompositionImportedUsePaths];
    const family = familyForPath(member.sourcePath) ?? member.declarationPaths.map(familyForPath).find(Boolean) ?? null;
    member.family = family;
    const ownership = family ? dispositionsByFamily.get(`${family.tier}\0${family.name}`) : null;
    member.conceptId = ownership?.disposition.conceptId ?? null;
    member.conceptDecision = ownership?.disposition.decision ?? null;
    member.conceptMemberAction = ownership?.member.action ?? null;
    member.canonicalWaves = ownership?.disposition.canonicalWaves ?? [];
    member.contract = ownership?.disposition.contract ?? null;
    member.causalExternalRuntimeEvidence = member.foreignEvidence.filter((row) => row.evidenceClass === "FOREIGN_RUNTIME_USED_VALUE_IMPORT");
    member.foreignDemoEvidence = member.foreignEvidence.filter((row) => row.evidenceClass === "FOREIGN_DEMO_USAGE");
    member.zeroCreditEvidence = member.foreignEvidence.filter((row) => row.evidenceClass.endsWith("ZERO_DEMAND_CREDIT"));
    member.discoveryDisposition = member.conceptMemberAction === "delete"
        ? "DELETE_WITH_OWNING_CONCEPT_MEMBER"
        : exactDeleteSymbols.has(member.exportedName)
            ? "DELETE_EXACT_MEMBER"
            : member.causalExternalRuntimeEvidence.length
                ? "CONSUMER_BOUND_RETAIN_OR_MIGRATE"
                : member.firstPartyDemoWitnessPaths.length || member.foreignDemoEvidence.length
                    ? "DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED"
                    : member.internalCompositionWitnessPaths.length
                        ? "INTERNAL_COMPOSITION_PUBLICATION_JUDGMENT_REQUIRED"
                        : "ZERO_CAUSAL_DEMAND_PUBLICATION_JUDGMENT_REQUIRED";
}

const countBy = (rows, key) => Object.fromEntries([...new Set(rows.map((row) => row[key]))].sort().map((value) => [value, rows.filter((row) => row[key] === value).length]));
const counts = {
    publishedEntryPoints: publishedEntryNames.size,
    publicComponentMembers: memberRows.length,
    localVueMembers: memberRows.filter((row) => row.origins.includes("LOCAL_VUE_SFC")).length,
    upstreamRekaMembers: memberRows.filter((row) => row.origins.includes("UPSTREAM_REKA_COMPONENT_REEXPORT")).length,
    rootPublishedMembers: memberRows.filter((row) => row.publishedSpecifiers.includes(PACKAGE)).length,
    exactExternalRuntimeDemandMembers: memberRows.filter((row) => row.causalExternalRuntimeEvidence.length).length,
    foreignDemoOnlyOrAlsoMembers: memberRows.filter((row) => row.foreignDemoEvidence.length).length,
    firstPartyDemoMembers: memberRows.filter((row) => row.firstPartyDemoWitnessPaths.length).length,
    internalCompositionMembers: memberRows.filter((row) => row.internalCompositionWitnessPaths.length).length,
    zeroCausalRuntimeDemandMembers: memberRows.filter((row) => !row.causalExternalRuntimeEvidence.length).length,
    zeroAnyRenderedOrRuntimeWitnessMembers: memberRows.filter((row) => !row.causalExternalRuntimeEvidence.length && !row.foreignDemoEvidence.length && !row.firstPartyDemoWitnessPaths.length && !row.internalCompositionWitnessPaths.length).length,
    membersWithWrongOrRetiredSpecifierEvidence: memberRows.filter((row) => row.misprojectedForeignEvidence.length).length,
    unmatchedForeignNamedBindings: unmatchedBindings.length,
};

const output = {
    schemaVersion: "0.1.0",
    generatedAt: "2026-07-14",
    sourceBase: SOURCE_BASE,
    status: "FORMATION_RESEARCH_ONLY",
    authority: "EXACT_PUBLISHED_COMPONENT_MEMBER_DISCOVERY_AND_CAUSAL_DEMAND_CLASSIFICATION__NEVER_EXECUTION_PASS",
    method: "Resolve every published entry barrel recursively to exact local Vue SFC or direct Reka component exports; bind exact named imports in nine read-only tracked HEADs; give tests, type imports, re-export projections, unused imports, sibling members, and path existence zero runtime-demand credit; separately preserve foreign demos, first-party demo tags, and internal composition as product-judgment evidence.",
    thresholdLaw: "No count is a gate. External runtime demand prevents silent deletion but does not freeze API design; absence of demand does not itself delete a sound primitive. Every member still requires an authored keep, fold, privatize, migrate, or delete judgment with an executable owning wave and non-vacuous scenario predicate.",
    counts,
    discoveryDispositionCounts: countBy(memberRows, "discoveryDisposition"),
    repositories: repositoryRows,
    members: memberRows,
    unmatchedForeignNamedBindings: unmatchedBindings,
};
writeFileSync(resolve(ROOT, "public-component-member-demand-audit.json"), `${JSON.stringify(output, null, 2)}\n`);

const md = `# Public component-member demand audit\n\n${output.method}\n\n${output.thresholdLaw}\n\n` +
    `Counts: ${Object.entries(counts).map(([key, value]) => `${key}=${value}`).join(", ")}.\n\n` +
    `Discovery dispositions: ${Object.entries(output.discoveryDispositionCounts).map(([key, value]) => `${key}=${value}`).join(", ")}.\n\n` +
    `## Exact members\n\n` +
    table(["id", "member", "source", "published at", "concept/action", "causal external", "foreign demo", "first-party demo", "internal composition", "discovery disposition", "owners"], memberRows.map((row) => [
        row.id,
        row.exportedName,
        row.sourcePath,
        row.publishedSpecifiers.join(", "),
        `${row.conceptId ?? "unmapped"}/${row.conceptMemberAction ?? "unmapped"}`,
        row.causalExternalRuntimeEvidence.length,
        row.foreignDemoEvidence.length,
        row.firstPartyDemoWitnessPaths.length,
        row.internalCompositionWitnessPaths.length,
        row.discoveryDisposition,
        row.canonicalWaves.join(", ") || "unmapped",
    ])) + `\n\n` +
    `The JSON preserves every exact import and tag witness. This discovery pass deliberately does not convert demo visibility or internal composition into publication demand and does not let a used sibling donate demand.\n`;
writeFileSync(resolve(ROOT, "PUBLIC-COMPONENT-MEMBER-DEMAND-AUDIT.md"), md);

console.log(JSON.stringify({ ok: true, counts, discoveryDispositionCounts: output.discoveryDispositionCounts }, null, 2));
