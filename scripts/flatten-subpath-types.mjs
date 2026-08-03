// Project the public declaration relays and close their reachable relative
// references using Node-ESM spelling. Called by the shared Vite lifecycle.

import {
    readdirSync,
    readFileSync,
    rmSync,
    statSync,
    writeFileSync,
} from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildEntrySet, readTree } from "./lib/subpath-policy.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const declarationFilePattern = /\.d\.(?:ts|mts|cts)$/;
const relativeReferencePattern =
    /(from\s+|import\s*\(\s*|<reference\s+path\s*=\s*)(["'])(\.{1,2}\/[^"']*)\2/g;

function declarationExtension(reference) {
    if (reference.endsWith(".mjs")) return ".d.mts";
    if (reference.endsWith(".cjs")) return ".d.cts";
    return ".d.ts";
}

function declarationRuntimeExtension(declarationPath) {
    if (declarationPath.endsWith(".d.mts")) return ".mjs";
    if (declarationPath.endsWith(".d.cts")) return ".cjs";
    return ".js";
}

function declarationTarget(fromFile, reference, outputRoot) {
    if (!reference.startsWith(".")) return null;
    if (reference.endsWith(".css")) return "css";

    const base = resolve(dirname(fromFile), reference);
    const candidates = [];
    const add = (candidate) => {
        if (!candidates.includes(candidate)) candidates.push(candidate);
    };
    if (declarationFilePattern.test(base)) add(base);
    if (/\.(?:mjs|cjs|js)$/.test(base)) {
        add(base.replace(/\.(?:mjs|cjs|js)$/, declarationExtension(reference)));
    }
    if (/\.(?:ts|tsx|mts|cts)$/.test(base)) {
        add(base.replace(/\.(?:ts|tsx|mts|cts)$/, declarationExtension(reference)));
    }
    add(`${base}.d.ts`);
    add(`${base}.d.mts`);
    add(`${base}.d.cts`);
    add(resolve(base, "index.d.ts"));
    add(resolve(base, "index.d.mts"));
    add(resolve(base, "index.d.cts"));
    return candidates.find((candidate) => candidate.startsWith(`${outputRoot}/`) && statExists(candidate)) ?? false;
}

function statExists(path) {
    try {
        return statSync(path).isFile();
    } catch {
        return false;
    }
}

function pathExists(path) {
    try {
        statSync(path);
        return true;
    } catch {
        return false;
    }
}

function declarationFiles(outputRoot) {
    const files = [];
    const visit = (directory) => {
        for (const name of readdirSync(directory)) {
            const path = resolve(directory, name);
            if (statSync(path).isDirectory()) visit(path);
            else if (declarationFilePattern.test(name)) files.push(path);
        }
    };
    if (pathExists(outputRoot)) visit(outputRoot);
    return files.sort();
}

function closeDeclarationReferences(outputRoot) {
    const files = declarationFiles(outputRoot);
    for (const file of files) {
        const source = readFileSync(file, "utf8");
        const rewritten = source.replace(
            relativeReferencePattern,
            (match, prefix, quote, reference) => {
                const target = declarationTarget(file, reference, outputRoot);
                if (target === null || target === "css") return match;
                if (target === false) {
                    throw new Error(`${file}: dangling declaration reference ${reference}`);
                }
                const next = relative(dirname(file), target).replace(
                    /\.d\.(?:ts|mts|cts)$/,
                    declarationRuntimeExtension(target),
                );
                return `${prefix}${quote}${next.startsWith(".") ? next : `./${next}`}${quote}`;
            },
        );
        if (rewritten !== source) writeFileSync(file, rewritten, "utf8");
    }
}

export function flattenSubpathTypes(outputRoot) {
    const { entries } = buildEntrySet(readTree({ repoRoot: ROOT }));
    for (const [name, source] of Object.entries(entries)) {
        const target = resolve(outputRoot, `${name === "index" ? "index" : name}.d.ts`);
        const emitted = resolve(
            outputRoot,
            source.replace(/^src\//, "").replace(/\.ts$/, ".d.ts"),
        );
        if (target === emitted) continue;
        const specifier = relative(dirname(target), emitted);
        const runtimeSpecifier = `${specifier.startsWith(".") ? specifier : `./${specifier}`}`
            .replace(/\.d\.(?:ts|mts|cts)$/, declarationRuntimeExtension(emitted));
        writeFileSync(
            target,
            `export * from ${JSON.stringify(runtimeSpecifier)};\n`,
            "utf8",
        );
    }

    closeDeclarationReferences(outputRoot);
    rmSync(resolve(outputRoot, "subpaths"), { recursive: true, force: true });
    const result = { outputRoot, entries: Object.keys(entries) };
    console.log(`declaration entries: projected ${result.entries.length} public entries`);
    return result;
}
