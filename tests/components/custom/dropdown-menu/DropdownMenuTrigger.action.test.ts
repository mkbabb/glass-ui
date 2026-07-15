import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { defineComponent, h, ref } from "vue";

import DropdownMenu from "@glass/components/dropdown-menu/DropdownMenu.vue";
import DropdownMenuTrigger from "@glass/components/dropdown-menu/DropdownMenuTrigger.vue";
import DockTrigger from "@glass/components/dock/DockTrigger.vue";

function mountTrigger(action?: "click" | "pointerdown", dock = false) {
    const updates = vi.fn();
    const Host = defineComponent({
        setup() {
            const open = ref(false);
            return () =>
                h(
                    DropdownMenu,
                    {
                        open: open.value,
                        "onUpdate:open": (value: boolean) => {
                            open.value = value;
                            updates(value);
                        },
                    },
                    () =>
                        dock
                            ? h(DockTrigger, { for: "dropdown" }, () => "Open")
                            : h(DropdownMenuTrigger, { action }, () => "Open"),
                );
        },
    });
    const wrapper = mount(Host, { attachTo: document.body });
    return { wrapper, trigger: wrapper.get("button"), updates };
}

describe("DropdownMenuTrigger action", () => {
    it("keeps click as the compatibility default", async () => {
        const { wrapper, trigger, updates } = mountTrigger();

        await trigger.trigger("pointerdown", { button: 0, ctrlKey: false });
        expect(trigger.attributes("data-state")).toBe("closed");

        await trigger.trigger("click", { button: 0, ctrlKey: false, detail: 1 });
        expect(trigger.attributes("data-state")).toBe("open");
        expect(updates).toHaveBeenCalledOnce();

        wrapper.unmount();
    });

    it("toggles on primary pointerdown and suppresses its trailing click only", async () => {
        const { wrapper, trigger, updates } = mountTrigger("pointerdown");

        await trigger.trigger("pointerdown", { button: 2, ctrlKey: false });
        expect(trigger.attributes("data-state")).toBe("closed");
        expect(updates).not.toHaveBeenCalled();

        await trigger.trigger("pointerdown", { button: 0, ctrlKey: false });
        expect(trigger.attributes("data-state")).toBe("open");
        await trigger.trigger("click", { button: 0, ctrlKey: false, detail: 1 });
        expect(trigger.attributes("data-state")).toBe("open");
        expect(updates).toHaveBeenCalledTimes(1);

        await trigger.trigger("click", { button: 0, ctrlKey: false, detail: 1 });
        expect(trigger.attributes("data-state")).toBe("closed");
        expect(updates).toHaveBeenCalledTimes(2);

        wrapper.unmount();
    });

    it.each(["Enter", " "])("preserves %s keyboard activation", async (key) => {
        const { wrapper, trigger, updates } = mountTrigger("pointerdown");

        await trigger.trigger("keydown", { key });
        expect(trigger.attributes("data-state")).toBe("open");
        expect(updates).toHaveBeenCalledOnce();

        wrapper.unmount();
    });

    it("does not carry suppression past a canceled pointer", async () => {
        const { wrapper, trigger, updates } = mountTrigger("pointerdown");

        await trigger.trigger("pointerdown", { button: 0, ctrlKey: false });
        await trigger.trigger("pointercancel");
        await trigger.trigger("click", { button: 0, ctrlKey: false, detail: 1 });

        expect(trigger.attributes("data-state")).toBe("closed");
        expect(updates).toHaveBeenCalledTimes(2);

        wrapper.unmount();
    });

    it("never swallows a keyboard-generated click", async () => {
        const { wrapper, trigger, updates } = mountTrigger("pointerdown");

        await trigger.trigger("pointerdown", { button: 0, ctrlKey: false });
        await trigger.trigger("click", { detail: 0 });

        expect(trigger.attributes("data-state")).toBe("closed");
        expect(updates).toHaveBeenCalledTimes(2);

        wrapper.unmount();
    });

    it("makes DockTrigger dropdowns pointerdown-active", async () => {
        const { wrapper, trigger, updates } = mountTrigger(undefined, true);

        await trigger.trigger("pointerdown", { button: 0, ctrlKey: false });
        expect(trigger.attributes("data-state")).toBe("open");
        await trigger.trigger("click", { button: 0, ctrlKey: false, detail: 1 });
        expect(trigger.attributes("data-state")).toBe("open");
        expect(updates).toHaveBeenCalledOnce();

        wrapper.unmount();
    });
});
