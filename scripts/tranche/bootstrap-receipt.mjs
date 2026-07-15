import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = resolve(HERE, "../..");
const DEFAULT_PLAN = "docs/tranches/BI/FORMATION/execution-bootstrap-plan.seed.json";
const DEFAULT_MANIFEST = "docs/tranches/BI/FORMATION/FORMATION-MANIFEST.json";
const DEFAULT_WAVES = "docs/tranches/BI/FORMATION/waves.json";
const DEFAULT_RECEIPT = "docs/tranches/BI/BOOTSTRAP.json";
export const INTEGRATION_ADJUNCTS = Object.freeze([
    "docs/tranches/BI/BOOTSTRAP.json",
    "docs/tranches/BI/RELEASE-ATTESTATION.json",
    "docs/tranches/BI/FINAL.md",
]);
const SHA256 = /^[0-9a-f]{64}$/;
const GIT_SHA = /^[0-9a-f]{40}$/;
const FORBIDDEN_LITERAL_FIELDS = new Set([
    "commitSha",
    "treeSha",
    "containingCommit",
    "containingTree",
    "receiptSha256",
]);
const ROOT_KEYS = new Set([
    "schemaVersion", "authority", "formationDigest", "formationAnchorParent", "sourceBase",
    "waveId", "status", "integrationParent", "preCommandSet", "postCommandSet",
    "subjectOutcomes", "evidenceDigest", "routedCurrentReds", "intendedTrailers",
    "payloadDigestExcludingIntegrationAdjuncts",
]);

export class SubjectDispositionError extends Error {
    constructor(message) {
        super(message);
        this.name = "SubjectDispositionError";
        this.code = "BI_SUBJECT_RED";
    }
}

function isObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}

function git(root, args, { allowFailure = false, encoding = "utf8" } = {}) {
    const result = spawnSync("git", ["-C", root, ...args], {
        encoding,
        maxBuffer: 128 * 1024 * 1024,
        stdio: ["ignore", "pipe", "pipe"],
    });
    if (result.error) throw result.error;
    if (result.status !== 0 && !allowFailure) {
        throw new Error(`git ${args.join(" ")} failed (${result.status}): ${(result.stderr || "").toString().trim()}`);
    }
    return result;
}

function sha256(value) {
    return createHash("sha256").update(value).digest("hex");
}

export function compareGitPaths(left, right) {
    return Buffer.compare(Buffer.from(left), Buffer.from(right));
}

export function canonicalJson(value) {
    if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
    if (isObject(value)) {
        return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
    }
    return JSON.stringify(value);
}

export function serializeBootstrapReceipt(receipt) {
    return `${JSON.stringify(receipt, null, 2)}\n`;
}

export function receiptDigest(receiptOrBytes) {
    const bytes = Buffer.isBuffer(receiptOrBytes) || typeof receiptOrBytes === "string"
        ? receiptOrBytes
        : serializeBootstrapReceipt(receiptOrBytes);
    return sha256(bytes);
}

export function parseStageEntries(raw) {
    const entries = [];
    for (const record of raw.toString("utf8").split("\0")) {
        if (!record) continue;
        const match = /^(\d{6}) ([0-9a-f]{40}) ([0-3])\t([\s\S]+)$/.exec(record);
        if (!match) throw new Error(`unparseable Git index record: ${record}`);
        const [, mode, oid, stage, path] = match;
        if (stage !== "0") throw new Error(`unmerged index entry is not a canonical stage-0 payload: ${path}`);
        entries.push({ mode, oid, path });
    }
    return entries;
}

export function parseTreeEntries(raw) {
    const entries = [];
    for (const record of raw.toString("utf8").split("\0")) {
        if (!record) continue;
        const match = /^(\d{6}) (?:blob|commit) ([0-9a-f]{40})\t([\s\S]+)$/.exec(record);
        if (!match) throw new Error(`unparseable Git tree record: ${record}`);
        const [, mode, oid, path] = match;
        entries.push({ mode, oid, path });
    }
    return entries;
}

