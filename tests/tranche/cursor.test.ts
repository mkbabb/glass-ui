// @glass-invariant integrity.cursor integrity.dag integrity.lineage

import { createHash, randomUUID } from "node:crypto";
import { spawn, spawnSync } from "node:child_process";
import {
    chmodSync,
    copyFileSync,
    existsSync,
    lstatSync,
    mkdirSync,
    mkdtempSync,
    readFileSync,
    readlinkSync,
    rmSync,
    statSync,
    symlinkSync,
    writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import {
    CAUGHT_ERROR_DIAGNOSTIC_LIMITS,
    cleanupSelectedViewRuntime,
    caughtErrorDiagnostic,
    CursorError,
    DISPATCH_ROUTING_POLICY_SHA256,
    dispatchRoutingPolicy,
    gitPrivatePaths,
    executeReleaseProjectionAdapter,
    executeWaveSemanticTests,
    executionDiagnosticPathReplacements,
    launchReadinessErrors,
    ordinaryWaveTestPaths,
    parseCommitTrailers,
    prepareDispatchLane,
    recoverCursor,
    renderDispatchReceipt,
    renderP002WithdrawalProjection,
    runCursor,
    semanticRequirementErrors,
    selectedReleaseStage0,
    serializeCursor,
    settleDispatchLane,
    startWave,
    integrateWave,
    terminalizeWave,
    validateCursor,
    validateFormationGraph,
    validateWaveSemanticReport,
    verifyRecoveredState,
} from "../../scripts/tranche/cursor.mjs";
import { renderWaveReceipt } from "../../scripts/tranche/transaction-envelope.mjs";

const SOURCE_TREE = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const AUTHORITY_REPOSITORY = process.env.BI_TEST_AUTHORITY_REPO ?? SOURCE_TREE;
const P000 = "1c2cda3a6eb600923fe79245cbc7157090c9cc18";
const FORMATION_ANCHOR = "f20a2aa96a6e165c331411ca771562f03807de27";
const SOURCE_BASE = "26c5ae686fd0f1181083aebda1215b00524555f1";
const P001_RECEIPT = "docs/tranches/BI/evidence/BI.W-P001/receipt.json";
const P001_SUBJECTS = [
    "docs/tranches/BI/EXECUTION-PROGRESS.md",
    "package.json",
    "scripts/tranche/cursor-schema.json",
    "scripts/tranche/cursor.mjs",
    "scripts/tranche/transaction-envelope.mjs",
    "scripts/tranche/wave-receipt-schema.json",
    "tests/tranche/cursor.test.ts",
    "tests/tranche/transaction-envelope.test.ts",
] as const;
const CONTINUOUS_PROJECTIONS = [
    "docs/tranches/BI/RELEASE-ATTESTATION.json",
    "docs/tranches/BI/FINAL.md",
] as const;
const RELEASE_PROJECTION_MODULE = "scripts/tranche/release-projection.mjs";

const temporaryRoots: string[] = [];
let terminalTemplate = "";

vi.setConfig({ testTimeout: 60_000, hookTimeout: 60_000 });

type GitOptions = {
    allowFailure?: boolean;
    input?: string | Buffer;
    encoding?: BufferEncoding | null;
    env?: NodeJS.ProcessEnv;
};

function git(root: string, args: string[], options: GitOptions = {}) {
    const result = spawnSync("git", ["-C", root, ...args], {
        encoding: (options.encoding === undefined ? "utf8" : options.encoding) as any,
        input: options.input,
        env: options.env ?? process.env,
        maxBuffer: 128 * 1024 * 1024,
        stdio: [options.input === undefined ? "ignore" : "pipe", "pipe", "pipe"],
    });
    if (result.error || (result.status !== 0 && !options.allowFailure)) {
        throw new Error(`git ${args.join(" ")} failed (${result.status}): ${result.error?.message ?? String(result.stderr).trim()}`);
    }
    return result;
}

function output(root: string, args: string[]) {
    return String(git(root, args).stdout).trim();
}

function sha256(bytes: string | Buffer) {
    return createHash("sha256").update(bytes).digest("hex");
}

function canonicalFixtureJson(value: any): string {
    if (Array.isArray(value)) return `[${value.map(canonicalFixtureJson).join(",")}]`;
    if (value !== null && typeof value === "object") {
        return `{${Object.keys(value).sort((left, right) => Buffer.compare(Buffer.from(left), Buffer.from(right)))
            .map((key) => `${JSON.stringify(key)}:${canonicalFixtureJson(value[key])}`).join(",")}}`;
    }
    return JSON.stringify(value);
}

function prettyCanonicalFixture(value: any) {
    const sorted = JSON.parse(canonicalFixtureJson(value));
    return Buffer.from(`${JSON.stringify(sorted, null, 2)}\n`);
}

function registerTemp(prefix: string) {
    const root = mkdtempSync(join(tmpdir(), prefix));
    temporaryRoots.push(root);
    return root;
}

function configureSingleLineage(root: string, commit: string) {
    const refs = output(root, ["for-each-ref", "--format=%(refname)"]).split(/\r?\n/).filter(Boolean);
    refs.forEach((ref) => git(root, ["update-ref", "-d", ref]));
    git(root, ["update-ref", "refs/heads/fixture", commit]);
    git(root, ["symbolic-ref", "HEAD", "refs/heads/fixture"]);
    git(root, ["read-tree", commit]);
    git(root, ["config", "user.name", "Glass BI fixture"]);
    git(root, ["config", "user.email", "glass-bi@example.invalid"]);
    git(root, ["config", "core.hooksPath", "/dev/null"]);
}

function createP000Fixture() {
    const root = registerTemp("glass-bi-cursor-");
    git(SOURCE_TREE, ["clone", "--quiet", "--shared", "--no-checkout", AUTHORITY_REPOSITORY, root]);
    configureSingleLineage(root, P000);
    return root;
}

function cloneTerminalFixture() {
    const root = registerTemp("glass-bi-terminal-");
    git(SOURCE_TREE, ["clone", "--quiet", "--shared", "--no-checkout", terminalTemplate, root]);
    configureSingleLineage(root, output(terminalTemplate, ["rev-parse", "HEAD"]));
    return root;
}

function linkFixtureNodeModules(root: string) {
    const target = join(root, "node_modules");
    if (!existsSync(target)) symlinkSync(join(SOURCE_TREE, "node_modules"), target, "dir");
}

function readFormation() {
    const formationRoot = join(SOURCE_TREE, "docs/tranches/BI/FORMATION");
    return {
        manifest: JSON.parse(readFileSync(join(formationRoot, "FORMATION-MANIFEST.json"), "utf8")),
        waves: JSON.parse(readFileSync(join(formationRoot, "waves.json"), "utf8")),
        dag: JSON.parse(readFileSync(join(formationRoot, "dag.json"), "utf8")),
        seed: JSON.parse(readFileSync(join(formationRoot, "execution-cursor.seed.json"), "utf8")),
    };
}

function evidenceKind(path: string) {
    if (path === "package.json") return "manifest";
    if (path.endsWith("-schema.json")) return "schema";
    if (path.startsWith("tests/")) return "test";
    if (path.endsWith(".md")) return "documentation";
    return "verification";
}

function copyP001Subjects(root: string) {
    for (const path of P001_SUBJECTS) {
        const source = join(SOURCE_TREE, path);
        const target = join(root, path);
        mkdirSync(dirname(target), { recursive: true });
        copyFileSync(source, target);
        chmodSync(target, statSync(source).mode & 0o777);
    }
    git(root, ["add", "--", ...P001_SUBJECTS]);
}

function commitTree(root: string, tree: string, parent: string, message: string) {
    return String(git(root, ["commit-tree", tree, "-p", parent], { input: message }).stdout).trim();
}

function setHead(root: string, commit: string) {
    git(root, ["update-ref", "HEAD", commit]);
    git(root, ["read-tree", commit]);
}

async function stageP001Candidate(root: string) {
    const recovered = await recoverCursor({ root, at: "HEAD", readOnly: true });
    const wave = recovered.formation.waves.waves.find((row: any) => row.id === "BI.W-P001");
    if (!wave) throw new Error("fixture formation omits P001");
    copyP001Subjects(root);
    const evidenceEntries = P001_SUBJECTS.map((path) => {
        const bytes = readFileSync(join(root, path));
        return { path, kind: evidenceKind(path), status: "PASS", sha256: sha256(bytes), bytes: bytes.length };
    });
    const rendered = renderWaveReceipt({
        root,
        wave,
        formationDigest: recovered.cursor.formationDigest,
        sourceBase: SOURCE_BASE,
        status: "DONE",
        integrationParent: P000,
        evidenceEntries,
        terminalRationale: "The reconstructable cursor transaction is complete and all exact-view evidence is current.",
    });
    const receiptPath = join(root, P001_RECEIPT);
    mkdirSync(dirname(receiptPath), { recursive: true });
    writeFileSync(receiptPath, rendered.bytes);
    git(root, ["add", "--", P001_RECEIPT]);
    const message = [
        "feat(BI.W-P001): install the Git-reconstructable execution cursor",
        "",
        "Exercise the exact parent-relative transaction and immutable receipt authority.",
        "",
        "BI-Wave: BI.W-P001",
        "BI-Status: DONE",
        `BI-Receipt-SHA256: ${rendered.receiptSha256}`,
        `BI-Formation-SHA256: ${recovered.cursor.formationDigest}`,
        "",
    ].join("\n");
    return { message, receipt: rendered.receipt, receiptBytes: rendered.bytes };
}

async function createP001Commit(root: string) {
    const staged = await stageP001Candidate(root);
    const commit = commitTree(root, output(root, ["write-tree"]), P000, staged.message);
    setHead(root, commit);
    return { commit, ...staged };
}

async function createP001DeadCommit(root: string) {
    const recovered = await recoverCursor({ root, at: "HEAD", readOnly: true });
    const wave = recovered.formation.waves.waves.find((row: any) => row.id === "BI.W-P001");
    const authorityPath = "docs/tranches/BI/FORMATION/waves.json";
    const authorityBytes = Buffer.from(git(root, ["show", `:${authorityPath}`], { encoding: null }).stdout);
    const rendered = renderWaveReceipt({
        root,
        wave,
        formationDigest: recovered.cursor.formationDigest,
        sourceBase: SOURCE_BASE,
        status: "DEAD",
        integrationParent: P000,
        evidenceEntries: [{
            path: authorityPath,
            kind: "owner-withdrawal-authority",
            status: "RED",
            sha256: sha256(authorityBytes),
            bytes: authorityBytes.length,
        }],
        terminalRationale: "The product owner permanently declines the complete P001 subject.",
    });
    const receiptPath = join(root, P001_RECEIPT);
    mkdirSync(dirname(receiptPath), { recursive: true });
    writeFileSync(receiptPath, rendered.bytes);
    git(root, ["add", "--", P001_RECEIPT]);
    const message = [
        "chore(BI.W-P001): record complete subject decline",
        "",
        "BI-Wave: BI.W-P001",
        "BI-Status: DEAD",
        `BI-Receipt-SHA256: ${rendered.receiptSha256}`,
        `BI-Formation-SHA256: ${recovered.cursor.formationDigest}`,
        "",
    ].join("\n");
    const commit = commitTree(root, output(root, ["write-tree"]), P000, message);
    setHead(root, commit);
    return { commit, message };
}

function replaceIndexBlob(root: string, path: string, bytes: string | Buffer) {
    const oid = String(git(root, ["hash-object", "-w", "--stdin"], { input: bytes }).stdout).trim();
    git(root, ["update-index", "--add", "--cacheinfo", "100644", oid, path]);
}

function replaceIndexMode(root: string, path: string, mode: "100644" | "100755" | "120000") {
    const row = output(root, ["ls-files", "--stage", "--", path]);
    const match = /^\d{6} ([0-9a-f]{40}) [0-3]\t/.exec(row);
    if (!match) throw new Error(`${path}: staged fixture entry is absent`);
    git(root, ["update-index", "--add", "--cacheinfo", mode, match[1], path]);
}

function selectedIndexBytes(root: string, path: string) {
    const result = git(root, ["show", `:${path}`], { allowFailure: true, encoding: null });
    return result.status === 0 ? Buffer.from(result.stdout) : null;
}

function createdFixtureBytes(path: string, waveId: string, testSources: Record<string, string>) {
    if (testSources[path] !== undefined) return Buffer.from(testSources[path]);
    if (path === RELEASE_PROJECTION_MODULE) return Buffer.from(releaseProjectionFixtureSource());
    if (path.endsWith(".json")) return Buffer.from(`${JSON.stringify({ fixture: waveId, path }, null, 2)}\n`);
    if (path.endsWith(".mjs")) return Buffer.from(`export const fixture = ${JSON.stringify(`${waveId}:${path}`)};\n`);
    if (path.endsWith(".md")) return Buffer.from(`# ${waveId} fixture\n\n${path}\n`);
    return Buffer.from(`${waveId}:${path}\n`);
}

function modifiedFixtureBytes(path: string, waveId: string, previous: Buffer) {
    if (path.endsWith(".json")) {
        const parsed = JSON.parse(previous.toString("utf8"));
        parsed.biWaveSemanticFixture = waveId;
        return Buffer.from(`${JSON.stringify(parsed, null, 2)}\n`);
    }
    return Buffer.concat([previous, Buffer.from(`\n// ${waveId} semantic fixture\n`)]);
}

async function stageSyntheticWaveCandidate(root: string, waveId: string, testSources: Record<string, string>) {
    const recovered = await recoverCursor({ root, at: "HEAD", readOnly: true });
    const wave = recovered.formation.waves.waves.find((row: any) => row.id === waveId);
    if (!wave) throw new Error(`fixture formation omits ${waveId}`);
    const integrationParent = output(root, ["rev-parse", "HEAD"]);
    for (const subject of wave.subjects) {
        const previous = selectedIndexBytes(root, subject.path);
        if (subject.action === "create") {
            if (previous) throw new Error(`${subject.path}: synthetic CREATE is not absent`);
            replaceIndexBlob(root, subject.path, createdFixtureBytes(subject.path, waveId, testSources));
        } else if (subject.action === "modify") {
            if (!previous) throw new Error(`${subject.path}: synthetic MODIFY has no parent object`);
            replaceIndexBlob(root, subject.path, modifiedFixtureBytes(subject.path, waveId, previous));
        } else if (subject.action === "repair" || subject.action === "verify") {
            if (!previous) throw new Error(`${subject.path}: synthetic ${subject.action.toUpperCase()} has no parent object`);
        } else {
            throw new Error(`${waveId}: unsupported synthetic fixture action ${subject.action}`);
        }
    }
    replaceIndexBlob(root, CONTINUOUS_PROJECTIONS[0], `${JSON.stringify({ fixture: waveId }, null, 2)}\n`);
    replaceIndexBlob(root, CONTINUOUS_PROJECTIONS[1], `# ${waveId} synthetic projection\n`);
    const testPaths = ordinaryWaveTestPaths(wave);
    const evidenceEntries = testPaths.map((path: string) => {
        const bytes = selectedIndexBytes(root, path);
        if (!bytes) throw new Error(`${path}: synthetic evidence subject is absent`);
        return { path, kind: "test", status: "PASS", sha256: sha256(bytes), bytes: bytes.length };
    });
    const rendered = renderWaveReceipt({
        root,
        wave,
        formationDigest: recovered.cursor.formationDigest,
        sourceBase: SOURCE_BASE,
        status: "DONE",
        integrationParent,
        evidenceEntries,
        terminalRationale: `${waveId} synthetic selected-view semantic candidate is complete.`,
    });
    replaceIndexBlob(root, wave.receiptPath, rendered.bytes);
    const attestation = selectedIndexBytes(root, CONTINUOUS_PROJECTIONS[0])!;
    const final = selectedIndexBytes(root, CONTINUOUS_PROJECTIONS[1])!;
    const message = [
        `test(${waveId}): exercise selected-view semantic execution`,
        "",
        `BI-Wave: ${waveId}`,
        "BI-Status: DONE",
        `BI-Receipt-SHA256: ${rendered.receiptSha256}`,
        `BI-Formation-SHA256: ${recovered.cursor.formationDigest}`,
        `BI-Attestation-SHA256: ${sha256(attestation)}`,
        `BI-FINAL-SHA256: ${sha256(final)}`,
        "",
    ].join("\n");
    return { wave, message, testPaths };
}

async function stageSyntheticP002DeadCandidate(root: string) {
    const recovered = await recoverCursor({ root, at: "HEAD", readOnly: true });
    const wave = recovered.formation.waves.waves.find((row: any) => row.id === "BI.W-P002");
    if (!wave) throw new Error("fixture formation omits P002");
    const integrationParent = output(root, ["rev-parse", "HEAD"]);
    const authorityPath = "docs/tranches/BI/FORMATION/waves.json";
    const authorityBytes = selectedIndexBytes(root, authorityPath)!;
    const renderedReceipt = renderWaveReceipt({
        root,
        wave,
        formationDigest: recovered.cursor.formationDigest,
        sourceBase: SOURCE_BASE,
        status: "DEAD",
        integrationParent,
        evidenceEntries: [{
            path: authorityPath,
            kind: "owner-withdrawal-authority",
            status: "RED",
            sha256: sha256(authorityBytes),
            bytes: authorityBytes.length,
        }],
        terminalRationale: "The product owner permanently withdraws the perfected-BI formation.",
    });
    const receiptBytes = Buffer.from(renderedReceipt.bytes);
    const receiptSha256 = sha256(receiptBytes);
    if (receiptSha256 !== renderedReceipt.receiptSha256) throw new Error("P002 withdrawal receipt Buffer changed its serialized digest");
    replaceIndexBlob(root, wave.receiptPath, receiptBytes);
    const stage0Index = selectedReleaseStage0(root, "index", integrationParent);
    const withdrawal = renderP002WithdrawalProjection({
        receipt: renderedReceipt.receipt,
        receiptBytes,
        stage0Index,
    });
    replaceIndexBlob(root, CONTINUOUS_PROJECTIONS[0], withdrawal.attestationBytes);
    replaceIndexBlob(root, CONTINUOUS_PROJECTIONS[1], withdrawal.finalBytes);
    const message = [
        "chore(BI.W-P002): permanently withdraw the perfected formation",
        "",
        "BI-Wave: BI.W-P002",
        "BI-Status: DEAD",
        `BI-Receipt-SHA256: ${receiptSha256}`,
        `BI-Formation-SHA256: ${recovered.cursor.formationDigest}`,
        `BI-Attestation-SHA256: ${withdrawal.attestationSha256}`,
        `BI-FINAL-SHA256: ${withdrawal.finalSha256}`,
        "",
    ].join("\n");
    return { wave, message, receipt: renderedReceipt.receipt, receiptBytes, withdrawal };
}

async function stageSyntheticDeadCandidate(root: string, waveId: string) {
    if (waveId === "BI.W-P002") throw new Error("P002 uses its fixed formation-withdrawal projection");
    const recovered = await recoverCursor({ root, at: "HEAD", readOnly: true });
    const wave = recovered.formation.waves.waves.find((row: any) => row.id === waveId);
    if (!wave || wave.projectionMode !== "REFRESH") throw new Error(`${waveId}: fixture requires a post-P002 projection wave`);
    const integrationParent = output(root, ["rev-parse", "HEAD"]);
    const authorityPath = "docs/tranches/BI/FORMATION/waves.json";
    const authorityBytes = selectedIndexBytes(root, authorityPath)!;
    const rendered = renderWaveReceipt({
        root,
        wave,
        formationDigest: recovered.cursor.formationDigest,
        sourceBase: SOURCE_BASE,
        status: "DEAD",
        integrationParent,
        evidenceEntries: [{
            path: authorityPath,
            kind: "owner-withdrawal-authority",
            status: "RED",
            sha256: sha256(authorityBytes),
            bytes: authorityBytes.length,
        }],
        terminalRationale: `${waveId} product owner permanently withdraws this complete bounded subject.`,
    });
    replaceIndexBlob(root, wave.receiptPath, rendered.bytes);
    replaceIndexBlob(root, CONTINUOUS_PROJECTIONS[0], `${JSON.stringify({ fixture: waveId }, null, 2)}\n`);
    replaceIndexBlob(root, CONTINUOUS_PROJECTIONS[1], `# ${waveId} synthetic projection\n`);
    const attestation = selectedIndexBytes(root, CONTINUOUS_PROJECTIONS[0])!;
    const final = selectedIndexBytes(root, CONTINUOUS_PROJECTIONS[1])!;
    const message = [
        `chore(${waveId}): permanently withdraw bounded subject`,
        "",
        `BI-Wave: ${waveId}`,
        "BI-Status: DEAD",
        `BI-Receipt-SHA256: ${rendered.receiptSha256}`,
        `BI-Formation-SHA256: ${recovered.cursor.formationDigest}`,
        `BI-Attestation-SHA256: ${sha256(attestation)}`,
        `BI-FINAL-SHA256: ${sha256(final)}`,
        "",
    ].join("\n");
    return { wave, message };
}

function refreshProjectionTrailerDigests(root: string, message: string) {
    const attestation = selectedIndexBytes(root, CONTINUOUS_PROJECTIONS[0]);
    const final = selectedIndexBytes(root, CONTINUOUS_PROJECTIONS[1]);
    if (!attestation || !final) throw new Error("synthetic projections are absent");
    return message
        .replace(/^BI-Attestation-SHA256: .*$/m, `BI-Attestation-SHA256: ${sha256(attestation)}`)
        .replace(/^BI-FINAL-SHA256: .*$/m, `BI-FINAL-SHA256: ${sha256(final)}`);
}

function canonicalPassReport(testPaths: string[]) {
    return {
        success: true,
        numTotalTests: testPaths.length,
        numPassedTests: testPaths.length,
        numFailedTests: 0,
        numPendingTests: 0,
        numTodoTests: 0,
        testResults: testPaths.map((path, index) => ({
            name: `/isolated/${path}`,
            status: "passed",
            assertionResults: [{ fullName: `fixture assertion ${index}`, status: "passed" }],
        })),
    };
}

function semanticFixtureSource(label: string, disposition: "pass" | "fail" | "skip" = "pass") {
    const testCall = disposition === "skip" ? "it.skip" : "it";
    const expectation = disposition === "fail" ? "expect(true).toBe(false);" : "expect(true).toBe(true);";
    return [
        'import { expect, it } from "vitest";',
        "",
        `${testCall}(${JSON.stringify(label)}, () => {`,
        `    ${expectation}`,
        "});",
        "",
    ].join("\n");
}

function dispatchPlan(overrides: Record<string, any> = {}) {
    const evidence = {
        requiredArtifacts: [],
        requiredCommands: ["git diff --check"],
        returnContract: "Return summary, files changed, exact evidence, and known misses.",
        ...(overrides.evidence ?? {}),
    };
    const platform = {
        agent: { status: "UNATTESTED", value: null },
        model: { status: "UNATTESTED", value: null },
        ...(overrides.platform ?? {}),
    };
    return {
        laneId: "lane-alpha",
        label: "Luna",
        role: "research",
        task: "Inspect the bounded cursor authority and return evidence only.",
        mayRead: ["package.json"],
        mayWrite: [],
        ...overrides,
        evidence,
        platform,
    };
}

function dispatchReceiptFile(root: string, waveId: string, digest: string) {
    return join(gitPrivatePaths(root).dispatch, waveId, `${digest}.json`);
}

function installDispatchBytes(root: string, waveId: string, bytes: Buffer, digest = sha256(bytes)) {
    const path = dispatchReceiptFile(root, waveId, digest);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, bytes, { mode: 0o600 });
    chmodSync(path, 0o600);
    return path;
}

