// @glass-invariant architecture.clean-break integrity.build-package integrity.dag integrity.lineage

import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import {
    chmodSync,
    cpSync,
    existsSync,
    lstatSync,
    mkdirSync,
    mkdtempSync,
    readFileSync,
    realpathSync,
    rmSync,
    symlinkSync,
    unlinkSync,
    writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, relative, resolve, sep } from "node:path";
import { describe, expect, it } from "vitest";

import {
    INTEGRATION_ADJUNCTS,
    canonicalJson,
    validateFormationTreeClosure,
} from "../../scripts/tranche/bootstrap-receipt.mjs";
import { runMutationContract } from "../../scripts/verification/mutation-fixtures.mjs";
import {
    CHILD_ENVIRONMENT_REMOVAL_POLICY,
    EXIT,
    canonicalMutationContext,
    canonicalizeVitestReport,
    createRepositoryView,
    evaluateCanonicalCommandResults,
    evaluateInstallerBehavior,
    inspectPackedArtifactClosure,
    liveModuleSpecifiers,
    materializeExactRepositoryView,
    normalizeRuntimeImportFailure,
    overlayRepositoryView,
    parseCommitTrailers,
    parseVerifierArgs,
    sanitizedRepositoryEnvironment,
    snapshotExactExecutionInputs,
    validateAnchoredDag,
    validateCiCheckoutSource,
    validateCommitTrailers,
    validateCurrentRedRouting,
    validateExactExecutionInputs,
    validateObservationCoverage,
    verifyBootstrapStructure,
} from "../../scripts/verify.mjs";

const ROOT = resolve(import.meta.dirname, "../..");
const VERIFY = resolve(ROOT, "scripts/verify.mjs");
const SELF_TESTS = [
    "tests/tranche/bootstrap-receipt.test.ts",
    "tests/verification/engine.test.ts",
    "tests/verification/external-scenario-contract.test.ts",
];
const FAMILIES = [
    "architecture.clean-break",
    "integrity.build-package",
    "integrity.dag",
    "integrity.lineage",
];

function sha256(value: string): string {
    return createHash("sha256").update(value).digest("hex");
}

function git(root: string, args: string[]): string {
    return execFileSync("git", ["-C", root, ...args], { encoding: "utf8" }).trim();
}

function isOutside(owner: string, candidate: string): boolean {
    const path = relative(owner, candidate);
    return path === ".." || path.startsWith(`..${sep}`);
}

function tempRepository(files: Record<string, string> = {
    "package.json": "{\"private\":true}\n",
    "tracked.txt": "head\n",
}): string {
    const root = realpathSync(mkdtempSync(resolve(tmpdir(), "glass-p000-engine-")));
    git(root, ["init", "-q"]);
    git(root, ["config", "user.email", "p000@example.invalid"]);
    git(root, ["config", "user.name", "P000 Fixture"]);
    for (const [path, contents] of Object.entries(files)) {
        mkdirSync(dirname(resolve(root, path)), { recursive: true });
        writeFileSync(resolve(root, path), contents);
    }
    git(root, ["add", "."]);
    git(root, ["commit", "-q", "-m", "fixture"]);
    mkdirSync(resolve(root, "node_modules"), { recursive: true });
    return root;
}

function repositoryView(files: Record<string, string>, modes: Record<string, string> = {}) {
    const bytes = new Map(Object.entries(files).map(([path, source]) => [path, Buffer.from(source)]));
    const paths = new Set(bytes.keys());
    return {
        entries: [...paths].map((path) => ({ path, oid: sha256(bytes.get(path)!.toString()).slice(0, 40), mode: modes[path] ?? "100644" })),
        paths,
        has: (path: string) => paths.has(path),
        oid: (path: string) => paths.has(path) ? sha256(bytes.get(path)!.toString()).slice(0, 40) : null,
        mode: (path: string) => paths.has(path) ? modes[path] ?? "100644" : null,
        read: (path: string) => bytes.get(path) ?? Buffer.alloc(0),
    };
}

function structureFixture(extra: Record<string, string> = {}) {
    const plan = {
        infrastructureDeletionPaths: ["scripts/proof-retired.mjs"],
        packageAliasDeletions: [],
        retainedPackageScripts: [{ key: "test", postP000Command: "vitest run" }],
        activeCommandSurfaces: [],
    };
    const files = {
        "package.json": `${JSON.stringify({ scripts: { test: "vitest run" } })}\n`,
        "scripts/verify.mjs": "export {};\n",
        ...extra,
    };
    const modes = { "scripts/verify.mjs": "100755" };
    return { plan, view: repositoryView(files, modes) };
}

function processPass(stdout = ""): any {
    return { argv: ["fixture"], exitCode: 0, signal: null, error: null, stdout, stderr: "" };
}

function typedObservation(family: string) {
    const body = {
        kind: `fixture-${family}`,
        status: "PASS",
        invariantFamilies: [family],
        sourcePayloadDigest: "a".repeat(64),
        payload: { observed: true },
    };
    return { ...body, evidenceDigest: sha256(canonicalJson(body)) };
}

