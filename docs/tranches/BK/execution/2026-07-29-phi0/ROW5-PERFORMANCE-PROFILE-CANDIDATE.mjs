import { performance } from "node:perf_hooks";
import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const ordinal = Number(process.argv[2]);
if (!Number.isInteger(ordinal) || ordinal < 1 || ordinal > 3) {
    throw new Error(`invalid ordinal: ${process.argv[2]}`);
}

const cwd = process.cwd();
const audit = resolve(cwd, "docs/tranches/BJ/audits/2026-07-28-library-dag");
const source = resolve(audit, "build-import-dag-v3.mjs");
const { assertStoredArtifacts, buildGraph } = await import(pathToFileURL(source).href);

const expected = {
    receiptSha256: "c0190488b5cf0da953c12425c7f24626a4ab39439106c124a18a81f10133cf90",
    nodes: 1501,
    internalEdges: 3585,
    externalEdges: 1970,
    unmodeledFileOperations: 395,
};

function residue() {
    const names = readdirSync(audit);
    return names.filter((name) =>
        name === ".IMPORT-DAG-V3.lock" ||
        (name.startsWith(".IMPORT-DAG-V3.") && name.endsWith(".tmp")),
    ).sort();
}

function verifyGraph(graph, label) {
    const actual = {
        receiptSha256: graph.receiptSha256,
        nodes: graph.summary?.nodes,
        internalEdges: graph.summary?.internalEdges,
        externalEdges: graph.summary?.externalEdges,
        unmodeledFileOperations: graph.summary?.unmodeledFileOperations,
    };
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(`${label}: graph verification failed: ${JSON.stringify(actual)}`);
    }
}

function sample() {
    return {
        performanceNowMs: performance.now(),
        cpuUsage: process.cpuUsage(),
        memoryUsage: process.memoryUsage(),
        resourceUsage: process.resourceUsage(),
    };
}

function subtractUsage(after, before) {
    const result = {};
    for (const key of Object.keys(after)) result[key] = after[key] - (before[key] ?? 0);
    return result;
}

function delta(before, after) {
    const cpuUsageDelta = subtractUsage(after.cpuUsage, before.cpuUsage);
    const memoryUsageDelta = subtractUsage(after.memoryUsage, before.memoryUsage);
    const resourceUsageDelta = subtractUsage(after.resourceUsage, before.resourceUsage);
    return {
        wallMs: after.performanceNowMs - before.performanceNowMs,
        cpuUsageDelta,
        cpuSeconds: (cpuUsageDelta.user + cpuUsageDelta.system) / 1_000_000,
        memoryUsageDelta,
        resourceUsageDelta,
    };
}

function maxRSS(samples) {
    const rawMaxRSS = Math.max(...samples.map((sample) => sample.resourceUsage.maxRSS));
    return {
        rawMaxRSS,
        rawUnit: "kilobytes",
        bytes: rawMaxRSS * 1024,
        unit: "bytes",
        source: "process.resourceUsage().maxRSS",
        exactSingleProcess: true,
    };
}

if (residue().length !== 0) {
    throw new Error(`pre-build artifact residue: ${JSON.stringify(residue())}`);
}
if (typeof globalThis.gc === "function") globalThis.gc();

const beforeBuild = sample();
const graph = await buildGraph({ repositoryRoot: cwd, outputDirectory: audit });
verifyGraph(graph, "buildGraph");
const afterBuild = sample();

assertStoredArtifacts(audit, graph);
const afterAssertion = sample();
if (residue().length !== 0) {
    throw new Error(`post-assert artifact residue: ${JSON.stringify(residue())}`);
}

const samples = { beforeBuild, afterBuild, afterAssertion };
const result = {
    ordinal,
    label: ordinal === 1 ? "cold-process control" : `equal-work repeat ${ordinal - 1}`,
    kind: ordinal === 1 ? "cold-process-control" : "equal-work-repeat",
    process: {
        execPath: process.execPath,
        pid: process.pid,
        nodeVersion: process.version,
        argv: process.argv,
        cwd,
    },
    importAndGc: {
        source,
        moduleImportedBeforeFirstSample: true,
        gcExposed: typeof globalThis.gc === "function",
        gcCalled: typeof globalThis.gc === "function",
    },
    expected,
    graphVerification: {
        receiptSha256: graph.receiptSha256,
        counts: {
            nodes: graph.summary.nodes,
            internalEdges: graph.summary.internalEdges,
            externalEdges: graph.summary.externalEdges,
            unmodeledFileOperations: graph.summary.unmodeledFileOperations,
        },
        exact: true,
    },
    samples,
    buildGraph: delta(beforeBuild, afterBuild),
    assertStoredArtifacts: delta(afterBuild, afterAssertion),
    combinedTestPath: delta(beforeBuild, afterAssertion),
    maxRSS: maxRSS([beforeBuild, afterBuild, afterAssertion]),
    residue: residue(),
};

process.stdout.write(`${JSON.stringify(result)}\n`);
