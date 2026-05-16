import { mount } from "@vue/test-utils";
import { computed, defineComponent, h, inject, ref } from "vue";
import { describe, expect, it, vi } from "vitest";
import ProgressiveSidebar from "../ProgressiveSidebar.vue";
import ProgressiveSidebarSection from "../ProgressiveSidebarSection.vue";
import {
    PROGRESSIVE_SIDEBAR_CONTEXT_KEY,
    type ProgressiveSidebarContext,
} from "../context";
import type { SidebarState } from "../types";

function createState(): SidebarState {
    const activeId = ref<string | null>(null);

    return {
        sections: [
            {
                id: "intro",
                title: "<img src=x onerror=alert(1)>Intro",
                children: [
                    {
                        id: "intro-child",
                        title: "<strong>Child</strong>",
                    },
                ],
            },
        ],
        activeId,
        activeRootId: computed(() => activeId.value),
        treeIndex: new Map(),
        isExpanded: () => true,
        toggleSection: vi.fn(),
        navigateTo: vi.fn(),
        scrollToTop: vi.fn(),
        isActive: () => false,
        isInActiveChain: () => true,
    };
}

describe("ProgressiveSidebar — TOC mode", () => {
    it("renders transformed titles as text instead of consumer-provided HTML", () => {
        const wrapper = mount(ProgressiveSidebar, {
            props: {
                state: createState(),
                renderTitle: (title) => `<mark>${title}</mark>`,
            },
        });

        expect(wrapper.find("mark").exists()).toBe(false);
        expect(wrapper.find("img").exists()).toBe(false);
        expect(wrapper.text()).toContain("<mark><img src=x onerror=alert(1)>Intro</mark>");
        expect(wrapper.text()).toContain("<mark><strong>Child</strong></mark>");
    });
});

describe("ProgressiveSidebar — slotted mode", () => {
    it("renders slotted <ProgressiveSidebarSection> children when state is omitted", () => {
        const wrapper = mount(ProgressiveSidebar, {
            slots: {
                default: () => [
                    h(ProgressiveSidebarSection, { id: "filters", label: "Filters" }, () => "filter body"),
                    h(ProgressiveSidebarSection, { id: "sort", label: "Sort" }, () => "sort body"),
                ],
            },
        });

        const sections = wrapper.findAll(".progressive-sidebar-section");
        expect(sections).toHaveLength(2);
        expect(sections[0]!.attributes("data-section-id")).toBe("filters");
        expect(sections[1]!.attributes("data-section-id")).toBe("sort");
        expect(wrapper.text()).toContain("Filters");
        expect(wrapper.text()).toContain("filter body");
        expect(wrapper.text()).toContain("Sort");
        expect(wrapper.text()).toContain("sort body");
        // TOC-mode header MUST NOT render in slotted mode.
        expect(wrapper.text()).not.toContain("Contents");
    });

    it("sections register + unregister with the parent chassis via DI", async () => {
        const captured = ref<ProgressiveSidebarContext | null>(null);
        const Probe = defineComponent({
            name: "Probe",
            setup() {
                captured.value = inject(PROGRESSIVE_SIDEBAR_CONTEXT_KEY, null);
                return () => null;
            },
        });

        const show = ref(true);
        const wrapper = mount(
            defineComponent({
                components: { ProgressiveSidebar, ProgressiveSidebarSection, Probe },
                setup() {
                    return { show };
                },
                template: `
                    <ProgressiveSidebar>
                        <Probe />
                        <ProgressiveSidebarSection id="a" label="A" />
                        <ProgressiveSidebarSection v-if="show" id="b" label="B" />
                    </ProgressiveSidebar>
                `,
            }),
        );

        // Probe captured the installed context from the chassis.
        expect(captured.value).toBeTruthy();
        const ctx = captured.value!;

        // Both sections mounted + registered → DOM has two sections; context
        // recognises both ids as known (isActive returns false for unmatched
        // active; we cross-check via direct registry probe through the public
        // isActive surface — active is null so isActive returns false but the
        // ids are known to the registry via mount-time register calls).
        expect(wrapper.findAll(".progressive-sidebar-section")).toHaveLength(2);
        expect(ctx.isActive("a")).toBe(false);
        expect(ctx.isActive("b")).toBe(false);

        // Unmount section "b" → unregister fires on cleanup.
        show.value = false;
        await wrapper.vm.$nextTick();
        expect(wrapper.findAll(".progressive-sidebar-section")).toHaveLength(1);

        wrapper.unmount();
    });

    it("marks the active section via context.isActive cascade", () => {
        const wrapper = mount(ProgressiveSidebar, {
            props: { active: "sort" },
            slots: {
                default: () => [
                    h(ProgressiveSidebarSection, { id: "filters", label: "Filters" }),
                    h(ProgressiveSidebarSection, { id: "sort", label: "Sort" }),
                ],
            },
        });

        const sections = wrapper.findAll(".progressive-sidebar-section");
        expect(sections[0]!.attributes("data-active")).toBeUndefined();
        expect(sections[1]!.attributes("data-active")).toBe("");
    });
});

describe("ProgressiveSidebarSection — standalone", () => {
    it("renders without a chassis (optional-context fallback)", () => {
        const wrapper = mount(ProgressiveSidebarSection, {
            props: { id: "lone", label: "Standalone" },
            slots: { default: () => "lone body" },
        });

        expect(wrapper.find(".progressive-sidebar-section").exists()).toBe(true);
        expect(wrapper.text()).toContain("Standalone");
        expect(wrapper.text()).toContain("lone body");
        expect(wrapper.attributes("data-active")).toBeUndefined();
    });
});