export function canonicalStage0Payload(entries, excludes = INTEGRATION_ADJUNCTS) {
    const excluded = new Set(excludes);
    const filtered = entries
        .filter((entry) => !excluded.has(entry.path))
        .sort((left, right) => compareGitPaths(left.path, right.path));
    const paths = new Set();
    const chunks = [];
    for (const entry of filtered) {
        if (paths.has(entry.path)) throw new Error(`duplicate canonical payload path: ${entry.path}`);
        paths.add(entry.path);
        if (!/^\d{6}$/.test(entry.mode) || !GIT_SHA.test(entry.oid) || typeof entry.path !== "string" || entry.path.length === 0) {
            throw new Error(`invalid canonical payload entry: ${JSON.stringify(entry)}`);
        }
        chunks.push(`${entry.path}\0${entry.mode}\0${entry.oid}\n`);
    }
    return {
        algorithm: "sha256(canonical-git-stage0-index-v1)",
        sha256: sha256(chunks.join("")),
        entryCount: filtered.length,
        excludes: [...INTEGRATION_ADJUNCTS],
    };
}

export function readRepositoryEntries(root, view = "index", ref = "HEAD") {
    if (view === "index") {
        const result = git(root, ["ls-files", "--stage", "-z"], { encoding: null });
        return parseStageEntries(result.stdout);
    }
    if (view === "commit") {
        const result = git(root, ["ls-tree", "-rz", "--full-tree", ref], { encoding: null });
        return parseTreeEntries(result.stdout);
    }
    throw new Error(`unsupported repository view: ${view}`);
}

function readGitPath(root, path, view = "index", ref = "HEAD") {
    const specifier = view === "index" ? `:${path}` : `${ref}:${path}`;
    const result = git(root, ["show", specifier], { encoding: null });
    return result.stdout;
}

function commandRows(scripts) {
    return Object.entries(scripts ?? {})
        .map(([key, argv]) => ({ surface: "package.json", key, argv }))
        .sort((left, right) => compareGitPaths(left.key, right.key));
}

function dispositionFor(subject, postimage) {
    switch (subject.action) {
        case "create":
            if (subject.before !== null || !postimage) throw new SubjectDispositionError(`${subject.path}: CREATE pre/post image mismatch`);
            return "CREATED";
        case "delete":
            if (!subject.before || postimage) throw new SubjectDispositionError(`${subject.path}: DELETE pre/post image mismatch`);
            return "DELETED";
        case "modify":
            if (!subject.before || !postimage || subject.before === postimage) throw new SubjectDispositionError(`${subject.path}: MODIFY did not change its source-base blob`);
            return "MODIFIED";
        case "repair":
            if (!subject.before || !postimage) throw new SubjectDispositionError(`${subject.path}: REPAIR requires both source-base and terminal images`);
            return subject.before === postimage ? "VERIFIED_UNCHANGED" : "MODIFIED";
        case "verify":
            if (!postimage) throw new SubjectDispositionError(`${subject.path}: VERIFY path is absent from the terminal payload`);
            if (subject.before && subject.before !== postimage) throw new SubjectDispositionError(`${subject.path}: VERIFY path changed unexpectedly`);
            return "VERIFIED_UNCHANGED";
        case "rename":
            if (!subject.before || !postimage) throw new SubjectDispositionError(`${subject.path}: RENAME requires both images`);
            return "RENAMED";
        default:
            throw new Error(`${subject.path}: unsupported planned action ${subject.action}`);
    }
}

export function deriveSubjectOutcomes(subjects, entries, anchorEntries = []) {
    const byPath = new Map(entries.map((entry) => [entry.path, entry]));
    const anchorByPath = new Map(anchorEntries.map((entry) => [entry.path, entry]));
    const seen = new Set();
    return subjects.map((subject) => {
        if (seen.has(subject.path)) throw new Error(`duplicate P000 subject path: ${subject.path}`);
        seen.add(subject.path);
        const postEntry = byPath.get(subject.path) ?? null;
        const anchorEntry = anchorByPath.get(subject.path) ?? null;
        const postimage = postEntry?.oid ?? null;
        const anchoredPreimage = subject.action === "verify" && subject.before === null
            ? anchorEntry?.oid ?? null
            : subject.before ?? null;
        if (subject.action === "verify" && anchorEntry && postEntry && anchorEntry.mode !== postEntry.mode) {
            throw new SubjectDispositionError(`${subject.path}: VERIFY Git mode changed unexpectedly`);
        }
        const subjectWithAnchor = { ...subject, before: anchoredPreimage };
        return {
            path: subject.path,
            plannedAction: subject.action,
            disposition: dispositionFor(subjectWithAnchor, postimage),
            preimage: anchoredPreimage,
            postimage,
        };
    });
}

