// shell.mjs <tree> <engine> <cellset> [maxRoutes]
// Brief item 5: inside the real demo shell (dock and aurora live). Every route in turn by
// the app's own router (an SPA navigation, as a click makes), then back and forward, a
// theme change, and a resize. Per transition: the frame budget over 1.5 s, long animation
// frames, layout shift (CLS entries), whether the dock and the aurora canvas survived as
// the same nodes, view-transition animations seen, console errors.
// cellsets: d1440 (1440x900 mouse), p390 (390x844 touch), t4x390 (the same at a 4x throttle).
import { withBrowser, cell, TREES, save, sleep, frameStats } from "./lib.mjs";

const [tree = "11.1.0", engine = "chromium", cellset = "d1440", maxRoutes = "999"] = process.argv.slice(2);
const CELLS = { d1440: { w: 1440, h: 900 }, p390: { w: 390, h: 844, touch: true }, t4x390: { w: 390, h: 844, touch: true, throttle: 4 } };
const C = CELLS[cellset];
const out = { tree, engine, cellset, transitions: [] };

const INSTALL = () => {
    window.__ls = [];
    window.__loaf = [];
    try {
        new PerformanceObserver((l) => {
            for (const e of l.getEntries()) if (!e.hadRecentInput) window.__ls.push({ t: e.startTime, v: e.value, src: (e.sources || []).slice(0, 3).map((s) => { const n = s.node; return n && n.nodeType === 1 ? n.tagName.toLowerCase() + "." + String(n.className).split(" ").slice(0, 2).join(".") : String(n && n.nodeName); }) });
        }).observe({ type: "layout-shift", buffered: true });
    } catch {}
    try {
        new PerformanceObserver((l) => {
            for (const e of l.getEntries()) window.__loaf.push({ t: e.startTime, d: e.duration, s: (e.scripts || []).slice(0, 2).map((x) => (x.sourceURL || "").split("/").pop() + ":" + x.sourceFunctionName + " " + Math.round(x.duration)) });
        }).observe({ type: "long-animation-frame", buffered: true });
    } catch {}
};

async function frames(P, ms) {
    return await P.page.evaluate(
        (ms) =>
            new Promise((res) => {
                const ts = [];
                const anims = new Map();
                const t0 = performance.now();
                const step = (t) => {
                    ts.push(t);
                    try {
                        for (const a of document.getAnimations()) {
                            const tg = a.effect && a.effect.target;
                            const pe = a.effect && a.effect.pseudoElement;
                            const key = (a.animationName || a.transitionProperty || a.constructor.name) + "|" + (pe || (tg && tg.tagName ? tg.tagName.toLowerCase() + "." + String(tg.className).split(" ").slice(0, 2).join(".") : ""));
                            if (!anims.has(key)) {
                                const tm = a.effect.getComputedTiming();
                                anims.set(key, { d: tm.duration, delay: tm.delay, e: a.effect.getTiming().easing, kfe: [...new Set(a.effect.getKeyframes().map((k) => k.easing))].join(",").slice(0, 80) });
                            }
                        }
                    } catch {}
                    if (performance.now() - t0 < ms) requestAnimationFrame(step);
                    else res({ t0, ts, anims: [...anims.entries()].map(([k, v]) => ({ k, ...v })) });
                };
                requestAnimationFrame(step);
            }),
        ms,
    );
}
function stats(ts) {
    return frameStats({ rows: ts.map((t) => ({ t })) });
}
async function snap(P) {
    return await P.page.evaluate(() => {
        const dock = document.querySelector(".glass-dock");
        const cv = document.querySelector(".aurora-root canvas, canvas");
        window.__ids ||= new WeakMap();
        window.__n ||= 0;
        const id = (n) => {
            if (!n) return null;
            if (!window.__ids.has(n)) window.__ids.set(n, ++window.__n);
            return window.__ids.get(n);
        };
        const de = document.documentElement;
        return { dock: id(dock), canvas: id(cv), path: location.pathname, dark: de.classList.contains("dark"), hOverflow: de.scrollWidth - de.clientWidth, main: (document.querySelector("main") || {}).textContent?.trim().slice(0, 40) || "" };
    });
}
async function transition(P, label, fn, ms = 1500) {
    if (P.page.isClosed()) throw new Error("page closed");
    const before = await snap(P);
    const lsFrom = await P.page.evaluate(() => [window.__ls.length, window.__loaf.length, performance.now()]);
    const errFrom = P.errors.length;
    const fp = frames(P, ms);
    await sleep(16);
    await fn();
    const f = await fp;
    const after = await snap(P);
    const ls = await P.page.evaluate((n) => window.__ls.slice(n), lsFrom[0]);
    const loaf = await P.page.evaluate((n) => window.__loaf.slice(n).filter((e) => e.d > 50), lsFrom[1]);
    const r = {
        label,
        from: before.path,
        to: after.path,
        stats: stats(f.ts),
        cls: +ls.reduce((s, e) => s + e.v, 0).toFixed(4),
        clsSrc: ls.slice(0, 3).map((e) => e.src.join(",")),
        loaf: loaf.slice(0, 4).map((e) => ({ d: Math.round(e.d), s: e.s })),
        dockSame: before.dock === after.dock,
        canvasSame: before.canvas === after.canvas,
        dark: after.dark,
        hOverflow: after.hOverflow,
        vt: f.anims.filter((a) => /view-transition/.test(a.k)).map((a) => `${a.k} ${a.d}ms ${a.e}`).slice(0, 6),
        anims: f.anims.length,
        errors: P.errors.slice(errFrom).slice(0, 3),
    };
    out.transitions.push(r);
    out.anims ||= {};
    for (const a of f.anims) out.anims[a.k] ||= a;
    console.log(JSON.stringify({ l: label, to: r.to, longest: r.stats.longestMs, drop: r.stats.dropped60, cls: r.cls, dock: r.dockSame, cv: r.canvasSame, vt: r.vt.length, err: r.errors.length }));
    return r;
}

