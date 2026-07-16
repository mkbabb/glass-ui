import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick, ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useMotionAxis } from "@glass/components/_shared/useMotionAxis";

afterEach(() => vi.restoreAllMocks());

describe("useMotionAxis", () => {
    it("reacts to the shared reduced-motion preference", async () => {
        let reduced = false;
        const listeners = new Set<(event: MediaQueryListEvent) => void>();
        const query = {
            get matches() {
                return reduced;
            },
            addEventListener: (
                _: string,
                listener: (event: MediaQueryListEvent) => void,
            ) => listeners.add(listener),
            removeEventListener: (
                _: string,
                listener: (event: MediaQueryListEvent) => void,
            ) => listeners.delete(listener),
        } as unknown as MediaQueryList;
        vi.spyOn(window, "matchMedia").mockReturnValue(query);

        const requested = ref<"full" | "off">("full");
        const wrapper = mount(
            defineComponent({
                setup() {
                    const motion = useMotionAxis(requested);
                    return () =>
                        h("div", {
                            "data-motion": motion.dataMotion.value,
                            "data-armed": motion.armed.value,
                        });
                },
            }),
        );

        expect(wrapper.attributes("data-motion")).toBeUndefined();
        expect(wrapper.attributes("data-armed")).toBe("true");
        expect(listeners).toHaveLength(1);

        reduced = true;
        for (const listener of listeners)
            listener({ matches: true } as MediaQueryListEvent);
        await nextTick();
        expect(wrapper.attributes("data-motion")).toBe("reduced");
        expect(wrapper.attributes("data-armed")).toBe("false");

        requested.value = "off";
        await nextTick();
        expect(wrapper.attributes("data-motion")).toBe("off");

        wrapper.unmount();
        expect(listeners).toHaveLength(0);
    });
});
