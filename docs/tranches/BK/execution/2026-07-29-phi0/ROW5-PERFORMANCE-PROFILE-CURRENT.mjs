#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { mkdtemp, readFile, readdir, rm, stat, symlink, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawn } from 'node:child_process';
import { performance } from 'node:perf_hooks';
import process from 'node:process';
import inspector from 'node:inspector/promises';

const thisFile = fileURLToPath(import.meta.url);
const thisDirectory = dirname(thisFile);
const schema = 'glass-row5-performance-profile/3';
const phaseLimitMs = 30_000;
const candidateCommit = 'cf8562a083e658c04889f14cd067753dedac0822';
const candidateTree = '73476dd469c1f09e9f2d0e09565bf229c112611c';
const files = Object.freeze({
  generator: 'docs/tranches/BJ/audits/2026-07-28-library-dag/build-import-dag-v3.mjs',
  audit: 'docs/tranches/BJ/audits/2026-07-28-library-dag',
  graphJson: 'docs/tranches/BJ/audits/2026-07-28-library-dag/IMPORT-DAG-V3.json',
  summary: 'docs/tranches/BJ/audits/2026-07-28-library-dag/IMPORT-DAG-V3-SUMMARY.md',
  manifest: 'docs/tranches/BJ/audits/2026-07-28-library-dag/OWNER-MANIFEST.json',
  test: 'tests/architecture/import-dag-v3.test.ts',
});
const identities = Object.freeze({
  receipt: 'c0190488b5cf0da953c12425c7f24626a4ab39439106c124a18a81f10133cf90',
  nodes: 1501,
  internalEdges: 3585,
  externalEdges: 1970,
  unmodeledFileOperations: 395,
  graphJson: '32c7054244ad1ecda53682ee93dd76f739d0394f4821fa4a127f8c80233d4754',
  summary: 'd85a8d55ef1b2457eebf441fe54497f658bed6e1fd4be78c4117d48d720fc0e3',
  generator: '1a19c8aa86a0dcc8418ff8da327ac09b462eb19869fe38e64bc4c3f3c6ec0285',
  test: '7c44490d3a53638b92193916fbfa45054330bad4eadf949d39bd1788d37e2998',
  manifest: 'e19b663fb671e046727469832be1d160095eb5cb7d3ba54aa2818277043100ba',
});

function fail(message, details) {
  const error = new Error(message);
  if (details !== undefined) error.details = details;
  throw error;
}

function assert(condition, message, details) {
  if (!condition) fail(message, details);
}

function sha256Bytes(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

async function sha256File(path) {
  return sha256Bytes(await readFile(path));
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch (error) {
    if (error?.code === 'ENOENT') return false;
    throw error;
  }
}

async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

function commandResult(command, args, options = {}) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      env: options.env,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    const stdout = [];
    const stderr = [];
    child.stdout.on('data', (chunk) => stdout.push(chunk));
    child.stderr.on('data', (chunk) => stderr.push(chunk));
    child.on('error', reject);
    child.on('close', (status, signal) => resolvePromise({
      command,
      args,
      stdout: Buffer.concat(stdout).toString('utf8'),
      stderr: Buffer.concat(stderr).toString('utf8'),
      status,
      signal,
    }));
  });
}

async function runCommand(command, args, options = {}) {
  const result = await commandResult(command, args, options);
  assert(result.status === 0 && result.signal === null, `command failed: ${command} ${args.join(' ')}`, result);
  return result;
}

function commandRecord(command, args, result) {
  return {
    argv: [command, ...args],
    status: result?.status ?? null,
    signal: result?.signal ?? null,
    stdout: result?.stdout ?? '',
    stderr: result?.stderr ?? '',
  };
}

async function git(repositoryRoot, args) {
  return runCommand('git', args, { cwd: repositoryRoot });
}

async function currentRepository() {
  const result = await runCommand('git', ['rev-parse', '--show-toplevel'], { cwd: thisDirectory });
  return result.stdout.trim();
}

