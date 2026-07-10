#!/usr/bin/env node
// BA.W-DOCK-SECTIONS — proof:dock-sections, the born-RED tripartite-section-dock
// SECTION-GROUPING gate.
//
// BC.W-DOCK-STACK-RAIL SPLIT (clean break). This gate ORIGINALLY carried two
// concerns: (a) the declarative tripartite SECTION-GROUPING (the <DockSection> /
// <DockSeparator> rail-core|section|nav zone descriptor) AND (b) the divider-carousel
// RAIL (the seam-offset seat S2, the chip-retract S3, the DockRail+FadingScroll
// overflow S5, the demo chip-fan gutter S6). BC.W-DOCK-STACK-RAIL RETIRED the
// divider-carousel clean (DockRail.vue → DockStack.vue; rail-extend.css → stack-rail.css;
// the `measureSeam`/`--dock-rail-seam-offset` seam-locator + the chip CSS DELETED) and
// rebuilt the rail as the macOS hover-expand <DockStack>. So the RAIL clauses (S2/S3/S5/S6)
// now police a RETIRED architecture — they are RETIRED here, their concern re-pointed to
// the named successor proof:dock-stack-rail (S1-S6 of that gate own the new stack rail).
// What REMAINS valid + still gates is the SECTION-GROUPING:
//   S1 — the declarative tripartite descriptor (the rail-core|section|nav zones).
//   S4 — the section model returns to BOTH shell docks WITHOUT inflation.
// Both are intact on the new DockStack tree (the <DockSection> grouping is orthogonal to
// the rail rebuild — it groups the dock's already-in-flow controls, the box-INVIOLATE
// display:contents chassis). A born-RED self-test bite proves the grouping invariant.
//
// THE FOUR RAIL FAILURES (history, for context). W-RAIL-EXTEND → R4-RAIL → W-RAIL3/R6 →
// R8-1 each "passed" a box-inviolate / structural readback while the user's SHELL stayed
// broken — chased the seam-Y to dodge whichever content band collided. BC.W-DOCK-STACK-RAIL
// closed that whole class by RE-CONCEIVING the rail as the macOS stack (clearance by
// TOPOLOGY, not a chased seam); proof:dock-stack-rail is its binding gate.
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
//   S4 — the section model returns to BOTH shell docks WITHOUT inflation. BottomDock.vue
//        AND SidebarDock.vue render <DockSection :sections> (the third-rail census: a
//        story-only census masked the broken shell). The box-inviolate floor is the
//        display:contents chassis (section.css) + proof:dock-stack-rail's box-INVIOLATE
//        S2 arm (the kept .glass-dock-frame escape, recorded there).
//
// RETIRED CLAUSES (re-pointed to proof:dock-stack-rail — BC.W-DOCK-STACK-RAIL):
//   S2 (seam-offset seat) · S3 (chip-retract) · S5 (DockRail+FadingScroll overflow) ·
//   S6 (demo chip-fan gutter). The seam-locator / chip-strip / divider-carousel they
//   policed are DEFINITION-ABSENT (clean break); proof:dock-stack-rail S1 asserts that
//   absence + S2-S6 own the new macOS hover-expand <DockStack> seat/fan/overflow/topology.
//
// Bite-check (the grouping invariant, self-tested every run): drop the `kind`-switched
// <DockSeparator>-composing v-for over `sections` → S1 RED; remove <DockSection> from
// either shell dock → S4 RED.

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
        SECTION_CSS: resolve(ROOT, "src/styles/dock/section.css"),
        INDEX: resolve(ROOT, "src/components/custom/dock/index.ts"),
        SIDEBAR: resolve(ROOT, "demo/shell/SidebarDock.vue"),
        BOTTOM: resolve(ROOT, "demo/shell/BottomDock.vue"),
        ARTIFACT: gateArtifactPath("GLASS_UI_DOCK_SECTIONS_ARTIFACT", "BA-dock-sections"),
    };
    return _cliPaths;
}

/**
 * The PURE detector (injected) — exported so a born-RED self-test can feed a synthetic
 * grouping mutation (a hardcoded-three-zone literal / a no-adoption shell) and assert
 * exit 1. The RAIL clauses are RETIRED (re-pointed to proof:dock-stack-rail); only the
 * SECTION-GROUPING (S1 + S4) gates here.
 *
 * @param {object} fs the source texts (see loadFs)
 */
export function detectDockSections(fs) {
    const violations = [];
    const facts = {};

    const section = stripComments(fs.dockSectionText ?? "", "vue");
    const constants = stripComments(fs.constantsText ?? "", "code");
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

    // ── RETIRED at BC.W-DOCK-STACK-RAIL: S2 (seam-offset seat) · S3 (chip-retract) ·
    //    S5 (DockRail+FadingScroll overflow) · S6 (demo chip-fan gutter). The
    //    divider-carousel they policed (DockRail.vue / rail-extend.css /
    //    --dock-rail-seam-offset / the .dock-hairline chip strip) is DEFINITION-ABSENT
    //    (clean break, no alias). Their concern is re-pointed to the named successor
    //    proof:dock-stack-rail (its S1 asserts the retire; its S2-S6 own the new macOS
    //    hover-expand <DockStack> seat / fan-out / overflow / topology). No facts here.

    return { violations, facts };
}

