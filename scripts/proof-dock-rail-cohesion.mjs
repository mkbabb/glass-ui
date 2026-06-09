#!/usr/bin/env node
// AY.W-DOCK2 (D5 / HG5) — proof:dock-rail-cohesion, the DockLayerGroup switcher-rail
// cohesion gate. The rail had THREE defects (H-dock §D7):
//   L1 — DOUBLE-indicator: `<TabsList class="dock-layer-rail">` mounted WITHOUT
//        `:indicator="false"`, so TabsList rendered its phantom default
//        `<TabsIndicator>` (the `bg-[var(--glass-bg-quiet)]` plate) AND the rail's
//        explicit `.dock-layer-tab-indicator` (the `--primary 15%` plate) both painted.
//   L2 — SECOND clock: `.dock-layer-tab-indicator` transitioned width/height/transform
//        on the fixed-linear `--dock-motion-resize` while the pane morphed on the live
//        `--dock-morph-t` spring (DK7 killed this pattern for the leaving-pane opacity
//        but left it alive on the rail).
//   L3 — VANISH on collapse: the rail lives inside the clipped `--full` pane.
//
// THIS GATE — a device-free SOURCE parse, fail-closed:
//   (a) single-indicator: `<TabsList class="dock-layer-rail" … :indicator="false">`
//       is present (born-RED on HEAD where it was absent).
//   (b) one-clock: `.dock-layer-tab-indicator`'s transition declaration carries NO
//       `--dock-motion-resize` (born-RED on HEAD).
//   (c) persistence: the rail is rendered OUTSIDE the `--full` clip (LANDED) OR a
//       `BOOKED: <wave-id>` marker + a successor is present near the rail block
//       (formal book, not a silent keep).
//
// The π twin (tests-visual/dock-rail-cohesion.spec.ts) asserts the rendered DOM
// carries exactly ONE `[data-slot="tabs-indicator"]` under `.dock-layer-rail`.
//
// House style mirrors the dock gates: ESM .mjs, byte-stable JSON artefact via
// gate-output, a human summary, process.exit(1) on a real violation.

import { resolve } from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const GROUP_VUE = "src/components/custom/dock/DockLayerGroup.vue";
const LAYER_GROUP_CSS = "src/styles/dock/layer-group.css";

// Slice the `<TabsList class="dock-layer-rail" … >` opening tag (attributes up to the
// first `>`). Robust to attribute reordering / multiline.
function railTabsListTag(group) {
    const m = group.match(/<TabsList\b[^>]*class="dock-layer-rail"[\s\S]*?>/);
    return m ? m[0] : null;
}

// Slice the `.dock-layer-rail .dock-layer-tab-indicator { … }` rule body.
function railIndicatorRule(css) {
    const m = css.match(
        /\.dock-layer-rail\s+\.dock-layer-tab-indicator\s*\{([\s\S]*?)\}/,
    );
    return m ? m[1] : null;
}

export function detectRailCohesion(sources) {
    const violations = [];
    const facts = {};

    const group = sources.dockLayerGroup ?? "";
    const css = sources.layerGroupCss ?? "";

    // (a) single-indicator — `:indicator="false"` on the rail TabsList.
    const tag = railTabsListTag(group);
    facts.railTabsListTagFound = !!tag;
    if (!tag) {
        violations.push(
            `${GROUP_VUE}: no \`<TabsList class="dock-layer-rail">\` mount found — the rail markup moved`,
        );
    } else {
        const single = /:indicator="false"/.test(tag);
        facts.indicatorFalse = single;
        if (!single) {
            violations.push(
                `${GROUP_VUE}: the rail \`<TabsList class="dock-layer-rail">\` does NOT carry \`:indicator="false"\` — TabsList renders its phantom DEFAULT <TabsIndicator> on top of the rail's explicit one (the DOUBLE-indicator, H-dock §D7 L1)`,
            );
        }
    }

    // (b) one-clock — NO --dock-motion-resize in the rail indicator transition.
    const rule = railIndicatorRule(css);
    facts.railIndicatorRuleFound = !!rule;
    if (!rule) {
        violations.push(
            `${LAYER_GROUP_CSS}: no \`.dock-layer-rail .dock-layer-tab-indicator\` rule found — the rail indicator style moved`,
        );
    } else {
        const secondClock = /--dock-motion-resize/.test(rule);
        facts.railSecondClock = secondClock;
        if (secondClock) {
            violations.push(
                `${LAYER_GROUP_CSS}: the rail indicator transition still rides \`--dock-motion-resize\` (the fixed-linear SECOND clock DK7 killed everywhere else) — re-point it onto the spring register (H-dock §D7 L2)`,
            );
        }
    }

    // (c) persistence — LANDED (rail outside the --full clip) OR a BOOKED: marker +
    // a successor wave-id near the rail block. The LAND test: the rail markup is a
    // sibling of the dock's structural chrome OUTSIDE the layer-group's clipped pane.
    // We accept the BOOK as the binding outcome here (a structural LAND is a GlassDock
    // carve, BOOKED to a successor); a silent keep (no marker) REDs.
    const booked = /BOOKED:\s*AY\.W-[A-Z0-9-]+/.test(group);
    const landed =
        // a persistent rail rendered outside the clipped pane would carry an explicit
        // persistence affordance class — none today, so LAND is the GlassDock-carve path.
        /class="dock-persistent-rail"/.test(group);
    facts.railPersistenceLanded = landed;
    facts.railPersistenceBooked = booked;
    if (!landed && !booked) {
        violations.push(
            `${GROUP_VUE}: rail collapse-persistence is neither LANDED (a rail outside the --full clip) nor BOOKED (a \`BOOKED: AY.W-…\` marker + successor near the rail block) — the rail vanishes on collapse SILENTLY (H-dock §D7 L3)`,
        );
    }

    return { facts, violations };
}

function readSources() {
    const read = (p) => {
        try {
            return readFileSync(resolve(ROOT, p), "utf8");
        } catch {
            return "";
        }
    };
    return {
        dockLayerGroup: read(GROUP_VUE),
        layerGroupCss: read(LAYER_GROUP_CSS),
    };
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_DOCK_RAIL_COHESION_ARTIFACT",
        "AY-dock-rail-cohesion",
    );
    const { facts, violations } = detectRailCohesion(readSources());
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:dock-rail-cohesion",
        facts,
        violations,
    });

    console.log("proof:dock-rail-cohesion — the DockLayerGroup rail one-clock + single-indicator + persistence (AY.W-DOCK2)");
    console.log(`  single-indicator (:indicator="false"): ${facts.indicatorFalse ?? "n/a"}`);
    console.log(`  one-clock (NO --dock-motion-resize)   : ${facts.railSecondClock === false ? true : facts.railSecondClock === true ? false : "n/a"}`);
    console.log(`  persistence landed / booked           : ${facts.railPersistenceLanded ?? false} / ${facts.railPersistenceBooked ?? false}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