async function gitIdentity(repositoryRoot) {
  const commit = await git(repositoryRoot, ['rev-parse', 'HEAD']);
  const tree = await git(repositoryRoot, ['rev-parse', 'HEAD^{tree}']);
  return { commit: commit.stdout.trim(), tree: tree.stdout.trim() };
}

async function assertCandidate(repositoryRoot) {
  const identity = await gitIdentity(repositoryRoot);
  assert(identity.commit === candidateCommit, 'candidate commit mismatch', { identity, expected: candidateCommit });
  assert(identity.tree === candidateTree, 'candidate tree mismatch', { identity, expected: candidateTree });
  const status = await git(repositoryRoot, ['status', '--porcelain', '--untracked-files=no']);
  assert(status.stdout.trim() === '', 'candidate tracked status is not clean', { status: status.stdout });
  return identity;
}

function clonePath(clone, relativePath) {
  return join(clone, relativePath);
}

function expectedFileHashes() {
  return {
    generator: identities.generator,
    graphJson: identities.graphJson,
    summary: identities.summary,
    manifest: identities.manifest,
    test: identities.test,
  };
}

async function hashExactFiles(clone) {
  const hashes = {};
  for (const [name, expected] of Object.entries(expectedFileHashes())) {
    const path = clonePath(clone, files[name]);
    assert(await exists(path), `required ${name} file is missing`, { path });
    hashes[name] = await sha256File(path);
    assert(hashes[name] === expected, `${name} identity mismatch`, { actual: hashes[name], expected, path });
  }
  return hashes;
}

function verifyGraphSummary(graph, label) {
  assert(graph?.receiptSha256 === identities.receipt, `${label} receiptSha256 mismatch`, {
    actual: graph?.receiptSha256,
    expected: identities.receipt,
  });
  const summary = graph?.summary;
  assert(summary?.nodes === identities.nodes, `${label} nodes mismatch`, { actual: summary?.nodes, expected: identities.nodes });
  assert(summary?.internalEdges === identities.internalEdges, `${label} internalEdges mismatch`, {
    actual: summary?.internalEdges,
    expected: identities.internalEdges,
  });
  assert(summary?.externalEdges === identities.externalEdges, `${label} externalEdges mismatch`, {
    actual: summary?.externalEdges,
    expected: identities.externalEdges,
  });
  assert(summary?.unmodeledFileOperations === identities.unmodeledFileOperations, `${label} unmodeledFileOperations mismatch`, {
    actual: summary?.unmodeledFileOperations,
    expected: identities.unmodeledFileOperations,
  });
  return {
    nodes: summary.nodes,
    internalEdges: summary.internalEdges,
    externalEdges: summary.externalEdges,
    unmodeledFileOperations: summary.unmodeledFileOperations,
  };
}

async function verifyForbiddenResidue(audit) {
  const names = await readdir(audit);
  const forbidden = names.filter((name) => (
    name === '.IMPORT-DAG-V3.lock' || /^\.IMPORT-DAG-V3\..*\.tmp$/.test(name)
  ));
  assert(forbidden.length === 0, 'forbidden import DAG residue exists', { audit, forbidden });
  return [];
}

async function verifyCanonicalArtifacts(clone) {
  const graph = await readJson(clonePath(clone, files.graphJson));
  const summary = verifyGraphSummary(graph, 'artifact JSON');
  const hashes = await hashExactFiles(clone);
  const forbiddenResidue = await verifyForbiddenResidue(clonePath(clone, files.audit));
  return { graph, summary, hashes, forbiddenResidue };
}

function cpuSnapshot() {
  const usage = process.cpuUsage();
  return { user: usage.user, system: usage.system };
}

function cpuDelta(before, after) {
  return (after.user - before.user) + (after.system - before.system);
}

