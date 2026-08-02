import { execFileSync, spawn, spawnSync } from "node:child_process";
import {
    cpSync,
    existsSync,
    mkdirSync,
    mkdtempSync,
    readdirSync,
    readFileSync,
    renameSync,
    rmSync,
    symlinkSync,
    writeFileSync,
} from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";
import { beforeAll, describe, expect, it } from "vitest";

import {
    assertStoredArtifacts,
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
const graph = JSON.parse(readFileSync(resolve(audit, "IMPORT-DAG-V3.json"), "utf8")) as Awaited<
    ReturnType<typeof buildGraph>
>;
const require = createRequire(import.meta.url);
const manifest = require(
    "../../docs/tranches/BJ/audits/2026-07-28-library-dag/OWNER-MANIFEST.json",
);
const packageJson = require("../../package.json");

const fixtureAudit = "docs/tranches/BJ/audits/2026-07-28-library-dag";
const ownerManifest = {
    schema: "glass-ui-owner-manifest/1",
    owners: { "fixture/graph": ["**"] },
    publicEntries: { ".": "fixture/graph" },
    cycleBaselines: {
        components: {},
        projections: {
            eagerRuntime: { fileComponents: [], ownerComponents: [] },
            buildLoad: { fileComponents: [], ownerComponents: [] },
            ownership: { fileComponents: [], ownerComponents: [] },
        },
    },
};
const styleFoldSource = `
import { cpSync } from "node:fs";
import { resolve } from "node:path";

export function copyStyleAssets(root: string) {
    const srcFonts = resolve(root, "src/fonts");
    const distStyles = resolve(root, "dist/styles");
    const distComponents = resolve(root, "dist/components");
    cpSync(srcFonts, resolve(root, "dist/fonts"), { recursive: true });
    cpSync(resolve(root, "src/styles"), distStyles, { recursive: true });
    cpSync(resolve(root, "src/components"), distComponents, { recursive: true });
    return { srcFonts, distStyles, distComponents };
}
`;
const utilityEmitSource = `
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

export function emitComponentUtilities(root: string) {
    writeFileSync(resolve(root, "dist/styles/components.css"), "fixture");
}
`;
const baselineStyleAssets = `
import { emitComponentUtilities } from "./vite.utility-emit";
const root = process.cwd();
const { srcFonts, distStyles, distComponents } =
    (await import("./vite.style-fold")).copyStyleAssets(root);
emitComponentUtilities(root);
void srcFonts;
void distStyles;
void distComponents;
`;
const negativePromiseRows = [
    [
        "literal import then",
        `import("./vite.utility-emit").then((module) => module.emitComponentUtilities(root));`,
    ],
    [
        "two-argument import then",
        `import("./vite.utility-emit", { with: { type: "json" } }).then((module) => module.emitComponentUtilities(root));`,
    ],
    [
        "finite stored promise then",
        `const specifier = "./vite.utility-emit"; const promise = import(specifier); promise.then(() => undefined);`,
    ],
    [
        "stored then awaited exact target promise",
        `const promise = import("./vite.utility-emit"); const namespace = await promise; namespace.emitComponentUtilities(root);`,
    ],
    [
        "direct await target plus nontarget",
        `const specifier = Math.random() ? "./vite.utility-emit" : "node:fs"; await import(specifier);`,
    ],
    [
        "consumed awaited target namespace",
        `consume(await import("./vite.utility-emit"));`,
    ],
    ["promise passed", `consume(import("./vite.utility-emit"));`],
    ["promise returned", `function escape() { return import("./vite.utility-emit"); }`],
    ["promise stored in object", `const object = { promise: import("./vite.utility-emit") };`],
    ["promise stored in array", `const array = [import("./vite.utility-emit")];`],
    ["promise otherwise escaped", `globalThis.promise = import("./vite.utility-emit");`],
] as const;
const directAwaitPromiseRows = [
    ["parenthesized direct await", `await (import("./vite.utility-emit"));`],
    ["as-wrapper direct await", `await (import("./vite.utility-emit") as typeof import("./vite.utility-emit"));`],
    ["satisfies-wrapper direct await", `await (import("./vite.utility-emit") satisfies Promise<unknown>);`],
    ["non-null-wrapper direct await", `await (import("./vite.utility-emit")!);`],
    ["two-argument direct await", `await import("./vite.utility-emit", {});`],
] as const;

type ContractFixture = {
    temporaryDirectory: string;
    outputDirectory: string;
    styleAssetsPath: string;
};

async function withContractFixture(
    styleAssetsSource: string,
    execute: (fixture: ContractFixture) => Promise<void>,
    afterSetup: ((fixture: ContractFixture) => void) | null = null,
    seedFiles: Record<string, string | Buffer> = {},
) {
    const temporaryDirectory = mkdtempSync(join(tmpdir(), "glass-graph-v3-contract-"));
    const fixture: ContractFixture = {
        temporaryDirectory,
        outputDirectory: resolve(temporaryDirectory, fixtureAudit),
        styleAssetsPath: resolve(temporaryDirectory, "vite.style-assets.ts"),
    };
    try {
        mkdirSync(fixture.outputDirectory, { recursive: true });
        mkdirSync(resolve(temporaryDirectory, "src/components"), { recursive: true });
        mkdirSync(resolve(temporaryDirectory, "src/composables"), { recursive: true });
        writeFileSync(resolve(temporaryDirectory, "src/index.ts"), "export const fixture = true;\n");
        mkdirSync(resolve(temporaryDirectory, "scripts/lib"), { recursive: true });
        writeFileSync(
            resolve(temporaryDirectory, "scripts/lib/subpath-policy.mjs"),
            "export const fixturePolicy = true;\n",
        );
        writeFileSync(
            resolve(temporaryDirectory, `${fixtureAudit}/OWNER-MANIFEST.json`),
            `${JSON.stringify(ownerManifest, null, 2)}\n`,
        );
        writeFileSync(
            resolve(temporaryDirectory, "package.json"),
            `${JSON.stringify({ name: "graph-v3-contract-fixture", exports: { ".": "./dist/index.js" } }, null, 2)}\n`,
        );
        writeFileSync(
            resolve(temporaryDirectory, ".gitignore"),
            "dist/\n*.png\ndist-demo/\ntests-visual/.cache/\ntests-visual/test-results/\n!tests-visual/fixtures/*.png\n",
        );
        writeFileSync(fixture.styleAssetsPath, styleAssetsSource);
        writeFileSync(resolve(temporaryDirectory, "vite.style-fold.ts"), styleFoldSource);
        writeFileSync(resolve(temporaryDirectory, "vite.utility-emit.ts"), utilityEmitSource);
        for (const [path, contents] of Object.entries(seedFiles)) {
            const target = resolve(temporaryDirectory, path);
            mkdirSync(dirname(target), { recursive: true });
            writeFileSync(target, contents);
        }
        afterSetup?.(fixture);
        execFileSync("git", ["init", "-q"], { cwd: temporaryDirectory, stdio: "ignore" });
        execFileSync("git", ["add", "."], { cwd: temporaryDirectory, stdio: "ignore" });
        await execute(fixture);
    } finally {
        rmSync(temporaryDirectory, { recursive: true, force: true });
    }
}

function hasCopyRead(fixtureGraph: Awaited<ReturnType<typeof buildGraph>>) {
    return fixtureGraph.internalEdges.some(
        ({ source, target, edgeKind, metadata }) =>
            source === "vite.style-fold.ts" &&
            target === "src/fonts" &&
            edgeKind === "generator-read" &&
            metadata?.operation === "cpSync",
    );
}

function hasUtilityWrite(fixtureGraph: Awaited<ReturnType<typeof buildGraph>>) {
    return fixtureGraph.internalEdges.some(
        ({ source, target, edgeKind, metadata }) =>
            source === "vite.utility-emit.ts" &&
            target === "dist/styles/components.css" &&
            edgeKind === "generator-write" &&
            metadata?.operation === "writeFileSync",
    );
}

const processSharedCase = (label: string, body: string, expectedUnmodeled = 1, target: string | null = ".") => [
    label,
    `import { readdirSync } from "node:fs"; ${body}${target === null ? "" : " readdirSync(process.cwd());"}`,
    expectedUnmodeled,
    expectedUnmodeled === 0 ? target : undefined,
] as const;
const cjsSharedCase = (
    label: string,
    body: string,
    target: string | null,
    expectedUnmodeled = 1,
    operation = "readFileSync",
) => [
    label,
    `import { readFileSync } from "node:fs"; const original = require("node:fs"); ${body}${target === null ? "" : ` original.${operation}(${JSON.stringify(target)});`}`,
    expectedUnmodeled,
    expectedUnmodeled === 0 ? target : undefined,
    operation,
] as const;

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

function runCheck(outputDirectory: string, repositoryRoot = root) {
    return spawnSync(
        process.execPath,
        [
            resolve(audit, "build-import-dag-v3.mjs"),
            "--repository-root",
            repositoryRoot,
            "--output-directory",
            outputDirectory,
            "--check",
        ],
        { cwd: root, encoding: "utf8" },
    );
}

function runGenerate(
    outputDirectory: string,
    extraEnvironment: Record<string, string> = {},
    repositoryRoot = root,
) {
    return spawnSync(
        process.execPath,
        [
            resolve(audit, "build-import-dag-v3.mjs"),
            "--repository-root",
            repositoryRoot,
            "--output-directory",
            outputDirectory,
        ],
        {
            cwd: root,
            encoding: "utf8",
            env: { ...process.env, ...extraEnvironment },
        },
    );
}

function generatorProcess(
    outputDirectory: string,
    extraEnvironment: Record<string, string> = {},
    repositoryRoot = root,
) {
    const child = spawn(
        process.execPath,
        [
            resolve(audit, "build-import-dag-v3.mjs"),
            "--repository-root",
            repositoryRoot,
            "--output-directory",
            outputDirectory,
        ],
        { cwd: root, env: { ...process.env, ...extraEnvironment } },
    );
    let stdout = "";
    let stderr = "";
    child.stdout?.on("data", (chunk) => {
        stdout += chunk.toString();
    });
    child.stderr?.on("data", (chunk) => {
        stderr += chunk.toString();
    });
    const completion = new Promise<{
        status: number | null;
        signal: NodeJS.Signals | null;
        stdout: string;
        stderr: string;
    }>((resolvePromise) => {
        child.once("close", (status, signal) => resolvePromise({ status, signal, stdout, stderr }));
    });
    return { child, completion };
}

async function waitForPath(path: string) {
    const deadline = Date.now() + 5000;
    while (!existsSync(path) && Date.now() < deadline) {
        await new Promise((resolvePromise) => setTimeout(resolvePromise, 10));
    }
    expect(existsSync(path)).toBe(true);
}

async function waitForPublicationReady(directory: string) {
    const lockPath = resolve(directory, ".IMPORT-DAG-V3.lock");
    const deadline = Date.now() + 10000;
    while (Date.now() < deadline) {
        const ownerReady = existsSync(lockPath) && readdirSync(lockPath).some((name) => /^owner\..+\.json$/.test(name));
        const tempCount = readdirSync(directory).filter(
            (name) => name.startsWith(".IMPORT-DAG-V3.") && name.endsWith(".tmp"),
        ).length;
        if (ownerReady && tempCount === 2) return;
        await new Promise((resolvePromise) => setTimeout(resolvePromise, 10));
    }
    throw new Error("graph-v3 test: publication owner and sibling temps did not appear");
}

async function waitForSummaryRename(directory: string, previous: Buffer) {
    const deadline = Date.now() + 10000;
    while (Date.now() < deadline) {
        const summary = readFileSync(resolve(directory, "IMPORT-DAG-V3-SUMMARY.md"));
        const jsonTempCount = readdirSync(directory).filter(
            (name) => name.startsWith(".IMPORT-DAG-V3.") && name.endsWith(".json.tmp"),
        ).length;
        if (!summary.equals(previous) && jsonTempCount === 1) return;
        await new Promise((resolvePromise) => setTimeout(resolvePromise, 10));
    }
    throw new Error("graph-v3 test: summary rename and JSON sibling temp did not appear");
}

function expectNoArtifactResidue(directory: string) {
    expect(existsSync(resolve(directory, ".IMPORT-DAG-V3.lock"))).toBe(false);
    expect(
        readdirSync(directory).filter(
            (name) => name.startsWith(".IMPORT-DAG-V3.") && name.endsWith(".tmp"),
        ),
    ).toEqual([]);
}

beforeAll(() => {
    expectNoArtifactResidue(audit);
    assertStoredArtifacts(audit, graph);
});

function finishGenerator(generator: ReturnType<typeof generatorProcess>) {
    return generator.completion;
}

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
        const deadOrdinaryCalls = extractScriptReferences(
            `false && local("./dead-and"); true || local("./dead-or"); 1 ?? local("./dead-nullish");`,
        );
        expect(deadOrdinaryCalls.references).toEqual([]);
        expect(deadOrdinaryCalls.nonliteralReferences).toEqual([]);
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

        for (const [source, specifier] of [
            [`import(false || "./logical-false-or");`, "./logical-false-or"],
            [`import(true && "./logical-true-and");`, "./logical-true-and"],
            [`import(null ?? "./logical-nullish");`, "./logical-nullish"],
            [`import(false || "https://example.com/a");`, "https://example.com/a"],
        ] as const) {
            expect(
                extractScriptReferences(source).references,
                source,
                ).toEqual([expect.objectContaining({ edgeKind: "finite-dynamic", specifier })]);
        }
        expect(
            extractScriptReferences(`let specifier; import(specifier = "./assigned-import"); import(specifier);`).references
                .filter(({ edgeKind }) => edgeKind === "finite-dynamic")
                .map(({ specifier }) => specifier),
        ).toEqual(["./assigned-import", "./assigned-import"]);
        for (const [source, specifier] of [
            [`import(true || "./unreachable");`, "true"],
            [`import(false && "./unreachable");`, "false"],
            [`import(1 ?? "./unreachable");`, "1"],
            [`import(undefined);`, "undefined"],
            [`import(null);`, "null"],
            [`import(-1);`, "-1"],
            [`import(-1n);`, "-1"],
        ] as const) {
            expect(
                extractScriptReferences(source).references,
                source,
            ).toEqual([expect.objectContaining({ edgeKind: "finite-dynamic", specifier })]);
        }
        for (const [source, specifier] of [
            ["import(`${NaN}`);", "NaN"],
            ["import(`${Infinity}`);", "Infinity"],
            ["import(`${undefined}`);", "undefined"],
            ["import(`${null}`);", "null"],
            ["import(`${-1n}`);", "-1"],
        ] as const) {
            expect(
                extractScriptReferences(source).references,
                source,
            ).toEqual([expect.objectContaining({ edgeKind: "finite-dynamic", specifier })]);
        }
        const throwingBigIntTemplate = extractScriptReferences("import(`${+1n}`);");
        expect(throwingBigIntTemplate.references).toEqual([]);
        expect(throwingBigIntTemplate.nonliteralReferences).toEqual([
            expect.objectContaining({ edgeKind: "finite-dynamic" }),
        ]);
        for (const [source, specifier] of [
            ["import(1 + true);", "2"],
            ["import(true + 1);", "2"],
            ["import(1 + null);", "1"],
            ["import(null + 1);", "1"],
            ["import(1 + undefined);", "NaN"],
            ["import(undefined + 1);", "NaN"],
            ["import(1n + 2n);", "3"],
            ["import(2n + 1n);", "3"],
            ["import((1 + true) + 1);", "3"],
            ["import(1 + (true + 1));", "3"],
            ["import((1 + true) + null);", "2"],
            ["import((1n + 2n) + 3n);", "6"],
            ["import(3n + (1n + 2n));", "6"],
            ["import(\"x\" + 1n);", "x1"],
            ["import(1n + \"x\");", "1x"],
        ] as const) {
            expect(extractScriptReferences(source).references, source).toEqual([
                expect.objectContaining({ edgeKind: "finite-dynamic", specifier }),
            ]);
        }
        for (const source of [
            "import(1n + true);",
            "import(true + 1n);",
            "import(1n + null);",
            "import(null + 1n);",
            "import(1n + undefined);",
            "import(undefined + 1n);",
            "import((1n + 2n) + 3);",
            "import(3 + (1n + 2n));",
            "import(`${1n + true}`);",
            "import(`${null + 1n}`);",
        ]) {
            const mixedBigInt = extractScriptReferences(source);
            expect(mixedBigInt.references, source).toEqual([]);
            expect(mixedBigInt.nonliteralReferences, source).toEqual([
                expect.objectContaining({ edgeKind: "finite-dynamic", localHint: true }),
            ]);
        }
        for (const source of [
            "const a = flag ? \"./a\" : \"./b\"; const b = flag ? \"x\" : \"y\"; import(`${a}${b}`);",
            "const a = flag ? \"./a\" : \"./b\"; const b = flag ? \"x\" : \"y\"; import(`${a}-${b}`);",
        ]) {
            const composite = extractScriptReferences(source);
            expect(composite.references).toEqual([]);
            expect(composite.nonliteralReferences).toEqual([
                expect.objectContaining({ edgeKind: "finite-dynamic" }),
            ]);
        }

        for (const [source, specifier] of [
            [`let chosen; chosen ||= "./logical-assignment"; import(chosen);`, "./logical-assignment"],
            [`let chosen; chosen ??= "./nullish-assignment"; import(chosen);`, "./nullish-assignment"],
            [`let chosen = "./known"; chosen += ".js"; import(chosen);`, "./known.js"],
        ] as const) {
            expect(
                extractScriptReferences(source).references,
                source,
            ).toEqual([expect.objectContaining({ edgeKind: "finite-dynamic", specifier })]);
        }

        const correlated = extractScriptReferences(
            `const pair = flag ? ["./a", "-x.js"] : ["./b", "-y.js"]; import(pair[0] + pair[1]);`,
        );
        expect(correlated.references.filter(({ edgeKind }) => edgeKind === "finite-dynamic")).toEqual([]);
        expect(correlated.nonliteralReferences).toEqual([
            expect.objectContaining({ edgeKind: "finite-dynamic", localHint: true }),
        ]);

        for (const [source, specifiers] of [
            [`let spec = "./known"; if (flag) spec += "-b.js"; import(spec);`, ["./known", "./known-b.js"]],
            [`let spec = "./known"; if (flag) spec ||= "./a"; import(spec);`, ["./known"]],
            [`let spec = 1; spec += 2; import(spec);`, ["3"]],
            [`let spec = 1n; spec += 2n; import(spec);`, ["3"]],
        ] as const) {
            const extracted = extractScriptReferences(source);
            expect(
                extracted.references
                    .filter(({ edgeKind }) => edgeKind === "finite-dynamic")
                    .map(({ specifier }) => specifier)
                    .sort(),
                source,
            ).toEqual([...specifiers].sort());
        }
        for (const source of [
            `const a = flag ? "./a" : "./b"; const b = flag ? "x" : "y"; import(a + b);`,
            `const pair = flag ? { a: "./a", b: "x" } : { a: "./b", b: "y" }; import(pair.a + pair.b);`,
            `const pair = flag ? ["./a", "-x.js"] : ["./b", "-y.js"]; const outer = [pair]; import(outer[0][0] + outer[0][1]);`,
        ]) {
            const extracted = extractScriptReferences(source);
            expect(extracted.references.filter(({ edgeKind }) => edgeKind === "finite-dynamic"), source).toEqual([]);
            expect(extracted.nonliteralReferences, source).toEqual([
                expect.objectContaining({ edgeKind: "finite-dynamic" }),
            ]);
        }

        for (const source of [
            `let specifier = "./a"; function mutate() { specifier = "./b"; } mutate(); import(specifier);`,
        ]) {
            const extracted = extractScriptReferences(source);
            expect(extracted.references.filter(({ edgeKind }) => edgeKind === "finite-dynamic")).toEqual([]);
            expect(extracted.nonliteralReferences).toEqual([
                expect.objectContaining({ edgeKind: "finite-dynamic", localHint: true }),
            ]);
        }

        for (const [label, source, localHint] of [
            ["empty prefix", `const prefix = ""; const chosen = prefix + suffix; import(chosen);`, true],
            ["dot prefix", `const prefix = "."; const chosen = prefix + suffix; import(chosen);`, true],
            ["dot-dot prefix", `const prefix = ".."; const chosen = prefix + suffix; import(chosen);`, true],
            ["at prefix", `const prefix = "@"; const chosen = prefix + suffix; import(chosen);`, true],
            ["at-g prefix", `const prefix = "@g"; const chosen = prefix + suffix; import(chosen);`, true],
            ["glass prefix", `const prefix = "@glass"; const chosen = prefix + suffix; import(chosen);`, true],
            ["glass descendant prefix", `const prefix = "@glass/components"; const chosen = prefix + suffix; import(chosen);`, true],
            ["scoped package prefix", "const prefix = \"@scope/pkg\"; const chosen = `${prefix}${suffix}`; import(chosen);", false],
            ["vue package prefix", "const prefix = \"@vue/\"; const chosen = `${prefix}${suffix}`; import(chosen);", false],
            ["other scoped prefix", "const prefix = \"@mkbabb/\"; const chosen = `${prefix}${suffix}`; import(chosen);", false],
            ["glassx prefix", `const prefix = "@glassx"; const chosen = prefix + suffix; import(chosen);`, false],
            ["empty template before remote", "const name = runtimeName; import(`${\"\"}https://${name}`);", false],
            ["remote template prefix", "const prefix = \"https://\"; import(`${prefix}${suffix}`);", false],
        ] as const) {
            const incomplete = extractScriptReferences(source);
            expect(incomplete.references, label).toEqual([]);
            expect(incomplete.nonliteralReferences, label).toEqual([
                expect.objectContaining({ edgeKind: "finite-dynamic", localHint }),
            ]);
        }
    });

    it("taints finite provenance after declaration-wide mutation but preserves stable loops", () => {
        const cases = [
            `let path = "./updated"; path++; import(path);`,
            `const refs = { one: "./property" }; refs.one = "./later"; import(refs.one);`,
            `const refs = { one: "./deleted" }; delete refs.one; import(refs.one);`,
            `const refs = { nested: { one: "./nested-property" } }; ({ nested: { one: refs.nested.one } } = value); import(refs.nested.one);`,
        ];
        for (const source of cases) {
            const extracted = extractScriptReferences(source);
            expect(extracted.references.filter(({ edgeKind }) => edgeKind === "finite-dynamic")).toEqual([]);
            expect(extracted.nonliteralReferences).toEqual([
                expect.objectContaining({ edgeKind: "finite-dynamic", localHint: true }),
            ]);
        }
        for (const [source, specifier] of [
            [`let path = "./assigned"; path = "./later"; import(path);`, "./later"],
            [`let path = "./nested"; ({ outer: [path = "./default", ...rest] } = { outer: ["./later"] }); import(path);`, "./later"],
            [`let path = "./loop-target"; for (path of ["./later"]) {} import(path);`, ["./later", "./loop-target"]],
            [`let path = "./destructured"; ({ path } = { path: "./later" }); import(path);`, "./later"],
            [`const key = "path"; const { [key]: path } = { path: "./computed" }; import(path);`, "./computed"],
            [`let path = "./loop-nested"; for ({ path } of [{ path: "./later" }]) {} import(path);`, ["./later", "./loop-nested"]],
            [`let path; import(path); path = "./later";`, "undefined"],
        ] as const) {
            const extracted = extractScriptReferences(source);
            const expectedSpecifiers = Array.isArray(specifier) ? specifier : specifier ? [specifier] : [];
            expect(
                extracted.references
                    .filter(({ edgeKind }) => edgeKind === "finite-dynamic")
                    .map(({ specifier: value }) => value)
                    .sort(),
            ).toEqual([...expectedSpecifiers].sort());
            if (specifier === null) {
                expect(extracted.nonliteralReferences).toEqual([
                    expect.objectContaining({ edgeKind: "finite-dynamic", localHint: true }),
                ]);
            }
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

    it("recognizes child_process aliases and proves target contracts through public buildGraph", async () => {
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

        const capturedChild = extractScriptReferences(
            `const cp = require("node:child_process"); const run = cp.spawnSync; cp.spawnSync = replacement; run("node", ["captured-child.mjs"]);`,
        );
        expect(
            extractProcessInvocations(
                capturedChild.sourceFile,
                "fixture.ts",
                root,
                null,
                {},
                new Map(),
                capturedChild.bindingResolver,
        ).map(({ api, argv }) => ({ api, script: argv[0]?.value })),
        ).toEqual([{ api: "spawnSync", script: "captured-child.mjs" }]);
        const projectedChild = extractScriptReferences(
            `const cp=require("node:child_process"); const holder={run:cp.spawnSync}; holder.run=local; holder.run("node",[]);`,
        );
        expect(
            extractProcessInvocations(
                projectedChild.sourceFile,
                "fixture.ts",
                root,
                null,
                {},
                new Map(),
                projectedChild.bindingResolver,
            ),
        ).toEqual([
            expect.objectContaining({ api: "spawnSync", dynamicArguments: 1 }),
        ]);
        for (const source of [
            `const cp = require("node:child_process"); const run = cp.spawnSync; Object.defineProperty(cp, "spawnSync", {}); run("node", ["captured-child-intrinsic.mjs"]);`,
            `const cp = require("node:child_process"); const alias = cp; const second = alias; const run = second.spawnSync; cp.spawnSync = replacement; run("node", ["captured-child-alias.mjs"]);`,
        ]) {
            const fixture = extractScriptReferences(source);
            expect(
                extractProcessInvocations(
                    fixture.sourceFile,
                    "fixture.ts",
                    root,
                    null,
                    {},
                    new Map(),
                    fixture.bindingResolver,
                ),
            ).toEqual([
                expect.objectContaining({ api: "spawnSync" }),
            ]);
        }

        const captureAfterChild = extractScriptReferences(
            `const cp = require("node:child_process"); cp.spawnSync = replacement; const run = cp.spawnSync; run("node", ["capture-after-child.mjs"]);`,
        );
        expect(
            extractProcessInvocations(
                captureAfterChild.sourceFile,
                "fixture.ts",
                root,
                null,
                {},
                new Map(),
                captureAfterChild.bindingResolver,
            ),
        ).toEqual([
            expect.objectContaining({ api: "spawnSync", dynamicArguments: 1 }),
        ]);
        for (const source of [
            `const cp = require("node:child_process"); const alias = cp; const second = alias; cp.spawnSync = replacement; const run = second.spawnSync; run("node", []);`,
            `const cp = require("node:child_process"); Object.defineProperty(cp, "spawnSync", {}); const run = cp.spawnSync; run("node", []);`,
        ]) {
            const fixture = extractScriptReferences(source);
            expect(
                extractProcessInvocations(
                    fixture.sourceFile,
                    "fixture.ts",
                    root,
                    null,
                    {},
                    new Map(),
                    fixture.bindingResolver,
                ),
            ).toEqual([
                expect.objectContaining({ api: "spawnSync", dynamicArguments: 1 }),
            ]);
        }

        const crossFunctionChild = extractScriptReferences(
            `import { spawnSync, execFileSync } from "node:child_process"; let run = spawnSync; function mutate() { run = execFileSync; } mutate(); run("node", ["./cross-function.mjs"]);`,
        );
        expect(
            extractProcessInvocations(
                crossFunctionChild.sourceFile,
                "fixture.ts",
                root,
                null,
                {},
                new Map(),
                crossFunctionChild.bindingResolver,
            ),
        ).toEqual([]);

        const bareExecutable = extractScriptReferences(
            `import { spawnSync } from "node:child_process"; spawnSync("git", ["./bare-target.mjs"]);`,
        );
        expect(
            extractProcessInvocations(
                bareExecutable.sourceFile,
                "fixture.ts",
                root,
                null,
                {},
                new Map(),
                bareExecutable.bindingResolver,
            ),
        ).toEqual([
            expect.objectContaining({
                api: "spawnSync",
                command: expect.objectContaining({ value: "git", target: null }),
            }),
        ]);

        for (const [label, options, targets, dynamicArguments] of [
            ["exact child cwd", `{ cwd: "scripts" }`, ["scripts/tool", "scripts/arg"], 0],
            ["missing child cwd", null, ["tool", "arg"], 0],
            ["unknown child cwd", `{ cwd: unknown }`, [null, null], 2],
        ] as const) {
            const fixture = extractScriptReferences(
                `import { spawnSync } from "node:child_process"; spawnSync("./tool", ["./arg"]${options ? `, ${options}` : ""});`,
            );
            const [invocation] = extractProcessInvocations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                {},
                new Map(),
                fixture.bindingResolver,
            );
            expect(
                [invocation.command?.target, invocation.argv[0]?.target],
                label,
            ).toEqual(targets);
            expect(invocation.dynamicArguments, label).toBe(dynamicArguments);
        }

        for (const [label, barrier] of [
            ["global chdir", `process.chdir("sub")`],
            ["imported chdir", `import { chdir as cd } from "node:process"; cd("sub")`],
            ["aliased chdir", `const p = process; p.chdir("sub")`],
        ] as const) {
            const fixture = extractScriptReferences(
                `import { spawnSync } from "node:child_process"; ${barrier}; spawnSync("./tool", ["./arg"]);`,
            );
            expect(
                extractProcessInvocations(
                    fixture.sourceFile,
                    "fixture.ts",
                    root,
                    null,
                    {},
                    new Map(),
                    fixture.bindingResolver,
                )[0],
                label,
            ).toMatchObject({
                command: { target: "sub/tool", dynamic: false },
                argv: [{ target: "sub/arg", dynamic: false }],
                dynamicArguments: 0,
            });
        }

        for (const [label, source, expected] of [
            [
                "undefined argv and cwd inherit",
                `process.chdir("sub"); spawnSync("./tool", undefined, { cwd: undefined });`,
                { api: "spawnSync", target: "sub/tool", argv: [], dynamicArguments: 0 },
            ],
            [
                "execFile options overload",
                `execFileSync("./tool", { cwd: "scripts" });`,
                { api: "execFileSync", target: "scripts/tool", argv: [], dynamicArguments: 0 },
            ],
            [
                "later option write recovers",
                `const options = { cwd: unknown }; options.cwd = "scripts"; spawnSync("./tool", [], options);`,
                { api: "spawnSync", target: "scripts/tool", argv: [], dynamicArguments: 0 },
            ],
            [
                "unknown spread before exact cwd recovers",
                `spawnSync("./tool", [], { ...unknown, cwd: "scripts" });`,
                { api: "spawnSync", target: "scripts/tool", argv: [], dynamicArguments: 0 },
            ],
            [
                "primitive and constant computed keys stay exact",
                `const key = "cwd"; spawnSync("./tool", [], { [null]: 0, [undefined]: 0, [true]: 0, [1]: 0, [1n]: 0, [key]: "scripts" });`,
                { api: "spawnSync", target: "scripts/tool", argv: [], dynamicArguments: 0 },
            ],
            [
                "relative cwd cannot recover unknown inheritance",
                `process.chdir(unknown); spawnSync("./tool", [], { cwd: "scripts" });`,
                { api: "spawnSync", target: null, argv: [], dynamicArguments: 1 },
            ],
            [
                "ambiguous argv overload fails closed",
                `spawnSync("./tool", unknown, { cwd: "scripts" });`,
                { api: "spawnSync", target: null, argv: [], dynamicArguments: 2 },
            ],
        ] as const) {
            const fixture = extractScriptReferences(
                `import { execFileSync, spawnSync } from "node:child_process"; ${source}`,
            );
            const [invocation] = extractProcessInvocations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                {},
                new Map(),
                fixture.bindingResolver,
            );
            expect(
                {
                    api: invocation.api,
                    target: invocation.command?.target ?? null,
                    argv: invocation.argv.map(({ target }) => target),
                    dynamicArguments: invocation.dynamicArguments,
                },
                label,
            ).toEqual(expected);
        }

        for (const [label, source, expected] of [
            [
                "named fork array overload",
                `import { fork } from "node:child_process"; fork("./worker.mjs", ["./arg"], { cwd: "scripts" });`,
                { target: "scripts/worker.mjs", argv: ["scripts/arg"], dynamicArguments: 0 },
            ],
            [
                "CJS fork options overload",
                `const child = require("node:child_process"); child.fork("./other.mjs", { cwd: "scripts" });`,
                { target: "scripts/other.mjs", argv: [], dynamicArguments: 0 },
            ],
            [
                "fork unknown cwd",
                `import { fork } from "node:child_process"; fork("./worker.mjs", ["./arg"], { cwd: unknown });`,
                { target: null, argv: [null], dynamicArguments: 2 },
            ],
        ] as const) {
            const fixture = extractScriptReferences(source);
            const [invocation] = extractProcessInvocations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                {},
                new Map(),
                fixture.bindingResolver,
            );
            expect(
                {
                    api: invocation.api,
                    target: invocation.command?.target ?? null,
                    argv: invocation.argv.map(({ target }) => target),
                    dynamicArguments: invocation.dynamicArguments,
                },
                label,
            ).toEqual({ api: "fork", ...expected });
        }

        for (const [label, setup, target, dynamicArguments] of [
            ["overwritten local chdir", `let cd = process.chdir; cd = local; cd("sub");`, "tool", 0],
            ["captured original chdir", `const cd = process.chdir; process.chdir = local; cd("sub");`, "sub/tool", 0],
            ["ambiguous chdir", `const cd = flag ? process.chdir : local; cd("sub");`, null, 1],
        ] as const) {
            const fixture = extractScriptReferences(
                `import { spawnSync } from "node:child_process"; ${setup} spawnSync("./tool", []);`,
            );
            const [invocation] = extractProcessInvocations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                {},
                new Map(),
                fixture.bindingResolver,
            );
            expect(
                [invocation.command?.target ?? null, invocation.dynamicArguments],
                label,
            ).toEqual([target, dynamicArguments]);
        }

        const syncedChild = extractScriptReferences(
            `import { spawnSync } from "node:child_process"; import * as esmChild from "node:child_process"; import { syncBuiltinESMExports } from "node:module"; const child = require("node:child_process"); spawnSync("./pre", []); child.spawnSync = local; syncBuiltinESMExports(); spawnSync("./named-post", []); esmChild.spawnSync("./namespace-post", []);`,
        );
        expect(
            extractProcessInvocations(
                syncedChild.sourceFile,
                "fixture.ts",
                root,
                null,
                {},
                new Map(),
                syncedChild.bindingResolver,
            ),
        ).toEqual([
            expect.objectContaining({
                api: "spawnSync",
                dynamicArguments: 0,
            }),
            expect.objectContaining({
                api: "spawnSync",
                dynamicArguments: 1,
            }),
            expect.objectContaining({
                api: "spawnSync",
                dynamicArguments: 1,
            }),
        ]);

        const capturedSyncedChild = extractScriptReferences(`
            import * as esmChild from "node:child_process";
            import { syncBuiltinESMExports as sync } from "node:module";
            const child = require("node:child_process");
            const spawn0 = child.spawnSync, fork0 = child.fork;
            let assignedSpawn;
            assignedSpawn = esmChild.spawnSync;
            const beforeSpawn = esmChild.spawnSync, beforeFork = esmChild.fork;
            child.spawnSync = local; child.fork = local; sync();
            const afterSpawn = esmChild.spawnSync, afterFork = esmChild.fork;
            child.spawnSync = spawn0; child.fork = fork0; sync();
            beforeSpawn("./before-spawn", []);
            afterSpawn("./after-spawn", []);
            assignedSpawn("./assigned-spawn", []);
            esmChild.spawnSync("./namespace-spawn", []);
            beforeFork("./before-fork", []);
            afterFork("./after-fork", []);
            esmChild.fork("./namespace-fork", []);
        `);
        expect(
            extractProcessInvocations(
                capturedSyncedChild.sourceFile,
                "fixture.ts",
                root,
                null,
                {},
                new Map(),
                capturedSyncedChild.bindingResolver,
            ).map(({ api, binding, dynamicArguments }) => ({
                api,
                binding,
                dynamicArguments,
            })),
        ).toEqual([
            { api: "spawnSync", binding: "beforeSpawn", dynamicArguments: 0 },
            { api: "spawnSync", binding: "afterSpawn", dynamicArguments: 1 },
            { api: "spawnSync", binding: "assignedSpawn", dynamicArguments: 0 },
            { api: "spawnSync", binding: "esmChild.spawnSync", dynamicArguments: 0 },
            { api: "fork", binding: "beforeFork", dynamicArguments: 0 },
            { api: "fork", binding: "afterFork", dynamicArguments: 1 },
            { api: "fork", binding: "esmChild.fork", dynamicArguments: 0 },
        ]);

        const literalSyncedChild = extractScriptReferences(`
            import * as esmChild from "node:child_process";
            import { syncBuiltinESMExports as sync } from "node:module";
            const child = require("node:child_process");
            const original = child.fork;
            const beforeObject = { nested: { run: esmChild.fork } };
            const beforeArray = [[esmChild.fork]];
            const namespaceObject = { nested: { value: esmChild } };
            const namespaceArray = [[esmChild]];
            const cjsObject = { nested: { run: child.fork } };
            const cjsArray = [[child.fork]];
            child.fork = local; sync();
            const afterObject = { nested: { run: esmChild.fork } };
            const afterArray = [[esmChild.fork]];
            namespaceObject.nested.value.fork("./namespace-object-tainted", []);
            namespaceArray[0][0].fork("./namespace-array-tainted", []);
            cjsObject.nested.run("./cjs-object-tainted", []);
            cjsArray[0][0]("./cjs-array-tainted", []);
            child.fork = original; sync();
            beforeObject.nested.run("./before-object", []);
            beforeArray[0][0]("./before-array", []);
            afterObject.nested.run("./after-object", []);
            afterArray[0][0]("./after-array", []);
            namespaceObject.nested.value.fork("./namespace-object-restored", []);
            namespaceArray[0][0].fork("./namespace-array-restored", []);
        `);
        expect(
            extractProcessInvocations(
                literalSyncedChild.sourceFile,
                "fixture.ts",
                root,
                null,
                {},
                new Map(),
                literalSyncedChild.bindingResolver,
            ).map(({ binding, dynamicArguments }) => ({ binding, dynamicArguments })),
        ).toEqual([
            { binding: "namespaceObject.nested.value.fork", dynamicArguments: 1 },
            { binding: "namespaceArray[0][0].fork", dynamicArguments: 1 },
            { binding: "cjsObject.nested.run", dynamicArguments: 1 },
            { binding: "cjsArray[0][0]", dynamicArguments: 1 },
            { binding: "beforeObject.nested.run", dynamicArguments: 0 },
            { binding: "beforeArray[0][0]", dynamicArguments: 0 },
            { binding: "afterObject.nested.run", dynamicArguments: 1 },
            { binding: "afterArray[0][0]", dynamicArguments: 1 },
            { binding: "namespaceObject.nested.value.fork", dynamicArguments: 0 },
            { binding: "namespaceArray[0][0].fork", dynamicArguments: 0 },
        ]);

        const laterSlotSyncedChild = extractScriptReferences(`
            import * as esmChild from "node:child_process";
            import { syncBuiltinESMExports as sync } from "node:module";
            const child = require("node:child_process"), original = child.fork;
            const beforeObject = {}, beforeArray = [];
            const namespaceObject = {}, namespaceArray = [];
            const cjsObject = {}, cjsArray = [];
            beforeObject.run = esmChild.fork; beforeArray[0] = esmChild.fork;
            namespaceObject.value = esmChild; namespaceArray[0] = esmChild;
            cjsObject.run = child.fork; cjsArray[0] = child.fork;
            child.fork = child.spawnSync; sync();
            const afterObject = {}, afterArray = [];
            afterObject.run = esmChild.fork; afterArray[0] = esmChild.fork;
            namespaceObject.value.fork("./namespace-object-during", []);
            namespaceArray[0].fork("./namespace-array-during", []);
            cjsObject.run("./cjs-object-during", []);
            cjsArray[0]("./cjs-array-during", []);
            child.fork = original; sync();
            beforeObject.run("./before-object-restored", []);
            beforeArray[0]("./before-array-restored", []);
            afterObject.run("./after-object-restored", []);
            afterArray[0]("./after-array-restored", []);
            namespaceObject.value.fork("./namespace-object-restored", []);
            namespaceArray[0].fork("./namespace-array-restored", []);
            cjsObject.run("./cjs-object-restored", []);
            cjsArray[0]("./cjs-array-restored", []);
        `);
        expect(
            extractProcessInvocations(
                laterSlotSyncedChild.sourceFile,
                "fixture.ts",
                root,
                null,
                {},
                new Map(),
                laterSlotSyncedChild.bindingResolver,
            ).map(({ api, binding }) => ({ api, binding })),
        ).toEqual([
            { api: "spawnSync", binding: "namespaceObject.value.fork" },
            { api: "spawnSync", binding: "namespaceArray[0].fork" },
            { api: "fork", binding: "cjsObject.run" },
            { api: "fork", binding: "cjsArray[0]" },
            { api: "fork", binding: "beforeObject.run" },
            { api: "fork", binding: "beforeArray[0]" },
            { api: "spawnSync", binding: "afterObject.run" },
            { api: "spawnSync", binding: "afterArray[0]" },
            { api: "fork", binding: "namespaceObject.value.fork" },
            { api: "fork", binding: "namespaceArray[0].fork" },
            { api: "fork", binding: "cjsObject.run" },
            { api: "fork", binding: "cjsArray[0]" },
        ]);

        for (const [label, body, expected] of [
            [
                "definite later sync restores",
                `child.spawnSync = local; sync(); child.spawnSync = original; sync();`,
                { api: "spawnSync", dynamicArguments: 0 },
            ],
            [
                "wrong-member sync is exact",
                `child.spawnSync = child.execFileSync; sync();`,
                { api: "execFileSync", dynamicArguments: 0 },
            ],
            [
                "overwritten sync alias is inert",
                `let copy = sync; copy = local; child.spawnSync = local; copy();`,
                { api: "spawnSync", dynamicArguments: 0 },
            ],
            [
                "captured sync alias remains live",
                `const copy = sync; sync = local; child.spawnSync = local; copy();`,
                { api: "spawnSync", dynamicArguments: 1 },
            ],
            [
                "ambiguous sync alias is possible",
                `const copy = flag ? sync : local; child.spawnSync = local; copy();`,
                { api: "spawnSync", dynamicArguments: 1 },
            ],
            [
                "cross-function sync is sticky",
                `child.spawnSync = local; function copy() { sync(); } copy(); child.spawnSync = original; sync();`,
                { api: "spawnSync", dynamicArguments: 1 },
            ],
        ] as const) {
            const fixture = extractScriptReferences(`
                import { spawnSync } from "node:child_process";
                import { syncBuiltinESMExports as sync } from "node:module";
                const child = require("node:child_process");
                const original = child.spawnSync;
                ${body}
                spawnSync("./after-sync", []);
            `);
            const [invocation] = extractProcessInvocations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                {},
                new Map(),
                fixture.bindingResolver,
            );
            expect(
                { api: invocation.api, dynamicArguments: invocation.dynamicArguments },
                label,
            ).toEqual(expected);
        }

        const longAliasSource = [
            `import { spawnSync } from "node:child_process"; const alias0 = spawnSync;`,
            ...Array.from(
                { length: 768 },
                (_, index) => `const alias${index + 1} = alias${index};`,
            ),
            `alias768("node", ["./long-alias.mjs"]);`,
        ].join("");
        const longAlias = extractScriptReferences(longAliasSource);
        expect(
            extractProcessInvocations(
                longAlias.sourceFile,
                "fixture.ts",
                root,
                null,
                {},
                new Map(),
                longAlias.bindingResolver,
            ).map(({ api }) => api),
        ).toEqual(["spawnSync"]);

        for (const [label, source, expectedApis = ["spawnSync"]] of [
            ["assignment spawn carrier", `import { spawnSync } from "node:child_process"; let run; run = spawnSync; run("node", ["assignment.mjs"]);`],
            ["parameter spawn carrier", `import { spawnSync } from "node:child_process"; function f(run = spawnSync) { run("node", ["parameter.mjs"]); } f();`],
            ["object spawn carrier", `import { spawnSync } from "node:child_process"; const holder = { spawnSync }; const { spawnSync: run } = holder; run("node", ["object.mjs"]);`],
            ["array spawn carrier", `import { spawnSync } from "node:child_process"; const holder = [spawnSync]; const [run] = holder; run("node", ["array.mjs"]);`],
            ["for-of spawn carrier", `import { spawnSync } from "node:child_process"; let run; for (run of [spawnSync]) {} run("node", ["for-of.mjs"]);`, []],
            ["declaration for-of spawn carrier", `import { spawnSync } from "node:child_process"; for (const run of [spawnSync]) run("node", ["declaration-for-of.mjs"]);`],
            ["empty array default spawn carrier", `import { spawnSync } from "node:child_process"; const [run = spawnSync] = []; run("node", ["empty-default.mjs"]);`],
            ["omitted array default spawn carrier", `import { spawnSync } from "node:child_process"; const [run = spawnSync] = [,]; run("node", ["omitted-default.mjs"]);`],
            ["undefined array default spawn carrier", `import { spawnSync } from "node:child_process"; const [run = spawnSync] = [undefined]; run("node", ["undefined-default.mjs"]);`],
            ["nested array default spawn carrier", `import { spawnSync } from "node:child_process"; const [[run = spawnSync] = []] = []; run("node", ["nested-default.mjs"]);`],
            ["absent assignment default spawn carrier", `import { spawnSync } from "node:child_process"; let run; ({ run = spawnSync } = {}); run("node", ["assignment-default.mjs"]);`],
            ["present assignment default spawn carrier", `import { spawnSync } from "node:child_process"; let run; ({ run = spawnSync } = { run: local }); run("node", ["assignment-present.mjs"]);`, []],
            ["logical spawn carrier", `import { spawnSync } from "node:child_process"; let run = spawnSync; run ||= spawnSync; run("node", ["logical.mjs"]);`],
            ["falsy logical spawn carrier", `import { spawnSync } from "node:child_process"; let run = false; run ||= spawnSync; run("node", ["falsy-logical.mjs"]);`],
            ["zero logical spawn carrier", `import { spawnSync } from "node:child_process"; let run = 0; run ||= spawnSync; run("node", ["zero-logical.mjs"]);`],
            ["empty logical spawn carrier", `import { spawnSync } from "node:child_process"; let run = ""; run ||= spawnSync; run("node", ["empty-logical.mjs"]);`],
            ["nullish logical spawn carrier", `import { spawnSync } from "node:child_process"; let run = null; run ??= spawnSync; run("node", ["nullish-logical.mjs"]);`],
            ["conditional spawn carrier", `import { spawnSync } from "node:child_process"; const run = flag ? spawnSync : spawnSync; run("node", ["conditional.mjs"]);`],
            ["heterogeneous conditional spawn carrier", `import { spawnSync, execFileSync } from "node:child_process"; const run = flag ? spawnSync : execFileSync; run("node", ["heterogeneous-conditional.mjs"]);`, ["execFileSync", "spawnSync"]],
            ["heterogeneous sequential spawn carrier", `import { spawnSync, execFileSync } from "node:child_process"; let run; run = spawnSync; run = execFileSync; run("node", ["heterogeneous-sequential.mjs"]);`, ["execFileSync"]],
            ["two reaching child producers", `import { spawnSync, execFileSync } from "node:child_process"; let run; run = spawnSync; run("node", []); run = execFileSync; run("node", []);`, ["spawnSync", "execFileSync"]],
            ["conditional local write spawn carrier", `import { spawnSync } from "node:child_process"; let run = spawnSync; if (flag) run = local; run("node", ["conditional-local.mjs"]);`, []],
            ["mixed local conditional spawn carrier", `import { spawnSync } from "node:child_process"; const run = flag ? spawnSync : local; run("node", ["mixed-local-conditional.mjs"]);`, ["spawnSync"]],
            ["mixed local declaration loop carrier", `import { spawnSync } from "node:child_process"; for (const run of [spawnSync, local]) run("node", ["mixed-local-loop.mjs"]);`, ["spawnSync"]],
            ["two-hop spawn carrier", `import { spawnSync } from "node:child_process"; const first = spawnSync; const second = first; second("node", ["two-hop.mjs"]);`],
        ] as const) {
            const carrier = extractScriptReferences(source);
            expect(
                extractProcessInvocations(
                    carrier.sourceFile,
                    "fixture.ts",
                    root,
                    null,
                    {},
                    new Map(),
                    carrier.bindingResolver,
            ).map(({ api }) => api),
                label,
            ).toEqual(expectedApis);
        }
        const finiteProcessArgs = extractScriptReferences(
            `import { spawnSync } from "node:child_process"; const command = false || "node"; const argv = ["./finite.mjs", "--x"]; spawnSync(command, argv);`,
        );
        expect(
            extractProcessInvocations(
                finiteProcessArgs.sourceFile,
                "fixture.ts",
                root,
                null,
                {},
                new Map(),
                finiteProcessArgs.bindingResolver,
            ),
        ).toEqual([
            expect.objectContaining({
                api: "spawnSync",
                command: expect.objectContaining({ value: "node", dynamic: false }),
                argv: [
                    expect.objectContaining({ value: "./finite.mjs", dynamic: false }),
                    expect.objectContaining({ value: "--x", dynamic: false }),
                ],
                dynamicArguments: 0,
            }),
        ]);
        const conditionalProcessArgs = extractScriptReferences(
            `import { spawnSync } from "node:child_process"; const argv = flag ? ["a"] : ["b"]; spawnSync("node", argv);`,
        );
        expect(
            extractProcessInvocations(
                conditionalProcessArgs.sourceFile,
                "fixture.ts",
                root,
                null,
                {},
                new Map(),
                conditionalProcessArgs.bindingResolver,
            ).map(({ api, line, argv, dynamicArguments }) => ({
                api,
                line,
                value: argv[0]?.value,
                dynamicArguments,
            })),
        ).toEqual([
            { api: "spawnSync", line: 1, value: "a", dynamicArguments: 0 },
            { api: "spawnSync", line: 1, value: "b", dynamicArguments: 0 },
        ]);
        const correlatedProcess = extractScriptReferences(
            `import { spawnSync, execFileSync } from "node:child_process";
             const pair = flag ? ["node", "-x.js"] : ["deno", "-y.js"];
             spawnSync(pair[0], pair.slice(1));
             const command = flag ? "node" : "deno";
             const argv = flag ? ["-x.js"] : ["-y.js"];
             spawnSync(command, argv);`,
        );
        const correlatedInvocations = extractProcessInvocations(
            correlatedProcess.sourceFile,
            "fixture.ts",
            root,
            null,
            {},
            new Map(),
            correlatedProcess.bindingResolver,
        );
        expect(correlatedInvocations).toEqual([
            expect.objectContaining({
                api: "spawnSync",
                dynamicArguments: expect.any(Number),
            }),
            expect.objectContaining({
                api: "spawnSync",
                dynamicArguments: expect.any(Number),
            }),
        ]);
        expect(correlatedInvocations.map(({ argv }) => argv[0]?.value)).not.toEqual(
            expect.arrayContaining(["-x.js", "-y.js"]),
        );
        for (const source of [
            `import { spawnSync } from "node:child_process"; const command = flag ? "node" : "deno"; const argv = flag ? ["-x.js", "--a"] : ["-y.js", "--b"]; spawnSync(command, argv);`,
            `import { spawnSync, execFileSync } from "node:child_process"; const run = flag ? spawnSync : execFileSync; const argv = flag ? ["-x.js"] : ["-y.js"]; run("node", argv);`,
        ]) {
            const composite = extractScriptReferences(source);
            const invocations = extractProcessInvocations(
                composite.sourceFile,
                "fixture.ts",
                root,
                null,
                {},
                new Map(),
                composite.bindingResolver,
            );
            expect(invocations.length).toBeGreaterThan(0);
            expect(invocations.every(({ command, argv }) =>
                command?.dynamic || argv.some(({ dynamic }) => dynamic),
            )).toBe(true);
            expect(invocations).not.toEqual(expect.arrayContaining([
                expect.objectContaining({
                    command: expect.objectContaining({ value: "node", dynamic: false }),
                    argv: expect.arrayContaining([
                        expect.objectContaining({ value: "-y.js", dynamic: false }),
                    ]),
                }),
            ]));
        }
        const carrierAndCommand = extractScriptReferences(
            `import { spawnSync, execFileSync } from "node:child_process"; const run = flag ? spawnSync : execFileSync; const command = flag ? "node" : "deno"; run(command, []);`,
        );
        const carrierAndCommandInvocations = extractProcessInvocations(
            carrierAndCommand.sourceFile,
            "fixture.ts",
            root,
            null,
            {},
            new Map(),
            carrierAndCommand.bindingResolver,
        );
        expect(carrierAndCommandInvocations.map(({ api }) => api)).toEqual([
            "execFileSync",
            "spawnSync",
        ]);
        expect(carrierAndCommandInvocations.every(({ command, dynamicArguments }) =>
            command?.dynamic && dynamicArguments > 0,
        )).toBe(true);
        expect(carrierAndCommandInvocations.map(({ command }) => command?.value)).toEqual([null, null]);
        const commandOnly = extractScriptReferences(
            `import { spawnSync } from "node:child_process"; const command = flag ? "node" : "deno"; spawnSync(command, []);`,
        );
        expect(
            extractProcessInvocations(
                commandOnly.sourceFile,
                "fixture.ts",
                root,
                null,
                {},
                new Map(),
                commandOnly.bindingResolver,
            ).map(({ command }) => command?.value),
        ).toEqual(["deno", "node"]);
        const mixedProcess = extractScriptReferences(
            `import { spawnSync } from "node:child_process"; const run = flag ? spawnSync : local; run("node", []); for (const loopRun of [spawnSync, local]) loopRun("node", []);`,
        );
        expect(
            extractProcessInvocations(
                mixedProcess.sourceFile,
                "fixture.ts",
                root,
                null,
                {},
                new Map(),
                mixedProcess.bindingResolver,
            ).map(({ api }) => api),
        ).toEqual(["spawnSync", "spawnSync"]);
        for (const [label, source, expected] of [
            ["direct ||= process", `import { spawnSync } from "node:child_process"; let run; (run ||= spawnSync)("node", []);`, true],
            ["direct ??= process", `import { spawnSync } from "node:child_process"; let run; (run ??= spawnSync)("node", []);`, true],
            ["direct &&= process", `import { spawnSync } from "node:child_process"; let run; (run &&= spawnSync)("node", []);`, false],
        ] as const) {
            const direct = extractScriptReferences(source);
            const result = extractProcessInvocations(
                direct.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                new Map(),
                direct.bindingResolver,
            );
            expect(result.length > 0, label).toBe(expected);
        }
        const loaderCarrier = extractScriptReferences(
            `import { createRequire } from "node:module"; let factory; factory = createRequire; const local = factory(import.meta.url); local("./carrier.json");`,
        );
        expect(loaderCarrier.references).toEqual([
            expect.objectContaining({ edgeKind: "eager-runtime", specifier: "node:module" }),
            expect.objectContaining({ edgeKind: "literal-require", specifier: "./carrier.json" }),
        ]);
        const declarationLoaderCarrier = extractScriptReferences(
            `import { createRequire } from "node:module"; for (const factory of [createRequire]) { const local = factory(import.meta.url); local("./declaration-loop.json"); }`,
        );
        expect(declarationLoaderCarrier.references).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ edgeKind: "eager-runtime", specifier: "node:module" }),
                expect.objectContaining({ edgeKind: "literal-require", specifier: "./declaration-loop.json" }),
            ]),
        );
        for (const [source, specifier] of [
            [`import { createRequire } from "node:module"; let factory = false; factory ||= createRequire; const local = factory(import.meta.url); local("./falsy-loader.json");`, "./falsy-loader.json"],
            [`import { createRequire } from "node:module"; let factory = 0; factory ||= createRequire; const local = factory(import.meta.url); local("./zero-loader.json");`, "./zero-loader.json"],
            [`import { createRequire } from "node:module"; let factory = ""; factory ||= createRequire; const local = factory(import.meta.url); local("./empty-loader.json");`, "./empty-loader.json"],
            [`import { createRequire } from "node:module"; let factory = null; factory ??= createRequire; const local = factory(import.meta.url); local("./nullish-loader.json");`, "./nullish-loader.json"],
        ] as const) {
            expect(extractScriptReferences(source).references, specifier).toEqual(
                expect.arrayContaining([expect.objectContaining({ edgeKind: "literal-require", specifier })]),
            );
        }
        const reachingLoader = extractScriptReferences(
            `import { createRequire } from "node:module"; let factory = createRequire; const before = factory(import.meta.url); before("./before-loader.json"); factory = replacement; const after = factory(import.meta.url); after("./after-loader.json");`,
        );
        expect(
            reachingLoader.references.filter(({ edgeKind }) => edgeKind === "literal-require").map(({ specifier }) => specifier),
        ).toEqual(["./before-loader.json"]);

        for (const source of [
            `import { spawnSync } from "node:child_process"; spawnSync = replacement; spawnSync("node", []);`,
            `import { spawnSync } from "node:child_process"; ({ spawnSync } = source); spawnSync("node", []);`,
        ]) {
            const written = extractScriptReferences(source);
            expect(
                extractProcessInvocations(
                    written.sourceFile,
                    "fixture.ts",
                    root,
                    null,
                    {},
                    new Map(),
                    written.bindingResolver,
                ),
            ).toEqual([]);
        }

        for (const source of [
            `import { createRequire } from "node:module"; createRequire = replacement; const local = createRequire(import.meta.url); local("./written-loader.json");`,
            `import { createRequire } from "node:module"; ({ createRequire } = source); const local = createRequire(import.meta.url); local("./destructured-loader.json");`,
        ]) {
            expect(extractScriptReferences(source).references).not.toEqual(
                expect.arrayContaining([expect.objectContaining({ edgeKind: "literal-require" })]),
            );
        }

        let setupFailureDirectory: string | null = null;
        await expect(
            withContractFixture(
                baselineStyleAssets,
                async () => undefined,
                (fixture) => {
                    setupFailureDirectory = fixture.temporaryDirectory;
                    throw new Error("fixture setup failure");
                },
            ),
        ).rejects.toThrow("fixture setup failure");
        expect(setupFailureDirectory).not.toBeNull();
        expect(existsSync(setupFailureDirectory!)).toBe(false);

        let successfulDirectory: string | null = null;
        await withContractFixture(baselineStyleAssets, async (fixture) => {
            successfulDirectory = fixture.temporaryDirectory;
            const baselineGraph = await buildGraph({
                repositoryRoot: fixture.temporaryDirectory,
                outputDirectory: fixture.outputDirectory,
            });
            expect(baselineGraph.parseErrors).toEqual([]);
            expect(baselineGraph.summary.unresolvedLocalReferences).toBe(0);
            expect(baselineGraph.summary.nonliteralLocalReferences).toBe(0);
            expect(hasCopyRead(baselineGraph)).toBe(true);
            expect(hasUtilityWrite(baselineGraph)).toBe(true);

            for (const [label, escapedPromise] of negativePromiseRows) {
                writeFileSync(fixture.styleAssetsPath, `${baselineStyleAssets}\n${escapedPromise}\n`);
                const fixtureGraph = await buildGraph({
                    repositoryRoot: fixture.temporaryDirectory,
                    outputDirectory: fixture.outputDirectory,
                });
                expect(fixtureGraph.parseErrors, label).toEqual([]);
                expect(fixtureGraph.summary.unresolvedLocalReferences, label).toBe(0);
                expect(fixtureGraph.summary.nonliteralLocalReferences, label).toBe(0);
                expect(hasCopyRead(fixtureGraph), label).toBe(true);
                expect(hasUtilityWrite(fixtureGraph), label).toBe(false);
            }

            for (const [label, directAwait] of directAwaitPromiseRows) {
                writeFileSync(fixture.styleAssetsPath, `${baselineStyleAssets}\n${directAwait}\n`);
                const fixtureGraph = await buildGraph({
                    repositoryRoot: fixture.temporaryDirectory,
                    outputDirectory: fixture.outputDirectory,
                });
                expect(fixtureGraph.parseErrors, label).toEqual([]);
                expect(fixtureGraph.summary.unresolvedLocalReferences, label).toBe(0);
                expect(fixtureGraph.summary.nonliteralLocalReferences, label).toBe(0);
                expect(hasCopyRead(fixtureGraph), label).toBe(true);
                expect(hasUtilityWrite(fixtureGraph), label).toBe(true);
            }

            const targetCarrierRows = [
                [
                    "awaited namespace consumer before rebind",
                    `const namespace = await import("./vite.utility-emit"); consume(namespace); namespace = replacement;`,
                    false,
                ],
                [
                    "awaited target member escaped",
                    `const namespace = await import("./vite.utility-emit"); const emit = namespace.emitComponentUtilities; consume(emit);`,
                    false,
                ],
                [
                    "awaited target namespace property write",
                    `const namespace = await import("./vite.utility-emit"); namespace.emitComponentUtilities = replacement;`,
                    false,
                ],
                [
                    "stable awaited target carrier call",
                    `const namespace = await import("./vite.utility-emit"); namespace.emitComponentUtilities(root);`,
                    true,
                ],
            ] as const;
            for (const [label, carrierUse, retained] of targetCarrierRows) {
                writeFileSync(fixture.styleAssetsPath, `${baselineStyleAssets}\n${carrierUse}\n`);
                const fixtureGraph = await buildGraph({
                    repositoryRoot: fixture.temporaryDirectory,
                    outputDirectory: fixture.outputDirectory,
                });
                expect(fixtureGraph.parseErrors, label).toEqual([]);
                expect(fixtureGraph.summary.unresolvedLocalReferences, label).toBe(0);
                expect(fixtureGraph.summary.nonliteralLocalReferences, label).toBe(0);
                expect(hasCopyRead(fixtureGraph), label).toBe(true);
                expect(hasUtilityWrite(fixtureGraph), label).toBe(retained);
            }
        });
        expect(successfulDirectory).not.toBeNull();
        expect(existsSync(successfulDirectory!)).toBe(false);
    });

    it("recognizes direct and provenance-derived fs authorities", () => {
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
        const cjsMutator = extractScriptReferences(`
            const fs = require("node:fs");
            Object.defineProperty(fs, "readFileSync", {});
            fs.readFileSync("mutated-by-intrinsic.txt");
            fs.writeFileSync("stable-member.txt", "content");
        `);
        const cjsMutatorOperations = extractFileOperations(
            cjsMutator.sourceFile,
            "fixture.ts",
            root,
            null,
            new Map(),
            cjsMutator.bindingResolver,
        );
        expect(cjsMutatorOperations.operations).toEqual([
            expect.objectContaining({ operation: "writeFileSync", target: "stable-member.txt" }),
        ]);
        expect(cjsMutatorOperations.unmodeled).toEqual([
            expect.objectContaining({
                operation: "readFileSync",
                boundary: "tainted-fs-member",
            }),
        ]);

        for (const [label, descriptor, exact] of [
            ["descriptor duplicate final value", `{ value: replacement, value: fs.readFileSync }`, true],
            ["descriptor known spread before final value", `{ ...{ enumerable: true }, value: fs.readFileSync }`, true],
            ["descriptor unknown spread after value", `{ value: fs.readFileSync, ...unknown }`, false],
        ] as const) {
            const descriptorFixture = extractScriptReferences(
                `const fs = require("node:fs"); Object.defineProperty(fs, "readFileSync", ${descriptor}); fs.readFileSync("descriptor-${label}.txt");`,
            );
            const descriptorOperations = extractFileOperations(
                descriptorFixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                descriptorFixture.bindingResolver,
            );
            expect(descriptorOperations.operations, label).toEqual(
                exact
                    ? [expect.objectContaining({ operation: "readFileSync" })]
                    : [],
            );
            expect(descriptorOperations.unmodeled, label).toHaveLength(exact ? 0 : 1);
        }

        for (const [label, source, exact] of [
            [
                "descriptor const unrelated spread after value",
                `const descriptor = { enumerable: true }; const fs = require("node:fs"); Object.defineProperty(fs, "readFileSync", { value: fs.readFileSync, ...descriptor }); fs.readFileSync("descriptor-known-after.txt");`,
                true,
            ],
            [
                "descriptor known accessor conflict",
                `const descriptor = { get: replacement }; const fs = require("node:fs"); Object.defineProperty(fs, "readFileSync", { ...descriptor, value: fs.readFileSync }); fs.readFileSync("descriptor-known-accessor.txt");`,
                false,
            ],
            [
                "descriptor unknown spread before value",
                `const fs = require("node:fs"); Object.defineProperty(fs, "readFileSync", { ...unknown, value: fs.readFileSync }); fs.readFileSync("descriptor-unknown-before.txt");`,
                false,
            ],
            [
                "descriptor identifier same member",
                `const fs = require("node:fs"); const descriptor = { value: fs.readFileSync }; Object.defineProperty(fs, "readFileSync", descriptor); fs.readFileSync("descriptor-identifier.txt");`,
                true,
            ],
            [
                "reflect descriptor identifier same member",
                `const fs = require("node:fs"); const descriptor = { value: fs.readFileSync }; Reflect.defineProperty(fs, "readFileSync", descriptor); fs.readFileSync("reflect-descriptor-identifier.txt");`,
                true,
            ],
        ] as const) {
            const fixture = extractScriptReferences(source);
            const result = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(result.operations, label).toEqual(
                exact ? [expect.objectContaining({ operation: "readFileSync" })] : [],
            );
            expect(result.unmodeled, label).toHaveLength(exact ? 0 : 1);
        }
        const descriptorSibling = extractScriptReferences(
            `const fs = require("node:fs"); const descriptor = { value: local }; Object.defineProperty(fs, "readFileSync", descriptor); fs.writeFileSync("descriptor-sibling.txt", "content");`,
        );
        expect(
            extractFileOperations(
                descriptorSibling.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                descriptorSibling.bindingResolver,
            ),
        ).toMatchObject({
            operations: [
                expect.objectContaining({
                    operation: "writeFileSync",
                    target: "descriptor-sibling.txt",
                }),
            ],
            unmodeled: [],
        });

        for (const [label, source, operation, target] of [
            ["fs/promises default", `import fs from "node:fs/promises"; fs.readFile("promises-default.txt");`, "readFile", "promises-default.txt"],
            ["node fs/promises namespace", `import * as fs from "node:fs/promises"; fs.readFile("promises-namespace.txt");`, "readFile", "promises-namespace.txt"],
            ["fs/promises named", `import { readFile } from "fs/promises"; readFile("promises-named.txt");`, "readFile", "promises-named.txt"],
            ["fs/promises readdir", `import { readdir } from "fs/promises"; readdir("promises-readdir.txt");`, "readdir", "promises-readdir.txt"],
            ["fs/promises stat", `import { stat } from "fs/promises"; stat("promises-stat.txt");`, "stat", "promises-stat.txt"],
            ["fs/promises appendFile", `import { appendFile } from "fs/promises"; appendFile("promises-append.txt", "x");`, "appendFile", "promises-append.txt"],
            ["fs/promises mkdir", `import { mkdir } from "fs/promises"; mkdir("promises-mkdir.txt");`, "mkdir", "promises-mkdir.txt"],
            ["fs/promises writeFile", `import { writeFile } from "fs/promises"; writeFile("promises-write.txt", "x");`, "writeFile", "promises-write.txt"],
            ["fs/promises copyFile", `import { copyFile } from "fs/promises"; copyFile("promises-source.txt", "promises-copy.txt");`, "copyFile", "promises-copy.txt"],
            ["fs/promises cp", `import { cp } from "fs/promises"; cp("promises-source.txt", "promises-cp.txt");`, "cp", "promises-cp.txt"],
            ["fs/promises rm", `import { rm } from "fs/promises"; rm("promises-rm.txt");`, "rm", "promises-rm.txt"],
            ["fs/promises require", `const fs = require("node:fs/promises"); fs.readFile("promises-require.txt");`, "readFile", "promises-require.txt"],
            ["fs/promises dynamic", `const fs = await import("node:fs/promises"); fs.readFile("promises-dynamic.txt");`, "readFile", "promises-dynamic.txt"],
            ["fs/promises dynamic default", `const fs = (await import("node:fs/promises")).default; fs.readFile("promises-dynamic-default.txt");`, "readFile", "promises-dynamic-default.txt"],
        ] as const) {
            const fixture = extractScriptReferences(source);
            const result = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(result.operations, label).toEqual(
                ["copyFile", "cp"].includes(operation)
                    ? [
                          expect.objectContaining({ operation, target: "promises-source.txt" }),
                          expect.objectContaining({ operation, target }),
                      ]
                    : [expect.objectContaining({ operation, target })],
            );
            expect(result.unmodeled, label).toEqual([]);
        }

        const nestedEsmMutation = extractScriptReferences(
            `import * as fs from "node:fs"; fs.promises.readFile = replacement; fs.promises.readFile("nested-promises.txt");`,
        );
        const nestedEsmOperations = extractFileOperations(
            nestedEsmMutation.sourceFile,
            "fixture.ts",
            root,
            null,
            new Map(),
            nestedEsmMutation.bindingResolver,
        );
        expect(nestedEsmOperations.operations).toEqual([]);
        expect(nestedEsmOperations.unmodeled).toEqual([
            expect.objectContaining({ operation: "readFile", boundary: "tainted-fs-member" }),
        ]);

        for (const [label, source, target, exact] of [
            ["destructured promises before delete", `const fs=require("node:fs"); const { promises: fsp }=fs; delete fs.promises; fsp.readFile("destructured-before-delete.txt");`, "destructured-before-delete.txt", true],
            ["destructured promises after delete", `const fs=require("node:fs"); delete fs.promises; const { promises: fsp }=fs; fsp.readFile("destructured-after-delete.txt");`, "destructured-after-delete.txt", false],
            ["destructured promises before assignment", `const fs=require("node:fs"); const { promises: fsp }=fs; fs.promises=replacement; fsp.readFile("destructured-before-assignment.txt");`, "destructured-before-assignment.txt", true],
            ["destructured promises after assignment", `const fs=require("node:fs"); fs.promises=replacement; const { promises: fsp }=fs; fsp.readFile("destructured-after-assignment.txt");`, "destructured-after-assignment.txt", false],
            ["destructured promises before define", `const fs=require("node:fs"); const { promises: fsp }=fs; Object.defineProperty(fs,"promises",{}); fsp.readFile("destructured-before-define.txt");`, "destructured-before-define.txt", true],
            ["destructured promises after define", `const fs=require("node:fs"); Object.defineProperty(fs,"promises",{}); const { promises: fsp }=fs; fsp.readFile("destructured-after-define.txt");`, "destructured-after-define.txt", false],
            ["destructured promises delete default", `const fs=require("node:fs"); delete fs.promises; const { promises: fsp=require("node:fs/promises") }=fs; fsp.readFile("destructured-delete-default.txt");`, "destructured-delete-default.txt", true],
            ["destructured promises define undefined default", `const fs=require("node:fs"); Object.defineProperty(fs,"promises",{value:undefined}); const { promises: fsp=require("node:fs/promises") }=fs; fsp.readFile("destructured-define-default.txt");`, "destructured-define-default.txt", true],
            ["destructured promises void default", `const fs=require("node:fs"); fs.promises=void 0; const { promises: fsp=require("node:fs/promises") }=fs; fsp.readFile("destructured-void-default.txt");`, "destructured-void-default.txt", true],
            ["destructured promises reflect delete default", `const fs=require("node:fs"); Reflect.deleteProperty(fs,"promises"); const { promises: fsp=require("node:fs/promises") }=fs; fsp.readFile("destructured-reflect-delete.txt");`, "destructured-reflect-delete.txt", true],
            ["destructured promises properties undefined default", `const fs=require("node:fs"); Object.defineProperties(fs,{promises:{value:undefined}}); const { promises: fsp=require("node:fs/promises") }=fs; fsp.readFile("destructured-properties-undefined.txt");`, "destructured-properties-undefined.txt", true],
            ["destructured promises delete then replacement", `const fs=require("node:fs"); delete fs.promises; fs.promises=replacement; const { promises: fsp=require("node:fs/promises") }=fs; fsp.readFile("destructured-delete-replacement.txt");`, "destructured-delete-replacement.txt", false],
            ["destructured promises replacement then delete", `const fs=require("node:fs"); fs.promises=replacement; delete fs.promises; const { promises: fsp=require("node:fs/promises") }=fs; fsp.readFile("destructured-replacement-delete.txt");`, "destructured-replacement-delete.txt", true],
            ["destructured promises duplicate descriptor", `const fs=require("node:fs"); Object.defineProperty(fs,"promises",{value:undefined,value:replacement}); const { promises: fsp=require("node:fs/promises") }=fs; fsp.readFile("destructured-duplicate-descriptor.txt");`, "destructured-duplicate-descriptor.txt", false],
            ["destructured promises spread descriptor", `const fs=require("node:fs"); Object.defineProperty(fs,"promises",{value:undefined,...descriptor}); const { promises: fsp=require("node:fs/promises") }=fs; fsp.readFile("destructured-spread-descriptor.txt");`, "destructured-spread-descriptor.txt", false],
            ["destructured promises local default", `const fs=require("node:fs"); const fallback=local; delete fs.promises; const { promises: fsp=fallback }=fs; fsp.readFile("destructured-local-default.txt");`, "destructured-local-default.txt", false],
            ["destructured promises unknown default", `const fs=require("node:fs"); fs.promises=replacement; const { promises: fsp=require("node:fs/promises") }=fs; fsp.readFile("destructured-unknown-default.txt");`, "destructured-unknown-default.txt", false],
            ["destructured promises default", `const fs=require("node:fs"); const source={}; const { promises: fsp=fs.promises }=source; delete fs.promises; fsp.readFile("destructured-default.txt");`, "destructured-default.txt", true],
            ["destructured promises alias of alias", `const fs=require("node:fs"); const { promises: fsp }=fs; const alias=fsp; delete fs.promises; alias.readFile("destructured-alias.txt");`, "destructured-alias.txt", true],
            ["destructured promises object", `const fs=require("node:fs"); const holder={fsp:fs.promises}; const {fsp}=holder; delete fs.promises; fsp.readFile("destructured-object.txt");`, "destructured-object.txt", true],
            ["destructured promises array", `const fs=require("node:fs"); const holder=[fs.promises]; const [fsp]=holder; delete fs.promises; fsp.readFile("destructured-array.txt");`, "destructured-array.txt", true],
            ["destructured promises assignment", `const fs=require("node:fs"); let fsp; fsp=fs.promises; delete fs.promises; fsp.readFile("destructured-assignment.txt");`, "destructured-assignment.txt", true],
        ] as const) {
            const fixture = extractScriptReferences(source);
            const result = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(result.operations, label).toEqual(
                exact ? [expect.objectContaining({ operation: "readFile", target })] : [],
            );
            expect(result.unmodeled, label).toEqual(
                exact ? [] : [expect.objectContaining({ operation: "readFile", boundary: "tainted-fs-member" })],
            );
        }
        const destructuredPrivateMutation = extractScriptReferences(
            `const fs=require("node:fs"); const { promises: fsp }=fs; fsp.readFile=replacement; fsp.readFile("destructured-private-mutation.txt");`,
        );
        const destructuredPrivateResult = extractFileOperations(
            destructuredPrivateMutation.sourceFile,
            "fixture.ts",
            root,
            null,
            new Map(),
            destructuredPrivateMutation.bindingResolver,
        );
        expect(destructuredPrivateResult.operations).toEqual([]);
        expect(destructuredPrivateResult.unmodeled).toEqual([
            expect.objectContaining({ operation: "readFile", boundary: "tainted-fs-member" }),
        ]);

        for (const [label, source, operation] of [
            [
                "projected fs slot assignment",
                `const fs=require("node:fs"); const holder={read:fs.readFileSync}; holder.read=replacement; holder.read("projected-assignment.txt");`,
                "readFileSync",
            ],
            [
                "projected fs slot delete",
                `const fs=require("node:fs"); const holder={read:fs.readFileSync}; delete holder.read; holder.read("projected-delete.txt");`,
                "readFileSync",
            ],
            [
                "projected fs slot intrinsic",
                `const fs=require("node:fs"); const holder={read:fs.readFileSync}; Object.defineProperty(holder,"read",{}); holder.read("projected-define.txt");`,
                "readFileSync",
            ],
            [
                "projected fs array slot",
                `const fs=require("node:fs"); const holder=[fs.readFileSync]; holder[0]=replacement; holder[0]("projected-array.txt");`,
                "readFileSync",
            ],
            [
                "fs promises named namespace mutation",
                `import { promises as fsp } from "node:fs"; fsp.readFile = replacement; fsp.readFile("named-promises-after.txt");`,
                "readFile",
            ],
            [
                "fs promises cjs namespace mutation",
                `const fs = require("node:fs"); const fsp = fs.promises; fsp.readFile = replacement; fsp.readFile("cjs-promises-after.txt");`,
                "readFile",
            ],
            [
                "fs promises alias of alias mutation",
                `const fsp = require("node:fs/promises"); const alias = fsp; const second = alias; second.readFile = replacement; fsp.readFile("alias-promises-after.txt");`,
                "readFile",
            ],
            [
                "fs promises direct nested mutation",
                `const fs = require("node:fs"); fs.promises.readFile = replacement; fs.promises.readFile("direct-promises-after.txt");`,
                "readFile",
            ],
            [
                "fs promises dynamic default mutation",
                `const fsp = (await import("node:fs/promises")).default; fsp.readFile = replacement; fsp.readFile("dynamic-promises-after.txt");`,
                "readFile",
            ],
        ] as const) {
            const fixture = extractScriptReferences(source);
            const result = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(result.operations, label).toEqual([]);
            expect(result.unmodeled, label).toEqual([
                expect.objectContaining({ operation, boundary: "tainted-fs-member" }),
            ]);
        }

        for (const [label, source, operation] of [
            ["promise sync read", `import { readFileSync } from "node:fs/promises"; readFileSync("promise-sync-read.txt");`, "readFileSync"],
            ["promise sync write", `import { writeFileSync } from "node:fs/promises"; writeFileSync("promise-sync-write.txt", "x");`, "writeFileSync"],
            ["promise stream read", `const fs = require("node:fs/promises"); fs.createReadStream("promise-stream-read.txt");`, "createReadStream"],
            ["promise stream write", `const fs = require("node:fs/promises"); fs.createWriteStream("promise-stream-write.txt");`, "createWriteStream"],
        ] as const) {
            const fixture = extractScriptReferences(source);
            const result = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(result.operations, label).toEqual([]);
            expect(result.unmodeled, label).toEqual([
                expect.objectContaining({ operation, boundary: "unsupported-fs-promises-api" }),
            ]);
        }

        for (const [label, source, operation, before, after] of [
            [
                "CJS direct member mutation is ordered",
                `const fs = require("node:fs"); fs.readFileSync("before-ordered.txt"); fs.readFileSync = replacement; fs.readFileSync("after-ordered.txt");`,
                "readFileSync",
                "before-ordered.txt",
                "after-ordered.txt",
            ],
            [
                "CJS intrinsic member mutation is ordered",
                `const fs = require("node:fs"); fs.readFileSync("before-intrinsic.txt"); Object.defineProperty(fs, "readFileSync", {}); fs.readFileSync("after-intrinsic.txt");`,
                "readFileSync",
                "before-intrinsic.txt",
                "after-intrinsic.txt",
            ],
        ] as const) {
            const ordered = extractScriptReferences(source);
            const result = extractFileOperations(
                ordered.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                ordered.bindingResolver,
            );
            expect(result.operations, label).toEqual([
                expect.objectContaining({ operation, target: before }),
            ]);
            expect(result.unmodeled, label).toEqual([
                expect.objectContaining({ operation, boundary: "tainted-fs-member" }),
            ]);
            expect(result.operations.some(({ target }) => target === after), label).toBe(false);
        }

        for (const [label, context] of [
            ["conditional mutation", "if (flag) fs.readFileSync = replacement;"],
            ["while mutation", "while (flag) fs.readFileSync = replacement;"],
            ["do mutation", "do { fs.readFileSync = replacement; } while (flag);"],
            ["logical RHS mutation", "flag && (fs.readFileSync = replacement);"],
            ["logical OR RHS mutation", "flag || (fs.readFileSync = replacement);"],
            ["for initializer mutation", "for (fs.readFileSync = replacement; false;) {}"],
            ["for increment mutation", "for (let i = 0; i < 1; i++, fs.readFileSync = replacement) {}"],
            ["switch mutation", "switch (flag) { case 1: fs.readFileSync = replacement; }"],
            ["finally mutation", "try {} finally { fs.readFileSync = replacement; }"],
        ] as const) {
            const fixture = extractScriptReferences(
                `const fs = require("node:fs"); fs.readFileSync("before-${label}.txt"); ${context} fs.readFileSync("after-${label}.txt");`,
            );
            const result = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(result.operations, label).toEqual([
                expect.objectContaining({ operation: "readFileSync", target: `before-${label}.txt` }),
            ]);
            expect(result.unmodeled, label).toEqual([
                expect.objectContaining({ operation: "readFileSync", boundary: "tainted-fs-member" }),
            ]);
        }
        const stickyCrossFunction = extractScriptReferences(
            `const fs = require("node:fs"); const original = fs.readFileSync; function mutate() { fs.readFileSync = local; } fs.readFileSync = original; mutate(); fs.readFileSync("cross-function-after-restore.txt");`,
        );
        const stickyCrossFunctionOperations = extractFileOperations(
            stickyCrossFunction.sourceFile,
            "fixture.ts",
            root,
            null,
            new Map(),
            stickyCrossFunction.bindingResolver,
        );
        expect(stickyCrossFunctionOperations.operations).toEqual([]);
        expect(stickyCrossFunctionOperations.unmodeled).toEqual([
            expect.objectContaining({
                operation: "readFileSync",
                boundary: "tainted-fs-member",
            }),
        ]);

        for (const [label, source, expected] of [
            [
                "captured fs member",
                `const fs = require("node:fs"); const read = fs.readFileSync; fs.readFileSync = replacement; read("captured-fs.txt");`,
                { operation: "readFileSync", target: "captured-fs.txt" },
            ],
            [
                "captured process cwd",
                `import { readdirSync } from "node:fs"; const p = process; const cwd = p.cwd; p.cwd = replacement; readdirSync(cwd());`,
                { operation: "readdirSync", target: "." },
            ],
            [
                "captured path member",
                `import { readdirSync } from "node:fs"; const path = require("node:path"); const resolvePath = path.resolve; path.resolve = replacement; readdirSync(resolvePath("captured-path.txt"));`,
                { operation: "readdirSync", target: "captured-path.txt" },
            ],
        ] as const) {
            const fixture = extractScriptReferences(source);
            const result = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(result.operations, label).toEqual([expect.objectContaining(expected)]);
            expect(result.unmodeled, label).toEqual([]);
        }

        for (const [label, source, target, expectedUnmodeled] of [
            [
                "process sibling survives slot replacement",
                `import { readdirSync } from "node:fs"; const holder = { bad: process, good: process }; holder.bad = replacement; readdirSync(holder.good.cwd());`,
                ".",
                0,
            ],
            [
                "process sibling survives slot deletion",
                `import { readdirSync } from "node:fs"; const holder = { bad: process, good: process }; delete holder.bad; readdirSync(holder.good.cwd());`,
                ".",
                0,
            ],
            [
                "CJS sibling survives slot replacement",
                `const holder = { bad: require("node:fs"), good: require("node:fs") }; holder.bad = replacement; holder.good.readFileSync("good-slot.txt");`,
                "good-slot.txt",
                0,
            ],
            [
                "CJS array sibling survives slot replacement",
                `const holder = [require("node:fs"), require("node:fs")]; holder[0] = replacement; holder[1].readFileSync("good-array-slot.txt");`,
                "good-array-slot.txt",
                0,
            ],
            [
                "path sibling survives slot replacement",
                `import path from "node:path"; import { readdirSync } from "node:fs"; const holder = { bad: path, good: path }; holder.bad = replacement; readdirSync(holder.good.resolve("good-path-slot.txt"));`,
                "good-path-slot.txt",
                0,
            ],
            [
                "nested alias member mutation reaches root",
                `const holder = { nested: require("node:fs") }; const alias = holder.nested; alias.readFileSync = replacement; holder.nested.readFileSync("alias-member.txt");`,
                undefined,
                1,
            ],
            [
                "nested alias capture before mutation remains exact",
                `const holder = { nested: require("node:fs") }; const alias = holder.nested; alias.readFileSync("alias-capture.txt"); alias.readFileSync = replacement;`,
                "alias-capture.txt",
                0,
            ],
            [
                "alias rebind before member write is disjoint",
                `const holder = require("node:fs"); let alias = holder; alias = replacement; alias.readFileSync = replacement; holder.readFileSync("alias-rebind.txt");`,
                "alias-rebind.txt",
                0,
            ],
        ] as const) {
            const fixture = extractScriptReferences(source);
            const operations = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(
                operations.operations.map(({ target }) => target),
                label,
            ).toEqual(target === undefined ? [] : [target]);
            expect(operations.unmodeled, label).toHaveLength(expectedUnmodeled);
        }

        for (const [label, source, target, expectedUnmodeled] of [
            [
                "callable replacement recursion",
                `const fs = require("node:fs"); const holder = { a: fs.readFileSync, b: fs.readFileSync }; holder.a = local; holder.b = holder.a; holder.b("recursive-callable.txt");`,
                undefined,
                1,
            ],
            [
                "namespace replacement recursion",
                `const fs = require("node:fs"); const holder = { a: fs, b: fs }; holder.a = local; holder.b = holder.a; holder.b.readFileSync("recursive-namespace.txt");`,
                undefined,
                1,
            ],
            [
                "array replacement recursion",
                `const fs = require("node:fs"); const holder = [fs, fs]; holder[0] = local; holder[1] = holder[0]; holder[1].readFileSync("recursive-array.txt");`,
                undefined,
                1,
            ],
            [
                "object nested alias site",
                `const holder = { nested: require("node:fs") }; const alias = holder.nested; alias.readFileSync = local; holder.nested.readFileSync("nested-alias-site.txt");`,
                undefined,
                1,
            ],
            [
                "array nested alias site",
                `const holder = [require("node:fs")]; const alias = holder[0]; alias.readFileSync = local; holder[0].readFileSync("array-alias-site.txt");`,
                undefined,
                1,
            ],
            [
                "assignment-only alias site",
                `const holder = { bad: require("node:fs") }; let alias; alias = holder; alias.bad.readFileSync = local; holder.bad.readFileSync("assignment-only-alias.txt");`,
                undefined,
                1,
            ],
            [
                "write reaches old root before rebind",
                `const first = require("node:fs"); const second = {}; let alias = first; alias.readFileSync = local; alias = second; first.readFileSync("old-before-rebind.txt");`,
                undefined,
                1,
            ],
            [
                "rebind before write is disjoint",
                `const first = require("node:fs"); const second = {}; let alias = first; alias = second; alias.readFileSync = local; first.readFileSync("rebind-before-write.txt");`,
                "rebind-before-write.txt",
                0,
            ],
            [
                "recursive object carrier reaches original",
                `const fs = require("node:fs"); const holder = { read: fs.readFileSync }; const box = {}; box.a = holder; box.b = box.a; box.b.read = local; holder.read("recursive-carrier.txt");`,
                undefined,
                1,
            ],
            [
                "recursive array carrier reaches original",
                `const fs = require("node:fs"); const holder = { read: fs.readFileSync }; const box = []; box[0] = holder; box[0].read = local; holder.read("array-carrier.txt");`,
                undefined,
                1,
            ],
            [
                "self carrier identity reaches root",
                `const fs = require("node:fs"); const holder = { read: fs.readFileSync }; holder.self = holder; holder.self.read = local; holder.read("self-carrier.txt");`,
                undefined,
                1,
            ],
            [
                "captured member remains snapshot after slot replacement",
                `const fs = require("node:fs"); const old = { read: fs.readFileSync }; const holder = { slot: old }; const captured = holder.slot; holder.slot = { read: fs.readFileSync }; captured.read = local; holder.slot.read("member-snapshot.txt");`,
                "member-snapshot.txt",
                0,
            ],
            [
                "destructured member remains snapshot after slot replacement",
                `const fs = require("node:fs"); const old = { read: fs.readFileSync }; const holder = { slot: old }; const { slot: captured } = holder; holder.slot = { read: fs.readFileSync }; captured.read = local; holder.slot.read("destructured-snapshot.txt");`,
                "destructured-snapshot.txt",
                0,
            ],
        ] as const) {
            const fixture = extractScriptReferences(source);
            const result = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(result.operations.map(({ target }) => target), label).toEqual(
                target ? [target] : [],
            );
            expect(result.unmodeled, label).toHaveLength(expectedUnmodeled);
        }

        for (const size of [1024, 2048, 4096]) {
            for (const terminal of [false, true]) {
                const label = `identity scaling ${size} ${
                    terminal ? "with terminal" : "without terminal"
                }`;
                const aliases = Array.from(
                    { length: size },
                    (_, index) => `const alias${index + 1} = alias${index};`,
                ).join("\n");
                const source = `
                    const fs = require("node:fs");
                    function local() {}
                    const holder = { read: fs.readFileSync };
                    const alias0 = holder;
                    ${aliases}
                    holder.read = local;
                    ${terminal ? `alias${size}.read("scale-${size}.txt");` : ""}
                `;
                const startedAt = performance.now();
                const fixture = extractScriptReferences(source);
                const result = extractFileOperations(
                    fixture.sourceFile,
                    "fixture.ts",
                    root,
                    null,
                    new Map(),
                    fixture.bindingResolver,
                );
                const elapsed = performance.now() - startedAt;

                expect(elapsed, label).toBeLessThan(5_000);
                expect(result.operations, label).toEqual([]);
                expect(result.unmodeled, label).toHaveLength(terminal ? 1 : 0);
            }
        }

        const censusScale = 16_384;
        const censusRows = [
            [
                "direct alias census 16K",
                `const fs=require("node:fs");
                 const alias0=fs.readFileSync;
                 ${Array.from(
                     { length: censusScale },
                     (_, index) => `const alias${index + 1}=alias${index};`,
                 ).join("\n")}
                 alias${censusScale}("direct-alias-16k.txt");`,
                "direct-alias-16k.txt",
            ],
            [
                "unrelated binding census 16K",
                `const fs=require("node:fs");
                 const read=fs.readFileSync;
                 ${Array.from(
                     { length: censusScale },
                     (_, index) => `const unrelated${index}=${index};`,
                 ).join("\n")}
                 read("unrelated-16k.txt");`,
                "unrelated-16k.txt",
            ],
        ] as const;
        for (const [label, source, target] of censusRows) {
            const startedAt = performance.now();
            const censusFixture = extractScriptReferences(source);
            const censusResult = extractFileOperations(
                censusFixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                censusFixture.bindingResolver,
            );
            const elapsed = performance.now() - startedAt;

            expect(elapsed, label).toBeLessThan(5_000);
            expect(censusResult.operations.map(({ target: operationTarget }) => operationTarget), label)
                .toEqual([target]);
            expect(censusResult.unmodeled, label).toEqual([]);
        }

        for (const size of [4096, 8192]) {
            const label = `deep mutable Object.assign receiver ${size}`;
            const aliases = Array.from(
                { length: size },
                (_, index) => `const alias${index + 1} = alias${index};`,
            ).join("\n");
            const startedAt = performance.now();
            const deepReceiver = extractScriptReferences(`
                const fs=require("node:fs");
                const oldRoot={read:fs.readFileSync};
                const newRoot={read:local};
                const alias0=oldRoot;
                ${aliases}
                let receiver=alias${size};
                Object.assign(receiver,{read:local});
                receiver=newRoot;
                Object.assign(receiver,{read:fs.readFileSync});
                oldRoot.read("old-${size}.txt");
                newRoot.read("new-${size}.txt");
            `);
            const deepReceiverResult = extractFileOperations(
                deepReceiver.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                deepReceiver.bindingResolver,
            );
            const elapsed = performance.now() - startedAt;

            expect(elapsed, label).toBeLessThan(5_000);
            expect(
                deepReceiverResult.operations.map(({ target }) => target),
                label,
            ).toEqual([`new-${size}.txt`]);
            expect(deepReceiverResult.unmodeled, label).toHaveLength(1);
        }

        for (const [label, source, target, expectedUnmodeled] of [
            [
                "exact Object.assign property",
                `const fs=require("node:fs"); const holder={read:local}; Object.assign(holder,{read:fs.readFileSync}); holder.read("assign-exact.txt");`,
                "assign-exact.txt",
                0,
            ],
            [
                "later local Object.assign property overrides",
                `const fs=require("node:fs"); const holder={}; Object.assign(holder,{read:fs.readFileSync},{read:local}); holder.read("assign-local.txt");`,
                undefined,
                1,
            ],
            [
                "later shorthand Object.assign property restores exactness",
                `const fs=require("node:fs"); const read=fs.readFileSync; const holder={}; Object.assign(holder,{read:local},{read}); holder.read("assign-reverse.txt");`,
                "assign-reverse.txt",
                0,
            ],
            [
                "opaque then exact Object.assign source",
                `const fs=require("node:fs"); const holder={}; Object.assign(holder,unknown,{read:fs.readFileSync}); holder.read("assign-opaque-exact.txt");`,
                "assign-opaque-exact.txt",
                0,
            ],
            [
                "exact then opaque Object.assign source",
                `const fs=require("node:fs"); const holder={}; Object.assign(holder,{read:fs.readFileSync},unknown); holder.read("assign-exact-opaque.txt");`,
                undefined,
                1,
            ],
            [
                "spread then exact Object.assign source",
                `const fs=require("node:fs"); const holder={}; Object.assign(holder,{...unknown},{read:fs.readFileSync}); holder.read("assign-spread-exact.txt");`,
                "assign-spread-exact.txt",
                0,
            ],
            [
                "exact then spread Object.assign source",
                `const fs=require("node:fs"); const holder={}; Object.assign(holder,{read:fs.readFileSync},{...unknown}); holder.read("assign-exact-spread.txt");`,
                undefined,
                1,
            ],
            [
                "same-source spread then exact Object.assign member",
                `const fs=require("node:fs"); const holder={}; Object.assign(holder,{...unknown,read:fs.readFileSync}); holder.read("assign-member-spread-exact.txt");`,
                "assign-member-spread-exact.txt",
                0,
            ],
            [
                "same-source exact then spread Object.assign member",
                `const fs=require("node:fs"); const holder={}; Object.assign(holder,{read:fs.readFileSync,...unknown}); holder.read("assign-member-exact-spread.txt");`,
                undefined,
                1,
            ],
            [
                "shadowed Object.assign is ignored",
                `const fs=require("node:fs"); const holder={read:fs.readFileSync}; const Object={assign(){}}; Object.assign(holder,{read:local}); holder.read("assign-shadowed.txt");`,
                "assign-shadowed.txt",
                0,
            ],
            [
                "Object.assign ESM producer snapshots",
                `import * as esmFs from "node:fs"; import {syncBuiltinESMExports as sync} from "node:module"; const fs=require("node:fs"), original=fs.readFileSync; const holder={}; Object.assign(holder,{read:esmFs.readFileSync}); fs.readFileSync=local; sync(); holder.read("assign-esm-snapshot.txt"); fs.readFileSync=original; sync();`,
                "assign-esm-snapshot.txt",
                0,
            ],
            [
                "Object.assign rebind remains disjoint",
                `const fs=require("node:fs"); const holder={read:fs.readFileSync}; let alias=holder; alias={}; Object.assign(alias,{read:local}); holder.read("assign-rebind.txt");`,
                "assign-rebind.txt",
                0,
            ],
            [
                "Object.assign stable capture reaches receiver",
                `const fs=require("node:fs"); const holder={read:fs.readFileSync}; const alias=holder; Object.assign(alias,{read:local}); holder.read("assign-capture.txt");`,
                undefined,
                1,
            ],
        ] as const) {
            const fixture = extractScriptReferences(source);
            const result = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(result.operations.map(({ target: operationTarget }) => operationTarget), label)
                .toEqual(target ? [target] : []);
            expect(result.unmodeled, label).toHaveLength(expectedUnmodeled);
        }

        const assignScale = 8192;
        const assignAliases = Array.from(
            { length: assignScale },
            (_, index) => `const alias${index + 1} = alias${index};`,
        ).join("\n");
        const assignScaleStartedAt = performance.now();
        const assignScaleFixture = extractScriptReferences(`
            const fs=require("node:fs");
            const holder={read:fs.readFileSync};
            const alias0=holder;
            ${assignAliases}
            Object.assign(alias${assignScale},{read:local});
            holder.read("assign-scale.txt");
        `);
        const assignScaleResult = extractFileOperations(
            assignScaleFixture.sourceFile,
            "fixture.ts",
            root,
            null,
            new Map(),
            assignScaleFixture.bindingResolver,
        );
        const assignScaleElapsed = performance.now() - assignScaleStartedAt;
        expect(assignScaleElapsed, "Object.assign 8192 receiver").toBeLessThan(5_000);
        expect(assignScaleResult.operations).toEqual([]);
        expect(assignScaleResult.unmodeled).toHaveLength(1);

        for (const [label, source, expectedOperation] of [
            [
                "captured original member restoration",
                `const fs = require("node:fs"); const original = fs.readFileSync; fs.readFileSync = local; fs.readFileSync = original; fs.readFileSync("restored-original.txt");`,
                "readFileSync",
            ],
            [
                "wrong historical member is not read restoration",
                `const fs = require("node:fs"); const member = fs.writeFileSync; fs.readFileSync = local; fs.readFileSync = member; fs.readFileSync("wrong-historical-member.txt");`,
                "writeFileSync",
            ],
            [
                "mutable current member reaches fresh namespace",
                `const fs = require("node:fs"); let member = fs.readFileSync; member = fs.writeFileSync; fs.readFileSync = member; require("node:fs").readFileSync("mutable-current-member.txt", "content");`,
                "writeFileSync",
            ],
        ] as const) {
            const fixture = extractScriptReferences(source);
            const result = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(result.operations.some(({ operation }) => operation === expectedOperation), label).toBe(true);
            expect(result.operations.some(({ operation }) => operation === "readFileSync"), label).toBe(
                label === "captured original member restoration",
            );
        }

        for (const [label, source] of [
            [
                "capture after fs member mutation",
                `const fs = require("node:fs"); fs.readFileSync = replacement; const read = fs.readFileSync; read("capture-after-fs.txt");`,
            ],
            [
                "capture after fs intrinsic mutation",
                `const fs = require("node:fs"); Object.defineProperty(fs, "readFileSync", {}); const read = fs.readFileSync; read("capture-after-intrinsic.txt");`,
            ],
            [
                "capture after fs alias mutation",
                `const fs = require("node:fs"); const alias = fs; fs.readFileSync = replacement; const read = alias.readFileSync; read("capture-after-alias.txt");`,
            ],
            [
                "capture after fs alias-of-alias mutation",
                `const fs = require("node:fs"); const alias = fs; const second = alias; fs.readFileSync = replacement; const read = second.readFileSync; read("capture-after-alias-of-alias.txt");`,
            ],
        ] as const) {
            const fixture = extractScriptReferences(source);
            const result = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(result.operations, label).toEqual([]);
            expect(result.unmodeled, label).toEqual([
                expect.objectContaining({ boundary: "tainted-fs-member" }),
            ]);
        }

        for (const [label, source] of [
            [
                "capture after process member mutation",
                `import { readdirSync } from "node:fs"; const p = process; p.cwd = replacement; const cwd = p.cwd; readdirSync(cwd());`,
            ],
            [
                "capture after process intrinsic mutation",
                `import { readdirSync } from "node:fs"; const p = process; Reflect.set(p, "cwd", replacement); const cwd = p.cwd; readdirSync(cwd());`,
            ],
            [
                "capture after process alias-of-alias mutation",
                `import { readdirSync } from "node:fs"; const p = process; const alias = p; const second = alias; p.cwd = replacement; const cwd = second.cwd; readdirSync(cwd());`,
            ],
            [
                "capture after path member mutation",
                `import { readdirSync } from "node:fs"; const path = require("node:path"); path.resolve = replacement; const resolvePath = path.resolve; readdirSync(resolvePath("capture-after-path.txt"));`,
            ],
            [
                "capture after path intrinsic mutation",
                `import { readdirSync } from "node:fs"; const path = require("node:path"); Object.defineProperty(path, "resolve", {}); const resolvePath = path.resolve; readdirSync(resolvePath("capture-after-path-intrinsic.txt"));`,
            ],
            [
                "capture after path alias-of-alias mutation",
                `import { readdirSync } from "node:fs"; const path = require("node:path"); const alias = path; const second = alias; path.resolve = replacement; const resolvePath = second.resolve; readdirSync(resolvePath("capture-after-path-alias.txt"));`,
            ],
        ] as const) {
            const fixture = extractScriptReferences(source);
            const result = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(result.operations, label).toEqual([]);
            expect(result.unmodeled, label).toEqual([
                expect.objectContaining({ operation: "readdirSync" }),
            ]);
        }

    });

    it("rejects invalidated and hostile fs authorities and accounts for false-positive and unmodeled operations", () => {
        const syncedFs = extractScriptReferences(
            `import { readFileSync as namedRead } from "node:fs"; import * as esmFs from "node:fs"; import { syncBuiltinESMExports } from "node:module"; function local() {} const cjsFs=require("node:fs"); namedRead("sync-fs-pre.txt"); cjsFs.readFileSync=local; esmFs.readFileSync("sync-fs-middle.txt"); syncBuiltinESMExports(); namedRead("sync-fs-named-post.txt"); esmFs.readFileSync("sync-fs-namespace-post.txt");`,
        );
        const syncedFsOperations = extractFileOperations(
            syncedFs.sourceFile,
            "fixture.ts",
            root,
            null,
            new Map(),
            syncedFs.bindingResolver,
        );
        expect(syncedFsOperations.operations.map(({ target }) => target)).toEqual([
            "sync-fs-pre.txt",
            "sync-fs-middle.txt",
        ]);
        expect(syncedFsOperations.unmodeled).toHaveLength(2);

        const restoredFs = extractScriptReferences(`
            import { readFileSync as read } from "node:fs";
            import { syncBuiltinESMExports as sync } from "node:module";
            const cjs = require("node:fs");
            const original = cjs.readFileSync;
            cjs.readFileSync = local;
            sync();
            cjs.readFileSync = original;
            sync();
            read("sync-fs-restored.txt");
        `);
        expect(
            extractFileOperations(
                restoredFs.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                restoredFs.bindingResolver,
            ),
        ).toMatchObject({
            operations: [expect.objectContaining({ target: "sync-fs-restored.txt" })],
            unmodeled: [],
        });

        const syncedUrl = extractScriptReferences(`
            import { readFileSync } from "node:fs";
            import { fileURLToPath } from "node:url";
            import { syncBuiltinESMExports as sync } from "node:module";
            const cjs = require("url");
            const original = cjs.fileURLToPath;
            cjs.fileURLToPath = local;
            sync();
            readFileSync(fileURLToPath(import.meta.url));
            cjs.fileURLToPath = original;
            sync();
            readFileSync(fileURLToPath(import.meta.url));
            Object.assign(cjs, unknown);
            sync();
            readFileSync(fileURLToPath(import.meta.url));
        `);
        expect(
            extractFileOperations(
                syncedUrl.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                syncedUrl.bindingResolver,
            ),
        ).toMatchObject({
            operations: [expect.objectContaining({ target: "fixture.ts" })],
            unmodeled: [{ operation: "readFileSync" }, { operation: "readFileSync" }],
        });

        const syncedModule = extractScriptReferences(`
            import { createRequire } from "node:module";
            import { syncBuiltinESMExports as sync } from "node:module";
            const cjs = require("node:module");
            const original = cjs.createRequire;
            cjs.createRequire = local;
            sync();
            createRequire(import.meta.url)("./tainted.json");
            cjs.createRequire = original;
            sync();
            createRequire(import.meta.url)("./restored.json");
            Object.assign(cjs, unknown);
            sync();
            createRequire(import.meta.url)("./wildcard.json");
        `);
        expect(
            syncedModule.references
                .filter(({ specifier }) => specifier.startsWith("."))
                .map(({ edgeKind, specifier }) => ({ edgeKind, specifier })),
        ).toEqual([
            { edgeKind: "literal-require", specifier: "./restored.json" },
        ]);

        const capturedSyncedBuiltins = extractScriptReferences(
            `
                import * as esmFs from "node:fs";
                import * as esmUrl from "node:url";
                import * as esmModule from "node:module";
                import { syncBuiltinESMExports as sync } from "node:module";
                const fs = require("node:fs"), url = require("node:url"), moduleApi = require("node:module");
                const fs0 = fs.readFileSync, url0 = url.fileURLToPath, module0 = moduleApi.createRequire;
                const beforeFs = esmFs.readFileSync, beforeUrl = esmUrl.fileURLToPath, beforeModule = esmModule.createRequire;
                fs.readFileSync = local; url.fileURLToPath = local; moduleApi.createRequire = local; sync();
                const afterFs = esmFs.readFileSync, afterUrl = esmUrl.fileURLToPath, afterModule = esmModule.createRequire;
                fs.readFileSync = fs0; url.fileURLToPath = url0; moduleApi.createRequire = module0; sync();
                beforeFs("capture-fs-before.txt");
                afterFs("capture-fs-after.txt");
                esmFs.readFileSync("capture-fs-namespace.txt");
                beforeFs(beforeUrl(import.meta.url));
                beforeFs(afterUrl(import.meta.url));
                beforeFs(esmUrl.fileURLToPath(import.meta.url));
                beforeModule(import.meta.url)("./before.json");
                afterModule(import.meta.url)("./after.json");
                esmModule.createRequire(import.meta.url)("./namespace.json");
            `,
            "fixture.mjs",
            null,
            {},
            { repositoryRoot: root },
        );
        const capturedSyncedOperations = extractFileOperations(
            capturedSyncedBuiltins.sourceFile,
            "fixture.mjs",
            root,
            null,
            new Map(),
            capturedSyncedBuiltins.bindingResolver,
        );
        expect(capturedSyncedOperations.operations.map(({ target }) => target)).toEqual([
            "capture-fs-before.txt",
            "capture-fs-namespace.txt",
            "fixture.mjs",
            "fixture.mjs",
        ]);
        expect(capturedSyncedOperations.unmodeled).toHaveLength(2);
        expect(
            capturedSyncedBuiltins.references
                .filter(({ specifier }) => specifier.startsWith("."))
                .map(({ specifier }) => specifier),
        ).toEqual(["./before.json", "./namespace.json"]);

        const literalSyncedBuiltins = extractScriptReferences(
            `
                import * as esmFs from "node:fs";
                import * as esmModule from "node:module";
                import { syncBuiltinESMExports as sync } from "node:module";
                const fs = require("node:fs"), moduleApi = require("node:module");
                const fs0 = fs.readFileSync, module0 = moduleApi.createRequire;
                const beforeFsObject = { nested: { read: esmFs.readFileSync } };
                const beforeFsArray = [[esmFs.readFileSync]];
                const namespaceFsObject = { nested: { value: esmFs } };
                const namespaceFsArray = [[esmFs]];
                const cjsFsObject = { nested: { read: fs.readFileSync } };
                const cjsFsArray = [[fs.readFileSync]];
                const beforeModuleObject = { nested: { make: esmModule.createRequire } };
                const beforeModuleArray = [[esmModule.createRequire]];
                const namespaceModuleObject = { nested: { value: esmModule } };
                const namespaceModuleArray = [[esmModule]];
                const cjsModuleObject = { nested: { make: moduleApi.createRequire } };
                const cjsModuleArray = [[moduleApi.createRequire]];
                fs.readFileSync = local; moduleApi.createRequire = local; sync();
                const afterFsObject = { nested: { read: esmFs.readFileSync } };
                const afterFsArray = [[esmFs.readFileSync]];
                const afterModuleObject = { nested: { make: esmModule.createRequire } };
                const afterModuleArray = [[esmModule.createRequire]];
                namespaceFsObject.nested.value.readFileSync("fs-ns-tainted-obj.txt");
                namespaceFsArray[0][0].readFileSync("fs-ns-tainted-arr.txt");
                cjsFsObject.nested.read("fs-cjs-tainted-obj.txt");
                cjsFsArray[0][0]("fs-cjs-tainted-arr.txt");
                namespaceModuleObject.nested.value.createRequire(import.meta.url)("./module-ns-tainted-object.json");
                namespaceModuleArray[0][0].createRequire(import.meta.url)("./module-ns-tainted-array.json");
                cjsModuleObject.nested.make(import.meta.url)("./module-cjs-tainted-object.json");
                cjsModuleArray[0][0](import.meta.url)("./module-cjs-tainted-array.json");
                fs.readFileSync = fs0; moduleApi.createRequire = module0; sync();
                beforeFsObject.nested.read("fs-before-object.txt");
                beforeFsArray[0][0]("fs-before-array.txt");
                afterFsObject.nested.read("fs-after-object.txt");
                afterFsArray[0][0]("fs-after-array.txt");
                namespaceFsObject.nested.value.readFileSync("fs-ns-restored-obj.txt");
                namespaceFsArray[0][0].readFileSync("fs-ns-restored-arr.txt");
                beforeModuleObject.nested.make(import.meta.url)("./module-before-object.json");
                beforeModuleArray[0][0](import.meta.url)("./module-before-array.json");
                afterModuleObject.nested.make(import.meta.url)("./module-after-object.json");
                afterModuleArray[0][0](import.meta.url)("./module-after-array.json");
                namespaceModuleObject.nested.value.createRequire(import.meta.url)("./module-ns-restored-obj.json");
                namespaceModuleArray[0][0].createRequire(import.meta.url)("./module-ns-restored-arr.json");
            `,
            "fixture.mjs",
            null,
            {},
            { repositoryRoot: root },
        );
        const literalSyncedOperations = extractFileOperations(
            literalSyncedBuiltins.sourceFile,
            "fixture.mjs",
            root,
            null,
            new Map(),
            literalSyncedBuiltins.bindingResolver,
        );
        expect(literalSyncedOperations.operations.map(({ target }) => target)).toEqual([
            "fs-before-object.txt",
            "fs-before-array.txt",
            "fs-ns-restored-obj.txt",
            "fs-ns-restored-arr.txt",
        ]);
        expect(literalSyncedOperations.unmodeled).toHaveLength(6);
        expect(
            literalSyncedBuiltins.references
                .filter(({ specifier }) => specifier.startsWith("."))
                .map(({ specifier }) => specifier),
        ).toEqual([
            "./module-before-object.json",
            "./module-before-array.json",
            "./module-ns-restored-obj.json",
            "./module-ns-restored-arr.json",
        ]);

        const laterSlotSyncedBuiltins = extractScriptReferences(
            `
                import * as esmFs from "node:fs";
                import * as esmModule from "node:module";
                import { syncBuiltinESMExports as sync } from "node:module";
                const fs = require("node:fs"), moduleApi = require("node:module");
                const fs0 = fs.readFileSync, module0 = moduleApi.createRequire;
                const beforeFsObject = {}, beforeFsArray = [];
                const namespaceFsObject = {}, namespaceFsArray = [];
                const cjsFsObject = {}, cjsFsArray = [];
                const beforeModuleObject = {}, beforeModuleArray = [];
                const namespaceModuleObject = {}, namespaceModuleArray = [];
                const cjsModuleObject = {}, cjsModuleArray = [];
                beforeFsObject.read = esmFs.readFileSync; beforeFsArray[0] = esmFs.readFileSync;
                namespaceFsObject.value = esmFs; namespaceFsArray[0] = esmFs;
                cjsFsObject.read = fs.readFileSync; cjsFsArray[0] = fs.readFileSync;
                beforeModuleObject.make = esmModule.createRequire;
                beforeModuleArray[0] = esmModule.createRequire;
                namespaceModuleObject.value = esmModule; namespaceModuleArray[0] = esmModule;
                cjsModuleObject.make = moduleApi.createRequire;
                cjsModuleArray[0] = moduleApi.createRequire;
                fs.readFileSync = local; moduleApi.createRequire = local; sync();
                const afterFsObject = {}, afterFsArray = [];
                const afterModuleObject = {}, afterModuleArray = [];
                afterFsObject.read = esmFs.readFileSync; afterFsArray[0] = esmFs.readFileSync;
                afterModuleObject.make = esmModule.createRequire;
                afterModuleArray[0] = esmModule.createRequire;
                namespaceFsObject.value.readFileSync("fs-namespace-object-during.txt");
                namespaceFsArray[0].readFileSync("fs-namespace-array-during.txt");
                cjsFsObject.read("fs-cjs-object-during.txt");
                cjsFsArray[0]("fs-cjs-array-during.txt");
                namespaceModuleObject.value.createRequire(import.meta.url)("./module-namespace-object-during.json");
                namespaceModuleArray[0].createRequire(import.meta.url)("./module-namespace-array-during.json");
                cjsModuleObject.make(import.meta.url)("./module-cjs-object-during.json");
                cjsModuleArray[0](import.meta.url)("./module-cjs-array-during.json");
                fs.readFileSync = fs0; moduleApi.createRequire = module0; sync();
                beforeFsObject.read("fs-before-object-restored.txt");
                beforeFsArray[0]("fs-before-array-restored.txt");
                afterFsObject.read("fs-after-object-restored.txt");
                afterFsArray[0]("fs-after-array-restored.txt");
                namespaceFsObject.value.readFileSync("fs-namespace-object-restored.txt");
                namespaceFsArray[0].readFileSync("fs-namespace-array-restored.txt");
                cjsFsObject.read("fs-cjs-object-restored.txt");
                cjsFsArray[0]("fs-cjs-array-restored.txt");
                beforeModuleObject.make(import.meta.url)("./module-before-object-restored.json");
                beforeModuleArray[0](import.meta.url)("./module-before-array-restored.json");
                afterModuleObject.make(import.meta.url)("./module-after-object-restored.json");
                afterModuleArray[0](import.meta.url)("./module-after-array-restored.json");
                namespaceModuleObject.value.createRequire(import.meta.url)("./module-namespace-object-restored.json");
                namespaceModuleArray[0].createRequire(import.meta.url)("./module-namespace-array-restored.json");
                cjsModuleObject.make(import.meta.url)("./module-cjs-object-restored.json");
                cjsModuleArray[0](import.meta.url)("./module-cjs-array-restored.json");
            `,
            "fixture.mjs",
            null,
            {},
            { repositoryRoot: root },
        );
        const laterSlotSyncedOperations = extractFileOperations(
            laterSlotSyncedBuiltins.sourceFile,
            "fixture.mjs",
            root,
            null,
            new Map(),
            laterSlotSyncedBuiltins.bindingResolver,
        );
        expect(laterSlotSyncedOperations.operations.map(({ target }) => target)).toEqual([
            "fs-cjs-object-during.txt",
            "fs-cjs-array-during.txt",
            "fs-before-object-restored.txt",
            "fs-before-array-restored.txt",
            "fs-namespace-object-restored.txt",
            "fs-namespace-array-restored.txt",
            "fs-cjs-object-restored.txt",
            "fs-cjs-array-restored.txt",
        ]);
        expect(laterSlotSyncedOperations.unmodeled).toHaveLength(4);
        expect(
            laterSlotSyncedBuiltins.references
                .filter(({ specifier }) => specifier.startsWith("."))
                .map(({ specifier }) => specifier),
        ).toEqual([
            "./module-before-object-restored.json",
            "./module-before-array-restored.json",
            "./module-namespace-object-restored.json",
            "./module-namespace-array-restored.json",
            "./module-cjs-object-restored.json",
            "./module-cjs-array-restored.json",
        ]);

        const syncedPath = extractScriptReferences(
            `import * as esmPath from "node:path"; import { readFileSync } from "node:fs"; import { syncBuiltinESMExports } from "node:module"; const cjsPath=require("node:path"); readFileSync(esmPath.join(".","sync-path-pre.txt")); cjsPath.join=local; readFileSync(esmPath.join(".","sync-path-middle.txt")); syncBuiltinESMExports(); readFileSync(esmPath.join(".","sync-path-post.txt"));`,
        );
        const syncedPathOperations = extractFileOperations(
            syncedPath.sourceFile,
            "fixture.ts",
            root,
            null,
            new Map(),
            syncedPath.bindingResolver,
        );
        expect(syncedPathOperations.operations.map(({ target }) => target)).toEqual([
            "sync-path-pre.txt",
            "sync-path-middle.txt",
        ]);
        expect(syncedPathOperations.unmodeled).toHaveLength(1);

        for (const [label, barrier] of [
            ["global process.chdir", `process.chdir("sub")`],
            ["imported process.chdir", `import { chdir as cd } from "node:process"; cd("sub")`],
            ["aliased process.chdir", `const p=process; p.chdir("sub")`],
        ] as const) {
            const fixture = extractScriptReferences(
                `import { readFileSync } from "node:fs"; ${barrier}; readFileSync("./relative.txt"); readFileSync(${JSON.stringify(resolve(root, "package.json"))});`,
            );
            const result = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(result.operations, label).toEqual([
                expect.objectContaining({
                    operation: "readFileSync",
                    target: "sub/relative.txt",
                }),
                expect.objectContaining({
                    operation: "readFileSync",
                    target: "package.json",
                }),
            ]);
            expect(result.unmodeled, label).toEqual([]);
        }

        for (const [label, changes, target, unmodeled] of [
            [
                "absolute chdir restores dynamic state",
                `process.chdir(unknown); process.chdir(${JSON.stringify(resolve(root, "scripts"))});`,
                "scripts/relative.txt",
                0,
            ],
            [
                "relative chdir cannot restore dynamic state",
                `process.chdir(unknown); process.chdir("scripts");`,
                null,
                1,
            ],
            [
                "cross-function chdir remains sticky",
                `function move() { process.chdir("other"); } move(); process.chdir(${JSON.stringify(resolve(root, "scripts"))});`,
                null,
                1,
            ],
        ] as const) {
            const fixture = extractScriptReferences(
                `import { readFileSync } from "node:fs"; ${changes} readFileSync("./relative.txt");`,
            );
            const result = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(result.operations.map(({ target: value }) => value), label).toEqual(
                target ? [target] : [],
            );
            expect(result.unmodeled, label).toHaveLength(unmodeled);
        }

        for (const [label, source, expectedTarget, expectedUnmodeled = expectedTarget ? 0 : 1] of [
            ["assignment carrier", `import { readFileSync } from "node:fs"; let read; read = readFileSync; read("assignment.txt");`, "assignment.txt"],
            ["reaching fs assignment", `import { readFileSync } from "node:fs"; let read = readFileSync; read("fs-before.txt"); read = replacement; read("fs-after.txt");`, "fs-before.txt", 0],
            ["conditional reaching fs assignment", `import { readFileSync } from "node:fs"; let read = readFileSync; if (flag) read = replacement; read("fs-conditional.txt");`, null, 1],
            ["object destructuring carrier", `import { readFileSync } from "node:fs"; const holder = { readFileSync }; const { readFileSync: read } = holder; read("object.txt");`, "object.txt"],
            ["array destructuring carrier", `import { readFileSync } from "node:fs"; const holder = [readFileSync]; const [read] = holder; read("array.txt");`, "array.txt"],
            ["for-of carrier", `import { readFileSync } from "node:fs"; let read; for (read of [readFileSync]) {} read("for-of.txt");`, null],
            ["declaration for-of carrier", `import { readFileSync } from "node:fs"; for (const read of [readFileSync]) read("declaration-for-of.txt");`, "declaration-for-of.txt"],
            ["empty array default carrier", `import { readFileSync } from "node:fs"; const [read = readFileSync] = []; read("empty-default.txt");`, "empty-default.txt"],
            ["omitted array default carrier", `import { readFileSync } from "node:fs"; const [read = readFileSync] = [,]; read("omitted-default.txt");`, "omitted-default.txt"],
            ["undefined array default carrier", `import { readFileSync } from "node:fs"; const [read = readFileSync] = [undefined]; read("undefined-default.txt");`, "undefined-default.txt"],
            ["nested array default carrier", `import { readFileSync } from "node:fs"; const [[read = readFileSync] = []] = []; read("nested-default.txt");`, "nested-default.txt"],
            ["logical carrier", `import { readFileSync } from "node:fs"; let read = readFileSync; read ||= readFileSync; read("logical.txt");`, "logical.txt"],
            ["falsy logical carrier", `import { readFileSync } from "node:fs"; let read = false; read ||= readFileSync; read("falsy-logical.txt");`, "falsy-logical.txt"],
            ["zero logical carrier", `import { readFileSync } from "node:fs"; let read = 0; read ||= readFileSync; read("zero-logical.txt");`, "zero-logical.txt"],
            ["empty logical carrier", `import { readFileSync } from "node:fs"; let read = ""; read ||= readFileSync; read("empty-logical.txt");`, "empty-logical.txt"],
            ["nullish logical carrier", `import { readFileSync } from "node:fs"; let read = null; read ??= readFileSync; read("nullish-logical.txt");`, "nullish-logical.txt"],
            ["logical and undefined carrier", `import { readFileSync } from "node:fs"; let read; read &&= readFileSync; read("logical-and-undefined.txt");`, null, 0],
            ["conditional carrier", `import { readFileSync } from "node:fs"; const read = flag ? readFileSync : readFileSync; read("conditional.txt");`, "conditional.txt"],
            ["mixed conditional carrier", `import { readFileSync } from "node:fs"; const read = flag ? readFileSync : local; read("mixed.txt");`, null],
            ["two-hop carrier", `import { readFileSync } from "node:fs"; const first = readFileSync; const second = first; second("two-hop.txt");`, "two-hop.txt"],
            ["written named import", `import { readFileSync } from "node:fs"; readFileSync = replacement; readFileSync("written-import.txt");`, null],
            ["written destructured import", `import { readFileSync } from "node:fs"; ({ readFileSync } = source); readFileSync("destructured-import.txt");`, null],
        ] as const) {
            const carrier = extractScriptReferences(source);
            const carrierOperations = extractFileOperations(
                carrier.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                carrier.bindingResolver,
            );
            expect(carrierOperations.operations, label).toEqual(
                expectedTarget
                    ? [expect.objectContaining({ operation: "readFileSync", target: expectedTarget })]
                    : [],
            );
            expect(carrierOperations.unmodeled, label).toHaveLength(expectedUnmodeled);
        }
        for (const [label, source] of [
            ["direct ||= file", `import { readFileSync } from "node:fs"; let read; (read ||= readFileSync)("direct-or-file.txt");`],
            ["direct ??= file", `import { readFileSync } from "node:fs"; let read; (read ??= readFileSync)("direct-nullish-file.txt");`],
            ["direct &&= file", `import { readFileSync } from "node:fs"; let read; (read &&= readFileSync)("direct-and-file.txt");`],
        ] as const) {
            const direct = extractScriptReferences(source);
            const result = extractFileOperations(
                direct.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                direct.bindingResolver,
            );
            expect(result.operations, label).toEqual(
                label.includes("&&=")
                    ? []
                    : [expect.objectContaining({ operation: "readFileSync" })],
            );
        }

        for (const [label, source, operation, target] of [
            [
                "default fs then require share",
                `import fs from "node:fs";
                 const required = require("fs");
                 fs.readFileSync = replacement;
                 required.readFileSync("default-require-shared.txt");`,
                "readFileSync",
                "default-require-shared.txt",
            ],
            [
                "require then default fs share",
                `import fs from "fs";
                 const required = require("node:fs");
                 required.readFileSync = replacement;
                 fs.readFileSync("require-default-shared.txt");`,
                "readFileSync",
                "require-default-shared.txt",
            ],
            [
                "dynamic default fs share",
                `const fs = (await import("node:fs")).default;
                 fs.readFileSync = replacement;
                 require("fs").readFileSync("dynamic-default-shared.txt");`,
                "readFileSync",
                "dynamic-default-shared.txt",
            ],
            [
                "finite dynamic default fs share",
                `const specifier = flag ? "fs" : "node:fs";
                 const fs = (await import(specifier)).default;
                 fs.readFileSync = replacement;
                 require("node:fs").readFileSync("finite-dynamic-shared.txt");`,
                "readFileSync",
                "finite-dynamic-shared.txt",
            ],
        ] as const) {
            const fixture = extractScriptReferences(source, "fixture.mjs", null, {}, { repositoryRoot: root });
            const result = extractFileOperations(
                fixture.sourceFile,
                "fixture.mjs",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(result.operations, label).toEqual([]);
            expect(result.unmodeled, label).toEqual([
                expect.objectContaining({ operation, boundary: "tainted-fs-member" }),
            ]);
            expect(target, label).toBeTruthy();
        }

        const esmNamespace = extractScriptReferences(`
            import * as fs from "node:fs";
            fs.readFileSync = replacement;
            fs.readFileSync("esm-namespace-snapshot.txt");
        `);
        expect(
            extractFileOperations(
                esmNamespace.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                esmNamespace.bindingResolver,
            ).operations,
        ).toEqual([
            expect.objectContaining({ operation: "readFileSync", target: "esm-namespace-snapshot.txt" }),
        ]);

        const pathMembers = extractScriptReferences(`
            import path from "node:path";
            import { readdirSync } from "node:fs";
            path.resolve = replacement;
            readdirSync(path.join("src"));
        `);
        expect(
            extractFileOperations(
                pathMembers.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                pathMembers.bindingResolver,
            ).operations,
        ).toEqual([
            expect.objectContaining({ operation: "readdirSync", target: "src" }),
        ]);

        const childMembers = extractScriptReferences(`
            import child from "node:child_process";
            child.execFileSync = replacement;
            child.execFileSync("node", ["./fake.mjs"]);
            child.spawnSync("node", ["script.mjs"]);
        `);
        expect(
            extractProcessInvocations(
                childMembers.sourceFile,
                "fixture.ts",
                root,
                null,
                {},
                new Map(),
                childMembers.bindingResolver,
        ).map(({ api }) => api),
        ).toEqual(["execFileSync", "spawnSync"]);

        const orderedChildMutation = extractScriptReferences(
            `const cp = require("node:child_process"); cp.spawnSync("node", ["before-child.mjs"]); cp.spawnSync = replacement; cp.spawnSync("node", ["after-child.mjs"]);`,
        );
        expect(
            extractProcessInvocations(
                orderedChildMutation.sourceFile,
                "fixture.ts",
                root,
                null,
                {},
                new Map(),
                orderedChildMutation.bindingResolver,
            ).map(({ api, line, argv }) => ({ api, line, script: argv[0]?.value })),
        ).toEqual([
            { api: "spawnSync", line: 1, script: "before-child.mjs" },
            { api: "spawnSync", line: 1, script: "after-child.mjs" },
        ]);

        const finiteChild = extractScriptReferences(`
            const specifier = flag ? "child_process" : "node:child_process";
            const child = (await import(specifier)).default;
            child.execFileSync = replacement;
            child.execFileSync("node", ["./fake.mjs"]);
            child.spawnSync("node", ["./real.mjs"]);
        `);
        expect(
            extractProcessInvocations(
                finiteChild.sourceFile,
                "fixture.mjs",
                root,
                null,
                {},
                new Map(),
                finiteChild.bindingResolver,
            ).map(({ api }) => api),
        ).toEqual(["execFileSync", "spawnSync"]);

        for (const source of [
            `import moduleApi from "node:module"; moduleApi.createRequire = replacement; moduleApi.createRequire(import.meta.url);`,
            `import urlApi from "node:url"; import { readFileSync } from "node:fs"; urlApi.fileURLToPath = replacement; readFileSync(urlApi.fileURLToPath(import.meta.url));`,
        ]) {
            const fixture = extractScriptReferences(source, "fixture.mjs", null, {}, { repositoryRoot: root });
            expect(fixture.parseErrors).toEqual([]);
        }
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
            let bareAwaited = await import(specifier);
            bareAwaited.readFileSync("bare-await-before.txt");
            bareAwaited = replacement;
            bareAwaited.readFileSync("bare-await-after.txt");
            let bareCjs = require("node:fs");
            bareCjs.readFileSync("bare-cjs-before.txt");
            bareCjs = replacement;
            bareCjs.readFileSync("bare-cjs-after.txt");
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
            { operation: "readFileSync", target: "bare-await-before.txt" },
            { operation: "readFileSync", target: "bare-cjs-before.txt" },
        ]);
        expect(operations.unmodeled).toEqual([
            expect.objectContaining({
                operation: "then",
                boundary: "module-promise",
                moduleName: "node:fs",
            }),
        ]);

        for (const source of [
            `const fs=require("node:fs"); fs.promises = replacement; fs.promises.readFile("parent-assignment.txt");`,
            `const fs=require("node:fs"); delete fs.promises; fs.promises.readFile("parent-delete.txt");`,
            `const fs=require("node:fs"); Object.defineProperty(fs,"promises",{}); fs.promises.readFile("parent-define.txt");`,
            `const fs=require("node:fs"); Object.defineProperties(fs,{promises:{value:replacement}}); fs.promises.readFile("parent-properties.txt");`,
            `const fs=require("node:fs"); Reflect.defineProperty(fs,"promises",{}); fs.promises.readFile("parent-reflect.txt");`,
            `const fs=require("node:fs"); Object.assign(fs,{promises:replacement}); fs.promises.readFile("parent-assign.txt");`,
        ]) {
            const parentMutation = extractScriptReferences(source);
            const result = extractFileOperations(
                parentMutation.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                parentMutation.bindingResolver,
            );
            expect(result.operations).toEqual([]);
            expect(result.unmodeled).toEqual([
                expect.objectContaining({ operation: "readFile", boundary: "tainted-fs-member" }),
            ]);
        }
        for (const source of [
            `const fsp=require("node:fs/promises"); const fs=require("node:fs"); delete fs.promises; fsp.readFile("private-delete.txt");`,
            `const fs=require("node:fs"); const fsp=fs.promises; delete fs.promises; fsp.readFile("private-capture.txt");`,
        ]) {
            const privatePromise = extractScriptReferences(source);
            const result = extractFileOperations(
                privatePromise.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                privatePromise.bindingResolver,
            );
            expect(result.operations).toEqual([
                expect.objectContaining({ operation: "readFile" }),
            ]);
            expect(result.unmodeled).toEqual([]);
        }

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

        const deferredOutputs = [false, true].flatMap((eagerFinalization) =>
            [true, false].map((parameterFirst) => {
                const deferred = extractScriptReferences(
                    `let specifier; let namespace = await import(specifier); namespace = replacement; namespace.readFileSync("setter-order.txt");`,
                    "fixture-deferred.mjs",
                    null,
                    {},
                    { repositoryRoot: root, deferFinalization: true },
                );
                const specifierRecord = deferred.bindingResolver.lookup(
                    "specifier",
                    deferred.sourceFile,
                );
                expect(specifierRecord).toBeDefined();
                const parameterValues = new Map([[specifierRecord, "node:fs"]]);
                const dynamicResolver = () => ({
                    kind: "nonlocal",
                    specifiers: ["node:fs"],
                    provenance: "test-finite",
                });
                if (eagerFinalization) deferred.bindingResolver.finalizeWrites();
                if (parameterFirst) {
                    deferred.bindingResolver.setParameterValues(parameterValues);
                    deferred.bindingResolver.setDynamicImportResolver(dynamicResolver);
                } else {
                    deferred.bindingResolver.setDynamicImportResolver(dynamicResolver);
                    deferred.bindingResolver.setParameterValues(parameterValues);
                }
                deferred.bindingResolver.finalizeWrites();
                deferred.bindingResolver.finalizeWrites();
                return extractFileOperations(
                    deferred.sourceFile,
                    "fixture-deferred.mjs",
                    root,
                    null,
                    parameterValues,
                    deferred.bindingResolver,
                );
            }),
        );
        expect(deferredOutputs[0]).toEqual(deferredOutputs[1]);
        expect(deferredOutputs[0]).toEqual(deferredOutputs[2]);
        expect(deferredOutputs[0]).toEqual(deferredOutputs[3]);
        expect(deferredOutputs[0].operations).toEqual([]);
        expect(deferredOutputs[0].unmodeled).toEqual([]);

        const dynamicMutationSource =
            `let specifier; const namespace = await import(specifier); const fs = require("node:fs"); fs.readFileSync = namespace.readFileSync; fs.readFileSync("resolver-revision.txt");`;
        const dynamicMutationResolver = () => ({
            kind: "nonlocal" as const,
            specifiers: ["node:fs"],
            provenance: "test-finite",
        });
        const dynamicMutationFixture = () =>
            extractScriptReferences(
                dynamicMutationSource,
                "fixture-dynamic-mutation.mjs",
                null,
                {},
                { repositoryRoot: root, deferFinalization: true },
            );
        const configuredFirst = dynamicMutationFixture();
        configuredFirst.bindingResolver.setDynamicImportResolver(dynamicMutationResolver);
        const configuredFirstOperations = extractFileOperations(
            configuredFirst.sourceFile,
            "fixture-dynamic-mutation.mjs",
            root,
            null,
            new Map(),
            configuredFirst.bindingResolver,
        );
        const configuredLate = dynamicMutationFixture();
        expect(
            extractFileOperations(
                configuredLate.sourceFile,
                "fixture-dynamic-mutation.mjs",
                root,
                null,
                new Map(),
                configuredLate.bindingResolver,
            ).unmodeled,
        ).toHaveLength(1);
        configuredLate.bindingResolver.setDynamicImportResolver(dynamicMutationResolver);
        const configuredLateOperations = extractFileOperations(
            configuredLate.sourceFile,
            "fixture-dynamic-mutation.mjs",
            root,
            null,
            new Map(),
            configuredLate.bindingResolver,
        );
        expect(configuredLateOperations).toEqual(configuredFirstOperations);
        expect(configuredLateOperations).toMatchObject({
            operations: [
                expect.objectContaining({
                    operation: "readFileSync",
                    target: "resolver-revision.txt",
                }),
            ],
            unmodeled: [],
        });

        for (const [label, first, second] of [
            ["fs then child", "fsSpec", "childSpec"],
            ["child then fs", "childSpec", "fsSpec"],
        ] as const) {
            const union = extractScriptReferences(
                `const fsSpec = flag ? "fs" : "node:fs";
                 const childSpec = flag2 ? "child_process" : "node:child_process";
                 let promise;
                 promise = import(${first});
                 promise = import(${second});
                 const namespace = await promise;
                 namespace.default.readFileSync = replacement;
                 namespace.default.execFileSync = replacement;
                 require("fs").readFileSync("union-${label}.txt");
                 require("child_process").execFileSync("node", ["fake.mjs"]);
                 require("child_process").spawnSync("node", ["real.mjs"]);`,
                "fixture.mjs",
                null,
                {},
                { repositoryRoot: root },
            );
            const unionOperations = extractFileOperations(
                union.sourceFile,
                "fixture.mjs",
                root,
                null,
                new Map(),
                union.bindingResolver,
            );
            expect(unionOperations.operations, label).toEqual([]);
            expect(unionOperations.unmodeled, label).toEqual([
                expect.objectContaining({ operation: "readFileSync", boundary: "tainted-fs-member" }),
            ]);
            expect(
                extractProcessInvocations(
                    union.sourceFile,
                    "fixture.mjs",
                    root,
                    null,
                    {},
                    new Map(),
                    union.bindingResolver,
                ).map(({ api }) => api),
                label,
            ).toEqual(["execFileSync", "spawnSync"]);
        }
        for (const source of [
            "import(1n + true);",
            "import(true + 1n);",
            "import(1n + null);",
            "import(null + 1n);",
            "import(1n + undefined);",
            "import(undefined + 1n);",
            "import(`${1n + true}`);",
            "import(`${false + 1n}`);",
        ]) {
            const mixedBigInt = extractScriptReferences(source);
            expect(mixedBigInt.references, source).toEqual([]);
            expect(mixedBigInt.nonliteralReferences, source).toEqual([
                expect.objectContaining({ edgeKind: "finite-dynamic", localHint: true }),
            ]);
        }
        for (const [source, specifier] of [
            ["import(1n + 2n);", "3"],
            ["import(\"x\" + 1n);", "x1"],
            ["import(`${\"x\" + 1n}`);", "x1"],
        ] as const) {
            expect(extractScriptReferences(source).references).toEqual([
                expect.objectContaining({ edgeKind: "finite-dynamic", specifier }),
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

        const moved = extractScriptReferences(`
            import { readdirSync } from "node:fs";
            import { resolve } from "node:path";
            process.chdir("scripts");
            const cwd = process.cwd();
            readdirSync(cwd);
            readdirSync(resolve("child"));
        `);
        expect(
            extractFileOperations(
                moved.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                moved.bindingResolver,
            ).operations.map(({ target }) => target),
        ).toEqual(["scripts", "scripts/child"]);
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

        for (const [label, source, target] of [
            ["path empty array default", `import { readFileSync } from "node:fs"; import { resolve } from "node:path"; const [pathResolve = resolve] = []; readFileSync(pathResolve("path-empty.txt"));`, "path-empty.txt"],
            ["path omitted array default", `import { readFileSync } from "node:fs"; import { resolve } from "node:path"; const [pathResolve = resolve] = [,]; readFileSync(pathResolve("path-omitted.txt"));`, "path-omitted.txt"],
            ["path undefined array default", `import { readFileSync } from "node:fs"; import { resolve } from "node:path"; const [pathResolve = resolve] = [undefined]; readFileSync(pathResolve("path-undefined.txt"));`, "path-undefined.txt"],
            ["path nested array default", `import { readFileSync } from "node:fs"; import { resolve } from "node:path"; const [[pathResolve = resolve] = []] = []; readFileSync(pathResolve("path-nested.txt"));`, "path-nested.txt"],
            ["path falsy logical carrier", `import { readFileSync } from "node:fs"; import { resolve } from "node:path"; let pathResolve = false; pathResolve ||= resolve; readFileSync(pathResolve("path-falsy.txt"));`, "path-falsy.txt"],
            ["path zero logical carrier", `import { readFileSync } from "node:fs"; import { resolve } from "node:path"; let pathResolve = 0; pathResolve ||= resolve; readFileSync(pathResolve("path-zero.txt"));`, "path-zero.txt"],
            ["url empty array default", `import { readFileSync } from "node:fs"; import { fileURLToPath } from "node:url"; const [pathFromUrl = fileURLToPath] = []; readFileSync(pathFromUrl(import.meta.url));`, "fixture.ts"],
            ["url omitted array default", `import { readFileSync } from "node:fs"; import { fileURLToPath } from "node:url"; const [pathFromUrl = fileURLToPath] = [,]; readFileSync(pathFromUrl(import.meta.url));`, "fixture.ts"],
            ["url undefined array default", `import { readFileSync } from "node:fs"; import { fileURLToPath } from "node:url"; const [pathFromUrl = fileURLToPath] = [undefined]; readFileSync(pathFromUrl(import.meta.url));`, "fixture.ts"],
            ["url nested array default", `import { readFileSync } from "node:fs"; import { fileURLToPath } from "node:url"; const [[pathFromUrl = fileURLToPath] = []] = []; readFileSync(pathFromUrl(import.meta.url));`, "fixture.ts"],
            ["url empty logical carrier", `import { readFileSync } from "node:fs"; import { fileURLToPath } from "node:url"; let pathFromUrl = ""; pathFromUrl ||= fileURLToPath; readFileSync(pathFromUrl(import.meta.url));`, "fixture.ts"],
            ["url nullish logical carrier", `import { readFileSync } from "node:fs"; import { fileURLToPath } from "node:url"; let pathFromUrl = null; pathFromUrl ??= fileURLToPath; readFileSync(pathFromUrl(import.meta.url));`, "fixture.ts"],
        ] as const) {
            const fixture = extractScriptReferences(source);
            const carrierOperations = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(carrierOperations.operations, label).toEqual([
                expect.objectContaining({ operation: "readFileSync", target }),
            ]);
            expect(carrierOperations.unmodeled, label).toEqual([]);
        }

        for (const [label, argumentsSource, target] of [
            ["URL options absent", "", "fixture.mjs"],
            ["URL options undefined", ", undefined", "fixture.mjs"],
            ["URL options void", ", void 0", "fixture.mjs"],
            ["URL options empty", ", {}", "fixture.mjs"],
            ["URL options windows undefined", ", { windows: undefined }", "fixture.mjs"],
            ["URL options POSIX", ", { windows: false }", "fixture.mjs"],
            ["URL options Windows", ", { windows: true }", null],
            ["URL options dynamic", ", { windows: unknown }", null],
            ["URL extra arguments ignored", ", {}, unknown", "fixture.mjs"],
        ] as const) {
            const fixture = extractScriptReferences(
                `import { readFileSync } from "node:fs"; import { fileURLToPath } from "node:url"; readFileSync(fileURLToPath(import.meta.url${argumentsSource}));`,
                "fixture.mjs",
            );
            const optionOperations = extractFileOperations(
                fixture.sourceFile,
                "fixture.mjs",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(optionOperations.operations, label).toEqual(
                target
                    ? [expect.objectContaining({ operation: "readFileSync", target })]
                    : [],
            );
            expect(optionOperations.unmodeled, label).toHaveLength(target ? 0 : 1);
        }

        const literalSyncedUrl = extractScriptReferences(
            `
                import { readFileSync as read } from "node:fs";
                import * as esmUrl from "node:url";
                import { syncBuiltinESMExports as sync } from "node:module";
                const url = require("node:url"), original = url.fileURLToPath;
                const beforeObject = { nested: { convert: esmUrl.fileURLToPath } };
                const beforeArray = [[esmUrl.fileURLToPath]];
                const namespaceObject = { nested: { value: esmUrl } };
                const namespaceArray = [[esmUrl]];
                const cjsObject = { nested: { convert: url.fileURLToPath } };
                const cjsArray = [[url.fileURLToPath]];
                url.fileURLToPath = local; sync();
                const afterObject = { nested: { convert: esmUrl.fileURLToPath } };
                const afterArray = [[esmUrl.fileURLToPath]];
                read(namespaceObject.nested.value.fileURLToPath(import.meta.url));
                read(namespaceArray[0][0].fileURLToPath(import.meta.url));
                read(cjsObject.nested.convert(import.meta.url));
                read(cjsArray[0][0](import.meta.url));
                url.fileURLToPath = original; sync();
                read(beforeObject.nested.convert(import.meta.url));
                read(beforeArray[0][0](import.meta.url));
                read(afterObject.nested.convert(import.meta.url));
                read(afterArray[0][0](import.meta.url));
                read(namespaceObject.nested.value.fileURLToPath(import.meta.url));
                read(namespaceArray[0][0].fileURLToPath(import.meta.url));
            `,
            "fixture.mjs",
            null,
            {},
            { repositoryRoot: root },
        );
        const literalSyncedUrlOperations = extractFileOperations(
            literalSyncedUrl.sourceFile,
            "fixture.mjs",
            root,
            null,
            new Map(),
            literalSyncedUrl.bindingResolver,
        );
        expect(literalSyncedUrlOperations.operations.map(({ target }) => target)).toEqual([
            "fixture.mjs",
            "fixture.mjs",
            "fixture.mjs",
            "fixture.mjs",
        ]);
        expect(literalSyncedUrlOperations.unmodeled).toHaveLength(6);

        const laterSlotSyncedUrl = extractScriptReferences(
            `
                import { readFileSync as read } from "node:fs";
                import * as esmUrl from "node:url";
                import { syncBuiltinESMExports as sync } from "node:module";
                const url = require("node:url"), original = url.fileURLToPath;
                const beforeObject = {}, beforeArray = [];
                const namespaceObject = {}, namespaceArray = [];
                const cjsObject = {}, cjsArray = [];
                beforeObject.convert = esmUrl.fileURLToPath;
                beforeArray[0] = esmUrl.fileURLToPath;
                namespaceObject.value = esmUrl; namespaceArray[0] = esmUrl;
                cjsObject.convert = url.fileURLToPath; cjsArray[0] = url.fileURLToPath;
                url.fileURLToPath = local; sync();
                const afterObject = {}, afterArray = [];
                afterObject.convert = esmUrl.fileURLToPath;
                afterArray[0] = esmUrl.fileURLToPath;
                read(namespaceObject.value.fileURLToPath(import.meta.url));
                read(namespaceArray[0].fileURLToPath(import.meta.url));
                read(cjsObject.convert(import.meta.url));
                read(cjsArray[0](import.meta.url));
                url.fileURLToPath = original; sync();
                read(beforeObject.convert(import.meta.url));
                read(beforeArray[0](import.meta.url));
                read(afterObject.convert(import.meta.url));
                read(afterArray[0](import.meta.url));
                read(namespaceObject.value.fileURLToPath(import.meta.url));
                read(namespaceArray[0].fileURLToPath(import.meta.url));
                read(cjsObject.convert(import.meta.url));
                read(cjsArray[0](import.meta.url));
            `,
            "fixture.mjs",
            null,
            {},
            { repositoryRoot: root },
        );
        const laterSlotSyncedUrlOperations = extractFileOperations(
            laterSlotSyncedUrl.sourceFile,
            "fixture.mjs",
            root,
            null,
            new Map(),
            laterSlotSyncedUrl.bindingResolver,
        );
        expect(laterSlotSyncedUrlOperations.operations.map(({ target }) => target)).toEqual([
            "fixture.mjs",
            "fixture.mjs",
            "fixture.mjs",
            "fixture.mjs",
            "fixture.mjs",
            "fixture.mjs",
            "fixture.mjs",
            "fixture.mjs",
        ]);
        expect(laterSlotSyncedUrlOperations.unmodeled).toHaveLength(4);

        for (const [label, source, target] of [
            ["path reaching assignment", `import { readFileSync } from "node:fs"; import { resolve } from "node:path"; let pathResolve = resolve; readFileSync(pathResolve("path-before.txt")); pathResolve = replacement; readFileSync(pathResolve("path-after.txt"));`, "path-before.txt"],
            ["url reaching assignment", `import { readFileSync } from "node:fs"; import { fileURLToPath } from "node:url"; let pathFromUrl = fileURLToPath; readFileSync(pathFromUrl(import.meta.url)); pathFromUrl = replacement; readFileSync(pathFromUrl(import.meta.url));`, "fixture.mjs"],
        ] as const) {
            const fixture = extractScriptReferences(source, "fixture.mjs", null, {}, { repositoryRoot: root });
            const carrierOperations = extractFileOperations(
                fixture.sourceFile,
                "fixture.mjs",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(carrierOperations.operations, label).toEqual([
                expect.objectContaining({ operation: "readFileSync", target }),
            ]);
            expect(carrierOperations.unmodeled, label).toHaveLength(1);
        }

        const orderedPathMutation = extractScriptReferences(
            `import { readdirSync } from "node:fs"; import path from "node:path"; readdirSync(path.resolve("before-path.txt")); path.resolve = replacement; readdirSync(path.resolve("after-path.txt"));`,
        );
        const orderedPathOperations = extractFileOperations(
            orderedPathMutation.sourceFile,
            "fixture.ts",
            root,
            null,
            new Map(),
            orderedPathMutation.bindingResolver,
        );
        expect(orderedPathOperations.operations).toEqual([
            expect.objectContaining({ operation: "readdirSync", target: "before-path.txt" }),
        ]);
        expect(orderedPathOperations.unmodeled).toEqual([
            expect.objectContaining({ operation: "readdirSync" }),
        ]);

        for (const [label, source, target, unmodeled] of [
            [
                "copied path member snapshots its source",
                `const fs=require("node:fs"); const path=require("node:path"); function local() {} path.resolve=path.join; path.join=local; fs.readFileSync(path.resolve("copied","path.txt"));`,
                "copied/path.txt",
                0,
            ],
            [
                "later copied path destination write supersedes",
                `const fs=require("node:fs"); const path=require("node:path"); function local() {} path.resolve=path.join; path.join=local; path.resolve=local; fs.readFileSync(path.resolve("copied","path.txt"));`,
                null,
                1,
            ],
            [
                "shared path carrier forward",
                `const fs=require("node:fs"); const path=require("node:path"); const holder={make:path.resolve}; const wrapper={holder}; wrapper.holder.make=path.join; fs.readFileSync(holder.make("shared","path-forward.txt"));`,
                "shared/path-forward.txt",
                0,
            ],
            [
                "shared path carrier reverse",
                `const fs=require("node:fs"); const path=require("node:path"); const holder={make:path.resolve}; const wrapper={holder}; holder.make=path.join; fs.readFileSync(wrapper.holder.make("shared","path-reverse.txt"));`,
                "shared/path-reverse.txt",
                0,
            ],
        ] as const) {
            const fixture = extractScriptReferences(source);
            const copiedPath = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(copiedPath.operations, label).toEqual(
                target
                    ? [expect.objectContaining({ operation: "readFileSync", target })]
                    : [],
            );
            expect(copiedPath.unmodeled, label).toHaveLength(unmodeled);
        }

        for (const source of [
            `import { readFileSync } from "node:fs"; import { resolve } from "node:path"; resolve = replacement; readFileSync(resolve("written-path.txt"));`,
            `import { readFileSync } from "node:fs"; import { resolve } from "node:path"; ({ resolve } = source); readFileSync(resolve("destructured-path.txt"));`,
        ]) {
            const fixture = extractScriptReferences(source);
            const written = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(written.operations).toEqual([]);
            expect(written.unmodeled).toEqual([
                expect.objectContaining({ operation: "readFileSync" }),
            ]);
        }

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

        for (const mutation of [
            `Object.defineProperty(p, "cwd", {});`,
            `Object.defineProperties(p, { cwd: {} });`,
            `Object.assign(p, source);`,
            `Reflect.set(p, "cwd", value);`,
            `Reflect.defineProperty(p, "cwd", {});`,
            `Reflect.deleteProperty(p, "cwd");`,
            `Reflect.set(p, dynamicKey, value);`,
            `Object.defineProperty(p, dynamicKey, descriptor);`,
        ]) {
            const fixture = extractScriptReferences(
                `import { readdirSync } from "node:fs"; const p = process; ${mutation} readdirSync(process.cwd());`,
            );
            const operations = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(operations.operations, mutation).toEqual([]);
            expect(operations.unmodeled, mutation).toEqual([
                expect.objectContaining({ operation: "readdirSync" }),
            ]);
        }

        const globalProcessCrossFunction = extractScriptReferences(
            `import { readdirSync } from "node:fs";
             const original=process.cwd;
             function local() { return "local"; }
             function mutate() { process.cwd=local; }
             process.cwd=original;
             mutate();
             readdirSync(process.cwd());`,
        );
        const globalProcessCrossFunctionOperations = extractFileOperations(
            globalProcessCrossFunction.sourceFile,
            "fixture.ts",
            root,
            null,
            new Map(),
            globalProcessCrossFunction.bindingResolver,
        );
        expect(globalProcessCrossFunctionOperations.operations).toEqual([]);
        expect(globalProcessCrossFunctionOperations.unmodeled).toEqual([
            expect.objectContaining({ operation: "readdirSync" }),
        ]);

        const shadowedMutator = extractScriptReferences(
            `import { readdirSync } from "node:fs"; function Object() {} Object.defineProperty(process, "cwd", {}); readdirSync(process.cwd());`,
        );
        expect(
            extractFileOperations(
                shadowedMutator.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                shadowedMutator.bindingResolver,
            ).operations,
        ).toEqual([expect.objectContaining({ operation: "readdirSync", target: "." })]);
        const aliasedMutator = extractScriptReferences(
            `import { readdirSync } from "node:fs"; const p = process; const define = Object.defineProperty; define(p, "cwd", {}); readdirSync(process.cwd());`,
        );
        expect(
            extractFileOperations(
                aliasedMutator.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                aliasedMutator.bindingResolver,
            ).operations,
        ).toEqual([expect.objectContaining({ operation: "readdirSync", target: "." })]);

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

        const reachingProcess = extractScriptReferences(
            `import { readdirSync } from "node:fs"; let p = process; readdirSync(p.cwd()); p = replacement; readdirSync(p.cwd());`,
        );
        const reachingProcessOperations = extractFileOperations(
            reachingProcess.sourceFile,
            "fixture.ts",
            root,
            null,
            new Map(),
            reachingProcess.bindingResolver,
        );
        expect(reachingProcessOperations.operations).toEqual([
            expect.objectContaining({ operation: "readdirSync", target: "." }),
        ]);
        expect(reachingProcessOperations.unmodeled).toHaveLength(1);

        const orderedProcessMutation = extractScriptReferences(
            `import { readdirSync } from "node:fs"; readdirSync(process.cwd()); process.cwd = replacement; readdirSync(process.cwd());`,
        );
        const orderedProcessOperations = extractFileOperations(
            orderedProcessMutation.sourceFile,
            "fixture.ts",
            root,
            null,
            new Map(),
            orderedProcessMutation.bindingResolver,
        );
        expect(orderedProcessOperations.operations).toEqual([
            expect.objectContaining({ operation: "readdirSync", target: "." }),
        ]);
        expect(orderedProcessOperations.unmodeled).toEqual([
            expect.objectContaining({ operation: "readdirSync" }),
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

        const cjsBareAliasRebind = extractScriptReferences(
            `const fs = require("node:fs");
             let alias = fs;
             alias = replacement;
             fs.readFileSync("bare-alias-control.txt");`,
        );
        expect(
            extractFileOperations(
                cjsBareAliasRebind.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                cjsBareAliasRebind.bindingResolver,
            ).operations,
        ).toEqual([
            expect.objectContaining({
                operation: "readFileSync",
                target: "bare-alias-control.txt",
                line: 4,
            }),
        ]);

        const unknownWriteCases = [
            ["destructuring assignment", "({ value } = source);", "destructuring-unknown-write.txt"],
            ["for-of", "for (value of source) {}", "for-of-unknown-write.txt"],
            ["logical", "value &&= source;", "logical-unknown-write.txt"],
            ["while", "while (flag) value = source;", "while-unknown-write.txt"],
            ["do-while", "do { value = source; } while (flag);", "do-while-unknown-write.txt"],
            ["logical-and RHS", "flag && (value = source);", "logical-and-rhs-unknown-write.txt"],
            ["logical-or RHS", "flag || (value = source);", "logical-or-rhs-unknown-write.txt"],
            ["logical-nullish RHS", "flag ?? (value = source);", "logical-nullish-rhs-unknown-write.txt"],
        ].flatMap(([label, write, target]) => [
            processSharedCase(`process ${label} unknown write`, `let value = {}; ${write} function mutate({ alias = process } = { alias: value }) { alias.cwd = replacement; } mutate();`),
            cjsSharedCase(`CJS ${label} unknown write`, `let value = {}; ${write} function mutate({ alias = original } = { alias: value }) { alias.readFileSync = replacement; } mutate();`, target),
        ]);
        const explicitWriteCases = [
            processSharedCase("process destructuring RHS", "let alias; ({ alias } = { alias: process }); alias.cwd = replacement;"),
            cjsSharedCase("CJS destructuring RHS", "let alias; ([alias] = [original]); alias.readFileSync = replacement;", "destructuring-rhs.txt"),
            processSharedCase("process finite for-of RHS", "let alias; for (alias of [process]) {} alias.cwd = replacement;"),
            cjsSharedCase("CJS logical OR RHS", "let alias; alias ||= original; alias.readFileSync = replacement;", "logical-rhs.txt"),
            cjsSharedCase("CJS logical nullish RHS", "let alias; alias ??= original; alias.readFileSync = replacement;", "nullish-rhs.txt"),
            processSharedCase("process logical AND RHS", "let alias = process; alias &&= process; alias.cwd = replacement;"),
        ];
        const unknownDefaultCases = [
            processSharedCase("process unknown shallow default", "const holder = source; const { [dynamicKey]: alias = process } = holder; alias.cwd = replacement;"),
            cjsSharedCase("CJS unknown shallow default", "const holder = source; const { [dynamicKey]: alias = original } = holder; alias.readFileSync = replacement;", "unknown-shallow-default.txt"),
            processSharedCase("process unknown nested later default", "const holder = source; const { a: { alias = process } } = holder; alias.cwd = replacement;"),
            cjsSharedCase("CJS unknown nested later default", "const holder = { ...source }; const { a: { alias = original } } = holder; alias.readFileSync = replacement;", "unknown-nested-default.txt"),
            processSharedCase("process duplicate nested later default", "const holder = { a: {}, a: {} }; const { a: { alias = process } } = holder; alias.cwd = replacement;"),
            cjsSharedCase("CJS duplicate nested later default", "const holder = { a: {}, a: {} }; const { a: { alias = original } } = holder; alias.readFileSync = replacement;", "duplicate-nested-default.txt"),
        ];
        const sharedIdentityCases = [
            processSharedCase("process member mutation before alias rebind", "const original = process; let alias = original; alias.cwd = replacement; alias = replacement; readdirSync(process.cwd()); readdirSync(original.cwd()); readdirSync(alias.cwd());", 3, null),
            cjsSharedCase("CJS member mutation before alias rebind", "let alias = original; alias.readFileSync = replacement; alias = replacement; original.readFileSync(\"original-before.txt\"); alias.readFileSync(\"alias-before.txt\");", null, 1),
            processSharedCase("process simple assignment alias", "let alias; alias = process; alias.cwd = replacement;"),
            processSharedCase("process one-hop assignment provenance", "let a; a = process; const b = a; b.cwd = replacement;"),
            processSharedCase("process two-hop assignment provenance", "let a; a = process; const b = a; const c = b; c.cwd = replacement;"),
            processSharedCase("process empty array default carrier", "const [alias = process] = []; alias.cwd = replacement;"),
            processSharedCase("process omitted array default carrier", "const [alias = process] = [,]; alias.cwd = replacement;"),
            processSharedCase("process undefined array default carrier", "const [alias = process] = [undefined]; alias.cwd = replacement;"),
            processSharedCase("process nested array default carrier", "const [[alias = process] = []] = []; alias.cwd = replacement;"),
            cjsSharedCase("CJS simple assignment alias", "let alias; alias = original; alias.readFileSync = replacement;", "simple-assignment.txt"),
            cjsSharedCase("CJS one-hop assignment provenance", "let a; a = original; const b = a; b.readFileSync = replacement;", "one-hop-assignment.txt"),
            cjsSharedCase("CJS two-hop assignment provenance", "let a; a = original; const b = a; const c = b; c.readFileSync = replacement;", "two-hop-assignment.txt"),
            cjsSharedCase("CJS empty array default carrier", "const [alias = original] = []; alias.readFileSync = replacement;", "cjs-empty-default.txt"),
            cjsSharedCase("CJS omitted array default carrier", "const [alias = original] = [,]; alias.readFileSync = replacement;", "cjs-omitted-default.txt"),
            cjsSharedCase("CJS undefined array default carrier", "const [alias = original] = [undefined]; alias.readFileSync = replacement;", "cjs-undefined-default.txt"),
            cjsSharedCase("CJS nested array default carrier", "const [[alias = original] = []] = []; alias.readFileSync = replacement;", "cjs-nested-default.txt"),
            processSharedCase("process exact object origin", "const holder = { process }; holder.process.cwd = replacement;"),
            processSharedCase("process exact object spread mirror", "const holder = { local: replacement, ...{ process } }; holder.local.cwd = replacement;", 0, "."),
            processSharedCase("process exact object spread reverse mirror", "const holder = { ...{ process }, local: replacement }; holder.local.cwd = replacement;", 0, "."),
            processSharedCase("process exact array origin", "const holder = [process]; holder[0].cwd = replacement;"),
            processSharedCase("process computed literal object origin", "const holder = { [\"process\"]: process }; holder.process.cwd = replacement;"),
            processSharedCase("process computed literal destructuring origin", "const { [\"process\"]: alias } = { [\"process\"]: process }; alias.cwd = replacement;"),
            processSharedCase("process constant computed destructuring origin", "const key = \"process\"; const { [key]: alias } = { process }; alias.cwd = replacement;"),
            processSharedCase("process composed destructuring origin", "const { nested: { alias } } = { nested: { alias: process } }; alias.cwd = replacement;"),
            processSharedCase("process parameter default origin", "function mutate(alias = process) { alias.cwd = replacement; } mutate();"),
            processSharedCase("process nested member mutation", "const p = process; p.env.foo = replacement;"),
            cjsSharedCase("CJS nested promise member keeps callback fs precise", "original.promises.readFile = replacement;", "nested-member.txt", 0),
            processSharedCase("process intrinsic nested member mutation", "const p = process; Reflect.set(p.env, \"foo\", replacement);"),
            cjsSharedCase("CJS intrinsic nested promise member keeps callback fs precise", "Object.defineProperty(original.promises, \"readFile\", {});", "intrinsic-nested-member.txt", 0),
            cjsSharedCase("CJS exact object origin", "const holder = { fs: original }; holder.fs.readFileSync = replacement;", "object-origin.txt"),
            cjsSharedCase("CJS exact object spread local after", "const holder = { ...{ fs: original }, local: replacement }; holder.local.readFileSync = replacement;", "spread-local-after.txt", 0),
            cjsSharedCase("CJS exact object spread local before", "const holder = { local: replacement, ...{ fs: original } }; holder.local.readFileSync = replacement;", "spread-local-before.txt", 0),
            cjsSharedCase("CJS exact array origin", "const holder = [original]; holder[0].readFileSync = replacement;", "array-origin.txt"),
            cjsSharedCase("CJS composed destructuring origin", "const { nested: { alias } } = { nested: { alias: original } }; alias.readFileSync = replacement;", "destructured-origin.txt"),
            cjsSharedCase("CJS parameter default origin", "function mutate(alias = original) { alias.readFileSync = replacement; } mutate();", "default-origin.txt"),
            ...unknownWriteCases,
            ...explicitWriteCases,
            ...unknownDefaultCases,
            processSharedCase("process parameter object default origin", "function mutate({ alias } = { alias: process }) { alias.cwd = replacement; } mutate();"),
            cjsSharedCase("CJS parameter array default origin", "function mutate([alias] = [original]) { alias.readFileSync = replacement; } mutate();", "parameter-array-default.txt"),
            processSharedCase("process nested object default origin", "function mutate({ nested: { alias } } = { nested: { alias: process } }) { alias.cwd = replacement; } mutate();"),
            cjsSharedCase("CJS nested array default origin", "function mutate({ nested: [alias] } = { nested: [original] }) { alias.readFileSync = replacement; } mutate();", "nested-array-default.txt"),
            processSharedCase("process parameter array omitted element default", "function mutate([alias = process] = [,]) { alias.cwd = replacement; } mutate();"),
            processSharedCase("process parameter array explicit undefined default", "function mutate([alias = process] = [undefined]) { alias.cwd = replacement; } mutate();"),
            cjsSharedCase("CJS parameter array omitted element default", "function mutate([alias = original] = [,]) { alias.readFileSync = replacement; } mutate();", "array-omitted.txt"),
            cjsSharedCase("CJS parameter array explicit undefined default", "function mutate([alias = original] = [undefined]) { alias.readFileSync = replacement; } mutate();", "array-undefined.txt"),
            processSharedCase("process nested parameter array omitted element default", "function mutate({ nested: [alias = process] } = { nested: [,] }) { alias.cwd = replacement; } mutate();"),
            cjsSharedCase("CJS nested parameter array explicit undefined default", "function mutate({ nested: [alias = original] } = { nested: [undefined] }) { alias.readFileSync = replacement; } mutate();", "nested-array-undefined.txt"),
            processSharedCase("process parenthesized global undefined object default", "function mutate({ alias = process } = { alias: (undefined) }) { alias.cwd = replacement; } mutate();"),
            processSharedCase("process shadowed undefined object origin", "function mutate(undefined = process, { alias = process } = { alias: undefined }) { alias.cwd = replacement; } mutate();"),
            cjsSharedCase("CJS shadowed undefined object origin", "function mutate(undefined = original, { alias = original } = { alias: undefined }) { alias.readFileSync = replacement; } mutate();", "shadowed-object.txt"),
            processSharedCase("process shadowed undefined array origin", "function mutate(undefined = process, [alias = process] = [undefined]) { alias.cwd = replacement; } mutate();"),
            cjsSharedCase("CJS shadowed undefined array origin", "function mutate(undefined = original, [alias = original] = [undefined]) { alias.readFileSync = replacement; } mutate();", "shadowed-array.txt"),
            processSharedCase("process parameter global undefined excludes body var", "function mutate({ alias = process } = { alias: (undefined) }) { var undefined = replacement; alias.cwd = replacement; } mutate();"),
            cjsSharedCase("CJS parameter outer origin excludes body var", "function mutate({ alias = original } = { alias: original }) { var original = replacement; alias.readFileSync = replacement; } mutate();", "parameter-outer-origin.txt"),
            processSharedCase("process nested parameter initializer arrow sees outer origin", "const outer = process; function mutate({ alias = outer } = { alias: (() => outer)() }) { var outer = replacement; alias.cwd = replacement; } mutate();"),
            cjsSharedCase("CJS nested parameter initializer function sees outer origin", "const outer = original; function mutate({ alias = outer } = { alias: (function nested() { return outer; })() }) { var outer = replacement; alias.readFileSync = replacement; } mutate();", "nested-parameter-function.txt"),
            processSharedCase("process void zero default", "function mutate({ alias = process } = { alias: void 0 }) { alias.cwd = replacement; } mutate();"),
            cjsSharedCase("CJS void expression default", "function mutate({ alias = original } = { alias: void replacement }) { alias.readFileSync = replacement; } mutate();", "void-expression.txt"),
            processSharedCase("process two-hop immutable undefined alias", "const first = undefined; const second = first; function mutate({ alias = process } = { alias: second }) { alias.cwd = replacement; } mutate();"),
            cjsSharedCase("CJS mixed maybe includes default", "const maybe = flag ? undefined : original; function mutate({ alias = original } = { alias: maybe }) { alias.readFileSync = replacement; } mutate();", "maybe-default.txt"),
            processSharedCase("process object destructured undefined alias", "const { u } = { u: undefined }; function mutate({ alias = process } = { alias: u }) { alias.cwd = replacement; } mutate();"),
            cjsSharedCase("CJS array destructured void alias", "const [u] = [void 0]; function mutate({ alias = original } = { alias: u }) { alias.readFileSync = replacement; } mutate();", "array-projected-undefined.txt"),
            processSharedCase("process mixed projected alias includes leaf default", "const maybe = flag ? undefined : process; const { u } = { u: maybe }; function mutate({ alias = process } = { alias: u }) { alias.cwd = replacement; } mutate();"),
            processSharedCase("process opaque source retains shared leaf default", "const holder = { ...{ process } }; const { [dynamicKey]: alias = process } = holder; alias.cwd = replacement;"),
            cjsSharedCase("CJS opaque source retains shared leaf default", "const holder = { ...{ original } }; const { [dynamicKey]: alias = original } = holder; alias.readFileSync = replacement;", "opaque-leaf-default.txt"),
            processSharedCase("process parenthesized assignment alias", "let alias; (alias) = process; alias.cwd = replacement;"),
            cjsSharedCase("CJS asserted assignment alias", "let alias; (alias as any) = original; alias.readFileSync = replacement;", "asserted-assignment.txt"),
            processSharedCase("process unsupported computed binding key", "const key = dynamicKey; const { [key]: alias } = { process }; alias.cwd = replacement;"),
            cjsSharedCase("CJS unsupported computed binding key", "const key = dynamicKey; const { [key]: alias } = { fs: original }; alias.readFileSync = replacement;", "unsupported-computed.txt"),
            processSharedCase("process unsupported computed binding default on absence", "const key = dynamicKey; const { [key]: alias = process } = {}; alias.cwd = replacement;"),
            cjsSharedCase("CJS unsupported computed binding default on absence", "const key = dynamicKey; const { [key]: alias = original } = {}; alias.readFileSync = replacement;", "unsupported-default.txt"),
            processSharedCase("process truly dynamic computed binding twin", "const key = dynamicKey; const { [key]: alias } = { [otherKey]: process }; alias.cwd = replacement;"),
            cjsSharedCase("CJS truly dynamic computed binding twin", "const key = dynamicKey; const { [key]: alias } = { [otherKey]: original }; alias.readFileSync = replacement;", "dynamic-twin.txt"),
            processSharedCase("process shallow numeric member", "const p = process; p[0] = replacement;", 0, "."),
            cjsSharedCase("CJS shallow numeric member", "original[0] = replacement;", "shallow-numeric.txt", 0),
            processSharedCase("process exponent numeric member", "const p = process; p[1e0] = replacement;", 0, "."),
            cjsSharedCase("CJS bigint numeric member", "original[1n] = replacement;", "bigint-numeric.txt", 0),
            processSharedCase("process signed literal is nonundefined", "function mutate({ alias = process } = { alias: -1n }) { alias.cwd = replacement; } mutate();", 0, "."),
            cjsSharedCase("CJS signed literal is nonundefined", "function mutate({ alias = original } = { alias: +1 }) { alias.readFileSync = replacement; } mutate();", "signed-literal.txt", 0),
            processSharedCase("process computed Object mutator spelling", "const p = process; Object[\"defineProperty\"](p, \"cwd\", {});"),
            cjsSharedCase("CJS computed Reflect mutator spelling", "Reflect[\"set\"](original, \"readFileSync\", replacement);", "computed-reflect.txt"),
            processSharedCase("process transparent computed Object mutator spelling", "const p = process; Object[(\"defineProperty\" as const)](p, (\"cwd\" as const), {});"),
            cjsSharedCase("CJS transparent computed Reflect mutator spelling", "Reflect[(\"set\" as const)](original, (\"readFileSync\" as const), replacement);", "transparent-reflect.txt"),
            processSharedCase("process defineProperty transparent unrelated key", "const p = process; Object.defineProperty(p, (\"env\" as const), {});", 0, "."),
            cjsSharedCase("CJS defineProperty transparent unrelated key", "Object.defineProperty(original, (\"other\" as const), {});", "define-property.txt", 0),
            processSharedCase("process defineProperties transparent computed key", "const p = process; Object.defineProperties(p, { [(\"env\" as const)]: {} });", 0, "."),
            cjsSharedCase("CJS defineProperties transparent computed key", "Object.defineProperties(original, { [(\"other\" as const)]: {} });", "define-properties.txt", 0),
            processSharedCase("process Reflect.set numeric key", "const p = process; Reflect.set(p, 0, replacement);", 0, "."),
            cjsSharedCase("CJS Reflect.set numeric key", "Reflect.set(original, 0, replacement);", "reflect-set.txt", 0),
            processSharedCase("process Reflect.defineProperty transparent key", "const p = process; Reflect.defineProperty(p, (\"env\" as const), {});", 0, "."),
            cjsSharedCase("CJS Reflect.defineProperty transparent key", "Reflect.defineProperty(original, (\"other\" as const), {});", "reflect-define-property.txt", 0),
            processSharedCase("process Reflect.deleteProperty numeric key", "const p = process; Reflect.deleteProperty(p, 0);", 0, "."),
            cjsSharedCase("CJS Reflect.deleteProperty numeric key", "Reflect.deleteProperty(original, 0);", "reflect-delete-property.txt", 0),
            processSharedCase("process parent object default precedence", "function mutate({ nested: { alias = process } = { alias: {} } } = {}) { alias.cwd = replacement; } mutate();", 0, "."),
            processSharedCase("process parent array default precedence", "function mutate({ nested: [alias = process] = [{}] } = {}) { alias.cwd = replacement; } mutate();", 0, "."),
            cjsSharedCase("CJS parent object default precedence", "function mutate({ nested: { alias = original } = { alias: {} } } = {}) { alias.readFileSync = replacement; } mutate();", "cjs-parent-object.txt", 0),
            cjsSharedCase("CJS parent array default precedence", "function mutate({ nested: [alias = original] = [{}] } = {}) { alias.readFileSync = replacement; } mutate();", "cjs-parent-array.txt", 0),
            processSharedCase("process shallow unrelated member", "const p = process; p.env = replacement;", 0, "."),
            processSharedCase("process shallow unrelated intrinsic member", "const p = process; Reflect.set(p, \"env\", replacement);", 0, "."),
            processSharedCase("process falsy logical assignment", "let carrier = false; carrier ||= process; carrier.cwd = replacement;"),
            processSharedCase("process zero logical assignment", "let carrier = 0; carrier ||= process; carrier.cwd = replacement;"),
            processSharedCase("process empty logical assignment", "let carrier = \"\"; carrier ||= process; carrier.cwd = replacement;"),
            processSharedCase("process nullish logical assignment", "let carrier = null; carrier ??= process; carrier.cwd = replacement;"),
            processSharedCase("process unknown-or mutation carrier", "const carrier = unknown || process; carrier.cwd = replacement;"),
            processSharedCase("process unknown-and mutation carrier", "const carrier = unknown && process; carrier.cwd = replacement;"),
            processSharedCase("process unknown-nullish mutation carrier", "const carrier = unknown ?? process; carrier.cwd = replacement;"),
            processSharedCase("process false-or mutation carrier", "const carrier = false || process; carrier.cwd = replacement;"),
            processSharedCase("process assignment-expression mutation carrier", "let carrier; (carrier = process).cwd = replacement;"),
            cjsSharedCase("CJS unknown-or mutation carrier", "const carrier = unknown || original; carrier.readFileSync = replacement;", "cjs-unknown-or.txt"),
            cjsSharedCase("CJS unknown-and mutation carrier", "const carrier = unknown && original; carrier.readFileSync = replacement;", "cjs-unknown-and.txt"),
            cjsSharedCase("CJS unknown-nullish mutation carrier", "const carrier = unknown ?? original; carrier.readFileSync = replacement;", "cjs-unknown-nullish.txt"),
            cjsSharedCase("CJS assignment-expression mutation carrier", "let carrier; (carrier = original).readFileSync = replacement;", "cjs-assignment-expression.txt"),
            cjsSharedCase("CJS falsy logical assignment", "let carrier = false; carrier ||= original; carrier.readFileSync = replacement;", "cjs-falsy-logical.txt"),
            cjsSharedCase("CJS zero logical assignment", "let carrier = 0; carrier ||= original; carrier.readFileSync = replacement;", "cjs-zero-logical.txt"),
            cjsSharedCase("CJS empty logical assignment", "let carrier = \"\"; carrier ||= original; carrier.readFileSync = replacement;", "cjs-empty-logical.txt"),
            cjsSharedCase("CJS nullish logical assignment", "let carrier = null; carrier ??= original; carrier.readFileSync = replacement;", "cjs-nullish-logical.txt"),
        ] as const;
        for (const [label, source, expectedUnmodeled, expectedTarget, expectedOperation = "readdirSync"] of sharedIdentityCases) {
            const fixture = extractScriptReferences(source);
            const operations = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(operations.operations, label).toEqual(
                expectedTarget
                    ? [expect.objectContaining({ operation: expectedOperation, target: expectedTarget })]
                    : [],
            );
            expect(operations.unmodeled, label).toHaveLength(expectedUnmodeled);
            expect(
                operations.unmodeled.map(({ operation }) => operation),
                label,
            ).toEqual(
                expect.arrayContaining(
                    label.startsWith("process")
                        ? Array(expectedUnmodeled).fill("readdirSync")
                        : Array(expectedUnmodeled).fill("readFileSync"),
                ),
            );
        }

        for (const [label, source, targets, expectedUnmodeled] of [
            [
                "process alias rebind before member write",
                `import { readdirSync } from "node:fs"; const original = process; let alias = original; alias = replacement; alias.cwd = replacement; readdirSync(process.cwd()); readdirSync(original.cwd()); readdirSync(alias.cwd());`,
                [".", "."],
                1,
            ],
            [
                "CJS alias rebind before member write",
                `const original = require("node:fs"); let alias = original; alias = replacement; alias.readFileSync = replacement; original.readFileSync("original-after.txt"); alias.readFileSync("alias-after.txt");`,
                ["original-after.txt"],
                0,
            ],
        ] as const) {
            const fixture = extractScriptReferences(source);
            const operations = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(operations.operations.map(({ target }) => target), label).toEqual(targets);
            expect(operations.unmodeled, label).toHaveLength(expectedUnmodeled);
        }

        for (const [label, source] of [
            [
                "child one-hop assignment provenance",
                `const child = require("node:child_process"); let a; a = child; const b = a; b.execFileSync = replacement; b.execFileSync("node", ["./fake.mjs"]); b.spawnSync("node", ["./real.mjs"]);`,
            ],
            [
                "child two-hop assignment provenance",
                `const child = require("node:child_process"); let a; a = child; const b = a; const c = b; c.execFileSync = replacement; c.execFileSync("node", ["./fake.mjs"]); c.spawnSync("node", ["./real.mjs"]);`,
            ],
        ] as const) {
            const fixture = extractScriptReferences(source);
            expect(
                extractProcessInvocations(
                    fixture.sourceFile,
                    "fixture.ts",
                    root,
                    null,
                    {},
                    new Map(),
                    fixture.bindingResolver,
                ).map(({ api }) => api),
                label,
            ).toEqual(["execFileSync", "spawnSync"]);
        }
        const childFutureRebind = extractScriptReferences(
            `const child = require("node:child_process"); const holder = { run: child.spawnSync }; let alias = holder; alias.run = replacement; alias = other; holder.run("node", ["future-rebind.mjs"]);`,
        );
        expect(
            extractProcessInvocations(
                childFutureRebind.sourceFile,
                "fixture.ts",
                root,
                null,
                {},
                new Map(),
                childFutureRebind.bindingResolver,
            ),
        ).toEqual([
            expect.objectContaining({ api: "spawnSync", dynamicArguments: 1 }),
        ]);

        for (const [label, source] of [
            ["child unknown-or mutation carrier", `const child = require("node:child_process"); const carrier = unknown || child; carrier.execFileSync = replacement; child.execFileSync("node", ["./fake.mjs"]); child.spawnSync("node", ["./real.mjs"]);`],
            ["child unknown-and mutation carrier", `const child = require("node:child_process"); const carrier = unknown && child; carrier.execFileSync = replacement; child.execFileSync("node", ["./fake.mjs"]); child.spawnSync("node", ["./real.mjs"]);`],
            ["child unknown-nullish mutation carrier", `const child = require("node:child_process"); const carrier = unknown ?? child; carrier.execFileSync = replacement; child.execFileSync("node", ["./fake.mjs"]); child.spawnSync("node", ["./real.mjs"]);`],
            ["child assignment-expression mutation carrier", `const child = require("node:child_process"); let carrier; (carrier = child).execFileSync = replacement; child.execFileSync("node", ["./fake.mjs"]); child.spawnSync("node", ["./real.mjs"]);`],
        ] as const) {
            const fixture = extractScriptReferences(source);
            expect(
                extractProcessInvocations(
                    fixture.sourceFile,
                    "fixture.ts",
                    root,
                    null,
                    {},
                    new Map(),
                    fixture.bindingResolver,
                ).map(({ api }) => api),
                label,
            ).toEqual(["execFileSync", "spawnSync"]);
        }

        const conservativeInitialOriginCases = [
            [`import { readdirSync } from "node:fs"; const holder = { ...{ process } }; holder.process.cwd = replacement; readdirSync(process.cwd());`, false],
            [`import { readdirSync } from "node:fs"; const key = "process"; const holder = { [key]: process }; holder.process.cwd = replacement; readdirSync(process.cwd());`, false],
            [`import { readdirSync } from "node:fs"; const holder = [process]; const index = dynamicIndex; holder[index].cwd = replacement; readdirSync(process.cwd());`, false],
            [`import { readdirSync } from "node:fs"; const holder = { ...{ process }, local: replacement }; holder.local.cwd = replacement; readdirSync(process.cwd());`, true],
            [`import { readdirSync } from "node:fs"; const holder = { self: holder }; holder.self.cwd = replacement; readdirSync(process.cwd());`, true],
            [`import { readdirSync } from "node:fs"; const holder = { process, process: replacement }; holder.process.cwd = replacement; readdirSync(process.cwd());`, true],
        ];
        for (const [source, exact] of conservativeInitialOriginCases) {
            const fixture = extractScriptReferences(source);
            const operations = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(operations.operations, String(source)).toEqual(
                exact ? [expect.objectContaining({ operation: "readdirSync", target: "." })] : [],
            );
            expect(operations.unmodeled).toHaveLength(exact ? 0 : 1);
        }

        for (const [source, operation] of [
            [`const holder = { fs: require("node:fs") }; holder[dynamicKey].readFileSync = replacement; holder.fs.readFileSync("unknown-fs.txt");`, "readFileSync"],
            [`const holder = [require("node:fs")]; holder[dynamicIndex].readFileSync = replacement; holder[0].readFileSync("unknown-array-fs.txt");`, "readFileSync"],
            [`const holder = { child: require("node:child_process") }; holder[dynamicKey].execFileSync = replacement; holder.child.execFileSync("node", ["./fake.mjs"]); holder.child.spawnSync("node", ["./real.mjs"]);`, "child-process"],
            [`const holder = [require("node:child_process")]; holder[dynamicIndex].execFileSync = replacement; holder[0].execFileSync("node", ["./fake.mjs"]); holder[0].spawnSync("node", ["./real.mjs"]);`, "child-process"],
        ] as const) {
            const fixture = extractScriptReferences(source);
            const file = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            if (operation === "readFileSync") {
                expect(file.operations).toEqual([]);
                expect(file.unmodeled).toHaveLength(1);
            } else {
                expect(
                    extractProcessInvocations(
                        fixture.sourceFile,
                        "fixture.ts",
                        root,
                        null,
                        {},
                        new Map(),
                        fixture.bindingResolver,
                    ).map(({ api }) => api),
                ).toEqual(["execFileSync", "spawnSync"]);
            }
        }

        const orderedSpreadFs = extractScriptReferences(
            `const holder = { ...{ fs: require("node:fs") }, local: replacement }; holder.local.readFileSync = replacement; holder.fs.readFileSync("ordered-spread-fs.txt");`,
        );
        const orderedSpreadFsOperations = extractFileOperations(
            orderedSpreadFs.sourceFile,
            "fixture.ts",
            root,
            null,
            new Map(),
            orderedSpreadFs.bindingResolver,
        );
        expect(orderedSpreadFsOperations.operations).toEqual([
            expect.objectContaining({ operation: "readFileSync", target: "ordered-spread-fs.txt" }),
        ]);
        expect(orderedSpreadFsOperations.unmodeled).toEqual([]);

        const orderedSpreadFsMirror = extractScriptReferences(
            `const holder = { local: replacement, ...{ fs: require("node:fs") } }; holder.local.readFileSync = replacement; holder.fs.readFileSync("ordered-spread-fs-mirror.txt");`,
        );
        const orderedSpreadFsMirrorOperations = extractFileOperations(
            orderedSpreadFsMirror.sourceFile,
            "fixture.ts",
            root,
            null,
            new Map(),
            orderedSpreadFsMirror.bindingResolver,
        );
        expect(orderedSpreadFsMirrorOperations.operations).toEqual([
            expect.objectContaining({ operation: "readFileSync", target: "ordered-spread-fs-mirror.txt" }),
        ]);
        expect(orderedSpreadFsMirrorOperations.unmodeled).toEqual([]);

        for (const source of [
            `const holder = { ...{ fs: require("node:fs") }, fs: undefined }; holder.fs.readFileSync("spread-undefined.txt"); readFileSync("spread-stable.txt");`,
            `const holder = { fs: require("node:fs"), fs: undefined }; holder.fs.readFileSync("duplicate-undefined.txt"); readFileSync("duplicate-stable.txt");`,
        ]) {
            const fixture = extractScriptReferences(`import { readFileSync } from "node:fs"; ${source}`);
            const overwrite = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(overwrite.operations).toEqual([
                expect.objectContaining({ operation: "readFileSync", target: source.includes("spread") ? "spread-stable.txt" : "duplicate-stable.txt" }),
            ]);
            expect(overwrite.unmodeled).toEqual([]);
        }

        for (const source of [
            `import { readdirSync } from "node:fs"; readdirSync(true || process.cwd());`,
            `import { readdirSync } from "node:fs"; readdirSync(false && process.cwd());`,
        ]) {
            const fixture = extractScriptReferences(source);
            const unreachable = extractFileOperations(fixture.sourceFile, "fixture.ts", root, null, new Map(), fixture.bindingResolver);
            expect(unreachable.operations).toEqual([]);
            expect(unreachable.unmodeled).toHaveLength(1);
        }

        for (const [label, source, operation, target, unmodeled] of [
            [
                "live property alias",
                `const fs=require("node:fs"); function local() {} const holder={nested:{read:fs.readFileSync}}; const alias=holder.nested; holder.nested.read=local; alias.read("live-property.txt");`,
                null,
                null,
                1,
            ],
            [
                "live array alias",
                `const fs=require("node:fs"); function local() {} const holder=[{read:fs.readFileSync}]; const alias=holder[0]; holder[0].read=local; alias.read("live-array.txt");`,
                null,
                null,
                1,
            ],
            [
                "live deeper suffix",
                `const fs=require("node:fs"); function local() {} const holder={nested:{deeper:{read:fs.readFileSync}}}; const alias=holder.nested; holder.nested.deeper.read=local; alias.deeper.read("live-deeper.txt");`,
                null,
                null,
                1,
            ],
            [
                "alias captured after literal slot replacement",
                `const fs=require("node:fs"); function local() {} const holder={nested:{read:local}}; holder.nested={read:fs.readFileSync}; const alias=holder.nested; holder.nested.read=local; alias.read("after-slot.txt");`,
                null,
                null,
                1,
            ],
            [
                "live alias wrong-member replacement",
                `const fs=require("node:fs"); const holder={nested:{read:fs.readFileSync}}; const alias=holder.nested; holder.nested.read=fs.writeFileSync; alias.read("wrong-member.txt","content");`,
                "writeFileSync",
                "wrong-member.txt",
                0,
            ],
            [
                "old alias detached by equal slot replacement",
                `const fs=require("node:fs"); function local() {} const old={read:fs.readFileSync}; const holder={nested:old}; const alias=holder.nested; holder.nested={read:fs.readFileSync}; holder.nested.read=local; alias.read("detached.txt");`,
                "readFileSync",
                "detached.txt",
                0,
            ],
            [
                "direct member capture snapshot",
                `const fs=require("node:fs"); function local() {} const holder={nested:{read:fs.readFileSync}}; const read=holder.nested.read; holder.nested.read=local; read("member-snapshot.txt");`,
                "readFileSync",
                "member-snapshot.txt",
                0,
            ],
            [
                "destructured member capture snapshot",
                `const fs=require("node:fs"); function local() {} const holder={nested:{read:fs.readFileSync}}; const {read}=holder.nested; holder.nested.read=local; read("destructured-snapshot.txt");`,
                "readFileSync",
                "destructured-snapshot.txt",
                0,
            ],
            [
                "assignment-destructured object carrier forward",
                `const fs=require("node:fs"); function local() {} const holder={read:fs.readFileSync}; let {old:alias}={old:{read:local}}; ({fresh:alias}={fresh:holder}); holder.read=local; alias.read("assignment-object-forward.txt");`,
                null,
                null,
                1,
            ],
            [
                "assignment-destructured object carrier reverse",
                `const fs=require("node:fs"); function local() {} const holder={read:fs.readFileSync}; let {old:alias}={old:{read:local}}; ({fresh:alias}={fresh:holder}); alias.read=local; holder.read("assignment-object-reverse.txt");`,
                null,
                null,
                1,
            ],
            [
                "assignment-destructured array carrier forward",
                `const fs=require("node:fs"); function local() {} const holder={read:fs.readFileSync}; let [alias]=[{read:local}]; ([,alias]=[0,holder]); holder.read=local; alias.read("assignment-array-forward.txt");`,
                null,
                null,
                1,
            ],
            [
                "assignment-destructured array carrier reverse",
                `const fs=require("node:fs"); function local() {} const holder={read:fs.readFileSync}; let [alias]=[{read:local}]; ([,alias]=[0,holder]); alias.read=local; holder.read("assignment-array-reverse.txt");`,
                null,
                null,
                1,
            ],
            [
                "assignment-destructured nested carrier forward",
                `const fs=require("node:fs"); function local() {} const holder={read:fs.readFileSync}; let {old:{alias}}={old:{alias:{read:local}}}; ({fresh:{alias}}={fresh:{alias:holder}}); holder.read=local; alias.read("assignment-nested-forward.txt");`,
                null,
                null,
                1,
            ],
            [
                "assignment-destructured nested carrier reverse",
                `const fs=require("node:fs"); function local() {} const holder={read:fs.readFileSync}; let {old:{alias}}={old:{alias:{read:local}}}; ({fresh:{alias}}={fresh:{alias:holder}}); alias.read=local; holder.read("assignment-nested-reverse.txt");`,
                null,
                null,
                1,
            ],
            [
                "post-declaration shared carrier",
                `const fs=require("node:fs"); function local() {} const holder={read:fs.readFileSync}; let wrapper; wrapper={holder}; wrapper.holder.read=local; holder.read("shared-post-declaration.txt");`,
                null,
                null,
                1,
            ],
            [
                "conditional shared carrier",
                `const fs=require("node:fs"); function local() {} const holder={read:fs.readFileSync}; let wrapper; wrapper=flag?{holder}:{}; wrapper.holder.read=local; holder.read("shared-conditional.txt");`,
                null,
                null,
                1,
            ],
            [
                "resolvable spread shared carrier",
                `const fs=require("node:fs"); function local() {} const holder={read:fs.readFileSync}; const base={holder}; const wrapper={...base,local:0}; wrapper.holder.read=local; holder.read("shared-spread-container.txt");`,
                null,
                null,
                1,
            ],
            [
                "assignment-destructured shared carrier",
                `const fs=require("node:fs"); function local() {} const holder={read:fs.readFileSync}; let wrapper; ({wrapper}={wrapper:{holder}}); wrapper.holder.read=local; holder.read("shared-assignment-container.txt");`,
                null,
                null,
                1,
            ],
            [
                "dynamic-key shared carrier",
                `const fs=require("node:fs"); function local() {} const holder={read:fs.readFileSync}; const wrapper={[dynamicKey]:holder}; wrapper.any.read=local; holder.read("shared-dynamic-key.txt");`,
                null,
                null,
                1,
            ],
            [
                "wildcard mutation overlaps literal null key",
                `const fs=require("node:fs"); function local() {} const holder={read:fs.readFileSync}; const wrapper={"null":holder}; wrapper[dynamicKey].read=local; holder.read("shared-null-forward.txt");`,
                null,
                null,
                1,
            ],
            [
                "literal null mutation overlaps wildcard key",
                `const fs=require("node:fs"); function local() {} const holder={read:fs.readFileSync}; const wrapper={[dynamicKey]:holder}; wrapper["null"].read=local; holder.read("shared-null-reverse.txt");`,
                null,
                null,
                1,
            ],
            [
                "shared object carrier forward",
                `const fs=require("node:fs"); function local() {} const holder={read:fs.readFileSync}; const wrapper={holder}; wrapper.holder.read=local; holder.read("shared-object-forward.txt");`,
                null,
                null,
                1,
            ],
            [
                "shared object carrier reverse",
                `const fs=require("node:fs"); function local() {} const holder={read:fs.readFileSync}; const wrapper={holder}; holder.read=local; wrapper.holder.read("shared-object-reverse.txt");`,
                null,
                null,
                1,
            ],
            [
                "shared array carrier",
                `const fs=require("node:fs"); function local() {} const holder={read:fs.readFileSync}; const wrapper=[holder]; wrapper[0].read=local; holder.read("shared-array.txt");`,
                null,
                null,
                1,
            ],
            [
                "shared deep carrier",
                `const fs=require("node:fs"); function local() {} const holder={read:fs.readFileSync}; const wrapper={x:{y:holder}}; wrapper.x.y.read=local; holder.read("shared-deep.txt");`,
                null,
                null,
                1,
            ],
            [
                "shared cyclic carrier",
                `const fs=require("node:fs"); function local() {} const holder={read:fs.readFileSync}; const first={holder}; const second={first}; holder.back=second; second.first.holder.read=local; holder.read("shared-cycle.txt");`,
                null,
                null,
                1,
            ],
            [
                "shared mutation before detachment reaches original",
                `const fs=require("node:fs"); function local() {} const holder={read:fs.readFileSync}; const wrapper={holder}; wrapper.holder.read=local; wrapper.holder={read:fs.readFileSync}; holder.read("shared-before-detach.txt");`,
                null,
                null,
                1,
            ],
            [
                "shared mutation after detachment misses original",
                `const fs=require("node:fs"); function local() {} const holder={read:fs.readFileSync}; const wrapper={holder}; wrapper.holder={read:fs.readFileSync}; wrapper.holder.read=local; holder.read("shared-after-detach.txt");`,
                "readFileSync",
                "shared-after-detach.txt",
                0,
            ],
            [
                "shared spread remains a copy",
                `const fs=require("node:fs"); function local() {} const holder={read:fs.readFileSync}; const copied={...holder}; copied.read=local; holder.read("shared-spread-copy.txt");`,
                "readFileSync",
                "shared-spread-copy.txt",
                0,
            ],
            [
                "shared direct member remains a snapshot",
                `const fs=require("node:fs"); function local() {} const holder={read:fs.readFileSync}; const wrapper={holder}; const read=wrapper.holder.read; holder.read=local; read("shared-member-snapshot.txt");`,
                "readFileSync",
                "shared-member-snapshot.txt",
                0,
            ],
            [
                "shared copied member snapshots replacement",
                `const fs=require("node:fs"); function local() {} const holder={read:fs.readFileSync}; const wrapper={holder}; wrapper.holder.read=fs.writeFileSync; fs.writeFileSync=local; holder.read("shared-copied-member.txt","content");`,
                "writeFileSync",
                "shared-copied-member.txt",
                0,
            ],
        ] as const) {
            const fixture = extractScriptReferences(source);
            const result = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(
                result.operations.map(({ operation: actual, target: actualTarget }) => ({
                    operation: actual,
                    target: actualTarget,
                })),
                label,
            ).toEqual(operation ? [{ operation, target }] : []);
            expect(result.unmodeled, label).toHaveLength(unmodeled);
        }

        for (const [label, source, operation, target, unmodeled] of [
            [
                "descriptor reaching value mutation",
                `const fs=require("node:fs"); function local() {} const descriptor={value:fs.readFileSync}; descriptor.value=local; Object.defineProperty(fs,"readFileSync",descriptor); fs.readFileSync("descriptor-value.txt");`,
                null,
                null,
                1,
            ],
            [
                "descriptor alias reaching value mutation",
                `const fs=require("node:fs"); function local() {} const descriptor={value:fs.readFileSync}; const alias=descriptor; alias.value=local; Reflect.defineProperty(fs,"readFileSync",descriptor); fs.readFileSync("descriptor-alias.txt");`,
                null,
                null,
                1,
            ],
            [
                "descriptor spread reaching value mutation",
                `const fs=require("node:fs"); function local() {} const base={value:fs.readFileSync}; base.value=local; Object.defineProperty(fs,"readFileSync",{...base}); fs.readFileSync("descriptor-spread.txt");`,
                null,
                null,
                1,
            ],
            [
                "descriptor reaching getter mutation",
                `const fs=require("node:fs"); function local() {} const descriptor={value:fs.readFileSync}; descriptor.get=local; Object.defineProperty(fs,"readFileSync",descriptor); fs.readFileSync("descriptor-get.txt");`,
                null,
                null,
                1,
            ],
            [
                "descriptor alias reaching setter mutation",
                `const fs=require("node:fs"); function local() {} const descriptor={value:fs.readFileSync}; const alias=descriptor; alias.set=local; Reflect.defineProperty(fs,"readFileSync",descriptor); fs.readFileSync("descriptor-set.txt");`,
                null,
                null,
                1,
            ],
            [
                "descriptor installation snapshots future mutation",
                `const fs=require("node:fs"); function local() {} const descriptor={value:fs.readFileSync}; Object.defineProperty(fs,"readFileSync",descriptor); descriptor.value=local; fs.readFileSync("descriptor-future.txt");`,
                "readFileSync",
                "descriptor-future.txt",
                0,
            ],
            [
                "descriptor exact wrong-member value",
                `const fs=require("node:fs"); const descriptor={value:fs.readFileSync}; descriptor.value=fs.writeFileSync; Object.defineProperty(fs,"readFileSync",descriptor); fs.readFileSync("descriptor-member.txt","content");`,
                "writeFileSync",
                "descriptor-member.txt",
                0,
            ],
            [
                "descriptor property expression",
                `const fs=require("node:fs"); const holder={descriptor:{value:fs.readFileSync}}; Object.defineProperty(fs,"readFileSync",holder.descriptor); fs.readFileSync("descriptor-property.txt");`,
                "readFileSync",
                "descriptor-property.txt",
                0,
            ],
            [
                "descriptor element expression",
                `const fs=require("node:fs"); const holder={descriptor:{value:fs.readFileSync}}; Reflect.defineProperty(fs,"readFileSync",holder["descriptor"]); fs.readFileSync("descriptor-element.txt");`,
                "readFileSync",
                "descriptor-element.txt",
                0,
            ],
            [
                "descriptor array expression",
                `const fs=require("node:fs"); const holder=[{value:fs.readFileSync}]; Object.defineProperty(fs,"readFileSync",holder[0]); fs.readFileSync("descriptor-array.txt");`,
                "readFileSync",
                "descriptor-array.txt",
                0,
            ],
            [
                "captured descriptor survives slot replacement",
                `const fs=require("node:fs"); function local() {} const holder={descriptor:{value:fs.readFileSync}}; const descriptor=holder.descriptor; holder.descriptor={value:local}; Object.defineProperty(fs,"readFileSync",descriptor); fs.readFileSync("descriptor-captured-slot.txt");`,
                "readFileSync",
                "descriptor-captured-slot.txt",
                0,
            ],
            [
                "shared descriptor identity",
                `const fs=require("node:fs"); function local() {} const descriptor={value:fs.readFileSync}; const wrapper={descriptor}; wrapper.descriptor.value=local; Object.defineProperty(fs,"readFileSync",descriptor); fs.readFileSync("descriptor-shared.txt");`,
                null,
                null,
                1,
            ],
            [
                "descriptor possible then definite restore",
                `const fs=require("node:fs"); function local() {} const descriptor={value:fs.readFileSync}; if(flag) descriptor.value=local; descriptor.value=fs.readFileSync; Object.defineProperty(fs,"readFileSync",descriptor); fs.readFileSync("descriptor-possible-restore.txt");`,
                "readFileSync",
                "descriptor-possible-restore.txt",
                0,
            ],
            [
                "descriptor definite then possible replacement",
                `const fs=require("node:fs"); function local() {} const descriptor={value:fs.readFileSync}; descriptor.value=fs.readFileSync; if(flag) descriptor.value=local; Object.defineProperty(fs,"readFileSync",descriptor); fs.readFileSync("descriptor-possible-last.txt");`,
                null,
                null,
                1,
            ],
        ] as const) {
            const fixture = extractScriptReferences(source);
            const result = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(
                result.operations.map(({ operation: actual, target: actualTarget }) => ({
                    operation: actual,
                    target: actualTarget,
                })),
                label,
            ).toEqual(operation ? [{ operation, target }] : []);
            expect(result.unmodeled, label).toHaveLength(unmodeled);
        }

        for (const [label, source, operation, target, unmodeled] of [
            [
                "copied fs member snapshots its source",
                `const fs=require("node:fs"); function local() {} fs.readFileSync=fs.writeFileSync; fs.writeFileSync=local; fs.readFileSync("copied-fs.txt","content");`,
                "writeFileSync",
                "copied-fs.txt",
                0,
            ],
            [
                "later copied fs destination write supersedes",
                `const fs=require("node:fs"); function local() {} fs.readFileSync=fs.writeFileSync; fs.writeFileSync=local; fs.readFileSync=local; fs.readFileSync("copied-fs-destination.txt");`,
                null,
                null,
                1,
            ],
            [
                "conditional local write then definite original restore",
                `const fs=require("node:fs"); function local() {} const original=fs.readFileSync; if(flag) fs.readFileSync=local; fs.readFileSync=original; fs.readFileSync("conditional-restore.txt");`,
                "readFileSync",
                "conditional-restore.txt",
                0,
            ],
            [
                "process p mutation direct restore q use",
                `const fs=require("node:fs"); const original=process.cwd; function local() { return "local"; } const p=process; const q=p; p.cwd=local; process.cwd=original; fs.readdirSync(q.cwd());`,
                "readdirSync",
                ".",
                0,
            ],
            [
                "process q mutation direct restore p use",
                `const fs=require("node:fs"); const original=process.cwd; function local() { return "local"; } const p=process; const q=p; q.cwd=local; process.cwd=original; fs.readdirSync(p.cwd());`,
                "readdirSync",
                ".",
                0,
            ],
            [
                "process copied member survives namespace restoration",
                `const fs=require("node:fs"); const original=process.cwd; function local() { return "local"; } const p=process; const copied=p.cwd; p.cwd=local; process.cwd=original; fs.readdirSync(copied());`,
                "readdirSync",
                ".",
                0,
            ],
            [
                "process conditional direct restore stays conservative",
                `const fs=require("node:fs"); const original=process.cwd; function local() { return "local"; } const p=process; p.cwd=local; if(flag) process.cwd=original; fs.readdirSync(p.cwd());`,
                null,
                null,
                1,
            ],
            [
                "process cross-function alias mutation stays sticky",
                `const fs=require("node:fs"); const original=process.cwd; function local() { return "local"; } const p=process; function mutate() { p.cwd=local; } process.cwd=original; mutate(); fs.readdirSync(p.cwd());`,
                null,
                null,
                1,
            ],
        ] as const) {
            const fixture = extractScriptReferences(source);
            const result = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(
                result.operations.map(({ operation: actual, target: actualTarget }) => ({
                    operation: actual,
                    target: actualTarget,
                })),
                label,
            ).toEqual(operation ? [{ operation, target }] : []);
            expect(result.unmodeled, label).toHaveLength(unmodeled);
        }

        for (const [label, source, expectedApis] of [
            [
                "copied child-process member snapshots its source",
                `const child=require("node:child_process"); function local() {} child.spawnSync=child.execFileSync; child.execFileSync=local; child.spawnSync("node",["./copied-child.mjs"]);`,
                ["execFileSync"],
            ],
            [
                "later copied child-process destination write supersedes",
                `const child=require("node:child_process"); function local() {} child.spawnSync=child.execFileSync; child.execFileSync=local; child.spawnSync=local; child.spawnSync("node",["./copied-child.mjs"]);`,
                ["execFileSync", "spawnSync"],
            ],
            [
                "shared child-process carrier forward",
                `const child=require("node:child_process"); const holder={run:child.spawnSync}; const wrapper={holder}; wrapper.holder.run=child.execFileSync; holder.run("node",["./shared-child-forward.mjs"]);`,
                ["execFileSync"],
            ],
            [
                "shared child-process carrier reverse",
                `const child=require("node:child_process"); const holder={run:child.spawnSync}; const wrapper={holder}; holder.run=child.execFileSync; wrapper.holder.run("node",["./shared-child-reverse.mjs"]);`,
                ["execFileSync"],
            ],
        ] as const) {
            const fixture = extractScriptReferences(source);
            expect(
                extractProcessInvocations(
                    fixture.sourceFile,
                    "fixture.ts",
                    root,
                    null,
                    {},
                    new Map(),
                    fixture.bindingResolver,
                ).map(({ api }) => api),
                label,
            ).toEqual(expectedApis);
        }

        const lexicalScopeCases = [
            [
                "for lexical import shadow",
                `import { readFileSync } from "node:fs";
                 for (const readFileSync of [local]) readFileSync("loop-local.txt");
                 readFileSync("loop-real.txt");`,
                "loop-real.txt",
            ],
            [
                "for-in lexical import shadow",
                `import { readFileSync } from "node:fs";
                 for (const readFileSync in { local: true }) void readFileSync;
                 readFileSync("for-in-real.txt");`,
                "for-in-real.txt",
            ],
            [
                "for-of lexical import shadow",
                `import { readFileSync } from "node:fs";
                 for (const readFileSync of [local]) void readFileSync;
                 readFileSync("for-of-real.txt");`,
                "for-of-real.txt",
            ],
            [
                "switch lexical import shadow",
                `import { readFileSync } from "node:fs";
                 switch (flag) { case true: const readFileSync = local; void readFileSync; break; }
                 readFileSync("switch-real.txt");`,
                "switch-real.txt",
            ],
            [
                "named class expression self name",
                `import { readFileSync } from "node:fs";
                 const C = class readFileSync { method() { return readFileSync; } };
                 readFileSync("class-real.txt");`,
                "class-real.txt",
            ],
        ] as const;
        for (const [label, source, target] of lexicalScopeCases) {
            const fixture = extractScriptReferences(source);
            const operations = extractFileOperations(
                fixture.sourceFile,
                "fixture.ts",
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(operations.operations, label).toEqual([
                expect.objectContaining({ operation: "readFileSync", target }),
            ]);
            expect(operations.unmodeled, label).toEqual([]);
        }
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

    it("projects the package lock under the package owner and its exact reader", () => {
        const lockNodes = graph.nodes.filter(({ path }) => path === "package-lock.json");
        expect(lockNodes).toHaveLength(1);
        expect(lockNodes[0]).toMatchObject({
            projection: "repository-boundary",
            owner: "package/main",
            nodeKind: "repository-file",
            virtual: false,
        });

        const lockReads = graph.internalEdges.filter(
            ({ source, target, edgeKind, boundary, metadata }) =>
                source === "tests/public-surface.spec.ts" &&
                target === "package-lock.json" &&
                edgeKind === "file-read" &&
                boundary === "repository-boundary" &&
                metadata?.operation === "readFileSync",
        );
        expect(lockReads).toHaveLength(2);

        const verifierLockReads = graph.internalEdges.filter(
            ({ source, target, specifier, edgeKind, boundary }) =>
                source === "scripts/verify-export-types.mjs" &&
                target === "package-lock.json" &&
                specifier === "../package-lock.json" &&
                edgeKind === "new-url" &&
                boundary === "repository-boundary",
        );
        expect(verifierLockReads).toHaveLength(1);
        expect(verifierLockReads[0]).toMatchObject({
            source: "scripts/verify-export-types.mjs",
            target: "package-lock.json",
            specifier: "../package-lock.json",
            edgeKind: "new-url",
            boundary: "repository-boundary",
            line: 744,
            column: 19,
        });

        const styleVerifierEdge = graph.internalEdges.find(
            ({ source, target, edgeKind, metadata }) =>
                source === "vite.style-assets.ts" &&
                target === "scripts/verify-export-types.mjs" &&
                edgeKind === "eager-runtime" &&
                metadata?.symbols?.some(
                    ({ name, local, typeOnly }) =>
                        name === "verifyExportTypes" &&
                        local === "verifyExportTypes" &&
                        typeOnly === false,
                ),
        );
        expect(styleVerifierEdge).toBeDefined();
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
        const checkInvocation = invocations.find(
            ({ api, argv }) =>
                api === "spawnSync" &&
                argv[0]?.target ===
                    "docs/tranches/BJ/audits/2026-07-28-library-dag/build-import-dag-v3.mjs" &&
                argv.at(-1)?.value === "--check",
        );
        expect(checkInvocation?.argv).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    target:
                        "docs/tranches/BJ/audits/2026-07-28-library-dag/build-import-dag-v3.mjs",
                    dynamic: false,
                }),
                expect.objectContaining({ value: "--check", target: null, dynamic: false }),
            ]),
        );
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

        for (const sourcePath of [
            "docs/tranches/AZ/audit/ground/F2-harness.mjs",
            "docs/tranches/AZ/audit/ground/F2-r3-3-morph.mjs",
            "docs/tranches/AZ/audit/ground/F2-r3-3-morph2.mjs",
            "docs/tranches/AZ/audit/ground/F2-r3-3-morph3.mjs",
            "docs/tranches/AZ/audit/ground/F2-r3-3-morph4.mjs",
            "docs/tranches/AZ/audit/ground/F2-r3-3-morph5.mjs",
            "docs/tranches/AZ/audit/ground/F2-r3-3-morph6.mjs",
            "docs/tranches/AZ/audit/ground/F2-r3-7-data.mjs",
        ]) {
            const fixture = extractScriptReferences(
                readFileSync(resolve(root, sourcePath), "utf8"),
                sourcePath,
                null,
                {},
                { repositoryRoot: root },
            );
            const operations = extractFileOperations(
                fixture.sourceFile,
                sourcePath,
                root,
                null,
                new Map(),
                fixture.bindingResolver,
            );
            expect(operations.unmodeled, sourcePath).toEqual([]);
            expect(operations.operations, sourcePath).toEqual([
                expect.objectContaining({ edgeKind: "generator-write", operation: "writeFile" }),
            ]);
            expect(operations.operations[0].target).toMatch(/F2-r3-3-morph-trace\.json|F2-r3-7-probe\.json$/);
        }
        const templatePath = extractScriptReferences(
            `import { writeFile } from "node:fs/promises"; const dir = "artifacts"; writeFile(\`${"${dir}"}/out.json\`, "{}");`,
            "fixture.mjs",
            null,
            {},
            { repositoryRoot: root },
        );
        const templateOperations = extractFileOperations(
            templatePath.sourceFile,
            "fixture.mjs",
            root,
            null,
            new Map(),
            templatePath.bindingResolver,
        );
        expect(templateOperations.operations).toEqual([
            expect.objectContaining({ operation: "writeFile", target: "artifacts/out.json" }),
        ]);
        expect(templateOperations.unmodeled).toEqual([]);

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
        for (const [source, target, edgeKind, operation] of [
            ["vite.style-fold.ts", "dist/styles/index.css", "generator-read", "readFileSync"],
            ["vite.style-fold.ts", "dist/styles/index.css", "generator-write", "writeFileSync"],
            ["vite.style-fold.ts", "dist/glass-ui.css", "generator-read", "readFileSync"],
            ["vite.style-fold.ts", "dist/glass-ui.css", "generator-write", "writeFileSync"],
            ["vite.utility-emit.ts", "dist", "generator-read", "readdirSync"],
            ["vite.utility-emit.ts", "src/styles", "generator-read", "readdirSync"],
            ["vite.utility-emit.ts", "dist/styles/components.css", "generator-write", "writeFileSync"],
        ] as const) {
            expect(generatorEdge(source, target, edgeKind, operation)).toBeUndefined();
        }
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

        expect(graph.summary.nodes).toBe(1499);
        expect(graph.summary.internalEdges).toBe(3594);
        expect(graph.summary.externalEdges).toBe(1983);
        expect(graph.summary.dynamicModuleReferences).toBe(1);
        expect(graph.summary.edgeKindCounts["generator-read"]).toBe(8);
        expect(graph.summary.edgeKindCounts["generator-write"]).toBe(7);
        // The failure-safe harness deliberately accounts for generator-child process.kill cleanup; this is not product drift.
        expect(graph.summary.unmodeledFileOperations).toBe(454);
        expect(graph.summary.processInvocations).toBe(18);
        expect(graph.summary.dynamicProcessArguments).toBe(29);
        expect(graph.summary.nodeKindCounts["generated-by-write"]).toBe(4);
        expect(graph.summary.nodeKindCounts["missing-runtime-placeholder"]).toBe(8);

        const verifierPath = "scripts/verify-export-types.mjs";
        expect(graph.nodes.find(({ path }) => path === verifierPath)).toMatchObject({
            sha256: "d079efd2a1716af62070a3196e83bcd1346a935e72378165c4584bb68719699b",
        });
        const installedPencilPackageRead = graph.unmodeledFileOperations.filter(
            ({ source, operation, line, column }) =>
                source === verifierPath &&
                operation === "readFileSync" &&
                line === 597 &&
                column === 42,
        );
        expect(installedPencilPackageRead).toEqual([
            {
                source: verifierPath,
                operation: "readFileSync",
                line: 597,
                column: 42,
            },
        ]);
        const callerManifestTar = graph.processInvocations.filter(
            ({ source, api, line, column }) =>
                source === verifierPath &&
                api === "spawnSync" &&
                line === 446 &&
                column === 26,
        );
        expect(callerManifestTar).toEqual([
            {
                source: verifierPath,
                line: 446,
                column: 26,
                api: "spawnSync",
                binding: "spawnSync",
                command: {
                    index: 0,
                    value: "tar",
                    target: null,
                    expression: '"tar"',
                    dynamic: false,
                },
                argv: [
                    {
                        index: 0,
                        value: "-xOzf",
                        target: null,
                        expression: '"-xOzf"',
                        dynamic: false,
                    },
                    {
                        index: 1,
                        value: null,
                        target: null,
                        expression: "path",
                        dynamic: true,
                    },
                    {
                        index: 2,
                        value: "package/package.json",
                        target: "package/package.json",
                        expression: '"package/package.json"',
                        dynamic: false,
                    },
                ],
                dynamicArguments: 1,
            },
        ]);
        expect(
            graph.internalEdges.find(
                (edge) =>
                    edge.source === "vite.style-fold.ts" &&
                    edge.target === "." &&
                    edge.edgeKind === "generator-read" &&
                    edge.metadata?.operation === "readdirSync",
            ),
        ).toBeUndefined();

        expect(graph.nodes.find(({ path }) => path === "dist")).toBeUndefined();
        for (const path of ["dist/components", "dist/fonts", "dist/styles"]) {
            expect(graph.nodes.find((node) => node.path === path)).toMatchObject({
                nodeType: "directory",
                nodeKind: "generated-by-write",
            });
        }
        for (const path of ["src/components", "src/fonts", "src/styles"]) {
            expect(graph.nodes.find((node) => node.path === path)).toMatchObject({
                nodeType: "directory",
                nodeKind: "directory",
            });
        }
        expect(graph.nodes.find(({ path }) => path === "dist/styles/index.css")).toMatchObject({
            nodeType: "package-output",
            nodeKind: "declared-package-output",
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

        const fixturePath = "tests/architecture/__graph-v3-sfc-location.vue";
        await withContractFixture(
            "",
            async (fixture) => {
                const fixtureGraph = await buildGraph({
                    repositoryRoot: fixture.temporaryDirectory,
                    outputDirectory: fixture.outputDirectory,
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
            },
            null,
            {
                [fixturePath]: `<script lang="ts">
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
                "src/components/button/index.ts": "export type ButtonProps = {};\n",
                "src/components/card/index.ts": "export const Card = {};\n",
                "tests-visual/fixtures/starry-night-crop.png": "fixture-image\n",
            },
        );
    }, 15_000);

    it("propagates complete SFC identity to edges and applicable ledgers", async () => {
        const externalFixture = "tests/architecture/__graph-v3-sfc-external.vue";
        const externalScript = "tests/architecture/__graph-v3-sfc-external.ts";
        const externalTemplate = "tests/architecture/__graph-v3-sfc-external.html";
        const externalStyle = "tests/architecture/__graph-v3-sfc-external.css";
        const inlineFixture = "tests/architecture/__graph-v3-sfc-inline.vue";
        const malformedFixture = "tests/architecture/__graph-v3-sfc-malformed.vue";
        await withContractFixture(
            "",
            async (fixture) => {
                const fixtureGraph = await buildGraph({
                    repositoryRoot: fixture.temporaryDirectory,
                    outputDirectory: fixture.outputDirectory,
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
            },
            null,
            {
                [externalFixture]: `<script src="./__graph-v3-sfc-external.ts"></script>
<template src="./__graph-v3-sfc-external.html"></template>
<style src="./__graph-v3-sfc-external.css" scoped module lang="CSS"></style>
`,
                [externalScript]: "export const external = true;\n",
                [externalTemplate]: "<div>external</div>\n",
                [externalStyle]: ".external { color: red; }\n",
                "src/styles/index.css": ".fixture { color: red; }\n",
                "tests-visual/fixtures/starry-night-crop.png": "fixture-image\n",
                [inlineFixture]: `<script setup lang="TS">
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
                [malformedFixture]: `<script setup lang="TS">
const broken: = {;
</script>
`,
            },
        );
    }, 15_000);

    it("keeps ignored build, cache, and screenshot overlays out of graph identity", async () => {
        const fixturePath = "tests-visual/__graph-v3-worktree.spec.ts";
        const ignoredDocsPath = "docs/tranches/BJ/audits/2026-07-28-library-dag/__graph-v3-ignored.png";
        await withContractFixture(
            "",
            async (fixture) => {
            const clean = await buildGraph({
                repositoryRoot: fixture.temporaryDirectory,
                outputDirectory: fixture.outputDirectory,
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
                    "tests-visual/__graph-v3-ignored.png",
                    "ignored visual bytes",
                ],
                [ignoredDocsPath, "ignored docs screenshot bytes"],
                [
                    "tests-visual/.cache/__graph-v3.json",
                    '{"ignored":true}\n',
                ],
                [
                    "tests-visual/test-results/__graph-v3.json",
                    '{"ignored":true}\n',
                ],
            ] as const) {
                const target = resolve(fixture.temporaryDirectory, path);
                mkdirSync(dirname(target), { recursive: true });
                writeFileSync(target, bytes);
            }

            const overlaid = await buildGraph({
                repositoryRoot: fixture.temporaryDirectory,
                outputDirectory: fixture.outputDirectory,
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
            for (const path of [
                "dist/component-styles.css",
                "dist/styles/index.css",
                "dist/glass-ui.js",
                "dist-demo/index.html",
                "tests-visual/__graph-v3-ignored.png",
                "tests-visual/.cache/__graph-v3.json",
                "tests-visual/test-results/__graph-v3.json",
            ]) {
                expect(overlaid.nodes.some((node) => node.path === path)).toBe(false);
            }
            },
            null,
            {
                [fixturePath]: `new URL("../${ignoredDocsPath}", import.meta.url);\n`,
            },
        );
    }, 15_000);

    it("ships clean, joinable projections and a current deterministic receipt", async () => {
        expect(graph.schema).toBe("glass-ui-import-dag/3");
        expect(graph.summary).toMatchObject({
            nodes: 1499,
            internalEdges: 3594,
            externalEdges: 1983,
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
        expect(graph.receiptSha256).toBeDefined();
    });

    async function runMutationStressPhase(phase: 1 | 2 | 3) {
        const lockDirectoryFor = (directory: string) =>
            resolve(directory, ".IMPORT-DAG-V3.lock");
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
                expected: /publicSourceOwnerMismatches|owner manifest does not assign/i,
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
        const seedLock = (directory: string, contents: string | null) => {
            const lockDirectory = lockDirectoryFor(directory);
            rmSync(lockDirectory, { recursive: true, force: true });
            mkdirSync(lockDirectory);
            if (contents !== null) {
                writeFileSync(join(lockDirectory, "owner.test.json"), contents);
            }
        };
        const activeGenerators = new Set<ReturnType<typeof generatorProcess>>();
        const startGenerator = (...args: Parameters<typeof generatorProcess>) => {
            const generator = generatorProcess(...args);
            activeGenerators.add(generator);
            return generator;
        };
        const finishTracked = async (generator: ReturnType<typeof generatorProcess>) => {
            try {
                return await finishGenerator(generator);
            } finally {
                activeGenerators.delete(generator);
            }
        };

        try {
        await withContractFixture(baselineStyleAssets, async (fixture) => {
            const tamperDirectory = fixture.outputDirectory;
            const fixtureRoot = fixture.temporaryDirectory;
            expect(runGenerate(tamperDirectory, {}, fixtureRoot).status).toBe(0);
            const canonicalBytes = new Map(
                ["OWNER-MANIFEST.json", "IMPORT-DAG-V3.json", "IMPORT-DAG-V3-SUMMARY.md"].map(
                    (name) => [name, readFileSync(resolve(tamperDirectory, name))] as const,
                ),
            );
            const beforeJson = readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3.json"));
            const beforeSummary = readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3-SUMMARY.md"));
            if (phase === 1) {
            for (const lockContents of [null, "{\"pid\":"] as const) {
                const lockPath = lockDirectoryFor(tamperDirectory);
                seedLock(tamperDirectory, lockContents);
                const generated = runGenerate(tamperDirectory, {}, fixtureRoot);
                const checked = runCheck(tamperDirectory, fixtureRoot);
                expect(generated.status).not.toBe(0);
                expect(generated.stderr).toMatch(/active or indeterminate/i);
                expect(checked.status).not.toBe(0);
                expect(checked.stderr).toMatch(/active or indeterminate/i);
                expect(existsSync(lockPath)).toBe(true);
                for (const [name, bytes] of canonicalBytes) {
                    expect(readFileSync(resolve(tamperDirectory, name))).toEqual(bytes);
                }
                rmSync(lockPath, { recursive: true, force: true });
            }
            for (const { expected, mutate } of mutations) {
                mutate(tamperDirectory);
                const result = runCheck(tamperDirectory, fixtureRoot);
                expect(result.status).not.toBe(0);
                expect(result.stderr).toMatch(expected);
                for (const [name, bytes] of canonicalBytes) {
                    writeFileSync(resolve(tamperDirectory, name), bytes);
                }
            }
            for (const [name, before] of [
                ["IMPORT-DAG-V3.json", beforeJson],
                ["IMPORT-DAG-V3-SUMMARY.md", beforeSummary],
            ] as const) {
                const artifactPath = resolve(tamperDirectory, name);
                const linkTarget = resolve(tamperDirectory, `${name}.link-target`);
                writeFileSync(linkTarget, before);
                rmSync(artifactPath);
                symlinkSync(linkTarget, artifactPath);
                const symlinkRejected = runGenerate(tamperDirectory, {}, fixtureRoot);
                expect(symlinkRejected.status).not.toBe(0);
                expect(symlinkRejected.stdout).not.toMatch(/receiptSha256=/);
                for (const [canonicalName, bytes] of canonicalBytes) {
                    expect(readFileSync(resolve(tamperDirectory, canonicalName))).toEqual(bytes);
                }
                const symlinkCheck = runCheck(tamperDirectory, fixtureRoot);
                expect(symlinkCheck.status).not.toBe(0);
                expect(symlinkCheck.stderr).toMatch(/symbolic|regular file/i);
                expectNoArtifactResidue(tamperDirectory);
                rmSync(artifactPath);
                writeFileSync(artifactPath, before);
                rmSync(linkTarget);
                expect(runCheck(tamperDirectory, fixtureRoot).status).toBe(0);
            }
            const failed = runGenerate(tamperDirectory, {
                GRAPH_V3_TEST_FAIL_SECOND_TEMP_WRITE: "1",
            }, fixtureRoot);
            expect(failed.status).not.toBe(0);
            expect(readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3.json"))).toEqual(beforeJson);
            expect(readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3-SUMMARY.md"))).toEqual(beforeSummary);
            expectNoArtifactResidue(tamperDirectory);
            const preStateFailed = runGenerate(tamperDirectory, {
                GRAPH_V3_TEST_MUTATE_FIRST_TEMP_BEFORE_STATE: "1",
            }, fixtureRoot);
            expect(preStateFailed.status).not.toBe(0);
            expect(preStateFailed.stdout).not.toMatch(/receiptSha256=/);
            expect(preStateFailed.stderr).toMatch(/temporary.*(bytes changed|changed|replaced)/i);
            expect(readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3.json"))).toEqual(beforeJson);
            expect(readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3-SUMMARY.md"))).toEqual(beforeSummary);
            expectNoArtifactResidue(tamperDirectory);
            }
            if (phase === 1) return;

            if (phase === 2) {

            writeFileSync(
                fixture.styleAssetsPath,
                `${baselineStyleAssets}\nexport const publicationFailureProbe = true;\n`,
            );
            for (const [label, environment, errorText] of [
                [
                    "falsy post-summary failure",
                    { GRAPH_V3_TEST_THROW_AFTER_SUMMARY_FAILURE: "falsy" },
                    /publication threw 0/,
                ],
                [
                    "truthy post-summary failure",
                    { GRAPH_V3_TEST_THROW_AFTER_SUMMARY_FAILURE: "truthy" },
                    /injected post-summary primitive/,
                ],
                [
                    "primary error with null cleanup failure",
                    {
                        GRAPH_V3_TEST_THROW_AFTER_SUMMARY_FAILURE: "error",
                        GRAPH_V3_TEST_THROW_NULL_CLEANUP: "1",
                    },
                    /injected post-summary primary failure/,
                ],
                [
                    "hostile post-summary failure",
                    { GRAPH_V3_TEST_THROW_AFTER_SUMMARY_FAILURE: "hostile" },
                    /publication failed/,
                ],
                [
                    "revoked post-summary failure",
                    { GRAPH_V3_TEST_THROW_AFTER_SUMMARY_FAILURE: "revoked" },
                    /publication failed/,
                ],
            ] as const) {
                writeFileSync(
                    fixture.styleAssetsPath,
                    `${baselineStyleAssets}\nexport const publicationFailureProbe = true;\n`,
                );
                const failed = runGenerate(tamperDirectory, environment, fixtureRoot);
                expect(failed.status, label).not.toBe(0);
                expect(failed.stdout, label).not.toMatch(/receiptSha256=/);
                expect(failed.stderr, label).toMatch(errorText);
                expect(existsSync(lockDirectoryFor(tamperDirectory)), label).toBe(true);
                expect(readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3.json")), label).toEqual(beforeJson);
                expect(readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3-SUMMARY.md")), label).not.toEqual(beforeSummary);
                rmSync(lockDirectoryFor(tamperDirectory), { recursive: true, force: true });
                writeFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3.json"), beforeJson);
                writeFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3-SUMMARY.md"), beforeSummary);
                writeFileSync(fixture.styleAssetsPath, baselineStyleAssets);
                expect(runCheck(tamperDirectory, fixtureRoot).status, label).toBe(0);
                expectNoArtifactResidue(tamperDirectory);
            }
            writeFileSync(fixture.styleAssetsPath, baselineStyleAssets);

            for (const suffix of [".json.tmp", ".summary.tmp"] as const) {
                const tempWriter = startGenerator(tamperDirectory, {
                    GRAPH_V3_TEST_PAUSE_BEFORE_PUBLICATION_MS: suffix === ".summary.tmp" ? "8000" : "1000",
                }, fixtureRoot);
                await waitForPublicationReady(tamperDirectory);
                const tempName = readdirSync(tamperDirectory).find((name) => name.endsWith(suffix));
                expect(tempName).toBeDefined();
                const tempPath = resolve(tamperDirectory, tempName!);
                const tamperedBytes = Buffer.concat([
                    readFileSync(tempPath),
                    Buffer.from("\nIN-PLACE-TAMPER\n"),
                ]);
                writeFileSync(tempPath, tamperedBytes);
                const rewrite = setInterval(() => {
                    if (existsSync(tempPath)) writeFileSync(tempPath, tamperedBytes);
                }, 5);
                const tampered = await finishTracked(tempWriter);
                clearInterval(rewrite);
                expect(tampered.status, suffix).not.toBe(0);
                expect(tampered.stdout).not.toMatch(/receiptSha256=/);
                expect(tampered.stderr).toMatch(/temporary.*changed|temporary.*replaced/i);
                expect(readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3.json"))).toEqual(beforeJson);
                expect(readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3-SUMMARY.md"))).toEqual(beforeSummary);
                expectNoArtifactResidue(tamperDirectory);
            }

            const releaseFailed = runGenerate(tamperDirectory, {
                GRAPH_V3_TEST_FAIL_RELEASE: "1",
            }, fixtureRoot);
            expect(releaseFailed.status).not.toBe(0);
            expect(releaseFailed.stdout).not.toMatch(/receiptSha256=/);
            expect(existsSync(lockDirectoryFor(tamperDirectory))).toBe(true);
            expect(
                readdirSync(tamperDirectory).filter(
                    (name) => name.startsWith(".IMPORT-DAG-V3.") && name.endsWith(".tmp"),
                ),
            ).toEqual([]);
            rmSync(lockDirectoryFor(tamperDirectory), { recursive: true, force: true });
            expect(runCheck(tamperDirectory, fixtureRoot).status).toBe(0);

            const seededLock = lockDirectoryFor(tamperDirectory);
            seedLock(
                tamperDirectory,
                `${JSON.stringify({ pid: process.pid, token: "test" })}\n`,
            );
            const lockedJson = readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3.json"));
            const lockedSummary = readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3-SUMMARY.md"));
            const generated = runGenerate(tamperDirectory, {}, fixtureRoot);
            expect(generated.status).not.toBe(0);
            expect(generated.stderr).toMatch(/publication lock is active/i);
            const lockedCheck = runCheck(tamperDirectory, fixtureRoot);
            expect(lockedCheck.status).not.toBe(0);
            expect(lockedCheck.stderr).toMatch(/publication lock is active/i);
            expect(readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3.json"))).toEqual(lockedJson);
            expect(readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3-SUMMARY.md"))).toEqual(lockedSummary);
            rmSync(seededLock, { recursive: true, force: true });
            expect(runCheck(tamperDirectory, fixtureRoot).status).toBe(0);
            expectNoArtifactResidue(tamperDirectory);

            const replaced = startGenerator(tamperDirectory, {
                GRAPH_V3_TEST_PAUSE_BEFORE_PUBLICATION_MS: "1000",
            }, fixtureRoot);
            const replacedLock = lockDirectoryFor(tamperDirectory);
            await waitForPublicationReady(tamperDirectory);
            const replacedJson = readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3.json"));
            const replacedSummary = readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3-SUMMARY.md"));
            rmSync(replacedLock, { recursive: true, force: true });
            mkdirSync(replacedLock);
            writeFileSync(
                join(replacedLock, "owner.replacement-token.json"),
                `${JSON.stringify({ pid: process.pid, token: "replacement-token" })}\n`,
            );
            const replacedResult = await finishTracked(replaced);
            expect(replacedResult.status).not.toBe(0);
            expect(replacedResult.signal).toBeNull();
            expect(replacedResult.stdout).not.toMatch(/receiptSha256=/);
            expect(replacedResult.stderr).toMatch(/replaced/i);
            expect(existsSync(join(replacedLock, "owner.replacement-token.json"))).toBe(true);
            expect(readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3.json"))).toEqual(replacedJson);
            expect(readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3-SUMMARY.md"))).toEqual(replacedSummary);
            rmSync(replacedLock, { recursive: true, force: true });

            const symlinked = startGenerator(tamperDirectory, {
                GRAPH_V3_TEST_PAUSE_BEFORE_PUBLICATION_MS: "1000",
            }, fixtureRoot);
            await waitForPublicationReady(tamperDirectory);
            const symlinkJson = readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3.json"));
            const symlinkSummary = readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3-SUMMARY.md"));
            const asideLock = `${replacedLock}.aside`;
            renameSync(replacedLock, asideLock);
            symlinkSync(asideLock, replacedLock);
            const symlinkedResult = await finishTracked(symlinked);
            expect(symlinkedResult.status).not.toBe(0);
            expect(symlinkedResult.stdout).not.toMatch(/receiptSha256=/);
            expect(symlinkedResult.stderr).toMatch(/symbolic|replaced/i);
            expect(readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3.json"))).toEqual(symlinkJson);
            expect(readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3-SUMMARY.md"))).toEqual(symlinkSummary);
            expect(existsSync(asideLock)).toBe(true);
            expect(existsSync(replacedLock)).toBe(true);
            rmSync(replacedLock, { force: true });
            rmSync(asideLock, { recursive: true, force: true });

                return;
            }

            const postSummaryJson = readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3.json"));
            const postSummaryText = readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3-SUMMARY.md"));
            writeFileSync(
                fixture.styleAssetsPath,
                `${baselineStyleAssets}\nexport const changedBeforeJson = true;\n`,
            );
            const postSummaryWriter = startGenerator(tamperDirectory, {
                GRAPH_V3_TEST_PAUSE_AFTER_SUMMARY_RENAME_MS: "600",
            }, fixtureRoot);
            await waitForSummaryRename(tamperDirectory, postSummaryText);
            const postSummaryTarget = resolve(tamperDirectory, "post-summary-json-target");
            writeFileSync(postSummaryTarget, postSummaryJson);
            rmSync(resolve(tamperDirectory, "IMPORT-DAG-V3.json"));
            symlinkSync(postSummaryTarget, resolve(tamperDirectory, "IMPORT-DAG-V3.json"));
            const postSummaryResult = await finishTracked(postSummaryWriter);
            expect(postSummaryResult.status).not.toBe(0);
            expect(postSummaryResult.stdout).not.toMatch(/receiptSha256=/);
            expect(postSummaryResult.stderr).toMatch(/symbolic|regular file|replaced/i);
            expect(existsSync(lockDirectoryFor(tamperDirectory))).toBe(true);
            expect(readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3.json"))).toEqual(postSummaryJson);
            expect(readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3-SUMMARY.md"))).not.toEqual(postSummaryText);
            rmSync(lockDirectoryFor(tamperDirectory), { recursive: true, force: true });
            rmSync(resolve(tamperDirectory, "IMPORT-DAG-V3.json"));
            writeFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3.json"), postSummaryJson);
            const tornPostSummary = runCheck(tamperDirectory, fixtureRoot);
            expect(tornPostSummary.status).not.toBe(0);
            expect(tornPostSummary.stderr).toMatch(/stored human summary differs|stored JSON payload differs/i);
            writeFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3-SUMMARY.md"), postSummaryText);
            rmSync(postSummaryTarget);
            writeFileSync(fixture.styleAssetsPath, baselineStyleAssets);
            expect(runCheck(tamperDirectory, fixtureRoot).status).toBe(0);
            expectNoArtifactResidue(tamperDirectory);

            const directoryReplacementJson = readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3.json"));
            const directoryReplacementSummary = readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3-SUMMARY.md"));
            writeFileSync(
                fixture.styleAssetsPath,
                `${baselineStyleAssets}\nexport const directoryReplacement = true;\n`,
            );
            const directoryReplacementWriter = startGenerator(tamperDirectory, {
                GRAPH_V3_TEST_PAUSE_AFTER_SUMMARY_RENAME_MS: "600",
            }, fixtureRoot);
            await waitForSummaryRename(tamperDirectory, directoryReplacementSummary);
            const directoryTempName = readdirSync(tamperDirectory).find((name) => name.endsWith(".json.tmp"));
            expect(directoryTempName).toBeDefined();
            const directoryTempPath = resolve(tamperDirectory, directoryTempName!);
            rmSync(directoryTempPath);
            mkdirSync(directoryTempPath);
            const directoryReplacementResult = await finishTracked(directoryReplacementWriter);
            expect(directoryReplacementResult.status).not.toBe(0);
            expect(directoryReplacementResult.stdout).not.toMatch(/receiptSha256=/);
            expect(directoryReplacementResult.stderr).toMatch(/temporary.*(changed|replaced)|directory/i);
            expect(existsSync(lockDirectoryFor(tamperDirectory))).toBe(true);
            expect(readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3.json"))).toEqual(directoryReplacementJson);
            expect(readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3-SUMMARY.md"))).not.toEqual(directoryReplacementSummary);
            rmSync(lockDirectoryFor(tamperDirectory), { recursive: true, force: true });
            rmSync(directoryTempPath, { recursive: true, force: true });
            writeFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3.json"), directoryReplacementJson);
            writeFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3-SUMMARY.md"), directoryReplacementSummary);
            writeFileSync(fixture.styleAssetsPath, baselineStyleAssets);
            expect(runCheck(tamperDirectory, fixtureRoot).status).toBe(0);
            expectNoArtifactResidue(tamperDirectory);

            const killedJson = readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3.json"));
            const killedSummary = readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3-SUMMARY.md"));
            writeFileSync(
                fixture.styleAssetsPath,
                `${baselineStyleAssets}\nexport const changedFixture = true;\n`,
            );
            const writer = startGenerator(tamperDirectory, {
                GRAPH_V3_TEST_PAUSE_AFTER_SUMMARY_RENAME_MS: "5000",
            }, fixtureRoot);
            await waitForSummaryRename(tamperDirectory, killedSummary);
            process.kill(writer.child.pid!, "SIGKILL");
            const killedResult = await finishTracked(writer);
            expect(killedResult.signal).toBe("SIGKILL");
            expect(readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3.json"))).toEqual(killedJson);
            expect(readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3-SUMMARY.md"))).not.toEqual(killedSummary);
            expect(
                readdirSync(tamperDirectory).filter(
                    (name) => name.startsWith(".IMPORT-DAG-V3.") && name.endsWith(".json.tmp"),
                ),
            ).toHaveLength(1);
            const stale = runGenerate(tamperDirectory, {}, fixtureRoot);
            expect(stale.status).not.toBe(0);
            expect(stale.stdout).not.toMatch(/receiptSha256=/);
            expect(stale.stderr).toMatch(/publication lock is stale/i);
            expect(existsSync(lockDirectoryFor(tamperDirectory))).toBe(true);
            expect(
                readdirSync(tamperDirectory).some(
                    (name) => name.startsWith(".IMPORT-DAG-V3.") && name.endsWith(".tmp"),
                ),
            ).toBe(true);
            expect(readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3.json"))).toEqual(killedJson);
            expect(readFileSync(resolve(tamperDirectory, "IMPORT-DAG-V3-SUMMARY.md"))).not.toEqual(killedSummary);
            rmSync(lockDirectoryFor(tamperDirectory), { recursive: true, force: true });
            const torn = runCheck(tamperDirectory, fixtureRoot);
            expect(torn.status).not.toBe(0);
            expect(torn.stderr).toMatch(/stored human summary differs|stored JSON payload differs/i);
            writeFileSync(resolve(tamperDirectory, ".IMPORT-DAG-V3.orphan.tmp"), "orphan\n");
            expect(runGenerate(tamperDirectory, {}, fixtureRoot).status).toBe(0);
            expect(runCheck(tamperDirectory, fixtureRoot).status).toBe(0);
            expectNoArtifactResidue(tamperDirectory);

            const summaryPath = resolve(tamperDirectory, "IMPORT-DAG-V3-SUMMARY.md");
            const summary = readFileSync(summaryPath, "utf8");
            writeFileSync(summaryPath, `${summary}\nTorn pair\n`);
            const result = runCheck(tamperDirectory, fixtureRoot);
            expect(result.status).not.toBe(0);
            expect(result.stderr).toMatch(/stored human summary differs/i);
            writeFileSync(summaryPath, summary);
            expect(runCheck(tamperDirectory, fixtureRoot).status).toBe(0);
            expectNoArtifactResidue(tamperDirectory);
        });
        } finally {
            const remaining = [...activeGenerators];
            for (const generator of remaining) {
                if (generator.child.exitCode === null && generator.child.signalCode === null) {
                    process.kill(generator.child.pid!, "SIGKILL");
                }
            }
            for (const generator of remaining) {
                await finishTracked(generator);
            }
            activeGenerators.clear();
        }
    }

    it("fails --check for tampered node payloads, public owners, and summaries: phase 1", async () => {
        await runMutationStressPhase(1);
    }, 30_000);

    it("fails --check for tampered node payloads, public owners, and summaries: phase 2", async () => {
        await runMutationStressPhase(2);
    }, 30_000);

    it("fails --check for tampered node payloads, public owners, and summaries: phase 3", async () => {
        await runMutationStressPhase(3);
    }, 30_000);

    it("executes rather than silently no-oping when invoked through a symlink", () => {
        const temporaryDirectory = mkdtempSync(join(tmpdir(), "glass-graph-v3-cli-"));
        const alias = join(temporaryDirectory, "graph-v3.mjs");
        const outputDirectory = join(temporaryDirectory, "output");
        try {
            mkdirSync(outputDirectory);
            symlinkSync(resolve(audit, "build-import-dag-v3.mjs"), alias);
            const result = spawnSync(
                process.execPath,
                [
                    alias,
                    "--repository-root",
                    join(temporaryDirectory, "missing-repository"),
                    "--output-directory",
                    outputDirectory,
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
