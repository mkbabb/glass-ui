// cuts.mjs — does a glass phone surface cut in or out (a frame with no tween), by any
// dismissal route, at 390x844 by touch.
//
//   node cuts.mjs <chromium|webkit> <port> <out.json> [surface,...]
//
// One browser per run, a new context per (surface, route) cell, closed in finally. Every
// animation frame from before the open tap to after the close settles records the plate's
// presence, its effective opacity (the product of its own and every ancestor's computed
// opacity), its box, its computed transform, scale and filter, and the scrim's effective
// opacity. A cut is read off those frames, for the plate and for the scrim (analyse()
// below states the rule). Frames more than 40 ms apart are counted as dropped. Each cell
// also records whether the route closed the surface and how many clicks the press target
// on the page (`.ps-press`, top right) took: a close that presses through counts one.
import { chromium, webkit, devices } from "playwright";
import { writeFileSync } from "node:fs";

const [engine, port, out, only] = process.argv.slice(2);
const IPHONE_UA = devices["iPhone 13"].userAgent;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const PLATE = {
    select: '[data-slot="select-content"]',
    nselect: '[data-slot="select-content"]',
    pdrawer: '[data-slot="sheet-content"]',
    "pdrawer-free": '[data-slot="sheet-content"]',
    "pdrawer-sel": '[data-slot="select-content"]',
    "dock-select": '[data-slot="select-content"]',
    command: '[data-slot="dialog-content"]',
    sheet: '[data-slot="sheet-content"]',
    drawer: '[data-slot="sheet-content"]',
    detents: '[data-slot="sheet-content"]',
    dialog: '[data-slot="dialog-content"]',
    popover: '[data-slot="popover-content"]',
    dropdown: '[data-slot="menu-content"]',
};
const N = {
    select: 6,
    nselect: 6,
    "dock-select": 6,
    command: 8,
    sheet: 6,
    drawer: 10,
    pdrawer: 10,
    "pdrawer-free": 10,
    "pdrawer-sel": 10,
    detents: 20,
    dialog: 4,
    popover: 2,
    dropdown: 5,
};
// tap-outside: a plain block of the page at (40, 40), not clickable. tap-press: the press
// target, a button. tap-scrim: the scrim of a modal surface.
const ROUTES = {
    select: ["tap-option", "tap-outside", "tap-press", "tap-trigger", "escape"],
    nselect: ["tap-option", "tap-outside", "escape"],
    "dock-select": ["tap-option", "tap-outside", "tap-press", "escape"],
    command: ["tap-option", "tap-scrim", "escape"],
    sheet: ["tap-close", "tap-scrim", "escape"],
    drawer: ["tap-close", "tap-outside", "tap-press", "escape"],
    pdrawer: ["tap-close", "tap-outside", "tap-press", "escape", "drag-down"],
    "pdrawer-free": ["tap-outside", "tap-press"],
    "pdrawer-sel": ["tap-option", "tap-outside", "tap-press"],
    detents: ["tap-close", "tap-scrim", "escape", "drag-down"],
    dialog: ["tap-close", "tap-scrim", "escape"],
    popover: ["tap-outside", "tap-press", "tap-trigger", "escape"],
    dropdown: ["tap-option", "tap-outside", "tap-press", "tap-trigger", "escape"],
};
// The page each surface loads, when it is not `?s=<surface>`.
// pdrawer-free: the phone drawer without atlas's `@interact-outside.prevent`.
const QUERY = { "pdrawer-sel": "s=pdrawer&sel=1", "pdrawer-free": "s=pdrawer&free=1" };
// A surface opened from inside another: its trigger is tapped after the first one.
const SECOND_TRIGGER = { "pdrawer-sel": '[data-testid="trigger2"]' };
const OPTION = {
    select: '[role="option"]',
    nselect: '[role="option"]',
    "pdrawer-sel": '[role="option"]',
    "dock-select": '[role="option"]',
    command: '[data-slot="command-list"] [role="option"]',
    dropdown: '[role="menuitem"]',
};

const surfaces = only ? only.split(",") : Object.keys(PLATE);

function samplerInit(plateSel) {
    window.__frames = [];
    window.__mark = (label) => window.__frames.push({ mark: label, t: performance.now() });
    const eff = (el) => {
        let o = 1;
        for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
            const c = getComputedStyle(n);
            if (c.display === "none" || c.visibility === "hidden") return 0;
            o *= Number(c.opacity);
        }
        return o;
    };
    const tick = (t) => {
        const plate = document.querySelector(plateSel);
        const scrim = document.querySelector(".bg-overlay-scrim");
        const f = { t };
        if (plate) {
            const r = plate.getBoundingClientRect();
            f.op = Math.round(eff(plate) * 1000) / 1000;
            f.top = Math.round(r.top);
            f.left = Math.round(r.left);
            f.h = Math.round(r.height);
            f.w = Math.round(r.width);
            const c = getComputedStyle(plate);
            f.tf = c.transform;
            f.sc = c.scale;
            f.fl = c.filter;
            f.cp = c.clipPath;
            const vis =
                Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0)) *
                Math.max(0, Math.min(r.right, innerWidth) - Math.max(r.left, 0));
            f.vf = r.width * r.height ? Math.round((vis / (r.width * r.height)) * 1000) / 1000 : 0;
            f.state = plate.getAttribute("data-state");
            f.form = plate.getAttribute("data-form");
        }
        if (scrim) f.scrim = Math.round(eff(scrim) * 1000) / 1000;
        window.__frames.push(f);
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}

