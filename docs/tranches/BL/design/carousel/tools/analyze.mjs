#!/usr/bin/env node
// analyze.mjs — reads the carousel study's cell files (record/*.json, from carousel-probe.mjs)
// and writes record/summary.json: per cell and per gesture, the numbers RECORD.md cites.
// No browser.
//
//   node analyze.mjs [record-dir]
//
// Per gesture (from its mark to the next gesture's mark, or the end):
//   frames      rendered-frame intervals: median, p95, max, count over 25 ms
//   motion      the visible picture's travel: the content node's centre (box, so every
//               transform on it and its parents counts), its first and last moving frame,
//               the settle, the landing error against the snap, the overshoot
//   uneven      steps that break the curve: reversals mid-motion, stalls (a still frame
//               between moving ones), and abrupt speed changes (a step more than twice or
//               less than half the one before, both over 2 px)
//   commit      the frame the active index changed, against the release and the motion
//   calls       scroll calls the page made during the gesture (library or consumer)
//   writes      attribute writes on members and pager: inert, aria-hidden, data-state,
//               style, class; per frame of motion
//   long        long tasks and long animation frames overlapping the gesture
//   pictures    for each slide on screen during the gesture: was its picture loaded and
//               painted (Chromium element timing) on every frame it was visible
//   trace       style, layout, paint and decode counts (traced cells only)
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const DIR = resolve(process.argv[2] || join(HERE, "../record"));
const GESTURES = ["swipe", "flick", "carry", "wheel", "next", "prev", "dot"];

const q = (a, p) => {
    if (!a.length) return null;
    const s = [...a].sort((x, y) => x - y);
    return s[Math.min(s.length - 1, Math.floor(p * (s.length - 1) + 0.5))];
};
const r1 = (x) => (x == null || !Number.isFinite(x) ? null : +x.toFixed(1));
const r2 = (x) => (x == null || !Number.isFinite(x) ? null : +x.toFixed(2));
const arr = (c, n) => (c == null ? Array(n).fill(null) : Array.isArray(c) ? c : Array(n).fill(c.const));

function load(file) {
    return JSON.parse(readFileSync(join(DIR, file), "utf8"));
}

