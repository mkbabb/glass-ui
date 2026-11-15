// last-ten shared probe library. One browser per run (withBrowser), one new context per
// cell (cell), everything closed in finally. Reuses the harness's in-page sampler
// (../../animation/harness/sampler.js): one row per rendered frame for every tracked
// selector. Adds: CPU throttle, frame-budget stats, reversal analysis, touch helpers.
import { createRequire } from "node:module";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const HERE = dirname(fileURLToPath(import.meta.url));
export const LT = resolve(HERE, "..");
export const HARNESS = resolve(LT, "../animation/harness");
export const TREES = {
    "11.1.0": { dir: join(HARNESS, "tree-11.1.0-acd8db1eb"), port: 5411, sha: "acd8db1eb" },
    "11.0.2": { dir: join(HARNESS, "tree-11.0.2-b11a018e5"), port: 5412, sha: "b11a018e5" },
};
const require = createRequire(join(TREES["11.1.0"].dir, "package.json"));
export const pw = require("playwright");
const SAMPLER = readFileSync(join(HARNESS, "sampler.js"), "utf8");
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const GPU_ARGS = ["--use-angle=metal", "--enable-gpu-rasterization"];

export async function withBrowser(engine, fn) {
    let browser;
    try {
        browser = await pw[engine].launch({ headless: true, args: engine === "chromium" ? GPU_ARGS : [] });
        return await fn(browser);
    } finally {
        if (browser) await browser.close().catch(() => {});
    }
}

// A cell: { w, h, touch, dpr, scheme, rm, throttle }
export async function cell(browser, engine, c, fn) {
    const opts = {
        viewport: { width: c.w, height: c.h },
        deviceScaleFactor: c.dpr || (c.touch ? 3 : 2),
        colorScheme: c.scheme === "dark" ? "dark" : "light",
        reducedMotion: c.rm ? "reduce" : "no-preference",
    };
    if (c.touch) {
        opts.hasTouch = true;
        if (engine === "chromium") opts.isMobile = true;
    }
    let context;
    try {
        context = await browser.newContext(opts);
        await context.addInitScript(SAMPLER);
        const page = await context.newPage();
        const errors = [];
        page.on("pageerror", (e) => errors.push(String(e.message || e).slice(0, 300)));
        page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 300)));
        let cdp = null;
        if (engine === "chromium") cdp = await context.newCDPSession(page);
        const P = { page, cdp, engine, c, errors, context };
        P.throttle = async (rate) => {
            if (cdp) await cdp.send("Emulation.setCPUThrottlingRate", { rate });
        };
        return await fn(P);
    } finally {
        if (context) await context.close().catch(() => {});
    }
}

export async function gotoComp(P, tree, name, extra = "") {
    const { page, c } = P;
    const url = `http://127.0.0.1:${TREES[tree].port}/?c=${name}${c.scheme === "dark" ? "&scheme=dark" : ""}${extra}`;
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    await page.waitForFunction(() => window.__animReady === true || !!window.__animError, null, { timeout: 20000 });
    const err = await page.evaluate(() => window.__animError || null);
    if (err) throw new Error("page error: " + err);
    await sleep(300);
}

export async function gotoRoute(P, tree, route) {
    const url = `http://127.0.0.1:${TREES[tree].port}${route}`;
    await P.page.goto(url, { waitUntil: "load", timeout: 30000 });
}

