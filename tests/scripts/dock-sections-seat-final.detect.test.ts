import { describe, expect, it } from "vitest";

import {
    detectDockSections,
    groupingSelfTest,
} from "../../scripts/proof-dock-sections.mjs";

/**
 * proof:dock-sections — the tripartite SECTION-GROUPING gate (BA.W-DOCK-SECTIONS).
 *
 * BC.W-DOCK-STACK-RAIL SPLIT (clean break). This gate ORIGINALLY carried the S6
 * ℱ-anchor-seat-final + off-canvas gutter-fan RAIL clauses (the divider-carousel
 * <DockRail> seam-offset seat / chip-retract / chip-fan). The rail was RE-CONCEIVED
 * as the macOS hover-expand <DockStack> (DockRail.vue → DockStack.vue; rail-extend.css
 * → stack-rail.css; the `--dock-rail-seam-offset` seam-locator + the chip CSS DELETED),
 * so the rail clauses (S2/S3/S5/S6) now police a RETIRED architecture — they are RETIRED
 * here and re-pointed to the named successor `proof:dock-stack-rail` (which owns the new
 * stack seat / fan-out / overflow / topology with its OWN S1-S6 + self-tests).
 *
 * What REMAINS valid + still gates is the SECTION-GROUPING:
 *   S1 — the declarative tripartite descriptor (the rail-core|section|nav zone
 *        <DockSection>/<DockSeparator> grouping rendered descriptor-DRIVEN — a `v-for`
 *        over the `sections` prop, NOT a hardcoded three-element literal).
 *   S4 — the section model returns to BOTH shell docks WITHOUT inflation.
 *
 * These units drive the exported PURE detector with synthetic fixtures so the born-RED
 * + the anti-evasion bites cannot regress to false-GREEN: a hardcoded-literal section
 * (no v-for / no <DockSeparator> compose) REDs S1; a shell that does NOT adopt
 * <DockSection> REDs S4. The S6 rail facts/violations are ABSENT — the retirement-witness
 * (the divider-carousel seam-locator is DEFINITION-ABSENT; its concern lives in
 * `proof:dock-stack-rail` now).
 */

// ── A descriptor-driven <DockSection> (the S1 GREEN shape) ──
const DOCK_SECTION_OK = `
import DockSeparator from "./DockSeparator.vue";
import type { DockSectionDescriptor } from "./constants";
<template>
  <template v-for="(section, index) in sections" :key="section.id">
    <DockSeparator />
    <div class="dock-section-zone" :data-kind="section.kind"><slot /></div>
  </template>
</template>
`;
const CONSTANTS_OK = `
export type DockSectionKind = "rail-core" | "section" | "nav";
export interface DockSectionDescriptor { kind: DockSectionKind; id: string; }
`;
const INDEX_OK = `
export { default as DockSection } from "./DockSection.vue";
export type { DockSectionDescriptor } from "./constants";
`;
const SIDEBAR_OK = `<template><DockSection :sections="sections" /></template>`;
const BOTTOM_OK = `<template><DockSection :sections="sections" /></template>`;

// ── The hardcoded-literal section (S1 born-RED): no v-for over `sections`, no
//    <DockSeparator> compose — a fixed three-zone literal ──
const DOCK_SECTION_HARDCODED = `
<template>
  <div class="dock-section">
    <div>core</div><div>section</div><div>nav</div>
  </div>
</template>
`;

function fs(overrides: Partial<Record<string, string>> = {}) {
    return {
        dockSectionText: DOCK_SECTION_OK,
        constantsText: CONSTANTS_OK,
        sectionCssText: "",
        indexText: INDEX_OK,
        sidebarText: SIDEBAR_OK,
        bottomText: BOTTOM_OK,
        ...overrides,
    };
}

const s1Violations = (v: string[]) => v.filter((x) => x.startsWith("S1"));
const s4Violations = (v: string[]) => v.filter((x) => x.startsWith("S4"));
const s6Violations = (v: string[]) => v.filter((x) => x.startsWith("S6"));

describe("proof:dock-sections — the retained tripartite SECTION-GROUPING (S1 + S4)", () => {
    it("PASSES on the descriptor-driven shell (v-for over `sections` + BOTH shells adopt)", () => {
        const { violations, facts } = detectDockSections(fs());
        expect(violations).toEqual([]);
        // S1 — the descriptor-driven grouping is satisfied.
        expect(facts.s1DockSectionExists).toBe(true);
        expect(facts.s1DescriptorType).toBe(true);
        expect(facts.s1KindType).toBe(true);
        expect(facts.s1RendersVforOverSections).toBe(true);
        expect(facts.s1KindSwitchesZone).toBe(true);
        expect(facts.s1ComposesSeparator).toBe(true);
        expect(facts.s1ExportsSection).toBe(true);
        // S4 — both shell docks adopt <DockSection>.
        expect(facts.s4SidebarAdoptsSection).toBe(true);
        expect(facts.s4BottomAdoptsSection).toBe(true);
    });

    it("S1 born-RED: a hardcoded-literal <DockSection> (no v-for, no <DockSeparator>) REDs", () => {
        const { violations, facts } = detectDockSections(
            fs({ dockSectionText: DOCK_SECTION_HARDCODED }),
        );
        // not descriptor-DRIVEN, no separator compose
        expect(facts.s1RendersVforOverSections).toBe(false);
        expect(facts.s1ComposesSeparator).toBe(false);
        expect(s1Violations(violations).length).toBeGreaterThan(0);
    });

    it("S4 born-RED: a shell dock that does NOT adopt <DockSection> REDs", () => {
        const { violations, facts } = detectDockSections(
            fs({ sidebarText: "<template><GlassDock><DockIconButton /></GlassDock></template>" }),
        );
        expect(facts.s4SidebarAdoptsSection).toBe(false);
        expect(facts.s4BottomAdoptsSection).toBe(true);
        expect(s4Violations(violations).some((v) => /SidebarDock/.test(v))).toBe(true);
    });

    it("the grouping invariant self-test bites (the born-RED grouping mutations flag)", () => {
        // The gate's own self-test drives a hardcoded-literal section (S1) + a
        // no-adoption shell (S4); both MUST flag for the grouping to be load-bearing.
        expect(groupingSelfTest().ok).toBe(true);
        expect(groupingSelfTest().errors).toEqual([]);
    });

    it("the S6 RAIL clauses are RETIRED — no S6 facts/violations (concern → proof:dock-stack-rail)", () => {
        const { violations, facts } = detectDockSections(fs());
        // the divider-carousel seam-locator / chip-fan facts are DEFINITION-ABSENT here;
        // the rail seat/fan/overflow/topology is owned by proof:dock-stack-rail.
        expect(Object.keys(facts).some((k) => /^s6/i.test(k))).toBe(false);
        expect(s6Violations(violations)).toEqual([]);
    });
});
