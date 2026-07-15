import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { ScrollProgressRim } from "@glass/components/scroll-progress-rim";

describe("ScrollProgressRim", () => {
    it("exposes clamped aggregate progress and a thin rainbow rim", () => {
        const wrapper = mount(ScrollProgressRim, {
            props: { value: 42, max: 100 },
            attrs: { "aria-label": "Article progress" },
        });

        expect(wrapper.attributes()).toMatchObject({
            role: "progressbar",
            "aria-label": "Article progress",
            "aria-valuemin": "0",
            "aria-valuenow": "42",
            "aria-valuemax": "100",
            "data-coverage": "full-ring",
        });
        const style = wrapper.attributes("style") ?? "";
        expect(style).toContain("--scroll-progress-rim-fill: 42.000%");
        expect(style.match(/section-color/g) ?? []).toHaveLength(6);
        expect(
            wrapper.get(".scroll-progress-rim__track").attributes("aria-hidden"),
        ).toBe("true");
    });

    it("clamps the semantic value to its declared range", () => {
        const wrapper = mount(ScrollProgressRim, {
            props: { value: 120, max: 100 },
        });
        expect(wrapper.attributes("aria-valuenow")).toBe("100");
        expect(wrapper.attributes("style")).toContain(
            "--scroll-progress-rim-fill: 100.000%",
        );
    });

    it("renders clamped per-item segment fills through the same masked track", () => {
        const wrapper = mount(ScrollProgressRim, {
            props: {
                value: 2.5,
                max: 4,
                segments: [1, 0.5, -1, 2],
                coverage: "inline-end-edge",
            },
        });
        const style = wrapper.attributes("style");

        expect(wrapper.attributes("data-coverage")).toBe("inline-end-edge");
        expect(wrapper.attributes("aria-valuenow")).toBe("2.5");
        expect(style).toContain("--scroll-progress-rim-fill: 100%");
        expect(style).toContain("37.500%");
        expect(style).toContain("transparent 50.000%");
        expect(style).toContain("transparent 75.000%");
        expect(style).toContain("100.000%");
        expect(wrapper.findAll(".scroll-progress-rim__track")).toHaveLength(1);
    });
});
