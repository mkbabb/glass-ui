import { createHash, randomUUID } from "node:crypto";
import { spawn, spawnSync } from "node:child_process";
import { constants as FS_CONSTANTS, rmSync } from "node:fs";
import {
    access,
    chmod,
    copyFile,
    lstat,
    mkdtemp,
    mkdir,
    open,
    link,
    readFile,
    readdir,
    realpath,
    readlink,
    rename,
    rm,
    symlink,
    unlink,
    writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import {
    canonicalJson,
    canonicalStage0Payload,
    deriveSubjectOutcomes,
    parseStageEntries,
    parseTreeEntries,
    receiptDigest,
    validateBootstrapReceipt,
} from "./bootstrap-receipt.mjs";
import {
    verifyWaveReceipt,
} from "./transaction-envelope.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = resolve(HERE, "../..");
const SOURCE_BASE = "26c5ae686fd0f1181083aebda1215b00524555f1";
const FORMATION_ANCHOR = "f20a2aa96a6e165c331411ca771562f03807de27";
const FORMATION_DIGEST = "df19ceeba6bb52454eccdc2a7045749f0fa9070aa8348383f0312fb6ff452277";
const AUTHORITY = "GIT_FIRST_PARENT_PLUS_COMMITTED_RECEIPTS";
const BOOTSTRAP_RECEIPT = "docs/tranches/BI/BOOTSTRAP.json";
const FORMATION_ROOT = "docs/tranches/BI/FORMATION";
const SHA1 = /^[0-9a-f]{40}$/;
const SHA256 = /^[0-9a-f]{64}$/;
const WAVE_ID = /^BI\.W-P(?:[0-9]{3}|[1-9][0-9]{3,})$/;
const TERMINAL = new Set(["DONE", "DEAD"]);
const CORE_TRAILERS = ["BI-Wave", "BI-Status", "BI-Receipt-SHA256", "BI-Formation-SHA256"];
const PROJECTION_TRAILERS = ["BI-Attestation-SHA256", "BI-FINAL-SHA256"];
const ALL_TRAILERS = [...CORE_TRAILERS, ...PROJECTION_TRAILERS];
const ADJUNCT_PROJECTIONS = [
    "docs/tranches/BI/RELEASE-ATTESTATION.json",
    "docs/tranches/BI/FINAL.md",
];
const RELEASE_PROJECTION_MODULE = "scripts/tranche/release-projection.mjs";
const MATERIALIZED_RUNTIME_ROOTS = new Set([".bi-release-projection-runtime", ".bi-wave-test-runtime"]);
const DISPATCH_RECEIPT_AUTHORITY = "GIT_PRIVATE_PRE_DISPATCH_RECEIPT_V1";
const DISPATCH_LABELS = new Set(["Luna", "Terra"]);
const DISPATCH_ROLES = new Set(["challenge", "implementation", "mechanical-audit", "research"]);
const DISPATCH_LANE_ID = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/;
const DISPATCH_ROUTING_POLICY = {
    currentOrder: { id: "CURRENT-012", sha256: "fd22635a249d27fe85791f331e6ee3c8d7e352b45cc86b3f19996b1894251a74" },
    routing: {
        core: {
            owner: "current-core-session",
            roles: ["orchestration", "design", "synthesis", "adjudication", "integration", "cursor-mutation", "commit"],
        },
        fanout: {
            labels: ["Luna", "Terra"],
            roles: ["research", "mechanical-audit", "implementation", "challenge"],
        },
    },
    maxConcurrent: 3,
    inheritModel: false,
};
export const DISPATCH_ROUTING_POLICY_SHA256 = createHash("sha256").update(canonicalJson(DISPATCH_ROUTING_POLICY)).digest("hex");

export function dispatchRoutingPolicy() {
    return structuredClone(DISPATCH_ROUTING_POLICY);
}
const RELEASE_PROJECTION_AUTHORITY = "BI_RELEASE_PROJECTION_V1";
const RELEASE_PROFILES = new Set(["bootstrap", "commit", "ci", "local", "native", "release"]);
const RELEASE_PROJECTION_EVIDENCE_KEYS = [
    "schemaVersion",
    "authority",
    "waveId",
    "selectedView",
    "selectedRef",
    "profile",
    "requireTerminal",
    "checkMode",
    "projectionStatus",
    "releaseEligible",
    "receipt",
    "stage0Index",
    "attestationSha256",
    "finalSha256",
    "blockerDigest",
    "blockerCount",
    "blockers",
    "ownerArgv",
];
const RELEASE_PROJECTION_RUNNER = [
    "const [moduleUrl, requestJson] = process.argv.slice(1);",
    "const selected = await import(moduleUrl);",
    "if (typeof selected.verifyReleaseProjection !== 'function') throw new Error('MISSING_VERIFY_RELEASE_PROJECTION_EXPORT');",
    "const result = await selected.verifyReleaseProjection(JSON.parse(requestJson));",
    "process.stdout.write(JSON.stringify(result));",
].join("\n");
let RAW_BLOB_CACHE_ROOT = null;
const RAW_BLOB_CACHE_FINGERPRINTS = new Map();
const ACTIVE_MATERIALIZED_ROOTS = new Set();
let STALE_TEMP_SCAVENGE = null;

function cleanupRawBlobCacheSync() {
    if (!RAW_BLOB_CACHE_ROOT) return;
    const target = RAW_BLOB_CACHE_ROOT;
    RAW_BLOB_CACHE_ROOT = null;
    RAW_BLOB_CACHE_FINGERPRINTS.clear();
    rmSync(target, { recursive: true, force: true });
}

function cleanupMaterializedRootsSync() {
    for (const target of ACTIVE_MATERIALIZED_ROOTS) rmSync(target, { recursive: true, force: true });
    ACTIVE_MATERIALIZED_ROOTS.clear();
}

export function cleanupSelectedViewRuntime() {
    cleanupMaterializedRootsSync();
    cleanupRawBlobCacheSync();
}

async function scavengeDeadProcessTempRoots() {
    if (!STALE_TEMP_SCAVENGE) STALE_TEMP_SCAVENGE = (async () => {
        for (const name of await readdir(tmpdir())) {
            const match = /^(?:glass-bi-raw-blob-cache|glass-bi-wave-test)-([0-9]+)-/.exec(name);
            if (!match || Number(match[1]) === process.pid) continue;
            let live = true;
            try {
                process.kill(Number(match[1]), 0);
            } catch (error) {
                if (error.code === "ESRCH") live = false;
            }
            if (!live) await rm(resolve(tmpdir(), name), { recursive: true, force: true });
        }
    })();
    return STALE_TEMP_SCAVENGE;
}

process.once("exit", () => {
    cleanupSelectedViewRuntime();
});
process.once("beforeExit", () => {
    cleanupSelectedViewRuntime();
});
for (const [signal, exitCode] of [["SIGINT", 130], ["SIGTERM", 143]]) {
    process.once(signal, () => {
        cleanupSelectedViewRuntime();
        process.exit(exitCode);
    });
}

export class CursorError extends Error {
    constructor(message, code = "BI_CURSOR_RED", cause = undefined) {
        super(message, cause === undefined ? undefined : { cause });
        this.name = "CursorError";
        this.code = code;
    }
}

export const CAUGHT_ERROR_DIAGNOSTIC_LIMITS = Object.freeze({
    name: 128,
    code: 128,
    message: 2048,
    summary: 2304,
    // JSON's worst-case UTF-16 scalar escape is six characters, plus bounded object syntax.
    serialized: 27904,
});

function boundedDiagnosticScalar(value, fallback, maximum, replacements) {
    let scalar = typeof value === "string" ? value : fallback;
    for (const [raw, stable] of replacements) scalar = scalar.replaceAll(raw, stable);
    scalar = scalar
        .replace(/[\p{Cc}\p{Cf}]+/gu, " ")
        .replace(/\s+/gu, " ")
        .trim();
    if (scalar.length === 0) scalar = fallback;
    return scalar.length <= maximum ? scalar : `${scalar.slice(0, maximum - 1)}…`;
}

export function caughtErrorDiagnostic(error, replacements = []) {
    const canonicalReplacements = [...replacements]
        .filter(([raw, stable]) => typeof raw === "string"
            && raw.length > 0
            && typeof stable === "string"
            && stable.length > 0)
        .sort((left, right) => right[0].length - left[0].length);
    const name = boundedDiagnosticScalar(
        error instanceof Error ? error.name : "UnknownError",
        "UnknownError",
        CAUGHT_ERROR_DIAGNOSTIC_LIMITS.name,
        canonicalReplacements,
    );
    const code = boundedDiagnosticScalar(
        typeof error?.code === "string" ? error.code : "NO_ERROR_CODE",
        "NO_ERROR_CODE",
        CAUGHT_ERROR_DIAGNOSTIC_LIMITS.code,
        canonicalReplacements,
    );
    const message = boundedDiagnosticScalar(
        error instanceof Error ? error.message : String(error),
        "<EMPTY_ERROR_MESSAGE>",
        CAUGHT_ERROR_DIAGNOSTIC_LIMITS.message,
        canonicalReplacements,
    );
    const summary = boundedDiagnosticScalar(
        `${code}: ${message}`,
        "NO_ERROR_CODE: <EMPTY_ERROR_MESSAGE>",
        CAUGHT_ERROR_DIAGNOSTIC_LIMITS.summary,
        [],
    );
    return {
        summary,
        cause: Object.freeze({ name, code, message }),
    };
}

export function executionDiagnosticPathReplacements({
    authority = [],
    materialized = [],
    runtime = [],
    temp = [],
    selectedNodeModules = [],
    dependency = [],
} = {}) {
    const groups = [
        [runtime, "<ISOLATED_RUNTIME>"],
        [selectedNodeModules, "<SELECTED_NODE_MODULES>"],
        [dependency, "<DEPENDENCY_ROOT>"],
        [materialized, "<SELECTED_VIEW>"],
        [authority, "<AUTHORITY_ROOT>"],
        [temp, "<TMP_ROOT>"],
    ];
    const replacements = groups.flatMap(([aliases, stable]) => aliases.map((raw) => [raw, stable]));
    assert(replacements.every(([raw]) => typeof raw === "string" && isAbsolute(raw) && dirname(raw) !== raw),
        "execution diagnostic path aliases must be absolute non-root paths", "BI_CURSOR_RED");
    return replacements;
}

function sha256(bytes) {
    return createHash("sha256").update(bytes).digest("hex");
}

function gitBlobOid(bytes) {
    return createHash("sha1").update(`blob ${bytes.length}\0`).update(bytes).digest("hex");
}

function comparePaths(left, right) {
    return Buffer.compare(Buffer.from(left), Buffer.from(right));
}

function same(left, right) {
    return canonicalJson(left) === canonicalJson(right);
}

function assert(condition, message, code) {
    if (!condition) throw new CursorError(message, code);
}

function exactSubprocessEnv(extra = {}) {
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
        ...extra,
        GIT_NO_REPLACE_OBJECTS: "1",
    };
}

function git(root, args, { allowFailure = false, encoding = "utf8", input } = {}) {
    const result = spawnSync("git", ["-C", root, ...args], {
        encoding,
        env: exactSubprocessEnv(),
        input,
        maxBuffer: 128 * 1024 * 1024,
        stdio: [input === undefined ? "ignore" : "pipe", "pipe", "pipe"],
    });
    if (result.error) throw result.error;
    if (result.status !== 0 && !allowFailure) {
        throw new CursorError(
            `git ${args.join(" ")} failed (${result.status}): ${(result.stderr || "").toString().trim()}`,
            "BI_GIT_RED",
        );
    }
    return result;
}

function readExactRepositoryEntries(root, view = "index", ref = "HEAD") {
    if (view === "index") return parseStageEntries(git(root, ["ls-files", "--stage", "-z"], { encoding: null }).stdout);
    if (view === "commit") return parseTreeEntries(git(root, ["ls-tree", "-rz", "--full-tree", ref], { encoding: null }).stdout);
    throw new CursorError(`unsupported repository view: ${String(view)}`);
}

function resolveCommit(root, ref) {
    const value = git(root, ["rev-parse", "--verify", `${ref}^{commit}`]).stdout.trim();
    assert(SHA1.test(value), `${ref}: did not resolve to a full commit object`);
    return value;
}

function commitParents(root, commit) {
    const row = git(root, ["rev-list", "--parents", "-n", "1", commit]).stdout.trim().split(/\s+/);
    assert(row[0] === commit, `${commit}: malformed first-parent record`);
    return row.slice(1);
}

function commitMessage(root, commit) {
    return git(root, ["show", "-s", "--format=%B", commit]).stdout;
}

function commitTree(root, commit) {
    return git(root, ["show", "-s", "--format=%T", commit]).stdout.trim();
}

function commitBytes(root, commit, path, { allowMissing = false } = {}) {
    const result = git(root, ["show", `${commit}:${path}`], { allowFailure: allowMissing, encoding: null });
    if (result.status !== 0) return null;
    return result.stdout;
}

function indexBytes(root, path, { allowMissing = false } = {}) {
    const result = git(root, ["show", `:${path}`], { allowFailure: allowMissing, encoding: null });
    if (result.status !== 0) return null;
    return result.stdout;
}

function parseJson(bytes, label) {
    try {
        return JSON.parse(Buffer.from(bytes).toString("utf8"));
    } catch (error) {
        throw new CursorError(`${label}: invalid JSON (${error.message})`, "BI_RECEIPT_RED");
    }
}

function readCommitJson(root, commit, path) {
    return parseJson(commitBytes(root, commit, path), `${commit}:${path}`);
}

export function parseCommitTrailers(message) {
    const parsedBlock = spawnSync("git", ["interpret-trailers", "--parse"], {
        cwd: tmpdir(),
        encoding: "utf8",
        input: String(message),
        env: exactSubprocessEnv(),
        maxBuffer: 1024 * 1024,
        stdio: ["pipe", "pipe", "pipe"],
    });
    if (parsedBlock.error) throw parsedBlock.error;
    if (parsedBlock.status !== 0) throw new CursorError(`git interpret-trailers --parse failed: ${parsedBlock.stderr.trim()}`);
    const rows = new Map();
    const duplicates = [];
    const unexpected = [];
    const identities = new Map();
    for (const line of parsedBlock.stdout.split(/\r?\n/)) {
        const match = /^(BI-[A-Za-z0-9-]+):\s*(.*)$/i.exec(line);
        if (!match) continue;
        const [, name, value] = match;
        const identity = name.toLowerCase();
        if (identities.has(identity)) duplicates.push(identities.get(identity));
        else {
            identities.set(identity, name);
            rows.set(name, value.trim());
        }
        if (!ALL_TRAILERS.includes(name)) unexpected.push(name);
    }
    return { trailers: rows, duplicates, unexpected };
}

function requireTrailerTuple(message, expected, { projections = false } = {}) {
    const parsed = parseCommitTrailers(message);
    const errors = [];
    if (parsed.duplicates.length > 0) errors.push(`duplicate BI trailers: ${[...new Set(parsed.duplicates)].join(", ")}`);
    if (parsed.unexpected.length > 0) errors.push(`unexpected BI trailers: ${[...new Set(parsed.unexpected)].join(", ")}`);
    const required = projections ? [...CORE_TRAILERS, ...PROJECTION_TRAILERS] : CORE_TRAILERS;
    for (const name of required) {
        if (!parsed.trailers.has(name)) errors.push(`${name}: missing required commit trailer`);
    }
    if (!projections) {
        for (const name of PROJECTION_TRAILERS) if (parsed.trailers.has(name)) errors.push(`${name}: forbidden before P002`);
    }
    for (const [name, value] of Object.entries(expected)) {
        if (parsed.trailers.get(name) !== value) errors.push(`${name}: expected ${value}, received ${String(parsed.trailers.get(name))}`);
    }
    return { ...parsed, errors };
}

export function serializeCursor(cursor) {
    return `${JSON.stringify(cursor, null, 2)}\n`;
}

export function cursorDigest(cursorOrBytes) {
    return sha256(Buffer.isBuffer(cursorOrBytes) || typeof cursorOrBytes === "string"
        ? cursorOrBytes
        : serializeCursor(cursorOrBytes));
}

export function gitPrivatePaths(root = DEFAULT_ROOT) {
    const base = git(root, ["rev-parse", "--path-format=absolute", "--git-path", "tranche/BI"]).stdout.trim();
    assert(base.startsWith("/"), "Git-private cursor root did not resolve to an absolute path");
    return {
        base,
        cursor: resolve(base, "cursor.json"),
        dispatch: resolve(base, "dispatch"),
        journal: resolve(base, "journal"),
        lock: resolve(base, "lock.json"),
    };
}

async function fsyncDirectory(path) {
    const handle = await open(path, "r");
    try {
        await handle.sync();
    } finally {
        await handle.close();
    }
}

export async function ensureDirectoryDurable(path) {
    try {
        await mkdir(path);
        await fsyncDirectory(path);
        await fsyncDirectory(dirname(path));
    } catch (error) {
        if (error.code === "ENOENT") {
            await ensureDirectoryDurable(dirname(path));
            await ensureDirectoryDurable(path);
            return;
        }
        if (error.code !== "EEXIST") throw error;
    }
}

export async function durableWrite(path, bytes) {
    const parent = dirname(path);
    await ensureDirectoryDurable(parent);
    const temporary = resolve(parent, `.${path.split("/").at(-1)}.${process.pid}.${randomUUID()}.tmp`);
    const handle = await open(temporary, "wx", 0o600);
    try {
        await handle.writeFile(bytes);
        await handle.sync();
    } catch (error) {
        await handle.close();
        await unlink(temporary).catch(() => {});
        throw error;
    }
    await handle.close();
    await rename(temporary, path);
    await fsyncDirectory(parent);
}

async function validateImmutableReceiptTarget(path, payload) {
    const metadata = await lstat(path);
    assert(metadata.isFile() && !metadata.isSymbolicLink() && (metadata.mode & 0o777) === 0o600,
        `${path}: immutable dispatch receipt target is not one private regular file`, "BI_DISPATCH_RED");
    const existing = await readFile(path);
    assert(existing.equals(payload), `${path}: immutable dispatch receipt digest path contains different bytes`, "BI_DISPATCH_RED");
    const handle = await open(path, "r");
    try {
        await handle.sync();
    } finally {
        await handle.close();
    }
    await fsyncDirectory(dirname(path));
    return existing;
}

async function durableCreateImmutable(path, bytes) {
    const payload = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
    const parent = dirname(path);
    await ensureDirectoryDurable(parent);
    const parentMetadata = await lstat(parent);
    assert(parentMetadata.isDirectory() && !parentMetadata.isSymbolicLink(),
        `${parent}: immutable dispatch receipt parent is not one directory`, "BI_DISPATCH_RED");
    const digest = sha256(payload);
    const staging = resolve(parent, `.${digest}.${process.pid}.${randomUUID()}.dispatch.tmp`);
    const handle = await open(staging, "wx", 0o600);
    try {
        await handle.writeFile(payload);
        await handle.sync();
    } catch (error) {
        await handle.close();
        await unlink(staging).catch(() => {});
        await fsyncDirectory(parent).catch(() => {});
        throw error;
    }
    await handle.close();
    let created = true;
    try {
        await link(staging, path);
        await fsyncDirectory(parent);
    } catch (error) {
        if (error.code !== "EEXIST") throw error;
        created = false;
        await validateImmutableReceiptTarget(path, payload);
    } finally {
        await unlink(staging).catch(() => {});
        await fsyncDirectory(parent).catch(() => {});
    }
    if (created) await validateImmutableReceiptTarget(path, payload);
    return { created, bytes: payload };
}

async function durableUnlink(path) {
    try {
        await unlink(path);
        await fsyncDirectory(dirname(path));
    } catch (error) {
        if (error.code !== "ENOENT") throw error;
    }
}

async function executablePath(candidates) {
    for (const candidate of candidates) {
        try {
            await access(candidate);
            return candidate;
        } catch {
            // Try the next exact system path.
        }
    }
    return null;
}

async function kernelLockInvocation(lockPath, payload, { waitSeconds = 0 } = {}) {
    const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
    if (process.platform === "darwin") {
        const binary = await executablePath(["/usr/bin/lockf"]);
        if (binary) {
            return {
                binary: "/bin/sh",
                args: [
                    "-c",
                    'exec 9>>"$1" || exit 70; /usr/bin/lockf -s -t "$2" 9 || exit $?; shift 2; exec "$@"',
                    "sh",
                    lockPath,
                    String(waitSeconds),
                    process.execPath,
                    fileURLToPath(import.meta.url),
                    "--locked-worker",
                    encoded,
                ],
            };
        }
    } else {
        const binary = await executablePath(["/usr/bin/flock", "/bin/flock"]);
        if (binary) {
            return {
                binary: "/bin/sh",
                args: [
                    "-c",
                    'exec 9>>"$1" || exit 70; "$2" -w "$3" 9 || exit $?; shift 3; exec "$@"',
                    "sh",
                    lockPath,
                    binary,
                    String(waitSeconds),
                    process.execPath,
                    fileURLToPath(import.meta.url),
                    "--locked-worker",
                    encoded,
                ],
            };
        }
    }
    throw new CursorError("no supported kernel advisory-lock primitive is available", "BI_CURSOR_LOCKED");
}

async function runLockedMutation(root, operation, args = {}) {
    const repositoryRoot = resolve(root);
    const paths = gitPrivatePaths(repositoryRoot);
    await ensureDirectoryDurable(paths.base);
    const lockFile = await open(paths.lock, "a", 0o600);
    await lockFile.close();
    await fsyncDirectory(paths.base);
    const invocation = await kernelLockInvocation(
        paths.lock,
        { root: repositoryRoot, operation, args },
        { waitSeconds: operation === "prepare-dispatch" ? 15 : 0 },
    );
    const result = await new Promise((accept, reject) => {
        const child = spawn(invocation.binary, invocation.args, {
            env: exactSubprocessEnv({ BI_CURSOR_LOCKED_WORKER: "1" }),
            stdio: ["ignore", "pipe", "pipe"],
        });
        let stdout = "";
        let stderr = "";
        child.stdout.setEncoding("utf8");
        child.stderr.setEncoding("utf8");
        child.stdout.on("data", (chunk) => { stdout += chunk; });
        child.stderr.on("data", (chunk) => { stderr += chunk; });
        child.once("error", reject);
        child.once("exit", (code, signal) => accept({ code, signal, stdout, stderr }));
    });
    let envelope = null;
    try {
        envelope = JSON.parse(result.stdout.trim());
    } catch {
        // Lock contention and signalled workers intentionally have no JSON envelope.
    }
    if (result.code !== 0 || !envelope?.ok) {
        throw new CursorError(
            envelope?.error ?? `exclusive cursor writer is unavailable (exit ${String(result.code ?? result.signal)}${result.stderr ? `: ${result.stderr.trim()}` : ""})`,
            envelope?.code ?? "BI_CURSOR_LOCKED",
        );
    }
    return envelope.value;
}

async function writeLockMetadata(paths, operation, root) {
    const record = {
        schemaVersion: "1.0.0",
        operation,
        pid: process.pid,
        acquiredAt: new Date().toISOString(),
        integrationBase: resolveCommit(root, "HEAD"),
        nonce: randomUUID(),
        primitive: process.platform === "darwin" ? "lockf-fd9-inherited" : "flock-fd9-inherited",
    };
    const metadata = await open(paths.lock, "r+");
    try {
        await metadata.truncate(0);
        await metadata.writeFile(`${JSON.stringify(record)}\n`);
        await metadata.sync();
    } finally {
        await metadata.close();
        await fsyncDirectory(paths.base);
    }
}

function formationPath(path) {
    return `${FORMATION_ROOT}/${path}`;
}

function loadFormation(root, anchor) {
    const manifest = readCommitJson(root, anchor, formationPath("FORMATION-MANIFEST.json"));
    const waves = readCommitJson(root, anchor, formationPath("waves.json"));
    const dag = readCommitJson(root, anchor, formationPath("dag.json"));
    const seed = readCommitJson(root, anchor, formationPath("execution-cursor.seed.json"));
    return { manifest, waves, dag, seed };
}

function hasAlternativePath(edges, removedFrom, removedTo) {
    const outgoing = new Map();
    for (const edge of edges) {
        if (edge.from === removedFrom && edge.to === removedTo) continue;
        if (!outgoing.has(edge.from)) outgoing.set(edge.from, []);
        outgoing.get(edge.from).push(edge.to);
    }
    const queue = [removedFrom];
    const seen = new Set(queue);
    while (queue.length > 0) {
        const current = queue.shift();
        for (const next of outgoing.get(current) ?? []) {
            if (next === removedTo) return true;
            if (!seen.has(next)) {
                seen.add(next);
                queue.push(next);
            }
        }
    }
    return false;
}

function deriveLaunchStrata(waveRows) {
    const order = new Map(waveRows.map((wave, index) => [wave.id, index]));
    const outgoing = new Map(waveRows.map((wave) => [wave.id, []]));
    const indegree = new Map(waveRows.map((wave) => [wave.id, 0]));
    for (const wave of waveRows) {
        for (const dependency of wave.dependsOn ?? []) {
            if (!outgoing.has(dependency) || !indegree.has(wave.id) || dependency === wave.id) continue;
            outgoing.get(dependency).push(wave.id);
            indegree.set(wave.id, indegree.get(wave.id) + 1);
        }
    }
    const remaining = new Set(waveRows.map((wave) => wave.id));
    const strata = [];
    while (remaining.size > 0) {
        const ready = [...remaining]
            .filter((waveId) => indegree.get(waveId) === 0)
            .sort((left, right) => order.get(left) - order.get(right));
        if (ready.length === 0) return null;
        strata.push(ready);
        for (const waveId of ready) {
            remaining.delete(waveId);
            for (const next of outgoing.get(waveId) ?? []) indegree.set(next, indegree.get(next) - 1);
        }
    }
    return strata;
}

function deriveResourceSafeLaunchBatches(waveIds, nodeById, maxLiveAgents) {
    const batches = [];
    for (const waveId of waveIds) {
        const node = nodeById.get(waveId);
        if (!node) continue;
        const locks = new Set(node.resourceLocks ?? []);
        const paths = new Set(node.implicitWriteLeases ?? []);
        let selected = null;
        for (const batch of batches) {
            if (batch.length >= maxLiveAgents) continue;
            const peers = batch.map((peerId) => nodeById.get(peerId)).filter(Boolean);
            const lockCollision = peers.some((peer) => (peer.resourceLocks ?? []).some((lock) => locks.has(lock)));
            const pathCollision = peers.some((peer) => (peer.implicitWriteLeases ?? []).some((path) => paths.has(path)));
            if (!lockCollision && !pathCollision) {
                selected = batch;
                break;
            }
        }
        if (selected) selected.push(waveId);
        else batches.push([waveId]);
    }
    return batches;
}

