// Critic 13 (copied by critic 14), readings only: two CommandDialogs whose rows follow the query, as the demo's
// Command page does. "a" takes the Dialog's defaults; "b" passes unmountOnHide: false, a
// DialogProps option CommandDialog forwards, so its content stays mounted (hidden) after
// its exit. Every query write the host receives is logged on window.__p[id].log. Imports
// are relative to src/, so the file mounts unchanged on an older tree.
import "../../demo/demo.css";
import { createApp, h, ref } from "vue";
import CommandDialog from "../../src/components/command/CommandDialog.vue";
import CommandInput from "../../src/components/command/CommandInput.vue";
import CommandList from "../../src/components/command/CommandList.vue";
import CommandItem from "../../src/components/command/CommandItem.vue";
import DialogTitle from "../../src/components/dialog/DialogTitle.vue";
import DialogDescription from "../../src/components/dialog/DialogDescription.vue";

const LABELS = ["New file", "Open folder", "Search everywhere", "Switch branch", "Light theme", "Dark theme", "Account settings", "General settings", "Close tab"];
const all: Record<string, unknown> = {};
Object.assign(window, { __p: all });
const btn = "padding:10px 14px;background:#fff;color:#000;border-radius:8px;font:14px sans-serif";

function palette(id: string, extra: Record<string, unknown>) {
    const open = ref(false);
    const query = ref("");
    const log: Array<[number, string, boolean]> = [];
    all[id] = { open, query, log };
    return () => [
        h("button", { "data-testid": `${id}-open`, style: btn, onClick: () => (open.value = true) }, `palette ${id}`),
        h(CommandDialog, { open: open.value, "onUpdate:open": (v: boolean) => (open.value = v), class: `p-${id}`, ...extra }, () => [
            h(DialogTitle, { class: "sr-only" }, () => "Commands"),
            h(DialogDescription, { class: "sr-only" }, () => "Search and run a command."),
            h(CommandInput, {
                modelValue: query.value,
                "onUpdate:modelValue": (v: string) => {
                    log.push([Math.round(performance.now()), v, open.value]);
                    query.value = v;
                },
                placeholder: "Type a command",
                "aria-label": `Search commands ${id}`,
            }),
            h(CommandList, null, () =>
                LABELS.filter((l) => l.toLowerCase().includes(query.value.trim().toLowerCase())).map((l) =>
                    h(CommandItem, { value: l, onSelect: () => (open.value = false) }, () => l),
                ),
            ),
        ]),
    ];
}
const a = palette("a", {});
const b = palette("b", { unmountOnHide: false });
createApp({ setup: () => () => h("div", { style: "padding:24px;display:flex;gap:16px" }, [...a(), ...b()]) }).mount("#app");
setTimeout(() => (document.body.dataset.ready = "1"), 400);
