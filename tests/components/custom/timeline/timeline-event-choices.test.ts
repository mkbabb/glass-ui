import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../../../demo/chassis/page/StoryPage.vue", () => ({
    default: defineComponent({ template: "<main><slot /></main>" }),
}));

vi.mock("../../../../demo/chassis/section/StorySection.vue", () => ({
    default: defineComponent({ template: "<section><slot /></section>" }),
}));

import TimelineStory from "../../../../demo/stories/data/timeline.vue";

describe("Timeline story event choices", () => {
    it("uses named ordered-list buttons with current state and direct key travel", async () => {
        const wrapper = mount(TimelineStory, { attachTo: document.body });
        const choices = wrapper.findAll("ol > li > button");

        expect(choices).toHaveLength(6);
        expect(choices.map((choice) => choice.text())).toEqual(
            expect.arrayContaining([
                expect.stringContaining("Kickoff"),
                expect.stringContaining("Launch"),
            ]),
        );

        await choices[1].trigger("click");
        expect(choices[1].attributes("aria-current")).toBe("step");
        expect(wrapper.text()).toContain("Wireframes approved.");

        (choices[1].element as HTMLButtonElement).focus();
        await choices[1].trigger("keydown", { key: "ArrowDown" });
        expect(document.activeElement).toBe(choices[2].element);
        expect(choices[1].attributes("aria-current")).toBe("step");

        (choices[2].element as HTMLButtonElement).click();
        await wrapper.vm.$nextTick();
        expect(choices[2].attributes("aria-current")).toBe("step");
        expect(wrapper.text()).toContain("Core features land.");

        await choices[2].trigger("keydown", { key: "End" });
        expect(document.activeElement).toBe(choices[5].element);
        await choices[5].trigger("keydown", { key: "Home" });
        expect(document.activeElement).toBe(choices[0].element);
    });
});
