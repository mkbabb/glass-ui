import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { h } from "vue";

import GlassDock from "@glass/components/dock/GlassDock.vue";

/* atlas U/B7 (R-INTERACT §7, PLAN §2.4) — the expanded run keeps the wheel at its ends.
   Firefox picks the page as the wheel target once the run sits at its end and the wheel
   transaction lapses, whatever `overscroll-behavior` says (10 of 20 steps scrolled the
   page 600 px in the U/B7 run probe). The run declines a wheel that pushes against the
   end it rests at, on its own axis, only while it is a real scroller. */

function mountRun(orientation: "vertical" | "horizontal") {
    const wrapper = mount(GlassDock, {
        attachTo: document.body,
        props: { orientation, collapse: "open" },
        slots: { default: () => Array.from({ length: 12 }, (_, i) => h("button", `Seat ${i + 1}`)) },
    });
    const run = wrapper.get<HTMLElement>(".dock-run").element;
    const geometry = (pos: number, content = 600, port = 300) => {
        const [size, client, scroll] =
            orientation === "vertical"
                ? ["scrollHeight", "clientHeight", "scrollTop"]
                : ["scrollWidth", "clientWidth", "scrollLeft"];
        Object.defineProperty(run, size, { configurable: true, get: () => content });
        Object.defineProperty(run, client, { configurable: true, get: () => port });
        Object.defineProperty(run, scroll, { configurable: true, get: () => pos, set: () => {} });
    };
    const wheel = (delta: number) => {
        const event = new WheelEvent("wheel", {
            bubbles: true,
            cancelable: true,
            deltaY: orientation === "vertical" ? delta : 0,
            deltaX: orientation === "vertical" ? 0 : delta,
        });
        run.dispatchEvent(event);
        return event.defaultPrevented;
    };
    return { wrapper, geometry, wheel };
}

describe("GlassDock run — wheel containment at the ends", () => {
    afterEach(() => {
        document.body.innerHTML = "";
    });

    for (const orientation of ["vertical", "horizontal"] as const) {
        it(`${orientation}: declines a wheel past either end and passes one mid-run`, () => {
            const { wrapper, geometry, wheel } = mountRun(orientation);
            geometry(300);
            expect(wheel(60), "past the far end").toBe(true);
            expect(wheel(-60), "back from the far end").toBe(false);
            geometry(0);
            expect(wheel(-60), "past the near end").toBe(true);
            expect(wheel(60), "into the run").toBe(false);
            geometry(150);
            expect(wheel(60)).toBe(false);
            expect(wheel(-60)).toBe(false);
            wrapper.unmount();
        });
    }

    it("leaves the wheel alone when the run does not overflow", () => {
        const { wrapper, geometry, wheel } = mountRun("vertical");
        geometry(0, 300, 300);
        expect(wheel(60)).toBe(false);
        expect(wheel(-60)).toBe(false);
        wrapper.unmount();
    });

    it("leaves a cross-axis wheel to the page on a horizontal run", () => {
        const { wrapper, geometry } = mountRun("horizontal");
        geometry(300);
        const run = wrapper.get<HTMLElement>(".dock-run").element;
        const event = new WheelEvent("wheel", { bubbles: true, cancelable: true, deltaY: 60 });
        run.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(false);
        wrapper.unmount();
    });
});
