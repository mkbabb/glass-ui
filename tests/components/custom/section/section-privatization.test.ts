import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import * as Components from "@glass/components";
import * as Glass from "@glass/index";
import StorySection from "../../../../demo/chassis/section/StorySection.vue";
import { findStory } from "../../../../demo/stories/manifest";

describe("Section privatization", () => {
    it("removes the public story while keeping StorySection as the demo landmark owner", () => {
        expect(Object.hasOwn(Glass, "Section")).toBe(false);
        expect(Object.hasOwn(Components, "Section")).toBe(false);
        expect(findStory("display", "section")).toBeUndefined();

        const wrapper = mount(StorySection, {
            props: { label: "Demo anatomy", heading: "Private section" },
            slots: { default: "Body" },
        });
        expect(wrapper.element.tagName).toBe("SECTION");
        expect(wrapper.get("h2").text()).toBe("Private section");
        expect(wrapper.text()).toContain("Demo anatomy");
        expect(wrapper.text()).toContain("Body");
    });
});
