/**
 * `loupe` gates the held lens and the frost around the held control. A default Slider
 * mounts neither on a grasp and keeps its own stacking; with `loupe` set a horizontal
 * scrubber mounts both, and a vertical one mounts the frost alone.
 */
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { afterEach, describe, expect, it } from "vitest";
import { Slider } from "@glass/components/slider";

async function grasp(props: Record<string, unknown>) {
    const wrapper = mount(Slider, {
        props: { modelValue: [40], "aria-label": "Grasp", ...props },
        attachTo: document.body,
        global: { stubs: { teleport: false } },
    });
    const root = wrapper.element as HTMLElement;
    root.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerId: 1 }));
    await nextTick();
    await nextTick();
    return { wrapper, root };
}

const count = (selector: string) => document.querySelectorAll(selector).length;

afterEach(() => {
    window.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, pointerId: 1 }));
    document.body.innerHTML = "";
});

describe("Slider · loupe", () => {
    it("a default Slider mounts no lens and no frost on a grasp, and is not raised", async () => {
        const { wrapper, root } = await grasp({});
        expect(root.getAttribute("data-held")).toBe("true");
        expect(count(".glass-loupe")).toBe(0);
        expect(count(".glass-focus-veil")).toBe(0);
        expect(root.hasAttribute("data-focus-veil")).toBe(false);
        expect(root.style.zIndex).toBe("");
        expect(root.hasAttribute("loupe")).toBe(false);
        wrapper.unmount();
    });

    it("with loupe a horizontal scrubber mounts the lens and the frost on a grasp", async () => {
        const { wrapper, root } = await grasp({ loupe: true });
        expect(count(".glass-loupe")).toBe(1);
        expect(count(".glass-focus-veil")).toBe(1);
        expect(root.getAttribute("data-focus-veil")).toBe("true");
        expect(root.style.zIndex).toBe("var(--z-overlay)");
        wrapper.unmount();
        expect(count(".glass-loupe")).toBe(0);
    });

    it("with loupe a vertical scrubber mounts the frost and no lens", async () => {
        const { wrapper } = await grasp({ loupe: true, orientation: "vertical" });
        expect(count(".glass-loupe")).toBe(0);
        expect(count(".glass-focus-veil")).toBe(1);
        wrapper.unmount();
    });
});