function findForbiddenFields(value, path, errors) {
    if (Array.isArray(value)) {
        value.forEach((item, index) => findForbiddenFields(item, `${path}[${index}]`, errors));
        return;
    }
    if (!isObject(value)) return;
    for (const [key, nested] of Object.entries(value)) {
        if (FORBIDDEN_LITERAL_FIELDS.has(key)) errors.push(`${path}.${key}: forbidden self-reference field`);
        if (["BI-Receipt-SHA256", "BI-Attestation-SHA256", "BI-FINAL-SHA256"].includes(key)) {
            errors.push(`${path}.${key}: derived R/A/F digest values are forbidden inside a receipt`);
        }
        findForbiddenFields(nested, `${path}.${key}`, errors);
    }
}

function sameArray(left, right) {
    return Array.isArray(left) && left.length === right.length && left.every((item, index) => item === right[index]);
}

function validateCommands(value, path, errors) {
    if (!Array.isArray(value)) {
        errors.push(`${path}: expected an array`);
        return;
    }
    const identities = new Set();
    for (const [index, command] of value.entries()) {
        if (!isObject(command)) {
            errors.push(`${path}[${index}]: expected an object`);
            continue;
        }
        const keys = Object.keys(command);
        if (keys.some((key) => !["surface", "key", "argv"].includes(key))) errors.push(`${path}[${index}]: unexpected property`);
        if (![command.surface, command.key, command.argv].every((item) => typeof item === "string" && item.length > 0)) errors.push(`${path}[${index}]: surface, key, and argv are required`);
        const identity = `${command.surface}\0${command.key}`;
        if (identities.has(identity)) errors.push(`${path}[${index}]: duplicate command identity`);
        identities.add(identity);
    }
}

