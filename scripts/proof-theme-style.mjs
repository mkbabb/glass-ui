import tailwindcss from "@tailwindcss/vite";
import { build } from "vite";
import {
    existsSync,
    mkdirSync,
    readFileSync,
    readdirSync,
    rmSync,
    writeFileSync,
} from "node:fs";
import { basename, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../", import.meta.url)));
const auditDir = resolve(root, "docs/tranches/F/audit");
const artifactPath = resolve(
    process.env.GLASS_UI_THEME_ARTIFACT ?? resolve(auditDir, "W4-tailwind-theme-proof.json"),
);
const tmpRoot = resolve(root, ".tmp", `theme-style-proof-${Date.now()}`);
const srcDir = join(tmpRoot, "src");
const outDir = join(tmpRoot, "dist");
const startedAt = Date.now();

const probeClasses = [
    "text-admin-label",
    "text-display-1",
    "text-display-5",
    "font-display",
    "font-mono",
    "leading-display",
    "leading-body",
    "tracking-caps",
    "tracking-wide",
    "bg-gold",
    "text-gold",
    "shadow-card",
    "shadow-cartoon",
    "shadow-dock",
    "rounded-card",
    "rounded-dock",
    "z-dock",
    "z-popover",
    "ease-spring-snappy",
    "ease-apple",
    "duration-panel",
    "duration-fast",
    "blur-dock",
    "blur-glass-subtle",
    "max-w-2xl",
    "animate-dock-in",
    "animate-shimmer",
];

const cssAssertions = [
    ["text-display-1", "font-size: var(--text-display-1)"],
    ["font-display", "font-family: var(--font-display)"],
    ["leading-display", "line-height: var(--leading-display)"],
    ["tracking-caps", "letter-spacing: var(--tracking-caps)"],
    ["bg-gold", "background-color: var(--color-gold)"],
    ["shadow-card", "var(--shadow-cartoon)"],
    ["rounded-card", "border-radius: var(--radius-card)"],
    ["z-dock", "z-index: var(--z-index-dock)"],
    ["max-w-2xl", "max-width: var(--container-2xl)"],
    ["animate-dock-in", "animation: var(--animate-dock-in)"],
];

const forbiddenThemeNamespaces = [
    "--font-size-",
    "--font-family-",
    "--line-height-",
    "--letter-spacing-",
    "--transition-timing-function-",
];
const forbiddenLocalThemeEntries = [
    "--container-center",
    "--container-padding-x",
    "--font-size-base",
];
const retiredSourceTokens = [
    "--font-size-base",
    ".shadow-cartoon-sm-hover",
];

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function classRule(css, className) {
    const selector = `.${className.replaceAll(":", "\\:")}`;
    const match = css.match(new RegExp(`${escapeRegExp(selector)}\\s*\\{([^}]*)\\}`, "m"));
    return match?.[1] ?? null;
}

function cssFiles(dir) {
    if (!existsSync(dir)) return [];

    return collectFiles(dir).filter((file) => file.endsWith(".css"));
}

function collectFiles(dir) {
    if (!existsSync(dir)) return [];

    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) return collectFiles(full);
        if (entry.isFile()) return [full];
        return [];
    });
}

function readTheme() {
    return readFileSync(resolve(root, "src/styles/theme.css"), "utf8");
}

