import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { Chip, chipVariants } from "@glass/components/chip";

describe("Chip semantic modes", () => {
    it("defaults to static content with no false control affordance", async () => {
        const click = vi.fn();
        const wrapper = mount(Chip, {
            attrs: {
                "aria-pressed": "true",
                onClick: click,
                role: "button",
                tabindex: "0",
            },
            slots: { default: "Static" },
        });

        expect(wrapper.element.tagName).toBe("SPAN");
        expect(wrapper.attributes("role")).toBeUndefined();
        expect(wrapper.attributes("tabindex")).toBeUndefined();
        expect(wrapper.attributes("aria-pressed")).toBeUndefined();
        expect(wrapper.classes()).not.toContain("glass-chip--interactive");
        await wrapper.trigger("click");
        expect(click).not.toHaveBeenCalled();
    });

    it("uses Toggle semantics only for selectable mode", async () => {
        const wrapper = mount(Chip, {
            props: { mode: "selectable", modelValue: false },
            slots: { default: "Selectable" },
        });
        const button = wrapper.get("button");

        expect(button.element.tagName).toBe("BUTTON");
        expect(button.attributes("aria-pressed")).toBe("false");
        expect(button.attributes("data-state")).toBe("off");
        expect(button.classes()).toContain("glass-chip--interactive");
        await button.trigger("click");
        expect(wrapper.emitted("update:modelValue")).toEqual([[true]]);
    });

    it("keeps selectable semantics authoritative over caller attributes", () => {
        const wrapper = mount(Chip, {
            attrs: {
                role: "switch",
                "aria-pressed": "true",
                "data-state": "caller-state",
                name: "filter",
                required: true,
            },
            props: { mode: "selectable", modelValue: false },
            slots: { default: "Selectable" },
        });
        const button = wrapper.get("button");

        expect(button.attributes("role")).toBeUndefined();
        expect(button.attributes("aria-pressed")).toBe("false");
        expect(button.attributes("data-state")).toBe("off");
        expect(button.attributes("name")).toBeUndefined();
        expect(button.attributes("required")).toBeUndefined();
        expect(wrapper.find("input").exists()).toBe(false);
    });

    it("renders action mode as an ordinary button without pressed state", async () => {
        const click = vi.fn();
        const wrapper = mount(Chip, {
            attrs: { "aria-pressed": "true", onClick: click, role: "switch" },
            props: { mode: "action" },
            slots: { default: "Run" },
        });

        expect(wrapper.element.tagName).toBe("BUTTON");
        expect(wrapper.attributes("type")).toBe("button");
        expect(wrapper.attributes("aria-pressed")).toBeUndefined();
        expect(wrapper.attributes("role")).toBeUndefined();
        await wrapper.trigger("click");
        expect(click).toHaveBeenCalledOnce();
    });

    it("keeps removable content static with one named remove button", async () => {
        const wrapper = mount(Chip, {
            props: { mode: "removable", removeLabel: "Remove Fourier" },
            slots: { default: "Fourier" },
        });

        expect(wrapper.element.tagName).toBe("SPAN");
        const buttons = wrapper.findAll("button");
        expect(buttons).toHaveLength(1);
        expect(buttons[0]!.attributes("aria-label")).toBe("Remove Fourier");
        expect(wrapper.attributes("aria-pressed")).toBeUndefined();
        await buttons[0]!.trigger("click");
        expect(wrapper.emitted("remove")).toHaveLength(1);
    });

    it("refuses removable mode without a usable action name", () => {
        expect(() =>
            mount(Chip, {
                props: { mode: "removable", removeLabel: "  " },
                slots: { default: "Fourier" },
            }),
        ).toThrow(/removeLabel/);
    });

    it("disables the sole removable action", () => {
        const wrapper = mount(Chip, {
            props: {
                disabled: true,
                mode: "removable",
                removeLabel: "Remove Fourier",
            },
            slots: { default: "Fourier" },
        });

        expect(wrapper.attributes("data-disabled")).toBe("true");
        expect(wrapper.get("button").attributes("disabled")).toBe("");
    });

    it("keeps icon geometry independent from static semantics", () => {
        const wrapper = mount(Chip, {
            props: { shape: "icon", size: "sm" },
            slots: { default: '<svg aria-hidden="true" />' },
        });

        expect(wrapper.element.tagName).toBe("SPAN");
        expect(wrapper.attributes("data-shape")).toBe("icon");
        expect(wrapper.attributes("aria-pressed")).toBeUndefined();
        expect(chipVariants({ shape: "icon", size: "sm" })).toContain("size-8");
    });

    it("merges consumer style with the tone-owned variables", () => {
        const wrapper = mount(Chip, {
            attrs: { style: { "--consumer-seam": "1" } },
            props: { tone: "var(--section-color-5)" },
            slots: { default: "Tonal" },
        });
        const style = wrapper.attributes("style");

        expect(style).toContain("--consumer-seam: 1");
        expect(style).toContain("--glass-fill-tint: var(--section-color-5)");
    });

    // Mounted with HOSTILE caller attrs — a caller asserting every semantic the component
    // owns — and driven across all three modes. The component's semantics must stay
    // authoritative at each step, and the stale ones must CLEAR rather than survive the
    // transition. The prior body only checked the post-transition attributes on a bare
    // mount, so component-owns-semantics-against-consumer went untested through the change.
    it("does not retain stale pressed semantics when mode changes", async () => {
        const hostile = vi.fn();
        const wrapper = mount(Chip, {
            attrs: {
                role: "button",
                tabindex: "0",
                "aria-pressed": "true",
                "data-state": "caller-state",
                onClick: hostile,
            },
            props: { mode: "selectable", modelValue: true },
            slots: { default: "Mutable" },
        });

        const selectable = wrapper.get("[data-mode]").element;
        expect(selectable.tagName).toBe("BUTTON");
        expect(selectable.getAttribute("data-mode")).toBe("selectable");
        expect(selectable.getAttribute("aria-pressed")).toBe("true");
        expect(selectable.getAttribute("data-state")).toBe("on");

        await wrapper.setProps({ mode: "action", modelValue: undefined });
        const action = wrapper.get("[data-mode]").element;
        expect(action.tagName).toBe("BUTTON");
        expect(action.getAttribute("data-mode")).toBe("action");
        expect(action.getAttribute("aria-pressed")).toBeNull();
        expect(action.getAttribute("data-state")).toBeNull();

        await wrapper.setProps({ mode: "static" });
        const staticHost = wrapper.get("[data-mode]").element;
        expect(staticHost.tagName).toBe("SPAN");
        expect(staticHost.getAttribute("data-mode")).toBe("static");
        expect(staticHost.getAttribute("role")).toBeNull();
        expect(staticHost.getAttribute("tabindex")).toBeNull();
        expect(staticHost.getAttribute("aria-pressed")).toBeNull();
        expect(staticHost.getAttribute("data-state")).toBeNull();
        expect(staticHost.querySelector("button")).toBeNull();
        // the hostile onClick spy must never have been invoked by mode transitions alone
        expect(hostile).not.toHaveBeenCalled();
    });
});
