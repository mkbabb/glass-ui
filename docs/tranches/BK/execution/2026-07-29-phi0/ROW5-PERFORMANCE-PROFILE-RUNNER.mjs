import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repositoryRoot = process.cwd();
const audit = resolve(repositoryRoot, "docs/tranches/BJ/audits/2026-07-28-library-dag");
const canonicalSource = resolve(audit, "build-import-dag-v3.mjs");
const candidatePath = resolve(fileURLToPath(new URL("./candidate.mjs", import.meta.url)));
const harnessDir = resolve(fileURLToPath(new URL(".", import.meta.url)));
const afterPath = "/tmp/glass-row5-profile-after.json";
const beforePath = "/tmp/glass-row5-profile-before.json";
const expected = {
    receiptSha256: "c0190488b5cf0da953c12425c7f24626a4ab39439106c124a18a81f10133cf90",
    nodes: 1501,
    internalEdges: 3585,
    externalEdges: 1970,
    unmodeledFileOperations: 395,
};

function sha256File(path) {
    return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function residue() {
    return readdirSync(audit).filter((name) =>
        name === ".IMPORT-DAG-V3.lock" ||
        (name.startsWith(".IMPORT-DAG-V3.") && name.endsWith(".tmp")),
    ).sort();
}

function assertNoResidue(label) {
    const names = residue();
    if (names.length !== 0) throw new Error(`${label}: artifact residue ${JSON.stringify(names)}`);
}

function verifySummary(summary, label) {
    const actual = {
        receiptSha256: summary.receiptSha256,
        nodes: summary.nodes,
        internalEdges: summary.internalEdges,
        externalEdges: summary.externalEdges,
        unmodeledFileOperations: summary.unmodeledFileOperations,
    };
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(`${label}: verification failed: ${JSON.stringify(actual)}`);
    }
}

function storedArtifactState() {
    const jsonPath = resolve(audit, "IMPORT-DAG-V3.json");
    const summaryPath = resolve(audit, "IMPORT-DAG-V3-SUMMARY.md");
    const manifestPath = resolve(audit, "OWNER-MANIFEST.json");
    const graph = JSON.parse(readFileSync(jsonPath, "utf8"));
    verifySummary({ ...graph.summary, receiptSha256: graph.receiptSha256 }, "stored artifact");
    return {
        artifacts: {
            "IMPORT-DAG-V3.json": { path: jsonPath, sha256: sha256File(jsonPath) },
            "IMPORT-DAG-V3-SUMMARY.md": { path: summaryPath, sha256: sha256File(summaryPath) },
        },
        inputs: {
            "OWNER-MANIFEST.json": { path: manifestPath, sha256: sha256File(manifestPath) },
        },
        receiptSha256: graph.receiptSha256,
        summary: graph.summary,
    };
}

function runCandidate(ordinal) {
    const command = [process.execPath, "--expose-gc", candidatePath, String(ordinal)];
    const result = spawnSync(process.execPath, command.slice(1), {
        cwd: repositoryRoot,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
    });
    if (result.error) throw result.error;
    if (result.status !== 0 || result.signal) {
        throw new Error(`candidate ordinal ${ordinal} failed: status=${result.status} signal=${result.signal}\nstdout=${result.stdout}\nstderr=${result.stderr}`);
    }
    let parsed;
    try { parsed = JSON.parse(result.stdout); } catch (error) {
        throw new Error(`candidate ordinal ${ordinal} emitted invalid JSON: ${error.message}\n${result.stdout}`);
    }
    verifySummary({ ...parsed.graphVerification.counts, receiptSha256: parsed.graphVerification.receiptSha256 }, `candidate ordinal ${ordinal}`);
    if (JSON.stringify(parsed.residue) !== "[]") throw new Error(`candidate ordinal ${ordinal}: residue was not empty`);
    return {
        command: command.join(" "),
        commandArgv: command,
        sourceSha256: sha256File(candidatePath),
        stdout: result.stdout,
        stderr: result.stderr,
        result: parsed,
    };
}

function parseTimedCli(stdout, stderr, status, signal, ordinal) {
    const real = stderr.match(/^real\s+([0-9.]+)\s*$/m);
    const user = stderr.match(/^user\s+([0-9.]+)\s*$/m);
    const system = stderr.match(/^sys\s+([0-9.]+)\s*$/m);
    const maxRSS = stderr.match(/^\s*([0-9]+)\s+maximum resident set size\s*$/m);
    if (!real || !user || !system || !maxRSS) {
        throw new Error(`CLI ordinal ${ordinal}: unable to parse /usr/bin/time -lp output:\n${stderr}`);
    }
    const marker = "\nreceiptSha256=";
    const markerIndex = stdout.lastIndexOf(marker);
    if (markerIndex < 0) throw new Error(`CLI ordinal ${ordinal}: missing receipt in stdout`);
    const summaryText = stdout.slice(0, markerIndex).trim();
    const receiptLine = stdout.slice(markerIndex + marker.length).trim();
    const summary = JSON.parse(summaryText);
    verifySummary({ ...summary, receiptSha256: receiptLine }, `CLI ordinal ${ordinal}`);
    if (status !== 0 || signal) throw new Error(`CLI ordinal ${ordinal}: status=${status} signal=${signal}`);
    return {
        command: `node ${canonicalSource} --check`,
        timedCommand: `/usr/bin/time -lp node ${canonicalSource} --check`,
        commandArgv: ["node", canonicalSource, "--check"],
        exitCode: status,
        signal,
        time: {
            wallSeconds: Number(real[1]),
            userSeconds: Number(user[1]),
            systemSeconds: Number(system[1]),
            totalCpuSeconds: Number(user[1]) + Number(system[1]),
            maxRSS: Number(maxRSS[1]),
            maxRSSUnit: "bytes",
            timeFormat: "/usr/bin/time -lp",
        },
        rawTimeStderr: stderr,
        stdout,
        receiptSha256: receiptLine,
        counts: {
            nodes: summary.nodes,
            internalEdges: summary.internalEdges,
            externalEdges: summary.externalEdges,
            unmodeledFileOperations: summary.unmodeledFileOperations,
        },
        equalWorkProductionPathControl: true,
        includedInCandidateCombinedMetrics: false,
    };
}

