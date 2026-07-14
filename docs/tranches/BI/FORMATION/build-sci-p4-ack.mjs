import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, statSync, mkdirSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";

import { INVARIANTS } from "./invariants.registry.mjs";
import { COMPONENT_CONCEPTS, SOURCE_BASE, WAVES } from "./waves.registry.mjs";

const FORMATION = dirname(new URL(import.meta.url).pathname);
const GLASS = resolve(FORMATION, "../../../..");
const PACKET = "/Users/mkbabb/Programming/sci-report/atlas/docs/tranches/P/refine/planv4";
const ATLAS = "/Users/mkbabb/Programming/sci-report/atlas";
const PRECEPTS = "/Users/mkbabb/Programming/precepts";
const OUT = join(FORMATION, "coordination");
const MESSAGE_ID = "SCI-P4-GLASS-BG-BH-BI-ADDENDUM-001";
const ACK_REL = `docs/tranches/BI/FORMATION/coordination/${MESSAGE_ID}-ACK.json`;
const GATE_MAP_REL = "docs/tranches/BI/FORMATION/coordination/SCI-P4-gate-mapping.json";
const SOURCE_MAP_REL = "docs/tranches/BI/FORMATION/coordination/SCI-P4-source-row-mapping.json";
const SCOPE_MAP_REL = "docs/tranches/BI/FORMATION/coordination/SCI-P4-scope-row-mapping.json";
const TARGET_MAP_REL = "docs/tranches/BI/FORMATION/coordination/SCI-P4-target-path-mapping.json";
const SCOPE_REL = "docs/tranches/BI/exec/atlas-touched/ATLAS-PRODUCER-CLOSURE.v1.json";

const sha = (value) => createHash("sha256").update(value).digest("hex");
const bytes = (path) => readFileSync(path);
const fileSha = (path) => sha(bytes(path));
const json = (path) => JSON.parse(readFileSync(path, "utf8"));
const command = (cwd, ...args) => execFileSync(args.shift(), args, { cwd, encoding: "utf8" }).trim();
const uniq = (items) => [...new Set(items)];

const walk = (root, dir = root) => readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => entry.isDirectory() ? walk(root, join(dir, entry.name)) : [relative(root, join(dir, entry.name))])
    .sort();

// Canonical packet digest: bytewise-sorted relative path, NUL, file sha256 hex, LF.
const packetRows = walk(PACKET).map((path) => `${path}\0${fileSha(join(PACKET, path))}\n`);
const packetDigest = sha(Buffer.from(packetRows.join("")));
const packetFileCount = packetRows.length;

const scopePath = join(PACKET, "glass-addenda/ATLAS-TOUCHED-SCOPE.json");
const scope = json(scopePath);
const sourceLedger = json(join(PACKET, "glass-addenda/SOURCE-DISPOSITIONS.json"));
const targetManifest = json(join(PACKET, "glass-addenda/TARGET-PATH-MANIFEST.json"));
const gateMarkdown = readFileSync(join(PACKET, "glass-addenda/GATES.md"), "utf8");

const waveIds = new Set(WAVES.map((wave) => wave.id));
const invariantIds = new Set(INVARIANTS.map((invariant) => invariant.id));
const waveById = new Map(WAVES.map((wave) => [wave.id, wave]));
const verifierArgv = (waveId) => `(cd ${GLASS} && node scripts/verify.mjs --state auto --wave ${waveId})`;

const GW_ROUTES = {
    "G.W0": ["BI.W-P133", "BI.W-P003", "BI.W-P004", "BI.W-P005", "BI.W-P014"],
    "G.W1": ["BI.W-P013", "BI.W-P126"],
    "G.W2": ["BI.W-P085", "BI.W-P111", "BI.W-P123", "BI.W-P057", "BI.W-P061", "BI.W-P126"],
    "G.W3": ["BI.W-P006", "BI.W-P009", "BI.W-P117", "BI.W-P126"],
    "G.W4": ["BI.W-P005", "BI.W-P010", "BI.W-P011", "BI.W-P012"],
    "G.W5": ["BI.W-P006", "BI.W-P007", "BI.W-P117"],
    "G.W6": ["BI.W-P008", "BI.W-P010", "BI.W-P128"],
    "G.W7": ["BI.W-P009", "BI.W-P010", "BI.W-P128"],
    "G.W8": ["BI.W-P011", "BI.W-P012", "BI.W-P014", "BI.W-P129"],
    "G.W9": ["BI.W-P132", "BI.W-P061", "BI.W-P002", "BI.W-P004"],
    "G.W10": ["BI.W-P002", "BI.W-P004", "BI.W-P128"],
    "G.W11": ["BI.W-P002", "BI.W-P004", "BI.W-P061"],
    "G.W12": ["BI.W-P002"],
    "G.W13": ["BI.W-P002", "BI.W-P010", "BI.W-P128"],
    "G.W14": ["BI.W-P002", "BI.W-P004", "BI.W-P133"],
};

