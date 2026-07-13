// proof:stage-field-clamp — BI.W-STAGE-FIELD-CLAMP: the DockStage aurora field
// clamps its backing store to the VIEWPORT, not the full scroll column (PERF-3 /
// FAM-5). Born-RED at HEAD: the DockStage aurora canvas was `position: absolute;
// inset: 0` on the full ~2365px scroll column, so the Aurora ResizeObserver sized
// the backing store to 2036×4755 = 9.68MP (~3.9× the visible viewport) — pure
// over-provisioned GPU fill on a decorative backdrop of which only ~one viewport is
// ever visible. GREEN here: the field is sized to `100dvh` + `position: sticky`, so
// the backing store never exceeds ~2.5MP and the field pins to the viewport as the
// page scrolls (always painted; the offscreen column is never rasterized).
//
// This is the DEVICE-FREE SOURCE arm (the sizing MECHANISM). The BINDING backing-store
// MEASUREMENT (≤ ~2.5MP live on /dock/overview, both modes) is the π arm
// (tests-visual/stage-field-clamp.spec.ts) + the proof:ba-gestalt / gestalt-ledger
// dock verdict — a source-green/GPU-still-over-provisioned close is the exact class
// the π arm exists to catch.
//
// The three falsifiable SOURCE witnesses (each RED at HEAD except SF3, a library fact
// that was already intact), + a self-test bite:
//
//   SF1 — the field is VIEWPORT-CLAMPED, not scroll-column-sized. The
//         `.dock-stage-field` rule (the Aurora host) carries a viewport-height clamp
//         (`height: 100dvh` / `vh` / `svh` / `lvh`) and is NOT the full-column form
//         (`position: absolute` + `inset: 0`). A full-column-sized field REDs.
//
//   SF2 — the field stays VISIBLE UNDER SCROLL. The field carries `position: sticky`
//         (or `fixed`) so the viewport-sized backing store pins to the visible region;
//         AND the `.dock-stage` container clips with `overflow: clip` (NOT `hidden`) so
//         the sticky pin resolves against the outer `<main>` scroller instead of being
//         confined to (and frozen by) the stage box. A clamped-but-not-sticky field
//         (a blank backdrop once scrolled) REDs.
//
//   SF3 — the DPR clamp is intact (sub-2× wash). The library aurora sizes its decorative
//         wash at `AV_AURORA_DPR_MAX` (< 2) via `resolveAuroraWashDpr`, and the DockStage
//         does NOT override the DPR through its runtime options — so the clamp rides
//         through the viewport-sized field. A ≥2 wash ceiling (or a DockStage dprPolicy
//         override) REDs.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:stage-field-clamp";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Comment-blind: strip HTML/Vue/JS/CSS comments so a prose mention never false-hits.
const strip = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

// Extract the CSS body of the rule whose selector ends in `.dock-stage-field`
// (the Aurora host). `\s*\{` right after `field` excludes `.dock-stage-field-track`
// and `.dock-stage-field-column` (which carry `-track`/`-column` before the brace).
const fieldRuleBody = (dockStageCss) => {
    const m = dockStageCss.match(/\.dock-stage-field\s*\{([^}]*)\}/);
    return m ? m[1] : "";
};

// Extract the `.dock-stage` container rule body (the FIRST `.dock-stage {` block — the
// bare container selector, not `.dock-stage-field`/`.dock-stage-column`).
const stageContainerBody = (dockStageCss) => {
    const m = dockStageCss.match(/\.dock-stage\s*\{([^}]*)\}/);
    return m ? m[1] : "";
};

/**
 * Pure detector — takes the comment-stripped sources, returns per-witness facts.
 * Kept pure so the self-test can plant violations against a known-good baseline.
 */