describe("exact repository views", () => {
    it("materializes outside the repository and Git directory and removes the isolated tree on cleanup", () => {
        const root = tempRepository();
        let exactDirectory: string | null = null;
        try {
            const exact = materializeExactRepositoryView({ root, view: "index" });
            exactDirectory = exact.directory;
            expect(isOutside(root, exact.directory)).toBe(true);
            expect(isOutside(realpathSync(resolve(root, ".git")), exact.directory)).toBe(true);
            expect(existsSync(exact.directory)).toBe(true);
            exact.cleanup();
            expect(existsSync(exact.directory)).toBe(false);
        } finally {
            if (exactDirectory) rmSync(exactDirectory, { recursive: true, force: true });
            rmSync(root, { recursive: true, force: true });
        }
    });

    it("materializes staged bytes and paths without borrowing ambient worktree state", () => {
        const root = tempRepository();
        try {
            writeFileSync(resolve(root, "tracked.txt"), "indexed\n");
            writeFileSync(resolve(root, "index-only.txt"), "staged only\n");
            git(root, ["add", "tracked.txt", "index-only.txt"]);
            writeFileSync(resolve(root, "tracked.txt"), "ambient\n");
            unlinkSync(resolve(root, "index-only.txt"));
            writeFileSync(resolve(root, "ambient-only.txt"), "worktree only\n");

            const exact = materializeExactRepositoryView({ root, view: "index" });
            try {
                expect(readFileSync(resolve(exact.directory, "tracked.txt"), "utf8")).toBe("indexed\n");
                expect(readFileSync(resolve(exact.directory, "index-only.txt"), "utf8")).toBe("staged only\n");
                expect(existsSync(resolve(exact.directory, "ambient-only.txt"))).toBe(false);
                expect(readFileSync(resolve(root, "tracked.txt"), "utf8")).toBe("ambient\n");
            } finally {
                exact.cleanup();
            }
        } finally {
            rmSync(root, { recursive: true, force: true });
        }
    });

    it("runs one setup-dependent engine child from a synthetic exact index without recursive self-invocation", () => {
        const root = tempRepository({
            "package.json": `${JSON.stringify({ private: true, type: "module" })}\n`,
            "vitest.config.ts": [
                'import { defineConfig } from "vitest/config";',
                'export default defineConfig({ test: { environment: "node", setupFiles: ["./tests/setup.ts"] } });',
                "",
            ].join("\n"),
            "tests/setup.ts": '(globalThis as any).__GLASS_EXACT_SETUP_LOADED__ = true;\n',
            "tests/verification/engine-exact-child.test.ts": [
                'import { expect, it } from "vitest";',
                'it("loads the exact-view setup file", () => {',
                '    expect((globalThis as any).__GLASS_EXACT_SETUP_LOADED__).toBe(true);',
                '});',
                "",
            ].join("\n"),
        });
        let exactDirectory: string | null = null;
        try {
            rmSync(resolve(root, "node_modules"), { recursive: true, force: true });
            symlinkSync(resolve(ROOT, "node_modules"), resolve(root, "node_modules"), "dir");
            const exact = materializeExactRepositoryView({ root, view: "index" });
            exactDirectory = exact.directory;
            try {
                expect(isOutside(root, exact.directory)).toBe(true);
                expect(isOutside(realpathSync(resolve(root, ".git")), exact.directory)).toBe(true);
                const child = spawnSync(process.execPath, [
                    resolve(exact.directory, "node_modules/vitest/vitest.mjs"),
                    "run",
                    "tests/verification/engine-exact-child.test.ts",
                    "--reporter=dot",
                ], {
                    cwd: exact.directory,
                    env: sanitizedRepositoryEnvironment(),
                    encoding: "utf8",
                    timeout: 20_000,
                });
                if (child.status !== 0) throw new Error(`exact-view Vitest child failed:\n${child.stdout}\n${child.stderr}`);
                expect(`${child.stdout}\n${child.stderr}`).toMatch(/1 passed/);
            } finally {
                exact.cleanup();
                expect(existsSync(exact.directory)).toBe(false);
            }
        } finally {
            if (exactDirectory) rmSync(exactDirectory, { recursive: true, force: true });
            rmSync(root, { recursive: true, force: true });
        }
    });

    it("returns defensive blob-cache and overlay copies without corrupting pristine reads", () => {
        const root = tempRepository();
        try {
            const view = createRepositoryView(root, "index");
            const first = view.read("tracked.txt");
            expect(first.toString("utf8")).toBe("head\n");
            expect(view.cacheStats()).toEqual({ entries: 1, hits: 0, misses: 1 });
            first.fill(0);
            expect(view.read("tracked.txt").toString("utf8")).toBe("head\n");
            const statsBeforeOverlay = view.cacheStats();

            const overlay = overlayRepositoryView(view, {
                "tracked.txt": { bytes: Buffer.from("overlay\n"), mode: "100644" },
            });
            const overlayRead = overlay.read("tracked.txt");
            overlayRead.fill(0);
            expect(overlay.read("tracked.txt").toString("utf8")).toBe("overlay\n");
            expect(view.cacheStats()).toEqual(statsBeforeOverlay);
            expect(view.read("tracked.txt").toString("utf8")).toBe("head\n");
            expect(view.cacheStats()).toEqual({ entries: 1, hits: 2, misses: 1 });
        } finally {
            rmSync(root, { recursive: true, force: true });
        }
    });

    it("materializes a historical commit instead of the current checkout", () => {
        const root = tempRepository();
        try {
            const historical = git(root, ["rev-parse", "HEAD"]);
            writeFileSync(resolve(root, "tracked.txt"), "current commit\n");
            git(root, ["add", "tracked.txt"]);
            git(root, ["commit", "-q", "-m", "current"]);
            writeFileSync(resolve(root, "tracked.txt"), "ambient after commit\n");

            const exact = materializeExactRepositoryView({ root, view: "commit", ref: historical });
            try {
                expect(readFileSync(resolve(exact.directory, "tracked.txt"), "utf8")).toBe("head\n");
                expect(exact.treeOid).toBe(git(root, ["rev-parse", `${historical}^{tree}`]));
            } finally {
                exact.cleanup();
            }
        } finally {
            rmSync(root, { recursive: true, force: true });
        }
    });

    it("refuses an ambient workspace dependency absent from the exact view", () => {
        const root = tempRepository({ "package.json": "{\"private\":true}\n" });
        try {
            mkdirSync(resolve(root, "tests-visual"));
            writeFileSync(resolve(root, "tests-visual/package.json"), "{\"name\":\"@mkbabb/glass-ui-tests-visual\"}\n");
            mkdirSync(resolve(root, "node_modules/@mkbabb"), { recursive: true });
            symlinkSync(resolve(root, "tests-visual"), resolve(root, "node_modules/@mkbabb/glass-ui-tests-visual"), "dir");
            // Force tracked files through Git blobs so this case reaches the
            // workspace-overlay branch even on filesystems without reflinks.
            writeFileSync(resolve(root, "package.json"), "{\"private\":false}\n");
            expect(() => materializeExactRepositoryView({ root, view: "index" })).toThrow(/workspace dependency.*absent from the exact repository view/);
        } finally {
            rmSync(root, { recursive: true, force: true });
        }
    });

    it("rebinds a workspace dependency to the exact tests-visual tree", () => {
        const root = tempRepository({
            "package.json": "{\"private\":true}\n",
            "tests-visual/package.json": "{\"name\":\"@mkbabb/glass-ui-tests-visual\",\"source\":\"indexed\"}\n",
        });
        try {
            mkdirSync(resolve(root, "node_modules/@mkbabb"), { recursive: true });
            symlinkSync(resolve(root, "tests-visual"), resolve(root, "node_modules/@mkbabb/glass-ui-tests-visual"), "dir");
            writeFileSync(
                resolve(root, "tests-visual/package.json"),
                "{\"name\":\"@mkbabb/glass-ui-tests-visual\",\"source\":\"ambient\"}\n",
            );

            const exact = materializeExactRepositoryView({ root, view: "index" });
            try {
                const dependency = resolve(exact.directory, "node_modules/@mkbabb/glass-ui-tests-visual");
                const exactWorkspace = resolve(exact.directory, "tests-visual");
                expect(realpathSync(dependency)).toBe(realpathSync(exactWorkspace));
                expect(realpathSync(dependency)).not.toBe(realpathSync(resolve(root, "tests-visual")));
                expect(readFileSync(resolve(dependency, "package.json"), "utf8")).toContain('"source":"indexed"');
                expect(readFileSync(resolve(root, "tests-visual/package.json"), "utf8")).toContain('"source":"ambient"');
                expect(exact.materialization.workspaceDependencyLinks).toEqual([
                    expect.objectContaining({
                        dependencyPath: "@mkbabb/glass-ui-tests-visual",
                        repositoryPath: "tests-visual",
                        targetWithinExactView: "tests-visual",
                    }),
                ]);
            } finally {
                exact.cleanup();
            }
        } finally {
            rmSync(root, { recursive: true, force: true });
        }
    });

    it("keeps materialization evidence relative and stable across repeated views and integration adjuncts", () => {
        const root = tempRepository();
        const materializations: any[] = [];
        const capture = () => {
            const exact = materializeExactRepositoryView({ root, view: "index" });
            try {
                const evidence = structuredClone(exact.materialization);
                const serialized = JSON.stringify(evidence);
                expect(serialized).not.toContain(root);
                expect(serialized).not.toContain(exact.directory);
                materializations.push(evidence);
                return evidence;
            } finally {
                exact.cleanup();
            }
        };
        try {
            const pristine = capture();
            expect(capture()).toEqual(pristine);

            for (const [index, path] of INTEGRATION_ADJUNCTS.entries()) {
                mkdirSync(dirname(resolve(root, path)), { recursive: true });
                writeFileSync(resolve(root, path), `adjunct-${index}\n`);
                git(root, ["add", path]);
                expect(capture()).toEqual(pristine);
            }

            writeFileSync(resolve(root, "foreign.json"), "{}\n");
            git(root, ["add", "foreign.json"]);
            expect(capture()).not.toEqual(pristine);
            expect(materializations).toHaveLength(2 + INTEGRATION_ADJUNCTS.length + 1);
        } finally {
            rmSync(root, { recursive: true, force: true });
        }
    });
});

