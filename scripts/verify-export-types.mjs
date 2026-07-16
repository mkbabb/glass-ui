import { spawnSync } from "node:child_process";
import { isBuiltin } from "node:module";
import { readFileSync } from "node:fs";
import { posix, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
const failures = [];

function readPackedFiles() {
    const result = spawnSync(
        "npm",
        ["pack", "--dry-run", "--json", "--ignore-scripts", "--silent"],
        { cwd: root, encoding: "utf8" },
    );
    if (result.status !== 0) {
        failures.push(`npm pack --dry-run failed: ${result.stderr || result.stdout}`);
        return new Set();
    }
    try {
        return new Set(JSON.parse(result.stdout)[0].files.map(({ path }) => path));
    } catch (error) {
        failures.push(`npm pack --dry-run returned invalid JSON: ${String(error)}`);
        return new Set();
    }
}

const files = readPackedFiles();

function cleanReference(reference) {
    return reference
        .trim()
        .replace(/^['"]|['"]$/g, "")
        .split(/[?#]/, 1)[0];
}

function isDeclaration(file) {
    return /\.d\.(?:ts|mts|cts)$/.test(file);
}

function targetMatches(target) {
    const normalized = posix.normalize(target.replace(/^\.\//, ""));
    const wildcard = normalized.indexOf("*");
    if (wildcard === -1) return files.has(normalized) ? [normalized] : [];
    const prefix = normalized.slice(0, wildcard);
    const suffix = normalized.slice(wildcard + 1);
    return [...files].filter(
        (file) => file.startsWith(prefix) && file.endsWith(suffix),
    );
}

function flattenTargets(value, conditions = []) {
    if (typeof value === "string") return [{ target: value, conditions }];
    if (Array.isArray(value)) {
        return value.flatMap((entry) => flattenTargets(entry, conditions));
    }
    if (!value || typeof value !== "object") return [];
    return Object.entries(value).flatMap(([condition, entry]) =>
        flattenTargets(entry, [...conditions, condition]),
    );
}

const claims = new Map();
function claimTarget(label, target, declaration = false) {
    if (typeof target !== "string") {
        failures.push(`${label}: target must be a string`);
        return;
    }
    const claim = claims.get(target) ?? { labels: new Set(), declaration: false };
    claim.labels.add(label);
    claim.declaration ||= declaration;
    claims.set(target, claim);
}

if (typeof pkg.types === "string") claimTarget("types", pkg.types, true);

for (const [subpath, value] of Object.entries(pkg.exports ?? {})) {
    for (const { target, conditions } of flattenTargets(value)) {
        const label = `exports.${subpath}${conditions.length ? `.${conditions.join(".")}` : ""}`;
        claimTarget(
            label,
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
        targets.forEach((target, index) =>
            claimTarget(`${label}[${index}]`, target, true),
        );
    }
}

const declarationEntries = new Set();
const cssEntries = new Set();
for (const [target, claim] of claims) {
    const matches = targetMatches(target);
    const labels = [...claim.labels].join(", ");
    if (matches.length === 0) {
        failures.push(`${labels}: package omits ${target}`);
        continue;
    }
    if (claim.declaration) {
        const declarations = matches.filter(isDeclaration);
        if (declarations.length === 0) {
            failures.push(`${labels}: ${target} selects no declaration file`);
        } else {
            declarations.forEach((file) => declarationEntries.add(file));
        }
    }
    matches
        .filter((file) => file.endsWith(".css"))
        .forEach((file) => cssEntries.add(file));
}

for (const file of files) {
    if (/^(?:src|dist)\/subpaths(?:\/|$)/.test(file)) {
        failures.push(`package contains retired mirror path: ${file}`);
    }
}

function resolveDeclaration(from, reference, assumeRelative = false) {
    const clean = cleanReference(reference);
    if (
        !clean ||
        clean.startsWith("/") ||
        (!assumeRelative && !clean.startsWith("."))
    ) {
        return null;
    }
    const base = posix.normalize(posix.join(posix.dirname(from), clean));
    const candidates = [];
    const add = (candidate) => {
        if (!candidates.includes(candidate)) candidates.push(candidate);
    };

    if (isDeclaration(base)) add(base);
    if (/\.(?:js|jsx|ts|tsx)$/.test(base)) {
        add(base.replace(/\.(?:js|jsx|ts|tsx)$/, ".d.ts"));
    }
    if (/\.(?:mjs|mts)$/.test(base)) add(base.replace(/\.(?:mjs|mts)$/, ".d.mts"));
    if (/\.(?:cjs|cts)$/.test(base)) add(base.replace(/\.(?:cjs|cts)$/, ".d.cts"));
    for (const extension of [".d.ts", ".d.mts", ".d.cts"]) add(`${base}${extension}`);
    for (const extension of [".d.ts", ".d.mts", ".d.cts"]) {
        add(posix.join(base, `index${extension}`));
    }
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
        clean === pkg.name ||
        clean.startsWith(`${pkg.name}/`) ||
        /^[a-z][a-z+.-]*:/i.test(clean)
    ) {
        return null;
    }
    const segments = clean.split("/");
    return clean.startsWith("@") ? segments.slice(0, 2).join("/") : segments[0];
}

const owned = new Set([
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
    ...Object.keys(pkg.optionalDependencies ?? {}),
]);

function recordBarePackage(barePackages, file, reference) {
    const packageRoot = barePackageRoot(reference);
    if (!packageRoot) return false;
    if (!barePackages.has(packageRoot)) {
        barePackages.set(packageRoot, { file, reference });
    }
    return true;
}

function reportUnownedBareRoots(barePackages, kind) {
    for (const packageRoot of [...barePackages.keys()].sort()) {
        if (owned.has(packageRoot)) continue;
        const { file, reference } = barePackages.get(packageRoot);
        failures.push(
            `${file}: bare ${kind} ${reference} requires direct dependency ownership of ${packageRoot}`,
        );
    }
}

function validateDeclarations() {
    const pending = [...declarationEntries];
    const visited = new Set();
    const barePackages = new Map();

    while (pending.length > 0) {
        const file = pending.pop();
        if (!file || visited.has(file)) continue;
        visited.add(file);
        const imports = ts.preProcessFile(
            readFileSync(resolve(root, file), "utf8"),
            true,
            true,
        );

        for (const { fileName } of imports.importedFiles) {
            if (recordBarePackage(barePackages, file, fileName)) continue;
            if (!cleanReference(fileName).startsWith(".")) continue;
            const resolved = resolveDeclaration(file, fileName);
            if (resolved === false) {
                failures.push(`${file}: unresolved declaration ${fileName}`);
            } else if (resolved && isDeclaration(resolved)) {
                pending.push(resolved);
            } else if (resolved?.endsWith(".css")) {
                cssEntries.add(resolved);
            }
        }

        for (const { fileName } of imports.referencedFiles) {
            const resolved = resolveDeclaration(file, fileName, true);
            if (resolved === false) {
                failures.push(`${file}: unresolved declaration ${fileName}`);
            } else if (resolved && isDeclaration(resolved)) {
                pending.push(resolved);
            }
        }

        for (const { fileName } of imports.typeReferenceDirectives) {
            recordBarePackage(barePackages, file, fileName);
        }
    }

    reportUnownedBareRoots(barePackages, "declaration reference");
    return visited.size;
}

function validateStrictConsumer() {
    const moduleSpecifiers = Object.entries(pkg.exports ?? {})
        .filter(([, value]) =>
            flattenTargets(value).some(
                ({ target, conditions }) =>
                    conditions.includes("types") || isDeclaration(target),
            ),
        )
        .map(([subpath]) =>
            subpath === "." ? pkg.name : `${pkg.name}/${subpath.slice(2)}`,
        );
    const probeFile = resolve(root, ".tmp/package-consumer.ts");
    const source = moduleSpecifiers
        .map((specifier) => `import ${JSON.stringify(specifier)};`)
        .join("\n");
    const options = {
        module: ts.ModuleKind.ESNext,
        moduleResolution: ts.ModuleResolutionKind.Bundler,
        target: ts.ScriptTarget.ES2022,
        lib: ["lib.es2023.d.ts", "lib.dom.d.ts", "lib.dom.iterable.d.ts"],
        strict: true,
        skipLibCheck: false,
        noUncheckedSideEffectImports: true,
        types: [],
        noEmit: true,
    };
    const host = ts.createCompilerHost(options);
    const getSourceFile = host.getSourceFile.bind(host);
    const fileExists = host.fileExists.bind(host);
    const readFile = host.readFile.bind(host);
    host.fileExists = (file) => file === probeFile || fileExists(file);
    host.readFile = (file) => (file === probeFile ? source : readFile(file));
    host.getSourceFile = (file, languageVersion, onError, shouldCreateNewSourceFile) =>
        file === probeFile
            ? ts.createSourceFile(file, source, languageVersion, true)
            : getSourceFile(
                  file,
                  languageVersion,
                  onError,
                  shouldCreateNewSourceFile,
              );

    const diagnostics = ts.getPreEmitDiagnostics(
        ts.createProgram([probeFile], options, host),
    );
    if (diagnostics.length > 0) {
        failures.push(
            `strict exported-surface consumer failed:\n${ts.formatDiagnosticsWithColorAndContext(
                diagnostics,
                {
                    getCanonicalFileName: (file) => file,
                    getCurrentDirectory: () => root,
                    getNewLine: () => "\n",
                },
            )}`,
        );
    }
    return moduleSpecifiers.length;
}

function resolveCssReference(from, reference, extensions = []) {
    const clean = cleanReference(reference);
    if (!clean.startsWith(".")) return null;
    const base = posix.normalize(posix.join(posix.dirname(from), clean));
    const candidates = [base, ...extensions.map((extension) => `${base}${extension}`)];
    return candidates.find((candidate) => files.has(candidate)) ?? false;
}

function validateCss() {
    const pending = [...cssEntries];
    const visited = new Set();
    const barePackages = new Map();
    const importPattern =
        /@import\s+(?:url\(\s*(?:"([^"]+)"|'([^']+)'|([^\s)]+))\s*\)|"([^"]+)"|'([^']+)')/g;
    const urlPattern = /url\(\s*["']?([^"')\s]+)["']?\s*\)/g;

    while (pending.length > 0) {
        const file = pending.pop();
        if (!file || visited.has(file)) continue;
        visited.add(file);
        const source = readFileSync(resolve(root, file), "utf8")
            .replace(/\/\*[\s\S]*?\*\//g, "")
            .replace(/url\(\s*(["'])data:[\s\S]*?\1\s*\)/g, "");
        const imports = [...source.matchAll(importPattern)].map((match) =>
            match.slice(1).find(Boolean),
        );

        for (const reference of imports) {
            if (recordBarePackage(barePackages, file, reference)) continue;
            if (!reference.startsWith(".")) continue;
            const resolved = resolveCssReference(file, reference, [".css"]);
            if (resolved === false)
                failures.push(`${file}: unresolved CSS import ${reference}`);
            else if (resolved?.endsWith(".css")) pending.push(resolved);
        }

        const withoutImports = source.replace(importPattern, "");
        for (const [, reference] of withoutImports.matchAll(urlPattern)) {
            if (/^(?:[a-z][a-z+.-]*:|#|\/\/|\/|var\()/i.test(reference)) continue;
            const relative = reference.startsWith(".") ? reference : `./${reference}`;
            if (resolveCssReference(file, relative) === false) {
                failures.push(`${file}: unresolved CSS url ${reference}`);
            }
        }
    }
    reportUnownedBareRoots(barePackages, "CSS import");
    return visited.size;
}

const declarationCount = validateDeclarations();
const cssCount = validateCss();
const strictEntryCount = validateStrictConsumer();

if (failures.length > 0) {
    console.error(`Invalid package artifact:\n${failures.join("\n")}`);
    process.exit(1);
}

console.log(
    `Package artifact valid: ${claims.size} targets, ${declarationCount} declarations, ${cssCount} CSS files, ${strictEntryCount} strict consumer imports.`,
);