export function validateFormationGraph({ manifest, waves, dag, seed }) {
    const errors = [];
    const waveRows = waves?.waves;
    if (manifest?.sourceBase !== SOURCE_BASE || waves?.sourceBase !== SOURCE_BASE || dag?.sourceBase !== SOURCE_BASE || seed?.sourceBase !== SOURCE_BASE) {
        errors.push("formation graph authorities disagree with the immutable source base");
    }
    if (!SHA256.test(manifest?.contentDigestSha256 ?? "")) errors.push("formation manifest lacks its closure digest");
    if (!Array.isArray(waveRows) || waveRows.length < 1 || waves?.count !== waveRows?.length) errors.push("waves.json count must reproduce from its nonempty current wave definitions");
    const ids = Array.isArray(waveRows) ? waveRows.map((wave) => wave.id) : [];
    if (new Set(ids).size !== ids.length) errors.push("waves.json contains duplicate wave identities");
    if (ids[0] !== "BI.W-P000") errors.push("waves.json must begin with the sole P000 bootstrap authority");
    if (!seed || seed.authority !== AUTHORITY || seed.mode !== "TRANCHE_DEVELOPMENT" || seed.maxLiveAgents !== 3) errors.push("cursor seed authority is invalid");
    const seedIds = Object.keys(seed?.waves ?? {});
    if (!same(seedIds, ids)) errors.push("cursor seed wave order/set differs from waves.json");
    const byId = new Map((waveRows ?? []).map((wave) => [wave.id, wave]));
    const receiptPaths = new Set();
    const combinedOutgoing = new Map(ids.map((id) => [id, []]));
    const combinedIndegree = new Map(ids.map((id) => [id, 0]));
    for (const wave of waveRows ?? []) {
        if (!WAVE_ID.test(wave.id)) errors.push(`${wave.id}: invalid wave identity`);
        if (wave.status !== "PLANNED") errors.push(`${wave.id}: anchored formation wave status must be PLANNED`);
        const expectedReceiptPath = wave.id === "BI.W-P000"
            ? BOOTSTRAP_RECEIPT
            : `docs/tranches/BI/evidence/${wave.id}/receipt.json`;
        if (wave.receiptPath !== expectedReceiptPath) errors.push(`${wave.id}: receiptPath is not its canonical per-wave identity`);
        if (receiptPaths.has(wave.receiptPath)) errors.push(`${wave.id}: receiptPath is duplicated across wave authority`);
        receiptPaths.add(wave.receiptPath);
        if (!Array.isArray(wave.dependsOn) || !Array.isArray(wave.integrationRequires)) errors.push(`${wave.id}: dependency sets are absent`);
        if (new Set(wave.dependsOn ?? []).size !== (wave.dependsOn ?? []).length) errors.push(`${wave.id}: duplicate launch dependency`);
        if (new Set(wave.integrationRequires ?? []).size !== (wave.integrationRequires ?? []).length) errors.push(`${wave.id}: duplicate integration prerequisite`);
        const overlap = (wave.dependsOn ?? []).filter((dependency) => (wave.integrationRequires ?? []).includes(dependency));
        if (overlap.length > 0) errors.push(`${wave.id}: dependency is duplicated across launch and integration relations (${overlap.join(", ")})`);
        const allDependencies = [...(wave.dependsOn ?? []), ...(wave.integrationRequires ?? [])];
        for (const dependency of allDependencies) {
            if (dependency === wave.id) errors.push(`${wave.id}: self-dependency is forbidden`);
            const owner = byId.get(dependency);
            if (!owner) errors.push(`${wave.id}: unknown dependency ${dependency}`);
            else if (!(owner.topologicalStratum < wave.topologicalStratum) && (wave.dependsOn ?? []).includes(dependency)) {
                errors.push(`${wave.id}: launch dependency ${dependency} is not in an earlier stratum`);
            } else if (owner.topologicalStratum > wave.topologicalStratum && (wave.integrationRequires ?? []).includes(dependency)) {
                errors.push(`${wave.id}: integration prerequisite ${dependency} points into a future stratum`);
            }
            if (owner && dependency !== wave.id) {
                combinedOutgoing.get(dependency)?.push(wave.id);
                combinedIndegree.set(wave.id, combinedIndegree.get(wave.id) + 1);
            }
        }
        if (new Set(wave.subjects?.map((subject) => subject.path)).size !== (wave.subjects?.length ?? 0)) errors.push(`${wave.id}: duplicate subject path`);
        const leaseOwners = new Map();
        for (const subject of wave.subjects ?? []) {
            if (subject.action === "verify") continue;
            const owned = subject.action === "rename"
                ? [{ role: "rename-source", path: subject.path }, { role: "rename-target", path: subject.targetPath }]
                : [{ role: `${subject.action}-primary`, path: subject.path }];
            for (const owner of owned) {
                if (!leaseOwners.has(owner.path)) leaseOwners.set(owner.path, []);
                leaseOwners.get(owner.path).push(owner.role);
            }
        }
        for (const [path, owners] of leaseOwners) {
            if (owners.length === 1) continue;
            const compositeRewrite = owners.length === 2
                && owners.includes("create-primary")
                && owners.includes("rename-target");
            if (!compositeRewrite) errors.push(`${wave.id}: ambiguous subject lease overlap at ${path} (${owners.join(", ")})`);
        }
        const seeded = seed?.waves?.[wave.id];
        const expectedSeed = {
            status: "PLANNED",
            commit: null,
            evidenceDigest: null,
            terminalRationale: null,
            receiptPath: wave.receiptPath,
            integrationArtifacts: wave.integrationArtifacts,
            projectionMode: wave.projectionMode,
            integrationRequires: wave.integrationRequires,
            integrationPrerequisites: wave.integrationPrerequisites,
        };
        if (!seeded || !same(seeded, expectedSeed)) {
            errors.push(`${wave.id}: cursor seed differs from the current wave transaction envelope`);
        }
    }
    const combinedQueue = ids.filter((id) => combinedIndegree.get(id) === 0);
    let combinedVisited = 0;
    while (combinedQueue.length > 0) {
        const current = combinedQueue.shift();
        combinedVisited += 1;
        for (const next of combinedOutgoing.get(current) ?? []) {
            combinedIndegree.set(next, combinedIndegree.get(next) - 1);
            if (combinedIndegree.get(next) === 0) combinedQueue.push(next);
        }
    }
    if (combinedVisited !== ids.length) errors.push("combined launch plus integration dependency relation is cyclic or self-deadlocked");
    const edges = dag?.edges;
    if (!Array.isArray(edges) || dag.edgeCount !== edges?.length || dag.nodeCount !== ids.length || dag.maxLiveAgents !== 3) errors.push("dag.json count/agent metadata is invalid");
    const expectedEdges = (waveRows ?? []).flatMap((wave) => (wave.dependsOn ?? []).map((from) => `${from}\0${wave.id}`)).sort(comparePaths);
    const actualEdges = (edges ?? []).map((edge) => `${edge.from}\0${edge.to}`).sort(comparePaths);
    if (!same(expectedEdges, actualEdges)) errors.push("dag.json edges differ from waves.json dependsOn launch edges");
    for (const edge of edges ?? []) {
        if (edge.minimal !== true) errors.push(`${edge.from}->${edge.to}: edge is not marked minimal`);
        if (hasAlternativePath(edges, edge.from, edge.to)) errors.push(`${edge.from}->${edge.to}: transitive edge is forbidden`);
    }
    const nodeRows = dag?.nodes ?? [];
    const nodeById = new Map(nodeRows.map((node) => [node.id, node]));
    if (!Array.isArray(dag?.nodes) || nodeRows.length !== ids.length || nodeById.size !== ids.length) errors.push("dag.json node set is incomplete, extra, or duplicated");
    for (const wave of waveRows ?? []) {
        const node = nodeById.get(wave.id);
        const leases = [...new Set((wave.subjects ?? []).flatMap((subject) => {
            if (subject.action === "verify") return [];
            if (subject.action === "rename") return [subject.path, subject.targetPath];
            return [subject.path];
        }))].sort(comparePaths);
        if (!node || !same([...(node.implicitWriteLeases ?? [])].sort(comparePaths), leases)) errors.push(`${wave.id}: implicit write leases differ from owned subjects`);
        if (node && !same([...(node.resourceLocks ?? [])].sort(comparePaths), [...(wave.resourceLocks ?? [])].sort(comparePaths))) errors.push(`${wave.id}: semantic locks differ between DAG and waves registry`);
        if (node && (node.status !== "PLANNED"
            || node.title !== wave.title
            || node.formationFamily !== wave.formationFamily
            || node.stratum !== wave.band
            || node.projectionMode !== wave.projectionMode
            || node.status !== wave.status
            || !same(node.serializedIntegrationArtifacts, wave.integrationArtifacts)
            || !same(node.integrationRequires, wave.integrationRequires)
            || !same(node.integrationPrerequisites, wave.integrationPrerequisites))) {
            errors.push(`${wave.id}: DAG node metadata differs from waves.json authority`);
        }
    }
    for (const wave of waveRows ?? []) {
        const consumer = nodeById.get(wave.id);
        for (const dependency of wave.integrationRequires ?? []) {
            const producerWave = byId.get(dependency);
            const producer = nodeById.get(dependency);
            if (!producerWave || !producer || !consumer || producerWave.topologicalStratum !== wave.topologicalStratum) continue;
            const lockOverlap = (consumer.resourceLocks ?? []).filter((lock) => (producer.resourceLocks ?? []).includes(lock));
            const pathOverlap = (consumer.implicitWriteLeases ?? []).filter((path) => (producer.implicitWriteLeases ?? []).includes(path));
            if (lockOverlap.length > 0 || pathOverlap.length > 0) {
                errors.push(`${dependency}->${wave.id}: same-stratum integration prerequisite can deadlock on locks/paths (${[...lockOverlap, ...pathOverlap].join(", ")})`);
            }
        }
    }
    const strata = dag?.strata ?? [];
    if (!Array.isArray(dag?.strata) || strata.length < 1 || dag.stratumCount !== strata.length) errors.push("dag.json strata/count must be nonempty and self-reproducing");
    const derivedStrata = Array.isArray(waveRows) ? deriveLaunchStrata(waveRows) : null;
    if (!derivedStrata) errors.push("launch dependency relation is cyclic and has no Kahn-maximal strata");
    else if (dag.stratumCount !== derivedStrata.length) errors.push("dag.json stratumCount differs from the Kahn-maximal launch topology");
    const expectedStrata = new Map();
    for (const wave of waveRows ?? []) {
        if (!expectedStrata.has(wave.topologicalStratum)) expectedStrata.set(wave.topologicalStratum, []);
        expectedStrata.get(wave.topologicalStratum).push(wave.id);
    }
    const stratumCoverage = [];
    let observedMaxWidth = 0;
    for (const [position, stratum] of strata.entries()) {
        const expectedWaves = expectedStrata.get(stratum.index) ?? [];
        const derivedWaves = derivedStrata?.[position] ?? [];
        observedMaxWidth = Math.max(observedMaxWidth, stratum.waves?.length ?? 0);
        if (stratum.index !== position
            || stratum.id !== `BI.S${String(position).padStart(2, "0")}`
            || stratum.width !== stratum.waves?.length
            || stratum.maxLiveAgents !== 3
            || !same(stratum.waves, expectedWaves)
            || !same(stratum.waves, derivedWaves)
            || stratum.waves?.length < 1) {
            errors.push(`${String(stratum.id)}: stratum identity/width/grouping differs from contiguous Kahn-maximal launch topology`);
        }
        for (const waveId of derivedWaves) {
            const wave = byId.get(waveId);
            if (wave?.topologicalStratum !== position || wave?.band !== `BI.S${String(position).padStart(2, "0")}`) {
                errors.push(`${waveId}: wave stratum/band differs from its derived Kahn layer ${position}`);
            }
        }
        stratumCoverage.push(...(stratum.waves ?? []));
        const derivedBatches = deriveResourceSafeLaunchBatches(derivedWaves, nodeById, 3);
        if (!same(stratum.resourceSafeLaunchBatches, derivedBatches)) {
            errors.push(`${stratum.id}: resource-safe launch batches differ from deterministic first-fit authority`);
        }
        const scheduled = (stratum.resourceSafeLaunchBatches ?? []).flat();
        if (!same([...scheduled].sort(comparePaths), [...(stratum.waves ?? [])].sort(comparePaths))) errors.push(`${stratum.id}: launch batches are not a bijection over stratum waves`);
        for (const batch of stratum.resourceSafeLaunchBatches ?? []) {
            if (batch.length > 3) errors.push(`${stratum.id}: launch batch exceeds maxLiveAgents`);
            const locks = new Set();
            const paths = new Set();
            for (const waveId of batch) {
                const node = nodeById.get(waveId);
                for (const lock of node?.resourceLocks ?? []) {
                    if (locks.has(lock)) errors.push(`${stratum.id}: launch batch collides on semantic lock ${lock}`);
                    locks.add(lock);
                }
                for (const path of node?.implicitWriteLeases ?? []) {
                    if (paths.has(path)) errors.push(`${stratum.id}: launch batch collides on exact path ${path}`);
                    paths.add(path);
                }
            }
        }
    }
    if (!same([...stratumCoverage].sort(comparePaths), [...ids].sort(comparePaths)) || new Set(stratumCoverage).size !== ids.length) errors.push("DAG strata do not cover every declared wave exactly once");
    if (dag?.maxStratumWidth !== observedMaxWidth) errors.push("dag.json maxStratumWidth does not reproduce from current strata");
    return { ok: errors.length === 0, errors };
}

async function validateBootstrapCommit(root, anchor, commit, formation) {
    const errors = [];
    const parents = commitParents(root, commit);
    if (!same(parents, [anchor])) errors.push("P000 must be the unique direct first-parent child of the formation anchor");
    const receiptBytes = commitBytes(root, commit, BOOTSTRAP_RECEIPT, { allowMissing: true });
    if (!receiptBytes) return { errors: ["P000 commit omits docs/tranches/BI/BOOTSTRAP.json"] };
    const receipt = parseJson(receiptBytes, `${commit}:${BOOTSTRAP_RECEIPT}`);
    try {
        const wave = formation.waves.waves.find((item) => item.id === "BI.W-P000");
        assert(wave, "anchored formation omits the P000 wave authority");
        const terminalEntries = readExactRepositoryEntries(root, "commit", commit);
        const anchorEntries = readExactRepositoryEntries(root, "commit", anchor);
        const sourcePackage = parseJson(commitBytes(root, SOURCE_BASE, "package.json"), `${SOURCE_BASE}:package.json`);
        const terminalPackage = parseJson(commitBytes(root, commit, "package.json"), `${commit}:package.json`);
        const commandRows = (scripts) => Object.entries(scripts ?? {})
            .map(([key, argv]) => ({ surface: "package.json", key, argv }))
            .sort((left, right) => comparePaths(left.key, right.key));
        const context = {
            formationDigest: formation.manifest.contentDigestSha256,
            formationAnchorParent: SOURCE_BASE,
            sourceBase: SOURCE_BASE,
            integrationParent: anchor,
            preCommandSet: commandRows(sourcePackage.scripts),
            postCommandSet: commandRows(terminalPackage.scripts),
            subjectOutcomes: deriveSubjectOutcomes(wave.subjects, terminalEntries, anchorEntries),
            payloadDigest: canonicalStage0Payload(terminalEntries),
        };
        const validation = validateBootstrapReceipt(receipt, {
            ...context,
            evidenceDigest: receipt.evidenceDigest,
            routedCurrentReds: receipt.routedCurrentReds,
        });
        errors.push(...validation.errors);
        if (context.formationDigest !== formation.manifest.contentDigestSha256) errors.push("P000 formation digest differs from the anchored manifest closure");
    } catch (error) {
        errors.push(`P000 authority import failed: ${error.message}`);
    }
    if (receipt.status !== "DONE") errors.push("P000 is not DONE and cannot unlock P001");
    if (receipt.sourceBase !== SOURCE_BASE || receipt.formationAnchorParent !== SOURCE_BASE) errors.push("P000 receipt does not bind the exact source-base/anchor lineage");
    if (receipt.integrationParent !== anchor) errors.push("P000 receipt integrationParent differs from its direct first parent");
    const tuple = requireTrailerTuple(commitMessage(root, commit), {
        "BI-Wave": "BI.W-P000",
        "BI-Status": receipt.status,
        "BI-Receipt-SHA256": receiptDigest(receiptBytes),
        "BI-Formation-SHA256": receipt.formationDigest,
    });
    errors.push(...tuple.errors);
    const targetDigest = receiptDigest(receiptBytes);
    const candidates = [];
    for (const row of git(root, ["rev-list", "--all", "--parents"]).stdout.split(/\r?\n/).filter(Boolean)) {
        const [candidate, ...candidateParents] = row.trim().split(/\s+/);
        if (!same(candidateParents, [anchor])) continue;
        const candidateBytes = commitBytes(root, candidate, BOOTSTRAP_RECEIPT, { allowMissing: true });
        if (!candidateBytes || receiptDigest(candidateBytes) !== targetDigest) continue;
        const candidateTuple = parseCommitTrailers(commitMessage(root, candidate));
        if (candidateTuple.duplicates.length > 0
            || candidateTuple.unexpected.length > 0
            || candidateTuple.trailers.get("BI-Wave") !== "BI.W-P000"
            || candidateTuple.trailers.get("BI-Receipt-SHA256") !== targetDigest) continue;
        let candidateReceipt;
        try {
            candidateReceipt = JSON.parse(candidateBytes.toString("utf8"));
        } catch {
            continue;
        }
        if (candidateReceipt.integrationParent !== anchor) continue;
        const candidatePayload = canonicalStage0Payload(readExactRepositoryEntries(root, "commit", candidate));
        if (!same(candidatePayload, receipt.payloadDigestExcludingIntegrationAdjuncts)) continue;
        candidates.push(candidate);
    }
    if (!same([...new Set(candidates)], [commit])) errors.push("P000 recovery tuple does not resolve to exactly one containing child across all refs");
    return { errors, receipt, receiptBytes, formationDigest: receipt.formationDigest };
}

function evidenceBytes(root, path, view, ref) {
    return view === "index"
        ? indexBytes(root, path, { allowMissing: true })
        : commitBytes(root, ref, path, { allowMissing: true });
}

function expectedP001EvidenceKinds(wave) {
    if (wave.id !== "BI.W-P001") return null;
    const result = new Map();
    for (const subject of wave.subjects) {
        let kind = "source";
        if (subject.path === "package.json") kind = "manifest";
        else if (subject.path.endsWith("-schema.json")) kind = "schema";
        else if (/^tests\/.+\.test\.[cm]?[jt]sx?$/.test(subject.path)) kind = "test";
        else if (subject.path === "docs/tranches/BI/EXECUTION-PROGRESS.md") kind = "documentation";
        else if (subject.path.endsWith(".mjs")) kind = "verification";
        result.set(subject.path, kind);
    }
    return result;
}

function validateEvidenceBindings({ root, wave, receipt, view, ref }) {
    const errors = [];
    const entries = receipt?.evidence?.entries;
    if (!Array.isArray(entries)) return ["receipt evidence entries are unavailable"];
    const expectedP001 = receipt.status === "DONE" ? expectedP001EvidenceKinds(wave) : null;
    const actualKinds = new Map();
    for (const entry of entries) {
        if (actualKinds.has(entry.path)) errors.push(`${entry.path}: duplicate evidence binding`);
        actualKinds.set(entry.path, entry.kind);
        if ([wave.receiptPath, ...ADJUNCT_PROJECTIONS].includes(entry.path)) {
            errors.push(`${entry.path}: integration adjunct cannot evidence itself`);
            continue;
        }
        const bytes = evidenceBytes(root, entry.path, view, ref);
        if (!bytes) {
            errors.push(`${entry.path}: evidence path is absent from the selected ${view} view`);
            continue;
        }
        if (entry.bytes !== bytes.length) errors.push(`${entry.path}: evidence byte count does not bind the selected ${view} view`);
        if (entry.sha256 !== sha256(bytes)) errors.push(`${entry.path}: evidence SHA-256 does not bind the selected ${view} view`);
        if (receipt.status === "DONE" && entry.status !== "PASS") errors.push(`${entry.path}: DONE evidence must remain PASS`);
    }
    if (expectedP001) {
        if (!same([...actualKinds.keys()].sort(comparePaths), [...expectedP001.keys()].sort(comparePaths))) {
            errors.push("BI.W-P001 evidence must cover exactly all eight repair-manifest subjects");
        }
        for (const [path, kind] of expectedP001) {
            if (actualKinds.get(path) !== kind) errors.push(`${path}: P001 evidence kind must be ${kind}`);
        }
    }
    return errors;
}

async function worktreeGitObject(root, path) {
    const absolute = resolve(root, path);
    let metadata;
    try {
        metadata = await lstat(absolute);
    } catch (error) {
        if (error.code === "ENOENT") return null;
        throw error;
    }
    if (metadata.isSymbolicLink()) {
        const bytes = Buffer.from(await readlink(absolute));
        return { mode: "120000", oid: gitBlobOid(bytes) };
    }
    assert(metadata.isFile(), `${path}: P001 subject is not a regular file or symbolic link`);
    const bytes = await readFile(absolute);
    return { mode: metadata.mode & 0o111 ? "100755" : "100644", oid: gitBlobOid(bytes) };
}

async function filesystemFingerprint(path) {
    const metadata = await lstat(path, { bigint: true });
    const type = metadata.isFile()
        ? "file"
        : metadata.isDirectory()
            ? "directory"
            : metadata.isSymbolicLink()
                ? "symlink"
                : "other";
    return {
        type,
        mode: metadata.mode.toString(),
        dev: metadata.dev.toString(),
        ino: metadata.ino.toString(),
        size: metadata.size.toString(),
        mtimeNs: metadata.mtimeNs.toString(),
        ctimeNs: metadata.ctimeNs.toString(),
        linkTarget: type === "symlink" ? await readlink(path) : null,
    };
}

async function nodeModulesBoundarySnapshot(root, lockOid) {
    const realRoot = await realpath(resolve(root, "node_modules"));
    const rows = [];
    async function visit(absolute, relative) {
        const fingerprint = await filesystemFingerprint(absolute);
        rows.push({ path: relative, ...fingerprint });
        if (fingerprint.type !== "directory") return;
        for (const name of (await readdir(absolute)).sort(comparePaths)) {
            await visit(resolve(absolute, name), relative === "." ? name : `${relative}/${name}`);
        }
    }
    await visit(realRoot, ".");
    return { realRoot, lockOid, rows };
}

async function rehashChangedDependencyFiles(before, after) {
    const prior = new Map(before.rows.map((row) => [row.path, row]));
    for (const row of after.rows) {
        if (row.type !== "file" || same(prior.get(row.path), row)) continue;
        await readFile(resolve(after.realRoot, row.path)).then(sha256).catch(() => null);
    }
}

async function validateP001WorktreeMatchesIndex(root, wave) {
    if (wave.id !== "BI.W-P001") return [];
    const errors = [];
    const index = new Map(readExactRepositoryEntries(root, "index").map((entry) => [entry.path, { mode: entry.mode, oid: entry.oid }]));
    const paths = [...new Set(wave.subjects.flatMap((subject) => subject.action === "rename" ? [subject.path, subject.targetPath] : [subject.path]))].sort(comparePaths);
    for (const path of paths) {
        const disk = await worktreeGitObject(root, path);
        const staged = index.get(path) ?? null;
        if (!same(disk, staged)) errors.push(`${path}: P001 worktree bytes/mode differ from the staged index`);
    }
    return errors;
}

async function rawBlobCacheRoot() {
    if (!RAW_BLOB_CACHE_ROOT) {
        await scavengeDeadProcessTempRoots();
        RAW_BLOB_CACHE_ROOT = await mkdtemp(resolve(tmpdir(), `glass-bi-raw-blob-cache-${process.pid}-`));
        await chmod(RAW_BLOB_CACHE_ROOT, 0o700);
    }
    return RAW_BLOB_CACHE_ROOT;
}

function rawBlobCachePath(cacheRoot, oid) {
    return resolve(cacheRoot, oid.slice(0, 2), oid);
}

async function installRawBlobCacheEntry(cacheRoot, oid, bytes) {
    assert(gitBlobOid(bytes) === oid, `raw blob cache input does not reproduce ${oid}`, "BI_SELECTED_VIEW_RED");
    const parent = resolve(cacheRoot, oid.slice(0, 2));
    await mkdir(parent, { recursive: true, mode: 0o700 });
    await chmod(parent, 0o700);
    const target = rawBlobCachePath(cacheRoot, oid);
    const temporary = resolve(parent, `.${oid}.${process.pid}.${randomUUID()}.tmp`);
    const handle = await open(temporary, "wx", 0o600);
    try {
        await handle.writeFile(bytes);
    } catch (error) {
        await handle.close();
        await unlink(temporary).catch(() => {});
        throw error;
    }
    await handle.close();
    await rename(temporary, target);
    await chmod(target, 0o600);
    RAW_BLOB_CACHE_FINGERPRINTS.set(oid, await filesystemFingerprint(target));
}

async function validateRawBlobCacheEntry(cacheRoot, oid, { requireBytes = false } = {}) {
    const path = rawBlobCachePath(cacheRoot, oid);
    const metadata = await lstat(path);
    assert(metadata.isFile() && !metadata.isSymbolicLink() && (metadata.mode & 0o777) === 0o600,
        `raw blob cache entry ${oid} is not one private regular file`, "BI_SELECTED_VIEW_RED");
    const fingerprint = await filesystemFingerprint(path);
    const prior = RAW_BLOB_CACHE_FINGERPRINTS.get(oid);
    let bytes = null;
    if (!prior || !same(prior, fingerprint) || requireBytes) {
        bytes = await readFile(path);
        if (gitBlobOid(bytes) !== oid) {
            await unlink(path).catch(() => {});
            RAW_BLOB_CACHE_FINGERPRINTS.delete(oid);
            throw new CursorError(`raw blob cache entry ${oid} failed OID revalidation`, "BI_SELECTED_VIEW_RED");
        }
        RAW_BLOB_CACHE_FINGERPRINTS.set(oid, fingerprint);
    }
    return { path, bytes, fingerprint };
}