export function validateBootstrapReceipt(value, expected = {}) {
    const errors = [];
    if (!isObject(value)) return { ok: false, errors: ["receipt: expected an object"] };
    for (const key of Object.keys(value)) if (!ROOT_KEYS.has(key)) errors.push(`receipt.${key}: unexpected property`);
    findForbiddenFields(value, "receipt", errors);
    if (value.schemaVersion !== "1.0.0") errors.push("receipt.schemaVersion: expected 1.0.0");
    if (value.authority !== "GIT_FIRST_PARENT_PLUS_COMMITTED_RECEIPTS") errors.push("receipt.authority: invalid authority");
    for (const key of ["formationDigest", "evidenceDigest"]) if (!SHA256.test(value[key] ?? "")) errors.push(`receipt.${key}: expected SHA-256`);
    for (const key of ["formationAnchorParent", "sourceBase", "integrationParent"]) if (!GIT_SHA.test(value[key] ?? "")) errors.push(`receipt.${key}: expected full Git SHA`);
    if (value.waveId !== "BI.W-P000") errors.push("receipt.waveId: bootstrap receipt is P000-only");
    if (!["DONE", "DEAD"].includes(value.status)) errors.push("receipt.status: expected DONE or DEAD");
    validateCommands(value.preCommandSet, "receipt.preCommandSet", errors);
    validateCommands(value.postCommandSet, "receipt.postCommandSet", errors);

    if (!Array.isArray(value.subjectOutcomes) || value.subjectOutcomes.length === 0) {
        errors.push("receipt.subjectOutcomes: expected exhaustive terminal path outcomes");
    } else {
        const paths = new Set();
        const dispositions = new Set(["CREATED", "DELETED", "MODIFIED", "RENAMED", "VERIFIED_UNCHANGED"]);
        const actions = new Set(["create", "delete", "modify", "rename", "repair", "verify"]);
        value.subjectOutcomes.forEach((outcome, index) => {
            if (!isObject(outcome)) {
                errors.push(`receipt.subjectOutcomes[${index}]: expected an object`);
                return;
            }
            if (Object.keys(outcome).some((key) => !["path", "plannedAction", "disposition", "preimage", "postimage"].includes(key))) errors.push(`receipt.subjectOutcomes[${index}]: unexpected property`);
            const path = outcome.path;
            if (typeof path !== "string" || path.length === 0 || paths.has(path)) errors.push(`receipt.subjectOutcomes[${index}].path: required and unique`);
            paths.add(path);
            if (!actions.has(outcome.plannedAction)) errors.push(`receipt.subjectOutcomes[${index}].plannedAction: invalid`);
            if (!dispositions.has(outcome.disposition)) errors.push(`receipt.subjectOutcomes[${index}].disposition: invalid`);
            for (const image of ["preimage", "postimage"]) if (outcome[image] !== null && !GIT_SHA.test(outcome[image] ?? "")) errors.push(`receipt.subjectOutcomes[${index}].${image}: expected Git object or null`);
        });
        if (expected.subjectOutcomes && canonicalJson(value.subjectOutcomes) !== canonicalJson(expected.subjectOutcomes)) {
            errors.push("receipt.subjectOutcomes: do not match the terminal Git view and P000 manifest");
        }
    }

    if (!Array.isArray(value.routedCurrentReds)) {
        errors.push("receipt.routedCurrentReds: expected an array");
    } else {
        const findings = new Set();
        value.routedCurrentReds.forEach((finding, index) => {
            if (!isObject(finding)) {
                errors.push(`receipt.routedCurrentReds[${index}]: expected an object`);
                return;
            }
            if (Object.keys(finding).some((key) => !["findingId", "invariantFamily", "summary", "status", "ownerWave", "evidencePath"].includes(key))) errors.push(`receipt.routedCurrentReds[${index}]: unexpected property`);
            if (typeof finding.findingId !== "string" || finding.findingId.length === 0 || findings.has(finding.findingId)) errors.push(`receipt.routedCurrentReds[${index}].findingId: required and unique`);
            findings.add(finding.findingId);
            if (finding.status !== "ROUTED_RED") errors.push(`receipt.routedCurrentReds[${index}].status: must remain ROUTED_RED`);
            if (!/^BI\.W-P(?:00[1-9]|0[1-9][0-9]|1[0-2][0-9]|13[0-3])$/.test(finding.ownerWave ?? "")) errors.push(`receipt.routedCurrentReds[${index}].ownerWave: expected exactly one future owner`);
            for (const key of ["invariantFamily", "summary", "evidencePath"]) if (typeof finding[key] !== "string" || finding[key].length === 0) errors.push(`receipt.routedCurrentReds[${index}].${key}: required`);
            if (finding.evidencePath !== "docs/tranches/BI/BOOTSTRAP.json") errors.push(`receipt.routedCurrentReds[${index}].evidencePath: must be the canonical bootstrap receipt`);
        });
    }

    const trailers = value.intendedTrailers;
    if (!isObject(trailers)) {
        errors.push("receipt.intendedTrailers: expected an object");
    } else {
        if (Object.keys(trailers).some((key) => !["names", "values", "externallyDerived"].includes(key))) errors.push("receipt.intendedTrailers: unexpected property");
        if (!sameArray(trailers.names, ["BI-Wave", "BI-Status", "BI-Receipt-SHA256", "BI-Formation-SHA256"])) errors.push("receipt.intendedTrailers.names: expected the four core names in canonical order");
        if (!sameArray(trailers.externallyDerived, ["BI-Receipt-SHA256"])) errors.push("receipt.intendedTrailers.externallyDerived: only the receipt digest is externally derived at P000");
        const values = trailers.values;
        if (!isObject(values) || Object.keys(values).some((key) => !["BI-Wave", "BI-Status", "BI-Formation-SHA256"].includes(key))) {
            errors.push("receipt.intendedTrailers.values: only acyclic embedded values are permitted");
        } else {
            if (values["BI-Wave"] !== "BI.W-P000") errors.push("receipt.intendedTrailers.values.BI-Wave: invalid");
            if (values["BI-Status"] !== value.status) errors.push("receipt.intendedTrailers.values.BI-Status: must equal receipt status");
            if (values["BI-Formation-SHA256"] !== value.formationDigest) errors.push("receipt.intendedTrailers.values.BI-Formation-SHA256: must equal formation digest");
        }
    }

    const payload = value.payloadDigestExcludingIntegrationAdjuncts;
    if (!isObject(payload)) {
        errors.push("receipt.payloadDigestExcludingIntegrationAdjuncts: expected an object");
    } else {
        if (Object.keys(payload).some((key) => !["algorithm", "sha256", "entryCount", "excludes"].includes(key))) errors.push("receipt.payloadDigestExcludingIntegrationAdjuncts: unexpected property");
        if (payload.algorithm !== "sha256(canonical-git-stage0-index-v1)") errors.push("receipt.payloadDigestExcludingIntegrationAdjuncts.algorithm: invalid");
        if (!SHA256.test(payload.sha256 ?? "")) errors.push("receipt.payloadDigestExcludingIntegrationAdjuncts.sha256: expected SHA-256");
        if (!Number.isInteger(payload.entryCount) || payload.entryCount < 1) errors.push("receipt.payloadDigestExcludingIntegrationAdjuncts.entryCount: expected positive integer");
        if (!sameArray(payload.excludes, INTEGRATION_ADJUNCTS)) errors.push("receipt.payloadDigestExcludingIntegrationAdjuncts.excludes: exact integration adjunct set required");
    }

    for (const key of ["formationDigest", "formationAnchorParent", "sourceBase", "integrationParent", "evidenceDigest"]) {
        const expectedValue = expected[key];
        if (expectedValue !== undefined && value[key] !== expectedValue) errors.push(`receipt.${key}: does not match authoritative context`);
    }
    if (expected.payloadDigest && canonicalJson(value.payloadDigestExcludingIntegrationAdjuncts) !== canonicalJson(expected.payloadDigest)) errors.push("receipt.payloadDigestExcludingIntegrationAdjuncts: does not match the authoritative Git payload");
    if (expected.preCommandSet && canonicalJson(value.preCommandSet) !== canonicalJson(expected.preCommandSet)) errors.push("receipt.preCommandSet: does not match source-base package commands");
    if (expected.postCommandSet && canonicalJson(value.postCommandSet) !== canonicalJson(expected.postCommandSet)) errors.push("receipt.postCommandSet: does not match terminal package commands");
    if (expected.routedCurrentReds && canonicalJson(value.routedCurrentReds) !== canonicalJson(expected.routedCurrentReds)) errors.push("receipt.routedCurrentReds: do not match the verifier-detected and exactly routed current-source findings");
    return { ok: errors.length === 0, errors };
}

