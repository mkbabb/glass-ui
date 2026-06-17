import { describe, expect, it } from "vitest";

import { detectDockSections } from "../../scripts/proof-dock-sections.mjs";

/**
 * BB.W-DOCK-RAIL-SEAT-FINAL — the S6 born-RED self-test bites.
 *
 * S6 extends proof:dock-sections in-place: the ℱ-anchor RESTORED (S6a) + the desktop
 * chip fan re-fanned to the off-canvas lower gutter (S6b), the dual-overrun R-arm held
 * (S6c), no midline/abandonment regress (S6d). These units feed the exported detector
 * synthetic fixtures so the born-RED + the anti-evasion bites cannot regress to
 * false-GREEN: the pre-wave shape (anchor-id="utility", rightward fan) REDs S6; a
 * third-arbitrary-separator anchor REDs S6a; a re-introduced midline slot seat REDs S6d.
 *
 * Only the S1-S5 inputs the fixtures need are populated; the GREEN baseline carries the
 * minimal S1-S5 satisfiers so a S6-only RED is isolated from the prior clauses.
 */

// ── The S1-S5 GREEN floor (the prior clauses satisfied so S6 RED is isolated) ──
const DOCK_SECTION_OK = `
import DockSeparator from "./DockSeparator.vue";
import type { DockSectionDescriptor } from "./constants";
<template>
  <template v-for="(section, index) in sections" :key="section.id">
    <DockSeparator :anchor="isAnchorSeparator(section)" />
    <div class="dock-section-zone" :data-kind="section.kind"><slot /></div>
  </template>
</template>
`;
const CONSTANTS_OK = `
export type DockSectionKind = "rail-core" | "section" | "nav";
export interface DockSectionDescriptor { kind: DockSectionKind; id: string; }
`;
const SEPARATOR_OK = `
defineProps<{ anchor?: boolean }>();
<template><div class="dock-separator" :data-rail-anchor="anchor || undefined" /></template>
`;
const RAIL_OK = `
import FadingScroll from "../fading-scroll/FadingScroll.vue";
const context = defineModel<string>("context");
<template><FadingScroll axis="x"><div class="dock-hairline-strip" /></FadingScroll></template>
`;
const INDEX_OK = `
export { default as DockSection } from "./DockSection.vue";
export type { DockSectionDescriptor } from "./constants";
`;
const RAIL_CSS_OK = `
@layer components {
  :root { --dock-rail-extend-length: calc(2.5rem * var(--dock-scale, 1)); }
  .glass-dock-frame[data-has-rail].vertical .dock-hairline-slot {
    inset-block-start: var(--dock-rail-seam-offset, 0px);
    inset-inline-start: calc(-1 * var(--dock-rail-extend-length));
    inline-size: calc(100% + 2 * var(--dock-rail-extend-length));
    translate: 0 -50%;
  }
  .dock-hairline-extend.vertical::before {
    block-size: 1px; min-inline-size: var(--dock-rail-extend-length); inset-block-start: 50%;
  }
  .dock-hairline-strip { scrollbar-width: none; }
  .glass-dock.collapsed ~ .dock-hairline-slot .dock-hairline-strip { opacity: 0; translate: 1px 0; }
  @media (prefers-reduced-motion: reduce) { .dock-hairline-strip { transition: none; } }
}
`;
const GLASSDOCK_OK = `
function measureSeam() { frame.style.setProperty("--dock-rail-seam-offset", offset); }
`;
const BOTTOM_OK = `<template><DockSection :sections="sections" /></template>`;

// ── The post-wave SidebarDock (S6 GREEN): the ℱ-home :anchor + nulled DockSection ──
const SIDEBAR_AFTER = `
<template>
  <GlassDock orientation="vertical" always-expanded>
    <template #persistent>
      <DockIconButton class="demo-sidebar-home"><span>F</span></DockIconButton>
      <DockSeparator :anchor="true" />
    </template>
    <DockSection :sections="sections" anchor-id="__none__">
      <template #categories><DockIconButton /></template>
    </DockSection>
    <template #rail><DockRail :items="railItems" /></template>
  </GlassDock>
</template>
`;
// ── The pre-wave SidebarDock (S6 born-RED): anchor-id="utility", no ℱ-home anchor ──
const SIDEBAR_BEFORE = `
<template>
  <GlassDock orientation="vertical" always-expanded>
    <template #persistent>
      <DockIconButton class="demo-sidebar-home"><span>F</span></DockIconButton>
      <DockSeparator />
    </template>
    <DockSection :sections="sections" anchor-id="utility">
      <template #categories><DockIconButton /></template>
    </DockSection>
    <template #rail><DockRail :items="railItems" /></template>
  </GlassDock>
</template>
`;
// ── The third-arbitrary-separator anchor (S6a anti-evasion): a :anchor buried INSIDE
//    the DockSection default slot, not the ℱ-home #persistent region ──
const SIDEBAR_THIRD_SEP = `
<template>
  <GlassDock orientation="vertical" always-expanded>
    <template #persistent>
      <DockIconButton class="demo-sidebar-home"><span>F</span></DockIconButton>
      <DockSeparator />
    </template>
    <DockSection :sections="sections" anchor-id="__none__">
      <template #categories><DockIconButton /><DockSeparator :anchor="true" /></template>
    </DockSection>
    <template #rail><DockRail :items="railItems" /></template>
  </GlassDock>
</template>
`;

