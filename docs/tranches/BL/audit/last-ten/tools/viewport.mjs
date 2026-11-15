// viewport.mjs <tree> <engine> [vp ...]
// Brief item 3: phone and tablet viewports beyond 390, with touch. For each page (and its
// opener, if any) at rest and open: horizontal page overflow, the open surface's box against
// the viewport (a 8 px gutter), whether a surface taller than the viewport scrolls, the form
// a Select takes, tap targets under 44 px on a coarse pointer, and text inputs under 16 px
// (iOS zooms the page on focus). Writes logs/viewport/<tree>.<engine>.json.
import { withBrowser, cell, gotoComp, save, sleep } from "./lib.mjs";
import { act } from "./act.mjs";

const [tree = "11.1.0", engine = "chromium", ...vps] = process.argv.slice(2);
const VPS = { "360x780": [360, 780], "390x844": [390, 844], "430x932": [430, 932], "844x390": [844, 390], "820x1180": [820, 1180] };
const list = vps.length ? vps : ["360x780", "430x932", "844x390", "820x1180"];
const PAGES = [
    { page: "select", open: { tap: "[data-testid=select-0]" }, surface: "[data-reveal=menu]" },
    { page: "menu", open: { tap: "[data-testid=menu-0]" }, surface: "[data-reveal=menu]" },
    { page: "popover", open: { tap: "[data-testid=popover-0]" }, surface: "[data-slot=popover-content]" },
    { page: "dialog", open: { tap: "[data-testid=dialog-0]" }, surface: "[data-slot=dialog-content]" },
    { page: "sheet", key: "sheet-side", open: { tap: "[data-testid=sheet-1]" }, surface: "[data-slot=sheet-content]" },
    { page: "sheet", key: "sheet-detents", open: { tap: "[data-testid=sheet-4]" }, surface: "[data-slot=sheet-content][data-detents]" },
    { page: "command", key: "command", surface: "[data-slot=command]" },
    { page: "toaster", open: [{ tap: "[data-testid=toaster-0]" }, { wait: 150 }, { tap: "[data-testid=toaster-1]" }], surface: "ol, [data-slot=toaster]" },
    { page: "dock", surface: "[data-testid=dock-transport]" },
    { page: "dock-full", surface: "[data-testid=df-run]" },
    { page: "tabs", surface: "[data-testid=tabs-pill] .segmented-tabs" },
    { page: "data-table", surface: "[data-testid=data-table-0]" },
    { page: "carousel", surface: "[data-testid=carousel-0]" },
    { page: "input" },
    { page: "textarea" },
    { page: "number-field" },
    { page: "labeled-field" },
    { page: "slider", surface: "[data-testid=slider-md]" },
    { page: "card" },
    { page: "deck", surface: "[data-testid=deck-0]" },
];
const out = { tree, engine, results: [] };