async function dependencyMirrorSnapshot(directory) {
    const store = resolve(directory, "node_modules");
    const rows = [];
    async function visit(absolute, relativePath) {
        const fingerprint = await filesystemFingerprint(absolute);
        assert(fingerprint.type === "directory" || fingerprint.type === "symlink",
            `${relativePath}: dependency mirror contains a non-directory/non-link entry`, "BI_SELECTED_VIEW_RED");
        rows.push({ path: relativePath, ...fingerprint });
        if (fingerprint.type !== "directory") return;
        for (const name of (await readdir(absolute)).sort(comparePaths)) {
            await visit(resolve(absolute, name), relativePath === "." ? name : `${relativePath}/${name}`);
        }
    }
    await visit(store, ".");
    return rows;
}

async function mirrorExactViewDependencies(root, exactViewRoot) {
    const sourceStore = await realpath(resolve(root, "node_modules"));
    const installOwner = dirname(sourceStore);
    const targetStore = resolve(exactViewRoot, "node_modules");
    await mkdir(targetStore, { recursive: true, mode: 0o755 });
    const workspaceLinks = [];
    const linkEntry = async (source, target) => {
        const real = await realpath(source);
        let workspaceRelative = null;
        for (const owner of [...new Set([resolve(root), installOwner])]) {
            const candidate = relative(owner, real);
            const insideOwner = candidate !== ""
                && candidate !== ".."
                && !candidate.startsWith(`..${sep}`)
                && !candidate.startsWith(`node_modules${sep}`);
            if (insideOwner) {
                workspaceRelative = candidate;
                break;
            }
        }
        const destination = workspaceRelative === null ? real : resolve(exactViewRoot, workspaceRelative);
        if (workspaceRelative !== null) {
            assert(destination.startsWith(`${exactViewRoot}/`),
                `${source}: workspace dependency escapes the exact selected view`, "BI_SELECTED_VIEW_RED");
            try {
                await access(destination);
            } catch {
                throw new CursorError(
                    `workspace dependency ${source} points to ${workspaceRelative}, absent from the exact selected view`,
                    "BI_SELECTED_VIEW_RED",
                );
            }
        }
        const metadata = await lstat(real);
        await symlink(destination, target, metadata.isDirectory() ? "dir" : "file");
        if (workspaceRelative !== null) {
            workspaceLinks.push({
                dependencyPath: relative(targetStore, target).split(sep).join("/"),
                repositoryPath: workspaceRelative.split(sep).join("/"),
                targetWithinExactView: relative(exactViewRoot, destination).split(sep).join("/"),
            });
        }
    };
    for (const entry of await readdir(sourceStore, { withFileTypes: true })) {
        if ([".cache", ".vite", ".vitest", ".tmp"].includes(entry.name)) continue;
        const source = resolve(sourceStore, entry.name);
        const target = resolve(targetStore, entry.name);
        if (entry.name === ".bin" || (entry.name.startsWith("@") && entry.isDirectory() && !entry.isSymbolicLink())) {
            await mkdir(target, { recursive: true, mode: 0o755 });
            for (const nested of await readdir(source, { withFileTypes: true })) {
                await linkEntry(resolve(source, nested.name), resolve(target, nested.name));
            }
            continue;
        }
        await linkEntry(source, target);
    }
    return {
        sourceStore,
        workspaceLinks: workspaceLinks.sort((left, right) => comparePaths(left.dependencyPath, right.dependencyPath)),
        rows: await dependencyMirrorSnapshot(exactViewRoot),
    };
}

async function materializeSelectedView(root, view, ref) {
    await scavengeDeadProcessTempRoots();
    const directory = await mkdtemp(resolve(tmpdir(), `glass-bi-wave-test-${process.pid}-`));
    ACTIVE_MATERIALIZED_ROOTS.add(directory);
    try {
        const entries = readExactRepositoryEntries(root, view, ref)
            .sort((left, right) => comparePaths(left.path, right.path));
        const paths = new Set(entries.map((entry) => entry.path));
        assert(paths.size === entries.length, "selected-view materialization found duplicate Git paths", "BI_SELECTED_VIEW_RED");
        const portablePaths = new Map();
        for (const entry of entries) {
            const portable = entry.path.normalize("NFC").toLowerCase();
            assert(!portablePaths.has(portable),
                `selected-view materialization found case/normalization collision: ${portablePaths.get(portable) ?? entry.path} / ${entry.path}`,
                "BI_SELECTED_VIEW_RED");
            portablePaths.set(portable, entry.path);
        }
        const entriesByOid = new Map();
        const initialFingerprints = new Map();
        for (const entry of entries) {
            const segments = entry.path.split("/");
            assert(entry.path.length > 0
                && !entry.path.startsWith("/")
                && !entry.path.includes("\0")
                && segments.every((segment) => segment.length > 0 && segment !== "." && segment !== ".." && segment.toLowerCase() !== ".git"),
            `selected-view materialization rejected unsafe Git path: ${entry.path}`, "BI_SELECTED_VIEW_RED");
            for (let length = 1; length < segments.length; length += 1) {
                const prefix = segments.slice(0, length).join("/");
                assert(!paths.has(prefix), `selected-view materialization found file/directory prefix collision: ${prefix}`, "BI_SELECTED_VIEW_RED");
                const portablePrefix = prefix.normalize("NFC").toLowerCase();
                assert(!portablePaths.has(portablePrefix),
                    `selected-view materialization found portable file/directory prefix collision: ${portablePrefix}`, "BI_SELECTED_VIEW_RED");
            }
            const portablePath = entry.path.normalize("NFC").toLowerCase();
            assert(portablePath !== "node_modules" && !portablePath.startsWith("node_modules/"),
                "selected-view materialization cannot replace its isolated node_modules link", "BI_SELECTED_VIEW_RED");
            assert(![...MATERIALIZED_RUNTIME_ROOTS].some((runtimeRoot) => entry.path === runtimeRoot || entry.path.startsWith(`${runtimeRoot}/`)),
                `${entry.path}: selected-view materialization collides with an isolated runtime root`, "BI_SELECTED_VIEW_RED");
            assert(["100644", "100755", "120000", "160000"].includes(entry.mode),
                `${entry.path}: selected-view materialization rejected Git mode ${entry.mode}`, "BI_SELECTED_VIEW_RED");
            const target = resolve(directory, entry.path);
            assert(target.startsWith(`${directory}/`), `selected-view materialization escaped its root: ${entry.path}`, "BI_SELECTED_VIEW_RED");
            if (entry.mode === "160000") {
                await mkdir(target, { recursive: true });
                const metadata = await lstat(target);
                assert(metadata.isDirectory(), `${entry.path}: selected gitlink did not materialize as an empty directory`, "BI_SELECTED_VIEW_RED");
                initialFingerprints.set(entry.path, await filesystemFingerprint(target));
                continue;
            }
            await mkdir(dirname(target), { recursive: true });
            const owners = entriesByOid.get(entry.oid) ?? [];
            owners.push(entry);
            entriesByOid.set(entry.oid, owners);
        }
        const uniqueOids = [...entriesByOid.keys()].sort(comparePaths);
        const cacheRoot = await rawBlobCacheRoot();
        const missingOids = [];
        for (const oid of uniqueOids) {
            try {
                await access(rawBlobCachePath(cacheRoot, oid));
            } catch {
                missingOids.push(oid);
            }
        }
        if (missingOids.length > 0) {
            const batch = spawn("git", ["-C", root, "cat-file", "--batch"], {
                env: exactSubprocessEnv(),
                stdio: ["pipe", "pipe", "pipe"],
            });
            let launchError = null;
            let inputError = null;
            let stderr = Buffer.alloc(0);
            let timedOut = false;
            batch.on("error", (error) => { launchError = error; });
            batch.stdin.on("error", (error) => { inputError = error; });
            batch.stderr.on("data", (chunk) => {
                if (stderr.length <= 1024 * 1024) stderr = Buffer.concat([stderr, Buffer.from(chunk)]);
                if (stderr.length > 1024 * 1024) batch.kill("SIGKILL");
            });
            const completion = new Promise((accept) => {
                batch.on("close", (code, signal) => accept({ code, signal }));
            });
            const timer = setTimeout(() => {
                timedOut = true;
                batch.kill("SIGKILL");
            }, 900_000);
            batch.stdin.end(Buffer.from(`${missingOids.join("\n")}\n`));
            const iterator = batch.stdout[Symbol.asyncIterator]();
            let pending = Buffer.alloc(0);
            let ended = false;
            const pull = async () => {
                const next = await iterator.next();
                if (next.done) ended = true;
                else pending = pending.length === 0
                    ? Buffer.from(next.value)
                    : Buffer.concat([pending, Buffer.from(next.value)]);
            };
            const takeLine = async () => {
                while (true) {
                    const end = pending.indexOf(0x0a);
                    if (end >= 0) {
                        const line = pending.subarray(0, end).toString("ascii");
                        pending = pending.subarray(end + 1);
                        return line;
                    }
                    assert(!ended && pending.length < 8192,
                        "selected-view raw blob batch omitted or overgrew its header", "BI_SELECTED_VIEW_RED");
                    await pull();
                }
            };
            const takeBytes = async (size) => {
                while (pending.length < size) {
                    assert(!ended, "selected-view raw blob batch truncated an object", "BI_SELECTED_VIEW_RED");
                    await pull();
                }
                const bytes = Buffer.from(pending.subarray(0, size));
                pending = pending.subarray(size);
                return bytes;
            };
            try {
                for (const oid of missingOids) {
                    const header = await takeLine();
                    const match = /^([0-9a-f]{40}) blob ([0-9]+)$/.exec(header);
                    assert(match && match[1] === oid,
                        `selected-view raw blob batch returned an unexpected object for ${oid}`, "BI_SELECTED_VIEW_RED");
                    const size = Number(match[2]);
                    assert(Number.isSafeInteger(size) && size >= 0,
                        `selected-view raw blob batch returned an invalid size for ${oid}`, "BI_SELECTED_VIEW_RED");
                    const bytes = await takeBytes(size);
                    const delimiter = await takeBytes(1);
                    assert(delimiter[0] === 0x0a,
                        `selected-view raw blob batch omitted delimiter for ${oid}`, "BI_SELECTED_VIEW_RED");
                    await installRawBlobCacheEntry(cacheRoot, oid, bytes);
                }
                while (!ended) await pull();
                assert(pending.length === 0, "selected-view raw blob batch emitted extra bytes", "BI_SELECTED_VIEW_RED");
                const exited = await completion;
                assert(!timedOut && !launchError && !inputError && exited.code === 0 && exited.signal === null && stderr.length === 0,
                    `selected-view raw blob batch failed (${timedOut ? "TIMEOUT" : String(exited.code)})`, "BI_SELECTED_VIEW_RED");
            } catch (error) {
                batch.kill("SIGKILL");
                await completion;
                throw error;
            } finally {
                clearTimeout(timer);
            }
        }
        for (const oid of uniqueOids) {
            const owners = entriesByOid.get(oid);
            const cached = await validateRawBlobCacheEntry(cacheRoot, oid, {
                requireBytes: owners.some((entry) => entry.mode === "120000"),
            });
            for (const entry of owners) {
                const target = resolve(directory, entry.path);
                if (entry.mode === "120000") {
                    const linkTarget = cached.bytes.toString("utf8");
                    const resolvedTarget = resolve(dirname(target), linkTarget);
                    assert(Buffer.from(linkTarget).equals(cached.bytes)
                        && !linkTarget.includes("\0")
                        && !linkTarget.startsWith("/")
                        && resolvedTarget.startsWith(`${directory}/`),
                    `${entry.path}: selected-view symlink target escapes or is not canonical UTF-8`, "BI_SELECTED_VIEW_RED");
                    await symlink(linkTarget, target);
                } else {
                    await copyFile(cached.path, target, FS_CONSTANTS.COPYFILE_FICLONE);
                    await chmod(target, entry.mode === "100755" ? 0o755 : 0o644);
                }
                const fingerprint = await filesystemFingerprint(target);
                const executable = (BigInt(fingerprint.mode) & 0o111n) !== 0n;
                assert((entry.mode === "120000" && fingerprint.type === "symlink" && fingerprint.linkTarget === cached.bytes.toString("utf8"))
                    || (entry.mode !== "120000"
                        && fingerprint.type === "file"
                        && fingerprint.size === cached.fingerprint.size
                        && executable === (entry.mode === "100755")),
                `${entry.path}: materialized type/mode/size differs from selected Git authority`, "BI_SELECTED_VIEW_RED");
                initialFingerprints.set(entry.path, fingerprint);
            }
        }
        const nodeModulesMirror = await mirrorExactViewDependencies(root, directory);
        return {
            directory,
            entries,
            initialFingerprints,
            nodeModulesMirror,
            cleanup: async () => {
                ACTIVE_MATERIALIZED_ROOTS.delete(directory);
                await rm(directory, { recursive: true, force: true });
            },
        };
    } catch (error) {
        ACTIVE_MATERIALIZED_ROOTS.delete(directory);
        await rm(directory, { recursive: true, force: true });
        throw error;
    }
}

async function validateSelectedMaterialization(directory, entries, {
    initialFingerprints,
    overlays = new Map(),
    runtimeRoot,
    nodeModulesMirror,
    baseline = null,
} = {}) {
    assert(MATERIALIZED_RUNTIME_ROOTS.has(runtimeRoot), "selected materialization validator requires one canonical runtime root", "BI_SELECTED_VIEW_RED");
    assert(nodeModulesMirror?.sourceStore?.startsWith("/")
        && Array.isArray(nodeModulesMirror.rows)
        && Array.isArray(nodeModulesMirror.workspaceLinks),
    "selected materialization validator requires its canonical dependency mirror", "BI_SELECTED_VIEW_RED");
    assert(initialFingerprints instanceof Map && initialFingerprints.size === entries.length,
        "selected materialization validator lacks its initial leaf fingerprints", "BI_SELECTED_VIEW_RED");
    const leaves = new Map();
    const directories = new Set(["."]);
    for (const entry of entries) {
        const segments = entry.path.split("/");
        for (let length = 1; length < segments.length; length += 1) {
            directories.add(segments.slice(0, length).join("/"));
        }
        leaves.set(entry.path, overlays.get(entry.path) ?? { mode: entry.mode, oid: entry.oid });
    }
    for (const path of overlays.keys()) {
        assert(leaves.has(path), `${path}: selected materialization overlay is not an enrolled Git path`, "BI_SELECTED_VIEW_RED");
    }
    const rows = [{ path: ".", ...await filesystemFingerprint(directory) }];
    let sawNodeModules = false;
    let sawRuntimeRoot = false;
    async function walk(relative = ".") {
        const absolute = relative === "." ? directory : resolve(directory, relative);
        const names = (await readdir(absolute)).sort(comparePaths);
        for (const name of names) {
            const path = relative === "." ? name : `${relative}/${name}`;
            const target = resolve(directory, path);
            const metadata = await lstat(target);
            if (path === "node_modules") {
                assert(metadata.isDirectory() && !metadata.isSymbolicLink(),
                    "selected materialization node_modules mirror is not one real directory", "BI_SELECTED_VIEW_RED");
                const mirrorRows = await dependencyMirrorSnapshot(directory);
                assert(same(mirrorRows, nodeModulesMirror.rows),
                    "selected materialization dependency mirror drifted from its canonical external/workspace bindings", "BI_SELECTED_VIEW_RED");
                sawNodeModules = true;
                rows.push({
                    path,
                    type: "dependency-mirror",
                    digest: sha256(canonicalJson(mirrorRows)),
                    sourceStore: nodeModulesMirror.sourceStore,
                    workspaceLinks: nodeModulesMirror.workspaceLinks,
                });
                continue;
            }
            if (path === runtimeRoot) {
                assert(metadata.isDirectory() && !metadata.isSymbolicLink(),
                    `${runtimeRoot}: isolated runtime root is not one real directory`, "BI_SELECTED_VIEW_RED");
                sawRuntimeRoot = true;
                rows.push({ path, type: "runtime-root" });
                continue;
            }
            if (directories.has(path)) {
                assert(metadata.isDirectory() && !metadata.isSymbolicLink(),
                    `${path}: selected materialization directory boundary drifted`, "BI_SELECTED_VIEW_RED");
                rows.push({ path, ...await filesystemFingerprint(target) });
                await walk(path);
                continue;
            }
            assert(leaves.has(path), `${path}: unauthorized extra selected-materialization path`, "BI_SELECTED_VIEW_RED");
            rows.push({ path, ...await filesystemFingerprint(target) });
        }
    }
    await walk();
    assert(sawNodeModules, "selected materialization deleted its required node_modules link", "BI_SELECTED_VIEW_RED");
    assert(sawRuntimeRoot, `selected materialization deleted its required ${runtimeRoot} boundary`, "BI_SELECTED_VIEW_RED");
    const observedRows = new Map(rows.map((row) => [row.path, row]));
    for (const entry of entries) {
        const target = resolve(directory, entry.path);
        const observedFingerprint = observedRows.get(entry.path);
        assert(observedFingerprint, `${entry.path}: selected materialization path is absent`, "BI_SELECTED_VIEW_RED");
        if (entry.mode === "160000") {
            const metadata = await lstat(target);
            assert(metadata.isDirectory() && (await readdir(target)).length === 0,
                `${entry.path}: selected gitlink materialization is no longer an empty-directory boundary`, "BI_SELECTED_VIEW_RED");
        }
        if (overlays.has(entry.path)) {
            const observed = await worktreeGitObject(directory, entry.path);
            assert(same(observed, leaves.get(entry.path)),
                `${entry.path}: selected materialization overlay bytes/mode differ from its sole exact allowance`, "BI_SELECTED_VIEW_RED");
        } else if (!baseline) {
            assert(same(observedFingerprint, { path: entry.path, ...initialFingerprints.get(entry.path) }),
                `${entry.path}: selected materialized fingerprint drifted before execution`, "BI_SELECTED_VIEW_RED");
        }
    }
    const canonicalRows = [...observedRows.values()].sort((left, right) => comparePaths(left.path, right.path));
    if (baseline && !same(canonicalRows, baseline)) {
        const priorRows = new Map(baseline.map((row) => [row.path, row]));
        for (const entry of entries) {
            if (!same(priorRows.get(entry.path), observedRows.get(entry.path)) && entry.mode !== "160000") {
                await worktreeGitObject(directory, entry.path).catch(() => null);
            }
        }
        throw new CursorError(
            "selected materialization path/type/fingerprint changed during execution",
            "BI_SELECTED_VIEW_RED",
        );
    }
    return canonicalRows;
}

function exactObjectKeys(value, expected) {
    return value !== null
        && typeof value === "object"
        && !Array.isArray(value)
        && same(Object.keys(value).sort(comparePaths), [...expected].sort(comparePaths));
}

function releaseOwnerArgv(waveId, profile, requireTerminal) {
    if (requireTerminal || profile === "release") {
        return ["node", "scripts/verify.mjs", "--state", "auto", "--profile", "release", "--require-terminal"];
    }
    return ["node", "scripts/verify.mjs", "--state", "auto", "--wave", waveId];
}

export function selectedReleaseStage0(root, view, ref) {
    const excluded = new Set(ADJUNCT_PROJECTIONS);
    const entries = readExactRepositoryEntries(root, view, ref)
        .filter((entry) => !excluded.has(entry.path))
        .sort((left, right) => comparePaths(left.path, right.path));
    const chunks = entries.map((entry) => `${entry.path}\0${entry.mode}\0${entry.oid}\n`);
    return {
        algorithm: "sha256(canonical-git-stage0-index-v1)",
        sha256: sha256(chunks.join("")),
        entryCount: entries.length,
        excludes: [...ADJUNCT_PROJECTIONS],
    };
}

function selectedReleaseFacts({ root, wave, view, ref }) {
    const entries = new Map(readExactRepositoryEntries(root, view, ref).map((entry) => [entry.path, entry]));
    const receiptBytes = evidenceBytes(root, wave.receiptPath, view, ref);
    const attestationBytes = evidenceBytes(root, ADJUNCT_PROJECTIONS[0], view, ref);
    const finalBytes = evidenceBytes(root, ADJUNCT_PROJECTIONS[1], view, ref);
    assert(receiptBytes, `${wave.id}: selected release projection receipt is absent`, "BI_RELEASE_PROJECTION_RED");
    assert(attestationBytes, `${wave.id}: selected release attestation is absent`, "BI_RELEASE_PROJECTION_RED");
    assert(finalBytes, `${wave.id}: selected FINAL projection is absent`, "BI_RELEASE_PROJECTION_RED");
    assert(entries.get(ADJUNCT_PROJECTIONS[0])?.mode === "100644" && entries.get(ADJUNCT_PROJECTIONS[1])?.mode === "100644",
        `${wave.id}: release attestation and FINAL must be regular nonexecutable Git blobs`, "BI_RELEASE_PROJECTION_RED");
    return {
        receipt: { path: wave.receiptPath, sha256: sha256(receiptBytes) },
        stage0Index: selectedReleaseStage0(root, view, ref),
        attestationSha256: sha256(attestationBytes),
        finalSha256: sha256(finalBytes),
    };
}

function canonicalReleaseRefs(root) {
    const result = git(root, ["show-ref", "--head", "--dereference"], { allowFailure: true });
    assert(result.status === 0 || (result.status === 1 && result.stdout === ""),
        "release projection could not snapshot canonical refs", "BI_RELEASE_PROJECTION_RED");
    const rows = result.stdout.split("\n").filter(Boolean);
    assert(rows.every((row) => /^[0-9a-f]{40} [^\0\r\n]+$/.test(row)),
        "release projection encountered a malformed ref inventory", "BI_RELEASE_PROJECTION_RED");
    return rows.sort(comparePaths);
}

async function gitPrivateReleaseSnapshot(root) {
    const base = gitPrivatePaths(root).base;
    const rows = [];
    async function visit(absolute, relative) {
        let metadata;
        try {
            metadata = await lstat(absolute);
        } catch (error) {
            if (error.code === "ENOENT" && relative === ".") {
                rows.push({ path: ".", type: "absent", mode: null, bytes: null });
                return;
            }
            throw error;
        }
        const mode = (metadata.mode & 0o7777).toString(8).padStart(4, "0");
        if (metadata.isDirectory()) {
            rows.push({ path: relative, type: "directory", mode, bytes: null });
            const names = (await readdir(absolute)).sort(comparePaths);
            for (const name of names) {
                await visit(resolve(absolute, name), relative === "." ? name : `${relative}/${name}`);
            }
            return;
        }
        if (metadata.isFile()) {
            rows.push({ path: relative, type: "file", mode, bytes: (await readFile(absolute)).toString("base64") });
            return;
        }
        if (metadata.isSymbolicLink()) {
            rows.push({ path: relative, type: "symlink", mode, bytes: Buffer.from(await readlink(absolute)).toString("base64") });
            return;
        }
        rows.push({ path: relative, type: "other", mode, bytes: null });
    }
    await visit(base, ".");
    return rows;
}

async function repositoryPuritySnapshot(root, view, selectedRef) {
    const headPath = git(root, ["rev-parse", "--path-format=absolute", "--git-path", "HEAD"]).stdout.trim();
    const symbolicHead = git(root, ["symbolic-ref", "-q", "HEAD"], { allowFailure: true, encoding: null });
    const selectedInventory = readExactRepositoryEntries(root, view, selectedRef);
    const packageLock = selectedInventory.find((entry) => entry.path === "package-lock.json");
    assert(packageLock?.mode === "100644", "selected dependency boundary lacks regular package-lock.json authority", "BI_SELECTED_VIEW_RED");
    return {
        head: resolveCommit(root, "HEAD"),
        headRaw: await readFile(headPath),
        symbolicHead: { status: symbolicHead.status, stdout: symbolicHead.stdout, stderr: symbolicHead.stderr },
        selectedRef: resolveCommit(root, selectedRef),
        selectedInventory,
        refs: canonicalReleaseRefs(root),
        status: git(root, ["status", "--porcelain=v2", "-z", "--untracked-files=all"], { encoding: null }).stdout,
        gitPrivate: await gitPrivateReleaseSnapshot(root),
        nodeModules: await nodeModulesBoundarySnapshot(root, packageLock.oid),
    };
}

function sameBuffer(left, right) {
    return Buffer.isBuffer(left) && Buffer.isBuffer(right) && left.equals(right);
}

function repositoryPurityDifferences(left, right) {
    const differences = [];
    if (left.head !== right.head) differences.push("HEAD");
    if (!sameBuffer(left.headRaw, right.headRaw)) differences.push("HEAD_RAW");
    if (left.symbolicHead.status !== right.symbolicHead.status
        || !sameBuffer(left.symbolicHead.stdout, right.symbolicHead.stdout)
        || !sameBuffer(left.symbolicHead.stderr, right.symbolicHead.stderr)) differences.push("SYMBOLIC_HEAD");
    if (left.selectedRef !== right.selectedRef) differences.push("SELECTED_REF");
    if (!same(left.selectedInventory, right.selectedInventory)) differences.push("SELECTED_INVENTORY");
    if (!same(left.refs, right.refs)) differences.push("REFS");
    if (!sameBuffer(left.status, right.status)) differences.push("STATUS");
    if (!same(left.gitPrivate, right.gitPrivate)) differences.push("GIT_PRIVATE");
    if (!same(left.nodeModules, right.nodeModules)) differences.push("NODE_MODULES");
    return differences;
}

function nodeModulesBoundaryDifferences(left, right) {
    const differences = [];
    if (left.realRoot !== right.realRoot) differences.push("ROOT:changed");
    if (left.lockOid !== right.lockOid) differences.push("LOCK:changed");
    const before = new Map(left.rows.map((row) => [row.path, row]));
    const after = new Map(right.rows.map((row) => [row.path, row]));
    const paths = [...new Set([...before.keys(), ...after.keys()])].sort(comparePaths);
    for (const path of paths) {
        const prior = before.get(path);
        const current = after.get(path);
        if (!prior) differences.push(`${path}:added`);
        else if (!current) differences.push(`${path}:removed`);
        else {
            const fields = ["type", "mode", "dev", "ino", "size", "mtimeNs", "ctimeNs", "linkTarget"]
                .filter((field) => prior[field] !== current[field]);
            if (fields.length > 0) differences.push(`${path}:${fields.join("+")}`);
        }
        if (differences.length === 12) {
            differences.push("...:truncated");
            break;
        }
    }
    return differences;
}

