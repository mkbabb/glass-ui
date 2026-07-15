import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import TypewriterText from "@glass/components/typewriter/TypewriterText.vue";
import { useTypewriter } from "@glass/components/typewriter/composables/useTypewriter";

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
});

describe("TypewriterText contract", () => {
    it("renders ordinary text without a glyph interaction API", async () => {
        vi.useFakeTimers();
        const component = TypewriterText as unknown as { props: Record<string, unknown> };
        expect(component.props).not.toHaveProperty("interactive");

        const wrapper = mount(TypewriterText, {
            props: {
                text: "plain text",
                cursorVisible: false,
                errorRate: 0,
                ngramSize: 20,
                respectReducedMotion: false,
            },
        });
        await vi.runAllTimersAsync();

        expect(wrapper.get(".tw-root").text()).toBe("plain text");
        expect(wrapper.find(".tw-char--interactive").exists()).toBe(false);
        expect(wrapper.emitted("start")).toHaveLength(1);
        expect(wrapper.emitted("complete")).toHaveLength(1);

        await wrapper.get(".tw-root").trigger("click");
        await vi.runAllTimersAsync();
        expect(wrapper.get(".tw-root").text()).toBe("plain text");
    });

    it("reveals and positions whole graphemes", async () => {
        vi.useFakeTimers();
        const family = "👨‍👩‍👧‍👦";
        const typewriter = useTypewriter({
            text: `A${family}B`,
            ngramSize: 1,
            variance: 0,
            errorRate: 0,
            firstAnimationSpeedFactor: 1,
            respectReducedMotion: false,
        });

        const typing = typewriter.startTyping();
        expect(typewriter.displayText.value).toBe("A");
        await vi.runOnlyPendingTimersAsync();
        expect(typewriter.displayText.value).toBe(`A${family}`);
        await vi.runAllTimersAsync();
        await typing;
        expect(typewriter.displayText.value).toBe(`A${family}B`);

        typewriter.setCharPosition(2);
        expect(typewriter.displayText.value).toBe(`A${family}`);
        expect(typewriter).not.toHaveProperty("backspaceToPosition");
    });

    it("preserves interruption, reset, pause, and resume", async () => {
        vi.useFakeTimers();
        const typewriter = useTypewriter({
            text: "first",
            ngramSize: 1,
            variance: 0,
            errorRate: 0,
            respectReducedMotion: false,
        });

        void typewriter.startTyping();
        typewriter.pause();
        expect(typewriter.isTyping.value).toBe(false);

        typewriter.updateText("second");
        typewriter.reset();
        expect(typewriter.displayText.value).toBe("");

        typewriter.resume();
        await vi.runAllTimersAsync();
        expect(typewriter.displayText.value).toBe("second");
        expect(typewriter.isTyping.value).toBe(false);
    });

    it("resets word positioning to the first word's graphemes", () => {
        const typewriter = useTypewriter({
            words: [{ text: "A👨‍👩‍👧‍👦B" }, { text: "stale" }],
        });

        typewriter.forceWord(1, 5);
        typewriter.reset();
        typewriter.setCharPosition(2);

        expect(typewriter.displayText.value).toBe("A👨‍👩‍👧‍👦");
    });

    it("completes immediately with the same callback under reduced motion", async () => {
        const onComplete = vi.fn();
        vi.spyOn(window, "matchMedia").mockReturnValue({
            matches: true,
        } as MediaQueryList);
        const typewriter = useTypewriter({ text: "complete", onComplete });

        await typewriter.startTyping();

        expect(typewriter.displayText.value).toBe("complete");
        expect(typewriter.isTyping.value).toBe(false);
        expect(onComplete).toHaveBeenCalledOnce();
    });
});
