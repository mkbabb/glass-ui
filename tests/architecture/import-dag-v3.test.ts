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
    extractFileOperations,
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

    it("keeps empty runtime imports eager while empty type imports stay type-only", () => {
        const { references } = extractScriptReferences(`
            import {} from "./runtime-side-effect";
            import type {} from "./type-only";
            import { Runtime, type Contract } from "./mixed";
        `);
        expect(
            references.map(({ edgeKind, specifier, metadata }) => ({
                edgeKind,
                specifier,
                symbols: metadata.symbols,
            })),
        ).toEqual([
            {
                edgeKind: "eager-runtime",
                specifier: "./runtime-side-effect",
                symbols: [{ name: "*side-effect*", typeOnly: false }],
            },
            {
                edgeKind: "type-only",
                specifier: "./type-only",
                symbols: [],
            },
            {
                edgeKind: "eager-runtime",
                specifier: "./mixed",
                symbols: [{ name: "Runtime", local: "Runtime", typeOnly: false }],
            },
            {
                edgeKind: "type-only",
                specifier: "./mixed",
                symbols: [{ name: "Contract", local: "Contract", typeOnly: true }],
            },
        ]);
    });

    it("resolves exact finite dynamic imports and fails unknown or multi-value locality closed", () => {
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

    it("taints finite provenance after declaration-wide mutation but preserves stable loops", () => {
        const cases = [
            `let path = "./assigned"; path = "./later"; import(path);`,
            `let path = "./updated"; path++; import(path);`,
            `const refs = { one: "./property" }; refs.one = "./later"; import(refs.one);`,
            `const refs = { one: "./deleted" }; delete refs.one; import(refs.one);`,
            `let path = "./destructured"; ({ path } = { path: "./later" }); import(path);`,
            `let path = "./loop-target"; for (path of ["./later"]) {} import(path);`,
            `let path = "./nested"; ({ outer: [path = "./default", ...rest] } = { outer: ["./later"] }); import(path);`,
            `let path = "./loop-nested"; for ({ path } of [{ path: "./later" }]) {} import(path);`,
            `const refs = { nested: { one: "./nested-property" } }; ({ nested: { one: refs.nested.one } } = value); import(refs.nested.one);`,
        ];
        for (const source of cases) {
            const extracted = extractScriptReferences(source);
            expect(extracted.references.filter(({ edgeKind }) => edgeKind === "finite-dynamic")).toEqual([]);
            expect(extracted.nonliteralReferences).toEqual([
                expect.objectContaining({ edgeKind: "finite-dynamic", localHint: true }),
            ]);
        }

        const stable = extractScriptReferences(`
            const stable = "./stable";
            import(stable);
            const shaders = {
                aurora: "/src/components/aurora/constants/shaders/aurora.wgsl.ts#AURORA_WGSL",
                metaball: "/src/components/blob/shaders/metaball.wgsl.ts#METABALL_WGSL",
            };
            for (const [, ref] of Object.entries(shaders)) {
                const [path] = ref.split("#");
                import(path);
            }
        `);
        expect(
            stable.references
                .filter(({ edgeKind }) => edgeKind === "finite-dynamic")
                .map(({ specifier }) => specifier)
                .sort(),
        ).toEqual([
            "./stable",
            "/src/components/aurora/constants/shaders/aurora.wgsl.ts",
            "/src/components/blob/shaders/metaball.wgsl.ts",
        ]);
        expect(stable.nonliteralReferences).toEqual([]);
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

    it("recognizes fs provenance forms and rejects local file-operation lookalikes", () => {
        const { sourceFile } = extractScriptReferences(`
            import { readFileSync as read } from "node:fs";
            import * as fs from "fs";
            const { writeFileSync: write } = require("node:fs");
            const required = require("fs");

            read("read.txt");
            fs.writeFileSync("namespace.txt", "content");
            write("destructured.txt", "content");
            required.copyFileSync("copy-source.txt", "copy-target.txt");
            required.rm("remove.txt");
            required.rmSync("remove-sync.txt");
            const cjsAlias = required;
            cjsAlias.readFileSync = replacement;
            required.readFileSync("mutated-member.txt");
            const reboundAlias = required;
            reboundAlias = replacement;
            reboundAlias.readFileSync("rebound-alias.txt");
            let nestedRead = required.writeFileSync;
            ({ readFileSync: nestedRead } = required);
            nestedRead = replacement;
            nestedRead("nested-rebound.txt");
            let reassigned = required.writeFileSync;
            reassigned = replacement;
            reassigned("reassigned-call.txt", "content");

            function readFileSync(_path: string) {}
            readFileSync("local-function.txt");
            const local = { writeFileSync(_path: string) {} };
            local.writeFileSync("local-method.txt");
        `);
        const operations = extractFileOperations(sourceFile, "fixture.ts", root, null);

        expect(operations.operations).toHaveLength(7);
        expect(
            operations.operations.map(({ operation, target, effect }) => ({
                operation,
                target,
                effect: effect ?? null,
            })),
        ).toEqual([
            { operation: "readFileSync", target: "read.txt", effect: null },
            { operation: "writeFileSync", target: "namespace.txt", effect: null },
            { operation: "writeFileSync", target: "destructured.txt", effect: null },
            { operation: "copyFileSync", target: "copy-source.txt", effect: null },
            { operation: "copyFileSync", target: "copy-target.txt", effect: null },
            { operation: "rm", target: "remove.txt", effect: "delete" },
            { operation: "rmSync", target: "remove-sync.txt", effect: "delete" },
        ]);
        expect(operations.unmodeled.map(({ operation, boundary }) => ({ operation, boundary }))).toEqual([
            { operation: "readFileSync", boundary: "tainted-fs-member" },
            { operation: "writeFileSync", boundary: "tainted-fs-member" },
            { operation: "writeFileSync", boundary: "tainted-fs-member" },
        ]);

        const reboundOnly = extractScriptReferences(`
            const required = require("node:fs");
            const alias = required;
            alias = replacement;
            required.readFileSync("stable-after-rebind.txt");
            alias.readFileSync("local-after-rebind.txt");
        `);
        const reboundOnlyOperations = extractFileOperations(
            reboundOnly.sourceFile,
            "fixture.ts",
            root,
            null,
            new Map(),
            reboundOnly.bindingResolver,
        );
        expect(reboundOnlyOperations.operations).toEqual([
            expect.objectContaining({
                operation: "readFileSync",
                target: "stable-after-rebind.txt",
            }),
        ]);
        expect(reboundOnlyOperations.unmodeled).toEqual([]);

        const sharedMutation = extractScriptReferences(`
            const required = require("node:fs");
            const alias = required;
            alias.readFileSync = replacement;
            required.readFileSync("shared-after-mutation.txt");
        `);
        expect(
            extractFileOperations(
                sharedMutation.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                sharedMutation.bindingResolver,
            ).unmodeled,
        ).toEqual([
            expect.objectContaining({
                operation: "readFileSync",
                boundary: "tainted-fs-member",
            }),
        ]);
    });

    it("models awaited exact dynamic fs imports and bounds promise properties", () => {
        const fixture = extractScriptReferences(`
            const specifier = "node:fs";
            const directPromise = import(specifier);
            directPromise.readFileSync("direct-unawaited.txt");
            const awaitedDirect = await import(specifier);
            awaitedDirect.readFileSync("awaited-direct.txt");
            const aliasedPromise = import(specifier);
            aliasedPromise["writeFileSync"]("aliased-unawaited.txt", "content");
            const awaitedAlias = await aliasedPromise;
            awaitedAlias.writeFileSync("awaited-alias.txt", "content");
            aliasedPromise.then((fs) => fs.readFileSync("promise-boundary.txt"));
            const { readFileSync: reassignedCallable } = await import(specifier);
            reassignedCallable = replacement;
            reassignedCallable("reassigned-callable.txt");
        `, "fixture.ts", null, {}, { repositoryRoot: root });
        const operations = extractFileOperations(
            fixture.sourceFile,
            "fixture.ts",
            root,
            null,
            new Map(),
            fixture.bindingResolver,
        );

        expect(operations.operations.map(({ operation, target }) => ({ operation, target }))).toEqual([
            { operation: "readFileSync", target: "awaited-direct.txt" },
            { operation: "writeFileSync", target: "awaited-alias.txt" },
        ]);
        expect(operations.unmodeled).toEqual([
            expect.objectContaining({
                operation: "then",
                boundary: "module-promise",
                moduleName: "node:fs",
            }),
            expect.objectContaining({
                operation: "readFileSync",
                boundary: "tainted-fs-member",
            }),
        ]);

        for (const path of ["fixture.mjs", "fixture.mts"]) {
            const moduleFixture = extractScriptReferences(
                'const fs=await(import("node:fs")); fs.readFileSync("coordinate.txt");',
                path,
                null,
                {},
                { repositoryRoot: root },
            );
            expect(moduleFixture.parseErrors).toEqual([]);
            const moduleOperations = extractFileOperations(
                moduleFixture.sourceFile,
                path,
                root,
                null,
                new Map(),
                moduleFixture.bindingResolver,
            );
            expect(moduleOperations.operations).toEqual([
                expect.objectContaining({
                    operation: "readFileSync",
                    target: "coordinate.txt",
                    line: 1,
                    column: 36,
                }),
            ]);
        }
    });

    it("does not resolve a shadowing root parameter as the repository root", () => {
        const { sourceFile } = extractScriptReferences(`
            import { readdirSync } from "node:fs";
            const root = process.cwd();
            readdirSync(root);
            function scan(root: string) {
                readdirSync(root);
            }
        `);
        const operations = extractFileOperations(sourceFile, "fixture.ts", root, null);

        expect(operations.operations).toEqual([
            expect.objectContaining({
                edgeKind: "generator-read",
                operation: "readdirSync",
                target: ".",
                line: 4,
            }),
        ]);
        expect(operations.unmodeled).toEqual([
            expect.objectContaining({
                operation: "readdirSync",
                line: 6,
            }),
        ]);
    });

    it("keeps path provenance lexical, taint-aware, and fail-closed", () => {
        const { sourceFile } = extractScriptReferences(`
            import { readFileSync, readdirSync } from "node:fs";
            import { join, resolve } from "node:path";
            import { fileURLToPath as pathFromUrl } from "node:url";
            import { REPO_ROOT } from "./scripts/lib/subpath-policy.mjs";

            const immutable = process.cwd();
            const alias = immutable;
            readdirSync(resolve(alias, "src"));
            readdirSync(REPO_ROOT);
            readFileSync(pathFromUrl(import.meta.url));

            let tainted = process.cwd();
            tainted = resolve("bad");
            readdirSync(tainted);

            function arbitrary(root: string) {
                readdirSync(root);
            }
            function shadowedDir(__dirname: string) {
                readFileSync(join(__dirname, "x"));
            }
            function shadowedProcess(process: { cwd: () => string }) {
                readdirSync(process.cwd());
            }
            function shadowedJoin(join: (...parts: string[]) => string) {
                readdirSync(join("src"));
            }
            function shadowedResolve(resolve: (...parts: string[]) => string) {
                readdirSync(resolve("src"));
            }
            function varShadow() {
                {
                    var process = { cwd: () => "bad" };
                }
                readdirSync(process.cwd());
            }
        `);
        const operations = extractFileOperations(sourceFile, "fixture.ts", root, null);

        expect(operations.operations.map(({ target }) => target).sort()).toEqual([
            ".",
            "fixture.ts",
            "src",
        ]);
        expect(operations.unmodeled).toHaveLength(7);
        expect(operations.unmodeled.map(({ operation }) => operation)).toEqual(
            expect.arrayContaining([
                "readFileSync",
                "readdirSync",
                "readdirSync",
                "readdirSync",
                "readdirSync",
                "readdirSync",
                "readdirSync",
            ]),
        );

        for (const source of [
            `import { readdirSync } from "node:fs"; process = {}; readdirSync(process.cwd());`,
            `import { readdirSync } from "node:fs"; process.cwd = () => "/bad"; readdirSync(process.cwd());`,
            `import { readdirSync } from "node:fs"; process["cwd"] = () => "/bad"; readdirSync(process.cwd());`,
            `import { readdirSync } from "node:fs"; process[dynamicKey] = value; readdirSync(process.cwd());`,
            `import { readdirSync } from "node:fs"; const p = process; p.cwd = () => "/bad"; readdirSync(process.cwd());`,
            `import { readdirSync } from "node:fs"; const p = process; Object.defineProperty(p, "cwd", {}); readdirSync(process.cwd());`,
            `import { readdirSync } from "node:fs"; const p = process; ({ nested: [p.cwd] } = value); readdirSync(process.cwd());`,
            `import { readdirSync } from "node:fs"; import { ROOT as wrongRoot } from "./nested/scripts/lib/canon-doc.mjs"; readdirSync(wrongRoot);`,
        ]) {
            const fixture = extractScriptReferences(source);
            const tainted = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(tainted.operations).toEqual([]);
            expect(tainted.unmodeled).toEqual([
                expect.objectContaining({ operation: "readdirSync" }),
            ]);
        }

        const defaultProcess = extractScriptReferences(
            `import p from "node:process";
             import { readdirSync } from "node:fs";
             readdirSync(p.cwd());`,
        );
        const defaultProcessOperations = extractFileOperations(
            defaultProcess.sourceFile,
            "fixture.ts",
            root,
            null,
            new Map(),
            defaultProcess.bindingResolver,
        );
        expect(defaultProcessOperations.operations).toEqual([
            expect.objectContaining({ operation: "readdirSync", target: ".", line: 3 }),
        ]);

        const defaultProcessMutation = extractScriptReferences(
            `import p from "node:process";
             import { readdirSync } from "node:fs";
             const alias = p;
             alias.cwd = replacement;
             readdirSync(process.cwd());`,
        );
        const defaultProcessMutationOperations = extractFileOperations(
            defaultProcessMutation.sourceFile,
            "fixture.ts",
            root,
            null,
            new Map(),
            defaultProcessMutation.bindingResolver,
        );
        expect(defaultProcessMutationOperations.operations).toEqual([]);
        expect(defaultProcessMutationOperations.unmodeled).toEqual([
            expect.objectContaining({ operation: "readdirSync", line: 5 }),
        ]);

        const bareAliasRebind = extractScriptReferences(
            `import p from "node:process";
             import { readdirSync } from "node:fs";
             p = replacement;
             readdirSync(process.cwd());`,
        );
        expect(
            extractFileOperations(
                bareAliasRebind.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                bareAliasRebind.bindingResolver,
            ).operations,
        ).toEqual([
            expect.objectContaining({ operation: "readdirSync", target: ".", line: 4 }),
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

    it("projects the canonical generator and manifest without seeding emitted artifacts", () => {
        const generatorPath =
            "docs/tranches/BJ/audits/2026-07-28-library-dag/build-import-dag-v3.mjs";
        const manifestPath =
            "docs/tranches/BJ/audits/2026-07-28-library-dag/OWNER-MANIFEST.json";
        expect(graph.nodes.find(({ path }) => path === generatorPath)).toMatchObject({
            projection: "scripts-generators",
            nodeKind: "repository-file",
            owner: "repository/docs",
        });
        expect(graph.nodes.find(({ path }) => path === manifestPath)).toMatchObject({
            projection: "scripts-generators",
            nodeKind: "repository-file",
            owner: "repository/docs",
        });
        expect(
            graph.nodes.some(({ path }) =>
                [
                    "docs/tranches/BJ/audits/2026-07-28-library-dag/IMPORT-DAG-V3.json",
                    "docs/tranches/BJ/audits/2026-07-28-library-dag/IMPORT-DAG-V3-SUMMARY.md",
                ].includes(path),
            ),
        ).toBe(false);

        const outgoing = [...graph.internalEdges, ...graph.externalEdges].filter(
            ({ source }) => source === generatorPath,
        );
        expect(outgoing).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    edgeKind: "generator-read",
                    target: manifestPath,
                }),
                expect.objectContaining({
                    edgeKind: "literal-dynamic",
                    specifier: "../../../../../scripts/lib/subpath-policy.mjs",
                }),
                expect.objectContaining({
                    edgeKind: "eager-runtime",
                    specifier: "@vue/compiler-dom",
                }),
                expect.objectContaining({
                    edgeKind: "eager-runtime",
                    specifier: "@vue/compiler-sfc",
                }),
                expect.objectContaining({ edgeKind: "eager-runtime", specifier: "postcss" }),
                expect.objectContaining({ edgeKind: "eager-runtime", specifier: "typescript" }),
            ]),
        );
        expect(
            outgoing
                .filter(({ resolution }) => resolution === "external-package")
                .map(({ specifier }) => specifier)
                .sort(),
        ).toEqual(
            expect.arrayContaining([
                "node:child_process",
                "node:crypto",
                "node:fs",
                "node:path",
                "node:url",
            ]),
        );
    });

    it("ratchets the truthful package/style/utility operation closure", () => {
        const generatorEdge = (
            source: string,
            target: string,
            edgeKind: string,
            operation: string,
        ) =>
            graph.internalEdges.find(
                (edge) =>
                    edge.source === source &&
                    edge.target === target &&
                    edge.edgeKind === edgeKind &&
                    edge.metadata?.operation === operation,
            );
        const generatorPath =
            "docs/tranches/BJ/audits/2026-07-28-library-dag/build-import-dag-v3.mjs";

        expect(generatorEdge(generatorPath, "package.json", "generator-read", "readFileSync")).toBeDefined();
        expect(
            graph.internalEdges.filter(
                (edge) =>
                    edge.source === "scripts/regen-exports.mjs" &&
                    edge.target === "package.json" &&
                    edge.edgeKind === "generator-read" &&
                    edge.metadata?.operation === "readFileSync",
            ),
        ).toHaveLength(2);
        expect(generatorEdge("scripts/regen-exports.mjs", "package.json", "generator-write", "writeFileSync")).toBeDefined();
        for (const [source, target, edgeKind] of [
            ["vite.style-fold.ts", "src/components", "generator-read"],
            ["vite.style-fold.ts", "src/fonts", "generator-read"],
            ["vite.style-fold.ts", "src/styles", "generator-read"],
            ["vite.style-fold.ts", "dist/components", "generator-write"],
            ["vite.style-fold.ts", "dist/fonts", "generator-write"],
            ["vite.style-fold.ts", "dist/styles", "generator-write"],
        ] as const) {
            expect(generatorEdge(source, target, edgeKind, "cpSync")).toBeDefined();
        }
        expect(generatorEdge("vite.style-fold.ts", "dist/styles/index.css", "generator-read", "readFileSync")).toBeDefined();
        expect(generatorEdge("vite.style-fold.ts", "dist/styles/index.css", "generator-write", "writeFileSync")).toBeDefined();
        expect(generatorEdge("vite.style-fold.ts", "dist/glass-ui.css", "generator-read", "readFileSync")).toBeDefined();
        expect(generatorEdge("vite.style-fold.ts", "dist/glass-ui.css", "generator-write", "writeFileSync")).toBeDefined();
        expect(generatorEdge("vite.utility-emit.ts", "dist", "generator-read", "readdirSync")).toBeDefined();
        expect(generatorEdge("vite.utility-emit.ts", "src/styles", "generator-read", "readdirSync")).toBeDefined();
        expect(generatorEdge("vite.utility-emit.ts", "dist/styles/components.css", "generator-write", "writeFileSync")).toBeDefined();
        expect(
            graph.internalEdges.filter(
                (edge) =>
                    edge.source === "vite.utility-emit.ts" &&
                    edge.target === "dist/styles/index.css" &&
                    edge.edgeKind === "generator-write" &&
                    edge.metadata?.operation === "writeFileSync",
            ),
        ).toHaveLength(2);
        expect(
            graph.internalEdges.find(
                (edge) =>
                    edge.source === "scripts/flatten-subpath-types.mjs" &&
                    edge.target === "dist/subpaths" &&
                    edge.edgeKind === "generator-write" &&
                    edge.metadata?.operation === "rmSync" &&
                    edge.metadata?.effect === "delete",
            ),
        ).toBeDefined();

        expect(graph.summary.nodes).toBe(1501);
        expect(graph.summary.internalEdges).toBe(3585);
        expect(graph.summary.edgeKindCounts["generator-read"]).toBe(13);
        expect(graph.summary.edgeKindCounts["generator-write"]).toBe(12);
        expect(graph.summary.unmodeledFileOperations).toBe(273);
        expect(graph.summary.nodeKindCounts["generated-by-write"]).toBe(7);
        expect(graph.summary.nodeKindCounts["missing-runtime-placeholder"]).toBe(9);
        expect(
            graph.internalEdges.find(
                (edge) =>
                    edge.source === "vite.style-fold.ts" &&
                    edge.target === "." &&
                    edge.edgeKind === "generator-read" &&
                    edge.metadata?.operation === "readdirSync",
            ),
        ).toBeUndefined();

        expect(graph.nodes.find(({ path }) => path === "dist")).toMatchObject({
            nodeKind: "missing-runtime-placeholder",
        });
        for (const path of ["dist/components", "dist/fonts", "dist/styles"]) {
            expect(graph.nodes.find((node) => node.path === path)).toMatchObject({
                nodeKind: "generated-by-write",
                generatedBy: "vite.style-fold.ts",
            });
        }
        for (const path of ["src/components", "src/fonts", "src/styles"]) {
            expect(graph.nodes.find((node) => node.path === path)).toMatchObject({
                nodeType: "directory",
                nodeKind: "directory",
            });
        }
        expect(graph.nodes.find(({ path }) => path === "dist/styles/index.css")).toMatchObject({
            nodeType: "generated-artifact",
            nodeKind: "generated-by-write",
            generatedBy: "vite.style-fold.ts",
        });
        expect(graph.nodes.find(({ path }) => path === "dist/subpaths")).toMatchObject({
            nodeKind: "missing-runtime-placeholder",
            generatedBy: null,
        });

        const gitInvocation = graph.processInvocations.find(
            ({ source, api, argv }) =>
                source === generatorPath &&
                api === "execFileSync" &&
                argv[0]?.value === "-C",
        );
        expect(gitInvocation).toMatchObject({
            command: { value: "git", dynamic: false },
            dynamicArguments: 0,
        });
        expect(gitInvocation?.argv[1]).toMatchObject({
            expression: "repositoryRoot",
            target: ".",
            dynamic: false,
        });
    });

    it("uses block-type-aware Vue external-block metadata", () => {
        const edges = graph.internalEdges.filter(({ edgeKind }) => edgeKind === "vue-block");
        expect(edges.length).toBeGreaterThan(0);
        for (const { metadata } of edges) {
            expect(metadata.blockKind).toBe(metadata.blockType);
            expect(metadata.src).toEqual(expect.any(String));
            expect(metadata).toHaveProperty("lang");
            expect(metadata.lang).toBe(String(metadata.lang).toLowerCase());
            expect(metadata.blockIndex).toEqual(expect.any(Number));
            expect(metadata.setup).toEqual(expect.any(Boolean));
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

    it("propagates complete SFC identity to edges and applicable ledgers", async () => {
        const suffix = `${process.pid}`;
        const externalFixture = `tests/architecture/__graph-v3-sfc-external-${suffix}.vue`;
        const externalScript = `tests/architecture/__graph-v3-sfc-external-${suffix}.ts`;
        const externalTemplate = `tests/architecture/__graph-v3-sfc-external-${suffix}.html`;
        const externalStyle = `tests/architecture/__graph-v3-sfc-external-${suffix}.css`;
        const inlineFixture = `tests/architecture/__graph-v3-sfc-inline-${suffix}.vue`;
        const malformedFixture = `tests/architecture/__graph-v3-sfc-malformed-${suffix}.vue`;
        const cleanups = [
            temporarilyWrite(
                resolve(root, externalFixture),
                `<script src="./__graph-v3-sfc-external-${suffix}.ts"></script>
<template src="./__graph-v3-sfc-external-${suffix}.html"></template>
<style src="./__graph-v3-sfc-external-${suffix}.css" scoped module lang="CSS"></style>
`,
            ),
            temporarilyWrite(resolve(root, externalScript), "export const external = true;\n"),
            temporarilyWrite(resolve(root, externalTemplate), "<div>external</div>\n"),
            temporarilyWrite(resolve(root, externalStyle), ".external { color: red; }\n"),
            temporarilyWrite(
                resolve(root, inlineFixture),
                `<script setup lang="TS">
import { spawn } from "node:child_process";
const dynamicPath = runtimeChosenPath;
import(dynamicPath);
spawn("node", [dynamicPath]);
</script>
<template>
  <img src="../../tests-visual/fixtures/starry-night-crop.png" alt="literal">
  <img :src="dynamicAsset" alt="dynamic">
</template>
<style lang="CSS" scoped module>
@import "../../src/styles/index.css";
.inline { background-image: url("../../tests-visual/fixtures/starry-night-crop.png"); }
</style>
`,
            ),
            temporarilyWrite(
                resolve(root, malformedFixture),
                `<script setup lang="TS">
const broken: = {;
</script>
`,
            ),
        ];
        try {
            const fixtureGraph = await buildGraph({
                repositoryRoot: root,
                outputDirectory: audit,
            });
            const allEdges = [...fixtureGraph.internalEdges, ...fixtureGraph.externalEdges];
            const identity = (metadata: Record<string, unknown>, blockKind: string, blockIndex: number, setup: boolean) =>
                expect(metadata).toEqual(
                    expect.objectContaining({
                        blockKind,
                        blockType: blockKind,
                        blockIndex,
                        lang: expect.stringMatching(/^[a-z0-9]+$/),
                        setup,
                    }),
                );

            for (const [source, expected] of [
                [externalFixture, [
                    { blockKind: "script", blockIndex: 0, setup: false, lang: "js" },
                    { blockKind: "template", blockIndex: 1, setup: false, lang: "html" },
                    { blockKind: "style", blockIndex: 2, setup: false, lang: "css" },
                ]],
                [inlineFixture, [
                    { blockKind: "script", blockIndex: 0, setup: true, lang: "ts" },
                    { blockKind: "template", blockIndex: 1, setup: false, lang: "html" },
                    { blockKind: "style", blockIndex: 2, setup: false, lang: "css" },
                ]],
            ] as const) {
                const metadata = allEdges
                    .filter(({ source: edgeSource }) => edgeSource === source)
                    .map(({ metadata }) => metadata);
                for (const expectedIdentity of expected) {
                    const match = metadata.find(
                        (value) =>
                            value.blockKind === expectedIdentity.blockKind &&
                            value.blockIndex === expectedIdentity.blockIndex,
                    );
                    expect(
                        match,
                        `${source} missing ${expectedIdentity.blockKind}:${expectedIdentity.blockIndex}`,
                    ).toBeDefined();
                    identity(
                        match!,
                        expectedIdentity.blockKind,
                        expectedIdentity.blockIndex,
                        expectedIdentity.setup,
                    );
                    expect(match?.lang).toBe(expectedIdentity.lang);
                }
            }

            expect(
                allEdges.find(
                    ({ source, edgeKind, target }) =>
                        source === externalFixture &&
                        edgeKind === "vue-block" &&
                        target === externalStyle,
                )?.metadata,
            ).toEqual(
                expect.objectContaining({
                    styleIndex: 0,
                    scoped: true,
                    module: true,
                }),
            );
            expect(
                fixtureGraph.nonliteralLocalReferences.find(
                    ({ source }) => source === inlineFixture,
                ),
            ).toEqual(
                expect.objectContaining({
                    blockKind: "script",
                    blockType: "script",
                    blockIndex: 0,
                    lang: "ts",
                    setup: true,
                }),
            );
            expect(
                fixtureGraph.processInvocations.find(
                    ({ source }) => source === inlineFixture,
                ),
            ).toEqual(
                expect.objectContaining({
                    blockKind: "script",
                    blockIndex: 0,
                    lang: "ts",
                    setup: true,
                }),
            );
            expect(
                fixtureGraph.dynamicAssetReferences.find(
                    ({ source }) => source === inlineFixture,
                ),
            ).toEqual(
                expect.objectContaining({
                    blockKind: "template",
                    blockIndex: 1,
                    lang: "html",
                    setup: false,
                }),
            );
            expect(
                fixtureGraph.parseErrors.find(({ source }) => source === malformedFixture),
            ).toEqual(
                expect.objectContaining({
                    blockKind: "script",
                    blockIndex: 0,
                    lang: "ts",
                    setup: true,
                }),
            );
        } finally {
            for (const cleanup of cleanups.reverse()) cleanup();
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
