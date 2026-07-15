import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

import {
    canonicalJson,
    compareGitPaths,
    parseStageEntries,
    parseTreeEntries,
} from "./bootstrap-receipt.mjs";

export const WAVE_RECEIPT_AUTHORITY = "GIT_FIRST_PARENT_PLUS_COMMITTED_RECEIPTS";
export const CORE_TRAILER_NAMES = Object.freeze([
    "BI-Wave",
    "BI-Status",
    "BI-Receipt-SHA256",
    "BI-Formation-SHA256",
]);
export const PROJECTION_TRAILER_NAMES = Object.freeze([
    "BI-Attestation-SHA256",
    "BI-FINAL-SHA256",
]);
export const CONTINUOUS_PROJECTION_PATHS = Object.freeze([
    "docs/tranches/BI/RELEASE-ATTESTATION.json",
    "docs/tranches/BI/FINAL.md",
]);

const SHA256 = /^[0-9a-f]{64}$/;
const GIT_SHA = /^[0-9a-f]{40}$/;
const WAVE_ID = /^BI\.W-P(?!000$)(?:[0-9]{3}|[1-9][0-9]{3,})$/;
const ANY_WAVE_ID = /^BI\.W-P(?:[0-9]{3}|[1-9][0-9]{3,})$/;
const ACTIONS = new Set(["create", "delete", "modify", "rename", "repair", "verify"]);
const DISPOSITIONS = new Set(["CREATED", "DELETED", "MODIFIED", "RENAMED", "VERIFIED_UNCHANGED", "WITHDRAWN"]);
const RECEIPT_KEYS = new Set([
    "schemaVersion",
    "authority",
    "formationDigest",
    "sourceBase",
    "waveId",
    "status",
    "integrationParent",
    "receiptPath",
    "dependsOn",
    "integrationRequires",
    "projectionMode",
    "subjectOutcomes",
    "evidence",
    "terminalRationale",
    "intendedTrailers",
    "payloadDigestExcludingCurrentIntegrationAdjuncts",
]);
const FORBIDDEN_SELF_REFERENCE_KEYS = new Set([
    "commitSha",
    "treeSha",
    "containingCommit",
    "containingTree",
    "receiptSha256",
    "attestationSha256",
    "finalSha256",
    "BI-Receipt-SHA256",
    "BI-Attestation-SHA256",
    "BI-FINAL-SHA256",
]);

export class TransactionEnvelopeError extends Error {
    constructor(message, code = "BI_TRANSACTION_RED") {
        super(message);
        this.name = "TransactionEnvelopeError";
        this.code = code;
    }
}

function isObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}

function sha256(value) {
    return createHash("sha256").update(value).digest("hex");
}

function exactSubprocessEnv() {
    const env = { ...process.env };
    for (const key of Object.keys(env)) {
        if (key.startsWith("GIT_") || key === "NODE_OPTIONS" || key === "NODE_PATH") delete env[key];
    }
    return {
        ...env,
        GIT_CONFIG_NOSYSTEM: "1",
        GIT_CONFIG_GLOBAL: "/dev/null",
        GIT_CONFIG_COUNT: "0",
        LC_ALL: "C",
        LANG: "C",
        GIT_NO_REPLACE_OBJECTS: "1",
    };
}

function sortJson(value) {
    if (Array.isArray(value)) return value.map(sortJson);
    if (!isObject(value)) return value;
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, sortJson(value[key])]));
}

function git(root, args, { allowFailure = false, encoding = "utf8" } = {}) {
    const result = spawnSync("git", ["-C", root, ...args], {
        encoding,
        env: exactSubprocessEnv(),
        maxBuffer: 128 * 1024 * 1024,
        stdio: ["ignore", "pipe", "pipe"],
    });
    if (result.error) throw result.error;
    if (result.status !== 0 && !allowFailure) {
        throw new TransactionEnvelopeError(
            `git ${args.join(" ")} failed (${result.status}): ${(result.stderr || "").toString().trim()}`,
            "BI_GIT_RED",
        );
    }
    return result;
}

function readExactRepositoryEntries(root, view = "index", ref = "HEAD") {
    if (view === "index") return parseStageEntries(git(root, ["ls-files", "--stage", "-z"], { encoding: null }).stdout);
    if (view === "commit") return parseTreeEntries(git(root, ["ls-tree", "-rz", "--full-tree", ref], { encoding: null }).stdout);
    throw new TransactionEnvelopeError(`unsupported repository view: ${String(view)}`);
}

function sameArray(left, right) {
    return Array.isArray(left) && left.length === right.length && left.every((item, index) => item === right[index]);
}

function validPath(path) {
    return typeof path === "string"
        && path.length > 0
        && !path.startsWith("/")
        && !path.includes("\\")
        && path.split("/").every((part) => part.length > 0 && part !== "." && part !== "..");
}