function sameRepositoryPurity(left, right) {
    return repositoryPurityDifferences(left, right).length === 0;
}

function recursivelySortJson(value) {
    if (Array.isArray(value)) return value.map(recursivelySortJson);
    if (value === null || typeof value !== "object") return value;
    return Object.fromEntries(Object.keys(value).sort(comparePaths).map((key) => [key, recursivelySortJson(value[key])]));
}

export function renderP002WithdrawalProjection({ receipt, receiptBytes, stage0Index }) {
    assert(receipt?.waveId === "BI.W-P002" && receipt.status === "DEAD" && receipt.projectionMode === "ACTIVATE",
        "P002 withdrawal projection requires its exact DEAD activation receipt", "BI_RELEASE_PROJECTION_RED");
    assert(Buffer.isBuffer(receiptBytes) && receiptBytes.length > 0, "P002 withdrawal projection requires raw receipt bytes", "BI_RELEASE_PROJECTION_RED");
    assert(exactObjectKeys(stage0Index, ["algorithm", "sha256", "entryCount", "excludes"])
        && stage0Index.algorithm === "sha256(canonical-git-stage0-index-v1)"
        && SHA256.test(stage0Index.sha256 ?? "")
        && Number.isInteger(stage0Index.entryCount) && stage0Index.entryCount > 0
        && same(stage0Index.excludes, ADJUNCT_PROJECTIONS),
    "P002 withdrawal projection requires the exact post-receipt A/F-excluding stage-0 index", "BI_RELEASE_PROJECTION_RED");
    const receiptSha256 = sha256(receiptBytes);
    const attestation = {
        schemaVersion: "1.0.0",
        authority: RELEASE_PROJECTION_AUTHORITY,
        waveId: "BI.W-P002",
        status: "DEAD",
        projectionStatus: "WITHDRAWN",
        releaseEligible: false,
        formationDigest: receipt.formationDigest,
        sourceBase: receipt.sourceBase,
        integrationParent: receipt.integrationParent,
        receipt: { path: receipt.receiptPath, sha256: receiptSha256 },
        stage0Index,
        withdrawal: {
            scope: "PERFECTED_BI_FORMATION",
            permanent: true,
            laterWaveIntegration: "FORBIDDEN",
            tag: "FORBIDDEN",
            publish: "FORBIDDEN",
        },
    };
    const attestationBytes = Buffer.from(`${JSON.stringify(recursivelySortJson(attestation), null, 2)}\n`);
    const attestationSha256 = sha256(attestationBytes);
    const finalBytes = Buffer.from([
        "# Perfected BI release projection",
        "",
        "- Wave: `BI.W-P002`",
        "- Status: `DEAD`",
        "- Projection: `WITHDRAWN`",
        "- Release eligible: `false`",
        `- Formation SHA-256: \`${receipt.formationDigest}\``,
        `- Source base: \`${receipt.sourceBase}\``,
        `- Integration parent: \`${receipt.integrationParent}\``,
        `- Receipt SHA-256: \`${receiptSha256}\``,
        `- Attestation SHA-256: \`${attestationSha256}\``,
        "",
        "The product owner permanently withdrew the perfected-BI formation. Every later declared wave's integration, tag, publish, and release are forbidden on this lineage.",
        "",
    ].join("\n"));
    return {
        attestation,
        attestationBytes,
        attestationSha256,
        finalBytes,
        finalSha256: sha256(finalBytes),
    };
}

export function validateP002WithdrawalProjection({ root, wave, receipt, receiptBytes, view, ref, profile, requireTerminal }) {
    assert(wave.id === "BI.W-P002" && wave.projectionMode === "ACTIVATE",
        "fixed withdrawal projection is restricted to P002 DEAD", "BI_RELEASE_PROJECTION_RED");
    assert(receipt?.status === "DEAD" && receipt.waveId === wave.id && receipt.receiptPath === wave.receiptPath,
        "P002 withdrawal receipt identity/status is invalid", "BI_RELEASE_PROJECTION_RED");
    assert(receipt.formationDigest === FORMATION_DIGEST && receipt.sourceBase === SOURCE_BASE && SHA1.test(receipt.integrationParent ?? ""),
        "P002 withdrawal receipt formation/source/parent binding is invalid", "BI_RELEASE_PROJECTION_RED");
    const selectedRef = resolveCommit(root, ref);
    if (view === "index") {
        assert(receipt.integrationParent === selectedRef,
            "P002 staged withdrawal receipt does not bind its selected parent", "BI_RELEASE_PROJECTION_RED");
    } else {
        assert(same(commitParents(root, selectedRef), [receipt.integrationParent]),
            "P002 committed withdrawal receipt does not bind its containing commit parent", "BI_RELEASE_PROJECTION_RED");
    }
    assert(Array.isArray(receipt.subjectOutcomes) && receipt.subjectOutcomes.length === wave.subjects.length
        && receipt.subjectOutcomes.every((outcome) => outcome.disposition === "WITHDRAWN" && same(outcome.preimage, outcome.postimage)),
    "P002 withdrawal receipt did not preserve every product subject", "BI_RELEASE_PROJECTION_RED");
    assert(receipt.evidence?.entries?.some((entry) => entry.kind === "owner-withdrawal-authority" && entry.status === "RED"),
        "P002 withdrawal receipt lacks RED owner-withdrawal authority", "BI_RELEASE_PROJECTION_RED");
    assert(evidenceBytes(root, RELEASE_PROJECTION_MODULE, view, ref) === null,
        "P002 DEAD cannot install the withdrawn release projection module", "BI_RELEASE_PROJECTION_RED");
    const selectedEntries = new Map(readExactRepositoryEntries(root, view, ref).map((entry) => [entry.path, entry]));
    assert(selectedEntries.get(ADJUNCT_PROJECTIONS[0])?.mode === "100644"
        && selectedEntries.get(ADJUNCT_PROJECTIONS[1])?.mode === "100644",
    "P002 DEAD withdrawal projections must be regular nonexecutable Git blobs", "BI_RELEASE_PROJECTION_RED");
    const stage0Index = selectedReleaseStage0(root, view, ref);
    const rendered = renderP002WithdrawalProjection({ receipt, receiptBytes, stage0Index });
    const actualAttestation = evidenceBytes(root, ADJUNCT_PROJECTIONS[0], view, ref);
    const actualFinal = evidenceBytes(root, ADJUNCT_PROJECTIONS[1], view, ref);
    assert(actualAttestation?.equals(rendered.attestationBytes),
        "P002 DEAD release attestation differs from the fixed withdrawal projection", "BI_RELEASE_PROJECTION_RED");
    assert(actualFinal?.equals(rendered.finalBytes),
        "P002 DEAD FINAL differs from the fixed withdrawal projection", "BI_RELEASE_PROJECTION_RED");
    const terminalRequired = requireTerminal || profile === "release";
    return {
        status: "WITHDRAWN",
        exitCode: 1,
        errors: [],
        evidence: {
            schemaVersion: "1.0.0",
            authority: RELEASE_PROJECTION_AUTHORITY,
            waveId: wave.id,
            selectedView: view,
            selectedRef,
            profile: terminalRequired ? "release" : profile,
            requireTerminal: terminalRequired,
            projectionStatus: "WITHDRAWN",
            releaseEligible: false,
            receipt: rendered.attestation.receipt,
            stage0Index,
            attestationSha256: rendered.attestationSha256,
            finalSha256: rendered.finalSha256,
            ownerArgv: releaseOwnerArgv(wave.id, profile, terminalRequired),
        },
    };
}

function canonicalBlockerIdentity(blocker) {
    return `${blocker.code}\0${blocker.ownerWave}\0${blocker.subject}`;
}

export function validateReleaseProjectionResult({ result, wave, view, ref, profile, requireTerminal, facts }) {
    assert(exactObjectKeys(result, ["status", "exitCode", "errors", "evidence"]),
        `${wave.id}: release projection result must contain exactly status/exitCode/errors/evidence`, "BI_RELEASE_PROJECTION_RED");
    assert(result.status === "PASS" || result.status === "RED", `${wave.id}: release projection status is invalid`, "BI_RELEASE_PROJECTION_RED");
    assert(result.exitCode === (result.status === "PASS" ? 0 : 1),
        `${wave.id}: release projection exitCode contradicts status`, "BI_RELEASE_PROJECTION_RED");
    assert(Array.isArray(result.errors)
        && result.errors.every((error) => typeof error === "string" && error.length > 0 && !error.includes("\n"))
        && same(result.errors, [...new Set(result.errors)].sort(comparePaths)),
    `${wave.id}: release projection errors must be a canonical unique sorted string array`, "BI_RELEASE_PROJECTION_RED");
    assert((result.status === "PASS") === (result.errors.length === 0),
        `${wave.id}: release projection PASS/RED does not agree with its errors`, "BI_RELEASE_PROJECTION_RED");

    const evidence = result.evidence;
    assert(exactObjectKeys(evidence, RELEASE_PROJECTION_EVIDENCE_KEYS),
        `${wave.id}: release projection evidence has missing or extra fields`, "BI_RELEASE_PROJECTION_RED");
    assert(evidence.schemaVersion === "1.0.0" && evidence.authority === RELEASE_PROJECTION_AUTHORITY,
        `${wave.id}: release projection evidence authority is invalid`, "BI_RELEASE_PROJECTION_RED");
    assert(evidence.waveId === wave.id, `${wave.id}: release projection evidence selected the wrong wave`, "BI_RELEASE_PROJECTION_RED");
    assert(evidence.selectedView === view, `${wave.id}: release projection evidence selected the wrong view`, "BI_RELEASE_PROJECTION_RED");
    assert(evidence.selectedRef === ref && SHA1.test(evidence.selectedRef ?? ""),
        `${wave.id}: release projection evidence selected the wrong ref`, "BI_RELEASE_PROJECTION_RED");
    assert(evidence.profile === profile && RELEASE_PROFILES.has(evidence.profile),
        `${wave.id}: release projection evidence selected the wrong profile`, "BI_RELEASE_PROJECTION_RED");
    assert(evidence.requireTerminal === requireTerminal, `${wave.id}: release projection evidence changed requireTerminal`, "BI_RELEASE_PROJECTION_RED");
    assert(evidence.checkMode === "EXACT_BYTE_PARITY", `${wave.id}: release projection did not run exact byte parity`, "BI_RELEASE_PROJECTION_RED");
    assert(evidence.projectionStatus === "NONTERMINAL_PROJECTION" || evidence.projectionStatus === "TERMINAL_PROJECTION",
        `${wave.id}: release projection status marker is invalid`, "BI_RELEASE_PROJECTION_RED");
    assert(typeof evidence.releaseEligible === "boolean", `${wave.id}: release eligibility is not boolean`, "BI_RELEASE_PROJECTION_RED");
    assert(exactObjectKeys(evidence.receipt, ["path", "sha256"])
        && evidence.receipt.path === facts.receipt.path
        && evidence.receipt.sha256 === facts.receipt.sha256,
    `${wave.id}: release projection receipt binding is stale`, "BI_RELEASE_PROJECTION_RED");
    assert(exactObjectKeys(evidence.stage0Index, ["algorithm", "sha256", "entryCount", "excludes"])
        && same(evidence.stage0Index, facts.stage0Index),
    `${wave.id}: release projection stage-0 recomputation is stale`, "BI_RELEASE_PROJECTION_RED");
    assert(evidence.attestationSha256 === facts.attestationSha256,
        `${wave.id}: release projection attestation digest is stale`, "BI_RELEASE_PROJECTION_RED");
    assert(evidence.finalSha256 === facts.finalSha256,
        `${wave.id}: release projection FINAL digest is stale`, "BI_RELEASE_PROJECTION_RED");
    assert(Array.isArray(evidence.blockers), `${wave.id}: release projection blockers are not an array`, "BI_RELEASE_PROJECTION_RED");
    for (const blocker of evidence.blockers) {
        assert(exactObjectKeys(blocker, ["code", "ownerWave", "subject"])
            && typeof blocker.code === "string" && /^[A-Z0-9][A-Z0-9._-]*$/.test(blocker.code)
            && WAVE_ID.test(blocker.ownerWave ?? "")
            && typeof blocker.subject === "string" && /^[A-Za-z0-9][A-Za-z0-9._/@:+-]*$/.test(blocker.subject),
        `${wave.id}: release projection contains a malformed blocker`, "BI_RELEASE_PROJECTION_RED");
    }
    const blockerIdentities = evidence.blockers.map(canonicalBlockerIdentity);
    assert(same(blockerIdentities, [...new Set(blockerIdentities)].sort(comparePaths)),
        `${wave.id}: release projection blockers are duplicated or noncanonical`, "BI_RELEASE_PROJECTION_RED");
    assert(Number.isInteger(evidence.blockerCount) && evidence.blockerCount === evidence.blockers.length,
        `${wave.id}: release projection blockerCount is stale`, "BI_RELEASE_PROJECTION_RED");
    assert(SHA256.test(evidence.blockerDigest ?? "") && evidence.blockerDigest === sha256(canonicalJson(evidence.blockers)),
        `${wave.id}: release projection blockerDigest is stale`, "BI_RELEASE_PROJECTION_RED");
    assert(same(evidence.ownerArgv, releaseOwnerArgv(wave.id, profile, requireTerminal)),
        `${wave.id}: release projection owner argv is not canonical`, "BI_RELEASE_PROJECTION_RED");

    if (evidence.projectionStatus === "TERMINAL_PROJECTION") {
        assert(evidence.releaseEligible === true && evidence.blockers.length === 0,
            `${wave.id}: terminal projection must be release-eligible and blocker-free`, "BI_RELEASE_PROJECTION_RED");
    } else {
        assert(evidence.releaseEligible === false && evidence.blockers.length > 0,
            `${wave.id}: nonterminal projection must be ineligible with exact blockers`, "BI_RELEASE_PROJECTION_RED");
    }
    if (requireTerminal && result.status === "PASS") {
        assert(evidence.projectionStatus === "TERMINAL_PROJECTION" && evidence.releaseEligible === true,
            `${wave.id}: requireTerminal accepted a nonterminal projection`, "BI_RELEASE_PROJECTION_RED");
    }

    const canonicalEvidence = Object.fromEntries(RELEASE_PROJECTION_EVIDENCE_KEYS.map((key) => [key, evidence[key]]));
    return {
        status: result.status,
        exitCode: result.exitCode,
        errors: [...result.errors],
        evidence: canonicalEvidence,
    };
}

function preModuleReleaseProjection({ root, wave, view, ref, profile, requireTerminal }) {
    assert(wave.projectionMode === "NONE" && wave.id === "BI.W-P001",
        `${wave.id}: only P001 may use pre-module projection mode`, "BI_RELEASE_PROJECTION_RED");
    const forbidden = [RELEASE_PROJECTION_MODULE, ...ADJUNCT_PROJECTIONS]
        .filter((path) => evidenceBytes(root, path, view, ref) !== null);
    assert(forbidden.length === 0,
        `${wave.id}: pre-module selected view must not contain release-projection authority or A/F artifacts (${forbidden.join(", ")})`,
        "BI_RELEASE_PROJECTION_RED");
    return {
        status: "PRE_MODULE",
        exitCode: null,
        errors: [],
        evidence: {
            schemaVersion: "1.0.0",
            authority: RELEASE_PROJECTION_AUTHORITY,
            waveId: wave.id,
            selectedView: view,
            selectedRef: ref,
            profile,
            requireTerminal,
            projectionMode: "NONE",
            owner: "BI.W-P002",
            modulePath: RELEASE_PROJECTION_MODULE,
            ownerArgv: releaseOwnerArgv(wave.id, profile, requireTerminal),
        },
    };
}

export async function executeReleaseProjectionAdapter({ root, wave, view, ref, profile = "local", requireTerminal = false }) {
    assert(wave && WAVE_ID.test(wave.id ?? ""), "release projection wave authority is malformed", "BI_RELEASE_PROJECTION_RED");
    assert(view === "index" || view === "commit", `${wave.id}: release projection selected view is invalid`, "BI_RELEASE_PROJECTION_RED");
    assert(RELEASE_PROFILES.has(profile), `${wave.id}: release projection profile is invalid`, "BI_RELEASE_PROJECTION_RED");
    const selectedRef = resolveCommit(root, ref);
    const terminalRequired = requireTerminal || profile === "release";
    const selectedProfile = terminalRequired ? "release" : profile;
    if (wave.projectionMode === "NONE") {
        return preModuleReleaseProjection({ root, wave, view, ref: selectedRef, profile: selectedProfile, requireTerminal: terminalRequired });
    }
    assert(wave.projectionMode === "ACTIVATE" || wave.projectionMode === "REFRESH",
        `${wave.id}: release projection mode is invalid`, "BI_RELEASE_PROJECTION_RED");
    const selectedEntries = new Map(readExactRepositoryEntries(root, view, selectedRef).map((entry) => [entry.path, entry]));
    assert(selectedEntries.get(RELEASE_PROJECTION_MODULE)?.mode === "100644",
        `${wave.id}: selected release projection module must be one regular nonexecutable Git blob`, "BI_RELEASE_PROJECTION_RED");
    const facts = selectedReleaseFacts({ root, wave, view, ref: selectedRef });
    const purity = await repositoryPuritySnapshot(root, view, selectedRef);
    const materialized = await materializeSelectedView(root, view, selectedRef);
    try {
        assert(same(materialized.entries, purity.selectedInventory),
            `${wave.id}: selected repository inventory changed before release projection execution`, "BI_RELEASE_PROJECTION_RED");
        const materializedReal = await realpath(materialized.directory);
        const modulePath = resolve(materialized.directory, RELEASE_PROJECTION_MODULE);
        try {
            await access(modulePath);
        } catch {
            throw new CursorError(`${wave.id}: selected release projection module is absent`, "BI_RELEASE_PROJECTION_RED");
        }
        const isolatedRuntime = resolve(materialized.directory, ".bi-release-projection-runtime");
        const isolatedHome = resolve(isolatedRuntime, "home");
        const isolatedTmp = resolve(isolatedRuntime, "tmp");
        const isolatedCache = resolve(isolatedRuntime, "cache");
        await Promise.all([
            mkdir(isolatedHome, { recursive: true }),
            mkdir(isolatedTmp, { recursive: true }),
            mkdir(isolatedCache, { recursive: true }),
        ]);
        const authorityLogical = resolve(root);
        const authorityReal = await realpath(authorityLogical);
        const tempLogical = tmpdir();
        const tempReal = await realpath(tempLogical);
        const materializedNodeModules = resolve(materialized.directory, "node_modules");
        const materializedNodeModulesReal = await realpath(materializedNodeModules);
        const isolatedRuntimeReal = await realpath(isolatedRuntime);
        const materializedBaseline = await validateSelectedMaterialization(materialized.directory, materialized.entries, {
            initialFingerprints: materialized.initialFingerprints,
            runtimeRoot: ".bi-release-projection-runtime",
            nodeModulesMirror: materialized.nodeModulesMirror,
        });
        const request = Object.freeze({
            root: await realpath(root),
            view,
            ref: selectedRef,
            waveId: wave.id,
            profile: selectedProfile,
            requireTerminal: terminalRequired,
        });
        const execution = spawnSync(process.execPath, [
            "--input-type=module",
            "--eval",
            RELEASE_PROJECTION_RUNNER,
            pathToFileURL(modulePath).href,
            JSON.stringify(request),
        ], {
            cwd: materialized.directory,
            encoding: "utf8",
            env: {
                PATH: process.env.PATH ?? "",
                HOME: isolatedHome,
                TMPDIR: isolatedTmp,
                XDG_CACHE_HOME: isolatedCache,
                CI: "1",
                NO_COLOR: "1",
                FORCE_COLOR: "0",
                LC_ALL: "C",
                LANG: "C",
                GIT_CONFIG_NOSYSTEM: "1",
                GIT_CONFIG_GLOBAL: "/dev/null",
                GIT_CONFIG_COUNT: "0",
                GIT_NO_REPLACE_OBJECTS: "1",
            },
            timeout: 120_000,
            maxBuffer: 64 * 1024 * 1024,
            stdio: ["ignore", "pipe", "pipe"],
        });
        let recomputedFacts;
        let recomputedPurity;
        try {
            await validateSelectedMaterialization(materialized.directory, materialized.entries, {
                initialFingerprints: materialized.initialFingerprints,
                runtimeRoot: ".bi-release-projection-runtime",
                nodeModulesMirror: materialized.nodeModulesMirror,
                baseline: materializedBaseline,
            });
            recomputedFacts = selectedReleaseFacts({ root, wave, view, ref: selectedRef });
            recomputedPurity = await repositoryPuritySnapshot(root, view, selectedRef);
        } catch (error) {
            const diagnostic = caughtErrorDiagnostic(error, executionDiagnosticPathReplacements({
                authority: [authorityLogical, authorityReal],
                materialized: [materialized.directory, materializedReal],
                runtime: [isolatedRuntime, isolatedRuntimeReal],
                temp: [tempLogical, tempReal],
                selectedNodeModules: [materializedNodeModules, materializedNodeModulesReal],
                dependency: [materialized.nodeModulesMirror.sourceStore, purity.nodeModules.realRoot],
            }));
            throw new CursorError(
                `${wave.id}: selected release projection mutated selected materialization or repository state and prevented exact post-execution recomputation (cause: ${diagnostic.summary})`,
                "BI_RELEASE_PROJECTION_RED",
                diagnostic.cause,
            );
        }
        assert(same(recomputedFacts, facts),
            `${wave.id}: selected release projection mutated its selected repository facts during verification`, "BI_RELEASE_PROJECTION_RED");
        if (!sameRepositoryPurity(recomputedPurity, purity)) {
            const differences = repositoryPurityDifferences(purity, recomputedPurity);
            const dependencyDifferences = differences.includes("NODE_MODULES")
                ? nodeModulesBoundaryDifferences(purity.nodeModules, recomputedPurity.nodeModules)
                : [];
            await rehashChangedDependencyFiles(purity.nodeModules, recomputedPurity.nodeModules);
            throw new CursorError(
                `${wave.id}: selected release projection mutated repository refs, dependency boundary, worktree/index state, or Git-private tranche state during verification (${differences.join(",")}${dependencyDifferences.length > 0 ? `; ${dependencyDifferences.join(",")}` : ""})`,
                "BI_RELEASE_PROJECTION_RED",
            );
        }
        const stabilize = (value) => String(value ?? "")
            .replaceAll(materializedReal, "<SELECTED_VIEW>")
            .replaceAll(materialized.directory, "<SELECTED_VIEW>")
            .replaceAll(request.root, "<AUTHORITY_ROOT>")
            .replaceAll(resolve(root), "<AUTHORITY_ROOT>")
            .replaceAll(isolatedRuntime, "<ISOLATED_RUNTIME>")
            .trim();
        if (execution.error) {
            throw new CursorError(
                `${wave.id}: selected release projection runner failed (${String(execution.error.code ?? execution.error.name ?? "ERROR")}: ${stabilize(execution.error.message)})`,
                "BI_RELEASE_PROJECTION_RED",
            );
        }
        if (execution.status !== 0) {
            throw new CursorError(
                `${wave.id}: selected release projection runner exited ${String(execution.status)} (${stabilize(execution.stderr) || "no canonical diagnostic"})`,
                "BI_RELEASE_PROJECTION_RED",
            );
        }
        assert(execution.stderr === "", `${wave.id}: selected release projection runner emitted stderr`, "BI_RELEASE_PROJECTION_RED");
        let result;
        try {
            result = JSON.parse(execution.stdout);
        } catch (error) {
            throw new CursorError(
                `${wave.id}: selected release projection runner emitted malformed or extra stdout (${String(error.name ?? "ERROR")})`,
                "BI_RELEASE_PROJECTION_RED",
            );
        }
        assert(execution.stdout === JSON.stringify(result),
            `${wave.id}: selected release projection runner stdout is not one exact JSON result`, "BI_RELEASE_PROJECTION_RED");
        return validateReleaseProjectionResult({
            result,
            wave,
            view,
            ref: selectedRef,
            profile: selectedProfile,
            requireTerminal: terminalRequired,
            facts,
        });
    } finally {
        await materialized.cleanup();
    }
}

async function executeTerminalReleaseProjection({ root, wave, status, receiptBytes, view, ref, profile, requireTerminal }) {
    if (wave.id === "BI.W-P002" && status === "DEAD") {
        return validateP002WithdrawalProjection({
            root,
            wave,
            receipt: parseJson(receiptBytes, `${wave.id} withdrawal receipt`),
            receiptBytes,
            view,
            ref,
            profile,
            requireTerminal,
        });
    }
    return executeReleaseProjectionAdapter({ root, wave, view, ref, profile, requireTerminal });
}

export function releaseProjectionCursorErrors(releaseProjection, cursor) {
    const terminalClaim = releaseProjection?.evidence?.projectionStatus === "TERMINAL_PROJECTION"
        || releaseProjection?.evidence?.releaseEligible === true;
    if (!terminalClaim) return [];
    const rows = Object.values(cursor?.waves ?? {});
    const allDone = rows.length > 0
        && cursor.withdrawn === false
        && rows.every((row) => row.status === "DONE")
        && cursor.terminalCount === rows.length;
    return allDone ? [] : ["terminal release projection contradicts the selected recovered cursor state"];
}

function stagedProjectionCursor(parentCursor, waveId, status) {
    const cursor = structuredClone(parentCursor);
    const row = cursor.waves[waveId];
    assert(row?.status === "PLANNED", `${waveId}: staged projection cursor parent is not PLANNED`, "BI_RELEASE_PROJECTION_RED");
    row.status = status;
    row.commit = null;
    row.evidenceDigest = null;
    row.terminalRationale = "STAGED_CANDIDATE";
    cursor.terminalCount += 1;
    if (waveId === "BI.W-P002" && status === "DEAD") cursor.withdrawn = true;
    return cursor;
}

const ORDINARY_TEST_SUBJECT = /^tests\/.+\.(?:test|spec)\.[cm]?[jt]sx?$/;

