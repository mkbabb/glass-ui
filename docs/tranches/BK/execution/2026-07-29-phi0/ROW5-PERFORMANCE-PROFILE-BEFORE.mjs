import { performance } from "node:perf_hooks";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { readFileSync, writeFileSync } from "node:fs";

const repositoryRoot = process.env.ROW5_REPOSITORY_ROOT ?? process.cwd();
const audit = resolve(
    repositoryRoot,
    "docs/tranches/BJ/audits/2026-07-28-library-dag",
);
const cli = resolve(audit, "build-import-dag-v3.mjs");
const resultPath = "/tmp/glass-row5-profile-before.json";
const selfPath = fileURLToPath(import.meta.url);
const expected = {
    receiptSha256: "4655ab44f55ef2a37004d4fc4d51c5c3a0cd226d50a02dad7763b64bc1d79fa2",
    nodes: 1501,
    internalEdges: 3585,
    externalEdges: 1970,
};

function requireGc() {
    if (typeof globalThis.gc !== "function") {
        throw new Error("profiling harness requires node --expose-gc");
    }
}

function sample() {
    return {
        performanceNowMs: performance.now(),
        cpuUsage: process.cpuUsage(),
        memoryUsage: process.memoryUsage(),
        resourceUsage: {
            maxRSS: process.resourceUsage().maxRSS,
        },
    };
}

function parseTimedOutput(stderr) {
    const real = stderr.match(/^real\s+([0-9.]+)\s*$/m);
    const user = stderr.match(/^user\s+([0-9.]+)\s*$/m);
    const system = stderr.match(/^sys\s+([0-9.]+)\s*$/m);
    const maxRSS = stderr.match(/^\s*(\d+)\s+maximum resident set size\s*$/m);
    if (!real || !user || !system || !maxRSS) {
        throw new Error(`unable to parse /usr/bin/time -lp output:\n${stderr}`);
    }
    return {
        wallSeconds: Number(real[1]),
        userSeconds: Number(user[1]),
        systemSeconds: Number(system[1]),
        totalCpuSeconds: Number(user[1]) + Number(system[1]),
        maxRSS: Number(maxRSS[1]),
        maxRSSUnit: "bytes",
        timeFormat: "/usr/bin/time -lp",
    };
}

function runCanonicalCheck() {
    const startedAt = performance.now();
    const timed = spawnSync(
        "/usr/bin/time",
        ["-lp", process.execPath, cli, "--check"],
        {
            cwd: repositoryRoot,
            encoding: "utf8",
            stdio: ["ignore", "pipe", "pipe"],
        },
    );
    const endedAt = performance.now();
    if (timed.error) throw timed.error;
    if (timed.status !== 0) {
        throw new Error(
            `canonical CLI --check failed with status ${timed.status}:\n${timed.stdout}\n${timed.stderr}`,
        );
    }
    const time = parseTimedOutput(timed.stderr);
    return {
        command: `node ${cli} --check`,
        exitCode: timed.status,
        wallMs: endedAt - startedAt,
        time,
        stdout: timed.stdout,
    };
}

async function runOnce(label, kind, ordinal) {
    requireGc();
    const { buildGraph } = await import(pathToFileURL(cli).href);
    globalThis.gc();

    const before = sample();
    const buildStartedAt = performance.now();
    const buildCpuStartedAt = process.cpuUsage();
    const graph = await buildGraph({ repositoryRoot, outputDirectory: audit });
    const buildEndedAt = performance.now();
    const buildCpu = process.cpuUsage(buildCpuStartedAt);
    const after = sample();

    const counts = {
        nodes: graph.summary.nodes,
        internalEdges: graph.summary.internalEdges,
        externalEdges: graph.summary.externalEdges,
    };
    if (
        graph.receiptSha256 !== expected.receiptSha256 ||
        counts.nodes !== expected.nodes ||
        counts.internalEdges !== expected.internalEdges ||
        counts.externalEdges !== expected.externalEdges
    ) {
        throw new Error(
            `graph receipt/count mismatch: ${JSON.stringify({
                receiptSha256: graph.receiptSha256,
                counts,
            })}`,
        );
    }

    // Keep graph strongly reachable through this point while the canonical
    // check runs in its separately measured child process.
    const canonicalCheck = runCanonicalCheck();
    if (graph.receiptSha256 !== expected.receiptSha256) {
        throw new Error("graph was not retained through canonical check");
    }

    return {
        ordinal,
        label,
        kind,
        process: {
            execPath: process.execPath,
            pid: process.pid,
            nodeVersion: process.version,
            argv: ["--expose-gc", selfPath, "--run", label],
        },
        expected,
        graphVerification: {
            receiptSha256: graph.receiptSha256,
            counts,
            exact: true,
        },
        buildGraph: {
            before,
            after,
            wallMs: buildEndedAt - buildStartedAt,
            cpuUsageDelta: buildCpu,
        },
        canonicalCliCheck: canonicalCheck,
    };
}

function runChild(label, kind, ordinal) {
    const child = spawnSync(
        process.execPath,
        ["--expose-gc", selfPath, "--run", label, kind, String(ordinal)],
        {
            cwd: repositoryRoot,
            encoding: "utf8",
            stdio: ["ignore", "pipe", "pipe"],
            env: { ...process.env, ROW5_REPOSITORY_ROOT: repositoryRoot },
        },
    );
    if (child.error) throw child.error;
    if (child.status !== 0) {
        throw new Error(
            `profiling child failed with status ${child.status}:\n${child.stdout}\n${child.stderr}`,
        );
    }
    return JSON.parse(child.stdout);
}

async function main() {
    const args = process.argv.slice(2);
    if (args[0] === "--run") {
        const label = args[1];
        const kind = args[2];
        const ordinal = Number(args[3]);
        process.stdout.write(JSON.stringify(await runOnce(label, kind, ordinal)) + "\n");
        return;
    }
    if (args.length !== 0) throw new Error(`unknown arguments: ${args.join(" ")}`);

    const runs = [
        runChild("cold-process control", "cold-process-control", 1),
        runChild("equal-work repeat 1", "equal-work-repeat", 2),
        runChild("equal-work repeat 2", "equal-work-repeat", 3),
    ];
    const result = {
        schema: "glass-row5-performance-profile/1",
        authorityHeader: "gpt-5.6-luna xhigh",
        repositoryRoot,
        audit,
        canonicalCli: `node ${cli} --check`,
        expected,
        runs,
    };
    writeFileSync(resultPath, JSON.stringify(result, null, 2) + "\n");
    process.stdout.write(JSON.stringify({ resultPath, runCount: runs.length }) + "\n");
}

await main();