function validateUniqueWaveIds(value, path, errors) {
    if (!Array.isArray(value)) {
        errors.push(`${path}: expected an array`);
        return;
    }
    const seen = new Set();
    value.forEach((waveId, index) => {
        if (!ANY_WAVE_ID.test(waveId ?? "")) errors.push(`${path}[${index}]: invalid wave id`);
        if (seen.has(waveId)) errors.push(`${path}[${index}]: duplicate wave id`);
        seen.add(waveId);
    });
}

function gitObject(entry) {
    return entry ? { mode: entry.mode, oid: entry.oid } : null;
}

function sameGitObject(left, right) {
    return left !== null && right !== null && left.mode === right.mode && left.oid === right.oid;
}

function entryMap(entries, label) {
    const result = new Map();
    for (const entry of entries) {
        if (!entry || !validPath(entry.path) || !/^\d{6}$/.test(entry.mode ?? "") || !GIT_SHA.test(entry.oid ?? "")) {
            throw new TransactionEnvelopeError(`${label} contains an invalid Git entry: ${JSON.stringify(entry)}`);
        }
        if (result.has(entry.path)) throw new TransactionEnvelopeError(`${label} contains duplicate path ${entry.path}`);
        result.set(entry.path, entry);
    }
    return result;
}

function validateSubjectShape(subject, index) {
    if (!isObject(subject) || !validPath(subject.path) || !ACTIONS.has(subject.action)) {
        throw new TransactionEnvelopeError(`subjects[${index}]: invalid planned subject`);
    }
    if (subject.action === "rename") {
        if (!validPath(subject.targetPath) || subject.targetPath === subject.path) {
            throw new TransactionEnvelopeError(`subjects[${index}]: RENAME requires a distinct targetPath`);
        }
    } else if (subject.targetPath !== undefined && subject.targetPath !== null) {
        throw new TransactionEnvelopeError(`subjects[${index}]: targetPath is reserved for RENAME`);
    }
}

function leaseClaimErrors(claims, label) {
    const errors = [];
    const byPath = new Map();
    for (const claim of claims) {
        const rows = byPath.get(claim.path) ?? [];
        rows.push(claim);
        byPath.set(claim.path, rows);
    }
    for (const [path, rows] of byPath) {
        if (rows.length === 1) continue;
        const composite = rows.length === 2
            && rows.some((row) => row.role === "primary" && row.action === "create")
            && rows.some((row) => row.role === "target" && row.action === "rename");
        if (!composite) {
            errors.push(`${label}: conflicting path lease ${path}`);
            continue;
        }
        const [createClaim, renameClaim] = [
            rows.find((row) => row.role === "primary" && row.action === "create"),
            rows.find((row) => row.role === "target" && row.action === "rename"),
        ];
        if (createClaim?.outcome && renameClaim?.outcome
            && canonicalJson(createClaim.outcome.postimage) !== canonicalJson(renameClaim.outcome.postimage)) {
            errors.push(`${label}: composite CREATE/RENAME target ${path} has divergent postimages`);
        }
    }
    return errors;
}

/**
 * Derive terminal subject outcomes from the actual integration-parent tree and
 * current index/commit tree. Frozen formation `before` values are deliberately
 * ignored: after P000, every lease is renewed against its live parent.
 */