// A frame "shows" the plate when it is present, at least 0.02 effective opacity and at
// least 2% on screen. The entrance cuts when the first showing frame already matches the
// settled frame (same opacity >= 0.6, same box within 4 px, same share on screen, same
// clip): nothing tweened in.
// The exit cuts when a frame that shows the plate at >= 0.3 opacity and >= 20% on screen is
// followed, within 40 ms, by one that does not show it at all. A move of more than 120 px
// in one frame while showing on both sides is reported as a jump (with its frame gap).
// The scrim is judged the same way: it cuts in when it first shows at 0.1 or more, and it
// cuts out when a frame that shows it at 0.1 or more is followed by one without it.
// `steps` lists every frame whose box moved or resized by more than 4 px from the frame
// before while the plate showed at 0.3 or more: the input for reading a close that jumps.
function analyse(frames, from, to, phase) {
    const seg = frames.filter((f) => f.t >= from && f.t <= to && f.mark === undefined);
    const shows = (f) => f.op !== undefined && f.op >= 0.02 && (f.vf ?? 0) >= 0.02;
    const out = { frames: seg.length, dropped: 0, cuts: [], steps: [] };
    const scrimOf = (f) => f.scrim ?? 0;
    for (let i = 1; i < seg.length; i++) {
        const a = seg[i - 1];
        const b = seg[i];
        const dt = Math.round(b.t - a.t);
        if (scrimOf(a) < 0.02 && scrimOf(b) >= 0.1)
            out.cuts.push({ kind: "scrim appears", to: b.scrim, at: Math.round(b.t - from), dt });
        if (scrimOf(a) >= 0.1 && scrimOf(b) < 0.02)
            out.cuts.push({ kind: "scrim vanishes", from: a.scrim, at: Math.round(b.t - from), dt });
        if (shows(a) && shows(b) && Math.min(a.op, b.op) >= 0.3) {
            const d = { dtop: b.top - a.top, dleft: b.left - a.left, dw: b.w - a.w, dh: b.h - a.h };
            if (Math.max(...Object.values(d).map(Math.abs)) > 4)
                out.steps.push({ at: Math.round(b.t - from), dt, ...d, op: b.op, w: b.w, h: b.h, top: b.top });
        }
    }
    for (let i = 1; i < seg.length; i++) if (seg[i].t - seg[i - 1].t > 40) out.dropped++;
    const vis = seg.filter(shows);
    out.visibleFrames = vis.length;
    const rel = (f) => Math.round(f.t - from);
    if (phase === "open" && vis.length) {
        const first = vis[0];
        const settled = vis[vis.length - 1];
        out.first = { at: rel(first), op: first.op, top: first.top, left: first.left, h: first.h, cp: first.cp, vf: first.vf };
        out.settled = { op: settled.op, top: settled.top, left: settled.left, h: settled.h, cp: settled.cp, vf: settled.vf };
        if (
            first.op >= 0.6 &&
            Math.abs(first.op - settled.op) < 0.05 &&
            Math.abs(first.top - settled.top) < 4 &&
            Math.abs(first.left - settled.left) < 4 &&
            Math.abs((first.vf ?? 0) - (settled.vf ?? 0)) < 0.05 &&
            Math.abs(first.h - settled.h) < 4 &&
            first.cp === settled.cp
        )
            out.cuts.push({ kind: "appears whole", at: rel(first), op: first.op });
    }
    for (let i = 1; i < seg.length; i++) {
        const a = seg[i - 1];
        const b = seg[i];
        const dt = Math.round(b.t - a.t);
        if (phase === "close" && shows(a) && a.op >= 0.3 && (a.vf ?? 0) >= 0.2 && !shows(b))
            out.cuts.push({ kind: dt <= 40 ? "vanishes" : "vanishes across a dropped frame", from: a.op, vf: a.vf, at: rel(b), dt });
        if (shows(a) && shows(b) && Math.min(a.op, b.op) >= 0.3 && Math.abs(b.top - a.top) > 120)
            out.cuts.push({ kind: dt <= 40 ? "jumps" : "jumps across a dropped frame", dy: b.top - a.top, form: [a.form, b.form], at: rel(b), dt });
    }
    if (vis.length) {
        const last = vis[vis.length - 1];
        out.last = { at: rel(last), op: last.op, top: last.top, vf: last.vf };
    }
    return out;
}

async function centre(page, q) {
    return page.evaluate((q) => {
        const els = [...document.querySelectorAll(q)];
        const el = els.find((e) => e.getBoundingClientRect().height > 0) ?? els[0];
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return [Math.round(r.left + r.width / 2), Math.round(Math.max(0, r.top) + Math.min(r.height, window.innerHeight - Math.max(0, r.top)) / 2)];
    }, q);
}

