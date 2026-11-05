// O-32 A-2—the click-integrity guard's persistent arm. A press that begins mid-morph
// is deferred because the layer swap may have put a different control under a
// stationary pointer. The #persistent / #persistent-end regions never swap and are
// never a crossfade pane, so a press there that lands its click on the same control
// passes. A full-layer press mid-morph is still swallowed.

import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h } from "vue";

import GlassDock from "@glass/components/dock/GlassDock.vue";

function mountDock() {
    const onFull = vi.fn();
    const onPersistent = vi.fn();
    const onPersistentEnd = vi.fn();
    const Host = defineComponent({
        setup() {
            return () =>
                h(
                    GlassDock,
                    { collapse: "open" },
                    {
                        default: () => [
                            h("button", { "data-testid": "full", onClick: onFull }, "Full"),
                        ],
                        persistent: () =>
                            h(
                                "button",
                                { "data-testid": "persistent", onClick: onPersistent },
                                [h("span", { "data-testid": "persistent-glyph" }, "S")],
                            ),
                        "persistent-end": () =>
                            h(
                                "button",
                                { "data-testid": "persistent-end", onClick: onPersistentEnd },
                                "E",
                            ),
                    },
                );
        },
    });
    const wrapper = mount(Host, { attachTo: document.body });
    return { wrapper, onFull, onPersistent, onPersistentEnd };
}

describe("GlassDock click integrity — a press begun mid-morph", () => {
    let priorMotionTempo = "";

    beforeEach(() => {
        priorMotionTempo = document.documentElement.style.getPropertyValue("--motion-tempo");
        document.documentElement.style.setProperty("--motion-tempo", "0.01");
    });

    afterEach(() => {
        if (priorMotionTempo) {
            document.documentElement.style.setProperty("--motion-tempo", priorMotionTempo);
        } else {
            document.documentElement.style.removeProperty("--motion-tempo");
        }
        document.body.innerHTML = "";
    });

    async function settledDockMidMorph() {
        const mounted = mountDock();
        await new Promise((resolve) => setTimeout(resolve, 50));
        await mounted.wrapper.vm.$nextTick();
        const root = mounted.wrapper.get<HTMLElement>(".glass-dock").element;
        expect(root.hasAttribute("data-morphing")).toBe(false);
        // The morph-in-flight state the guard reads—the hover-expand FLIP's marker.
        root.setAttribute("data-morphing", "");
        return mounted;
    }

    it("passes a same-control press inside #persistent", async () => {
        const { wrapper, onPersistent } = await settledDockMidMorph();
        const control = wrapper.get<HTMLElement>("[data-testid='persistent']");
        expect(control.element.closest(".dock-persistent")).not.toBeNull();
        await control.trigger("pointerdown", { button: 0 });
        await control.trigger("click");
        expect(onPersistent).toHaveBeenCalledOnce();
        wrapper.unmount();
    });

    it("passes a press on the glyph whose click lands on its #persistent button", async () => {
        const { wrapper, onPersistent } = await settledDockMidMorph();
        await wrapper.get("[data-testid='persistent-glyph']").trigger("pointerdown", { button: 0 });
        await wrapper.get("[data-testid='persistent']").trigger("click");
        expect(onPersistent).toHaveBeenCalledOnce();
        wrapper.unmount();
    });

    it("passes a same-control press inside #persistent-end", async () => {
        const { wrapper, onPersistentEnd } = await settledDockMidMorph();
        const control = wrapper.get<HTMLElement>("[data-testid='persistent-end']");
        await control.trigger("pointerdown", { button: 0 });
        await control.trigger("click");
        expect(onPersistentEnd).toHaveBeenCalledOnce();
        wrapper.unmount();
    });

    it("still swallows a same-control press on the full layer (the swap race)", async () => {
        const { wrapper, onFull } = await settledDockMidMorph();
        const control = wrapper.get<HTMLElement>("[data-testid='full']");
        await control.trigger("pointerdown", { button: 0 });
        await control.trigger("click");
        expect(onFull).not.toHaveBeenCalled();
        wrapper.unmount();
    });

    it("still swallows a #persistent press whose click lands on a different control", async () => {
        const { wrapper, onPersistent, onFull } = await settledDockMidMorph();
        await wrapper.get("[data-testid='persistent']").trigger("pointerdown", { button: 0 });
        await wrapper.get("[data-testid='full']").trigger("click");
        expect(onFull).not.toHaveBeenCalled();
        expect(onPersistent).not.toHaveBeenCalled();
        wrapper.unmount();
    });
});