function detect({ dockStage, budget, runtime }) {
    const facts = {};

    // ── SF1 — viewport-clamped, not scroll-column-sized ──────────────────────
    const fieldBody = fieldRuleBody(dockStage);
    const hasViewportHeight = /height\s*:\s*[^;]*\b\d[\d.]*(?:dvh|svh|lvh|vh)\b/.test(
        fieldBody,
    );
    const isFullColumn =
        /position\s*:\s*absolute/.test(fieldBody) && /inset\s*:\s*0\b/.test(fieldBody);
    facts.sf1 = {
        ok: fieldBody.length > 0 && hasViewportHeight && !isFullColumn,
        hasViewportHeight,
        isFullColumn,
    };

    // ── SF2 — visible under scroll (sticky/fixed + clip container) ────────────
    const isSticky = /position\s*:\s*(sticky|fixed)/.test(fieldBody);
    const containerBody = stageContainerBody(dockStage);
    const clipsNotHidden =
        /overflow\s*:\s*clip\b/.test(containerBody) &&
        !/overflow\s*:\s*hidden\b/.test(containerBody);
    facts.sf2 = { ok: isSticky && clipsNotHidden, isSticky, clipsNotHidden };

    // ── SF3 — DPR clamp intact (sub-2× wash), no DockStage override ───────────
    const washMax = Number(
        (budget.match(/AV_AURORA_DPR_MAX\s*=\s*([\d.]+)/) || [])[1] ?? NaN,
    );
    const washSub2 = Number.isFinite(washMax) && washMax < 2;
    const runtimeUsesWashDpr = /dprPolicy\s*:\s*resolveAuroraWashDpr\b/.test(runtime);
    // The DockStage must NOT thread a DPR override that escapes the wash clamp.
    const noDockStageDprOverride = !/dprPolicy/.test(dockStage);
    facts.sf3 = {
        ok: washSub2 && runtimeUsesWashDpr && noDockStageDprOverride,
        washMax,
        washSub2,
        runtimeUsesWashDpr,
        noDockStageDprOverride,
    };

    const violations = [];
    if (!facts.sf1.ok)
        violations.push(
            `SF1: the DockStage field is not viewport-clamped (has-100dvh=${facts.sf1.hasViewportHeight} is-full-column=${facts.sf1.isFullColumn}) — a scroll-column-sized field over-provisions the backing store (9.68MP)`,
        );
    if (!facts.sf2.ok)
        violations.push(
            `SF2: the field is not visible-under-scroll (sticky=${facts.sf2.isSticky} clip-not-hidden=${facts.sf2.clipsNotHidden}) — a clamped-but-scrolled-off field paints a blank backdrop, or overflow:hidden confines the sticky pin`,
        );
    if (!facts.sf3.ok)
        violations.push(
            `SF3: the sub-2× wash DPR clamp is not intact (AV_AURORA_DPR_MAX=${facts.sf3.washMax} <2=${facts.sf3.washSub2} runtime-uses-wash-dpr=${facts.sf3.runtimeUsesWashDpr} no-dockstage-override=${facts.sf3.noDockStageDprOverride})`,
        );

    return { facts, violations };
}

// ── self-test: each planted violation must RED its clause ─────────────────────
function selfTest() {
    const goodDockStage = `
.dock-stage { position: relative; isolation: isolate; border-radius: var(--radius-card); overflow: clip; }
.dock-stage-field-track { position: absolute; inset: 0; z-index: -1; pointer-events: none; }
.dock-stage .dock-stage-field { position: sticky; top: 0; display: block; height: 100dvh; width: 100%; pointer-events: none; }
`;
    const goodBudget = "export const AV_AURORA_DPR_MAX = 1.5;";
    const goodRuntime = "dprPolicy: resolveAuroraWashDpr,";
    const base = {
        dockStage: goodDockStage,
        budget: goodBudget,
        runtime: goodRuntime,
    };
    const bites = [];

    // Bite A — a planted SCROLL-COLUMN-SIZED field (absolute inset:0, no 100dvh) reds SF1.
    {
        const planted = goodDockStage.replace(
            ".dock-stage .dock-stage-field { position: sticky; top: 0; display: block; height: 100dvh; width: 100%; pointer-events: none; }",
            ".dock-stage-field { position: absolute; inset: 0; z-index: -1; pointer-events: none; }",
        );
        const { facts } = detect({ ...base, dockStage: planted });
        bites.push({ name: "SF1 scroll-column-sized field reds", reds: !facts.sf1.ok });
    }

    // Bite B — a NON-sticky field (clamped but scrolled off) reds SF2.
    {
        const planted = goodDockStage.replace("position: sticky;", "position: relative;");
        const { facts } = detect({ ...base, dockStage: planted });
        bites.push({ name: "SF2 non-sticky field reds", reds: !facts.sf2.ok });
    }

    // Bite C — an `overflow: hidden` container (confines the sticky pin) reds SF2.
    {
        const planted = goodDockStage.replace("overflow: clip;", "overflow: hidden;");
        const { facts } = detect({ ...base, dockStage: planted });
        bites.push({ name: "SF2 overflow:hidden container reds", reds: !facts.sf2.ok });
    }

    // Bite D — a ≥2 wash DPR ceiling reds SF3.
    {
        const { facts } = detect({
            ...base,
            budget: "export const AV_AURORA_DPR_MAX = 2;",
        });
        bites.push({ name: "SF3 DPR-2 wash ceiling reds", reds: !facts.sf3.ok });
    }

    // Bite E — a DockStage dprPolicy override (escapes the wash clamp) reds SF3.
    {
        const planted = goodDockStage + "\n/* :runtime-options={{ dprPolicy: 2 }} */";
        // strip() would remove a comment; simulate a live override in code, not a comment.
        const { facts } = detect({
            ...base,
            dockStage: goodDockStage + "\nconst opts = { dprPolicy: 2 };",
        });
        void planted;
        bites.push({ name: "SF3 DockStage dprPolicy override reds", reds: !facts.sf3.ok });
    }

    // Bite F — the GOOD shape passes ALL clauses (no false-positive floor).
    {
        const { violations } = detect(base);
        bites.push({ name: "good shape passes", reds: violations.length === 0 });
    }

    return bites;
}