export function deriveWaveSubjectOutcomes(subjects, parentEntries, currentEntries, { status = "DONE" } = {}) {
    if (!Array.isArray(subjects) || subjects.length === 0) {
        throw new TransactionEnvelopeError("wave subjects must be a non-empty array");
    }
    if (!new Set(["DONE", "DEAD"]).has(status)) {
        throw new TransactionEnvelopeError(`terminal status must be DONE or DEAD, received ${String(status)}`);
    }
    const parent = entryMap(parentEntries, "integration-parent tree");
    const current = entryMap(currentEntries, "terminal tree");
    const claims = [];
    subjects.forEach((subject, index) => {
        validateSubjectShape(subject, index);
        claims.push({ path: subject.path, index, action: subject.action, role: "primary" });
        if (subject.action === "rename") claims.push({ path: subject.targetPath, index, action: subject.action, role: "target" });
    });
    const claimErrors = leaseClaimErrors(claims, "wave subjects");
    if (claimErrors.length > 0) throw new TransactionEnvelopeError(claimErrors.join("\n"));

    return subjects.map((subject, index) => {
        const parentSource = parent.get(subject.path) ?? null;
        const currentSource = current.get(subject.path) ?? null;
        if (status === "DEAD") {
            if (!sameGitObject(parentSource, currentSource) && !(parentSource === null && currentSource === null)) {
                throw new TransactionEnvelopeError(`${subject.path}: DEAD withdrawal must preserve the integration-parent product object`);
            }
            const targetPath = subject.action === "rename" ? subject.targetPath : null;
            if (targetPath !== null) {
                const parentTarget = parent.get(targetPath) ?? null;
                const currentTarget = current.get(targetPath) ?? null;
                if (!sameGitObject(parentTarget, currentTarget) && !(parentTarget === null && currentTarget === null)) {
                    throw new TransactionEnvelopeError(`${targetPath}: DEAD withdrawal must preserve the integration-parent rename target object`);
                }
            }
            return {
                path: subject.path,
                targetPath,
                plannedAction: subject.action,
                disposition: "WITHDRAWN",
                preimage: gitObject(parentSource),
                postimage: gitObject(currentSource),
            };
        }
        let targetPath = null;
        let preimage = gitObject(parentSource);
        let postimage = gitObject(currentSource);
        let disposition;

        switch (subject.action) {
            case "create":
                if (parentSource || !currentSource) throw new TransactionEnvelopeError(`${subject.path}: CREATE requires absent parent and present terminal objects`);
                disposition = "CREATED";
                break;
            case "delete":
                if (!parentSource || currentSource) throw new TransactionEnvelopeError(`${subject.path}: DELETE requires present parent and absent terminal objects`);
                disposition = "DELETED";
                break;
            case "modify":
                if (!parentSource || !currentSource || sameGitObject(parentSource, currentSource)) {
                    throw new TransactionEnvelopeError(`${subject.path}: MODIFY requires a changed parent-relative oid or mode`);
                }
                disposition = "MODIFIED";
                break;
            case "repair":
                if (!parentSource || !currentSource) throw new TransactionEnvelopeError(`${subject.path}: REPAIR requires present parent and terminal objects`);
                disposition = sameGitObject(parentSource, currentSource) ? "VERIFIED_UNCHANGED" : "MODIFIED";
                break;
            case "verify":
                if (!parentSource || !currentSource || !sameGitObject(parentSource, currentSource)) {
                    throw new TransactionEnvelopeError(`${subject.path}: VERIFY must be byte- and mode-identical to the integration parent`);
                }
                disposition = "VERIFIED_UNCHANGED";
                break;
            case "rename": { // validated above
                targetPath = subject.targetPath;
                const parentTarget = parent.get(targetPath) ?? null;
                const currentTarget = current.get(targetPath) ?? null;
                if (!parentSource || currentSource || parentTarget || !currentTarget) {
                    throw new TransactionEnvelopeError(`${subject.path}: RENAME requires an unshadowed parent source and one terminal target`);
                }
                postimage = gitObject(currentTarget);
                disposition = "RENAMED";
                break;
            }
            default:
                throw new TransactionEnvelopeError(`${subject.path}: unsupported action ${subject.action}`);
        }

        return {
            path: subject.path,
            targetPath,
            plannedAction: subject.action,
            disposition,
            preimage,
            postimage,
        };
    });
}

export function integrationAdjunctPaths(receiptPath) {
    if (!validPath(receiptPath)) throw new TransactionEnvelopeError(`invalid receipt path: ${String(receiptPath)}`);
    if (CONTINUOUS_PROJECTION_PATHS.includes(receiptPath)) throw new TransactionEnvelopeError("receipt path collides with a continuous projection");
    return [receiptPath, ...CONTINUOUS_PROJECTION_PATHS];
}

/** BOOTSTRAP.json is intentionally not an adjunct after P000 and remains hashed. */
export function canonicalWavePayload(entries, receiptPath) {
    const excludes = integrationAdjunctPaths(receiptPath);
    const excluded = new Set(excludes);
    const included = [...entries]
        .filter((entry) => !excluded.has(entry.path))
        .sort((left, right) => compareGitPaths(left.path, right.path));
    const byPath = entryMap(included, "canonical terminal payload");
    const chunks = [];
    for (const [path, entry] of [...byPath].sort(([left], [right]) => compareGitPaths(left, right))) {
        chunks.push(`${path}\0${entry.mode}\0${entry.oid}\n`);
    }
    return {
        algorithm: "sha256(canonical-git-stage0-index-v1)",
        sha256: sha256(chunks.join("")),
        entryCount: included.length,
        excludes,
    };
}

export function canonicalWaveEvidence(entries) {
    if (!Array.isArray(entries) || entries.length === 0) {
        throw new TransactionEnvelopeError("terminal evidence index must contain at least one entry");
    }
    const allowed = new Set(["path", "kind", "status", "sha256", "bytes"]);
    const seen = new Set();
    const canonicalEntries = entries.map((entry, index) => {
        if (!isObject(entry) || Object.keys(entry).some((key) => !allowed.has(key))) {
            throw new TransactionEnvelopeError(`evidence.entries[${index}]: invalid or unexpected property`);
        }
        if (!validPath(entry.path) || seen.has(entry.path)) {
            throw new TransactionEnvelopeError(`evidence.entries[${index}].path: required, safe, and unique`);
        }
        seen.add(entry.path);
        if (typeof entry.kind !== "string" || entry.kind.length === 0) throw new TransactionEnvelopeError(`evidence.entries[${index}].kind: required`);
        if (!new Set(["PASS", "RED"]).has(entry.status)) throw new TransactionEnvelopeError(`evidence.entries[${index}].status: expected PASS or RED`);
        if (!SHA256.test(entry.sha256 ?? "")) throw new TransactionEnvelopeError(`evidence.entries[${index}].sha256: invalid`);
        if (!Number.isInteger(entry.bytes) || entry.bytes < 0) throw new TransactionEnvelopeError(`evidence.entries[${index}].bytes: invalid`);
        return { path: entry.path, kind: entry.kind, status: entry.status, sha256: entry.sha256, bytes: entry.bytes };
    }).sort((left, right) => compareGitPaths(left.path, right.path));
    const chunks = canonicalEntries.map((entry) => `${entry.path}\0${entry.kind}\0${entry.status}\0${entry.sha256}\0${entry.bytes}\n`);
    return {
        algorithm: "sha256(canonical-wave-evidence-index-v1)",
        sha256: sha256(chunks.join("")),
        entryCount: canonicalEntries.length,
        entries: canonicalEntries,
    };
}