async function runCell(browser, s, route) {
    const ctx = await browser.newContext({
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
        userAgent: IPHONE_UA,
    });
    const page = await ctx.newPage();
    const res = { surface: s, route, engine };
    try {
        await page.goto(`http://127.0.0.1:${port}/?ps=1&${QUERY[s] ?? `s=${s}`}&n=${N[s]}`, { waitUntil: "load" });
        await page.waitForFunction(() => window.__psReady === true, null, { timeout: 20000 });
        await page.evaluate(() => {
            const st = document.querySelector('[data-testid="stage"]');
            window.scrollTo(0, st.getBoundingClientRect().top + window.scrollY - 300);
        });
        await sleep(300);
        let t = await centre(page, '[data-testid="trigger"]');
        if (SECOND_TRIGGER[s]) {
            await page.touchscreen.tap(t[0], t[1]);
            await sleep(1200);
            t = await centre(page, SECOND_TRIGGER[s]);
        }
        await page.evaluate(samplerInit, PLATE[s]);
        await sleep(100);
        const tOpen = await page.evaluate(() => performance.now());
        await page.touchscreen.tap(t[0], t[1]);
        await sleep(1200);
        const tClose = await page.evaluate(() => performance.now());
        if (route === "tap-option") {
            const p = await centre(page, OPTION[s]);
            await page.touchscreen.tap(p[0], p[1]);
        } else if (route === "tap-outside") {
            await page.touchscreen.tap(40, 40);
        } else if (route === "tap-press") {
            const p = await centre(page, '[data-testid="press"]');
            await page.touchscreen.tap(p[0], p[1]);
        } else if (route === "tap-scrim") {
            await page.touchscreen.tap(195, 30);
        } else if (route === "tap-trigger") {
            await page.touchscreen.tap(t[0], t[1]);
        } else if (route === "tap-close") {
            const p = await centre(page, '[data-slot="dialog-close"]');
            await page.touchscreen.tap(p[0], p[1]);
        } else if (route === "escape") {
            await page.keyboard.press("Escape");
        } else if (route === "drag-down") {
            if (engine !== "chromium") {
                res.skipped = "Playwright WebKit cannot drive a touch drag";
                return res;
            }
            const cdp = await ctx.newCDPSession(page);
            const g = await centre(page, '[data-slot="sheet-detent-handle"]');
            await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: g[0], y: g[1] }] });
            for (let i = 1; i <= 16; i++) {
                await sleep(16);
                await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: g[0], y: g[1] + i * 30 }] });
            }
            await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
        }
        await sleep(1300);
        const tEnd = await page.evaluate(() => performance.now());
        const frames = await page.evaluate(() => window.__frames);
        res.open = analyse(frames, tOpen, tClose, "open");
        res.close = analyse(frames, tClose, tEnd, "close");
        res.closed = await page.evaluate((q) => {
            const el = document.querySelector(q);
            return !el || el.getAttribute("data-state") === "closed" || getComputedStyle(el).display === "none";
        }, PLATE[s]);
        res.pressed = await page.evaluate(() => window.__psPressed ?? 0);
        // Keep the close segment's frames for the record.
        res.closeFrames = frames
            .filter((f) => f.t >= tClose && f.t <= tClose + 700 && f.mark === undefined)
            .map((f) => ({ t: Math.round(f.t - tClose), op: f.op, vf: f.vf, top: f.top, left: f.left, w: f.w, h: f.h, sc: f.sc, fl: f.fl, cp: f.cp, form: f.form, scrim: f.scrim }));
        res.openFrames = frames
            .filter((f) => f.t >= tOpen && f.t <= tOpen + 700 && f.mark === undefined)
            .map((f) => ({ t: Math.round(f.t - tOpen), op: f.op, vf: f.vf, top: f.top, left: f.left, w: f.w, h: f.h, sc: f.sc, fl: f.fl, cp: f.cp, form: f.form, scrim: f.scrim }));
    } catch (e) {
        res.error = String(e && e.stack ? e.stack : e).slice(0, 500);
    } finally {
        await ctx.close();
    }
    return res;
}

const browser = engine === "webkit" ? await webkit.launch({ headless: true }) : await chromium.launch({ headless: true });
const results = [{ meta: { engine, browser: browser.version(), date: new Date().toISOString() } }];
try {
    for (const s of surfaces) {
        for (const route of ROUTES[s]) {
            const r = await runCell(browser, s, route);
            results.push(r);
            const c = (x) => (x ? `${x.frames}f vis${x.visibleFrames} drop${x.dropped} cuts=${JSON.stringify(x.cuts)}` : "-");
            console.log(`${engine} ${s} ${route}: OPEN ${c(r.open)} | CLOSE ${c(r.close)} closed=${r.closed} pressed=${r.pressed}${r.error ? " ERROR " + r.error.slice(0, 120) : ""}${r.skipped ? " SKIPPED" : ""}`);
        }
    }
} finally {
    await browser.close();
    writeFileSync(out, JSON.stringify(results, null, 1));
}