// One primary descriptive invariant per source GG proposal. Secondary invariants
// remain explicit where a retained predicate spans orthogonal properties. These
// rows are evidence-plan data; they never become commands, package aliases,
// table files, or named runnable cases.
const INVARIANT_ROUTES = [
    ["integrity.lineage", ["BI.W-P003", "BI.W-P133"]],
    ["integrity.dag", ["BI.W-P133"]],
    ["constellation.handshake", ["BI.W-P004", "BI.W-P133"]],
    ["integrity.dag", ["BI.W-P133"]],
    ["integrity.lineage", ["BI.W-P013", "BI.W-P126"]],
    ["integrity.lineage", ["BI.W-P013", "BI.W-P126"]],
    ["integrity.lineage", ["BI.W-P013", "BI.W-P133"]],
    ["architecture.clean-break", ["BI.W-P126"]],
    ["integrity.dag", ["BI.W-P133"]],
    ["architecture.clean-break", ["BI.W-P085", "BI.W-P111"]],
    ["behavior.feedback", ["BI.W-P123"]],
    ["demo.scenario-contract", ["BI.W-P057", "BI.W-P061"]],
    ["architecture.clean-break", ["BI.W-P126"]],
    ["architecture.import-boundaries", ["BI.W-P006", "BI.W-P009", "BI.W-P126"]],
    ["integrity.dependencies", ["BI.W-P117", "BI.W-P127"]],
    ["integrity.dag", ["BI.W-P133"]],
    ["architecture.component-topology", ["BI.W-P005"]],
    ["architecture.import-boundaries", ["BI.W-P005"]],
    ["architecture.component-topology", ["BI.W-P005", "BI.W-P011", "BI.W-P012"]],
    ["integrity.dag", ["BI.W-P005", "BI.W-P133"]],
    ["architecture.component-topology", ["BI.W-P006"]],
    ["integrity.entry-graph", ["BI.W-P006", "BI.W-P117"]],
    ["architecture.component-topology", ["BI.W-P007"]],
    ["architecture.import-boundaries", ["BI.W-P006", "BI.W-P007"]],
    ["architecture.component-topology", ["BI.W-P008"]],
    ["integrity.entry-graph", ["BI.W-P010", "BI.W-P128"]],
    ["integrity.types", ["BI.W-P010", "BI.W-P128"]],
    ["integrity.build-package", ["BI.W-P008", "BI.W-P128"]],
    ["architecture.clean-break", ["BI.W-P009"]],
    ["integrity.entry-graph", ["BI.W-P010"]],
    ["integrity.entry-graph", ["BI.W-P010", "BI.W-P128"]],
    ["integrity.build-package", ["BI.W-P010", "BI.W-P128"]],
    ["architecture.component-topology", ["BI.W-P011"]],
    ["demo.scenario-contract", ["BI.W-P012", "BI.W-P057"]],
    ["architecture.present-tense-source", ["BI.W-P129", "BI.W-P131"]],
    ["integrity.dag", ["BI.W-P014", "BI.W-P133"]],
    ["procedural.lifecycle", ["BI.W-P132"]],
    ["performance.experience", ["BI.W-P132"]],
    ["procedural.renderer-parity", ["BI.W-P132"]],
    ["integrity.lineage", ["BI.W-P061", "BI.W-P132", "BI.W-P133"]],
    ["integrity.lineage", ["BI.W-P002"]],
    ["integrity.build-package", ["BI.W-P002", "BI.W-P128"]],
    ["constellation.handshake", ["BI.W-P004", "BI.W-P133"]],
    ["integrity.lineage", ["BI.W-P002"]],
    ["constellation.handshake", ["BI.W-P004", "BI.W-P133"]],
    ["integrity.release", ["BI.W-P002"]],
    ["integrity.lineage", ["BI.W-P002"]],
    ["integrity.lineage", ["BI.W-P002"]],
    ["integrity.release", ["BI.W-P002"]],
    ["integrity.release", ["BI.W-P002"]],
    ["integrity.release", ["BI.W-P002"]],
    ["integrity.release", ["BI.W-P002"]],
    ["integrity.release", ["BI.W-P002"]],
    ["integrity.build-package", ["BI.W-P002", "BI.W-P128"]],
    ["architecture.clean-break", ["BI.W-P002", "BI.W-P126"]],
    ["integrity.release", ["BI.W-P002"]],
    ["constellation.handshake", ["BI.W-P004", "BI.W-P133"]],
    ["constellation.handshake", ["BI.W-P004", "BI.W-P133"]],
    ["constellation.handshake", ["BI.W-P004", "BI.W-P132", "BI.W-P133"]],
    ["integrity.release", ["BI.W-P002", "BI.W-P133"]],
];

const SECONDARY_INVARIANTS = {
    GG010: ["motion.scroll"],
    GG011: ["demo.scenario-contract"],
    GG012: ["demo.gestalt"],
    GG019: ["demo.scenario-contract"],
    GG033: ["design.material-hierarchy"],
    GG037: ["procedural.renderer-parity", "architecture.clean-break"],
    GG038: ["demo.gestalt", "performance.resource-ownership", "design.contrast"],
    GG039: ["integrity.lineage", "procedural.lifecycle"],
    GG040: ["demo.gestalt", "constellation.handshake"],
    GG046: ["constellation.handshake"],
    GG054: ["integrity.entry-graph"],
    GG059: ["procedural.renderer-parity", "demo.gestalt"],
    GG060: ["constellation.handshake", "integrity.lineage"],
};

if (INVARIANT_ROUTES.length !== 60) throw new Error(`expected 60 predicate routes, got ${INVARIANT_ROUTES.length}`);
for (const [invariant, owners] of INVARIANT_ROUTES) {
    if (!invariantIds.has(invariant)) throw new Error(`unknown canonical invariant ${invariant}`);
    for (const owner of owners) if (!waveIds.has(owner)) throw new Error(`unknown canonical wave ${owner}`);
}

const gateRows = gateMarkdown.split("\n")
    .filter((line) => /^\| GG\d{3} /.test(line))
    .map((line) => {
        const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
        const [id, sourceWave, sourceName, sourceState, constructState, sourceCommand, negativeControl, sourceEvidence] = cells;
        return { id, sourceWave, sourceName, sourceState, constructState, sourceCommand, negativeControl, sourceEvidence };
    });