export function ordinaryWaveTestPaths(wave) {
    assert(wave && WAVE_ID.test(wave.id ?? "") && Array.isArray(wave.subjects), "semantic test authority is malformed", "BI_WAVE_TEST_RED");
    const paths = [];
    for (const subject of wave.subjects) {
        if (subject.action === "delete") continue;
        const path = subject.action === "rename" ? subject.targetPath : subject.path;
        if (ORDINARY_TEST_SUBJECT.test(path ?? "")) paths.push(path);
    }
    const canonical = [...new Set(paths)].sort(comparePaths);
    assert(canonical.length === paths.length, `${wave.id}: ordinary semantic test subjects are duplicated`, "BI_WAVE_TEST_RED");
    return canonical;
}

function transitiveWaveDependency(waves, waveId, ancestorId) {
    const byId = new Map(waves.map((wave) => [wave.id, wave]));
    const pending = [...(byId.get(waveId)?.dependsOn ?? [])];
    const seen = new Set();
    while (pending.length > 0) {
        const candidate = pending.pop();
        if (candidate === ancestorId) return true;
        if (seen.has(candidate)) continue;
        seen.add(candidate);
        pending.push(...(byId.get(candidate)?.dependsOn ?? []));
    }
    return false;
}

function zeroTestDiscoveryRequirement({ wave, cursor, formation }) {
    assert(wave.id !== "BI.W-P001", "P001 semantic test authority must enroll its two repair-manifest tests", "BI_WAVE_TEST_RED");
    const p014 = cursor?.waves?.["BI.W-P014"];
    assert(p014?.status === "DONE",
        `${wave.id}: zero ordinary test subjects are forbidden before BI.W-P014 installs full-suite discovery`, "BI_WAVE_TEST_RED");
    assert(Array.isArray(formation?.waves?.waves)
        && transitiveWaveDependency(formation.waves.waves, wave.id, "BI.W-P014"),
    `${wave.id}: zero ordinary test subjects require a transitive BI.W-P014 dependency`, "BI_WAVE_TEST_RED");
    return {
        status: "RED",
        semanticPass: false,
        mode: "POST_P014_DISCOVERY_REQUIRED",
        owner: "BI.W-P014",
        waveId: wave.id,
        errorCode: "BI_POST_STRUCTURE_DISCOVERY_REQUIRED",
        requirement: "BI.W-P014 full-suite discovery must execute this wave's projected applicable matrix before semantic PASS.",
    };
}

export function semanticRequirementErrors(semanticTest) {
    if (semanticTest?.mode !== "POST_P014_DISCOVERY_REQUIRED") return [];
    assert(semanticTest.errorCode === "BI_POST_STRUCTURE_DISCOVERY_REQUIRED", "post-structure discovery marker is malformed", "BI_WAVE_TEST_RED");
    return [semanticTest.errorCode];
}

function appendSemanticRequirementError(errors, semanticTest) {
    errors.push(...semanticRequirementErrors(semanticTest));
}

function canonicalCounter(report, key, waveId) {
    const value = report?.[key];
    assert(Number.isInteger(value) && value >= 0, `${waveId}: Vitest ${key} must be a nonnegative integer`, "BI_WAVE_TEST_RED");
    return value;
}

export function validateWaveSemanticReport({ waveId, testPaths, exitCode, report, requirePass = true }) {
    assert(WAVE_ID.test(waveId ?? ""), `${String(waveId)}: invalid semantic test wave identity`, "BI_WAVE_TEST_RED");
    assert(Array.isArray(testPaths) && testPaths.length > 0
        && testPaths.every((path) => ORDINARY_TEST_SUBJECT.test(path))
        && same(testPaths, [...new Set(testPaths)].sort(comparePaths)),
    `${waveId}: semantic test argv must be a nonempty canonical set of ordinary enrolled tests`, "BI_WAVE_TEST_RED");
    assert(Number.isInteger(exitCode), `${waveId}: Vitest did not return a numeric exit code`, "BI_WAVE_TEST_RED");
    assert(report && typeof report === "object" && !Array.isArray(report), `${waveId}: Vitest JSON report is not an object`, "BI_WAVE_TEST_RED");
    assert(typeof report.success === "boolean", `${waveId}: Vitest JSON report lacks a boolean success field`, "BI_WAVE_TEST_RED");
    assert(Array.isArray(report.testResults), `${waveId}: Vitest JSON report lacks testResults`, "BI_WAVE_TEST_RED");

    const counters = {
        totalTests: canonicalCounter(report, "numTotalTests", waveId),
        passedTests: canonicalCounter(report, "numPassedTests", waveId),
        failedTests: canonicalCounter(report, "numFailedTests", waveId),
        pendingTests: canonicalCounter(report, "numPendingTests", waveId),
        todoTests: canonicalCounter(report, "numTodoTests", waveId),
    };
    const seenFiles = new Set();
    const observed = { passed: 0, failed: 0, pending: 0, todo: 0 };
    const files = report.testResults.map((file) => {
        const normalizedName = String(file?.name ?? "").replaceAll("\\", "/");
        const matches = testPaths.filter((candidate) => normalizedName === candidate || normalizedName.endsWith(`/${candidate}`));
        assert(matches.length === 1, `${waveId}: Vitest reported an unenrolled or ambiguous file: ${normalizedName}`, "BI_WAVE_TEST_RED");
        const [path] = matches;
        assert(!seenFiles.has(path), `${waveId}: Vitest reported enrolled file more than once: ${path}`, "BI_WAVE_TEST_RED");
        seenFiles.add(path);
        assert(file.status === "passed" || file.status === "failed", `${waveId}: ${path} has invalid file status ${String(file.status)}`, "BI_WAVE_TEST_RED");
        assert(Array.isArray(file.assertionResults), `${waveId}: ${path} lacks assertionResults`, "BI_WAVE_TEST_RED");
        const assertions = file.assertionResults.map((assertion) => {
            const id = assertion?.fullName;
            const status = assertion?.status;
            assert(typeof id === "string" && id.length > 0, `${waveId}: ${path} contains an assertion without a fullName`, "BI_WAVE_TEST_RED");
            assert(["passed", "failed", "pending", "skipped", "todo"].includes(status),
                `${waveId}: ${path} assertion ${id} has invalid status ${String(status)}`, "BI_WAVE_TEST_RED");
            if (status === "passed") observed.passed += 1;
            else if (status === "failed") observed.failed += 1;
            else if (status === "todo") observed.todo += 1;
            else observed.pending += 1;
            return { id, status };
        }).sort((left, right) => comparePaths(left.id, right.id));
        assert((assertions.some((assertion) => assertion.status === "failed")) === (file.status === "failed"),
            `${waveId}: ${path} file status contradicts its assertion results`, "BI_WAVE_TEST_RED");
        return { path, status: file.status, assertions };
    }).sort((left, right) => comparePaths(left.path, right.path));

    assert(same(files.map((file) => file.path), testPaths),
        `${waveId}: Vitest report must cover every enrolled file exactly once and no other file`, "BI_WAVE_TEST_RED");
    assert(observed.passed === counters.passedTests
        && observed.failed === counters.failedTests
        && observed.pending === counters.pendingTests
        && observed.todo === counters.todoTests
        && counters.totalTests === observed.passed + observed.failed + observed.pending + observed.todo,
    `${waveId}: Vitest aggregate counters contradict its assertion results`, "BI_WAVE_TEST_RED");
    assert(report.success === (counters.failedTests === 0 && files.length > 0),
        `${waveId}: Vitest success contradicts its file/assertion results`, "BI_WAVE_TEST_RED");

    const canonical = { success: report.success, ...counters, files };
    if (requirePass) {
        assert(exitCode === 0 && canonical.success === true,
            `${waveId}: semantic tests are RED in the exact selected view (exit ${exitCode})`, "BI_WAVE_TEST_RED");
        assert(canonical.totalTests > 0
            && canonical.passedTests === canonical.totalTests
            && canonical.failedTests === 0
            && canonical.pendingTests === 0
            && canonical.todoTests === 0,
        `${waveId}: semantic tests must execute non-skipped assertions with zero failed/pending/todo rows`, "BI_WAVE_TEST_RED");
        assert(canonical.files.every((file) => file.status === "passed"
            && file.assertions.length > 0
            && file.assertions.every((assertion) => assertion.status === "passed")),
        `${waveId}: every enrolled test file must contain executed passing assertions`, "BI_WAVE_TEST_RED");
    }
    return canonical;
}

export async function executeWaveSemanticTests({ root, wave, view, ref, cursor, formation }) {
    const testPaths = ordinaryWaveTestPaths(wave);
    if (testPaths.length === 0) return zeroTestDiscoveryRequirement({ wave, cursor, formation });
    const selectedRef = resolveCommit(root, ref);
    const selectedEntries = new Map(readExactRepositoryEntries(root, view, selectedRef).map((entry) => [entry.path, entry]));
    const regularPaths = wave.id === "BI.W-P001"
        ? [...new Set(wave.subjects.map((subject) => subject.path))].sort(comparePaths)
        : testPaths;
    for (const path of regularPaths) {
        assert(selectedEntries.get(path)?.mode === "100644",
            `${path}: selected semantic authority must be one regular nonexecutable Git blob`, "BI_WAVE_TEST_RED");
    }
    if (wave.id === "BI.W-P001") {
        assert(same(testPaths, ["tests/tranche/cursor.test.ts", "tests/tranche/transaction-envelope.test.ts"]),
            "P001 semantic test authority must be exactly its two enrolled test subjects", "BI_WAVE_TEST_RED");
    }
    if (view === "index") {
        const worktreeErrors = await validateP001WorktreeMatchesIndex(root, wave);
        assert(worktreeErrors.length === 0, worktreeErrors.join("\n"), "BI_INDEX_WORKTREE_RED");
    }
    const materialized = await materializeSelectedView(root, view, selectedRef);
    try {
        const argv = [
            "node_modules/vitest/vitest.mjs",
            "run",
            ...testPaths,
            "--reporter=json",
            "--no-cache",
            "--configLoader",
            "runner",
        ];
        const isolatedRuntime = resolve(materialized.directory, ".bi-wave-test-runtime");
        const isolatedHome = resolve(isolatedRuntime, "home");
        const isolatedTmp = resolve(isolatedRuntime, "tmp");
        const isolatedCache = resolve(isolatedRuntime, "cache");
        await Promise.all([
            mkdir(isolatedHome, { recursive: true }),
            mkdir(isolatedTmp, { recursive: true }),
            mkdir(isolatedCache, { recursive: true }),
        ]);
        const authorityLogical = resolve(root);
        const authorityReal = await realpath(authorityLogical);
        const tempLogical = tmpdir();
        const tempReal = await realpath(tempLogical);
        const materializedReal = await realpath(materialized.directory);
        const materializedNodeModules = resolve(materialized.directory, "node_modules");
        const materializedNodeModulesReal = await realpath(materializedNodeModules);
        const isolatedRuntimeReal = await realpath(isolatedRuntime);
        const isolation = {
            HOME: ".bi-wave-test-runtime/home",
            TMPDIR: ".bi-wave-test-runtime/tmp",
            XDG_CACHE_HOME: ".bi-wave-test-runtime/cache",
        };
        const execute = async ({ overlays = new Map() } = {}) => {
            const materializedBaseline = await validateSelectedMaterialization(materialized.directory, materialized.entries, {
                initialFingerprints: materialized.initialFingerprints,
                overlays,
                runtimeRoot: ".bi-wave-test-runtime",
                nodeModulesMirror: materialized.nodeModulesMirror,
            });
            const purity = await repositoryPuritySnapshot(root, view, selectedRef);
            assert(same(materialized.entries, purity.selectedInventory),
                `${wave.id}: selected repository inventory changed before semantic execution`, "BI_WAVE_TEST_RED");
            const result = spawnSync(process.execPath, argv, {
                cwd: materialized.directory,
                encoding: "utf8",
                env: {
                    PATH: process.env.PATH ?? "",
                    HOME: isolatedHome,
                    TMPDIR: isolatedTmp,
                    XDG_CACHE_HOME: isolatedCache,
                    CI: "1",
                    NO_COLOR: "1",
                    FORCE_COLOR: "0",
                    LC_ALL: "C",
                    LANG: "C",
                    GIT_CONFIG_NOSYSTEM: "1",
                    GIT_CONFIG_GLOBAL: "/dev/null",
                    GIT_CONFIG_COUNT: "0",
                    GIT_NO_REPLACE_OBJECTS: "1",
                    ...(wave.id === "BI.W-P001" ? { BI_TEST_AUTHORITY_REPO: root } : {}),
                },
                timeout: wave.id === "BI.W-P001" ? 1_800_000 : 900_000,
                maxBuffer: 64 * 1024 * 1024,
                stdio: ["ignore", "pipe", "pipe"],
            });
            let recomputedPurity;
            try {
                await validateSelectedMaterialization(materialized.directory, materialized.entries, {
                    initialFingerprints: materialized.initialFingerprints,
                    overlays,
                    runtimeRoot: ".bi-wave-test-runtime",
                    nodeModulesMirror: materialized.nodeModulesMirror,
                    baseline: materializedBaseline,
                });
                recomputedPurity = await repositoryPuritySnapshot(root, view, selectedRef);
            } catch (error) {
                const diagnostic = caughtErrorDiagnostic(error, executionDiagnosticPathReplacements({
                    authority: [authorityLogical, authorityReal],
                    materialized: [materialized.directory, materializedReal],
                    runtime: [isolatedRuntime, isolatedRuntimeReal],
                    temp: [tempLogical, tempReal],
                    selectedNodeModules: [materializedNodeModules, materializedNodeModulesReal],
                    dependency: [materialized.nodeModulesMirror.sourceStore, purity.nodeModules.realRoot],
                }));
                throw new CursorError(
                    `${wave.id}: semantic test mutated selected materialization or authority state and prevented exact recomputation (cause: ${diagnostic.summary})`,
                    "BI_WAVE_TEST_RED",
                    diagnostic.cause,
                );
            }
            if (!sameRepositoryPurity(recomputedPurity, purity)) {
                const differences = repositoryPurityDifferences(purity, recomputedPurity);
                const dependencyDifferences = differences.includes("NODE_MODULES")
                    ? nodeModulesBoundaryDifferences(purity.nodeModules, recomputedPurity.nodeModules)
                    : [];
                await rehashChangedDependencyFiles(purity.nodeModules, recomputedPurity.nodeModules);
                throw new CursorError(
                    `${wave.id}: semantic test mutated repository refs, dependency boundary, selected inventory, worktree/index state, or Git-private tranche state (${differences.join(",")}${dependencyDifferences.length > 0 ? `; ${dependencyDifferences.join(",")}` : ""})`,
                    "BI_WAVE_TEST_RED",
                );
            }
            if (result.error) {
                throw new CursorError(
                    `${wave.id}: bounded Vitest execution failed (${String(result.error.code ?? result.error.name ?? "ERROR")})`,
                    "BI_WAVE_TEST_RED",
                );
            }
            let report;
            try {
                report = JSON.parse(result.stdout);
            } catch (error) {
                throw new CursorError(`${wave.id}: Vitest JSON report is invalid: ${error.message}`, "BI_WAVE_TEST_RED");
            }
            return { exitCode: result.status, report };
        };
        const baselineExecution = await execute();
        const baseline = validateWaveSemanticReport({
            waveId: wave.id,
            testPaths,
            exitCode: baselineExecution.exitCode,
            report: baselineExecution.report,
        });

        if (wave.id !== "BI.W-P001") {
            return {
                argv: ["node", ...argv],
                selectedView: view,
                baseline,
                isolation,
                mutation: null,
                restoration: null,
            };
        }

        const cursorPath = resolve(materialized.directory, "scripts/tranche/cursor.mjs");
        const cursorBytes = await readFile(cursorPath);
        const mutationNeedle = ["else if (row.status !== ", '"PLANNED"', ") errors.push"].join("");
        const cursorSource = cursorBytes.toString("utf8");
        const mutationOccurrences = cursorSource.split(mutationNeedle).length - 1;
        assert(mutationOccurrences === 1,
            `P001 RUNNING-replay mutation expected one functional target, found ${mutationOccurrences}`, "BI_WAVE_TEST_RED");
        const mutatedBytes = Buffer.from(cursorSource.replace(
            mutationNeedle,
            'else if (!["PLANNED", "RUNNING"].includes(row.status)) errors.push',
        ));
        assert(!mutatedBytes.equals(cursorBytes), "P001 RUNNING-replay mutation did not alter the exact selected view", "BI_WAVE_TEST_RED");
        let mutation;
        let restored;
        try {
            await writeFile(cursorPath, mutatedBytes);
            mutation = await execute({
                overlays: new Map([["scripts/tranche/cursor.mjs", { mode: "100644", oid: gitBlobOid(mutatedBytes) }]]),
            });
        } finally {
            await writeFile(cursorPath, cursorBytes);
            await chmod(cursorPath, 0o644);
            const restoredCursor = await worktreeGitObject(materialized.directory, "scripts/tranche/cursor.mjs");
            assert(same(restoredCursor, { mode: "100644", oid: gitBlobOid(cursorBytes) }),
                "P001 mutation restoration did not reproduce exact selected cursor bytes/mode", "BI_WAVE_TEST_RED");
            materialized.initialFingerprints.set("scripts/tranche/cursor.mjs", await filesystemFingerprint(cursorPath));
            restored = await execute();
        }
        const canonicalMutation = validateWaveSemanticReport({
            waveId: wave.id,
            testPaths,
            exitCode: mutation.exitCode,
            report: mutation.report,
            requirePass: false,
        });
        const canonicalRestored = validateWaveSemanticReport({
            waveId: wave.id,
            testPaths,
            exitCode: restored.exitCode,
            report: restored.report,
        });
        assert(mutation.exitCode !== 0 && canonicalMutation.success === false && canonicalMutation.failedTests > 0,
            "P001 RUNNING-replay semantic mutation did not produce nonzero RED", "BI_WAVE_TEST_RED");
        const failedMutationAssertions = canonicalMutation.files
            .flatMap((file) => file.assertions.filter((assertion) => assertion.status === "failed").map((assertion) => assertion.id));
        for (const requiredName of [
            "exactly-once readiness rejects a synthetic RUNNING replay",
            "Git-private crash recovery rejects a recovered RUNNING replay before a second launch",
        ]) {
            assert(failedMutationAssertions.some((id) => id.endsWith(requiredName)),
                `P001 mutation did not bite named assertion: ${requiredName}`, "BI_WAVE_TEST_RED");
        }
        assert(restored.exitCode === 0 && same(canonicalRestored, baseline),
            "P001 semantic tests did not restore to byte-equivalent canonical PASS evidence", "BI_WAVE_TEST_RED");
        return {
            argv: ["node", ...argv],
            selectedView: view,
            baseline,
            isolation,
            mutation: {
                id: "cursor-running-wave-replay",
                status: "RED",
                failedAssertions: failedMutationAssertions.sort(comparePaths),
            },
            restoration: { status: "PASS", matchesBaseline: true },
        };
    } finally {
        await materialized.cleanup();
    }
}

function waveOrdinal(waveId) {
    assert(WAVE_ID.test(waveId), `${waveId}: invalid canonical wave identity`);
    return Number(waveId.slice("BI.W-P".length));
}

function validateWaveTuple({ root, wave, formationDigest, commit = null, parent, view, ref, trailerMessage }) {
    const selectedEntries = new Map(readExactRepositoryEntries(root, view, view === "index" ? ref : commit).map((entry) => [entry.path, entry]));
    const receiptBytes = view === "index"
        ? indexBytes(root, wave.receiptPath, { allowMissing: true })
        : commitBytes(root, commit, wave.receiptPath, { allowMissing: true });
    if (!receiptBytes) return { errors: [`${wave.receiptPath}: terminal receipt is absent from the selected ${view} view`] };
    const verified = verifyWaveReceipt({
        root,
        wave,
        formationDigest,
        sourceBase: SOURCE_BASE,
        integrationParent: parent,
        view,
        ref,
        receiptBytes,
    });
    const errors = [...verified.errors];
    if (selectedEntries.get(wave.receiptPath)?.mode !== "100644") {
        errors.push(`${wave.receiptPath}: terminal receipt must be one regular nonexecutable Git blob`);
    }
    if (wave.id === "BI.W-P001" && verified.receipt?.status === "DONE") {
        for (const subject of wave.subjects) {
            if (selectedEntries.get(subject.path)?.mode !== "100644") {
                errors.push(`${subject.path}: P001 product subject must be one regular nonexecutable Git blob`);
            }
        }
    }
    if (!verified.receipt) return { ...verified, receiptBytes, errors };
    errors.push(...validateEvidenceBindings({ root, wave, receipt: verified.receipt, view, ref }));
    const tuple = requireTrailerTuple(trailerMessage, {
        "BI-Wave": wave.id,
        "BI-Status": verified.receipt.status,
        "BI-Receipt-SHA256": verified.receiptSha256,
        "BI-Formation-SHA256": formationDigest,
    }, { projections: waveOrdinal(wave.id) >= 2 });
    errors.push(...tuple.errors);
    if (waveOrdinal(wave.id) >= 2) {
        for (const [name, path] of [
            ["BI-Attestation-SHA256", ADJUNCT_PROJECTIONS[0]],
            ["BI-FINAL-SHA256", ADJUNCT_PROJECTIONS[1]],
        ]) {
            const bytes = view === "index"
                ? indexBytes(root, path, { allowMissing: true })
                : commitBytes(root, commit, path, { allowMissing: true });
            if (!bytes) errors.push(`${path}: projection artifact is absent`);
            else {
                if (selectedEntries.get(path)?.mode !== "100644") {
                    errors.push(`${path}: projection artifact must be one regular nonexecutable Git blob`);
                }
                if (tuple.trailers.get(name) !== sha256(bytes)) errors.push(`${name}: does not bind raw ${path} bytes`);
            }
        }
    }
    return { ...verified, receiptBytes, tuple, errors };
}

function initialCursor({ root, formation, anchor, atCommit }) {
    const waves = {};
    for (const wave of formation.waves.waves) {
        waves[wave.id] = {
            status: "PLANNED",
            commit: null,
            evidenceDigest: null,
            terminalRationale: null,
            receiptPath: wave.receiptPath,
            projectionMode: wave.projectionMode,
            dependsOn: [...wave.dependsOn],
            integrationRequires: [...wave.integrationRequires],
        };
    }
    return {
        schemaVersion: "1.0.0",
        mode: "TRANCHE_DEVELOPMENT",
        authority: AUTHORITY,
        formationDigest: formation.manifest.contentDigestSha256,
        formationAnchor: anchor,
        sourceBase: SOURCE_BASE,
        atCommit,
        atTree: commitTree(root, atCommit),
        maxLiveAgents: 3,
        withdrawn: false,
        runningWaves: [],
        terminalCount: 0,
        waves,
    };
}

function validateCursorShape(cursor) {
    const errors = [];
    if (cursor?.schemaVersion !== "1.0.0" || cursor?.mode !== "TRANCHE_DEVELOPMENT" || cursor?.authority !== AUTHORITY) errors.push("cursor header/authority is invalid");
    if (!SHA256.test(cursor?.formationDigest ?? "") || !SHA1.test(cursor?.formationAnchor ?? "") || cursor?.sourceBase !== SOURCE_BASE) errors.push("cursor formation/source lineage is invalid");
    if (!SHA1.test(cursor?.atCommit ?? "") || !SHA1.test(cursor?.atTree ?? "")) errors.push("cursor commit/tree locator is invalid");
    if (cursor?.maxLiveAgents !== 3 || typeof cursor?.withdrawn !== "boolean") errors.push("cursor execution policy is invalid");
    if (!Array.isArray(cursor?.runningWaves) || cursor.runningWaves.length > 3 || new Set(cursor.runningWaves).size !== cursor.runningWaves.length) errors.push("cursor running wave set is invalid");
    const ids = Object.keys(cursor?.waves ?? {});
    if (ids.length < 1) errors.push("cursor must contain at least the P000 bootstrap row");
    let terminals = 0;
    for (let index = 0; index < ids.length; index += 1) {
        const id = ids[index];
        const row = cursor.waves[id];
        if (!WAVE_ID.test(id) || !["PLANNED", "RUNNING", "DONE", "DEAD"].includes(row?.status)) errors.push(`${id}: invalid cursor row`);
        if (TERMINAL.has(row?.status)) {
            terminals += 1;
            if (!SHA1.test(row.commit ?? "") || !SHA256.test(row.evidenceDigest ?? "") || typeof row.terminalRationale !== "string" || row.terminalRationale.length === 0) errors.push(`${id}: terminal row is incomplete`);
        } else if (row?.commit !== null || row?.evidenceDigest !== null || row?.terminalRationale !== null) errors.push(`${id}: nonterminal row contains terminal attribution`);
    }
    if (cursor?.terminalCount !== terminals) errors.push("cursor terminalCount does not reproduce from wave rows");
    if (!same(cursor?.runningWaves, ids.filter((id) => cursor.waves[id].status === "RUNNING"))) errors.push("cursor runningWaves does not reproduce from wave rows");
    return { ok: errors.length === 0, errors };
}

function firstNonterminalLaunchBatch(cursor, dag) {
    for (const stratum of dag?.strata ?? []) {
        for (const batch of stratum.resourceSafeLaunchBatches ?? []) {
            if (batch.some((waveId) => !TERMINAL.has(cursor.waves[waveId]?.status))) return batch;
        }
    }
    return null;
}

export function launchReadinessErrors(cursor, wave, dag) {
    const errors = [];
    if (cursor.withdrawn) errors.push("P002 is DEAD: the perfected-BI formation is withdrawn on this lineage");
    const row = cursor.waves[wave.id];
    if (!row) errors.push(`${wave.id}: absent from recovered cursor`);
    else if (row.status !== "PLANNED") errors.push(`${wave.id}: ${row.status} wave is not runnable exactly once`);
    for (const dependency of wave.dependsOn) {
        if (cursor.waves[dependency]?.status !== "DONE") errors.push(`${wave.id}: launch dependency ${dependency} is not DONE`);
    }
    if (!dag) errors.push(`${wave.id}: launch batch authority is unavailable`);
    else {
        const activeBatch = firstNonterminalLaunchBatch(cursor, dag);
        if (!activeBatch?.includes(wave.id)) errors.push(`${wave.id}: not in the first nonterminal resource-safe launch batch (${activeBatch?.join(", ") ?? "none"})`);
    }
    return errors;
}

function ensureIntegrationReady(cursor, wave, dag) {
    const errors = [...launchReadinessErrors(cursor, wave, dag)];
    for (const dependency of wave.integrationRequires) {
        if (cursor.waves[dependency]?.status !== "DONE") errors.push(`${wave.id}: integration prerequisite ${dependency} is not DONE`);
    }
    return errors;
}