// atlas U/B7 D-5 — the deferral is scoped to an expand an approach opened. A phone sheet
// opened by its owner (or by a press inside the dock) is aimed at, not raced: a row
// pressed and clicked mid-morph is a genuine activation. 10.1.1 swallowed it for the
// whole 840 ms settle window.
describe("GlassDock click integrity — the approach scope", () => {
    afterEach(() => {
        document.body.innerHTML = "";
    });

    function mountClosed() {
        const onFull = vi.fn();
        const dockRef = { value: null as null | { expand: () => void } };
        const Host = defineComponent({
            setup() {
                return () =>
                    h(
                        GlassDock,
                        {
                            collapse: "closed",
                            orientation: "vertical",
                            ref: (r: unknown) => (dockRef.value = r as { expand: () => void }),
                        },
                        {
                            default: () => [h("button", { "data-testid": "full", onClick: onFull }, "Row")],
                            collapsed: () => h("button", { "data-testid": "summary" }, "≡"),
                        },
                    );
            },
        });
        const wrapper = mount(Host, { attachTo: document.body });
        return { wrapper, onFull, dockRef };
    }

    function pointer(el: Element, type: string, pointerType: string) {
        const event = new Event(type, { bubbles: type !== "pointerenter" && type !== "pointerleave", cancelable: true });
        Object.defineProperty(event, "pointerType", { value: pointerType });
        el.dispatchEvent(event);
    }

    it("passes a mid-morph row tap after the owner opened the dock", async () => {
        const { wrapper, onFull, dockRef } = mountClosed();
        await wrapper.vm.$nextTick();
        dockRef.value!.expand();
        await wrapper.vm.$nextTick();
        const root = wrapper.get<HTMLElement>(".glass-dock").element;
        root.setAttribute("data-morphing", "");
        const row = wrapper.get<HTMLElement>("[data-testid='full']").element;
        pointer(row, "pointerdown", "touch");
        row.click();
        expect(onFull).toHaveBeenCalledOnce();
        wrapper.unmount();
    });

    it("still defers a mid-morph press after a hover approach opened the dock", async () => {
        const { wrapper, onFull, dockRef } = mountClosed();
        await wrapper.vm.$nextTick();
        const root = wrapper.get<HTMLElement>(".glass-dock").element;
        pointer(root, "pointerenter", "mouse");
        dockRef.value!.expand();
        await wrapper.vm.$nextTick();
        root.setAttribute("data-morphing", "");
        const row = wrapper.get<HTMLElement>("[data-testid='full']").element;
        pointer(row, "pointerdown", "mouse");
        row.click();
        expect(onFull).not.toHaveBeenCalled();
        wrapper.unmount();
    });

    it("still swallows a mid-morph click that lands on a different control", async () => {
        const { wrapper, onFull, dockRef } = mountClosed();
        await wrapper.vm.$nextTick();
        dockRef.value!.expand();
        await wrapper.vm.$nextTick();
        wrapper.get<HTMLElement>(".glass-dock").element.setAttribute("data-morphing", "");
        pointer(wrapper.get("[data-testid='summary']").element, "pointerdown", "touch");
        wrapper.get<HTMLElement>("[data-testid='full']").element.click();
        expect(onFull).not.toHaveBeenCalled();
        wrapper.unmount();
    });
});
