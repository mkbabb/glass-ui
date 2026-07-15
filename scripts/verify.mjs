import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import {
    existsSync,
    lstatSync,
    chmodSync,
    mkdirSync,
    mkdtempSync,
    readFileSync,
    readlinkSync,
    readdirSync,
    realpathSync,
    rmSync,
    symlinkSync,
    writeFileSync,
} from "node:fs";
import { readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, isAbsolute, join, posix, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { compileTemplate, parse as parseVueSfc } from "@vue/compiler-sfc";
import postcss from "postcss";
import ts from "typescript";

import {
    discoverEvidencePlan,
    validateEvidencePlan,
} from "./verification/discover.mjs";
import { selectInvariantFamilies, validateInvariantTaxonomy } from "./verification/invariants.mjs";
import { runMutationContract } from "./verification/mutation-fixtures.mjs";
import {
    INTEGRATION_ADJUNCTS,
    authoritativeBootstrapContext,
    canonicalStage0Payload,
    canonicalJson,
    deriveSubjectOutcomes,
    receiptDigest,
    readRepositoryEntries,
    validateBootstrapReceipt,
    validateFormationTreeClosure,
    validateSubjectDeltaClosure,
} from "./tranche/bootstrap-receipt.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = resolve(HERE, "..");
const DEFAULT_BOOTSTRAP_PLAN = "docs/tranches/BI/FORMATION/execution-bootstrap-plan.seed.json";
const DEFAULT_BOOTSTRAP_RECEIPT = "docs/tranches/BI/BOOTSTRAP.json";
const VERIFICATION_FILES = new Set([
    "scripts/verification/discover.mjs",
    "scripts/verification/evidence-plan.schema.json",
    "scripts/verification/external-scenario.schema.json",
    "scripts/verification/invariants.mjs",
    "scripts/verification/mutation-fixtures.mjs",
]);
const EXACT_EXECUTION_SCOPE_ROOTS = Object.freeze([
    ".githooks",
    ".github",
    "demo",
    "scripts",
    "src",
    "tests",
    "tests-visual",
    "docs/tranches/BI/FORMATION",
]);
const EXACT_EXECUTION_INPUT_EXCLUSIONS = Object.freeze([
    ".git",
    "node_modules",
    "dist",
    ".cache",
    ".vite",
    ".vitest",
    ".tmp",
]);
const CORE_TRAILERS = ["BI-Wave", "BI-Status", "BI-Receipt-SHA256", "BI-Formation-SHA256"];
const SHA256 = /^[0-9a-f]{64}$/;
const GIT_SHA = /^[0-9a-f]{40}$/;
const WAVE_ID = /^BI\.W-P[0-9]{3}$/;
const CI_PR_HEAD_CHECKOUT_REF = "${{ github.event_name == 'pull_request' && github.event.pull_request.head.sha || github.sha }}";
const FALLBACK_GIT_LOCAL_ENV_VARS = Object.freeze([
    "GIT_ALTERNATE_OBJECT_DIRECTORIES", "GIT_CONFIG", "GIT_CONFIG_PARAMETERS", "GIT_CONFIG_COUNT",
    "GIT_OBJECT_DIRECTORY", "GIT_DIR", "GIT_WORK_TREE", "GIT_IMPLICIT_WORK_TREE", "GIT_GRAFT_FILE",
    "GIT_INDEX_FILE", "GIT_NO_REPLACE_OBJECTS", "GIT_REPLACE_REF_BASE", "GIT_PREFIX",
    "GIT_INTERNAL_SUPER_PREFIX", "GIT_SHALLOW_FILE", "GIT_COMMON_DIR",
]);
export const CHILD_ENVIRONMENT_REMOVAL_POLICY = Object.freeze({
    exactNames: Object.freeze([...FALLBACK_GIT_LOCAL_ENV_VARS, "NODE_OPTIONS", "NODE_PATH"].sort(comparePaths)),
    caseInsensitiveNames: Object.freeze(["npm_config_node_options", "npm_config_script_shell"]),
    caseInsensitiveOverrides: Object.freeze(["npm_config_globalconfig", "npm_config_userconfig"]),
    forcedValues: Object.freeze({
        NPM_CONFIG_GLOBALCONFIG: "$EXACT_VIEW/.git/BI-P000-NPM-CONFIG/global.npmrc",
        NPM_CONFIG_USERCONFIG: "$EXACT_VIEW/.git/BI-P000-NPM-CONFIG/user.npmrc",
    }),
    trustedExternalBoundary: Object.freeze({
        PATH: "TRUSTED_TOOLCHAIN_RESOLUTION",
        trackedProjectNpmrc: "RETAINED_FROM_EXACT_REPOSITORY_VIEW",
    }),
});

export const EXIT = Object.freeze({
    PASS: 0,
    RED: 1,
    USAGE: 64,
    INVALID_CONTRACT: 65,
    MISSING_INPUT: 66,
    INTERNAL: 70,
    STATE_UNAVAILABLE: 75,
});

class VerifierFailure extends Error {
    constructor(message, exitCode) {
        super(message);
        this.name = "VerifierFailure";
        this.exitCode = exitCode;
    }
}

function git(root, args, { allowFailure = false, encoding = "utf8" } = {}) {
    const result = spawnSync("git", ["-C", root, ...args], {
        encoding,
        maxBuffer: 128 * 1024 * 1024,
        stdio: ["ignore", "pipe", "pipe"],
    });
    if (result.error) throw result.error;
    if (result.status !== 0 && !allowFailure) {
        throw new VerifierFailure(`git ${args.join(" ")} failed: ${(result.stderr || "").toString().trim()}`, EXIT.STATE_UNAVAILABLE);
    }
    return result;
}

export function sanitizedRepositoryEnvironment(baseEnvironment = process.env, { npmConfigDirectory } = {}) {
    const environment = { ...baseEnvironment };
    for (const name of CHILD_ENVIRONMENT_REMOVAL_POLICY.exactNames) delete environment[name];
    for (const name of Object.keys(environment)) {
        const normalized = name.toLowerCase();
        if (CHILD_ENVIRONMENT_REMOVAL_POLICY.caseInsensitiveNames.includes(normalized)
            || CHILD_ENVIRONMENT_REMOVAL_POLICY.caseInsensitiveOverrides.includes(normalized)) delete environment[name];
    }
    const discovered = spawnSync("git", ["rev-parse", "--local-env-vars"], {
        encoding: "utf8",
        env: environment,
        stdio: ["ignore", "pipe", "ignore"],
    });
    if (!discovered.error && discovered.status === 0) {
        for (const name of discovered.stdout.split(/\r?\n/).filter(Boolean)) delete environment[name];
    }
    environment.CI = "1";
    environment.NO_COLOR = "1";
    environment.FORCE_COLOR = "0";
    if (npmConfigDirectory) {
        mkdirSync(npmConfigDirectory, { recursive: true });
        const globalConfigPath = resolve(npmConfigDirectory, "global.npmrc");
        const userConfigPath = resolve(npmConfigDirectory, "user.npmrc");
        writeFileSync(globalConfigPath, "", { mode: 0o600 });
        writeFileSync(userConfigPath, "", { mode: 0o600 });
        environment.NPM_CONFIG_GLOBALCONFIG = globalConfigPath;
        environment.NPM_CONFIG_USERCONFIG = userConfigPath;
    }
    return environment;
}

function sha256(value) {
    return createHash("sha256").update(value).digest("hex");
}

function comparePaths(left, right) {
    return Buffer.compare(Buffer.from(left), Buffer.from(right));
}

function arrayEqual(left, right) {
    return Array.isArray(left) && left.length === right.length && left.every((item, index) => item === right[index]);
}

function uniqueStrings(value, path, errors) {
    if (!Array.isArray(value) || value.length === 0) {
        errors.push(`${path}: expected a non-empty array`);
        return [];
    }
    const set = new Set();
    for (const item of value) {
        if (typeof item !== "string" || item.length === 0) errors.push(`${path}: expected non-empty strings`);
        if (set.has(item)) errors.push(`${path}: duplicate ${String(item)}`);
        set.add(item);
    }
    return [...set];
}

export function parseVerifierArgs(argv) {
    const options = {
        root: DEFAULT_ROOT,
        profile: "local",
        json: false,
        requireTerminal: false,
        evidenceDigestOnly: false,
    };
    const valueFlags = new Set([
        "--root", "--bootstrap-plan", "--receipt", "--wave", "--state", "--profile",
        "--wave-from-message", "--wave-from-commit", "--routed-reds",
    ]);
    const booleanFlags = new Set(["--json", "--require-terminal", "--evidence-digest-only"]);
    const seen = new Set();
    for (let index = 0; index < argv.length; index += 1) {
        const token = argv[index];
        if (!valueFlags.has(token) && !booleanFlags.has(token)) {
            throw new VerifierFailure(`unknown verifier option: ${token}`, EXIT.USAGE);
        }
        if (seen.has(token)) throw new VerifierFailure(`duplicate verifier option: ${token}`, EXIT.USAGE);
        seen.add(token);
        const key = token.slice(2).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        if (booleanFlags.has(token)) {
            options[key] = true;
            continue;
        }
        const value = argv[index + 1];
        if (!value || value.startsWith("--")) throw new VerifierFailure(`${token} requires a value`, EXIT.USAGE);
        options[key] = value;
        index += 1;
    }

    options.root = resolve(options.root);
    if (!["bootstrap", "commit", "ci", "local", "native", "release"].includes(options.profile)) {
        throw new VerifierFailure(`unsupported profile: ${options.profile}`, EXIT.USAGE);
    }
    if (options.state !== undefined && options.state !== "auto") {
        throw new VerifierFailure("--state accepts only auto", EXIT.USAGE);
    }
    if (options.bootstrapPlan && options.state) {
        throw new VerifierFailure("immutable bootstrap authority and state-auto authority cannot be combined", EXIT.USAGE);
    }
    if (options.bootstrapPlan) {
        if (options.wave !== "BI.W-P000") throw new VerifierFailure("--bootstrap-plan is restricted to --wave BI.W-P000", EXIT.USAGE);
        if (!options.receipt && !options.evidenceDigestOnly) throw new VerifierFailure("full bootstrap verification requires --receipt", EXIT.USAGE);
        if (options.waveFromMessage || options.waveFromCommit) throw new VerifierFailure("bootstrap authority cannot use a state-auto wave locator", EXIT.USAGE);
    } else if (options.receipt) {
        throw new VerifierFailure("--receipt requires --bootstrap-plan", EXIT.USAGE);
    } else if (!options.state) {
        throw new VerifierFailure("expected either --bootstrap-plan or --state auto", EXIT.USAGE);
    }
    if (options.state) {
        const locators = [options.wave, options.waveFromMessage, options.waveFromCommit].filter(Boolean);
        const terminalHeadRecovery = locators.length === 0 && options.profile === "release" && options.requireTerminal;
        if (locators.length !== 1 && !terminalHeadRecovery) throw new VerifierFailure("--state auto requires exactly one wave locator except the exact terminal release HEAD recovery surface", EXIT.USAGE);
        if (options.evidenceDigestOnly) throw new VerifierFailure("--evidence-digest-only is a P000 preparation mode", EXIT.USAGE);
        if (options.routedReds) throw new VerifierFailure("--routed-reds is a P000 preparation input", EXIT.USAGE);
    }
    if (options.wave && !WAVE_ID.test(options.wave)) throw new VerifierFailure(`invalid wave id: ${options.wave}`, EXIT.USAGE);
    return options;
}

export function parseCommitTrailers(message) {
    const parsedBlock = spawnSync("git", ["interpret-trailers", "--parse"], {
        input: message,
        encoding: "utf8",
        env: sanitizedRepositoryEnvironment(),
        stdio: ["pipe", "pipe", "pipe"],
    });
    if (parsedBlock.error || parsedBlock.status !== 0) {
        throw new VerifierFailure(`cannot parse the actual Git trailer block: ${parsedBlock.error?.message ?? parsedBlock.stderr.trim()}`, EXIT.STATE_UNAVAILABLE);
    }
    const trailers = new Map();
    const duplicates = [];
    for (const line of parsedBlock.stdout.replace(/\r\n/g, "\n").split("\n")) {
        const match = /^(BI-[A-Za-z0-9-]+):[ \t]*(\S.*)$/.exec(line);
        if (!match) continue;
        const [, key, value] = match;
        if (trailers.has(key)) duplicates.push(key);
        trailers.set(key, value.trim());
    }
    return { trailers, duplicates };
}

export function validateBootstrapPlan(plan) {
    const errors = [];
    if (plan === null || typeof plan !== "object" || Array.isArray(plan)) return { ok: false, errors: ["bootstrap plan: expected an object"] };
    if (plan.schemaVersion !== "1.0.0") errors.push("bootstrap plan schemaVersion must be 1.0.0");
    if (plan.waveId !== "BI.W-P000") errors.push("bootstrap plan waveId must be BI.W-P000");
    if (plan.mode !== "P000_BOOTSTRAP_ONLY") errors.push("bootstrap plan mode must remain P000_BOOTSTRAP_ONLY");
    if (plan.authority !== "IMMUTABLE_FORMATION_P000_PLAN_ONLY") errors.push("bootstrap plan authority is not immutable P000 formation data");
    if (!GIT_SHA.test(plan.sourceBase ?? "")) errors.push("bootstrap plan sourceBase must be a full Git SHA");
    const families = uniqueStrings(plan.allowedInvariantFamilies, "bootstrap plan allowedInvariantFamilies", errors);
    if (!Array.isArray(plan.infrastructureDeletionPaths)) errors.push("bootstrap plan infrastructureDeletionPaths must be an array");
    else if (new Set(plan.infrastructureDeletionPaths).size !== plan.infrastructureDeletionPaths.length) errors.push("bootstrap plan infrastructureDeletionPaths contain duplicates");
    if (!Array.isArray(plan.packageAliasDeletions)) errors.push("bootstrap plan packageAliasDeletions must be an array");
    else if (new Set(plan.packageAliasDeletions).size !== plan.packageAliasDeletions.length) errors.push("bootstrap plan packageAliasDeletions contain duplicates");
    if (!Array.isArray(plan.retainedPackageScripts) || plan.retainedPackageScripts.length === 0) {
        errors.push("bootstrap plan retainedPackageScripts must be a non-empty array");
    } else {
        const retained = new Set();
        for (const [index, row] of plan.retainedPackageScripts.entries()) {
            if (!row || typeof row.key !== "string" || typeof row.postP000Command !== "string" || row.postP000Command.length === 0) errors.push(`bootstrap plan retainedPackageScripts[${index}] is invalid`);
            if (retained.has(row?.key)) errors.push(`bootstrap plan retainedPackageScripts duplicates ${String(row?.key)}`);
            retained.add(row?.key);
        }
        for (const family of families) if (retained.has(family)) errors.push(`semantic family ${family} cannot be a package command`);
        for (const alias of plan.packageAliasDeletions ?? []) if (retained.has(alias)) errors.push(`deleted package alias ${alias} is also retained`);
    }
    if (!Array.isArray(plan.activeCommandSurfaces) || plan.activeCommandSurfaces.length === 0) {
        errors.push("bootstrap plan activeCommandSurfaces must enumerate fresh-checkout entry surfaces");
    } else {
        const paths = new Set();
        for (const [index, surface] of plan.activeCommandSurfaces.entries()) {
            if (!surface || ![surface.path, surface.requiredOwner, surface.requiredArgv].every((item) => typeof item === "string" && item.length > 0)) errors.push(`bootstrap plan activeCommandSurfaces[${index}] is invalid`);
            if (paths.has(surface?.path)) errors.push(`bootstrap plan activeCommandSurfaces duplicates ${String(surface?.path)}`);
            paths.add(surface?.path);
        }
    }
    if (plan.mutationContract?.requiredNonzeroRedThenRestore !== true || plan.mutationContract?.deviceFreeAndBrowserReceiptAdapters !== true || plan.mutationContract?.currentProductBrowserCredit !== false) {
        errors.push("bootstrap plan mutation contract must require device-free and browser-receipt RED/restore with zero current-product browser credit");
    }
    const receipt = plan.receiptContract;
    if (!receipt || receipt.path !== DEFAULT_BOOTSTRAP_RECEIPT || receipt.commitLocator !== "EXTERNAL_FIRST_PARENT_AND_TRAILER_RESOLUTION") errors.push("bootstrap plan receipt contract path/locator is invalid");
    if (!arrayEqual(receipt?.forbiddenLiteralFields, ["commitSha", "treeSha", "containingCommit", "containingTree", "receiptSha256"])) errors.push("bootstrap plan receipt forbidden-literal fields changed");
    if (!arrayEqual(receipt?.payloadDigestExcludes, [DEFAULT_BOOTSTRAP_RECEIPT, "docs/tranches/BI/RELEASE-ATTESTATION.json", "docs/tranches/BI/FINAL.md"])) errors.push("bootstrap plan payload exclusions changed");
    const trailers = receipt?.intendedTrailerContract;
    if (!arrayEqual(trailers?.coreNames, CORE_TRAILERS) || !arrayEqual(trailers?.embeddedValueNames, ["BI-Wave", "BI-Status", "BI-Formation-SHA256"]) || !arrayEqual(trailers?.forbiddenReceiptValues, ["BI-Receipt-SHA256", "BI-Attestation-SHA256", "BI-FINAL-SHA256"])) {
        errors.push("bootstrap plan intended-trailer contract is not acyclic");
    }
    return { ok: errors.length === 0, errors };
}

export function createRepositoryView(root, view, ref = "HEAD") {
    const entries = readRepositoryEntries(root, view, ref);
    const byPath = new Map(entries.map((entry) => [entry.path, entry]));
    const blobCache = new Map();
    let cacheHits = 0;
    let cacheMisses = 0;
    return {
        entries,
        paths: new Set(byPath.keys()),
        has(path) { return byPath.has(path); },
        oid(path) { return byPath.get(path)?.oid ?? null; },
        mode(path) { return byPath.get(path)?.mode ?? null; },
        read(path) {
            if (!byPath.has(path)) throw new Error(`${path}: exact repository blob is absent`);
            if (blobCache.has(path)) {
                cacheHits += 1;
                return Buffer.from(blobCache.get(path));
            }
            const specifier = view === "index" ? `:${path}` : `${ref}:${path}`;
            const result = git(root, ["show", specifier], { encoding: null });
            const bytes = Buffer.from(result.stdout);
            blobCache.set(path, bytes);
            cacheMisses += 1;
            return Buffer.from(bytes);
        },
        cacheStats() { return { entries: blobCache.size, hits: cacheHits, misses: cacheMisses }; },
    };
}

export function overlayRepositoryView(view, changes) {
    const overlays = new Map(Object.entries(changes));
    const paths = new Set(view.paths);
    for (const [path, entry] of overlays) entry === null ? paths.delete(path) : paths.add(path);
    return {
        entries: [...paths].sort(comparePaths).map((path) => ({ path, oid: overlays.has(path) ? overlays.get(path)?.oid ?? sha256(overlays.get(path).bytes).slice(0, 40) : view.oid(path), mode: overlays.has(path) ? overlays.get(path)?.mode ?? "100644" : view.mode(path) })),
        paths,
        has(path) { return paths.has(path); },
        oid(path) { return overlays.has(path) ? overlays.get(path)?.oid ?? (overlays.get(path) ? sha256(overlays.get(path).bytes).slice(0, 40) : null) : view.oid(path); },
        mode(path) { return overlays.has(path) ? overlays.get(path)?.mode ?? null : view.mode(path); },
        read(path) {
            if (overlays.has(path)) {
                const entry = overlays.get(path);
                if (entry === null) throw new Error(`${path}: overlay path is absent`);
                return Buffer.from(entry.bytes);
            }
            return view.read(path);
        },
    };
}

function runProcess(command, args, options = {}) {
    const result = spawnSync(command, args, {
        encoding: "utf8",
        maxBuffer: 128 * 1024 * 1024,
        stdio: ["ignore", "pipe", "pipe"],
        ...options,
    });
    return {
        argv: [command, ...args],
        exitCode: result.status,
        signal: result.signal,
        error: result.error?.message ?? null,
        stdout: result.stdout?.toString() ?? "",
        stderr: result.stderr?.toString() ?? "",
    };
}

function exactExecutionPathExists(path) {
    try {
        lstatSync(path);
        return true;
    } catch (error) {
        if (error.code === "ENOENT") return false;
        throw error;
    }
}

export function snapshotExactExecutionInputs(root) {
    const entries = [];
    const walk = (directory, prefix = "") => {
        const children = readdirSync(directory, { withFileTypes: true }).sort((left, right) => comparePaths(left.name, right.name));
        for (const child of children) {
            if (prefix === "" && EXACT_EXECUTION_INPUT_EXCLUSIONS.includes(child.name)) continue;
            const path = prefix === "" ? child.name : `${prefix}/${child.name}`;
            const absolute = resolve(directory, child.name);
            const stats = lstatSync(absolute);
            const mode = (stats.mode & 0o7777).toString(8).padStart(4, "0");
            if (stats.isSymbolicLink()) {
                entries.push({ path, type: "symlink", mode, target: readlinkSync(absolute) });
                continue;
            }
            if (stats.isDirectory()) {
                entries.push({ path, type: "directory", mode });
                walk(absolute, path);
                continue;
            }
            if (stats.isFile()) {
                const bytes = readFileSync(absolute);
                entries.push({ path, type: "file", mode, bytes: { length: bytes.length, sha256: sha256(bytes) } });
                continue;
            }
            const type = stats.isBlockDevice() ? "block-device"
                : stats.isCharacterDevice() ? "character-device"
                    : stats.isFIFO() ? "fifo"
                        : stats.isSocket() ? "socket"
                            : "other";
            entries.push({ path, type, mode });
        }
    };
    walk(resolve(root));
    entries.sort((left, right) => comparePaths(left.path, right.path));
    return { digest: sha256(canonicalJson(entries)), entries };
}

export function validateExactExecutionInputs(baseline, current, { phase } = {}) {
    const errors = [];
    const validateSnapshot = (snapshot, label) => {
        if (!snapshot || !Array.isArray(snapshot.entries) || !SHA256.test(snapshot.digest ?? "")) {
            errors.push(`${phase ?? "unknown"}: ${label} exact execution input snapshot is malformed`);
            return [];
        }
        const sorted = [...snapshot.entries].sort((left, right) => comparePaths(left?.path ?? "", right?.path ?? ""));
        if (canonicalJson(sorted) !== canonicalJson(snapshot.entries)) errors.push(`${phase}: ${label} exact execution input snapshot is not path-sorted`);
        if (new Set(snapshot.entries.map((entry) => entry?.path)).size !== snapshot.entries.length) errors.push(`${phase}: ${label} exact execution input snapshot contains duplicate paths`);
        if (sha256(canonicalJson(snapshot.entries)) !== snapshot.digest) errors.push(`${phase}: ${label} exact execution input snapshot digest does not reproduce`);
        return snapshot.entries;
    };
    if (typeof phase !== "string" || phase.length === 0) errors.push("exact execution input comparison phase is required");
    const baselineEntries = validateSnapshot(baseline, "baseline");
    const currentEntries = validateSnapshot(current, "current");
    const baselineByPath = new Map(baselineEntries.map((entry) => [entry.path, entry]));
    const currentByPath = new Map(currentEntries.map((entry) => [entry.path, entry]));
    const addedPaths = [...currentByPath.keys()].filter((path) => !baselineByPath.has(path)).sort(comparePaths);
    const deletedPaths = [...baselineByPath.keys()].filter((path) => !currentByPath.has(path)).sort(comparePaths);
    const changedPaths = [];
    for (const path of [...baselineByPath.keys()].filter((candidate) => currentByPath.has(candidate)).sort(comparePaths)) {
        const before = baselineByPath.get(path);
        const after = currentByPath.get(path);
        if (canonicalJson(before) === canonicalJson(after)) continue;
        const changes = [];
        if (before.type !== after.type) changes.push("type");
        if (before.mode !== after.mode) changes.push("mode");
        if (canonicalJson(before.bytes ?? null) !== canonicalJson(after.bytes ?? null)) changes.push("bytes");
        if (before.target !== after.target) changes.push("target");
        if (changes.length === 0) changes.push("metadata");
        changedPaths.push({ path, changes });
    }
    for (const path of addedPaths) errors.push(`${phase}: added exact execution input ${path}`);
    for (const path of deletedPaths) errors.push(`${phase}: deleted exact execution input ${path}`);
    for (const item of changedPaths) errors.push(`${phase}: changed exact execution input ${item.path} (${item.changes.join(", ")})`);
    const evidence = {
        phase,
        status: errors.length === 0 ? "PASS" : "RED",
        baselineDigest: baseline?.digest ?? null,
        currentDigest: current?.digest ?? null,
        baselineEntryCount: baselineEntries.length,
        currentEntryCount: currentEntries.length,
        addedPaths,
        deletedPaths,
        changedPaths,
        errors: [...errors],
    };
    return { ok: errors.length === 0, errors, evidence };
}

function failedExactExecutionInputPhase(baseline, phase, error) {
    const errors = [`${phase}: cannot snapshot exact execution inputs (${error.message})`];
    return {
        ok: false,
        errors,
        evidence: {
            phase,
            status: "RED",
            baselineDigest: baseline?.digest ?? null,
            currentDigest: null,
            baselineEntryCount: baseline?.entries?.length ?? 0,
            currentEntryCount: null,
            addedPaths: [],
            deletedPaths: [],
            changedPaths: [],
            errors,
        },
    };
}

function evaluateExactExecutionInputImmutability({ distPresentBeforeScrub, baseline, phases }) {
    const expectedPhases = ["build", "typecheck", "test", "pack"];
    const errors = [];
    if (distPresentBeforeScrub !== false) errors.push("pre-build: dist existed in the production exact execution view before scrub");
    if (!baseline || !Array.isArray(baseline.entries) || !SHA256.test(baseline.digest ?? "")) errors.push("pre-build: exact execution input baseline is absent or malformed");
    if (!Array.isArray(phases) || phases.length !== expectedPhases.length) {
        errors.push(`exact execution input phase evidence must contain ${expectedPhases.join(" -> ")}`);
    }
    const phaseEvidence = [];
    for (const [index, phase] of expectedPhases.entries()) {
        const result = phases?.[index];
        if (result?.evidence?.phase !== phase) {
            errors.push(`${phase}: exact execution input comparison is absent or out of order`);
            continue;
        }
        phaseEvidence.push(result.evidence);
        errors.push(...result.errors);
    }
    return {
        ok: errors.length === 0,
        errors,
        evidence: {
            distPresentBeforeScrub,
            excludedTopLevelPaths: [...EXACT_EXECUTION_INPUT_EXCLUSIONS],
            baselineDigest: baseline?.digest ?? null,
            baselineEntryCount: baseline?.entries?.length ?? null,
            phases: phaseEvidence,
            errors: [...errors],
        },
    };
}

function mirrorExactViewDependencies(root, exactViewRoot) {
    const sourceStore = resolve(root, "node_modules");
    const targetStore = resolve(exactViewRoot, "node_modules");
    mkdirSync(targetStore, { recursive: true });
    const workspaceLinks = [];
    const linkEntry = (source, target) => {
        const real = realpathSync(source);
        const worktreeRelative = relative(root, real);
        const isWorkspaceLink = worktreeRelative !== "" && !worktreeRelative.startsWith(`..${sep}`) && worktreeRelative !== ".." && !worktreeRelative.startsWith(`node_modules${sep}`);
        const destination = isWorkspaceLink ? resolve(exactViewRoot, worktreeRelative) : source;
        if (isWorkspaceLink && !existsSync(destination)) throw new Error(`workspace dependency ${source} points to ${worktreeRelative}, absent from the exact repository view`);
        symlinkSync(destination, target, lstatSync(real).isDirectory() ? "dir" : "file");
        if (isWorkspaceLink) workspaceLinks.push({ dependencyPath: relative(targetStore, target).split(sep).join("/"), repositoryPath: worktreeRelative.split(sep).join("/"), targetWithinExactView: relative(exactViewRoot, destination).split(sep).join("/") });
    };
    for (const entry of readdirSync(sourceStore, { withFileTypes: true })) {
        if ([".cache", ".vite", ".vitest", ".tmp"].includes(entry.name)) continue;
        const source = resolve(sourceStore, entry.name);
        const target = resolve(targetStore, entry.name);
        if (entry.name === ".bin" || (entry.name.startsWith("@") && entry.isDirectory() && !entry.isSymbolicLink())) {
            mkdirSync(target, { recursive: true });
            for (const nested of readdirSync(source, { withFileTypes: true })) linkEntry(resolve(source, nested.name), resolve(target, nested.name));
            continue;
        }
        linkEntry(source, target);
    }
    return workspaceLinks.sort((left, right) => comparePaths(left.dependencyPath, right.dependencyPath));
}

export function materializeExactRepositoryView({ root, view, ref = "HEAD" }) {
    const directory = mkdtempSync(join(realpathSync(tmpdir()), "glass-bi-verify-view-"));
    let treeOid;
    try {
        if (!["index", "commit"].includes(view)) throw new Error(`unsupported exact repository view: ${view}`);
        const entries = readRepositoryEntries(root, view, ref);
        treeOid = view === "index" ? git(root, ["write-tree"]).stdout.trim() : git(root, ["rev-parse", `${ref}^{tree}`]).stdout.trim();
        const rootFiles = entries.filter((entry) => !entry.path.includes("/") && entry.mode !== "160000").map((entry) => entry.path);
        const enrolledRoots = EXACT_EXECUTION_SCOPE_ROOTS.filter((scope) => entries.some((entry) => entry.path === scope || entry.path.startsWith(`${scope}/`)));
        const scope = [...rootFiles, ...enrolledRoots].sort(comparePaths);
        const scopedEntries = entries.filter((entry) => rootFiles.includes(entry.path) || enrolledRoots.some((scopeRoot) => entry.path === scopeRoot || entry.path.startsWith(`${scopeRoot}/`)));
        if (scope.length === 0 || !scopedEntries.some((entry) => entry.path === "package.json")) throw new Error("exact semantic execution scope is empty or lacks package.json");
        const archive = git(root, ["archive", "--format=tar", treeOid, "--", ...scope], { encoding: null });
        const extract = spawnSync("tar", ["-x", "-C", directory], {
            input: archive.stdout,
            encoding: "utf8",
            maxBuffer: 256 * 1024 * 1024,
            stdio: ["pipe", "pipe", "pipe"],
        });
        if (extract.error || extract.status !== 0) throw new Error(`cannot extract exact semantic execution scope: ${extract.error?.message ?? extract.stderr}`);
        const dependencyStore = resolve(root, "node_modules");
        if (!existsSync(dependencyStore)) throw new Error("node_modules is required for isolated semantic verification");
        const workspaceDependencyLinks = mirrorExactViewDependencies(root, directory);
        return {
            directory,
            treeOid,
            materialization: {
                executionEntryCount: scopedEntries.length,
                executionScope: scope,
                executionScopeDigest: sha256(scopedEntries.sort((left, right) => comparePaths(left.path, right.path)).map((entry) => `${entry.path}\0${entry.mode}\0${entry.oid}\n`).join("")),
                workspaceDependencyLinks,
                projectCachesExcluded: [".cache", ".vite", ".vitest", ".tmp"],
                childEnvironmentRemovalPolicy: CHILD_ENVIRONMENT_REMOVAL_POLICY,
            },
            cleanup() { rmSync(directory, { recursive: true, force: true }); },
        };
    } catch (error) {
        rmSync(directory, { recursive: true, force: true });
        throw error;
    }
}

function stripUnquotedComment(line) {
    let single = false;
    let double = false;
    let escaped = false;
    for (let index = 0; index < line.length; index += 1) {
        const character = line[index];
        if (escaped) {
            escaped = false;
            continue;
        }
        if (character === "\\" && !single) {
            escaped = true;
            continue;
        }
        if (character === "'" && !double) single = !single;
        else if (character === '"' && !single) double = !double;
        else if (character === "#" && !single && !double && (index === 0 || /\s/.test(line[index - 1]))) return line.slice(0, index);
    }
    return line;
}

function executableLines(source) {
    const physical = source.replace(/\r\n/g, "\n").split("\n");
    const logical = [];
    let pending = "";
    for (const physicalLine of physical) {
        const line = stripUnquotedComment(physicalLine).trim();
        if (!line) continue;
        pending = pending ? `${pending} ${line}` : line;
        if (pending.endsWith("\\")) {
            pending = pending.slice(0, -1).trimEnd();
            continue;
        }
        logical.push(pending);
        pending = "";
    }
    if (pending) logical.push(pending);
    return logical;
}

function scriptKind(path) {
    if (/\.[cm]?tsx$/.test(path)) return ts.ScriptKind.TSX;
    if (/\.[cm]?ts$/.test(path)) return ts.ScriptKind.TS;
    if (/\.[cm]?jsx$/.test(path)) return ts.ScriptKind.JSX;
    return ts.ScriptKind.JS;
}

function astStringLiterals(source, path) {
    const kind = scriptKind(path);
    const sourceFile = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, kind);
    const values = [];
    function visit(node) {
        if (ts.isStringLiteralLike(node)) values.push(node.text);
        ts.forEachChild(node, visit);
    }
    visit(sourceFile);
    return { sourceFile, values };
}

