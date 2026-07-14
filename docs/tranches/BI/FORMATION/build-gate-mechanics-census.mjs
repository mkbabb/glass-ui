import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";

import { GATES } from "../../../../scripts/gates.manifest.mjs";
import { INVARIANTS } from "./invariants.registry.mjs";
import { SOURCE_BASE } from "./waves.registry.mjs";

const ROOT = dirname(new URL(import.meta.url).pathname);
const REPO = resolve(ROOT, "../../../..");
const sha = (value) => createHash("sha256").update(value).digest("hex");
const git = (...args) => execFileSync("git", ["-C", REPO, ...args], { encoding: "utf8", maxBuffer: 128 * 1024 * 1024 });
const source = (path) => git("show", `${SOURCE_BASE}:${path}`);
const sourceBlob = (path) => git("rev-parse", `${SOURCE_BASE}:${path}`).trim();
const uniq = (items) => [...new Set(items)];
const countBy = (items, key) => Object.fromEntries(Object.entries(Object.groupBy(items, key)).map(([name, values]) => [name, values.length]));
const table = (headers, rows) => [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map((cell) => String(cell).replaceAll("|", "\\|").replaceAll("\n", " ")).join(" | ")} |`),
].join("\n");

const packageJson = JSON.parse(source("package.json"));
const legacy = JSON.parse(readFileSync(join(ROOT, "legacy-gate-dispositions.json"), "utf8"));
const legacyById = new Map(legacy.rows.map((row) => [row.legacyId, row]));
const invariantById = new Map(INVARIANTS.map((row) => [row.id, row]));

const commandKind = (command) => {
    if (/^node\s+scripts\/proof-/.test(command)) return "BESPOKE_PROOF_PROGRAM";
    if (/^vitest\s+run\b/.test(command)) return "DIRECT_VITEST";
    if (/^vue-tsc\b/.test(command)) return "DIRECT_TYPECHECK";
    if (/^vite\s+build\b/.test(command)) return "BUILD_AGGREGATE";
    if (/^bash\s+/.test(command)) return "SHELL_PROGRAM";
    if (/^node\s+scripts\/gates\.mjs\b/.test(command)) return "LEGACY_GATE_RUNNER";
    if (/^node\s+/.test(command)) return "NODE_DIAGNOSTIC";
    if (/^(?:npm|pnpm)\s+run\b/.test(command)) return "PACKAGE_AGGREGATE";
    return "OTHER_DIRECT_TASK";
};

const commandPaths = (command) => uniq([...command.matchAll(/(?:^|[\s"'`=])((?:scripts|tests|tests-visual|demo|src)\/[A-Za-z0-9_@./-]+\.(?:mjs|js|cjs|ts|tsx|vue|css|sh|json|md|png))/g)].map((match) => match[1]));
const textExtensions = new Set([".mjs", ".js", ".cjs", ".ts", ".tsx", ".vue", ".css", ".sh", ".json", ".md"]);

const collectMatches = (text, regex, map = (match) => match[0], limit = 40) => {
    regex.lastIndex = 0;
    const values = [];
    for (const match of text.matchAll(regex)) {
        values.push(map(match));
        if (values.length >= limit) break;
    }
    return uniq(values);
};

