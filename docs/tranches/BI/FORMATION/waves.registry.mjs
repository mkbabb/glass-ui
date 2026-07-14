import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { INVARIANTS } from "./invariants.registry.mjs";

export const SOURCE_BASE = "26c5ae686fd0f1181083aebda1215b00524555f1";
export const FORMATION_SCHEMA = 1;
export const RECEIPT_PAYLOAD_DIGEST_POLICY = "canonical stage-0 index of terminal builder, product, and evidence payload paths, excluding every current integration adjunct path: the terminal receipt, docs/tranches/BI/RELEASE-ATTESTATION.json, and docs/tranches/BI/FINAL.md";
export const INTENDED_TRAILER_CONTRACT = Object.freeze({
    coreNames: ["BI-Wave", "BI-Status", "BI-Receipt-SHA256", "BI-Formation-SHA256"],
    projectionNamesFromP002: ["BI-Attestation-SHA256", "BI-FINAL-SHA256"],
    embeddedValueNames: ["BI-Wave", "BI-Status", "BI-Formation-SHA256"],
    externallyDerivedValues: {
        "BI-Receipt-SHA256": "sha256 of the final raw receipt bytes, derived after receipt serialization",
        "BI-Attestation-SHA256": "sha256 of the final raw attestation bytes, derived after receipt serialization and attestation rendering",
        "BI-FINAL-SHA256": "sha256 of the final raw FINAL bytes, derived after attestation rendering and FINAL rendering",
    },
    forbiddenReceiptValues: ["BI-Receipt-SHA256", "BI-Attestation-SHA256", "BI-FINAL-SHA256"],
    commitMessageOwner: "orchestrator adds every externally derived raw-byte digest only after the acyclic R then A then F render sequence",
});
export const P002_ACTIVATION_PREREQUISITE = Object.freeze({
    waveId: "BI.W-P002",
    requiredStatus: "DONE",
    requiredProjectionMode: "ACTIVATE",
    requiredReceipt: "unique first-parent P002 terminal receipt with matching BI-Wave, BI-Status, BI-Formation-SHA256, and BI-Receipt-SHA256 trailers",
    requiredArtifacts: [
        "docs/tranches/BI/RELEASE-ATTESTATION.json exists and its raw-byte sha256 matches BI-Attestation-SHA256",
        "docs/tranches/BI/FINAL.md exists, names the attestation sha256, and its raw-byte sha256 matches BI-FINAL-SHA256",
    ],
    failure: "P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage",
});

const ROOT = new URL("../../../..", import.meta.url).pathname.replace(/\/$/, "");
const git = (...args) => execFileSync("git", ["-C", ROOT, ...args], { encoding: "utf8", maxBuffer: 128 * 1024 * 1024 });

const treeRows = git("ls-tree", "-r", SOURCE_BASE).trim().split("\n").filter(Boolean).map((line) => {
    const match = /^(\d+)\s+(\w+)\s+([0-9a-f]+)\t(.+)$/.exec(line);
    if (!match) throw new Error(`cannot parse git tree row: ${line}`);
    return { mode: match[1], type: match[2], oid: match[3], path: match[4] };
});

const BY_PATH = new Map(treeRows.map((row) => [row.path, row]));
const INVARIANT_IDS = new Set(INVARIANTS.map((row) => row.id));

const uniq = (xs) => [...new Set(xs)].sort();
const current = (path, action = "modify") => {
    const row = BY_PATH.get(path);
    if (!row) throw new Error(`declared current path absent at ${SOURCE_BASE}: ${path}`);
    return { path, action, before: row.oid };
};
const future = (path, action = "create") => ({ path, action, before: null });
const tree = (prefix, action = "modify") => treeRows
    .filter((row) => row.path === prefix || row.path.startsWith(`${prefix}/`))
    .map((row) => ({ path: row.path, action, before: row.oid }));
const renameTree = (prefix, targetPrefix) => tree(prefix, "rename").map((row) => ({
    ...row,
    targetPath: `${targetPrefix}${row.path.slice(prefix.length)}`,
}));
const paths = (prefix) => treeRows.filter((row) => row.path === prefix || row.path.startsWith(`${prefix}/`)).map((row) => row.path);
const existing = (...candidates) => candidates.filter((path) => BY_PATH.has(path));
const stripTreePrefix = (path) => path.startsWith(`${SOURCE_BASE}:`) ? path.slice(SOURCE_BASE.length + 1) : path;
const grepPaths = (pattern, scopes = ["src", "demo", "tests", "tests-visual", "scripts"]) => {
    let output = "";
    try {
        output = git("grep", "-l", "-E", "-e", pattern, SOURCE_BASE, "--", ...scopes);
    } catch (error) {
        if (error.status !== 1) throw error;
    }
    return uniq(output.trim().split("\n").filter(Boolean).map(stripTreePrefix));
};

