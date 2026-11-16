// The leave-finished cells that the exits harness does not hold: a ContextMenu, a
// Popover on its hover arm, a Dialog whose mount the page drives (so it can be unmounted
// mid-exit), and an in-place Popover (`portal: false`) mounted inside an open shadow
// root with the page's styles copied in. Every leave-finished heard on the window, on
// the shadow host and through the Vue listeners is counted on `window.__heard`. Imports
// are relative to `src/`, so the file mounts unchanged on an older tree.
import "../../demo/demo.css";
import { createApp, h, ref } from "vue";
import Popover from "../../src/components/popover/Popover.vue";
import PopoverContent from "../../src/components/popover/PopoverContent.vue";
import PopoverTrigger from "../../src/components/popover/PopoverTrigger.vue";
import ContextMenu from "../../src/components/menu/ContextMenu.vue";
import DropdownMenuTrigger from "../../src/components/menu/DropdownMenuTrigger.vue";
import DropdownMenuContent from "../../src/components/menu/DropdownMenuContent.vue";
import DropdownMenuItem from "../../src/components/menu/DropdownMenuItem.vue";
import Dialog from "../../src/components/dialog/Dialog.vue";
import DialogContent from "../../src/components/dialog/DialogContent.vue";
import DialogTitle from "../../src/components/dialog/DialogTitle.vue";

type Heard = { at: number; kind: string; bubbles: boolean; composed: boolean };
const heard = { window: [] as Heard[], host: [] as Heard[], emits: {} as Record<string, number> };
const stamp = (e: Event): Heard => ({
    at: performance.now(),
    kind: (e as CustomEvent<{ kind: string }>).detail?.kind,
    bubbles: e.bubbles,
    composed: e.composed,
});
const onLeave = (id: string) => ({ onLeaveFinished: () => (heard.emits[id] = (heard.emits[id] ?? 0) + 1) });
const dialogOpen = ref(false);
const dialogMounted = ref(true);
Object.assign(window, { __heard: heard, __dialog: { open: dialogOpen, mounted: dialogMounted } });
window.addEventListener("leave-finished", (e) => heard.window.push(stamp(e)));

const btn = "padding:10px 14px;background:#fff;color:#000;border-radius:8px;font:14px sans-serif";
const inPlacePopover = (id: string) =>
    h(Popover, null, () => [
        h(PopoverTrigger, { "data-testid": `${id}-trigger`, style: btn }, () => id),
        h(PopoverContent, { portal: false, class: "w-56", "data-testid": `${id}-content`, ...onLeave(id) }, () => h("p", "A popover.")),
    ]);

createApp({
    setup: () => () =>
        h("div", { style: "padding:24px;display:flex;flex-wrap:wrap;gap:16px" }, [
            h(ContextMenu, null, () => [
                h(DropdownMenuTrigger, { asChild: true }, () => h("button", { "data-testid": "l-ctx", style: btn }, "Context")),
                h(DropdownMenuContent, { class: "w-52", "data-testid": "l-ctx-content", ...onLeave("ctx") }, () =>
                    ["Copy", "Share"].map((t) => h(DropdownMenuItem, { "data-testid": `l-ctx-${t}` }, () => t)),
                ),
            ]),
            h(Popover, { trigger: "hover", openDelay: 0, closeDelay: 0 }, () => [
                h(PopoverTrigger, { "data-testid": "l-hover", style: btn }, () => "Hover card"),
                h(PopoverContent, { ariaLabel: "A hover card", class: "w-56", "data-testid": "l-hover-content", ...onLeave("hover") }, () =>
                    h("p", "A hover card."),
                ),
            ]),
            h("button", { "data-testid": "l-dialog", style: btn, onClick: () => (dialogOpen.value = true) }, "Dialog"),
            dialogMounted.value
                ? h(Dialog, { open: dialogOpen.value, "onUpdate:open": (v: boolean) => (dialogOpen.value = v) }, () => [
                      h(DialogContent, { "data-testid": "l-dialog-content", ...onLeave("dialog") }, () => [
                          h(DialogTitle, () => "A dialog"),
                          h("p", "Its body."),
                      ]),
                  ])
                : null,
        ]),
}).mount("#light");

const host = document.getElementById("host")!;
host.addEventListener("leave-finished", (e) => heard.host.push(stamp(e)));
const root = host.attachShadow({ mode: "open" });
const mount = document.createElement("div");
root.appendChild(mount);
createApp({ setup: () => () => h("div", { style: "padding:24px" }, [inPlacePopover("l-shadow")]) }).mount(mount);
// The page's stylesheets, copied into the shadow root once Vite has injected them, so
// the surface there has its exit.
setTimeout(() => {
    for (const s of document.head.querySelectorAll("style")) root.appendChild(s.cloneNode(true));
    document.body.dataset.ready = "1";
}, 600);