const lexicalFeatures = (text, command) => {
    const declaredCollections = collectMatches(
        text,
        /\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=/g,
        (match) => match[1],
        200,
    ).filter((name) => /(ROSTER|PATHS|FILES|ALLOWLIST|BLOCKLIST|STORIES|SURFACES|TARGETS|COMPONENTS)/.test(name.toUpperCase()));
    const fixedCardinalityComparisons = collectMatches(
        text,
        /\.length\s*(?:===|!==|==|!=|<=|>=|<|>)\s*(?:\d+|[A-Z][A-Z0-9_]*)/g,
    ).filter((expression) => {
        const numeric = /\d+/.exec(expression)?.[0];
        return numeric == null || Number(numeric) > 1;
    });
    const markdownReferences = collectMatches(text, /(?:[A-Za-z0-9_@.-]+\/)*[A-Za-z0-9_@.-]+\.md\b/g);
    const browserInvocation = /@playwright\/test|\bplaywright\s+test\b|\b(?:chromium|webkit|firefox)\.launch\s*\(/.test(`${command}\n${text}`);

    return {
        readsSourceFiles: /\breadFileSync\b|\breadFile\s*\(/.test(text),
        checksFilePresence: /\bexistsSync\b|\baccessSync\b/.test(text),
        usesLexicalPredicates: /\.includes\s*\(|\.match\s*\(|\.test\s*\(|\bnew RegExp\b/.test(text),
        declaredCollections,
        fixedCardinalityComparisons,
        markdownReferences,
        hasSelfTestMachinery: /\b(?:selfTest|runSelfTest|assertSelfTest)\b|self[- ]test/i.test(text) || /--self-test\b/.test(command),
        writesGateArtifact: /\b(?:writeGateArtifact|gateArtifactPath)\b/.test(text),
        invokesChildProcess: /\b(?:spawnSync|execFileSync|execSync|spawn|execFile)\b/.test(text),
        importsStructuredParser: /@babel\/parser|@vue\/compiler|\btypescript\b|\bts-morph\b/.test(text),
        invokesBrowserRunner: browserInvocation,
        mentionsSkipOrGrace: /\b(?:SKIP|SKIPPED|skip|grace|defer(?:red)?)\b/.test(text),
        usesReceiptOrLedgerVocabulary: /\b(?:DELTA|receipt|attestation|ledger|evidence packet)\b/i.test(text),
    };
};

const mechanicSignals = (row) => {
    const signals = [];
    if (row.commandKind === "BESPOKE_PROOF_PROGRAM") signals.push("ONE_COMMAND_PER_HISTORICAL_PROPERTY");
    if (row.features.readsSourceFiles && row.features.usesLexicalPredicates) signals.push("STATIC_SOURCE_SHAPE_EXPOSURE");
    if (row.features.checksFilePresence) signals.push("FILE_PRESENCE_EXPOSURE");
    if (row.features.declaredCollections.length > 0) signals.push("FIXED_ENROLLMENT_COLLECTION_EXPOSURE");
    if (row.features.fixedCardinalityComparisons.length > 0) signals.push("FIXED_CARDINALITY_EXPOSURE");
    if (row.features.markdownReferences.length > 0 && row.features.usesLexicalPredicates) signals.push("PROSE_RECEIPT_EXPOSURE");
    if (row.features.hasSelfTestMachinery) signals.push("SELF_TEST_ACCUMULATION");
    if (row.features.writesGateArtifact) signals.push("PER_COMMAND_ARTIFACT_CEREMONY");
    if (row.propertyKinds.includes("browser") && !row.features.invokesBrowserRunner) signals.push("BROWSER_PROPERTY_NOT_DIRECTLY_EXECUTED");
    if (row.features.mentionsSkipOrGrace) signals.push("SKIP_OR_GRACE_BRANCH_EXPOSURE");
    return signals;
};

const rows = GATES.map((gate) => {
    const disposition = legacyById.get(gate.id);
    if (!disposition) throw new Error(`${gate.id}: missing legacy disposition`);
    const command = packageJson.scripts?.[gate.cmd];
    if (typeof command !== "string") throw new Error(`${gate.id}: package script ${gate.cmd} is absent at ${SOURCE_BASE}`);
    const paths = commandPaths(command);
    const sources = paths.filter((path) => textExtensions.has(extname(path))).map((path) => ({
        path,
        sourceBaseBlob: sourceBlob(path),
        sha256: sha(source(path)),
        bytes: Buffer.byteLength(source(path)),
    }));
    const sourceText = sources.map((item) => source(item.path)).join("\n");
    const propertyKinds = uniq(disposition.canonicalFamilies.map((id) => invariantById.get(id)?.kind).filter(Boolean));
    const row = {
        legacyId: gate.id,
        commandKey: gate.cmd,
        command,
        commandSha256: sha(command),
        tags: gate.tags ?? [],
        commandKind: commandKind(command),
        referencedPaths: paths,
        sourcePrograms: sources,
        disposition: disposition.disposition,
        commandAliasRetained: disposition.commandAliasRetained,
        sameSpellingOrdinaryTaskRetained: disposition.sameSpellingOrdinaryTaskRetained,
        canonicalFamilies: disposition.canonicalFamilies,
        propertyKinds,
        features: lexicalFeatures(sourceText, command),
    };
    return { ...row, mechanicSignals: mechanicSignals(row) };
});

const featureCount = (predicate) => rows.filter(predicate).length;
const counts = {
    registryRows: rows.length,
    uniqueCommandKeys: new Set(rows.map((row) => row.commandKey)).size,
    uniqueReferencedSourcePrograms: new Set(rows.flatMap((row) => row.sourcePrograms.map((item) => item.path))).size,
    commandKinds: countBy(rows, (row) => row.commandKind),
    tagMemberships: Object.fromEntries(uniq(rows.flatMap((row) => row.tags)).sort().map((tag) => [tag, rows.filter((row) => row.tags.includes(tag)).length])),
    browserPropertyRows: featureCount((row) => row.propertyKinds.includes("browser")),
    directBrowserInvocationRows: featureCount((row) => row.features.invokesBrowserRunner),
    browserPropertyRowsWithoutDirectBrowserInvocation: featureCount((row) => row.propertyKinds.includes("browser") && !row.features.invokesBrowserRunner),
    sourceReadRows: featureCount((row) => row.features.readsSourceFiles),
    filePresenceRows: featureCount((row) => row.features.checksFilePresence),
    lexicalPredicateRows: featureCount((row) => row.features.usesLexicalPredicates),
    fixedEnrollmentCollectionRows: featureCount((row) => row.features.declaredCollections.length > 0),
    fixedCardinalityRows: featureCount((row) => row.features.fixedCardinalityComparisons.length > 0),
    markdownReferenceRows: featureCount((row) => row.features.markdownReferences.length > 0),
    selfTestRows: featureCount((row) => row.features.hasSelfTestMachinery),
    perCommandArtifactRows: featureCount((row) => row.features.writesGateArtifact),
    childProcessRows: featureCount((row) => row.features.invokesChildProcess),
    structuredParserRows: featureCount((row) => row.features.importsStructuredParser),
    skipOrGraceRows: featureCount((row) => row.features.mentionsSkipOrGrace),
    receiptOrLedgerVocabularyRows: featureCount((row) => row.features.usesReceiptOrLedgerVocabulary),
    rowsWithMechanicSignals: featureCount((row) => row.mechanicSignals.length > 0),
    mechanicSignalMemberships: Object.fromEntries(uniq(rows.flatMap((row) => row.mechanicSignals)).sort().map((signal) => [signal, rows.filter((row) => row.mechanicSignals.includes(signal)).length])),
};

const output = {
    schemaVersion: "1.0.0",
    sourceBase: SOURCE_BASE,
    generatedAt: "2026-07-14",
    status: "FORMATION_RESEARCH_ONLY",
    authority: "DESCRIPTIVE_MECHANICS_CENSUS__NEVER_PRODUCT_ACCEPTANCE__ALL_LEGACY_IDENTITIES_ABROGATED",
    method: "Every one of the 403 source-base registry rows is joined to its exact source-base package command, referenced program blobs, donated canonical property kinds, and lexical mechanism features. Features are descriptive exposure signals, not automatic verdicts; exact product contradictions remain in gate-contradiction-audit.json.",
    counts,
    rows,
};
writeFileSync(join(ROOT, "gate-mechanics-census.json"), `${JSON.stringify(output, null, 2)}\n`);

const md = `# Exhaustive legacy-gate mechanics census\n\n` +
    `**Status:** formation research only; no legacy command or census feature has product-acceptance authority\n` +
    `**Bound source:** \`${SOURCE_BASE}\`\n` +
    `**Registry identities:** ${counts.registryRows}; all are abrogated by BI.W-P000\n` +
    `**Unique package command keys:** ${counts.uniqueCommandKeys}\n` +
    `**Direct bespoke proof programs:** ${counts.commandKinds.BESPOKE_PROOF_PROGRAM ?? 0}\n` +
    `**Unique referenced source programs:** ${counts.uniqueReferencedSourcePrograms}\n` +
    `**Rows donating at least one browser property:** ${counts.browserPropertyRows}; direct commands invoking a browser runner: ${counts.directBrowserInvocationRows}\n\n` +
    `## Crux\n\n` +
    `The accretion is structural, not anecdotal. The registry gives every row a unique package command key, and ${(100 * (counts.commandKinds.BESPOKE_PROOF_PROGRAM ?? 0) / counts.registryRows).toFixed(2)}% dispatch directly to a bespoke \`scripts/proof-*\` program. ${counts.browserPropertyRows} rows donate at least one browser-kind product property, yet ${counts.browserPropertyRowsWithoutDirectBrowserInvocation} of those direct commands do not invoke Playwright or another browser runner. This does not mean every donated clause requires a browser; it means the legacy command itself cannot be accepted as complete evidence for the browser property now mapped from it.\n\n` +
    `Lexical source mechanics reinforce the post-mortem: ${counts.sourceReadRows} rows read source files, ${counts.filePresenceRows} inspect file presence, ${counts.lexicalPredicateRows} use string/regex predicates, ${counts.fixedEnrollmentCollectionRows} declare path/roster/allowlist-like collections, ${counts.fixedCardinalityRows} contain nontrivial exact length comparisons, ${counts.markdownReferenceRows} reference Markdown, ${counts.selfTestRows} carry self-test vocabulary/machinery, and ${counts.perCommandArtifactRows} write per-command gate artifacts. These are exposure counts, not a claim that every use is wrong. The row ledger preserves the exact mechanics so product contradictions can be judged individually without retaining 403 executable identities.\n\n` +
    `## Command shapes\n\n` +
    table(["kind", "rows"], Object.entries(counts.commandKinds).map(([kind, count]) => [kind, count])) + `\n\n` +
    `## Mechanic-signal memberships\n\n` +
    table(["signal", "rows", "meaning"], Object.entries(counts.mechanicSignalMemberships).map(([signal, count]) => [signal, count, ({
        ONE_COMMAND_PER_HISTORICAL_PROPERTY: "one historical identity dispatches to its own proof program",
        STATIC_SOURCE_SHAPE_EXPOSURE: "program reads source and evaluates lexical predicates",
        FILE_PRESENCE_EXPOSURE: "program can reward path/existence state",
        FIXED_ENROLLMENT_COLLECTION_EXPOSURE: "program declares roster/path/file/allowlist-like collections",
        FIXED_CARDINALITY_EXPOSURE: "program compares a collection length to a nontrivial literal/symbol",
        PROSE_RECEIPT_EXPOSURE: "program both references Markdown and applies lexical predicates",
        SELF_TEST_ACCUMULATION: "program carries self-test vocabulary or a self-test command mode",
        PER_COMMAND_ARTIFACT_CEREMONY: "program writes an identity-specific gate artifact",
        BROWSER_PROPERTY_NOT_DIRECTLY_EXECUTED: "row donates a browser property but its direct command invokes no browser runner",
        SKIP_OR_GRACE_BRANCH_EXPOSURE: "program contains skip/grace/defer vocabulary or branches",
    })[signal]])) + `\n\n` +
    `## Complete row ledger\n\n` +
    table(["legacy ID", "command kind", "property kind(s)", "referenced program(s)", "mechanic signals"], rows.map((row) => [
        row.legacyId,
        row.commandKind,
        row.propertyKinds.join(", ") || "none (rejected aggregate)",
        row.sourcePrograms.map((item) => item.path).join(", ") || "direct tool/aggregate",
        row.mechanicSignals.join(", ") || "no lexical exposure signal; identity still abrogated",
    ])) + `\n\n` +
    `## Credit boundary\n\nThis census explains why command consolidation cannot be aliasing or a cleaner 403-row table. It grants no PASS/RED product verdict, retains no named case, and changes no source. Canonical ordinary tests, semantic discovery, typed live scenarios, exact browser receipts, and the owning family property decide execution.\n`;
writeFileSync(join(ROOT, "GATE-MECHANICS-CENSUS.md"), md);

console.log(JSON.stringify({ ok: true, counts }, null, 2));
