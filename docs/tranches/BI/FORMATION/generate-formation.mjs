import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";

import { GATES as LEGACY_GATES } from "../../../../scripts/gates.manifest.mjs";
import { INVARIANTS } from "./invariants.registry.mjs";
import { INVARIANT_FAMILY_AUDIT } from "./invariant-family-audit.registry.mjs";
import {
    LEGACY_PREDICATE_REVERSALS,
    SUPERFLUOUS_LEGACY_GATES,
    classifyLegacyGateIdentity,
} from "./legacy-gates.registry.mjs";
import {
    COMPONENT_CONCEPTS,
    FORMATION_SCHEMA,
    INTENDED_TRAILER_CONTRACT,
    PATH_LIFECYCLE_PROJECTIONS,
    P002_ACTIVATION_PREREQUISITE,
    RECEIPT_PAYLOAD_DIGEST_POLICY,
    SOURCE_BASE,
    SPECIAL_COMPONENT_CONCEPTS,
    WAVES,
} from "./waves.registry.mjs";

const ROOT = dirname(new URL(import.meta.url).pathname);
const REPO = join(ROOT, "../../../..");
const WAVE_DIR = join(ROOT, "waves");
const DATE = "2026-07-14";
const MAX_LIVE = 3;

const sha = (value) => createHash("sha256").update(value).digest("hex");
const fileSha = (path) => sha(readFileSync(path));
const uniq = (items) => [...new Set(items)];
const write = (name, value) => writeFileSync(join(ROOT, name), value);
const writeJson = (name, value) => write(name, `${JSON.stringify(value, null, 2)}\n`);
const cell = (value) => String(value ?? "—").replaceAll("|", "\\|").replaceAll("\n", " ");
const table = (headers, rows) => [
    `| ${headers.map(cell).join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map(cell).join(" | ")} |`),
].join("\n");
const bullets = (rows) => rows.map((row) => `- ${row}`).join("\n");

mkdirSync(WAVE_DIR, { recursive: true });
for (const file of readdirSync(WAVE_DIR)) rmSync(join(WAVE_DIR, file));

const waveById = new Map(WAVES.map((wave) => [wave.id, wave]));
const invariantById = new Map(INVARIANTS.map((row) => [row.id, row]));
const strataNumbers = [...new Set(WAVES.map((wave) => wave.topologicalStratum))].sort((a, b) => a - b);
const writePaths = (wave) => uniq(wave.subjects.flatMap((subject) => subject.action === "verify" ? [] : [subject.path, subject.targetPath].filter(Boolean)));
const executionLocks = (wave) => uniq([...wave.resourceLocks, ...writePaths(wave).map((path) => `file:${path}`)]);

const sourcePackage = JSON.parse(execFileSync("git", ["show", `${SOURCE_BASE}:package.json`], { cwd: REPO, encoding: "utf8" }));
const sourceGateIds = new Set(LEGACY_GATES.map((row) => row.id));
const RETAINED_PACKAGE_SCRIPTS = Object.freeze({
    dev: { rationale: "Direct local Vite development entry point; it starts the product and carries no acceptance authority." },
    build: { rationale: "Ordinary package build task retained for developers and publication; its former gate-registry membership is abolished." },
    "build:watch": { rationale: "Direct watch-mode build workflow; it is a developer convenience, not a property or close decision." },
    prepare: { rationale: "Package lifecycle hook retained for hook installation and missing-dist preparation; verification credit remains zero." },
    typecheck: { rationale: "Ordinary TypeScript developer task retained by its familiar name; the registry row and gate identity are removed." },
    test: { rationale: "Ordinary Vitest developer task retained by its familiar name; tests supply evidence but this alias is not a gate." },
    "iter-check": { rationale: "Source-only iteration diagnostic retained because it intentionally differs from the complete typecheck program." },
    "iter-build": { rationale: "Iteration-specific Vite build retained because its configuration is a real authoring workflow, not acceptance." },
    "iter-test": { rationale: "Verbose iteration test presentation retained as a local workflow with no independent completion authority." },
    "iter-test-watch": { rationale: "Interactive Vitest watch session retained; an open watch process cannot satisfy a cursor predicate." },
    "emit-types": { rationale: "Build subtask retained because package emission composes it; it is not independently enrolled as proof." },
    "gen:structure": { rationale: "Explicit structure generator authoring command retained; generated output is verified through the wave plan." },
    iter: { rationale: "Local authoring aggregate retained for quick feedback; terminal evidence still comes from scripts/verify.mjs." },
    "demo:serve": { rationale: "Native demo server entry point retained because browser scenarios require a real served product." },
    "demo:dist:build": { rationale: "Demo distribution build retained as a concrete build workflow, not an evidence identity." },
    "demo:dist:serve": { rationale: "Built-demo preview entry point retained for real artifact inspection; it creates no PASS by itself." },
    "profile:bundle": { rationale: "Diagnostic bundle profiler retained without threshold or terminal authority; verifier-owned evidence applies budgets." },
    "profile:aurora": { rationale: "Diagnostic Aurora profiler retained without threshold or terminal authority; native scenarios own acceptance." },
    release: { rationale: "User-facing release entry point retained but its script is rewritten to reconstruct authoritative state and consume the one verifier's terminal release profile." },
    prepublishOnly: { rationale: "npm lifecycle hook retained but rewritten to build, test, and invoke the one terminal release projection without proof aliases." },
});

const retainedPostP000Command = (key, sourceCommand) => {
    if (key === "prepublishOnly") return "npm run build && npm test && node scripts/verify.mjs --state auto --profile release --require-terminal";
    return sourceCommand;
};

const packageScriptDispositions = Object.entries(sourcePackage.scripts).map(([key, sourceCommand]) => {
    const retained = RETAINED_PACKAGE_SCRIPTS[key];
    const gateOnlyAlias = /^proof(?::|$)/.test(key) || /^gates?(?::|$)/.test(key) || key === "profile:budget" || key === "audit:stash" || key === "verify-export-types";
    if (!retained && !gateOnlyAlias) throw new Error(`package script ${key} has no explicit retained rationale or abrogation rule`);
    if (retained && gateOnlyAlias) throw new Error(`package script ${key} is simultaneously retained and gate-only`);
    const registeredGateRow = sourceGateIds.has(key);
    return {
        sourceKey: key,
        sourceCommand,
        sourceCommandSha256: sha(sourceCommand),
        registeredGateRow,
        disposition: retained ? (key === "prepublishOnly" || key === "release" ? "RETAIN_ORDINARY_TASK_REWRITE_GATE_FREE" : "RETAIN_ORDINARY_TASK_NO_GATE_AUTHORITY") : "DELETE_EXECUTABLE_ALIAS",
        canonicalOwner: retained ? (key === "release" || key === "prepublishOnly" ? "BI.W-P002" : "ordinary developer workflow") : "BI.W-P000",
        postP000Command: retained ? retainedPostP000Command(key, sourceCommand) : null,
        sameSpellingGateIdentitySuccessor: false,
        acceptanceCredit: "NONE_BY_ALIAS_EXISTENCE_OR_EXIT_ALONE",
        rationale: retained?.rationale ?? (registeredGateRow
            ? "This source-base registry identity is abrogated; useful semantics survive only through ordinary tests, tools, scenarios, or evidence-plan data selected by the owning wave."
            : "This executable proof/gate aggregate escaped the 403-row registry census and is deleted in the same atomic bootstrap so an unregistered alias cannot preserve the old architecture."),
    };
});

const packageScriptCounts = {
    sourcePackageScripts: packageScriptDispositions.length,
    registeredGateRows: LEGACY_GATES.length,
    deleteExecutableAliases: packageScriptDispositions.filter((row) => row.disposition === "DELETE_EXECUTABLE_ALIAS").length,
    retainOrdinaryTasks: packageScriptDispositions.filter((row) => row.disposition.startsWith("RETAIN_ORDINARY_TASK")).length,
    registeredNamesDeleted: packageScriptDispositions.filter((row) => row.registeredGateRow && row.disposition === "DELETE_EXECUTABLE_ALIAS").length,
    sameSpellingOrdinaryTasksRetained: packageScriptDispositions.filter((row) => row.registeredGateRow && row.disposition.startsWith("RETAIN_ORDINARY_TASK")).length,
    executableProofOrGateAliasesOutsideRegistryDeleted: packageScriptDispositions.filter((row) => !row.registeredGateRow && row.disposition === "DELETE_EXECUTABLE_ALIAS").length,
    proofScriptFilesDeleted: waveById.get("BI.W-P000").subjects.filter((row) => row.action === "delete" && /^scripts\/proof-/.test(row.path)).length,
    gateRegistryInfrastructureFilesDeleted: waveById.get("BI.W-P000").subjects.filter((row) => row.action === "delete" && /^scripts\/(?:gates(?:\.|\/)|gate-)/.test(row.path)).length,
};
packageScriptCounts.totalGateProofInfrastructureFilesDeleted = packageScriptCounts.proofScriptFilesDeleted + packageScriptCounts.gateRegistryInfrastructureFilesDeleted;

const resourceBatches = (waves) => {
    const remaining = [...waves].sort((a, b) => a.id.localeCompare(b.id));
    const batches = [];
    while (remaining.length) {
        const batch = [];
        const locks = new Set();
        for (let index = 0; index < remaining.length && batch.length < MAX_LIVE;) {
            const wave = remaining[index];
            const waveExecutionLocks = executionLocks(wave);
            if (waveExecutionLocks.every((lock) => !locks.has(lock))) {
                batch.push(wave);
                waveExecutionLocks.forEach((lock) => locks.add(lock));
                remaining.splice(index, 1);
            } else {
                index += 1;
            }
        }
        if (!batch.length) batch.push(remaining.shift());
        batches.push(batch.map((wave) => wave.id));
    }
    return batches;
};

const strata = strataNumbers.map((number) => {
    const waves = WAVES.filter((wave) => wave.topologicalStratum === number).sort((a, b) => a.id.localeCompare(b.id));
    return {
        id: `BI.S${String(number).padStart(2, "0")}`,
        index: number,
        width: waves.length,
        waves: waves.map((wave) => wave.id),
        maxLiveAgents: MAX_LIVE,
        resourceSafeLaunchBatches: resourceBatches(waves),
    };
});

const edges = WAVES.flatMap((wave) => wave.dependsOn.map((dependency) => {
    const source = waveById.get(dependency);
    return {
        from: dependency,
        to: wave.id,
        requiredInvariant: source.invariant,
        rationale: `${dependency} must establish its invariant before ${wave.id} can safely ${wave.intent.charAt(0).toLowerCase()}${wave.intent.slice(1)}`,
        minimal: true,
    };
}));

const distance = new Map();
const predecessor = new Map();
for (const wave of [...WAVES].sort((a, b) => a.topologicalStratum - b.topologicalStratum || a.id.localeCompare(b.id))) {
    if (!wave.dependsOn.length) {
        distance.set(wave.id, 1);
        predecessor.set(wave.id, null);
        continue;
    }
    const candidates = wave.dependsOn.map((id) => [id, distance.get(id)]).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    distance.set(wave.id, candidates[0][1] + 1);
    predecessor.set(wave.id, candidates[0][0]);
}
const criticalEnd = [...distance].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0][0];
const criticalPath = [];
for (let cursor = criticalEnd; cursor; cursor = predecessor.get(cursor)) criticalPath.unshift(cursor);