function readCommitPath(root, commit, path) {
    return git(root, ["show", `${commit}:${path}`], { encoding: null }).stdout;
}

function parseJsonBytes(bytes, label) {
    try {
        return JSON.parse(bytes.toString("utf8"));
    } catch (error) {
        throw new Error(`${label} is not valid JSON: ${error.message}`);
    }
}

function verifyFormationManifest(root, anchor, manifest) {
    if (manifest.schemaVersion !== 1 || !Array.isArray(manifest.artifacts) || manifest.artifactCount !== manifest.artifacts.length) {
        throw new Error("formation anchor manifest has an invalid schema or artifact count");
    }
    if (manifest.contentDigestAlgorithm !== "sha256(concat(path + NUL + sha256(file)-hex + LF)) excluding FORMATION-MANIFEST.json") {
        throw new Error("formation anchor manifest uses an unknown digest algorithm");
    }
    const seen = new Set();
    const rows = [...manifest.artifacts].sort((left, right) => compareGitPaths(left.path, right.path));
    const chunks = [];
    for (const row of rows) {
        if (!row || typeof row.path !== "string" || row.path.length === 0 || row.path.startsWith("/") || row.path.includes("..") || seen.has(row.path)) {
            throw new Error(`formation anchor manifest contains an invalid or duplicate path: ${String(row?.path)}`);
        }
        seen.add(row.path);
        const bytes = readCommitPath(root, anchor, `docs/tranches/BI/FORMATION/${row.path}`);
        const digest = sha256(bytes);
        if (row.bytes !== bytes.length || row.sha256 !== digest) throw new Error(`formation anchor artifact differs from its manifest: ${row.path}`);
        chunks.push(`${row.path}\0${digest}\n`);
    }
    const closureDigest = sha256(chunks.join(""));
    if (closureDigest !== manifest.contentDigestSha256) throw new Error("formation anchor manifest closure digest does not reproduce");
    for (const required of ["execution-bootstrap-plan.seed.json", "waves.json"]) {
        if (!seen.has(required)) throw new Error(`formation anchor manifest omits required authority ${required}`);
    }
    const treePaths = git(root, ["ls-tree", "-r", "--name-only", "-z", anchor, "--", "docs/tranches/BI/FORMATION"], { encoding: null })
        .stdout.toString("utf8").split("\0").filter(Boolean)
        .map((path) => path.slice("docs/tranches/BI/FORMATION/".length))
        .filter((path) => path !== "FORMATION-MANIFEST.json")
        .sort(compareGitPaths);
    const manifestPaths = [...seen].sort(compareGitPaths);
    const closure = validateFormationTreeClosure(manifestPaths, treePaths);
    if (!closure.ok) throw new Error(closure.errors.join("\n"));
    return closureDigest;
}