function firstParentChain(root, atCommit) {
    const ancestry = git(root, ["merge-base", "--is-ancestor", SOURCE_BASE, atCommit], { allowFailure: true });
    assert(ancestry.status === 0, `${atCommit}: immutable source base is not an ancestor`, "BI_LINEAGE_RED");
    return git(root, ["rev-list", "--first-parent", "--reverse", `${SOURCE_BASE}..${atCommit}`]).stdout.trim().split(/\s+/).filter(Boolean);
}

export async function recoverCursor({ root = DEFAULT_ROOT, at = "HEAD", readOnly = true } = {}) {
    const repositoryRoot = resolve(root);
    if (!readOnly) return runLockedMutation(repositoryRoot, "recover", { at });
    const atCommit = resolveCommit(repositoryRoot, at);
    const chain = firstParentChain(repositoryRoot, atCommit);
    assert(chain.length >= 2, "cursor recovery requires the formation anchor and terminal P000 commit", "BI_BOOTSTRAP_RED");
    const [anchor, p000] = chain;
    assert(anchor === FORMATION_ANCHOR, `${anchor}: selected lineage does not use the perfected-BI formation anchor`, "BI_LINEAGE_RED");
    assert(same(commitParents(repositoryRoot, anchor), [SOURCE_BASE]), "formation anchor is not the unique direct child of source base", "BI_LINEAGE_RED");
    const anchorTrailers = parseCommitTrailers(commitMessage(repositoryRoot, anchor));
    assert(anchorTrailers.trailers.size === 0 && anchorTrailers.duplicates.length === 0, "formation anchor must not masquerade as a wave transaction", "BI_LINEAGE_RED");
    const formation = loadFormation(repositoryRoot, anchor);
    assert(formation.manifest.contentDigestSha256 === FORMATION_DIGEST,
        "anchored formation closure digest differs from the perfected-BI authority", "BI_DAG_RED");
    const graph = validateFormationGraph(formation);
    assert(graph.ok, graph.errors.join("\n"), "BI_DAG_RED");
    const bootstrap = await validateBootstrapCommit(repositoryRoot, anchor, p000, formation);
    assert(bootstrap.errors.length === 0, bootstrap.errors.join("\n"), "BI_BOOTSTRAP_RED");
    const cursor = initialCursor({ root: repositoryRoot, formation, anchor, atCommit });
    cursor.formationDigest = bootstrap.formationDigest;
    cursor.waves["BI.W-P000"] = {
        ...cursor.waves["BI.W-P000"],
        status: "DONE",
        commit: p000,
        evidenceDigest: bootstrap.receipt.evidenceDigest,
        terminalRationale: "P000 bootstrap receipt and direct first-parent commit tuple verified.",
    };
    cursor.terminalCount = 1;
    const containingCommits = new Set([p000]);
    for (const commit of chain.slice(2)) {
        const parents = commitParents(repositoryRoot, commit);
        assert(parents.length === 1, `${commit}: wave transaction must have exactly one parent`, "BI_LINEAGE_RED");
        const message = commitMessage(repositoryRoot, commit);
        const parsed = parseCommitTrailers(message);
        assert(parsed.duplicates.length === 0, `${commit}: duplicate BI trailers`, "BI_LINEAGE_RED");
        assert(parsed.unexpected.length === 0, `${commit}: unexpected BI trailer identity`, "BI_LINEAGE_RED");
        const waveId = parsed.trailers.get("BI-Wave");
        assert(WAVE_ID.test(waveId ?? ""), `${commit}: every post-P000 first-parent commit must be one declared wave transaction`, "BI_LINEAGE_RED");
        assert(waveId !== "BI.W-P000", `${commit}: duplicate or replayed P000 attribution`, "BI_LINEAGE_RED");
        const wave = formation.waves.waves.find((item) => item.id === waveId);
        assert(wave, `${commit}: unknown wave ${waveId}`, "BI_LINEAGE_RED");
        assert(!containingCommits.has(commit), `${commit}: one commit cannot contain two wave transactions`, "BI_LINEAGE_RED");
        assert(cursor.waves[waveId].status === "PLANNED", `${commit}: ${waveId} already has a containing commit`, "BI_LINEAGE_RED");
        const readiness = ensureIntegrationReady(cursor, wave, formation.dag);
        assert(readiness.length === 0, readiness.join("\n"), "BI_DAG_RED");
        const validated = validateWaveTuple({
            root: repositoryRoot,
            wave,
            formationDigest: cursor.formationDigest,
            commit,
            parent: parents[0],
            view: "commit",
            ref: commit,
            trailerMessage: message,
        });
        assert(validated.errors.length === 0, validated.errors.join("\n"), "BI_RECEIPT_RED");
        const receipt = validated.receipt;
        cursor.waves[waveId] = {
            ...cursor.waves[waveId],
            status: receipt.status,
            commit,
            evidenceDigest: receipt.evidence.sha256,
            terminalRationale: receipt.terminalRationale,
        };
        cursor.terminalCount += 1;
        containingCommits.add(commit);
        if (waveId === "BI.W-P002" && receipt.status === "DEAD") cursor.withdrawn = true;
        if (cursor.withdrawn && waveId !== "BI.W-P002") throw new CursorError("a post-P002 transaction exists after formation withdrawal", "BI_DAG_RED");
    }
    const shape = validateCursorShape(cursor);
    assert(shape.ok, shape.errors.join("\n"), "BI_CURSOR_RED");
    const bytes = serializeCursor(cursor);
    return { cursor, bytes, sha256: cursorDigest(bytes), formation, graph };
}

function journalPath(paths, waveId) {
    assert(WAVE_ID.test(waveId), `${waveId}: invalid journal wave id`);
    return resolve(paths.journal, `${waveId}.json`);
}

function dispatchReceiptPath(paths, waveId, digest) {
    assert(WAVE_ID.test(waveId) && waveId !== "BI.W-P000", `${String(waveId)}: invalid dispatch receipt wave id`, "BI_DISPATCH_RED");
    assert(SHA256.test(digest ?? ""), `${String(digest)}: invalid dispatch receipt digest`, "BI_DISPATCH_RED");
    return resolve(paths.dispatch, waveId, `${digest}.json`);
}

async function ensureDispatchReceiptDirectory(paths, waveId) {
    await ensureDirectoryDurable(paths.dispatch);
    const dispatchMetadata = await lstat(paths.dispatch);
    assert(dispatchMetadata.isDirectory() && !dispatchMetadata.isSymbolicLink(),
        "Git-private dispatch root is not one directory", "BI_DISPATCH_RED");
    const waveDirectory = resolve(paths.dispatch, waveId);
    await ensureDirectoryDurable(waveDirectory);
    const waveMetadata = await lstat(waveDirectory);
    assert(waveMetadata.isDirectory() && !waveMetadata.isSymbolicLink(),
        `${waveId}: Git-private dispatch receipt parent is not one directory`, "BI_DISPATCH_RED");
    return waveDirectory;
}

function canonicalRepositoryBound(value, label) {
    assert(typeof value === "string" && value.length > 0 && value.length <= 1024,
        `${label}: expected one bounded repository-relative path`, "BI_DISPATCH_RED");
    const segments = value.split("/");
    assert(!value.startsWith("/")
        && !value.endsWith("/")
        && segments.every((segment) => segment.length > 0 && segment !== "." && segment !== ".." && segment.toLowerCase() !== ".git"),
    `${label}: path is not a canonical repository-relative bound`, "BI_DISPATCH_RED");
    return value;
}

function canonicalReadBound(value, label) {
    if (typeof value === "string" && value.startsWith("ROOT_GIT_OBJECT:")) {
        const match = /^ROOT_GIT_OBJECT:([0-9a-f]{40}):(.+)$/.exec(value);
        assert(match, `${label}: malformed immutable ROOT Git-object read bound`, "BI_DISPATCH_RED");
        canonicalRepositoryBound(match[2], `${label}.path`);
        return value;
    }
    if (typeof value === "string" && value.startsWith("FOREIGN_GIT_OBJECT:")) {
        const match = /^FOREIGN_GIT_OBJECT:([a-z0-9][a-z0-9._-]{0,63}):([0-9a-f]{40}):(.+)$/.exec(value);
        assert(match, `${label}: malformed immutable foreign Git-object read bound`, "BI_DISPATCH_RED");
        canonicalRepositoryBound(match[3], `${label}.path`);
        return value;
    }
    if (typeof value === "string" && value.startsWith("FOREIGN_REPOSITORY:")) {
        const match = /^FOREIGN_REPOSITORY:([a-z0-9][a-z0-9._-]{0,63}):([0-9a-f]{40})$/.exec(value);
        assert(match, `${label}: malformed immutable foreign repository read bound`, "BI_DISPATCH_RED");
        return value;
    }
    return canonicalRepositoryBound(value, label);
}

function canonicalStringList(value, label, validate, { allowEmpty = true } = {}) {
    assert(Array.isArray(value) && (allowEmpty || value.length > 0), `${label}: expected ${allowEmpty ? "an" : "a nonempty"} array`, "BI_DISPATCH_RED");
    const observed = value.map((item, index) => validate(item, `${label}[${index}]`));
    assert(new Set(observed).size === observed.length && same(observed, [...observed].sort(comparePaths)),
        `${label}: entries must be unique and canonically ordered`, "BI_DISPATCH_RED");
    return observed;
}

function canonicalDispatchText(value, label, maximum = 32 * 1024) {
    assert(typeof value === "string"
        && value.length > 0
        && value.length <= maximum
        && value.trim() === value
        && !value.includes("\0"), `${label}: expected bounded exact text`, "BI_DISPATCH_RED");
    return value;
}

function validatePlatformIdentity(value, label) {
    assert(exactObjectKeys(value, ["status", "value"]), `${label}: malformed platform identity report`, "BI_DISPATCH_RED");
    assert(value.status === "PLATFORM_REPORTED" || value.status === "UNATTESTED", `${label}: invalid platform identity state`, "BI_DISPATCH_RED");
    if (value.status === "UNATTESTED") {
        assert(value.value === null, `${label}: UNATTESTED identity cannot invent a value`, "BI_DISPATCH_RED");
    } else {
        assert(typeof value.value === "string"
            && value.value.length > 0
            && value.value.length <= 256
            && value.value.trim() === value.value
            && !/[\x00-\x1f\x7f]/.test(value.value), `${label}: malformed platform-reported identity`, "BI_DISPATCH_RED");
    }
    return { status: value.status, value: value.value };
}

function canonicalDispatchPlan(plan) {
    assert(exactObjectKeys(plan, ["evidence", "label", "laneId", "mayRead", "mayWrite", "platform", "role", "task"]),
        "dispatch plan must contain exactly laneId/label/role/task/mayRead/mayWrite/evidence/platform", "BI_DISPATCH_RED");
    assert(DISPATCH_LANE_ID.test(plan.laneId ?? ""), "dispatch laneId is not canonical", "BI_DISPATCH_RED");
    assert(DISPATCH_LABELS.has(plan.label), "dispatch label must be exactly Luna or Terra", "BI_DISPATCH_RED");
    assert(DISPATCH_ROLES.has(plan.role), `${String(plan.role)}: dispatch role is not an allowed bounded non-root role`, "BI_DISPATCH_RED");
    const mayRead = canonicalStringList(plan.mayRead, "dispatch mayRead", canonicalReadBound, { allowEmpty: false });
    const mayWrite = canonicalStringList(plan.mayWrite, "dispatch mayWrite", canonicalRepositoryBound);
    assert(plan.role === "implementation" || mayWrite.length === 0,
        `${plan.role}: non-implementation dispatch role must be read-only`, "BI_DISPATCH_RED");
    assert(exactObjectKeys(plan.evidence, ["requiredArtifacts", "requiredCommands", "returnContract"]),
        "dispatch evidence contract is malformed", "BI_DISPATCH_RED");
    const requiredArtifacts = canonicalStringList(plan.evidence.requiredArtifacts, "dispatch evidence.requiredArtifacts", canonicalRepositoryBound);
    const requiredCommands = canonicalStringList(
        plan.evidence.requiredCommands,
        "dispatch evidence.requiredCommands",
        (value, label) => canonicalDispatchText(value, label, 4096),
    );
    assert(requiredArtifacts.length + requiredCommands.length > 0,
        "dispatch evidence contract must require an artifact or command", "BI_DISPATCH_RED");
    assert(exactObjectKeys(plan.platform, ["agent", "model"]), "dispatch platform report is malformed", "BI_DISPATCH_RED");
    const agent = validatePlatformIdentity(plan.platform.agent, "dispatch platform.agent");
    const model = validatePlatformIdentity(plan.platform.model, "dispatch platform.model");
    assert(agent.status === "UNATTESTED" && model.status === "UNATTESTED",
        "dispatch receipt V1 has no verifiable platform-native identity report; agent and model must remain UNATTESTED", "BI_DISPATCH_RED");
    return {
        laneId: plan.laneId,
        label: plan.label,
        role: plan.role,
        task: canonicalDispatchText(plan.task, "dispatch task"),
        mayRead,
        mayWrite,
        evidence: {
            requiredArtifacts,
            requiredCommands,
            returnContract: canonicalDispatchText(plan.evidence.returnContract, "dispatch evidence.returnContract", 8192),
        },
        platform: { agent, model },
    };
}

function canonicalDispatchReceipt(value) {
    assert(exactObjectKeys(value, [
        "schemaVersion",
        "authority",
        "routingPolicySha256",
        "formationDigest",
        "sourceBase",
        "waveId",
        "integrationParent",
        "base",
        "laneId",
        "label",
        "role",
        "task",
        "mayRead",
        "mayWrite",
        "evidence",
        "platform",
    ]), "dispatch receipt has an unexpected shape", "BI_DISPATCH_RED");
    assert(value.schemaVersion === "1.0.0" && value.authority === DISPATCH_RECEIPT_AUTHORITY,
        "dispatch receipt authority is invalid", "BI_DISPATCH_RED");
    assert(value.routingPolicySha256 === DISPATCH_ROUTING_POLICY_SHA256,
        "dispatch receipt routing-policy digest is invalid", "BI_DISPATCH_RED");
    assert(value.formationDigest === FORMATION_DIGEST && value.sourceBase === SOURCE_BASE,
        "dispatch receipt formation/source binding is invalid", "BI_DISPATCH_RED");
    assert(WAVE_ID.test(value.waveId ?? "") && value.waveId !== "BI.W-P000" && SHA1.test(value.integrationParent ?? ""),
        "dispatch receipt wave/integration-parent binding is invalid", "BI_DISPATCH_RED");
    assert(exactObjectKeys(value.base, ["commit", "tree"])
        && value.base.commit === value.integrationParent
        && SHA1.test(value.base.tree ?? ""), "dispatch receipt base binding is invalid", "BI_DISPATCH_RED");
    const plan = canonicalDispatchPlan({
        laneId: value.laneId,
        label: value.label,
        role: value.role,
        task: value.task,
        mayRead: value.mayRead,
        mayWrite: value.mayWrite,
        evidence: value.evidence,
        platform: value.platform,
    });
    return {
        schemaVersion: "1.0.0",
        authority: DISPATCH_RECEIPT_AUTHORITY,
        routingPolicySha256: DISPATCH_ROUTING_POLICY_SHA256,
        formationDigest: value.formationDigest,
        sourceBase: value.sourceBase,
        waveId: value.waveId,
        integrationParent: value.integrationParent,
        base: { commit: value.base.commit, tree: value.base.tree },
        ...plan,
    };
}

function serializeDispatchReceipt(value) {
    return `${JSON.stringify(recursivelySortJson(canonicalDispatchReceipt(value)), null, 2)}\n`;
}

async function loadDispatchReceipts(root) {
    const paths = gitPrivatePaths(root);
    let dispatchMetadata;
    try {
        dispatchMetadata = await lstat(paths.dispatch);
    } catch (error) {
        if (error.code === "ENOENT") return { rows: [], byDigest: new Map(), byLaneId: new Map() };
        throw error;
    }
    assert(dispatchMetadata.isDirectory() && !dispatchMetadata.isSymbolicLink(),
        "Git-private dispatch root is not one directory", "BI_DISPATCH_RED");
    const waveNames = await readdir(paths.dispatch);
    const rows = [];
    const byDigest = new Map();
    const byLaneId = new Map();
    for (const waveId of waveNames.sort(comparePaths)) {
        assert(WAVE_ID.test(waveId) && waveId !== "BI.W-P000", `${waveId}: unexpected Git-private dispatch entry`, "BI_DISPATCH_RED");
        const waveDirectory = resolve(paths.dispatch, waveId);
        const waveMetadata = await lstat(waveDirectory);
        assert(waveMetadata.isDirectory() && !waveMetadata.isSymbolicLink(), `${waveId}: dispatch wave entry is not one directory`, "BI_DISPATCH_RED");
        for (const name of (await readdir(waveDirectory)).sort(comparePaths)) {
            if (/^\.[0-9a-f]{64}\.[0-9]+\.[0-9a-f-]{36}\.dispatch\.tmp$/.test(name)) {
                const stagingMetadata = await lstat(resolve(waveDirectory, name));
                assert(stagingMetadata.isFile() && !stagingMetadata.isSymbolicLink() && (stagingMetadata.mode & 0o777) === 0o600,
                    `${waveId}/${name}: immutable receipt staging entry is malformed`, "BI_DISPATCH_RED");
                continue;
            }
            const match = /^([0-9a-f]{64})\.json$/.exec(name);
            assert(match, `${waveId}/${name}: unexpected Git-private dispatch file`, "BI_DISPATCH_RED");
            const path = resolve(waveDirectory, name);
            const metadata = await lstat(path);
            assert(metadata.isFile() && !metadata.isSymbolicLink() && (metadata.mode & 0o777) === 0o600,
                `${waveId}/${name}: dispatch receipt must be one private regular file`, "BI_DISPATCH_RED");
            const bytes = await readFile(path);
            const digest = sha256(bytes);
            assert(digest === match[1], `${waveId}/${name}: filename does not bind raw receipt bytes`, "BI_DISPATCH_RED");
            let parsed;
            try {
                parsed = JSON.parse(bytes.toString("utf8"));
            } catch (error) {
                throw new CursorError(`${waveId}/${name}: invalid dispatch receipt JSON (${error.message})`, "BI_DISPATCH_RED");
            }
            const receipt = canonicalDispatchReceipt(parsed);
            assert(receipt.waveId === waveId, `${waveId}/${name}: dispatch receipt wave/path mismatch`, "BI_DISPATCH_RED");
            assert(Buffer.from(serializeDispatchReceipt(receipt)).equals(bytes),
                `${waveId}/${name}: dispatch receipt bytes are not canonical`, "BI_DISPATCH_RED");
            assert(!byDigest.has(digest), `${digest}: duplicate dispatch receipt digest`, "BI_DISPATCH_RED");
            assert(!byLaneId.has(receipt.laneId), `${receipt.laneId}: conflicting dispatch lane receipts`, "BI_DISPATCH_RED");
            const row = { digest, receipt, bytes, path: `${waveId}/${name}` };
            rows.push(row);
            byDigest.set(digest, row);
            byLaneId.set(receipt.laneId, row);
        }
    }
    return { rows, byDigest, byLaneId };
}

async function readJsonFile(path, { missing = null } = {}) {
    try {
        return JSON.parse(await readFile(path, "utf8"));
    } catch (error) {
        if (error.code === "ENOENT") return missing;
        if (error instanceof SyntaxError) throw new CursorError(`${path}: invalid JSON (${error.message})`);
        throw error;
    }
}

async function loadJournals(root, dispatchReceipts = null, { maxLiveAgents = null } = {}) {
    const paths = gitPrivatePaths(root);
    const receipts = dispatchReceipts ?? await loadDispatchReceipts(root);
    let journalMetadata;
    try {
        journalMetadata = await lstat(paths.journal);
    } catch (error) {
        if (error.code === "ENOENT") return [];
        throw error;
    }
    assert(journalMetadata.isDirectory() && !journalMetadata.isSymbolicLink(),
        "Git-private journal root is not one directory", "BI_CURSOR_RED");
    const names = await readdir(paths.journal);
    const journals = [];
    for (const name of names.sort(comparePaths)) {
        if (/^\.BI\.W-P(?:[0-9]{3}|[1-9][0-9]{3,})\.json\.\d+\.[0-9a-f-]{36}\.tmp$/.test(name)) continue;
        assert(/^BI\.W-P(?:[0-9]{3}|[1-9][0-9]{3,})\.json$/.test(name), `${name}: unexpected Git-private journal file`, "BI_CURSOR_RED");
        const value = await readJsonFile(resolve(paths.journal, name));
        const allowed = new Set(["schemaVersion", "authority", "formationDigest", "waveId", "state", "integrationParent", "resourceLocks", "leasedPreimages", "lanes", "commit", "receiptSha256"]);
        assert(value && Object.keys(value).every((key) => allowed.has(key)), `${name}: malformed journal shape`);
        assert(value.schemaVersion === "1.0.0" && value.authority === AUTHORITY && WAVE_ID.test(value.waveId ?? ""), `${name}: malformed journal authority`);
        assert(["RUNNING", "INTEGRATED"].includes(value.state), `${name}: invalid journal transaction state`);
        assert(SHA1.test(value.integrationParent ?? "") && Array.isArray(value.resourceLocks) && Array.isArray(value.leasedPreimages), `${name}: missing integration parent/locks/preimages`);
        assert(value.resourceLocks.every((lock) => typeof lock === "string" && lock.length > 0)
            && new Set(value.resourceLocks).size === value.resourceLocks.length
            && same(value.resourceLocks, [...value.resourceLocks].sort(comparePaths)), `${name}: resource locks are not a canonical unique set`);
        const leasedPaths = new Set();
        for (const lease of value.leasedPreimages) {
            assert(lease && same(Object.keys(lease).sort(), ["path", "preimage"]), `${name}: leased preimage has unexpected properties`);
            assert(typeof lease.path === "string" && lease.path.length > 0 && !leasedPaths.has(lease.path), `${name}: leased preimage path is invalid or duplicated`);
            leasedPaths.add(lease.path);
            if (lease.preimage !== null) {
                assert(same(Object.keys(lease.preimage).sort(), ["mode", "oid"])
                    && /^\d{6}$/.test(lease.preimage.mode ?? "")
                    && SHA1.test(lease.preimage.oid ?? ""), `${name}: leased preimage Git object is invalid`);
            }
        }
        assert(same(value.leasedPreimages.map((lease) => lease.path), [...value.leasedPreimages.map((lease) => lease.path)].sort(comparePaths)), `${name}: leased preimages are not canonically ordered`);
        assert(Array.isArray(value.lanes), `${name}: dispatch lanes are absent`, "BI_DISPATCH_RED");
        const laneIds = new Set();
        const laneDigests = new Set();
        for (const lane of value.lanes) {
            assert(exactObjectKeys(lane, ["laneId", "receiptSha256", "state"]), `${name}: malformed dispatch lane reference`, "BI_DISPATCH_RED");
            assert(DISPATCH_LANE_ID.test(lane.laneId ?? "") && !laneIds.has(lane.laneId), `${name}: dispatch lane ID is invalid or duplicated`, "BI_DISPATCH_RED");
            assert(SHA256.test(lane.receiptSha256 ?? "") && !laneDigests.has(lane.receiptSha256), `${name}: dispatch receipt digest is invalid or duplicated`, "BI_DISPATCH_RED");
            assert(lane.state === "ACTIVE" || lane.state === "SETTLED", `${name}: dispatch lane state is invalid`, "BI_DISPATCH_RED");
            const receipt = receipts.byDigest.get(lane.receiptSha256)?.receipt;
            assert(receipt
                && receipt.laneId === lane.laneId
                && receipt.waveId === value.waveId
                && receipt.formationDigest === value.formationDigest
                && receipt.integrationParent === value.integrationParent,
            `${name}: dispatch lane does not bind its exact durable receipt`, "BI_DISPATCH_RED");
            assert(receipts.byLaneId.get(lane.laneId)?.digest === lane.receiptSha256,
                `${name}: dispatch lane ID/digest conflicts with the immutable receipt store`, "BI_DISPATCH_RED");
            laneIds.add(lane.laneId);
            laneDigests.add(lane.receiptSha256);
        }
        assert(same(value.lanes.map((lane) => lane.laneId), [...value.lanes.map((lane) => lane.laneId)].sort(comparePaths)),
            `${name}: dispatch lanes are not canonically ordered`, "BI_DISPATCH_RED");
        if (value.state === "RUNNING") assert(value.commit === null && value.receiptSha256 === null, `${name}: RUNNING journal contains terminal attribution`);
        else {
            assert(SHA1.test(value.commit ?? "") && SHA256.test(value.receiptSha256 ?? ""), `${name}: INTEGRATED journal lacks terminal attribution`);
            assert(value.lanes.every((lane) => lane.state === "SETTLED"), `${name}: INTEGRATED journal retains an ACTIVE dispatch lane`, "BI_DISPATCH_RED");
        }
        assert(name === `${value.waveId}.json`, `${name}: journal filename/wave mismatch`);
        journals.push(value);
    }
    assert(journals.length <= 3, "Git-private journals exceed the three-live-wave ceiling", "BI_CURSOR_RED");
    const activeLanes = journals
        .filter((journal) => journal.state === "RUNNING")
        .flatMap((journal) => journal.lanes.filter((lane) => lane.state === "ACTIVE"));
    if (maxLiveAgents !== null) {
        assert(Number.isInteger(maxLiveAgents) && maxLiveAgents > 0, "dispatch max-live-agent authority is invalid", "BI_DAG_RED");
        assert(activeLanes.length <= maxLiveAgents, "Git-private dispatch lanes exceed the formation live-agent ceiling", "BI_CURSOR_LOCKED");
    }
    assert(new Set(journals.flatMap((journal) => journal.lanes.map((lane) => lane.laneId))).size
        === journals.reduce((count, journal) => count + journal.lanes.length, 0),
    "Git-private journals contain conflicting dispatch lane IDs", "BI_DISPATCH_RED");
    const activeWriteOwners = new Map();
    for (const lane of activeLanes) {
        const receipt = receipts.byDigest.get(lane.receiptSha256).receipt;
        for (const path of receipt.mayWrite) {
            assert(!activeWriteOwners.has(path),
                `${path}: ACTIVE dispatch write bound collides between ${activeWriteOwners.get(path)} and ${lane.laneId}`, "BI_CURSOR_LOCKED");
            activeWriteOwners.set(path, lane.laneId);
        }
    }
    return journals;
}