function releaseProjectionFixtureSource(mode: "pass" | "missing-export" | "malformed" | "extra" | "nonzero" | "stale" | "wrong-wave" | "wrong-view" | "wrong-ref" | "wrong-profile" | "bad-exit" | "early-terminal" | "console-output" | "throw" | "mutate-materialized" | "extra-materialized" | "delete-boundaries" | "mutate-worktree" | "mutate-then-throw" | "mutate-ref" | "mutate-git-private" | "mutate-node-modules" = "pass") {
    if (mode === "missing-export") return "export const fixture = true;\n";
    return [
        'import { createHash } from "node:crypto";',
        'import { spawnSync } from "node:child_process";',
        'import { mkdirSync, rmSync, writeFileSync } from "node:fs";',
        'import { fileURLToPath } from "node:url";',
        "",
        `const MODE = ${JSON.stringify(mode)};`,
        `const A = ${JSON.stringify(CONTINUOUS_PROJECTIONS[0])};`,
        `const F = ${JSON.stringify(CONTINUOUS_PROJECTIONS[1])};`,
        "const sha256 = (value) => createHash(\"sha256\").update(value).digest(\"hex\");",
        "const compare = (left, right) => Buffer.compare(Buffer.from(left), Buffer.from(right));",
        "const canonicalJson = (value) => {",
        "    if (Array.isArray(value)) return `[${value.map(canonicalJson).join(\",\")}]`;",
        "    if (value !== null && typeof value === \"object\") return `{${Object.keys(value).sort(compare).map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(\",\")}}`;",
        "    return JSON.stringify(value);",
        "};",
        "function git(root, args, encoding = \"utf8\") {",
        "    const result = spawnSync(\"git\", [\"-C\", root, ...args], { encoding, maxBuffer: 128 * 1024 * 1024, stdio: [\"ignore\", \"pipe\", \"pipe\"] });",
        "    if (result.error || result.status !== 0) throw new Error(\"git fixture failed: \" + args.join(\" \") + \" (status=\" + String(result.status) + \", signal=\" + String(result.signal) + \", error=\" + String(result.error?.message ?? \"\") + \", stderr=\" + String(result.stderr).trim() + \")\");",
        "    return result.stdout;",
        "}",
        "function selectedBytes({ root, view, ref }, path) {",
        "    return Buffer.from(git(root, [\"show\", view === \"index\" ? `:${path}` : `${ref}:${path}`], null));",
        "}",
        "function stage0({ root, view, ref }) {",
        "    const raw = Buffer.from(git(root, view === \"index\" ? [\"ls-files\", \"--stage\", \"-z\"] : [\"ls-tree\", \"-rz\", \"--full-tree\", ref], null));",
        "    const entries = raw.toString(\"utf8\").split(\"\\0\").filter(Boolean).map((row) => {",
        "        const match = view === \"index\" ? /^(\\d{6}) ([0-9a-f]{40}) [0-3]\\t(.*)$/.exec(row) : /^(\\d{6}) [^ ]+ ([0-9a-f]{40})\\t(.*)$/.exec(row);",
        "        if (!match) throw new Error(\"malformed fixture Git row\");",
        "        return { mode: match[1], oid: match[2], path: match[3] };",
        "    }).filter((entry) => entry.path !== A && entry.path !== F).sort((left, right) => compare(left.path, right.path));",
        "    return {",
        '        algorithm: "sha256(canonical-git-stage0-index-v1)",',
        "        sha256: sha256(entries.map((entry) => `${entry.path}\\0${entry.mode}\\0${entry.oid}\\n`).join(\"\")),",
        "        entryCount: entries.length,",
        "        excludes: [A, F],",
        "    };",
        "}",
        "export async function verifyReleaseProjection(input) {",
        "    if (MODE === \"console-output\") console.log(\"synthetic verifier stdout poison\");",
        "    if (MODE === \"throw\") throw new Error(\"synthetic verifier throw\");",
        "    if (MODE === \"mutate-materialized\") writeFileSync(fileURLToPath(import.meta.url), \"materialized poison\");",
        "    if (MODE === \"extra-materialized\") writeFileSync(new URL(\"../../unauthorized-materialized-extra\", import.meta.url), \"poison\");",
        "    if (MODE === \"delete-boundaries\") {",
        "        rmSync(new URL(\"../../node_modules\", import.meta.url), { recursive: true, force: true });",
        "        rmSync(new URL(\"../../.bi-release-projection-runtime\", import.meta.url), { recursive: true, force: true });",
        "    }",
        "    if (MODE === \"mutate-worktree\") writeFileSync(`${input.root}/synthetic-release-projection-poison`, \"poison\");",
        "    if (MODE === \"mutate-then-throw\") {",
        "        writeFileSync(`${input.root}/synthetic-release-projection-poison`, \"poison\");",
        "        throw new Error(\"synthetic verifier throw after mutation\");",
        "    }",
        "    if (MODE === \"mutate-ref\") git(input.root, [\"update-ref\", \"refs/codex/projection-poison\", \"HEAD\"]);",
        "    if (MODE === \"mutate-node-modules\") {",
        "        const probe = `${input.root}/node_modules/.bi-dependency-boundary-probe`;",
        "        writeFileSync(probe, \"dependency poison\");",
        "        rmSync(probe, { force: true });",
        "    }",
        "    if (MODE === \"mutate-git-private\") {",
        "        const privateRoot = git(input.root, [\"rev-parse\", \"--path-format=absolute\", \"--git-path\", \"tranche/BI\"]).trim();",
        "        mkdirSync(privateRoot, { recursive: true });",
        "        writeFileSync(`${privateRoot}/projection-poison`, \"poison\");",
        "    }",
        "    if (MODE === \"malformed\") return null;",
        "    const receiptPath = `docs/tranches/BI/evidence/${input.waveId}/receipt.json`;",
        "    const attestation = selectedBytes(input, A);",
        "    const final = selectedBytes(input, F);",
        "    const errors = [];",
        "    const expectedAttestation = Buffer.from(`${JSON.stringify({ fixture: input.waveId }, null, 2)}\\n`);",
        "    const expectedFinal = Buffer.from(`# ${input.waveId} synthetic projection\\n`);",
        "    if (!attestation.equals(expectedAttestation)) errors.push(\"synthetic release attestation byte parity drift\");",
        "    if (!final.equals(expectedFinal)) errors.push(\"synthetic FINAL byte parity drift\");",
        "    if (MODE === \"nonzero\") errors.push(\"synthetic projection forced RED\");",
        "    if (input.requireTerminal && MODE !== \"early-terminal\") errors.push(\"synthetic projection is nonterminal\");",
        "    errors.sort(compare);",
        "    const blockers = MODE === \"early-terminal\" ? [] : [{ code: \"FORMATION_NONTERMINAL\", ownerWave: \"BI.W-P133\", subject: \"execution-cursor\" }];",
        "    const ownerArgv = input.requireTerminal || input.profile === \"release\"",
        "        ? [\"node\", \"scripts/verify.mjs\", \"--state\", \"auto\", \"--profile\", \"release\", \"--require-terminal\"]",
        "        : [\"node\", \"scripts/verify.mjs\", \"--state\", \"auto\", \"--wave\", input.waveId];",
        "    const evidence = {",
        '        schemaVersion: "1.0.0",',
        '        authority: "BI_RELEASE_PROJECTION_V1",',
        "        waveId: MODE === \"wrong-wave\" ? \"BI.W-P999\" : input.waveId,",
        "        selectedView: MODE === \"wrong-view\" ? (input.view === \"index\" ? \"commit\" : \"index\") : input.view,",
        "        selectedRef: MODE === \"wrong-ref\" ? \"0\".repeat(40) : input.ref,",
        "        profile: MODE === \"wrong-profile\" ? \"native\" : input.profile,",
        "        requireTerminal: input.requireTerminal,",
        '        checkMode: "EXACT_BYTE_PARITY",',
        '        projectionStatus: MODE === "early-terminal" ? "TERMINAL_PROJECTION" : "NONTERMINAL_PROJECTION",',
        "        releaseEligible: MODE === \"early-terminal\",",
        "        receipt: { path: receiptPath, sha256: sha256(selectedBytes(input, receiptPath)) },",
        "        stage0Index: stage0(input),",
        "        attestationSha256: sha256(attestation),",
        "        finalSha256: sha256(final),",
        "        blockerDigest: sha256(canonicalJson(blockers)),",
        "        blockerCount: blockers.length,",
        "        blockers,",
        "        ownerArgv,",
        "    };",
        "    if (MODE === \"stale\") evidence.stage0Index.sha256 = \"0\".repeat(64);",
        "    const status = errors.length === 0 ? \"PASS\" : \"RED\";",
        "    const result = { status, exitCode: MODE === \"bad-exit\" ? (status === \"PASS\" ? 1 : 0) : (status === \"PASS\" ? 0 : 1), errors, evidence };",
        "    return MODE === \"extra\" ? { ...result, extra: true } : result;",
        "}",
        "",
    ].join("\n");
}