const dag = {
    schemaVersion: FORMATION_SCHEMA,
    sourceBase: SOURCE_BASE,
    nodeCount: WAVES.length,
    edgeCount: edges.length,
    stratumCount: strata.length,
    maxStratumWidth: Math.max(...strata.map((stratum) => stratum.width)),
    maxLiveAgents: MAX_LIVE,
    transitiveReductionRequired: true,
    lockPolicy: "Declared semantic locks plus an implicit exclusive lease for every explicit write, conditional REPAIR path, and rename target; a lease is acquired before a worktree starts and binds the integration-parent blob. VERIFY alone is read-only.",
    integrationEnvelopePolicy: "Builder lanes never lease receipts, FINAL, or RELEASE-ATTESTATION. The orchestrator serializes integration, writes the unique receipt plus applicable projections, commits once, resolves SELF from Git, recovers state read-only, and unlocks ordinary descendants only for DONE. P003-P133 additionally require the exact verified P002 DONE activation predicate.",
    nodes: WAVES.map((wave) => ({
        id: wave.id,
        title: wave.title,
        formationFamily: wave.formationFamily,
        stratum: wave.band,
        resourceLocks: wave.resourceLocks,
        implicitWriteLeases: writePaths(wave),
        serializedIntegrationArtifacts: wave.integrationArtifacts,
        projectionMode: wave.projectionMode,
        integrationRequires: wave.integrationRequires,
        integrationPrerequisites: wave.integrationPrerequisites,
        status: wave.status,
    })),
    edges,
    strata,
    criticalPath: {
        waveCount: criticalPath.length,
        waves: criticalPath,
        terminal: criticalEnd,
    },
};

const verificationCommand = (waveId) => waveId === "BI.W-P000"
    ? "node scripts/verify.mjs --bootstrap-plan docs/tranches/BI/FORMATION/execution-bootstrap-plan.seed.json --receipt docs/tranches/BI/BOOTSTRAP.json --wave BI.W-P000"
    : `node scripts/verify.mjs --state auto --wave ${waveId}`;

const renderPi = (pi) => pi.kind === "device-free"
    ? `Device-free: ${pi.reason}`
    : [
        `Browsers: ${pi.browsers.join(", ")}`,
        `Modes: ${pi.modes.join(", ")}`,
        `Scenarios: ${pi.scenarios.join(", ")}`,
        `Observables: ${pi.observables.join(", ")}`,
        `Freshness: ${pi.freshness}`,
        `Evidence: ${pi.evidence}`,
    ].join("\n");

const renderWave = (wave) => {
    const subjectRows = wave.subjects.map((subject, index) => [
        index + 1,
        subject.action,
        subject.path,
        subject.targetPath ?? "—",
        subject.before ?? "—",
        subject.producedBy ?? "source base",
    ]);
    const repairRows = Object.entries(wave.repairs).flatMap(([kind, paths]) => paths.map((path, index) => [kind, index + 1, path]));
    const integrationRows = wave.integrationArtifacts.map((artifact, index) => [
        index + 1,
        artifact.action,
        artifact.path,
        artifact.role,
        artifact.producedBy ?? "this wave",
        artifact.commitLocator ?? "mechanically rendered projection",
    ]);
    const invariantRows = wave.invariantFamilies.map((id) => {
        const invariant = invariantById.get(id);
        return [id, invariant.kind, invariant.invariant, invariant.bites.join("; ")];
    });
    const dependencyRows = wave.dependsOn.map((id) => [id, waveById.get(id).invariant]);
    return `# ${wave.id} — ${wave.title}\n\n` +
        `**Status:** ${wave.status}\n` +
        `**Topological stratum:** ${wave.band}\n` +
        `**Formation family:** ${wave.formationFamily}\n` +
        `**Core centers:** ${wave.coreCenters.join(", ")}\n` +
        `**Terminal owner:** ${wave.terminalOwner}\n` +
        `**Evidence root:** \`${wave.evidenceRoot}\`\n\n` +
        `## Intent\n\n${wave.intent}\n\n` +
        `## Exact scope\n\n${bullets(wave.scope)}\n\n` +
        `## File manifest (${subjectRows.length})\n\n${table(["#", "action", "path", "target", "source-base blob", "provenance"], subjectRows)}\n\n` +
        `## Repair manifest (${repairRows.length})\n\n${table(["surface", "#", "exact path"], repairRows)}\n\n` +
        `## Orchestrator integration envelope (${integrationRows.length})\n\n${table(["#", "action", "path", "role", "producer", "containing-commit policy"], integrationRows)}\n\n` +
        `These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires \`${wave.integrationLock}\`, renders the acyclic ${wave.projectionMode === "NONE" ? "receipt" : "receipt → attestation → FINAL"} chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is \`${wave.projectionMode}\`; integration-only wave references are ${wave.integrationRequires.length ? wave.integrationRequires.map((id) => `\`${id}\``).join(", ") : "none"}. The exact machine prerequisites are ${wave.integrationPrerequisites.length ? wave.integrationPrerequisites.map((row) => `\`${row.waveId}\` status \`${row.requiredStatus}\`, verified \`${row.requiredProjectionMode}\` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; ${row.failure}`).join("; ") : "none"}.\n\n` +
        `## Durable acceptance\n\n` +
        `**Invariant:** ${wave.invariant}\n\n` +
        `**Required mutation bite:** ${wave.mutationBite}\n\n` +
        `**Single executable owner:** \`${verificationCommand(wave.id)}\`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.\n\n` +
        `${table(["invariant family", "evidence kind", "oracle invariant", "realistic RED mutations"], invariantRows)}\n\n` +
        `## π obligation\n\n${renderPi(wave.pi)}\n\n` +
        `## Minimal DAG edges\n\n${dependencyRows.length ? table(["dependency", "required invariant"], dependencyRows) : "Launchable at source base: no unlanded dependency."}\n\n` +
        `Declared semantic locks: ${wave.resourceLocks.length ? wave.resourceLocks.map((lock) => `\`${lock}\``).join(", ") : "none"}. The cursor also acquires ${writePaths(wave).length} implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.\n\n` +
        `## Terminal transaction\n\n` +
        `${wave.terminalRule}\n\n` +
        `Commit policy: ${wave.commitPolicy}. Every wave requires \`BI-Wave\`, \`BI-Status\`, \`BI-Receipt-SHA256\`, and \`BI-Formation-SHA256\`; P002 and later also require \`BI-Attestation-SHA256\` and \`BI-FINAL-SHA256\`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.\n\n` +
        `## Archaeology folded\n\n${wave.archaeology.length ? bullets(wave.archaeology) : "- No distinct historical row; current-source product obligation only."}\n`;
};

for (const wave of WAVES) writeFileSync(join(WAVE_DIR, `${wave.id}.md`), renderWave(wave));

const SEED_BY_FAMILY = {
    "integrity.types": "typecheck",
    "integrity.build-package": "build",
    "integrity.entry-graph": "verify-export-types",
    "integrity.dependencies": "proof:peer-conformance",
    "integrity.lineage": "proof:lineage-probe",
    "integrity.cursor": "proof:git-hygiene",
    "integrity.dag": "proof:gate-detrap",
    "integrity.release": "proof:ship-attestation",
    "architecture.component-topology": "proof:component-orphan",
    "architecture.import-boundaries": "proof:no-nested-import",
    "architecture.clean-break": "proof:no-dual-path",
    "architecture.present-tense-source": "proof:no-legacy-commentary",
    "design.token-graph": "proof:token-manifest",
    "design.material-hierarchy": "proof:liquid-glass-material",
    "design.contrast": "proof:affordance-contrast",
    "design.adaptive-accessibility": "proof:forced-colors-skin",
    "design.typography": "proof:font-canon",
    "design.affordance": "proof:affordance-map",
    "design.responsive-touch": "proof:touch-target",
    "motion.single-clock": "proof:motion-one-clock",
    "motion.spring-language": "proof:spring-tokens-synced",
    "motion.transition-continuity": "proof:liquid-morph",
    "motion.scroll": "proof:scroll-motion",
    "motion.reduced": "proof:offscreen-pause",
    "behavior.overlay-apg": "proof:esc-stack",
    "behavior.forms": "proof:input-invalid-aria",
    "behavior.selection": "proof:tabs-std",
    "behavior.dock": "proof:dock-spine",
    "behavior.data": "proof:datatable-split",
    "behavior.feedback": "proof:progress-gradient",
    "behavior.focus-escape": "proof:a11y",
    "procedural.lifecycle": "proof:gpu-substrate-single",
    "procedural.renderer-parity": "proof:safari-webgl",
    "procedural.color": "proof:blob-space-gamma",
    "procedural.interaction": "proof:blob-interaction-prm",
    "performance.experience": "proof:perf-producer",
    "performance.resource-ownership": "proof:one-gl-per-route",
    "demo.scenario-contract": "proof:story-schema",
    "demo.gestalt": "proof:ba-gestalt",
    "constellation.handshake": "proof:constellation-spine",
};

const seedFamilyByLegacyId = new Map(Object.entries(SEED_BY_FAMILY).map(([family, id]) => [id, family]));
const legacyDispositions = LEGACY_GATES.map((row) => {
    const seedFamily = seedFamilyByLegacyId.get(row.id);
    const decision = classifyLegacyGateIdentity(row.id);
    if (seedFamily && (decision.families.length !== 1 || decision.families[0] !== seedFamily)) {
        throw new Error(`${row.id} explicit seed decision must name only ${seedFamily}`);
    }
    const isSeed = Boolean(seedFamily);
    const rejection = SUPERFLUOUS_LEGACY_GATES[row.id] ?? null;
    const reversal = LEGACY_PREDICATE_REVERSALS[row.id] ?? null;
    const canonicalFamilies = rejection ? [] : decision.families;
    const canonicalInvariantBindings = canonicalFamilies.map((family) => `${family}::invariant`);
    const legacyNoteSha256 = sha(row.note ?? "");
    const disposition = rejection
        ? "ABROGATE_IDENTITY_REJECT_NO_SUCCESSOR"
        : isSeed
            ? "ABROGATE_IDENTITY_DONATE_ORACLE_RESEARCH"
            : reversal
                ? `ABROGATE_IDENTITY_FOLD_${reversal.kind}_TO_FAMILY_INVARIANTS`
                : "ABROGATE_IDENTITY_FOLD_TO_FAMILY_INVARIANTS";
    return {
        legacyId: row.id,
        legacyCommand: row.cmd,
        legacyModes: row.tags,
        legacyNote: row.note ?? null,
        legacyNoteSha256,
        disposition,
        canonicalFamily: canonicalFamilies[0] ?? null,
        canonicalFamilies,
        canonicalInvariantBindings,
        legacyNamedCasesRetained: [],
        mappingBasis: isSeed ? "explicit-family-seed" : decision.basis,
        retainedFocus: decision.focus,
        reversal,
        rejection,
        verificationOwnerWaves: ["BI.W-P000", "BI.W-P014"],
        commandAliasRetained: false,
        sameSpellingOrdinaryTaskRetained: ["typecheck", "test", "build"].includes(row.id),
        propertyContract: rejection
            ? `REJECT ${row.id}: ${rejection.reason} Retrigger: ${rejection.retrigger}`
            : `At BI.W-P000/BI.W-P014, abrogate the ${row.id} command identity and bind legacy-note sha256:${legacyNoteSha256} as audit lineage to shared invariant(s) [${canonicalInvariantBindings.join(", ")}]. DO NOT materialize a legacy/${row.id.replaceAll(":", "/")} case, alias, script, table file, fixed roster row, or one-to-one successor. ${decision.focus} Semantic discovery plus ordinary tests/live scenarios must cover the retained behavior without preserving tranche ceremony; old filenames, fixed counts, tranche prose, and the note itself have zero success credit.${reversal ? ` REMOVE/REVERSE: ${reversal.remove} REPLACEMENT: ${reversal.replacement}` : ""}`,
    };
});