function selectedEvidenceBytes(root, path, view, ref) {
    const specifier = view === "index" ? `:${path}` : `${ref}:${path}`;
    const result = git(root, ["show", specifier], { allowFailure: true, encoding: null });
    return result.status === 0 ? result.stdout : null;
}

export function validateWaveEvidenceBindings({ root, wave, evidenceEntries, view = "index", ref = "HEAD" } = {}) {
    const errors = [];
    let entries;
    try {
        entries = canonicalWaveEvidence(evidenceEntries).entries;
    } catch (error) {
        return { ok: false, errors: [error.message] };
    }
    const forbidden = new Set(integrationAdjunctPaths(wave?.receiptPath));
    for (const entry of entries) {
        if (forbidden.has(entry.path)) {
            errors.push(`${entry.path}: receipt/attestation/FINAL integration adjunct cannot evidence itself`);
            continue;
        }
        const bytes = selectedEvidenceBytes(resolve(root ?? process.cwd()), entry.path, view, ref);
        if (!bytes) {
            errors.push(`${entry.path}: evidence path is absent from the selected ${view} view`);
            continue;
        }
        if (entry.bytes !== bytes.length) errors.push(`${entry.path}: evidence byte count does not bind the selected ${view} view`);
        if (entry.sha256 !== sha256(bytes)) errors.push(`${entry.path}: evidence SHA-256 does not bind the selected ${view} view`);
    }
    return { ok: errors.length === 0, errors };
}

function waveOrdinal(waveId) {
    if (!WAVE_ID.test(waveId ?? "")) throw new TransactionEnvelopeError(`invalid post-bootstrap wave id: ${String(waveId)}`);
    return Number(waveId.slice("BI.W-P".length));
}

export function intendedTrailersForWave({ waveId, status, formationDigest }) {
    const projected = waveOrdinal(waveId) >= 2;
    if (!new Set(["DONE", "DEAD"]).has(status)) throw new TransactionEnvelopeError(`invalid terminal status: ${String(status)}`);
    if (!SHA256.test(formationDigest ?? "")) throw new TransactionEnvelopeError("formation digest must be SHA-256");
    return {
        names: projected ? [...CORE_TRAILER_NAMES, ...PROJECTION_TRAILER_NAMES] : [...CORE_TRAILER_NAMES],
        values: {
            "BI-Wave": waveId,
            "BI-Status": status,
            "BI-Formation-SHA256": formationDigest,
        },
        externallyDerived: projected
            ? ["BI-Receipt-SHA256", ...PROJECTION_TRAILER_NAMES]
            : ["BI-Receipt-SHA256"],
    };
}

export function validateWaveSubjectDelta({ wave, deltaPaths, receiptPath = wave?.receiptPath, requireReceipt = false, status = "DONE" }) {
    const errors = [];
    if (!wave || !Array.isArray(wave.subjects)) return { ok: false, errors: ["wave subjects are unavailable"] };
    let adjuncts;
    try {
        adjuncts = integrationAdjunctPaths(receiptPath);
    } catch (error) {
        return { ok: false, errors: [error.message] };
    }
    const allowed = new Set([receiptPath]);
    const productPaths = new Set();
    const verifyPaths = new Set();
    for (const [index, subject] of wave.subjects.entries()) {
        try {
            validateSubjectShape(subject, index);
        } catch (error) {
            errors.push(error.message);
            continue;
        }
        productPaths.add(subject.path);
        if (subject.action === "verify") verifyPaths.add(subject.path);
        else if (subject.action === "rename") {
            productPaths.add(subject.targetPath);
            allowed.add(subject.path);
            allowed.add(subject.targetPath);
        } else allowed.add(subject.path);
    }
    const projectionsActive = waveOrdinal(wave.id) >= 2;
    if (projectionsActive) CONTINUOUS_PROJECTION_PATHS.forEach((path) => allowed.add(path));
    const seen = new Set();
    for (const path of deltaPaths ?? []) {
        if (!validPath(path)) errors.push(`invalid terminal delta path: ${String(path)}`);
        if (seen.has(path)) errors.push(`duplicate terminal delta path: ${path}`);
        seen.add(path);
        if (verifyPaths.has(path)) errors.push(`${path}: VERIFY authority changed in the terminal transaction`);
        if (status === "DEAD" && productPaths.has(path)) errors.push(`${path}: DEAD withdrawal cannot change a planned product path`);
        if (!allowed.has(path)) errors.push(`${path}: foreign path escapes ${wave.id}'s subject/envelope closure`);
        if (!projectionsActive && CONTINUOUS_PROJECTION_PATHS.includes(path)) errors.push(`${path}: projection is inactive before P002`);
    }
    if (requireReceipt && !seen.has(receiptPath)) errors.push(`${receiptPath}: terminal transaction omits its unique receipt`);
    if (seen.has(receiptPath) && deltaPaths.filter((path) => path === receiptPath).length !== 1) errors.push(`${receiptPath}: receipt must occur exactly once`);
    if (adjuncts.length !== 3) errors.push("integration adjunct closure is malformed");
    return { ok: errors.length === 0, errors };
}

