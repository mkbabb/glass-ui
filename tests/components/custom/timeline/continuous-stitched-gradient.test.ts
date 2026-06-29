import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import GlassTimeline from "@glass/components/custom/timeline/GlassTimeline.vue";
import {
    stitchedRailGradient,
    stitchedRegionWindow,
} from "@glass/components/custom/timeline/geometry";
import type { TimelineSegment } from "@glass/components/custom/timeline/types";

/**
 * AC.W9 (Lane B / B2) — the `continuous` variant paints ONE rail-
 * spanning stitched gradient. Each region windows into the SAME
 * gradient via `background-size` / `background-position-x`, so the
 * phase hues cross-fade smoothly across the boundaries — one
 * continuous bar, no per-region seam. The rail's first + last regions
 * carry the pill rounding so the bar's ends are properly rounded, not
 * squared off.
 */

const segments: TimelineSegment[] = [
    {
        key: "ping",
        label: "Ping",
        state: "completed",
        gradient: { from: "#1a1", to: "#3c3" },
    },
    {
        key: "download",
        label: "Download",
        state: "active",
        progress: 0.4,
        gradient: { from: "#aaa", to: "#fff" },
    },
    {
        key: "upload",
        label: "Upload",
        state: "pending",
        gradient: { from: "#11a", to: "#33c" },
    },
];

describe("continuous stitched gradient — geometry", () => {
    it("stitchedRailGradient anchors first/last stops at the rail extremes", () => {
        const g = stitchedRailGradient(segments);
        expect(g).toContain("linear-gradient(90deg");
        // First phase colour pinned to 0%, last pinned to 100%.
        expect(g).toContain("#3c3 0.000%");
        expect(g).toContain("#33c 100.000%");
        // Interior phase sits at its weight-centre (3 equal phases → 50%).
        expect(g).toContain("#fff 50.000%");
    });

    it("stitchedRegionWindow scales + offsets each region into the full rail", () => {
        // 3 equal regions → each is 1/3 of the rail.
        const first = stitchedRegionWindow(0, 1 / 3);
        const mid = stitchedRegionWindow(1 / 3, 1 / 3);
        const last = stitchedRegionWindow(2 / 3, 1 / 3);
        // size-x = 1 / regionWidth = 300%.
        expect(first.sizeX).toBe("300.000%");
        expect(mid.sizeX).toBe("300.000%");
        expect(last.sizeX).toBe("300.000%");
        // position-x = regionLeft / (1 - regionWidth): 0, 50%, 100%.
        expect(first.positionX).toBe("0.000%");
        expect(mid.positionX).toBe("50.000%");
        expect(last.positionX).toBe("100.000%");
    });

    it("single-segment rail degrades to a flat gradient (no NaN)", () => {
        const g = stitchedRailGradient([segments[0]!]);
        expect(g).toContain("linear-gradient(90deg");
        expect(g).not.toContain("NaN");
        const w = stitchedRegionWindow(0, 1);
        expect(w.positionX).toBe("0%");
    });
});

describe("continuous stitched gradient — render path", () => {
    it("every region carries the SAME --stitch-gradient (one stitched bar)", () => {
        const wrapper = mount(GlassTimeline, {
            props: { variant: "continuous", segments },
        });
        const regions = wrapper.findAll(".continuous-region");
        expect(regions).toHaveLength(segments.length);
        const gradients = regions.map((r) => {
            const style = r.attributes("style") ?? "";
            const m = style.match(/--stitch-gradient:\s*([^;]+)/);
            return m?.[1]?.trim();
        });
        // All regions reference the identical rail-spanning gradient.
        expect(gradients[0]).toBeTruthy();
        expect(gradients[0]).toBe(gradients[1]);
        expect(gradients[1]).toBe(gradients[2]);
        expect(gradients[0]).toContain("linear-gradient(90deg");
    });

    it("each region windows the gradient via distinct --stitch-pos-x", () => {
        const wrapper = mount(GlassTimeline, {
            props: { variant: "continuous", segments },
        });
        const regions = wrapper.findAll(".continuous-region");
        const posX = regions.map((r) => {
            const style = r.attributes("style") ?? "";
            return style.match(/--stitch-pos-x:\s*([^;]+)/)?.[1]?.trim();
        });
        expect(posX[0]).toBe("0.000%");
        expect(posX[1]).toBe("50.000%");
        expect(posX[2]).toBe("100.000%");
    });

    it("stamps is-first / is-last so the rail ends carry the rounding", () => {
        const wrapper = mount(GlassTimeline, {
            props: { variant: "continuous", segments },
        });
        const regions = wrapper.findAll(".continuous-region");
        expect(regions[0]?.classes()).toContain("is-first");
        expect(regions[0]?.classes()).not.toContain("is-last");
        expect(regions[1]?.classes()).not.toContain("is-first");
        expect(regions[1]?.classes()).not.toContain("is-last");
        expect(regions[2]?.classes()).toContain("is-last");
        expect(regions[2]?.classes()).not.toContain("is-first");
    });
});
