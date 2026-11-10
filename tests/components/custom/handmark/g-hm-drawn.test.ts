// HandMark's `drawn` event: once per draw, after the last line's draw ends; at mount when
// nothing will move (`draw` off, reduced motion, print). jsdom runs no animations, so the
// draw's end is dispatched by hand, as the engine dispatches it: one `animationend` per
// line, bubbling to the host. The live half (the event lands after the last painted frame,
// and the draw keeps painting through a long main-thread task) is the browser witness.

import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import HandMark from "@glass/components/handmark/HandMark.vue";
import { installMeasure, restoreMeasure } from "./measure-frame";

const TWO_LINES = [
    { x: 40, y: 60, w: 240, h: 40 },
    { x: 40, y: 104, w: 180, h: 40 },
];

function stillMedia(matches: boolean) {
    vi.stubGlobal("matchMedia", (q: string) => ({
        matches: matches && q.includes("prefers-reduced-motion"),
        media: q,
        addEventListener: () => {},
        removeEventListener: () => {},
    }));
}

async function render(props: Record<string, unknown> = {}) {
    installMeasure(TWO_LINES);
    const w = mount(HandMark, {
        props: { shape: "underline", seed: 3, ...props },
        slots: { default: "two lines of it" },
        attachTo: document.body,
    });
    await nextTick();
    return w;
}

function end(w: ReturnType<typeof mount>, name: string, i: number) {
    const el = w.findAll(".hm-reveal")[i].element;
    const e = new Event("animationend", { bubbles: true }) as AnimationEvent;
    Object.defineProperty(e, "animationName", { value: name });
    el.dispatchEvent(e);
}

afterEach(() => {
    restoreMeasure();
    vi.unstubAllGlobals();
});

describe("HandMark · drawn", () => {
    it("fires once, after the last line's draw ends", async () => {
        stillMedia(false);
        const w = await render();
        expect(w.findAll(".hm-reveal")).toHaveLength(2);
        end(w, "hm-reveal-x", 0);
        expect(w.emitted("drawn")).toBeUndefined();
        end(w, "hm-frame-x", 1);
        expect(w.emitted("drawn"), "the frame's counter-slide is not the draw").toBeUndefined();
        end(w, "hm-reveal-x", 1);
        end(w, "hm-reveal-x", 1);
        expect(w.emitted("drawn"), "drawn waits for the frame after the last").toBeUndefined();
        await new Promise((r) => requestAnimationFrame(r));
        await new Promise((r) => requestAnimationFrame(r));
        expect(w.emitted("drawn")).toHaveLength(1);
        w.unmount();
    });

    it("fires at mount under reduced motion, and never again for that mark", async () => {
        stillMedia(true);
        const w = await render({ trigger: "in-view" });
        expect(w.emitted("drawn")).toHaveLength(1);
        end(w, "hm-reveal-x", 0);
        end(w, "hm-reveal-x", 1);
        expect(w.emitted("drawn")).toHaveLength(1);
        w.unmount();
    });

    it("fires at mount when the mark rests drawn", async () => {
        stillMedia(false);
        const w = await render({ draw: false });
        expect(w.emitted("drawn")).toHaveLength(1);
        w.unmount();
    });

    it("a waiting in-view mark has not drawn", async () => {
        stillMedia(false);
        const w = await render({ trigger: "in-view" });
        expect(w.attributes("data-ink")).toBe("wait");
        expect(w.emitted("drawn")).toBeUndefined();
        w.unmount();
    });
});
