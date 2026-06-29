import { describe, expect, it } from "vitest";

import {
    detect,
    importsDeletedComponent,
} from "../../scripts/proof-demo-dock-nav.mjs";
import { detectRouteWalk } from "../../scripts/proof-demo-dock-nav-runtime.mjs";

/**
 * AW.W28.b — the pure-detector units for the demo dock-nav gates.
 *
 * proof:demo-dock-nav (structural) asserts the two-dock shell + clean delete;
 * proof:demo-dock-nav-runtime detects MissingStory routes from the live walk.
 * These units cover the pure detectors so the failure paths cannot regress to
 * false-GREEN.
 */

const APP_SHELL_OK = `
import SidebarDock from "./SidebarDock.vue";
import BottomDock from "./BottomDock.vue";
<template><SidebarDock /><BottomDock /></template>
`;
const SIDEBAR_OK = `
import { GlassDock } from "@glass/components/custom/dock";
import { useStoryNavigation } from "../composables/useStoryNavigation";
const { firstOfCategory } = useStoryNavigation();
<template><GlassDock orientation="vertical" /></template>
`;
const BOTTOM_OK = `
import { GlassDock } from "@glass/components/custom/dock";
import { useStoryNavigation } from "../composables/useStoryNavigation";
const { next } = useStoryNavigation();
<template><GlassDock always-expanded /></template>
`;

function freshMap() {
    return {
        "layout/AppShell.vue": APP_SHELL_OK,
        "layout/SidebarDock.vue": SIDEBAR_OK,
        "layout/BottomDock.vue": BOTTOM_OK,
    };
}

describe("importsDeletedComponent()", () => {
    it("matches an import statement but NOT a prose comment", () => {
        expect(
            importsDeletedComponent(`import X from "./StoryPager.vue";`, "StoryPager"),
        ).toBe(true);
        expect(
            importsDeletedComponent(
                `// matches the StoryPager idiom (a prose mention)`,
                "StoryPager",
            ),
        ).toBe(false);
    });
});

describe("proof:demo-dock-nav detect() (structural)", () => {
    it("passes a fully-rebuilt two-dock shell with clean delete", () => {
        const map = freshMap();
        const { violations } = detect(map, { ...map });
        expect(violations).toHaveLength(0);
    });

    it("violates when CategoryRail still exists", () => {
        const map = freshMap();
        map["layout/CategoryRail.vue"] = "<template>old</template>";
        const { violations } = detect(map, { ...map });
        expect(violations.some((v) => v.includes("CategoryRail.vue still exists"))).toBe(
            true,
        );
    });

    it("violates on a residual import of a deleted nav component", () => {
        const map = freshMap();
        const all = { ...map, "stories/x.vue": `import P from "./StoryPager.vue";` };
        const { violations } = detect(map, all);
        expect(violations.some((v) => v.includes("residual import"))).toBe(true);
    });

    it("violates when a new dock drops its <GlassDock>", () => {
        const map = freshMap();
        map["layout/SidebarDock.vue"] = `
import { useStoryNavigation } from "../composables/useStoryNavigation";
const { firstOfCategory } = useStoryNavigation();
<template><div /></template>`;
        const { violations } = detect(map, { ...map });
        expect(
            violations.some((v) => v.includes("SidebarDock.vue does not render a <GlassDock>")),
        ).toBe(true);
    });
});

describe("proof:demo-dock-nav-runtime detectRouteWalk()", () => {
    it("passes when every category lands a live story + the sheet trigger exists", () => {
        const result = {
            categoryCount: 2,
            sheetTriggerPresent: true,
            results: [
                { category: "Foundations", route: "/foundations/intro", missing: false },
                { category: "Primitives", route: "/primitives/buttons", missing: false },
            ],
        };
        const { violations } = detectRouteWalk(result);
        expect(violations).toHaveLength(0);
    });

    it("violates on a MissingStory fallback route", () => {
        const result = {
            categoryCount: 1,
            sheetTriggerPresent: true,
            results: [{ category: "Ghost", route: "/ghost/none", missing: true }],
        };
        const { violations } = detectRouteWalk(result);
        expect(violations.some((v) => v.includes("MissingStory"))).toBe(true);
    });

    it("violates when the mobile off-canvas trigger is absent", () => {
        const result = {
            categoryCount: 1,
            sheetTriggerPresent: false,
            results: [{ category: "Foundations", route: "/foundations/intro", missing: false }],
        };
        const { violations } = detectRouteWalk(result);
        expect(
            violations.some((v) => v.includes("off-canvas sidebar trigger")),
        ).toBe(true);
    });
});
