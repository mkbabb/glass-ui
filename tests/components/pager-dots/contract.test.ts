import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { describe, expect, it } from "vitest";
import PagerDots from "@glass/components/pager-dots/PagerDots.vue";

// The boundary fixture states `pattern="tabs"` EXPLICITLY. It used to ride the prop
// default, and the default is `"group"` now — the presentation register is the common
// case and the tablist register is only correct when the caller owns real panels. These
// two cases assert the tabs register's `aria-selected`, so they name it rather than
// inheriting whatever the default happens to be.
const BoundaryPager = defineComponent({
    components: { PagerDots },
    data: () => ({ active: 7, count: 10 }),
    template: `<PagerDots v-model:active="active" :count="count" :window-fit="5" pattern="tabs" />`,
});

// [2026-08-08 · #40 W-PAGER completion · STRUCK IN PLACE] The `PagerDots SVG resources`
// describe stood here — two cases pinning per-instance `<filter>`/`<clipPath>` id
// uniqueness, `url(#…)` reference from the root style, fresh-namespace-on-remount and
// removal-on-unmount. THE MECHANISM THEY PINNED IS DELETED, not moved: the worm is
// filterless (PagerDots.vue's own header, "THE WORM IS FILTERLESS"), the SVG
// blur-and-threshold graph and the Bézier clip are gone, and the component emits no
// `<filter>`, no `<clipPath>` and no `url(#…)` at all. A resource-lifecycle case over
// resources that do not exist is a promise, not a detector. THE SUCCESSOR COVERAGE IS
// REPO-WIDE AND STRONGER: `tests/styles/stacked-url-filter.test.ts`'s stacked case —
// born-RED on this very component and flipped GREEN by this lane — asserts that NO file
// in `src/` paints `filter: url(#…)` beside its own backdrop lens. Nothing is dropped
// silently: the id-collision class it guarded cannot recur without a `url(#…)` first,
// and that is now a live invariant rather than one component's fixture.

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