function entryByPath(root, commit) {
    return new Map(readExactRepositoryEntries(root, "commit", commit).map((entry) => [entry.path, entry]));
}

function validateJournalLeases(root, cursor, journal) {
    const errors = [];
    if (journal.formationDigest !== cursor.formationDigest) errors.push(`${journal.waveId}: journal formation digest is stale`);
    const terminalRow = cursor.waves[journal.waveId];
    const comparisonCommit = TERMINAL.has(terminalRow?.status)
        ? commitParents(root, terminalRow.commit)[0]
        : cursor.atCommit;
    const ancestry = git(root, ["merge-base", "--is-ancestor", journal.integrationParent, comparisonCommit], { allowFailure: true });
    if (ancestry.status !== 0) errors.push(`${journal.waveId}: journal integration parent is not on the recovered lineage`);
    const formation = loadFormation(root, cursor.formationAnchor);
    const wave = formation.waves.waves.find((item) => item.id === journal.waveId);
    if (!wave) return [`${journal.waveId}: journal has no current wave authority`];
    const expectedAtLaunch = leasedPreimages(root, journal.integrationParent, wave);
    if (!same(journal.leasedPreimages, expectedAtLaunch)) errors.push(`${journal.waveId}: journal lease set/preimages do not exactly reproduce from its integration base`);
    const expectedLocks = [...wave.resourceLocks].sort(comparePaths);
    if (!same(journal.resourceLocks, expectedLocks)) errors.push(`${journal.waveId}: journal resource locks differ from current wave authority`);
    const current = entryByPath(root, comparisonCommit);
    const seen = new Set();
    for (const lease of journal.leasedPreimages) {
        if (!lease || typeof lease.path !== "string" || seen.has(lease.path)) {
            errors.push(`${journal.waveId}: invalid or duplicate leased preimage`);
            continue;
        }
        seen.add(lease.path);
        const entry = current.get(lease.path) ?? null;
        const actual = entry ? { mode: entry.mode, oid: entry.oid } : null;
        if (!same(actual, lease.preimage)) errors.push(`${journal.waveId}: stale leased preimage at ${lease.path}`);
    }
    return errors;
}

function dispatchReceiptAuthorityErrors(root, recovered, row) {
    const errors = [];
    const { receipt } = row;
    const wave = recovered.formation.waves.waves.find((candidate) => candidate.id === receipt.waveId);
    if (!wave) return [`${receipt.laneId}: dispatch receipt wave is absent from formation authority`];
    let baseTree = null;
    try {
        baseTree = commitTree(root, receipt.integrationParent);
    } catch {
        errors.push(`${receipt.laneId}: dispatch receipt integration parent is not one readable commit`);
    }
    if (baseTree !== null && receipt.base.tree !== baseTree) errors.push(`${receipt.laneId}: dispatch receipt base tree is stale`);
    const rowState = recovered.cursor.waves[receipt.waveId];
    if (TERMINAL.has(rowState?.status)) {
        const expectedParent = commitParents(root, rowState.commit)[0];
        if (receipt.integrationParent !== expectedParent) errors.push(`${receipt.laneId}: terminal-wave dispatch receipt has the wrong integration parent`);
    } else {
        const ancestry = git(root, ["merge-base", "--is-ancestor", receipt.integrationParent, recovered.cursor.atCommit], { allowFailure: true });
        if (ancestry.status !== 0) errors.push(`${receipt.laneId}: dispatch receipt integration parent is outside the recovered lineage`);
    }
    let writeLeases = new Set();
    try {
        writeLeases = new Set(leasedPreimages(root, receipt.integrationParent, wave).map((lease) => lease.path));
    } catch {
        errors.push(`${receipt.laneId}: dispatch receipt lease authority cannot be reproduced`);
    }
    for (const path of receipt.mayWrite) {
        if (!writeLeases.has(path)) errors.push(`${receipt.laneId}: dispatch mayWrite is outside the wave lease at ${path}`);
    }
    return errors;
}

function dispatchReceiptReconciliationErrors(recovered, journals, receipts, expectedDispatchDigests) {
    const errors = [];
    const referenced = new Set(journals.flatMap((journal) => journal.lanes.map((lane) => lane.receiptSha256)));
    for (const row of receipts.rows) {
        if (referenced.has(row.digest)) continue;
        const waveRow = recovered.cursor.waves[row.receipt.waveId];
        if (TERMINAL.has(waveRow?.status)) continue;
        if (expectedDispatchDigests.has(row.digest)) continue;
        errors.push(`${row.receipt.laneId}: unattached dispatch receipt is not an exact locked retry or terminal-wave record`);
    }
    return errors;
}

function overlayJournals(root, baseCursor, journals) {
    const cursor = structuredClone(baseCursor);
    const errors = [];
    for (const journal of journals) {
        errors.push(...validateJournalLeases(root, cursor, journal));
        const row = cursor.waves[journal.waveId];
        if (!row) {
            errors.push(`${journal.waveId}: journal wave is absent from authority`);
            continue;
        }
        if (TERMINAL.has(row.status)) {
            if (journal.state === "RUNNING" && journal.lanes.some((lane) => lane.state === "ACTIVE")) {
                errors.push(`${journal.waveId}: terminal Git row retains a RUNNING journal with ACTIVE dispatch lanes`);
            } else if (journal.state === "INTEGRATED" && journal.commit !== row.commit) {
                errors.push(`${journal.waveId}: journal commit differs from containing commit`);
            }
            continue;
        }
        if (journal.state === "INTEGRATED") {
            errors.push(`${journal.waveId}: journal claims integration absent from first-parent receipts`);
            continue;
        }
        if (row.status !== "PLANNED") errors.push(`${journal.waveId}: cannot overlay RUNNING on ${row.status}`);
        else row.status = "RUNNING";
    }
    cursor.runningWaves = Object.keys(cursor.waves).filter((id) => cursor.waves[id].status === "RUNNING");
    const shape = validateCursorShape(cursor);
    errors.push(...shape.errors);
    return { cursor, bytes: serializeCursor(cursor), errors };
}

async function validatePrivateCache(root, recovered, {
    expectedDispatchDigests = new Set(),
    dispatchReceipts = null,
    journals: suppliedJournals = null,
    checkCached = true,
} = {}) {
    const paths = gitPrivatePaths(root);
    const receipts = dispatchReceipts ?? await loadDispatchReceipts(root);
    const journals = suppliedJournals ?? await loadJournals(root, receipts, {
        maxLiveAgents: recovered.formation.dag.maxLiveAgents,
    });
    const overlay = overlayJournals(root, recovered.cursor, journals);
    const cached = checkCached ? await readJsonFile(paths.cursor, { missing: null }) : null;
    const errors = [
        ...overlay.errors,
        ...receipts.rows.flatMap((row) => dispatchReceiptAuthorityErrors(root, recovered, row)),
        ...dispatchReceiptReconciliationErrors(recovered, journals, receipts, expectedDispatchDigests),
    ];
    if (cached !== null) {
        const shape = validateCursorShape(cached);
        errors.push(...shape.errors.map((error) => `cached ${error}`));
        if (serializeCursor(cached) !== overlay.bytes) errors.push("Git-private cursor cache is stale or differs from authoritative recovery plus journals");
    }
    return { ...overlay, cached, journals, dispatchReceipts: receipts, paths, errors };
}

function leasedPreimages(root, commit, wave) {
    const entries = entryByPath(root, commit);
    const paths = [...new Set(wave.subjects.flatMap((subject) => {
        if (subject.action === "verify") return [];
        return subject.action === "rename" ? [subject.path, subject.targetPath] : [subject.path];
    }))].sort(comparePaths);
    return paths.map((path) => {
        const entry = entries.get(path) ?? null;
        return { path, preimage: entry ? { mode: entry.mode, oid: entry.oid } : null };
    });
}

function renderDispatchReceiptForWave({ root, recovered, wave, integrationParent, plan }) {
    const canonicalPlan = canonicalDispatchPlan(plan);
    const leases = new Set(leasedPreimages(root, integrationParent, wave).map((lease) => lease.path));
    for (const path of canonicalPlan.mayWrite) {
        assert(leases.has(path), `${canonicalPlan.laneId}: dispatch mayWrite is outside the wave lease at ${path}`, "BI_DISPATCH_RED");
    }
    const baseEntries = entryByPath(root, integrationParent);
    for (const bound of canonicalPlan.mayRead) {
        if (bound.startsWith("ROOT_GIT_OBJECT:")
            || bound.startsWith("FOREIGN_GIT_OBJECT:")
            || bound.startsWith("FOREIGN_REPOSITORY:")) continue;
        assert(baseEntries.has(bound) || leases.has(bound),
            `${canonicalPlan.laneId}: dispatch mayRead is absent from its exact base at ${bound}`, "BI_DISPATCH_RED");
    }
    const receipt = canonicalDispatchReceipt({
        schemaVersion: "1.0.0",
        authority: DISPATCH_RECEIPT_AUTHORITY,
        routingPolicySha256: DISPATCH_ROUTING_POLICY_SHA256,
        formationDigest: recovered.cursor.formationDigest,
        sourceBase: recovered.cursor.sourceBase,
        waveId: wave.id,
        integrationParent,
        base: { commit: integrationParent, tree: commitTree(root, integrationParent) },
        ...canonicalPlan,
    });
    const bytes = Buffer.from(serializeDispatchReceipt(receipt));
    return { receipt, bytes, receiptSha256: sha256(bytes) };
}

export async function renderDispatchReceipt({ root = DEFAULT_ROOT, waveId, at = "HEAD", plan } = {}) {
    const repositoryRoot = resolve(root);
    assert(WAVE_ID.test(waveId ?? "") && waveId !== "BI.W-P000", "dispatch receipt rendering requires one post-bootstrap wave", "BI_DISPATCH_RED");
    const recovered = await recoverCursor({ root: repositoryRoot, at, readOnly: true });
    const wave = recovered.formation.waves.waves.find((candidate) => candidate.id === waveId);
    assert(wave, `${waveId}: unknown dispatch receipt wave`, "BI_DISPATCH_RED");
    return renderDispatchReceiptForWave({
        root: repositoryRoot,
        recovered,
        wave,
        integrationParent: recovered.cursor.atCommit,
        plan,
    });
}

async function writeCache(paths, cursor) {
    const shape = validateCursorShape(cursor);
    assert(shape.ok, shape.errors.join("\n"));
    await durableWrite(paths.cursor, serializeCursor(cursor));
}

async function cleanupDispatchStagingFiles(paths) {
    let dispatchMetadata;
    try {
        dispatchMetadata = await lstat(paths.dispatch);
    } catch (error) {
        if (error.code === "ENOENT") return;
        throw error;
    }
    assert(dispatchMetadata.isDirectory() && !dispatchMetadata.isSymbolicLink(),
        "Git-private dispatch root is not one directory", "BI_DISPATCH_RED");
    const waveNames = await readdir(paths.dispatch);
    for (const waveId of waveNames.sort(comparePaths)) {
        assert(WAVE_ID.test(waveId) && waveId !== "BI.W-P000", `${waveId}: unexpected Git-private dispatch entry`, "BI_DISPATCH_RED");
        const waveDirectory = resolve(paths.dispatch, waveId);
        const waveMetadata = await lstat(waveDirectory);
        assert(waveMetadata.isDirectory() && !waveMetadata.isSymbolicLink(), `${waveId}: dispatch wave entry is not one directory`, "BI_DISPATCH_RED");
        let removed = false;
        for (const name of await readdir(waveDirectory)) {
            if (!/^\.[0-9a-f]{64}\.[0-9]+\.[0-9a-f-]{36}\.dispatch\.tmp$/.test(name)) continue;
            const staging = resolve(waveDirectory, name);
            const metadata = await lstat(staging);
            assert(metadata.isFile() && !metadata.isSymbolicLink() && (metadata.mode & 0o777) === 0o600,
                `${waveId}/${name}: immutable receipt staging entry is malformed`, "BI_DISPATCH_RED");
            await unlink(staging);
            removed = true;
        }
        if (removed) await fsyncDirectory(waveDirectory);
    }
}

function activeDispatchLanes(journals) {
    return journals
        .filter((journal) => journal.state === "RUNNING")
        .flatMap((journal) => journal.lanes.filter((lane) => lane.state === "ACTIVE"));
}

function assertDispatchAdditions({ journals, receipts, rendered, maxLiveAgents }) {
    const current = activeDispatchLanes(journals);
    assert(current.length + rendered.length <= maxLiveAgents,
        "dispatch would exceed the formation live-agent ceiling", "BI_CURSOR_LOCKED");
    const writeOwners = new Map();
    for (const lane of current) {
        const receipt = receipts.byDigest.get(lane.receiptSha256).receipt;
        for (const path of receipt.mayWrite) writeOwners.set(path, lane.laneId);
    }
    for (const candidate of rendered) {
        for (const path of candidate.receipt.mayWrite) {
            assert(!writeOwners.has(path),
                `${path}: dispatch write bound collides between ${writeOwners.get(path)} and ${candidate.receipt.laneId}`, "BI_CURSOR_LOCKED");
            writeOwners.set(path, candidate.receipt.laneId);
        }
    }
}

async function publishDispatchReceipt(paths, rendered) {
    await ensureDispatchReceiptDirectory(paths, rendered.receipt.waveId);
    const path = dispatchReceiptPath(paths, rendered.receipt.waveId, rendered.receiptSha256);
    return durableCreateImmutable(path, rendered.bytes);
}

async function selectedExecutionState(root, recovered, { checkCached = true } = {}) {
    if (recovered.cursor.atCommit !== resolveCommit(root, "HEAD")) {
        return {
            cursor: recovered.cursor,
            bytes: recovered.bytes,
            cached: null,
            journals: [],
            dispatchReceipts: { rows: [], byDigest: new Map(), byLaneId: new Map() },
            paths: gitPrivatePaths(root),
            errors: [],
            historical: true,
        };
    }
    return { ...await validatePrivateCache(root, recovered, { checkCached }), historical: false };
}

export async function validateCursor({ root = DEFAULT_ROOT, at = "HEAD" } = {}) {
    const repositoryRoot = resolve(root);
    const recovered = await recoverCursor({ root: repositoryRoot, at, readOnly: true });
    const privateState = await selectedExecutionState(repositoryRoot, recovered);
    return {
        ok: privateState.errors.length === 0,
        errors: privateState.errors,
        cursor: privateState.cursor,
        bytes: privateState.bytes,
        sha256: cursorDigest(privateState.bytes),
        cache: privateState.historical
            ? "IGNORED_HISTORICAL_GIT_ONLY"
            : privateState.cached === null ? "ABSENT_RECONSTRUCTABLE" : "BYTE_IDENTICAL",
    };
}

export async function startWave({ root = DEFAULT_ROOT, waveId, at = "HEAD", initialPlans = [] } = {}) {
    const repositoryRoot = resolve(root);
    assert(WAVE_ID.test(waveId ?? "") && waveId !== "BI.W-P000", "start requires one post-bootstrap --wave");
    assert(Array.isArray(initialPlans), "start initialPlans must be an array", "BI_DISPATCH_RED");
    return runLockedMutation(repositoryRoot, "start", { waveId, at, initialPlans });
}

async function startWaveUnlocked({ root, waveId, at, initialPlans = [], paths }) {
    const recovered = await recoverCursor({ root, at, readOnly: true });
    assert(recovered.cursor.atCommit === resolveCommit(root, "HEAD"), "mutating start must use the current worktree HEAD", "BI_CURSOR_STALE");
    const wave = recovered.formation.waves.waves.find((item) => item.id === waveId);
    assert(wave, `${waveId}: unknown wave`);
    const rendered = initialPlans.map((plan) => renderDispatchReceiptForWave({
        root,
        recovered,
        wave,
        integrationParent: recovered.cursor.atCommit,
        plan,
    }));
    assert(new Set(rendered.map((candidate) => candidate.receipt.laneId)).size === rendered.length,
        "start initial dispatch plans contain duplicate lane IDs", "BI_DISPATCH_RED");
    const dispatchReceipts = await loadDispatchReceipts(root);
    const journals = await loadJournals(root, dispatchReceipts, {
        maxLiveAgents: recovered.formation.dag.maxLiveAgents,
    });
    for (const candidate of rendered) {
        const existing = dispatchReceipts.byLaneId.get(candidate.receipt.laneId);
        assert(!existing || existing.digest === candidate.receiptSha256,
            `${candidate.receipt.laneId}: dispatch retry conflicts with its immutable receipt digest`, "BI_DISPATCH_RED");
    }
    const privateState = await validatePrivateCache(root, recovered, {
        expectedDispatchDigests: new Set(rendered.map((candidate) => candidate.receiptSha256)),
        dispatchReceipts,
        journals,
    });
    assert(privateState.errors.length === 0, privateState.errors.join("\n"), "BI_CURSOR_STALE");
    assert(privateState.cached === null || privateState.cached.atCommit === recovered.cursor.atCommit, "cursor cache is leased to a stale base", "BI_CURSOR_STALE");
    const readiness = launchReadinessErrors(privateState.cursor, wave, recovered.formation.dag);
    assert(readiness.length === 0, readiness.join("\n"), "BI_DAG_RED");
    assert(privateState.journals.length < 3, "three wave transactions are already RUNNING", "BI_CURSOR_LOCKED");
    const candidateLeases = new Set(leasedPreimages(root, recovered.cursor.atCommit, wave).map((lease) => lease.path));
    const candidateLocks = new Set(wave.resourceLocks);
    for (const active of privateState.journals.filter((item) => item.state === "RUNNING")) {
        const pathCollision = active.leasedPreimages.find((lease) => candidateLeases.has(lease.path));
        if (pathCollision) throw new CursorError(`${waveId}: exact-path lease collides with ${active.waveId} at ${pathCollision.path}`, "BI_CURSOR_LOCKED");
        const lockCollision = active.resourceLocks.find((lock) => candidateLocks.has(lock));
        if (lockCollision) throw new CursorError(`${waveId}: semantic lock collides with ${active.waveId} at ${lockCollision}`, "BI_CURSOR_LOCKED");
    }
    assertDispatchAdditions({
        journals: privateState.journals,
        receipts: privateState.dispatchReceipts,
        rendered,
        maxLiveAgents: recovered.formation.dag.maxLiveAgents,
    });
    const journal = {
        schemaVersion: "1.0.0",
        authority: AUTHORITY,
        formationDigest: recovered.cursor.formationDigest,
        waveId,
        state: "RUNNING",
        integrationParent: recovered.cursor.atCommit,
        resourceLocks: [...wave.resourceLocks].sort(comparePaths),
        leasedPreimages: leasedPreimages(root, recovered.cursor.atCommit, wave),
        lanes: rendered.map((candidate) => ({
            laneId: candidate.receipt.laneId,
            receiptSha256: candidate.receiptSha256,
            state: "ACTIVE",
        })).sort((left, right) => comparePaths(left.laneId, right.laneId)),
        commit: null,
        receiptSha256: null,
    };
    for (const candidate of rendered) await publishDispatchReceipt(paths, candidate);
    await durableWrite(journalPath(paths, waveId), `${JSON.stringify(journal, null, 2)}\n`);
    const next = structuredClone(privateState.cursor);
    next.waves[waveId].status = "RUNNING";
    next.runningWaves = Object.keys(next.waves).filter((id) => next.waves[id].status === "RUNNING");
    await writeCache(paths, next);
    const attached = await validatePrivateCache(root, recovered);
    assert(attached.errors.length === 0, attached.errors.join("\n"), "BI_DISPATCH_RED");
    return {
        status: "RUNNING",
        waveId,
        integrationParent: journal.integrationParent,
        cursorSha256: cursorDigest(next),
        dispatchReceipts: journal.lanes,
        journal,
    };
}

export async function prepareDispatchLane({ root = DEFAULT_ROOT, waveId, plan } = {}) {
    const repositoryRoot = resolve(root);
    assert(WAVE_ID.test(waveId ?? "") && waveId !== "BI.W-P000", "prepare-dispatch requires one post-bootstrap wave", "BI_DISPATCH_RED");
    return runLockedMutation(repositoryRoot, "prepare-dispatch", { waveId, plan });
}

async function prepareDispatchLaneUnlocked({ root, waveId, plan, paths }) {
    const recovered = await recoverCursor({ root, at: "HEAD", readOnly: true });
    assert(recovered.cursor.atCommit === resolveCommit(root, "HEAD"),
        "prepare-dispatch must use the current worktree HEAD", "BI_CURSOR_STALE");
    const dispatchReceipts = await loadDispatchReceipts(root);
    const journals = await loadJournals(root, dispatchReceipts, {
        maxLiveAgents: recovered.formation.dag.maxLiveAgents,
    });
    const journal = journals.find((candidate) => candidate.waveId === waveId);
    assert(journal?.state === "RUNNING", `${waveId}: dispatch cannot be prepared before its RUNNING journal`, "BI_DISPATCH_RED");
    const leaseErrors = validateJournalLeases(root, recovered.cursor, journal);
    assert(leaseErrors.length === 0, leaseErrors.join("\n"), "BI_CURSOR_STALE");
    const wave = recovered.formation.waves.waves.find((candidate) => candidate.id === waveId);
    assert(wave, `${waveId}: unknown dispatch wave`, "BI_DISPATCH_RED");
    const rendered = renderDispatchReceiptForWave({
        root,
        recovered,
        wave,
        integrationParent: journal.integrationParent,
        plan,
    });
    const existingReceipt = dispatchReceipts.byLaneId.get(rendered.receipt.laneId);
    assert(!existingReceipt || existingReceipt.digest === rendered.receiptSha256,
        `${rendered.receipt.laneId}: dispatch retry conflicts with its immutable receipt digest`, "BI_DISPATCH_RED");
    const privateState = await validatePrivateCache(root, recovered, {
        expectedDispatchDigests: new Set([rendered.receiptSha256]),
        dispatchReceipts,
        journals,
    });
    assert(privateState.errors.length === 0, privateState.errors.join("\n"), "BI_CURSOR_STALE");
    const attached = journal.lanes.find((lane) => lane.laneId === rendered.receipt.laneId);
    if (attached) {
        assert(attached.receiptSha256 === rendered.receiptSha256,
            `${rendered.receipt.laneId}: attached dispatch lane has a different receipt digest`, "BI_DISPATCH_RED");
        return {
            status: attached.state,
            dispatchAction: attached.state === "ACTIVE" ? "RECONCILE_PLATFORM" : "NO_DISPATCH",
            waveId,
            laneId: attached.laneId,
            receiptSha256: attached.receiptSha256,
            idempotent: true,
        };
    }
    assertDispatchAdditions({
        journals,
        receipts: dispatchReceipts,
        rendered: [rendered],
        maxLiveAgents: recovered.formation.dag.maxLiveAgents,
    });
    await publishDispatchReceipt(paths, rendered);
    const nextJournal = {
        ...journal,
        lanes: [...journal.lanes, {
            laneId: rendered.receipt.laneId,
            receiptSha256: rendered.receiptSha256,
            state: "ACTIVE",
        }].sort((left, right) => comparePaths(left.laneId, right.laneId)),
    };
    await durableWrite(journalPath(paths, waveId), `${JSON.stringify(nextJournal, null, 2)}\n`);
    const revalidated = await validatePrivateCache(root, recovered);
    assert(revalidated.errors.length === 0, revalidated.errors.join("\n"), "BI_DISPATCH_RED");
    return {
        status: "ACTIVE",
        dispatchAction: "AUTHORIZE_NEW_DISPATCH",
        waveId,
        laneId: rendered.receipt.laneId,
        receiptSha256: rendered.receiptSha256,
        idempotent: false,
    };
}

export async function settleDispatchLane({ root = DEFAULT_ROOT, waveId, laneId, receiptSha256 } = {}) {
    const repositoryRoot = resolve(root);
    assert(WAVE_ID.test(waveId ?? "") && waveId !== "BI.W-P000", "settle-dispatch requires one post-bootstrap wave", "BI_DISPATCH_RED");
    assert(DISPATCH_LANE_ID.test(laneId ?? "") && SHA256.test(receiptSha256 ?? ""),
        "settle-dispatch requires one canonical lane and receipt digest", "BI_DISPATCH_RED");
    return runLockedMutation(repositoryRoot, "settle-dispatch", { waveId, laneId, receiptSha256 });
}

async function settleDispatchLaneUnlocked({ root, waveId, laneId, receiptSha256, paths }) {
    const recovered = await recoverCursor({ root, at: "HEAD", readOnly: true });
    assert(recovered.cursor.atCommit === resolveCommit(root, "HEAD"),
        "settle-dispatch must use the current worktree HEAD", "BI_CURSOR_STALE");
    const privateState = await validatePrivateCache(root, recovered);
    assert(privateState.errors.length === 0, privateState.errors.join("\n"), "BI_CURSOR_STALE");
    const journal = privateState.journals.find((candidate) => candidate.waveId === waveId);
    assert(journal?.state === "RUNNING", `${waveId}: dispatch lane cannot settle outside its RUNNING journal`, "BI_DISPATCH_RED");
    const leaseErrors = validateJournalLeases(root, recovered.cursor, journal);
    assert(leaseErrors.length === 0, leaseErrors.join("\n"), "BI_CURSOR_STALE");
    const lane = journal.lanes.find((candidate) => candidate.laneId === laneId);
    assert(lane && lane.receiptSha256 === receiptSha256,
        `${laneId}: settle-dispatch tuple does not identify one attached lane`, "BI_DISPATCH_RED");
    if (lane.state === "SETTLED") {
        return { status: "SETTLED", dispatchAction: "NO_DISPATCH", waveId, laneId, receiptSha256, idempotent: true };
    }
    const nextJournal = {
        ...journal,
        lanes: journal.lanes.map((candidate) => candidate.laneId === laneId
            ? { ...candidate, state: "SETTLED" }
            : candidate),
    };
    await durableWrite(journalPath(paths, waveId), `${JSON.stringify(nextJournal, null, 2)}\n`);
    const revalidated = await validatePrivateCache(root, recovered);
    assert(revalidated.errors.length === 0, revalidated.errors.join("\n"), "BI_DISPATCH_RED");
    return { status: "SETTLED", dispatchAction: "NO_DISPATCH", waveId, laneId, receiptSha256, idempotent: false };
}