if (gateRows.length !== 60) throw new Error(`expected 60 packet gates, got ${gateRows.length}`);

const gateMapping = gateRows.map((row, index) => {
    const [canonicalInvariant, canonicalWaves] = INVARIANT_ROUTES[index];
    const canonicalEvidence = row.sourceEvidence.replaceAll("`", "");
    const canonicalArgvByWave = canonicalWaves.map((waveId) => ({ waveId, argv: verifierArgv(waveId) }));
    return {
        ...row,
        disposition: "FOLD",
        physicalPerGateScriptDisposition: "REJECT",
        namedRunnableCaseDisposition: "REJECT",
        physicalDispositionRationale: "The predicate and retained NEG survive as typed evidence-plan data owned by an ordinary wave. A dedicated GG script, per-invariant table, or named runnable case would recreate the superfluous identity registry abolished atomically by BI.W-P000 and semantically projected by BI.W-P014.",
        canonicalInvariant,
        secondaryCanonicalInvariants: SECONDARY_INVARIANTS[row.id] ?? [],
        canonicalWaves,
        executableOwner: "scripts/verify.mjs (single state-recovering verifier)",
        canonicalArgv: canonicalArgvByWave[0].argv,
        canonicalArgvByWave,
        evidencePlanBinding: `${GATE_MAP_REL}#rows[id=${row.id}]`,
        adapterContract: row.id === "GG038"
            ? ["npx", "playwright", "test", "-c", "tests-visual/playwright.config.ts", "tests-visual/refraction-live.spec.ts", "--project=chromium-metal-webgpu", "--project=chromium-metal-webgl2", "--project=chromium-material"]
            : row.id === "GG039"
                ? ["native Safari/Metal adapter selected by the cursor evidence plan", "docs/tranches/BI/exec/PREDICATES.v1.json"]
                : ["ordinary tests, live scenarios, or source analysis selected by the cursor", canonicalInvariant, `evidence-plan row ${row.id}`],
        currentFormationExpected: "RED_PREREQUISITES_AND_CONSTRUCT_RED",
        positiveExpectedAtExecution: "PASS_EXIT_0_ONLY_ON_EXACT_CURRENT_SOURCE_AND_COMPLETE_EVIDENCE",
        negativeExpected: "RED_NONZERO_WITH_NAMED_PLANTED_DEFECT",
        restoredExpected: "PASS_EXIT_0_ON_SAME_SOURCE_AFTER_NEG_REMOVAL",
        acceptancePredicate: `Evidence-plan row ${row.id}, owned by ${canonicalWaves.join(" + ")}, retains the packet predicate '${row.sourceName}': the single verifier exits 0 for each owner only when the predicate is true on the exact declared source/scope; it must exit nonzero and name the defect for every retained source NEG (${row.negativeControl}); restoring the defect reruns green without changing the row contract.`,
        evidenceContract: {
            path: canonicalEvidence,
            binds: ["predicateRowId", "canonicalInvariant", "ownerWave", "sourceSha", "scopeHash", "predicateHash", "argv", "positiveExit", "negativeExit", "namedFailure", "restoreExit", "artifactHashes"],
        },
    };
});

const componentOwners = COMPONENT_CONCEPTS.map((component, index) => ({
    ...component,
    wave: `BI.W-P${String(63 + index).padStart(3, "0")}`,
    needles: uniq([
        component.name.toLowerCase(),
        component.name.replaceAll("-", "").toLowerCase(),
        component.pascal.toLowerCase(),
    ]).sort((a, b) => b.length - a.length),
})).sort((a, b) => Math.max(...b.needles.map((n) => n.length)) - Math.max(...a.needles.map((n) => n.length)));