function readDeltaPaths(root, integrationParent, view, ref) {
    const raw = view === "index"
        ? git(root, ["diff", "--cached", "--name-only", "-z", integrationParent], { encoding: null }).stdout
        : git(root, ["diff-tree", "--no-commit-id", "--name-only", "-r", "-z", integrationParent, ref], { encoding: null }).stdout;
    return raw.toString("utf8").split("\0").filter(Boolean).sort(compareGitPaths);
}

function exactIntegrationParent(root, requestedParent, view, ref) {
    const integrationParent = git(root, ["rev-parse", requestedParent]).stdout.trim();
    if (!GIT_SHA.test(integrationParent)) throw new TransactionEnvelopeError("integration parent did not resolve to a full Git SHA");
    if (view === "index") {
        const head = git(root, ["rev-parse", "HEAD"]).stdout.trim();
        if (head !== integrationParent) throw new TransactionEnvelopeError("staged transaction is leased to a stale integration parent");
        return integrationParent;
    }
    if (view === "commit") {
        const row = git(root, ["rev-list", "--parents", "-n", "1", ref]).stdout.trim().split(/\s+/);
        if (row.length !== 2 || row[1] !== integrationParent) {
            throw new TransactionEnvelopeError("committed transaction must have exactly the declared integration parent");
        }
        return integrationParent;
    }
    throw new TransactionEnvelopeError(`unsupported repository view: ${String(view)}`);
}

export function inspectTransactionEnvelope({
    root,
    wave,
    integrationParent = "HEAD",
    view = "index",
    ref = "HEAD",
    requireReceipt = false,
    status = "DONE",
} = {}) {
    const repositoryRoot = resolve(root ?? process.cwd());
    if (!wave || !WAVE_ID.test(wave.id ?? "") || !validPath(wave.receiptPath)) {
        throw new TransactionEnvelopeError("wave id and receipt path are required");
    }
    const parent = exactIntegrationParent(repositoryRoot, integrationParent, view, ref);
    const parentEntries = readExactRepositoryEntries(repositoryRoot, "commit", parent);
    const currentEntries = readExactRepositoryEntries(repositoryRoot, view, ref);
    const deltaPaths = readDeltaPaths(repositoryRoot, parent, view, ref);
    const closure = validateWaveSubjectDelta({ wave, deltaPaths, receiptPath: wave.receiptPath, requireReceipt, status });
    if (!closure.ok) throw new TransactionEnvelopeError(closure.errors.join("\n"));
    const subjectOutcomes = deriveWaveSubjectOutcomes(wave.subjects, parentEntries, currentEntries, { status });
    const payloadDigest = canonicalWavePayload(currentEntries, wave.receiptPath);
    return {
        integrationParent: parent,
        deltaPaths,
        subjectOutcomes,
        payloadDigest,
    };
}

function findForbiddenSelfReferences(value, path, errors) {
    if (Array.isArray(value)) {
        value.forEach((item, index) => findForbiddenSelfReferences(item, `${path}[${index}]`, errors));
        return;
    }
    if (!isObject(value)) return;
    for (const [key, nested] of Object.entries(value)) {
        if (FORBIDDEN_SELF_REFERENCE_KEYS.has(key)) errors.push(`${path}.${key}: forbidden receipt/commit/projection self-reference`);
        findForbiddenSelfReferences(nested, `${path}.${key}`, errors);
    }
}

function validateGitObject(value, path, errors) {
    if (value === null) return;
    if (!isObject(value) || Object.keys(value).some((key) => !new Set(["mode", "oid"]).has(key))) {
        errors.push(`${path}: expected an exact Git object or null`);
        return;
    }
    if (!/^\d{6}$/.test(value.mode ?? "") || !GIT_SHA.test(value.oid ?? "")) errors.push(`${path}: invalid mode or oid`);
}

