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

const BoundaryPager = defineComponent({
    components: { PagerDots },
    data: () => ({ active: 7, count: 10 }),
    template: `<PagerDots v-model:active="active" :count="count" :window-fit="5" />`,
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

describe("PagerDots boundaries", () => {
    it("clamps selection when a dynamic count shrinks", async () => {
        const wrapper = mount(BoundaryPager);
        await wrapper.setData({ count: 3 });

        expect(wrapper.vm.active).toBe(2);
        expect(wrapper.findAll('[data-slot="pager-dot"]')).toHaveLength(3);
        expect(wrapper.get('[aria-selected="true"]').attributes("aria-label")).toContain("3");
        expect(wrapper.findAll('[tabindex="0"]')).toHaveLength(1);
    });

    it("renders an empty, valid rail at zero count", async () => {
        const wrapper = mount(BoundaryPager);
        await wrapper.setData({ count: 0 });

        expect(wrapper.vm.active).toBe(0);
        expect(wrapper.findAll('[data-slot="pager-dot"]')).toHaveLength(0);
        expect(wrapper.findAll('[tabindex="0"]')).toHaveLength(0);
    });

    it("normalizes fractional semantic selection and keeps keyboard steps integral", async () => {
        const wrapper = mount(BoundaryPager);
        await wrapper.setData({ active: 1.6, count: 4 });
        expect(wrapper.vm.active).toBe(2);

        await wrapper.get('[tabindex="0"]').trigger("keydown", { key: "ArrowRight" });
        expect(wrapper.vm.active).toBe(3);
        expect(wrapper.get('[aria-selected="true"]').attributes("aria-label")).toContain("4");
    });
});

// The tabs-pattern tab↔panel linkage — the slide-id contract. Index-aligned to slides
// (the SegmentedTabs `option.controls` precedent, factored for the count-based rail): a
// `panelIds` entry becomes the dot's `aria-controls`, completing the APG tablist↔tabpanel
// linkage for a consumer that owns the panels. RED before the contract exists: the
// `role="tab"` dots carry no `aria-controls`.
describe("PagerDots tab↔panel linkage (the slide-id contract)", () => {
    it("emits aria-controls on each tabs-pattern dot from panelIds", () => {
        const wrapper = mount(PagerDots, {
            props: {
                count: 3,
                active: 1,
                pattern: "tabs",
                panelIds: ["slide-panel-0", "slide-panel-1", "slide-panel-2"],
                ariaLabel: "Linked carousel",
            },
        });
        const dots = wrapper.findAll('[data-slot="pager-dot"]');
        expect(dots).toHaveLength(3);
        dots.forEach((dot, i) => {
            expect(dot.attributes("role")).toBe("tab");
            expect(dot.attributes("aria-controls")).toBe(`slide-panel-${i}`);
        });
    });

    it("omits aria-controls where a slide id is absent from the contract", () => {
        const wrapper = mount(PagerDots, {
            props: {
                count: 3,
                active: 0,
                pattern: "tabs",
                // sparse — only the middle slide is linked
                panelIds: [undefined as unknown as string, "mid-panel", undefined as unknown as string],
                ariaLabel: "Sparse",
            },
        });
        const dots = wrapper.findAll('[data-slot="pager-dot"]');
        expect(dots[0]!.attributes("aria-controls")).toBeUndefined();
        expect(dots[1]!.attributes("aria-controls")).toBe("mid-panel");
        expect(dots[2]!.attributes("aria-controls")).toBeUndefined();
    });

    it("ignores panelIds in the group presentation pattern (aria-current, not tab)", () => {
        const wrapper = mount(PagerDots, {
            props: {
                count: 3,
                active: 0,
                pattern: "group",
                ring: false,
                panelIds: ["p0", "p1", "p2"],
                ariaLabel: "Slides",
            },
        });
        for (const dot of wrapper.findAll('[data-slot="pager-dot"]')) {
            expect(dot.attributes("aria-controls")).toBeUndefined();
        }
    });
});

// The full-viewport PRESENTATION register the deck composes DIRECTLY (`pattern="group"`
// + `:ring="false"`) — no DeckPager wrapper. role="group"/aria-current replace the tabs
// register's tablist/aria-selected. Relocated here from the retired DeckPager contract
// test (behavior survives on the survivor; the wrapper does not).
describe("PagerDots group register (the deck presentation pattern)", () => {
    it("renders role=group with aria-current on the active dot", () => {
        const wrapper = mount(PagerDots, {
            props: {
                count: 8,
                active: 3,
                windowFit: 5,
                pattern: "group",
                ring: false,
                ariaLabel: "Slides",
            },
        });
        expect(wrapper.get('[role="group"]').attributes("aria-label")).toBe("Slides");
        expect(wrapper.get('[aria-current="true"]').attributes("aria-label")).toContain(
            "4",
        );
    });
});
