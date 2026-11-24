// The carousel study's in-page recorder, beside the harness frame sampler
// (harness/sampler.js, injected first). Injected by carousel-probe.mjs as an init script,
// so it runs before any page script. It records what the per-frame rows cannot:
//   - every scroll call on an element (scrollTo, scroll, scrollBy, scrollIntoView, the
//     scrollLeft setter), with the scrollLeft at the call and a short stack
//   - every attribute write and child change on the strip and the pager (MutationObserver,
//     old value kept): inert, aria-hidden, data-state, class, style
//   - the strip's own events: scroll, scrollend, scrollsnapchange(ing), and the input
//     events that reach it
//   - each picture's load event, its fetch (resource timing) and, in Chromium, its first
//     paint (element timing; the recorder tags every <img> with elementtiming on insert)
// Time is page time in ms from the sampler's t0 (window.__sampler.start).
(() => {
    if (window.__crec) return;
    const R = (window.__crec = { on: false, t0: 0, calls: [], muts: [], evs: [], loads: [], et: [], watched: null });
    const now = () => performance.now();
    const rel = (t = now()) => +(t - R.t0).toFixed(3);
    const short = (u) => {
        try {
            return new URL(u, location.href).pathname.split("/").slice(-3).join("/");
        } catch {
            return String(u);
        }
    };
    const desc = (el) => {
        if (!el || !el.tagName) return String(el);
        const s = el.getAttribute && (el.getAttribute("data-slot") || el.getAttribute("data-testid"));
        const c = typeof el.className === "string" ? el.className.trim().split(/\s+/).slice(0, 2).join(".") : "";
        return el.tagName.toLowerCase() + (s ? `[${s}]` : "") + (c ? "." + c : "");
    };
    const stack = () =>
        (new Error().stack || "")
            .split("\n")
            .slice(3, 8)
            .map((s) => s.trim().replace(/https?:\/\/[^/]+\//, "").replace(/^at /, "").slice(0, 110))
            .join(" < ");
    const safe = (a) => {
        try {
            return JSON.stringify(a).slice(0, 160);
        } catch {
            return String(a);
        }
    };
    const memberIndex = (el) => {
        const w = R.watched;
        if (!w || !w.strip) return -1;
        let n = el;
        while (n && n.parentElement !== w.strip) n = n.parentElement;
        return n ? Array.prototype.indexOf.call(w.strip.children, n) : -1;
    };

    for (const name of ["scrollTo", "scroll", "scrollBy", "scrollIntoView"]) {
        const orig = Element.prototype[name];
        if (!orig) continue;
        Element.prototype[name] = function (...args) {
            if (R.on) R.calls.push({ t: rel(), fn: name, el: desc(this), args: safe(args), sl: this.scrollLeft, st: stack() });
            return orig.apply(this, args);
        };
    }
    const sld = Object.getOwnPropertyDescriptor(Element.prototype, "scrollLeft");
    if (sld && sld.set) {
        Object.defineProperty(Element.prototype, "scrollLeft", {
            configurable: true,
            enumerable: sld.enumerable,
            get: sld.get,
            set(v) {
                if (R.on) R.calls.push({ t: rel(), fn: "scrollLeft=", el: desc(this), args: String(v), sl: sld.get.call(this), st: stack() });
                sld.set.call(this, v);
            },
        });
    }

    // Element timing: tag every picture as it enters the document, before it loads.
    const tag = (n) => {
        if (n.tagName === "IMG" && !n.hasAttribute("elementtiming")) n.setAttribute("elementtiming", "crec");
    };
    new MutationObserver((ms) => {
        for (const m of ms)
            for (const n of m.addedNodes) {
                if (n.nodeType !== 1) continue;
                tag(n);
                if (n.querySelectorAll) n.querySelectorAll("img").forEach(tag);
            }
    }).observe(document, { childList: true, subtree: true });
    try {
        new PerformanceObserver((l) => {
            for (const e of l.getEntries())
                R.et.push({ url: short(e.url || ""), renderTime: e.renderTime, loadTime: e.loadTime, id: e.identifier, w: e.naturalWidth });
        }).observe({ type: "element", buffered: true });
    } catch {}
    document.addEventListener(
        "load",
        (e) => {
            const t = e.target;
            if (t && t.tagName === "IMG") R.loads.push({ t: now(), url: short(t.currentSrc || t.src || ""), member: memberIndex(t) });
        },
        true,
    );

    let mo = null;
    const onEv = (e) => {
        if (!R.on) return;
        const o = { t: rel(e.timeStamp && e.timeStamp > 0 ? e.timeStamp : now()), type: e.type };
        if (e.type === "scroll" || e.type === "scrollend") o.sl = R.watched.strip.scrollLeft;
        if (e.type.startsWith("scrollsnap")) o.target = memberIndex(e.snapTargetInline || e.snapTargetBlock || null);
        if (e.type === "wheel") o.dx = e.deltaX;
        R.evs.push(o);
    };
    const EVENTS = ["scroll", "scrollend", "scrollsnapchange", "scrollsnapchanging", "pointerdown", "pointerup", "pointercancel", "touchstart", "touchend", "wheel"];

    // Start watching: the strip (members are its element children) and the pager root.
    R.watch = (stripSel, pagerSel) => {
        const strip = stripSel ? document.querySelector(stripSel) : null;
        const pager = pagerSel ? document.querySelector(pagerSel) : null;
        R.watched = { strip, pager };
        mo = new MutationObserver((ms) => {
            const t = rel();
            for (const m of ms) {
                const inPager = pager && pager.contains(m.target);
                const o = { t, where: inPager ? "pager" : "strip", kind: m.type, el: desc(m.target), member: inPager ? -1 : memberIndex(m.target) };
                if (m.type === "attributes") {
                    o.attr = m.attributeName;
                    o.old = m.oldValue == null ? null : String(m.oldValue).slice(0, 140);
                    const v = m.target.getAttribute(m.attributeName);
                    o.now = v == null ? null : String(v).slice(0, 140);
                } else if (m.type === "childList") {
                    o.added = m.addedNodes.length;
                    o.removed = m.removedNodes.length;
                }
                R.muts.push(o);
            }
        });
        // Only the attributes a carousel, a pager or a glide writes on its own elements: a
        // live figure inside a slide (an SVG redrawn by setAttribute every frame) must not
        // flood the log, nor cost the page a record per write.
        const attributeFilter = ["inert", "aria-hidden", "aria-current", "aria-selected", "data-state", "data-active", "data-flip", "data-hover", "data-press", "data-edge", "data-leaving", "data-neighbour", "data-departed", "class", "style", "tabindex", "hidden", "src", "srcset"];
        if (strip) mo.observe(strip, { attributes: true, attributeOldValue: true, attributeFilter, childList: true, subtree: true });
        if (pager && !(strip && strip.contains(pager))) mo.observe(pager, { attributes: true, attributeOldValue: true, attributeFilter, childList: true, subtree: true, characterData: true });
        if (strip) for (const ev of EVENTS) strip.addEventListener(ev, onEv, { capture: true, passive: true });
        const imgs = strip ? [...strip.querySelectorAll("img")] : [];
        const kids = strip ? [...strip.children] : [];
        const sr = strip ? strip.getBoundingClientRect() : null;
        return {
            strip: !!strip,
            pager: !!pager,
            members: kids.length,
            pitch: kids.length > 1 ? kids[1].offsetLeft - kids[0].offsetLeft : null,
            memberW: kids.length ? kids[0].offsetWidth : null,
            stripBox: sr ? [sr.x, sr.y, sr.width, sr.height] : null,
            clientW: strip ? strip.clientWidth : null,
            scrollW: strip ? strip.scrollWidth : null,
            scrollLeft: strip ? strip.scrollLeft : null,
            snapType: strip ? getComputedStyle(strip).scrollSnapType : null,
            snapStop: kids.length ? getComputedStyle(kids[0]).scrollSnapStop : null,
            snapchangeSupported: strip ? "onscrollsnapchange" in strip : null,
            scrollendSupported: "onscrollend" in window,
            imgs: imgs.map((im) => ({ member: memberIndex(im), url: short(im.currentSrc || im.src || ""), complete: im.complete, nw: im.naturalWidth, loading: im.loading, decoding: im.decoding })),
        };
    };
    R.start = (t0) => {
        R.t0 = t0;
        R.calls = [];
        R.muts = [];
        R.evs = [];
        R.on = true;
    };
    R.stop = () => {
        R.on = false;
        if (mo) {
            const rest = mo.takeRecords();
            if (rest.length) R.muts.push({ t: rel(), kind: "late", n: rest.length });
        }
        const res = performance
            .getEntriesByType("resource")
            .filter((e) => e.initiatorType === "img" || /\.(webp|png|jpe?g|avif)(\?|$)/.test(e.name))
            .map((e) => ({ url: short(e.name), start: rel(e.startTime), end: rel(e.responseEnd), size: e.encodedBodySize }));
        const strip = R.watched && R.watched.strip;
        return {
            calls: R.calls,
            muts: R.muts,
            evs: R.evs,
            loads: R.loads.map((l) => ({ ...l, t: rel(l.t) })),
            et: R.et.map((e) => ({ ...e, renderTime: e.renderTime ? rel(e.renderTime) : null, loadTime: e.loadTime ? rel(e.loadTime) : null })),
            res,
            imgsAtEnd: strip
                ? [...strip.querySelectorAll("img")].map((im) => ({ member: memberIndex(im), url: short(im.currentSrc || im.src || ""), complete: im.complete, nw: im.naturalWidth }))
                : [],
        };
    };
})();
