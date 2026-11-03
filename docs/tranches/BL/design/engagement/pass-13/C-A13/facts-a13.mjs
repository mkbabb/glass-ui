// C-A13 · library-free engine facts that P-E13's derivation rests on or omits.
// One browser per run, a fresh context and page per cell, everything closed in finally.
// Usage: node facts-a13.mjs chromium|webkit
import { chromium, webkit } from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs";
import os from "node:os";

const engine = process.argv[2];
const type = engine === "webkit" ? webkit : chromium;
const load = () => os.loadavg().map((v) => v.toFixed(2)).join(" ");
const out = (s) => console.log(s);

const BASE = `<!doctype html><meta charset=utf-8><style>
@property --engage-read-time { syntax: "<time>"; inherits: false; initial-value: -1s; }
@property --engage-read-number { syntax: "<number>"; inherits: false; initial-value: -1; }
@property --engage-read-length { syntax: "<length>"; inherits: false; initial-value: -1px; }
html, body { margin: 0; }
</style>`;

const cells = {
    // F1: the registered read (P-E13 tokenOf) against the consumer, per form; parsed with settle.ts's own patterns
    async registered(page) {
        return page.evaluate(() => {
            const NUM = String.raw`[-+]?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?`;
            const CANON = { ms: new RegExp(`^(${NUM})(ms|s)$`, "i"), number: new RegExp(`^(${NUM})$`, "i"), px: new RegExp(`^(${NUM})px$`, "i") };
            const READ = { ms: "--engage-read-time", number: "--engage-read-number", px: "--engage-read-length" };
            const val = (t, u) => { const m = CANON[u].exec(t); return m ? Number(m[1]) * (m[2]?.toLowerCase() === "s" ? 1000 : 1) : NaN; };
            const forms = {
                ms: ["210ms", "0.21s", "210MS", "2.1e2ms", "+0.21s", "/*c*/0.21s", "calc(0.1s + 110ms)", "calc(105ms * 2)", "min(210ms, 1s)", "max(210ms, 1ms)", "clamp(1ms, 210ms, 1s)", "round(nearest, 214ms, 10ms)", "abs(-210ms)", "calc(var(--nope, 0.21s))", "calc(0.21s * pi / pi)", "calc(0.21s * e / e)", "mod(1210ms, 1000ms)", "rem(1210ms, 1000ms)", "calc(0.21s * sign(1s))", "calc(var(--settle) * var(--tempo))", "calc(infinity * 1s)", "1e-3s", "-0s", "210", "210ms, 1s", "inherit", "initial", "unset"],
                number: ["1.06", "calc(1 + 0.06)", "min(1.06, 2)", "clamp(1, 1.06, 2)", "round(1.06, 0.01)", "abs(-1.06)", "calc(1.06 * e / e)", "sign(1) * 1.06", "calc(sign(1) * 1.06)"],
                px: ["16px", "1rem", "calc(1rem + 2px)", "min(16px, 5vw)", "max(1px, 16px)", "clamp(1px, 16px, 99px)", "abs(-16px)", "1em", "round(16.4px, 1px)"],
            };
            const consumer = { ms: "transition-duration", number: "opacity", px: "padding-left" };
            const res = [];
            const el = document.createElement("div");
            el.style.cssText = "--settle: 0.21s; --tempo: 1; font-size: 16px;";
            document.body.append(el);
            for (const [u, list] of Object.entries(forms)) {
                for (const f of list) {
                    el.style.setProperty("--tok", f);
                    el.style.setProperty(READ[u], "var(--tok)");
                    const text = getComputedStyle(el).getPropertyValue(READ[u]).trim();
                    el.style.removeProperty(READ[u]);
                    // the consumer: number read through opacity clamps above 1, so use calc(var(--tok) - 1) for numbers
                    el.style.setProperty(consumer[u], u === "number" ? "calc(var(--tok) - 1)" : "var(--tok)");
                    const cons = getComputedStyle(el).getPropertyValue(consumer[u]).trim();
                    el.style.removeProperty(consumer[u]);
                    const v = val(text, u);
                    res.push(`${u} | ${f} | read "${text}" -> ${Number.isFinite(v) ? v : "NaN"} | consumer ${consumer[u]} "${cons}"`);
                }
            }
            return res.join("\n");
        });
    },
    // F1b: the library's own consumer contexts substitute the token INSIDE calc():
    // scheme-spring.css:110 `calc(var(--spring-dock-settle) * var(--motion-tempo))`, engage.css:199 `calc(1 + (var(--scale-engage) - 1) * …)`
    async calcctx(page) {
        return page.evaluate(() => {
            const res = [];
            const el = document.createElement("div");
            el.style.cssText = "--motion-tempo: 1;";
            document.body.append(el);
            for (const f of ["210ms", "0.1s + 110ms", "105ms * 2", "2 * 105ms"]) {
                el.style.setProperty("--spring-dock-settle", f);
                el.style.setProperty("--engage-read-time", "var(--spring-dock-settle)");
                const read = getComputedStyle(el).getPropertyValue("--engage-read-time").trim();
                el.style.removeProperty("--engage-read-time");
                el.style.setProperty("transition-duration", "calc(var(--spring-dock-settle) * var(--motion-tempo))");
                const cons = getComputedStyle(el).transitionDuration;
                el.style.removeProperty("transition-duration");
                res.push(`--spring-dock-settle: ${f} | registered read "${read}" | library consumer calc(settle * tempo) "${cons}"`);
            }
            for (const f of ["1.06", "1 + 0.06", "2 * 0.53"]) {
                el.style.setProperty("--scale-engage", f);
                el.style.setProperty("--engage-read-number", "var(--scale-engage)");
                const read = getComputedStyle(el).getPropertyValue("--engage-read-number").trim();
                el.style.removeProperty("--engage-read-number");
                el.style.setProperty("scale", "calc(1 + (var(--scale-engage) - 1) * 1)");
                const cons = getComputedStyle(el).scale;
                el.style.removeProperty("scale");
                res.push(`--scale-engage: ${f} | registered read "${read}" | library consumer calc(1 + (x - 1) * g) "${cons}"`);
            }
            return res.join("\n");
        });
    },
    // F2: the read under a transition that covers the read property (transition: all / transition-property: all)
    async transitionall(page) {
        return page.evaluate(() => {
            const res = [];
            for (const css of ["transition: all 300ms linear", "transition-property: all; transition-duration: 300ms", "transition: --engage-read-time 300ms linear", "transition: none"]) {
                const el = document.createElement("div");
                el.style.cssText = `${css}; --tok: 210ms;`;
                document.body.append(el);
                getComputedStyle(el).getPropertyValue("--engage-read-time");
                el.style.setProperty("--engage-read-time", "var(--tok)");
                const t = getComputedStyle(el).getPropertyValue("--engage-read-time").trim();
                el.style.removeProperty("--engage-read-time");
                const n = el.getAnimations().length;
                res.push(`${css} | read "${t}" | animations after ${n}`);
                el.remove();
            }
            return res.join("\n");
        });
    },
    // F3: a just-created paused composite:add WAAPI translate, read synchronously by getBoundingClientRect
    async probe(page) {
        return page.evaluate(() => {
            const res = [];
            for (const wrap of ["", "rotate: 10deg", "perspective: 600px"]) {
                const p = document.createElement("div");
                p.style.cssText = `margin: 100px; ${wrap}`;
                const el = document.createElement("div");
                el.style.cssText = "width: 200px; height: 20px; background: red;" + (wrap.startsWith("persp") ? "transform: rotateX(25deg);" : "");
                p.append(el);
                document.body.append(p);
                const c = () => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
                const a0 = c();
                const a = el.animate({ translate: ["40px 0", "40px 0"] }, { duration: 1, fill: "both", composite: "add" });
                a.pause();
                const a1 = c();
                a.cancel();
                const a2 = c();
                res.push(`${wrap || "none"} | dx ${(a1[0] - a0[0]).toFixed(3)} dy ${(a1[1] - a0[1]).toFixed(3)} | after cancel ${(a2[0] - a0[0]).toFixed(3)}`);
                p.remove();
            }
            return res.join("\n");
        });
    },
    // F4: anchoring and the clamp as a MutationObserver callback reads them, at the default overflow-anchor (r2: siblings in flow)
    async anchor(page) {
        return page.evaluate(async () => {
            const two = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
            const watch = (opts, act, read) => new Promise((resolve) => {
                const mo = new MutationObserver(() => { mo.disconnect(); resolve(read()); });
                mo.observe(document.documentElement, opts);
                act();
            });
            const res = [];
            // insert above the viewport, page scroller
            document.body.innerHTML = "";
            const a = document.createElement("div"); a.style.height = "600px";
            const tgt = document.createElement("div"); tgt.style.cssText = "height: 40px; background: blue;";
            const tail = document.createElement("div"); tail.style.height = "2000px";
            document.body.append(a, tgt, tail);
            scrollTo(0, 540); await two();
            const rd = () => `st ${scrollY} top ${tgt.getBoundingClientRect().top}`;
            const b0 = rd();
            const seen = await watch({ childList: true, subtree: true }, () => { const b = document.createElement("div"); b.style.height = "40px"; document.body.prepend(b); }, rd);
            await two();
            res.push(`page insert above: before ${b0} | MO callback ${seen} | +2 frames ${rd()}`);
            // remove above the viewport
            const seenR = await watch({ childList: true, subtree: true }, () => document.body.firstElementChild.remove(), rd);
            await two();
            res.push(`page remove above: MO callback ${seenR} | +2 frames ${rd()}`);
            // the clamp: scrolled to the end, content below shrinks by 40
            document.body.innerHTML = "";
            const c = document.createElement("div"); c.style.height = "1000px";
            const t2 = document.createElement("div"); t2.style.cssText = "height: 40px; background: blue;";
            const d = document.createElement("div"); d.style.height = "400px";
            document.body.append(c, t2, d);
            scrollTo(0, document.documentElement.scrollHeight); await two();
            const rd2 = () => `st ${scrollY} top ${t2.getBoundingClientRect().top}`;
            const c0 = rd2();
            const seenC = await watch({ attributes: true, subtree: true }, () => { d.style.height = "360px"; }, rd2);
            await two();
            res.push(`page clamp: before ${c0} | MO callback ${seenC} | +2 frames ${rd2()}`);
            // inner scroller: insert above
            document.body.innerHTML = "";
            const sc = document.createElement("div"); sc.style.cssText = "height: 300px; overflow-y: scroll;";
            const s1 = document.createElement("div"); s1.style.height = "600px";
            const t3 = document.createElement("div"); t3.style.cssText = "height: 40px; background: blue;";
            const s2 = document.createElement("div"); s2.style.height = "600px";
            sc.append(s1, t3, s2); document.body.append(sc);
            sc.scrollTop = 480; await two();
            const rd3 = () => `st ${sc.scrollTop} top ${t3.getBoundingClientRect().top}`;
            const i0 = rd3();
            const seenI = await watch({ childList: true, subtree: true }, () => { const b = document.createElement("div"); b.style.height = "40px"; sc.prepend(b); }, rd3);
            await two();
            res.push(`scroller insert above: before ${i0} | MO callback ${seenI} | +2 frames ${rd3()}`);
            return res.join("\n");
        });
    },
    // F5: a bounding box over the layout box (P-E13 paintedScale) under a rotated ancestor
    async bbox(page) {
        return page.evaluate(() => {
            const res = [];
            for (const t of ["none", "rotate: 10deg", "transform: skewX(15deg)", "scale: 0.8"]) {
                const p = document.createElement("div");
                p.style.cssText = `margin: 100px; ${t === "none" ? "" : t}`;
                const el = document.createElement("div");
                el.style.cssText = "width: 300px; height: 6px;";
                p.append(el);
                document.body.append(p);
                const r = el.getBoundingClientRect();
                res.push(`${t} | track 300x6 | bbox/offset x ${(r.width / el.offsetWidth).toFixed(4)} y ${(r.height / el.offsetHeight).toFixed(4)}`);
                p.remove();
            }
            return res.join("\n");
        });
    },
    // F6: a shadow tree's mutation moves a later light-DOM box with no record on <html> subtree
    async shadow(page) {
        return page.evaluate(async () => {
            document.body.innerHTML = "";
            const host = document.createElement("div");
            const sr = host.attachShadow({ mode: "open" });
            sr.innerHTML = `<div style="height:20px"></div>`;
            const tgt = document.createElement("div");
            tgt.style.height = "20px";
            document.body.append(host, tgt);
            let n = 0;
            const mo = new MutationObserver((r) => { n += r.length; });
            mo.observe(document.documentElement, { childList: true, subtree: true, attributes: true, characterData: true });
            const t0 = tgt.getBoundingClientRect().top;
            sr.firstElementChild.style.height = "60px";
            sr.append(document.createElement("p"));
            await new Promise((r) => setTimeout(r, 50));
            const t1 = tgt.getBoundingClientRect().top;
            mo.disconnect();
            return `shadow edit: target top ${t0} -> ${t1}, records on <html> subtree ${n}`;
        });
    },
    // F7: scroll-snap re-snap after an insert above, as the MutationObserver callback reads it
    async snap(page) {
        return page.evaluate(async () => {
            const res = [];
            for (const anchor of ["auto", "none"]) {
                document.body.innerHTML = "";
                const sc = document.createElement("div");
                sc.style.cssText = `height: 300px; overflow-y: scroll; scroll-snap-type: y mandatory; overflow-anchor: ${anchor};`;
                const kids = [];
                for (let i = 0; i < 6; i++) {
                    const k = document.createElement("div");
                    k.style.cssText = "height: 300px; scroll-snap-align: start;";
                    kids.push(k);
                    sc.append(k);
                }
                document.body.append(sc);
                sc.scrollTop = 600;
                await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
                const tgt = kids[2];
                const b0 = [sc.scrollTop, tgt.getBoundingClientRect().top];
                const seen = await new Promise((resolve) => {
                    const mo = new MutationObserver(() => { mo.disconnect(); resolve([sc.scrollTop, tgt.getBoundingClientRect().top]); });
                    mo.observe(document.documentElement, { childList: true, subtree: true });
                    const b = document.createElement("div");
                    b.style.height = "40px";
                    sc.prepend(b);
                });
                await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
                await new Promise((r) => setTimeout(r, 300));
                const later = [sc.scrollTop, tgt.getBoundingClientRect().top];
                res.push(`overflow-anchor ${anchor}: before st ${b0[0]} top ${b0[1]} | MO callback st ${seen[0]} top ${seen[1]} | settled st ${later[0]} top ${later[1]}`);
            }
            return res.join("\n");
        });
    },
    // F8: a keyframe animation started by the mutation itself, as the MutationObserver callback reads it
    async animstart(page) {
        return page.evaluate(async () => {
            document.body.innerHTML = `<style>@keyframes drop { from { translate: 0 -40px } to { translate: 0 0 } } .go { animation: drop 600ms linear; }</style>`;
            const card = document.createElement("div");
            card.style.cssText = "margin-top: 100px;";
            const tgt = document.createElement("div");
            tgt.style.height = "20px";
            card.append(tgt);
            document.body.append(card);
            await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
            const t0 = tgt.getBoundingClientRect().top;
            const seen = await new Promise((resolve) => {
                const mo = new MutationObserver(() => { mo.disconnect(); resolve(tgt.getBoundingClientRect().top); });
                mo.observe(document.documentElement, { attributes: true, subtree: true });
                card.classList.add("go");
            });
            return `class starts a keyframe animation (from translate 0 -40px): top before ${t0}, in MO callback ${seen} (layout unmoved)`;
        });
    },
    // F9: a <link rel=stylesheet> insert: the record arrives before the sheet applies
    async link(page) {
        return page.evaluate(async () => {
            document.body.innerHTML = "";
            const above = document.createElement("div");
            above.id = "above";
            const tgt = document.createElement("div");
            tgt.style.height = "20px";
            document.body.append(above, tgt);
            const t0 = tgt.getBoundingClientRect().top;
            const css = new Blob(["#above { height: 40px; }"], { type: "text/css" });
            const url = URL.createObjectURL(css);
            let atRecord = null;
            const mo = new MutationObserver(() => { if (atRecord === null) atRecord = tgt.getBoundingClientRect().top; });
            mo.observe(document.documentElement, { childList: true, subtree: true, attributes: true, characterData: true });
            let records = 0;
            const count = new MutationObserver((r) => { records += r.length; });
            count.observe(document.documentElement, { childList: true, subtree: true, attributes: true, characterData: true });
            const l = document.createElement("link");
            l.rel = "stylesheet";
            l.href = url;
            const loaded = new Promise((r) => (l.onload = r));
            document.head.append(l);
            await new Promise((r) => setTimeout(r, 0));
            const recs1 = records;
            await loaded;
            const atLoad = tgt.getBoundingClientRect().top;
            await new Promise((r) => setTimeout(r, 30));
            mo.disconnect();
            count.disconnect();
            return `link insert: top before ${t0}, at its record ${atRecord}, at load ${atLoad}; records by the insert ${recs1}, after ${records}`;
        });
    },
    // F10: P-E13's frameOf + translateFor (two 40 px probes, the 2x2 inverse, one correction step) under strong perspective
    async newton(page) {
        return page.evaluate(() => {
            const res = [];
            for (const [persp, rx, D] of [[600, 25, 40], [600, 25, 160], [300, 45, 40], [300, 45, 160], [200, 60, 40], [200, 60, 120]]) {
                document.body.innerHTML = "";
                const card = document.createElement("div");
                card.style.cssText = `margin: 300px 200px; perspective: ${persp}px;`;
                const inner = document.createElement("div");
                inner.style.cssText = `transform: rotateX(${rx}deg); transform-origin: 50% 0;`;
                const pad = document.createElement("div");
                pad.style.height = "10px";
                const el = document.createElement("div");
                el.style.cssText = "width: 200px; height: 20px;";
                inner.append(pad, el);
                card.append(inner);
                document.body.append(card);
                const C = () => { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; };
                const probe = (x, y) => { const a = el.animate({ translate: [`${x}px ${y}px`, `${x}px ${y}px`] }, { duration: 1, fill: "both", composite: "add" }); a.pause(); try { return C(); } finally { a.cancel(); } };
                const was = C();
                pad.style.height = `${10 + D}px`;
                const now = C();
                const p = C(), px = probe(40, 0), py = probe(0, 40);
                const m = { a: (px.x - p.x) / 40, b: (py.x - p.x) / 40, c: (px.y - p.y) / 40, d: (py.y - p.y) / 40 };
                const det = m.a * m.d - m.b * m.c;
                const inv = (u, v) => ({ x: (m.d * u - m.b * v) / det, y: (-m.c * u + m.a * v) / det });
                const dx = was.x - now.x, dy = was.y - now.y;
                const t = inv(dx, dy);
                const q = probe(t.x, t.y);
                const r = inv(p.x + dx - q.x, p.y + dy - q.y);
                const T = { x: t.x + r.x, y: t.y + r.y };
                const land = probe(T.x, T.y);
                const err = Math.hypot(land.x - was.x, land.y - was.y);
                res.push(`perspective ${persp}px rotateX(${rx}deg) layout move ${D}px | painted move ${Math.hypot(dx, dy).toFixed(2)} px | first-frame landing error ${err.toFixed(3)} px`);
            }
            return res.join("\n");
        });
    },
    // F11: a form control's value set as a property (Vue's :value / v-model) under field-sizing: content
    async fieldsizing(page) {
        return page.evaluate(async () => {
            document.body.innerHTML = "";
            const ta = document.createElement("textarea");
            ta.style.cssText = "display: block; field-sizing: content; font: 16px/20px monospace;";
            const tgt = document.createElement("div");
            tgt.style.height = "20px";
            document.body.append(ta, tgt);
            let n = 0;
            const mo = new MutationObserver((r) => { n += r.length; });
            mo.observe(document.documentElement, { childList: true, subtree: true, attributes: true, characterData: true });
            const t0 = tgt.getBoundingClientRect().top;
            ta.value = "a\nb\nc\nd\ne";
            await new Promise((r) => setTimeout(r, 30));
            const t1 = tgt.getBoundingClientRect().top;
            mo.disconnect();
            return `field-sizing ${CSS.supports("field-sizing", "content")}: target top ${t0} -> ${t1}, records ${n}`;
        });
    },
};

const browser = await type.launch();
out(`# C-A13 facts · ${engine} ${browser.version()} · ${new Date().toISOString()} · load ${load()}`);
try {
    const only = process.argv[3] ? process.argv[3].split(",") : null;
    for (const [name, fn] of Object.entries(cells)) {
        if (only && !only.includes(name)) continue;
        const ctx = await browser.newContext({ viewport: { width: 1000, height: 800 } });
        try {
            const page = await ctx.newPage();
            await page.setContent(BASE + "<body></body>");
            out(`## ${name} · load ${load()}`);
            out(await fn(page));
        } catch (e) {
            out(`## ${name} ERROR ${String(e).slice(0, 300)}`);
        } finally {
            await ctx.close();
        }
    }
} finally {
    await browser.close();
    out(`# end · load ${load()}`);
}
