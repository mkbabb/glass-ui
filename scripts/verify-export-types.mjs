import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));

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

if (missing.length > 0) {
    console.error(`Missing package export targets:\n${missing.join("\n")}`);
    process.exit(1);
}

if (failures.length > 0) {
    console.error(`Invalid package export contract:\n${failures.join("\n")}`);
    process.exit(1);
}

console.log("All package export targets and type resolutions are valid.");