const routeSource = (row) => {
    const text = `${row.sourceSet} ${row.sourceKey} ${row.sourceClaim} ${row.targetUnit}`.toLowerCase();
    const bank = /bi\.w-ask-|outbox:|cross-repo asks|prompts \+ cross-repo/.test(text);
    if (bank) {
        const repo = /sci-report/.test(text) ? "sci-report"
            : /slides/.test(text) ? "slides"
                : /speedtest/.test(text) ? "speedtest"
                    : /words/.test(text) ? "words"
                        : /bbnf/.test(text) ? "bbnf-buddy"
                            : "named-consumer-owner";
        return {
            disposition: "BANK",
            waves: ["BI.W-P004"],
            invariant: "constellation.handshake",
            rationale: "The row requires a foreign-owner action or ACK; Glass remains read-only toward that repository and cannot count a booked ask as adoption.",
            custodian: `custodian:${repo}`,
            retrigger: `after BI.W-P002 emits the exact candidate tarball/patch packet, ${repo} owner returns an immutable ACK for that digest`,
        };
    }

    if (/g\.w9 refraction|refraction|refract|native safari|metal device/.test(text)) {
        return {
            disposition: "ACCEPT",
            waves: ["BI.W-P132"],
            invariant: "procedural.renderer-parity",
            rationale: "This is a unique live-product obligation exposed by the packet and independently confirmed at current HEAD; BI.W-P132 owns it from first principles.",
        };
    }

    const component = componentOwners.find((candidate) => candidate.needles.some((needle) => needle.length >= 4 && text.includes(needle)));
    if (component) {
        return {
            disposition: "FOLD",
            waves: [component.wave],
            invariant: waveById.get(component.wave).invariantFamilies[0],
            rationale: `The claim belongs to the ${component.pascal} concept and folds into its one-concept apotheosis rather than retaining a historical wave identity.`,
        };
    }

    const routes = [
        [/border.?progress/, ["BI.W-P085", "BI.W-P111"], "behavior.feedback"],
        [/completion.?seal/, ["BI.W-P123"], "behavior.feedback"],
        [/scroll.?rim|scroll.?progress|overflow.?fade/, ["BI.W-P111", "BI.W-P030"], "motion.scroll"],
        [/coalescemetric|metric.?pill|metric/, ["BI.W-P117"], "behavior.data"],
        [/sortable/, ["BI.W-P007"], "behavior.selection"],
        [/flatten|flat.?family|dts generation/, ["BI.W-P008", "BI.W-P010"], "architecture.component-topology"],
        [/subpath|export.?kind|entry.?map|api.?atlas|root.?barrel|symbol rehome|types.?dissolve/, ["BI.W-P010", "BI.W-P128"], "integrity.entry-graph"],
        [/utils|shared.?atomic/, ["BI.W-P006"], "architecture.component-topology"],
        [/css.?colocat|cascade/, ["BI.W-P011"], "architecture.component-topology"],
        [/demo|story|specimen|hero|live.?tiles|substrate.?index/, ["BI.W-P012", "BI.W-P057", "BI.W-P061"], "demo.scenario-contract"],
        [/claude|readme|\bcanon\b|\bdocs?\b|documentation|doc.?canon|migration/, ["BI.W-P129"], "architecture.present-tense-source"],
        [/gate|proof.?structure|block.?disjoint|fold.?census/, ["BI.W-P014"], "integrity.dag"],
        [/dock.*(?:rail|reserved)|(?:rail.?fidelity|rail.?realize).*dock/, ["BI.W-P039"], "behavior.dock"],
        [/dock.*(?:icon|now.?playing)|(?:icon.?presence|icon visibility).*dock/, ["BI.W-P040"], "behavior.dock"],
        [/dock.*(?:fission|filament|metaball.?bridge|liquid.?morph|goo.?split|jubilance|neck)|(?:fission|filament|metaball.?bridge|liquid.?morph|goo.?split|jubilance|neck).*dock/, ["BI.W-P041"], "behavior.dock"],
        [/dock.*(?:orientation|vh.?compose|crossfade)|(?:orientation|vh.?compose|crossfade).*dock/, ["BI.W-P036", "BI.W-P041"], "behavior.dock"],
        [/dock.*(?:layer|silhouette|luma|backdrop)|(?:layer|silhouette|luma|backdrop).*dock/, ["BI.W-P035", "BI.W-P037"], "behavior.dock"],
        [/dock.*(?:integrate|fold|spine|tier|facet)|(?:integrate|fold|spine|tier|facet).*dock/, ["BI.W-P033", "BI.W-P034"], "behavior.dock"],
        [/dock.?retires|booked marker.*dock/, ["BI.W-P126"], "architecture.clean-break"],
        [/dock.?spring|dock.?morph|dock.?crossfade|fisheye/, ["BI.W-P041", "BI.W-P036"], "behavior.dock"],
        [/dock.?overflow|dock.?scroll|dock.?cap/, ["BI.W-P038", "BI.W-P039"], "behavior.dock"],
        [/dock.?control|dock.?device|dock.?escape/, ["BI.W-P040", "BI.W-P037"], "behavior.dock"],
        [/dock/, ["BI.W-P033", "BI.W-P034", "BI.W-P035", "BI.W-P042"], "behavior.dock"],
        [/aurora/, ["BI.W-P046"], "procedural.renderer-parity"],
        [/blob|goo/, ["BI.W-P047"], "procedural.renderer-parity"],
        [/constellation/, ["BI.W-P048"], "procedural.renderer-parity"],
        [/fourier/, ["BI.W-P049"], "procedural.renderer-parity"],
        [/liquid.?grid|paper.?grid|field.?core/, ["BI.W-P050"], "procedural.renderer-parity"],
        [/spring|motion.?curve|tempo|keyframes/, ["BI.W-P023", "BI.W-P026"], "motion.spring-language"],
        [/flip|morph|drag.?reattach/, ["BI.W-P028", "BI.W-P032"], "motion.transition-continuity"],
        [/enter.?exit|view.?transition|draw.?in/, ["BI.W-P029"], "motion.transition-continuity"],
        [/glass|blur|grain|radius|shadow|metal.?rim|affordance/, ["BI.W-P015", "BI.W-P016", "BI.W-P017", "BI.W-P018"], "design.material-hierarchy"],
        [/census|structure/, ["BI.W-P005", "BI.W-P013"], "architecture.component-topology"],
    ];
    for (const [pattern, waves, invariant] of routes) {
        if (pattern.test(text)) return { disposition: "FOLD", waves, invariant, rationale: "The historical action folds into the current semantic owner and receives no independent wave or completion credit." };
    }

    const defaults = {
        "G.W1": [row.terminalDisposition === "RETIRE" ? "BI.W-P126" : "BI.W-P013", "integrity.lineage"],
        "G.W2": ["BI.W-P061", "demo.scenario-contract"],
        "G.W3": ["BI.W-P126", "architecture.clean-break"],
        "G.W4": ["BI.W-P005", "architecture.component-topology"],
        "G.W5": ["BI.W-P006", "architecture.component-topology"],
        "G.W6": ["BI.W-P008", "architecture.component-topology"],
        "G.W7": ["BI.W-P010", "integrity.entry-graph"],
        "G.W8": ["BI.W-P129", "architecture.present-tense-source"],
        "G.W9": ["BI.W-P061", "integrity.lineage"],
    };
    const [owner, invariant] = defaults[row.targetWave] ?? ["BI.W-P133", "integrity.dag"];
    return { disposition: "FOLD", waves: [owner], invariant, rationale: "The row folds into the canonical projection owner selected by its packet target and terminal semantics." };
};