function analyzeCell(d) {
    const { series, marks } = d;
    const n = series.t.length;
    const T = series.now;
    const ch = series.ch;
    const glide = d.meta.cell.source === "daraksha";
    const out = { id: d.meta.cell.id, traced: !!d.trace, engine: d.meta.engine, source: d.meta.cell.source, variant: d.meta.cell.variant || "", input: d.meta.cell.input, w: d.meta.cell.w, browser: d.meta.browserVersion, load: d.meta.load, frames: n, activeBefore: d.meta.activeBefore?.dot, activeAfter: d.meta.activeAfter?.dot, watch: pick(d.meta.watch, ["members", "pitch", "memberW", "clientW", "snapType", "snapStop", "snapchangeSupported", "scrollendSupported"]), figures: figureSum(d.meta.figures), errors: d.meta.consoleErrors?.length || 0, gestures: [] };

    // keys
    const keys = Object.keys(ch);
    const byPrefix = (p) => keys.filter((k) => k.split("#")[0] === p).sort((a, b) => +a.split("#")[1] - +b.split("#")[1]);
    const members = byPrefix("m");
    const contents = byPrefix(glide ? "dpic" : "mc");
    const strip = ch.strip;
    const pitch = d.meta.watch?.pitch || (members.length > 1 ? arr(ch[members[1]].x, n)[0] - arr(ch[members[0]].x, n)[0] : null);
    const stripBox = d.meta.watch?.stripBox;

    // the active index per frame (members' data-state, else the dots' aria-current)
    const activeAt = Array(n).fill(null);
    if (members.length && ch[members[0]].attrs?.["data-state"]) {
        for (let f = 0; f < n; f++) activeAt[f] = members.findIndex((k) => ch[k].attrs["data-state"][f] === "active");
    } else {
        const dots = byPrefix("dot");
        if (dots.length && ch[dots[0]].attrs?.["aria-current"])
            for (let f = 0; f < n; f++) activeAt[f] = dots.findIndex((k) => ch[k].attrs["aria-current"][f] === "true");
    }
    const dotAt = Array(n).fill(null);
    {
        const dots = byPrefix("dot");
        if (dots.length && ch[dots[0]].attrs?.["aria-current"])
            for (let f = 0; f < n; f++) dotAt[f] = dots.findIndex((k) => ch[k].attrs["aria-current"][f] === "true");
    }

    // the visible picture: the centre of each content node; the reference is the one that
    // ends a gesture nearest the strip's centre (the landing slide).
    const cx = contents.map((k) => {
        const x = arr(ch[k].x, n);
        const w = arr(ch[k].w, n);
        return x.map((v, f) => (v == null || w[f] == null ? null : v + w[f] / 2));
    });
    const sl = strip ? arr(strip.sl ?? { const: 0 }, n) : null;

    const gm = marks.filter((m) => GESTURES.includes(m.name));
    for (let g = 0; g < gm.length; g++) {
        const m = gm[g];
        const f0 = rowAt(T, m.t);
        const tEnd = g + 1 < gm.length ? gm[g + 1].t : T[n - 1] + 1;
        const f1 = Math.max(f0, rowAt(T, tEnd) - 1);
        const up = marks.find((k) => k.name === m.name + "-up" || k.name === m.name + "-end");
        const G = { name: m.name, t0: r1(m.t), frames: f1 - f0 + 1, upAt: up ? r1(up.t - m.t) : null };

        // frame intervals over the gesture
        const dts = [];
        for (let f = f0 + 1; f <= f1; f++) dts.push(series.t[f] - series.t[f - 1]);
        G.dt = { median: r2(q(dts, 0.5)), p95: r2(q(dts, 0.95)), max: r2(Math.max(...dts)), over25: dts.filter((x) => x > 25).length, over34: dts.filter((x) => x > 34).length };

        // the landing slide: content nearest the strip centre at the gesture's last frame
        const centre = stripBox ? stripBox[0] + stripBox[2] / 2 : glide ? null : null;
        let ref = 0;
        if (glide) {
            // the picture standing at the end that is not leaving and not a neighbour
            ref = contents.findIndex((k, i) => cx[i][f1] != null);
        } else if (centre != null) {
            let best = Infinity;
            cx.forEach((c, i) => {
                const v = c[f1];
                if (v != null && Math.abs(v - centre) < best) {
                    best = Math.abs(v - centre);
                    ref = i;
                }
            });
        }
        G.landing = ref;
        let pos = cx[ref] ? cx[ref].slice(f0, f1 + 1) : [];
        if (glide) {
            // the picture on show (it follows the hand, then leaves); the arrival apart
            const r = glideRoles(ch, n, f0, f1);
            pos = r.outgoing;
            G.glide = { ...r.summary, arrival: motion(r.incoming, series.t.slice(f0, f1 + 1), null, T.slice(f0, f1 + 1)) };
        }
        G.motion = motion(pos, series.t.slice(f0, f1 + 1), up ? up.t : null, T.slice(f0, f1 + 1));
        if (centre != null && pos.length) G.motion.endOffCentre = r2(pos[pos.length - 1] - centre);
        // the hand's phase (touch, drag): does the picture follow the pointer?
        if (up) {
            const fu = rowAt(T, up.t);
            // the pointer's travel is the driver's stroke (a native scroll cancels the
            // page's pointer stream once it pans, so the page's own log stops short)
            const strokes = (d.meta.steps || []).filter((x) => x.do === "stroke");
            const st = strokes[m.name === "carry" ? 2 : m.name === "flick" ? 1 : 0];
            if (st && pos[0] != null && pos[fu - f0] != null) {
                const hand = st.to.x - st.from.x;
                const moved = pos[fu - f0] - pos[0];
                G.hand = { pointerPx: r1(hand), picturePx: r1(moved), ratio: r2(moved / hand), ms: st.ms, moves: st.moves };
            }
            // after the release: the motion the hand left behind, on its own
            const rest = pos.slice(fu - f0);
            G.afterRelease = motion(rest, series.t.slice(fu, f1 + 1), null, T.slice(fu, f1 + 1));
        }
        if (sl) {
            const s = sl.slice(f0, f1 + 1);
            G.scroll = { from: s[0], to: s[s.length - 1], travel: r1(s[s.length - 1] - s[0]), pitch, snapError: pitch ? r2(s[s.length - 1] - Math.round(s[s.length - 1] / pitch) * pitch) : null };
            G.scroll.uneven = motion(s.map((v) => -v), series.t.slice(f0, f1 + 1), up ? up.t : null, T.slice(f0, f1 + 1)).uneven;
            // visible picture against the scroll: anything else moving it (translate, lag)
            const s0 = s[0];
            const extra = pos.map((p, i) => (p == null ? null : p - pos[0] + (s[i] - s0)));
            G.offScroll = { max: r2(Math.max(...extra.filter((x) => x != null).map(Math.abs))), atEnd: r2(extra[extra.length - 1]) };
        }

        // the projection's two per-scroll channels on the landing slide: the content's
        // lag (translate of .carousel-item-content; the sheet writes calc(lag * 100%), so
        // the computed value, and this number, is a percent of the member's width) and
        // the member's scale
        if (!glide && contents[ref] && members[ref]) {
            const lag = arr(ch[contents[ref]].tr, n).slice(f0, f1 + 1).map((v) => v || 0);
            // the scale on the member times the scale on its content node (the cure moves it
            // there, ROOT.md), so v11.1.0 and the cure read alike
            const scm = arr(ch[members[ref]].sc, n);
            const scc = arr(ch[contents[ref]].sc, n);
            const sc = scm.slice(f0, f1 + 1).map((v, k) => (v == null ? 1 : v) * (scc[f0 + k] == null ? 1 : scc[f0 + k]));
            let maxLagStep = 0;
            for (let i = 1; i < lag.length; i++) maxLagStep = Math.max(maxLagStep, Math.abs(lag[i] - lag[i - 1]));
            G.projection = { unit: "% of member width", lagMax: r1(Math.max(...lag.map(Math.abs))), lagMaxStep: r1(maxLagStep), lagAtEnd: r1(lag[lag.length - 1]), scaleMin: r2(Math.min(...sc)) };
        }
        // commit: active index changes inside the gesture
        const changes = [];
        for (let f = Math.max(1, f0); f <= f1; f++) if (activeAt[f] !== activeAt[f - 1]) changes.push({ frame: f - f0, t: r1(T[f] - m.t), from: activeAt[f - 1], to: activeAt[f] });
        G.commits = changes;
        const dchanges = [];
        for (let f = Math.max(1, f0); f <= f1; f++) if (dotAt[f] !== dotAt[f - 1]) dchanges.push({ frame: f - f0, t: r1(T[f] - m.t), from: dotAt[f - 1], to: dotAt[f] });
        G.dotChanges = dchanges;

        // scroll calls by the page, writes by the page
        const inG = (t) => t >= m.t && t < tEnd;
        G.calls = (d.calls || []).filter((c) => inG(c.t)).map((c) => ({ t: r1(c.t - m.t), fn: c.fn, args: c.args, sl: c.sl, el: c.el, st: c.st }));
        const muts = (d.muts || []).filter((x) => inG(x.t));
        const count = (pred) => muts.filter(pred).length;
        const motionFrames = Math.max(1, (G.motion.lastMove ?? 0) - (G.motion.firstMove ?? 0) + 1);
        G.writes = {
            total: muts.length,
            inert: count((x) => x.attr === "inert"),
            ariaHidden: count((x) => x.attr === "aria-hidden"),
            dataState: count((x) => x.attr === "data-state"),
            memberStyle: count((x) => x.attr === "style" && x.member >= 0 && x.where === "strip"),
            memberClass: count((x) => x.attr === "class" && x.where === "strip"),
            stripOther: count((x) => x.where === "strip" && x.member < 0),
            pager: count((x) => x.where === "pager"),
            pagerChildList: count((x) => x.where === "pager" && x.kind === "childList"),
            perMotionFrame: r2(muts.length / motionFrames),
            firstInert: (() => {
                const x = muts.find((y) => y.attr === "inert");
                return x ? r1(x.t - m.t) : null;
            })(),
        };
        // the strip's own events
        const evs = (d.evs || []).filter((e) => inG(e.t));
        G.events = { scroll: evs.filter((e) => e.type === "scroll").length, scrollend: evs.filter((e) => e.type === "scrollend").map((e) => r1(e.t - m.t)), snapchange: evs.filter((e) => e.type === "scrollsnapchange").map((e) => ({ t: r1(e.t - m.t), to: e.target })), snapchanging: evs.filter((e) => e.type === "scrollsnapchanging").length };
        // long tasks / long animation frames overlapping the gesture
        const lt = (d.long || []).filter((e) => e.start + e.dur > m.t && e.start < tEnd);
        const lf = (d.loaf || []).filter((e) => e.start + e.dur > m.t && e.start < tEnd);
        G.long = { tasks: lt.length, taskMax: r1(Math.max(0, ...lt.map((e) => e.dur))), loaf: lf.length, loafMax: r1(Math.max(0, ...lf.map((e) => e.dur))), loafBlockMax: r1(Math.max(0, ...lf.map((e) => e.blocking || 0))), loafScripts: lf.flatMap((e) => (e.scripts || []).map((s) => `${r1(s.dur)}ms ${s.invoker} ${s.src}`)).slice(0, 6) };
        // pictures: frames where a slide is on screen but its picture is not loaded or not yet painted
        if (stripBox && members.length) G.pictures = pictures(d, ch, members, contents, f0, f1, stripBox, T, m.t);
        // trace counts
        if (d.trace && d.trace.perFrame) {
            const pf = d.trace.perFrame.slice(f0, f1 + 1);
            const sum = (k) => r2(pf.reduce((a, r) => a + (r[k] || 0), 0));
            G.trace = { style: sum("style"), styleMs: sum("styleMs"), layout: sum("layout"), layoutMs: sum("layoutMs"), paint: sum("paint"), paintMs: sum("paintMs"), prepaint: sum("prepaint"), js: sum("js"), jsMs: sum("jsMs"), framesWithLayout: pf.filter((r) => r.layout).length, framesWithStyle: pf.filter((r) => r.style).length, decodes: (d.trace.decodes || []).filter((x) => x.t >= m.t && x.t < tEnd).map((x) => ({ t: r1(x.t - m.t), dur: x.dur, name: x.name, main: x.main })) };
        }
        out.gestures.push(G);
    }
    return out;
}