const legacyCounts = {
    total: legacyDispositions.length,
    oracleResearchDonors: legacyDispositions.filter((row) => row.disposition === "ABROGATE_IDENTITY_DONATE_ORACLE_RESEARCH").length,
    foldedToSharedFamilyInvariants: legacyDispositions.filter((row) => row.disposition.includes("_FOLD_")).length,
    rejectedWithoutSemanticSuccessor: legacyDispositions.filter((row) => row.disposition === "ABROGATE_IDENTITY_REJECT_NO_SUCCESSOR").length,
    withoutGateIdentitySuccessor: legacyDispositions.length,
    registryIdentitiesAbrogated: legacyDispositions.length,
    sameSpellingOrdinaryTasksRetained: legacyDispositions.filter((row) => row.sameSpellingOrdinaryTaskRetained).length,
    executableInvariantIdentities: 0,
    legacyNamedCasesRetained: legacyDispositions.reduce((sum, row) => sum + row.legacyNamedCasesRetained.length, 0),
    sharedCanonicalInvariantBindings: new Set(legacyDispositions.flatMap((row) => row.canonicalInvariantBindings)).size,
};
legacyCounts.registryIdentityAbrogationPercent = Number((100 * legacyCounts.registryIdentitiesAbrogated / legacyCounts.total).toFixed(2));
legacyCounts.noOneToOneGateIdentitySuccessorPercent = Number((100 * legacyCounts.withoutGateIdentitySuccessor / legacyCounts.total).toFixed(2));

const plannedDemoPaths = (ownerIds) => uniq(ownerIds.flatMap((id) => waveById.get(id).subjects
    .filter((subject) => !["verify", "repair"].includes(subject.action) && subject.path.startsWith("demo/stories/"))
    .map((subject) => subject.targetPath ?? subject.path))).sort();
const visualSpecPaths = (ownerIds) => uniq(ownerIds.flatMap((id) => waveById.get(id).repairs.tests
    .filter((path) => path.startsWith("tests-visual/")))).sort();

// A current demo witness comes from the direct manifest route's transitive
// demo/stories import graph, never from the owning wave's broad repair roster.
// This prevents one concept from inheriting an unrelated sibling's story merely
// because both happen to share an implementation wave.
const localPascal = (value) => value.split("-").map((part) => part ? part[0].toUpperCase() + part.slice(1) : "").join("");
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const sourceText = (path) => execFileSync("git", ["show", `${SOURCE_BASE}:${path}`], { cwd: REPO, encoding: "utf8", maxBuffer: 128 * 1024 * 1024 });
const demoSourcePaths = execFileSync("git", ["ls-tree", "-r", "--name-only", SOURCE_BASE, "--", "demo/stories"], { cwd: REPO, encoding: "utf8" })
    .trim().split("\n").filter((path) => /\.(?:vue|[cm]?[jt]s)$/.test(path));
const demoSourceSet = new Set(demoSourcePaths);
const demoTextByPath = new Map(demoSourcePaths.map((path) => [path, sourceText(path)]));

const parseRuntimeBindings = (clause) => {
    const bindings = [];
    const defaultPart = clause.split(/[,{*]/)[0].trim().replace(/,$/, "").trim();
    if (defaultPart && !defaultPart.startsWith("type ")) bindings.push(defaultPart);
    const named = /\{([\s\S]*?)\}/.exec(clause)?.[1] ?? "";
    for (const raw of named.split(",")) {
        const part = raw.replace(/\/\*[\s\S]*?\*\//g, "").trim();
        if (!part || part.startsWith("type ")) continue;
        const local = part.split(/\s+as\s+/).at(-1)?.trim();
        if (local) bindings.push(local);
    }
    const namespace = /\*\s+as\s+([A-Za-z_$][\w$]*)/.exec(clause)?.[1];
    if (namespace) bindings.push(namespace);
    return uniq(bindings);
};

const parseDemoImports = (content) => {
    const rows = [];
    const ranges = [];
    const pattern = /(?:^|[;\n])\s*import\s+(type\s+)?((?:(?!;|\n\s*import\b)[\s\S])*?)\s+from\s+["']([^"']+)["']/gm;
    for (const match of content.matchAll(pattern)) {
        ranges.push([match.index, match.index + match[0].length]);
        rows.push({ specifier: match[3], bindings: match[1] ? [] : parseRuntimeBindings(match[2]), kind: match[1] ? "type-only" : "static" });
    }
    for (const match of content.matchAll(/\bimport\s*\(\s*["']([^"']+)["']\s*\)/g)) {
        rows.push({ specifier: match[1], bindings: [], kind: "dynamic" });
    }
    let runtimeText = content;
    for (const [start, end] of ranges.sort((a, b) => b[0] - a[0])) {
        runtimeText = `${runtimeText.slice(0, start)}${" ".repeat(end - start)}${runtimeText.slice(end)}`;
    }
    return rows.map((row) => ({
        ...row,
        usedBindings: row.bindings.filter((binding) => new RegExp(`\\b${escapeRegExp(binding)}\\b`).test(runtimeText)),
    }));
};

const resolveDemoImport = (importer, specifier) => {
    if (!specifier.startsWith(".")) return null;
    const stem = join(dirname(importer), specifier).replaceAll("\\", "/");
    return [stem, `${stem}.vue`, `${stem}.ts`, `${stem}.js`, join(stem, "index.vue"), join(stem, "index.ts")]
        .find((candidate) => demoSourceSet.has(candidate)) ?? null;
};

const localConcepts = [
    ...COMPONENT_CONCEPTS.map((meta) => ({
        id: meta.name,
        decision: meta.decision,
        slugs: uniq([meta.name, ...meta.members.map((member) => member.name)]),
        aliases: uniq([meta.pascal, localPascal(meta.name), ...meta.members.map((member) => localPascal(member.name))]),
    })),
    ...SPECIAL_COMPONENT_CONCEPTS.map((meta) => ({
        id: meta.name,
        decision: meta.decision,
        slugs: [meta.name],
        aliases: uniq([meta.pascal, localPascal(meta.name)]),
    })),
];
const conceptIdsBySlug = new Map();
for (const concept of localConcepts) {
    for (const slug of concept.slugs) {
        if (!conceptIdsBySlug.has(slug)) conceptIdsBySlug.set(slug, new Set());
        conceptIdsBySlug.get(slug).add(concept.id);
    }
}
const aliasRows = localConcepts.flatMap((concept) => concept.aliases.map((alias) => ({ alias, conceptId: concept.id })))
    .sort((a, b) => b.alias.length - a.alias.length || a.conceptId.localeCompare(b.conceptId));

const conceptsForLocalImport = (row) => {
    if (row.kind === "type-only") return [];
    if (row.bindings.length && row.usedBindings.length === 0) return [];
    const mappings = new Map();
    const add = (conceptId, basis) => {
        if (!mappings.has(conceptId)) mappings.set(conceptId, new Set());
        mappings.get(conceptId).add(basis);
    };
    const localMatch = /^@glass\/components\/(?:ui|custom)\/([^/]+)/.exec(row.specifier);
    const flatLocalMatch = /^@glass\/components\/([^/]+)/.exec(row.specifier);
    const packageMatch = /^@mkbabb\/glass-ui\/([^/]+)/.exec(row.specifier);
    const slug = localMatch?.[1] ?? packageMatch?.[1] ?? (flatLocalMatch && !["ui", "custom"].includes(flatLocalMatch[1]) ? flatLocalMatch[1] : null);
    for (const conceptId of conceptIdsBySlug.get(slug) ?? []) add(conceptId, `COMPONENT_SUBPATH:${slug}`);
    if (row.specifier.startsWith("@glass/") || row.specifier === "@mkbabb/glass-ui" || row.specifier.startsWith("@mkbabb/glass-ui/")) {
        for (const binding of row.usedBindings) {
            const alias = aliasRows.find((candidate) => binding === candidate.alias);
            if (alias) add(alias.conceptId, `RUNTIME_BINDING:${binding}→${alias.alias}`);
        }
    }
    return [...mappings.entries()].map(([conceptId, bases]) => ({ conceptId, bases: [...bases].sort() }));
};

const parsedDemoByPath = new Map(demoSourcePaths.map((path) => {
    const imports = parseDemoImports(demoTextByPath.get(path));
    return [path, {
        localImports: imports.map((row) => resolveDemoImport(path, row.specifier)).filter(Boolean),
        componentImports: imports.flatMap((row) => conceptsForLocalImport(row).map((mapping) => ({
            conceptId: mapping.conceptId,
            bases: mapping.bases,
            specifier: row.specifier,
            bindings: row.usedBindings,
        }))),
    }];
}));

const boundRenderedAudit = JSON.parse(readFileSync(join(ROOT, "rendered-demo-audit.json"), "utf8"));
if (boundRenderedAudit.sourceBase !== SOURCE_BASE) throw new Error("rendered-demo source base diverges while deriving component witnesses");
const directStoryRoutes = boundRenderedAudit.runs.desktop.rows
    .filter((row) => row.kind === "story" && !row.redirected)
    .map((row) => ({
        route: row.actualPath,
        category: row.category,
        id: row.id,
        storyPath: `demo/stories/${row.category}/${row.id}.vue`,
    }));
for (const row of directStoryRoutes) {
    if (!demoSourceSet.has(row.storyPath)) throw new Error(`direct rendered route ${row.route} has no source story ${row.storyPath}`);
}

const graphWitnesses = [];
for (const route of directStoryRoutes) {
    const stack = [route.storyPath];
    const visited = new Set();
    while (stack.length) {
        const path = stack.pop();
        if (visited.has(path)) continue;
        visited.add(path);
        const parsed = parsedDemoByPath.get(path);
        if (!parsed) continue;
        stack.push(...parsed.localImports);
        for (const imported of parsed.componentImports) {
            graphWitnesses.push({
                conceptId: imported.conceptId,
                route: route.route,
                storyPath: route.storyPath,
                componentSourcePath: path,
                importSpecifier: imported.specifier,
                runtimeBindings: imported.bindings,
                bases: imported.bases,
                witnessClass: "DIRECT_ROUTE_TRANSITIVE_IMPORT",
            });
        }
    }
}

const INDIRECT_DEMO_WITNESSES = {
    "focus-scope": {
        paths: ["demo/stories/containers/command.vue", "demo/stories/containers/dialog.vue", "demo/stories/containers/drawer.vue", "demo/stories/containers/popover.vue"],
        basis: "Private FocusScope is exercised only through the public overlay/command owners that compose it; a standalone story would create a false public concept.",
    },
    "goo-filter": {
        paths: ["demo/stories/motion/deck.vue"],
        basis: "AppShell mounts the singleton GooFilter resource and the Deck story consumes #glass-goo through the public goo-morph behavior; global shell presence alone earns no witness.",
    },
};
const directRouteByStoryPath = new Map(directStoryRoutes.map((row) => [row.storyPath, row.route]));
const firstPartyDemoRows = localConcepts.map((concept) => {
    const direct = graphWitnesses.filter((row) => row.conceptId === concept.id);
    const indirect = INDIRECT_DEMO_WITNESSES[concept.id];
    const indirectRows = (indirect?.paths ?? []).map((storyPath) => {
        const route = directRouteByStoryPath.get(storyPath);
        if (!route) throw new Error(`${concept.id} indirect witness ${storyPath} is not a direct rendered route`);
        return {
            conceptId: concept.id,
            route,
            storyPath,
            componentSourcePath: storyPath,
            importSpecifier: "INDIRECT_PUBLIC_OWNER_COMPOSITION",
            runtimeBindings: [],
            bases: [indirect.basis],
            witnessClass: "AUTHORED_INDIRECT_OWNER_COMPOSITION",
        };
    });
    const witnesses = [...new Map([...direct, ...indirectRows].map((row) => [
        `${row.route}\0${row.componentSourcePath}\0${row.importSpecifier}\0${row.conceptId}`,
        row,
    ])).values()].sort((a, b) => a.route.localeCompare(b.route) || a.componentSourcePath.localeCompare(b.componentSourcePath));
    const actualCurrentDemoPaths = uniq(witnesses.map((row) => row.storyPath)).sort();
    return {
        conceptId: concept.id,
        decision: concept.decision,
        witnessMode: direct.length && indirectRows.length ? "DIRECT_AND_INDIRECT" : direct.length ? "DIRECT_ROUTE_GRAPH" : indirectRows.length ? "INDIRECT_OWNER_COMPOSITION" : "NO_CURRENT_WITNESS",
        actualCurrentDemoPaths,
        witnesses,
    };
});
const firstPartyDemoByConcept = new Map(firstPartyDemoRows.map((row) => [row.conceptId, row]));

writeJson("first-party-demo-assay.json", {
    schemaVersion: FORMATION_SCHEMA,
    sourceBase: SOURCE_BASE,
    renderedManifestSha256: boundRenderedAudit.manifest.sha256,
    method: "direct rendered manifest routes -> transitive demo/stories import graph -> runtime-used component binding/subpath; authored private-owner exceptions are explicit",
    counts: {
        directStoryRoutes: directStoryRoutes.length,
        demoSourceFilesParsed: demoSourcePaths.length,
        componentConcepts: firstPartyDemoRows.length,
        conceptsWithCurrentWitness: firstPartyDemoRows.filter((row) => row.actualCurrentDemoPaths.length > 0).length,
        conceptsWithoutCurrentWitness: firstPartyDemoRows.filter((row) => row.actualCurrentDemoPaths.length === 0).length,
        witnessRows: firstPartyDemoRows.reduce((sum, row) => sum + row.witnesses.length, 0),
        authoredIndirectConcepts: Object.keys(INDIRECT_DEMO_WITNESSES).length,
    },
    rows: firstPartyDemoRows,
});
write("FIRST-PARTY-DEMO-ASSAY.md", `# First-party component demo assay\n\n` +
    `A concept earns a current demo witness only when a directly rendered manifest route reaches a runtime-used component binding/subpath through the transitive \`demo/stories\` import graph. Sharing a wave, appearing in the manifest, being imported by the global shell, or being named in prose earns nothing. Private-owner exceptions are authored and source-specific.\n\n` +
    table(["concept", "decision", "witness mode", "direct route stories", "receipt rows"], firstPartyDemoRows.map((row) => [
        row.conceptId, row.decision, row.witnessMode, row.actualCurrentDemoPaths.join(", ") || "none", row.witnesses.length,
    ])) + `\n`);

const componentDispositions = [
    ...COMPONENT_CONCEPTS.map((component, index) => {
        const canonicalWaves = [`BI.W-P${String(63 + index).padStart(3, "0")}`];
        const demoAssay = firstPartyDemoByConcept.get(component.name);
        return {
            conceptId: component.name,
            publicName: component.pascal,
            canonicalWaves,
            category: component.category,
            decision: component.decision,
            decisionText: component.decisionText,
            concept: component.concept,
            contract: component.contract,
            currentMembers: component.members,
            requiredStates: component.states,
            actualCurrentDemoPaths: demoAssay.actualCurrentDemoPaths,
            actualDemoWitnessMode: demoAssay.witnessMode,
            plannedDemoPaths: plannedDemoPaths(canonicalWaves),
            visualSpecPaths: visualSpecPaths(canonicalWaves),
            mutationBite: component.bite,
            shadcnDisposition: "ABROGATE_STYLE_AND_STRUCTURE_AUTHORITY",
            aliasesOrShimsAllowed: false,
        };
    }),
    ...SPECIAL_COMPONENT_CONCEPTS.map((component) => ({
        conceptId: component.name,
        publicName: component.pascal,
        canonicalWaves: component.canonicalWaves,
        category: component.category,
        decision: component.decision,
        decisionText: `Facility-scale family is owned by ${component.canonicalWaves.join(" + ")} rather than a shallow duplicate component wave.`,
        concept: component.concept,
        contract: component.contract,
        currentMembers: [{ tier: component.tier, name: component.name, action: component.decision === "rehome-private" ? "rehome" : "modify" }],
        requiredStates: component.requiredStates,
        actualCurrentDemoPaths: firstPartyDemoByConcept.get(component.name).actualCurrentDemoPaths,
        actualDemoWitnessMode: firstPartyDemoByConcept.get(component.name).witnessMode,
        plannedDemoPaths: plannedDemoPaths(component.canonicalWaves),
        visualSpecPaths: visualSpecPaths(component.canonicalWaves),
        mutationBite: component.bite,
        shadcnDisposition: "ABROGATE_STYLE_AND_STRUCTURE_AUTHORITY",
        aliasesOrShimsAllowed: false,
    })),
];

const repairLedger = WAVES.map((wave) => ({
    waveId: wave.id,
    sourceBase: SOURCE_BASE,
    fileManifestCount: wave.subjects.length,
    repairManifestCount: Object.values(wave.repairs).flat().length,
    subjects: wave.subjects,
    repairs: wave.repairs,
}));

const pathLifecycleCounts = PATH_LIFECYCLE_PROJECTIONS.reduce((counts, row) => ({
    ...counts,
    [row.disposition]: (counts[row.disposition] ?? 0) + 1,
}), {});
const pathLifecycleEventCounts = PATH_LIFECYCLE_PROJECTIONS.reduce((counts, row) => {
    const event = row.mutationChain[0];
    const key = `${event.waveId}:${event.action}`;
    return { ...counts, [key]: (counts[key] ?? 0) + 1 };
}, {});

const reachesDependency = (from, target) => {
    const stack = [...(waveById.get(from)?.dependsOn ?? [])];
    const seen = new Set();
    while (stack.length) {
        const id = stack.pop();
        if (id === target) return true;
        if (seen.has(id)) continue;
        seen.add(id);
        stack.push(...(waveById.get(id)?.dependsOn ?? []));
    }
    return false;
};

const writeOwnersByPath = new Map();
for (const wave of WAVES) {
    for (const subject of wave.subjects) {
        if (subject.action === "verify") continue;
        for (const path of [subject.path, subject.targetPath].filter(Boolean)) {
            if (!writeOwnersByPath.has(path)) writeOwnersByPath.set(path, []);
            writeOwnersByPath.get(path).push({
                wave: wave.id,
                stratum: wave.band,
                stratumIndex: wave.topologicalStratum,
                action: subject.targetPath === path ? "rename-target" : subject.action,
                formationBefore: subject.before ?? null,
                producedBy: subject.producedBy ?? null,
            });
        }
    }
}
const pathCollisionRows = [...writeOwnersByPath.entries()]
    .map(([path, owners]) => [path, [...new Map(owners.map((owner) => [owner.wave, owner])).values()].sort((a, b) => a.stratumIndex - b.stratumIndex || a.wave.localeCompare(b.wave))])
    .filter(([, owners]) => owners.length > 1)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, owners]) => {
        const pairs = [];
        for (let left = 0; left < owners.length; left += 1) {
            for (let right = left + 1; right < owners.length; right += 1) {
                const a = owners[left];
                const b = owners[right];
                const mode = reachesDependency(a.wave, b.wave) || reachesDependency(b.wave, a.wave)
                    ? "DAG_ANCESTRY"
                    : a.stratumIndex !== b.stratumIndex
                        ? "MAXIMAL_STRATUM_BARRIER"
                        : "EXCLUSIVE_WRITE_LEASE_BATCH";
                pairs.push({ left: a.wave, right: b.wave, mode });
            }
        }
        return { path, owners, pairs };
    });