function callName(expression) {
    if (ts.isIdentifier(expression)) return expression.text;
    if (ts.isPropertyAccessExpression(expression)) return `${callName(expression.expression)}.${expression.name.text}`;
    return "";
}

function constantBindings(sourceFile) {
    const bindings = new Map();
    function visit(node) {
        if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) {
            bindings.set(node.name.text, node.initializer);
        }
        ts.forEachChild(node, visit);
    }
    visit(sourceFile);
    return bindings;
}

function resolvedStringLiterals(node, bindings, visiting = new Set()) {
    const values = [];
    function visit(item) {
        if (ts.isStringLiteralLike(item) || ts.isNoSubstitutionTemplateLiteral(item)) {
            values.push(item.text);
            return;
        }
        if (ts.isIdentifier(item) && bindings.has(item.text) && !visiting.has(item.text)) {
            visiting.add(item.text);
            visit(bindings.get(item.text));
            visiting.delete(item.text);
            return;
        }
        if (ts.isSpreadElement(item)) {
            visit(item.expression);
            return;
        }
        ts.forEachChild(item, visit);
    }
    visit(node);
    return values;
}

function vueExecutableSources(source, path, specifiers) {
    const parsed = parseVueSfc(source, { filename: path });
    if (parsed.errors.length > 0) throw new Error(`cannot parse ${path}: ${parsed.errors.map(String).join("; ")}`);
    const sources = [];
    for (const block of [parsed.descriptor.script, parsed.descriptor.scriptSetup]) {
        if (!block) continue;
        if (block.src) specifiers.push({ kind: "vue-script-src", value: block.src });
        if (block.content) sources.push({ source: block.content, path: `${path}.${["js", "jsx", "ts", "tsx"].includes(block.lang) ? block.lang : "ts"}` });
    }
    if (parsed.descriptor.template) {
        const compiled = compileTemplate({
            id: `bi-${sha256(path).slice(0, 8)}`,
            filename: path,
            source: parsed.descriptor.template.content,
            compilerOptions: { expressionPlugins: ["typescript"] },
        });
        if (compiled.errors.length > 0) throw new Error(`cannot compile ${path} template: ${compiled.errors.map(String).join("; ")}`);
        sources.push({ source: compiled.code, path: `${path}.template.ts` });
    }
    return sources;
}

export function liveModuleSpecifiers(source, path) {
    const specifiers = [];
    let sources = [];
    if (path.endsWith(".vue")) {
        sources = vueExecutableSources(source, path, specifiers);
    } else {
        sources.push({ source, path });
    }
    for (const executable of sources) {
        const { sourceFile } = astStringLiterals(executable.source, executable.path);
        const bindings = constantBindings(sourceFile);
        const commandAliases = new Set();
        for (const statement of sourceFile.statements) {
            if (!ts.isImportDeclaration(statement) || !ts.isStringLiteralLike(statement.moduleSpecifier) || !["child_process", "node:child_process"].includes(statement.moduleSpecifier.text)) continue;
            const clause = statement.importClause;
            if (clause?.namedBindings && ts.isNamedImports(clause.namedBindings)) {
                for (const element of clause.namedBindings.elements) {
                    const imported = element.propertyName?.text ?? element.name.text;
                    if (["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync"].includes(imported)) commandAliases.add(element.name.text);
                }
            }
        }
        function visit(node) {
            if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteralLike(node.moduleSpecifier)) {
                specifiers.push({ kind: "module", value: node.moduleSpecifier.text });
            }
            if (ts.isCallExpression(node)) {
                const name = node.expression.kind === ts.SyntaxKind.ImportKeyword ? "import" : callName(node.expression);
                if (commandAliases.has(name) || ["import", "require", "spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync"].some((candidate) => name === candidate || name.endsWith(`.${candidate}`))) {
                    for (const argument of node.arguments) {
                        for (const value of resolvedStringLiterals(argument, bindings)) specifiers.push({ kind: name, value });
                    }
                }
            }
            ts.forEachChild(node, visit);
        }
        visit(sourceFile);
    }
    return specifiers;
}

function commandTokens(literal) {
    const tokens = [];
    for (const match of literal.matchAll(/"([^"\\]*(?:\\.[^"\\]*)*)"|'([^']*)'|([^\s]+)/g)) {
        const token = match[1] ?? match[2] ?? match[3];
        if (token) tokens.push(token.replace(/[;,]$/, ""));
    }
    return tokens.length > 0 ? tokens : [literal];
}

function resolvesDeletedPath(ownerPath, literal, deletedPaths) {
    if (/^(?:proof(?::|$)|gates?(?::|$))/.test(literal)) return literal;
    for (const token of commandTokens(literal)) {
        if (/^(?:proof(?::|$)|gates?(?::|$))/.test(token)) return token;
        const candidates = [];
        if (token.startsWith("scripts/")) candidates.push(posix.normalize(token));
        if (token.startsWith(".")) candidates.push(posix.normalize(posix.join(posix.dirname(ownerPath), token)));
        for (const candidate of [...candidates]) {
            if (!posix.extname(candidate)) {
                candidates.push(`${candidate}.mjs`, `${candidate}.js`, `${candidate}.sh`);
            }
        }
        const deleted = candidates.find((candidate) => deletedPaths.has(candidate));
        if (deleted) return deleted;
    }
    return null;
}

