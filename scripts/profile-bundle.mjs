import { execFileSync } from "node:child_process";
import {
    existsSync,
    mkdirSync,
    readFileSync,
    readdirSync,
    statSync,
    writeFileSync,
} from "node:fs";
import { gzipSync } from "node:zlib";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../", import.meta.url)));
const auditDir = resolve(root, "docs/tranches/F/audit");
const artifactPath = resolve(process.env.GLASS_UI_BUNDLE_ARTIFACT ?? resolve(auditDir, "W1-bundle-profile.json"));
const startedAt = Date.now();

// Bundle budget — soft-fail in CI per I.W6 (tranche I invariant 8).
// Numbers chosen against W6 baseline (glass-ui.js raw 184_224 / gzip 35_980;
// glass-ui.css raw 39_174 / gzip 6_914) with ~9% raw / ~6% gzip headroom on
// the JS entry and ~7% raw / ~9% gzip headroom on the CSS entry. Hard-fail
// promotion is named for a future tranche per I.md cross-tranche-debt.
const BUDGETS = {
    "dist/glass-ui.js": { raw: 200_000, gzip: 38_000 },
    "dist/glass-ui.css": { raw: 42_000, gzip: 7_500 },
};

const skipBuild = process.env.GLASS_UI_BUDGET_SKIP_BUILD === "1";
const budgetMode = process.env.GLASS_UI_BUDGET_MODE === "1";

function walk(dir) {
    if (!existsSync(dir)) return [];
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) return walk(full);
        if (entry.isFile()) return [full];
        return [];
    });
}

function runBuild() {
    const started = Date.now();
    execFileSync("npm", ["run", "iter-build"], {
        cwd: root,
        stdio: "inherit",
        env: { ...process.env, npm_config_audit: "false", npm_config_fund: "false" },
    });
    return Date.now() - started;
}

const buildDurationMs = skipBuild ? 0 : runBuild();
const distRoot = resolve(root, "dist");
const files = walk(distRoot)
    .map((file) => {
        const contents = readFileSync(file);
        return {
            file: file.slice(root.length + 1),
            ext: extname(file) || "(none)",
            bytes: statSync(file).size,
            gzipBytes: gzipSync(contents).length,
        };
    })
    .sort((a, b) => b.bytes - a.bytes);

const totals = files.reduce(
    (acc, file) => {
        acc.bytes += file.bytes;
        acc.gzipBytes += file.gzipBytes;
        acc.byExt[file.ext] ??= { bytes: 0, gzipBytes: 0, files: 0 };
        acc.byExt[file.ext].bytes += file.bytes;
        acc.byExt[file.ext].gzipBytes += file.gzipBytes;
        acc.byExt[file.ext].files += 1;
        return acc;
    },
    { bytes: 0, gzipBytes: 0, byExt: {} },
);

// Budget evaluation — independent of artefact emission. Emits a per-file
// PASS/FAIL line and a final summary. Exits non-zero only when invoked
// via `profile:budget` (GLASS_UI_BUDGET_MODE=1) so `profile:bundle` keeps
// its measurement-only contract.
const budgetReport = [];
let anyBudgetExceeded = false;

for (const [path, budget] of Object.entries(BUDGETS)) {
    const entry = files.find((f) => f.file === path);
    if (!entry) {
        budgetReport.push({
            file: path,
            status: "MISSING",
            raw: null,
            gzip: null,
            budgetRaw: budget.raw,
            budgetGzip: budget.gzip,
        });
        anyBudgetExceeded = true;
        continue;
    }
    const rawOk = entry.bytes <= budget.raw;
    const gzipOk = entry.gzipBytes <= budget.gzip;
    const status = rawOk && gzipOk ? "PASS" : "FAIL";
    if (status === "FAIL") anyBudgetExceeded = true;
    budgetReport.push({
        file: path,
        status,
        raw: entry.bytes,
        gzip: entry.gzipBytes,
        budgetRaw: budget.raw,
        budgetGzip: budget.gzip,
        rawHeadroom: budget.raw - entry.bytes,
        gzipHeadroom: budget.gzip - entry.gzipBytes,
    });
}

mkdirSync(auditDir, { recursive: true });
writeFileSync(
    artifactPath,
    `${JSON.stringify(
        {
            generatedAt: new Date().toISOString(),
            status: anyBudgetExceeded ? "fail" : "pass",
            command: budgetMode ? "npm run profile:budget" : "npm run iter-build",
            buildDurationMs,
            durationMs: Date.now() - startedAt,
            budgets: BUDGETS,
            budgetReport,
            totals,
            files,
        },
        null,
        2,
    )}\n`,
);

console.log(`Bundle profile written: ${artifactPath}`);

// Print budget report. Always emitted (including from profile:bundle), but
// only profile:budget exits non-zero on FAIL. Format is rg-friendly so the
// CI log filter can pick it up without parsing JSON.
console.log("");
console.log("Bundle budget report:");
for (const row of budgetReport) {
    if (row.status === "MISSING") {
        console.log(`  [MISSING] ${row.file} — expected entry not in dist/`);
        continue;
    }
    const pct = (n, d) => `${((n / d) * 100).toFixed(1)}%`;
    console.log(
        `  [${row.status}] ${row.file} — raw ${row.raw} / ${row.budgetRaw} (${pct(row.raw, row.budgetRaw)}); gzip ${row.gzip} / ${row.budgetGzip} (${pct(row.gzip, row.budgetGzip)})`,
    );
}

if (budgetMode && anyBudgetExceeded) {
    console.error("");
    console.error("Bundle budget exceeded — see report above.");
    process.exit(1);
}