function runCli(ordinal) {
    const result = spawnSync("/usr/bin/time", ["-lp", "node", canonicalSource, "--check"], {
        cwd: repositoryRoot,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
    });
    if (result.error) throw result.error;
    const parsed = parseTimedCli(result.stdout, result.stderr, result.status, result.signal, ordinal);
    assertNoResidue(`CLI ordinal ${ordinal}`);
    return parsed;
}

const baselineProfileSha256 = sha256File(beforePath);
if (baselineProfileSha256 !== "c605daa10baf53ab2f1fe1be191e1115e17c1c3c0b784d4d6990c29f0f6a5771") {
    throw new Error(`baseline profile hash mismatch: ${baselineProfileSha256}`);
}
if (existsSync(afterPath)) throw new Error(`refusing to overwrite existing profile: ${afterPath}`);
assertNoResidue("preflight");

const sourceBefore = { path: canonicalSource, sha256: sha256File(canonicalSource) };
const artifactBefore = storedArtifactState();
const harnessSourceHashes = {
    candidate: { path: candidatePath, sha256: sha256File(candidatePath) },
    runner: { path: fileURLToPath(import.meta.url), sha256: sha256File(fileURLToPath(import.meta.url)) },
};

try {
    const runs = [];
    for (let ordinal = 1; ordinal <= 3; ordinal += 1) {
        const candidate = runCandidate(ordinal);
        assertNoResidue(`candidate ordinal ${ordinal}`);
        const canonicalCliCheck = runCli(ordinal);
        runs.push({
            ordinal,
            label: candidate.result.label,
            kind: candidate.result.kind,
            process: candidate.result.process,
            expected,
            graphVerification: candidate.result.graphVerification,
            buildGraph: candidate.result.buildGraph,
            assertStoredArtifacts: candidate.result.assertStoredArtifacts,
            combinedTestPath: candidate.result.combinedTestPath,
            samples: candidate.result.samples,
            maxRSS: candidate.result.maxRSS,
            residue: candidate.result.residue,
            candidateCommand: candidate.command,
            candidateCommandArgv: candidate.commandArgv,
            candidateHarnessSourceSha256: candidate.sourceSha256,
            candidateStdout: candidate.stdout,
            candidateStderr: candidate.stderr,
            canonicalCliCheck,
        });
    }
    assertNoResidue("post-runs");
    const sourceAfter = { path: canonicalSource, sha256: sha256File(canonicalSource) };
    const artifactAfter = storedArtifactState();
    if (sourceBefore.sha256 !== sourceAfter.sha256) throw new Error("canonical source changed during profiling");
    if (JSON.stringify(artifactBefore.artifacts) !== JSON.stringify(artifactAfter.artifacts)) {
        throw new Error("stored artifacts changed during profiling");
    }

    const profile = {
        schema: "glass-row5-performance-profile/2",
        authorityHeader: "gpt-5.6-luna xhigh",
        repositoryRoot,
        audit,
        capturedAt: new Date().toISOString(),
        expected,
        receiptAndCountsVerification: {
            exactReceiptSha256: expected.receiptSha256,
            exactCounts: {
                nodes: expected.nodes,
                internalEdges: expected.internalEdges,
                externalEdges: expected.externalEdges,
                unmodeledFileOperations: expected.unmodeledFileOperations,
            },
        },
        baseline: {
            path: beforePath,
            sha256: baselineProfileSha256,
            schema: JSON.parse(readFileSync(beforePath, "utf8")).schema,
        },
        commands: {
            candidate: {
                description: "fresh Node process importing source, one buildGraph, same-process assertStoredArtifacts",
                nodeExecPath: process.execPath,
                exposeGc: true,
                testPathExcludesCanonicalCli: true,
            },
            canonicalCli: {
                description: "fresh canonical production-path --check control per ordinal",
                command: `node ${canonicalSource} --check`,
                timedCommand: `/usr/bin/time -lp node ${canonicalSource} --check`,
                cwd: repositoryRoot,
                includedInCandidateCombinedMetrics: false,
            },
        },
        sourceHashes: {
            canonicalGenerator: { before: sourceBefore, after: sourceAfter, stable: true },
            temporaryHarness: harnessSourceHashes,
        },
        artifactHashes: {
            before: artifactBefore,
            after: artifactAfter,
            stable: true,
        },
        residue: {
            checkedBefore: true,
            checkedAfterEachCandidate: true,
            checkedAfterEachCli: true,
            checkedAfterAllRuns: true,
            final: residue(),
        },
        runs,
        provenance: {
            rawSamples: "candidate samples retain performance.now, process.cpuUsage, process.memoryUsage, and process.resourceUsage at import/gc baseline, post-build, and post-assertion",
            candidateMaxRSS: "exact single candidate process resourceUsage maxRSS; canonical CLI maxRSS remains a separate control",
            unequalWorkCriticalPath: "not combined in raw run metrics; compare externally against baseline build+duplicate-CLI totals",
        },
    };
    writeFileSync(afterPath, `${JSON.stringify(profile, null, 2)}\n`);
} finally {
    rmSync(harnessDir, { recursive: true, force: true });
}