const collisionPairs = pathCollisionRows.flatMap((row) => row.pairs);
const collisionCounts = Object.fromEntries(Object.entries(Object.groupBy(collisionPairs, (pair) => pair.mode)).map(([mode, pairs]) => [mode, pairs.length]));

writeJson("waves.json", { schemaVersion: FORMATION_SCHEMA, sourceBase: SOURCE_BASE, count: WAVES.length, waves: WAVES });
const integrationArtifactRows = WAVES.map((wave) => ({
    waveId: wave.id,
    receiptPath: wave.receiptPath,
    projectionMode: wave.projectionMode,
    integrationRequires: wave.integrationRequires,
    integrationPrerequisites: wave.integrationPrerequisites,
    integrationLock: wave.integrationLock,
    agentCommitAuthority: wave.agentCommitAuthority,
    artifacts: wave.integrationArtifacts,
    agentWritePaths: writePaths(wave),
}));
writeJson("integration-artifact-ledger.json", {
    schemaVersion: FORMATION_SCHEMA,
    sourceBase: SOURCE_BASE,
    authority: "ORCHESTRATOR_INTEGRATION_PROTOCOL",
    receiptCount: integrationArtifactRows.length,
    projectionActivationWave: "BI.W-P002",
    projectionActivationPrerequisite: P002_ACTIVATION_PREREQUISITE,
    acyclicDigestOrder: ["product-and-evidence-payload", "receipt", "release-attestation", "FINAL", "commit-and-tree"],
    receiptPayloadDigestPolicy: RECEIPT_PAYLOAD_DIGEST_POLICY,
    intendedTrailerContract: INTENDED_TRAILER_CONTRACT,
    sharedIntegrationLock: "serialized-orchestrator-envelope",
    builderLeasePolicy: "integration artifacts are excluded from agent write paths and resource-safe launch batches",
    rows: integrationArtifactRows,
});
write("INTEGRATION-PROTOCOL.md", `# Durable wave integration protocol\n\n` +
    `Authoritative execution state is the first-parent Git history plus ${WAVES.length} append-only committed receipts. Every terminal DONE or evidence-backed DEAD outcome has exactly one orchestrator-owned commit and receipt; only DONE unlocks an ordinary dependent. The cursor under \`git rev-parse --git-path tranche/BI\` is disposable cache. Builder agents receive only exact subject/repair leases and never stage, commit, write receipts, or touch projections. The orchestrator serializes integration under one mutex, revalidates launch and integration-parent preimages, writes the current receipt, refreshes release attestation and FINAL from P002 onward, commits once with raw-byte digest trailers, resolves the containing commit externally, and proves read-only recovery before releasing dependents.\n\n` +
    `The digest graph is acyclic: product/evidence payload → receipt → release attestation → FINAL → commit/tree. The receipt payload digest is the canonical stage-0 builder/product/evidence index excluding all current integration adjuncts—the receipt, RELEASE-ATTESTATION, and FINAL—so it cannot depend on a later projection. The receipt never embeds its own digest or containing commit/tree. Its intendedTrailers field includes every applicable trailer name but embeds only BI-Wave, BI-Status, and BI-Formation-SHA256 values; BI-Receipt-SHA256, BI-Attestation-SHA256, and BI-FINAL-SHA256 values are forbidden because their artifacts do not exist yet. Attestation then hashes the post-receipt canonical stage-0 index excluding exactly itself and FINAL and names the receipt digest. FINAL names the attestation digest. Only after the ordered R then A then F renders does the orchestrator compute those three raw-byte digests and add them to the commit message. The commit object binds all bytes and carries \`BI-Wave\`, \`BI-Status\`, \`BI-Formation-SHA256\`, \`BI-Receipt-SHA256\`, and, from P002 onward, \`BI-Attestation-SHA256\` plus \`BI-FINAL-SHA256\`.\n\n` +
    `P002 is an integration-only activation barrier, not a builder-launch edge: P002, P003, and P004 may build concurrently from P001, but every P003-P133 integration is RED until P002 is DONE, its unique activation receipt and four core plus two projection trailers verify, and RELEASE-ATTESTATION plus FINAL exist and match those trailer digests. P002 DEAD withdraws the entire formation, forbids later integration, and permanently denies release on that lineage. Shared projection paths therefore do not appear in resource-safe launch locks or the ordinary path-collision ledger. See [integration-artifact-ledger.json](./integration-artifact-ledger.json) for every exact receipt and projection action.\n`);