function validateOutcome(outcome, index, errors, terminalStatus) {
    const path = `receipt.subjectOutcomes[${index}]`;
    if (!isObject(outcome) || Object.keys(outcome).some((key) => !new Set(["path", "targetPath", "plannedAction", "disposition", "preimage", "postimage"]).has(key))) {
        errors.push(`${path}: invalid or unexpected property`);
        return;
    }
    if (!validPath(outcome.path)) errors.push(`${path}.path: required and safe`);
    if (!ACTIONS.has(outcome.plannedAction)) errors.push(`${path}.plannedAction: invalid`);
    if (!DISPOSITIONS.has(outcome.disposition)) errors.push(`${path}.disposition: invalid`);
    validateGitObject(outcome.preimage, `${path}.preimage`, errors);
    validateGitObject(outcome.postimage, `${path}.postimage`, errors);
    if (terminalStatus === "DEAD") {
        if (outcome.disposition !== "WITHDRAWN") errors.push(`${path}: DEAD requires a WITHDRAWN disposition for every planned subject`);
        if (canonicalJson(outcome.preimage) !== canonicalJson(outcome.postimage)) errors.push(`${path}: WITHDRAWN images must preserve the integration parent exactly`);
    } else if (outcome.disposition === "WITHDRAWN") {
        errors.push(`${path}: WITHDRAWN is reserved for evidence-backed DEAD terminal status`);
    }
    const expectedDispositions = {
        create: ["CREATED"],
        delete: ["DELETED"],
        modify: ["MODIFIED"],
        rename: ["RENAMED"],
        repair: ["MODIFIED", "VERIFIED_UNCHANGED"],
        verify: ["VERIFIED_UNCHANGED"],
    };
    if (terminalStatus !== "DEAD" && !(expectedDispositions[outcome.plannedAction] ?? []).includes(outcome.disposition)) errors.push(`${path}: action/disposition mismatch`);
    if (outcome.plannedAction === "rename") {
        if (!validPath(outcome.targetPath)) errors.push(`${path}.targetPath: required and safe`);
    } else if (outcome.targetPath !== null) errors.push(`${path}.targetPath: must be null outside RENAME`);
    if (terminalStatus !== "DEAD") {
        if (outcome.plannedAction === "create" && (outcome.preimage !== null || outcome.postimage === null)) errors.push(`${path}: CREATE image contract mismatch`);
        if (outcome.plannedAction === "delete" && (outcome.preimage === null || outcome.postimage !== null)) errors.push(`${path}: DELETE image contract mismatch`);
        if (["modify", "repair", "verify", "rename"].includes(outcome.plannedAction) && (outcome.preimage === null || outcome.postimage === null)) errors.push(`${path}: terminal image contract mismatch`);
    }
    if (outcome.preimage !== null && outcome.postimage !== null) {
        const imagesEqual = canonicalJson(outcome.preimage) === canonicalJson(outcome.postimage);
        if (terminalStatus !== "DEAD") {
            if (outcome.plannedAction === "modify" && imagesEqual) errors.push(`${path}: MODIFY images are identical`);
            if (outcome.plannedAction === "repair" && outcome.disposition === "MODIFIED" && imagesEqual) errors.push(`${path}: MODIFIED repair images are identical`);
            if (outcome.plannedAction === "repair" && outcome.disposition === "VERIFIED_UNCHANGED" && !imagesEqual) errors.push(`${path}: VERIFIED_UNCHANGED repair images differ`);
            if (outcome.plannedAction === "verify" && !imagesEqual) errors.push(`${path}: VERIFY images or modes differ`);
        }
    }
}

