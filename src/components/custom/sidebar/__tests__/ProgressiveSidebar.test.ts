import { mount } from "@vue/test-utils";
import { computed, ref } from "vue";
import { describe, expect, it, vi } from "vitest";
import ProgressiveSidebar from "../ProgressiveSidebar.vue";
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

describe("ProgressiveSidebar", () => {
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