describe("exact execution input immutability", () => {
    const excludedTopLevelPaths = [
        ".git",
        "node_modules",
        "dist",
        ".cache",
        ".vite",
        ".vitest",
        ".tmp",
    ];

    it("rejects bytes, mode, added, and deleted path drift and restores the original digest", () => {
        const container = realpathSync(mkdtempSync(resolve(tmpdir(), "glass-p000-inputs-")));
        const root = resolve(container, "execution");
        const tracked = resolve(root, "tracked.txt");
        const deletable = resolve(root, "delete-me.txt");
        try {
            mkdirSync(root);
            writeFileSync(tracked, "tracked\n");
            writeFileSync(deletable, "delete me\n");
            mkdirSync(resolve(root, "src/dist"), { recursive: true });
            writeFileSync(resolve(root, "src/dist/nested-kept.txt"), "nested dist is an input\n");
            for (const path of excludedTopLevelPaths) {
                mkdirSync(resolve(root, path), { recursive: true });
                writeFileSync(resolve(root, path, "ignored.txt"), `${path}\n`);
            }

            const trackedMode = lstatSync(tracked).mode & 0o7777;
            const deletableMode = lstatSync(deletable).mode & 0o7777;
            const baseline = snapshotExactExecutionInputs(root);
            expect(excludedTopLevelPaths).toHaveLength(7);
            for (const excluded of excludedTopLevelPaths) {
                expect(baseline.entries.some((entry: any) => entry.path === excluded || entry.path.startsWith(`${excluded}/`))).toBe(false);
            }
            expect(baseline.entries.some((entry: any) => entry.path === "src/dist/nested-kept.txt")).toBe(true);
            expect(validateExactExecutionInputs(baseline, snapshotExactExecutionInputs(root), { phase: "baseline" })).toMatchObject({ ok: true, errors: [] });

            writeFileSync(tracked, "changed\n");
            chmodSync(tracked, (trackedMode & 0o111) === 0 ? 0o755 : 0o644);
            const modified = validateExactExecutionInputs(baseline, snapshotExactExecutionInputs(root), { phase: "build" });
            expect(modified.ok).toBe(false);
            expect(modified.evidence.changedPaths).toContainEqual(expect.objectContaining({
                path: "tracked.txt",
                changes: expect.arrayContaining(["bytes", "mode"]),
            }));
            writeFileSync(tracked, "tracked\n");
            chmodSync(tracked, trackedMode);

            const foreign = resolve(root, "foreign-output.txt");
            writeFileSync(foreign, "foreign\n");
            const added = validateExactExecutionInputs(baseline, snapshotExactExecutionInputs(root), { phase: "typecheck" });
            expect(added).toMatchObject({ ok: false, evidence: { addedPaths: ["foreign-output.txt"] } });
            rmSync(foreign);

            rmSync(deletable);
            const deleted = validateExactExecutionInputs(baseline, snapshotExactExecutionInputs(root), { phase: "test" });
            expect(deleted).toMatchObject({ ok: false, evidence: { deletedPaths: ["delete-me.txt"] } });
            writeFileSync(deletable, "delete me\n");
            chmodSync(deletable, deletableMode);

            const restored = snapshotExactExecutionInputs(root);
            expect(restored.digest).toBe(baseline.digest);
            expect(validateExactExecutionInputs(baseline, restored, { phase: "restored" })).toMatchObject({ ok: true, errors: [] });
        } finally {
            rmSync(container, { recursive: true, force: true });
        }
    });

    it("records symlink identity without traversal and rejects target or type drift", () => {
        const container = realpathSync(mkdtempSync(resolve(tmpdir(), "glass-p000-symlink-")));
        const root = resolve(container, "execution");
        const outside = resolve(container, "outside");
        const link = resolve(root, "external-link");
        try {
            mkdirSync(root);
            mkdirSync(outside);
            writeFileSync(resolve(outside, "secret.txt"), "outside baseline\n");
            symlinkSync("../outside", link, "dir");
            const baseline = snapshotExactExecutionInputs(root);
            expect(baseline.entries).toContainEqual(expect.objectContaining({
                path: "external-link",
                type: "symlink",
                target: "../outside",
            }));
            expect(baseline.entries.some((entry: any) => entry.path.startsWith("external-link/"))).toBe(false);

            writeFileSync(resolve(outside, "secret.txt"), "outside changed\n");
            expect(snapshotExactExecutionInputs(root).digest).toBe(baseline.digest);

            unlinkSync(link);
            symlinkSync("../outside-two", link, "dir");
            const targetDrift = validateExactExecutionInputs(baseline, snapshotExactExecutionInputs(root), { phase: "pack" });
            expect(targetDrift.evidence.changedPaths).toContainEqual({ path: "external-link", changes: ["target"] });

            unlinkSync(link);
            mkdirSync(link);
            const typeDrift = validateExactExecutionInputs(baseline, snapshotExactExecutionInputs(root), { phase: "pack" });
            expect(typeDrift.ok).toBe(false);
            expect(typeDrift.evidence.changedPaths).toContainEqual(expect.objectContaining({
                path: "external-link",
                changes: expect.arrayContaining(["type"]),
            }));

            rmSync(link, { recursive: true, force: true });
            symlinkSync("../outside", link, "dir");
            const restored = snapshotExactExecutionInputs(root);
            expect(restored.digest).toBe(baseline.digest);
            expect(validateExactExecutionInputs(baseline, restored, { phase: "restored" })).toMatchObject({ ok: true, errors: [] });
        } finally {
            rmSync(container, { recursive: true, force: true });
        }
    });
});

