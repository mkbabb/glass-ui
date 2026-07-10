#!/usr/bin/env node
// BG.W-ROUTE-TRANSITION — proof:route-confounder, the route-swap-is-ONE-mechanism gate.
//
// The linchpin wave collapses the 4-mechanism route pile to a BARE KEYED ATOMIC SWAP:
//   <RouterView v-slot="{ Component }">
//     <component :is="Component" :key="route.path" class="route-enter" />
//   </RouterView>
// A keyed `<component>` unmounts the old + mounts the new in ONE patch (no <Transition>
// leave window to wedge, no `.scroll-build`×leave collision — the exact C-ROUTE root
// cause). This gate is the device-free source assert that the four confounding
// mechanisms are GONE and the bare swap + its on-mount `.route-enter` @keyframes are
// PRESENT — so a future edit cannot silently re-introduce the freeze class.
//
// The FOUR deleted confounders (each ABSENT in demo/shell/AppShell.vue):
//   1. the route page-enter `<Transition name="fade-slide">` wrapper,
//   2. the BD.W-SHELL-ROUTE-BLOOM find-child watch (`useBloomUp` + the
//      `section-landing-skeleton` rect it bloomed through),
//   3. the categoryId no-op `startViewTransition` + its dead `dataset.categorySwitch`
//      write (0 readers),
//   4. the matched-but-pending `<Skeleton>` branch + the no-match `<Card>` branch
//      (both dead — vue-router holds the old page through the async resolve, and the
//      `/:pathMatch` catch-all → NotFound makes `route.matched.length === 0`
//      unreachable).
//
// Comments are STRIPPED before scanning (the wave's own deletion-record comments name
// `useBloomUp`/`dataset.categorySwitch` — a naive substring scan would flag the prose,
// not live code). + an always-on self-test bite: a synthetic AppShell carrying any
// deleted mechanism MUST flag, a clean one MUST pass, a swap-less one MUST flag.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

// ── comment strip (HTML <!-- -->, JS /* */, and full-line // comments) ────────
export function stripComments(src) {
    let s = src
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/\/\*[\s\S]*?\*\//g, "");
    // Drop full-line `//` comments (the wave's deletion-record doc lines) — a trailing
    // inline `//` is not where a deleted mechanism lives, so line-leading is enough.
    s = s
        .split("\n")
        .filter((line) => !line.trim().startsWith("//"))
        .join("\n");
    return s;
}

// ── pure detector — exercised on real + synthetic inputs ─────────────────────
/**
 * @param {{ appShellSrc: string, transitionsCssSrc: string }} input
 * @returns {{clause: string, msg: string}[]}
 */