async function expectRecoveryRed(root: string) {
    await expect(recoverCursor({ root, at: "HEAD", readOnly: true })).rejects.toThrow();
}

async function waitFor<T>(read: () => T | null, timeoutMs = 15_000): Promise<T> {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
        const value = read();
        if (value !== null) return value;
        await new Promise((resolveWait) => setTimeout(resolveWait, 20));
    }
    throw new Error("timed out waiting for fixture state");
}

beforeAll(async () => {
    terminalTemplate = mkdtempSync(join(tmpdir(), "glass-bi-terminal-template-"));
    git(SOURCE_TREE, ["clone", "--quiet", "--shared", "--no-checkout", AUTHORITY_REPOSITORY, terminalTemplate]);
    configureSingleLineage(terminalTemplate, P000);
    await createP001Commit(terminalTemplate);
    const recovered = await recoverCursor({ root: terminalTemplate, readOnly: true });
    if (recovered.cursor.waves["BI.W-P001"].status !== "DONE") throw new Error("terminal P001 fixture did not recover");
}, 60_000);

afterEach(() => {
    while (temporaryRoots.length > 0) rmSync(temporaryRoots.pop()!, { recursive: true, force: true });
});

afterAll(() => {
    try {
        cleanupSelectedViewRuntime();
    } finally {
        if (terminalTemplate) rmSync(terminalTemplate, { recursive: true, force: true });
    }
});

describe("caught-error diagnostic hardening", () => {
    it("redacts every logical/real alias and bounds control-bearing name, code, message, summary, and cause", () => {
        const aliases = {
            logicalTemp: "/logical/tmp-root",
            realTemp: "/canonical/tmp-root",
            logicalAuthority: "/logical/tmp-root/authority",
            realAuthority: "/canonical/tmp-root/authority",
            logicalMaterialized: "/logical/tmp-root/selected-view",
            realMaterialized: "/canonical/tmp-root/selected-view",
            logicalRuntime: "/logical/tmp-root/selected-view/.runtime",
            realRuntime: "/canonical/tmp-root/selected-view/.runtime",
            logicalMirror: "/logical/tmp-root/selected-view/node_modules",
            realMirror: "/canonical/tmp-root/selected-view/node_modules",
            logicalDependency: "/logical/tmp-root/authority/node_modules",
            realDependency: "/canonical/tmp-root/authority/node_modules",
        };
        const inner: any = new Error([
            "failure across",
            ...Object.values(aliases),
            "with\ncontrols\u0000and\tbidi\u202eoverride\u2066isolate",
            "m".repeat(CAUGHT_ERROR_DIAGNOSTIC_LIMITS.message * 2),
        ].join(" "));
        inner.name = `Bad\u202e\nName ${aliases.realAuthority} ${"n".repeat(CAUGHT_ERROR_DIAGNOSTIC_LIMITS.name * 2)}`;
        inner.code = `E_DIAGNOSTIC\u2066\r${aliases.logicalDependency} ${"c".repeat(CAUGHT_ERROR_DIAGNOSTIC_LIMITS.code * 2)}`;
        const replacements = executionDiagnosticPathReplacements({
            authority: [aliases.logicalAuthority, aliases.realAuthority],
            materialized: [aliases.logicalMaterialized, aliases.realMaterialized],
            runtime: [aliases.logicalRuntime, aliases.realRuntime],
            temp: [aliases.logicalTemp, aliases.realTemp],
            selectedNodeModules: [aliases.logicalMirror, aliases.realMirror],
            dependency: [aliases.logicalDependency, aliases.realDependency],
        });
        const diagnostic = caughtErrorDiagnostic(inner, replacements);
        const serialized = JSON.stringify(diagnostic);
        for (const alias of Object.values(aliases)) expect(serialized).not.toContain(alias);
        for (const token of ["<ISOLATED_RUNTIME>", "<SELECTED_NODE_MODULES>", "<DEPENDENCY_ROOT>", "<SELECTED_VIEW>", "<AUTHORITY_ROOT>", "<TMP_ROOT>"]) {
            expect(diagnostic.cause.message).toContain(token);
        }
        expect(diagnostic.cause.name).toContain("<AUTHORITY_ROOT>");
        expect(diagnostic.cause.code).toContain("<DEPENDENCY_ROOT>");
        for (const scalar of [diagnostic.cause.name, diagnostic.cause.code, diagnostic.cause.message, diagnostic.summary]) {
            expect(scalar).not.toMatch(/[\p{Cc}\p{Cf}]/u);
            expect(scalar).not.toMatch(/\s{2,}/u);
        }
        expect(diagnostic.cause.name.length).toBeLessThanOrEqual(CAUGHT_ERROR_DIAGNOSTIC_LIMITS.name);
        expect(diagnostic.cause.code.length).toBeLessThanOrEqual(CAUGHT_ERROR_DIAGNOSTIC_LIMITS.code);
        expect(diagnostic.cause.message.length).toBeLessThanOrEqual(CAUGHT_ERROR_DIAGNOSTIC_LIMITS.message);
        expect(diagnostic.summary.length).toBeLessThanOrEqual(CAUGHT_ERROR_DIAGNOSTIC_LIMITS.summary);
        expect(serialized.length).toBeLessThanOrEqual(CAUGHT_ERROR_DIAGNOSTIC_LIMITS.serialized);
        expect(diagnostic.cause.code).toMatch(/^E_DIAGNOSTIC/);
        expect(diagnostic.summary).toContain(`${diagnostic.cause.code}:`);

        expect(() => executionDiagnosticPathReplacements({ authority: ["."] }))
            .toThrow(/absolute non-root paths/);
        const stableInner: any = new Error(`E.TEST ${aliases.logicalAuthority} <AUTHORITY_ROOT>`);
        stableInner.code = "E.TEST";
        const stable = caughtErrorDiagnostic(stableInner, replacements);
        expect(stable.cause.code).toBe("E.TEST");
        expect(stable.summary).toMatch(/^E\.TEST:/);
        expect(stable.cause.message).toBe("E.TEST <AUTHORITY_ROOT> <AUTHORITY_ROOT>");

        const wrapped = new CursorError("outer diagnostic", "OUTER_DIAGNOSTIC", diagnostic.cause);
        expect(wrapped.cause).toEqual(diagnostic.cause);
        expect(Object.getOwnPropertyDescriptor(wrapped, "cause")?.enumerable).toBe(false);
        expect(Object.keys(wrapped)).not.toContain("cause");
    });
});

describe("exactly-once readiness", () => {
    it("rejects a synthetic RUNNING replay", async () => {
        const root = createP000Fixture();
        const recovered = await recoverCursor({ root, readOnly: true });
        const cursor = structuredClone(recovered.cursor);
        cursor.waves["BI.W-P001"].status = "RUNNING";
        cursor.runningWaves = ["BI.W-P001"];
        const wave = recovered.formation.waves.waves.find((row: any) => row.id === "BI.W-P001");
        expect(launchReadinessErrors(cursor, wave, recovered.formation.dag).join("\n")).toContain("not runnable exactly once");
    });

    it("fails closed without resource-safe batch authority and delays P005 behind P002/P003/P004", async () => {
        const root = createP000Fixture();
        const recovered = await recoverCursor({ root, readOnly: true });
        const cursor = structuredClone(recovered.cursor);
        cursor.waves["BI.W-P001"] = {
            ...cursor.waves["BI.W-P001"],
            status: "DONE",
            commit: "a".repeat(40),
            evidenceDigest: "b".repeat(64),
            terminalRationale: "fixture terminal",
        };
        const byId = new Map(recovered.formation.waves.waves.map((wave: any) => [wave.id, wave]));
        expect(launchReadinessErrors(cursor, byId.get("BI.W-P002"), undefined).join("\n")).toContain("batch authority is unavailable");
        for (const id of ["BI.W-P002", "BI.W-P003", "BI.W-P004"]) {
            expect(launchReadinessErrors(cursor, byId.get(id), recovered.formation.dag)).toEqual([]);
        }
        expect(launchReadinessErrors(cursor, byId.get("BI.W-P005"), recovered.formation.dag).join("\n")).toContain("first nonterminal");
    });

    it("never unlocks from DEAD and P002 DEAD withdraws the execution lineage", async () => {
        const root = createP000Fixture();
        const recovered = await recoverCursor({ root, readOnly: true });
        const byId = new Map(recovered.formation.waves.waves.map((wave: any) => [wave.id, wave]));
        const deadP001 = structuredClone(recovered.cursor);
        deadP001.waves["BI.W-P001"].status = "DEAD";
        expect(launchReadinessErrors(deadP001, byId.get("BI.W-P002"), recovered.formation.dag).join("\n")).toContain("launch dependency BI.W-P001 is not DONE");

        const withdrawn = structuredClone(recovered.cursor);
        withdrawn.withdrawn = true;
        withdrawn.waves["BI.W-P001"].status = "DONE";
        withdrawn.waves["BI.W-P002"].status = "DEAD";
        expect(launchReadinessErrors(withdrawn, byId.get("BI.W-P003"), recovered.formation.dag).join("\n")).toContain("formation is withdrawn");
    });

    it("recovers an evidence-backed P001 DEAD without absent CREATE subjects or semantic-test execution", async () => {
        const root = createP000Fixture();
        const { commit } = await createP001DeadCommit(root);
        const recovered = await recoverCursor({ root, readOnly: true });
        expect(recovered.cursor.waves["BI.W-P001"]).toMatchObject({ status: "DEAD", commit });
        const verified = await verifyRecoveredState({ root, waveId: "BI.W-P001", ref: "HEAD" });
        expect(verified.status).toBe("PASS");
        expect(verified.evidence?.semanticTest).toBeNull();
    }, 60_000);
});

describe("Git-private crash recovery", () => {
    it("rejects a recovered RUNNING replay before a second launch", async () => {
        const root = createP000Fixture();
        const recovered = await recoverCursor({ root, readOnly: true });
        await startWave({ root, waveId: "BI.W-P001" });
        const state = await validateCursor({ root });
        expect(state.cursor.runningWaves).toEqual(["BI.W-P001"]);
        const wave = recovered.formation.waves.waves.find((row: any) => row.id === "BI.W-P001");
        expect(launchReadinessErrors(state.cursor, wave, recovered.formation.dag).join("\n")).toContain("not runnable exactly once");
        await expect(startWave({ root, waveId: "BI.W-P001" })).rejects.toThrow(/not runnable exactly once|collides/);
    }, 60_000);

    it("reconstructs byte-identically after integration and deletion of every private cache/journal file", async () => {
        const root = createP000Fixture();
        await startWave({ root, waveId: "BI.W-P001" });
        const { commit } = await createP001Commit(root);
        await integrateWave({ root, waveId: "BI.W-P001", commit });
        await terminalizeWave({ root, waveId: "BI.W-P001", commit, status: "DONE" });
        const terminal = await validateCursor({ root });
        expect(terminal.ok).toBe(true);
        const expectedBytes = terminal.bytes;
        const paths = gitPrivatePaths(root);
        rmSync(paths.base, { recursive: true, force: true });
        const recovered = await recoverCursor({ root, readOnly: true });
        expect(recovered.bytes).toBe(expectedBytes);
        expect(serializeCursor(recovered.cursor)).toBe(expectedBytes);
        expect(existsSync(paths.cursor)).toBe(false);

        const freshClone = registerTemp("glass-bi-fresh-terminal-");
        rmSync(freshClone, { recursive: true, force: true });
        git(root, ["clone", "--quiet", "--shared", "--no-checkout", root, freshClone]);
        configureSingleLineage(freshClone, commit);
        const freshRecovered = await recoverCursor({ root: freshClone, readOnly: true });
        expect(freshRecovered.bytes).toBe(expectedBytes);
        expect(serializeCursor(freshRecovered.cursor)).toBe(expectedBytes);
        expect(existsSync(gitPrivatePaths(freshClone).cursor)).toBe(false);
    }, 60_000);

    it("ignores exact orphan durable-write temporaries but rejects unknown journal files", async () => {
        const root = createP000Fixture();
        const paths = gitPrivatePaths(root);
        mkdirSync(paths.journal, { recursive: true });
        writeFileSync(join(paths.journal, `.BI.W-P001.json.999.${randomUUID()}.tmp`), "partial");
        expect((await validateCursor({ root })).ok).toBe(true);
        writeFileSync(join(paths.journal, "unexpected.tmp"), "partial");
        await expect(validateCursor({ root })).rejects.toThrow(/unexpected Git-private journal file/);
    });
});