writeJson("invariants.json", { schemaVersion: FORMATION_SCHEMA, sourceBase: SOURCE_BASE, count: INVARIANTS.length, normativeCount: false, executableIdentities: 0, invariants: INVARIANTS });
writeJson("dag.json", dag);
writeJson("repair-ledger.json", { schemaVersion: FORMATION_SCHEMA, sourceBase: SOURCE_BASE, waveCount: WAVES.length, rows: repairLedger });
writeJson("path-lifecycle-projection.json", {
    schemaVersion: FORMATION_SCHEMA,
    sourceBase: SOURCE_BASE,
    authority: "FORMATION_DESIGN_ONLY",
    law: "A repair scan may originate at the frozen source base, but its transaction path is projected through every ancestor rename. An ancestor deletion subtracts the repair row. Explicit subjects are never silently projected and formation fails if one cites an archaeological path.",
    observationCountIsNormative: false,
    projectionCount: PATH_LIFECYCLE_PROJECTIONS.length,
    dispositionCounts: pathLifecycleCounts,
    firstMutationCounts: pathLifecycleEventCounts,
    rows: PATH_LIFECYCLE_PROJECTIONS,
});
write("PATH-LIFECYCLE-PROJECTION.md", `# Repair-path lifecycle projection\n\n` +
    `Repair discovery begins against frozen source ${SOURCE_BASE}, but execution cannot operate on archaeological names. Before each wave is materialized, every mechanically discovered repair path is projected through structural mutations in that wave's dependency ancestry. An ancestor rename binds the current target and its producing wave; an ancestor deletion removes the definition path from the repair scan because consumer repointing belongs to the deleting transaction. Authored subjects receive no such forgiveness: a stale explicit modify, create, rename, or delete makes formation fail.\n\n` +
    `This source-bound observation contains ${PATH_LIFECYCLE_PROJECTIONS.length} transpositions: ${Object.entries(pathLifecycleCounts).map(([key, count]) => `${key}=${count}`).join(", ")}. The number is descriptive archaeology, not a future gate or roster target. The complete machine contract is [path-lifecycle-projection.json](./path-lifecycle-projection.json).\n\n` +
    `## First ancestor mutation\n\n` +
    table(["mutation", "repair rows transposed"], Object.entries(pathLifecycleEventCounts).sort(([a], [b]) => a.localeCompare(b))) + `\n\n` +
    `## Exact transpositions\n\n` +
    table(["wave", "surface", "source-base path", "execution path", "disposition", "ancestor chain"], PATH_LIFECYCLE_PROJECTIONS.map((row) => [
        row.waveId,
        row.repairSurface,
        row.sourcePath,
        row.executionPath ?? "∅ (deleted)",
        row.disposition,
        row.mutationChain.map((event) => `${event.waveId}:${event.action}:${event.fromPath}${event.toPath ? `→${event.toPath}` : "→∅"}`).join("; "),
    ])) + `\n`);
writeJson("path-collision-ledger.json", {
    schemaVersion: FORMATION_SCHEMA,
    sourceBase: SOURCE_BASE,
    policy: {
        formationPreimage: "before binds archaeological source-base provenance; it is not permission to start on a stale parent",
        executionPreimage: "cursor start acquires every file: lease, records the current integration-parent blob for each write, and rejects a changed parent before commit",
        repairSubjects: "Repair-manifest rows claim an exclusive lease. Conditional REPAIR closes MODIFIED or VERIFIED_UNCHANGED; an overlapping explicit create/rename/delete closes with the matching structural outcome against the current integration parent",
        verifySubjects: "VERIFY rows are immutable assay inputs in isolated worktrees and are re-run after integration; they do not claim a write lease",
        sameStratum: "same-ready-set write collisions are placed in distinct deterministic launch batches; no dependency edge is invented solely for mutual exclusion",
    },
    collisionPathCount: pathCollisionRows.length,
    collisionPairCount: collisionPairs.length,
    pairModeCounts: collisionCounts,
    rows: pathCollisionRows,
});
writeJson("component-dispositions.json", { schemaVersion: FORMATION_SCHEMA, sourceBase: SOURCE_BASE, conceptCount: componentDispositions.length, currentFamilyCount: componentDispositions.reduce((sum, row) => sum + row.currentMembers.length, 0), rows: componentDispositions });
writeJson("package-script-dispositions.json", {
    schemaVersion: FORMATION_SCHEMA,
    sourceBase: SOURCE_BASE,
    counts: packageScriptCounts,
    rule: "Every source-base package script has exactly one disposition. Gate/proof aliases and escaped aggregates are deleted; retained ordinary tasks have zero acceptance authority by name or exit alone.",
    rows: packageScriptDispositions,
});
write("PACKAGE-SCRIPT-ABROGATION.md", `# Package-script executable-identity abrogation\n\n` +
    `The 403-row gate manifest was not the full executable surface. Source base ${SOURCE_BASE.slice(0, 8)} contains ${packageScriptCounts.sourcePackageScripts} package scripts. P000 deletes ${packageScriptCounts.deleteExecutableAliases} aliases: ${packageScriptCounts.registeredNamesDeleted} names enrolled in the registry plus ${packageScriptCounts.executableProofOrGateAliasesOutsideRegistryDeleted} proof/gate aggregates that escaped it. It deletes ${packageScriptCounts.proofScriptFilesDeleted} \`scripts/proof-*\` implementation files plus ${packageScriptCounts.gateRegistryInfrastructureFilesDeleted} gate registry/runner files (${packageScriptCounts.totalGateProofInfrastructureFilesDeleted} total infrastructure files). ${packageScriptCounts.retainOrdinaryTasks} ordinary developer, lifecycle, demo, generation, and diagnostic tasks remain; only ${packageScriptCounts.sameSpellingOrdinaryTasksRetained} source registry spellings (\`typecheck\`, \`test\`, and \`build\`) remain, stripped of registry/gate status. These counts describe the frozen source; they are not future targets.\n\n` +
    `Existence or exit zero of a retained task earns no terminal credit. \`profile:bundle\` and \`profile:aurora\` are diagnostics without thresholds; the verifier owns budgets. \`release\` and \`prepublishOnly\` are rewritten to auto-recover Git/receipt authority and consume the one verifier's terminal release profile. No \`proof:*\`, \`gate:*\`, \`gates:*\`, \`profile:budget\`, \`audit:stash\`, or \`verify-export-types\` package alias survives.\n\n` +
    table(["source package script", "registry row", "disposition", "post-P000 command", "owner", "rationale"], packageScriptDispositions.map((row) => [
        row.sourceKey,
        row.registeredGateRow ? "yes" : "no",
        row.disposition,
        row.postP000Command ?? "deleted",
        row.canonicalOwner,
        row.rationale,
    ])) + `\n`);
writeJson("legacy-gate-dispositions.json", { schemaVersion: FORMATION_SCHEMA, sourceBase: SOURCE_BASE, counts: legacyCounts, rows: legacyDispositions });
write("LEGACY-GATE-ABROGATION.md", `# Legacy gate abrogation ledger\n\n` +
    `This is a formation archaeology ledger, not an executable roster. Every one of the 403 historical registry identities is abrogated and has no gate-identity successor. Three generic task spellings—\`typecheck\`, \`test\`, and \`build\`—remain only as ordinary developer commands outside any registry; they are not aliases or evidence identities. All proof/gate aliases, proof scripts, and \`legacy/<gate-id>\` cases disappear. Rows with shared invariant bindings contribute source-bound audit context to semantic discovery; they do not become one-to-one tests. The old note hash prevents silent loss while its prose earns zero acceptance credit. The complete 435-script surface is separately closed in [PACKAGE-SCRIPT-ABROGATION.md](./PACKAGE-SCRIPT-ABROGATION.md).\n\n` +
    table(["legacy identity", "disposition", "shared invariant bindings", "retained behavioral focus", "predicate reversal", "note SHA-256"], legacyDispositions.map((row) => [
        row.legacyId,
        row.disposition,
        row.canonicalInvariantBindings.join(", ") || "none",
        row.retainedFocus,
        row.reversal ? `${row.reversal.kind}: ${row.reversal.replacement}` : "none",
        row.legacyNoteSha256,
    ])) + `\n`);

const familyAuditById = new Map(INVARIANT_FAMILY_AUDIT.map((row) => [row.id, row]));
const invariantFamilyAuditRows = INVARIANTS.map((invariant) => {
    const audit = familyAuditById.get(invariant.id);
    if (!audit) throw new Error(`missing authored invariant-family survival audit: ${invariant.id}`);
    return {
        ...audit,
        kind: invariant.kind,
        modes: invariant.modes,
        executableIdentity: false,
        invariant: invariant.invariant,
        legacyAuditInputCount: legacyDispositions.filter((row) => row.canonicalFamilies.includes(invariant.id)).length,
        seedLegacyId: SEED_BY_FAMILY[invariant.id],
    };
});
const invariantFamilyLifecycleCounts = invariantFamilyAuditRows.reduce((counts, row) => {
    counts[row.lifecycle] = (counts[row.lifecycle] ?? 0) + 1;
    return counts;
}, {});
writeJson("invariant-family-audit.json", {
    schemaVersion: FORMATION_SCHEMA,
    sourceBase: SOURCE_BASE,
    status: "FORMATION_DESIGN_AUTHORITY",
    familyCount: invariantFamilyAuditRows.length,
    normativeFamilyCount: false,
    executableFamilyIdentities: 0,
    legacyCommandCount: LEGACY_GATES.length,
    legacyCommandIdentitiesRetained: 0,
    legacyNamedCasesRetained: 0,
    lifecycleCounts: invariantFamilyLifecycleCounts,
    rows: invariantFamilyAuditRows,
});
write("INVARIANT-FAMILY-AUDIT.md", `# Invariant-family independence audit\n\n` +
    `All 403 historical gate identities are abrogated. The current ${invariantFamilyAuditRows.length} rows are a descriptive property taxonomy, not renamed gates: no row has a command, package alias, case identity, or table file, and the count itself is non-normative. Each row survives only while it names an independently falsifiable shared property with semantic discovery, a realistic RED mutation, and an explicit lifecycle/authority boundary. There are zero legacy-named cases and no exact-count, filename-roster, screenshot-hash, prose-receipt, or command-alias successors.\n\n` +
    `Lifecycle partition: ${Object.entries(invariantFamilyLifecycleCounts).map(([name, count]) => `${name}=${count}`).join(", ")}. Formation controls are dormant outside an active cursor; cut controls cannot repair or waive product properties; continuous native families require exact-source engine evidence.\n\n` +
    table(["property family", "lifecycle", "legacy audit inputs", "why independent", "anti-contrivance law", "real RED mutation", "authority"], invariantFamilyAuditRows.map((row) => [
        row.id, row.lifecycle, row.legacyAuditInputCount, row.whyIndependent, row.antiContrivance, row.redMutation, row.authority,
    ])) + `\n`);

