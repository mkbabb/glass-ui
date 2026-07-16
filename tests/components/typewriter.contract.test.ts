import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";

import TypewriterText from "@glass/components/typewriter/TypewriterText.vue";

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
});

describe("Typewriter AT and geometry contract", () => {
    it("exposes the complete text once while hiding partial visual frames", async () => {
        vi.useFakeTimers();
        const wrapper = mount(TypewriterText, {
            props: {
                text: "Atlas words",
                cursorVisible: false,
                ngramSize: 1,
                variance: 0,
                errorRate: 0,
                firstAnimationSpeedFactor: 1,
                respectReducedMotion: false,
            },
        });

        await vi.advanceTimersByTimeAsync(0);

        const accessible = wrapper.findAll(".tw-accessible");
        expect(accessible).toHaveLength(1);
        expect(accessible[0].text()).toBe("Atlas words");
        expect(accessible[0].attributes("aria-live")).toBeUndefined();
        expect(wrapper.get(".tw-visual").attributes("aria-hidden")).toBe("true");
        expect(wrapper.get(".tw-visual").text()).not.toBe("Atlas words");
    });

    it("reserves every settled rotation phrase outside the accessibility tree", async () => {
        vi.useFakeTimers();
        const wrapper = mount(TypewriterText, {
            props: {
                words: [{ text: "Atlas" }, { text: "Longer words" }],
                cursorVisible: false,
                startDelay: 1_000,
                respectReducedMotion: false,
            },
        });

        const reserves = wrapper.findAll(".tw-reserve");
        expect(reserves.map((node) => node.text())).toEqual(["Atlas", "Longer words"]);
        expect(reserves.every((node) => node.attributes("aria-hidden") === "true")).toBe(
            true,
        );
        expect(wrapper.findAll(".tw-accessible")).toHaveLength(1);
        expect(wrapper.get(".tw-accessible").text()).toBe("Atlas");

        (wrapper.vm as unknown as { forceWord: (index: number, char: number) => void })
            .forceWord(1, 1);
        await nextTick();

        expect(wrapper.get(".tw-accessible").text()).toBe("Longer words");
        expect(wrapper.get(".tw-visual").text()).toBe("L");
    });

    it("seats a delayed start once when reduced motion arrives", async () => {
        vi.useFakeTimers();
        let reduced = false;
        let listener: ((event: MediaQueryListEvent) => void) | undefined;
        vi.spyOn(window, "matchMedia").mockReturnValue({
            get matches() {
                return reduced;
            },
            addEventListener: vi.fn(
                (_type: string, next: (event: MediaQueryListEvent) => void) => {
                    listener = next;
                },
            ),
            removeEventListener: vi.fn(),
        } as unknown as MediaQueryList);
        const wrapper = mount(TypewriterText, {
            props: {
                text: "Settled",
                cursorVisible: false,
                startDelay: 1_000,
            },
        });

        expect(wrapper.get(".tw-visual").text()).toBe("");
        reduced = true;
        listener?.({ matches: true } as MediaQueryListEvent);
        await nextTick();

        expect(wrapper.get(".tw-visual").text()).toBe("Settled");
        expect(wrapper.emitted("start")).toHaveLength(1);
        expect(wrapper.emitted("complete")).toHaveLength(1);

        await vi.advanceTimersByTimeAsync(1_000);
        expect(wrapper.emitted("start")).toHaveLength(1);
        expect(wrapper.emitted("complete")).toHaveLength(1);
    });
});
