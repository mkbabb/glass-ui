// U/B7 G1 (2) — the dock layer switcher glides with the tabs' law: the indicator is
// moved by its measured geometry and nothing writes a deform onto it.
//
// On the v10.1.1 tag `DockLayerGroup` called `useSelectionGroup` in single mode, whose
// default deform was `plate`, so every switch wrote a velocity `--stretch` and a
// transient `--motion-weight` onto the switcher indicator (one computed-style read per
// switch on the way). This test fails there and passes here.
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { defineComponent, h, nextTick, ref } from "vue";

import GlassDock from "@glass/components/dock/GlassDock.vue";
import DockLayerGroup from "@glass/components/dock/DockLayerGroup.vue";
import DockLayer from "@glass/components/dock/DockLayer.vue";

async function mountSwitcher() {
    const active = ref("a");
    const Host = defineComponent({
        setup: () => () =>
            h(GlassDock, { collapse: "open" }, () => [
                h(
                    DockLayerGroup,
                    { active: active.value, "onUpdate:active": (v: string) => (active.value = v) },
                    () => [
                        h(DockLayer, { id: "a", label: "Assets" }, () => h("button", "in-a")),
                        h(DockLayer, { id: "b", label: "Layers" }, () => h("button", "in-b")),
                        h(DockLayer, { id: "c", label: "Libraries" }, () => h("button", "in-c")),
                    ],
                ),
            ]),
    });
    const wrapper = mount(Host, { attachTo: document.body });
    (wrapper.findComponent(GlassDock).vm as unknown as { expand: () => void }).expand();
    await nextTick();
    await nextTick();
    return { wrapper, active };
}

describe("DockLayerGroup — the switcher indicator glides without a deform", () => {
    it("a switch writes no --stretch and no --motion-weight onto the indicator", async () => {
        const { wrapper, active } = await mountSwitcher();
        const tabs = wrapper.findAll('[role="tab"]');
        expect(tabs.length).toBe(3);
        const indicator = wrapper.get(".dock-layer-tab-indicator").element as HTMLElement;
        await tabs[2]!.trigger("click");
        await nextTick();
        expect(active.value).toBe("c");
        expect(indicator.style.getPropertyValue("--stretch")).toBe("");
        expect(indicator.style.getPropertyValue("--motion-weight")).toBe("");
        wrapper.unmount();
    });

    it("the velocity stretch law and its cap token are gone from the library", () => {
        const root = process.cwd();
        const engine = readFileSync(
            join(root, "src/composables/motion/morph/useSelectionIndicator.ts"),
            "utf8",
        ).replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "");
        expect(engine).not.toMatch(/--stretch|squishOnTravel|SelectionDeform|writeVelocityWeight/);
        const tokens = readFileSync(join(root, "src/styles/tokens/scale-paper.css"), "utf8");
        expect(tokens).not.toMatch(/--tab-indicator-max-stretch\s*:/);
    });
});
