import {
    existsSync,
    mkdirSync,
    readFileSync,
    readdirSync,
    statSync,
    writeFileSync,
} from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../", import.meta.url)));
const parent = resolve(root, "..");
const artifactPath = resolve(
    root,
    process.env.GLASS_UI_CONSUMERS_STATIC_ARTIFACT ?? "docs/tranches/F/audit/W1-consumers-static.json",
);
const packageJson = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));

const consumers = [
    { id: "fourier-analysis/web", dir: resolve(parent, "fourier-analysis/web") },
    { id: "words/frontend", dir: resolve(parent, "words/frontend") },
    { id: "bbnf-lang/playground", dir: resolve(parent, "bbnf-lang/playground") },
    { id: "speedtest", dir: resolve(parent, "speedtest") },
];

const sourceExts = new Set([".ts", ".tsx", ".js", ".jsx", ".vue", ".css", ".scss", ".pcss", ".json"]);
const ignoredDirs = new Set([
    ".git",
    ".vite",
    "dist",
    "build",
    "coverage",
    "node_modules",
    ".output",
    ".nuxt",
]);

function resolveModulePath(fromFile, specifier) {
    const base = resolve(dirname(fromFile), specifier);
    const candidates = [
        `${base}.ts`,
        `${base}.tsx`,
        `${base}.js`,
        `${base}.mjs`,
        join(base, "index.ts"),
        join(base, "index.tsx"),
        join(base, "index.js"),
        join(base, "index.mjs"),
        base,
    ];
    return candidates.find(
        (candidate) => existsSync(candidate) && statSync(candidate).isFile(),
    );
}

function parseExportList(source) {
    return source
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => part.replace(/^type\s+/, ""))
        .map((part) => {
            const asMatch = part.match(/^(.*?)\s+as\s+([A-Za-z_$][\w$]*)$/);
            if (asMatch) return asMatch[2];
            const name = part.match(/[A-Za-z_$][\w$]*/)?.[0];
            return name === "default" ? null : name;
        })
        .filter(Boolean);
}

function collectExports(filePath, seen = new Set()) {
    const resolved = resolve(filePath);
    if (seen.has(resolved) || !existsSync(resolved)) return new Set();
    seen.add(resolved);

    const source = readFileSync(resolved, "utf8");
    const exports = new Set();

    for (const match of source.matchAll(/export\s+\*\s+from\s+["']([^"']+)["']/g)) {
        const target = resolveModulePath(resolved, match[1]);
        if (!target) continue;
        for (const name of collectExports(target, seen)) exports.add(name);
    }

    for (const match of source.matchAll(/export\s+(?:type\s+)?\{([^}]+)\}(?:\s+from\s+["'][^"']+["'])?/g)) {
        for (const name of parseExportList(match[1])) exports.add(name);
    }

    for (const match of source.matchAll(/export\s+(?:declare\s+)?(?:const|let|var|function|class|interface|type|enum)\s+([A-Za-z_$][\w$]*)/g)) {
        exports.add(match[1]);
    }

    return exports;
}

function unionExports(files) {
    const exports = new Set();
    for (const file of files) {
        for (const name of collectExports(file)) exports.add(name);
    }
    return exports;
}

const rootContractFiles = [
    "src/components/ui/index.ts",
    "src/composables/useGlobalDark.ts",
    "src/composables/useInterval.ts",
    "src/composables/useKeyboardShortcuts.ts",
    "src/composables/useTimer.ts",
    "src/composables/useTouchGate.ts",
    "src/composables/glass/index.ts",
    // AI.W1 R3 — `composables/motion/index.ts` retired from the root barrel.
    // The keyframes.js-bearing motion composables ship via the `/motion` flat
    // subpath (mirrors the `/dark` + `/keyboard` SCC-trap closure shape).
    "src/composables/sortable/index.ts",
    "src/utils/index.ts",
].map((file) => resolve(root, file));
const rootAllowed = unionExports(rootContractFiles);
const actualRootExports = collectExports(resolve(root, "src/index.ts"));
const unexpectedRootExports = [...actualRootExports]
    .filter((name) => !rootAllowed.has(name))
    .sort();
const missingRootExports = [...rootAllowed]
    .filter((name) => !actualRootExports.has(name))
    .sort();
const exportsMap = new Set(Object.keys(packageJson.exports ?? {}));

function walk(dir) {
    if (!existsSync(dir)) return [];
    const files = [];
    for (const entry of readdirSync(dir)) {
        if (ignoredDirs.has(entry)) continue;
        const full = join(dir, entry);
        const stats = statSync(full);
        if (stats.isDirectory()) {
            files.push(...walk(full));
        } else if (stats.isFile() && sourceExts.has(extname(full))) {
            files.push(full);
        }
    }
    return files;
}

function parseNamedImports(clause) {
    const named = clause.match(/\{([\s\S]*?)\}/);
    if (!named) return [];
    return named[1]
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => part.replace(/^type\s+/, ""))
        .map((part) => part.split(/\s+as\s+/)[0]?.trim())
        .filter(Boolean);
}