describe("live executable reference discovery", () => {
    it.each([
        {
            path: "src/Fixture.tsx",
            source: "import retired from '../scripts/proof-retired.mjs'; export const Fixture = () => <div>{retired}</div>;\n",
            kind: "module",
        },
        {
            path: "src/Fixture.vue",
            source: "<script src=\"../scripts/proof-retired.mjs\"></script><template><div /></template>\n",
            kind: "vue-script-src",
        },
        {
            path: "scripts/fixture.ts",
            source: "import { spawn as launch } from 'node:child_process'; const retired = './proof-retired.mjs'; launch(process.execPath, [retired]);\n",
            kind: "launch",
        },
    ])("finds $kind references in $path and restores to a pristine PASS", ({ path, source, kind }) => {
        const references = liveModuleSpecifiers(source, path);
        expect(references).toContainEqual(expect.objectContaining({ kind, value: expect.stringContaining("proof-retired.mjs") }));
        const mutated = structureFixture({ [path]: source });
        expect(verifyBootstrapStructure(mutated.plan, mutated.view)).toMatchObject({ ok: false });
        const restoredSource = path.endsWith(".vue")
            ? "<script setup lang=\"ts\">export {};</script><template><div /></template>\n"
            : "export {};\n";
        const restored = structureFixture({ [path]: restoredSource });
        expect(verifyBootstrapStructure(restored.plan, restored.view)).toMatchObject({ ok: true, errors: [] });
    });

    it("fails closed when a live Vue source cannot be parsed", () => {
        const malformed = "<script src=\"../scripts/proof-retired.mjs\">";
        expect(() => liveModuleSpecifiers(malformed, "src/Broken.vue")).toThrow(/cannot parse/);
        const fixture = structureFixture({ "src/Broken.vue": malformed });
        const result = verifyBootstrapStructure(fixture.plan, fixture.view);
        expect(result.ok).toBe(false);
        expect(result.errors).toEqual(expect.arrayContaining([expect.stringMatching(/reference analysis failed closed/)]));
        const restored = structureFixture({ "src/Broken.vue": "<template><div /></template>\n" });
        expect(verifyBootstrapStructure(restored.plan, restored.view)).toMatchObject({ ok: true });
    });
});

describe("CI checkout source contract", () => {
    it("requires the exact PR-head/push-SHA ref and full first-parent history", () => {
        const source = [
            "name: CI fixture",
            "jobs:",
            "  verify:",
            "    steps:",
            "      - uses: actions/checkout@v4",
            "        with:",
            "          fetch-depth: 0",
            "          ref: ${{ github.event_name == 'pull_request' && github.event.pull_request.head.sha || github.sha }}",
            "      - run: npm test",
            "",
        ].join("\n");
        expect(validateCiCheckoutSource(source)).toMatchObject({ ok: true, errors: [] });

        const absentRef = source.replace(/^\s*ref:.*\n/m, "");
        expect(validateCiCheckoutSource(absentRef).errors.join("\n")).toMatch(/pull-request head SHA and github\.sha/);

        const githubShaOnly = source.replace("${{ github.event_name == 'pull_request' && github.event.pull_request.head.sha || github.sha }}", "${{ github.sha }}");
        expect(validateCiCheckoutSource(githubShaOnly).errors.join("\n")).toMatch(/pull-request head SHA and github\.sha/);

        const shallow = source.replace(/^\s*fetch-depth: 0\n/m, "");
        expect(validateCiCheckoutSource(shallow).errors.join("\n")).toMatch(/fetch-depth: 0/);
    });
});

describe("structured ordinary-task evidence", () => {
    const evidencePlan = {
        sources: SELF_TESTS.map((path, index) => ({
            kind: "normal-test",
            path,
            sha256: String(index + 1).repeat(64),
            assertions: [{ callee: "expect.toBe", line: 1, column: 1 }],
            invariantFamilies: [FAMILIES[index % FAMILIES.length]],
        })),
    };
    const view = { oid: (path: string) => SELF_TESTS.includes(path) ? "b".repeat(40) : null };
    const reportFor = (paths: string[]) => ({
        testResults: paths.map((path) => ({
            name: resolve("/exact-view", path),
            status: "passed",
            assertionResults: [{ fullName: `${path} semantic behavior`, status: "passed" }],
        })),
    });

    it("requires every enrolled self-test in structured Vitest output", () => {
        const pristine = canonicalizeVitestReport(reportFor(SELF_TESTS), {
            executionRoot: "/exact-view", view, evidencePlan, requiredSelfTests: SELF_TESTS,
        });
        expect(pristine).toMatchObject({ ok: true, errors: [] });
        for (const omitted of SELF_TESTS) {
            const result = canonicalizeVitestReport(reportFor(SELF_TESTS.filter((path) => path !== omitted)), {
                executionRoot: "/exact-view", view, evidencePlan, requiredSelfTests: SELF_TESTS,
            });
            expect(result.ok).toBe(false);
            expect(result.errors.join("\n")).toContain(omitted);
            expect(canonicalizeVitestReport(reportFor(SELF_TESTS), {
                executionRoot: "/exact-view", view, evidencePlan, requiredSelfTests: SELF_TESTS,
            }).ok).toBe(true);
        }
    });

    it.each(["skipped", "todo", "pending"])("rejects %s assertion laundering beneath a passed Vitest file", (status) => {
        const report = reportFor(SELF_TESTS) as any;
        report.testResults[0].assertionResults[0].status = status;
        const result = canonicalizeVitestReport(report, {
            executionRoot: "/exact-view", view, evidencePlan, requiredSelfTests: SELF_TESTS,
        });
        expect(result.ok).toBe(false);
        expect(result.errors.join("\n")).toMatch(/lacks structured all-PASS assertion execution/);
    });

    it("does not accept executor exit codes and PASS prose in place of semantic adapters", () => {
        const fake = processPass("all tests passed; package complete; hook installed");
        const laundered = evaluateCanonicalCommandResults({
            typecheck: fake, test: fake, build: fake, pack: fake,
            vitest: null, packageClosure: null, installer: null,
        });
        expect(laundered.ok).toBe(false);
        expect(laundered.errors).toEqual(expect.arrayContaining([
            expect.stringMatching(/Vitest.*absent/),
            expect.stringMatching(/packed artifact.*absent/),
            expect.stringMatching(/installer.*absent/),
            expect.stringMatching(/exact execution input immutability.*absent/),
        ]));
        const structured = { ok: true, errors: [], failures: [], evidence: { source: "structured fixture" } };
        expect(evaluateCanonicalCommandResults({
            typecheck: fake, test: fake, build: fake, pack: fake,
            vitest: structured, packageClosure: structured, installer: structured, inputImmutability: structured,
        })).toMatchObject({ ok: true, errors: [] });
    });

    it("makes immutability RED non-routable and preserves build-to-pack provenance order", () => {
        const structured = { ok: true, errors: [], failures: [], evidence: { source: "structured fixture" } };
        const task = (label: string) => ({ ...processPass(), argv: [label] });
        const inputImmutability = {
            ok: false,
            errors: ["test: changed exact execution input package.json (bytes)"],
            evidence: { baselineDigest: "a".repeat(64), phases: [] },
        };
        const result = evaluateCanonicalCommandResults({
            build: task("build"),
            typecheck: task("typecheck"),
            test: task("test"),
            pack: task("pack"),
            vitest: structured,
            packageClosure: structured,
            installer: structured,
            inputImmutability,
        });
        expect(result.ok).toBe(false);
        expect(result.failures).toEqual([
            expect.objectContaining({
                invariantFamily: "architecture.clean-break",
                routable: false,
                summary: expect.stringMatching(/^exact execution input immutability:/),
            }),
        ]);
        expect(result.evidence.ordinaryTaskProvenance.map((item: any) => item.argv[0])).toEqual([
            "build",
            "typecheck",
            "test",
            "pack",
        ]);
        expect(result.evidence.exactExecutionInputImmutability).toEqual(inputImmutability.evidence);
    });
});

