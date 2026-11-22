// The shell's readings (PACKETS.md, P0 acceptance 1-10): the two docks' fold and open
// sampled per frame, their corners, first-frame clicks, the rail column and `main`
// holding still, content under the pager, the pager's ink against what is behind it,
// the dark cold load, and the phone's Sheet.
//
// Machine law: through `~/.claude/guard/guarded` as a browser run (never --light);
// headless shell; `--use-angle=metal --enable-gpu --ignore-gpu-blocklist` is the one
// named exception (the live field must render to measure a cold load); one browser
// per run, a new context per cell, all closed in `finally`. Frames come from
// page.screenshot, decoded in a blank helper page; no getContext on a page canvas.
//
// usage: node shell.mjs --base http://localhost:5451 --out readings.json [--only a,b]
import { chromium } from "playwright";
import fs from "node:fs";

const args = Object.fromEntries(
    process.argv.slice(2).reduce((acc, a, i, all) => {
        if (a.startsWith("--")) acc.push([a.slice(2), all[i + 1]]);
        return acc;
    }, []),
);
const BASE = args.base ?? "http://localhost:5451";
const only = args.only ? new Set(args.only.split(",")) : null;
const want = (k) => !only || only.has(k);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const out = {};

const RAIL = "[data-testid=sidebar-dock-collapsible]";
const PAGER = "[data-testid=bottom-dock-collapsible]";

// Record the dock's plate rect and posture on every animation frame for `ms`.
const RECORD = ({ sel, ms }) =>
    new Promise((resolve) => {
        const d = document.querySelector(sel);
        const plate = d.querySelector(":scope > .dock-plate") || d;
        const frames = [];
        const t0 = performance.now();
        const tick = () => {
            const r = d.getBoundingClientRect();
            const p = plate.getBoundingClientRect();
            const sum = d.querySelector(".dock-layer--summary");
            const full = d.querySelector(".dock-layer--full");
            frames.push({
                t: Math.round(performance.now() - t0),
                w: +r.width.toFixed(1), h: +r.height.toFixed(1),
                pw: +p.width.toFixed(1), ph: +p.height.toFixed(1),
                st: d.classList.contains("collapsed") ? "folded" : "open",
                so: sum ? +getComputedStyle(sum).opacity : null,
                fo: full ? +getComputedStyle(full).opacity : null,
                clip: getComputedStyle(plate).clipPath.slice(0, 60),
            });
            if (performance.now() - t0 < ms) requestAnimationFrame(tick);
            else resolve(frames);
        };
        requestAnimationFrame(tick);
    });

// Summarise a frame series: the travel on the morph axis, the largest share of it
// that landed in one frame, how many frames the change took, and monotonicity.
function travel(frames, axis) {
    const v = frames.map((f) => f[axis]);
    const first = v[0], last = v[v.length - 1];
    const total = Math.abs(last - first);
    let maxStep = 0, moving = 0, reversals = 0, prevSign = 0;
    for (let i = 1; i < v.length; i++) {
        const d = v[i] - v[i - 1];
        if (Math.abs(d) > 0.05) {
            moving++;
            const s = Math.sign(d);
            if (prevSign && s !== prevSign) reversals++;
            prevSign = s;
        }
        maxStep = Math.max(maxStep, Math.abs(d));
    }
    return {
        from: first, to: last, total: +total.toFixed(1),
        maxStepShare: total ? +(maxStep / total).toFixed(3) : null,
        movingFrames: moving, reversals,
        overshoot: +(Math.max(...v.map((x) => (last > first ? x - last : last - x))) || 0).toFixed(1),
    };
}

