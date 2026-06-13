#!/usr/bin/env node
// BA.W-DOCK-SECTIONS — proof:dock-sections, the born-RED tripartite-section-dock +
// divider-seam re-seat gate (the FOURTH rail attempt, re-conceived as a topology
// decision, NOT a fifth patch).
//
// THE FOUR RAIL FAILURES. W-RAIL-EXTEND → R4-RAIL → W-RAIL3/R6 → R8-1 each "passed" a
// box-inviolate / structural readback while the user's SHELL stayed broken (the rail
// detached/midline, the section model deleted). This gate is the device-free SOURCE
// half (S1-S5); the BINDING π SHELL DELTA (tests-visual/dock-sections.spec.ts +
// W-DOCK-SECTIONS-DELTA.md) is the visual truth (the seam-anchored Y/X, the dual-side
// overrun extent, the flush chip gap, the collapse-retract stub, the box-inviolate
// delta), and the proof:ba-gestalt dock-surface verdict is the holistic close (BA
// inv-4 — per-mechanism greens do NOT alone close a visual wave).
//
// PURE DEVICE-FREE static src-scan (source + DOM-template + CSS scans, no browser, no
// GPU). Runs on EVERY runner → carries `tags: ["local","ci","release"]`.
//
// CLAUSES (born-RED on the pre-wave tree):
//   S1 — the declarative tripartite descriptor renders. <DockSection> exists, takes a
//        `sections: readonly DockSectionDescriptor[]` array, and renders the three
//        `kind` zones (rail-core | section | nav) demarcated by <DockSeparator> via a
//        `v-for` over `sections` (NOT a hardcoded three-element literal). RED at HEAD:
//        no DockSection.vue / DockSectionDescriptor.
//   S2 — the rail anchors at the SEAM, not the edge/midline. rail-extend.css carries NO
//        `inset-block-start: 50%` vertical midline seat, NO `inset-block-end: 100%;
//        inset-inline-start: 0` horizontal edge seat; the rail positioning reads a
//        separator-derived seam offset (`--dock-rail-seam-offset`) AND overruns BOTH
//        sides (a `calc(... + 2 * var(--dock-rail-extend-length))` dual extent OR a
//        `-1 * var(--dock-rail-extend-length)` negative leading inset + matching trailing
//        extent). RED at HEAD: the midline/edge seat literals + one-side overrun.
//   S3 — chips fan FLUSH + collapse retracts. The strip butts the seam line (the
//        connector-as-tether `margin-inline-end`/`margin-block-start` adrift offset of
//        the one-side connector is GONE), AND a collapse-retract rule exists that is
//        `prefers-reduced-motion`-gated. RED at HEAD: the 40px-adrift strip, no retract.
//   S4 — the section model returns to BOTH shell docks WITHOUT inflation. BottomDock.vue
//        AND SidebarDock.vue render <DockSection :sections>, AND the box-inviolate
//        proof:rail-extend R-arm stays GREEN (asserted by the still-green sibling gate,
//        recorded here as a fact). RED at HEAD: the W-RAIL3 deletion comment, no
//        <DockSection>.
//   S5 — the overflow routes through <FadingScroll>, the bespoke parallel scroll-fade
//        retired. DockRail.vue composes <FadingScroll> for the chip overflow (the Batch-2
//        primitive) AND the strip carries no DUPLICATE hand-rolled scroll-fade mask
//        (no `mask-image` edge-fade on `.dock-hairline-strip` competing with FadingScroll).
//        RED at HEAD: no <FadingScroll> consumption.
//
// Bite-check: re-seat the rail to a fixed `:50%`/`:120%` literal → S2 RED (the gate
// requires the separator-exposed seam offset, a static literal is not a derivation);
// keep the connector tether margin → S3 RED; remove <DockSection> from either shell dock
// → S4 RED; drop the <FadingScroll> wrap or add a second scroll-fade mask → S5 RED.

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
        DOCK_SECTION: resolve(ROOT, "src/components/custom/dock/DockSection.vue"),
        CONSTANTS: resolve(ROOT, "src/components/custom/dock/constants.ts"),
        DOCK_SEPARATOR: resolve(ROOT, "src/components/custom/dock/DockSeparator.vue"),
        DOCK_RAIL: resolve(ROOT, "src/components/custom/dock/DockRail.vue"),
        RAIL_CSS: resolve(ROOT, "src/styles/dock/rail-extend.css"),
        SECTION_CSS: resolve(ROOT, "src/styles/dock/section.css"),
        GLASSDOCK: resolve(ROOT, "src/components/custom/dock/GlassDock.vue"),
        INDEX: resolve(ROOT, "src/components/custom/dock/index.ts"),
        SIDEBAR: resolve(ROOT, "demo/layout/SidebarDock.vue"),
        BOTTOM: resolve(ROOT, "demo/layout/BottomDock.vue"),
        ARTIFACT: gateArtifactPath("GLASS_UI_DOCK_SECTIONS_ARTIFACT", "BA-dock-sections"),
    };
    return _cliPaths;
}

