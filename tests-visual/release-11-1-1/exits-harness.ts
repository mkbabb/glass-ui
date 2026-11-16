// Every surface the exits witnesses close, on a busy ground. A GlassDock at the top
// seats a Select (its open state driven by `v-model:open`, as value.js's pages dropdown
// drives it) and a DropdownMenu. Imports are relative to `src/`, so the file mounts
// unchanged on an older tree.
import "../../demo/demo.css";
import { createApp, h, ref } from "vue";

import GlassDock from "../../src/components/dock/GlassDock.vue";
import DockControl from "../../src/components/dock/DockControl.vue";
import DockTrigger from "../../src/components/dock/DockTrigger.vue";
import Select from "../../src/components/select/Select.vue";
import SelectContent from "../../src/components/select/SelectContent.vue";
import SelectItem from "../../src/components/select/SelectItem.vue";
import SelectValue from "../../src/components/select/SelectValue.vue";
import DropdownMenu from "../../src/components/menu/DropdownMenu.vue";
import DropdownMenuContent from "../../src/components/menu/DropdownMenuContent.vue";
import DropdownMenuItem from "../../src/components/menu/DropdownMenuItem.vue";

const params = new URLSearchParams(location.search);
if (params.get("scheme") === "dark") document.documentElement.classList.add("dark");

/* The busy ground: hard black and white bars under saturated colour, so a translucent
   plate is read against its worst neighbours rather than a flat field. */
document.body.style.cssText = [
    "margin:0",
    "min-height:100vh",
    "background:repeating-linear-gradient(90deg,#000 0 14px,#fff 14px 28px,#e11 28px 42px,#13e 42px 56px,#fd0 56px 70px)",
].join(";");

const pages = ["Picker", "Palettes", "Gradient", "Mix", "Extract"];
const view = ref("Picker");
const open = ref(false);

createApp({
    setup: () => () =>
        h("div", { style: "padding:16px 8px 900px;display:flex;justify-content:center" }, [
            h(
                GlassDock,
                { collapse: false, "aria-label": "Exits" },
                {
                    default: () => [
                        h(DockControl, { "aria-label": "Home" }, () => "⌂"),
                        h(
                            Select,
                            {
                                modelValue: view.value,
                                open: open.value,
                                "onUpdate:open": (v: boolean) => (open.value = v),
                                "onUpdate:modelValue": (v: unknown) => (view.value = String(v)),
                            },
                            () => [
                                h(DockTrigger, { for: "select", "aria-label": "Select view", "data-testid": "x-select" }, () => [
                                    h("span", view.value),
                                    h(SelectValue, { class: "sr-only" }),
                                ]),
                                h(SelectContent, { class: "min-w-[12rem]", "data-testid": "x-select-content" }, () =>
                                    pages.map((p) => h(SelectItem, { value: p, "data-testid": `x-opt-${p}` }, () => p)),
                                ),
                            ],
                        ),
                        h(DropdownMenu, null, () => [
                            h(DockTrigger, { for: "dropdown", "aria-label": "Actions", "data-testid": "x-menu" }, () => "⋯"),
                            h(DropdownMenuContent, { align: "center", class: "w-52", "data-testid": "x-menu-content" }, () =>
                                ["Copy", "Share", "Archive"].map((t) =>
                                    h(DropdownMenuItem, { "data-testid": `x-item-${t}` }, () => t),
                                ),
                            ),
                        ]),
                    ],
                },
            ),
        ]),
}).mount("#app");
document.body.dataset.ready = "1";