describe("Git-private pre-dispatch receipts", () => {
    it("publishes one immutable receipt before attachment and makes attach/settle retries exact", async () => {
        const root = createP000Fixture();
        const plan = dispatchPlan();
        const started = await startWave({ root, waveId: "BI.W-P001", initialPlans: [plan] });
        const lane = started.journal.lanes[0];
        const path = dispatchReceiptFile(root, "BI.W-P001", lane.receiptSha256);
        const original = readFileSync(path);
        expect(statSync(path).mode & 0o777).toBe(0o600);
        expect(JSON.parse(original.toString("utf8"))).toMatchObject({
            authority: "GIT_PRIVATE_PRE_DISPATCH_RECEIPT_V1",
            formationDigest: "df19ceeba6bb52454eccdc2a7045749f0fa9070aa8348383f0312fb6ff452277",
            sourceBase: SOURCE_BASE,
            waveId: "BI.W-P001",
            integrationParent: P000,
            laneId: "lane-alpha",
            label: "Luna",
            role: "research",
            platform: {
                agent: { status: "UNATTESTED", value: null },
                model: { status: "UNATTESTED", value: null },
            },
        });

        expect(await prepareDispatchLane({ root, waveId: "BI.W-P001", plan })).toMatchObject({
            status: "ACTIVE",
            dispatchAction: "RECONCILE_PLATFORM",
            receiptSha256: lane.receiptSha256,
            idempotent: true,
        });
        await expect(settleDispatchLane({
            root,
            waveId: "BI.W-P001",
            laneId: "lane-alpha",
            receiptSha256: "0".repeat(64),
        })).rejects.toThrow(/does not identify one attached lane/);
        expect(await settleDispatchLane({
            root,
            waveId: "BI.W-P001",
            laneId: "lane-alpha",
            receiptSha256: lane.receiptSha256,
        })).toMatchObject({ status: "SETTLED", dispatchAction: "NO_DISPATCH", idempotent: false });
        expect(await settleDispatchLane({
            root,
            waveId: "BI.W-P001",
            laneId: "lane-alpha",
            receiptSha256: lane.receiptSha256,
        })).toMatchObject({ status: "SETTLED", dispatchAction: "NO_DISPATCH", idempotent: true });
        expect(await prepareDispatchLane({ root, waveId: "BI.W-P001", plan })).toMatchObject({
            status: "SETTLED",
            dispatchAction: "NO_DISPATCH",
            receiptSha256: lane.receiptSha256,
            idempotent: true,
        });
        expect(readFileSync(path)).toEqual(original);
        expect((await validateCursor({ root })).ok).toBe(true);
    }, 60_000);

    it("reattaches only the exact crash orphan and removes only exact staging files under lock", async () => {
        const root = createP000Fixture();
        const plan = dispatchPlan();
        const rendered = await renderDispatchReceipt({ root, waveId: "BI.W-P001", plan });
        installDispatchBytes(root, "BI.W-P001", rendered.bytes, rendered.receiptSha256);
        const detached = await validateCursor({ root });
        expect(detached.ok).toBe(false);
        expect(detached.errors.join("\n")).toContain("unattached dispatch receipt");

        const started = await startWave({ root, waveId: "BI.W-P001", initialPlans: [plan] });
        expect(started.journal.lanes).toEqual([{
            laneId: "lane-alpha",
            receiptSha256: rendered.receiptSha256,
            state: "ACTIVE",
        }]);
        await expect(prepareDispatchLane({
            root,
            waveId: "BI.W-P001",
            plan: dispatchPlan({ task: "A divergent immutable task must not alias the lane." }),
        })).rejects.toThrow(/conflicts with its immutable receipt digest/);

        const staging = join(
            gitPrivatePaths(root).dispatch,
            "BI.W-P001",
            `.${rendered.receiptSha256}.999.${randomUUID()}.dispatch.tmp`,
        );
        writeFileSync(staging, "partial", { mode: 0o600 });
        expect((await validateCursor({ root })).ok).toBe(true);
        await prepareDispatchLane({ root, waveId: "BI.W-P001", plan });
        expect(existsSync(staging)).toBe(false);

        writeFileSync(join(dirname(staging), "unknown.partial"), "partial", { mode: 0o600 });
        await expect(validateCursor({ root })).rejects.toThrow(/unexpected Git-private dispatch file/);
    }, 60_000);

    it("exposes explicit start/prepare/settle CLI operations without inferring identity", async () => {
        const root = createP000Fixture();
        const first = dispatchPlan({ laneId: "cli-alpha" });
        const started = await runCursor([
            "start", "--root", root, "--wave", "BI.W-P001", "--plans-json", JSON.stringify([first]),
        ]);
        const firstDigest = started.journal.lanes[0].receiptSha256;
        const second = dispatchPlan({ laneId: "cli-beta", label: "Terra", task: "Challenge the bounded receipt lifecycle." });
        const prepared = await runCursor([
            "prepare-dispatch", "--root", root, "--wave", "BI.W-P001", "--plan-json", JSON.stringify(second),
        ]);
        expect(prepared).toMatchObject({
            operation: "prepare-dispatch",
            status: "ACTIVE",
            dispatchAction: "AUTHORIZE_NEW_DISPATCH",
            laneId: "cli-beta",
        });
        expect(await runCursor([
            "settle-dispatch", "--root", root, "--wave", "BI.W-P001",
            "--lane", "cli-alpha", "--receipt-sha256", firstDigest,
        ])).toMatchObject({ operation: "settle-dispatch", status: "SETTLED" });
        expect(await runCursor([
            "settle-dispatch", "--root", root, "--wave", "BI.W-P001",
            "--lane", "cli-beta", "--receipt-sha256", prepared.receiptSha256,
        ])).toMatchObject({ operation: "settle-dispatch", status: "SETTLED" });
        expect((await validateCursor({ root })).ok).toBe(true);
    }, 60_000);

    it("serializes simultaneous prepares and attaches both distinct noncolliding lanes exactly once", async () => {
        const root = createP000Fixture();
        await startWave({ root, waveId: "BI.W-P001" });
        const plans = [
            dispatchPlan({ laneId: "simultaneous-alpha", task: "Research the first disjoint bounded question." }),
            dispatchPlan({ laneId: "simultaneous-beta", label: "Terra", task: "Challenge the second disjoint bounded question." }),
        ];
        const results = await Promise.all(plans.map((plan) => prepareDispatchLane({
            root,
            waveId: "BI.W-P001",
            plan,
        })));
        expect(results.map((result) => result.dispatchAction)).toEqual([
            "AUTHORIZE_NEW_DISPATCH",
            "AUTHORIZE_NEW_DISPATCH",
        ]);
        const journal = JSON.parse(readFileSync(join(gitPrivatePaths(root).journal, "BI.W-P001.json"), "utf8"));
        expect(journal.lanes.map((lane: any) => lane.laneId)).toEqual(["simultaneous-alpha", "simultaneous-beta"]);
        expect(new Set(journal.lanes.map((lane: any) => lane.receiptSha256)).size).toBe(2);
        expect((await validateCursor({ root })).ok).toBe(true);
    }, 120_000);

    it("binds a copy-safe exact routing policy and rejects every unbounded role, path, or identity", async () => {
        const policy = dispatchRoutingPolicy();
        expect(policy).toEqual({
            currentOrder: {
                id: "CURRENT-012",
                sha256: "fd22635a249d27fe85791f331e6ee3c8d7e352b45cc86b3f19996b1894251a74",
            },
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
        });
        expect(DISPATCH_ROUTING_POLICY_SHA256).toBe(sha256(canonicalFixtureJson(policy)));
        policy.routing.fanout.roles.push("poison");
        expect(dispatchRoutingPolicy().routing.fanout.roles).not.toContain("poison");

        const root = createP000Fixture();
        await expect(prepareDispatchLane({ root, waveId: "BI.W-P001", plan: dispatchPlan() }))
            .rejects.toThrow(/before its RUNNING journal/);
        for (const role of ["research", "mechanical-audit", "implementation", "challenge"]) {
            const rendered = await renderDispatchReceipt({
                root,
                waveId: "BI.W-P001",
                plan: dispatchPlan({ laneId: `allowed-${role}`, role }),
            });
            expect(rendered.receipt.role).toBe(role);
            expect(rendered.receipt.routingPolicySha256).toBe(DISPATCH_ROUTING_POLICY_SHA256);
        }
        for (const role of ["orchestration", "design", "synthesis", "adjudication", "integration", "cursor-mutation", "commit"]) {
            await expect(renderDispatchReceipt({
                root,
                waveId: "BI.W-P001",
                plan: dispatchPlan({ laneId: `forbidden-${role}`, role }),
            })).rejects.toThrow(/not an allowed bounded non-root role/);
        }

        await startWave({ root, waveId: "BI.W-P001" });
        const withoutReads = dispatchPlan() as any;
        delete withoutReads.mayRead;
        const withoutWrites = dispatchPlan() as any;
        delete withoutWrites.mayWrite;
        const invalidPlans = [
            withoutReads,
            withoutWrites,
            dispatchPlan({ mayRead: ["package.json", "package.json"] }),
            dispatchPlan({ mayRead: ["missing-local-path"] }),
            dispatchPlan({ mayRead: [`ROOT_GIT_OBJECT:${P000}`] }),
            dispatchPlan({ mayRead: [`FOREIGN_GIT_OBJECT:atlas:${P000}`] }),
            dispatchPlan({ mayRead: ["FOREIGN_REPOSITORY:atlas"] }),
            dispatchPlan({ mayRead: [`FOREIGN_REPOSITORY:Atlas:${P000}`] }),
            dispatchPlan({ role: "research", mayWrite: ["package.json"] }),
            dispatchPlan({ role: "implementation", mayWrite: ["README.md"] }),
            dispatchPlan({ platform: { agent: { status: "PLATFORM_REPORTED", value: "lUnA" } } }),
            dispatchPlan({ platform: { model: { status: "PLATFORM_REPORTED", value: "TERRA" } } }),
            dispatchPlan({ platform: { agent: { status: "PLATFORM_REPORTED", value: "provider agent opaque identity 17" } } }),
            dispatchPlan({ platform: { model: { status: "PLATFORM_REPORTED", value: "GPT 5.5 private workflow build" } } }),
            dispatchPlan({ platform: { model: { status: "UNATTESTED", value: "invented-model" } } }),
            dispatchPlan({ platform: { model: { status: "REPORTED", value: "provider-model" } } }),
        ];
        for (const invalid of invalidPlans) {
            await expect(prepareDispatchLane({ root, waveId: "BI.W-P001", plan: invalid })).rejects.toThrow();
        }

        const external = dispatchPlan({
            laneId: "external-bounds",
            label: "Terra",
            task: "Audit exact root objects and two immutable foreign repository authorities.",
            mayRead: [
                `FOREIGN_GIT_OBJECT:atlas:${P000}:package.json`,
                `FOREIGN_REPOSITORY:sci-report:${P000}`,
                `ROOT_GIT_OBJECT:${P000}:package.json`,
            ],
        });
        const prepared = await prepareDispatchLane({ root, waveId: "BI.W-P001", plan: external });
        expect(prepared.dispatchAction).toBe("AUTHORIZE_NEW_DISPATCH");
        const receipt = JSON.parse(readFileSync(dispatchReceiptFile(root, "BI.W-P001", prepared.receiptSha256), "utf8"));
        expect(receipt.mayRead).toEqual(external.mayRead);
        expect(receipt.platform).toEqual(external.platform);
        expect(receipt.routingPolicySha256).toBe(DISPATCH_ROUTING_POLICY_SHA256);
        await settleDispatchLane({
            root,
            waveId: "BI.W-P001",
            laneId: prepared.laneId,
            receiptSha256: prepared.receiptSha256,
        });
    }, 120_000);

    it("enforces the anchored three-lane ceiling across concurrent journals and releases capacity on settle", async () => {
        const root = cloneTerminalFixture();
        for (const waveId of ["BI.W-P002", "BI.W-P003", "BI.W-P004"]) {
            await startWave({ root, waveId });
        }
        const active: Record<string, any> = {};
        for (const [waveId, laneId] of [
            ["BI.W-P002", "capacity-p002"],
            ["BI.W-P003", "capacity-p003"],
            ["BI.W-P004", "capacity-p004"],
        ]) {
            active[waveId] = await prepareDispatchLane({
                root,
                waveId,
                plan: dispatchPlan({ laneId, task: `Research the bounded ${waveId} authority.` }),
            });
        }
        await expect(prepareDispatchLane({
            root,
            waveId: "BI.W-P002",
            plan: dispatchPlan({ laneId: "capacity-fourth", task: "Exceed the anchored capacity." }),
        })).rejects.toThrow(/formation live-agent ceiling/);

        await settleDispatchLane({
            root,
            waveId: "BI.W-P003",
            laneId: active["BI.W-P003"].laneId,
            receiptSha256: active["BI.W-P003"].receiptSha256,
        });
        expect(await prepareDispatchLane({
            root,
            waveId: "BI.W-P002",
            plan: dispatchPlan({ laneId: "capacity-fourth", task: "Use capacity released by an exact settle." }),
        })).toMatchObject({ status: "ACTIVE", laneId: "capacity-fourth" });
        expect((await validateCursor({ root })).ok).toBe(true);
    }, 120_000);

    it("keeps ACTIVE implementation writes pairwise disjoint and inside exact wave leases", async () => {
        const root = cloneTerminalFixture();
        const recovered = await recoverCursor({ root, readOnly: true });
        const wave = recovered.formation.waves.waves.find((candidate: any) => candidate.id === "BI.W-P002");
        const leasedPath = wave.subjects.find((subject: any) => subject.action !== "verify")?.path;
        expect(leasedPath).toBeTruthy();
        await startWave({ root, waveId: "BI.W-P002" });
        const firstPlan = dispatchPlan({
            laneId: "writer-alpha",
            role: "implementation",
            task: "Implement the exact leased subject without crossing its boundary.",
            mayWrite: [leasedPath],
        });
        const first = await prepareDispatchLane({ root, waveId: "BI.W-P002", plan: firstPlan });
        const secondPlan = dispatchPlan({
            laneId: "writer-beta",
            role: "implementation",
            task: "Attempt the same active write lease from a second lane.",
            mayWrite: [leasedPath],
        });
        await expect(prepareDispatchLane({ root, waveId: "BI.W-P002", plan: secondPlan }))
            .rejects.toThrow(/dispatch write bound collides/);
        await settleDispatchLane({
            root,
            waveId: "BI.W-P002",
            laneId: first.laneId,
            receiptSha256: first.receiptSha256,
        });
        expect(await prepareDispatchLane({ root, waveId: "BI.W-P002", plan: secondPlan }))
            .toMatchObject({ status: "ACTIVE", laneId: "writer-beta" });
    }, 120_000);

    it("blocks staged verification and integration only on target ACTIVE lanes, then archives receipts", async () => {
        const root = cloneTerminalFixture();
        linkFixtureNodeModules(root);
        const targetPlan = dispatchPlan({ laneId: "target-p002", task: "Challenge the target P002 transaction." });
        const siblingPlan = dispatchPlan({ laneId: "sibling-p003", label: "Terra", task: "Research the independently launched P003 transaction." });
        const target = await startWave({ root, waveId: "BI.W-P002", initialPlans: [targetPlan] });
        await startWave({ root, waveId: "BI.W-P003", initialPlans: [siblingPlan] });
        const integrationParent = output(root, ["rev-parse", "HEAD"]);
        const targetLane = target.journal.lanes[0];
        const targetReceiptPath = dispatchReceiptFile(root, "BI.W-P002", targetLane.receiptSha256);
        const archivedBytes = readFileSync(targetReceiptPath);
        const testSources = {
            "tests/tranche/release-projection.test.ts": semanticFixtureSource("P002 dispatch target selected-view proof"),
        };
        const candidate = await stageSyntheticWaveCandidate(root, "BI.W-P002", testSources);

        const staged = await verifyRecoveredState({
            root,
            waveId: "BI.W-P002",
            ref: "HEAD",
            trailerMessage: candidate.message,
        });
        expect(staged.status).toBe("RED");
        expect(staged.errors.join("\n")).toContain("staged transaction cannot verify while its dispatch lanes are ACTIVE");

        const bypassedCommit = commitTree(root, output(root, ["write-tree"]), integrationParent, candidate.message);
        setHead(root, bypassedCommit);
        const bypassed = await verifyRecoveredState({ root, waveId: "BI.W-P002", ref: "HEAD" });
        expect(bypassed.status).toBe("RED");
        expect(bypassed.errors.join("\n")).toContain("terminal Git row retains a RUNNING journal with ACTIVE dispatch lanes");
        await expect(integrateWave({ root, waveId: "BI.W-P002", commit: bypassedCommit }))
            .rejects.toThrow(/integrate cannot proceed while its dispatch lanes are ACTIVE/);

        setHead(root, integrationParent);
        await settleDispatchLane({
            root,
            waveId: "BI.W-P002",
            laneId: targetLane.laneId,
            receiptSha256: targetLane.receiptSha256,
        });
        const settledCandidate = await stageSyntheticWaveCandidate(root, "BI.W-P002", testSources);
        const commit = commitTree(root, output(root, ["write-tree"]), integrationParent, settledCandidate.message);
        setHead(root, commit);
        const ordinaryPostcommit = await verifyRecoveredState({ root, waveId: "BI.W-P002", ref: "HEAD" });
        expect(ordinaryPostcommit.status, ordinaryPostcommit.errors.join("\n")).toBe("PASS");
        expect(ordinaryPostcommit.errors.join("\n")).not.toMatch(/terminal Git row retains|ACTIVE dispatch lanes/);
        expect((await validateCursor({ root })).ok).toBe(false);
        await runCursor(["recover", "--root", root]);
        expect((await validateCursor({ root })).ok).toBe(true);
        const releasePostcommit = await verifyRecoveredState({
            root,
            waveId: "BI.W-P002",
            ref: "HEAD",
            profile: "release",
            requireTerminal: true,
        });
        expect(releasePostcommit.status).toBe("RED");
        expect(releasePostcommit.errors.join("\n")).toContain("terminal release rejects surviving RUNNING journals");
        expect(await integrateWave({ root, waveId: "BI.W-P002", commit }))
            .toMatchObject({ status: "INTEGRATED", waveId: "BI.W-P002", commit });
        await terminalizeWave({ root, waveId: "BI.W-P002", commit, status: "DONE" });
        expect(readFileSync(targetReceiptPath)).toEqual(archivedBytes);
        expect((await validateCursor({ root })).ok).toBe(true);

        writeFileSync(join(gitPrivatePaths(root).dispatch, "historical-private-poison"), "poison", { mode: 0o600 });
        await expect(validateCursor({ root })).rejects.toThrow(/unexpected Git-private dispatch entry/);
        const historicalRecover = await runCursor(["recover", "--root", root, "--at", P000, "--read-only"]);
        expect(historicalRecover).toMatchObject({ status: "PASS", journals: 0, cursor: { atCommit: P000 } });
        const historicalValidate = await validateCursor({ root, at: P000 });
        expect(historicalValidate).toMatchObject({ ok: true, cache: "IGNORED_HISTORICAL_GIT_ONLY", cursor: { atCommit: P000 } });
        const historicalVerify = await verifyRecoveredState({ root, waveId: "BI.W-P001", ref: P000 });
        expect(historicalVerify.evidence?.atCommit).toBe(P000);
        expect(historicalVerify.errors.join("\n")).not.toMatch(/dispatch|Git-private|historical-private-poison/);

        const fresh = registerTemp("glass-bi-dispatch-fresh-");
        rmSync(fresh, { recursive: true, force: true });
        git(root, ["clone", "--quiet", "--shared", "--no-checkout", root, fresh]);
        configureSingleLineage(fresh, commit);
        expect(existsSync(gitPrivatePaths(fresh).dispatch)).toBe(false);
        const recovered = await recoverCursor({ root: fresh, readOnly: true });
        expect(recovered.cursor.waves["BI.W-P002"]).toMatchObject({ status: "DONE", commit });
    }, 180_000);

    it("rejects symlink traversal, unknown entries, bad modes, and malformed staging artifacts", async () => {
        const dispatchRootSymlink = createP000Fixture();
        const dispatchTarget = registerTemp("glass-bi-dispatch-target-");
        writeFileSync(join(dispatchTarget, "must-not-be-traversed"), "poison");
        mkdirSync(gitPrivatePaths(dispatchRootSymlink).base, { recursive: true });
        symlinkSync(dispatchTarget, gitPrivatePaths(dispatchRootSymlink).dispatch, "dir");
        await expect(validateCursor({ root: dispatchRootSymlink })).rejects.toThrow(/dispatch root is not one directory/);

        const waveSymlink = createP000Fixture();
        const waveTarget = registerTemp("glass-bi-dispatch-wave-target-");
        writeFileSync(join(waveTarget, "must-not-be-traversed"), "poison");
        mkdirSync(gitPrivatePaths(waveSymlink).dispatch, { recursive: true });
        symlinkSync(waveTarget, join(gitPrivatePaths(waveSymlink).dispatch, "BI.W-P001"), "dir");
        await expect(validateCursor({ root: waveSymlink })).rejects.toThrow(/dispatch wave entry is not one directory/);

        const journalSymlink = createP000Fixture();
        const journalTarget = registerTemp("glass-bi-journal-target-");
        mkdirSync(gitPrivatePaths(journalSymlink).base, { recursive: true });
        symlinkSync(journalTarget, gitPrivatePaths(journalSymlink).journal, "dir");
        await expect(validateCursor({ root: journalSymlink })).rejects.toThrow(/journal root is not one directory/);

        const receiptSymlink = createP000Fixture();
        const receiptStarted = await startWave({
            root: receiptSymlink,
            waveId: "BI.W-P001",
            initialPlans: [dispatchPlan()],
        });
        const receiptPath = dispatchReceiptFile(receiptSymlink, "BI.W-P001", receiptStarted.journal.lanes[0].receiptSha256);
        const receiptTarget = join(registerTemp("glass-bi-dispatch-file-target-"), "receipt.json");
        writeFileSync(receiptTarget, readFileSync(receiptPath), { mode: 0o600 });
        rmSync(receiptPath);
        symlinkSync(receiptTarget, receiptPath, "file");
        await expect(validateCursor({ root: receiptSymlink })).rejects.toThrow(/private regular file/);

        const badMode = createP000Fixture();
        const modeStarted = await startWave({ root: badMode, waveId: "BI.W-P001", initialPlans: [dispatchPlan()] });
        const modePath = dispatchReceiptFile(badMode, "BI.W-P001", modeStarted.journal.lanes[0].receiptSha256);
        chmodSync(modePath, 0o644);
        await expect(validateCursor({ root: badMode })).rejects.toThrow(/private regular file/);

        const unknownRoot = createP000Fixture();
        mkdirSync(join(gitPrivatePaths(unknownRoot).dispatch, "unexpected"), { recursive: true });
        await expect(validateCursor({ root: unknownRoot })).rejects.toThrow(/unexpected Git-private dispatch entry/);

        for (const kind of ["mode", "symlink"] as const) {
            const root = createP000Fixture();
            const directory = join(gitPrivatePaths(root).dispatch, "BI.W-P001");
            mkdirSync(directory, { recursive: true });
            const staging = join(directory, `.${"a".repeat(64)}.999.${randomUUID()}.dispatch.tmp`);
            if (kind === "mode") writeFileSync(staging, "partial", { mode: 0o644 });
            else {
                const target = join(registerTemp("glass-bi-staging-target-"), "partial");
                writeFileSync(target, "partial", { mode: 0o600 });
                symlinkSync(target, staging, "file");
            }
            await expect(validateCursor({ root })).rejects.toThrow(/receipt staging entry is malformed/);
        }
    }, 180_000);

    it("rejects two canonical immutable receipts that reuse one lane identity with divergent digests", async () => {
        const root = createP000Fixture();
        const first = await renderDispatchReceipt({
            root,
            waveId: "BI.W-P001",
            plan: dispatchPlan({ laneId: "duplicate-lane", task: "Research the first exact question." }),
        });
        const second = await renderDispatchReceipt({
            root,
            waveId: "BI.W-P001",
            plan: dispatchPlan({ laneId: "duplicate-lane", task: "Research a divergent exact question." }),
        });
        expect(first.receiptSha256).not.toBe(second.receiptSha256);
        installDispatchBytes(root, "BI.W-P001", first.bytes, first.receiptSha256);
        installDispatchBytes(root, "BI.W-P001", second.bytes, second.receiptSha256);
        await expect(validateCursor({ root })).rejects.toThrow(/conflicting dispatch lane receipts/);
    });

    it("rejects raw-byte, filename, canonical-form, and every receipt-authority binding mutation", async () => {
        const noncanonical = createP000Fixture();
        const noncanonicalRendered = await renderDispatchReceipt({ root: noncanonical, waveId: "BI.W-P001", plan: dispatchPlan() });
        const compact = Buffer.from(`${JSON.stringify(noncanonicalRendered.receipt)}\n`);
        installDispatchBytes(noncanonical, "BI.W-P001", compact);
        await expect(validateCursor({ root: noncanonical })).rejects.toThrow(/receipt bytes are not canonical/);

        const filenameMismatch = createP000Fixture();
        const mismatchRendered = await renderDispatchReceipt({ root: filenameMismatch, waveId: "BI.W-P001", plan: dispatchPlan() });
        installDispatchBytes(filenameMismatch, "BI.W-P001", mismatchRendered.bytes, "0".repeat(64));
        await expect(validateCursor({ root: filenameMismatch })).rejects.toThrow(/filename does not bind raw receipt bytes/);

        for (const [label, mutate] of [
            ["formation", (receipt: any) => { receipt.formationDigest = "0".repeat(64); }],
            ["source", (receipt: any) => { receipt.sourceBase = "0".repeat(40); }],
            ["routing", (receipt: any) => { receipt.routingPolicySha256 = "0".repeat(64); }],
            ["base-commit", (receipt: any) => { receipt.base.commit = "0".repeat(40); }],
        ] as const) {
            const root = createP000Fixture();
            const rendered = await renderDispatchReceipt({
                root,
                waveId: "BI.W-P001",
                plan: dispatchPlan({ laneId: `mutated-${label}` }),
            });
            const receipt = structuredClone(rendered.receipt);
            mutate(receipt);
            installDispatchBytes(root, "BI.W-P001", prettyCanonicalFixture(receipt));
            await expect(validateCursor({ root })).rejects.toThrow();
        }

        for (const [label, mutate] of [
            ["tree", (receipt: any) => { receipt.base.tree = "0".repeat(40); }],
            ["parent", (receipt: any) => {
                receipt.integrationParent = "0".repeat(40);
                receipt.base.commit = receipt.integrationParent;
                receipt.base.tree = "0".repeat(40);
            }],
        ] as const) {
            const root = createP000Fixture();
            const rendered = await renderDispatchReceipt({
                root,
                waveId: "BI.W-P001",
                plan: dispatchPlan({ laneId: `wrong-${label}` }),
            });
            const receipt = structuredClone(rendered.receipt);
            mutate(receipt);
            installDispatchBytes(root, "BI.W-P001", prettyCanonicalFixture(receipt));
            const result = await validateCursor({ root });
            expect(result.ok).toBe(false);
            expect(result.errors.join("\n")).toMatch(/base tree is stale|integration parent is not one readable commit|unattached dispatch receipt/);
        }
    }, 180_000);
});

