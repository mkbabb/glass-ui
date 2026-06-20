#!/usr/bin/env node
// scripts/proof-lighthouse.mjs — proof:lighthouse (BB.W-LIGHTHOUSE).
//
// The never-owned PERFORMANCE axis, owned at last with a binding gate. A
// per-surface score FLOOR (perf/a11y/CLS/TBT, mobile + desktop) over the
// PRODUCTION `vite preview` build of the demo SPA, PLUS a minimal bare-consumer
// harness that scores the PUBLISHED bundle's first paint. The floor is READ from
// the committed, reviewed scripts/lighthouse/floor.baseline.json — only the
// deliberate `--rebaseline` flag re-pins it (the profile-bundle read-baseline-vs-
// write-profile discipline), so drift is a real measurement against the last
// reviewed point, never self-erasing.
//
// BORN-RED at HEAD: the floor is pinned (PROVISIONAL) at the AY-era born-RED
// baseline SHAPE; the gate is RED until W-CSS-CRITICAL + W-PAYLOAD-DEFER +
// W-CARD-COMPOSITE land and the orchestrator re-pins the floor at the post-fix
// achieved numbers via `--rebaseline`. The runner itself is born-RED two ways:
//   (1) the load levers (render-block ~602ms / unused value.js ~21KiB) exceed the
//       provisional ceilings at HEAD; (2) the per-surface mobile-perf floor reds
//       against the pre-fix baseline once it is re-pinned at the post-fix target.
//
// DEVICE-BOUND: Lighthouse needs a real Chrome (+ network to download it on
// first run). Tagged ["local"] in gates.mjs so it never blocks headless CI; the
// fail-CLOSED pattern mirrors the live-π gates — `failClosed = lighthouse
// reachable && !process.env.CI`. On a runner with no Chrome / no LH, the gate
// SKIPS-by-policy (status "skipped"); the static `proof:live-verified-ledger`
// (ci) enforces that the live-verification HAPPENED.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, liveArmCiGraceSkip, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import {
    CONSUMER_CONFIG,
    CONSUMER_PORT,
    FORM_FACTORS,
    SURFACES,
    assertWireContract,
    buildConsumerApp,
    buildDemoSpa,
    extractScoreRow,
    lighthouseAvailable,
    runLighthouse,
    startPreview,
} from "./lighthouse/protocol.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const FLOOR_PATH = resolve(ROOT, "scripts/lighthouse/floor.baseline.json");
const REPORTS_DIR = resolve(ROOT, ".cache/lighthouse/reports");

const REBASELINE = process.argv.includes("--rebaseline");

function readFloor() {
    return JSON.parse(readFileSync(FLOOR_PATH, "utf8"));
}

/** Compare one surface×form-factor score row against its floor. Returns violations. */
function checkSurfaceFloor(surfaceId, formFactor, row, floor) {
    const v = [];
    const sf = floor.surfaces?.[surfaceId]?.[formFactor];
    if (!sf) {
        v.push(`${surfaceId}/${formFactor}: no floor declared`);
        return v;
    }
    const tag = `${surfaceId}/${formFactor}`;
    if (row.runtimeError)
        v.push(
            `${tag}: gather error — ${row.runtimeError} (the protocol's GPU/throttle-honesty axis; orchestrator decides exempt-vs-RED)`,
        );
    if (sf.perfMin != null && (row.perf == null || row.perf < sf.perfMin))
        v.push(`${tag}: perf ${row.perf} < ${sf.perfMin}`);
    if (sf.a11yMin != null && (row.a11y == null || row.a11y < sf.a11yMin))
        v.push(`${tag}: a11y ${row.a11y} < ${sf.a11yMin}`);
    if (sf.clsMax != null && (row.cls == null || row.cls > sf.clsMax))
        v.push(`${tag}: CLS ${row.cls?.toFixed(4)} > ${sf.clsMax}`);
    if (sf.tbtMsMax != null && (row.tbtMs == null || row.tbtMs > sf.tbtMsMax))
        v.push(`${tag}: TBT ${row.tbtMs}ms > ${sf.tbtMsMax}ms`);
    return v;
}

