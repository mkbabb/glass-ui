import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import ExpandableContainer from "@glass/components/custom/expandable-container/ExpandableContainer.vue";
import TypewriterText from "@glass/components/custom/typewriter/TypewriterText.vue";

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
});