describe("receipt and trailer tuple recovery", () => {
    it("keeps P000 receipt/trailer remove, duplicate, and alter variants RED", async () => {
        const root = createP000Fixture();
        const originalMessage = output(root, ["show", "-s", "--format=%B", P000]) + "\n";
        const originalTree = output(root, ["show", "-s", "--format=%T", P000]);

        git(root, ["read-tree", P000]);
        git(root, ["update-index", "--force-remove", "docs/tranches/BI/BOOTSTRAP.json"]);
        setHead(root, commitTree(root, output(root, ["write-tree"]), FORMATION_ANCHOR, originalMessage));
        await expectRecoveryRed(root);

        setHead(root, P000);
        const duplicateMessage = `${originalMessage.trimEnd()}\nBI-Wave: BI.W-P000\n`;
        setHead(root, commitTree(root, originalTree, FORMATION_ANCHOR, duplicateMessage));
        await expectRecoveryRed(root);

        setHead(root, P000);
        const altered = JSON.parse(String(git(root, ["show", `${P000}:docs/tranches/BI/BOOTSTRAP.json`]).stdout));
        altered.evidenceDigest = "0".repeat(64);
        replaceIndexBlob(root, "docs/tranches/BI/BOOTSTRAP.json", `${JSON.stringify(altered, null, 2)}\n`);
        setHead(root, commitTree(root, output(root, ["write-tree"]), FORMATION_ANCHOR, originalMessage));
        await expectRecoveryRed(root);
    }, 60_000);

    it("keeps P001 receipt/trailer remove, duplicate, alter, and selected-lineage replay variants RED", async () => {
        const root = cloneTerminalFixture();
        const valid = output(root, ["rev-parse", "HEAD"]);
        const message = output(root, ["show", "-s", "--format=%B", valid]) + "\n";
        const tree = output(root, ["show", "-s", "--format=%T", valid]);

        git(root, ["read-tree", valid]);
        git(root, ["update-index", "--force-remove", P001_RECEIPT]);
        setHead(root, commitTree(root, output(root, ["write-tree"]), P000, message));
        await expectRecoveryRed(root);

        setHead(root, valid);
        setHead(root, commitTree(root, tree, P000, `${message.trimEnd()}\nBI-Status: DONE\n`));
        await expectRecoveryRed(root);

        setHead(root, valid);
        const receipt = JSON.parse(String(git(root, ["show", `${valid}:${P001_RECEIPT}`]).stdout));
        receipt.evidence.entries[0].sha256 = "0".repeat(64);
        replaceIndexBlob(root, P001_RECEIPT, `${JSON.stringify(receipt, null, 2)}\n`);
        setHead(root, commitTree(root, output(root, ["write-tree"]), P000, message));
        await expectRecoveryRed(root);

        setHead(root, valid);
        setHead(root, commitTree(root, tree, valid, message));
        await expectRecoveryRed(root);
    }, 60_000);

    it("keeps P000 globally unique while unrelated P001 topic refs do not poison the selected lineage", async () => {
        const p000Root = createP000Fixture();
        const p000Tree = output(p000Root, ["show", "-s", "--format=%T", P000]);
        const p000Message = output(p000Root, ["show", "-s", "--format=%B", P000]) + "\n";
        const duplicateP000 = commitTree(p000Root, p000Tree, FORMATION_ANCHOR, p000Message);
        git(p000Root, ["update-ref", "refs/heads/duplicate-p000", duplicateP000]);
        await expectRecoveryRed(p000Root);

        const root = cloneTerminalFixture();
        const valid = output(root, ["rev-parse", "HEAD"]);
        const topic = commitTree(
            root,
            output(root, ["show", "-s", "--format=%T", valid]),
            P000,
            output(root, ["show", "-s", "--format=%B", valid]) + "\n",
        );
        git(root, ["update-ref", "refs/heads/stale-topic", topic]);
        expect((await recoverCursor({ root, readOnly: true })).cursor.waves["BI.W-P001"].commit).toBe(valid);
    }, 60_000);

    it("parses only the final sanitized trailer block and rejects duplicate or unknown BI identities", () => {
        const bodySpoof = [
            "Subject",
            "",
            "BI-Wave: BI.W-P999 is prose, not authority.",
            "More body prose follows.",
            "",
            "BI-Wave: BI.W-P001",
            "BI-Status: DONE",
            "BI-Receipt-SHA256: " + "a".repeat(64),
            "BI-Formation-SHA256: " + "b".repeat(64),
            "",
        ].join("\n");
        expect(parseCommitTrailers(bodySpoof).trailers.get("BI-Wave")).toBe("BI.W-P001");
        expect(parseCommitTrailers(`${bodySpoof}BI-Wave: BI.W-P001\n`).duplicates).toContain("BI-Wave");
        expect(parseCommitTrailers(`${bodySpoof}BI-Unknown: value\n`).unexpected).toContain("BI-Unknown");
    });
});

