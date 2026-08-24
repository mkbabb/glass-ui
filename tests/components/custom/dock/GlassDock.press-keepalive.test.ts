import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h, ref } from "vue";

import GlassDock from "@glass/components/dock/GlassDock.vue";

function mountPressCollapseDock() {
    const activate = vi.fn();
    const dock = ref<InstanceType<typeof GlassDock> | null>(null);
    const Host = defineComponent({
        setup() {
            return () =>
                h(
                    GlassDock,
                    {
                        ref: dock,
                        collapse: "open",
                    },
                    {
                        default: () => [
                            h("button", { "data-testid": "other" }, "Other"),
                            h(
                                "button",
                                {
                                    "data-testid": "origin",
                                    onPointerdown: () => dock.value?.collapse(),
                                    onClick: activate,
                                },
                                "Origin",
                            ),
                        ],
                        collapsed: () => h("button", { "data-testid": "summary" }, "Summary"),
                    },
                );
        },
    });
    const wrapper = mount(Host, { attachTo: document.body });
    return { wrapper, activate };
}

describe("GlassDock press-origin keepalive", () => {
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
    });

    it("does not mutate an ordinary expanded-dock press", async () => {
        const { wrapper } = mountPressCollapseDock();
        await new Promise((resolve) => setTimeout(resolve, 50));
        await wrapper.vm.$nextTick();

        const other = wrapper.get<HTMLElement>("[data-testid='other']");
        const origin = wrapper.get<HTMLElement>("[data-testid='origin']");
        const full = wrapper.get<HTMLElement>(".dock-layer--full");

        await other.trigger("pointerdown", { button: 0 });
        await wrapper.vm.$nextTick();

        expect(full.classes()).not.toContain("is-press-keepalive");
        expect(full.attributes("inert")).toBeUndefined();
        expect(other.attributes("data-dock-press-origin")).toBeUndefined();
        expect(origin.attributes("inert")).toBeUndefined();

        await other.trigger("pointercancel");
        wrapper.unmount();
    });

    it("keeps only the collapse-origin control live through its click, then retires it", async () => {
        const { wrapper, activate } = mountPressCollapseDock();
        await new Promise((resolve) => setTimeout(resolve, 50));
        await wrapper.vm.$nextTick();

        const origin = wrapper.get<HTMLElement>("[data-testid='origin']");
        const other = wrapper.get<HTMLElement>("[data-testid='other']");
        const full = wrapper.get<HTMLElement>(".dock-layer--full");
        expect(wrapper.get(".glass-dock").attributes("data-morphing")).toBeUndefined();

        await origin.trigger("pointerdown", { button: 0 });
        await wrapper.vm.$nextTick();

        expect(full.classes()).toContain("is-leaving");
        expect(full.classes()).toContain("is-press-keepalive");
        expect(full.attributes("inert")).toBeUndefined();
        expect(origin.attributes("data-dock-press-origin")).toBe("");
        expect(other.attributes("inert")).toBe("");

        await origin.trigger("click");
        await wrapper.vm.$nextTick();

        expect(activate).toHaveBeenCalledOnce();
        expect(full.classes()).not.toContain("is-press-keepalive");
        expect(full.attributes("inert")).toBe("");
        expect(origin.attributes("data-dock-press-origin")).toBeUndefined();
        expect(other.attributes("inert")).toBeUndefined();

        wrapper.unmount();
    });

    it("retires the origin without activation on pointercancel", async () => {
        const { wrapper, activate } = mountPressCollapseDock();
        await new Promise((resolve) => setTimeout(resolve, 50));
        await wrapper.vm.$nextTick();

        const origin = wrapper.get<HTMLElement>("[data-testid='origin']");
        const full = wrapper.get<HTMLElement>(".dock-layer--full");

        await origin.trigger("pointerdown", { button: 0 });
        await wrapper.vm.$nextTick();
        await origin.trigger("pointercancel");
        await wrapper.vm.$nextTick();

        expect(activate).not.toHaveBeenCalled();
        expect(full.classes()).not.toContain("is-press-keepalive");
        expect(full.attributes("inert")).toBe("");
        expect(origin.attributes("data-dock-press-origin")).toBeUndefined();

        wrapper.unmount();
    });
});