function parseImportDeclarations(source) {
    const declarations = [];
    const lines = source.split("\n");
    let current = null;

    function finish(index) {
        if (!current) return;
        const statement = current.lines.join("\n");
        const fromMatch = statement.match(/\sfrom\s+["']([^"']+)["']/);
        const sideEffectMatch = statement.match(/^import\s+["']([^"']+)["']/);
        const specifier = fromMatch?.[1] ?? sideEffectMatch?.[1];
        if (specifier) {
            declarations.push({
                statement,
                specifier,
                line: current.startLine,
            });
        }
        current = null;
    }

    lines.forEach((line, index) => {
        if (!current && !line.trimStart().startsWith("import ")) return;
        if (!current) {
            current = {
                startLine: index + 1,
                lines: [],
            };
        }
        current.lines.push(line);

        if (
            /\sfrom\s+["'][^"']+["']/.test(line) ||
            /^import\s+["'][^"']+["']/.test(line.trim())
        ) {
            finish(index);
        }
    });

    finish(lines.length);
    return declarations;
}

function lineNumber(source, index) {
    return source.slice(0, index).split("\n").length;
}

function scanFile(consumer, file) {
    const rel = file.slice(consumer.dir.length + 1);
    const source = readFileSync(file, "utf8");
    const failures = [];
    const cssPattern = /@(import|source)\s+(?:url\()?["']([^"']+)["']\)?/g;

    for (const declaration of parseImportDeclarations(source)) {
        const { specifier, line, statement } = declaration;
        if (specifier !== "@mkbabb/glass-ui") continue;
        const clause = statement
            .replace(/^import\s+/, "")
            .replace(/\sfrom\s+["']@mkbabb\/glass-ui["'][\s;]*$/, "")
            .trim();
        if (clause.startsWith("* as ")) {
            failures.push({
                file: rel,
                line,
                type: "root-namespace-import",
                message: "Root namespace imports hide public-surface drift.",
            });
            continue;
        }

        const named = parseNamedImports(clause);
        if (named.length === 0) {
            failures.push({
                file: rel,
                line,
                type: "root-default-import",
                message: "The package root has no default import contract.",
            });
            continue;
        }

        for (const name of named) {
            if (!rootAllowed.has(name)) {
                failures.push({
                    file: rel,
                    line,
                    type: "non-core-root-symbol",
                    symbol: name,
                    message: `${name} must import from an explicit @mkbabb/glass-ui subpath.`,
                });
            }
        }
    }

    for (const declaration of parseImportDeclarations(source)) {
        const { specifier, line } = declaration;
        if (specifier.includes("glass-ui/src")) {
            failures.push({
                file: rel,
                line,
                type: "source-relative-import",
                specifier,
                message: "Consumers must not import from glass-ui/src.",
            });
        }
        if (specifier.startsWith("@mkbabb/glass-ui/") && specifier !== "@mkbabb/glass-ui/styles") {
            const exportKey = `./${specifier.slice("@mkbabb/glass-ui/".length)}`;
            if (!exportsMap.has(exportKey)) {
                failures.push({
                    file: rel,
                    line,
                    type: "unknown-package-subpath",
                    specifier,
                    message: `${specifier} is not declared in package exports.`,
                });
            }
        }
    }

    for (const match of source.matchAll(cssPattern)) {
        const directive = match[1];
        const specifier = match[2];
        const line = lineNumber(source, match.index ?? 0);
        if (specifier.includes("glass-ui/src")) {
            failures.push({
                file: rel,
                line,
                type: "source-relative-style",
                specifier,
                message: "Style tooling must not source glass-ui/src from consumers.",
            });
        }
        if (
            directive === "import" &&
            specifier.includes("@mkbabb/glass-ui") &&
            specifier !== "@mkbabb/glass-ui/styles"
        ) {
            failures.push({
                file: rel,
                line,
                type: "invalid-style-path",
                directive,
                specifier,
                message: "The only public stylesheet path is @mkbabb/glass-ui/styles.",
            });
        }
    }

    return failures;
}

const results = consumers.map((consumer) => {
    const files = walk(consumer.dir);
    const failures = files.flatMap((file) => scanFile(consumer, file));
    return {
        consumer: consumer.id,
        path: consumer.dir,
        filesScanned: files.length,
        status: failures.length === 0 ? "pass" : "fail",
        failures,
    };
});

mkdirSync(dirname(artifactPath), { recursive: true });
writeFileSync(
    artifactPath,
    `${JSON.stringify(
            {
                generatedAt: new Date().toISOString(),
                rootContractFiles: rootContractFiles.map((file) => file.slice(root.length + 1)),
                rootAllowedSymbols: [...rootAllowed].sort(),
                actualRootExports: [...actualRootExports].sort(),
                rootSurfaceFailures: {
                    unexpectedRootExports,
                    missingRootExports,
                },
                consumers: results,
            },
        null,
        2,
    )}\n`,
);

const failed = results.filter((result) => result.failures.length > 0);
if (unexpectedRootExports.length > 0 || missingRootExports.length > 0 || failed.length > 0) {
    console.error(`Consumer static policy failed: ${artifactPath}`);
    for (const name of unexpectedRootExports) {
        console.error(`root-surface unexpected export ${name}`);
    }
    for (const name of missingRootExports) {
        console.error(`root-surface missing core export ${name}`);
    }
    for (const result of failed) {
        for (const failure of result.failures) {
            console.error(
                `${result.consumer}:${failure.file}:${failure.line} ${failure.type} ${failure.message}`,
            );
        }
    }
    process.exit(1);
}

console.log(`Consumer static policy passed: ${artifactPath}`);