describe("packed public artifact closure", () => {
    const inspectFixture = (files: Record<string, string>) => {
        const root = realpathSync(mkdtempSync(resolve(tmpdir(), "glass-p000-package-")));
        try {
            for (const [path, source] of Object.entries(files)) {
                mkdirSync(dirname(resolve(root, path)), { recursive: true });
                writeFileSync(resolve(root, path), source);
            }
            return inspectPackedArtifactClosure(root, [{ files: Object.keys(files).map((path) => ({ path })) }]);
        } finally {
            rmSync(root, { recursive: true, force: true });
        }
    };
    const publicPackage = () => ({
        name: "@fixture/public-types",
        type: "module",
        types: "./dist/index.d.ts",
        exports: { ".": { types: "./dist/index.d.ts", import: "./dist/index.js" } },
    });
    const publicFiles = (packageJson: any) => ({
        "package.json": `${JSON.stringify(packageJson)}\n`,
        "dist/index.js": "export const fixture = true;\n",
        "dist/index.d.ts": "export interface Fixture { readonly ok: true }\n",
    });

    it("accepts a packed public declaration target", () => {
        expect(inspectFixture(publicFiles(publicPackage()))).toMatchObject({ ok: true, errors: [] });
    });

    it.each([
        {
            label: "escaped public types export",
            mutate(value: any) { value.exports["."].types = "../src/bad.d.ts"; },
            diagnostic: /package export target must be rooted \./,
        },
        {
            label: "missing public types export",
            mutate(value: any) { value.exports["."].types = "./missing.d.ts"; },
            diagnostic: /omits declared package target missing\.d\.ts/,
        },
        {
            label: "boolean public export leaf",
            mutate(value: any) { value.exports["."].types = true; },
            diagnostic: /export target leaf must be a string, object, array, or null/,
        },
        {
            label: "escaped typesVersions mapping",
            mutate(value: any) { value.typesVersions = { "*": { "*": ["../src/*"] } }; },
            diagnostic: /target escapes or names a forbidden package segment/,
        },
        {
            label: "escaped top-level types target",
            mutate(value: any) { value.types = "../src/bad.d.ts"; },
            diagnostic: /target escapes or names a forbidden package segment/,
        },
        {
            label: "missing top-level types target",
            mutate(value: any) { value.types = "./missing.d.ts"; },
            diagnostic: /omits declared package target missing\.d\.ts/,
        },
        {
            label: "percent-encoded dot export segment",
            mutate(value: any) { value.exports["."].types = "./dist/%2e%2e/bad.d.ts"; },
            diagnostic: /target escapes or names a forbidden package segment/,
        },
    ])("rejects $label", ({ mutate, diagnostic }) => {
        const packageJson = publicPackage();
        mutate(packageJson);
        const result = inspectFixture(publicFiles(packageJson));
        expect(result.ok).toBe(false);
        expect(result.errors.join("\n")).toMatch(diagnostic);
    });

    it("rejects mixed export-map keys through the public package import", () => {
        const result = inspectFixture({
            "package.json": `${JSON.stringify({
                name: "@fixture/mixed-exports",
                type: "module",
                exports: { ".": "./index.js", import: "./index.js" },
            })}\n`,
            "index.js": "export const fixture = true;\n",
        });
        expect(result.ok).toBe(false);
        expect(result.errors.join("\n")).toMatch(/packed runtime export.*ERR_INVALID_PACKAGE_CONFIG/);
    });

    it("rejects an unresolved declaration ImportTypeNode", () => {
        const result = inspectFixture({
            "package.json": `${JSON.stringify({
                name: "@fixture/import-type",
                type: "module",
                types: "./index.d.ts",
                exports: { ".": { types: "./index.d.ts", import: "./index.js" } },
            })}\n`,
            "index.js": "export const fixture = true;\n",
            "index.d.ts": "export type Fixture = import('./missing.js').Fixture;\n",
        });
        expect(result.ok).toBe(false);
        expect(result.errors.join("\n")).toContain("declaration import is unresolved in packed artifact: ./missing.js");
    });

    it("normalizes equivalent Node 22 and Node 24 TypeScript-runtime diagnostics", () => {
        const diagnostics = [
            'TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts" for /fixture/node_modules/@mkbabb/pencil-boil/src/index.ts',
            'Error [ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING]: Type stripping is currently unsupported for files under node_modules, for "/fixture/node_modules/@mkbabb/pencil-boil/src/index.ts"',
        ];
        expect(diagnostics.map(normalizeRuntimeImportFailure)).toEqual([
            { failureClass: "UNSUPPORTED_TYPESCRIPT_RUNTIME_DEPENDENCY", dependency: "@mkbabb/pencil-boil" },
            { failureClass: "UNSUPPORTED_TYPESCRIPT_RUNTIME_DEPENDENCY", dependency: "@mkbabb/pencil-boil" },
        ]);
    });
});

