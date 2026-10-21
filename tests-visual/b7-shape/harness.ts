// glass-ui U/B7 G1 — the shape-and-glide witnesses' harness. One page, one scene per
// `?scene=`, the real library components from `src/` under the demo's own cascade.
// Imports are relative to `src/`, so the same file mounts unchanged on the 10.1.1 tag:
// that is how each witness is shown failing on bbf176f02 and passing on this branch.
//
// `?layered=1` loads the demo cascade the way atlas does: the compiled sheet is wrapped
// whole in a consumer layer (`@layer app.recipes { … }`), after an app layer order
// statement. `?theme=dark` sets the dark class on the root.
import { createApp, defineComponent, h, ref, type Component } from "vue";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "";
const w = window as unknown as Record<string, unknown>;

if (params.get("layered") === "1") {
    const css = (await import("../../demo/demo.css?inline")).default as string;
    const style = document.createElement("style");
    style.textContent = `@layer app, app.tokens, app.recipes, app.components;\n@layer app.recipes {\n${css}\n}`;
    document.head.append(style);
} else {
    await import("../../demo/demo.css");
}
if (params.get("theme") === "dark") document.documentElement.classList.add("dark");

const { default: SegmentedTabs } = await import("../../src/components/tabs/SegmentedTabs.vue");

const TAB_OPTIONS = [
    { label: "All", value: "all" },
    { label: "Funding", value: "funding" },
    { label: "Schools", value: "schools" },
    { label: "Networks", value: "networks" },
    { label: "Speeds", value: "speeds" },
];

const scenes: Record<string, () => Promise<Component>> = {
    // The O-4 strip: five equal tabs on the pill material.
    tabs: async () =>
        defineComponent(() => {
            const model = ref("all");
            w.__select = (v: string) => (model.value = v);
            return () =>
                h("div", { style: "padding:48px" }, [
                    h(SegmentedTabs, {
                        options: TAB_OPTIONS,
                        modelValue: model.value,
                        "onUpdate:modelValue": (v: string) => (model.value = v),
                        ariaLabel: "Subject",
                        "data-witness": "strip",
                    }),
                ]);
        }),
};

const make = scenes[scene];
if (!make) throw new Error(`unknown scene "${scene}"`);
createApp(await make()).mount("#app");
w.__ready = true;
