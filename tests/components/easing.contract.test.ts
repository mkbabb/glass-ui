import { flushPromises, mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import EasingPicker from "@glass/components/easing/EasingPicker.vue";
import { COPY_ATTEMPT_TIMEOUT_MS } from "@glass/components/easing/constants";

const clipboardDescriptor = Object.getOwnPropertyDescriptor(navigator, "clipboard");

function setClipboard(value: Pick<Clipboard, "writeText"> | undefined) {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value });
}

function mountPicker() {
    return mount(EasingPicker, { attachTo: document.body });
}

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    if (clipboardDescriptor) Object.defineProperty(navigator, "clipboard", clipboardDescriptor);
    else Reflect.deleteProperty(navigator, "clipboard");
    document.body.innerHTML = "";
});

describe("EasingPicker product contract", () => {
    it("exposes two named keyboard sliders that update the authored literal", async () => {
        const wrapper = mountPicker();
        const canvas = wrapper.get("svg");
        expect(canvas.attributes("role")).toBe("group");

        const handles = wrapper.findAll('[role="slider"]');
        expect(handles).toHaveLength(2);
        expect(handles[0]!.attributes("aria-label")).toBe("Bezier control point 1");
        expect(handles[0]!.attributes("aria-valuemin")).toBe("0");
        expect(handles[0]!.attributes("aria-valuemax")).toBe("1");
        expect(handles[0]!.attributes("aria-valuetext")).toMatch(/^x .* y /);

        const before = wrapper.get("code").text();
        await handles[0]!.trigger("keydown", { key: "ArrowRight" });
        expect(wrapper.get("code").text()).not.toBe(before);
        expect(handles[0]!.attributes("aria-valuetext")).toContain("x 0.185");

        await handles[0]!.trigger("keydown", { key: "Home" });
        expect(handles[0]!.attributes("aria-valuenow")).toBe("0");
        await handles[1]!.trigger("keydown", { key: "End" });
        expect(handles[1]!.attributes("aria-valuenow")).toBe("1");
        wrapper.unmount();
    });

    it("shows pending and copied states, then cancels the reset timer on unmount", async () => {
        vi.useFakeTimers();
        let resolveCopy!: () => void;
        const writeText = vi.fn(() => new Promise<void>((resolve) => { resolveCopy = resolve; }));
        setClipboard({ writeText });
        const wrapper = mountPicker();

        await wrapper.get('[data-testid="easing-copy"]').trigger("click");
        expect(wrapper.attributes("data-copy-state")).toBe("pending");
        expect(wrapper.get('[role="status"]').text()).toContain("Copying");
        resolveCopy();
        await flushPromises();
        expect(writeText).toHaveBeenCalledWith(wrapper.get("code").text());
        expect(wrapper.attributes("data-copy-state")).toBe("copied");
        expect(wrapper.get('[role="status"]').text()).toContain("Copied");

        wrapper.unmount();
        expect(vi.getTimerCount()).toBe(0);
    });

    it("turns missing Clipboard into visible failure with the full manual-selection path", async () => {
        setClipboard(undefined);
        const wrapper = mountPicker();
        await wrapper.get('[data-testid="easing-copy"]').trigger("click");
        await flushPromises();

        expect(wrapper.attributes("data-copy-state")).toBe("failed");
        expect(wrapper.get('[role="status"]').text()).toContain("Clipboard unavailable");
        expect(wrapper.get("code").classes()).toContain("break-all");
        expect(wrapper.get("code").classes()).not.toContain("truncate");
        await wrapper.get('[data-testid="easing-select-literal"]').trigger("click");
        expect(window.getSelection()?.toString()).toBe(wrapper.get("code").text());
        wrapper.unmount();
    });

    it("turns Clipboard denial into failure and lets the same action retry", async () => {
        const denied = vi.fn().mockRejectedValue(new DOMException("Denied", "NotAllowedError"));
        setClipboard({ writeText: denied });
        const wrapper = mountPicker();
        const copy = wrapper.get('[data-testid="easing-copy"]');
        await copy.trigger("click");
        await flushPromises();
        expect(wrapper.attributes("data-copy-state")).toBe("failed");
        expect(copy.attributes("aria-label")).toContain("Retry");

        const allowed = vi.fn().mockResolvedValue(undefined);
        setClipboard({ writeText: allowed });
        await copy.trigger("click");
        await flushPromises();
        expect(wrapper.attributes("data-copy-state")).toBe("copied");
        expect(allowed).toHaveBeenCalledOnce();
        wrapper.unmount();
    });

    it("times out a stalled Clipboard write and keeps retry and unmount timer-safe", async () => {
        vi.useFakeTimers();
        let resolveStalled!: () => void;
        const writeText = vi.fn()
            .mockImplementationOnce(() => new Promise<void>((resolve) => { resolveStalled = resolve; }))
            .mockResolvedValueOnce(undefined);
        setClipboard({ writeText });
        const wrapper = mountPicker();
        const copy = wrapper.get('[data-testid="easing-copy"]');

        await copy.trigger("click");
        expect(wrapper.attributes("data-copy-state")).toBe("pending");
        await vi.advanceTimersByTimeAsync(COPY_ATTEMPT_TIMEOUT_MS);
        expect(wrapper.attributes("data-copy-state")).toBe("failed");
        expect(wrapper.find('[data-testid="easing-select-literal"]').exists()).toBe(true);

        await copy.trigger("click");
        await flushPromises();
        expect(wrapper.attributes("data-copy-state")).toBe("copied");
        resolveStalled();
        await flushPromises();
        expect(wrapper.attributes("data-copy-state")).toBe("copied");

        wrapper.unmount();
        expect(vi.getTimerCount()).toBe(0);
    });

    it("owns truthful restart/cancel/final state and completes immediately when PRM flips on", async () => {
        const reducedMotionListeners: Array<(event: { matches: boolean }) => void> = [];
        const mediaQuery = {
            matches: false,
            addEventListener: vi.fn((_type: string, listener: (event: { matches: boolean }) => void) => {
                reducedMotionListeners.push(listener);
            }),
            removeEventListener: vi.fn(),
        };
        vi.stubGlobal("matchMedia", vi.fn(() => mediaQuery));

        let nextFrame = 0;
        const frames = new Map<number, FrameRequestCallback>();
        vi.stubGlobal("requestAnimationFrame", vi.fn((callback: FrameRequestCallback) => {
            const id = ++nextFrame;
            frames.set(id, callback);
            return id;
        }));
        vi.stubGlobal("cancelAnimationFrame", vi.fn((id: number) => frames.delete(id)));
        vi.spyOn(performance, "now").mockReturnValue(0);

        const wrapper = mountPicker();
        await wrapper.get('[data-testid="easing-playback"]').trigger("click");
        expect(wrapper.attributes("data-playback-state")).toBe("playing");
        expect(wrapper.get('[data-testid="easing-playback"]').text()).toContain("Restart");
        expect(wrapper.get('[data-testid="easing-cancel"]').text()).toContain("Cancel");

        const staleFrame = [...frames.values()][0]!;
        await wrapper.get('[data-testid="easing-cancel"]').trigger("click");
        expect(wrapper.attributes("data-playback-state")).toBe("idle");
        staleFrame(600);
        expect(frames.size).toBe(0);

        await wrapper.get('[data-testid="easing-playback"]').trigger("click");
        const [finalId, finalFrame] = [...frames.entries()][0]!;
        frames.delete(finalId);
        finalFrame(1200);
        await wrapper.vm.$nextTick();
        expect(wrapper.attributes("data-playback-state")).toBe("complete");
        expect(wrapper.get('[data-testid="easing-playback"]').text()).toContain("Replay");

        await wrapper.get('[data-testid="easing-playback"]').trigger("click");
        for (const listener of reducedMotionListeners) listener({ matches: true });
        await wrapper.vm.$nextTick();
        expect(wrapper.attributes("data-playback-state")).toBe("complete");
        expect(wrapper.attributes("data-reduced-motion")).toBe("");
        expect(frames.size).toBe(0);
        expect(wrapper.get('[data-testid="easing-playback"]').text()).toContain("Replay");

        wrapper.unmount();
        expect(mediaQuery.removeEventListener).toHaveBeenCalled();
    });
});
