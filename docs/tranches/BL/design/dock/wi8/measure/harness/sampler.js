// The in-page frame sampler. Injected by probe.mjs as an init script (a plain function
// body, no imports). One row per rendered frame for every tracked selector.
//
// HOOK. "ro" (default): a ResizeObserver on a 1 px fixed probe whose width the rAF loop
// toggles each frame. ResizeObserver callbacks run after every requestAnimationFrame
// callback and after layout, in the same rendering update, so a row holds the values that
// frame paints, including JS springs that tick in their own rAF callback. "raf": read
// inside our own rAF callback (it may run before a library's rAF callback in the same
// frame, which reads that library's value one frame late); used under tracing, because the
// ro probe adds one tiny layout per frame.
//
// MEASURE-6 (RU-37): a cause is stamped by the page. `arm(name, on)` names the next event of
// type `on` (pointerdown, click, keydown, pointermove, resize); a capture listener on window,
// registered before any of the page's own, stamps the mark when that event arrives, with the
// first time of every other cause event of the same gesture (`ev`, ms from the arm) beside it.
// `fire()` stamps an armed mark inside the evaluate that makes the cause (collapse(), a host
// change). An armed mark whose event never comes is stamped at its arm time, `unfired`.
(() => {
    if (window.__sampler) return;
    const S = (window.__sampler = {
        rows: [],
        marks: [],
        pendingMarks: [],
        ptr: null,
        ptrLog: [],
        long: [],
        loaf: [],
        anims: [],
        running: false,
        track: [],
        frame: 0,
        lastSig: "",
        firstChange: -1,
        lastChange: -1,
        t0: 0,
        hook: "ro",
        waiters: [],
        collectAnims: true,
        armed: null,
    });
    const seen = new WeakSet();

    const onPtr = (e) => {
        const p = { t: performance.now(), x: e.clientX, y: e.clientY, type: e.type, pt: e.pointerType, b: e.buttons };
        S.ptr = p;
        if (S.running) S.ptrLog.push(p);
    };
    for (const ev of ["pointermove", "pointerdown", "pointerup", "pointercancel"]) {
        window.addEventListener(ev, onPtr, { capture: true, passive: true });
    }
    // RU-37: the in-page cause.
    const push = (name, now, extra) => {
        const m = { name, t: +(now - S.t0).toFixed(3), frame: S.frame, ...extra };
        S.marks.push(m);
        S.pendingMarks.push(name);
        return m;
    };
    const flushArmed = () => {
        const a = S.armed;
        S.armed = null;
        if (a && !a.mark) {
            const m = push(a.name, a.at, { cause: a.on, unfired: true, ev: a.ev });
            m.frame = a.frame;
        }
    };
    const onCause = (e) => {
        const a = S.armed;
        if (!a || !S.running) return;
        const now = performance.now();
        if (now - a.at > 2000) return flushArmed();
        if (!(e.type in a.ev)) a.ev[e.type] = +(now - a.at).toFixed(3);
        if (!a.mark && e.type === a.on) a.mark = push(a.name, now, { cause: e.type, inPage: true, sentAgo: +(now - a.at).toFixed(3), ev: a.ev });
    };
    for (const ev of ["pointerdown", "pointerup", "click", "keydown", "pointermove", "touchstart"]) {
        window.addEventListener(ev, onCause, { capture: true, passive: true });
    }
    window.addEventListener("resize", onCause, { passive: true });
    S.arm = (name, on) => {
        flushArmed();
        S.armed = { name, on, at: performance.now(), frame: S.frame, ev: {}, mark: null };
    };
    S.fire = () => {
        const a = S.armed;
        if (!a || a.mark) return;
        const now = performance.now();
        a.mark = push(a.name, now, { cause: "eval", inPage: true, sentAgo: +(now - a.at).toFixed(3), ev: a.ev });
        S.armed = null;
    };
    try {
        new PerformanceObserver((l) => {
            for (const e of l.getEntries()) S.long.push({ start: e.startTime, dur: e.duration, name: e.name });
        }).observe({ type: "longtask", buffered: true });
    } catch {}
    try {
        new PerformanceObserver((l) => {
            for (const e of l.getEntries())
                S.loaf.push({
                    start: e.startTime,
                    dur: e.duration,
                    blocking: e.blockingDuration,
                    renderStart: e.renderStart,
                    styleAndLayoutStart: e.styleAndLayoutStart,
                    scripts: (e.scripts || []).slice(0, 4).map((s) => ({
                        dur: s.duration,
                        invoker: s.invoker,
                        src: (s.sourceURL || "").split("/").pop() + ":" + s.sourceFunctionName,
                    })),
                });
        }).observe({ type: "long-animation-frame", buffered: true });
    } catch {}

    const describe = (el) => {
        if (!el || !el.tagName) return String(el);
        const id = el.getAttribute("data-testid");
        const cls = typeof el.className === "string" ? el.className.trim().split(/\s+/).slice(0, 3).join(".") : "";
        return el.tagName.toLowerCase() + (id ? `[data-testid=${id}]` : "") + (cls ? "." + cls : "");
    };

    const read = (el, spec) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        const o = {
            x: +r.x.toFixed(2),
            y: +r.y.toFixed(2),
            w: +r.width.toFixed(2),
            h: +r.height.toFixed(2),
            op: cs.opacity,
            tf: cs.transform,
            tr: cs.translate,
            sc: cs.scale,
            ro: cs.rotate,
            rad: [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius].join(" | "),
            clip: cs.clipPath,
            vis: cs.visibility === "visible" && cs.display !== "none" ? 1 : 0,
        };
        if (spec.chain) {
            // effective opacity: this element times every ancestor's opacity
            let e = el,
                a = 1;
            while (e && e.nodeType === 1) {
                a *= parseFloat(getComputedStyle(e).opacity);
                e = e.parentElement;
            }
            o.eop = +a.toFixed(4);
            // MEASURE-6 (RU-40): the element's own scroll offset, when it has one.
            if (el.scrollLeft || el.scrollTop) o.sl = [+el.scrollLeft.toFixed(2), +el.scrollTop.toFixed(2)];
            // W-I.8 (C-1): the visible box through this element's and every ancestor's
            // clip-path inset() and every ancestor's non-visible overflow. Rounding of
            // `round` corners is ignored. [l, t, r, b] in viewport px, or 0 when empty.
            let vb = [r.left, r.top, r.right, r.bottom];
            e = el;
            while (e && e.nodeType === 1 && e !== document.documentElement) {
                const ecs = e === el ? cs : getComputedStyle(e);
                const er = e === el ? r : e.getBoundingClientRect();
                const m = /inset\(([^)]*)\)/.exec(ecs.clipPath || "");
                if (m) {
                    const ps = m[1].split(" round ")[0].trim().split(/\s+/).map((s) => parseFloat(s));
                    const [t, rr = t, b = t, l = rr] = ps;
                    vb = [Math.max(vb[0], er.left + l), Math.max(vb[1], er.top + t), Math.min(vb[2], er.right - rr), Math.min(vb[3], er.bottom - b)];
                }
                if (e !== el && (ecs.overflowX !== "visible" || ecs.overflowY !== "visible")) {
                    if (ecs.overflowX !== "visible") vb = [Math.max(vb[0], er.left), vb[1], Math.min(vb[2], er.right), vb[3]];
                    if (ecs.overflowY !== "visible") vb = [vb[0], Math.max(vb[1], er.top), vb[2], Math.min(vb[3], er.bottom)];
                }
                e = e.parentElement;
            }
            o.vb = vb[2] - vb[0] > 0.5 && vb[3] - vb[1] > 0.5 ? vb.map((n) => +n.toFixed(2)) : 0;
        }
        // MEASURE-6 (RU-40): focus inside this element.
        { const ae = document.activeElement; if (ae && ae !== document.body && el.contains(ae)) o.foc = 1; }
        for (const c of spec.colors) o["c:" + c] = cs.getPropertyValue(c);
        for (const p of spec.props) o["p:" + p] = cs.getPropertyValue(p).trim();
        for (const a of spec.attrs) o["a:" + a] = el.getAttribute(a);
        for (const k of spec.styles) o["s:" + k] = cs.getPropertyValue(k);
        return o;
    };

    const value = (o, ch) => {
        if (!o) return NaN;
        if (ch === "cx") return o.x + o.w / 2;
        if (ch === "cy") return o.y + o.h / 2;
        if (ch === "r") return o.x + o.w;
        if (ch === "b") return o.y + o.h;
        if (ch === "op") return parseFloat(o.op);
        const v = o[ch];
        return typeof v === "number" ? v : parseFloat(v);
    };
    S.value = value;

    const collectAnims = (now) => {
        let list;
        try {
            list = document.getAnimations();
        } catch {
            return;
        }
        for (const a of list) {
            if (seen.has(a)) continue;
            seen.add(a);
            const eff = a.effect;
            let timing = {},
                kf = [];
            try {
                timing = eff.getComputedTiming();
                kf = eff.getKeyframes().map((k) => ({ offset: k.computedOffset, easing: k.easing }));
            } catch {}
            S.anims.push({
                t: +(now - S.t0).toFixed(2),
                frame: S.frame,
                kind: a.constructor && a.constructor.name,
                name: a.transitionProperty || a.animationName || a.id || "",
                target: describe(eff && eff.target) + (eff && eff.pseudoElement ? eff.pseudoElement : ""),
                duration: timing.duration,
                delay: timing.delay,
                endDelay: timing.endDelay,
                iterations: timing.iterations,
                easing: eff && eff.getTiming ? eff.getTiming().easing : "",
                keyframeEasings: [...new Set(kf.map((k) => k.easing))],
            });
        }
    };

    const snapshot = () => {
        const el = {};
        for (const spec of S.track) {
            const list = spec.all ? [...document.querySelectorAll(spec.sel)] : [document.querySelector(spec.sel)].filter(Boolean);
            if (!list.length) {
                el[spec.as] = null;
                continue;
            }
            // `stable`: an element keeps its key for its life (ids in first-seen order), so a
            // seat removed or re-inserted does not hand its key to its neighbour.
            if (spec.all && spec.stable) {
                const ids = (S.ids ||= {})[spec.as] ||= { map: new WeakMap(), next: 0 };
                for (const n of list) {
                    if (!ids.map.has(n)) ids.map.set(n, ids.next++);
                    el[spec.as + "#" + ids.map.get(n)] = read(n, spec);
                }
            } else if (spec.all) list.forEach((n, k) => (el[spec.as + "#" + k] = read(n, spec)));
            else el[spec.as] = read(list[0], spec);
        }
        return el;
    };
    S.snapshot = snapshot;

    const sample = (frameTime) => {
        const now = performance.now();
        const el = snapshot();
        const row = {
            i: S.frame,
            t: +(frameTime - S.t0).toFixed(3),
            now: +(now - S.t0).toFixed(3),
            el,
            ptr: S.ptr ? { x: S.ptr.x, y: S.ptr.y, t: +(S.ptr.t - S.t0).toFixed(3), b: S.ptr.b } : null,
        };
        const sig = JSON.stringify(el);
        if (S.frame > 0 && sig !== S.lastSig) {
            row.changed = 1;
            S.lastChange = now;
            if (S.firstChange < 0) S.firstChange = now;
        }
        S.lastSig = sig;
        if (S.pendingMarks.length) row.marks = S.pendingMarks.splice(0);
        if (S.collectAnims) collectAnims(now);
        S.rows.push(row);
        S.frame++;
        if (S.waiters.length) {
            S.waiters = S.waiters.filter((w) => {
                const v = value(el[w.as], w.ch);
                if (!Number.isFinite(v)) return true;
                const done = w.to === w.from ? false : (v - w.from) / (w.to - w.from) >= w.fraction;
                if (done || now - w.start > w.maxMs) {
                    w.resolve({ done, v, frame: row.i, from: w.from, to: w.to });
                    return false;
                }
                return true;
            });
        }
    };

    let probe = null,
        ro = null,
        toggle = false,
        pendingFrameTime = 0;
    const loop = (ts) => {
        if (!S.running) return;
        if (S.hook === "ro") {
            pendingFrameTime = ts;
            toggle = !toggle;
            probe.style.width = toggle ? "2px" : "1px";
        } else {
            sample(ts);
        }
        requestAnimationFrame(loop);
    };

    S.start = (track, opts = {}) => {
        S.track = track.map((t) => ({
            as: t.as,
            sel: t.sel,
            all: !!t.all,
            stable: !!t.stable,
            chain: !!t.chain,
            colors: t.colors || ["color", "background-color", "border-top-color", "box-shadow"],
            props: t.props || [],
            attrs: t.attrs || [],
            styles: t.styles || [],
        }));
        S.hook = opts.hook || "ro";
        S.collectAnims = opts.anims !== false;
        S.rows = [];
        S.marks = [];
        S.pendingMarks = [];
        S.armed = null;
        S.ptrLog = [];
        S.anims = [];
        S.frame = 0;
        S.lastSig = "";
        S.firstChange = -1;
        S.lastChange = -1;
        S.t0 = performance.now();
        S.longFrom = S.long.length;
        S.loafFrom = S.loaf.length;
        performance.mark("anim:start");
        if (S.hook === "ro") {
            probe = document.createElement("div");
            probe.setAttribute("aria-hidden", "true");
            probe.style.cssText =
                "position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;pointer-events:none;contain:strict;z-index:-2147483647";
            document.documentElement.appendChild(probe);
            ro = new ResizeObserver(() => {
                if (S.running) sample(pendingFrameTime);
            });
            ro.observe(probe);
        }
        S.running = true;
        requestAnimationFrame(loop);
        return { t0: S.t0, timeOrigin: performance.timeOrigin };
    };

    S.mark = (name) => {
        const now = performance.now();
        S.marks.push({ name, t: +(now - S.t0).toFixed(3), frame: S.frame, snap: snapshot() });
        S.pendingMarks.push(name);
    };

    S.waitFraction = ({ as, ch, to, fraction, from, maxMs = 4000 }) =>
        new Promise((resolve) => {
            const cur = value(snapshot()[as], ch);
            S.waiters.push({ as, ch, to, fraction, from: from ?? cur, start: performance.now(), maxMs, resolve });
        });

    S.quiet = () => ({
        now: performance.now(),
        firstChange: S.firstChange,
        lastChange: S.lastChange,
        frames: S.frame,
    });

    S.stop = () => {
        flushArmed();
        S.running = false;
        if (ro) ro.disconnect();
        if (probe) probe.remove();
        ro = probe = null;
        return {
            t0: S.t0,
            timeOrigin: performance.timeOrigin,
            hook: S.hook,
            rows: S.rows,
            marks: S.marks,
            ptrLog: S.ptrLog.map((p) => ({ ...p, t: +(p.t - S.t0).toFixed(3) })),
            long: S.long.slice(S.longFrom).map((e) => ({ ...e, start: +(e.start - S.t0).toFixed(3) })),
            loaf: S.loaf.slice(S.loafFrom).map((e) => ({ ...e, start: +(e.start - S.t0).toFixed(3) })),
            anims: S.anims,
            firstChange: S.firstChange < 0 ? null : +(S.firstChange - S.t0).toFixed(3),
            lastChange: S.lastChange < 0 ? null : +(S.lastChange - S.t0).toFixed(3),
        };
    };
})();