describe("typed observations and routed current REDs", () => {
    it("turns RED when attribution for any selected family is removed", () => {
        const pristine = FAMILIES.map(typedObservation);
        expect(validateObservationCoverage(pristine, FAMILIES)).toMatchObject({ ok: true });
        for (const family of FAMILIES) {
            const result = validateObservationCoverage(pristine.filter((item) => !item.invariantFamilies.includes(family)), FAMILIES);
            expect(result.ok).toBe(false);
            expect(result.errors.join("\n")).toContain(family);
            expect(validateObservationCoverage(pristine, FAMILIES).ok).toBe(true);
        }
    });

    it("requires one honest future owner whose authority declares the failure family", () => {
        const failure = { findingId: "BI.P000.CURRENT.fixture", invariantFamily: "integrity.lineage", summary: "fixture source remains RED", routable: true };
        const route = { ...failure, status: "ROUTED_RED", ownerWave: "BI.W-P001", evidencePath: "docs/tranches/BI/BOOTSTRAP.json" };
        const authority = {
            taxonomy: { invariants: [{ id: "integrity.lineage" }] },
            waves: { waves: [{ id: "BI.W-P001", invariantFamilies: ["integrity.lineage"], status: "PLANNED" }] },
        };
        const repositoryView = {
            has: (path: string) => path === route.evidencePath,
            mode: (path: string) => path === route.evidencePath ? "100644" : null,
        };
        expect(validateCurrentRedRouting([failure], [route], authority, repositoryView)).toMatchObject({ ok: true });
        for (const routes of [[], [route, structuredClone(route)], [{ ...route, status: "PASS" }]]) {
            expect(validateCurrentRedRouting([failure], routes, authority, repositoryView).ok).toBe(false);
            expect(validateCurrentRedRouting([failure], [route], authority, repositoryView).ok).toBe(true);
        }
        expect(validateCurrentRedRouting([failure], [route], {
            ...authority,
            waves: { waves: [{ id: "BI.W-P001", invariantFamilies: ["architecture.clean-break"], status: "PLANNED" }] },
        }, repositoryView).ok).toBe(false);

        const arbitrary = { ...route, evidencePath: "docs/tranches/BI/evidence/nonexistent.json" };
        expect(validateCurrentRedRouting([failure], [arbitrary], authority, {
            has: () => true,
            mode: () => "100644",
        }).errors.join("\n")).toMatch(/canonical bootstrap receipt/);
    });

    it("allows planned canonical receipt absence only under the explicit preparation flag", () => {
        const failure = { findingId: "BI.P000.CURRENT.planned", invariantFamily: "integrity.lineage", summary: "planned pre-render route", routable: true };
        const route = { ...failure, status: "ROUTED_RED", ownerWave: "BI.W-P001", evidencePath: "docs/tranches/BI/BOOTSTRAP.json" };
        const authority = {
            taxonomy: { invariants: [{ id: "integrity.lineage" }] },
            waves: { waves: [{ id: "BI.W-P001", invariantFamilies: ["integrity.lineage"], status: "PLANNED" }] },
        };
        const absentView = { has: () => false, mode: () => null };
        expect(validateCurrentRedRouting([failure], [route], authority, absentView).errors.join("\n")).toMatch(/absent from the exact tracked repository view/);
        expect(validateCurrentRedRouting([failure], [route], {
            ...authority,
            allowPlannedBootstrapAdjunct: true,
        }, absentView)).toMatchObject({ ok: true, errors: [] });
    });
});

describe("anchored DAG semantics", () => {
    const pristine = {
        dag: JSON.parse(readFileSync(resolve(ROOT, "docs/tranches/BI/FORMATION/dag.json"), "utf8")),
        waves: JSON.parse(readFileSync(resolve(ROOT, "docs/tranches/BI/FORMATION/waves.json"), "utf8")),
    } as any;
    pristine.sourceBase = pristine.dag.sourceBase;

    it("detects omitted, cyclic, transitive, and stratum-invalid mutations", () => {
        expect(validateAnchoredDag(pristine)).toMatchObject({ ok: true, errors: [] });

        const omitted = structuredClone(pristine);
        omitted.dag.edges.splice(0, 1);
        omitted.dag.edgeCount -= 1;
        expect(validateAnchoredDag(omitted).errors.join("\n")).toMatch(/omits dependsOn edge/);

        const cyclic = structuredClone(pristine);
        const first = cyclic.dag.edges[0];
        cyclic.dag.edges.push({ from: first.to, to: first.from });
        cyclic.dag.edgeCount += 1;
        expect(validateAnchoredDag(cyclic).errors.join("\n")).toMatch(/cyclic/);

        const transitive = structuredClone(pristine);
        const edges = new Set(transitive.dag.edges.map((edge: any) => `${edge.from}\0${edge.to}`));
        const chain = transitive.dag.edges.flatMap((left: any) =>
            transitive.dag.edges.filter((right: any) => right.from === left.to && !edges.has(`${left.from}\0${right.to}`))
                .map((right: any) => ({ from: left.from, to: right.to })),
        )[0];
        expect(chain).toBeDefined();
        transitive.dag.edges.push(chain);
        transitive.dag.edgeCount += 1;
        expect(validateAnchoredDag(transitive).errors.join("\n")).toMatch(/not transitively minimal/);

        const stratum = structuredClone(pristine);
        stratum.dag.strata[0].index = 99;
        expect(validateAnchoredDag(stratum).errors.join("\n")).toMatch(/noncanonical identity\/index/);

        const ceremony = structuredClone(pristine);
        const noncriticalLeaf = ceremony.dag.nodes.find((node: any) =>
            node.id !== ceremony.dag.criticalPath.terminal
            && !ceremony.dag.edges.some((edge: any) => edge.from === node.id),
        );
        expect(noncriticalLeaf).toBeDefined();
        const ceremonyWave = ceremony.waves.waves.find((wave: any) => wave.id === noncriticalLeaf.id);
        for (const subject of ceremonyWave.subjects) {
            subject.action = "verify";
            delete subject.targetPath;
        }
        ceremonyWave.invariantFamilies = [];
        noncriticalLeaf.implicitWriteLeases = [];
        expect(validateAnchoredDag(ceremony).errors.join("\n")).toContain(`anchored DAG leaf ${noncriticalLeaf.id} is ceremony-only`);
        expect(validateAnchoredDag(pristine).ok).toBe(true);
    });
});

