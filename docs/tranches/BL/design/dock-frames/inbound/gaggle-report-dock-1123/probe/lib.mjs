// The in-page sampler and the per-motion analysis for the gaggle report dock film (dock-frames O-420).
//
// SAMPLER runs from document start (addInitScript). Every requestAnimationFrame it reads, with
// getBoundingClientRect: the dock's outer box (.glass-dock), its plate (.dock-plate), every seat
// ([data-seat], the lamp, each separator), the run's gliding mark (.dock-run-mark), every theme
// toggle on the page (in the dock at full width, in the section menu at compact width), and every
// reka popper wrapper (tooltips and popovers). It also reads the dock's opacity and transforms, the
// dark class, scrollY and document.fonts.status. Boxes are [left, top, width, height] in CSS px,
// rounded to 0.01. Nothing is written into the page except window.__film.

export const SAMPLER = () => {
    if (window.__film) return;
    const F = (window.__film = { on: true, t0: 0, trig: 0, frames: [], events: [], max: 6000 });
    const r2 = (v) => Math.round(v * 100) / 100;
    const R = (el) => {
        if (!el) return null;
        const b = el.getBoundingClientRect();
        if (!b.width && !b.height) return null;
        return [r2(b.left), r2(b.top), r2(b.width), r2(b.height)];
    };
    function snap() {
        const o = { t: r2(performance.now() - F.t0) };
        const dock = document.querySelector(".r-dock-seat .glass-dock");
        if (dock) {
            o.dock = R(dock);
            o.plate = R(dock.querySelector(":scope > .dock-plate"));
            const cs = getComputedStyle(dock);
            o.op = +cs.opacity;
            if (cs.transform !== "none") o.tf = cs.transform;
            if (cs.scale && cs.scale !== "none") o.sc = cs.scale;
            if (cs.translate && cs.translate !== "none") o.tr = cs.translate;
            const seats = {};
            let i = 0;
            for (const el of dock.querySelectorAll("[data-seat], .kit-lamp-seat, .dock-separator, [role=separator]")) {
                const k = el.dataset.seat ? el.dataset.seat + (el.dataset.seatKey ? ":" + el.dataset.seatKey : "") : el.classList.contains("kit-lamp-seat") ? "lamp" : "sep" + i++;
                seats[k] = R(el);
            }
            o.seats = seats;
            o.mark = R(dock.querySelector(".dock-run-mark"));
            const run = dock.querySelector(".dock-run");
            if (run) { o.rsl = r2(run.scrollLeft); o.rov = run.scrollWidth - run.clientWidth; }
        }
        const tog = {};
        for (const el of document.querySelectorAll(".dark-mode-toggle-button")) {
            const k = dock && dock.contains(el) ? "togDock" : "togMenu";
            tog[k] = R(el);
            const g = el.querySelector(".toggle-circle");
            if (g) tog[k + "Glyph"] = R(g);
            const s = el.style.scale || getComputedStyle(el).scale;
            if (s && s !== "none" && s !== "1") tog[k + "Scale"] = s;
        }
        o.tog = tog;
        const pops = [];
        for (const w of document.querySelectorAll("[data-reka-popper-content-wrapper]")) {
            const c = w.firstElementChild || w;
            const txt = (c.textContent || "").trim().replace(/\s+/g, " ");
            const kind = c.classList.contains("r-menu") || c.querySelector(".r-menu") ? "menu" : c.classList.contains("r-find-pop") || c.querySelector(".r-find-pop") ? "find" : /Switch between light and dark/.test(txt) ? "tip-theme" : /Go to |starts when/.test(txt) ? "tip-section" : "pop";
            pops.push({ k: kind, r: R(c), side: c.dataset.side, st: c.dataset.state, op: +getComputedStyle(c).opacity });
        }
        if (pops.length) o.pop = pops;
        o.dark = document.documentElement.classList.contains("dark");
        o.sy = Math.round(scrollY);
        if (document.fonts) o.fonts = document.fonts.status;
        return o;
    }
    function loop() {
        if (F.on && F.frames.length < F.max) {
            try {
                F.frames.push(snap());
            } catch (e) {
                F.frames.push({ t: performance.now() - F.t0, err: String(e) });
            }
        }
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
    for (const ev of ["pointerover", "pointerdown", "pointerup", "click", "keydown", "wheel"])
        addEventListener(ev, (e) => { if (F.on) F.events.push({ t: r2(performance.now() - F.t0), type: ev, tag: e.target?.className?.baseVal ?? e.target?.className ?? "" }); }, { capture: true, passive: true });
    F.start = () => { F.frames = []; F.events = []; F.t0 = performance.now(); F.trig = 0; F.on = true; return performance.now(); };
    F.mark = () => { F.trig = r2(performance.now() - F.t0); return F.trig; };
    F.stop = () => { F.on = false; const r = { frames: F.frames, events: F.events, trig: F.trig }; F.frames = []; F.events = []; return r; };
};

// ---------------------------------------------------------------------------------------------
// Analysis. A motion record is { frames, events, trig }: frames before trig are the rest.

const r2 = (v) => Math.round(v * 100) / 100;
const L = (b) => b[0], Rt = (b) => b[0] + b[2], C = (b) => b[0] + b[2] / 2, CY = (b) => b[1] + b[3] / 2;

/** Every tracked component of one frame, as a flat map name -> number. */
export function components(f) {
    const m = {};
    const box = (name, b, full = true) => {
        if (!b) return;
        m[name + ".l"] = L(b);
        m[name + ".r"] = Rt(b);
        m[name + ".t"] = b[1];
        if (full) m[name + ".b"] = b[1] + b[3];
    };
    if (f.dock) box("dock", f.dock);
    if (f.plate) box("plate", f.plate);
    if (f.mark) box("mark", f.mark);
    for (const [k, b] of Object.entries(f.seats ?? {})) box("seat:" + k, b, false);
    for (const [k, b] of Object.entries(f.tog ?? {})) if (Array.isArray(b) && !k.endsWith("Glyph")) box(k, b);
    for (const p of f.pop ?? []) if (p.r) box("pop:" + p.k, p.r);
    return m;
}

/** Drift of one box against its rest box over the given frames: max |d| of left, right, centre, top, width. */
function drift(frames, get, rest) {
    const o = { l: 0, r: 0, c: 0, t: 0, w: 0, tl: null, tr: null, tc: null };
    if (!rest) return null;
    for (const f of frames) {
        const b = get(f);
        if (!b) continue;
        const d = { l: L(b) - L(rest), r: Rt(b) - Rt(rest), c: C(b) - C(rest), t: b[1] - rest[1], w: b[2] - rest[2] };
        for (const k of ["l", "r", "c", "t", "w"]) if (Math.abs(d[k]) > Math.abs(o[k])) { o[k] = r2(d[k]); if (k in { l: 1, r: 1, c: 1 }) o["t" + k] = f.t; }
    }
    return o;
}

/**
 * Analyse one motion. opts.restAt = "pre" (the last frame before the trigger) or "end" (the
 * last frame, for the load). Returns the outer-box drift, the plate drift, the seat moves, the
 * toggle moves, the tail (the last 6 frames in which anything in or on the dock moved), the
 * settle time and the popover/tooltip placement.
 */
export function analyse(rec, opts = {}) {
    const frames = rec.frames.filter((f) => !f.err);
    const trig = rec.trig;
    const pre = frames.filter((f) => f.t < trig && f.dock);
    const post = frames.filter((f) => f.t >= trig);
    const withDock = post.filter((f) => f.dock);
    const restF = opts.restAt === "end" ? withDock[withDock.length - 1] : pre[pre.length - 1] ?? withDock[0];
    const endF = withDock[withDock.length - 1];
    const out = { frames: frames.length, preFrames: pre.length, trig, window: r2((frames[frames.length - 1]?.t ?? 0) - trig) };
    if (!restF || !endF) return { ...out, err: "no dock frames" };
    out.rest = { dock: restF.dock, plate: restF.plate };
    out.outer = drift(withDock, (f) => f.dock, restF.dock);
    out.plate = drift(withDock, (f) => f.plate, restF.plate);
    out.net = { l: r2(L(endF.dock) - L(restF.dock)), r: r2(Rt(endF.dock) - Rt(restF.dock)), c: r2(C(endF.dock) - C(restF.dock)) };
    // seats: each seat's centre and width against rest
    const seats = {};
    for (const k of Object.keys(restF.seats ?? {})) {
        const rb = restF.seats[k];
        if (!rb) continue;
        let dcx = 0, dcy = 0, dw = 0, dh = 0, at = null, n = 0;
        for (const f of withDock) {
            const b = f.seats?.[k];
            if (!b) continue;
            const d = [C(b) - C(rb), CY(b) - CY(rb), b[2] - rb[2], b[3] - rb[3]];
            if (Math.max(...d.map(Math.abs)) > 0.5) n++;
            if (Math.abs(d[0]) > Math.abs(dcx)) { dcx = r2(d[0]); at = f.t; }
            if (Math.abs(d[1]) > Math.abs(dcy)) dcy = r2(d[1]);
            if (Math.abs(d[2]) > Math.abs(dw)) dw = r2(d[2]);
            if (Math.abs(d[3]) > Math.abs(dh)) dh = r2(d[3]);
        }
        if (Math.max(Math.abs(dcx), Math.abs(dcy), Math.abs(dw), Math.abs(dh)) > 0.05) seats[k] = { dcx, dcy, dw, dh, at, framesOver05: n };
    }
    out.seats = seats;
    // toggles (dock or menu), against their rest (or their first frame once they exist)
    const togs = {};
    for (const k of ["togDock", "togMenu"]) {
        const fr = post.filter((f) => f.tog?.[k]);
        const rb = restF.tog?.[k] ?? fr[0]?.tog?.[k];
        if (!rb || !fr.length) continue;
        let dcx = 0, dcy = 0, dw = 0, dh = 0, at = null, n = 0, scales = new Set();
        for (const f of fr) {
            const b = f.tog[k];
            const d = [C(b) - C(rb), CY(b) - CY(rb), b[2] - rb[2], b[3] - rb[3]];
            if (Math.max(...d.map(Math.abs)) > 0.5) n++;
            if (Math.abs(d[0]) > Math.abs(dcx)) { dcx = r2(d[0]); at = f.t; }
            if (Math.abs(d[1]) > Math.abs(dcy)) dcy = r2(d[1]);
            if (Math.abs(d[2]) > Math.abs(dw)) { dw = r2(d[2]); if (!at) at = f.t; }
            if (Math.abs(d[3]) > Math.abs(dh)) dh = r2(d[3]);
            if (f.tog[k + "Scale"]) scales.add(f.tog[k + "Scale"]);
        }
        togs[k] = { dcx, dcy, dw, dh, at, framesOver05: n, scales: [...scales].slice(0, 6), rest: rb };
    }
    out.toggles = togs;
    // the toggle's moon circle (designed glyph motion: .toggle-circle translateX(-15%) in dark)
    const glyph = {};
    for (const k of ["togDockGlyph", "togMenuGlyph"]) {
        const fr = post.filter((f) => f.tog?.[k]);
        const rb = restF.tog?.[k] ?? fr[0]?.tog?.[k];
        if (!rb || !fr.length) continue;
        let dcx = 0;
        for (const f of fr) { const d = C(f.tog[k]) - C(rb); if (Math.abs(d) > Math.abs(dcx)) dcx = r2(d); }
        glyph[k] = { dcx, end: r2(C(fr[fr.length - 1].tog[k]) - C(rb)) };
    }
    out.glyph = glyph;
    // a popover or tooltip open at rest: its own drift during the motion
    const popDrift = {};
    for (const p0 of restF.pop ?? []) {
        if (!p0.r) continue;
        let dl = 0, dt = 0, dw = 0, dh = 0, n = 0;
        for (const f of post) {
            const p = (f.pop ?? []).find((q) => q.k === p0.k && q.r);
            if (!p) continue;
            n++;
            const d = [p.r[0] - p0.r[0], p.r[1] - p0.r[1], p.r[2] - p0.r[2], p.r[3] - p0.r[3]];
            if (Math.abs(d[0]) > Math.abs(dl)) dl = r2(d[0]);
            if (Math.abs(d[1]) > Math.abs(dt)) dt = r2(d[1]);
            if (Math.abs(d[2]) > Math.abs(dw)) dw = r2(d[2]);
            if (Math.abs(d[3]) > Math.abs(dh)) dh = r2(d[3]);
        }
        popDrift[p0.k] = { dl, dt, dw, dh, frames: n };
    }
    out.popDrift = popDrift;
    // frame-to-frame movement; the tail is the last 6 frames in which anything moved
    const seq = [restF, ...post.filter((f) => f.dock)];
    const moves = [];
    let lastMove = null;
    for (let i = 1; i < seq.length; i++) {
        const a = components(seq[i - 1]), b = components(seq[i]);
        const ch = [];
        for (const k of Object.keys(b)) if (k in a) { const d = b[k] - a[k]; if (Math.abs(d) > 0.05) ch.push([k, r2(d)]); }
        const appear = Object.keys(b).filter((k) => !(k in a) && k.endsWith(".l")).map((k) => k.slice(0, -2));
        const gone = Object.keys(a).filter((k) => !(k in b) && k.endsWith(".l")).map((k) => k.slice(0, -2));
        if (ch.length || appear.length || gone.length) {
            ch.sort((x, y) => Math.abs(y[1]) - Math.abs(x[1]));
            const max = ch.length ? Math.abs(ch[0][1]) : 0;
            moves.push({ t: seq[i].t, dt: r2(seq[i].t - seq[i - 1].t), max: r2(max), top: ch.slice(0, 5), appear, gone });
            if (max > 0.25 || appear.length || gone.length) lastMove = seq[i].t;
        }
    }
    // the dock's own tail: frames where the dock, its plate, its seats, its mark or its toggle moved
    const dockKeys = (k) => /^(dock|plate|mark|seat:|togDock)/.test(k);
    const dockMoves = moves.map((m) => ({ ...m, top: m.top.filter(([k]) => dockKeys(k)) })).filter((m) => m.top.length);
    const tail = dockMoves.slice(-6);
    out.tail = tail.map((m) => ({ t: m.t, dt: m.dt, top: m.top.slice(0, 4) }));
    out.tailAll = moves.slice(-6).map((m) => ({ t: m.t, dt: m.dt, top: m.top.slice(0, 3), appear: m.appear, gone: m.gone }));
    out.settle = lastMove == null ? 0 : r2(lastMove - trig);
    out.dockSettle = dockMoves.length ? r2(dockMoves[dockMoves.length - 1].t - trig) : 0;
    out.dockMovingFrames = dockMoves.length;
    // jump/overshoot in the dock's tail: a final step bigger than the step before it, a step after a still gap,
    // or a component that passes its final value and comes back
    const flags = [];
    if (tail.length >= 2) {
        const mags = tail.map((m) => Math.abs(m.top[0][1]));
        const last = mags[mags.length - 1], prev = mags[mags.length - 2];
        if (last >= 0.5 && last > 1.5 * prev) flags.push(`last step ${last}px after ${prev}px`);
        for (let i = 1; i < tail.length; i++) if (tail[i].t - tail[i - 1].t > 60 && Math.abs(tail[i].top[0][1]) >= 0.5) flags.push(`step of ${tail[i].top[0][1]}px (${tail[i].top[0][0]}) after ${r2(tail[i].t - tail[i - 1].t)} ms still`);
    }
    const comps = new Map();
    for (const f of seq) for (const [k, v] of Object.entries(components(f))) if (dockKeys(k)) { if (!comps.has(k)) comps.set(k, []); comps.get(k).push(v); }
    const over = [];
    for (const [k, vs] of comps) {
        if (vs.length < 3) continue;
        const start = vs[0], end = vs[vs.length - 1], dir = Math.sign(end - start);
        if (Math.abs(end - start) < 0.5) {
            const ex = Math.max(...vs.map((v) => Math.abs(v - start)));
            if (ex >= 0.5) over.push([k, "excursion", r2(ex)]);
            continue;
        }
        const beyond = Math.max(...vs.map((v) => (v - end) * dir));
        if (beyond >= 0.5) over.push([k, "overshoot", r2(beyond)]);
    }
    out.overshoot = over;
    out.flags = flags;
    // popovers and tooltips: where they stand against their anchor
    const lastPop = [...post].reverse().find((f) => f.pop?.length);
    if (lastPop) {
        out.pops = lastPop.pop.map((p) => {
            const o = { k: p.k, side: p.side, r: p.r };
            if (p.k === "tip-theme" && p.r) {
                const tb = lastPop.tog?.togDock ?? lastPop.tog?.togMenu;
                if (tb) o.dcxToToggle = r2(C(p.r) - C(tb));
                const th = lastPop.seats?.theme;
                if (th) o.dcxToThemeSeat = r2(C(p.r) - C(th));
            }
            return o;
        });
        // a popover's own drift once open (frames after it first reaches full opacity)
        const pk = {};
        for (const f of post) for (const p of f.pop ?? []) { if (!p.r) continue; (pk[p.k] ??= []).push([f.t, p.r, p.op]); }
        out.popMotion = Object.fromEntries(Object.entries(pk).map(([k, v]) => {
            const first = v[0][1], last = v[v.length - 1][1];
            return [k, { frames: v.length, first, last, dl: r2(L(last) - L(first)), dt: r2(last[1] - first[1]), dw: r2(last[2] - first[2]) }];
        }));
    }
    out.dark = { start: restF.dark, end: endF.dark };
    // the longest frame (rAF gap) from the trigger on: a stall the motion's springs cannot paint through
    let gap = 0;
    for (let i = 1; i < post.length; i++) gap = Math.max(gap, post[i].t - post[i - 1].t);
    out.longestFrame = r2(gap);
    // the run is a scroller (glass run.css: overflow auto, x mandatory snap); does it scroll during the motion?
    let rsl = 0;
    for (const f of withDock) if (f.rsl != null && Math.abs(f.rsl - (restF.rsl ?? 0)) > Math.abs(rsl)) rsl = r2(f.rsl - (restF.rsl ?? 0));
    out.run = { overflow: restF.rov ?? null, restScrollLeft: restF.rsl ?? null, maxScrollChange: rsl, endScrollLeft: endF.rsl ?? null };
    out.events = (rec.events ?? []).filter((e) => e.t >= trig - 5).slice(0, 6);
    return out;
}

/** The fault list for one analysed motion (thresholds in CSS px). */
export function faultsOf(a, motion) {
    const fs = [];
    if (a.err) return [{ kind: "error", why: a.err }];
    const o = a.outer;
    const maxH = Math.max(Math.abs(o.l), Math.abs(o.r), Math.abs(o.c));
    if (maxH > 0.5) fs.push({ kind: "outer-drift", why: `outer box drifts left ${o.l}, right ${o.r}, centre ${o.c} px`, at: o.tc ?? o.tl ?? o.tr });
    if (Math.abs(o.t) > 0.5) fs.push({ kind: "outer-vertical", why: `outer box moves ${o.t} px vertically`, at: null });
    for (const [k, s] of Object.entries(a.seats)) if (Math.max(Math.abs(s.dcx), Math.abs(s.dw), Math.abs(s.dcy), Math.abs(s.dh)) > 0.5 && !(motion.allowSeat ?? []).some((re) => re.test(k))) fs.push({ kind: "seat-move", why: `seat ${k} moves: centre ${s.dcx}/${s.dcy}, size ${s.dw}/${s.dh} px over ${s.framesOver05} frames`, at: s.at, seat: k });
    for (const [k, s] of Object.entries(a.toggles)) if (!(motion.skipTog && k === "togMenu") && Math.max(Math.abs(s.dcx), Math.abs(s.dw), Math.abs(s.dcy), Math.abs(s.dh)) > 0.5) fs.push({ kind: "toggle-move", why: `${k} box moves: centre ${s.dcx}/${s.dcy}, size ${s.dw}/${s.dh} px over ${s.framesOver05} frames${s.scales.length ? `; inline scale ${s.scales.join(" ")}` : ""}`, at: s.at, seat: k });
    for (const f of a.flags) fs.push({ kind: "tail-jump", why: f, at: a.tail[a.tail.length - 1]?.t });
    for (const [k, how, v] of a.overshoot) if (!/^seat:|^mark/.test(k) || v >= 1) fs.push({ kind: "tail-" + how, why: `${k} ${how} ${v} px`, at: null });
    for (const [k, d] of Object.entries(a.popDrift ?? {})) if ((k === "menu" || k === "find") && Math.max(Math.abs(d.dl), Math.abs(d.dt), Math.abs(d.dw), Math.abs(d.dh)) > 0.5 && !(motion.popGoes ?? false)) fs.push({ kind: "popover-move", why: `${k} popover moves while open: left ${d.dl}, top ${d.dt}, width ${d.dw}, height ${d.dh} px`, at: null });
    for (const p of a.pops ?? []) if (p.k === "tip-theme" && p.dcxToThemeSeat != null && Math.abs(p.dcxToThemeSeat) > 48 && Math.abs(p.dcxToToggle ?? 99) > 48) fs.push({ kind: "tooltip-off-anchor", why: `theme tooltip centre ${p.dcxToThemeSeat} px from the theme seat's centre`, at: null });
    return fs;
}
