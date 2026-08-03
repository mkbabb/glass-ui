import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import {
    existsSync,
    mkdtempSync,
    readdirSync,
    readFileSync,
    renameSync,
    rmSync,
    statSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin, ResolvedConfig, UserConfig } from "vite";

import {
    copyStyleAssets,
    foldSfcBundle,
    inlineFonts,
    normalizeShippedBackdropPairs,
    minifyStyleAssets,
    collectStyleClosure,
    type StyleClosure,
} from "./vite.style-fold";
import { emitComponentUtilities } from "./vite.utility-emit";
import { generateComponentStyles } from "./scripts/gen-component-styles.mjs";
import { flattenSubpathTypes } from "./scripts/flatten-subpath-types.mjs";
import { verifyExportTypes } from "./scripts/verify-export-types.mjs";

const require_ = createRequire(import.meta.url);

function commandPath(packageName: string, binName: string): string {
    const packageEntry = require_.resolve(`${packageName}/package.json`);
    return resolve(dirname(packageEntry), "bin", `${binName}.js`);
}

function generationIdentity(root: string): string {
    const hash = createHash("sha256");
    // Vite's output is flat or contains only its generated asset directories;
    // use the filesystem walk without introducing a second manifest surface.
    const walk = (directory: string, prefix = "") => {
        for (const name of readdirSync(directory).sort()) {
            const path = resolve(directory, name);
            const relative = prefix ? `${prefix}/${name}` : name;
            const entry = statSync(path);
            if (entry.isDirectory()) walk(path, relative);
            else {
                hash.update(relative);
                hash.update(readFileSync(path));
            }
        }
    };
    walk(root);
    return hash.digest("hex");
}

function addWatchInputs(plugin: { addWatchFile: (path: string) => void }, root: string, closure: StyleClosure): void {
    const fixed = [
        "package.json",
        "package-lock.json",
        "tsconfig.json",
        "tsconfig.src.json",
        "tsconfig.build.json",
        "scripts/lib/subpath-policy.mjs",
        "scripts/flatten-subpath-types.mjs",
        "scripts/verify-export-types.mjs",
        "vite.config.ts",
        "vite.iter.config.ts",
    ];
    for (const path of fixed) plugin.addWatchFile(resolve(root, path));
    for (const path of closure.sources) plugin.addWatchFile(path);
}

function removeEmittedSourceFiles(outputRoot: string): void {
    const visit = (directory: string) => {
        for (const name of readdirSync(directory)) {
            const path = resolve(directory, name);
            const entry = statSync(path);
            if (entry.isDirectory()) visit(path);
            else if (/\.(?:ts|mts|cts)$/.test(name) && !/\.d\.(?:ts|mts|cts)$/.test(name)) {
                rmSync(path, { force: true });
            }
        }
    };
    visit(outputRoot);
}

/**
 * publishStyleAssets — the one complete JS/SFC/declaration/style lifecycle
 * shared by full, iterative, and watch builds. A cycle is staged outside the
 * published `dist/`, verified as a complete tuple, and then atomically renamed.
 */
export function publishStyleAssets(): Plugin {
    let repositoryRoot = process.cwd();
    let generationRoot: string | null = null;
    let outputDirectory: string | null = null;
    let closure: StyleClosure | null = null;
    let watchMode = false;

    const cleanupGeneration = () => {
        if (generationRoot && existsSync(generationRoot)) rmSync(generationRoot, { recursive: true, force: true });
        generationRoot = null;
    };

    const stageTypesAndRelays = (outputRoot: string) => {
        execFileSync(process.execPath, [
            commandPath("vue-tsc", "vue-tsc"),
            "--project",
            resolve(repositoryRoot, "tsconfig.build.json"),
            "--outDir",
            outputRoot,
            "--pretty",
            "false",
        ], { cwd: repositoryRoot, stdio: "inherit" });
        removeEmittedSourceFiles(outputRoot);
        flattenSubpathTypes(outputRoot);
    };

    const publishGeneration = (outputRoot: string) => {
        verifyExportTypes({
            repositoryRoot,
            artifactRoot: outputRoot,
            pack: false,
            allowMissingRatchet: true,
        });
        const oldDist = resolve(repositoryRoot, "dist");
        const backup = `${outputRoot}.previous`;
        if (existsSync(backup)) rmSync(backup, { recursive: true, force: true });
        if (existsSync(oldDist)) renameSync(oldDist, backup);
        try {
            renameSync(outputRoot, oldDist);
            if (existsSync(backup)) rmSync(backup, { recursive: true, force: true });
        } catch (error) {
            if (existsSync(oldDist)) rmSync(oldDist, { recursive: true, force: true });
            if (existsSync(backup)) renameSync(backup, oldDist);
            throw error;
        }
        generationRoot = null;
        const identity = generationIdentity(oldDist);
        console.log(JSON.stringify({
            type: "glass-ui:ready",
            generation: identity,
            output: oldDist,
            tuple: "js/sfc-css/declarations/relays/styles/fonts/utilities/component-styles",
        }));
        return identity;
    };

    return {
        name: "glass-ui:publish-style-assets",
        apply: "build",
        config(config: UserConfig): UserConfig {
            repositoryRoot = resolve(config.root ?? process.cwd());
            generationRoot = mkdtempSync(join(repositoryRoot, ".glass-generation-"));
            outputDirectory = generationRoot;
            return {
                build: {
                    outDir: generationRoot,
                    emptyOutDir: true,
                },
            };
        },
        configResolved(config: ResolvedConfig) {
            repositoryRoot = config.root;
            watchMode = Boolean(config.build.watch);
        },
        buildStart(this) {
            if (!generationRoot && outputDirectory) generationRoot = outputDirectory;
            closure = collectStyleClosure(repositoryRoot);
            addWatchInputs(this, repositoryRoot, closure);
        },
        async closeBundle() {
            if (!generationRoot || !closure) {
                cleanupGeneration();
                return;
            }
            const outputRoot = generationRoot;
            try {
                const { srcFonts, distStyles, distComponents } = copyStyleAssets(repositoryRoot, closure, outputRoot);
                foldSfcBundle(repositoryRoot, distStyles);
                await emitComponentUtilities(repositoryRoot, distStyles, closure);
                inlineFonts(srcFonts, distStyles, distComponents);
                normalizeShippedBackdropPairs(
                    distStyles,
                    distComponents,
                    resolve(outputRoot, "glass-ui.css"),
                );
                minifyStyleAssets(distStyles, distComponents);
                stageTypesAndRelays(outputRoot);
                generateComponentStyles(outputRoot, closure.orderedCssSources);
                publishGeneration(outputRoot);
            } catch (error) {
                cleanupGeneration();
                if (!watchMode) throw error;
                console.error(error instanceof Error ? error.message : String(error));
                return;
            }
        },
        buildEnd(error) {
            if (error) cleanupGeneration();
        },
    };
}
