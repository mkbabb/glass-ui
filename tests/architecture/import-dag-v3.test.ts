import { execFileSync, spawnSync } from "node:child_process";
import {
    cpSync,
    existsSync,
    mkdirSync,
    mkdtempSync,
    readFileSync,
    rmdirSync,
    rmSync,
    symlinkSync,
    writeFileSync,
} from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeAll, describe, expect, it } from "vitest";

import {
    buildGraph,
    extractCssReferences,
    extractProcessInvocations,
    extractScriptReferences,
    extractTemplateReferences,
    validateCycleRatchets,
    validateOwnerAssignments,
} from "../../docs/tranches/BJ/audits/2026-07-28-library-dag/build-import-dag-v3.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const audit = resolve(root, "docs/tranches/BJ/audits/2026-07-28-library-dag");
const require = createRequire(import.meta.url);
const manifest = require(
    "../../docs/tranches/BJ/audits/2026-07-28-library-dag/OWNER-MANIFEST.json",
);
const packageJson = require("../../package.json");
let graph: Awaited<ReturnType<typeof buildGraph>>;

function makeCheckFixture() {
    const directory = mkdtempSync(join(tmpdir(), "glass-graph-v3-check-"));
    for (const name of [
        "OWNER-MANIFEST.json",
        "IMPORT-DAG-V3.json",
        "IMPORT-DAG-V3-SUMMARY.md",
    ]) {
        cpSync(resolve(audit, name), resolve(directory, name));
    }
    return directory;
}

function runCheck(outputDirectory: string) {
    return spawnSync(
        process.execPath,
        [
            resolve(audit, "build-import-dag-v3.mjs"),
            "--repository-root",
            root,
            "--output-directory",
            outputDirectory,
            "--check",
        ],
        { cwd: root, encoding: "utf8" },
    );
}

function temporarilyWrite(path: string, content: string | Buffer) {
    const existed = existsSync(path);
    const previous = existed ? readFileSync(path) : null;
    const createdDirectories: string[] = [];
    let parent = dirname(path);
    while (!existsSync(parent)) {
        createdDirectories.push(parent);
        parent = dirname(parent);
    }
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, content);
    return () => {
        if (previous) writeFileSync(path, previous);
        else rmSync(path, { force: true });
        for (const directory of createdDirectories) {
            try {
                rmdirSync(directory);
            } catch {
                // A concurrently created artifact owns the non-empty directory.
            }
        }
    };
}

beforeAll(async () => {
    graph = await buildGraph({ repositoryRoot: root, outputDirectory: audit });
});