const sourceMappings = sourceLedger.rows.map((row) => {
    const route = routeSource(row);
    for (const owner of route.waves) if (!waveIds.has(owner)) throw new Error(`${row.atomicActionId} maps to unknown wave ${owner}`);
    if (!invariantIds.has(route.invariant)) throw new Error(`${row.atomicActionId} maps to unknown invariant ${route.invariant}`);
    const canonicalArgvByWave = route.waves.map((waveId) => ({ waveId, argv: verifierArgv(waveId) }));
    return {
        atomicActionId: row.atomicActionId,
        sourceSet: row.sourceSet,
        sourceKey: row.sourceKey,
        sourceJsonPathOrLine: row.sourceJsonPathOrLine,
        sourcePayloadHash: row.sourcePayloadHash,
        sourceClaim: row.sourceClaim,
        sourceState: row.sourceState,
        packetTerminalDisposition: row.terminalDisposition,
        packetTargetWave: row.targetWave,
        packetTargetUnit: row.targetUnit,
        packetGateId: row.gateId,
        targetPathManifestId: row.targetPathManifestId,
        visualClaim: row.visualClaim,
        producerDisposition: route.disposition,
        canonicalWaves: route.waves,
        canonicalInvariant: route.invariant,
        authoritySource: route.disposition === "BANK" ? "FOREIGN_OWNER_ONLY" : "PERFECTED_BI_USER_ORDER__NOT_SCI_P4_EXPANSION",
        pDerivedScopeState: "UNMATERIALIZED_UNTIL_BI.W-P133_G.W0",
        pDerivedWriteRule: "only ATLAS_DIRECT or REQUIRED_CLOSURE after P.W0 + GLASS-OUTBOX-ACK and all four external prerequisites; OUT_OF_SCOPE_BANKED grants no write or P close credit",
        globalBiCreditRule: "canonical BI work may proceed only under the independent user order; its completion never backfills P scope or ACK credit",
        rationale: route.rationale,
        custodian: route.custodian ?? "custodian:glass-ui-perfect-bi",
        retrigger: route.retrigger ?? `execute ${route.waves.join(" + ")} only when its DAG predecessors are DONE and the single verifier proves every applicable property`,
        acceptancePredicate: `${route.waves.join(" + ")} is terminal DONE on the exact source only when the ${route.invariant} property and evidence-plan row ${row.atomicActionId} prove the semantic claim '${row.sourceClaim}' with source payload ${row.sourcePayloadHash}; the row is in the P write projection only after exact G.W0 three-way classification, and stale/prose-only evidence, a missing row, or a banked write is RED.`,
        executableOwner: "scripts/verify.mjs (single state-recovering verifier)",
        canonicalArgv: canonicalArgvByWave[0].argv,
        canonicalArgvByWave,
        evidencePlanBinding: `${SOURCE_MAP_REL}#rows[atomicActionId=${row.atomicActionId}]`,
        expectedBehavior: {
            currentFormation: "RED_UNTIL_SCOPE_CLASSIFIED_AND_OWNER_WAVE_TERMINAL",
            positive: "PASS_EXIT_0_ON_EXACT_CURRENT_SOURCE_AND_COMPLETE_ROW_EVIDENCE",
            negative: `RED_NONZERO_WITH_NAMED_DEFECT_FROM_PACKET_CASE_${row.gateId}`,
            restore: "PASS_EXIT_0_WITH_UNCHANGED_CASE_CONTRACT",
        },
        retainedEvidence: {
            piObligations: row.piObligations,
            deltaObligations: row.deltaObligations,
            visualEvidenceOwners: row.visualEvidenceOwners,
        },
    };
});

if (sourceMappings.length !== 512) throw new Error(`expected 512 source mappings, got ${sourceMappings.length}`);
if (new Set(sourceMappings.map((row) => row.atomicActionId)).size !== 512) throw new Error("source action IDs are not unique");

const targetMappings = targetManifest.entries.map((entry) => ({
    ...entry,
    producerDisposition: "ACCEPT",
    canonicalWave: "BI.W-P133",
    authorityState: "FORMULATION_CONTRACT_ONLY__FILES_UNMATERIALIZED",
    acceptancePredicate: `${entry.manifestId} may materialize only at ${entry.artifactPath} after G.W0 recomputes the current closure; it must contain exactly ${entry.expectedSourceRowCount} joined source rows, exact regular-file paths/actions/preimages, one write owner per writable path, no broad path, no mixed banked write, and no path outside ATLAS_DIRECT or REQUIRED_CLOSURE.`,
}));
if (targetMappings.length !== 36) throw new Error(`expected 36 target manifest contracts, got ${targetMappings.length}`);

const scopeMappings = scope.directImports.map((row) => ({
    ...row,
    producerDisposition: "ACCEPT",
    canonicalWave: "BI.W-P133",
    authorityState: "CAPTURED_KEY_ACCEPTED_FOR_CURRENT_HEAD_REFRESH__NOT_CURRENTNESS_PROOF",
    writeAuthorityGranted: false,
    acceptancePredicate: `${row.importId} is accepted as a required G.W0 census key only: BI.W-P133 must reparse ${row.receiverPath}, verify current receiver bytes and the exact ${row.moduleSpecifier} clause/symbol kinds, and either reproduce this identity or emit a keyed drift finding before closure. Capture acceptance never authorizes an Atlas write or proves the import still exists.`,
}));
if (scopeMappings.length !== 62) throw new Error(`expected 62 direct-import scope rows, got ${scopeMappings.length}`);
if (new Set(scopeMappings.map((row) => row.importId)).size !== 62) throw new Error("scope import IDs are not unique");

