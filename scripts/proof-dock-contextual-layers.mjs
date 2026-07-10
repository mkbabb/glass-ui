#!/usr/bin/env node
// AZ.W-DOCK-CONTEXT — proof:dock-contextual-layers, the born-RED page-driven
// contextual dock-layer gate.
//
// The ONE wholly-absent facility the R3 gaps census found (E3G-7 / R3-14): docks
// consume ZERO page/route context. The layer registry (`DockLayerGroup` +
// `DockLayer` + provide/inject) exists and works; the gap is that layer membership
// was HAND-AUTHORED per story, never bound to the active route. This wave mints the
// route→layer seam (`useContextualDockLayers(route)` + the `dock-layer-contexts.ts`
// manifest) and wires the demo shell docks (SidebarDock + BottomDock) to render it,
// so the SAME dock surfaces a DIFFERENT layer set per route-context.
//
// This gate's device-free half (W1+W2) is a PURE static src-scan (no browser/GPU) —
// it runs + hard-REDs on EVERY runner. The live per-route swap (W3) is the binding
// observable but needs a served demo + real navigation, so it carries the
// dock-animation-live runner-truth disposition (local-only; CI grace-skips, the π
// DELTA closes under proof:live-verified-ledger).
//
// THREE clauses:
//   W1 — the seam exists AND is route-KEYED (GENERAL, not a 2-entry special-case).
//        `useContextualDockLayers` indexes its return off the route key
//        (`route.meta.categoryId`), and `dock-layer-contexts.ts`'s CONTEXT_LAYER_MAP
//        maps ≥3 DISTINCT manifest categories to distinct layer sets — so the gate's
//        2-route capture cannot be the WHOLE map. RED at HEAD: no such composable.
//        Anti-evasion: the composable must index off the route key (not a hardcoded
//        `if (route === A) … else if (B)` toggle), and the map must cover ≥3 keys.
//   W2 — the shell docks CONSUME it AND RENDER it. SidebarDock + BottomDock import
//        `useContextualDockLayers` AND bind its return to a `<DockLayerGroup>` /
//        `<DockLayer>` render (an import that is never rendered is a no-op decoy).
//        RED at HEAD: `grep useRoute|route.` over both shell docks is EMPTY.
//   W3 — the LIVE per-route layer swap on the SHELL docks (the binding observable).
//        Local-only. Navigating the shell dock between two route-contexts BY ROUTE
//        ALONE shows the active DockLayer set CHANGE. Closed by the π DELTA +
//        proof:live-verified-ledger; the device-free arms (W1+W2) gate on CI.
//
// Bite-check: collapse the map to a 2-entry hardcode → W1 RED; drop the
// <DockLayerGroup> render from a shell dock → W2 RED; revert the seam → all RED.

import { existsSync, readFileSync } from "node:fs";
import { resolve, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

// The minimum DISTINCT route-contexts the map must cover (≥3 so the live 2-route
// capture cannot be the whole map — a demo-of-two is not the page-aware facility).
const MIN_CONTEXTS = 3;

function stripComments(text, kind) {
    let out = text
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + " ".repeat(m.length - p1.length));
    if (kind === "vue") {
        out = out.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "));
    }
    return out;
}

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        // BH.F7 δ2-dock-layers-shell — demo/composables/ DISSOLVED; the route→layer
        // seam re-homed BESIDE its shell consumer (proof:demo CD2 asserts the move).
        // This reader gate FOLLOWS the carve into demo/shell/ (the "asserts follow the
        // composition into the carved leaf" precedent).
        COMPOSABLE: resolve(ROOT, "demo/shell/useContextualDockLayers.ts"),
        // BG.W-SHELL-DOCK-DRY — the shared facet-rail loop (the seam wire + the railItems
        // map) was factored out of both shell SFCs into this composable; the W2 asserts
        // FOLLOW the carve into it (the "asserts follow the composition into the carved
        // leaf" precedent).
        SHELL: resolve(ROOT, "demo/shell/useShellNavDock.ts"),
        MANIFEST: resolve(ROOT, "demo/stories/dock-layer-contexts.ts"),
        SIDEBAR: resolve(ROOT, "demo/layout/SidebarDock.vue"),
        BOTTOM: resolve(ROOT, "demo/layout/BottomDock.vue"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_DOCK_CONTEXTUAL_ARTIFACT",
            "AZ-dock-contextual-layers",
        ),
    };
    return _cliPaths;
}