// 24 samples at 60 ms from a series, starting at the first change
function samples24(frames, axis) {
    const i0 = Math.max(0, frames.findIndex((f, i) => i > 0 && Math.abs(f[axis] - frames[0][axis]) > 0.05) - 1);
    const t0 = frames[i0]?.t ?? 0;
    const out = [];
    for (let k = 0; k < 24; k++) {
        const t = t0 + k * 60;
        const f = frames.reduce((best, x) => (Math.abs(x.t - t) < Math.abs(best.t - t) ? x : best), frames[0]);
        out.push(f[axis]);
    }
    let mono = true;
    const dir = Math.sign(out[out.length - 1] - out[0]);
    for (let k = 1; k < out.length; k++) if (Math.sign(out[k] - out[k - 1]) === -dir && Math.abs(out[k] - out[k - 1]) > 0.5) mono = false;
    return { values: out, monotone: mono, start: out[0], stop: out[out.length - 1] };
}

const CORNERS = (sel) => {
    const d = document.querySelector(sel);
    const plate = d.querySelector(":scope > .dock-plate") || d;
    const r = plate.getBoundingClientRect();
    const cs = getComputedStyle(plate);
    const raw = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius].map(parseFloat);
    const vertical = d.classList.contains("vertical");
    const cross = vertical ? r.width : r.height;
    const eff = raw.map((v) => Math.min(v, Math.min(r.width, r.height) / 2));
    return { w: +r.width.toFixed(1), h: +r.height.toFixed(1), radius: eff.map((v) => +v.toFixed(1)), need: +(cross / 2 - 1).toFixed(1), pill: eff.every((e) => e >= cross / 2 - 1), state: d.classList.contains("collapsed") ? "folded" : "open" };
};

const RECTS = () => {
    const q = (s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return [r.left, r.top, r.width, r.height].map((v) => +v.toFixed(1)); };
    return { railColumn: q(".demo-sidebar-rail"), main: q("#demo-main"), rail: q("[data-testid=sidebar-dock-collapsible]"), pager: q("[data-testid=bottom-dock-collapsible]") };
};

const browser = await chromium.launch({
    headless: true,
    args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"],
});

async function cell({ width, height, scheme = "dark", touch = false, reduced = false }, fn) {
    const ctx = await browser.newContext({
        viewport: { width, height }, colorScheme: scheme, hasTouch: touch, isMobile: touch,
        deviceScaleFactor: 1, reducedMotion: reduced ? "reduce" : "no-preference",
    });
    const errors = [];
    try {
        await ctx.addInitScript(`try{localStorage.setItem("vueuse-color-scheme",${JSON.stringify(scheme)})}catch{}`);
        const page = await ctx.newPage();
        page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 160)); });
        page.on("pageerror", (e) => errors.push("pageerror: " + e.message.slice(0, 160)));
        return await fn(page, errors);
    } finally {
        await ctx.close().catch(() => {});
    }
}

// a blank page that decodes screenshots for us
const helperCtx = await browser.newContext();
const helper = await helperCtx.newPage();
const STATS = async (b64s) => {
    const res = [];
    for (const b64 of b64s) {
        const bin = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
        const bmp = await createImageBitmap(new Blob([bin], { type: "image/png" }));
        const c = new OffscreenCanvas(bmp.width, bmp.height);
        const x = c.getContext("2d", { willReadFrequently: true });
        x.drawImage(bmp, 0, 0);
        const d = x.getImageData(0, 0, bmp.width, bmp.height).data;
        let n = 0, dark = 0, sum = 0, r = 0, g = 0, b = 0;
        for (let i = 0; i < d.length; i += 4 * 16) {
            const y = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
            sum += y; n++; if (y < 22) dark++;
            r += d[i]; g += d[i + 1]; b += d[i + 2];
        }
        res.push({ meanLuma: +(sum / n).toFixed(1), darkShare: +(dark / n).toFixed(3), mean: [r / n, g / n, b / n].map(Math.round) });
    }
    return res;
};

