// The ResizeObserver-loop probe: one browser per run, a new context per cell, every
// window 'error' event, every console message and pageerror, and (with --instrument) a
// wrapped ResizeObserver that logs which callback changed an observed box during its
// own delivery. Run under `guarded`:
//   node tests-visual/ro-loop/probe.mjs --base http://localhost:5421 --label v11.0.2 \
//        [--engine chromium|webkit] [--instrument] [--scenes base,controls,consumer] [--scroll]
import { chromium, webkit } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";

const args = process.argv.slice(2);
const opt = (k, d) => {
    const i = args.indexOf(`--${k}`);
    return i < 0 ? d : args[i + 1];
};
const flag = (k) => args.includes(`--${k}`);
const base = opt("base", "http://localhost:5421");
const label = opt("label", "tree");
const engine = opt("engine", "chromium");
const instrument = flag("instrument");
const scroll = flag("scroll");
const pick = flag("pick");
const throttle = Number(opt("throttle", "1"));
const scenes = opt("scenes", "base,controls,consumer").split(",");
const reps = Number(opt("reps", "1"));
const out = opt("out", null);
const dpr = Number(opt("dpr", "1"));
const width = Number(opt("width", "1280"));

const init = ({ instrument }) => {
    window.__dbg = [];
    const ro = (window.__ro = { errors: [], writes: [], marks: [], morph: [], observers: 0 });
    const t0 = performance.now();
    const now = () => Math.round(performance.now() - t0);
    ro.mark = (m) => ro.marks.push({ t: now(), m });
    window.addEventListener(
        "error",
        (e) =>
            ro.errors.push({
                t: now(),
                msg: e.message,
                morphing: !!document.querySelector("[data-morphing]"),
            }),
        true,
    );
    new MutationObserver((recs) => {
        for (const r of recs) {
            if (r.attributeName === "data-morphing") {
                ro.morph.push({ t: now(), on: r.target.hasAttribute("data-morphing") });
            }
        }
    }).observe(document, { subtree: true, attributes: true, attributeFilter: ["data-morphing"] });
    if (!instrument) return;
    const Native = window.ResizeObserver;
    const recs = new Set();
    const name = (el) =>
        `${el.tagName.toLowerCase()}${el.classList?.length ? "." + [...el.classList].slice(0, 3).join(".") : ""}`;
    const box = (el) => {
        const cs = getComputedStyle(el);
        return `${cs.width}x${cs.height}`;
    };
    const snapshot = () => {
        const m = new Map();
        for (const r of recs) for (const t of r.targets) if (t.isConnected) m.set(t, box(t));
        return m;
    };
    // A MutationObserver callback that runs inside the ResizeObserver delivery (the
    // microtask checkpoint after each RO callback) is logged as well.
    let roPhase = false;
    const NativeMO = window.MutationObserver;
    window.MutationObserver = class extends NativeMO {
        constructor(cb) {
            const site = (new Error().stack || "")
                .split("\n")
                .slice(2, 5)
                .map((s) => s.trim().replace(/https?:\/\/[^/]+/, "").replace(/\?[^:]*/, ""))
                .join(" < ");
            super((records, obs) => {
                if (!roPhase) return cb(records, obs);
                const before = snapshot();
                try {
                    cb(records, obs);
                } finally {
                    const after = snapshot();
                    const changed = [];
                    for (const [el, v] of after) {
                        if (before.has(el) && before.get(el) !== v) changed.push(`${name(el)} ${before.get(el)} -> ${v}`);
                    }
                    if (changed.length) ro.writes.push({ t: now(), site: "MO " + site, morphing: !!document.querySelector("[data-morphing]"), changed });
                }
            });
        }
    };
    window.ResizeObserver = class extends Native {
        constructor(cb) {
            const site = (new Error().stack || "")
                .split("\n")
                .slice(2, 6)
                .map((s) => s.trim().replace(/https?:\/\/[^/]+/, "").replace(/\?[^:]*/, ""))
                .join(" < ");
            const rec = { targets: new Set(), site };
            super((entries, obs) => {
                if (!roPhase) {
                    roPhase = true;
                    setTimeout(() => (roPhase = false), 0);
                }
                const before = snapshot();
                const mBefore = document.querySelector("[data-morphing]") !== null;
                try {
                    cb(entries, obs);
                } finally {
                    const after = snapshot();
                    const changed = [];
                    for (const [el, v] of after) {
                        if (before.has(el) && before.get(el) !== v) changed.push(`${name(el)} ${before.get(el)} -> ${v}`);
                    }
                    if (changed.length) {
                        ro.writes.push({
                            t: now(),
                            site,
                            morphing: mBefore,
                            delivered: entries.map((e) => name(e.target)),
                            changed,
                        });
                    }
                }
            });
            rec.self = this;
            this.__rec = rec;
            recs.add(rec);
            ro.observers = recs.size;
        }
        observe(t, o) {
            this.__rec.targets.add(t);
            super.observe(t, o);
        }
        unobserve(t) {
            this.__rec.targets.delete(t);
            super.unobserve(t);
        }
        disconnect() {
            this.__rec.targets.clear();
            super.disconnect();
        }
    };
    ro.live = () => [...recs].filter((r) => r.targets.size).map((r) => ({ site: r.site, n: r.targets.size }));
};