describe("mutation evidence boundaries", () => {
    it("excludes only the canonical receipt, attestation, and FINAL adjuncts", () => {
        const base = {
            entries: [{ path: "package.json", mode: "100644", oid: "1".repeat(40) }],
            deltaPaths: ["package.json"],
        };
        const withAdjuncts = {
            entries: [
                ...base.entries,
                ...INTEGRATION_ADJUNCTS.map((path, index) => ({ path, mode: "100644", oid: String(index + 2).repeat(40) })),
            ],
            deltaPaths: [...base.deltaPaths, ...INTEGRATION_ADJUNCTS],
        };
        expect(canonicalMutationContext(withAdjuncts)).toEqual(canonicalMutationContext(base));

        const withForeign = structuredClone(withAdjuncts);
        withForeign.entries.push({ path: "foreign.json", mode: "100644", oid: "9".repeat(40) });
        withForeign.deltaPaths.push("foreign.json");
        expect(canonicalMutationContext(withForeign)).not.toEqual(canonicalMutationContext(base));
    });

    it("plants the production manifest-closure defect in a distinct tree array and restores PASS", () => {
        const manifestPaths = ["dag.json", "waves.json"];
        const treePaths = [...manifestPaths];
        expect(treePaths).not.toBe(manifestPaths);
        expect(validateFormationTreeClosure(manifestPaths, treePaths)).toMatchObject({ ok: true, errors: [] });

        treePaths.push("unlisted.json");
        expect(validateFormationTreeClosure(manifestPaths, treePaths)).toMatchObject({
            ok: false,
            errors: [expect.stringMatching(/unlisted or missing manifest authority path/)],
        });
        expect(manifestPaths).toEqual(["dag.json", "waves.json"]);

        treePaths.pop();
        expect(treePaths).toEqual(manifestPaths);
        expect(validateFormationTreeClosure(manifestPaths, treePaths)).toMatchObject({ ok: true, errors: [] });
    });

    it("rejects omitted required production mutation properties, including dynamic typed attribution", () => {
        const dynamicRequirement = "typed-attribution:integrity.dynamic";
        const omitted = runMutationContract({
            productionCases: [],
            requiredProductionRequirements: [dynamicRequirement],
        });
        expect(omitted.ok).toBe(false);
        expect(omitted.missingProductionRequirements).toEqual(expect.arrayContaining([
            "proof-alias",
            "build-declaration",
            "vitest-skipped",
            dynamicRequirement,
        ]));

        const coveredDynamic = runMutationContract({
            requiredProductionRequirements: [dynamicRequirement],
            productionCases: [{
                adapter: "production-attribution",
                requirement: dynamicRequirement,
                mutation: "remove dynamic typed attribution",
                validatorName: "fixtureDynamicAttribution",
                pristine: { intact: true },
                mutate(value: any) { value.intact = false; },
                validator(value: any) {
                    return { ok: value.intact, errors: value.intact ? [] : ["dynamic typed attribution removed"] };
                },
            }],
        });
        expect(coveredDynamic.ok).toBe(false);
        expect(coveredDynamic.missingProductionRequirements).not.toContain(dynamicRequirement);
        expect(coveredDynamic.cases.find((item: any) => item.requirement === dynamicRequirement)).toMatchObject({
            mutatedStatus: "RED",
            restoredStatus: "PASS",
        });
    });
});

describe("commit trailer semantics", () => {
    const receiptBytes = Buffer.from('{"fixture":true}\n');
    const receiptDigest = sha256(receiptBytes.toString());
    const formationDigest = "b".repeat(64);
    const receipt = { waveId: "BI.W-P000", status: "DONE", formationDigest };

    it("ignores pseudo-trailers in the body and parses only the valid terminal block", () => {
        const message = [
            "feat(tranche): exercise terminal trailers",
            "",
            "BI-Wave: BI.W-P999",
            "BI-Status: DONE",
            "",
            "The examples above are explanatory body text, not the terminal tuple.",
            "",
            "BI-Wave: BI.W-P000",
            "BI-Status: DONE",
            `BI-Receipt-SHA256: ${receiptDigest}`,
            `BI-Formation-SHA256: ${formationDigest}`,
            "",
        ].join("\n");
        const parsed = parseCommitTrailers(message);
        expect(parsed.duplicates).toEqual([]);
        expect(Object.fromEntries(parsed.trailers)).toEqual({
            "BI-Wave": "BI.W-P000",
            "BI-Status": "DONE",
            "BI-Receipt-SHA256": receiptDigest,
            "BI-Formation-SHA256": formationDigest,
        });
        expect(validateCommitTrailers(message, receipt, receiptBytes)).toEqual([]);
    });

    it("reports duplicate BI trailers in the actual terminal block", () => {
        const message = [
            "feat(tranche): duplicate terminal trailer",
            "",
            "BI-Wave: BI.W-P000",
            "BI-Wave: BI.W-P001",
            "BI-Status: DONE",
            `BI-Receipt-SHA256: ${receiptDigest}`,
            `BI-Formation-SHA256: ${formationDigest}`,
            "",
        ].join("\n");
        expect(parseCommitTrailers(message).duplicates).toEqual(["BI-Wave"]);
        expect(validateCommitTrailers(message, receipt, receiptBytes).join("\n")).toMatch(/duplicate BI trailers: BI-Wave/);
    });
});

