// exits audit shared library. One browser per run, one new context per cell, all closed
// in finally. The in-page sampler (SAMPLER below) records one row per rendered frame for
// the surface selector: presence, opacity (own and effective), transform longhands,
// clip-path, filter, box, data-state, and the running animations on the surface subtree.
import { createRequire } from "node:module";
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

export const HERE = dirname(fileURLToPath(import.meta.url));
export const EX = resolve(HERE, "..");
export const TREES = {
    "11.0.2": { dir: join(EX, "trees/v11.0.2"), port: 5431 },
    tip: { dir: join(EX, "trees/tip-95cd5bb3"), port: 5432 },
};
const require = createRequire(join(TREES["11.0.2"].dir, "package.json"));
export const pw = require("playwright");
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const WK2287 = join(homedir(), "Library/Caches/ms-playwright/webkit-2287/pw_run.sh");

export async function withBrowser(engine, fn) {
    let browser;
    try {
        const opts = { headless: true };
        if (engine === "webkit" && process.env.WK !== "default" && existsSync(WK2287)) opts.executablePath = WK2287;
        browser = await pw[engine].launch(opts);
        return await fn(browser);
    } finally {
        if (browser) await browser.close().catch(() => {});
    }
}

export const SAMPLER = `(() => {
  if (window.__ex) return;
  const pick = (sel) => {
    const l = [...document.querySelectorAll(sel)];
    if (!l.length) return null;
    // the newest visible one (portals append), else the last
    for (let i = l.length - 1; i >= 0; i--) { const r = l[i].getBoundingClientRect(); if (r.width && r.height) return l[i]; }
    return l[l.length - 1];
  };
  const effOp = (e) => { let o = 1; for (let n = e; n && n.nodeType === 1; n = n.parentElement) { const cs = getComputedStyle(n); o *= parseFloat(cs.opacity); if (cs.visibility === 'hidden' || cs.display === 'none') return 0; } return +o.toFixed(4); };
  const snap = (e) => {
    if (!e) return null;
    const cs = getComputedStyle(e); const r = e.getBoundingClientRect();
    let anims = [];
    try { anims = e.getAnimations({ subtree: true }).filter(a => a.playState === 'running' || a.playState === 'pending').map(a => (a.animationName || a.transitionProperty || a.id || 'waapi') + ':' + Math.round(a.effect?.getComputedTiming?.().duration || 0)); } catch (_) {}
    return { op: +parseFloat(cs.opacity).toFixed(4), eop: effOp(e), sc: cs.scale, tr: cs.translate, tf: cs.transform === 'none' ? 'none' : cs.transform, clip: cs.clipPath, fl: cs.filter, x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), st: e.getAttribute('data-state'), bg: cs.backgroundColor, bfv: cs.backdropFilter || cs.webkitBackdropFilter || '', c0: e.firstElementChild ? +parseFloat(getComputedStyle(e.firstElementChild).opacity).toFixed(3) : 1, an: [...new Set(anims)].join(' ') };
  };
  const S = { rows: [], marks: [], on: false };
  window.__ex = {
    start(sels) {
      S.rows = []; S.marks = []; S.on = true; S.sels = sels; const t0 = performance.now(); S.t0 = t0;
      const loop = () => { if (!S.on) return; const t = performance.now() - t0; const row = { t: +t.toFixed(1) };
        for (const [k, sel] of Object.entries(sels)) { const n = document.querySelectorAll(sel).length; row[k] = n ? { n, ...snap(pick(sel)) } : null; }
        if (S.pend.length) { row.m = S.pend.join(','); S.pend = []; }
        S.rows.push(row); requestAnimationFrame(loop); };
      S.pend = []; requestAnimationFrame(loop);
    },
    mark(n) { S.pend.push(n); },
    stop() { S.on = false; return { rows: S.rows }; },
    glass(sel) {
      const e = pick(sel); if (!e) return null;
      const read = (n, pseudo) => { const cs = getComputedStyle(n, pseudo); return { bf: cs.backdropFilter || cs.webkitBackdropFilter || 'none', wbf: cs.webkitBackdropFilter, bg: cs.backgroundColor, bgi: cs.backgroundImage === 'none' ? 'none' : cs.backgroundImage.slice(0, 80), bd: cs.borderTopWidth + ' ' + cs.borderTopStyle + ' ' + cs.borderTopColor, sh: cs.boxShadow === 'none' ? 'none' : cs.boxShadow.slice(0, 160), op: cs.opacity }; };
      const cls = (n) => [...n.classList].filter(c => /glass|surface|plate|tier|floating|opaque|solid|bg-/.test(c)).join(' ');
      const me = { tag: e.tagName.toLowerCase(), slot: e.getAttribute('data-slot'), surface: e.getAttribute('data-surface'), form: e.getAttribute('data-form'), cls: cls(e), ...read(e), before: read(e, '::before'), after: read(e, '::after') };
      // the nearest element in the subtree (depth 3) or ancestors (4 up) carrying a backdrop-filter
      let found = null;
      const walk = (n, d) => { if (found || d > 3) return; for (const c of n.children) { const r = read(c); if (r.bf && r.bf !== 'none') { found = { where: 'child d' + d, tag: c.tagName.toLowerCase(), cls: cls(c), ...r }; return; } walk(c, d + 1); } };
      if (!me.bf || me.bf === 'none') walk(e, 1);
      let up = e.parentElement, k = 1; while (!found && up && k <= 4 && (!me.bf || me.bf === 'none')) { const r = read(up); if (r.bf && r.bf !== 'none') found = { where: 'ancestor ' + k, tag: up.tagName.toLowerCase(), cls: cls(up), ...r }; up = up.parentElement; k++; }
      return { me, found, dark: document.documentElement.classList.contains('dark') };
    },
  };
})();`;