describe("formation graph and schema authority", () => {
    it("derives contiguous Kahn strata/batches and rejects status or receipt-path self-consistency tricks", () => {
        const formation = readFormation();
        expect(validateFormationGraph(formation)).toEqual({ ok: true, errors: [] });

        const inflated = structuredClone(formation);
        const wave = inflated.waves.waves.find((row: any) => row.id === "BI.W-P127");
        const node = inflated.dag.nodes.find((row: any) => row.id === "BI.W-P127");
        const old = inflated.dag.strata.find((row: any) => row.waves.includes("BI.W-P127"));
        old.waves = old.waves.filter((id: string) => id !== "BI.W-P127");
        old.width = old.waves.length;
        old.resourceSafeLaunchBatches = old.resourceSafeLaunchBatches.map((batch: string[]) => batch.filter((id) => id !== "BI.W-P127")).filter((batch: string[]) => batch.length > 0);
        wave.topologicalStratum = 99;
        wave.band = "BI.S99";
        node.stratum = "BI.S99";
        inflated.dag.strata.push({ id: "BI.S99", index: 99, width: 1, waves: ["BI.W-P127"], maxLiveAgents: 3, resourceSafeLaunchBatches: [["BI.W-P127"]] });
        inflated.dag.stratumCount = inflated.dag.strata.length;
        expect(validateFormationGraph(inflated).ok).toBe(false);

        const done = structuredClone(formation);
        done.waves.waves[1].status = "DONE";
        done.dag.nodes[1].status = "DONE";
        expect(validateFormationGraph(done).errors.join("\n")).toContain("must be PLANNED");

        const duplicateReceipt = structuredClone(formation);
        duplicateReceipt.waves.waves[2].receiptPath = duplicateReceipt.waves.waves[1].receiptPath;
        expect(validateFormationGraph(duplicateReceipt).errors.join("\n")).toMatch(/receiptPath/);
    });

    it("keeps cursor schema/runtime on runningWaves without magic wave-count ceilings", () => {
        const schema = JSON.parse(readFileSync(join(SOURCE_TREE, "scripts/tranche/cursor-schema.json"), "utf8"));
        expect(schema.required).toContain("runningWaves");
        expect(schema.required).not.toContain("runningWave");
        expect(schema.properties.runningWaves.maxItems).toBe(3);
        expect(schema.properties.waves.minProperties).toBe(1);
        expect(schema.properties.terminalCount.maximum).toBeUndefined();
    });
});

