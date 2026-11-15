// dockdebug.mjs <tree>: what collapses the dock and what switches a layer on this tree.
import { withBrowser, cell, gotoComp, sleep, box } from "./lib.mjs";
const tree = process.argv[2] || "11.1.0";
const st = (P, sel) => P.page.evaluate((s) => { const d = document.querySelector(s); if (!d) return null; const p = d.querySelector(".dock-plate"); return { cls: d.className.split(" ").filter((c) => /expand|collaps|hover/.test(c)).join(" "), w: p && Math.round(p.getBoundingClientRect().width), active: document.activeElement && (document.activeElement.getAttribute("aria-label") || document.activeElement.tagName) }; }, sel);
await withBrowser("chromium", async (b) => {
    await cell(b, "chromium", { w: 1440, h: 900 }, async (P) => {
        await gotoComp(P, tree, "dock");
        const D = "[data-testid=dock-h-closed]";
        const bx = await box(P, D);
        console.log("box", bx, await st(P, D));
        await P.page.mouse.move(bx.cx, bx.cy, { steps: 3 });
        await sleep(700);
        console.log("hovered", await st(P, D));
        await P.page.mouse.move(4, 4, { steps: 3 });
        await sleep(600);
        console.log("left 0.6s", await st(P, D));
        await sleep(3600);
        console.log("left 4.2s", await st(P, D));
        await P.page.evaluate((s) => document.querySelector(s + " .dock-layer--full [data-glass-dock-seat]")?.focus(), D);
        await sleep(600);
        console.log("focus run seat", await st(P, D));
        await P.page.keyboard.press("Escape");
        await sleep(700);
        console.log("escape", await st(P, D));
        const seats = await P.page.evaluate((s) => [...document.querySelectorAll(s + " [data-glass-dock-seat]")].map((e) => e.getAttribute("aria-label") + "@" + (e.closest(".dock-persistent") ? "persistent" : e.closest(".dock-layer--full") ? "full" : "other")), D);
        console.log("seats", seats);
    });
    await cell(b, "chromium", { w: 1440, h: 900 }, async (P) => {
        await gotoComp(P, tree, "dock-full");
        const D = "[data-testid=df-layers]";
        const bx = await box(P, D);
        await P.page.mouse.move(bx.cx, bx.cy, { steps: 3 });
        await sleep(800);
        const info = await P.page.evaluate((s) => { const d = document.querySelector(s); return { tabs: [...d.querySelectorAll(".dock-layer-tab")].map((t) => { const r = t.getBoundingClientRect(); return [t.getAttribute("aria-label"), Math.round(r.x), Math.round(r.width), t.getAttribute("aria-selected")]; }), ind: [...d.querySelectorAll(".dock-layer-tab-indicator")].map((i) => { const r = i.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.width), getComputedStyle(i).opacity]; }), cls: d.className }; }, D);
        console.log("layers", JSON.stringify(info));
        const t3 = await P.page.evaluate((s) => { const t = document.querySelectorAll(s + " .dock-layer-tab")[2]; const r = t.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; }, D);
        await P.page.mouse.click(t3[0], t3[1]);
        await sleep(800);
        const info2 = await P.page.evaluate((s) => { const d = document.querySelector(s); return { tabs: [...d.querySelectorAll(".dock-layer-tab")].map((t) => t.getAttribute("aria-selected")), ind: [...d.querySelectorAll(".dock-layer-tab-indicator")].map((i) => { const r = i.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.width), getComputedStyle(i).opacity, getComputedStyle(i).translate]; }) }; }, D);
        console.log("after tab3 click", JSON.stringify(info2));
    });
});
