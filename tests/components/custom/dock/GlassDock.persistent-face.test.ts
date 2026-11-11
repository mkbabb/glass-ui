import { mount, type VueWrapper } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { h, nextTick } from "vue";

import GlassDock from "@glass/components/dock/GlassDock.vue";
import { DOCK_LONG_PRESS_MS, HOVER_INTENT_MS } from "@glass/components/dock/constants";

/**
 * The persistent face, and a press on a persistent seat.
 *
 * With no `#collapsed` slot and a seat in `#persistent` or `#persistent-end`, the seats
 * are the collapsed face: the summary pane is no disclosure, so the collapsed dock holds
 * the seats' controls alone. A press on a persistent seat is the seat's act: it never
 * expands the dock, by focus, by the hover dwell its arrival began, or by a tap. A touch
 * or pen press held on a collapsed seat expands the dock, and its release presses
 * nothing. jsdom with real timers; the engine half is the lane's browser witness.
 */

const wrappers: VueWrapper[] = [];

function pointer(type: string, init: { pointerType?: string; x?: number; y?: number } = {}): Event {
    const event = new Event(type, { bubbles: true, cancelable: true, composed: true });
    Object.defineProperties(event, {
        pointerType: { value: init.pointerType ?? "mouse" },
        isPrimary: { value: true },
        clientX: { value: init.x ?? 10 },
        clientY: { value: init.y ?? 10 },
        button: { value: 0 },
    });
    return event;
}

function mountDock(slots: Record<string, () => unknown>) {
    const wrapper = mount(GlassDock, {
        attachTo: document.body,
        props: { collapse: "closed", backdropMode: "static" },
        slots: {
            default: () => h("button", { "data-seat": "run" }, "Run"),
            ...slots,
        },
    });
    wrappers.push(wrapper);
    return { wrapper, root: wrapper.find(".glass-dock").element as HTMLElement };
}

// Real timers: Vue drops a DOM event stamped before its handler was attached, and fake
// timers skew that clock, so a faked run would never see the seat's click.
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
// The dock's capture-phase click guard is a Vue listener, so it stamps the click
// (`Date.now()`, whole milliseconds) before the seat's own listener reads it, and Vue
// drops a click stamped at or before the millisecond its listener was attached. A click
// in the mount's own millisecond is therefore lost about one run in four. A press waits
// for the clock to pass the mount, as any real press does.
const pastMount = async () => {
    const t = Date.now();
    while (Date.now() <= t) await wait(1);
};
afterEach(() => {
    for (const w of wrappers.splice(0)) w.unmount();
});

describe("the persistent face", () => {
    it("is no disclosure: the collapsed summary carries no role, tab stop or name", () => {
        const { wrapper } = mountDock({ persistent: () => h("button", { "aria-label": "Theme" }) });
        const summary = wrapper.find(".dock-layer--summary");
        expect(summary.attributes("role")).toBeUndefined();
        expect(summary.attributes("tabindex")).toBeUndefined();
        expect(summary.attributes("aria-label")).toBeUndefined();
        expect(summary.attributes("aria-expanded")).toBeUndefined();
    });

    it("counts #persistent-end the same as #persistent", () => {
        const { wrapper } = mountDock({ "persistent-end": () => h("button", { "aria-label": "Theme" }) });
        expect(wrapper.find(".dock-layer--summary").attributes("role")).toBeUndefined();
    });

    it("keeps the summary disclosure when #collapsed is authored", () => {
        const { wrapper } = mountDock({
            persistent: () => h("button", { "aria-label": "Theme" }),
            collapsed: () => h("span", "Now"),
        });
        const summary = wrapper.find(".dock-layer--summary");
        expect(summary.attributes("role")).toBe("button");
        expect(summary.attributes("aria-label")).toBe("Expand dock");
    });

    it("names the leading region as the start, the trailing as the end", () => {
        const { wrapper } = mountDock({
            persistent: () => h("button", { "aria-label": "Theme" }),
            "persistent-end": () => h("button", { "aria-label": "Pin" }),
        });
        expect(wrapper.find(".dock-persistent-start").exists()).toBe(true);
        expect(wrapper.find(".dock-persistent-end").exists()).toBe(true);
        expect(wrapper.findAll(".dock-persistent-start")).toHaveLength(1);
    });
});

