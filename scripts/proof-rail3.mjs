#!/usr/bin/env node
// AZ.W-RAIL3 — proof:rail3, the born-RED floating-carousel-rail structural gate.
//
// THE THIRD RAIL. The two prior attempts (W-RAIL-EXTEND → R4-RAIL) each "passed" a
// gate while the user's SHELL stayed broken (the recorded source-green / shell-broken
// failure class). This wave MOVED the contextual facets OUT of the dock body (the
// measured ~2× inflators) and re-homed them as a floating, cyclable strip of detached
// glass chips on the visible hairline OUTSIDE the dock box — so the dock box returns
// INVIOLATE to its tight icon pill. This gate is the device-free STRUCTURAL half
// (R1-R6); the RUNTIME truths (the box-equality G1, the outside-the-box paint G2, the
// carousel-cycle G3, the no-corpse G4) are the local-only π half captured to
// W-RAIL3-DELTA.md and backstopped on CI by proof:live-verified-ledger.
//
// PURE DEVICE-FREE static src-scan (source + DOM-template scans, no browser, no GPU).
// Runs on EVERY runner → carries `tags: ["local","ci","release"]`.
//
// CLAUSES (born-RED on the pre-fix tree):
//   R1 — the in-dock contextual <DockLayerGroup> is GONE from BOTH shell docks (the
//        de-inflation source). SidebarDock.vue AND BottomDock.vue carry NO in-flow
//        <DockLayerGroup> rendering the route-contextual facet set (a <DockLayer
//        v-for in contextLayers>). RED if either shell dock still mounts it. (The
//        /dock/layers STORY keeps its <DockLayerGroup> — R1 scopes to the two SHELL
//        docks by file.)
//   R2 — the strip is rail chrome, ONE registry, no parallel store. <DockRail> writes
//        the consumer-owned `v-model:context` (a `defineModel("context")`) — NO
//        internal `ref()`/`reactive()`/`useState` shadow of the active facet state.
//   R3 — the strip is the `--border-hairline` whisper + the beyond-edge extent. The
//        strip composes `box-shadow: var(--border-hairline)` (NO hard `1px solid`) AND
//        the `--dock-rail-extend-length` overrun rule is present (the strip paints
//        beyond the dock content box).
//   R4 — the strip renders OUTSIDE the dock containment (the box-INVIOLATE witness).
//        GlassDock renders the `#rail` slot as a SIBLING of `.glass-dock` inside the
//        `.glass-dock-frame` (the display:contents → non-clipping [data-has-rail]
//        shell), and the `.dock-hairline-slot` is `position: absolute`.
//   R5 — the strip is a FLEX STRIP of ≥1 chip with cyclable overflow, not a lone
//        end-icon. rail-extend.css carries the `.dock-hairline-strip` flex layout +
//        `overflow` + `scroll-snap` (the carousel scroll), and DockRail.vue renders a
//        v-for of chips over `chips`/`items`/`entries` (not a single DockIconButton).
//   R6 — ≥2 LIVE SHELL consumers (the truth-surface census). BOTH SidebarDock.vue AND
//        BottomDock.vue mount a live <DockRail> strip (the third-rail lesson: a
//        story-only census masked the broken shell).
//
// Bite-check: restore the in-dock <DockLayerGroup> in either shell dock → R1 RED; add
// an internal `const active = ref(...)` to DockRail.vue → R2 RED; swap the hairline
// `box-shadow: var(--border-hairline)` → `border: 1px solid` → R3 RED; delete the
// `--dock-rail-extend-length` rule → R3 RED; render the strip as a `.glass-dock`
// descendant → R4 RED; collapse the strip to a single DockIconButton (no v-for, no
// scroll) → R5 RED; drop the strip from either shell dock → R6 RED.

import { existsSync, readFileSync } from "node:fs";
import { resolve, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

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
        DOCK_RAIL: resolve(ROOT, "src/components/custom/dock/DockRail.vue"),
        RAIL_CSS: resolve(ROOT, "src/styles/dock/rail-extend.css"),
        GLASSDOCK: resolve(ROOT, "src/components/custom/dock/GlassDock.vue"),
        SIDEBAR: resolve(ROOT, "demo/layout/SidebarDock.vue"),
        BOTTOM: resolve(ROOT, "demo/layout/BottomDock.vue"),
        ARTIFACT: gateArtifactPath("GLASS_UI_RAIL3_ARTIFACT", "AZ-rail3"),
    };
    return _cliPaths;
}

