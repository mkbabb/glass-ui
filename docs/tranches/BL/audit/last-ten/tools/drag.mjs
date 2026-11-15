// drag.mjs <tree> <engine> <cellset>
// Brief item 4, the drag half: the Slider and SegmentedTabs dragged out of bounds and
// released outside, and (touch) a pointercancel mid-drag; and input response, pointerdown
// to the first changed frame, for the controls a finger meets first.
// cellsets: fine (1440 mouse), touch390, t4x390 (touch at a 4x CPU throttle; Chromium).
import { withBrowser, cell, gotoComp, rec, mark, stop, settle, series, frameStats, box, touch, sleep, save, mouseDrag } from "./lib.mjs";

const [tree = "11.1.0", engine = "chromium", cellset = "fine"] = process.argv.slice(2);
const CELLS = { fine: { w: 1440, h: 900 }, touch390: { w: 390, h: 844, touch: true }, t4x390: { w: 390, h: 844, touch: true, throttle: 4 } };
const C = CELLS[cellset];
const out = { tree, engine, cellset, results: {} };

// press, path of points (absolute), release|cancel; 60 Hz, mouse or touch
async function gesture(P, pts, { hz = 60, end = "up", holdMs = 80 } = {}) {
    const isTouch = !!P.c.touch;
    const down = async (x, y) => (isTouch ? (P.cdp ? touch(P, "touchStart", x, y) : null) : (await P.page.mouse.move(x, y), P.page.mouse.down()));
    const move = async (x, y) => (isTouch ? touch(P, "touchMove", x, y) : P.page.mouse.move(x, y));
    await down(pts[0][0], pts[0][1]);
    await sleep(holdMs);
    const t0 = Date.now();
    let k = 0;
    for (let s = 1; s < pts.length; s++) {
        const [ax, ay] = pts[s - 1],
            [bx, by, ms = 300] = pts[s];
        const n = Math.max(1, Math.round((ms / 1000) * hz));
        for (let j = 1; j <= n; j++) {
            k++;
            await move(ax + ((bx - ax) * j) / n, ay + ((by - ay) * j) / n);
            const w = t0 + (k * 1000) / hz - Date.now();
            if (w > 0) await sleep(w);
        }
    }
    await mark(P, end === "cancel" ? "cancel" : "up");
    if (isTouch) await touch(P, end === "cancel" ? "touchCancel" : "touchEnd", 0, 0);
    else await P.page.mouse.up();
}

async function prep(P, page, ready) {
    await gotoComp(P, tree, page);
    await P.page.waitForSelector(ready, { timeout: 10000 });
    await sleep(300);
    if (C.throttle) await P.throttle(C.throttle);
}

function summarizeDrag(res, as, ch = "cx") {
    const s = series(res, as, ch);
    const ku = s.findIndex((x) => x.marks.includes("up") || x.marks.includes("cancel"));
    const pre = s.slice(0, ku),
        post = s.slice(ku);
    const steps = post.slice(1).map((x, i) => +(x.v - post[i].v).toFixed(2));
    const maxStep = steps.reduce((m, x) => (Math.abs(x) > Math.abs(m) ? x : m), 0);
    return { atRelease: +s[ku]?.v?.toFixed(2), end: +s[s.length - 1].v.toFixed(2), maxPostStep: maxStep, postSteps: steps.filter((x) => x !== 0).slice(0, 30), preRange: [Math.min(...pre.map((x) => x.v)), Math.max(...pre.map((x) => x.v))].map((x) => +x.toFixed(2)) };
}

