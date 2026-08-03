#!/usr/bin/env node
// The single package/declaration/CSS verifier. It is callable by the shared
// lifecycle in staged mode and performs the immutable pack/install proof in CLI
// mode. No dry-run result is used as package evidence.

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
    existsSync,
    lstatSync,
    realpathSync,
    readFileSync,
    readdirSync,
    mkdtempSync,
    rmSync,
    writeFileSync,
} from "node:fs";
import { isBuiltin, createRequire } from "node:module";
import { dirname, join, posix, resolve } from "node:path";
import { isDeepStrictEqual } from "node:util";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import ts from "typescript";

const require_ = createRequire(import.meta.url);
const root = resolve(fileURLToPath(new URL("..", import.meta.url)));

const declarationPattern = /\.d\.(?:ts|mts|cts)$/;
const canonicalRatchetPattern = /^(0|[1-9][0-9]*)\n$/;
const packageRootFields = [
    "name",
    "version",
    "license",
    "engines",
    "workspaces",
    "dependencies",
    "devDependencies",
    "optionalDependencies",
    "peerDependencies",
    "peerDependenciesMeta",
];

function versionTuple(spec) {
    const [core] = spec.replace(/^[\^~>=<\s]+/, "").split("-");
    const [major = 0, minor = 0, patch = 0] = core.split(".").map(Number);
    return [major, minor, patch];
}

/**
 * Caret satisfaction against a DECLARED peer range — never an exact literal. A
 * legal patch release of a repo glass-ui does not control must not RED the
 * release path (the remembered-literal defect class). Every @mkbabb peer range
 * is a caret range; anything else is a contract error, not a version drift.
 */
function satisfiesPeerRange(version, range) {
    if (!range?.startsWith("^")) throw new Error(`peer range is not a caret range: ${range}`);
    const low = versionTuple(range);
    const actual = versionTuple(version);
    const upper = low[0] > 0
        ? [low[0] + 1, 0, 0]
        : low[1] > 0
          ? [0, low[1] + 1, 0]
          : [0, 0, low[2] + 1];
    const compare = (a, b) => a.findIndex((part, index) => part !== b[index]);
    const below = (a, b) => {
        const index = compare(a, b);
        return index !== -1 && a[index] < b[index];
    };
    return !below(actual, low) && below(actual, upper);
}

export function packageRootAgreement(pkg, lock) {
    const lockRoot = lock && typeof lock === "object" && lock.packages && typeof lock.packages === "object"
        ? lock.packages[""]
        : undefined;
    if (!lockRoot || typeof lockRoot !== "object" || Array.isArray(lockRoot)) {
        return { valid: false, mismatches: ['packages[""]'] };
    }
    const mismatches = packageRootFields.filter((field) => {
        const packageValue = Object.hasOwn(pkg, field) ? pkg[field] : undefined;
        const lockValue = Object.hasOwn(lockRoot, field) ? lockRoot[field] : undefined;
        return !isDeepStrictEqual(packageValue, lockValue);
    });
    return { valid: mismatches.length === 0, mismatches };
}

function cleanReference(reference) {
    return reference.trim().replace(/^['"]|['"]$/g, "").split(/[?#]/, 1)[0];
}

function isDeclaration(file) {
    return declarationPattern.test(file);
}

function isRawCodeSource(file) {
    return /\.(?:vue|ts|tsx|jsx|mts|cts)$/.test(file) && !isDeclaration(file);
}

function flattenTargets(value, conditions = []) {
    if (typeof value === "string") return [{ target: value, conditions }];
    if (Array.isArray(value)) return value.flatMap((entry) => flattenTargets(entry, conditions));
    if (!value || typeof value !== "object") return [];
    return Object.entries(value).flatMap(([condition, entry]) =>
        flattenTargets(entry, [...conditions, condition]),
    );
}

function listFiles(directory, prefix = "") {
    if (!existsSync(directory)) return [];
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const path = join(directory, entry.name);
        const name = prefix ? `${prefix}/${entry.name}` : entry.name;
        return entry.isDirectory() ? listFiles(path, name) : [name];
    });
}

