#!/usr/bin/env node
// witness5.mjs [--wheel] [port:tag ...] > plan.json: round 2's RED/GREEN plan, value.js's four items
// on /ovf.html?fold. Each case runs on every build named (default: the base on 5391 and
// v5 on 5396; v4 is 5395). Run: node tools/inspect.mjs --engine <e> --plan <plan>.json
import { dockRoom, squeezeDock, dockToEnd, focusLast, fields, easing, easingRead, easingWrap, label, scrollers, spill, sl, sliderRead } from "./witness5-snippets.mjs";

// `--wheel` asks for each sideways pan by a mouse wheel instead of a touch swipe: Playwright's
// WebKit has no touch-move input, and a wheel still says whether a box can pan sideways.
const ARGS = process.argv.slice(2);
const WHEEL = ARGS.includes("--wheel");
const BUILDS = (ARGS.filter((a) => a !== "--wheel").length ? ARGS.filter((a) => a !== "--wheel") : ["5391:base", "5396:cure5"]).map((b) => b.split(":"));
const FOLD = "/ovf.html?fold";
const swipe = (sel) => (WHEEL ? `wheel:${sel}@150@0` : `swipe:${sel}@-150@0`);
const DOCK3 = "[data-testid=fold-dock3] .glass-dock";
const TIGHT = "[data-testid=fold-dock-tight] .glass-dock";
const RUN3 = "[data-testid=fold-dock3] .dock-run";
const RUNT = "[data-testid=fold-dock-tight] .dock-run";