const componentRoot = (tier, name) => `src/components/${tier}/${name}`;
const flatComponentPath = (path) => path.replace(/^src\/components\/(?:ui|custom)\//, "src/components/");
const flatTree = (tier, name, action = "modify") => tree(componentRoot(tier, name)).map((row) => ({
    path: flatComponentPath(row.path),
    action,
    before: null,
    producedBy: "BI.W-P008",
    sourceBasePath: row.path,
    sourceBaseOid: row.before,
}));
const flatCurrent = (tier, name, relativePath, action = "modify") => {
    const sourceBasePath = `${componentRoot(tier, name)}/${relativePath}`;
    const row = BY_PATH.get(sourceBasePath);
    if (!row) throw new Error(`declared current component path absent at ${SOURCE_BASE}: ${sourceBasePath}`);
    return {
        path: flatComponentPath(sourceBasePath),
        action,
        before: null,
        producedBy: "BI.W-P008",
        sourceBasePath,
        sourceBaseOid: row.oid,
    };
};

const componentRefs = (name, pascal) => {
    const derivedPascal = name.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join("");
    const escape = (term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const escapedName = escape(name);
    const tags = uniq([pascal, derivedPascal]).map(escape).join("|");
    const pattern = [
        `components/(ui|custom)/${escapedName}(/|["'])`,
        `@mkbabb/glass-ui/${escapedName}([/"']|$)`,
        `<(${tags})([[:space:]>/:]|$)`,
        `</(${tags})>`,
        `import[[:space:]].*\\b(${tags})\\b.*from[[:space:]]*["']@mkbabb/glass-ui["']`,
    ].join("|");
    let output = "";
    try {
        output = git("grep", "-l", "-E", pattern, SOURCE_BASE, "--", "demo", "tests", "tests-visual");
    } catch (error) {
        if (error.status !== 1) throw error;
    }
    return uniq(output.trim().split("\n").filter(Boolean).map(stripTreePrefix));
};

const evidencePath = (id) => `docs/tranches/BI/evidence/${id}`;

const repair = ({ imports = [], tests = [], verification = [], build = [], docs = [] } = {}) => ({
    imports: uniq(imports),
    tests: uniq(tests),
    verification: uniq(verification),
    build: uniq(build),
    docs: uniq(docs),
});

const piNone = (reason) => ({ kind: "device-free", reason });
const piBrowser = (scenarios, observables) => ({
    kind: "browser",
    browsers: ["Safari-current", "Chrome-current"],
    modes: ["wide-fine", "narrow-coarse", "prefers-reduced-motion"],
    scenarios,
    observables,
    freshness: "terminal wave commit",
    evidence: "tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review",
});

const wave = ({
    id,
    title,
    band,
    intent,
    scope,
    subjects,
    repairs = repair(),
    invariant,
    bite,
    invariants,
    pi,
    deps = [],
    locks = [],
    archaeology = [],
    terminal = "DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.",
}) => {
    if (!/^BI\.W-P\d{3}$/.test(id)) throw new Error(`bad wave id ${id}`);
    if (!Array.isArray(scope) || scope.length === 0) throw new Error(`${id} has no scope`);
    if (!Array.isArray(subjects) || subjects.length === 0) throw new Error(`${id} has no subjects`);
    if (!Array.isArray(invariants) || invariants.length === 0) throw new Error(`${id} has no invariant families`);
    for (const invariantId of invariants) if (!INVARIANT_IDS.has(invariantId)) throw new Error(`${id} names unknown invariant ${invariantId}`);
    const sequence = Number(id.slice(-3));
    const receiptPath = id === "BI.W-P000"
        ? "docs/tranches/BI/BOOTSTRAP.json"
        : `${evidencePath(id)}/receipt.json`;
    const integrationArtifacts = [
        {
            path: receiptPath,
            action: "create",
            role: "terminal-receipt",
            commitLocator: "resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers",
            payloadDigestPolicy: RECEIPT_PAYLOAD_DIGEST_POLICY,
            intendedTrailerContract: INTENDED_TRAILER_CONTRACT,
        },
        ...(sequence >= 2 ? [
            {
                path: "docs/tranches/BI/RELEASE-ATTESTATION.json",
                action: sequence === 2 ? "create" : "modify",
                role: "continuous-release-attestation",
                producedBy: sequence === 2 ? undefined : "BI.W-P002",
                digestPolicy: "canonical stage-0 index over every tracked path except RELEASE-ATTESTATION.json and FINAL.md; includes the current receipt",
            },
            {
                path: "docs/tranches/BI/FINAL.md",
                action: sequence === 2 ? "create" : "modify",
                role: "continuous-final-projection",
                producedBy: sequence === 2 ? undefined : "BI.W-P002",
                digestPolicy: "references sha256 of RELEASE-ATTESTATION.json and never the inverse",
            },
        ] : []),
    ];
    return {
        id,
        title,
        band,
        intent,
        scope,
        subjects,
        repairs,
        invariant,
        mutationBite: bite,
        invariantFamilies: uniq(invariants),
        pi,
        dependsOn: uniq(deps),
        resourceLocks: uniq(locks),
        archaeology,
        terminalRule: terminal,
        status: "PLANNED",
        disposition: null,
        terminalOwner: "glass-ui orchestrator",
        commitPolicy: "exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit",
        evidenceRoot: evidencePath(id),
        receiptPath,
        integrationArtifacts,
        integrationLock: "serialized-orchestrator-envelope",
        projectionMode: sequence < 2 ? "NONE" : sequence === 2 ? "ACTIVATE" : "REFRESH",
        integrationRequires: sequence > 2 ? ["BI.W-P002"] : [],
        integrationPrerequisites: sequence > 2 ? [P002_ACTIVATION_PREREQUISITE] : [],
        agentCommitAuthority: false,
    };
};

const coreWaves = [
    wave({
        id: "BI.W-P001",
        title: "Git-reconstructable execution cursor and exactly-once wave transaction",
        band: "execution-substrate",
        intent: "Make restart, stale worktree, integrated-before-cursor, and no-op recovery deterministic before any implementation fan-out.",
        scope: [
            "Create the cursor schema and transactional CLI with validate, start, integrate, terminalize, and recover commands; store cache, journal, and lock beneath git rev-parse --git-path tranche/BI rather than in the tracked worktree.",
            "Treat first-parent Git lineage plus committed receipts as authority and the fsync-plus-atomic-rename cursor as a rebuildable cache; recover --at HEAD must reproduce the same state after deleting every Git-private cache file.",
            "Import BOOTSTRAP.json by requiring its exact formation digest, integration parent, P000 trailer, receipt digest, integration-adjunct-excluding payload digest, subject outcomes, and unique containing child commit; reject missing, duplicate, altered, intervening, or guessed history.",
            "Create one wave-receipt schema and transaction-envelope library. Every P001 and later DONE or evidence-backed DEAD wave gets one unique committed receipt and four core commit trailers; P002 and later add the two projection-digest trailers. The receipt payload digest is the canonical stage-0 builder/product/evidence index excluding the receipt, RELEASE-ATTESTATION, and FINAL paths. intendedTrailers records every applicable trailer name but embeds only the acyclic BI-Wave, BI-Status, and BI-Formation-SHA256 values; it never embeds BI-Receipt-SHA256, BI-Attestation-SHA256, or BI-FINAL-SHA256 values. The orchestrator derives those raw-byte digests after the ordered R then A then F renders and adds them only to the commit message. Only the orchestrator mutates state, renders integration artifacts, and commits.",
            "Add negative fixtures for a RUNNING crash, an already-integrated commit, stale cache/base, missing or duplicate trailer, changed receipt, no-op, DEAD subject, and fresh-checkout reconstruction.",
        ],
        subjects: [
            future("scripts/tranche/cursor.mjs"),
            future("scripts/tranche/cursor-schema.json"),
            future("scripts/tranche/wave-receipt-schema.json"),
            future("scripts/tranche/transaction-envelope.mjs"),
            future("tests/tranche/cursor.test.ts"),
            future("tests/tranche/transaction-envelope.test.ts"),
            current("package.json"),
        ],
        repairs: repair({
            tests: ["tests/tranche/cursor.test.ts", "tests/tranche/transaction-envelope.test.ts"],
            verification: ["scripts/tranche/cursor.mjs", "scripts/tranche/cursor-schema.json", "scripts/tranche/wave-receipt-schema.json", "scripts/tranche/transaction-envelope.mjs"],
            build: ["package.json"],
            docs: ["docs/tranches/BI/EXECUTION-PROGRESS.md"],
        }),
        invariant: "A process restart or fresh checkout cannot make a terminal wave runnable or lose an integrated wave: first-parent commits and immutable receipts are authority, the Git-private cursor is exactly reconstructable cache, and every nonterminal no-op is rejected.",
        bite: "Delete every cursor cache file after integration and require recovery to reproduce byte-identical state; then remove, duplicate, or alter the P000 or P001 receipt/trailer tuple and require recovery to block rather than guess.",
        invariants: ["integrity.cursor", "integrity.lineage", "integrity.dag"],
        pi: piNone("Execution-state tooling has no painted behavior."),
        deps: ["BI.W-P000"],
        locks: ["package-manifest", "execution-cursor"],
        archaeology: ["BG execution-engine log: repeated DONE waves, stale worktrees, no-op limbo, and 40 agent runs with zero integrated commits."],
    }),
    wave({
        id: "BI.W-P002",
        title: "Continuous FINAL and release projection",
        band: "execution-substrate",
        intent: "Turn FINAL/version/tag/migration/evidence parity into a continuously generated precondition rather than terminal ceremony.",
        scope: [
            "Generate exact FINAL.md and RELEASE-ATTESTATION.json from recovered Git/receipt state, entry graph, verifier evidence, π receipts, and constellation receipts. The acyclic order is product/evidence payload to receipt to attestation to FINAL to commit: attestation excludes itself and FINAL from its stage-0 index digest, FINAL references the attestation digest, and the containing commit/tree is resolved externally rather than embedded in tracked bytes.",
            "Separate honest projection from release authorization: --write emits NONTERMINAL_PROJECTION with exact blockers, --check requires tracked bytes to equal recomputation, and --require-terminal rejects any nonterminal wave, older-source evidence, mismatched tarball digest, pending handshake, or missing release fact.",
            "Verify a tag cannot introduce source repair and points at the exact attested tree.",
            "Install the serialized orchestrator integration envelope: every P002 and later wave appends its unique receipt and refreshes FINAL plus RELEASE-ATTESTATION inside that wave's sole commit, without leasing those shared paths to parallel builder lanes.",
        ],
        subjects: [
            future("scripts/tranche/release-projection.mjs"),
            future("scripts/tranche/release-schema.json"),
            future("tests/tranche/release-projection.test.ts"),
            current("scripts/release.sh"),
            current("package.json"),
        ],
        repairs: repair({
            tests: ["tests/tranche/release-projection.test.ts"],
            verification: ["scripts/tranche/release-projection.mjs", "scripts/tranche/release-schema.json"],
            build: ["package.json", "scripts/release.sh"],
            docs: ["CHANGELOG.md", "MIGRATION.md"],
        }),
        invariant: "Release metadata and evidence are a byte-current pure projection of the containing transaction; P002 may be DONE with an honest releaseEligible false projection, but --require-terminal and tag or publish can never pass or repair the tree until every release predicate is green.",
        bite: "Substitute a π receipt from the parent commit, drift a tracked projection byte, or ask --require-terminal to accept an honest nonterminal projection; each mutation must fail before tag creation.",
        invariants: ["integrity.release", "integrity.lineage"],
        pi: piNone("This wave verifies π receipt freshness but makes no visual claim itself."),
        deps: ["BI.W-P001"],
        locks: ["package-manifest", "release-projection"],
        archaeology: ["BA v4.0.0 tag commit repaired five release-only gates; BG cut remained PAINT-PENDING; exact FINAL was often absent."],
        terminal: "DONE when the continuous projection is installed, byte-current, honestly NONTERMINAL while blockers remain, and its activation receipt plus four core and two projection trailers verify. DEAD only if the product owner permanently withdraws the entire perfected-BI formation with evidence; that committed DEAD receipt forbids every P003-P133 integration and permanently denies tag, publish, and release eligibility on this execution lineage.",
    }),
    wave({
        id: "BI.W-P003",
        title: "ROOT canon lineage and model-routing conformance",
        band: "execution-substrate",
        intent: "Fail closed unless immutable ROOT-object authority and the effective CURRENT-012 orchestration/fanout contract can both be reproduced without writing the ROOT repository or inventing provider identity.",
        scope: [
            "Select precepts commit 8781ebb06c03547f57e33182ec1a970fd96d7069 and tree de9ce02f319bf106ea07a84bd394d9054c4ea4f4 as the immutable ROOT authority. Local acquisition reads the read-only Git object database at BI_ROOT_PRECEPTS_GIT_DIR or /Users/mkbabb/Programming/precepts; normative resolution always follows pinned commit:path git objects, never checkout bytes, HEAD, branch, origin movement, or docs/precepts.",
            "Bind the selected commit, full instructions tree, required tranche read-order blob OIDs, and a deterministic GIT_RAW_OBJECT_SNAPSHOT_V1. The schema stores hashAlgorithm sha1 and a strictly OID-sorted array of {oid,type,size,contentBase64} rows for exactly the selected commit object, its root-to-instructions tree path, and the recursively complete instructions subtree—no parent history and no extra object. Recompute each OID from type + decimal byte length + NUL + decoded raw content, require canonical base64 and exact size, parse binary tree entries without shell text normalization, traverse every authority path from the selected commit, and prove the included OID set equals the reachable closure. Local mode must reproduce identical canonical JSON from the external object database; fresh CI and release modes validate the committed snapshot without requiring the absolute checkout or network and fail on any commit, tree, object type, path, blob OID, missing object, duplicate OID, malformed object, or nonminimal extra object disagreement. The checkout at 458c2d1, its behind state, and its three untracked drafts remain preserved nonnormative observations.",
            "Implement CURRENT-012 precedence explicitly: the current core session alone owns orchestration, design, synthesis, adjudication, integration, cursor mutation, and commits; bounded non-root workflow fanout is labelled Luna or Terra and carries exact task, base, read, write, and evidence bounds.",
            "Record only platform-reported agent/model identity. Luna and Terra are workflow-lane labels, never provider-model assertions; a missing hidden provider ID is recorded as unattested and is not silently inferred, while an invented or relabelled provider identity is RED.",
            "Enforce the three-live-agent ceiling, CURRENT-002 supersession, and one immutable dispatch receipt per bounded lane before dispatch; emit canon/model conformance bound to the formation digest, source base, cursor wave, selected ROOT objects, and routing-policy digest.",
        ],
        subjects: [
            future("scripts/tranche/canon-authority.json"),
            future("scripts/tranche/canon-object-snapshot.json"),
            future("scripts/tranche/canon-object-snapshot.schema.json"),
            future("scripts/tranche/canon-conformance.mjs"),
            future("scripts/tranche/model-routing.json"),
            future("tests/tranche/canon-conformance.test.ts"),
            future("docs/tranches/BI/canon-conformance.json"),
        ],
        repairs: repair({
            tests: ["tests/tranche/canon-conformance.test.ts"],
            verification: ["scripts/tranche/canon-authority.json", "scripts/tranche/canon-object-snapshot.json", "scripts/tranche/canon-object-snapshot.schema.json", "scripts/tranche/canon-conformance.mjs", "scripts/tranche/model-routing.json"],
            docs: ["docs/tranches/BI/FORMATION/PRECEPTS-AMENDMENTS.md", "docs/tranches/BI/canon-conformance.json"],
        }),
        invariant: "Dispatch authority is a pure projection of CURRENT-012 and immutable ROOT commit 8781ebb06c03547f57e33182ec1a970fd96d7069: core retains orchestration, design, synthesis, adjudication, integration, and commits; every bounded fanout is honestly labelled Luna or Terra; checkout dirt and untracked drafts cannot alter canon; no provider identity is inferred from a lane label.",
        bite: "Keep the commit literal while substituting one required blob OID, promote an untracked checkout draft to normative authority, delegate synthesis to a child lane, or label Luna/Terra with an unreported provider model; each mutation must make conformance RED.",
        invariants: ["integrity.lineage", "integrity.cursor", "integrity.dag"],
        pi: piNone("Canon/model routing has no painted product claim."),
        deps: ["BI.W-P001"],
        locks: ["canon-conformance"],
        archaeology: ["The ROOT checkout is behind with three untracked instruction drafts; CURRENT-012 supersedes the earlier requested-provider wording, and the collaboration surface exposes task lanes but no provider-model selector."],
    }),
    wave({
        id: "BI.W-P004",
        title: "Read-only constellation scanner and owner handshake protocol",
        band: "execution-substrate",
        intent: "Replace prose consumer claims with syntax-level scans, protected foreign-state snapshots, and exact owner receipts.",
        scope: [
            "Resolve the nine declared consumer repositories to canonical git top-levels and real paths, retain nine distinct owner handshakes, and group nested/copied Atlas lineage without counting one source object as independent demand more than once.",
            "Derive authoritative import truth only from tracked HEAD objects: enumerate HEAD tree blobs and parse static imports, dynamic imports, and require specifiers from commit bytes; dirty tracked or untracked working bytes are protected observations and receive zero adoption or retention credit.",
            "Before and after every probe, capture branch/detached state, HEAD commit/tree, index stage tuples, raw porcelain-v2-z digest, every tracked working-tree path's type/mode/content digest, and every nonignored untracked tree member's path/type/mode/content or symlink-target digest.",
            "Make each snapshot self-stabilizing by collecting metadata before and after its byte walk; retry a torn sample and return FOREIGN_STATE_UNSTABLE after the bounded retry limit. Any pre/post drift invalidates the probe and yields no consumer credit; never reset, clean, stash, or attribute concurrent owner drift to BI.",
            "Emit a nine-row current baseline and owner-handshake schema. P004 establishes pending slots and protocol only; final acceptance remains impossible until a later exact Glass tarball and immutable foreign-owner commit, build, test, and π receipt fill the slot.",
        ],
        subjects: [
            current("scripts/constellation.mjs"),
            future("scripts/constellation/snapshot-worktree.mjs"),
            future("scripts/constellation/scan-imports.mjs"),
            future("scripts/constellation/handshake-schema.json"),
            future("tests/constellation/snapshot-worktree.test.ts"),
            future("tests/constellation/handshake.test.ts"),
            future("docs/tranches/BI/constellation-baseline.json"),
        ],
        repairs: repair({
            tests: ["tests/constellation/snapshot-worktree.test.ts", "tests/constellation/handshake.test.ts"],
            verification: ["scripts/constellation.mjs", "scripts/constellation/snapshot-worktree.mjs", "scripts/constellation/scan-imports.mjs", "scripts/constellation/handshake-schema.json"],
            docs: ["docs/tranches/BI/FORMATION/CONSTELLATION.md", "docs/tranches/BI/coordination/asks-and-consumes.md", "docs/tranches/BI/constellation-baseline.json"],
        }),
        invariant: "Every authoritative consumer claim is bound to immutable tracked commit objects and a byte-stable foreign snapshot: index state, already-dirty tracked working bytes, and all nonignored untracked-tree bytes are protected before and after the probe; drift invalidates evidence without mutating or normalizing the sibling.",
        bite: "Change bytes inside an already-M tracked file without changing its porcelain code, then change a file beneath an already-unknown untracked tree while preserving the same porcelain path set; both mutations must change the content snapshot and keep the handshake nonterminal.",
        invariants: ["constellation.handshake", "integrity.lineage"],
        pi: piNone("The scanner records consumer π requirements; it does not claim foreign pixels."),
        deps: ["BI.W-P001"],
        locks: ["constellation-snapshot"],
        archaeology: ["Q/AY/AZ/BG repeatedly treated external dirty or post-cut adoption as completed or user-domain work."],
    }),
];

const structureWaves = [
    wave({
        id: "BI.W-P005",
        title: "MS1 — generated current-HEAD structure authority",
        band: "structure",
        intent: "Replace inherited counts and prose rosters with one generated path/entry/owner manifest used by all structural waves.",
        scope: [
            "Generate component families, roots, entry projections, CSS ownership, direct importers, tests, demo routes, and verification consumers from source syntax.",
            "Record git blob IDs for every structural subject and fail on silent drift.",
            "Expose semantic queries consumed by MS2–MS9; do not encode success as a fixed count.",
            "Add negative fixtures for an unowned file, a duplicate concept home, a hidden path reader, and an orphan entry.",
        ],
        subjects: [
            current("scripts/regen-structure.mjs"),
            current("scripts/lib/subpath-policy.mjs"),
            future("scripts/structure/manifest.mjs"),
            future("scripts/structure/owners.json"),
            future("tests/structure/manifest.test.ts"),
        ],
        repairs: repair({
            tests: ["tests/structure/manifest.test.ts"],
            build: ["scripts/lib/subpath-policy.mjs", "vite.config.ts", "tsconfig.build.json"],
            docs: ["docs/STRUCTURE.md"],
        }),
        invariant: "Structural scope is derived from syntax and ownership, so a new/moved file joins the manifest or makes validation red without changing a baseline number.",
        bite: "Add an unowned component directory and require generation to fail with its exact path.",
        invariants: ["integrity.lineage", "architecture.component-topology", "architecture.component-topology"],
        pi: piNone("Inventory authority is structural and device-free."),
        deps: ["BI.W-P001"],
        locks: ["structure-authority"],
        archaeology: ["Prior MS1 specs carried stale 79/85/82 and hard-coded line/count assumptions across later HEADs."],
    }),
    wave({
        id: "BI.W-P006",
        title: "MS2 — dissolve generic utils into semantic owners",
        band: "structure",
        intent: "Remove src/utils as a generic home and place each surviving function with the concept that owns its semantics.",
        scope: [
            "Move cn into the component styling substrate, coalesceMetric into the metric family, and PRNG into procedural math ownership.",
            "Repoint every syntax-level importer before deleting src/utils and its barrel.",
            "Delete any utility with no runtime consumer instead of preserving a convenience export.",
            "Keep public behavior only through its semantic entry; do not create a shared compatibility barrel.",
        ],
        subjects: [
            ...tree("src/utils", "delete"),
            future("src/components/_shared/class-names.ts"),
            future("src/components/metric/coalesce-metric.ts"),
            future("src/composables/glass/procedural/prng.ts"),
            current("src/index.ts"),
        ],
        repairs: repair({
            imports: uniq([
                ...existing("src/index.ts"),
                ...grepPaths("@glass.*/utils|src/utils|from [\"'][^\"']*/utils", ["src", "demo", "tests", "tests-visual"]),
            ]),
            tests: ["tests/structure/manifest.test.ts"],
            build: ["src/index.ts"],
            docs: ["docs/STRUCTURE.md"],
        }),
        invariant: "No generic utils root or pass-through barrel exists; every surviving helper has one semantic owner and live consumer.",
        bite: "Restore src/utils/index.ts re-exporting one moved helper and require both topology and import-boundary families to fail.",
        invariants: ["architecture.import-boundaries", "architecture.component-topology", "architecture.component-topology"],
        pi: piNone("Pure helper relocation is paint-neutral; behavior is covered by owner tests."),
        deps: ["BI.W-P005"],
        locks: ["root-barrel", "structure-authority"],
    }),
    wave({
        id: "BI.W-P007",
        title: "MS3 — colocate sortable behavior with SortableList",
        band: "structure",
        intent: "Give SortableList one public semantic list concept and one private reorder engine instead of a root composables subsystem or pointer-only visual facsimile.",
        scope: [
            "Move src/composables/sortable leaves under the flat SortableList family while preserving only genuinely reusable public types.",
            "Repoint component, demo, tests, and public entry imports atomically.",
            "Delete duplicate drag/identity/keyboard helpers and any root sortable barrel.",
            "Render semantic list/listitem structure by default and native button handles; do not repair a noninteractive span by adding role=button/tabindex, and never apply application role.",
            "Define one keyboard transaction: Space or Enter lifts/drops, Arrow/Home/End changes the proposed position, Escape cancels, the same stable item keeps focus, and one polite announcement names item, position, set size, drop, or cancellation.",
            "Verify pointer and touch use the same reorder transaction and identity model, every coarse handle meets the 44 px product target, disabled items cannot enter the transaction, and cross-list moves announce both source and destination.",
        ],
        subjects: [
            ...renameTree("src/composables/sortable", "src/components/sortable-list/composables"),
            ...renameTree("src/components/custom/sortable-list", "src/components/sortable-list"),
            future("src/components/sortable-list/composables/index.ts"),
            current("demo/stories/data/sortable-list.vue"),
            future("tests-visual/sortable-list.contract.spec.ts"),
        ],
        repairs: repair({
            imports: componentRefs("sortable-list", "SortableList"),
            tests: uniq([...componentRefs("sortable", "Sortable"), "tests/components/sortable-list.contract.test.ts", "tests-visual/sortable-list.contract.spec.ts"]),
            build: ["scripts/lib/subpath-policy.mjs", "vite.config.ts"],
            docs: ["docs/STRUCTURE.md"],
        }),
        invariant: "SortableList owns one reorder engine and a semantic list transaction with stable identity, keyboard/pointer/touch parity, native handles, retained focus, complete announcements, disabled-state exclusion, and product-sized coarse targets; no root sortable subsystem or second writer survives.",
        bite: "Replace list/listitem and native handles with generic div/span role repairs, shrink a coarse handle below 44 px, or drop keyboard focus after reorder; semantic, target, focus, and mutation evidence must turn RED.",
        invariants: ["architecture.component-topology", "architecture.import-boundaries", "behavior.selection", "behavior.data", "behavior.focus-escape", "design.adaptive-accessibility", "design.responsive-touch", "demo.scenario-contract"],
        pi: piBrowser(["sortable-keyboard-lift-travel-drop", "sortable-keyboard-cancel", "sortable-pointer-reorder", "sortable-touch-reorder", "sortable-cross-list", "sortable-disabled"], ["semantic list/listitem tree", "order and stable item identity", "focus identity", "native handle name and 44 px coarse geometry", "polite transaction announcement", "cancel rollback"]),
        deps: ["BI.W-P005"],
        locks: ["component-sortable-list", "structure-authority"],
    }),
    wave({
        id: "BI.W-P008",
        title: "MS4 — atomic ui/custom flatten and declaration-entry flip",
        band: "structure",
        intent: "Eliminate tier taxonomy in one atomic move and make the generated entry graph drive both JS and declarations.",
        scope: [
            "Rename every tracked file under src/components/ui and src/components/custom to src/components/<family>, preserving private substructure.",
            "Move _shared once and resolve concept collisions explicitly; never suffix a duplicate to make the move pass.",
            "Repoint all source/demo/test/script/config imports and path readers from tiered to flat homes.",
            "Replace the declaration mover with declaration generation from the same entry graph used by Vite.",
        ],
        subjects: [
            ...tree("src/components/ui", "rename").map((row) => ({ ...row, targetPath: flatComponentPath(row.path) })),
            ...tree("src/components/custom", "rename")
                .filter((row) => !row.path.startsWith("src/components/custom/sortable-list/"))
                .map((row) => ({ ...row, targetPath: flatComponentPath(row.path) })),
            current("scripts/flatten-subpath-types.mjs"),
            current("scripts/lib/subpath-policy.mjs"),
            current("vite.config.ts"),
        ],
        repairs: repair({
            imports: uniq(treeRows.filter((row) => /^(src|demo|tests|tests-visual|scripts)\//.test(row.path)).map((row) => row.path)),
            tests: uniq(paths("tests").filter((path) => /\.(?:ts|tsx)$/.test(path))),
            build: ["scripts/flatten-subpath-types.mjs", "scripts/lib/subpath-policy.mjs", "vite.config.ts", "tsconfig.build.json", "package.json"],
            docs: ["docs/STRUCTURE.md", "MIGRATION.md"],
        }),
        invariant: "There is one flat component concept graph and one generated JS/d.ts entry authority; no ui/custom path or hidden reader survives.",
        bite: "Leave one script resolving components/ui/_shared and require structure/build evidence to turn RED before integration.",
        invariants: ["architecture.component-topology", "architecture.import-boundaries", "integrity.entry-graph", "integrity.types", "integrity.build-package"],
        pi: piNone("Path move is required to emit byte-equivalent component behavior; exact build and test projections are binding."),
        deps: ["BI.W-P006", "BI.W-P007"],
        locks: ["all-components", "entry-graph", "package-manifest", "structure-authority"],
        archaeology: ["Existing MS4 spec omitted or hard-coded mirror barrels and path readers and depended on stale family/export counts."],
    }),
    wave({
        id: "BI.W-P009",
        title: "MS5 — dissolve pure root barrels",
        band: "structure",
        intent: "Remove pass-through src/<name>.ts authorities and point the generated entry graph at semantic implementation homes.",
        scope: [
            "Delete pure pass-through roots for axes, dark, keyboard, sidebar, infinite-scroll, carousel, motion, and motion-core.",
            "Move the tokens JS projection under styles and keep genuine forms aggregation only while it owns multiple concepts.",
            "Repoint generated entries and every internal reader; do not preserve source aliases.",
            "Evaluate zero-consumer axes as a product decision rather than preserving it for exact reproduction by default.",
        ],
        subjects: [
            ...existing("src/axes.ts", "src/dark.ts", "src/keyboard.ts", "src/sidebar.ts", "src/infinite-scroll.ts", "src/carousel.ts", "src/motion.ts", "src/motion-core.ts", "src/tokens.ts").map((path) => path === "src/tokens.ts" ? { ...current(path, "rename"), targetPath: "src/styles/tokens.ts" } : current(path, "delete")),
            current("scripts/lib/subpath-policy.mjs"),
        ],
        repairs: repair({
            imports: uniq(treeRows.filter((row) => /^(src|demo|tests|tests-visual|scripts)\//.test(row.path)).map((row) => row.path)),
            tests: ["tests/public-surface.spec.ts", "tests/structure/manifest.test.ts"],
            build: ["scripts/lib/subpath-policy.mjs", "vite.config.ts", "package.json"],
            docs: ["MIGRATION.md", "docs/STRUCTURE.md"],
        }),
        invariant: "Every public entry resolves directly to a semantic owner; no pass-through root file or compatibility source path exists.",
        bite: "Restore src/motion.ts as a pure export-star mirror and require entry/topology evidence to turn RED.",
        invariants: ["integrity.entry-graph", "architecture.clean-break", "architecture.component-topology", "integrity.types"],
        pi: piNone("Entrypoint source movement has no intended paint delta."),
        deps: ["BI.W-P008"],
        locks: ["entry-graph", "root-barrel", "package-manifest"],
    }),
    wave({
        id: "BI.W-P010",
        title: "MS6 — dissolve src/subpaths and generate every package projection",
        band: "structure",
        intent: "Remove 67 source mirror barrels and make one semantic entry map the sole public packaging authority.",
        scope: [
            "Delete every tracked src/subpaths file after repointing all @glass/subpaths imports.",
            "Generate Vite inputs, declarations, package exports/types, and migration rows from the semantic entry graph.",
            "Resolve every packed entry and verify retired keys remain absent without locking a key count.",
            "Delete dist/subpaths production and any mirror-specific proof logic.",
        ],
        subjects: [
            ...tree("src/subpaths", "delete"),
            current("scripts/lib/subpath-policy.mjs"),
            current("scripts/flatten-subpath-types.mjs"),
            current("vite.config.ts"),
            current("package.json"),
        ],
        repairs: repair({
            imports: uniq([...componentRefs("@glass/subpaths", "subpaths"), ...existing("tests/public-surface.spec.ts", "tests/components.smoke.spec.ts", "tests/composables.smoke.spec.ts")]),
            tests: ["tests/public-surface.spec.ts", "tests/components.smoke.spec.ts", "tests/composables.smoke.spec.ts"],
            build: ["scripts/lib/subpath-policy.mjs", "scripts/flatten-subpath-types.mjs", "vite.config.ts", "package.json", "tsconfig.build.json"],
            docs: ["MIGRATION.md", "README.md", "docs/STRUCTURE.md"],
        }),
        invariant: "No src/subpaths or dist/subpaths mirror exists; every public key and declaration is generated and resolves from the packed artifact.",
        bite: "Add a hand-authored package export missing from the semantic map and require semantic projection comparison to fail.",
        invariants: ["integrity.entry-graph", "integrity.build-package", "integrity.build-package", "architecture.clean-break"],
        pi: piNone("Packaging transposition is device-free; packed consumer builds are binding."),
        deps: ["BI.W-P009"],
        locks: ["entry-graph", "package-manifest"],
    }),
    wave({
        id: "BI.W-P011",
        title: "MS7 — colocate component-owned CSS without cascade drift",
        band: "structure",
        intent: "Move ownerable CSS to flat component families while keeping only truly global substrate in src/styles.",
        scope: [
            "Classify every stylesheet/selector by semantic owner and move component sheets to their family.",
            "Generate the published CSS assembly from ownership metadata while preserving layer/import ordering.",
            "Delete duplicated global and scoped rules; never use scoped-global escape hatches as a move strategy.",
            "Prove computed-style equivalence for move-only surfaces, then let later design waves make explicit visual changes.",
        ],
        subjects: [
            ...tree("src/styles", "modify"),
            current("scripts/read-css-monoliths.mjs"),
            current("vite.style-assets.ts"),
            future("scripts/structure/css-owners.json"),
        ],
        repairs: repair({
            imports: uniq(paths("src").filter((path) => /\.(?:css|vue|ts)$/.test(path))),
            tests: ["tests/styles/css-ownership.test.ts", "tests-visual/material-move-equivalence.spec.ts"],
            build: ["scripts/read-css-monoliths.mjs", "vite.style-assets.ts", "vite.config.ts"],
            docs: ["DESIGN.md", "docs/STRUCTURE.md"],
        }),
        invariant: "Every component selector has one colocated owner and the published cascade is generated without changing computed behavior during the move.",
        bite: "Place a Dock-only selector back in src/styles/index.css and require CSS ownership to fail.",
        invariants: ["architecture.component-topology", "design.token-graph", "integrity.build-package", "design.material-hierarchy"],
        pi: piBrowser(["css-move-representative-light", "css-move-representative-dark"], ["computed style vector equality", "layer/import order", "paint delta attributable only to font raster noise"]),
        deps: ["BI.W-P008"],
        locks: ["all-components", "style-assembly", "structure-authority"],
    }),
    wave({
        id: "BI.W-P012",
        title: "MS8 — demo terminal and private-chassis re-home",
        band: "structure",
        intent: "Make demo shell/chassis/stories the terminal home for demo-only composition and remove phantom route helpers.",
        scope: [
            "Move demo configurator implementation under shell ownership and re-home route-specific helpers to their owning story/chassis.",
            "Provide terminal demo homes consumed by the separately owned SpaView and CompletionSeal disposition waves; HeaderRibbon remains public because keyframes.js is an actual tracked consumer.",
            "Preserve one route manifest and prove disk/render bijection; no glob special-case may hide a phantom route.",
            "Repoint every demo scenario and capture registration to semantic IDs rather than file paths.",
        ],
        subjects: [
            ...renameTree("demo/configurator", "demo/shell/configurator"),
            ...tree("demo/shell", "modify"),
            ...tree("demo/chassis", "modify"),
            current("demo/stories/manifest.ts"),
            current("demo/router.ts"),
            future("tests/demo/story-bijection.test.ts"),
        ],
        repairs: repair({
            imports: uniq(paths("demo")),
            tests: ["tests/demo/story-bijection.test.ts", "tests-visual/demo-shell.spec.ts"],
            build: ["demo/vite.demo-dist.config.ts", "vite.config.ts"],
            docs: ["docs/STRUCTURE.md", "MIGRATION.md"],
        }),
        invariant: "Demo-only concepts have one private terminal home and every manifest route resolves to rendered code without a public export side effect.",
        bite: "Add a manifest route whose component glob misses and require story-bijection evidence to turn RED.",
        invariants: ["demo.scenario-contract", "architecture.component-topology", "architecture.component-topology"],
        pi: piBrowser(["demo-shell-route-hold", "demo-route-bijection", "demo-narrow-navigation"], ["route stability", "rendered component reachability", "focus and dock navigation"]),
        deps: ["BI.W-P008"],
        locks: ["demo-shell", "demo-manifest"],
    }),
    wave({
        id: "BI.W-P013",
        title: "MS9 — live differential guard for the settled structure",
        band: "structure",
        intent: "Install a durable semantic differential immediately after structural moves, not as a terminal close sweep.",
        scope: [
            "Compare public symbols/types, packed resolution, rendered story reach, CSS computed behavior, and supported consumer fixtures before/after structure.",
            "Represent intentional clean breaks through generated migration dispositions; reject accidental losses and accidental aliases.",
            "Make the differential family run for every later wave so structure drift is discovered at its producer.",
            "Delete MS-specific snapshot/count logic after shared invariant evidence proves the settled structure.",
        ],
        subjects: [
            future("scripts/verification/oracles/structural-differential.mjs"),
            future("tests/structure/differential.test.ts"),
            current("MIGRATION.md"),
            current("scripts/lib/subpath-policy.mjs"),
        ],
        repairs: repair({
            tests: ["tests/structure/differential.test.ts", "tests/public-surface.spec.ts"],
            build: ["scripts/lib/subpath-policy.mjs", "package.json", "vite.config.ts"],
            docs: ["MIGRATION.md", "docs/STRUCTURE.md"],
        }),
        invariant: "Every later wave sees accidental structural drift immediately; intentional removal is tied to one migration disposition and never an alias.",
        bite: "Delete a retained public type without a migration disposition and require the differential to fail.",
        invariants: ["integrity.entry-graph", "integrity.types", "integrity.build-package", "architecture.clean-break", "demo.scenario-contract"],
        pi: piBrowser(["structure-differential-representative"], ["computed visual equivalence for move-only subjects", "intentional-delta roster only"]),
        deps: ["BI.W-P010", "BI.W-P011", "BI.W-P012"],
        locks: ["entry-graph", "structure-differential"],
        archaeology: ["Old MS9 was a tail close wave; perfected BI moves its protection before any redesign dependents."],
    }),
];

const VERIFICATION_BOOTSTRAP_PATHS = new Set([
    "scripts/verify.mjs",
    "scripts/verification/invariants.mjs",
    "scripts/verification/discover.mjs",
    "scripts/verification/mutation-fixtures.mjs",
    "scripts/verification/evidence-plan.schema.json",
    "scripts/verification/external-scenario.schema.json",
    "tests/verification/engine.test.ts",
    "tests/verification/external-scenario-contract.test.ts",
]);

const subject = (path, action) => {
    if (path.startsWith("docs/tranches/BI/FORMATION/")) {
        return { path, action: "verify", before: null, producedBy: "FORMATION" };
    }
    if (BY_PATH.has(path)) return current(path, action ?? "modify");

    const flattened = /^src\/components\/([^/]+)(\/.*)?$/.exec(path);
    if (flattened) {
        const tail = flattened[2] ?? "";
        const sources = ["ui", "custom"]
            .map((tier) => `src/components/${tier}/${flattened[1]}${tail}`)
            .filter((candidate) => BY_PATH.has(candidate));
        if (sources.length === 1) {
            const sourceRow = BY_PATH.get(sources[0]);
            return {
                path,
                action: action ?? "modify",
                before: null,
                producedBy: "BI.W-P008",
                sourceBasePath: sourceRow.path,
                sourceBaseOid: sourceRow.oid,
            };
        }
    }

    if (VERIFICATION_BOOTSTRAP_PATHS.has(path)) {
        return { path, action: action ?? "modify", before: null, producedBy: "BI.W-P000" };
    }
    return future(path, action ?? "create");
};
const subjects = (filePaths, action) => uniq(filePaths).map((path) => subject(path, action));

const verificationBootstrapWave = wave({
    id: "BI.W-P000",
    title: "Atomic proof-command abrogation and single verification-engine bootstrap",
    band: "execution-bootstrap",
    intent: "Abolish every historical proof-command identity and replace command orchestration with one state-recovering verifier whose one-shot pre-cursor bootstrap inputs are immutable formation data and whose later inputs are Git/receipt state, semantic invariant declarations, ordinary tests, live scenarios, and exact-source evidence plans.",
    scope: [
        "Create one scripts/verify.mjs executable, semantic discovery, evidence-plan and external-scenario schemas, mutation-fixture support, a non-executable invariant taxonomy, and engine self-tests; do not create a per-family command, package script, case name, or table file.",
        "Classify all 403 historical registry rows exactly once, disposition all 435 package scripts, delete 415 proof/gate/escaped executable aliases plus 383 scripts/proof-* files and four gate registry/runner files, and retain only twenty explicitly justified ordinary tasks; typecheck/test/build keep their spellings without gate status.",
        "Bind an exhaustive source-base mechanics census for every registry row: exact command/program blobs, donated property kind, source/file/regex/roster/cardinality/prose/self-test/artifact/browser-execution exposure, and abrogation disposition. These descriptive features explain accretion but never become a replacement fixed-count product oracle.",
        "Bind a quote-aware census of every Vue template activation/direct-manipulation/keyboard event host plus a TypeScript-AST census of imperative DOM listeners and intrinsic render-function handlers; disposition each exactly once for formation research. Execution must rediscover composed operable descendants from the current import/render/route graph; frozen counts and paths never become a roster, allowlist, or PASS criterion.",
        "Rewrite the tracked commit hook, hook installer, package scripts, CI, tag workflow, and release.sh atomically. Every fresh-checkout entry surface resolves scripts/verify.mjs; no retained surface invokes a deleted proof/gate path. Bootstrap selection is permitted only for P000; P001 and later waves require cursor recovery.",
        "Discover assertions from normal unit/integration tests and typed live-story scenarios. For bootstrap acceptance, exercise schema-valid synthetic fixtures spanning device-free assertions and browser-receipt adapters, require every planted defect to turn RED, restore, and require PASS without frozen file/count rosters. Any current-source failure actually executed by P000 must be fixed when P000 owns it or recorded as a nonterminal routed finding with exactly one future owning wave; an unowned, multiply owned, or falsely green failure blocks.",
        "Emit BOOTSTRAP.json binding source base, formation plan hash, integration parent, exact pre/post command sets, exact path outcomes, evidence digest, and intendedTrailers containing the four core trailer names plus the acyclic BI-Wave, BI-Status, and BI-Formation-SHA256 values. It must not embed the BI-Receipt-SHA256 value; the hook computes that from the final staged BOOTSTRAP bytes. Its payload digest covers the canonical stage-0 builder/product/evidence index while excluding BOOTSTRAP.json and the two not-yet-active projection paths. P001 must resolve that tuple to exactly one child commit and reproduce the actual SHA in the Git-private cursor cache; the receipt and Git remain authoritative, and the receipt never self-asserts its own digest, containing commit, or tree hash.",
    ],
    subjects: [
        ...treeRows.filter((row) => /^scripts\/proof-/.test(row.path)).map((row) => ({ path: row.path, action: "delete", before: row.oid })),
        ...existing("scripts/gates.mjs", "scripts/gates.manifest.mjs", "scripts/gate-family-manifest.mjs", "scripts/gate-output.mjs").map((path) => current(path, "delete")),
        ...[...VERIFICATION_BOOTSTRAP_PATHS].map((path) => future(path)),
        future("scripts/tranche/bootstrap-receipt.mjs"),
        future("scripts/tranche/bootstrap-receipt.schema.json"),
        future("tests/tranche/bootstrap-receipt.test.ts"),
        { path: "docs/tranches/BI/FORMATION/execution-bootstrap-plan.seed.json", action: "verify", before: null, producedBy: "FORMATION" },
        { path: "docs/tranches/BI/FORMATION/build-gate-mechanics-census.mjs", action: "verify", before: null, producedBy: "FORMATION" },
        { path: "docs/tranches/BI/FORMATION/gate-mechanics-census.json", action: "verify", before: null, producedBy: "FORMATION" },
        { path: "docs/tranches/BI/FORMATION/GATE-MECHANICS-CENSUS.md", action: "verify", before: null, producedBy: "FORMATION" },
        { path: "docs/tranches/BI/FORMATION/build-semantic-operability-census.mjs", action: "verify", before: null, producedBy: "FORMATION" },
        { path: "docs/tranches/BI/FORMATION/semantic-operability-census.json", action: "verify", before: null, producedBy: "FORMATION" },
        { path: "docs/tranches/BI/FORMATION/SEMANTIC-OPERABILITY-CENSUS.md", action: "verify", before: null, producedBy: "FORMATION" },
        current(".githooks/commit-msg"),
        current("scripts/install-hooks.mjs"),
        current("scripts/release.sh"),
        current("package.json"),
        current(".github/workflows/ci.yml"),
        current(".github/workflows/release.yml"),
    ],
    repairs: repair({
        imports: uniq(paths("scripts").filter((path) => /\.(?:mjs|js|ts)$/.test(path))),
        tests: uniq([...paths("tests"), ...paths("tests-visual"), "tests/verification/engine.test.ts", "tests/verification/external-scenario-contract.test.ts", "tests/tranche/bootstrap-receipt.test.ts"]),
        verification: [...VERIFICATION_BOOTSTRAP_PATHS, "scripts/tranche/bootstrap-receipt.mjs", "scripts/tranche/bootstrap-receipt.schema.json", ".githooks/commit-msg"],
        build: ["package.json", ".github/workflows/ci.yml", ".github/workflows/release.yml", ".githooks/commit-msg", "scripts/install-hooks.mjs", "scripts/release.sh"],
        docs: ["docs/tranches/BI/FORMATION/execution-bootstrap-plan.seed.json", "docs/tranches/BI/FORMATION/VERIFICATION-ARCHITECTURE.md", "docs/tranches/BI/FORMATION/gate-mechanics-census.json", "docs/tranches/BI/FORMATION/GATE-MECHANICS-CENSUS.md", "docs/tranches/BI/FORMATION/semantic-operability-census.json", "docs/tranches/BI/FORMATION/SEMANTIC-OPERABILITY-CENSUS.md"],
    }),
    invariant: "From the first execution commit onward there is one verifier and zero executable gate/family identities; every active fresh-checkout hook, installer, package, CI, tag, and release surface resolves that verifier rather than a deleted path; the one-shot P000 bootstrap plan can select only four device-free mechanism families, every planted defect turns RED and restores PASS, every encountered current-source RED has one honest future owner, no routed RED is counted as PASS, and the self-reference-free receipt resolves uniquely to the P000 commit before Git/receipt transaction recovery takes over.",
    bite: "Restore one proof/gate alias, register typecheck/test/build as acceptance identities, restore a scripts/proof-* file, add a per-family table, freeze the invariant count, leave the tracked hook/release/CI/package surface pointing at a deleted path, let bootstrap mode accept a wave other than P000, make a realistic fixture mutation exit zero, drop or multiply route an encountered current-source RED, count a routed RED as PASS, or remove or falsify the unique parent plus payload plus trailer recovery tuple; bootstrap must remain RED.",
    invariants: ["integrity.build-package", "integrity.lineage", "integrity.dag", "architecture.clean-break"],
    pi: piNone("The bootstrap makes no product visual claim: deterministic fixtures validate browser evidence-plan and receipt adapters, while actual current-product Safari/Chrome evidence begins with P014 and remains owned by the applicable product waves."),
    locks: ["verification-engine", "package-manifest", "ci-workflows", "execution-bootstrap"],
    archaeology: ["The first validator found 61 real verifier-before-producer violations: P001–P013 cited not-yet-created family table files. The corrected bootstrap removes those files altogether and makes evidence discovery part of the sole engine."],
    terminal: "DONE when every P000 scope row is complete; the command registry and all proof/gate infrastructure are atomically absent; the tracked hook, hook installer, package lifecycle, CI, tag workflow, and release.sh resolve only the sole verifier in a clean checkout; the hook's P000 branch consumes the immutable bootstrap plan while every later wave fails closed without a recoverable cursor; deterministic device-free and browser-receipt fixtures prove nonzero RED followed by restored PASS; every encountered current-source failure is fixed as P000-owned or recorded in BOOTSTRAP.json with exactly one future owner and is not counted as PASS; the self-reference-free integration-parent, integration-adjunct-excluding payload, evidence, and BI-Wave trailer tuple resolves to exactly one commit; and every repair-manifest path has a matching disk receipt. No current-product browser π claim is made by P000. DEAD only if the product owner permanently withdraws the complete bootstrap subject with evidence.",
});

const verificationProjectionWave = wave({
    id: "BI.W-P014",
    title: "Post-structure semantic discovery projection and mutation revalidation",
    band: "verification-architecture",
    intent: "Re-project the sole verifier over the settled MS1–MS9 semantic graph so moved subjects, generated entries, and external scenarios remain discoverable and biting without reviving commands or central per-family tables.",
    scope: [
        "Verify the P000 403-row disposition remains exact after structural commits and that no deleted command, package alias, or compatibility launcher reappeared.",
        "Regenerate semantic subject discovery from the final component/entry/CSS/demo graph; reject path rosters, fixed counts, stale ui/custom readers, and an exact invariant-count assertion.",
        "Discover intrinsic, polymorphic, SVG, canvas-hit, table header/row, list-item, and composite-descendant controls from effective runtime semantics across templates, imperative listeners, render functions, and dynamic composition. A wrapper component, host role, event directive, or native tag is neither automatic enrollment completeness nor automatic PASS.",
        "Harden the fail-closed verifier, discovery logic, evidence-plan schema, external-scenario contract, and mutation fixtures against the settled graph; ordinary tests and stories remain the assertion owners.",
        "Accept schema-validated consumer predicates such as Atlas P's GG001–GG060 as evidence-plan rows bound to existing properties and owning waves, never as commands, aliases, family identities, or weaker prose substitutes.",
        "Reconcile useful detectors into normal test/oracle modules and delete every path-specific reader or central table made obsolete by MS1–MS9.",
        "Verify package and CI/release registration resolve only scripts/verify.mjs and that every later owner supplies applicable semantic discovery metadata rather than editing a gate roster.",
        "Run the cursor-derived device-free and full Safari/Chrome native evidence plans; engine self-tests must prove every applicable invariant can turn RED. The unmutated current tree may terminalize P014 with a real downstream RED only when that RED is recorded once, names exactly one nonterminal future owning wave, and remains ineligible for PASS or release until that owner closes it.",
    ],
    subjects: [
        ...[...VERIFICATION_BOOTSTRAP_PATHS].map((path) => subject(path)),
        future("tests/verification/post-structure-discovery.test.ts"),
        future("docs/tranches/BI/verification-subject-projection.json"),
        { path: "docs/tranches/BI/FORMATION/build-platform-research.mjs", action: "verify", before: null, producedBy: "FORMATION" },
        { path: "docs/tranches/BI/FORMATION/platform-research.json", action: "verify", before: null, producedBy: "FORMATION" },
        { path: "docs/tranches/BI/FORMATION/PLATFORM-RESEARCH.md", action: "verify", before: null, producedBy: "FORMATION" },
        current("package.json"),
        current(".github/workflows/ci.yml"),
        current(".github/workflows/release.yml"),
    ],
    repairs: repair({
        imports: uniq(paths("scripts").filter((path) => /\.(?:mjs|js|ts)$/.test(path))),
        tests: uniq([...paths("tests"), ...paths("tests-visual"), "tests/verification/engine.test.ts", "tests/verification/external-scenario-contract.test.ts", "tests/verification/post-structure-discovery.test.ts"]),
        verification: [...VERIFICATION_BOOTSTRAP_PATHS],
        build: ["package.json", ".github/workflows/ci.yml", ".github/workflows/release.yml", "scripts/release.sh"],
        docs: ["DESIGN.md", "CONTRIBUTING.md", "docs/tranches/BI/FORMATION/VERIFICATION-ARCHITECTURE.md", "docs/tranches/BI/verification-subject-projection.json"],
    }),
    invariant: "The sole verifier discovers the settled semantic graph rather than pre-move paths, every external predicate is executable through its owning wave, every mutation remains discriminating, and no historical command, family command, table roster, or fixed subject count returns.",
    bite: "Restore a ui/custom path reader, freeze a subject or invariant count, add a prose-only export claim, break rendered contrast, add a competing rAF writer, or use stale π evidence; the cursor-derived plan must turn RED without a bespoke command.",
    invariants: INVARIANTS.map((row) => row.id),
    pi: piBrowser(["verification-oracle-light", "verification-oracle-dark", "verification-oracle-narrow", "verification-oracle-prm", "verification-oracle-forced-colors", "verification-renderer-parity"], ["every applicable native oracle runs through one plan", "every negative fixture is red", "unmutated current tree is green or names a real downstream owner"]),
    deps: ["BI.W-P013"],
    locks: ["verification-engine", "package-manifest", "ci-workflows"],
    archaeology: ["gate-family-manifest recorded a 40–60 target while current registry remained 403; the first consolidated draft still minted forty commands/tables and an exact-count assertion. P014 now removes that cleaner-looking reenactment."],
    terminal: "DONE when every P014 scope row and full native π obligation is current; every realistic mutation produces nonzero RED followed by restored-fixture PASS; every unmutated-source RED is either fixed as P014-owned or recorded exactly once against one nonterminal future owning wave; no routed RED is counted as property PASS or release evidence; and every repair-manifest path has a matching disk receipt. DEAD only if the product owner permanently withdraws the complete projection subject with evidence.",
});

const designWaves = [
    wave({
        id: "BI.W-P015",
        title: "Semantic token graph and dead-alias excision",
        band: "design-foundation",
        intent: "Make tokens a typed semantic graph with one definition/consumer path and remove historical aliases, dead rungs, and component-local redefinitions.",
        scope: [
            "Generate typed domains for color, material, type, space, radius, shadow, motion, and interaction from CSS definitions and reads.",
            "Delete alias cycles, old-name bridges, compatibility reads, and tokens with no computed consumer.",
            "Resolve dark, contrast, forced-color, and reduced-transparency values through the same semantic IDs.",
            "Expose component override points only where product customization is real; internal implementation constants stay private.",
        ],
        subjects: [
            ...tree("src/styles/tokens", "modify"),
            current("src/styles/tokens.css"),
            future("src/styles/tokens/manifest.ts"),
            future("tests/styles/token-graph.test.ts"),
        ],
        repairs: repair({
            imports: uniq(paths("src").filter((path) => /\.(?:css|vue|ts)$/.test(path))),
            tests: ["tests/styles/token-graph.test.ts"],
            build: ["src/styles/index.css", "vite.style-assets.ts"],
            docs: ["DESIGN.md", "README.md"],
        }),
        invariant: "Every live token has one semantic definition, typed domain, computed consumer, and accessible mode resolution; no alias is needed to preserve an old name.",
        bite: "Create an old→new token alias and a definition with no computed read; both must fail with exact graph paths.",
        invariants: ["design.token-graph", "architecture.clean-break", "architecture.present-tense-source"],
        pi: piNone("Token graph semantics are device-free here; painted material waves validate resolved values."),
        deps: ["BI.W-P014"],
        locks: ["global-tokens"],
    }),
    wave({
        id: "BI.W-P016",
        title: "Warm content-field and functional material hierarchy",
        band: "design-foundation",
        intent: "Establish a restrained four-level material system: content field, elevated content, functional glass, transient overlay.",
        scope: [
            "Replace page-wide glass and decorative blur with a warm legible content field.",
            "Define material roles through semantic tokens and state attributes, not component-specific glass variants.",
            "Calibrate edge separation, translucency, blur/lensing, and shadows across light/dark and complex backdrops.",
            "Make reduced transparency and increased contrast intentional material resolutions.",
            "Resolve D4's glass-material-unified escalation by tracing every old material reader: repoint only a live semantic reader and cull every obsolete reader/recipe; a blanket repoint is forbidden.",
            "Make adaptive backdrop luminance a provenance-bearing live measurement: animated sampling reports coordinates, age, and value; an unavailable/failed live sample is typed RED and can never coalesce to a static/theme/default value while the surface claims live adaptation.",
        ],
        subjects: subjects([
            "src/styles/paper.css", "src/styles/cards.css", "src/styles/glass.css", "src/styles/theme.css",
            "src/styles/material/content-field.css", "src/styles/material/elevated-content.css", "src/styles/material/functional-glass.css", "src/styles/material/transient-overlay.css",
            "src/composables/glass/useGlassBackdropLuminance.ts", "src/composables/glass/index.ts",
            "demo/stories/substrates/glass-material.vue", "demo/stories/dock/DockStage.vue",
            "tests/composables/glass/backdrop-luminance-provenance.test.ts", "tests-visual/glass-backdrop-luminance.spec.ts",
            "tests-visual/material-hierarchy.spec.ts",
        ]),
        repairs: repair({
            imports: ["src/styles/index.css", "demo/demo.css", "src/composables/glass/index.ts", "demo/stories/substrates/glass-material.vue", "demo/stories/dock/DockStage.vue"],
            tests: ["tests/composables/glass/backdrop-luminance-provenance.test.ts", "tests-visual/glass-backdrop-luminance.spec.ts", "tests-visual/material-hierarchy.spec.ts"],
            build: ["vite.style-assets.ts"],
            docs: ["DESIGN.md"],
        }),
        invariant: "Material level follows semantic function and remains perceptually ordered in every supported appearance/accessibility state; any adaptive-luminance claim is backed by a fresh live sample with explicit provenance or an observable typed failure.",
        bite: "Give ordinary StorySection content the functional-glass material, or restore `sampleAnimated(...) ?? sampleStatic(...)` while labeling the result live; role/paint and provenance/failure checks must fail respectively.",
        invariants: ["design.material-hierarchy", "design.material-hierarchy", "design.adaptive-accessibility"],
        pi: piBrowser(["material-simple-light", "material-complex-light", "material-simple-dark", "material-complex-dark", "material-reduced-transparency", "material-live-luma-high-low", "material-live-luma-injected-failure"], ["luminance/edge ordering", "content legibility", "backdrop response and sample provenance", "semantic role/material match", "typed no-sample failure"]),
        deps: ["BI.W-P015"],
        locks: ["global-material", "global-tokens"],
    }),
    wave({
        id: "BI.W-P017",
        title: "Liquid Glass functional-plane anatomy",
        band: "design-foundation",
        intent: "Unify glass construction for controls, navigation, menus, and transient chrome without turning content into glass.",
        scope: [
            "Define one functional-plane anatomy: content-aware ground, diffuse body, separating edge, restrained specular, interaction lens.",
            "Remove glow halos, gray wash, duplicate pseudo-elements, and component-specific glass recipes.",
            "Expose semantic states for rest/hover/press/selected/drag/disabled and keep content ink stable.",
            "Budget nested backdrops and make violation visible rather than silently flattening it.",
        ],
        subjects: [
            ...tree("src/styles/glass", "modify"),
            ...subjects(["src/styles/glass.css", "src/styles/glass-refract.css", "src/styles/glass-specular-track.css", "src/composables/glass/useFunctionalPlane.ts", "tests-visual/functional-glass.spec.ts"]),
        ],
        repairs: repair({
            imports: ["src/styles/index.css", "src/composables/glass/index.ts"],
            tests: ["tests-visual/functional-glass.spec.ts"],
            build: ["vite.style-assets.ts"],
            docs: ["DESIGN.md"],
        }),
        invariant: "All functional glass consumes one anatomy and state grammar; content surfaces do not opt in by aesthetic variant.",
        bite: "Restore a component-local backdrop/filter recipe with its own specular pseudo-element and require anatomy/ownership evidence to turn RED.",
        invariants: ["design.material-hierarchy", "design.material-hierarchy", "architecture.component-topology"],
        pi: piBrowser(["functional-rest-complex", "functional-hover", "functional-press", "functional-selected", "functional-drag", "functional-disabled"], ["edge/luma separation", "specular restraint", "ink stability", "nested backdrop depth"]),
        deps: ["BI.W-P016"],
        locks: ["global-material", "glass-substrate"],
    }),
    wave({
        id: "BI.W-P018",
        title: "Depth, concentricity, radius, and shadow grammar",
        band: "design-foundation",
        intent: "Make elevation and nested geometry monotonic, concentric, and restrained across components and overlays.",
        scope: [
            "Derive child radii/insets from parent geometry and semantic size rather than independent literals.",
            "Collapse cartoon/glass/elevation shadow aliases into one semantic depth grammar.",
            "Remove double shadows, glow stacks, dead radius variants, and shape mismatches at narrow/coarse sizes.",
            "Measure overlay/content ordering on representative nested scenarios.",
        ],
        subjects: subjects([
            "src/styles/theme/radius.css", "src/styles/tokens/shadow.css", "src/styles/utilities/metal.css",
            "src/styles/material/depth.css", "src/components/_shared/geometry.ts", "tests-visual/depth-grammar.spec.ts",
        ]),
        repairs: repair({
            imports: uniq(paths("src").filter((path) => /\.(?:css|vue)$/.test(path))),
            tests: ["tests-visual/depth-grammar.spec.ts"],
            docs: ["DESIGN.md"],
        }),
        invariant: "Nested geometry is concentric and depth signals increase monotonically by semantic level without a second shadow authority.",
        bite: "Set an inner control radius larger than its containing surface and require geometric sampling to fail.",
        invariants: ["design.material-hierarchy", "design.token-graph", "design.material-hierarchy"],
        pi: piBrowser(["depth-controls", "depth-card-overlay", "depth-dark", "depth-narrow"], ["radius concentricity", "edge/shadow ordering", "absence of glow/double shadow"]),
        deps: ["BI.W-P016"],
        locks: ["global-material", "global-tokens"],
    }),
    wave({
        id: "BI.W-P019",
        title: "Audacious display type and disciplined text hierarchy",
        band: "design-foundation",
        intent: "Create a distinctive left-weighted display gesture while making all reading/UI rungs coherent and font-load stable.",
        scope: [
            "Define display, title, heading, body, label, code, and numeric roles as a coordinated semantic scale.",
            "Make story heroes optically fitted and deliberately asymmetric without clipping or template sameness.",
            "Delete arbitrary component text-size/weight recipes and fallback-face geometry drift.",
            "Validate hierarchy at narrow/wide, light/dark, zoom, and font-swap states.",
        ],
        subjects: [
            ...tree("src/styles/typography", "modify"),
            ...subjects(["src/styles/typography.css", "src/styles/fonts.css", "demo/chassis/hero/StoryHero.vue", "demo/chassis/hero/story-hero.css", "tests-visual/typography-system.spec.ts"]),
        ],
        repairs: repair({
            imports: ["src/styles/index.css", "demo/demo.css", "demo/chassis/hero/StoryHeader.vue"],
            tests: ["tests-visual/typography-system.spec.ts"],
            build: ["vite.style-assets.ts"],
            docs: ["DESIGN.md", "README.md"],
        }),
        invariant: "Every text node resolves to a semantic role, hierarchy never inverts, display type is distinctive, and font loading does not move layout materially.",
        bite: "Make a field label larger/heavier than its section heading and remove one fallback metric override; both must fail.",
        invariants: ["design.typography", "design.responsive-touch", "performance.experience"],
        pi: piBrowser(["type-home-wide", "type-story-narrow", "type-dark", "type-font-swap", "type-200-percent-zoom"], ["role hierarchy", "line wrapping", "overflow", "layout shift", "display signature"]),
        deps: ["BI.W-P015"],
        locks: ["global-typography", "demo-hero"],
    }),
    wave({
        id: "BI.W-P020",
        title: "Restrained accent and semantic color-event grammar",
        band: "design-foundation",
        intent: "Replace page-local palette drift with semantic ink/material/status/accent roles and one deliberate color event per major composition.",
        scope: [
            "Unify CSS, Canvas, GLSL, and WGSL color inputs through typed semantic roles and the shared linear-light resolver.",
            "Delete teal/navy default drift, dead brand aliases, and color-only state distinctions.",
            "Define where an accent event is allowed and make ordinary structure warm/neutral.",
            "Validate gamut, dark resolution, contrast, forced colors, and procedural handoff.",
        ],
        subjects: [
            ...tree("src/composables/color", "modify"),
            ...subjects(["src/styles/tokens/color.css", "src/styles/theme.css", "src/composables/glass/canvas2d/resolveCanvasColor.ts", "tests-visual/color-grammar.spec.ts"]),
        ],
        repairs: repair({
            imports: uniq(grepPaths("--(primary|accent|viz-|status-)|resolve.*Color", ["src", "demo"])),
            tests: ["tests-visual/color-grammar.spec.ts", "tests/composables/color/color-contract.test.ts"],
            docs: ["DESIGN.md"],
        }),
        invariant: "Color roles are semantic and linear-light consistent; state remains legible without hue and each composition has at most its declared accent event.",
        bite: "Reintroduce a brand-red selected state with no noncolor signal and require contrast/affordance to fail.",
        invariants: ["design.contrast", "design.affordance", "procedural.color", "design.token-graph"],
        pi: piBrowser(["color-light", "color-dark", "color-forced", "color-complex-backdrop"], ["contrast", "semantic role resolution", "noncolor state signal", "gamut/readback consistency"]),
        deps: ["BI.W-P015"],
        locks: ["global-color", "global-tokens"],
    }),
    wave({
        id: "BI.W-P021",
        title: "Responsive geometry and coarse/fine input contract",
        band: "design-foundation",
        intent: "Make supported widths and input modes semantic product states rather than a pile of local media-query exceptions.",
        scope: [
            "Define named narrow/compact/wide layout behaviors and coarse/fine control geometry from semantic tokens.",
            "Remove hidden controls, unreachable overflow, duplicate mobile wrappers, and component-local touch floors.",
            "Preserve focus order and equivalent actions across layout changes.",
            "Exercise zoom and dynamic viewport changes in modern Safari and Chrome.",
        ],
        subjects: subjects([
            "src/styles/tokens/size.css", "src/styles/utilities/responsive.css", "src/components/_shared/control-size.ts",
            "demo/shell/AppShell.vue", "tests-visual/responsive-input.spec.ts",
        ]),
        repairs: repair({
            imports: uniq(grepPaths("pointer: coarse|hover: hover|@container|--ui-scale|control-size", ["src", "demo"])),
            tests: ["tests-visual/responsive-input.spec.ts"],
            docs: ["DESIGN.md"],
        }),
        invariant: "Every primary action remains visible, reachable, ordered, and adequately sized across declared widths/input modes without a duplicate component path.",
        bite: "Hide a desktop control at narrow width without an equivalent action and require reachability to fail.",
        invariants: ["design.responsive-touch", "behavior.focus-escape", "performance.experience"],
        pi: piBrowser(["narrow-coarse", "narrow-keyboard", "wide-fine", "dynamic-resize", "zoom-200"], ["target geometry", "reachability", "overflow", "focus order", "layout stability"]),
        deps: ["BI.W-P015"],
        locks: ["global-responsive", "demo-shell"],
    }),
    wave({
        id: "BI.W-P022",
        title: "Accessibility material and interaction modes",
        band: "design-foundation",
        intent: "Treat reduced transparency, increased contrast, forced colors, reduced motion, keyboard, and zoom as complete design modes.",
        scope: [
            "Consolidate mode resolution after tokens/materials so adaptations replace rather than fight the base cascade.",
            "Ensure focus, selection, error, hierarchy, and glass/content separation remain explicit in every mode.",
            "Delete compatibility-class branches where current Safari/Chrome semantics are sufficient while retaining first-class accessibility adaptations.",
            "Run the entire rendered story roster through applicable mode matrices.",
        ],
        subjects: [
            ...tree("src/styles/glass/a11y-fallback.css", "modify"),
            ...subjects(["src/styles/utilities/a11y-overrides.css", "src/styles/accessibility.css", "tests-visual/accessibility-modes.spec.ts"]),
            future("tests/a11y/story-contract.test.ts"),
        ],
        repairs: repair({
            imports: ["src/styles/index.css", "demo/demo.css"],
            tests: ["tests-visual/accessibility-modes.spec.ts", "tests/a11y/story-contract.test.ts"],
            docs: ["DESIGN.md", "README.md"],
        }),
        invariant: "Accessibility modes preserve complete meaning and hierarchy; no required state disappears when visual effects or color are removed.",
        bite: "Remove the selected boundary under forced colors and keep only hue; the mode matrix must fail.",
        invariants: ["design.adaptive-accessibility", "design.contrast", "behavior.focus-escape", "motion.reduced"],
        pi: piBrowser(["reduced-transparency", "contrast-more", "forced-colors", "reduced-motion", "keyboard-only", "zoom-200"], ["state visibility", "focus", "contrast", "material replacement", "no hidden action"]),
        deps: ["BI.W-P016", "BI.W-P019", "BI.W-P020", "BI.W-P021"],
        locks: ["global-accessibility", "style-assembly"],
    }),
];

const motionWaves = [
    wave({
        id: "BI.W-P023",
        title: "Direct keyframes.js boundary and Glass-owned motion vocabulary",
        band: "motion",
        intent: "Make keyframes.js the direct authority for its engine primitives while Glass publishes only its owned Vue bindings, semantic spring language, and authoring component—without a distribution mirror or foreign-demo clone.",
        scope: [
            "Read the pinned keyframes.js public semantics only to classify direct upstream dependencies, Glass-owned bindings, and forbidden republishing; no upstream export roster or demo taxonomy becomes a Glass contract.",
            "Delete suite.ts and its /motion keyframes root re-export. /motion retains Glass-owned Vue/composable APIs and semantic preset data; a consumer that needs NumericAnimation, SpringProgress, ViewTransition helpers, or another upstream primitive imports keyframes.js directly.",
            "Delete curves.ts, /motion-curves from the generated entry graph/package/types/build, and every reverse CSS-token→JS callable-table test or document. CSS aliases do not owe JavaScript rows; semantic JS consumers read the owning preset or upstream callable directly.",
            "Preserve /easing as the legitimate Glass-owned EasingPicker/EasingConfigurator component boundary: its UI imports value.js/keyframes.js at the actual math/playback seam and never justifies a catalogue mirror.",
            "Replace the live Curve Gallery's FULL/1:1 foreign inventory with a Glass motion lab derived from SPRING_PRESETS, actual Glass transition semantics, and EasingPicker; every displayed parameter is generated from the callable's owner and causal playback uses declared engine authority.",
            "Rebuild every exact tracked consumer against the packed candidate and add owner-packet evidence for keyframes.js adoption without mutating its clean branch; adding an upstream export must require no Glass source change.",
        ],
        subjects: [
            current("src/composables/motion/curves.ts", "delete"),
            current("src/composables/motion/suite.ts", "delete"),
            current("tests/composables/motion/curves.test.ts", "delete"),
            current("tests/composables/motion/convergence.test.ts", "delete"),
            current("demo/stories/motion/curve-families.ts", "delete"),
            ...subjects([
                "src/composables/motion/springPresets.ts", "src/composables/motion/index.ts", "src/composables/motion/README.md",
                "src/components/easing/README.md", "demo/stories/motion/curve-gallery.vue",
                "tests/composables/motion/dependency-boundary.test.ts", "package.json", "scripts/lib/subpath-policy.mjs",
            ]),
        ],
        repairs: repair({
            imports: uniq([
                ...grepPaths("MOTION_CURVES|motionCurve|motion-curves|composables/motion/suite|from [\\\"']@mkbabb/glass-ui/motion[\\\"']", ["src", "demo", "tests", "tests-visual"]),
                "src/composables/motion/index.ts", "src/composables/motion/core/index.ts", "src/index.ts",
            ]),
            tests: ["tests/composables/motion/dependency-boundary.test.ts", "tests/public-surface.spec.ts", "tests-visual/motion-demo.spec.ts", "tests-visual/motion2.spec.ts"],
            build: ["package.json", "scripts/lib/subpath-policy.mjs", "vite.config.ts", "vite.library.ts", "tsconfig.build.json"],
            docs: ["DESIGN.md", "MIGRATION.md", "docs/tranches/BI/coordination/asks-and-consumes.md"],
        }),
        invariant: "Upstream engine primitives have one direct upstream authority; Glass publishes only owned motion bindings, semantic presets, and the /easing component, with no root-barrel mirror, reverse token-callable table, foreign-demo parity contract, stale displayed parameter, or consumer break.",
        bite: "Add a keyframes export and require no Glass diff; restore one upstream re-export or /motion-curves row and require entry/dependency evidence RED; hard-code a stale spring label and require the live Glass motion scenario RED even while its animation still moves.",
        invariants: ["integrity.dependencies", "motion.spring-language", "architecture.import-boundaries", "architecture.clean-break", "integrity.entry-graph", "demo.scenario-contract"],
        pi: piBrowser(["motion-owned-springs", "motion-owned-authoring", "motion-upstream-import-negative", "motion-stale-label-negative", "motion-prm"], ["packed export boundary", "direct upstream owner", "displayed/callable parameter equality", "causal trajectory", "no foreign inventory claim", "PRM final state"]),
        deps: ["BI.W-P014", "BI.W-P015", "BI.W-P022"],
        locks: ["motion-vocabulary", "package-manifest", "entry-graph", "demo-motion"],
        archaeology: ["Current suite.ts hard-codes a stale upstream export roster; curves.ts publishes a consumerless reverse token table; the live 1:1 gallery displays five stale spring parameter labels while every tracked sibling has zero /motion-curves imports."],
    }),
    wave({
        id: "BI.W-P024",
        title: "Motion API clean break — aliases, legacy names, and shadow writers",
        band: "motion",
        intent: "Remove every preserved motion alias and compatibility ladder before new behavior builds on the public contract.",
        scope: [
            "Delete Countup and AnimatedNumber aliases, old curve aliases, deprecated props, and dual CSS/JS state writers.",
            "Rename surviving APIs once at their semantic owner and regenerate migration rows from symbol diff.",
            "Classify native-feature capability handling separately from API compatibility and delete unsupported old-browser shadows for the Safari/Chrome floor.",
            "Re-evaluate every retained public motion primitive from current syntax/import/runtime evidence: tests, type-only imports, barrels, docs, registry rows, and future asks contribute no product-demand credit; an unowned primitive and its self-justifying tests are deleted together.",
            "Retire --ease-convergence and its reverse-table/test/prose projections: the exact tracked constellation has no product reader, and a future Fourier sentence cannot preserve an alias of gentle in advance.",
            "Retire the public-but-unused vScrollRevealOnce directive, [data-scroll-reveal-once] CSS/capture branch, and its self-test while preserving the shared useStaggerReveal once semantics used by actual owners; the demo's separate private section reveal remains under its own semantic owner rather than becoming retroactive demand.",
            "Repoint all local consumers/tests atomically; foreign consumers receive exact owner packets.",
        ],
        subjects: [
            current("tests/composables/motion/scroll-reveal-once.test.ts", "delete"),
            ...subjects([
                "src/composables/motion/useCountup.ts", "src/composables/motion/useAnimatedNumber.ts", "src/composables/motion/useStaggerReveal.ts", "src/composables/motion/index.ts",
                "src/styles/tokens/scheme-motion.css", "src/styles/tokens/scheme-spring.css", "src/styles/tokens/bridges.css", "src/styles/scroll-driven.css",
                "demo/capture/capture.css", "demo/chassis/section/useSectionReveal.ts", "MIGRATION.md",
            ]),
        ],
        repairs: repair({
            imports: uniq(grepPaths("Countup|AnimatedNumber|ease-convergence|scroll-reveal-once|vScrollRevealOnce|legacy|back-compat", ["src", "demo", "tests", "tests-visual"])),
            tests: ["tests/composables/motion/clean-break.test.ts", "tests/composables/motion/scroll-reveal-once.test.ts"],
            build: ["package.json", "scripts/lib/subpath-policy.mjs"],
            docs: ["MIGRATION.md", "README.md", "DESIGN.md"],
        }),
        invariant: "A motion concept has one current name, one writer, and real runtime product ownership; no old import, prop, token, class, directive, runtime branch, prose future-consumer record, path-existence tally, alias definition, or unit test preserves or self-justifies a retired contract.",
        bite: "Restore `export type Countup = UseCountupReturn`, --ease-convergence, or vScrollRevealOnce with only its own test/demo prose, and require clean-break/topology evidence to stay RED without relying on a comment or fixed consumer count.",
        invariants: ["architecture.clean-break", "integrity.entry-graph", "architecture.present-tense-source"],
        pi: piNone("API deletion and writer census are device-free; behavior-equivalent consumer tests bind repoints."),
        deps: ["BI.W-P023"],
        locks: ["motion-vocabulary", "entry-graph"],
    }),
    wave({
        id: "BI.W-P025",
        title: "Temporal authority and lifecycle",
        band: "motion",
        intent: "Give every animated property and semantic episode one proportionate temporal authority, one writer, and a complete lifecycle without pretending the product has one global callback.",
        scope: [
            "Classify every current scheduler as upstream managed physics playback, Glass continuous field/render lifecycle, native/CSS timeline, one-shot read/write coalescer, or discrete semantic timer; an unclassified loop is a defect, while mechanism diversity is not.",
            "Keep @mkbabb/keyframes.js RAFPlayback as the owner of SpringProgress/SmoothProgress/ElementMorph playback; keep useRAFLoop/canvas lifecycle for Glass-owned continuous fields and renderers; keep one-shot rAF for event coalescing and cancellable timers for discrete type semantics.",
            "Instrument property/episode ownership so native/CSS and JavaScript writers never overlap and a keyframes import cannot legalize an unrelated local rAF loop.",
            "Resolve every animated custom property's final sinks and classify the resulting channels as layout, paint, or composite. A property-name whitelist cannot grant compositor credit; necessary layout reclaim is an owner-specific semantic exception measured in the live browser, never a permanent filename allowlist.",
            "Delete local physical/easing playback loops, timer-settle approximations, and restart duplication; the Springs playground and morph facilities consume the same engine playback they advertise.",
            "Classify authoring previews explicitly: a bounded normalized editor scrubber may retain a proportionate one-shot clock only when it is not represented as reusable physical/keyframes playback and owns playing, restart, PRM snap, and teardown semantics; a surface that claims keyframes ownership must actually consume that owner.",
            "Compose visibility, intersection, PRM, interruption, settle, and disposal as applicable, and prove every scheduler/listener/timer/resource returns to baseline.",
        ],
        subjects: subjects([
            "src/composables/motion/useRAFLoop.ts", "src/composables/motion/useIntersectionPause.ts", "src/composables/motion/constants.ts",
            "src/composables/motion/core/index.ts", "src/composables/motion/temporalAuthority.ts", "tests/composables/motion/temporal-authority.test.ts",
        ]),
        repairs: repair({
            imports: uniq(grepPaths("requestAnimationFrame|cancelAnimationFrame|setTimeout|setInterval|useRAFLoop|RAFPlayback|SpringProgress|animation-timeline", ["src", "demo"])),
            tests: ["tests/composables/motion/temporal-authority.test.ts", "tests-visual/motion-temporal-authority.spec.ts"],
            docs: ["DESIGN.md"],
        }),
        invariant: "Every animated property and semantic episode has one declared temporal authority and writer appropriate to its mechanism; its resolved channel is truthfully classified as layout, paint, or trace-supported composite; overlapping writers, local physics/easing loops, orphan work, permanent filename exceptions, and silent scheduler substitution are absent, while pause/settle/interruption/teardown are deterministic.",
        bite: "Add a component-local rAF writing transform beside SpringProgress playback, keep a JS shadow beside a native timeline, strand a typewriter timer after cancel, or animate --probe into width while calling it compositor-safe; temporal/channel evidence must turn RED without a global rAF count or filename allowlist.",
        invariants: ["motion.single-clock", "procedural.lifecycle", "performance.resource-ownership", "performance.experience", "design.token-graph"],
        pi: piBrowser(["physics-visible", "continuous-offscreen", "native-js-exclusive", "channel-layout", "channel-paint", "channel-composite", "custom-property-layout-negative", "coalescer-burst", "typewriter-cancel", "hidden-resume", "prm", "teardown"], ["authority class", "property/episode writer identity", "resolved channel/sink graph", "CLS/main-thread/frame trace", "compositing evidence", "frame/timer submission", "pause/settle/interruption continuity", "teardown baseline"]),
        deps: ["BI.W-P024"],
        locks: ["motion-clock"],
    }),
    wave({
        id: "BI.W-P026",
        title: "Spring families as semantic motion tokens",
        band: "motion",
        intent: "Replace arbitrary per-component timing with a small semantic spring language shared by press, selection, morph, dock, and route motion.",
        scope: [
            "Define named spring families by behavior and state transition, not raw numeric aliases.",
            "Map each current consumer to a family or delete its redundant local spring.",
            "Keep SPRING_PRESETS as the parameter authority used directly by Glass JS consumers and generated CSS; do not recreate MOTION_CURVES or require one JS callable row per CSS alias.",
            "Derive every demo label, parameter readout, trajectory, and explanatory row from the same preset/callable owner; a moving animation with a stale number is still RED.",
            "Repair consumer-owned reveal CSS that pairs --spring-bouncy with a literal 500 ms clock: a named spring curve and its generated duration reader come from the same row. Stagger spacing may have its own semantic interval, but its 0.70/1.00/1.30 tempo behavior must be explicit rather than inherited from an unexplained 80 ms literal.",
            "Rebuild the Springs lab as an exact generated projection rather than a solver lookalike: visible options/copy derive from the current owned rows, any Dock exclusion is explicit, seeded readouts use the same measured-settle maxDuration/sample/rounding configuration as shipped CSS, and managed playback reads the generated tempo horizon instead of fixed 1100 ms. Counts remain descriptive and adding a row requires no hand-edited numeral.",
            "Do not freeze an exact preset count or duplicate a taste value in verification; semantic ownership, current consumers, generated projection, and measured trajectory decide whether a family remains.",
            "Measure settle, overshoot, velocity continuity, and input-mode scaling as ranges.",
            "Keep duration curves only for transitions whose semantics are not physical springs.",
        ],
        subjects: subjects([
            "src/composables/motion/springPresets.ts", "src/composables/motion/useSpring.ts", "src/composables/motion/useSpringMount.ts",
            "src/styles/tokens/motion.css", "demo/stories/motion/reveal.vue", "demo/stories/motion/springs.vue", "tests-visual/spring-language.spec.ts",
        ]),
        repairs: repair({
            imports: uniq(grepPaths("SPRING_|springPresets|useSpring", ["src", "demo"])),
            tests: ["tests/composables/motion/spring-language.test.ts", "tests-visual/spring-language.spec.ts"],
            docs: ["DESIGN.md"],
        }),
        invariant: "Every spring-driven transition names one semantic family, reads its owning preset and generated horizon directly, stays within observed trajectory bands across input modes, and projects the same current parameters plus generation configuration into CSS, runtime, demos, and docs without a reverse alias table, lookalike solver call, or consumer-local fixed clock.",
        bite: "Replace press with the route-transition family, restore a token→callable mirror, display 0.32/0.7 while the Dock callable uses 0.30/0.82, pair --spring-bouncy with fixed 500 ms, or omit maxDuration in the seeded lab so its 24-stop readout differs from the shipped 48-stop token; spring-language evidence must turn RED even when the surface still settles.",
        invariants: ["motion.spring-language", "design.token-graph"],
        pi: piBrowser(["spring-press", "spring-selection", "spring-morph", "spring-route", "spring-seeded-readout-token-equality", "spring-derived-register-ui", "spring-reveal-stagger-0.70-1.00-1.30", "spring-coarse"], ["settle time range", "overshoot range", "velocity continuity", "semantic family match", "trajectory/duration/generation owner equality", "derived option/copy truth", "declared stagger tempo behavior"]),
        deps: ["BI.W-P025"],
        locks: ["motion-vocabulary", "global-tokens"],
    }),
    wave({
        id: "BI.W-P027",
        title: "Press language and tactile glass response",
        band: "motion",
        intent: "Unify press feedback across Button, Chip, Toggle, Dock controls, and icon controls without wrapper-specific engines.",
        scope: [
            "Compose one spring-press state model with pointer, keyboard, touch, disabled, cancellation, and re-entry semantics.",
            "Drive semantic press variables consumed by functional glass and geometry; delete component-local scale/timer recipes.",
            "Make one public press composable the configuration surface; fold useSpringPress into its private engine leaf and repoint Button's gate-preserving direct useSpringPress+useLiquidFlex reconstruction onto the same owner as Card and DockControl.",
            "Treat the CSS :active rule as a no-JS/pre-hydration capability phase that yields when the JS owner arms; it may not write scale concurrently with the live spring.",
            "Keep Button and other public components as consumers, not alternate press authorities or source-shape exceptions.",
            "Validate target stability, cancellation, focus visibility, and reduced motion.",
        ],
        subjects: subjects([
            "src/composables/motion/useSpringPress.ts", "src/composables/motion/useLiquidPress.ts", "src/components/button/Button.vue",
            "src/styles/motion/press.css", "tests-visual/press-language.spec.ts",
        ]),
        repairs: repair({
            imports: uniq(grepPaths("useSpringPress|useLiquidPress|--.*press", ["src", "demo"])),
            tests: ["tests/composables/motion/press.test.ts", "tests-visual/press-language.spec.ts"],
            docs: ["DESIGN.md"],
        }),
        invariant: "All pressable concepts use one state/physics contract and remain visibly, accessibly pressed without moving the hit target or masking focus.",
        bite: "Rebuild useSpringPress+useLiquidFlex directly in Button, or leave its CSS :active scale live beside the armed JS spring; topology/writer/trajectory evidence must turn RED.",
        invariants: ["motion.single-clock", "motion.spring-language", "design.affordance", "motion.reduced"],
        pi: piBrowser(["press-pointer", "press-keyboard", "press-touch-cancel", "press-disabled", "press-prm"], ["scale/displacement", "hit-target stability", "focus visibility", "cancel/re-entry state"]),
        deps: ["BI.W-P026", "BI.W-P017"],
        locks: ["motion-press", "component-button"],
    }),
    wave({
        id: "BI.W-P028",
        title: "Single FLIP and morph engine",
        band: "motion",
        intent: "Collapse element, liquid, bloom, drag, and dock morph wrappers onto one measurable spatial-transition engine.",
        scope: [
            "Make useElementMorph the single geometry/FLIP runner with explicit source/destination ownership and interruption semantics.",
            "Compose reveal, dock CTA receive, bloom, and drag morph as configurations rather than private runners.",
            "Delete duplicate measurement, rAF, lock, and transform writers.",
            "Preserve focus/identity and handle source removal, resize, and interruption deterministically.",
            "Resolve D4 liquid-morph M3 by measuring the interactive source/destination target: retain the 44px floor only where it is an actual coarse-input target, never as a universal visual-size literal.",
        ],
        subjects: subjects([
            "src/composables/motion/useElementMorph.ts", "src/composables/motion/useLiquidReveal.ts", "src/composables/motion/useDockCtaReceive.ts",
            "src/composables/motion/useBloomUp.ts", "src/composables/motion/bloomUpField.ts", "src/composables/motion/morphSignatures.ts",
            "tests-visual/morph-engine.spec.ts",
        ]),
        repairs: repair({
            imports: uniq(grepPaths("ElementMorph|useElementMorph|useLiquidReveal|useBloomUp|useDockCtaReceive", ["src", "demo"])),
            tests: ["tests/composables/motion/morph-engine.test.ts", "tests-visual/morph-engine.spec.ts"],
            docs: ["DESIGN.md"],
        }),
        invariant: "Exactly one spatial-transition runner owns measurement and transforms; every morph preserves identity/focus and survives interruption.",
        bite: "Fork a second rAF/ElementMorph runner inside useBloomUp and require ownership evidence to turn RED.",
        invariants: ["motion.single-clock", "motion.transition-continuity", "performance.resource-ownership"],
        pi: piBrowser(["morph-source-destination", "morph-interrupt", "morph-resize", "morph-source-removed", "morph-prm"], ["geometry continuity", "writer ownership", "focus/identity", "final transform cleanup"]),
        deps: ["BI.W-P026"],
        locks: ["motion-morph"],
    }),
    wave({
        id: "BI.W-P029",
        title: "Enter/exit and View Transition continuity",
        band: "motion",
        intent: "Use modern native transitions where they preserve identity and one explicit instant path where motion is unavailable or reduced.",
        scope: [
            "Unify discrete enter/exit, route, and shared-element recipes around semantic transition ownership.",
            "Use startViewTransition in supported Safari/Chrome without a competing visual writer; unsupported/reduced state updates instantly and visibly.",
            "Delete stale CSS name aliases, transition timers, and page-local route animations.",
            "Delete ModalOverlay's forward-reserved/no-op option spellings: scale and slide cannot alias fade, edge cannot alias centered, and an unused none branch cannot survive merely as hypothetical host accommodation. Retain only distinct current behavior owned by the composed Dialog/overlay episode.",
            "Repair the live Motion Tempo contract at the composed overlay boundary: panel, trigger, portaled scrim, close/reverse, and newly constructed Dock morph each expose their effective clock at 0.70 and 1.30. Distinct base durations may remain, but every channel advertised as co-scaled must change by the same 13/7 factor; the current fixed --duration-panel scrim cannot hide behind a correctly scaled glass-reveal panel.",
            "Preserve focus, scroll ownership, and final DOM visibility through interruption.",
        ],
        subjects: [
            ...subjects([
                "src/composables/motion/useViewTransition.ts", "src/styles/view-transition.css", "src/styles/transitions.css", "src/styles/animations.css",
                "src/styles/utilities/btn.css", "demo/stories/motion/tempo.vue", "demo/stories/motion/reveal.vue",
                "demo/shell/useShellNavDock.ts", "tests-visual/transition-continuity.spec.ts",
            ]),
            flatCurrent("ui", "_shared", "ModalOverlay.vue"),
        ],
        repairs: repair({
            imports: uniq(grepPaths("startViewTransition|view-transition|transition-behavior|@starting-style", ["src", "demo"])),
            tests: ["tests/composables/motion/view-transition.test.ts", "tests-visual/transition-continuity.spec.ts"],
            docs: ["DESIGN.md"],
        }),
        invariant: "Every enter/exit/route transition has one owner, preserves focus/identity, updates instantly without visual residue when native motion is unavailable/reduced, and projects any advertised tempo scaling through every channel of the composed episode rather than only its focal panel.",
        bite: "Run a CSS route animation while View Transition owns the same subtree, or leave a Dialog scrim at fixed --duration-panel while its story claims every overlay co-scales 0.70→1.30; ownership/ratio evidence must turn RED.",
        invariants: ["motion.transition-continuity", "motion.single-clock", "motion.reduced", "behavior.focus-escape"],
        pi: piBrowser(["route-native", "route-interrupt", "overlay-discrete", "overlay-tempo-0.70", "overlay-tempo-1.30", "overlay-tempo-reverse", "route-prm", "route-focus"], ["identity continuity", "focus", "final visibility", "writer count", "panel/scrim/trigger normalized clock ratio", "no flash"]),
        deps: ["BI.W-P028"],
        locks: ["motion-transition", "demo-shell"],
    }),
    wave({
        id: "BI.W-P030",
        title: "Native scroll timelines and single-owner scroll state",
        band: "motion",
        intent: "Make native scroll-driven animation primary on modern Safari/Chrome and eliminate redundant JS shadow writers.",
        scope: [
            "Map scroll progress, reveal, pin, and chrome concepts to named owning scrollers and native timelines where semantics match.",
            "Retain JavaScript only for measurement/behavior CSS cannot express; never run it concurrently with the native writer.",
            "Delete document-global listeners for component scrollers and obsolete old-engine class fallbacks.",
            "Measure monotonicity, main-thread work, resize behavior, PRM, and fast scrollbar drag.",
            "Bind the actual Safari/Chrome build and feature probes, then exercise dynamic pause/resume, 0%/100% boundary progress, bfcache back/forward restoration, nested scrollers, and scroll-padding focus reveal—the documented engine bug classes that feature presence alone cannot close.",
        ],
        subjects: subjects([
            "src/composables/motion/scrollReader.ts", "src/composables/motion/supportsCssTimeline.ts", "src/composables/motion/useScrollProgress.ts",
            "src/composables/motion/useScrollScene.ts", "src/composables/motion/useScrollTrigger.ts", "src/composables/motion/useStaggerReveal.ts",
            "src/styles/scroll-driven.css", "src/styles/scroll-choreography.css", "tests-visual/scroll-motion.spec.ts",
        ]),
        repairs: repair({
            imports: uniq(grepPaths("scroll-timeline|animation-timeline|useScroll|scrollReader", ["src", "demo"])),
            tests: ["tests/composables/motion/scroll-owner.test.ts", "tests-visual/scroll-motion.spec.ts"],
            docs: ["DESIGN.md"],
        }),
        invariant: "Each scroll-linked property has one owner/scroller and one active writer; on an exact browser build, supported native timelines run without a JS shadow and preserve pause, boundary, bfcache, resize, nested-scroller, focus-reveal, and PRM semantics.",
        bite: "Enable useScrollProgress writes while animation-timeline is active, or pass from a feature probe while bfcache restoration returns the wrong progress; writer/state-matrix instrumentation must fail.",
        invariants: ["motion.scroll", "motion.single-clock", "performance.experience", "motion.reduced"],
        pi: piBrowser(["scroll-safari", "scroll-chrome", "scroll-dynamic-pause", "scroll-boundaries", "scroll-bfcache", "scroll-nested", "scroll-focus-reveal", "scroll-resize", "scroll-prm", "scroll-fast-drag"], ["exact browser build/feature probes", "monotonic progress", "owning scroller", "writer count", "pause/resume and restored state", "main-thread work", "final state"]),
        deps: ["BI.W-P025"],
        locks: ["motion-scroll"],
    }),
    wave({
        id: "BI.W-P031",
        title: "Reduced-motion semantics across the full motion graph",
        band: "motion",
        intent: "Remove travel and continuous animation under PRM while retaining immediate, causal, legible state changes.",
        scope: [
            "Make PRM one reactive authority consumed by CSS, springs, transitions, procedural loops, dock, and demo scenarios.",
            "Classify each motion as essential state, optional travel, continuous ambience, or input feedback and define its PRM resolution.",
            "Delete local media-query contradictions and code paths that hide final state when animation is disabled.",
            "Run every enrolled visual scenario with PRM and assert final state/latency/no continuous work.",
        ],
        subjects: subjects([
            "src/composables/motion/useReducedMotion.ts", "src/styles/motion/reduced.css", "src/composables/motion/useRAFLoop.ts",
            "tests-visual/reduced-motion-graph.spec.ts",
        ]),
        repairs: repair({
            imports: uniq(grepPaths("prefers-reduced-motion|reducedMotion|PRM", ["src", "demo"])),
            tests: ["tests/composables/motion/reduced.test.ts", "tests-visual/reduced-motion-graph.spec.ts"],
            docs: ["DESIGN.md"],
        }),
        invariant: "PRM yields immediate complete state, no nonessential travel/continuous work, and one reactive authority across CSS and JS.",
        bite: "Leave one procedural ambience loop active under PRM and require scheduler instrumentation to fail.",
        invariants: ["motion.reduced", "procedural.lifecycle", "design.adaptive-accessibility"],
        pi: piBrowser(["prm-route", "prm-overlay", "prm-dock", "prm-selection", "prm-procedural", "prm-demo"], ["final state", "latency", "zero continuous frames", "focus causality"]),
        deps: ["BI.W-P022", "BI.W-P025"],
        locks: ["motion-clock", "global-accessibility"],
    }),
    wave({
        id: "BI.W-P032",
        title: "Pointer velocity, drag, and coarse-input motion",
        band: "motion",
        intent: "Unify pointer velocity/drag fields with bounded semantic mappings and coarse-input equivalents.",
        scope: [
            "Make one velocity sampler and normalized field mapping serve drag morph, dock response, blob interaction, and applicable components.",
            "Delete private samplers, frame-rate-dependent gains, and fine-pointer assumptions.",
            "Bound displacement/scale/settle and preserve cancellation, capture, touch, keyboard, and PRM semantics.",
            "Separate direct manipulation from decorative hover response.",
        ],
        subjects: subjects([
            "src/composables/motion/usePointerVelocityField.ts", "src/composables/motion/pointerFieldMappings.ts", "src/composables/motion/useDragMorph.ts",
            "src/composables/motion/useRoutePointer.ts", "tests-visual/pointer-drag.spec.ts",
        ]),
        repairs: repair({
            imports: uniq(grepPaths("PointerVelocity|pointerField|useDragMorph|pointermove", ["src", "demo"])),
            tests: ["tests/composables/motion/pointer-field.test.ts", "tests-visual/pointer-drag.spec.ts"],
            docs: ["DESIGN.md"],
        }),
        invariant: "Pointer/drag response uses one normalized sampler, stays bounded and frame-rate independent, and has coherent coarse/keyboard/PRM behavior.",
        bite: "Double velocity gain only at 120Hz and require cross-rate trajectory comparison to fail.",
        invariants: ["motion.spring-language", "motion.single-clock", "design.responsive-touch", "motion.reduced"],
        pi: piBrowser(["pointer-60hz", "pointer-120hz", "drag-cancel", "drag-touch", "drag-keyboard-equivalent", "drag-prm"], ["normalized velocity", "displacement bounds", "capture/cancel", "settle", "input equivalence"]),
        deps: ["BI.W-P026"],
        locks: ["motion-pointer"],
    }),
];

const dockWaves = [
    wave({
        id: "BI.W-P033",
        title: "Dock deterministic state machine",
        band: "dock",
        intent: "Make selection, context, layer, hold, overflow, morph, and escape one explicit public state machine rather than interacting composable side effects.",
        scope: [
            "Define states/events/guards/effects for idle, selected, layered, held, overflowing, morphing, and disabled conditions.",
            "Collapse useDockState/context/hold/click-integrity/popover forks into one transition authority with typed projections.",
            "Reject impossible combinations and make controlled/uncontrolled ownership explicit.",
            "Test event-order invariance, hydration, interruption, and nested dock independence.",
        ],
        subjects: subjects([
            "src/components/dock/composables/useDockState.ts", "src/components/dock/composables/dockContext.ts", "src/components/dock/composables/useDockHold.ts",
            "src/components/dock/composables/useDockClickIntegrity.ts", "src/components/dock/composables/useDockPopover.ts", "src/components/dock/dock-machine.ts",
            "tests/components/dock/dock-machine.test.ts",
        ]),
        repairs: repair({
            imports: ["src/components/dock/GlassDock.vue", "src/components/dock/DockLayerGroup.vue", "src/components/dock/DockTrigger.vue", "src/components/dock/index.ts"],
            tests: ["tests/components/dock/dock-machine.test.ts"],
            docs: ["src/components/dock/README.md", "DESIGN.md"],
        }),
        invariant: "Every public Dock state is reachable through one typed transition machine and impossible combinations cannot be represented or induced by event order.",
        bite: "Allow two exclusive layers to be open after reordered events and require model/property tests to fail.",
        invariants: ["behavior.dock", "architecture.component-topology", "architecture.clean-break"],
        pi: piNone("The state model is device-free; following Dock waves bind rendered projections."),
        deps: ["BI.W-P014", "BI.W-P024"],
        locks: ["component-dock-machine"],
    }),
    wave({
        id: "BI.W-P034",
        title: "Dock public anatomy and one-concept parts",
        band: "dock",
        intent: "Reduce the Dock family to a coherent set of semantic parts with one styling/state authority and no wrapper synonyms.",
        scope: [
            "Define the public anatomy for root, section, item/trigger, separator, layer, layer-group, stack, control, and crossfade only where each has distinct semantics.",
            "Fold or delete thin forwarding parts and duplicated props; expose slots/typed state instead of variant wrappers.",
            "Preserve APG Tabs semantics when the Dock composes selection; never fork keyboard rules.",
            "Regenerate exports/types/stories from the final anatomy and produce clean-break migration rows.",
        ],
        subjects: [
            ...flatTree("custom", "dock", "modify"),
            future("tests/components/dock/public-anatomy.test.ts"),
        ],
        repairs: repair({
            imports: componentRefs("dock", "Dock"),
            tests: ["tests/components/dock/public-anatomy.test.ts", "tests/components/custom/dock/DockLayerRail.a11y.test.ts"],
            build: ["package.json", "scripts/lib/subpath-policy.mjs"],
            docs: ["MIGRATION.md", "README.md", "src/components/dock/README.md"],
        }),
        invariant: "Every exported Dock part has unique semantics and consumes the same machine/material/motion authorities; no synonym wrapper or duplicated prop path survives.",
        bite: "Re-export a wrapper whose only behavior is forwarding props to DockTrigger and require concept topology to fail.",
        invariants: ["architecture.component-topology", "architecture.clean-break", "behavior.selection", "behavior.dock"],
        pi: piBrowser(["dock-anatomy-keyboard", "dock-anatomy-touch"], ["roles/states", "part reachability", "focus order", "selection semantics"]),
        deps: ["BI.W-P033"],
        locks: ["component-dock-public", "entry-graph"],
    }),
    wave({
        id: "BI.W-P035",
        title: "Dock functional-glass plate and content-aware lensing",
        band: "dock",
        intent: "Make Dock the flagship functional-plane expression: quiet at rest, legible over complex content, and alive only under interaction.",
        scope: [
            "Consume the shared functional-glass anatomy instead of Dock-owned duplicate glass recipes.",
            "Calibrate plate ground, edge, specular, selected luma lift, and content-aware contrast across rail/bottom modes.",
            "Remove metal/glow bands and nested backdrop layers that make Dock heavier than content.",
            "Resolve reduced transparency, increased contrast, forced colors, dark, and complex backgrounds explicitly.",
        ],
        subjects: subjects([
            "src/components/dock/GlassDock.vue", "src/components/dock/styles/plate.css", "src/components/dock/styles/shape.css",
            "src/components/dock/styles/material.css", "tests-visual/dock-material.spec.ts",
        ]),
        repairs: repair({
            imports: ["src/components/dock/styles/index.css", "src/components/dock/index.ts"],
            tests: ["tests-visual/dock-material.spec.ts"],
            docs: ["src/components/dock/README.md", "DESIGN.md"],
        }),
        invariant: "Dock uses one functional-glass plane with stable ink and perceptual separation over simple/complex content in every accessibility mode.",
        bite: "Add a nested backdrop-filter to a Dock item and require backdrop-depth/material evidence to turn RED.",
        invariants: ["design.material-hierarchy", "design.contrast", "design.adaptive-accessibility"],
        pi: piBrowser(["dock-material-light-simple", "dock-material-light-complex", "dock-material-dark-complex", "dock-material-reduced-transparency", "dock-material-forced-colors"], ["edge/luma separation", "ink contrast", "backdrop depth", "specular/glow bounds"]),
        deps: ["BI.W-P034", "BI.W-P017", "BI.W-P018"],
        locks: ["component-dock-material"],
    }),
    wave({
        id: "BI.W-P036",
        title: "Dock selection indicator and crossfade identity",
        band: "dock",
        intent: "Unify selected state, moving indicator, and panel crossfade as one identity-preserving selection projection.",
        scope: [
            "Drive selection from Tabs-compatible value semantics and the Dock state machine.",
            "Use one shared selection indicator/morph path; delete brand-color bars, duplicate selected backgrounds, and independent crossfade clocks.",
            "Preserve active panel semantics, focus, content identity, and controlled updates while making every inactive/crossfading face inert, accessibility-hidden, non-tabbable, non-hit-testable, and form-inactive before it can receive input.",
            "Calibrate indicator geometry and crossfade timing for rail/bottom, keyboard/pointer/touch, and PRM.",
        ],
        subjects: subjects([
            "src/components/dock/DockCrossfade.vue", "src/components/dock/composables/dockCrossfadeContext.ts", "src/components/dock/DockSection.vue",
            "src/components/dock/styles/crossfade.css", "src/components/dock/styles/selection.css", "tests-visual/dock-selection.spec.ts",
        ]),
        repairs: repair({
            imports: ["src/components/dock/GlassDock.vue", "src/components/dock/DockTrigger.vue", "src/components/tabs/index.ts"],
            tests: ["tests/components/dock/selection.test.ts", "tests-visual/dock-selection.spec.ts"],
            docs: ["src/components/dock/README.md"],
        }),
        invariant: "Dock selection has one semantic value, one indicator, and one transition owner; panel identity/focus survive every input path and exactly one active face contributes controls to accessibility, focus, hit-testing, and form state.",
        bite: "Add aria-pressed to Dock tabs, a second selected-background writer, or leave an opacity-zero inactive face's button focusable; selection/ownership/inactive-face checks must fail.",
        invariants: ["behavior.selection", "behavior.dock", "motion.transition-continuity", "design.affordance"],
        pi: piBrowser(["dock-select-keyboard", "dock-select-pointer", "dock-select-touch", "dock-controlled-update", "dock-select-prm"], ["ARIA selection", "indicator geometry continuity", "panel identity", "focus", "writer count"]),
        deps: ["BI.W-P034", "BI.W-P028"],
        locks: ["component-dock-selection"],
    }),
    wave({
        id: "BI.W-P037",
        title: "Dock layer stack, focus, and Escape ownership",
        band: "dock",
        intent: "Make nested Dock layers compose the central overlay/focus/escape stack with deterministic restoration.",
        scope: [
            "Project Dock layer state into one stack with explicit modality, containment, dismissal, and restoration rules.",
            "Remove private focus-scope and escape listeners where the central overlay infrastructure owns them.",
            "Handle teleported targets, nested popovers, trigger removal, and route changes without closing the wrong layer.",
            "Verify keyboard, pointer outside, touch, Escape, and PRM transition paths.",
        ],
        subjects: subjects([
            "src/components/dock/DockLayer.vue", "src/components/dock/DockLayerGroup.vue", "src/components/dock/DockStack.vue",
            "src/components/dock/composables/isTeleportedTarget.ts", "src/components/dock/composables/dockContext.ts",
            "tests-visual/dock-layer-stack.spec.ts",
        ]),
        repairs: repair({
            imports: ["src/components/_shared/overlay-stack.ts", "src/components/dock/DockTrigger.vue"],
            tests: ["tests/components/dock/layer-stack.test.ts", "tests-visual/dock-layer-stack.spec.ts"],
            docs: ["src/components/dock/README.md"],
        }),
        invariant: "The topmost eligible layer alone owns Escape/outside dismissal and focus restores to the correct live trigger or declared successor.",
        bite: "Open Dock layer plus nested Popover and make the first Escape close both; the stack test must fail.",
        invariants: ["behavior.focus-escape", "behavior.overlay-apg", "behavior.dock", "motion.transition-continuity"],
        pi: piBrowser(["dock-layer-keyboard", "dock-layer-popover", "dock-layer-touch-outside", "dock-layer-trigger-removed", "dock-layer-route-change"], ["stack order", "focus containment/restoration", "Escape owner", "outside-click owner"]),
        deps: ["BI.W-P033", "BI.W-P029"],
        locks: ["component-dock-layers", "overlay-stack"],
    }),
    wave({
        id: "BI.W-P038",
        title: "Dock overflow as an explicit layout state",
        band: "dock",
        intent: "Replace heuristic hiding and search/fit forks with one measurable overflow state that preserves every action.",
        scope: [
            "Measure available geometry through shared resize lifecycle and project visible/overflowed items deterministically.",
            "Expose overflow through a semantic menu/layer without duplicating actions or changing selection identity.",
            "Delete magic count/width thresholds, hidden unreachable controls, and resize feedback loops.",
            "Validate resize, font load, zoom, localization, rail/bottom, coarse/fine, and keyboard navigation.",
        ],
        subjects: subjects([
            "src/components/dock/composables/useDockOverflowFit.ts", "src/components/dock/composables/useDockSearch.ts", "src/components/dock/styles/overflow.css",
            "src/components/dock/DockTrigger.vue", "tests-visual/dock-overflow.spec.ts",
        ]),
        repairs: repair({
            imports: ["src/components/dock/GlassDock.vue", "src/components/dock/DockLayerGroup.vue"],
            tests: ["tests/components/dock/overflow.test.ts", "tests-visual/dock-overflow.spec.ts"],
            docs: ["src/components/dock/README.md"],
        }),
        invariant: "Every Dock action remains reachable exactly once and overflow derives from measured geometry without feedback loops or fixed item counts.",
        bite: "Hide one overflowed item without adding it to the overflow layer and require reachability to fail.",
        invariants: ["behavior.dock", "design.responsive-touch", "performance.resource-ownership", "behavior.focus-escape"],
        pi: piBrowser(["dock-overflow-resize", "dock-overflow-font-load", "dock-overflow-zoom", "dock-overflow-keyboard", "dock-overflow-touch"], ["action bijection", "selection identity", "focus order", "measurement stability", "no resize loop"]),
        deps: ["BI.W-P034", "BI.W-P037", "BI.W-P021"],
        locks: ["component-dock-overflow"],
    }),
    wave({
        id: "BI.W-P039",
        title: "Dock rail/bottom geometry and reserved layout",
        band: "dock",
        intent: "Make vertical rail and bottom bar two responsive projections of the same Dock, with truthful content reservation and concentric geometry.",
        scope: [
            "Derive orientation, density, safe-area, target, and content-reserve geometry from semantic layout state.",
            "Delete duplicate rail/bottom engines and CSS token mirror ladders.",
            "Ensure fixed/sticky/overlay behavior is explicit and content is never occluded unintentionally.",
            "Validate dynamic viewport, safe areas, keyboard, zoom, and orientation changes; at 390×844 the story scroller must retain a nondegenerate viewport, keyboard focus must reveal offscreen items, and overlay versus reserved layout must be declared and measured.",
        ],
        subjects: subjects([
            "src/components/dock/GlassDock.vue", "src/components/dock/composables/useDockShellProps.ts", "src/components/dock/styles/rail.css",
            "src/components/dock/styles/bottom.css", "src/components/dock/styles/density.css", "src/components/dock/styles/reserve.css",
            "tests-visual/dock-layout.spec.ts",
        ]),
        repairs: repair({
            imports: ["demo/shell/SidebarDock.vue", "demo/shell/BottomDock.vue", "demo/shell/AppShell.vue"],
            tests: ["tests/components/dock/layout.test.ts", "tests-visual/dock-layout.spec.ts"],
            docs: ["src/components/dock/README.md", "DESIGN.md"],
        }),
        invariant: "Rail and bottom are one semantic Dock with exact content reservation, safe-area handling, nondegenerate scroll/overflow geometry, focus reveal, and target geometry across supported layout states.",
        bite: "Make bottom Dock overlay content without declaring overlay mode, collapse its tab viewport to 34 px, or focus an offscreen action without revealing it; occlusion/reserve/reachability checks must fail.",
        invariants: ["behavior.dock", "design.responsive-touch", "design.material-hierarchy", "performance.experience"],
        pi: piBrowser(["dock-rail-wide", "dock-bottom-narrow", "dock-safe-area", "dock-dynamic-viewport", "dock-zoom", "dock-orientation-change"], ["content occlusion", "reserve geometry", "target size", "concentricity", "layout shift"]),
        deps: ["BI.W-P035", "BI.W-P038"],
        locks: ["component-dock-layout", "demo-shell"],
    }),
    wave({
        id: "BI.W-P040",
        title: "Dock controls, iconography, and command semantics",
        band: "dock",
        intent: "Make DockControl/Trigger and embedded commands visually coherent, semantically correct, and free of special-case styling paths.",
        scope: [
            "Unify control/trigger press, selected, disabled, focus, label, badge, and icon geometry through shared control contracts.",
            "Remove Dock-only button clones and brand-color state rules.",
            "Define icon-only naming, coarse targets, destructive commands, and background-toggle semantics.",
            "Validate nested menu/popover controls without input-event leakage.",
        ],
        subjects: subjects([
            "src/components/dock/DockControl.vue", "src/components/dock/DockTrigger.vue", "src/components/dock/DockBackgroundToggle.vue",
            "src/components/dock/styles/controls.css", "tests-visual/dock-controls.spec.ts",
        ]),
        repairs: repair({
            imports: ["src/components/button/Button.vue", "src/components/tooltip/index.ts", "src/components/dock/index.ts"],
            tests: ["tests/components/dock/controls.test.ts", "tests-visual/dock-controls.spec.ts"],
            docs: ["src/components/dock/README.md"],
        }),
        invariant: "Dock commands use the same control/press/icon semantics as the library while preserving Dock state-machine ownership.",
        bite: "Remove the accessible name from an icon-only DockControl and require the rendered accessibility roster to fail.",
        invariants: ["design.affordance", "design.affordance", "design.responsive-touch", "behavior.dock", "behavior.overlay-apg"],
        pi: piBrowser(["dock-control-keyboard", "dock-control-pointer", "dock-control-touch", "dock-control-disabled", "dock-control-nested-menu"], ["accessible name", "target geometry", "press/focus state", "event ownership"]),
        deps: ["BI.W-P027", "BI.W-P034", "BI.W-P037"],
        locks: ["component-dock-controls"],
    }),
    wave({
        id: "BI.W-P041",
        title: "Dock fisheye, morph, and settle on the shared motion spine",
        band: "dock",
        intent: "Make all Dock movement a bounded projection of shared clock/springs/morph/pointer velocity rather than a private animation engine.",
        scope: [
            "Compose shared spring, pointer field, and element morph for fisheye, selection, layer receive, resize, and settle.",
            "Delete Dock-local spring clocks, timers, transform writers, and fine-pointer behavior on coarse input.",
            "Resolve D4's conflicting DOCK_SPRING observations (0.3/0.82 real versus 0.68/0.64 stale) from fresh trajectories, then calibrate quiet rest, direct manipulation, velocity response, interruption, and PRM; neither numeric pair is accepted as a baseline.",
            "Prove offscreen/hidden Dock work stops and resumes once.",
            "Resolve --dock-morph-min from the mounted semantic token cascade before geometry work; an unreadable/nonfinite value is one typed failing state and negative fixture, never a DOCK_TAP_FLOOR_PX substitution or repeated warning while the Dock continues.",
        ],
        subjects: subjects([
            "src/components/dock/composables/useDockFisheye.ts", "src/components/dock/composables/useDockSpring.ts", "src/components/dock/composables/dockMorphContext.ts",
            "src/components/dock/composables/dockMorphMeasure.ts", "src/components/dock/styles/motion.css", "tests-visual/dock-motion.spec.ts",
        ]),
        repairs: repair({
            imports: ["src/composables/motion/useSpring.ts", "src/composables/motion/useElementMorph.ts", "src/composables/motion/usePointerVelocityField.ts"],
            tests: ["tests/components/dock/motion.test.ts", "tests-visual/dock-motion.spec.ts"],
            docs: ["src/components/dock/README.md", "DESIGN.md"],
        }),
        invariant: "Dock owns no private clock/physics engine, required geometry tokens resolve without masking, and all motion remains bounded, interruptible, input-appropriate, warning-free, and still under PRM.",
        bite: "Feed the stale 0.68/0.64 trajectory receipt, restore useDockSpring as a private rAF loop, or replace an unreadable mounted --dock-morph-min with DOCK_TAP_FLOOR_PX and continue; freshness/shared-writer/fail-closed checks must fail.",
        invariants: ["motion.single-clock", "motion.spring-language", "motion.spring-language", "motion.reduced", "behavior.dock"],
        pi: piBrowser(["dock-fisheye-fine", "dock-fisheye-coarse", "dock-layer-morph", "dock-resize-interrupt", "dock-prm", "dock-offscreen", "dock-morph-token-missing"], ["writer count", "magnitude/settle bands", "geometry continuity", "zero paused work", "typed token failure and zero warning storm"]),
        deps: ["BI.W-P032", "BI.W-P036", "BI.W-P039"],
        locks: ["component-dock-motion", "motion-clock"],
    }),
    wave({
        id: "BI.W-P042",
        title: "Dock demo dogfood and scenario-complete navigation",
        band: "dock",
        intent: "Make the first-party demo prove the exact public Dock architecture in rail and bottom modes without demo-only forks.",
        scope: [
            "Rebuild SidebarDock and BottomDock as thin compositions of the final public anatomy and one shared navigation model.",
            "Exercise selection, layers, overflow, controls, context, dark, accessibility modes, narrow/wide, and route hold.",
            "Delete demo-local Dock CSS/state/motion replicas and stale scenario registrations.",
            "Expose scenario metadata for Safari/Chrome π and ensure route changes never echo from hydration/reconciliation.",
            "Dogfood the actual 390×844 bottom-Dock geometry and layer crossfade: every action remains reachable exactly once, inactive faces expose zero controls, all active controls are named, and ordinary navigation emits zero unexpected warnings.",
        ],
        subjects: subjects([
            "demo/shell/SidebarDock.vue", "demo/shell/BottomDock.vue", "demo/shell/useShellNavDock.ts", "demo/shell/useContextualDockLayers.ts",
            "demo/shell/dock-nav.css", "demo/stories/dock", "tests-visual/demo-dock.spec.ts",
        ]).flatMap((entry) => entry.path === "demo/stories/dock" ? tree("demo/stories/dock", "modify") : [entry]),
        repairs: repair({
            imports: ["demo/shell/AppShell.vue", "demo/router.ts", "demo/stories/manifest.ts"],
            tests: ["tests/demo/dock-dogfood.test.ts", "tests-visual/demo-dock.spec.ts"],
            docs: ["README.md", "DESIGN.md"],
        }),
        invariant: "Demo navigation is a thin real consumer of the published Dock and exercises every declared state without a local behavior/style fork, hidden/inactive action, unnamed control, warning storm, or mobile reachability gap.",
        bite: "Add a demo-only selection state, leave one inactive crossfade button in the accessibility tree, or keep an opacity-zero mobile facet tabbable; dogfood/import-boundary/accessibility checks must fail.",
        invariants: ["behavior.dock", "demo.scenario-contract", "demo.scenario-contract", "demo.gestalt", "behavior.focus-escape"],
        pi: piBrowser(["demo-dock-rail", "demo-dock-bottom", "demo-dock-overflow", "demo-dock-layer", "demo-dock-route-hold", "demo-dock-accessibility"], ["public-only imports", "route stability", "focus/selection", "material/motion coherence", "scenario coverage"]),
        deps: ["BI.W-P040", "BI.W-P041", "BI.W-P012"],
        locks: ["demo-shell", "demo-dock"],
    }),
];

const PROCEDURAL_DEMO_ROOTS = [
    "demo/stories/substrates/VizStudio.vue",
    "demo/stories/substrates/aurora.vue",
    "demo/stories/substrates/blob.vue",
    "demo/stories/substrates/constellation.vue",
    "demo/stories/substrates/fourier-field.vue",
    "demo/stories/substrates/liquid-grid.vue",
];

const proceduralWaves = [
    wave({
        id: "BI.W-P043",
        title: "One GPU and Canvas lifecycle substrate",
        band: "procedural",
        intent: "Give every procedural scene one mount/resize/DPR/visibility/pause/error/resource lifecycle and remove scene-local infrastructure forks.",
        scope: [
            "Unify WebGPU, WebGL2, and Canvas2D lifecycle composition while preserving their distinct rendering capabilities.",
            "Centralize adapter/context acquisition, backing size, DPR budgets, resize, visibility/intersection pause, teardown, and typed failure.",
            "Delete scene-local observers, frame loops, canvas replacement tricks, and leaked resource handles.",
            "Provide deterministic fake-device fixtures plus real-browser resource ownership probes.",
        ],
        subjects: [
            ...tree("src/composables/glass/webgpu", "modify"),
            ...tree("src/composables/glass/webgl", "modify"),
            ...tree("src/composables/glass/canvas2d", "modify"),
            ...subjects(["src/composables/glass/procedural/lifecycle.ts", "src/composables/glass/procedural/types.ts", "tests/composables/glass/procedural-lifecycle.test.ts"]),
        ],
        repairs: repair({
            imports: uniq(grepPaths("useWebGPUCanvas|useWebGLCanvas|useCanvas2D|createCanvasLifecycle|useGpuSubstrate", ["src", "demo"])),
            tests: ["tests/composables/glass/procedural-lifecycle.test.ts", "tests-visual/procedural-lifecycle.spec.ts"],
            docs: ["DESIGN.md", "src/components/PROCEDURAL-SUITE.md"],
        }),
        invariant: "Every procedural renderer composes one lifecycle and releases all observers/loops/resources; no scene can silently fork acquisition or pause behavior.",
        bite: "Create a scene-local ResizeObserver and leak one GPU buffer at unmount; lifecycle/resource evidence must turn RED for both defects.",
        invariants: ["procedural.lifecycle", "procedural.lifecycle", "performance.resource-ownership", "motion.single-clock"],
        pi: piBrowser(["lifecycle-mount", "lifecycle-resize", "lifecycle-offscreen", "lifecycle-hidden", "lifecycle-resume", "lifecycle-unmount"], ["context/resource count", "frame submissions", "DPR/backing size", "single resume", "teardown baseline"]),
        deps: ["BI.W-P025", "BI.W-P014"],
        locks: ["procedural-lifecycle"],
    }),
    wave({
        id: "BI.W-P044",
        title: "Single procedural color and compositing pipeline",
        band: "procedural",
        intent: "Make CSS tokens, Canvas, GLSL, and WGSL share one linear-light color semantics with explicit gamut, alpha, and output encoding.",
        scope: [
            "Define analytic reference vectors from CSS/OKLCh input through linear working space, premultiplication, tone/gamut handling, and output encoding.",
            "Remove duplicate shader color libraries, OETF forks, canvas probes, and engine-specific parameter meanings.",
            "Generate GLSL/WGSL shared constants/functions from one semantic source where language syntax permits.",
            "Validate analytic vectors and painted readbacks in light/dark and alpha composites.",
        ],
        subjects: [
            ...tree("src/composables/color", "modify"),
            ...subjects([
                "src/composables/glass/procedural/color.ts", "src/composables/glass/procedural/color-contract.json",
                "src/composables/glass/webgl/shaders/procedural-color.glsl.ts", "src/composables/glass/webgpu/procedural-color.wgsl.ts",
                "tests/composables/glass/procedural-color.test.ts", "tests-visual/procedural-color.spec.ts",
            ]),
        ],
        repairs: repair({
            imports: uniq(grepPaths("linearToSrgb|srgbToLinear|OKLCh|procedural-color|ColorResolver", ["src", "demo"])),
            tests: ["tests/composables/glass/procedural-color.test.ts", "tests-visual/procedural-color.spec.ts"],
            docs: ["DESIGN.md", "src/components/PROCEDURAL-SUITE.md"],
        }),
        invariant: "The same semantic color/config produces equivalent linear-light composition in CSS, Canvas, GLSL, and WGSL with one output encoding.",
        bite: "Apply output encoding twice in one engine and require analytic plus painted readback parity to fail.",
        invariants: ["procedural.color", "design.contrast", "architecture.import-boundaries"],
        pi: piBrowser(["procedural-color-light", "procedural-color-dark", "procedural-color-alpha", "procedural-color-gamut"], ["analytic vector error", "painted readback delta", "alpha edge", "theme resolution"]),
        deps: ["BI.W-P020", "BI.W-P043"],
        locks: ["procedural-color", "global-color"],
    }),
    wave({
        id: "BI.W-P045",
        title: "Explicit renderer capability, failure, and engine identity",
        band: "procedural",
        intent: "Keep WebGPU-preferred/WebGL2 support honest: capability paths are declared, visible, and never mask a failed required renderer with unrelated output.",
        scope: [
            "Define capability policy and typed acquisition/render failure states for WebGPU, WebGL2, and Canvas2D.",
            "Select WebGL2 only as the declared equivalent supported path; expose the actual selected engine and hardware/adapter class from runtime state in every procedural demo and capture receipt, never from route prose, query parameters, or harness assumptions.",
            "Delete silent catch-and-paint, infinite retry, software-adapter ambiguity, and arbitrary canvas replacement behavior.",
            "Render an explicit failure state when no supported engine can honor the scene contract, and require every deferred owner to install the typed failure channel so initialization failure cannot become an unhandled rejection.",
        ],
        subjects: subjects([
            "src/composables/glass/webgpu/useGpuSubstrate.ts", "src/composables/glass/webgpu/webgpuDevice.ts", "src/composables/glass/procedural/capability.ts",
            "src/components/_shared/RendererStatus.vue", "demo/capture/engine-badge.ts", "tests-visual/renderer-capability.spec.ts",
        ]).concat(PROCEDURAL_DEMO_ROOTS.map((path) => current(path))),
        repairs: repair({
            imports: uniq(grepPaths("Fallback|fallback|onBackendFallback|isFallbackAdapter|engine-badge", ["src", "demo"])),
            tests: ["tests/composables/glass/renderer-capability.test.ts", "tests-visual/renderer-capability.spec.ts"],
            docs: ["DESIGN.md", "README.md", "src/components/PROCEDURAL-SUITE.md"],
        }),
        invariant: "A scene runs on a declared capable engine with visible runtime-derived identity and an installed typed failure channel, or shows explicit failure; it never masks failure with an unrelated renderer, prose identity, warning, or unhandled rejection.",
        bite: "Force both GPU engines to fail and paint a Canvas2D gradient while reporting success, or remove an owner's onInitError channel and let the rejection escape; capability/lifecycle evidence must turn RED.",
        invariants: ["procedural.renderer-parity", "architecture.clean-break", "design.affordance", "architecture.present-tense-source"],
        pi: piBrowser(["renderer-webgpu", "renderer-webgl2", "renderer-no-capability", "renderer-context-loss", "renderer-software-adapter", "renderer-unhandled-rejection"], ["runtime-derived visible engine/hardware identity", "typed failure", "zero unhandled rejection", "no infinite retry", "scene semantic continuity"]),
        deps: ["BI.W-P043"],
        locks: ["procedural-capability"],
    }),
    wave({
        id: "BI.W-P046",
        title: "Aurora apotheosis — painterly field with one runtime",
        band: "procedural",
        intent: "Consolidate Aurora's 38-file painterly system into a cohesive field renderer whose medium presets change art direction without forking lifecycle/color/config.",
        scope: [
            "Separate public Aurora facade/config from generated shader modules, field math, medium composition, and runtime adapters.",
            "Make WebGPU preferred and WebGL2 equivalent through shared semantic uniforms/color/output, removing duplicated bridge/setup logic.",
            "Calibrate quiet warm default, painterly stroke/impasto/metal options, cursor response, image mode, and resize without overbright bloom.",
            "Delete tranche research diaries from source and keep durable art/technical rationale in DESIGN/README.",
            "Install Aurora's typed deferred-init failure handler at every owner, surface the actual engine identity in VizStudio, and keep adapter/context/shader/setup failures explicit with zero warning-only or unhandled-rejection path.",
        ],
        subjects: [
            ...flatTree("custom", "aurora", "modify"),
            current("demo/stories/substrates/aurora.vue"),
            current("demo/stories/substrates/aurora/AuroraStage.vue"),
            current("demo/stories/substrates/aurora/AuroraConfigDock.vue"),
            future("tests/components/aurora/contract.test.ts"),
            future("tests-visual/aurora-apotheosis.spec.ts"),
        ],
        repairs: repair({
            imports: componentRefs("aurora", "Aurora"),
            tests: uniq([...componentRefs("aurora", "Aurora"), "tests/components/aurora/contract.test.ts", "tests-visual/aurora-apotheosis.spec.ts"]),
            build: ["package.json", "scripts/lib/subpath-policy.mjs"],
            docs: ["src/components/aurora/DESIGN.md", "src/components/aurora/README.md", "DESIGN.md"],
        }),
        invariant: "Aurora has one config/color/lifecycle/failure semantics across engines, exposes its actual engine, and every medium remains recognizably Aurora, bounded, pause-aware, warning-free, and legible behind functional content.",
        bite: "Change one WGSL preset scalar meaning without GLSL/reference update, or arm deferred initialization without onInitError and let failure escape; parity/config/failure checks must fail.",
        invariants: ["procedural.lifecycle", "procedural.renderer-parity", "procedural.color", "procedural.interaction", "performance.experience", "architecture.component-topology"],
        pi: piBrowser(["aurora-default-light", "aurora-default-dark", "aurora-mediums", "aurora-image", "aurora-pointer", "aurora-prm", "aurora-parity", "aurora-injected-init-failure"], ["scene identity statistics", "runtime engine identity", "color/readback parity", "interaction bounds", "typed failure and zero unhandled rejection", "frame pacing", "content legibility"]),
        deps: ["BI.W-P044", "BI.W-P045", "BI.W-P031"],
        locks: ["component-aurora"],
    }),
    wave({
        id: "BI.W-P047",
        title: "Blob apotheosis — coherent gel body, satellites, and mood",
        band: "procedural",
        intent: "Make Blob a single coherent SDF/metaball product concept with clean config semantics, contained interaction, and equivalent engines.",
        scope: [
            "Remove variant→morphT compatibility reads and define one typed geometry/mood/interaction config.",
            "Share SDF, palette, satellite, pointer, and uniform semantics across WebGPU/WebGL2 through the procedural substrate.",
            "Calibrate gel body, merge menisci, specular/contact shadow, satellite separation/containment, and calm default.",
            "Delete duplicated easing/setup/bridge code and historical source diaries.",
            "Give Poke, canvas press, preset, and fission actions independent semantic/numeric observables and reset points; continuously changing pixels or a screenshot hash cannot prove that an action caused the claimed state.",
            "Make canvas/SDF press an explicit product mode: an interactive Blob exposes one named focusable press surface with Enter/Space/touch/pointer parity through the same pulse owner, while decorative or aria-hidden Blob instances mount no operable hit surface and cannot intercept sibling controls.",
            "Replace the WebGL2-only component/README/story fiction with runtime-derived WebGPU/WebGL2 identity and one source-bound capability/failure account.",
        ],
        subjects: [
            ...flatTree("custom", "blob", "modify"),
            current("demo/stories/substrates/blob.vue"),
            future("tests/components/blob/contract.test.ts"),
            future("tests-visual/blob-apotheosis.spec.ts"),
        ],
        repairs: repair({
            imports: componentRefs("blob", "Blob"),
            tests: uniq([...componentRefs("blob", "Blob"), "tests/components/blob/contract.test.ts", "tests-visual/blob-apotheosis.spec.ts"]),
            build: ["package.json", "scripts/lib/subpath-policy.mjs"],
            docs: ["src/components/blob/README.md", "DESIGN.md", "MIGRATION.md"],
        }),
        invariant: "Blob exposes one clean config and renders a contained, legible gel identity with equivalent engine/color/interaction semantics, a named keyboard/pointer/touch press surface only when interactive, causal action observables, and no legacy prop path.",
        bite: "Restore `variant` as a second reader, make Poke pass solely because a continuously animated screenshot changed, or retain an unnamed click-only SDF hit layer; clean-break/config/causality/operability evidence must turn RED.",
        invariants: ["architecture.clean-break", "procedural.lifecycle", "procedural.renderer-parity", "procedural.color", "procedural.interaction", "performance.experience", "behavior.focus-escape", "design.adaptive-accessibility", "demo.scenario-contract"],
        pi: piBrowser(["blob-default", "blob-merge", "blob-satellites", "blob-pointer", "blob-canvas-press-keyboard", "blob-poke-causality", "blob-touch", "blob-decorative-noninteractive", "blob-prm", "blob-parity"], ["silhouette/menisci", "satellite containment/separation", "luma/specular bands", "semantic/numeric interaction magnitude", "role/name/focus and modality parity", "causal reset", "engine parity"]),
        deps: ["BI.W-P044", "BI.W-P045", "BI.W-P032"],
        locks: ["component-blob"],
    }),
    wave({
        id: "BI.W-P048",
        title: "Constellation apotheosis — one field model on the proportionate Canvas2D renderer",
        band: "procedural",
        intent: "Collapse the unjustified dual-GPU fork back into one deterministic Canvas2D field whose consumer skin, multi-instance story, and resource cost match the product's actual scale.",
        scope: [
            "Make one seeded field model own nodes, wells, connections, density, motion, and interaction independent of renderer.",
            "Delete constellationWGPUSetup, constellationGLSetup, their WGSL/GLSL shaders, uniform bridge, GPU exports/tests, and every dual-engine claim; render the CPU-owned 64-node/edge field once through useCanvas2D on the shared lifecycle/color substrate.",
            "Calibrate point/line hierarchy, density, warp, egg/refit states, pointer/touch, dark/light, and PRM.",
            "Restore drawOverlay as the ordered final Canvas2D pass, with frozen-now semantics and causal focal/warp/pinned witnesses; delete every comment or proof that legalizes it as an inert public prop.",
            "Make the suite table, README, manifest, story prose, public types, tests, and runtime status agree on Canvas2D now; any future GPU migration requires a newly evidenced density/compute need and an explicit replacement for the skin contract.",
            "Prove the seven-instance story plus route background consumes zero WebGPU/WebGL contexts for Constellation, respects per-route context budgets, pauses each offscreen instance, and releases every observer/listener/loop.",
            "Keep slides/atlas consumer needs as read-only acceptance inputs, not foreign edits.",
        ],
        subjects: [
            ...flatTree("custom", "constellation", "modify"),
            current("demo/stories/substrates/constellation.vue"),
            future("tests/components/constellation/contract.test.ts"),
            future("tests-visual/constellation-apotheosis.spec.ts"),
        ],
        repairs: repair({
            imports: componentRefs("constellation", "Constellation"),
            tests: uniq([...componentRefs("constellation", "Constellation"), "tests/components/constellation/contract.test.ts", "tests-visual/constellation-apotheosis.spec.ts"]),
            build: ["package.json", "scripts/lib/subpath-policy.mjs"],
            docs: ["src/components/constellation/README.md", "DESIGN.md"],
        }),
        invariant: "One deterministic CPU field feeds one Canvas2D renderer; drawOverlay and every retained interaction seam execute causally, seven-instance dogfood consumes no scarce GPU context, and readable hierarchy, stable seed/config semantics, bounded interaction, freeze, pause, and teardown survive.",
        bite: "Reintroduce createGpuSubstrate or a constellation shader, pass drawOverlay without invoking it, open a GPU context on the seven-instance route, or fork connection math; clean-break, interaction, resource, and live scenario evidence must turn RED.",
        invariants: ["architecture.clean-break", "procedural.lifecycle", "procedural.color", "procedural.interaction", "performance.experience", "performance.resource-ownership", "architecture.component-topology"],
        pi: piBrowser(["constellation-default", "constellation-density", "constellation-warp-overlay", "constellation-pinned-overlay", "constellation-pointer", "constellation-multi-instance", "constellation-prm"], ["seeded geometry", "point/line hierarchy", "causal overlay paint", "density/interaction bounds", "zero Constellation GPU contexts", "frame pacing and offscreen pause"]),
        deps: ["BI.W-P043", "BI.W-P044", "BI.W-P032"],
        locks: ["component-constellation"],
    }),
    wave({
        id: "BI.W-P049",
        title: "Fourier Field apotheosis — math-owned ribbon and compute/render contract",
        band: "procedural",
        intent: "Make FourierField one mathematical field concept whose compute, ribbon, configuration, and render paths are explicit and equivalent.",
        scope: [
            "Keep Fourier math as a pure owned leaf and define one seeded coefficient/config contract.",
            "Unify compute/render and GLSL/WGSL semantics through shared lifecycle/color while preserving WebGPU compute advantage.",
            "Calibrate ribbon/field hierarchy, stage bounds, interaction, resize, and PRM.",
            "Delete the README/suite-table Canvas2D and future-migration archaeology and bind all public/demo engine claims to the live WebGPU/WebGL2 selector.",
            "Verify slides/fourier-analysis read-only usage against the final tarball through owner packets.",
        ],
        subjects: [
            ...flatTree("custom", "fourier-field", "modify"),
            current("demo/stories/substrates/fourier-field.vue"),
            future("tests/components/fourier-field/contract.test.ts"),
            future("tests-visual/fourier-field-apotheosis.spec.ts"),
        ],
        repairs: repair({
            imports: componentRefs("fourier-field", "FourierField"),
            tests: uniq([...componentRefs("fourier-field", "FourierField"), "tests/components/fourier-field/contract.test.ts", "tests-visual/fourier-field-apotheosis.spec.ts"]),
            build: ["package.json", "scripts/lib/subpath-policy.mjs"],
            docs: ["src/components/fourier-field/README.md", "DESIGN.md"],
        }),
        invariant: "Pure Fourier math/config feeds one field semantics across compute/render paths and engines, with bounded readable output and no duplicated math authority.",
        bite: "Normalize coefficients differently in the WebGL path and require analytic/render parity to fail.",
        invariants: ["procedural.lifecycle", "procedural.renderer-parity", "procedural.color", "architecture.component-topology", "performance.experience"],
        pi: piBrowser(["fourier-default", "fourier-ribbon", "fourier-config", "fourier-resize", "fourier-prm", "fourier-parity"], ["coefficient/geometry parity", "ribbon hierarchy", "bounds", "frame pacing"]),
        deps: ["BI.W-P044", "BI.W-P045"],
        locks: ["component-fourier-field"],
    }),
    wave({
        id: "BI.W-P050",
        title: "Liquid Grid apotheosis — WebGPU-first equivalent field",
        band: "procedural",
        intent: "Make LiquidGrid a focused procedural grid concept, not a showcase for duplicated GPU setup or unrelated material effects.",
        scope: [
            "Define one grid/curl/derivative/config semantics and generated shared shader constants.",
            "Use shared lifecycle/color/capability with WebGPU preferred and equivalent GLSL output.",
            "Calibrate grid legibility, warp, motion, interaction, stage fit, dark/light, and PRM.",
            "Remove local setup/bridge forks and decorative effects outside the grid concept.",
        ],
        subjects: [
            ...flatTree("custom", "liquid-grid", "modify"),
            current("demo/stories/substrates/liquid-grid.vue"),
            future("tests/components/liquid-grid/contract.test.ts"),
            future("tests-visual/liquid-grid-apotheosis.spec.ts"),
        ],
        repairs: repair({
            imports: componentRefs("liquid-grid", "LiquidGrid"),
            tests: uniq([...componentRefs("liquid-grid", "LiquidGrid"), "tests/components/liquid-grid/contract.test.ts", "tests-visual/liquid-grid-apotheosis.spec.ts"]),
            build: ["package.json", "scripts/lib/subpath-policy.mjs"],
            docs: ["src/components/liquid-grid/README.md", "DESIGN.md"],
        }),
        invariant: "LiquidGrid has one grid/warp/config meaning across engines and remains legible, bounded, pause-aware, and still under PRM.",
        bite: "Change derivative-AA width only in GLSL and require edge-statistic parity to fail.",
        invariants: ["procedural.lifecycle", "procedural.renderer-parity", "procedural.color", "procedural.interaction", "performance.experience"],
        pi: piBrowser(["liquid-grid-default", "liquid-grid-warp", "liquid-grid-dark", "liquid-grid-touch", "liquid-grid-prm", "liquid-grid-parity"], ["edge/line statistics", "warp/config parity", "stage fit", "interaction bounds", "frame pacing"]),
        deps: ["BI.W-P044", "BI.W-P045", "BI.W-P032"],
        locks: ["component-liquid-grid"],
    }),
    wave({
        id: "BI.W-P051",
        title: "Hand-drawn 2D family — Handmark and WatercolorDot",
        band: "procedural",
        intent: "Give Handmark and WatercolorDot one seeded Canvas/SVG/CSS drawing vocabulary without conflating them with the unrelated metaball-filter resource.",
        scope: [
            "Define one seeded hand-drawn geometry/color/animation substrate for marks and watercolor dots without pretending it is a GPU scene.",
            "Keep Handmark and WatercolorDot distinct public concepts only where their semantics/consumers justify them.",
            "Retain HandMark as the sole component name and delete the same-source InkMark prose alias from /handmark; one SFC cannot masquerade as two public concepts merely because two Atlas call sites prefer the alias spelling.",
            "Route exact Atlas migration of src/charts/glyph/HandMark.vue and src/editorial/AnimatedRule.vue through P004/P133 owner coordination. The consumer imports/renders HandMark; no compatibility alias, local-binding-only rename, or broad family claim survives.",
            "Keep semantic underline/circle/strike and watercolor point-mark behavior distinct while sharing only deterministic noise, brush, and color math.",
            "Calibrate ink seat, stroke, watercolor edge, motion, contrast, touch/keyboard use, and PRM.",
        ],
        subjects: [
            ...flatTree("custom", "handmark", "modify"),
            ...flatTree("custom", "watercolor-dot", "modify"),
            current("demo/stories/motion/handmark.vue"),
            future("src/composables/glass/canvas2d/hand-drawn.ts"),
            future("tests-visual/hand-drawn-family.spec.ts"),
        ],
        repairs: repair({
            imports: uniq([...componentRefs("handmark", "Handmark"), ...componentRefs("watercolor-dot", "WatercolorDot")]),
            tests: ["tests/components/hand-drawn-family.test.ts", "tests-visual/hand-drawn-family.spec.ts"],
            build: ["package.json", "scripts/lib/subpath-policy.mjs"],
            docs: ["MIGRATION.md", "DESIGN.md"],
        }),
        invariant: "Handmark and WatercolorDot share one deterministic drawing substrate while retaining distinct semantic mark and point-paint contracts; no unrelated filter resource or unseeded writer enters the family.",
        bite: "Import the metaball filter, add an unseeded loop, restore `default as InkMark`, rename only Atlas local bindings, or preserve two names for HandMark.vue; topology, clean-break, handshake, determinism, and lifecycle evidence must turn RED.",
        invariants: ["architecture.component-topology", "architecture.clean-break", "procedural.lifecycle", "procedural.interaction", "motion.reduced"],
        pi: piBrowser(["handmark-underline", "handmark-highlight", "watercolor-dot", "hand-drawn-dark", "hand-drawn-prm"], ["stroke/ink geometry", "color/contrast", "seed stability", "motion bounds"]),
        deps: ["BI.W-P004", "BI.W-P043", "BI.W-P044", "BI.W-P031"],
        locks: ["component-handmark", "component-watercolor-dot", "entry-graph"],
    }),
    wave({
        id: "BI.W-P052",
        title: "Procedural configuration schema and live control roundtrip",
        band: "procedural",
        intent: "Give every scene a typed, serializable, bounded config whose demo controls alter the live renderer and roundtrip exactly.",
        scope: [
            "Define shared schema metadata for type, unit, bounds, defaults, grouping, serialization, and engine support without flattening scene-specific concepts.",
            "Generate Configurator controls and persistence from schemas; remove dead knobs and duplicated defaults/writers.",
            "Prove every control changes the claimed observable on every renderer applicable to that scene and roundtrips without loss; a single-renderer scene cannot be forced into a synthetic engine switch.",
            "Keep accessibility labels, keyboard entry, reset, and invalid-input handling complete.",
        ],
        subjects: subjects([
            "src/components/configurator", "src/composables/glass/procedural/config.ts", "demo/shell/configurator",
            "tests/components/procedural-config.test.ts", "tests-visual/procedural-config.spec.ts",
        ]).flatMap((entry) => {
            if (entry.path === "src/components/configurator") return flatTree("custom", "configurator", "modify");
            if (entry.path === "demo/shell/configurator") return tree("demo/configurator").map((row) => ({
                path: `demo/shell/configurator${row.path.slice("demo/configurator".length)}`,
                action: "modify",
                before: null,
                producedBy: "BI.W-P012",
                sourceBasePath: row.path,
                sourceBaseOid: row.before,
            }));
            return [entry];
        }).concat(PROCEDURAL_DEMO_ROOTS.map((path) => current(path))),
        repairs: repair({
            imports: uniq(grepPaths("Configurator|useConfigurator|ConfigSchema|preset", ["src", "demo", "tests"])),
            tests: ["tests/components/procedural-config.test.ts", "tests-visual/procedural-config.spec.ts"],
            build: ["package.json", "scripts/lib/subpath-policy.mjs"],
            docs: ["DESIGN.md", "README.md"],
        }),
        invariant: "Every procedural control has one typed live writer, bounded semantics shared by every applicable renderer, exact serialization, and an observable effect.",
        bite: "Add a control whose value persists but never reaches renderer uniforms and require live-effect coverage to fail.",
        invariants: ["behavior.forms", "procedural.renderer-parity", "architecture.component-topology", "demo.scenario-contract"],
        pi: piBrowser(["config-keyboard", "config-touch", "config-reset", "config-roundtrip", "config-applicable-engine-switch", "config-single-engine-honesty", "config-invalid"], ["live observable change", "serialized equality", "bounds/error semantics", "applicable engine semantic parity", "no synthetic renderer axis"]),
        deps: ["BI.W-P046", "BI.W-P047", "BI.W-P048", "BI.W-P049", "BI.W-P050"],
        locks: ["component-configurator", "demo-configurator"],
    }),
    wave({
        id: "BI.W-P053",
        title: "Cross-engine perceptual parity matrix",
        band: "procedural",
        intent: "Replace per-scene self-certification with one seeded, repeatable Safari/Chrome WebGPU/WebGL2 comparison over every supported procedural scene.",
        scope: [
            "Enroll the actual dual-renderer scenes—Aurora, Blob, FourierField, and LiquidGrid—through discovered renderer/config metadata; explicitly exclude single-renderer Constellation rather than manufacturing parity work.",
            "Compare analytic config, seeded geometry, color/readback, scene statistics, interaction response, and failure identity rather than screenshot equality.",
            "Define scene-specific perceptual bands with mutation evidence proving each discriminates a material defect.",
            "Store compact JSON/readback evidence keyed to exact wave/source/browser/engine; images support review but never decide success by pixel hash.",
        ],
        subjects: subjects([
            "tests-visual/procedural-parity.spec.ts", "tests-visual/helpers/procedural-parity.ts", "tests-visual/pi-runner-manifest.mjs",
            "scripts/verification/oracles/procedural-parity.mjs",
        ]),
        repairs: repair({
            tests: ["tests-visual/procedural-parity.spec.ts"],
            docs: ["DESIGN.md", "src/components/PROCEDURAL-SUITE.md"],
        }),
        invariant: "Every supported dual-engine scene has current seeded semantic/perceptual parity evidence in Safari and Chrome, and each band rejects a known meaningful mutation.",
        bite: "Inject one engine-only color encode and one geometry parameter skew; both must fail without a screenshot hash.",
        invariants: ["procedural.renderer-parity", "procedural.color", "procedural.interaction", "integrity.release"],
        pi: piBrowser(["parity-aurora", "parity-blob", "parity-fourier", "parity-liquid-grid"], ["config equality", "seeded geometry", "color/readback delta", "scene statistics", "interaction response"]),
        deps: ["BI.W-P046", "BI.W-P047", "BI.W-P049", "BI.W-P050"],
        locks: ["procedural-parity", "visual-runner"],
    }),
    wave({
        id: "BI.W-P054",
        title: "Procedural offscreen, resource, and performance budgets",
        band: "procedural",
        intent: "Bind procedural ambition to actual route ownership, pause behavior, frame pacing, memory, loading, and context limits without hiding work.",
        scope: [
            "Instrument context/buffer/texture/listener/observer/loop ownership per rendered route and verify teardown.",
            "Stop all work offscreen/hidden/PRM and resume exactly once without clock or seed discontinuity.",
            "Lazy-load heavy renderers and prevent more contexts/scenes than the route's declared budget.",
            "Bind the current nine-canvas Constellation route as a resource negative control: its seven direct specimens plus page chrome may use Canvas2D, but after P048 they open zero Constellation WebGPU/WebGL contexts and offscreen specimens perform zero continuous work.",
            "Collect distributions on representative Safari/Chrome profiles and set product budgets with diagnostic attribution.",
        ],
        subjects: [
            ...subjects(["scripts/profile-procedural.mjs", "tests-visual/procedural-performance.spec.ts", "tests-visual/helpers/resource-instrumentation.ts", "vite.config.ts"]),
            { path: "src/composables/glass/procedural/lifecycle.ts", action: "modify", before: null, producedBy: "BI.W-P043" },
        ],
        repairs: repair({
            imports: uniq(grepPaths("Aurora|Blob|Constellation|FourierField|LiquidGrid", ["demo"])),
            tests: ["tests-visual/procedural-performance.spec.ts"],
            build: ["vite.config.ts", "package.json"],
            docs: ["DESIGN.md", "README.md"],
        }),
        invariant: "Procedural routes own bounded resources, do zero continuous work while paused, resume once, lazy-load heavy code, and meet declared experience budgets with attribution.",
        bite: "Eager-import all scene engines on home and keep one offscreen frame loop running; loading and pause evidence must turn RED.",
        invariants: ["procedural.lifecycle", "performance.experience", "performance.resource-ownership", "integrity.build-package"],
        pi: piBrowser(["perf-home-cold", "perf-scene-cold", "perf-scene-warm", "perf-offscreen", "perf-route-cycle", "perf-prm"], ["bundle/request attribution", "frame pacing", "long tasks", "resource counts", "zero paused frames", "teardown baseline"]),
        deps: ["BI.W-P053", "BI.W-P048", "BI.W-P031"],
        locks: ["procedural-lifecycle", "performance-profiler", "vite-config"],
    }),
];

const demoWaves = [
    wave({
        id: "BI.W-P055",
        title: "One demo chassis grammar",
        band: "demo",
        intent: "Reduce page, section, hero, specimen, showcase, family, code, play, and landing helpers to one coherent composition grammar with no wrapper synonyms.",
        scope: [
            "Assign each chassis part a unique semantic responsibility and fold/delete forwarding or appearance-only wrappers.",
            "Make page hierarchy, spacing, field/material, reveal, and responsive behavior derive from the shared design foundation.",
            "Replace bespoke story scaffolds with the grammar while preserving genuine concept-specific stages.",
            "Prove a story cannot mint its own hero/section/specimen structure without an explicit specialized stage rationale.",
            "Place the actual live subject, primary state, and first causal control before explanatory prose at wide and narrow sizes, with the bottom Dock's declared reserve/overlay geometry applied so the product witness is not displaced or covered.",
        ],
        subjects: [
            ...tree("demo/chassis", "modify"),
            future("tests/demo/chassis-grammar.test.ts"),
            future("tests-visual/chassis-grammar.spec.ts"),
        ],
        repairs: repair({
            imports: uniq(paths("demo/stories")),
            tests: ["tests/demo/chassis-grammar.test.ts", "tests-visual/chassis-grammar.spec.ts"],
            docs: ["DESIGN.md"],
        }),
        invariant: "Every story composition uses one semantic chassis grammar, leads with a visible live product witness, and has no second page/hero/section/specimen authority.",
        bite: "Add a story-local hero shell duplicating title/lede/material/reveal, or put explanatory prose ahead of an occluded live subject at 390×844; chassis/gestalt/reachability checks must fail.",
        invariants: ["architecture.component-topology", "architecture.component-topology", "demo.gestalt", "design.material-hierarchy"],
        pi: piBrowser(["chassis-landing", "chassis-component-story", "chassis-procedural-story", "chassis-narrow", "chassis-dark"], ["hierarchy", "material roles", "spacing/overflow", "absence of duplicate chrome"]),
        deps: ["BI.W-P012", "BI.W-P016", "BI.W-P019"],
        locks: ["demo-chassis"],
    }),
    wave({
        id: "BI.W-P056",
        title: "Demo information architecture and shell restraint",
        band: "demo",
        intent: "Make the demo a navigable product instrument with clear concept taxonomy, stable route state, and quiet chrome.",
        scope: [
            "Rebuild home/category/story hierarchy from the final concept taxonomy and rendered-story graph.",
            "Keep shell glass functional and content warm; remove generic dashboard cards, duplicated navigation, and page-local shells.",
            "Preserve current canonical deep links, browser history, scroll/focus restoration, narrow/coarse access, and semantic not-found handling; retired/folded/relocated paths are clean-break 404s rather than compatibility redirects.",
            "Use final Dock dogfood without making Dock a dependency of content rendering.",
            "Render unknown paths with exactly one visible primary heading, a reachable recovery action, correct main/landmark semantics, and no shell state that falsely identifies a retained story.",
        ],
        subjects: [
            ...tree("demo/shell", "modify"),
            current("demo/App.vue"),
            current("demo/router.ts"),
            current("demo/demo.css"),
            future("tests-visual/demo-ia.spec.ts"),
        ],
        repairs: repair({
            imports: ["demo/main.ts", "demo/stories/manifest.ts", "demo/chassis/landing/SectionLanding.vue"],
            tests: ["tests/demo/router.test.ts", "tests-visual/demo-ia.spec.ts"],
            build: ["demo/vite.demo-dist.config.ts"],
            docs: ["README.md", "DESIGN.md"],
        }),
        invariant: "Every retained concept/story is reachable through one stable direct route hierarchy, every retired path is an honest semantic 404, navigation never mutates route on hydration, and shell chrome does not compete with content.",
        bite: "Add a duplicate/compatibility redirect, omit the not-found h1, or make Dock v-model echo push on mount; clean-break/route/hold/accessibility checks must fail.",
        invariants: ["demo.scenario-contract", "architecture.clean-break", "behavior.focus-escape", "design.responsive-touch", "demo.gestalt"],
        pi: piBrowser(["demo-home-wide", "demo-category", "demo-story-deeplink", "demo-retired-route-404", "demo-unknown-route-404", "demo-back-forward", "demo-narrow", "demo-keyboard"], ["direct route stability", "retired/unknown route heading and recovery semantics", "reachability", "focus/scroll restoration", "shell/content hierarchy"]),
        deps: ["BI.W-P042", "BI.W-P055"],
        locks: ["demo-shell", "demo-router"],
    }),
    wave({
        id: "BI.W-P057",
        title: "Rendered story manifest and public-concept bijection",
        band: "demo",
        intent: "Generate story metadata from rendered modules and final entry concepts so imports, routes, and public exports cannot drift apart.",
        scope: [
            "Define a typed story schema for concept ID, category, component imports, rendered parts, scenarios, modes, and specialized-stage rationale.",
            "Generate route/landing/search projections from one manifest authority while verifying component modules actually render.",
            "Require every retained public concept to have rendered reach or an explicit no-story product rationale; reject phantom/dead routes.",
            "Delete FOLDED_STORY_IDS, FOLDED_MEMBER_FAMILY, RELOCATED_STORY_ROUTES, the router redirect loops that consume them, and dead member rows; family pages may compose private specimens, but retired public paths receive no alias or migration route.",
            "Remove filename-count and prose-presence story checks and require each retained manifest row to resolve directly to the mounted owner.",
        ],
        subjects: [
            ...subjects(["demo/stories/manifest.ts", "demo/stories/manifest/schema.ts", "demo/stories/manifest/generate.ts"]),
            { path: "tests/demo/story-bijection.test.ts", action: "modify", before: null, producedBy: "BI.W-P012" },
        ],
        repairs: repair({
            imports: uniq(paths("demo/stories")),
            tests: ["tests/demo/story-bijection.test.ts"],
            build: ["demo/router.ts", "demo/vite.demo-dist.config.ts"],
            docs: ["README.md"],
        }),
        invariant: "Public concepts, story modules, rendered components, and direct canonical routes form a generated semantic mapping with no import-only, phantom, dead-member, folded, relocated, alias, shim, or compatibility-route success.",
        bite: "Import a component without rendering it, or restore one old-path redirect through FOLDED_STORY_IDS/RELOCATED_STORY_ROUTES; reachability/clean-break checks must fail.",
        invariants: ["demo.scenario-contract", "architecture.component-topology", "architecture.clean-break", "integrity.entry-graph"],
        pi: piNone("Manifest/render reachability is device-free through AST plus mounted-component probes; visual scenarios are separate."),
        deps: ["BI.W-P055"],
        locks: ["demo-manifest"],
    }),
    wave({
        id: "BI.W-P058",
        title: "Concept-driven heroes and display typography",
        band: "demo",
        intent: "Give each major story one audacious but restrained concept-specific type gesture without reintroducing bespoke page shells.",
        scope: [
            "Define hero composition slots for display title, lede, one color event, one concept-driven motion event, and optional procedural field.",
            "Remove generic teal gradients, repeated pill eyebrows, all-caps metadata clutter, and identical card-hero templates.",
            "Constrain specialized art direction through shared hierarchy/material/type contracts.",
            "Validate line fit, occlusion, focus, motion, dark/light, narrow/wide, and PRM while ensuring hero art never delays, covers, or displaces the first live subject/control below the bottom-Dock reserve.",
        ],
        subjects: [
            ...tree("demo/chassis/hero", "modify"),
            ...subjects(["demo/chassis/hero/concept-art-direction.ts", "tests-visual/story-heroes.spec.ts"]),
        ],
        repairs: repair({
            imports: uniq(grepPaths("StoryHero|StoryHeader|heroTitle|hero", ["demo/stories"])),
            tests: ["tests/demo/hero-contract.test.ts", "tests-visual/story-heroes.spec.ts"],
            docs: ["DESIGN.md"],
        }),
        invariant: "Every enrolled hero uses shared hierarchy and has a distinct concept-driven gesture without overflow, subject occlusion/displacement, decorative template sameness, or accessibility loss.",
        bite: "Restore a generic gradient/pill hero or make a narrow hero push the live specimen below a persistent Dock; cross-route gestalt/hero/reachability constraints must fail.",
        invariants: ["design.typography", "demo.gestalt", "design.material-hierarchy", "motion.reduced"],
        pi: piBrowser(["hero-home", "hero-component", "hero-motion", "hero-procedural", "hero-narrow", "hero-dark", "hero-prm"], ["type hierarchy/fit", "content occlusion", "color-event count", "motion causality", "cross-route distinctiveness"]),
        deps: ["BI.W-P019", "BI.W-P055"],
        locks: ["demo-hero"],
    }),
    wave({
        id: "BI.W-P059",
        title: "Reusable specimen and state-control chassis",
        band: "demo",
        intent: "Make each component story an instrument for real states/interactions rather than a static decorative card or one-off configurator.",
        scope: [
            "Define reusable specimen, comparison, permutation, and state-control parts driven by typed story metadata.",
            "Require controls to change the live claimed property and expose default/edge/error/disabled/loading/empty states as applicable; every action names a semantic or numeric causal observable, tolerance/band, and reset, never screenshot/hash change alone.",
            "Treat a demo as a product witness, not automatic external demand: bind each public primitive to a real runtime import and causal rendered use, and give unit tests, type-only imports, barrels, docs, and path existence zero consumer credit.",
            "Require demonstration taxonomies and readouts to belong to the product under test and derive from current owners; a Glass story cannot earn completeness by cloning a foreign package inventory or showing stale hard-coded parameters over a live callable.",
            "Support keyboard/touch, reset, copyable configuration, and narrow/wide layout without page-local control CSS.",
            "Treat failure and control geometry as causal states: Clipboard denial/unavailability must expose a semantic failed outcome and full-literal recovery, and every text-bearing action must remain content-width/legible after a component is moved or re-homed.",
            "Reject false affordance and hidden defaults: no pointer/focus-styled no-op branch may masquerade as a control, and every public interaction that defaults on must have a direct causal first-party scenario across its applicable keyboard/pointer/touch modes rather than being disabled in all demos.",
            "A token swatch is not a live component demonstration: correct /foundations/overlays-scrims so it never teaches the nonexistent private `<ModalOverlay tier='strong'>` contract or credits three static divs as ModalOverlay evidence; exercise canonical public overlay owners causally or label and route the token-only specimen honestly.",
            "Remove decorative knobs, hardcoded component rosters, and duplicated permutation grids.",
        ],
        subjects: subjects([
            "demo/chassis/PermutationGrid.vue", "demo/chassis/showcase/SpecimenFrame.vue", "demo/chassis/showcase/ShowcaseFrame.vue",
            "demo/chassis/showcase/StateControls.vue", "demo/chassis/showcase/scenario-state.ts", "tests-visual/specimen-chassis.spec.ts",
        ]).concat([
            { path: "docs/tranches/BI/FORMATION/build-public-default-contract-audit.mjs", action: "verify", before: null, producedBy: "FORMATION" },
            { path: "docs/tranches/BI/FORMATION/public-default-contract-audit.json", action: "verify", before: null, producedBy: "FORMATION" },
            { path: "docs/tranches/BI/FORMATION/PUBLIC-DEFAULT-CONTRACT-AUDIT.md", action: "verify", before: null, producedBy: "FORMATION" },
            { path: "docs/tranches/BI/FORMATION/build-public-component-member-demand-audit.mjs", action: "verify", before: null, producedBy: "FORMATION" },
            { path: "docs/tranches/BI/FORMATION/public-component-member-demand-audit.json", action: "verify", before: null, producedBy: "FORMATION" },
            { path: "docs/tranches/BI/FORMATION/PUBLIC-COMPONENT-MEMBER-DEMAND-AUDIT.md", action: "verify", before: null, producedBy: "FORMATION" },
            { path: "docs/tranches/BI/FORMATION/public-component-member-judgments.registry.mjs", action: "verify", before: null, producedBy: "FORMATION" },
            { path: "docs/tranches/BI/FORMATION/build-public-component-member-judgment-audit.mjs", action: "verify", before: null, producedBy: "FORMATION" },
            { path: "docs/tranches/BI/FORMATION/public-component-member-judgment-audit.json", action: "verify", before: null, producedBy: "FORMATION" },
            { path: "docs/tranches/BI/FORMATION/PUBLIC-COMPONENT-MEMBER-JUDGMENT-AUDIT.md", action: "verify", before: null, producedBy: "FORMATION" },
        ]),
        repairs: repair({
            imports: uniq(paths("demo/stories")),
            tests: ["tests/demo/scenario-state.test.ts", "tests-visual/specimen-chassis.spec.ts"],
            docs: ["DESIGN.md"],
        }),
        invariant: "Every story control has a typed live effect with a causal semantic/numeric observable and reset, applicable semantic states are reachable through one reusable accessible specimen grammar, and demo/runtime ownership is proven without foreign-inventory, file-existence, test-as-consumer, or stale-readout laundering.",
        bite: "Add a knob that changes only its label, let Blob Poke pass because unrelated animation changed the screenshot, keep a pointer-styled no-op, hide an interactive-on default from every direct demo, count a unit test as demand, or hard-code a stale spring readout over a live callable; scenario/causality/topology evidence must fail.",
        invariants: ["demo.scenario-contract", "behavior.forms", "design.responsive-touch", "behavior.focus-escape", "architecture.component-topology", "architecture.present-tense-source"],
        pi: piBrowser(["specimen-controls-keyboard", "specimen-controls-touch", "specimen-permutation", "specimen-narrow", "specimen-reset", "specimen-continuous-animation-negative"], ["causal semantic/numeric live effect", "state reachability", "control semantics", "layout/overflow", "roundtrip", "screenshot-only rejection"]),
        deps: ["BI.W-P057"],
        locks: ["demo-chassis", "demo-scenarios"],
    }),
    wave({
        id: "BI.W-P060",
        title: "Executable examples and source-fidelity code blocks",
        band: "demo",
        intent: "Make every displayed example derive from executable story code and final public imports, eliminating stale snippets and internal-path teaching.",
        scope: [
            "Bind code panels to executable example modules or generated extracts with exact public imports.",
            "Typecheck/build every example against the packed package and reject source aliases/internal paths.",
            "Preserve accessible copy, syntax semantics, horizontal overflow, font geometry, and dark/light treatment.",
            "Delete hand-maintained duplicate snippets and wave-era explanatory comments.",
        ],
        subjects: [
            ...tree("demo/chassis/code", "modify"),
            ...subjects(["scripts/demo/verify-examples.mjs", "tests/demo/examples.test.ts", "tests-visual/code-examples.spec.ts"]),
        ],
        repairs: repair({
            imports: uniq(paths("demo/stories")),
            tests: ["tests/demo/examples.test.ts", "tests-visual/code-examples.spec.ts"],
            build: ["scripts/demo/verify-examples.mjs", "demo/vite.demo-dist.config.ts"],
            docs: ["README.md", "MIGRATION.md"],
        }),
        invariant: "Displayed code is executable, typechecked against the packed public package, and visually/semantically readable; no hand mirror can drift.",
        bite: "Change a displayed import to an internal source path while leaving the story working and require example verification to fail.",
        invariants: ["integrity.build-package", "architecture.present-tense-source", "design.typography", "design.responsive-touch"],
        pi: piBrowser(["code-light", "code-dark", "code-narrow", "code-copy-keyboard"], ["source fidelity", "overflow", "contrast", "copy semantics", "font stability"]),
        deps: ["BI.W-P057", "BI.W-P019"],
        locks: ["demo-code", "packed-fixtures"],
    }),
    wave({
        id: "BI.W-P061",
        title: "π scenario runner and source-bound evidence",
        band: "demo",
        intent: "Replace ad hoc screenshots and local-only ledger claims with one semantic scenario runner whose evidence is bound to exact source/browser/state.",
        scope: [
            "Generate scenario enrollment from story/wave metadata and execute named setup/action/observable contracts in Safari and Chrome.",
            "Record exact browser name/version/build and native-vs-emulated status, per-feature probe results, actual runtime engine/hardware identity where applicable, viewport/input, mode, source/commit, tarball, actions, numeric/semantic observations, console/unhandled-rejection ledger, and evidence hashes; `Safari-current`/`Chrome-current` are enrollment labels, never receipt identities.",
            "Use images for human review only where gestalt/paint needs it; prohibit screenshot equality and stale-capture acceptance.",
            "For animation/performance claims, record the resolved custom-property sink graph plus trace-derived layout/paint/composite classification, CLS, main-thread work, and frame pacing; source property names and allowlist membership cannot supply compositor credit.",
            "Fail when a visual wave has no scenario, a declared capture is absent, a server is wrong, or evidence predates its terminal commit.",
            "Ingest the 124×2 rendered formation census only as RED/observational design input; its in-app harness, screenshot hashes, and unavailable engine identity can never satisfy native Safari/Chrome π, DELTA, tested-source refresh, or an execution invariant.",
            "Require zero unexpected console warnings/errors and zero unhandled rejections in ordinary scenarios; expected injected failures must match one named typed error and may not continue as product success.",
            "Exercise editor controls through success and failure receipts: pointer/keyboard value parity, Clipboard success/denial/missing-API status, playback restart/final/PRM state, and rendered text-control geometry are semantic observables rather than inferred source enrollment.",
        ],
        subjects: [
            ...subjects([
                "tests-visual/pi-runner-manifest.mjs", "tests-visual/helpers/scenario-runner.ts", "scripts/pi/run.mjs", "scripts/pi/evidence-schema.json",
                "tests/pi/scenario-runner.test.ts",
            ]),
            { path: "docs/tranches/BI/FORMATION/build-rendered-demo-audit.mjs", action: "verify", before: null, producedBy: "FORMATION" },
            { path: "docs/tranches/BI/FORMATION/rendered-demo-addenda.registry.mjs", action: "verify", before: null, producedBy: "FORMATION" },
            { path: "docs/tranches/BI/FORMATION/refresh-rendered-demo-authored-research.mjs", action: "verify", before: null, producedBy: "FORMATION" },
            { path: "docs/tranches/BI/FORMATION/rendered-demo-audit.json", action: "verify", before: null, producedBy: "FORMATION" },
            { path: "docs/tranches/BI/FORMATION/RENDERED-DEMO-AUDIT.md", action: "verify", before: null, producedBy: "FORMATION" },
        ],
        repairs: repair({
            tests: ["tests/pi/scenario-runner.test.ts", "tests-visual/served-app-sentinel.spec.ts"],
            build: ["package.json", "tests-visual/playwright.config.ts"],
            docs: ["CONTRIBUTING.md", "DESIGN.md"],
        }),
        invariant: "Every visual claim has fresh warning-clean semantic native Safari/Chrome evidence for the exact terminal source and actual renderer, including trace-backed animation-channel classification where claimed, and cannot pass from an image hash, source whitelist, formation capture, missing capture, wrong server, harness-provided identity, unhandled rejection, or older commit.",
        bite: "Copy a green parent-commit receipt, substitute the formation in-app capture, point at a static wrong app, emit the current Dock/Aurora warning while marking success, or label a paint/custom-property animation compositor-only without its sink/trace payload; evidence must fail.",
        invariants: ["demo.scenario-contract", "integrity.release", "integrity.lineage", "performance.experience", "design.token-graph"],
        pi: piBrowser(["runner-selftest-safari", "runner-selftest-chrome", "runner-wrong-server", "runner-stale-evidence", "runner-formation-capture-no-credit", "runner-harness-engine-spoof", "runner-unexpected-console", "runner-missing-capture"], ["source/browser/runtime-engine binding", "served-app identity", "causal semantic/numeric observable", "console/unhandled-rejection cleanliness", "freshness", "negative fixture red"]),
        deps: ["BI.W-P057"],
        locks: ["visual-runner", "package-manifest"],
    }),
    wave({
        id: "BI.W-P062",
        title: "Story-wide accessibility-mode orchestration",
        band: "demo",
        intent: "Enroll every applicable story in keyboard, reduced-motion, reduced-transparency, contrast, forced-colors, zoom, and coarse-input scenarios as it lands.",
        scope: [
            "Derive applicable modes from component semantics and story metadata rather than a fixed component count.",
            "Run generic focus/landmark/name/target/overflow checks plus family-specific behavioral invariants, including modal background inertness/aria isolation, invalid-field error linkage, inactive-face removal from the accessibility/focus tree, and keyboard reveal of offscreen Dock actions.",
            "Make missing mode metadata or an untestable interactive story fail in the producing component wave.",
            "Keep the matrix incremental so no terminal accessibility sweep discovers first-order omissions.",
            "At 390×844 coarse input, reject opacity-zero focusables, non-intersecting actions without a focus-reveal/overflow projection, nondegenerate scrollers below the declared usable extent, and interactive targets below their semantic floor.",
            "Inspect interactive SVG descendants rather than crediting the host image: draggable editor handles require names, values/bounds, focus, keyboard parity, and visible focus while the noninteractive plot retains its description.",
            "Discover every composed operable surface from the current import/render/route graph, including intrinsic controls, polymorphic as/asChild hosts, clickable table headers/rows/cards, canvas/SDF hit layers, list-item choices, per-glyph handlers, imperative DOM listeners, intrinsic render-function handlers, and custom-component event delegation. Source tags, wrapper names, host roles, and a fixed file/arm count receive no completeness credit.",
        ],
        subjects: [
            ...subjects(["tests-visual/accessibility-matrix.spec.ts", "tests-visual/helpers/story-matrix.ts"]),
            { path: "tests/a11y/story-contract.test.ts", action: "modify", before: null, producedBy: "BI.W-P022" },
            { path: "demo/stories/manifest/schema.ts", action: "modify", before: null, producedBy: "BI.W-P057" },
        ],
        repairs: repair({
            tests: ["tests/a11y/story-contract.test.ts", "tests-visual/accessibility-matrix.spec.ts"],
            docs: ["CONTRIBUTING.md", "DESIGN.md"],
        }),
        invariant: "Applicable accessibility/input modes are declared and green when each story lands; modal isolation, form error linkage, inactive-face exclusion, mobile action reachability, and target floors are first-order predicates rather than terminal-sweep discoveries.",
        bite: "Remove forced-colors enrollment, leave #app exposed behind a modal, detach an invalid field's error, keep an opacity-zero Dock face tabbable, move a pointer-only action behind a custom wrapper, or credit a semantic sibling for an inoperable control; schema/matrix coverage must fail before its component wave closes.",
        invariants: ["design.adaptive-accessibility", "behavior.focus-escape", "design.responsive-touch", "demo.scenario-contract"],
        pi: piBrowser(["matrix-keyboard", "matrix-modal-isolation", "matrix-invalid-error-linkage", "matrix-inactive-face", "matrix-prm", "matrix-reduced-transparency", "matrix-contrast", "matrix-forced-colors", "matrix-zoom", "matrix-coarse-390x844"], ["enrollment completeness", "focus/name/role and background isolation", "error description linkage", "state visibility", "overflow/focus reveal/target floor", "zero hidden action"]),
        deps: ["BI.W-P022", "BI.W-P057", "BI.W-P061"],
        locks: ["demo-manifest", "visual-runner"],
    }),
];

const C = (name, tier, category, concept, contract, states, invariants, options = {}) => ({
    name,
    pascal: options.pascal ?? name.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join(""),
    tier,
    category,
    concept,
    contract,
    states,
    invariants,
    decision: options.decision ?? "retain",
    decisionText: options.decisionText ?? "Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS.",
    bite: options.bite,
    observables: options.observables ?? ["role/state", "focus/keyboard", "material/contrast", "responsive geometry", "motion/PRM"],
    members: options.members ?? [{
        tier,
        name,
        action: options.decision === "delete" ? "delete" : (options.targetDir ? "rename" : "modify"),
        targetDir: options.targetDir,
    }],
    targetDir: options.targetDir,
    dependsOnNames: options.dependsOnNames ?? [],
    extraDeps: options.extraDeps ?? [],
    storySlug: options.storySlug ?? name,
    deleteRefs: options.deleteRefs ?? [],
    ownerContext: options.ownerContext,
    ownerScenarioPrefix: options.ownerScenarioPrefix,
    productJudgment: options.productJudgment,
    extraScope: options.extraScope ?? [],
    extraSubjects: options.extraSubjects ?? [],
    extraRepairImports: options.extraRepairImports ?? [],
    extraRepairTests: options.extraRepairTests ?? [],
    extraLocks: options.extraLocks ?? [],
});

export const COMPONENT_CONCEPTS = [
    C("surface", "ui", "display", "semantic material/elevation primitive", "Surface alone selects material and elevation; it never implies content grouping, interactivity, or a copied glass recipe.", ["content", "elevated", "functional", "overlay", "dark", "reduced-transparency"], ["design.material-hierarchy", "design.material-hierarchy"], { productJudgment: "Retain as the library's noninteractive material/elevation axis: Card, Button, overlays, and Dock must compose one Surface grammar instead of copying Glass recipes, so external absence at the new clean-break name is expected rather than evidence of shelf-ware.", bite: "Give Surface a pressable variant and duplicate Button semantics; concept topology must fail." }),
    C("section", "ui", "containers", "private semantic document/layout section", "Section provides landmark/heading/spacing composition only and remains private unless an external runtime consumer proves a public need.", ["heading", "nested", "narrow", "landmark"], ["architecture.component-topology", "design.typography"], { decision: "private", decisionText: "Keep as a private layout family; remove any package export or styling role that duplicates Surface/Card.", ownerContext: "StoryPage and surviving content-page section compositions", ownerScenarioPrefix: "story-page-section", bite: "Export Section as a material variant or let it mint glass; topology/material evidence must turn RED." }),
    C("button", "ui", "display", "command/action control", "Button has one command contract, semantic tone/emphasis/size, shared press/focus/icon geometry, and native disabled/submission behavior.", ["default", "primary", "destructive", "disabled", "loading", "icon", "keyboard", "touch", "prm"], ["design.affordance", "behavior.forms", "design.affordance"], { extraDeps: ["BI.W-P027"], bite: "Make a static decorative surface render through Button or remove native disabled semantics; behavioral evidence must turn RED." }),
    C("label", "ui", "forms", "form-control label", "Label preserves native label association, required/optional annotation, disabled state, and no appearance wrapper semantics.", ["associated", "required", "disabled", "wrapped", "narrow"], ["behavior.forms", "design.typography"], { bite: "Render a visual label without for/id or nesting association; form semantics must fail." }),
    C("input", "ui", "forms", "single-line text input", "Input preserves native value/form/autocomplete/inputmode/invalid semantics and consumes one field material/size contract.", ["default", "focus", "invalid", "disabled", "readonly", "autocomplete", "touch"], ["behavior.forms", "design.affordance"], { dependsOnNames: ["label"], bite: "Style invalid state without aria-invalid/description linkage; form evidence must turn RED." }),
    C("textarea", "ui", "forms", "multiline text input", "Textarea owns multiline editing, resize, wrapping, validation, and form semantics without copying Input implementation or inventing another field material.", ["default", "focus", "invalid", "disabled", "readonly", "resize", "narrow"], ["behavior.forms", "design.responsive-touch"], { dependsOnNames: ["label"], bite: "Disable resize while content becomes unreachable at narrow width; responsive/form evidence must turn RED." }),
    C("separator", "ui", "display", "semantic or decorative separator", "Separator distinguishes decorative from semantic orientation and consumes one hairline/spacing grammar; it never becomes a generic container.", ["decorative", "semantic", "horizontal", "vertical", "dark"], ["design.material-hierarchy", "design.adaptive-accessibility"], { bite: "Expose a decorative separator to the accessibility tree without semantics; accessibility evidence must turn RED." }),
    C("skeleton", "ui", "feedback", "content-shape loading placeholder", "Skeleton mirrors reserved content geometry, is hidden from AT when decorative, never loops under PRM, and does not substitute for explicit loading semantics.", ["text", "avatar", "card", "dark", "prm", "reduced-transparency"], ["behavior.feedback", "motion.reduced"], { bite: "Keep shimmer looping under PRM or let Skeleton cause layout shift on replacement; motion/layout evidence must turn RED." }),
    C("avatar", "ui", "data", "person/entity image identity", "Avatar owns image, accessible name/alt policy, fallback initials, load failure, status composition, and stable geometry without a second image-loading path.", ["image", "initials", "broken", "status", "group", "narrow"], ["behavior.data", "design.affordance"], { bite: "Expose both image alt and duplicated initials to AT; semantic evidence must turn RED." }),
    C("badge", "ui", "display", "compact categorical metadata", "Badge is noninteractive metadata with semantic tone/emphasis and noncolor distinction; command behavior belongs to Button/Chip.", ["neutral", "info", "success", "warning", "destructive", "long-text", "forced-colors"], ["behavior.feedback", "design.affordance"], { bite: "Make Badge clickable without command semantics or focus; affordance evidence must turn RED." }),
    C("alert", "ui", "feedback", "persistent inline status message", "Alert owns inline status semantics, title/body/action structure, tone, and live-region policy; it never behaves like transient Toast.", ["info", "success", "warning", "destructive", "action", "forced-colors"], ["behavior.feedback", "design.contrast"], { bite: "Auto-dismiss Alert or give every informational alert assertive announcement; feedback semantics must fail." }),
    C("notification-toast", "ui", "feedback", "transient queued toast presentation", "One Reka-backed Toast family owns provider, queue, viewport, item, action, close, swipe, lifetime, tone, and announcements; Notification's parallel TransitionGroup engine is deleted.", ["single", "stack", "action", "swipe", "timeout", "destructive", "keyboard", "prm"], ["behavior.feedback", "behavior.overlay-apg", "motion.transition-continuity"], {
        pascal: "Toast",
        decision: "fold",
        decisionText: "Fold ui/notification into ui/toast; delete the parallel Notification contract/export and migrate all consumers to one Toast queue/presentation family.",
        members: [{ tier: "ui", name: "toast", action: "modify" }, { tier: "ui", name: "notification", action: "delete" }],
        extraDeps: ["BI.W-P029"],
        storySlug: "toast",
        deleteRefs: ["demo/stories/feedback/notification.vue", "demo/stories/feedback/toaster.vue"],
        bite: "Restore Notification's second TransitionGroup queue or a second announcement/lifetime owner; topology/feedback evidence must turn RED.",
    }),
    C("progress", "ui", "data", "determinate/indeterminate progress", "Progress exposes truthful value/min/max/indeterminate/segmented semantics, readable state, stable geometry, and no invented completion claim.", ["determinate", "indeterminate", "segmented", "complete", "error", "vertical", "prm"], ["behavior.data", "behavior.feedback"], {
        extraScope: [
            "Remove ProgressDefault, ProgressGradient, ProgressLiquid, and ProgressSectioned from root and /progress publication: all four have only internal Progress-dispatcher witnesses and no independent runtime/demo contract.",
            "Keep or reshape variant paint/geometry only behind Progress's typed variant axis so every flavor shares one value/min/max/indeterminate/error/vertical/PRM owner; internal composition never donates public-member demand.",
        ],
        bite: "Announce an indeterminate bar as a false percentage, render value beyond max, re-export an internal variant child, or let a child compute state outside Progress; data/topology evidence must turn RED.",
    }),
    C("pulse", "custom", "feedback", "activity/liveness signal", "Pulse communicates active work without assertive semantics or perpetual motion ambiguity and becomes a static but visible signal under PRM.", ["active", "idle", "success", "warning", "dark", "prm"], ["behavior.feedback", "motion.reduced"], { bite: "Keep an endless breathing animation under PRM or announce decorative pulse assertively; feedback/motion evidence must turn RED." }),
    C("status-dot", "custom", "feedback", "compact nontext status indicator", "StatusDot has an accessible label when meaningful, a decorative mode when paired with text, and shape/noncolor state distinctions.", ["decorative", "labeled", "online", "warning", "error", "unknown", "forced-colors"], ["behavior.feedback", "design.adaptive-accessibility"], { bite: "Remove the label and rely only on red/green hue; feedback/forced-colors evidence must turn RED." }),
    C("animated-digit", "custom", "data", "numeric digit transition", "AnimatedDigit preserves numeric identity, tabular geometry, direction, rapid-update interruption, locale, AT announcement policy, and PRM instant state.", ["increment", "decrement", "rapid", "negative", "locale", "prm"], ["behavior.data", "motion.transition-continuity"], { extraDeps: ["BI.W-P029"], bite: "Let rapid updates announce every intermediate digit or shift width; data/continuity evidence must turn RED." }),
    C("split-chars", "custom", "motion", "accessible grapheme/word visual split", "SplitChars creates grapheme-safe visual spans while exposing the unsplit text once to AT and delegates all motion to the shared motion language.", ["char", "word", "grapheme", "heading", "dynamic-text", "prm"], ["design.typography", "motion.reduced"], { productJudgment: "Retain as the explicit accessible substrate for the charter's audacious text-motion center: grapheme-safe visual splitting plus one unsplit AT name is a reusable semantic seam, not an effect that each hero or Handmark composition may reimplement.", bite: "Split a ZWJ grapheme or expose each glyph to AT; typography/accessibility evidence must turn RED." }),
    C("typewriter", "custom", "motion", "progressive textual reveal", "Typewriter reveals grapheme-safe text through one cancellable discrete timing authority, with stable layout, explicit announcement policy, interruption/reset, complete immediate text under PRM, and no hidden pointer-only per-character editing behavior.", ["play", "pause", "reset", "rapid-change", "multiline", "keyboard", "prm"], ["motion.single-clock", "design.typography", "behavior.focus-escape", "architecture.clean-break"], {
        dependsOnNames: ["split-chars"],
        extraDeps: ["BI.W-P025"],
        extraScope: [
            "Delete the default-true interactive prop and per-character click/backspace handlers: every first-party story already disables them, no current consumer demonstrates or justifies glyph-as-control semantics, and progressive reveal is not a text editor.",
            "Keep glyphs as ordinary semantic text. Pause/resume/reset are separately named native commands; if a future editing concept is wanted, it requires a newly formed focus/caret/selection/modality contract rather than click handlers on spans.",
        ],
        bite: "Create an uncancelled timer per glyph, strand a delay after reset/unmount, leave incomplete text under PRM, or restore click-only character deletion hidden from the direct story; motion/type/clean-break evidence must turn RED.",
    }),
    C("color-swatch", "custom", "forms", "configurator-private color value control", "ColorSwatch becomes a Configurator-owned part with value/name/contrast/copy semantics; it is not a standalone public concept without external evidence.", ["opaque", "alpha", "invalid", "contrast", "copy", "keyboard"], ["behavior.forms", "design.contrast"], {
        decision: "private",
        decisionText: "Move under src/components/configurator/parts/color-swatch and remove its public entry unless a current tracked external import is proven.",
        targetDir: "src/components/configurator/parts/color-swatch",
        extraDeps: ["BI.W-P052"],
        ownerContext: "Configurator stories that edit live component and procedural color values",
        ownerScenarioPrefix: "configurator-color-swatch",
        bite: "Keep a public color-swatch export with no external runtime consumer; consumer-bearing evidence must turn RED.",
    }),
    C("dark-mode-toggle", "custom", "display", "global appearance toggle", "DarkModeToggle is one global-theme command with native pressed/state naming, shared press/motion, instant PRM, and no long-press novelty that obscures the basic action.", ["light", "dark", "keyboard", "touch", "rapid", "prm"], ["design.affordance", "motion.transition-continuity"], {
        pascal: "DarkModeToggle",
        decision: "rename",
        decisionText: "Rename the vague /controls family/entry to /dark-mode-toggle and remove the collective alias; it contains exactly one concept.",
        members: [{ tier: "custom", name: "controls", action: "rename", targetDir: "src/components/dark-mode-toggle" }],
        extraDeps: ["BI.W-P027", "BI.W-P029"],
        extraScope: [
            "Delete the passive prop, its pointer-styled div branch, and the passive no-op story: no tracked consumer requires it, a decorative icon is not a Toggle, and a no-op trigger contradicts the single-command concept.",
            "Delete the eclipse long-press novelty and its private timer. The one native button path owns click/Enter/Space/touch, pressed state, rapid reversal, shared press motion, cancellation, and PRM without a second gesture mode.",
        ],
        bite: "Preserve /controls as an alias, retain passive as an action-styled no-op, keep the long-press eclipse fork, or let local theme state diverge from useGlobalDark; clean-break/state/affordance evidence must turn RED.",
    }),
    C("stacked-icons", "custom", "display", "decorative overlapping icon/avatar composition", "The current wrapper has no distinct public semantic contract and must not survive as an exported concept on layout alone.", ["local-consumer-migration"], ["architecture.component-topology", "architecture.component-topology"], {
        decision: "delete",
        decisionText: "Delete the public family/export and replace local sites with ordinary composition; no external tracked import justifies a primitive.",
        extraScope: [
            "Delete expandOnHover and the dedicated fan choreography rather than repairing it: the seven-item direct story promises hidden-item reveal, but visibleItems slices the four hidden items out of the DOM and the intended overlap classes compute to 0px. A false first-party novelty with zero external imports is deletion evidence, not a new interaction contract.",
            "Migrate the two local avatar/display compositions explicitly, then delete the /stacked-icons subpath, family story branch, CSS, types, tests, and docs without alias, private wrapper, or dormant hover infrastructure.",
        ],
        bite: "Restore the export with only demo/docs mentions as evidence, retain expandOnHover after deleting the story, or claim hover reveals item identities absent from the DOM; consumer-bearing topology and causal scenario evidence must turn RED.",
        observables: ["definition absence", "local composition behavior", "entry/migration truth"],
    }),
    C("paper-backdrop", "custom", "substrates", "warm page/content field", "PaperBackdrop remains a consumed public page-field concept but becomes a thin semantic host over the one global content-field recipe, never a nested material fork.", ["light", "dark", "long-content", "print", "reduced-transparency"], ["design.material-hierarchy", "design.responsive-touch"], { extraDeps: ["BI.W-P016"], bite: "Add a component-local paper texture/material implementation divergent from the global field; ownership/material evidence must turn RED." }),
    C("border-progress", "custom", "data", "retired progress-ring decoration", "The already-unexported family is dead residue; progress/ring behavior belongs to Progress or an owning product composition.", ["definition-absence"], ["architecture.component-topology", "architecture.clean-break"], {
        decision: "delete",
        decisionText: "Delete the remaining directory, CSS, docs, tests, and historical proof-command residue; do not re-export or replace it with an alias.",
        bite: "Restore a border-progress definition or export and require retired-subject detection to fail.",
        observables: ["definition/export absence", "replacement consumer behavior", "CSS selector absence"],
        deleteRefs: ["tests-visual/border-progress.spec.ts", "tests/components/custom/border-progress/spectrum-walk.test.ts"],
    }),

    C("checkbox", "ui", "forms", "binary/indeterminate form selection", "Checkbox preserves checked/indeterminate/form/name/value/disabled/required semantics, visible focus, and noncolor state through Reka without copied shadcn styling.", ["unchecked", "checked", "indeterminate", "disabled", "invalid", "keyboard", "forced-colors"], ["behavior.selection", "behavior.forms"], { bite: "Render indeterminate as checked or omit native form value; selection/form evidence must turn RED." }),
    C("radio-group", "ui", "forms", "exclusive form selection", "RadioGroup owns one required/exclusive value, orientation, roving focus, label/error linkage, form value, and touch geometry.", ["horizontal", "vertical", "required", "invalid", "disabled-item", "keyboard", "touch"], ["behavior.selection", "behavior.forms"], { dependsOnNames: ["label"], bite: "Allow two checked values or break arrow-key orientation; selection evidence must turn RED." }),
    C("switch", "ui", "forms", "binary immediate setting", "Switch has switch role/checked state, form participation, label/error linkage, shared press, and visible on/off distinction without duplicating Checkbox semantics.", ["off", "on", "disabled", "invalid", "keyboard", "touch", "prm"], ["behavior.selection", "behavior.forms"], { dependsOnNames: ["label"], extraDeps: ["BI.W-P027"], bite: "Expose aria-pressed instead of checked or rely only on thumb color; semantics/affordance evidence must turn RED." }),
    C("toggle", "ui", "forms", "independent pressed command", "Toggle owns aria-pressed command state and shared Button press/material; it is not a Checkbox or Tab and remains private to aggregate entries if no direct export is needed.", ["off", "on", "disabled", "icon", "keyboard", "touch"], ["behavior.selection", "design.affordance"], { extraDeps: ["BI.W-P027"], bite: "Give Toggle tab role or form checkbox semantics; selection evidence must turn RED." }),
    C("toggle-group", "ui", "forms", "single/multiple pressed-command group", "ToggleGroup declares single/multiple selection, orientation, roving focus, disabled state, and one shared Toggle visual/press contract.", ["single", "multiple", "horizontal", "vertical", "disabled", "keyboard", "touch"], ["behavior.selection", "design.affordance"], { dependsOnNames: ["toggle"], bite: "Allow two values in single mode or duplicate Toggle styles; selection/ownership evidence must turn RED." }),
    C("chip", "custom", "forms", "compact selection/filter/action chip", "One Chip family owns text/icon/removal/selection/action semantics with explicit modes; IconChip is a slot/size form, not a second concept/export.", ["static", "selectable", "selected", "removable", "icon", "disabled", "keyboard", "touch"], ["behavior.selection", "design.affordance"], {
        pascal: "Chip",
        decision: "fold",
        decisionText: "Fold icon-chip into chip through slots/size semantics; delete IconChip export, wrapper, CSS, story, and compatibility name.",
        members: [{ tier: "custom", name: "chip", action: "modify" }, { tier: "custom", name: "icon-chip", action: "delete" }],
        extraDeps: ["BI.W-P027"],
        deleteRefs: ["demo/stories/forms/selectable-chip.vue", "demo/stories/forms/toggle-chip.vue", "tests-visual/icon-chip.spec.ts"],
        bite: "Restore IconChip as a second export or let Chip mode be inferred ambiguously from slot content; topology/selection evidence must turn RED.",
    }),
    C("tabs", "custom", "navigation", "tabbed panel selection", "Tabs owns APG tablist/tab/tabpanel, orientation, activation, roving focus, indicator, responsive overflow, controlled value, and shared selection motion.", ["horizontal", "vertical", "manual", "automatic", "overflow", "disabled", "keyboard", "touch", "prm"], ["behavior.selection", "motion.transition-continuity"], { extraDeps: ["BI.W-P028"], bite: "Use aria-pressed or hide inactive panels without correct semantics; selection evidence must turn RED." }),
    C("slider", "ui", "forms", "single/range numeric slider", "Slider preserves min/max/step/orientation/single-range/keyboard/touch/form semantics and stable thumb/track geometry with no duplicate spring engine.", ["single", "range", "vertical", "disabled", "invalid", "keyboard", "touch", "prm"], ["behavior.forms", "behavior.selection"], { extraDeps: ["BI.W-P032"], bite: "Let range thumbs cross without declared behavior or make keyboard step differ from pointer; form evidence must turn RED." }),
    C("number-field", "ui", "forms", "numeric text/stepper input", "NumberField owns locale parse/format, min/max/step, spinbutton keyboard, buttons, form value, invalid state, and does not fork Input/Label material.", ["default", "min-max", "decimal", "invalid", "disabled", "keyboard", "touch"], ["behavior.forms", "design.responsive-touch"], { dependsOnNames: ["input", "button", "label"], bite: "Display a formatted value that submits a different unvalidated number; form contract must fail." }),
    C("select", "ui", "forms", "single-value listbox select", "Select owns trigger/listbox/options, label/error, keyboard/typeahead, portal/position, controlled value, form semantics, and shared overlay material.", ["closed", "open", "selected", "disabled-option", "invalid", "keyboard", "touch", "narrow"], ["behavior.forms", "behavior.overlay-apg"], {
        dependsOnNames: ["label"],
        extraScope: [
            "Remove SelectScrollUpButton and SelectScrollDownButton from root and /select publication: both are used only inside SelectContent and are private overflow/active-option-visibility affordances, not independently demanded products.",
            "Exercise long-list autoscroll, keyboard active-option visibility, touch, collision, focus, and teardown through public Select composition while keeping exactly one SelectContent scroll owner.",
        ],
        bite: "Lose the selected option or label linkage through portal rendering, re-export an internal scroll child, or let pointer autoscroll diverge from keyboard active visibility; form/overlay/topology evidence must turn RED.",
    }),
    C("combobox", "ui", "forms", "editable listbox selection", "Combobox owns editable input, filtering, active descendant, freeform/selection policy, async/empty/error state, and shared overlay/focus semantics.", ["closed", "open", "filter", "empty", "async", "invalid", "keyboard", "touch"], ["behavior.forms", "behavior.overlay-apg"], {
        dependsOnNames: ["input"],
        productJudgment: "Retain as the editable-listbox APG primitive distinct from Select and Search: active-descendant, freeform policy, async states, and input/listbox coupling are foundational form semantics even before a tracked sibling adopts the clean 5.0 entry.",
        extraScope: [
            "Delete ComboboxCancel, ComboboxSeparator, and ComboboxViewport from the forms public entry; recursive barrels, nine tracked consumer HEADs, source composition, and the live two-product specimen give all three zero causal witnesses.",
            "Keep clear/reset on the explicit root/input value policy, named grouping on ComboboxGroup, and popup bounds/large-list scrolling on ComboboxList; do not render speculative nodes merely to preserve upstream inventory.",
            "Exercise controlled clear/reset, filter, empty/async/error, named groups, large-result scrolling/active visibility, selection, Escape focus restoration, keyboard, and touch through the remaining exact compound members.",
        ],
        extraSubjects: [
            flatCurrent("ui", "combobox", "ComboboxSeparator.vue", "delete"),
            flatCurrent("ui", "combobox", "ComboboxViewport.vue", "delete"),
        ],
        bite: "Move visual highlight without updating active-descendant/value, restore any of the three zero-witness exports, count CommandSeparator as ComboboxSeparator, or nest List/Viewport scroll owners; combobox/topology evidence must turn RED.",
    }),
    C("tags-input", "ui", "forms", "multi-token text entry", "TagsInput owns token creation/removal/editing, duplicate policy, delimiter/IME, keyboard roving/deletion, form value, invalid state, and Chip composition.", ["empty", "tokens", "edit", "duplicate", "invalid", "keyboard", "touch"], ["behavior.forms", "behavior.selection"], { dependsOnNames: ["chip", "input"], productJudgment: "Retain as a distinct multi-token form primitive: IME/delimiter creation, editable token identity, roving deletion, duplicate policy, and serialized form value cannot be reduced to a plain Input plus decorative Chips without duplicating behavior.", bite: "Delete a token on Backspace while its text is nonempty or duplicate form values; form evidence must turn RED." }),
    C("labeled-field", "custom", "forms", "label/description/error/control field composition", "LabeledField composes Label and a slotted control through stable IDs, required/optional, description/error, invalid/disabled state, and layout only; it never restyles the control.", ["default", "description", "required", "invalid", "disabled", "horizontal", "narrow"], ["behavior.forms", "design.typography"], { dependsOnNames: ["label", "input"], bite: "Generate IDs visually but fail to bind error description to the slotted control; form evidence must turn RED." }),
    C("search", "custom", "forms", "query input with result/navigation semantics", "Search owns query, clear, submit, async/loading/empty/error, optional suggestions, keyboard navigation, and result announcement without duplicating Combobox when selection is not its concept.", ["empty", "query", "loading", "results", "no-results", "error", "keyboard", "touch"], ["behavior.forms", "behavior.overlay-apg"], { dependsOnNames: ["input", "button"], bite: "Announce every keystroke assertively or lose query focus when results update; behavioral evidence must turn RED." }),

    C("focus-scope", "ui", "containers", "private overlay focus containment/restoration substrate", "One private focus scope serves Dialog/Drawer/Popover/Menu/Dock overlays with stack-aware containment and restoration; it is not a public visual component.", ["contain", "nested", "restore", "trigger-removed", "route-change"], ["behavior.focus-escape", "architecture.component-topology"], {
        decision: "private",
        decisionText: "Move under src/components/_shared/overlay/focus-scope and remove its public entry; all overlay families consume it privately.",
        targetDir: "src/components/_shared/overlay/focus-scope",
        ownerContext: "Dialog, Drawer, Popover, Menu, and Dock overlay integrations",
        ownerScenarioPrefix: "overlay-focus-scope",
        bite: "Re-export FocusScope or create a second containment implementation in Dialog; topology/focus evidence must turn RED.",
    }),
    C("collapsible", "ui", "containers", "single disclosure region", "Collapsible owns expanded state, trigger/content linkage, controlled value, keyboard activation, size transition, and PRM without accordion group semantics.", ["closed", "open", "controlled", "disabled", "keyboard", "prm"], ["behavior.selection", "motion.transition-continuity"], { extraDeps: ["BI.W-P029"], bite: "Hide content visually while aria-expanded remains true or animate layout under PRM; selection/motion evidence must turn RED." }),
    C("accordion", "ui", "containers", "single/multiple disclosure group", "Accordion composes disclosure items with single/multiple/collapsible policy, heading/trigger/content structure, keyboard navigation, controlled value, and shared transition.", ["single", "multiple", "collapsible", "disabled", "keyboard", "prm"], ["behavior.selection", "motion.transition-continuity"], { dependsOnNames: ["collapsible"], productJudgment: "Retain as the grouped-disclosure APG primitive distinct from one Collapsible: single/multiple policy, heading structure, roving navigation, and coordinated controlled value are reusable semantics that composition alone would otherwise fork.", bite: "Open two items in single mode or detach trigger from region; selection evidence must turn RED." }),
    C("popover", "ui", "containers", "nonmodal anchored interactive overlay", "Popover owns controlled open, trigger/content linkage, positioning, focus, outside/Escape dismissal, portal, collision, and shared functional-glass overlay material.", ["closed", "open", "collision", "nested", "keyboard", "touch", "prm"], ["behavior.overlay-apg", "behavior.focus-escape"], { dependsOnNames: ["focus-scope"], bite: "Close a nested Popover when interacting with its teleported child or restore focus incorrectly; overlay evidence must turn RED." }),
    C("tooltip", "ui", "containers", "terse noninteractive description overlay", "One Tooltip family owns delayed hover/focus description, escape, no interactive content, touch policy, accessible description, and IconTooltip is only trigger content.", ["focus", "hover", "delay", "escape", "icon-trigger", "touch-policy", "prm"], ["behavior.overlay-apg", "design.affordance"], {
        pascal: "Tooltip",
        decision: "fold",
        decisionText: "Fold custom/icon-tooltip into ui/tooltip; delete the wrapper/export and migrate icon triggers to ordinary Tooltip composition.",
        members: [{ tier: "ui", name: "tooltip", action: "modify" }, { tier: "custom", name: "icon-tooltip", action: "delete" }],
        dependsOnNames: ["focus-scope"],
        deleteRefs: ["demo/stories/containers/icon-tooltip.vue"],
        bite: "Restore IconTooltip or allow focusable interactive content inside Tooltip; topology/overlay evidence must turn RED.",
    }),
    C("dropdown-menu", "ui", "containers", "menu of commands/choices", "DropdownMenu owns menu/menuitem roles, submenus, check/radio items, roving/typeahead, dismissal, focus restoration, portal/collision, and shared overlay material.", ["open", "submenu", "checkbox", "radio", "disabled", "keyboard", "touch"], ["behavior.overlay-apg", "behavior.selection"], {
        dependsOnNames: ["focus-scope"],
        extraScope: [
            "Delete the zero-witness DropdownMenuPortal projection from root and /dropdown-menu: DropdownMenuContent already selects and mounts the correct Dropdown/Context Portal through useMenuPart.",
            "Prove click-menu and context-menu branches each own exactly one portal, collision, submenu layering, Dock owner attributes, focus restoration, dismissal, and teardown without a consumer-wrappable portal escape hatch.",
        ],
        bite: "Use menuitem for a persistent form control, break submenu Arrow/Escape ownership, restore DropdownMenuPortal, or double-teleport Content; menu/topology evidence must turn RED.",
    }),
    C("dialog", "ui", "containers", "modal/nonmodal dialog", "Dialog owns title/description, modality, focus containment/restoration, inert background, dismissal policy, portal, size/scroll, and shared overlay material/motion.", ["modal", "nonmodal", "scroll", "nested", "no-close", "keyboard", "touch", "prm"], ["behavior.overlay-apg", "behavior.focus-escape"], {
        dependsOnNames: ["focus-scope"],
        extraDeps: ["BI.W-P029"],
        extraScope: [
            "Delete zero-witness DialogScrollContent and fold its long-content behavior into one explicit DialogContent size/scroll axis; no second DialogPortal/ModalOverlay/close/style recipe or alias survives.",
            "Collapse ModalOverlay to the distinct behavior Dialog actually consumes: no forward-reserved edge layout, no scale/slide spellings that resolve to fade, and no unused none arm. Preserve a scroll switch only if the folded DialogContent owner causally needs it.",
            "Exercise viewport-bounded inner scroll, inert background, title/description, focus, outside/Escape dismissal, touch, narrow geometry, and PRM with content that actually overflows.",
        ],
        extraSubjects: [flatCurrent("ui", "dialog", "DialogScrollContent.vue", "delete")],
        bite: "Open a modal without accessible title/background inertness, restore DialogScrollContent, keep a second overlay recipe, or prove scroll with nonoverflowing content; dialog/topology evidence must turn RED.",
    }),
    C("drawer", "ui", "containers", "edge-attached dialog/drawer", "Drawer is Dialog semantics plus truthful modal/live-behind and fixed/detented modes. An explicit detent grip is one named slider-equivalent control whose pointer, touch, Arrow, Home, and End paths share activeSnapPoint, paint, stage, announcement, interruption, and PRM state; a fixed Drawer renders no drag affordance, and no historical Sheet alias survives.", ["left-fixed", "right-fixed", "bottom-fixed", "explicit-detents", "live-behind-default-detents", "inner-scroll", "keyboard-arrows-home-end", "touch", "interrupt", "prm"], ["behavior.overlay-apg", "behavior.focus-escape", "behavior.selection", "design.adaptive-accessibility", "design.responsive-touch", "demo.scenario-contract", "motion.single-clock"], {
        dependsOnNames: ["dialog"],
        extraScope: [
            "Separate modal/content-sized omission from live-behind defaulting: omitted snapPoints on an ordinary Drawer means one full resting position and no handle; only a declared detented/live-behind contract synthesizes the default ladder.",
            "Replace the aria-hidden 25px pointer-only div with a coarse-target semantic detent control only when two or more stops exist; expose name, bounded value/value text, visible focus, Arrow stepping, Home/End, and one pointer/touch/keyboard state writer.",
            "Bind every settle and interruption to the public v-model readback, sheet/stage/scrim scalar, focus and announcement policy, reduced motion, nested scrolling, dismiss thresholds, and direct story readback; source comments or the dialog role cannot launder the grip.",
            "Remove DrawerOverlay from public projection while keeping the scrim private to DrawerContent/shared overlay ownership; modal/live-behind scenarios, not internal imports, prove its behavior.",
            "Delete DrawerPortal from /drawer without a root alias because DrawerContent already owns DialogPortal. Route muster's wrong-root MobileInstrumentSheet import and outer wrapper through the read-only constellation owner packet; exactly one portal boundary survives.",
        ],
        extraDeps: ["BI.W-P004", "BI.W-P032"],
        bite: "Restore Sheet/DrawerPortal/public DrawerOverlay, render an aria-hidden drag handle, preserve muster's double portal, let ordinary omission inherit the live-behind ladder, diverge keyboard/pointer detents, split paint from v-model, or let drag dismiss while inner scroll owns the gesture; clean-break/overlay/selection evidence must turn RED.",
    }),
    C("command", "ui", "containers", "command palette/list", "Command owns searchable command groups/items, active descendant, keyboard navigation, empty/loading state, shortcuts, execution, and optional Dialog composition without duplicating Search/Combobox contracts.", ["inline", "dialog", "query", "empty", "groups", "disabled", "keyboard"], ["behavior.overlay-apg", "behavior.selection"], {
        dependsOnNames: ["dialog", "input"],
        extraScope: [
            "Retain CommandDialog only by turning its currently prose-only dialog branch into a direct packed-public-member scenario; the present route exercises inline query/active-descendant/execution but renders zero dialog roots.",
            "Open, query, Arrow-navigate, execute, Escape, and restore focus through CommandDialog while sharing one command collection/active identity with inline Command and satisfying Dialog title, modality, dismissal, surface, and PRM.",
        ],
        bite: "Execute a disabled command, visually move active item without semantic state, leave CommandDialog export/prose-only, render a generic Dialog instead, or let inline coverage donate dialog state; behavioral/topology evidence must turn RED.",
    }),
    C("card", "ui", "display", "semantic content group", "Card owns content grouping and optional declared action/selection composition but delegates all material to Surface and command semantics to Button/Link.", ["content", "elevated", "interactive-composed", "selected", "dense", "narrow"], ["design.material-hierarchy", "design.affordance"], { dependsOnNames: ["surface"], bite: "Mint independent card glass/shadow variants or make the whole card clickable without link/button semantics; material/affordance evidence must turn RED." }),
    C("expandable-container", "custom", "containers", "content container that expands between bounded layouts", "ExpandableContainer owns measured collapsed/expanded geometry, trigger semantics, interruption/focus/scroll, and shared morph without duplicating Collapsible or Dialog.", ["collapsed", "expanded", "interrupt", "narrow", "keyboard", "prm"], ["motion.transition-continuity", "design.responsive-touch"], { dependsOnNames: ["collapsible"], extraDeps: ["BI.W-P028"], bite: "Animate height with a private timer or lose focus on expansion; continuity evidence must turn RED." }),
    C("fading-scroll", "custom", "containers", "scroll-edge overflow affordance", "FadingScroll exposes content overflow at the owning scroller through edge masks, keyboard/touch scroll, RTL, resize, and reduced-transparency behavior without a JS shadow writer.", ["top", "middle", "bottom", "horizontal", "rtl", "keyboard", "touch"], ["motion.scroll", "design.affordance"], { extraDeps: ["BI.W-P030"], bite: "Attach document scroll listeners for a nested scroller or hide overflow affordance at keyboard focus; scroll/affordance evidence must turn RED." }),
    C("infinite-scroll", "custom", "data", "incremental list loading trigger", "InfiniteScroll owns sentinel/loading/end/error/retry, abort/race, scroll restoration, accessibility announcement, and virtual-list composition without eager load-all fallback.", ["idle", "loading", "end", "error", "retry", "fast-scroll", "keyboard"], ["behavior.data", "performance.resource-ownership"], { bite: "Load every remaining item when identity lookup fails or announce duplicate loads; data/performance evidence must turn RED." }),
    C("spa-view", "custom", "containers", "bounded KeepAlive view composition", "The current public wrapper has no actual external tracked consumer; its Vue KeepAlive/Transition composition belongs to the first-party demo shell until real demand exists.", ["switch", "cached-return", "eviction", "focus", "prm"], ["architecture.component-topology", "motion.transition-continuity"], {
        decision: "rehome",
        decisionText: "Move SpaView to demo/shell/spa-view, remove the public export, and keep it as demo product code; future public demand must be newly formed.",
        targetDir: "demo/shell/spa-view",
        extraDeps: ["BI.W-P012", "BI.W-P029"],
        ownerContext: "the first-party demo shell route switch, cache, eviction, and focus flow",
        ownerScenarioPrefix: "demo-shell-spa-view",
        bite: "Keep the public export on only a booked speedtest consumer or preserve `is` as a view alias; consumer/clean-break evidence must turn RED.",
    }),
    C("header-ribbon", "custom", "navigation", "persistent collapsible header command band", "HeaderRibbon remains public because keyframes.js imports it; it owns persistent header-band reveal/pin/actions with accessible keyboard/touch behavior and shared motion/material.", ["left", "right", "expanded", "pinned", "keyboard", "touch", "prm"], ["design.responsive-touch", "motion.transition-continuity"], { extraDeps: ["BI.W-P029"], bite: "Make hover the sole way to reveal actions or leave a private timeout motion path under PRM; responsive/motion evidence must turn RED." }),

    C("table", "ui", "data", "semantic static table parts", "Table owns native table structure, caption/header/body/row/cell semantics, responsive overflow, alignment, density, and no interactive data behaviors.", ["caption", "headers", "dense", "wide", "narrow-scroll", "dark"], ["behavior.data", "design.responsive-touch"], { productJudgment: "Retain as the native semantic foundation consumed by DataTable and ordinary static tabular content: separating structure/density/overflow from interactive sorting and selection prevents DataTable from becoming the only path to an accessible table.", bite: "Replace semantic table structure with generic grid divs without equivalent accessibility; data evidence must turn RED." }),
    C("data-table", "ui", "data", "interactive tabular data model", "DataTable composes Table with stable row identity, semantic sortable-header commands, explicit controlled row selection across table/card projections, filter/pagination/virtualization, keyboard focus, loading/empty/error, and no monolithic ownership.", ["sort", "select", "wide-row", "narrow-card", "filter", "paginate", "virtual", "loading", "empty", "error", "keyboard"], ["behavior.data", "behavior.selection", "behavior.focus-escape", "architecture.component-topology"], {
        dependsOnNames: ["table", "checkbox"],
        extraScope: [
            "Render every sortable header as a named native button inside th, project truthful aria-sort on th, and keep focus visible/stable while the same sort owner handles pointer and keyboard activation.",
            "Make row selection an explicit controlled mode. Selectable table rows and responsive cards share stable identity, keyboard/pointer/touch activation, selected/current state, focus retention, and nested-action isolation; nonselectable rows have no click listener or pointer cursor.",
            "Make the direct story visibly exercise selection plus reset in both wide-table and narrow-card projections; emitting select into an unbound story earns no causal witness.",
            "Remove DataTablePagination from root and /data-table publication while keeping or reshaping it as an implementation-private DataTable part; internal pagination necessity is not a second public product contract.",
            "Exercise page count/bounds, selection continuity, sort/filter interaction, keyboard naming, and narrow-card projection through DataTable's one public model.",
        ],
        bite: "Use array index identity, make sorting pointer-only or omit aria-sort, emit selection from click-only hosts, lose selection through sort/projection, leave select unobserved, re-export DataTablePagination, or count its internal use as demand; data/selection/focus/topology evidence must turn RED.",
    }),
    C("metric", "custom", "data", "metric value plus label/context composition", "One Metric family owns badge/cell/row/stack presentations, numeric typography, trend/status/context, and token contract; three parallel public families are folded.", ["badge", "cell", "row", "stack", "trend", "status", "long-label", "narrow"], ["behavior.data", "design.typography"], {
        pascal: "Metric",
        decision: "fold",
        decisionText: "Merge metric-badge, metric-cell, and metric-stack into src/components/metric with one /metric entry and explicit parts; delete all three old entries without aliases.",
        members: [
            { tier: "custom", name: "metric-badge", action: "rename", targetDir: "src/components/metric/badge" },
            { tier: "custom", name: "metric-cell", action: "rename", targetDir: "src/components/metric/cell" },
            { tier: "custom", name: "metric-stack", action: "rename", targetDir: "src/components/metric/stack" },
        ],
        deleteRefs: [
            "demo/stories/data/metric-cell.vue",
            "demo/stories/data/metric-stack.vue",
            "demo/stories/display/metric-badge.vue",
            "tests-visual/_metric-zero-capture.spec.ts",
            "tests/components/custom/metric-badge/zero-value.test.ts",
            "tests/components/custom/metric-stack/MetricStack.test.ts",
        ],
        bite: "Preserve any old metric subpath alias or duplicate token/writer across parts; clean-break/topology evidence must turn RED.",
    }),
    C("pager-dots", "custom", "navigation", "page position and direct navigation indicator", "PagerDots exposes page count/current/direct navigation, accessible labels, roving/focus, dynamic count, and one velocity-bounded worm indicator with an instance-scoped SVG filter id; it has no Carousel coupling or document-global Goo dependency.", ["static", "interactive", "dynamic-count", "keyboard", "touch", "multi-instance", "safari-filter", "prm"], ["behavior.selection", "motion.spring-language"], {
        extraDeps: ["BI.W-P032", "BI.W-P042"],
        productJudgment: "Retain because both Carousel and Deck consume the same direct-position/roving-focus/worm indicator semantics; making it private to either owner would recreate the duplicated pager engine that the component apotheosis is meant to remove. Its filter is private instance infrastructure, not a global component concept.",
        extraScope: [
            "Dissolve the public/global GooFilter facility in this transaction: delete its flat component family, remove the Dock re-export and AppShell mount, and record the clean break without an alias or compatibility mount.",
            "Render the exact worm-scale SVG filter and fallback neck clipPath inside each PagerDots instance through one stable Vue useId-derived namespace; every local url(#…) reference must resolve within that instance, and simultaneous pagers must have distinct document IDs with identical local geometry.",
            "Delete the unconsumed dock-fission-goo, dock-morph-goo, and morph-goo registers rather than preserving speculative tunings; Deck's glass-goo obligation is separately localized by P121.",
            "Exercise two and four simultaneous pagers in native Safari and Chrome, including mount/unmount/remount, keyboard/touch travel, PRM, DOM-id uniqueness, filter/clipPath reference resolution, and zero shell-global defs.",
        ],
        extraSubjects: [
            ...subjects([
                "src/components/goo-filter/GooFilter.vue",
                "src/components/goo-filter/README.md",
                "src/components/goo-filter/index.ts",
            ], "delete"),
            subject("src/components/dock/index.ts", "modify"),
            current("demo/shell/AppShell.vue"),
            future("src/components/pager-dots/PagerWormFilter.vue"),
            current("tests/public-surface.spec.ts"),
            current("package.json"),
            current("scripts/lib/subpath-policy.mjs"),
            current("MIGRATION.md"),
        ],
        extraRepairImports: [
            "demo/shell/AppShell.vue",
            "src/components/dock/index.ts",
            "src/components/pager-dots/PagerDots.vue",
            "tests/public-surface.spec.ts",
        ],
        extraRepairTests: ["tests/public-surface.spec.ts"],
        extraLocks: ["component-goo-filter", "component-dock", "demo-shell", "entry-graph"],
        bite: "Mount one global filter, duplicate a pager filter or clipPath id across instances, keep a dead Goo id/export, make dots clickable without labels/focus, or stretch the worm beyond neighboring pages; ownership, clean-break, selection, and motion evidence must turn RED.",
    }),
    C("carousel", "ui", "navigation", "ordered slide/content carousel", "Carousel owns slide identity, previous/next/direct navigation, loop policy, drag, autoplay pause, focus, announcements, responsive sizing, and composes PagerDots rather than forking it.", ["buttons", "dots", "drag", "loop", "autoplay", "keyboard", "touch", "prm"], ["behavior.selection", "motion.transition-continuity"], {
        dependsOnNames: ["pager-dots"],
        extraDeps: ["BI.W-P032"],
        productJudgment: "Retain as a foundational ordered-content interaction with slide identity, drag, loop/autoplay pause, focus, announcements, and responsive sizing; those semantics are neither Tabs nor Deck and the actual first-party story exercises the full contract.",
        extraScope: [
            "Delete GlassCarouselPager and its two export projections: it has zero source, demo, test, or tracked external runtime consumers and independently forks the previous/next/counter/loop semantics already exercised by CarouselPager.",
            "Delete CarouselNext and CarouselPrevious and their exact /carousel projections: each standalone SFC has zero source, demo, test, or tracked external runtime witness, while CarouselPager already owns both commands.",
            "Keep CarouselPager as the native previous/next/counter composition and PagerDots as the shared direct-position owner; both update one Carousel slide identity and neither preserves a Glass-prefixed compatibility twin.",
        ],
        extraSubjects: [
            flatCurrent("ui", "carousel", "GlassCarouselPager.vue", "delete"),
            flatCurrent("ui", "carousel", "CarouselNext.vue", "delete"),
            flatCurrent("ui", "carousel", "CarouselPrevious.vue", "delete"),
        ],
        bite: "Autoplay while focused/hovered, announce every frame, restore GlassCarouselPager/CarouselNext/CarouselPrevious or their exports as zero-witness siblings, or let CarouselPager and PagerDots write different slide identities; behavioral/topology evidence must turn RED.",
    }),
    C("timeline", "custom", "data", "ordered temporal events/segments", "Timeline owns chronological semantics, continuous/segmented/scrubber variants as one concept, stable event identity, active/progress state, semantic event-choice and marker operability, keyboard navigation, responsive layout, and shared motion.", ["continuous", "segmented", "scrubber", "event-choice", "active", "complete", "long", "narrow", "keyboard", "prm"], ["behavior.data", "behavior.selection", "behavior.focus-escape", "motion.transition-continuity"], {
        extraScope: [
            "Replace the direct story's clickable li event rows with named native buttons in an ordered list or one exact single-selection composite. Current event state, set position, Arrow/Home/End travel, Enter/Space activation, visible focus, and pointer parity all update the same scrubber/callout owner.",
            "Keep the slider, segmented markers, continuous markers, and event chooser separately enrolled; one semantic Timeline variant cannot launder a pointer-only sibling control.",
        ],
        bite: "Render visual chronology out of semantic DOM order, duplicate continuous/segmented engines, restore clickable li event rows, or credit the semantic slider for an inoperable event chooser; data/selection/focus/topology evidence must turn RED.",
    }),
    C("deck", "custom", "navigation", "ordered presentation/page deck", "Deck owns page identity, next/previous/direct navigation, progress, keyboard/touch, focus/URL policy, and transition composition without duplicating Tabs/Carousel; its one showcase-only barbell morph and SVG filter stay private to the Deck story rather than masquerading as public library facilities.", ["start", "middle", "end", "direct", "keyboard", "touch", "goo-travel", "safari-filter", "prm"], ["behavior.selection", "motion.transition-continuity"], {
        dependsOnNames: ["progress"],
        extraDeps: ["BI.W-P029", "BI.W-P118"],
        productJudgment: "Retain because the charter explicitly requires a deep keyframes.js deck/reveal register and the first-party motion story exercises page identity, URL/focus restoration, progress, and route-like transitions that Carousel's free content strip does not own. The barbell effect has exactly one runtime consumer and therefore remains story-private rather than earning public useGooMorph/MORPH_SIGNATURES APIs.",
        extraScope: [
            "Re-home useGooMorph, gooBarbellGeometry, and morphSignatures beside their sole runtime consumer under demo/stories/motion/deck; remove their root and motion-core exports and update token commentary without leaving a public alias.",
            "Replace url(#glass-goo) with one Deck-story-local filter whose stable instance id is passed to the painted layer; no AppShell or cross-route resource is a precondition for the story.",
            "Delete installDeckSpring, deckEase, and the glass-ui DECK_SPRING fork: no current Glass or tracked external import consumes the exported callable easing, its 0.5/0.85 pair contradicts the canonical smooth 0.58/0.8 row it claims to equal, and its caught lazy-load failure is silent scheduler substitution.",
            "Keep slides' distinct local editorial spring outside Glass authority and return an exact owner packet; do not retain a Glass alias or migration path merely because the donor has a local same-named facility.",
            "Run the private barbell through declared engine playback and the canonical Glass spring vocabulary, then prove interruption, reversal, rest opacity, teardown, and PRM without elevating the effect into Deck's public behavioral contract or hand-rolling another rAF.",
            "Exercise direct story load, two concurrently mounted story specimens, Safari filter resolution, unique IDs, route teardown/remount, and absence of GooFilter/useGooMorph/MORPH_SIGNATURES from the packed public surface.",
        ],
        extraSubjects: [
            { ...current("src/composables/motion/useGooMorph.ts", "rename"), targetPath: "demo/stories/motion/deck/useGooMorph.ts" },
            { ...current("src/composables/motion/gooBarbellGeometry.ts", "rename"), targetPath: "demo/stories/motion/deck/gooBarbellGeometry.ts" },
            { ...current("src/composables/motion/morphSignatures.ts", "rename"), targetPath: "demo/stories/motion/deck/morphSignatures.ts" },
            future("demo/stories/motion/deck/DeckGooFilter.vue"),
            flatCurrent("custom", "deck", "composables/useDeckSpring.ts", "delete"),
            current("src/composables/motion/core/index.ts"),
            current("src/index.ts"),
            current("src/styles/tokens/property-regs.css"),
            current("src/styles/tokens/scheme-spring.css"),
            current("tests/public-surface.spec.ts"),
            current("package.json"),
            current("scripts/lib/subpath-policy.mjs"),
            current("MIGRATION.md"),
        ],
        extraRepairImports: [
            "demo/stories/motion/deck.vue",
            "src/components/custom/deck/index.ts",
            "src/components/custom/deck/constants.ts",
            "src/components/custom/deck/README.md",
            "src/composables/motion/core/index.ts",
            "src/index.ts",
            "tests/public-surface.spec.ts",
        ],
        extraRepairTests: ["tests/public-surface.spec.ts"],
        extraLocks: ["component-goo-filter", "motion-public-surface", "entry-graph"],
        bite: "Lose slide identity/focus, restore a public GooFilter/useGooMorph/MORPH_SIGNATURES/installDeckSpring/deckEase/DECK_SPRING export, depend on a shell-global id, duplicate local filter IDs, or run a second transition clock; selection, continuity, temporal ownership, and clean-break evidence must turn RED.",
    }),
    C("instrument-chassis", "custom", "data", "physical instrument housing with phase bus", "InstrumentChassis owns housing, regions/dividers, phase semantics, reserved geometry, and material role; it does not hardcode domain phases, duplicate Card, or carry compatibility variants.", ["ready", "active", "complete", "structure", "wide", "narrow", "loading"], ["behavior.data", "design.material-hierarchy"], { dependsOnNames: ["progress", "metric"], bite: "Animate reserved block size or add domain-only phase names to the public union; stability/data evidence must turn RED." }),

    C("completion-seal", "custom", "feedback", "demo completion storytelling composition", "CompletionSeal is a demo-scale celebratory composition, not a general public component; completion semantics remain in Progress/feedback and the visual seal lives in demo chassis.", ["draw", "settle", "hold", "dark", "prm"], ["architecture.component-topology", "motion.reduced"], {
        decision: "rehome",
        decisionText: "Move to demo/chassis/feedback/completion-seal and remove the public export; no actual external tracked import justifies it.",
        targetDir: "demo/chassis/feedback/completion-seal",
        extraDeps: ["BI.W-P012", "BI.W-P031"],
        ownerContext: "the demo completion chassis and its earned-completion feedback flow",
        ownerScenarioPrefix: "demo-completion-seal",
        bite: "Keep CompletionSeal public on demo-only evidence or keep its glint looping under PRM; topology/motion evidence must turn RED.",
    }),
    C("easing", "custom", "motion", "interactive easing authoring/visualization", "EasingPicker remains the glass-owned editor UI while value.js owns curve math; preview authority is explicit and proportionate—an editor-local normalized one-shot is distinct from reusable keyframes playback—and configurator is composition, not a second state engine.", ["bezier", "steps", "drag", "keyboard", "copy", "copy-denied", "playback", "prm"], ["behavior.forms", "behavior.focus-escape", "design.affordance", "integrity.dependencies"], {
        extraDeps: ["BI.W-P023"],
        productJudgment: "Retain because the exact current consumer assay proves EasingPicker runtime imports in both value.js and keyframes.js; those external owners and the first-party authoring lab justify the component, while two modes of one demo and documentary mentions remain coverage rather than independent demand.",
        extraScope: [
            "Verify /easing through the generated packed candidate and exact current value.js/keyframes.js owner fixtures; do not require a root/API barrel, src/api/index.ts, or any pre-flatten path spelling.",
            "Exercise causal Bezier-handle and steps edits through pointer, touch, and keyboard; both Bezier handles are named value-bearing focusable controls whose input paths share setHandle, while the plot's image semantics never swallow the controls.",
            "Make copy pending/success/denied states explicit with live feedback, full-literal manual recovery, cancellable reset ownership, and missing-Clipboard fixtures; an unchanged button after rejection is masked failure.",
            "Choose the preview authority from first principles: either retain a bounded normalized editor-local one-shot with truthful playing/restart/PRM/teardown semantics and no physical-playback claim, or consume keyframes.js when the public contract says keyframes-owned. A future seam or package import is not current authority.",
            "Use one content-width play/replay register; resolved width must exceed the icon square when text is present, and no btn-pill+glass-btn collision or fixed-file enrollment gap may survive.",
            "Keep EasingConfigurator as thin composition over the same picker state and reject any local staircase/cubic solver, second editor state, or physical playback loop that duplicates value.js/keyframes.js authority.",
        ],
        extraRepairImports: [
            "demo/stories/motion/curve-gallery.vue",
            "src/subpaths/easing.ts",
        ],
        extraRepairTests: ["tests-visual/easing-primitive.spec.ts", "tests/public-surface.spec.ts"],
        bite: "Remove the packed /easing export, implement curve math locally, make a Bezier handle pointer-only, swallow Clipboard denial, collapse a text playback action to the icon square, run travel under PRM, misstate preview ownership, stop a handle from changing the reparsable output, or create a second picker state in EasingConfigurator; dependency/form/focus/affordance/scenario evidence must turn RED while internal file movement alone remains neutral.",
    }),
];

// The eleven facility-scale component directories are deliberately not minted as
// another set of generic component waves: each already has a deeper structural,
// dock, or procedural owner. They remain explicit here so the apotheosis ledger
// covers all 78 on-disk ui/custom family directories exactly once.
export const SPECIAL_COMPONENT_CONCEPTS = [
    {
        name: "aurora", pascal: "Aurora", tier: "custom", category: "procedural",
        concept: "painterly interactive field", decision: "retain", canonicalWaves: ["BI.W-P046"],
        contract: "Aurora is one field model/runtime with declared renderer identity, semantic color, interaction, pause, and teardown; presets never fork the engine.",
        requiredStates: ["idle", "pointer", "palette", "dark", "offscreen", "prm", "webgpu", "webgl2", "failure"],
        bite: "Fork a preset renderer or mask a failed shader with a different backend; procedural evidence must turn RED.",
    },
    {
        name: "blob", pascal: "Blob", tier: "custom", category: "procedural",
        concept: "coherent gel body and satellites", decision: "retain", canonicalWaves: ["BI.W-P047"],
        contract: "Blob owns one simulation/state record and two equivalent GPU translators; satellites remain coherent with the body and teardown is complete.",
        requiredStates: ["settled", "pointer", "satellites", "fission", "dark", "prm", "webgpu", "webgl2", "failure"],
        bite: "Double-smooth pointer input, detach a satellite, or silently fall through after shader failure; interaction/lifecycle evidence must turn RED.",
    },
    {
        name: "configurator", pascal: "Configurator", tier: "custom", category: "forms",
        concept: "typed live component/procedural configuration", decision: "retain", canonicalWaves: ["BI.W-P052", "BI.W-P059"],
        contract: "Configurator renders a typed schema, round-trips live values, exposes validation and reset, and never duplicates component state or writes arbitrary CSS strings.",
        requiredStates: ["defaults", "edited", "invalid", "reset", "keyboard", "narrow", "dark", "prm"],
        bite: "Add a control with no typed roundtrip or keep a second shadow value; form and scenario evidence must turn RED.",
    },
    {
        name: "constellation", pascal: "Constellation", tier: "custom", category: "procedural",
        concept: "interactive node-and-edge field", decision: "retain", canonicalWaves: ["BI.W-P048"],
        contract: "Constellation owns one seeded CPU field, one interaction field, one Canvas2D renderer on the shared lifecycle, and one executable ordered drawOverlay skin pass; its multi-instance story consumes zero scarce GPU contexts.",
        requiredStates: ["idle", "pointer-well", "warp-overlay", "pinned-overlay", "dense", "narrow", "multi-instance", "offscreen", "prm", "canvas2d", "teardown"],
        bite: "Reintroduce a second field integrator or GPU renderer, preserve drawOverlay as an uncalled prop, open a Constellation GPU context, or add a demo-only supernova fork; topology, clean-break, resource, and scenario evidence must turn RED.",
    },
    {
        name: "dock", pascal: "Dock", tier: "custom", category: "navigation",
        concept: "liquid navigation and command facility", decision: "retain", canonicalWaves: ["BI.W-P033", "BI.W-P034", "BI.W-P035", "BI.W-P036", "BI.W-P037", "BI.W-P038", "BI.W-P039", "BI.W-P040", "BI.W-P041", "BI.W-P042"],
        contract: "Dock has one state machine, public anatomy, functional-glass plate, selection identity, layer/focus owner, explicit overflow/layout modes, semantic controls, and one shared spring/morph spine.",
        requiredStates: ["rail", "bottom", "selection", "search", "overflow", "layer", "focus", "keyboard", "touch", "orientation", "prm", "complex-backdrop"],
        bite: "Fork state or spring ownership, clip a top layer, hide overflow, or make controls icon-only without names; Dock families must fail.",
    },
    {
        name: "fourier-field", pascal: "FourierField", tier: "custom", category: "procedural",
        concept: "math-owned Fourier ribbon field", decision: "retain", canonicalWaves: ["BI.W-P049"],
        contract: "FourierField derives one coefficient/geometry plan and feeds equivalent compute/render paths without per-frame fitting or a fullscreen segment loop.",
        requiredStates: ["idle", "pointer", "term-count", "resize", "offscreen", "prm", "webgpu", "webgl2"],
        bite: "Fit coefficients per frame or restore a per-pixel segment loop; data/performance evidence must turn RED.",
    },
    {
        name: "goo-filter", pascal: "GooFilter", tier: "custom", category: "procedural",
        concept: "global SVG metaball resource to be dissolved into its two live owners", decision: "rehome-private", canonicalWaves: ["BI.W-P118", "BI.W-P121"],
        contract: "GooFilter has no coherent public component contract: PagerDots owns an instance-scoped worm filter and the Deck demo owns its local barbell filter; the global shell mount, Dock re-export, three dead IDs, shared DOM IDs, and public GooFilter surface disappear without an alias.",
        requiredStates: ["pager-multi-instance", "deck-render", "safari-filter", "owner-prm", "owner-teardown"],
        bite: "Restore the global mount/public export, duplicate an SVG id across live instances, or retain an unconsumed filter id; ownership, clean-break, and rendered multi-instance evidence must turn RED.",
    },
    {
        name: "handmark", pascal: "Handmark", tier: "custom", category: "typography",
        concept: "semantic hand-drawn mark and underline", decision: "retain", canonicalWaves: ["BI.W-P051"],
        contract: "Handmark owns seeded vector geometry and semantic mark variants, stays legible without motion, and shares only deterministic brush/noise facilities with WatercolorDot.",
        requiredStates: ["underline", "circle", "strike", "draw", "static", "dark", "prm"],
        bite: "Use unseeded geometry or erase the semantic mark under PRM; typography/motion evidence must turn RED.",
    },
    {
        name: "liquid-grid", pascal: "LiquidGrid", tier: "custom", category: "procedural",
        concept: "curl-deformed paper grid field", decision: "retain", canonicalWaves: ["BI.W-P050"],
        contract: "LiquidGrid owns one grid/curl state and equivalent fullscreen translators on the shared substrate, with semantic color and honest capability/failure state.",
        requiredStates: ["idle", "pointer", "density", "dark", "offscreen", "prm", "webgpu", "webgl2"],
        productJudgment: "Retain as one of the user's named headline procedural systems and as a live hero/story consumer of the shared WebGPU/WebGL2 substrate; its curl-deformed paper-grid field is semantically distinct from Aurora, Blob, Constellation, and Fourier ribbon paint.",
        bite: "Fork the curl math or silently render an unrelated fallback after failure; renderer evidence must turn RED.",
    },
    {
        name: "sortable-list", pascal: "SortableList", tier: "custom", category: "data",
        concept: "ordered list with pointer and keyboard reordering", decision: "retain", canonicalWaves: ["BI.W-P007"],
        contract: "SortableList owns stable item identity, one reorder engine, pointer/keyboard parity, focus retention, announcements, and one colocated behavior home.",
        requiredStates: ["idle", "pointer-drag", "keyboard-reorder", "touch", "disabled", "focus-retained"],
        bite: "Recreate a root sortable engine or lose focus identity after reorder; selection/topology evidence must turn RED.",
    },
    {
        name: "watercolor-dot", pascal: "WatercolorDot", tier: "custom", category: "procedural",
        concept: "seeded watercolor point mark", decision: "retain", canonicalWaves: ["BI.W-P051"],
        contract: "WatercolorDot is a seeded SVG/CSS mark in the hand-drawn family, not a GPU scene; it has bounded variation, semantic color, and static PRM equivalence.",
        requiredStates: ["seeded", "size", "color", "dark", "prm"],
        bite: "Use unseeded randomness or promote the mark to an independent GPU context; color/resource evidence must turn RED.",
    },
];

const componentIdByName = new Map(COMPONENT_CONCEPTS.map((meta, index) => [meta.name, `BI.W-P${String(63 + index).padStart(3, "0")}`]));

const relocateMember = (member) => {
    const sourceRoot = componentRoot(member.tier, member.name);
    const sourceRows = tree(sourceRoot, member.action);
    const flattenedRoot = `src/components/${member.name}`;
    if (member.action === "delete") return sourceRows.map((row) => ({
        path: flatComponentPath(row.path),
        action: "delete",
        before: null,
        producedBy: "BI.W-P008",
        sourceBasePath: row.path,
        sourceBaseOid: row.before,
    }));
    const targetDir = member.targetDir;
    if (!targetDir) return sourceRows.map((row) => ({
        path: flatComponentPath(row.path),
        action: "modify",
        before: null,
        producedBy: "BI.W-P008",
        sourceBasePath: row.path,
        sourceBaseOid: row.before,
    }));
    return sourceRows.map((row) => {
        const rel = row.path.slice(sourceRoot.length + 1);
        return {
            path: `${flattenedRoot}/${rel}`,
            action: "rename",
            targetPath: `${targetDir}/${rel}`,
            before: null,
            producedBy: "BI.W-P008",
            sourceBasePath: row.path,
            sourceBaseOid: row.before,
        };
    });
};

const dedupeSubjects = (rows) => {
    const byPath = new Map();
    const rank = { delete: 6, rename: 5, carve: 4, modify: 3, create: 2, repair: 1, verify: 0 };
    for (const row of rows) {
        const prior = byPath.get(row.path);
        if (!prior || (rank[row.action] ?? 0) > (rank[prior.action] ?? 0)) byPath.set(row.path, row);
    }
    return [...byPath.values()].sort((a, b) => a.path.localeCompare(b.path));
};

const componentReferenceSubject = (path, action) => {
    if (path.startsWith("demo/shell/configurator/")) {
        const sourceBasePath = path.replace(/^demo\/shell\/configurator(?=\/)/, "demo/configurator");
        const sourceRow = BY_PATH.get(sourceBasePath);
        if (!sourceRow) throw new Error(`missing P012 source provenance for ${path}`);
        return {
            path,
            action,
            before: null,
            producedBy: "BI.W-P012",
            sourceBasePath,
            sourceBaseOid: sourceRow.oid,
        };
    }
    return subject(path, action);
};

const componentWave = (meta, index) => {
    const id = `BI.W-P${String(63 + index).padStart(3, "0")}`;
    // componentRefs deliberately assays the frozen source tree. P012, however,
    // has already moved the configurator when every component wave runs, so a
    // source-base witness under demo/configurator is archaeological provenance,
    // not an executable transaction path.
    const refs = uniq(meta.members
        .flatMap((member) => componentRefs(member.name, meta.pascal))
        .map((path) => path.replace(/^demo\/configurator(?=\/)/, "demo/shell/configurator")));
    const storyRefs = refs.filter((path) => path.startsWith("demo/stories/"));
    const deleting = meta.decision === "delete";
    const ownerOnly = ["private", "rehome"].includes(meta.decision);
    const publicConcept = ["retain", "fold", "rename"].includes(meta.decision);
    const storyPath = publicConcept ? `demo/stories/${meta.category}/${meta.storySlug}.vue` : storyRefs[0];
    const unitPath = deleting
        ? null
        : ownerOnly
            ? `${meta.decision === "rehome" ? "tests/demo" : "tests/components/private"}/${meta.name}.integration.test.ts`
            : `tests/components/${meta.name}.contract.test.ts`;
    const visualPath = deleting
        ? null
        : ownerOnly
            ? `tests-visual/owner-integrations/${meta.name}.spec.ts`
            : `tests-visual/${meta.name}.contract.spec.ts`;
    const exportChanging = meta.decision !== "retain" || meta.members.length > 1;
    const memberRows = meta.members.flatMap((member) => relocateMember(member));
    const deleteRefs = new Set(meta.deleteRefs);
    const extraRows = [
        ...refs.map((path) => componentReferenceSubject(path, deleteRefs.has(path) ? "delete" : (exportChanging && path !== "demo/stories/manifest.ts" ? "modify" : "verify"))),
        ...(publicConcept ? [subject(storyPath)] : []),
        ...(!deleting ? [subject(unitPath), subject(visualPath)] : []),
        subject("DESIGN.md", "verify"),
        ...(exportChanging ? subjects(["package.json", "scripts/lib/subpath-policy.mjs", "MIGRATION.md", "README.md"]) : []),
        ...meta.extraSubjects,
    ];
    const dependencyIds = meta.dependsOnNames.map((name) => {
        const dependency = componentIdByName.get(name);
        if (!dependency) throw new Error(`${id} names missing component dependency ${name}`);
        return dependency;
    });
    const cleanBreakInvariants = exportChanging ? ["architecture.clean-break", "integrity.entry-graph"] : [];
    const titleAction = {
        retain: "apotheosis",
        private: "privatization",
        fold: "consolidation",
        rename: "clean rename",
        delete: "retirement",
        rehome: "re-home",
    }[meta.decision];
    const scope = (deleting ? [
        meta.decisionText,
        `Prove the deletion against the actual source/export/consumer graph: ${meta.contract}`,
        "Repoint every real local consumer to an already-owned canonical concept or ordinary composition; do not mint a replacement wrapper, alias, compatibility export, or migration shim.",
        "Delete the definition, styles, exports, declarations, docs, stories, tests, and historical gate scripts that exist solely for the retired concept, while preserving shared donors and consumer behavior.",
        "Use architecture/component/entry discovery and mutation bites for definition absence; the deletion paints no product pixels and therefore creates no eponymous unit test, visual spec, snapshot, or demo scenario.",
    ] : ownerOnly ? [
        meta.decisionText,
        `Bind the private/re-homed contract only through ${meta.ownerContext}: ${meta.contract}`,
        "Remove the public export and standalone story identity in the same transaction; the owner composition imports the implementation directly and no compatibility alias, wrapper, or future-public placeholder survives.",
        `Exercise the relevant owner states through real integrations rather than an invented public specimen: ${meta.states.join(", ")}.`,
        "Repoint every listed consumer/import/test/build/doc fact atomically, and keep visual/material refinement subordinate to the owning composition rather than turning the helper into a second product concept.",
    ] : [
        meta.decisionText,
        `Make the binding concept contract explicit: ${meta.contract}`,
        "Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.",
        `Render and exercise the exact state set in the shared specimen chassis: ${meta.states.join(", ")}.`,
        "Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.",
    ]).concat(meta.extraScope);

    return wave({
        id,
        title: `${meta.pascal} ${titleAction} — ${meta.concept}`,
        band: `component-${meta.category}`,
        intent: `${meta.decisionText} ${meta.contract}`,
        scope,
        subjects: dedupeSubjects([...memberRows, ...extraRows]),
        repairs: repair({
            imports: uniq([...refs, ...meta.extraRepairImports]),
            tests: uniq([...refs.filter((path) => path.startsWith("tests/")), ...refs.filter((path) => path.startsWith("tests-visual/")), unitPath, visualPath, ...meta.extraRepairTests].filter(Boolean)),
            build: exportChanging ? ["package.json", "scripts/lib/subpath-policy.mjs", "vite.config.ts"] : [],
            docs: uniq([storyPath, "DESIGN.md", ...(exportChanging ? ["MIGRATION.md", "README.md"] : [])].filter(Boolean)),
        }),
        invariant: meta.contract,
        bite: meta.bite ?? `Break ${meta.name}'s stated ${meta.concept} contract while leaving its file/export present; the behavioral family must turn red without a prose/count check.`,
        invariants: deleting
            ? uniq([...meta.invariants, ...cleanBreakInvariants, "architecture.component-topology", "architecture.present-tense-source"])
            : uniq([...meta.invariants, ...cleanBreakInvariants, "architecture.component-topology", "architecture.present-tense-source", "design.contrast", "design.responsive-touch", "demo.scenario-contract"]),
        pi: deleting
            ? piNone("Definition/export/consumer absence is device-free; replacement concepts own their already-enrolled rendered behavior, and this wave creates no deleted-concept scenario.")
            : piBrowser(meta.states.map((state) => `${meta.ownerScenarioPrefix ?? meta.name}-${state}`), meta.observables),
        deps: deleting
            ? uniq(["BI.W-P057", ...meta.extraDeps, ...dependencyIds])
            : uniq(["BI.W-P017", "BI.W-P057", "BI.W-P059", "BI.W-P061", "BI.W-P062", ...meta.extraDeps, ...dependencyIds]),
        locks: uniq(meta.members.map((member) => `component-${member.name}`).concat(exportChanging ? ["entry-graph"] : [], meta.extraLocks)),
        archaeology: [`Current family home ${meta.members.map((member) => `${member.tier}/${member.name}`).join(" + ")} at ${SOURCE_BASE}; decision=${meta.decision}.`],
    });
};

const componentWaves = COMPONENT_CONCEPTS.map(componentWave);

const integrationWaves = [
    wave({
        id: "BI.W-P125",
        title: "D3 value.js pinned-consumer protection and reproducible co-land fixture",
        band: "constellation-contract",
        intent: "Turn the held value.js worktree at 2e559f7a into a protected, reproducible read-only consumer assay without treating an uncommitted sibling lane as adoption.",
        scope: [
            "Record KEEP-PROTECTED as D3's terminal local disposition: this process neither prunes nor edits the held value.js worktree; only its owner may reclaim it after an exact-tarball receipt.",
            "Build a disposable fixture from the exact tracked value.js commit 2e559f7a, install the current packed glass-ui artifact, and exercise its root plus all tracked glass-ui subpath imports without source aliases.",
            "Bind the value.js U-F77 co-land window, U-F34 three-symbol rename, keyframes/value peer pair, and migration rows into the generated owner packet.",
            "Keep dirty working-tree content out of evidence and require branch/HEAD/porcelain/tree digests before and after every read-only run.",
        ],
        subjects: subjects([
            "scripts/constellation/value-consumer-fixture.mjs", "scripts/constellation/fixtures/value-2e559f7a.json",
            "tests/constellation/value-consumer.test.ts", "docs/tranches/BI/coordination/value-owner-packet.json",
            "docs/tranches/BI/coordination/asks-and-consumes.md",
        ]),
        repairs: repair({
            tests: ["tests/constellation/value-consumer.test.ts"],
            build: ["package.json", "scripts/constellation.mjs"],
            docs: ["MIGRATION.md", "docs/tranches/BI/coordination/value-owner-packet.json", "docs/tranches/BI/coordination/asks-and-consumes.md"],
        }),
        invariant: "The held value.js lane is never mutated or counted as landed; a clean disposable copy of its exact commit resolves the exact glass tarball and produces an owner-consumable packet.",
        bite: "Substitute dirty worktree bytes for commit 2e559f7a or install a different tarball digest; the fixture and handshake must reject both.",
        invariants: ["integrity.build-package", "constellation.handshake", "integrity.lineage"],
        pi: piNone("This wave verifies a consumer build and preserves foreign state; value.js owns any painted acceptance in its repository."),
        deps: ["BI.W-P004", "BI.W-P010", "BI.W-P023"],
        locks: ["constellation-snapshot", "package-consumer-fixture"],
        archaeology: ["REPO-CLEANUP-PLAN D3 held value.js commit 2e559f7a outside the prune set; prior tranches mistook dirty or booked foreign work for adoption."],
    }),
    wave({
        id: "BI.W-P126",
        title: "Semantic retirement facts instead of the 20-row retired-claim snapshot",
        band: "migration-contract",
        intent: "Replace proof:no-retired-survivor's prose-mirroring RETIRED_CLAIMS array and .retired-classes diary with facts derived from entry, symbol, token, selector, and migration deltas.",
        scope: [
            "Parse every migration removal into a typed deleted symbol/subpath/selector/token fact generated from the source-base-to-current semantic diff; prose cannot enroll or exempt a subject.",
            "Resolve the current 20 claimed retirements through the owning semantic waves and emit one terminal build/fold/retain correction per claim in the formation ledger.",
            "Delete the hand-maintained .retired-classes.txt registry and the 20-row proof program through P014; the replacement discovers claims and definitions rather than carrying a roster.",
            "Distinguish a capability path or accessibility mode from a retired API compatibility path and reject aliases, dual writers, and doc-only absence claims.",
        ],
        subjects: [
            current(".retired-classes.txt", "delete"), current("MIGRATION.md"),
            future("scripts/migration/semantic-diff.mjs"), future("scripts/migration/retirements.mjs"),
            future("tests/migration/retirements.test.ts"), future("docs/tranches/BI/retirement-facts.json"),
        ],
        repairs: repair({
            tests: ["tests/migration/retirements.test.ts"],
            build: ["package.json", "scripts/lib/subpath-policy.mjs"],
            docs: ["MIGRATION.md", "docs/tranches/BI/retirement-facts.json"],
        }),
        invariant: "Every removal claim is generated from a semantic before/after fact, every retired definition is absent, and adding a live artifact to prose cannot manufacture retirement evidence.",
        bite: "Add a MIGRATION sentence claiming /dock is retired while its export remains; semantic retirement must fail without adding /dock to a hand roster.",
        invariants: ["architecture.clean-break", "integrity.entry-graph", "architecture.present-tense-source"],
        pi: piNone("Retirement is a semantic source/package assertion; painted replacement behavior stays with each owning wave."),
        deps: ["BI.W-P010", "BI.W-P014"],
        locks: ["entry-graph", "migration-facts"],
        archaeology: ["proof:no-retired-survivor grew from 3 to 20 manually mirrored rows and became the exact snapshot-gate failure class named by the user."],
    }),
    wave({
        id: "BI.W-P127",
        title: "Dependency, peer, generator, and lockfile singularity",
        band: "package-contract",
        intent: "Make package metadata follow the post-apotheosis import graph, remove the shadcn generator contract, and reconcile the value/keyframes/pencil-boil peer line without duplicate engines.",
        scope: [
            "Delete components.json after the ui/custom and shadcn structures are gone; no generator alias or hidden src/utils target survives.",
            "Remove class-variance-authority, clsx, and tw-animate-css only after their exact last importers land; classify every remaining package as runtime, peer, optional, or development from the packed graph.",
            "Reconcile @mkbabb/keyframes.js ^5.2.0 with @mkbabb/value.js ^3.1.0 as a paired contract and execute X8's @mkbabb/pencil-boil ^0.8.1 widen with isolated consumer verification.",
            "Regenerate one lockfile from the resulting manifest and reject file: links, duplicate semantic engines, unused peers, and peer/dev range disagreement.",
        ],
        subjects: [
            current("components.json", "delete"), current("package.json"), current("package-lock.json"),
            future("scripts/dependencies/contract.mjs"), future("tests/package/dependency-contract.test.ts"),
        ],
        repairs: repair({
            tests: ["tests/package/dependency-contract.test.ts", "tests/package/consumer-fixtures.test.ts"],
            build: ["package.json", "package-lock.json", "vite.config.ts"],
            docs: ["README.md", "MIGRATION.md"],
        }),
        invariant: "The manifest and lock are projections of actual packed imports and supported peer contracts; no shadcn generator, styling scaffold, duplicate engine, or range contradiction survives.",
        bite: "Restore class-variance-authority with zero imports, move reka-ui to dev-only, or pin pencil-boil below the declared peer; the dependency contract must identify each distinct defect.",
        invariants: ["integrity.dependencies", "integrity.build-package", "architecture.clean-break"],
        pi: piNone("Dependency and isolated-package resolution are device-free."),
        deps: ["BI.W-P023", "BI.W-P051", "BI.W-P065", "BI.W-P071", "BI.W-P072", "BI.W-P073", "BI.W-P074", "BI.W-P089", "BI.W-P090", "BI.W-P091", "BI.W-P093", "BI.W-P099", "BI.W-P106", "BI.W-P119"],
        locks: ["package-manifest", "package-lock"],
        archaeology: ["The current manifest preserves shadcn-vue generation metadata, CVA/clsx/tw-animate peers, and pencil-boil ^0.4.1 while the standing X8 ruling requires ^0.8.1 verification."],
    }),
    wave({
        id: "BI.W-P128",
        title: "One build-project authority for library, declarations, demo, tests, and iteration",
        band: "build-architecture",
        intent: "Replace hand-synchronized Vite and TypeScript config variants with one typed project graph whose projections retain genuinely different build products.",
        scope: [
            "Model library JS, declarations, style assets, demo distribution, iteration, tests, and consumer fixtures as named projections with explicit shared and product-specific fields.",
            "Generate or import projections from one authority; delete copied alias/entry/external/plugin blocks while keeping distinct outputs explicit.",
            "Make the same generated entry graph from MS6 feed library and declaration builds and reject source-only resolution in packaged fixtures.",
            "Exercise cold clean builds, incremental iteration, declaration emission, demo build, and isolated tarball consumers in both supported engines where rendering is involved.",
        ],
        subjects: [
            ...existing("vite.config.ts", "vite.iter.config.ts", "vite.library.ts", "vite.style-assets.ts", "vite.style-fold.ts", "vite.utility-emit.ts", "vitest.config.ts", "tsconfig.json", "tsconfig.src.json", "tsconfig.build.json", "tsconfig.test.json", "demo/vite.demo-dist.config.ts").map((path) => current(path)),
            future("build/projects.mjs"), future("build/project-schema.json"), future("tests/build/project-graph.test.ts"),
        ],
        repairs: repair({
            tests: ["tests/build/project-graph.test.ts", "tests/build/consumer-fixtures.test.ts"],
            build: ["package.json", "scripts/flatten-subpath-types.mjs", "scripts/verify-export-types.mjs"],
            docs: ["CONTRIBUTING.md", "docs/canon/build-and-gates.md"],
        }),
        invariant: "Every build product is a declared projection of one project/entry authority, and no copied config block can silently diverge in aliases, entries, externals, plugins, or declarations.",
        bite: "Add a demo-only source alias or omit one generated subpath from declaration emission; project comparison and packed consumers must fail.",
        invariants: ["integrity.types", "integrity.build-package", "integrity.entry-graph", "architecture.import-boundaries"],
        pi: piBrowser(["generated-demo-safari", "generated-demo-chrome"], ["route boot", "CSS asset resolution", "entry resolution", "no source alias"]),
        deps: ["BI.W-P010", "BI.W-P012", "BI.W-P057"],
        locks: ["build-config", "entry-graph"],
    }),
    wave({
        id: "BI.W-P129",
        title: "Generated public facts and present-tense product documentation",
        band: "documentation-architecture",
        intent: "Make README, DESIGN, MIGRATION, canon, examples, and consumer evidence explain the current product around generated facts rather than preserving tranche archaeology as live authority.",
        scope: [
            "Generate export, component, token, scenario, browser, dependency, migration, and consumer facts from the same semantic authorities used by build and verification.",
            "Rewrite explanatory prose around those inserts in present tense; keep historical reasoning in tranche/archive documents and never in production comments or mutable count tables.",
            "Convert docs/consumer-evidence from booked prose to exact tarball/import/owner receipts while retaining its human-readable index.",
            "Generate dependency ownership and consumer facts that distinguish direct upstream imports, Glass-owned bindings, real runtime consumers, demonstrations, and tests; never describe Glass as an upstream distribution seam or use a test/path as demand evidence.",
            "Reject stale examples, source-only imports, retired names, hand-counted rosters, and any prose claim that contradicts executable facts.",
        ],
        subjects: [
            ...subjects(["README.md", "DESIGN.md", "MIGRATION.md", "CHANGELOG.md", "CONTRIBUTING.md"]),
            ...tree("docs/canon", "modify"), ...tree("docs/consumer-evidence", "modify"),
            future("scripts/docs/generate-facts.mjs"), future("scripts/docs/fact-schema.json"), future("tests/docs/public-facts.test.ts"),
        ],
        repairs: repair({
            tests: ["tests/docs/public-facts.test.ts"],
            build: ["package.json", "scripts/verification/invariants.mjs"],
            docs: uniq(["README.md", "DESIGN.md", "MIGRATION.md", "CHANGELOG.md", "CONTRIBUTING.md", ...paths("docs/canon"), ...paths("docs/consumer-evidence")]),
        }),
        invariant: "Public prose may add rationale but every checkable fact is generated from current executable authorities, every example resolves from the packed artifact, and no upstream mirror, test-as-consumer, foreign taxonomy, or stale displayed parameter can be narrated into product truth.",
        bite: "Claim a deleted alias or /motion-curves mirror is preserved, count a unit test as demand, or show a source-only/stale-parameter example while leaving generated facts unchanged; documentation validation must fail on the contradiction.",
        invariants: ["architecture.present-tense-source", "integrity.entry-graph", "integrity.build-package"],
        pi: piNone("Documentation truth is derived from executable facts; visual claims link to fresh owning π receipts rather than screenshots in prose."),
        deps: ["BI.W-P010", "BI.W-P014", "BI.W-P015", "BI.W-P057"],
        locks: ["public-docs", "documentation-facts"],
    }),
    wave({
        id: "BI.W-P130",
        title: "Owned profiling and diagnostic tools instead of one-off archaeology scripts",
        band: "performance-tooling",
        intent: "Preserve reusable bundle, scene, capture, and resource diagnostics under semantic owners while deleting one-off readers and tranche-specific metric programs.",
        scope: [
            "Unify bundle, Aurora, procedural-scene, capture, and lifecycle profiling through one scenario schema and trace receipt format.",
            "Move reusable shader/CSS/Dock inspection into library modules or tests that own the invariant; delete read-blob-shaders, read-css-monoliths, read-dock-css, and standalone arresting-metric programs after equivalence fixtures land.",
            "Classify animated output from resolved sinks and browser traces as layout, paint, or composite; correlate custom-property dependencies, layer promotion/demotion, CLS, main-thread cost, and frame pacing instead of retaining a reflow-name whitelist or filename exception register.",
            "Keep budgets as product distributions across named hardware/input scenarios, not frozen Lighthouse or image baselines.",
            "Correlate contexts, loops, observers, listeners, timers, memory, long tasks, and frame pacing with rendered owners and teardown.",
        ],
        subjects: [
            ...existing("scripts/aurora-arresting-metric.mjs", "scripts/profile-aurora.mjs", "scripts/profile-bundle.mjs", "scripts/read-blob-shaders.mjs", "scripts/read-css-monoliths.mjs", "scripts/read-dock-css.mjs", "scripts/reflect-capture-verify.mjs").map((path) => current(path, "delete")),
            ...tree("scripts/aurora-profile", "delete"),
            future("scripts/profile/run.mjs"), future("scripts/profile/scenarios.mjs"), future("scripts/profile/receipt-schema.json"), future("tests/performance/profile-ownership.test.ts"),
        ],
        repairs: repair({
            tests: ["tests/performance/profile-ownership.test.ts", "tests-visual/performance-experience.spec.ts"],
            build: ["package.json"],
            docs: ["CONTRIBUTING.md", "DESIGN.md"],
        }),
        invariant: "Every retained diagnostic is reusable, scenario-declared, owner-correlated, receipt-producing, and truthful about layout/paint/composite cost; no one-off tranche reader, property-name whitelist, filename allowlist, or frozen image/score baseline defines success.",
        bite: "Move expensive work into an unmeasured timer, leak one listener after route exit, feed --probe into width, or demote a transform from compositing; owner/sink/trace correlation must expose the defect despite an acceptable aggregate load score.",
        invariants: ["performance.experience", "performance.resource-ownership", "procedural.lifecycle"],
        pi: piBrowser(["profile-cold-wide", "profile-warm-wide", "profile-narrow-coarse", "profile-procedural-safari", "profile-procedural-chrome"], ["trace completeness", "owner/resource correlation", "frame pacing distribution", "long tasks", "memory/teardown"]),
        deps: ["BI.W-P025", "BI.W-P043", "BI.W-P053", "BI.W-P054", "BI.W-P058"],
        locks: ["profiling-tools", "visual-runner"],
        archaeology: ["The current scripts root carries bespoke readers, Aurora-only profilers, snapshot floors, and tranche-named proof programs whose ownership expired after their wave."],
    }),
    wave({
        id: "BI.W-P131",
        title: "ROOT precepts authority boundary and inert local gitlink",
        band: "governance",
        intent: "Make the external ROOT checkout the only normative precepts source while leaving docs/precepts physically read-only and incapable of silently governing from a stale gitlink.",
        scope: [
            "Consume P003's immutable ROOT authority at commit 8781ebb06c03547f57e33182ec1a970fd96d7069, tree de9ce02f319bf106ea07a84bd394d9054c4ea4f4, and its exact required tracked-instruction blob map; preserve DESIGN-ITERATION.md, PRECEPTS-GRAND-AUDIT.md, and TRANCHE-FORMULATION.md as checkout-local nonnormative drafts because none belongs to the selected tree.",
            "Classify docs/precepts as a non-authoritative historical gitlink: never edit it, never use it to satisfy currentness, and surface any accidental import/reference as a conformance failure.",
            "Emit the 35 proposed ROOT amendments as an outbound patch specification only; this repository never writes, checks out, or commits the ROOT tree.",
            "Require explicit ROOT adoption receipts before a future tranche may claim those amendments as canon, while perfected BI's stricter local formation contract remains binding now.",
        ],
        subjects: [
            current("docs/precepts", "verify"), current(".gitmodules", "verify"),
            future("docs/tranches/BI/root-authority.json"), future("tests/tranche/root-authority.test.ts"),
            { path: "docs/tranches/BI/FORMATION/PRECEPTS-AMENDMENTS.md", action: "verify", before: null, producedBy: "FORMATION" },
        ],
        repairs: repair({
            tests: ["tests/tranche/root-authority.test.ts"],
            build: ["scripts/tranche/canon-conformance.mjs"],
            docs: ["CONTRIBUTING.md", "docs/tranches/BI/root-authority.json", "docs/tranches/BI/FORMATION/PRECEPTS-AMENDMENTS.md"],
        }),
        invariant: "Only the declared external ROOT commit can provide normative precepts; the local gitlink and unadopted amendment proposal can neither satisfy nor mutate canon.",
        bite: "Point conformance at docs/precepts or change one ROOT instruction hash without changing the pinned commit; lineage must fail closed.",
        invariants: ["integrity.lineage", "integrity.cursor"],
        pi: piNone("Canon authority is a repository-lineage property."),
        deps: ["BI.W-P003"],
        locks: ["canon-conformance"],
        archaeology: ["The ROOT checkout is main behind origin/main with untracked live instruction drafts, while docs/precepts is a separate gitlink at 44961f0; neither ambiguity may be hidden."],
    }),
    wave({
        id: "BI.W-P132",
        title: "Live refraction product — one public door, frame graph, and honest capability matrix",
        band: "material-runtime",
        intent: "Replace the orphan WebGL2/WGSL shaders and Chromium-only CSS/SVG garnish with one actually consumed RefractionRoot/RefractionSurface product whose two GPU translators share state, lifecycle, and perceptual obligations.",
        scope: [
            "Start from the optical contract: refraction is geometry/depth, chromatic dispersion is a bounded rim phenomenon, the plate remains legible over adversarial luminance, and reduced-transparency removes the effect without removing hierarchy.",
            "Create one public /refraction entry exposing RefractionRoot and RefractionSurface; one frame graph owns backdrop capture, panel registry, state, scheduling, context, resources, and failures while private WebGPU and WebGL2 translators consume the same material/frame record.",
            "Move and reconcile the currently unimported glassShader.wgsl and glass-refract.glsl.ts under that owner, delete the inert data-URI SVG lens path and its .glass-lens opt-ins, and reject any public backend selector or second context.",
            "Treat capability absence as a declared static functional-glass material; shader compilation, binding, FBO/capture, lifecycle, or setup failure throws and remains observable instead of falling through to another renderer.",
            "Render a dedicated live story with one and multiple moving surfaces over a structured warm/color field, forced WebGPU, forced WebGL2, capability-absent material, high/low luminance, pointer/press/travel, resize/orientation, PRM, reduced transparency, and teardown states.",
            "Prove native Safari with safaridriver plus Metal/device identity and Chrome across the applicable matrix; bind π and DELTA receipts to tested source, build, route, predicate, browser, hardware, and deterministic material inputs.",
        ],
        subjects: [
            { ...current("src/composables/glass/webgl/shaders/glass-refract.glsl.ts", "rename"), targetPath: "src/components/refraction/shaders/refraction.glsl.ts" },
            { ...current("src/composables/glass/webgpu/glassShader.wgsl", "rename"), targetPath: "src/components/refraction/shaders/refraction.wgsl" },
            current("src/styles/glass-refract.css", "delete"),
            ...subjects([
                "src/components/refraction/RefractionRoot.vue",
                "src/components/refraction/RefractionSurface.vue",
                "src/components/refraction/index.ts",
                "src/components/refraction/frame-graph.ts",
                "src/components/refraction/material-contract.ts",
                "src/components/refraction/translators/webgpu.ts",
                "src/components/refraction/translators/webgl2.ts",
                "src/components/refraction/refraction.css",
                "src/composables/glass/index.ts",
                "src/styles/index.css",
                "src/components/button/Button.vue",
                "src/components/tabs/SegmentedTabs.vue",
                "demo/stories/substrates/glass-material.vue",
                "demo/stories/substrates/refraction.vue",
                "tests/components/refraction.contract.test.ts",
                "tests-visual/refraction-live.spec.ts",
            ]),
        ],
        repairs: repair({
            imports: uniq(grepPaths("glass-lens|glass-refract|glassShader\\.wgsl|GLASS_REFRACT", ["src", "demo", "tests", "tests-visual", "scripts"])),
            tests: ["tests/components/refraction.contract.test.ts", "tests-visual/refraction-live.spec.ts"],
            build: ["package.json", "scripts/lib/subpath-policy.mjs", "vite.config.ts", "vite.style-assets.ts"],
            docs: ["README.md", "DESIGN.md", "MIGRATION.md", "demo/stories/substrates/glass-material.vue", "demo/stories/substrates/refraction.vue"],
        }),
        invariant: "Every public refraction surface is painted by one live frame graph through exactly one declared translator, both translators implement the same material/state record, capability absence is honest material, internal failure is explicit, and no SVG lens, orphan shader, public backend choice, second context, stale receipt, or unobserved state can pass.",
        bite: "Remove runtime reachability, add a second context or public backend prop, set refraction strength to zero, leave the second panel inert, restore .glass-lens, catch a shader failure, perform a per-frame layout read, or substitute Playwright WebKit for native Safari; the owning family/case must fail with the planted defect.",
        invariants: ["procedural.lifecycle", "procedural.renderer-parity", "design.material-hierarchy", "design.contrast", "design.adaptive-accessibility", "performance.experience", "performance.resource-ownership", "demo.scenario-contract", "demo.gestalt", "integrity.entry-graph"],
        pi: piBrowser([
            "refraction-chrome-webgpu", "refraction-chrome-webgl2", "refraction-chrome-material",
            "refraction-safari-metal-webgpu", "refraction-safari-metal-webgl2", "refraction-safari-material",
            "refraction-multi-surface", "refraction-high-low-luminance", "refraction-narrow-orientation",
            "refraction-prm", "refraction-reduced-transparency", "refraction-injected-failures", "refraction-teardown",
        ], ["input→state→paint", "nonzero depth displacement", "bounded rim chroma", "multi-surface liveness", "contrast", "translator parity", "one context/frame graph", "frame and resource budgets", "explicit failures", "teardown"]),
        deps: ["BI.W-P016", "BI.W-P022", "BI.W-P043", "BI.W-P045", "BI.W-P053", "BI.W-P054", "BI.W-P057", "BI.W-P061", "BI.W-P133"],
        locks: ["component-refraction", "gpu-substrate", "global-material", "entry-graph", "visual-runner"],
        archaeology: [
            "Current HEAD has zero runtime importers of both refraction shaders; scripts/proof-glass.mjs proves source shape while the live CSS/SVG path is Chromium-only, so source presence has repeatedly masqueraded as a product.",
            "sci-report Atlas P registry F52 independently found the declared primary shader unconsumed and G.W9/GG037–GG040 requires live reachability, native Safari/Metal, explicit internal failures, full π/DELTA, and tested-source DesignSync refresh.",
        ],
    }),
    wave({
        id: "BI.W-P133",
        title: "Atlas Tranche P inbound allocation and stable-closure transaction",
        band: "constellation-contract",
        intent: "Turn SCI-P4-GLASS-BG-BH-BI-ADDENDUM-001 into an exact, producer-owned, formulation-only contract without letting the consumer packet widen Glass authority or claim global BI work.",
        scope: [
            "Recompute the 87-file packet digest and both raw/semantic scope hashes, snapshot Atlas and Glass bases, and bind the ACK to those bytes rather than the sender's prose hash.",
            "Give every one of the 512 inherited BG/BH/BI context actions exactly one ACCEPT, FOLD, REJECT, or BANK disposition with a canonical BI wave, executable acceptance predicate, authority source, and explicit no-credit rule.",
            "At execution G.W0, trace the 62 import clauses in 36 Atlas files through package export/source/style/asset/type/build/runtime/test/public-contract edges to a fixed point and partition every source action exactly once as ATLAS_DIRECT, REQUIRED_CLOSURE, or OUT_OF_SCOPE_BANKED before any P-derived write.",
            "Map G.W0–G.W14 and GG001–GG060 to canonical BI waves and typed external-scenario predicates consumed by the single verifier; preserve every negative control, exact cursor-driven argv, expected positive/RED behavior, source binding, and evidence contract while creating no compatibility command, named gate case, or extra executable identity.",
            "Classify P's exact InkMark import rows as coordinated migration to canonical HandMark under P051: preserve the HandMark SFC/behavior, delete only the same-source alias, and require exact Atlas replacements in src/charts/glyph/HandMark.vue and src/editorial/AnimatedRule.vue without a shim or local-binding-only rename.",
            "Preserve Glass ownership of source, tag, publication, registry, and Atlas-surface FINAL; preserve P's candidate/registry ACK roles and the exact handshake chain. A received or producer ACK never substitutes for FORMULATION-SEAL, ENV-DSYNC, CORPUS-100, P-EXECUTION-AUTHORIZATION, or P.W0.",
            "Keep DesignSync formulation review distinct from the testedSourceSha/predicate/applicable-matrix refresh and keep the ACK FORMULATION_ONLY until every external prerequisite is independently green.",
        ],
        subjects: [
            { path: "docs/tranches/BI/FORMATION/coordination/SCI-P4-GLASS-BG-BH-BI-ADDENDUM-001-ACK.json", action: "verify", before: null, producedBy: "FORMATION" },
            { path: "docs/tranches/BI/FORMATION/coordination/SCI-P4-GLASS-BG-BH-BI-ADDENDUM-001-ACK.md", action: "verify", before: null, producedBy: "FORMATION" },
            { path: "docs/tranches/BI/FORMATION/coordination/SCI-P4-source-row-mapping.json", action: "verify", before: null, producedBy: "FORMATION" },
            { path: "docs/tranches/BI/FORMATION/coordination/SCI-P4-gate-mapping.json", action: "verify", before: null, producedBy: "FORMATION" },
            future("docs/tranches/BI/exec/atlas-touched/ATLAS-PRODUCER-CLOSURE.v1.json"),
            future("docs/tranches/BI/exec/PREDICATES.v1.json"),
            future("scripts/constellation/atlas-p-closure.mjs"),
            future("tests/constellation/atlas-p-closure.test.ts"),
        ],
        repairs: repair({
            tests: ["tests/constellation/atlas-p-closure.test.ts", "tests/verification/external-scenario-contract.test.ts"],
            build: ["package.json", "scripts/verify.mjs", "scripts/constellation.mjs"],
            docs: ["docs/tranches/BI/coordination/asks-and-consumes.md", "docs/tranches/BI/exec/atlas-touched/ATLAS-PRODUCER-CLOSURE.v1.json", "docs/tranches/BI/exec/PREDICATES.v1.json"],
        }),
        invariant: "Every inbound row and predicate has one explicit producer disposition and executable owner; P-derived write authority exists only for the current fixed-point direct/required closure, all unrelated global BI work remains separately authorized and uncredited, and no ACK or earlier DesignSync phase can bypass a red external prerequisite.",
        bite: "Drop or duplicate one source row, preserve InkMark as an implicit family alias, rename only its Atlas local binding, classify a mixed shared path as banked, relocate a required flag, map a retained NEG to prose, trust the prose hash, treat ACK alone as G.W0 authority, or substitute pre-review for tested-source refresh; closure/lineage/DAG must identify the exact breach.",
        invariants: ["constellation.handshake", "integrity.lineage", "integrity.dag", "integrity.cursor", "integrity.build-package"],
        pi: piNone("This wave allocates authority and validates evidence contracts; the owning product waves, especially P132, carry the painted π/DELTA obligations."),
        deps: ["BI.W-P004", "BI.W-P005", "BI.W-P014"],
        locks: ["constellation-snapshot", "atlas-p-closure", "external-scenarios"],
        archaeology: ["The Atlas P v4 packet is a rigorously validated consumer-derived subset, not proof of the global Glass audit; receipt without exact producer allocation would recreate implicit ownership and false completion."],
    }),
];

const coreCentersFor = (item) => {
    const text = `${item.band} ${item.title} ${item.intent}`.toLowerCase();
    const centers = [];
    const add = (...ids) => centers.push(...ids);
    if (/material|glass|surface|card|refraction|token|depth|shadow|radius/.test(text)) add("C1_LIQUID_GLASS");
    if (/dock/.test(text)) add("C2_DOCK");
    if (/motion|spring|transition|scroll|pointer|easing|animation|keyframes/.test(text)) add("C3_MOTION", "C7_KEYFRAMES_INTEGRATION");
    if (/procedural|gpu|canvas|aurora|blob|constellation|fourier|liquid grid|renderer|profil/.test(text)) add("C4_PROCEDURAL_VIZ");
    if (/typograph|typewriter|split.?chars|hand.?drawn|font|text/.test(text)) add("C5_AUDACIOUS_TYPOGRAPHY");
    if (/component|structure|architecture|selection|forms|overlay|feedback|data|affordance|responsive/.test(text)) add("C6_COMPONENT_APOTHEOSIS");
    if (/demo|story|chassis|example|documentation/.test(text)) add("C8_DEMO_CHASSIS");
    if (/prune|retir|clean.?break|gate|structure|dependency|migration|diagnostic|hygiene/.test(text)) add("C9_PRUNE");
    if (/constellation-contract|consumer|handshake|release|execution|governance|package-contract|build-architecture|atlas|root precepts/.test(text)) add("C10_CONSTELLATION_ASSAY");
    if (!centers.length) add("C6_COMPONENT_APOTHEOSIS");
    return uniq(centers);
};

const RAW_WAVE_INPUTS = [
    verificationBootstrapWave,
    ...coreWaves,
    ...structureWaves,
    verificationProjectionWave,
    ...designWaves,
    ...motionWaves,
    ...dockWaves,
    ...proceduralWaves,
    ...demoWaves,
    ...componentWaves,
    ...integrationWaves,
];

const RAW_WAVE_BY_ID = new Map(RAW_WAVE_INPUTS.map((item) => [item.id, item]));
if (RAW_WAVE_BY_ID.size !== RAW_WAVE_INPUTS.length) throw new Error("raw wave ids are not unique");

const rawReachesDependency = (from, target) => {
    const stack = [...(RAW_WAVE_BY_ID.get(from)?.dependsOn ?? [])];
    const seen = new Set();
    while (stack.length) {
        const id = stack.pop();
        if (id === target) return true;
        if (seen.has(id)) continue;
        seen.add(id);
        const dependency = RAW_WAVE_BY_ID.get(id);
        if (!dependency) throw new Error(`${from} depends on unknown raw wave ${id}`);
        stack.push(...dependency.dependsOn);
    }
    return false;
};

const STRUCTURAL_EVENTS = RAW_WAVE_INPUTS.flatMap((item) => item.subjects
    .filter((row) => row.action === "rename" || row.action === "delete")
    .map((row) => ({ waveId: item.id, ...row })));
const structuralEventsBySource = new Map();
for (const event of STRUCTURAL_EVENTS) {
    if (!structuralEventsBySource.has(event.path)) structuralEventsBySource.set(event.path, []);
    structuralEventsBySource.get(event.path).push(event);
}

const projectPathAtWaveStart = (waveId, sourcePath) => {
    let path = sourcePath;
    const mutationChain = [];
    const visited = new Set();
    while (true) {
        if (visited.has(path)) throw new Error(`${waveId}:${sourcePath} enters a structural path cycle at ${path}`);
        visited.add(path);
        const applicable = (structuralEventsBySource.get(path) ?? [])
            .filter((event) => rawReachesDependency(waveId, event.waveId));
        if (!applicable.length) return { sourcePath, executionPath: path, mutationChain };
        const maximal = applicable.filter((candidate) => !applicable.some((other) =>
            other.waveId !== candidate.waveId && rawReachesDependency(other.waveId, candidate.waveId)));
        if (maximal.length !== 1) {
            throw new Error(`${waveId}:${sourcePath} has competing ancestor mutations at ${path}: ${maximal.map((event) => event.waveId).join(", ")}`);
        }
        const event = maximal[0];
        mutationChain.push({
            waveId: event.waveId,
            action: event.action,
            fromPath: event.path,
            toPath: event.targetPath ?? null,
        });
        if (event.action === "delete") return { sourcePath, executionPath: null, mutationChain };
        path = event.targetPath;
    }
};

// Explicit transaction rows must already use the path that exists when their
// wave starts. Only mechanically discovered repair scans are projected below;
// silently rewriting an authored modify/delete/rename would conceal a design
// error in the canonical wave packet.
const staleExplicitSubjects = RAW_WAVE_INPUTS.flatMap((item) => item.subjects.flatMap((row) => {
    const projection = projectPathAtWaveStart(item.id, row.path);
    return projection.executionPath === row.path ? [] : [{ waveId: item.id, action: row.action, ...projection }];
}));
if (staleExplicitSubjects.length) {
    throw new Error(`authored subjects cite archaeological paths: ${staleExplicitSubjects.slice(0, 12).map((row) => `${row.waveId}:${row.sourcePath}->${row.executionPath ?? "DELETED"}`).join(", ")}`);
}

const producerByPath = new Map();
const producerSubjectByPath = new Map();
const registerProducer = (path, id, row) => {
    const prior = producerByPath.get(path);
    if (prior && prior !== id) throw new Error(`${path} has competing formation producers ${prior} and ${id}`);
    producerByPath.set(path, id);
    if (!producerSubjectByPath.has(path)) producerSubjectByPath.set(path, { waveId: id, row });
};
for (const item of RAW_WAVE_INPUTS) {
    for (const row of item.subjects) {
        if (row.action === "create") registerProducer(row.path, item.id, row);
        if (row.action === "rename") registerProducer(row.targetPath, item.id, row);
    }
}

const pathLifecycleProjectionRows = [];
const RAW_WAVES = RAW_WAVE_INPUTS.map((item) => {
    const normalizedRepairs = Object.fromEntries(Object.entries(item.repairs).map(([kind, paths]) => [
        kind,
        uniq(paths.flatMap((path) => {
            const projection = projectPathAtWaveStart(item.id, path);
            if (projection.executionPath !== path) {
                pathLifecycleProjectionRows.push({
                    waveId: item.id,
                    repairSurface: kind,
                    sourcePath: path,
                    executionPath: projection.executionPath,
                    disposition: projection.executionPath === null
                        ? "DROP_ANCESTOR_DELETION"
                        : "PROJECT_ANCESTOR_RENAME",
                    mutationChain: projection.mutationChain,
                });
            }
            return projection.executionPath === null ? [] : [projection.executionPath];
        })),
    ]));
    const repairSubjects = Object.values(normalizedRepairs).flat().flatMap((path) => {
        if (item.id === "BI.W-P000" && VERIFICATION_BOOTSTRAP_PATHS.has(path)) return future(path);
        const producer = producerByPath.get(path);
        if (producer === item.id && item.subjects.some((row) => row.action === "rename" && row.targetPath === path)) {
            return [];
        }
        if (producer && producer !== item.id) {
            if (!rawReachesDependency(item.id, producer)) {
                throw new Error(`${item.id} repairs ${path} before or beside its declared producer ${producer}`);
            }
            const produced = producerSubjectByPath.get(path)?.row;
            return [{
                path,
                action: "repair",
                before: null,
                producedBy: producer,
                ...(produced?.sourceBasePath || produced?.path ? { sourceBasePath: produced.sourceBasePath ?? produced.path } : {}),
                ...(produced?.sourceBaseOid || produced?.before ? { sourceBaseOid: produced.sourceBaseOid ?? produced.before } : {}),
            }];
        }
        const row = subject(path, "repair");
        if (row.before || row.producedBy || row.action !== "repair") return row;
        registerProducer(path, item.id, row);
        return future(path);
    });
    const subjects = dedupeSubjects([...item.subjects, ...repairSubjects]);
    for (const row of subjects) {
        if (row.action === "create") registerProducer(row.path, item.id, row);
        if (row.action === "rename") registerProducer(row.targetPath, item.id, row);
    }
    return {
        ...item,
        repairs: normalizedRepairs,
        coreCenters: coreCentersFor(item),
        // A REPAIR row is conditional write authority, not an informal
        // read-check footnote. An explicit structural action wins and determines
        // the receipt outcome; an absent repair artifact is created by its first
        // owner and every later wave names that exact producer. Every
        // mechanically discovered path is projected through ancestor renames;
        // ancestor deletions are semantically subtractive, while an authored
        // stale subject is rejected above rather than silently rewritten.
        subjects,
    };
});

export const PATH_LIFECYCLE_PROJECTIONS = Object.freeze(pathLifecycleProjectionRows
    .sort((a, b) => a.waveId.localeCompare(b.waveId) || a.sourcePath.localeCompare(b.sourcePath)));

const reduceDependencies = (waves) => {
    const dependencies = new Map(waves.map((item) => [item.id, new Set(item.dependsOn)]));
    const reaches = (from, target, skipped) => {
        const stack = [from];
        const seen = new Set();
        while (stack.length) {
            const id = stack.pop();
            if (id === target) return true;
            if (seen.has(id)) continue;
            seen.add(id);
            for (const dependency of dependencies.get(id) ?? []) {
                if (skipped && id === skipped[0] && dependency === skipped[1]) continue;
                stack.push(dependency);
            }
        }
        return false;
    };

    return waves.map((item) => ({
        ...item,
        dependsOn: item.dependsOn.filter((dependency) =>
            !item.dependsOn.some((other) => other !== dependency && reaches(other, dependency))),
    }));
};

const assignTopologicalStrata = (waves) => {
    const byId = new Map(waves.map((item) => [item.id, item]));
    const remaining = new Set(byId.keys());
    const completed = new Set();
    const stratumById = new Map();
    let stratum = 0;
    while (remaining.size) {
        const ready = [...remaining]
            .filter((id) => byId.get(id).dependsOn.every((dependency) => completed.has(dependency)))
            .sort();
        if (!ready.length) throw new Error(`cycle prevents topological stratum ${stratum}`);
        for (const id of ready) {
            stratumById.set(id, stratum);
            remaining.delete(id);
            completed.add(id);
        }
        stratum += 1;
    }
    return waves.map((item) => ({
        ...item,
        formationFamily: item.band,
        band: `BI.S${String(stratumById.get(item.id)).padStart(2, "0")}`,
        topologicalStratum: stratumById.get(item.id),
    }));
};

export const WAVES = Object.freeze(assignTopologicalStrata(reduceDependencies(RAW_WAVES)));
