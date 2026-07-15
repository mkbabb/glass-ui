import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { describe, expect, it } from "vitest";
import PagerDots from "@glass/components/pager-dots/PagerDots.vue";

const MultiPager = defineComponent({
    components: { PagerDots },
    data: () => ({ active: 0, showRemount: true }),
    template: `
        <div>
            <PagerDots v-for="i in 4" :key="i" :count="4" :active="active" />
            <div data-remount>
                <PagerDots v-if="showRemount" :count="3" :active="active" />
            </div>
        </div>
    `,
});

describe("PagerDots SVG resources", () => {
    it("keeps filter and clip ids unique per instance and stable across rerender", async () => {
        const wrapper = mount(MultiPager, { attachTo: document.body });
        const ids = () =>
            wrapper
                .findAll(".pager-dots filter, .pager-dots clipPath")
                .map((node) => node.attributes("id"));
        const before = ids();

        expect(before).toHaveLength(10);
        expect(new Set(before).size).toBe(before.length);
        for (const pager of wrapper.findAll(".pager-dots")) {
            const filterId = pager.find("filter").attributes("id");
            const clipId = pager.find("clipPath").attributes("id");
            expect(pager.attributes("style")).toContain(`url(#${filterId})`);
            expect(pager.attributes("style")).toContain(`url(#${clipId})`);
        }

        await wrapper.setData({ active: 2 });
        expect(ids()).toEqual(before);
    });

    it("allocates a fresh namespace on remount and removes definitions on unmount", async () => {
        const wrapper = mount(MultiPager, { attachTo: document.body });
        const remountHost = () => wrapper.find("[data-remount]");
        const first = remountHost().get("filter").element.id;

        await wrapper.setData({ showRemount: false });
        expect(document.getElementById(first)).toBeNull();
        await wrapper.setData({ showRemount: true });
        const second = remountHost().get("filter").element.id;
        expect(second).not.toBe(first);

        const mountedIds = wrapper
            .findAll(".pager-dots filter, .pager-dots clipPath")
            .map((node) => node.element.id);
        wrapper.unmount();
        expect(mountedIds.every((id) => document.getElementById(id) === null)).toBe(true);
    });
});