// Recording ---------------------------------------------------------------------------
export async function rec(P, track, opts = {}) {
    await P.page.evaluate(([t, o]) => window.__sampler.start(t, o), [track, { hook: opts.hook || "ro", anims: opts.anims !== false }]);
}
export async function mark(P, name) {
    await P.page.evaluate((n) => window.__sampler.mark(n), name);
}
export async function stop(P) {
    return await P.page.evaluate(() => window.__sampler.stop());
}
// In-page waiter (rAF): resolves once the channel of the element matching spec.sel has gone
// `fraction` of the way from `from` to `to`, or after maxMs. Channels: x y w h cx cy op clipH.
export async function waitFraction(P, spec) {
    return await P.page.evaluate(
        ({ sel, ch, from, to, fraction, maxMs = 3000 }) =>
            new Promise((resolve) => {
                const lenOf = (tok, h) => {
                    tok = tok.trim();
                    let m;
                    if ((m = tok.match(/^(-?[\d.]+)px$/))) return +m[1];
                    if ((m = tok.match(/^(-?[\d.]+)%$/))) return (+m[1] * h) / 100;
                    if ((m = tok.match(/^calc\((.*)\)$/))) {
                        let sum = 0, sign = 1;
                        for (const p of m[1].replace(/\s*([+-])\s+/g, " $1 ").split(/\s+/)) {
                            if (p === "+") sign = 1; else if (p === "-") sign = -1; else { sum += sign * lenOf(p, h); sign = 1; }
                        }
                        return sum;
                    }
                    return tok === "0" ? 0 : NaN;
                };
                const split = (s) => { const o = []; let d = 0, c = ""; for (const x of s) { if (x === "(") d++; if (x === ")") d--; if (x === " " && !d) { if (c) o.push(c); c = ""; } else c += x; } if (c) o.push(c); return o; };
                const read = () => {
                    const e = document.querySelector(sel);
                    if (!e) return NaN;
                    const r = e.getBoundingClientRect();
                    if (ch === "x") return r.x; if (ch === "y") return r.y; if (ch === "w") return r.width; if (ch === "h") return r.height;
                    if (ch === "cx") return r.x + r.width / 2; if (ch === "cy") return r.y + r.height / 2;
                    const cs = getComputedStyle(e);
                    if (ch === "op") return parseFloat(cs.opacity);
                    if (ch === "clipH") {
                        const m = String(cs.clipPath).match(/^inset\((.*)\)$/);
                        if (!m) return r.height;
                        const t = split(m[1].split(/\sround\s/)[0]).map((x) => lenOf(x, r.height));
                        const top = t[0], bottom = t.length > 2 ? t[2] : t[0];
                        return Math.min(r.height, r.height - bottom) - Math.max(0, top);
                    }
                    if (ch.startsWith("p:")) return parseFloat(cs.getPropertyValue(ch.slice(2)));
                    return NaN;
                };
                const t0 = performance.now();
                const step = () => {
                    const v = read();
                    if (Number.isFinite(v) && (v - from) / (to - from) >= fraction) return resolve({ done: true, v, ms: performance.now() - t0 });
                    if (performance.now() - t0 > maxMs) return resolve({ done: false, v, ms: performance.now() - t0 });
                    requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
            }),
        spec,
    );
}
// wait until nothing tracked changed for quietMs (after something changed, if afterChange)
// A change must land after this call (within noChangeMs) unless afterChange is false.
export async function settle(P, quietMs = 300, maxMs = 4000, afterChange = true, noChangeMs = 1500) {
    const t0 = Date.now();
    const base = await P.page.evaluate(() => window.__sampler.quiet());
    while (Date.now() - t0 < maxMs) {
        const q = await P.page.evaluate(() => window.__sampler.quiet());
        const changed = q.lastChange > base.lastChange;
        if (changed && q.now - q.lastChange >= quietMs) return true;
        if (!changed && (!afterChange || q.now - base.now >= noChangeMs)) {
            if (!afterChange && q.now - base.now < quietMs) {
                await sleep(40);
                continue;
            }
            return false;
        }
        await sleep(40);
    }
    return false;
}

export function val(o, ch) {
    if (!o) return NaN;
    if (ch === "cx") return o.x + o.w / 2;
    if (ch === "cy") return o.y + o.h / 2;
    if (ch === "op") return parseFloat(o.op);
    if (ch === "eop") return o.eop;
    if (ch === "scY" || ch === "scX") {
        const p = String(o.sc || "1").split(/\s+/).map(parseFloat);
        return ch === "scX" ? p[0] : p.length > 1 ? p[1] : p[0];
    }
    if (ch === "trX" || ch === "trY") {
        const p = String(o.tr || "0px").split(/\s+/).map(parseFloat);
        return ch === "trX" ? p[0] || 0 : p[1] || 0;
    }
    if (ch === "tfX" || ch === "tfY" || ch === "tfS") {
        const m = String(o.tf || "none").match(/matrix\(([^)]+)\)/);
        if (!m) return ch === "tfS" ? 1 : 0;
        const a = m[1].split(",").map(parseFloat);
        return ch === "tfX" ? a[4] : ch === "tfY" ? a[5] : a[3];
    }
    if (ch === "clipH") return clipVisible(o);
    if (ch.startsWith("p:") || ch.startsWith("s:")) return parseFloat(o[ch]);
    const v = o[ch];
    return typeof v === "number" ? v : parseFloat(v);
}

