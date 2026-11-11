// Fix 4 witness harness: a Collapsible whose content carries a consumer's own padding
// (?cls=), with --collapsible-gap unset or set (?gap=<px>), open or closed (?closed=1).
// The library is imported by relative source path, so the same page runs on any tree.
import "./harness.css";
import { createApp, defineComponent, h, ref } from "vue";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../../../src/components/collapsible";

const params = new URLSearchParams(location.search);
if (params.get("theme") === "dark") document.documentElement.classList.add("dark");
const w = window as unknown as Record<string, unknown>;

const Scene = defineComponent(() => {
    const gap = params.get("gap");
    const open = ref(params.get("closed") !== "1");
    return () =>
        h("div", { class: "scene" }, [
            h(Collapsible, { open: open.value, "onUpdate:open": (x: boolean) => (open.value = x), "data-probe": "croot", style: gap ? `--collapsible-gap: ${gap}px` : undefined }, () => [
                h(CollapsibleTrigger, { "data-probe": "ctrig" }, () => "More"),
                h(CollapsibleContent, { "data-probe": "content", class: params.get("cls") ?? "" }, () => [
                    h("p", { "data-probe": "c1", style: "margin: 0" }, "The first line of the content"),
                    h("p", { style: "margin: 0" }, "A second line"),
                ]),
            ]),
        ]);
});
createApp(Scene).mount("#app");
requestAnimationFrame(() => requestAnimationFrame(() => (w.__ready = true)));