export function validateFormationTreeClosure(manifestPaths, treePaths) {
    const canonicalManifest = [...manifestPaths].sort(compareGitPaths);
    const canonicalTree = [...treePaths].sort(compareGitPaths);
    const errors = [];
    if (new Set(canonicalManifest).size !== canonicalManifest.length) errors.push("formation manifest contains duplicate authority paths");
    if (new Set(canonicalTree).size !== canonicalTree.length) errors.push("formation tree contains duplicate authority paths");
    if (canonicalJson(canonicalTree) !== canonicalJson(canonicalManifest)) {
        errors.push("formation anchor tree contains an unlisted or missing manifest authority path");
    }
    return { ok: errors.length === 0, errors };
}

export function validateSubjectDeltaClosure(wave, deltaPaths, receiptPath = DEFAULT_RECEIPT) {
    const errors = [];
    const allowedDelta = new Set((wave?.subjects ?? []).filter((subject) => subject.action !== "verify").map((subject) => subject.path));
    allowedDelta.add(receiptPath);
    const seen = new Set();
    for (const path of deltaPaths) {
        if (seen.has(path)) errors.push(`duplicate terminal delta path: ${path}`);
        seen.add(path);
        if (!allowedDelta.has(path)) errors.push(`foreign path escapes the P000 subject/envelope closure: ${path}`);
    }
    for (const inactive of ["docs/tranches/BI/RELEASE-ATTESTATION.json", "docs/tranches/BI/FINAL.md"]) {
        if (seen.has(inactive)) errors.push(`${inactive}: inactive projection path changed during P000`);
    }
    return { ok: errors.length === 0, errors };
}

export function canonicalEvidenceDigest(evidence) {
    if (!isObject(evidence)) throw new Error("canonical evidence must be an object");
    return sha256(canonicalJson(evidence));
}

export async function authoritativeBootstrapContext({
    root = DEFAULT_ROOT,
    view = "index",
    ref = "HEAD",
    integrationParent = "HEAD",
    planPath = DEFAULT_PLAN,
    manifestPath = DEFAULT_MANIFEST,
    wavesPath = DEFAULT_WAVES,
} = {}) {
    const resolvedParent = git(root, ["rev-parse", integrationParent]).stdout.trim();
    const expectedParent = view === "index"
        ? git(root, ["rev-parse", "HEAD"]).stdout.trim()
        : git(root, ["rev-parse", `${ref}^`]).stdout.trim();
    if (resolvedParent !== expectedParent) {
        throw new Error(`integrationParent ${resolvedParent} is not the exact ${view === "index" ? "precommit HEAD" : `${ref} first parent`}`);
    }
    const parentLine = git(root, ["rev-list", "--parents", "-n", "1", resolvedParent]).stdout.trim().split(/\s+/);
    if (parentLine.length !== 2 || parentLine[0] !== resolvedParent) throw new Error("formation anchor must have exactly one parent");
    const formationAnchorParent = parentLine[1];

    const planBytes = readCommitPath(root, resolvedParent, planPath);
    const manifestBytes = readCommitPath(root, resolvedParent, manifestPath);
    const wavesBytes = readCommitPath(root, resolvedParent, wavesPath);
    const taxonomyBytes = readCommitPath(root, resolvedParent, "docs/tranches/BI/FORMATION/invariants.json");
    const dagBytes = readCommitPath(root, resolvedParent, "docs/tranches/BI/FORMATION/dag.json");
    const plan = parseJsonBytes(planBytes, "anchored bootstrap plan");
    const manifest = parseJsonBytes(manifestBytes, "anchored formation manifest");
    const waves = parseJsonBytes(wavesBytes, "anchored waves registry");
    const taxonomy = parseJsonBytes(taxonomyBytes, "anchored invariant taxonomy");
    const dag = parseJsonBytes(dagBytes, "anchored formation DAG");
    if (plan.waveId !== "BI.W-P000" || plan.mode !== "P000_BOOTSTRAP_ONLY") throw new Error("formation bootstrap plan is not the immutable P000 authority");
    if (plan.sourceBase !== formationAnchorParent || manifest.sourceBase !== formationAnchorParent) throw new Error("formation anchor is not a direct child of the declared source base");
    const anchorDelta = git(root, ["diff-tree", "--no-commit-id", "--name-only", "-r", "-z", formationAnchorParent, resolvedParent], { encoding: null })
        .stdout.toString("utf8").split("\0").filter(Boolean);
    const foreignAnchorPath = anchorDelta.find((path) => !path.startsWith("docs/tranches/BI/FORMATION/"));
    if (foreignAnchorPath) throw new Error(`formation anchor contains hidden non-formation payload: ${foreignAnchorPath}`);
    const formationDigest = verifyFormationManifest(root, resolvedParent, manifest);
    const wave = waves.waves?.find((item) => item.id === "BI.W-P000");
    if (!wave) throw new Error("waves.json does not contain BI.W-P000");
    const entries = readRepositoryEntries(root, view, ref);
    const anchorEntries = readRepositoryEntries(root, "commit", resolvedParent);
    const packageBytes = readGitPath(root, "package.json", view, ref);
    const prePackageBytes = git(root, ["show", `${plan.sourceBase}:package.json`], { encoding: null }).stdout;
    const deltaRaw = view === "index"
        ? git(root, ["diff", "--cached", "--name-only", "-z", resolvedParent], { encoding: null }).stdout
        : git(root, ["diff-tree", "--no-commit-id", "--name-only", "-r", "-z", resolvedParent, ref], { encoding: null }).stdout;
    const deltaPaths = deltaRaw.toString("utf8").split("\0").filter(Boolean);
    const deltaClosure = validateSubjectDeltaClosure(wave, deltaPaths);
    if (!deltaClosure.ok) throw new SubjectDispositionError(deltaClosure.errors.join("\n"));
    return {
        formationDigest,
        formationAnchorParent,
        sourceBase: plan.sourceBase,
        integrationParent: resolvedParent,
        plan,
        planBytes,
        manifest,
        wave,
        waves,
        dag,
        taxonomy,
        taxonomyBytes,
        preCommandSet: commandRows(JSON.parse(prePackageBytes.toString("utf8")).scripts),
        postCommandSet: commandRows(JSON.parse(packageBytes.toString("utf8")).scripts),
        subjectOutcomes: deriveSubjectOutcomes(wave.subjects, entries, anchorEntries),
        entries,
        anchorEntries,
        payloadDigest: canonicalStage0Payload(entries),
        deltaPaths: deltaPaths.sort(compareGitPaths),
    };
}

