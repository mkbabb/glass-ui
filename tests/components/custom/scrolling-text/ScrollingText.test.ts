import { mount, flushPromises } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ScrollingText } from "@glass/components/custom/scrolling-text/index";

/**
 * The component depends on `useResizeObserver` to drive its measure cycle.
 * Happy-dom doesn't ship a real ResizeObserver, so we stub the global with
 * a no-op that records the observed elements; we also stub `scrollWidth`
 * + `clientWidth` directly on the host elements via `Object.defineProperty`,
 * since happy-dom returns 0 for both. The threshold under test is the
 * `overflows = delta > 1` branch — exercise both sides.
 */

class StubResizeObserver {
    constructor(_cb: ResizeObserverCallback) {}
    observe() {}
    unobserve() {}
    disconnect() {}
}

function stubLayout(el: Element, scrollWidth: number, clientWidth: number) {
    Object.defineProperty(el, "scrollWidth", {
        configurable: true,
        get: () => scrollWidth,
    });
    Object.defineProperty(el, "clientWidth", {
        configurable: true,
        get: () => clientWidth,
    });
}

describe("ScrollingText", () => {
    const originalRO = globalThis.ResizeObserver;

    afterEach(() => {
        globalThis.ResizeObserver = originalRO;
        vi.restoreAllMocks();
    });

    it("renders the text prop into the inline slot", () => {
        globalThis.ResizeObserver =
            StubResizeObserver as unknown as typeof ResizeObserver;
        const wrapper = mount(ScrollingText, {
            props: { text: "192.168.0.1" },
        });
        expect(wrapper.text()).toBe("192.168.0.1");
        expect(wrapper.classes("scrolling-text")).toBe(true);
    });

    it("does NOT mark data-overflows when scrollWidth is within 1px of clientWidth", async () => {
        globalThis.ResizeObserver =
            StubResizeObserver as unknown as typeof ResizeObserver;
        const wrapper = mount(ScrollingText, {
            props: { text: "10.0.0.1" },
            attachTo: document.body,
        });
        const root = wrapper.element as HTMLElement;
        const inner = root.firstElementChild as HTMLElement;
        // delta = 1 → falsy (the threshold is `> 1`, not `>= 1`).
        stubLayout(root, 100, 100);
        stubLayout(inner, 101, 100);

        // Force a re-measure by triggering the watchEffect again via prop change.
        await wrapper.setProps({ text: "10.0.0.2" });
        await flushPromises();

        expect(root.dataset.overflows).toBeUndefined();
        wrapper.unmount();
    });

    it("marks data-overflows + writes scroll-distance / scroll-duration when content exceeds host", async () => {
        globalThis.ResizeObserver =
            StubResizeObserver as unknown as typeof ResizeObserver;
        const wrapper = mount(ScrollingText, {
            props: { text: "[fe80::1ff:fe23:4567:890a%eth0]:443" },
            attachTo: document.body,
        });
        const root = wrapper.element as HTMLElement;
        const inner = root.firstElementChild as HTMLElement;
        stubLayout(root, 240, 120); // host clientWidth = 120
        stubLayout(inner, 320, 120); // content scrollWidth = 320, delta = 200

        await wrapper.setProps({ text: "[fe80::1ff:fe23:4567:890a%eth0]:80" });
        await flushPromises();

        expect(root.dataset.overflows).toBe("true");
        expect(root.style.getPropertyValue("--scroll-distance")).toBe("200px");
        // Duration: 200 / 80 + 4 = 6.5s — clamped to >= 4s by the `Math.max`.
        expect(root.style.getPropertyValue("--scroll-duration")).toBe("6.5s");
        wrapper.unmount();
    });
});
