// measure.js: the overflow study's in-page reader. Injected by probe.mjs as an init
// script; it defines window.__ovf with:
//   measure()            every horizontal-bounding reading of the live document
//   scrollers()          every box that can pan sideways now (scrollWidth over clientWidth,
//                        overflow-x auto or scroll), with its scrollLeft
//   snapshot()           scrollLeft of every element plus the window's scrollX, by key
//   restore(snap)        puts every scrollLeft back
//   pointIn(key)         a point inside a keyed element's visible box, or null
// Elements are keyed by a data-ovf attribute stamped on first sight, so a reading taken
// before a gesture and one taken after it name the same box.
(() => {
    if (window.__ovf) return;
    let next = 1;
    const key = (el) => {
        let k = el.getAttribute("data-ovf");
        if (!k) {
            k = String(next++);
            el.setAttribute("data-ovf", k);
        }
        return k;
    };
    const r1 = (n) => Math.round(n * 10) / 10;

    function classes(el) {
        const raw = typeof el.className === "string" ? el.className : el.className?.baseVal || "";
        return raw
            .trim()
            .split(/\s+/)
            .filter((c) => c && !/[:[\]/]/.test(c) && c.length < 40)
            .slice(0, 4);
    }
    function label(el) {
        let s = el.tagName.toLowerCase();
        const slot = el.getAttribute("data-slot");
        if (slot) s += `[data-slot=${slot}]`;
        if (el.id) s += `#${el.id}`;
        const cls = classes(el);
        if (cls.length) s += "." + cls.join(".");
        const role = el.getAttribute("role");
        if (role) s += `[role=${role}]`;
        return s;
    }
    function path(el, depth = 5) {
        const out = [];
        for (let e = el, i = 0; e && e.nodeType === 1 && i < depth; e = e.parentElement, i++) {
            out.unshift(label(e));
        }
        return out.join(" > ");
    }
    // The component the box belongs to: its nearest data-slot, else the nearest glass
    // root class, else the shell region.
    function part(el) {
        const slot = el.closest("[data-slot]");
        const dock = el.closest(".glass-dock");
        const slotName = slot ? slot.getAttribute("data-slot") : null;
        if (dock && (!slot || dock.contains(slot) === false || slot.contains(dock))) {
            return "glass-dock";
        }
        if (slotName) return slotName;
        if (dock) return "glass-dock";
        const shell = el.closest(
            ".demo-main-scroller, .demo-bottom-dock, .demo-sidebar-rail, .story-variants, .story-stage",
        );
        if (shell) return label(shell);
        return null;
    }
    function text(el) {
        return (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 60);
    }
    // A horizontal strip the design means to pan sideways: the dock's run, a carousel's
    // track, a table's container, a code block, a deck strip, or any box the stylesheet
    // gives a horizontal snap or a pan-x-only touch action.
    function designed(el, cs) {
        if (el.matches(".dock-run")) return "dock run";
        // cure v4: an overfull SegmentedTabs strip scrolls its own tabs, as the dock run does
        if (el.matches(".segmented-tabs")) return "tab strip";
        if (el.matches("[data-slot=carousel-content], [data-slot=carousel-content] *")) return "carousel track";
        if (el.matches("[data-slot=carousel] *") && cs.scrollSnapType.startsWith("x")) return "carousel track";
        if (el.matches("[data-slot=table-container]")) return "table container";
        if (el.matches("[data-slot=data-table] *") && el.querySelector("table")) return "data-table scroller";
        if (el.matches("pre, pre *, code")) return "code block";
        if (el.matches(".fading-scroll--x")) return "fading-scroll x";
        if (el.matches("[data-slot=deck-strip], [data-slot=deck-strip] *")) return "deck strip";
        if (cs.scrollSnapType.startsWith("x")) return "x snap";
        if (cs.touchAction === "pan-x") return "pan-x";
        return null;
    }
    function shown(el, cs) {
        if (cs.display === "none" || cs.visibility === "hidden" || cs.visibility === "collapse") return false;
        if (el.closest("[inert], [aria-hidden=true][data-ovf-skip]")) return false;
        const r = el.getBoundingClientRect();
        return r.width > 0 || r.height > 0;
    }
    function isField(el) {
        return el.matches("input, textarea, select, [contenteditable=''], [contenteditable=true]");
    }
    // The descendants whose box passes the scroller's padding edge while their parent's
    // does not: where the excess starts. Up to four, widest excess first.
    function breakers(el) {
        const er = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        const left = er.left + parseFloat(cs.borderLeftWidth) - el.scrollLeft;
        const right = left + el.scrollWidth;
        const padRight = er.left + parseFloat(cs.borderLeftWidth) + el.clientWidth;
        const padLeft = er.left + parseFloat(cs.borderLeftWidth);
        const hits = [];
        // A descendant that clips or scrolls its own overflow holds its subtree: its
        // children are measured against it, never against this box.
        const holds = (n) => {
            const c = getComputedStyle(n);
            return c.overflowX !== "visible" || /paint|strict|content/.test(c.contain);
        };
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT, {
            acceptNode: (n) => (n.parentElement !== el && n.parentElement && holds(n.parentElement) && n.parentElement !== el ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
        });
        let n = walker.nextNode();
        let count = 0;
        while (n && count < 4000) {
            count++;
            const ncs = getComputedStyle(n);
            if (ncs.display !== "none") {
                const r = n.getBoundingClientRect();
                const pr = n.parentElement.getBoundingClientRect();
                const overR = r.right - padRight - el.scrollLeft;
                const overL = padLeft - el.scrollLeft - r.left;
                const parentInside = n.parentElement === el || (pr.right <= padRight - el.scrollLeft + 0.5 && pr.left >= padLeft - el.scrollLeft - 0.5);
                if ((overR > 0.5 || overL > 0.5) && r.width > 0 && parentInside) {
                    hits.push({
                        key: key(n),
                        el: path(n, 3),
                        text: text(n),
                        over: r1(Math.max(overR, overL)),
                        side: overR > overL ? "right" : "left",
                        w: r1(r.width),
                        parentW: r1(pr.width),
                        position: ncs.position,
                        transform: ncs.transform === "none" ? undefined : ncs.transform.slice(0, 60),
                        whiteSpace: ncs.whiteSpace,
                        minWidth: ncs.minWidth,
                        flexShrink: ncs.flexShrink,
                        marginL: ncs.marginLeft,
                        marginR: ncs.marginRight,
                    });
                }
            }
            n = walker.nextNode();
        }
        void right;
        return hits.sort((a, b) => b.over - a.over).slice(0, 4);
    }

    function measure(scope) {
        const vw = window.innerWidth;
        const doc = document.documentElement;
        const root = scope ? document.querySelector(scope) : document.body;
        const out = {
            vw,
            vh: window.innerHeight,
            docSW: doc.scrollWidth,
            docCW: doc.clientWidth,
            bodySW: document.body.scrollWidth,
            scrollX: window.scrollX,
            dark: doc.classList.contains("dark"),
            boxes: [],
            edge: [],
        };
        // (c): try to pan the page sideways.
        const sx = window.scrollX;
        window.scrollTo({ left: 400, top: window.scrollY, behavior: "instant" });
        out.pagePan = window.scrollX - sx;
        window.scrollTo({ left: sx, top: window.scrollY, behavior: "instant" });

        if (!root) return out;
        const all = root.querySelectorAll("*");
        for (const el of all) {
            if (el instanceof SVGElement && !(el instanceof SVGSVGElement)) continue;
            const cs = getComputedStyle(el);
            if (!shown(el, cs)) continue;
            // a screen-reader-only box is a 1 px clip by design
            if (el.classList.contains("sr-only") || (cs.position === "absolute" && cs.clip.startsWith("rect(0"))) continue;
            const cw = el.clientWidth;
            const sw = el.scrollWidth;
            const r = el.getBoundingClientRect();
            if (cw > 0 && sw > cw + 1 && !isField(el)) {
                const ox = cs.overflowX;
                const ellipsis = cs.textOverflow === "ellipsis" && (ox === "hidden" || ox === "clip");
                const paintClip = /paint|strict|content/.test(cs.contain);
                const kind = ox === "auto" || ox === "scroll" ? "scroller" : ox === "visible" && !paintClip ? "spill" : "clipped";
                out.boxes.push({
                    key: key(el),
                    el: path(el),
                    part: part(el),
                    text: text(el),
                    kind,
                    ellipsis,
                    designed: designed(el, cs),
                    sw,
                    cw,
                    excess: sw - cw,
                    ox,
                    oy: cs.overflowY,
                    contain: cs.contain === "none" ? undefined : cs.contain,
                    touchAction: cs.touchAction,
                    overscrollX: cs.overscrollBehaviorX,
                    x: r1(r.left),
                    w: r1(r.width),
                    scrollLeft: el.scrollLeft,
                    breakers: breakers(el),
                });
            }
            // A box past the viewport's side edge that no ancestor clips: it widens
            // what the eye sees (or the page) and it can take a press off-screen.
            if (r.width > 0 && r.height > 0 && (r.right > vw + 0.5 || r.left < -0.5) && cs.position !== "fixed") {
                let clipped = false;
                for (let a = el.parentElement; a && a !== doc; a = a.parentElement) {
                    const acs = getComputedStyle(a);
                    if (acs.overflowX !== "visible") {
                        const ar = a.getBoundingClientRect();
                        if (ar.right <= vw + 0.5 && ar.left >= -0.5) {
                            clipped = true;
                            break;
                        }
                    }
                }
                if (!clipped) {
                    out.edge.push({ key: key(el), el: path(el), part: part(el), text: text(el), left: r1(r.left), right: r1(r.right) });
                }
            } else if (r.width > 0 && r.height > 0 && (r.right > vw + 0.5 || r.left < -0.5) && cs.position === "fixed") {
                out.edge.push({ key: key(el), el: path(el), part: part(el), text: text(el), left: r1(r.left), right: r1(r.right), fixed: true });
            }
        }
        // keep the edge list to the outermost offenders
        const edgeKeys = new Set(out.edge.map((e) => e.key));
        out.edge = out.edge.filter((e) => {
            const el = document.querySelector(`[data-ovf="${e.key}"]`);
            for (let a = el?.parentElement; a; a = a.parentElement) {
                if (edgeKeys.has(a.getAttribute("data-ovf"))) return false;
            }
            return true;
        });
        return out;
    }

    function scrollers() {
        const out = [];
        for (const el of document.body.querySelectorAll("*")) {
            const cs = getComputedStyle(el);
            if (cs.overflowX !== "auto" && cs.overflowX !== "scroll") continue;
            if (!shown(el, cs)) continue;
            if (el.scrollWidth > el.clientWidth + 1 || el.matches(".demo-main-scroller")) {
                out.push({ key: key(el), el: path(el, 3), part: part(el), designed: designed(el, cs), sw: el.scrollWidth, cw: el.clientWidth, scrollLeft: el.scrollLeft, touchAction: cs.touchAction });
            }
        }
        return out;
    }

    function snapshot() {
        const s = { __window: window.scrollX };
        for (const el of document.body.querySelectorAll("*")) {
            if (el.scrollLeft !== 0) s[key(el)] = el.scrollLeft;
        }
        for (const el of document.querySelectorAll("[data-ovf]")) {
            const k = el.getAttribute("data-ovf");
            if (!(k in s)) s[k] = el.scrollLeft;
        }
        return s;
    }

    function restore(snap) {
        for (const [k, v] of Object.entries(snap)) {
            if (k === "__window") continue;
            const el = document.querySelector(`[data-ovf="${k}"]`);
            if (el) el.scrollLeft = v;
        }
        window.scrollTo({ left: snap.__window || 0, top: window.scrollY, behavior: "instant" });
    }

    function pointIn(k) {
        const el = document.querySelector(`[data-ovf="${k}"]`);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const left = Math.max(r.left, 4);
        const right = Math.min(r.right, window.innerWidth - 4);
        const top = Math.max(r.top, 4);
        const bottom = Math.min(r.bottom, window.innerHeight - 4);
        if (right - left < 4 || bottom - top < 4) return null;
        return { x: (left + right) / 2, y: (top + bottom) / 2, h: bottom - top, w: right - left };
    }

    window.__ovf = { measure, scrollers, snapshot, restore, pointIn, key, path, part };
})();