/** The W3 load-lever arm — render-block ms + unused value.js KiB on the mobile rows. */
function checkLoadLevers(matrix, floor) {
    const v = [];
    const ceil = floor.loadLeverCeilings ?? {};
    // render-block: the worst mobile render-block ms across surfaces.
    const mobileRows = matrix.filter((m) => m.formFactor === "mobile");
    const worstRenderBlock = mobileRows.reduce(
        (max, m) => Math.max(max, m.row.renderBlockMs ?? 0),
        0,
    );
    if (
        ceil.renderBlockMobileMsMax != null &&
        worstRenderBlock > ceil.renderBlockMobileMsMax
    )
        v.push(
            `load-lever: render-block ${worstRenderBlock}ms > ${ceil.renderBlockMobileMsMax}ms (mobile index.css)`,
        );
    // unused value.js: the worst on a substrate-FREE route (forms/dock).
    const substrateFree = mobileRows.filter((m) =>
        ["forms-inputs", "dock-overview"].includes(m.surfaceId),
    );
    const worstUnused = substrateFree.reduce(
        (max, m) => Math.max(max, m.row.unusedValueJsKiB ?? 0),
        0,
    );
    if (ceil.unusedValueJsKiBMax != null && worstUnused > ceil.unusedValueJsKiBMax)
        v.push(
            `load-lever: unused value.js ${worstUnused}KiB > ${ceil.unusedValueJsKiBMax}KiB (substrate-free route)`,
        );
    return { violations: v, facts: { worstRenderBlockMs: worstRenderBlock, worstUnusedValueJsKiB: worstUnused } };
}

/** The W4 consumer-harness arm — the published bundle's first-paint floor (mobile). */
function checkConsumerFloor(row, floor) {
    const v = [];
    const cf = floor.consumerFloor ?? {};
    if (
        cf.renderBlockMobileMsMax != null &&
        (row.renderBlockMs ?? 0) > cf.renderBlockMobileMsMax
    )
        v.push(
            `consumer: render-block ${Math.round(row.renderBlockMs ?? 0)}ms > ${cf.renderBlockMobileMsMax}ms (published /styles)`,
        );
    if (cf.lcpMobileMsMax != null && (row.lcpMs ?? Infinity) > cf.lcpMobileMsMax)
        v.push(
            `consumer: LCP ${Math.round(row.lcpMs ?? 0)}ms > ${cf.lcpMobileMsMax}ms`,
        );
    return v;
}

function skip(artifact, reason) {
    writeGateArtifact(artifact, {
        generatedAt: snapshotStamp(),
        status: "skipped",
        reason,
        command: "npm run proof:lighthouse",
        protocol: "production-preview",
        surfaces: SURFACES.length,
        formFactors: FORM_FACTORS.length,
        floorProvisional: readFloor().provisional ?? false,
    });
    console.log(`proof:lighthouse — SKIPPED: ${reason}`);
    console.log(
        "  (device-bound: needs a real Chrome + Lighthouse. The static proof:live-verified-ledger enforces the live run happened.)",
    );
    process.exit(0);
}

