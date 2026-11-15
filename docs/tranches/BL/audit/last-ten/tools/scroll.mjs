// scroll.mjs <tree> <engine> <cellset>
// Brief item 4, the scroll half. A tall spacer makes each page scroll; then:
//  A. body scroll lock: scroll the page, open a modal surface, try to scroll the page under
//     it (wheel or touch gesture), close, read the position kept and the page scrolling again,
//     and the layout's width across open and close (a shift when the bar hides).
//  B. inner scrollers: scroll each to its end and on past it; did the page move (chaining)?
//     the computed overscroll-behavior; frame budget while scrolling.
//  C. the scroll-progress rim against its scroller, frame by frame.
// Chromium gestures are CDP Input.synthesizeScrollGesture (touch source on touch cells,
// a real compositor scroll with fling); WebKit uses mouse.wheel (fine) or touchscreen-free
// wheel on touch cells (WebKit has no synthetic touch scroll in Playwright).
import { withBrowser, cell, gotoComp, save, sleep, box, frameStats } from "./lib.mjs";
import { act } from "./act.mjs";

const [tree = "11.1.0", engine = "chromium", cellset = "touch390"] = process.argv.slice(2);
const CELLS = { fine: { w: 1440, h: 900 }, touch390: { w: 390, h: 844, touch: true }, t4x390: { w: 390, h: 844, touch: true, throttle: 4 } };
const C = CELLS[cellset];
const out = { tree, engine, cellset, lock: [], inner: [], rim: null };

async function spacer(P) {
    await P.page.evaluate(() => {
        const d = document.createElement("div");
        d.id = "lt-spacer";
        d.style.cssText = "height:2400px;width:1px;pointer-events:none";
        document.body.appendChild(d);
        const t = document.createElement("div");
        t.id = "lt-top";
        t.style.cssText = "height:600px;width:1px;pointer-events:none";
        document.body.prepend(t);
    });
}
const scrollY = (P) => P.page.evaluate(() => Math.round(window.scrollY));
async function gesture(P, x, y, dy, { fling = false, speed = 1200 } = {}) {
    if (P.cdp) {
        await P.cdp.send("Input.synthesizeScrollGesture", {
            x: Math.round(x),
            y: Math.round(y),
            yDistance: -dy,
            speed,
            gestureSourceType: C.touch ? "touch" : "mouse",
            preventFling: !fling,
            repeatCount: 1,
        });
    } else {
        await P.page.mouse.move(x, y);
        const n = Math.ceil(Math.abs(dy) / 100);
        for (let k = 0; k < n; k++) {
            await P.page.mouse.wheel(0, Math.sign(dy) * 100);
            await sleep(16);
        }
    }
    await sleep(fling ? 1200 : 300);
}

const LOCKS = [
    { name: "dialog", page: "dialog", open: { click: "[data-testid=dialog-0]" }, close: { key: "Escape" } },
    { name: "sheet-side", page: "sheet", open: { click: "[data-testid=sheet-1]" }, close: { key: "Escape" } },
    { name: "sheet-detents", page: "sheet", open: { click: "[data-testid=sheet-4]" }, close: { key: "Escape" } },
    { name: "select", page: "select", open: { click: "[data-testid=select-0]" }, close: { key: "Escape" } },
    { name: "menu", page: "menu", open: { click: "[data-testid=menu-0]" }, close: { key: "Escape" } },
    { name: "popover", page: "popover", open: { click: "[data-testid=popover-0]" }, close: { key: "Escape" } },
];

