// 10.1.6 critic 1: every Slider focus arm on both axes, then the other keyboard controls
// whose focus styles 10.1.5 touched. Each row is preceded by a 1px sentinel button, so one
// Tab from the sentinel is a real keyboard focus on the row's first stop. Imports are
// relative to `src/`, so the file mounts unchanged on the v10.1.4 and v10.1.5 trees.
import "../../../demo/demo.css";
import { createApp, h } from "vue";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../../../src/components/accordion";
import { Button } from "../../../src/components/button";
import { Checkbox } from "../../../src/components/checkbox";
import { DarkModeToggle } from "../../../src/components/dark-mode-toggle";
import { Input } from "../../../src/components/input";
import Slider from "../../../src/components/slider/Slider.vue";
import { Switch } from "../../../src/components/switch";
import { SegmentedTabs } from "../../../src/components/tabs";

const V = { orientation: "vertical", style: "height:160px" };
const sliders = [
    { id: "scrubber-h", props: {} },
    { id: "invalid-h", props: { invalid: true } },
    { id: "spectrum-h", props: { variant: "spectrum" } },
    { id: "scrubber-v", props: { ...V } },
    { id: "invalid-v", props: { invalid: true, ...V } },
    { id: "spectrum-v", props: { variant: "spectrum", ...V } },
    { id: "range-h", props: { defaultValue: [20, 60] } },
];
const tabs = [
    { label: "One", value: "one" },
    { label: "Two", value: "two" },
    { label: "Three", value: "three" },
];
const controls = [
    {
        id: "accordion-trigger",
        node: () =>
            h(Accordion, { type: "single", collapsible: true }, () =>
                h(AccordionItem, { value: "a" }, () => [
                    h(AccordionTrigger, null, () => "Trigger"),
                    h(AccordionContent, null, () => "Body"),
                ]),
            ),
    },
    { id: "tabs-pill", node: () => h(SegmentedTabs, { options: tabs, modelValue: "one" }) },
    {
        id: "tabs-underline",
        node: () => h(SegmentedTabs, { options: tabs, modelValue: "one", variant: "underline" }),
    },
    { id: "dark-mode-toggle", node: () => h(DarkModeToggle) },
    { id: "input", node: () => h(Input, { "aria-label": "input" }) },
    { id: "button", node: () => h(Button, null, () => "Button") },
    { id: "switch", node: () => h(Switch, { "aria-label": "switch" }) },
    { id: "checkbox", node: () => h(Checkbox, { "aria-label": "checkbox" }) },
];
const pre = (id: string) =>
    h("button", {
        "data-pre": id,
        "aria-label": `before ${id}`,
        style: "all:unset;display:block;width:1px;height:1px",
    });

createApp({
    setup: () => () =>
        h("main", { style: "display:grid;gap:24px;padding:32px;max-width:420px" }, [
            ...sliders.flatMap((r) => [
                pre(r.id),
                h("div", { "data-row": r.id, "data-kind": "slider", style: "padding:16px" }, [
                    h(Slider, { defaultValue: [40], "aria-label": r.id, ...r.props }),
                ]),
            ]),
            ...controls.flatMap((c) => [
                pre(c.id),
                h("div", { "data-row": c.id, "data-kind": "control", style: "padding:16px" }, [
                    c.node(),
                ]),
            ]),
        ]),
}).mount("#app");
document.body.dataset.ready = "1";