describe("a press on a persistent seat is the seat's", () => {
    for (const slot of ["persistent", "persistent-end"] as const) {
        it(`a fine press on a #${slot} seat inside the hover dwell never expands the dock`, async () => {
            const onClick = vi.fn();
            const { root } = mountDock({ [slot]: () => h("button", { "data-seat": "theme", onClick }) });
            const seat = root.querySelector<HTMLElement>('[data-seat="theme"]')!;
            await pastMount();
            root.dispatchEvent(new MouseEvent("mouseenter"));
            seat.dispatchEvent(pointer("pointerdown"));
            seat.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
            seat.dispatchEvent(pointer("pointerup"));
            seat.click();
            await wait(HOVER_INTENT_MS + 200);
            await nextTick();
            expect(onClick).toHaveBeenCalledTimes(1);
            expect(root.classList.contains("expanded")).toBe(false);
        });
    }

    it("a tap's compatibility mouse events never expand the dock", async () => {
        const { root } = mountDock({ persistent: () => h("button", { "data-seat": "theme" }) });
        const seat = root.querySelector<HTMLElement>('[data-seat="theme"]')!;
        seat.dispatchEvent(pointer("pointerdown", { pointerType: "touch" }));
        seat.dispatchEvent(pointer("pointerup", { pointerType: "touch" }));
        root.dispatchEvent(new MouseEvent("mouseenter"));
        seat.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
        seat.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
        seat.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
        seat.click();
        await wait(HOVER_INTENT_MS + 200);
        await nextTick();
        expect(root.classList.contains("expanded")).toBe(false);
    });

    it("a hover-opened dock the pointer leaves after a seat press collapses at once", async () => {
        const { root } = mountDock({ persistent: () => h("button", { "data-seat": "theme" }) });
        root.dispatchEvent(new MouseEvent("mouseenter"));
        await wait(HOVER_INTENT_MS + 20);
        await nextTick();
        expect(root.classList.contains("expanded")).toBe(true);
        const seat = root.querySelector<HTMLElement>('[data-seat="theme"]')!;
        seat.dispatchEvent(pointer("pointerdown"));
        seat.dispatchEvent(pointer("pointerup"));
        seat.click();
        await wait(10);
        root.dispatchEvent(new MouseEvent("mouseleave", { relatedTarget: document.body }));
        await nextTick();
        expect(root.classList.contains("expanded")).toBe(false);
    });

    it("a press on the run keeps the patient dwell", async () => {
        const { root } = mountDock({ persistent: () => h("button", { "data-seat": "theme" }) });
        root.dispatchEvent(new MouseEvent("mouseenter"));
        await wait(HOVER_INTENT_MS + 20);
        await nextTick();
        const run = root.querySelector<HTMLElement>('[data-seat="run"]')!;
        run.dispatchEvent(pointer("pointerdown"));
        run.dispatchEvent(pointer("pointerup"));
        run.click();
        await wait(10);
        root.dispatchEvent(new MouseEvent("mouseleave", { relatedTarget: document.body }));
        await wait(1500);
        await nextTick();
        expect(root.classList.contains("expanded")).toBe(true);
    });
});

describe("the coarse pointer's long press", () => {
    it("expands a collapsed dock, and its release presses nothing", async () => {
        const onClick = vi.fn();
        const { root } = mountDock({ persistent: () => h("button", { "data-seat": "theme", onClick }) });
        const seat = root.querySelector<HTMLElement>('[data-seat="theme"]')!;
        seat.dispatchEvent(pointer("pointerdown", { pointerType: "touch" }));
        await wait(DOCK_LONG_PRESS_MS + 10);
        await nextTick();
        expect(root.classList.contains("expanded")).toBe(true);
        seat.dispatchEvent(pointer("pointerup", { pointerType: "touch" }));
        seat.click();
        expect(onClick).not.toHaveBeenCalled();
        // The next tap is the seat's again.
        seat.dispatchEvent(pointer("pointerdown", { pointerType: "touch" }));
        seat.dispatchEvent(pointer("pointerup", { pointerType: "touch" }));
        seat.click();
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("a press that travels is a drag, never a long press", async () => {
        const { root } = mountDock({ persistent: () => h("button", { "data-seat": "theme" }) });
        const seat = root.querySelector<HTMLElement>('[data-seat="theme"]')!;
        seat.dispatchEvent(pointer("pointerdown", { pointerType: "touch", x: 10, y: 10 }));
        window.dispatchEvent(pointer("pointermove", { pointerType: "touch", x: 40, y: 10 }));
        await wait(DOCK_LONG_PRESS_MS + 10);
        await nextTick();
        expect(root.classList.contains("expanded")).toBe(false);
    });

    it("a mouse press held on a seat is only a press", async () => {
        const { root } = mountDock({ persistent: () => h("button", { "data-seat": "theme" }) });
        const seat = root.querySelector<HTMLElement>('[data-seat="theme"]')!;
        seat.dispatchEvent(pointer("pointerdown"));
        await wait(DOCK_LONG_PRESS_MS + 10);
        await nextTick();
        expect(root.classList.contains("expanded")).toBe(false);
    });
});