// daraksha: the drawing window's children change identity during a turn (a neighbour
// stand-in, the leaving drawing, the arriving one), so its pictures are read by role:
// incoming = the neighbour while the hand carries it, then the arriving drawing; outgoing =
// the drawing on show, then the leaving one. A step in a role's series at the hand-over
// is a jump the eye sees.
function glideRoles(ch, n, f0, f1) {
    const keys = Object.keys(ch).filter((k) => k.startsWith("dpic#"));
    const get = (k, c) => arr(ch[k][c], n);
    const at = (k, a) => (ch[k].attrs && ch[k].attrs[a] ? ch[k].attrs[a] : Array(n).fill(null));
    const incoming = [],
        outgoing = [];
    let swap = null,
        sawN = false,
        sawD = false,
        lastN = null;
    for (let f = f0; f <= f1; f++) {
        let N = null,
            D = null,
            P = null;
        for (const k of keys) {
            const x = get(k, "x")[f],
                w = get(k, "w")[f];
            if (x == null || !w) continue;
            const c = x + w / 2;
            if (at(k, "data-neighbour")[f] != null) N = c;
            else if (at(k, "data-leaving")[f] != null || at(k, "data-departed")[f] != null) D = c;
            else if (P == null) P = c;
        }
        if (N != null) {
            incoming.push(N);
            outgoing.push(P);
        } else if (D != null) {
            incoming.push(P);
            outgoing.push(D);
        } else if (sawN || sawD) {
            incoming.push(P);
            outgoing.push(null);
        } else {
            incoming.push(null);
            outgoing.push(P);
        }
        if (N == null && lastN != null && P != null && swap == null) swap = f - f0;
        lastN = N;
        sawN = sawN || N != null;
        sawD = sawD || D != null;
    }
    let jump = null;
    if (swap != null && swap > 0) jump = { frame: swap, incomingStep: r2(incoming[swap] - incoming[swap - 1]) };
    return { incoming, outgoing, summary: { swapFrame: swap, swap: jump } };
}