export async function createBootstrapReceipt({
    root = DEFAULT_ROOT,
    status = "DONE",
    evidence,
    routedCurrentReds = [],
    view = "index",
    ref = "HEAD",
    integrationParent = "HEAD",
} = {}) {
    const evidenceDigest = canonicalEvidenceDigest(evidence);
    const context = await authoritativeBootstrapContext({ root, view, ref, integrationParent });
    const receipt = {
        schemaVersion: "1.0.0",
        authority: "GIT_FIRST_PARENT_PLUS_COMMITTED_RECEIPTS",
        formationDigest: context.formationDigest,
        formationAnchorParent: context.formationAnchorParent,
        sourceBase: context.sourceBase,
        waveId: "BI.W-P000",
        status,
        integrationParent: context.integrationParent,
        preCommandSet: context.preCommandSet,
        postCommandSet: context.postCommandSet,
        subjectOutcomes: context.subjectOutcomes,
        evidenceDigest,
        routedCurrentReds,
        intendedTrailers: {
            names: ["BI-Wave", "BI-Status", "BI-Receipt-SHA256", "BI-Formation-SHA256"],
            values: {
                "BI-Wave": "BI.W-P000",
                "BI-Status": status,
                "BI-Formation-SHA256": context.formationDigest,
            },
            externallyDerived: ["BI-Receipt-SHA256"],
        },
        payloadDigestExcludingIntegrationAdjuncts: context.payloadDigest,
    };
    const validation = validateBootstrapReceipt(receipt, { ...context, evidenceDigest });
    if (!validation.ok) throw new Error(validation.errors.join("\n"));
    return receipt;
}

function parseArgs(argv) {
    const [operation = "help", ...rest] = argv;
    const options = { operation };
    for (let index = 0; index < rest.length; index += 1) {
        const token = rest[index];
        if (!token.startsWith("--")) throw new Error(`unexpected positional argument: ${token}`);
        const key = token.slice(2).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        const value = rest[index + 1];
        if (!value || value.startsWith("--")) throw new Error(`${token} requires a value`);
        options[key] = value;
        index += 1;
    }
    return options;
}

