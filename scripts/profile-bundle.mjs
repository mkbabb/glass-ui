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
const auditDir = resolve(root, "docs/tranches/K/audit");
const artifactPath = resolve(
    process.env.GLASS_UI_BUNDLE_ARTIFACT ??
        resolve(auditDir, "W4-bundle-profile.json"),
);
const startedAt = Date.now();

// Bundle budget — enforced via `npm run profile:budget` (passes --enforce).
// `npm run profile:bundle` keeps its measurement-only contract and prints the
// same report without exiting non-zero on FAIL.
//
// Numbers chosen against K W4 baseline (2026-05-09 build):
//   glass-ui.js   raw 146_129 / gz 25_928
//   glass-ui.css  raw  22_359 / gz  4_420
// with ~30% headroom per K invariant 12 + Rβ A13 disposition. Speedtest
// W3.perf.B.T5 (cn() refactor → v0.9.2) is expected to compress glass-ui.js
// by ~10–18 KB gz; the gate is intentionally re-baselined at K W8 close
// after that ship per K W4 sequencing.
//
// N.W0 re-baseline (v1.1.1): AB tranche shipped ~10 KB of load-bearing CSS
// (AB.W1.T1 `--chassis-max-block-size` token block; AB.W3.T1 Pulse aura
// recipe + `--animate-ambient-pulse-*` block; AB.W3.T2 Progress sectioned
// recipe + `--progress-sectioned-*` block; AB.W3 dock-shadow consumer
// canon) without re-baselining the budget at AB close — a precept gap the
// N.W0 audit-verdict spot-verification gate surfaces. Bumping CSS budget
// to 36_000 raw / 6_700 gzip (≈ 13 % headroom over current draw of
// 31_875 raw / 5_972 gzip) restores a passing gate without papering over
// the AB additions; future tranches re-baseline at their own close.
//
// P.W0 Lane C re-baseline (v1.7.0 ceremonial close): the AB+1 shadow-execution
// cohort (v1.5.0 → v1.7.0; speedtest AC.W6 + W8e driven) shipped CSS without
// re-baselining the budget at its tag boundaries — a recurrence of the AB
// gap the N.W0 audit caught. AC.W6b OFL font self-host face declarations,
// AC.W6c `--phase-color-label` cascade, AC.W6d timeline `::before` 44×44
// hit-area + MetricRow/MetricStack/AnimatedDigit styles, AC.W8e MetricCell +
// ResponsiveTabs + ToggleGroupItem card variant, plus the b8a61ec
// `--continuous-fill-opacity` cascade collectively grew CSS draw from
// 31_875 raw / 5_972 gzip (N.W0 baseline) to 38_006 raw / 7_096 gzip
// (P.W0 measurement). Bumping CSS budget to 42_000 raw / 7_400 gzip
// (≈ 10 % headroom over current draw) restores a passing gate without
// papering over the AB+1 additions. Future tranches re-baseline at their
// own close per the invariant-29 AB+1 retrospective discipline (codified at
// P.W6).
const BUDGETS = {
    "dist/glass-ui.js": { raw: 190_000, gzip: 33_700 },
    "dist/glass-ui.css": { raw: 42_000, gzip: 7_400 },
};

const args = new Set(process.argv.slice(2));
const skipBuild =
    args.has("--skip-build") || process.env.GLASS_UI_BUDGET_SKIP_BUILD === "1";
const budgetMode =
    args.has("--enforce") || process.env.GLASS_UI_BUDGET_MODE === "1";

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
// PASS/FAIL line and a final summary. Exits non-zero only when --enforce
// (or GLASS_UI_BUDGET_MODE=1) is set, so `profile:bundle` keeps its
// measurement-only contract.
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
            command: budgetMode ? "npm run profile:budget" : "npm run profile:bundle",
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
// only --enforce / profile:budget exits non-zero on FAIL. Format is
// rg-friendly so the CI log filter can pick it up without parsing JSON.
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