// ── The demo dock-nav.css (S6 GREEN): the lower-gutter column fan ──
const DOCK_NAV_AFTER = `
.demo-sidebar-rail .glass-dock-frame[data-has-rail].vertical .dock-hairline-slot {
  inset-block-end: 0; block-size: auto; translate: 0 0;
}
.demo-sidebar-rail .dock-hairline-extend.vertical .dock-hairline-fade {
  inset-inline-start: 50%; inset-block-start: auto; inset-block-end: 0; translate: -50% 0;
  max-inline-size: var(--demo-nav-rail-w, 4.5rem);
}
.demo-sidebar-rail .dock-hairline-extend.vertical .dock-hairline-strip {
  flex-direction: column; max-inline-size: var(--demo-nav-rail-w, 4.5rem);
}
`;
// ── The pre-wave demo dock-nav.css (S6b born-RED): the W-CHIP-GRAZE top-seat (the chips
//    track the seam top, NOT the lower gutter) — `inset-block-start: 0`, no `inset-block-end` ──
const DOCK_NAV_BEFORE = `
.demo-sidebar-rail .dock-hairline-extend.vertical .dock-hairline-fade {
  inset-inline-start: 50%; inset-block-start: 0; translate: -50% 0;
  max-inline-size: var(--demo-nav-rail-w, 4.5rem);
}
.demo-sidebar-rail .dock-hairline-extend.vertical .dock-hairline-strip {
  flex-direction: column; max-inline-size: var(--demo-nav-rail-w, 4.5rem);
}
`;
// ── A demo override that re-introduces the midline SLOT seat (S6d bite) ──
const DOCK_NAV_MIDLINE = `
.demo-sidebar-rail .dock-hairline-extend.vertical .dock-hairline-fade {
  inset-block-end: 0; max-inline-size: var(--demo-nav-rail-w, 4.5rem);
}
.demo-sidebar-rail .dock-hairline-extend.vertical .dock-hairline-strip {
  flex-direction: column; max-inline-size: var(--demo-nav-rail-w, 4.5rem);
}
.demo-sidebar-rail .dock-hairline-slot { inset-block-start: 50%; }
`;

function fs(sidebar: string, dockNavCss: string) {
    return {
        dockSectionText: DOCK_SECTION_OK,
        constantsText: CONSTANTS_OK,
        dockSeparatorText: SEPARATOR_OK,
        dockRailText: RAIL_OK,
        railCssText: RAIL_CSS_OK,
        sectionCssText: "",
        glassDockText: GLASSDOCK_OK,
        indexText: INDEX_OK,
        sidebarText: sidebar,
        bottomText: BOTTOM_OK,
        dockNavCssText: dockNavCss,
    };
}

const s6Violations = (v: string[]) => v.filter((x) => x.startsWith("S6"));

describe("proof:dock-sections S6 — the ℱ-anchor restore + the off-canvas gutter fan", () => {
    it("PASSES on the post-wave shape (ℱ-home :anchor + lower-gutter fan)", () => {
        const { violations, facts } = detectDockSections(
            fs(SIDEBAR_AFTER, DOCK_NAV_AFTER),
        );
        expect(s6Violations(violations)).toEqual([]);
        expect(facts.s6aSidebarMarksAnchorSeparator).toBe(true);
        expect(facts.s6aSidebarDropsUtilityAnchor).toBe(true);
        expect(facts.s6aAnchorIsHomeSeparator).toBe(true);
        expect(facts.s6bDesktopLowerGutterSeat).toBe(true);
        expect(facts.s6dDemoMidlineSlotSeat).toBe(false);
    });

    it("born-RED on the pre-wave shape (anchor-id=utility + the seam-top fan)", () => {
        const { violations, facts } = detectDockSections(
            fs(SIDEBAR_BEFORE, DOCK_NAV_BEFORE),
        );
        const s6 = s6Violations(violations);
        // S6a: utility-anchor survives → dropsUtility false; no ℱ-home :anchor
        expect(facts.s6aSidebarDropsUtilityAnchor).toBe(false);
        expect(facts.s6aSidebarMarksAnchorSeparator).toBe(false);
        // S6b: the fan is NOT lower-gutter seated (seam-top, no inset-block-end)
        expect(facts.s6bDesktopLowerGutterSeat).toBe(false);
        expect(s6.length).toBeGreaterThan(0);
    });

    it("S6a anti-evasion: a third-arbitrary-separator anchor (inside the section) still REDs", () => {
        const { violations, facts } = detectDockSections(
            fs(SIDEBAR_THIRD_SEP, DOCK_NAV_AFTER),
        );
        // a :anchor exists, but it is NOT the ℱ-home/leading divider (buried in the section)
        expect(facts.s6aSidebarMarksAnchorSeparator).toBe(true);
        expect(facts.s6aAnchorIsHomeSeparator).toBe(false);
        expect(
            violations.some((v) => v.startsWith("S6a") && /third arbitrary/.test(v)),
        ).toBe(true);
    });

    it("S6d bite: a re-introduced midline SLOT seat in the demo override REDs", () => {
        const { violations, facts } = detectDockSections(
            fs(SIDEBAR_AFTER, DOCK_NAV_MIDLINE),
        );
        expect(facts.s6dDemoMidlineSlotSeat).toBe(true);
        expect(
            violations.some((v) => v.startsWith("S6d") && /midline/.test(v)),
        ).toBe(true);
    });
});
