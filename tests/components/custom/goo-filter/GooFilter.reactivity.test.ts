import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import GooFilter from "@glass/components/goo-filter/GooFilter.vue";

describe("GooFilter extras", () => {
    it("updates and replaces consumer filter specs", async () => {
        const wrapper = mount(GooFilter, {
            props: {
                extra: [{ id: "consumer-goo", blur: 2, slope: 10, offset: -4 }],
            },
        });

        await wrapper.setProps({
            extra: [{ id: "consumer-goo", blur: 5, slope: 12, offset: -6 }],
        });
        expect(wrapper.get("#consumer-goo feGaussianBlur").attributes("stdDeviation")).toBe(
            "5",
        );
        expect(wrapper.get("#consumer-goo feColorMatrix").attributes("values")).toContain(
            "12 -6",
        );

        await wrapper.setProps({
            extra: [{ id: "replacement-goo", blur: 3, slope: 14, offset: -7 }],
        });
        expect(wrapper.find("#consumer-goo").exists()).toBe(false);
        expect(wrapper.find("#replacement-goo").exists()).toBe(true);
    });
});
