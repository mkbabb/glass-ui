// Critic 1 probes for the leave-finished event. A ContextMenu and a hover-card Popover
// in the page, and three mounts of the same in-place Popover
// (`portal: false`): one in the page, one inside an open shadow root with the page's
// styles copied in, and a Dialog whose open state and mount the probe drives, so it can
// be unmounted mid-exit. Every leave-finished the page, the host and the Vue listeners
// hear is counted on `window.__probe`.
import "../../../../demo/demo.css";
import { createApp, h, ref } from "vue";
import Popover from "../../../../src/components/popover/Popover.vue";
import PopoverContent from "../../../../src/components/popover/PopoverContent.vue";
import PopoverTrigger from "../../../../src/components/popover/PopoverTrigger.vue";
import ContextMenu from "../../../../src/components/menu/ContextMenu.vue";
import DropdownMenuTrigger from "../../../../src/components/menu/DropdownMenuTrigger.vue";
import DropdownMenuContent from "../../../../src/components/menu/DropdownMenuContent.vue";
import DropdownMenuItem from "../../../../src/components/menu/DropdownMenuItem.vue";
import Dialog from "../../../../src/components/dialog/Dialog.vue";
import DialogContent from "../../../../src/components/dialog/DialogContent.vue";
import DialogTitle from "../../../../src/components/dialog/DialogTitle.vue";

const probe = { window: [] as string[], host: [] as string[], emits: {} as Record<string, number> };
const emit = (id: string) => ({ onLeaveFinished: () => (probe.emits[id] = (probe.emits[id] ?? 0) + 1) });
const dlgOpen = ref(false);
const dlgMounted = ref(true);
Object.assign(window, { __probe: probe, __dlg: { open: dlgOpen, mounted: dlgMounted } });
window.addEventListener("leave-finished", (e) => probe.window.push((e as CustomEvent).detail?.kind));

const btn = "padding:10px 14px;background:#fff;color:#000;border-radius:8px;font:14px sans-serif";
const popover = (id: string) =>
    h(Popover, null, () => [
        h(PopoverTrigger, { "data-testid": `${id}-trigger`, style: btn }, () => id),
        h(PopoverContent, { portal: false, class: "w-56", "data-testid": `${id}-content`, ...emit(id) }, () => h("p", "A popover.")),
    ]);

createApp({
    setup: () => () =>
        h("div", { style: "padding:24px;display:flex;gap:16px" }, [
            popover("light"),
            h(ContextMenu, null, () => [
                h(DropdownMenuTrigger, { asChild: true }, () => h("button", { "data-testid": "ctx-trigger", style: btn }, "Right-click")),
                h(DropdownMenuContent, { class: "w-52", "data-testid": "ctx-content", ...emit("ctx") }, () =>
                    ["Copy", "Share"].map((t) => h(DropdownMenuItem, { "data-testid": `ctx-item-${t}` }, () => t)),
                ),
            ]),
            h(Popover, { trigger: "hover", openDelay: 0, closeDelay: 0 }, () => [
                h(PopoverTrigger, { "data-testid": "hover-trigger", style: btn }, () => "Hover card"),
                h(PopoverContent, { ariaLabel: "A hover card", class: "w-56", "data-testid": "hover-content", ...emit("hover") }, () => h("p", "A hover card.")),
            ]),
            dlgMounted.value
                ? h(Dialog, { open: dlgOpen.value, "onUpdate:open": (v: boolean) => (dlgOpen.value = v) }, () => [
                      h(DialogContent, { "data-testid": "dlg-content", ...emit("dlg") }, () => [h(DialogTitle, () => "A dialog"), h("p", "Its body.")]),
                  ])
                : null,
        ]),
}).mount("#light");

const host = document.getElementById("host")!;
host.addEventListener("leave-finished", (e) => probe.host.push((e as CustomEvent).detail?.kind));
const root = host.attachShadow({ mode: "open" });
const mount = document.createElement("div");
root.appendChild(mount);
createApp({ setup: () => () => h("div", { style: "padding:24px" }, [popover("shadow")]) }).mount(mount);
// The page's stylesheets, copied into the shadow root so the surface there has its exit.
const copy = () => {
    for (const s of document.head.querySelectorAll("style")) root.appendChild(s.cloneNode(true));
    document.body.dataset.ready = "1";
};
setTimeout(copy, 600);