export async function integrateWave({ root = DEFAULT_ROOT, waveId, commit = "HEAD" } = {}) {
    const repositoryRoot = resolve(root);
    assert(WAVE_ID.test(waveId ?? "") && waveId !== "BI.W-P000", "integrate requires one post-bootstrap --wave");
    return runLockedMutation(repositoryRoot, "integrate", { waveId, commit });
}

export async function terminalizeWave({ root = DEFAULT_ROOT, waveId, commit = "HEAD", status } = {}) {
    const repositoryRoot = resolve(root);
    assert(WAVE_ID.test(waveId ?? "") && waveId !== "BI.W-P000", "terminalize requires one post-bootstrap --wave");
    assert(TERMINAL.has(status), "terminalize --status must be DONE or evidence-backed DEAD");
    return runLockedMutation(repositoryRoot, "terminalize", { waveId, commit, status });
}

async function integrateWaveUnlocked({ root, waveId, commit, paths }) {
    const containingCommit = resolveCommit(root, commit);
    assert(containingCommit === resolveCommit(root, "HEAD"), "integrate may mutate cache only for the current worktree HEAD", "BI_CURSOR_STALE");
    const recovered = await recoverCursor({ root, at: containingCommit, readOnly: true });
    const dispatchReceipts = await loadDispatchReceipts(root);
    const journals = await loadJournals(root, dispatchReceipts, {
        maxLiveAgents: recovered.formation.dag.maxLiveAgents,
    });
    const dispatchErrors = [
        ...dispatchReceipts.rows.flatMap((row) => dispatchReceiptAuthorityErrors(root, recovered, row)),
        ...dispatchReceiptReconciliationErrors(recovered, journals, dispatchReceipts, new Set()),
    ];
    assert(dispatchErrors.length === 0, dispatchErrors.join("\n"), "BI_DISPATCH_RED");
    const journal = journals.find((item) => item.waveId === waveId);
    assert(journal, `${waveId}: integrated commit has no prior RUNNING journal`, "BI_CURSOR_RED");
    assert(journal.state === "RUNNING", `${waveId}: transaction was already integrated`, "BI_CURSOR_RED");
    assert(journal.lanes.every((lane) => lane.state === "SETTLED"),
        `${waveId}: integrate cannot proceed while its dispatch lanes are ACTIVE`, "BI_DISPATCH_RED");
    const row = recovered.cursor.waves[waveId];
    assert(TERMINAL.has(row.status) && row.commit === containingCommit, `${waveId}: ${containingCommit} is not its unique terminal containing commit`, "BI_LINEAGE_RED");
    const leaseErrors = validateJournalLeases(root, recovered.cursor, journal);
    assert(leaseErrors.length === 0, leaseErrors.join("\n"), "BI_CURSOR_STALE");
    const receiptBytes = commitBytes(root, containingCommit, row.receiptPath);
    const nextJournal = {
        ...journal,
        state: "INTEGRATED",
        commit: containingCommit,
        receiptSha256: sha256(receiptBytes),
    };
    await durableWrite(journalPath(paths, waveId), `${JSON.stringify(nextJournal, null, 2)}\n`);
    await loadJournals(root, dispatchReceipts, { maxLiveAgents: recovered.formation.dag.maxLiveAgents });
    const remaining = journals.map((item) => item.waveId === waveId ? nextJournal : item);
    const overlay = overlayJournals(root, recovered.cursor, remaining);
    assert(overlay.errors.length === 0, overlay.errors.join("\n"));
    await writeCache(paths, overlay.cursor);
    return { status: "INTEGRATED", waveId, commit: containingCommit, receiptSha256: nextJournal.receiptSha256, cursorSha256: cursorDigest(overlay.bytes) };
}

async function terminalizeWaveUnlocked({ root, waveId, commit, status, paths }) {
    const containingCommit = resolveCommit(root, commit);
    assert(containingCommit === resolveCommit(root, "HEAD"), "terminalize may mutate cache only for the current worktree HEAD", "BI_CURSOR_STALE");
    const recovered = await recoverCursor({ root, at: containingCommit, readOnly: true });
    const dispatchReceipts = await loadDispatchReceipts(root);
    const journals = await loadJournals(root, dispatchReceipts, {
        maxLiveAgents: recovered.formation.dag.maxLiveAgents,
    });
    const dispatchErrors = [
        ...dispatchReceipts.rows.flatMap((row) => dispatchReceiptAuthorityErrors(root, recovered, row)),
        ...dispatchReceiptReconciliationErrors(recovered, journals, dispatchReceipts, new Set()),
    ];
    assert(dispatchErrors.length === 0, dispatchErrors.join("\n"), "BI_DISPATCH_RED");
    const journal = journals.find((item) => item.waveId === waveId);
    assert(journal?.state === "INTEGRATED" && journal.commit === containingCommit, `${waveId}: terminalize requires its exact INTEGRATED journal`);
    const row = recovered.cursor.waves[waveId];
    assert(row.status === status && row.commit === containingCommit, `${waveId}: terminal status/commit differs from first-parent authority`, "BI_LINEAGE_RED");
    await durableUnlink(journalPath(paths, waveId));
    const remaining = journals.filter((item) => item.waveId !== waveId);
    const overlay = overlayJournals(root, recovered.cursor, remaining);
    assert(overlay.errors.length === 0, overlay.errors.join("\n"));
    await writeCache(paths, overlay.cursor);
    const revalidated = await validatePrivateCache(root, recovered);
    assert(revalidated.errors.length === 0, revalidated.errors.join("\n"), "BI_DISPATCH_RED");
    return { status, waveId, commit: containingCommit, cursorSha256: cursorDigest(overlay.bytes) };
}

async function validateStagedCandidate({ root, waveId, ref, trailerMessage, recovered, profile, requireTerminal }) {
    const errors = [];
    const parsed = parseCommitTrailers(trailerMessage);
    if (parsed.duplicates.length > 0) errors.push(`duplicate BI trailers: ${[...new Set(parsed.duplicates)].join(", ")}`);
    if (parsed.unexpected.length > 0) errors.push(`unexpected BI trailers: ${[...new Set(parsed.unexpected)].join(", ")}`);
    if (parsed.trailers.get("BI-Wave") !== waveId) errors.push(`staged BI-Wave trailer does not select ${waveId}`);
    const wave = recovered.formation.waves.waves.find((item) => item.id === waveId);
    if (!wave) return { errors: [...errors, `${waveId}: absent from current formation authority`] };
    errors.push(...ensureIntegrationReady(recovered.cursor, wave, recovered.formation.dag));
    const parent = resolveCommit(root, ref);
    if (parent !== recovered.cursor.atCommit) errors.push("staged candidate parent differs from recovered authoritative ref");
    const validated = validateWaveTuple({
        root,
        wave,
        formationDigest: recovered.cursor.formationDigest,
        parent,
        view: "index",
        ref: parent,
        trailerMessage,
    });
    errors.push(...validated.errors);
    const dispatchReceipts = await loadDispatchReceipts(root);
    const journals = await loadJournals(root, dispatchReceipts, {
        maxLiveAgents: recovered.formation.dag.maxLiveAgents,
    });
    const journal = journals.find((item) => item.waveId === waveId);
    if (!journal || journal.state !== "RUNNING") errors.push(`${waveId}: staged transaction lacks its prior RUNNING journal`);
    else {
        errors.push(...validateJournalLeases(root, recovered.cursor, journal));
        if (journal.lanes.some((lane) => lane.state === "ACTIVE")) {
            errors.push(`${waveId}: staged transaction cannot verify while its dispatch lanes are ACTIVE`);
        }
    }
    let semanticTest = null;
    let releaseProjection = null;
    const structurallyValid = errors.length === 0 && TERMINAL.has(validated.receipt?.status);
    if (structurallyValid && validated.receipt.status === "DONE") {
        try {
            semanticTest = await executeWaveSemanticTests({
                root,
                wave,
                view: "index",
                ref: parent,
                cursor: recovered.cursor,
                formation: recovered.formation,
            });
            appendSemanticRequirementError(errors, semanticTest);
        } catch (error) {
            errors.push(error.message);
        }
    }
    if (structurallyValid) {
        try {
            releaseProjection = wave.id === "BI.W-P002" && validated.receipt.status === "DEAD"
                ? validateP002WithdrawalProjection({
                    root,
                    wave,
                    receipt: validated.receipt,
                    receiptBytes: validated.receiptBytes,
                    view: "index",
                    ref: parent,
                    profile,
                    requireTerminal,
                })
                : await executeReleaseProjectionAdapter({
                    root,
                    wave,
                    view: "index",
                    ref: parent,
                    profile,
                    requireTerminal,
                });
            errors.push(...releaseProjection.errors);
            errors.push(...releaseProjectionCursorErrors(
                releaseProjection,
                stagedProjectionCursor(recovered.cursor, wave.id, validated.receipt.status),
            ));
        } catch (error) {
            errors.push(error.message);
        }
    }
    return { ...validated, semanticTest, releaseProjection, errors };
}

async function recoverExecutionState({ root, at }) {
    const recovered = await recoverCursor({ root, at, readOnly: true });
    const selected = await selectedExecutionState(root, recovered, { checkCached: false });
    assert(selected.errors.length === 0, selected.errors.join("\n"), "BI_DISPATCH_RED");
    return {
        ...recovered,
        gitCursor: recovered.cursor,
        cursor: selected.cursor,
        bytes: selected.bytes,
        sha256: cursorDigest(selected.bytes),
        journals: selected.journals,
        historical: selected.historical,
    };
}

export async function verifyRecoveredState({
    root = DEFAULT_ROOT,
    waveId,
    profile = "ci",
    requireTerminal = false,
    ref = "HEAD",
    trailerMessage = null,
} = {}) {
    const errors = [];
    try {
        const repositoryRoot = resolve(root);
        assert(WAVE_ID.test(waveId ?? ""), `${String(waveId)}: verifier requires one declared BI wave`);
        const recovered = await recoverExecutionState({ root: repositoryRoot, at: ref });
        let candidate = null;
        let selectedView = "commit";
        let semanticTest = null;
        let releaseProjection = null;
        if (trailerMessage !== null) {
            const selected = recovered.gitCursor.waves[waveId];
            const resolvedRef = resolveCommit(repositoryRoot, ref);
            const selectedMessage = commitMessage(repositoryRoot, resolvedRef);
            if (TERMINAL.has(selected?.status) && selected.commit === resolvedRef) {
                if (selectedMessage !== trailerMessage) errors.push(`${waveId}: supplied message differs from its committed transaction message`);
                const receiptBytes = commitBytes(repositoryRoot, resolvedRef, selected.receiptPath, { allowMissing: true });
                candidate = { receiptSha256: receiptBytes ? sha256(receiptBytes) : null, errors: [] };
                const wave = recovered.formation.waves.waves.find((item) => item.id === waveId);
                if (errors.length === 0 && wave && receiptBytes) {
                    if (selected.status === "DONE") try {
                        semanticTest = await executeWaveSemanticTests({
                            root: repositoryRoot,
                            wave,
                            view: "commit",
                            ref: resolvedRef,
                            cursor: recovered.gitCursor,
                            formation: recovered.formation,
                        });
                        appendSemanticRequirementError(errors, semanticTest);
                    } catch (error) {
                        errors.push(error.message);
                    }
                    try {
                        releaseProjection = await executeTerminalReleaseProjection({
                            root: repositoryRoot,
                            wave,
                            status: selected.status,
                            receiptBytes,
                            view: "commit",
                            ref: resolvedRef,
                            profile,
                            requireTerminal,
                        });
                        errors.push(...releaseProjection.errors);
                        errors.push(...releaseProjectionCursorErrors(releaseProjection, recovered.gitCursor));
                    } catch (error) {
                        errors.push(error.message);
                    }
                }
            } else if (selected?.status === "PLANNED" || selected?.status === "RUNNING") {
                selectedView = "index";
                if (selectedMessage === trailerMessage) errors.push(`${waveId}: staged candidate message cannot alias the current parent commit message`);
                const stagedRecovery = { ...recovered, cursor: recovered.gitCursor };
                candidate = await validateStagedCandidate({
                    root: repositoryRoot,
                    waveId,
                    ref,
                    trailerMessage,
                    recovered: stagedRecovery,
                    profile,
                    requireTerminal,
                });
                errors.push(...candidate.errors);
                semanticTest = candidate.semanticTest;
                releaseProjection = candidate.releaseProjection;
            } else errors.push(`${waveId}: trailer message cannot be attributed unambiguously to staged or committed state`);
        } else {
            const wave = recovered.formation.waves.waves.find((item) => item.id === waveId);
            if (!wave) errors.push(`${waveId}: absent from current formation authority`);
            else {
                const row = recovered.cursor.waves[waveId];
                if (!TERMINAL.has(row.status)) errors.push(`${waveId}: committed verification requires a terminal receipt/tuple at ref; recovered ${row.status}`);
                else {
                    const receiptBytes = commitBytes(repositoryRoot, row.commit, row.receiptPath, { allowMissing: true });
                    candidate = { receiptSha256: receiptBytes ? sha256(receiptBytes) : null, errors: [] };
                    if (row.status === "DONE") {
                        try {
                            semanticTest = await executeWaveSemanticTests({
                                root: repositoryRoot,
                                wave,
                                view: "commit",
                                ref: row.commit,
                                cursor: recovered.gitCursor,
                                formation: recovered.formation,
                            });
                            appendSemanticRequirementError(errors, semanticTest);
                        } catch (error) {
                            errors.push(error.message);
                        }
                    }
                    if (receiptBytes) {
                        try {
                            releaseProjection = await executeTerminalReleaseProjection({
                                root: repositoryRoot,
                                wave,
                                status: row.status,
                                receiptBytes,
                                view: "commit",
                                ref: row.commit,
                                profile,
                                requireTerminal,
                            });
                            errors.push(...releaseProjection.errors);
                            const selectedCursor = row.commit === recovered.gitCursor.atCommit
                                ? recovered.gitCursor
                                : (await recoverCursor({ root: repositoryRoot, at: row.commit, readOnly: true })).cursor;
                            errors.push(...releaseProjectionCursorErrors(releaseProjection, selectedCursor));
                        } catch (error) {
                            errors.push(error.message);
                        }
                    }
                }
            }
        }
        if (requireTerminal || profile === "release") {
            const survivingRunning = recovered.journals.filter((journal) => journal.state === "RUNNING");
            if (survivingRunning.length > 0) {
                errors.push(`terminal release rejects surviving RUNNING journals (${survivingRunning.map((journal) => journal.waveId).join(", ")})`);
            }
            if (recovered.cursor.withdrawn) errors.push("P002 DEAD withdrew release authority on this lineage");
            const declaredWaveCount = Object.keys(recovered.cursor.waves).length;
            if (recovered.cursor.terminalCount !== declaredWaveCount) errors.push(`release requires every declared wave terminal; recovered ${recovered.cursor.terminalCount}/${declaredWaveCount}`);
            const nonDone = Object.entries(recovered.cursor.waves).filter(([, row]) => row.status !== "DONE").map(([id, row]) => `${id}:${row.status}`);
            if (nonDone.length > 0) errors.push(`release requires every wave DONE (${nonDone.join(", ")})`);
            const exactHead = resolveCommit(repositoryRoot, "HEAD");
            if (selectedView !== "commit"
                || recovered.cursor.atCommit !== exactHead
                || releaseProjection?.evidence?.selectedRef !== exactHead
                || releaseProjection?.evidence?.profile !== "release"
                || releaseProjection?.evidence?.requireTerminal !== true) {
                errors.push("terminal release requires exact-HEAD release projection verification");
            }
            if (releaseProjection?.status !== "PASS"
                || releaseProjection?.evidence?.projectionStatus !== "TERMINAL_PROJECTION"
                || releaseProjection?.evidence?.releaseEligible !== true) {
                errors.push("terminal release projection is not verified, terminal, and release-eligible");
            }
        }
        const evidence = {
            schemaVersion: "1.0.0",
            authority: AUTHORITY,
            waveId,
            profile,
            formationDigest: recovered.cursor.formationDigest,
            sourceBase: SOURCE_BASE,
            atCommit: recovered.cursor.atCommit,
            atTree: recovered.cursor.atTree,
            cursorSha256: cursorDigest(recovered.bytes),
            terminalCount: recovered.cursor.terminalCount,
            withdrawn: recovered.cursor.withdrawn,
            graph: {
                nodeCount: recovered.formation.dag.nodeCount,
                edgeCount: recovered.formation.dag.edgeCount,
                stratumCount: recovered.formation.dag.stratumCount,
                maxLiveAgents: recovered.formation.dag.maxLiveAgents,
            },
            candidateReceiptSha256: candidate?.receiptSha256 ?? null,
            selectedView,
            semanticTest,
            releaseProjection,
        };
        return {
            status: errors.length === 0 ? "PASS" : "RED",
            errors,
            evidence,
            evidenceDigest: sha256(canonicalJson(evidence)),
            receiptSha256: candidate?.receiptSha256 ?? null,
        };
    } catch (error) {
        return {
            status: "RED",
            errors: [error.message],
            evidenceDigest: null,
        };
    }
}

async function recoverWritable({ root, at }) {
    const repositoryRoot = resolve(root);
    return runLockedMutation(repositoryRoot, "recover", { at });
}

async function recoverWritableUnlocked({ root, at, paths }) {
    const recovered = await recoverCursor({ root, at, readOnly: true });
    assert(recovered.cursor.atCommit === resolveCommit(root, "HEAD"), "writable recover must bind the current worktree HEAD; use --read-only for historical refs", "BI_CURSOR_STALE");
    const dispatchReceipts = await loadDispatchReceipts(root);
    const journals = await loadJournals(root, dispatchReceipts, {
        maxLiveAgents: recovered.formation.dag.maxLiveAgents,
    });
    const dispatchErrors = [
        ...dispatchReceipts.rows.flatMap((row) => dispatchReceiptAuthorityErrors(root, recovered, row)),
        ...dispatchReceiptReconciliationErrors(recovered, journals, dispatchReceipts, new Set()),
    ];
    assert(dispatchErrors.length === 0, dispatchErrors.join("\n"), "BI_DISPATCH_RED");
    const overlay = overlayJournals(root, recovered.cursor, journals);
    assert(overlay.errors.length === 0, overlay.errors.join("\n"));
    await writeCache(paths, overlay.cursor);
    return { cursor: overlay.cursor, bytes: overlay.bytes, sha256: cursorDigest(overlay.bytes), journals: journals.length };
}

async function recoverReadOnlyExecution({ root, at }) {
    const recovered = await recoverExecutionState({ root: resolve(root), at });
    return { cursor: recovered.cursor, bytes: recovered.bytes, sha256: recovered.sha256, journals: recovered.journals.length };
}

const COMMAND_OPTIONS = {
    validate: new Set(["root", "at", "json"]),
    start: new Set(["root", "wave", "at", "plansJson", "json"]),
    "prepare-dispatch": new Set(["root", "wave", "planJson", "json"]),
    "settle-dispatch": new Set(["root", "wave", "lane", "receiptSha256", "json"]),
    integrate: new Set(["root", "wave", "commit", "json"]),
    terminalize: new Set(["root", "wave", "commit", "status", "json"]),
    recover: new Set(["root", "at", "readOnly", "json"]),
};
const FLAG_OPTIONS = new Set(["json", "readOnly"]);

export function parseCursorArgs(argv) {
    const [command, ...rest] = argv;
    if (!COMMAND_OPTIONS[command]) throw new CursorError("expected exactly one command: validate, start, prepare-dispatch, settle-dispatch, integrate, terminalize, or recover", "BI_CURSOR_USAGE");
    const options = { command };
    for (let index = 0; index < rest.length; index += 1) {
        const token = rest[index];
        if (!token.startsWith("--") || token === "--") throw new CursorError(`unexpected positional argument: ${token}`, "BI_CURSOR_USAGE");
        const raw = token.slice(2);
        const key = raw.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        if (!COMMAND_OPTIONS[command].has(key)) throw new CursorError(`${command}: unknown option ${token}`, "BI_CURSOR_USAGE");
        if (Object.hasOwn(options, key)) throw new CursorError(`${command}: duplicate option ${token}`, "BI_CURSOR_USAGE");
        if (FLAG_OPTIONS.has(key)) {
            options[key] = true;
            continue;
        }
        const value = rest[index + 1];
        if (value === undefined || value.startsWith("--")) throw new CursorError(`${token} requires one value`, "BI_CURSOR_USAGE");
        options[key] = value;
        index += 1;
    }
    options.root = resolve(options.root ?? DEFAULT_ROOT);
    options.at ??= "HEAD";
    if (["start", "prepare-dispatch", "settle-dispatch", "integrate", "terminalize"].includes(command) && !WAVE_ID.test(options.wave ?? "")) throw new CursorError(`${command} requires one canonical --wave BI.W-Pddd identity`, "BI_CURSOR_USAGE");
    try {
        if (command === "start") {
            options.initialPlans = options.plansJson === undefined ? [] : JSON.parse(options.plansJson);
            if (!Array.isArray(options.initialPlans)) throw new Error("expected an array");
        }
        if (command === "prepare-dispatch") {
            if (options.planJson === undefined) throw new Error("--plan-json is required");
            options.plan = JSON.parse(options.planJson);
        }
    } catch (error) {
        throw new CursorError(`${command}: invalid dispatch JSON (${error.message})`, "BI_CURSOR_USAGE");
    }
    if (command === "settle-dispatch"
        && (!DISPATCH_LANE_ID.test(options.lane ?? "") || !SHA256.test(options.receiptSha256 ?? ""))) {
        throw new CursorError("settle-dispatch requires --lane and --receipt-sha256", "BI_CURSOR_USAGE");
    }
    if (command === "terminalize" && !TERMINAL.has(options.status)) throw new CursorError("terminalize requires --status DONE or DEAD", "BI_CURSOR_USAGE");
    if (["integrate", "terminalize"].includes(command)) options.commit ??= "HEAD";
    return options;
}

export async function runCursor(optionsOrArgv) {
    const options = Array.isArray(optionsOrArgv) ? parseCursorArgs(optionsOrArgv) : optionsOrArgv;
    switch (options.command) {
        case "validate": {
            const result = await validateCursor({ root: options.root, at: options.at });
            if (!result.ok) throw new CursorError(result.errors.join("\n"));
            return { status: "PASS", operation: "validate", ...result };
        }
        case "start":
            return { operation: "start", ...await startWave({ root: options.root, waveId: options.wave, at: options.at, initialPlans: options.initialPlans }) };
        case "prepare-dispatch":
            return { operation: "prepare-dispatch", ...await prepareDispatchLane({ root: options.root, waveId: options.wave, plan: options.plan }) };
        case "settle-dispatch":
            return { operation: "settle-dispatch", ...await settleDispatchLane({
                root: options.root,
                waveId: options.wave,
                laneId: options.lane,
                receiptSha256: options.receiptSha256,
            }) };
        case "integrate":
            return { operation: "integrate", ...await integrateWave({ root: options.root, waveId: options.wave, commit: options.commit }) };
        case "terminalize":
            return { operation: "terminalize", ...await terminalizeWave({ root: options.root, waveId: options.wave, commit: options.commit, status: options.status }) };
        case "recover": {
            const result = options.readOnly
                ? await recoverReadOnlyExecution({ root: options.root, at: options.at })
                : await recoverWritable({ root: options.root, at: options.at });
            return { status: "PASS", operation: "recover", readOnly: Boolean(options.readOnly), ...result };
        }
        default:
            throw new CursorError(`unsupported cursor command: ${String(options.command)}`, "BI_CURSOR_USAGE");
    }
}

function printable(result) {
    const cursor = result.cursor;
    const wave = result.waveId ? ` ${result.waveId}` : "";
    const terminal = cursor ? ` ${cursor.terminalCount}/${Object.keys(cursor.waves).length} terminal` : "";
    return `[tranche-cursor] ${result.operation} ${result.status ?? "PASS"}${wave}${terminal}\n`;
}

async function lockedWorker(encoded) {
    try {
        assert(process.env.BI_CURSOR_LOCKED_WORKER === "1", "locked worker marker is absent", "BI_CURSOR_LOCKED");
        const payload = JSON.parse(Buffer.from(String(encoded), "base64url").toString("utf8"));
        assert(payload && ["start", "prepare-dispatch", "settle-dispatch", "integrate", "terminalize", "recover"].includes(payload.operation), "locked worker operation is invalid", "BI_CURSOR_USAGE");
        const root = resolve(payload.root);
        const paths = gitPrivatePaths(root);
        await writeLockMetadata(paths, payload.operation, root);
        await cleanupDispatchStagingFiles(paths);
        let value;
        if (payload.operation === "start") value = await startWaveUnlocked({ root, paths, ...payload.args });
        else if (payload.operation === "prepare-dispatch") value = await prepareDispatchLaneUnlocked({ root, paths, ...payload.args });
        else if (payload.operation === "settle-dispatch") value = await settleDispatchLaneUnlocked({ root, paths, ...payload.args });
        else if (payload.operation === "integrate") value = await integrateWaveUnlocked({ root, paths, ...payload.args });
        else if (payload.operation === "terminalize") value = await terminalizeWaveUnlocked({ root, paths, ...payload.args });
        else value = await recoverWritableUnlocked({ root, paths, ...payload.args });
        process.stdout.write(`${JSON.stringify({ ok: true, value })}\n`);
    } catch (error) {
        process.stdout.write(`${JSON.stringify({ ok: false, error: error.message, code: error.code ?? "BI_CURSOR_INTERNAL" })}\n`);
        process.exitCode = 1;
    }
}

async function main() {
    let options;
    try {
        options = parseCursorArgs(process.argv.slice(2));
        const result = await runCursor(options);
        if (options.json) process.stdout.write(`${JSON.stringify(result)}\n`);
        else process.stdout.write(printable(result));
    } catch (error) {
        const payload = { status: "RED", errors: [error.message], code: error.code ?? "BI_CURSOR_INTERNAL" };
        if (options?.json || process.argv.includes("--json")) process.stdout.write(`${JSON.stringify(payload)}\n`);
        else process.stderr.write(`[tranche-cursor] RED ${error.message}\n`);
        process.exitCode = error.code === "BI_CURSOR_USAGE" ? 64 : 1;
    }
}

const invoked = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invoked && process.argv[2] === "--locked-worker") lockedWorker(process.argv[3]);
else if (invoked) main();