function findLiveDeletedReferences(plan, view) {
    const findings = [];
    const deleted = new Set(plan.infrastructureDeletionPaths);
    const sourceExtensions = /\.(?:[cm]?[jt]sx?|vue)$/;
    for (const path of view.paths) {
        if (path.startsWith("docs/tranches/BI/FORMATION/")) continue;
        if (sourceExtensions.test(path)) {
            let references;
            try {
                references = liveModuleSpecifiers(view.read(path).toString("utf8"), path);
            } catch (error) {
                findings.push(`${path}: executable reference analysis failed closed (${error.message})`);
                continue;
            }
            for (const reference of references) {
                const deletedPath = resolvesDeletedPath(path, reference.value, deleted);
                if (deletedPath) findings.push(`${path}: live ${reference.kind} reference reaches deleted identity ${deletedPath}`);
            }
        } else if (/\.sh$/.test(path)) {
            for (const line of executableLines(view.read(path).toString("utf8"))) {
                for (const deletedPath of deleted) if (line.includes(deletedPath)) findings.push(`${path}: executable shell line reaches ${deletedPath}`);
            }
        }
    }
    return findings.sort(comparePaths);
}

function argvTokens(argv) {
    return argv
        .replace(/<[^>]+>/g, " ")
        .split(/\s+/)
        .filter((token) => token && !["node", "&&"].includes(token));
}

function containsTokensInOrder(source, tokens) {
    let cursor = 0;
    return tokens.every((token) => {
        const next = source.indexOf(token, cursor);
        if (next < 0) return false;
        cursor = next + token.length;
        return true;
    });
}

export function validateCiCheckoutSource(source) {
    const errors = [];
    const rows = source.replace(/\r\n/g, "\n").split("\n").map((raw, index) => {
        const executable = stripUnquotedComment(raw).trimEnd();
        return {
            index,
            indent: /^\s*/.exec(executable)?.[0].length ?? 0,
            trimmed: executable.trim(),
        };
    }).filter((row) => row.trimmed.length > 0);
    const checkoutRows = rows.filter((row) => row.trimmed === "- uses: actions/checkout@v4");
    if (checkoutRows.length !== 1) {
        errors.push(`.github/workflows/ci.yml: expected exactly one actions/checkout@v4 step, found ${checkoutRows.length}`);
        return { ok: false, errors };
    }
    const checkout = checkoutRows[0];
    const start = rows.indexOf(checkout);
    let end = rows.length;
    for (let index = start + 1; index < rows.length; index += 1) {
        if (rows[index].indent <= checkout.indent && rows[index].trimmed.startsWith("- ")) {
            end = index;
            break;
        }
    }
    const block = rows.slice(start + 1, end);
    if (!block.some((row) => row.indent > checkout.indent && row.trimmed === "with:")) {
        errors.push(".github/workflows/ci.yml: checkout step lacks a with block");
    }
    if (!block.some((row) => row.indent > checkout.indent && row.trimmed === "fetch-depth: 0")) {
        errors.push(".github/workflows/ci.yml: checkout must preserve fetch-depth: 0 for first-parent recovery");
    }
    const refs = block.filter((row) => row.indent > checkout.indent && row.trimmed.startsWith("ref:"));
    if (refs.length !== 1 || refs[0].trimmed !== `ref: ${CI_PR_HEAD_CHECKOUT_REF}`) {
        errors.push(".github/workflows/ci.yml: checkout must select the pull-request head SHA and github.sha for push");
    }
    return { ok: errors.length === 0, errors };
}

export function verifyBootstrapStructure(plan, view) {
    const errors = [];
    for (const path of plan.infrastructureDeletionPaths) {
        if (view.has(path)) errors.push(`${path}: abrogated proof/gate implementation is still present`);
    }
    for (const path of view.paths) {
        if (/^scripts\/proof-[^/]+(?:\.mjs|\.sh)$/.test(path)) errors.push(`${path}: executable proof identity escaped the formation deletion census`);
        if (path.startsWith("scripts/verification/") && !VERIFICATION_FILES.has(path)) errors.push(`${path}: per-family/table verification artifact is forbidden`);
        if (/^scripts\/verification\/(?:legacy|famil(?:y|ies)|tables?)(?:\/|[.-])/.test(path)) errors.push(`${path}: legacy/family table identity is forbidden`);
    }

    let packageJson;
    try {
        packageJson = JSON.parse(view.read("package.json").toString("utf8"));
    } catch (error) {
        errors.push(`package.json: cannot read terminal command surface (${error.message})`);
        packageJson = { scripts: {} };
    }
    const actualScripts = packageJson.scripts ?? {};
    const expectedScripts = Object.fromEntries(plan.retainedPackageScripts.map((row) => [row.key, row.postP000Command]));
    for (const [key, argv] of Object.entries(expectedScripts)) {
        if (actualScripts[key] !== argv) errors.push(`package.json#scripts.${key}: expected exact retained ordinary task`);
    }
    for (const key of Object.keys(actualScripts)) {
        if (!(key in expectedScripts)) errors.push(`package.json#scripts.${key}: command identity is not retained by P000`);
        if (/^(?:proof(?::|$)|gates?(?::|$))/.test(key)) errors.push(`package.json#scripts.${key}: proof/gate alias survived`);
        if (/scripts\/(?:proof-|gates?(?:\.|\/)|gate-family|gate-output)/.test(actualScripts[key])) errors.push(`package.json#scripts.${key}: invokes abrogated infrastructure`);
    }
    for (const alias of plan.packageAliasDeletions) if (alias in actualScripts) errors.push(`package.json#scripts.${alias}: deleted package alias survived`);
    for (const nestedPath of [...view.paths].filter((path) => path.endsWith("/package.json")).sort(comparePaths)) {
        let nested;
        try {
            nested = JSON.parse(view.read(nestedPath).toString("utf8"));
        } catch (error) {
            errors.push(`${nestedPath}: cannot inspect nested package command surface (${error.message})`);
            continue;
        }
        for (const [key, argv] of Object.entries(nested.scripts ?? {})) {
            if (key === "test:pi" || /^(?:proof(?::|$)|gates?(?::|$))/.test(key)) errors.push(`${nestedPath}#scripts.${key}: nested proof/gate alias survived`);
            if (typeof argv === "string") {
                const deletedPath = resolvesDeletedPath(nestedPath, argv, new Set(plan.infrastructureDeletionPaths));
                if (deletedPath) errors.push(`${nestedPath}#scripts.${key}: invokes deleted identity ${deletedPath}`);
            }
        }
    }

    const activeSurfaceOids = [];
    for (const surface of plan.activeCommandSurfaces) {
        if (!view.has(surface.path)) {
            errors.push(`${surface.path}: active fresh-checkout surface is absent`);
            continue;
        }
        activeSurfaceOids.push({ path: surface.path, oid: view.oid(surface.path) });
        const source = view.read(surface.path).toString("utf8");
        if (surface.path === "package.json") {
            if (actualScripts.prepublishOnly !== surface.requiredArgv) errors.push("package.json: prepublishOnly does not use the exact terminal verifier argv");
        } else if (surface.path === "scripts/install-hooks.mjs") {
            const literals = new Set(astStringLiterals(source, surface.path).values);
            if (!literals.has("core.hooksPath") || !literals.has(".githooks") || !literals.has(".githooks/commit-msg")) errors.push("scripts/install-hooks.mjs: tracked hook installation is incomplete");
        } else {
            if (surface.path === ".github/workflows/ci.yml") errors.push(...validateCiCheckoutSource(source).errors);
            const lines = executableLines(source);
            if (!lines.some((line) => line.includes(surface.requiredOwner))) errors.push(`${surface.path}: no executable line resolves required owner ${surface.requiredOwner}`);
            if (!lines.some((line) => containsTokensInOrder(line, argvTokens(surface.requiredArgv)))) errors.push(`${surface.path}: no executable line contains the required verifier argv in order`);
            for (const line of lines) {
                const deletedPath = resolvesDeletedPath(surface.path, line, new Set(plan.infrastructureDeletionPaths));
                if (deletedPath) errors.push(`${surface.path}: active surface also invokes deleted identity ${deletedPath}`);
            }
            if (/\bcontinue-on-error\s*:\s*true\b/.test(source) || /(?:\|\||;)\s*true(?:\s|$)/m.test(source) || /\bset\s+\+e\b/.test(source)) {
                errors.push(`${surface.path}: active verifier surface masks command failure`);
            }
        }
        if (surface.path === ".githooks/commit-msg" && view.mode(surface.path) !== "100755") errors.push(".githooks/commit-msg: tracked hook must retain executable Git mode 100755");
        if (surface.path === "scripts/release.sh" && view.mode(surface.path) !== "100755") errors.push("scripts/release.sh: tracked release entry surface must retain executable Git mode 100755");
    }

    if (!view.has("scripts/verify.mjs") || view.mode("scripts/verify.mjs") !== "100755") errors.push("scripts/verify.mjs: sole executable owner must be staged with Git mode 100755");
    errors.push(...findLiveDeletedReferences(plan, view));

    activeSurfaceOids.sort((left, right) => comparePaths(left.path, right.path));
    return {
        ok: errors.length === 0,
        errors,
        snapshot: {
            retainedPackageScripts: Object.entries(actualScripts).sort(([left], [right]) => comparePaths(left, right)),
            activeSurfaceOids,
            abrogatedInfrastructureDigest: sha256([...plan.infrastructureDeletionPaths].sort().join("\n")),
            abrogatedPackageAliasDigest: sha256([...plan.packageAliasDeletions].sort().join("\n")),
        },
    };
}

async function readJson(path, label) {
    let bytes;
    try {
        bytes = await readFile(path);
    } catch (error) {
        if (error.code === "ENOENT") throw new VerifierFailure(`${label} is missing: ${path}`, EXIT.MISSING_INPUT);
        throw error;
    }
    try {
        return { bytes, value: JSON.parse(bytes.toString("utf8")) };
    } catch (error) {
        throw new VerifierFailure(`${label} is not valid JSON: ${error.message}`, EXIT.INVALID_CONTRACT);
    }
}