// A cell: { w, h, touch, scheme, rm }
export async function cell(browser, engine, c, fn) {
    const opts = {
        viewport: { width: c.w, height: c.h },
        deviceScaleFactor: c.touch ? 3 : 2,
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
        let cdp = null;
        if (engine === "chromium") cdp = await context.newCDPSession(page);
        return await fn({ page, cdp, engine, c, errors, context });
    } finally {
        if (context) await context.close().catch(() => {});
    }
}

export async function gotoComp(P, tree, name) {
    const url = `http://127.0.0.1:${TREES[tree].port}/?c=${name}${P.c.scheme === "dark" ? "&scheme=dark" : ""}`;
    await P.page.goto(url, { waitUntil: "load", timeout: 30000 });
    await P.page.waitForFunction(() => window.__animReady === true || !!window.__animError, null, { timeout: 20000 });
    const err = await P.page.evaluate(() => window.__animError || null);
    if (err) throw new Error("page error: " + err);
    await sleep(350);
}

export async function box(P, sel) {
    return await P.page.evaluate((s) => {
        const l = [...document.querySelectorAll(s)];
        const e = l.find((x) => { const r = x.getBoundingClientRect(); return r.width && r.height; }) || l[0];
        if (!e) return null;
        e.scrollIntoView({ block: "nearest", inline: "nearest" });
        const r = e.getBoundingClientRect();
        return { x: r.x, y: r.y, w: r.width, h: r.height, cx: r.x + r.width / 2, cy: r.y + r.height / 2 };
    }, sel);
}

async function cdpTouch(P, type, x, y) {
    await P.cdp.send("Input.dispatchTouchEvent", {
        type,
        touchPoints: type === "touchEnd" || type === "touchCancel" ? [] : [{ x, y, id: 1, radiusX: 4, radiusY: 4, force: 1 }],
    });
}
// A real tap at a point: CDP touch in Chromium; Playwright's touchscreen in WebKit.
export async function tapAt(P, x, y) {
    if (P.c.touch) {
        if (P.cdp) {
            await cdpTouch(P, "touchStart", x, y);
            await sleep(50);
            await cdpTouch(P, "touchEnd", x, y);
        } else await P.page.touchscreen.tap(x, y);
    } else await P.page.mouse.click(x, y);
}
export async function tap(P, sel) {
    const b = await box(P, sel);
    if (!b) throw new Error("no " + sel);
    await tapAt(P, b.cx, b.cy);
}
// A swipe (Chromium CDP touch only; WebKit has no touch-move in Playwright).
export async function swipe(P, from, to, ms = 220, hz = 60) {
    if (!P.cdp) {
        // mouse drag stands in on WebKit or desktop
        const m = P.page.mouse;
        await m.move(...from); await m.down();
        const n = Math.round((ms / 1000) * hz);
        for (let k = 1; k <= n; k++) { await m.move(from[0] + ((to[0] - from[0]) * k) / n, from[1] + ((to[1] - from[1]) * k) / n); await sleep(1000 / hz); }
        await m.up();
        return "mouse";
    }
    if (!P.c.touch) {
        const m = P.page.mouse;
        await m.move(...from); await m.down();
        const n = Math.round((ms / 1000) * hz);
        for (let k = 1; k <= n; k++) { await m.move(from[0] + ((to[0] - from[0]) * k) / n, from[1] + ((to[1] - from[1]) * k) / n); await sleep(1000 / hz); }
        await m.up();
        return "mouse";
    }
    await cdpTouch(P, "touchStart", from[0], from[1]);
    const n = Math.max(2, Math.round((ms / 1000) * hz));
    for (let k = 1; k <= n; k++) {
        await cdpTouch(P, "touchMove", from[0] + ((to[0] - from[0]) * k) / n, from[1] + ((to[1] - from[1]) * k) / n);
        await sleep(1000 / hz);
    }
    await cdpTouch(P, "touchEnd", to[0], to[1]);
    return "touch";
}

