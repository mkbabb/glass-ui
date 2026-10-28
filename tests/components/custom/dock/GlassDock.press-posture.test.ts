// 10.1.3 critique-1 D-1 (value.js O-110, ask 2) — the press holds the posture. Chromium
// focuses a button on press (pointer: mousedown; touch: the tap's compatibility
// mousedown), and the focus-in expanded a collapsed dock before the release was
// hit-tested, so a persistent seat on the open side moved out from under the pointer
// and the engine sent the click elsewhere. A focus-in (or a hover-intent dwell) that
// lands while a press is in flight now waits for the press to resolve.

import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h } from "vue";

import GlassDock from "@glass/components/dock/GlassDock.vue";

function mountDock() {
    const onSeat = vi.fn();
    const Host = defineComponent({
        setup() {
            return () =>
                h(
                    GlassDock,
                    { collapse: "closed" },
                    {
                        default: () => [h("button", { "data-testid": "full" }, "Full")],
                        persistent: () =>
                            h("button", { "data-testid": "seat", onClick: onSeat }, "S"),
                    },
                );
        },
    });
    const wrapper = mount(Host, { attachTo: document.body });
    const root = wrapper.get<HTMLElement>(".glass-dock");
    const seat = wrapper.get<HTMLButtonElement>("[data-testid='seat']");
    return { wrapper, root, seat, onSeat };
}

describe("GlassDock — a press holds the posture until it resolves", () => {
    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("a focus-in during a press expands the dock only when the press's click arrives", async () => {
        const { wrapper, root, seat, onSeat } = mountDock();
        expect(root.classes()).toContain("collapsed");

        await seat.trigger("pointerdown", { button: 0, pointerType: "mouse" });
        seat.element.focus();
        await wrapper.vm.$nextTick();
        expect(root.classes(), "no expand while the press is in flight").toContain("collapsed");

        await seat.trigger("pointerup", { button: 0, pointerType: "mouse" });
        await seat.trigger("click");
        expect(onSeat).toHaveBeenCalledOnce();
        expect(root.classes(), "the press resolved: the focus's expand runs").toContain("expanded");
        wrapper.unmount();
    });

    it("a touch press waits past its pointerup for the tap's click", async () => {
        const { wrapper, root, seat, onSeat } = mountDock();

        await seat.trigger("pointerdown", { button: 0, pointerType: "touch" });
        await seat.trigger("pointerup", { button: 0, pointerType: "touch" });
        await new Promise((resolve) => setTimeout(resolve, 10));
        // The tap's compatibility mousedown focuses the seat after the pointerup.
        seat.element.focus();
        await wrapper.vm.$nextTick();
        expect(root.classes()).toContain("collapsed");

        await seat.trigger("click");
        expect(onSeat).toHaveBeenCalledOnce();
        expect(root.classes()).toContain("expanded");
        wrapper.unmount();
    });

    it("a mouse press that produces no click resolves when its pointerup task ends", async () => {
        const { wrapper, root, seat } = mountDock();

        await seat.trigger("pointerdown", { button: 0, pointerType: "mouse" });
        seat.element.focus();
        await seat.trigger("pointerup", { button: 0, pointerType: "mouse" });
        await wrapper.vm.$nextTick();
        expect(root.classes()).toContain("collapsed");
        await new Promise((resolve) => setTimeout(resolve, 0));
        await wrapper.vm.$nextTick();
        expect(root.classes()).toContain("expanded");
        wrapper.unmount();
    });

    it("a focus that leaves before the press resolves no longer expands", async () => {
        const { wrapper, root, seat } = mountDock();
        const outside = document.createElement("button");
        document.body.append(outside);

        await seat.trigger("pointerdown", { button: 0, pointerType: "mouse" });
        seat.element.focus();
        outside.focus();
        await seat.trigger("click");
        await wrapper.vm.$nextTick();
        expect(root.classes()).toContain("collapsed");
        wrapper.unmount();
    });

    it("a keyboard focus, with no press in flight, expands at once", async () => {
        const { wrapper, root, seat } = mountDock();
        seat.element.focus();
        await wrapper.vm.$nextTick();
        expect(root.classes()).toContain("expanded");
        wrapper.unmount();
    });
});