const waveMapping = Object.entries(GW_ROUTES).map(([sourceWave, canonicalWaves]) => ({
    sourceWave,
    producerDisposition: "FOLD",
    canonicalWaves,
    topologyRule: "The packet's semantic order and bilateral handshake are preserved, but no serial edge or ceremonial tail is retained unless a data/invariant dependency requires it in BI's transitive-reduced DAG.",
    acceptancePredicate: `Every ${sourceWave} source row is allocated exactly once in ${SOURCE_MAP_REL}; each canonical wave reaches DONE with its applicable properties and current-source evidence through the one verifier, while P-derived completion is the exact ATLAS_DIRECT + REQUIRED_CLOSURE projection only.`,
}));

const sourceCounts = Object.groupBy(sourceMappings, (row) => row.producerDisposition);
const gateCounts = Object.groupBy(gateMapping, (row) => row.disposition);
const packetScopeDigest = scope.baselineCardinality.directImportDigest;
const glassHead = command(GLASS, "git", "rev-parse", "HEAD");
const glassStatus = execFileSync("git", ["status", "--porcelain=v1", "-z"], { cwd: GLASS });
const atlasHead = command(ATLAS, "git", "rev-parse", "HEAD");
const atlasBranch = command(ATLAS, "git", "branch", "--show-current");
const atlasStatus = execFileSync("git", ["status", "--porcelain=v1", "-z"], { cwd: ATLAS });
const preceptsHead = command(PRECEPTS, "git", "rev-parse", "HEAD");
const preceptsStatus = execFileSync("git", ["status", "--porcelain=v1", "-z"], { cwd: PRECEPTS });

mkdirSync(OUT, { recursive: true });
const writeJson = (name, value) => writeFileSync(join(OUT, name), `${JSON.stringify(value, null, 2)}\n`);

writeJson("SCI-P4-source-row-mapping.json", {
    schemaVersion: "1.0.0",
    messageId: MESSAGE_ID,
    packetDigest,
    rowCount: sourceMappings.length,
    dispositionCounts: Object.fromEntries(Object.entries(sourceCounts).map(([key, rows]) => [key, rows.length])),
    rows: sourceMappings,
});
writeJson("SCI-P4-gate-mapping.json", {
    schemaVersion: "1.0.0",
    messageId: MESSAGE_ID,
    packetDigest,
    descriptiveInvariantCount: INVARIANTS.length,
    invariantCountNormative: false,
    executableIdentityCountCreated: 0,
    sourceGateCount: gateMapping.length,
    rule: "Predicate FOLD does not retain the source physical script identity or create a named runnable case. Every row is data in an auto-recovered evidence plan executed through one verifier and retains its own negative/evidence contract.",
    rows: gateMapping,
});
writeJson("SCI-P4-target-path-mapping.json", {
    schemaVersion: "1.0.0",
    messageId: MESSAGE_ID,
    packetDigest,
    contractCount: targetMappings.length,
    rows: targetMappings,
});
writeJson("SCI-P4-scope-row-mapping.json", {
    schemaVersion: "1.0.0",
    messageId: MESSAGE_ID,
    packetDigest,
    directImportSemanticDigest: packetScopeDigest,
    rowCount: scopeMappings.length,
    rows: scopeMappings,
});

const mapHashes = {
    sourceRowMappingSha256: fileSha(join(OUT, "SCI-P4-source-row-mapping.json")),
    gateMappingSha256: fileSha(join(OUT, "SCI-P4-gate-mapping.json")),
    scopeRowMappingSha256: fileSha(join(OUT, "SCI-P4-scope-row-mapping.json")),
    targetPathMappingSha256: fileSha(join(OUT, "SCI-P4-target-path-mapping.json")),
};