await withBrowser(engine, async (b) => {
    await cell(b, engine, C, async (P) => {
        await P.context.addInitScript(INSTALL);
        const boot = async (path = "/") => {
            await P.page.goto(`http://127.0.0.1:${TREES[tree].port}${path}`, { waitUntil: "load" });
            await sleep(2500);
            return await P.page.evaluate(() => {
                const app = document.querySelector("#app").__vue_app__;
                const r = app.config.globalProperties.$router;
                window.__router = r;
                return r.getRoutes().filter((x) => !x.redirect && !x.path.includes(":")).map((x) => x.path);
            });
        };
        const fresh = async () => {
            try { await P.page.close(); } catch {}
            P.page = await P.context.newPage();
            P.page.on("pageerror", (e) => P.errors.push(String(e.message || e).slice(0, 300)));
            P.page.on("console", (m) => m.type() === "error" && P.errors.push(m.text().slice(0, 300)));
            P.page.on("crash", () => P.errors.push("PAGE CRASH"));
            if (P.cdp) {
                P.cdp = await P.context.newCDPSession(P.page);
            }
        };
        P.page.on("crash", () => P.errors.push("PAGE CRASH"));
        const routes = await boot("/");
        out.routes = routes;
        out.crashes = [];
        if (C.throttle) await P.throttle(C.throttle);
        const order = routes.slice(0, +maxRoutes);
        let prev = "/";
        for (const rt of order) {
            try {
                await transition(P, "push", () => P.page.evaluate((p) => window.__router.push(p), rt), C.throttle ? 2500 : 1500);
                prev = rt;
            } catch (e) {
                out.crashes.push({ from: prev, to: rt, err: String(e.message).slice(0, 160), errors: P.errors.slice(-3) });
                console.log(JSON.stringify({ crash: rt, from: prev }));
                await fresh();
                await boot(rt).catch(() => {});
                if (C.throttle) await P.throttle(C.throttle);
                prev = rt;
            }
        }
        const T = async (...a) => {
            try {
                return await transition(P, ...a);
            } catch (e) {
                out.crashes.push({ label: a[0], from: prev, err: String(e.message).slice(0, 160), errors: P.errors.slice(-3) });
                console.log(JSON.stringify({ crash: a[0], from: prev }));
                await fresh();
                await boot(prev).catch(() => {});
            }
        };
        // back and forward
        for (let k = 0; k < 4; k++) await T("back", () => P.page.evaluate(() => history.back()), C.throttle ? 2500 : 1500);
        for (let k = 0; k < 4; k++) await T("forward", () => P.page.evaluate(() => history.forward()), C.throttle ? 2500 : 1500);
        // rapid double navigation
        await T("double", async () => {
            await P.page.evaluate((a) => { window.__router.push(a[0]); setTimeout(() => window.__router.push(a[1]), 60); }, [order[1], order[Math.min(5, order.length - 1)]]);
        }, 2000);
        // theme change, by the shell's own toggle if present, else the class
        let tog = await P.page.$(".dark-mode-toggle-button");
        out.themeToggle = !!tog;
        for (let k = 0; k < 2; k++)
            await T("theme", async () => {
                if (tog) {
                    const bx = await tog.boundingBox();
                    if (C.touch && P.cdp) {
                        await P.cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: bx.x + bx.width / 2, y: bx.y + bx.height / 2 }] });
                        await P.cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
                    } else await P.page.mouse.click(bx.x + bx.width / 2, bx.y + bx.height / 2);
                } else await P.page.evaluate(() => document.documentElement.classList.toggle("dark"));
            });
        // resize
        if (!C.touch) {
            await T("resize-390", () => P.page.setViewportSize({ width: 390, height: 844 }), 1500);
            await T("resize-1440", () => P.page.setViewportSize({ width: 1440, height: 900 }), 1500);
        } else {
            await T("rotate-844x390", () => P.page.setViewportSize({ width: 844, height: 390 }), 1500);
            await T("rotate-390x844", () => P.page.setViewportSize({ width: 390, height: 844 }), 1500);
        }
        out.errorsTotal = P.errors.length;
        out.errorSample = [...new Set(P.errors)].slice(0, 8);
    });
});
save(`logs/shell/${tree}.${engine}.${cellset}.json`, out);