// visible block size through an inset() clip: h - top - bottom (percent and calc resolved
// against the box height). No clip: the box height.
function resolveLen(tok, h) {
    tok = tok.trim();
    let m;
    if ((m = tok.match(/^(-?[\d.]+)px$/))) return +m[1];
    if ((m = tok.match(/^(-?[\d.]+)%$/))) return (+m[1] * h) / 100;
    if ((m = tok.match(/^calc\((.*)\)$/))) {
        const parts = m[1].replace(/\s*([+-])\s+/g, " $1 ").split(/\s+/);
        let sum = 0,
            sign = 1;
        for (const p of parts) {
            if (p === "+") sign = 1;
            else if (p === "-") sign = -1;
            else {
                sum += sign * resolveLen(p, h);
                sign = 1;
            }
        }
        return sum;
    }
    if (tok === "0") return 0;
    return NaN;
}
function splitTop(s) {
    const out = [];
    let depth = 0,
        cur = "";
    for (const ch of s) {
        if (ch === "(") depth++;
        if (ch === ")") depth--;
        if (ch === " " && depth === 0) {
            if (cur) out.push(cur);
            cur = "";
        } else cur += ch;
    }
    if (cur) out.push(cur);
    return out;
}
export function clipVisible(o) {
    if (!o) return NaN;
    const c = String(o.clip || "none");
    const m = c.match(/^inset\((.*)\)$/);
    if (!m) return o.h;
    const body = m[1].split(/\sround\s/)[0];
    const t = splitTop(body).map((x) => resolveLen(x, o.h));
    const top = t[0],
        bottom = t.length > 2 ? t[2] : t[0];
    // the plate's own visible block size: the clip past the box (the shadow's bleed) is not plate
    return +(Math.min(o.h, o.h - bottom) - Math.max(0, top)).toFixed(2);
}

export function series(res, as, ch) {
    return res.rows.map((r) => ({ i: r.i, t: r.t, v: val(r.el[as], ch), marks: r.marks || [] }));
}

// Frame budget over [fromT, toT] (ms from recording start). Phone budget: 60 Hz.
export function frameStats(res, fromT = -Infinity, toT = Infinity) {
    const ts = res.rows.map((r) => r.t).filter((t) => t >= fromT && t <= toT);
    const d = [];
    for (let k = 1; k < ts.length; k++) d.push(ts[k] - ts[k - 1]);
    if (!d.length) return { frames: 0 };
    const over16 = d.filter((x) => x > 16.7).length;
    const over33 = d.filter((x) => x > 33.4).length;
    const dropped = d.reduce((s, x) => s + Math.max(0, Math.round(x / 16.67) - 1), 0);
    const sorted = [...d].sort((a, b) => a - b);
    return {
        frames: d.length,
        durMs: +(ts[ts.length - 1] - ts[0]).toFixed(1),
        medianMs: +sorted[Math.floor(sorted.length / 2)].toFixed(1),
        longestMs: +sorted[sorted.length - 1].toFixed(1),
        pctOver16: +((100 * over16) / d.length).toFixed(1),
        pctOver33: +((100 * over33) / d.length).toFixed(1),
        dropped60: dropped,
    };
}

// motion window of a channel: first and last frame that changed (after fromT)
export function motionWindow(s, fromT = -Infinity, eps = 0.01) {
    let a = -1,
        b = -1;
    for (let k = 1; k < s.length; k++) {
        if (s[k].t < fromT) continue;
        if (Number.isFinite(s[k].v) && Number.isFinite(s[k - 1].v) && Math.abs(s[k].v - s[k - 1].v) > eps) {
            if (a < 0) a = k - 1;
            b = k;
        } else if (!Number.isFinite(s[k].v) !== !Number.isFinite(s[k - 1].v)) {
            if (a < 0) a = k - 1;
            b = k;
        }
    }
    return a < 0 ? null : { a, b, t0: s[a].t, t1: s[b].t, ms: +(s[b].t - s[a].t).toFixed(1) };
}