await withBrowser(engine, async (b) => {
    for (const vp of list) {
        const [w, h] = VPS[vp];
        for (const pg of PAGES) {
            const r = { vp, page: pg.key || pg.page };
            await cell(b, engine, { w, h, touch: true }, async (P) => {
                try {
                    await gotoComp(P, tree, pg.page);
                    const read = (surface) =>
                        P.page.evaluate(
                            ([surface, vw, vh]) => {
                                const de = document.documentElement;
                                const o = { hOverflow: Math.max(de.scrollWidth, document.body.scrollWidth) - de.clientWidth };
                                if (o.hOverflow > 0) {
                                    // the elements whose box passes the viewport's inline end and that no clipping ancestor holds
                                    const c = [];
                                    for (const n of document.querySelectorAll("body *")) {
                                        const bx = n.getBoundingClientRect();
                                        if (bx.width < 1 || bx.right <= vw + 0.5) continue;
                                        let a = n.parentElement, clipped = false;
                                        while (a && a !== document.body) {
                                            const cs = getComputedStyle(a);
                                            if (cs.overflowX !== "visible" && a.getBoundingClientRect().right <= vw + 0.5) { clipped = true; break; }
                                            a = a.parentElement;
                                        }
                                        if (clipped) continue;
                                        if ([...n.children].some((k) => k.getBoundingClientRect().right > vw + 0.5)) continue; // keep the deepest
                                        c.push((n.getAttribute("data-slot") || n.tagName.toLowerCase()) + "." + String(n.className).split(" ").slice(0, 3).join(".") + " r=" + Math.round(bx.right));
                                    }
                                    o.overflowBy = c.slice(0, 5);
                                }
                                if (surface) {
                                    const els = [...document.querySelectorAll(surface)].filter((e) => e.getBoundingClientRect().width > 0);
                                    const e = els[els.length - 1];
                                    if (e) {
                                        const bx = e.getBoundingClientRect();
                                        o.box = [bx.x, bx.y, bx.width, bx.height].map((v) => +v.toFixed(1));
                                        o.gutter = { l: +bx.x.toFixed(1), t: +bx.y.toFixed(1), r: +(vw - bx.right).toFixed(1), b: +(vh - bx.bottom).toFixed(1) };
                                        // does anything inside scroll, if the surface is clipped by the viewport?
                                        let scrolls = false;
                                        for (const n of [e, ...e.querySelectorAll("*")]) {
                                            const cs = getComputedStyle(n);
                                            if (/(auto|scroll)/.test(cs.overflowY) && n.scrollHeight > n.clientHeight + 1) scrolls = true;
                                        }
                                        o.innerScrolls = scrolls;
                                        o.contentOverflowsBox = e.scrollWidth > e.clientWidth + 1;
                                    } else o.box = null;
                                }
                                // tap targets (visible, interactive) under 44 px in either axis
                                const small = [];
                                for (const n of document.querySelectorAll("button, a[href], [role=button], [role=tab], [role=option], [role=menuitem], [role=switch], [role=checkbox], [role=radio], [role=slider], input, select, textarea")) {
                                    const bx = n.getBoundingClientRect();
                                    if (bx.width < 1 || bx.height < 1) continue;
                                    if (bx.bottom < 0 || bx.top > vh * 3) continue;
                                    if (bx.width < 44 || bx.height < 44) small.push((n.getAttribute("data-slot") || n.getAttribute("role") || n.tagName.toLowerCase()) + ":" + Math.round(bx.width) + "x" + Math.round(bx.height));
                                }
                                o.smallTargets = small.length;
                                o.smallTargetKinds = [...new Set(small.map((s) => s.split(":")[0]))].slice(0, 8);
                                o.smallExamples = small.slice(0, 6);
                                const inputs = [];
                                for (const n of document.querySelectorAll("input:not([type=checkbox]):not([type=radio]):not([type=range]), textarea, select, [contenteditable=true]")) {
                                    const bx = n.getBoundingClientRect();
                                    if (bx.width < 1) continue;
                                    const fs = parseFloat(getComputedStyle(n).fontSize);
                                    if (fs < 16) inputs.push((n.getAttribute("data-slot") || n.tagName.toLowerCase()) + ":" + fs + "px");
                                }
                                o.inputsUnder16 = inputs;
                                return o;
                            },
                            [surface, w, h],
                        );
                    r.rest = await read(pg.open ? null : pg.surface);
                    if (pg.open) {
                        await act(P, pg.open);
                        await sleep(1100);
                        r.open = await read(pg.surface);
                        if (pg.page === "select") r.open.form = await P.page.evaluate(() => { const e = document.querySelector("[data-reveal=menu]"); return e ? (e.closest("[data-sheet],[data-form]") ? "sheet" : getComputedStyle(e).position) + " side=" + e.getAttribute("data-side") + " form=" + (e.getAttribute("data-form") || e.parentElement.getAttribute("data-form") || "") : null; });
                    }
                    r.errors = P.errors.slice(0, 3);
                } catch (e) {
                    r.error = String(e.message).slice(0, 200);
                }
            });
            out.results.push(r);
            console.log(JSON.stringify(r).slice(0, 600));
        }
    }
});
save(`logs/viewport/${tree}.${engine}.json`, out);