function outputTail(value, lines = 80) {
    return value.replace(/\x1b\[[0-9;]*m/g, "").split(/\r?\n/).slice(-lines).join("\n");
}

function repoPath(root, path) {
    return relative(root, path).split(sep).join("/");
}

function relativeDeclarationCandidates(owner, specifier) {
    const base = posix.normalize(posix.join(posix.dirname(owner), specifier));
    const candidates = [base, `${base}.d.ts`, `${base}/index.d.ts`];
    if (/\.(?:mjs|cjs|js)$/.test(base)) candidates.push(base.replace(/\.(?:mjs|cjs|js)$/, ".d.ts"));
    return candidates;
}

function normalizeInsidePackageTarget(value, { label, requireDotSlash }) {
    if (typeof value !== "string" || value.length === 0) return { error: `${label}: target must be a non-empty string` };
    if (value.includes("\\")) return { error: `${label}: target must use package-relative forward slashes: ${value}` };
    if (value.includes("\0") || /^(?:\/|[A-Za-z]:|[A-Za-z][A-Za-z+.-]*:)/.test(value)) return { error: `${label}: absolute or URL-like target is forbidden: ${value}` };
    if (requireDotSlash && !value.startsWith("./")) return { error: `${label}: package export target must be rooted ./, found ${value}` };
    const relativeTarget = value.startsWith("./") ? value.slice(2) : value;
    if (!relativeTarget || /[?#]/.test(relativeTarget)) return { error: `${label}: target is empty or contains a query/fragment: ${value}` };
    for (const segment of relativeTarget.split("/")) {
        if (!segment) return { error: `${label}: target contains an empty path segment: ${value}` };
        let decoded;
        try {
            decoded = decodeURIComponent(segment);
        } catch {
            return { error: `${label}: target contains invalid percent encoding: ${value}` };
        }
        if ([".", ".."].includes(decoded) || decoded.toLowerCase() === "node_modules" || decoded.includes("/") || decoded.includes("\\")) {
            return { error: `${label}: target escapes or names a forbidden package segment: ${value}` };
        }
    }
    const normalized = posix.normalize(relativeTarget);
    if (normalized === ".." || normalized.startsWith("../") || posix.isAbsolute(normalized)) return { error: `${label}: target escapes the packed package: ${value}` };
    return { target: normalized };
}

function collectExportTargets(value, label = "package.json#exports") {
    const targets = [];
    const errors = [];
    if (value === undefined) return { targets, errors };
    function visit(node, path) {
        if (node === null) return;
        if (typeof node === "string") {
            const result = normalizeInsidePackageTarget(node, { label: path, requireDotSlash: true });
            if (result.error) errors.push(result.error);
            else targets.push(result.target);
            return;
        }
        if (Array.isArray(node)) {
            node.forEach((item, index) => visit(item, `${path}[${index}]`));
            return;
        }
        if (node && typeof node === "object") {
            for (const [key, item] of Object.entries(node)) visit(item, `${path}[${JSON.stringify(key)}]`);
            return;
        }
        errors.push(`${path}: export target leaf must be a string, object, array, or null`);
    }
    visit(value, label);
    return { targets, errors };
}

function validateExportsMapShape(exportsMap) {
    const errors = [];
    if (exportsMap === undefined || exportsMap === null || typeof exportsMap === "string" || Array.isArray(exportsMap)) return errors;
    if (typeof exportsMap !== "object") return errors;
    const keys = Object.keys(exportsMap);
    const subpathKeys = keys.filter((key) => key.startsWith("."));
    if (subpathKeys.length > 0 && subpathKeys.length !== keys.length) {
        errors.push("package.json#exports: top-level subpath keys and condition keys cannot be mixed");
    }
    if (subpathKeys.length === keys.length) {
        for (const key of keys) {
            if (key === ".") continue;
            const result = normalizeInsidePackageTarget(key, { label: `package.json#exports key ${JSON.stringify(key)}`, requireDotSlash: true });
            if (result.error) errors.push(result.error);
        }
    } else {
        for (const key of keys) {
            if (!key || /^(?:0|[1-9][0-9]*)$/.test(key)) errors.push(`package.json#exports: invalid top-level condition key ${JSON.stringify(key)}`);
        }
    }
    return errors;
}

function collectTypesVersionsTargets(value) {
    const targets = [];
    const errors = [];
    if (value === undefined) return { targets, errors };
    if (!value || typeof value !== "object" || Array.isArray(value)) return { targets, errors: ["package.json#typesVersions: expected a version-range mapping object"] };
    for (const [versionRange, mappings] of Object.entries(value)) {
        const owner = `package.json#typesVersions.${versionRange}`;
        if (!mappings || typeof mappings !== "object" || Array.isArray(mappings)) {
            errors.push(`${owner}: expected a TypeScript path-mapping object`);
            continue;
        }
        for (const [specifier, mapping] of Object.entries(mappings)) {
            const path = `${owner}.${specifier}`;
            const leaves = typeof mapping === "string" ? [mapping] : Array.isArray(mapping) ? mapping : null;
            if (!leaves || leaves.length === 0 || leaves.some((item) => typeof item !== "string")) {
                errors.push(`${path}: mapping must be a non-empty string or string array`);
                continue;
            }
            for (const [index, leaf] of leaves.entries()) {
                const result = normalizeInsidePackageTarget(leaf, { label: `${path}[${index}]`, requireDotSlash: false });
                if (result.error) errors.push(result.error);
                else targets.push(result.target);
            }
        }
    }
    return { targets, errors };
}

function collectTopLevelPackageTargets(packageJson) {
    const targets = [];
    const errors = [];
    for (const field of ["types", "module", "main", "style"]) {
        if (packageJson[field] === undefined) continue;
        const result = normalizeInsidePackageTarget(packageJson[field], { label: `package.json#${field}`, requireDotSlash: false });
        if (result.error) errors.push(result.error);
        else targets.push(result.target);
    }
    return { targets, errors };
}

function targetPattern(target) {
    return new RegExp(`^${target.split("*").map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".*")}$`);
}

function requirePackedTargets(targets, packedPaths, errors) {
    for (const target of new Set(targets)) {
        if (target.includes("*")) {
            if (![...packedPaths].some((path) => targetPattern(target).test(path))) errors.push(`packed artifact has no member for declared package pattern ${target}`);
        } else if (!packedPaths.has(target)) {
            errors.push(`packed artifact omits declared package target ${target}`);
        }
    }
}

function resolveExportTarget(exportsMap, subpath) {
    for (const [key, value] of exportSubpathEntries(exportsMap)) {
        let wildcard = null;
        if (key === subpath) wildcard = "";
        else if (key.includes("*")) {
            const [prefix, suffix] = key.split("*");
            if (subpath.startsWith(prefix) && subpath.endsWith(suffix)) wildcard = subpath.slice(prefix.length, subpath.length - suffix.length);
        }
        if (wildcard === null) continue;
        const targets = collectExportTargets(value).targets;
        const target = targets.find((candidate) => candidate.includes("*") || wildcard === "");
        if (target) return target.replace("*", wildcard);
    }
    return null;
}

function exportSubpathEntries(exportsMap) {
    if (typeof exportsMap === "string" || Array.isArray(exportsMap)) return [[".", exportsMap]];
    if (!exportsMap || typeof exportsMap !== "object") return [];
    const entries = Object.entries(exportsMap);
    return entries.some(([key]) => key.startsWith(".")) ? entries.filter(([key]) => key.startsWith(".")) : [[".", exportsMap]];
}

function publicRuntimeExports(packageName, exportsMap, packedPaths) {
    const bySpecifier = new Map();
    for (const [subpath, value] of exportSubpathEntries(exportsMap)) {
        for (const declaredTarget of collectExportTargets(value).targets.filter((target) => /\.[cm]?js$/.test(target))) {
            const matches = [];
            if (!declaredTarget.includes("*")) {
                matches.push({ target: declaredTarget, wildcard: "" });
            } else {
                const pattern = new RegExp(`^${declaredTarget.split("*").map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("(.+)")}$`);
                for (const path of packedPaths) {
                    const match = pattern.exec(path);
                    if (match) matches.push({ target: path, wildcard: match[1] ?? "" });
                }
            }
            for (const { target, wildcard } of matches) {
                const concreteSubpath = subpath.replaceAll("*", wildcard);
                const specifier = concreteSubpath === "." ? packageName : `${packageName}${concreteSubpath.slice(1)}`;
                const row = bySpecifier.get(specifier) ?? { specifier, declaredTargets: new Set() };
                row.declaredTargets.add(target);
                bySpecifier.set(specifier, row);
            }
        }
    }
    return [...bySpecifier.values()]
        .map((row) => ({ specifier: row.specifier, declaredTargets: [...row.declaredTargets].sort(comparePaths) }))
        .sort((left, right) => comparePaths(left.specifier, right.specifier));
}

export function normalizeRuntimeImportFailure(diagnostic) {
    const rawErrorCode = /\b(ERR_[A-Z0-9_]+)\b/.exec(diagnostic)?.[1] ?? "ERR_IMPORT_FAILED";
    const dependencyMatch = /node_modules[\\/]((?:@[^\\/\s]+[\\/])?[^\\/\s]+)/.exec(diagnostic);
    const dependency = dependencyMatch?.[1]?.replaceAll("\\", "/") ?? "self";
    const typescriptRuntimeDependency = dependency !== "self"
        && /(?:ERR_UNKNOWN_FILE_EXTENSION|ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING|ERR_IMPORT_FAILED)/.test(rawErrorCode)
        && /(?:\.cts|\.mts|\.tsx?|Type stripping|Unknown file extension ["']\.ts)/i.test(diagnostic);
    return {
        failureClass: typescriptRuntimeDependency ? "UNSUPPORTED_TYPESCRIPT_RUNTIME_DEPENDENCY" : rawErrorCode,
        dependency,
    };
}

export function inspectPackedArtifactClosure(root, packReport) {
    const errors = [];
    if (!Array.isArray(packReport) || packReport.length !== 1 || !Array.isArray(packReport[0]?.files)) {
        return { ok: false, errors: ["npm pack did not return one structured file inventory"], evidence: null };
    }
    const packageJson = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
    const packedPaths = new Set(packReport[0].files.map((file) => file.path));
    const declaredDependencies = new Set([
        ...Object.keys(packageJson.dependencies ?? {}),
        ...Object.keys(packageJson.peerDependencies ?? {}),
        ...Object.keys(packageJson.optionalDependencies ?? {}),
    ]);
    const exportTargets = collectExportTargets(packageJson.exports);
    const typesVersionsTargets = collectTypesVersionsTargets(packageJson.typesVersions);
    const topLevelTargets = collectTopLevelPackageTargets(packageJson);
    errors.push(...validateExportsMapShape(packageJson.exports), ...exportTargets.errors, ...typesVersionsTargets.errors, ...topLevelTargets.errors);
    const requiredTargets = new Set([...exportTargets.targets, ...typesVersionsTargets.targets, ...topLevelTargets.targets]);
    requirePackedTargets(requiredTargets, packedPaths, errors);

    const entries = [];
    for (const path of [...packedPaths].sort(comparePaths)) {
        const absolute = resolve(root, path);
        if (!existsSync(absolute)) {
            errors.push(`npm pack inventory path is absent after build: ${path}`);
            continue;
        }
        const stat = lstatSync(absolute);
        if (!stat.isFile()) {
            errors.push(`npm pack inventory path is not a regular file: ${path}`);
            continue;
        }
        const bytes = readFileSync(absolute);
        entries.push({ path, mode: (stat.mode & 0o777).toString(8).padStart(3, "0"), sha256: sha256(bytes) });

        if (path.endsWith(".css")) {
            const css = bytes.toString("utf8");
            let rootNode;
            try {
                rootNode = postcss.parse(css, { from: path });
            } catch (error) {
                errors.push(`${path}: emitted CSS is not parseable (${error.reason ?? error.message})`);
                rootNode = null;
            }
            const references = [];
            rootNode?.walkAtRules("import", (rule) => {
                const match = /^\s*(?:url\(\s*)?(?:"([^"]+)"|'([^']+)'|([^\s;)]+))/.exec(rule.params);
                const reference = match?.[1] ?? match?.[2] ?? match?.[3];
                if (reference) references.push({ kind: "import", value: reference });
            });
            rootNode?.walkDecls((declaration) => {
                for (const match of declaration.value.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*))\s*\)/gi)) {
                    const reference = (match[1] ?? match[2] ?? match[3] ?? "").trim();
                    if (reference) references.push({ kind: "url", value: reference });
                }
            });
            for (const { kind, value } of references) {
                if (/^(?:data:|https?:|#|\/\/|\/)/i.test(value)) continue;
                const reference = value.split(/[?#]/)[0];
                if (!reference) continue;
                if (reference === packageJson.name || reference.startsWith(`${packageJson.name}/`)) {
                    const subpath = reference === packageJson.name ? "." : `.${reference.slice(packageJson.name.length)}`;
                    const target = resolveExportTarget(packageJson.exports, subpath);
                    if (!target || !packedPaths.has(target)) errors.push(`${path}: self-package CSS ${kind} does not resolve through exports: ${value}`);
                    continue;
                }
                const packageName = reference.startsWith("@") ? reference.split("/").slice(0, 2).join("/") : reference.split("/")[0];
                if (kind === "import" && !reference.startsWith(".") && declaredDependencies.has(packageName)) continue;
                const resolvedPath = posix.normalize(posix.join(posix.dirname(path), reference));
                if (!packedPaths.has(resolvedPath)) errors.push(`${path}: packed CSS ${kind} is unresolved: ${value}`);
            }
        }
        if (/\.(?:js|css)$/.test(path)) {
            const source = bytes.toString("utf8");
            for (const match of source.matchAll(/sourceMappingURL=([^\s*]+)/g)) {
                const mapPath = posix.normalize(posix.join(posix.dirname(path), match[1].split(/[?#]/)[0]));
                if (!packedPaths.has(mapPath)) errors.push(`${path}: source map is not packed: ${mapPath}`);
            }
        }
        if (path.endsWith(".d.ts")) {
            const sourceFile = ts.createSourceFile(path, bytes.toString("utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
            function visit(node) {
                let specifier = null;
                if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteralLike(node.moduleSpecifier)) {
                    specifier = node.moduleSpecifier.text;
                } else if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument) && ts.isStringLiteralLike(node.argument.literal)) {
                    specifier = node.argument.literal.text;
                }
                if (specifier?.startsWith(".")) {
                    const candidates = relativeDeclarationCandidates(path, specifier);
                    if (!candidates.some((candidate) => packedPaths.has(candidate))) errors.push(`${path}: declaration import is unresolved in packed artifact: ${specifier}`);
                }
                ts.forEachChild(node, visit);
            }
            visit(sourceFile);
        }
    }
    const publicExports = publicRuntimeExports(packageJson.name, packageJson.exports, packedPaths);
    const importOutcomes = [];
    if (publicExports.length === 0) {
        errors.push("packed artifact exposes no importable JavaScript export targets");
    } else {
        for (const entry of publicExports) {
            const importProbe = runProcess(process.execPath, [
                "--input-type=module",
                "--eval",
                "await import(process.argv[1]);",
                entry.specifier,
            ], { cwd: root, env: sanitizedRepositoryEnvironment() });
            if (importProbe.exitCode === 0 && !importProbe.signal && !importProbe.error) {
                importOutcomes.push({ specifier: entry.specifier, declaredTargets: entry.declaredTargets, status: "PASS" });
                continue;
            }
            const diagnostic = `${importProbe.stdout}\n${importProbe.stderr}`;
            const normalized = normalizeRuntimeImportFailure(diagnostic);
            importOutcomes.push({ specifier: entry.specifier, declaredTargets: entry.declaredTargets, status: "RED", ...normalized });
            errors.push(`packed runtime export ${entry.specifier} is not importable (${normalized.failureClass}; dependency ${normalized.dependency})`);
        }
    }
    const closureDigest = sha256(entries.map((entry) => `${entry.path}\0${entry.mode}\0${entry.sha256}\n`).join(""));
    return {
        ok: errors.length === 0,
        errors,
        evidence: {
            source: "clean dist; npm pack --json --ignore-scripts; unpack actual tarball; parse closure; import every runtime export",
            entryCount: entries.length,
            closureDigest,
            entries,
            declaredTargets: [...requiredTargets].sort(comparePaths),
            importedRuntimeSpecifiers: publicExports.map((entry) => entry.specifier),
            runtimeImportOutcomes: importOutcomes,
        },
    };
}

export function canonicalizeVitestReport(report, { executionRoot, view, evidencePlan, requiredSelfTests = [] }) {
    const errors = [];
    const failures = [];
    const addFailure = (summary, { family = null, routable = false, path = null } = {}) => {
        errors.push(summary);
        failures.push({ summary, invariantFamily: family, routable, path });
    };
    if (!report || !Array.isArray(report.testResults)) addFailure("Vitest structured report is absent or malformed");
    const files = [];
    for (const result of report?.testResults ?? []) {
        const absolute = isAbsolute(result.name) ? result.name : resolve(executionRoot, result.name);
        const path = repoPath(executionRoot, absolute);
        const assertions = (result.assertionResults ?? []).map((assertion) => ({
            title: assertion.fullName ?? assertion.title,
            status: assertion.status,
        })).sort((left, right) => comparePaths(left.title, right.title));
        for (const assertion of assertions) if (/(?:^|\s)(?:proof|gates?):[^\s]+/.test(assertion.title ?? "")) addFailure(`${path}: ordinary test title revives retired proof/gate identity ${assertion.title}`, { family: "architecture.clean-break", path });
        files.push({ path, sourceOid: view.oid(path), status: result.status, assertions });
    }
    files.sort((left, right) => comparePaths(left.path, right.path));
    const byPath = new Map(files.map((file) => [file.path, file]));
    for (const source of evidencePlan.sources.filter((item) => item.kind === "normal-test")) {
        const executed = byPath.get(source.path);
        const isSelfTest = requiredSelfTests.includes(source.path);
        const family = source.invariantFamilies.length === 1 ? source.invariantFamilies[0] : null;
        if (!executed || executed.status !== "passed" || !executed.sourceOid) {
            addFailure(`${source.path}: discovered ordinary test did not execute and PASS against its indexed source`, { family, routable: !isSelfTest && family !== null, path: source.path });
        } else if (executed.assertions.length === 0 || executed.assertions.some((assertion) => assertion.status !== "passed")) {
            addFailure(`${source.path}: discovered ordinary test lacks structured all-PASS assertion execution`, { family, routable: !isSelfTest && family !== null, path: source.path });
        }
    }
    for (const path of requiredSelfTests) {
        const executed = byPath.get(path);
        if (!executed || executed.status !== "passed" || executed.assertions.length === 0 || executed.assertions.some((assertion) => assertion.status !== "passed")) {
            addFailure(`${path}: required verifier self-test lacks structured all-PASS execution`, { family: "architecture.clean-break", path });
        }
    }
    return { ok: errors.length === 0, errors, failures, evidence: { files } };
}

export function evaluateInstallerBehavior(result) {
    const errors = [];
    if (result.installer.exitCode !== 0 || result.installer.signal || result.installer.error) errors.push("hook installer did not execute successfully");
    if (result.configuredHooksPath !== ".githooks") errors.push("hook installer did not persist core.hooksPath=.githooks");
    if (result.hookMode !== "755") errors.push("installed tracked commit hook is not executable");
    if (result.failClosedProbe.exitCode !== EXIT.STATE_UNAVAILABLE) errors.push("installed hook did not route a P001 message to fail-closed state recovery");
    return {
        ok: errors.length === 0,
        errors,
        evidence: {
            installerArgv: result.installer.argv.map((token) => token === process.execPath ? "$NODE" : token),
            installerExitCode: result.installer.exitCode,
            configuredHooksPath: result.configuredHooksPath,
            hookMode: result.hookMode,
            failClosedProbeExitCode: result.failClosedProbe.exitCode,
        },
    };
}

export function executeInstallerBehavior(root, { resetRepository = false, baseEnvironment = process.env } = {}) {
    if (resetRepository) rmSync(resolve(root, ".git"), { recursive: true, force: true });
    const env = sanitizedRepositoryEnvironment(baseEnvironment);
    const initialized = runProcess("git", ["init", "-q"], { cwd: root, env });
    if (initialized.exitCode !== 0) return evaluateInstallerBehavior({ installer: initialized, configuredHooksPath: null, hookMode: null, failClosedProbe: initialized });
    const installer = runProcess(process.execPath, ["scripts/install-hooks.mjs"], { cwd: root, env });
    const configured = runProcess("git", ["config", "--get", "core.hooksPath"], { cwd: root, env });
    const hookPath = resolve(root, ".githooks/commit-msg");
    const hookMode = existsSync(hookPath) ? (lstatSync(hookPath).mode & 0o777).toString(8) : null;
    const messagePath = resolve(root, ".git/BI-P000-PROBE-MESSAGE");
    writeFileSync(messagePath, "test: fail closed probe\n\nBI-Wave: BI.W-P001\n");
    const probe = runProcess(hookPath, [messagePath], { cwd: root, env });
    return evaluateInstallerBehavior({ installer, configuredHooksPath: configured.stdout.trim(), hookMode, failClosedProbe: probe });
}

export function evaluateCanonicalCommandResults({
    typecheck,
    test,
    build,
    pack,
    vitest,
    packageClosure,
    installer,
    inputImmutability,
}) {
    const errors = [];
    const failures = [];
    const addFailure = (family, summary, routable) => {
        errors.push(summary);
        failures.push({
            findingId: `BI.P000.CURRENT.${sha256(`${family}\0${summary}`).slice(0, 16)}`,
            invariantFamily: family,
            summary,
            routable,
        });
    };
    const ordinaryTasks = [["build", build], ["typecheck", typecheck], ["test", test], ["pack", pack]];
    for (const [label, result] of ordinaryTasks) {
        if (!result || result.exitCode !== 0 || result.signal || result.error) {
            if (label === "test" && Array.isArray(vitest?.failures) && vitest.failures.length > 0) continue;
            const family = label === "build" || label === "pack" ? "integrity.build-package" : label === "typecheck" ? "integrity.types" : null;
            addFailure(family, `${label}: ordinary task execution is RED`, family !== null);
        }
    }
    for (const [label, adapter, family, routable] of [
        ["structured Vitest", vitest, null, false],
        ["packed artifact closure", packageClosure, "integrity.build-package", true],
        ["hook installer", installer, "architecture.clean-break", false],
        ["exact execution input immutability", inputImmutability, "architecture.clean-break", false],
    ]) {
        if (!adapter?.ok) {
            if (label === "structured Vitest" && Array.isArray(adapter?.failures) && adapter.failures.length > 0) {
                for (const failure of adapter.failures) addFailure(failure.invariantFamily, `${label}: ${failure.summary}`, failure.routable);
            } else {
                for (const error of adapter?.errors ?? [`${label} semantic adapter is absent`]) addFailure(family, `${label}: ${error}`, routable);
            }
        }
    }
    const provenance = ordinaryTasks.map(([, result]) => result).filter(Boolean).map((result) => ({ argv: result.argv, exitCode: result.exitCode, signal: result.signal }));
    return {
        ok: errors.length === 0,
        errors,
        failures,
        evidence: {
            ordinaryTaskProvenance: provenance,
            structuredVitest: vitest?.evidence ?? null,
            packedArtifactClosure: packageClosure?.evidence ?? null,
            installerBehavior: installer?.evidence ?? null,
            exactExecutionInputImmutability: inputImmutability?.evidence ?? null,
        },
    };
}

export function validateCurrentRedRouting(failures, routes, authority, repositoryView) {
    const errors = [];
    const knownFamilies = new Set((authority?.taxonomy?.invariants ?? []).map((invariant) => invariant.id));
    const waveById = new Map((authority?.waves?.waves ?? []).map((wave) => [wave.id, wave]));
    const routeRows = Array.isArray(routes) ? routes : [];
    const byFinding = new Map();
    for (const route of routeRows) {
        const rows = byFinding.get(route?.findingId) ?? [];
        rows.push(route);
        byFinding.set(route?.findingId, rows);
        if (route?.status !== "ROUTED_RED") errors.push(`${String(route?.findingId)}: routed current-source finding was falsely counted as ${String(route?.status)}`);
        if (!knownFamilies.has(route?.invariantFamily)) errors.push(`${String(route?.findingId)}: routed finding names an unknown invariant family`);
        if (!/^BI\.W-P(?:00[1-9]|0[1-9][0-9]|1[0-2][0-9]|13[0-3])$/.test(route?.ownerWave ?? "")) errors.push(`${String(route?.findingId)}: routed finding lacks exactly one nonterminal future owner`);
        const owner = waveById.get(route?.ownerWave);
        if (!owner || !owner.invariantFamilies?.includes(route?.invariantFamily) || ["DONE", "DEAD"].includes(owner.status)) errors.push(`${String(route?.findingId)}: routed owner does not declare the finding family as nonterminal work`);
        if (route?.evidencePath !== DEFAULT_BOOTSTRAP_RECEIPT) {
            errors.push(`${String(route?.findingId)}: routed finding evidence path must be the canonical bootstrap receipt`);
        } else if (!repositoryView?.has || (!repositoryView.has(route.evidencePath) && authority?.allowPlannedBootstrapAdjunct !== true)) {
            errors.push(`${String(route?.findingId)}: routed finding evidence path is absent from the exact tracked repository view`);
        } else if (repositoryView.has(route.evidencePath) && repositoryView.mode?.(route.evidencePath) === "160000") {
            errors.push(`${String(route?.findingId)}: routed finding evidence path is not an exact tracked blob in the verified repository view`);
        }
    }
    const detected = new Set();
    for (const failure of failures) {
        if (detected.has(failure.findingId)) errors.push(`${failure.findingId}: production evidence emitted a duplicate current-source finding identity`);
        detected.add(failure.findingId);
        const matching = byFinding.get(failure.findingId) ?? [];
        if (!failure.routable) {
            errors.push(`${failure.findingId}: P000-owned mechanism failure cannot be routed`);
            continue;
        }
        if (matching.length !== 1) errors.push(`${failure.findingId}: encountered current-source RED must have exactly one route, found ${matching.length}`);
        const route = matching[0];
        if (route && (route.invariantFamily !== failure.invariantFamily || route.summary !== failure.summary)) {
            errors.push(`${failure.findingId}: route does not bind the detected family and summary`);
        }
    }
    for (const findingId of byFinding.keys()) if (!detected.has(findingId)) errors.push(`${String(findingId)}: route does not correspond to an encountered current-source RED`);
    return {
        ok: errors.length === 0,
        errors,
        routedFailures: failures.filter((failure) => failure.routable && (byFinding.get(failure.findingId)?.length ?? 0) === 1),
    };
}

export function executeCanonicalCommands({ root, evidencePlan, view, requiredSelfTests, executor = runProcess } = {}) {
    const reportRelativePath = ".git/BI-P000-VITEST.json";
    const reportPath = resolve(root, reportRelativePath);
    const distPresentBeforeScrub = exactExecutionPathExists(resolve(root, "dist"));
    rmSync(resolve(root, "dist"), { recursive: true, force: true });
    let inputBaseline = null;
    let baselineCaptureError = null;
    try {
        inputBaseline = snapshotExactExecutionInputs(root);
    } catch (error) {
        baselineCaptureError = error;
    }
    const inputPhases = [];
    const captureInputPhase = (phase) => {
        if (baselineCaptureError) {
            inputPhases.push(failedExactExecutionInputPhase(inputBaseline, phase, new Error(`baseline is unavailable: ${baselineCaptureError.message}`)));
            return;
        }
        try {
            inputPhases.push(validateExactExecutionInputs(inputBaseline, snapshotExactExecutionInputs(root), { phase }));
        } catch (error) {
            inputPhases.push(failedExactExecutionInputPhase(inputBaseline, phase, error));
        }
    };
    const installer = executeInstallerBehavior(root);
    const npmConfigDirectory = resolve(root, ".git/BI-P000-NPM-CONFIG");
    const env = sanitizedRepositoryEnvironment(process.env, { npmConfigDirectory });
    const build = executor("npm", ["run", "build"], { cwd: root, env });
    captureInputPhase("build");
    const typecheck = executor("npm", ["run", "typecheck"], { cwd: root, env });
    captureInputPhase("typecheck");
    const test = executor("npm", ["test", "--", "--reporter=json", `--outputFile=${reportRelativePath}`], { cwd: root, env });
    captureInputPhase("test");
    let report = null;
    try {
        report = JSON.parse(readFileSync(reportPath, "utf8"));
    } catch {
        report = null;
    }
    const vitest = canonicalizeVitestReport(report, { executionRoot: root, view, evidencePlan, requiredSelfTests });
    const packageScratchRelative = ".git/BI-P000-PACK";
    const packageScratch = resolve(root, packageScratchRelative);
    rmSync(packageScratch, { recursive: true, force: true });
    mkdirSync(resolve(packageScratch, "tarballs"), { recursive: true });
    mkdirSync(resolve(packageScratch, "unpacked"), { recursive: true });
    const pack = executor("npm", ["pack", "--json", "--ignore-scripts", "--pack-destination", `${packageScratchRelative}/tarballs`], { cwd: root, env });
    captureInputPhase("pack");
    let packReport = null;
    try {
        packReport = JSON.parse(pack.stdout);
    } catch {
        packReport = null;
    }
    let packageClosure = { ok: false, errors: ["actual npm tarball was not available for unpacked inspection"], evidence: null };
    const filename = packReport?.[0]?.filename;
    if (typeof filename === "string" && filename.length > 0) {
        const tarball = resolve(packageScratch, "tarballs", filename);
        const extracted = runProcess("tar", ["-xzf", tarball, "-C", resolve(packageScratch, "unpacked")], { cwd: root, env });
        const unpackedPackage = resolve(packageScratch, "unpacked/package");
        if (extracted.exitCode === 0 && existsSync(unpackedPackage)) {
            symlinkSync(resolve(root, "node_modules"), resolve(unpackedPackage, "node_modules"), "dir");
            packageClosure = inspectPackedArtifactClosure(unpackedPackage, packReport);
        } else {
            packageClosure = { ok: false, errors: [`actual npm tarball extraction failed: ${outputTail(`${extracted.stdout}\n${extracted.stderr}`)}`], evidence: null };
        }
    }
    const inputImmutability = evaluateExactExecutionInputImmutability({ distPresentBeforeScrub, baseline: inputBaseline, phases: inputPhases });
    const evaluated = evaluateCanonicalCommandResults({ typecheck, test, build, pack, vitest, packageClosure, installer, inputImmutability });
    for (const row of evaluated.evidence.ordinaryTaskProvenance) row.argv = row.argv.map((token) => typeof token === "string" ? token.replaceAll(root, "$EXACT_VIEW") : token);
    if (Array.isArray(evaluated.evidence.installerBehavior?.installerArgv)) {
        evaluated.evidence.installerBehavior.installerArgv = evaluated.evidence.installerBehavior.installerArgv.map((token) => token === process.execPath ? "$NODE" : typeof token === "string" ? token.replaceAll(root, "$EXACT_VIEW") : token);
    }
    rmSync(packageScratch, { recursive: true, force: true });
    rmSync(npmConfigDirectory, { recursive: true, force: true });
    return evaluated;
}

function typedObservation({ kind, status, invariantFamilies, sourcePayloadDigest, payload }) {
    const body = { kind, status, invariantFamilies, sourcePayloadDigest, payload };
    return { ...body, evidenceDigest: sha256(canonicalJson(body)) };
}

export function validateObservationCoverage(observations, selectedFamilies) {
    const errors = [];
    const selected = new Set(selectedFamilies);
    const covered = new Set();
    const routed = new Set();
    for (const [index, observation] of observations.entries()) {
        if (!observation || !Array.isArray(observation.invariantFamilies) || observation.invariantFamilies.length === 0) {
            errors.push(`observations[${index}]: credited outcome must bind at least one selected invariant family`);
            continue;
        }
        const body = {
            kind: observation.kind,
            status: observation.status,
            invariantFamilies: observation.invariantFamilies,
            sourcePayloadDigest: observation.sourcePayloadDigest,
            payload: observation.payload,
        };
        if (!SHA256.test(observation.sourcePayloadDigest ?? "")) errors.push(`observations[${index}]: sourcePayloadDigest must bind the adjunct-excluding source payload SHA-256`);
        if (observation.evidenceDigest !== sha256(canonicalJson(body))) errors.push(`observations[${index}]: evidence digest does not reproduce`);
        for (const family of observation.invariantFamilies) {
            if (!selected.has(family)) errors.push(`observations[${index}]: unselected family ${family} cannot receive credit`);
            if (observation.status === "PASS") covered.add(family);
            else if (observation.status === "ROUTED_RED") routed.add(family);
            else errors.push(`observations[${index}]: ${family} has neither PASS nor an honest ROUTED_RED outcome`);
        }
    }
    for (const family of selected) if (!covered.has(family) && !routed.has(family)) errors.push(`selected invariant family ${family} has no typed PASS or routed outcome`);
    return { ok: errors.length === 0, errors, coveredFamilies: [...covered].sort(comparePaths), routedFamilies: [...routed].filter((family) => !covered.has(family)).sort(comparePaths) };
}

export function validateAnchoredDag(context) {
    const errors = [];
    const dag = context.dag;
    const waves = context.waves?.waves;
    if (!dag || !Array.isArray(dag.nodes) || !Array.isArray(dag.edges) || !Array.isArray(dag.strata) || !Array.isArray(waves)) return { ok: false, errors: ["anchored DAG/wave authority is malformed"] };
    const ids = dag.nodes.map((node) => node.id);
    const idSet = new Set(ids);
    if (idSet.size !== ids.length) errors.push("anchored DAG contains duplicate node ids");
    const waveIds = new Set(waves.map((wave) => wave.id));
    if (waveIds.size !== waves.length) errors.push("anchored wave authority contains duplicate wave ids");
    if (waveIds.size !== idSet.size || [...waveIds].some((id) => !idSet.has(id))) errors.push("anchored DAG nodes differ from anchored wave authority");
    if (dag.nodeCount !== dag.nodes.length || dag.edgeCount !== dag.edges.length || dag.stratumCount !== dag.strata.length || dag.sourceBase !== context.sourceBase) errors.push("anchored DAG descriptive counts/source base do not reproduce");
    const waveById = new Map(waves.map((wave) => [wave.id, wave]));
    for (const wave of waves) {
        if (!Array.isArray(wave.subjects) || wave.subjects.length === 0) errors.push(`${wave.id}: wave must own at least one subject`);
        const subjectPaths = (wave.subjects ?? []).map((subject) => subject.path);
        if (new Set(subjectPaths).size !== subjectPaths.length || subjectPaths.some((path) => typeof path !== "string" || path.length === 0)) errors.push(`${wave.id}: subject paths must be present and unique`);
        if (!Array.isArray(wave.dependsOn) || new Set(wave.dependsOn).size !== wave.dependsOn.length) errors.push(`${wave.id}: dependsOn must be a unique array`);
        const node = dag.nodes.find((candidate) => candidate.id === wave.id);
        const expectedLeases = [...new Set((wave.subjects ?? []).filter((subject) => subject.action !== "verify").flatMap((subject) => [subject.path, ...(subject.targetPath ? [subject.targetPath] : [])]))].sort(comparePaths);
        if (canonicalJson([...(node?.resourceLocks ?? [])].sort(comparePaths)) !== canonicalJson([...(wave.resourceLocks ?? [])].sort(comparePaths))) errors.push(`${wave.id}: DAG resource locks differ from wave authority`);
        if (canonicalJson([...(node?.implicitWriteLeases ?? [])].sort(comparePaths)) !== canonicalJson(expectedLeases)) errors.push(`${wave.id}: implicit write leases do not reproduce non-VERIFY subjects`);
    }
    const outgoing = new Map(ids.map((id) => [id, []]));
    const indegree = new Map(ids.map((id) => [id, 0]));
    const actualEdges = new Set();
    for (const edge of dag.edges) {
        if (!idSet.has(edge.from) || !idSet.has(edge.to) || edge.from === edge.to) {
            errors.push(`anchored DAG edge is invalid: ${String(edge.from)} -> ${String(edge.to)}`);
            continue;
        }
        const identity = `${edge.from}\0${edge.to}`;
        if (actualEdges.has(identity)) {
            errors.push(`anchored DAG contains duplicate edge ${edge.from} -> ${edge.to}`);
            continue;
        }
        actualEdges.add(identity);
        outgoing.get(edge.from).push(edge.to);
        indegree.set(edge.to, indegree.get(edge.to) + 1);
    }
    const expectedEdges = new Set();
    for (const wave of waves) for (const dependency of wave.dependsOn ?? []) expectedEdges.add(`${dependency}\0${wave.id}`);
    for (const edge of expectedEdges) if (!actualEdges.has(edge)) errors.push(`anchored DAG omits dependsOn edge ${edge.replace("\0", " -> ")}`);
    for (const edge of actualEdges) if (!expectedEdges.has(edge)) errors.push(`anchored DAG invents edge outside dependsOn ${edge.replace("\0", " -> ")}`);
    const queue = ids.filter((id) => indegree.get(id) === 0).sort(comparePaths);
    let visited = 0;
    while (queue.length) {
        const id = queue.shift();
        visited += 1;
        for (const target of outgoing.get(id)) {
            indegree.set(target, indegree.get(target) - 1);
            if (indegree.get(target) === 0) queue.push(target);
        }
        queue.sort(comparePaths);
    }
    if (visited !== ids.length) errors.push("anchored DAG is cyclic");
    if (visited === ids.length && dag.transitiveReductionRequired !== true) errors.push("anchored DAG must declare transitive reduction");
    if (visited === ids.length) {
        for (const edge of dag.edges) {
            const pending = [edge.from];
            const seen = new Set([edge.from]);
            let alternate = false;
            while (pending.length && !alternate) {
                const current = pending.shift();
                for (const target of outgoing.get(current) ?? []) {
                    if (current === edge.from && target === edge.to) continue;
                    if (target === edge.to) {
                        alternate = true;
                        break;
                    }
                    if (!seen.has(target)) {
                        seen.add(target);
                        pending.push(target);
                    }
                }
            }
            if (alternate) errors.push(`anchored DAG edge is not transitively minimal: ${edge.from} -> ${edge.to}`);
        }
    }
    const strataIds = new Set();
    const stratumByWave = new Map();
    let observedMaxWidth = 0;
    for (const [index, stratum] of dag.strata.entries()) {
        if (stratum.index !== index || stratum.id !== `BI.S${String(index).padStart(2, "0")}`) errors.push(`anchored DAG stratum ${index} has noncanonical identity/index`);
        if (!Array.isArray(stratum.waves) || stratum.width !== stratum.waves.length || new Set(stratum.waves).size !== stratum.waves.length) errors.push(`${stratum.id}: width/wave membership does not reproduce`);
        observedMaxWidth = Math.max(observedMaxWidth, stratum.waves?.length ?? 0);
        const batchMembers = (stratum.resourceSafeLaunchBatches ?? []).flat();
        if (new Set(batchMembers).size !== batchMembers.length || canonicalJson([...batchMembers].sort(comparePaths)) !== canonicalJson([...(stratum.waves ?? [])].sort(comparePaths))) errors.push(`${stratum.id}: launch batches do not partition the stratum exactly once`);
        for (const waveId of stratum.waves ?? []) {
            if (strataIds.has(waveId)) errors.push(`${waveId}: appears in multiple DAG strata`);
            strataIds.add(waveId);
            stratumByWave.set(waveId, index);
            const node = dag.nodes.find((candidate) => candidate.id === waveId);
            const wave = waveById.get(waveId);
            if (!node || !wave || node.stratum !== stratum.id || wave.topologicalStratum !== index) errors.push(`${waveId}: node, wave, and stratum authority disagree`);
        }
        for (const batch of stratum.resourceSafeLaunchBatches ?? []) {
            if (batch.length > Math.min(dag.maxLiveAgents, stratum.maxLiveAgents)) errors.push(`${stratum.id}: launch batch exceeds declared live-agent capacity`);
            const owned = new Map();
            for (const waveId of batch) {
                const node = dag.nodes.find((candidate) => candidate.id === waveId);
                for (const identity of [...(node?.resourceLocks ?? []), ...(node?.implicitWriteLeases ?? [])]) {
                    if (owned.has(identity)) errors.push(`${stratum.id}: launch batch lock/lease collision ${identity} between ${owned.get(identity)} and ${waveId}`);
                    else owned.set(identity, waveId);
                }
            }
        }
    }
    if (strataIds.size !== idSet.size || [...idSet].some((id) => !strataIds.has(id))) errors.push("anchored DAG strata do not cover every node exactly once");
    if (dag.maxStratumWidth !== observedMaxWidth) errors.push("anchored DAG maxStratumWidth does not reproduce");
    for (const edge of dag.edges) if ((stratumByWave.get(edge.from) ?? Infinity) >= (stratumByWave.get(edge.to) ?? -Infinity)) errors.push(`anchored DAG edge violates declared topological strata: ${edge.from} -> ${edge.to}`);
    for (const leafId of ids.filter((id) => (outgoing.get(id) ?? []).length === 0)) {
        const leaf = waveById.get(leafId);
        if (!leaf || leaf.subjects.every((subject) => subject.action === "verify") || !leaf.invariantFamilies?.length) {
            errors.push(`anchored DAG leaf ${leafId} is ceremony-only`);
        }
    }
    const critical = dag.criticalPath;
    if (!critical || !Array.isArray(critical.waves) || critical.waveCount !== critical.waves.length || critical.terminal !== critical.waves.at(-1)) {
        errors.push("anchored DAG critical path metadata is malformed");
    } else {
        for (let index = 1; index < critical.waves.length; index += 1) if (!actualEdges.has(`${critical.waves[index - 1]}\0${critical.waves[index]}`)) errors.push("anchored DAG critical path contains a non-edge");
        const distance = new Map(ids.map((id) => [id, 1]));
        const ordered = [...ids].sort((left, right) => (stratumByWave.get(left) - stratumByWave.get(right)) || comparePaths(left, right));
        for (const id of ordered) for (const target of outgoing.get(id) ?? []) distance.set(target, Math.max(distance.get(target), distance.get(id) + 1));
        const longest = Math.max(...distance.values());
        if (critical.waveCount !== longest) errors.push("anchored DAG critical path length does not reproduce");
        if ((outgoing.get(critical.terminal) ?? []).length !== 0) errors.push("anchored DAG critical terminal is not a leaf");
        const terminal = waveById.get(critical.terminal);
        if (!terminal || terminal.subjects.every((subject) => subject.action === "verify") || !terminal.invariantFamilies?.length) errors.push("anchored DAG ends in a ceremony-only terminal wave");
    }
    return { ok: errors.length === 0, errors };
}

export function validateRecoveryTuple({
    expectedIntegrationParent,
    actualIntegrationParent,
    expectedPayloadDigest,
    actualPayloadDigest,
    expectedTrailers,
    actualTrailers,
    candidateCommits,
    containingCommit,
    requireUniqueCommit = true,
}) {
    const errors = [];
    if (actualIntegrationParent !== expectedIntegrationParent) errors.push("recovery tuple integration parent does not bind the exact first parent");
    if (canonicalJson(actualPayloadDigest) !== canonicalJson(expectedPayloadDigest)) errors.push("recovery tuple payload digest does not reproduce");
    for (const [name, value] of Object.entries(expectedTrailers ?? {})) if (actualTrailers?.[name] !== value) errors.push(`recovery tuple trailer ${name} does not reproduce`);
    if (requireUniqueCommit) {
        const unique = [...new Set(candidateCommits ?? [])];
        if (unique.length !== 1 || unique[0] !== containingCommit) errors.push("recovery tuple does not resolve to exactly one containing child commit");
    }
    return { ok: errors.length === 0, errors };
}

export function validateCommittedBootstrapRecovery({ root, ref, receipt, receiptBytes }) {
    const containingCommit = git(root, ["rev-parse", ref]).stdout.trim();
    const parentRows = git(root, ["rev-list", "--parents", "-n", "1", containingCommit]).stdout.trim().split(/\s+/);
    const actualIntegrationParent = parentRows.length === 2 ? parentRows[1] : null;
    const targetReceiptDigest = receiptDigest(receiptBytes);
    const candidates = [];
    const history = git(root, ["rev-list", "--all", "--parents"]).stdout.split(/\r?\n/).filter(Boolean);
    for (const row of history) {
        const [commit, ...parents] = row.trim().split(/\s+/);
        if (parents.length !== 1 || parents[0] !== receipt.integrationParent) continue;
        const candidateReceipt = git(root, ["show", `${commit}:${DEFAULT_BOOTSTRAP_RECEIPT}`], { encoding: null, allowFailure: true });
        if (candidateReceipt.status !== 0) continue;
        const message = git(root, ["show", "-s", "--format=%B", commit]).stdout;
        const parsed = parseCommitTrailers(message);
        if (parsed.duplicates.length > 0 || parsed.trailers.get("BI-Wave") !== "BI.W-P000" || parsed.trailers.get("BI-Receipt-SHA256") !== targetReceiptDigest) continue;
        let value;
        try {
            value = JSON.parse(candidateReceipt.stdout.toString("utf8"));
        } catch {
            continue;
        }
        if (value.integrationParent !== receipt.integrationParent || receiptDigest(candidateReceipt.stdout) !== targetReceiptDigest) continue;
        const payload = canonicalStage0Payload(readRepositoryEntries(root, "commit", commit));
        if (canonicalJson(payload) !== canonicalJson(receipt.payloadDigestExcludingIntegrationAdjuncts)) continue;
        candidates.push(commit);
    }
    const parsed = parseCommitTrailers(git(root, ["show", "-s", "--format=%B", containingCommit]).stdout);
    return validateRecoveryTuple({
        expectedIntegrationParent: receipt.integrationParent,
        actualIntegrationParent,
        expectedPayloadDigest: receipt.payloadDigestExcludingIntegrationAdjuncts,
        actualPayloadDigest: canonicalStage0Payload(readRepositoryEntries(root, "commit", containingCommit)),
        expectedTrailers: { "BI-Wave": "BI.W-P000", "BI-Receipt-SHA256": targetReceiptDigest },
        actualTrailers: Object.fromEntries(parsed.trailers),
        candidateCommits: candidates,
        containingCommit,
        requireUniqueCommit: true,
    });
}

function validatorResult(evaluate) {
    try {
        const result = evaluate();
        if (result?.ok === true) return { ok: true, status: "PASS", exitCode: EXIT.PASS, errors: [] };
        return { ok: false, status: "RED", exitCode: EXIT.RED, errors: result?.errors ?? ["production validator returned RED"] };
    } catch (error) {
        return { ok: false, status: "RED", exitCode: Number.isInteger(error.exitCode) ? error.exitCode : EXIT.RED, errors: [error.message] };
    }
}

function mutateViewSource(view, path, transform, mode = view.mode(path)) {
    const bytes = transform(view.read(path).toString("utf8"));
    return overlayRepositoryView(view, { [path]: { bytes, mode } });
}

function withRestoredFileMutation(root, path, transform, evaluate) {
    const absolute = resolve(root, path);
    const pristine = readFileSync(absolute);
    const mode = lstatSync(absolute).mode & 0o777;
    try {
        writeFileSync(absolute, transform(pristine.toString("utf8")));
        chmodSync(absolute, mode);
        return evaluate();
    } finally {
        writeFileSync(absolute, pristine);
        chmodSync(absolute, mode);
        if (!readFileSync(absolute).equals(pristine)) throw new Error(`${path}: production mutation did not restore exact bytes`);
    }
}

export function canonicalMutationContext(context) {
    return {
        entries: context.entries.filter((entry) => !INTEGRATION_ADJUNCTS.includes(entry.path)),
        deltaPaths: context.deltaPaths.filter((path) => !INTEGRATION_ADJUNCTS.includes(path)),
    };
}

function makeProductionMutationCases({ plan, taxonomy, context, view, executionRoot, selectedFamilies, observations }) {
    const { entries: mutationEntries, deltaPaths: mutationDeltaPaths } = canonicalMutationContext(context);
    const structureCase = (requirement, mutation, changes) => ({
        adapter: "production-structure", requirement, mutation, validatorName: "verifyBootstrapStructure",
        pristine: { changes: {} },
        mutate(input) { input.changes = changes; },
        validator(input) { return verifyBootstrapStructure(plan, overlayRepositoryView(view, input.changes)); },
    });
    const rootPackage = JSON.parse(view.read("package.json").toString("utf8"));
    rootPackage.scripts["proof:restored"] = "node scripts/proof-restored.mjs";
    const nestedPackage = JSON.parse(view.read("tests-visual/package.json").toString("utf8"));
    nestedPackage.scripts["test:pi"] = "playwright test";
    const ciPath = ".github/workflows/ci.yml";
    const ciSource = view.read(ciPath).toString("utf8");
    const releasePath = "scripts/release.sh";
    const releaseSource = view.read(releasePath).toString("utf8");
    const structureCases = [
        structureCase("proof-alias", "restore a root proof/gate package alias", { "package.json": { bytes: `${JSON.stringify(rootPackage, null, 2)}\n`, mode: view.mode("package.json") } }),
        structureCase("proof-alias", "restore the nested tests-visual test:pi proof alias", { "tests-visual/package.json": { bytes: `${JSON.stringify(nestedPackage, null, 2)}\n`, mode: view.mode("tests-visual/package.json") } }),
        structureCase("ordinary-acceptance", "register ordinary typecheck/test/build as an acceptance identity", { "scripts/verification/typecheck.mjs": { bytes: "export default ['typecheck', 'test', 'build'];\n", mode: "100644" } }),
        structureCase("proof-path", "restore a scripts/proof-* executable path", { "scripts/proof-restored.mjs": { bytes: "process.exit(0);\n", mode: "100755" } }),
        structureCase("family-table", "add a central per-family table", { "scripts/verification/families.table.json": { bytes: "{}\n", mode: "100644" } }),
        structureCase("active-surface", "delete an active fresh-checkout surface", { [ciPath]: null }),
        structureCase("active-surface", "leave an active workflow pointing at a deleted proof owner", { [ciPath]: { bytes: ciSource.replaceAll("scripts/verify.mjs", "scripts/proof-build.mjs"), mode: view.mode(ciPath) } }),
        structureCase("active-surface", "retain the verifier invocation but append a deleted invocation", { [ciPath]: { bytes: `${ciSource}\n            - run: node scripts/proof-build.mjs\n`, mode: view.mode(ciPath) } }),
        structureCase("active-surface", "mask an active workflow verifier failure", { [ciPath]: { bytes: ciSource.replace("--wave-from-commit HEAD", "--wave-from-commit HEAD || true"), mode: view.mode(ciPath) } }),
        structureCase("ci-pr-head-checkout", "restore default checkout so pull_request verifies GitHub's synthetic merge commit", { [ciPath]: { bytes: ciSource.replace(`                  ref: ${CI_PR_HEAD_CHECKOUT_REF}\n`, ""), mode: view.mode(ciPath) } }),
        structureCase("active-surface", "mask an active release-shell verifier failure", { [releasePath]: { bytes: releaseSource.replace("node scripts/verify.mjs --state auto --profile release --require-terminal", "node scripts/verify.mjs --state auto --profile release --require-terminal || true"), mode: view.mode(releasePath) } }),
        structureCase("active-surface", "change the tracked hook executable mode", { ".githooks/commit-msg": { bytes: view.read(".githooks/commit-msg").toString("utf8"), mode: "100644" } }),
        structureCase("active-surface", "change the sole verifier executable mode", { "scripts/verify.mjs": { bytes: view.read("scripts/verify.mjs").toString("utf8"), mode: "100644" } }),
        structureCase("active-surface", "change the release-shell executable mode", { "scripts/release.sh": { bytes: releaseSource, mode: "100644" } }),
    ];
    for (const surface of plan.activeCommandSurfaces) {
        structureCases.push(structureCase("active-surface", `remove enrolled active surface ${surface.path}`, { [surface.path]: null }));
        const source = view.read(surface.path).toString("utf8");
        let mutated = source;
        if (surface.path === "package.json") {
            const packageValue = JSON.parse(source);
            packageValue.scripts.prepublishOnly = "node scripts/proof-build.mjs";
            mutated = `${JSON.stringify(packageValue, null, 2)}\n`;
        } else if (surface.path === "scripts/install-hooks.mjs") {
            mutated = source.replaceAll(".githooks", ".deleted-hooks");
        } else {
            mutated = source.replace(surface.requiredOwner, "scripts/proof-build.mjs");
        }
        structureCases.push(structureCase("active-surface", `change enrolled owner/argv for ${surface.path}`, { [surface.path]: { bytes: mutated, mode: view.mode(surface.path) } }));
    }
    const zero = { argv: ["fixture"], exitCode: 0, signal: null, error: null, stdout: "", stderr: "" };
    const structuredPass = { ok: true, errors: [], evidence: { fixture: true } };
    const commandPristine = { typecheck: zero, test: zero, build: zero, pack: zero, vitest: structuredPass, packageClosure: structuredPass, installer: structuredPass, inputImmutability: structuredPass };
    const manifestPaths = context.manifest.artifacts.map((artifact) => artifact.path);
    const verifySubject = context.wave.subjects.find((subject) => subject.action === "verify")?.path;
    const createSubject = context.wave.subjects.find((subject) => subject.action === "create")?.path;
    const deleteSubject = context.wave.subjects.find((subject) => subject.action === "delete")?.path;
    const recovery = {
        expectedIntegrationParent: "1".repeat(40), actualIntegrationParent: "1".repeat(40),
        expectedPayloadDigest: { algorithm: "fixture", sha256: "2".repeat(64), entryCount: 1 },
        actualPayloadDigest: { algorithm: "fixture", sha256: "2".repeat(64), entryCount: 1 },
        expectedTrailers: { "BI-Wave": "BI.W-P000", "BI-Receipt-SHA256": "3".repeat(64) },
        actualTrailers: { "BI-Wave": "BI.W-P000", "BI-Receipt-SHA256": "3".repeat(64) },
        candidateCommits: ["4".repeat(40)], containingCommit: "4".repeat(40), requireUniqueCommit: true,
    };
    const routeFailure = { findingId: "BI.P000.CURRENT.fixture", invariantFamily: "integrity.cursor", summary: "fixture current-source RED", routable: true };
    const routeAuthority = { taxonomy, waves: context.waves, allowPlannedBootstrapAdjunct: true };
    const route = { findingId: routeFailure.findingId, invariantFamily: routeFailure.invariantFamily, summary: routeFailure.summary, status: "ROUTED_RED", ownerWave: "BI.W-P001", evidencePath: DEFAULT_BOOTSTRAP_RECEIPT };
    const installerPristine = {
        "scripts/install-hooks.mjs": readFileSync(resolve(executionRoot, "scripts/install-hooks.mjs"), "utf8"),
        ".githooks/commit-msg": readFileSync(resolve(executionRoot, ".githooks/commit-msg"), "utf8"),
    };
    const receiptEvidenceDigest = "a".repeat(64);
    const receiptPristine = {
        schemaVersion: "1.0.0",
        authority: "GIT_FIRST_PARENT_PLUS_COMMITTED_RECEIPTS",
        formationDigest: context.formationDigest,
        formationAnchorParent: context.formationAnchorParent,
        sourceBase: context.sourceBase,
        waveId: "BI.W-P000",
        status: "DONE",
        integrationParent: context.integrationParent,
        preCommandSet: context.preCommandSet,
        postCommandSet: context.postCommandSet,
        subjectOutcomes: context.subjectOutcomes,
        evidenceDigest: receiptEvidenceDigest,
        routedCurrentReds: [],
        intendedTrailers: { names: CORE_TRAILERS, values: { "BI-Wave": "BI.W-P000", "BI-Status": "DONE", "BI-Formation-SHA256": context.formationDigest }, externallyDerived: ["BI-Receipt-SHA256"] },
        payloadDigestExcludingIntegrationAdjuncts: context.payloadDigest,
    };
    const receiptValidator = (input) => validateBootstrapReceipt(input, { ...context, evidenceDigest: receiptEvidenceDigest, routedCurrentReds: [] });
    const installerValidator = (input) => {
        const originals = new Map();
        try {
            for (const [path, source] of Object.entries(input)) {
                const absolute = resolve(executionRoot, path);
                originals.set(path, { bytes: readFileSync(absolute), mode: lstatSync(absolute).mode & 0o777 });
                writeFileSync(absolute, source);
                chmodSync(absolute, originals.get(path).mode);
            }
            return executeInstallerBehavior(executionRoot, { resetRepository: true });
        } finally {
            for (const [path, original] of originals) {
                const absolute = resolve(executionRoot, path);
                writeFileSync(absolute, original.bytes);
                chmodSync(absolute, original.mode);
                if (!readFileSync(absolute).equals(original.bytes)) throw new Error(`${path}: installer mutation did not restore exact bytes`);
            }
        }
    };
    const packageFixture = {
        files: {
            "package.json": `${JSON.stringify({ name: "@fixture/package", type: "module", exports: { ".": { types: "./dist/index.d.ts", import: "./dist/index.js" } } })}\n`,
            "dist/index.js": "export const fixture = true;\n",
            "dist/index.d.ts": "export { type Fixture } from './types.js';\n",
            "dist/types.d.ts": "export interface Fixture { ok: true }\n",
            "dist/style.css": ".fixture { background-image: url('./font.woff2'); }\n",
            "dist/font.woff2": "fixture-font",
        },
    };
    const packageFixtureValidator = (input) => {
        const fixtureRoot = mkdtempSync(resolve(executionRoot, ".bi-package-mutation-"));
        try {
            for (const [path, source] of Object.entries(input.files)) {
                const absolute = resolve(fixtureRoot, path);
                mkdirSync(dirname(absolute), { recursive: true });
                writeFileSync(absolute, source);
            }
            const files = Object.keys(input.files).sort(comparePaths).map((path) => ({ path }));
            return inspectPackedArtifactClosure(fixtureRoot, [{ files }]);
        } finally {
            rmSync(fixtureRoot, { recursive: true, force: true });
        }
    };
    const runtimeNormalizationPristine = {
        diagnostics: [
            'TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts" for /fixture/node_modules/@mkbabb/pencil-boil/src/index.ts',
            'Error [ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING]: Type stripping is currently unsupported for files under node_modules, for "/fixture/node_modules/@mkbabb/pencil-boil/src/index.ts"',
        ],
        expected: { failureClass: "UNSUPPORTED_TYPESCRIPT_RUNTIME_DEPENDENCY", dependency: "@mkbabb/pencil-boil" },
    };
    const runtimeNormalizationValidator = (input) => {
        const outcomes = input.diagnostics.map(normalizeRuntimeImportFailure);
        const ok = outcomes.every((outcome) => canonicalJson(outcome) === canonicalJson(input.expected));
        return { ok, errors: ok ? [] : ["engine-specific runtime import failures did not normalize to one semantic class"] };
    };
    const trailerPristine = {
        message: `feat(tranche): fixture\n\nBI-Wave: BI.W-P000\nBI-Status: DONE\nBI-Receipt-SHA256: ${"3".repeat(64)}\nBI-Formation-SHA256: ${context.formationDigest}\n`,
    };
    const trailerValidator = (input) => validatorResult(() => {
        const parsed = parseCommitTrailers(input.message);
        const ok = parsed.duplicates.length === 0 && CORE_TRAILERS.every((name) => parsed.trailers.has(name));
        return { ok, errors: ok ? [] : ["actual terminal Git trailer block does not contain the exact core tuple"] };
    });
    const adjunctBase = {
        entries: [{ path: "package.json", mode: "100644", oid: "1".repeat(40) }],
        deltaPaths: ["package.json"],
    };
    const adjunctPristine = {
        withoutAdjuncts: adjunctBase,
        withAdjuncts: {
            entries: [...adjunctBase.entries, ...INTEGRATION_ADJUNCTS.map((path, index) => ({ path, mode: "100644", oid: String(index + 6).repeat(40) }))],
            deltaPaths: [...adjunctBase.deltaPaths, ...INTEGRATION_ADJUNCTS],
        },
    };
    const adjunctValidator = (input) => {
        const left = canonicalMutationContext(input.withoutAdjuncts);
        const right = canonicalMutationContext(input.withAdjuncts);
        const ok = canonicalJson(left) === canonicalJson(right);
        return { ok, errors: ok ? [] : ["integration adjuncts changed canonical mutation evidence inputs"] };
    };
    const vitestFixturePath = "tests/verification/p000-mutation-fixture.test.ts";
    const vitestPristine = {
        report: { testResults: [{ name: vitestFixturePath, status: "passed", assertionResults: [{ fullName: "ordinary semantic assertion", status: "passed" }] }] },
        evidencePlan: { sources: [{ kind: "normal-test", path: vitestFixturePath, sha256: "4".repeat(64), assertions: [{ callee: "expect.toBe", line: 1, column: 1 }], invariantFamilies: ["architecture.clean-break"] }] },
    };
    const vitestFixtureView = { oid(path) { return path === vitestFixturePath ? "5".repeat(40) : null; } };
    const vitestValidator = (input) => canonicalizeVitestReport(input.report, { executionRoot, view: vitestFixtureView, evidencePlan: input.evidencePlan });
    const sanitizerPath = resolve(executionRoot, "scripts/verify.mjs");
    const sanitizerConfigDirectory = resolve(executionRoot, ".git/BI-P000-NPM-CONFIG-MUTATION");
    const sanitizerPristine = {
        source: readFileSync(sanitizerPath, "utf8"),
        baseEnvironment: {
            ...Object.fromEntries(CHILD_ENVIRONMENT_REMOVAL_POLICY.exactNames.map((name) => [name, "/poison"])),
            NpM_CoNfIg_NoDe_OpTiOnS: "--require=/poison.cjs",
            NpM_CoNfIg_ScRiPt_ShElL: "/poison/selective-shell",
            NpM_CoNfIg_UsErCoNfIg: "/poison/user-npmrc",
            NpM_CoNfIg_GlObAlCoNfIg: "/poison/global-npmrc",
            BI_SAFE_SENTINEL: "preserved",
        },
        expectedRemovedNames: [
            ...CHILD_ENVIRONMENT_REMOVAL_POLICY.exactNames,
            "NpM_CoNfIg_NoDe_OpTiOnS",
            "NpM_CoNfIg_ScRiPt_ShElL",
        ],
    };
    const sanitizerValidator = (input) => {
        const pristine = readFileSync(sanitizerPath);
        const mode = lstatSync(sanitizerPath).mode & 0o777;
        try {
            writeFileSync(sanitizerPath, input.source);
            chmodSync(sanitizerPath, mode);
            const probe = runProcess(process.execPath, [
                "--input-type=module",
                "--eval",
                "const { resolve } = await import('node:path'); const { sanitizedRepositoryEnvironment } = await import(process.argv[1]); const fixture = JSON.parse(process.argv[2]); const configDirectory = process.argv[3]; const clean = sanitizedRepositoryEnvironment(fixture.baseEnvironment, { npmConfigDirectory: configDirectory }); if (fixture.expectedRemovedNames.some((name) => Object.hasOwn(clean, name)) || clean.NPM_CONFIG_USERCONFIG !== resolve(configDirectory, 'user.npmrc') || clean.NPM_CONFIG_GLOBALCONFIG !== resolve(configDirectory, 'global.npmrc') || clean.BI_SAFE_SENTINEL !== 'preserved') process.exit(1);",
                pathToFileURL(sanitizerPath).href,
                JSON.stringify({ baseEnvironment: input.baseEnvironment, expectedRemovedNames: input.expectedRemovedNames }),
                sanitizerConfigDirectory,
            ], { cwd: executionRoot, env: sanitizedRepositoryEnvironment() });
            return { ok: probe.exitCode === 0 && !probe.signal && !probe.error, errors: probe.exitCode === 0 ? [] : ["exact-view child environment retained a repository-redirection or code-injection variable"] };
        } finally {
            rmSync(sanitizerConfigDirectory, { recursive: true, force: true });
            writeFileSync(sanitizerPath, pristine);
            chmodSync(sanitizerPath, mode);
            if (!readFileSync(sanitizerPath).equals(pristine)) throw new Error("scripts/verify.mjs: environment mutation did not restore exact bytes");
        }
    };
    const inputMutationBaseline = snapshotExactExecutionInputs(executionRoot);
    const inputMutationPristine = {
        path: "package.json",
        phase: "build",
        baselineDigest: inputMutationBaseline.digest,
        plantTrackedChange: false,
    };
    const inputMutationValidator = (input) => {
        if (input.baselineDigest !== inputMutationBaseline.digest) return { ok: false, errors: ["exact input mutation fixture baseline digest is stale"] };
        const evaluate = () => validateExactExecutionInputs(inputMutationBaseline, snapshotExactExecutionInputs(executionRoot), { phase: input.phase });
        if (!input.plantTrackedChange) return evaluate();
        return withRestoredFileMutation(executionRoot, input.path, (source) => `${source}\n`, evaluate);
    };
    const dagPristine = { dag: context.dag, waves: context.waves, sourceBase: context.sourceBase };
    const edgeSet = new Set(context.dag.edges.map((edge) => `${edge.from}\0${edge.to}`));
    const transitiveChain = context.dag.edges.flatMap((left) => context.dag.edges.filter((right) => right.from === left.to && !edgeSet.has(`${left.from}\0${right.to}`)).map((right) => ({ from: left.from, to: right.to })))[0];
    const collidingBatch = context.dag.strata.flatMap((stratum) => stratum.resourceSafeLaunchBatches).find((batch) => batch.length > 1);
    const cases = [
        ...structureCases,
        { adapter: "production-taxonomy", requirement: "fixed-count", mutation: "freeze the descriptive invariant count as normative", validatorName: "validateInvariantTaxonomy", pristine: taxonomy, mutate(input) { input.normativeCount = true; }, validator: validateInvariantTaxonomy },
        { adapter: "production-parser", requirement: "bootstrap-scope", mutation: "let bootstrap authority select a non-P000 wave", validatorName: "parseVerifierArgs", pristine: ["--bootstrap-plan", DEFAULT_BOOTSTRAP_PLAN, "--wave", "BI.W-P000", "--evidence-digest-only"], mutate(input) { input[input.indexOf("BI.W-P000")] = "BI.W-P001"; }, validator(input) { return validatorResult(() => ({ ok: Boolean(parseVerifierArgs(input)) })); } },
        { adapter: "production-command-evidence", requirement: "exit-laundering", mutation: "launder missing semantic evidence through exit-zero tasks", validatorName: "evaluateCanonicalCommandResults", pristine: commandPristine, mutate(input) { input.vitest = null; input.packageClosure = null; input.installer = null; }, validator: evaluateCanonicalCommandResults },
        { adapter: "production-package", requirement: "build-css", mutation: "delete one packed CSS asset", validatorName: "inspectPackedArtifactClosure", pristine: packageFixture, mutate(input) { delete input.files["dist/font.woff2"]; }, validator: packageFixtureValidator },
        { adapter: "production-package", requirement: "build-declaration", mutation: "point an emitted import-type declaration at a source-only path", validatorName: "inspectPackedArtifactClosure", pristine: packageFixture, mutate(input) { input.files["dist/index.d.ts"] = "export type Fixture = import('../src/source-only.js').Fixture;\n"; }, validator: packageFixtureValidator },
        { adapter: "production-package", requirement: "build-public-export", mutation: "make public exports invalid while direct target files remain importable", validatorName: "inspectPackedArtifactClosure", pristine: packageFixture, mutate(input) { const value = JSON.parse(input.files["package.json"]); value.exports.import = "./dist/index.js"; input.files["package.json"] = `${JSON.stringify(value)}\n`; }, validator: packageFixtureValidator },
        { adapter: "production-package", requirement: "build-public-export", mutation: "add a public subpath key with a forbidden dot segment", validatorName: "inspectPackedArtifactClosure", pristine: packageFixture, mutate(input) { const value = JSON.parse(input.files["package.json"]); value.exports["./bad/../escape"] = "./dist/index.js"; input.files["package.json"] = `${JSON.stringify(value)}\n`; }, validator: packageFixtureValidator },
        { adapter: "production-package", requirement: "build-public-types-target", mutation: "escape a public declaration export target outside the packed package", validatorName: "inspectPackedArtifactClosure", pristine: packageFixture, mutate(input) { const value = JSON.parse(input.files["package.json"]); value.exports["."].types = "../src/source-only.d.ts"; input.files["package.json"] = `${JSON.stringify(value)}\n`; }, validator: packageFixtureValidator },
        { adapter: "production-package", requirement: "build-types-versions-target", mutation: "escape a TypeScript typesVersions mapping outside the packed package", validatorName: "inspectPackedArtifactClosure", pristine: packageFixture, mutate(input) { const value = JSON.parse(input.files["package.json"]); value.typesVersions = { "*": { "*": ["../src/*"] } }; input.files["package.json"] = `${JSON.stringify(value)}\n`; }, validator: packageFixtureValidator },
        { adapter: "production-package", requirement: "build-top-level-target", mutation: "escape a top-level package types target outside the packed package", validatorName: "inspectPackedArtifactClosure", pristine: packageFixture, mutate(input) { const value = JSON.parse(input.files["package.json"]); value.types = "../src/source-only.d.ts"; input.files["package.json"] = `${JSON.stringify(value)}\n`; }, validator: packageFixtureValidator },
        { adapter: "production-package", requirement: "build-export-leaf-type", mutation: "replace a non-null public declaration target with an invalid boolean leaf", validatorName: "inspectPackedArtifactClosure", pristine: packageFixture, mutate(input) { const value = JSON.parse(input.files["package.json"]); value.exports["."].types = true; input.files["package.json"] = `${JSON.stringify(value)}\n`; }, validator: packageFixtureValidator },
        { adapter: "production-package", requirement: "build-runtime-normalization", mutation: "replace one equivalent cross-Node TypeScript-runtime diagnostic with a different failure class", validatorName: "normalizeRuntimeImportFailure", pristine: runtimeNormalizationPristine, mutate(input) { input.diagnostics[1] = "Error [ERR_MODULE_NOT_FOUND]: Cannot find package fixture"; }, validator: runtimeNormalizationValidator },
        { adapter: "production-vitest", requirement: "vitest-skipped", mutation: "mark an enrolled ordinary semantic assertion pending under a passed file", validatorName: "canonicalizeVitestReport", pristine: vitestPristine, mutate(input) { input.report.testResults[0].assertionResults[0].status = "pending"; }, validator: vitestValidator },
        { adapter: "production-trailers", requirement: "trailer-block", mutation: "move the BI tuple out of the actual terminal Git trailer block", validatorName: "parseCommitTrailers", pristine: trailerPristine, mutate(input) { input.message += "\nnon-trailer body after pseudo-trailers\n"; }, validator: trailerValidator },
        { adapter: "production-adjunct", requirement: "adjunct-stability", mutation: "add a non-adjunct entry to the post-receipt mutation context", validatorName: "canonicalMutationContext", pristine: adjunctPristine, mutate(input) { input.withAdjuncts.entries.push({ path: "foreign.json", mode: "100644", oid: "9".repeat(40) }); }, validator: adjunctValidator },
        { adapter: "production-environment", requirement: "env-isolation", mutation: "disable the exact-name child-environment removal loop", validatorName: "sanitizedRepositoryEnvironment", pristine: sanitizerPristine, mutate(input) { input.source = input.source.replace("for (const name of CHILD_ENVIRONMENT_REMOVAL_POLICY.exactNames) delete environment[name];", "for (const name of []) delete environment[name];"); }, validator: sanitizerValidator },
        { adapter: "production-environment", requirement: "env-script-shell-isolation", mutation: "stop removing case-insensitive npm script-shell injection", validatorName: "sanitizedRepositoryEnvironment", pristine: sanitizerPristine, mutate(input) { input.source = input.source.replace('caseInsensitiveNames: Object.freeze(["npm_config_node_options", "npm_config_script_shell"]),', 'caseInsensitiveNames: Object.freeze(["npm_config_node_options"]),'); }, validator: sanitizerValidator },
        { adapter: "production-environment", requirement: "env-user-npmrc-isolation", mutation: "stop forcing npm user configuration to an exact-view empty config", validatorName: "sanitizedRepositoryEnvironment", pristine: sanitizerPristine, mutate(input) { input.source = input.source.replace("environment.NPM_CONFIG_USERCONFIG = userConfigPath;", "void environment;"); }, validator: sanitizerValidator },
        { adapter: "production-environment", requirement: "env-global-npmrc-isolation", mutation: "stop forcing npm global configuration to an exact-view empty config", validatorName: "sanitizedRepositoryEnvironment", pristine: sanitizerPristine, mutate(input) { input.source = input.source.replace("environment.NPM_CONFIG_GLOBALCONFIG = globalConfigPath;", "void environment;"); }, validator: sanitizerValidator },
        { adapter: "production-input-immutability", requirement: "exact-input-immutability", mutation: "change one tracked exact execution input after the build phase", validatorName: "snapshotExactExecutionInputs/validateExactExecutionInputs", pristine: inputMutationPristine, mutate(input) { input.plantTrackedChange = true; }, validator: inputMutationValidator },
        { adapter: "production-routing", requirement: "route-drop", mutation: "drop an encountered current-source RED route", validatorName: "validateCurrentRedRouting", pristine: { failures: [routeFailure], routes: [route], authority: routeAuthority }, mutate(input) { input.routes = []; }, validator(input) { return validateCurrentRedRouting(input.failures, input.routes, input.authority, view); } },
        { adapter: "production-routing", requirement: "route-multiple", mutation: "multiply route an encountered current-source RED", validatorName: "validateCurrentRedRouting", pristine: { failures: [routeFailure], routes: [route], authority: routeAuthority }, mutate(input) { input.routes.push(structuredClone(input.routes[0])); }, validator(input) { return validateCurrentRedRouting(input.failures, input.routes, input.authority, view); } },
        { adapter: "production-routing", requirement: "route-false-pass", mutation: "count a routed current-source RED as PASS", validatorName: "validateCurrentRedRouting", pristine: { failures: [routeFailure], routes: [route], authority: routeAuthority }, mutate(input) { input.routes[0].status = "PASS"; }, validator(input) { return validateCurrentRedRouting(input.failures, input.routes, input.authority, view); } },
        { adapter: "production-routing", requirement: "route-binding", mutation: "route a current-source RED under a falsified summary", validatorName: "validateCurrentRedRouting", pristine: { failures: [routeFailure], routes: [route], authority: routeAuthority }, mutate(input) { input.routes[0].summary = "falsified summary"; }, validator(input) { return validateCurrentRedRouting(input.failures, input.routes, input.authority, view); } },
        { adapter: "production-routing", requirement: "route-owner", mutation: "route a current-source RED to a wave that does not declare its family", validatorName: "validateCurrentRedRouting", pristine: { failures: [routeFailure], routes: [route], authority: routeAuthority }, mutate(input) { input.routes[0].ownerWave = "BI.W-P002"; }, validator(input) { return validateCurrentRedRouting(input.failures, input.routes, input.authority, view); } },
        { adapter: "production-routing", requirement: "route-evidence", mutation: "route a current-source RED to a different or nonexistent evidence path", validatorName: "validateCurrentRedRouting", pristine: { failures: [routeFailure], routes: [route], authority: routeAuthority }, mutate(input) { input.routes[0].evidencePath = "docs/tranches/BI/evidence/nonexistent.json"; }, validator(input) { return validateCurrentRedRouting(input.failures, input.routes, input.authority, view); } },
        { adapter: "production-scope", requirement: "foreign-scope", mutation: "add a foreign staged path", validatorName: "validateSubjectDeltaClosure", pristine: { wave: context.wave, paths: mutationDeltaPaths }, mutate(input) { input.paths.push("foreign.txt"); }, validator(input) { return validateSubjectDeltaClosure(input.wave, input.paths); } },
        ...(verifySubject ? [{ adapter: "production-scope", requirement: "verify-scope", mutation: "change a verify-only authority path", validatorName: "validateSubjectDeltaClosure", pristine: { wave: context.wave, paths: mutationDeltaPaths }, mutate(input) { input.paths.push(verifySubject); }, validator(input) { return validateSubjectDeltaClosure(input.wave, input.paths); } }] : []),
        ...(verifySubject ? [
            { adapter: "production-disposition", requirement: "verify-blob", mutation: "change a verify-only authority blob", validatorName: "deriveSubjectOutcomes", pristine: { subjects: context.wave.subjects, entries: mutationEntries, anchorEntries: context.anchorEntries }, mutate(input) { const entry = input.entries.find((item) => item.path === verifySubject); entry.oid = "9".repeat(40); }, validator(input) { return validatorResult(() => ({ ok: Boolean(deriveSubjectOutcomes(input.subjects, input.entries, input.anchorEntries)) })); } },
            { adapter: "production-disposition", requirement: "verify-mode", mutation: "change a verify-only authority Git mode", validatorName: "deriveSubjectOutcomes", pristine: { subjects: context.wave.subjects, entries: mutationEntries, anchorEntries: context.anchorEntries }, mutate(input) { const entry = input.entries.find((item) => item.path === verifySubject); entry.mode = entry.mode === "100644" ? "100755" : "100644"; }, validator(input) { return validatorResult(() => ({ ok: Boolean(deriveSubjectOutcomes(input.subjects, input.entries, input.anchorEntries)) })); } },
        ] : []),
        ...(createSubject ? [{ adapter: "production-disposition", requirement: "create-disposition", mutation: "drop a required CREATE terminal image", validatorName: "deriveSubjectOutcomes", pristine: { subjects: context.wave.subjects, entries: mutationEntries, anchorEntries: context.anchorEntries }, mutate(input) { input.entries = input.entries.filter((item) => item.path !== createSubject); }, validator(input) { return validatorResult(() => ({ ok: Boolean(deriveSubjectOutcomes(input.subjects, input.entries, input.anchorEntries)) })); } }] : []),
        ...(deleteSubject ? [{ adapter: "production-disposition", requirement: "delete-disposition", mutation: "restore a required DELETE terminal image", validatorName: "deriveSubjectOutcomes", pristine: { subjects: context.wave.subjects, entries: mutationEntries, anchorEntries: context.anchorEntries }, mutate(input) { const anchor = input.anchorEntries.find((item) => item.path === deleteSubject); input.entries.push(structuredClone(anchor)); }, validator(input) { return validatorResult(() => ({ ok: Boolean(deriveSubjectOutcomes(input.subjects, input.entries, input.anchorEntries)) })); } }] : []),
        { adapter: "production-receipt", requirement: "receipt-acyclic", mutation: "embed a forbidden containing-commit self-reference", validatorName: "validateBootstrapReceipt", pristine: receiptPristine, mutate(input) { input.commitSha = "b".repeat(40); }, validator: receiptValidator },
        { adapter: "production-receipt", requirement: "receipt-commands", mutation: "falsify the exact post-command set", validatorName: "validateBootstrapReceipt", pristine: receiptPristine, mutate(input) { input.postCommandSet[0].argv += " --masked"; }, validator: receiptValidator },
        { adapter: "production-receipt", requirement: "receipt-evidence", mutation: "falsify the semantic evidence digest", validatorName: "validateBootstrapReceipt", pristine: receiptPristine, mutate(input) { input.evidenceDigest = "c".repeat(64); }, validator: receiptValidator },
        { adapter: "production-receipt", requirement: "receipt-payload", mutation: "remove an integration adjunct from payload exclusions", validatorName: "validateBootstrapReceipt", pristine: receiptPristine, mutate(input) { input.payloadDigestExcludingIntegrationAdjuncts.excludes.pop(); }, validator: receiptValidator },
        { adapter: "production-manifest", requirement: "manifest-closure", mutation: "hide an extra formation authority outside the manifest", validatorName: "validateFormationTreeClosure", pristine: { manifestPaths, treePaths: [...manifestPaths] }, mutate(input) { input.treePaths.push("unlisted.json"); }, validator(input) { return validateFormationTreeClosure(input.manifestPaths, input.treePaths); } },
        { adapter: "production-dag", requirement: "dag-edge", mutation: "remove one anchored dependsOn edge", validatorName: "validateAnchoredDag", pristine: dagPristine, mutate(input) { input.dag.edges.shift(); }, validator: validateAnchoredDag },
        ...(transitiveChain ? [{ adapter: "production-dag", requirement: "dag-transitive", mutation: "add a non-minimal transitive dependency edge", validatorName: "validateAnchoredDag", pristine: { ...dagPristine, chain: transitiveChain }, mutate(input) { input.dag.edges.push({ ...input.chain }); input.dag.edgeCount += 1; input.waves.waves.find((wave) => wave.id === input.chain.to).dependsOn.push(input.chain.from); }, validator: validateAnchoredDag }] : []),
        ...(collidingBatch ? [{ adapter: "production-dag", requirement: "dag-lock", mutation: "make a declared parallel batch collide on a semantic lock", validatorName: "validateAnchoredDag", pristine: { ...dagPristine, batch: collidingBatch }, mutate(input) { for (const waveId of input.batch.slice(0, 2)) { input.dag.nodes.find((node) => node.id === waveId).resourceLocks.push("fixture-collision"); input.waves.waves.find((wave) => wave.id === waveId).resourceLocks.push("fixture-collision"); } }, validator: validateAnchoredDag }] : []),
        { adapter: "production-dag", requirement: "dag-tail", mutation: "replace the substantive critical terminal with ceremony-only VERIFY work", validatorName: "validateAnchoredDag", pristine: dagPristine, mutate(input) { const terminalId = input.dag.criticalPath.terminal; const wave = input.waves.waves.find((candidate) => candidate.id === terminalId); for (const subject of wave.subjects) { subject.action = "verify"; delete subject.targetPath; } wave.invariantFamilies = []; input.dag.nodes.find((node) => node.id === terminalId).implicitWriteLeases = []; }, validator: validateAnchoredDag },
        ...selectedFamilies.map((targetFamily) => ({ adapter: "production-attribution", requirement: `typed-attribution:${targetFamily}`, mutation: `remove the last typed attribution for ${targetFamily}`, validatorName: "validateObservationCoverage", pristine: { observations, families: selectedFamilies, targetFamily }, mutate(input) { for (const observation of input.observations) observation.invariantFamilies = observation.invariantFamilies.filter((family) => family !== input.targetFamily); }, validator(input) { return validateObservationCoverage(input.observations, input.families); } })),
        { adapter: "production-recovery", requirement: "recovery-parent", mutation: "falsify the exact integration parent", validatorName: "validateRecoveryTuple", pristine: recovery, mutate(input) { input.actualIntegrationParent = "5".repeat(40); }, validator: validateRecoveryTuple },
        { adapter: "production-recovery", requirement: "recovery-payload", mutation: "falsify the payload digest", validatorName: "validateRecoveryTuple", pristine: recovery, mutate(input) { input.actualPayloadDigest.sha256 = "6".repeat(64); }, validator: validateRecoveryTuple },
        { adapter: "production-recovery", requirement: "recovery-trailer", mutation: "falsify the wave/digest trailer tuple", validatorName: "validateRecoveryTuple", pristine: recovery, mutate(input) { input.actualTrailers["BI-Wave"] = "BI.W-P001"; }, validator: validateRecoveryTuple },
        { adapter: "production-recovery", requirement: "recovery-trailer", mutation: "falsify the raw receipt digest trailer", validatorName: "validateRecoveryTuple", pristine: recovery, mutate(input) { input.actualTrailers["BI-Receipt-SHA256"] = "8".repeat(64); }, validator: validateRecoveryTuple },
        { adapter: "production-recovery", requirement: "recovery-unique", mutation: "make the containing child non-unique", validatorName: "validateRecoveryTuple", pristine: recovery, mutate(input) { input.candidateCommits.push("7".repeat(40)); }, validator: validateRecoveryTuple },
        { adapter: "production-installer", requirement: "installer-config", mutation: "deaden core.hooksPath configuration", validatorName: "executeInstallerBehavior/evaluateInstallerBehavior", pristine: installerPristine, mutate(input) { input["scripts/install-hooks.mjs"] = input["scripts/install-hooks.mjs"].replace('git(["config", "core.hooksPath", ".githooks"], { cwd: root });', "void root;"); }, validator: installerValidator },
        { adapter: "production-installer", requirement: "installer-owner", mutation: "point installed hook at a deleted owner", validatorName: "executeInstallerBehavior/evaluateInstallerBehavior", pristine: installerPristine, mutate(input) { input[".githooks/commit-msg"] = input[".githooks/commit-msg"].replace("scripts/verify.mjs", "scripts/proof-build.mjs"); }, validator: installerValidator },
    ];
    return cases;
}

export async function collectBootstrapEvidence({ root, executionRoot, sourcePayloadDigest, materialization, context, plan, taxonomy, view, waveId, routedCurrentReds = [], requiredSelfTests = [], commandExecutor, allowPlannedBootstrapEvidence = false } = {}) {
    if (!SHA256.test(sourcePayloadDigest ?? "")) throw new VerifierFailure("bootstrap sourcePayloadDigest must be the adjunct-excluding payload SHA-256", EXIT.INVALID_CONTRACT);
    if (!materialization || !SHA256.test(materialization.executionScopeDigest ?? "") || !Array.isArray(materialization.executionScope)) throw new VerifierFailure("exact semantic execution scope evidence is absent", EXIT.INVALID_CONTRACT);
    const taxonomyValidation = validateInvariantTaxonomy(taxonomy);
    if (!taxonomyValidation.ok) throw new VerifierFailure(taxonomyValidation.errors.join("\n"), EXIT.INVALID_CONTRACT);
    if (taxonomy.sourceBase !== plan.sourceBase) throw new VerifierFailure("invariant taxonomy and bootstrap plan source bases differ", EXIT.INVALID_CONTRACT);
    let selected;
    try {
        selected = selectInvariantFamilies(taxonomy, plan.allowedInvariantFamilies, "bootstrap");
    } catch (error) {
        throw new VerifierFailure(error.message, EXIT.INVALID_CONTRACT);
    }
    if (selected.some((invariant) => invariant.kind !== "device-free")) {
        throw new VerifierFailure("P000 immutable plan selected a browser product family", EXIT.INVALID_CONTRACT);
    }
    const structure = verifyBootstrapStructure(plan, view);
    let evidencePlan;
    try {
        evidencePlan = await discoverEvidencePlan({
            root,
            waveId,
            profile: "bootstrap",
            authority: plan.authority,
            invariantFamilies: selected,
            knownInvariantFamilies: taxonomy.invariants.map((invariant) => invariant.id),
            currentReds: routedCurrentReds,
            files: view.entries.map((entry) => entry.path),
            readSource: (path) => view.read(path),
        });
    } catch (error) {
        throw new VerifierFailure(error.message, EXIT.INVALID_CONTRACT);
    }
    const dag = validateAnchoredDag(context);
    const commands = structure.ok && dag.ok
        ? executeCanonicalCommands({ root: executionRoot, evidencePlan, view, requiredSelfTests, executor: commandExecutor ?? runProcess })
        : { ok: false, errors: ["canonical tasks were not executed because bootstrap structure or anchored DAG are RED"], failures: [], evidence: null };
    const selectedIds = selected.map((invariant) => invariant.id);
    const routing = validateCurrentRedRouting(commands.failures ?? [], routedCurrentReds, { taxonomy, waves: context.waves, allowPlannedBootstrapAdjunct: allowPlannedBootstrapEvidence }, view);
    const routedIds = new Set(routing.ok ? routing.routedFailures.map((failure) => failure.findingId) : []);
    const statusFor = (family, mechanismPass) => {
        if (mechanismPass) return "PASS";
        const failures = (commands.failures ?? []).filter((failure) => failure.invariantFamily === family);
        return failures.length > 0 && failures.every((failure) => routedIds.has(failure.findingId)) ? "ROUTED_RED" : "RED";
    };
    const architectureMechanismRed = (commands.failures ?? []).some((failure) => !failure.routable && failure.invariantFamily === "architecture.clean-break");
    const buildFailures = (commands.failures ?? []).filter((failure) => failure.invariantFamily === "integrity.build-package");
    const lineage = validatorResult(() => ({
        ok: GIT_SHA.test(context.integrationParent) && context.integrationParent === (context.integrationParent ?? "") && context.sourceBase === plan.sourceBase && SHA256.test(context.payloadDigest?.sha256 ?? "") && validateSubjectDeltaClosure(context.wave, context.deltaPaths).ok,
        errors: ["authoritative integration-parent/payload/subject lineage did not reproduce"],
    }));
    const observations = [
        typedObservation({ kind: "command-abrogation-and-installer", status: statusFor("architecture.clean-break", structure.ok && !architectureMechanismRed), invariantFamilies: ["architecture.clean-break"], sourcePayloadDigest, payload: { structure: structure.snapshot, installer: commands.evidence?.installerBehavior ?? null, exactExecutionInputImmutability: commands.evidence?.exactExecutionInputImmutability ?? null } }),
        typedObservation({ kind: "clean-build-packed-artifact", status: statusFor("integrity.build-package", buildFailures.length === 0 && commands.evidence?.packedArtifactClosure !== null), invariantFamilies: ["integrity.build-package"], sourcePayloadDigest, payload: commands.evidence?.packedArtifactClosure ?? null }),
        typedObservation({ kind: "anchored-dag-reproduction", status: dag.ok ? "PASS" : "RED", invariantFamilies: ["integrity.dag"], sourcePayloadDigest, payload: { nodeCount: context.dag?.nodes?.length ?? null, edgeCount: context.dag?.edges?.length ?? null, stratumCount: context.dag?.strata?.length ?? null } }),
        typedObservation({ kind: "git-first-parent-lineage", status: lineage.ok ? "PASS" : "RED", invariantFamilies: ["integrity.lineage"], sourcePayloadDigest, payload: { integrationParent: context.integrationParent, formationAnchorParent: context.formationAnchorParent, payloadDigest: context.payloadDigest } }),
    ];
    const coverage = validateObservationCoverage(observations, selectedIds);
    const productionCases = makeProductionMutationCases({ plan, taxonomy, context, view, executionRoot, selectedFamilies: selectedIds, observations });
    const mutation = runMutationContract({
        waveId,
        productionCases,
        requiredProductionRequirements: ["exact-input-immutability", ...selectedIds.map((family) => `typed-attribution:${family}`)],
    });
    const mutationErrors = mutation.ok ? [] : [
        ...mutation.missingProductionRequirements.map((requirement) => `mutation contract omits required production tooth ${requirement}`),
        ...mutation.cases.filter((item) => item.mutatedStatus !== "RED" || item.restoredStatus !== "PASS" || item.mutatedExitCode === 0 || item.restoredExitCode !== 0).map((item) => `${item.mutation}: production mutation did not prove deliberate RED then restored PASS`),
    ];
    const payload = {
        schemaVersion: "1.0.0",
        waveId,
        authority: plan.authority,
        taxonomySourceBase: taxonomy.sourceBase,
        invariantFamilies: selectedIds,
        evidencePlan,
        mutationContract: mutation,
        commandAbrogation: structure.snapshot,
        canonicalTaskEvidence: commands.evidence,
        exactExecutionView: { sourcePayloadDigest, ...materialization },
        typedObservations: observations,
        observationCoverage: coverage,
        currentSourceFindings: commands.failures ?? [],
        routedCurrentReds,
        browserScenarioPolicy: {
            discoveredAndSourceBound: evidencePlan.summary.browserScenarioFiles > 0,
            executedForCurrentProductCredit: false,
            currentProductPiCredit: false,
        },
    };
    const errors = [...structure.errors, ...dag.errors, ...routing.errors, ...coverage.errors, ...mutationErrors];
    return {
        status: errors.length === 0 ? "PASS" : "RED",
        errors,
        evidenceDigest: sha256(canonicalJson(payload)),
        evidence: payload,
    };
}

export function validateCommitTrailers(message, receipt, receiptBytes) {
    const errors = [];
    const parsed = parseCommitTrailers(message);
    if (parsed.duplicates.length > 0) errors.push(`duplicate BI trailers: ${[...new Set(parsed.duplicates)].join(", ")}`);
    const expected = new Map([
        ["BI-Wave", receipt.waveId],
        ["BI-Status", receipt.status],
        ["BI-Receipt-SHA256", receiptDigest(receiptBytes)],
        ["BI-Formation-SHA256", receipt.formationDigest],
    ]);
    for (const [name, value] of expected) {
        if (parsed.trailers.get(name) !== value) errors.push(`${name}: commit trailer does not bind the staged/committed receipt`);
    }
    for (const name of ["BI-Attestation-SHA256", "BI-FINAL-SHA256"]) {
        if (parsed.trailers.has(name)) errors.push(`${name}: projection trailer is forbidden before P002`);
    }
    return errors;
}

async function resolveBootstrapInvocation(options) {
    if (options.bootstrapPlan) {
        const planPath = resolve(options.root, options.bootstrapPlan);
        const plan = await readJson(planPath, "bootstrap plan");
        let receipt = null;
        if (options.receipt) receipt = await readJson(resolve(options.root, options.receipt), "bootstrap receipt");
        return {
            mode: "bootstrap",
            waveId: options.wave,
            plan,
            receipt,
            repositoryView: "index",
            ref: "HEAD",
            trailerMessage: null,
        };
    }

    if (!options.wave && !options.waveFromMessage && !options.waveFromCommit && options.profile === "release" && options.requireTerminal) {
        return resolveBootstrapInvocation({ ...options, waveFromCommit: "HEAD" });
    }

    if (options.waveFromMessage) {
        let message;
        try {
            message = await readFile(resolve(options.root, options.waveFromMessage), "utf8");
        } catch (error) {
            throw new VerifierFailure(`commit message is unavailable: ${error.message}`, EXIT.MISSING_INPUT);
        }
        const parsed = parseCommitTrailers(message);
        if (parsed.duplicates.includes("BI-Wave") || !parsed.trailers.has("BI-Wave")) throw new VerifierFailure("commit message must contain exactly one BI-Wave trailer", EXIT.INVALID_CONTRACT);
        const waveId = parsed.trailers.get("BI-Wave");
        if (waveId !== "BI.W-P000") return { mode: "state", waveId, trailerMessage: message };
        const plan = await readJson(resolve(options.root, DEFAULT_BOOTSTRAP_PLAN), "bootstrap plan");
        const stagedReceipt = git(options.root, ["show", `:${DEFAULT_BOOTSTRAP_RECEIPT}`], { encoding: null, allowFailure: true });
        if (stagedReceipt.status !== 0) throw new VerifierFailure("P000 commit fallback requires staged docs/tranches/BI/BOOTSTRAP.json", EXIT.STATE_UNAVAILABLE);
        let receipt;
        try {
            receipt = { bytes: stagedReceipt.stdout, value: JSON.parse(stagedReceipt.stdout.toString("utf8")) };
        } catch (error) {
            throw new VerifierFailure(`staged bootstrap receipt is invalid JSON: ${error.message}`, EXIT.INVALID_CONTRACT);
        }
        return { mode: "bootstrap", waveId, plan, receipt, repositoryView: "index", ref: "HEAD", trailerMessage: message };
    }

    if (options.waveFromCommit) {
        const ref = options.waveFromCommit;
        const message = git(options.root, ["show", "-s", "--format=%B", ref]).stdout;
        const parsed = parseCommitTrailers(message);
        if (parsed.duplicates.includes("BI-Wave") || !parsed.trailers.has("BI-Wave")) throw new VerifierFailure(`${ref} must contain exactly one BI-Wave trailer`, EXIT.INVALID_CONTRACT);
        const waveId = parsed.trailers.get("BI-Wave");
        if (waveId !== "BI.W-P000") return { mode: "state", waveId, trailerMessage: message, ref };
        let planBytes;
        let receiptBytes;
        try {
            planBytes = git(options.root, ["show", `${ref}:${DEFAULT_BOOTSTRAP_PLAN}`], { encoding: null }).stdout;
            receiptBytes = git(options.root, ["show", `${ref}:${DEFAULT_BOOTSTRAP_RECEIPT}`], { encoding: null }).stdout;
        } catch (error) {
            throw new VerifierFailure(error.message, EXIT.STATE_UNAVAILABLE);
        }
        let plan;
        let receipt;
        try {
            plan = { bytes: planBytes, value: JSON.parse(planBytes.toString("utf8")) };
            receipt = { bytes: receiptBytes, value: JSON.parse(receiptBytes.toString("utf8")) };
        } catch (error) {
            throw new VerifierFailure(`committed P000 authority is invalid JSON: ${error.message}`, EXIT.INVALID_CONTRACT);
        }
        return { mode: "bootstrap", waveId, plan, receipt, repositoryView: "commit", ref, trailerMessage: message };
    }

    if (options.wave === "BI.W-P000") {
        const message = git(options.root, ["show", "-s", "--format=%B", "HEAD"]).stdout;
        const parsed = parseCommitTrailers(message);
        if (parsed.trailers.get("BI-Wave") !== "BI.W-P000") throw new VerifierFailure("P000 state-auto is available only at the committed P000 HEAD", EXIT.STATE_UNAVAILABLE);
        return resolveBootstrapInvocation({ ...options, waveFromCommit: "HEAD", wave: undefined });
    }
    return { mode: "state", waveId: options.wave };
}

async function runRecoveredState(options, invocation) {
    const cursorPath = resolve(options.root, "scripts/tranche/cursor.mjs");
    let cursor;
    try {
        cursor = await import(`${pathToFileURL(cursorPath).href}?v=${Date.now()}`);
    } catch (error) {
        if (error.code === "ERR_MODULE_NOT_FOUND") throw new VerifierFailure(`non-P000 verification is RED until P001 installs cursor recovery (${invocation.waveId})`, EXIT.STATE_UNAVAILABLE);
        throw error;
    }
    if (typeof cursor.verifyRecoveredState !== "function") {
        throw new VerifierFailure("P001 cursor module does not export verifyRecoveredState; refusing guessed state", EXIT.STATE_UNAVAILABLE);
    }
    const result = await cursor.verifyRecoveredState({
        root: options.root,
        waveId: invocation.waveId,
        profile: options.profile,
        requireTerminal: options.requireTerminal,
        ref: invocation.ref ?? "HEAD",
        trailerMessage: invocation.trailerMessage ?? null,
    });
    if (!result || !["PASS", "RED"].includes(result.status) || !Array.isArray(result.errors)) {
        throw new VerifierFailure("P001 cursor verifier returned a malformed result", EXIT.INVALID_CONTRACT);
    }
    return { ...result, exitCode: result.status === "PASS" ? EXIT.PASS : EXIT.RED };
}

async function runBootstrap(options, invocation) {
    const planValidation = validateBootstrapPlan(invocation.plan.value);
    if (!planValidation.ok) throw new VerifierFailure(planValidation.errors.join("\n"), EXIT.INVALID_CONTRACT);
    if (invocation.waveId !== "BI.W-P000") throw new VerifierFailure("bootstrap selection escaped BI.W-P000", EXIT.INVALID_CONTRACT);
    const integrationParent = invocation.receipt?.value?.integrationParent ?? "HEAD";
    let context;
    try {
        context = await authoritativeBootstrapContext({
            root: options.root,
            view: invocation.repositoryView,
            ref: invocation.ref,
            integrationParent,
        });
    } catch (error) {
        if (error instanceof VerifierFailure) throw error;
        if (error.code === "BI_SUBJECT_RED") throw new VerifierFailure(error.message, EXIT.RED);
        throw new VerifierFailure(error.message, EXIT.INVALID_CONTRACT);
    }
    if (!Buffer.from(invocation.plan.bytes).equals(Buffer.from(context.planBytes))) {
        throw new VerifierFailure("bootstrap plan bytes differ from the immutable integration-parent anchor", EXIT.INVALID_CONTRACT);
    }
    const view = createRepositoryView(options.root, invocation.repositoryView, invocation.ref);
    let routedCurrentReds = invocation.receipt?.value?.routedCurrentReds ?? [];
    if (options.routedReds) {
        const routed = await readJson(resolve(options.root, options.routedReds), "routed current-source findings");
        if (!Array.isArray(routed.value)) throw new VerifierFailure("routed current-source findings must be a JSON array", EXIT.INVALID_CONTRACT);
        routedCurrentReds = routed.value;
    }
    const requiredSelfTests = context.wave.subjects
        .filter((subject) => subject.action === "create" && /^(?:tests\/verification\/|tests\/tranche\/).*\.(?:test|spec)\.[cm]?[jt]sx?$/.test(subject.path))
        .map((subject) => subject.path)
        .sort(comparePaths);
    const materialized = materializeExactRepositoryView({ root: options.root, view: invocation.repositoryView, ref: invocation.ref });
    let evidence;
    try {
        if (!GIT_SHA.test(materialized.treeOid)) throw new VerifierFailure("materialized exact repository view lacks a Git tree object id", EXIT.INVALID_CONTRACT);
        evidence = await collectBootstrapEvidence({
            root: options.root,
            executionRoot: materialized.directory,
            sourcePayloadDigest: context.payloadDigest.sha256,
            materialization: materialized.materialization,
            context,
            plan: context.plan,
            taxonomy: context.taxonomy,
            view,
            waveId: invocation.waveId,
            routedCurrentReds,
            requiredSelfTests,
            allowPlannedBootstrapEvidence: options.evidenceDigestOnly,
        });
    } finally {
        materialized.cleanup();
    }
    if (options.evidenceDigestOnly) {
        return {
            schemaVersion: "1.0.0",
            waveId: invocation.waveId,
            profile: "bootstrap",
            status: evidence.status,
            evidenceDigest: evidence.evidenceDigest,
            evidence: evidence.evidence,
            errors: evidence.errors,
            exitCode: evidence.status === "PASS" ? EXIT.PASS : EXIT.RED,
        };
    }

    const receipt = invocation.receipt.value;
    const receiptValidation = validateBootstrapReceipt(receipt, { ...context, evidenceDigest: evidence.evidenceDigest, routedCurrentReds: evidence.evidence.routedCurrentReds });
    if (!receiptValidation.ok) throw new VerifierFailure(receiptValidation.errors.join("\n"), EXIT.INVALID_CONTRACT);
    const errors = [...evidence.errors];
    if (receipt.formationDigest !== context.formationDigest || receipt.sourceBase !== invocation.plan.value.sourceBase) errors.push("bootstrap receipt does not bind the immutable formation/source authority");
    if (receipt.evidenceDigest !== evidence.evidenceDigest) errors.push("bootstrap receipt evidenceDigest does not bind current semantic discovery and mutation evidence");
    if (invocation.trailerMessage) errors.push(...validateCommitTrailers(invocation.trailerMessage, receipt, invocation.receipt.bytes));
    if (invocation.repositoryView === "commit") errors.push(...validateCommittedBootstrapRecovery({ root: options.root, ref: invocation.ref, receipt, receiptBytes: invocation.receipt.bytes }).errors);
    if (options.requireTerminal || options.profile === "release") errors.push("P000 cannot authorize a terminal release before P002 installs RELEASE-ATTESTATION and FINAL");
    const status = errors.length === 0 ? "PASS" : "RED";
    return {
        schemaVersion: "1.0.0",
        waveId: invocation.waveId,
        profile: options.profile,
        authority: invocation.plan.value.authority,
        status,
        currentProductBrowserCredit: false,
        evidenceDigest: evidence.evidenceDigest,
        receiptSha256: receiptDigest(invocation.receipt.bytes),
        routedCurrentReds: receipt.routedCurrentReds ?? [],
        errors,
        exitCode: status === "PASS" ? EXIT.PASS : EXIT.RED,
    };
}

export async function runVerification(optionsOrArgv) {
    const options = Array.isArray(optionsOrArgv) ? parseVerifierArgs(optionsOrArgv) : optionsOrArgv;
    const invocation = await resolveBootstrapInvocation(options);
    if (invocation.mode === "state") return runRecoveredState(options, invocation);
    return runBootstrap(options, invocation);
}

function printResult(result, json) {
    if (json || result.evidenceDigest) {
        process.stdout.write(`${JSON.stringify(result)}\n`);
        return;
    }
    process.stdout.write(`[verify] ${result.status} ${result.waveId} (${result.profile})\n`);
    for (const error of result.errors ?? []) process.stderr.write(`[verify] RED ${error}\n`);
}

async function main() {
    let options;
    const wantsJson = process.argv.slice(2).includes("--json");
    try {
        options = parseVerifierArgs(process.argv.slice(2));
        const result = await runVerification(options);
        printResult(result, options.json);
        process.exitCode = result.exitCode;
    } catch (error) {
        const exitCode = error instanceof VerifierFailure ? error.exitCode : error.code === "ENOENT" ? EXIT.MISSING_INPUT : EXIT.INTERNAL;
        const result = { status: "RED", errors: [error.message], exitCode };
        if (options?.json || wantsJson) process.stdout.write(`${JSON.stringify(result)}\n`);
        else process.stderr.write(`[verify] RED ${error.message}\n`);
        process.exitCode = exitCode;
    }
}

const invoked = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invoked) main();

export { VerifierFailure, validateEvidencePlan, validateInvariantTaxonomy };
