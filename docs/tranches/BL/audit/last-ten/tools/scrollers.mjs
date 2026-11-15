// scrollers.mjs <tree> <page...>: lists every scroll container (overflow auto/scroll with
// content past its box), every sticky element and every element with overscroll-behavior
// set, on each page at rest and after an optional opener. For picking selectors.
import { withBrowser, cell, gotoComp, save, sleep } from "./lib.mjs";
import { act } from "./act.mjs";
const [tree, ...pages] = process.argv.slice(2);
const OPEN = {
    select: { click: "[data-testid=select-0]" },
    command: null,
    sheet: { click: "[data-testid=sheet-1]" },
    "sheet-detents": { click: "[data-testid=sheet-4]" },
};
const out = {};
await withBrowser("chromium", async (b) => {
    for (const pg of pages) {
        const [name, opener] = pg.split(":");
        await cell(b, "chromium", { w: 390, h: 844, touch: true }, async (P) => {
            await gotoComp(P, tree, name);
            if (opener && OPEN[opener]) {
                await act(P, OPEN[opener]);
                await sleep(900);
            }
            out[pg] = await P.page.evaluate(() => {
                const d = (e) => {
                    const id = e.getAttribute("data-testid") || e.getAttribute("data-slot") || "";
                    const cls = typeof e.className === "string" ? e.className.trim().split(/\s+/).slice(0, 4).join(".") : "";
                    return e.tagName.toLowerCase() + (id ? `[${id}]` : "") + (cls ? "." + cls : "");
                };
                const res = { scrollers: [], sticky: [], osb: [], doc: { sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, sh: document.documentElement.scrollHeight, ch: document.documentElement.clientHeight } };
                for (const e of document.querySelectorAll("*")) {
                    const cs = getComputedStyle(e);
                    const oy = cs.overflowY,
                        ox = cs.overflowX;
                    if ((/(auto|scroll)/.test(oy) && e.scrollHeight > e.clientHeight + 1) || (/(auto|scroll)/.test(ox) && e.scrollWidth > e.clientWidth + 1))
                        res.scrollers.push({ el: d(e), path: d(e.parentElement || e), oy, ox, sh: e.scrollHeight, ch: e.clientHeight, sw: e.scrollWidth, cw: e.clientWidth, osb: cs.overscrollBehaviorY + "/" + cs.overscrollBehaviorX, snap: cs.scrollSnapType, sb: cs.scrollBehavior });
                    if (cs.position === "sticky") res.sticky.push({ el: d(e), top: cs.top });
                    if (cs.overscrollBehaviorY !== "auto" || cs.overscrollBehaviorX !== "auto") res.osb.push({ el: d(e), v: cs.overscrollBehaviorY + "/" + cs.overscrollBehaviorX });
                }
                res.osb = res.osb.slice(0, 20);
                return res;
            });
        });
    }
});
save(`logs/scrollers-${tree}.json`, out);
for (const [k, v] of Object.entries(out)) {
    console.log("==", k, JSON.stringify(v.doc));
    for (const s of v.scrollers) console.log("  S", JSON.stringify(s));
    for (const s of v.sticky) console.log("  T", JSON.stringify(s));
    for (const s of v.osb) console.log("  O", JSON.stringify(s));
}