try {
    // ── 1, 2, 4: the rail's fold and open, per frame; corners; column and main ──
    if (want("rail")) {
        out.rail = await cell({ width: 1440, height: 900 }, async (page, errors) => {
            await page.goto(BASE + "/display/buttons");
            await page.waitForSelector(RAIL);
            await page.mouse.move(1200, 500);
            await sleep(1500);
            const openCorners = await page.evaluate(CORNERS, RAIL);
            const openRects = await page.evaluate(RECTS);
            // a press in the page folds it
            const rec = page.evaluate(RECORD, { sel: RAIL, ms: 1800 });
            await sleep(30);
            await page.mouse.click(1000, 700);
            const fold = await rec;
            await sleep(300);
            const foldedCorners = await page.evaluate(CORNERS, RAIL);
            const foldedRects = await page.evaluate(RECTS);
            const box = (await page.locator(RAIL).boundingBox());
            const rec2 = page.evaluate(RECORD, { sel: RAIL, ms: 2200 });
            await sleep(30);
            await page.mouse.move(box.x + box.width / 2, box.y + 20, { steps: 3 });
            const open = await rec2;
            return {
                openCorners, foldedCorners, openRects, foldedRects,
                fold: { ...travel(fold, "h"), s24: samples24(fold, "h"), states: [fold[0].st, fold.at(-1).st] },
                open: { ...travel(open, "h"), s24: samples24(open, "h"), states: [open[0].st, open.at(-1).st] },
                errors,
            };
        });
    }

    if (want("railReduced")) {
        out.railReduced = await cell({ width: 1440, height: 900, reduced: true }, async (page) => {
            await page.goto(BASE + "/display/buttons");
            await page.waitForSelector(RAIL);
            await page.mouse.move(1200, 500);
            await sleep(1200);
            const rec = page.evaluate(RECORD, { sel: RAIL, ms: 1200 });
            await sleep(30);
            await page.mouse.click(1000, 700);
            const fold = await rec;
            return {
                fold: travel(fold, "h"),
                opacity: fold.filter((_, i) => i % 3 === 0).map((f) => [f.t, f.h, f.so, f.fo]),
            };
        });
    }

    // ── 1, 2, 3: the pager's open and fold; corners; Previous/Next while folded ──
    if (want("pager")) {
        out.pager = await cell({ width: 1440, height: 900 }, async (page, errors) => {
            await page.goto(BASE + "/foundations/radii");
            await page.waitForSelector(PAGER);
            await page.mouse.move(700, 300);
            await sleep(1500);
            const foldedCorners = await page.evaluate(CORNERS, PAGER);
            const rectsFolded = await page.evaluate(RECTS);
            const box = await page.locator(PAGER).boundingBox();
            const rec = page.evaluate(RECORD, { sel: PAGER, ms: 2000 });
            await sleep(30);
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 3 });
            const open = await rec;
            const openCorners = await page.evaluate(CORNERS, PAGER);
            const rectsOpen = await page.evaluate(RECTS);
            // pointer leaves: the dock folds after its idle window
            await page.mouse.move(700, 300);
            const rec2 = page.evaluate(RECORD, { sel: PAGER, ms: 8500 });
            const fold = await rec2;
            await sleep(400);
            // Previous and Next while folded
            const folded = await page.evaluate((s) => document.querySelector(s).classList.contains("collapsed"), PAGER);
            await page.locator(`${PAGER} [aria-label="Next page"]`).click({ timeout: 3000 });
            await page.waitForURL(/shadows/, { timeout: 4000 }).catch(() => {});
            const afterNext = new URL(page.url()).pathname;
            await page.mouse.move(700, 300);
            await sleep(7500);
            const folded2 = await page.evaluate((s) => document.querySelector(s).classList.contains("collapsed"), PAGER);
            await page.locator(`${PAGER} [aria-label="Previous page"]`).click({ timeout: 3000 });
            await page.waitForURL(/radii/, { timeout: 4000 }).catch(() => {});
            const afterPrev = new URL(page.url()).pathname;
            return {
                foldedCorners, openCorners, rectsFolded, rectsOpen,
                open: { ...travel(open, "w"), s24: samples24(open, "w"), states: [open[0].st, open.at(-1).st] },
                fold: { ...travel(fold, "w"), s24: samples24(fold, "w"), states: [fold[0].st, fold.at(-1).st] },
                nextWhileFolded: { folded, to: afterNext },
                prevWhileFolded: { folded: folded2, to: afterPrev },
                errors,
            };
        });
    }

    // The folded pager's title: whole, or capped with an ellipsis past 24 characters.
    // Read at rest and on every frame of a fold.
    if (want("pagerTitle")) {
        const TITLE = (sel) => {
            const t = document.querySelector(`${sel} [data-pager-title]`);
            if (!t) return null;
            const pane = t.closest(".dock-layer--summary") || t.parentElement;
            const r = t.getBoundingClientRect(), pr = pane.getBoundingClientRect();
            return { text: t.textContent.trim(), chars: t.textContent.trim().length, w: +r.width.toFixed(1), need: t.scrollWidth, clipped: t.scrollWidth > t.clientWidth + 0.5, pane: [+pr.width.toFixed(1), +pr.height.toFixed(1)] };
        };
        const FRAMES = ({ sel, ms }) => new Promise((done) => {
            const out = [], t0 = performance.now();
            const tick = () => {
                const t = document.querySelector(`${sel} [data-pager-title]`);
                const d = document.querySelector(sel);
                if (t) out.push({ t: Math.round(performance.now() - t0), w: +t.getBoundingClientRect().width.toFixed(1), need: t.scrollWidth, clipped: t.scrollWidth > t.clientWidth + 0.5, opacity: +getComputedStyle(t.closest(".dock-layer--summary") || t).opacity, folded: d.classList.contains("collapsed") });
                if (performance.now() - t0 < ms) requestAnimationFrame(tick); else done(out);
            };
            requestAnimationFrame(tick);
        });
        out.pagerTitle = [];
        for (const [width, height, touch] of [[1440, 900, false], [390, 844, true]]) {
            for (const route of ["/", "/display/buttons", "/containers/configurator", "/forms/checks"]) {
                out.pagerTitle.push(await cell({ width, height, touch }, async (page) => {
                    await page.goto(BASE + route);
                    await page.waitForSelector(PAGER);
                    await page.mouse.move(width / 2, 200);
                    await sleep(2500);
                    const rest = await page.evaluate(TITLE, PAGER);
                    let fold = null;
                    if (!touch && route === "/display/buttons") {
                        const box = await page.locator(PAGER).boundingBox();
                        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 3 });
                        await sleep(1500);
                        const rec = page.evaluate(FRAMES, { sel: PAGER, ms: 8000 });
                        await page.mouse.move(width / 2, 200);
                        const frames = await rec;
                        const shown = frames.filter((f) => f.folded && f.opacity > 0.5);
                        fold = { frames: frames.length, foldedFrames: frames.filter((f) => f.folded).length, shownFrames: shown.length, clippedShown: shown.filter((f) => f.clipped).length, widths: [...new Set(shown.map((f) => f.w))].slice(0, 12) };
                    }
                    return { width, route, rest, fold };
                }));
            }
        }
    }

    // ── 2 at 390: both docks' corners; 10: the Sheet and its unfolded rail ──
    if (want("phone")) {
        out.phone = await cell({ width: 390, height: 844, touch: true }, async (page, errors) => {
            await page.goto(BASE + "/display/buttons");
            await page.waitForSelector(PAGER);
            await sleep(1500);
            const foldedCorners = await page.evaluate(CORNERS, PAGER);
            const expandOn = await page.evaluate(() => matchMedia("(pointer: coarse)").matches);
            const box = await page.locator(`${PAGER} .dock-layer--summary`).boundingBox();
            await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
            await sleep(1500);
            const openCorners = await page.evaluate(CORNERS, PAGER);
            await page.touchscreen.tap(200, 300);
            await sleep(1200);
            await page.locator('[aria-label="Open category navigation"]').first().tap();
            await sleep(1200);
            const sheet = await page.evaluate(() => {
                const rails = [...document.querySelectorAll("[data-testid=sidebar-dock-collapsible]")];
                const inSheet = rails.find((r) => r.closest("[role=dialog]"));
                return inSheet ? { found: true, cls: inSheet.className, folded: inSheet.classList.contains("collapsed"), corners: null } : { found: false };
            });
            if (sheet.found) sheet.corners = await page.evaluate(() => {
                const d = [...document.querySelectorAll("[data-testid=sidebar-dock-collapsible]")].find((r) => r.closest("[role=dialog]"));
                const r = d.getBoundingClientRect();
                return [r.width, r.height, getComputedStyle(d.querySelector(".dock-plate") || d).borderTopLeftRadius];
            });
            return { coarse: expandOn, foldedCorners, openCorners, sheet, errors };
        });
    }

    // ── 3: every category answers a click on the first frame ──
    if (want("firstClick")) {
        out.firstClick = [];
        const cats = ["foundations", "substrates", "display", "forms", "containers", "navigation", "dock", "data", "feedback", "motion", "compositions"];
        for (const [i, cat] of cats.entries()) {
            out.firstClick.push(await cell({ width: 1440, height: 900 }, async (page) => {
                const start = cat === "display" ? "/forms/inputs" : "/display/buttons";
                await page.goto(BASE + start, { waitUntil: "commit" });
                const btn = page.locator(`${RAIL} [aria-label="${cat[0].toUpperCase() + cat.slice(1)}"]`).first();
                await btn.waitFor({ state: "attached", timeout: 10000 });
                const t = Date.now();
                await btn.click({ timeout: 4000 });
                await page.waitForURL((u) => u.pathname.startsWith("/" + cat), { timeout: 4000 }).catch(() => {});
                return { cat, i, to: new URL(page.url()).pathname, ok: new URL(page.url()).pathname.startsWith("/" + cat), ms: Date.now() - t };
            }));
        }
    }

    // ── 5: content passes under the pager; the last element clears it ──
    if (want("under")) {
        out.under = await cell({ width: 1440, height: 900 }, async (page) => {
            await page.goto(BASE + "/dock/overview");
            await page.waitForSelector(PAGER);
            await sleep(2000);
            const mid = await page.evaluate((sel) => {
                const m = document.querySelector("#demo-main");
                m.scrollTo({ top: (m.scrollHeight - m.clientHeight) / 2, behavior: "instant" });
                const d = document.querySelector(sel).getBoundingClientRect();
                const under = [...m.querySelectorAll("article *")].filter((e) => {
                    const r = e.getBoundingClientRect();
                    return r.width > 0 && r.left < d.right && r.right > d.left && r.top < d.bottom && r.bottom > d.top && e.children.length === 0;
                });
                return { screens: +(m.scrollHeight / m.clientHeight).toFixed(2), dock: [d.left, d.top, d.width, d.height].map(Math.round), leavesUnder: under.length, sample: under.slice(0, 3).map((e) => e.tagName + "." + (e.className?.baseVal ?? e.className).toString().split(" ")[0]) };
            }, PAGER);
            await sleep(300);
            const end = await page.evaluate((sel) => {
                const m = document.querySelector("#demo-main");
                m.scrollTo({ top: m.scrollHeight, behavior: "instant" });
                const a = m.querySelector("article");
                const leaves = [...a.querySelectorAll("*")].filter((e) => e.getBoundingClientRect().height > 0);
                const lastBottom = Math.max(...leaves.map((e) => e.getBoundingClientRect().bottom));
                const d = document.querySelector(sel).getBoundingClientRect();
                return { lastBottom: Math.round(lastBottom), dockTop: Math.round(d.top), clear: lastBottom <= d.top };
            }, PAGER);
            return { mid, end };
        });
    }

    // ── 6: the pager's words and icons against what is behind them ──
    if (want("contrast")) {
        out.contrast = [];
        for (const route of ["/data/table", "/substrates/aurora"]) {
            for (const scheme of ["dark", "light"]) {
                out.contrast.push(await cell({ width: 1440, height: 900, scheme }, async (page) => {
                    await page.goto(BASE + route);
                    await page.waitForSelector(PAGER);
                    await sleep(2500);
                    // scroll the densest part of the page under the dock
                    await page.evaluate(() => { const m = document.querySelector("#demo-main"); m.scrollTo({ top: Math.min(m.scrollHeight, 400), behavior: "instant" }); });
                    await sleep(400);
                    const read = async (posture) => {
                        const shot = (await page.screenshot({ type: "png" })).toString("base64");
                        return page.evaluate(async ({ shot, sel }) => {
                            const bin = Uint8Array.from(atob(shot), (c) => c.charCodeAt(0));
                            const bmp = await createImageBitmap(new Blob([bin], { type: "image/png" }));
                            const c = new OffscreenCanvas(bmp.width, bmp.height);
                            const x = c.getContext("2d", { willReadFrequently: true });
                            x.drawImage(bmp, 0, 0);
                            const lin = (v) => ((v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
                            const L = (p) => 0.2126 * lin(p[0]) + 0.7152 * lin(p[1]) + 0.0722 * lin(p[2]);
                            const CR = (a, b) => { const p = L(a), q = L(b); return (Math.max(p, q) + 0.05) / (Math.min(p, q) + 0.05); };
                            const at = (r) => {
                                const d = x.getImageData(Math.round(r.left), Math.round(r.top), Math.max(1, Math.round(r.width)), Math.max(1, Math.round(r.height))).data;
                                const px = [];
                                for (let i = 0; i < d.length; i += 4) px.push([d[i], d[i + 1], d[i + 2]]);
                                return px;
                            };
                            const dock = document.querySelector(sel);
                            const items = [];
                            for (const el of dock.querySelectorAll("[data-pager-title], button svg, [role=button] svg, .dock-layer--full button")) {
                                const r = el.getBoundingClientRect();
                                if (r.width < 2 || r.height < 2 || el.closest("[inert]")) continue;
                                if (el.matches(".dock-layer--full button") && el.querySelector("svg")) continue;
                                const px = at(r);
                                // the plate behind: the colour most pixels share; the ink: the pixel furthest from it
                                const bins = new Map();
                                for (const p of px) { const k = (p[0] >> 3) * 1024 + (p[1] >> 3) * 32 + (p[2] >> 3); const b = bins.get(k) || [0, 0, 0, 0]; b[0] += p[0]; b[1] += p[1]; b[2] += p[2]; b[3]++; bins.set(k, b); }
                                let best = null; for (const b of bins.values()) if (!best || b[3] > best[3]) best = b;
                                const bg = [best[0] / best[3], best[1] / best[3], best[2] / best[3]];
                                let ink = bg, inkCr = 1;
                                for (const p of px) { const c = CR(p, bg); if (c > inkCr) { inkCr = c; ink = p; } }
                                items.push({ what: el.matches("[data-pager-title]") ? "title" : el.matches("svg") ? "icon:" + (el.closest("[aria-label]")?.getAttribute("aria-label") ?? "") : "word:" + el.textContent.trim().slice(0, 16), cr: +inkCr.toFixed(2) });
                            }
                            return items;
                        }, { shot, sel: PAGER });
                    };
                    const folded = await read("folded");
                    const box = await page.locator(PAGER).boundingBox();
                    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 3 });
                    await sleep(1500);
                    const open = await read("open");
                    return { route, scheme, folded, open };
                }));
            }
        }
    }

    // ── 7, 8: dark cold load, sampled by screenshot for the first second ──
    if (want("coldload")) {
        out.coldload = [];
        for (const route of ["/", "/substrates/aurora", "/dock/overview", "/dock/controls", "/dock/overflow", "/display/buttons"]) {
            out.coldload.push(await cell({ width: 1440, height: 900 }, async (page) => {
                const shots = [];
                const times = [];
                const t0 = Date.now();
                const nav = page.goto(BASE + route, { waitUntil: "commit" });
                await nav;
                while (Date.now() - t0 < 1400) {
                    try {
                        const b = await page.screenshot({ type: "png", timeout: 2000 });
                        shots.push(b.toString("base64"));
                        times.push(Date.now() - t0);
                    } catch { /* not painted yet */ }
                }
                await sleep(1500);
                shots.push((await page.screenshot({ type: "png" })).toString("base64"));
                times.push(Date.now() - t0);
                const stats = await helper.evaluate(STATS, shots);
                let maxStep = 0;
                for (let i = 1; i < stats.length; i++) maxStep = Math.max(maxStep, Math.abs(stats[i].meanLuma - stats[i - 1].meanLuma));
                return {
                    route,
                    frames: stats.map((s, i) => ({ t: times[i], ...s })),
                    blackFrames: stats.filter((s) => s.darkShare >= 0.5).length,
                    maxLumaStep: +maxStep.toFixed(1),
                    first: stats[0],
                };
            }));
        }
    }

    // P1 acceptance 4: after a 600 px wheel scroll, nothing but the docks sticks to an edge
    if (want("wheel")) {
        out.wheel = await cell({ width: 1440, height: 900 }, async (page) => {
            await page.goto(BASE + "/navigation/tabs");
            await page.waitForSelector("#demo-main");
            await sleep(2000);
            await page.mouse.move(800, 450);
            await page.mouse.wheel(0, 600);
            await sleep(1200);
            return page.evaluate(() => {
                const m = document.querySelector("#demo-main");
                const h = document.querySelector("[data-story-header]");
                const hr = h ? h.getBoundingClientRect() : null;
                const stuck = [...document.querySelectorAll("body *")].filter((e) => {
                    const cs = getComputedStyle(e);
                    if (!/sticky|fixed/.test(cs.position)) return false;
                    const r = e.getBoundingClientRect();
                    return r.width > 0 && r.height > 0 && !e.closest(".glass-dock, .demo-bottom-dock, .demo-sidebar-rail, [aria-hidden=true], .sr-only") && cs.visibility !== "hidden";
                }).map((e) => e.tagName + "." + String(e.className).split(" ")[0]);
                return { scrollTop: m.scrollTop, headerBottom: hr ? Math.round(hr.bottom) : null, headerInView: hr ? hr.bottom > 0 : null, headerShadow: h ? getComputedStyle(h).boxShadow : null, stuck };
            });
        });
    }

    // the ground, re-measured: a patch of open page once the field has settled
    if (want("ground")) {
        out.ground = [];
        for (const scheme of ["dark", "light"]) {
            out.ground.push(await cell({ width: 1440, height: 900, scheme }, async (page) => {
                await page.goto(BASE + "/display/buttons");
                await sleep(3500);
                const b = (await page.screenshot({ type: "png", clip: { x: 700, y: 640, width: 400, height: 140 } })).toString("base64");
                const [s] = await helper.evaluate(STATS, [b]);
                return { scheme, mean: s.mean, head: scheme === "dark" ? [43, 34, 27] : [252, 241, 230] };
            }));
        }
    }
} finally {
    await helperCtx.close().catch(() => {});
    await browser.close().catch(() => {});
}

const json = JSON.stringify(out, null, 1);
if (args.out) fs.writeFileSync(args.out, json);
process.stdout.write(json.slice(0, 20000) + "\n");