describe("graph schema v3", () => {
    it("classifies each literal loader form by exact kind and specifier", () => {
        const { references, nonliteralReferences } = extractScriptReferences(`
            import { createRequire as makeRequire } from "node:module";
            import value, { type Shape } from "./eager";
            import type { Only } from "./types";
            export { runtime, type Contract } from "./barrel";
            import("./lazy");
            const localRequire = makeRequire(import.meta.url);
            localRequire("./required.json");
            localRequire.resolve("./resolved.json");
            import.meta.glob(["./pages/*.vue", "!./pages/private.vue"], {
                eager: true, import: "default", query: "?raw"
            });
            new Worker(new URL("./worker.ts", import.meta.url), { type: "module" });
            new URL("./image.png", import.meta.url);
        `);
        expect(
            references
                .filter(
                    (
                        reference,
                    ): reference is typeof reference & { specifier: string } =>
                        "specifier" in reference && reference.specifier.startsWith("."),
                )
                .map(({ edgeKind, specifier }) => ({ edgeKind, specifier }))
                .sort(
                    (left, right) =>
                        left.edgeKind.localeCompare(right.edgeKind) ||
                        left.specifier.localeCompare(right.specifier),
                ),
        ).toEqual([
            { edgeKind: "eager-runtime", specifier: "./eager" },
            { edgeKind: "export-from", specifier: "./barrel" },
            { edgeKind: "literal-dynamic", specifier: "./lazy" },
            { edgeKind: "literal-require", specifier: "./required.json" },
            { edgeKind: "new-url", specifier: "./image.png" },
            { edgeKind: "require-resolve", specifier: "./resolved.json" },
            { edgeKind: "type-only", specifier: "./eager" },
            { edgeKind: "type-only", specifier: "./types" },
            { edgeKind: "worker", specifier: "./worker.ts" },
        ]);
        expect(references.find(({ edgeKind }) => edgeKind === "glob-eager")).toMatchObject({
            patterns: ["./pages/*.vue", "!./pages/private.vue"],
            options: { eager: true, import: "default", query: "?raw" },
        });
        expect(nonliteralReferences).toEqual([]);
    });

    it("resolves finite const/collection/loop dynamic imports and fails unknown locality closed", () => {
        const { references, nonliteralReferences } = extractScriptReferences(`
            const localPrefix = "./pages/" + pageName;
            import(localPrefix);

            const shaders = {
                aurora: "/src/components/aurora/constants/shaders/aurora.wgsl.ts#AURORA_WGSL",
                metaball: "/src/components/blob/shaders/metaball.wgsl.ts#METABALL_WGSL",
            };
            for (const [id, ref] of Object.entries(shaders)) {
                const [path, exportName] = ref.split("#");
                import(path);
            }

            const remote = "https://example.com/modules/" + pageName;
            import(remote);
            const bare = "vue";
            import(bare);
            import(runtimeChosenPath);
        `);
        expect(
            references
                .filter(({ edgeKind }) => edgeKind === "finite-dynamic")
                .map(({ specifier }) => specifier)
                .sort(),
        ).toEqual([
            "/src/components/aurora/constants/shaders/aurora.wgsl.ts",
            "/src/components/blob/shaders/metaball.wgsl.ts",
            "vue",
        ]);
        expect(
            nonliteralReferences.map(({ expression, localHint }) => ({
                expression,
                localHint,
            })),
        ).toEqual([
            { expression: "localPrefix", localHint: true },
            { expression: "remote", localHint: false },
            { expression: "runtimeChosenPath", localHint: true },
        ]);
    });

    it("recognizes only provenance-backed require/createRequire bindings", () => {
        const { references } = extractScriptReferences(`
            import { createRequire as makeLoader } from "node:module";
            import * as moduleApi from "node:module";
            const direct = makeLoader(import.meta.url);
            const namespace = moduleApi.createRequire(import.meta.url);
            const { createRequire: cjsFactory } = require("node:module");
            const destructured = cjsFactory(import.meta.url);
            const moduleNamespace = require("node:module");
            const requiredNamespace = moduleNamespace.createRequire(import.meta.url);
            const aliased = direct;
            direct("./direct.json");
            namespace("./namespace.json");
            destructured("./destructured.json");
            requiredNamespace("./required-namespace.json");
            aliased.resolve("./aliased.json");

            function shadowed(require: (value: string) => unknown) {
                require("./shadowed.json");
            }
            const fakeFactory = () => (_value: string) => undefined;
            const fake = fakeFactory();
            fake("./fake.json");
        `);
        expect(
            references
                .filter(({ specifier }) => specifier?.startsWith("."))
                .map(({ edgeKind, specifier }) => ({ edgeKind, specifier }))
                .sort((left, right) => left.specifier.localeCompare(right.specifier)),
        ).toEqual([
            { edgeKind: "require-resolve", specifier: "./aliased.json" },
            { edgeKind: "literal-require", specifier: "./destructured.json" },
            { edgeKind: "literal-require", specifier: "./direct.json" },
            { edgeKind: "literal-require", specifier: "./namespace.json" },
            { edgeKind: "literal-require", specifier: "./required-namespace.json" },
        ]);
    });

    it("recognizes child_process aliases and rejects name-only lookalikes", () => {
        const extracted = extractScriptReferences(`
            import { execFileSync as executeFile, spawn as run } from "node:child_process";
            import * as childProcess from "node:child_process";
            const { spawnSync: runSync } = require("child_process");
            const requiredChildProcess = require("node:child_process");
            run("node", ["./one.mjs"]);
            executeFile("node", ["./two.mjs"]);
            childProcess.exec("node ./three.mjs");
            runSync("node", ["./four.mjs"]);
            requiredChildProcess.execSync("node ./five.mjs");

            /needle/.exec("needle");
            function spawn(_command: string) {}
            spawn("domain");
            const domain = { spawn(_command: string) {} };
            domain.spawn("domain");
        `);
        expect(
            extractProcessInvocations(extracted.sourceFile, "fixture.ts", root)
                .map(({ api, binding }) => ({ api, binding }))
                .sort((left, right) => left.api.localeCompare(right.api)),
        ).toEqual([
            { api: "exec", binding: "childProcess.exec" },
            { api: "execFileSync", binding: "executeFile" },
            { api: "execSync", binding: "requiredChildProcess.execSync" },
            { api: "spawn", binding: "run" },
            { api: "spawnSync", binding: "runSync" },
        ]);
    });

    it("promotes TypeScript syntactic diagnostics to fail-closed parse errors", () => {
        const malformed = extractScriptReferences(
            "export const broken: = {;",
            "malformed.ts",
        );
        expect(malformed.parseErrors.length).toBeGreaterThan(0);
        expect(malformed.parseErrors[0]).toMatchObject({
            source: "malformed.ts",
            line: 1,
            column: expect.any(Number),
            message: expect.any(String),
        });
    });

    it("retains PostCSS import clauses and separates asset URLs", () => {
        const { references, parseErrors } = extractCssReferences(`
            @import url("./base.css") layer(theme) supports(display: grid) screen and (min-width: 40rem);
            .hero { background-image: url("./hero.png"); }
        `);
        expect(parseErrors).toEqual([]);
        expect(references).toEqual([
            expect.objectContaining({
                edgeKind: "css-import",
                specifier: "./base.css",
                metadata: {
                    layer: "theme",
                    supports: "display: grid",
                    media: "screen and (min-width: 40rem)",
                },
            }),
            expect.objectContaining({ edgeKind: "asset-url", specifier: "./hero.png" }),
        ]);
    });

    it("extracts literal Vue assets and ledgers dynamic template/style expressions", () => {
        const { references, dynamicAssetReferences, parseErrors } =
            extractTemplateReferences(`
            <picture>
                <source srcset="./small.webp 1x, ./large.webp 2x">
                <img src="./hero.png" alt="">
                <video :poster="'./bound-poster.png'"></video>
            </picture>
            <div style="background-image: url('./inline.png')"></div>
            <div :style="'background-image: url(./bound-inline.png)'"></div>
            <img :src="tile.src" alt="">
            <div :style="dynamicStyle"></div>
        `);
        expect(parseErrors).toEqual([]);
        expect(
            references
                .map(({ edgeKind, specifier }) => ({ edgeKind, specifier }))
                .sort((left, right) => left.specifier.localeCompare(right.specifier)),
        ).toEqual([
            { edgeKind: "template-style-asset", specifier: "./bound-inline.png" },
            { edgeKind: "template-asset", specifier: "./bound-poster.png" },
            { edgeKind: "template-asset", specifier: "./hero.png" },
            { edgeKind: "template-style-asset", specifier: "./inline.png" },
            { edgeKind: "template-asset", specifier: "./large.webp" },
            { edgeKind: "template-asset", specifier: "./small.webp" },
        ]);
        expect(
            dynamicAssetReferences.map(
                ({ edgeKind, attribute, expression }) => ({
                    edgeKind,
                    attribute,
                    expression,
                }),
            ),
        ).toEqual([
            {
                edgeKind: "template-asset",
                attribute: "src",
                expression: "tile.src",
            },
            {
                edgeKind: "template-style-asset",
                attribute: "style",
                expression: "dynamicStyle",
            },
        ]);
    });

    it("keeps every graph file singly owned and every owner rule active", () => {
        const paths = graph.nodes
            .filter(({ nodeType }) => nodeType !== "directory")
            .filter(({ virtual }) => !virtual)
            .map(({ path }) => path);
        expect(validateOwnerAssignments(paths, manifest).defects).toEqual([]);
        expect(graph.ownerManifest.unusedOwners).toEqual([]);
        expect(Object.keys(manifest.publicEntries).sort()).toEqual(
            graph.publicReach.map(({ entry }) => entry).sort(),
        );
        expect(new Set(graph.publicReach.map(({ owner }) => owner)).size).toBeGreaterThan(1);
    });

    it("derives public owners and enforces member/merge/size SCC ratchets", () => {
        expect(graph.summary.publicEntries).toBe(Object.keys(packageJson.exports).length);
        for (const entry of graph.publicReach.filter(({ sourceEntry }) => sourceEntry)) {
            expect(entry.owner).toBe(entry.sourceOwner);
        }
        expect(graph.cycleRatchets.pass).toBe(true);

        const withFileCycles = (fileCycles: string[][]) => ({
            ...graph.projections,
            eagerRuntime: { ...graph.projections.eagerRuntime, fileCycles },
        });
        const current = graph.projections.eagerRuntime.fileCycles;
        const newMember = validateCycleRatchets(
            withFileCycles([[...current[0], "src/new-cycle-member.ts"], current[1]]),
            manifest.cycleBaselines,
        );
        expect(newMember.defects.map(({ defect }) => defect)).toContain(
            "new-cycle-members",
        );
        expect(newMember.defects.map(({ defect }) => defect)).toContain(
            "total-cyclic-node-growth",
        );

        const merge = validateCycleRatchets(
            withFileCycles([[...current[0], ...current[1]]]),
            manifest.cycleBaselines,
        );
        expect(merge.defects.map(({ defect }) => defect)).toContain(
            "baseline-components-merged",
        );
        expect(merge.defects.map(({ defect }) => defect)).toContain("max-scc-growth");

        const duplicated = validateCycleRatchets(
            withFileCycles([current[0], current[1], current[0]]),
            manifest.cycleBaselines,
        );
        expect(duplicated.defects.map(({ defect }) => defect)).toContain(
            "total-cyclic-node-growth",
        );

        const removal = validateCycleRatchets(
            withFileCycles([current[0].slice(0, 1), current[1]]),
            manifest.cycleBaselines,
        );
        expect(removal.pass).toBe(true);
    });

    it("makes the HTML build root and instrumentation dependencies explicit", () => {
        expect(
            graph.nodes.find(({ path }) => path === "index.html"),
        ).toMatchObject({
            projection: "build-config",
            owner: "repository/root",
            nodeType: "source",
        });
        expect(
            graph.internalEdges.find(
                ({ source, target, edgeKind }) =>
                    source === "index.html" &&
                    target === "demo/main.ts" &&
                    edgeKind === "build-entry",
            ),
        ).toBeDefined();
        expect(
            graph.nodes.find(({ path }) => path.endsWith("/build-import-dag-v3.mjs")),
        ).toMatchObject({
            nodeType: "source",
            nodeKind: "repository-file",
            generatedBy: null,
        });
        expect(
            graph.internalEdges.some(
                ({ source, target, edgeKind }) =>
                    source === "tests/architecture/import-dag-v3.test.ts" &&
                    target ===
                        "docs/tranches/BJ/audits/2026-07-28-library-dag/OWNER-MANIFEST.json" &&
                    edgeKind === "literal-require",
            ),
        ).toBe(true);
        const invocations = graph.processInvocations.filter(
            ({ source }) => source === "tests/architecture/import-dag-v3.test.ts",
        );
        expect(invocations.map(({ api }) => api)).toEqual(
            expect.arrayContaining(["execFileSync", "spawnSync"]),
        );
        expect(invocations.find(({ api }) => api === "execFileSync")?.argv).toEqual([
            expect.objectContaining({
                target:
                    "docs/tranches/BJ/audits/2026-07-28-library-dag/build-import-dag-v3.mjs",
                dynamic: false,
            }),
            expect.objectContaining({ value: "--check", target: null, dynamic: false }),
        ]);
    });

    it("uses block-type-aware Vue external-block metadata", () => {
        const edges = graph.internalEdges.filter(({ edgeKind }) => edgeKind === "vue-block");
        expect(edges.length).toBeGreaterThan(0);
        for (const { metadata } of edges) {
            expect(metadata.blockKind).toBe(metadata.blockType);
            expect(metadata.src).toEqual(expect.any(String));
            expect(metadata).toHaveProperty("lang");
            if (metadata.blockType === "style") {
                expect(metadata).toEqual(
                    expect.objectContaining({
                        styleIndex: expect.any(Number),
                        scoped: expect.any(Boolean),
                        module: expect.anything(),
                    }),
                );
            } else if (metadata.blockType === "script") {
                expect(metadata).toEqual(
                    expect.objectContaining({ setup: expect.any(Boolean) }),
                );
            } else {
                expect(metadata.blockType).toBe("template");
            }
        }
    });

    it("records Vue script, script-setup, template, and style locations in file-native coordinates", async () => {
        const completionImports = [...graph.internalEdges, ...graph.externalEdges]
            .filter(
                ({ source, specifier }) =>
                    source === "src/components/completion-seal/CompletionSeal.vue" &&
                    [
                        "vue",
                        "../_shared/class-names",
                        "./composables/useCompletionSeal",
                        "./constants",
                    ].includes(specifier),
            )
            .map(({ specifier, line, column }) => ({ specifier, line, column }))
            .sort(
                (left, right) =>
                    left.line - right.line ||
                    left.specifier.localeCompare(right.specifier),
            );
        expect(completionImports).toEqual([
            { specifier: "vue", line: 68, column: 1 },
            { specifier: "../_shared/class-names", line: 69, column: 1 },
            {
                specifier: "./composables/useCompletionSeal",
                line: 70,
                column: 1,
            },
            { specifier: "./constants", line: 71, column: 1 },
            { specifier: "./constants", line: 71, column: 1 },
        ]);
        expect(
            [...graph.internalEdges, ...graph.externalEdges]
                .filter(
                    ({ source, specifier }) =>
                        source === "demo/chassis/code/Code.vue" &&
                        ["vue", "@glass/components/_shared/class-names"].includes(
                            specifier,
                        ),
                )
                .map(({ specifier, line, column }) => ({
                    specifier,
                    line,
                    column,
                }))
                .sort((left, right) => left.line - right.line),
        ).toEqual([
            { specifier: "vue", line: 19, column: 1 },
            { specifier: "vue", line: 19, column: 1 },
            {
                specifier: "@glass/components/_shared/class-names",
                line: 20,
                column: 1,
            },
        ]);

        const fixturePath = `tests/architecture/__graph-v3-sfc-location-${process.pid}.vue`;
        const cleanup = temporarilyWrite(
            resolve(root, fixturePath),
            `<script lang="ts">
import type { ButtonProps } from "../../src/components/button/index";
</script>
<template>
<img src="../../tests-visual/fixtures/starry-night-crop.png" alt="">
</template>
<script setup lang="ts">
import { Card } from "../../src/components/card/index";
</script>
<style scoped>
.fixture {
  background-image: url("../../tests-visual/fixtures/starry-night-crop.png");
}
</style>
`,
        );
        try {
            const fixtureGraph = await buildGraph({
                repositoryRoot: root,
                outputDirectory: audit,
            });
            expect(
                fixtureGraph.nodes.find(({ path }) => path === fixturePath),
            ).toMatchObject({
                nodeKind: "repository-file",
                projection: "tests",
                virtual: false,
            });
            const fixtureEdges = fixtureGraph.internalEdges
                .filter(({ source }) => source === fixturePath)
                .map(({ edgeKind, specifier, line, column }) => ({
                    edgeKind,
                    specifier,
                    line,
                    column,
                }))
                .sort(
                    (left, right) =>
                        left.line - right.line ||
                        left.edgeKind.localeCompare(right.edgeKind),
                );
            expect(fixtureEdges).toEqual([
                {
                    edgeKind: "type-only",
                    specifier: "../../src/components/button/index",
                    line: 2,
                    column: 1,
                },
                {
                    edgeKind: "template-asset",
                    specifier:
                        "../../tests-visual/fixtures/starry-night-crop.png",
                    line: 5,
                    column: 6,
                },
                {
                    edgeKind: "eager-runtime",
                    specifier: "../../src/components/card/index",
                    line: 8,
                    column: 1,
                },
                {
                    edgeKind: "asset-url",
                    specifier:
                        "../../tests-visual/fixtures/starry-night-crop.png",
                    line: 12,
                    column: 3,
                },
            ]);
        } finally {
            cleanup();
        }
    }, 15_000);

    it("keeps ignored build, cache, and screenshot overlays out of graph identity", async () => {
        const suffix = `${process.pid}`;
        const fixturePath = `tests-visual/__graph-v3-worktree-${suffix}.spec.ts`;
        const ignoredDocsPath =
            `docs/tranches/BJ/audits/2026-07-28-library-dag/` +
            `__graph-v3-ignored-${suffix}.png`;
        const cleanupFixture = temporarilyWrite(
            resolve(root, fixturePath),
            `new URL("../${ignoredDocsPath}", import.meta.url);\n`,
        );
        const overlayCleanups: Array<() => void> = [];
        try {
            const clean = await buildGraph({
                repositoryRoot: root,
                outputDirectory: audit,
            });
            expect(
                clean.nodes.find(({ path }) => path === fixturePath),
            ).toMatchObject({
                nodeKind: "repository-file",
                projection: "visual-tests",
                virtual: false,
            });
            expect(
                clean.nodes.find(({ path }) => path === ignoredDocsPath),
            ).toMatchObject({
                nodeKind: "missing-runtime-placeholder",
                virtual: true,
            });

            for (const [path, bytes] of [
                ["dist/component-styles.css", "ignored generated css\n"],
                ["dist/styles/index.css", "ignored generated style index\n"],
                ["dist/glass-ui.js", "ignored declared package output\n"],
                ["dist-demo/index.html", "<p>ignored demo output</p>\n"],
                [
                    `tests-visual/__graph-v3-ignored-${suffix}.png`,
                    "ignored visual bytes",
                ],
                [ignoredDocsPath, "ignored docs screenshot bytes"],
                [
                    `tests-visual/.cache/__graph-v3-${suffix}.json`,
                    '{"ignored":true}\n',
                ],
                [
                    `tests-visual/test-results/__graph-v3-${suffix}.json`,
                    '{"ignored":true}\n',
                ],
            ] as const) {
                overlayCleanups.push(
                    temporarilyWrite(resolve(root, path), bytes),
                );
            }

            const overlaid = await buildGraph({
                repositoryRoot: root,
                outputDirectory: audit,
            });
            expect({
                ...overlaid,
                observedAt: "<normalized-for-artifact-overlay>",
            }).toEqual({
                ...clean,
                observedAt: "<normalized-for-artifact-overlay>",
            });
            expect(overlaid.receiptSha256).toBe(clean.receiptSha256);
            expect(overlaid.summary).toEqual(clean.summary);
            expect(
                overlaid.nodes.find(
                    ({ path }) => path === "dist/component-styles.css",
                ),
            ).toMatchObject({
                nodeKind: "generated-by-write",
                nodeType: "generated-artifact",
                virtual: true,
                bytes: null,
                sha256: null,
            });
            expect(
                overlaid.nodes.find(({ path }) => path === "dist/glass-ui.js"),
            ).toMatchObject({
                nodeKind: "declared-package-output",
                nodeType: "package-output",
                virtual: true,
                bytes: null,
                sha256: null,
            });
            expect(
                overlaid.nodes.some(
                    ({ path }) =>
                        path ===
                        `tests-visual/__graph-v3-ignored-${suffix}.png`,
                ),
            ).toBe(false);
        } finally {
            for (const cleanup of overlayCleanups.reverse()) cleanup();
            cleanupFixture();
        }
    }, 15_000);

    it("ships clean, joinable projections and a current deterministic receipt", () => {
        expect(graph.schema).toBe("glass-ui-import-dag/3");
        expect(graph.summary).toMatchObject({
            unresolvedLocalReferences: 0,
            nonliteralLocalReferences: 0,
            unresolvedGlobPatterns: 0,
            parseErrors: 0,
        });
        expect(Object.keys(graph.projections).sort()).toEqual([
            "buildLoad",
            "eagerRuntime",
            "ownership",
        ]);
        expect(graph.summary.nodeTypeCounts).toMatchObject({
            binary: expect.any(Number),
            declaration: expect.any(Number),
            documentation: expect.any(Number),
            "generated-artifact": expect.any(Number),
            "package-output": expect.any(Number),
            source: expect.any(Number),
            style: expect.any(Number),
            "virtual-placeholder": expect.any(Number),
        });
        expect(Object.keys(graph.summary.nodeKindCounts).sort()).toEqual([
            "declared-package-output",
            "directory",
            "generated-by-write",
            "missing-runtime-placeholder",
            "repository-file",
        ]);
        expect(
            Object.values(graph.summary.nodeKindCounts).reduce(
                (sum: number, count) => sum + Number(count),
                0,
            ),
        ).toBe(graph.nodes.length);
        expect(graph.nodes.find(({ path }) => path === "package.json")).toMatchObject({
            nodeKind: "repository-file",
            nodeType: "source",
            generatedBy: null,
            virtual: false,
        });
        for (const node of graph.nodes) {
            const generatorEdge = graph.internalEdges.some(
                ({ source, target, edgeKind }) =>
                    source === node.generatedBy &&
                    target === node.path &&
                    edgeKind === "generator-write",
            );
            expect(node.nodeKind === "generated-by-write").toBe(
                typeof node.generatedBy === "string" && generatorEdge,
            );
            if (
                [
                    "generated-by-write",
                    "declared-package-output",
                    "missing-runtime-placeholder",
                ].includes(node.nodeKind)
            ) {
                expect(node).toMatchObject({
                    virtual: true,
                    bytes: null,
                    sha256: null,
                });
            }
        }
        for (const edge of graph.internalEdges.filter(
            ({ edgeKind }) => edgeKind === "file-write",
        )) {
            expect(
                graph.nodes.find(({ path }) => path === edge.target),
            ).not.toMatchObject({
                nodeKind: "generated-by-write",
                generatedBy: edge.source,
            });
        }
        expect(graph.packageSurface.sideEffects.matchedExportTargets.length).toBeGreaterThan(0);
        execFileSync(
            process.execPath,
            [resolve(audit, "build-import-dag-v3.mjs"), "--check"],
            { cwd: root, stdio: "pipe" },
        );
    });

    it("fails --check for tampered node payloads, public owners, and summaries", () => {
        const mutations = [
            {
                expected: /stored JSON payload differs/i,
                mutate(directory: string) {
                    const path = resolve(directory, "IMPORT-DAG-V3.json");
                    const payload = JSON.parse(readFileSync(path, "utf8"));
                    payload.nodes[0].owner = "tampered/owner";
                    writeFileSync(path, `${JSON.stringify(payload, null, 2)}\n`);
                },
            },
            {
                expected: /publicSourceOwnerMismatches/i,
                mutate(directory: string) {
                    const path = resolve(directory, "OWNER-MANIFEST.json");
                    const payload = JSON.parse(readFileSync(path, "utf8"));
                    payload.publicEntries["."] = "product/styles";
                    writeFileSync(path, `${JSON.stringify(payload, null, 2)}\n`);
                },
            },
            {
                expected: /stored human summary differs/i,
                mutate(directory: string) {
                    const path = resolve(directory, "IMPORT-DAG-V3-SUMMARY.md");
                    writeFileSync(
                        path,
                        `${readFileSync(path, "utf8")}\nTAMPERED SUMMARY\n`,
                    );
                },
            },
        ];
        for (const { expected, mutate } of mutations) {
            const directory = makeCheckFixture();
            try {
                mutate(directory);
                const result = runCheck(directory);
                expect(result.status).not.toBe(0);
                expect(result.stderr).toMatch(expected);
            } finally {
                rmSync(directory, { recursive: true, force: true });
            }
        }
    }, 15_000);

    it("executes rather than silently no-oping when invoked through a symlink", () => {
        const temporaryDirectory = mkdtempSync(join(tmpdir(), "glass-graph-v3-cli-"));
        const alias = join(temporaryDirectory, "graph-v3.mjs");
        try {
            symlinkSync(resolve(audit, "build-import-dag-v3.mjs"), alias);
            const result = spawnSync(
                process.execPath,
                [
                    alias,
                    "--repository-root",
                    join(temporaryDirectory, "missing-repository"),
                    "--output-directory",
                    audit,
                ],
                { cwd: root, encoding: "utf8" },
            );
            expect(result.error).toBeUndefined();
            expect(result.status).not.toBe(0);
            expect(result.stderr).toMatch(/ENOENT|no such file|cannot find/i);
        } finally {
            rmSync(temporaryDirectory, { recursive: true, force: true });
        }
    });
});
