#!/usr/bin/env node

import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import ts from "typescript";

const auditDirectory = import.meta.dirname;
const boundsPath =
    "/Users/mkbabb/Programming/value.js/docs/tranches/V/vnext/CONSUMER-UNIVERSE-BOUNDS.json";
const bounds = JSON.parse(readFileSync(boundsPath, "utf8"));
const roots = [
    ...bounds.bounds.required_roots.map((root) => ({
        ...root,
        scope: "closed-universe",
    })),
    {
        id: "sci-active",
        canonical_realpath: "/Users/mkbabb/Programming/.p-totality/sci",
        scope: "operational-mirror",
    },
    {
        id: "atlas-working-mirror",
        canonical_realpath: "/Users/mkbabb/Programming/atlas",
        scope: "operational-mirror",
    },
    {
        id: "keyframes-working-mirror",
        canonical_realpath: "/Users/mkbabb/Programming/keyframes.js",
        scope: "operational-mirror",
    },
    {
        id: "oscilloscope-negative-control",
        canonical_realpath: "/Users/mkbabb/Programming/oscilloscope",
        scope: "negative-control",
    },
];
const codeExtensions = new Set([
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".mjs",
    ".cjs",
    ".vue",
    ".css",
    ".scss",
    ".sass",
    ".less",
]);
const ignoredPathParts = new Set([
    ".git",
    ".vnext",
    "build",
    "coverage",
    "dist",
    "docs",
    "node_modules",
    "playwright-report",
    "test-results",
    "tranches",
]);

function digest(value) {
    return createHash("sha256").update(value).digest("hex");
}

function git(root, args, fallback = "") {
    try {
        return execFileSync("git", ["-C", root, ...args], {
            encoding: "utf8",
            maxBuffer: 64 * 1024 * 1024,
            stdio: ["ignore", "pipe", "ignore"],
        }).trim();
    } catch {
        return fallback;
    }
}

function gitFiles(root) {
    const output = git(root, ["ls-files", "-co", "--exclude-standard", "-z"]);
    return output
        .split("\0")
        .filter(Boolean)
        .filter((path) => {
            const parts = path.split("/");
            return (
                codeExtensions.has(extname(path)) &&
                !parts.some((part) => ignoredPathParts.has(part))
            );
        });
}

function packageFiles(root) {
    return git(root, ["ls-files", "-co", "--exclude-standard", "-z"])
        .split("\0")
        .filter(
            (path) =>
                path === "package.json" ||
                (path.endsWith("/package.json") &&
                    path.split("/").length <= 4 &&
                    !path.split("/").some((part) => ignoredPathParts.has(part))),
        );
}

function manifestRows(root) {
    const rows = [];
    for (const path of packageFiles(root)) {
        try {
            const manifest = JSON.parse(readFileSync(join(root, path), "utf8"));
            for (const field of [
                "dependencies",
                "devDependencies",
                "peerDependencies",
                "optionalDependencies",
            ]) {
                const version = manifest[field]?.["@mkbabb/glass-ui"];
                if (version) rows.push({ path, package: manifest.name ?? null, field, version });
            }
        } catch {
            // A malformed manifest remains observable via the repository's own gates.
        }
    }
    return rows.sort(
        (left, right) =>
            left.path.localeCompare(right.path) || left.field.localeCompare(right.field),
    );
}

