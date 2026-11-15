import { flushPromises, mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import PagerDots from "@glass/components/pager-dots/PagerDots.vue";

// The worm's D is a px length, whatever unit the token is written in.
//
// `--pager-dot-size` is `var(--space-body)`, which computes to its token text
// (`.75rem`). Parsed as a number that is 0.75, not the pip's 12 px, so the neck's span
// scale would be gap / 0.75: a one-cell hop painting a neck sixteen times too long.
// D is read off a worm body's offsetWidth. This test writes the token in rem, gives the
// bodies a real 12 px box, and holds the painted neck (scale × D) to pitch + D on a
// neighbour hop, the longest a one-cell bridge can be.

const PITCH = 28;
const DOT = 12;
const KEYS = ["offsetLeft", "offsetTop", "offsetWidth", "offsetHeight"] as const;
type Key = (typeof KEYS)[number];

function install(): PropertyDescriptor[] {
    const saved = KEYS.map((k) => Object.getOwnPropertyDescriptor(HTMLElement.prototype, k)!);
    const value = (el: HTMLElement, key: Key): number => {
        if (el.classList.contains("goo-body") || el.classList.contains("goo-neck"))
            return key === "offsetWidth" || key === "offsetHeight" ? DOT : 0;
        if (el.classList.contains("goo-dot") && el.parentElement) {
            const i = Array.from(el.parentElement.children).indexOf(el);
            if (key === "offsetLeft") return i * PITCH;
            if (key === "offsetWidth" || key === "offsetHeight") return 24;
        }
        return 0;
    };
    for (const key of KEYS)
        Object.defineProperty(HTMLElement.prototype, key, {
            configurable: true,
            get(this: HTMLElement) {
                return value(this, key);
            },
        });
    return saved;
}

describe("pager worm: D resolves in px", () => {
    let saved: PropertyDescriptor[] = [];
    beforeEach(() => {
        vi.useFakeTimers();
        saved = install();
    });
    afterEach(() => {
        vi.useRealTimers();
        KEYS.forEach((k, i) => Object.defineProperty(HTMLElement.prototype, k, saved[i]!));
    });

    it("a neighbour hop never paints a neck wider than pitch + D under a rem token", async () => {
        const wrapper = mount(PagerDots, {
            props: { count: 7, active: 2, ring: false },
            attachTo: document.body,
        });
        (wrapper.element as HTMLElement).style.setProperty("--pager-dot-size", ".75rem");
        await flushPromises();
        const neck = wrapper.find(".goo-neck").element as HTMLElement;

        await wrapper.setProps({ active: 3 });
        await flushPromises();
        let widest = 0;
        let painted = 0;
        for (let i = 0; i < 160; i++) {
            vi.advanceTimersByTime(16);
            const scale = parseFloat(neck.style.scale || "0");
            if (neck.style.opacity === "1") painted++;
            widest = Math.max(widest, scale * DOT);
        }
        wrapper.unmount();

        expect(painted).toBeGreaterThan(0); // the bridge did paint
        expect(widest).toBeLessThanOrEqual(PITCH + DOT);
    });
});