export function checkRouteConfounder({ appShellSrc, transitionsCssSrc }) {
    const violations = [];
    const code = stripComments(appShellSrc);

    // ── the four deleted confounders MUST be ABSENT ──
    if (/<Transition\s+name=["']fade-slide["']/.test(code)) {
        violations.push({
            clause: "C1",
            msg: 'the route page-enter `<Transition name="fade-slide">` wrapper survives — the bare keyed atomic swap must replace it (no leave window to wedge)',
        });
    }
    if (/\buseBloomUp\b/.test(code)) {
        violations.push({
            clause: "C2",
            msg: "the BD.W-SHELL-ROUTE-BLOOM `useBloomUp` find-child route-bloom survives in AppShell — only the leaf stays published; the AppShell usage must die",
        });
    }
    if (/section-landing-skeleton/.test(code) || /\bSectionLandingSkeleton\b/.test(code)) {
        violations.push({
            clause: "C2",
            msg: "the route-bloom `section-landing-skeleton` rect survives — the skeleton branch is dead (vue-router holds the old page through the async resolve)",
        });
    }
    if (/dataset\.categorySwitch/.test(code) || /document\.documentElement\.dataset\.categorySwitch/.test(code)) {
        violations.push({
            clause: "C3",
            msg: "the categoryId no-op `dataset.categorySwitch` view-transition write survives (0 readers) — a confounding mechanism the atomic swap makes redundant",
        });
    }
    if (/from\s+["'][^"']*\/components\/ui\/skeleton["']/.test(code)) {
        violations.push({
            clause: "C4",
            msg: "the `Skeleton` import survives — the matched-but-pending skeleton branch is deleted, so its import must go too",
        });
    }
    if (/v-(?:else-)?if=["'][^"']*route\.matched\.length/.test(code)) {
        violations.push({
            clause: "C4",
            msg: "a `route.matched.length` branch survives — the skeleton/no-match branch chain is replaced by the single keyed `<component>`",
        });
    }

    // ── the bare keyed atomic swap MUST be PRESENT ──
    const hasIs = /:is=["']Component["']/.test(code);
    const hasKey = /:key=["']route\.path["']/.test(code);
    const hasRouteEnter = /class=["'][^"']*\broute-enter\b/.test(code);
    if (!(hasIs && hasKey && hasRouteEnter)) {
        const missing = [
            !hasIs && ':is="Component"',
            !hasKey && ':key="route.path"',
            !hasRouteEnter && 'class="route-enter"',
        ].filter(Boolean);
        violations.push({
            clause: "P1",
            msg: `the bare keyed atomic swap <component :is="Component" :key="route.path" class="route-enter"/> is incomplete — missing ${missing.join(", ")}`,
        });
    }

    // ── the on-mount `.route-enter` @keyframes MUST be PRESENT (the liquid enter) ──
    const css = transitionsCssSrc;
    if (!/\.route-enter\s*\{/.test(css)) {
        violations.push({
            clause: "P2",
            msg: "the `.route-enter` recipe is missing from transitions.css — the keyed component's on-mount entrance has no rule",
        });
    }
    if (!/@keyframes\s+gl-route-enter\b/.test(css)) {
        violations.push({
            clause: "P2",
            msg: "`@keyframes gl-route-enter` is missing from transitions.css — the `.route-enter` recipe references a non-existent animation",
        });
    }

    return violations;
}

// ── the always-on self-test bite (the detector cannot silently no-op) ────────
function selfTest() {
    const failures = [];
    const cleanShell = `
<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
</script>
<template>
  <RouterView v-slot="{ Component }">
    <component :is="Component" :key="route.path" class="route-enter" />
  </RouterView>
</template>`;
    const cleanCss = `.route-enter { animation: gl-route-enter 1s; }
@keyframes gl-route-enter { from { opacity: 0; } to { opacity: 1; } }`;

    // Bite A — a clean tree MUST be violation-free.
    const a = checkRouteConfounder({ appShellSrc: cleanShell, transitionsCssSrc: cleanCss });
    if (a.length !== 0) {
        failures.push(`bite A: a sound shell falsely flagged ${a.length} violation(s): ${a.map((v) => v.clause).join(",")}`);
    }

    // Bite B (C1) — a surviving `<Transition name="fade-slide">` MUST flag.
    const b = checkRouteConfounder({
        appShellSrc: cleanShell.replace("<RouterView v-slot=\"{ Component }\">", "<RouterView v-slot=\"{ Component }\"><Transition name=\"fade-slide\">"),
        transitionsCssSrc: cleanCss,
    });
    if (!b.some((v) => v.clause === "C1")) failures.push("bite B: a surviving fade-slide <Transition> did NOT flag C1");

    // Bite C (C3) — a surviving `dataset.categorySwitch` write MUST flag.
    const c = checkRouteConfounder({
        appShellSrc: cleanShell + "\nconst x = () => { document.documentElement.dataset.categorySwitch = 'foundations'; };",
        transitionsCssSrc: cleanCss,
    });
    if (!c.some((v) => v.clause === "C3")) failures.push("bite C: a surviving dataset.categorySwitch write did NOT flag C3");

    // Bite D (C2) — a surviving useBloomUp route-bloom MUST flag.
    const d = checkRouteConfounder({
        appShellSrc: cleanShell + "\nimport { useBloomUp } from '@glass/composables/motion/useBloomUp';",
        transitionsCssSrc: cleanCss,
    });
    if (!d.some((v) => v.clause === "C2")) failures.push("bite D: a surviving useBloomUp did NOT flag C2");

    // Bite E (P1) — a swap-less shell (no keyed <component>) MUST flag.
    const e = checkRouteConfounder({
        appShellSrc: "<template><RouterView /></template>",
        transitionsCssSrc: cleanCss,
    });
    if (!e.some((v) => v.clause === "P1")) failures.push("bite E: a swap-less shell did NOT flag P1");

    // Bite F (P2) — a missing `.route-enter` @keyframes MUST flag.
    const f = checkRouteConfounder({ appShellSrc: cleanShell, transitionsCssSrc: ".route-enter { animation: none; }" });
    if (!f.some((v) => v.clause === "P2")) failures.push("bite F: a missing gl-route-enter @keyframes did NOT flag P2");

    // Bite G — the comment-strip is load-bearing: the wave's deletion-record comment
    // naming the deleted mechanisms must NOT false-flag a clean tree.
    const g = checkRouteConfounder({
        appShellSrc: cleanShell + "\n// the dead dataset.categorySwitch write + useBloomUp leaf are DELETED",
        transitionsCssSrc: cleanCss,
    });
    if (g.length !== 0) failures.push(`bite G: a clean tree with a deletion-record comment falsely flagged ${g.length} (comment strip broken)`);

    return failures;
}

function run() {
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_ROUTE_CONFOUNDER_ARTIFACT",
        "BG-route-confounder",
    );
    const violations = [];

    const appShellSrc = readFileSync(resolve(ROOT, "demo/shell/AppShell.vue"), "utf8");
    const transitionsCssSrc = readFileSync(resolve(ROOT, "src/styles/transitions.css"), "utf8");

    violations.push(...checkRouteConfounder({ appShellSrc, transitionsCssSrc }));

    const biteFailures = selfTest();
    for (const f of biteFailures) violations.push({ clause: "SELF-TEST", msg: f });

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:route-confounder",
        facts: {
            deletedConfoundersAbsent: !violations.some((v) => ["C1", "C2", "C3", "C4"].includes(v.clause)),
            bareKeyedSwapPresent: !violations.some((v) => v.clause === "P1"),
            routeEnterKeyframesPresent: !violations.some((v) => v.clause === "P2"),
            selfTestBites: biteFailures.length === 0 ? "7/7 GREEN" : biteFailures,
        },
        violations,
    });

    console.log("proof:route-confounder — the route swap is ONE bare keyed atomic mechanism (BG.W-ROUTE-TRANSITION)");
    console.log(`  deleted confounders absent : ${!violations.some((v) => ["C1", "C2", "C3", "C4"].includes(v.clause))}`);
    console.log(`  bare keyed swap present    : ${!violations.some((v) => v.clause === "P1")}`);
    console.log(`  .route-enter @keyframes    : ${!violations.some((v) => v.clause === "P2")}`);
    console.log(`  self-test bites            : ${biteFailures.length === 0 ? "7/7 GREEN" : `${biteFailures.length} FAILED`}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ [${v.clause}] ${v.msg}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
