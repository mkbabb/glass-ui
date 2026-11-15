// `useDockState`'s root may be a template ref on a component (the dock-search page passes
// `useTemplateRef` on its `<GlassDock>`), which holds the public instance, not an element.
// The root resolves to the instance's root element: mounting does not throw, and the
// press listener on it works (a touch press held on a persistent seat expands the dock).
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent, h, useTemplateRef } from "vue";

import { DOCK_LONG_PRESS_MS } from "@glass/components/dock/constants";
import { useDockState } from "@glass/components/dock/composables/useDockState";

const Child = defineComponent(() => () =>
    h("nav", [h("div", { class: "dock-persistent" }, [h("button", { "data-seat": "" }, "Theme")])]),
);

function pointerdown(): Event {
    const event = new Event("pointerdown", { bubbles: true, cancelable: true, composed: true });
    Object.defineProperties(event, {
        pointerType: { value: "touch" },
        isPrimary: { value: true },
        clientX: { value: 10 },
        clientY: { value: 10 },
        button: { value: 0 },
    });
    return event;
}

describe("useDockState's root", () => {
    it("resolves a component ref to its root element, and a press there is the dock's", async () => {
        let dock: ReturnType<typeof useDockState> | null = null;
        const Host = defineComponent(() => {
            const dockEl = useTemplateRef<InstanceType<typeof Child>>("dockEl");
            dock = useDockState({ rootEl: dockEl });
            return () => h(Child, { ref: "dockEl" });
        });
        const errors: unknown[] = [];
        const wrapper = mount(Host, {
            attachTo: document.body,
            global: { config: { errorHandler: (e) => void errors.push(e) } },
        });
        expect(errors).toEqual([]);
        expect(dock!.state.value).toBe("collapsed");
        wrapper.find("[data-seat]").element.dispatchEvent(pointerdown());
        await new Promise((r) => setTimeout(r, DOCK_LONG_PRESS_MS + 20));
        expect(dock!.expanded.value).toBe(true);
        wrapper.unmount();
    });
});