export async function rec(P, sels) { await P.page.evaluate((s) => window.__ex.start(s), sels); }
export async function mark(P, n) { await P.page.evaluate((x) => window.__ex.mark(x), n); }
export async function stop(P) { return await P.page.evaluate(() => window.__ex.stop()); }

export function saveRows(rel, obj) {
    const p = join(EX, "rows", rel + ".json.gz");
    mkdirSync(dirname(p), { recursive: true });
    writeFileSync(p, gzipSync(JSON.stringify(obj)));
    return p;
}
export function saveJson(rel, obj) {
    const p = join(EX, rel);
    mkdirSync(dirname(p), { recursive: true });
    writeFileSync(p, JSON.stringify(obj, null, 1));
    return p;
}

// ── analysis ──────────────────────────────────────────────────────────────────────────
const num = (s) => String(s ?? "").match(/-?[\d.]+/g)?.map(Number) || [];
function sig(o) {
    if (!o) return null;
    return { eop: o.eop, sc: num(o.sc).join(","), tr: num(o.tr).join(","), tf: num(o.tf).map((v) => v.toFixed(2)).join(","), clip: num(o.clip).map((v) => v.toFixed(1)).join(","), fl: num(o.fl).map((v) => v.toFixed(2)).join(","), bg: o.bg || "", bfv: o.bfv || "", c0: o.c0 ?? 1, x: o.x, y: o.y, w: o.w, h: o.h };
}
let VP = { w: 1e9, h: 1e9 };
export function setViewport(w, h) { VP = { w, h }; }
const onScreen = (o) => Math.max(0, Math.min(o.x + o.w, VP.w) - Math.max(o.x, 0)) * Math.max(0, Math.min(o.y + o.h, VP.h) - Math.max(o.y, 0));
// visible block fraction through an inset() clip (percent and calc resolved against the box)
function lenOf(tok, h) { tok = tok.trim(); let m; if ((m = tok.match(/^(-?[\d.]+)px$/))) return +m[1]; if ((m = tok.match(/^(-?[\d.]+)%$/))) return (+m[1] * h) / 100; if ((m = tok.match(/^calc\((.*)\)$/))) { let sum = 0, sign = 1; for (const p of m[1].replace(/\s*([+-])\s+/g, " $1 ").split(/\s+/)) { if (p === "+") sign = 1; else if (p === "-") sign = -1; else { sum += sign * lenOf(p, h); sign = 1; } } return sum; } return tok === "0" ? 0 : NaN; }
function splitTop(s) { const o = []; let d = 0, c = ""; for (const x of s) { if (x === "(") d++; if (x === ")") d--; if (x === " " && !d) { if (c) o.push(c); c = ""; } else c += x; } if (c) o.push(c); return o; }
function clipFrac(o) { const m = String(o.clip || "none").match(/^inset\((.*)\)$/); if (!m || !o.h) return 1; const t = splitTop(m[1].split(/\sround\s/)[0]).map((x) => lenOf(x, o.h)); const top = t[0], bottom = t.length > 2 ? t[2] : t[0]; const v = Math.min(o.h, o.h - bottom) - Math.max(0, top); return Number.isFinite(v) ? Math.max(0, v) / o.h : 1; }
const visible = (o) => !!o && o.eop > 0.01 && o.w > 0.5 && o.h > 0.5;
function changed(a, b) {
    const A = sig(a), B = sig(b);
    if (!A !== !B) return ["presence"];
    if (!A) return [];
    const out = [];
    if (Math.abs(A.eop - B.eop) > 0.004) out.push("opacity");
    for (const k of ["sc", "tr", "tf", "clip", "fl"]) if (A[k] !== B[k]) out.push({ sc: "scale", tr: "translate", tf: "transform", clip: "clip-path", fl: "filter" }[k]);
    if (A.bg !== B.bg) out.push("background");
    if (A.bfv !== B.bfv) out.push("backdrop-filter");
    if (Math.abs(A.c0 - B.c0) > 0.004) out.push("content opacity");
    if (Math.abs(A.x - B.x) > 0.5 || Math.abs(A.y - B.y) > 0.5) out.push("position");
    if (Math.abs(A.w - B.w) > 0.5 || Math.abs(A.h - B.h) > 0.5) out.push("size");
    return out;
}
// Read one motion after the mark: the frames over which the surface `k` changed.
// kind: "enter" | "leave". A leave ends when the surface is gone (absent or invisible)
// or stops changing; "CUT" when the whole change lands within two frames.
export function readMotion(res, k, markName, kind, quietMs = 250) {
    const rows = res.rows;
    const i0 = rows.findIndex((r) => (r.m || "").split(",").includes(markName));
    if (i0 < 0) return { error: "no mark" };
    let first = -1, last = -1;
    const what = new Set();
    // the action can land before the mark's own frame paints, so the mark frame is compared too
    const j0 = Math.max(1, i0);
    let lastChangeT = rows[i0].t;
    for (let i = j0; i < rows.length; i++) {
        const ch = changed(rows[i - 1][k], rows[i][k]);
        // ignore changes on an invisible surface (both frames invisible)
        const inv = !visible(rows[i - 1][k]) && !visible(rows[i][k]);
        if (ch.length && !inv) {
            if (first < 0) first = i;
            last = i;
            ch.forEach((c) => what.add(c));
            lastChangeT = rows[i].t;
        } else if (first >= 0 && rows[i].t - lastChangeT > quietMs) break;
    }
    const startVis = visible(rows[j0 - 1][k]);
    const endRow = rows[last >= 0 ? last : i0];
    const endVis = visible(endRow?.[k]);
    if (first < 0) return { kind, frames: 0, ms: 0, verdict: kind === "leave" ? (startVis ? "STAYED" : "ABSENT") : startVis ? "ALREADY" : "NEVER", startVis };
    const frames = last - first + 1;
    const ms = +(rows[last].t - rows[first - 1].t).toFixed(1);
    const latency = +(rows[first].t - rows[i0].t).toFixed(1);
    // intermediate (visible, between start and end) frames
    const inter = rows.slice(first, last).filter((r) => visible(r[k])).length;
    let verdict;
    if (kind === "inplace") verdict = frames <= 2 ? "CUT" : "tween";
    else if (kind === "leave") verdict = endVis && startVis ? "STAYED" : frames <= 2 || inter === 0 ? "CUT" : "tween";
    else verdict = !endVis ? "NEVER" : frames <= 2 || inter === 0 ? "CUT" : "tween";
    // a teleport: the visible surface moves more than 80 px between two frames (it leaves
    // its own place in one frame and finishes its exit somewhere else)
    let jump = 0, travel = 0, matFlip = false;
    for (let i = Math.max(1, first); i <= last; i++) {
        const a = rows[i - 1][k], b = rows[i][k];
        if (visible(a) && visible(b)) {
            const d = Math.max(Math.abs(a.y - b.y), Math.abs(a.x - b.x));
            jump = Math.max(jump, d); travel += d;
            if ((a.bfv || "none") !== (b.bfv || "none")) matFlip = true;
        }
    }
    if (kind === "leave" && verdict === "tween" && jump > 80 && jump > 0.6 * travel) verdict = "CUT(teleport)";
    // a tail cut: the surface is removed while a large part of it is still painted
    const aOf = (c) => { const m = String(c || "").match(/\/\s*([\d.]+)\s*\)$/) || String(c || "").match(/^rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/); return m ? +m[1] : c ? 1 : 0; };
    const weight = (o) => (!visible(o) ? 0 : o.eop * (aOf(o.bg) > 0.02 || o.c0 > 0.02 ? 1 : 0) * onScreen(o) * clipFrac(o));
    let tail = 0;
    if (kind === "leave") {
        const w0 = weight(rows[j0 - 1][k]);
        for (let i = j0; i < rows.length; i++) if (!rows[i][k] && rows[i - 1][k]) { tail = w0 ? weight(rows[i - 1][k]) / w0 : 0; break; }
        if (verdict === "tween" && tail > 0.2) verdict = "CUT(tail)";
    }
    const opSeries = rows.slice(i0, last + 2).map((r) => (r[k] ? r[k].eop : null));
    const anims = [...new Set(rows.slice(i0, last + 2).map((r) => r[k]?.an).filter(Boolean))];
    const states = [...new Set(rows.slice(i0, last + 2).map((r) => r[k]?.st ?? (r[k] ? "-" : "absent")))];
    return { kind, verdict, frames, ms, latency, inter, jump: +jump.toFixed(1), matFlip, tail: +tail.toFixed(2), what: [...what], startVis, endVis, op: opSeries.slice(0, 40), anims, states };
}
