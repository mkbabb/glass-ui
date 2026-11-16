// The small controls the 11.1.1 state-change cells read: SegmentedTabs at a compact and
// at a wide strip (the wide one is past 20rem, so it takes the bar shape), a ToggleGroup
// with word labels at their own width, and a `scale-on-hover` tile. Imports are relative
// to `src/`, so the file mounts unchanged on an older tree.
import "../../demo/demo.css";
import { createApp, h, ref } from "vue";

import SegmentedTabs from "../../src/components/tabs/SegmentedTabs.vue";
import ToggleGroup from "../../src/components/toggle-group/ToggleGroup.vue";
import ToggleGroupItem from "../../src/components/toggle-group/ToggleGroupItem.vue";

const compact = ref("a");
const wide = ref("a");
const picked = ref<string[]>([]);
const options = [
    { value: "a", label: "Linear" },
    { value: "b", label: "Ease" },
    { value: "c", label: "Spring" },
];

createApp({
    setup: () => () =>
        h("div", { style: "padding:24px 12px;display:flex;flex-direction:column;align-items:flex-start;gap:24px;font-family:system-ui" }, [
            h(SegmentedTabs, {
                modelValue: compact.value,
                "onUpdate:modelValue": (v: string) => (compact.value = v),
                options,
                ariaLabel: "Compact",
                "data-testid": "c-tabs-compact",
            }),
            h("div", { style: "width:22rem" }, [
                h(SegmentedTabs, {
                    modelValue: wide.value,
                    "onUpdate:modelValue": (v: string) => (wide.value = v),
                    options,
                    ariaLabel: "Wide",
                    class: "w-full",
                    "data-testid": "c-tabs-wide",
                }),
            ]),
            h(
                ToggleGroup,
                {
                    type: "multiple",
                    modelValue: picked.value,
                    "onUpdate:modelValue": (v: string[]) => (picked.value = v),
                    "aria-label": "Words",
                    "data-testid": "c-toggle",
                },
                () =>
                    ["Underline", "Bold", "Strikethrough"].map((w) =>
                        h(ToggleGroupItem, { value: w, "data-testid": `c-toggle-${w}` }, () => w),
                    ),
            ),
            h(
                "button",
                {
                    class: "scale-on-hover",
                    "data-testid": "c-lift",
                    style: "padding:12px 18px;background:#fff;color:#000;border-radius:12px;font:14px sans-serif",
                },
                "Lift",
            ),
        ]),
}).mount("#app");
document.body.dataset.ready = "1";