function memorySnapshot() {
  const memory = process.memoryUsage();
  return {
    memoryUsage: {
      rss: memory.rss,
      heapTotal: memory.heapTotal,
      heapUsed: memory.heapUsed,
      external: memory.external,
      arrayBuffers: memory.arrayBuffers,
    },
    memoryUsageMeaning: 'process.memoryUsage() occupancy snapshot',
    maxRSS: process.resourceUsage().maxRSS,
    maxRSSUnit: process.platform === 'darwin' ? 'KiB' : 'platform-specific',
    maxRSSMeaning: 'process.resourceUsage().maxRSS cumulative high-water',
  };
}

async function forceGC() {
  assert(typeof globalThis.gc === 'function', 'worker requires Node --expose-gc');
  globalThis.gc();
  await new Promise((resolvePromise) => setImmediate(resolvePromise));
}

async function startSampling() {
  const session = new inspector.Session();
  session.connect();
  await session.post('HeapProfiler.startSampling', {
    samplingInterval: 32768,
    suppressRandomness: true,
    includeObjectsCollectedByMajorGC: true,
    includeObjectsCollectedByMinorGC: true,
  });
  return session;
}

async function stopSampling(session) {
  try {
    const response = await session.post('HeapProfiler.stopSampling');
    const samples = Array.isArray(response?.profile?.samples) ? response.profile.samples : [];
    let sampledAllocationBytes = 0;
    for (const sample of samples) {
      const size = Number(sample.size);
      if (Number.isFinite(size)) sampledAllocationBytes += size;
    }
    return { sampledAllocationBytes, samples: samples.length };
  } finally {
    session.disconnect();
  }
}

async function runWorkerAPhase({ phase, clone, audit, buildGraph, assertStoredArtifacts }) {
  await forceGC();
  const session = await startSampling();
  const started = performance.now();
  const cpuBefore = cpuSnapshot();
  const memoryBefore = memorySnapshot();
  let graph;
  let phaseError;
  let sampling;
  let samplingStopped = false;
  const stopSamplingOnce = async () => {
    if (samplingStopped) return sampling;
    samplingStopped = true;
    sampling = await stopSampling(session);
    return sampling;
  };
  try {
    graph = await buildGraph({ repositoryRoot: clone, outputDirectory: audit });
    await assertStoredArtifacts(audit, graph);
    const summary = verifyGraphSummary(graph, `Worker A ${phase}`);
    const ended = performance.now();
    const cpuAfter = cpuSnapshot();
    const memoryAfter = memorySnapshot();
    await stopSamplingOnce();
    const hashes = await hashExactFiles(clone);
    const forbiddenResidue = await verifyForbiddenResidue(audit);
    const wallMs = ended - started;
    const cpuMicroseconds = cpuDelta(cpuBefore, cpuAfter);
    assert(wallMs > 0 && wallMs < phaseLimitMs, `Worker A ${phase} timing limit failed`, { wallMs });
    assert(cpuMicroseconds > 0, `Worker A ${phase} CPU time must be positive`, { cpuMicroseconds });
    assert(sampling.sampledAllocationBytes > 0 && sampling.samples > 0, `Worker A ${phase} sampling must be positive`, sampling);
    return {
      phase,
      pid: process.pid,
      wallMs,
      cpuMicroseconds,
      ...sampling,
      memoryStart: memoryBefore,
      memoryEnd: memoryAfter,
      summary,
      hashes,
      forbiddenResidue,
      timing: 'nondeterministic',
      allocationMeaning: 'profile.samples sampled allocation bytes/count; not exact allocations',
    };
  } catch (error) {
    phaseError = error;
  } finally {
    graph = undefined;
    if (!samplingStopped) {
      try {
        await stopSamplingOnce();
      } catch (error) {
        if (!phaseError) phaseError = error;
      }
    }
  }
  if (phaseError) throw phaseError;
  fail(`Worker A ${phase} did not produce a result`, { sampling });
}