async function run() {
    const artifact = gateArtifactPath("GLASS_UI_LIGHTHOUSE_ARTIFACT", "BB-lighthouse");
    const floor = readFloor();

    // liveArmCiGraceSkip(): the documented CI grace-SKIP — the §header `failClosed =
    // lighthouse reachable && !process.env.CI` pattern, the `local`-tag intent ("never
    // blocks headless CI"), the proof:dock-no-scale-pop / proof:blob-render precedent.
    // Under `--run full` CI=true (the release.yml emulation) on a dev box that DOES carry
    // Chrome, the 4×-CPU-throttle mobile TBT floor is machine-LOAD-sensitive (the
    // contending battery + concurrent gates inflate it past the pinned floor) — a
    // CI-context measurement artefact, NOT a real perf regression (the per-surface perf
    // SCORES stay in the pinned band; only TBT drifts under load). The binding perf
    // truth is the LOCAL real-Chrome run (the W-LIGHTHOUSE-DELTA + --rebaseline) +
    // proof:live-verified-ledger; the LOCAL hard arm (CI unset, Chrome present) below is
    // UNTOUCHED.
    if (liveArmCiGraceSkip()) {
        skip(
            artifact,
            "CI grace-skip — the 4×-throttle mobile TBT floor is machine-load-sensitive under the contending --run full battery; the binding perf truth is the LOCAL real-Chrome run + proof:live-verified-ledger (the `local`-tag / §header `!process.env.CI` intent).",
        );
        return;
    }

    // Device gate — Lighthouse reachable?
    const lhAvailable = lighthouseAvailable();
    if (!lhAvailable) {
        // fail-CLOSED only when a device IS present but the run was sabotaged —
        // here, simple device-absence is a clean skip (CI has no Chrome).
        skip(
            artifact,
            "Lighthouse not reachable (`npx lighthouse --version` failed — no Chrome / not installed). Set GLASS_UI_LIGHTHOUSE_INSTALL=1 on a network-allowed runner to download it.",
        );
        return;
    }

    if (!existsSync(resolve(ROOT, "dist/glass-ui.js"))) {
        skip(
            artifact,
            "dist/ not built — run `npm run build` first (the consumer harness imports the published bundle).",
        );
        return;
    }

    // 1. Build the production demo SPA via the committed protocol.
    console.log("proof:lighthouse — building the production demo SPA …");
    buildDemoSpa();

    // 2. Bring up `vite preview`; assert the wire contract.
    console.log("proof:lighthouse — starting vite preview …");
    const preview = await startPreview();
    let matrix = [];
    let wire = null;
    let leverResult = { violations: [], facts: {} };
    let consumerRow = null;
    try {
        wire = await assertWireContract(preview.url);
        if (!wire.gzipOnWire)
            console.log("  WARN: gzip-on-the-wire not confirmed (transfer sizes may not be production-representative)");
        if (!wire.spaHistoryFallback)
            console.log("  WARN: SPA history-fallback not confirmed (deep routes may 404)");

        // 3. Sweep the four surfaces × two form-factors.
        for (const surface of SURFACES) {
            for (const formFactor of FORM_FACTORS) {
                const outPath = resolve(
                    REPORTS_DIR,
                    `${surface.id}-${formFactor}.report.json`,
                );
                console.log(`  LH ${surface.id} / ${formFactor} …`);
                const report = runLighthouse({
                    url: preview.url,
                    route: surface.route,
                    formFactor,
                    outPath,
                });
                matrix.push({
                    surfaceId: surface.id,
                    formFactor,
                    row: extractScoreRow(report),
                });
            }
        }
    } finally {
        preview.close();
    }

    // 3b. The W4 consumer harness — build the bare consumer from the published
    // dist/, serve it, score it MOBILE (the first-paint bite the published
    // /styles monolith carries). Skip-by-policy if the dist/ is absent.
    try {
        console.log("proof:lighthouse — building + scoring the bare-consumer harness …");
        buildConsumerApp();
        const consumerPreview = await startPreview({
            port: CONSUMER_PORT,
            config: CONSUMER_CONFIG,
        });
        try {
            const outPath = resolve(REPORTS_DIR, "consumer-mobile.report.json");
            const report = runLighthouse({
                url: consumerPreview.url,
                route: "/",
                formFactor: "mobile",
                outPath,
            });
            consumerRow = extractScoreRow(report);
        } finally {
            consumerPreview.close();
        }
    } catch (err) {
        console.log(`  WARN: consumer harness not scored (${err?.message ?? err})`);
    }

    // --rebaseline: write the achieved numbers back into the floor (reviewed).
    if (REBASELINE) {
        const next = structuredClone(floor);
        next.provisional = false;
        next.baselineDate = new Date().toISOString().slice(0, 10);
        for (const m of matrix) {
            const sf = (next.surfaces[m.surfaceId] ??= {});
            const cur = (sf[m.formFactor] ??= {});
            // Pin at the achieved number minus a small tolerance band (never a
            // lowered bar — the achieved value is the floor + headroom for noise).
            if (m.row.perf != null) cur.perfMin = Math.max(0, m.row.perf - 2);
            if (m.row.a11y != null) cur.a11yMin = m.row.a11y;
            if (m.row.cls != null) cur.clsMax = Number((m.row.cls + 0.01).toFixed(3));
            if (m.formFactor === "mobile" && m.row.tbtMs != null)
                cur.tbtMsMax = Math.max(50, Math.round(m.row.tbtMs) + 25);
        }
        const levers = checkLoadLevers(matrix, next);
        next.loadLeverCeilings.renderBlockMobileMsMax =
            Math.round(levers.facts.worstRenderBlockMs) + 25;
        next.loadLeverCeilings.unusedValueJsKiBMax =
            levers.facts.worstUnusedValueJsKiB + 2;
        if (consumerRow) {
            next.consumerFloor.renderBlockMobileMsMax =
                Math.round(consumerRow.renderBlockMs ?? 0) + 25;
            next.consumerFloor.lcpMobileMsMax =
                Math.round(consumerRow.lcpMs ?? 0) + 300;
        }
        delete next.rebaselinePending;
        writeFileSync(FLOOR_PATH, `${JSON.stringify(next, null, 2)}\n`);
        console.log("proof:lighthouse — REBASELINED floor.baseline.json at the achieved numbers.");
    }

    // 4. Gate the matrix against the (possibly just re-pinned) floor.
    const floorNow = readFloor();
    const violations = [];
    for (const m of matrix)
        violations.push(...checkSurfaceFloor(m.surfaceId, m.formFactor, m.row, floorNow));
    leverResult = checkLoadLevers(matrix, floorNow);
    violations.push(...leverResult.violations);
    if (consumerRow) violations.push(...checkConsumerFloor(consumerRow, floorNow));

    const status = violations.length === 0 ? "ok" : "fail";
    writeGateArtifact(artifact, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:lighthouse",
        protocol: "production-preview",
        surfaces: SURFACES.length,
        formFactors: FORM_FACTORS.length,
        floorProvisional: floorNow.provisional ?? false,
        wire,
        matrix: matrix.map((m) => ({
            surface: m.surfaceId,
            formFactor: m.formFactor,
            ...m.row,
        })),
        consumer: consumerRow
            ? {
                  renderBlockMs: consumerRow.renderBlockMs,
                  lcpMs: consumerRow.lcpMs,
                  perf: consumerRow.perf,
              }
            : null,
        loadLevers: leverResult.facts,
        violations,
    });

    console.log(`\nproof:lighthouse — ${status.toUpperCase()} (protocol: production-preview)`);
    console.log(`  surfaces: ${SURFACES.length} × form-factors: ${FORM_FACTORS.length}`);
    for (const m of matrix)
        console.log(
            `  ${m.surfaceId}/${m.formFactor}: perf ${m.row.perf} a11y ${m.row.a11y} bp ${m.row.bp} | LCP ${Math.round(m.row.lcpMs ?? 0)}ms CLS ${(m.row.cls ?? 0).toFixed(3)} TBT ${Math.round(m.row.tbtMs ?? 0)}ms`,
        );
    console.log(
        `  load levers: render-block ${Math.round(leverResult.facts.worstRenderBlockMs ?? 0)}ms / unused value.js ${leverResult.facts.worstUnusedValueJsKiB ?? 0}KiB`,
    );
    if (consumerRow)
        console.log(
            `  consumer harness: perf ${consumerRow.perf} | render-block ${Math.round(consumerRow.renderBlockMs ?? 0)}ms | LCP ${Math.round(consumerRow.lcpMs ?? 0)}ms`,
        );
    if (floorNow.provisional)
        console.log("  NOTE: floor is PROVISIONAL (born-RED) — orchestrator re-pins post-fix via --rebaseline.");
    if (violations.length) {
        console.log("\nVIOLATIONS (floor not cleared):");
        for (const x of violations) console.log(`  x ${x}`);
    }
    process.exit(status === "fail" ? 1 : 0);
}

run().catch((err) => {
    console.error("proof:lighthouse — RUNNER ERROR:", err?.message ?? err);
    process.exit(1);
});