const productAssayRows = [
    {
        system: "Glass · material ladder",
        firstPrinciples: "Does each plate have a functional role, preserve content hierarchy, transmit a legible backdrop, and resolve intentionally under reduced transparency/contrast?",
        currentSources: ["src/styles/glass/material.css", "src/styles/glass/ladder.css", "src/styles/glass/surfaces.css", "src/styles/glass/a11y-fallback.css"],
        actualDemos: ["demo/stories/substrates/glass-material.vue", "demo/stories/foundations/paper-glass.vue"],
        currentTruth: "RED from the rendered audit: Glass Material labels its signal live but remains at luma 0.000 · dark over a visibly warm animated Aurora field, while useGlassBackdropLuminance can coalesce animated sampling to a static sample. P016 makes provenance/failure part of the material contract; P015–P018 still consolidate roles and adversarial modes.",
        canonicalWaves: ["BI.W-P015", "BI.W-P016", "BI.W-P017", "BI.W-P018", "BI.W-P022"],
        requiredLiveStates: ["warm content field", "functional control glass", "transient overlay", "light/dark", "complex high/low luminance", "reduced transparency", "forced colors"],
    },
    {
        system: "Glass · refraction/specular/key light",
        firstPrinciples: "Is refraction a nonzero depth displacement rather than hue, is rim chroma bounded, is the key light coherent with geometry, and is the declared renderer actually reached?",
        currentSources: ["src/styles/glass-refract.css", "src/styles/glass-specular-track.css", "src/composables/glass/useSpecularTracking.ts", "src/composables/glass/webgl/shaders/glass-refract.glsl.ts", "src/composables/glass/webgpu/glassShader.wgsl"],
        actualDemos: ["demo/stories/substrates/glass-material.vue", "demo/stories/display/buttons.vue", "demo/stories/navigation/tabs.vue"],
        currentTruth: "RED: both GPU shaders have zero runtime importers; the visible lens is a Chromium CSS/SVG data-URI path and Safari degrades to blur. Source-shape proofs therefore do not establish the advertised product.",
        canonicalWaves: ["BI.W-P017", "BI.W-P027", "BI.W-P035", "BI.W-P132"],
        requiredLiveStates: ["forced WebGPU", "forced WebGL2", "capability-absent material", "multi-surface", "pointer/press/travel", "native Safari Metal", "Chrome", "injected shader/binder/FBO/lifecycle/setup failures"],
    },
    {
        system: "Dock · state/anatomy/material",
        firstPrinciples: "Is there one navigation state machine, one public anatomy, and one functional plate whose content, selection, and layering remain semantically independent?",
        currentSources: ["src/components/custom/dock/GlassDock.vue", "src/components/custom/dock/DockStack.vue", "src/components/custom/dock/composables/useDockState.ts", "src/components/custom/dock/composables/dockContext.ts"],
        actualDemos: ["demo/stories/dock/overview.vue", "demo/stories/dock/sections.vue", "demo/stories/dock/layers.vue"],
        currentTruth: "The current facility is richly implemented and demoed. Rendered interaction found that inactive Dock crossfade faces remain in the accessibility tree as blank controls; P036/P037/P042/P062 therefore require one active semantic face and inert hidden faces in addition to state-authority/anatomy proof.",
        canonicalWaves: ["BI.W-P033", "BI.W-P034", "BI.W-P035", "BI.W-P037"],
        requiredLiveStates: ["rail", "bottom", "layer open/close", "focus entry/return", "Escape stack", "complex backdrop", "reduced transparency"],
    },
    {
        system: "Dock · selection/overflow/layout/controls",
        firstPrinciples: "Does one stable selection identity survive geometry changes, is overflow an explicit reachable state, is layout reserved, and does every icon control retain name/target/focus semantics?",
        currentSources: ["src/components/custom/dock/DockControl.vue", "src/components/custom/dock/DockCrossfade.vue", "src/components/custom/dock/composables/useDockOverflowFit.ts", "src/components/custom/dock/composables/useDockSearch.ts"],
        actualDemos: ["demo/stories/dock/controls.vue", "demo/stories/dock/overflow.vue", "demo/stories/dock/rail.vue", "demo/stories/dock/dock-search.vue"],
        currentTruth: "RED at 390×844: three tabbable story actions were outside the viewport, two opacity-zero facet controls remained focusable, the horizontal story scroller collapsed to 34 px for 677 px of content, and target heights fell to 20.6 px. P036/P038–P040/P062 own exact reachability, focus-reveal, overflow, reserve, and target predicates.",
        canonicalWaves: ["BI.W-P036", "BI.W-P038", "BI.W-P039", "BI.W-P040"],
        requiredLiveStates: ["selection travel", "rapid change", "overflow scroll", "selected offscreen", "rail/bottom", "keyboard", "touch", "search", "narrow/orientation"],
    },
    {
        system: "Dock · fisheye/morph/settle and dogfood",
        firstPrinciples: "Do weight, inertia, overshoot, and settle arise from one shared spring/morph spine, with bounded magnification and no ambient motion or geometry writer fork?",
        currentSources: ["src/components/custom/dock/composables/useDockFisheye.ts", "src/components/custom/dock/composables/useDockSpring.ts", "src/components/custom/dock/composables/dockMorphMeasure.ts", "src/components/custom/dock/DockCrossfade.vue"],
        actualDemos: ["demo/stories/dock/overview.vue", "demo/stories/dock/cta-receive.vue", "demo/stories/dock/DockStage.vue"],
        currentTruth: "D4 records contradictory spring constants and prior crossfade/morph facsimiles. The live CTA→Dock handoff completed in about 2009 ms without a declared product band, while first load repeated 38 unreadable --dock-morph-min warnings and masked them with the tap-floor fallback. P041 owns fail-closed token resolution and measured motion bands; P042 proves warning-clean public dogfood.",
        canonicalWaves: ["BI.W-P026", "BI.W-P028", "BI.W-P041", "BI.W-P042"],
        requiredLiveStates: ["hover/focus/touch magnification", "morph receive", "orientation change", "rapid reversal", "settle", "PRM", "dogfood navigation"],
    },
    {
        system: "Motion · temporal authority/springs/press/morph",
        firstPrinciples: "Does each animated property or semantic episode have one proportionate temporal authority and writer, with semantic spring families, conserved continuity, input-appropriate response, and explicit PRM endpoints?",
        currentSources: ["src/composables/motion/useRAFLoop.ts", "src/composables/motion/useSpring.ts", "src/composables/motion/springPresets.ts", "src/composables/motion/useLiquidPress.ts", "src/composables/motion/useElementMorph.ts", "src/composables/motion/useDragMorph.ts"],
        actualDemos: ["demo/stories/motion/springs.vue", "demo/stories/motion/curve-gallery.vue", "demo/stories/motion/tempo.vue", "demo/stories/motion/deck.vue"],
        currentTruth: "The frozen tree contains 94 scheduler/native-timeline/engine-bearing source files across several legitimate mechanism classes, so one application-wide callback would be a category error. The live smooth witness reached x=360 px / 18° and settled around 653 ms, but its story bypasses managed playback with a local rAF. Deck's unused 0.5/0.85 callable easing contradicts canonical smooth 0.58/0.8 and silently substitutes cubic-out on import failure. Button directly reconstructs spring+flex solely because proof:button-glass requires that source shape while Dock consumes the declared canonical wrapper. P023–P028 therefore establish engine isomorphism, per-property temporal ownership, semantic springs, one press owner, and one FLIP/morph runner rather than a clock quota.",
        canonicalWaves: ["BI.W-P023", "BI.W-P024", "BI.W-P025", "BI.W-P026", "BI.W-P027", "BI.W-P028"],
        requiredLiveStates: ["enter", "press", "drag", "reverse", "interruption", "settle", "keyboard", "touch", "PRM"],
    },
    {
        system: "Motion · enter/exit/scroll/pointer/text",
        firstPrinciples: "Are transitions continuous across ownership changes, is scroll state single-owned and native where available, and do text/procedural motions preserve meaning without animation?",
        currentSources: ["src/composables/motion/useViewTransition.ts", "src/composables/motion/useScrollProgress.ts", "src/composables/motion/useScrollScene.ts", "src/composables/dom/useDragVelocity.ts", "src/composables/motion/useCharStagger.ts"],
        actualDemos: ["demo/stories/motion/reveal.vue", "demo/stories/motion/scroll.vue", "demo/stories/motion/text-motion.vue", "demo/stories/motion/deck.vue"],
        currentTruth: "Direct demos exist across reveal, scroll, text, and Deck. The native scroll specimen moved scaleX 0→0.669856 for 420/627 px on its named --sp timeline; Text Motion produced semantic Countup and Typewriter changes; Deck advanced pager identity, kept focus, and announced slide 2. The four old text routes are compatibility redirects and earn no separate witness credit. P029–P032/P079/P080/P121 still require interruption/reverse/PRM/input parity, semantic text order, removal of shadow scroll/pointer writers, and deletion of Deck's inert motion export rather than accepting these happy paths.",
        canonicalWaves: ["BI.W-P029", "BI.W-P030", "BI.W-P031", "BI.W-P032", "BI.W-P079", "BI.W-P080"],
        requiredLiveStates: ["forward/reverse", "mid-flight interruption", "native scroll timeline", "JS honest floor", "pointer/coarse", "offscreen", "PRM", "semantic text order"],
    },
    {
        system: "Procedural · shared substrate/capability/color/config",
        firstPrinciples: "Does every scene share lifecycle and resource ownership while retaining one declared renderer, linear-light semantic color, typed configuration, and explicit internal failure?",
        currentSources: ["src/composables/glass/webgpu/useGpuSubstrate.ts", "src/composables/glass/webgpu/useWebGPUCanvas.ts", "src/composables/glass/webgl/createCanvasLifecycle.ts", "src/composables/glass/canvas2d/useCanvas2D.ts"],
        actualDemos: ["demo/stories/substrates/VizStudio.vue", "demo/stories/substrates/aurora.vue", "demo/stories/substrates/blob.vue", "demo/stories/substrates/constellation.vue", "demo/stories/substrates/fourier-field.vue", "demo/stories/substrates/liquid-grid.vue"],
        currentTruth: "All major scenes have actual live canvases and rich controls, but the rendered snapshots exposed no trustworthy actual engine identity. Source/live reconciliation found a deeper split: Blob, Constellation, and Fourier currently arm WebGPU-first/WebGL2, while public docs and route prose variously claim WebGL2-only or Canvas2D; legacy manifest descriptions even state the inverse of their executable scripts. First-principles allocation keeps dual engines for the per-pixel/compute Blob and Fourier scenes, but P048 de-migrates the CPU-owned 64-node Constellation to one Canvas2D renderer because its seven-instance story, public overlay seam, and context budget make the GPU fork disproportional. Aurora also warned that deferred initialization had no onInitError handler. P043–P050/P052–P054 require exact source/docs/demo agreement and typed warning-free failure.",
        canonicalWaves: ["BI.W-P043", "BI.W-P044", "BI.W-P045", "BI.W-P052", "BI.W-P053", "BI.W-P054"],
        requiredLiveStates: ["mount", "resize/DPR", "offscreen pause", "visibility", "forced renderer", "capability absence", "compile/setup failure", "color roundtrip", "teardown"],
    },
    {
        system: "Procedural · Aurora/Blob/Constellation/Fourier/LiquidGrid/hand-drawn",
        firstPrinciples: "Does each scene retain a distinct mathematical/visual concept while sharing infrastructure, and is its demo a live product witness rather than a static source showcase?",
        currentSources: ["src/components/custom/aurora/Aurora.vue", "src/components/custom/blob/Blob.vue", "src/components/custom/constellation/Constellation.vue", "src/components/custom/fourier-field/FourierField.vue", "src/components/custom/liquid-grid/LiquidGrid.vue", "src/components/custom/handmark/HandMark.vue", "src/components/custom/watercolor-dot/WatercolorDot.vue"],
        actualDemos: ["demo/stories/substrates/aurora.vue", "demo/stories/substrates/blob.vue", "demo/stories/substrates/constellation.vue", "demo/stories/substrates/fourier-field.vue", "demo/stories/substrates/liquid-grid.vue", "demo/stories/motion/handmark.vue"],
        currentTruth: "The six live demo families are retained and sharpened, not greenfield-rewritten. Aurora/Fourier/text controls exposed semantic changes, while Blob Poke could only be distinguished from continuous animation by raster change. Constellation's seven-canvas story passes drawOverlay five times, yet the migrated GPU renderer never reads it; a live click-to-warp probe showed continued drift but no visible accent focal after 700 ms. P048 restores one Canvas2D renderer and the ordered overlay pass instead of perpetuating two shaders plus a no-op API. Each owner wave defines a unique model plus executable public seams, causal semantic/numeric control observables, applicable runtime engine truth, parity only where multiple engines are justified, performance distribution, and failure/teardown proof.",
        canonicalWaves: ["BI.W-P046", "BI.W-P047", "BI.W-P048", "BI.W-P049", "BI.W-P050", "BI.W-P051"],
        requiredLiveStates: ["distinct concept gestalt", "live controls", "pointer", "dark", "narrow", "offscreen", "PRM", "WebGPU/WebGL2 where applicable", "resource teardown"],
    },
];