export function validateWaveReceipt(value, expected = {}) {
    const errors = [];
    if (!isObject(value)) return { ok: false, errors: ["receipt: expected an object"] };
    for (const key of Object.keys(value)) if (!RECEIPT_KEYS.has(key)) errors.push(`receipt.${key}: unexpected property`);
    findForbiddenSelfReferences(value, "receipt", errors);
    if (value.schemaVersion !== "1.0.0") errors.push("receipt.schemaVersion: expected 1.0.0");
    if (value.authority !== WAVE_RECEIPT_AUTHORITY) errors.push("receipt.authority: invalid");
    if (!SHA256.test(value.formationDigest ?? "")) errors.push("receipt.formationDigest: invalid SHA-256");
    if (!GIT_SHA.test(value.sourceBase ?? "")) errors.push("receipt.sourceBase: invalid Git SHA");
    if (!WAVE_ID.test(value.waveId ?? "")) errors.push("receipt.waveId: invalid post-bootstrap wave");
    if (!new Set(["DONE", "DEAD"]).has(value.status)) errors.push("receipt.status: expected DONE or evidence-backed DEAD");
    if (!GIT_SHA.test(value.integrationParent ?? "")) errors.push("receipt.integrationParent: invalid Git SHA");
    if (!validPath(value.receiptPath)) errors.push("receipt.receiptPath: invalid");
    validateUniqueWaveIds(value.dependsOn, "receipt.dependsOn", errors);
    validateUniqueWaveIds(value.integrationRequires, "receipt.integrationRequires", errors);
    if (!new Set(["NONE", "ACTIVATE", "REFRESH"]).has(value.projectionMode)) errors.push("receipt.projectionMode: invalid");
    if (WAVE_ID.test(value.waveId ?? "")) {
        const projected = waveOrdinal(value.waveId) >= 2;
        if (!projected && value.projectionMode !== "NONE") errors.push("receipt.projectionMode: P001 cannot activate projections");
        if (projected && value.projectionMode === "NONE") errors.push("receipt.projectionMode: P002+ must activate or refresh projections");
    }
    if (!Array.isArray(value.subjectOutcomes) || value.subjectOutcomes.length === 0) {
        errors.push("receipt.subjectOutcomes: expected exhaustive outcomes");
    } else {
        const claims = [];
        value.subjectOutcomes.forEach((outcome, index) => {
            validateOutcome(outcome, index, errors, value.status);
            if (isObject(outcome) && validPath(outcome.path) && ACTIONS.has(outcome.plannedAction)) {
                claims.push({ path: outcome.path, index, action: outcome.plannedAction, role: "primary", outcome });
                if (outcome.plannedAction === "rename" && validPath(outcome.targetPath)) {
                    claims.push({ path: outcome.targetPath, index, action: outcome.plannedAction, role: "target", outcome });
                }
            }
        });
        errors.push(...leaseClaimErrors(claims, "receipt.subjectOutcomes"));
    }
    let canonicalEvidence;
    try {
        canonicalEvidence = canonicalWaveEvidence(value.evidence?.entries);
        if (canonicalJson(canonicalEvidence) !== canonicalJson(value.evidence)) errors.push("receipt.evidence: canonical digest/index does not reproduce");
    } catch (error) {
        errors.push(`receipt.evidence: ${error.message}`);
    }
    if (typeof value.terminalRationale !== "string" || value.terminalRationale.trim().length === 0) errors.push("receipt.terminalRationale: required");
    if (canonicalEvidence) {
        const redCount = canonicalEvidence.entries.filter((entry) => entry.status === "RED").length;
        if (value.status === "DONE" && redCount > 0) errors.push("receipt.evidence: DONE cannot contain RED terminal evidence");
        if (value.status === "DEAD" && redCount === 0) errors.push("receipt.evidence: DEAD requires at least one explicit RED evidence row");
        if (value.status === "DEAD" && !canonicalEvidence.entries.some((entry) => entry.status === "RED" && entry.kind === "owner-withdrawal-authority")) {
            errors.push("receipt.evidence: DEAD requires selected-view RED owner-withdrawal-authority evidence");
        }
    }
    try {
        const intended = intendedTrailersForWave(value);
        if (canonicalJson(intended) !== canonicalJson(value.intendedTrailers)) errors.push("receipt.intendedTrailers: acyclic 4/6-name contract does not reproduce");
    } catch (error) {
        errors.push(`receipt.intendedTrailers: ${error.message}`);
    }
    try {
        const expectedExcludes = integrationAdjunctPaths(value.receiptPath);
        const payload = value.payloadDigestExcludingCurrentIntegrationAdjuncts;
        if (!isObject(payload) || Object.keys(payload).some((key) => !new Set(["algorithm", "sha256", "entryCount", "excludes"]).has(key))) {
            errors.push("receipt.payloadDigestExcludingCurrentIntegrationAdjuncts: invalid or unexpected property");
        } else {
            if (payload.algorithm !== "sha256(canonical-git-stage0-index-v1)" || !SHA256.test(payload.sha256 ?? "")) errors.push("receipt payload digest: invalid algorithm or SHA-256");
            if (!Number.isInteger(payload.entryCount) || payload.entryCount < 1) errors.push("receipt payload digest: invalid entry count");
            if (!sameArray(payload.excludes, expectedExcludes)) errors.push("receipt payload digest: must exclude exactly the current receipt, attestation, and FINAL");
            if (payload.excludes.includes("docs/tranches/BI/BOOTSTRAP.json")) errors.push("receipt payload digest: BOOTSTRAP must remain in every P001+ payload");
        }
    } catch (error) {
        errors.push(`receipt payload digest: ${error.message}`);
    }

    for (const [key, expectedValue] of Object.entries(expected)) {
        if (expectedValue === undefined) continue;
        if (canonicalJson(value[key]) !== canonicalJson(expectedValue)) errors.push(`receipt.${key}: does not match the authoritative transaction`);
    }
    return { ok: errors.length === 0, errors };
}

