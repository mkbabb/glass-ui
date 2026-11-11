// The one fixture every candidate is measured on. Shared by the client page and by SSR.
// The candidate is chosen by which `adapter.ts` the worktree holds (adapter-{ctl,a,b}.ts).
import { defineComponent, h, type PropType } from "vue";
import * as A from "./adapter";

export type Shape = "underline" | "highlight";
/** A route's own ink (atlas's need): a teal far from glass's --primary in both themes. */
export const ROUTE_INK = "oklch(0.55 0.13 175)";
export const ROUTE_HUE = 175;

const bl = () => h("span", { class: "bl", "aria-hidden": "true" });

export const Rows = defineComponent({
    props: {
        shape: { type: String as PropType<Shape>, required: true },
        onDrawn: { type: Function as PropType<() => void>, default: undefined },
    },
    setup(p) {
        const m = (probe: string, text: any, ink?: string) =>
            h(A.Comp, { ...A.props(p.shape, { ink }), "data-probe": probe, onDrawn: p.onDrawn }, () => text);
        return () =>
            h("div", { class: "sheet" }, [
                ...[16, 48, 85, 112].map((px) =>
                    h("h1", { class: "head", "data-row": `h${px}`, style: `font-size:${px}px` }, [
                        m(`h${px}`, "4,485"),
                        bl(),
                        " visits",
                    ]),
                ),
                h("p", { class: "body", "data-row": "body" }, [
                    "Most visitors came from ",
                    m("wake", "Wake County"),
                    bl(),
                    " and found the museum through ",
                    m("google", "Google"),
                    bl(),
                    ".",
                ]),
                h("p", { class: "wrap", "data-row": "wrap" }, [
                    "Attendance ",
                    m("wrap", "rose through September and held through the last week of October"),
                    ", the longest run on record.",
                ]),
                ...[21, 42].map((px) =>
                    h("h2", { class: "title", "data-row": `atlas${px}`, style: `font-size:${px}px` }, [
                        "Library visits in the county ",
                        m(`atlas${px}`, "doubled again", ROUTE_INK),
                        " after the branches stayed open into the evening through the whole of the winter",
                    ]),
                ),
                h("p", { class: "rtl", "data-row": "rtl", dir: "rtl", lang: "ar" }, [
                    "أحصى المتحف ",
                    m("rtl", "أربعة آلاف زيارة في فصل الخريف"),
                    " هذا العام.",
                ]),
                h("p", { class: "plain", "data-row": "plain" }, [
                    "Plain class, no component: ",
                    A.plain ? h(A.plain.tag(p.shape), { class: A.plain.cls(p.shape), "data-plain": "1" }, "Wake County") : "(none offered)",
                    ".",
                ]),
                h("span", { class: "spring-probe" }),
                h("span", { class: "ink-swatch", style: `background:${ROUTE_INK}` }),
            ]);
    },
});

/** One headline mark for the stall and in-view scenes. */
export const One = defineComponent({
    props: {
        shape: { type: String as PropType<Shape>, required: true },
        row: { type: String, default: "h85" },
        fold: { type: Boolean, default: false },
        mounted: { type: Boolean, default: true },
        onDrawn: { type: Function as PropType<() => void>, default: undefined },
    },
    setup(p) {
        return () => {
            const mk = (text: string, ink?: string) =>
                p.mounted
                    ? h(A.Comp, { ...A.props(p.shape, { ink }), "data-probe": "mark", onDrawn: p.onDrawn }, () => text)
                    : text;
            const row =
                p.row === "atlas42"
                    ? h("h2", { class: "title", style: "font-size:42px" }, [
                          "Library visits in the county ",
                          mk("doubled again", ROUTE_INK),
                          " after the branches stayed open into the evening",
                      ])
                    : h("h1", { class: "head", style: "font-size:85px" }, [mk("4,485"), " visits"]);
            return h("div", { class: "sheet" }, [
                p.fold ? h("div", { style: "block-size:200vh" }) : null,
                row,
                h("div", { style: "block-size:200vh" }),
                h("span", { class: "spring-probe" }),
            ]);
        };
    },
});