function referenceRows(root) {
    const rows = [];
    for (const path of gitFiles(root)) {
        let source;
        try {
            source = readFileSync(join(root, path), "utf8");
        } catch {
            continue;
        }
        const matches = [
            ...source.matchAll(
                /@mkbabb\/glass-ui(?:\/[A-Za-z0-9._~!$&'()*+,;=:@%/-]+)?/g,
            ),
        ].map((match) => match[0].replace(/[),.;:'"`]+$/, ""));
        if (matches.length === 0) continue;
        const counts = Object.entries(
            matches.reduce((accumulator, specifier) => {
                accumulator[specifier] = (accumulator[specifier] ?? 0) + 1;
                return accumulator;
            }, {}),
        )
            .sort(([left], [right]) => left.localeCompare(right))
            .map(([specifier, count]) => ({ specifier, count }));
        rows.push({ path, references: matches.length, specifiers: counts });
    }
    return rows.sort((left, right) => left.path.localeCompare(right.path));
}

function moduleSpecifierRows(root) {
    const rows = [];
    for (const path of gitFiles(root)) {
        let source;
        try {
            source = readFileSync(join(root, path), "utf8");
        } catch {
            continue;
        }
        const extension = extname(path);
        const specifiers = [];
        if ([".css", ".scss", ".sass", ".less"].includes(extension)) {
            const uncommented = source.replace(/\/\*[\s\S]*?\*\//g, "");
            for (const match of uncommented.matchAll(
                /@(?:import|use|forward)\s+(?:url\()?["']([^"']+)["']/g,
            )) {
                specifiers.push(match[1]);
            }
        } else {
            const preprocessed = ts.preProcessFile(source, true, true);
            for (const imported of preprocessed.importedFiles) {
                specifiers.push(imported.fileName);
            }
        }
        const glassSpecifiers = specifiers.filter(
            (specifier) =>
                specifier === "@mkbabb/glass-ui" ||
                specifier.startsWith("@mkbabb/glass-ui/"),
        );
        if (glassSpecifiers.length === 0) continue;
        const counts = Object.entries(
            glassSpecifiers.reduce((accumulator, specifier) => {
                accumulator[specifier] = (accumulator[specifier] ?? 0) + 1;
                return accumulator;
            }, {}),
        )
            .sort(([left], [right]) => left.localeCompare(right))
            .map(([specifier, count]) => ({ specifier, count }));
        rows.push({ path, edges: glassSpecifiers.length, specifiers: counts });
    }
    return rows.sort((left, right) => left.path.localeCompare(right.path));
}

function statusSummary(root) {
    const lines = git(root, ["status", "--porcelain=v1"])
        .split("\n")
        .filter(Boolean);
    const trackedDirty = lines.filter((line) => !line.startsWith("??")).length;
    const untracked = lines.filter((line) => line.startsWith("??")).length;
    const diff = git(root, ["diff", "--shortstat"]);
    return { trackedDirty, untracked, shortstat: diff || null };
}

const rootRows = roots.map((root) => {
    const path = root.canonical_realpath;
    if (!existsSync(path)) return { ...root, exists: false };
    const references = referenceRows(path);
    const moduleSpecifiers = moduleSpecifierRows(path);
    const specifiers = new Map();
    for (const file of moduleSpecifiers) {
        for (const row of file.specifiers) {
            specifiers.set(row.specifier, (specifiers.get(row.specifier) ?? 0) + row.count);
        }
    }
    return {
        ...root,
        exists: true,
        git: {
            head: git(path, ["rev-parse", "HEAD"], null),
            branch: git(path, ["branch", "--show-current"], null),
            latest: git(path, ["log", "-1", "--format=%aI%x09%s"], null),
            status: statusSummary(path),
        },
        manifestEdges: manifestRows(path),
        sourceImportFiles: moduleSpecifiers.length,
        sourceImportEdges: moduleSpecifiers.reduce((sum, file) => sum + file.edges, 0),
        sourceReferenceFiles: references.length,
        sourceReferences: references.reduce((sum, file) => sum + file.references, 0),
        sourceSpecifiers: [...specifiers.entries()]
            .sort(([left], [right]) => left.localeCompare(right))
            .map(([specifier, count]) => ({ specifier, count })),
        importFiles: moduleSpecifiers,
        referenceFiles: references,
    };
});

const ledger = {
    schema: "glass-ui-consumer-ledger/1",
    observedAt: new Date().toISOString(),
    authority: {
        boundsPath,
        boundsSha256: digest(readFileSync(boundsPath)),
        closedUniverseRoots: bounds.bounds.required_roots.length,
        typedSubpaths: bounds.bounds.required_paths,
        edgeScope: bounds.bounds.edge_scope,
    },
    notes: [
        "Closed-universe roots are copied literally from value.js V-next authority.",
        "Operational mirrors are current working copies relevant to live Browser evidence but do not replace the closed-universe authorities.",
        "Oscilloscope is retained only as a negative control for the stale historical roster entry.",
        "Import edges are static/dynamic ECMAScript module specifiers plus CSS-family import/use/forward specifiers.",
        "Textual references are retained separately because contract tests and build assertions participate in migration, but they are not called import edges.",
        "Code scans exclude docs, generated output, dependencies, and tranche records; tests remain included because they participate in migration.",
    ],
    roots: rootRows,
};
const receiptSource = JSON.stringify(ledger, null, 2);
ledger.ledgerSha256 = digest(receiptSource);
writeFileSync(join(auditDirectory, "CONSUMER-LEDGER.json"), `${JSON.stringify(ledger, null, 2)}\n`);

const rootTable = rootRows
    .map((root) => {
        if (!root.exists) {
            return `| \`${root.id}\` | \`${root.scope}\` | missing | — | — | — | — | — |`;
        }
        const versions =
            root.manifestEdges.length === 0
                ? "—"
                : [
                      ...new Set(
                          root.manifestEdges.map(({ field, version }) => `${field}: ${version}`),
                      ),
                  ].join("<br>");
        const state = `${root.git.status.trackedDirty} tracked / ${root.git.status.untracked} untracked`;
        return `| \`${root.id}\` | \`${root.scope}\` | \`${root.git.head?.slice(0, 10) ?? "—"}\` | ${versions} | ${root.sourceImportFiles} | ${root.sourceImportEdges} | ${root.sourceReferenceFiles}/${root.sourceReferences} | ${state} |`;
    })
    .join("\n");
const specifierRows = rootRows
    .filter((root) => root.exists && root.sourceSpecifiers?.length > 0)
    .map(
        (root) =>
            `| \`${root.id}\` | ${root.sourceSpecifiers.map(({ specifier, count }) => `\`${specifier}\` (${count})`).join("<br>")} |`,
    )
    .join("\n");
const requiredPathRows = bounds.bounds.required_paths
    .map(
        (path) =>
            `| \`${path.id}\` | \`${path.repository_root_id}\` | \`${path.canonical_realpath}\` |`,
    )
    .join("\n");

writeFileSync(
    join(auditDirectory, "CONSUMER-LEDGER.md"),
    `# Glass UI consumer constellation ledger

Observed: ${ledger.observedAt}

Receipt: \`${ledger.ledgerSha256}\`

## Scope correction

The migration universe and the visual-app universe are different sets. The
closed dependency universe is the value.js V-next bound of fifteen Git roots
plus six typed repository subpaths. The live visual audit covers twelve
logical application surfaces. Atlas is additionally a pure library relay. The current
\`sci\`, \`atlas\`, and \`keyframes.js\` working mirrors are recorded because they host
live work, but they do not silently replace the closed-universe authorities.
\`oscilloscope\` has no current Glass import or manifest edge and is a negative
control, not an application consumer.

## Root ledger

| Root | Scope | HEAD | Glass manifest declarations | Import files | Import edges | Text files/refs | Worktree |
| --- | --- | --- | --- | ---: | ---: | ---: | --- |
${rootTable}

Atlas's production census supplied by the active Atlas pass is 44 files / 73
edges / 29 subpaths. This ledger intentionally includes tests and therefore
adds \`tests/unit/oklch-stop-bridge.spec.ts\` as one file and one import edge:
45/74. The measures agree exactly after that scope distinction.

Active SCI agrees directly at 19 files / 30 edges / 12 subpaths. Pinned legacy
SCI's production census is 17/26/11; the ledger's 19/31 adds only the
two-file, five-edge \`scratch/bidsheet\` prototype. The measures again agree
after separating product and scratch.

## Typed subpaths bound by the closed universe

| Path ID | Owning root | Canonical path |
| --- | --- | --- |
${requiredPathRows}

## Direct module specifiers

| Root | Specifier counts |
| --- | --- |
${specifierRows || "| — | — |"}

## Interpretation law

- A zero direct source count does not prove vacuity; transitive and manifest
  edges remain part of the closed universe.
- Direct module edges and textual references are separate measures. A string
  in a public-surface test remains migration evidence but is not an import.
- A non-zero consumer count does not prove that a Glass sector deserves to
  survive. Worth requires a coherent responsibility and a superior library
  home.
- Export cuts are clean breaks. Consumers migrate once to the adjudicated
  subpath; there are no aliases, dual paths, migration shims, or masking
  fallbacks.
- \`CONSUMER-LEDGER.json\` retains every file and occurrence behind these
  aggregates.
`,
);

console.log(
    JSON.stringify(
        rootRows.map((root) => ({
            id: root.id,
            scope: root.scope,
            exists: root.exists,
            files: root.sourceReferenceFiles ?? 0,
            references: root.sourceReferences ?? 0,
            importFiles: root.sourceImportFiles ?? 0,
            importEdges: root.sourceImportEdges ?? 0,
            manifests: root.manifestEdges?.map(({ field, version }) => `${field}:${version}`) ?? [],
        })),
        null,
        2,
    ),
);
