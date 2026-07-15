import { spawnSync } from "node:child_process";
import {
    existsSync,
    mkdirSync,
    mkdtempSync,
    readFileSync,
    readdirSync,
    realpathSync,
    rmSync,
    writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, posix, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));

function run(command, args, cwd = root) {
    const result = spawnSync(command, args, {
        cwd,
        encoding: "utf8",
        env: { ...process.env, npm_config_update_notifier: "false" },
    });
    if (result.status !== 0) {
        throw new Error(
            `${command} ${args.join(" ")} failed:\n${result.stderr || result.stdout}`,
        );
    }
    return result.stdout.trim();
}

function packedTarget(path, files) {
    const target = path.replace(/^\.\//, "");
    if (!target.includes("*")) return files.has(target);
    const [prefix, suffix] = target.split("*");
    return [...files].some((file) => file.startsWith(prefix) && file.endsWith(suffix));
}

function resolvePackedReference(from, reference, files, extensions) {
    const clean = reference.trim().replace(/^['"]|['"]$/g, "").split(/[?#]/, 1)[0];
    if (!clean?.startsWith(".")) return null;
    const base = posix.normalize(posix.join(posix.dirname(from), clean));
    const candidates = [base, ...extensions.map((extension) => `${base}${extension}`)];
    if (base.endsWith(".js")) candidates.push(`${base.slice(0, -3)}.d.ts`);
    for (const extension of extensions) candidates.push(posix.join(base, `index${extension}`));
    return candidates.find((candidate) => files.has(candidate)) ?? false;
}

function validateDeclarations(entryFiles, files, failures) {
    const pending = [...entryFiles];
    const visited = new Set();
    while (pending.length > 0) {
        const file = pending.pop();
        if (!file || visited.has(file)) continue;
        visited.add(file);
        const source = readFileSync(resolve(root, file), "utf8");
        const imports = ts.preProcessFile(source, true, true);
        for (const { fileName } of [...imports.importedFiles, ...imports.referencedFiles]) {
            const resolved = resolvePackedReference(file, fileName, files, [".d.ts", ".d.mts", ".d.cts"]);
            if (resolved === false) failures.push(`${file}: unresolved declaration ${fileName}`);
            else if (resolved?.startsWith("dist/") && resolved.includes(".d.")) pending.push(resolved);
        }
    }
}

function validateCss(entryFiles, files, failures) {
    const pending = [...entryFiles];
    const visited = new Set();
    while (pending.length > 0) {
        const file = pending.pop();
        if (!file || visited.has(file)) continue;
        visited.add(file);
        const source = readFileSync(resolve(root, file), "utf8").replace(
            /url\(\s*(["'])data:[\s\S]*?\1\s*\)/g,
            "",
        );
        const imports = [...source.matchAll(
            /@import\s+(?:url\(\s*(?:"([^"]+)"|'([^']+)'|([^\s)]+))\s*\)|"([^"]+)"|'([^']+)')/g,
        )].map((match) => match.slice(1).find(Boolean));
        const urls = [...source.matchAll(/url\(\s*["']?([^"')\s]+)["']?\s*\)/g)];
        for (const reference of imports) {
            if (!reference.startsWith(".")) {
                failures.push(`${file}: non-relative CSS import ${reference}`);
                continue;
            }
            const resolved = resolvePackedReference(file, reference, files, [".css"]);
            if (resolved === false) failures.push(`${file}: unresolved CSS import ${reference}`);
            else if (resolved?.endsWith(".css")) pending.push(resolved);
        }
        for (const match of urls) {
            const reference = match[1];
            if (/^(?:[a-z][a-z+.-]*:|#|\/\/|\/|var\()/i.test(reference)) continue;
            const resolved = resolvePackedReference(
                file,
                reference.startsWith(".") ? reference : `./${reference}`,
                files,
                [],
            );
            if (resolved === false) failures.push(`${file}: unresolved CSS url ${reference}`);
        }
    }
}

function validatePackedConsumer(failures) {
    const dryRun = JSON.parse(
        run("npm", ["pack", "--dry-run", "--json", "--ignore-scripts", "--silent"]),
    )[0];
    const files = new Set(dryRun.files.map(({ path }) => path));
    const declarationEntries = [];
    const cssEntries = [];

    for (const [name, value] of Object.entries(pkg.exports ?? {})) {
        const targets = typeof value === "string" ? [value] : Object.values(value);
        for (const target of targets) {
            if (typeof target !== "string") continue;
            if (!packedTarget(target, files)) {
                failures.push(`${name}: packed artifact omits ${target}`);
                continue;
            }
            const path = target.replace(/^\.\//, "");
            if (path.endsWith(".d.ts")) declarationEntries.push(path);
            if (path.endsWith(".css")) cssEntries.push(path);
        }
    }

    for (const file of files) {
        if (/^(?:src|dist)\/subpaths(?:\/|$)/.test(file)) {
            failures.push(`Packed artifact contains retired mirror path: ${file}`);
        }
    }
    validateDeclarations(declarationEntries, files, failures);
    validateCss(cssEntries, files, failures);

    const tempRoot = mkdtempSync(resolve(tmpdir(), "glass-ui-package-proof-"));
    const consumer = resolve(tempRoot, "consumer");
    try {
        mkdirSync(consumer);
        const packed = JSON.parse(
            run("npm", [
                "pack",
                "--json",
                "--ignore-scripts",
                "--silent",
                "--pack-destination",
                tempRoot,
            ]),
        )[0];
        const tarball = resolve(tempRoot, packed.filename);
        writeFileSync(
            resolve(consumer, "package.json"),
            `${JSON.stringify({ name: "glass-ui-packed-proof", private: true, type: "module" }, null, 2)}\n`,
        );
        writeFileSync(
            resolve(consumer, "tsconfig.json"),
            `${JSON.stringify({
                compilerOptions: {
                    target: "ES2022",
                    module: "ESNext",
                    moduleResolution: "Bundler",
                    strict: true,
                    skipLibCheck: true,
                    lib: ["ES2023", "DOM"],
                    types: ["vite/client"],
                },
                include: ["main.ts", "env.d.ts"],
            }, null, 2)}\n`,
        );
        writeFileSync(
            resolve(consumer, "main.ts"),
            `import "@mkbabb/glass-ui/styles";\n` +
                `import { Button } from "@mkbabb/glass-ui";\n` +
                `import { useGlobalDark } from "@mkbabb/glass-ui/dark";\n` +
                `import { BLOB_CONFIG_DEFAULTS } from "@mkbabb/glass-ui/blob-config";\n` +
                `import { GlassDock } from "@mkbabb/glass-ui/dock";\n\n` +
                `document.body.dataset.packageProof = String([Button, useGlobalDark, BLOB_CONFIG_DEFAULTS, GlassDock].length);\n`,
        );
        writeFileSync(
            resolve(consumer, "env.d.ts"),
            'declare module "@mkbabb/glass-ui/styles";\n',
        );
        writeFileSync(
            resolve(consumer, "index.html"),
            '<!doctype html><html><body><script type="module" src="/main.ts"></script></body></html>\n',
        );
        writeFileSync(
            resolve(consumer, "vite.config.mjs"),
            'export default { logLevel: "error", build: { outDir: "dist", emptyOutDir: true } };\n',
        );
        const consumerTools = ["typescript", "vite", "@vueuse/core", "@mkbabb/keyframes.js", "@mkbabb/value.js"]
            .map((name) => `${name}@${pkg.devDependencies?.[name] ?? pkg.peerDependencies[name]}`);
        run("npm", [
            "install",
            "--ignore-scripts",
            "--no-save",
            "--package-lock=false",
            tarball,
            ...consumerTools,
        ], consumer);
        const installed = realpathSync(resolve(consumer, "node_modules", "@mkbabb", "glass-ui"));
        if (!installed.startsWith(`${realpathSync(consumer)}/`)) {
            failures.push("Packed consumer resolved the workspace package");
        }
        run("node", [resolve(consumer, "node_modules/typescript/bin/tsc"), "--noEmit", "-p", "tsconfig.json"], consumer);
        run("node", [resolve(consumer, "node_modules/vite/bin/vite.js"), "build", "--config", "vite.config.mjs"], consumer);
    } finally {
        rmSync(tempRoot, { recursive: true, force: true });
    }
}

const missing = [];
const failures = [];
const exportNames = Object.keys(pkg.exports ?? {});
const exportedTypeSubpaths = new Map();

for (const [name, value] of Object.entries(pkg.exports ?? {})) {
    if (name.includes("*")) {
        // A trailing `/*` directory wildcard exposes static assets (e.g.
        // `./fonts/*` → `./dist/fonts/*`, the self-referential @font-face url()
        // target the build resolves before inlining to base64). It is not a
        // type-bearing module, so it is exempt from the prohibition — verify
        // its base directory exists instead. Only module-pattern wildcards
        // (`*.js`, `*.ts`), which would break subpath type resolution, are
        // forbidden.
        const target = typeof value === "string" ? value : "";
        if (!target.endsWith("/*")) {
            failures.push(`Wildcard package export is not allowed: ${name}`);
            continue;
        }
        const baseDir = resolve(root, target.slice(0, -1));
        if (!existsSync(baseDir)) {
            missing.push(`${name}: ${target} (base dir absent)`);
        }
        continue;
    }

    if (typeof value === "string") {
        const target = resolve(root, value);
        if (!existsSync(target)) {
            missing.push(`${name}: ${value}`);
        }
        continue;
    }

    if (!value || typeof value !== "object" || Array.isArray(value)) {
        failures.push(`${name}: unsupported export target`);
        continue;
    }

    for (const key of ["types", "import"]) {
        if (typeof value[key] !== "string") continue;
        const target = resolve(root, value[key]);
        if (!existsSync(target)) {
            missing.push(`${name}.${key}: ${value[key]}`);
        }
    }

    if (typeof value.types !== "string") {
        failures.push(`${name}: missing types condition`);
    } else {
        exportedTypeSubpaths.set(name === "." ? "." : name.slice(2), value.types.replace(/^\.\//, ""));
    }

    if (typeof value.import !== "string") {
        failures.push(`${name}: missing import condition`);
    }
}

const typeVersions = pkg.typesVersions?.["*"] ?? {};
if (Object.hasOwn(typeVersions, "*")) {
    failures.push("typesVersions must not contain a catchall '*' shim");
}

for (const [subpath, target] of exportedTypeSubpaths) {
    if (subpath === ".") continue;
    const mapped = typeVersions[subpath];
    if (!Array.isArray(mapped) || mapped[0] !== target) {
        failures.push(`typesVersions.${subpath}: expected ${target}, found ${JSON.stringify(mapped)}`);
    }
}

const compilerOptions = {
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    target: ts.ScriptTarget.ES2022,
    strict: true,
    skipLibCheck: true,
    types: [],
};

const probeFile = resolve(root, ".tmp/package-probe.ts");
for (const exportName of exportNames) {
    // CSS-asset exports (the `./styles` bundle + the `./styles.css` alias) are
    // resolved by the consumer's CSS/bundler layer, not by TypeScript module
    // resolution — exempt them from the TS-resolvability probe.
    const exportValue = pkg.exports[exportName];
    const exportTarget =
        typeof exportValue === "string"
            ? exportValue
            : (exportValue?.import ?? exportValue?.default ?? "");
    // Asset exports — the `./styles` bundle, the `./styles.css` alias, and the
    // `./fonts/*` asset wildcard — are resolved by the consumer's CSS/bundler
    // layer, not TypeScript module resolution; exempt them from the TS probe.
    if (exportName === "./styles" || exportName.includes("*") || exportTarget.endsWith(".css"))
        continue;
    const specifier = exportName === "." ? pkg.name : `${pkg.name}/${exportName.slice(2)}`;
    const resolution = ts.resolveModuleName(specifier, probeFile, compilerOptions, ts.sys).resolvedModule;
    if (!resolution?.resolvedFileName || !existsSync(resolution.resolvedFileName)) {
        failures.push(`TypeScript cannot resolve ${specifier}`);
    }
}

const packable = new Set(["package.json", "README.md", "LICENSE"]);
for (const [name, value] of Object.entries(pkg.exports ?? {})) {
    if (typeof value === "string") {
        packable.add(value.replace(/^\.\//, ""));
        continue;
    }

    if (value && typeof value === "object" && !Array.isArray(value)) {
        for (const condition of ["types", "import"]) {
            if (typeof value[condition] === "string") {
                packable.add(value[condition].replace(/^\.\//, ""));
            }
        }
    }
}

for (const file of packable) {
    if (file.startsWith("src/") && !file.startsWith("src/styles/")) {
        failures.push(`Package export points at source file: ${file}`);
    }
}

const declarationFiles = existsSync(resolve(root, "dist"))
    ? readdirSync(resolve(root, "dist")).filter((file) => file.endsWith(".d.ts"))
    : [];
for (const file of declarationFiles) {
    const source = readFileSync(resolve(root, "dist", file), "utf8");
    if (source.includes("from 'vue-router'") || source.includes('from "vue-router"')) {
        failures.push(`${file}: declaration output must not import vue-router`);
    }
}

try {
    validatePackedConsumer(failures);
} catch (error) {
    failures.push(error instanceof Error ? error.message : String(error));
}

if (missing.length > 0) {
    console.error(`Missing package export targets:\n${missing.join("\n")}`);
    process.exit(1);
}

if (failures.length > 0) {
    console.error(`Invalid package export contract:\n${failures.join("\n")}`);
    process.exit(1);
}

console.log("Package exports, packed references, and the installed consumer build are valid.");
