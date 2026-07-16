import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { PaperBackdrop } from "@glass/components/paper-backdrop";

describe("PaperBackdrop", () => {
    it("publishes one decorative semantic host", () => {
        const wrapper = mount(PaperBackdrop, { props: { class: "route-field" } });

        expect(wrapper.element.tagName).toBe("DIV");
        expect(wrapper.classes()).toEqual(["paper-underpaint", "route-field"]);
        expect(wrapper.attributes()).toMatchObject({
            "aria-hidden": "true",
            "data-slot": "paper-backdrop",
        });
        expect(wrapper.attributes("style")).toBeUndefined();
    });
});