function pick(o, ks) {
    if (!o) return null;
    const r = {};
    for (const k of ks) r[k] = o[k];
    return r;
}
function figureSum(f) {
    if (!f) return null;
    const v = Object.values(f);
    return { figures: v.length, frames: v.reduce((a, s) => a + s.frames, 0), ms: r1(v.reduce((a, s) => a + s.ms, 0)), skipped: v.reduce((a, s) => a + s.skipped, 0) };
}
function rowAt(T, t) {
    for (let i = 0; i < T.length; i++) if (T[i] >= t) return i;
    return T.length - 1;
}

// Motion of one series (px per frame): first and last moving frame (> 0.5 px), the
// settle, peak speed, overshoot past the final value, and the uneven steps.
function motion(pos, t, upT, now) {
    const o = { firstMove: null, lastMove: null, travel: null, ms: null, peak: null, overshoot: null, uneven: null };
    const p = pos.map((v) => (v == null ? NaN : v));
    const steps = [];
    for (let i = 1; i < p.length; i++) steps.push(p[i] - p[i - 1]);
    const moving = steps.map((s) => Math.abs(s) > 0.5);
    const fm = moving.indexOf(true);
    if (fm < 0) {
        o.travel = 0;
        return o;
    }
    const lm = moving.lastIndexOf(true);
    o.firstMove = fm + 1;
    o.lastMove = lm + 1;
    o.firstMoveMs = r1(now[fm + 1] - now[0]);
    o.lastMoveMs = r1(now[lm + 1] - now[0]);
    const start = Number.isFinite(p[fm]) ? p[fm] : p.find(Number.isFinite);
    let end = NaN;
    for (let i = p.length - 1; i >= 0 && !Number.isFinite(end); i--) end = p[i];
    o.travel = r1(end - start);
    o.ms = r1(t[lm + 1] - t[fm]);
    const dir = Math.sign(end - start) || 1;
    let peak = 0;
    for (let i = fm; i <= lm; i++) {
        const dt = t[i + 1] - t[i];
        if (dt > 0) peak = Math.max(peak, Math.abs(steps[i]) / dt);
    }
    o.peak = r2(peak); // px per ms
    let far = start;
    for (let i = fm; i < p.length; i++) if (Number.isFinite(p[i]) && (p[i] - end) * dir > (far - end) * dir) far = p[i];
    o.overshoot = r1(Math.max(0, (far - end) * dir));
    // uneven steps inside the motion. A reversal is a moving step (> 0.5 px) whose sign
    // differs from the last MOVING step before it: still rows between them are skipped,
    // so a backward step framed by still rows counts (rows sampled faster than the
    // engine paints repeat the last frame; WebKit's 10 ms rows against ~16.7 ms paints
    // did, critique M-1). A backward jump still counts twice, going back and resuming.
    const rev = [],
        stall = [],
        abrupt = [];
    let lastMoving = Math.abs(steps[fm]) > 0.5 ? steps[fm] : 0;
    for (let i = fm + 1; i <= lm; i++) {
        const s = steps[i],
            sp = steps[i - 1];
        if (Math.abs(s) <= 0.5 && Math.abs(sp) > 0.5 && i < lm) stall.push(i + 1);
        if (Math.abs(s) > 0.5) {
            if (lastMoving && Math.sign(s) !== Math.sign(lastMoving)) rev.push({ f: i + 1, step: r2(s), prev: r2(lastMoving) });
            lastMoving = s;
        }
        if (Math.abs(s) > 2 && Math.abs(sp) > 2 && (Math.abs(s) > 2 * Math.abs(sp) || Math.abs(s) < 0.5 * Math.abs(sp))) abrupt.push({ f: i + 1, step: r2(s), prev: r2(sp) });
    }
    // after release: steps while the hand is off (momentum or a turn)
    if (upT != null) {
        const ui = now.findIndex((x) => x >= upT);
        o.releaseFrame = ui;
        if (ui > 0 && ui < steps.length) {
            o.stepAtRelease = r2(steps[ui - 1]);
            o.stepAfterRelease = r2(steps[ui]);
        }
    }
    o.uneven = { reversals: rev.length, stalls: stall.length, abrupt: abrupt.length, revFrames: rev.slice(0, 8), stallFrames: stall.slice(0, 8), abruptFrames: abrupt.slice(0, 8) };
    o.maxStep = r2(Math.max(...steps.slice(fm, lm + 1).map(Math.abs)));
    return o;
}