writeJson("product-assay.json", {
    schemaVersion: FORMATION_SCHEMA,
    sourceBase: SOURCE_BASE,
    method: "first-principles contract + actual current demo + current-truth defect + canonical live-state owner",
    systemRows: productAssayRows,
    componentRows: componentDispositions,
});

const productAssayMd = `# First-principles product and actual-demo assay\n\n` +
    `No source or proof script earns product credit by existing. Every retained material, Dock facility, motion mechanism, procedural scene, and component concept is assessed through a semantic/physical contract and an actual current demo witness; the owning wave must then render the full state matrix in Safari-current and Chrome-current (or explicitly establish a device-free property).\n\n` +
    `## System assay\n\n` +
    table(["system", "first-principles question", "current source evidence", "actual current demos", "current truth", "canonical owners", "required live states"], productAssayRows.map((row) => [
        row.system, row.firstPrinciples, row.currentSources.join(", "), row.actualDemos.join(", "), row.currentTruth, row.canonicalWaves.join(", "), row.requiredLiveStates.join(", "),
    ])) + `\n\n` +
    `## All 78 current component families → 73 concepts\n\n` +
    table(["concept", "current family rows", "decision", "first-principles contract", "actual current direct-route witness", "witness mode", "planned demo writes", "visual evidence specs", "required states", "canonical owners"], componentDispositions.map((row) => [
        row.conceptId,
        row.currentMembers.map((member) => `${member.tier}/${member.name}`).join(", "),
        row.decision,
        row.contract,
        row.actualCurrentDemoPaths.join(", ") || "private owner composition only",
        row.actualDemoWitnessMode,
        row.plannedDemoPaths.join(", ") || "none",
        row.visualSpecPaths.join(", ") || "none (retirement only)",
        row.requiredStates.join(", "),
        row.canonicalWaves.join(", "),
    ])) + `\n\n` +
    `A demo witness is evidence that the current concept can be exercised, not evidence that it already passes. Witnesses come from the exact direct-route import graph in [FIRST-PARTY-DEMO-ASSAY.md](./FIRST-PARTY-DEMO-ASSAY.md), never from shared wave membership or a compatibility redirect. The bound 124×2 route census, 24 human-reviewed contact sheets, sixteen interaction probes, and corrected semantic walk of all 90 direct stories are recorded in [RENDERED-DEMO-AUDIT.md](./RENDERED-DEMO-AUDIT.md) and [rendered-demo-audit.json](./rendered-demo-audit.json); they are formation research, not native-browser π. The refraction row is explicitly RED because the declared GPU shaders are unconsumed. Private implementation concepts (for example GooFilter and FocusScope) are witnessed only through authored public owner compositions; minting a standalone public story would itself violate one-concept ownership.\n`;
write("PRODUCT-ASSAY.md", productAssayMd);
const bootstrapWave = waveById.get("BI.W-P000");
const bootstrapDeletedPaths = bootstrapWave.subjects
    .filter((row) => row.action === "delete")
    .map((row) => row.path)
    .sort();
const bootstrapPackageDeletions = packageScriptDispositions
    .filter((row) => row.disposition === "DELETE_EXECUTABLE_ALIAS")
    .map((row) => row.sourceKey)
    .sort();
writeJson("execution-bootstrap-plan.seed.json", {
    schemaVersion: "1.0.0",
    authority: "IMMUTABLE_FORMATION_P000_PLAN_ONLY",
    mode: "P000_BOOTSTRAP_ONLY",
    sourceBase: SOURCE_BASE,
    waveId: "BI.W-P000",
    allowedInvariantFamilies: bootstrapWave.invariantFamilies,
    piPolicy: "DEVICE_FREE_FIXTURES_ONLY__NO_CURRENT_PRODUCT_VISUAL_CLAIM",
    formationDigestPolicy: "BOOTSTRAP.json binds FORMATION-MANIFEST.json contentDigestSha256; the plan cannot embed that digest because this plan is itself inside the manifest closure",
    infrastructureDeletionPaths: bootstrapDeletedPaths,
    packageAliasDeletions: bootstrapPackageDeletions,
    retainedPackageScripts: packageScriptDispositions
        .filter((row) => row.disposition.startsWith("RETAIN_ORDINARY_TASK"))
        .map((row) => ({ key: row.sourceKey, postP000Command: row.postP000Command }))
        .sort((a, b) => a.key.localeCompare(b.key)),
    activeCommandSurfaces: [
        { path: ".githooks/commit-msg", requiredOwner: "scripts/verify.mjs", requiredArgv: "node scripts/verify.mjs --state auto --profile commit --wave-from-message <commit-message-path>", bootstrapFallback: "exact trailer BI-Wave: BI.W-P000 plus staged docs/tranches/BI/BOOTSTRAP.json only" },
        { path: "scripts/install-hooks.mjs", requiredOwner: ".githooks/commit-msg", requiredArgv: "install tracked .githooks/commit-msg and core.hooksPath=.githooks", bootstrapFallback: "none" },
        { path: "package.json", requiredOwner: "scripts/verify.mjs", requiredArgv: "npm run build && npm test && node scripts/verify.mjs --state auto --profile release --require-terminal", bootstrapFallback: "none" },
        { path: ".github/workflows/ci.yml", requiredOwner: "scripts/verify.mjs", requiredArgv: "node scripts/verify.mjs --state auto --profile ci --wave-from-commit HEAD", bootstrapFallback: "P000 HEAD only" },
        { path: ".github/workflows/release.yml", requiredOwner: "scripts/verify.mjs", requiredArgv: "node scripts/verify.mjs --state auto --profile release --require-terminal", bootstrapFallback: "none" },
        { path: "scripts/release.sh", requiredOwner: "scripts/verify.mjs", requiredArgv: "node scripts/verify.mjs --state auto --profile release --require-terminal", bootstrapFallback: "none" },
    ],
    mutationContract: {
        requiredNonzeroRedThenRestore: true,
        deviceFreeAndBrowserReceiptAdapters: true,
        currentProductBrowserCredit: false,
        currentRedDisposition: "fix when P000-owned; otherwise one nonterminal future owner; never count routed RED as PASS",
    },
    receiptContract: {
        path: "docs/tranches/BI/BOOTSTRAP.json",
        schema: "scripts/tranche/bootstrap-receipt.schema.json",
        commitLocator: "EXTERNAL_FIRST_PARENT_AND_TRAILER_RESOLUTION",
        forbiddenLiteralFields: ["commitSha", "treeSha", "containingCommit", "containingTree", "receiptSha256"],
        payloadDigestPolicy: RECEIPT_PAYLOAD_DIGEST_POLICY,
        payloadDigestExcludes: ["docs/tranches/BI/BOOTSTRAP.json", "docs/tranches/BI/RELEASE-ATTESTATION.json", "docs/tranches/BI/FINAL.md"],
        intendedTrailerContract: INTENDED_TRAILER_CONTRACT,
        requiredFields: ["formationDigest", "formationAnchorParent", "sourceBase", "waveId", "status", "integrationParent", "preCommandSet", "postCommandSet", "subjectOutcomes", "evidenceDigest", "routedCurrentReds", "intendedTrailers", "payloadDigestExcludingIntegrationAdjuncts"],
        recovery: "P001 resolves integrationParent plus payloadDigestExcludingIntegrationAdjuncts plus BI-Wave and BI-Receipt-SHA256 to exactly one child commit",
    },
});
writeJson("execution-cursor.seed.json", {
    schemaVersion: "1.0.0",
    mode: "TRANCHE_DEVELOPMENT",
    sourceBase: SOURCE_BASE,
    maxLiveAgents: MAX_LIVE,
    authority: "GIT_FIRST_PARENT_PLUS_COMMITTED_RECEIPTS",
    cache: {
        authoritative: false,
        locator: "git rev-parse --path-format=absolute --git-path tranche/BI/cursor.json",
        journalLocator: "git rev-parse --path-format=absolute --git-path tranche/BI/journal/<wave-id>.json",
        lockLocator: "git rev-parse --path-format=absolute --git-path tranche/BI/lock.json",
        writeProtocol: "temp file plus fsync plus atomic rename",
        reconstruction: "scripts/tranche/cursor.mjs recover --at HEAD --read-only",
    },
    coreCommitTrailers: ["BI-Wave", "BI-Status", "BI-Receipt-SHA256", "BI-Formation-SHA256"],
    projectionCommitTrailers: ["BI-Attestation-SHA256", "BI-FINAL-SHA256"],
    intendedTrailerContract: INTENDED_TRAILER_CONTRACT,
    receiptPayloadDigestPolicy: RECEIPT_PAYLOAD_DIGEST_POLICY,
    dependencyUnlockPolicy: "only DONE unlocks ordinary dependents; DEAD is committed terminal evidence but never an unlock; P002 DEAD withdraws the whole formation and forbids P003-P133 integration",
    permittedStatuses: ["PLANNED", "RUNNING", "DONE", "DEAD"],
    forbiddenStatuses: ["PARTIAL", "DEFERRED", "CARRIED", "COMPLETE_WITH_MISSES"],
    waves: Object.fromEntries(WAVES.map((wave) => [wave.id, {
        status: "PLANNED",
        commit: null,
        evidenceDigest: null,
        terminalRationale: null,
        receiptPath: wave.receiptPath,
        integrationArtifacts: wave.integrationArtifacts,
        projectionMode: wave.projectionMode,
        integrationRequires: wave.integrationRequires,
        integrationPrerequisites: wave.integrationPrerequisites,
    }])),
});

