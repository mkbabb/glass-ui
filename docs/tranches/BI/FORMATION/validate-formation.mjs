import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import ts from "typescript";

import { GATES as LEGACY_GATES } from "../../../../scripts/gates.manifest.mjs";
import { buildEntrySet, readTree } from "../../../../scripts/lib/subpath-policy.mjs";
import { INVARIANTS } from "./invariants.registry.mjs";
import { INVARIANT_FAMILY_AUDIT } from "./invariant-family-audit.registry.mjs";
import {
    EXPLICIT_LEGACY_DECISIONS,
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
import { RENDERED_FINDING_ADDENDA, RENDERED_INTERACTION_ADDENDA } from "./rendered-demo-addenda.registry.mjs";
import { MEMBER_JUDGMENT_OVERRIDES, resolveMemberJudgment } from "./public-component-member-judgments.registry.mjs";

const ROOT = dirname(new URL(import.meta.url).pathname);
const REPO = resolve(ROOT, "../../../..");
const PACKET = "/Users/mkbabb/Programming/sci-report/atlas/docs/tranches/P/refine/planv4";
const ATLAS = "/Users/mkbabb/Programming/sci-report/atlas";
const PRECEPTS = "/Users/mkbabb/Programming/precepts";
const TRANCHE_ROOT = join(REPO, "docs/tranches");

const errors = [];
const checks = [];
const check = (condition, message) => {
    checks.push(message);
    if (!condition) errors.push(message);
};
const sha = (value) => createHash("sha256").update(value).digest("hex");
const fileSha = (path) => sha(readFileSync(path));
const json = (name) => JSON.parse(readFileSync(join(ROOT, name), "utf8"));
const command = (cwd, executable, ...args) => execFileSync(executable, args, { cwd, encoding: "utf8" }).trim();
const uniq = (items) => [...new Set(items)];
const sorted = (items) => [...items].sort();
const sameSet = (a, b) => JSON.stringify(sorted(a)) === JSON.stringify(sorted(b));

const waveById = new Map(WAVES.map((wave) => [wave.id, wave]));
const invariantById = new Map(INVARIANTS.map((row) => [row.id, row]));
const waveIds = new Set(waveById.keys());
const invariantIds = new Set(invariantById.keys());
const writePaths = (wave) => uniq(wave.subjects.flatMap((subject) => subject.action === "verify" ? [] : [subject.path, subject.targetPath].filter(Boolean)));
const executionLocks = (wave) => uniq([...wave.resourceLocks, ...writePaths(wave).map((path) => `file:${path}`)]);
const integrationArtifactPaths = (wave) => wave.integrationArtifacts.map((artifact) => artifact.path);
const transactionPaths = (wave) => uniq([...writePaths(wave), ...integrationArtifactPaths(wave)]);

const currentHead = command(REPO, "git", "rev-parse", "HEAD");
const sourceBaseIsAncestor = spawnSync("git", ["merge-base", "--is-ancestor", SOURCE_BASE, currentHead], { cwd: REPO }).status === 0;
const committedHeadDeltaPaths = command(REPO, "git", "diff", "--name-only", SOURCE_BASE, currentHead).split("\n").filter(Boolean);
check(sourceBaseIsAncestor && committedHeadDeltaPaths.every((path) => path.startsWith("docs/tranches/BI/FORMATION/")), "formation HEAD equals the frozen source base or descends from it through formation-only commits");
const statusPaths = command(REPO, "git", "status", "--porcelain=v1", "--untracked-files=all").split("\n").filter(Boolean).map((line) => line.slice(3));
check(statusPaths.every((path) => path.startsWith("docs/tranches/BI/FORMATION/")), "formation turn changed no Glass implementation/source path");

check(WAVES.length >= 100, "at least 100 non-contrived waves exist");
check(waveIds.size === WAVES.length, "wave IDs are unique");
for (let index = 0; index < WAVES.length; index += 1) {
    const number = index === 0 ? 0 : index;
    check(WAVES[index].id === `BI.W-P${String(number).padStart(3, "0")}`, `wave index ${index + 1} has canonical BI.W-* identity`);
}

const baseTreeText = execFileSync("git", ["ls-tree", "-r", "--full-tree", SOURCE_BASE], { cwd: REPO, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
const baseTree = new Map(baseTreeText.trim().split("\n").filter(Boolean).map((line) => {
    const [left, path] = line.split("\t");
    const [mode, type, oid] = left.split(" ");
    return [path, { mode, type, oid }];
}));

const allowedActions = new Set(["create", "modify", "delete", "rename", "repair", "verify"]);
const repairKinds = ["imports", "tests", "verification", "build", "docs"];
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

for (const wave of WAVES) {
    check(wave.scope.length >= 4, `${wave.id} has fully enumerated scope`);
    check(wave.subjects.length > 0, `${wave.id} has a nonempty exact file manifest`);
    check(wave.intent.length >= 40 && wave.invariant.length >= 40 && wave.mutationBite.length >= 40, `${wave.id} has substantive intent/invariant/bite`);
    check(wave.id === "BI.W-P000" || !/\bgates?\b/i.test(wave.mutationBite), `${wave.id} mutation bite names a falsifiable property/evidence response rather than preserving gate-shaped authority`);
    check(wave.coreCenters.length > 0, `${wave.id} belongs to at least one user-named core center`);
    check(wave.status === "PLANNED" && wave.disposition === null, `${wave.id} is honestly nonterminal at formation`);
    check(/exactly one orchestrator-owned/.test(wave.commitPolicy), `${wave.id} carries one-commit orchestrator discipline`);
    check(!/PARTIAL|DEFERRED|CARRIED|COMPLETE_WITH_MISSES/.test(`${wave.status} ${wave.terminalRule}`), `${wave.id} has no forbidden terminal state`);
    check(wave.invariantFamilies.length >= 1 && wave.invariantFamilies.every((id) => invariantIds.has(id)), `${wave.id} names only canonical invariant families`);
    check(wave.invariantFamilies.length === new Set(wave.invariantFamilies).size, `${wave.id} invariant-family owners are unique`);
    check(wave.dependsOn.length === new Set(wave.dependsOn).size && wave.dependsOn.every((id) => waveIds.has(id) && id !== wave.id), `${wave.id} dependencies are unique, known, and non-self`);
    check(wave.resourceLocks.length === new Set(wave.resourceLocks).size, `${wave.id} resource locks are unique`);
    check(writePaths(wave).length > 0, `${wave.id} owns at least one exact non-VERIFY transaction path`);
    check(wave.agentCommitAuthority === false && wave.integrationLock === "serialized-orchestrator-envelope", `${wave.id} denies agent commits and uses the one serialized integration envelope`);
    check(["NONE", "ACTIVATE", "REFRESH"].includes(wave.projectionMode), `${wave.id} has one legal projection lifecycle mode`);
    check(wave.integrationRequires.length === new Set(wave.integrationRequires).size && wave.integrationRequires.every((id) => waveIds.has(id) && id !== wave.id), `${wave.id} integration prerequisites are unique, known, and non-self`);
    check(Array.isArray(wave.integrationPrerequisites), `${wave.id} has machine-readable integration predicates`);

    const subjectPaths = new Set();
    for (const subject of wave.subjects) {
        check(typeof subject.path === "string" && subject.path.length > 0 && !/[\*{}]/.test(subject.path) && !subject.path.endsWith("/"), `${wave.id} subject ${subject.path} is an exact path`);
        check(allowedActions.has(subject.action), `${wave.id} subject ${subject.path} has a legal action`);
        check(!subjectPaths.has(subject.path), `${wave.id} subject path ${subject.path} is unique`);
        subjectPaths.add(subject.path);
        const base = baseTree.get(subject.path);
        if (subject.before) {
            check(base?.oid === subject.before, `${wave.id} subject ${subject.path} preimage matches source-base blob`);
        } else if (subject.producedBy === "FORMATION") {
            check(subject.action === "verify", `${wave.id} formation artifact ${subject.path} is verify-only`);
        } else if (subject.producedBy) {
            check(waveIds.has(subject.producedBy), `${wave.id} subject ${subject.path} names a known producer`);
            check(reachesDependency(wave.id, subject.producedBy), `${wave.id} subject ${subject.path} producer is an ancestor`);
        } else if (subject.action === "create") {
            check(!base, `${wave.id} create subject ${subject.path} is absent at source base`);
        } else {
            check(false, `${wave.id} non-create subject ${subject.path} has a preimage or producer`);
        }
        if (subject.action === "rename") {
            check(typeof subject.targetPath === "string" && subject.targetPath !== subject.path && !/[\*{}]/.test(subject.targetPath), `${wave.id} rename ${subject.path} has an exact distinct target`);
        } else {
            check(subject.targetPath === undefined, `${wave.id} non-rename ${subject.path} has no targetPath`);
        }
    }

    check(sameSet(Object.keys(wave.repairs), repairKinds), `${wave.id} repair manifest has all and only five non-gate surfaces`);
    for (const [kind, paths] of Object.entries(wave.repairs)) {
        check(paths.length === new Set(paths).size, `${wave.id} repair ${kind} paths are unique`);
        for (const path of paths) {
            check(typeof path === "string" && path.length > 0 && !/[\*{}]/.test(path) && !path.endsWith("/"), `${wave.id} repair ${kind}:${path} is exact`);
            check(subjectPaths.has(path) || wave.subjects.some((subject) => subject.targetPath === path), `${wave.id} repair ${kind}:${path} is enrolled in the file transaction`);
            const enrolled = wave.subjects.find((subject) => subject.path === path || subject.targetPath === path);
            check(path.startsWith("docs/tranches/BI/FORMATION/") || enrolled?.action !== "verify", `${wave.id} repair ${kind}:${path} has conditional or explicit write authority rather than a read-only contradiction`);
        }
    }

    check(wave.integrationArtifacts.length === (wave.projectionMode === "NONE" ? 1 : 3), `${wave.id} has one receipt and exactly the applicable projection adjuncts`);
    check(integrationArtifactPaths(wave).length === new Set(integrationArtifactPaths(wave)).size, `${wave.id} integration artifact paths are unique`);
    check(integrationArtifactPaths(wave).every((path) => typeof path === "string" && path.length > 0 && !/[\*{}]/.test(path) && !path.endsWith("/")), `${wave.id} integration artifacts are exact paths`);
    check(integrationArtifactPaths(wave).every((path) => !writePaths(wave).includes(path)), `${wave.id} integration artifacts are disjoint from builder write leases`);
    const receiptArtifact = wave.integrationArtifacts[0];
    check(receiptArtifact.path === wave.receiptPath && receiptArtifact.role === "terminal-receipt" && receiptArtifact.action === "create", `${wave.id} first adjunct is its unique append-only terminal receipt`);
    check(/resolve externally/.test(receiptArtifact.commitLocator) && receiptArtifact.payloadDigestPolicy === RECEIPT_PAYLOAD_DIGEST_POLICY && JSON.stringify(receiptArtifact.intendedTrailerContract) === JSON.stringify(INTENDED_TRAILER_CONTRACT), `${wave.id} receipt excludes every integration adjunct from its pre-projection digest, omits its own digest value, and externally resolves its containing commit`);
    if (wave.projectionMode === "NONE") {
        check(wave.integrationRequires.length === 0 && wave.integrationPrerequisites.length === 0, `${wave.id} pre-projection integration has no activation prerequisite`);
    } else {
        const [attestation, finalProjection] = wave.integrationArtifacts.slice(1);
        check(attestation.path === "docs/tranches/BI/RELEASE-ATTESTATION.json" && attestation.role === "continuous-release-attestation", `${wave.id} second adjunct is release attestation`);
        check(finalProjection.path === "docs/tranches/BI/FINAL.md" && finalProjection.role === "continuous-final-projection", `${wave.id} third adjunct is FINAL`);
        check(/except RELEASE-ATTESTATION\.json and FINAL\.md/.test(attestation.digestPolicy) && /includes the current receipt/.test(attestation.digestPolicy), `${wave.id} attestation digest includes receipt and excludes exactly the cyclic projection pair`);
        check(/references sha256 of RELEASE-ATTESTATION\.json/.test(finalProjection.digestPolicy) && /never the inverse/.test(finalProjection.digestPolicy), `${wave.id} FINAL depends on attestation without a reverse edge`);
        if (wave.projectionMode === "ACTIVATE") {
            check(wave.integrationRequires.length === 0 && wave.integrationPrerequisites.length === 0, `${wave.id} is the sole projection activator and has no self-prerequisite`);
        } else {
            check(sameSet(wave.integrationRequires, ["BI.W-P002"]) && JSON.stringify(wave.integrationPrerequisites) === JSON.stringify([P002_ACTIVATION_PREREQUISITE]), `${wave.id} refresh integration requires verified P002 DONE activation artifacts rather than terminality alone`);
        }
    }

    if (wave.pi.kind === "device-free") {
        check(wave.pi.reason?.length >= 30, `${wave.id} device-free declaration gives a substantive reason`);
    } else {
        check(wave.pi.kind === "browser", `${wave.id} π kind is browser or device-free`);
        check(sameSet(wave.pi.browsers, ["Safari-current", "Chrome-current"]), `${wave.id} browser π is dual-engine`);
        check(["wide-fine", "narrow-coarse", "prefers-reduced-motion"].every((mode) => wave.pi.modes.includes(mode)), `${wave.id} browser π covers wide, narrow/coarse, and PRM`);
        check(wave.pi.scenarios.length > 0 && wave.pi.observables.length > 0 && /terminal wave commit/.test(wave.pi.freshness), `${wave.id} browser π has scenarios, observables, and terminal freshness`);
    }
}

const bootstrapDeletes = new Set(waveById.get("BI.W-P000").subjects.filter((row) => row.action === "delete").map((row) => row.path));
check(WAVES.filter((wave) => wave.id !== "BI.W-P000").every((wave) =>
    wave.subjects.every((row) => !bootstrapDeletes.has(row.path)) &&
    Object.values(wave.repairs).flat().every((path) => !bootstrapDeletes.has(path))),
"atomic P000 deletions are semantically subtractive and never recur as stale later subjects or repairs");
const structuralEvents = WAVES.flatMap((owner) => owner.subjects
    .filter((subject) => subject.action === "rename" || subject.action === "delete")
    .map((subject) => ({ waveId: owner.id, ...subject })));
for (const wave of WAVES) {
    for (const subject of wave.subjects) {
        check(!structuralEvents.some((event) => event.path === subject.path && reachesDependency(wave.id, event.waveId)), `${wave.id} subject ${subject.path} is not an archaeological pre-rename/pre-delete path`);
    }
    for (const path of Object.values(wave.repairs).flat()) {
        check(!structuralEvents.some((event) => event.path === path && reachesDependency(wave.id, event.waveId)), `${wave.id} repair ${path} is projected to the path that exists at wave start`);
    }
}
const pathLifecycleLedger = json("path-lifecycle-projection.json");
const expectedPathLifecycleCounts = PATH_LIFECYCLE_PROJECTIONS.reduce((counts, row) => ({
    ...counts,
    [row.disposition]: (counts[row.disposition] ?? 0) + 1,
}), {});
const expectedLifecycleEventCounts = PATH_LIFECYCLE_PROJECTIONS.reduce((counts, row) => {
    const event = row.mutationChain[0];
    const key = `${event.waveId}:${event.action}`;
    return { ...counts, [key]: (counts[key] ?? 0) + 1 };
}, {});
check(pathLifecycleLedger.schemaVersion === FORMATION_SCHEMA && pathLifecycleLedger.sourceBase === SOURCE_BASE && pathLifecycleLedger.authority === "FORMATION_DESIGN_ONLY", "path-lifecycle ledger binds schema, exact source base, and formulation-only authority");
check(pathLifecycleLedger.observationCountIsNormative === false && pathLifecycleLedger.projectionCount === PATH_LIFECYCLE_PROJECTIONS.length, "path-lifecycle projection count is derived archaeology rather than a success target");
check(JSON.stringify(pathLifecycleLedger.dispositionCounts) === JSON.stringify(expectedPathLifecycleCounts) && JSON.stringify(pathLifecycleLedger.firstMutationCounts) === JSON.stringify(expectedLifecycleEventCounts), "path-lifecycle summary counts derive exactly from transposition rows");
check(JSON.stringify(pathLifecycleLedger.rows) === JSON.stringify(PATH_LIFECYCLE_PROJECTIONS), "path-lifecycle artifact exactly reproduces the registry's DAG-aware repair transpositions");
for (const row of PATH_LIFECYCLE_PROJECTIONS) {
    check(waveIds.has(row.waveId) && repairKinds.includes(row.repairSurface) && row.sourcePath !== row.executionPath && row.mutationChain.length > 0, `${row.waveId}:${row.sourcePath} lifecycle row is exact and non-vacuous`);
    check(row.mutationChain.every((event) => waveIds.has(event.waveId) && reachesDependency(row.waveId, event.waveId) && ["rename", "delete"].includes(event.action)), `${row.waveId}:${row.sourcePath} lifecycle chain contains only ancestor structural mutations`);
    check(row.disposition === (row.executionPath === null ? "DROP_ANCESTOR_DELETION" : "PROJECT_ANCESTOR_RENAME"), `${row.waveId}:${row.sourcePath} lifecycle disposition matches its terminal path`);
}
const pathLifecycleMd = readFileSync(join(ROOT, "PATH-LIFECYCLE-PROJECTION.md"), "utf8");
check(/execution cannot operate on archaeological names/.test(pathLifecycleMd) && /not a future gate or roster target/.test(pathLifecycleMd), "path-lifecycle narrative states the execution-path law without turning observed counts into gates");
const futureGateInfrastructure = WAVES.flatMap((wave) => wave.subjects
    .filter((row) => row.action !== "delete" && (/^scripts\/gates(?:\/|\.|$)/.test(row.path) || /^scripts\/proof-/.test(row.path)))
    .map((row) => `${wave.id}:${row.path}`));
check(futureGateInfrastructure.length === 0, "no wave preserves or creates scripts/gates or scripts/proof-* infrastructure after command-registry abrogation");
const verifierOwners = WAVES.flatMap((wave) => wave.subjects
    .filter((row) => row.path === "scripts/verify.mjs" && row.action === "create")
    .map(() => wave.id));
check(sameSet(verifierOwners, ["BI.W-P000"]), "scripts/verify.mjs has exactly one creating wave and there is no per-property executable owner");
check(![...waveIds].some((id) => /GG\d|GATE/i.test(id)), "canonical BI wave IDs do not encode historical or consumer gate identities");

const bootstrapWave = waveById.get("BI.W-P000");
check(sameSet(bootstrapWave.invariantFamilies, ["integrity.build-package", "integrity.lineage", "integrity.dag", "architecture.clean-break"]), "P000 accepts only bootstrap architecture, packaging, lineage, and DAG properties rather than prematurely owning every product family");
check(bootstrapWave.pi.kind === "device-free" && /no product visual claim/.test(bootstrapWave.pi.reason), "P000 validates browser receipt adapters with fixtures but makes no current-product browser claim");
check(/exactly one future owning wave/.test(bootstrapWave.scope.join(" ")) && /not counted as PASS/.test(bootstrapWave.terminalRule), "P000 fixes bootstrap-owned failures and uniquely routes encountered downstream REDs without blessing them");

const receiptPaths = WAVES.map((wave) => wave.receiptPath);
check(receiptPaths.length === 134 && new Set(receiptPaths).size === 134, "all 134 waves have one unique append-only receipt path");
check(bootstrapWave.receiptPath === "docs/tranches/BI/BOOTSTRAP.json" && WAVES.slice(1).every((wave) => wave.receiptPath === `docs/tranches/BI/evidence/${wave.id}/receipt.json`), "P000 alone uses BOOTSTRAP and P001-P133 use their exact evidence-root receipts");
check(waveById.get("BI.W-P001").projectionMode === "NONE" && waveById.get("BI.W-P002").projectionMode === "ACTIVATE" && WAVES.slice(3).every((wave) => wave.projectionMode === "REFRESH" && sameSet(wave.integrationRequires, ["BI.W-P002"]) && JSON.stringify(wave.integrationPrerequisites) === JSON.stringify([P002_ACTIVATION_PREREQUISITE])), "P002 alone activates continuous projections and every P003-P133 refresh requires its verified DONE receipt/trailer/artifact predicate");
check(sameSet(waveById.get("BI.W-P003").dependsOn, ["BI.W-P001"]) && sameSet(waveById.get("BI.W-P004").dependsOn, ["BI.W-P001"]) && sameSet(waveById.get("BI.W-P005").dependsOn, ["BI.W-P001"]), "P002 activation does not invent builder-launch edges or reduce the first maximal fanout");
check(WAVES.every((wave) => integrationArtifactPaths(wave).every((path) => !executionLocks(wave).includes(`file:${path}`))), "receipt, attestation, and FINAL adjuncts never enter builder resource locks");
check(WAVES.every((wave) => transactionPaths(wave).length === writePaths(wave).length + wave.integrationArtifacts.length), "every wave transaction is exactly builder writes plus disjoint orchestrator adjuncts");

const cursorWave = waveById.get("BI.W-P001");
check(["scripts/tranche/wave-receipt-schema.json", "scripts/tranche/transaction-envelope.mjs", "tests/tranche/transaction-envelope.test.ts"].every((path) => cursorWave.subjects.some((row) => row.path === path && row.action === "create")), "P001 owns the general receipt schema, transaction envelope, and adversarial integration tests");
check(/Git lineage plus committed receipts as authority/.test(cursorWave.scope.join(" ")) && /rebuildable cache/.test(cursorWave.scope.join(" ")) && /git rev-parse --git-path tranche\/BI/.test(cursorWave.scope.join(" ")), "P001 makes Git/receipts authoritative and stores only reconstructable Git-private cache");
check(/Import BOOTSTRAP\.json/.test(cursorWave.scope.join(" ")) && /missing, duplicate, altered, intervening, or guessed history/.test(cursorWave.scope.join(" ")), "P001 explicitly imports P000 through adversarial unique receipt/trailer recovery");
check(/fresh-checkout reconstruction/.test(cursorWave.scope.join(" ")) && /Delete every cursor cache file/.test(cursorWave.mutationBite), "P001 proves clean-checkout and cache-loss recovery rather than process-memory continuity");

const releaseWave = waveById.get("BI.W-P002");
check(releaseWave.integrationArtifacts.some((row) => row.path === "docs/tranches/BI/RELEASE-ATTESTATION.json" && row.action === "create") && releaseWave.integrationArtifacts.some((row) => row.path === "docs/tranches/BI/FINAL.md" && row.action === "create"), "P002 activates both exact release projections as orchestrator adjuncts");
check(!releaseWave.subjects.some((row) => ["docs/tranches/BI/FINAL.md", "docs/tranches/BI/RELEASE-ATTESTATION.json"].includes(row.path)), "P002 does not grant parallel builders leases over shared projections");
check(/--write emits NONTERMINAL_PROJECTION/.test(releaseWave.scope.join(" ")) && /--check requires tracked bytes/.test(releaseWave.scope.join(" ")) && /--require-terminal rejects/.test(releaseWave.scope.join(" ")), "P002 separates honest projection writing, byte checking, and terminal release authorization");
check(/P002 may be DONE with an honest releaseEligible false/.test(releaseWave.invariant) && /ask --require-terminal/.test(releaseWave.mutationBite), "P002 can install a truthful red projection without falsely authorizing release");
check(/payload to receipt to attestation to FINAL to commit/.test(releaseWave.scope.join(" ")) && /containing commit\/tree is resolved externally/.test(releaseWave.scope.join(" ")), "P002's projection digest graph is acyclic and has no containing-object fixed point");
check(/DEAD only if the product owner permanently withdraws the entire perfected-BI formation/.test(releaseWave.terminalRule) && /forbids every P003-P133 integration/.test(releaseWave.terminalRule), "P002 DEAD is an explicit whole-formation withdrawal and can never unlock refresh integration");

const canonWave = waveById.get("BI.W-P003");
check(sameSet(canonWave.invariantFamilies, ["integrity.lineage", "integrity.cursor", "integrity.dag"]), "P003 owns exact canon, routing, and bounded-fanout properties");
check(["scripts/tranche/canon-authority.json", "scripts/tranche/canon-object-snapshot.json", "scripts/tranche/canon-object-snapshot.schema.json"].every((path) => canonWave.subjects.some((row) => row.path === path && row.action === "create")), "P003 materializes machine-readable ROOT authority plus a schema-bound minimal raw-object snapshot");
check(/8781ebb06c03547f57e33182ec1a970fd96d7069/.test(canonWave.scope.join(" ")) && /de9ce02f319bf106ea07a84bd394d9054c4ea4f4/.test(canonWave.scope.join(" ")) && /commit:path git objects/.test(canonWave.scope.join(" ")), "P003 pins canon through immutable git objects");
check(/BI_ROOT_PRECEPTS_GIT_DIR/.test(canonWave.scope.join(" ")) && /GIT_RAW_OBJECT_SNAPSHOT_V1/.test(canonWave.scope.join(" ")) && /type \+ decimal byte length \+ NUL \+ decoded raw content/.test(canonWave.scope.join(" ")) && /parse binary tree entries/.test(canonWave.scope.join(" ")) && /fresh CI and release modes validate the committed snapshot without requiring the absolute checkout or network/.test(canonWave.scope.join(" ")), "P003 makes the exact minimal pinned ROOT object closure cryptographically reproducible in local, fresh CI, and release modes");
check(/current core session alone owns orchestration, design, synthesis, adjudication/.test(canonWave.scope.join(" ")) && /Luna or Terra/.test(canonWave.scope.join(" ")) && /never provider-model assertions/.test(canonWave.scope.join(" ")), "P003 implements CURRENT-012 without inferred provider identity");
check(!/Validate exact model IDs|required model.*unavailable.*block/.test(`${canonWave.scope.join(" ")} ${canonWave.invariant}`), "P003 contains no superseded CURRENT-002 routing rule");
const selectedRootCommit = "8781ebb06c03547f57e33182ec1a970fd96d7069";
const selectedRootTree = "de9ce02f319bf106ea07a84bd394d9054c4ea4f4";
const selectedRootBlobs = {
    "instructions/README.md": "d999ee7420d6bce0dc5992a58085e07f95c10062",
    "instructions/STYLE.md": "ffa6c4823c94f8cc8af4cf431d8f09d68cba34e6",
    "instructions/ORCHESTRATION.md": "4825e52d67efd3e8d9d4bdbf7032942da2c2a383",
    "instructions/TRANCHE-AND-WAVE-SPEC.md": "1fc500f083b159b573454836549ddd4f35d00caf",
    "instructions/CONSUMING.md": "a11fbe5e0e9a7fbd61cb1d951fb46097760e624b",
    "instructions/LESSONS-LEARNED.md": "6a784e1a79e624c4573ecebac596de102387a6fe",
    "instructions/tranche/README.md": "ab85b3490c80f4673d733a0863bd7c4326aff0af",
    "instructions/tranche/START.md": "850a5f95c68941641189a3b2fd7d9a88ad069657",
    "instructions/tranche/SPEC.md": "fc2bfffb2aa7ddedb9b86ce02b06ae9f00a2eafe",
    "instructions/tranche/RESEARCH.md": "354d68698341504698381851111023be7982b1d2",
    "instructions/tranche/CHALLENGE.md": "eb3c96a06819710a4abcf790b3b4a1c308438e9a",
    "instructions/tranche/WAVE_SPEC.md": "a21cd55a793ebfd423cf4e15029ded3571d9b6fb",
    "instructions/tranche/AGENT_DISPATCH_TEMPLATE.md": "15e888823bf8c2c462044812d8fe4e705025d1b3",
    "instructions/tranche/DOC_UPDATE_WAVE.md": "85cd592ce07f7f69d87bc48c0d36f65078fd8ed7",
};
check(command(PRECEPTS, "git", "cat-file", "-t", selectedRootCommit) === "commit" && command(PRECEPTS, "git", "rev-parse", `${selectedRootCommit}^{tree}`) === selectedRootTree, "selected ROOT commit and tree objects are locally available");
for (const [path, oid] of Object.entries(selectedRootBlobs)) check(command(PRECEPTS, "git", "rev-parse", `${selectedRootCommit}:${path}`) === oid, `selected ROOT object ${path} has its exact reviewed blob`);

const constellationWave = waveById.get("BI.W-P004");
check(sameSet(constellationWave.invariantFamilies, ["constellation.handshake", "integrity.lineage"]), "P004 owns foreign snapshot lineage and handshake truth without premature package greenness");
check(["scripts/constellation/snapshot-worktree.mjs", "tests/constellation/snapshot-worktree.test.ts", "docs/tranches/BI/constellation-baseline.json"].every((path) => constellationWave.subjects.some((row) => row.path === path && row.action === "create")), "P004 has exact byte-snapshot implementation, mutation tests, and baseline subjects");
check(/tracked working-tree path's type\/mode\/content digest/.test(constellationWave.scope.join(" ")) && /untracked tree member's path\/type\/mode\/content/.test(constellationWave.scope.join(" ")) && /FOREIGN_STATE_UNSTABLE/.test(constellationWave.scope.join(" ")), "P004 protects already-dirty tracked and untracked bytes and rejects torn snapshots");
check(/already-M tracked file/.test(constellationWave.mutationBite) && /untracked tree/.test(constellationWave.mutationBite) && /porcelain/.test(constellationWave.mutationBite), "P004's required bite closes both status-stable byte-drift holes");
check(/tracked HEAD objects/.test(constellationWave.scope.join(" ")) && /zero adoption or retention credit/.test(constellationWave.scope.join(" ")) && /exact Glass tarball/.test(constellationWave.scope.join(" ")), "P004 separates immutable committed demand from protected dirty observations and later acceptance");

const rootBoundaryWave = waveById.get("BI.W-P131");
check(/8781ebb06c03547f57e33182ec1a970fd96d7069/.test(rootBoundaryWave.scope[0]) && /DESIGN-ITERATION\.md, PRECEPTS-GRAND-AUDIT\.md, and TRANCHE-FORMULATION\.md/.test(rootBoundaryWave.scope[0]) && /checkout-local nonnormative drafts/.test(rootBoundaryWave.scope[0]), "P131 preserves the three absent ROOT drafts without promoting them over P003's selected object authority");

const projectionWave = waveById.get("BI.W-P014");
check(sameSet(projectionWave.invariantFamilies, invariantIds) && projectionWave.pi.kind === "browser", "P014, not P000, owns the first full native projection across every descriptive property family");
check(/exactly one nonterminal future owning wave/.test(projectionWave.scope.join(" ")) && /no routed RED is counted as property PASS or release evidence/.test(projectionWave.terminalRule), "P014 may close its projection transaction around an honestly routed downstream RED but cannot green or release that property");

check(INVARIANTS.length > 0 && invariantIds.size === INVARIANTS.length, "durable property-family IDs are unique and nonempty");
const usedInvariantIds = new Set(WAVES.flatMap((wave) => wave.invariantFamilies));
check(sameSet(usedInvariantIds, invariantIds), "every invariant family has at least one owning wave and no unknown family is used");
for (const invariant of INVARIANTS) {
    check(!Object.hasOwn(invariant, "command"), `${invariant.id} is a property declaration, not an executable command identity`);
    check(invariant.invariant.length >= 40 && invariant.oracle.length >= 40, `${invariant.id} has a substantive invariant and oracle`);
    check(invariant.bites.length >= 2 && invariant.bites.every((bite) => bite.length >= 15), `${invariant.id} has at least two discriminating mutation bites`);
    check(["device-free", "browser"].includes(invariant.kind), `${invariant.id} declares its evidence environment`);
}

// Independent cycle, maximal-ready-stratum, and transitive-reduction audit.
const remaining = new Set(waveIds);
const completed = new Set();
let stratum = 0;
while (remaining.size) {
    const ready = [...remaining].filter((id) => waveById.get(id).dependsOn.every((dependency) => completed.has(dependency))).sort();
    check(ready.length > 0, `DAG has a nonempty ready set at stratum ${stratum}`);
    if (!ready.length) break;
    const declared = WAVES.filter((wave) => wave.topologicalStratum === stratum).map((wave) => wave.id);
    check(sameSet(ready, declared), `stratum BI.S${String(stratum).padStart(2, "0")} is the maximal ready set`);
    for (const id of ready) { remaining.delete(id); completed.add(id); }
    stratum += 1;
}
check(completed.size === WAVES.length, "DAG is acyclic and covers every wave");

const edgeKeys = new Set(WAVES.flatMap((wave) => wave.dependsOn.map((dependency) => `${dependency}->${wave.id}`)));
const outgoing = new Map(WAVES.map((wave) => [wave.id, []]));
for (const key of edgeKeys) {
    const [from, to] = key.split("->");
    outgoing.get(from).push(to);
}
for (const key of edgeKeys) {
    const [from, target] = key.split("->");
    const stack = outgoing.get(from).filter((to) => `${from}->${to}` !== key);
    const seen = new Set();
    let redundant = false;
    while (stack.length) {
        const id = stack.pop();
        if (id === target) { redundant = true; break; }
        if (seen.has(id)) continue;
        seen.add(id);
        stack.push(...outgoing.get(id));
    }
    check(!redundant, `edge ${key} is necessary in the transitive reduction`);
}

const dag = json("dag.json");
const generatedWaves = json("waves.json");
check(generatedWaves.count === WAVES.length && generatedWaves.sourceBase === SOURCE_BASE && JSON.stringify(generatedWaves.waves) === JSON.stringify(WAVES), "generated waves.json exactly reproduces the canonical registry");
for (const wave of WAVES) {
    const rendered = readFileSync(join(ROOT, "waves", `${wave.id}.md`), "utf8");
    if (wave.id === "BI.W-P000") {
        check(/node scripts\/verify\.mjs --bootstrap-plan docs\/tranches\/BI\/FORMATION\/execution-bootstrap-plan\.seed\.json --receipt docs\/tranches\/BI\/BOOTSTRAP\.json --wave BI\.W-P000/.test(rendered) && !/--state auto --wave BI\.W-P000/.test(rendered), "P000 rendered command uses only the immutable one-shot bootstrap plan");
    } else {
        check(rendered.includes(`node scripts/verify.mjs --state auto --wave ${wave.id}`) && !/--bootstrap-plan|\.tranche\/BI\/cursor\.json/.test(rendered), `${wave.id} rendered command auto-recovers Git/receipt state and never uses bootstrap mode or a worktree cursor`);
    }
    check(/Orchestrator integration envelope/.test(rendered) && /never builder-lane leases/.test(rendered) && /BI-Receipt-SHA256/.test(rendered), `${wave.id} rendered packet exposes its exact orchestrator adjunct contract`);
}
check(dag.nodeCount === WAVES.length && dag.edgeCount === edgeKeys.size, "generated DAG counts match registry");
check(sameSet(dag.edges.map((edge) => `${edge.from}->${edge.to}`), edgeKeys), "generated DAG contains the exact reduced edge set");
check(dag.strata.length === stratum, "generated DAG stratum count matches independent Kahn pass");
for (const layer of dag.strata) {
    const flattened = layer.resourceSafeLaunchBatches.flat();
    check(sameSet(flattened, layer.waves) && flattened.length === layer.waves.length, `${layer.id} launch batches cover each ready wave exactly once`);
    for (const batch of layer.resourceSafeLaunchBatches) {
        check(batch.length >= 1 && batch.length <= 3, `${layer.id} batch ${batch.join(",")} respects the three-live-agent ceiling`);
        const locks = batch.flatMap((id) => executionLocks(waveById.get(id)));
        check(locks.length === new Set(locks).size, `${layer.id} batch ${batch.join(",")} has no semantic-lock or exact-path write collision`);
    }
}
for (const node of dag.nodes) {
    const wave = waveById.get(node.id);
    check(JSON.stringify(node.serializedIntegrationArtifacts) === JSON.stringify(wave.integrationArtifacts) && node.projectionMode === wave.projectionMode && sameSet(node.integrationRequires, wave.integrationRequires) && JSON.stringify(node.integrationPrerequisites) === JSON.stringify(wave.integrationPrerequisites), `${node.id} DAG node preserves integration adjunct and exact activation-predicate metadata`);
}
check(dag.criticalPath.waves.length === stratum, "critical path spans every measured dependency level");
for (let index = 1; index < dag.criticalPath.waves.length; index += 1) {
    check(edgeKeys.has(`${dag.criticalPath.waves[index - 1]}->${dag.criticalPath.waves[index]}`), "critical path is edge-contiguous");
}
const lastWaves = WAVES.filter((wave) => wave.topologicalStratum === stratum - 1);
check(lastWaves.every((wave) => !/tail|close|cut|release|final/i.test(`${wave.title} ${wave.formationFamily}`)), "terminal stratum emerges from substantive product/tool ownership rather than close ceremony");
check(lastWaves.every((wave) => wave.pi.kind === "browser" || (wave.pi.kind === "device-free" && wave.pi.reason.length >= 30)), "terminal position creates no special evidence floor; every last-stratum wave keeps its property-appropriate π disposition");
check(/implicit exclusive lease/.test(dag.lockPolicy), "DAG declares dynamic exact-path lease semantics");
for (const node of dag.nodes) check(sameSet(node.implicitWriteLeases, writePaths(waveById.get(node.id))), `${node.id} DAG row carries its exact implicit write leases`);

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
const expectedCollisionRows = [...writeOwnersByPath.entries()]
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
const collisionLedger = json("path-collision-ledger.json");
const expectedCollisionPairs = expectedCollisionRows.flatMap((row) => row.pairs);
check(collisionLedger.collisionPathCount === expectedCollisionRows.length && collisionLedger.collisionPairCount === expectedCollisionPairs.length, "path-collision ledger counts every shared write path and writer pair");
check(JSON.stringify(collisionLedger.rows) === JSON.stringify(expectedCollisionRows), "path-collision ledger exactly reproduces registry write ownership and serialization mode");
for (const row of expectedCollisionRows) {
    for (const pair of row.pairs.filter((item) => item.mode === "EXCLUSIVE_WRITE_LEASE_BATCH")) {
        const layer = dag.strata[waveById.get(pair.left).topologicalStratum];
        check(!layer.resourceSafeLaunchBatches.some((batch) => batch.includes(pair.left) && batch.includes(pair.right)), `${row.path} same-stratum writers ${pair.left}/${pair.right} occupy distinct launch batches`);
    }
}

const sourcePackage = JSON.parse(execFileSync("git", ["show", `${SOURCE_BASE}:package.json`], { cwd: REPO, encoding: "utf8" }));
const packageScriptLedger = json("package-script-dispositions.json");
const packageScriptKeys = Object.keys(sourcePackage.scripts);
const packageRowsByKey = new Map(packageScriptLedger.rows.map((row) => [row.sourceKey, row]));
check(packageScriptLedger.rows.length === packageScriptKeys.length && packageRowsByKey.size === packageScriptKeys.length && sameSet(packageRowsByKey.keys(), packageScriptKeys), "all 435 source package scripts have exactly one executable-identity disposition");
for (const key of packageScriptKeys) {
    const row = packageRowsByKey.get(key);
    check(row.sourceCommand === sourcePackage.scripts[key] && row.sourceCommandSha256 === sha(sourcePackage.scripts[key]), `${key} package-script row binds the exact frozen source command`);
    check(row.registeredGateRow === LEGACY_GATES.some((gate) => gate.id === key), `${key} package-script row records registry membership exactly`);
    check(["DELETE_EXECUTABLE_ALIAS", "RETAIN_ORDINARY_TASK_NO_GATE_AUTHORITY", "RETAIN_ORDINARY_TASK_REWRITE_GATE_FREE"].includes(row.disposition) && row.sameSpellingGateIdentitySuccessor === false && row.acceptanceCredit === "NONE_BY_ALIAS_EXISTENCE_OR_EXIT_ALONE", `${key} has one legal non-gate disposition and zero alias-only acceptance credit`);
}
const retainedPackageKeys = packageScriptLedger.rows.filter((row) => row.disposition.startsWith("RETAIN_ORDINARY_TASK")).map((row) => row.sourceKey);
check(sameSet(retainedPackageKeys, ["dev", "build", "build:watch", "prepare", "typecheck", "test", "iter-check", "iter-build", "iter-test", "iter-test-watch", "emit-types", "gen:structure", "iter", "demo:serve", "demo:dist:build", "demo:dist:serve", "profile:bundle", "profile:aurora", "release", "prepublishOnly"]), "only twenty explicitly justified ordinary developer/lifecycle/demo/diagnostic tasks survive P000");
check(packageScriptLedger.rows.filter((row) => /^proof(?::|$)/.test(row.sourceKey) || /^gates?(?::|$)/.test(row.sourceKey) || ["profile:budget", "audit:stash", "verify-export-types"].includes(row.sourceKey)).every((row) => row.disposition === "DELETE_EXECUTABLE_ALIAS" && row.postP000Command === null), "every proof/gate alias, escaped aggregate, budget alias, audit alias, and standalone export-proof alias is deleted");
check(packageScriptLedger.rows.filter((row) => row.disposition.startsWith("RETAIN_ORDINARY_TASK")).every((row) => !/(?:npm run )?(?:proof|gates?)(?::|\b)|scripts\/(?:proof-|gates(?:\.|\/))/.test(row.postP000Command)), "retained package tasks contain no proof/gate alias or deleted proof/gate script reference");
check(packageRowsByKey.get("prepublishOnly").postP000Command === "npm run build && npm test && node scripts/verify.mjs --state auto --profile release --require-terminal" && packageRowsByKey.get("release").canonicalOwner === "BI.W-P002", "publish lifecycle auto-recovers Git/receipt authority and requires the one terminal release projection");
const sourceProofFiles = [...baseTree.keys()].filter((path) => /^scripts\/proof-/.test(path));
const sourceGateInfrastructureFiles = [...baseTree.keys()].filter((path) => /^scripts\/(?:gates(?:\.|\/)|gate-)/.test(path));
check(sourceProofFiles.length === 383 && sameSet(sourceProofFiles, [...bootstrapDeletes].filter((path) => /^scripts\/proof-/.test(path))), "P000 deletes all 383 source proof implementation files regardless of extension");
check(sourceGateInfrastructureFiles.length === 4 && sameSet(sourceGateInfrastructureFiles, [...bootstrapDeletes].filter((path) => /^scripts\/(?:gates(?:\.|\/)|gate-)/.test(path))), "P000 deletes all four source gate registry/runner infrastructure files");
const mandatoryP000CommandSurfaces = [
    ".githooks/commit-msg",
    "scripts/install-hooks.mjs",
    "scripts/release.sh",
    "package.json",
    ".github/workflows/ci.yml",
    ".github/workflows/release.yml",
];
check(mandatoryP000CommandSurfaces.every((path) => bootstrapWave.subjects.some((row) => row.path === path && row.action === "modify")), "P000 explicitly rewrites hook, installer, release, package, CI, and tag surfaces rather than conditionally verifying stale entry points");
const activeDeletedReferenceSurfaces = [
    ".githooks/commit-msg",
    "scripts/release.sh",
    "package.json",
    ".github/workflows/ci.yml",
    ".github/workflows/release.yml",
];
for (const path of activeDeletedReferenceSurfaces) {
    const bytes = execFileSync("git", ["show", `${SOURCE_BASE}:${path}`], { cwd: REPO, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
    check(/scripts\/(?:proof-|gates(?:\.|\/))|(?:npm run )?(?:proof|gates?)(?::|\b)/.test(bytes), `source active surface ${path} actually references a P000-deleted command identity`);
}
check(sameSet(activeDeletedReferenceSurfaces, mandatoryP000CommandSurfaces.filter((path) => path !== "scripts/install-hooks.mjs")), "all source active deleted-command surfaces are explicit P000 writers and the installer is enrolled as their present-tense owner");
check(JSON.stringify(packageScriptLedger.counts) === JSON.stringify({
    sourcePackageScripts: 435,
    registeredGateRows: 403,
    deleteExecutableAliases: 415,
    retainOrdinaryTasks: 20,
    registeredNamesDeleted: 400,
    sameSpellingOrdinaryTasksRetained: 3,
    executableProofOrGateAliasesOutsideRegistryDeleted: 15,
    proofScriptFilesDeleted: 383,
    gateRegistryInfrastructureFilesDeleted: 4,
    totalGateProofInfrastructureFilesDeleted: 387,
}), "package-script abrogation counts derive to 435 source aliases, 415 deletions, 20 ordinary tasks, and 387 total gate/proof infrastructure-file deletions");
const bootstrapPlan = json("execution-bootstrap-plan.seed.json");
check(bootstrapPlan.mode === "P000_BOOTSTRAP_ONLY" && bootstrapPlan.waveId === "BI.W-P000" && bootstrapPlan.sourceBase === SOURCE_BASE && bootstrapPlan.authority === "IMMUTABLE_FORMATION_P000_PLAN_ONLY", "bootstrap plan is an immutable P000-only source-bound exception");
check(sameSet(bootstrapPlan.allowedInvariantFamilies, bootstrapWave.invariantFamilies) && bootstrapPlan.piPolicy === "DEVICE_FREE_FIXTURES_ONLY__NO_CURRENT_PRODUCT_VISUAL_CLAIM", "bootstrap plan admits only P000's four mechanism families and no product π credit");
check(sameSet(bootstrapPlan.infrastructureDeletionPaths, [...bootstrapDeletes]) && bootstrapPlan.infrastructureDeletionPaths.length === 387, "bootstrap plan exactly derives all 387 proof/gate infrastructure deletions");
check(sameSet(bootstrapPlan.packageAliasDeletions, packageScriptLedger.rows.filter((row) => row.disposition === "DELETE_EXECUTABLE_ALIAS").map((row) => row.sourceKey)) && bootstrapPlan.packageAliasDeletions.length === 415, "bootstrap plan exactly derives all 415 package alias deletions");
check(sameSet(bootstrapPlan.activeCommandSurfaces.map((row) => row.path), mandatoryP000CommandSurfaces) && bootstrapPlan.activeCommandSurfaces.every((row) => !/(?:proof|gates?)(?::|\b)|scripts\/(?:proof-|gates(?:\.|\/))/.test(`${row.requiredOwner} ${row.requiredArgv}`)), "bootstrap plan rewrites all six active command surfaces around the sole verifier with no deleted path");
const bootstrapHookSurface = bootstrapPlan.activeCommandSurfaces.find((row) => row.path === ".githooks/commit-msg");
check(bootstrapHookSurface.bootstrapFallback === "exact trailer BI-Wave: BI.W-P000 plus staged docs/tranches/BI/BOOTSTRAP.json only", "P000 hook fallback spells the exact canonical BI-Wave trailer and staged receipt path");
check(bootstrapPlan.receiptContract.path === bootstrapWave.receiptPath && bootstrapPlan.receiptContract.commitLocator === "EXTERNAL_FIRST_PARENT_AND_TRAILER_RESOLUTION" && sameSet(bootstrapPlan.receiptContract.forbiddenLiteralFields, ["commitSha", "treeSha", "containingCommit", "containingTree", "receiptSha256"]) && bootstrapPlan.receiptContract.payloadDigestPolicy === RECEIPT_PAYLOAD_DIGEST_POLICY && sameSet(bootstrapPlan.receiptContract.payloadDigestExcludes, ["docs/tranches/BI/BOOTSTRAP.json", "docs/tranches/BI/RELEASE-ATTESTATION.json", "docs/tranches/BI/FINAL.md"]), "bootstrap receipt forbids literal receipt/commit/tree self-reference and excludes every integration adjunct from the payload digest");
check(JSON.stringify(bootstrapPlan.receiptContract.intendedTrailerContract) === JSON.stringify(INTENDED_TRAILER_CONTRACT) && /never embeds BI-Receipt-SHA256, BI-Attestation-SHA256, or BI-FINAL-SHA256 values/.test(cursorWave.scope.join(" ")) && /hook computes that from the final staged BOOTSTRAP bytes/.test(bootstrapWave.scope.join(" ")), "P000 and P001 share one explicit acyclic intended-trailer contract with every integration-artifact digest derived only after its serialization");
check(/P001 resolves integrationParent/.test(bootstrapPlan.receiptContract.recovery) && /BI-Wave/.test(bootstrapPlan.receiptContract.recovery) && /BI-Receipt-SHA256/.test(bootstrapPlan.receiptContract.recovery), "bootstrap receipt has one externally resolvable parent, payload, and trailer recovery tuple");
const packageScriptMd = readFileSync(join(ROOT, "PACKAGE-SCRIPT-ABROGATION.md"), "utf8");
check(/403-row gate manifest was not the full executable surface/.test(packageScriptMd) && /deletes 415 aliases/.test(packageScriptMd) && /fifteen executable proof\/gate aliases the 403-row registry omitted|15 proof\/gate aggregates/.test(packageScriptMd), "package-script narrative exposes the registry blind spot and complete atomic cut");

const legacy = json("legacy-gate-dispositions.json");
check(legacy.rows.length === LEGACY_GATES.length && LEGACY_GATES.length === 403, "all 403 historical gate rows have a disposition");
check(new Set(legacy.rows.map((row) => row.legacyId)).size === 403, "historical gate dispositions are one-to-one by ID");
check(legacy.counts.oracleResearchDonors === 40 && legacy.counts.foldedToSharedFamilyInvariants === 362 && legacy.counts.rejectedWithoutSemanticSuccessor === 1 && legacy.counts.withoutGateIdentitySuccessor === 403 && legacy.counts.registryIdentitiesAbrogated === 403 && legacy.counts.sameSpellingOrdinaryTasksRetained === 3 && legacy.counts.executableInvariantIdentities === 0 && legacy.counts.registryIdentityAbrogationPercent === 100 && legacy.counts.noOneToOneGateIdentitySuccessorPercent === 100 && legacy.counts.legacyNamedCasesRetained === 0 && legacy.counts.sharedCanonicalInvariantBindings === INVARIANTS.length, "gate abrogation removes 100% of registry identity, gives every row no gate-identity successor, explicitly carves only three same-spelling ordinary tasks, and retains zero executable invariant/case identities");
const legacySourceById = new Map(LEGACY_GATES.map((row) => [row.id, row]));
const explicitDecisionIds = Object.keys(EXPLICIT_LEGACY_DECISIONS);
check(explicitDecisionIds.length === 403 && sameSet(explicitDecisionIds, [...legacySourceById.keys()]), "the authored registry decides every one of the 403 source gate identities with no fallback or extra key");
const legacyRegistrySource = readFileSync(join(ROOT, "legacy-gates.registry.mjs"), "utf8");
const explicitBlock = legacyRegistrySource.slice(legacyRegistrySource.indexOf("export const EXPLICIT_LEGACY_DECISIONS"), legacyRegistrySource.indexOf("/** Predicates that must be removed", legacyRegistrySource.indexOf("export const EXPLICIT_LEGACY_DECISIONS")));
const explicitSourceIds = [...explicitBlock.matchAll(/^\s{4}(?:"([^"]+)"|([A-Za-z][A-Za-z0-9:_-]*)):\s*explicit\(/gm)].map((match) => match[1] ?? match[2]);
check(explicitSourceIds.length === 403 && new Set(explicitSourceIds).size === 403 && sameSet(explicitSourceIds, explicitDecisionIds), "the explicit decision source contains 403 unique authored keys and cannot hide a duplicate object key");
check(!legacyRegistrySource.includes("LEGACY_ID_RULES") && !legacyRegistrySource.includes("identity-only-semantic-rule"), "legacy semantic ownership has no lexical rule table or classifier fallback");
for (const row of legacy.rows) {
    const source = legacySourceById.get(row.legacyId);
    check(Boolean(source) && row.legacyCommand === source.cmd && sameSet(row.legacyModes, source.tags), `${row.legacyId} binds the exact legacy command and modes`);
    check(row.legacyNote === (source.note ?? null) && row.legacyNoteSha256 === sha(source.note ?? ""), `${row.legacyId} binds the complete legacy note by digest`);
    check(row.commandAliasRetained === false && row.sameSpellingOrdinaryTaskRetained === ["typecheck", "test", "build"].includes(row.legacyId) && sameSet(row.verificationOwnerWaves, ["BI.W-P000", "BI.W-P014"]), `${row.legacyId} abolishes gate-alias status, records any ordinary same-spelling task explicitly, and names the two exact verification-engine owner waves`);
    check(row.canonicalFamilies.every((family) => invariantIds.has(family)) && row.canonicalFamily === (row.canonicalFamilies[0] ?? null), `${row.legacyId} names only canonical property owners and one exact primary`);
    check(row.canonicalInvariantBindings.length === row.canonicalFamilies.length && row.canonicalInvariantBindings.every((binding, index) => binding === `${row.canonicalFamilies[index]}::invariant`) && row.legacyNamedCasesRetained.length === 0, `${row.legacyId} binds shared family invariants and retains no legacy-named miniature case`);
    const sourceDecision = classifyLegacyGateIdentity(row.legacyId);
    if (row.disposition === "ABROGATE_IDENTITY_DONATE_ORACLE_RESEARCH") {
        check(row.canonicalFamilies.length === 1 && row.mappingBasis === "explicit-family-seed" && sameSet(row.canonicalFamilies, sourceDecision.families), `${row.legacyId} donates exact authored oracle research without retaining a command successor`);
    } else if (SUPERFLUOUS_LEGACY_GATES[row.legacyId]) {
        check(row.disposition === "ABROGATE_IDENTITY_REJECT_NO_SUCCESSOR" && row.canonicalFamilies.length === 0 && row.rejection.reason === SUPERFLUOUS_LEGACY_GATES[row.legacyId].reason, `${row.legacyId} is explicitly rejected with no semantic successor`);
    } else {
        check(sameSet(row.canonicalFamilies, sourceDecision.families) && row.mappingBasis === sourceDecision.basis, `${row.legacyId} reproduces its exhaustive authored command-level decision`);
        check(row.propertyContract.includes(`sha256:${row.legacyNoteSha256}`) && row.canonicalInvariantBindings.every((binding) => row.propertyContract.includes(binding)) && /DO NOT materialize a legacy\//.test(row.propertyContract), `${row.legacyId} property contract binds its old note to shared invariants and forbids a legacy-named case`);
    }
    if (LEGACY_PREDICATE_REVERSALS[row.legacyId]) {
        check(JSON.stringify(row.reversal) === JSON.stringify(LEGACY_PREDICATE_REVERSALS[row.legacyId]) && row.propertyContract.includes(row.reversal.replacement), `${row.legacyId} preserves its required predicate reversal/tightening`);
    } else {
        check(row.reversal === null, `${row.legacyId} has no undeclared predicate reversal`);
    }
}
check(Object.keys(EXPLICIT_LEGACY_DECISIONS).every((id) => legacySourceById.has(id)), "every explicit legacy decision names a real source-base gate identity");
check(Object.keys(LEGACY_PREDICATE_REVERSALS).every((id) => legacySourceById.has(id)), "every predicate reversal names a real source-base gate identity");
check(Object.keys(SUPERFLUOUS_LEGACY_GATES).every((id) => legacySourceById.has(id)), "every superfluous rejection names a real source-base gate identity");
for (const family of invariantIds) check(legacy.rows.filter((row) => row.canonicalFamilies.includes(family) && row.disposition === "ABROGATE_IDENTITY_DONATE_ORACLE_RESEARCH").length === 1, `${family} has exactly one historical oracle-research donor while every command identity remains abrogated`);
const legacyById = new Map(legacy.rows.map((row) => [row.legacyId, row]));
check(sameSet(legacyById.get("proof:webgpu-everywhere").canonicalFamilies, ["procedural.lifecycle", "procedural.renderer-parity", "architecture.clean-break"]) && legacyById.get("proof:webgpu-everywhere").reversal.kind === "REVERSE_FALSE_ORACLE", "WebGPU legacy semantics no longer misroute to build/package and reverse silent internal-failure fallback");
check(sameSet(legacyById.get("proof:adaptive-observer").canonicalFamilies, ["design.material-hierarchy", "design.contrast", "performance.resource-ownership"]) && legacyById.get("proof:adaptive-observer").reversal.kind === "TIGHTEN_COMPOSED_TRUTH", "adaptive sampling no longer misroutes to prose and requires composited truth");
check(sameSet(legacyById.get("proof:dock-crossfade").canonicalFamilies, ["behavior.dock", "motion.transition-continuity", "behavior.focus-escape"]) && legacyById.get("proof:dock-crossfade").reversal.kind === "TIGHTEN_COMPOSED_TRUTH", "Dock crossfade no longer misroutes to DAG and requires composed accessibility truth");
check(legacyById.get("proof:demo").reversal.kind === "REVERSE_FALSE_ORACLE" && /semantic not-found/.test(legacyById.get("proof:demo").reversal.replacement), "demo compatibility redirects and catch-all-only 404 proof are explicitly reversed");
check(legacyById.get("proof:no-masking-fallback").reversal.kind === "TIGHTEN_COMPOSED_TRUTH" && /no continued-success geometry/.test(legacyById.get("proof:no-masking-fallback").reversal.replacement), "no-masking fold rejects constant-valued mounted-token substitution");
check(legacyById.get("proof:dock-gate-roster").reversal.kind === "DELETE_EXACT_ROSTER_COUNT" && /no exact script-count/.test(legacyById.get("proof:dock-gate-roster").retainedFocus), "Dock gate consolidation deletes exact roster/count success criteria");
check(legacyById.get("proof:motion-suite").reversal.kind === "DELETE_DISTRIBUTION_MIRROR" && /upstream export growth/.test(legacyById.get("proof:motion-suite").reversal.replacement), "motion-suite fold deletes the downstream root-barrel/callable mirror rather than updating its stale roster");
check(legacyById.get("proof:motion2").reversal.kind === "DELETE_FOREIGN_DEMO_PARITY" && legacyById.get("proof:motion-demo").reversal.kind === "DELETE_FOREIGN_DEMO_PARITY" && /never creates a Glass parity contract/.test(legacyById.get("proof:motion2").reversal.replacement), "motion demo folds delete foreign-taxonomy parity while retaining owned live semantics");
check(legacyById.get("proof:motion-composables-consumer").reversal.kind === "REJECT_TEST_AS_CONSUMER" && /tests, types, barrels, docs, future asks, and file existence have zero consumer-demand credit/.test(legacyById.get("proof:motion-composables-consumer").reversal.replacement), "motion consumer fold rejects test/path laundering as demand");
check(legacyById.get("proof:motion-presets").reversal.kind === "RETIRE_PROSE_CONSUMER_SUBSTRATE" && /consumerless convergence alias/.test(legacyById.get("proof:motion-presets").reversal.replacement), "motion-presets fold retires future-prose-supported substrate instead of preserving it ahead of demand");
check(legacyById.get("proof:animation-coherence").reversal.kind === "REPLACE_SOURCE_ROSTER_WITH_SEMANTIC_DISCOVERY" && /aliases never count as demand/.test(legacyById.get("proof:animation-coherence").reversal.replacement), "animation-coherence fold removes static rosters, alias self-credit, and path exemptions");
check(legacyById.get("proof:spring-tokens-synced").reversal.kind === "DELETE_DUPLICATED_TASTE_ORACLE" && /never a duplicated taste literal or exact vocabulary count/.test(legacyById.get("proof:spring-tokens-synced").reversal.replacement), "spring synchronization fold derives from one owner without stale taste literals or count locks");
check(legacyById.get("proof:easing-primitive").reversal.kind === "REPLACE_FOSSILIZED_PATH_ORACLE" && /packed \/easing export/.test(legacyById.get("proof:easing-primitive").reversal.replacement), "easing fold verifies the packed owned boundary rather than a vanished internal barrel");
check(legacyById.get("proof:demo-affordances").reversal.kind === "REPLACE_FIXED_ENROLLMENT_WITH_SEMANTIC_DISCOVERY" && /Component moves and re-homes preserve enrollment automatically/.test(legacyById.get("proof:demo-affordances").reversal.replacement), "demo-affordance fold replaces the stale path roster with current semantic control discovery");
check(legacyById.get("proof:a11y").reversal.kind === "REPLACE_FINITE_ARM_ROSTER_WITH_COMPOSED_CONTROL_DISCOVERY" && /host image role cannot launder pointer-only child controls/.test(legacyById.get("proof:a11y").reversal.replacement), "accessibility fold replaces finite source arms with composed operable-descendant discovery");
check(legacyById.get("proof:no-layout-animation").reversal.kind === "TIGHTEN_CHANNEL_CLASSIFICATION" && /classify final channels as layout\/paint\/composite/.test(legacyById.get("proof:no-layout-animation").reversal.replacement), "layout-animation fold retains the property through sink/trace classification rather than a compositor-name whitelist");
const legacyAbrogationMd = readFileSync(join(ROOT, "LEGACY-GATE-ABROGATION.md"), "utf8");
check(/formation archaeology ledger, not an executable roster/i.test(legacyAbrogationMd) && /typecheck`, `test`, and `build`[\s\S]*ordinary developer commands outside any registry/i.test(legacyAbrogationMd) && /All proof\/gate aliases, proof scripts, and `legacy\/<gate-id>` cases disappear/i.test(legacyAbrogationMd), "legacy abrogation ledger denies executable-roster/hidden-case authority while honestly preserving three ordinary task spellings");
for (const row of legacy.rows) check(legacyAbrogationMd.includes(`| ${row.legacyId} | ${row.disposition} |`) && legacyAbrogationMd.includes(row.legacyNoteSha256) && legacyAbrogationMd.includes(row.retainedFocus), `${row.legacyId} appears in the human abrogation ledger with exact disposition, digest, and focus`);

const gateMechanics = json("gate-mechanics-census.json");
check(gateMechanics.schemaVersion === "1.0.0" && gateMechanics.sourceBase === SOURCE_BASE && gateMechanics.generatedAt === "2026-07-14" && gateMechanics.status === "FORMATION_RESEARCH_ONLY" && /NEVER_PRODUCT_ACCEPTANCE/.test(gateMechanics.authority), "gate mechanics census binds schema, source base, date, and a non-normative research-only authority boundary");
check(gateMechanics.rows.length === 403 && gateMechanics.counts.registryRows === 403 && gateMechanics.counts.uniqueCommandKeys === 403 && gateMechanics.counts.uniqueReferencedSourcePrograms === 395, "gate mechanics census covers all 403 unique commands and their 395 referenced source programs");
check(JSON.stringify(gateMechanics.counts.commandKinds) === JSON.stringify({ DIRECT_TYPECHECK: 1, DIRECT_VITEST: 8, BUILD_AGGREGATE: 1, NODE_DIAGNOSTIC: 4, BESPOKE_PROOF_PROGRAM: 387, SHELL_PROGRAM: 1, LEGACY_GATE_RUNNER: 1 }), "gate mechanics census exposes the 387 bespoke proof programs and every non-proof command shape without aliasing them into successors");
check(JSON.stringify(gateMechanics.counts.tagMemberships) === JSON.stringify({ ci: 351, local: 375, release: 126, sibling: 1 }), "gate mechanics census reproduces every source registry mode membership");
check(gateMechanics.counts.browserPropertyRows === 297 && gateMechanics.counts.directBrowserInvocationRows === 22 && gateMechanics.counts.browserPropertyRowsWithoutDirectBrowserInvocation === 277, "gate mechanics census exposes the browser-evidence gap: 297 rows donate browser properties while 277 direct commands invoke no browser runner");
check(gateMechanics.counts.sourceReadRows === 380 && gateMechanics.counts.filePresenceRows === 334 && gateMechanics.counts.lexicalPredicateRows === 374 && gateMechanics.counts.fixedEnrollmentCollectionRows === 229 && gateMechanics.counts.fixedCardinalityRows === 72 && gateMechanics.counts.markdownReferenceRows === 158 && gateMechanics.counts.selfTestRows === 237 && gateMechanics.counts.perCommandArtifactRows === 365 && gateMechanics.counts.rowsWithMechanicSignals === 400, "gate mechanics census quantifies source/file/lexical/roster/cardinality/prose/self-test/artifact accretion across the whole fleet");
const mechanicsById = new Map(gateMechanics.rows.map((row) => [row.legacyId, row]));
check(mechanicsById.size === 403 && sameSet(mechanicsById.keys(), legacySourceById.keys()), "gate mechanics rows are unique and exhaustive over the source registry");
const allowedMechanicSignals = new Set(["ONE_COMMAND_PER_HISTORICAL_PROPERTY", "STATIC_SOURCE_SHAPE_EXPOSURE", "FILE_PRESENCE_EXPOSURE", "FIXED_ENROLLMENT_COLLECTION_EXPOSURE", "FIXED_CARDINALITY_EXPOSURE", "PROSE_RECEIPT_EXPOSURE", "SELF_TEST_ACCUMULATION", "PER_COMMAND_ARTIFACT_CEREMONY", "BROWSER_PROPERTY_NOT_DIRECTLY_EXECUTED", "SKIP_OR_GRACE_BRANCH_EXPOSURE"]);
for (const row of gateMechanics.rows) {
    const gate = legacySourceById.get(row.legacyId);
    const disposition = legacyById.get(row.legacyId);
    check(row.commandKey === gate.cmd && row.command === sourcePackage.scripts[gate.cmd] && row.commandSha256 === sha(row.command) && sameSet(row.tags, gate.tags), `${row.legacyId} mechanics row binds its exact package command and registry tags`);
    check(row.disposition === disposition.disposition && row.commandAliasRetained === false && row.sameSpellingOrdinaryTaskRetained === disposition.sameSpellingOrdinaryTaskRetained && sameSet(row.canonicalFamilies, disposition.canonicalFamilies), `${row.legacyId} mechanics row reproduces its abrogation and donated property owners`);
    check(sameSet(row.propertyKinds, uniq(row.canonicalFamilies.map((id) => invariantById.get(id).kind))), `${row.legacyId} mechanics row derives browser/device-free kinds from canonical properties`);
    check(row.sourcePrograms.every((item) => baseTree.get(item.path)?.oid === item.sourceBaseBlob && item.sha256 === sha(execFileSync("git", ["show", `${SOURCE_BASE}:${item.path}`], { cwd: REPO })) && item.bytes === execFileSync("git", ["show", `${SOURCE_BASE}:${item.path}`], { cwd: REPO }).length), `${row.legacyId} mechanics source programs bind exact source-base blobs, bytes, and hashes`);
    check(row.mechanicSignals.every((signal) => allowedMechanicSignals.has(signal)) && (row.mechanicSignals.includes("ONE_COMMAND_PER_HISTORICAL_PROPERTY") === (row.commandKind === "BESPOKE_PROOF_PROGRAM")) && (row.mechanicSignals.includes("BROWSER_PROPERTY_NOT_DIRECTLY_EXECUTED") === (row.propertyKinds.includes("browser") && !row.features.invokesBrowserRunner)), `${row.legacyId} mechanics signals are legal and derived from command/property features rather than authored verdicts`);
}
check(sameSet(gateMechanics.rows.filter((row) => row.mechanicSignals.length === 0).map((row) => row.legacyId), ["typecheck", "test", "build"]), "only the three ordinary same-spelling tasks have no lexical contrivance exposure signal; their gate identities remain abrogated anyway");
check(mechanicsById.get("proof:demo-affordances").mechanicSignals.includes("FIXED_ENROLLMENT_COLLECTION_EXPOSURE") && mechanicsById.get("proof:demo-affordances").mechanicSignals.includes("STATIC_SOURCE_SHAPE_EXPOSURE") && mechanicsById.get("proof:a11y").mechanicSignals.includes("STATIC_SOURCE_SHAPE_EXPOSURE") && mechanicsById.get("proof:a11y").mechanicSignals.includes("SELF_TEST_ACCUMULATION") && mechanicsById.get("proof:motion-one-clock").features.declaredCollections.includes("OFF_SPINE_ALLOWLIST"), "exhaustive mechanics census independently locates the fixed-enrollment, finite-source-arm, and allowlist exposures diagnosed in live counterexamples");
const gateMechanicsMd = readFileSync(join(ROOT, "GATE-MECHANICS-CENSUS.md"), "utf8");
check(/accretion is structural, not anecdotal/.test(gateMechanicsMd) && /exposure counts, not a claim that every use is wrong/.test(gateMechanicsMd) && gateMechanics.rows.every((row) => gateMechanicsMd.includes(`| ${row.legacyId} |`)), "gate mechanics narrative exposes the structural crux, denies automatic verdict credit, and lists every legacy identity");

const familyAudit = json("invariant-family-audit.json");
check(familyAudit.schemaVersion === 1 && familyAudit.sourceBase === SOURCE_BASE && familyAudit.status === "FORMATION_DESIGN_AUTHORITY", "invariant-family audit binds schema, source base, and formation-only authority");
check(familyAudit.familyCount === INVARIANTS.length && familyAudit.rows.length === INVARIANTS.length && familyAudit.normativeFamilyCount === false && familyAudit.executableFamilyIdentities === 0 && familyAudit.legacyCommandCount === 403 && familyAudit.legacyCommandIdentitiesRetained === 0 && familyAudit.legacyNamedCasesRetained === 0, "invariant-family audit starts from wholesale 403-identity abrogation and retains only a non-normative, non-executable shared property taxonomy");
const expectedLifecycleCounts = INVARIANT_FAMILY_AUDIT.reduce((counts, row) => ({ ...counts, [row.lifecycle]: (counts[row.lifecycle] ?? 0) + 1 }), {});
check(JSON.stringify(familyAudit.lifecycleCounts) === JSON.stringify(expectedLifecycleCounts), "invariant-family lifecycle totals derive from authored rows rather than a frozen target count");
check(INVARIANT_FAMILY_AUDIT.every((row) => ["CONTINUOUS_STATIC", "FORMATION_EXECUTION_CONTROL", "CUT_CONTROL", "CONTINUOUS_NATIVE", "CUT_COORDINATION_CONTROL"].includes(row.lifecycle)), "every invariant family uses a declared lifecycle class");
const authoredFamilyAuditById = new Map(INVARIANT_FAMILY_AUDIT.map((row) => [row.id, row]));
check(authoredFamilyAuditById.size === INVARIANT_FAMILY_AUDIT.length && sameSet([...authoredFamilyAuditById.keys()], [...invariantIds]), "every canonical property family has one unique authored survival judgment");
for (const row of familyAudit.rows) {
    const authored = authoredFamilyAuditById.get(row.id);
    const invariant = invariantById.get(row.id);
    check(Boolean(authored) && Boolean(invariant) && Object.entries(authored).every(([key, value]) => JSON.stringify(row[key]) === JSON.stringify(value)), `${row.id} reproduces its authored family-survival judgment`);
    check(row.decision === "SURVIVE_AS_SHARED_INVARIANT_FAMILY" && row.whyIndependent.length >= 120 && row.antiContrivance.length >= 120 && row.redMutation.length >= 60 && row.authority.length >= 60, `${row.id} earns survival through substantive independence, anti-contrivance, RED, and authority clauses`);
    check(/^Never /.test(row.antiContrivance.split(". ").at(-1)) || /Never /.test(row.antiContrivance), `${row.id} states an explicit forbidden contrivance`);
    check(row.kind === invariant.kind && sameSet(row.modes, invariant.modes) && row.executableIdentity === false && !Object.hasOwn(row, "command") && row.invariant === invariant.invariant, `${row.id} audit binds the exact non-executable property definition`);
    check(row.legacyAuditInputCount === legacy.rows.filter((legacyRow) => legacyRow.canonicalFamilies.includes(row.id)).length && row.legacyAuditInputCount > 0, `${row.id} counts all and only its bound legacy audit inputs`);
}
check(familyAudit.rows.filter((row) => row.lifecycle === "FORMATION_EXECUTION_CONTROL").every((row) => /dormant/i.test(row.authority) || /active perfected-BI execution only/i.test(row.authority)), "formation controls explicitly lose authority outside an active cursor");
check(familyAudit.rows.filter((row) => row.lifecycle === "CONTINUOUS_NATIVE").every((row) => row.kind === "browser"), "every continuous-native survivor is a real browser family");
const familyAuditMd = readFileSync(join(ROOT, "INVARIANT-FAMILY-AUDIT.md"), "utf8");
check(/All 403 historical gate identities are abrogated/.test(familyAuditMd) && /zero legacy-named cases/.test(familyAuditMd) && /count itself is non-normative/.test(familyAuditMd) && familyAudit.rows.every((row) => familyAuditMd.includes(`| ${row.id} |`) && familyAuditMd.includes(row.redMutation)), "invariant-family narrative exposes wholesale abrogation, non-normative count, and every authored survival judgment");

const components = json("component-dispositions.json");
check(components.rows.length === COMPONENT_CONCEPTS.length + SPECIAL_COMPONENT_CONCEPTS.length && components.rows.length === 73, "all 73 canonical and facility-scale component concepts have dispositions");
check(new Set(components.rows.map((row) => row.conceptId)).size === components.rows.length, "component concept IDs are unique");
check(components.rows.every((row) => row.canonicalWaves.length > 0 && row.canonicalWaves.every((id) => waveIds.has(id)) && row.aliasesOrShimsAllowed === false && row.shadcnDisposition === "ABROGATE_STYLE_AND_STRUCTURE_AUTHORITY"), "every component row has exact owners, owns shadcn abrogation, and forbids aliases/shims");
const currentComponentRoots = uniq([...baseTree.keys()].flatMap((path) => {
    const match = /^src\/components\/(ui|custom)\/([^/]+)\//.exec(path);
    return match && match[2] !== "_shared" ? [`${match[1]}/${match[2]}`] : [];
}));
const dispositionRoots = components.rows.flatMap((row) => row.currentMembers.map((member) => `${member.tier}/${member.name}`));
check(currentComponentRoots.length === 78 && sameSet(currentComponentRoots, dispositionRoots) && new Set(dispositionRoots).size === dispositionRoots.length, "all 78 on-disk component family directories map exactly once to a concept disposition");
check(components.rows.every((row) => row.actualCurrentDemoPaths.length > 0 || row.decision === "rehome-private"), "every retained/reworked component concept names at least one actual current demo witness");
check(components.rows.flatMap((row) => row.actualCurrentDemoPaths).every((path) => baseTree.has(path)), "every component demo witness exists at the bound source base");
check(components.rows.filter((row) => row.decision !== "delete").every((row) => row.visualSpecPaths.length > 0), "every surviving, folded, renamed, private, or re-homed component concept owns browser evidence; only actual retirement may omit an eponymous visual spec");
for (const row of components.rows.filter((item) => item.decision === "delete")) {
    const owner = waveById.get(row.canonicalWaves[0]);
    check(/ retirement — /.test(owner.title) && !/apotheosis/i.test(owner.title), `${row.conceptId} deletion is named as retirement rather than contrived apotheosis`);
    check(owner.pi.kind === "device-free" && /paints no product pixels|creates no deleted-concept scenario/i.test(owner.scope.join(" ")) && /creates no deleted-concept scenario/i.test(owner.pi.reason), `${row.conceptId} deletion is honestly device-free and creates no eponymous visual scenario`);
    check(!owner.subjects.some((subject) => subject.path === `tests/components/${row.conceptId}.contract.test.ts` || subject.path === `tests-visual/${row.conceptId}.contract.spec.ts`), `${row.conceptId} retirement does not mint replacement contract tests for an absent concept`);
    check(owner.invariantFamilies.every((family) => invariantById.get(family).kind === "device-free"), `${row.conceptId} retirement cites only device-free structural properties`);
}
check(waveById.get("BI.W-P085").subjects.find((row) => row.path === "tests-visual/border-progress.spec.ts")?.action === "delete" && waveById.get("BI.W-P085").subjects.find((row) => row.path === "tests/components/custom/border-progress/spectrum-walk.test.ts")?.action === "delete", "BorderProgress retirement deletes its eponymous visual/unit apparatus rather than maintaining a ghost gate");
for (const meta of COMPONENT_CONCEPTS.filter((item) => ["private", "rehome"].includes(item.decision))) {
    const row = components.rows.find((item) => item.conceptId === meta.name);
    const owner = waveById.get(row.canonicalWaves[0]);
    check(meta.ownerContext?.length >= 40 && meta.ownerScenarioPrefix?.length >= 8 && owner.scope.join(" ").includes(meta.ownerContext), `${meta.name} private/re-home decision names the actual owner composition rather than a public specimen fiction`);
    check(!owner.subjects.some((subject) => subject.path === `tests/components/${meta.name}.contract.test.ts` || subject.path === `tests-visual/${meta.name}.contract.spec.ts`) && owner.subjects.some((subject) => subject.path === `tests-visual/owner-integrations/${meta.name}.spec.ts`), `${meta.name} uses owner-integration evidence and creates no public-concept contract test`);
    check(owner.pi.kind === "browser" && owner.pi.scenarios.every((scenario) => scenario.startsWith(`${meta.ownerScenarioPrefix}-`)), `${meta.name} π executes only through its named owner context`);
    check(!/apotheosis/i.test(owner.title) && /privatization|re-home/.test(owner.title), `${meta.name} title reflects private/re-home disposition without apotheosis rhetoric`);
}
for (const meta of COMPONENT_CONCEPTS.filter((item) => item.decision === "fold")) {
    const row = components.rows.find((item) => item.conceptId === meta.name);
    const owner = waveById.get(row.canonicalWaves[0]);
    check(/ consolidation — /.test(owner.title) && !/apotheosis/i.test(owner.title), `${meta.name} synonym collapse is named as consolidation rather than multiple-component apotheosis`);
    check(meta.deleteRefs.length > 0 && meta.deleteRefs.every((path) => owner.subjects.find((subject) => subject.path === path)?.action === "delete"), `${meta.name} deletes every superseded story/test named by its authored fold instead of maintaining compatibility demonstrations`);
    check(owner.subjects.some((subject) => subject.path === `demo/stories/${meta.category}/${meta.storySlug}.vue` && subject.action !== "delete"), `${meta.name} retains exactly one canonical story identity for the consolidated concept`);
}
check(!waveById.get("BI.W-P074").subjects.some((row) => row.path === "demo/stories/feedback/notification-toast.vue"), "Toast consolidation does not mint a third notification-toast story identity");

const consumerAssay = json("component-consumer-assay.json");
check(consumerAssay.schemaVersion === 1 && consumerAssay.generatedAt === "2026-07-14" && consumerAssay.sourceBase === SOURCE_BASE && consumerAssay.status === "FORMATION_RESEARCH_ONLY", "component consumer assay binds schema, date, source base, and research-only authority");
check(/Counts are evidence, never gates/.test(consumerAssay.thresholdLaw) && /foreign trees are read-only/.test(consumerAssay.scanLaw), "component consumer assay denies count-gate authority and preserves the foreign-tree fence");
check(consumerAssay.repositories.length === 9 && sameSet(consumerAssay.repositories.map((row) => row.repository), ["value.js", "keyframes.js", "atlas", "fourier-analysis", "sci-report", "muster", "bbnf-buddy", "slides", "speedtest"]), "component consumer assay covers the nine named sibling repositories exactly once");
for (const row of consumerAssay.repositories) {
    check(command(row.path, "git", "rev-parse", "HEAD") === row.head && command(row.path, "git", "rev-parse", "HEAD^{tree}") === row.tree && sha(command(row.path, "git", "status", "--porcelain=v1", "--untracked-files=all")) === row.porcelainSha256, `${row.repository} consumer evidence binds current tracked HEAD/tree and protected worktree digest`);
}
check(consumerAssay.counts.trackedImportClauses === consumerAssay.imports.length && consumerAssay.counts.mappedComponentImportClauses === consumerAssay.imports.filter((row) => row.conceptIds.length > 0).length && consumerAssay.counts.nonComponentImportClauses === consumerAssay.imports.filter((row) => row.conceptIds.length === 0).length, "component consumer assay counts derive from exact import rows rather than prose totals");
check(consumerAssay.counts.componentConcepts === 73 && consumerAssay.concepts.length === 73 && sameSet(consumerAssay.concepts.map((row) => row.conceptId), components.rows.map((row) => row.conceptId)), "component consumer assay covers every canonical/facility concept exactly once");
for (const row of consumerAssay.imports) {
    check(row.specifier === "@mkbabb/glass-ui" || row.specifier.startsWith("@mkbabb/glass-ui/"), `${row.repository}:${row.file} is an actual Glass package import`);
    check(consumerAssay.repositories.some((repo) => repo.repository === row.repository && repo.head === row.repositoryHead) && row.conceptIds.every((id) => components.rows.some((component) => component.conceptId === id)), `${row.repository}:${row.file} binds its repository HEAD and only known component concepts`);
    check(row.conceptMappings.map((mapping) => mapping.conceptId).sort().join("\0") === [...row.conceptIds].sort().join("\0") && row.conceptMappings.every((mapping) => mapping.bases.length > 0), `${row.repository}:${row.file} explains every component mapping by current subpath, named binding, or clean-break destination`);
}
for (const row of consumerAssay.concepts) {
    const disposition = components.rows.find((item) => item.conceptId === row.conceptId);
    const authoredMeta = COMPONENT_CONCEPTS.find((item) => item.name === row.conceptId) ?? SPECIAL_COMPONENT_CONCEPTS.find((item) => item.name === row.conceptId);
    const exactImports = consumerAssay.imports.filter((item) => item.conceptIds.includes(row.conceptId));
    check(row.decision === disposition.decision && row.contract === disposition.contract && row.productJudgment === (authoredMeta.productJudgment ?? null) && row.externalImportClauseCount === exactImports.length && sameSet(row.externalRepositories, uniq(exactImports.map((item) => item.repository))), `${row.conceptId} consumer row binds its exact disposition, contract, product judgment, clauses, and repositories`);
    check(sameSet(row.currentFirstPartyDemos, disposition.actualCurrentDemoPaths.filter((path) => path !== "demo/stories/manifest.ts")) && sameSet(row.canonicalWaves, disposition.canonicalWaves), `${row.conceptId} consumer row binds current first-party demos and exact owner waves`);
}
check(consumerAssay.concepts.filter((row) => ["delete", "private", "rehome", "rehome-private"].includes(row.decision)).every((row) => row.externalImportClauseCount === 0 && row.decisionPressure !== "COLLISION_EXTERNAL_IMPORT_REQUIRES_REDECISION"), "no delete/private/re-home decision silently contradicts a tracked external component import");
const headerRibbonConsumer = consumerAssay.concepts.find((row) => row.conceptId === "header-ribbon");
check(headerRibbonConsumer.externalImportClauseCount === 1 && sameSet(headerRibbonConsumer.externalRepositories, ["keyframes.js"]) && headerRibbonConsumer.externalImports[0].file === "demo/components/instrument/shell/EditorShell.vue" && headerRibbonConsumer.externalImports[0].specifier === "@mkbabb/glass-ui/header-ribbon" && headerRibbonConsumer.externalImports[0].bindings.includes("HeaderRibbon"), "HeaderRibbon retention is bound to the exact tracked keyframes.js import rather than the stale re-home narrative");
const constellationMd = readFileSync(join(ROOT, "CONSTELLATION.md"), "utf8");
check(/preserves the public `header-ribbon` entry/.test(constellationMd) && /EditorShell\.vue` imports `HeaderRibbon` directly/.test(constellationMd) && !/header-ribbon` to consumer-owned demo composition because BI re-homes it/.test(constellationMd), "constellation packet now agrees with the exact HeaderRibbon retention evidence");
const chipConsumer = consumerAssay.concepts.find((row) => row.conceptId === "chip");
check(chipConsumer.externalImports.some((row) => row.specifier === "@mkbabb/glass-ui/toggle-chip" && row.conceptMappings.some((mapping) => mapping.bases.includes("RETIRED_CLEAN_BREAK:toggle-chip"))), "Chip fold explicitly sees tracked toggle-chip consumers through the clean-break mapping");
const retainedFirstPartyJudgments = consumerAssay.concepts.filter((row) => row.decisionPressure === "DECISION_SUPPORTED_BY_PRODUCT_JUDGMENT");
check(consumerAssay.counts.retainJudgmentsRequired === 0 && consumerAssay.counts.explicitProductJudgments === 10 && sameSet(retainedFirstPartyJudgments.map((row) => row.conceptId), ["surface", "split-chars", "combobox", "tags-input", "accordion", "table", "pager-dots", "carousel", "deck", "liquid-grid"]) && retainedFirstPartyJudgments.every((row) => row.productJudgment.length >= 180), "the ten first-party-only retained concepts have substantive authored product judgments rather than being laundered as external demand or left pending");
const consumerAssayMd = readFileSync(join(ROOT, "COMPONENT-CONSUMER-ASSAY.md"), "utf8");
check(/Tracked HEAD source imports only/.test(consumerAssayMd) && /Counts are evidence, never gates/.test(consumerAssayMd) && consumerAssay.concepts.every((row) => consumerAssayMd.includes(`| ${row.conceptId} | ${row.decision} |`)), "component consumer narrative exposes scan/count limits and every concept decision");

const productAssay = json("product-assay.json");
check(productAssay.systemRows.length === 9, "product assay covers glass, all Dock facilities, motion, and procedural systems from first principles");
check(productAssay.systemRows.every((row) => row.currentSources.length > 0 && row.actualDemos.length > 0 && row.canonicalWaves.every((id) => waveIds.has(id)) && row.requiredLiveStates.length >= 3), "every product-assay row has source evidence, actual demos, exact owners, and a live-state matrix");
check(productAssay.systemRows.flatMap((row) => [...row.currentSources, ...row.actualDemos]).every((path) => baseTree.has(path)), "every product-assay source and actual demo exists at the bound source base");
let refractionReachability = "";
try {
    refractionReachability = execFileSync("git", ["grep", "-l", "-E", "glass-refract\\.glsl|glassShader\\.wgsl", SOURCE_BASE, "--", "src", "demo"], { cwd: REPO, encoding: "utf8" }).trim();
} catch (error) {
    if (error.status !== 1) throw error;
}
check(refractionReachability.split("\n").filter(Boolean).length === 1 && refractionReachability.includes("glass-refract.glsl.ts"), "current refraction assay honestly records both GPU shaders as runtime-unconsumed");

// Bound rendered-demo research: exhaustive route presence plus representative causal
// interaction observations. This is deliberately incapable of satisfying execution π.
const renderedAudit = json("rendered-demo-audit.json");
check(renderedAudit.schemaVersion === "1.0.0" && renderedAudit.mode === "TRANCHE_DEVELOPMENT_RESEARCH", "rendered-demo audit has the canonical formation-research schema and mode");
check(renderedAudit.sourceBase === SOURCE_BASE, "rendered-demo audit binds the formation source base");
check(renderedAudit.captureCredit === "FORMATION_RESEARCH_ONLY__NOT_PI__NOT_SAFARI__NOT_CHROME__NOT_EXECUTION_AUTHORIZATION", "rendered-demo capture is denied π, native-browser, and execution credit");
check(renderedAudit.manifest.path === "demo/stories/manifest.ts" && renderedAudit.manifest.sha256 === fileSha(join(REPO, renderedAudit.manifest.path)), "rendered-demo census binds the current manifest bytes");
check(JSON.stringify(renderedAudit.counts) === JSON.stringify({
    desktopRoutes: 124,
    mobileRoutes: 124,
    directRoutes: 101,
    compatibilityRedirects: 22,
    rootRedirects: 1,
    relocatedRedirects: 6,
    negativeControls: 1,
    contactSheets: 24,
    interactionRows: 28 + RENDERED_INTERACTION_ADDENDA.length,
    findingRows: 36 + RENDERED_FINDING_ADDENDA.length,
}), "rendered-demo census retains the exact observed route, redirect, sheet, interaction, and finding cardinalities");
const desktopAudit = renderedAudit.runs.desktop;
const mobileAudit = renderedAudit.runs.mobile;
const extraAudit = renderedAudit.runs.extra;
for (const [name, run] of [["desktop", desktopAudit], ["mobile", mobileAudit]]) {
    check(run.routeCount === 124 && run.expectedRoutes === 124 && run.rows.length === 124, `${name} rendered-demo run covers all 124 requested paths`);
    check(new Set(run.rows.map((row) => row.requestedPath)).size === 124, `${name} rendered-demo paths are unique`);
    check(run.directRouteCount === 101 && run.redirectCount === 23, `${name} rendered-demo run records 101 direct routes and 23 redirects`);
    check(run.renderedMainCount === 124 && run.screenshotCount === 124, `${name} rendered-demo run has a rendered main and hashed screenshot for every path`);
    check(run.horizontalOverflowCount === 0 && run.brokenImageRouteCount === 0 && run.zeroSizeCanvasRouteCount === 0, `${name} rendered-demo run has no document overflow, broken image, or zero-size canvas`);
    check(run.rows.every((row) => row.screenshot.bytes > 0 && /^[0-9a-f]{64}$/.test(row.screenshot.sha256)), `${name} rendered-demo screenshots have nonempty byte/hash receipts`);
}
check(sameSet(desktopAudit.rows.map((row) => row.requestedPath), mobileAudit.rows.map((row) => row.requestedPath)), "desktop and mobile rendered-demo runs cover the identical manifest-derived path set");

const firstPartyDemoAssay = json("first-party-demo-assay.json");
check(firstPartyDemoAssay.schemaVersion === FORMATION_SCHEMA && firstPartyDemoAssay.sourceBase === SOURCE_BASE && firstPartyDemoAssay.renderedManifestSha256 === renderedAudit.manifest.sha256, "first-party demo assay binds the formation schema, source base, and rendered manifest bytes");
check(firstPartyDemoAssay.counts.directStoryRoutes === 90 && firstPartyDemoAssay.counts.demoSourceFilesParsed === 146 && firstPartyDemoAssay.counts.componentConcepts === 73, "first-party demo assay derives all 73 concepts from ninety direct story routes and the complete 146-file demo source graph");
check(firstPartyDemoAssay.counts.conceptsWithCurrentWitness === 73 && firstPartyDemoAssay.counts.conceptsWithoutCurrentWitness === 0 && firstPartyDemoAssay.counts.witnessRows === firstPartyDemoAssay.rows.reduce((sum, row) => sum + row.witnesses.length, 0), "all 73 concepts have a current direct-route or authored private-owner witness and every receipt row is counted");
check(firstPartyDemoAssay.counts.authoredIndirectConcepts === 2 && sameSet(firstPartyDemoAssay.rows.filter((row) => /INDIRECT/.test(row.witnessMode)).map((row) => row.conceptId), ["focus-scope", "goo-filter"]), "only FocusScope and GooFilter use explicit indirect owner-composition evidence");
check(firstPartyDemoAssay.rows.length === components.rows.length && sameSet(firstPartyDemoAssay.rows.map((row) => row.conceptId), components.rows.map((row) => row.conceptId)), "first-party demo assay covers exactly the component disposition roster");
const directStoryPathByRoute = new Map(desktopAudit.rows.filter((row) => row.kind === "story" && !row.redirected).map((row) => [row.actualPath, `demo/stories/${row.category}/${row.id}.vue`]));
for (const row of firstPartyDemoAssay.rows) {
    const disposition = components.rows.find((item) => item.conceptId === row.conceptId);
    check(row.decision === disposition.decision && sameSet(row.actualCurrentDemoPaths, disposition.actualCurrentDemoPaths), `${row.conceptId} direct-route demo assay binds its exact disposition and current witness paths`);
    check(row.actualCurrentDemoPaths.length > 0 && row.actualCurrentDemoPaths.every((path) => baseTree.has(path) && !/manifest\.ts$/.test(path)), `${row.conceptId} witnesses only real source-base story files, never manifest membership`);
    for (const witness of row.witnesses) {
        check(directStoryPathByRoute.get(witness.route) === witness.storyPath && row.actualCurrentDemoPaths.includes(witness.storyPath), `${row.conceptId}:${witness.route} receipt binds a directly rendered route to its exact root story`);
        check(baseTree.has(witness.componentSourcePath), `${row.conceptId}:${witness.componentSourcePath} receipt cites a source-base component-import owner`);
        if (witness.witnessClass === "DIRECT_ROUTE_TRANSITIVE_IMPORT") {
            const source = execFileSync("git", ["show", `${SOURCE_BASE}:${witness.componentSourcePath}`], { cwd: REPO, encoding: "utf8" });
            check(source.includes(witness.importSpecifier) && witness.runtimeBindings.length > 0 && witness.runtimeBindings.every((binding) => source.includes(binding)), `${row.conceptId}:${witness.componentSourcePath} direct receipt retains its runtime-used import spelling and bindings`);
        } else {
            check(witness.witnessClass === "AUTHORED_INDIRECT_OWNER_COMPOSITION" && witness.importSpecifier === "INDIRECT_PUBLIC_OWNER_COMPOSITION" && witness.bases[0].length >= 120, `${row.conceptId}:${witness.storyPath} indirect receipt has explicit owner rationale rather than inherited wave membership`);
        }
    }
}
const firstPartyDemoMd = readFileSync(join(ROOT, "FIRST-PARTY-DEMO-ASSAY.md"), "utf8");
check(/Sharing a wave[\s\S]*earns nothing/.test(firstPartyDemoMd) && firstPartyDemoAssay.rows.every((row) => firstPartyDemoMd.includes(`| ${row.conceptId} |`)), "first-party demo narrative rejects wave/manifest/shell laundering and exposes every concept row");

check(desktopAudit.environment.harness === "Codex in-app browser" && desktopAudit.environment.engineIdentity === "UNAVAILABLE_THROUGH_BOUNDED_API" && desktopAudit.environment.nativeSafari === false && desktopAudit.environment.nativeChrome === false, "rendered-demo environment states its engine limitation and makes no native-browser claim");
check(desktopAudit.rows.every((row) => row.viewport.width === 1280 && row.viewport.height === 720 && row.viewport.dpr === 2), "desktop rendered-demo viewport is exactly 1280x720 at DPR 2");
check(mobileAudit.rows.every((row) => row.viewport.width === 390 && row.viewport.height === 844 && row.viewport.dpr === 1), "mobile rendered-demo viewport is exactly 390x844 at DPR 1");
check(renderedAudit.compatibilityRedirects.length === 22 && renderedAudit.compatibilityRedirects.every((row) => row.requestedPath !== "/" && row.requestedPath !== row.actualPath), "all 22 folded compatibility redirects are explicit and exclude the root redirect");
check(renderedAudit.relocatedRedirects.length === 6 && renderedAudit.relocatedRedirects.every((row) => row.requestedPath !== row.actualPath), "all six relocated compatibility redirects are explicit");
check(extraAudit.rows.length === 7 && extraAudit.redirectCount === 6 && renderedAudit.negativeRoute.requestedPath === "/bi-definitely-not-a-route" && renderedAudit.negativeRoute.h1Count === 0, "extra route audit retains six relocated redirects and the h1-less 404 negative control");
check(renderedAudit.contactSheets.length === 24 && renderedAudit.contactSheets.filter((row) => row.viewport === "desktop").length === 12 && renderedAudit.contactSheets.filter((row) => row.viewport === "mobile").length === 12, "visual review binds twelve desktop and twelve mobile contact sheets");
check(renderedAudit.contactSheets.every((row) => row.bytes > 0 && /^[0-9a-f]{64}$/.test(row.sha256)), "every visually reviewed contact sheet has a nonempty byte/hash receipt");
const warningByMessage = new Map(renderedAudit.warningSignatures.map((row) => [row.message, row]));
check(renderedAudit.warningSignatures.length === 2 && warningByMessage.get("[glass-ui] dock: --dock-morph-min unreadable on a mounted dock root — the token cascade did not reach it (falling back to the WCAG tap floor).")?.count === 38, "rendered-demo audit retains the 38-event Dock masking-warning storm");
check(warningByMessage.get("[glass-ui] useAurora: deferred init armed with no onInitError handler. A WebGL/shader failure will re-surface as an unhandled rejection. Pass runtimeOptions.onInitError, install app.config.errorHandler, or knowingly accept the rejection.")?.count === 1, "rendered-demo audit retains the Aurora unhandled-init warning");
check(renderedAudit.interactions.length === 28 + RENDERED_INTERACTION_ADDENDA.length && new Set(renderedAudit.interactions.map((row) => row.id)).size === renderedAudit.interactions.length, "rendered-demo audit contains every original and authored unique exercised interaction row");
check(renderedAudit.interactions.every((row) => row.route.startsWith("/") && row.action.length >= 10 && row.observation.length >= 40 && Object.keys(row.values).length > 0 && row.ownerWaves.length > 0 && row.ownerWaves.every((id) => waveIds.has(id))), "every interaction names a route, action, concrete values, substantive observation, and canonical owners");
const renderedInteractionById = new Map(renderedAudit.interactions.map((row) => [row.id, row]));
check(renderedInteractionById.get("INT-017").route === "/motion/scroll" && renderedInteractionById.get("INT-017").values.scrollTopAfterPx === 420 && renderedInteractionById.get("INT-017").values.scrollExtentPx === 627 && renderedInteractionById.get("INT-017").values.expectedProgress === renderedInteractionById.get("INT-017").values.observedScaleX && renderedInteractionById.get("INT-017").values.timeline === "--sp", "scroll interaction binds the exercised scroller, named native timeline, and observed causal progress");
check(renderedInteractionById.get("INT-018").route === "/motion/deck" && renderedInteractionById.get("INT-018").values.fromSlide === 1 && renderedInteractionById.get("INT-018").values.toSlide === 2 && renderedInteractionById.get("INT-018").values.liveMessage === "Slide 2 of 6: Keyboard-paged" && renderedInteractionById.get("INT-018").values.focusedControl === "Next", "Deck interaction binds current-page state, polite announcement, and focus after an exercised navigation");
check(renderedInteractionById.get("INT-019").route === "/motion/curve-gallery" && renderedInteractionById.get("INT-019").values.selectedFamily === "Springs" && renderedInteractionById.get("INT-019").values.mismatchedSpringParameterLabels === 5 && renderedInteractionById.get("INT-019").values.renderedParameters.dock[0] === 0.32 && renderedInteractionById.get("INT-019").values.canonicalParameters.dock[0] === 0.3, "Curve Gallery interaction binds the selected live family and all five stale rendered parameter labels to their canonical values");
check(renderedInteractionById.get("INT-020").route === "/motion/tempo" && renderedInteractionById.get("INT-020").values.panelTransitionMs.observedRatio === renderedInteractionById.get("INT-020").values.expectedScaleRatio && renderedInteractionById.get("INT-020").values.scrimAnimationMs.quicker === 550 && renderedInteractionById.get("INT-020").values.scrimAnimationMs.longer === 550 && renderedInteractionById.get("INT-020").values.scrimAnimationMs.observedRatio === 1, "Motion Tempo interaction binds causal endpoint resets, the correctly scaled focal panel, and the invariant 550 ms portaled scrim");
check(renderedInteractionById.get("INT-021").route === "/motion/reveal" && renderedInteractionById.get("INT-021").values.rowCount === 6 && renderedInteractionById.get("INT-021").values.resolvedAnimationDurationMs.every((value) => value === 500) && JSON.stringify(renderedInteractionById.get("INT-021").values.resolvedAnimationDelayMs) === JSON.stringify([80, 160, 240, 320, 400, 480]) && renderedInteractionById.get("INT-021").values.canonicalBouncySettleAtIdentityMs === 570, "v-reveal interaction binds all six exercised fixed clocks/delays against the generated bouncy horizon");
check(renderedInteractionById.get("INT-022").route === "/motion/springs" && renderedInteractionById.get("INT-022").values.liveRegisterOptionCount === 7 && renderedInteractionById.get("INT-022").values.canonicalPresetCount === 8 && renderedInteractionById.get("INT-022").values.displayedPercentageStopCount === 24 && renderedInteractionById.get("INT-022").values.shippedPercentageStopCount === 48 && renderedInteractionById.get("INT-022").values.displayedEqualsShippedToken === false && renderedInteractionById.get("INT-022").values.namedAndPlaygroundAuthoredDurationMs === 1100, "Springs interaction binds the derived-menu copy contradiction and exact displayed-versus-shipped generation mismatch");
check(renderedInteractionById.get("INT-023").route === "/motion/curve-gallery" && renderedInteractionById.get("INT-023").values.semanticBezierHandleCount === 0 && renderedInteractionById.get("INT-023").values.pointerStepCountAfter === 9 && renderedInteractionById.get("INT-023").values.keyboardStepCountAfterArrowRight === 10 && renderedInteractionById.get("INT-023").values.stepsLiteralAfter === "steps(10, jump-none)" && renderedInteractionById.get("INT-023").values.stepsReparseOk === true && renderedInteractionById.get("INT-023").values.playbackControlRectPx.width === 40 && renderedInteractionById.get("INT-023").values.reducedMotionBranchPresent === false, "EasingPicker interaction binds causal pointer/keyboard authoring success and the distinct handle, Clipboard, control-geometry, and preview-lifecycle failures");
check(renderedInteractionById.get("INT-024").route === "/substrates/blob" && renderedInteractionById.get("INT-024").values.clickCounterBefore === 0 && renderedInteractionById.get("INT-024").values.clickCounterAfter === 1 && renderedInteractionById.get("INT-024").values.activeElementAfter === "BODY" && renderedInteractionById.get("INT-024").values.role === null, "Blob interaction binds a causal SDF press observable and the absent semantic/focus control");
check(renderedInteractionById.get("INT-025").route === "/data/table" && JSON.stringify(renderedInteractionById.get("INT-025").values.initialFirstRows) === JSON.stringify(["fourier-analysis", "glass-ui", "keyframes.js"]) && JSON.stringify(renderedInteractionById.get("INT-025").values.finalFirstRows) === JSON.stringify(["aurora-shader", "bbnf-lang", "cm-fonts"]) && renderedInteractionById.get("INT-025").values.sortableHeaderCount === 5 && renderedInteractionById.get("INT-025").values.headersWithAriaSort === 0 && renderedInteractionById.get("INT-025").values.storySelectListenerPresent === false, "DataTable interaction binds causal reordering and the absent sort/selection semantic contract");
check(renderedInteractionById.get("INT-026").route === "/data/timeline" && renderedInteractionById.get("INT-026").values.eventChoiceCount === 6 && renderedInteractionById.get("INT-026").values.selectedLabel === "Design" && renderedInteractionById.get("INT-026").values.selectedPercent === 22 && renderedInteractionById.get("INT-026").values.choicesWithRole === 0 && renderedInteractionById.get("INT-026").values.activeElementAfter === "BODY", "Timeline interaction binds causal event selection separately from its sibling semantic slider");
check(renderedInteractionById.get("INT-027").route === "/display/atoms" && renderedInteractionById.get("INT-027").values.darkToggleInstances === 9 && renderedInteractionById.get("INT-027").values.passiveDivInstances === 1 && renderedInteractionById.get("INT-027").values.passiveCursor === "pointer" && renderedInteractionById.get("INT-027").values.darkBefore === renderedInteractionById.get("INT-027").values.darkAfter && renderedInteractionById.get("INT-027").values.passiveReceivedFocus === false, "DarkMode interaction binds the pointer-styled passive branch to a causal no-op rather than misclassifying it as disabled or decorative");
check(renderedInteractionById.get("INT-028").route === "/containers/drawer" && renderedInteractionById.get("INT-028").values.explicitSnapBefore === 0.4 && renderedInteractionById.get("INT-028").values.explicitSnapAfter === 0.25 && renderedInteractionById.get("INT-028").values.handleRectPx.height === 25 && renderedInteractionById.get("INT-028").values.handleAriaHidden === true && renderedInteractionById.get("INT-028").values.handleRole === null && renderedInteractionById.get("INT-028").values.activeElementAfter === "Close" && renderedInteractionById.get("INT-028").values.fixedDescriptionClaimsNoSnapDragging === true && renderedInteractionById.get("INT-028").values.fixedDeclaresSnapPoints === true && renderedInteractionById.get("INT-028").values.fixedScalarBefore === 1 && renderedInteractionById.get("INT-028").values.fixedScalarAfter === 0.5, "Drawer interaction binds both the causal aria-hidden detent and the false fixed-mode default-ladder claim");
check(renderedInteractionById.get("INT-029").route === "/display/atoms" && renderedInteractionById.get("INT-029").values.requestedItemCount === 7 && renderedInteractionById.get("INT-029").values.maxVisible === 3 && renderedInteractionById.get("INT-029").values.renderedItemPucks === 3 && renderedInteractionById.get("INT-029").values.overflowText === "+4" && renderedInteractionById.get("INT-029").values.renderedHiddenItemNodes === 0 && renderedInteractionById.get("INT-029").values.nonleadingComputedMarginLeftPx.every((value) => value === 0) && renderedInteractionById.get("INT-029").values.directExternalImportClauses === 0, "StackedIconGroup interaction binds impossible hidden-item reveal, absent overlap, and zero external demand");
check(renderedInteractionById.get("INT-030").route === "/navigation/carousel" && renderedInteractionById.get("INT-030").values.canonicalCarouselPagerCount === 1 && renderedInteractionById.get("INT-030").values.glassCarouselPagerCount === 0 && renderedInteractionById.get("INT-030").values.counterBefore === "1 / 6" && renderedInteractionById.get("INT-030").values.counterAfter === "2 / 6" && renderedInteractionById.get("INT-030").values.previousDisabledBefore === true && renderedInteractionById.get("INT-030").values.previousDisabledAfter === false && renderedInteractionById.get("INT-030").values.activeElementAfter === "Next slide" && renderedInteractionById.get("INT-030").values.glassPagerRuntimeConsumerCount === 0, "Carousel interaction binds the causal canonical pager and the absence of its exported Glass-prefixed fork");
check(renderedAudit.findings.length === 36 + RENDERED_FINDING_ADDENDA.length && renderedAudit.findings.filter((row) => row.status === "RED").length === 34 + RENDERED_FINDING_ADDENDA.length && renderedAudit.findings.filter((row) => row.status === "OBSERVED").length === 2, "rendered-demo audit retains every original/authored RED finding and the two unaccepted observations");
check(new Set(renderedAudit.findings.map((row) => row.id)).size === renderedAudit.findings.length, "rendered-demo finding IDs are unique");
for (const finding of renderedAudit.findings) {
    check(finding.evidenceCredit === "CURRENT_SOURCE_RESEARCH_ONLY", `${finding.id} is denied execution/π credit`);
    check(finding.sourcePaths.length > 0 && finding.sourcePaths.every((path) => baseTree.has(path)), `${finding.id} cites exact source-base paths`);
    check(finding.canonicalWaves.length > 0 && finding.canonicalWaves.every((id) => waveIds.has(id)), `${finding.id} names canonical wave owners`);
    check(finding.canonicalFamilies.length > 0 && finding.canonicalFamilies.every((id) => invariantIds.has(id)), `${finding.id} names canonical non-command property owners`);
    check(finding.evidence.length >= 50 && finding.acceptancePredicate.length >= 140, `${finding.id} has substantive current evidence and exact acceptance predicate`);
}
const renderedFindingById = new Map(renderedAudit.findings.map((row) => [row.id, row]));
check(sameSet(renderedFindingById.get("RDA-001").canonicalWaves, ["BI.W-P056", "BI.W-P057"]) && /FOLDED_STORY_IDS/.test(renderedFindingById.get("RDA-001").acceptancePredicate), "compatibility-route finding maps to exact IA/manifest owners and deletion predicate");
check(sameSet(renderedFindingById.get("RDA-005").canonicalWaves, ["BI.W-P016", "BI.W-P017", "BI.W-P132"]) && /sample provenance/.test(renderedFindingById.get("RDA-005").acceptancePredicate), "false live-luminance finding maps to material/refraction owners and provenance predicate");
check(sameSet(renderedFindingById.get("RDA-008").canonicalWaves, ["BI.W-P037", "BI.W-P062", "BI.W-P106"]) && /isolates all non-dialog/.test(renderedFindingById.get("RDA-008").acceptancePredicate), "modal-isolation finding maps to Dock/accessibility/Dialog owners and APG predicate");
check(sameSet(renderedFindingById.get("RDA-009").canonicalWaves, ["BI.W-P059", "BI.W-P062", "BI.W-P067", "BI.W-P098"]) && /aria-describedby/.test(renderedFindingById.get("RDA-009").acceptancePredicate), "form-invalid finding maps to specimen/accessibility/Input/LabeledField owners and error-link predicate");
check(sameSet(renderedFindingById.get("RDA-013").canonicalWaves, ["BI.W-P007", "BI.W-P062"]) && /Space\/Enter lift/.test(renderedFindingById.get("RDA-013").acceptancePredicate) && /44×44/.test(renderedFindingById.get("RDA-013").acceptancePredicate), "SortableList facsimile finding maps to its structure/accessibility owners and exact semantic keyboard/coarse-target predicate");
check(renderedFindingById.get("RDA-014").canonicalWaves.includes("BI.W-P059") && renderedFindingById.get("RDA-014").canonicalWaves.includes("BI.W-P062") && /no fixed route or control count/.test(renderedFindingById.get("RDA-014").acceptancePredicate), "direct-story naming finding maps to specimen/accessibility/component owners and uses discovery rather than a count gate");
check(sameSet(renderedFindingById.get("RDA-015").canonicalWaves, ["BI.W-P062", "BI.W-P118", "BI.W-P119"]) && /four-instance/.test(renderedFindingById.get("RDA-015").acceptancePredicate) && /duplicate ID/.test(renderedFindingById.get("RDA-015").acceptancePredicate), "PagerDots duplicate-resource finding maps to accessibility/PagerDots/Carousel owners and exact multi-instance isolation");
check(sameSet(renderedFindingById.get("RDA-016").canonicalWaves, ["BI.W-P048", "BI.W-P056", "BI.W-P059", "BI.W-P061", "BI.W-P062"]) && /one proportionate Canvas2D renderer/.test(renderedFindingById.get("RDA-016").acceptancePredicate) && /delete warpOnClick, gravity-well activation/.test(renderedFindingById.get("RDA-016").acceptancePredicate) && /callback that is never called/.test(renderedFindingById.get("RDA-016").acceptancePredicate), "Constellation inert-overlay finding selects one executable Canvas2D contract, removes the GPU/no-op fork, and resolves its decorative-versus-interactive contradiction");
check(renderedFindingById.get("RDA-017").canonicalWaves.includes("BI.W-P000") && renderedFindingById.get("RDA-017").canonicalWaves.includes("BI.W-P048") && /registry prose that states the inverse/.test(renderedFindingById.get("RDA-017").acceptancePredicate), "procedural renderer-truth finding binds gate abrogation, product owners, live backend identity, and exact prose/executable agreement");
check(sameSet(renderedFindingById.get("RDA-018").canonicalWaves, ["BI.W-P000", "BI.W-P014", "BI.W-P025", "BI.W-P026", "BI.W-P059", "BI.W-P061"]) && /managed engine playback/.test(renderedFindingById.get("RDA-018").acceptancePredicate) && /Adding an unrelated local rAF/.test(renderedFindingById.get("RDA-018").acceptancePredicate), "Springs finding rejects import-exemption theater and binds demo playback to the managed temporal owner");
check(renderedFindingById.get("RDA-019").canonicalWaves.includes("BI.W-P121") && /Delete installDeckSpring, deckEase, DECK_SPRING/.test(renderedFindingById.get("RDA-019").acceptancePredicate) && /Slides remains a foreign local editorial owner/.test(renderedFindingById.get("RDA-019").acceptancePredicate), "Deck finding deletes the inert compatibility facility without annexing the foreign slides implementation");
check(sameSet(renderedFindingById.get("RDA-020").canonicalWaves, ["BI.W-P000", "BI.W-P014", "BI.W-P025", "BI.W-P026", "BI.W-P027", "BI.W-P063"]) && /One canonical press composable/.test(renderedFindingById.get("RDA-020").acceptancePredicate) && /exclusive phase/.test(renderedFindingById.get("RDA-020").acceptancePredicate), "press finding removes the source-shape fork and forbids concurrent CSS/JS scale writers");
check(renderedFindingById.get("RDA-021").canonicalWaves.includes("BI.W-P023") && renderedFindingById.get("RDA-021").canonicalWaves.includes("BI.W-P129") && /Delete suite\.ts, curves\.ts, the \/motion-curves entry/.test(renderedFindingById.get("RDA-021").acceptancePredicate) && /Preserve the real \/easing EasingPicker/.test(renderedFindingById.get("RDA-021").acceptancePredicate) && /adding a keyframes export requires no Glass edit/.test(renderedFindingById.get("RDA-021").acceptancePredicate), "distribution-mirror finding deletes the stale upstream copy while preserving the real Glass-owned easing component boundary");
check(renderedFindingById.get("RDA-022").canonicalWaves.includes("BI.W-P024") && /unit tests, type-only imports, barrels, documentation, registry rows, and future asks receive zero consumer-demand credit/.test(renderedFindingById.get("RDA-022").acceptancePredicate) && /creating an unused test file cannot make an orphan primitive live/.test(renderedFindingById.get("RDA-022").acceptancePredicate), "consumer-laundering finding separates test coverage from actual product demand without count locking");
check(renderedFindingById.get("RDA-023").canonicalWaves.includes("BI.W-P130") && /classify each final channel as layout, paint, or composite/.test(renderedFindingById.get("RDA-023").acceptancePredicate) && /Animating --x consumed by width turns RED/.test(renderedFindingById.get("RDA-023").acceptancePredicate), "animation-channel finding replaces compositor-name theater with sink and trace truth");
check(sameSet(renderedFindingById.get("RDA-024").canonicalWaves, ["BI.W-P025", "BI.W-P029", "BI.W-P059", "BI.W-P061", "BI.W-P106"]) && /normalized duration\/response ratio to equal 13\/7/.test(renderedFindingById.get("RDA-024").acceptancePredicate) && /fixed --duration-panel branch/.test(renderedFindingById.get("RDA-024").acceptancePredicate), "Motion Tempo finding maps the composed clock break to temporal, transition, demo, and Dialog owners with a normalized-ratio negative control");
check(sameSet(renderedFindingById.get("RDA-025").canonicalWaves, ["BI.W-P024", "BI.W-P025", "BI.W-P026", "BI.W-P029", "BI.W-P059", "BI.W-P061"]) && /pairs any named spring trajectory with the generated duration reader/.test(renderedFindingById.get("RDA-025").acceptancePredicate) && /fixed 500 ms beside --spring-bouncy/.test(renderedFindingById.get("RDA-025").acceptancePredicate), "v-reveal fixed-clock finding maps to clean-break, temporal, spring, transition, and demo owners without granting consumer CSS a second spring canon");
check(sameSet(renderedFindingById.get("RDA-026").canonicalWaves, ["BI.W-P023", "BI.W-P025", "BI.W-P026", "BI.W-P059", "BI.W-P061"]) && /measured-settle maxDuration, sample density, rounding/.test(renderedFindingById.get("RDA-026").acceptancePredicate) && /restoring a fixed 1100 ms/.test(renderedFindingById.get("RDA-026").acceptancePredicate), "Springs lab finding maps generated configuration, derived UI, managed playback, and scenario truth to exact owners without a count gate");
check(sameSet(renderedFindingById.get("RDA-027").canonicalWaves, ["BI.W-P059", "BI.W-P061", "BI.W-P062", "BI.W-P124"]) && /actual interactive semantic descendant/.test(renderedFindingById.get("RDA-027").acceptancePredicate) && /shared setHandle owner/.test(renderedFindingById.get("RDA-027").acceptancePredicate), "EasingPicker handle finding preserves causal pointer editing while requiring semantic keyboard/value parity through one state owner");
check(sameSet(renderedFindingById.get("RDA-028").canonicalWaves, ["BI.W-P059", "BI.W-P061", "BI.W-P062", "BI.W-P124"]) && /pending, copied, and failed outcomes/.test(renderedFindingById.get("RDA-028").acceptancePredicate) && /missing API fixture/.test(renderedFindingById.get("RDA-028").acceptancePredicate), "EasingPicker copy finding replaces swallowed Clipboard failure with explicit accessible recovery and lifecycle evidence");
check(sameSet(renderedFindingById.get("RDA-029").canonicalWaves, ["BI.W-P014", "BI.W-P059", "BI.W-P061", "BI.W-P124"]) && /discovered by rendered semantics/.test(renderedFindingById.get("RDA-029").acceptancePredicate) && /glass-btn with btn-pill/.test(renderedFindingById.get("RDA-029").acceptancePredicate), "EasingPicker affordance finding binds the live 40px collision to semantic enrollment rather than another file roster");
check(sameSet(renderedFindingById.get("RDA-030").canonicalWaves, ["BI.W-P014", "BI.W-P022", "BI.W-P025", "BI.W-P059", "BI.W-P061", "BI.W-P062", "BI.W-P124"]) && /bounded editor-local normalized scrubber/.test(renderedFindingById.get("RDA-030").acceptancePredicate) && /reactive reduced-motion immediate completion/.test(renderedFindingById.get("RDA-030").acceptancePredicate), "EasingPicker preview finding selects proportionate truthful authority and complete PRM/restart/teardown semantics without forcing one global clock");
check(sameSet(renderedFindingById.get("RDA-031").canonicalWaves, ["BI.W-P047", "BI.W-P059", "BI.W-P062"]) && /named semantic press surface/.test(renderedFindingById.get("RDA-031").acceptancePredicate) && /Decorative or aria-hidden Blob instances mount no operable event surface/.test(renderedFindingById.get("RDA-031").acceptancePredicate), "Blob finding distinguishes a causal semantic press contract from a decorative procedural surface");
check(sameSet(renderedFindingById.get("RDA-032").canonicalWaves, ["BI.W-P059", "BI.W-P062", "BI.W-P115", "BI.W-P116"]) && /native button inside th/.test(renderedFindingById.get("RDA-032").acceptancePredicate) && /nonselectable rows\/cards have no click listener/.test(renderedFindingById.get("RDA-032").acceptancePredicate), "DataTable finding binds sortable header and controlled row-selection semantics across wide and card projections");
check(sameSet(renderedFindingById.get("RDA-033").canonicalWaves, ["BI.W-P059", "BI.W-P062", "BI.W-P120"]) && /ordered list or an exact single-selection composite/.test(renderedFindingById.get("RDA-033").acceptancePredicate) && /same jumpTo owner/.test(renderedFindingById.get("RDA-033").acceptancePredicate), "Timeline finding independently enrolls its discrete event chooser beside slider and marker controls");
check(sameSet(renderedFindingById.get("RDA-034").canonicalWaves, ["BI.W-P059", "BI.W-P062", "BI.W-P082"]) && /Delete the consumerless passive prop\/branch/.test(renderedFindingById.get("RDA-034").acceptancePredicate) && /no pointer cursor, focus styling, event handlers/.test(renderedFindingById.get("RDA-034").acceptancePredicate), "DarkMode finding deletes the false-affordance branch instead of preserving an interactive-looking no-op");
check(sameSet(renderedFindingById.get("RDA-035").canonicalWaves, ["BI.W-P059", "BI.W-P062", "BI.W-P080"]) && /Remove per-character click-backspace and the interactive prop/.test(renderedFindingById.get("RDA-035").acceptancePredicate) && /defaulting an undemonstrated interaction true/.test(renderedFindingById.get("RDA-035").acceptancePredicate), "Typewriter finding deletes the hidden pointer-only default unless a complete current editing concept is explicitly owned and demonstrated");
check(sameSet(renderedFindingById.get("RDA-036").canonicalWaves, ["BI.W-P032", "BI.W-P059", "BI.W-P061", "BI.W-P062", "BI.W-P107"]) && /Modal\/content-sized Drawer with omitted snapPoints has one full resting position/.test(renderedFindingById.get("RDA-036").acceptancePredicate) && /slider-equivalent control/.test(renderedFindingById.get("RDA-036").acceptancePredicate) && /Reintroducing an aria-hidden drag host/.test(renderedFindingById.get("RDA-036").acceptancePredicate), "Drawer finding makes mode/detent truth, semantic manipulation, public state, and temporal paint one executable contract");
check(sameSet(renderedFindingById.get("RDA-037").canonicalWaves, ["BI.W-P059", "BI.W-P061", "BI.W-P083"]) && /Delete the public StackedIconGroup family/.test(renderedFindingById.get("RDA-037").acceptancePredicate) && /Do not repair, alias, privatize, or preserve/.test(renderedFindingById.get("RDA-037").acceptancePredicate) && /zero tracked external runtime demand/.test(renderedFindingById.get("RDA-037").acceptancePredicate), "StackedIconGroup false default/story strengthens its existing zero-demand deletion instead of inventing a hover contract");
check(sameSet(renderedFindingById.get("RDA-038").canonicalWaves, ["BI.W-P059", "BI.W-P061", "BI.W-P119"]) && /Delete GlassCarouselPager, both export projections/.test(renderedFindingById.get("RDA-038").acceptancePredicate) && /canonical concept only/.test(renderedFindingById.get("RDA-038").acceptancePredicate) && /cannot donate demand to an unused sibling fork/.test(renderedFindingById.get("RDA-038").acceptancePredicate), "GlassCarouselPager is explicitly deleted as a zero-consumer fork while the exercised canonical pager and shared PagerDots remain");
check(renderedInteractionById.get("INT-031")?.values.renderedDialogRoots === 0 && renderedInteractionById.get("INT-031")?.values.activeDescendantAssigned === true && renderedInteractionById.get("INT-031")?.values.lastPickedAfter === "Customize palette", "Command live assay proves inline causality and the exact missing dialog branch");
check(renderedInteractionById.get("INT-032")?.values.renderedOptions === 8 && renderedInteractionById.get("INT-032")?.values.focusRestoredToTrigger === true && ["renderedComboboxCancel", "renderedComboboxSeparator", "renderedComboboxViewport"].every((key) => renderedInteractionById.get("INT-032")?.values[key] === 0), "Combobox live assay proves canonical selection/focus without the three speculative members");
check(renderedInteractionById.get("INT-033")?.route === "/foundations/overlays-scrims" && renderedInteractionById.get("INT-033")?.values.staticScrimSwatches === 3 && renderedInteractionById.get("INT-033")?.values.renderedDialogRoots === 0 && renderedInteractionById.get("INT-033")?.values.storyModalOverlayImports === 0 && renderedInteractionById.get("INT-033")?.values.staleTierStrongMentions === 1, "Overlay foundations live assay separates three static token swatches from the unmounted component and stale private API prose");
check(/CarouselNext and CarouselPrevious/.test(renderedFindingById.get("RDA-039")?.finding) && /sibling demand/.test(renderedFindingById.get("RDA-039")?.acceptancePredicate), "standalone Carousel arrow twins have an exact deletion and sibling-laundering negative control");
check(/DialogScrollContent/.test(renderedFindingById.get("RDA-040")?.finding) && /one explicit DialogContent size\/scroll axis/.test(renderedFindingById.get("RDA-040")?.acceptancePredicate), "Dialog scroll duplicate folds into one canonical content axis");
check(/DrawerPortal and DropdownMenuPortal/.test(renderedFindingById.get("RDA-041")?.finding) && /exactly one portal boundary/.test(renderedFindingById.get("RDA-041")?.acceptancePredicate), "redundant public portals are removed while exact content ownership remains exercised");
check(/ComboboxCancel, ComboboxSeparator, and ComboboxViewport/.test(renderedFindingById.get("RDA-042")?.finding) && /Delete the exact Cancel, Separator, and Viewport/.test(renderedFindingById.get("RDA-042")?.acceptancePredicate), "all three zero-witness Combobox members have exact clean removals");
check(/Eight Progress\/DataTable\/Drawer\/Select implementation children/.test(renderedFindingById.get("RDA-043")?.finding) && /Remove all eight exact public projections/.test(renderedFindingById.get("RDA-043")?.acceptancePredicate), "internal owner parts are privatized without deleting required owner behavior");
check(/same-source prose alias/.test(renderedFindingById.get("RDA-044")?.finding) && /Retain HandMark as the sole public component name/.test(renderedFindingById.get("RDA-044")?.acceptancePredicate), "InkMark exact consumers trigger migration rather than alias preservation");
check(/export-and-prose-only/.test(renderedFindingById.get("RDA-045")?.finding) && /Retain CommandDialog only by adding a direct packed-public-member scenario/.test(renderedFindingById.get("RDA-045")?.acceptancePredicate), "CommandDialog retention is conditional on exact direct dialog causality");
check(/forward-reserved and synonym option axes/.test(renderedFindingById.get("RDA-046")?.finding) && /Delete the forward-reserved edge value and the scale\/slide synonyms/.test(renderedFindingById.get("RDA-046")?.acceptancePredicate) && /claiming live ModalOverlay evidence from static divs/.test(renderedFindingById.get("RDA-046")?.acceptancePredicate), "ModalOverlay removes no-op option axes and the foundations story cannot launder static token swatches into live component evidence");
check(RENDERED_INTERACTION_ADDENDA.every((expected) => JSON.stringify(renderedInteractionById.get(expected.id)) === JSON.stringify(expected)), "rendered interaction addenda registry exactly equals every authored live/default/member research row");
check(RENDERED_FINDING_ADDENDA.every((expected) => JSON.stringify(renderedFindingById.get(expected.id)) === JSON.stringify({ ...expected, evidenceCredit: "CURRENT_SOURCE_RESEARCH_ONLY" })), "rendered finding addenda registry exactly equals every authored default/topology/member finding");
check(/preservedEnvelopeSha256/.test(readFileSync(join(ROOT, "refresh-rendered-demo-authored-research.mjs"), "utf8")) && /authored refresh mutated route\/contact\/raw evidence envelope/.test(readFileSync(join(ROOT, "refresh-rendered-demo-authored-research.mjs"), "utf8")), "authored rendered-research refresh preserves the original route, contact-sheet, and raw-capture evidence envelope exactly");

// Explicit public defaults are a product contract, including omission-derived
// modes and defaults every story happens to override. Reparse every declaration
// and every direct first-party tag occurrence independently; the resulting ledger
// is formation research and may never become a frozen runtime roster.
const publicDefaults = json("public-default-contract-audit.json");
check(publicDefaults.schemaVersion === "1.0.0" && publicDefaults.sourceBase === SOURCE_BASE && publicDefaults.generatedAt === "2026-07-14" && publicDefaults.status === "FORMATION_RESEARCH_ONLY", "public-default audit binds schema, source base, date, and research-only status");
check(publicDefaults.authority === "DESCRIPTIVE_AST_AND_DIRECT_USAGE_DISCOVERY_PLUS_AUTHORED_FIRST_PRINCIPLES_DISPOSITION__NEVER_EXECUTION_PASS__RUNTIME_COMPOSITION_REDISCOVERS_DEFAULTS" && /Assign every row one authored product disposition/.test(publicDefaults.method) && /frozen counts never become a gate/.test(publicDefaults.method), "public-default audit explicitly denies execution, roster, and cardinality authority");
check(publicDefaults.componentFileCount === 213 && publicDefaults.componentFilesWithDefaults === 86 && publicDefaults.defaultRowCount === 291 && publicDefaults.rows.length === 291 && new Set(publicDefaults.rows.map((row) => row.id)).size === 291, "public-default audit covers all 291 explicit defaults across 86 of 213 component files with unique identities");
check(JSON.stringify(publicDefaults.mechanismCounts) === JSON.stringify({ DEFINE_MODEL_DEFAULT: 6, WITH_DEFAULTS: 285 }) && publicDefaults.candidateRowCount === 64 && publicDefaults.candidateRowsWithNoDirectDemoUsage === 3 && publicDefaults.candidateRowsWithDemoUsageButNoDefaultDemo === 4, "public-default audit retains exact declaration mechanisms and hidden/no-direct-demo discovery receipts without making them product quotas");
check(JSON.stringify(publicDefaults.statusCounts) === JSON.stringify({ CURRENT_RED: 23, REVIEWED_ENROLLMENT: 268 }) && JSON.stringify(publicDefaults.domainCounts) === JSON.stringify({ BEHAVIOR_MOTION_OR_INTERACTION: 43, BOUNDS_TIMING_OR_CAPACITY: 19, DATA_OR_CONFIGURATION_DEFAULT: 97, HOST_MODE_OR_SEMANTIC_SHAPE: 31, PRESENTATION_DEFAULT: 79, PUBLIC_STATE_SEED: 22 }), "public-default audit gives every row a reviewed status and first-principles domain");
check(publicDefaults.linkedRenderedFindingCount === 9 && publicDefaults.linkedRenderedInteractionCount === 7, "public-default RED rows fold into nine real findings and seven live interactions rather than minting per-default gates");

const publicComponentVuePaths = [...baseTree.keys()].filter((path) => path.startsWith("src/components/") && path.endsWith(".vue")).sort();
const publicSourceCache = new Map();
const publicSource = (path) => {
    if (!publicSourceCache.has(path)) publicSourceCache.set(path, execFileSync("git", ["show", `${SOURCE_BASE}:${path}`], { cwd: REPO, encoding: "utf8", maxBuffer: 8 * 1024 * 1024 }));
    return publicSourceCache.get(path);
};
const publicPropertyName = (node, sourceFile) => {
    if (!node) return null;
    if (ts.isIdentifier(node) || ts.isStringLiteralLike(node) || ts.isNumericLiteral(node)) return node.text;
    return node.getText(sourceFile);
};
const publicObjectProperty = (object, name, sourceFile) => object?.properties.find((prop) => publicPropertyName(prop.name, sourceFile) === name);
const publicPropertyValue = (property) => ts.isPropertyAssignment(property) ? property.initializer : null;
const publicDefaultReceipts = [];
for (const path of publicComponentVuePaths) {
    const text = publicSource(path);
    for (const match of text.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
        const scriptText = match[2];
        const offset = match.index + match[0].indexOf(scriptText);
        const kind = /\blang\s*=\s*["']tsx["']/.test(match[1]) ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
        const sourceFile = ts.createSourceFile(path, scriptText, ts.ScriptTarget.Latest, true, kind);
        const addReceipt = ({ node, prop, mechanism, modelName = null }) => {
            const start = offset + node.getStart(sourceFile);
            const end = offset + node.end;
            publicDefaultReceipts.push({
                path,
                line: text.slice(0, start).split("\n").length,
                mechanism,
                prop,
                modelName,
                expressionSha256: sha(text.slice(start, end)),
            });
        };
        const visit = (node) => {
            if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "withDefaults") {
                const defaults = node.arguments[1];
                if (defaults && ts.isObjectLiteralExpression(defaults)) for (const property of defaults.properties) {
                    const prop = publicPropertyName(property.name, sourceFile);
                    const value = publicPropertyValue(property);
                    if (prop && value) addReceipt({ node: value, prop, mechanism: "WITH_DEFAULTS" });
                }
            }
            if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "defineModel") {
                const object = [...node.arguments].reverse().find(ts.isObjectLiteralExpression);
                const defaultProperty = object && publicObjectProperty(object, "default", sourceFile);
                const value = defaultProperty && publicPropertyValue(defaultProperty);
                if (value) {
                    const first = node.arguments[0];
                    const modelName = first && ts.isStringLiteralLike(first) ? first.text : "modelValue";
                    addReceipt({ node: value, prop: modelName, mechanism: "DEFINE_MODEL_DEFAULT", modelName });
                }
            }
            if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "defineProps") {
                const object = node.arguments[0];
                if (object && ts.isObjectLiteralExpression(object)) for (const property of object.properties) {
                    const prop = publicPropertyName(property.name, sourceFile);
                    const descriptor = publicPropertyValue(property);
                    if (!prop || !descriptor || !ts.isObjectLiteralExpression(descriptor)) continue;
                    const defaultProperty = publicObjectProperty(descriptor, "default", sourceFile);
                    const value = defaultProperty && publicPropertyValue(defaultProperty);
                    if (value) addReceipt({ node: value, prop, mechanism: "RUNTIME_PROP_DEFAULT" });
                }
            }
            ts.forEachChild(node, visit);
        };
        visit(sourceFile);
    }
}
publicDefaultReceipts.sort((a, b) => a.path.localeCompare(b.path) || a.line - b.line || a.prop.localeCompare(b.prop));
const publicDefaultProjection = (row) => ({ path: row.path, line: row.line, mechanism: row.mechanism, prop: row.prop, modelName: row.modelName, expressionSha256: row.expressionSha256 });
check(JSON.stringify(publicDefaultReceipts) === JSON.stringify(publicDefaults.rows.map(publicDefaultProjection)), "public-default rows exactly equal an independent full-component TypeScript AST derivation");

const publicMask = (value) => value.replace(/[^\n]/g, " ");
const publicOpeningTags = (path, text) => {
    let template = text;
    for (const regex of [/<script\b[\s\S]*?<\/script\s*>/gi, /<style\b[\s\S]*?<\/style\s*>/gi, /<!--[\s\S]*?-->/g]) template = template.replace(regex, publicMask);
    const tags = [];
    for (let index = 0; index < template.length; index += 1) {
        if (template[index] !== "<" || !/[A-Za-z]/.test(template[index + 1] ?? "")) continue;
        let cursor = index + 1;
        while (/[\w.-]/.test(template[cursor] ?? "")) cursor += 1;
        const tag = template.slice(index + 1, cursor);
        let quote = null;
        let end = cursor;
        for (; end < template.length; end += 1) {
            const char = template[end];
            if (quote) {
                if (char === quote && template[end - 1] !== "\\") quote = null;
            } else if (char === "\"" || char === "'") quote = char;
            else if (char === ">") break;
        }
        if (end >= template.length) break;
        tags.push({ path, tag, attrs: text.slice(cursor, end), raw: text.slice(index, end + 1), line: text.slice(0, index).split("\n").length });
        index = end;
    }
    return tags;
};
const publicAllVuePaths = [...baseTree.keys()].filter((path) => /^(?:src|demo)\//.test(path) && path.endsWith(".vue")).sort();
const allPublicOpenings = publicAllVuePaths.flatMap((path) => publicOpeningTags(path, publicSource(path)));
const publicKebab = (value) => value.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const publicHasProp = (attrs, prop) => {
    const names = uniq([prop, publicKebab(prop)]).map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    return new RegExp(`(?:^|\\s)(?:(?:v-bind:|:)?(?:${names.join("|")}))(?:\\s*=|\\s|$)`).test(attrs);
};
for (const [index, row] of publicDefaults.rows.entries()) {
    check(row.id === `PDC-${String(index + 1).padStart(3, "0")}`, `${row.id} retains deterministic default source-order identity`);
    check(baseTree.get(row.path)?.oid === row.sourceBaseBlob, `${row.id} binds its exact source-base blob`);
    const text = publicSource(row.path);
    const lineText = text.split("\n")[row.line - 1];
    check(row.lineText === lineText.trim() && row.lineSha256 === sha(lineText), `${row.id} binds its exact source line and hash`);
    check(["CURRENT_RED", "REVIEWED_ENROLLMENT", "ALLOCATED_DELETE"].includes(row.status) && row.disposition.length >= 20 && row.basis.length >= 100 && row.acceptance.length >= 150, `${row.id} has one substantive authored disposition and acceptance property`);
    check(row.canonicalWaves.length > 0 && row.canonicalWaves.every((id) => waveIds.has(id)), `${row.id} names exact canonical wave owners`);
    check(row.findingIds.every((id) => renderedFindingById.has(id)) && row.interactionIds.every((id) => renderedInteractionById.has(id)), `${row.id} links only current rendered findings and interactions`);
    const occurrences = allPublicOpenings.filter((opening) => opening.tag === row.component).map((opening) => ({
        path: opening.path,
        line: opening.line,
        sourceBaseBlob: baseTree.get(opening.path).oid,
        propDisposition: publicHasProp(opening.attrs, row.prop) ? "EXPLICIT" : /(?:^|\s)v-bind\s*=/.test(opening.attrs) ? "SPREAD_INDETERMINATE" : "DEFAULT_APPLIES",
        openingTagSha256: sha(opening.raw),
    }));
    const usage = {
        total: occurrences.length,
        demo: occurrences.filter((item) => item.path.startsWith("demo/")).length,
        source: occurrences.filter((item) => item.path.startsWith("src/")).length,
        defaultApplies: occurrences.filter((item) => item.propDisposition === "DEFAULT_APPLIES").length,
        explicit: occurrences.filter((item) => item.propDisposition === "EXPLICIT").length,
        spreadIndeterminate: occurrences.filter((item) => item.propDisposition === "SPREAD_INDETERMINATE").length,
        demoDefaultApplies: occurrences.filter((item) => item.path.startsWith("demo/") && item.propDisposition === "DEFAULT_APPLIES").length,
        demoExplicit: occurrences.filter((item) => item.path.startsWith("demo/") && item.propDisposition === "EXPLICIT").length,
        demoSpreadIndeterminate: occurrences.filter((item) => item.path.startsWith("demo/") && item.propDisposition === "SPREAD_INDETERMINATE").length,
        paths: uniq(occurrences.map((item) => item.path)),
        occurrences,
    };
    check(JSON.stringify(usage) === JSON.stringify(row.firstPartyUsage), `${row.id} direct-tag usage and omission/override receipt is independently reproducible`);
}
const criticalPublicDefaultIds = publicDefaults.rows.filter((row) => row.status === "CURRENT_RED").map((row) => row.id);
check(sameSet(criticalPublicDefaultIds, ["PDC-020", "PDC-022", "PDC-028", "PDC-029", "PDC-064", "PDC-069", "PDC-132", "PDC-133", "PDC-136", "PDC-141", "PDC-142", "PDC-143", "PDC-144", "PDC-145", "PDC-146", "PDC-177", "PDC-211", "PDC-212", "PDC-213", "PDC-233", "PDC-237", "PDC-239", "PDC-241"]), "public-default audit retains exactly the twenty-three current RED declarations without inflating positive defaults into failures");
check(sameSet(uniq(publicDefaults.rows.flatMap((row) => row.findingIds)), ["RDA-013", "RDA-016", "RDA-027", "RDA-030", "RDA-034", "RDA-035", "RDA-036", "RDA-037", "RDA-038"]) && sameSet(uniq(publicDefaults.rows.flatMap((row) => row.interactionIds)), ["INT-013", "INT-016", "INT-023", "INT-027", "INT-028", "INT-029", "INT-030"]), "public-default RED declarations fold into the exact nine findings and seven live causal interactions");
const publicDefaultById = new Map(publicDefaults.rows.map((row) => [row.id, row]));
check(publicDefaultById.get("PDC-064").firstPartyUsage.demoDefaultApplies === 0 && publicDefaultById.get("PDC-177").firstPartyUsage.demoDefaultApplies === 0 && publicDefaultById.get("PDC-177").firstPartyUsage.demoExplicit === 2, "EasingPicker and Typewriter hidden omission paths remain explicit and Typewriter's default-on interaction is disabled in both stories");
check(publicDefaultById.get("PDC-145").findingIds.includes("RDA-037") && publicDefaultById.get("PDC-145").conceptDecision === "delete" && /zero-external-import layout wrapper/.test(publicDefaultById.get("PDC-145").basis), "StackedIconGroup hover default strengthens the existing consumer-bound deletion decision");
check(publicDefaultById.get("PDC-213").firstPartyUsage.total === 0 && publicDefaultById.get("PDC-213").findingIds.includes("RDA-038") && /zero source, demo, test, or external runtime consumers/.test(publicDefaultById.get("PDC-213").basis), "GlassCarouselPager loop default exposes a zero-consumer member fork rather than borrowing Carousel concept demand");
const publicDefaultsMd = readFileSync(join(ROOT, "PUBLIC-DEFAULT-CONTRACT-AUDIT.md"), "utf8");
check(/never a file roster/.test(publicDefaultsMd) && /no implementation or execution PASS credit/.test(publicDefaultsMd) && publicDefaults.rows.every((row) => publicDefaultsMd.includes(row.id)), "public-default narrative exposes every reviewed row while denying frozen roster and execution credit");

// Resolve the published component surface a second time without using the audit
// builder's module cache or result. This is formation provenance, not a permanent
// API roster: execution rediscovers the packed entry graph at the wave commit.
const publicMemberDemandBytes = readFileSync(join(ROOT, "public-component-member-demand-audit.json"), "utf8");
const publicMemberDemand = JSON.parse(publicMemberDemandBytes);
const publicMemberJudgments = json("public-component-member-judgment-audit.json");
check(publicMemberDemand.schemaVersion === "0.1.0" && publicMemberDemand.sourceBase === SOURCE_BASE && publicMemberDemand.status === "FORMATION_RESEARCH_ONLY", "public component-member demand discovery binds its schema, source base, and formation-only authority");
check(/No count is a gate/.test(publicMemberDemand.thresholdLaw) && /Every member still requires an authored/.test(publicMemberDemand.thresholdLaw), "public component-member discovery denies count/gate authority and demands exact product judgment");
check(publicMemberJudgments.schemaVersion === "1.0.0" && publicMemberJudgments.sourceBase === SOURCE_BASE && publicMemberJudgments.status === "FORMATION_ONLY__NOT_EXECUTION_AUTHORIZATION" && publicMemberJudgments.demandAuditSha256 === sha(publicMemberDemandBytes), "public component-member judgments bind exact demand bytes and deny execution authorization");
check(/used sibling/.test(publicMemberJudgments.law) && /cannot donate demand/.test(publicMemberJudgments.law), "public component-member law rejects sibling, internal, barrel, test, and inventory demand laundering");

const validationPackage = JSON.parse(readFileSync(join(REPO, "package.json"), "utf8"));
const validationEntrySet = buildEntrySet(readTree({ repoRoot: REPO })).entries;
const validationPublishedEntryNames = new Set(Object.keys(validationPackage.exports)
    .filter((key) => key === "." || (key.startsWith("./") && typeof validationPackage.exports[key] === "object" && validationPackage.exports[key]?.import))
    .map((key) => key === "." ? "index" : key.slice(2)));
const validationModuleCache = new Map();
const validationToRepoPath = (path) => relative(REPO, path).replaceAll("\\", "/");
const validationTypeName = /(?:Props|Emits|Type|Types|Options|Config|State|Context|Instance|Return|Api|Variant|Variants|Mode|Direction|Placement|Shape|Descriptor|Kind|Item|Event)$/;
const validationExternalComponentName = (name) => /^[A-Z][A-Za-z0-9]+$/.test(name) && !validationTypeName.test(name);
const validationResolveLocalModule = (fromFile, specifier) => {
    if (!specifier.startsWith(".")) return null;
    const base = resolve(dirname(fromFile), specifier);
    const candidates = extname(base) ? [base] : [base, `${base}.ts`, `${base}.tsx`, `${base}.vue`, resolve(base, "index.ts")];
    for (const candidate of candidates) {
        try {
            if (statSync(candidate).isFile()) return candidate;
        } catch {
            // Continue through the static candidate order.
        }
    }
    return null;
};
const validationModuleComponents = (file, stack = []) => {
    if (validationModuleCache.has(file)) return validationModuleCache.get(file);
    if (stack.includes(file)) return new Map();
    if (file.endsWith(".vue")) {
        const result = new Map([["default", { sourcePath: validationToRepoPath(file), origin: "LOCAL_VUE_SFC" }]]);
        validationModuleCache.set(file, result);
        return result;
    }
    const source = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const result = new Map();
    validationModuleCache.set(file, result);
    const nextStack = [...stack, file];
    for (const statement of source.statements) {
        if (!ts.isExportDeclaration(statement) || statement.isTypeOnly) continue;
        const specifier = statement.moduleSpecifier && ts.isStringLiteral(statement.moduleSpecifier) ? statement.moduleSpecifier.text : null;
        if (!specifier) continue;
        const local = validationResolveLocalModule(file, specifier);
        if (!statement.exportClause) {
            if (local) for (const [name, row] of validationModuleComponents(local, nextStack)) if (name !== "default") result.set(name, row);
            continue;
        }
        if (!ts.isNamedExports(statement.exportClause)) continue;
        for (const element of statement.exportClause.elements) {
            if (element.isTypeOnly) continue;
            const exportedName = element.name.text;
            const importedName = element.propertyName?.text ?? exportedName;
            if (local) {
                const target = validationModuleComponents(local, nextStack).get(importedName);
                if (target) result.set(exportedName, target);
            } else if (specifier === "reka-ui" && validationExternalComponentName(exportedName)) {
                result.set(exportedName, { sourcePath: `external:reka-ui#${importedName}`, origin: "UPSTREAM_REKA_COMPONENT_REEXPORT" });
            }
        }
    }
    return result;
};

const independentMemberSurface = [];
for (const [entryName, relPath] of Object.entries(validationEntrySet).sort(([a], [b]) => a.localeCompare(b))) {
    if (!validationPublishedEntryNames.has(entryName)) continue;
    const specifier = entryName === "index" ? "@mkbabb/glass-ui" : `@mkbabb/glass-ui/${entryName}`;
    for (const [exportedName, component] of validationModuleComponents(resolve(REPO, relPath))) {
        independentMemberSurface.push({ exportedName, sourcePath: component.sourcePath, origin: component.origin, specifier, entrySourcePath: relPath });
    }
}
const independentMembersByKey = new Map();
for (const row of independentMemberSurface) {
    const key = `${row.sourcePath}\0${row.exportedName}`;
    if (!independentMembersByKey.has(key)) independentMembersByKey.set(key, {
        exportedName: row.exportedName,
        sourcePath: row.sourcePath,
        origins: [],
        publishedSpecifiers: [],
        entrySourcePaths: [],
    });
    const member = independentMembersByKey.get(key);
    member.origins.push(row.origin);
    member.publishedSpecifiers.push(row.specifier);
    member.entrySourcePaths.push(row.entrySourcePath);
}
const independentMemberProjection = [...independentMembersByKey.values()].map((row) => ({
    ...row,
    origins: sorted(uniq(row.origins)),
    publishedSpecifiers: sorted(uniq(row.publishedSpecifiers)),
    entrySourcePaths: sorted(uniq(row.entrySourcePaths)),
})).sort((a, b) => a.exportedName.localeCompare(b.exportedName) || a.sourcePath.localeCompare(b.sourcePath));
const auditedMemberProjection = publicMemberDemand.members.map((row) => ({
    exportedName: row.exportedName,
    sourcePath: row.sourcePath,
    origins: row.origins,
    publishedSpecifiers: row.publishedSpecifiers,
    entrySourcePaths: row.entrySourcePaths,
}));
check(JSON.stringify(independentMemberProjection) === JSON.stringify(auditedMemberProjection), "public component-member demand rows exactly equal an independent recursive published-barrel derivation");
check(publicMemberDemand.counts.publishedEntryPoints === validationPublishedEntryNames.size && publicMemberDemand.counts.publicComponentMembers === independentMemberProjection.length && publicMemberDemand.members.length === independentMemberProjection.length, "public component-member discovery counts are projections of the independently resolved entry graph rather than acceptance quotas");
check(publicMemberDemand.members.every((row, index) => row.id === `PCM-${String(index + 1).padStart(3, "0")}`) && new Set(publicMemberDemand.members.map((row) => row.id)).size === publicMemberDemand.members.length, "public component-member rows have deterministic unique evidence identities");

const publicMemberByName = new Map(publicMemberDemand.members.map((row) => [row.exportedName, row]));
const judgmentByName = new Map(publicMemberJudgments.rows.map((row) => [row.exportedName, row]));
check(publicMemberJudgments.rowCount === publicMemberDemand.members.length && publicMemberJudgments.rows.length === publicMemberDemand.members.length && judgmentByName.size === publicMemberDemand.members.length && sameSet([...judgmentByName.keys()], [...publicMemberByName.keys()]), "every exact discovered public component member receives exactly one judgment");
check(Object.keys(MEMBER_JUDGMENT_OVERRIDES).every((name) => publicMemberByName.has(name)) && publicMemberJudgments.rows.filter((row) => row.judgmentSource === "EXACT_AUTHORED_OVERRIDE").length === Object.keys(MEMBER_JUDGMENT_OVERRIDES).length, "every authored member exception names one real exact member and no implicit exception exists");

const judgmentProjection = (row) => ({
    disposition: row.disposition,
    target: row.target,
    ownerWaves: row.ownerWaves,
    rationale: row.rationale,
    acceptancePredicate: row.acceptancePredicate,
    negativeControl: row.negativeControl,
    judgmentSource: row.judgmentSource,
});
for (const member of publicMemberDemand.members) {
    const row = judgmentByName.get(member.exportedName);
    check(row.id === member.id && row.sourcePath === member.sourcePath && sameSet(row.publishedSpecifiers, member.publishedSpecifiers) && JSON.stringify(row.evidence) === JSON.stringify({
        causalExternalRuntime: member.causalExternalRuntimeEvidence,
        foreignDemo: member.foreignDemoEvidence,
        firstPartyDemo: member.firstPartyDemoWitnessPaths,
        internalComposition: member.internalCompositionWitnessPaths,
        wrongOrRetiredSpecifier: member.misprojectedForeignEvidence,
    }), `${member.id}:${member.exportedName} judgment preserves its exact discovery coordinate and evidence`);
    check(JSON.stringify(judgmentProjection(row)) === JSON.stringify(judgmentProjection(resolveMemberJudgment(member))), `${member.id}:${member.exportedName} artifact exactly projects the authored judgment registry/rule`);
    check(row.ownerWaves.length > 0 && row.ownerWaves.every((id) => waveIds.has(id)) && row.rationale.length >= 100 && row.acceptancePredicate.length >= 180 && row.negativeControl.length >= 100 && !/PENDING|TBD|covered generally/i.test(`${row.disposition} ${row.rationale} ${row.acceptancePredicate}`), `${member.id}:${member.exportedName} has substantive exact owners, acceptance, and retained RED control with no silent/general disposition`);
    if (/INTERNAL_COMPOSITION_PUBLICATION_JUDGMENT_REQUIRED|ZERO_CAUSAL_DEMAND_PUBLICATION_JUDGMENT_REQUIRED/.test(member.discoveryDisposition)) {
        check(row.judgmentSource === "EXACT_AUTHORED_OVERRIDE" || member.conceptDecision !== "retain", `${member.id}:${member.exportedName} internal/zero-witness retained-concept publication is decided explicitly rather than by a broad rule`);
    }
}
const derivedJudgmentCounts = Object.fromEntries([...new Set(publicMemberJudgments.rows.map((row) => row.disposition))].sort().map((value) => [value, publicMemberJudgments.rows.filter((row) => row.disposition === value).length]));
check(JSON.stringify(derivedJudgmentCounts) === JSON.stringify(publicMemberJudgments.dispositionCounts), "member disposition counts are derived bookkeeping and do not define semantic success");
const sameSourceAliases = [...new Set(publicMemberDemand.members.map((row) => row.sourcePath))].map((sourcePath) => publicMemberDemand.members.filter((row) => row.sourcePath === sourcePath)).filter((rows) => rows.length > 1);
check(sameSourceAliases.length === 1 && sameSet(sameSourceAliases[0].map((row) => row.exportedName), ["HandMark", "InkMark"]), "recursive publication discovery exposes the sole same-source component alias pair exactly");
check(judgmentByName.get("HandMark")?.disposition === "RETAIN_CANONICAL_PUBLIC_NAME" && judgmentByName.get("InkMark")?.disposition === "MIGRATE_CONSUMERS_DELETE_SOURCE_ALIAS" && sameSet(judgmentByName.get("InkMark")?.ownerWaves ?? [], ["BI.W-P004", "BI.W-P051", "BI.W-P133"]), "HandMark remains canonical and both exact Atlas InkMark consumers are routed to migration without alias retention");
check(["CarouselNext", "CarouselPrevious", "GlassCarouselPager"].every((name) => judgmentByName.get(name)?.disposition === "DELETE_REDUNDANT_PUBLIC_MEMBER") && ["ComboboxCancel", "ComboboxSeparator", "ComboboxViewport"].every((name) => /^DELETE_SPECULATIVE_/.test(judgmentByName.get(name)?.disposition ?? "")), "zero-witness sibling and speculative members have exact deletion rather than inherited concept demand");
check(["ProgressDefault", "ProgressGradient", "ProgressLiquid", "ProgressSectioned", "DataTablePagination", "DrawerOverlay", "SelectScrollDownButton", "SelectScrollUpButton"].every((name) => judgmentByName.get(name)?.disposition === "REMOVE_PUBLIC_EXPORT_KEEP_PRIVATE_OWNER_PART"), "all eight internal owner parts lose publication while retaining owner behavior");
check(judgmentByName.get("DialogScrollContent")?.disposition === "FOLD_PUBLIC_MEMBER_INTO_CANONICAL_AXIS" && judgmentByName.get("DrawerPortal")?.disposition === "DELETE_REDUNDANT_UPSTREAM_REEXPORT" && judgmentByName.get("DropdownMenuPortal")?.disposition === "DELETE_REDUNDANT_UPSTREAM_REEXPORT" && judgmentByName.get("CommandDialog")?.disposition === "RETAIN_PUBLIC_ADD_DIRECT_DEMO", "scroll/portal collapse and CommandDialog demo repair retain their distinct exact dispositions");
const publicMemberJudgmentMd = readFileSync(join(ROOT, "PUBLIC-COMPONENT-MEMBER-JUDGMENT-AUDIT.md"), "utf8");
check(/FORMATION-ONLY; NOT EXECUTION AUTHORIZATION/.test(publicMemberJudgmentMd) && /No count above is a gate/.test(publicMemberJudgmentMd) && publicMemberJudgments.rows.every((row) => publicMemberJudgmentMd.includes(row.id)), "member judgment narrative exposes every exact row while denying gate/execution credit");
const specimenWaveSubjects = new Set(waveById.get("BI.W-P059").subjects.map((row) => row.path));
check(["build-public-component-member-demand-audit.mjs", "public-component-member-demand-audit.json", "PUBLIC-COMPONENT-MEMBER-DEMAND-AUDIT.md", "public-component-member-judgments.registry.mjs", "build-public-component-member-judgment-audit.mjs", "public-component-member-judgment-audit.json", "PUBLIC-COMPONENT-MEMBER-JUDGMENT-AUDIT.md"].every((name) => specimenWaveSubjects.has(`docs/tranches/BI/FORMATION/${name}`)), "P059 explicitly consumes every exact-member formation artifact rather than relying on implicit broad scope");

// Exhaustive source-event discovery is a formation completeness assay, never a
// replacement execution roster. Recompute exact quote-aware opening-tag receipts
// from the bound source base so a parser regression cannot silently erase controls.
const semanticOperability = json("semantic-operability-census.json");
check(semanticOperability.schemaVersion === "1.0.0" && semanticOperability.sourceBase === SOURCE_BASE && semanticOperability.generatedAt === "2026-07-14" && semanticOperability.status === "FORMATION_RESEARCH_ONLY", "semantic-operability census binds schema, source base, date, and research-only status");
check(semanticOperability.authority === "DESCRIPTIVE_SOURCE_DISCOVERY_AND_REVIEW__NEVER_EXECUTION_PASS__RUNTIME_REACHABILITY_REDISCOVERS_CONTROLS" && /Counts describe the frozen source only/.test(semanticOperability.method) && /TypeScript AST/.test(semanticOperability.method) && /composed semantic control and causal action/.test(semanticOperability.governingPrinciple), "semantic-operability census denies roster, tag-spelling, and execution-pass authority while naming both discovery methods");
check(semanticOperability.rows.length === 184 && new Set(semanticOperability.rows.map((row) => row.id)).size === 184, "semantic-operability census contains 184 unique reviewed event-host rows");
check(semanticOperability.imperativeRows.length === 18 && new Set(semanticOperability.imperativeRows.map((row) => row.id)).size === 18, "semantic-operability census contains eighteen unique reviewed imperative/render-function rows");
check(semanticOperability.counts.vueSourceFiles === 370 && semanticOperability.counts.eventHostRows === 184 && semanticOperability.counts.distinctEventHostFiles === 88 && semanticOperability.counts.intrinsicControlRows === 46 && semanticOperability.counts.typedControlComponentRows === 103 && semanticOperability.counts.currentRedRows === 12 && semanticOperability.counts.currentRedFindings === 7 && semanticOperability.counts.propagationOnlyRows === 3 && semanticOperability.counts.activationRows === 165 && semanticOperability.counts.directManipulationRows === 9 && semanticOperability.counts.keyboardHandlerRows === 15 && semanticOperability.counts.imperativeEventRows === 18 && semanticOperability.counts.imperativeDistinctFiles === 14 && semanticOperability.counts.imperativeCurrentRedRows === 2 && semanticOperability.counts.imperativeCurrentRedFindings === 2 && semanticOperability.counts.totalReviewedSourceHosts === 202 && semanticOperability.counts.totalCurrentRedSourceHosts === 14, "semantic-operability census retains both complete frozen-source discovery receipts without making their cardinalities normative");
check(JSON.stringify(semanticOperability.counts.tagCounts) === JSON.stringify({ Blob: 1, button: 43, Button: 85, Card: 2, component: 2, ContinuousMarkers: 1, ContinuousTimeline: 1, div: 14, DockControl: 16, GlassTimeline: 2, input: 3, li: 2, Primitive: 2, SegmentedTimeline: 1, span: 2, Surface: 1, svg: 1, TableCell: 2, TableHead: 1, TableRow: 2 }), "semantic-operability tag census exposes intrinsic, polymorphic, SVG, table, list, and composed custom hosts");
check(JSON.stringify(semanticOperability.counts.imperativeEventCounts) === JSON.stringify({ click: 2, contextmenu: 1, keydown: 2, pointerdown: 9, touchstart: 4 }) && JSON.stringify(semanticOperability.counts.imperativeSyntaxCounts) === JSON.stringify({ IMPERATIVE_DOM_LISTENER: 17, INTRINSIC_RENDER_FUNCTION_HANDLER: 1 }), "semantic-operability imperative census exposes exact event and authoring-syntax receipts");
const semanticMask = (value) => value.replace(/[^\n]/g, " ");
const quoteAwareOpenings = (text) => {
    let templateText = text;
    for (const regex of [/<script\b[\s\S]*?<\/script\s*>/gi, /<style\b[\s\S]*?<\/style\s*>/gi, /<!--[\s\S]*?-->/g]) templateText = templateText.replace(regex, semanticMask);
    const openings = [];
    for (let index = 0; index < templateText.length; index += 1) {
        if (templateText[index] !== "<" || !/[A-Za-z]/.test(templateText[index + 1] ?? "")) continue;
        let cursor = index + 1;
        while (/[\w.-]/.test(templateText[cursor] ?? "")) cursor += 1;
        const tag = templateText.slice(index + 1, cursor);
        let quote = null;
        let end = cursor;
        for (; end < templateText.length; end += 1) {
            const char = templateText[end];
            if (quote) {
                if (char === quote && templateText[end - 1] !== "\\") quote = null;
            } else if (char === "\"" || char === "'") quote = char;
            else if (char === ">") break;
        }
        if (end >= templateText.length) break;
        openings.push({ tag, line: text.slice(0, index).split("\n").length, openingTagSha256: sha(text.slice(index, end + 1)) });
        index = end;
    }
    return openings;
};
const semanticSourceCache = new Map();
const semanticSource = (path) => {
    if (!semanticSourceCache.has(path)) semanticSourceCache.set(path, execFileSync("git", ["show", `${SOURCE_BASE}:${path}`], { cwd: REPO, encoding: "utf8", maxBuffer: 8 * 1024 * 1024 }));
    return semanticSourceCache.get(path);
};
const semanticAllowedEvents = new Set(["click", "dblclick", "pointerdown", "mousedown", "touchstart", "keydown", "keyup", "keypress"]);
for (const [index, row] of semanticOperability.rows.entries()) {
    check(row.id === `SOH-${String(index + 1).padStart(3, "0")}`, `${row.id} retains deterministic source-order identity`);
    check(baseTree.get(row.path)?.oid === row.sourceBaseBlob, `${row.id} binds its exact source-base blob`);
    const text = semanticSource(row.path);
    const lineText = text.split("\n")[row.line - 1];
    check(row.lineText === lineText.trim() && row.lineSha256 === sha(lineText), `${row.id} binds its exact source line and hash`);
    check(quoteAwareOpenings(text).some((opening) => opening.tag === row.tag && opening.line === row.line && opening.openingTagSha256 === row.openingTagSha256), `${row.id} binds an exact quote-aware opening-tag hash`);
    check(row.events.length > 0 && row.events.every((event) => semanticAllowedEvents.has(event.name) && Array.isArray(event.modifiers) && (event.expression === null || typeof event.expression === "string")), `${row.id} has only enrolled activation, manipulation, or keyboard directives`);
    check(["REVIEWED_ENROLLMENT", "CURRENT_RED"].includes(row.status) && row.disposition.length >= 20 && row.basis.length >= 80 && row.acceptance.length >= 100, `${row.id} has one substantive reviewed disposition and acceptance property`);
    check(row.ownerWaves.length > 0 && row.ownerWaves.every((id) => waveIds.has(id)), `${row.id} names exact canonical wave owners`);
    check(row.findingIds.every((id) => renderedFindingById.has(id)) && row.interactionIds.every((id) => renderedInteractionById.has(id)), `${row.id} links only current rendered findings and interactions`);
}
check(sameSet(uniq(semanticOperability.rows.flatMap((row) => row.findingIds)), ["RDA-013", "RDA-027", "RDA-031", "RDA-032", "RDA-033", "RDA-034", "RDA-035"]), "semantic-operability RED rows map exactly to seven current causal or public-contract findings");
check(semanticOperability.rows.filter((row) => row.status === "CURRENT_RED").length === 12 && semanticOperability.rows.filter((row) => row.propagationOnly).every((row) => row.disposition === "PROPAGATION_ONLY_NOT_AN_OPERABLE_SURFACE"), "semantic-operability dispositions separate twelve RED hosts from three propagation-only noncontrols");

// Independently reparse every tracked TS/JS unit and Vue script. The census
// generator is not allowed to attest to its own completeness: exact occurrence
// identity is path + line + event + syntax kind + syntax digest.
const imperativeAllowedEvents = new Set([...semanticAllowedEvents, "contextmenu"]);
const semanticCodePaths = [...baseTree.keys()]
    .filter((path) => /^(?:src|demo)\//.test(path) && /\.(?:[cm]?[jt]sx?|vue)$/.test(path))
    .sort();
const semanticScriptKind = (path) => {
    if (/\.tsx$/.test(path)) return ts.ScriptKind.TSX;
    if (/\.jsx$/.test(path)) return ts.ScriptKind.JSX;
    if (/\.[cm]?js$/.test(path)) return ts.ScriptKind.JS;
    return ts.ScriptKind.TS;
};
const semanticScriptUnits = (path, text) => {
    if (!path.endsWith(".vue")) return [{ text, offset: 0, kind: semanticScriptKind(path) }];
    return [...text.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script\s*>/gi)].map((match) => ({
        text: match[1],
        offset: match.index + match[0].indexOf(match[1]),
        kind: /\blang\s*=\s*["']tsx["']/.test(match[0]) ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    }));
};
const semanticPropertyName = (node, sourceFile) => {
    if (!node) return null;
    if (ts.isIdentifier(node) || ts.isStringLiteralLike(node)) return node.text;
    return node.getText(sourceFile);
};
const imperativeReceipts = [];
for (const path of semanticCodePaths) {
    const text = semanticSource(path);
    for (const unit of semanticScriptUnits(path, text)) {
        const sourceFile = ts.createSourceFile(path, unit.text, ts.ScriptTarget.Latest, true, unit.kind);
        const addReceipt = ({ occurrenceNode, syntaxKind, tag = null, event }) => {
            const start = unit.offset + occurrenceNode.getStart(sourceFile);
            const end = unit.offset + occurrenceNode.end;
            imperativeReceipts.push({
                path,
                line: text.slice(0, start).split("\n").length,
                syntaxKind,
                tag,
                event,
                syntaxSha256: sha(text.slice(start, end)),
            });
        };
        const visit = (node) => {
            if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && node.expression.name.text === "addEventListener") {
                const eventArg = node.arguments[0];
                if (eventArg && ts.isStringLiteralLike(eventArg) && imperativeAllowedEvents.has(eventArg.text)) addReceipt({
                    occurrenceNode: node,
                    syntaxKind: "IMPERATIVE_DOM_LISTENER",
                    event: eventArg.text,
                });
            }
            if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "h") {
                const [tagArg, propsArg] = node.arguments;
                if (tagArg && ts.isStringLiteralLike(tagArg) && propsArg && ts.isObjectLiteralExpression(propsArg)) {
                    for (const prop of propsArg.properties) {
                        const name = semanticPropertyName(prop.name, sourceFile);
                        if (!name || !/^on[A-Z]/.test(name)) continue;
                        const event = name.slice(2).toLowerCase();
                        if (!imperativeAllowedEvents.has(event)) continue;
                        addReceipt({ occurrenceNode: prop, syntaxKind: "INTRINSIC_RENDER_FUNCTION_HANDLER", tag: tagArg.text, event });
                    }
                }
            }
            ts.forEachChild(node, visit);
        };
        visit(sourceFile);
    }
}
imperativeReceipts.sort((a, b) => a.path.localeCompare(b.path) || a.line - b.line || a.event.localeCompare(b.event));
const imperativeProjection = (row) => ({ path: row.path, line: row.line, syntaxKind: row.syntaxKind, tag: row.tag, event: row.event, syntaxSha256: row.syntaxSha256 });
check(JSON.stringify(imperativeReceipts) === JSON.stringify(semanticOperability.imperativeRows.map(imperativeProjection)), "semantic-operability imperative rows exactly equal an independent full-tree TypeScript AST derivation");
for (const [index, row] of semanticOperability.imperativeRows.entries()) {
    check(row.id === `IOH-${String(index + 1).padStart(3, "0")}`, `${row.id} retains deterministic imperative source-order identity`);
    check(baseTree.get(row.path)?.oid === row.sourceBaseBlob, `${row.id} binds its exact source-base blob`);
    const text = semanticSource(row.path);
    const lineText = text.split("\n")[row.line - 1];
    check(row.lineText === lineText.trim() && row.lineSha256 === sha(lineText), `${row.id} binds its exact source line and hash`);
    check(imperativeAllowedEvents.has(row.event) && ["IMPERATIVE_DOM_LISTENER", "INTRINSIC_RENDER_FUNCTION_HANDLER"].includes(row.syntaxKind) && row.syntaxText.length > 0 && row.syntaxSha256.length === 64, `${row.id} names an enrolled event and exact imperative syntax receipt`);
    check(["REVIEWED_ENROLLMENT", "CURRENT_RED"].includes(row.status) && row.disposition.length >= 20 && row.basis.length >= 80 && row.acceptance.length >= 100, `${row.id} has one substantive reviewed disposition and acceptance property`);
    check(row.ownerWaves.length > 0 && row.ownerWaves.every((id) => waveIds.has(id)), `${row.id} names exact canonical wave owners`);
    check(row.findingIds.every((id) => renderedFindingById.has(id)) && row.interactionIds.every((id) => renderedInteractionById.has(id)), `${row.id} links only current rendered findings and interactions`);
}
check(sameSet(uniq(semanticOperability.imperativeRows.flatMap((row) => row.findingIds)), ["RDA-016", "RDA-036"]) && sameSet(uniq(semanticOperability.imperativeRows.flatMap((row) => row.interactionIds)), ["INT-016", "INT-028"]), "imperative RED rows map exactly to Constellation and Drawer causal findings");
check(semanticOperability.imperativeRows.filter((row) => row.status === "CURRENT_RED").length === 2 && sameSet(uniq([...semanticOperability.rows, ...semanticOperability.imperativeRows].flatMap((row) => row.findingIds)), ["RDA-013", "RDA-016", "RDA-027", "RDA-031", "RDA-032", "RDA-033", "RDA-034", "RDA-035", "RDA-036"]), "combined semantic source review separates fourteen RED hosts and nine causal findings from reviewed positive enrollment");
const semanticOperabilityMd = readFileSync(join(ROOT, "SEMANTIC-OPERABILITY-CENSUS.md"), "utf8");
check(/not execution PASS/.test(semanticOperabilityMd) && /never a file roster/.test(semanticOperabilityMd) && /TypeScript AST/.test(semanticOperabilityMd) && [...semanticOperability.rows, ...semanticOperability.imperativeRows].every((row) => semanticOperabilityMd.includes(row.id)), "semantic-operability narrative exposes every template and imperative row while denying frozen roster and execution credit");
check(/formation research only/i.test(readFileSync(join(ROOT, "RENDERED-DEMO-AUDIT.md"), "utf8")) && /neither native Safari nor native Chrome/i.test(readFileSync(join(ROOT, "RENDERED-DEMO-AUDIT.md"), "utf8")), "rendered-demo narrative visibly denies execution and native-browser credit");

// First-principles procedural allocation: exact source reachability plus actual
// direct demos decide a proportionate renderer per product; parity is not a quota.
const proceduralAudit = json("procedural-first-principles-audit.json");
check(proceduralAudit.schemaVersion === "1.0.0" && proceduralAudit.sourceBase === SOURCE_BASE && proceduralAudit.generatedAt === "2026-07-14" && proceduralAudit.status === "FORMATION_RESEARCH_ONLY", "procedural first-principles audit binds schema, source base, date, and research-only status");
check(proceduralAudit.rowCount === 9 && proceduralAudit.componentRows === 8 && proceduralAudit.sourceWitnessCount === 22 && proceduralAudit.liveRouteCount === 9, "procedural audit covers shared substrate, all eight component concepts, twenty-two source witnesses, and nine direct demos");
check(sameSet(proceduralAudit.rows.map((row) => row.id), ["PROC-000", "PROC-001", "PROC-002", "PROC-003", "PROC-004", "PROC-005", "PROC-006", "PROC-007", "PROC-008"]), "procedural audit row identities are exact and unique");
for (const row of proceduralAudit.rows) {
    check(row.evidenceCredit === "FORMATION_RESEARCH_ONLY__NOT_EXECUTION__NOT_NATIVE_PI" && row.model.length >= 100 && row.productResolution.length >= 140 && row.requiredStates.length >= 9, `${row.id} has substantive product reasoning, state coverage, and no execution credit`);
    check(row.canonicalWaves.length > 0 && row.canonicalWaves.every((id) => waveIds.has(id)), `${row.id} names only canonical owner waves`);
    if (row.conceptId) {
        const component = consumerAssay.concepts.find((candidate) => candidate.conceptId === row.conceptId);
        check(component && row.consumerEvidence.decision === component.decision && row.consumerEvidence.externalImportClauseCount === component.externalImportClauseCount && sameSet(row.consumerEvidence.externalRepositories, component.externalRepositories) && sameSet(row.consumerEvidence.currentFirstPartyDemos, component.currentFirstPartyDemos) && sameSet(row.consumerEvidence.canonicalWaves, component.canonicalWaves), `${row.id} reproduces exact component-consumer evidence`);
    } else check(row.consumerEvidence === null, `${row.id} shared substrate does not masquerade as a component-consumer row`);
    for (const item of row.sourceWitnesses) {
        check(baseTree.get(item.path)?.oid === item.sourceBaseBlob, `${row.id}:${item.path} source witness binds the source-base blob`);
        const sourceLines = execFileSync("git", ["show", `${SOURCE_BASE}:${item.path}`], { cwd: REPO, encoding: "utf8", maxBuffer: 128 * 1024 * 1024 }).split("\n");
        const sourceLine = sourceLines[item.line - 1];
        check(item.line >= 1 && item.excerpt === sourceLine.trim() && item.lineSha256 === sha(sourceLine), `${row.id}:${item.path}:${item.line} exact source line and digest remain current`);
    }
    for (const item of row.liveEvidence) {
        const desktop = renderedAudit.runs.desktop.rows.find((candidate) => candidate.requestedPath === item.route);
        const mobile = renderedAudit.runs.mobile.rows.find((candidate) => candidate.requestedPath === item.route);
        check(desktop && mobile && !desktop.redirected && !mobile.redirected && item.desktop.screenshotSha256 === desktop.screenshot.sha256 && item.mobile.screenshotSha256 === mobile.screenshot.sha256 && item.desktop.canvases === desktop.counts.canvases && item.mobile.canvases === mobile.counts.canvases, `${row.id}:${item.route} binds direct desktop/mobile rendered evidence exactly`);
    }
    check(sameSet(row.findingIds, row.findings.map((item) => item.id)) && row.findings.every((item) => {
        const source = renderedFindingById.get(item.id);
        return source && item.status === source.status && item.finding === source.finding;
    }), `${row.id} binds every procedural finding to the rendered research ledger`);
    check(sameSet(row.interactionIds, row.interactions.map((item) => item.id)) && row.interactions.every((item) => {
        const source = renderedInteractionById.get(item.id);
        return source && item.route === source.route && item.observation === source.observation && JSON.stringify(item.values) === JSON.stringify(source.values);
    }), `${row.id} binds every procedural interaction to the exercised rendered observation`);
}
const proceduralById = new Map(proceduralAudit.rows.map((row) => [row.id, row]));
check(proceduralAudit.rows.filter((row) => row.decision === "retain-dual-engine").length === 4 && sameSet(proceduralAudit.rows.filter((row) => row.decision === "retain-dual-engine").map((row) => row.conceptId), ["aurora", "blob", "fourier-field", "liquid-grid"]), "only the four per-pixel/compute procedural products retain dual-engine parity work");
check(proceduralById.get("PROC-002").findingIds.includes("RDA-031") && sameSet(proceduralById.get("PROC-002").interactionIds, ["INT-024"]) && /named semantic control/.test(proceduralById.get("PROC-002").productResolution) && /decorative and aria-hidden Blob instances mount no operable hit layer/.test(proceduralById.get("PROC-002").productResolution), "Blob procedural allocation retains its proportionate SDF renderer while separately owning causal semantic press and decorative-surface behavior");
check(proceduralById.get("PROC-003").decision === "retain-single-canvas2d" && /64-node CPU scan/.test(proceduralById.get("PROC-003").productResolution) && /seven direct instances/.test(proceduralById.get("PROC-003").productResolution) && /decorative or aria-hidden instances delete the listener/.test(proceduralById.get("PROC-003").productResolution) && proceduralById.get("PROC-003").requiredStates.includes("zero GPU contexts") && proceduralById.get("PROC-003").requiredStates.includes("keyboard/touch parity"), "Constellation first-principles allocation selects one Canvas2D renderer and resolves decorative-versus-semantic pointer behavior from model, API, instance, and resource facts");
check(proceduralById.get("PROC-006").decision === "retain-svg" && proceduralById.get("PROC-007").decision === "retain-svg-css" && proceduralById.get("PROC-008").decision === "rehome-private", "HandMark, WatercolorDot, and Goo facilities retain their proportionate SVG/CSS/private ownership decisions");
const proceduralMd = readFileSync(join(ROOT, "PROCEDURAL-FIRST-PRINCIPLES-AUDIT.md"), "utf8");
check(proceduralAudit.rows.every((row) => proceduralMd.includes(row.id) && proceduralMd.includes(row.name)) && /Renderer uniformity is not a product principle/.test(proceduralMd) && /no implementation, native Safari\/Chrome π/.test(proceduralMd), "procedural narrative covers every row, rejects renderer quotas, and denies execution/native-browser credit");

// First-principles motion allocation. The inventory is exhaustive for the
// bound tree but its cardinalities are descriptive: implementation must be
// free to remove, add, or change an appropriate mechanism without placating a
// frozen file/count oracle.
const motionAudit = json("motion-first-principles-audit.json");
check(motionAudit.schemaVersion === "1.0.0" && motionAudit.sourceBase === SOURCE_BASE && motionAudit.generatedAt === "2026-07-14" && motionAudit.status === "FORMATION_RESEARCH_ONLY", "motion first-principles audit binds schema, source base, date, and research-only status");
check(motionAudit.rowCount === motionAudit.rows.length && motionAudit.sourceWitnessCount === motionAudit.rows.reduce((sum, row) => sum + row.sourceWitnesses.length, 0) && motionAudit.directLiveRouteCount === new Set(motionAudit.rows.flatMap((row) => row.liveRoutes)).size, "motion audit derives its row, witness, and direct-route census rather than using the census as a product threshold");
check(sameSet(motionAudit.rows.map((row) => row.id), ["MOT-000", "MOT-001", "MOT-002", "MOT-003", "MOT-004", "MOT-005", "MOT-006", "MOT-007", "MOT-008", "MOT-009", "MOT-010"]), "motion audit covers the eleven authored mechanism/channel families with exact unique identities");
check(/One temporal authority per property\/episode, not one callback/.test(motionAudit.governingPrinciple), "motion governing principle rejects the literal application-wide one-clock quota");
for (const row of motionAudit.rows) {
    check(row.evidenceCredit === "FORMATION_RESEARCH_ONLY__NOT_EXECUTION__NOT_NATIVE_PI" && row.model.length >= 100 && row.productResolution.length >= 180 && row.requiredStates.length >= 9, `${row.id} has substantive product reasoning, state coverage, and no execution credit`);
    check(row.canonicalWaves.length > 0 && row.canonicalWaves.every((id) => waveIds.has(id)), `${row.id} names only canonical owner waves`);
    check(sameSet(row.conceptIds, row.consumerEvidence.map((item) => item.conceptId)), `${row.id} concept identities and consumer receipts agree exactly`);
    for (const evidence of row.consumerEvidence) {
        const component = consumerAssay.concepts.find((candidate) => candidate.conceptId === evidence.conceptId);
        check(component && evidence.decision === component.decision && evidence.externalImportClauseCount === component.externalImportClauseCount && sameSet(evidence.externalRepositories, component.externalRepositories) && sameSet(evidence.currentFirstPartyDemos, component.currentFirstPartyDemos) && sameSet(evidence.canonicalWaves, component.canonicalWaves), `${row.id}:${evidence.conceptId} reproduces exact component-consumer evidence`);
    }
    for (const item of row.sourceWitnesses) {
        check(baseTree.get(item.path)?.oid === item.sourceBaseBlob, `${row.id}:${item.path} source witness binds the source-base blob`);
        const sourceLines = execFileSync("git", ["show", `${SOURCE_BASE}:${item.path}`], { cwd: REPO, encoding: "utf8", maxBuffer: 128 * 1024 * 1024 }).split("\n");
        const sourceLine = sourceLines[item.line - 1];
        check(item.line >= 1 && item.excerpt === sourceLine.trim() && item.lineSha256 === sha(sourceLine), `${row.id}:${item.path}:${item.line} exact source line and digest remain current`);
    }
    for (const item of row.liveEvidence) {
        const desktop = renderedAudit.runs.desktop.rows.find((candidate) => candidate.requestedPath === item.route);
        const mobile = renderedAudit.runs.mobile.rows.find((candidate) => candidate.requestedPath === item.route);
        check(desktop && mobile && !desktop.redirected && !mobile.redirected && item.desktop.screenshotSha256 === desktop.screenshot.sha256 && item.mobile.screenshotSha256 === mobile.screenshot.sha256 && item.desktop.canvases === desktop.counts.canvases && item.mobile.canvases === mobile.counts.canvases, `${row.id}:${item.route} binds direct desktop/mobile rendered evidence exactly`);
    }
    check(sameSet(row.findingIds, row.findings.map((item) => item.id)) && row.findings.every((item) => {
        const source = renderedFindingById.get(item.id);
        return source && item.status === source.status && item.finding === source.finding;
    }), `${row.id} binds every motion finding to the rendered research ledger`);
    check(sameSet(row.interactionIds, row.interactions.map((item) => item.id)) && row.interactions.every((item) => {
        const source = renderedInteractionById.get(item.id);
        return source && item.route === source.route && item.observation === source.observation && JSON.stringify(item.values) === JSON.stringify(source.values);
    }), `${row.id} binds every motion interaction to the exercised rendered observation`);
}
const motionById = new Map(motionAudit.rows.map((row) => [row.id, row]));
check(/keyframes import is not an exemption/.test(motionById.get("MOT-000").productResolution) && sameSet(motionById.get("MOT-000").findingIds, ["RDA-018", "RDA-019", "RDA-020", "RDA-024", "RDA-025", "RDA-026", "RDA-030"]) && motionById.get("MOT-000").interactionIds.includes("INT-020") && motionById.get("MOT-000").interactionIds.includes("INT-021") && motionById.get("MOT-000").interactionIds.includes("INT-022") && motionById.get("MOT-000").interactionIds.includes("INT-023") && /editor-local normalized one-shot/.test(motionById.get("MOT-000").productResolution) && /fixed-clock scrim/.test(motionById.get("MOT-000").productResolution), "temporal authority is property/episode based, cannot be laundered by an engine import, and evaluates composed, consumer-owned, demo-orchestrator, and editor-preview clock propagation");
check(motionById.get("MOT-001").findingIds.includes("RDA-021") && motionById.get("MOT-001").findingIds.includes("RDA-024") && motionById.get("MOT-001").findingIds.includes("RDA-025") && motionById.get("MOT-001").findingIds.includes("RDA-026") && motionById.get("MOT-001").findingIds.includes("RDA-027") && motionById.get("MOT-001").findingIds.includes("RDA-028") && motionById.get("MOT-001").findingIds.includes("RDA-029") && motionById.get("MOT-001").findingIds.includes("RDA-030") && motionById.get("MOT-001").interactionIds.includes("INT-019") && motionById.get("MOT-001").interactionIds.includes("INT-020") && motionById.get("MOT-001").interactionIds.includes("INT-021") && motionById.get("MOT-001").interactionIds.includes("INT-022") && motionById.get("MOT-001").interactionIds.includes("INT-023") && /Delete suite\.ts, curves\.ts, \/motion-curves/.test(motionById.get("MOT-001").productResolution) && /--ease-convergence/.test(motionById.get("MOT-001").productResolution) && /actual \/easing editor UI/.test(motionById.get("MOT-001").productResolution) && /explicit copy failure\/recovery/.test(motionById.get("MOT-001").productResolution), "spring-language family deletes the distribution mirror and consumerless alias, retains the owned editor, and binds stale labels plus composed, reveal, generated-lab, handle, copy, affordance, and preview projection");
check(motionById.get("MOT-002").findingIds.includes("RDA-020") && /one public press owner/.test(motionById.get("MOT-002").productResolution) && /CSS floor exclusive/.test(motionById.get("MOT-002").productResolution), "press family removes duplicate JS ownership and concurrent CSS/JS writers");
check(/public-but-unused/.test(motionById.get("MOT-004").currentMechanism) && /550 ms at both endpoints/.test(motionById.get("MOT-004").currentMechanism) && /fixed 500 ms clock/.test(motionById.get("MOT-004").currentMechanism) && motionById.get("MOT-004").findingIds.includes("RDA-024") && motionById.get("MOT-004").findingIds.includes("RDA-025") && motionById.get("MOT-004").interactionIds.includes("INT-020") && motionById.get("MOT-004").interactionIds.includes("INT-021") && /Delete the consumerless public once directive\/CSS branch/.test(motionById.get("MOT-004").productResolution), "reveal family deletes the self-tested public-once fork and binds composed plus consumer-owned clock truth while preserving actually consumed once behavior");
check(sameSet(motionById.get("MOT-005").interactionIds, ["INT-017"]) && /named native timeline/.test(motionById.get("MOT-005").currentMechanism), "scroll family binds the causal native-timeline exercise without imposing a global JS clock");
check(motionById.get("MOT-006").findingIds.includes("RDA-027") && motionById.get("MOT-006").findingIds.includes("RDA-036") && motionById.get("MOT-006").interactionIds.includes("INT-023") && motionById.get("MOT-006").interactionIds.includes("INT-028") && /actual named value-bearing controls/.test(motionById.get("MOT-006").productResolution) && /declared multi-detent Drawer/.test(motionById.get("MOT-006").productResolution) && /fixed\/content-sized Drawer synthesizes no ladder/.test(motionById.get("MOT-006").productResolution), "direct-manipulation family binds EasingPicker and Drawer pointer causality to semantic keyboard/value parity and truthful fixed-versus-detented modes");
check(motionById.get("MOT-007").findingIds.includes("RDA-022") && motionById.get("MOT-007").findingIds.includes("RDA-035") && /Tests do not create demand/.test(motionById.get("MOT-007").productResolution) && /Delete Typewriter's interactive prop and per-glyph click-backspace/.test(motionById.get("MOT-007").productResolution), "text-motion family separates genuine runtime ownership from test-as-consumer laundering and deletes the hidden pointer-only Typewriter default");
check(motionById.get("MOT-008").conceptIds.includes("deck") && motionById.get("MOT-008").findingIds.includes("RDA-019") && motionById.get("MOT-008").interactionIds.includes("INT-018"), "Deck family joins exact consumer, inert-fork, and exercised navigation evidence");
check(/did not emulate or prove PRM/.test(motionById.get("MOT-009").currentMechanism) && motionById.get("MOT-009").findingIds.includes("RDA-030") && motionById.get("MOT-009").interactionIds.includes("INT-023") && /complete immediately/.test(motionById.get("MOT-009").productResolution), "motion preference family denies credit for merely detecting reduced motion and binds the exercised editor preview to immediate truthful PRM completion");
check(motionById.get("MOT-010").findingIds.includes("RDA-023") && sameSet(motionById.get("MOT-010").interactionIds, ["INT-007", "INT-017"]) && /resolve custom-property sinks/.test(motionById.get("MOT-010").productResolution) && /layout\/paint\/composite/.test(motionById.get("MOT-010").productResolution), "animation-channel family replaces the source whitelist with sink resolution and native trace classification");
const schedulerInventory = motionAudit.schedulerInventory;
check(/Descriptive source-base census, never a fixed-count oracle/.test(schedulerInventory.note) && schedulerInventory.fileCount === schedulerInventory.rows.length && schedulerInventory.fileCount > 0, "scheduler inventory is structurally complete while expressly non-normative in count");
check(new Set(schedulerInventory.rows.map((row) => row.path)).size === schedulerInventory.rows.length && schedulerInventory.rows.every((row) => baseTree.get(row.path)?.oid === row.sourceBaseBlob && row.mechanisms.length > 0 && row.mechanisms.every((item) => item.count > 0) && row.auditOwners.length > 0 && row.auditOwners.every((id) => motionById.has(id))), "every discovered scheduler file binds its source-base blob, observed mechanisms, and at least one motion owner");
check(sameSet(uniq(schedulerInventory.rows.flatMap((row) => row.mechanisms.map((item) => item.id))), ["engine-motion", "interval", "interval-clear", "native-scroll-view-timeline", "raw-raf", "raw-raf-cancel", "timeout", "timeout-clear", "view-transition", "web-animations", "css-keyframes", "css-animation", "css-transition", "vue-transition"]), "animation discovery distinguishes managed engine, raw frame, discrete timer, native timeline, CSS keyframes/animations/transitions, Vue Transition, and Web Animations mechanisms");
check(schedulerInventory.rows.filter((row) => row.mechanisms.some((item) => ["css-keyframes", "css-animation", "css-transition", "vue-transition", "native-scroll-view-timeline", "web-animations"].includes(item.id))).every((row) => row.auditOwners.includes("MOT-010")), "every discovered animation-channel-bearing source file is allocated to sink/trace audit ownership");
const motionMd = readFileSync(join(ROOT, "MOTION-FIRST-PRINCIPLES-AUDIT.md"), "utf8");
check(motionAudit.rows.every((row) => motionMd.includes(row.id) && motionMd.includes(row.name)) && /not a roster gate/.test(motionMd) && /one application-wide callback/.test(motionMd), "motion narrative covers every family and visibly rejects clock/count quotas");

// Current source-base legacy-gate contradictions: false, shallow, masked,
// receipt/count, and composed-runtime oracles must be reversed rather than hidden
// by command consolidation.
const contradictionAudit = json("gate-contradiction-audit.json");
check(contradictionAudit.schemaVersion === "1.0.0" && contradictionAudit.sourceBase === SOURCE_BASE && contradictionAudit.generatedAt === "2026-07-14" && contradictionAudit.status === "FORMATION_RESEARCH_ONLY", "gate contradiction audit binds schema, source base, date, and research-only credit");
check(contradictionAudit.rowCount === 23 && contradictionAudit.rows.length === 23 && contradictionAudit.sourceWitnessCount === 85 && contradictionAudit.linkedRenderedFindingCount === 28, "gate contradiction audit retains twenty-three findings, eighty-five exact witnesses, and twenty-eight linked rendered findings");
check(new Set(contradictionAudit.rows.map((row) => row.id)).size === 23, "gate contradiction audit IDs are unique");
check(JSON.stringify(contradictionAudit.classificationCounts) === JSON.stringify({ FALSE_ORACLE: 2, SHALLOW_ORACLE: 1, COMPOSED_RUNTIME_GAP: 2, MASKED_FAILURE_ORACLE: 1, PROSE_RECEIPT_ORACLE: 1, SUPERFLUOUS_COUNT_GATE: 1, EVIDENCE_AUTHORITY_GAP: 1, SELF_CONTRADICTORY_ORACLE: 1, NO_OP_SURVIVOR_ORACLE: 1, COMPLETENESS_THEATER_ORACLE: 1, INERT_FORK_ORACLE: 1, SOURCE_SHAPE_FORK_ORACLE: 1, DISTRIBUTION_MIRROR_ORACLE: 1, CONSUMER_LAUNDERING_ORACLE: 1, CHANNEL_CLASSIFICATION_ORACLE: 1, FUTURE_CONSUMER_ORACLE: 1, STATIC_LITERAL_ORACLE: 1, STALE_VALUE_ORACLE: 1, FOSSILIZED_PATH_ORACLE: 1, FIXED_ENROLLMENT_ORACLE: 1, FINITE_ARM_ORACLE: 1 }), "gate contradiction taxonomy retains every diagnosed oracle class");
const isDemandProductPath = (path) => {
    const segments = path.split("/");
    if (segments.some((segment) => segment === "docs" || segment === "scripts" || segment === "test" || segment === "tests" || segment === "coverage" || segment === "node_modules" || /^dist(?:-|$)/.test(segment))) return false;
    if (path.startsWith("demo/capture/")) return false;
    if (/(?:^|\/)(?:package-lock\.json|pnpm-lock\.yaml|yarn\.lock)$/.test(path)) return false;
    return true;
};
for (const row of contradictionAudit.rows) {
    check(row.evidenceCredit === "FORMATION_RESEARCH_ONLY" && row.title.length >= 40 && row.rewardedState.length >= 80 && row.currentContradiction.length >= 100, `${row.id} has substantive research-only diagnosis`);
    check(row.canonicalWaves.length > 0 && row.canonicalWaves.every((id) => waveIds.has(id)), `${row.id} names exact canonical wave owners`);
    check(row.replacementPredicate.length >= 150 && row.negativeControl.length >= 80, `${row.id} has an exact replacement predicate and retained negative control`);
    check(row.legacyRows.length === row.legacyGateIds.length && row.legacyRows.every((entry) => {
        const disposition = legacyById.get(entry.legacyId);
        return disposition && entry.disposition === disposition.disposition && sameSet(entry.canonicalFamilies, disposition.canonicalFamilies) && sameSet(entry.canonicalInvariantBindings, disposition.canonicalInvariantBindings) && entry.legacyNamedCasesRetained.length === 0 && disposition.legacyNamedCasesRetained.length === 0 && entry.legacyNoteSha256 === disposition.legacyNoteSha256 && JSON.stringify(entry.reversal) === JSON.stringify(disposition.reversal);
    }), `${row.id} reproduces every bound legacy disposition and reversal exactly`);
    check(row.rdaFindings.length === row.rdaFindingIds.length && row.rdaFindings.every((entry) => {
        const finding = renderedFindingById.get(entry.id);
        return finding && entry.status === finding.status && entry.finding === finding.finding && entry.evidence === finding.evidence;
    }), `${row.id} reproduces every linked rendered finding exactly`);
    for (const item of row.sourceWitnesses) {
        check(baseTree.get(item.path)?.oid === item.sourceBaseBlob, `${row.id}:${item.path} witness binds the source-base blob`);
        const sourceLines = execFileSync("git", ["show", `${SOURCE_BASE}:${item.path}`], { cwd: REPO, encoding: "utf8", maxBuffer: 128 * 1024 * 1024 }).split("\n");
        const excerpt = sourceLines.slice(item.lineStart - 1, item.lineEnd).join("\n");
        check(item.lineStart >= 1 && item.lineEnd >= item.lineStart && item.excerpt === excerpt && item.excerptSha256 === sha(excerpt), `${row.id}:${item.path}:${item.lineStart}-${item.lineEnd} exact excerpt and digest remain current`);
    }
    if (row.liveProbe) {
        const result = spawnSync(process.execPath, [join(REPO, row.liveProbe.script)], { cwd: REPO, encoding: "utf8", env: { ...process.env, GATE_SNAPSHOT: "0" }, maxBuffer: 128 * 1024 * 1024 });
        check(!result.error && result.status === row.liveProbe.exitCode && result.signal === row.liveProbe.signal && row.liveProbe.sourceBase === SOURCE_BASE && row.liveProbe.repoHead === SOURCE_BASE && baseTree.get(row.liveProbe.script)?.oid === row.liveProbe.scriptBlob && sha(result.stdout ?? "") === row.liveProbe.stdoutSha256 && sha(result.stderr ?? "") === row.liveProbe.stderrSha256, `${row.id} live legacy-command probe remains byte-current at the bound source while retaining diagnostic-only authority`);
        const combinedLines = `${result.stdout ?? ""}\n${result.stderr ?? ""}`.split("\n").map((line) => line.trim()).filter(Boolean);
        check(row.liveProbe.observedLines.every((line) => combinedLines.includes(line)), `${row.id} live probe retains every exact contradiction line`);
    }
    for (const census of row.externalDemandCensus) {
        const boundRepo = consumerAssay.repositories.find((candidate) => candidate.repository === census.repository);
        check(boundRepo && census.path === boundRepo.path && census.head === boundRepo.head && census.tree === boundRepo.tree, `${row.id}:${census.repository} demand census binds the canonical read-only consumer assay HEAD/tree`);
        for (const term of census.terms) {
            const result = spawnSync("git", ["-C", census.path, "grep", "-l", "-F", "--", term.term, census.head, "--", "."], { encoding: "utf8", maxBuffer: 128 * 1024 * 1024 });
            const prefix = `${census.head}:`;
            const trackedMatches = (result.stdout ?? "").split("\n").filter(Boolean).map((line) => line.startsWith(prefix) ? line.slice(prefix.length) : line);
            check(!result.error && [0, 1].includes(result.status) && JSON.stringify(trackedMatches) === JSON.stringify(term.trackedMatches) && JSON.stringify(trackedMatches.filter(isDemandProductPath)) === JSON.stringify(term.productMatches), `${row.id}:${census.repository}:${term.term} tracked product-demand result is independently reproducible`);
        }
    }
    for (const evidence of row.externalImportEvidence) {
        check(consumerAssay.imports.some((item) => item.repository === evidence.repository && item.repositoryHead === evidence.repositoryHead && item.file === evidence.file && item.specifier === evidence.specifier && item.bindings.includes(evidence.binding) && item.kind === evidence.kind), `${row.id}:${evidence.repository}:${evidence.file} external import evidence reproduces the bound semantic consumer assay`);
    }
}
const contradictionById = new Map(contradictionAudit.rows.map((row) => [row.id, row]));
check(sameSet(contradictionById.get("GCA-001").canonicalWaves, ["BI.W-P056", "BI.W-P057"]) && /RELOCATED_STORY_ROUTES/.test(contradictionById.get("GCA-001").replacementPredicate), "compatibility false oracle maps to exact IA/manifest waves and deletion predicate");
check(sameSet(contradictionById.get("GCA-003").canonicalWaves, ["BI.W-P045", "BI.W-P046", "BI.W-P061", "BI.W-P132"]) && /never silently switch engines/.test(contradictionById.get("GCA-003").replacementPredicate), "WebGPU false oracle maps to exact renderer/evidence waves and attributed-failure predicate");
check(sameSet(contradictionById.get("GCA-005").canonicalWaves, ["BI.W-P039", "BI.W-P041", "BI.W-P042"]) && /no continued-success geometry/.test(contradictionById.get("GCA-005").replacementPredicate), "Dock masking false oracle maps to exact geometry/motion/dogfood waves");
check(sameSet(contradictionById.get("GCA-008").canonicalWaves, ["BI.W-P000", "BI.W-P014", "BI.W-P042"]) && /no fixed file count/.test(contradictionById.get("GCA-008").replacementPredicate), "Dock roster count gate is explicitly abolished and replaced by semantic discovery");
check(sameSet(contradictionById.get("GCA-010").legacyGateIds, ["proof:fourier-field", "proof:viz-constellation"]) && /logical negation/.test(contradictionById.get("GCA-010").currentContradiction) && /no independent authority lanes/.test(contradictionById.get("GCA-010").replacementPredicate), "renderer-direction contradiction abolishes both inverse named oracles and installs one derived truth lane");
check(sameSet(contradictionById.get("GCA-011").legacyGateIds, ["proof:no-retired-survivor", "proof:constellation-substrate-single"]) && /uncalled public prop/.test(contradictionById.get("GCA-011").replacementPredicate) && /No compatibility no-op/.test(contradictionById.get("GCA-011").replacementPredicate), "Constellation no-op survivor is treated as a clean-break defect rather than retained compatibility");
check(sameSet(contradictionById.get("GCA-012").legacyGateIds, ["proof:motion-one-clock"]) && sameSet(contradictionById.get("GCA-012").rdaFindingIds, ["RDA-018", "RDA-030"]) && /keyframes import and corpus omission have zero exemption power/.test(contradictionById.get("GCA-012").replacementPredicate) && /bounded editor-local previews/.test(contradictionById.get("GCA-012").replacementPredicate), "motion completeness theater is replaced by complete semantic scheduler discovery, per-property ownership, and proportionate editor-preview semantics");
check(sameSet(contradictionById.get("GCA-013").legacyGateIds, ["proof:deck"]) && /unused installDeckSpring\/deckEase\/DECK_SPRING/.test(contradictionById.get("GCA-013").replacementPredicate), "Deck source-shape mandate is reversed into deletion of the inert compatibility fork");
check(sameSet(contradictionById.get("GCA-014").legacyGateIds, ["proof:button-glass"]) && /One canonical public press composable/.test(contradictionById.get("GCA-014").replacementPredicate) && /never concurrently/.test(contradictionById.get("GCA-014").replacementPredicate), "Button source-shape mandate is reversed into one press owner and exclusive fallback phase");
check(sameSet(contradictionById.get("GCA-015").legacyGateIds, ["proof:motion-suite", "proof:motion2", "proof:motion-demo"]) && /Delete suite\.ts, curves\.ts, \/motion-curves/.test(contradictionById.get("GCA-015").replacementPredicate) && /preserving the real \/easing component boundary/.test(contradictionById.get("GCA-015").replacementPredicate), "motion distribution/parity identities are reversed into direct dependency ownership and one real Glass component boundary");
check(sameSet(contradictionById.get("GCA-016").legacyGateIds, ["proof:motion-composables-consumer"]) && /tests, types, barrels, documentation, future asks, and path existence have zero demand credit/.test(contradictionById.get("GCA-016").replacementPredicate) && /No fixed minimum count survives/.test(contradictionById.get("GCA-016").replacementPredicate), "consumer tally is abolished without laundering unit tests or retaining a replacement count gate");
check(sameSet(contradictionById.get("GCA-017").legacyGateIds, ["proof:no-layout-animation"]) && /resolves custom-property dependency sinks/.test(contradictionById.get("GCA-017").replacementPredicate) && /Paint is reported as paint/.test(contradictionById.get("GCA-017").replacementPredicate), "compositor-only name filter is reversed into sink and trace classification while retaining layout/paint/composite negatives");
check(sameSet(contradictionById.get("GCA-018").legacyGateIds, ["proof:motion-presets"]) && contradictionById.get("GCA-018").liveProbe.exitCode === 0 && contradictionById.get("GCA-018").externalDemandCensus.length === 9 && sameSet(uniq(contradictionById.get("GCA-018").externalDemandCensus.flatMap((repo) => repo.terms.map((term) => term.term))), ["--ease-convergence", "data-scroll-reveal-once"]) && contradictionById.get("GCA-018").externalDemandCensus.every((repo) => repo.terms.every((term) => term.productMatches.length === 0)) && /Delete the named command, --ease-convergence alias/.test(contradictionById.get("GCA-018").replacementPredicate), "green motion-presets oracle is reversed because prose future demand and self-tests cannot preserve zero-consumer substrate");
check(sameSet(contradictionById.get("GCA-019").legacyGateIds, ["proof:animation-coherence"]) && contradictionById.get("GCA-019").liveProbe.exitCode === 1 && contradictionById.get("GCA-019").liveProbe.observedLines.some((line) => /missing its assigned register binding/.test(line)) && /Equivalent dynamic or static implementations/.test(contradictionById.get("GCA-019").replacementPredicate) && /alias with no runtime read contributes zero demand/.test(contradictionById.get("GCA-019").replacementPredicate), "animation-coherence static-literal/roster oracle is replaced by effective binding and runtime-demand semantics");
check(sameSet(contradictionById.get("GCA-020").legacyGateIds, ["proof:spring-tokens-synced"]) && sameSet(contradictionById.get("GCA-020").rdaFindingIds, ["RDA-021", "RDA-026"]) && contradictionById.get("GCA-020").liveProbe.exitCode === 1 && contradictionById.get("GCA-020").liveProbe.observedLines.some((line) => /\(0\.3, 0\.82\).*\(0\.3, 0\.82\)/.test(line)) && contradictionById.get("GCA-020").liveProbe.observedLines.some((line) => /\(0\.68, 0\.64\) are not both present/.test(line)) && /measured-settle maxDuration, sample density, rounding/.test(contradictionById.get("GCA-020").replacementPredicate) && /without prescribing a duplicated aesthetic pole/.test(contradictionById.get("GCA-020").replacementPredicate), "spring synchronization stale-value oracle is deleted while derived configuration, demo projection, and measured trajectory parity survive");
check(sameSet(contradictionById.get("GCA-021").legacyGateIds, ["proof:easing-primitive"]) && sameSet(contradictionById.get("GCA-021").rdaFindingIds, ["RDA-027", "RDA-028", "RDA-029", "RDA-030"]) && contradictionById.get("GCA-021").liveProbe.exitCode === 1 && sameSet(uniq(contradictionById.get("GCA-021").externalImportEvidence.map((item) => item.repository)), ["value.js", "keyframes.js"]) && contradictionById.get("GCA-021").externalImportEvidence.every((item) => item.specifier === "@mkbabb/glass-ui/easing" && item.binding === "EasingPicker") && /generated entry graph and packed candidate/.test(contradictionById.get("GCA-021").replacementPredicate) && /explicit Clipboard success\/denial recovery/.test(contradictionById.get("GCA-021").replacementPredicate), "working externally consumed easing subpath is preserved while its fossilized internal-barrel oracle is abolished and its actual behavior contract is tightened");
check(sameSet(contradictionById.get("GCA-022").legacyGateIds, ["proof:demo-affordances"]) && sameSet(contradictionById.get("GCA-022").rdaFindingIds, ["RDA-029"]) && contradictionById.get("GCA-022").liveProbe.exitCode === 0 && contradictionById.get("GCA-022").liveProbe.observedLines.some((line) => /W1.*YES/.test(line)) && /discovers every current rendered text-bearing action/.test(contradictionById.get("GCA-022").replacementPredicate), "green fixed-file affordance oracle is abolished after missing the exact clipped-button regression it names");
check(sameSet(contradictionById.get("GCA-023").legacyGateIds, ["proof:a11y"]) && sameSet(contradictionById.get("GCA-023").rdaFindingIds, ["RDA-027", "RDA-031", "RDA-032", "RDA-033", "RDA-034", "RDA-035", "RDA-036"]) && contradictionById.get("GCA-023").liveProbe.exitCode === 0 && contradictionById.get("GCA-023").liveProbe.observedLines.some((line) => /EP  triggers=2 unnamed=0/.test(line)) && /template, imperative, render-function/.test(contradictionById.get("GCA-023").currentContradiction) && /SVG\/canvas\/table\/list\/glyph\/custom-component descendants/.test(contradictionById.get("GCA-023").replacementPredicate) && /public default-on interaction/.test(contradictionById.get("GCA-023").replacementPredicate), "green finite-arm accessibility oracle is abolished after ignoring composed pointer-active controls, imperative listeners, hidden defaults, and false affordances");
const contradictionMd = readFileSync(join(ROOT, "GATE-CONTRADICTION-AUDIT.md"), "utf8");
check(contradictionAudit.rows.every((row) => contradictionMd.includes(row.id) && contradictionMd.includes(row.title)) && /reverse a false oracle before deleting its command/i.test(contradictionMd), "gate contradiction narrative retains every row and the reversal-before-deletion law");
const postmortem = readFileSync(join(ROOT, "POSTMORTEM.md"), "utf8");
check(/some gates make the defect mandatory/i.test(postmortem) && /403 unique authored dispositions[\s\S]*all 403 historical[\s\n]+gates are abrogated wholesale[\s\S]*all 403 have no one-to-one command successor/i.test(postmortem) && /one[\s\n]+executable owner, `scripts\/verify\.mjs`/.test(postmortem) && /reverse a[\s\n]+false oracle before deleting its command/.test(postmortem), "post-mortem folds false-oracle reenactment, the failed 403-to-40 intermediate design, exhaustive authored dispositions, and wholesale executable-identity abrogation into the causal model");

// Primary platform/specification research and exact design transposition.
const platformResearch = json("platform-research.json");
check(platformResearch.schemaVersion === "1.0.0" && platformResearch.sourceBase === SOURCE_BASE && platformResearch.retrievedAt === "2026-07-14", "platform research binds its schema, source base, and retrieval date");
check(platformResearch.rowCount === 12 && platformResearch.rows.length === 12 && new Set(platformResearch.rows.map((row) => row.id)).size === 12, "platform research has twelve unique primary-source rows");
const primaryHosts = new Set(["developer.apple.com", "webkit.org", "www.w3.org", "gpuweb.github.io", "developer.chrome.com"]);
for (const row of platformResearch.rows) {
    check(primaryHosts.has(new URL(row.url).hostname) && (!row.companionUrl || primaryHosts.has(new URL(row.companionUrl).hostname)), `${row.id} cites only an approved primary platform/specification host`);
    check(row.authority.length >= 20 && row.sourceFinding.length >= 80 && row.localFinding.length >= 60 && row.transposition.length >= 100, `${row.id} has substantive authority, source finding, local finding, and transposition`);
    check(row.canonicalWaves.length > 0 && row.canonicalWaves.every((id) => waveIds.has(id)), `${row.id} maps to exact canonical waves`);
    check(row.canonicalFamilies.length > 0 && row.canonicalFamilies.every((id) => invariantIds.has(id)), `${row.id} maps to exact canonical invariant families`);
}
check(platformResearch.rows.filter((row) => row.sourceClass === "BETA_ENGINE_RELEASE_NOTES").length === 1, "exactly one platform row is explicitly beta-only rather than a stable support floor");
const platformById = new Map(platformResearch.rows.map((row) => [row.id, row]));
check(sameSet(platformById.get("PR-001").canonicalWaves, ["BI.W-P016", "BI.W-P017", "BI.W-P035"]) && /functional glass/i.test(platformById.get("PR-001").transposition), "Apple material guidance maps to exact functional-plane owners");
check(sameSet(platformById.get("PR-003").canonicalWaves, ["BI.W-P037", "BI.W-P062", "BI.W-P106"]) && /aria-modal/.test(platformById.get("PR-003").transposition), "APG modal guidance maps to exact overlay/accessibility/Dialog owners");
check(/24 px conformance/.test(platformById.get("PR-004").transposition) && /44 px Dock/.test(platformById.get("PR-004").transposition), "target research distinguishes WCAG minimum from the stricter Dock product floor");
check(/pause\/resume/.test(platformById.get("PR-006").transposition) && /bfcache/.test(platformById.get("PR-006").transposition), "Safari scroll research retains documented pause, boundary, and bfcache bug classes");
check(/Stable Safari/.test(platformById.get("PR-007").transposition) && /non-gating forward-compatibility/.test(platformById.get("PR-007").transposition), "Safari beta research cannot silently become the stable support floor");
check(/device\.lost/.test(platformById.get("PR-008").sourceFinding) && /never silently switches engines/.test(platformById.get("PR-008").transposition), "WebGPU research preserves asynchronous failure and no-masking semantics");
check(/prefers-reduced-motion/.test(platformById.get("PR-010").sourceFinding) && /zero nonessential continuous work/.test(platformById.get("PR-010").transposition), "preference research maps motion/transparency/contrast to distinct executable outcomes");
const platformMd = readFileSync(join(ROOT, "PLATFORM-RESEARCH.md"), "utf8");
check(platformResearch.rows.every((row) => platformMd.includes(row.url) && platformMd.includes(row.id)) && /cannot turn prose/.test(platformMd), "platform research narrative links every primary source and denies prose-as-execution credit");
const preceptsAmendments = readFileSync(join(ROOT, "PRECEPTS-AMENDMENTS.md"), "utf8");
check(/exact browser name\/version\/build/.test(preceptsAmendments) && /console\/unhandled-rejection ledger/.test(preceptsAmendments), "ROOT π amendment now requires exact browser build, feature, and failure telemetry");
check(/WCAG 2\.5\.8[\s\S]*24 CSS-pixel minimum/.test(preceptsAmendments) && /WCAG 2\.5\.5[\s\S]*44 CSS/.test(preceptsAmendments), "ROOT congruence repair distinguishes WCAG minimum and enhanced target guidance");
check(/P-24[\s\S]*logical inverse of the executable/.test(preceptsAmendments) && /inert compatibility no-op is a surviving API defect/.test(preceptsAmendments), "ROOT congruence amendment forbids inverse oracle meanings and public no-op survivors");
check(/P-25[\s\S]*one temporal authority and one writer/.test(preceptsAmendments) && /forbid import-based exemptions, global callback quotas, fixed scheduler counts/.test(preceptsAmendments), "ROOT temporal amendment requires per-property ownership and proportional mechanisms rather than clock/count theater");
check(/P-26[\s\S]*Product predicates over implementation spelling/.test(preceptsAmendments) && /Canonical-owner discovery must RED duplicate implementations/.test(preceptsAmendments), "ROOT product-predicate amendment forbids source-shape gates from manufacturing architecture forks");
check(/P-27[\s\S]*Dependency ownership versus distribution mirroring/.test(preceptsAmendments) && /Upstream export growth must require no downstream wrapper edit/.test(preceptsAmendments), "ROOT dependency-boundary amendment forbids downstream root-barrel and demo-catalogue mirroring");
check(/P-28[\s\S]*Consumer evidence excludes tests, path existence, and sibling demand/.test(preceptsAmendments) && /demand for a sibling member contribute zero product-demand credit/.test(preceptsAmendments) && /GlassCarouselPager/.test(preceptsAmendments), "ROOT consumer amendment separates exact-member runtime demand from self-justifying tests, paths, and sibling-concept laundering");
check(/P-29[\s\S]*Animation channel truth and custom-property sink resolution/.test(preceptsAmendments) && /Paint never receives compositor credit/.test(preceptsAmendments) && /filename\/path allowlists have no authority/.test(preceptsAmendments), "ROOT animation-channel amendment requires sink and trace truth rather than compositor-name whitelists");
check(/P-30[\s\S]*Dynamic binding and effective-state semantics/.test(preceptsAmendments) && /Equivalent static, dynamic, or generated implementations satisfy the same property/.test(preceptsAmendments), "ROOT effective-state amendment gives equivalent static, dynamic, and generated bindings one semantic predicate");
check(/P-31[\s\S]*Values have one owner/.test(preceptsAmendments) && /otherwise counts are descriptive/.test(preceptsAmendments), "ROOT derived-value amendment prevents verifier literals and vocabulary counts from becoming duplicate design authority");
check(/P-32[\s\S]*Define public truth at the packed candidate/.test(preceptsAmendments) && /Internal barrels and paths are generated architecture unless expressly public/.test(preceptsAmendments), "ROOT packed-boundary amendment separates the public contract from incidental internal barrel topology");
check(/P-33[\s\S]*Legacy command outcomes are diagnostic, not normative/.test(preceptsAmendments) && /A legacy PASS\/RED has no execution authority/.test(preceptsAmendments), "ROOT diagnostic-command amendment prevents historical outcomes from inheriting normative authority");
check(/P-34[\s\S]*Semantic enrollment follows current reachability/.test(preceptsAmendments) && /Moves, re-homes, new consumers, and deletions update reach automatically/.test(preceptsAmendments) && /Source parsing cannot override composed browser controls/.test(preceptsAmendments), "ROOT semantic-enrollment amendment forbids fixed path and finite-arm rosters from losing moved interactive product surfaces");
check(/P-35[\s\S]*Public omission\/default and false-affordance law/.test(preceptsAmendments) && /whole omission contract—boolean, enum, host tag, model seed, derived fallback/.test(preceptsAmendments) && /explicit-override stories cannot substitute/.test(preceptsAmendments) && /decorative branch owns no activation handler/.test(preceptsAmendments), "ROOT omission/default amendment covers boolean, mode, host, model, and derived fallback behavior while forbidding control-styled no-op branches");
const rootAmendmentIds = [...preceptsAmendments.matchAll(/^\| P-(\d{2}) \|/gm)].map((match) => match[1]);
check(rootAmendmentIds.length === 35 && sameSet(rootAmendmentIds, Array.from({ length: 35 }, (_, index) => String(index + 1).padStart(2, "0"))) && waveById.get("BI.W-P131").scope.some((line) => /35 proposed ROOT amendments/.test(line)), "ROOT amendment packet and producer wave retain all thirty-five unique proposals without a count mismatch");

// Exhaustive prompt, coordination, tranche-directory, and DEFER/OQ/D routing.
const promptRouting = json("prompt-recap-routing.json");
const coordinationRouting = json("coordination-routing.json");
const openRouting = json("open-row-routing.json");
const trancheRouting = json("tranche-directory-ledger.json");
const mappedLedgers = [
    ["prompt", promptRouting.rows],
    ["coordination", coordinationRouting.rows],
    ["open", openRouting.rows],
];
for (const [name, rows] of mappedLedgers) {
    check(new Set(rows.map((row) => row.rowId)).size === rows.length, `${name} routing row IDs are unique`);
    for (const row of rows) {
        check(["ACCEPT", "FOLD", "REJECT", "BANK"].includes(row.producerDisposition), `${name}:${row.rowId} has one terminal producer disposition`);
        check(row.canonicalWaves.length > 0 && row.canonicalWaves.every((id) => waveIds.has(id)), `${name}:${row.rowId} names exact canonical wave owners`);
        check(row.canonicalFamilies.length > 0 && row.canonicalFamilies.every((id) => invariantIds.has(id)) && row.canonicalFamily === row.canonicalFamilies[0], `${name}:${row.rowId} names exact canonical property owners`);
        const expectedLineHash = sha(Buffer.from(`${row.sourcePath}\0${row.sourceLine}\0${row.sourceText}`));
        check(row.sourceLineSha256 === expectedLineHash && row.acceptancePredicate.includes(expectedLineHash), `${name}:${row.rowId} predicate binds the exact source occurrence`);
        check(Boolean(row.custodian && row.retrigger), `${name}:${row.rowId} names a custodian and retrigger`);
        if (row.sourceClass !== "CURRENT") {
            const sourceLines = readFileSync(join(REPO, row.sourcePath), "utf8").split("\n");
            check(sourceLines[row.sourceLine - 1]?.trim() === row.sourceText, `${name}:${row.rowId} still matches its source path and line`);
        }
    }
}
check(promptRouting.historicalRowCount === 261 && promptRouting.currentRowCount === 12 && promptRouting.rows.length === 273, "prompt recap routes all 261 historical rows plus all twelve current orders");
check(coordinationRouting.rowCount === 291 && coordinationRouting.rows.length === 291, "coordination routing covers all 291 inbound/ask table rows");
check(openRouting.rowCount === 8509 && openRouting.rows.length === 8509, "open-row routing covers all 8,509 exact DEFER/OQ/D occurrences");

const currentRows = promptRouting.rows.filter((row) => row.sourceClass === "CURRENT");
check(sameSet(currentRows.map((row) => row.rowId), Array.from({ length: 12 }, (_, index) => `CURRENT-${String(index + 1).padStart(3, "0")}`)), "current directives have the exact twelve hand-routed identities");
const currentById = new Map(currentRows.map((row) => [row.rowId, row]));
check(sameSet(currentById.get("CURRENT-006").canonicalWaves, [...Array.from({ length: 110 }, (_, index) => `BI.W-P${String(index + 15).padStart(3, "0")}`), "BI.W-P132"]), "all product, component, motion, glass, Dock, procedural, and demo waves own the first-principles current order");
check(sameSet(currentById.get("CURRENT-007").canonicalWaves, ["BI.W-P004", "BI.W-P133"]) && /512 actions, 60 predicates, 62 imports, and 36 target contracts/.test(currentById.get("CURRENT-007").acceptancePredicate), "Atlas P current order is hand-routed to exact packet owners and cardinalities");
check(/elapsed-time floor is superseded/.test(currentById.get("CURRENT-003").acceptancePredicate) && /independent non-author audit/.test(currentById.get("CURRENT-003").acceptancePredicate) && /two consecutive clean/.test(currentById.get("CURRENT-003").acceptancePredicate), "convergence order removes the superseded elapsed-time quota while retaining independent audit and two clean passes");
check(/historical routing authority superseded/.test(currentById.get("CURRENT-002").acceptancePredicate) && /current core session owns orchestration, design, synthesis/.test(currentById.get("CURRENT-012").acceptancePredicate) && /Luna or Terra task lanes/.test(currentById.get("CURRENT-012").acceptancePredicate), "latest core plus Luna/Terra routing explicitly supersedes the earlier GPT model wording without false provider attestation");
check(sameSet(currentById.get("CURRENT-010").canonicalWaves, ["BI.W-P000", "BI.W-P001", "BI.W-P005", "BI.W-P127", "BI.W-P131"]) && /complete generated DAG/.test(currentById.get("CURRENT-010").acceptancePredicate), "execution order binds total completion and maximal lease-safe orchestration to exact substrate owners");
check(sameSet(currentById.get("CURRENT-011").canonicalWaves, ["BI.W-P002", "BI.W-P004", "BI.W-P127", "BI.W-P133"]) && /no irreversible action may precede/.test(currentById.get("CURRENT-011").acceptancePredicate), "publish, push, pull, and deploy authority remains bounded by exact release and consumer predicates");
check(currentRows.every((row) => row.producerDisposition === "FOLD"), "no current user order is banked or silently outsourced");

const corpusWalk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
        if (path === ROOT || path.startsWith(`${ROOT}/`)) return [];
        return corpusWalk(path);
    }
    return [path];
});
const sourceOccurrenceKey = (sourcePath, line, text) => `${sourcePath}\0${line}\0${text}`;
const independentTableOccurrences = (absolute) => {
    const sourcePath = relative(REPO, absolute);
    const rows = [];
    for (const [index, line] of readFileSync(absolute, "utf8").split("\n").entries()) {
        const text = line.trim();
        if (!text.startsWith("|") || /^\|\s*(?:[-: ]+\|)+/.test(text)) continue;
        const cells = text.split("|").slice(1, -1).map((part) => part.trim());
        const first = cells[0] ?? "";
        if (!first || /^(id|tranche|packet|ks spec|bh-mandate item|source|wave|category|repo|finding|class)$/i.test(first)) continue;
        rows.push(sourceOccurrenceKey(sourcePath, index + 1, text));
    }
    return rows;
};
const historicalPromptOccurrences = independentTableOccurrences(join(TRANCHE_ROOT, "BI/ledgers/PROMPT-RECAP.md"));
const routedHistoricalPromptOccurrences = promptRouting.rows.filter((row) => row.sourceClass === "PROMPT").map((row) => sourceOccurrenceKey(row.sourcePath, row.sourceLine, row.sourceText));
check(historicalPromptOccurrences.length === 261 && sameSet(historicalPromptOccurrences, routedHistoricalPromptOccurrences), "independent prompt-table census has no silent drop or duplicate");
const coordinationOccurrences = [
    ...independentTableOccurrences(join(TRANCHE_ROOT, "BI/coordination/INBOUND-MARKS.md")),
    ...independentTableOccurrences(join(TRANCHE_ROOT, "BI/coordination/asks-and-consumes.md")),
];
check(coordinationOccurrences.length === 291 && sameSet(coordinationOccurrences, coordinationRouting.rows.map((row) => sourceOccurrenceKey(row.sourcePath, row.sourceLine, row.sourceText))), "independent coordination-table census has no silent drop or duplicate");

const openPattern = /(DEFER(?:RED)?|OPEN[-_ ]?QUESTION|\bOQ(?:[-_A-Z0-9]+)?\b|\bD[0-9]+\b)/i;
const independentOpenOccurrences = [];
for (const absolute of corpusWalk(TRANCHE_ROOT).filter((path) => /\.(?:md|json)$/.test(path)).sort()) {
    const sourcePath = relative(REPO, absolute);
    for (const [index, line] of readFileSync(absolute, "utf8").split("\n").entries()) {
        const text = line.trim();
        const eligibleMarkdown = absolute.endsWith(".md") && /^(?:\||[-*])/.test(text);
        const eligibleJson = absolute.endsWith(".json") && /"(?:status|state|disposition|id|key|claim)"\s*:/.test(text);
        if ((eligibleMarkdown || eligibleJson) && openPattern.test(text)) independentOpenOccurrences.push(sourceOccurrenceKey(sourcePath, index + 1, text));
    }
}
check(independentOpenOccurrences.length === 8509 && sameSet(independentOpenOccurrences, openRouting.rows.map((row) => sourceOccurrenceKey(row.sourcePath, row.sourceLine, row.sourceText))), "independent 42-directory DEFER/OQ/D census has no silent drop or duplicate");
const expectedBankIds = [
    "PROMPT-0280-per-sibling-ASK-relays-foreign-tree-", "INBOUND-0049-B3", "INBOUND-0273-14",
    "OPEN-e17fc2bfab3ceb0bb9af", "OPEN-b67b58dcb7ef1930d837", "OPEN-2d4c40e6b89a9e967408",
];
const allMappedRows = mappedLedgers.flatMap(([, rows]) => rows);
check(sameSet(allMappedRows.filter((row) => row.producerDisposition === "BANK").map((row) => row.rowId), expectedBankIds), "only the six explicit foreign-fence occurrences remain BANKED");
check(allMappedRows.filter((row) => row.producerDisposition === "BANK").every((row) => row.custodian === "custodian:named-foreign-owner"), "every BANK row names the foreign-owner custodian");

const trancheDirs = readdirSync(TRANCHE_ROOT, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
check(trancheDirs.length === 42 && trancheRouting.trancheCount === 42 && sameSet(trancheDirs, trancheRouting.rows.map((row) => row.tranche)), "promise-versus-delivery ledger covers all 42 tranche directories exactly once");
check(trancheRouting.rows.every((row) => row.promise && row.provedDelivery && row.deliveryClass && row.perfectedBiFold && row.producerDisposition === "FOLD" && row.canonicalWaves.every((id) => waveIds.has(id))), "every tranche directory has promise, proved delivery, class, current fold, and exact owner");

const cursor = json("execution-cursor.seed.json");
check(sameSet(Object.keys(cursor.waves), waveIds), "execution cursor seeds every wave exactly once");
check(Object.values(cursor.waves).every((row) => row.status === "PLANNED" && row.commit === null && row.evidenceDigest === null), "execution cursor claims no formation work as landed");
check(sameSet(cursor.permittedStatuses, ["PLANNED", "RUNNING", "DONE", "DEAD"]), "cursor permits only explicit lifecycle states");
check(cursor.authority === "GIT_FIRST_PARENT_PLUS_COMMITTED_RECEIPTS" && cursor.cache.authoritative === false && /--git-path tranche\/BI\/cursor\.json/.test(cursor.cache.locator) && /fsync plus atomic rename/.test(cursor.cache.writeProtocol) && /recover --at HEAD --read-only/.test(cursor.cache.reconstruction), "cursor seed makes Git/receipts authoritative and cache Git-private, atomic, disposable, and reconstructable");
check(sameSet(cursor.coreCommitTrailers, ["BI-Wave", "BI-Status", "BI-Receipt-SHA256", "BI-Formation-SHA256"]) && sameSet(cursor.projectionCommitTrailers, ["BI-Attestation-SHA256", "BI-FINAL-SHA256"]), "cursor seed binds exact core and projection digest trailers");
check(JSON.stringify(cursor.intendedTrailerContract) === JSON.stringify(INTENDED_TRAILER_CONTRACT) && cursor.receiptPayloadDigestPolicy === RECEIPT_PAYLOAD_DIGEST_POLICY && /only DONE unlocks ordinary dependents/.test(cursor.dependencyUnlockPolicy) && /P002 DEAD withdraws/.test(cursor.dependencyUnlockPolicy), "cursor seed binds the acyclic receipt/trailer domain and non-unlocking DEAD semantics");
for (const wave of WAVES) {
    const row = cursor.waves[wave.id];
    check(row.receiptPath === wave.receiptPath && JSON.stringify(row.integrationArtifacts) === JSON.stringify(wave.integrationArtifacts) && row.projectionMode === wave.projectionMode && sameSet(row.integrationRequires, wave.integrationRequires) && JSON.stringify(row.integrationPrerequisites) === JSON.stringify(wave.integrationPrerequisites), `${wave.id} cursor seed reproduces its receipt and exact integration predicates`);
}

const integrationLedger = json("integration-artifact-ledger.json");
check(integrationLedger.authority === "ORCHESTRATOR_INTEGRATION_PROTOCOL" && integrationLedger.receiptCount === WAVES.length && integrationLedger.projectionActivationWave === "BI.W-P002" && integrationLedger.sharedIntegrationLock === "serialized-orchestrator-envelope", "integration ledger binds every receipt and the sole projection activation/mutex");
check(JSON.stringify(integrationLedger.acyclicDigestOrder) === JSON.stringify(["product-and-evidence-payload", "receipt", "release-attestation", "FINAL", "commit-and-tree"]), "integration ledger fixes the acyclic payload-to-commit digest order");
check(integrationLedger.receiptPayloadDigestPolicy === RECEIPT_PAYLOAD_DIGEST_POLICY && JSON.stringify(integrationLedger.intendedTrailerContract) === JSON.stringify(INTENDED_TRAILER_CONTRACT) && JSON.stringify(integrationLedger.projectionActivationPrerequisite) === JSON.stringify(P002_ACTIVATION_PREREQUISITE), "integration ledger fixes the receipt exclusion domain, acyclic trailer values, and exact P002 DONE activation predicate");
check(JSON.stringify(integrationLedger.rows) === JSON.stringify(WAVES.map((wave) => ({ waveId: wave.id, receiptPath: wave.receiptPath, projectionMode: wave.projectionMode, integrationRequires: wave.integrationRequires, integrationPrerequisites: wave.integrationPrerequisites, integrationLock: wave.integrationLock, agentCommitAuthority: wave.agentCommitAuthority, artifacts: wave.integrationArtifacts, agentWritePaths: writePaths(wave) }))), "integration artifact ledger exactly reproduces every wave's builder/adjunct split and activation predicate");
const integrationProtocol = readFileSync(join(ROOT, "INTEGRATION-PROTOCOL.md"), "utf8");
check(/product\/evidence payload → receipt → release attestation → FINAL → commit\/tree/.test(integrationProtocol) && /excluding all current integration adjuncts/.test(integrationProtocol) && /BI-Receipt-SHA256, BI-Attestation-SHA256, and BI-FINAL-SHA256 values are forbidden/.test(integrationProtocol) && /P002 is an integration-only activation barrier/.test(integrationProtocol) && /P002 DEAD withdraws the entire formation/.test(integrationProtocol) && /never stage, commit, write receipts/.test(integrationProtocol), "integration protocol documents the acyclic chain, exact receipt domain, no downstream digest values in receipts, maximal fanout activation predicate, DEAD withdrawal, and orchestrator-only authority");
const finalPreconditionsMd = readFileSync(join(ROOT, "FINAL-PRECONDITIONS.md"), "utf8");
check(/Each DONE or evidence-backed DEAD row resolves exactly one orchestrator-owned first-parent commit/.test(finalPreconditionsMd) && /DEAD never unlocks a dependent/.test(finalPreconditionsMd) && /successful release lineage contains no DEAD row/.test(finalPreconditionsMd), "FINAL requires one receipt commit for every terminal outcome while excluding DEAD from a releasable lineage");

// sci-report Atlas P inbound packet and ACK integrity.
const packetWalk = (root, dir = root) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? packetWalk(root, path) : [relative(root, path)];
}).sort();
const packetRows = packetWalk(PACKET).map((path) => `${path}\0${fileSha(join(PACKET, path))}\n`);
const packetDigest = sha(Buffer.from(packetRows.join("")));
const ack = json("coordination/SCI-P4-GLASS-BG-BH-BI-ADDENDUM-001-ACK.json");
check(packetRows.length === 87 && ack.packet.ingestedPacketDigestSha256 === packetDigest, "Atlas P ACK binds the recomputed 87-file packet digest");
check(ack.status === "FORMULATION_ONLY" && ack.executionAuthorized === false, "Atlas P ACK grants no execution authority");
check(["FORMULATION-SEAL", "ENV-DSYNC", "CORPUS-100", "P-EXECUTION-AUTHORIZATION", "P.W0"].every((key) => ack.prerequisites[key] === "RED"), "Atlas P ACK preserves all external RED prerequisites");
check(ack.bases.atlas.head === command(ATLAS, "git", "rev-parse", "HEAD"), "Atlas P ACK binds current Atlas HEAD");
const atlasStatus = execFileSync("git", ["status", "--porcelain=v1", "-z"], { cwd: ATLAS });
check(ack.bases.atlas.dirtyPathDigestSha256 === sha(atlasStatus), "Atlas foreign-state digest is unchanged after read-only ingestion");
check(ack.rootPrecepts.head === command(PRECEPTS, "git", "rev-parse", "HEAD"), "ACK binds current external ROOT precepts commit");
check(ack.rootPrecepts.trancheFormulationSha256 === fileSha(join(PRECEPTS, "instructions/TRANCHE-FORMULATION.md")) && ack.rootPrecepts.designIterationSha256 === fileSha(join(PRECEPTS, "instructions/DESIGN-ITERATION.md")), "ACK binds both external ROOT instruction byte hashes");

const sourceMap = json("coordination/SCI-P4-source-row-mapping.json");
const scopeMap = json("coordination/SCI-P4-scope-row-mapping.json");
const gateMap = json("coordination/SCI-P4-gate-mapping.json");
const targetMap = json("coordination/SCI-P4-target-path-mapping.json");
check(sourceMap.rows.length === 512 && new Set(sourceMap.rows.map((row) => row.atomicActionId)).size === 512, "all 512 P source actions have exactly one mapping");
const isStateVerifierArgv = (argv) => /^\(cd \/Users\/mkbabb\/Programming\/glass-ui && node scripts\/verify\.mjs --state auto --wave BI\.W-P\d{3}\)$/.test(argv);
check(sourceMap.rows.every((row) => ["ACCEPT", "FOLD", "REJECT", "BANK"].includes(row.producerDisposition) && row.canonicalWaves.every((id) => waveIds.has(id)) && invariantIds.has(row.canonicalInvariant) && isStateVerifierArgv(row.canonicalArgv) && row.canonicalArgvByWave.length === row.canonicalWaves.length && row.canonicalArgvByWave.every(({ waveId, argv }) => row.canonicalWaves.includes(waveId) && isStateVerifierArgv(argv)) && row.executableOwner === "scripts/verify.mjs (single state-recovering verifier)" && row.acceptancePredicate), "every P source action has one legal disposition, exact owner, descriptive invariant, and the one auto-recovering executable shape");
check(scopeMap.rows.length === 62 && new Set(scopeMap.rows.map((row) => row.importId)).size === 62 && scopeMap.rows.every((row) => row.writeAuthorityGranted === false), "all 62 keyed Atlas imports are accepted for refresh without write authority");
check(gateMap.rows.length === 60 && new Set(gateMap.rows.map((row) => row.id)).size === 60, "all 60 P gate proposals have exactly one mapping");
check(gateMap.executableIdentityCountCreated === 0 && gateMap.invariantCountNormative === false && gateMap.descriptiveInvariantCount === INVARIANTS.length, "P predicate transposition creates zero executable identities and does not count-lock the invariant vocabulary");
check(gateMap.rows.every((row) => row.disposition === "FOLD" && row.physicalPerGateScriptDisposition === "REJECT" && row.namedRunnableCaseDisposition === "REJECT" && invariantIds.has(row.canonicalInvariant) && row.canonicalWaves.every((id) => waveIds.has(id)) && row.negativeControl && isStateVerifierArgv(row.canonicalArgv) && row.canonicalArgvByWave.length === row.canonicalWaves.length && row.canonicalArgvByWave.every(({ waveId, argv }) => row.canonicalWaves.includes(waveId) && isStateVerifierArgv(argv)) && row.executableOwner === "scripts/verify.mjs (single state-recovering verifier)"), "all P predicates and negative controls survive as auto-recovering evidence-plan data while physical GG scripts, aliases, tables, and named cases are rejected");
check(targetMap.rows.length === 36 && targetMap.rows.every((row) => row.producerDisposition === "ACCEPT" && row.authorityState.includes("UNMATERIALIZED")), "all 36 target-path contracts are accepted only as unmaterialized contracts");

// Generated artifact hash closure.
const manifest = json("FORMATION-MANIFEST.json");
const walkFormation = (dir = ROOT) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return walkFormation(path);
    const rel = relative(ROOT, path);
    return rel === "FORMATION-MANIFEST.json" ? [] : [rel];
}).sort();
const artifactRows = walkFormation().map((path) => ({ path, bytes: statSync(join(ROOT, path)).size, sha256: fileSha(join(ROOT, path)) }));
check(manifest.artifactCount === artifactRows.length, "formation manifest enumerates every artifact except itself");
check(JSON.stringify(manifest.artifacts) === JSON.stringify(artifactRows), "formation artifact paths, sizes, and hashes are current");
const contentDigest = sha(Buffer.from(artifactRows.map((row) => `${row.path}\0${row.sha256}\n`).join("")));
check(manifest.contentDigestSha256 === contentDigest, "formation content digest is current");

const result = {
    ok: errors.length === 0,
    sourceBase: SOURCE_BASE,
    checks: checks.length,
    errors,
    measurements: {
        waves: WAVES.length,
        invariants: INVARIANTS.length,
        legacyGateRows: LEGACY_GATES.length,
        subjectRows: WAVES.reduce((sum, wave) => sum + wave.subjects.length, 0),
        repairRows: WAVES.reduce((sum, wave) => sum + Object.values(wave.repairs).flat().length, 0),
        edges: edgeKeys.size,
        strata: stratum,
        maxStratumWidth: Math.max(...dag.strata.map((layer) => layer.width)),
        criticalPathWaves: dag.criticalPath.waveCount,
        browserWaves: WAVES.filter((wave) => wave.pi.kind === "browser").length,
        deviceFreeWaves: WAVES.filter((wave) => wave.pi.kind === "device-free").length,
        atlasSourceRows: sourceMap.rows.length,
        atlasGateRows: gateMap.rows.length,
        atlasScopeRows: scopeMap.rows.length,
        atlasTargetContracts: targetMap.rows.length,
    },
};

console.log(JSON.stringify(result, null, 2));
if (!result.ok) process.exitCode = 1;
