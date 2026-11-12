// W-B.18 G-NODES and G-FORM: the Slider is five nodes at rest and held; the expanded
// view adds one (the shell) and one more with `valueText` (the readout); nothing is
// mounted in <body> in any state; reka's hidden form input is kept.
import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { defineComponent, h, nextTick, ref } from "vue";

import { Slider } from "@glass/components/slider";

/** Element nodes under the slider root, the root included; marks and the form input aside. */
function count(root: Element): number {
    let n = 1;
    const walk = (el: Element) => {
        for (const child of el.children) {
            if (child.classList.contains("glass-value-marks")) continue;
            if (child.tagName === "INPUT") continue;
            n++;
            walk(child);
        }
    };
    walk(root);
    return n;
}

/** Element nodes the slider placed in <body> outside its own mount. */
function bodyExtras(mountEl: Element): number {
    return [...document.body.children]
        .filter((el) => el !== mountEl)
        .reduce((n, el) => n + 1 + el.querySelectorAll("*").length, 0);
}

async function press(root: HTMLElement): Promise<void> {
    root.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerId: 1 }));
    for (let i = 0; i < 4; i++) await nextTick();
}

async function release(): Promise<void> {
    window.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, pointerId: 1 }));
    await nextTick();
}

const hosts: HTMLElement[] = [];
function host(): HTMLElement {
    const el = document.createElement("div");
    document.body.append(el);
    hosts.push(el);
    return el;
}
afterEach(() => {
    for (const el of hosts.splice(0)) el.remove();
});

describe("Slider expand: node counts (G-NODES)", () => {
    it.each([
        ["expand off", {}, 5, 5],
        ["expand on", { expand: true }, 6, 6],
        ["expand on with valueText", { expand: true, valueText: (n: number) => `${n} s` }, 7, 7],
    ])("%s: rest and held", async (_, extra, rest, held) => {
        const mountEl = host();
        const wrapper = mount(Slider, {
            attachTo: mountEl,
            global: { stubs: { teleport: false } },
            props: { modelValue: [40], "aria-label": "Level", ...extra },
        });
        await nextTick();
        const root = wrapper.element as HTMLElement;
        expect(count(root)).toBe(rest);
        expect(bodyExtras(mountEl)).toBe(0);

        await press(root);
        expect(root.hasAttribute("data-held")).toBe(true);
        // Anything placed in <body> would be counted with the slider's own nodes.
        expect(count(root) + bodyExtras(mountEl)).toBe(held);
        await release();
        wrapper.unmount();
    });

    it("expand on: the readout is a manual popover and aria-hidden", async () => {
        const wrapper = mount(Slider, {
            attachTo: host(),
            props: { modelValue: [40], expand: true, valueText: (n: number) => `${n} s`, "aria-label": "Level" },
        });
        const readout = wrapper.get(".slider-readout");
        expect(readout.attributes("popover")).toBe("manual");
        expect(readout.attributes("aria-hidden")).toBe("true");
        expect(wrapper.get('[role="slider"]').attributes("aria-valuetext")).toBe("40 s");
        wrapper.unmount();
    });
});

describe("Slider expand: the form value (G-FORM)", () => {
    it.each([[false], [true]])("expand %s: a named Slider submits its value after a key press", async (expand) => {
        const model = ref([40]);
        const Host = defineComponent({
            setup: () => () =>
                h("form", { id: "f" }, [
                    h(Slider, {
                        name: "level",
                        expand,
                        modelValue: model.value,
                        "onUpdate:modelValue": (v: number[] | undefined) => v && (model.value = v),
                        "aria-label": "Level",
                    }),
                ]),
        });
        const wrapper = mount(Host, { attachTo: host() });
        await nextTick();
        const form = wrapper.get("form").element as HTMLFormElement;
        expect(form.querySelector("input")).not.toBeNull();
        await wrapper.get('[role="slider"]').trigger("keydown", { key: "ArrowRight" });
        await nextTick();
        expect(model.value).toEqual([41]);
        expect(new FormData(form).getAll(form.querySelector("input")!.name)).toContain("41");
        wrapper.unmount();
    });
});