describe("authority-derived selected-view semantic execution", () => {
    it("derives only surviving ordinary tests and excludes tests-visual or deleted subjects", () => {
        expect(ordinaryWaveTestPaths({
            id: "BI.W-P099",
            subjects: [
                { path: "tests/zeta.spec.ts", action: "repair" },
                { path: "tests/alpha.test.ts", action: "create" },
                { path: "tests/deleted.test.ts", action: "delete" },
                { path: "tests-visual/not-ordinary.spec.ts", action: "repair" },
                { path: "src/not-a-test.ts", action: "modify" },
            ],
        })).toEqual(["tests/alpha.test.ts", "tests/zeta.spec.ts"]);
    });

    it("rejects missing, failing, skipped, non-enrolled, vacuous, and forged Vitest reports", () => {
        const testPaths = ["tests/alpha.test.ts", "tests/zeta.spec.ts"];
        const valid = canonicalPassReport(testPaths);
        expect(validateWaveSemanticReport({ waveId: "BI.W-P003", testPaths, exitCode: 0, report: valid }).files.map((row: any) => row.path)).toEqual(testPaths);

        const missing = canonicalPassReport(testPaths.slice(0, 1));
        expect(() => validateWaveSemanticReport({ waveId: "BI.W-P003", testPaths, exitCode: 0, report: missing })).toThrow(/cover every enrolled file/);

        const failing = canonicalPassReport(testPaths);
        failing.success = false;
        failing.numPassedTests = 1;
        failing.numFailedTests = 1;
        failing.testResults[1].status = "failed";
        failing.testResults[1].assertionResults[0].status = "failed";
        expect(() => validateWaveSemanticReport({ waveId: "BI.W-P003", testPaths, exitCode: 1, report: failing })).toThrow(/semantic tests are RED/);

        const skipped = canonicalPassReport(testPaths);
        skipped.numPassedTests = 1;
        skipped.numPendingTests = 1;
        skipped.testResults[1].assertionResults[0].status = "skipped";
        expect(() => validateWaveSemanticReport({ waveId: "BI.W-P003", testPaths, exitCode: 0, report: skipped })).toThrow(/zero failed\/pending\/todo/);

        const nonEnrolled = canonicalPassReport([...testPaths, "tests/foreign.test.ts"]);
        expect(() => validateWaveSemanticReport({ waveId: "BI.W-P003", testPaths, exitCode: 0, report: nonEnrolled })).toThrow(/unenrolled or ambiguous/);

        const vacuous = canonicalPassReport([testPaths[0]]);
        vacuous.numTotalTests = 0;
        vacuous.numPassedTests = 0;
        vacuous.testResults[0].assertionResults = [];
        expect(() => validateWaveSemanticReport({ waveId: "BI.W-P003", testPaths: [testPaths[0]], exitCode: 0, report: vacuous })).toThrow(/must execute non-skipped assertions/);

        const forged = canonicalPassReport(testPaths);
        forged.numPassedTests = 1;
        expect(() => validateWaveSemanticReport({ waveId: "BI.W-P003", testPaths, exitCode: 0, report: forged })).toThrow(/aggregate counters contradict/);
    });

    it("keeps zero-test handoff unreachable before P014 and structured RED after a transitive P014 completion", async () => {
        const formation = readFormation();
        const wave = formation.waves.waves.find((row: any) => row.id === "BI.W-P017");
        const beforeP014 = { waves: { "BI.W-P014": { status: "PLANNED" } } };
        await expect(executeWaveSemanticTests({
            root: SOURCE_TREE,
            wave,
            view: "commit",
            ref: "HEAD",
            cursor: beforeP014,
            formation,
        })).rejects.toThrow(/forbidden before BI\.W-P014/);

        const afterP014 = { waves: { "BI.W-P014": { status: "DONE" } } };
        const marker = await executeWaveSemanticTests({
            root: SOURCE_TREE,
            wave,
            view: "commit",
            ref: "HEAD",
            cursor: afterP014,
            formation,
        });
        expect(marker).toMatchObject({
            status: "RED",
            semanticPass: false,
            mode: "POST_P014_DISCOVERY_REQUIRED",
            owner: "BI.W-P014",
            waveId: "BI.W-P017",
            errorCode: "BI_POST_STRUCTURE_DISCOVERY_REQUIRED",
        });
        expect(semanticRequirementErrors(marker)).toEqual(["BI_POST_STRUCTURE_DISCOVERY_REQUIRED"]);
    });

    it("executes exact staged and committed P002, P003, and P004 authority tests in isolated runtimes", async () => {
        const root = cloneTerminalFixture();
        linkFixtureNodeModules(root);
        const cases = [
            ["BI.W-P002", {
                "tests/tranche/release-projection.test.ts": semanticFixtureSource("P002 selected release projection"),
            }],
            ["BI.W-P003", {
                "tests/tranche/canon-conformance.test.ts": semanticFixtureSource("P003 selected canon conformance"),
            }],
            ["BI.W-P004", {
                "tests/constellation/handshake.test.ts": semanticFixtureSource("P004 selected handshake"),
                "tests/constellation/snapshot-worktree.test.ts": semanticFixtureSource("P004 selected worktree snapshot"),
            }],
        ] as const;
        for (const [waveId, testSources] of cases) {
            await startWave({ root, waveId });
            const candidate = await stageSyntheticWaveCandidate(root, waveId, testSources);
            mkdirSync(dirname(join(root, RELEASE_PROJECTION_MODULE)), { recursive: true });
            mkdirSync(dirname(join(root, CONTINUOUS_PROJECTIONS[0])), { recursive: true });
            writeFileSync(join(root, RELEASE_PROJECTION_MODULE), "throw new Error('unstaged module poison');\n");
            writeFileSync(join(root, CONTINUOUS_PROJECTIONS[0]), "unstaged attestation poison\n");
            writeFileSync(join(root, CONTINUOUS_PROJECTIONS[1]), "unstaged FINAL poison\n");
            const staged = await verifyRecoveredState({ root, waveId, ref: "HEAD", trailerMessage: candidate.message });
            expect(staged.status, staged.errors.join("\n")).toBe("PASS");
            expect(staged.evidence?.selectedView).toBe("index");
            expect(staged.evidence?.semanticTest?.baseline.files.map((row: any) => row.path)).toEqual(candidate.testPaths);
            expect(staged.evidence?.semanticTest?.argv.filter((value: string) => value.startsWith("tests/"))).toEqual(candidate.testPaths);
            expect(staged.evidence?.semanticTest?.isolation).toEqual({
                HOME: ".bi-wave-test-runtime/home",
                TMPDIR: ".bi-wave-test-runtime/tmp",
                XDG_CACHE_HOME: ".bi-wave-test-runtime/cache",
            });
            expect(staged.evidence?.releaseProjection).toMatchObject({
                status: "PASS",
                exitCode: 0,
                errors: [],
                evidence: {
                    authority: "BI_RELEASE_PROJECTION_V1",
                    waveId,
                    selectedView: "index",
                    projectionStatus: "NONTERMINAL_PROJECTION",
                    releaseEligible: false,
                },
            });

            const parent = output(root, ["rev-parse", "HEAD"]);
            const commit = commitTree(root, output(root, ["write-tree"]), parent, candidate.message);
            setHead(root, commit);
            const committed = await verifyRecoveredState({ root, waveId, ref: "HEAD" });
            expect(committed.status, committed.errors.join("\n")).toBe("PASS");
            expect(committed.evidence?.selectedView).toBe("commit");
            expect(committed.evidence?.semanticTest?.baseline.files.map((row: any) => row.path)).toEqual(candidate.testPaths);
            expect(committed.evidence?.releaseProjection).toMatchObject({
                status: "PASS",
                exitCode: 0,
                errors: [],
                evidence: { waveId, selectedView: "commit" },
            });
            await integrateWave({ root, waveId, commit });
            await terminalizeWave({ root, waveId, commit, status: "DONE" });
        }
    }, 900_000);

    it("keeps P001 explicitly pre-module and validates the exact four-key projection adapter contract", async () => {
        const p001Root = cloneTerminalFixture();
        const p001Recovered = await recoverCursor({ root: p001Root, readOnly: true });
        const p001 = p001Recovered.formation.waves.waves.find((row: any) => row.id === "BI.W-P001");
        const preModule = await executeReleaseProjectionAdapter({
            root: p001Root,
            wave: p001,
            view: "commit",
            ref: "HEAD",
            profile: "ci",
        });
        expect(preModule).toMatchObject({
            status: "PRE_MODULE",
            exitCode: null,
            errors: [],
            evidence: {
                waveId: "BI.W-P001",
                projectionMode: "NONE",
                owner: "BI.W-P002",
                modulePath: RELEASE_PROJECTION_MODULE,
            },
        });
        expect(git(p001Root, ["cat-file", "-e", `HEAD:${RELEASE_PROJECTION_MODULE}`], { allowFailure: true }).status).not.toBe(0);

        for (const path of [RELEASE_PROJECTION_MODULE, ...CONTINUOUS_PROJECTIONS]) {
            replaceIndexBlob(p001Root, path, `P001 forbidden projection smuggling: ${path}\n`);
        }
        await expect(executeReleaseProjectionAdapter({
            root: p001Root,
            wave: p001,
            view: "index",
            ref: "HEAD",
            profile: "ci",
        })).rejects.toThrow(/pre-module selected view must not contain/);
        const smuggledCommit = commitTree(
            p001Root,
            output(p001Root, ["write-tree"]),
            output(p001Root, ["rev-parse", "HEAD"]),
            "test(BI.W-P001): attempt forbidden projection smuggling\n",
        );
        setHead(p001Root, smuggledCommit);
        await expect(executeReleaseProjectionAdapter({
            root: p001Root,
            wave: p001,
            view: "commit",
            ref: "HEAD",
            profile: "ci",
        })).rejects.toThrow(/pre-module selected view must not contain/);

        const root = cloneTerminalFixture();
        linkFixtureNodeModules(root);
        const candidate = await stageSyntheticWaveCandidate(root, "BI.W-P002", {
            "tests/tranche/release-projection.test.ts": semanticFixtureSource("projection adapter contract"),
        });
        const valid = await executeReleaseProjectionAdapter({ root, wave: candidate.wave, view: "index", ref: "HEAD", profile: "ci" });
        expect(Object.keys(valid)).toEqual(["status", "exitCode", "errors", "evidence"]);
        expect(valid).toMatchObject({
            status: "PASS",
            exitCode: 0,
            errors: [],
            evidence: {
                waveId: "BI.W-P002",
                selectedView: "index",
                profile: "ci",
                requireTerminal: false,
                ownerArgv: ["node", "scripts/verify.mjs", "--state", "auto", "--wave", "BI.W-P002"],
            },
        });

        for (const mode of ["100755", "120000"] as const) {
            replaceIndexMode(root, RELEASE_PROJECTION_MODULE, mode);
            await expect(executeReleaseProjectionAdapter({
                root,
                wave: candidate.wave,
                view: "index",
                ref: "HEAD",
                profile: "ci",
            })).rejects.toThrow(/release projection module must be one regular nonexecutable Git blob/);
            replaceIndexMode(root, RELEASE_PROJECTION_MODULE, "100644");
        }
        const selectedAuthority = await recoverCursor({ root, at: "HEAD", readOnly: true });
        for (const mode of ["100755", "120000"] as const) {
            replaceIndexMode(root, candidate.testPaths[0], mode);
            await expect(executeWaveSemanticTests({
                root,
                wave: candidate.wave,
                view: "index",
                ref: "HEAD",
                cursor: selectedAuthority.cursor,
                formation: selectedAuthority.formation,
            })).rejects.toThrow(/selected semantic authority must be one regular nonexecutable Git blob/);
            replaceIndexMode(root, candidate.testPaths[0], "100644");
        }
        replaceIndexBlob(root, ".gitattributes", [
            `${RELEASE_PROJECTION_MODULE} export-ignore export-subst filter=poison eol=crlf`,
            `${candidate.testPaths[0]} export-ignore export-subst filter=poison text eol=crlf`,
            "",
        ].join("\n"));
        const attributedIndex = await executeReleaseProjectionAdapter({ root, wave: candidate.wave, view: "index", ref: "HEAD", profile: "ci" });
        expect(attributedIndex.status).toBe("PASS");
        const attributedIndexTests = await executeWaveSemanticTests({
            root,
            wave: candidate.wave,
            view: "index",
            ref: "HEAD",
            cursor: selectedAuthority.cursor,
            formation: selectedAuthority.formation,
        });
        expect(attributedIndexTests.baseline.success).toBe(true);
        const attributedCommit = commitTree(
            root,
            output(root, ["write-tree"]),
            output(root, ["rev-parse", "HEAD"]),
            "test: prove raw selected bytes ignore Git attribute transforms\n",
        );
        const attributedTree = await executeReleaseProjectionAdapter({ root, wave: candidate.wave, view: "commit", ref: attributedCommit, profile: "ci" });
        expect(attributedTree.status).toBe("PASS");
        const attributedTreeTests = await executeWaveSemanticTests({
            root,
            wave: candidate.wave,
            view: "commit",
            ref: attributedCommit,
            cursor: selectedAuthority.cursor,
            formation: selectedAuthority.formation,
        });
        expect(attributedTreeTests.baseline.success).toBe(true);
        git(root, ["update-index", "--force-remove", ".gitattributes"]);

        const workspacePackagePath = "tests-visual/package.json";
        const selectedWorkspacePackage = selectedIndexBytes(root, workspacePackagePath)!;
        const selectedWorkspaceTest = selectedIndexBytes(root, candidate.testPaths[0])!;
        const workspacePackage = JSON.parse(selectedWorkspacePackage.toString("utf8"));
        workspacePackage.biSelectedViewMarker = true;
        replaceIndexBlob(root, workspacePackagePath, `${JSON.stringify(workspacePackage, null, 2)}\n`);
        replaceIndexBlob(root, candidate.testPaths[0], [
            'import { readFileSync, realpathSync } from "node:fs";',
            'import { resolve } from "node:path";',
            'import { expect, it } from "vitest";',
            'it("rebinds workspace dependency to selected bytes", () => {',
            '    const dependency = realpathSync("node_modules/@mkbabb/glass-ui-tests-visual");',
            '    expect(dependency).toBe(realpathSync("tests-visual"));',
            '    expect(JSON.parse(readFileSync(resolve(dependency, "package.json"), "utf8")).biSelectedViewMarker).toBe(true);',
            '});',
            '',
        ].join("\n"));
        try {
            const workspaceRebound = await executeWaveSemanticTests({
                root,
                wave: candidate.wave,
                view: "index",
                ref: "HEAD",
                cursor: selectedAuthority.cursor,
                formation: selectedAuthority.formation,
            });
            expect(workspaceRebound.baseline.success).toBe(true);
            expect(JSON.parse(readFileSync(join(SOURCE_TREE, workspacePackagePath), "utf8")).biSelectedViewMarker).not.toBe(true);
        } finally {
            replaceIndexBlob(root, workspacePackagePath, selectedWorkspacePackage);
            replaceIndexBlob(root, candidate.testPaths[0], selectedWorkspaceTest);
        }

        replaceIndexBlob(root, candidate.testPaths[0], [
            'import { writeFileSync } from "node:fs";',
            'import { fileURLToPath } from "node:url";',
            'import { expect, it } from "vitest";',
            'it("mutates its selected materialized source", () => { writeFileSync(fileURLToPath(import.meta.url), "materialized poison"); expect(true).toBe(true); });',
            "",
        ].join("\n"));
        let semanticRecomputationError: any = null;
        try {
            await executeWaveSemanticTests({
                root,
                wave: candidate.wave,
                view: "index",
                ref: "HEAD",
                cursor: selectedAuthority.cursor,
                formation: selectedAuthority.formation,
            });
        } catch (error) {
            semanticRecomputationError = error;
        }
        expect(semanticRecomputationError).toMatchObject({
            code: "BI_WAVE_TEST_RED",
            cause: {
                code: "BI_SELECTED_VIEW_RED",
                message: "selected materialization path/type/fingerprint changed during execution",
            },
        });
        expect(semanticRecomputationError.message).toContain(
            "prevented exact recomputation (cause: BI_SELECTED_VIEW_RED: selected materialization path/type/fingerprint changed during execution)",
        );
        expect(semanticRecomputationError.message).not.toMatch(/[\x00-\x1f\x7f]/);
        expect(semanticRecomputationError.message).not.toContain(tmpdir());
        expect(semanticRecomputationError.cause.message.length).toBeLessThanOrEqual(2048);

        replaceIndexBlob(root, candidate.testPaths[0], [
            'import { writeFileSync } from "node:fs";',
            'import { expect, it } from "vitest";',
            `it("mutates authority then fails", () => { writeFileSync(${JSON.stringify(join(root, "semantic-authority-poison"))}, "poison"); expect(true).toBe(false); });`,
            "",
        ].join("\n"));
        await expect(executeWaveSemanticTests({
            root,
            wave: candidate.wave,
            view: "index",
            ref: "HEAD",
            cursor: selectedAuthority.cursor,
            formation: selectedAuthority.formation,
        })).rejects.toThrow(/semantic test mutated repository refs, dependency boundary, selected inventory, worktree\/index state, or Git-private tranche state/);
        rmSync(join(root, "semantic-authority-poison"), { force: true });
        replaceIndexBlob(root, candidate.testPaths[0], semanticFixtureSource("projection adapter contract"));

        for (const mode of ["missing-export", "malformed", "extra", "stale", "wrong-wave", "wrong-view", "wrong-ref", "wrong-profile", "bad-exit", "console-output", "throw"] as const) {
            replaceIndexBlob(root, RELEASE_PROJECTION_MODULE, releaseProjectionFixtureSource(mode));
            await expect(executeReleaseProjectionAdapter({
                root,
                wave: candidate.wave,
                view: "index",
                ref: "HEAD",
                profile: "ci",
            })).rejects.toThrow();
        }

        replaceIndexBlob(root, RELEASE_PROJECTION_MODULE, releaseProjectionFixtureSource("nonzero"));
        const nonzero = await executeReleaseProjectionAdapter({ root, wave: candidate.wave, view: "index", ref: "HEAD", profile: "ci" });
        expect(nonzero).toMatchObject({ status: "RED", exitCode: 1, errors: ["synthetic projection forced RED"] });

        git(root, ["update-index", "--force-remove", RELEASE_PROJECTION_MODULE]);
        await expect(executeReleaseProjectionAdapter({
            root,
            wave: candidate.wave,
            view: "index",
            ref: "HEAD",
            profile: "ci",
        })).rejects.toThrow(/release projection module must be one regular nonexecutable Git blob/);

        replaceIndexBlob(root, RELEASE_PROJECTION_MODULE, releaseProjectionFixtureSource());
        replaceIndexBlob(root, CONTINUOUS_PROJECTIONS[0], "arbitrary but raw-digest-bound attestation\n");
        replaceIndexBlob(root, CONTINUOUS_PROJECTIONS[1], "arbitrary but raw-digest-bound FINAL\n");
        const drift = await executeReleaseProjectionAdapter({ root, wave: candidate.wave, view: "index", ref: "HEAD", profile: "ci" });
        expect(drift).toMatchObject({ status: "RED", exitCode: 1 });
        expect(drift.errors.join("\n")).toMatch(/byte parity drift/);

        replaceIndexBlob(root, CONTINUOUS_PROJECTIONS[0], `${JSON.stringify({ fixture: "BI.W-P002" }, null, 2)}\n`);
        replaceIndexBlob(root, CONTINUOUS_PROJECTIONS[1], "# BI.W-P002 synthetic projection\n");
        const terminal = await executeReleaseProjectionAdapter({
            root,
            wave: candidate.wave,
            view: "index",
            ref: "HEAD",
            profile: "release",
            requireTerminal: true,
        });
        expect(terminal).toMatchObject({
            status: "RED",
            exitCode: 1,
            evidence: {
                profile: "release",
                requireTerminal: true,
                ownerArgv: ["node", "scripts/verify.mjs", "--state", "auto", "--profile", "release", "--require-terminal"],
            },
        });
        expect(terminal.errors).toContain("synthetic projection is nonterminal");

        replaceIndexBlob(root, RELEASE_PROJECTION_MODULE, releaseProjectionFixtureSource("mutate-materialized"));
        let releaseRecomputationError: any = null;
        try {
            await executeReleaseProjectionAdapter({
                root,
                wave: candidate.wave,
                view: "index",
                ref: "HEAD",
                profile: "ci",
            });
        } catch (error) {
            releaseRecomputationError = error;
        }
        expect(releaseRecomputationError).toMatchObject({
            code: "BI_RELEASE_PROJECTION_RED",
            cause: {
                code: "BI_SELECTED_VIEW_RED",
                message: "selected materialization path/type/fingerprint changed during execution",
            },
        });
        expect(releaseRecomputationError.message).toContain(
            "prevented exact post-execution recomputation (cause: BI_SELECTED_VIEW_RED: selected materialization path/type/fingerprint changed during execution)",
        );
        expect(releaseRecomputationError.message).not.toMatch(/[\x00-\x1f\x7f]/);
        expect(releaseRecomputationError.message).not.toContain(tmpdir());
        expect(releaseRecomputationError.cause.message.length).toBeLessThanOrEqual(2048);

        for (const mode of ["extra-materialized", "delete-boundaries"] as const) {
            replaceIndexBlob(root, RELEASE_PROJECTION_MODULE, releaseProjectionFixtureSource(mode));
            await expect(executeReleaseProjectionAdapter({
                root,
                wave: candidate.wave,
                view: "index",
                ref: "HEAD",
                profile: "ci",
            })).rejects.toThrow(/mutated selected materialization or repository state/);
        }

        const fixtureNodeModules = join(root, "node_modules");
        const outerNodeModules = join(SOURCE_TREE, "node_modules");
        for (const mode of ["mutate-worktree", "mutate-then-throw", "mutate-ref", "mutate-git-private", "mutate-node-modules"] as const) {
            const originalNodeModulesTarget = mode === "mutate-node-modules" ? readlinkSync(fixtureNodeModules) : null;
            const outerBoundaryBefore = originalNodeModulesTarget === null
                ? null
                : statSync(outerNodeModules, { bigint: true });
            if (originalNodeModulesTarget !== null) {
                rmSync(fixtureNodeModules, { recursive: true, force: true });
                mkdirSync(fixtureNodeModules, { recursive: true });
                const innerMetadata = lstatSync(fixtureNodeModules);
                expect(innerMetadata.isDirectory()).toBe(true);
                expect(innerMetadata.isSymbolicLink()).toBe(false);
            }
            let mutationError: any = null;
            try {
                replaceIndexBlob(root, RELEASE_PROJECTION_MODULE, releaseProjectionFixtureSource(mode));
                await executeReleaseProjectionAdapter({
                    root,
                    wave: candidate.wave,
                    view: "index",
                    ref: "HEAD",
                    profile: "ci",
                });
            } catch (error) {
                mutationError = error;
            } finally {
                rmSync(join(root, "synthetic-release-projection-poison"), { force: true });
                git(root, ["update-ref", "-d", "refs/codex/projection-poison"], { allowFailure: true });
                rmSync(join(gitPrivatePaths(root).base, "projection-poison"), { force: true });
                if (originalNodeModulesTarget !== null) {
                    rmSync(join(fixtureNodeModules, ".bi-dependency-boundary-probe"), { force: true });
                    rmSync(fixtureNodeModules, { recursive: true, force: true });
                    symlinkSync(originalNodeModulesTarget, fixtureNodeModules, "dir");
                }
            }
            expect(mutationError?.message).toMatch(/mutated repository refs, dependency boundary, worktree\/index state, or Git-private tranche state/);
            if (outerBoundaryBefore !== null) {
                expect(mutationError.message).toMatch(/NODE_MODULES/);
                expect(mutationError.message).toMatch(/\.:.*mtimeNs.*ctimeNs/);
                const outerBoundaryAfter = statSync(outerNodeModules, { bigint: true });
                expect({ mtimeNs: outerBoundaryAfter.mtimeNs, ctimeNs: outerBoundaryAfter.ctimeNs }).toEqual({
                    mtimeNs: outerBoundaryBefore.mtimeNs,
                    ctimeNs: outerBoundaryBefore.ctimeNs,
                });
                expect(readlinkSync(fixtureNodeModules)).toBe(originalNodeModulesTarget);
            }
        }
    }, 900_000);

    it("rejects premature terminal projections in both staged and committed selected cursors", async () => {
        const root = cloneTerminalFixture();
        linkFixtureNodeModules(root);
        await startWave({ root, waveId: "BI.W-P002" });
        const candidate = await stageSyntheticWaveCandidate(root, "BI.W-P002", {
            "tests/tranche/release-projection.test.ts": semanticFixtureSource("P002 premature terminal projection"),
            [RELEASE_PROJECTION_MODULE]: releaseProjectionFixtureSource("early-terminal"),
        });
        const staged = await verifyRecoveredState({ root, waveId: "BI.W-P002", ref: "HEAD", trailerMessage: candidate.message });
        expect(staged.status).toBe("RED");
        expect(staged.errors).toContain("terminal release projection contradicts the selected recovered cursor state");
        const stagedRelease = await verifyRecoveredState({
            root,
            waveId: "BI.W-P002",
            ref: "HEAD",
            trailerMessage: candidate.message,
            profile: "release",
            requireTerminal: true,
        });
        expect(stagedRelease.status).toBe("RED");
        expect(stagedRelease.errors).toContain("terminal release requires exact-HEAD release projection verification");

        const commit = commitTree(root, output(root, ["write-tree"]), output(root, ["rev-parse", "HEAD"]), candidate.message);
        setHead(root, commit);
        const committed = await verifyRecoveredState({ root, waveId: "BI.W-P002", ref: "HEAD" });
        expect(committed.status).toBe("RED");
        expect(committed.errors).toContain("terminal release projection contradicts the selected recovered cursor state");
        const descendant = commitTree(root, output(root, ["write-tree"]), commit, "test: advance HEAD beyond selected release ref\n");
        setHead(root, descendant);
        const historicalRelease = await verifyRecoveredState({
            root,
            waveId: "BI.W-P002",
            ref: commit,
            profile: "release",
            requireTerminal: true,
        });
        expect(historicalRelease.status).toBe("RED");
        expect(historicalRelease.errors).toContain("terminal release requires exact-HEAD release projection verification");
    }, 120_000);

    it("verifies staged and committed post-P002 DEAD through the current adapter while skipping semantics and locking dependents", async () => {
        const root = cloneTerminalFixture();
        linkFixtureNodeModules(root);
        await startWave({ root, waveId: "BI.W-P002" });
        const p002 = await stageSyntheticWaveCandidate(root, "BI.W-P002", {
            "tests/tranche/release-projection.test.ts": semanticFixtureSource("P002 installs the projection adapter"),
        });
        const p002Commit = commitTree(root, output(root, ["write-tree"]), output(root, ["rev-parse", "HEAD"]), p002.message);
        setHead(root, p002Commit);
        await integrateWave({ root, waveId: "BI.W-P002", commit: p002Commit });
        await terminalizeWave({ root, waveId: "BI.W-P002", commit: p002Commit, status: "DONE" });

        await startWave({ root, waveId: "BI.W-P003" });
        const candidate = await stageSyntheticDeadCandidate(root, "BI.W-P003");
        const staged = await verifyRecoveredState({ root, waveId: "BI.W-P003", ref: "HEAD", trailerMessage: candidate.message });
        expect(staged.status, staged.errors.join("\n")).toBe("PASS");
        expect(staged.evidence?.semanticTest).toBeNull();
        expect(staged.evidence?.releaseProjection).toMatchObject({
            status: "PASS",
            evidence: { waveId: "BI.W-P003", selectedView: "index", projectionStatus: "NONTERMINAL_PROJECTION" },
        });

        replaceIndexBlob(root, CONTINUOUS_PROJECTIONS[0], "post-P002 DEAD projection drift\n");
        const drift = await verifyRecoveredState({
            root,
            waveId: "BI.W-P003",
            ref: "HEAD",
            trailerMessage: refreshProjectionTrailerDigests(root, candidate.message),
        });
        expect(drift.status).toBe("RED");
        expect(drift.errors.join("\n")).toMatch(/release attestation byte parity drift/);
        replaceIndexBlob(root, CONTINUOUS_PROJECTIONS[0], `${JSON.stringify({ fixture: "BI.W-P003" }, null, 2)}\n`);

        const commit = commitTree(root, output(root, ["write-tree"]), output(root, ["rev-parse", "HEAD"]), candidate.message);
        setHead(root, commit);
        const committed = await verifyRecoveredState({ root, waveId: "BI.W-P003", ref: "HEAD" });
        expect(committed.status, committed.errors.join("\n")).toBe("PASS");
        expect(committed.evidence?.semanticTest).toBeNull();
        expect(committed.evidence?.releaseProjection).toMatchObject({
            status: "PASS",
            evidence: { waveId: "BI.W-P003", selectedView: "commit" },
        });
        await integrateWave({ root, waveId: "BI.W-P003", commit });
        await terminalizeWave({ root, waveId: "BI.W-P003", commit, status: "DEAD" });

        const terminal = await recoverCursor({ root, at: "HEAD", readOnly: true });
        const dependent = terminal.formation.waves.waves.find((wave: any) => wave.dependsOn.includes("BI.W-P003"));
        expect(dependent).toBeTruthy();
        await expect(startWave({ root, waveId: dependent.id })).rejects.toThrow(/launch dependency BI\.W-P003 is not DONE/);
    }, 180_000);

    it("rejects arbitrary projections even when staged trailers bind their raw bytes", async () => {
        const root = cloneTerminalFixture();
        linkFixtureNodeModules(root);
        await startWave({ root, waveId: "BI.W-P002" });
        const candidate = await stageSyntheticWaveCandidate(root, "BI.W-P002", {
            "tests/tranche/release-projection.test.ts": semanticFixtureSource("P002 raw binding is insufficient"),
        });
        replaceIndexBlob(root, CONTINUOUS_PROJECTIONS[0], "arbitrary attestation with a matching trailer digest\n");
        replaceIndexBlob(root, CONTINUOUS_PROJECTIONS[1], "arbitrary FINAL with a matching trailer digest\n");
        const message = refreshProjectionTrailerDigests(root, candidate.message);
        const verified = await verifyRecoveredState({ root, waveId: "BI.W-P002", ref: "HEAD", trailerMessage: message });
        expect(verified.status).toBe("RED");
        expect(verified.errors.join("\n")).toMatch(/byte parity drift/);
        expect(verified.errors.join("\n")).not.toMatch(/BI-Attestation-SHA256: does not bind|BI-FINAL-SHA256: does not bind/);
    }, 120_000);

    it("renders and verifies the fixed P002-DEAD withdrawal projection, including exact bytes and modes", async () => {
        const root = cloneTerminalFixture();
        await startWave({ root, waveId: "BI.W-P002" });
        const candidate = await stageSyntheticP002DeadCandidate(root);
        const staged = await verifyRecoveredState({ root, waveId: "BI.W-P002", ref: "HEAD", trailerMessage: candidate.message });
        expect(staged.status, staged.errors.join("\n")).toBe("PASS");
        expect(staged.evidence?.releaseProjection).toMatchObject({
            status: "WITHDRAWN",
            exitCode: 1,
            errors: [],
            evidence: { projectionStatus: "WITHDRAWN", releaseEligible: false },
        });
        expect(selectedIndexBytes(root, RELEASE_PROJECTION_MODULE)).toBeNull();
        const commit = commitTree(root, output(root, ["write-tree"]), output(root, ["rev-parse", "HEAD"]), candidate.message);
        setHead(root, commit);
        const committed = await verifyRecoveredState({ root, waveId: "BI.W-P002", ref: "HEAD" });
        expect(committed.status, committed.errors.join("\n")).toBe("PASS");
        expect(committed.evidence?.withdrawn).toBe(true);
        expect(committed.evidence?.releaseProjection?.status).toBe("WITHDRAWN");

        for (const mutation of ["bytes", "mode"] as const) {
            const mutatedRoot = cloneTerminalFixture();
            await startWave({ root: mutatedRoot, waveId: "BI.W-P002" });
            const mutated = await stageSyntheticP002DeadCandidate(mutatedRoot);
            if (mutation === "bytes") replaceIndexBlob(mutatedRoot, CONTINUOUS_PROJECTIONS[0], "raw-bound arbitrary withdrawal\n");
            else replaceIndexMode(mutatedRoot, CONTINUOUS_PROJECTIONS[0], "100755");
            const message = refreshProjectionTrailerDigests(mutatedRoot, mutated.message);
            const verified = await verifyRecoveredState({ root: mutatedRoot, waveId: "BI.W-P002", ref: "HEAD", trailerMessage: message });
            expect(verified.status).toBe("RED");
            expect(verified.errors.join("\n")).toMatch(mutation === "bytes" ? /differs from the fixed withdrawal projection/ : /regular nonexecutable Git blob/);
        }

        const receiptModeRoot = cloneTerminalFixture();
        await startWave({ root: receiptModeRoot, waveId: "BI.W-P002" });
        const receiptModeCandidate = await stageSyntheticP002DeadCandidate(receiptModeRoot);
        replaceIndexMode(receiptModeRoot, "docs/tranches/BI/evidence/BI.W-P002/receipt.json", "100755");
        const receiptMode = await verifyRecoveredState({
            root: receiptModeRoot,
            waveId: "BI.W-P002",
            ref: "HEAD",
            trailerMessage: receiptModeCandidate.message,
        });
        expect(receiptMode.status).toBe("RED");
        expect(receiptMode.errors).toContain("docs/tranches/BI/evidence/BI.W-P002/receipt.json: terminal receipt must be one regular nonexecutable Git blob");
    }, 120_000);

    it("makes real staged P002 failing and skipped candidates RED", async () => {
        for (const disposition of ["fail", "skip"] as const) {
            const root = cloneTerminalFixture();
            linkFixtureNodeModules(root);
            await startWave({ root, waveId: "BI.W-P002" });
            const candidate = await stageSyntheticWaveCandidate(root, "BI.W-P002", {
                "tests/tranche/release-projection.test.ts": semanticFixtureSource(`P002 ${disposition}`, disposition),
            });
            const verified = await verifyRecoveredState({ root, waveId: "BI.W-P002", ref: "HEAD", trailerMessage: candidate.message });
            expect(verified.status).toBe("RED");
            expect(verified.errors.join("\n")).toMatch(disposition === "fail" ? /semantic tests are RED/ : /zero failed\/pending\/todo/);
        }
    }, 120_000);
});