async function dockCenter(page) {
    const b = await page.locator(".ro-dock").first().boundingBox();
    return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
}

async function cell(browser, scene) {
    const ctx = await browser.newContext({ viewport: { width, height: 800 }, deviceScaleFactor: dpr, reducedMotion: "no-preference" });
    const page = await ctx.newPage();
    const consoleMsgs = [];
    const pageErrors = [];
    try {
        page.on("console", (m) => consoleMsgs.push(`${m.type()}: ${m.text()}`.slice(0, 300)));
        page.on("pageerror", (e) => pageErrors.push(String(e.message).slice(0, 300)));
        await page.addInitScript(init, { instrument });
        if (throttle > 1 && engine === "chromium") {
            const cdp = await ctx.newCDPSession(page);
            await cdp.send("Emulation.setCPUThrottlingRate", { rate: throttle });
        }
        await page.goto(`${base}/tests-visual/ro-loop/ro-harness.html?scene=${scene}`);
        await page.locator("body[data-ready='1'] .ro-dock").waitFor();
        await page.waitForTimeout(1200);
        const mark = (m) => page.evaluate((m) => window.__ro.mark(m), m);
        const away = () => page.mouse.move(5, 5, { steps: 4 });
        const startScroll = () =>
            scroll &&
            page.evaluate(() => {
                window.__scroll = setInterval(() => window.scrollBy(0, (window.__dir ??= 3)), 16);
            });
        const stopScroll = () => scroll && page.evaluate(() => clearInterval(window.__scroll));
        if (scene === "consumer") {
            // collapse "open": the dock mounts open and folds one idle window later.
            await mark("idle-from-mount");
            await startScroll();
            await page.waitForTimeout(8500);
            await stopScroll();
        }
        for (let r = 0; r < 2; r++) {
            const c = await dockCenter(page);
            await mark(`hover-${r}`);
            await page.mouse.move(c.x, c.y, { steps: 6 });
            await page.waitForTimeout(1800);
            if (pick && scene !== "base") {
                // value.js's openView: open the view Select in the dock and pick another view.
                await mark(`pick-${r}`);
                await page.locator(".ro-select").first().click();
                const option = page.getByRole("option", { name: r % 2 ? "palette" : "gradient", exact: true });
                await option.waitFor();
                await option.click();
                await page.waitForTimeout(600);
                // Focus leaves the dock, as it does when the view's page takes it.
                await page.evaluate(() => document.activeElement?.blur?.());
            }
            await mark(`leave-${r}`);
            await away();
            await startScroll();
            await page.waitForTimeout(8500);
            await stopScroll();
        }
        await mark("end");
        const ro = await page.evaluate(() => ({
            errors: window.__ro.errors,
            writes: window.__ro.writes,
            marks: window.__ro.marks,
            morph: window.__ro.morph,
            observers: window.__ro.live ? window.__ro.live() : null,
            dbg: window.__dbg,
        }));
        return { scene, consoleMsgs, pageErrors, ...ro };
    } finally {
        await page.close().catch(() => {});
        await ctx.close().catch(() => {});
    }
}

const browser = await (engine === "webkit" ? webkit : chromium).launch({
    headless: true,
    ...(engine === "webkit" && process.env.WEBKIT_EXECUTABLE ? { executablePath: process.env.WEBKIT_EXECUTABLE } : {}),
});
const results = [];
try {
    for (let i = 0; i < reps; i++) {
        for (const scene of scenes) {
            const r = await cell(browser, scene);
            const loop = r.errors.filter((e) => /ResizeObserver loop/.test(e.msg));
            results.push(r);
            console.log(
                JSON.stringify({
                    label,
                    engine,
                    scene,
                    rep: i,
                    roLoopErrors: loop.length,
                    roLoopAt: loop.map((e) => `${e.t}${e.morphing ? "(morphing)" : ""}`),
                    otherErrors: r.errors.filter((e) => !/ResizeObserver loop/.test(e.msg)).map((e) => e.msg),
                    pageErrors: r.pageErrors,
                    consoleErrors: r.consoleMsgs.filter((m) => m.startsWith("error")),
                    morph: r.morph.map((m) => `${m.t}${m.on ? "+" : "-"}`).join(" "),
                    marks: r.marks.map((m) => `${m.m}@${m.t}`).join(" "),
                }),
            );
        }
    }
} finally {
    await browser.close();
}
if (out) {
    mkdirSync(new URL(".", `file://${out}`).pathname, { recursive: true });
    writeFileSync(out, JSON.stringify(results, null, 2));
}