async function workerA(clone, resultPath) {
  const audit = clonePath(clone, files.audit);
  const command = [process.execPath, '--expose-gc', thisFile, '--worker-a', clone, resultPath];
  try {
    await assertCandidate(clone);
    const generator = pathToFileURL(clonePath(clone, files.generator)).href;
    const { buildGraph, assertStoredArtifacts } = await import(generator);
    assert(typeof buildGraph === 'function', 'candidate generator buildGraph export is missing');
    assert(typeof assertStoredArtifacts === 'function', 'candidate generator assertStoredArtifacts export is missing');
    const A1 = await runWorkerAPhase({ phase: 'A1', clone, audit, buildGraph, assertStoredArtifacts });
    const A2 = await runWorkerAPhase({ phase: 'A2', clone, audit, buildGraph, assertStoredArtifacts });
    assert(A1.pid === A2.pid, 'Worker A phases did not use one PID');
    await assertCandidate(clone);
    await writeFile(resultPath, JSON.stringify({
      worker: 'A',
      pid: process.pid,
      module: files.generator,
      command,
      phases: [A1, A2],
      limits: { phaseWallMs: phaseLimitMs, timing: 'nondeterministic' },
      pass: true,
    }, null, 2));
  } catch (error) {
    await writeFile(resultPath, JSON.stringify({
      worker: 'A',
      pid: process.pid,
      command,
      pass: false,
      error: { message: error.message, details: error.details },
    }, null, 2));
    process.exitCode = 1;
  }
}

async function preloadProfiler() {
  assert(process.env.ROW5_PROFILE_PRELOAD === '1', 'preload mode requires ROW5_PROFILE_PRELOAD=1');
  assert(process.execArgv.includes('--expose-gc'), 'Worker B requires --expose-gc');
  const resultPath = process.env.ROW5_PROFILE_RESULT_PATH;
  const repositoryRoot = process.env.ROW5_PROFILE_REPOSITORY_ROOT;
  assert(resultPath && repositoryRoot, 'Worker B preload paths are required');
  await forceGC();
  const session = await startSampling();
  const started = performance.now();
  const cpuBefore = cpuSnapshot();
  const memoryBefore = memorySnapshot();
  process.once('beforeExit', async () => {
    await finalizeWorkerB({ session, started, cpuBefore, memoryBefore, resultPath, repositoryRoot });
  });
}

async function finalizeWorkerB({ session, started, cpuBefore, memoryBefore, resultPath, repositoryRoot }) {
  try {
    const ended = performance.now();
    const cpuAfter = cpuSnapshot();
    const memoryAfter = memorySnapshot();
    const sampling = await stopSampling(session);
    const clone = resolve(repositoryRoot);
    const artifacts = await verifyCanonicalArtifacts(clone);
    await assertCandidate(clone);
    const wallMs = ended - started;
    const cpuMicroseconds = cpuDelta(cpuBefore, cpuAfter);
    assert(wallMs > 0 && wallMs < phaseLimitMs, 'Worker B timing limit failed', { wallMs });
    assert(cpuMicroseconds > 0, 'Worker B CPU time must be positive', { cpuMicroseconds });
    assert(sampling.sampledAllocationBytes > 0 && sampling.samples > 0, 'Worker B sampling must be positive', sampling);
    await writeFile(resultPath, JSON.stringify({
      worker: 'B',
      pid: process.pid,
      command: [process.execPath, '--expose-gc', '--import', thisFile, files.generator, '--check'],
      phase: {
        phase: 'B',
        pid: process.pid,
        wallMs,
        cpuMicroseconds,
        ...sampling,
        memoryStart: memoryBefore,
        memoryEnd: memoryAfter,
        summary: artifacts.summary,
        hashes: artifacts.hashes,
        forbiddenResidue: artifacts.forbiddenResidue,
        timing: 'nondeterministic',
        allocationMeaning: 'profile.samples sampled allocation bytes/count; not exact allocations',
      },
      pass: true,
    }, null, 2));
  } catch (error) {
    await writeFile(resultPath, JSON.stringify({
      worker: 'B',
      pid: process.pid,
      pass: false,
      error: { message: error.message, details: error.details },
    }, null, 2));
    process.exitCode = 1;
  }
}

