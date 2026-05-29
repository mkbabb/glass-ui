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
// (P.W0 measurement). Bumped CSS budget to 42_000 raw / 7_400 gzip
// (≈ 10 % headroom over current draw) — superseded by the P.W3 baseline
// below.
//
// P.W3 close re-baseline (v1.8.0 substrate-promotion minor): Lane A's
// `glass-scrubber` Slider variant + Lane B's ProgressiveSidebar slotted-
// chassis split added scoped-CSS draw to the bundle. Current draw at HEAD:
// 40_882 raw / 7_396 gzip (97.3% raw, 99.9% gzip against the prior P.W0
// baseline — the gzip cap would FAIL on the next byte). Bumping CSS budget
// to 46_000 raw / 8_200 gzip (≈ 11% headroom raw + ≈ 11% headroom gzip)
// restores the canonical headroom without papering over the substrate
// promotions. The bump cadence (N.W0 → P.W0 → P.W3) is the canonical
// "tranche-close re-baseline against substrate additions" pattern per
// invariant-29 AB+1 retrospective discipline (codified at P.W6 close).
//
// Q.W4 close re-baseline (v1.9.1 patch — Q-sty-6): the post-P shadow
// cohort pushed CSS draw to 42_667 raw / 7_674 gzip (93.6% gzip — below
// the ε-thin threshold) without rebaselining the budget. Q.W4 Lanes A+B
// promoted the metric-stack + timeline-dot private token dialects into
// tokens.css §17 METRIC / §16 TIMELINE — net-additive on raw bytes (the
// declared defaults outweigh the shed SFC `var()` fallbacks). Settled
// post-W4 draw: 43_340 raw / 7_780 gzip. Rebaselining ONCE, post-token-
// promotion, to 48_000 raw / 8_650 gzip (≈ 10% headroom on both axes)
// per the canonical tranche-close cadence. The growth is load-bearing
// (token co-location is not deletable behaviour); REBASELINE not reduce.
const BUDGETS = {
    "dist/glass-ui.js": { raw: 190_000, gzip: 33_700 },
    // AO.W2 interim ceiling (inv α). The measured combined `dist/styles`
    // consumer draw is 80827 gzip; this sits ~10% above it. W4 (D4) re-bases
    // the constant precisely against the final post-consolidation cascade.
    "dist/styles/index.css": { raw: 360_000, gzip: 89_000 },
};

// AO.W2 (inv α) — the real consumer-draw CSS artifact.
// `@import "@mkbabb/glass-ui/styles"` resolves to dist/styles/index.css, which
// @imports the 17 sibling cascade rungs (./tokens.css …) AND the folded
// ../glass-ui.css (the AN.W1 SFC fold). Resolve ALL of them and gzip the
// concatenation — that is glass-ui's published /styles draw. A byte added to
// any cascade rung moves this number (the cascade arm is INSIDE the gate).
function combinedStylesDraw(distRoot) {
    const stylesDir = resolve(distRoot, "styles");
    const indexPath = resolve(stylesDir, "index.css");
    if (!existsSync(indexPath)) return null;
    let css = readFileSync(indexPath, "utf-8");
    // One-level resolve: ./*.css siblings + ../glass-ui.css both resolve under stylesDir.
    css = css.replace(/@import\s+["']([^"']+\.css)["'];?/g, (m, ref) => {
        const target = resolve(stylesDir, ref);
        return existsSync(target) ? `\n${readFileSync(target, "utf-8")}\n` : m;
    });
    return { raw: Buffer.byteLength(css), gzip: gzipSync(css).length };
}

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