describe("worktree, environment, and kernel-lock isolation", () => {
    it("rejects nonregular or executable P001 DONE product subjects even when worktree and index modes agree", async () => {
        for (const mode of ["100755", "120000"] as const) {
            const root = createP000Fixture();
            await startWave({ root, waveId: "BI.W-P001" });
            const { message } = await stageP001Candidate(root);
            if (mode === "100755") {
                replaceIndexMode(root, "package.json", mode);
                chmodSync(join(root, "package.json"), 0o755);
            }
            else {
                const target = "scripts/tranche/cursor.mjs";
                replaceIndexBlob(root, "package.json", target);
                replaceIndexMode(root, "package.json", mode);
                rmSync(join(root, "package.json"));
                symlinkSync(target, join(root, "package.json"));
            }
            const verified = await verifyRecoveredState({ root, waveId: "BI.W-P001", ref: "HEAD", trailerMessage: message });
            expect(verified.status).toBe("RED");
            expect(verified.errors).toContain("package.json: P001 product subject must be one regular nonexecutable Git blob");
            expect(verified.evidence?.semanticTest).toBeNull();
        }
    }, 60_000);

    it("rejects staged P001 bytes when the worktree differs before recursive semantic execution", async () => {
        const root = createP000Fixture();
        await startWave({ root, waveId: "BI.W-P001" });
        const { message } = await stageP001Candidate(root);
        writeFileSync(join(root, "package.json"), `${readFileSync(join(root, "package.json"), "utf8")}\n`);
        const verified = await verifyRecoveredState({
            root,
            waveId: "BI.W-P001",
            ref: "HEAD",
            trailerMessage: message,
        });
        expect(verified.status).toBe("RED");
        expect(verified.errors.join("\n")).toContain("package.json: P001 worktree bytes/mode differ from the staged index");
        expect(verified.evidence?.semanticTest).toBeNull();
    }, 60_000);

    it("resolves Git-private state through a linked-worktree .git indirection", async () => {
        const root = createP000Fixture();
        const sibling = registerTemp("glass-bi-linked-");
        rmSync(sibling, { recursive: true, force: true });
        git(root, ["worktree", "add", "--quiet", "--no-checkout", "--detach", sibling, P000]);
        expect(statSync(join(sibling, ".git")).isFile()).toBe(true);
        const primary = await recoverCursor({ root, readOnly: true });
        const linked = await recoverCursor({ root: sibling, readOnly: true });
        expect(linked.bytes).toBe(primary.bytes);
        expect(gitPrivatePaths(sibling).base).not.toBe(join(sibling, ".git", "tranche/BI"));
    }, 60_000);

    it("ignores ambient Git redirection and repository-local trailer configuration", async () => {
        const root = createP000Fixture();
        git(root, ["config", "trailer.BI-Wave.key", "Poison-Wave"]);
        const poison = registerTemp("glass-bi-git-poison-");
        git(poison, ["init", "--quiet"]);
        const saved = Object.fromEntries(["GIT_DIR", "GIT_WORK_TREE", "GIT_INDEX_FILE", "GIT_OBJECT_DIRECTORY", "GIT_ALTERNATE_OBJECT_DIRECTORIES", "GIT_COMMON_DIR", "GIT_CONFIG_PARAMETERS"].map((key) => [key, process.env[key]]));
        process.env.GIT_DIR = join(poison, ".git");
        process.env.GIT_WORK_TREE = poison;
        process.env.GIT_INDEX_FILE = join(poison, "poison.index");
        process.env.GIT_OBJECT_DIRECTORY = join(poison, ".git", "objects");
        process.env.GIT_ALTERNATE_OBJECT_DIRECTORIES = join(poison, ".git", "objects");
        process.env.GIT_COMMON_DIR = join(poison, ".git");
        process.env.GIT_CONFIG_PARAMETERS = "'core.bare=true'";
        try {
            const recovered = await recoverCursor({ root, readOnly: true });
            expect(recovered.cursor.atCommit).toBe(P000);
            expect(parseCommitTrailers("Body\n\nBI-Wave: BI.W-P001\n").trailers.get("BI-Wave")).toBe("BI.W-P001");
        } finally {
            for (const [key, value] of Object.entries(saved)) {
                if (value === undefined) delete process.env[key];
                else process.env[key] = value;
            }
        }
    }, 60_000);

    it("serializes concurrent writers and releases the inherited fd9 writer lease after SIGKILL", async () => {
        const root = createP000Fixture();
        const contenders = await Promise.allSettled([
            startWave({ root, waveId: "BI.W-P001" }),
            startWave({ root, waveId: "BI.W-P001" }),
        ]);
        expect(contenders.filter((row) => row.status === "fulfilled")).toHaveLength(1);
        expect((await validateCursor({ root })).cursor.runningWaves).toEqual(["BI.W-P001"]);

        const killedRoot = createP000Fixture();
        const publicWriter = spawn(process.execPath, [join(SOURCE_TREE, "scripts/tranche/cursor.mjs"), "start", "--root", killedRoot, "--wave", "BI.W-P001", "--json"], {
            cwd: SOURCE_TREE,
            env: { ...process.env, CI: "1" },
            stdio: ["ignore", "pipe", "pipe"],
        });
        const publicWriterExit = new Promise<void>((resolveExit) => publicWriter.once("exit", () => resolveExit()));
        const lockPath = gitPrivatePaths(killedRoot).lock;
        const writerPid = await waitFor(() => {
            if (!existsSync(lockPath)) return null;
            try {
                const record = JSON.parse(readFileSync(lockPath, "utf8"));
                return record.operation === "start" && Number.isInteger(record.pid) ? record.pid : null;
            } catch {
                return null;
            }
        });
        process.kill(writerPid, "SIGSTOP");
        const processRows = String(spawnSync("ps", ["-axo", "pid=,ppid=,comm=,args="], { encoding: "utf8" }).stdout)
            .split(/\r?\n/)
            .map((line) => /^(\s*\d+)\s+(\d+)\s+(\S+)\s+(.*)$/.exec(line))
            .filter((row): row is RegExpExecArray => row !== null)
            .map((row) => ({ pid: Number(row[1]), ppid: Number(row[2]), command: row[3], args: row[4] }));
        expect(processRows.find((row) => row.pid === writerPid)?.ppid).toBe(publicWriter.pid);
        if (process.platform === "darwin") {
            expect(processRows.some((row) => row.ppid === publicWriter.pid && /(?:^|\/)lockf(?:\s|$)/.test(`${row.command} ${row.args}`))).toBe(false);
        }
        await expect(runCursor(["recover", "--root", killedRoot])).rejects.toThrow(/exclusive cursor writer is unavailable/);
        process.kill(writerPid, "SIGKILL");
        await publicWriterExit;
        const recovered = await runCursor(["recover", "--root", killedRoot]);
        expect(recovered.status).toBe("PASS");
        expect((await validateCursor({ root: killedRoot })).ok).toBe(true);
    }, 60_000);
});

describe("historical mutation fencing", () => {
    it("permits historical read-only recovery but rejects start/recover/integrate/terminalize mutations", async () => {
        const root = cloneTerminalFixture();
        expect((await runCursor(["recover", "--root", root, "--at", P000, "--read-only"])).status).toBe("PASS");
        await expect(runCursor(["recover", "--root", root, "--at", P000])).rejects.toThrow(/current worktree HEAD/);
        await expect(startWave({ root, waveId: "BI.W-P001", at: P000 })).rejects.toThrow(/current worktree HEAD/);
        await expect(integrateWave({ root, waveId: "BI.W-P001", commit: P000 })).rejects.toThrow(/current worktree HEAD/);
        await expect(terminalizeWave({ root, waveId: "BI.W-P001", commit: P000, status: "DONE" })).rejects.toThrow(/current worktree HEAD/);
    }, 60_000);
});
