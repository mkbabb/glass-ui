// E2 — the vertical-rail collapse OPT-IN contract (E1 §2f).
//
// The defect this guards: the vertical/`rail` form HARD-FORCED `alwaysExpanded`
// (`w = alwaysExpanded || orientation==='vertical'`), so the crest-only
// collapsible rail the README called "aspirational fiction" had no implementation
// — even though `useDockState`'s `collapsed | hover | pinned` machine ships.
//
// The fix: relax to `alwaysExpanded ?? (orientation==='vertical')` so a vertical
// dock may OPT IN via `:always-expanded="false"`, engaging the existing machine and
// rendering the `#collapsed` slot as the collapsed summary (the crest). This proof
// asserts BOTH the opt-in capability AND that the default (no prop) is UNCHANGED.

import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import GlassDock from "../../../../src/components/custom/dock/GlassDock.vue";

const slots = {
    default: '<div data-testid="dock-full">FULL COLUMN</div>',
    collapsed: '<div data-testid="dock-crest">CREST</div>',
};

describe("GlassDock vertical collapse opt-in (E2 / §2f)", () => {
    it("BACK-COMPAT: a vertical dock with NO always-expanded prop stays always-expanded", () => {
        const wrapper = mount(GlassDock, {
            props: { orientation: "vertical" },
            slots,
        });
        const vm = wrapper.vm as unknown as { expanded: boolean; isPinned: boolean };
        // Always-expanded vertical dock: the machine pins it open on mount.
        expect(vm.expanded).toBe(true);
        expect(vm.isPinned).toBe(true);
        // The full column renders; the collapsed slot is the trailing tool-palette
        // section (it renders, but the dock is NOT in a collapsed STATE).
        expect(wrapper.find('[data-testid="dock-full"]').exists()).toBe(true);
        // `always-expanded` data class is present (the tool-palette resting shape).
        expect(wrapper.get(".glass-dock").classes()).toContain("always-expanded");
    });

    it("BACK-COMPAT: variant=rail with no prop stays always-expanded (the nav-rail default)", () => {
        const wrapper = mount(GlassDock, {
            props: { variant: "rail" },
            slots,
        });
        const vm = wrapper.vm as unknown as { expanded: boolean; isPinned: boolean };
        expect(vm.expanded).toBe(true);
        expect(vm.isPinned).toBe(true);
        expect(wrapper.get(".glass-dock").classes()).toContain("always-expanded");
    });

    it("OPT-IN: a vertical dock with :always-expanded=false ENGAGES the collapse machine and STARTS COLLAPSED", () => {
        const wrapper = mount(GlassDock, {
            props: { orientation: "vertical", alwaysExpanded: false },
            slots,
        });
        const vm = wrapper.vm as unknown as { expanded: boolean; isPinned: boolean };
        // The machine engages: the rail rests COLLAPSED (the crest-only resting
        // state), not always-expanded.
        expect(vm.expanded).toBe(false);
        expect(vm.isPinned).toBe(false);
        const root = wrapper.get(".glass-dock");
        expect(root.classes()).not.toContain("always-expanded");
        expect(root.classes()).toContain("collapsed");
    });

    it("OPT-IN: the #collapsed slot renders as the collapsed SUMMARY in the vertical branch", () => {
        const wrapper = mount(GlassDock, {
            props: { variant: "rail", alwaysExpanded: false },
            slots,
        });
        // The crest (collapsed summary) is present, in the summary layer.
        const crest = wrapper.find('[data-testid="dock-crest"]');
        expect(crest.exists()).toBe(true);
        // It is the SUMMARY pane (the active layer while collapsed), not the
        // trailing tool-palette section.
        const summaryLayer = wrapper.find(".dock-layer--summary");
        expect(summaryLayer.exists()).toBe(true);
        expect(summaryLayer.find('[data-testid="dock-crest"]').exists()).toBe(true);
        // The collapsed summary is the ACTIVE layer; the full column is inert.
        expect(summaryLayer.classes()).toContain("is-active");
        expect(wrapper.find(".dock-layer--full").attributes("inert")).toBeDefined();
    });

    it("OPT-IN: hover engages the machine — the rail expands to the full column", async () => {
        const wrapper = mount(GlassDock, {
            props: { orientation: "vertical", alwaysExpanded: false },
            slots,
        });
        const vm = wrapper.vm as unknown as {
            expanded: boolean;
            expand: () => void;
        };
        expect(vm.expanded).toBe(false);

        // The imperative expand (what hover/focus/click drives through the machine)
        // opens the rail.
        vm.expand();
        await wrapper.vm.$nextTick();
        expect(vm.expanded).toBe(true);
        // The full column is now the active layer.
        expect(wrapper.find(".dock-layer--full").classes()).toContain("is-active");
    });

    it("OPT-IN: clicking the collapsed crest PINS the rail open (the canonical disclosure)", async () => {
        const wrapper = mount(GlassDock, {
            props: { variant: "rail", alwaysExpanded: false },
            slots,
        });
        const vm = wrapper.vm as unknown as { isPinned: boolean; expanded: boolean };
        expect(vm.expanded).toBe(false);

        // The collapsed summary carries @click=onClickCollapsed (pin-on-click).
        await wrapper.get(".dock-layer--summary").trigger("click");
        await wrapper.vm.$nextTick();
        expect(vm.isPinned).toBe(true);
        expect(vm.expanded).toBe(true);
    });

    it("layout=grid still HARD-FORCES always-expanded even with always-expanded=false", () => {
        // The grid contract is non-negotiable: a 2D tile panel is always-expanded
        // regardless of the relaxed vertical default.
        const wrapper = mount(GlassDock, {
            props: { layout: "grid", alwaysExpanded: false },
            slots,
        });
        const vm = wrapper.vm as unknown as { isPinned: boolean };
        expect(vm.isPinned).toBe(true);
        expect(wrapper.get(".glass-dock").classes()).toContain("always-expanded");
    });
});