// Per-subpath gzipped-size disclosure (gap 14). Every `dist/<name>.js` chunk
// is classified as a published library ENTRY (a subpath the consumer imports
// — `aurora.js`, `dock.js`, the root `glass-ui.js`, …) or a SHARED leaf (a
// Rolldown-extracted hashed chunk like `DialogContent-Cr7pJCiA.js` that
// several entries reference). The entry set is read authoritatively from the
// `package.json` exports' `import` targets — not pattern-matched — so a
// hyphenated subpath name (`glass-carousel`, `paper-backdrop`) is never
// mistaken for a content-hashed leaf. The split tells a consumer the cost of
// an import choice: the standalone weight of the subpath + whatever shared
// leaves it drags in. The data was already gzipped above (`:111`); this only
// surfaces it as a published table — additive + informational, it does NOT
// touch the glass-ui.js / glass-ui.css enforce gate.
const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
const entryFiles = new Set();
for (const cond of Object.values(pkg.exports ?? {})) {
    const target = cond && typeof cond === "object" ? cond.import : undefined;
    if (typeof target === "string" && target.endsWith(".js")) {
        entryFiles.add(target.replace(/^\.\//, ""));
    }
}
const distName = (f) => f.file.replace(/^dist\//, "");
const subpathEntries = files
    .filter((f) => f.ext === ".js" && f.file.startsWith("dist/"))
    .map((f) => ({
        name: distName(f),
        kind: entryFiles.has(f.file) ? "entry" : "shared",
        bytes: f.bytes,
        gzipBytes: f.gzipBytes,
    }))
    .sort((a, b) => b.gzipBytes - a.gzipBytes);

const subpathTotals = subpathEntries.reduce(
    (acc, e) => {
        acc[e.kind].bytes += e.bytes;
        acc[e.kind].gzipBytes += e.gzipBytes;
        acc[e.kind].files += 1;
        return acc;
    },
    {
        entry: { bytes: 0, gzipBytes: 0, files: 0 },
        shared: { bytes: 0, gzipBytes: 0, files: 0 },
    },
);

// Budget evaluation — independent of artefact emission. Emits a per-file
// PASS/FAIL line and a final summary. Exits non-zero only when --enforce
// (or GLASS_UI_BUDGET_MODE=1) is set, so `profile:bundle` keeps its
// measurement-only contract.
const budgetReport = [];
let anyBudgetExceeded = false;

for (const [path, budget] of Object.entries(BUDGETS)) {
    // AO.W2 (inv α) — the CSS key gates the resolved `dist/styles/index.css`
    // draw (cascade @imports inlined), not any single on-disk file. The JS
    // entry keeps the per-file `files.find` path. A null (file absent — the
    // footgun left no dist) fails closed, the same shape as a MISSING entry.
    const measured =
        path === "dist/styles/index.css"
            ? combinedStylesDraw(distRoot)
            : files.find((f) => f.file === path);
    const entry = measured
        ? { bytes: measured.bytes ?? measured.raw, gzipBytes: measured.gzipBytes ?? measured.gzip }
        : null;
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
            subpathTotals,
            subpathTable: subpathEntries,
            files,
        },
        null,
        2,
    )}\n`,
);

console.log(`Bundle profile written: ${artifactPath}`);

// Per-subpath gzipped-size table — published as a markdown artefact (so a
// consumer can read it from the repo / a release asset) AND echoed to stdout.
// Sorted largest-gzip first. The `kind` column flags whether the chunk is a
// publishable subpath ENTRY or a SHARED leaf pulled in transitively.
const fmtKiB = (n) => `${(n / 1024).toFixed(1)} KiB`;
const subpathMarkdownPath = resolve(auditDir, "W4-subpath-sizes.md");
const mdRows = subpathEntries.map(
    (e) =>
        `| \`dist/${e.name}\` | ${e.kind} | ${e.bytes} (${fmtKiB(e.bytes)}) | ${e.gzipBytes} (${fmtKiB(e.gzipBytes)}) |`,
);
writeFileSync(
    subpathMarkdownPath,
    [
        "# Per-subpath gzipped-size table",
        "",
        `Generated ${new Date().toISOString()} by \`scripts/profile-bundle.mjs\`.`,
        "Every `dist/*.js` chunk, sorted largest-gzip first. `entry` = a",
        "publishable subpath a consumer imports; `shared` = a Rolldown-extracted",
        "leaf several entries reference. Informational — not gated.",
        "",
        "| Chunk | Kind | Raw | Gzip |",
        "|---|---|---|---|",
        ...mdRows,
        "",
        `**Entries** — ${subpathTotals.entry.files} files, ${subpathTotals.entry.bytes} raw / ${subpathTotals.entry.gzipBytes} gzip.`,
        `**Shared** — ${subpathTotals.shared.files} files, ${subpathTotals.shared.bytes} raw / ${subpathTotals.shared.gzipBytes} gzip.`,
        "",
    ].join("\n"),
);
console.log(`Per-subpath size table written: ${subpathMarkdownPath}`);

console.log("");
console.log("Per-subpath gzipped-size table (largest gzip first):");
console.log(
    `  ${"chunk".padEnd(38)} ${"kind".padEnd(7)} ${"raw".padStart(10)} ${"gzip".padStart(10)}`,
);
for (const e of subpathEntries) {
    console.log(
        `  ${`dist/${e.name}`.padEnd(38)} ${e.kind.padEnd(7)} ${fmtKiB(e.bytes).padStart(10)} ${fmtKiB(e.gzipBytes).padStart(10)}`,
    );
}
console.log(
    `  ${"— entries".padEnd(38)} ${String(subpathTotals.entry.files).padEnd(7)} ${fmtKiB(subpathTotals.entry.bytes).padStart(10)} ${fmtKiB(subpathTotals.entry.gzipBytes).padStart(10)}`,
);
console.log(
    `  ${"— shared".padEnd(38)} ${String(subpathTotals.shared.files).padEnd(7)} ${fmtKiB(subpathTotals.shared.bytes).padStart(10)} ${fmtKiB(subpathTotals.shared.gzipBytes).padStart(10)}`,
);

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