const cases = [
    {
        name: "S1 the eight-tab strip under a sideways pan",
        url: FOLD,
        do: [
            swipe("[data-testid=fold-tabs8] .segmented-tabs"),
            sl("[data-testid=fold-tabs8] .segmented-tabs"),
            sl("[data-testid=fold-tabs8]"),
            "eval:(()=>{const s=document.querySelector('[data-testid=fold-tabs8] .segmented-tabs');return {strip:s.scrollWidth+'/'+s.clientWidth,doc:document.documentElement.scrollWidth,clipped:[...s.querySelectorAll('.segmented-tab')].filter(e=>e.scrollWidth>e.clientWidth+1).length}})()",
        ],
        sel: ["[data-testid=fold-tabs8]", "[data-testid=fold-tabs8] .segmented-tabs"],
    },
    {
        name: "V1 a three-seat dock whose seats all show",
        url: FOLD,
        do: [
            "eval:document.querySelector('[data-testid=fold-dock3]').scrollIntoView({block:'center'})",
            "wait:600",
            dockRoom(DOCK3),
            swipe(RUN3),
            sl(RUN3),
        ],
        sel: [RUN3, DOCK3],
    },
    {
        name: "V1b the same dock in a host 4 px narrower than it asks",
        url: FOLD,
        do: [
            "eval:document.querySelector('[data-testid=fold-dock-tight]').scrollIntoView({block:'center'})",
            "wait:600",
            squeezeDock("[data-testid=fold-dock-tight]", 4),
            "wait:900",
            dockRoom(TIGHT),
            swipe(RUNT),
            sl(RUNT),
            dockToEnd("[data-testid=fold-dock-tight]"),
            "wait:300",
            dockRoom(TIGHT),
        ],
        sel: [RUNT, TIGHT],
    },
    {
        name: "V1c the same dock in a host 12 px narrower than it asks",
        url: FOLD,
        do: [
            "eval:document.querySelector('[data-testid=fold-dock-tight]').scrollIntoView({block:'center'})",
            "wait:600",
            squeezeDock("[data-testid=fold-dock-tight]", 12),
            "wait:900",
            dockRoom(TIGHT),
            dockToEnd("[data-testid=fold-dock-tight]"),
            "wait:300",
            dockRoom(TIGHT),
        ],
        sel: [RUNT, TIGHT],
    },
    {
        name: "V1f the last seat focused, in the dock that fits and in the host 4 px narrower",
        url: FOLD,
        do: [
            "eval:document.querySelector('[data-testid=fold-dock3]').scrollIntoView({block:'center'})",
            "wait:600",
            focusLast(DOCK3),
            "wait:900",
            dockRoom(DOCK3),
            squeezeDock("[data-testid=fold-dock-tight]", 4),
            "eval:document.querySelector('[data-testid=fold-dock-tight]').scrollIntoView({block:'center'})",
            "wait:900",
            focusLast(TIGHT),
            "wait:900",
            dockRoom(TIGHT),
        ],
        sel: [RUN3, RUNT],
    },
    {
        name: "V2 three LabeledFields in 73 px columns (value.js's Gradient band)",
        url: FOLD,
        do: ["eval:document.querySelector('[data-testid=fold-lf3]').scrollIntoView({block:'center'})", "wait:400", fields("[data-testid=fold-lf3]")],
        sel: ["[data-testid=fold-lf3]", "[data-testid=fold-lf3] [data-slot=labeled-field]", "[data-testid=fold-lf3] [data-slot=select-trigger]"],
    },
    {
        name: "V2b a LabeledField in a 120 px column (keyframes' Controls sheet)",
        url: FOLD,
        do: ["eval:document.querySelector('[data-testid=fold-lf-kf]').scrollIntoView({block:'center'})", "wait:400", fields("[data-testid=fold-lf-kf]")],
        sel: ["[data-testid=fold-lf-kf]", "[data-testid=fold-lf-kf] [data-slot=labeled-field]", "[data-testid=fold-lf-kf] [data-slot=select-trigger]"],
    },
    {
        name: "V2c a label word longer than its 73 px field",
        url: FOLD,
        do: [
            "eval:document.querySelector('[data-testid=fold-lf3]').scrollIntoView({block:'center'})",
            label("[data-testid=fold-lf3] [data-slot=label]", 1, "Interpolation"),
            "wait:400",
            fields("[data-testid=fold-lf3]"),
        ],
        sel: ["[data-testid=fold-lf3]", "[data-testid=fold-lf3] [data-slot=labeled-field]", "[data-testid=fold-lf3] [data-slot=label]"],
    },
    {
        name: "V3 EasingPicker in steps mode in a 200 and a 186 px column",
        url: FOLD,
        do: [
            "eval:document.querySelector('[data-testid=fold-easing]').scrollIntoView({block:'center'})",
            easing("[data-testid=fold-easing]", 200),
            "wait:700",
            easingRead("[data-testid=fold-easing]"),
            easing("[data-testid=fold-easing]", 186),
            "wait:700",
            easingRead("[data-testid=fold-easing]"),
        ],
        sel: ["[data-testid=fold-easing]", "[data-testid=fold-easing] [data-slot=easing-controls]"],
    },
    {
        name: "V3v EasingPicker in steps mode at value.js's width, a 228 px column (a 202 px row)",
        url: FOLD,
        do: [
            "eval:document.querySelector('[data-testid=fold-easing]').scrollIntoView({block:'center'})",
            easing("[data-testid=fold-easing]", 228),
            "wait:700",
            easingRead("[data-testid=fold-easing]"),
        ],
        sel: ["[data-testid=fold-easing]", "[data-testid=fold-easing] [data-slot=easing-controls]"],
    },
    {
        name: "V3w the steps row in its wrap form, for comparison",
        url: FOLD,
        do: [
            "eval:document.querySelector('[data-testid=fold-easing]').scrollIntoView({block:'center'})",
            easingWrap("[data-testid=fold-easing]"),
            easing("[data-testid=fold-easing]", 200),
            "wait:700",
            easingRead("[data-testid=fold-easing]"),
            easing("[data-testid=fold-easing]", 186),
            "wait:700",
            easingRead("[data-testid=fold-easing]"),
        ],
        sel: ["[data-testid=fold-easing]", "[data-testid=fold-easing] [data-slot=easing-controls]"],
    },
    {
        name: "V2p how a trigger's cut value ends: pictures of the three fields and the 120 px field",
        url: FOLD,
        do: [
            "eval:document.querySelector('[data-testid=fold-lf3]').scrollIntoView({block:'center'})",
            "wait:400",
            "shot:[data-testid=fold-lf3]@v2-lf3.{tree}",
            "shot:[data-testid=fold-lf-kf]@v2-kf.{tree}",
        ],
        sel: ["[data-testid=fold-lf3] [data-slot=select-trigger] > span"],
    },
    {
        name: "V3p how the jump term's cut value ends: pictures of the steps row in a 200 and a 186 px column",
        url: FOLD,
        do: [
            "eval:document.querySelector('[data-testid=fold-easing]').scrollIntoView({block:'center'})",
            easing("[data-testid=fold-easing]", 200),
            "wait:700",
            "shot:[data-testid=fold-easing] [data-slot=easing-controls]@v3-200.{tree}",
            easing("[data-testid=fold-easing]", 186),
            "wait:700",
            "shot:[data-testid=fold-easing] [data-slot=easing-controls]@v3-186.{tree}",
        ],
        sel: ["[data-testid=fold-easing] [data-slot=select-trigger] > span"],
    },
    {
        name: "V3s the steps row's Slider in a 228, 200 and 186 px column, in the shrink form and the wrap form",
        url: FOLD,
        do: [
            "eval:document.querySelector('[data-testid=fold-easing]').scrollIntoView({block:'center'})",
            easing("[data-testid=fold-easing]", 228),
            "wait:700",
            sliderRead("[data-testid=fold-easing]"),
            easing("[data-testid=fold-easing]", 200),
            "wait:700",
            sliderRead("[data-testid=fold-easing]"),
            easing("[data-testid=fold-easing]", 186),
            "wait:700",
            sliderRead("[data-testid=fold-easing]"),
            easingWrap("[data-testid=fold-easing]"),
            "wait:700",
            sliderRead("[data-testid=fold-easing]"),
        ],
        sel: ["[data-testid=fold-easing] [data-slot=slider]"],
    },
    {
        name: "V3wv the wrap form at value.js's width (a 228 px column)",
        url: FOLD,
        do: [
            "eval:document.querySelector('[data-testid=fold-easing]').scrollIntoView({block:'center'})",
            easingWrap("[data-testid=fold-easing]"),
            easing("[data-testid=fold-easing]", 228),
            "wait:700",
            easingRead("[data-testid=fold-easing]"),
            sliderRead("[data-testid=fold-easing]"),
        ],
        sel: ["[data-testid=fold-easing]", "[data-testid=fold-easing] [data-slot=easing-controls]"],
    },
    {
        name: "V4 FadingScroll, card scroll host, vertical Carousel and Deck",
        url: FOLD,
        do: [
            scrollers(["[data-testid=fold-v4]"]),
            ...[
                "[data-testid=v4-fading]",
                "[data-testid=v4-card]",
                "[data-testid=v4-carousel] .carousel-strip",
                "[data-testid=v4-deck] .deck-strip",
                "[data-testid=v4-deck] .deck-slide",
            ].flatMap((s) => [`eval:document.querySelector(${JSON.stringify(s)})?.scrollIntoView({block:'center'})`, "wait:300", spill(s), "wait:200", swipe(s), sl(s)]),
        ],
        sel: ["[data-testid=v4-fading]", "[data-testid=v4-card]", "[data-testid=v4-carousel] .carousel-strip", "[data-testid=v4-deck] .deck-strip", "[data-testid=v4-deck] .deck-slide"],
    },
    {
        name: "V4b Dialog with scroll",
        url: FOLD,
        do: ["tap:[data-testid=fold-open-dialog-scroll]", "wait:1800", scrollers(["[data-testid=v4-dialog]"]), spill("[data-testid=v4-dialog]"), "wait:200", swipe("[data-testid=v4-dialog]"), sl("[data-testid=v4-dialog]")],
        sel: ["[data-testid=v4-dialog]"],
    },
    {
        name: "V4c Sheet with scroll (its region)",
        url: FOLD,
        do: [
            "tap:[data-testid=fold-open-sheet-scroll]",
            "wait:2200",
            scrollers(["[data-testid=v4-sheet]"]),
            spill("[data-testid=v4-sheet] [data-slot=sheet-content-region]"),
            "wait:200",
            swipe("[data-testid=v4-sheet] [data-slot=sheet-content-region]"),
            sl("[data-testid=v4-sheet] [data-slot=sheet-content-region]"),
        ],
        sel: ["[data-testid=v4-sheet] [data-slot=sheet-content-region]"],
    },
    {
        name: "V4d detented Sheet, its body row",
        url: FOLD,
        do: ["tap:[data-testid=fold-open-sheet-body]", "wait:2200", scrollers(["[data-testid=v4-detents]"]), spill("[data-testid=v4-detents-body]"), "wait:200", swipe("[data-testid=v4-detents-body]"), sl("[data-testid=v4-detents-body]")],
        sel: ["[data-testid=v4-detents-body]"],
    },
];

const jobs = [];
for (const c of cases) {
    for (const cell of c.cells || ["390t-light", "1440-light"]) {
        for (const [port, tree] of BUILDS) jobs.push({ name: c.name, tree, port: +port, cell, url: c.url, do: c.do.map((a) => a.replaceAll("{tree}", tree)), sel: c.sel });
    }
}
process.stdout.write(JSON.stringify(jobs, null, 1));
