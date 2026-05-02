import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { nextTick, ref } from "vue";
import ExpandableContainer from "@/components/custom/expandable-container/ExpandableContainer.vue";
import TypewriterText from "@/components/custom/typewriter/TypewriterText.vue";
import { useGlassCarousel } from "@/components/custom/glass-carousel/useGlassCarousel";
import { mountComposable } from "./utils/mountComposable";

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    document.body.style.overflow = "";
});

describe("lifecycle cleanup", () => {
    it("clears delayed typewriter starts on unmount", () => {
        vi.useFakeTimers();

        const wrapper = mount(TypewriterText, {
            props: {
                text: "Delayed text",
                startDelay: 1_000,
            },
        });

        wrapper.unmount();
        vi.advanceTimersByTime(1_000);

        expect(wrapper.emitted("start")).toBeUndefined();
    });

    it("restores body overflow after all expandable container locks release", async () => {
        document.body.style.overflow = "auto";

        const first = mount(ExpandableContainer, {
            props: { open: true },
            slots: { default: "First" },
        });
        const second = mount(ExpandableContainer, {
            props: { open: true },
            slots: { default: "Second" },
        });

        expect(document.body.style.overflow).toBe("hidden");

        first.unmount();
        expect(document.body.style.overflow).toBe("hidden");

        await second.setProps({ open: false });
        expect(document.body.style.overflow).toBe("auto");

        second.unmount();
    });

    it("detaches glass carousel scroll listeners from the bound viewport", async () => {
        const orientation = ref<"horizontal" | "vertical">("horizontal");
        const expanded = ref(false);
        const rootEl = ref<HTMLElement | null>(document.createElement("div"));
        const viewportEl = ref<HTMLElement | null>(null);
        const firstViewport = document.createElement("div");
        const secondViewport = document.createElement("div");
        const firstAdd = vi.spyOn(firstViewport, "addEventListener");
        const firstRemove = vi.spyOn(firstViewport, "removeEventListener");
        const secondAdd = vi.spyOn(secondViewport, "addEventListener");
        const secondRemove = vi.spyOn(secondViewport, "removeEventListener");

        const mounted = mountComposable(() =>
            useGlassCarousel({
                orientation,
                expanded,
                rootEl,
                viewportEl,
            }),
        );

        viewportEl.value = firstViewport;
        await nextTick();
        const firstScrollHandler = firstAdd.mock.calls[0]?.[1];
        expect(firstAdd).toHaveBeenCalledWith("scroll", firstScrollHandler, { passive: true });

        viewportEl.value = secondViewport;
        await nextTick();
        const secondScrollHandler = secondAdd.mock.calls[0]?.[1];
        expect(firstRemove).toHaveBeenCalledWith("scroll", firstScrollHandler);
        expect(secondAdd).toHaveBeenCalledWith("scroll", secondScrollHandler, { passive: true });

        mounted.unmount();
        expect(secondRemove).toHaveBeenCalledWith("scroll", secondScrollHandler);
    });
});