const ack = {
    schemaVersion: "1.0.0",
    messageId: MESSAGE_ID,
    status: "FORMULATION_ONLY",
    executionAuthorized: false,
    producerAuthorityPath: "docs/tranches/BI/FORMATION/waves.registry.mjs#BI.W-P133",
    returnChannelArtifact: ACK_REL,
    packet: {
        rootReadOnly: PACKET,
        fileCount: packetFileCount,
        ingestedDigestAlgorithm: "sha256(concat(bytewise-sorted(relativePath + NUL + sha256(file-bytes)-hex + LF)))",
        ingestedPacketDigestSha256: packetDigest,
        senderProsePacketDigestSha256: "c1ccbb72c8a5662631acc56f6c89aa4ef7a032b5403498b43ae0e95a7de32e6b",
        senderFrozenContentDigestSha256: "be98bb297efe70daccf19f18fb134f12fd145a4271ee39408ac70ff749b4f26e",
        proseDigestTrusted: false,
    },
    bases: {
        glass: { head: glassHead, formationSourceBase: SOURCE_BASE, dirtyPathDigestSha256: sha(glassStatus), dirtAllowedOnly: "docs/tranches/BI/FORMATION/" },
        atlas: { repo: ATLAS, branch: atlasBranch, head: atlasHead, dirtyPathDigestSha256: sha(atlasStatus), mutationByGlass: "FORBIDDEN" },
        packetCapturedAtlasHead: scope.observedSnapshots.atlas.head,
        packetCapturedGlassFreezeHead: scope.observedSnapshots.glassAtFreezeObservation.head,
    },
    scope: {
        rawScopeFileSha256: fileSha(scopePath),
        directImportSemanticDigest: packetScopeDigest,
        baselineCardinality: scope.baselineCardinality,
        closureState: "CONSTRUCT_RED_UNTIL_BI.W-P133_G.W0",
        acceptedWriteClasses: ["ATLAS_DIRECT", "REQUIRED_CLOSURE"],
        rejectedWriteClasses: ["OUT_OF_SCOPE_BANKED", "UNCLASSIFIED", "MIXED_SCOPE"],
        targetPathContracts: { disposition: "ACCEPT", count: targetMappings.length, mapping: TARGET_MAP_REL },
        keyedDirectImportRows: { disposition: "ACCEPT_FOR_REFRESH", count: scopeMappings.length, mapping: SCOPE_MAP_REL, writeAuthorityGranted: false },
    },
    rootPrecepts: {
        repo: PRECEPTS,
        head: preceptsHead,
        dirtyPathDigestSha256: sha(preceptsStatus),
        trancheFormulationSha256: fileSha(join(PRECEPTS, "instructions/TRANCHE-FORMULATION.md")),
        designIterationSha256: fileSha(join(PRECEPTS, "instructions/DESIGN-ITERATION.md")),
        authority: "EXTERNAL_ROOT_READ_ONLY__docs/precepts_is_not_authority",
    },
    prerequisites: {
        "FORMULATION-SEAL": "RED",
        "ENV-DSYNC": "RED",
        "CORPUS-100": "RED",
        "P-EXECUTION-AUTHORIZATION": "RED",
        "P.W0": "RED",
        "GLASS-OUTBOX-ACK": "GREEN_BY_THIS_FORMULATION_ARTIFACT_ONLY",
        sourceExecutionFormula: "P.W0 + GLASS-OUTBOX-ACK + FORMULATION-SEAL + ENV-DSYNC + CORPUS-100 + P-EXECUTION-AUTHORIZATION -> BI.W-P133/G.W0",
    },
    designSync: {
        preP0Review: "REQUIRED_AND_CURRENTLY_RED",
        testedSourceRefresh: "SEPARATELY_REQUIRED_AT_BI.W-P132/GG040_EQUIVALENT_AND_CURRENTLY_RED",
        substitutionAllowed: false,
    },
    authoritySeparation: {
        pPacket: "consumer-derived Atlas subset only",
        globalPerfectedBi: "separately authorized by the current user and never credited to P merely because a source row folds into a BI wave",
        fullGlassAuditPacketRow: { disposition: "BANK", custodian: "custodian:glass-full-audit", retrigger: "a separately authorized dedicated session", note: "the present global formation is that independent authority, but this P row remains BANK and supplies no execution scope or completion credit" },
    },
    rowMappings: {
        sourceRows: { count: sourceMappings.length, path: SOURCE_MAP_REL, ...mapHashes },
        scopeRows: { count: scopeMappings.length, path: SCOPE_MAP_REL, sha256: mapHashes.scopeRowMappingSha256 },
        gateRows: { count: gateMapping.length, dispositionCounts: Object.fromEntries(Object.entries(gateCounts).map(([key, rows]) => [key, rows.length])), path: GATE_MAP_REL },
        targetPathRows: { count: targetMappings.length, path: TARGET_MAP_REL },
        waveRows: waveMapping,
    },
    requiredHandshake: ["P.W0 + GLASS-OUTBOX-ACK", "BI.W-P133/G.W0 allocation", "canonical product owners including BI.W-P132", "candidate projection", "P.W12 candidate/patch ACK", "battery/two-clean", "tag-CI publish", "registry packet", "P.W13 registry/runtime ACK", "Atlas-surface FINAL", "P.W14 join"],
    preservedNegativeControls: {
        count: gateMapping.length,
        rule: "each source GG negative is copied verbatim into its evidence-plan row and must fail nonzero with a named defect before restored PASS; no row becomes a runnable case or command identity",
        mapping: GATE_MAP_REL,
    },
    unresolvedCollisions: [
        { collision: "60 proposed GG scripts versus one canonical verifier and a non-normative invariant vocabulary", disposition: "FOLD predicates into typed evidence-plan rows; REJECT all sixty physical scripts, named cases, aliases, and per-invariant tables", resolutionOwner: "BI.W-P014", state: "FORMED_NOT_EXECUTED" },
        { collision: "serial G.W0-G.W14 topology versus BI minimal DAG", disposition: "FOLD semantics and preserve bilateral order; REJECT non-causal serial barriers and ceremonial tail work", resolutionOwner: "BI.W-P133/BI.W-P002", state: "FORMED_NOT_EXECUTED" },
        { collision: "P subset authority versus independently authorized global BI", disposition: "separate authority and credit on every source mapping; P writes only fixed-point direct/required closure", resolutionOwner: "BI.W-P133", state: "G.W0_CONSTRUCT_RED" },
        { collision: "packet-captured Atlas/Glass SHAs versus current repositories", disposition: "bind this ACK to current heads and require G.W0 recomputation; archaeology SHAs never execute", resolutionOwner: "BI.W-P133", state: "REFRESH_RED" },
        { collision: "orphan shaders/CSS garnish versus declared live refraction", disposition: "ACCEPT unique product contract into BI.W-P132; no source credit until live reachability and device matrix pass", resolutionOwner: "BI.W-P132", state: "PRODUCT_RED" },
        { collision: "two DesignSync phases", disposition: "retain both as non-substitutable obligations", resolutionOwner: "BI.W-P133 + BI.W-P132", state: "ENV_DSYNC_RED" },
    ],
    noSilentDropAssertion: {
        sourceActionIdsUnique: new Set(sourceMappings.map((row) => row.atomicActionId)).size === 512,
        sourceActionCount: sourceMappings.length,
        sourceActionExpected: sourceLedger.rowCount,
        sourceGateCount: gateMapping.length,
        targetPathContractCount: targetMappings.length,
        directImportScopeRowCount: scopeMappings.length,
        sourceWaveCount: waveMapping.length,
    },
};