export function buildWaveReceipt({
    wave,
    formationDigest,
    sourceBase,
    status,
    integrationParent,
    subjectOutcomes,
    evidenceEntries,
    terminalRationale,
    payloadDigest,
} = {}) {
    if (!wave || !WAVE_ID.test(wave.id ?? "") || !validPath(wave.receiptPath)) throw new TransactionEnvelopeError("wave authority is incomplete");
    const receipt = {
        schemaVersion: "1.0.0",
        authority: WAVE_RECEIPT_AUTHORITY,
        formationDigest,
        sourceBase,
        waveId: wave.id,
        status,
        integrationParent,
        receiptPath: wave.receiptPath,
        dependsOn: [...(wave.dependsOn ?? [])],
        integrationRequires: [...(wave.integrationRequires ?? [])],
        projectionMode: wave.projectionMode,
        subjectOutcomes,
        evidence: canonicalWaveEvidence(evidenceEntries),
        terminalRationale,
        intendedTrailers: intendedTrailersForWave({ waveId: wave.id, status, formationDigest }),
        payloadDigestExcludingCurrentIntegrationAdjuncts: payloadDigest,
    };
    const validation = validateWaveReceipt(receipt);
    if (!validation.ok) throw new TransactionEnvelopeError(validation.errors.join("\n"));
    return receipt;
}

export function serializeWaveReceipt(receipt) {
    return `${JSON.stringify(sortJson(receipt), null, 2)}\n`;
}

export function waveReceiptDigest(receiptOrBytes) {
    const bytes = Buffer.isBuffer(receiptOrBytes) || typeof receiptOrBytes === "string"
        ? receiptOrBytes
        : serializeWaveReceipt(receiptOrBytes);
    return sha256(bytes);
}

/** Render receipt bytes without writing, staging, committing, or mutating cursor state. */
export function renderWaveReceipt({
    root,
    wave,
    formationDigest,
    sourceBase,
    status = "DONE",
    integrationParent = "HEAD",
    evidenceEntries,
    terminalRationale,
    view = "index",
    ref = "HEAD",
} = {}) {
    const envelope = inspectTransactionEnvelope({ root, wave, integrationParent, view, ref, requireReceipt: false, status });
    const evidenceBinding = validateWaveEvidenceBindings({ root, wave, evidenceEntries, view, ref });
    if (!evidenceBinding.ok) throw new TransactionEnvelopeError(evidenceBinding.errors.join("\n"));
    const receipt = buildWaveReceipt({
        wave,
        formationDigest,
        sourceBase,
        status,
        integrationParent: envelope.integrationParent,
        subjectOutcomes: envelope.subjectOutcomes,
        evidenceEntries,
        terminalRationale,
        payloadDigest: envelope.payloadDigest,
    });
    const bytes = serializeWaveReceipt(receipt);
    return { receipt, bytes, receiptSha256: waveReceiptDigest(bytes), ...envelope };
}

function readReceiptBytes(root, receiptPath, view, ref) {
    const specifier = view === "index" ? `:${receiptPath}` : `${ref}:${receiptPath}`;
    return git(root, ["show", specifier], { encoding: null }).stdout;
}

/** Validate final staged or committed bytes against a freshly derived envelope. */
export function verifyWaveReceipt({
    root,
    wave,
    formationDigest,
    sourceBase,
    integrationParent,
    view = "commit",
    ref = "HEAD",
    receiptBytes,
} = {}) {
    const errors = [];
    try {
        const repositoryRoot = resolve(root ?? process.cwd());
        const bytes = receiptBytes ?? readReceiptBytes(repositoryRoot, wave.receiptPath, view, ref);
        let receipt;
        try {
            receipt = JSON.parse(bytes.toString("utf8"));
        } catch (error) {
            throw new TransactionEnvelopeError(`receipt is not JSON: ${error.message}`);
        }
        const envelope = inspectTransactionEnvelope({
            root: repositoryRoot,
            wave,
            integrationParent: integrationParent ?? receipt.integrationParent,
            view,
            ref,
            requireReceipt: true,
            status: receipt.status,
        });
        const expected = buildWaveReceipt({
            wave,
            formationDigest,
            sourceBase,
            status: receipt.status,
            integrationParent: envelope.integrationParent,
            subjectOutcomes: envelope.subjectOutcomes,
            evidenceEntries: receipt.evidence?.entries,
            terminalRationale: receipt.terminalRationale,
            payloadDigest: envelope.payloadDigest,
        });
        const validation = validateWaveReceipt(receipt, expected);
        errors.push(...validation.errors);
        const evidenceBinding = validateWaveEvidenceBindings({
            root: repositoryRoot,
            wave,
            evidenceEntries: receipt.evidence?.entries,
            view,
            ref,
        });
        errors.push(...evidenceBinding.errors);
        const expectedBytes = serializeWaveReceipt(expected);
        if (!Buffer.from(bytes).equals(Buffer.from(expectedBytes))) errors.push("receipt raw bytes are not the deterministic canonical newline serialization");
        return {
            ok: errors.length === 0,
            errors,
            receipt,
            receiptSha256: waveReceiptDigest(bytes),
            envelope,
        };
    } catch (error) {
        return { ok: false, errors: [error.message] };
    }
}

export { canonicalJson };