describe("installer behavior and bootstrap CLI boundaries", () => {
    const installer = {
        installer: processPass(),
        configuredHooksPath: ".githooks",
        hookMode: "755",
        failClosedProbe: { ...processPass(), exitCode: EXIT.STATE_UNAVAILABLE },
    };

    it("evaluates observed installer behavior instead of source resemblance", () => {
        expect(evaluateInstallerBehavior(installer)).toMatchObject({ ok: true, errors: [] });
        for (const mutation of [
            { installer: { ...installer.installer, exitCode: 1 } },
            { configuredHooksPath: ".git/hooks" },
            { hookMode: "644" },
            { failClosedProbe: processPass() },
        ]) {
            expect(evaluateInstallerBehavior({ ...installer, ...mutation }).ok).toBe(false);
            expect(evaluateInstallerBehavior(installer).ok).toBe(true);
        }
    });

    it("strips repository redirects and Node/npm code-injection controls from children without mutating the repository", () => {
        const root = tempRepository();
        const npmConfigDirectory = realpathSync(mkdtempSync(resolve(tmpdir(), "glass-p000-npm-config-")));
        try {
            const headBefore = git(root, ["rev-parse", "HEAD"]);
            const statusBefore = git(root, ["status", "--porcelain=v1"]);
            const poisonedEnvironment = {
                ...process.env,
                GIT_DIR: resolve(root, "redirected-git-dir"),
                GIT_INDEX_FILE: resolve(root, "redirected-index"),
                NODE_OPTIONS: "--require=/definitely/missing-preload.cjs",
                NODE_PATH: resolve(root, "ambient-node-path"),
                npm_config_node_options: "--require=/definitely/missing-npm-preload.cjs",
                NpM_CoNfIg_ScRiPt_ShElL: resolve(root, "selective-fake-shell"),
                NpM_CoNfIg_UsErCoNfIg: resolve(root, "poisoned-user-npmrc"),
                NpM_CoNfIg_GlObAlCoNfIg: resolve(root, "poisoned-global-npmrc"),
                BI_SAFE_SENTINEL: "preserved",
            };
            const pristineEnvironment = { ...poisonedEnvironment };
            const clean = sanitizedRepositoryEnvironment(poisonedEnvironment);
            const forbidden = [
                "GIT_DIR",
                "GIT_INDEX_FILE",
                "NODE_OPTIONS",
                "NODE_PATH",
                "npm_config_node_options",
                "NpM_CoNfIg_ScRiPt_ShElL",
                "NpM_CoNfIg_UsErCoNfIg",
                "NpM_CoNfIg_GlObAlCoNfIg",
            ];
            for (const name of forbidden) expect(Object.hasOwn(clean, name)).toBe(false);
            expect(Object.keys(clean).some((name) => CHILD_ENVIRONMENT_REMOVAL_POLICY.caseInsensitiveOverrides.includes(name.toLowerCase()))).toBe(false);
            expect(clean.BI_SAFE_SENTINEL).toBe("preserved");

            const configured = sanitizedRepositoryEnvironment(poisonedEnvironment, { npmConfigDirectory });
            const userConfig = resolve(npmConfigDirectory, "user.npmrc");
            const globalConfig = resolve(npmConfigDirectory, "global.npmrc");
            expect(configured.NPM_CONFIG_USERCONFIG).toBe(userConfig);
            expect(configured.NPM_CONFIG_GLOBALCONFIG).toBe(globalConfig);
            expect(configured.NPM_CONFIG_USERCONFIG).not.toBe(configured.NPM_CONFIG_GLOBALCONFIG);
            expect(readFileSync(userConfig, "utf8")).toBe("");
            expect(readFileSync(globalConfig, "utf8")).toBe("");
            expect(lstatSync(userConfig).mode & 0o777).toBe(0o600);
            expect(lstatSync(globalConfig).mode & 0o777).toBe(0o600);
            expect(configured.BI_SAFE_SENTINEL).toBe("preserved");
            expect(poisonedEnvironment).toEqual(pristineEnvironment);

            const child = spawnSync(process.execPath, [
                "-e",
                "const names = process.argv.slice(1); process.stdout.write(JSON.stringify(names.filter((name) => Object.hasOwn(process.env, name))));",
                ...forbidden,
            ], { cwd: root, env: configured, encoding: "utf8" });
            expect(child.status).toBe(0);
            expect(JSON.parse(child.stdout)).toEqual([]);
            expect(git(root, ["rev-parse", "HEAD"])).toBe(headBefore);
            expect(git(root, ["status", "--porcelain=v1"])).toBe(statusBefore);
            expect(CHILD_ENVIRONMENT_REMOVAL_POLICY.caseInsensitiveNames).toEqual(expect.arrayContaining([
                "npm_config_node_options",
                "npm_config_script_shell",
            ]));
            expect(CHILD_ENVIRONMENT_REMOVAL_POLICY.caseInsensitiveOverrides).toEqual(expect.arrayContaining([
                "npm_config_userconfig",
                "npm_config_globalconfig",
            ]));
        } finally {
            rmSync(npmConfigDirectory, { recursive: true, force: true });
            rmSync(root, { recursive: true, force: true });
        }
    });

    it("clears inherited Node preload controls before the installed hook launches the verifier", () => {
        const root = realpathSync(mkdtempSync(resolve(tmpdir(), "glass-p000-hook-")));
        try {
            mkdirSync(resolve(root, ".githooks"), { recursive: true });
            mkdirSync(resolve(root, "scripts/tranche"), { recursive: true });
            cpSync(resolve(ROOT, ".githooks/commit-msg"), resolve(root, ".githooks/commit-msg"));
            cpSync(resolve(ROOT, "scripts/install-hooks.mjs"), resolve(root, "scripts/install-hooks.mjs"));
            cpSync(resolve(ROOT, "scripts/verify.mjs"), resolve(root, "scripts/verify.mjs"));
            cpSync(resolve(ROOT, "scripts/verification"), resolve(root, "scripts/verification"), { recursive: true });
            cpSync(
                resolve(ROOT, "scripts/tranche/bootstrap-receipt.mjs"),
                resolve(root, "scripts/tranche/bootstrap-receipt.mjs"),
            );
            symlinkSync(resolve(ROOT, "node_modules"), resolve(root, "node_modules"), "dir");
            chmodSync(resolve(root, ".githooks/commit-msg"), 0o755);

            git(root, ["init", "-q"]);
            const installed = spawnSync(process.execPath, ["scripts/install-hooks.mjs"], {
                cwd: root,
                encoding: "utf8",
            });
            expect(installed.status).toBe(0);
            expect(git(root, ["config", "--get", "core.hooksPath"])).toBe(".githooks");

            const poison = resolve(root, "preload.cjs");
            const marker = resolve(root, "preload-loaded.txt");
            writeFileSync(poison, [
                "const { writeFileSync } = require('node:fs');",
                "writeFileSync(process.env.PRELOAD_MARKER, 'loaded\\n');",
                "process.on('exit', () => { process.exitCode = 0; });",
                "",
            ].join("\n"));
            const poisonedEnvironment = {
                ...process.env,
                NODE_OPTIONS: `--require=${poison}`,
                NODE_PATH: resolve(root, "ambient-node-path"),
                PRELOAD_MARKER: marker,
            };

            const control = spawnSync(process.execPath, ["-e", "process.exitCode = 75"], {
                cwd: root,
                env: poisonedEnvironment,
                encoding: "utf8",
            });
            expect(control.status).toBe(0);
            expect(readFileSync(marker, "utf8")).toBe("loaded\n");
            rmSync(marker, { force: true });

            const message = resolve(root, ".git/P001-COMMIT-MESSAGE");
            writeFileSync(message, "test: fail-closed state recovery\n\nBI-Wave: BI.W-P001\n");
            const hook = spawnSync(resolve(root, ".githooks/commit-msg"), [message], {
                cwd: root,
                env: poisonedEnvironment,
                encoding: "utf8",
            });
            expect(hook.status).toBe(EXIT.STATE_UNAVAILABLE);
            expect(existsSync(marker)).toBe(false);
        } finally {
            rmSync(root, { recursive: true, force: true });
        }
    });

    it("restricts immutable bootstrap arguments to P000", () => {
        expect(() => parseVerifierArgs(["--bootstrap-plan", "plan.json", "--wave", "BI.W-P001", "--evidence-digest-only"])).toThrow(/restricted/);
        expect(() => parseVerifierArgs(["--bootstrap-plan", "plan.json", "--state", "auto", "--wave", "BI.W-P000", "--evidence-digest-only"])).toThrow(/cannot be combined/);
        expect(parseVerifierArgs(["--bootstrap-plan", "plan.json", "--wave", "BI.W-P000", "--evidence-digest-only"]).wave).toBe("BI.W-P000");
    });

    it.each([
        { label: "usage", args: ["--json", "--unknown"], code: EXIT.USAGE },
        { label: "missing input", args: ["--json", "--bootstrap-plan", "missing.json", "--wave", "BI.W-P000", "--evidence-digest-only"], code: EXIT.MISSING_INPUT },
        { label: "invalid contract", args: ["--json", "--bootstrap-plan", "invalid.json", "--wave", "BI.W-P000", "--evidence-digest-only"], code: EXIT.INVALID_CONTRACT },
    ])("emits JSON and the $label sysexit without recursive collection", ({ args, code }) => {
        const root = mkdtempSync(resolve(tmpdir(), "glass-p000-cli-"));
        try {
            writeFileSync(resolve(root, "invalid.json"), "{}\n");
            const result = spawnSync(process.execPath, [VERIFY, "--root", root, ...args], { encoding: "utf8" });
            expect(result.status).toBe(code);
            expect(JSON.parse(result.stdout.trim())).toMatchObject({ status: "RED", exitCode: code });
        } finally {
            rmSync(root, { recursive: true, force: true });
        }
    });
});