await withBrowser(engine, async (b) => {
    for (const L of LOCKS) {
        await cell(b, engine, C, async (P) => {
            const r = { name: L.name };
            try {
                await gotoComp(P, tree, L.page);
                await spacer(P);
                await P.page.evaluate(() => window.scrollTo(0, 400));
                await sleep(300);
                // the trigger must be in view after the scroll; bring it there without moving the page much
                const trig = L.open.click;
                await P.page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: "center" }), trig);
                await sleep(300);
                const y0 = await scrollY(P);
                const w0 = await P.page.evaluate(() => [document.documentElement.clientWidth, document.body.getBoundingClientRect().width]);
                if (C.throttle) await P.throttle(C.throttle);
                await act(P, L.open);
                await sleep(900);
                r.rootOverflow = await P.page.evaluate(() => [document.documentElement.style.overflow, getComputedStyle(document.documentElement).overflow, getComputedStyle(document.body).overflow]);
                const w1 = await P.page.evaluate(() => [document.documentElement.clientWidth, document.body.getBoundingClientRect().width]);
                // try to scroll the page at a point away from the surface's centre (the scrim or the page)
                await gesture(P, 12, C.h - 40, 300);
                const y1 = await scrollY(P);
                // and on the surface itself
                const sb = await P.page.evaluate(() => { const e = document.querySelector("[data-slot=dialog-content],[data-slot=sheet-content],[data-reveal=menu],[data-slot=popover-content]"); if (!e) return null; const r = e.getBoundingClientRect(); return [r.x + r.width / 2, r.y + Math.min(r.height - 10, r.height / 2)]; });
                let y1b = null;
                if (sb) {
                    await gesture(P, sb[0], sb[1], 300);
                    y1b = await scrollY(P);
                }
                const stillOpen = await P.page.evaluate(() => !!document.querySelector("[data-slot=dialog-content],[data-slot=sheet-content],[data-reveal=menu],[data-slot=popover-content]"));
                await act(P, L.close);
                await sleep(900);
                const y2 = await scrollY(P);
                const w2 = await P.page.evaluate(() => [document.documentElement.clientWidth, document.body.getBoundingClientRect().width]);
                await gesture(P, C.w / 2, C.h / 2, 200);
                const y3 = await scrollY(P);
                Object.assign(r, { y0, pageScrolledUnderScrim: y1 - y0, pageScrolledViaSurface: y1b == null ? null : y1b - y1, stillOpenAfterGestures: stillOpen, yAfterClose: y2, keptPosition: y2 === y0 || y2 === y1b || y2 === y1, scrollsAfterClose: y3 !== y2, width: { before: w0, open: w1, after: w2 } });
                r.rootOverflowAfter = await P.page.evaluate(() => document.documentElement.style.overflow);
            } catch (e) {
                r.error = String(e.message).slice(0, 200);
            }
            out.lock.push(r);
            console.log(JSON.stringify(r));
        });
    }

    // B. inner scrollers. root = the component's root; the scroller is found inside it
    const INNER = [
        { name: "fading-scroll", page: "fading-scroll", root: "main", sticky: ".scroll-progress" },
        { name: "data-table", page: "data-table", root: "main" },
        { name: "infinite-scroll", page: "infinite-scroll", root: "main" },
        { name: "command", page: "command", root: "[data-testid=command-0]" },
        { name: "select-list", page: "select", root: "[data-reveal=menu]", open: { click: "[data-testid=select-0]" } },
        { name: "sheet-body", page: "sheet", root: "[data-slot=sheet-content]", open: { click: "[data-testid=sheet-1]" } },
        { name: "dialog-body", page: "dialog", root: "[data-slot=dialog-content]", open: { click: "[data-testid=dialog-0]" } },
    ];
    for (const I of INNER) {
        await cell(b, engine, C, async (P) => {
            const r = { name: I.name };
            try {
                await gotoComp(P, tree, I.page);
                if (!I.open) await spacer(P);
                if (I.open) {
                    await act(P, I.open);
                    await sleep(1000);
                } else {
                    await P.page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: "center" }), I.root);
                    await sleep(300);
                }
                const found = await P.page.evaluate((root) => {
                    const R = document.querySelector(root);
                    if (!R) return { err: "no root" };
                    const cands = [R, ...R.querySelectorAll("*")].filter((e) => { const cs = getComputedStyle(e); return /(auto|scroll)/.test(cs.overflowY) && e.scrollHeight > e.clientHeight + 4 && e !== document.body; });
                    const e = cands.sort((a, b) => b.clientHeight - a.clientHeight)[0];
                    if (!e) return { err: "no scroller", rootH: R.getBoundingClientRect().height };
                    e.setAttribute("data-lt-scroller", "");
                    const cs = getComputedStyle(e);
                    const b = e.getBoundingClientRect();
                    return { el: e.tagName.toLowerCase() + "." + String(e.className).split(" ").slice(0, 3).join("."), osb: cs.overscrollBehaviorY, sh: e.scrollHeight, ch: e.clientHeight, box: [b.x, b.y, b.width, b.height].map(Math.round) };
                }, I.root);
                r.scroller = found;
                if (found.err) throw new Error(found.err);
                if (C.throttle) await P.throttle(C.throttle);
                if (I.sticky) await P.page.evaluate((s) => document.querySelector(s)?.setAttribute("data-lt-sticky", ""), I.sticky);
                const bx = await box(P, "[data-lt-scroller]");
                const yPage0 = await scrollY(P);
                // record frames while scrolling to the end and past it
                await P.page.evaluate(() => {
                    window.__lt = [];
                    const e = document.querySelector("[data-lt-scroller]");
                    const loop = (t) => {
                        const st = document.querySelector("[data-lt-sticky]");
                        window.__lt.push([t, e.scrollTop, window.scrollY, st ? +st.getBoundingClientRect().y.toFixed(2) : null, st ? getComputedStyle(st).scale : null]);
                        if (window.__lt.length < 2400) window.__ltRaf = requestAnimationFrame(loop);
                    };
                    window.__ltRaf = requestAnimationFrame(loop);
                });
                const dist = found.sh - found.ch + 400;
                await gesture(P, bx.cx, bx.cy, dist, { fling: false, speed: 1500 });
                await gesture(P, bx.cx, bx.cy, 300, { fling: true, speed: 2500 });
                const rec = await P.page.evaluate(() => { cancelAnimationFrame(window.__ltRaf); return window.__lt; });
                const maxTop = Math.max(...rec.map((x) => x[1]));
                const pageMoved = Math.max(...rec.map((x) => x[2])) - yPage0;
                r.reachedEnd = maxTop >= found.sh - found.ch - 2;
                r.pageMovedPx = Math.round(pageMoved);
                r.stats = frameStats({ rows: rec.map((x) => ({ t: x[0] })) });
                // scrollTop steps: largest single-frame step while moving
                let maxStep = 0;
                for (let k = 1; k < rec.length; k++) maxStep = Math.max(maxStep, Math.abs(rec[k][1] - rec[k - 1][1]));
                r.maxScrollStep = Math.round(maxStep);
                if (I.sticky) {
                    const ys = rec.map((x) => x[3]).filter((v) => v != null);
                    r.stickyYRange = ys.length ? [Math.min(...ys), Math.max(...ys)] : null;
                    // bar scale against scroll fraction: frames where scrollTop changed and the bar did not
                    let lagFrames = 0;
                    for (let k = 1; k < rec.length; k++) if (rec[k][1] !== rec[k - 1][1] && rec[k][4] === rec[k - 1][4]) lagFrames++;
                    r.barStaleFrames = lagFrames;
                }
            } catch (e) {
                r.error = String(e.message).slice(0, 200);
            }
            out.inner.push(r);
            console.log(JSON.stringify(r));
        });
    }

    // C. scroll-progress rim: its progress against its scroller's fraction, per frame
    await cell(b, engine, C, async (P) => {
        const r = {};
        try {
            await gotoComp(P, tree, "progress");
            const info = await P.page.evaluate(() => {
                const rim = document.querySelector(".scroll-progress-rim");
                if (!rim) return { err: "no rim" };
                rim.setAttribute("data-lt-rim", "");
                // its scroller: the nearest scrollable ancestor or sibling container
                let s = rim.parentElement;
                while (s && !(s.scrollHeight > s.clientHeight + 4 && /(auto|scroll)/.test(getComputedStyle(s).overflowY))) s = s.parentElement;
                if (!s) {
                    const all = [...document.querySelectorAll("*")].filter((e) => e.scrollHeight > e.clientHeight + 4 && /(auto|scroll)/.test(getComputedStyle(e).overflowY));
                    s = all[0];
                }
                if (!s) return { err: "no scroller" };
                s.setAttribute("data-lt-scroller", "");
                const cs = getComputedStyle(rim);
                const vars = {};
                for (let k = 0; k < cs.length; k++) if (cs[k].startsWith("--")) vars[cs[k]] = cs.getPropertyValue(cs[k]).trim();
                return { scroller: s.tagName + "." + String(s.className).split(" ").slice(0, 2).join("."), vars: Object.fromEntries(Object.entries(vars).filter(([k]) => /progress|rim|scroll/.test(k)).slice(0, 12)), anims: rim.getAnimations({ subtree: true }).map((a) => (a.animationName || a.transitionProperty) + ":" + (a.timeline ? a.timeline.constructor.name : "doc")) };
            });
            r.info = info;
            if (info.err) throw new Error(info.err);
            const bx = await box(P, "[data-lt-scroller]");
            await P.page.evaluate(() => {
                window.__lt = [];
                const e = document.querySelector("[data-lt-scroller]");
                const rim = document.querySelector("[data-lt-rim]");
                const loop = (t) => {
                    const els = [rim, ...rim.querySelectorAll("*")];
                    const sig = els.map((x) => { const cs = getComputedStyle(x); return cs.scale + "|" + cs.transform + "|" + cs.clipPath + "|" + cs.strokeDashoffset + "|" + cs.getPropertyValue("--progress"); }).join(";");
                    window.__lt.push([t, e.scrollTop / Math.max(1, e.scrollHeight - e.clientHeight), sig]);
                    if (window.__lt.length < 1200) window.__ltRaf = requestAnimationFrame(loop);
                };
                window.__ltRaf = requestAnimationFrame(loop);
            });
            await gesture(P, bx.cx, bx.cy, 400, { speed: 800 });
            await gesture(P, bx.cx, bx.cy, -250, { speed: 800 });
            const rec = await P.page.evaluate(() => { cancelAnimationFrame(window.__ltRaf); return window.__lt; });
            // frames where the scroll fraction changed but the rim's signature did not, and the reverse
            let scrollOnly = 0, rimOnly = 0, both = 0;
            for (let k = 1; k < rec.length; k++) {
                const ds = rec[k][1] !== rec[k - 1][1], dr = rec[k][2] !== rec[k - 1][2];
                if (ds && dr) both++;
                else if (ds) scrollOnly++;
                else if (dr) rimOnly++;
            }
            r.frames = { both, scrollOnly, rimOnly, total: rec.length };
            r.stats = frameStats({ rows: rec.map((x) => ({ t: x[0] })) });
        } catch (e) {
            r.error = String(e.message).slice(0, 200);
        }
        out.rim = r;
        console.log(JSON.stringify(r));
    });
});
save(`logs/scroll/${tree}.${engine}.${cellset}.json`, out);