function pictures(d, ch, members, contents, f0, f1, stripBox, T, t0) {
    const n = T.length;
    const paintBy = new Map();
    for (const e of d.img?.paint || []) if (e.url && e.renderTime != null) paintBy.set(e.url, Math.min(paintBy.get(e.url) ?? Infinity, e.renderTime));
    const urlOf = new Map();
    for (const im of d.img?.atEnd || []) urlOf.set(im.member, im.url);
    const out = [];
    members.forEach((k, i) => {
        const x = arr(ch[k].x, n),
            w = arr(ch[k].w, n);
        const ic = ch[k].ic ? ch[k].ic : null;
        if (!ic) return;
        let shown = 0,
            unloaded = 0,
            unpainted = 0,
            firstShown = null;
        const url = urlOf.get(i);
        const pt = url ? paintBy.get(url) : undefined;
        for (let f = f0; f <= f1; f++) {
            const visible = x[f] != null && x[f] < stripBox[0] + stripBox[2] - 1 && x[f] + w[f] > stripBox[0] + 1;
            if (!visible) continue;
            shown++;
            if (firstShown == null) firstShown = r1(T[f] - t0);
            if (ic[f] !== 1) unloaded++;
            else if (pt !== undefined && T[f] < pt) unpainted++;
        }
        if (shown) out.push({ member: i, url, framesShown: shown, firstShown, framesUnloaded: unloaded, framesLoadedNotPainted: unpainted, paintedAt: pt !== undefined ? r1(pt - t0) : null });
    });
    return out;
}

const files = readdirSync(DIR).filter((f) => f.endsWith(".json") && f !== "summary.json");
const cells = [];
for (const f of files.sort()) {
    try {
        cells.push(analyzeCell(load(f)));
    } catch (e) {
        cells.push({ file: f, error: String(e.stack || e).slice(0, 300) });
    }
}
writeFileSync(join(DIR, "summary.json"), JSON.stringify({ written: new Date().toISOString(), cells }, null, 1));
console.log(`summary: ${cells.length} cells -> ${join(DIR, "summary.json")}`);