function run() {
    const dockStage = strip(read("demo/stories/dock/DockStage.vue"));
    const budget = read("src/components/custom/aurora/constants/budget.ts");
    const runtime = read("src/components/custom/aurora/composables/runtime.ts");

    const { facts, violations } = detect({ dockStage, budget, runtime });

    const bites = selfTest();
    const biteFailures = bites.filter((b) => !b.reds);
    const selfTestOk = biteFailures.length === 0;

    // (z) — the π readback spec is wired (the BINDING close).
    const piSpecExists = existsSync(
        resolve(ROOT, "tests-visual/stage-field-clamp.spec.ts"),
    );

    const checks = [
        {
            id: "sf1-viewport-clamped",
            pass: facts.sf1.ok,
            detail: facts.sf1.ok
                ? "the DockStage field is viewport-clamped (`height: 100dvh`, not `position: absolute; inset: 0` on the full scroll column) — the Aurora ResizeObserver sizes the backing store to the viewport (~2.5MP), never the 9.68MP column"
                : violations.find((v) => v.startsWith("SF1")) ?? "SF1 failed",
        },
        {
            id: "sf2-visible-under-scroll",
            pass: facts.sf2.ok,
            detail: facts.sf2.ok
                ? "the field is `position: sticky` and the `.dock-stage` container clips with `overflow: clip` (not `hidden`) — the viewport-sized field pins to the outer `<main>` scroller so the visible region is always painted"
                : violations.find((v) => v.startsWith("SF2")) ?? "SF2 failed",
        },
        {
            id: "sf3-dpr-clamp-intact",
            pass: facts.sf3.ok,
            detail: facts.sf3.ok
                ? `the sub-2× wash DPR clamp rides through (AV_AURORA_DPR_MAX=${facts.sf3.washMax}, runtime uses resolveAuroraWashDpr, no DockStage dprPolicy override) — the viewport-sized field is quartered again by the 1.5× ceiling`
                : violations.find((v) => v.startsWith("SF3")) ?? "SF3 failed",
        },
        {
            id: "self-test-bites-red-or-pass",
            pass: selfTestOk,
            detail: selfTestOk
                ? `all ${bites.length} self-test bites behave (each planted violation REDs its clause; the good shape passes) — the detector is not hollow`
                : `self-test bite(s) did not behave: ${biteFailures.map((b) => b.name).join(", ")}`,
        },
        {
            id: "pi-readback-spec-exists",
            pass: piSpecExists,
            detail: piSpecExists
                ? "tests-visual/stage-field-clamp.spec.ts exists (the π readback: the live backing store ≤ ~2.5MP on /dock/overview + the field visible full-viewport under scroll, both modes — the BINDING close)"
                : "tests-visual/stage-field-clamp.spec.ts is MISSING — the binding backing-store measurement is unwired",
        },
    ];

    const failed = checks.filter((c) => !c.pass);
    const pass = failed.length === 0;

    console.log(
        "proof:stage-field-clamp — the DockStage aurora field clamps to the viewport, not the 9.68MP scroll column (BI.W-STAGE-FIELD-CLAMP / PERF-3)",
    );
    console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
    for (const c of checks)
        console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_STAGE_FIELD_CLAMP_ARTIFACT",
        "BI-stage-field-clamp",
    );
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status: pass ? "pass" : "fail",
        gate: "proof:stage-field-clamp",
        command: COMMAND,
        note: "DEVICE-FREE SOURCE arm — the viewport-clamp MECHANISM (100dvh + sticky + sub-2× DPR). The BINDING ≤2.5MP backing-store MEASUREMENT is tests-visual/stage-field-clamp.spec.ts (the π readback, LOCAL real-GPU) + the proof:ba-gestalt / gestalt-ledger dock verdict, never this gate alone.",
        checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
        selfTest: { bites, allBite: selfTestOk },
    });

    if (!pass) {
        console.error(`\n[proof:stage-field-clamp] ${failed.length} check(s) FAILED:`);
        for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
        process.exit(1);
    }
    console.log(
        "\n[proof:stage-field-clamp] the DockStage aurora backing store no longer over-provisions the offscreen scroll column — the decorative field is sized to the viewport (~2.5MP, down from 9.68MP), pinned under scroll so the visible region is always painted, at the sub-2× wash DPR. The π arm binds the live ≤2.5MP measurement.",
    );
}

run();