function deriveLiveEvidence(root, routedRedsPath = null) {
    const argv = [
        resolve(root, "scripts/verify.mjs"),
        "--root", root,
        "--bootstrap-plan", DEFAULT_PLAN,
        "--wave", "BI.W-P000",
        "--evidence-digest-only",
        "--json",
    ];
    if (routedRedsPath) argv.push("--routed-reds", routedRedsPath);
    const result = spawnSync(process.execPath, argv, {
        cwd: root,
        encoding: "utf8",
        env: { ...process.env, CI: "1", NO_COLOR: "1", FORCE_COLOR: "0" },
        maxBuffer: 128 * 1024 * 1024,
        stdio: ["ignore", "pipe", "pipe"],
    });
    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error(`live bootstrap evidence is RED (${result.status}): ${result.stderr.trim()} ${result.stdout.trim()}`.trim());
    let report;
    try {
        report = JSON.parse(result.stdout.trim().split("\n").at(-1));
    } catch (error) {
        throw new Error(`live bootstrap evidence did not return canonical JSON: ${error.message}`);
    }
    if (report.status !== "PASS" || !isObject(report.evidence)) throw new Error("live bootstrap evidence did not produce a PASS evidence object");
    if (report.evidenceDigest !== canonicalEvidenceDigest(report.evidence)) throw new Error("live bootstrap evidence digest does not reproduce from canonical evidence bytes");
    return report.evidence;
}

async function runCli() {
    const options = parseArgs(process.argv.slice(2));
    const root = resolve(options.root ?? DEFAULT_ROOT);
    if (options.operation === "render") {
        if (options.view && options.view !== "index") throw new Error("receipt render is precommit index-only; committed verification belongs to scripts/verify.mjs --wave-from-commit");
        let routedCurrentReds = [];
        if (options.routedReds) routedCurrentReds = JSON.parse(await readFile(resolve(root, options.routedReds), "utf8"));
        const evidence = deriveLiveEvidence(root, options.routedReds ? resolve(root, options.routedReds) : null);
        const receipt = await createBootstrapReceipt({
            root,
            status: options.status ?? "DONE",
            evidence,
            routedCurrentReds,
            view: options.view ?? "index",
            ref: options.ref ?? "HEAD",
            integrationParent: options.integrationParent ?? "HEAD",
        });
        const output = resolve(root, options.output ?? DEFAULT_RECEIPT);
        await writeFile(output, serializeBootstrapReceipt(receipt));
        process.stdout.write(`${JSON.stringify({ ok: true, output, receiptSha256: receiptDigest(receipt) })}\n`);
        return;
    }
    if (options.operation === "validate" || options.operation === "check") {
        if (options.view && options.view !== "index") throw new Error("receipt helper validation is index-only; committed evidence must use scripts/verify.mjs --wave-from-commit");
        const receiptPath = resolve(root, options.receipt ?? DEFAULT_RECEIPT);
        const receipt = JSON.parse(await readFile(receiptPath, "utf8"));
        const context = await authoritativeBootstrapContext({
            root,
            view: options.view ?? "index",
            ref: options.ref ?? "HEAD",
            integrationParent: options.integrationParent ?? receipt.integrationParent,
        });
        if (receipt.routedCurrentReds?.length > 0 && !options.routedReds) throw new Error("validating a routed bootstrap receipt requires --routed-reds <same canonical route JSON>");
        const evidence = deriveLiveEvidence(root, options.routedReds ? resolve(root, options.routedReds) : null);
        const validation = validateBootstrapReceipt(receipt, { ...context, evidenceDigest: canonicalEvidenceDigest(evidence) });
        process.stdout.write(`${JSON.stringify({ ...validation, receiptSha256: receiptDigest(await readFile(receiptPath)) })}\n`);
        if (!validation.ok) process.exitCode = 1;
        return;
    }
    if (options.operation === "payload-digest") {
        const payload = canonicalStage0Payload(readRepositoryEntries(root, options.view ?? "index", options.ref ?? "HEAD"));
        process.stdout.write(`${JSON.stringify(payload)}\n`);
        return;
    }
    if (options.operation === "digest") {
        const receiptPath = resolve(root, options.receipt ?? DEFAULT_RECEIPT);
        process.stdout.write(`${receiptDigest(await readFile(receiptPath))}\n`);
        return;
    }
    process.stdout.write(
        "Usage:\n" +
        "  bootstrap-receipt.mjs render [--output <path>] [--view index]\n" +
        "  bootstrap-receipt.mjs validate [--receipt <path>] [--view index]\n" +
        "  bootstrap-receipt.mjs payload-digest [--view index|commit]\n" +
        "  bootstrap-receipt.mjs digest [--receipt <path>]\n",
    );
    if (options.operation !== "help") process.exitCode = 64;
}

const invoked = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invoked) {
    runCli().catch((error) => {
        process.stderr.write(`bootstrap-receipt: ${error.message}\n`);
        process.exitCode = 65;
    });
}