function parseWorkerBStdout(stdout) {
  const lines = stdout.trim().split(/\r?\n/);
  const receiptLinePattern = /^receiptSha256(?:\s*[:=]\s*|\s+)([0-9a-f]{64})$/i;
  const receiptLineIndex = lines.findIndex((line) => receiptLinePattern.test(line.trim()));
  assert(receiptLineIndex > 0, 'Worker B stdout must contain JSON followed by receiptSha256 line', { stdout });
  const receiptMatch = lines[receiptLineIndex].trim().match(receiptLinePattern);
  const report = JSON.parse(lines.slice(0, receiptLineIndex).join('\n').trim());
  assert(receiptMatch[1].toLowerCase() === identities.receipt, 'Worker B stdout receiptSha256 mismatch', {
    actual: receiptMatch[1],
    expected: identities.receipt,
  });
  const parsedReceipt = receiptMatch[1].toLowerCase();
  const label = 'Worker B stdout JSON';
  const summary = verifyGraphSummary({ receiptSha256: parsedReceipt, summary: report }, label);
  return { report, summary, receiptSha256: parsedReceipt };
}

function sums(phases) {
  return phases.reduce((total, phase) => ({
    wallMs: total.wallMs + phase.wallMs,
    cpuMicroseconds: total.cpuMicroseconds + phase.cpuMicroseconds,
    sampledAllocationBytes: total.sampledAllocationBytes + phase.sampledAllocationBytes,
    samples: total.samples + phase.samples,
  }), { wallMs: 0, cpuMicroseconds: 0, sampledAllocationBytes: 0, samples: 0 });
}

function parseArguments(argv) {
  return { force: argv.includes('--force'), positional: argv.filter((arg) => arg !== '--force') };
}

async function cleanupOwned(root, marker) {
  if (!root) return;
  const resolvedRoot = resolve(root);
  assert(resolvedRoot.startsWith('/private/tmp/row5-profile-'), 'refusing unowned cleanup root', { root: resolvedRoot });
  assert(await exists(join(resolvedRoot, marker)), 'owned cleanup marker is missing', { root: resolvedRoot, marker });
  await rm(resolvedRoot, { recursive: true, force: true });
}