// Reversal reading around the frame where mark `name` landed.
// A jump: a single-frame change larger than 3x the neighbouring frames' change
// (mean of |step| over the 2 frames before and the 2 after).
export function reversal(s, name, win = 10, travel = null) {
    const k0 = s.findIndex((r) => r.marks.includes(name));
    if (k0 < 0) return { error: "no mark " + name };
    const lo = Math.max(1, k0 - win),
        hi = Math.min(s.length - 1, k0 + win * 3);
    const steps = [];
    for (let k = lo; k <= hi; k++) steps.push({ k, step: s[k].v - s[k - 1].v, v: s[k].v });
    const values = s.slice(Math.max(0, k0 - 4), Math.min(s.length, k0 + 16)).map((r) => (Number.isFinite(r.v) ? +r.v.toFixed(3) : null));
    let worst = { ratio: 0 };
    for (let j = 0; j < steps.length; j++) {
        const st = Math.abs(steps[j].step);
        if (!Number.isFinite(st) || st < 1e-6) continue;
        const nb = [steps[j - 2], steps[j - 1], steps[j + 1], steps[j + 2]].filter(Boolean).map((x) => Math.abs(x.step)).filter(Number.isFinite);
        const m = nb.length ? nb.reduce((a, b) => a + b, 0) / nb.length : 0;
        const ratio = m > 1e-6 ? st / m : st > 0 ? Infinity : 0;
        if (steps[j].k >= k0 - 1 && ratio > worst.ratio) worst = { ratio: +ratio.toFixed(2), k: steps[j].k, step: +steps[j].step.toFixed(3), nbMean: +m.toFixed(3), from: +(s[steps[j].k - 1].v ?? NaN).toFixed(3), to: +(s[steps[j].k].v ?? NaN).toFixed(3) };
    }
    // direction before and after the mark
    const pre = s[k0].v - s[Math.max(0, k0 - 3)].v;
    let post = 0;
    for (let k = k0 + 1; k < Math.min(s.length, k0 + 6); k++) post += s[k].v - s[k - 1].v;
    const atMark = s[k0].v;
    // does the value after the mark continue from where it was (within 3x neighbour step)?
    const T = Math.abs(travel || span(s)) || 1;
    const stepPct = worst.step != null ? +((100 * Math.abs(worst.step)) / T).toFixed(1) : 0;
    worst.pctTravel = stepPct;
    const flipped = Math.sign(pre) && Math.sign(post) && Math.sign(pre) !== Math.sign(post);
    // a jump: > 3x the neighbours AND more than 6 % of the travel in one frame
    const verdict = worst.ratio > 3 && stepPct > 6 ? "jumps" : flipped ? (worst.ratio > 3 ? "reverses from position (speed flips)" : "reverses from position") : Math.abs(post) < 1e-3 ? "holds" : "continues";
    return { mark: name, frame: k0, atMark: +atMark.toFixed(3), pre: +pre.toFixed(3), post: +post.toFixed(3), worst, verdict, values };
}
function span(s) {
    const v = s.map((r) => r.v).filter(Number.isFinite);
    return v.length ? Math.max(...v) - Math.min(...v) : 0;
}

export function animsSummary(res) {
    const seen = new Map();
    for (const a of res.anims || []) {
        const key = `${a.kind}|${a.name}|${a.target}|${a.duration}|${a.easing}|${(a.keyframeEasings || []).join(",")}`;
        if (!seen.has(key)) seen.set(key, { t: a.t, kind: a.kind, name: a.name, target: a.target, duration: a.duration, delay: a.delay, easing: a.easing, kfe: (a.keyframeEasings || []).join(",") });
    }
    return [...seen.values()];
}

export function save(rel, obj) {
    const p = join(LT, rel);
    mkdirSync(dirname(p), { recursive: true });
    writeFileSync(p, typeof obj === "string" ? obj : JSON.stringify(obj, null, 1));
    return p;
}

// Touch through CDP (chromium); webkit falls back to page.touchscreen.tap only.
export async function touch(P, type, x, y) {
    if (P.cdp) {
        await P.cdp.send("Input.dispatchTouchEvent", {
            type,
            touchPoints: type === "touchEnd" || type === "touchCancel" ? [] : [{ x, y, id: 1, radiusX: 4, radiusY: 4, force: 1 }],
        });
    }
}
export async function touchDrag(P, from, to, ms = 300, hz = 60, { release = true, cancel = false } = {}) {
    await touch(P, "touchStart", from[0], from[1]);
    const n = Math.max(1, Math.round((ms / 1000) * hz));
    const t0 = Date.now();
    for (let k = 1; k <= n; k++) {
        const f = k / n;
        await touch(P, "touchMove", from[0] + (to[0] - from[0]) * f, from[1] + (to[1] - from[1]) * f);
        const due = t0 + (k * 1000) / hz;
        const w = due - Date.now();
        if (w > 0) await sleep(w);
    }
    if (cancel) await touch(P, "touchCancel", 0, 0);
    else if (release) await touch(P, "touchEnd", 0, 0);
}
export async function mouseDrag(P, from, to, ms = 300, hz = 60, { release = true } = {}) {
    const m = P.page.mouse;
    await m.move(from[0], from[1]);
    await m.down();
    const n = Math.max(1, Math.round((ms / 1000) * hz));
    const t0 = Date.now();
    for (let k = 1; k <= n; k++) {
        const f = k / n;
        await m.move(from[0] + (to[0] - from[0]) * f, from[1] + (to[1] - from[1]) * f);
        const w = t0 + (k * 1000) / hz - Date.now();
        if (w > 0) await sleep(w);
    }
    if (release) await m.up();
}
export async function box(P, sel) {
    return await P.page.evaluate((s) => {
        const e = document.querySelector(s);
        if (!e) return null;
        const r = e.getBoundingClientRect();
        return { x: r.x, y: r.y, w: r.width, h: r.height, cx: r.x + r.width / 2, cy: r.y + r.height / 2 };
    }, sel);
}
export async function tap(P, sel) {
    const b = await box(P, sel);
    if (!b) throw new Error("no " + sel);
    if (P.c.touch && P.cdp) {
        await touch(P, "touchStart", b.cx, b.cy);
        await sleep(40);
        await touch(P, "touchEnd", 0, 0);
    } else await P.page.click(sel);
}
