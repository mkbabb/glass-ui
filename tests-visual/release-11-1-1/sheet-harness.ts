// One detented bottom Sheet on a busy ground, for the cells that read how it springs
// after a drag. Its ladder is 0.5 and 0.9 and it opens at the rung the `rung` query
// names (0.9 unless given). Its head is a DialogHeader (a drag handle, with
// the sheet's close button beside it), then a body and a footer action. Imports are
// relative to `src/`, so the file mounts unchanged on an older tree.
import "../../demo/demo.css";
import { createApp, h, ref } from "vue";
import Dialog from "../../src/components/dialog/Dialog.vue";
import DialogHeader from "../../src/components/dialog/DialogHeader.vue";
import DialogTitle from "../../src/components/dialog/DialogTitle.vue";
import DialogFooter from "../../src/components/dialog/DialogFooter.vue";
import SheetContent from "../../src/components/sheet/SheetContent.vue";
import { DialogTrigger } from "reka-ui";

const params = new URLSearchParams(location.search);
const rung = ref(Number(params.get("rung") ?? 0.9));
document.body.style.cssText = [
    "margin:0",
    "min-height:100vh",
    "background:repeating-linear-gradient(90deg,#000 0 14px,#fff 14px 28px,#e11 28px 42px,#13e 42px 56px,#fd0 56px 70px)",
].join(";");
const btn = "padding:10px 14px;background:#fff;color:#000;border-radius:8px;font:14px sans-serif";

createApp({
    setup: () => () =>
        h("main", { style: "padding:24px;display:flex;justify-content:center" }, [
            h(Dialog, null, () => [
                h(DialogTrigger, { "data-testid": "s-open", style: btn }, () => "Filters"),
                h(
                    SheetContent,
                    {
                        side: "bottom",
                        detents: [0.5, 0.9],
                        detent: rung.value,
                        "onUpdate:detent": (v: number) => (rung.value = v),
                        "data-testid": "s-content",
                    },
                    () => [
                        h(DialogHeader, { "data-testid": "s-head" }, () => h(DialogTitle, () => "Filters")),
                        h(
                            "div",
                            Array.from({ length: 8 }, (_, i) => h("p", { style: "margin:0;padding:4px 0" }, `Filter ${i + 1}`)),
                        ),
                        h(DialogFooter, null, () => h("button", { style: btn }, "Apply")),
                    ],
                ),
            ]),
        ]),
}).mount("#app");
document.body.dataset.ready = "1";