async function orchestrator(argv) {
  const { force, positional } = parseArguments(argv);
  const outputPath = resolve(positional[0] || join(thisDirectory, 'ROW5-PERFORMANCE-PROFILE-CURRENT.json'));
  assert(force || !(await exists(outputPath)), `refusing to overwrite output without --force: ${outputPath}`);
  const repositoryRoot = await currentRepository();
  const marker = '.row5-owned';
  let ownedRoot;
  try {
    ownedRoot = await mkdtemp('/private/tmp/row5-profile-');
    await writeFile(join(ownedRoot, marker), `${process.pid}\n`);
    const clone = join(ownedRoot, 'clone');
    await runCommand('git', ['clone', '--shared', '--no-checkout', repositoryRoot, clone]);
    await git(clone, ['checkout', '--detach', candidateCommit]);
    await assertCandidate(clone);
    const nodeModules = join(repositoryRoot, 'node_modules');
    assert(await exists(nodeModules), 'current repository node_modules is required');
    await symlink(nodeModules, join(clone, 'node_modules'), 'junction');
    const workerAPath = join(ownedRoot, 'worker-a.json');
    const workerBPath = join(ownedRoot, 'worker-b.json');
    const workerAArgs = ['--expose-gc', thisFile, '--worker-a', clone, workerAPath];
    const workerA = await commandResult(process.execPath, workerAArgs, {
      cwd: repositoryRoot,
      env: { ...process.env },
    });
    const workerARecord = commandRecord(process.execPath, workerAArgs, workerA);
    assert(await exists(workerAPath), 'Worker A result was not written');
    const workerAJson = await readJson(workerAPath);
    assert(workerA.status === 0 && workerAJson.pass, 'Worker A failed', { workerA: workerARecord, result: workerAJson });
    assert(workerAJson.phases.length === 2, 'Worker A did not return A1 and A2');
    const workerBArgs = ['--expose-gc', '--import', thisFile, files.generator, '--check'];
    const workerB = await commandResult(process.execPath, workerBArgs, {
      cwd: clone,
      env: {
        ...process.env,
        ROW5_PROFILE_PRELOAD: '1',
        ROW5_PROFILE_RESULT_PATH: workerBPath,
        ROW5_PROFILE_REPOSITORY_ROOT: clone,
      },
    });
    const workerBRecord = commandRecord(process.execPath, workerBArgs, workerB);
    const stdout = parseWorkerBStdout(workerB.stdout);
    assert(await exists(workerBPath), 'Worker B result was not written');
    const workerBJson = await readJson(workerBPath);
    assert(workerB.status === 0 && workerBJson.pass, 'Worker B failed', { workerB: workerBRecord, result: workerBJson });
    assert(workerBJson.phase.summary.nodes === stdout.summary.nodes, 'Worker B stdout nodes disagree with artifact result');
    assert(workerBJson.phase.summary.internalEdges === stdout.summary.internalEdges, 'Worker B stdout internalEdges disagree with artifact result');
    assert(workerBJson.phase.summary.externalEdges === stdout.summary.externalEdges, 'Worker B stdout externalEdges disagree with artifact result');
    assert(workerBJson.phase.summary.unmodeledFileOperations === stdout.summary.unmodeledFileOperations, 'Worker B stdout unmodeledFileOperations disagree with artifact result');
    await assertCandidate(clone);
    const [A1, A2] = workerAJson.phases;
    const B = workerBJson.phase;
    const identity = await gitIdentity(clone);
    const output = {
      schema,
      generatedAt: new Date().toISOString(),
      runtime: {
        node: process.version,
        execPath: process.execPath,
        platform: process.platform,
        arch: process.arch,
        versions: process.versions,
      },
      candidate: {
        commit: identity.commit,
        tree: identity.tree,
        expectedCommit: candidateCommit,
        expectedTree: candidateTree,
      },
      harnessSha256: await sha256File(thisFile),
      identities,
      raw: { A1, A2, B },
      commands: { workerA: workerARecord, workerB: workerBRecord },
      limits: {
        phaseWallMs: phaseLimitMs,
        timing: 'nondeterministic',
        sampledAllocation: 'sampled bytes/count come only from HeapProfiler profile.samples; not exact allocations',
      },
      derived: {
        currentAfter: { label: 'raw A1 cold phase', ...A1 },
        legacyCurrentTreeCounterfactual: {
          label: 'A1+B sums; no historical comparison',
          ...sums([A1, B]),
        },
        warmControl: { label: 'raw A2 warm control; never summed', ...A2 },
      },
      semantics: {
        memoryUsage: 'occupancy snapshot from process.memoryUsage()',
        maxRSS: 'process.resourceUsage().maxRSS cumulative high-water; on macOS the unit is KiB; A2 is cumulative',
        sampledAllocation: 'profile.samples sampled allocation bytes/count, not exact allocations',
      },
      pass: true,
    };
    await writeFile(outputPath, JSON.stringify(output, null, 2));
  } finally {
    await cleanupOwned(ownedRoot, marker);
  }
}

async function main() {
  if (process.env.ROW5_PROFILE_PRELOAD === '1') {
    await preloadProfiler();
    return;
  }
  if (process.argv.includes('--worker-a')) {
    const index = process.argv.indexOf('--worker-a');
    await workerA(process.argv[index + 1], process.argv[index + 2]);
    return;
  }
  await orchestrator(process.argv.slice(2));
}

await main();