function targetMatches(target, files) {
    const normalized = posix.normalize(target.replace(/^\.\//, ""));
    const candidates = [normalized, normalized.replace(/^dist\//, "")];
    const wildcard = normalized.indexOf("*");
    if (wildcard === -1) return candidates.find((candidate) => files.has(candidate)) ? [candidates.find((candidate) => files.has(candidate))] : [];
    return [...files].filter((file) => candidates.some((candidate) => {
        const star = candidate.indexOf("*");
        return file.startsWith(candidate.slice(0, star)) && file.endsWith(candidate.slice(star + 1));
    }));
}

function resolveDeclaration(from, reference, files, assumeRelative = false) {
    const clean = cleanReference(reference);
    if (!clean || clean.startsWith("/") || (!assumeRelative && !clean.startsWith("."))) return null;
    const base = posix.normalize(posix.join(posix.dirname(from), clean));
    const candidates = [];
    const add = (candidate) => {
        if (!candidates.includes(candidate)) candidates.push(candidate);
    };
    if (isDeclaration(base)) add(base);
    if (/\.(?:js|jsx|ts|tsx)$/.test(base)) add(base.replace(/\.(?:js|jsx|ts|tsx)$/, ".d.ts"));
    if (/\.(?:mjs|mts)$/.test(base)) add(base.replace(/\.(?:mjs|mts)$/, ".d.mts"));
    if (/\.(?:cjs|cts)$/.test(base)) add(base.replace(/\.(?:cjs|cts)$/, ".d.cts"));
    for (const extension of [".d.ts", ".d.mts", ".d.cts"]) add(`${base}${extension}`);
    for (const extension of [".d.ts", ".d.mts", ".d.cts"]) add(posix.join(base, `index${extension}`));
    add(base);
    return candidates.find((candidate) => files.has(candidate)) ?? false;
}

function barePackageRoot(reference) {
    const clean = cleanReference(reference);
    if (
        !clean ||
        clean.startsWith(".") ||
        clean.startsWith("/") ||
        clean.startsWith("#") ||
        isBuiltin(clean) ||
        clean === "@mkbabb/glass-ui" ||
        clean.startsWith("@mkbabb/glass-ui/") ||
        /^[a-z][a-z+.-]*:/i.test(clean)
    ) return null;
    const segments = clean.split("/");
    return clean.startsWith("@") ? segments.slice(0, 2).join("/") : segments[0];
}

function packageClaims(pkg, files) {
    const failures = [];
    const claims = new Map();
    const declarationEntries = new Set();
    const cssEntries = new Set();
    const claimTarget = (label, target, declaration = false) => {
        if (typeof target !== "string") {
            failures.push(`${label}: target must be a string`);
            return;
        }
        const claim = claims.get(target) ?? { labels: new Set(), declaration: false };
        claim.labels.add(label);
        claim.declaration ||= declaration;
        claims.set(target, claim);
    };

    if (typeof pkg.types === "string") claimTarget("types", pkg.types, true);
    for (const [subpath, value] of Object.entries(pkg.exports ?? {})) {
        for (const { target, conditions } of flattenTargets(value)) {
            claimTarget(
                `exports.${subpath}${conditions.length ? `.${conditions.join(".")}` : ""}`,
                target,
                conditions.includes("types") || isDeclaration(target),
            );
        }
    }
    for (const [range, mappings] of Object.entries(pkg.typesVersions ?? {})) {
        for (const [subpath, targets] of Object.entries(mappings ?? {})) {
            const label = `typesVersions.${range}.${subpath}`;
            if (!Array.isArray(targets) || targets.length === 0) {
                failures.push(`${label}: expected at least one declaration target`);
                continue;
            }
            targets.forEach((target, index) => claimTarget(`${label}[${index}]`, target, true));
        }
    }

    for (const [target, claim] of claims) {
        const matches = targetMatches(target, files);
        const labels = [...claim.labels].join(", ");
        if (matches.length === 0) {
            failures.push(`${labels}: package omits ${target}`);
            continue;
        }
        if (claim.declaration) {
            const declarations = matches.filter(isDeclaration);
            if (declarations.length === 0) failures.push(`${labels}: ${target} selects no declaration file`);
            else declarations.forEach((file) => declarationEntries.add(file));
        }
        matches.filter((file) => file.endsWith(".css")).forEach((file) => cssEntries.add(file));
    }
    for (const file of files) {
        if (/^(?:src|dist)\/subpaths(?:\/|$)/.test(file)) {
            failures.push(`package contains retired mirror path: ${file}`);
        }
        if (isRawCodeSource(file)) {
            failures.push(`package contains raw code-bearing source: ${file}`);
        }
    }
    return { failures, claims, declarationEntries, cssEntries };
}

function validateDeclarations({ artifactRoot, pkg, files, entries, failures }) {
    const pending = [...entries];
    const visited = new Set();
    const owned = new Set([
        ...Object.keys(pkg.dependencies ?? {}),
        ...Object.keys(pkg.peerDependencies ?? {}),
        ...Object.keys(pkg.optionalDependencies ?? {}),
    ]);
    const barePackages = new Map();
    while (pending.length > 0) {
        const file = pending.pop();
        if (!file || visited.has(file)) continue;
        visited.add(file);
        const imports = ts.preProcessFile(readFileSync(resolve(artifactRoot, file), "utf8"), true, true);
        for (const { fileName } of imports.importedFiles) {
            const packageRoot = barePackageRoot(fileName);
            if (packageRoot) {
                if (!barePackages.has(packageRoot)) barePackages.set(packageRoot, { file, reference: fileName });
                continue;
            }
            if (!cleanReference(fileName).startsWith(".")) continue;
            const resolved = resolveDeclaration(file, fileName, files);
            if (resolved === false) failures.push(`${file}: unresolved declaration ${fileName}`);
            else if (resolved && isDeclaration(resolved)) pending.push(resolved);
        }
        for (const { fileName } of imports.referencedFiles) {
            const resolved = resolveDeclaration(file, fileName, files, true);
            if (resolved === false) failures.push(`${file}: unresolved declaration ${fileName}`);
            else if (resolved && isDeclaration(resolved)) pending.push(resolved);
        }
        for (const { fileName } of imports.typeReferenceDirectives) {
            const packageRoot = barePackageRoot(fileName);
            if (packageRoot && !barePackages.has(packageRoot)) barePackages.set(packageRoot, { file, reference: fileName });
        }
    }
    for (const [packageRoot, location] of barePackages) {
        if (!owned.has(packageRoot)) {
            failures.push(`${location.file}: bare declaration reference ${location.reference} requires direct dependency ownership of ${packageRoot}`);
        }
    }
    return visited.size;
}

function resolveCssReference(from, reference, files, extensions = []) {
    const clean = cleanReference(reference);
    if (!clean.startsWith(".")) return null;
    const base = posix.normalize(posix.join(posix.dirname(from), clean));
    const candidates = [base, ...extensions.map((extension) => `${base}${extension}`)];
    return candidates.find((candidate) => files.has(candidate)) ?? false;
}

function validateCss({ artifactRoot, files, entries, failures, pkg }) {
    const pending = [...entries];
    const visited = new Set();
    const barePackages = new Map();
    const owned = new Set([
        ...Object.keys(pkg.dependencies ?? {}),
        ...Object.keys(pkg.devDependencies ?? {}),
        ...Object.keys(pkg.peerDependencies ?? {}),
        ...Object.keys(pkg.optionalDependencies ?? {}),
    ]);
    const importPattern = /@import\s+(?:url\(\s*(?:"([^"]+)"|'([^']+)'|([^\s)]+))\s*\)|"([^"]+)"|'([^']+)')/g;
    const urlPattern = /url\(\s*["']?([^"')\s]+)["']?\s*\)/g;
    while (pending.length > 0) {
        const file = pending.pop();
        if (!file || visited.has(file)) continue;
        visited.add(file);
        const source = readFileSync(resolve(artifactRoot, file), "utf8")
            .replace(/\/\*[\s\S]*?\*\//g, "")
            .replace(/url\(\s*(["'])data:[\s\S]*?\1\s*\)/g, "");
        const imports = [...source.matchAll(importPattern)].map((match) => match.slice(1).find(Boolean));
        for (const reference of imports) {
            const packageRoot = barePackageRoot(reference);
            if (packageRoot) {
                if (!barePackages.has(packageRoot)) barePackages.set(packageRoot, { file, reference });
                continue;
            }
            if (!reference.startsWith(".")) continue;
            const resolved = resolveCssReference(file, reference, files, [".css"]);
            if (resolved === false) failures.push(`${file}: unresolved CSS import ${reference}`);
            else if (resolved?.endsWith(".css")) pending.push(resolved);
        }
        const withoutImports = source.replace(importPattern, "");
        for (const [, reference] of withoutImports.matchAll(urlPattern)) {
            if (/^(?:[a-z][a-z+.-]*:|#|\/\/|\/|var\()/i.test(reference)) continue;
            const relativeReference = reference.startsWith(".") ? reference : `./${reference}`;
            if (resolveCssReference(file, relativeReference, files) === false) {
                failures.push(`${file}: unresolved CSS url ${reference}`);
            }
        }
    }
    for (const [packageRoot, location] of barePackages) {
        if (!owned.has(packageRoot)) failures.push(`${location.file}: bare CSS reference ${location.reference} is not owned`);
    }
    return { count: visited.size, files: visited };
}

export function packedCssSetFailures(expectedCss, packedFiles) {
    const actualCss = new Set(
        [...packedFiles]
            .filter((file) => file.startsWith("dist/") && file.endsWith(".css"))
            .map((file) => file.slice("dist/".length)),
    );
    return [
        ...[...expectedCss]
            .filter((file) => !actualCss.has(file))
            .map((file) => `packed CSS closure is missing ${file}`),
        ...[...actualCss]
            .filter((file) => !expectedCss.has(file))
            .map((file) => `packed CSS closure has unreachable member ${file}`),
    ];
}

function packageCodeSpecifiers(pkg) {
    return Object.entries(pkg.exports ?? {})
        .filter(([, value]) => flattenTargets(value).some(({ target }) => /\.(?:[cm]?js)$/.test(target)))
        .map(([subpath]) => subpath === "." ? pkg.name : `${pkg.name}/${subpath.slice(2)}`);
}

function sourceRootSurface(repositoryRoot) {
    const path = resolve(repositoryRoot, "src/index.ts");
    const sourceFile = ts.createSourceFile(path, readFileSync(path, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const values = new Set();
    const types = new Set();
    sourceFile.forEachChild((statement) => {
        if (!ts.isExportDeclaration(statement)) return;
        if (!statement.exportClause || !ts.isNamedExports(statement.exportClause)) {
            throw new Error("source root surface must use explicit named exports");
        }
        for (const specifier of statement.exportClause.elements) {
            const name = specifier.name.text;
            if (statement.isTypeOnly || specifier.isTypeOnly) types.add(name);
            else values.add(name);
        }
    });
    return { values: [...values].sort(), types: [...types].sort() };
}

function compilerOptionsForMode(resolution, module) {
    return {
        strict: true,
        skipLibCheck: false,
        noEmit: true,
        target: ts.ScriptTarget.ES2022,
        moduleResolution: ts.ModuleResolutionKind[resolution],
        module: ts.ModuleKind[module],
        lib: ["lib.es2023.d.ts", "lib.dom.d.ts", "lib.dom.iterable.d.ts"],
        ignoreDeprecations: "6.0",
    };
}

function installedModuleSurface(program, moduleName) {
    const checker = program.getTypeChecker();
    const sourceFile = program.getSourceFiles().find((file) => file.fileName.endsWith("consumer.ts"));
    const importDeclaration = sourceFile?.statements.find(
        (statement) => ts.isImportDeclaration(statement) && statement.moduleSpecifier.getText(sourceFile) === JSON.stringify(moduleName),
    );
    const moduleSymbol = importDeclaration && checker.getSymbolAtLocation(importDeclaration.moduleSpecifier);
    if (!moduleSymbol) throw new Error(`unable to inspect installed root module ${moduleName}`);
    const values = new Set();
    const types = new Set();
    for (const symbol of checker.getExportsOfModule(moduleSymbol)) {
        const target = symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
        if (symbol.name === "default") continue;
        if (target.flags & ts.SymbolFlags.Value) values.add(symbol.name);
        if (target.flags & ts.SymbolFlags.Type) types.add(symbol.name);
    }
    return { values: [...values].sort(), types: [...types].sort() };
}

function compareRootSurface(actual, expected, mode) {
    if (JSON.stringify(actual.values) !== JSON.stringify(expected.values)) {
        throw new Error(`${mode} installed root value symbols differ: expected ${JSON.stringify(expected.values)} got ${JSON.stringify(actual.values)}`);
    }
    if (JSON.stringify(actual.types) !== JSON.stringify(expected.types)) {
        throw new Error(`${mode} installed root type symbols differ: expected ${JSON.stringify(expected.types)} got ${JSON.stringify(actual.types)}`);
    }
}

function runTypeResolverChecks(consumerRoot, pkg, sourceSurface, codeSpecifiers) {
    const sourcePath = resolve(consumerRoot, "consumer.ts");
    const rootImports = [
        sourceSurface.values.length
            ? `import { ${sourceSurface.values.join(", ")} } from ${JSON.stringify(pkg.name)};`
            : "",
        sourceSurface.types.length
            ? `import type { ${sourceSurface.types.join(", ")} } from ${JSON.stringify(pkg.name)};`
            : "",
    ].filter(Boolean).join("\n");
    const namespaceImports = codeSpecifiers
        .map((specifier, index) => `import * as publicModule${index} from ${JSON.stringify(specifier)};`)
        .join("\n");
    writeFileSync(sourcePath, `${rootImports}\n${namespaceImports}\n`, "utf8");
    const tsc = resolve(dirname(require_.resolve("typescript")), "../bin/tsc");
    const modes = [
        ["Bundler", "Bundler", "ESNext"],
        ["Node16", "Node16", "Node16"],
        ["NodeNext", "NodeNext", "NodeNext"],
    ];
    const evidence = [];
    for (const [name, resolution, module] of modes) {
        const configPath = resolve(consumerRoot, `consumer-${name.toLowerCase()}.json`);
        writeFileSync(configPath, JSON.stringify({
            compilerOptions: {
                strict: true,
                skipLibCheck: false,
                noEmit: true,
                target: "ES2022",
                moduleResolution: resolution,
                module,
                lib: ["ES2023", "DOM", "DOM.Iterable"],
                ignoreDeprecations: "6.0",
            },
            files: [sourcePath],
        }) + "\n", "utf8");
        const result = spawnSync(process.execPath, [
            tsc,
            "--project",
            configPath,
        ], { cwd: consumerRoot, encoding: "utf8" });
        evidence.push({ mode: name, exit: result.status, stdout: result.stdout, stderr: result.stderr });
        if (result.status !== 0) throw new Error(`${name} installed consumer typecheck failed:\n${result.stdout}\n${result.stderr}`);
        const program = ts.createProgram([sourcePath], compilerOptionsForMode(resolution, module));
        const diagnostics = ts.getPreEmitDiagnostics(program);
        if (diagnostics.length) {
            const detail = diagnostics
                .map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"))
                .join("\n");
            throw new Error(`${name} compiler API root-surface check failed:\n${detail}`);
        }
        const actual = installedModuleSurface(program, pkg.name);
        compareRootSurface(actual, sourceSurface, name);
        evidence[evidence.length - 1].rootSurface = { expected: sourceSurface, actual };
        evidence[evidence.length - 1].namespaceImports = codeSpecifiers;
    }
    return evidence;
}

function sha256(path) {
    const bytes = readFileSync(path);
    return { sha256: createHash("sha256").update(bytes).digest("hex"), bytes: bytes.length };
}

function createImmutablePack(repoRoot, pkg) {
    const callerPath = process.env.GLASS_PACKAGE_TARBALL;
    if (callerPath) {
        const path = resolve(callerPath);
        if (!existsSync(path) || !lstatSync(path).isFile() || lstatSync(path).isSymbolicLink()) {
            throw new Error("GLASS_PACKAGE_TARBALL must name a regular, non-symlink tarball");
        }
        const preUse = sha256(path);
        const manifest = spawnSync("tar", ["-xOzf", path, "package/package.json"], { encoding: "utf8" });
        if (manifest.status !== 0) throw new Error(`GLASS_PACKAGE_TARBALL package manifest inspection failed: ${manifest.stderr || manifest.stdout}`);
        let packedPackage;
        try { packedPackage = JSON.parse(manifest.stdout); } catch (error) { throw new Error(`GLASS_PACKAGE_TARBALL package manifest is invalid JSON: ${String(error)}`); }
        if (packedPackage.name !== pkg.name || packedPackage.version !== pkg.version) {
            throw new Error(`GLASS_PACKAGE_TARBALL package identity differs: expected ${pkg.name}@${pkg.version} got ${packedPackage.name}@${packedPackage.version}`);
        }
        return {
            path,
            ...preUse,
            callerProvided: true,
            preUse,
            command: "GLASS_PACKAGE_TARBALL=<immutable-tarball>",
        };
    }
    const packDirectory = mkdtempSync(join(tmpdir(), "glass-ui-pack-"));
    try {
        const result = spawnSync("npm", ["pack", "--ignore-scripts", "--json", "--silent", "--pack-destination", packDirectory], {
            cwd: repoRoot,
            encoding: "utf8",
        });
        if (result.status !== 0) throw new Error(`npm pack failed: ${result.stderr || result.stdout}`);
        let metadata;
        try { metadata = JSON.parse(result.stdout); } catch (error) { throw new Error(`npm pack returned invalid JSON: ${String(error)}`); }
        if (!Array.isArray(metadata) || metadata.length !== 1 || !metadata[0].filename) throw new Error("npm pack did not produce exactly one tarball");
        const path = resolve(packDirectory, metadata[0].filename);
        const identity = sha256(path);
        return {
            path,
            ...identity,
            callerProvided: false,
            packDirectory,
            command: "npm pack --ignore-scripts --json --silent --pack-destination <outside-repository>",
        };
    } catch (error) {
        rmSync(packDirectory, { recursive: true, force: true });
        throw error;
    }
}

export function normalizeTarMembers(output) {
    const seen = new Map();
    let packageRoot;
    for (const original of output.split("\n").filter(Boolean)) {
        const kind = original.endsWith("/") ? "directory" : "regular";
        const normalized = posix.normalize(original);
        if (posix.isAbsolute(original) || posix.isAbsolute(normalized)) {
            throw new Error(`tar member is absolute: ${JSON.stringify(original)}`);
        }
        if (normalized === ".." || normalized.startsWith("../")) {
            throw new Error(`tar member escapes the package root: ${JSON.stringify(original)} -> ${JSON.stringify(normalized)}`);
        }
        const segments = original.split("/");
        const alias = segments.find((segment) => segment === "." || segment === "..");
        if (alias) throw new Error(`tar member uses a ${JSON.stringify(alias)} path alias: ${JSON.stringify(original)}`);
        const archivePath = normalized.replace(/\/+$/, "");
        if (archivePath === "package") {
            if (kind === "regular") {
                throw new Error(`tar member has a non-directory package root: ${JSON.stringify(original)}`);
            }
            if (packageRoot !== undefined) {
                throw new Error(
                    `tar membership is not unique after package normalization: ${JSON.stringify(packageRoot.original)} (${packageRoot.kind}) and ${JSON.stringify(original)} (${kind}) -> "package"`,
                );
            }
            packageRoot = { original, kind };
            continue;
        }
        const destination = (normalized.startsWith("package/") ? normalized.slice("package/".length) : normalized)
            .replace(/\/+$/, "");
        if (!destination || destination === ".") {
            throw new Error(`tar member has an empty or dot destination: ${JSON.stringify(original)}`);
        }
        const prior = seen.get(destination);
        if (prior !== undefined) {
            throw new Error(
                `tar membership is not unique after package normalization: ${JSON.stringify(prior.original)} (${prior.kind}) and ${JSON.stringify(original)} (${kind}) -> ${JSON.stringify(destination)}`,
            );
        }
        seen.set(destination, { original, kind });
    }
    for (const [destination, member] of seen) {
        const parts = destination.split("/");
        for (let length = 1; length < parts.length; length += 1) {
            const ancestor = parts.slice(0, length).join("/");
            const owner = seen.get(ancestor);
            if (owner?.kind === "regular") {
                throw new Error(
                    `tar member has a non-directory ancestor: ${JSON.stringify(owner.original)} blocks ${JSON.stringify(member.original)}`,
                );
            }
        }
    }
    return new Set([...seen].filter(([, member]) => member.kind === "regular").map(([destination]) => destination));
}

function tarFiles(tarball) {
    const result = spawnSync("tar", ["-tzf", tarball], { encoding: "utf8" });
    if (result.status !== 0) throw new Error(`tar membership inspection failed: ${result.stderr || result.stdout}`);
    return normalizeTarMembers(result.stdout);
}

function installTarball(tarball, pkg) {
    const consumerRoot = mkdtempSync(join(tmpdir(), "glass-ui-consumer-"));
    try {
        const requiredPeer = "@mkbabb/keyframes.js";
        const pencilPeer = "@mkbabb/pencil-boil";
        const requiredVersion = pkg.peerDependencies?.[requiredPeer];
        if (!requiredVersion || pkg.peerDependenciesMeta?.[requiredPeer]?.optional) {
            throw new Error("required keyframes peer is not explicit in the package contract");
        }
        const pencilRange = pkg.peerDependencies?.[pencilPeer];
        const pencilVersion = pkg.devDependencies?.[pencilPeer];
        if (!pencilRange || !pencilVersion) {
            throw new Error("Pencil peer range and development dependency must both be declared");
        }
        const consumerDependencies = Object.fromEntries(
            Object.entries(pkg.peerDependencies ?? {})
                .filter(([name]) => name !== "@mkbabb/value.js"),
        );
        consumerDependencies[pencilPeer] = pencilVersion;
        writeFileSync(resolve(consumerRoot, "package.json"), JSON.stringify({
            name: "glass-ui-installed-consumer",
            private: true,
            type: "module",
            dependencies: consumerDependencies,
        }) + "\n", "utf8");
        const result = spawnSync("npm", ["install", "--ignore-scripts", "--no-audit", "--no-fund", "--no-package-lock", "--omit=optional", tarball], {
            cwd: consumerRoot,
            encoding: "utf8",
        });
        if (result.status !== 0) throw new Error(`installed-consumer npm install failed: ${result.stderr || result.stdout}`);
        const installed = resolve(consumerRoot, "node_modules/@mkbabb/glass-ui");
        const keyframes = resolve(consumerRoot, "node_modules/@mkbabb/keyframes.js");
        const pencil = resolve(consumerRoot, "node_modules/@mkbabb/pencil-boil");
        if (!existsSync(keyframes) || lstatSync(keyframes).isSymbolicLink()) {
            throw new Error("required keyframes peer was not installed as a real consumer dependency");
        }
        if (!existsSync(pencil) || lstatSync(pencil).isSymbolicLink()) {
            throw new Error("Pencil was not installed as a real consumer dependency");
        }
        const consumerRealPath = realpathSync(consumerRoot);
        const keyframesRealPath = realpathSync(keyframes);
        const pencilRealPath = realpathSync(pencil);
        if (!keyframesRealPath.startsWith(`${consumerRealPath}/`)) {
            throw new Error("required keyframes peer escaped the consumer installation root");
        }
        if (!pencilRealPath.startsWith(`${consumerRealPath}/`)) {
            throw new Error("Pencil escaped the consumer installation root");
        }
        const keyframesPackage = JSON.parse(readFileSync(resolve(keyframes, "package.json"), "utf8"));
        const pencilPackage = JSON.parse(readFileSync(resolve(pencil, "package.json"), "utf8"));
        const valuePackagePath = [
            resolve(keyframes, "node_modules/@mkbabb/value.js/package.json"),
            resolve(consumerRoot, "node_modules/@mkbabb/value.js/package.json"),
        ].find((path) => existsSync(path));
        if (!valuePackagePath) throw new Error("required Keyframes dependency @mkbabb/value.js was not installed");
        const valuePackageDirectory = dirname(valuePackagePath);
        if (lstatSync(valuePackageDirectory).isSymbolicLink()) {
            throw new Error("required Keyframes dependency @mkbabb/value.js was installed as a symlink");
        }
        const valuePackage = JSON.parse(readFileSync(valuePackagePath, "utf8"));
        const valueRange = pkg.peerDependencies?.["@mkbabb/value.js"];
        if (!satisfiesPeerRange(keyframesPackage.version, requiredVersion)) {
            throw new Error(`installed Keyframes ${keyframesPackage.version} is outside the declared peer range ${requiredVersion}`);
        }
        if (!satisfiesPeerRange(valuePackage.version, valueRange)) {
            throw new Error(`installed @mkbabb/value.js ${valuePackage.version} is outside the declared peer range ${valueRange}`);
        }
        if (!satisfiesPeerRange(pencilPackage.version, pencilRange)) {
            throw new Error(`installed Pencil ${pencilPackage.version} is outside the declared peer range ${pencilRange}`);
        }
        return {
            consumerRoot,
            installed,
            keyframes: {
                path: keyframes,
                realPath: keyframesRealPath,
                symlink: false,
                version: keyframesPackage.version,
                dependency: requiredVersion,
                value: {
                    path: valuePackageDirectory,
                    version: valuePackage.version,
                    symlink: false,
                    dependency: keyframesPackage.dependencies?.["@mkbabb/value.js"],
                    directGlassPeerRequested: Object.hasOwn(consumerDependencies, "@mkbabb/value.js"),
                    installedThrough: requiredPeer,
                },
            },
            pencil: {
                path: pencil,
                realPath: pencilRealPath,
                symlink: false,
                version: pencilPackage.version,
                dependency: pencilVersion,
                peerRange: pencilRange,
            },
            install: { exit: result.status, stdout: result.stdout, stderr: result.stderr },
        };
    } catch (error) {
        rmSync(consumerRoot, { recursive: true, force: true });
        throw error;
    }
}

function installedEvidence({ consumerRoot, installed, pkg, sourceSurface, codeSpecifiers }) {
    const files = new Set(listFiles(installed));
    const css = [];
    const fonts = [];
    for (const [subpath, value] of Object.entries(pkg.exports ?? {})) {
        for (const { target } of flattenTargets(value)) {
            if (target.endsWith(".css")) {
                const path = resolve(installed, target.replace(/^\.\//, ""));
                if (!existsSync(path)) throw new Error(`installed CSS target missing: ${subpath} -> ${target}`);
                css.push({ subpath, target, path });
            }
        }
    }
    for (const file of files) if (/^dist\/fonts\/.*\.(?:woff2?|ttf|otf)$/.test(file)) fonts.push(file);
    if (fonts.length === 0) throw new Error("installed consumer has no reachable font files");
    const runtime = spawnSync(process.execPath, ["--input-type=module", "-e", `
      const specifiers = ${JSON.stringify(codeSpecifiers)};
      const expected = ${JSON.stringify(sourceSurface.values)};
      const results = await Promise.all(specifiers.map(async (specifier) => ({
        specifier,
        exports: Object.keys(await import(specifier)).sort(),
      })));
      const root = results.find(({ specifier }) => specifier === ${JSON.stringify(pkg.name)});
      if (!root || JSON.stringify(root.exports) !== JSON.stringify([...expected].sort())) {
        const actual = root?.exports ?? [];
        console.error(JSON.stringify({ expected, actual }));
        process.exit(2);
      }
      process.stdout.write(JSON.stringify(results));
    `], { cwd: consumerRoot, encoding: "utf8" });
    if (runtime.status !== 0) throw new Error(`installed runtime import failed: ${runtime.stderr || runtime.stdout}`);
    let runtimeResults;
    try { runtimeResults = JSON.parse(runtime.stdout); } catch (error) { throw new Error(`installed runtime evidence was invalid JSON: ${String(error)}`); }

    return {
        runtimeExit: runtime.status,
        runtimeSpecifiers: codeSpecifiers,
        runtimeRootSurface: { expectedValues: sourceSurface.values, actualValues: runtimeResults.find(({ specifier }) => specifier === pkg.name).exports },
        runtimeResults,
        publicImports: codeSpecifiers,
        css,
        fonts,
    };
}

export function ratchetEvidence(repoRoot, tarballBytes, { allowMissingRatchet = false, firstAdoption = false } = {}) {
    const path = resolve(repoRoot, ".bundle-ratchet");
    if (!existsSync(path)) {
        if (firstAdoption || !allowMissingRatchet) throw new Error(".bundle-ratchet is missing; first adoption must bind the immutable tarball byte count");
        return { path, status: "MISSING", candidateBytes: tarballBytes };
    }
    const raw = readFileSync(path, "utf8");
    if (!canonicalRatchetPattern.test(raw)) throw new Error(".bundle-ratchet is not canonical unsigned decimal plus one LF");
    const datum = BigInt(raw.slice(0, -1));
    const candidate = BigInt(tarballBytes);
    if (firstAdoption && candidate !== datum) {
        throw new Error(`first-adoption bundle ratchet requires exact equality: ${tarballBytes} !== ${datum}`);
    }
    if (!firstAdoption && candidate > datum) throw new Error(`bundle ratchet increase forbidden: ${tarballBytes} > ${datum}`);
    return {
        path,
        status: "PRESENT",
        mode: firstAdoption ? "first-adoption" : "later-coordinate",
        raw,
        datum: datum.toString(),
        tarballBytes,
        equal: candidate === datum,
        increase: false,
    };
}

export function verifyExportTypes({
    repositoryRoot = root,
    artifactRoot = resolve(repositoryRoot, "dist"),
    pack = false,
    install = false,
    allowMissingRatchet = false,
    firstAdoption = false,
} = {}) {
    const pkg = JSON.parse(
        readFileSync(
            repositoryRoot === root
                ? new URL("../package.json", import.meta.url)
                : resolve(repositoryRoot, "package.json"),
            "utf8",
        ),
    );
    const packageLock = JSON.parse(
        readFileSync(
            repositoryRoot === root
                ? new URL("../package-lock.json", import.meta.url)
                : resolve(repositoryRoot, "package-lock.json"),
            "utf8",
        ),
    );
    const packageAgreement = packageRootAgreement(pkg, packageLock);
    if (!packageAgreement.valid) {
        throw new Error(`package.json/package-lock.json root metadata mismatch: ${packageAgreement.mismatches.join(", ")}`);
    }
    const files = new Set(listFiles(artifactRoot));
    const { failures, claims, declarationEntries, cssEntries } = packageClaims(pkg, files);
    const declarationCount = validateDeclarations({ artifactRoot, pkg, files, entries: declarationEntries, failures });
    const cssClosure = validateCss({ artifactRoot, files, entries: cssEntries, failures, pkg });
    if (failures.length) throw new Error(`Invalid package artifact:\n${failures.join("\n")}`);

    let packEvidence = null;
    let installEvidence = null;
    let ratchet = null;
    const temporaryRoots = [];
    try {
        if (pack) {
            const sourceSurface = sourceRootSurface(repositoryRoot);
            const codeSpecifiers = packageCodeSpecifiers(pkg);
            packEvidence = createImmutablePack(repositoryRoot, pkg);
            if (packEvidence.packDirectory) temporaryRoots.push(packEvidence.packDirectory);
            const packedFiles = tarFiles(packEvidence.path);
            const packedClaims = packageClaims(pkg, packedFiles);
            const packedCssFailures = packedCssSetFailures(cssClosure.files, packedFiles);
            const packedFailures = [...packedClaims.failures, ...packedCssFailures];
            if (packedFailures.length) throw new Error(`Invalid packed artifact:\n${packedFailures.join("\n")}`);
            ratchet = ratchetEvidence(repositoryRoot, packEvidence.bytes, { allowMissingRatchet, firstAdoption });
            if (install) {
                installEvidence = installTarball(packEvidence.path, pkg);
                temporaryRoots.push(installEvidence.consumerRoot);
                installEvidence.types = runTypeResolverChecks(installEvidence.consumerRoot, pkg, sourceSurface, codeSpecifiers);
                installEvidence.artifact = installedEvidence({ ...installEvidence, pkg, sourceSurface, codeSpecifiers });
            }
            if (packEvidence.callerProvided) {
                if (!lstatSync(packEvidence.path).isFile() || lstatSync(packEvidence.path).isSymbolicLink()) {
                    throw new Error("GLASS_PACKAGE_TARBALL was replaced before verification completed");
                }
                const postUse = sha256(packEvidence.path);
                if (postUse.sha256 !== packEvidence.preUse.sha256 || postUse.bytes !== packEvidence.preUse.bytes) {
                    throw new Error("GLASS_PACKAGE_TARBALL changed during verification");
                }
                packEvidence.postUse = postUse;
                packEvidence.preserved = true;
            }
        }
        return {
            package: { name: pkg.name, version: pkg.version },
            claims: claims.size,
            declarations: declarationCount,
            css: cssClosure.count,
            pack: packEvidence,
            install: installEvidence,
            ratchet,
            artifactRoot,
        };
    } finally {
        for (const temporaryRoot of temporaryRoots) rmSync(temporaryRoot, { recursive: true, force: true });
    }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const allowMissingRatchet = process.argv.includes("--allow-missing-ratchet");
    const firstAdoption = process.argv.includes("--first-adoption");
    const evidence = verifyExportTypes({
        pack: true,
        install: true,
        allowMissingRatchet,
        firstAdoption,
    });
    console.log(JSON.stringify({ schema: "glass-ui-package-verification/v2", terminal: "CLEAN", ...evidence }));
}
