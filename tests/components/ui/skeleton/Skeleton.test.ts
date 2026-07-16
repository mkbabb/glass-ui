import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { Skeleton } from "@glass/components/skeleton";

describe("Skeleton contract", () => {
    it("renders one explicitly decorative reserved shape", () => {
        const wrapper = mount(Skeleton);

        expect(wrapper.attributes("data-slot")).toBe("skeleton");
        expect(wrapper.attributes("aria-hidden")).toBe("true");
        expect(wrapper.attributes("role")).toBeUndefined();
        expect(wrapper.element.children).toHaveLength(0);
    });

    it("keeps loading semantics on the parent rather than accepting them itself", () => {
        const wrapper = mount(Skeleton, {
            attrs: {
                role: "status",
                "aria-label": "Loading",
                "aria-busy": "true",
            },
        });

        expect(wrapper.attributes("aria-hidden")).toBe("true");
        expect(wrapper.attributes("role")).toBeUndefined();
        expect(wrapper.attributes("aria-label")).toBeUndefined();
        expect(wrapper.attributes("aria-busy")).toBeUndefined();
    });

    it("leaves geometry and composition classes to the caller", () => {
        const wrapper = mount(Skeleton, {
            props: { class: "h-12 w-32 rounded-full" },
            attrs: { style: "max-width: 10rem" },
        });

        expect(wrapper.classes()).toEqual(
            expect.arrayContaining(["skeleton", "h-12", "w-32", "rounded-full"]),
        );
        expect(wrapper.attributes("style")).toContain("max-width: 10rem");
    });
});