writeJson(`${MESSAGE_ID}-ACK.json`, ack);

const table = (headers, rows) => [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.join(" | ")} |`),
].join("\n");

const md = `# ${MESSAGE_ID} — producer ACK\n\n` +
`**Status:** FORMULATION-ONLY — source execution is not authorized.\n` +
`**Ingested packet:** \`${packetDigest}\` over ${packetFileCount} files using the path-NUL-file-hash-LF algorithm.\n` +
`**Glass base:** \`${glassHead}\`.\n` +
`**Atlas current base:** \`${atlasHead}\` on \`${atlasBranch}\`.\n` +
`**Scope:** raw \`${fileSha(scopePath)}\`; semantic \`${packetScopeDigest}\`; 62 clauses / 36 files / 27 specifiers.\n` +
`**Producer authority:** \`BI.W-P133\` in \`docs/tranches/BI/FORMATION/waves.registry.mjs\`.\n\n` +
`The sender's prose digests are recorded but not trusted as the ingested digest. The current packet is byte-bound above. Atlas was read only and remains under its existing owner state.\n\n` +
`## Authority and execution state\n\n` +
`This ACK allocates the packet; it does not authorize a Glass source wave. FORMULATION-SEAL, ENV-DSYNC, CORPUS-100, P-EXECUTION-AUTHORIZATION, and P.W0 remain RED. G.W0 is transposed to BI.W-P133 and opens only after the complete prerequisite formula in the JSON ACK. The pre-P.W0 DesignSync review and testedSourceSha refresh remain distinct and non-substitutable.\n\n` +
`P's full-Glass-audit row remains BANKED to \`custodian:glass-full-audit\`. The current PERFECTED-BI formation proceeds only under the user's independent global authority; no such work is back-credited to P or used to widen its closure.\n\n` +
`## G.W transposition\n\n` + table(["P proposal", "Disposition", "Canonical BI owners"], waveMapping.map((row) => [row.sourceWave, row.producerDisposition, row.canonicalWaves.join(", ")])) + `\n\n` +
`## GG transposition\n\n` + table(["GG", "Predicate", "Disposition", "Descriptive invariant", "Canonical BI owners"], gateMapping.map((row) => [row.id, row.sourceName, row.disposition, row.canonicalInvariant, row.canonicalWaves.join(", ")])) + `\n\n` +
`All sixty proposed physical GG scripts and named runnable cases are rejected as redundant identities. All sixty predicates and verbatim negative controls survive as typed evidence-plan rows owned by ordinary BI waves and executed through the single state-recovering verifier. Exact canonical argv, source argv, expected RED/PASS behavior, retained NEG, adapter, and evidence fields are in [SCI-P4-gate-mapping.json](./SCI-P4-gate-mapping.json).\n\n` +
`## Row-by-row allocations\n\n` +
`- 512 source actions: [SCI-P4-source-row-mapping.json](./SCI-P4-source-row-mapping.json) (sha256 \`${mapHashes.sourceRowMappingSha256}\`).\n` +
`- 62 keyed direct-import rows: [SCI-P4-scope-row-mapping.json](./SCI-P4-scope-row-mapping.json) (sha256 \`${mapHashes.scopeRowMappingSha256}\`).\n` +
`- 60 GG predicates: [SCI-P4-gate-mapping.json](./SCI-P4-gate-mapping.json) (sha256 \`${mapHashes.gateMappingSha256}\`).\n` +
`- 36 target-path contracts: [SCI-P4-target-path-mapping.json](./SCI-P4-target-path-mapping.json) (sha256 \`${mapHashes.targetPathMappingSha256}\`).\n\n` +
`Every source action preserves its packet identity/payload hash, canonical owner/invariant, exact acceptance predicate, P-derived scope rule, independent-global-authority rule, custodian, retrigger, and π/DELTA obligations. Every target-path contract is ACCEPTED as an unmaterialized G.W0 contract only; it grants no broad or current write.\n\n` +
`## Principal collisions\n\n` +
ack.unresolvedCollisions.map((row) => `- **${row.collision}:** ${row.disposition} Owner: ${row.resolutionOwner}. State: ${row.state}.`).join("\n") + `\n\n` +
`## Return channel\n\n` +
`sci-report P should consume the immutable producer artifact at \`${ACK_REL}\` and verify its three mapping hashes. Receipt is not execution authorization.\n`;

writeFileSync(join(OUT, `${MESSAGE_ID}-ACK.md`), md);

console.log(JSON.stringify({
    ok: true,
    messageId: MESSAGE_ID,
    status: ack.status,
    packetDigest,
    sourceRows: sourceMappings.length,
    gateRows: gateMapping.length,
    targetRows: targetMappings.length,
    sourceDispositions: Object.fromEntries(Object.entries(sourceCounts).map(([key, rows]) => [key, rows.length])),
    outputs: [ACK_REL, GATE_MAP_REL, SOURCE_MAP_REL, SCOPE_MAP_REL, TARGET_MAP_REL],
}, null, 2));