/**
 * The grouping-invariant SELF-TEST (born-RED bite). Drives the PURE detector with a
 * synthetic shell that DROPS the descriptor-driven grouping (a hardcoded three-zone
 * literal, NO v-for over `sections`) AND a shell that does NOT adopt <DockSection> —
 * each MUST flag. If the detector greens on either mutation it is not load-bearing.
 *
 * @returns {{ ok: boolean, errors: string[] }}
 */
export function groupingSelfTest() {
    const errors = [];
    // S1 bite — a NON-descriptor-driven section (hardcoded literal, no v-for, no
    // separator compose) must flag.
    const s1Mutant = detectDockSections({
        dockSectionText:
            "<template><div class='dock-section'><div>core</div><div>nav</div></div></template>",
        constantsText: "",
        indexText: "",
        sidebarText: "<DockSection :sections />",
        bottomText: "<DockSection :sections />",
    });
    if (!s1Mutant.violations.some((v) => v.startsWith("S1"))) {
        errors.push(
            "S1 self-test BROKE — a hardcoded-three-zone <DockSection> (no v-for over `sections`, no <DockSeparator> compose) was NOT flagged; the grouping invariant is not load-bearing",
        );
    }
    // S4 bite — a shell that does NOT adopt <DockSection> must flag.
    const s4Mutant = detectDockSections({
        dockSectionText:
            "<script>import DockSeparator from './DockSeparator.vue';</script><template><div v-for='s in sections' :data-kind='s.kind'><DockSeparator /></div></template>",
        constantsText:
            "export interface DockSectionDescriptor {}\nexport type DockSectionKind = string;",
        indexText:
            "export { default as DockSection } from './DockSection.vue';\nexport type { DockSectionDescriptor } from './constants';",
        sidebarText: "<GlassDock><DockIconButton /></GlassDock>",
        bottomText: "<GlassDock><DockIconButton /></GlassDock>",
    });
    if (!s4Mutant.violations.some((v) => v.startsWith("S4"))) {
        errors.push(
            "S4 self-test BROKE — a shell dock with NO <DockSection> adoption was NOT flagged; the third-rail census is not load-bearing",
        );
    }
    return { ok: errors.length === 0, errors };
}

function loadFs() {
    const P = cliPaths();
    const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");
    return {
        dockSectionText: read(P.DOCK_SECTION),
        constantsText: read(P.CONSTANTS),
        sectionCssText: read(P.SECTION_CSS),
        indexText: read(P.INDEX),
        sidebarText: read(P.SIDEBAR),
        bottomText: read(P.BOTTOM),
    };
}

function run() {
    const P = cliPaths();
    const fs = loadFs();
    const { violations: detectorViolations, facts } = detectDockSections(fs);

    // The grouping-invariant self-test bites every run (the BC.W-DOCK-STACK-RAIL split
    // kept a born-RED proof of the SECTION-GROUPING after the RAIL clauses retired).
    const self = groupingSelfTest();
    const violations = [...detectorViolations, ...self.errors];
    facts.groupingSelfTest = self.ok;
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:dock-sections",
        note: "BA.W-DOCK-SECTIONS section-grouping gate, SPLIT at BC.W-DOCK-STACK-RAIL: the RAIL clauses (S2 seam-offset seat · S3 chip-retract · S5 DockRail+FadingScroll overflow · S6 demo chip-fan gutter) RETIRED — the divider-carousel they policed is DEFINITION-ABSENT (clean break) and their concern is re-pointed to the named successor proof:dock-stack-rail. What remains + gates here is the SECTION-GROUPING: S1 the descriptor-driven rail-core|section|nav zone <DockSection>/<DockSeparator> grouping + S4 the BOTH-shell-dock adoption (box-inviolate via the display:contents chassis). A born-RED grouping self-test bites every run.",
        facts,
        violations,
    });

    const ok = (b) => (b ? "OK" : "RED");
    console.log(
        "proof:dock-sections — the tripartite SECTION-GROUPING gate (BA.W-DOCK-SECTIONS; RAIL clauses retired → proof:dock-stack-rail at BC.W-DOCK-STACK-RAIL)",
    );
    console.log(
        `  S1 descriptor-driven tripartite : exists=${facts.s1DockSectionExists} type=${facts.s1DescriptorType} vfor=${facts.s1RendersVforOverSections} kind=${facts.s1KindSwitchesZone} sep=${facts.s1ComposesSeparator} export=${facts.s1ExportsSection} ${ok(facts.s1DockSectionExists && facts.s1DescriptorType && facts.s1KindType && facts.s1RendersVforOverSections && facts.s1KindSwitchesZone && facts.s1ComposesSeparator && facts.s1ExportsSection)}`,
    );
    console.log(
        `  S4 section model on BOTH shells : sidebar=${facts.s4SidebarAdoptsSection} bottom=${facts.s4BottomAdoptsSection} ${ok(facts.s4SidebarAdoptsSection && facts.s4BottomAdoptsSection)}`,
    );
    console.log(
        `  RETIRED → proof:dock-stack-rail : S2 seam-offset seat · S3 chip-retract · S5 DockRail+FadingScroll · S6 demo chip-fan gutter (the divider-carousel DEFINITION-ABSENT, clean break)`,
    );
    console.log(`  grouping self-test (bite proof) : ${ok(self.ok)}`);
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