const waveIndex = `# Perfected BI wave index\n\n` +
    `Source base: \`${SOURCE_BASE}\`. ${WAVES.length} nonterminal formation waves; ${edges.length} minimal DAG edges; ${strata.length} maximal ready-set strata.\n\n` +
    table(["wave", "stratum", "formation family", "core centers", "builder subjects", "repairs", "integration artifacts", "invariants", "π", "dependencies", "title"], WAVES.map((wave) => [
        `[${wave.id}](./waves/${wave.id}.md)`, wave.band, wave.formationFamily, wave.coreCenters.join(", "), wave.subjects.length,
        Object.values(wave.repairs).flat().length, wave.integrationArtifacts.length, wave.invariantFamilies.length, wave.pi.kind,
        wave.dependsOn.length, wave.title,
    ])) + `\n`;
write("WAVE-INDEX.md", waveIndex);

const collapsedEdges = uniq(edges.map((edge) => `${waveById.get(edge.from).band}|${waveById.get(edge.to).band}`))
    .filter((row) => row.split("|")[0] !== row.split("|")[1])
    .map((row) => row.split("|"));
const mermaid = [
    "```mermaid",
    "flowchart LR",
    ...strata.map((stratum) => `  ${stratum.id.replace(".", "_")}[\"${stratum.id} · ${stratum.width} waves\"]`),
    ...collapsedEdges.map(([from, to]) => `  ${from.replace(".", "_")} --> ${to.replace(".", "_")}`),
    "```",
].join("\n");
const strataMd = `# Perfected BI topological strata\n\n` +
    `The bands are Kahn maximal ready sets, not thematic phases. Within each ready set, the launch batches below enforce the three-live-agent ceiling, declared semantic locks, and implicit exact-path write leases. No edge exists merely to force closure work last or to serialize otherwise independent writers.\n\n` +
    `${mermaid}\n\n` +
    table(["stratum", "width", "resource-safe launch batches (≤3)"], strata.map((stratum) => [
        stratum.id, stratum.width, stratum.resourceSafeLaunchBatches.map((batch, index) => `${index + 1}: ${batch.join(", ")}`).join("; "),
    ])) + `\n\n` +
    `## Critical path (${criticalPath.length} waves)\n\n${criticalPath.map((id, index) => `${index + 1}. [${id}](./waves/${id}.md) — ${waveById.get(id).title}`).join("\n")}\n`;
write("STRATA.md", strataMd);

const collisionMd = `# Exact-path collision and lease ledger\n\n` +
    `The formation distinguishes semantic dependency from byte-level exclusion. A shared explicit or conditional builder path does not automatically justify a DAG edge: dependency edges carry product invariants, while the cursor holds an exclusive path lease and records the current integration-parent blob before a worktree starts. Conditional REPAIR rows close as MODIFIED or VERIFIED_UNCHANGED; when a repair-manifest path is also an explicit create, rename, or delete, that structural action and matching receipt win. VERIFY rows alone are isolated reads and are re-run after integration. Per-wave receipts plus FINAL and RELEASE-ATTESTATION are orchestrator-only integration artifacts: they share one serialized integration-envelope mutex and never reduce parallel builder launch width.\n\n` +
    `There are ${pathCollisionRows.length} paths written by more than one wave and ${collisionPairs.length} exact wave pairs: ${Object.entries(collisionCounts).map(([mode, count]) => `${mode}=${count}`).join(", ")}. Every same-stratum pair is separated by generated launch batches. The complete owner/pair ledger is [path-collision-ledger.json](./path-collision-ledger.json).\n\n` +
    `## Highest-contention paths\n\n` +
    table(["path", "writers", "same-stratum lease pairs"], [...pathCollisionRows]
        .sort((a, b) => b.owners.length - a.owners.length || a.path.localeCompare(b.path))
        .slice(0, 40)
        .map((row) => [row.path, row.owners.map((owner) => `${owner.wave}@${owner.stratum}:${owner.action}`).join(", "), row.pairs.filter((pair) => pair.mode === "EXCLUSIVE_WRITE_LEASE_BATCH").length])) + `\n`;
write("PATH-COLLISIONS.md", collisionMd);

const familyCounts = new Map(INVARIANTS.map((row) => [row.id, 0]));
for (const row of legacyDispositions) {
    for (const family of row.canonicalFamilies) familyCounts.set(family, familyCounts.get(family) + 1);
}
const verificationArchitecture = `# Verification architecture — properties without gates\n\n` +
    `BI.W-P000 abolishes the current ${LEGACY_GATES.length}-row registry atomically. All ${legacyCounts.registryIdentitiesAbrogated} historical gate identities disappear (${legacyCounts.registryIdentityAbrogationPercent}%), and all ${legacyCounts.withoutGateIdentitySuccessor} (${legacyCounts.noOneToOneGateIdentitySuccessorPercent}%) have no one-to-one gate-identity successor. The broader package audit finds ${packageScriptCounts.sourcePackageScripts} source aliases, of which ${packageScriptCounts.deleteExecutableAliases} are deleted; ${packageScriptCounts.executableProofOrGateAliasesOutsideRegistryDeleted} of those had escaped the registry. Only \`typecheck\`, \`test\`, and \`build\` keep a source-registry spelling, solely as ordinary developer tasks with zero gate status. P000 also deletes ${packageScriptCounts.proofScriptFilesDeleted} \`scripts/proof-*\` files and ${packageScriptCounts.gateRegistryInfrastructureFilesDeleted} registry/runner files. Forty old rows donate initial oracle research; ${legacyCounts.foldedToSharedFamilyInvariants} other rows contribute audit lineage to shared properties; ${legacyCounts.rejectedWithoutSemanticSuccessor} has no semantic successor. No proof/gate alias or \`legacy/<gate-id>\` named case survives.\n\n` +
    `The current ${INVARIANTS.length} semantic rows are not executable gates and their count is not a success criterion. They are a non-command property taxonomy used by one state-recovering owner: \`node scripts/verify.mjs --state auto --wave <wave-id>\`. P000 is the only pre-cursor exception and consumes the immutable one-shot \`execution-bootstrap-plan.seed.json\`; P001 then makes first-parent Git lineage plus committed receipts authoritative and the Git-private cursor merely reconstructable cache. The active wave and semantic discovery produce an evidence plan over normal tests and live scenarios. Local/native/release are profiles of that one owner; a property cannot be selected by a package-script alias or private command. P000 accepts only the verification mechanism and atomic command abrogation: deterministic fixtures prove device-free and browser-receipt adapters can turn RED and restore PASS, while P000 makes no current-product browser claim. Any current-source failure it actually encounters is fixed if bootstrap-owned or recorded once against one nonterminal future owner; routing never converts RED to PASS. BI.W-P014 refreshes discovery after MS1–MS9 and runs the first full native product projection without creating a second registry, table roster, or count lock. A real downstream RED may let that projection transaction close only when uniquely routed to its future owner; it remains RED and cannot satisfy property or release acceptance until the owner closes it.\n\n` +
    table(["property family", "evidence kind", "profiles", "legacy research seed", "bound legacy audit inputs", "property"], INVARIANTS.map((invariant) => [
        invariant.id, invariant.kind, invariant.modes.join(", "), SEED_BY_FAMILY[invariant.id], familyCounts.get(invariant.id), invariant.invariant,
    ])) + `\n\n` +
    `Every property has retained realistic mutations in [invariants.json](./invariants.json) and an authored independence/lifecycle/anti-contrivance judgment in [INVARIANT-FAMILY-AUDIT.md](./INVARIANT-FAMILY-AUDIT.md). Every historical registry row has one note-digest-bound disposition—or an explicit rejection—in [legacy-gate-dispositions.json](./legacy-gate-dispositions.json), and every package script has one disposition in [package-script-dispositions.json](./package-script-dispositions.json). Old rows are audit lineage only: they authorize no miniature cases, proof scripts, gate aliases, table files, fixed rosters, or gate-identity successors. Terminal migration facts remain wave acceptance, not permanent properties. Predicate reversals are first-class rows: consolidation cannot make a false oracle disappear. Consumer-specific predicates are typed external scenarios in the owning wave's evidence plan; they cannot mint commands or family identities.\n`;
write("VERIFICATION-ARCHITECTURE.md", verificationArchitecture);

const finalPreconditions = `# FINAL and release preconditions\n\n` +
    `FINAL and RELEASE-ATTESTATION are continuously generated projections installed by BI.W-P002 and refreshed by the orchestrator inside every later wave's serialized integration envelope; they are not tail-wave documents or builder leases. Intermediate commits intentionally carry \`NONTERMINAL_PROJECTION\` and \`releaseEligible: false\` with exact blockers. \`--write\` may emit that honest state, \`--check\` requires byte parity, and only \`--require-terminal\` authorizes tag/publish. The acyclic order is payload → receipt → attestation → FINAL → commit: attestation's stage-0 index digest excludes exactly attestation and FINAL while naming the receipt digest, FINAL names the attestation digest, and Git plus the artifact-digest trailers resolves the containing commit/tree externally. No tracked artifact embeds its own literal commit or tree hash. A release tag is forbidden until all of the following are true at the exact candidate tree:\n\n` +
    bullets([
        `All ${WAVES.length} cursor rows are terminal DONE or evidence-backed DEAD; no other status exists.`,
        "Each DONE or evidence-backed DEAD row resolves exactly one orchestrator-owned first-parent commit from its unique receipt and four required core trailers; every subject, repair, receipt, and applicable projection is in that commit or an explicitly read-only check. DEAD never unlocks a dependent, and a successful release lineage contains no DEAD row.",
        `Every applicable semantic property passes on current bytes through the single verifier, and each retained realistic mutation has a fresh nonzero RED receipt followed by restored PASS.`,
        "Every browser wave has source-bound Safari-current and Chrome-current receipts for wide/fine, narrow/coarse, and PRM modes; required native Safari/Metal rows cannot use Playwright WebKit.",
        "All constellation packets bind the exact tarball and owner commit; foreign dirty state is unchanged and never counted as adoption.",
        "The package, declarations, CSS/assets, version, changelog, migration facts, tarball, SBOM/provenance, tag target, and registry bytes agree.",
        "An independent non-author audit is clean, followed by two consecutive clean full passes over frozen content.",
        "release.sh is the only tag/publish path and performs no source repair.",
    ]) + `\n\n` +
    `Any post-evidence source mutation invalidates FINAL and every downstream receipt.\n`;
write("FINAL-PRECONDITIONS.md", finalPreconditions);

const walk = (dir = ROOT) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return walk(path);
    const rel = relative(ROOT, path);
    return rel === "FORMATION-MANIFEST.json" ? [] : [rel];
}).sort();
const artifactRows = walk().map((path) => ({ path, bytes: statSync(join(ROOT, path)).size, sha256: fileSha(join(ROOT, path)) }));
writeJson("FORMATION-MANIFEST.json", {
    schemaVersion: FORMATION_SCHEMA,
    formationDate: DATE,
    sourceBase: SOURCE_BASE,
    artifactCount: artifactRows.length,
    contentDigestAlgorithm: "sha256(concat(path + NUL + sha256(file)-hex + LF)) excluding FORMATION-MANIFEST.json",
    contentDigestSha256: sha(Buffer.from(artifactRows.map((row) => `${row.path}\0${row.sha256}\n`).join(""))),
    artifacts: artifactRows,
});

console.log(JSON.stringify({
    ok: true,
    waves: WAVES.length,
    invariants: INVARIANTS.length,
    legacy: legacyCounts,
    edges: edges.length,
    strata: strata.length,
    maxWidth: dag.maxStratumWidth,
    criticalPath: criticalPath.length,
    subjectRows: WAVES.reduce((sum, wave) => sum + wave.subjects.length, 0),
    repairRows: WAVES.reduce((sum, wave) => sum + Object.values(wave.repairs).flat().length, 0),
}, null, 2));