function staticChecks() {
    const theme = readTheme();
    const utilities = readFileSync(resolve(root, "src/styles/utilities.css"), "utf8");
    const sourceFiles = [
        ...collectFiles(resolve(root, "src")),
        ...collectFiles(resolve(root, "demo")),
    ].filter((file) => /\.(css|ts|vue)$/.test(file));
    const brittlePatterns = [
        ["broad :deep(*) selector", /:deep\(\s*\*\s*\)/g],
        ["raw z-50 stack utility", /\bz-50\b/g],
        ["transition all", /transition:\s*all\b/g],
        ["invalid density calc spacing", /calc\([^_\]\n]*\+var\(--density/g],
    ];
    const invalidNamespaces = forbiddenThemeNamespaces.filter((name) => theme.includes(name));
    const invalidThemeEntries = forbiddenLocalThemeEntries.filter((name) => theme.includes(name));
    const selfReferences = theme
        .split(/\r?\n/)
        .map((line, index) => ({ line: index + 1, text: line.trim() }))
        .filter(({ text }) => {
            const match = text.match(/^(--[a-z0-9-]+):\s*var\(\1\)\s*;/i);
            return Boolean(match);
        });
    const unresolvedUtilityTokens = [];

    if (utilities.includes("--shimmer-blue-")) {
        unresolvedUtilityTokens.push("--shimmer-blue-*");
    }

    const retiredTokenMatches = sourceFiles.flatMap((file) => {
        const text = readFileSync(file, "utf8");
        return retiredSourceTokens.flatMap((token) => {
            const matches = [];
            let index = text.indexOf(token);
            while (index !== -1) {
                matches.push({
                    file: file.slice(root.length + 1),
                    line: text.slice(0, index).split(/\r?\n/).length,
                    token,
                });
                index = text.indexOf(token, index + token.length);
            }
            return matches;
        });
    });

    const brittleMatches = sourceFiles.flatMap((file) => {
        const text = readFileSync(file, "utf8");
        return brittlePatterns.flatMap(([label, pattern]) => {
            const matches = [];
            let match;
            pattern.lastIndex = 0;
            while ((match = pattern.exec(text)) !== null) {
                const line = text.slice(0, match.index).split(/\r?\n/).length;
                matches.push({
                    file: file.slice(root.length + 1),
                    line,
                    label,
                    match: match[0],
                });
            }
            return matches;
        });
    });
    const dockScopedStyleBlocks = collectFiles(resolve(root, "src/components/custom/dock"))
        .filter((file) => file.endsWith(".vue"))
        .filter((file) => readFileSync(file, "utf8").includes("<style"))
        .map((file) => file.slice(root.length + 1));

    return {
        invalidNamespaces,
        invalidThemeEntries,
        selfReferences,
        unresolvedUtilityTokens,
        retiredTokenMatches,
        brittleMatches,
        dockScopedStyleBlocks,
    };
}

function writeProbeFiles() {
    mkdirSync(srcDir, { recursive: true });
    writeFileSync(
        join(tmpRoot, "index.html"),
        '<div id="app" class="theme-proof"></div><script type="module" src="/src/main.js"></script>\n',
    );
    writeFileSync(join(srcDir, "main.js"), 'import "./probe.css";\n');
    writeFileSync(
        join(srcDir, "probe.css"),
        [
            '@import "tailwindcss";',
            '@import "tw-animate-css";',
            `@import "${resolve(root, "src/styles/index.css")}";`,
            `@source inline("${probeClasses.join(" ")}");`,
            "",
        ].join("\n"),
    );
}

function writeArtifact(payload) {
    mkdirSync(basename(artifactPath) === artifactPath ? auditDir : resolve(artifactPath, ".."), {
        recursive: true,
    });
    writeFileSync(
        artifactPath,
        `${JSON.stringify(
            {
                generatedAt: new Date().toISOString(),
                durationMs: Date.now() - startedAt,
                ...payload,
            },
            null,
            2,
        )}\n`,
    );
}

async function run() {
    writeProbeFiles();

    const checks = staticChecks();
    const staticFailures = [
        ...checks.invalidNamespaces.map((name) => `invalid theme namespace ${name}`),
        ...checks.invalidThemeEntries.map((name) => `invalid local theme entry ${name}`),
        ...checks.selfReferences.map((entry) => `self-referential theme variable at line ${entry.line}: ${entry.text}`),
        ...checks.unresolvedUtilityTokens.map((name) => `unresolved utility token ${name}`),
        ...checks.retiredTokenMatches.map((entry) => `retired source token ${entry.token} at ${entry.file}:${entry.line}`),
        ...checks.brittleMatches.map((entry) => `${entry.label} at ${entry.file}:${entry.line}`),
        ...checks.dockScopedStyleBlocks.map((file) => `dock scoped style block remains in ${file}`),
    ];

    await build({
        root: tmpRoot,
        logLevel: "silent",
        plugins: [tailwindcss()],
        build: {
            outDir,
            emptyOutDir: true,
            minify: false,
            rollupOptions: {
                input: join(tmpRoot, "index.html"),
            },
        },
    });

    const files = cssFiles(outDir);
    const css = files.map((file) => readFileSync(file, "utf8")).join("\n");
    const classResults = probeClasses.map((className) => ({
        className,
        present: classRule(css, className) !== null,
    }));
    const assertionResults = cssAssertions.map(([className, fragment]) => {
        const rule = classRule(css, className);
        return {
            className,
            fragment,
            rule,
            pass: Boolean(rule?.includes(fragment)),
        };
    });
    const failures = [
        ...staticFailures,
        ...classResults
            .filter((result) => !result.present)
            .map((result) => `missing generated class .${result.className}`),
        ...assertionResults
            .filter((result) => !result.pass)
            .map((result) => `class .${result.className} does not contain ${result.fragment}`),
    ];

    writeArtifact({
        status: failures.length === 0 ? "pass" : "fail",
        command: "npm run proof:theme",
        tailwind: {
            probeClasses,
            classResults,
            assertionResults,
            cssBytes: Buffer.byteLength(css),
            files: files.map((file) => file.slice(tmpRoot.length + 1)),
        },
        staticChecks: checks,
        failures,
    });

    if (failures.length > 0) {
        throw new Error(`Theme/style proof failed:\n${failures.map((failure) => `- ${failure}`).join("\n")}`);
    }
}

try {
    await run();
    console.log(`Theme/style proof passed: ${artifactPath}`);
} finally {
    rmSync(tmpRoot, { recursive: true, force: true });
}
