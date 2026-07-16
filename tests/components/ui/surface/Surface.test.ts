import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { Surface } from "@glass/components/surface";

describe("Surface", () => {
    it.each([
        ["content", "quiet"],
        ["elevated", "resting"],
        ["functional", "floating"],
        ["overlay", "overlay"],
    ] as const)("maps material=%s to the %s tier", (material, tier) => {
        const wrapper = mount(Surface, { props: { material } });

        expect(wrapper.attributes("data-material")).toBe(material);
        expect(wrapper.attributes("data-tier")).toBe(tier);
        expect(wrapper.classes()).toContain(`glass-${tier}`);
    });

    it("lets an explicit tier override the material default", () => {
        const wrapper = mount(Surface, {
            props: { material: "overlay", tier: "wash" },
        });

        expect(wrapper.attributes("data-tier")).toBe("wash");
        expect(wrapper.classes()).toContain("glass-wash");
    });

    it("reports the effective floating tier when deep glass is armed", () => {
        const wrapper = mount(Surface, {
            props: { material: "content", tier: "wash", deep: true },
        });

        expect(wrapper.attributes("data-tier")).toBe("floating");
        expect(wrapper.attributes("data-deep")).toBe("true");
        expect(wrapper.classes()).toEqual(
            expect.arrayContaining(["glass-floating", "glass-deep"]),
        );
    });

    it("withholds glass-only facilities from veil and opaque decorations", () => {
        for (const surface of ["veil", "opaque"] as const) {
            const wrapper = mount(Surface, {
                props: { surface, deep: true, specular: "full" },
            });

            expect(wrapper.attributes("data-deep")).toBeUndefined();
            expect(wrapper.attributes("data-specular")).toBeUndefined();
            expect(wrapper.classes()).not.toContain("glass-deep");
            expect(wrapper.classes()).not.toContain("glass-specular-track");
        }
    });

    it("owns the optional shadow, grain, and specular contract", () => {
        const wrapper = mount(Surface, {
            props: { shadow: true, grain: true, specular: "subtle" },
        });

        expect(wrapper.attributes("data-shadow")).toBe("true");
        expect(wrapper.attributes("data-grain")).toBe("true");
        expect(wrapper.attributes("data-specular")).toBe("subtle");
        expect(wrapper.classes()).toContain("glass-specular-track");
    });

    it("merges consumer style with full specular tuning", () => {
        const wrapper = mount(Surface, {
            attrs: { style: { color: "red" } },
            props: { specular: "full" },
        });

        expect(wrapper.attributes("style")).toContain("color: red");
        expect(wrapper.attributes("style")).toContain(
            "--glass-specular-intensity-hover: 0.18",
        );
    });
});
