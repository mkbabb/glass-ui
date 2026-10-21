import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import ExpandableContainer from "@glass/components/expandable-container/ExpandableContainer.vue";
import TypewriterText from "@glass/components/typewriter/TypewriterText.vue";

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

    // U/B7 D-2: the lock sits on the root element; `body` is never written.
    it("restores root overflow after all expandable container locks release", async () => {
        const root = document.documentElement;
        root.style.overflow = "auto";
        document.body.style.overflow = "";

        const first = mount(ExpandableContainer, {
            props: { open: true },
            slots: { default: "First" },
        });
        const second = mount(ExpandableContainer, {
            props: { open: true },
            slots: { default: "Second" },
        });

        expect(root.style.overflow).toBe("hidden");
        expect(document.body.style.overflow).toBe("");

        first.unmount();
        expect(root.style.overflow).toBe("hidden");
        expect(document.body.style.overflow).toBe("");

        await second.setProps({ open: false });
        expect(root.style.overflow).toBe("auto");

        second.unmount();
        root.style.overflow = "";
    });
});
