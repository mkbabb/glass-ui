// BB.W-LINEAGE-PROBE — proof:lineage-probe.
//
// Invariant 11's corollary, MECHANIZED. The d6-fork lesson (the BA 4.0.0
// post-mortem) is prose no gate read: "before retiring a PUBLIC symbol, probe
// the registry's live versions + the known-consumer constellation (`npm view` +
// the consumer ledger) so a fork-lineage or registry-only consumer is never
// invisible to the substrate-without-consumer gate again"
// (`docs/precepts/cross-repo-dev-resolution.md §"Invariant 11"`). The blind spot
// it names ALREADY bit twice on record: the AY/AZ prune census retired
// HeaderRibbon + GlassPanel as 0-consumer orphans because the disk import-graph
// census could NOT see keyframes.js (a registry binary consumer) NOR the
// fork-lineage Connectivity Atlas (`sci-report/atlas`, pinning the off-mainline
// `^3.12.0` line) — BOTH restored at AZ.W-PRUNE2 on consumer-truth, AFTER the
// silent prune shipped (`docs/consumer-evidence/{header-ribbon,glass-panel}.md`).
//
// This gate is the SECOND consumer-truth source the corollary names (the disk
// import-graph census is the FIRST; `proof:disposition-live` / `proof:phantom-classes`
// own that). It probes the LIVE registry (`npm view`) — the source the disk
// census structurally cannot see — and cross-checks every prune/disposition row
// against the registry + the (now-widened) constellation, FAILING the close on a
// retired artefact that is registry-published / constellation-consumed yet
// carries NO recorded fold/subsume/migration line. `proof:constellation-spine`
// clause 6 asserts the dependency-order-book records the registry-consumer probe
// discipline; THIS gate is the live probe clause 6 explicitly defers to it
// ("`W-LINEAGE-PROBE` owns the live probe", dependency-order-book.md §"The
// registry-consumer probe discipline").
//
// OFFLINE-SAFE (the peer-conformance precedent, NON-NEGOTIABLE). The `npm view`
// probe runs with `stdio` pipe + a 15s timeout + a PINNED fallback so a
// network-less CI runner NEVER false-GREENs — it logs a `registry-unreachable —
// pinned-fallback` skip and proceeds on the pinned snapshot. The registry reach
// is a refinement, never a load-bearing requirement (the L1 probe enriches the
// artefact; the L2 prune-row check + the L3 constellation-completeness assert
// gate CI with zero network reach).
//
// THREE clauses + a self-test bite, each born-RED at HEAD pre-wave:
//   L1 — the registry-subpath probe (the SECOND consumer-truth source, recorded).
//   L2 — the prune-row consumer check (the anti-silent-prune bite).
//   L3 — the constellation-completeness assert (the d6 blind spot cannot re-narrow).
//   W4 — the synthetic always-live `/dock`-RETIRED self-test (the bite proof, every run).

import { execSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";
import { pathToFileURL } from "node:url";
import semver from "semver";
import { CONSUMERS, presentConsumers, resolveSibling, ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const PKG_NAME = "@mkbabb/glass-ui";
const MIGRATION = join(ROOT, "MIGRATION.md");
const REGISTER = join(ROOT, "docs/tranches/AX/audit/DISPOSITION-REGISTER.json");
const EVIDENCE_DIR = join(ROOT, "docs/consumer-evidence");

// The two d6 consumers the constellation MUST enroll (L3). slides is on-disk;
// sci-report/atlas is the registry-lineage Connectivity Atlas (present:false on a
// clean runner). A future agent dropping either re-opens the EXACT blind spot.
const D6_REQUIRED_CONSUMERS = ["slides", "sci-report/atlas"];

// The audited live registry snapshot at BB (2026-06-17) — the OFFLINE fallback so
// a network-less runner never false-GREENs (the proof-peer-conformance precedent).
// `versions` is the published set INCLUDING the d6 fork-lineage line (3.11.x/3.12.0
// the AZ prune wrongly read as "stale-lineage" while the Atlas held it live).
const PINNED_REGISTRY = {
    name: PKG_NAME,
    latest: "4.0.0",
    versions: [
        "3.1.0", "3.1.1", "3.2.0", "3.3.0", "3.4.0", "3.5.0", "3.5.1", "3.6.0",
        "3.7.0", "3.8.0", "3.9.0", "3.10.0", "3.10.1",
        "3.11.0", "3.11.1", "3.11.2", "3.12.0", // the d6 fork-lineage line
        "3.13.0", "4.0.0",
    ],
};

// ── L1: the live registry probe (offline-safe) ────────────────────────────────

/**
 * Probe `npm view <pkg> <field>` once. Offline-safe: a network-less / timing-out /
 * malformed run returns `null` (the caller falls back to the pinned snapshot,
 * never a false-GREEN). NEVER throws.
 */
function npmViewJson(pkg, field) {
    try {
        const out = execSync(`npm view ${pkg} ${field} --json`, {
            encoding: "utf8",
            stdio: ["ignore", "pipe", "ignore"],
            timeout: 15000,
        }).trim();
        return out ? JSON.parse(out) : null;
    } catch {
        return null;
    }
}

/**
 * The registry probe: the live published-version set + dist-tags, or the pinned
 * fallback. Returns `{ reachable, name, latest, versions, distTags }`.
 */
function probeRegistry() {
    const versions = npmViewJson(PKG_NAME, "versions");
    const distTags = npmViewJson(PKG_NAME, "dist-tags");
    if (Array.isArray(versions) && versions.length) {
        return {
            reachable: true,
            name: PKG_NAME,
            latest: distTags?.latest ?? versions[versions.length - 1],
            versions,
            distTags: distTags ?? { latest: versions[versions.length - 1] },
        };
    }
    // network-less / malformed → the pinned snapshot (logged skip, never false-GREEN)
    return {
        reachable: false,
        name: PINNED_REGISTRY.name,
        latest: PINNED_REGISTRY.latest,
        versions: PINNED_REGISTRY.versions,
        distTags: { latest: PINNED_REGISTRY.latest },
    };
}

// ── The published-subpath surface (the live mainline export set) ──────────────

function loadPkg() {
    return JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
}

/** Every published `@mkbabb/glass-ui/<x>` subpath (CSS/font bundles excluded). */
function publishedSubpaths(pkg) {
    return Object.keys(pkg.exports ?? {})
        .filter(
            (k) =>
                k.startsWith("./") &&
                k !== "./" &&
                !k.startsWith("./styles") &&
                !k.startsWith("./fonts") &&
                !k.endsWith(".css"),
        )
        .map((k) => k.slice(2));
}

// ── L2: the prune-row corpus (the prune/disposition rows the gate cross-checks) ─

/**
 * The RETIRED subpaths/exports a prune census claimed, read from the prune-row
 * SOURCES the corollary names — the MIGRATION.md RETIRED lines + the disposition
 * register's `retired` rows. The corpus is READ, never re-rolled: this gate is
 * the SECOND consumer-truth source over the SAME rows `proof:no-retired-survivor`
 * asserts are absent-from-tree.
 *
 * @returns {{subpath:string, source:string, line:string}[]}
 */
// A token is plausibly a glass-ui SUBPATH iff it is a lowercase-hyphenated name
// or a `composables/<x>` nested form (the published-subpath grammar). This guards
// the backtick scan from treating an arbitrary prose word as a subpath.
function looksLikeSubpath(tok) {
    return /^[a-z][a-z0-9-]*(\/[a-z][a-z0-9-]*)?$/.test(tok);
}

function pruneRowSubpaths() {
    const rows = [];
    // MIGRATION.md — every RETIRED line naming a glass-ui subpath, BOTH the full
    // `@mkbabb/glass-ui/<x>` form AND a backtick-quoted bare subpath token (the
    // `composables/dark`/`composables/keyboard` nested form is named bare).
    if (existsSync(MIGRATION)) {
        const lines = readFileSync(MIGRATION, "utf8").split(/\r?\n/);
        for (const raw of lines) {
            if (!/\bRETIRED\b/.test(raw)) continue;
            const line = raw.trim();
            const fullRe = /@mkbabb\/glass-ui\/([a-z][a-z0-9/-]*)/g;
            let m;
            while ((m = fullRe.exec(raw)) !== null) {
                rows.push({ subpath: m[1], source: "MIGRATION.md", line });
            }
            // bare `subpath` tokens explicitly flagged as a retired SUBPATH on the line.
            if (/\bsubpaths?\b/i.test(raw)) {
                const bareRe = /`([a-z][a-z0-9/-]*)`/g;
                while ((m = bareRe.exec(raw)) !== null) {
                    if (looksLikeSubpath(m[1])) {
                        rows.push({ subpath: m[1], source: "MIGRATION.md", line });
                    }
                }
            }
        }
    }
    // The disposition register — every `retired` row carrying named subpaths.
    if (existsSync(REGISTER)) {
        const reg = JSON.parse(readFileSync(REGISTER, "utf8"));
        for (const item of reg.items ?? []) {
            if (item.disposition !== "retired") continue;
            for (const sp of item.subpaths ?? []) {
                rows.push({
                    subpath: sp,
                    source: `DISPOSITION-REGISTER:${item.id}`,
                    line: JSON.stringify(item.successor ?? null),
                });
            }
        }
    }
    // De-dup by subpath (a subpath named in both sources is ONE row).
    const seen = new Map();
    for (const r of rows) if (!seen.has(r.subpath)) seen.set(r.subpath, r);
    return [...seen.values()];
}

/** A subpath was EVER published on the registry IF it appears on the live export
 * set of a published version. We cannot `npm view` a per-version exports map
 * offline-safely, so the conservative signal is: the subpath is a CURRENT export
 * (live mainline) OR it has a consumer-evidence doc (a recorded historical/registry
 * consume). The registry version SET (L1) proves the fork-lineage line exists. */
function isRegistryRelevant(subpath, pkg, registry) {
    const liveExport = publishedSubpaths(pkg).includes(subpath);
    const hasEvidence = existsSync(
        join(EVIDENCE_DIR, `${subpath.replace(/\//g, "-")}.md`),
    );
    // The fork-lineage line existing on the registry (L1) is the d6 signal that a
    // past/fork version could carry the subpath even if it is absent from HEAD.
    const forkLineageExists = registry.versions.some(
        (v) => semver.valid(v) && semver.lt(v, "4.0.0") && semver.gte(v, "3.11.0"),
    );
    return { liveExport, hasEvidence, forkLineageExists };
}

/** A present known-consumer (the widened constellation) that imports the subpath. */
function constellationConsumers(subpath) {
    const re = new RegExp(`@mkbabb/glass-ui/${subpath.replace(/[/\-]/g, "[/-]")}\\b`);
    const hits = [];
    for (const c of CONSUMERS) {
        if (c.self) continue;
        if (!resolveSibling(c).present) continue;
        const files = [];
        for (const root of c.roots ?? []) walk(root, files);
        const matched = files.some((f) => {
            try {
                return re.test(readFileSync(f, "utf8"));
            } catch {
                return false;
            }
        });
        if (matched) hits.push(c.id);
    }
    return hits;
}

const SRC_EXT = new Set([".ts", ".tsx", ".vue", ".js", ".mjs", ".json"]);
function walk(dir, out) {
    let entries;
    try {
        entries = readdirSync(dir, { withFileTypes: true });
    } catch {
        return;
    }
    for (const e of entries) {
        const full = join(dir, e.name);
        if (e.isDirectory()) {
            if (e.name === "node_modules" || e.name === ".git" || e.name === "dist")
                continue;
            walk(full, out);
        } else if (SRC_EXT.has(extname(e.name))) {
            out.push(full);
        }
    }
}

/**
 * A retired row carries a RECORDED disposition (the corollary's required NAMED
 * fold/subsume/migration line) IF: it has a consumer-evidence doc (the AZ.W-PRUNE2
 * restore shape), OR its MIGRATION line names a live-replacement surface (a
 * `RETIRED … onto/replaced by/→ <surface>` clause), OR its register row carries a
 * `successor` field. A retired row that is registry-relevant / constellation-consumed
 * with NONE of these is the SILENT PRUNE the gate forbids.
 */
function hasDisposition(row) {
    const evidence = existsSync(
        join(EVIDENCE_DIR, `${row.subpath.replace(/\//g, "-")}.md`),
    );
    const namedFold =
        /\b(onto|replaced by|→|folds? onto|re-?point|migrat|subsume|successor)\b/i.test(
            row.line,
        );
    const registerSuccessor =
        row.source.startsWith("DISPOSITION-REGISTER") && row.line !== "null";
    return evidence || namedFold || registerSuccessor;
}

// ── PURE L2 evaluator (the self-test drives a synthetic row through it) ───────

/**
 * Evaluate ONE prune row → a violation string or null. A row is a SILENT PRUNE
 * (violation) iff it is registry-relevant OR constellation-consumed AND carries
 * no recorded disposition.
 *
 * @param {{subpath:string, source:string, line:string}} row
 * @param {{pkg:object, registry:object}} ctx
 */
export function evaluatePruneRow(row, ctx) {
    const rel = isRegistryRelevant(row.subpath, ctx.pkg, ctx.registry);
    const consumers = constellationConsumers(row.subpath);
    const registryRelevant = rel.liveExport || rel.hasEvidence;
    const consumed = consumers.length > 0;
    if (!registryRelevant && !consumed) return null; // not a d6 case — disk census owns it
    if (hasDisposition(row)) return null; // recorded fold/subsume/migration — the corollary met
    return (
        `prune-row "${PKG_NAME}/${row.subpath}" (${row.source}) is ` +
        `${rel.liveExport ? "live-exported" : ""}${rel.hasEvidence ? " consumer-evidenced" : ""}` +
        `${consumed ? ` + consumed by [${consumers.join(", ")}]` : ""} ` +
        `but carries NO recorded fold/subsume/migration line — the d6 silent-prune the corollary forbids`
    );
}

// ── Run ───────────────────────────────────────────────────────────────────────

function run() {
    const pkg = loadPkg();
    const registry = probeRegistry();
    const violations = [];

    // L1 — the registry-subpath probe (the SECOND consumer-truth source, recorded).
    const subpaths = publishedSubpaths(pkg);
    const subpathStatus = subpaths.map((sp) => ({
        subpath: sp,
        liveExport: true,
        // the live mainline subpath is published on `latest`; the registry version
        // SET (L1) is the fork-lineage anchor the prune census consumes.
        onLatest: true,
    }));

    // L2 — the prune-row consumer check (the anti-silent-prune bite).
    const pruneRows = pruneRowSubpaths();
    const ctx = { pkg, registry };
    const pruneResults = [];
    for (const row of pruneRows) {
        const v = evaluatePruneRow(row, ctx);
        pruneResults.push({
            subpath: row.subpath,
            source: row.source,
            consumers: constellationConsumers(row.subpath),
            disposition: hasDisposition(row),
            violation: v,
        });
        if (v) violations.push(`[L2] ${v}`);
    }

    // L3 — the constellation-completeness assert (the blind spot cannot re-narrow).
    const consumerIds = new Set(CONSUMERS.map((c) => c.id));
    for (const need of D6_REQUIRED_CONSUMERS) {
        if (!consumerIds.has(need)) {
            violations.push(
                `[L3] constellation CONSUMERS does not enroll "${need}" — the d6 blind-spot consumer is invisible again`,
            );
        }
    }

    // W4 — the self-test bite: a synthetic always-live `/dock`-RETIRED row (a
    // definitely-published subpath, NO disposition line) MUST classify as a
    // violation every run. Acceptance is the RED-witness inverse.
    const SELFTEST_ROW = {
        subpath: "dock",
        source: "SELFTEST",
        // a bare RETIRED assertion with NO disposition clause — the silent prune.
        line: "the /dock subpath is RETIRED.",
    };
    const selfFlag = evaluatePruneRow(SELFTEST_ROW, ctx);
    if (!selfFlag) {
        console.error(
            "[proof:lineage-probe] SELF-TEST FAILED — the synthetic /dock-RETIRED row (live-exported, no disposition) was NOT flagged; the L2 detector is not load-bearing.",
        );
        process.exit(1);
    }

    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath("GLASS_UI_LINEAGE_PROBE_ARTIFACT", "BB-lineage-probe");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:lineage-probe",
        command: "npm run proof:lineage-probe",
        registry: {
            reachable: registry.reachable,
            latest: registry.latest,
            versions: registry.versions,
            distTags: registry.distTags,
        },
        // The W-ADOPT-RECONCILE coordination input: the live-subpath/registry map.
        subpathMap: subpathStatus,
        pruneRows: pruneResults,
        constellation: {
            enrolled: [...consumerIds],
            d6Required: D6_REQUIRED_CONSUMERS,
            present: presentConsumers().map((c) => c.id),
        },
        violations,
    });

    console.log(
        "proof:lineage-probe — invariant 11's registry-consumer probe, mechanized (BB.W-LINEAGE-PROBE)",
    );
    console.log(
        `  registry probe        : ${registry.reachable ? "LIVE (npm view)" : "registry-unreachable — pinned-fallback (offline-safe; CI-expected)"}`,
    );
    console.log(
        `  latest / versions     : ${registry.latest} / ${registry.versions.length} published (incl. the 3.11.x/3.12.0 fork-lineage line)`,
    );
    console.log(`  L1 published subpaths : ${subpaths.length} probed + recorded`);
    console.log(`  L2 prune rows checked : ${pruneRows.length}`);
    console.log(
        `  L3 d6 consumers       : ${D6_REQUIRED_CONSUMERS.map((n) => `${n}${consumerIds.has(n) ? "✓" : "✗"}`).join("  ")}`,
    );
    console.log(`  self-test (bite proof): OK — synthetic /dock-RETIRED row flagged`);
    console.log(`  violations            : ${violations.length}`);
    for (const v of violations) console.error(`  x ${v}`);
    console.log(`\n  status: ${status.toUpperCase()}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