await withBrowser(engine, async (b) => {
    // 1. Slider out of bounds: from the thumb, past the track's end by 200 px, up off the track
    //    by 120 px, back across the end to the middle, release there.
    await cell(b, engine, C, async (P) => {
        await prep(P, "slider", "[data-testid=slider-md] .slider-thumb");
        const tr = await box(P, "[data-testid=slider-md] .slider-track");
        const th = await box(P, "[data-testid=slider-md] .slider-thumb");
        await rec(P, [
            { as: "thumb", sel: "[data-testid=slider-md] .slider-thumb" },
            { as: "range", sel: "[data-testid=slider-md] .slider-range" },
            { as: "root", sel: "[data-testid=slider-md] .glass-slider", attrs: ["data-held"] },
        ]);
        await sleep(100);
        const y = th.cy;
        await gesture(P, [
            [th.cx, y],
            [tr.x + tr.w + 200, y, 500],
            [tr.x + tr.w + 200, y - 120, 200],
            [tr.x + tr.w * 0.5, y - 120, 500],
            [tr.x + tr.w * 0.5, y, 150],
        ]);
        await settle(P, 400, 3000, false);
        const res = await stop(P);
        const s = series(res, "thumb", "cx");
        // tracking: thumb vs pointer while inside the track's x range
        const lag = [];
        const trackEnd = tr.x + tr.w;
        let maxThumb = -Infinity,
            againstPtr = 0;
        for (let k = 1; k < res.rows.length; k++) {
            const r = res.rows[k];
            if (!r.ptr || !r.ptr.b) continue;
            const v = s[k].v;
            maxThumb = Math.max(maxThumb, v);
            if (r.ptr.x > tr.x + 10 && r.ptr.x < trackEnd - 10) lag.push(Math.abs(v - r.ptr.x));
            const dp = r.ptr.x - (res.rows[k - 1].ptr?.x ?? r.ptr.x),
                dv = v - s[k - 1].v;
            if (Math.abs(dv) > 0.5 && Math.sign(dv) !== Math.sign(dp) && dp !== 0) againstPtr++;
        }
        lag.sort((a, b) => a - b);
        const held = res.rows.map((r) => r.el.root && r.el.root["a:data-held"]);
        out.results.sliderOOB = {
            track: [tr.x, trackEnd].map((x) => +x.toFixed(1)),
            maxThumbCx: +maxThumb.toFixed(1),
            thumbOvershootPastEnd: +(maxThumb - trackEnd).toFixed(1),
            lagMedian: lag.length ? +lag[Math.floor(lag.length / 2)].toFixed(1) : null,
            lagMax: lag.length ? +lag[lag.length - 1].toFixed(1) : null,
            framesAgainstPointer: againstPtr,
            heldAtEnd: held[held.length - 1],
            release: summarizeDrag(res, "thumb"),
            stats: frameStats(res),
        };
        save(`logs/drag/slider-oob.${tree}.${engine}.${cellset}.json`, res.rows.map((r) => [r.i, +r.t.toFixed(1), r.ptr && r.ptr.x, r.ptr && r.ptr.b, r.el.thumb && +(r.el.thumb.x + r.el.thumb.w / 2).toFixed(2), r.el.root && r.el.root["a:data-held"], r.marks]));
    });

    // 2. Slider pointercancel mid-drag (touch only)
    if (C.touch && engine === "chromium")
        await cell(b, engine, C, async (P) => {
            await prep(P, "slider", "[data-testid=slider-md] .slider-thumb");
            const th = await box(P, "[data-testid=slider-md] .slider-thumb");
            const v0 = await P.page.textContent("[data-testid=slider-md-value]");
            await rec(P, [
                { as: "thumb", sel: "[data-testid=slider-md] .slider-thumb" },
                { as: "root", sel: "[data-testid=slider-md] .glass-slider", attrs: ["data-held"] },
                { as: "loupe", sel: ".glass-loupe", attrs: ["data-engaged"] },
                { as: "veil", sel: ".glass-focus-veil" },
            ]);
            await gesture(P, [[th.cx, th.cy], [th.cx - 120, th.cy, 300]], { end: "cancel" });
            await sleep(900);
            const res = await stop(P);
            const last = res.rows[res.rows.length - 1].el;
            out.results.sliderCancel = {
                valueBefore: v0,
                valueAfter: await P.page.textContent("[data-testid=slider-md-value]"),
                heldAfter: last.root && last.root["a:data-held"],
                loupeAfter: last.loupe ? { op: last.loupe.op, engaged: last.loupe["a:data-engaged"] } : null,
                veilAfter: last.veil ? last.veil.op : null,
                release: summarizeDrag(res, "thumb"),
            };
        });

    // 3. Tabs dragged past the strip's end and released outside it
    await cell(b, engine, C, async (P) => {
        await prep(P, "tabs", "[data-testid=tabs-pill] .segmented-indicator");
        const strip = await box(P, "[data-testid=tabs-pill] .segmented-tabs");
        const ind = await box(P, "[data-testid=tabs-pill] .segmented-indicator");
        await rec(P, [
            { as: "ind", sel: "[data-testid=tabs-pill] .segmented-indicator", attrs: ["class"] },
            { as: "val", sel: "[data-testid=tabs-pill-value]" },
        ]);
        await sleep(100);
        await gesture(P, [[ind.cx, ind.cy], [strip.x + strip.w + 150, ind.cy, 500], [strip.x + strip.w + 150, ind.cy + 90, 150]]);
        await settle(P, 500, 3000, true);
        const res = await stop(P);
        const s = series(res, "ind", "cx");
        out.results.tabsOOB = {
            strip: [strip.x, strip.x + strip.w].map((x) => +x.toFixed(1)),
            maxCx: +Math.max(...s.map((x) => x.v)).toFixed(1),
            indRightMax: +Math.max(...res.rows.map((r) => r.el.ind.x + r.el.ind.w)).toFixed(1),
            value: await P.page.textContent("[data-testid=tabs-pill-value]"),
            liftAfter: /glass-drag-lift/.test(res.rows[res.rows.length - 1].el.ind["a:class"] || ""),
            release: summarizeDrag(res, "ind"),
            stats: frameStats(res),
        };
        save(`logs/drag/tabs-oob.${tree}.${engine}.${cellset}.json`, s.map((x, k) => [x.i, +x.t.toFixed(1), +x.v.toFixed(2), res.rows[k].ptr && res.rows[k].ptr.x, x.marks]));
    });

    // 4. Tabs pointercancel mid-drag (touch only)
    if (C.touch && engine === "chromium")
        await cell(b, engine, C, async (P) => {
            await prep(P, "tabs", "[data-testid=tabs-pill] .segmented-indicator");
            const ind = await box(P, "[data-testid=tabs-pill] .segmented-indicator");
            const v0 = await P.page.textContent("[data-testid=tabs-pill-value]");
            await rec(P, [{ as: "ind", sel: "[data-testid=tabs-pill] .segmented-indicator", attrs: ["class"] }]);
            await gesture(P, [[ind.cx, ind.cy], [ind.cx + 70, ind.cy, 250]], { end: "cancel" });
            await sleep(1000);
            const res = await stop(P);
            const last = res.rows[res.rows.length - 1].el.ind;
            out.results.tabsCancel = {
                valueBefore: v0,
                valueAfter: await P.page.textContent("[data-testid=tabs-pill-value]"),
                startCx: +(ind.cx).toFixed(1),
                endCx: +(last.x + last.w / 2).toFixed(1),
                liftAfter: /glass-drag-lift/.test(last["a:class"] || ""),
                release: summarizeDrag(res, "ind"),
            };
        });

    // 5. Input response: pointerdown to the first changed frame
    const LAT = [
        { name: "button", page: "button", sel: "[data-testid=button-0]", track: [{ as: "t", sel: "[data-testid=button-0]", styles: ["scale"] }] },
        { name: "switch", page: "checkbox", sel: "[data-slot=switch][aria-label='Airplane mode']", track: [{ as: "t", sel: "[data-slot=switch][aria-label='Airplane mode'] .switch__thumb" }, { as: "f", sel: "[data-slot=switch][aria-label='Airplane mode'] .control-bit__face" }] },
        { name: "checkbox", page: "checkbox", sel: "[data-testid=checkbox-0]", track: [{ as: "t", sel: "[data-testid=checkbox-0]" }, { as: "i", sel: "[data-testid=checkbox-0] svg" }] },
        { name: "tabs", page: "tabs", sel: "[data-testid=tabs-pill] .segmented-tab:nth-of-type(3)", track: [{ as: "t", sel: "[data-testid=tabs-pill] .segmented-indicator" }] },
        { name: "slider-track-press", page: "slider", sel: "[data-testid=slider-md] .slider-track", at: [0.8, 0.5], track: [{ as: "t", sel: "[data-testid=slider-md] .slider-thumb" }] },
        { name: "select-open", page: "select", sel: "[data-testid=select-0]", track: [{ as: "t", sel: "[data-reveal=menu]" }, { as: "tr", sel: "[data-testid=select-0]" }] },
        { name: "menu-open", page: "menu", sel: "[data-testid=menu-0]", track: [{ as: "t", sel: "[data-reveal=menu]" }, { as: "tr", sel: "[data-testid=menu-0]" }] },
        { name: "dialog-open", page: "dialog", sel: "[data-testid=dialog-0]", track: [{ as: "t", sel: "[data-slot=dialog-content]" }, { as: "tr", sel: "[data-testid=dialog-0]" }] },
        { name: "accordion", page: "accordion", sel: "[data-testid=accordion-0] > .disclosure-item:nth-of-type(2) .disclosure-trigger", track: [{ as: "t", sel: "[data-testid=accordion-0] > .disclosure-item:nth-of-type(2) > .disclosure-content" }, { as: "i", sel: "[data-testid=accordion-0] > .disclosure-item:nth-of-type(2) .disclosure-icon" }] },
        { name: "dock-seat", page: "dock", sel: "[data-testid=dock-transport] [data-glass-dock-seat]", track: [{ as: "t", sel: "[data-testid=dock-transport] [data-glass-dock-seat]" }] },
    ];
    out.results.latency = [];
    for (const L of LAT) {
        await cell(b, engine, C, async (P) => {
            try {
                await prep(P, L.page, L.sel);
                const bx = await box(P, L.sel);
                const x = bx.x + bx.w * (L.at ? L.at[0] : 0.5),
                    y = bx.y + bx.h * (L.at ? L.at[1] : 0.5);
                if (!C.touch) await P.page.mouse.move(x, y);
                await sleep(400); // hover settles
                await rec(P, L.track);
                await sleep(150);
                if (C.touch) {
                    if (P.cdp) await touch(P, "touchStart", x, y);
                    else await P.page.touchscreen.tap(x, y);
                } else await P.page.mouse.down();
                await sleep(120);
                if (C.touch) {
                    if (P.cdp) await touch(P, "touchEnd", 0, 0);
                } else await P.page.mouse.up();
                await sleep(700);
                const res = await stop(P);
                const pd = res.ptrLog.find((p) => p.type === "pointerdown");
                const pu = res.ptrLog.find((p) => p.type === "pointerup");
                const rowsAfter = (t) => res.rows.filter((r) => r.t >= t);
                const firstChange = (t) => {
                    const rs = res.rows;
                    let base = null;
                    for (let k = 0; k < rs.length; k++) {
                        if (rs[k].t < t) {
                            base = JSON.stringify(rs[k].el);
                            continue;
                        }
                        if (JSON.stringify(rs[k].el) !== base) return { ms: +(rs[k].t - t).toFixed(1), frames: rowsAfter(t).indexOf(rs[k]) };
                    }
                    return null;
                };
                out.results.latency.push({ name: L.name, fromDown: pd ? firstChange(pd.t) : "no pointerdown", fromUp: pu ? firstChange(pu.t) : null, frameMedian: frameStats(res).medianMs });
            } catch (e) {
                out.results.latency.push({ name: L.name, error: String(e.message).slice(0, 200) });
            }
        });
    }
});
save(`logs/drag/${tree}.${engine}.${cellset}.json`, out);
console.log(JSON.stringify(out.results, null, 0).slice(0, 4000));
