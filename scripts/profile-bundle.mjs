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
import { dirname, extname, join, resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import {
    gateArtifactPath,
    isSnapshot,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

// ROOT is the glass-ui repo root — sourced from constellation.mjs (the single
// constellation/path authority), not re-derived locally.
const root = ROOT;
// Pure-output artefact (AS.W2 inv-θ): the per-run profile JSON routes to the
// byte-stable `.cache/gates/W4-bundle-profile.json` by default; the existing
// GLASS_UI_BUNDLE_ARTIFACT env still overrides to a committed snapshot path.
// The run timestamp + timing fields (buildDurationMs/durationMs) are volatile —
// dropped from the cache artefact so a run leaves git status clean; only the
// gzip/raw byte measurements (the budget gate's POINT) persist, and those move
// only when the bundle actually changes.
const artifactPath = gateArtifactPath(
    "GLASS_UI_BUNDLE_ARTIFACT",
    "W4-bundle-profile",
);
// The companion markdown table is likewise pure output — route it beside the
// JSON in the cache by default (its own env override for a deliberate snapshot),
// so neither artefact re-dirties the committed K/audit tree per run.
const subpathMarkdownPath = resolve(
    process.env.GLASS_UI_SUBPATH_TABLE ??
        resolve(dirname(artifactPath), "W4-subpath-sizes.md"),
);
// D5 drift baseline — a COMMITTED, reviewed reference distinct from the
// ephemeral per-run profile (`artifactPath`). The gate READS this file; only
// a deliberate `--rebaseline` flag (or a `GLASS_UI_BUNDLE_BASELINE` override)
// WRITES it. Splitting read-baseline from write-profile is what makes drift a
// real measurement against the last reviewed point — the prior code read and
// wrote the same `artifactPath`, so every run gated against numbers it had
// just written (self-erasing baseline, drift structurally ~0%).
const baselinePath = resolve(
    process.env.GLASS_UI_BUNDLE_BASELINE ??
        resolve(root, "docs/tranches/AP/W4-bundle-profile.baseline.json"),
);
const startedAt = Date.now();

// Bundle budget — enforced via `npm run profile:budget` (passes --enforce).
// `npm run profile:bundle` keeps its measurement-only contract and prints the
// same report without exiting non-zero on FAIL.
//
// The JS key gates the root barrel `dist/glass-ui.js`; the CSS key gates the
// fully-resolved `dist/styles/index.css` consumer draw (the cascade @imports
// inlined — see combinedStylesDraw below), which is the real artifact a
// consumer's bundler resolves through `@import "@mkbabb/glass-ui/styles"`.
//
// CSS ceiling — re-based ONCE at AO.W4 (D4) against the measured
// post-consolidation resolved draw of dist/styles/index.css (gzip 74928 /
// raw 308645) plus ~10% tranche-close headroom (74928 × 1.10 ≈ 82421 →
// 82500). This retires the SFC-only 8650 ceiling that gated the wrong (tiny)
// dist/glass-ui.css fragment, and the N.W0→P.W0→P.W3→Q.W4 bump-at-every-close
// cadence that chased it: the gate now measures the real consumer artifact, so
// the ceiling is set against reality, not bumped per tranche.
//
// CSS ceiling re-based AGAIN at AQ.W7 (the sanctioned AQ-close rebase). The AQ
// tranche legitimately grew the CSS substrate against the platform-native
// modern-web swaps — W2 (color-scheme/light-dark mirror collapse/color-mix
// alpha), W3 (:has() selectors/.deferred-section/tokenized scrollbars), W4
// (form vocabulary), W5 (scroll-driven animations/@starting-style top-layer/
// View-Transitions grammar). Measured AQ-final resolved draw of
// dist/styles/index.css: gzip 87928 / raw 349789. Re-based at × 1.10 close
// headroom (87928 × 1.10 ≈ 96721 → 96800; 349789 × 1.10 ≈ 384768 → 385000),
// per the same set-against-reality methodology AO.W4 used — re-based ONCE at
// close, not bumped per wave.
// CSS ceiling re-based at AS.W5 (P9 — the build-independent component-utility
// ship). P9 emits glass-ui's own component-utility rules (rounded-panel,
// text-muted-foreground, h-full, the CVA variants, …) into the published
// dist/styles bundle so a consumer paints correctly with no `@source` glob (the
// constellation-wide silent-styling repair). components.css adds raw ≈ 57 KB /
// gzip ≈ 9 KB to the resolved draw → measured dist/styles/index.css gzip 97749 /
// raw 412097. Re-based with modest headroom (gzip 100000, raw 420000) — this is
// a ONE-TIME structural correctness addition, not per-wave creep.
// CSS ceiling re-based at AT.W6-dock-c (the dock VT/FLIP timing-parity slice).
// Minting `--dock-resize-spring` (the single source curve both engine paths of
// the dock layer-swap morph now consume) + its lean rationale in the three CSS
// rungs (tokens/dock/view-transition) lifts the measured resolved draw of
// dist/styles/index.css to gzip 99958 / raw 419727 — within the AS.W5 ceiling
// but with knife's-edge headroom (42 gzip bytes), too tight to survive a zlib
// drift across runners. Re-based against the measured reality with the same
// modest ~3% close headroom the prior re-bases used (gzip 99958 → 103000;
// raw 419727 → 432000) — a one-time conscious lift for a real feature landing,
// not per-wave creep.
const BUDGETS = {
    "dist/glass-ui.js": { raw: 190_000, gzip: 33_700 },
    "dist/styles/index.css": { raw: 432_000, gzip: 103_000 },
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
// The ONLY path that updates the committed D5 baseline. Without it the
// baseline is immutable across runs; with it, a human rebaselines + commits.
const rebaseline = args.has("--rebaseline");

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

// D5 (AO.W4; baseline split AP.W4) — per-subpath drift enforcement. Promote
// the subpathEntries table from informational to ENFORCED via a drift-%
// threshold against the COMMITTED `baselinePath` reference — a reviewed git
// object distinct from the ephemeral `artifactPath` profile this run writes.
// The gate reads the baseline; only `--rebaseline` updates it (AP.W4 split,
// retiring the self-erasing read-and-write-the-same-path no-op). Drift-% (not
// absolute per-chunk caps) flags a *regression* — an entry that grew
// unexpectedly — while letting legitimate growth re-baseline via a deliberate
// `--rebaseline` commit: one reviewed reference, one gate, no constant-per-
// chunk maintenance.
//
// Scope:
//   - ENTRY chunks only (kind "entry"). Shared leaves are content-hashed and
//     their names rotate per build, so they are not stable enough to drift-gate.
//   - MIN_GATED_GZIP floor (1024 = 1 KiB): skip drift on sub-1-KiB re-export
//     shim entries (configurator/command/…) so the gate spends enforcement on
//     the chunks that move payload (aurora, dock, glass-ui root, typewriter,
//     search, timeline) and does not flap on 200-byte shim noise.
//   - DRIFT_CEIL = 0.10 (10%, matching the tranche-close headroom convention).
//     FAIL a chunk when drift > DRIFT_CEIL.
//   - A baseline entry absent from current dist is a MISSING FAIL (a published
//     subpath vanished). A current entry absent from baseline is reported but
//     NOT failed (a new subpath — re-baseline to adopt it).
const DRIFT_CEIL = 0.1;
const MIN_GATED_GZIP = 1024;
const subpathReport = [];
let baselineEntries = new Map();
if (existsSync(baselinePath)) {
    try {
        const baseline = JSON.parse(readFileSync(baselinePath, "utf8"));
        for (const e of baseline.subpathTable ?? []) {
            if (e.kind === "entry") baselineEntries.set(e.name, e);
        }
    } catch {
        // A malformed/absent baseline leaves baselineEntries empty — D5 simply
        // reports every current entry as NEW (un-failed) until a baseline is
        // committed. The first canonical run writes the baseline the next run
        // drifts against.
    }
}
const currentEntries = new Map(
    subpathEntries.filter((e) => e.kind === "entry").map((e) => [e.name, e]),
);
for (const [name, base] of baselineEntries) {
    const cur = currentEntries.get(name);
    if (!cur) {
        subpathReport.push({
            name,
            status: "MISSING",
            gzip: null,
            baselineGzip: base.gzipBytes,
            drift: null,
        });
        anyBudgetExceeded = true;
        continue;
    }
    if (base.gzipBytes < MIN_GATED_GZIP) {
        subpathReport.push({
            name,
            status: "SKIP",
            gzip: cur.gzipBytes,
            baselineGzip: base.gzipBytes,
            drift: (cur.gzipBytes - base.gzipBytes) / base.gzipBytes,
        });
        continue;
    }
    const drift = (cur.gzipBytes - base.gzipBytes) / base.gzipBytes;
    const status = drift > DRIFT_CEIL ? "FAIL" : "PASS";
    if (status === "FAIL") anyBudgetExceeded = true;
    subpathReport.push({
        name,
        status,
        gzip: cur.gzipBytes,
        baselineGzip: base.gzipBytes,
        drift,
    });
}
for (const [name, cur] of currentEntries) {
    if (baselineEntries.has(name)) continue;
    subpathReport.push({
        name,
        status: "NEW",
        gzip: cur.gzipBytes,
        baselineGzip: null,
        drift: null,
    });
}

const profile = {
    generatedAt: snapshotStamp(),
    status: anyBudgetExceeded ? "fail" : "pass",
    command: budgetMode ? "npm run profile:budget" : "npm run profile:bundle",
    buildDurationMs,
    durationMs: Date.now() - startedAt,
    budgets: BUDGETS,
    budgetReport,
    subpathReport,
    totals,
    subpathTotals,
    subpathTable: subpathEntries,
    files,
};

// Ephemeral per-run profile — the informational artifact. NOT the baseline
// the next run reads (that is `baselinePath`, committed + `--rebaseline`-only).
// writeGateArtifact drops `generatedAt` + the volatile timing fields unless
// GATE_SNAPSHOT=1, so the default cache artefact is byte-stable run-to-run and
// only the gzip/raw budget measurements move it. The gate's POINT — those raw
// + gzip byte counts — stays in the artefact.
writeGateArtifact(artifactPath, profile, {
    volatile: ["buildDurationMs", "durationMs"],
});

// `--rebaseline` — the ONLY path that moves the committed D5 reference. A
// reviewed git mutation: a human runs `profile:budget -- --rebaseline` once
// against a canonical `npm run build` dist, then commits the result. The
// baseline carries the same shape the read path parses (`subpathTable`); it
// keeps a real `generatedAt` (a deliberate, reviewed snapshot regardless of
// GATE_SNAPSHOT) for provenance.
if (rebaseline) {
    mkdirSync(dirname(baselinePath), { recursive: true });
    const baselineProfile = {
        ...profile,
        generatedAt: new Date().toISOString(),
    };
    writeFileSync(baselinePath, `${JSON.stringify(baselineProfile, null, 2)}\n`);
    console.log(`D5 baseline rebased: ${baselinePath}`);
}

console.log(`Bundle profile written: ${artifactPath}`);

// Per-subpath gzipped-size table — published as a markdown artefact (so a
// consumer can read it from the repo / a release asset) AND echoed to stdout.
// Sorted largest-gzip first. The `kind` column flags whether the chunk is a
// publishable subpath ENTRY or a SHARED leaf pulled in transitively.
const fmtKiB = (n) => `${(n / 1024).toFixed(1)} KiB`;
const mdRows = subpathEntries.map(
    (e) =>
        `| \`dist/${e.name}\` | ${e.kind} | ${e.bytes} (${fmtKiB(e.bytes)}) | ${e.gzipBytes} (${fmtKiB(e.gzipBytes)}) |`,
);
// The `Generated …` provenance line is volatile — included only under
// GATE_SNAPSHOT so the default cache markdown is byte-stable run-to-run (same
// inv-θ discipline the JSON artefact follows).
const generatedLine = isSnapshot
    ? [`Generated ${snapshotStamp()} by \`scripts/profile-bundle.mjs\`.`]
    : ["Generated by `scripts/profile-bundle.mjs`."];
mkdirSync(dirname(subpathMarkdownPath), { recursive: true });
writeFileSync(
    subpathMarkdownPath,
    [
        "# Per-subpath gzipped-size table",
        "",
        ...generatedLine,
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

// Per-subpath drift report (D5). Same rg-friendly format as the budget report.
// SKIP rows (sub-1-KiB shim entries) and NEW rows (un-baselined subpaths) are
// informational; PASS/FAIL/MISSING are the gated verdicts.
console.log("");
console.log("Per-subpath drift report (entry chunks ≥ 1 KiB, drift vs baseline):");
const driftPct = (d) => `${d >= 0 ? "+" : ""}${(d * 100).toFixed(1)}%`;
for (const row of subpathReport) {
    if (row.status === "MISSING") {
        console.log(
            `  [MISSING] dist/${row.name} — gzip <absent> vs baseline ${row.baselineGzip}`,
        );
        continue;
    }
    if (row.status === "NEW") {
        console.log(
            `  [NEW] dist/${row.name} — gzip ${row.gzip} (no baseline — re-baseline to adopt)`,
        );
        continue;
    }
    if (row.status === "SKIP") {
        console.log(
            `  [SKIP] dist/${row.name} — gzip ${row.gzip} vs baseline ${row.baselineGzip} (below ${MIN_GATED_GZIP}-byte floor)`,
        );
        continue;
    }
    console.log(
        `  [${row.status}] dist/${row.name} — gzip ${row.gzip} vs baseline ${row.baselineGzip} (drift ${driftPct(row.drift)})`,
    );
}

if (budgetMode && anyBudgetExceeded) {
    console.error("");
    console.error("Bundle budget exceeded — see report above.");
    process.exit(1);
}