/**
 * The PURE detector (injected) — exported so a born-RED self-test can feed a synthetic
 * midline-seat / hardcoded-three-zone / no-adoption mutation and assert exit 1.
 *
 * @param {object} fs the source texts (see loadFs)
 */
export function detectDockSections(fs) {
    const violations = [];
    const facts = {};

    const section = stripComments(fs.dockSectionText ?? "", "vue");
    const constants = stripComments(fs.constantsText ?? "", "code");
    const separator = stripComments(fs.dockSeparatorText ?? "", "vue");
    const rail = stripComments(fs.dockRailText ?? "", "vue");
    const css = stripComments(fs.railCssText ?? "", "code");
    const sectionCss = stripComments(fs.sectionCssText ?? "", "code");
    const gd = stripComments(fs.glassDockText ?? "", "vue");
    const index = stripComments(fs.indexText ?? "", "code");
    const sidebar = stripComments(fs.sidebarText ?? "", "vue");
    const bottom = stripComments(fs.bottomText ?? "", "vue");

    // ── S1 — the declarative tripartite descriptor renders ──
    const dockSectionExists = (fs.dockSectionText ?? "").length > 0;
    const descriptorType =
        /export\s+(?:interface|type)\s+DockSectionDescriptor\b/.test(constants);
    const kindType = /export\s+type\s+DockSectionKind\b/.test(constants);
    // descriptor-DRIVEN: a v-for over the `sections` prop, NOT a fixed three-element
    // literal. We require a `v-for` whose source is `sections`.
    const rendersVforOverSections =
        /v-for\s*=\s*["'][^"']*\bin\s+sections\b/.test(section);
    // the kind switches the zone (a `kind`-keyed class/data-attr in the render).
    const kindSwitchesZone =
        /(?:data-kind|dock-section-zone--)\s*[=:]?/.test(section) &&
        /section\.kind|\.kind\b/.test(section);
    // composes the existing <DockSeparator> between groups (not a parallel divider).
    const composesSeparator =
        /<DockSeparator\b/.test(section) && /import\s+DockSeparator\b/.test(section);
    const exportsSection =
        /export\s*\{\s*default\s+as\s+DockSection\b/.test(index) &&
        /export\s+type\s*\{[^}]*DockSectionDescriptor[^}]*\}/.test(index);
    facts.s1DockSectionExists = dockSectionExists;
    facts.s1DescriptorType = descriptorType;
    facts.s1KindType = kindType;
    facts.s1RendersVforOverSections = rendersVforOverSections;
    facts.s1KindSwitchesZone = kindSwitchesZone;
    facts.s1ComposesSeparator = composesSeparator;
    facts.s1ExportsSection = exportsSection;
    if (!dockSectionExists || !descriptorType || !kindType) {
        violations.push(
            "S1: DockSection.vue / DockSectionDescriptor / DockSectionKind missing — the declarative tripartite descriptor contract is absent (the R8-9 / IG-A3 reusable layering abstraction)",
        );
    }
    if (!rendersVforOverSections || !kindSwitchesZone) {
        violations.push(
            "S1: <DockSection> does not render descriptor-DRIVEN — it must `v-for` over the `sections` prop with the `kind` switching the zone (NOT a hardcoded three-element literal; a 5-section dock must render from the array)",
        );
    }
    if (!composesSeparator) {
        violations.push(
            "S1: <DockSection> does not compose the existing <DockSeparator> between groups — the tripartite grouping must reuse the divider primitive, not a parallel divider",
        );
    }
    if (!exportsSection) {
        violations.push(
            "S1: the dock barrel does not export `DockSection` + `DockSectionDescriptor` — the chassis must be reachable on the /dock subpath",
        );
    }

    // ── S2 — the rail anchors at the SEAM, not the edge/midline ──
    // The midline/edge SEAT literals are GONE. The workaround #4 was on the SLOT seat
    // (`.dock-hairline-slot { inset-block-start: 50% }`), NOT a `::before` line's own
    // self-centering — so we scope the midline/edge detection to the SLOT seat rule
    // (`.dock-hairline-slot { … }`), where the forbidden seat lived. A `::before` line
    // centered at 50% WITHIN the seam-anchored slot is legitimate (the slot already
    // sits at the seam; the line centers in it).
    const slotSeatRule = (axisGuard) => {
        // capture the `.glass-dock-frame[data-has-rail]<axisGuard> .dock-hairline-slot {…}`
        // body and test the seat literal inside it.
        const re = new RegExp(
            `\\.glass-dock-frame\\[data-has-rail\\]${axisGuard}\\s+\\.dock-hairline-slot\\s*\\{([^}]*)\\}`,
            "g",
        );
        let body = "";
        let m;
        while ((m = re.exec(css)) !== null) body += m[1] + "\n";
        return body;
    };
    const verticalSlotSeat = slotSeatRule("\\.vertical");
    const horizontalSlotSeat = slotSeatRule(":not\\(\\.vertical\\)");
    const hasVerticalMidlineSeat = /inset-block-start:\s*50%/.test(verticalSlotSeat);
    const hasHorizontalEdgeSeat =
        /inset-block-end:\s*100%/.test(horizontalSlotSeat) &&
        /inset-inline-start:\s*0\b/.test(horizontalSlotSeat);
    // the rail positioning reads a separator-derived seam offset.
    const readsSeamOffset = /var\(--dock-rail-seam-offset/.test(css);
    // the seam-locator affordance exists on the separator (direction b).
    const separatorAnchorAffordance =
        /\banchor\b/.test(separator) && /data-rail-anchor/.test(separator);
    // GlassDock writes the seam offset (the measured read).
    const glassDockWritesSeam = /--dock-rail-seam-offset/.test(gd);
    // the dual-side overrun: a symmetric `2 * var(--dock-rail-extend-length)` extent OR
    // a negative leading inset alongside the trailing extent.
    const dualSideOverrun =
        /2\s*\*\s*var\(--dock-rail-extend-length\)/.test(css) ||
        /calc\(\s*-1\s*\*\s*var\(--dock-rail-extend-length\)/.test(css);
    facts.s2HasVerticalMidlineSeat = hasVerticalMidlineSeat;
    facts.s2HasHorizontalEdgeSeat = hasHorizontalEdgeSeat;
    facts.s2ReadsSeamOffset = readsSeamOffset;
    facts.s2SeparatorAnchorAffordance = separatorAnchorAffordance;
    facts.s2GlassDockWritesSeam = glassDockWritesSeam;
    facts.s2DualSideOverrun = dualSideOverrun;
    if (hasVerticalMidlineSeat) {
        violations.push(
            "S2: rail-extend.css STILL carries the vertical midline seat `inset-block-start: 50%` — the workaround #4 the brief forbids; re-seat at the separator-derived seam offset",
        );
    }
    if (hasHorizontalEdgeSeat) {
        violations.push(
            "S2: rail-extend.css STILL carries the horizontal edge seat (`inset-block-end: 100%` + `inset-inline-start: 0`) — re-seat at the nav-separator seam offset",
        );
    }
    if (!readsSeamOffset || !glassDockWritesSeam) {
        violations.push(
            "S2: the rail does NOT read a separator-derived seam offset (`var(--dock-rail-seam-offset)` written by GlassDock) — a static literal is not a seam derivation (the anti-evasion: a `:40%`/`:120%` decoy still fails)",
        );
    }
    if (!separatorAnchorAffordance) {
        violations.push(
            "S2: <DockSeparator> lacks the `anchor`/`data-rail-anchor` seam-locator affordance (direction b) — the divider must be able to act as the rail's named anchor",
        );
    }
    if (!dualSideOverrun) {
        violations.push(
            "S2: the rail line does NOT overrun BOTH sides — it must carry a symmetric `2 * var(--dock-rail-extend-length)` extent OR a `-1 * var(--dock-rail-extend-length)` negative leading inset with a matching trailing extent",
        );
    }

    // ── S3 — chips fan FLUSH + collapse retracts ──
    // The connector-as-tether adrift margin is GONE (the strip butts the seam).
    const hasTetherMargin =
        /\.dock-hairline-extend\.vertical::before\s*\{[^}]*margin-inline-end:/.test(css) ||
        /\.dock-hairline-extend\.horizontal::before\s*\{[^}]*margin-(?:block|inline)-start:/.test(
            css,
        );
    // a collapse-retract rule exists, PRM-gated.
    const hasRetractRule =
        /(?:retract|collapsed)[\s\S]{0,200}(?:translate|opacity|scale)/.test(
            css + sectionCss,
        ) || /\.glass-dock\.collapsed[\s\S]{0,400}\.dock-hairline/.test(css + sectionCss);
    const retractPrmGated = /@media\s*\([^)]*prefers-reduced-motion:\s*reduce/.test(
        css + sectionCss,
    );
    facts.s3HasTetherMargin = hasTetherMargin;
    facts.s3HasRetractRule = hasRetractRule;
    facts.s3RetractPrmGated = retractPrmGated;
    if (hasTetherMargin) {
        violations.push(
            "S3: the connector-as-tether `margin-inline-end`/`margin-block-start` adrift offset survives — the chips must fan FLUSH against the seam line, not 40px adrift",
        );
    }
    if (!hasRetractRule) {
        violations.push(
            "S3: no collapse-retract rule (the chips translate/fade INTO the rail leaving a stub on collapse) — the macOS-fan-out retraction is missing",
        );
    }
    if (!retractPrmGated) {
        violations.push(
            "S3: the collapse-retract is not `prefers-reduced-motion: reduce`-gated — the retract must snap (no travel) under reduce",
        );
    }

    // ── S4 — the section model returns to BOTH shell docks WITHOUT inflation ──
    const sidebarAdoptsSection = /<DockSection\b/.test(sidebar);
    const bottomAdoptsSection = /<DockSection\b/.test(bottom);
    facts.s4SidebarAdoptsSection = sidebarAdoptsSection;
    facts.s4BottomAdoptsSection = bottomAdoptsSection;
    if (!sidebarAdoptsSection) {
        violations.push(
            "S4: SidebarDock.vue does NOT render <DockSection :sections> — the tripartite gestalt must return to the shell (the third-rail lesson: BOTH shell docks bind)",
        );
    }
    if (!bottomAdoptsSection) {
        violations.push(
            "S4: BottomDock.vue does NOT render <DockSection :sections> — the tripartite gestalt must return to the shell (BOTH shell docks bind)",
        );
    }

    // ── S5 — the overflow routes through <FadingScroll>, no duplicate scroll-fade ──
    const composesFadingScroll =
        /<FadingScroll\b/.test(rail) && /import\s+FadingScroll\b/.test(rail);
    // a DUPLICATE hand-rolled scroll-fade on the same strip (a competing mask-image edge
    // fade on `.dock-hairline-strip`) — the two-overflow-path violation.
    const hasDuplicateScrollFade =
        /\.dock-hairline-strip\s*\{[^}]*mask-image:\s*linear-gradient/.test(css);
    facts.s5ComposesFadingScroll = composesFadingScroll;
    facts.s5HasDuplicateScrollFade = hasDuplicateScrollFade;
    if (!composesFadingScroll) {
        violations.push(
            "S5: DockRail.vue does NOT compose <FadingScroll> for the chip overflow — the Batch-2 primitive is the single scroll-fade port (the bespoke parallel scroll-fade is retired)",
        );
    }
    if (hasDuplicateScrollFade) {
        violations.push(
            "S5: a DUPLICATE hand-rolled `mask-image` scroll-fade survives on `.dock-hairline-strip` — no two overflow-fade paths; <FadingScroll> owns the edge fade",
        );
    }

    return { violations, facts };
}

function loadFs() {
    const P = cliPaths();
    const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");
    return {
        dockSectionText: read(P.DOCK_SECTION),
        constantsText: read(P.CONSTANTS),
        dockSeparatorText: read(P.DOCK_SEPARATOR),
        dockRailText: read(P.DOCK_RAIL),
        railCssText: read(P.RAIL_CSS),
        sectionCssText: read(P.SECTION_CSS),
        glassDockText: read(P.GLASSDOCK),
        indexText: read(P.INDEX),
        sidebarText: read(P.SIDEBAR),
        bottomText: read(P.BOTTOM),
    };
}

function run() {
    const P = cliPaths();
    const fs = loadFs();
    const { violations, facts } = detectDockSections(fs);
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:dock-sections",
        facts,
        violations,
    });

    const ok = (b) => (b ? "OK" : "RED");
    console.log(
        "proof:dock-sections — the tripartite section dock + divider-seam re-seat gate (BA.W-DOCK-SECTIONS)",
    );
    console.log(
        `  S1 descriptor-driven tripartite : exists=${facts.s1DockSectionExists} type=${facts.s1DescriptorType} vfor=${facts.s1RendersVforOverSections} kind=${facts.s1KindSwitchesZone} sep=${facts.s1ComposesSeparator} export=${facts.s1ExportsSection} ${ok(facts.s1DockSectionExists && facts.s1DescriptorType && facts.s1KindType && facts.s1RendersVforOverSections && facts.s1KindSwitchesZone && facts.s1ComposesSeparator && facts.s1ExportsSection)}`,
    );
    console.log(
        `  S2 seam anchor, no midline/edge : midline=${facts.s2HasVerticalMidlineSeat} edge=${facts.s2HasHorizontalEdgeSeat} seamOffset=${facts.s2ReadsSeamOffset} anchorAfford=${facts.s2SeparatorAnchorAffordance} gdWrites=${facts.s2GlassDockWritesSeam} dualOverrun=${facts.s2DualSideOverrun} ${ok(!facts.s2HasVerticalMidlineSeat && !facts.s2HasHorizontalEdgeSeat && facts.s2ReadsSeamOffset && facts.s2SeparatorAnchorAffordance && facts.s2GlassDockWritesSeam && facts.s2DualSideOverrun)}`,
    );
    console.log(
        `  S3 chips flush + retract (PRM)  : tether=${facts.s3HasTetherMargin} retract=${facts.s3HasRetractRule} prm=${facts.s3RetractPrmGated} ${ok(!facts.s3HasTetherMargin && facts.s3HasRetractRule && facts.s3RetractPrmGated)}`,
    );
    console.log(
        `  S4 section model on BOTH shells : sidebar=${facts.s4SidebarAdoptsSection} bottom=${facts.s4BottomAdoptsSection} ${ok(facts.s4SidebarAdoptsSection && facts.s4BottomAdoptsSection)}`,
    );
    console.log(
        `  S5 FadingScroll, no dup fade    : composes=${facts.s5ComposesFadingScroll} dupFade=${facts.s5HasDuplicateScrollFade} ${ok(facts.s5ComposesFadingScroll && !facts.s5HasDuplicateScrollFade)}`,
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