/**
 * The PURE detector (FS-injected) — exported so the born-RED self-test can feed a
 * synthetic "collapse the map to a 2-entry hardcode" mutation and assert exit 1.
 *
 * @param {object} fs { composableText, manifestText, sidebarText, bottomText }
 *   (each `undefined` when the file is absent — the HEAD born-RED state)
 */
export function detectContextual(fs) {
    const violations = [];
    const facts = {};

    // ── W1 — the seam exists AND is route-KEYED (general, ≥3 contexts) ──
    const hasComposable = typeof fs.composableText === "string";
    const hasManifest = typeof fs.manifestText === "string";
    facts.composablePresent = hasComposable;
    facts.manifestPresent = hasManifest;

    if (!hasComposable) {
        violations.push(
            "W1: `demo/shell/useContextualDockLayers.ts` is absent — the route→layer seam does not exist (the R3-14 facility is unbuilt)",
        );
    }
    if (!hasManifest) {
        violations.push(
            "W1: `demo/stories/dock-layer-contexts.ts` is absent — the per-route-context layer manifest does not exist",
        );
    }

    if (hasComposable) {
        const comp = stripComments(fs.composableText, "code");
        // The composable must INDEX its return off the route key — read
        // `route.meta.categoryId` AND key the map with it (a bracket index
        // `CONTEXT_LAYER_MAP[<key>]`), NOT a hardcoded `if (route === A) … else if
        // (B)` toggle. We assert (a) it reads `route.meta.categoryId`, and (b) it
        // indexes the map by a variable key (the general route-indexed read).
        const readsRouteKey = /route\.meta\.categoryId/.test(comp);
        const indexesMapByKey =
            /CONTEXT_LAYER_MAP\s*\[\s*[a-zA-Z_$][\w$]*\s*\]/.test(comp);
        // The anti-evasion negative: a hardcoded 2-route if-chain branching on a
        // literal route/category equality is the demo-of-two shape W1 forbids.
        const hasHardcodedRouteBranch =
            /if\s*\([^)]*===\s*["'](foundations|substrates|forms|display|containers|navigation|dock|data|feedback|motion|compositions)["']/.test(
                comp,
            );
        facts.composableReadsRouteKey = readsRouteKey;
        facts.composableIndexesMapByKey = indexesMapByKey;
        facts.composableHasHardcodedRouteBranch = hasHardcodedRouteBranch;
        if (!readsRouteKey) {
            violations.push(
                "W1: `useContextualDockLayers` does not read `route.meta.categoryId` — the seam must be route-keyed off the manifest category, not route-blind",
            );
        }
        if (!indexesMapByKey) {
            violations.push(
                "W1: `useContextualDockLayers` does not index CONTEXT_LAYER_MAP by a route-derived KEY — the lookup must be a GENERAL route-indexed read (`MAP[categoryId]`), not a hardcoded branch",
            );
        }
        if (hasHardcodedRouteBranch) {
            violations.push(
                "W1: `useContextualDockLayers` carries a hardcoded `route === <category>` branch — the binding must be a general route→layer map, NOT a per-route special-case (the demo-of-two shape R3-14 forbids)",
            );
        }
    }

    if (hasManifest) {
        const man = stripComments(fs.manifestText, "code");
        // Count the DISTINCT top-level category keys in CONTEXT_LAYER_MAP. The map
        // is `export const CONTEXT_LAYER_MAP: Record<string, …> = { key: [...], … }`.
        const mapBlock = man.match(
            /CONTEXT_LAYER_MAP\s*:\s*Record<[^>]*>\s*=\s*\{([\s\S]*?)\n\};/,
        );
        const mapBody = mapBlock ? mapBlock[1] : "";
        // Top-level keys: a `word:` at indentation depth 1 (4 spaces) inside the
        // object literal — `    foundations: [`. We match `^    <key>:` lines.
        const keys = [
            ...mapBody.matchAll(/^\s{4}([a-zA-Z_$][\w$]*)\s*:\s*\[/gm),
        ].map((m) => m[1]);
        const distinctKeys = [...new Set(keys)];
        facts.contextMapKeys = distinctKeys.sort();
        facts.contextMapKeyCount = distinctKeys.length;
        if (distinctKeys.length < MIN_CONTEXTS) {
            violations.push(
                `W1: CONTEXT_LAYER_MAP covers ${distinctKeys.length} context(s) (<${MIN_CONTEXTS}) — the map must cover ≥${MIN_CONTEXTS} distinct route-contexts so the live 2-route capture cannot be the whole map (a demo-of-two is not the page-aware facility)`,
            );
        }
        // Each mapped context must carry a DISTINCT layer set (so two routes do not
        // alias the same layers). We assert ≥2 contexts carry a multi-layer set AND
        // that the layer-id tokens across contexts are not all identical (the map is
        // genuinely route-varying). A coarse witness: count distinct `id: "<x>"`
        // tokens inside the map body — a page-aware map has many distinct facet ids.
        const layerIds = [
            ...mapBody.matchAll(/\bid\s*:\s*["']([^"']+)["']/g),
        ].map((m) => m[1]);
        const distinctLayerIds = [...new Set(layerIds)];
        facts.distinctLayerIdCount = distinctLayerIds.length;
        if (distinctLayerIds.length < MIN_CONTEXTS) {
            violations.push(
                `W1: CONTEXT_LAYER_MAP exposes ${distinctLayerIds.length} distinct layer id(s) — the contexts must carry DISTINCT facet sets (a page-aware map varies its layers per route, not the same set re-keyed)`,
            );
        }
    }

    // ── W2 — the shell docks CONSUME it AND RENDER it ──
    // BG.W-SHELL-DOCK-DRY — the shared facet-rail loop (the `useContextualDockLayers`
    // wire + the `railItems = contextLayers.value.map(...)` map) was factored out of both
    // shell SFCs into the `useShellNavDock` composable. The W2 asserts FOLLOW the carve
    // into the leaf: a shell dock now CONSUMES the seam by importing `useShellNavDock`
    // (which wires it) + RENDERS it by destructuring `railItems` from that composable.
    // The legacy direct-in-SFC path stays accepted for any future in-dock consumer.
    const shellSrc =
        typeof fs.shellComposableText === "string"
            ? stripComments(fs.shellComposableText, "code")
            : "";
    const shellWiresSeam = /useContextualDockLayers/.test(shellSrc);
    const shellMapsRail = /railItems\b[\s\S]*?contextLayers(?:\.value)?\s*\.map\b/.test(
        shellSrc,
    );
    facts.shellComposablePresent = shellSrc.length > 0;
    facts.shellWiresSeam = shellWiresSeam;
    facts.shellMapsRail = shellMapsRail;
    for (const [name, text, key] of [
        ["SidebarDock.vue", fs.sidebarText, "sidebar"],
        ["BottomDock.vue", fs.bottomText, "bottom"],
    ]) {
        if (typeof text !== "string") {
            violations.push(`W2: \`demo/layout/${name}\` is absent — cannot witness the shell-dock consumer`);
            continue;
        }
        const live = stripComments(text, "vue");
        // (a) imports/consumes the seam — directly OR (BG.W-SHELL-DOCK-DRY) via the
        //     `useShellNavDock` composable that now wires it (follow-the-carve).
        const consumesViaShell = /useShellNavDock\b/.test(live) && shellWiresSeam;
        const importsSeam = /useContextualDockLayers/.test(live) || consumesViaShell;
        // (b) binds its return to a RENDERED contextual target driven by the layer
        //     set — NOT an import-only no-op decoy. AZ.W-RAIL3 MOVED the render target
        //     OUT of the dock body; BC.W-DOCK-STACK-RAIL then RETIRED the divider-carousel
        //     <DockRail> clean and rebuilt it as the macOS hover-expand <DockStack> (no
        //     alias). So a shell dock CONSUMES + RENDERS the seam via ANY of these targets:
        //       (i) the legacy in-dock <DockLayerGroup>/<DockLayer v-for in contextLayers>
        //           (preserved for any future in-dock consumer), OR
        //       (ii) the BC stack rail: a <DockStack … :items="…"> whose items are a
        //            computed mapped OVER the contextLayers (`contextLayers.value.map`)
        //            bound to a `railItems` descriptor — the box-INVIOLATE render target
        //            the shell now renders in GlassDock's #rail slot (v-model:selected).
        //     The anti-decoy intent is preserved: the contextual layer set must reach a
        //     rendered surface (group OR stack rail), never an unbound import.
        const rendersGroup =
            /<DockLayerGroup\b/.test(live) &&
            /<DockLayer\b[\s\S]*?v-for\s*=\s*["'][^"']*\bin\s+(contextLayers|layers)\b/.test(
                live,
            );
        const rendersStackRail =
            /<DockStack\b[\s\S]*?:items\s*=/.test(live) &&
            /contextLayers(?:\.value)?\s*\.map\b/.test(live);
        // W-NAV-DOCK-FIX moved the contextual render OUT of the dock body onto the
        // ALWAYS-EXPANDED facet rail (OUTSIDE the box): the seam return is mapped into a
        // `railItems` descriptor (`railItems = contextLayers.value.map(...)`) which reaches
        // a rendered surface BOTH as the `v-for in railItems` facet rail (the macOS-fan
        // <DockStack>/the role="tablist" chips) AND a `<DockSection :sections>` grouping
        // carrying it. The anti-decoy intent holds: the contextLayers must reach a rendered
        // surface via the railItems descriptor (never an unbound import).
        const seamMappedToRail =
            /railItems\b[\s\S]*?contextLayers(?:\.value)?\s*\.map\b/.test(live) ||
            // BG.W-SHELL-DOCK-DRY — the map now lives in `useShellNavDock`; the SFC
            // destructures the mapped `railItems` off it (follow-the-carve).
            (/useShellNavDock\b/.test(live) && shellMapsRail && /\brailItems\b/.test(live));
        const railItemsRendered =
            /v-for\s*=\s*["'][^"']*\bin\s+railItems\b/.test(live) ||
            (/<DockSection\b[\s\S]*?:sections\s*=/.test(live) && /layers:\s*railItems(?:\.value)?/.test(live));
        const rendersFacetRail = seamMappedToRail && railItemsRendered;
        const rendersContextual = rendersGroup || rendersStackRail || rendersFacetRail;
        facts[`${key}ImportsSeam`] = importsSeam;
        facts[`${key}RendersGroup`] = rendersGroup;
        facts[`${key}RendersStackRail`] = rendersStackRail;
        facts[`${key}RendersFacetRail`] = rendersFacetRail;
        facts[`${key}RendersContextual`] = rendersContextual;
        if (!importsSeam) {
            violations.push(
                `W2: \`${name}\` does not consume \`useContextualDockLayers\` (directly or via the \`useShellNavDock\` composable) — the shell dock is still route-blind (the HEAD gap: no route context)`,
            );
        }
        if (!rendersContextual) {
            violations.push(
                `W2: \`${name}\` imports the seam but does NOT render the contextual layer set — neither an in-dock <DockLayerGroup>/<DockLayer v-for in contextLayers> NOR a BC <DockStack :items> stack rail mapped over contextLayers. An unrendered import is a no-op decoy (bind the return in the template)`,
            );
        }
    }

    return { violations, facts };
}

function loadFs() {
    const P = cliPaths();
    const readMaybe = (p) => (existsSync(p) ? readFileSync(p, "utf8") : undefined);
    return {
        composableText: readMaybe(P.COMPOSABLE),
        shellComposableText: readMaybe(P.SHELL),
        manifestText: readMaybe(P.MANIFEST),
        sidebarText: readMaybe(P.SIDEBAR),
        bottomText: readMaybe(P.BOTTOM),
    };
}

function run() {
    const P = cliPaths();
    const fs = loadFs();
    const { violations, facts } = detectContextual(fs);
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:dock-contextual-layers",
        note: "AZ.W-DOCK-CONTEXT — W3 (the live per-route layer swap on the shell docks) is the binding observable; it is local-only (dock-animation-live runner-truth) and closes under the π DELTA + proof:live-verified-ledger. This gate's W1+W2 are the device-free CI half.",
        facts,
        violations,
    });

    console.log(
        "proof:dock-contextual-layers — the page-driven contextual dock-layer gate (AZ.W-DOCK-CONTEXT)",
    );
    console.log(
        `  W1 seam route-keyed + ≥${MIN_CONTEXTS} contexts : composable=${facts.composablePresent} reads-key=${facts.composableReadsRouteKey ?? false} indexes-map=${facts.composableIndexesMapByKey ?? false} no-hardcode=${!facts.composableHasHardcodedRouteBranch} contexts=${facts.contextMapKeyCount ?? 0} distinct-ids=${facts.distinctLayerIdCount ?? 0}`,
    );
    console.log(
        `  W2 shell docks consume + render             : sidebar(import=${facts.sidebarImportsSeam ?? false} render=${facts.sidebarRendersContextual ?? false} [group=${facts.sidebarRendersGroup ?? false} stackRail=${facts.sidebarRendersStackRail ?? false}]) bottom(import=${facts.bottomImportsSeam ?? false} render=${facts.bottomRendersContextual ?? false} [group=${facts.bottomRendersGroup ?? false} stackRail=${facts.bottomRendersStackRail ?? false}])`,
    );
    console.log(
        "  W3 live per-route layer swap                : LOCAL-ONLY (π DELTA — W-DOCK-CONTEXT-DELTA.md + proof:live-verified-ledger)",
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${relative(P.ROOT, P.ARTIFACT)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
