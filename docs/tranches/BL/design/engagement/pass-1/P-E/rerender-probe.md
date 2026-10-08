# P-E · footprint under a parent re-render during a hold (R-E §8 item 5)

A scratch vitest (happy-dom) run in the P-E worktree, deleted after; the test body and its printed output are kept here.

```ts
import { mount } from "@vue/test-utils";
import { it, expect } from "vitest";
import { defineComponent, h, nextTick, ref } from "vue";
import { Slider } from "@glass/components/slider";
it("parent re-render during a hold", async () => {
    const out: string[] = [];
    const order = ref(["s", "a", "b"]);
    const extra = ref(false);
    const P = defineComponent({ setup: () => () => h("div", { class: "p" }, [
        extra.value ? h("i", { key: "x", class: "x" }) : null,
        ...order.value.map((k) => k === "s" ? h(Slider, { key: "s", modelValue: [40], "aria-label": "R" }) : h("b", { key: k, class: k })),
    ]) });
    const w = mount(P, { attachTo: document.body });
    const root = w.element.querySelector(".glass-slider") as HTMLElement;
    root.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
    await nextTick(); await nextTick();
    const seq = () => [...w.element.children].map((c) => c.className.split(" ")[0] || c.tagName).join(",");
    out.push(`held: ${seq()}`);
    extra.value = true; await nextTick();
    out.push(`insert-before: ${seq()} adjacent=${root.previousElementSibling?.className === "engage-footprint"}`);
    order.value = ["a", "s", "b"]; await nextTick();
    out.push(`reorder: ${seq()} adjacent=${root.previousElementSibling?.className === "engage-footprint"}`);
    window.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
    await nextTick(); await nextTick(); await new Promise((r) => setTimeout(r, 50));
    out.push(`released: ${seq()} footprints=${document.querySelectorAll(".engage-footprint").length}`);
    expect(out.join("\n")).toBe("");   // fails on purpose, to print `out`
});
```

Output (2026-10-08 19:16, load ~50):

```
held: engage-footprint,glass-slider,a,b
insert-before: engage-footprint,x,glass-slider,a,b adjacent=false
reorder: engage-footprint,x,a,glass-slider,b adjacent=false
released: x,a,glass-slider,b footprints=0
```

Reading: Vue anchors its own inserts and moves on the host element, never on the footprint, so a sibling inserted before a held control lands between the footprint and the host, and a keyed move carries the host away from it. The promoted host stays pinned to the footprint (`position-anchor`), so it does not move under the finger during the hold; the footprint keeps the old slot in flow. On release the footprint is removed and the control appears in its new slot in one frame, with no motion. Nothing leaks (0 footprints after release). A D-1 gap on a rare path; not cured in P-E.