/**
 * The PURE detector (injected) — exported so a born-RED self-test can feed a synthetic
 * restored-in-dock-group / internal-ref / lone-end-icon mutation and assert exit 1.
 *
 * @param {object} fs { dockRailText, railCssText, glassDockText, sidebarText, bottomText }
 */
export function detectRail3(fs) {
    const violations = [];
    const facts = {};

    const rail = stripComments(fs.dockRailText ?? "", "vue");
    const css = stripComments(fs.railCssText ?? "", "code");
    const gd = stripComments(fs.glassDockText ?? "", "vue");
    const sidebar = stripComments(fs.sidebarText ?? "", "vue");
    const bottom = stripComments(fs.bottomText ?? "", "vue");

    // ── R1 — the in-dock contextual <DockLayerGroup> is GONE from BOTH shell docks ──
    // The de-inflation source: the facet group used to mount as an in-flow
    // <DockLayerGroup> rendering the route-contextual facet set (a <DockLayer v-for in
    // contextLayers>), which stretched the dock box ~2× (R6-1/R6-2). RED if either
    // shell dock still renders that in-dock group. We detect a LIVE in-flow
    // <DockLayerGroup ...><DockLayer v-for ... in (contextLayers|layers)> render.
    function rendersInDockContextGroup(text) {
        if (!/<DockLayerGroup\b/.test(text)) return false;
        return /<DockLayer\b[\s\S]*?v-for\s*=\s*["'][^"']*\bin\s+(contextLayers|layers)\b/.test(
            text,
        );
    }
    const sidebarInDockGroup = rendersInDockContextGroup(sidebar);
    const bottomInDockGroup = rendersInDockContextGroup(bottom);
    facts.r1SidebarInDockGroup = sidebarInDockGroup;
    facts.r1BottomInDockGroup = bottomInDockGroup;
    if (sidebarInDockGroup) {
        violations.push(
            "R1: SidebarDock.vue STILL mounts an in-dock contextual <DockLayerGroup>/<DockLayer v-for in contextLayers> — it inflates the dock box ~2× (R6-2). The facets must move OUT of the dock onto the rail strip.",
        );
    }
    if (bottomInDockGroup) {
        violations.push(
            "R1: BottomDock.vue STILL mounts an in-dock contextual <DockLayerGroup>/<DockLayer v-for in contextLayers> — it inflates the dock to ~3 rows (R6-1). The facets must move OUT of the dock onto the rail strip.",
        );
    }

    // ── R2 — the strip is ONE registry, no parallel store ──
    const hasContextModel =
        /defineModel\s*(?:<[^>]*>)?\s*\(\s*["']context["']/.test(rail);
    const internalActiveShadow =
        /\bconst\s+\w*(?:active|context|layer|current)\w*\s*=\s*(?:ref|reactive|shallowRef|useState)\s*\(/i.test(
            rail,
        );
    facts.r2HasContextModel = hasContextModel;
    facts.r2InternalActiveShadow = internalActiveShadow;
    if (!hasContextModel) {
        violations.push(
            'R2: DockRail does not expose a consumer-owned `defineModel("context")` — the chips must write the ONE registry the consumer owns, not a parallel state path',
        );
    }
    if (internalActiveShadow) {
        violations.push(
            "R2: DockRail owns an INTERNAL `ref()`/`reactive()` active/context/layer store — the illegitimate parallel-store path. Write the consumer-owned `v-model:context`, never an internal shadow.",
        );
    }

    // ── R3 — the `--border-hairline` whisper + the beyond-edge extent ──
    const composesHairlineToken = /box-shadow:\s*var\(--border-hairline\)/.test(css);
    const hasHardHairlineBorder =
        /\.dock-hairline-extend(?:[^{]*)?\{[^}]*border:\s*[^;]*\bsolid\b/.test(css) ||
        /\.dock-hairline-extend(?:[^{]*)?::before\s*\{[^}]*border:\s*[^;]*\bsolid\b/.test(
            css,
        );
    const definesExtendToken = /--dock-rail-extend-length\s*:/.test(css);
    const overrunUsesToken =
        /min-(?:inline|block)-size:\s*var\(--dock-rail-extend-length\)/.test(css);
    facts.r3ComposesHairlineToken = composesHairlineToken;
    facts.r3HasHardHairlineBorder = hasHardHairlineBorder;
    facts.r3DefinesExtendToken = definesExtendToken;
    facts.r3OverrunUsesToken = overrunUsesToken;
    if (!composesHairlineToken) {
        violations.push(
            "R3: the connective hairline does NOT compose `box-shadow: var(--border-hairline)` in rail-extend.css — it must read the 0.5px catch-light + under-shadow token pair (no hard rule)",
        );
    }
    if (hasHardHairlineBorder) {
        violations.push(
            "R3: a hard `border: …px solid` rule paints the `.dock-hairline-extend` hairline — it must be the `--border-hairline` whisper, NOT a hard rule",
        );
    }
    if (!definesExtendToken) {
        violations.push(
            "R3: the `--dock-rail-extend-length` extent token is not defined in rail-extend.css — the beyond-edge overrun geometry knob is missing",
        );
    }
    if (!overrunUsesToken) {
        violations.push(
            "R3: the hairline's painted length does not compose `var(--dock-rail-extend-length)` (no `min-inline-size`/`min-block-size` overrun) — the strip must paint beyond the dock content box",
        );
    }

    // ── R4 — the strip renders OUTSIDE the dock containment (box-INVIOLATE witness) ──
    const hasRailSlot =
        (/hasRail/.test(gd) || /\$slots\.rail/.test(gd)) && /name="rail"/.test(gd);
    const hasRailSlotWrapper = /class="dock-hairline-slot"/.test(gd);
    const hasRailshell =
        /class="glass-dock-frame"/.test(gd) &&
        /\.glass-dock-frame\[data-has-rail\]/.test(css);
    const slotIdx = gd.indexOf("dock-hairline-slot");
    const lastLayerIdx = gd.lastIndexOf("dock-layer--summary");
    const slotIsSibling = slotIdx > -1 && lastLayerIdx > -1 && slotIdx > lastLayerIdx;
    const slotEscapesClip = /\.dock-hairline-slot\s*\{[^}]*position:\s*absolute/.test(css);
    facts.r4HasRailSlot = hasRailSlot;
    facts.r4HasRailshell = hasRailshell;
    facts.r4SlotIsSibling = slotIsSibling;
    facts.r4SlotEscapesClip = slotEscapesClip;
    if (!hasRailSlot || !hasRailSlotWrapper) {
        violations.push(
            'R4: GlassDock.vue lacks the `#rail` chrome slot (`hasRail`/`$slots.rail` + `name="rail"` + `.dock-hairline-slot` wrapper) — the strip needs a slot rendered outside the dock containment box',
        );
    }
    if (!hasRailshell) {
        violations.push(
            "R4: the `.glass-dock-frame` escape context is absent (the wrapper + the `[data-has-rail]` non-clipping rule) — without it the strip is a dock child clipped by `contain: paint`/`backdrop-filter`/`overflow` (the inflation regression)",
        );
    }
    if (!slotIsSibling) {
        violations.push(
            "R4: the `.dock-hairline-slot` is NOT a sibling of the dock content (it sits inside the clip aperture) — render it OUTSIDE `.glass-dock` in the railshell",
        );
    }
    if (!slotEscapesClip) {
        violations.push(
            "R4: `.dock-hairline-slot` does not escape via `position: absolute` in rail-extend.css — the chrome slot must anchor to the railshell, never feeding the dock's intrinsic size",
        );
    }

    // ── R5 — the strip is a FLEX STRIP of chips with cyclable overflow ──
    // The CSS carries the strip flex layout + overflow + scroll-snap; DockRail.vue
    // renders a v-for of chips (the carousel), NOT a single end-icon.
    const hasStripFlex = /\.dock-hairline-strip\s*\{[^}]*display:\s*flex/.test(css);
    const hasStripOverflow = /\.dock-hairline-strip[^{}]*\{[^}]*overflow-[xy]:\s*auto/.test(
        stripComments(fs.railCssText ?? "", "code"),
    ) || /overflow-[xy]:\s*auto/.test(
        // permit the axis-scoped rules under the orientation selectors
        css.replace(/\n/g, " "),
    );
    const hasScrollSnap = /scroll-snap-type:/.test(css);
    const railRendersChipVfor =
        /v-for\s*=\s*["'][^"']*\bin\s+(chips|items|entries)\b/.test(rail) &&
        /dock-hairline-extend-chip/.test(rail);
    facts.r5HasStripFlex = hasStripFlex;
    facts.r5HasStripOverflow = hasStripOverflow;
    facts.r5HasScrollSnap = hasScrollSnap;
    facts.r5RailRendersChipVfor = railRendersChipVfor;
    if (!hasStripFlex) {
        violations.push(
            "R5: rail-extend.css has no `.dock-hairline-strip { display: flex }` — the strip must be a flex carousel of chips, not a lone end-icon",
        );
    }
    if (!hasStripOverflow || !hasScrollSnap) {
        violations.push(
            "R5: the `.dock-hairline-strip` lacks `overflow-{x,y}: auto` + `scroll-snap-type` — the carousel must scroll/cycle when the chips exceed the inline budget",
        );
    }
    if (!railRendersChipVfor) {
        violations.push(
            "R5: DockRail.vue does not render a v-for of `.dock-hairline-extend-chip` over `chips`/`items`/`entries` — the facility must be the chip STRIP, not a single DockIconButton end-icon",
        );
    }

    // ── R6 — ≥2 LIVE SHELL consumers (the truth-surface census) ──
    const sidebarMountsRail = /<DockRail\b/.test(sidebar);
    const bottomMountsRail = /<DockRail\b/.test(bottom);
    facts.r6SidebarMountsRail = sidebarMountsRail;
    facts.r6BottomMountsRail = bottomMountsRail;
    if (!sidebarMountsRail) {
        violations.push(
            "R6: SidebarDock.vue does NOT mount a live <DockRail> strip — the truth-surface census binds BOTH shell docks (the third-rail lesson: a story-only census masked the broken shell)",
        );
    }
    if (!bottomMountsRail) {
        violations.push(
            "R6: BottomDock.vue does NOT mount a live <DockRail> strip — the truth-surface census binds BOTH shell docks",
        );
    }

    return { violations, facts };
}

function loadFs() {
    const P = cliPaths();
    const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");
    return {
        dockRailText: read(P.DOCK_RAIL),
        railCssText: read(P.RAIL_CSS),
        glassDockText: read(P.GLASSDOCK),
        sidebarText: read(P.SIDEBAR),
        bottomText: read(P.BOTTOM),
    };
}

function run() {
    const P = cliPaths();
    const fs = loadFs();
    const { violations, facts } = detectRail3(fs);
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:rail3",
        facts,
        violations,
    });

    console.log(
        "proof:rail3 — the floating-carousel rail (facets OUT of the dock, box INVIOLATE) gate (AZ.W-RAIL3)",
    );
    console.log(
        `  R1 in-dock group GONE (both shell) : sidebar=${!facts.r1SidebarInDockGroup} bottom=${!facts.r1BottomInDockGroup} ${!facts.r1SidebarInDockGroup && !facts.r1BottomInDockGroup ? "OK" : "RED"}`,
    );
    console.log(
        `  R2 one registry, no shadow         : contextModel=${facts.r2HasContextModel} internalShadow=${facts.r2InternalActiveShadow} ${facts.r2HasContextModel && !facts.r2InternalActiveShadow ? "OK" : "RED"}`,
    );
    console.log(
        `  R3 hairline whisper + extent       : composes=${facts.r3ComposesHairlineToken} hardBorder=${facts.r3HasHardHairlineBorder} token=${facts.r3DefinesExtendToken} overrun=${facts.r3OverrunUsesToken} ${facts.r3ComposesHairlineToken && !facts.r3HasHardHairlineBorder && facts.r3DefinesExtendToken && facts.r3OverrunUsesToken ? "OK" : "RED"}`,
    );
    console.log(
        `  R4 strip outside containment       : slot=${facts.r4HasRailSlot} railshell=${facts.r4HasRailshell} sibling=${facts.r4SlotIsSibling} escapes=${facts.r4SlotEscapesClip} ${facts.r4HasRailSlot && facts.r4HasRailshell && facts.r4SlotIsSibling && facts.r4SlotEscapesClip ? "OK" : "RED"}`,
    );
    console.log(
        `  R5 flex strip of chips, cyclable   : flex=${facts.r5HasStripFlex} overflow=${facts.r5HasStripOverflow} snap=${facts.r5HasScrollSnap} chipVfor=${facts.r5RailRendersChipVfor} ${facts.r5HasStripFlex && facts.r5HasStripOverflow && facts.r5HasScrollSnap && facts.r5RailRendersChipVfor ? "OK" : "RED"}`,
    );
    console.log(
        `  R6 ≥2 live SHELL consumers         : sidebar=${facts.r6SidebarMountsRail} bottom=${facts.r6BottomMountsRail} ${facts.r6SidebarMountsRail && facts.r6BottomMountsRail ? "OK" : "RED"}`,
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
